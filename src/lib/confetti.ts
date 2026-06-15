/* Self-contained confetti — no dependencies. Two cannons fire inward from the
   bottom corners, gravity pulls the pieces down, then the canvas removes itself.
   Honors prefers-reduced-motion (does nothing). */

interface Piece {
  x: number; y: number; vx: number; vy: number;
  size: number; color: string; rot: number; vr: number;
}

const COLORS = ["#4F46E5", "#06B6D4", "#10B981", "#F59E0B", "#6366F1", "#EC4899"];

export function fireConfetti() {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  const dpr = window.devicePixelRatio || 1;
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.cssText = `position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:2147483647`;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) { canvas.remove(); return; }
  ctx.scale(dpr, dpr);

  const make = (originX: number, angle: number): Piece[] =>
    Array.from({ length: 90 }, () => {
      const spread = (Math.random() - 0.5) * 0.9;
      const speed = 9 + Math.random() * 9;
      return {
        x: originX,
        y: h + 10,
        vx: Math.cos(angle + spread) * speed,
        vy: Math.sin(angle + spread) * speed,
        size: 5 + Math.random() * 7,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.4,
      };
    });

  const pieces = [
    ...make(w * 0.08, -Math.PI / 2.6), // bottom-left, up-right
    ...make(w * 0.92, -Math.PI + Math.PI / 2.6), // bottom-right, up-left
  ];

  const gravity = 0.34;
  const start = performance.now();
  const DURATION = 2800;

  function frame(t: number) {
    const elapsed = t - start;
    ctx!.clearRect(0, 0, w, h);
    const fade = Math.max(0, 1 - elapsed / DURATION);
    for (const p of pieces) {
      p.vy += gravity;
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx!.save();
      ctx!.translate(p.x, p.y);
      ctx!.rotate(p.rot);
      ctx!.globalAlpha = fade;
      ctx!.fillStyle = p.color;
      ctx!.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx!.restore();
    }
    if (elapsed < DURATION) requestAnimationFrame(frame);
    else canvas.remove();
  }
  requestAnimationFrame(frame);
}
