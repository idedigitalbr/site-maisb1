---
name: "Grupo Mais Barato"
colors:
  primary: "#FFC400"
  secondary: "#F20D18"
  accent: "#D99A00"
  black: "#000000"
  body-bg: "#050505"
  graphite: "#1A1A1A"
  surface-1: "#0B0B0B"
  surface-2: "#111111"
  white: "#FFFFFF"
  green: "#16A34A"
  wine: "#4B1020"
  orange: "#FF8A00"
typography:
  fontFamily: "DM Sans"
  h1:
    fontFamily: "DM Sans"
    fontSize: "3rem"
    fontWeight: "800"
  h2:
    fontFamily: "DM Sans"
    fontSize: "2rem"
    fontWeight: "700"
  h3:
    fontFamily: "DM Sans"
    fontSize: "1.5rem"
    fontWeight: "600"
  body-md:
    fontFamily: "DM Sans"
    fontSize: "1rem"
    fontWeight: "400"
  serif-accent:
    fontFamily: "Fraunces"
    fontStyle: "italic"
rounded:
  sm: "14px"
  md: "28px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  xxl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.black}"
    rounded: "{rounded.pill}"
    typography: "{typography.body-md}"
  button-secondary:
    backgroundColor: "transparent"
    borderColor: "{colors.primary}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    typography: "{typography.body-md}"
  card-dark:
    backgroundColor: "{colors.graphite}"
    borderColor: "rgba(255, 255, 255, 0.14)"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  hero-section:
    backgroundColor: "{colors.black}"
    padding: "{spacing.xxl}"
---

# Guia de Design para IA: Grupo +B

Este arquivo é um manual de design system executável e legível por agentes de IA. Ele combina definições estritas de tokens (no cabeçalho YAML acima) com explicações detalhadas de aplicação prática e identidade visual no corpo em Markdown abaixo.

---

## Overview

O design do Grupo +B é regido pela sofisticação, calor humano e solidez institucional. A proposta visual adota uma estética de **"Premium Acessível"**, o que significa criar layouts limpos, elegantes e de alto contraste, sem cair no minimalismo corporativo frio, preservando a energia visual das cores regionais sob uma atmosfera escura de alto valor agregado.

---

## Colors

Esta seção especifica a aplicação prática da paleta de cores definida nos tokens de design.

### 1. Cores Corporativas (Holding)
- **Preto Puro (`#000000`)**: Cor base fundamental para fundos e superfícies principais, transmitindo elegância e solidez.
- **Preto Quase-Puro / Body Background (`#050505`)**: Fundo principal do corpo do site, frequentemente acompanhado por gradientes radiais muito sutis.
- **Cinza Escuro / Grafite (`#1A1A1A`)**: Utilizado para superfícies elevadas, cards de conteúdo secundário, blocos e elementos da interface escura.
- **Amarelo / Dourado (`#FFC400`)**: Assinatura visual e cor de destaque primário. Usado para CTAs principais, pontos de atenção, linhas de grade, hovers ativos, ícones e bordas selecionadas.
- **Vermelho +B (`#F20D18`)**: Cor de acento de apoio. Usado apenas em pequenos detalhes (pontos, linhas divisórias, badges discretos), evitando dominar os layouts corporativos do Grupo +B (exceto em comunicações temáticas da +B Farma ou promoções específicas de varejo).
- **Branco (`#FFFFFF`)**: Usado para texto principal sobre superfícies escuras, garantindo contraste nítido, legibilidade e respiro visual.

### 2. Cores Temáticas de Marca (Atmosfera local)
Ao desenhar seções ou páginas dedicadas a uma das submarcas do grupo, as seguintes cores temáticas devem ser aplicadas em elementos de apoio para marcar o contexto da vertical:
- **Verde (`#16A34A`)**: Villa Plaza Park Infantil.
- **Vinho / Bordô (`#4B1020`)**: The Wine Experience.
- **Laranja (`#FF8A00`)**: Villa Plaza Restaurante.
- **Vermelho (`#F20D18`)**: +B Farma (a mesma cor de acento do grupo).

---

## Typography

Esta seção descreve a hierarquia de fontes e seu uso estratégico.

### 1. Tipografia Padrão: **DM Sans**
Toda a interface corporativa, botões, tabelas e parágrafos devem usar a fonte geométrica moderna **DM Sans**:
- **Títulos Grandes (H1, H2)**: DM Sans ExtraBold, Black ou Bold.
- **Subtítulos (H3, H4)**: DM Sans Semibold ou Medium.
- **Parágrafos (Body)**: DM Sans Regular ou Medium (peso 400 ou 500).
- **Botões e Elementos de UI**: DM Sans Bold ou Semibold.

### 2. Tipografia Editorial Secundária: **Fraunces**
- **Uso**: Toques pontuais de sofisticação, aspas, seções editoriais, títulos com caráter de exclusividade (ex: The Wine Experience). Nunca deve ser usada como fonte de texto corrido ou menus.

---

## Spacing

O design do Grupo +B exige uma respiração visual abundante. O espaçamento deve ser consistente:
- **Margens Laterais (Page Padding)**: Margem lateral mínima de `8%` a `10%` da largura da tela (`padding: 0 8%`).
- **Espaçamento entre Seções (Section Gap)**: Margens verticais generosas entre seções (mínimo de `96px` a `120px` no desktop) para dar sobriedade ao layout.
- **Bordas Arredondadas (Rounded Corners)**:
  - **Cards e contêineres**: Canto arredondado com raio de `28px` (`border-radius: 28px`).
  - **Botões, tags e badges**: Raio em formato de pílula de `999px` (`border-radius: 999px`).
- **Sombras e Elevação**: Efeito de profundidade e elevação obtido através de sombras muito suaves e difusas, evitando contornos pretos rígidos.

---

## Components

Esta seção define as diretrizes visuais e comportamentais para componentes comuns.

### 1. Botões
- **Botão Primário (CTA)**: Fundo amarelo primário (`#FFC400`), texto em preto absoluto (`#000000`) em DM Sans Bold. O hover deve mudar para ouro escuro (`#D99A00`) com uma transição de `0.2s`. Raio de arredondamento de `999px` (pílula).
- **Botão Secundário**: Sem fundo (transparente), borda amarela fina (`1px solid #FFC400`) e texto branco (`#FFFFFF`). O hover deve preencher o fundo sutilmente com `rgba(255, 196, 0, 0.12)`.
- **Botão Terciário (Link)**: Sem borda e sem fundo. Texto na cor amarela primária (`#FFC400`), com efeito hover sublinhado ou variação de opacidade.

### 2. Cards
- **Cards Escuros (Dark Cards)**: Fundo grafite (`#1A1A1A`) com uma borda fina de `1px solid rgba(255, 255, 255, 0.14)`. Preenchimento interno (padding) generoso de no mínimo `24px` a `32px`.
- **Efeito Hover no Card**: Deslocamento vertical suave para cima (`translateY(-4px)`), aumento da difusão da sombra de fundo e a cor da borda sutilmente iluminada para `rgba(255, 196, 0, 0.3)`.

### 3. Hero Section
O Hero do site institucional deve expressar graficamente o conceito de holding unificadora:
- **Layout Bi-colunar**:
  - **Esquerda (Conteúdo)**: Headline de impacto (*"Um grupo, múltiplas experiências."*), subheadline contextualizando o ecossistema e botões primário/secundário de ação.
  - **Direita (Visual)**: Infográfico ou animação representando a marca central "Grupo +B" orbitada pelas submarcas satélites, conectadas por finas linhas douradas luminosas e pontos de luz (bokeh).

### 4. Uso de Logos
- ❌ **NUNCA invente ou modifique as logos** oficiais.
- ❌ **NUNCA distorça as proporções** das marcas.
- **Logos do Drive**: Todos os arquivos de logomarcas devem ser carregados diretamente das URLs do Google Drive usando o padrão `https://drive.google.com/thumbnail?id={FILE_ID}&sz=w1400`. Referencie os IDs abaixo:
  - **Grupo Mais Barato (Color Positivo)**: `1LsCvJp624exnF49gIFscWiZNCK4CfoBc`
  - **Grupo Mais Barato (Color Negativo - Principal)**: `1U0M7yaI8eP3-JVVhvv8KtvGruTU9Q9E9`
  - **Grupo Mais Barato (Black Mono)**: `1sKfT8zFVcorhavecWxA851cldhvUVbeC`
  - **Grupo Mais Barato (White Mono)**: `1sIDm9QUGaeohOyxKxYoqFQAjUnDiy14z`
  - **Grupo Mais Barato (Símbolo Icon Negativo)**: `1-lZ5IOXtNVyKhEFGo_iWgZ2MwtSIRg-W`
  - **+B Supermercados (Logo)**: `1h45ZtRB69uuR8mrqvqNbpvX5MgGIul06`
  - **+B Farma (Logo)**: `1DK2agKZL_pTJdBaI6aXAAvkrsYGJWpuQ`
  - **Villa Plaza Restaurante (Logo)**: `1X3YzrPNZIZRE5ayqM6B5PbYj_iHfQPM_`
  - **Villa Plaza Park Infantil (Logo)**: `1hqnhf0a-uPp5Fzg5LWkPWkikWNG0VlrZ`
  - **The Wine Experience (Logo)**: `1IFmd7lo260WXs0ptayhiLt0qFIBFQz1S`

### 5. Elementos Gráficos e Detalhes
- **Símbolo Outline**: O ícone "+B" em contorno amarelo fino (`1px`) e baixa opacidade (`0.05` a `0.1`) pode ser usado grande e recortado nos cantos das telas como grafismo de fundo.
- **Linhas Orgânicas**: Curvas douradas finas cruzando o background escuro para dar ideia de conexões fluidas.
- **Glassmorphism**: Efeito de vidro desfocado (`rgba(11,11,11,.92)` com `backdrop-filter: blur(10px)`) para cabeçalhos fixos, sidebars e overlays de navegação.

---

## Guidelines

Esta seção fornece diretrizes visuais para fotografia, redes sociais e governança estética.

### 1. Direção Fotográfica
A fotografia deve ser sempre realista, quente e de qualidade profissional.
- **Tratamento**: Luz de temperatura quente, contraste moderado, pele natural, profundidade de campo suave (desfoque de fundo) e textura cinematográfica leve.
- **Fotos de Referência no Drive**:
  - **Interna Corredor Alcindo Cacela**: `1y9f3w4CTH_3teOEMwaLJCbF2x-Hd77vn`
  - **Feed Preview / Destaque**: `1UoPpUOz-iczMhheAP-ntjaF_tlnqFpCm`
- **Diretrizes por Vertical**:
  - *Grupo +B*: Liderança, reuniões, visitas técnicas, CD (Centro de Distribuição), frotas, fachada corporativa e equipe de trabalho.
  - *+B Supermercados*: Fachada da loja, produtos frescos (hortifrúti), açougue com cortes premium, adega, repositores atuando e clientes sorridentes.
  - *+B Farma*: Atendimento humanizado no balcão, prateleiras de cosméticos e cuidados de saúde.
  - *Villa Plaza*: Close-ups de comida fresca, buffet bem iluminado, salão e encontros de família no almoço.
  - *Villa Plaza Park*: Crianças brincando, monitores atenciosos, segurança do local e expressões de alegria.
  - *The Wine Experience*: Atmosfera noturna, iluminação baixa, taças brilhantes, garrafas de vinho com bokeh e jantares intimistas.

### 2. Social Media e Banners

> [!IMPORTANT]
> **Estética e Feeds de Referência (Pasta Local)**: O tom visual, a diagramação de posts, o estilo real das fotos e a curadoria estética do feed de cada submarca devem ser extraídos dos prints reais das redes sociais salvos na pasta: [Insta (Prints Locais)](file:///g:/Meu%20Drive/.Others/Projeto%20Grupo%20B/assets/Fotografias/Insta). Qualquer IA de criação de conteúdo visual ou de copy deve analisar estes arquivos para capturar a essência da identidade visual de cada perfil antes de produzir materiais novos.

- **Prints de Referência**: A pasta contém capturas das grades de publicações que mostram o espaçamento de imagens, o uso sutil de tipografia DM Sans sobreposta a fotos e a harmonia de cores na prática.
- **Consistência**: Toda peça promocional ou de rede social deve carregar a logo do Grupo +B (marca-mãe) de forma discreta, acompanhando a assinatura da unidade específica.
- **Legendas e Textos**: Utilizar caixas translúcidas leves (vidro escuro) para textos de legenda aplicados na imagem, garantindo excelente contraste, sem chapar cores ou poluir as fotografias.

### 3. Direção por Marca (Ajustes estéticos por seção)
- **+B Supermercados**: Fundo escuro com destaques em amarelo primário vibrante e fotos amplas.
- **+B Farma**: Tons de vermelho e branco sobre o fundo escuro, transmitindo assepsia e cuidado.
- **Villa Plaza**: Detalhes em laranja, fotos quentes e apetitosas.
- **Villa Plaza Park**: Detalhes em verde e elementos mais divertidos/coloridos, mas controlados sob a base preta geral.
- **The Wine Experience**: Detalhes em vinho, tipografia serifada (Fraunces) e atmosfera escura e sofisticada.

### 4. O que Fazer (Quick Checklist)
- Usar preto/grafite premium como fundo dominante de layout.
- Aplicar o amarelo dourado (`#FFC400`) em CTAs e botões primários.
- Utilizar a tipografia DM Sans como a fonte padrão de interface.
- Usar fotos reais, quentes e humanizadas (evitar bancos de imagens artificiais).
- Manter respiro visual abundante entre as seções.

### 5. O que Evitar
- ❌ Nunca distorcer ou esticar os logotipos.
- ❌ Nunca inventar novas identidades de logos.
- ❌ Evitar excesso de vermelho em materiais institucionais do Grupo +B (manter controlado).
- ❌ Não utilizar fontes informais, decorativas ou cursivas para a holding.
- ❌ Evitar visual poluído que remeta a panfleto ou encarte promocional popular tradicional de baixo valor.

---

## Prompts

Esta seção lista prompts prontos que podem ser copiados para geração de código ou imagens de suporte.

### 1. Prompt de Imagem: Colaboradores (Grupo +B)
> `A realistic, high-quality commercial photograph of a diverse team of Brazilian supermarket corporate employees having a meeting in an elegant, modern office room in Belém, Amazon region. Warm dramatic lighting, cinematic depth of field, corporate colors black and gold accents in the background, sharp focus, professional camera style --ar 16:9 --style raw`

### 2. Prompt de Imagem: The Wine Experience
> `An elegant, intimate evening indoor photograph of a luxury restaurant wine cellar in Belém, Brazil. Wine glasses on a dark rustic wooden table, beautiful warm low lighting, blurred background showing wine bottles on shelves, soft bokeh, sophisticated lifestyle atmosphere, cinematic style --ar 16:9 --v 6.0`

### 3. Prompt de Imagem: Villa Plaza Buffet
> `A high-end food photography of a fresh gourmet contemporary buffet in a beautifully decorated warm restaurant. Gourmet salads, local Brazilian dishes, steam rising, warm ambient lighting, elegant plates, depth of field, commercial advertisement food style --ar 16:9`

### 4. Prompt de Código: Estrutura da Hero Section
> `Create a dark-mode premium institutional hero section for "Grupo +B" (a Brazilian retail holding company). The background must be pure black (#000000) with a subtle warm gold radial gradient at the right. Two-column layout: left column contains a small tag "CONEXÃO E EXPANSÃO" in warm yellow (#FFC400) background with black text, a giant bold heading "Um grupo, múltiplas experiências." in white, a clean paragraph in off-white describing the integrated ecosystem, and a pill-shaped primary yellow button "Conheça nossas marcas". The right column displays an interactive abstract ecosystem map: a glowing central node representing "Grupo +B" with 5 smaller brand nodes orbiting around it, connected by fine gold glowing vector lines. The design must be ultra-clean, minimal, using DM Sans font, with large spacing and high-end corporate feeling.`

---

## Checklist

Antes de aprovar ou exportar qualquer layout, arte ou tela, certifique-se de que a resposta a todas as perguntas abaixo seja **SIM**:

1. A logo utilizada é a oficial e está com a proporção exata, sem distorção?
2. A logo foi carregada do ID de Drive correto (especificado no manual)?
3. A cor base do fundo é o preto ou grafite premium para manter o tom institucional do grupo?
4. O amarelo dourado (`#FFC400`) está sendo usado com exclusividade para destacar ações, hovers e CTAs?
5. O vermelho está controlado e não dominou o layout geral da holding?
6. A tipografia principal do projeto é a **DM Sans** (com Fraunces reservada apenas a toques editoriais específicos)?
7. O layout possui whitespace generoso para "respirar" e parecer premium?
8. O Grupo +B é o protagonista do layout, com as marcas satélites em posições secundárias de ecossistema?
9. O visual está livre de poluição estética ou panfletagem popular tradicional de preço?
10. As fotos de apoio são calorosas, realistas e humanizadas?
