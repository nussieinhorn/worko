/* @ds-bundle: {"format":3,"namespace":"WORKODesignSystem_3ef60c","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"IconButton","sourcePath":"components/buttons/IconButton.jsx"},{"name":"Avatar","sourcePath":"components/data-display/Avatar.jsx"},{"name":"AvatarGroup","sourcePath":"components/data-display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/data-display/Badge.jsx"},{"name":"Card","sourcePath":"components/data-display/Card.jsx"},{"name":"ProgressBar","sourcePath":"components/data-display/ProgressBar.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"bcca5af26c28","components/buttons/IconButton.jsx":"9d0b77382e64","components/data-display/Avatar.jsx":"813084a737a1","components/data-display/Badge.jsx":"9cb693a4f4b2","components/data-display/Card.jsx":"f63c80ac21aa","components/data-display/ProgressBar.jsx":"7ceb191fdae8","components/forms/Checkbox.jsx":"66decfcaa991","components/forms/Input.jsx":"bcff732beb17","components/forms/Switch.jsx":"42914bf1c92e","components/navigation/Tabs.jsx":"55e660efc30e","ui_kits/app/AppShell.jsx":"44f7acb84243","ui_kits/app/FocusHome.jsx":"c37b77ac2ce8","ui_kits/app/ProjectDashboard.jsx":"54c177fee4d7","ui_kits/app/ProjectDetail.jsx":"99a671729de9","ui_kits/app/ProjectViews.jsx":"8e7f180ae908","ui_kits/app/data.jsx":"a50dc5a3a3d9","ui_kits/app/design-canvas.jsx":"bd8746af6e58","ui_kits/app/icons.jsx":"8c8ef80534ef","ui_kits/marketing/Marketing.jsx":"c3d5cd2de2c5"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.WORKODesignSystem_3ef60c = window.WORKODesignSystem_3ef60c || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizeStyles = {
  sm: {
    padding: "8px 14px",
    fontSize: "var(--text-sm)",
    height: "36px"
  },
  md: {
    padding: "10px 18px",
    fontSize: "var(--text-base)",
    height: "44px"
  },
  lg: {
    padding: "13px 24px",
    fontSize: "var(--text-lg)",
    height: "52px"
  }
};
const variantStyles = {
  primary: {
    background: "var(--color-primary)",
    color: "var(--text-on-primary)",
    border: "1px solid transparent"
  },
  secondary: {
    background: "var(--surface)",
    color: "var(--text-primary)",
    border: "1px solid var(--border)"
  },
  ghost: {
    background: "transparent",
    color: "var(--color-primary)",
    border: "1px solid transparent"
  },
  accent: {
    background: "var(--color-accent)",
    color: "#063b45",
    border: "1px solid transparent"
  }
};

/**
 * WORKO primary button. Solid indigo by default; secondary, ghost, accent variants.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  leadingIcon = null,
  trailingIcon = null,
  onClick,
  type = "button",
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontFamily: "var(--font-sans)",
    fontWeight: 600,
    lineHeight: 1,
    borderRadius: "var(--radius-button)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? "100%" : "auto",
    transition: "background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)",
    transform: active && !disabled ? "scale(0.97)" : "scale(1)",
    whiteSpace: "nowrap",
    ...sizeStyles[size],
    ...variantStyles[variant]
  };
  if (hover && !disabled) {
    if (variant === "primary") base.background = "var(--color-primary-hover)";
    if (variant === "secondary") {
      base.background = "var(--surface-secondary)";
      base.borderColor = "var(--border-strong)";
    }
    if (variant === "ghost") base.background = "var(--color-primary-light)";
    if (variant === "accent") base.background = "var(--color-accent-hover)";
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    style: base,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false)
  }, rest), leadingIcon, children, trailingIcon);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  sm: 36,
  md: 44,
  lg: 52
};

/**
 * Square icon-only button. Same variants as Button.
 */
function IconButton({
  children,
  variant = "secondary",
  size = "md",
  disabled = false,
  label,
  onClick,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const dim = sizes[size];
  const variants = {
    primary: {
      background: "var(--color-primary)",
      color: "#fff",
      border: "1px solid transparent"
    },
    secondary: {
      background: "var(--surface)",
      color: "var(--text-secondary)",
      border: "1px solid var(--border)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-secondary)",
      border: "1px solid transparent"
    }
  };
  const style = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: dim,
    height: dim,
    borderRadius: "var(--radius-input)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)",
    transform: active && !disabled ? "scale(0.94)" : "scale(1)",
    ...variants[variant]
  };
  if (hover && !disabled) {
    if (variant === "primary") style.background = "var(--color-primary-hover)";
    if (variant === "secondary") {
      style.background = "var(--surface-secondary)";
      style.color = "var(--text-primary)";
    }
    if (variant === "ghost") {
      style.background = "var(--surface-secondary)";
      style.color = "var(--text-primary)";
    }
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    style: style,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false)
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48
};
const palette = ["#4F46E5", "#06B6D4", "#10B981", "#F59E0B", "#6366F1", "#0891B2"];
function initials(name = "") {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

/**
 * Avatar with image or auto-colored initials fallback.
 */
function Avatar({
  name = "",
  src,
  size = "md"
}) {
  const dim = sizes[size];
  const color = palette[(name.charCodeAt(0) || 0) % palette.length];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: dim,
      height: dim,
      borderRadius: "50%",
      background: src ? "transparent" : color,
      color: "#fff",
      fontFamily: "var(--font-sans)",
      fontSize: dim * 0.38,
      fontWeight: 600,
      overflow: "hidden",
      flexShrink: 0,
      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.25)"
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials(name));
}

/**
 * Overlapping avatar stack. Pass `users` as [{name, src}] and optional `max`.
 */
function AvatarGroup({
  users = [],
  max = 4,
  size = "sm"
}) {
  const dim = sizes[size];
  const shown = users.slice(0, max);
  const extra = users.length - shown.length;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center"
    }
  }, shown.map((u, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      marginLeft: i === 0 ? 0 : -dim * 0.3,
      borderRadius: "50%",
      boxShadow: "0 0 0 2px var(--surface)"
    }
  }, /*#__PURE__*/React.createElement(Avatar, _extends({}, u, {
    size: size
  })))), extra > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: -dim * 0.3,
      width: dim,
      height: dim,
      borderRadius: "50%",
      background: "var(--surface-secondary)",
      color: "var(--text-secondary)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-sans)",
      fontSize: dim * 0.34,
      fontWeight: 600,
      boxShadow: "0 0 0 2px var(--surface)"
    }
  }, "+", extra));
}
Object.assign(__ds_scope, { Avatar, AvatarGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Badge.jsx
try { (() => {
const tones = {
  neutral: {
    bg: "var(--surface-secondary)",
    fg: "var(--text-secondary)"
  },
  primary: {
    bg: "var(--color-primary-light)",
    fg: "var(--color-primary-hover)"
  },
  accent: {
    bg: "var(--cyan-50)",
    fg: "var(--cyan-600)"
  },
  success: {
    bg: "var(--green-50)",
    fg: "#047857"
  },
  warning: {
    bg: "var(--amber-50)",
    fg: "#B45309"
  },
  error: {
    bg: "var(--red-50)",
    fg: "#B91C1C"
  }
};

/**
 * Small status pill. Tones map to semantic colors. `dot` adds a leading status dot.
 */
function Badge({
  children,
  tone = "neutral",
  dot = false
}) {
  const t = tones[tone];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      background: t.bg,
      color: t.fg,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-xs)",
      fontWeight: 600,
      lineHeight: 1,
      padding: "5px 10px",
      borderRadius: "var(--radius-pill)",
      whiteSpace: "nowrap"
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "currentColor"
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Surface card. White background, soft shadow, 16px radius, generous padding.
 */
function Card({
  children,
  padding = "var(--space-6)",
  interactive = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-card)",
      boxShadow: interactive && hover ? "var(--shadow-lg)" : "var(--shadow-sm)",
      padding,
      transition: "box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)",
      transform: interactive && hover ? "translateY(-2px)" : "none",
      cursor: interactive ? "pointer" : "default",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Card.jsx", error: String((e && e.message) || e) }); }

// components/data-display/ProgressBar.jsx
try { (() => {
/**
 * Slim progress bar. Indigo fill by default; pass `tone` for accent/success.
 */
function ProgressBar({
  value = 0,
  tone = "primary",
  height = 8,
  showLabel = false
}) {
  const pct = Math.max(0, Math.min(100, value));
  const fills = {
    primary: "var(--color-primary)",
    accent: "var(--color-accent)",
    success: "var(--color-success)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      width: "100%",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height,
      background: "var(--surface-secondary)",
      borderRadius: "var(--radius-pill)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: "100%",
      background: fills[tone],
      borderRadius: "var(--radius-pill)",
      transition: "width var(--dur-slow) var(--ease-out)"
    }
  })), showLabel && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-sm)",
      fontWeight: 600,
      color: "var(--text-secondary)",
      minWidth: 38,
      textAlign: "right",
      fontVariantNumeric: "tabular-nums"
    }
  }, pct, "%"));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
/**
 * Checkbox. Checked = primary indigo with white check. Round option via `round` (task-style).
 */
function Checkbox({
  checked = false,
  onChange,
  disabled = false,
  label,
  round = false,
  id
}) {
  const boxId = id || React.useId();
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: boxId,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-base)",
      color: "var(--text-primary)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "22px",
      height: "22px",
      borderRadius: round ? "50%" : "7px",
      border: `2px solid ${checked ? "var(--color-primary)" : "var(--border-strong)"}`,
      background: checked ? "var(--color-primary)" : "transparent",
      transition: "all var(--dur-fast) var(--ease-out)",
      flexShrink: 0
    }
  }, checked && /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), /*#__PURE__*/React.createElement("input", {
    id: boxId,
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.checked),
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }), label && /*#__PURE__*/React.createElement("span", {
    style: {
      textDecoration: checked && round ? "line-through" : "none",
      color: checked && round ? "var(--text-muted)" : "var(--text-primary)"
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Clean, minimal text input. Focus state uses primary indigo ring.
 */
function Input({
  label,
  hint,
  error,
  leadingIcon = null,
  type = "text",
  disabled = false,
  id,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || React.useId();
  const wrap = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: disabled ? "var(--surface-secondary)" : "var(--surface)",
    border: `1px solid ${error ? "var(--color-error)" : focus ? "var(--color-primary)" : "var(--border)"}`,
    borderRadius: "var(--radius-input)",
    padding: "0 14px",
    height: "44px",
    boxShadow: focus && !error ? "var(--ring)" : "none",
    transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      fontFamily: "var(--font-sans)"
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontSize: "var(--text-sm)",
      fontWeight: 600,
      color: "var(--text-primary)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: wrap
  }, leadingIcon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)",
      display: "inline-flex"
    }
  }, leadingIcon), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      border: "none",
      outline: "none",
      background: "transparent",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-base)",
      color: "var(--text-primary)",
      height: "100%",
      minWidth: 0
    }
  }, rest))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-sm)",
      color: error ? "var(--color-error)" : "var(--text-muted)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
/**
 * Toggle switch. On = primary indigo.
 */
function Switch({
  checked = false,
  onChange,
  disabled = false,
  label,
  id
}) {
  const switchId = id || React.useId();
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: switchId,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-sm)",
      fontWeight: 500,
      color: "var(--text-primary)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      width: "40px",
      height: "24px",
      borderRadius: "var(--radius-pill)",
      background: checked ? "var(--color-primary)" : "var(--slate-300)",
      transition: "background var(--dur-base) var(--ease-out)",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "2px",
      left: checked ? "18px" : "2px",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      background: "#fff",
      boxShadow: "var(--shadow-sm)",
      transition: "left var(--dur-base) var(--ease-out)"
    }
  })), /*#__PURE__*/React.createElement("input", {
    id: switchId,
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.checked),
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
/**
 * Underline tabs. `items` = [{id, label, icon?}]. Controlled via value/onChange.
 */
function Tabs({
  items = [],
  value,
  onChange
}) {
  const active = value ?? items[0]?.id;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "4px",
      borderBottom: "1px solid var(--border)",
      fontFamily: "var(--font-sans)"
    }
  }, items.map(it => {
    const on = it.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      type: "button",
      onClick: () => onChange && onChange(it.id),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "7px",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        padding: "10px 14px",
        marginBottom: "-1px",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        fontWeight: 600,
        color: on ? "var(--color-primary)" : "var(--text-muted)",
        borderBottom: `2px solid ${on ? "var(--color-primary)" : "transparent"}`,
        transition: "color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)"
      }
    }, it.icon, it.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/AppShell.jsx
try { (() => {
/* WORKO app shell — sidebar nav + top bar + content slot. */
const {
  Avatar,
  IconButton
} = window.WORKODesignSystem_3ef60c;
const PRESENCE = [{
  id: "active",
  label: "Active",
  color: "#10B981"
}, {
  id: "focusing",
  label: "Focusing",
  color: "#6366F1"
}, {
  id: "away",
  label: "Away",
  color: "#F59E0B"
}, {
  id: "dnd",
  label: "Do not disturb",
  color: "#EF4444"
}];
const NAV = [{
  id: "home",
  label: "Focus",
  icon: "Target"
}, {
  id: "tasks",
  label: "My tasks",
  icon: "CheckSquare"
}, {
  id: "projects",
  label: "Projects",
  icon: "FolderKanban"
}, {
  id: "team",
  label: "Team",
  icon: "Users"
}, {
  id: "reports",
  label: "Reports",
  icon: "BarChart3"
}, {
  id: "settings",
  label: "Settings",
  icon: "Settings"
}];
function Sidebar({
  active,
  onNavigate
}) {
  const [collapsed, setCollapsed] = React.useState(false);
  const w = collapsed ? 72 : 232;
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: w,
      flexShrink: 0,
      height: "100%",
      background: "var(--surface)",
      borderRight: "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      padding: collapsed ? "20px 12px" : "20px 14px",
      position: "relative",
      transition: "width var(--dur-base) var(--ease-out), padding var(--dur-base) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setCollapsed(c => !c),
    "aria-label": collapsed ? "Expand sidebar" : "Collapse sidebar",
    style: {
      position: "absolute",
      top: 26,
      right: -13,
      zIndex: 6,
      width: 26,
      height: 26,
      borderRadius: "50%",
      background: "var(--surface)",
      border: "1px solid var(--border)",
      boxShadow: "var(--shadow-xs)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--text-muted)",
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: collapsed ? "ChevronRight" : "ChevronLeft",
    size: 15
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: collapsed ? "4px 0 22px" : "4px 8px 22px",
      justifyContent: collapsed ? "center" : "flex-start"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/worko-mark.svg",
    alt: "",
    width: "30",
    height: "30"
  }), !collapsed && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      fontSize: 19,
      letterSpacing: "-0.02em",
      color: "var(--text-primary)"
    }
  }, "WORKO")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, NAV.map(item => {
    const on = item.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: item.id,
      onClick: () => onNavigate(item.id),
      title: collapsed ? item.label : undefined,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 11,
        width: "100%",
        padding: collapsed ? "10px 0" : "9px 10px",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        justifyContent: collapsed ? "center" : "flex-start",
        borderRadius: "var(--radius-input)",
        background: on ? "var(--color-primary-light)" : "transparent",
        color: on ? "var(--color-primary-hover)" : "var(--text-secondary)",
        fontFamily: "var(--font-sans)",
        fontSize: 14.5,
        fontWeight: on ? 600 : 500,
        transition: "background var(--dur-fast) var(--ease-out)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: item.icon,
      size: 19,
      stroke: on ? 2.2 : 2
    }), !collapsed && item.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, !collapsed && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 11,
      alignItems: "flex-start",
      padding: 12,
      background: "var(--bg-app)",
      borderRadius: "var(--radius-card)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Sparkles",
    size: 18,
    color: "var(--color-accent)",
    style: {
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--text-primary)"
    }
  }, "5-day streak"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--text-muted)",
      marginTop: 2
    }
  }, "Keep the momentum going."))), /*#__PURE__*/React.createElement(UserStatus, {
    collapsed: collapsed
  })));
}
function UserStatus({
  collapsed
}) {
  const [status, setStatus] = React.useState(PRESENCE[0]);
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const h = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(o => !o),
    title: collapsed ? `${WORKO_DATA.user.name} · ${status.label}` : undefined,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      width: "100%",
      padding: "6px 4px",
      border: "none",
      background: open ? "var(--bg-app)" : "transparent",
      borderRadius: "var(--radius-input)",
      cursor: "pointer",
      justifyContent: collapsed ? "center" : "flex-start",
      fontFamily: "var(--font-sans)",
      textAlign: "left",
      transition: "background var(--dur-fast) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: WORKO_DATA.user.name,
    size: "sm"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: -1,
      bottom: -1,
      width: 11,
      height: 11,
      borderRadius: "50%",
      background: status.color,
      border: "2px solid var(--surface)"
    }
  })), !collapsed && /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 0,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 13.5,
      fontWeight: 600,
      color: "var(--text-primary)",
      whiteSpace: "nowrap"
    }
  }, WORKO_DATA.user.name), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 5,
      fontSize: 12,
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: status.color
    }
  }), status.label)), !collapsed && /*#__PURE__*/React.createElement(Icon, {
    name: "ChevronsUpDown",
    size: 15,
    color: "var(--text-muted)"
  })), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: "calc(100% + 8px)",
      left: 0,
      minWidth: 204,
      zIndex: 20,
      padding: 6,
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 12,
      boxShadow: "var(--shadow-lg)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      color: "var(--text-muted)",
      padding: "6px 10px 4px"
    }
  }, "Set status"), PRESENCE.map(p => /*#__PURE__*/React.createElement("button", {
    key: p.id,
    onClick: () => {
      setStatus(p);
      setOpen(false);
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      width: "100%",
      textAlign: "left",
      padding: "8px 10px",
      border: "none",
      borderRadius: 8,
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      fontSize: 13.5,
      fontWeight: 500,
      color: "var(--text-primary)",
      background: p.id === status.id ? "var(--bg-app)" : "transparent"
    },
    onMouseEnter: e => {
      if (p.id !== status.id) e.currentTarget.style.background = "var(--bg-app)";
    },
    onMouseLeave: e => {
      if (p.id !== status.id) e.currentTarget.style.background = "transparent";
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: "50%",
      background: p.color
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, p.label), p.id === status.id && /*#__PURE__*/React.createElement(Icon, {
    name: "Check",
    size: 15,
    color: "var(--color-primary)"
  })))));
}
function TopBar({
  title,
  subtitle,
  children
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "18px 32px",
      borderBottom: "1px solid var(--border)",
      background: "rgba(255,255,255,0.85)",
      backdropFilter: "blur(8px)",
      position: "sticky",
      top: 0,
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 19,
      fontWeight: 700,
      letterSpacing: "-0.02em",
      color: "var(--text-primary)"
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "2px 0 0",
      fontSize: 13.5,
      color: "var(--text-muted)"
    }
  }, subtitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "0 12px",
      height: 40,
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-input)",
      color: "var(--text-muted)",
      width: 220
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Search",
    size: 17
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search",
    style: {
      border: "none",
      outline: "none",
      background: "transparent",
      flex: 1,
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      color: "var(--text-primary)",
      minWidth: 0
    }
  })), /*#__PURE__*/React.createElement(IconButton, {
    label: "Notifications",
    variant: "secondary"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Bell",
    size: 18
  })), children));
}
window.Sidebar = Sidebar;
window.TopBar = TopBar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/FocusHome.jsx
try { (() => {
/* Screen 1 — Focus Home. The primary, focus-first experience. */
const {
  Button,
  Badge,
  ProgressBar,
  Card: WCard,
  Switch
} = window.WORKODesignSystem_3ef60c;
function StatBlock({
  value,
  label,
  accent
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 30,
      fontWeight: 600,
      letterSpacing: "-0.02em",
      color: accent || "var(--text-primary)",
      fontVariantNumeric: "tabular-nums",
      lineHeight: 1
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-muted)",
      marginTop: 5
    }
  }, label));
}
function CoachPanel() {
  const c = WORKO_DATA.coach;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18,
      height: "100%",
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-sm)",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 12,
      flexShrink: 0,
      background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Sparkles",
    size: 20,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 700,
      color: "var(--text-primary)"
    }
  }, "Focus companion"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--color-success)",
      display: "flex",
      alignItems: "center",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "var(--color-success)"
    }
  }), "Here with you"))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 15,
      lineHeight: 1.6,
      color: "var(--text-secondary)"
    }
  }, c.message), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--color-primary-light)",
      borderRadius: "var(--radius-input)",
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      color: "var(--color-primary)",
      marginBottom: 6
    }
  }, "Suggested next step"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      lineHeight: 1.5,
      color: "var(--text-primary)"
    }
  }, c.nextStep)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 7
    }
  }, ["Break into subtasks", "Estimate effort", "Summarize"].map(s => /*#__PURE__*/React.createElement("button", {
    key: s,
    style: {
      border: "1px solid var(--border)",
      background: "var(--surface)",
      cursor: "pointer",
      borderRadius: "var(--radius-pill)",
      padding: "6px 12px",
      fontFamily: "var(--font-sans)",
      fontSize: 12.5,
      fontWeight: 500,
      color: "var(--text-secondary)"
    }
  }, s))), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "0 6px 0 14px",
      height: 44,
      background: "var(--bg-app)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-input)"
    }
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "Ask WORKO anything\u2026",
    style: {
      border: "none",
      outline: "none",
      background: "transparent",
      flex: 1,
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      color: "var(--text-primary)",
      minWidth: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 9,
      background: "var(--color-primary)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ArrowUp",
    size: 18,
    color: "#fff"
  })))));
}
function FocusSession({
  onExit
}) {
  const [seconds, setSeconds] = React.useState(25 * 60);
  const [running, setRunning] = React.useState(true);
  const [music, setMusic] = React.useState(true);
  React.useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setSeconds(s => s > 0 ? s - 1 : 0), 1000);
    return () => clearInterval(t);
  }, [running]);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const task = WORKO_DATA.focusTask;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 20,
      background: "radial-gradient(120% 90% at 50% -10%, #EEF2FF 0%, #F8FAFC 45%, #F1F5F9 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      padding: 40
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onExit,
    style: {
      position: "absolute",
      top: 24,
      right: 28,
      border: "1px solid var(--border)",
      background: "var(--surface)",
      cursor: "pointer",
      borderRadius: "var(--radius-input)",
      padding: "9px 14px",
      fontFamily: "var(--font-sans)",
      fontSize: 13.5,
      fontWeight: 600,
      color: "var(--text-secondary)",
      display: "flex",
      gap: 7,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "X",
    size: 16
  }), "End session"), /*#__PURE__*/React.createElement(Badge, {
    tone: "primary",
    dot: true
  }, "Deep focus \xB7 distractions hidden"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 19,
      fontWeight: 600,
      color: "var(--text-secondary)",
      marginTop: 18
    }
  }, task.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 116,
      fontWeight: 600,
      letterSpacing: "-0.04em",
      color: "var(--text-primary)",
      fontVariantNumeric: "tabular-nums",
      lineHeight: 1.05
    }
  }, mm, ":", ss), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: running ? "secondary" : "primary",
    size: "lg",
    onClick: () => setRunning(r => !r),
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: running ? "Pause" : "Play",
      size: 18
    })
  }, running ? "Pause" : "Resume"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "Plus",
      size: 18
    })
  }, "Extend 10 min"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: onExit,
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "Check",
      size: 18
    })
  }, "Complete task")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      marginTop: 28,
      padding: "10px 16px",
      background: "rgba(255,255,255,0.7)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-pill)",
      backdropFilter: "blur(8px)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Music",
    size: 17,
    color: "var(--text-muted)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      fontWeight: 500,
      color: "var(--text-secondary)"
    }
  }, "Ambient focus"), /*#__PURE__*/React.createElement(Switch, {
    checked: music,
    onChange: setMusic
  })));
}
function FocusHome() {
  const [inSession, setInSession] = React.useState(false);
  const [upNextOpen, setUpNextOpen] = React.useState(true);
  const t = WORKO_DATA.focusTask;
  const d = WORKO_DATA.today;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: "100%",
      overflow: "auto"
    }
  }, inSession && /*#__PURE__*/React.createElement(FocusSession, {
    onExit: () => setInSession(false)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 32,
      display: "flex",
      flexDirection: "column",
      gap: 24,
      maxWidth: 760,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-md)",
      padding: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "primary"
  }, "Up now"), /*#__PURE__*/React.createElement(Badge, {
    tone: "warning",
    dot: true
  }, t.priority, " priority")), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 34,
      fontWeight: 800,
      letterSpacing: "-0.025em",
      lineHeight: 1.1,
      color: "var(--text-primary)"
    }
  }, t.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 18,
      marginTop: 16,
      color: "var(--text-secondary)",
      fontSize: 14.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "FolderKanban",
    size: 17,
    color: "var(--text-muted)"
  }), t.project), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Clock",
    size: 17,
    color: "var(--text-muted)"
  }), t.estimate)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 26,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "Play",
      size: 19
    }),
    onClick: () => setInSession(true)
  }, "Start focus session"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "Check",
      size: 18
    })
  }, "Complete"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "lg",
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "SkipForward",
      size: 18
    })
  }, "Skip"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-sm)",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 16,
      fontWeight: 700,
      color: "var(--text-primary)"
    }
  }, "Today's progress"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--text-muted)"
    }
  }, d.date)), /*#__PURE__*/React.createElement(ProgressBar, {
    value: d.progress,
    showLabel: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 40,
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    value: d.done,
    label: "Tasks done",
    accent: "var(--color-primary)"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: d.remaining,
    label: "Remaining"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: `${d.streak}d`,
    label: "Focus streak",
    accent: "var(--color-accent)"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: () => setUpNextOpen(o => !o),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      margin: "0 0 12px",
      padding: 0,
      border: "none",
      background: "transparent",
      cursor: "pointer",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ChevronRight",
    size: 18,
    color: "var(--text-muted)",
    style: {
      transform: upNextOpen ? "rotate(90deg)" : "none",
      transition: "transform var(--dur-fast) var(--ease-out)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: "var(--text-primary)"
    }
  }, "Up next"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--text-muted)"
    }
  }, WORKO_DATA.upNext.length)), upNextOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, WORKO_DATA.upNext.map((u, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "14px 18px",
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-sm)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: "50%",
      border: "2px solid var(--border-strong)",
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 15,
      fontWeight: 500,
      color: "var(--text-primary)"
    }
  }, u.title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--text-muted)",
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Clock",
    size: 15
  }), u.estimate), /*#__PURE__*/React.createElement(Badge, {
    tone: u.priority === "Medium" ? "neutral" : "neutral"
  }, u.priority))))))));
}
window.FocusHome = FocusHome;
window.FocusSession = FocusSession;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/FocusHome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/ProjectDashboard.jsx
try { (() => {
/* Screen 2 — Project Dashboard. Grid of project cards; inline create. */
const {
  Button: WBtn,
  Badge: PBadge,
  ProgressBar: PProgress,
  AvatarGroup,
  IconButton: PIconBtn
} = window.WORKODesignSystem_3ef60c;
function ProjectCard({
  p,
  onOpen
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: onOpen,
    style: {
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-card)",
      boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-sm)",
      padding: 22,
      cursor: "pointer",
      transform: hover ? "translateY(-2px)" : "none",
      transition: "box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)",
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 11,
      background: p.color,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "FolderKanban",
    size: 19,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: "var(--text-primary)",
      letterSpacing: "-0.01em"
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--text-muted)",
      marginTop: 2
    }
  }, "Updated ", p.activity)), /*#__PURE__*/React.createElement(PIconBtn, {
    label: "Project options",
    variant: "ghost",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "MoreHorizontal",
    size: 18
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13.5,
      lineHeight: 1.5,
      color: "var(--text-secondary)",
      minHeight: 40
    }
  }, p.desc), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 7,
      fontSize: 12.5,
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", null, p.progress, "% complete"), /*#__PURE__*/React.createElement("span", null, p.open, " open tasks")), /*#__PURE__*/React.createElement(PProgress, {
    value: p.progress,
    height: 6
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 4
    }
  }, /*#__PURE__*/React.createElement(AvatarGroup, {
    users: p.members.map(name => ({
      name
    })),
    max: 4,
    size: "sm"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--color-primary)",
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, "Open", /*#__PURE__*/React.createElement(Icon, {
    name: "ChevronRight",
    size: 15
  }))));
}
function CreateProjectCard() {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: hover ? "var(--color-primary-light)" : "transparent",
      border: `2px dashed ${hover ? "var(--color-primary)" : "var(--border-strong)"}`,
      borderRadius: "var(--radius-card)",
      padding: 22,
      cursor: "pointer",
      minHeight: 210,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      color: hover ? "var(--color-primary-hover)" : "var(--text-muted)",
      fontFamily: "var(--font-sans)",
      transition: "all var(--dur-base) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 12,
      background: hover ? "var(--color-primary)" : "var(--surface-secondary)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background var(--dur-base) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Plus",
    size: 22,
    color: hover ? "#fff" : "var(--text-muted)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600
    }
  }, "Create project"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: "var(--text-muted)"
    }
  }, "Click to name it \u2014 no setup needed"));
}
function ProjectDashboard({
  onOpenProject
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 32,
      maxWidth: 1240,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      padding: 4,
      background: "var(--surface-secondary)",
      borderRadius: "var(--radius-input)"
    }
  }, ["All", "Active", "Mine"].map((f, i) => /*#__PURE__*/React.createElement("span", {
    key: f,
    style: {
      padding: "6px 14px",
      borderRadius: 9,
      fontSize: 13.5,
      fontWeight: 600,
      cursor: "pointer",
      background: i === 0 ? "var(--surface)" : "transparent",
      color: i === 0 ? "var(--text-primary)" : "var(--text-muted)",
      boxShadow: i === 0 ? "var(--shadow-xs)" : "none"
    }
  }, f))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement(WBtn, {
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "Plus",
      size: 18
    })
  }, "Create project"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 18
    }
  }, WORKO_DATA.projects.map(p => /*#__PURE__*/React.createElement(ProjectCard, {
    key: p.name,
    p: p,
    onOpen: () => onOpenProject(p)
  })), /*#__PURE__*/React.createElement(CreateProjectCard, null)));
}
window.ProjectDashboard = ProjectDashboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/ProjectDashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/ProjectDetail.jsx
try { (() => {
/* Screen 3 — Project Detail. Overview dashboard + interactive List, Board, Calendar, Timeline.
   Tasks live in ProjectDetail state and are mutated by drag-and-drop, quick-add, and the
   Add-task modal. This file: data model, shared UI (toolbar, dropdowns, tooltip, quick-add,
   modal, drawer), Overview, and the shell. The four task views live in ProjectViews.jsx. */
const {
  Tabs: DTabs,
  Badge: DBadge,
  Avatar: DAvatar,
  AvatarGroup: DAvatarGroup,
  ProgressBar: DProgress,
  Checkbox: DCheckbox,
  Button: DButton,
  IconButton: DIconBtn
} = window.WORKODesignSystem_3ef60c;
const PRIORITY_TONE = {
  High: "error",
  Medium: "warning",
  Low: "neutral"
};
const PRIORITY_COLOR = {
  High: "#EF4444",
  Medium: "#F59E0B",
  Low: "#94A3B8"
};
const COLUMN_DOT = {
  Backlog: "#94A3B8",
  "To do": "#6366F1",
  "In progress": "#4F46E5",
  Review: "#F59E0B",
  Done: "#10B981"
};
const ASSIGNEE_COLOR = {
  "Maya Chen": "#4F46E5",
  "Sam Ito": "#06B6D4",
  "Lee Roy": "#6366F1",
  "Ana Diaz": "#10B981",
  "Tom B": "#F59E0B",
  "Priya N": "#EC4899"
};
const STATUS_ORDER = ["Backlog", "To do", "In progress", "Review", "Done"];
const PRIORITY_ORDER = ["High", "Medium", "Low"];
const ASSIGNEES = Object.keys(ASSIGNEE_COLOR);
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TL_BASE = new Date(2026, 5, 8); // Mon Jun 8, 2026 — timeline / schedule origin
const TL_DAYS = 14;
const TODAY = new Date(2026, 5, 10); // Wed Jun 10, 2026
const TODAY_IDX = 2;
const SCHEDULE = {
  "Collect launch-day metrics plan": {
    start: 9,
    len: 3
  },
  "Draft FAQ for support team": {
    start: 8,
    len: 2
  },
  "Write press release": {
    start: 4,
    len: 3
  },
  "Schedule social posts": {
    start: 6,
    len: 2
  },
  "Draft the Q3 launch announcement": {
    start: 1,
    len: 4
  },
  "Build launch landing page": {
    start: 2,
    len: 5
  },
  "Final hero illustration": {
    start: 3,
    len: 2
  },
  "Lock launch date": {
    start: 0,
    len: 1
  },
  "Brief the exec team": {
    start: 0,
    len: 2
  }
};
const fmtDate = d => `${MON[d.getMonth()]} ${d.getDate()}`;
const sameDay = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const idxToDue = idx => {
  const d = new Date(TL_BASE);
  d.setDate(d.getDate() + idx);
  return d;
};
const dueToIdx = due => Math.max(0, Math.min(TL_DAYS - 1, Math.round((due - TL_BASE) / 86400000)));
const startFromDue = (due, len) => Math.max(0, Math.min(TL_DAYS - len, dueToIdx(due) - (len - 1)));
const toInputDate = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const sundayOf = d => {
  const x = new Date(d);
  x.setDate(x.getDate() - x.getDay());
  x.setHours(0, 0, 0, 0);
  return x;
};

/* Seed tasks. Backlog items start unscheduled so the Calendar backlog rail has something to drag in. */
const TASKS = Object.entries(WORKO_DATA.board).flatMap(([status, tasks]) => tasks.map((t, i) => {
  const sc = SCHEDULE[t.title] || {
    start: 0,
    len: 2
  };
  return {
    ...t,
    status,
    id: status.replace(/\s/g, "") + i,
    start: sc.start,
    len: sc.len,
    due: idxToDue(sc.start + sc.len - 1),
    scheduled: status !== "Backlog"
  };
}));
const INITIAL_TASKS = TASKS.map(t => ({
  ...t
}));
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
  const filtered = tasks.filter(t => (!search || t.title.toLowerCase().includes(search.toLowerCase())) && (priority === "All" || t.priority === priority) && (assignee === "All" || t.assignee === assignee));
  return {
    search,
    setSearch,
    groupBy,
    setGroupBy,
    priority,
    setPriority,
    assignee,
    setAssignee,
    filtered
  };
}
function groupMeta(groupBy) {
  if (groupBy === "priority") return {
    order: PRIORITY_ORDER,
    field: "priority",
    key: t => t.priority,
    color: k => PRIORITY_COLOR[k]
  };
  if (groupBy === "assignee") return {
    order: ASSIGNEES,
    field: "assignee",
    key: t => t.assignee,
    color: k => ASSIGNEE_COLOR[k]
  };
  return {
    order: STATUS_ORDER,
    field: "status",
    key: t => t.status,
    color: k => COLUMN_DOT[k]
  };
}
function groupTasks(tasks, groupBy, includeEmpty) {
  if (groupBy === "none") return [["All tasks", tasks]];
  const {
    order,
    key
  } = groupMeta(groupBy);
  const map = {};
  tasks.forEach(t => {
    const k = key(t);
    (map[k] = map[k] || []).push(t);
  });
  const base = includeEmpty ? order : order.filter(k => map[k]);
  const known = base.map(k => [k, map[k] || []]);
  const extra = Object.keys(map).filter(k => !order.includes(k)).map(k => [k, map[k]]);
  return [...known, ...extra];
}

/* ============================ tooltip ============================ */
function TipRow({
  icon,
  avatar,
  dot,
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      fontSize: 12,
      color: "#E2E8F0"
    }
  }, avatar ? /*#__PURE__*/React.createElement(DAvatar, {
    name: label,
    size: "xs"
  }) : dot ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: dot
    }
  }) : /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 13,
    color: "#94A3B8"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500
    }
  }, label));
}
function Tip({
  task,
  place = "top",
  style,
  children
}) {
  const [show, setShow] = React.useState(false);
  const above = place !== "bottom";
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    style: {
      position: "relative",
      ...style
    }
  }, children, show && task && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      [above ? "bottom" : "top"]: "calc(100% + 8px)",
      zIndex: 60,
      width: 210,
      padding: "11px 13px",
      background: "#0F172A",
      borderRadius: 11,
      boxShadow: "0 10px 30px rgba(2,6,23,0.45)",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 700,
      color: "#fff",
      lineHeight: 1.35,
      marginBottom: 9
    }
  }, task.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(TipRow, {
    avatar: true,
    label: task.assignee
  }), /*#__PURE__*/React.createElement(TipRow, {
    icon: "Calendar",
    label: `Due ${fmtDate(task.due)}`
  }), /*#__PURE__*/React.createElement(TipRow, {
    dot: PRIORITY_COLOR[task.priority],
    label: `${task.priority} priority`
  }), /*#__PURE__*/React.createElement(TipRow, {
    dot: COLUMN_DOT[task.status],
    label: task.status
  }))));
}

/* ============================ inline inputs ============================ */
function QuickAdd({
  onAdd,
  placeholder = "Add task",
  style
}) {
  const [open, setOpen] = React.useState(false);
  const [v, setV] = React.useState("");
  if (!open) return /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(true),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      width: "100%",
      padding: "8px 10px",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      fontWeight: 600,
      color: "var(--text-muted)",
      borderRadius: 9,
      ...style
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = "var(--bg-app)";
      e.currentTarget.style.color = "var(--text-secondary)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = "transparent";
      e.currentTarget.style.color = "var(--text-muted)";
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Plus",
    size: 15
  }), placeholder);
  return /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    value: v,
    placeholder: "Task name, then Enter",
    onChange: e => setV(e.target.value),
    onKeyDown: e => {
      if (e.key === "Enter" && v.trim()) {
        onAdd(v.trim());
        setV("");
      }
      if (e.key === "Escape") {
        setOpen(false);
        setV("");
      }
    },
    onBlur: () => {
      if (!v.trim()) setOpen(false);
    },
    style: {
      width: "100%",
      height: 34,
      padding: "0 11px",
      background: "var(--surface)",
      border: "1px solid var(--color-primary)",
      borderRadius: 9,
      fontFamily: "var(--font-sans)",
      fontSize: 13.5,
      color: "var(--text-primary)",
      outline: "none",
      ...style
    }
  });
}
function MiniInput({
  onSubmit,
  onClose,
  placeholder = "Task name…"
}) {
  const [v, setV] = React.useState("");
  return /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    value: v,
    placeholder: placeholder,
    onClick: e => e.stopPropagation(),
    onChange: e => setV(e.target.value),
    onKeyDown: e => {
      e.stopPropagation();
      if (e.key === "Enter" && v.trim()) {
        onSubmit(v.trim());
        setV("");
      }
      if (e.key === "Escape") onClose();
    },
    onBlur: () => {
      if (!v.trim()) onClose();
    },
    style: {
      width: "100%",
      marginTop: 4,
      padding: "5px 7px",
      fontSize: 11.5,
      fontFamily: "var(--font-sans)",
      border: "1px solid var(--color-primary)",
      borderRadius: 6,
      outline: "none",
      color: "var(--text-primary)"
    }
  });
}

/* ============================ toolbar ============================ */
function Dropdown({
  icon,
  label,
  value,
  valueLabel,
  options,
  onChange,
  accent
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const h = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const active = accent && value !== options[0].value;
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(o => !o),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      height: 34,
      padding: "0 11px",
      background: active ? "var(--indigo-50, #EEF2FF)" : "var(--surface)",
      border: `1px solid ${active ? "var(--color-primary)" : "var(--border)"}`,
      borderRadius: "var(--radius-button)",
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      fontWeight: 600,
      color: active ? "var(--color-primary)" : "var(--text-secondary)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 15,
    color: active ? "var(--color-primary)" : "var(--text-muted)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)",
      fontWeight: 600
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      color: active ? "var(--color-primary)" : "var(--text-primary)"
    }
  }, valueLabel), /*#__PURE__*/React.createElement(Icon, {
    name: "ChevronDown",
    size: 14,
    color: "var(--text-muted)"
  })), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 40,
      left: 0,
      zIndex: 40,
      minWidth: 180,
      padding: 6,
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 12,
      boxShadow: "var(--shadow-lg)"
    }
  }, options.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    onClick: () => {
      onChange(o.value);
      setOpen(false);
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      width: "100%",
      textAlign: "left",
      padding: "8px 10px",
      border: "none",
      borderRadius: 8,
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      fontSize: 13.5,
      fontWeight: 500,
      color: "var(--text-primary)",
      background: o.value === value ? "var(--bg-app)" : "transparent"
    },
    onMouseEnter: e => {
      if (o.value !== value) e.currentTarget.style.background = "var(--bg-app)";
    },
    onMouseLeave: e => {
      if (o.value !== value) e.currentTarget.style.background = "transparent";
    }
  }, o.dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: o.dot
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, o.label), o.value === value && /*#__PURE__*/React.createElement(Icon, {
    name: "Check",
    size: 15,
    color: "var(--color-primary)"
  })))));
}
function Toolbar({
  f,
  count,
  showGroup = true,
  onAdd
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      flexWrap: "wrap",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 232
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Search",
    size: 15,
    color: "var(--text-muted)",
    style: {
      position: "absolute",
      left: 11,
      top: "50%",
      transform: "translateY(-50%)"
    }
  }), /*#__PURE__*/React.createElement("input", {
    value: f.search,
    onChange: e => f.setSearch(e.target.value),
    placeholder: "Search tasks\u2026",
    style: {
      width: "100%",
      height: 34,
      padding: "0 11px 0 33px",
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-button)",
      fontFamily: "var(--font-sans)",
      fontSize: 13.5,
      color: "var(--text-primary)",
      outline: "none"
    }
  })), showGroup && /*#__PURE__*/React.createElement(Dropdown, {
    icon: "Group",
    label: "Group:",
    value: f.groupBy,
    accent: true,
    valueLabel: {
      status: "Status",
      priority: "Priority",
      assignee: "Assignee",
      none: "None"
    }[f.groupBy],
    onChange: f.setGroupBy,
    options: [{
      value: "status",
      label: "Status"
    }, {
      value: "priority",
      label: "Priority"
    }, {
      value: "assignee",
      label: "Assignee"
    }, {
      value: "none",
      label: "None"
    }]
  }), /*#__PURE__*/React.createElement(Dropdown, {
    icon: "Flag",
    label: "Priority:",
    value: f.priority,
    accent: true,
    valueLabel: f.priority,
    onChange: f.setPriority,
    options: [{
      value: "All",
      label: "All priorities"
    }, ...PRIORITY_ORDER.map(p => ({
      value: p,
      label: p,
      dot: PRIORITY_COLOR[p]
    }))]
  }), /*#__PURE__*/React.createElement(Dropdown, {
    icon: "User",
    label: "Assignee:",
    value: f.assignee,
    accent: true,
    valueLabel: f.assignee === "All" ? "All" : f.assignee.split(" ")[0],
    onChange: f.setAssignee,
    options: [{
      value: "All",
      label: "Everyone"
    }, ...ASSIGNEES.map(a => ({
      value: a,
      label: a,
      dot: ASSIGNEE_COLOR[a]
    }))]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      color: "var(--text-muted)"
    }
  }, count, " task", count === 1 ? "" : "s"), /*#__PURE__*/React.createElement("button", {
    onClick: onAdd,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      height: 34,
      padding: "0 13px",
      border: "none",
      background: "var(--color-primary)",
      color: "#fff",
      borderRadius: "var(--radius-button)",
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Plus",
    size: 16,
    color: "#fff"
  }), "Add task")));
}
const EmptyState = ({
  label
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    padding: "60px 20px",
    textAlign: "center",
    background: "var(--surface)",
    border: "1px dashed var(--border-strong)",
    borderRadius: "var(--radius-card)",
    color: "var(--text-muted)"
  }
}, /*#__PURE__*/React.createElement(Icon, {
  name: "SearchX",
  size: 24,
  color: "var(--text-muted)",
  style: {
    margin: "0 auto 10px"
  }
}), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 13.5,
    fontWeight: 600,
    color: "var(--text-secondary)"
  }
}, "No tasks match"), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 13,
    marginTop: 2
  }
}, label));

/* ============================ Add-task modal ============================ */
function Field({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      color: "var(--text-muted)"
    }
  }, label), children);
}
const selectStyle = {
  height: 38,
  padding: "0 11px",
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-button)",
  fontFamily: "var(--font-sans)",
  fontSize: 14,
  color: "var(--text-primary)",
  outline: "none",
  appearance: "none",
  cursor: "pointer"
};
function AddTaskModal({
  preset,
  onClose,
  onCreate
}) {
  const [title, setTitle] = React.useState("");
  const [status, setStatus] = React.useState(preset.status || "To do");
  const [priority, setPriority] = React.useState(preset.priority || "Medium");
  const [assignee, setAssignee] = React.useState(preset.assignee || WORKO_DATA.user.name);
  const [due, setDue] = React.useState(toInputDate(preset.due || TODAY));
  const submit = () => {
    if (title.trim()) onCreate({
      title: title.trim(),
      status,
      priority,
      assignee,
      due: new Date(due + "T00:00:00")
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(15,23,42,0.4)",
      backdropFilter: "blur(2px)",
      animation: "pdFade var(--dur-fast) var(--ease-out)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 468,
      maxWidth: "100%",
      background: "var(--surface)",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-xl)",
      animation: "pdPop var(--dur-base) var(--ease-out)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      padding: "18px 22px",
      borderBottom: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "SquarePen",
    size: 18,
    color: "var(--color-primary)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 10,
      fontSize: 16,
      fontWeight: 700,
      color: "var(--text-primary)"
    }
  }, "New task"), /*#__PURE__*/React.createElement(DIconBtn, {
    label: "Close",
    variant: "ghost",
    size: "sm",
    onClick: onClose,
    style: {
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "X",
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 22,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Task name"
  }, /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    value: title,
    onChange: e => setTitle(e.target.value),
    placeholder: "What needs to get done?",
    onKeyDown: e => {
      if (e.key === "Enter") submit();
    },
    style: {
      height: 42,
      padding: "0 13px",
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-button)",
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      fontWeight: 500,
      color: "var(--text-primary)",
      outline: "none"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Status"
  }, /*#__PURE__*/React.createElement("select", {
    value: status,
    onChange: e => setStatus(e.target.value),
    style: selectStyle
  }, STATUS_ORDER.map(s => /*#__PURE__*/React.createElement("option", {
    key: s
  }, s)))), /*#__PURE__*/React.createElement(Field, {
    label: "Priority"
  }, /*#__PURE__*/React.createElement("select", {
    value: priority,
    onChange: e => setPriority(e.target.value),
    style: selectStyle
  }, PRIORITY_ORDER.map(s => /*#__PURE__*/React.createElement("option", {
    key: s
  }, s)))), /*#__PURE__*/React.createElement(Field, {
    label: "Assignee"
  }, /*#__PURE__*/React.createElement("select", {
    value: assignee,
    onChange: e => setAssignee(e.target.value),
    style: selectStyle
  }, ASSIGNEES.map(s => /*#__PURE__*/React.createElement("option", {
    key: s
  }, s)))), /*#__PURE__*/React.createElement(Field, {
    label: "Due date"
  }, /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: due,
    onChange: e => setDue(e.target.value),
    style: selectStyle
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 10,
      padding: "16px 22px",
      borderTop: "1px solid var(--border)",
      background: "var(--bg-app)"
    }
  }, /*#__PURE__*/React.createElement(DButton, {
    variant: "ghost",
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/React.createElement(DButton, {
    variant: "primary",
    onClick: submit,
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "Plus",
      size: 16,
      color: "#fff"
    })
  }, "Create task"))));
}

/* ============================ Task drawer ============================ */
const drawerSelect = {
  height: 32,
  padding: "0 8px",
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  fontFamily: "var(--font-sans)",
  fontSize: 13.5,
  fontWeight: 600,
  color: "var(--text-primary)",
  outline: "none",
  cursor: "pointer",
  appearance: "none"
};
let checkSeq = 1;
function ChecklistItem({
  item,
  onToggle,
  onLabel,
  onDelete,
  onDragStart,
  onDragEnter,
  onDragEnd,
  dragging,
  dropTarget
}) {
  const [hover, setHover] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const h = e => {
      if (ref.current && !ref.current.contains(e.target)) setMenu(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    onDragEnter: onDragEnter,
    onDragOver: e => e.preventDefault(),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setMenu(false);
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "4px 4px",
      borderRadius: 8,
      position: "relative",
      background: hover ? "var(--bg-app)" : "transparent",
      opacity: dragging ? 0.4 : 1,
      borderTop: dropTarget ? "2px solid var(--color-primary)" : "2px solid transparent",
      transition: "background var(--dur-fast) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    draggable: true,
    onDragStart: onDragStart,
    onDragEnd: onDragEnd,
    title: "Drag to reorder",
    style: {
      display: "flex",
      cursor: "grab",
      color: "var(--text-muted)",
      opacity: hover ? 1 : 0,
      transition: "opacity var(--dur-fast) var(--ease-out)",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "GripVertical",
    size: 15
  })), /*#__PURE__*/React.createElement("span", {
    onClick: onToggle,
    style: {
      width: 19,
      height: 19,
      borderRadius: "50%",
      flexShrink: 0,
      cursor: "pointer",
      border: item.done ? "none" : "2px solid var(--border-strong)",
      background: item.done ? "var(--color-success)" : "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, item.done && /*#__PURE__*/React.createElement(Icon, {
    name: "Check",
    size: 12,
    color: "#fff"
  })), editing ? /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    defaultValue: item.label,
    onBlur: e => {
      onLabel(e.target.value.trim() || item.label);
      setEditing(false);
    },
    onKeyDown: e => {
      if (e.key === "Enter") e.currentTarget.blur();
      if (e.key === "Escape") setEditing(false);
    },
    style: {
      flex: 1,
      padding: "3px 6px",
      fontSize: 13.5,
      fontFamily: "var(--font-sans)",
      border: "1px solid var(--color-primary)",
      borderRadius: 6,
      outline: "none",
      color: "var(--text-primary)"
    }
  }) : /*#__PURE__*/React.createElement("span", {
    onClick: () => setEditing(true),
    style: {
      flex: 1,
      fontSize: 13.5,
      lineHeight: 1.4,
      cursor: "text",
      color: item.done ? "var(--text-muted)" : "var(--text-primary)",
      textDecoration: item.done ? "line-through" : "none"
    }
  }, item.label), /*#__PURE__*/React.createElement("button", {
    onClick: () => setMenu(m => !m),
    style: {
      display: "flex",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "var(--text-muted)",
      padding: 3,
      borderRadius: 6,
      opacity: hover ? 1 : 0,
      transition: "opacity var(--dur-fast) var(--ease-out)",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "MoreHorizontal",
    size: 16
  })), menu && /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: "absolute",
      right: 4,
      top: "calc(100% - 2px)",
      zIndex: 10,
      minWidth: 134,
      padding: 5,
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 10,
      boxShadow: "var(--shadow-lg)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setEditing(true);
      setMenu(false);
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      width: "100%",
      textAlign: "left",
      padding: "7px 9px",
      border: "none",
      borderRadius: 7,
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      fontWeight: 500,
      color: "var(--text-primary)",
      background: "transparent"
    },
    onMouseEnter: e => e.currentTarget.style.background = "var(--bg-app)",
    onMouseLeave: e => e.currentTarget.style.background = "transparent"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Pencil",
    size: 14,
    color: "var(--text-muted)"
  }), "Rename"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      onDelete();
      setMenu(false);
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      width: "100%",
      textAlign: "left",
      padding: "7px 9px",
      border: "none",
      borderRadius: 7,
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      fontWeight: 500,
      color: "var(--color-error, #DC2626)",
      background: "transparent"
    },
    onMouseEnter: e => e.currentTarget.style.background = "var(--bg-app)",
    onMouseLeave: e => e.currentTarget.style.background = "transparent"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Trash2",
    size: 14,
    color: "var(--color-error, #DC2626)"
  }), "Delete")));
}
function TaskDrawer({
  task,
  onClose
}) {
  const d = WORKO_DATA.taskDetail;
  const [subs, setSubs] = React.useState(() => d.subtasks.map(s => ({
    ...s,
    id: "c" + checkSeq++
  })));
  const [assignee, setAssignee] = React.useState(task?.assignee || d.assignee);
  const [priority, setPriority] = React.useState(task?.priority || d.priority);
  const [status, setStatus] = React.useState(task?.status || d.status);
  const [due, setDue] = React.useState(toInputDate(task?.due || TODAY));
  const drag = React.useRef(null);
  const [dragId, setDragId] = React.useState(null);
  const [overId, setOverId] = React.useState(null);
  const toggle = id => setSubs(arr => arr.map(s => s.id === id ? {
    ...s,
    done: !s.done
  } : s));
  const setLabel = (id, label) => setSubs(arr => arr.map(s => s.id === id ? {
    ...s,
    label
  } : s));
  const remove = id => setSubs(arr => arr.filter(s => s.id !== id));
  const addItem = label => setSubs(arr => [...arr, {
    id: "c" + checkSeq++,
    label,
    done: false
  }]);
  const reorder = () => {
    if (!drag.current || drag.current.from === drag.current.to) return;
    setSubs(arr => {
      const next = arr.slice();
      const fromIdx = next.findIndex(s => s.id === drag.current.from);
      const toIdx = next.findIndex(s => s.id === drag.current.to);
      if (fromIdx < 0 || toIdx < 0) return arr;
      const [moved] = next.splice(fromIdx, 1);
      next.splice(toIdx, 0, moved);
      return next;
    });
  };
  const doneCount = subs.filter(s => s.done).length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 30,
      display: "flex",
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(15,23,42,0.28)",
      backdropFilter: "blur(1px)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 440,
      height: "100%",
      background: "var(--surface)",
      boxShadow: "var(--shadow-xl)",
      overflow: "auto",
      animation: "drawerIn var(--dur-slow) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 24px",
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: status,
    onChange: e => setStatus(e.target.value),
    style: {
      ...drawerSelect,
      height: 30,
      fontSize: 12.5,
      fontWeight: 700,
      color: "var(--color-primary)",
      background: "var(--color-primary-light)",
      border: "1px solid transparent"
    }
  }, STATUS_ORDER.map(s => /*#__PURE__*/React.createElement("option", {
    key: s
  }, s))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: "var(--text-muted)",
      display: "flex",
      alignItems: "center",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Check",
    size: 14,
    color: "var(--color-success)"
  }), "Auto-saved"), /*#__PURE__*/React.createElement(DIconBtn, {
    label: "Close",
    variant: "ghost",
    size: "sm",
    onClick: onClose,
    style: {
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "X",
    size: 18
  }))), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: "-0.02em",
      lineHeight: 1.25,
      color: "var(--text-primary)"
    }
  }, task?.title || d.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      rowGap: 10,
      columnGap: 16,
      alignItems: "center",
      fontSize: 13.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)"
    }
  }, "Assignee"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(DAvatar, {
    name: assignee,
    size: "xs"
  }), /*#__PURE__*/React.createElement("select", {
    value: assignee,
    onChange: e => setAssignee(e.target.value),
    style: {
      ...drawerSelect,
      flex: 1
    }
  }, ASSIGNEES.map(a => /*#__PURE__*/React.createElement("option", {
    key: a
  }, a)))), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)"
    }
  }, "Priority"), /*#__PURE__*/React.createElement("select", {
    value: priority,
    onChange: e => setPriority(e.target.value),
    style: {
      ...drawerSelect,
      width: 140
    }
  }, PRIORITY_ORDER.map(p => /*#__PURE__*/React.createElement("option", {
    key: p
  }, p))), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)"
    }
  }, "Due"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: due,
    onChange: e => setDue(e.target.value),
    style: {
      ...drawerSelect,
      width: 160
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      color: "var(--text-muted)",
      marginBottom: 7
    }
  }, "Description"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      lineHeight: 1.6,
      color: "var(--text-secondary)"
    }
  }, d.description)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      color: "var(--text-muted)"
    }
  }, "Checklist \xB7 ", doneCount, "/", subs.length)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    },
    onDrop: e => {
      e.preventDefault();
      reorder();
      setDragId(null);
      setOverId(null);
      drag.current = null;
    },
    onDragOver: e => e.preventDefault()
  }, subs.map(s => /*#__PURE__*/React.createElement(ChecklistItem, {
    key: s.id,
    item: s,
    dragging: dragId === s.id,
    dropTarget: overId === s.id && dragId !== s.id,
    onToggle: () => toggle(s.id),
    onLabel: v => setLabel(s.id, v),
    onDelete: () => remove(s.id),
    onDragStart: e => {
      e.dataTransfer.effectAllowed = "move";
      drag.current = {
        from: s.id,
        to: s.id
      };
      setDragId(s.id);
    },
    onDragEnter: () => {
      if (drag.current) {
        drag.current.to = s.id;
        setOverId(s.id);
      }
    },
    onDragEnd: () => {
      setDragId(null);
      setOverId(null);
      drag.current = null;
    }
  }))), /*#__PURE__*/React.createElement(ChecklistAdd, {
    onAdd: addItem
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg-app)",
      borderRadius: "var(--radius-card)",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Sparkles",
    size: 16,
    color: "var(--color-accent)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      fontWeight: 700,
      color: "var(--text-primary)"
    }
  }, "WORKO assistant")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, d.aiSteps.map((s, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      width: "100%",
      textAlign: "left",
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 10,
      padding: "10px 12px",
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      fontSize: 13.5,
      fontWeight: 500,
      color: "var(--text-primary)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Wand2",
    size: 15,
    color: "var(--color-primary)"
  }), s)))))));
}
function ChecklistAdd({
  onAdd
}) {
  const [open, setOpen] = React.useState(false);
  const [v, setV] = React.useState("");
  if (!open) return /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(true),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      marginTop: 6,
      padding: "5px 4px",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      fontWeight: 600,
      color: "var(--text-muted)"
    },
    onMouseEnter: e => e.currentTarget.style.color = "var(--text-secondary)",
    onMouseLeave: e => e.currentTarget.style.color = "var(--text-muted)"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Plus",
    size: 15
  }), "Add checklist item");
  return /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    value: v,
    placeholder: "Checklist item, then Enter",
    onChange: e => setV(e.target.value),
    onKeyDown: e => {
      if (e.key === "Enter" && v.trim()) {
        onAdd(v.trim());
        setV("");
      }
      if (e.key === "Escape") {
        setOpen(false);
        setV("");
      }
    },
    onBlur: () => {
      if (!v.trim()) setOpen(false);
    },
    style: {
      width: "100%",
      marginTop: 8,
      height: 34,
      padding: "0 11px",
      background: "var(--surface)",
      border: "1px solid var(--color-primary)",
      borderRadius: 9,
      fontFamily: "var(--font-sans)",
      fontSize: 13.5,
      color: "var(--text-primary)",
      outline: "none"
    }
  });
}

/* ============================ Overview dashboard ============================ */
function StatTile({
  icon,
  tint,
  value,
  label,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-sm)",
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 36,
      height: 36,
      borderRadius: 10,
      background: tint + "1f",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 19,
    color: tint
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      fontWeight: 800,
      letterSpacing: "-0.02em",
      color: "var(--text-primary)",
      lineHeight: 1
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--text-secondary)",
      marginTop: 5
    }
  }, label), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)",
      marginTop: 2
    }
  }, sub));
}
function Panel({
  title,
  action,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-sm)",
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14.5,
      fontWeight: 700,
      color: "var(--text-primary)"
    }
  }, title), action && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontSize: 12.5,
      fontWeight: 600,
      color: "var(--color-primary)",
      cursor: "pointer"
    }
  }, action)), children);
}
function OverviewView({
  p,
  tasks,
  onOpenTask
}) {
  const total = tasks.length;
  const done = tasks.filter(t => t.status === "Done").length;
  const inProg = tasks.filter(t => t.status === "In progress").length;
  const weekEnd = new Date(TL_BASE);
  weekEnd.setDate(weekEnd.getDate() + 6);
  const dueWeek = tasks.filter(t => t.status !== "Done" && t.due <= weekEnd).length;
  const statusCounts = STATUS_ORDER.map(s => ({
    s,
    n: tasks.filter(t => t.status === s).length
  }));
  const workload = ASSIGNEES.map(a => ({
    a,
    n: tasks.filter(t => t.assignee === a).length
  })).filter(w => w.n > 0).sort((x, y) => y.n - x.n);
  const maxLoad = Math.max(1, ...workload.map(w => w.n));
  const upcoming = tasks.filter(t => t.status !== "Done").sort((a, b) => a.due - b.due).slice(0, 5);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg, var(--color-primary), #6366F1)",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-sm)",
      padding: 18,
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontSize: 13,
      fontWeight: 600,
      opacity: 0.9
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Target",
    size: 16,
    color: "#fff"
  }), "Project progress"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 38,
      fontWeight: 800,
      letterSpacing: "-0.02em",
      lineHeight: 1
    }
  }, p.progress, "%"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 7,
      borderRadius: 999,
      background: "rgba(255,255,255,0.28)",
      marginTop: 12,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${p.progress}%`,
      height: "100%",
      background: "#fff",
      borderRadius: 999
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      opacity: 0.92,
      marginTop: 9
    }
  }, done, " of ", total, " tasks complete"))), /*#__PURE__*/React.createElement(StatTile, {
    icon: "ListTodo",
    tint: "#4F46E5",
    value: total,
    label: "Total tasks",
    sub: `${total - done} still open`
  }), /*#__PURE__*/React.createElement(StatTile, {
    icon: "Loader",
    tint: "#06B6D4",
    value: inProg,
    label: "In progress",
    sub: "Active right now"
  }), /*#__PURE__*/React.createElement(StatTile, {
    icon: "CalendarClock",
    tint: "#F59E0B",
    value: dueWeek,
    label: "Due this week",
    sub: "Through Jun 14"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "Tasks by status",
    action: "View board"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: 12,
      borderRadius: 999,
      overflow: "hidden",
      marginBottom: 16
    }
  }, statusCounts.filter(x => x.n).map(x => /*#__PURE__*/React.createElement("div", {
    key: x.s,
    style: {
      flex: x.n,
      background: COLUMN_DOT[x.s]
    },
    title: `${x.s}: ${x.n}`
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "10px 18px"
    }
  }, statusCounts.map(x => /*#__PURE__*/React.createElement("div", {
    key: x.s,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: "50%",
      background: COLUMN_DOT[x.s]
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--text-secondary)",
      flex: 1
    }
  }, x.s), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "var(--text-primary)"
    }
  }, x.n))))), /*#__PURE__*/React.createElement(Panel, {
    title: "Workload by assignee"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 13
    }
  }, workload.map(w => /*#__PURE__*/React.createElement("div", {
    key: w.a,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11
    }
  }, /*#__PURE__*/React.createElement(DAvatar, {
    name: w.a,
    size: "xs"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--text-primary)",
      width: 96,
      flexShrink: 0
    }
  }, w.a), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 8,
      borderRadius: 999,
      background: "var(--bg-app)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${w.n / maxLoad * 100}%`,
      height: "100%",
      borderRadius: 999,
      background: ASSIGNEE_COLOR[w.a]
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "var(--text-secondary)",
      width: 16,
      textAlign: "right"
    }
  }, w.n)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "Upcoming deadlines"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, upcoming.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    onClick: () => onOpenTask(t),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "11px 0",
      cursor: "pointer",
      borderTop: i ? "1px solid var(--border)" : "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: 44,
      height: 44,
      borderRadius: 10,
      background: "var(--bg-app)",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      textTransform: "uppercase",
      color: "var(--text-muted)",
      lineHeight: 1
    }
  }, MON[t.due.getMonth()]), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 17,
      fontWeight: 800,
      color: "var(--text-primary)",
      lineHeight: 1.1
    }
  }, t.due.getDate())), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 600,
      color: "var(--text-primary)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, t.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginTop: 3,
      fontSize: 12,
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: COLUMN_DOT[t.status]
    }
  }), t.status)), /*#__PURE__*/React.createElement(DBadge, {
    tone: PRIORITY_TONE[t.priority]
  }, t.priority), /*#__PURE__*/React.createElement(DAvatar, {
    name: t.assignee,
    size: "xs"
  }))))), /*#__PURE__*/React.createElement(Panel, {
    title: "Recent activity"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, WORKO_DATA.taskDetail.activity.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 11,
      padding: "11px 0",
      borderTop: i ? "1px solid var(--border)" : "none"
    }
  }, /*#__PURE__*/React.createElement(DAvatar, {
    name: a.who,
    size: "xs"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      lineHeight: 1.45,
      color: "var(--text-secondary)"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--text-primary)",
      fontWeight: 600
    }
  }, a.who), " ", a.what, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--text-muted)",
      marginTop: 1
    }
  }, a.when))))))));
}

/* ============================ shell ============================ */
function ProjectDetail({
  project,
  onBack,
  initialView
}) {
  const p = project || WORKO_DATA.projects[0];
  const [view, setView] = React.useState(initialView || "overview");
  const [tasks, setTasks] = React.useState(INITIAL_TASKS);
  const [openTask, setOpenTask] = React.useState(null);
  const [completed, setCompleted] = React.useState({});
  const [modal, setModal] = React.useState(null);
  const toggleDone = id => setCompleted(c => ({
    ...c,
    [id]: !c[id]
  }));
  const f = useTaskFilter(tasks);
  const addTask = partial => {
    const due = partial.due ? new Date(partial.due) : new Date(TODAY);
    const len = partial.len || 2;
    setTasks(ts => [...ts, {
      id: "t" + idSeq++,
      title: partial.title || "Untitled task",
      status: partial.status || "To do",
      priority: partial.priority || "Medium",
      assignee: partial.assignee || WORKO_DATA.user.name,
      ai: false,
      len,
      start: startFromDue(due, len),
      due,
      scheduled: partial.scheduled !== false
    }]);
  };
  const updateTask = (id, patch) => setTasks(ts => ts.map(t => t.id === id ? {
    ...t,
    ...patch
  } : t));
  const applyGroup = (id, value) => updateTask(id, {
    [groupMeta(f.groupBy).field]: value
  });
  const schedule = (id, due) => setTasks(ts => ts.map(t => t.id === id ? {
    ...t,
    due,
    start: startFromDue(due, t.len),
    scheduled: true
  } : t));
  const reschedule = (id, start) => setTasks(ts => ts.map(t => t.id === id ? {
    ...t,
    start,
    due: idxToDue(start + t.len - 1)
  } : t));
  const resize = (id, len) => setTasks(ts => ts.map(t => t.id === id ? {
    ...t,
    len,
    due: idxToDue(t.start + len - 1)
  } : t));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }
  }, openTask && /*#__PURE__*/React.createElement(TaskDrawer, {
    task: openTask,
    onClose: () => setOpenTask(null)
  }), modal && /*#__PURE__*/React.createElement(AddTaskModal, {
    preset: modal,
    onClose: () => setModal(null),
    onCreate: form => {
      addTask(form);
      setModal(null);
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 32px 0",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "var(--text-muted)",
      fontFamily: "var(--font-sans)",
      fontSize: 13.5,
      fontWeight: 600,
      padding: 0,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ChevronLeft",
    size: 16
  }), "All projects"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 16,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 46,
      height: 46,
      borderRadius: 13,
      background: p.color,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "FolderKanban",
    size: 22,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 26,
      fontWeight: 800,
      letterSpacing: "-0.025em",
      color: "var(--text-primary)"
    }
  }, p.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0",
      fontSize: 14,
      color: "var(--text-secondary)"
    }
  }, p.desc)), /*#__PURE__*/React.createElement(DAvatarGroup, {
    users: p.members.map(name => ({
      name
    })),
    max: 4,
    size: "sm"
  }), /*#__PURE__*/React.createElement(DButton, {
    variant: "secondary",
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "Plus",
      size: 17
    }),
    onClick: () => setModal({})
  }, "Add task")), /*#__PURE__*/React.createElement(DTabs, {
    value: view,
    onChange: setView,
    items: [{
      id: "overview",
      label: "Overview",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "LayoutDashboard",
        size: 16
      })
    }, {
      id: "list",
      label: "List",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "List",
        size: 16
      })
    }, {
      id: "board",
      label: "Board",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "Columns3",
        size: 16
      })
    }, {
      id: "calendar",
      label: "Calendar",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "Calendar",
        size: 16
      })
    }, {
      id: "timeline",
      label: "Timeline",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "GanttChart",
        size: 16
      })
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflow: "auto",
      padding: "20px 32px 36px"
    }
  }, view === "overview" && /*#__PURE__*/React.createElement(OverviewView, {
    p: p,
    tasks: tasks,
    onOpenTask: setOpenTask
  }), view !== "overview" && /*#__PURE__*/React.createElement(Toolbar, {
    f: f,
    count: f.filtered.length,
    showGroup: view !== "calendar",
    onAdd: () => setModal({})
  }), view === "list" && /*#__PURE__*/React.createElement(ListView, {
    f: f,
    completed: completed,
    onToggle: toggleDone,
    onOpenTask: setOpenTask,
    onAdd: addTask
  }), view === "board" && /*#__PURE__*/React.createElement(BoardView, {
    f: f,
    onOpenTask: setOpenTask,
    onApplyGroup: applyGroup,
    onAdd: addTask
  }), view === "calendar" && /*#__PURE__*/React.createElement(CalendarView, {
    f: f,
    onOpenTask: setOpenTask,
    onSchedule: schedule,
    onAdd: addTask
  }), view === "timeline" && /*#__PURE__*/React.createElement(TimelineView, {
    f: f,
    onOpenTask: setOpenTask,
    onReschedule: reschedule,
    onResize: resize,
    onAdd: addTask
  })));
}
window.ProjectDetail = ProjectDetail;
window.TaskDrawer = TaskDrawer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/ProjectDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/ProjectViews.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* WORKO Project Detail — the four interactive task views (Board, List, Calendar, Timeline).
   Shared model + helpers (TASKS, COLUMN_DOT, groupTasks, Tip, QuickAdd, MiniInput, …) come
   from ProjectDetail.jsx via the shared script scope. */

/* ============================ Board view ============================ */
function TaskCard({
  task,
  onOpen,
  dragging,
  onDragStart,
  onDragEnd
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement(Tip, {
    task: task,
    style: {
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("div", {
    draggable: true,
    onDragStart: onDragStart,
    onDragEnd: onDragEnd,
    onClick: onOpen,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 12,
      boxShadow: hover ? "var(--shadow-md)" : "var(--shadow-xs)",
      padding: 13,
      cursor: "grab",
      transition: "box-shadow var(--dur-fast) var(--ease-out)",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      opacity: dragging ? 0.4 : 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 600,
      lineHeight: 1.4,
      color: "var(--text-primary)"
    }
  }, task.title), task.ai && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 11.5,
      fontWeight: 600,
      color: "var(--cyan-600)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Sparkles",
    size: 13,
    color: "var(--cyan-600)"
  }), "AI suggested next"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(DBadge, {
    tone: PRIORITY_TONE[task.priority]
  }, task.priority), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      fontSize: 11.5,
      color: "var(--text-muted)",
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Calendar",
    size: 12,
    color: "var(--text-muted)"
  }), fmtDate(task.due))), /*#__PURE__*/React.createElement(DAvatar, {
    name: task.assignee,
    size: "xs"
  }))));
}
function BoardView({
  f,
  onOpenTask,
  onApplyGroup,
  onAdd
}) {
  const gb = f.groupBy === "none" ? "status" : f.groupBy;
  const meta = groupMeta(gb);
  const [drag, setDrag] = React.useState(null); // task id being dragged
  const [over, setOver] = React.useState(null); // column hovered

  const map = {};
  f.filtered.forEach(t => {
    const k = meta.key(t);
    (map[k] = map[k] || []).push(t);
  });
  const cols = (gb === "assignee" ? meta.order.filter(k => map[k]) : meta.order).slice();
  Object.keys(map).forEach(k => {
    if (!cols.includes(k)) cols.push(k);
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      alignItems: "flex-start",
      overflowX: "auto",
      paddingBottom: 8
    }
  }, cols.map(col => {
    const tasks = map[col] || [];
    const isOver = over === col;
    return /*#__PURE__*/React.createElement("div", {
      key: col,
      onDragOver: e => {
        e.preventDefault();
        if (over !== col) setOver(col);
      },
      onDragLeave: e => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOver(o => o === col ? null : o);
      },
      onDrop: e => {
        e.preventDefault();
        const id = e.dataTransfer.getData("text/plain");
        if (id) onApplyGroup(id, col);
        setOver(null);
        setDrag(null);
      },
      style: {
        width: 264,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: 8,
        borderRadius: 14,
        background: isOver ? "var(--indigo-50, #EEF2FF)" : "transparent",
        outline: isOver ? "1.5px dashed var(--color-primary)" : "1.5px dashed transparent",
        transition: "background var(--dur-fast) var(--ease-out)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "2px 4px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: meta.color(col)
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "var(--text-primary)"
      }
    }, col), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-muted)",
        fontWeight: 600
      }
    }, tasks.length)), tasks.map(t => /*#__PURE__*/React.createElement(TaskCard, {
      key: t.id,
      task: t,
      dragging: drag === t.id,
      onDragStart: e => {
        e.dataTransfer.setData("text/plain", t.id);
        e.dataTransfer.effectAllowed = "move";
        setDrag(t.id);
      },
      onDragEnd: () => {
        setDrag(null);
        setOver(null);
      },
      onOpen: () => onOpenTask(t)
    })), /*#__PURE__*/React.createElement(QuickAdd, {
      onAdd: title => onAdd({
        title,
        [meta.field]: col
      })
    }));
  }));
}

/* ============================ List view ============================ */
function ListRow({
  task,
  done,
  onToggle,
  onOpen
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onOpen,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 130px 92px 96px 40px",
      gap: 14,
      alignItems: "center",
      padding: "12px 18px",
      borderTop: "1px solid var(--border)",
      cursor: "pointer",
      background: hover ? "var(--bg-app)" : "transparent",
      transition: "background var(--dur-fast) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: e => {
      e.stopPropagation();
      onToggle();
    },
    style: {
      width: 20,
      height: 20,
      borderRadius: "50%",
      flexShrink: 0,
      cursor: "pointer",
      border: done ? "none" : "2px solid var(--border-strong)",
      background: done ? "var(--color-success)" : "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, done && /*#__PURE__*/React.createElement(Icon, {
    name: "Check",
    size: 13,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 500,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      color: done ? "var(--text-muted)" : "var(--text-primary)",
      textDecoration: done ? "line-through" : "none"
    }
  }, task.title), task.ai && /*#__PURE__*/React.createElement(Icon, {
    name: "Sparkles",
    size: 14,
    color: "var(--cyan-600)",
    style: {
      flexShrink: 0
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      fontSize: 13,
      color: "var(--text-secondary)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: COLUMN_DOT[task.status]
    }
  }), task.status), /*#__PURE__*/React.createElement(DBadge, {
    tone: PRIORITY_TONE[task.priority]
  }, task.priority), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: "var(--text-muted)",
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Calendar",
    size: 13,
    color: "var(--text-muted)"
  }), fmtDate(task.due)), /*#__PURE__*/React.createElement(DAvatar, {
    name: task.assignee,
    size: "xs"
  }));
}
function ListView({
  f,
  completed,
  onToggle,
  onOpenTask,
  onAdd
}) {
  if (!f.filtered.length) return /*#__PURE__*/React.createElement(EmptyState, {
    label: "Try clearing search or filters."
  });
  const groups = groupTasks(f.filtered, f.groupBy);
  const meta = groupMeta(f.groupBy === "none" ? "status" : f.groupBy);
  const doneCount = f.filtered.filter(t => completed[t.id]).length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-sm)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 130px 92px 96px 40px",
      gap: 14,
      padding: "11px 18px",
      borderBottom: "1px solid var(--border)",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "Task \xB7 ", doneCount, "/", f.filtered.length, " done"), /*#__PURE__*/React.createElement("span", null, "Status"), /*#__PURE__*/React.createElement("span", null, "Priority"), /*#__PURE__*/React.createElement("span", null, "Due"), /*#__PURE__*/React.createElement("span", null)), groups.map(([label, tasks]) => /*#__PURE__*/React.createElement("div", {
    key: label
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "9px 18px",
      background: "var(--bg-app)"
    }
  }, f.groupBy !== "none" && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: meta.color(label)
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 700,
      color: "var(--text-secondary)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)",
      fontWeight: 600
    }
  }, tasks.length)), tasks.map(t => /*#__PURE__*/React.createElement(ListRow, {
    key: t.id,
    task: t,
    done: !!completed[t.id],
    onToggle: () => onToggle(t.id),
    onOpen: () => onOpenTask(t)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border)",
      padding: "4px 12px"
    }
  }, /*#__PURE__*/React.createElement(QuickAdd, {
    onAdd: title => onAdd({
      title,
      [meta.field]: f.groupBy === "none" ? undefined : label
    })
  })))));
}

/* ============================ Calendar view ============================ */
function CalChip({
  task,
  onOpen
}) {
  return /*#__PURE__*/React.createElement(Tip, {
    task: task,
    style: {
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("div", {
    draggable: true,
    onDragStart: e => {
      e.dataTransfer.setData("text/plain", task.id);
      e.dataTransfer.effectAllowed = "move";
    },
    onClick: e => {
      e.stopPropagation();
      onOpen(task);
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "4px 7px",
      borderRadius: 7,
      cursor: "grab",
      background: "var(--bg-app)",
      borderLeft: `3px solid ${COLUMN_DOT[task.status]}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      fontWeight: 600,
      color: "var(--text-primary)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, task.title)));
}
function MonthCell({
  date,
  tasks,
  isToday,
  isOver,
  onOpen,
  onDrop,
  onOver,
  onLeave,
  adding,
  setAdding,
  onAdd
}) {
  return /*#__PURE__*/React.createElement("div", {
    onDragOver: e => {
      if (date) {
        e.preventDefault();
        onOver();
      }
    },
    onDragLeave: onLeave,
    onDrop: e => {
      e.preventDefault();
      const id = e.dataTransfer.getData("text/plain");
      if (id && date) onDrop(id, date);
    },
    onClick: () => date && setAdding(date),
    style: {
      minHeight: 108,
      padding: 7,
      borderBottom: "1px solid var(--border)",
      cursor: date ? "pointer" : "default",
      borderRight: "1px solid var(--border)",
      background: !date ? "var(--bg-app)" : isOver ? "var(--indigo-50, #EEF2FF)" : isToday ? "var(--indigo-50, #EEF2FF)" : "var(--surface)",
      outline: isOver ? "1.5px dashed var(--color-primary)" : "none",
      outlineOffset: -2
    }
  }, date && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: 22,
      height: 22,
      padding: "0 5px",
      borderRadius: 7,
      fontSize: 12.5,
      fontWeight: isToday ? 700 : 600,
      color: isToday ? "#fff" : "var(--text-secondary)",
      background: isToday ? "var(--color-primary)" : "transparent",
      marginBottom: 5
    }
  }, date.getDate()), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, tasks.map(t => /*#__PURE__*/React.createElement(CalChip, {
    key: t.id,
    task: t,
    onOpen: onOpen
  }))), date && adding && sameDay(adding, date) && /*#__PURE__*/React.createElement(MiniInput, {
    onSubmit: title => onAdd({
      title,
      due: date
    }),
    onClose: () => setAdding(null)
  }));
}
function DayColumn({
  date,
  tasks,
  isToday,
  isOver,
  onOpen,
  onDrop,
  onOver,
  onLeave,
  adding,
  setAdding,
  onAdd,
  flex
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: flex || 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      borderRight: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "9px 12px",
      borderBottom: "1px solid var(--border)",
      background: isToday ? "var(--indigo-50, #EEF2FF)" : "var(--surface)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      color: isToday ? "var(--color-primary)" : "var(--text-muted)"
    }
  }, DOW[date.getDay()]), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: isToday ? "var(--color-primary)" : "var(--text-primary)"
    }
  }, date.getDate())), /*#__PURE__*/React.createElement("div", {
    onDragOver: e => {
      e.preventDefault();
      onOver();
    },
    onDragLeave: onLeave,
    onDrop: e => {
      e.preventDefault();
      const id = e.dataTransfer.getData("text/plain");
      if (id) onDrop(id, date);
    },
    onClick: () => setAdding(date),
    style: {
      flex: 1,
      minHeight: 300,
      padding: 8,
      display: "flex",
      flexDirection: "column",
      gap: 5,
      cursor: "pointer",
      background: isOver ? "var(--indigo-50, #EEF2FF)" : "transparent"
    }
  }, tasks.map(t => /*#__PURE__*/React.createElement(CalChip, {
    key: t.id,
    task: t,
    onOpen: onOpen
  })), adding && sameDay(adding, date) && /*#__PURE__*/React.createElement(MiniInput, {
    onSubmit: title => onAdd({
      title,
      due: date
    }),
    onClose: () => setAdding(null)
  })));
}
function CalendarView({
  f,
  onOpenTask,
  onSchedule,
  onAdd
}) {
  const [mode, setMode] = React.useState("month");
  const [showBacklog, setShowBacklog] = React.useState(false);
  const [adding, setAdding] = React.useState(null);
  const [over, setOver] = React.useState(null);
  const scheduled = f.filtered.filter(t => t.scheduled !== false);
  const backlog = f.filtered.filter(t => t.scheduled === false);
  const tasksOn = d => scheduled.filter(t => sameDay(t.due, d));

  // month cells
  const first = new Date(2026, 5, 1),
    lead = first.getDay(),
    daysIn = 30;
  const cells = [];
  for (let i = 0; i < lead; i++) cells.push(null);
  for (let d = 1; d <= daysIn; d++) cells.push(new Date(2026, 5, d));
  while (cells.length % 7 !== 0) cells.push(null);
  const weekDays = Array.from({
    length: 7
  }, (_, i) => {
    const d = sundayOf(TODAY);
    d.setDate(d.getDate() + i);
    return d;
  });
  const cellProps = date => ({
    isOver: over && date && sameDay(over, date),
    isToday: sameDay(date, TODAY),
    onOpen: onOpenTask,
    onDrop: onSchedule,
    onOver: () => setOver(date),
    onLeave: () => setOver(null),
    adding,
    setAdding,
    onAdd
  });
  const SegBtn = ({
    id,
    label
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: () => setMode(id),
    style: {
      height: 30,
      padding: "0 13px",
      border: "none",
      borderRadius: 8,
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      fontWeight: 600,
      background: mode === id ? "var(--surface)" : "transparent",
      color: mode === id ? "var(--color-primary)" : "var(--text-muted)",
      boxShadow: mode === id ? "var(--shadow-xs)" : "none"
    }
  }, label);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      alignItems: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-sm)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "13px 18px",
      borderBottom: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: "var(--text-primary)"
    }
  }, mode === "day" ? `${MON[TODAY.getMonth()]} ${TODAY.getDate()}, 2026` : "June 2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 8,
      border: "1px solid var(--border)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ChevronLeft",
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 8,
      border: "1px solid var(--border)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ChevronRight",
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 2,
      padding: 3,
      background: "var(--bg-app)",
      borderRadius: 11,
      marginLeft: 4
    }
  }, /*#__PURE__*/React.createElement(SegBtn, {
    id: "month",
    label: "Month"
  }), /*#__PURE__*/React.createElement(SegBtn, {
    id: "week",
    label: "Week"
  }), /*#__PURE__*/React.createElement(SegBtn, {
    id: "day",
    label: "Day"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowBacklog(s => !s),
    style: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
      gap: 7,
      height: 32,
      padding: "0 12px",
      background: showBacklog ? "var(--indigo-50, #EEF2FF)" : "var(--surface)",
      border: `1px solid ${showBacklog ? "var(--color-primary)" : "var(--border)"}`,
      borderRadius: "var(--radius-button)",
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      fontWeight: 600,
      color: showBacklog ? "var(--color-primary)" : "var(--text-secondary)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "PanelRight",
    size: 15,
    color: showBacklog ? "var(--color-primary)" : "var(--text-muted)"
  }), "Unscheduled", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      padding: "1px 7px",
      borderRadius: 999,
      background: backlog.length ? "var(--color-primary)" : "var(--border)",
      color: backlog.length ? "#fff" : "var(--text-muted)"
    }
  }, backlog.length))), mode === "month" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)"
    }
  }, DOW.map(d => /*#__PURE__*/React.createElement("div", {
    key: d,
    style: {
      padding: "9px 12px",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      borderBottom: "1px solid var(--border)",
      borderRight: "1px solid var(--border)"
    }
  }, d)), cells.map((date, i) => /*#__PURE__*/React.createElement(MonthCell, _extends({
    key: i,
    date: date,
    tasks: date ? tasksOn(date) : []
  }, cellProps(date))))), mode === "week" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex"
    }
  }, weekDays.map((d, i) => /*#__PURE__*/React.createElement(DayColumn, _extends({
    key: i,
    date: d,
    tasks: tasksOn(d)
  }, cellProps(d))))), mode === "day" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(DayColumn, _extends({
    date: TODAY,
    tasks: tasksOn(TODAY),
    flex: 1
  }, cellProps(TODAY))))), showBacklog && /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 244,
      flexShrink: 0,
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-sm)",
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 700,
      color: "var(--text-primary)"
    }
  }, "Unscheduled"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)",
      marginTop: 2
    }
  }, "Drag a task onto a day to schedule it.")), backlog.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 8px",
      textAlign: "center",
      color: "var(--text-muted)",
      fontSize: 12.5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "CheckCheck",
    size: 20,
    color: "var(--text-muted)",
    style: {
      margin: "0 auto 8px"
    }
  }), "Everything's on the calendar."), backlog.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    draggable: true,
    onDragStart: e => {
      e.dataTransfer.setData("text/plain", t.id);
      e.dataTransfer.effectAllowed = "move";
    },
    onClick: () => onOpenTask(t),
    style: {
      border: "1px solid var(--border)",
      borderRadius: 10,
      padding: "10px 11px",
      cursor: "grab",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      borderLeft: `3px solid ${COLUMN_DOT[t.status]}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--text-primary)",
      lineHeight: 1.35
    }
  }, t.title), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement(DBadge, {
    tone: PRIORITY_TONE[t.priority]
  }, t.priority), /*#__PURE__*/React.createElement(DAvatar, {
    name: t.assignee,
    size: "xs"
  }))))));
}

/* ============================ Timeline view ============================ */
function TimelineView({
  f,
  onOpenTask,
  onReschedule,
  onResize,
  onAdd
}) {
  const dayW = 60,
    labelW = 232,
    rowH = 46;
  const days = React.useMemo(() => Array.from({
    length: TL_DAYS
  }, (_, i) => idxToDue(i)), []);
  const isWeekend = i => {
    const d = days[i].getDay();
    return d === 0 || d === 6;
  };
  const drag = React.useRef(null);
  const onMove = e => {
    const d = drag.current;
    if (!d) return;
    const delta = Math.round((e.clientX - d.startX) / dayW);
    if (delta !== 0) d.moved = true;
    if (d.type === "move") onReschedule(d.id, Math.max(0, Math.min(TL_DAYS - d.len, d.orig + delta)));else onResize(d.id, Math.max(1, Math.min(TL_DAYS - d.start, d.origLen + delta)));
  };
  const onUp = () => {
    const d = drag.current;
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    if (d && d.type === "move" && !d.moved) onOpenTask(d.task);
    drag.current = null;
  };
  const startMove = (e, t) => {
    e.preventDefault();
    drag.current = {
      type: "move",
      id: t.id,
      task: t,
      startX: e.clientX,
      orig: t.start,
      len: t.len,
      moved: false
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };
  const startResize = (e, t) => {
    e.preventDefault();
    e.stopPropagation();
    drag.current = {
      type: "resize",
      id: t.id,
      startX: e.clientX,
      start: t.start,
      origLen: t.len
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };
  if (!f.filtered.length) return /*#__PURE__*/React.createElement(EmptyState, {
    label: "Try clearing search or filters."
  });
  const groups = groupTasks(f.filtered, f.groupBy);
  const meta = groupMeta(f.groupBy === "none" ? "status" : f.groupBy);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      marginBottom: 12,
      fontSize: 12.5,
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "MousePointerClick",
    size: 14,
    color: "var(--text-muted)"
  }), "Drag a bar to move it \xB7 drag its right edge to resize \xB7 click to open"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-sm)",
      overflow: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: labelW + TL_DAYS * dayW
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      position: "sticky",
      top: 0,
      zIndex: 3,
      background: "var(--surface)",
      borderBottom: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: labelW,
      flexShrink: 0,
      padding: "12px 16px",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, "Task"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex"
    }
  }, days.map((d, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    style: {
      width: dayW,
      textAlign: "center",
      padding: "7px 0",
      borderLeft: "1px solid var(--border)",
      background: isWeekend(idx) ? "var(--bg-app)" : "transparent"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.03em",
      color: idx === TODAY_IDX ? "var(--color-primary)" : "var(--text-muted)"
    }
  }, DOW[d.getDay()]), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: idx === TODAY_IDX ? 700 : 600,
      color: idx === TODAY_IDX ? "var(--color-primary)" : "var(--text-primary)"
    }
  }, d.getDate()))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: labelW + TODAY_IDX * dayW + dayW / 2 - 1,
      width: 2,
      background: "var(--color-primary)",
      opacity: 0.35,
      zIndex: 2
    }
  }), groups.map(([label, tasks]) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: label
  }, f.groupBy !== "none" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "7px 16px",
      background: "var(--bg-app)",
      borderTop: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: meta.color(label)
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "var(--text-secondary)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: "var(--text-muted)",
      fontWeight: 600
    }
  }, tasks.length)), tasks.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    style: {
      display: "flex",
      alignItems: "center",
      height: rowH,
      borderTop: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: labelW,
      flexShrink: 0,
      padding: "0 16px",
      display: "flex",
      alignItems: "center",
      gap: 8,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: COLUMN_DOT[t.status],
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: "var(--text-primary)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, t.title)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: 1,
      height: "100%"
    }
  }, days.map((d, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    style: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: idx * dayW,
      width: dayW,
      borderLeft: "1px solid var(--border)",
      background: isWeekend(idx) ? "var(--bg-app)" : "transparent"
    }
  })), /*#__PURE__*/React.createElement(Tip, {
    task: t,
    place: "bottom",
    style: {
      position: "absolute",
      top: 9,
      height: rowH - 18,
      left: t.start * dayW + 4,
      width: t.len * dayW - 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    onPointerDown: e => startMove(e, t),
    style: {
      position: "relative",
      width: "100%",
      height: "100%",
      background: meta.color(f.groupBy === "none" || f.groupBy === "status" ? t.status : f.groupBy === "priority" ? t.priority : t.assignee),
      borderRadius: 8,
      cursor: "grab",
      display: "flex",
      alignItems: "center",
      padding: "0 10px",
      boxShadow: "var(--shadow-xs)",
      userSelect: "none",
      touchAction: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: "#fff",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, t.title), /*#__PURE__*/React.createElement("span", {
    onPointerDown: e => startResize(e, t),
    style: {
      position: "absolute",
      right: 0,
      top: 0,
      bottom: 0,
      width: 10,
      cursor: "ew-resize",
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8
    }
  })))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      height: rowH,
      borderTop: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: labelW,
      flexShrink: 0,
      padding: "0 10px"
    }
  }, /*#__PURE__*/React.createElement(QuickAdd, {
    onAdd: title => onAdd({
      title
    }),
    placeholder: "Add task"
  })))))));
}
window.BoardView = BoardView;
window.ListView = ListView;
window.CalendarView = CalendarView;
window.TimelineView = TimelineView;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/ProjectViews.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/data.jsx
try { (() => {
/* Mock data for the WORKO app UI kit. Not production data. */

const WORKO_DATA = {
  user: {
    name: "Maya Chen",
    role: "Product Lead"
  },
  today: {
    date: "Tuesday, June 9",
    progress: 72,
    done: 12,
    remaining: 5,
    streak: 5
  },
  focusTask: {
    title: "Draft the Q3 launch announcement",
    project: "Q3 Product Launch",
    estimate: "45 min",
    priority: "High"
  },
  coach: {
    message: "You're on a roll — three deep-work tasks done. This one's the last big lift before lunch.",
    nextStep: "Open last quarter's announcement as a reference, then outline three sections."
  },
  upNext: [{
    title: "Review Q3 roadmap with Sam",
    estimate: "20 min",
    priority: "Medium"
  }, {
    title: "Reply to design feedback",
    estimate: "10 min",
    priority: "Low"
  }, {
    title: "Approve final hero illustration",
    estimate: "5 min",
    priority: "Medium"
  }],
  projects: [{
    name: "Q3 Product Launch",
    desc: "Coordinate the launch announcement, assets, and rollout.",
    progress: 72,
    open: 5,
    members: ["Maya Chen", "Sam Ito", "Lee Roy", "Ana Diaz"],
    activity: "2h ago",
    color: "#4F46E5"
  }, {
    name: "Mobile App Redesign",
    desc: "Refresh the focus experience for iOS and Android.",
    progress: 38,
    open: 14,
    members: ["Sam Ito", "Priya N", "Tom B"],
    activity: "Yesterday",
    color: "#06B6D4"
  }, {
    name: "Onboarding Revamp",
    desc: "Shorten time-to-first-focus for new users.",
    progress: 91,
    open: 2,
    members: ["Ana Diaz", "Maya Chen"],
    activity: "3h ago",
    color: "#10B981"
  }, {
    name: "Q4 Planning",
    desc: "Set objectives and key results for next quarter.",
    progress: 15,
    open: 9,
    members: ["Maya Chen", "Lee Roy", "Sam Ito", "Priya N", "Tom B"],
    activity: "4d ago",
    color: "#F59E0B"
  }, {
    name: "Brand Refresh",
    desc: "Evolve the visual identity and marketing site.",
    progress: 54,
    open: 7,
    members: ["Lee Roy", "Ana Diaz"],
    activity: "1d ago",
    color: "#6366F1"
  }, {
    name: "Help Center",
    desc: "Rewrite docs around the focus-first workflow.",
    progress: 27,
    open: 11,
    members: ["Priya N", "Tom B"],
    activity: "6h ago",
    color: "#0891B2"
  }],
  board: {
    Backlog: [{
      title: "Collect launch-day metrics plan",
      priority: "Low",
      assignee: "Tom B"
    }, {
      title: "Draft FAQ for support team",
      priority: "Medium",
      assignee: "Priya N"
    }],
    "To do": [{
      title: "Write press release",
      priority: "High",
      assignee: "Maya Chen"
    }, {
      title: "Schedule social posts",
      priority: "Medium",
      assignee: "Ana Diaz"
    }],
    "In progress": [{
      title: "Draft the Q3 launch announcement",
      priority: "High",
      assignee: "Maya Chen",
      ai: true
    }, {
      title: "Build launch landing page",
      priority: "High",
      assignee: "Sam Ito"
    }],
    Review: [{
      title: "Final hero illustration",
      priority: "Medium",
      assignee: "Lee Roy"
    }],
    Done: [{
      title: "Lock launch date",
      priority: "Medium",
      assignee: "Maya Chen"
    }, {
      title: "Brief the exec team",
      priority: "Low",
      assignee: "Sam Ito"
    }]
  },
  taskDetail: {
    title: "Draft the Q3 launch announcement",
    status: "In progress",
    priority: "High",
    assignee: "Maya Chen",
    estimate: "45 min",
    description: "Write the public announcement for the Q3 launch. Lead with the focus-first story, then features, then availability.",
    subtasks: [{
      label: "Outline three sections",
      done: true
    }, {
      label: "Write the opening hook",
      done: true
    }, {
      label: "Draft feature highlights",
      done: false
    }, {
      label: "Add availability + pricing",
      done: false
    }],
    aiSteps: ["Break this into a 5-step checklist", "Estimate effort for each subtask", "Draft an opening paragraph"],
    activity: [{
      who: "Maya Chen",
      what: "moved this to In progress",
      when: "2h ago"
    }, {
      who: "WORKO AI",
      what: "suggested breaking this into subtasks",
      when: "2h ago"
    }, {
      who: "Sam Ito",
      what: "left a comment",
      when: "Yesterday"
    }]
  }
};
window.WORKO_DATA = WORKO_DATA;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/design-canvas.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Exports (to window): DesignCanvas, DCSection, DCArtboard, DCPostIt.
// Artboards are reorderable (grip-drag), deletable, labels/titles are
// inline-editable, and any artboard can be opened in a fullscreen focus
// overlay (←/→/Esc). State persists to a .design-canvas.state.json sidecar
// via the host bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>
//
// Artboards are static design frames, not scroll regions — never use
// height: 100% + overflow: auto/scroll on inner elements; size each artboard
// to fit its content (explicit pixel height, or let it grow).
/* END USAGE */

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = ['.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}', '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}', '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}', '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}', '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}',
  // isolation:isolate contains artboard content's z-indexes so a
  // z-indexed child (sticky navbar etc.) can't paint over .dc-header or
  // the .dc-menu popover that drops into the top of the card.
  '.dc-card{isolation:isolate;transition:box-shadow .15s,transform .15s}', '.dc-card *{scrollbar-width:none}', '.dc-card *::-webkit-scrollbar{display:none}',
  // Per-artboard header: grip + label on the left, delete/expand on the
  // right. Single flex row; when the artboard's on-screen width is too
  // narrow for both the label yields (ellipsis, then hidden entirely below
  // ~4ch via the container query) and the buttons stay on the row.
  '.dc-header{position:absolute;bottom:100%;left:-4px;margin-bottom:calc(4px * var(--dc-inv-zoom,1));z-index:2;', '  display:flex;align-items:center;container-type:inline-size}', '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px;flex:1 1 auto;min-width:0}', '.dc-grip{flex:0 0 auto;cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s,opacity .12s}', '.dc-grip:hover{background:rgba(0,0,0,.08)}', '.dc-grip:active{cursor:grabbing}', '.dc-labeltext{flex:1 1 auto;min-width:0;cursor:pointer;border-radius:4px;padding:3px 6px;', '  display:flex;align-items:center;transition:background .12s;overflow:hidden}',
  // Below ~4ch of label room: hide the label entirely, and drop the grip to
  // hover-only (same reveal rule as .dc-btns) so a narrow header is clean
  // until the card is moused.
  '@container (max-width: 110px){', '  .dc-labeltext{display:none}', '  .dc-grip{opacity:0}', '  [data-dc-slot]:hover .dc-grip{opacity:1}', '}', '.dc-labeltext:hover{background:rgba(0,0,0,.05)}', '.dc-labeltext .dc-editable{overflow:hidden;text-overflow:ellipsis;max-width:100%}', '.dc-labeltext .dc-editable:focus{overflow:visible;text-overflow:clip}', '.dc-btns{flex:0 0 auto;margin-left:auto;display:flex;gap:2px;opacity:0;transition:opacity .12s}', '[data-dc-slot]:hover .dc-btns,.dc-btns:has(.dc-menu){opacity:1}', '.dc-expand,.dc-kebab{width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;', '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center;', '  font:inherit;transition:background .12s,color .12s}', '.dc-expand:hover,.dc-kebab:hover{background:rgba(0,0,0,.06);color:#2a251f}',
  // Slot hosting an open menu floats above later siblings (which otherwise
  // paint on top — same z-index:auto, later DOM order) so the popup isn't
  // clipped by the next card.
  '[data-dc-slot]:has(.dc-menu){z-index:10}', '.dc-menu{position:absolute;top:100%;right:0;margin-top:4px;background:#fff;border-radius:8px;', '  box-shadow:0 8px 28px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.05);padding:4px;min-width:160px;z-index:10}', '.dc-menu button{display:block;width:100%;padding:7px 10px;border:0;background:transparent;', '  border-radius:5px;font-family:inherit;font-size:13px;font-weight:500;line-height:1.2;', '  color:#29261b;cursor:pointer;text-align:left;transition:background .12s;white-space:nowrap}', '.dc-menu button:hover{background:rgba(0,0,0,.05)}', '.dc-menu hr{border:0;border-top:1px solid rgba(0,0,0,.08);margin:4px 2px}', '.dc-menu .dc-danger{color:#c96442}', '.dc-menu .dc-danger:hover{background:rgba(201,100,66,.1)}',
  // Chrome (titles / labels / buttons) counter-scales against the viewport
  // zoom so it stays a constant on-screen size. --dc-inv-zoom is set by
  // DCViewport on every transform update and inherits to all descendants —
  // any overlay inside the world (e.g. a TweaksPanel on an artboard) can use
  // it the same way.
  //
  // The header uses transform:scale (out-of-flow, so layout impact doesn't
  // matter) with its world-space width set to card-width / inv-zoom so that
  // after counter-scaling its on-screen width exactly matches the card's —
  // that's what lets the container query + text-overflow behave against the
  // card's visible edge at every zoom level.
  //
  // The section head uses CSS zoom instead of transform so its layout box
  // grows with the counter-scale, pushing the card row down — otherwise the
  // constant-screen-size title would overflow into the (shrinking) world-
  // space gap and overlap the artboard headers at low zoom.
  '.dc-header{width:calc((100% + 4px) / var(--dc-inv-zoom,1));', '  transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom left}', '.dc-sectionhead{zoom:var(--dc-inv-zoom,1)}'].join('\n');
  document.head.appendChild(s);
}
const DCCtx = React.createContext(null);

// Recursively unwrap React.Fragment so <>…</> grouping doesn't hide
// DCSection/DCArtboard children from the type-based walks below.
function dcFlatten(children) {
  const out = [];
  React.Children.forEach(children, c => {
    if (c && c.type === React.Fragment) out.push(...dcFlatten(c.props.children));else out.push(c);
  });
  return out;
}

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, hidden
// artboards, focused artboard). Order/titles/labels/hidden persist to a
// .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';
function DesignCanvas({
  children,
  minScale,
  maxScale,
  style
}) {
  const [state, setState] = React.useState({
    sections: {},
    focus: null
  });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);
  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE).then(r => r.ok ? r.json() : null).then(saved => {
      if (off || !saved || !saved.sections) return;
      skipNextWrite.current = true;
      setState(s => ({
        ...s,
        sections: saved.sections
      }));
    }).catch(() => {}).finally(() => {
      didRead.current = true;
      if (!off) setReady(true);
    });
    const t = setTimeout(() => {
      if (!off) setReady(true);
    }, 150);
    return () => {
      off = true;
      clearTimeout(t);
    };
  }, []);
  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({
        sections: state.sections
      })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Fragments are flattened; wrapping in other
  // elements still opts out of focus/reorder.
  const registry = {}; // slotId -> { sectionId, artboard }
  const sectionMeta = {}; // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  dcFlatten(children).forEach(sec => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const abs = [];
    dcFlatten(sec.props.children).forEach(ab => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (aid) abs.push([aid, ab]);
    });
    // hidden is scoped to one source revision — when the agent regenerates
    // (artboard-ID set changes), prior deletes don't apply to new content.
    const srcKey = abs.map(([k]) => k).join('\x1f');
    const hidden = persisted.srcKey === srcKey ? persisted.hidden || [] : [];
    const srcIds = [];
    abs.forEach(([aid, ab]) => {
      if (hidden.includes(aid)) return;
      registry[`${sid}/${aid}`] = {
        sectionId: sid,
        artboard: ab
      };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter(k => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter(k => !kept.includes(k))]
    };
  });
  const api = React.useMemo(() => ({
    state,
    section: id => state.sections[id] || {},
    patchSection: (id, p) => setState(s => ({
      ...s,
      sections: {
        ...s.sections,
        [id]: {
          ...s.sections[id],
          ...(typeof p === 'function' ? p(s.sections[id] || {}) : p)
        }
      }
    })),
    setFocus: slotId => setState(s => ({
      ...s,
      focus: slotId
    }))
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') api.setFocus(null);
    };
    const onPd = e => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);
  return /*#__PURE__*/React.createElement(DCCtx.Provider, {
    value: api
  }, /*#__PURE__*/React.createElement(DCViewport, {
    minScale: minScale,
    maxScale: maxScale,
    style: style
  }, ready && children), state.focus && registry[state.focus] && /*#__PURE__*/React.createElement(DCFocusOverlay, {
    entry: registry[state.focus],
    sectionMeta: sectionMeta,
    sectionOrder: sectionOrder
  }));
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  // Persist viewport across reloads so the user lands back where they were
  // after an agent edit or browser refresh. The sandbox origin is already
  // per-project; pathname keeps multiple canvas files in one project apart.
  const tfKey = 'dc-viewport:' + location.pathname;
  const saveT = React.useRef(0);
  const lastPostedScale = React.useRef();
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    // Exposed for zoom-invariant chrome (labels, buttons, TweaksPanel).
    el.style.setProperty('--dc-inv-zoom', String(1 / scale));
    // Keep the host toolbar's % readout in sync with the canvas scale. Pan
    // ticks leave scale unchanged — skip the cross-frame post for those.
    if (lastPostedScale.current !== scale) {
      lastPostedScale.current = scale;
      window.parent.postMessage({
        type: '__dc_zoom',
        scale
      }, '*');
    }
    clearTimeout(saveT.current);
    saveT.current = setTimeout(() => {
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    }, 200);
  }, [tfKey]);
  React.useLayoutEffect(() => {
    const flush = () => {
      clearTimeout(saveT.current);
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    };
    try {
      const s = JSON.parse(localStorage.getItem(tfKey) || 'null');
      if (s && Number.isFinite(s.x) && Number.isFinite(s.y) && Number.isFinite(s.scale)) {
        tf.current = {
          x: s.x,
          y: s.y,
          scale: Math.min(maxScale, Math.max(minScale, s.scale))
        };
        apply();
      }
    } catch {}
    // Flush on pagehide and unmount so a reload within the 200ms debounce
    // window doesn't drop the last pan/zoom.
    window.addEventListener('pagehide', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // --dc-inv-zoom consumers (.dc-sectionhead's CSS zoom, each section's
      // marginBottom) reflow on every scale change, vertically shifting the
      // world layout — so a world point mathematically pinned under the cursor
      // drifts as you zoom (content creeps up on zoom-in, down on zoom-out).
      // Anchor the DOM element under the cursor instead: record its screen Y,
      // apply the transform + --dc-inv-zoom, then cancel whatever vertical
      // drift the reflow introduced so it stays put on screen.
      let marker = null,
        markerY0 = 0;
      if (k !== 1) {
        const hit = document.elementFromPoint(cx, cy);
        marker = hit && hit.closest ? hit.closest('[data-dc-slot],[data-dc-section]') : null;
        if (marker) markerY0 = marker.getBoundingClientRect().top;
      }
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
      if (marker) {
        // A pure zoom around (cx, cy) maps screen Y → cy + (Y - cy) * k. Any
        // departure after the --dc-inv-zoom reflow is the layout drift.
        const drift = marker.getBoundingClientRect().top - (cy + (markerY0 - cy) * k);
        if (Math.abs(drift) > 0.1) {
          t.y -= drift;
          apply();
        }
      }
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if ((e.ctrlKey || e.metaKey) && !isMouseWheel(e)) {
        // trackpad pinch, or ctrl/cmd + smooth-scroll mouse. Notched
        // wheels fall through to the fixed-step branch below.
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = e => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };

    // Host-driven zoom (toolbar % menu). Zooms around viewport centre so the
    // visible midpoint stays fixed — matching the host's iframe-zoom feel.
    const onHostMsg = e => {
      const d = e.data;
      if (d && d.type === '__dc_set_zoom' && typeof d.scale === 'number') {
        const r = vp.getBoundingClientRect();
        zoomAt(r.left + r.width / 2, r.top + r.height / 2, d.scale / tf.current.scale);
      } else if (d && d.type === '__dc_probe') {
        // Host's [readyGen] reset asks whether a canvas is present; it
        // fires on the iframe's native 'load', which for canvases with
        // images/fonts is after our mount-time announce, so re-announce.
        // Clear the pan-tick guard so apply() re-posts the current scale
        // even if it's unchanged — the host just reset dcScale to 1.
        window.parent.postMessage({
          type: '__dc_present'
        }, '*');
        lastPostedScale.current = undefined;
        apply();
      }
    };
    window.addEventListener('message', onHostMsg);
    // Announce canvas mode so the host toolbar proxies its % control here
    // instead of scaling the iframe element (which would just shrink the
    // viewport window of an infinite canvas). The apply() that follows emits
    // the initial __dc_zoom so the toolbar % is correct before first pinch.
    // lastPostedScale reset mirrors the __dc_probe handler: the layout
    // effect's restore-path apply() may already have posted the restored
    // scale (before __dc_present), so clear the guard to re-post it in order.
    window.parent.postMessage({
      type: '__dc_present'
    }, '*');
    lastPostedScale.current = undefined;
    apply();
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('message', onHostMsg);
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -6000,
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px',
      pointerEvents: 'none',
      zIndex: -1
    }
  }), children));
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({
  id,
  title,
  subtitle,
  children,
  gap = 48
}) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(dcFlatten(children));
  const artboards = all.filter(c => c && c.type === DCArtboard);
  const rest = all.filter(c => !(c && c.type === DCArtboard));
  const sec = ctx && sid && ctx.section(sid) || {};
  // Must match DesignCanvas's srcKey computation exactly (it filters falsy
  // IDs), or onDelete persists a srcKey that DesignCanvas never recognizes.
  const allIds = artboards.map(a => a.props.id ?? a.props.label).filter(Boolean);
  const srcKey = allIds.join('\x1f');
  const hidden = sec.srcKey === srcKey ? sec.hidden || [] : [];
  const srcOrder = allIds.filter(k => !hidden.includes(k));
  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter(k => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter(k => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);
  const byId = Object.fromEntries(artboards.map(a => [a.props.id ?? a.props.label, a]));

  // marginBottom counter-scales so the on-screen gap between sections stays
  // constant — otherwise at low zoom the (world-space) gap collapses while
  // the screen-constant sectionhead below it doesn't, and the title reads as
  // belonging to the section above. paddingBottom below is just enough for
  // the 24px artboard-header (abs-positioned above each card) plus ~8px, so
  // the title sits tight against its own row at every zoom.
  return /*#__PURE__*/React.createElement("div", {
    "data-dc-section": sid,
    style: {
      marginBottom: 'calc(80px * var(--dc-inv-zoom, 1))',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-sectionhead",
    style: {
      paddingBottom: 36
    }
  }, /*#__PURE__*/React.createElement(DCEditable, {
    tag: "div",
    value: sec.title ?? title,
    onChange: v => ctx && sid && ctx.patchSection(sid, {
      title: v
    }),
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.4,
      marginBottom: 6,
      display: 'inline-block'
    }
  }), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: DC.subtitle
    }
  }, subtitle))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, order.map(k => /*#__PURE__*/React.createElement(DCArtboardFrame, {
    key: k,
    sectionId: sid,
    artboard: byId[k],
    order: order,
    label: (sec.labels || {})[k] ?? byId[k].props.label,
    onRename: v => ctx && ctx.patchSection(sid, x => ({
      labels: {
        ...x.labels,
        [k]: v
      }
    })),
    onReorder: next => ctx && ctx.patchSection(sid, {
      order: next
    }),
    onDelete: () => ctx && ctx.patchSection(sid, x => ({
      hidden: [...(x.srcKey === srcKey ? x.hidden || [] : []), k],
      srcKey
    })),
    onFocus: () => ctx && ctx.setFocus(`${sid}/${k}`)
  }))), rest);
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() {
  return null;
}

// Per-artboard export (kind: 'png' | 'html'). Both paths share the same
// self-contained clone: computed styles baked in, @font-face / <img> /
// inline-style background-image urls inlined as data URIs. PNG wraps the
// clone in foreignObject→canvas at 3× the artboard's natural width×height
// (same pipeline the host uses for page captures); HTML wraps it in a
// minimal standalone document. Both are independent of viewport zoom.
async function dcExport(node, w, h, name, kind) {
  try {
    await document.fonts.ready;
  } catch {}
  const toDataURL = url => fetch(url).then(r => r.blob()).then(b => new Promise(res => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = () => res(url);
    fr.readAsDataURL(b);
  })).catch(() => url);

  // Collect @font-face rules. ss.cssRules throws SecurityError on
  // cross-origin sheets (e.g. fonts.googleapis.com) — in that case fetch
  // the CSS text directly (those endpoints send ACAO:*) and regex-extract
  // the blocks. @import and @media/@supports are walked so nested
  // @font-face rules aren't missed.
  const fontRules = [],
    pending = [],
    seen = new Set();
  const scrapeCss = href => {
    if (seen.has(href)) return;
    seen.add(href);
    pending.push(fetch(href).then(r => r.text()).then(css => {
      for (const m of css.match(/@font-face\s*{[^}]*}/g) || []) fontRules.push({
        css: m,
        base: href
      });
      for (const m of css.matchAll(/@import\s+(?:url\()?['"]?([^'")\s;]+)/g)) scrapeCss(new URL(m[1], href).href);
    }).catch(() => {}));
  };
  const walk = (rules, base) => {
    for (const r of rules) {
      if (r.type === CSSRule.FONT_FACE_RULE) fontRules.push({
        css: r.cssText,
        base
      });else if (r.type === CSSRule.IMPORT_RULE && r.styleSheet) {
        const ibase = r.styleSheet.href || base;
        try {
          walk(r.styleSheet.cssRules, ibase);
        } catch {
          scrapeCss(ibase);
        }
      } else if (r.cssRules) walk(r.cssRules, base);
    }
  };
  for (const ss of document.styleSheets) {
    const base = ss.href || location.href;
    try {
      walk(ss.cssRules, base);
    } catch {
      if (ss.href) scrapeCss(ss.href);
    }
  }
  while (pending.length) await pending.shift();
  const fontCss = (await Promise.all(fontRules.map(async rule => {
    let out = rule.css,
      m;
    const re = /url\((['"]?)([^'")]+)\1\)/g;
    while (m = re.exec(rule.css)) {
      if (m[2].indexOf('data:') === 0) continue;
      let abs;
      try {
        abs = new URL(m[2], rule.base).href;
      } catch {
        continue;
      }
      out = out.split(m[0]).join('url("' + (await toDataURL(abs)) + '")');
    }
    return out;
  }))).join('\n');
  const cloneStyled = src => {
    if (src.nodeType === 8 || src.nodeType === 1 && src.tagName === 'SCRIPT') return document.createTextNode('');
    const dst = src.cloneNode(false);
    if (src.nodeType === 1) {
      const cs = getComputedStyle(src);
      let txt = '';
      for (let i = 0; i < cs.length; i++) txt += cs[i] + ':' + cs.getPropertyValue(cs[i]) + ';';
      dst.setAttribute('style', txt + 'animation:none;transition:none;');
      if (src.tagName === 'CANVAS') try {
        const im = document.createElement('img');
        im.src = src.toDataURL();
        im.setAttribute('style', txt);
        return im;
      } catch {}
    }
    for (let c = src.firstChild; c; c = c.nextSibling) dst.appendChild(cloneStyled(c));
    return dst;
  };
  const clone = cloneStyled(node);
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  // Drop the card's own shadow/radius so the export is a flush w×h rect;
  // the artboard's own background (if any) is already in the computed style.
  clone.style.boxShadow = 'none';
  clone.style.borderRadius = '0';
  const jobs = [];
  clone.querySelectorAll('img').forEach(el => {
    const s = el.getAttribute('src');
    if (s && s.indexOf('data:') !== 0) jobs.push(toDataURL(el.src).then(d => el.setAttribute('src', d)));
  });
  [clone, ...clone.querySelectorAll('*')].forEach(el => {
    const bg = el.style.backgroundImage;
    if (!bg) return;
    let m;
    const re = /url\(["']?([^"')]+)["']?\)/g;
    while (m = re.exec(bg)) {
      const tok = m[0],
        url = m[1];
      if (url.indexOf('data:') === 0) continue;
      jobs.push(toDataURL(url).then(d => {
        el.style.backgroundImage = el.style.backgroundImage.split(tok).join('url("' + d + '")');
      }));
    }
  });
  await Promise.all(jobs);
  const xml = new XMLSerializer().serializeToString(clone);
  const save = (blob, ext) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name + '.' + ext;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  if (kind === 'html') {
    const html = '<!doctype html><html><head><meta charset="utf-8"><title>' + name + '</title>' + (fontCss ? '<style>' + fontCss + '</style>' : '') + '</head><body style="margin:0">' + xml + '</body></html>';
    return save(new Blob([html], {
      type: 'text/html'
    }), 'html');
  }

  // PNG: the SVG's own width/height must be the output resolution — an
  // <img>-loaded SVG rasterizes at its intrinsic size, so sizing it at 1×
  // and ctx.scale()-ing up would just upscale a 1× bitmap. viewBox maps the
  // w×h foreignObject onto the px·w × px·h SVG canvas so the browser renders
  // the HTML at full resolution.
  const px = 3;
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w * px + '" height="' + h * px + '" viewBox="0 0 ' + w + ' ' + h + '"><foreignObject width="' + w + '" height="' + h + '">' + (fontCss ? '<style><![CDATA[' + fontCss + ']]></style>' : '') + xml + '</foreignObject></svg>';
  const img = new Image();
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = () => rej(new Error('svg load failed'));
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
  const cv = document.createElement('canvas');
  cv.width = w * px;
  cv.height = h * px;
  cv.getContext('2d').drawImage(img, 0, 0);
  cv.toBlob(blob => save(blob, 'png'), 'image/png');
}
function DCArtboardFrame({
  sectionId,
  artboard,
  label,
  order,
  onRename,
  onReorder,
  onFocus,
  onDelete
}) {
  const {
    id: rawId,
    label: rawLabel,
    width = 260,
    height = 480,
    children,
    style = {}
  } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);
  const cardRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);

  // ⋯ menu: close on any outside pointerdown. Two-click delete lives inside
  // the menu — first click arms the row, second commits; closing disarms.
  React.useEffect(() => {
    if (!menuOpen) {
      setConfirming(false);
      return;
    }
    const off = e => {
      if (!menuRef.current || !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', off, true);
    return () => document.removeEventListener('pointerdown', off, true);
  }, [menuOpen]);
  const doExport = kind => {
    setMenuOpen(false);
    if (!cardRef.current) return;
    const name = String(label || id || 'artboard').replace(/[^\w\s.-]+/g, '_');
    dcExport(cardRef.current, width, height, name, kind).catch(e => console.error('[design-canvas] export failed:', e));
  };

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = e => {
    e.preventDefault();
    e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map(el => ({
      el,
      id: el.dataset.dcSlot,
      x: el.getBoundingClientRect().left
    }));
    const slotXs = homes.map(h => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');
    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };
    const move = ev => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0,
        best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter(k => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) {
          h.el.style.transition = 'none';
          h.el.style.transform = '';
        }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "data-dc-slot": id,
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-header",
    "data-omelette-chrome": "",
    style: {
      color: DC.label
    },
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-labelrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-grip",
    onPointerDown: onGripDown,
    title: "Drag to reorder"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "13",
    viewBox: "0 0 9 13",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "11",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "11",
    r: "1.1"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-labeltext",
    onClick: onFocus,
    title: "Click to focus"
  }, /*#__PURE__*/React.createElement(DCEditable, {
    value: label,
    onChange: onRename,
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: DC.label,
      lineHeight: 1
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-btns"
  }, /*#__PURE__*/React.createElement("div", {
    ref: menuRef,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "dc-kebab",
    title: "More",
    onClick: () => setMenuOpen(o => !o)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2.5",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9.5",
    cy: "6",
    r: "1.1"
  }))), menuOpen && /*#__PURE__*/React.createElement("div", {
    className: "dc-menu",
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('png')
  }, "Download PNG"), /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('html')
  }, "Download HTML"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("button", {
    className: "dc-danger",
    onClick: () => {
      if (confirming) {
        setMenuOpen(false);
        onDelete();
      } else setConfirming(true);
    }
  }, confirming ? 'Click again to delete' : 'Delete'))), /*#__PURE__*/React.createElement("button", {
    className: "dc-expand",
    onClick: onFocus,
    title: "Focus"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"
  }))))), /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    className: "dc-card",
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb',
      fontSize: 13,
      fontFamily: DC.font
    }
  }, id)));
}

// Inline rename — commits on blur or Enter.
function DCEditable({
  value,
  onChange,
  style,
  tag = 'span',
  onClick
}) {
  const T = tag;
  return /*#__PURE__*/React.createElement(T, {
    className: "dc-editable",
    contentEditable: true,
    suppressContentEditableWarning: true,
    onClick: onClick,
    onPointerDown: e => e.stopPropagation(),
    onBlur: e => onChange && onChange(e.currentTarget.textContent),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.blur();
      }
    },
    style: style
  }, value);
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({
  entry,
  sectionMeta,
  sectionOrder
}) {
  const ctx = React.useContext(DCCtx);
  const {
    sectionId,
    artboard
  } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);
  const go = d => {
    const n = peers[(idx + d + peers.length) % peers.length];
    if (n) ctx.setFocus(`${sectionId}/${n}`);
  };
  const goSection = d => {
    // Sections whose artboards are all deleted have slotIds:[] — step past
    // them to the next non-empty section so ↑/↓ doesn't dead-end.
    const n = sectionOrder.length;
    for (let i = 1; i < n; i++) {
      const ns = sectionOrder[((secIdx + d * i) % n + n) % n];
      const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
      if (first) {
        ctx.setFocus(`${ns}/${first}`);
        return;
      }
    }
  };
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goSection(-1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goSection(1);
      }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });
  const {
    width = 260,
    height = 480,
    children
  } = artboard.props;
  const [vp, setVp] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  React.useEffect(() => {
    const r = () => setVp({
      w: window.innerWidth,
      h: window.innerHeight
    });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));
  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({
    dir,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onClick();
    },
    style: {
      position: 'absolute',
      top: '50%',
      [dir]: 28,
      transform: 'translateY(-50%)',
      border: 'none',
      background: 'rgba(255,255,255,.08)',
      color: 'rgba(255,255,255,.9)',
      width: 44,
      height: 44,
      borderRadius: 22,
      fontSize: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background .15s'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.18)',
    onMouseLeave: e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'
  })));

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    onClick: () => ctx.setFocus(null),
    onWheel: e => e.preventDefault(),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(24,20,16,.6)',
      backdropFilter: 'blur(14px)',
      fontFamily: DC.font,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      display: 'flex',
      alignItems: 'flex-start',
      padding: '16px 20px 0',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDd(o => !o),
    style: {
      border: 'none',
      background: 'transparent',
      color: '#fff',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: 6,
      textAlign: 'left',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, meta.title), /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    style: {
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3.5 3.5L9 4"
  }))), meta.subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      opacity: .6,
      fontWeight: 400,
      marginTop: 2
    }
  }, meta.subtitle)), ddOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      background: '#2a251f',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0,0,0,.4)',
      padding: 4,
      minWidth: 200,
      zIndex: 10
    }
  }, sectionOrder.filter(sid => sectionMeta[sid].slotIds.length).map(sid => /*#__PURE__*/React.createElement("button", {
    key: sid,
    onClick: () => {
      setDd(false);
      const f = sectionMeta[sid].slotIds[0];
      if (f) ctx.setFocus(`${sid}/${f}`);
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 5,
      fontSize: 14,
      fontWeight: sid === sectionId ? 600 : 400,
      fontFamily: 'inherit'
    }
  }, sectionMeta[sid].title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.setFocus(null),
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.12)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent',
    style: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,.7)',
      width: 32,
      height: 32,
      borderRadius: 16,
      fontSize: 20,
      cursor: 'pointer',
      lineHeight: 1,
      transition: 'background .12s'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 64,
      bottom: 56,
      left: 100,
      right: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: width * scale,
      height: height * scale,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      background: '#fff',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 20px 80px rgba(0,0,0,.4)'
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb'
    }
  }, aid))), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 14,
      fontWeight: 500,
      opacity: .85,
      textAlign: 'center'
    }
  }, (sec.labels || {})[aid] ?? artboard.props.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 10,
      fontVariantNumeric: 'tabular-nums'
    }
  }, idx + 1, " / ", peers.length))), /*#__PURE__*/React.createElement(Arrow, {
    dir: "left",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement(Arrow, {
    dir: "right",
    onClick: () => go(1)
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 8
    }
  }, peers.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => ctx.setFocus(`${sectionId}/${p}`),
    style: {
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      width: 6,
      height: 6,
      borderRadius: 3,
      background: i === idx ? '#fff' : 'rgba(255,255,255,.3)'
    }
  })))), document.body);
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/design-canvas.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/icons.jsx
try { (() => {
/* Icon helper — renders real Lucide icons from the lucide UMD global.
   Load https://unpkg.com/lucide before the babel scripts so window.lucide exists.
   Lucide icons inherit currentColor and use a ~2px round stroke (WORKO standard). */

function Icon({
  name,
  size = 20,
  stroke = 2,
  color = "currentColor",
  style = {}
}) {
  const reg = window.lucide && (window.lucide.icons || window.lucide) || {};
  const node = reg[name];
  let children = null;
  if (Array.isArray(node)) {
    // IconNode = [ [tag, attrs], ... ]  OR  ["svg", attrs, [ [tag, attrs], ... ]]
    const parts = Array.isArray(node[0]) ? node : node[2];
    if (Array.isArray(parts)) {
      children = parts.map((p, i) => React.createElement(p[0], {
        key: i,
        ...p[1]
      }));
    }
  }
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flexShrink: 0,
      display: "block",
      ...style
    }
  }, children);
}
window.Icon = Icon;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Marketing.jsx
try { (() => {
/* WORKO marketing landing — sections. Composes DS components. */
const {
  Button: MBtn,
  Badge: MBadge
} = window.WORKODesignSystem_3ef60c;
function MarketingNav() {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 10,
      display: "flex",
      alignItems: "center",
      gap: 28,
      padding: "16px 40px",
      background: "rgba(248,250,252,0.8)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/worko-mark.svg",
    width: "30",
    height: "30",
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      fontSize: 20,
      letterSpacing: "-0.02em"
    }
  }, "WORKO")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: 26,
      marginLeft: 18
    }
  }, ["Product", "Focus mode", "Teams", "Pricing"].map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      fontSize: 14.5,
      fontWeight: 500,
      color: "var(--text-secondary)",
      textDecoration: "none"
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontSize: 14.5,
      fontWeight: 600,
      color: "var(--text-primary)",
      textDecoration: "none"
    }
  }, "Sign in"), /*#__PURE__*/React.createElement(MBtn, null, "Start for free")));
}
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      textAlign: "center",
      padding: "84px 40px 70px",
      maxWidth: 880,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(MBadge, {
    tone: "primary",
    dot: true
  }, "Your AI work companion")), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "22px 0 0",
      fontSize: 62,
      fontWeight: 800,
      letterSpacing: "-0.03em",
      lineHeight: 1.05,
      color: "var(--text-primary)"
    }
  }, "Work smarter.", /*#__PURE__*/React.createElement("br", null), "Finish faster."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "22px auto 0",
      maxWidth: 560,
      fontSize: 19,
      lineHeight: 1.6,
      color: "var(--text-secondary)"
    }
  }, "WORKO tells you exactly what to work on next, keeps you focused while you do it, and maintains your momentum all day long."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      justifyContent: "center",
      marginTop: 30
    }
  }, /*#__PURE__*/React.createElement(MBtn, {
    size: "lg",
    trailingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "ArrowRight",
      size: 18
    })
  }, "Start for free"), /*#__PURE__*/React.createElement(MBtn, {
    size: "lg",
    variant: "secondary",
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "Play",
      size: 17
    })
  }, "Watch demo")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 16,
      fontSize: 13,
      color: "var(--text-muted)"
    }
  }, "No credit card \xB7 Free for your first 3 projects"));
}
function HeroPreview() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 980,
      margin: "0 auto",
      padding: "0 40px 90px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-modal)",
      boxShadow: "var(--shadow-xl)",
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--radius-card)",
      overflow: "hidden",
      border: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      padding: "11px 14px",
      background: "var(--surface-secondary)",
      borderBottom: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: "50%",
      background: "#E2E8F0"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: "50%",
      background: "#E2E8F0"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: "50%",
      background: "#E2E8F0"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "40px 36px",
      background: "radial-gradient(120% 90% at 50% 0%, #EEF2FF, #FFFFFF 60%)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      gap: 8,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(MBadge, {
    tone: "primary"
  }, "Up now"), /*#__PURE__*/React.createElement(MBadge, {
    tone: "warning",
    dot: true
  }, "High priority")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32,
      fontWeight: 800,
      letterSpacing: "-0.025em",
      color: "var(--text-primary)",
      maxWidth: 520
    }
  }, "Draft the Q3 launch announcement"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 18,
      marginTop: 14,
      color: "var(--text-secondary)",
      fontSize: 14.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 7,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "FolderKanban",
    size: 16,
    color: "var(--text-muted)"
  }), "Q3 Product Launch"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 7,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Clock",
    size: 16,
    color: "var(--text-muted)"
  }), "45 min")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 11,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(MBtn, {
    size: "lg",
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "Play",
      size: 18
    })
  }, "Start focus session"), /*#__PURE__*/React.createElement(MBtn, {
    size: "lg",
    variant: "secondary",
    leadingIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "Check",
      size: 17
    })
  }, "Complete"))))));
}
const FEATURES = [{
  icon: "Target",
  title: "Know what's next",
  text: "WORKO prioritizes your day and surfaces the single task that matters most right now."
}, {
  icon: "Sparkles",
  title: "An AI coach in flow",
  text: "Your focus companion encourages you, suggests next steps, and breaks big work into subtasks."
}, {
  icon: "Timer",
  title: "Deep focus sessions",
  text: "Hide distractions, start the timer, and let ambient focus keep you in the zone."
}, {
  icon: "TrendingUp",
  title: "Momentum, built in",
  text: "Track progress, streaks, and completed work so finishing feels as good as it should."
}];
function Features() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1080,
      margin: "0 auto",
      padding: "20px 40px 90px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 40,
      fontWeight: 800,
      letterSpacing: "-0.025em",
      color: "var(--text-primary)"
    }
  }, "Stop managing. Start doing."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "12px auto 0",
      maxWidth: 520,
      fontSize: 17,
      color: "var(--text-secondary)",
      lineHeight: 1.6
    }
  }, "Traditional tools organize tasks. WORKO actively helps you complete them.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 20
    }
  }, FEATURES.map(f => /*#__PURE__*/React.createElement("div", {
    key: f.title,
    style: {
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-sm)",
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 46,
      height: 46,
      borderRadius: 13,
      background: "var(--color-primary-light)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: f.icon,
    size: 22,
    color: "var(--color-primary)"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 19,
      fontWeight: 700,
      letterSpacing: "-0.01em",
      color: "var(--text-primary)"
    }
  }, f.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 0",
      fontSize: 15,
      lineHeight: 1.6,
      color: "var(--text-secondary)"
    }
  }, f.text)))));
}
function CTA() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "0 40px 90px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1000,
      margin: "0 auto",
      borderRadius: "var(--radius-modal)",
      padding: "60px 40px",
      textAlign: "center",
      background: "linear-gradient(135deg, var(--color-primary), #6D28D9)",
      boxShadow: "var(--shadow-primary)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 40,
      fontWeight: 800,
      letterSpacing: "-0.025em",
      color: "#fff"
    }
  }, "Focus on what matters."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "14px auto 0",
      maxWidth: 460,
      fontSize: 17,
      lineHeight: 1.6,
      color: "rgba(255,255,255,0.85)"
    }
  }, "Join the people finishing their most important work with clarity and momentum."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      height: 52,
      padding: "0 28px",
      border: "none",
      borderRadius: "var(--radius-button)",
      cursor: "pointer",
      background: "#fff",
      color: "var(--color-primary-hover)",
      fontFamily: "var(--font-sans)",
      fontSize: 16,
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, "Start for free", /*#__PURE__*/React.createElement(Icon, {
    name: "ArrowRight",
    size: 18
  })))));
}
function MarketingFooter() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: "1px solid var(--border)",
      padding: "32px 40px",
      display: "flex",
      alignItems: "center",
      gap: 12,
      maxWidth: 1080,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/worko-mark.svg",
    width: "24",
    height: "24",
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 15,
      color: "var(--text-primary)"
    }
  }, "WORKO"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: "var(--text-muted)"
    }
  }, "\xB7 Your AI work companion"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontSize: 13,
      color: "var(--text-muted)"
    }
  }, "\xA9 2026 WORKO"));
}
function Marketing() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg-app)",
      minHeight: "100%"
    }
  }, /*#__PURE__*/React.createElement(MarketingNav, null), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(HeroPreview, null), /*#__PURE__*/React.createElement(Features, null), /*#__PURE__*/React.createElement(CTA, null), /*#__PURE__*/React.createElement(MarketingFooter, null));
}
window.Marketing = Marketing;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Marketing.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.AvatarGroup = __ds_scope.AvatarGroup;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
