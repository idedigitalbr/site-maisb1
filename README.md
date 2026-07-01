# Grupo +B Site Institucional

Primeira versão organizada para GitHub do site institucional One Page do Grupo +B.

## Como abrir

Abra o arquivo `index.html` no navegador ou publique o repositório no GitHub Pages, Netlify ou Vercel.

## Estrutura

```txt
index.html
src/
  css/
    main.css
    tokens.css
    base.css
    header.css
    hero.css
    sections.css
    brands.css
    work-units-footer.css
    responsive.css
  js/
    main.js
    menu.js
    hero-carousel.js
    reveal.js
  data/
    drive-assets.js
    brands.js
    units.js
```

## Regra de Documentação

> [!WARNING]
> **REGRA FIXA E OBRIGATÓRIA:**
> É proibido criar outros arquivos `.md` no projeto. Todo o contexto do site, diretrizes de performance (carregamento rápido, mobile first), SEO, guias de edição e regras de negócio devem residir exclusivamente no arquivo mestre [CONTEXTO E DIRETRIZES IA - PROJETO GRUPO MAIS B.md](file:///G:/Meu%20Drive/.Others/Projeto%20Grupo%20B/Infos%20e%20Contexto%20IA/md/CONTEXTO%20E%20DIRETRIZES%20IA%20-%20PROJETO%20GRUPO%20MAIS%20B.md). O único outro arquivo `.md` permitido é o `DESIGN.md` (na pasta de contexto do projeto) para especificações de UI vinculadas ao Google Stitch.



## Regra de assets

As imagens e logos são carregadas diretamente do Google Drive usando URLs no padrão:

```txt
https://drive.google.com/thumbnail?id=ID_DO_ARQUIVO&sz=w1400
```

Não baixar imagens para dentro do projeto, a menos que o cliente mude essa regra no futuro.

## Como editar rápido

- Header e estrutura das seções: `index.html`
- Cores globais: `src/css/tokens.css`
- Menu e dropdown: `src/css/header.css` e `src/js/menu.js`
- Hero: `src/css/hero.css` e `src/js/hero-carousel.js`
- Seções de marcas: `src/css/brands.css`
- Responsivo: `src/css/responsive.css`
- Referência de links do Drive: `src/data/drive-assets.js`

## Contexto principal

O protagonista é o Grupo +B, também chamado de Grupo Mais Barato. O +B Supermercados é a principal marca atual, mas não é o grupo inteiro.


## Importante sobre abrir localmente

Esta versão não usa `type="module"` no JavaScript principal, então pode ser aberta direto pelo `index.html` no computador. Mesmo assim, para teste mais fiel ao navegador, você pode usar a extensão Live Server no VS Code ou publicar no GitHub Pages.


