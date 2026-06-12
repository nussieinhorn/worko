/* Screen 3 — Project Detail. Overview dashboard + interactive List, Board, Calendar, Timeline.
   Tasks live in ProjectDetail state and are mutated by drag-and-drop, quick-add, and the
   Add-task modal. This file: data model, shared UI (toolbar, dropdowns, tooltip, quick-add,
   modal, drawer), Overview, and the shell. The four task views live in ProjectViews.jsx. */
const { Tabs: DTabs, Badge: DBadge, Avatar: DAvatar, AvatarGroup: DAvatarGroup, ProgressBar: DProgress, Checkbox: DCheckbox, Button: DButton, IconButton: DIconBtn } = window.WORKODesignSystem_3ef60c;

const PRIORITY_TONE = { High: "error", Medium: "warning", Low: "neutral" };
const PRIORITY_COLOR = { High: "#EF4444", Medium: "#F59E0B", Low: "#94A3B8" };
const COLUMN_DOT = { Backlog: "#94A3B8", "To do": "#6366F1", "In progress": "#4F46E5", Review: "#F59E0B", Done: "#10B981" };
const ASSIGNEE_COLOR = { "Maya Chen": "#4F46E5", "Sam Ito": "#06B6D4", "Lee Roy": "#6366F1", "Ana Diaz": "#10B981", "Tom B": "#F59E0B", "Priya N": "#EC4899" };
const STATUS_ORDER = ["Backlog", "To do", "In progress", "Review", "Done"];
const PRIORITY_ORDER = ["High", "Medium", "Low"];
const ASSIGNEES = Object.keys(ASSIGNEE_COLOR);
const MON = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TL_BASE = new Date(2026, 5, 8);  // Mon Jun 8, 2026 — timeline / schedule origin
const TL_DAYS = 14;
const TODAY = new Date(2026, 5, 10);   // Wed Jun 10, 2026
const TODAY_IDX = 2;

const SCHEDULE = {
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

const fmtDate = (d) => `${MON[d.getMonth()]} ${d.getDate()}`;
const sameDay = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const idxToDue = (idx) => { const d = new Date(TL_BASE); d.setDate(d.getDate() + idx); return d; };
const dueToIdx = (due) => Math.max(0, Math.min(TL_DAYS - 1, Math.round((due - TL_BASE) / 86400000)));
const startFromDue = (due, len) => Math.max(0, Math.min(TL_DAYS - len, dueToIdx(due) - (len - 1)));
const toInputDate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const sundayOf = (d) => { const x = new Date(d); x.setDate(x.getDate() - x.getDay()); x.setHours(0, 0, 0, 0); return x; };

/* Seed tasks. Backlog items start unscheduled so the Calendar backlog rail has something to drag in. */
const TASKS = Object.entries(WORKO_DATA.board).flatMap(([status, tasks]) =>
  tasks.map((t, i) => {
    const sc = SCHEDULE[t.title] || { start: 0, len: 2 };
    return { ...t, status, id: status.replace(/\s/g, "") + i, start: sc.start, len: sc.len, due: idxToDue(sc.start + sc.len - 1), scheduled: status !== "Backlog" };
  })
);
const INITIAL_TASKS = TASKS.map((t) => ({ ...t }));
let idSeq = 1;

/* one-time keyframes for modal / popover (works in both host pages) */
if (typeof document !== "undefined" && !document.getElementById("pd-anims")) {
  const st = document.createElement("style");
  st.id = "pd-anims";
  st.textContent = "@keyframes pdPop{from{opacity:0;transform:scale(.96) translateY(8px)}to{opacity:1;transform:none}}@keyframes pdFade{from{opacity:0}to{opacity:1}}";
  document.head.appendChild(st);
}

/* ============================ filter + grouping ============================ */
function useTaskFilter(tasks) {
  const [search, setSearch] = React.useState("");
  const [groupBy, setGroupBy] = React.useState("status");
  const [priority, setPriority] = React.useState("All");
  const [assignee, setAssignee] = React.useState("All");
  const filtered = tasks.filter((t) =>
    (!search || t.title.toLowerCase().includes(search.toLowerCase())) &&
    (priority === "All" || t.priority === priority) &&
    (assignee === "All" || t.assignee === assignee));
  return { search, setSearch, groupBy, setGroupBy, priority, setPriority, assignee, setAssignee, filtered };
}
function groupMeta(groupBy) {
  if (groupBy === "priority") return { order: PRIORITY_ORDER, field: "priority", key: (t) => t.priority, color: (k) => PRIORITY_COLOR[k] };
  if (groupBy === "assignee") return { order: ASSIGNEES, field: "assignee", key: (t) => t.assignee, color: (k) => ASSIGNEE_COLOR[k] };
  return { order: STATUS_ORDER, field: "status", key: (t) => t.status, color: (k) => COLUMN_DOT[k] };
}
function groupTasks(tasks, groupBy, includeEmpty) {
  if (groupBy === "none") return [["All tasks", tasks]];
  const { order, key } = groupMeta(groupBy);
  const map = {}; tasks.forEach((t) => { const k = key(t); (map[k] = map[k] || []).push(t); });
  const base = includeEmpty ? order : order.filter((k) => map[k]);
  const known = base.map((k) => [k, map[k] || []]);
  const extra = Object.keys(map).filter((k) => !order.includes(k)).map((k) => [k, map[k]]);
  return [...known, ...extra];
}

/* ============================ tooltip ============================ */
function TipRow({ icon, avatar, dot, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#E2E8F0" }}>
      {avatar ? <DAvatar name={label} size="xs" /> : dot ? <span style={{ width: 8, height: 8, borderRadius: "50%", background: dot }} /> : <Icon name={icon} size={13} color="#94A3B8" />}
      <span style={{ fontWeight: 500 }}>{label}</span>
    </div>
  );
}
function Tip({ task, place = "top", style, children }) {
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
function QuickAdd({ onAdd, placeholder = "Add task", style }) {
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
function MiniInput({ onSubmit, onClose, placeholder = "Task name…" }) {
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
function Dropdown({ icon, label, value, valueLabel, options, onChange, accent }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
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

function Toolbar({ f, count, showGroup = true, onAdd }) {
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
          onChange={f.setGroupBy} options={[
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

const EmptyState = ({ label }) => (
  <div style={{ padding: "60px 20px", textAlign: "center", background: "var(--surface)", border: "1px dashed var(--border-strong)", borderRadius: "var(--radius-card)", color: "var(--text-muted)" }}>
    <Icon name="SearchX" size={24} color="var(--text-muted)" style={{ margin: "0 auto 10px" }} />
    <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text-secondary)" }}>No tasks match</div>
    <div style={{ fontSize: 13, marginTop: 2 }}>{label}</div>
  </div>
);

/* ============================ Add-task modal ============================ */
function Field({ label, children }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--text-muted)" }}>{label}</span>
      {children}
    </label>
  );
}
const selectStyle = { height: 38, padding: "0 11px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-button)", fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--text-primary)", outline: "none", appearance: "none", cursor: "pointer" };

function AddTaskModal({ preset, onClose, onCreate }) {
  const [title, setTitle] = React.useState("");
  const [status, setStatus] = React.useState(preset.status || "To do");
  const [priority, setPriority] = React.useState(preset.priority || "Medium");
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
          <DIconBtn label="Close" variant="ghost" size="sm" onClick={onClose} style={{ marginLeft: "auto" }}><Icon name="X" size={18} /></DIconBtn>
        </div>
        <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 16 }}>
          <Field label="Task name">
            <input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What needs to get done?"
              onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
              style={{ height: 42, padding: "0 13px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-button)", fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 500, color: "var(--text-primary)", outline: "none" }} />
          </Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Field label="Status"><select value={status} onChange={(e) => setStatus(e.target.value)} style={selectStyle}>{STATUS_ORDER.map((s) => <option key={s}>{s}</option>)}</select></Field>
            <Field label="Priority"><select value={priority} onChange={(e) => setPriority(e.target.value)} style={selectStyle}>{PRIORITY_ORDER.map((s) => <option key={s}>{s}</option>)}</select></Field>
            <Field label="Assignee"><select value={assignee} onChange={(e) => setAssignee(e.target.value)} style={selectStyle}>{ASSIGNEES.map((s) => <option key={s}>{s}</option>)}</select></Field>
            <Field label="Due date"><input type="date" value={due} onChange={(e) => setDue(e.target.value)} style={selectStyle} /></Field>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, padding: "16px 22px", borderTop: "1px solid var(--border)", background: "var(--bg-app)" }}>
          <DButton variant="ghost" onClick={onClose}>Cancel</DButton>
          <DButton variant="primary" onClick={submit} leadingIcon={<Icon name="Plus" size={16} color="#fff" />}>Create task</DButton>
        </div>
      </div>
    </div>
  );
}

/* ============================ Task drawer ============================ */
const drawerSelect = { height: 32, padding: "0 8px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontFamily: "var(--font-sans)", fontSize: 13.5, fontWeight: 600, color: "var(--text-primary)", outline: "none", cursor: "pointer", appearance: "none" };
let checkSeq = 1;

function ChecklistItem({ item, onToggle, onLabel, onDelete, onDragStart, onDragEnter, onDragEnd, dragging, dropTarget }) {
  const [hover, setHover] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setMenu(false); };
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div onDragEnter={onDragEnter} onDragOver={(e) => e.preventDefault()}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setMenu(false); }}
      style={{
        display: "flex", alignItems: "center", gap: 8, padding: "4px 4px", borderRadius: 8, position: "relative",
        background: hover ? "var(--bg-app)" : "transparent", opacity: dragging ? 0.4 : 1,
        borderTop: dropTarget ? "2px solid var(--color-primary)" : "2px solid transparent",
        transition: "background var(--dur-fast) var(--ease-out)",
      }}>
      <span draggable onDragStart={onDragStart} onDragEnd={onDragEnd} title="Drag to reorder" style={{
        display: "flex", cursor: "grab", color: "var(--text-muted)", opacity: hover ? 1 : 0, transition: "opacity var(--dur-fast) var(--ease-out)", flexShrink: 0,
      }}><Icon name="GripVertical" size={15} /></span>
      <span onClick={onToggle} style={{
        width: 19, height: 19, borderRadius: "50%", flexShrink: 0, cursor: "pointer",
        border: item.done ? "none" : "2px solid var(--border-strong)", background: item.done ? "var(--color-success)" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>{item.done && <Icon name="Check" size={12} color="#fff" />}</span>
      {editing ? (
        <input autoFocus defaultValue={item.label} onBlur={(e) => { onLabel(e.target.value.trim() || item.label); setEditing(false); }}
          onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur(); if (e.key === "Escape") setEditing(false); }}
          style={{ flex: 1, padding: "3px 6px", fontSize: 13.5, fontFamily: "var(--font-sans)", border: "1px solid var(--color-primary)", borderRadius: 6, outline: "none", color: "var(--text-primary)" }} />
      ) : (
        <span onClick={() => setEditing(true)} style={{
          flex: 1, fontSize: 13.5, lineHeight: 1.4, cursor: "text",
          color: item.done ? "var(--text-muted)" : "var(--text-primary)", textDecoration: item.done ? "line-through" : "none",
        }}>{item.label}</span>
      )}
      <button onClick={() => setMenu((m) => !m)} style={{
        display: "flex", border: "none", background: "transparent", cursor: "pointer", color: "var(--text-muted)", padding: 3,
        borderRadius: 6, opacity: hover ? 1 : 0, transition: "opacity var(--dur-fast) var(--ease-out)", flexShrink: 0,
      }}><Icon name="MoreHorizontal" size={16} /></button>
      {menu && (
        <div ref={ref} style={{ position: "absolute", right: 4, top: "calc(100% - 2px)", zIndex: 10, minWidth: 134, padding: 5, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, boxShadow: "var(--shadow-lg)" }}>
          <button onClick={() => { setEditing(true); setMenu(false); }} style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", textAlign: "left", padding: "7px 9px", border: "none", borderRadius: 7, cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500, color: "var(--text-primary)", background: "transparent" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-app)")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
            <Icon name="Pencil" size={14} color="var(--text-muted)" />Rename
          </button>
          <button onClick={() => { onDelete(); setMenu(false); }} style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", textAlign: "left", padding: "7px 9px", border: "none", borderRadius: 7, cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500, color: "var(--color-error, #DC2626)", background: "transparent" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-app)")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
            <Icon name="Trash2" size={14} color="var(--color-error, #DC2626)" />Delete
          </button>
        </div>
      )}
    </div>
  );
}

function TaskDrawer({ task, onClose }) {
  const d = WORKO_DATA.taskDetail;
  const [subs, setSubs] = React.useState(() => d.subtasks.map((s) => ({ ...s, id: "c" + (checkSeq++) })));
  const [assignee, setAssignee] = React.useState(task?.assignee || d.assignee);
  const [priority, setPriority] = React.useState(task?.priority || d.priority);
  const [status, setStatus] = React.useState(task?.status || d.status);
  const [due, setDue] = React.useState(toInputDate(task?.due || TODAY));
  const drag = React.useRef(null);
  const [dragId, setDragId] = React.useState(null);
  const [overId, setOverId] = React.useState(null);

  const toggle = (id) => setSubs((arr) => arr.map((s) => (s.id === id ? { ...s, done: !s.done } : s)));
  const setLabel = (id, label) => setSubs((arr) => arr.map((s) => (s.id === id ? { ...s, label } : s)));
  const remove = (id) => setSubs((arr) => arr.filter((s) => s.id !== id));
  const addItem = (label) => setSubs((arr) => [...arr, { id: "c" + (checkSeq++), label, done: false }]);
  const reorder = () => {
    if (!drag.current || drag.current.from === drag.current.to) return;
    setSubs((arr) => {
      const next = arr.slice();
      const fromIdx = next.findIndex((s) => s.id === drag.current.from);
      const toIdx = next.findIndex((s) => s.id === drag.current.to);
      if (fromIdx < 0 || toIdx < 0) return arr;
      const [moved] = next.splice(fromIdx, 1);
      next.splice(toIdx, 0, moved);
      return next;
    });
  };
  const doneCount = subs.filter((s) => s.done).length;

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 30, display: "flex", justifyContent: "flex-end" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(15,23,42,0.28)", backdropFilter: "blur(1px)" }} />
      <div style={{ position: "relative", width: 440, height: "100%", background: "var(--surface)", boxShadow: "var(--shadow-xl)", overflow: "auto", animation: "drawerIn var(--dur-slow) var(--ease-out)" }}>
        <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ ...drawerSelect, height: 30, fontSize: 12.5, fontWeight: 700, color: "var(--color-primary)", background: "var(--color-primary-light)", border: "1px solid transparent" }}>
              {STATUS_ORDER.map((s) => <option key={s}>{s}</option>)}
            </select>
            <span style={{ fontSize: 12.5, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 5 }}><Icon name="Check" size={14} color="var(--color-success)" />Auto-saved</span>
            <DIconBtn label="Close" variant="ghost" size="sm" onClick={onClose} style={{ marginLeft: "auto" }}><Icon name="X" size={18} /></DIconBtn>
          </div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.25, color: "var(--text-primary)" }}>{task?.title || d.title}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", rowGap: 10, columnGap: 16, alignItems: "center", fontSize: 13.5 }}>
            <span style={{ color: "var(--text-muted)" }}>Assignee</span>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <DAvatar name={assignee} size="xs" />
              <select value={assignee} onChange={(e) => setAssignee(e.target.value)} style={{ ...drawerSelect, flex: 1 }}>
                {ASSIGNEES.map((a) => <option key={a}>{a}</option>)}
              </select>
            </span>
            <span style={{ color: "var(--text-muted)" }}>Priority</span>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ ...drawerSelect, width: 140 }}>
              {PRIORITY_ORDER.map((p) => <option key={p}>{p}</option>)}
            </select>
            <span style={{ color: "var(--text-muted)" }}>Due</span>
            <input type="date" value={due} onChange={(e) => setDue(e.target.value)} style={{ ...drawerSelect, width: 160 }} />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--text-muted)", marginBottom: 7 }}>Description</div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--text-secondary)" }}>{d.description}</p>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--text-muted)" }}>Checklist · {doneCount}/{subs.length}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }} onDrop={(e) => { e.preventDefault(); reorder(); setDragId(null); setOverId(null); drag.current = null; }} onDragOver={(e) => e.preventDefault()}>
              {subs.map((s) => (
                <ChecklistItem key={s.id} item={s}
                  dragging={dragId === s.id} dropTarget={overId === s.id && dragId !== s.id}
                  onToggle={() => toggle(s.id)} onLabel={(v) => setLabel(s.id, v)} onDelete={() => remove(s.id)}
                  onDragStart={(e) => { e.dataTransfer.effectAllowed = "move"; drag.current = { from: s.id, to: s.id }; setDragId(s.id); }}
                  onDragEnter={() => { if (drag.current) { drag.current.to = s.id; setOverId(s.id); } }}
                  onDragEnd={() => { setDragId(null); setOverId(null); drag.current = null; }} />
              ))}
            </div>
            <ChecklistAdd onAdd={addItem} />
          </div>
          <div style={{ background: "var(--bg-app)", borderRadius: "var(--radius-card)", padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <Icon name="Sparkles" size={16} color="var(--color-accent)" />
              <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--text-primary)" }}>WORKO assistant</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {d.aiSteps.map((s, i) => (
                <button key={i} style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", textAlign: "left", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 12px", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 13.5, fontWeight: 500, color: "var(--text-primary)" }}>
                  <Icon name="Wand2" size={15} color="var(--color-primary)" />{s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChecklistAdd({ onAdd }) {
  const [open, setOpen] = React.useState(false);
  const [v, setV] = React.useState("");
  if (!open) return (
    <button onClick={() => setOpen(true)} style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 6, padding: "5px 4px", border: "none", background: "transparent", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "var(--text-muted)" }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-secondary)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}>
      <Icon name="Plus" size={15} />Add checklist item
    </button>
  );
  return (
    <input autoFocus value={v} placeholder="Checklist item, then Enter" onChange={(e) => setV(e.target.value)}
      onKeyDown={(e) => { if (e.key === "Enter" && v.trim()) { onAdd(v.trim()); setV(""); } if (e.key === "Escape") { setOpen(false); setV(""); } }}
      onBlur={() => { if (!v.trim()) setOpen(false); }}
      style={{ width: "100%", marginTop: 8, height: 34, padding: "0 11px", background: "var(--surface)", border: "1px solid var(--color-primary)", borderRadius: 9, fontFamily: "var(--font-sans)", fontSize: 13.5, color: "var(--text-primary)", outline: "none" }} />
  );
}

/* ============================ Overview dashboard ============================ */
function StatTile({ icon, tint, value, label, sub }) {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-sm)", padding: 18 }}>
      <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 10, background: tint + "1f", marginBottom: 12 }}>
        <Icon name={icon} size={19} color={tint} />
      </span>
      <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text-primary)", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", marginTop: 5 }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}
function Panel({ title, action, children }) {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-sm)", padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <span style={{ fontSize: 14.5, fontWeight: 700, color: "var(--text-primary)" }}>{title}</span>
        {action && <span style={{ marginLeft: "auto", fontSize: 12.5, fontWeight: 600, color: "var(--color-primary)", cursor: "pointer" }}>{action}</span>}
      </div>
      {children}
    </div>
  );
}
function OverviewView({ p, tasks, onOpenTask }) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "Done").length;
  const inProg = tasks.filter((t) => t.status === "In progress").length;
  const weekEnd = new Date(TL_BASE); weekEnd.setDate(weekEnd.getDate() + 6);
  const dueWeek = tasks.filter((t) => t.status !== "Done" && t.due <= weekEnd).length;
  const statusCounts = STATUS_ORDER.map((s) => ({ s, n: tasks.filter((t) => t.status === s).length }));
  const workload = ASSIGNEES.map((a) => ({ a, n: tasks.filter((t) => t.assignee === a).length })).filter((w) => w.n > 0).sort((x, y) => y.n - x.n);
  const maxLoad = Math.max(1, ...workload.map((w) => w.n));
  const upcoming = tasks.filter((t) => t.status !== "Done").sort((a, b) => a.due - b.due).slice(0, 5);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 14 }}>
        <div style={{ background: "linear-gradient(135deg, var(--color-primary), #6366F1)", borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-sm)", padding: 18, color: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, opacity: 0.9 }}><Icon name="Target" size={16} color="#fff" />Project progress</div>
          <div>
            <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>{p.progress}%</div>
            <div style={{ height: 7, borderRadius: 999, background: "rgba(255,255,255,0.28)", marginTop: 12, overflow: "hidden" }}><div style={{ width: `${p.progress}%`, height: "100%", background: "#fff", borderRadius: 999 }} /></div>
            <div style={{ fontSize: 12.5, opacity: 0.92, marginTop: 9 }}>{done} of {total} tasks complete</div>
          </div>
        </div>
        <StatTile icon="ListTodo" tint="#4F46E5" value={total} label="Total tasks" sub={`${total - done} still open`} />
        <StatTile icon="Loader" tint="#06B6D4" value={inProg} label="In progress" sub="Active right now" />
        <StatTile icon="CalendarClock" tint="#F59E0B" value={dueWeek} label="Due this week" sub="Through Jun 14" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <Panel title="Tasks by status" action="View board">
          <div style={{ display: "flex", height: 12, borderRadius: 999, overflow: "hidden", marginBottom: 16 }}>
            {statusCounts.filter((x) => x.n).map((x) => <div key={x.s} style={{ flex: x.n, background: COLUMN_DOT[x.s] }} title={`${x.s}: ${x.n}`} />)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 18px" }}>
            {statusCounts.map((x) => (
              <div key={x.s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: COLUMN_DOT[x.s] }} />
                <span style={{ fontSize: 13, color: "var(--text-secondary)", flex: 1 }}>{x.s}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{x.n}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Workload by assignee">
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            {workload.map((w) => (
              <div key={w.a} style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <DAvatar name={w.a} size="xs" />
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", width: 96, flexShrink: 0 }}>{w.a}</span>
                <div style={{ flex: 1, height: 8, borderRadius: 999, background: "var(--bg-app)", overflow: "hidden" }}><div style={{ width: `${(w.n / maxLoad) * 100}%`, height: "100%", borderRadius: 999, background: ASSIGNEE_COLOR[w.a] }} /></div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", width: 16, textAlign: "right" }}>{w.n}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <Panel title="Upcoming deadlines">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {upcoming.map((t, i) => (
              <div key={t.id} onClick={() => onOpenTask(t)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", cursor: "pointer", borderTop: i ? "1px solid var(--border)" : "none" }}>
                <span style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 10, background: "var(--bg-app)", flexShrink: 0 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)", lineHeight: 1 }}>{MON[t.due.getMonth()]}</span>
                  <span style={{ fontSize: 17, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1 }}>{t.due.getDate()}</span>
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.title}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3, fontSize: 12, color: "var(--text-muted)" }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: COLUMN_DOT[t.status] }} />{t.status}</div>
                </span>
                <DBadge tone={PRIORITY_TONE[t.priority]}>{t.priority}</DBadge>
                <DAvatar name={t.assignee} size="xs" />
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Recent activity">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {WORKO_DATA.taskDetail.activity.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 11, padding: "11px 0", borderTop: i ? "1px solid var(--border)" : "none" }}>
                <DAvatar name={a.who} size="xs" />
                <div style={{ fontSize: 13, lineHeight: 1.45, color: "var(--text-secondary)" }}>
                  <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>{a.who}</strong> {a.what}
                  <div style={{ fontSize: 11.5, color: "var(--text-muted)", marginTop: 1 }}>{a.when}</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* ============================ shell ============================ */
function ProjectDetail({ project, onBack, initialView }) {
  const p = project || WORKO_DATA.projects[0];
  const [view, setView] = React.useState(initialView || "overview");
  const [tasks, setTasks] = React.useState(INITIAL_TASKS);
  const [openTask, setOpenTask] = React.useState(null);
  const [completed, setCompleted] = React.useState({});
  const [modal, setModal] = React.useState(null);
  const toggleDone = (id) => setCompleted((c) => ({ ...c, [id]: !c[id] }));
  const f = useTaskFilter(tasks);

  const addTask = (partial) => {
    const due = partial.due ? new Date(partial.due) : new Date(TODAY);
    const len = partial.len || 2;
    setTasks((ts) => [...ts, {
      id: "t" + (idSeq++), title: partial.title || "Untitled task", status: partial.status || "To do",
      priority: partial.priority || "Medium", assignee: partial.assignee || WORKO_DATA.user.name, ai: false,
      len, start: startFromDue(due, len), due, scheduled: partial.scheduled !== false,
    }]);
  };
  const updateTask = (id, patch) => setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  const applyGroup = (id, value) => updateTask(id, { [groupMeta(f.groupBy).field]: value });
  const schedule = (id, due) => setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, due, start: startFromDue(due, t.len), scheduled: true } : t)));
  const reschedule = (id, start) => setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, start, due: idxToDue(start + t.len - 1) } : t)));
  const resize = (id, len) => setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, len, due: idxToDue(t.start + len - 1) } : t)));

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
          <DAvatarGroup users={p.members.map((name) => ({ name }))} max={4} size="sm" />
          <DButton variant="secondary" leadingIcon={<Icon name="Plus" size={17} />} onClick={() => setModal({})}>Add task</DButton>
        </div>
        <DTabs value={view} onChange={setView} items={[
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

window.ProjectDetail = ProjectDetail;
window.TaskDrawer = TaskDrawer;
