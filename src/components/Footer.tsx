import { Link } from "react-router-dom";

import { NAV_LINKS, SITE, SOCIAL } from "../data/site";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container-wide">
        <div className={styles.grid}>
          <div>
            <Link to="/" className={styles.brand} aria-label={SITE.name}>
              Pardal
            </Link>
            <p className={styles.tagline}>
              Filmes de casamento, atemporais. Brasil, atendendo em todo o
              território nacional.
            </p>
          </div>

          <div>
            <h2 className={styles.colTitle}>Navegação</h2>
            <ul className={styles.list}>
              {NAV_LINKS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={styles.colTitle}>Onde nos achar</h2>
            <ul className={styles.list}>
              <li>
                <a
                  href={SOCIAL.instagram.url}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Instagram {SOCIAL.instagram.handle}
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL.whatsapp.url}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>
            © {new Date().getFullYear()} {SITE.name} — {SITE.location}
          </span>
          <span>Filmes únicos, poéticos e analógicos.</span>
        </div>
      </div>
    </footer>
  );
}
