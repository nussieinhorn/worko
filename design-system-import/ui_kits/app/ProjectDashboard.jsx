/* Screen 2 — Project Dashboard. Grid of project cards; inline create. */
const { Button: WBtn, Badge: PBadge, ProgressBar: PProgress, AvatarGroup, IconButton: PIconBtn } = window.WORKODesignSystem_3ef60c;

function ProjectCard({ p, onOpen }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={onOpen}
      style={{
        background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)",
        boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-sm)", padding: 22, cursor: "pointer",
        transform: hover ? "translateY(-2px)" : "none",
        transition: "box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)",
        display: "flex", flexDirection: "column", gap: 14,
      }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <span style={{ width: 38, height: 38, borderRadius: 11, background: p.color, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="FolderKanban" size={19} color="#fff" />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>{p.name}</div>
          <div style={{ fontSize: 12.5, color: "var(--text-muted)", marginTop: 2 }}>Updated {p.activity}</div>
        </div>
        <PIconBtn label="Project options" variant="ghost" size="sm"><Icon name="MoreHorizontal" size={18} /></PIconBtn>
      </div>

      <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: "var(--text-secondary)", minHeight: 40 }}>{p.desc}</p>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7, fontSize: 12.5, color: "var(--text-muted)" }}>
          <span>{p.progress}% complete</span><span>{p.open} open tasks</span>
        </div>
        <PProgress value={p.progress} height={6} />
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 4 }}>
        <AvatarGroup users={p.members.map((name) => ({ name }))} max={4} size="sm" />
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-primary)", display: "flex", alignItems: "center", gap: 4 }}>
          Open<Icon name="ChevronRight" size={15} />
        </span>
      </div>
    </div>
  );
}

function CreateProjectCard() {
  const [hover, setHover] = React.useState(false);
  return (
    <button onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      background: hover ? "var(--color-primary-light)" : "transparent",
      border: `2px dashed ${hover ? "var(--color-primary)" : "var(--border-strong)"}`,
      borderRadius: "var(--radius-card)", padding: 22, cursor: "pointer", minHeight: 210,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10,
      color: hover ? "var(--color-primary-hover)" : "var(--text-muted)", fontFamily: "var(--font-sans)",
      transition: "all var(--dur-base) var(--ease-out)",
    }}>
      <span style={{ width: 44, height: 44, borderRadius: 12, background: hover ? "var(--color-primary)" : "var(--surface-secondary)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background var(--dur-base) var(--ease-out)" }}>
        <Icon name="Plus" size={22} color={hover ? "#fff" : "var(--text-muted)"} />
      </span>
      <span style={{ fontSize: 15, fontWeight: 600 }}>Create project</span>
      <span style={{ fontSize: 12.5, color: "var(--text-muted)" }}>Click to name it — no setup needed</span>
    </button>
  );
}

function ProjectDashboard({ onOpenProject }) {
  return (
    <div style={{ padding: 32, maxWidth: 1240, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
        <div style={{ display: "flex", gap: 6, padding: 4, background: "var(--surface-secondary)", borderRadius: "var(--radius-input)" }}>
          {["All", "Active", "Mine"].map((f, i) => (
            <span key={f} style={{
              padding: "6px 14px", borderRadius: 9, fontSize: 13.5, fontWeight: 600, cursor: "pointer",
              background: i === 0 ? "var(--surface)" : "transparent", color: i === 0 ? "var(--text-primary)" : "var(--text-muted)",
              boxShadow: i === 0 ? "var(--shadow-xs)" : "none",
            }}>{f}</span>
          ))}
        </div>
        <div style={{ marginLeft: "auto" }}>
          <WBtn leadingIcon={<Icon name="Plus" size={18} />}>Create project</WBtn>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
        {WORKO_DATA.projects.map((p) => <ProjectCard key={p.name} p={p} onOpen={() => onOpenProject(p)} />)}
        <CreateProjectCard />
      </div>
    </div>
  );
}

window.ProjectDashboard = ProjectDashboard;
