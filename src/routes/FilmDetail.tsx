import { Link, useParams } from "react-router-dom";

import BackgroundVideo from "../components/BackgroundVideo";
import Ornament from "../components/Ornament";
import PageTransition from "../components/PageTransition";
import Reveal from "../components/Reveal";
import SEO from "../components/SEO";
import { getFilmBySlug } from "../data/films";
import { useT } from "../i18n/I18nProvider";
import NotFound from "./NotFound";
import styles from "./FilmDetail.module.css";

export default function FilmDetail() {
  const t = useT();
  const { slug } = useParams<{ slug: string }>();
  const film = slug ? getFilmBySlug(slug) : undefined;

  if (!film) return <NotFound />;

  const hasExternalLink = film.provider !== "local" && film.url;
  const platformName = film.provider === "vimeo" ? "Vimeo" : "YouTube";

  return (
    <PageTransition>
      <SEO
        title={`${film.couple} · Pardal Wedding Films`}
        description={
          film.blurb ??
          `${film.couple}. ${film.location}, ${film.year}.`
        }
      />

      <article className={styles.page}>
        {/* HERO — vídeo do filme como fundo, sem iframe ou controles */}
        <section className={styles.hero} aria-label={film.couple}>
          {film.videoSrc ? (
            <BackgroundVideo src={film.videoSrc} scrim="default" />
          ) : (
            <BackgroundVideo
              src="/videos/hero.mp4"
              scrim="default"
            />
          )}
          <div className={`container ${styles.heroContent}`}>
            <nav aria-label="Caminho" className={styles.crumbs}>
              <Link to="/filmes">{t((d) => d.filmDetail.crumbHome)}</Link>
              <span aria-hidden="true">·</span>
              <span>{film.couple}</span>
            </nav>

            <Reveal>
              <Ornament className={styles.ornament} size={140} />
              <h1 className={styles.couple}>{film.couple}</h1>

              <div className={styles.meta}>
                <span>{film.location}</span>
                <span className={styles.metaDot} aria-hidden="true" />
                <span>{film.year}</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* BODY — texto editorial + ações, sem caixas */}
        <section className={styles.body}>
          <div className="container-narrow">
            {film.blurb && (
              <Reveal>
                <p className={styles.blurb}>{film.blurb}</p>
              </Reveal>
            )}

            <Reveal delay={0.1}>
              <div className={styles.actions}>
                {hasExternalLink && (
                  <>
                    <a
                      href={film.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={styles.link}
                    >
                      {t((d) => d.filmDetail.openOn)} {platformName}
                    </a>
                    <span className={styles.dot} aria-hidden="true" />
                  </>
                )}
                <Link to="/filmes" className={styles.link}>
                  {t((d) => d.filmDetail.backToFilms)}
                </Link>
                <span className={styles.dot} aria-hidden="true" />
                <Link to="/contato" className={styles.link}>
                  {t((d) => d.filmDetail.talkAboutOurs)}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </article>
    </PageTransition>
  );
}
