/* Project Detail — editable header, view tabs, and the task views shell. */
import React from "react";
import { AvatarGroup, Button, Tabs } from "../../components/ds";
import { Icon } from "../../components/Icon";
import { WORKO_DATA, type Project } from "../../data/data";
import {
  INITIAL_TASKS, TODAY,
  groupMeta, idxToDue, nextTaskId, startFromDue, useTaskFilter,
  type Task,
} from "./model";
import { AddTaskModal, Toolbar, type AddTaskPreset } from "./shared";
import { TaskDrawer } from "./TaskDrawer";
import { OverviewView } from "./OverviewView";
import { BoardView, CalendarView, ListView, TimelineView } from "./views";

export interface NewTaskInput {
  title?: string;
  status?: Task["status"];
  priority?: Task["priority"];
  assignee?: string;
  due?: Date;
  len?: number;
  scheduled?: boolean;
}

type ViewId = "overview" | "list" | "board" | "calendar" | "timeline";

export function ProjectDetail({ project, onBack, initialView }: { project: Project | null; onBack: () => void; initialView?: ViewId }) {
  const p = project || WORKO_DATA.projects[0];
  const [view, setView] = React.useState<ViewId>(initialView || "overview");
  const [tasks, setTasks] = React.useState<Task[]>(INITIAL_TASKS);
  const [openTask, setOpenTask] = React.useState<Task | null>(null);
  const [completed, setCompleted] = React.useState<Record<string, boolean>>({});
  const [modal, setModal] = React.useState<AddTaskPreset | null>(null);
  const toggleDone = (id: string) => setCompleted((c) => ({ ...c, [id]: !c[id] }));
  const f = useTaskFilter(tasks);

  const addTask = (partial: NewTaskInput) => {
    const due = partial.due ? new Date(partial.due) : new Date(TODAY);
    const len = partial.len || 2;
    setTasks((ts) => [...ts, {
      id: nextTaskId(), title: partial.title || "Untitled task", status: partial.status || "To do",
      priority: partial.priority || "Medium", assignee: partial.assignee || WORKO_DATA.user.name, ai: false,
      len, start: startFromDue(due, len), due, scheduled: partial.scheduled !== false,
    }]);
  };
  const updateTask = (id: string, patch: Partial<Task>) => setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  const applyGroup = (id: string, value: string) => updateTask(id, { [groupMeta(f.groupBy).field]: value } as Partial<Task>);
  const schedule = (id: string, due: Date) => setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, due, start: startFromDue(due, t.len), scheduled: true } : t)));
  const reschedule = (id: string, start: number) => setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, start, due: idxToDue(start + t.len - 1) } : t)));
  const resize = (id: string, len: number) => setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, len, due: idxToDue(t.start + len - 1) } : t)));

  return (
    <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {openTask && <TaskDrawer task={openTask} onClose={() => setOpenTask(null)} />}
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
            <p style={{ margin: "4px 0 0", fontSize: 14, color: "var(--text-secondary)" }}>{p.desc}</p>
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
        {view === "overview" && <OverviewView p={p} tasks={tasks} onOpenTask={setOpenTask} />}
        {view !== "overview" && <Toolbar f={f} count={f.filtered.length} showGroup={view !== "calendar"} onAdd={() => setModal({})} />}
        {view === "list" && <ListView f={f} completed={completed} onToggle={toggleDone} onOpenTask={setOpenTask} onAdd={addTask} />}
        {view === "board" && <BoardView f={f} onOpenTask={setOpenTask} onApplyGroup={applyGroup} onAdd={addTask} />}
        {view === "calendar" && <CalendarView f={f} onOpenTask={setOpenTask} onSchedule={schedule} onAdd={addTask} />}
        {view === "timeline" && <TimelineView f={f} onOpenTask={setOpenTask} onReschedule={reschedule} onResize={resize} onAdd={addTask} />}
      </div>
    </div>
  );
}
