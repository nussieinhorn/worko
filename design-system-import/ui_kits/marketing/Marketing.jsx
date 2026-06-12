/* WORKO marketing landing — sections. Composes DS components. */
const { Button: MBtn, Badge: MBadge } = window.WORKODesignSystem_3ef60c;

function MarketingNav() {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 10, display: "flex", alignItems: "center", gap: 28,
      padding: "16px 40px", background: "rgba(248,250,252,0.8)", backdropFilter: "blur(10px)",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <img src="../../assets/worko-mark.svg" width="30" height="30" alt="" />
        <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: "-0.02em" }}>WORKO</span>
      </div>
      <nav style={{ display: "flex", gap: 26, marginLeft: 18 }}>
        {["Product", "Focus mode", "Teams", "Pricing"].map((l) => (
          <a key={l} href="#" style={{ fontSize: 14.5, fontWeight: 500, color: "var(--text-secondary)", textDecoration: "none" }}>{l}</a>
        ))}
      </nav>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
        <a href="#" style={{ fontSize: 14.5, fontWeight: 600, color: "var(--text-primary)", textDecoration: "none" }}>Sign in</a>
        <MBtn>Start for free</MBtn>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section style={{ textAlign: "center", padding: "84px 40px 70px", maxWidth: 880, margin: "0 auto" }}>
      <div style={{ display: "inline-flex" }}>
        <MBadge tone="primary" dot>Your AI work companion</MBadge>
      </div>
      <h1 style={{ margin: "22px 0 0", fontSize: 62, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, color: "var(--text-primary)" }}>
        Work smarter.<br />Finish faster.
      </h1>
      <p style={{ margin: "22px auto 0", maxWidth: 560, fontSize: 19, lineHeight: 1.6, color: "var(--text-secondary)" }}>
        WORKO tells you exactly what to work on next, keeps you focused while you do it, and maintains your momentum all day long.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 30 }}>
        <MBtn size="lg" trailingIcon={<Icon name="ArrowRight" size={18} />}>Start for free</MBtn>
        <MBtn size="lg" variant="secondary" leadingIcon={<Icon name="Play" size={17} />}>Watch demo</MBtn>
      </div>
      <p style={{ marginTop: 16, fontSize: 13, color: "var(--text-muted)" }}>No credit card · Free for your first 3 projects</p>
    </section>
  );
}

function HeroPreview() {
  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "0 40px 90px" }}>
      <div style={{
        background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-modal)",
        boxShadow: "var(--shadow-xl)", padding: 18,
      }}>
        <div style={{ borderRadius: "var(--radius-card)", overflow: "hidden", border: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "11px 14px", background: "var(--surface-secondary)", borderBottom: "1px solid var(--border)" }}>
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#E2E8F0" }} />
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#E2E8F0" }} />
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#E2E8F0" }} />
          </div>
          <div style={{ padding: "40px 36px", background: "radial-gradient(120% 90% at 50% 0%, #EEF2FF, #FFFFFF 60%)" }}>
            <div style={{ display: "inline-flex", gap: 8, marginBottom: 16 }}>
              <MBadge tone="primary">Up now</MBadge><MBadge tone="warning" dot>High priority</MBadge>
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--text-primary)", maxWidth: 520 }}>Draft the Q3 launch announcement</div>
            <div style={{ display: "flex", gap: 18, marginTop: 14, color: "var(--text-secondary)", fontSize: 14.5 }}>
              <span style={{ display: "flex", gap: 7, alignItems: "center" }}><Icon name="FolderKanban" size={16} color="var(--text-muted)" />Q3 Product Launch</span>
              <span style={{ display: "flex", gap: 7, alignItems: "center" }}><Icon name="Clock" size={16} color="var(--text-muted)" />45 min</span>
            </div>
            <div style={{ display: "flex", gap: 11, marginTop: 24 }}>
              <MBtn size="lg" leadingIcon={<Icon name="Play" size={18} />}>Start focus session</MBtn>
              <MBtn size="lg" variant="secondary" leadingIcon={<Icon name="Check" size={17} />}>Complete</MBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  { icon: "Target", title: "Know what's next", text: "WORKO prioritizes your day and surfaces the single task that matters most right now." },
  { icon: "Sparkles", title: "An AI coach in flow", text: "Your focus companion encourages you, suggests next steps, and breaks big work into subtasks." },
  { icon: "Timer", title: "Deep focus sessions", text: "Hide distractions, start the timer, and let ambient focus keep you in the zone." },
  { icon: "TrendingUp", title: "Momentum, built in", text: "Track progress, streaks, and completed work so finishing feels as good as it should." },
];

function Features() {
  return (
    <section style={{ maxWidth: 1080, margin: "0 auto", padding: "20px 40px 90px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <h2 style={{ margin: 0, fontSize: 40, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--text-primary)" }}>Stop managing. Start doing.</h2>
        <p style={{ margin: "12px auto 0", maxWidth: 520, fontSize: 17, color: "var(--text-secondary)", lineHeight: 1.6 }}>
          Traditional tools organize tasks. WORKO actively helps you complete them.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
        {FEATURES.map((f) => (
          <div key={f.title} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-sm)", padding: 28 }}>
            <span style={{ width: 46, height: 46, borderRadius: 13, background: "var(--color-primary-light)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              <Icon name={f.icon} size={22} color="var(--color-primary)" />
            </span>
            <h3 style={{ margin: 0, fontSize: 19, fontWeight: 700, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>{f.title}</h3>
            <p style={{ margin: "8px 0 0", fontSize: 15, lineHeight: 1.6, color: "var(--text-secondary)" }}>{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section style={{ padding: "0 40px 90px" }}>
      <div style={{
        maxWidth: 1000, margin: "0 auto", borderRadius: "var(--radius-modal)", padding: "60px 40px", textAlign: "center",
        background: "linear-gradient(135deg, var(--color-primary), #6D28D9)", boxShadow: "var(--shadow-primary)",
      }}>
        <h2 style={{ margin: 0, fontSize: 40, fontWeight: 800, letterSpacing: "-0.025em", color: "#fff" }}>Focus on what matters.</h2>
        <p style={{ margin: "14px auto 0", maxWidth: 460, fontSize: 17, lineHeight: 1.6, color: "rgba(255,255,255,0.85)" }}>
          Join the people finishing their most important work with clarity and momentum.
        </p>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
          <button style={{
            height: 52, padding: "0 28px", border: "none", borderRadius: "var(--radius-button)", cursor: "pointer",
            background: "#fff", color: "var(--color-primary-hover)", fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 700,
            display: "flex", alignItems: "center", gap: 8,
          }}>Start for free<Icon name="ArrowRight" size={18} /></button>
        </div>
      </div>
    </section>
  );
}

function MarketingFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "32px 40px", display: "flex", alignItems: "center", gap: 12, maxWidth: 1080, margin: "0 auto" }}>
      <img src="../../assets/worko-mark.svg" width="24" height="24" alt="" />
      <span style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>WORKO</span>
      <span style={{ fontSize: 13.5, color: "var(--text-muted)" }}>· Your AI work companion</span>
      <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--text-muted)" }}>© 2026 WORKO</span>
    </footer>
  );
}

function Marketing() {
  return (
    <div style={{ background: "var(--bg-app)", minHeight: "100%" }}>
      <MarketingNav />
      <Hero />
      <HeroPreview />
      <Features />
      <CTA />
      <MarketingFooter />
    </div>
  );
}

window.Marketing = Marketing;
