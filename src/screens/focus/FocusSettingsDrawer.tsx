/* Focus settings — edited in a right-side drawer as a local draft, committed
   only when the user hits Save. A trigger button lives in the side panel. */
import React from "react";
import { Button, IconButton } from "../../components/ds";
import { Icon } from "../../components/Icon";
import type { Priority } from "../../data/data";
import { useWorkspace, type FocusSettings } from "../../store/workspace";

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

function Stepper({ value, min, max, suffix, onStep }: { value: number; min: number; max: number; suffix?: string; onStep: (delta: number) => void }) {
  const btn = (dir: "decrease" | "increase", delta: number, disabled: boolean) => (
    <button onClick={() => onStep(delta)} disabled={disabled} aria-label={dir} style={{
      width: 30, height: 30, borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface)",
      cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1, color: "var(--text-secondary)",
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>{dir === "decrease" ? <Icon name="ChevronLeft" size={15} /> : <Icon name="ChevronRight" size={15} />}</button>
  );
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {btn("decrease", -1, value <= min)}
      <span style={{ minWidth: 56, textAlign: "center", fontSize: 14, fontWeight: 700, color: "var(--text-primary)", fontVariantNumeric: "tabular-nums" }}>
        {value}{suffix ? ` ${suffix}` : ""}
      </span>
      {btn("increase", +1, value >= max)}
    </div>
  );
}

function Row({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderTop: "1px solid var(--border)" }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text-primary)" }}>{label}</div>
        {hint && <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 1 }}>{hint}</div>}
      </div>
      {children}
    </div>
  );
}

export function FocusSettingsDrawer({ onClose }: { onClose: () => void }) {
  const { settings, updateSettings, projects } = useWorkspace();
  const [draft, setDraft] = React.useState<FocusSettings>(settings);

  const dirty =
    draft.dailyGoal !== settings.dailyGoal ||
    draft.sessionMinutes !== settings.sessionMinutes ||
    draft.priorityOrder.join() !== settings.priorityOrder.join() ||
    draft.prioritizedProjectIds.slice().sort().join() !== settings.prioritizedProjectIds.slice().sort().join();

  const movePriority = (i: number, dir: -1 | 1) => {
    setDraft((s) => {
      const next = s.priorityOrder.slice();
      const j = i + dir;
      if (j < 0 || j >= next.length) return s;
      [next[i], next[j]] = [next[j], next[i]];
      return { ...s, priorityOrder: next };
    });
  };

  const toggleProject = (id: string) => {
    setDraft((s) => {
      const set = new Set(s.prioritizedProjectIds);
      set.has(id) ? set.delete(id) : set.add(id);
      return { ...s, prioritizedProjectIds: [...set] };
    });
  };

  const save = () => { updateSettings(draft); onClose(); };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", justifyContent: "flex-end" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(15,23,42,0.32)", backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)", animation: "focusOverlayIn var(--dur-fast) var(--ease-out)" }} />
      <div style={{
        position: "relative", width: 420, maxWidth: "100%", height: "100%", background: "var(--surface)",
        boxShadow: "var(--shadow-xl)", display: "flex", flexDirection: "column",
        animation: "drawerIn var(--dur-slow) var(--ease-out)",
      }}>
        {/* header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "20px 24px", borderBottom: "1px solid var(--border)" }}>
          <Icon name="Settings" size={18} color="var(--color-primary)" />
          <span style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>Focus settings</span>
          <IconButton label="Close" variant="ghost" size="sm" onClick={onClose} style={{ marginLeft: "auto" }}><Icon name="X" size={18} /></IconButton>
        </div>

        {/* body */}
        <div style={{ flex: 1, minHeight: 0, overflow: "auto", padding: "8px 24px 24px" }}>
          <Row label="Daily focus goal" hint="Tasks you aim to finish today">
            <Stepper value={draft.dailyGoal} min={1} max={20} onStep={(d) => setDraft((s) => ({ ...s, dailyGoal: clamp(s.dailyGoal + d, 1, 20) }))} />
          </Row>

          <Row label="Session length" hint="Minutes per focus sprint">
            <Stepper value={draft.sessionMinutes} min={5} max={90} suffix="min" onStep={(d) => setDraft((s) => ({ ...s, sessionMinutes: clamp(s.sessionMinutes + d * 5, 5, 90) }))} />
          </Row>

          <div style={{ padding: "14px 0", borderTop: "1px solid var(--border)" }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text-primary)" }}>Priority order</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 1, marginBottom: 10 }}>Which priorities to work first</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {draft.priorityOrder.map((p: Priority, i: number) => (
                <div key={p} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", background: "var(--bg-app)", borderRadius: 9 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", width: 16 }}>{i + 1}</span>
                  <span style={{ flex: 1, fontSize: 13.5, fontWeight: 600, color: "var(--text-primary)" }}>{p}</span>
                  <button onClick={() => movePriority(i, -1)} disabled={i === 0} aria-label="Move up" style={{ border: "none", background: "transparent", cursor: i === 0 ? "default" : "pointer", opacity: i === 0 ? 0.3 : 1, color: "var(--text-secondary)", padding: 2, display: "flex" }}>
                    <Icon name="ChevronRight" size={15} style={{ transform: "rotate(-90deg)" }} />
                  </button>
                  <button onClick={() => movePriority(i, 1)} disabled={i === draft.priorityOrder.length - 1} aria-label="Move down" style={{ border: "none", background: "transparent", cursor: i === draft.priorityOrder.length - 1 ? "default" : "pointer", opacity: i === draft.priorityOrder.length - 1 ? 0.3 : 1, color: "var(--text-secondary)", padding: 2, display: "flex" }}>
                    <Icon name="ChevronRight" size={15} style={{ transform: "rotate(90deg)" }} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: "14px 0 2px", borderTop: "1px solid var(--border)" }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text-primary)" }}>Prioritize projects</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 1, marginBottom: 10 }}>Pull from these first — none means all are equal</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {projects.map((p) => {
                const on = draft.prioritizedProjectIds.includes(p.id);
                return (
                  <button key={p.id} onClick={() => toggleProject(p.id)} style={{
                    display: "flex", alignItems: "center", gap: 7, padding: "6px 11px", borderRadius: "var(--radius-pill)",
                    border: `1px solid ${on ? "var(--color-primary)" : "var(--border)"}`,
                    background: on ? "var(--color-primary-light)" : "var(--surface)", cursor: "pointer",
                    fontFamily: "var(--font-sans)", fontSize: 12.5, fontWeight: 600,
                    color: on ? "var(--color-primary-hover)" : "var(--text-secondary)",
                  }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: p.color }} />
                    {p.name}
                    {on && <Icon name="Check" size={13} />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* footer */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, padding: "16px 24px", borderTop: "1px solid var(--border)", background: "var(--bg-app)" }}>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={save} disabled={!dirty} leadingIcon={<Icon name="Check" size={16} />}>Save changes</Button>
        </div>
      </div>
    </div>
  );
}

/* Side-panel trigger that opens the drawer. */
export function FocusSettingsButton({ onClick }: { onClick: () => void }) {
  const { settings } = useWorkspace();
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left",
      background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-sm)", padding: "16px 20px", cursor: "pointer", fontFamily: "var(--font-sans)",
      transform: hover ? "translateY(-1px)" : "none", transition: "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
    }}>
      <span style={{ width: 38, height: 38, borderRadius: 11, background: "var(--color-primary-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon name="Settings" size={19} color="var(--color-primary)" />
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: "block", fontSize: 14.5, fontWeight: 700, color: "var(--text-primary)" }}>Focus settings</span>
        <span style={{ display: "block", fontSize: 12.5, color: "var(--text-muted)", marginTop: 1 }}>
          Goal {settings.dailyGoal} · {settings.sessionMinutes}m sessions
        </span>
      </span>
      <Icon name="ChevronRight" size={18} color="var(--text-muted)" />
    </button>
  );
}
