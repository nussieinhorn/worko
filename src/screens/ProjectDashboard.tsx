/* Project Dashboard — grid of live project cards; inline create. */
import React from "react";
import { Button, ProgressBar, AvatarGroup, IconButton } from "../components/ds";
import { Icon } from "../components/Icon";
import { relTime } from "../lib/format";
import { useWorkspace, type Project } from "../store/workspace";

function ProjectCard({ p, progress, open, onOpen }: { p: Project; progress: number; open: number; onOpen: () => void }) {
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
          <div style={{ fontSize: 12.5, color: "var(--text-muted)", marginTop: 2 }}>Updated {relTime(p.updatedAt)}</div>
        </div>
        <IconButton label="Project options" variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}><Icon name="MoreHorizontal" size={18} /></IconButton>
      </div>

      <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: "var(--text-secondary)", minHeight: 40 }}>{p.desc || "No description yet."}</p>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7, fontSize: 12.5, color: "var(--text-muted)" }}>
          <span>{progress}% complete</span><span>{open} open task{open === 1 ? "" : "s"}</span>
        </div>
        <ProgressBar value={progress} height={6} />
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

function CreateProjectCard({ creating, setCreating, onCreate }: { creating: boolean; setCreating: (v: boolean) => void; onCreate: (name: string) => void }) {
  const [hover, setHover] = React.useState(false);
  const [name, setName] = React.useState("");
  const submit = () => { if (name.trim()) { onCreate(name.trim()); setName(""); setCreating(false); } };

  if (creating) {
    return (
      <div style={{
        background: "var(--color-primary-light)", border: "2px dashed var(--color-primary)",
        borderRadius: "var(--radius-card)", padding: 22, minHeight: 210,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12,
      }}>
        <span style={{ width: 44, height: 44, borderRadius: 12, background: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="FolderKanban" size={20} color="#fff" />
        </span>
        <input
          autoFocus value={name} placeholder="Project name, then Enter"
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") submit(); if (e.key === "Escape") { setName(""); setCreating(false); } }}
          onBlur={() => { if (!name.trim()) setCreating(false); }}
          style={{
            width: "100%", maxWidth: 240, height: 40, padding: "0 13px", textAlign: "center",
            background: "var(--surface)", border: "1px solid var(--color-primary)", borderRadius: "var(--radius-input)",
            fontFamily: "var(--font-sans)", fontSize: 14.5, fontWeight: 600, color: "var(--text-primary)", outline: "none",
          }} />
        <span style={{ fontSize: 12.5, color: "var(--color-primary-hover)", fontWeight: 500 }}>Press Enter to create — no setup needed</span>
      </div>
    );
  }

  return (
    <button onClick={() => setCreating(true)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
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

export function ProjectDashboard({ onOpenProject }: { onOpenProject: (p: Project) => void }) {
  const { projects, tasks, createProject } = useWorkspace();
  const [creating, setCreating] = React.useState(false);

  const statsFor = (projectId: string) => {
    const pt = tasks.filter((t) => t.projectId === projectId);
    const done = pt.filter((t) => t.status === "Done").length;
    return {
      progress: pt.length ? Math.round((done / pt.length) * 100) : 0,
      open: pt.length - done,
    };
  };

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
          <Button leadingIcon={<Icon name="Plus" size={18} />} onClick={() => setCreating(true)}>Create project</Button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
        {projects.map((p) => {
          const s = statsFor(p.id);
          return <ProjectCard key={p.id} p={p} progress={s.progress} open={s.open} onOpen={() => onOpenProject(p)} />;
        })}
        <CreateProjectCard creating={creating} setCreating={setCreating} onCreate={createProject} />
      </div>
    </div>
  );
}
