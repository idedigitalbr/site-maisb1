---
name: vps-docker-ssh
description: Administração de VPS com Docker, docker compose e Traefik de forma segura.
---

# Skill: vps-docker-ssh (Administração de Docker/Traefik na VPS)

Use esta skill para gerenciar a VPS remota utilizando Docker, docker compose e configurar roteamento via Traefik garantindo isolamento total entre projetos.

---

## 1. Instalação Segura do Docker no Ubuntu ( VPS Limpa )
Caso precise instalar o Docker em uma VPS Ubuntu recém-criada, use comandos oficiais e **nunca** sobrescreva configurações globais pré-existentes.

```bash
# Atualizar lista de pacotes
sudo apt-get update

# Instalar dependências necessárias
sudo apt-get install -y ca-certificates curl gnupg

# Adicionar chave GPG oficial do Docker
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Configurar o repositório estável do Docker
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.dir/docker.list > /dev/null

sudo apt-get update

# Instalar Docker Engine, CLI, Containerd e Compose plugin
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Validar se o Docker está rodando
sudo systemctl status docker --no-pager
```

---

## 2. Deploy Isolado e Validação de Compose
Sempre execute deploys sob o diretório do projeto alvo, garantindo que variáveis como nome do compose project não conflitem com outras aplicações na VPS.

### Estrutura de Comando de Deploy Padrão:
```bash
# Executa dentro do script Python ssh_client.py
PROJECT_DIR="/opt/meu-projeto"
cd "$PROJECT_DIR"

# Validar estado atual antes de rebuildar
docker compose ps
docker compose config --services

# Buildar e subir containers com isolamento
docker compose up -d --build --remove-orphans
```

---

## 3. Isolamento Contra Outros Projetos
- **Containers Existentes**: Nunca execute `docker stop` ou `docker kill` em IDs de containers que você não listou previamente no `docker compose ps` do projeto alvo.
- **Limpeza de Recursos (Prune)**: **NUNCA** execute comandos globais de limpeza automática como `docker system prune`, `docker image prune -a` ou `docker volume prune` sem aprovação direta e expressa do usuário por escrito, pois isso pode apagar dados e imagens de outros projetos rodando no mesmo host.
- **Volumes**: Volumes de banco de dados e persistência marcados no `docker-compose.yml` são considerados intocáveis. Nunca execute `docker compose down -v` por padrão. Prefira apenas `docker compose down` simples (se realmente necessário parar os serviços).

---

## 4. Integração Segura com Traefik
Para expor serviços usando um Traefik global existente na VPS:
1. **Rede Compartilhada**: Verifique se a rede externa do proxy (geralmente chamada de `proxy` ou `traefik-net`) já existe: `docker network ls`.
2. **Sem Alterar o Traefik Global**: Não mexa no container ou nas configurações globais do Traefik (`traefik.yml` ou regras estáticas).
3. **Labels no Projeto Alvo**: Insira as labels do Traefik no `docker-compose.yml` exclusivo do projeto alvo.

### Exemplo de Configuração Segura de labels no docker-compose.yml:
```yaml
services:
  web:
    image: nginx:alpine
    container_name: meu-projeto-web
    networks:
      - default
      - proxy
    labels:
      - "traefik.enable=true"
      # Use nomes de router específicos do projeto para evitar conflito (ex: meu-projeto-router)
      - "traefik.http.routers.meu-projeto-router.rule=Host(`meu-projeto.com.br`)"
      - "traefik.http.routers.meu-projeto-router.entrypoints=websecure"
      - "traefik.http.routers.meu-projeto-router.tls.certresolver=letsencrypt"
      # Defina a porta interna correta do container
      - "traefik.http.services.meu-projeto-service.loadbalancer.server.port=80"

networks:
  proxy:
    external: true
```

---

## 5. Comandos de Diagnóstico e Controle do Projeto Alvo
Comandos permitidos sem confirmação (apenas leitura ou restritos ao projeto):
- **Logs**: `docker compose logs --tail=100 -f` (ou sem `-f` para execuções rápidas)
- **Status**: `docker compose ps`
- **Reiniciar Serviço**: `docker compose restart <service-name>` (apenas do projeto alvo)
