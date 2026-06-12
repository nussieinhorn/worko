---
name: worko-design
description: Use this skill to generate well-branded interfaces and assets for WORKO, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

WORKO is an AI work companion — calm, intelligent, motivating, modern. Deep indigo (`#4F46E5`) primary, vibrant cyan (`#06B6D4`) accent, cool slate neutrals, Inter type, soft shadows, rounded corners (12 / 16 / 20px), generous whitespace. Copy is sentence-case, second-person, verb-first, motivating without hype.

Key files:
- `readme.md` — full brand guide: content fundamentals, visual foundations, iconography, manifest.
- `styles.css` — global token entry point (`@import` it); tokens live in `tokens/`.
- `components/` — React primitives (Button, IconButton, Input, Switch, Checkbox, Card, Badge, Avatar, ProgressBar, Tabs).
- `ui_kits/app/` — the WORKO app (Focus Home, Projects, Project Detail + Task drawer).
- `ui_kits/marketing/` — the WORKO landing page.
- `assets/` — logo + momentum mark.

If creating visual artifacts (slides, mocks, throwaway prototypes), copy assets out and create static HTML files for the user to view. For production code, copy assets and apply the rules here to design on-brand. In standalone HTML mocks, load tokens by copying `styles.css` + `tokens/`, use Inter from Google Fonts, and Lucide for icons.

If the user invokes this skill without other guidance, ask them what they want to build, ask a few focused questions, and act as an expert WORKO designer who outputs HTML artifacts or production code as needed.
