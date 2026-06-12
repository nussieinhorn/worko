/* Project Detail — shared data model, constants, and date helpers. */
import React from "react";
import type { Priority, Status } from "../../data/data";

export interface Task {
  id: string;
  projectId: string;
  title: string;
  status: Status;
  priority: Priority;
  /** Assignee display name ("" when unassigned). */
  assignee: string;
  assigneeId: string | null;
  ai?: boolean;
  description: string;
  estimate: string;
  /** Timeline start index (days from TL_BASE). Derived from due + len. */
  start: number;
  /** Timeline length in days. */
  len: number;
  due: Date;
  scheduled: boolean;
}

/** Partial input for creating a task; missing fields get sensible defaults. */
export interface NewTaskInput {
  title?: string;
  status?: Status;
  priority?: Priority;
  assignee?: string;
  due?: Date;
  len?: number;
  scheduled?: boolean;
}

export type GroupBy = "status" | "priority" | "assignee" | "none";

export const PRIORITY_TONE: Record<Priority, "error" | "warning" | "neutral"> = { High: "error", Medium: "warning", Low: "neutral" };
export const PRIORITY_COLOR: Record<string, string> = { High: "#EF4444", Medium: "#F59E0B", Low: "#94A3B8" };
export const COLUMN_DOT: Record<string, string> = { Backlog: "#94A3B8", "To do": "#6366F1", "In progress": "#4F46E5", Review: "#F59E0B", Done: "#10B981" };
export const STATUS_ORDER: Status[] = ["Backlog", "To do", "In progress", "Review", "Done"];
export const PRIORITY_ORDER: Priority[] = ["High", "Medium", "Low"];
export const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/* Workspace members are loaded from the database at startup; the store calls
   registerMembers() so grouping/filtering helpers can stay plain functions. */
export const ASSIGNEES: string[] = [];
export const ASSIGNEE_COLOR: Record<string, string> = {};

export function registerMembers(members: Array<{ name: string; color: string }>) {
  ASSIGNEES.length = 0;
  members.forEach((m) => {
    ASSIGNEES.push(m.name);
    ASSIGNEE_COLOR[m.name] = m.color;
  });
}

/* The timeline shows TL_DAYS days starting TL_BASE, with today at TODAY_IDX. */
export const TODAY = (() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; })();
export const TODAY_IDX = 2;
export const TL_DAYS = 14;
export const TL_BASE = (() => { const d = new Date(TODAY); d.setDate(d.getDate() - TODAY_IDX); return d; })();

export const fmtDate = (d: Date) => `${MON[d.getMonth()]} ${d.getDate()}`;
export const sameDay = (a: Date | null | undefined, b: Date | null | undefined) =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
export const idxToDue = (idx: number) => { const d = new Date(TL_BASE); d.setDate(d.getDate() + idx); return d; };
export const dueToIdx = (due: Date) => Math.max(0, Math.min(TL_DAYS - 1, Math.round((due.getTime() - TL_BASE.getTime()) / 86400000)));
export const startFromDue = (due: Date, len: number) => Math.max(0, Math.min(TL_DAYS - len, dueToIdx(due) - (len - 1)));
export const toInputDate = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export const sundayOf = (d: Date) => { const x = new Date(d); x.setDate(x.getDate() - x.getDay()); x.setHours(0, 0, 0, 0); return x; };

/* ============================ filter + grouping ============================ */
export interface TaskFilter {
  search: string;
  setSearch: (v: string) => void;
  groupBy: GroupBy;
  setGroupBy: (v: GroupBy) => void;
  priority: string;
  setPriority: (v: string) => void;
  assignee: string;
  setAssignee: (v: string) => void;
  filtered: Task[];
}

export function useTaskFilter(tasks: Task[]): TaskFilter {
  const [search, setSearch] = React.useState("");
  const [groupBy, setGroupBy] = React.useState<GroupBy>("status");
  const [priority, setPriority] = React.useState("All");
  const [assignee, setAssignee] = React.useState("All");
  const filtered = tasks.filter((t) =>
    (!search || t.title.toLowerCase().includes(search.toLowerCase())) &&
    (priority === "All" || t.priority === priority) &&
    (assignee === "All" || t.assignee === assignee));
  return { search, setSearch, groupBy, setGroupBy, priority, setPriority, assignee, setAssignee, filtered };
}

export interface GroupMeta {
  order: string[];
  field: "status" | "priority" | "assignee";
  key: (t: Task) => string;
  color: (k: string) => string;
}

export function groupMeta(groupBy: GroupBy): GroupMeta {
  if (groupBy === "priority") return { order: PRIORITY_ORDER, field: "priority", key: (t) => t.priority, color: (k) => PRIORITY_COLOR[k] };
  if (groupBy === "assignee") return { order: ASSIGNEES, field: "assignee", key: (t) => t.assignee, color: (k) => ASSIGNEE_COLOR[k] };
  return { order: STATUS_ORDER, field: "status", key: (t) => t.status, color: (k) => COLUMN_DOT[k] };
}

export function groupTasks(tasks: Task[], groupBy: GroupBy, includeEmpty = false): Array<[string, Task[]]> {
  if (groupBy === "none") return [["All tasks", tasks]];
  const { order, key } = groupMeta(groupBy);
  const map: Record<string, Task[]> = {};
  tasks.forEach((t) => { const k = key(t); (map[k] = map[k] || []).push(t); });
  const base = includeEmpty ? order : order.filter((k) => map[k]);
  const known: Array<[string, Task[]]> = base.map((k) => [k, map[k] || []]);
  const extra: Array<[string, Task[]]> = Object.keys(map).filter((k) => !order.includes(k)).map((k) => [k, map[k]]);
  return [...known, ...extra];
}
