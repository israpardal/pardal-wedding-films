interface LogoProps {
  className?: string;
  /** stroke color — defaults to currentColor */
  stroke?: string;
  /** stroke width in SVG units */
  strokeWidth?: number;
  title?: string;
}

/**
 * Logo Pardal — quatro retângulos sobrepostos, em traço fino.
 * Vetor reproduzido a partir da arte da marca enviada pelo cliente.
 */
export default function PardalLogo({
  className,
  stroke = "currentColor",
  strokeWidth = 1.2,
  title = "Pardal Wedding Films",
}: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={title}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
    >
      <title>{title}</title>
      {/* Quatro retângulos sobrepostos com leve deslocamento — efeito tipo
          múltiplas exposições de filme. Geometria pensada para ficar bonita
          em qualquer tamanho. */}
      <g transform="translate(50 50) rotate(-12)">
        <rect x="-26" y="-20" width="52" height="40" />
        <rect x="-22" y="-16" width="52" height="40" />
        <rect x="-18" y="-12" width="52" height="40" />
        <rect x="-14" y="-8" width="52" height="40" />
      </g>
    </svg>
  );
}
