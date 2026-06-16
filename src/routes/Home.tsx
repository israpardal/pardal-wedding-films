import { Link } from "react-router-dom";

import FilmCard from "../components/FilmCard";
import PageTransition from "../components/PageTransition";
import Reveal from "../components/Reveal";
import SEO from "../components/SEO";
import VideoHero from "../components/VideoHero";
import { FILMS } from "../data/films";
import { FEATURED_VIDEO, SITE } from "../data/site";
import styles from "./Home.module.css";

export default function Home() {
  const portfolioPreview = FILMS.slice(1, 3);

  return (
    <PageTransition>
      <SEO
        title={`${SITE.name} — Filmes de casamento, atemporais`}
        description={SITE.description}
      />

      <VideoHero
        // TODO: substituir por /videos/hero.mp4 quando houver vídeo
        videoSrc={undefined}
        poster={undefined}
        eyebrow="Brasil · nationwide"
        title="Filmes para o tempo passar devagar."
        lede="Pardal é uma produtora de filmes de casamento. Um jeito de filmar quieto, observador — feito para envelhecer junto com vocês."
        ctaPrimary={{ label: "Ver filmes", to: "/filmes" }}
        ctaSecondary={{ label: "Conversar", to: "/contato" }}
      />

      <section className={styles.intro}>
        <div className="container">
          <Reveal>
            <p className={styles.introLabel}>O que fazemos</p>
            <h2 className={styles.introTitle}>
              Filmes únicos, poéticos e analógicos — atemporais.
            </h2>
          </Reveal>
        </div>

        <div className="container">
          <Reveal delay={0.1}>
            <div className={styles.introBody}>
              <p>
                Cada casamento é um filme só. A gente chega cedo, observa por
                muito tempo e filma com pressa nenhuma — para que o que ficar
                pareça lembrança em vez de registro.
              </p>
              <p>
                Trabalhamos em todo o Brasil. De casamentos íntimos a celebrações
                grandes, em fazendas, praias, sítios, igrejas e casas de família.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.featured} aria-labelledby="featured-title">
        <div className="container">
          <Reveal>
            <div className={styles.featuredHeader}>
              <div>
                <p className={styles.featuredEyebrow}>Filme em destaque</p>
                <h2 id="featured-title" className={styles.featuredTitle}>
                  O recorte mais recente.
                </h2>
              </div>
              <a
                href={FEATURED_VIDEO.url}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.featuredLink}
              >
                Abrir no Vimeo
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} amount={0.1}>
            <div className={styles.embedWrap}>
              <iframe
                src={FEATURED_VIDEO.embedSrc}
                title="Filme em destaque"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.philosophy}>
        <div className="container-narrow">
          <Reveal>
            <p className={styles.philosophyEyebrow}>Filosofia</p>
            <p className={styles.quote}>
              A gente não <em>cobre</em> o casamento — a gente <em>filma</em> ele.
            </p>
          </Reveal>

          <div className={styles.three}>
            <Reveal as="article" className={styles.threeItem} delay={0.05}>
              <span className={styles.threeNum}>01 — Único</span>
              <h3 className={styles.threeTitle}>Sem fórmula.</h3>
              <p className={styles.threeBody}>
                Não temos um molde pronto. O filme nasce do casal — do jeito de
                vocês olharem um para o outro, da casa onde cresceram, da música
                que tocava no carro.
              </p>
            </Reveal>

            <Reveal as="article" className={styles.threeItem} delay={0.15}>
              <span className={styles.threeNum}>02 — Poético</span>
              <h3 className={styles.threeTitle}>Linguagem de filme.</h3>
              <p className={styles.threeBody}>
                Cortes longos, planos contemplativos, silêncios. O filme respira,
                e o som ambiente continua sendo o melhor narrador.
              </p>
            </Reveal>

            <Reveal as="article" className={styles.threeItem} delay={0.25}>
              <span className={styles.threeNum}>03 — Analógico</span>
              <h3 className={styles.threeTitle}>Para envelhecer bem.</h3>
              <p className={styles.threeBody}>
                Texturas suaves, cor calma, nada de moda passageira. A ideia é
                que daqui a vinte anos o filme ainda pareça novo — porque nunca
                foi atual.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={styles.portfolioPreview}>
        <div className="container-wide">
          <div className={styles.portfolioHeader}>
            <Reveal>
              <h2 className={styles.portfolioTitle}>Filmes recentes.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link to="/filmes" className={styles.btnGhost}>
                Ver portfólio completo
              </Link>
            </Reveal>
          </div>

          <div className={styles.portfolioGrid}>
            {portfolioPreview.map((film, i) => (
              <Reveal key={film.slug} delay={i * 0.08}>
                <FilmCard film={film} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.closing}>
        <div className="container-narrow">
          <Reveal>
            <h2 className={styles.closingTitle}>
              Vamos filmar o casamento de vocês?
            </h2>
            <p className={styles.introBody}>
              <span>
                Conta um pouco sobre a data, o lugar e o que vocês imaginam.
                Respondemos com calma, com atenção, e gosto de detalhe.
              </span>
            </p>
            <div className={styles.closingCtas}>
              <Link to="/contato" className={styles.btnPrimary}>
                Conversar
              </Link>
              <Link to="/investimento" className={styles.btnGhost}>
                Ver investimento
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
