# WORKO App — UI Kit

High-fidelity, interactive recreation of the WORKO product, built from the brand brief and the low-fidelity wireframe concepts (Focus Home, Project Dashboard, Project Detail, Task Detail Drawer).

Open `index.html` for the click-through. The left sidebar switches surfaces.

## Surfaces
- **Focus Home** (`FocusHome.jsx`) — the primary, focus-first experience. Hero task with Start focus / Complete / Skip, today's progress + streak, an "Up next" queue, and the AI **focus companion** panel. Pressing *Start focus session* enters a full-screen timer with ambient-focus controls.
- **Project Dashboard** (`ProjectDashboard.jsx`) — grid of project cards (progress, members, open tasks) plus an inline *Create project* card. No modal — click to create.
- **Project Detail** (`ProjectDetail.jsx`) — editable header, view **Tabs** (Board / List / Timeline / Calendar), a Kanban **Board**, and an AI side panel. Clicking a task opens the **Task Detail Drawer** from the right (status, subtasks, AI assistant, auto-save — no Save button).

## UX rule honored
WORKO never uses separate "Create" / "Edit" pages. Everything is click-to-create, click-to-edit, auto-saved, inline. The drawer and inline cards reflect this.

## Build notes
- `AppShell.jsx` — `Sidebar` + `TopBar`. `icons.jsx` — Lucide icon renderer. `data.jsx` — mock data.
- Components come from the design system bundle: `window.WORKODesignSystem_3ef60c` (Button, Badge, Card, ProgressBar, Avatar, Tabs, Checkbox, Switch, …).
- Icons are real [Lucide](https://lucide.dev) glyphs via the `lucide` UMD global. The Timeline/Calendar/List tab bodies are intentionally stubbed — Board is the reference surface.
