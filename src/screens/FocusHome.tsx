/* Focus Home — the focus-first cockpit.
   Main column: the one task to do now + a short queue + break control.
   Side column: today's progress, productivity rhythm, and focus settings.
   Orchestrates the focus session, coffee break, and "what's next?" flow. */
import React from "react";
import { Button, Badge } from "../components/ds";
import { Icon } from "../components/Icon";
import { fireConfetti } from "../lib/confetti";
import { PRIORITY_TONE, type Task } from "./project/model";
import { useWorkspace } from "../store/workspace";
import { buildQueue } from "./focus/queue";
import { FocusSession } from "./focus/FocusSession";
import { BreakModal } from "./focus/BreakModal";
import { NextPrompt } from "./focus/NextPrompt";
import { FocusSettings } from "./focus/FocusSettings";
import { ProgressPanel } from "./focus/ProgressPanel";

export function FocusHome() {
  const ws = useWorkspace();
  const { tasks, projects, settings, updateTask, startSprint, startBreak, endSession } = ws;

  const [skipped, setSkipped] = React.useState<string[]>([]);
  const [upNextOpen, setUpNextOpen] = React.useState(true);
  // active focus session: which task + the sprint session id
  const [session, setSession] = React.useState<{ task: Task; sprintId: string } | null>(null);
  // active break: the break session id + when it started
  const [brk, setBrk] = React.useState<{ id: string; startedAt: Date } | null>(null);
  // "ready for next?" prompt after a sprint or break
  const [prompt, setPrompt] = React.useState<{ title: string } | null>(null);

  const queue = buildQueue(tasks, settings, skipped);
  const hero = queue[0] ?? null;
  const upNext = queue.slice(1, 4);
  const projectName = (id: string) => projects.find((p) => p.id === id)?.name ?? "—";

  const startFocus = (task: Task) => {
    const sprintId = startSprint(task.id);
    setSession({ task, sprintId });
  };

  const completeFromSession = () => {
    if (!session) return;
    endSession(session.sprintId, true);
    updateTask(session.task.id, { status: "Done" });
    setSession(null);
    setPrompt({ title: "Nice work." });
  };

  const exitSession = () => {
    if (!session) return;
    endSession(session.sprintId, false);
    setSession(null);
  };

  const takeBreak = () => {
    const id = startBreak();
    setBrk({ id, startedAt: new Date() });
  };

  const endBreak = () => {
    if (!brk) return;
    endSession(brk.id, false);
    setBrk(null);
    setPrompt({ title: "Welcome back." });
  };

  // Complete directly from the card / queue (no timed session).
  const quickComplete = (task: Task) => {
    updateTask(task.id, { status: "Done" });
    fireConfetti();
  };

  // The next task to offer in the prompt is whatever's now at the front of the queue.
  const promptNext = prompt ? (buildQueue(tasks, settings, skipped)[0] ?? null) : null;

  return (
    <div style={{ position: "relative", height: "100%", overflow: "auto" }}>
      {session && (
        <FocusSession
          task={session.task}
          projectName={projectName(session.task.projectId)}
          minutes={settings.sessionMinutes}
          onComplete={completeFromSession}
          onExit={exitSession}
        />
      )}
      {brk && <BreakModal startedAt={brk.startedAt} onBackToWork={endBreak} />}
      {prompt && (
        <NextPrompt
          title={prompt.title}
          next={promptNext}
          projectName={promptNext ? projectName(promptNext.projectId) : undefined}
          onStart={() => { if (promptNext) { setPrompt(null); startFocus(promptNext); } }}
          onDismiss={() => setPrompt(null)}
        />
      )}

      <div style={{ padding: 32, display: "grid", gridTemplateColumns: "minmax(0, 1fr) 360px", alignItems: "start", gap: 24, maxWidth: 1180, margin: "0 auto" }}>
        {/* Main column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {hero ? (
            <div style={{
              background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)",
              boxShadow: "var(--shadow-md)", padding: 32,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                <Badge tone="primary">Up now</Badge>
                <Badge tone={PRIORITY_TONE[hero.priority]} dot>{hero.priority} priority</Badge>
              </div>
              <h2 style={{ margin: 0, fontSize: 34, fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.1, color: "var(--text-primary)" }}>{hero.title}</h2>
              <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 16, color: "var(--text-secondary)", fontSize: 14.5 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 7 }}><Icon name="FolderKanban" size={17} color="var(--text-muted)" />{projectName(hero.projectId)}</span>
                {hero.estimate && <span style={{ display: "flex", alignItems: "center", gap: 7 }}><Icon name="Clock" size={17} color="var(--text-muted)" />{hero.estimate}</span>}
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
                <Button size="lg" leadingIcon={<Icon name="Play" size={19} />} onClick={() => startFocus(hero)}>Start focus session</Button>
                <Button variant="secondary" size="lg" leadingIcon={<Icon name="Check" size={18} />} onClick={() => quickComplete(hero)}>Complete</Button>
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

          {/* Up next + break control */}
          <div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
              <button onClick={() => setUpNextOpen((o) => !o)} style={{
                display: "flex", alignItems: "center", gap: 8, padding: 0, border: "none",
                background: "transparent", cursor: "pointer", fontFamily: "var(--font-sans)",
              }}>
                <Icon name="ChevronRight" size={18} color="var(--text-muted)" style={{ transform: upNextOpen ? "rotate(90deg)" : "none", transition: "transform var(--dur-fast) var(--ease-out)" }} />
                <span style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>Up next</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-muted)" }}>{upNext.length}</span>
              </button>
              <div style={{ marginLeft: "auto" }}>
                <Button variant="secondary" leadingIcon={<Icon name="Music" size={17} />} onClick={takeBreak}>Take a break</Button>
              </div>
            </div>
            {upNextOpen && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {upNext.map((u) => (
                  <div key={u.id} style={{
                    display: "flex", alignItems: "center", gap: 14, padding: "14px 18px",
                    background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)",
                    boxShadow: "var(--shadow-sm)",
                  }}>
                    <button onClick={() => quickComplete(u)} aria-label={`Complete ${u.title}`} title="Complete" style={{
                      width: 22, height: 22, borderRadius: "50%", border: "2px solid var(--border-strong)",
                      flexShrink: 0, background: "transparent", cursor: "pointer", padding: 0,
                    }} />
                    <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: "var(--text-primary)" }}>{u.title}</span>
                    <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{projectName(u.projectId)}</span>
                    <Badge tone={PRIORITY_TONE[u.priority]}>{u.priority}</Badge>
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

        {/* Side column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <ProgressPanel />
          <FocusSettings />
        </div>
      </div>
    </div>
  );
}
