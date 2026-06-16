import { Link } from "react-router-dom";

import PageTransition from "../components/PageTransition";
import Reveal from "../components/Reveal";
import SEO from "../components/SEO";
import { SITE } from "../data/site";
import styles from "./Investment.module.css";

/**
 * Investimento — VALORES e nomes de pacotes são PLACEHOLDER.
 * TODO: substituir pelos pacotes reais antes do site ir ao ar.
 */
const PACKAGES = [
  {
    label: "Pacote 01",
    name: "Filme essência",
    price: "sob consulta",
    intro:
      "Para casamentos íntimos. Um filme curto e contemplativo, com o registro dos momentos centrais do dia.",
    features: [
      "Filme de até 5 minutos",
      "Cobertura de até 6 horas",
      "Som ambiente e trilha selecionada",
      "Entrega digital em alta resolução",
    ],
    featured: false,
  },
  {
    label: "Pacote 02",
    name: "Filme completo",
    price: "sob consulta",
    intro:
      "O coração do nosso trabalho. Cobertura ampla, montagem cinematográfica e um filme que respira do começo ao fim.",
    features: [
      "Filme principal de 8 a 12 minutos",
      "Teaser para redes sociais",
      "Cobertura do dia inteiro",
      "Som direto + trilha original ou licenciada",
      "Entrega digital em alta resolução",
    ],
    featured: true,
  },
  {
    label: "Pacote 03",
    name: "Filme + arquivo",
    price: "sob consulta",
    intro:
      "Para quem quer o filme editado e também o material bruto guardado — para o tempo, para os filhos, para depois.",
    features: [
      "Tudo do pacote completo",
      "Backup do material bruto",
      "Filme estendido (longa-versão familiar)",
      "Pendrive em embalagem analógica",
    ],
    featured: false,
  },
];

export default function Investment() {
  return (
    <PageTransition>
      <SEO
        title={`Investimento · ${SITE.name}`}
        description="Pacotes e investimento da Pardal Wedding Films — filmes de casamento atemporais, em todo o Brasil."
      />

      <div className={`container ${styles.page}`}>
        <header className={styles.header}>
          <Reveal>
            <p className={styles.eyebrow}>Investimento</p>
            <h1 className={styles.title}>
              Pacotes pensados como filmes — não como pacotes.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={styles.lede}>
              Os pacotes abaixo são pontos de partida. Cada casamento é
              diferente, então depois de uma boa conversa montamos a proposta
              certa para a data, o lugar e o tipo de filme que vocês querem
              guardar.
            </p>
          </Reveal>
        </header>

        <section
          className={styles.packages}
          aria-label="Pacotes de filmagem"
        >
          {PACKAGES.map((pkg, i) => (
            <Reveal
              key={pkg.label}
              as="article"
              delay={i * 0.08}
              className={`${styles.pkg} ${pkg.featured ? styles.pkgFeatured : ""}`}
            >
              <span className={styles.pkgLabel}>{pkg.label}</span>
              <h2 className={styles.pkgName}>{pkg.name}</h2>
              <p className={styles.pkgPrice}>{pkg.price}</p>
              <p className={styles.pkgIntro}>{pkg.intro}</p>
              <p className={styles.pkgFeatureTitle}>Inclui</p>
              <ul className={styles.pkgFeatures}>
                {pkg.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <Link to="/contato" className={styles.pkgCta}>
                Pedir proposta
              </Link>
            </Reveal>
          ))}
        </section>

        <section className={styles.note}>
          <Reveal>
            <p className={styles.noteEyebrow}>Como funciona</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className={styles.noteBody}>
              <p>
                A proposta certa nasce da conversa. Conta para a gente a data, o
                lugar, e um pouco do que vocês imaginam para o filme — a gente
                volta com uma proposta personalizada, e com tempo para vocês
                decidirem com calma.
              </p>
              <p>
                Como atendemos em todo o Brasil, o deslocamento entra na proposta
                quando o casamento é fora do nosso eixo principal.
              </p>
            </div>
          </Reveal>
        </section>
      </div>
    </PageTransition>
  );
}
