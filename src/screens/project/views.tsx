/* Project Detail — the four interactive task views (Board, List, Calendar, Timeline). */
import React from "react";
import { Avatar, Badge } from "../../components/ds";
import { Icon } from "../../components/Icon";
import { formatMonthYear } from "../../lib/format";
import type { Priority, Status } from "../../data/data";
import {
  ASSIGNEES, COLUMN_DOT, DOW, MON, PRIORITY_COLOR, PRIORITY_ORDER, PRIORITY_TONE,
  STATUS_ORDER, TL_DAYS, TODAY, TODAY_IDX,
  fmtDate, groupMeta, groupTasks, idxToDue, sameDay, startFromDue, sundayOf, toInputDate,
  type NewTaskInput, type Task, type TaskFilter,
} from "./model";
import { EmptyState, MiniInput, QuickAdd, Tip } from "./shared";

/* ============================ Board view ============================ */
function TaskCard({ task, onOpen, dragging, onDragStart, onDragEnd }: {
  task: Task;
  onOpen: () => void;
  dragging: boolean;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: () => void;
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <Tip task={task} style={{ display: "block" }}>
      <div draggable onDragStart={onDragStart} onDragEnd={onDragEnd}
        onClick={onOpen} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{
          background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12,
          boxShadow: hover ? "var(--shadow-md)" : "var(--shadow-xs)", padding: 13, cursor: "grab",
          transition: "box-shadow var(--dur-fast) var(--ease-out)", display: "flex", flexDirection: "column", gap: 10,
          opacity: dragging ? 0.4 : 1,
        }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.4, color: "var(--text-primary)" }}>{task.title}</div>
        {task.ai && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 600, color: "var(--cyan-600)" }}>
            <Icon name="Sparkles" size={13} color="var(--cyan-600)" />AI suggested next
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <Badge tone={PRIORITY_TONE[task.priority]}>{task.priority}</Badge>
            <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11.5, color: "var(--text-muted)", fontWeight: 600 }}>
              <Icon name="Calendar" size={12} color="var(--text-muted)" />{fmtDate(task.due)}
            </span>
          </span>
          <Avatar name={task.assignee} size="xs" />
        </div>
      </div>
    </Tip>
  );
}

export function BoardView({ f, onOpenTask, onApplyGroup, onAdd }: {
  f: TaskFilter;
  onOpenTask: (t: Task) => void;
  onApplyGroup: (id: string, value: string) => void;
  onAdd: (t: NewTaskInput) => void;
}) {
  const gb = f.groupBy === "none" ? "status" : f.groupBy;
  const meta = groupMeta(gb);
  const [drag, setDrag] = React.useState<string | null>(null); // task id being dragged
  const [over, setOver] = React.useState<string | null>(null); // column hovered

  const map: Record<string, Task[]> = {};
  f.filtered.forEach((t) => { const k = meta.key(t); (map[k] = map[k] || []).push(t); });
  const cols = (gb === "assignee" ? meta.order.filter((k) => map[k]) : meta.order).slice();
  Object.keys(map).forEach((k) => { if (!cols.includes(k)) cols.push(k); });

  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start", overflowX: "auto", paddingBottom: 8 }}>
      {cols.map((col) => {
        const tasks = map[col] || [];
        const isOver = over === col;
        return (
          <div key={col}
            onDragOver={(e) => { e.preventDefault(); if (over !== col) setOver(col); }}
            onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOver((o) => (o === col ? null : o)); }}
            onDrop={(e) => { e.preventDefault(); const id = e.dataTransfer.getData("text/plain"); if (id) onApplyGroup(id, col); setOver(null); setDrag(null); }}
            style={{
              width: 264, flexShrink: 0, display: "flex", flexDirection: "column", gap: 10, padding: 8, borderRadius: 14,
              background: isOver ? "var(--indigo-50, #EEF2FF)" : "transparent",
              outline: isOver ? "1.5px dashed var(--color-primary)" : "1.5px dashed transparent",
              transition: "background var(--dur-fast) var(--ease-out)",
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "2px 4px" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: meta.color(col) }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{col}</span>
              <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600 }}>{tasks.length}</span>
            </div>
            {tasks.map((t) => (
              <TaskCard key={t.id} task={t} dragging={drag === t.id}
                onDragStart={(e) => { e.dataTransfer.setData("text/plain", t.id); e.dataTransfer.effectAllowed = "move"; setDrag(t.id); }}
                onDragEnd={() => { setDrag(null); setOver(null); }}
                onOpen={() => onOpenTask(t)} />
            ))}
            <QuickAdd onAdd={(title) => onAdd({ title, [meta.field]: col } as NewTaskInput)} />
          </div>
        );
      })}
    </div>
  );
}

/* ============================ List view ============================ */
const LIST_COLS = "1fr 144px 122px 146px 150px";

function ListRow({ task, done, onToggle, onOpen, onUpdate }: {
  task: Task; done: boolean; onToggle: () => void; onOpen: () => void;
  onUpdate: (patch: Partial<Task>) => void;
}) {
  const [hover, setHover] = React.useState(false);
  const stop = (e: React.SyntheticEvent) => e.stopPropagation();
  const cellSelect: React.CSSProperties = {
    height: 30, minWidth: 0, flex: 1, borderRadius: 7, padding: "0 4px",
    border: `1px solid ${hover ? "var(--border)" : "transparent"}`, background: hover ? "var(--surface)" : "transparent",
    fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "var(--text-primary)",
    cursor: "pointer", outline: "none", transition: "border-color var(--dur-fast) var(--ease-out)",
  };
  return (
    <div onClick={onOpen} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      display: "grid", gridTemplateColumns: LIST_COLS, gap: 14, alignItems: "center",
      padding: "10px 18px", borderTop: "1px solid var(--border)", cursor: "pointer",
      background: hover ? "var(--bg-app)" : "transparent", transition: "background var(--dur-fast) var(--ease-out)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
        <span onClick={(e) => { e.stopPropagation(); onToggle(); }} style={{
          width: 20, height: 20, borderRadius: "50%", flexShrink: 0, cursor: "pointer",
          border: done ? "none" : "2px solid var(--border-strong)", background: done ? "var(--color-success)" : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>{done && <Icon name="Check" size={13} color="#fff" />}</span>
        <span style={{ fontSize: 14, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: done ? "var(--text-muted)" : "var(--text-primary)", textDecoration: done ? "line-through" : "none" }}>{task.title}</span>
        {task.ai && <Icon name="Sparkles" size={14} color="var(--cyan-600)" style={{ flexShrink: 0 }} />}
      </div>

      {/* Status */}
      <span onClick={stop} style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: COLUMN_DOT[task.status], flexShrink: 0 }} />
        <select value={task.status} onChange={(e) => onUpdate({ status: e.target.value as Status })} style={cellSelect}>
          {STATUS_ORDER.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </span>

      {/* Priority */}
      <span onClick={stop} style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: PRIORITY_COLOR[task.priority], flexShrink: 0 }} />
        <select value={task.priority} onChange={(e) => onUpdate({ priority: e.target.value as Priority })} style={cellSelect}>
          {PRIORITY_ORDER.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </span>

      {/* Due */}
      <span onClick={stop} style={{ display: "flex", alignItems: "center", minWidth: 0 }}>
        <input type="date" value={toInputDate(task.due)} onChange={(e) => {
          if (!e.target.value) return;
          const due = new Date(e.target.value + "T00:00:00");
          onUpdate({ due, start: startFromDue(due, task.len), scheduled: true });
        }} style={{ ...cellSelect, fontSize: 12.5, fontWeight: 600, color: "var(--text-secondary)" }} />
      </span>

      {/* Assignee */}
      <span onClick={stop} style={{ display: "flex", alignItems: "center", gap: 7, minWidth: 0 }}>
        <Avatar name={task.assignee} size="xs" />
        <select value={task.assignee} onChange={(e) => onUpdate({ assignee: e.target.value })} style={cellSelect}>
          {ASSIGNEES.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
      </span>
    </div>
  );
}

export function ListView({ f, onToggle, onOpenTask, onAdd, onUpdate }: {
  f: TaskFilter;
  onToggle: (id: string) => void;
  onOpenTask: (t: Task) => void;
  onAdd: (t: NewTaskInput) => void;
  onUpdate: (id: string, patch: Partial<Task>) => void;
}) {
  if (!f.filtered.length) return <EmptyState label="Try clearing search or filters." />;
  const groups = groupTasks(f.filtered, f.groupBy);
  const meta = groupMeta(f.groupBy === "none" ? "status" : f.groupBy);
  const doneCount = f.filtered.filter((t) => t.status === "Done").length;
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: LIST_COLS, gap: 14, padding: "11px 18px", borderBottom: "1px solid var(--border)", fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--text-muted)" }}>
        <span>Task · {doneCount}/{f.filtered.length} done</span><span>Status</span><span>Priority</span><span>Due</span><span>Assignee</span>
      </div>
      {groups.map(([label, tasks]) => (
        <div key={label}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 18px", background: "var(--bg-app)" }}>
            {f.groupBy !== "none" && <span style={{ width: 8, height: 8, borderRadius: "50%", background: meta.color(label) }} />}
            <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--text-secondary)" }}>{label}</span>
            <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600 }}>{tasks.length}</span>
          </div>
          {tasks.map((t) => <ListRow key={t.id} task={t} done={t.status === "Done"} onToggle={() => onToggle(t.id)} onOpen={() => onOpenTask(t)} onUpdate={(patch) => onUpdate(t.id, patch)} />)}
          <div style={{ borderTop: "1px solid var(--border)", padding: "4px 12px" }}>
            <QuickAdd onAdd={(title) => onAdd(f.groupBy === "none" ? { title } : { title, [meta.field]: label } as NewTaskInput)} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================ Calendar view ============================ */
function CalChip({ task, onOpen }: { task: Task; onOpen: (t: Task) => void }) {
  return (
    <Tip task={task} style={{ display: "block" }}>
      <div draggable onDragStart={(e) => { e.dataTransfer.setData("text/plain", task.id); e.dataTransfer.effectAllowed = "move"; }}
        onClick={(e) => { e.stopPropagation(); onOpen(task); }}
        style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 7px", borderRadius: 7, cursor: "grab", background: "var(--bg-app)", borderLeft: `3px solid ${COLUMN_DOT[task.status]}` }}>
        <span style={{ fontSize: 11.5, fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{task.title}</span>
      </div>
    </Tip>
  );
}

interface CellShared {
  isToday: boolean;
  isOver: boolean;
  onOpen: (t: Task) => void;
  onDrop: (id: string, date: Date) => void;
  onOver: () => void;
  onLeave: () => void;
  adding: Date | null;
  setAdding: (d: Date | null) => void;
  onAdd: (t: NewTaskInput) => void;
}

function MonthCell({ date, tasks, isToday, isOver, onOpen, onDrop, onOver, onLeave, adding, setAdding, onAdd }: CellShared & { date: Date | null; tasks: Task[] }) {
  return (
    <div
      onDragOver={(e) => { if (date) { e.preventDefault(); onOver(); } }} onDragLeave={onLeave}
      onDrop={(e) => { e.preventDefault(); const id = e.dataTransfer.getData("text/plain"); if (id && date) onDrop(id, date); }}
      onClick={() => date && setAdding(date)}
      style={{
        minHeight: 108, padding: 7, borderBottom: "1px solid var(--border)", cursor: date ? "pointer" : "default",
        borderRight: "1px solid var(--border)", background: !date ? "var(--bg-app)" : isOver ? "var(--indigo-50, #EEF2FF)" : isToday ? "var(--indigo-50, #EEF2FF)" : "var(--surface)",
        outline: isOver ? "1.5px dashed var(--color-primary)" : "none", outlineOffset: -2,
      }}>
      {date && (
        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 22, height: 22, padding: "0 5px", borderRadius: 7, fontSize: 12.5, fontWeight: isToday ? 700 : 600, color: isToday ? "#fff" : "var(--text-secondary)", background: isToday ? "var(--color-primary)" : "transparent", marginBottom: 5 }}>{date.getDate()}</div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {tasks.map((t) => <CalChip key={t.id} task={t} onOpen={onOpen} />)}
      </div>
      {date && adding && sameDay(adding, date) && <MiniInput onSubmit={(title) => onAdd({ title, due: date })} onClose={() => setAdding(null)} />}
    </div>
  );
}

function DayColumn({ date, tasks, isToday, isOver, onOpen, onDrop, onOver, onLeave, adding, setAdding, onAdd, flex }: CellShared & { date: Date; tasks: Task[]; flex?: number }) {
  return (
    <div style={{ flex: flex || 1, minWidth: 0, display: "flex", flexDirection: "column", borderRight: "1px solid var(--border)" }}>
      <div style={{ padding: "9px 12px", borderBottom: "1px solid var(--border)", background: isToday ? "var(--indigo-50, #EEF2FF)" : "var(--surface)" }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: isToday ? "var(--color-primary)" : "var(--text-muted)" }}>{DOW[date.getDay()]}</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: isToday ? "var(--color-primary)" : "var(--text-primary)" }}>{date.getDate()}</div>
      </div>
      <div
        onDragOver={(e) => { e.preventDefault(); onOver(); }} onDragLeave={onLeave}
        onDrop={(e) => { e.preventDefault(); const id = e.dataTransfer.getData("text/plain"); if (id) onDrop(id, date); }}
        onClick={() => setAdding(date)}
        style={{ flex: 1, minHeight: 300, padding: 8, display: "flex", flexDirection: "column", gap: 5, cursor: "pointer", background: isOver ? "var(--indigo-50, #EEF2FF)" : "transparent" }}>
        {tasks.map((t) => <CalChip key={t.id} task={t} onOpen={onOpen} />)}
        {adding && sameDay(adding, date) && <MiniInput onSubmit={(title) => onAdd({ title, due: date })} onClose={() => setAdding(null)} />}
      </div>
    </div>
  );
}

export function CalendarView({ f, onOpenTask, onSchedule, onAdd }: {
  f: TaskFilter;
  onOpenTask: (t: Task) => void;
  onSchedule: (id: string, due: Date) => void;
  onAdd: (t: NewTaskInput) => void;
}) {
  const [mode, setMode] = React.useState<"month" | "week" | "day">("month");
  const [showBacklog, setShowBacklog] = React.useState(false);
  const [adding, setAdding] = React.useState<Date | null>(null);
  const [over, setOver] = React.useState<Date | null>(null);
  const scheduled = f.filtered.filter((t) => t.scheduled !== false);
  const backlog = f.filtered.filter((t) => t.scheduled === false);
  const tasksOn = (d: Date) => scheduled.filter((t) => sameDay(t.due, d));

  // month cells for the current month
  const year = TODAY.getFullYear(), month = TODAY.getMonth();
  const first = new Date(year, month, 1), lead = first.getDay(), daysIn = new Date(year, month + 1, 0).getDate();
  const cells: Array<Date | null> = [];
  for (let i = 0; i < lead; i++) cells.push(null);
  for (let d = 1; d <= daysIn; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  const weekDays = Array.from({ length: 7 }, (_, i) => { const d = sundayOf(TODAY); d.setDate(d.getDate() + i); return d; });

  const cellProps = (date: Date | null): CellShared => ({
    isOver: !!over && !!date && sameDay(over, date), isToday: sameDay(date, TODAY),
    onOpen: onOpenTask, onDrop: onSchedule, onOver: () => setOver(date), onLeave: () => setOver(null),
    adding, setAdding, onAdd,
  });

  const SegBtn = ({ id, label }: { id: "month" | "week" | "day"; label: string }) => (
    <button onClick={() => setMode(id)} style={{
      height: 30, padding: "0 13px", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "var(--font-sans)",
      fontSize: 13, fontWeight: 600, background: mode === id ? "var(--surface)" : "transparent",
      color: mode === id ? "var(--color-primary)" : "var(--text-muted)", boxShadow: mode === id ? "var(--shadow-xs)" : "none",
    }}>{label}</button>
  );

  return (
    <div style={{ display: "flex", gap: 16, alignItems: "stretch" }}>
      <div style={{ flex: 1, minWidth: 0, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 18px", borderBottom: "1px solid var(--border)" }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>{mode === "day" ? `${MON[TODAY.getMonth()]} ${TODAY.getDate()}, ${TODAY.getFullYear()}` : formatMonthYear(TODAY)}</span>
          <div style={{ display: "flex", gap: 4 }}>
            <span style={{ width: 28, height: 28, borderRadius: 8, border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-muted)" }}><Icon name="ChevronLeft" size={16} /></span>
            <span style={{ width: 28, height: 28, borderRadius: 8, border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-muted)" }}><Icon name="ChevronRight" size={16} /></span>
          </div>
          <div style={{ display: "flex", gap: 2, padding: 3, background: "var(--bg-app)", borderRadius: 11, marginLeft: 4 }}>
            <SegBtn id="month" label="Month" /><SegBtn id="week" label="Week" /><SegBtn id="day" label="Day" />
          </div>
          <button onClick={() => setShowBacklog((s) => !s)} style={{
            marginLeft: "auto", display: "flex", alignItems: "center", gap: 7, height: 32, padding: "0 12px",
            background: showBacklog ? "var(--indigo-50, #EEF2FF)" : "var(--surface)",
            border: `1px solid ${showBacklog ? "var(--color-primary)" : "var(--border)"}`, borderRadius: "var(--radius-button)",
            cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600,
            color: showBacklog ? "var(--color-primary)" : "var(--text-secondary)",
          }}>
            <Icon name="PanelRight" size={15} color={showBacklog ? "var(--color-primary)" : "var(--text-muted)"} />Unscheduled
            <span style={{ fontSize: 11, fontWeight: 700, padding: "1px 7px", borderRadius: 999, background: backlog.length ? "var(--color-primary)" : "var(--border)", color: backlog.length ? "#fff" : "var(--text-muted)" }}>{backlog.length}</span>
          </button>
        </div>

        {mode === "month" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
            {DOW.map((d) => <div key={d} style={{ padding: "9px 12px", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--text-muted)", borderBottom: "1px solid var(--border)", borderRight: "1px solid var(--border)" }}>{d}</div>)}
            {cells.map((date, i) => <MonthCell key={i} date={date} tasks={date ? tasksOn(date) : []} {...cellProps(date)} />)}
          </div>
        )}
        {mode === "week" && (
          <div style={{ display: "flex" }}>
            {weekDays.map((d, i) => <DayColumn key={i} date={d} tasks={tasksOn(d)} {...cellProps(d)} />)}
          </div>
        )}
        {mode === "day" && (
          <div style={{ display: "flex" }}>
            <DayColumn date={TODAY} tasks={tasksOn(TODAY)} flex={1} {...cellProps(TODAY)} />
          </div>
        )}
      </div>

      {showBacklog && (
        <aside style={{ width: 244, flexShrink: 0, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-sm)", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--text-primary)" }}>Unscheduled</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>Drag a task onto a day to schedule it.</div>
          </div>
          {backlog.length === 0 && (
            <div style={{ padding: "24px 8px", textAlign: "center", color: "var(--text-muted)", fontSize: 12.5 }}>
              <Icon name="CheckCheck" size={20} color="var(--text-muted)" style={{ margin: "0 auto 8px" }} />Everything's on the calendar.
            </div>
          )}
          {backlog.map((t) => (
            <div key={t.id} draggable onDragStart={(e) => { e.dataTransfer.setData("text/plain", t.id); e.dataTransfer.effectAllowed = "move"; }}
              onClick={() => onOpenTask(t)}
              style={{ border: "1px solid var(--border)", borderRadius: 10, padding: "10px 11px", cursor: "grab", display: "flex", flexDirection: "column", gap: 8, borderLeft: `3px solid ${COLUMN_DOT[t.status]}` }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.35 }}>{t.title}</span>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Badge tone={PRIORITY_TONE[t.priority]}>{t.priority}</Badge>
                <Avatar name={t.assignee} size="xs" />
              </span>
            </div>
          ))}
        </aside>
      )}
    </div>
  );
}

/* ============================ Timeline view ============================ */
type TimelineDrag =
  | { type: "move"; id: string; task: Task; startX: number; orig: number; len: number; moved: boolean }
  | { type: "resize"; id: string; startX: number; start: number; origLen: number };

export function TimelineView({ f, onOpenTask, onReschedule, onResize, onAdd }: {
  f: TaskFilter;
  onOpenTask: (t: Task) => void;
  onReschedule: (id: string, start: number) => void;
  onResize: (id: string, len: number) => void;
  onAdd: (t: NewTaskInput) => void;
}) {
  const dayW = 60, labelW = 232, rowH = 46;
  const days = React.useMemo(() => Array.from({ length: TL_DAYS }, (_, i) => idxToDue(i)), []);
  const isWeekend = (i: number) => { const d = days[i].getDay(); return d === 0 || d === 6; };
  const drag = React.useRef<TimelineDrag | null>(null);

  const onMove = (e: PointerEvent) => {
    const d = drag.current; if (!d) return;
    const delta = Math.round((e.clientX - d.startX) / dayW);
    if (d.type === "move") {
      if (delta !== 0) d.moved = true;
      onReschedule(d.id, Math.max(0, Math.min(TL_DAYS - d.len, d.orig + delta)));
    } else {
      onResize(d.id, Math.max(1, Math.min(TL_DAYS - d.start, d.origLen + delta)));
    }
  };
  const onUp = () => {
    const d = drag.current;
    window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp);
    if (d && d.type === "move" && !d.moved) onOpenTask(d.task);
    drag.current = null;
  };
  const startMove = (e: React.PointerEvent, t: Task) => { e.preventDefault(); drag.current = { type: "move", id: t.id, task: t, startX: e.clientX, orig: t.start, len: t.len, moved: false }; window.addEventListener("pointermove", onMove); window.addEventListener("pointerup", onUp); };
  const startResize = (e: React.PointerEvent, t: Task) => { e.preventDefault(); e.stopPropagation(); drag.current = { type: "resize", id: t.id, startX: e.clientX, start: t.start, origLen: t.len }; window.addEventListener("pointermove", onMove); window.addEventListener("pointerup", onUp); };

  if (!f.filtered.length) return <EmptyState label="Try clearing search or filters." />;
  const groups = groupTasks(f.filtered, f.groupBy);
  const meta = groupMeta(f.groupBy === "none" ? "status" : f.groupBy);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12, fontSize: 12.5, color: "var(--text-muted)" }}>
        <Icon name="MousePointerClick" size={14} color="var(--text-muted)" />Drag a bar to move it · drag its right edge to resize · click to open
      </div>
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-sm)", overflow: "auto" }}>
        <div style={{ minWidth: labelW + TL_DAYS * dayW }}>
          <div style={{ display: "flex", position: "sticky", top: 0, zIndex: 3, background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
            <div style={{ width: labelW, flexShrink: 0, padding: "12px 16px", fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--text-muted)" }}>Task</div>
            <div style={{ display: "flex" }}>
              {days.map((d, idx) => (
                <div key={idx} style={{ width: dayW, textAlign: "center", padding: "7px 0", borderLeft: "1px solid var(--border)", background: isWeekend(idx) ? "var(--bg-app)" : "transparent" }}>
                  <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.03em", color: idx === TODAY_IDX ? "var(--color-primary)" : "var(--text-muted)" }}>{DOW[d.getDay()]}</div>
                  <div style={{ fontSize: 13, fontWeight: idx === TODAY_IDX ? 700 : 600, color: idx === TODAY_IDX ? "var(--color-primary)" : "var(--text-primary)" }}>{d.getDate()}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: 0, bottom: 0, left: labelW + TODAY_IDX * dayW + dayW / 2 - 1, width: 2, background: "var(--color-primary)", opacity: 0.35, zIndex: 2 }} />
            {groups.map(([label, tasks]) => (
              <React.Fragment key={label}>
                {f.groupBy !== "none" && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 16px", background: "var(--bg-app)", borderTop: "1px solid var(--border)" }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: meta.color(label) }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)" }}>{label}</span>
                    <span style={{ fontSize: 11.5, color: "var(--text-muted)", fontWeight: 600 }}>{tasks.length}</span>
                  </div>
                )}
                {tasks.map((t) => (
                  <div key={t.id} style={{ display: "flex", alignItems: "center", height: rowH, borderTop: "1px solid var(--border)" }}>
                    <div style={{ width: labelW, flexShrink: 0, padding: "0 16px", display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: COLUMN_DOT[t.status], flexShrink: 0 }} />
                      <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.title}</span>
                    </div>
                    <div style={{ position: "relative", flex: 1, height: "100%" }}>
                      {days.map((_, idx) => <div key={idx} style={{ position: "absolute", top: 0, bottom: 0, left: idx * dayW, width: dayW, borderLeft: "1px solid var(--border)", background: isWeekend(idx) ? "var(--bg-app)" : "transparent" }} />)}
                      <Tip task={t} place="bottom" style={{ position: "absolute", top: 9, height: rowH - 18, left: t.start * dayW + 4, width: t.len * dayW - 8 }}>
                        <div onPointerDown={(e) => startMove(e, t)} style={{
                          position: "relative", width: "100%", height: "100%", background: meta.color(f.groupBy === "none" || f.groupBy === "status" ? t.status : f.groupBy === "priority" ? t.priority : t.assignee),
                          borderRadius: 8, cursor: "grab", display: "flex", alignItems: "center", padding: "0 10px",
                          boxShadow: "var(--shadow-xs)", userSelect: "none", touchAction: "none",
                        }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.title}</span>
                          <span onPointerDown={(e) => startResize(e, t)} style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 10, cursor: "ew-resize", borderTopRightRadius: 8, borderBottomRightRadius: 8 }} />
                        </div>
                      </Tip>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
            <div style={{ display: "flex", alignItems: "center", height: rowH, borderTop: "1px solid var(--border)" }}>
              <div style={{ width: labelW, flexShrink: 0, padding: "0 10px" }}>
                <QuickAdd onAdd={(title) => onAdd({ title })} placeholder="Add task" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
