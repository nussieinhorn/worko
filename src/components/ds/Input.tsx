import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leadingIcon?: React.ReactNode;
}

/**
 * Clean, minimal text input. Focus state uses primary indigo ring.
 */
export function Input({
  label,
  hint,
  error,
  leadingIcon = null,
  type = "text",
  disabled = false,
  id,
  ...rest
}: InputProps) {
  const [focus, setFocus] = React.useState(false);
  const autoId = React.useId();
  const inputId = id || autoId;

  const wrap: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: disabled ? "var(--surface-secondary)" : "var(--surface)",
    border: `1px solid ${error ? "var(--color-error)" : focus ? "var(--color-primary)" : "var(--border)"}`,
    borderRadius: "var(--radius-input)",
    padding: "0 14px",
    height: "44px",
    boxShadow: focus && !error ? "var(--ring)" : "none",
    transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "var(--font-sans)" }}>
      {label && (
        <label htmlFor={inputId} style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-primary)" }}>
          {label}
        </label>
      )}
      <div style={wrap}>
        {leadingIcon && <span style={{ color: "var(--text-muted)", display: "inline-flex" }}>{leadingIcon}</span>}
        <input
          id={inputId}
          type={type}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-base)",
            color: "var(--text-primary)",
            height: "100%",
            minWidth: 0,
          }}
          {...rest}
        />
      </div>
      {(hint || error) && (
        <span style={{ fontSize: "var(--text-sm)", color: error ? "var(--color-error)" : "var(--text-muted)" }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
