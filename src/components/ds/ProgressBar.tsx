export type ProgressTone = "primary" | "accent" | "success";

export interface ProgressBarProps {
  value?: number;
  tone?: ProgressTone;
  height?: number;
  showLabel?: boolean;
}

/**
 * Slim progress bar. Indigo fill by default; pass `tone` for accent/success.
 */
export function ProgressBar({ value = 0, tone = "primary", height = 8, showLabel = false }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value));
  const fills: Record<ProgressTone, string> = {
    primary: "var(--color-primary)",
    accent: "var(--color-accent)",
    success: "var(--color-success)",
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", fontFamily: "var(--font-sans)" }}>
      <div style={{ flex: 1, height, background: "var(--surface-secondary)", borderRadius: "var(--radius-pill)", overflow: "hidden" }}>
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: fills[tone],
            borderRadius: "var(--radius-pill)",
            transition: "width var(--dur-slow) var(--ease-out)",
          }}
        />
      </div>
      {showLabel && (
        <span style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-secondary)", minWidth: 38, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
          {pct}%
        </span>
      )}
    </div>
  );
}
