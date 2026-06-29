# WC — BBNF Playground: Atmosphere, Depth & A11y Refinement Spec

**Repo:** `/Users/mkbabb/Programming/bbnf-lang/playground`
**Lens:** Atmosphere · visual depth · a11y polish — via glass-ui's 5-rung glass ladder, aurora/paper backdrops, shadow stack, `--border-soft` hairlines, forced-colors + focus-visible.
**Constraint:** REFINEMENT, not redesign. The app is stable on glass-ui ^3.0.0. Every item below is grounded in a real file:line + a specific glass-ui primitive already on disk in `dist/`.

---

## 0. Verdict

The playground is a **handsome but glass-ui-shallow** app. It imports glass-ui *components* (`GlassDock`, `Select`, `Dialog`, `Tooltip`, `Card`, `DarkModeToggle`, `HeaderRibbon`) idiomatically, but its **surfaces and atmosphere are hand-rolled** — it re-implements the glass ladder with local `card-base/card-subtle/card-elevated` utilities (flat `backdrop-blur-xl` + `bg-card/50`, no under-shadow, no grain, no token cascade), paints a **flat SVG grid** behind everything where an Aurora/Paper backdrop belongs, and ships **zero** `forced-colors`, `prefers-reduced-motion`, or systematic `focus-visible` rules despite heavy orchestrated motion. The app's own `DESIGN.md` migration checklist already flags four of these. This spec makes its glass-ui usage *deeper, more idiomatic, and more performant* — leveraging primitives it already ships but never reaches for.

Flat vs. real depth: **mostly flat.** Glass tiers used meaningfully: **no — re-implemented, not consumed.** A11y: **structurally underdone** (no landmarks-with-labels, no reduced-motion, no forced-colors, ad-hoc focus).

---

## 1. ATMOSPHERE — replace the flat grid with a glass-ui backdrop

### 1.1 The shared background is a flat SVG grid at 6% opacity
`src/App.vue:17-22` paints the *entire app* background with an inline data-URI SVG grid at `opacity-[0.06]`. This is the single largest atmosphere miss: a glassmorphic design system whose root canvas is a flat hairline grid. Glass surfaces over a flat fill have nothing to refract — the blur reads as gray haze, not glass.

**Lever:** `<Aurora>` from `@mkbabb/glass-ui/aurora` (`dist/aurora.js`, standalone ~16 KiB-gzip WebGL chunk). Aurora is purpose-built for exactly this slot:
- `renderMode="auto"` (Aurora.vue:67) resolves to a **static CSS-gradient** on `prefers-reduced-motion`, low-power (`hardwareConcurrency <= 4`), or `save-data` — so the reduced-motion + perf story is *free and built-in*. (This also satisfies §3.2 below for the backdrop layer.)
- `:opacity-ceiling="0.5"` (the "quiet content-over-aurora" envelope, Aurora.vue:~69) keeps the drift from competing with Monaco editor text and the dense docs prose — the canonical content-route clamp.
- A lazy-armed CSS-gradient placeholder paints frame-1 with zero GPU and is the permanent WebGL2-unavailable fallback.

**Recommendation:** Mount one fixed `<Aurora>` behind the router-view in `App.vue` (replacing lines 17-22), driven by a BBNF-pastel palette built from the existing `--pastel-green/blue/purple/amber` tokens (`preset-bbnf.css:26-31`). Use a per-route `opacity-ceiling` — `~0.7` on the marketing `LandingPage` hero, `~0.35` on `/playground` and `/docs` where editor/prose density dominates. Keep the grid only as an *optional* `mix-blend` overlay on the hero if the texture is wanted, not as the global base.

### 1.2 Docs & playground panes could read warmer paper, not cold card-tint
The docs prose (`main.css:153-175`) and editor chrome sit on `color-mix(card 60%)` flat fills. glass-ui ships `<PaperBackdrop>` (`dist/paper-backdrop.js`) with `clean`/`aged` grain variants reading `--paper-*` tokens. **Lever:** a `<PaperBackdrop>` under the `DocsPage` reading column gives the long-form docs a warm, textured substrate that contrasts the cool Aurora elsewhere — atmospheric *variety* between routes rather than one flat grid everywhere.

---

## 2. DEPTH — consume the 5-rung glass ladder instead of re-implementing it

### 2.1 `card-base / card-subtle / card-elevated` re-implement the ladder, badly
`main.css:50-60` defines three card tiers as flat `rounded-xl border-white/N bg-card/N backdrop-blur`. These are used 8× (FeatureCards.vue:60, and across landing). They are a **lossy re-implementation** of glass-ui's `.glass-wash / .glass-quiet / .glass-resting / .glass-floating / .glass-overlay` ladder (`glass-ui/src/styles/glass.css:20-70`), which the `/styles` bundle *already ships*. The library rungs carry what the local utilities lack:
- **alpha-monotonic** backgrounds via the `--glass-bg-*` token cascade (consumer-retunable),
- the **iOS Liquid-Glass under-shadow** (`--glass-under-shadow-*`, glass.css:40-61) — a 0.5px dark hairline reading as *glass thickness*, the single biggest "real depth vs flat" signal,
- a **grain `::after`** (glass.css:72-88) reusing the paper texture — micro-texture the flat utilities have none of,
- `--border-soft`-grade hairline borders rather than hard `white/10`.

**Lever:** Delete `card-base/subtle/elevated` from `main.css`; map the 8 call sites onto the ladder — marketing FeatureCards → `.glass-wash`/`.glass-quiet`; the elevated/hover cards → `.glass-resting` with `.glass-floating` on hover. Per the user's no-backwards-compat rule, this is a clean swap, not an alias. (DESIGN.md migration task already lists this.)

### 2.2 `EditorPanel` uses `<Card variant="pane">` but flattens it with `!shadow-none`
`EditorPanel.vue:38` reaches for glass-ui `<Card variant="pane">` — correct — then immediately kills its depth with `!shadow-none` and overlays a hand-rolled `backdrop-blur-md bg-card/40` header bar (line 39). The pane is the app's most important surface (it frames Monaco) and it's the *flattest*. **Lever:** drop `!shadow-none`, let the `pane` variant's shadow stack land, and replace the header's ad-hoc blur with `.glass-quiet` so the pane header reads as a distinct, thinner glass rung above the editor body — real layered depth at the app's focal surface.

### 2.3 Cartoon shadows are fine — but keep them on the *content* tier, not the glass tier
`preset-bbnf.css:37-38` overrides `--shadow-card`/`--shadow-hover` to hard cartoon offsets (`3px 3px 0`). That's a deliberate, characterful identity choice — keep it. The fix is *layering discipline*: cartoon hard-offset shadows belong on opaque content cards (FeatureCards, code cards); the glass ladder's soft under-shadow belongs on translucent chrome (panes, dock, dialogs). Today both blur together. Assigning each shadow vocabulary to its tier is what makes the depth read as *intentional* rather than muddy.

---

## 3. A11Y — landmarks, motion, contrast, coarse targets

### 3.1 No labeled landmarks; playground/landing have no `<main>`
`<main>` exists only in `DocsPage.vue:82`. `LandingPage.vue` and `PlaygroundPage.vue` roots are bare `<div>`s; the four landing `<section>`s (HeroSection:48, FeatureCards:55, LivePreviewStrip:192, DemoCards:73) carry **no `aria-label`/`aria-labelledby`**, so a screen-reader landmark rota is empty/ambiguous. **Lever (structural, no glass-ui dep):** wrap `LandingPage`/`PlaygroundPage` content in `<main>`; give each landing `<section>` an `aria-labelledby` pointing at its heading (FeatureCards has none — add a visually-hidden `<h2>`). The `App.vue` `<nav>` (NavBar.vue:89) is good; mirror that rigor.

### 3.2 Zero `prefers-reduced-motion` guards despite pervasive orchestrated motion
`grep` returns **0** reduced-motion rules across `src/`. The app runs: scroll-morph hero→navbar logo flight (`useHeroSequence`/`useHeroState`), `useScrollTimeline` translateY reveals (LandingPage:13-15), CSS `shimmer` sweeps (HeroSection:111-121), a description **marquee** (`ExampleSelector.vue:123-131`), typewriter, and FLIP transitions. This is a vestibular-safety gap **and** a perf gap on low-end devices. **Levers:**
- For Aurora (§1.1), `renderMode="auto"` handles it automatically — adopt it.
- For the CSS marquee/shimmer/scroll-reveal, add a single `@media (prefers-reduced-motion: reduce)` block in `main.css` that neutralizes `animation`/`transition` on `.example-description-track`, the `shimmer` CTAs, and `.tapered-rule` reveals — and gate `useScrollTimeline`/`useHeroSequence` on the matchMedia query so the JS-driven morph is skipped, not just CSS-paused.

### 3.3 No `forced-colors` (Windows High Contrast) support anywhere
**0** `forced-colors` rules. The app leans entirely on `color-mix`/alpha tints (e.g. `bg-destructive/8`, `border-pastel-green/20`, glass `card/35`) that **collapse to transparent** in forced-colors mode — error states, the dock, and pane borders vanish. **Lever:** a `@media (forced-colors: active)` block in `main.css` that restores `1px solid CanvasText`/`ButtonBorder` hairlines on the dock, panes, dialog, and error chips, and pins error/OK affordances to `Mark`/system keywords. glass-ui's ladder uses real `border` declarations (glass.css:24,44,...) so they survive forced-colors better than the local `border-white/10` utilities — another reason to migrate per §2.1.

### 3.4 Focus-visible is ad-hoc; CTAs and ghost buttons have no ring
`btn-cta` (main.css:73-80) and `btn-ghost` (66-71) define hover/active/disabled but **no `focus-visible`** — keyboard users get no ring on the hero's two primary CTAs (HeroSection:106-121) or any ghost button. The split-pane divider does it right (`PlaygroundPage.vue:134` — `focus-visible:ring-2 focus-visible:ring-ring/50`); the rest don't. **Lever:** glass-ui ships a `.focus-ring` utility + the `--focus-ring-shadow` token (`utilities.css`). Add `@apply focus-ring` (or `focus-visible:shadow-[var(--focus-ring-shadow)]`) to `btn-cta`/`btn-ghost` and the `NavBar` dropdown buttons (NavBar.vue:124,150). DESIGN.md migration task already lists this.

### 3.5 Coarse-target floors on the dock & icon-only controls
The `GlassDock` (ControlsBar.vue:33) and its icon buttons are the playground's primary control. glass-ui's `DockIconButton` carries a 44px coarse-pointer floor via `[data-density]` (per CLAUDE.md R0G-6). The app's *hand-rolled* dock children — the ErrorDialog trigger (`ErrorDialog.vue:44`, `px-2 py-1`), the OK chip (ControlsBar.vue:55), and the EditorPanel tab buttons (`EditorPanel.vue:57-78`, `py-0.5`) — fall **below** 44px on touch. **Lever:** route these through glass-ui's `DockIconButton`/`DockTabButton` (from `@mkbabb/glass-ui/dock`) which already encode the coarse floor, rather than bespoke `<button>`s — idiomatic *and* compliant in one move.

### 3.6 Decorative images & icon-only buttons — name audit
Good: `alt=""` is used on decorative example icons (ExampleSelector.vue:60,75; ControlsBar.vue:80). Gap: the icon-only error button (ErrorDialog.vue:44) exposes only the count digits as its name; add `:aria-label="`${errors.length} errors`"`. Confirm every `Tooltip` content also has an accessible-name path for keyboard (tooltips alone aren't names).

---

## 4. Priority-ordered summary (surface → glass-ui lever)

| # | Surface (file:line) | Today | glass-ui lever | Win |
|---|---|---|---|---|
| 1 | `App.vue:17-22` flat SVG grid | flat 6% grid behind whole app | **`<Aurora renderMode="auto" :opacity-ceiling>`** (`/aurora`) | atmosphere + free reduced-motion/perf |
| 2 | `main.css:50-60` `card-*` utils (8 sites) | flat re-impl of the ladder | **`.glass-wash/quiet/resting/floating`** (`/styles`) | real depth: under-shadow + grain + token cascade |
| 3 | `main.css` (none) | 0 reduced-motion, 0 forced-colors | **`@media` guards + Aurora auto** | a11y/vestibular + HCM survival |
| 4 | `EditorPanel.vue:38-39` `Card !shadow-none` | flattened focal pane | drop `!shadow-none` + `.glass-quiet` header | layered depth at the focal surface |
| 5 | `btn-cta`/`btn-ghost`, NavBar, ErrorDialog | no/ad-hoc focus + sub-44px touch | **`.focus-ring`** + **`DockIconButton/DockTabButton`** | keyboard ring + coarse floor |
| 6 | `DocsPage`/`/docs` column | cold card-tint fill | **`<PaperBackdrop>`** (`/paper-backdrop`) | warm textured route-variety |

All six leverage primitives already shipped in the installed `@mkbabb/glass-ui@^3.0.0` `dist/`; none require new dependencies. Items 2, 4, 5, and the focus-ring half of 5 are pre-listed in the app's own `DESIGN.md` migration checklist — this spec grounds them in file:line and pairs each with the exact glass-ui surface/token.

---

## FILE WRITTEN
`/Users/mkbabb/Programming/glass-ui/docs/constellation/next/design/bbnf/WC-design-atmosphere-a11y.md`
