import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** atraso em segundos antes de revelar (para staggering manual) */
  delay?: number;
  /** distância em px que o conteúdo sobe ao entrar */
  y?: number;
  /** controla quanto do elemento precisa estar visível para disparar */
  amount?: number;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "li";
}

/**
 * Reveal — fade + leve translateY ao entrar na viewport.
 * Respeita prefers-reduced-motion automaticamente (via framer-motion).
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  amount = 0.2,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
