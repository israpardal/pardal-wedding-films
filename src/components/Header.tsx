import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { NAV_LINKS, SITE } from "../data/site";
import styles from "./Header.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

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

  return (
    <header
      className={styles.header}
      data-scrolled={scrolled || menuOpen ? "true" : "false"}
    >
      <div className={`container-wide ${styles.inner}`}>
        <Link to="/" className={styles.brand} aria-label={`${SITE.name} — início`}>
          Pardal
          <span className={styles.brandSmall}>Wedding Films</span>
        </Link>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? "Fechar" : "Menu"}
        </button>

        <nav
          id="primary-navigation"
          className={styles.nav}
          data-open={menuOpen ? "true" : "false"}
          aria-label="Navegação principal"
        >
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
          >
            Fechar
          </button>
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={styles.link}
              end={item.to === "/"}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
