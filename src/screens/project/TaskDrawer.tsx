/* Task Detail Drawer — click-to-edit, auto-saved, no Save button. */
import React from "react";
import { Avatar, IconButton } from "../../components/ds";
import { Icon } from "../../components/Icon";
import { WORKO_DATA } from "../../data/data";
import { ASSIGNEES, PRIORITY_ORDER, STATUS_ORDER, TODAY, toInputDate, type Task } from "./model";

const drawerSelect: React.CSSProperties = { height: 32, padding: "0 8px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontFamily: "var(--font-sans)", fontSize: 13.5, fontWeight: 600, color: "var(--text-primary)", outline: "none", cursor: "pointer", appearance: "none" };
let checkSeq = 1;

interface ChecklistEntry {
  id: string;
  label: string;
  done: boolean;
}

function ChecklistItem({ item, onToggle, onLabel, onDelete, onDragStart, onDragEnter, onDragEnd, dragging, dropTarget }: {
  item: ChecklistEntry;
  onToggle: () => void;
  onLabel: (label: string) => void;
  onDelete: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnter: () => void;
  onDragEnd: () => void;
  dragging: boolean;
  dropTarget: boolean;
}) {
  const [hover, setHover] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setMenu(false); };
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

export function TaskDrawer({ task, onClose }: { task: Task | null; onClose: () => void }) {
  const d = WORKO_DATA.taskDetail;
  const [subs, setSubs] = React.useState<ChecklistEntry[]>(() => d.subtasks.map((s) => ({ ...s, id: "c" + (checkSeq++) })));
  const [assignee, setAssignee] = React.useState(task?.assignee || d.assignee);
  const [priority, setPriority] = React.useState(task?.priority || d.priority);
  const [status, setStatus] = React.useState(task?.status || d.status);
  const [due, setDue] = React.useState(toInputDate(task?.due || TODAY));
  const drag = React.useRef<{ from: string; to: string } | null>(null);
  const [dragId, setDragId] = React.useState<string | null>(null);
  const [overId, setOverId] = React.useState<string | null>(null);

  const toggle = (id: string) => setSubs((arr) => arr.map((s) => (s.id === id ? { ...s, done: !s.done } : s)));
  const setLabel = (id: string, label: string) => setSubs((arr) => arr.map((s) => (s.id === id ? { ...s, label } : s)));
  const remove = (id: string) => setSubs((arr) => arr.filter((s) => s.id !== id));
  const addItem = (label: string) => setSubs((arr) => [...arr, { id: "c" + (checkSeq++), label, done: false }]);
  const reorder = () => {
    if (!drag.current || drag.current.from === drag.current.to) return;
    const { from, to } = drag.current;
    setSubs((arr) => {
      const next = arr.slice();
      const fromIdx = next.findIndex((s) => s.id === from);
      const toIdx = next.findIndex((s) => s.id === to);
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
            <select value={status} onChange={(e) => setStatus(e.target.value as Task["status"])} style={{ ...drawerSelect, height: 30, fontSize: 12.5, fontWeight: 700, color: "var(--color-primary)", background: "var(--color-primary-light)", border: "1px solid transparent" }}>
              {STATUS_ORDER.map((s) => <option key={s}>{s}</option>)}
            </select>
            <span style={{ fontSize: 12.5, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 5 }}><Icon name="Check" size={14} color="var(--color-success)" />Auto-saved</span>
            <IconButton label="Close" variant="ghost" size="sm" onClick={onClose} style={{ marginLeft: "auto" }}><Icon name="X" size={18} /></IconButton>
          </div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.25, color: "var(--text-primary)" }}>{task?.title || d.title}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", rowGap: 10, columnGap: 16, alignItems: "center", fontSize: 13.5 }}>
            <span style={{ color: "var(--text-muted)" }}>Assignee</span>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Avatar name={assignee} size="xs" />
              <select value={assignee} onChange={(e) => setAssignee(e.target.value)} style={{ ...drawerSelect, flex: 1 }}>
                {ASSIGNEES.map((a) => <option key={a}>{a}</option>)}
              </select>
            </span>
            <span style={{ color: "var(--text-muted)" }}>Priority</span>
            <select value={priority} onChange={(e) => setPriority(e.target.value as Task["priority"])} style={{ ...drawerSelect, width: 140 }}>
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

function ChecklistAdd({ onAdd }: { onAdd: (label: string) => void }) {
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
