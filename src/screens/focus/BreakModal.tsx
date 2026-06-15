/* Coffee break — a calm full-screen pause with a steaming cup, a counting timer,
   and a quote. "Back to work" hands control back to the caller (which offers the
   next task). */
import React from "react";
import { Button } from "../../components/ds";
import { Icon } from "../../components/Icon";
import { randomQuote } from "../../lib/quotes";

function SteamingCup() {
  return (
    <div style={{ position: "relative", width: 96, height: 96 }}>
      {/* steam */}
      <div style={{ position: "absolute", top: 6, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 8 }}>
        {[0, 1, 2].map((i) => (
          <span key={i} style={{
            width: 5, height: 22, borderRadius: 999, background: "linear-gradient(to top, rgba(148,163,184,0.5), transparent)",
            animation: `steamRise 2.6s ease-in-out ${i * 0.5}s infinite`,
          }} />
        ))}
      </div>
      {/* cup */}
      <div style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: 84, height: 60, animation: "breathe 4s var(--ease-in-out) infinite",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))", borderRadius: "12px 12px 22px 22px", boxShadow: "var(--shadow-primary)" }} />
        <div style={{ position: "absolute", right: -16, top: 12, width: 22, height: 26, border: "5px solid var(--color-accent)", borderLeft: "none", borderRadius: "0 14px 14px 0" }} />
        <Icon name="Sparkles" size={20} color="rgba(255,255,255,0.9)" style={{ position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)" }} />
      </div>
    </div>
  );
}

export function BreakModal({ startedAt, onBackToWork }: { startedAt: Date; onBackToWork: () => void }) {
  const quote = React.useMemo(() => randomQuote(), []);
  const [elapsed, setElapsed] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - startedAt.getTime()) / 1000)), 1000);
    return () => clearInterval(t);
  }, [startedAt]);
  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "linear-gradient(160deg, rgba(238,242,255,0.85), rgba(236,254,255,0.85))",
      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 32,
      animation: "focusOverlayIn var(--dur-base) var(--ease-out)",
    }}>
      <div style={{
        width: "min(560px, 100%)", textAlign: "center",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 22,
        animation: "focusCardIn var(--dur-slow) var(--ease-out)",
      }}>
        <SteamingCup />
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-primary)" }}>Break · {mm}:{ss}</div>
          <h2 style={{ margin: "8px 0 0", fontSize: 34, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text-primary)" }}>Take a coffee.</h2>
        </div>
        <p style={{ margin: 0, maxWidth: 420, fontSize: 17, lineHeight: 1.6, color: "var(--text-secondary)", fontStyle: "italic" }}>
          "{quote.text}"
        </p>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text-muted)" }}>— {quote.author}</div>
        <div style={{ marginTop: 6 }}>
          <Button size="lg" onClick={onBackToWork} leadingIcon={<Icon name="Play" size={18} />}>Back to work</Button>
        </div>
      </div>
    </div>
  );
}
