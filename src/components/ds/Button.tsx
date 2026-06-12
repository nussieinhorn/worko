import React from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "accent";
export type ButtonSize = "sm" | "md" | "lg";

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: "8px 14px", fontSize: "var(--text-sm)", height: "36px" },
  md: { padding: "10px 18px", fontSize: "var(--text-base)", height: "44px" },
  lg: { padding: "13px 24px", fontSize: "var(--text-lg)", height: "52px" },
};

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: "var(--color-primary)",
    color: "var(--text-on-primary)",
    border: "1px solid transparent",
  },
  secondary: {
    background: "var(--surface)",
    color: "var(--text-primary)",
    border: "1px solid var(--border)",
  },
  ghost: {
    background: "transparent",
    color: "var(--color-primary)",
    border: "1px solid transparent",
  },
  accent: {
    background: "var(--color-accent)",
    color: "#063b45",
    border: "1px solid transparent",
  },
};

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

/**
 * WORKO primary button. Solid indigo by default; secondary, ghost, accent variants.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  leadingIcon = null,
  trailingIcon = null,
  onClick,
  type = "button",
  ...rest
}: ButtonProps) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontFamily: "var(--font-sans)",
    fontWeight: 600,
    lineHeight: 1,
    borderRadius: "var(--radius-button)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? "100%" : "auto",
    transition: "background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)",
    transform: active && !disabled ? "scale(0.97)" : "scale(1)",
    whiteSpace: "nowrap",
    ...sizeStyles[size],
    ...variantStyles[variant],
  };

  if (hover && !disabled) {
    if (variant === "primary") base.background = "var(--color-primary-hover)";
    if (variant === "secondary") { base.background = "var(--surface-secondary)"; base.border = "1px solid var(--border-strong)"; }
    if (variant === "ghost") base.background = "var(--color-primary-light)";
    if (variant === "accent") base.background = "var(--color-accent-hover)";
  }

  return (
    <button
      type={type}
      style={base}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      {...rest}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
}
