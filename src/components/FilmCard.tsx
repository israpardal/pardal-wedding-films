import { Link } from "react-router-dom";

import type { Film } from "../data/films";
import styles from "./FilmCard.module.css";

export default function FilmCard({ film }: { film: Film }) {
  return (
    <Link to={`/filmes/${film.slug}`} className={styles.card} aria-label={`Ver filme — ${film.couple}`}>
      <div className={styles.frame}>
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
        <div className={styles.overlay} aria-hidden="true" />
        <span className={styles.cta}>Ver filme</span>
      </div>

      <div className={styles.meta}>
        <h3 className={styles.couple}>{film.couple}</h3>
        <p className={styles.sub}>
          <span>{film.location}</span>
          <span>·</span>
          <span>{film.year}</span>
        </p>
      </div>
    </Link>
  );
}
