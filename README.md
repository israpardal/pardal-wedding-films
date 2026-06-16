# Pardal Wedding Films — site institucional

Site institucional da **Pardal Wedding Films**, produtora brasileira de filmes
de casamento (Brasil, *nationwide*). Estética **clássica, atemporal,
poética** — referência editorial de convite de casamento, não app minimalista
moderno.

## Stack

- **Vite** + **React 18** + **TypeScript**
- **react-router-dom** para roteamento
- **framer-motion** para transições suaves e reveals no scroll
- **CSS Modules** + variáveis CSS centralizadas (`src/styles/tokens.css`)
- **@fontsource** (Cormorant Garamond + Manrope) como fallbacks elegantes
  enquanto as fontes oficiais (Eglen + Codec Pro, do Canva) não estão presentes
- **i18n próprio** PT/EN — leve, sem `react-i18next`

## Como rodar

> Pré-requisito: **Node.js 18+** (https://nodejs.org).
> Em macOS: `brew install node` (precisa do Homebrew — https://brew.sh).

```bash
npm install
npm run dev
```

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
index.html               # meta tags base (pt-BR como default; OG, etc.)
public/
  favicon.svg            # logo Pardal em SVG
  fonts/                 # PONHA AQUI Eglen.woff2 + CodecPro-*.woff2
  images/                # fotos dos fundadores + posters dos filmes
  videos/
    hero.mp4             # ✓ presente — vídeo de fundo do hero (horizontal)
    hero-portrait.mp4    # ✓ presente — variante vertical (mobile/seção destaque)
src/
  main.tsx               # bootstrap; importa fontes-fallback + estilos globais
  App.tsx                # router + I18nProvider + header/footer
  routes/
    Home.tsx             # hero com vídeo de fundo + filme em destaque (sem iframe)
    Films.tsx            # grid editorial (não-cartoon) com vídeos autoplay
    FilmDetail.tsx       # detalhe — vídeo do filme como fundo do hero
    About.tsx            # editorial + galeria com 3 fotos dos fundadores
    Investment.tsx       # pacotes tipo "menu", sem caixas
    Contact.tsx          # formulário + WhatsApp em ícone monocromático
    NotFound.tsx
  components/
    Header.tsx           # logo Pardal, nav, switch PT/EN
    Footer.tsx
    BackgroundVideo.tsx  # vídeo de fundo autoplay, sem chrome, lazy
    FilmCard.tsx         # vídeo preview autoplay-on-view, sem moldura quadrada
    GrainOverlay.tsx     # textura de grão (SVG inline)
    Ornament.tsx         # ornamento decorativo (estilo convite)
    PardalLogo.tsx       # logo geométrica (4 retângulos)
    WhatsAppIcon.tsx     # ícone WA monocromático
    LangSwitch.tsx       # PT | EN
    Reveal.tsx           # fade + slight translateY (respeita reduce-motion)
    PageTransition.tsx   # cross-fade entre rotas
    SEO.tsx              # atualiza <title>/<meta> por rota
  i18n/
    I18nProvider.tsx     # contexto + useT() + useLang()
    dictionaries/
      pt.ts              # textos em português (default)
      en.ts              # textos em inglês
  data/
    site.ts              # contatos, links, NAV
    films.ts             # filmes do portfólio
  hooks/
    usePrefersReducedMotion.ts
  styles/
    tokens.css           # cores, tipografia, easing, durations
    global.css           # reset, base, .display-italic, .container
    fonts.css            # @font-face Eglen + Codec Pro
```

## Onde editar o quê

| Quero mudar…                       | Edite…                                       |
|------------------------------------|----------------------------------------------|
| Textos em português                | `src/i18n/dictionaries/pt.ts`                |
| Textos em inglês                   | `src/i18n/dictionaries/en.ts`                |
| Cores / tipografia / spacing       | `src/styles/tokens.css`                      |
| E-mail, Instagram, WhatsApp        | `src/data/site.ts`                           |
| Filmes do portfólio                | `src/data/films.ts`                          |
| Logo                               | `src/components/PardalLogo.tsx`              |
| Ornamento (filete decorativo)      | `src/components/Ornament.tsx`                |
| Itens da navegação                 | `src/components/Header.tsx` + `pt.ts`/`en.ts`|
| Meta tags base (OG, twitter)       | `index.html`                                 |

Pesquise por `TODO:` no código para encontrar tudo que está com placeholder.

## Fotos dos fundadores

A galeria da página **Sobre** tem 3 slots de foto. Para ativá-los, salve as
imagens com **exatamente** estes nomes em `public/images/`:

```
public/images/founder-israel.jpg      → Israel sozinho (terno, gravata)
public/images/founder-brothers.jpg    → Israel + irmão (close, gravatas)
public/images/founder-portrait.jpg    → retrato sentado (cadeira / câmera no chão)
```

Os arquivos a serem usados estão entre as imagens que você enviou pelo chat.
Salve-as no Finder (clique direito → "Salvar imagem como…") com os nomes
acima e coloque na pasta. Enquanto não estiverem lá, aparece um placeholder
elegante com o nome no lugar.

> Recomendação: 1200–1600 px de largura, JPEG com qualidade ~80, formato
> 3:4 (vertical). O CSS aplica `filter: grayscale(1)` — então as fotos podem
> ser coloridas que o site converte na hora.

## Vídeos

Já incluídos no repositório (`public/videos/`):

- **hero.mp4** (3.8 MB, 1278×720) — vídeo de fundo principal da Home.
- **hero-portrait.mp4** (9.7 MB, 720×1280) — variante vertical, usada em mobile
  e na seção "filme em destaque" da Home.

O vídeo "rascunhoFILME.mov" (227 MB) **NÃO foi incluído** — é grande demais
pra web (Vercel limita arquivos a 100 MB no plano grátis, e o carregamento
seria lento mesmo com banda boa). Pra usá-lo:

1. Abra no **HandBrake** (https://handbrake.fr) — grátis.
2. Preset: "Vimeo YouTube HQ 720p30".
3. Salve como `public/videos/filme-completo.mp4` (~10–15 MB).
4. Adicione a entrada correspondente em `src/data/films.ts`.

Pra novos filmes do portfólio, idealmente:
- Versão completa hospedada em Vimeo (privado se preferir, com player embed).
- Clip curto de ~10–20s em `public/videos/<nome>.mp4` para o preview do card
  (referenciado em `films.ts` como `previewSrc`).

## i18n — PT / EN

O sistema de tradução é caseiro, leve e tipado:

```tsx
import { useT } from "./i18n/I18nProvider";

const t = useT();
<h1>{t(d => d.hero.title)}</h1>
```

O picker é tipado contra a estrutura do dicionário — TS sinaliza chaves
inexistentes em tempo de build. A escolha do idioma fica em `localStorage`
(`pardal:lang`), e a detecção inicial olha `navigator.language` (default PT).

**Adicionar uma nova string:**
1. Adicione a chave em `src/i18n/dictionaries/pt.ts`.
2. Adicione a mesma chave em `en.ts` com a tradução.
3. Use `t(d => d.suaChave)` no componente.

**Tradução EN atual:** é primeira passada — revisar antes do site ir ao ar
para garantir o tom (editorial, quieto, não corporativo).

## Fontes oficiais (Eglen + Codec Pro)

Ambas são do Canva e não estão disponíveis como webfont aberta.

1. **Quando você tiver os arquivos** (`.woff2`), coloque em `public/fonts/`
   com os nomes exatos:
   - `Eglen.woff2`
   - `CodecPro-Regular.woff2`
   - `CodecPro-Medium.woff2`
   - `CodecPro-Bold.woff2`
2. Não precisa mudar nada no código — `src/styles/fonts.css` já aponta
   pra esses caminhos.
3. Enquanto isso, o site usa **Cormorant Garamond** (display, com itálico
   para puxar o ar de convite de casamento) e **Manrope** (corpo).

## Formulário de contato

Hoje o submit monta um `mailto:` e abre o cliente de e-mail. Para conectar
a um backend (Resend, Formspree, Netlify Forms, função serverless):

1. Edite `src/routes/Contact.tsx`.
2. Substitua o `onSubmit` por uma chamada `fetch` para o endpoint.
3. Trate `loading` / `success` / `error` no estado local.
4. O honeypot (`name="website"`) já está pronto para descartar bots.

## Decisões de design

- **Fundo claro** off-white quente (`#f6f4ef`).
- **Display em itálico** (Eglen italic ou Cormorant italic) — tom de convite
  de casamento, não app moderno.
- **Sem cantos retos / sem caixas** — pacotes de investimento, citações e
  blocos editoriais ficam apoiados na página, divididos por filetes finos
  e diamantes (◆) navy minúsculos.
- **Ornamento decorativo** acima dos títulos das páginas (`<Ornament />`).
- **Vídeos como fundo, não iframes** — autoplay muted loop, sem player chrome.
  Lazy: só carrega ao entrar na viewport; em mobile usa variante vertical.
- **Transições lentas** (480–900 ms), easing `cubic-bezier(0.22, 0.61, 0.36, 1)`.
- **Grão de filme** em SVG turbulence — sutil, animação respeita
  `prefers-reduced-motion`.

## Acessibilidade

- `lang` dinâmico (pt-BR / en) em `<html>` conforme o switch.
- Landmarks semânticos (`header`, `main`, `nav`, `footer`).
- `:focus-visible` em navy, sempre visível.
- `prefers-reduced-motion` desliga vídeo, reveals e grão animado.
- Honeypot anti-spam no formulário.

## SEO

- Title + description por rota (componente `SEO`, escutando o idioma).
- Open Graph + Twitter Card base no `index.html`.
- Substitua `/og-cover.jpg` por uma imagem real (1200×630).

## Placeholders que esperam você

- [ ] **Fontes oficiais** Eglen + Codec Pro em `public/fonts/`
- [ ] **Fotos dos fundadores** em `public/images/` (3 arquivos — ver acima)
- [ ] **Imagem Open Graph** em `public/og-cover.jpg` (1200×630)
- [ ] **Filmes reais** em `src/data/films.ts` (slug, casal, local, ano, videoId
      do Vimeo/YouTube, `previewSrc` local opcional)
- [ ] **Valores reais** de pacote (hoje "sob consulta") em `pt.ts`/`en.ts`
- [ ] **E-mail real** em `src/data/site.ts` (`SITE.email`)
- [ ] **Revisar tradução EN** em `src/i18n/dictionaries/en.ts`
- [ ] **Comprimir** `rascunhoFILME.mov` (227 MB) e salvar como
      `public/videos/filme-completo.mp4`

## Licenças

Código-fonte: uso livre dentro do projeto da Pardal Wedding Films.
Fontes Eglen e Codec Pro: propriedade do Canva — uso dentro dos termos
da plataforma.
