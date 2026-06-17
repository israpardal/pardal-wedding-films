import { useState } from "react";
import type { FormEvent } from "react";

import Ornament from "../components/Ornament";
import PageTransition from "../components/PageTransition";
import Reveal from "../components/Reveal";
import SEO from "../components/SEO";
import WhatsAppIcon from "../components/WhatsAppIcon";
import { SITE, SOCIAL } from "../data/site";
import { useT } from "../i18n/I18nProvider";
import styles from "./Contact.module.css";

/**
 * Formulário de contato — sem backend nesta fase.
 * Por enquanto, o submit monta um `mailto:` com os campos preenchidos.
 *
 * Para conectar a um backend depois (Resend, Formspree, Netlify Forms etc.):
 *  - Substitua o handler `onSubmit` por uma chamada `fetch` para o endpoint;
 *  - Trate erros e mostre estado de sucesso/erro;
 *  - Adicione proteção contra spam (já tem honeypot básico abaixo).
 */
export default function Contact() {
  const t = useT();
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string) ?? "";
    const email = (data.get("email") as string) ?? "";
    const date = (data.get("date") as string) ?? "";
    const place = (data.get("place") as string) ?? "";
    const message = (data.get("message") as string) ?? "";

    const subject = `Pardal · ${name || "novo contato"}`;
    const body = [
      `Nome: ${name}`,
      `E-mail: ${email}`,
      `Data: ${date}`,
      `Local: ${place}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <PageTransition>
      <SEO
        title={t((d) => d.meta.contactTitle)}
        description={t((d) => d.meta.contactDescription)}
      />

      <div className={`container ${styles.page}`}>
        <header className={styles.header}>
          <Reveal>
            <Ornament className={styles.ornament} size={140} />
            <p className={styles.eyebrow}>{t((d) => d.contact.eyebrow)}</p>
            <h1 className={styles.title}>{t((d) => d.contact.title)}</h1>
            <p className={styles.lede}>{t((d) => d.contact.lede)}</p>
          </Reveal>
        </header>

        <div className={styles.grid}>
          <Reveal>
            <form className={styles.form} onSubmit={onSubmit}>
              <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>
                  {t((d) => d.contact.fields.name)}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className={styles.input}
                  placeholder={t((d) => d.contact.fields.namePh)}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                  {t((d) => d.contact.fields.email)}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={styles.input}
                  placeholder={t((d) => d.contact.fields.emailPh)}
                />
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="date" className={styles.label}>
                    {t((d) => d.contact.fields.date)}
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    className={styles.input}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="place" className={styles.label}>
                    {t((d) => d.contact.fields.place)}
                  </label>
                  <input
                    id="place"
                    name="place"
                    type="text"
                    className={styles.input}
                    placeholder={t((d) => d.contact.fields.placePh)}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="message" className={styles.label}>
                  {t((d) => d.contact.fields.message)}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className={styles.textarea}
                  placeholder={t((d) => d.contact.fields.messagePh)}
                />
              </div>

              {/* honeypot — humanos não veem; bots costumam preencher */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="visually-hidden"
                aria-hidden="true"
              />

              <button type="submit" className={styles.submit}>
                {sent
                  ? t((d) => d.contact.submitted)
                  : t((d) => d.contact.submit)}
              </button>
              <p className={styles.submitNote}>
                {t((d) => d.contact.submitNote)}
              </p>
            </form>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className={styles.aside}>
              <div>
                <h2 className={styles.asideTitle}>
                  {t((d) => d.contact.asideTitle)}
                </h2>
                <p className={styles.asideText}>
                  {t((d) => d.contact.asideText)}
                </p>
              </div>

              <ul className={styles.asideList}>
                <li className={styles.asideRow}>
                  <span className={styles.asideLabel}>
                    {t((d) => d.contact.asideLabels.whatsapp)}
                  </span>
                  <span className={styles.asideValue}>
                    <a
                      href={SOCIAL.whatsapp.url}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      +55 94 99134-9842
                    </a>
                  </span>
                </li>
                <li className={styles.asideRow}>
                  <span className={styles.asideLabel}>
                    {t((d) => d.contact.asideLabels.instagram)}
                  </span>
                  <span className={styles.asideValue}>
                    <a
                      href={SOCIAL.instagram.url}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {SOCIAL.instagram.handle}
                    </a>
                  </span>
                </li>
                <li className={styles.asideRow}>
                  <span className={styles.asideLabel}>
                    {t((d) => d.contact.asideLabels.email)}
                  </span>
                  <span className={styles.asideValue}>
                    <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                  </span>
                </li>
                <li className={styles.asideRow}>
                  <span className={styles.asideLabel}>
                    {t((d) => d.contact.asideLabels.coverage)}
                  </span>
                  <span className={styles.asideValue}>{SITE.location}</span>
                </li>
              </ul>

              <a
                href={SOCIAL.whatsapp.url}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.wppBtn}
              >
                <WhatsAppIcon size={18} className={styles.wppIcon} />
                {t((d) => d.contact.whatsappCta)}
              </a>
            </aside>
          </Reveal>
        </div>
      </div>
    </PageTransition>
  );
}
