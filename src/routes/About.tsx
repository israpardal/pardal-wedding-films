import { useState } from "react";

import Ornament from "../components/Ornament";
import PageTransition from "../components/PageTransition";
import Reveal from "../components/Reveal";
import SEO from "../components/SEO";
import { useT } from "../i18n/I18nProvider";
import styles from "./About.module.css";

/**
 * Slots de foto dos fundadores.
 * TODO: para ativar, salve as fotos com EXATAMENTE estes nomes em
 * /public/images/ — o site começa a renderizá-las automaticamente.
 *
 *   founder-israel.jpg       — Israel (sozinho, terno, gravata)
 *   founder-brothers.jpg     — Israel + irmão (close, gravatas)
 *   founder-portrait.jpg     — retrato sentado (na cadeira)
 *   founder-group.jpg        — foto em grupo (3 pessoas, fundo claro)
 *
 * Enquanto não estiverem na pasta, mostramos um placeholder elegante.
 */
/**
 * Galeria dos fundadores.
 * Substitua/adicione arquivos em /public/images/ com os mesmos nomes
 * para trocar as fotos sem mexer no código.
 */
const FOUNDER_PHOTOS = [
  { file: "/images/founder-israel.jpg", alt: "Israel" },
  { file: "/images/equipe.jpg", alt: "Equipe Pardal" },
  { file: "/images/founder-gabriel.jpg", alt: "Gabriel" },
];

function FounderPhoto({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  const [errored, setErrored] = useState(false);

  return (
    <figure className={`${styles.photo} ${className}`}>
      {!errored ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setErrored(true)}
        />
      ) : (
        <div className={styles.photoPlaceholder} aria-hidden="true">
          {alt}
        </div>
      )}
    </figure>
  );
}

export default function About() {
  const t = useT();

  return (
    <PageTransition>
      <SEO
        title={t((d) => d.meta.aboutTitle)}
        description={t((d) => d.meta.aboutDescription)}
      />

      <div className={`container ${styles.page}`}>
        {/* Intro */}
        <section className={styles.intro}>
          <Reveal>
            <Ornament className={styles.ornament} size={140} />
            <p className={styles.eyebrow}>{t((d) => d.about.eyebrow)}</p>
            <h1 className={styles.title}>{t((d) => d.about.title)}</h1>
            <div className={styles.lede}>
              <p>{t((d) => d.about.introP1)}</p>
              <p>{t((d) => d.about.introP2)}</p>
            </div>
          </Reveal>
        </section>

        {/* Fundadores — galeria de 3 fotos */}
        <section
          className={styles.foundersBlock}
          aria-labelledby="founders-title"
        >
          <Reveal>
            <header className={styles.foundersHeader}>
              <p className={styles.foundersEyebrow}>
                {t((d) => d.about.foundersEyebrow)}
              </p>
              <h2 id="founders-title" className={styles.foundersTitle}>
                {t((d) => d.about.foundersTitle)}
              </h2>
              <p className={styles.foundersBody}>
                {t((d) => d.about.foundersBody)}
              </p>
            </header>
          </Reveal>

          <Reveal delay={0.1}>
            <div className={styles.foundersGrid}>
              <FounderPhoto
                src={FOUNDER_PHOTOS[0].file}
                alt={FOUNDER_PHOTOS[0].alt}
                className={styles.photoLeft}
              />
              <FounderPhoto
                src={FOUNDER_PHOTOS[1].file}
                alt={FOUNDER_PHOTOS[1].alt}
                className={styles.photoCenter}
              />
              <FounderPhoto
                src={FOUNDER_PHOTOS[2].file}
                alt={FOUNDER_PHOTOS[2].alt}
                className={styles.photoRight}
              />
            </div>
          </Reveal>
        </section>

        {/* Manifesto editorial */}
        <section className={styles.manifesto}>
          <Reveal>
            <h2 className={styles.manifestoTitle}>
              {t((d) => d.about.bodyTitle)}
            </h2>
            <div className={styles.manifestoBody}>
              <p>{t((d) => d.about.bodyP1)}</p>
              <p>{t((d) => d.about.bodyP2)}</p>
              <p>{t((d) => d.about.bodyP3)}</p>
            </div>
          </Reveal>
        </section>

        {/* Valores */}
        <section
          className={styles.valuesBlock}
          aria-labelledby="values-title"
        >
          <h2 id="values-title" className="visually-hidden">
            {t((d) => d.about.valuesTitle)}
          </h2>

          <ul className={styles.valuesGrid}>
            <Reveal as="li" className={styles.value} delay={0.05}>
              <h3 className={styles.valueTitle}>
                {t((d) => d.about.values.one.title)}
              </h3>
              <p className={styles.valueText}>
                {t((d) => d.about.values.one.body)}
              </p>
            </Reveal>
            <Reveal as="li" className={styles.value} delay={0.15}>
              <h3 className={styles.valueTitle}>
                {t((d) => d.about.values.two.title)}
              </h3>
              <p className={styles.valueText}>
                {t((d) => d.about.values.two.body)}
              </p>
            </Reveal>
            <Reveal as="li" className={styles.value} delay={0.25}>
              <h3 className={styles.valueTitle}>
                {t((d) => d.about.values.three.title)}
              </h3>
              <p className={styles.valueText}>
                {t((d) => d.about.values.three.body)}
              </p>
            </Reveal>
            <Reveal as="li" className={styles.value} delay={0.35}>
              <h3 className={styles.valueTitle}>
                {t((d) => d.about.values.four.title)}
              </h3>
              <p className={styles.valueText}>
                {t((d) => d.about.values.four.body)}
              </p>
            </Reveal>
          </ul>
        </section>
      </div>
    </PageTransition>
  );
}
