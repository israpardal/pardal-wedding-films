import { Link } from "react-router-dom";

import BackgroundVideo from "../components/BackgroundVideo";
import FilmCard from "../components/FilmCard";
import Ornament from "../components/Ornament";
import PageTransition from "../components/PageTransition";
import Reveal from "../components/Reveal";
import SEO from "../components/SEO";
import WhatsAppIcon from "../components/WhatsAppIcon";
import { FILMS } from "../data/films";
import { SOCIAL } from "../data/site";
import { useT } from "../i18n/I18nProvider";
import styles from "./Home.module.css";

export default function Home() {
  const t = useT();
  const portfolioPreview = FILMS.slice(1, 3);

  return (
    <PageTransition>
      <SEO
        title={t((d) => d.meta.homeTitle)}
        description={t((d) => d.meta.homeDescription)}
      />

      {/* ────── HERO com vídeo de fundo ────── */}
      <section className={styles.hero} aria-label="Pardal Wedding Films">
        <BackgroundVideo
          src="/videos/hero.mp4"
          mobileSrc="/videos/hero-portrait.mp4"
          poster="/images/hero-poster.jpg"
        />
        <div className={`container ${styles.heroContent}`}>
          <Reveal>
            <p className={styles.heroEyebrow}>{t((d) => d.hero.eyebrow)}</p>
            <Ornament className={styles.heroOrnament} size={140} />
            <h1 className={styles.heroTitle}>{t((d) => d.hero.title)}</h1>
            <p className={styles.heroLede}>{t((d) => d.hero.lede)}</p>
            <div className={styles.heroCtas}>
              <Link to="/filmes" className={styles.heroLink}>
                {t((d) => d.hero.ctaPrimary)}
              </Link>
              <span className={styles.heroDot} aria-hidden="true" />
              <a
                href={SOCIAL.whatsapp.url}
                target="_blank"
                rel="noreferrer noopener"
                className={`${styles.heroLink} ${styles.heroLinkWpp}`}
              >
                <WhatsAppIcon size={18} className={styles.heroLinkWppIcon} />
                {t((d) => d.hero.ctaSecondary)}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ────── INTRO  ────── */}
      <section className={styles.intro}>
        <div className="container-narrow">
          <Reveal>
            <Ornament className={styles.introOrnament} size={120} />
            <p className={styles.introEyebrow}>{t((d) => d.intro.eyebrow)}</p>
            <h2 className={styles.introTitle}>{t((d) => d.intro.title)}</h2>
            <div className={styles.introBody}>
              <p>{t((d) => d.intro.p1)}</p>
              <p>{t((d) => d.intro.p2)}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ────── FILME EM DESTAQUE — vídeo de fundo, sem iframe ────── */}
      <section className={styles.featured} aria-labelledby="featured-title">
        <BackgroundVideo src="/videos/sofia-emanuel.mp4" scrim="default" />
        <div className={`container ${styles.featuredContent}`}>
          <Reveal>
            <p className={styles.featuredEyebrow}>
              {t((d) => d.featured.eyebrow)}
            </p>
            <Ornament className={styles.featuredOrnament} size={120} />
            <h2 id="featured-title" className={styles.featuredTitle}>
              {t((d) => d.featured.title)}
            </h2>
          </Reveal>
        </div>
      </section>

      {/* ────── COMPROMISSO — bloco editorial centrado ────── */}
      <section className={styles.promise}>
        <div className="container-narrow">
          <Reveal>
            <Ornament className={styles.promiseOrnament} size={120} />
            <p className={styles.promiseEyebrow}>
              {t((d) => d.promise.eyebrow)}
            </p>
            <p className={styles.promiseBody}>{t((d) => d.promise.body)}</p>
          </Reveal>
        </div>
      </section>

      {/* ────── FILOSOFIA ────── */}
      <section className={styles.philosophy}>
        <div className="container-narrow">
          <Reveal>
            <p className={styles.philosophyEyebrow}>
              {t((d) => d.philosophy.eyebrow)}
            </p>
            <p className={styles.quote}>
              {t((d) => d.philosophy.quote1)}{" "}
              <em>{t((d) => d.philosophy.quoteEm1)}</em>{" "}
              {t((d) => d.philosophy.quote2)}{" "}
              <em>{t((d) => d.philosophy.quoteEm2)}</em>{" "}
              {t((d) => d.philosophy.quote3)}
            </p>
          </Reveal>

          <div className={styles.three}>
            <Reveal as="article" className={styles.threeItem} delay={0.05}>
              <h3 className={styles.threeTitle}>
                {t((d) => d.philosophy.one.title)}
              </h3>
              <p className={styles.threeBody}>
                {t((d) => d.philosophy.one.body)}
              </p>
            </Reveal>

            <Reveal as="article" className={styles.threeItem} delay={0.15}>
              <h3 className={styles.threeTitle}>
                {t((d) => d.philosophy.two.title)}
              </h3>
              <p className={styles.threeBody}>
                {t((d) => d.philosophy.two.body)}
              </p>
            </Reveal>

            <Reveal as="article" className={styles.threeItem} delay={0.25}>
              <h3 className={styles.threeTitle}>
                {t((d) => d.philosophy.three.title)}
              </h3>
              <p className={styles.threeBody}>
                {t((d) => d.philosophy.three.body)}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ────── PRÉVIA DO PORTFÓLIO ────── */}
      <section className={styles.portfolioPreview}>
        <div className="container-wide">
          <Reveal>
            <header className={styles.portfolioHeader}>
              <h2 className={styles.portfolioTitle}>
                {t((d) => d.portfolioPreview.title)}
              </h2>
              <Link to="/filmes" className={styles.portfolioAll}>
                {t((d) => d.portfolioPreview.all)}
              </Link>
            </header>
          </Reveal>

          <div className={styles.portfolioGrid}>
            {portfolioPreview.map((film, i) => (
              <Reveal key={film.slug} delay={i * 0.08}>
                <FilmCard film={film} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ────── FECHAMENTO ────── */}
      <section className={styles.closing}>
        <div className="container-narrow">
          <Reveal>
            <Ornament className={styles.closingOrnament} size={140} />
            <h2 className={styles.closingTitle}>
              {t((d) => d.homeClosing.title)}
            </h2>
            <p className={styles.closingBody}>
              {t((d) => d.homeClosing.body)}
            </p>
            <div className={styles.closingCtas}>
              <Link to="/contato" className={styles.closingLink}>
                {t((d) => d.homeClosing.ctaPrimary)}
              </Link>
              <span className={styles.closingDot} aria-hidden="true" />
              <Link to="/investimento" className={styles.closingLink}>
                {t((d) => d.homeClosing.ctaSecondary)}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
