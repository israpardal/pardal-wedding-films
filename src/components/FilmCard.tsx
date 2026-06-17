import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import type { Film } from "../data/films";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import styles from "./FilmCard.module.css";

export default function FilmCard({ film }: { film: Film }) {
  const reduce = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduce) return;
    if (!film.previewSrc) return;

    const el = wrapRef.current;
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
      { rootMargin: "80px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce, film.previewSrc]);

  return (
    <Link
      to={`/filmes/${film.slug}`}
      className={styles.card}
      aria-label={film.couple}
    >
      <div ref={wrapRef} className={styles.frame}>
        {film.poster ? (
          <img
            src={film.poster}
            alt=""
            className={styles.poster}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className={styles.placeholder} aria-hidden="true">
            {film.couple}
          </div>
        )}
        {shouldLoadVideo && film.previewSrc && (
          <video
            className={styles.video}
            data-ready={ready ? "true" : "false"}
            src={film.previewSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onCanPlay={() => setReady(true)}
            aria-hidden="true"
          />
        )}
      </div>

      <div className={styles.meta}>
        <h3 className={styles.couple}>{film.couple}</h3>
        <p className={styles.sub}>
          <span>{film.location}</span>
        </p>
      </div>
    </Link>
  );
}
