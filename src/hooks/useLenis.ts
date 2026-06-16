import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scroll global com Lenis.
 *
 * - Instancia uma vez no nível raiz.
 * - Respeita `prefers-reduced-motion` (Lenis trata, mas reforço aqui).
 * - Desliga em telas com toque (mobile/tablet): scroll nativo iOS/Android é
 *   melhor que o emulado e mais responsivo a gestos de retorno/refresh.
 */
export function useLenis() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const hasTouch = window.matchMedia("(pointer: coarse)").matches;
    if (hasTouch) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
