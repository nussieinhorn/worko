/* Focus settings panel — daily goal, session length, priority order, and which
   projects to pull from first. Each change persists immediately via the store. */
import { Icon } from "../../components/Icon";
import { useWorkspace } from "../../store/workspace";
import type { Priority } from "../../data/data";

function Stepper({ value, min, max, suffix, onStep }: { value: number; min: number; max: number; suffix?: string; onStep: (delta: number) => void }) {
  const btn = (label: string, delta: number, disabled: boolean) => (
    <button onClick={() => onStep(delta)} disabled={disabled} aria-label={label} style={{
      width: 30, height: 30, borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface)",
      cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1, color: "var(--text-secondary)",
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>{label === "decrease" ? <Icon name="ChevronLeft" size={15} /> : <Icon name="ChevronRight" size={15} />}</button>
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
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderTop: "1px solid var(--border)" }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text-primary)" }}>{label}</div>
        {hint && <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 1 }}>{hint}</div>}
      </div>
      {children}
    </div>
  );
}

export function FocusSettings() {
  const { settings, updateSettings, projects } = useWorkspace();

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

  const movePriority = (i: number, dir: -1 | 1) => {
    updateSettings((s) => {
      const next = s.priorityOrder.slice();
      const j = i + dir;
      if (j < 0 || j >= next.length) return {};
      [next[i], next[j]] = [next[j], next[i]];
      return { priorityOrder: next };
    });
  };

  const toggleProject = (id: string) => {
    updateSettings((s) => {
      const set = new Set(s.prioritizedProjectIds);
      set.has(id) ? set.delete(id) : set.add(id);
      return { prioritizedProjectIds: [...set] };
    });
  };

  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-sm)", padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 6 }}>
        <Icon name="Settings" size={17} color="var(--color-primary)" />
        <span style={{ fontSize: 14.5, fontWeight: 700, color: "var(--text-primary)" }}>Focus settings</span>
      </div>

      <Row label="Daily focus goal" hint="Tasks you aim to finish today">
        <Stepper value={settings.dailyGoal} min={1} max={20} onStep={(d) => updateSettings((s) => ({ dailyGoal: clamp(s.dailyGoal + d, 1, 20) }))} />
      </Row>

      <Row label="Session length" hint="Minutes per focus sprint">
        <Stepper value={settings.sessionMinutes} min={5} max={90} suffix="min" onStep={(d) => updateSettings((s) => ({ sessionMinutes: clamp(s.sessionMinutes + d * 5, 5, 90) }))} />
      </Row>

      <div style={{ padding: "12px 0", borderTop: "1px solid var(--border)" }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text-primary)" }}>Priority order</div>
        <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 1, marginBottom: 10 }}>Which priorities to work first</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {settings.priorityOrder.map((p: Priority, i: number) => (
            <div key={p} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", background: "var(--bg-app)", borderRadius: 9 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", width: 16 }}>{i + 1}</span>
              <span style={{ flex: 1, fontSize: 13.5, fontWeight: 600, color: "var(--text-primary)" }}>{p}</span>
              <button onClick={() => movePriority(i, -1)} disabled={i === 0} aria-label="Move up" style={{ border: "none", background: "transparent", cursor: i === 0 ? "default" : "pointer", opacity: i === 0 ? 0.3 : 1, color: "var(--text-secondary)", padding: 2, display: "flex" }}>
                <Icon name="ChevronRight" size={15} style={{ transform: "rotate(-90deg)" }} />
              </button>
              <button onClick={() => movePriority(i, 1)} disabled={i === settings.priorityOrder.length - 1} aria-label="Move down" style={{ border: "none", background: "transparent", cursor: i === settings.priorityOrder.length - 1 ? "default" : "pointer", opacity: i === settings.priorityOrder.length - 1 ? 0.3 : 1, color: "var(--text-secondary)", padding: 2, display: "flex" }}>
                <Icon name="ChevronRight" size={15} style={{ transform: "rotate(90deg)" }} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "12px 0 2px", borderTop: "1px solid var(--border)" }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text-primary)" }}>Prioritize projects</div>
        <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 1, marginBottom: 10 }}>Pull from these first — none means all are equal</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {projects.map((p) => {
            const on = settings.prioritizedProjectIds.includes(p.id);
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
  );
}
