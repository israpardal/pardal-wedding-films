import { Link } from "react-router-dom";

import Ornament from "../components/Ornament";
import PageTransition from "../components/PageTransition";
import Reveal from "../components/Reveal";
import SEO from "../components/SEO";
import { useT } from "../i18n/I18nProvider";
import styles from "./Investment.module.css";

export default function Investment() {
  const t = useT();

  const packages = [
    {
      label: t((d) => d.investment.packages.one.label),
      name: t((d) => d.investment.packages.one.name),
      intro: t((d) => d.investment.packages.one.intro),
      features: t((d) => d.investment.packages.one.features),
    },
    {
      label: t((d) => d.investment.packages.two.label),
      name: t((d) => d.investment.packages.two.name),
      intro: t((d) => d.investment.packages.two.intro),
      features: t((d) => d.investment.packages.two.features),
    },
    {
      label: t((d) => d.investment.packages.three.label),
      name: t((d) => d.investment.packages.three.name),
      intro: t((d) => d.investment.packages.three.intro),
      features: t((d) => d.investment.packages.three.features),
    },
  ];

  return (
    <PageTransition>
      <SEO
        title={t((d) => d.meta.investmentTitle)}
        description={t((d) => d.meta.investmentDescription)}
      />

      <div className={`container ${styles.page}`}>
        <header className={styles.header}>
          <Reveal>
            <Ornament className={styles.ornament} size={140} />
            <p className={styles.eyebrow}>{t((d) => d.investment.eyebrow)}</p>
            <h1 className={styles.title}>{t((d) => d.investment.title)}</h1>
            <p className={styles.lede}>{t((d) => d.investment.lede)}</p>
          </Reveal>
        </header>

        <section
          className={styles.packages}
          aria-label={t((d) => d.investment.sectionLabel)}
        >
          {packages.map((pkg, i) => (
            <Reveal
              key={pkg.label}
              as="article"
              delay={i * 0.06}
              className={styles.pkg}
            >
              <p className={styles.pkgLabel}>
                <span>{pkg.label}</span>
              </p>
              <h2 className={styles.pkgName}>{pkg.name}</h2>
              <p className={styles.pkgPrice}>
                {t((d) => d.investment.underConsultation)}
              </p>
              <p className={styles.pkgIntro}>{pkg.intro}</p>
              <ul className={styles.pkgFeatures}>
                {pkg.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <Link to="/contato" className={styles.pkgCta}>
                {t((d) => d.investment.askProposal)}
              </Link>
            </Reveal>
          ))}
        </section>

        <section className={styles.note}>
          <Reveal>
            <p className={styles.noteEyebrow}>
              {t((d) => d.investment.howEyebrow)}
            </p>
            <div className={styles.noteBody}>
              <p>{t((d) => d.investment.howP1)}</p>
              <p>{t((d) => d.investment.howP2)}</p>
            </div>
          </Reveal>
        </section>
      </div>
    </PageTransition>
  );
}
