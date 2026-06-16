/* Confirmation shown when a multi-line paste is detected on a task input.
   Previews the detected titles and creates them as separate tasks on confirm. */
import { Button, IconButton } from "../../components/ds";
import { Icon } from "../../components/Icon";

export function BulkPasteModal({ titles, onConfirm, onCancel }: {
  titles: string[];
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div onClick={onCancel} style={{ position: "absolute", inset: 0, background: "rgba(15,23,42,0.4)", backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)", animation: "focusOverlayIn var(--dur-fast) var(--ease-out)" }} />
      <div style={{
        position: "relative", width: 460, maxWidth: "100%", background: "var(--surface)", borderRadius: "var(--radius-modal)",
        boxShadow: "var(--shadow-xl)", overflow: "hidden", animation: "focusCardIn var(--dur-base) var(--ease-out)",
        display: "flex", flexDirection: "column", maxHeight: "80vh",
      }}>
        <div style={{ display: "flex", alignItems: "center", padding: "18px 22px", borderBottom: "1px solid var(--border)" }}>
          <span style={{ width: 34, height: 34, borderRadius: 10, background: "var(--color-primary-light)", display: "flex", alignItems: "center", justifyContent: "center", marginRight: 11 }}>
            <Icon name="ListTodo" size={18} color="var(--color-primary)" />
          </span>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>We detected {titles.length} tasks</div>
            <div style={{ fontSize: 12.5, color: "var(--text-muted)", marginTop: 1 }}>Create them as separate tasks?</div>
          </div>
          <IconButton label="Cancel" variant="ghost" size="sm" onClick={onCancel} style={{ marginLeft: "auto" }}><Icon name="X" size={18} /></IconButton>
        </div>

        <div style={{ flex: 1, minHeight: 0, overflow: "auto", padding: "12px 22px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {titles.map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: "var(--bg-app)", borderRadius: 9 }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: "var(--text-muted)", width: 18, flexShrink: 0, textAlign: "right" }}>{i + 1}</span>
                <span style={{ fontSize: 13.5, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, padding: "16px 22px", borderTop: "1px solid var(--border)", background: "var(--bg-app)" }}>
          <Button variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button variant="primary" onClick={onConfirm} leadingIcon={<Icon name="Plus" size={16} color="#fff" />}>Create {titles.length} tasks</Button>
        </div>
      </div>
    </div>
  );
}
