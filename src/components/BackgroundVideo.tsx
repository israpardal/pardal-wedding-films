import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import styles from "./BackgroundVideo.module.css";

interface BackgroundVideoProps {
  /** Caminho do vídeo em /public (ex.: /videos/hero.mp4). */
  src: string;
  /** Caminho do poster (em /public). Mostrado antes do vídeo carregar. */
  poster?: string;
  /** Vídeo alternativo (vertical) servido em telas estreitas. */
  mobileSrc?: string;
  /** Variante de scrim — completo (default) ou leve. */
  scrim?: "default" | "light" | "none";
  /**
   * Mostra um botão discreto pra o visitante ativar o som.
   * Necessário porque navegadores bloqueiam autoplay com áudio sem interação.
   */
  audioToggle?: boolean;
  /** Texto do botão "ativar som" — passe traduzido se precisar. */
  audioOnLabel?: string;
  /** Texto do botão "mutar" — passe traduzido se precisar. */
  audioOffLabel?: string;
  className?: string;
}

/**
 * Vídeo de fundo — autoplay, muted, loop, playsinline.
 * - Lazy: só carrega quando o componente fica visível.
 * - Em prefers-reduced-motion: NÃO carrega o vídeo, exibe só o poster.
 * - Em telas estreitas (≤640px), usa `mobileSrc` se fornecido.
 * - Opcional: botão discreto pra ativar áudio (exige clique do visitante,
 *   regra de UX do navegador — sem isso autoplay com som é bloqueado).
 */
export default function BackgroundVideo({
  src,
  poster,
  mobileSrc,
  scrim = "default",
  audioToggle = false,
  audioOnLabel = "Som",
  audioOffLabel = "Mudo",
  className,
}: BackgroundVideoProps) {
  const reduce = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [activeSrc, setActiveSrc] = useState(src);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (mobileSrc && window.matchMedia("(max-width: 640px)").matches) {
      setActiveSrc(mobileSrc);
    } else {
      setActiveSrc(src);
    }
  }, [src, mobileSrc]);

  useEffect(() => {
    if (reduce) return;
    const el = wrapRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "80px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  const toggleAudio = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    // Algum navegador pausa ao desmutar; tente reproduzir de novo.
    if (!next) v.play().catch(() => undefined);
    setMuted(next);
  };

  return (
    <div ref={wrapRef} className={`${styles.wrap} ${className ?? ""}`}>
      {poster && (
        <img
          src={poster}
          alt=""
          className={styles.poster}
          loading="eager"
          decoding="async"
          aria-hidden="true"
        />
      )}
      {shouldLoad && (
        <video
          ref={videoRef}
          className={styles.video}
          data-ready={ready ? "true" : "false"}
          src={activeSrc}
          poster={poster}
          autoPlay
          muted={muted}
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setReady(true)}
          aria-hidden="true"
        />
      )}
      {scrim !== "none" && (
        <div
          className={`${styles.scrim} ${scrim === "light" ? styles.scrimLight : ""}`}
          aria-hidden="true"
        />
      )}
      {audioToggle && (
        <button
          type="button"
          onClick={toggleAudio}
          className={styles.audioToggle}
          aria-pressed={!muted}
        >
          <span className={styles.audioDot} aria-hidden="true" />
          {muted ? audioOnLabel : audioOffLabel}
        </button>
      )}
    </div>
  );
}
