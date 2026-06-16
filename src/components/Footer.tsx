import { Link } from "react-router-dom";

import { SITE, SOCIAL } from "../data/site";
import { useT } from "../i18n/I18nProvider";
import PardalLogo from "./PardalLogo";
import WhatsAppIcon from "./WhatsAppIcon";
import styles from "./Footer.module.css";

export default function Footer() {
  const t = useT();

  const navItems = [
    { to: "/filmes", label: t((d) => d.nav.films) },
    { to: "/sobre", label: t((d) => d.nav.about) },
    { to: "/investimento", label: t((d) => d.nav.investment) },
    { to: "/contato", label: t((d) => d.nav.contact) },
  ];

  return (
    <footer className={styles.footer}>
      <div className="container-wide">
        <div className={styles.grid}>
          <div>
            <Link to="/" className={styles.brandRow} aria-label={SITE.name}>
              <PardalLogo className={styles.brandLogo} />
              <span className={styles.brand}>{t((d) => d.brand.name)}</span>
            </Link>
            <p className={styles.tagline}>{t((d) => d.footer.tagline)}</p>
          </div>

          <div>
            <h2 className={styles.colTitle}>{t((d) => d.footer.nav)}</h2>
            <ul className={styles.list}>
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={styles.colTitle}>{t((d) => d.footer.findUs)}</h2>
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
                  className={styles.wppRow}
                >
                  <WhatsAppIcon size={16} />
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
            © {new Date().getFullYear()} {SITE.name} —{" "}
            {t((d) => d.brand.location)}
          </span>
          <span>{t((d) => d.footer.signature)}</span>
        </div>
      </div>
    </footer>
  );
}
