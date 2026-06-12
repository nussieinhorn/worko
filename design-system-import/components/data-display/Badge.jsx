import React from "react";

const tones = {
  neutral: { bg: "var(--surface-secondary)", fg: "var(--text-secondary)" },
  primary: { bg: "var(--color-primary-light)", fg: "var(--color-primary-hover)" },
  accent:  { bg: "var(--cyan-50)", fg: "var(--cyan-600)" },
  success: { bg: "var(--green-50)", fg: "#047857" },
  warning: { bg: "var(--amber-50)", fg: "#B45309" },
  error:   { bg: "var(--red-50)", fg: "#B91C1C" },
};

/**
 * Small status pill. Tones map to semantic colors. `dot` adds a leading status dot.
 */
export function Badge({ children, tone = "neutral", dot = false }) {
  const t = tones[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        background: t.bg,
        color: t.fg,
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-xs)",
        fontWeight: 600,
        lineHeight: 1,
        padding: "5px 10px",
        borderRadius: "var(--radius-pill)",
        whiteSpace: "nowrap",
      }}
    >
      {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }} />}
      {children}
    </span>
  );
}
