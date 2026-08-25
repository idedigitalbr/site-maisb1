# Regras de Segurança para Administração de VPS via SSH

Sempre que interagir com servidores VPS remotos via SSH, Docker, Git ou transferência de arquivos, você deve seguir estritamente as seguintes regras de segurança.

## Regra Máxima de Segurança
**NUNCA** apagar, mover, sobrescrever, reiniciar, parar, rebuildar ou alterar arquivos, containers, volumes, redes, serviços, diretórios ou configurações que não pertençam explicitamente ao projeto solicitado.

---

## 🚫 REGRA DE OURO INVIOLÁVEL: PROIBIÇÃO ABSOLUTA DE CROSS-DEPLOY (DEPLOY CRUZADO)
**NUNCA subir, sincronizar, resetar ou compilar o código de um projeto dentro da pasta ou container de outro projeto.**
1. **Validação Obrigatória do Repositório Git (`git remote -v` / `git remote get-url origin`)**:
   - Antes de QUALQUER comando de `git fetch`, `git pull`, `git reset --hard`, `docker build` ou `docker compose up --build` na VPS, valide se o repositório remoto configurado na pasta do servidor corresponde **EXATA E ESTRITAMENTE** ao repositório GitHub do projeto atual (ex: `site-maisb1` deve apontar exclusivamente para `idedigitalbr/site-maisb1.git`; `site-maisb-supermercados` deve apontar para `idedigitalbr/site-maisb-supermercado.git`).
   - Se o remote estiver apontando para outro projeto, **NÃO execute fetch/reset**. Corrija imediatamente o remote com `git remote set-url origin <URL_CORRETA>` antes de prosseguir.
2. **Isolamento Total de Subdomínios, Containers e Pastas**:
   - Cada site/projeto possui sua pasta isolada na VPS (`/opt/<projeto>-site/app`), seu próprio arquivo `docker-compose.yml`, seu container nomeado especificamente e suas próprias regras de rota no Traefik.
   - NUNCA reaproveitar pastas de outros projetos.
   - Sempre valide o hash do último commit (`git log -n 1 --oneline`) e o domínio vinculado após qualquer deploy.

---

## Checklist Obrigatório Antes de Executar Alterações
Antes de qualquer comando que modifique o estado da VPS, você deve validar os seguintes pontos:
1. O projeto alvo foi claramente identificado?
2. A variável `PROJECT_DIR` está definida e configurada?
3. O comando `realpath "$PROJECT_DIR"` foi executado e validado?
4. O diretório pertence de fato ao projeto solicitado?
5. Existem outros projetos na VPS? Eles foram identificados para serem tratados como intocáveis?
6. O comando afeta exclusivamente o projeto alvo?
7. Há risco de apagar volumes, bancos de dados, uploads ou assets?
8. O usuário pediu explicitamente e aprovou esta alteração?
9. O comando foi testado primeiro em modo de leitura (dry-run/ls/status) quando possível?

---

## 1. Ações Prévias ao Acesso à VPS
Antes de rodar qualquer comando de alteração ou deploy, execute um diagnóstico de leitura:
- Rodar `pwd`
- Rodar `ls -la /opt` (ou diretório pai correspondente)
- Rodar `docker ps`
- Rodar `docker compose ls`
- Rodar `docker network ls`
- Identificar outros projetos rodando na VPS e marcá-los como **INTOCÁVEIS**.
- **Nunca assuma** que pastas genéricas como `/opt`, `/var/www`, `/home`, `/root`, `/srv` ou similares pertencem ao projeto atual. Se houver qualquer ambiguidade, **pare e peça confirmação**.

---

## 2. Restrições Estritas contra Comandos Destrutivos
Comandos de alto risco **não podem ser executados automaticamente**. Eles exigem:
- Que o caminho absoluto alvo esteja estritamente contido no `PROJECT_DIR` do projeto aprovado (validado com `realpath`).
- Explicação prévia detalhada do que o comando fará.
- Confirmação explícita do usuário no chat.

**Comandos proibidos sem essa aprovação:**
- `rm -rf`
- `docker system prune`
- `docker volume prune`
- `docker container prune`
- `docker image prune`
- `docker compose down -v`
- `docker volume rm`
- `docker network rm`
- `git reset --hard` fora do diretório do projeto alvo
- `chmod -R 777`
- `chown -R` em diretórios de escopo amplo (como `/opt`, `/var/www`, `/etc`, `/usr`, `/var`, `/home`, `/root`, `/srv`)
- Qualquer comando recursivo rodado em diretórios amplos ou na raiz `/`.

---

## 3. Escopo Obrigatório do Projeto (`PROJECT_DIR`)
Toda automação e script executado deve receber e verificar uma variável obrigatória:
`PROJECT_DIR=/opt/nome-do-projeto`

Antes de qualquer comando de escrita/modificação:
- Executar `realpath "$PROJECT_DIR"` no servidor remoto.
- Validar se o caminho absoluto começa exatamente com o diretório permitido.
- Abortar a execução imediatamente se o caminho resolvido estiver vazio, for a raiz `/`, `/opt`, `/var`, `/home`, `/root`, `/srv` ou qualquer outro diretório global.
- Executar `cd "$PROJECT_DIR"` antes de rodar comandos de ferramentas como `git`, `docker compose`, `npm`, `composer`, `php artisan`, etc.

---

## 4. Gerenciamento do Docker
- **Containers Globais**: Nunca parar ou alterar containers globais sem verificar labels, arquivos compose de origem ou diretórios.
- **Compose Down**: Nunca usar `docker compose down -v` por padrão (risco de perda de volumes persistentes).
- **Deploy/Rebuild**: Dar preferência a `docker compose up -d --build --remove-orphans` dentro do diretório do projeto.
- **Antes de Rebuildar**:
  - Executar e exibir `docker compose config --services`
  - Exibir os containers vinculados ao projeto compose.
  - Certificar-se de não afetar containers alheios.
- **Volumes de Bancos de Dados**: São estritamente intocáveis e persistentes. Nunca remova ou altere volumes de bancos de dados sem confirmação expressa por escrito do usuário.

---

## 5. Integração com Traefik / Proxy Reverso
- **Traefik Global**: Não modifique as configurações globais do Traefik, a menos que seja solicitado explicitamente.
- **Redes Docker**: Não remova redes existentes. Use a rede externa existente (como `proxy`) somente se ela já estiver criada na VPS.
- **Labels do Traefik**: Adicione labels de proxy e roteamento exclusivamente sob a especificação do serviço do projeto alvo no seu respectivo `docker-compose.yml`.
- **Nomes de Serviços**: Valide se os nomes de routers, services e hosts já existem na VPS para evitar colisões e conflitos de porta/rota.

---

## 6. Operações Git
Antes de comandos como `git pull`, `git fetch`, `git reset`, ou `git clean`:
- Certifique-se de que o diretório atual de trabalho é estritamente o `PROJECT_DIR`.
- Exiba `git remote -v`.
- Exiba `git status --short --branch`.
- Comandos destrutivos como `git reset --hard` e `git clean -fd` devem ser limitados apenas ao escopo do repositório do projeto alvo.

---

## 7. Upload e Sincronização de Arquivos
- **Caminho Alvo**: Apenas para diretórios específicos sob o projeto aprovado (ex: `/opt/nome-do-projeto/app`, `/opt/nome-do-projeto/assets`).
- **Validação de Destino**: Confirmar o caminho com `realpath` antes de escrever ou sincronizar.
- **Backup**: Antes de substituir diretórios inteiros, execute backups locais ou faça upload para pastas temporárias (releases) antes de rotacionar links simbólicos.
- **Evitar Perdas**: Prefira sincronização incremental (ex: via rsync seguro) e nunca apague assets, dados estáticos ou uploads de usuários.

---

## 8. Segurança de Credenciais e Segredos
- **Nunca hardcodar**: Não salve senhas, tokens, chaves SSH privadas ou quaisquer secrets dentro do repositório Git ou em arquivos que serão versionados.
- **Armazenamento**: Use variáveis de ambiente (env vars), arquivos de ambiente locais ignorados (como `.env`) ou GitHub Secrets.
- **Logs**: Não imprima segredos nos logs. Mascare valores sensíveis (ex: senhas e tokens) substituindo-os por `***` ao exibir comandos ou diagnósticos no console.
