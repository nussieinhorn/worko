# WORKO Design System

**WORKO — Your AI Work Companion.**
WORKO is not a task manager; it's an AI work companion. While traditional tools *organize* tasks, WORKO actively helps people *complete* them — telling you what to work on next, guiding your focus, removing distractions, and keeping momentum all day long.

This repository is the source of truth for WORKO's visual language: tokens, foundations, reusable React components, and full-screen UI kit recreations.

---

## Sources

This system was authored from WORKO's brand brief and low-fidelity wireframe concepts (no codebase or Figma was attached):
- **Brand brief** — vision, mission, positioning, taglines, color palette, type, radius, shadow, component direction.
- **Wireframe concepts** — Focus Home, Project Dashboard, Project Detail, Task Detail Drawer (see the App UI kit).
- **Napkin sketch** — rough Focus Home layout (`scraps/`).

> ⚠️ **Font note:** the brand specifies **Inter** for all type. Inter is loaded from Google Fonts (the genuine family, not a substitute). If you have a licensed/self-hosted Inter, drop the `.woff2` files into `assets/fonts/` and swap the `@import` in `tokens/typography.css` for `@font-face` rules.
> ⚠️ **Logo note:** the brand asked for a *temporary placeholder* logo. The mark in `assets/` is a geometric momentum chevron — replace it when final brand art lands.

---

## Brand Personality

WORKO is **calm, intelligent, motivating, and modern**. It should feel:
focused (not busy) · professional (not corporate) · friendly (not playful) · productive (not stressful) · AI-powered (not futuristic).

Anchor words: **deep work · momentum · clarity · progress · confidence.**
Inspiration blend: Linear's precision · Notion's calm surfaces · Slack's friendliness · Headspace's focus.

---

## Content Fundamentals

How WORKO writes. Copy should sound like a sharp, encouraging colleague — never a corporate tool, never a hype-y startup.

- **Voice:** second person, present tense, active. Talk to the user ("you"), and let the product act ("WORKO prioritizes your day"). Use "we" sparingly, only for the company.
- **Tone:** confident and calm. Motivating without exclamation-point cheerleading. One idea per sentence. Short sentences win.
- **Casing:** Sentence case for almost everything — buttons, menu items, headings, labels. The only ALL-CAPS usage is small meta labels with wide tracking ("FOCUS SESSION · 25 MIN"). Never Title Case full sentences.
- **Verbs first on actions:** "Start focus", "Add task", "Break into subtasks", "Complete task", "Extend session". Buttons name the outcome, not the mechanism.
- **Taglines** are short, punchy, paired clauses: *"Work Smarter. Finish Faster."* · *"Stop Managing. Start Doing."* · *"Focus on What Matters."* (Taglines are the one place Title Case is allowed, for rhythm.)
- **Numbers & progress** are stated plainly and positively: "12 of 18 tasks complete", "72% of today done", "5-day streak". Frame remaining work as momentum, not backlog guilt.
- **AI voice:** the focus companion is warm, brief, and specific — "Nice work. Want to knock out the launch email next?" Never robotic, never over-familiar. No emoji in product UI. No exclamation pile-ups.
- **Avoid:** jargon ("synergy", "leverage"), fear/urgency ("Don't fall behind!"), and filler. If a sentence doesn't help the user act, cut it.

**Examples**
- Hero: *"Open WORKO, and it tells you exactly what to work on next."*
- Empty state: *"Nothing left for today. Enjoy the momentum."*
- Button set: `Start focus` · `Complete task` · `Skip task` · `Ask AI` · `Extend session`

---

## Visual Foundations

The look is **premium-productivity minimal**: lots of whitespace, soft elevation, rounded corners, and a single confident accent. Calm surfaces let the work be the focus.

- **Color:** Deep indigo (`#4F46E5`) is the one brand color — used for primary actions, focus, active states, and progress. Vibrant cyan (`#06B6D4`) is a sparing accent (AI suggestions, momentum highlights). Everything else is a cool **slate** neutral scale on a near-white app background (`#F8FAFC`). Semantic green/amber/red appear only for status. Never more than one or two hues on screen at once.
- **Type:** Inter throughout. Bold/Extrabold for headings with tight tracking (`-0.02em`); Regular for body at relaxed line-height; SemiBold tabular numerals for timers, percentages, and metrics. Strong size hierarchy — display jumps to 48–60px, body holds at 16px.
- **Spacing:** 4px base scale, but used *generously*. Cards breathe (24px+ padding); sections separate with 48–80px. Whitespace is a feature, not waste.
- **Corners:** soft and consistent — inputs/buttons 12px, cards 16px, modals/sheets 20px, pills fully round. Nothing sharp.
- **Elevation:** very soft, low-opacity slate shadows layered in two steps (`--shadow-sm` → `--shadow-xl`). No harsh dark drop shadows. Focused/hero elements may use a faint indigo-tinted shadow (`--shadow-primary`). Cards rest on `--shadow-sm` and lift to `--shadow-lg` on hover.
- **Cards:** white surface, 1px slate-200 border *and* a soft shadow, 16px radius, generous padding. The border keeps them crisp on the near-white background.
- **Backgrounds:** flat and calm. App background is `#F8FAFC`; surfaces are white. **No** decorative gradients, no busy textures. The one permitted exception is the Focus session "ambient" area, which may use a very subtle calm wash — kept minimal.
- **Borders:** 1px `--border` (slate-200) for structure; `--border-strong` (slate-300) for inputs on hover. Indigo borders signal focus.
- **Motion:** quick and gentle. 120–320ms with an ease-out curve (`cubic-bezier(0.16, 1, 0.3, 1)`). Fades and small translateY rises; progress bars ease their width. **No** bounces, no springy overshoot, no infinite decorative loops. Respect `prefers-reduced-motion`.
- **Hover states:** buttons darken their fill (indigo → indigo-700); secondary surfaces shift to slate-100; cards lift 2px and deepen shadow. **Press states:** scale down slightly (0.97 buttons, 0.94 icon buttons) — a tactile, confident press.
- **Focus rings:** 3px indigo glow at 35% opacity (`--ring`) — visible but soft.
- **Transparency & blur:** used lightly — sticky headers and the focus companion panel may use a translucent white with `backdrop-filter: blur()`. Otherwise surfaces are solid.
- **Imagery:** WORKO leans on UI and typography over photography. When imagery appears, keep it cool-toned, calm, and uncluttered. Avatars are circular with auto-colored initials fallbacks.

---

## Iconography

- **System:** [**Lucide**](https://lucide.dev) — clean, 24×24, ~2px stroke, rounded line caps/joins. It matches WORKO's calm, modern, slightly-rounded geometry. Loaded from CDN in UI kits (`https://unpkg.com/lucide-static`), used as inline SVG or `<img>`.
  - *No icon binaries were provided in the brief, so Lucide is a documented substitution — swap for the official set when available.*
- **Style rules:** line icons only (not filled), `currentColor` so they inherit text color, ~2px stroke to sit beside Inter. Indigo for active/primary, slate-400/600 for default/muted. Icon hit targets are never smaller than the 36px `sm` IconButton.
- **The brand mark** is the one *solid* glyph — a momentum chevron — and is the exception to the line-icon rule. See `assets/worko-mark.svg`.
- **Emoji:** not used in product UI. **Unicode** used only for the middot separator (·) in meta labels.

---

## Index / Manifest

**Root**
- `styles.css` — global entry point (import this one file). `@import`s all tokens.
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skills-compatible entry for using this system in Claude Code.

**`tokens/`** — `colors.css`, `typography.css`, `spacing.css` (spacing + radius + shadow + motion).

**`guidelines/`** — foundation specimen cards (Design System tab): colors (primary, semantic, neutral), type (headings, body, numbers), spacing, radius, shadows, logo.

**`assets/`** — `worko-logo.svg`, `worko-logo-dark.svg`, `worko-mark.svg`, `worko-mark-bare.svg`.

**`components/`** — reusable React primitives:
- `buttons/` — **Button**, **IconButton**
- `forms/` — **Input**, **Switch**, **Checkbox**
- `data-display/` — **Card**, **Badge**, **Avatar** / **AvatarGroup**, **ProgressBar**
- `navigation/` — **Tabs**

**`ui_kits/`** — full-screen product recreations:
- `app/` — the WORKO app: Focus Home, Project Dashboard, Project Detail. (See its README.)
- `marketing/` — the WORKO marketing landing page.

Consume components in HTML via `const { Button } = window.WORKODesignSystem_3ef60c` after loading `_ds_bundle.js` (generated; do not edit).
