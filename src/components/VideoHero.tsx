import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import styles from "./VideoHero.module.css";

interface VideoHeroProps {
  /** Caminho do vídeo de fundo em /public (ex.: /videos/hero.mp4). Opcional. */
  videoSrc?: string;
  /** Poster (imagem de capa) em /public — usado também como fallback. */
  poster?: string;
  eyebrow: string;
  title: string;
  lede: string;
  ctaPrimary: { label: string; to: string };
  ctaSecondary?: { label: string; to: string };
}

/**
 * Hero com vídeo de fundo opcional.
 * — Em mobile (≤ 640px) ou prefers-reduced-motion: NÃO carrega o vídeo, só o poster.
 * — Vídeo carrega "lazy": só inicia quando o componente está visível.
 * — Sempre muted/playsinline/loop, com poster e fallback de imagem.
 */
export default function VideoHero({
  videoSrc,
  poster,
  eyebrow,
  title,
  lede,
  ctaPrimary,
  ctaSecondary,
}: VideoHeroProps) {
  const reduce = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!videoSrc) return;
    if (reduce) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 640px)").matches) return;

    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldLoadVideo(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "100px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce, videoSrc]);

  return (
    <section ref={containerRef} className={styles.hero} aria-label="Destaque">
      {poster && (
        <img
          src={poster}
          alt=""
          className={styles.poster}
          loading="eager"
          decoding="async"
        />
      )}

      {shouldLoadVideo && videoSrc && (
        <video
          ref={videoRef}
          className={styles.media}
          data-ready={ready ? "true" : "false"}
          src={videoSrc}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setReady(true)}
          aria-hidden="true"
        />
      )}

      <div className={styles.scrim} aria-hidden="true" />

      <div className={`container-wide ${styles.content}`}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.lede}>{lede}</p>

        <div className={styles.ctaRow}>
          <Link to={ctaPrimary.to} className={styles.ctaPrimary}>
            {ctaPrimary.label}
          </Link>
          {ctaSecondary && (
            <Link to={ctaSecondary.to} className={styles.ctaSecondary}>
              {ctaSecondary.label}
            </Link>
          )}
        </div>
      </div>

      <span className={styles.scrollHint} aria-hidden="true">
        scroll
      </span>
    </section>
  );
}
