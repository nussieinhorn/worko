# WORKO

**Your AI work companion.** WORKO doesn't just organize tasks — it helps you complete them: it tells you what to work on next, guides your focus, and keeps momentum all day.

Vite + React 19 + TypeScript, styled with the WORKO design system (CSS custom-property tokens, Inter, Lucide icons).

## Run it

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build
```

## What's here

- **Focus Home** — hero task with Start focus / Complete / Skip, today's progress + streak, "Up next" queue, AI focus companion, and a full-screen focus session timer.
- **Projects** — project card grid with inline create.
- **Project Detail** — Overview dashboard plus interactive List / Board / Calendar / Timeline views (drag-and-drop, quick-add, filters, grouping) and a click-to-edit Task Drawer. No separate create/edit pages — everything is inline and auto-saved.

## Structure

```
src/
  styles/          design tokens (colors, typography, spacing) + global base
  components/ds/   design-system primitives (Button, Card, Badge, Tabs, …)
  components/      Icon (Lucide registry)
  app/             AppShell — Sidebar, TopBar
  data/            mock data + domain types
  screens/         FocusHome, ProjectDashboard
  screens/project/ ProjectDetail shell, model, views, TaskDrawer
design-system-import/   the source WORKO design system (brand guide, UI kits) — reference only
```

The design system source of truth lives in `design-system-import/` (see its `readme.md` for the full brand guide: voice, color, type, motion rules). Follow it when adding UI.

> **Note:** `package.json` pins `@types/estree` to a tarball URL via `overrides` because a local network filter blocks that package's registry metadata URL. Harmless elsewhere; remove if it ever causes trouble.
