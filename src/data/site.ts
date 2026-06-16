/**
 * Configuração central do site.
 * Centralizado aqui para edição trivial — não espalhe esses valores pelo código.
 */

export const SITE = {
  name: "Pardal Wedding Films",
  shortName: "Pardal",
  tagline: "Filmes de casamento, atemporais.",
  description:
    "Pardal Wedding Films — produtora de filmes de casamento com estética analógica e atemporal. Brasil, atendendo em todo o território nacional.",
  location: "Brasil — nationwide",
  // E-mail de contato — o submit do formulário abre o cliente de e-mail
  // do visitante com este endereço como destinatário.
  // Quando registrar contato@pardal.co, é só trocar aqui.
  email: "israelpardalbackup@gmail.com",
} as const;

export const SOCIAL = {
  instagram: {
    label: "Instagram",
    handle: "@pardal.co",
    url: "https://www.instagram.com/pardal.co",
  },
  whatsapp: {
    label: "WhatsApp",
    // wa.me/<DDI><DDD><número>
    url: "https://wa.me/5594991349842",
    // Mensagem pré-preenchida ao abrir o WhatsApp
    cta: "Converse no WhatsApp",
  },
  vimeo: {
    label: "Vimeo",
    url: "https://vimeo.com",
  },
} as const;

/** Filme em destaque (hero / página inicial). */
export const FEATURED_VIDEO = {
  provider: "vimeo" as const,
  id: "1151770467",
  url: "https://vimeo.com/1151770467",
  // Embed sem branding, em loop, sem chrome — leve, contemplativo.
  embedSrc:
    "https://player.vimeo.com/video/1151770467?title=0&byline=0&portrait=0&dnt=1",
} as const;

export const NAV_LINKS = [
  { to: "/filmes", label: "Filmes" },
  { to: "/sobre", label: "Sobre" },
  { to: "/investimento", label: "Investimento" },
  { to: "/contato", label: "Contato" },
] as const;
