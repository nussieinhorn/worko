/* Project Detail — Overview dashboard. */
import type React from "react";
import { Avatar, Badge } from "../../components/ds";
import { Icon, type IconName } from "../../components/Icon";
import { WORKO_DATA, type Project } from "../../data/data";
import { ASSIGNEES, ASSIGNEE_COLOR, COLUMN_DOT, MON, PRIORITY_TONE, STATUS_ORDER, TL_BASE, type Task } from "./model";

function StatTile({ icon, tint, value, label, sub }: { icon: IconName; tint: string; value: React.ReactNode; label: string; sub?: string }) {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-sm)", padding: 18 }}>
      <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 10, background: tint + "1f", marginBottom: 12 }}>
        <Icon name={icon} size={19} color={tint} />
      </span>
      <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text-primary)", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", marginTop: 5 }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function Panel({ title, action, children }: { title: string; action?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-sm)", padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <span style={{ fontSize: 14.5, fontWeight: 700, color: "var(--text-primary)" }}>{title}</span>
        {action && <span style={{ marginLeft: "auto", fontSize: 12.5, fontWeight: 600, color: "var(--color-primary)", cursor: "pointer" }}>{action}</span>}
      </div>
      {children}
    </div>
  );
}

export function OverviewView({ p, tasks, onOpenTask }: { p: Project; tasks: Task[]; onOpenTask: (t: Task) => void }) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "Done").length;
  const inProg = tasks.filter((t) => t.status === "In progress").length;
  const weekEnd = new Date(TL_BASE); weekEnd.setDate(weekEnd.getDate() + 6);
  const dueWeek = tasks.filter((t) => t.status !== "Done" && t.due.getTime() <= weekEnd.getTime()).length;
  const statusCounts = STATUS_ORDER.map((s) => ({ s, n: tasks.filter((t) => t.status === s).length }));
  const workload = ASSIGNEES.map((a) => ({ a, n: tasks.filter((t) => t.assignee === a).length })).filter((w) => w.n > 0).sort((x, y) => y.n - x.n);
  const maxLoad = Math.max(1, ...workload.map((w) => w.n));
  const upcoming = tasks.filter((t) => t.status !== "Done").sort((a, b) => a.due.getTime() - b.due.getTime()).slice(0, 5);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 14 }}>
        <div style={{ background: "linear-gradient(135deg, var(--color-primary), #6366F1)", borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-sm)", padding: 18, color: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, opacity: 0.9 }}><Icon name="Target" size={16} color="#fff" />Project progress</div>
          <div>
            <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>{p.progress}%</div>
            <div style={{ height: 7, borderRadius: 999, background: "rgba(255,255,255,0.28)", marginTop: 12, overflow: "hidden" }}><div style={{ width: `${p.progress}%`, height: "100%", background: "#fff", borderRadius: 999 }} /></div>
            <div style={{ fontSize: 12.5, opacity: 0.92, marginTop: 9 }}>{done} of {total} tasks complete</div>
          </div>
        </div>
        <StatTile icon="ListTodo" tint="#4F46E5" value={total} label="Total tasks" sub={`${total - done} still open`} />
        <StatTile icon="Loader" tint="#06B6D4" value={inProg} label="In progress" sub="Active right now" />
        <StatTile icon="CalendarClock" tint="#F59E0B" value={dueWeek} label="Due this week" sub="Through Jun 14" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <Panel title="Tasks by status" action="View board">
          <div style={{ display: "flex", height: 12, borderRadius: 999, overflow: "hidden", marginBottom: 16 }}>
            {statusCounts.filter((x) => x.n).map((x) => <div key={x.s} style={{ flex: x.n, background: COLUMN_DOT[x.s] }} title={`${x.s}: ${x.n}`} />)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 18px" }}>
            {statusCounts.map((x) => (
              <div key={x.s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: COLUMN_DOT[x.s] }} />
                <span style={{ fontSize: 13, color: "var(--text-secondary)", flex: 1 }}>{x.s}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{x.n}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Workload by assignee">
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            {workload.map((w) => (
              <div key={w.a} style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <Avatar name={w.a} size="xs" />
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", width: 96, flexShrink: 0 }}>{w.a}</span>
                <div style={{ flex: 1, height: 8, borderRadius: 999, background: "var(--bg-app)", overflow: "hidden" }}><div style={{ width: `${(w.n / maxLoad) * 100}%`, height: "100%", borderRadius: 999, background: ASSIGNEE_COLOR[w.a] }} /></div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", width: 16, textAlign: "right" }}>{w.n}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <Panel title="Upcoming deadlines">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {upcoming.map((t, i) => (
              <div key={t.id} onClick={() => onOpenTask(t)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", cursor: "pointer", borderTop: i ? "1px solid var(--border)" : "none" }}>
                <span style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 10, background: "var(--bg-app)", flexShrink: 0 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)", lineHeight: 1 }}>{MON[t.due.getMonth()]}</span>
                  <span style={{ fontSize: 17, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1 }}>{t.due.getDate()}</span>
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.title}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3, fontSize: 12, color: "var(--text-muted)" }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: COLUMN_DOT[t.status] }} />{t.status}</div>
                </span>
                <Badge tone={PRIORITY_TONE[t.priority]}>{t.priority}</Badge>
                <Avatar name={t.assignee} size="xs" />
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Recent activity">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {WORKO_DATA.taskDetail.activity.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 11, padding: "11px 0", borderTop: i ? "1px solid var(--border)" : "none" }}>
                <Avatar name={a.who} size="xs" />
                <div style={{ fontSize: 13, lineHeight: 1.45, color: "var(--text-secondary)" }}>
                  <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>{a.who}</strong> {a.what}
                  <div style={{ fontSize: 11.5, color: "var(--text-muted)", marginTop: 1 }}>{a.when}</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
