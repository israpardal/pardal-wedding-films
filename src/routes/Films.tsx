import FilmCard from "../components/FilmCard";
import Ornament from "../components/Ornament";
import PageTransition from "../components/PageTransition";
import Reveal from "../components/Reveal";
import SEO from "../components/SEO";
import { FILMS } from "../data/films";
import { useT } from "../i18n/I18nProvider";
import styles from "./Films.module.css";

export default function Films() {
  const t = useT();

  return (
    <PageTransition>
      <SEO
        title={t((d) => d.meta.filmsTitle)}
        description={t((d) => d.meta.filmsDescription)}
      />

      <div className={`container-wide ${styles.page}`}>
        <header className={styles.header}>
          <Reveal>
            <Ornament className={styles.ornament} size={140} />
            <p className={styles.eyebrow}>{t((d) => d.films.eyebrow)}</p>
            <h1 className={styles.title}>{t((d) => d.films.title)}</h1>
            <p className={styles.lede}>{t((d) => d.films.lede)}</p>
          </Reveal>
        </header>

        <div className={styles.grid}>
          {FILMS.map((film, i) => (
            <Reveal key={film.slug} delay={(i % 4) * 0.06}>
              <FilmCard film={film} />
            </Reveal>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
