/* Screen 1 — Focus Home. The primary, focus-first experience. */
const { Button, Badge, ProgressBar, Card: WCard, Switch } = window.WORKODesignSystem_3ef60c;

function StatBlock({ value, label, accent }) {
  return (
    <div>
      <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.02em", color: accent || "var(--text-primary)", fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 5 }}>{label}</div>
    </div>
  );
}

function CoachPanel() {
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

function FocusSession({ onExit }) {
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
  const task = WORKO_DATA.focusTask;

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
        <Button variant="secondary" size="lg" leadingIcon={<Icon name="Plus" size={18} />}>Extend 10 min</Button>
        <Button variant="primary" size="lg" onClick={onExit} leadingIcon={<Icon name="Check" size={18} />}>Complete task</Button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 28, padding: "10px 16px", background: "rgba(255,255,255,0.7)", border: "1px solid var(--border)", borderRadius: "var(--radius-pill)", backdropFilter: "blur(8px)" }}>
        <Icon name="Music" size={17} color="var(--text-muted)" />
        <span style={{ fontSize: 13.5, fontWeight: 500, color: "var(--text-secondary)" }}>Ambient focus</span>
        <Switch checked={music} onChange={setMusic} />
      </div>
    </div>
  );
}

function FocusHome() {
  const [inSession, setInSession] = React.useState(false);
  const [upNextOpen, setUpNextOpen] = React.useState(true);
  const t = WORKO_DATA.focusTask;
  const d = WORKO_DATA.today;

  return (
    <div style={{ position: "relative", height: "100%", overflow: "auto" }}>
      {inSession && <FocusSession onExit={() => setInSession(false)} />}
      <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 24, maxWidth: 760, margin: "0 auto" }}>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Hero task */}
          <div style={{
            background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)",
            boxShadow: "var(--shadow-md)", padding: 32,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
              <Badge tone="primary">Up now</Badge>
              <Badge tone="warning" dot>{t.priority} priority</Badge>
            </div>
            <h2 style={{ margin: 0, fontSize: 34, fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.1, color: "var(--text-primary)" }}>{t.title}</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 16, color: "var(--text-secondary)", fontSize: 14.5 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 7 }}><Icon name="FolderKanban" size={17} color="var(--text-muted)" />{t.project}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 7 }}><Icon name="Clock" size={17} color="var(--text-muted)" />{t.estimate}</span>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
              <Button size="lg" leadingIcon={<Icon name="Play" size={19} />} onClick={() => setInSession(true)}>Start focus session</Button>
              <Button variant="secondary" size="lg" leadingIcon={<Icon name="Check" size={18} />}>Complete</Button>
              <Button variant="ghost" size="lg" leadingIcon={<Icon name="SkipForward" size={18} />}>Skip</Button>
            </div>
          </div>

          {/* Today progress */}
          <div style={{
            background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)",
            boxShadow: "var(--shadow-sm)", padding: 24,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>Today's progress</h3>
              <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{d.date}</span>
            </div>
            <ProgressBar value={d.progress} showLabel />
            <div style={{ display: "flex", gap: 40, marginTop: 22 }}>
              <StatBlock value={d.done} label="Tasks done" accent="var(--color-primary)" />
              <StatBlock value={d.remaining} label="Remaining" />
              <StatBlock value={`${d.streak}d`} label="Focus streak" accent="var(--color-accent)" />
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
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-muted)" }}>{WORKO_DATA.upNext.length}</span>
            </button>
            {upNextOpen && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {WORKO_DATA.upNext.map((u, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "14px 18px",
                  background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)",
                  boxShadow: "var(--shadow-sm)",
                }}>
                  <span style={{ width: 22, height: 22, borderRadius: "50%", border: "2px solid var(--border-strong)", flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: "var(--text-primary)" }}>{u.title}</span>
                  <span style={{ fontSize: 13, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6 }}><Icon name="Clock" size={15} />{u.estimate}</span>
                  <Badge tone={u.priority === "Medium" ? "neutral" : "neutral"}>{u.priority}</Badge>
                </div>
              ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

window.FocusHome = FocusHome;
window.FocusSession = FocusSession;
