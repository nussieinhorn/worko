/* Project Detail — editable header, view tabs, and the task views shell.
   Tasks come from the workspace store; every mutation persists to Supabase. */
import React from "react";
import { AvatarGroup, Button, Tabs } from "../../components/ds";
import { Icon } from "../../components/Icon";
import { useWorkspace, type Project } from "../../store/workspace";
import { groupMeta, idxToDue, startFromDue, useTaskFilter, type NewTaskInput } from "./model";
import { AddTaskModal, Toolbar, type AddTaskPreset } from "./shared";
import { TaskDrawer } from "./TaskDrawer";
import { OverviewView } from "./OverviewView";
import { BoardView, CalendarView, ListView, TimelineView } from "./views";

type ViewId = "overview" | "list" | "board" | "calendar" | "timeline";

export function ProjectDetail({ project, onBack, initialView }: { project: Project | null; onBack: () => void; initialView?: ViewId }) {
  const ws = useWorkspace();
  const p = project || ws.projects[0];
  const [view, setView] = React.useState<ViewId>(initialView || "overview");
  const [openTaskId, setOpenTaskId] = React.useState<string | null>(null);
  const [modal, setModal] = React.useState<AddTaskPreset | null>(null);

  const tasks = ws.tasks.filter((t) => t.projectId === p?.id);
  const openTask = tasks.find((t) => t.id === openTaskId) ?? null;
  const f = useTaskFilter(tasks);

  if (!p) return null;

  const addTask = (input: NewTaskInput) => ws.createTask(p.id, input);
  const applyGroup = (id: string, value: string) => ws.updateTask(id, { [groupMeta(f.groupBy).field]: value });
  const toggleDone = (id: string) => {
    const t = tasks.find((x) => x.id === id);
    if (t) ws.updateTask(id, { status: t.status === "Done" ? "To do" : "Done" });
  };
  const schedule = (id: string, due: Date) => {
    const t = tasks.find((x) => x.id === id);
    if (t) ws.updateTask(id, { due, start: startFromDue(due, t.len), scheduled: true });
  };
  const reschedule = (id: string, start: number) => {
    const t = tasks.find((x) => x.id === id);
    if (t) ws.updateTask(id, { start, due: idxToDue(start + t.len - 1) });
  };
  const resize = (id: string, len: number) => {
    const t = tasks.find((x) => x.id === id);
    if (t) ws.updateTask(id, { len, due: idxToDue(t.start + len - 1) });
  };

  return (
    <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {openTask && <TaskDrawer task={openTask} onClose={() => setOpenTaskId(null)} />}
      {modal && <AddTaskModal preset={modal} onClose={() => setModal(null)} onCreate={(form) => { addTask(form); setModal(null); }} />}

      <div style={{ padding: "24px 32px 0", flexShrink: 0 }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, border: "none", background: "transparent", cursor: "pointer", color: "var(--text-muted)", fontFamily: "var(--font-sans)", fontSize: 13.5, fontWeight: 600, padding: 0, marginBottom: 16 }}>
          <Icon name="ChevronLeft" size={16} />All projects
        </button>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 18 }}>
          <span style={{ width: 46, height: 46, borderRadius: 13, background: p.color, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="FolderKanban" size={22} color="#fff" />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--text-primary)" }}>{p.name}</h1>
            <p style={{ margin: "4px 0 0", fontSize: 14, color: "var(--text-secondary)" }}>{p.desc || "No description yet."}</p>
          </div>
          <AvatarGroup users={p.members.map((name) => ({ name }))} max={4} size="sm" />
          <Button variant="secondary" leadingIcon={<Icon name="Plus" size={17} />} onClick={() => setModal({})}>Add task</Button>
        </div>
        <Tabs value={view} onChange={(id) => setView(id as ViewId)} items={[
          { id: "overview", label: "Overview", icon: <Icon name="LayoutDashboard" size={16} /> },
          { id: "list", label: "List", icon: <Icon name="List" size={16} /> },
          { id: "board", label: "Board", icon: <Icon name="Columns3" size={16} /> },
          { id: "calendar", label: "Calendar", icon: <Icon name="Calendar" size={16} /> },
          { id: "timeline", label: "Timeline", icon: <Icon name="GanttChart" size={16} /> },
        ]} />
      </div>

      <div style={{ flex: 1, minHeight: 0, overflow: "auto", padding: "20px 32px 36px" }}>
        {view === "overview" && <OverviewView tasks={tasks} onOpenTask={(t) => setOpenTaskId(t.id)} />}
        {view !== "overview" && <Toolbar f={f} count={f.filtered.length} showGroup={view !== "calendar"} onAdd={() => setModal({})} />}
        {view === "list" && <ListView f={f} onToggle={toggleDone} onOpenTask={(t) => setOpenTaskId(t.id)} onAdd={addTask} onUpdate={ws.updateTask} />}
        {view === "board" && <BoardView f={f} onOpenTask={(t) => setOpenTaskId(t.id)} onApplyGroup={applyGroup} onAdd={addTask} />}
        {view === "calendar" && <CalendarView f={f} onOpenTask={(t) => setOpenTaskId(t.id)} onSchedule={schedule} onAdd={addTask} />}
        {view === "timeline" && <TimelineView f={f} onOpenTask={(t) => setOpenTaskId(t.id)} onReschedule={reschedule} onResize={resize} onAdd={addTask} />}
      </div>
    </div>
  );
}
