#!/usr/bin/env python3
import sys
import os
import argparse
import base64
import hashlib
import io
import paramiko

class FingerprintVerificationPolicy(paramiko.MissingHostKeyPolicy):
    def __init__(self, expected_fingerprint):
        self.expected_fingerprint = expected_fingerprint.strip()
        if self.expected_fingerprint.upper().startswith("SHA256:"):
            self.expected_fingerprint = self.expected_fingerprint[7:]
        self.expected_fingerprint = self.expected_fingerprint.rstrip("=")

    def missing_host_key(self, client, hostname, key):
        key_bytes = key.asbytes()
        sha256_digest = hashlib.sha256(key_bytes).digest()
        actual_fp = base64.b64encode(sha256_digest).decode("utf-8").rstrip("=")

        if actual_fp != self.expected_fingerprint:
            raise paramiko.SSHException(
                f"REJEITADO: Impressão digital (fingerprint) do host não confere!\n"
                f"Esperado: SHA256:{self.expected_fingerprint}\n"
                f"Obtido:   SHA256:{actual_fp}"
            )
        client.get_host_keys().add(hostname, key.get_name(), key)

def load_pkey_from_string(key_string, password=None):
    errors = []
    for key_class in [paramiko.Ed25519Key, paramiko.RSAKey, paramiko.ECDSAKey]:
        try:
            key_file = io.StringIO(key_string.strip())
            return key_class.from_private_key(key_file, password=password)
        except Exception as e:
            errors.append(f"{key_class.__name__}: {str(e)}")
            continue
    raise ValueError(f"Não foi possível carregar a chave privada: {', '.join(errors)}")

def ensure_remote_dir(sftp, remote_dir):
    parts = remote_dir.strip("/").split("/")
    current = ""
    if remote_dir.startswith("/"):
        current = "/"
    for part in parts:
        if not part:
            continue
        current = os.path.join(current, part).replace("\\", "/")
        try:
            sftp.stat(current)
        except IOError:
            try:
                sftp.mkdir(current)
                print(f"Diretório remoto criado: {current}")
            except IOError as e:
                raise IOError(f"Falha ao criar diretório remoto '{current}': {e}")

def upload_recursive(sftp, local_path, remote_path):
    if os.path.isdir(local_path):
        ensure_remote_dir(sftp, remote_path)
        for item in os.listdir(local_path):
            local_item = os.path.join(local_path, item)
            remote_item = f"{remote_path}/{item}"
            upload_recursive(sftp, local_item, remote_item)
    elif os.path.isfile(local_path):
        # Incremental check (by size)
        local_size = os.path.getsize(local_path)
        try:
            remote_stat = sftp.stat(remote_path)
            if remote_stat.st_size == local_size:
                # Same size, skip upload
                return
        except IOError:
            # Remote file does not exist
            pass

        print(f"Enviando: {local_path} -> {remote_path}")
        try:
            sftp.put(local_path, remote_path)
        except Exception as e:
            print(f"Erro ao enviar '{local_path}': {e}", file=sys.stderr)
            raise e

def main():
    parser = argparse.ArgumentParser(description="Upload seguro e incremental via SFTP (Paramiko).")
    parser.add_argument("--host", required=True, help="IP ou Hostname da VPS")
    parser.add_argument("--port", type=int, default=22, help="Porta SSH/SFTP")
    parser.add_argument("--user", required=True, help="Usuário SSH")
    parser.add_argument("--fingerprint", required=True, help="Fingerprint SHA256 esperado (Base64)")
    parser.add_argument("--timeout", type=int, default=15, help="Timeout em segundos")
    parser.add_argument("--password-env", help="Nome da variável com a senha")
    parser.add_argument("--key-env", help="Nome da variável com a chave privada")
    parser.add_argument("--key-file", help="Caminho local da chave privada")
    parser.add_argument("--local-dir", required=True, help="Diretório local a ser enviado")
    parser.add_argument("--remote-dir", required=True, help="Diretório de destino na VPS")

    args = parser.parse_args()

    # Validate local directory existence
    if not os.path.exists(args.local_dir):
        print(f"Erro: Diretório local '{args.local_dir}' não existe.", file=sys.stderr)
        sys.exit(1)

    password = None
    pkey = None

    if args.password_env:
        password = os.environ.get(args.password_env)
        if not password:
            print(f"Erro: Variável '{args.password_env}' não definida ou vazia.", file=sys.stderr)
            sys.exit(1)

    if args.key_env:
        key_content = os.environ.get(args.key_env)
        if not key_content:
            print(f"Erro: Variável '{args.key_env}' não definida ou vazia.", file=sys.stderr)
            sys.exit(1)
        try:
            pkey = load_pkey_from_string(key_content, password=password)
        except Exception as e:
            print(f"Erro ao carregar chave privada da variável: {e}", file=sys.stderr)
            sys.exit(1)
    elif args.key_file:
        if not os.path.exists(args.key_file):
            print(f"Erro: Arquivo de chave '{args.key_file}' não encontrado.", file=sys.stderr)
            sys.exit(1)
        try:
            with open(args.key_file, "r") as f:
                pkey = load_pkey_from_string(f.read(), password=password)
        except Exception as e:
            print(f"Erro ao ler arquivo de chave: {e}", file=sys.stderr)
            sys.exit(1)

    # Establish SSH/SFTP connection
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(FingerprintVerificationPolicy(args.fingerprint))

    try:
        client.connect(
            hostname=args.host,
            port=args.port,
            username=args.user,
            password=password if not pkey else None,
            pkey=pkey,
            timeout=args.timeout,
            allow_agent=False,
            look_for_keys=False
        )
    except Exception as e:
        print(f"Conexão falhou: {e}", file=sys.stderr)
        sys.exit(2)

    try:
        sftp = client.open_sftp()
    except Exception as e:
        print(f"Falha ao abrir canal SFTP: {e}", file=sys.stderr)
        client.close()
        sys.exit(3)

    # SECURE TARGET PATH VALIDATION
    try:
        # Resolve canonical remote target path
        resolved_remote = sftp.normalize(args.remote_dir)
        normalized_remote = os.path.normpath(resolved_remote).replace("\\", "/")
        
        # Enforce that destination must be inside /opt/ and have at least one subcomponent (project folder)
        path_components = [c for c in normalized_remote.split("/") if c]
        
        if not normalized_remote.startswith("/opt/") or len(path_components) < 2:
            raise ValueError(f"Segurança: O caminho remoto de destino '{normalized_remote}' é inválido ou inseguro.")
            
        print(f"Validação de Caminho Remoto bem sucedida: '{normalized_remote}'")
        
        # Run recursive upload
        upload_recursive(sftp, args.local_dir, normalized_remote)
        print("Sincronização de arquivos concluída com sucesso!")
        
    except Exception as e:
        print(f"Erro durante a sincronização SFTP: {e}", file=sys.stderr)
        sftp.close()
        client.close()
        sys.exit(4)

    sftp.close()
    client.close()

if __name__ == "__main__":
    main()
