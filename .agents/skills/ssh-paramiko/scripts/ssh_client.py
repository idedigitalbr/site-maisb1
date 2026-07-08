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
        # Strip "SHA256:" prefix if present
        if self.expected_fingerprint.upper().startswith("SHA256:"):
            self.expected_fingerprint = self.expected_fingerprint[7:]
        # Strip trailing padding "=" just in case
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
        
        # If fingerprint matches, cache the key to prevent future prompts
        client.get_host_keys().add(hostname, key.get_name(), key)

def load_pkey_from_string(key_string, password=None):
    errors = []
    # Attempt parsing using supported key types
    for key_class in [paramiko.Ed25519Key, paramiko.RSAKey, paramiko.ECDSAKey, paramiko.DSSKey]:
        try:
            key_file = io.StringIO(key_string.strip())
            return key_class.from_private_key(key_file, password=password)
        except Exception as e:
            errors.append(f"{key_class.__name__}: {str(e)}")
            continue
    raise ValueError(f"Não foi possível carregar a chave privada. Erros tentados: {', '.join(errors)}")

def main():
    parser = argparse.ArgumentParser(description="Cliente SSH seguro usando Paramiko com validação de Fingerprint.")
    parser.add_argument("--host", required=True, help="IP ou Hostname do servidor VPS")
    parser.add_argument("--port", type=int, default=22, help="Porta SSH (padrão 22)")
    parser.add_argument("--user", required=True, help="Usuário SSH")
    parser.add_argument("--fingerprint", required=True, help="Fingerprint SHA256 esperado (Base64)")
    parser.add_argument("--timeout", type=int, default=10, help="Timeout da conexão em segundos")
    parser.add_argument("--password-env", help="Nome da variável de ambiente com a senha")
    parser.add_argument("--key-env", help="Nome da variável de ambiente com o conteúdo da chave privada")
    parser.add_argument("--key-file", help="Caminho local para o arquivo de chave privada")
    parser.add_argument("--command", required=True, help="Comando a ser executado na VPS")

    args = parser.parse_args()

    password = None
    pkey = None

    # Load credentials securely from env or file
    if args.password_env:
        password = os.environ.get(args.password_env)
        if not password:
            print(f"Erro: Variável de ambiente '{args.password_env}' não definida ou vazia.", file=sys.stderr)
            sys.exit(1)

    if args.key_env:
        key_content = os.environ.get(args.key_env)
        if not key_content:
            print(f"Erro: Variável de ambiente '{args.key_env}' não definida ou vazia.", file=sys.stderr)
            sys.exit(1)
        try:
            pkey = load_pkey_from_string(key_content, password=password)
        except Exception as e:
            print(f"Erro ao ler chave privada da variável: {e}", file=sys.stderr)
            sys.exit(1)
    elif args.key_file:
        if not os.path.exists(args.key_file):
            print(f"Erro: Arquivo de chave '{args.key_file}' não encontrado.", file=sys.stderr)
            sys.exit(1)
        try:
            # Try to load file using the standard connect argument or parse it
            with open(args.key_file, "r") as f:
                pkey = load_pkey_from_string(f.read(), password=password)
        except Exception as e:
            print(f"Erro ao ler arquivo de chave: {e}", file=sys.stderr)
            sys.exit(1)

    # Initialize SSH client
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(FingerprintVerificationPolicy(args.fingerprint))

    try:
        # Establish connection
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
    except paramiko.SSHException as e:
        print(f"Conexão falhou (Erro SSH): {e}", file=sys.stderr)
        sys.exit(2)
    except Exception as e:
        print(f"Conexão falhou (Erro Geral): {e}", file=sys.stderr)
        sys.exit(3)

    # Execute Command
    try:
        stdin, stdout, stderr = client.exec_command(args.command)
        
        # Read outputs and decode safely
        stdout_data = stdout.read().decode("utf-8", errors="replace")
        stderr_data = stderr.read().decode("utf-8", errors="replace")
        
        # Get exit status
        exit_status = stdout.channel.recv_exit_status()
        
        # Print outputs
        if stdout_data:
            sys.stdout.write(stdout_data)
        if stderr_data:
            sys.stderr.write(stderr_data)
            
        sys.exit(exit_status)
    except Exception as e:
        print(f"Erro durante a execução do comando: {e}", file=sys.stderr)
        sys.exit(4)
    finally:
        client.close()

if __name__ == "__main__":
    main()
