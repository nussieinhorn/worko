import React from "react";

/**
 * Underline tabs. `items` = [{id, label, icon?}]. Controlled via value/onChange.
 */
export function Tabs({ items = [], value, onChange }) {
  const active = value ?? items[0]?.id;
  return (
    <div style={{ display: "flex", gap: "4px", borderBottom: "1px solid var(--border)", fontFamily: "var(--font-sans)" }}>
      {items.map((it) => {
        const on = it.id === active;
        return (
          <button
            key={it.id}
            type="button"
            onClick={() => onChange && onChange(it.id)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              padding: "10px 14px",
              marginBottom: "-1px",
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-sm)",
              fontWeight: 600,
              color: on ? "var(--color-primary)" : "var(--text-muted)",
              borderBottom: `2px solid ${on ? "var(--color-primary)" : "transparent"}`,
              transition: "color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)",
            }}
          >
            {it.icon}
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
