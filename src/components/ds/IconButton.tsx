import React from "react";

export type IconButtonVariant = "primary" | "secondary" | "ghost";
export type IconButtonSize = "sm" | "md" | "lg";

const sizes: Record<IconButtonSize, number> = { sm: 36, md: 44, lg: 52 };

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  /** Accessible label (rendered as aria-label). */
  label: string;
}

/**
 * Square icon-only button. Same variants as Button.
 */
export function IconButton({
  children,
  variant = "secondary",
  size = "md",
  disabled = false,
  label,
  onClick,
  style: styleOverride,
  ...rest
}: IconButtonProps) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const dim = sizes[size];

  const variants: Record<IconButtonVariant, React.CSSProperties> = {
    primary: { background: "var(--color-primary)", color: "#fff", border: "1px solid transparent" },
    secondary: { background: "var(--surface)", color: "var(--text-secondary)", border: "1px solid var(--border)" },
    ghost: { background: "transparent", color: "var(--text-secondary)", border: "1px solid transparent" },
  };

  const style: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: dim,
    height: dim,
    borderRadius: "var(--radius-input)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)",
    transform: active && !disabled ? "scale(0.94)" : "scale(1)",
    ...variants[variant],
    ...styleOverride,
  };

  if (hover && !disabled) {
    if (variant === "primary") style.background = "var(--color-primary-hover)";
    if (variant === "secondary") { style.background = "var(--surface-secondary)"; style.color = "var(--text-primary)"; }
    if (variant === "ghost") { style.background = "var(--surface-secondary)"; style.color = "var(--text-primary)"; }
  }

  return (
    <button
      type="button"
      aria-label={label}
      style={style}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      {...rest}
    >
      {children}
    </button>
  );
}
