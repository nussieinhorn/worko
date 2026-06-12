import React from "react";

/**
 * Surface card. White background, soft shadow, 16px radius, generous padding.
 */
export function Card({ children, padding = "var(--space-6)", interactive = false, style = {}, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-card)",
        boxShadow: interactive && hover ? "var(--shadow-lg)" : "var(--shadow-sm)",
        padding,
        transition: "box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)",
        transform: interactive && hover ? "translateY(-2px)" : "none",
        cursor: interactive ? "pointer" : "default",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
