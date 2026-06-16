import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
}

/**
 * SEO mínimo — atualiza <title> e <meta description> por rota.
 * Sem dependências externas (sem react-helmet).
 */
export default function SEO({ title, description }: SEOProps) {
  useEffect(() => {
    document.title = title;

    if (description) {
      let meta = document.querySelector(
        'meta[name="description"]',
      ) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = description;
    }
  }, [title, description]);

  return null;
}
