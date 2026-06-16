import { Link } from "react-router-dom";

import PageTransition from "../components/PageTransition";
import SEO from "../components/SEO";
import { SITE } from "../data/site";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <PageTransition>
      <SEO title={`Página não encontrada · ${SITE.name}`} />
      <div className={`container ${styles.page}`}>
        <div className={styles.inner}>
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>Esta cena ficou no chão da sala.</h1>
          <p className={styles.text}>
            A página que você procura não está mais aqui — ou nunca esteve.
            Voltemos para o início.
          </p>
          <Link to="/" className={styles.back}>
            Voltar à página inicial
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
