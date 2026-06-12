/* Project Detail — shared UI: tooltip, quick-add inputs, toolbar, empty state, Add-task modal. */
import React from "react";
import { Avatar, Button, IconButton } from "../../components/ds";
import { Icon, type IconName } from "../../components/Icon";
import { WORKO_DATA } from "../../data/data";
import {
  ASSIGNEES, ASSIGNEE_COLOR, COLUMN_DOT, PRIORITY_COLOR, PRIORITY_ORDER, STATUS_ORDER, TODAY,
  fmtDate, toInputDate,
  type Task, type TaskFilter,
} from "./model";

/* ============================ tooltip ============================ */
function TipRow({ icon, avatar, dot, label }: { icon?: IconName; avatar?: boolean; dot?: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#E2E8F0" }}>
      {avatar ? <Avatar name={label} size="xs" /> : dot ? <span style={{ width: 8, height: 8, borderRadius: "50%", background: dot }} /> : icon ? <Icon name={icon} size={13} color="#94A3B8" /> : null}
      <span style={{ fontWeight: 500 }}>{label}</span>
    </div>
  );
}

export function Tip({ task, place = "top", style, children }: { task?: Task; place?: "top" | "bottom"; style?: React.CSSProperties; children: React.ReactNode }) {
  const [show, setShow] = React.useState(false);
  const above = place !== "bottom";
  return (
    <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} style={{ position: "relative", ...style }}>
      {children}
      {show && task && (
        <div style={{
          position: "absolute", left: "50%", transform: "translateX(-50%)", [above ? "bottom" : "top"]: "calc(100% + 8px)",
          zIndex: 60, width: 210, padding: "11px 13px", background: "#0F172A", borderRadius: 11,
          boxShadow: "0 10px 30px rgba(2,6,23,0.45)", pointerEvents: "none",
        }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: "#fff", lineHeight: 1.35, marginBottom: 9 }}>{task.title}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            <TipRow avatar label={task.assignee} />
            <TipRow icon="Calendar" label={`Due ${fmtDate(task.due)}`} />
            <TipRow dot={PRIORITY_COLOR[task.priority]} label={`${task.priority} priority`} />
            <TipRow dot={COLUMN_DOT[task.status]} label={task.status} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================ inline inputs ============================ */
export function QuickAdd({ onAdd, placeholder = "Add task", style }: { onAdd: (title: string) => void; placeholder?: string; style?: React.CSSProperties }) {
  const [open, setOpen] = React.useState(false);
  const [v, setV] = React.useState("");
  if (!open) return (
    <button onClick={() => setOpen(true)} style={{
      display: "flex", alignItems: "center", gap: 7, width: "100%", padding: "8px 10px", border: "none",
      background: "transparent", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600,
      color: "var(--text-muted)", borderRadius: 9, ...style,
    }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-app)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-muted)"; }}>
      <Icon name="Plus" size={15} />{placeholder}
    </button>
  );
  return (
    <input autoFocus value={v} placeholder="Task name, then Enter" onChange={(e) => setV(e.target.value)}
      onKeyDown={(e) => { if (e.key === "Enter" && v.trim()) { onAdd(v.trim()); setV(""); } if (e.key === "Escape") { setOpen(false); setV(""); } }}
      onBlur={() => { if (!v.trim()) setOpen(false); }}
      style={{ width: "100%", height: 34, padding: "0 11px", background: "var(--surface)", border: "1px solid var(--color-primary)", borderRadius: 9, fontFamily: "var(--font-sans)", fontSize: 13.5, color: "var(--text-primary)", outline: "none", ...style }} />
  );
}

export function MiniInput({ onSubmit, onClose, placeholder = "Task name…" }: { onSubmit: (title: string) => void; onClose: () => void; placeholder?: string }) {
  const [v, setV] = React.useState("");
  return (
    <input autoFocus value={v} placeholder={placeholder} onClick={(e) => e.stopPropagation()}
      onChange={(e) => setV(e.target.value)}
      onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter" && v.trim()) { onSubmit(v.trim()); setV(""); } if (e.key === "Escape") onClose(); }}
      onBlur={() => { if (!v.trim()) onClose(); }}
      style={{ width: "100%", marginTop: 4, padding: "5px 7px", fontSize: 11.5, fontFamily: "var(--font-sans)", border: "1px solid var(--color-primary)", borderRadius: 6, outline: "none", color: "var(--text-primary)" }} />
  );
}

/* ============================ toolbar ============================ */
interface DropdownOption {
  value: string;
  label: string;
  dot?: string;
}

function Dropdown({ icon, label, value, valueLabel, options, onChange, accent }: {
  icon: IconName;
  label: string;
  value: string;
  valueLabel: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  accent?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, []);
  const active = accent && value !== options[0].value;
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen((o) => !o)} style={{
        display: "flex", alignItems: "center", gap: 7, height: 34, padding: "0 11px",
        background: active ? "var(--indigo-50, #EEF2FF)" : "var(--surface)",
        border: `1px solid ${active ? "var(--color-primary)" : "var(--border)"}`,
        borderRadius: "var(--radius-button)", cursor: "pointer", fontFamily: "var(--font-sans)",
        fontSize: 13, fontWeight: 600, color: active ? "var(--color-primary)" : "var(--text-secondary)",
      }}>
        <Icon name={icon} size={15} color={active ? "var(--color-primary)" : "var(--text-muted)"} />
        <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>{label}</span>
        <span style={{ color: active ? "var(--color-primary)" : "var(--text-primary)" }}>{valueLabel}</span>
        <Icon name="ChevronDown" size={14} color="var(--text-muted)" />
      </button>
      {open && (
        <div style={{ position: "absolute", top: 40, left: 0, zIndex: 40, minWidth: 180, padding: 6, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, boxShadow: "var(--shadow-lg)" }}>
          {options.map((o) => (
            <button key={o.value} onClick={() => { onChange(o.value); setOpen(false); }} style={{
              display: "flex", alignItems: "center", gap: 9, width: "100%", textAlign: "left", padding: "8px 10px",
              border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 13.5, fontWeight: 500,
              color: "var(--text-primary)", background: o.value === value ? "var(--bg-app)" : "transparent",
            }}
              onMouseEnter={(e) => { if (o.value !== value) e.currentTarget.style.background = "var(--bg-app)"; }}
              onMouseLeave={(e) => { if (o.value !== value) e.currentTarget.style.background = "transparent"; }}>
              {o.dot && <span style={{ width: 8, height: 8, borderRadius: "50%", background: o.dot }} />}
              <span style={{ flex: 1 }}>{o.label}</span>
              {o.value === value && <Icon name="Check" size={15} color="var(--color-primary)" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Toolbar({ f, count, showGroup = true, onAdd }: { f: TaskFilter; count: number; showGroup?: boolean; onAdd: () => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
      <div style={{ position: "relative", width: 232 }}>
        <Icon name="Search" size={15} color="var(--text-muted)" style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }} />
        <input value={f.search} onChange={(e) => f.setSearch(e.target.value)} placeholder="Search tasks…" style={{
          width: "100%", height: 34, padding: "0 11px 0 33px", background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: "var(--radius-button)", fontFamily: "var(--font-sans)", fontSize: 13.5, color: "var(--text-primary)", outline: "none",
        }} />
      </div>
      {showGroup && (
        <Dropdown icon="Group" label="Group:" value={f.groupBy} accent
          valueLabel={{ status: "Status", priority: "Priority", assignee: "Assignee", none: "None" }[f.groupBy]}
          onChange={(v) => f.setGroupBy(v as TaskFilter["groupBy"])} options={[
            { value: "status", label: "Status" }, { value: "priority", label: "Priority" },
            { value: "assignee", label: "Assignee" }, { value: "none", label: "None" },
          ]} />
      )}
      <Dropdown icon="Flag" label="Priority:" value={f.priority} accent valueLabel={f.priority}
        onChange={f.setPriority} options={[{ value: "All", label: "All priorities" }, ...PRIORITY_ORDER.map((p) => ({ value: p, label: p, dot: PRIORITY_COLOR[p] }))]} />
      <Dropdown icon="User" label="Assignee:" value={f.assignee} accent valueLabel={f.assignee === "All" ? "All" : f.assignee.split(" ")[0]}
        onChange={f.setAssignee} options={[{ value: "All", label: "Everyone" }, ...ASSIGNEES.map((a) => ({ value: a, label: a, dot: ASSIGNEE_COLOR[a] }))]} />
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text-muted)" }}>{count} task{count === 1 ? "" : "s"}</span>
        <button onClick={onAdd} style={{ display: "flex", alignItems: "center", gap: 6, height: 34, padding: "0 13px", border: "none", background: "var(--color-primary)", color: "#fff", borderRadius: "var(--radius-button)", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600 }}>
          <Icon name="Plus" size={16} color="#fff" />Add task
        </button>
      </div>
    </div>
  );
}

export const EmptyState = ({ label }: { label: string }) => (
  <div style={{ padding: "60px 20px", textAlign: "center", background: "var(--surface)", border: "1px dashed var(--border-strong)", borderRadius: "var(--radius-card)", color: "var(--text-muted)" }}>
    <Icon name="SearchX" size={24} color="var(--text-muted)" style={{ margin: "0 auto 10px" }} />
    <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text-secondary)" }}>No tasks match</div>
    <div style={{ fontSize: 13, marginTop: 2 }}>{label}</div>
  </div>
);

/* ============================ Add-task modal ============================ */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--text-muted)" }}>{label}</span>
      {children}
    </label>
  );
}

const selectStyle: React.CSSProperties = { height: 38, padding: "0 11px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-button)", fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--text-primary)", outline: "none", appearance: "none", cursor: "pointer" };

export interface AddTaskPreset {
  status?: Task["status"];
  priority?: Task["priority"];
  assignee?: string;
  due?: Date;
}

export interface AddTaskForm {
  title: string;
  status: Task["status"];
  priority: Task["priority"];
  assignee: string;
  due: Date;
}

export function AddTaskModal({ preset, onClose, onCreate }: { preset: AddTaskPreset; onClose: () => void; onCreate: (form: AddTaskForm) => void }) {
  const [title, setTitle] = React.useState("");
  const [status, setStatus] = React.useState<Task["status"]>(preset.status || "To do");
  const [priority, setPriority] = React.useState<Task["priority"]>(preset.priority || "Medium");
  const [assignee, setAssignee] = React.useState(preset.assignee || WORKO_DATA.user.name);
  const [due, setDue] = React.useState(toInputDate(preset.due || TODAY));
  const submit = () => { if (title.trim()) onCreate({ title: title.trim(), status, priority, assignee, due: new Date(due + "T00:00:00") }); };
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(15,23,42,0.4)", backdropFilter: "blur(2px)", animation: "pdFade var(--dur-fast) var(--ease-out)" }} />
      <div style={{ position: "relative", width: 468, maxWidth: "100%", background: "var(--surface)", borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-xl)", animation: "pdPop var(--dur-base) var(--ease-out)", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", padding: "18px 22px", borderBottom: "1px solid var(--border)" }}>
          <Icon name="SquarePen" size={18} color="var(--color-primary)" />
          <span style={{ marginLeft: 10, fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>New task</span>
          <IconButton label="Close" variant="ghost" size="sm" onClick={onClose} style={{ marginLeft: "auto" }}><Icon name="X" size={18} /></IconButton>
        </div>
        <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 16 }}>
          <Field label="Task name">
            <input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What needs to get done?"
              onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
              style={{ height: 42, padding: "0 13px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-button)", fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 500, color: "var(--text-primary)", outline: "none" }} />
          </Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Field label="Status"><select value={status} onChange={(e) => setStatus(e.target.value as Task["status"])} style={selectStyle}>{STATUS_ORDER.map((s) => <option key={s}>{s}</option>)}</select></Field>
            <Field label="Priority"><select value={priority} onChange={(e) => setPriority(e.target.value as Task["priority"])} style={selectStyle}>{PRIORITY_ORDER.map((s) => <option key={s}>{s}</option>)}</select></Field>
            <Field label="Assignee"><select value={assignee} onChange={(e) => setAssignee(e.target.value)} style={selectStyle}>{ASSIGNEES.map((s) => <option key={s}>{s}</option>)}</select></Field>
            <Field label="Due date"><input type="date" value={due} onChange={(e) => setDue(e.target.value)} style={selectStyle} /></Field>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, padding: "16px 22px", borderTop: "1px solid var(--border)", background: "var(--bg-app)" }}>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={submit} leadingIcon={<Icon name="Plus" size={16} color="#fff" />}>Create task</Button>
        </div>
      </div>
    </div>
  );
}
