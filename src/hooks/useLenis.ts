/**
 * Lenis foi desligado deliberadamente.
 *
 * Em hardware mais fraco (Mac antigo, celular intermediário), o smooth scroll
 * interpolado adiciona latência percebida — o site fica "pesado" porque cada
 * rolada de mouse vira uma animação de ~1s. Voltei pro scroll nativo, que é
 * instantâneo e tem a UX que o sistema operacional já entrega.
 *
 * Pra reativar depois: descomente o conteúdo e reinstale `lenis` no package.json.
 */
export function useLenis() {
  // intencionalmente vazio — scroll nativo
}
