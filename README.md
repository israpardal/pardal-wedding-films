# Pardal Wedding Films — site institucional

Site institucional da **Pardal Wedding Films**, produtora brasileira de filmes
de casamento (Brasil, *nationwide*). A direção criativa é **única, poética e
analógica — atemporal**, e o site foi construído para sumir em favor das
imagens em movimento.

## Stack

- **Vite** + **React 18** + **TypeScript**
- **react-router-dom** para roteamento
- **framer-motion** para transições suaves e reveals no scroll
- **CSS Modules** + variáveis CSS centralizadas (`src/styles/tokens.css`)
- **@fontsource** (Cormorant Garamond + Manrope) como fallbacks elegantes
  enquanto as fontes oficiais (Eglen + Codec Pro, do Canva) não estão presentes

Sem framework de UI pesado (nada de Bootstrap, MUI, Tailwind etc.) — para que
a aparência não puxe para "template moderno".

## Como rodar

> Pré-requisito: **Node.js 18+** instalado (https://nodejs.org). Em macOS sem
> Node, a forma mais comum é via Homebrew (`brew install node`) ou baixando o
> instalador no site oficial.

```bash
npm install
npm run dev
```

O Vite vai abrir `http://localhost:5173` automaticamente.

Build de produção:

```bash
npm run build
npm run preview
```

Type-check sem emitir saída:

```bash
npm run lint
```

## Estrutura

```
index.html               # meta tags base (pt-BR, OG, etc.)
public/
  favicon.svg
  fonts/                 # PONHA AQUI Eglen.woff2 e CodecPro-*.woff2 (ver README da pasta)
  images/                # posters, fotos, og-cover.jpg
  videos/                # hero.mp4 (opcional, vídeo de fundo do hero)
src/
  main.tsx               # bootstrap; importa fontes-fallback + estilos globais
  App.tsx                # router + header/footer + grain overlay + page transitions
  routes/
    Home.tsx
    Films.tsx            # lista do portfólio (/filmes)
    FilmDetail.tsx       # detalhe (/filmes/:slug)
    About.tsx            # /sobre
    Investment.tsx       # /investimento
    Contact.tsx          # /contato
    NotFound.tsx
  components/
    Header.tsx           # nav minimalista, transparente sobre o hero, fundo no scroll
    Footer.tsx
    GrainOverlay.tsx     # textura de grão (SVG inline, fixed, mix-blend-mode)
    VideoHero.tsx        # hero com vídeo de fundo lazy + poster + scrim
    FilmCard.tsx         # cartão de filme no portfólio
    Reveal.tsx           # fade + leve translateY na entrada (respeita reduce-motion)
    PageTransition.tsx   # cross-fade entre rotas
    SEO.tsx              # atualiza <title> e <meta description> por rota
  data/
    site.ts              # nome, contatos, links (Instagram, WhatsApp, Vimeo)
    films.ts             # lista de filmes do portfólio
  hooks/
    usePrefersReducedMotion.ts
  styles/
    tokens.css           # cores, tipografia, espaçamento, easing
    global.css           # reset, base, utilitários (.container, .eyebrow, etc.)
    fonts.css            # @font-face das fontes oficiais (carregam quando os arquivos chegarem)
```

## Onde editar o quê

| Quero mudar…                    | Edite…                                |
|---------------------------------|---------------------------------------|
| Cores / tipografia / spacing    | `src/styles/tokens.css`               |
| Nome, e-mail, redes sociais     | `src/data/site.ts`                    |
| Filme em destaque (Home)        | `src/data/site.ts` (`FEATURED_VIDEO`) |
| Filmes do portfólio             | `src/data/films.ts`                   |
| Texto da Home / Sobre / etc.    | os respectivos `src/routes/*.tsx`     |
| Pacotes de investimento         | `src/routes/Investment.tsx` (`PACKAGES`) |
| Itens da navegação              | `src/data/site.ts` (`NAV_LINKS`)      |
| Meta tags base e OG             | `index.html`                          |

Pesquise por `TODO:` no código para encontrar tudo que está com placeholder.

## Fontes oficiais (Eglen + Codec Pro)

Ambas pertencem ao Canva e não estão disponíveis como webfont aberta. O site
foi construído assumindo isso:

1. **Quando você tiver os arquivos** (`.woff2`), coloque-os em `public/fonts/`
   com os nomes exatos:
   - `Eglen.woff2`
   - `CodecPro-Regular.woff2`
   - `CodecPro-Medium.woff2`
   - `CodecPro-Bold.woff2`
2. Não precisa mudar nada no código — as declarações em `src/styles/fonts.css`
   já apontam para esses caminhos.
3. Enquanto isso, o site usa **Cormorant Garamond** (display) e **Manrope**
   (body) como fallbacks, carregados via `@fontsource`. Os fallbacks foram
   escolhidos para preservar a sensação editorial/atemporal.

Para trocar a fonte por completo, atualize as variáveis `--font-display` e
`--font-body` em `src/styles/tokens.css`.

## Formulário de contato

Hoje o formulário NÃO tem backend — o submit monta um `mailto:` com os campos
preenchidos e abre o cliente de e-mail do usuário. Para conectar a um backend
de verdade (Resend, Formspree, Netlify Forms, função serverless, etc.):

1. Abra `src/routes/Contact.tsx`.
2. Substitua o conteúdo do handler `onSubmit` por um `fetch` para o seu
   endpoint.
3. Trate estados de carregando / sucesso / erro.
4. Considere adicionar verificação contra spam (já existe um honeypot básico
   `name="website"`).

## Decisões de design (assumidas)

Conforme o briefing pediu para escolher e seguir, sem travar:

- **Fundo claro** (off-white quente `#f6f4ef`) — para puxar a sensação de papel
  e fotografia em filme. O texto principal é quase preto, e o **navy
  (`#1b2a4a`)** aparece em links, hover, eyebrow labels e pequenos filetes.
- **TypeScript** (e não JavaScript).
- **Grão de filme** implementado em SVG inline (turbulence) — sem imagem
  externa, sem custo de download. Animação suave do grão respeita
  `prefers-reduced-motion`.
- **Transições lentas** (durations entre 480–900 ms), sempre com easing
  `cubic-bezier(0.22, 0.61, 0.36, 1)` — nada de bounce ou overshoot.
- **Reveals no scroll** disparam uma única vez (`viewport.once = true`).
- **Carregamento de vídeo**: o `VideoHero` só carrega o `<video>` quando o
  elemento entra na viewport, e é desligado em mobile (≤640 px) e em
  `prefers-reduced-motion: reduce` — nesses casos só o `poster` aparece.

## Acessibilidade

- `lang="pt-BR"` em `<html>`.
- Landmarks semânticos (`header`, `main`, `nav`, `footer`).
- Foco visível (`:focus-visible` com outline navy).
- Contraste OK em todos os pares de cor da paleta (ink em paper, paper em ink).
- Animações respeitam `prefers-reduced-motion` em três níveis:
  CSS (`tokens.css` zera durations), Framer Motion (`useReducedMotion`), e o
  grão (sem animação).

## SEO

- Título + descrição por rota (componente `SEO`).
- Open Graph e Twitter Card base no `index.html` — substitua `/og-cover.jpg`
  pela imagem real (1200×630).
- Estrutura semântica com `<h1>` único por página, `<article>`, `<section>`.

> **Dados estruturados (LocalBusiness)**: ainda não adicionados — quando você
> tiver endereço, telefone e horário, vale adicionar um bloco JSON-LD em
> `index.html` (ou usar a tag `<script type="application/ld+json">` na Home).

## O que ainda é placeholder (você precisa fornecer)

- [ ] **Fontes oficiais** Eglen + Codec Pro em `public/fonts/`
- [ ] **Vídeo de fundo do hero** (`public/videos/hero.mp4`) — opcional
- [ ] **Poster do hero** (`public/images/hero-poster.jpg`)
- [ ] **Imagem Open Graph** (`public/og-cover.jpg`, 1200×630)
- [ ] **Foto preto e branco** da página Sobre
- [ ] **Filmes reais** em `src/data/films.ts` (slug, casal, local, ano,
      videoId do Vimeo/YouTube, poster)
- [ ] **Valores reais** ou texto de pacote em `src/routes/Investment.tsx`
- [ ] **E-mail real** em `src/data/site.ts` (`SITE.email`)
- [ ] **Taglines / textos editoriais** — todas as frases poéticas são propostas
      a revisar; busque por `TODO` no código.

## Licenças

Código-fonte: uso livre dentro do projeto da Pardal Wedding Films.
Fontes Eglen e Codec Pro: propriedade do Canva — uso dentro dos termos da
plataforma.
