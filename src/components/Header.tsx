import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { useT } from "../i18n/I18nProvider";
import LangSwitch from "./LangSwitch";
import PardalLogo from "./PardalLogo";
import styles from "./Header.module.css";

export default function Header() {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Rotas sem hero escuro — header inicia em modo "light" (texto ink).
  const isLight = location.pathname !== "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navItems = [
    { to: "/filmes", label: t((d) => d.nav.films) },
    { to: "/sobre", label: t((d) => d.nav.about) },
    { to: "/investimento", label: t((d) => d.nav.investment) },
    { to: "/contato", label: t((d) => d.nav.contact) },
  ];

  return (
    <header
      className={styles.header}
      data-scrolled={scrolled || menuOpen ? "true" : "false"}
      data-light={isLight ? "true" : "false"}
    >
      <div className={`container-wide ${styles.inner}`}>
        <Link
          to="/"
          className={styles.brand}
          aria-label={`${t((d) => d.brand.full)} — ${t((d) => d.nav.home)}`}
        >
          <PardalLogo className={styles.brandLogo} />
          <span className={styles.brandText}>
            <span className={styles.brandWord}>
              {t((d) => d.brand.name)}
            </span>
            <span className={styles.brandSubtitle}>
              {t((d) => d.brand.subtitle)}
            </span>
          </span>
        </Link>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? t((d) => d.nav.close) : t((d) => d.nav.menu)}
        </button>

        <div className={styles.right}>
          <nav
            id="primary-navigation"
            className={styles.nav}
            data-open={menuOpen ? "true" : "false"}
            aria-label={t((d) => d.nav.primaryNav)}
          >
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setMenuOpen(false)}
              aria-label={t((d) => d.nav.closeMenu)}
            >
              {t((d) => d.nav.close)}
            </button>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={styles.link}
              >
                {item.label}
              </NavLink>
            ))}
            <span className={styles.langInsideNav}>
              <LangSwitch />
            </span>
          </nav>

          <span className={styles.langSwitch}>
            <LangSwitch />
          </span>
        </div>
      </div>
    </header>
  );
}
