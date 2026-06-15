/* Side-panel productivity view: today's progress toward the daily goal plus a
   readout of the day's focus rhythm (sprints, breaks, start + last-break times). */
import type React from "react";
import { Icon, type IconName } from "../../components/Icon";
import { WORKO_DATA } from "../../data/data";
import { formatClock, formatLongDate } from "../../lib/format";
import { TODAY, sameDay } from "../project/model";
import { useWorkspace } from "../../store/workspace";

function Ring({ pct, done, goal }: { pct: number; done: number; goal: number }) {
  return (
    <div style={{
      position: "relative", width: 92, height: 92, borderRadius: "50%", flexShrink: 0,
      background: `conic-gradient(var(--color-primary) ${pct}%, var(--surface-secondary) ${pct}% 100%)`,
    }}>
      <div style={{
        position: "absolute", inset: 7, borderRadius: "50%", background: "var(--surface)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontSize: 22, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{done}</span>
        <span style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>of {goal}</span>
      </div>
    </div>
  );
}

function Stat({ value, label, accent }: { value: React.ReactNode; label: string; accent?: string }) {
  return (
    <div>
      <div style={{ fontSize: 20, fontWeight: 700, color: accent || "var(--text-primary)", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{value}</div>
      <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 3 }}>{label}</div>
    </div>
  );
}

function MetricRow({ icon, label, value }: { icon: IconName; label: string; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderTop: "1px solid var(--border)" }}>
      <Icon name={icon} size={16} color="var(--text-muted)" />
      <span style={{ flex: 1, fontSize: 13, color: "var(--text-secondary)" }}>{label}</span>
      <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--text-primary)", fontVariantNumeric: "tabular-nums" }}>{value}</span>
    </div>
  );
}

export function ProgressPanel() {
  const { settings, todaySessions, tasks } = useWorkspace();

  const completedToday = tasks.filter((t) => t.completedAt && sameDay(t.completedAt, new Date())).length;
  const goal = settings.dailyGoal;
  const pct = Math.min(100, Math.round((completedToday / goal) * 100));
  const toGoal = Math.max(0, goal - completedToday);

  const sprints = todaySessions.filter((s) => s.kind === "sprint");
  const breaks = todaySessions.filter((s) => s.kind === "break");
  const startedAt = todaySessions.length
    ? todaySessions.reduce((min, s) => (s.startedAt < min ? s.startedAt : min), todaySessions[0].startedAt)
    : null;
  const lastBreak = breaks.length ? breaks[breaks.length - 1].startedAt : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Today's progress */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-sm)", padding: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h3 style={{ margin: 0, fontSize: 15.5, fontWeight: 700, color: "var(--text-primary)" }}>Today's progress</h3>
          <span style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{formatLongDate(TODAY)}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Ring pct={pct} done={completedToday} goal={goal} />
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Stat value={completedToday} label="Done today" accent="var(--color-primary)" />
            <Stat value={toGoal} label="To goal" />
            <Stat value={`${WORKO_DATA.streak}d`} label="Focus streak" accent="var(--color-accent)" />
          </div>
        </div>
      </div>

      {/* Productivity rhythm */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-sm)", padding: "18px 22px 8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 4 }}>
          <Icon name="BarChart3" size={17} color="var(--color-primary)" />
          <h3 style={{ margin: 0, fontSize: 15.5, fontWeight: 700, color: "var(--text-primary)" }}>Productivity</h3>
        </div>
        <MetricRow icon="Target" label="Focus sprints" value={String(sprints.length)} />
        <MetricRow icon="Music" label="Breaks taken" value={String(breaks.length)} />
        <MetricRow icon="Play" label="Started working" value={startedAt ? formatClock(startedAt) : "—"} />
        <MetricRow icon="Clock" label="Last break" value={lastBreak ? formatClock(lastBreak) : "—"} />
      </div>
    </div>
  );
}
