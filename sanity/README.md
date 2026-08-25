# 📌 Guia de Uso & Configuração do Sanity.io (Grupo Mais Barato)

Este guia explica como conectar o Sanity.io ao site institucional e como publicar/gerenciar notícias.

---

## 🚀 1. Passo a Passo Inicial (Primeira Vez)

### Passo 1: Acessar o Painel do Sanity
1. Entre em [sanity.io/manage](https://www.sanity.io/manage) e faça login.
2. Clique em **"+ Create project"** e crie o projeto `Grupo Mais Barato`.
3. Copie o seu **Project ID** (código alfanumérico na tela inicial, ex: `abc123xy`).

### Passo 2: Configurar o CORS (Permissão de Leitura no Navegador)
1. No menu superior do seu projeto no Sanity, clique em **API**.
2. Na seção **CORS Origins**, clique em **"+ Add CORS origin"**.
3. Adicione as seguintes origens:
   - `https://grupomaisb.suporteide.digital` (Staging VPS)
   - `https://grupomaisbarato.com.br` (Produção)
   - `http://localhost:*` (Desenvolvimento local)
   - *Marque "Allow credentials: False" (Leitura pública rápida).*

### Passo 3: Inserir o Project ID no Código
Abra o arquivo `src/js/sanity-client.js` e altere a linha 15:

```javascript
const SANITY_CONFIG = {
  projectId: 'COLE_SEU_PROJECT_ID_AQUI',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true
};
```

---

## ✍️ 2. Como Usar o Sanity Studio (Painel de Edição de Matérias)

### Opção A: Sanity Studio Local / Deploy na Nuvem (Recomendado)
Você pode rodar o Sanity Studio diretamente ou publicá-lo em uma URL gratuita (ex: `https://grupomaisbarato.sanity.studio`).

1. No terminal da sua máquina, abra a pasta `sanity`:
   ```bash
   cd sanity
   npm install
   ```
2. Para testar o painel localmente:
   ```bash
   npx sanity dev
   ```
   Acesse: `http://localhost:3333`

3. Para publicar o painel na nuvem da Sanity (acessível de qualquer lugar):
   ```bash
   npx sanity deploy
   ```
   Escolha um subdomínio (ex: `grupomaisbarato.sanity.studio`).

---

## 📝 3. Campos de uma Notícia (`noticia`)

Ao criar uma matéria no Sanity Studio, você preencherá:
- **Título**: Título chamativo da matéria.
- **Slug**: Clique em **"Generate"** para gerar a URL amigável automaticamente a partir do título.
- **Data e Hora**: Data de publicação (suporta agendamento para o futuro).
- **Categoria**: Selecione entre `Institucional`, `+B Supermercados`, `+B Farma`, `Villa Plaza`, `The Wine Experience`, `Eventos`, `Expansão` ou `Geral`.
- **Imagem de Capa**: Faça upload da foto principal e ajuste o foco/corte (hotspot).
- **Resumo / Lead**: 2 a 3 linhas resumindo a matéria (usado nos cards da Home e listagem).
- **Autor / Assessoria**: Nome do autor ou departamento.
- **Conteúdo**: Editor rico com suporte a subtítulos (H2/H3), negrito, itálico, listas, citações em destaque, links e fotos no meio do texto.

---

## 🤖 4. Automação Futura com IA (Hermes WhatsApp)
Para publicar notícias automaticamente via WhatsApp/Hermes:
- O agente Hermes fará uma requisição `POST` autenticada para a API REST da Sanity:
  `https://<PROJECT_ID>.api.sanity.io/v2024-01-01/data/mutate/production`
- Enviando os dados do formulário de notícia em JSON.
- A CDN da Sanity propagará a nova matéria em milissegundos para o site do Grupo Mais Barato!
