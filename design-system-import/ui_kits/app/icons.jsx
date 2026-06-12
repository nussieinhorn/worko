/* Icon helper — renders real Lucide icons from the lucide UMD global.
   Load https://unpkg.com/lucide before the babel scripts so window.lucide exists.
   Lucide icons inherit currentColor and use a ~2px round stroke (WORKO standard). */

function Icon({ name, size = 20, stroke = 2, color = "currentColor", style = {} }) {
  const reg = (window.lucide && (window.lucide.icons || window.lucide)) || {};
  const node = reg[name];
  let children = null;
  if (Array.isArray(node)) {
    // IconNode = [ [tag, attrs], ... ]  OR  ["svg", attrs, [ [tag, attrs], ... ]]
    const parts = Array.isArray(node[0]) ? node : node[2];
    if (Array.isArray(parts)) {
      children = parts.map((p, i) => React.createElement(p[0], { key: i, ...p[1] }));
    }
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, display: "block", ...style }}
    >
      {children}
    </svg>
  );
}

window.Icon = Icon;
