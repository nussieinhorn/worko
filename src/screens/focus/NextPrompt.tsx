/* "Ready for the next one?" — shown after a sprint completes or a break ends.
   Offers the next task in the queue, or a calm close if the queue is clear. */
import { Button } from "../../components/ds";
import { Icon } from "../../components/Icon";
import type { Task } from "../project/model";

export function NextPrompt({ title, next, projectName, onStart, onDismiss }: {
  title: string;
  next: Task | null;
  projectName?: string;
  onStart: () => void;
  onDismiss: () => void;
}) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1100,
      background: "rgba(15,23,42,0.32)", backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
      animation: "focusOverlayIn var(--dur-fast) var(--ease-out)",
    }}>
      <div style={{
        width: "min(440px, 100%)", background: "var(--surface)", borderRadius: "var(--radius-modal)",
        boxShadow: "var(--shadow-xl)", padding: 28, textAlign: "center",
        animation: "focusCardIn var(--dur-base) var(--ease-out)",
      }}>
        <span style={{
          width: 48, height: 48, borderRadius: 14, margin: "0 auto 14px",
          background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon name="Sparkles" size={22} color="#fff" />
        </span>
        <h2 style={{ margin: 0, fontSize: 21, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>{title}</h2>

        {next ? (
          <>
            <p style={{ margin: "8px 0 18px", fontSize: 14.5, color: "var(--text-secondary)", lineHeight: 1.5 }}>
              Ready for the next one? Up now:
            </p>
            <div style={{ background: "var(--bg-app)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)", padding: "14px 16px", textAlign: "left", marginBottom: 20 }}>
              {projectName && <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>{projectName}</div>}
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>{next.title}</div>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <Button variant="ghost" onClick={onDismiss}>Not now</Button>
              <Button onClick={onStart} leadingIcon={<Icon name="Play" size={17} />}>Start focus</Button>
            </div>
          </>
        ) : (
          <>
            <p style={{ margin: "8px 0 20px", fontSize: 14.5, color: "var(--text-secondary)", lineHeight: 1.5 }}>
              Nothing left in the queue. Enjoy the momentum.
            </p>
            <Button onClick={onDismiss} fullWidth>Done</Button>
          </>
        )}
      </div>
    </div>
  );
}
