import { Link } from "react-router-dom";

import Ornament from "../components/Ornament";
import PageTransition from "../components/PageTransition";
import SEO from "../components/SEO";
import { useT } from "../i18n/I18nProvider";
import styles from "./NotFound.module.css";

export default function NotFound() {
  const t = useT();

  return (
    <PageTransition>
      <SEO title={t((d) => d.meta.notFoundTitle)} />
      <div className={`container ${styles.page}`}>
        <div className={styles.inner}>
          <Ornament className={styles.ornament} size={140} />
          <p className={styles.code}>{t((d) => d.notFound.code)}</p>
          <h1 className={styles.title}>{t((d) => d.notFound.title)}</h1>
          <p className={styles.text}>{t((d) => d.notFound.body)}</p>
          <Link to="/" className={styles.back}>
            {t((d) => d.notFound.back)}
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
