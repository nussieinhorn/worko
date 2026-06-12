import React from "react";

/**
 * Toggle switch. On = primary indigo.
 */
export function Switch({ checked = false, onChange, disabled = false, label, id }) {
  const switchId = id || React.useId();
  return (
    <label
      htmlFor={switchId}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        fontWeight: 500,
        color: "var(--text-primary)",
      }}
    >
      <span
        style={{
          position: "relative",
          width: "40px",
          height: "24px",
          borderRadius: "var(--radius-pill)",
          background: checked ? "var(--color-primary)" : "var(--slate-300)",
          transition: "background var(--dur-base) var(--ease-out)",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "2px",
            left: checked ? "18px" : "2px",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "var(--shadow-sm)",
            transition: "left var(--dur-base) var(--ease-out)",
          }}
        />
      </span>
      <input
        id={switchId}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.checked)}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
      />
      {label && <span>{label}</span>}
    </label>
  );
}
