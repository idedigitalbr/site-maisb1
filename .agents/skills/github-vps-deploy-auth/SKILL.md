---
name: github-vps-deploy-auth
description: Autenticação e deploy via GitHub Actions para VPS de forma segura.
---

# Skill: github-vps-deploy-auth (Deploy Automático via GitHub Actions)

Use esta skill para configurar a integração contínua (CI/CD) usando GitHub Actions para publicar alterações na VPS remota de forma segura e com validação de chaves.

---

## 1. Configurando Segredos no GitHub (GitHub Secrets)
Para permitir que o GitHub Actions se conecte à VPS, configure os seguintes segredos nas configurações do repositório (`Settings > Secrets and variables > Actions`):

- `VPS_HOST`: O IP público ou domínio da sua VPS.
- `VPS_USER`: O usuário SSH (ex: `deploy` ou `ubuntu`).
- `VPS_SSH_KEY`: O conteúdo completo da chave privada SSH (deve começar com `-----BEGIN OPENSSH PRIVATE KEY-----`).
- `VPS_SSH_PORT`: A porta SSH da VPS (padrão `22`).
- `VPS_SSH_FINGERPRINT`: A fingerprint SHA256 do host (para validação do `known_hosts`).

---

## 2. Configurando o Workflow do GitHub Actions (`.github/workflows/deploy.yml`)
Use um workflow declarativo que instala o cliente SSH do GitHub runner, adiciona o host ao `known_hosts` comparando com a fingerprint informada e executa os comandos estritamente dentro de `PROJECT_DIR`.

### Exemplo de `.github/workflows/deploy.yml` Seguro:
```yaml
name: Deploy to VPS

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Configure SSH
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.VPS_SSH_KEY }}" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          
          # Validação estrita do host usando ssh-keyscan e known_hosts
          ssh-keyscan -p ${{ secrets.VPS_SSH_PORT }} -t rsa,ecdsa,ed25519 ${{ secrets.VPS_HOST }} >> ~/.ssh/known_hosts
          
          # Validação local opcional da fingerprint do host
          ssh-keygen -lf ~/.ssh/known_hosts | grep -q "${{ secrets.VPS_SSH_FINGERPRINT }}" || {
            echo "ERRO: Fingerprint da VPS obtido não confere com o configurado em secrets!" >&2
            exit 1
          }

      - name: Execute Deploy Commands via SSH
        run: |
          ssh -i ~/.ssh/id_rsa -p ${{ secrets.VPS_SSH_PORT }} ${{ secrets.VPS_USER }}@${{ secrets.VPS_HOST }} \
            "PROJECT_DIR='/opt/nome-do-projeto' && \
             RESOLVED_DIR=\$(realpath \$PROJECT_DIR) && \
             if [ \"\$RESOLVED_DIR\" = '/' ] || [ \"\$RESOLVED_DIR\" = '/opt' ] || [ \"\$RESOLVED_DIR\" = '/var' ] || [ \"\$RESOLVED_DIR\" = '/home' ] || [ \"\$RESOLVED_DIR\" = '/root' ] || [ -z \"\$RESOLVED_DIR\" ]; then \
               echo 'ABORT: Diretorio do projeto invalido!' >&2; exit 99; \
             fi && \
             cd \$RESOLVED_DIR && \
             git fetch origin main && \
             git reset --hard origin/main && \
             git clean -fd && \
             docker compose up -d --build --remove-orphans"
```

---

## 3. Segurança Durante o Deploy
- **Validação de Diretório**: Conforme demonstrado no script de deploy, a verificação de `PROJECT_DIR` com `realpath` e o desvio em caso de caminhos genéricos é **obrigatória** antes de executar o `git reset --hard` ou `git clean -fd`.
- **Limitação de Acesso SSH**: O ideal é que a chave SSH utilizada pelo GitHub Actions (`VPS_SSH_KEY`) pertença a um usuário sem privilégios de `root`, limitado a ler/escrever apenas no diretório `/opt/nome-do-projeto` e com permissões controladas de sudo apenas para os comandos do Docker (`sudo docker compose ...` se necessário, configurado via `/etc/sudoers.d/`).

---

## 4. Solução de Problemas (Troubleshooting)

### Erro: `Host key verification failed`
- **Causa**: O host remoto não pôde ser verificado ou a fingerprint no `known_hosts` falhou.
- **Solução**: Certifique-se de que o segredo `VPS_SSH_FINGERPRINT` foi gerado corretamente usando:
  `ssh-keyscan -t rsa,ecdsa,ed25519 -p <PORTA> <IP> | ssh-keygen -lf -`
  Copie apenas a parte do hash Base64 (ex: `u8f8s...`) e salve no segredo.

### Erro: `Permission denied (publickey)`
- **Causa**: A chave pública correspondente à `VPS_SSH_KEY` não está adicionada ao arquivo `~/.ssh/authorized_keys` do usuário configurado na VPS.
- **Solução**: Certifique-se de adicionar a chave pública na VPS sob o respectivo usuário e garantir as permissões de pasta:
  `chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys`.
