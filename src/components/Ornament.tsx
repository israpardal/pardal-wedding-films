interface OrnamentProps {
  className?: string;
  /** Tamanho aproximado em px (largura) */
  size?: number;
  /** Cor do traço */
  stroke?: string;
}

/**
 * Ornamento de convite de casamento — diamante central com filetes,
 * pontos e arabescos finos saindo dos lados.
 * Vetor pequeno, sem peso, escala suave.
 */
export default function Ornament({
  className,
  size = 96,
  stroke = "currentColor",
}: OrnamentProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 28"
      width={size}
      height={(size * 28) / 200}
      className={className}
      aria-hidden="true"
      fill="none"
      stroke={stroke}
      strokeWidth="0.8"
      strokeLinecap="round"
    >
      {/* filete principal */}
      <line x1="0" y1="14" x2="78" y2="14" />
      <line x1="122" y1="14" x2="200" y2="14" />

      {/* arabesco esquerdo — curva suave */}
      <path d="M62 14 c4 -4 8 -4 12 0" />
      <path d="M68 14 c2 -2 4 -2 6 0" />

      {/* arabesco direito — espelhado */}
      <path d="M138 14 c-4 -4 -8 -4 -12 0" />
      <path d="M132 14 c-2 -2 -4 -2 -6 0" />

      {/* diamante central */}
      <path d="M100 4 L108 14 L100 24 L92 14 Z" />
      <path d="M100 8 L104 14 L100 20 L96 14 Z" />

      {/* pontos */}
      <circle cx="40" cy="14" r="0.9" fill={stroke} stroke="none" />
      <circle cx="160" cy="14" r="0.9" fill={stroke} stroke="none" />
    </svg>
  );
}
