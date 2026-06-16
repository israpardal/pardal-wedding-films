import { useLang, useT } from "../i18n/I18nProvider";
import styles from "./LangSwitch.module.css";

export default function LangSwitch() {
  const { lang, setLang } = useLang();
  const t = useT();

  return (
    <div
      className={styles.switch}
      role="group"
      aria-label={t((d) => d.lang.switch)}
    >
      <button
        type="button"
        className={styles.btn}
        aria-current={lang === "pt"}
        onClick={() => setLang("pt")}
      >
        {t((d) => d.lang.pt)}
      </button>
      <span className={styles.sep} aria-hidden="true">
        /
      </span>
      <button
        type="button"
        className={styles.btn}
        aria-current={lang === "en"}
        onClick={() => setLang("en")}
      >
        {t((d) => d.lang.en)}
      </button>
    </div>
  );
}
