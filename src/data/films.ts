/**
 * Filmes do portfólio.
 * TODO: substituir os placeholders pelos dados reais — capa, link do Vimeo/YouTube,
 * nome do casal, local. O esquema abaixo é estável; só adicione/remova entradas.
 */

export type FilmProvider = "vimeo" | "youtube";

export interface Film {
  /** slug usado na URL: /filmes/:slug */
  slug: string;
  /** Nome do casal (ou título do filme) */
  couple: string;
  /** Cidade — Estado */
  location: string;
  /** Ano do casamento — apenas referência editorial */
  year: number;
  /** Plataforma do vídeo (para o link "Abrir no Vimeo/YouTube" no detalhe) */
  provider: FilmProvider;
  /** ID do vídeo na plataforma */
  videoId: string;
  /** URL pública do vídeo */
  url: string;
  /** Caminho local do vídeo principal em /public/videos — usado como fundo na página de detalhe */
  videoSrc?: string;
  /** Caminho local de um clip curto (mute, loop) para reproduzir como preview no card */
  previewSrc?: string;
  /** Caminho local da capa em /public/images — usada antes do vídeo carregar */
  poster?: string;
  /** Pequeno trecho editorial, em prosa */
  blurb?: string;
}

export const FILMS: Film[] = [
  {
    slug: "filme-em-destaque",
    couple: "Filme em destaque",
    location: "Brasil",
    year: 2025,
    provider: "vimeo",
    videoId: "1151770467",
    url: "https://vimeo.com/1151770467",
    videoSrc: "/videos/hero.mp4",
    previewSrc: "/videos/hero.mp4",
    blurb:
      "Um recorte do nosso jeito de filmar — quieto, observador, à espera dos gestos pequenos.",
  },
  // TODO: substituir pelos filmes reais
  {
    slug: "ana-e-tomas",
    couple: "Ana & Tomás",
    location: "Tiradentes — MG",
    year: 2024,
    provider: "vimeo",
    videoId: "000000000",
    url: "https://vimeo.com/000000000",
    previewSrc: "/videos/hero-portrait.mp4",
    blurb:
      "Um casamento na serra, com névoa baixa e um vestido que parecia escrito à mão.",
  },
  {
    slug: "marina-e-rafael",
    couple: "Marina & Rafael",
    location: "Trancoso — BA",
    year: 2024,
    provider: "vimeo",
    videoId: "000000000",
    url: "https://vimeo.com/000000000",
    previewSrc: "/videos/hero.mp4",
    blurb: "O mar como testemunha, o vento como câmera.",
  },
  {
    slug: "clara-e-pedro",
    couple: "Clara & Pedro",
    location: "Curitiba — PR",
    year: 2023,
    provider: "vimeo",
    videoId: "000000000",
    url: "https://vimeo.com/000000000",
    previewSrc: "/videos/hero-portrait.mp4",
    blurb: "Uma cerimônia íntima, em casa, à luz de fim de tarde.",
  },
];

export function getFilmBySlug(slug: string): Film | undefined {
  return FILMS.find((f) => f.slug === slug);
}

export function embedSrc(film: Film): string {
  if (film.provider === "vimeo") {
    return `https://player.vimeo.com/video/${film.videoId}?title=0&byline=0&portrait=0&dnt=1`;
  }
  return `https://www.youtube.com/embed/${film.videoId}?rel=0&modestbranding=1`;
}
