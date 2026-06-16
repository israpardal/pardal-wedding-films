interface LogoProps {
  className?: string;
  title?: string;
}

/**
 * Logo oficial da marca — quatro retângulos sobrepostos, em traço fino.
 * Renderizado como <img> apontando para o PNG real em /public/images/logo.png.
 *
 * A PNG é preta sobre fundo transparente. Pra inverter pra branco em fundos
 * escuros (header sobre o hero), use a classe `.logoInvert` no CSS de Header
 * — aplica `filter: invert(1)` quando o header está em modo "light".
 */
export default function PardalLogo({
  className,
  title = "Pardal Wedding Films",
}: LogoProps) {
  return (
    <img
      src="/images/logo.png"
      alt={title}
      className={className}
      width={36}
      height={44}
      decoding="async"
      loading="eager"
    />
  );
}
