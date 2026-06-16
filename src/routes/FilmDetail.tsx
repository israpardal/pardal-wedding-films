import { Link, useParams } from "react-router-dom";

import PageTransition from "../components/PageTransition";
import Reveal from "../components/Reveal";
import SEO from "../components/SEO";
import { embedSrc, getFilmBySlug } from "../data/films";
import { SITE } from "../data/site";
import NotFound from "./NotFound";
import styles from "./FilmDetail.module.css";

export default function FilmDetail() {
  const { slug } = useParams<{ slug: string }>();
  const film = slug ? getFilmBySlug(slug) : undefined;

  if (!film) return <NotFound />;

  return (
    <PageTransition>
      <SEO
        title={`${film.couple} · ${SITE.name}`}
        description={
          film.blurb ??
          `Filme de casamento — ${film.couple}, ${film.location}, ${film.year}.`
        }
      />

      <article className={`container ${styles.page}`}>
        <nav aria-label="Caminho" className={styles.crumbs}>
          <Link to="/filmes">Filmes</Link>
          <span aria-hidden="true">/</span>
          <span>{film.couple}</span>
        </nav>

        <Reveal>
          <header className={styles.header}>
            <h1 className={styles.couple}>{film.couple}</h1>

            <dl className={styles.meta}>
              <div className={styles.metaRow}>
                <span>Local</span>
                <span>{film.location}</span>
              </div>
              <div className={styles.metaRow}>
                <span>Ano</span>
                <span>{film.year}</span>
              </div>
              <div className={styles.metaRow}>
                <span>Plataforma</span>
                <span>{film.provider === "vimeo" ? "Vimeo" : "YouTube"}</span>
              </div>
            </dl>
          </header>
        </Reveal>

        <Reveal delay={0.1} amount={0.1}>
          <div className={styles.embedWrap}>
            <iframe
              src={embedSrc(film)}
              title={`Filme — ${film.couple}`}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </Reveal>

        {film.blurb && (
          <Reveal>
            <p className={styles.blurb}>{film.blurb}</p>
          </Reveal>
        )}

        <div className={styles.actions}>
          <a
            href={film.url}
            target="_blank"
            rel="noreferrer noopener"
            className={styles.btnGhost}
          >
            Abrir no {film.provider === "vimeo" ? "Vimeo" : "YouTube"}
          </a>
          <Link to="/filmes" className={styles.btnGhost}>
            Voltar aos filmes
          </Link>
          <Link to="/contato" className={styles.btnPrimary}>
            Conversar sobre o nosso filme
          </Link>
        </div>
      </article>
    </PageTransition>
  );
}
