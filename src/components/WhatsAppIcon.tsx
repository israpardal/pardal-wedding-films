interface IconProps {
  className?: string;
  size?: number | string;
  title?: string;
}

/**
 * WhatsApp — versão monocromática em traço.
 * Sem o verde da marca, em harmonia com a paleta preto/branco/navy.
 */
export default function WhatsAppIcon({
  className,
  size = 20,
  title = "WhatsApp",
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={title}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>{title}</title>
      <path d="M3.5 20.5l1.4-4.6a8.5 8.5 0 1 1 3.1 3.1L3.5 20.5z" />
      <path d="M8.7 9.2c.2-.5.5-.5.8-.5h.6c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.3.5c-.1.1-.1.3 0 .4a5.6 5.6 0 0 0 2.6 2.5c.2.1.3.1.4 0l.5-.6c.2-.2.4-.2.6-.1l1.9.9c.3.1.3.3.3.6 0 .8-.6 1.5-1.4 1.5a7.2 7.2 0 0 1-6-4.2c-.6-1-.7-1.7-.7-2.1 0-.9.8-1.5.9-1.5z" />
    </svg>
  );
}
