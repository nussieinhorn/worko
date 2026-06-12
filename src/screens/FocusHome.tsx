/* Focus Home — the primary, focus-first experience. Hero + queue come from
   the workspace store; completing anywhere persists to the database. */
import React from "react";
import { Button, Badge, ProgressBar, Switch } from "../components/ds";
import { Icon } from "../components/Icon";
import { WORKO_DATA } from "../data/data";
import { formatLongDate } from "../lib/format";
import { PRIORITY_ORDER, TODAY, type Task } from "./project/model";
import { useWorkspace } from "../store/workspace";

function StatBlock({ value, label, accent }: { value: React.ReactNode; label: string; accent?: string }) {
  return (
    <div>
      <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.02em", color: accent || "var(--text-primary)", fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 5 }}>{label}</div>
    </div>
  );
}

export function CoachPanel() {
  const c = WORKO_DATA.coach;
  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: 18, height: "100%",
      background: "var(--surface)", border: "1px solid var(--border)",
      borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-sm)", padding: 24,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
        <span style={{
          width: 40, height: 40, borderRadius: 12, flexShrink: 0,
          background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon name="Sparkles" size={20} color="#fff" />
        </span>
        <div>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: "var(--text-primary)" }}>Focus companion</div>
          <div style={{ fontSize: 12.5, color: "var(--color-success)", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--color-success)" }} />Here with you
          </div>
        </div>
      </div>

      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--text-secondary)" }}>{c.message}</p>

      <div style={{ background: "var(--color-primary-light)", borderRadius: "var(--radius-input)", padding: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--color-primary)", marginBottom: 6 }}>Suggested next step</div>
        <div style={{ fontSize: 14, lineHeight: 1.5, color: "var(--text-primary)" }}>{c.nextStep}</div>
      </div>

      <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {["Break into subtasks", "Estimate effort", "Summarize"].map((s) => (
            <button key={s} style={{
              border: "1px solid var(--border)", background: "var(--surface)", cursor: "pointer",
              borderRadius: "var(--radius-pill)", padding: "6px 12px", fontFamily: "var(--font-sans)",
              fontSize: 12.5, fontWeight: 500, color: "var(--text-secondary)",
            }}>{s}</button>
          ))}
        </div>
        <label style={{
          display: "flex", alignItems: "center", gap: 8, padding: "0 6px 0 14px", height: 44,
          background: "var(--bg-app)", border: "1px solid var(--border)", borderRadius: "var(--radius-input)",
        }}>
          <input placeholder="Ask WORKO anything…" style={{
            border: "none", outline: "none", background: "transparent", flex: 1,
            fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--text-primary)", minWidth: 0,
          }} />
          <span style={{
            width: 34, height: 34, borderRadius: 9, background: "var(--color-primary)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon name="ArrowUp" size={18} color="#fff" />
          </span>
        </label>
      </div>
    </div>
  );
}

function FocusSession({ task, onComplete, onExit }: { task: Task; onComplete: () => void; onExit: () => void }) {
  const [seconds, setSeconds] = React.useState(25 * 60);
  const [running, setRunning] = React.useState(true);
  const [music, setMusic] = React.useState(true);
  React.useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [running]);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 20,
      background: "radial-gradient(120% 90% at 50% -10%, #EEF2FF 0%, #F8FAFC 45%, #F1F5F9 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, padding: 40,
    }}>
      <button onClick={onExit} style={{
        position: "absolute", top: 24, right: 28, border: "1px solid var(--border)", background: "var(--surface)",
        cursor: "pointer", borderRadius: "var(--radius-input)", padding: "9px 14px", fontFamily: "var(--font-sans)",
        fontSize: 13.5, fontWeight: 600, color: "var(--text-secondary)", display: "flex", gap: 7, alignItems: "center",
      }}><Icon name="X" size={16} />End session</button>

      <Badge tone="primary" dot>Deep focus · distractions hidden</Badge>
      <div style={{ fontSize: 19, fontWeight: 600, color: "var(--text-secondary)", marginTop: 18 }}>{task.title}</div>
      <div style={{ fontSize: 116, fontWeight: 600, letterSpacing: "-0.04em", color: "var(--text-primary)", fontVariantNumeric: "tabular-nums", lineHeight: 1.05 }}>{mm}:{ss}</div>

      <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
        <Button variant={running ? "secondary" : "primary"} size="lg" onClick={() => setRunning((r) => !r)}
          leadingIcon={<Icon name={running ? "Pause" : "Play"} size={18} />}>
          {running ? "Pause" : "Resume"}
        </Button>
        <Button variant="secondary" size="lg" onClick={() => setSeconds((s) => s + 10 * 60)} leadingIcon={<Icon name="Plus" size={18} />}>Extend 10 min</Button>
        <Button variant="primary" size="lg" onClick={onComplete} leadingIcon={<Icon name="Check" size={18} />}>Complete task</Button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 28, padding: "10px 16px", background: "rgba(255,255,255,0.7)", border: "1px solid var(--border)", borderRadius: "var(--radius-pill)", backdropFilter: "blur(8px)" }}>
        <Icon name="Music" size={17} color="var(--text-muted)" />
        <span style={{ fontSize: 13.5, fontWeight: 500, color: "var(--text-secondary)" }}>Ambient focus</span>
        <Switch checked={music} onChange={setMusic} />
      </div>
    </div>
  );
}

export function FocusHome() {
  const { tasks, projects, updateTask } = useWorkspace();
  const [inSession, setInSession] = React.useState(false);
  const [upNextOpen, setUpNextOpen] = React.useState(true);
  const [skipped, setSkipped] = React.useState<string[]>([]);

  const open = tasks
    .filter((t) => t.status !== "Done")
    .sort((a, b) =>
      PRIORITY_ORDER.indexOf(a.priority) - PRIORITY_ORDER.indexOf(b.priority) ||
      a.due.getTime() - b.due.getTime());
  // skipped tasks go to the back of the queue for the day
  const queue = [...open.filter((t) => !skipped.includes(t.id)), ...open.filter((t) => skipped.includes(t.id))];
  const hero = queue[0];
  const upNext = queue.slice(1, 4);

  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "Done").length;
  const progress = total ? Math.round((done / total) * 100) : 0;

  const complete = (id: string) => updateTask(id, { status: "Done" });

  return (
    <div style={{ position: "relative", height: "100%", overflow: "auto" }}>
      {inSession && hero && (
        <FocusSession
          task={hero}
          onComplete={() => { complete(hero.id); setInSession(false); }}
          onExit={() => setInSession(false)}
        />
      )}
      <div style={{ padding: 32, display: "grid", gridTemplateColumns: "minmax(0, 1fr) 340px", alignItems: "start", gap: 24, maxWidth: 1140, margin: "0 auto" }}>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Hero task */}
          {hero ? (
            <div style={{
              background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)",
              boxShadow: "var(--shadow-md)", padding: 32,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                <Badge tone="primary">Up now</Badge>
                <Badge tone={hero.priority === "High" ? "warning" : "neutral"} dot>{hero.priority} priority</Badge>
              </div>
              <h2 style={{ margin: 0, fontSize: 34, fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.1, color: "var(--text-primary)" }}>{hero.title}</h2>
              <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 16, color: "var(--text-secondary)", fontSize: 14.5 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 7 }}><Icon name="FolderKanban" size={17} color="var(--text-muted)" />{projects.find((p) => p.id === hero.projectId)?.name ?? "—"}</span>
                {hero.estimate && <span style={{ display: "flex", alignItems: "center", gap: 7 }}><Icon name="Clock" size={17} color="var(--text-muted)" />{hero.estimate}</span>}
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
                <Button size="lg" leadingIcon={<Icon name="Play" size={19} />} onClick={() => setInSession(true)}>Start focus session</Button>
                <Button variant="secondary" size="lg" leadingIcon={<Icon name="Check" size={18} />} onClick={() => complete(hero.id)}>Complete</Button>
                <Button variant="ghost" size="lg" leadingIcon={<Icon name="SkipForward" size={18} />} onClick={() => setSkipped((s) => [...s, hero.id])}>Skip</Button>
              </div>
            </div>
          ) : (
            <div style={{
              background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)",
              boxShadow: "var(--shadow-md)", padding: 48, textAlign: "center",
            }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: "var(--green-50)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <Icon name="CheckCheck" size={26} color="var(--color-success)" />
              </div>
              <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>Nothing left for today.</h2>
              <p style={{ margin: "8px 0 0", fontSize: 15, color: "var(--text-secondary)" }}>Enjoy the momentum.</p>
            </div>
          )}

          {/* Today progress */}
          <div style={{
            background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)",
            boxShadow: "var(--shadow-sm)", padding: 24,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>Today's progress</h3>
              <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{formatLongDate(TODAY)}</span>
            </div>
            <ProgressBar value={progress} showLabel />
            <div style={{ display: "flex", gap: 40, marginTop: 22 }}>
              <StatBlock value={done} label="Tasks done" accent="var(--color-primary)" />
              <StatBlock value={total - done} label="Remaining" />
              <StatBlock value={`${WORKO_DATA.streak}d`} label="Focus streak" accent="var(--color-accent)" />
            </div>
          </div>

          {/* Up next */}
          <div>
            <button onClick={() => setUpNextOpen((o) => !o)} style={{
              display: "flex", alignItems: "center", gap: 8, margin: "0 0 12px", padding: 0, border: "none",
              background: "transparent", cursor: "pointer", fontFamily: "var(--font-sans)",
            }}>
              <Icon name="ChevronRight" size={18} color="var(--text-muted)" style={{ transform: upNextOpen ? "rotate(90deg)" : "none", transition: "transform var(--dur-fast) var(--ease-out)" }} />
              <span style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>Up next</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-muted)" }}>{upNext.length}</span>
            </button>
            {upNextOpen && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {upNext.map((u) => (
                  <div key={u.id} style={{
                    display: "flex", alignItems: "center", gap: 14, padding: "14px 18px",
                    background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)",
                    boxShadow: "var(--shadow-sm)",
                  }}>
                    <button onClick={() => complete(u.id)} aria-label={`Complete ${u.title}`} style={{
                      width: 22, height: 22, borderRadius: "50%", border: "2px solid var(--border-strong)",
                      flexShrink: 0, background: "transparent", cursor: "pointer", padding: 0,
                    }} />
                    <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: "var(--text-primary)" }}>{u.title}</span>
                    {u.estimate && <span style={{ fontSize: 13, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6 }}><Icon name="Clock" size={15} />{u.estimate}</span>}
                    <Badge tone="neutral">{u.priority}</Badge>
                  </div>
                ))}
                {upNext.length === 0 && (
                  <div style={{ padding: "18px 20px", fontSize: 13.5, color: "var(--text-muted)", background: "var(--surface)", border: "1px dashed var(--border-strong)", borderRadius: "var(--radius-card)" }}>
                    The queue is clear.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <CoachPanel />
      </div>
    </div>
  );
}
