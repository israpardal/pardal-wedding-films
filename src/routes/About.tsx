import PageTransition from "../components/PageTransition";
import Reveal from "../components/Reveal";
import SEO from "../components/SEO";
import { SITE } from "../data/site";
import styles from "./About.module.css";

export default function About() {
  return (
    <PageTransition>
      <SEO
        title={`Sobre · ${SITE.name}`}
        description="Pardal Wedding Films — único, poético, analógico, atemporal. Brasil, atendendo em todo o território nacional."
      />

      <div className={`container ${styles.page}`}>
        <section className={styles.intro}>
          <Reveal>
            <p className={styles.eyebrow}>Sobre</p>
            <h1 className={styles.title}>
              Um jeito quieto de olhar para o casamento.
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <div className={styles.lede}>
              <p>
                A Pardal nasceu de uma vontade simples: fazer filmes de casamento
                que pareçam filme — não cobertura. Trabalhamos com olho de
                documentarista e mão de quem gosta de poesia.
              </p>
              <p>
                Atendemos em todo o Brasil. Onde tiver casamento que faça
                sentido para vocês, a gente vai.
              </p>
            </div>
          </Reveal>
        </section>

        <Reveal>
          {/* TODO: substituir por foto preto e branco real */}
          <figure className={styles.figure}>
            <span className={styles.figureLabel}>imagem preto e branco</span>
          </figure>
        </Reveal>

        <section className={styles.body}>
          <Reveal>
            <h2 className={styles.bodyTitle}>
              Filmar pouco. Olhar muito.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className={styles.bodyText}>
              <p>
                A gente chega cedo, presta atenção e quase desaparece. Não
                interferimos no dia — o filme vem do que está acontecendo, não
                de uma cena montada.
              </p>
              <p>
                Gostamos da luz natural, do som do ambiente, dos gestos
                pequenos. Quando a gente faz uma escolha técnica, é para que ela
                não apareça. O que precisa aparecer é vocês.
              </p>
              <p>
                Depois, no estúdio, montamos o filme com a mesma paciência. Sem
                trilha apressada, sem efeito de moda. O resultado é um filme que,
                em dez ou vinte anos, ainda vai parecer escrito agora.
              </p>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="values-title">
          <Reveal>
            <h2 id="values-title" className="visually-hidden">
              Valores
            </h2>
          </Reveal>

          <ul className={styles.values}>
            <Reveal as="li" className={styles.value} delay={0.05}>
              <span className={styles.valueLabel}>01</span>
              <h3 className={styles.valueTitle}>Único</h3>
              <p className={styles.valueText}>
                Cada casal tem o filme dele. Não usamos modelo, não copiamos a
                gente mesmo.
              </p>
            </Reveal>
            <Reveal as="li" className={styles.value} delay={0.15}>
              <span className={styles.valueLabel}>02</span>
              <h3 className={styles.valueTitle}>Poético</h3>
              <p className={styles.valueText}>
                Imagem que respira. Silêncio quando é silêncio. Música quando faz
                sentido.
              </p>
            </Reveal>
            <Reveal as="li" className={styles.value} delay={0.25}>
              <span className={styles.valueLabel}>03</span>
              <h3 className={styles.valueTitle}>Analógico</h3>
              <p className={styles.valueText}>
                Textura suave, cor calma, grão fino. Sem corre de efeito; com
                gosto de filme.
              </p>
            </Reveal>
            <Reveal as="li" className={styles.value} delay={0.35}>
              <span className={styles.valueLabel}>04</span>
              <h3 className={styles.valueTitle}>Atemporal</h3>
              <p className={styles.valueText}>
                O nosso compromisso é que o filme envelheça bem — e talvez fique
                ainda melhor com o tempo.
              </p>
            </Reveal>
          </ul>
        </section>
      </div>
    </PageTransition>
  );
}
