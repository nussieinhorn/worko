/* Single-user workspace store.
   Loads the whole workspace from Supabase once, serves it from React state,
   and persists every mutation in the background (optimistic updates — the UI
   never waits on the network; failures are logged to the console). */
import React from "react";
import { supabase, supabaseConfigured } from "../lib/supabase";
import { WORKO_DATA, type Priority, type Status } from "../data/data";
import {
  TODAY, registerMembers, startFromDue, toInputDate,
  type NewTaskInput, type Task,
} from "../screens/project/model";

export interface Member { id: string; name: string; role: string; color: string }
export interface Project { id: string; name: string; desc: string; color: string; members: string[]; updatedAt: Date }
export interface Subtask { id: string; taskId: string; label: string; done: boolean; position: number }

interface TaskRow {
  id: string; project_id: string; title: string; status: Status; priority: Priority;
  assignee_id: string | null; ai_suggested: boolean; description: string; estimate: string;
  due: string | null; len_days: number; scheduled: boolean;
}

const PROJECT_COLORS = ["#4F46E5", "#06B6D4", "#10B981", "#F59E0B", "#6366F1", "#0891B2"];

function logWrite(op: string) {
  return ({ error }: { error: { message: string } | null }) => {
    if (error) console.error(`[workspace] ${op} failed: ${error.message}`);
  };
}

export interface Workspace {
  loading: boolean;
  members: Member[];
  projects: Project[];
  tasks: Task[];
  subtasksFor: (taskId: string) => Subtask[];
  createProject: (name: string) => void;
  createTask: (projectId: string, input: NewTaskInput) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addSubtask: (taskId: string, label: string) => void;
  updateSubtask: (id: string, patch: Partial<Pick<Subtask, "label" | "done">>) => void;
  deleteSubtask: (id: string) => void;
  reorderSubtasks: (taskId: string, orderedIds: string[]) => void;
}

const WorkspaceContext = React.createContext<Workspace | null>(null);

export function useWorkspace(): Workspace {
  const ws = React.useContext(WorkspaceContext);
  if (!ws) throw new Error("useWorkspace must be used inside <WorkspaceProvider>");
  return ws;
}

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState(true);
  const [members, setMembers] = React.useState<Member[]>([]);
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [subtasks, setSubtasks] = React.useState<Subtask[]>([]);
  const membersRef = React.useRef<Member[]>([]);
  membersRef.current = members;

  React.useEffect(() => {
    if (!supabaseConfigured) return;
    let cancelled = false;
    (async () => {
      const [m, p, pm, t, s] = await Promise.all([
        supabase.from("members").select("id, name, role, color").order("created_at"),
        supabase.from("projects").select("id, name, description, color, updated_at").order("created_at"),
        supabase.from("project_members").select("project_id, member_id"),
        supabase.from("tasks").select("id, project_id, title, status, priority, assignee_id, ai_suggested, description, estimate, due, len_days, scheduled").order("created_at"),
        supabase.from("subtasks").select("id, task_id, label, done, position").order("position"),
      ]);
      const err = m.error || p.error || pm.error || t.error || s.error;
      if (err) { console.error("[workspace] load failed:", err.message); return; }
      if (cancelled) return;

      const mems = (m.data ?? []) as Member[];
      registerMembers(mems);
      const nameById = new Map(mems.map((x) => [x.id, x.name]));
      const membersByProject = new Map<string, string[]>();
      (pm.data ?? []).forEach((row: { project_id: string; member_id: string }) => {
        const name = nameById.get(row.member_id);
        if (!name) return;
        membersByProject.set(row.project_id, [...(membersByProject.get(row.project_id) ?? []), name]);
      });

      setMembers(mems);
      setProjects((p.data ?? []).map((row) => ({
        id: row.id, name: row.name, desc: row.description, color: row.color,
        members: membersByProject.get(row.id) ?? [], updatedAt: new Date(row.updated_at),
      })));
      setTasks(((t.data ?? []) as TaskRow[]).map((row) => {
        const due = row.due ? new Date(row.due + "T00:00:00") : new Date(TODAY);
        return {
          id: row.id, projectId: row.project_id, title: row.title, status: row.status,
          priority: row.priority, assignee: (row.assignee_id && nameById.get(row.assignee_id)) || "",
          assigneeId: row.assignee_id, ai: row.ai_suggested, description: row.description,
          estimate: row.estimate, due, len: row.len_days, start: startFromDue(due, row.len_days),
          scheduled: row.scheduled,
        };
      }));
      setSubtasks((s.data ?? []).map((row: { id: string; task_id: string; label: string; done: boolean; position: number }) => ({
        id: row.id, taskId: row.task_id, label: row.label, done: row.done, position: row.position,
      })));
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  const value = React.useMemo<Workspace>(() => {
    const memberIdByName = (name: string | undefined) =>
      name ? membersRef.current.find((m) => m.name === name)?.id ?? null : null;

    return {
      loading, members, projects, tasks,

      subtasksFor: (taskId) => subtasks.filter((s) => s.taskId === taskId).sort((a, b) => a.position - b.position),

      createProject: (name) => {
        const id = crypto.randomUUID();
        const color = PROJECT_COLORS[projects.length % PROJECT_COLORS.length];
        const me = membersRef.current.find((m) => m.name === WORKO_DATA.user.name);
        setProjects((ps) => [...ps, { id, name, desc: "", color, members: me ? [me.name] : [], updatedAt: new Date() }]);
        void (async () => {
          const { error } = await supabase.from("projects").insert({ id, name, description: "", color });
          if (error) { console.error(`[workspace] create project failed: ${error.message}`); return; }
          if (me) supabase.from("project_members").insert({ project_id: id, member_id: me.id }).then(logWrite("add project member"));
        })();
      },

      createTask: (projectId, input) => {
        const id = crypto.randomUUID();
        const due = input.due ? new Date(input.due) : new Date(TODAY);
        const len = input.len || 2;
        const assignee = input.assignee ?? WORKO_DATA.user.name;
        const task: Task = {
          id, projectId, title: input.title || "Untitled task", status: input.status || "To do",
          priority: input.priority || "Medium", assignee, assigneeId: memberIdByName(assignee),
          ai: false, description: "", estimate: "", due, len, start: startFromDue(due, len),
          scheduled: input.scheduled !== false,
        };
        setTasks((ts) => [...ts, task]);
        supabase.from("tasks").insert({
          id, project_id: projectId, title: task.title, status: task.status, priority: task.priority,
          assignee_id: task.assigneeId, due: toInputDate(due), len_days: len, scheduled: task.scheduled,
        }).then(logWrite("create task"));
      },

      updateTask: (id, patch) => {
        const full = { ...patch };
        if (patch.assignee !== undefined) full.assigneeId = memberIdByName(patch.assignee);
        setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, ...full } : t)));

        const row: Record<string, unknown> = {};
        if (patch.title !== undefined) row.title = patch.title;
        if (patch.status !== undefined) row.status = patch.status;
        if (patch.priority !== undefined) row.priority = patch.priority;
        if (patch.assignee !== undefined) row.assignee_id = full.assigneeId;
        if (patch.due !== undefined) row.due = toInputDate(patch.due);
        if (patch.len !== undefined) row.len_days = patch.len;
        if (patch.scheduled !== undefined) row.scheduled = patch.scheduled;
        if (patch.description !== undefined) row.description = patch.description;
        if (patch.estimate !== undefined) row.estimate = patch.estimate;
        if (Object.keys(row).length === 0) return;
        supabase.from("tasks").update(row).eq("id", id).then(logWrite("update task"));
      },

      deleteTask: (id) => {
        setTasks((ts) => ts.filter((t) => t.id !== id));
        setSubtasks((ss) => ss.filter((s) => s.taskId !== id));
        supabase.from("tasks").delete().eq("id", id).then(logWrite("delete task"));
      },

      addSubtask: (taskId, label) => {
        const id = crypto.randomUUID();
        const position = subtasks.filter((s) => s.taskId === taskId).length;
        setSubtasks((ss) => [...ss, { id, taskId, label, done: false, position }]);
        supabase.from("subtasks").insert({ id, task_id: taskId, label, position }).then(logWrite("add subtask"));
      },

      updateSubtask: (id, patch) => {
        setSubtasks((ss) => ss.map((s) => (s.id === id ? { ...s, ...patch } : s)));
        supabase.from("subtasks").update(patch).eq("id", id).then(logWrite("update subtask"));
      },

      deleteSubtask: (id) => {
        setSubtasks((ss) => ss.filter((s) => s.id !== id));
        supabase.from("subtasks").delete().eq("id", id).then(logWrite("delete subtask"));
      },

      reorderSubtasks: (taskId, orderedIds) => {
        setSubtasks((ss) => ss.map((s) => {
          const idx = orderedIds.indexOf(s.id);
          return s.taskId === taskId && idx >= 0 ? { ...s, position: idx } : s;
        }));
        orderedIds.forEach((id, idx) => {
          supabase.from("subtasks").update({ position: idx }).eq("id", id).then(logWrite("reorder subtasks"));
        });
      },
    };
  }, [loading, members, projects, tasks, subtasks]);

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}
