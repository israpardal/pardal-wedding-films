/**
 * Filmes do portfólio — casamentos reais filmados pela Pardal.
 *
 * Como adicionar um filme novo:
 *  1) Salve o vídeo principal em /public/videos/<casal>.mp4
 *  2) (opcional) Salve um clip curto, leve, em loop em /public/videos/<casal>-preview.mp4
 *     — usado na grade de filmes (autoplay mute). Se não houver, usa o mesmo principal.
 *  3) Adicione uma entrada abaixo.
 *
 * Observação: o navegador NÃO toca vídeo com áudio sem interação do usuário.
 * Os arquivos preservam o áudio original, mas o autoplay é sempre mute.
 */

export type FilmProvider = "vimeo" | "youtube" | "local";

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
  /** ID do vídeo na plataforma (vazio se "local") */
  videoId: string;
  /** URL pública do vídeo (vazio se "local") */
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
    slug: "luana-e-denilson",
    couple: "Luana & Denilson",
    location: "Parauapebas — PA",
    year: 2024,
    provider: "local",
    videoId: "",
    url: "",
    videoSrc: "/videos/luana-denilson.mp4",
    previewSrc: "/videos/luana-denilson.mp4",
  },
  {
    slug: "sofia-e-emanuel",
    couple: "Sofia & Emanuel",
    location: "Tucuruí — PA",
    year: 2024,
    provider: "local",
    videoId: "",
    url: "",
    videoSrc: "/videos/sofia-emanuel.mp4",
    previewSrc: "/videos/sofia-emanuel.mp4",
  },
  {
    slug: "gizele-e-anderson",
    couple: "Gizele & Anderson",
    location: "Marabá — PA",
    year: 2024,
    provider: "local",
    videoId: "",
    url: "",
    // TODO: o arquivo Gizele&Anderson.mov tem 227MB — comprima para
    // /public/videos/gizele-anderson.mp4 (~12MB) com HandBrake antes de subir.
    // Enquanto isso, usamos um preview alternativo para o card não ficar vazio.
    previewSrc: "/videos/sofia-emanuel.mp4",
  },
];

export function getFilmBySlug(slug: string): Film | undefined {
  return FILMS.find((f) => f.slug === slug);
}

export function embedSrc(film: Film): string {
  if (film.provider === "vimeo") {
    return `https://player.vimeo.com/video/${film.videoId}?title=0&byline=0&portrait=0&dnt=1`;
  }
  if (film.provider === "youtube") {
    return `https://www.youtube.com/embed/${film.videoId}?rel=0&modestbranding=1`;
  }
  return "";
}
