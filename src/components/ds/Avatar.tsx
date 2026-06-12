export type AvatarSize = "xs" | "sm" | "md" | "lg";

const sizes: Record<AvatarSize, number> = { xs: 24, sm: 32, md: 40, lg: 48 };
const palette = ["#4F46E5", "#06B6D4", "#10B981", "#F59E0B", "#6366F1", "#0891B2"];

function initials(name = "") {
  return name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

export interface AvatarProps {
  name?: string;
  src?: string;
  size?: AvatarSize;
}

/**
 * Avatar with image or auto-colored initials fallback.
 */
export function Avatar({ name = "", src, size = "md" }: AvatarProps) {
  const dim = sizes[size];
  const color = palette[(name.charCodeAt(0) || 0) % palette.length];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: dim,
        height: dim,
        borderRadius: "50%",
        background: src ? "transparent" : color,
        color: "#fff",
        fontFamily: "var(--font-sans)",
        fontSize: dim * 0.38,
        fontWeight: 600,
        overflow: "hidden",
        flexShrink: 0,
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.25)",
      }}
    >
      {src ? <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : initials(name)}
    </span>
  );
}

export interface AvatarGroupProps {
  users?: Array<{ name?: string; src?: string }>;
  max?: number;
  size?: AvatarSize;
}

/**
 * Overlapping avatar stack. Pass `users` as [{name, src}] and optional `max`.
 */
export function AvatarGroup({ users = [], max = 4, size = "sm" }: AvatarGroupProps) {
  const dim = sizes[size];
  const shown = users.slice(0, max);
  const extra = users.length - shown.length;
  return (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      {shown.map((u, i) => (
        <span key={i} style={{ marginLeft: i === 0 ? 0 : -dim * 0.3, borderRadius: "50%", boxShadow: "0 0 0 2px var(--surface)" }}>
          <Avatar {...u} size={size} />
        </span>
      ))}
      {extra > 0 && (
        <span
          style={{
            marginLeft: -dim * 0.3,
            width: dim, height: dim, borderRadius: "50%",
            background: "var(--surface-secondary)", color: "var(--text-secondary)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-sans)", fontSize: dim * 0.34, fontWeight: 600,
            boxShadow: "0 0 0 2px var(--surface)",
          }}
        >
          +{extra}
        </span>
      )}
    </span>
  );
}
