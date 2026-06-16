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
  className?: string;
}

/**
 * Vídeo de fundo — autoplay, muted, loop, playsinline.
 * - Lazy: só carrega quando o componente fica visível.
 * - Em prefers-reduced-motion: NÃO carrega o vídeo, exibe só o poster.
 * - Em telas estreitas (≤640px), usa `mobileSrc` se fornecido.
 */
export default function BackgroundVideo({
  src,
  poster,
  mobileSrc,
  scrim = "default",
  className,
}: BackgroundVideoProps) {
  const reduce = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [activeSrc, setActiveSrc] = useState(src);

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
      { rootMargin: "150px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

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
          className={styles.video}
          data-ready={ready ? "true" : "false"}
          src={activeSrc}
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
      {scrim !== "none" && (
        <div
          className={`${styles.scrim} ${scrim === "light" ? styles.scrimLight : ""}`}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
