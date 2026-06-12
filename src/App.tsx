import React from "react";
import { Sidebar, TopBar, type NavId } from "./app/AppShell";
import { Icon } from "./components/Icon";
import { formatLongDate } from "./lib/format";
import { TODAY } from "./screens/project/model";
import { useWorkspace, type Project } from "./store/workspace";
import { FocusHome } from "./screens/FocusHome";
import { ProjectDashboard } from "./screens/ProjectDashboard";
import { ProjectDetail } from "./screens/project/ProjectDetail";

type Screen = NavId | "projectDetail";

function ComingSoon({ title }: { title: string }) {
  return (
    <div style={{ padding: 60, textAlign: "center", color: "var(--text-muted)" }}>
      <div style={{ width: 56, height: 56, borderRadius: 16, background: "var(--surface-secondary)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
        <Icon name="Sparkles" size={24} color="var(--text-muted)" />
      </div>
      <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-secondary)" }}>{title} is on the way</div>
      <div style={{ fontSize: 13.5, marginTop: 4 }}>Focus, Projects, and Project Detail are ready today.</div>
    </div>
  );
}

function Splash() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
      <img src="/worko-mark.svg" alt="" width="44" height="44" />
      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-muted)" }}>Loading your workspace…</div>
    </div>
  );
}

export default function App() {
  const ws = useWorkspace();
  const [screen, setScreen] = React.useState<Screen>("home");
  const [project, setProject] = React.useState<Project | null>(null);

  if (ws.loading) return <Splash />;

  const remaining = ws.tasks.filter((t) => t.status !== "Done").length;
  const TITLES: Record<NavId, [string, string]> = {
    home: ["Focus", `${formatLongDate(TODAY)} · ${remaining} left for today`],
    tasks: ["My tasks", "Everything assigned to you"],
    projects: ["Projects", `${ws.projects.length} active project${ws.projects.length === 1 ? "" : "s"}`],
    team: ["Team", "Workspace members"],
    reports: ["Reports", "Productivity & momentum"],
    settings: ["Settings", "Workspace & preferences"],
  };

  const navigate = (id: NavId) => { setProject(null); setScreen(id); };
  const openProject = (p: Project) => { setProject(p); setScreen("projectDetail"); };

  let title: string | null;
  let subtitle: string | undefined;
  let content: React.ReactNode;
  if (screen === "home") {
    [title, subtitle] = TITLES.home;
    content = <FocusHome />;
  } else if (screen === "projects") {
    [title, subtitle] = TITLES.projects;
    content = <ProjectDashboard onOpenProject={openProject} />;
  } else if (screen === "projectDetail") {
    title = null;
    content = <ProjectDetail project={project} onBack={() => navigate("projects")} />;
  } else {
    [title, subtitle] = TITLES[screen];
    content = <ComingSoon title={title} />;
  }

  const activeNav: NavId = screen === "projectDetail" ? "projects" : screen;

  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
      <Sidebar active={activeNav} onNavigate={navigate} />
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", position: "relative" }}>
        {title !== null && <TopBar title={title} subtitle={subtitle} />}
        <div style={{ flex: 1, minHeight: 0, position: "relative", overflow: "hidden" }}>{content}</div>
      </div>
    </div>
  );
}
