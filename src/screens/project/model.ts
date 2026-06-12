/* Project Detail — shared data model, constants, and date helpers. */
import React from "react";
import { WORKO_DATA, type Priority, type Status } from "../../data/data";

export interface Task {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  assignee: string;
  ai?: boolean;
  /** Timeline start index (days from TL_BASE). */
  start: number;
  /** Timeline length in days. */
  len: number;
  due: Date;
  scheduled: boolean;
}

export type GroupBy = "status" | "priority" | "assignee" | "none";

export const PRIORITY_TONE: Record<Priority, "error" | "warning" | "neutral"> = { High: "error", Medium: "warning", Low: "neutral" };
export const PRIORITY_COLOR: Record<string, string> = { High: "#EF4444", Medium: "#F59E0B", Low: "#94A3B8" };
export const COLUMN_DOT: Record<string, string> = { Backlog: "#94A3B8", "To do": "#6366F1", "In progress": "#4F46E5", Review: "#F59E0B", Done: "#10B981" };
export const ASSIGNEE_COLOR: Record<string, string> = { "Maya Chen": "#4F46E5", "Sam Ito": "#06B6D4", "Lee Roy": "#6366F1", "Ana Diaz": "#10B981", "Tom B": "#F59E0B", "Priya N": "#EC4899" };
export const STATUS_ORDER: Status[] = ["Backlog", "To do", "In progress", "Review", "Done"];
export const PRIORITY_ORDER: Priority[] = ["High", "Medium", "Low"];
export const ASSIGNEES = Object.keys(ASSIGNEE_COLOR);
export const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const TL_BASE = new Date(2026, 5, 8); // Mon Jun 8, 2026 — timeline / schedule origin
export const TL_DAYS = 14;
export const TODAY = new Date(2026, 5, 10); // Wed Jun 10, 2026
export const TODAY_IDX = 2;

const SCHEDULE: Record<string, { start: number; len: number }> = {
  "Collect launch-day metrics plan": { start: 9, len: 3 },
  "Draft FAQ for support team": { start: 8, len: 2 },
  "Write press release": { start: 4, len: 3 },
  "Schedule social posts": { start: 6, len: 2 },
  "Draft the Q3 launch announcement": { start: 1, len: 4 },
  "Build launch landing page": { start: 2, len: 5 },
  "Final hero illustration": { start: 3, len: 2 },
  "Lock launch date": { start: 0, len: 1 },
  "Brief the exec team": { start: 0, len: 2 },
};

export const fmtDate = (d: Date) => `${MON[d.getMonth()]} ${d.getDate()}`;
export const sameDay = (a: Date | null | undefined, b: Date | null | undefined) =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
export const idxToDue = (idx: number) => { const d = new Date(TL_BASE); d.setDate(d.getDate() + idx); return d; };
export const dueToIdx = (due: Date) => Math.max(0, Math.min(TL_DAYS - 1, Math.round((due.getTime() - TL_BASE.getTime()) / 86400000)));
export const startFromDue = (due: Date, len: number) => Math.max(0, Math.min(TL_DAYS - len, dueToIdx(due) - (len - 1)));
export const toInputDate = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export const sundayOf = (d: Date) => { const x = new Date(d); x.setDate(x.getDate() - x.getDay()); x.setHours(0, 0, 0, 0); return x; };

/* Seed tasks. Backlog items start unscheduled so the Calendar backlog rail has something to drag in. */
export const INITIAL_TASKS: Task[] = (Object.entries(WORKO_DATA.board) as Array<[Status, typeof WORKO_DATA.board[Status]]>).flatMap(([status, tasks]) =>
  tasks.map((t, i) => {
    const sc = SCHEDULE[t.title] || { start: 0, len: 2 };
    return { ...t, status, id: status.replace(/\s/g, "") + i, start: sc.start, len: sc.len, due: idxToDue(sc.start + sc.len - 1), scheduled: status !== "Backlog" };
  })
);

let idSeq = 1;
export const nextTaskId = () => "t" + (idSeq++);

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
