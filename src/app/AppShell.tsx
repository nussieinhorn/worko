/* WORKO app shell — sidebar nav + top bar + content slot. */
import React from "react";
import { Avatar, IconButton } from "../components/ds";
import { Icon, type IconName } from "../components/Icon";
import { WORKO_DATA } from "../data/data";

interface Presence {
  id: string;
  label: string;
  color: string;
}

const PRESENCE: Presence[] = [
  { id: "active", label: "Active", color: "#10B981" },
  { id: "focusing", label: "Focusing", color: "#6366F1" },
  { id: "away", label: "Away", color: "#F59E0B" },
  { id: "dnd", label: "Do not disturb", color: "#EF4444" },
];

export type NavId = "home" | "tasks" | "projects" | "team" | "reports" | "settings";

const NAV: Array<{ id: NavId; label: string; icon: IconName }> = [
  { id: "home", label: "Focus", icon: "Target" },
  { id: "tasks", label: "My tasks", icon: "CheckSquare" },
  { id: "projects", label: "Projects", icon: "FolderKanban" },
  { id: "team", label: "Team", icon: "Users" },
  { id: "reports", label: "Reports", icon: "BarChart3" },
  { id: "settings", label: "Settings", icon: "Settings" },
];

export function Sidebar({ active, onNavigate }: { active: NavId; onNavigate: (id: NavId) => void }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const w = collapsed ? 72 : 232;
  return (
    <aside style={{
      width: w, flexShrink: 0, height: "100%", background: "var(--surface)",
      borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column",
      padding: collapsed ? "20px 12px" : "20px 14px", position: "relative",
      transition: "width var(--dur-base) var(--ease-out), padding var(--dur-base) var(--ease-out)",
    }}>
      <button onClick={() => setCollapsed((c) => !c)} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} style={{
        position: "absolute", top: 26, right: -13, zIndex: 6, width: 26, height: 26, borderRadius: "50%",
        background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-xs)",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", padding: 0,
      }}>
        <Icon name={collapsed ? "ChevronRight" : "ChevronLeft"} size={15} />
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: collapsed ? "4px 0 22px" : "4px 8px 22px", justifyContent: collapsed ? "center" : "flex-start" }}>
        <img src="/worko-mark.svg" alt="" width="30" height="30" />
        {!collapsed && <span style={{ fontWeight: 800, fontSize: 19, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>WORKO</span>}
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV.map((item) => {
          const on = item.id === active;
          return (
            <button key={item.id} onClick={() => onNavigate(item.id)} title={collapsed ? item.label : undefined} style={{
              display: "flex", alignItems: "center", gap: 11, width: "100%",
              padding: collapsed ? "10px 0" : "9px 10px", border: "none", cursor: "pointer", textAlign: "left",
              justifyContent: collapsed ? "center" : "flex-start",
              borderRadius: "var(--radius-input)",
              background: on ? "var(--color-primary-light)" : "transparent",
              color: on ? "var(--color-primary-hover)" : "var(--text-secondary)",
              fontFamily: "var(--font-sans)", fontSize: 14.5, fontWeight: on ? 600 : 500,
              transition: "background var(--dur-fast) var(--ease-out)",
            }}>
              <Icon name={item.icon} size={19} stroke={on ? 2.2 : 2} />
              {!collapsed && item.label}
            </button>
          );
        })}
      </nav>

      <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
        {!collapsed && (
          <div style={{
            display: "flex", gap: 11, alignItems: "flex-start", padding: 12,
            background: "var(--bg-app)", borderRadius: "var(--radius-card)",
          }}>
            <Icon name="Sparkles" size={18} color="var(--color-accent)" style={{ marginTop: 1 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>5-day streak</div>
              <div style={{ fontSize: 12.5, color: "var(--text-muted)", marginTop: 2 }}>Keep the momentum going.</div>
            </div>
          </div>
        )}
        <UserStatus collapsed={collapsed} />
      </div>
    </aside>
  );
}

function UserStatus({ collapsed }: { collapsed: boolean }) {
  const [status, setStatus] = React.useState(PRESENCE[0]);
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen((o) => !o)} title={collapsed ? `${WORKO_DATA.user.name} · ${status.label}` : undefined} style={{
        display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "6px 4px", border: "none",
        background: open ? "var(--bg-app)" : "transparent", borderRadius: "var(--radius-input)", cursor: "pointer",
        justifyContent: collapsed ? "center" : "flex-start", fontFamily: "var(--font-sans)", textAlign: "left",
        transition: "background var(--dur-fast) var(--ease-out)",
      }}>
        <span style={{ position: "relative", display: "inline-flex", flexShrink: 0 }}>
          <Avatar name={WORKO_DATA.user.name} size="sm" />
          <span style={{ position: "absolute", right: -1, bottom: -1, width: 11, height: 11, borderRadius: "50%", background: status.color, border: "2px solid var(--surface)" }} />
        </span>
        {!collapsed && (
          <span style={{ minWidth: 0, flex: 1 }}>
            <span style={{ display: "block", fontSize: 13.5, fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap" }}>{WORKO_DATA.user.name}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--text-muted)" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: status.color }} />{status.label}
            </span>
          </span>
        )}
        {!collapsed && <Icon name="ChevronsUpDown" size={15} color="var(--text-muted)" />}
      </button>
      {open && (
        <div style={{
          position: "absolute", bottom: "calc(100% + 8px)", left: 0, minWidth: 204, zIndex: 20,
          padding: 6, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, boxShadow: "var(--shadow-lg)",
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--text-muted)", padding: "6px 10px 4px" }}>Set status</div>
          {PRESENCE.map((p) => (
            <button key={p.id} onClick={() => { setStatus(p); setOpen(false); }} style={{
              display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", padding: "8px 10px",
              border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 13.5, fontWeight: 500,
              color: "var(--text-primary)", background: p.id === status.id ? "var(--bg-app)" : "transparent",
            }}
              onMouseEnter={(e) => { if (p.id !== status.id) e.currentTarget.style.background = "var(--bg-app)"; }}
              onMouseLeave={(e) => { if (p.id !== status.id) e.currentTarget.style.background = "transparent"; }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: p.color }} />
              <span style={{ flex: 1 }}>{p.label}</span>
              {p.id === status.id && <Icon name="Check" size={15} color="var(--color-primary)" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function TopBar({ title, subtitle, children }: { title: string; subtitle?: string; children?: React.ReactNode }) {
  return (
    <header style={{
      display: "flex", alignItems: "center", gap: 16, padding: "18px 32px",
      borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.85)",
      backdropFilter: "blur(8px)", position: "sticky", top: 0, zIndex: 5,
    }}>
      <div style={{ minWidth: 0 }}>
        <h1 style={{ margin: 0, fontSize: 19, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>{title}</h1>
        {subtitle && <p style={{ margin: "2px 0 0", fontSize: 13.5, color: "var(--text-muted)" }}>{subtitle}</p>}
      </div>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
        <label style={{
          display: "flex", alignItems: "center", gap: 8, padding: "0 12px", height: 40,
          background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-input)",
          color: "var(--text-muted)", width: 220,
        }}>
          <Icon name="Search" size={17} />
          <input placeholder="Search" style={{
            border: "none", outline: "none", background: "transparent", flex: 1,
            fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--text-primary)", minWidth: 0,
          }} />
        </label>
        <IconButton label="Notifications" variant="secondary"><Icon name="Bell" size={18} /></IconButton>
        {children}
      </div>
    </header>
  );
}
