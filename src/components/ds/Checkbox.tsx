import React from "react";

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  /** Round, task-style checkbox with strikethrough label when done. */
  round?: boolean;
  id?: string;
}

/**
 * Checkbox. Checked = primary indigo with white check. Round option via `round` (task-style).
 */
export function Checkbox({ checked = false, onChange, disabled = false, label, round = false, id }: CheckboxProps) {
  const autoId = React.useId();
  const boxId = id || autoId;
  return (
    <label
      htmlFor={boxId}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-base)",
        color: "var(--text-primary)",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "22px",
          height: "22px",
          borderRadius: round ? "50%" : "7px",
          border: `2px solid ${checked ? "var(--color-primary)" : "var(--border-strong)"}`,
          background: checked ? "var(--color-primary)" : "transparent",
          transition: "all var(--dur-fast) var(--ease-out)",
          flexShrink: 0,
        }}
      >
        {checked && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      <input
        id={boxId}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.checked)}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
      />
      {label && <span style={{ textDecoration: checked && round ? "line-through" : "none", color: checked && round ? "var(--text-muted)" : "var(--text-primary)" }}>{label}</span>}
    </label>
  );
}
