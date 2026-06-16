import FilmCard from "../components/FilmCard";
import PageTransition from "../components/PageTransition";
import Reveal from "../components/Reveal";
import SEO from "../components/SEO";
import { FILMS } from "../data/films";
import { SITE } from "../data/site";
import styles from "./Films.module.css";

export default function Films() {
  return (
    <PageTransition>
      <SEO
        title={`Filmes · ${SITE.name}`}
        description="Portfólio de filmes de casamento da Pardal — Brasil, atendendo em todo o território nacional."
      />

      <div className={`container-wide ${styles.page}`}>
        <header className={styles.header}>
          <Reveal>
            <p className={styles.eyebrow}>Portfólio</p>
            <h1 className={styles.title}>Filmes que envelhecem bem.</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={styles.lede}>
              Cada filme é um pequeno arquivo do dia — feito devagar, em frame
              rate de memória. Veja uma seleção dos casamentos que filmamos
              recentemente.
            </p>
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
