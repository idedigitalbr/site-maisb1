---
name: ssh-paramiko
description: Conexão SSH segura via Python Paramiko e automação de VPS.
---

# Skill: ssh-paramiko (Conexão SSH Segura via Paramiko)

Use esta skill para estabelecer conexões SSH com servidores VPS remotos de forma segura, garantindo validação de fingerprint para mitigar ataques MITM (Man-in-the-Middle) e isolamento total de comandos.

## 1. Como executar o Script SSH
Sempre utilize o script Python local [ssh_client.py](file:///g:/Meu%20Drive/.PROJETOS/site-maisb1/.agents/skills/ssh-paramiko/scripts/ssh_client.py) para disparar comandos na VPS.

### Exemplo de Conexão com Chave Privada
```powershell
# Define as credenciais temporariamente no ambiente da sessão local
$env:VPS_PRIVATE_KEY = "-----BEGIN OPENSSH PRIVATE KEY-----..."

# Executa o script apontando para a variável correspondente
python ".agents/skills/ssh-paramiko/scripts/ssh_client.py" `
    --host "192.168.1.100" `
    --port 22 `
    --user "deploy" `
    --fingerprint "u8f8s...base64-fingerprint-sem-SHA256-prefixo..." `
    --key-env "VPS_PRIVATE_KEY" `
    --command "echo 'Conectado com sucesso!'"
```

### Exemplo de Conexão com Senha
```powershell
$env:VPS_PASSWORD = "minha_senha_super_secreta"

python ".agents/skills/ssh-paramiko/scripts/ssh_client.py" `
    --host "192.168.1.100" `
    --port 22 `
    --user "deploy" `
    --fingerprint "u8f8s..." `
    --password-env "VPS_PASSWORD" `
    --command "echo 'Conectado com sucesso!'"
```

---

## 2. Validação da Fingerprint SHA256 do Host
Para descobrir o fingerprint SHA256 do servidor remoto previamente, você ou o usuário podem executar localmente no terminal:
`ssh-keyscan -t rsa,ecdsa,ed25519 -p <PORTA> <IP> | ssh-keygen -lf -`

Ao rodar o `ssh_client.py`, passe o hash Base64 retornado no parâmetro `--fingerprint`.
O script abortará a execução imediatamente caso o fingerprint detectado seja diferente do informado, retornando exit code `2`.

---

## 3. Segurança de Credenciais e Segredos
- **Nunca expor segredos**: Chaves privadas ou senhas não devem ser gravadas em disco em arquivos versionados e nem expostas no código/logs.
- **Variáveis de Ambiente**: Sempre passe o nome da variável de ambiente que contém a credencial usando os parâmetros `--key-env` ou `--password-env`.
- **Limpeza**: Após concluir a execução local no terminal, certifique-se de limpar as variáveis da sessão:
  `Remove-Item env:VPS_PRIVATE_KEY` ou `Remove-Item env:VPS_PASSWORD`.

---

## 4. Checklist Obrigatório Antes de Comandos de Escrita
Toda vez que você for executar um comando que altera arquivos ou estado remoto, você **deve** garantir:
1. `PROJECT_DIR` está explicitamente definido.
2. O comando remoto começa com:
   `PROJECT_DIR="/opt/nome-do-projeto" && RESOLVED_DIR=$(realpath "$PROJECT_DIR") && if [ "$RESOLVED_DIR" = "/" ] || [ "$RESOLVED_DIR" = "/opt" ] || [ "$RESOLVED_DIR" = "/var" ] || [ "$RESOLVED_DIR" = "/home" ] || [ "$RESOLVED_DIR" = "/root" ] || [ -z "$RESOLVED_DIR" ]; then echo "ABORT: Diretorio invalido!" >&2; exit 99; fi && cd "$RESOLVED_DIR"`
3. Comandos destrutivos (`rm -rf`, `docker compose down -v`, etc.) requerem validação manual por `realpath`, explicação prévia e confirmação explícita do usuário.
