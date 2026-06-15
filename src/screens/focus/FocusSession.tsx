/* Full-screen focus session. Covers the entire app (sidebar included) with a
   blurred backdrop. Timer length comes from focus settings. Completing the task
   fires confetti and hands back to the caller, which offers the next task. */
import React from "react";
import { Button, Badge, Switch } from "../../components/ds";
import { Icon } from "../../components/Icon";
import { fireConfetti } from "../../lib/confetti";
import type { Task } from "../project/model";

export function FocusSession({ task, projectName, minutes, onComplete, onExit }: {
  task: Task;
  projectName: string;
  minutes: number;
  onComplete: () => void;
  onExit: () => void;
}) {
  const [seconds, setSeconds] = React.useState(minutes * 60);
  const [running, setRunning] = React.useState(true);
  const [music, setMusic] = React.useState(true);
  React.useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [running]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const total = minutes * 60;
  const pct = total ? ((total - seconds) / total) * 100 : 0;

  const complete = () => { fireConfetti(); onComplete(); };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(241, 245, 249, 0.72)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 32,
      animation: "focusOverlayIn var(--dur-base) var(--ease-out)",
    }}>
      <div style={{
        position: "relative", width: "min(680px, 100%)",
        background: "radial-gradient(120% 90% at 50% -10%, #EEF2FF 0%, var(--surface) 55%)",
        border: "1px solid var(--border)", borderRadius: "var(--radius-modal)", boxShadow: "var(--shadow-xl)",
        padding: "48px 40px 40px", textAlign: "center",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        animation: "focusCardIn var(--dur-slow) var(--ease-out)",
      }}>
        <button onClick={onExit} aria-label="End session" style={{
          position: "absolute", top: 18, right: 18, border: "1px solid var(--border)", background: "var(--surface)",
          cursor: "pointer", borderRadius: "var(--radius-input)", padding: "8px 13px", fontFamily: "var(--font-sans)",
          fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", display: "flex", gap: 6, alignItems: "center",
        }}><Icon name="X" size={15} />End session</button>

        <Badge tone="primary" dot>Deep focus · distractions hidden</Badge>
        <div style={{ marginTop: 14, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)" }}>{projectName}</div>
        <div style={{ fontSize: 21, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.01em", maxWidth: 460, lineHeight: 1.3 }}>{task.title}</div>

        <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: "-0.04em", color: "var(--text-primary)", fontVariantNumeric: "tabular-nums", lineHeight: 1.1, marginTop: 4 }}>{mm}:{ss}</div>

        <div style={{ width: "min(360px, 80%)", height: 6, background: "var(--surface-secondary)", borderRadius: 999, overflow: "hidden", marginBottom: 8 }}>
          <div style={{ width: `${pct}%`, height: "100%", background: "var(--color-primary)", borderRadius: 999, transition: "width 1s linear" }} />
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <Button variant={running ? "secondary" : "primary"} size="lg" onClick={() => setRunning((r) => !r)}
            leadingIcon={<Icon name={running ? "Pause" : "Play"} size={18} />}>
            {running ? "Pause" : "Resume"}
          </Button>
          <Button variant="secondary" size="lg" onClick={() => setSeconds((s) => s + 10 * 60)} leadingIcon={<Icon name="Plus" size={18} />}>Extend 10 min</Button>
          <Button variant="primary" size="lg" onClick={complete} leadingIcon={<Icon name="Check" size={18} />}>Complete task</Button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 24, padding: "10px 16px", background: "rgba(255,255,255,0.7)", border: "1px solid var(--border)", borderRadius: "var(--radius-pill)" }}>
          <Icon name="Music" size={17} color="var(--text-muted)" />
          <span style={{ fontSize: 13.5, fontWeight: 500, color: "var(--text-secondary)" }}>Ambient focus</span>
          <Switch checked={music} onChange={setMusic} />
        </div>
      </div>
    </div>
  );
}
