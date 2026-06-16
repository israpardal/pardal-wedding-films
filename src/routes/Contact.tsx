import { useState } from "react";
import type { FormEvent } from "react";

import PageTransition from "../components/PageTransition";
import Reveal from "../components/Reveal";
import SEO from "../components/SEO";
import { SITE, SOCIAL } from "../data/site";
import styles from "./Contact.module.css";

/**
 * Formulário de contato — sem backend nesta fase.
 * Por enquanto, o submit monta um `mailto:` com os campos preenchidos.
 *
 * Para conectar a um backend depois:
 *  - Substitua o handler `onSubmit` por uma chamada `fetch` para o seu endpoint
 *    (ex.: Resend, Formspree, Netlify Forms, ou rota própria);
 *  - Lembre de tratar erros e mostrar estado de sucesso/erro;
 *  - Adicione proteção contra spam (honeypot ou hCaptcha).
 */
export default function Contact() {
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

    const subject = `Conversa Pardal — ${name || "novo contato"}`;
    const body = [
      `Nome: ${name}`,
      `E-mail: ${email}`,
      `Data do casamento: ${date}`,
      `Local: ${place}`,
      "",
      "Mensagem:",
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
        title={`Contato · ${SITE.name}`}
        description="Fale com a Pardal — filmes de casamento únicos, poéticos e atemporais. Atendemos em todo o Brasil."
      />

      <div className={`container ${styles.page}`}>
        <header className={styles.header}>
          <Reveal>
            <p className={styles.eyebrow}>Contato</p>
            <h1 className={styles.title}>Conta pra gente sobre o filme de vocês.</h1>
            <p className={styles.lede}>
              Preenche aí embaixo o que vocês souberem por enquanto — data,
              cidade, e o que vocês imaginam. Respondemos com calma, sempre por
              e-mail ou WhatsApp.
            </p>
          </Reveal>
        </header>

        <div className={styles.grid}>
          <Reveal>
            <form className={styles.form} onSubmit={onSubmit}>
              <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>
                  Nome do casal
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className={styles.input}
                  placeholder="Ana & Tomás"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={styles.input}
                  placeholder="voces@exemplo.com"
                />
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="date" className={styles.label}>
                    Data do casamento
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
                    Cidade / Estado
                  </label>
                  <input
                    id="place"
                    name="place"
                    type="text"
                    className={styles.input}
                    placeholder="Tiradentes — MG"
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="message" className={styles.label}>
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className={styles.textarea}
                  placeholder="Como vocês imaginam o filme? O que é importante para vocês?"
                />
              </div>

              {/* honeypot simples — bots costumam preencher; humanos não veem */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="visually-hidden"
                aria-hidden="true"
              />

              <button type="submit" className={styles.submit}>
                {sent ? "Aberto no seu e-mail" : "Enviar mensagem"}
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className={styles.aside}>
              <div>
                <h2 className={styles.asideTitle}>Ou diretamente.</h2>
                <p className={styles.asideText}>
                  Se preferir, fala com a gente pelo WhatsApp ou pelo Instagram.
                </p>
              </div>

              <div>
                <div className={styles.asideRow}>
                  <span className={styles.asideLabel}>WhatsApp</span>
                  <span className={styles.asideValue}>
                    <a
                      href={SOCIAL.whatsapp.url}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      +55 94 99134-9842
                    </a>
                  </span>
                </div>
                <div className={styles.asideRow}>
                  <span className={styles.asideLabel}>Instagram</span>
                  <span className={styles.asideValue}>
                    <a
                      href={SOCIAL.instagram.url}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {SOCIAL.instagram.handle}
                    </a>
                  </span>
                </div>
                <div className={styles.asideRow}>
                  <span className={styles.asideLabel}>E-mail</span>
                  <span className={styles.asideValue}>
                    <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                  </span>
                </div>
                <div className={styles.asideRow}>
                  <span className={styles.asideLabel}>Atendimento</span>
                  <span className={styles.asideValue}>{SITE.location}</span>
                </div>
              </div>

              <a
                href={SOCIAL.whatsapp.url}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.wppBtn}
              >
                {SOCIAL.whatsapp.cta}
              </a>
            </aside>
          </Reveal>
        </div>
      </div>
    </PageTransition>
  );
}
