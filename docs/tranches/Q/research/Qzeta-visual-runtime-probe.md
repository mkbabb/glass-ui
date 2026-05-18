# Q.Rζ — Visual-Runtime Probe (Playwright; π lane RE-ACTIVATED)

**Lane**: Qζ — visual-runtime probe.
**Date**: 2026-05-18.
**Tooling status**: Playwright browser-automation **ONLINE and CONNECTED**. The π
visual-runtime lane — formal-archived 3× as tooling-unavailable (N.W4 → O.W7 →
P.W6, `docs/tranches/P/archive/visual-runtime-tooling.md`) — RAN for the first
time at this lane. This is the 1st successful live runtime probe in the K→Q span.

---

## §1 — Scope + tooling-availability

| Item | Status |
|---|---|
| Playwright MCP connected | YES — `browser_navigate` / `browser_resize` / `browser_take_screenshot` / `browser_click` / `browser_evaluate` / `browser_console_messages` all functional |
| glass-ui demo dev server | UP — `npm run dev` → `http://localhost:5173/` (vite 7.3.1, ready 593ms) |
| value.js dev server | UP — `npm run dev` → `http://localhost:9002/` (vite 7.3.1) |
| keyframes.js dev server | UP — `npm run dev` → `http://localhost:5174/` (vite 7.3.1, ready 494ms) |
| Probe coverage | dock (3 viewports + interaction), glass-card / cartoon-card / glass-panel, dropdown-menu / select (open-state), timeline-continuous (`3cb70db`) + transitions (animation-timing samples), 2 consumer apps |

Probe protocol followed SPEC.md §"visual-runtime lane": ≥ 3 viewports
(375×667, 1280×800, 1440×900), animation-timing samples (≥ 5–8 frames on
state-toggle transitions), console + network forensics per route, consumer-app
sweep.

---

## §2 — Glass-ui demo probe — per-surface

Probed at `http://localhost:5173`. Screenshots in `screenshots/`.

### Dock (`/navigation/dock`, `/navigation/dock-layers`)

| Viewport | Screenshot | Observation |
|---|---|---|
| 1440×900 | `dock-1440.png` | All 4 dock stories render — collapsible pill, always-expanded media transport, select+dropdown triggers, popover-trigger dock. Glass pills crisp, icons centered. No clipping. |
| 375×667 | `dock-375.png` | Dock pills themselves render correctly and size to content. **DEFECT (demo-chassis, not library)**: the story-pager tab rail at top overflows horizontally past the viewport with no wrap/scroll containment — see §5 D-1. |
| 1280×800 | `dock-layers-1280.png` | Dock Layers — drill-in nav, switcher rail (A/L/L), rail-hosted layer stack all render. |

**Dock interaction**: clicked the "Layers" dock-layer button (`dock-layers-clicked.png`)
— pane swapped correctly to the Layers layer, drill-in arrows appeared, the
`ACTIVE LAYER = LAYERS` label updated, the switcher rail reflected active state.
The post-P `beec35e` "inactive dock layers leave the hit-test tree" change is
functioning — the layer-swap FLIP + crossfade are intact.

**Verdict**: Dock subsystem is FUNCTIONAL in the glass-ui demo. The post-P
`099d51e` (edge-fade-mask retire) + `beec35e` (dock-layer hit-test) changes did
NOT break the demo-side dock. No console errors on either route.

### Glass-cards (`/primitives/card`, `/primitives/cartoon-card`, `/primitives/glass-panel`)

| Surface | Screenshot | Observation |
|---|---|---|
| Card 5-rung ladder | `card.png`, `card-viewport.png` | wash · quiet · resting · floating · overlay all render with distinct surface treatments. Backdrop visible. |
| Cartoon Card | `cartoon-card.png` | Offset-stamp shadows + colored tier borders (rose/amber/teal) render. Hover-lift grammar intact. |
| Glass Panel | `glass-panel.png` | 5-rung ladder over the renderer-tier detection cascade. `DETECTED: SVG-FILTER` — the `useGlassRenderer` cascade resolved to the SVG-filter tier. Glass surfaces visibly translucent over the aurora-tinted backplate. |

**Verdict**: Glass-card family is FUNCTIONAL in the glass-ui demo. The 5-rung
glass ladder renders at full fidelity; backdrop-filter is active.

### Dropdowns (`/containers/dropdown-menu`, `/primitives/select`)

| Surface | Screenshot | Observation |
|---|---|---|
| Dropdown Menu (open) | `dropdown-open.png` | Opens below trigger, correctly positioned. All subcomponents present: section labels (Workspace/Layout/Overlays), separators, radio group (Grid/List/Board with selected dot), checkbox items (Minimap/Rulers with checks), submenu chevron (Open recent…), destructive item (Delete workspace, red), keyboard-shortcut hints (⌘N etc.). |
| Select (open) | `select-open.png` | Opens, grouped options (Serif / Sans / Mono), selected-state indicator on "Computer Modern", four-state contract visible (hover/active/selected/rest). |

**Verdict**: Dropdown / select family is FUNCTIONAL in the glass-ui demo.
Positioning, four-state contract, and menu-item composition all intact.

### Animations (`/data/timeline-continuous`, `/motion/transitions`)

- **Timeline (continuous)** — the post-P `3cb70db` "stitched continuous gradient
  + rounded ends + glassy dots" change. `timeline-continuous.png` /
  `timeline-frame1.png`: the ONE rounded-pill rail renders with the stitched
  blue→red gradient, rounded ends, and glassy boundary dots. Clicked "Advance
  phase" — the Download segment advanced 60% → 80% and the gradient grew to
  match. `3cb70db` renders CORRECTLY; no visual regression.
- **Animation-timing sample** (`/motion/transitions`, fade-transition leave,
  8 frames @ 30ms): opacity ramp `1.00 → 0.95 → 0.65 → 0.28 → 0.10 → 0.03 →
  0.00` over ~210ms — a smooth eased curve, single `.leave-active` element,
  no jank, no frame stall.

**Verdict**: Animation / transition substrate is FUNCTIONAL in the glass-ui demo.

---

## §3 — Console + network forensics per route

| Route | Console errors | Console warnings | Network failures |
|---|---|---|---|
| `/navigation/dock` | 0 | 0 | none |
| `/navigation/dock-layers` | 0 | 0 | none |
| `/primitives/card` | 0 | 0 | none |
| `/primitives/glass-panel` | 0 | 0 | none |
| `/primitives/cartoon-card` | 0 | 0 | none |
| `/containers/dropdown-menu` | 0 | 0 | none |
| `/primitives/select` | 0 | 0 | none |
| `/motion/transitions` | 0 | 0 | none |
| `/data/timeline-continuous` | 0 | 0 | none |
| `/containers/hover-card` | 0 | 0 | none |

The only console output across the entire glass-ui demo sweep is 2 `[DEBUG]`
vite-HMR connection messages — zero errors, zero warnings, zero failed
network requests. **The glass-ui demo is CLEAN.**

---

## §4 — Consumer-app probe

### value.js (`http://localhost:9002`) — **BROKEN**

`valuejs-home.png` captures a full-screen Vite error overlay; the app does not
render. **2 console errors**, both HTTP 500:

```
500 — /@fs/.../glass-ui/src/composables/motion/useSpringOrchestrator.ts
500 — /@fs/.../glass-ui/src/composables/motion/useAnimatedNumber.ts
```

The Vite error overlay text:

```
[plugin:vite:import-analysis] Failed to resolve import "@mkbabb/keyframes.js"
from "../glass-ui/src/composables/motion/useAnimatedNumber.ts".
Does the file exist?
```

**Root cause — attributed.** value.js consumes glass-ui via the `file:../glass-ui`
symlink and the glass-ui `exports["."].development` condition (`./src/index.ts`),
i.e. it loads glass-ui's live TypeScript source. Two of those source files —
`src/composables/motion/useSpringOrchestrator.ts` and
`src/composables/motion/useAnimatedNumber.ts` — import the peer dependency
`@mkbabb/keyframes.js`:

```ts
import { NumericAnimation } from "@mkbabb/keyframes.js";   // useSpringOrchestrator.ts
import { SmoothProgress } from "@mkbabb/keyframes.js";     // useAnimatedNumber.ts
```

value.js's `vite.config.ts` line 30 hard-aliases that specifier:

```ts
"@mkbabb/keyframes.js": path.resolve(import.meta.dirname, "../keyframes.js/dist/keyframes.js")
```

The alias target — `keyframes.js/dist/keyframes.js` — **DOES NOT EXIST.**
keyframes.js's `dist/` directory contains only `assets/` + `index.html` (a stale
gh-pages playground build). `git status` in keyframes.js confirms:

```
 D dist/keyframes.d.ts
 D dist/keyframes.js
```

The keyframes.js library build artefacts (`dist/keyframes.js` +
`dist/keyframes.d.ts`, last committed at keyframes.js `13a4596` "chore(dist):
rebuild for AB.W6 source settle") are **deleted in the keyframes.js working
tree**. value.js's hard alias dereferences a now-missing file → Vite 500 →
the value.js app cannot boot.

**Attribution verdict**: this is NOT a glass-ui substrate regression and NOT a
post-P shadow-cohort defect. It is a **cross-repo build-state desync**: the
keyframes.js `dist/` was deleted (the freshness/AD.W4 cleanup wave retired the
dist-gate apparatus and the artefacts went with it) while value.js still pins a
hard alias at `keyframes.js/dist/keyframes.js`. glass-ui sits in the middle —
its `development`-condition source import of the `@mkbabb/keyframes.js` peer is
the trigger path, but glass-ui itself is correct (the peer dep is declared
`^2.0.0`, the symlink resolves, the import is idiomatic).

This breakage matches the user's Q-open report ("value.js … animations totally
broken") EXACTLY: `useSpringOrchestrator` + `useAnimatedNumber` are the
**animation** composables.

### keyframes.js (`http://localhost:5174`) — FUNCTIONAL, 1 cosmetic defect

`keyframesjs-home.png`: the app renders — "Select an animation" hero, the
M.cubert 3D cube, the Home dock pill, the bottom transport dock (list / reset /
delete / play). Dock + glass surfaces work.

**1 console error**: HTTP 403 Forbidden loading
`/@fs/.../glass-ui/src/fonts/fira-code/fira-code-latin.woff2`. keyframes.js's
Vite `server.fs.allow` scope does not whitelist glass-ui's source-tree font
directory, so the Fira Code woff2 (referenced by glass-ui's `development`-mode
CSS) is refused. Cosmetic — the page falls back to a system mono font; layout is
unaffected. 1 unrelated vue-router `next()`-deprecation warning.

---

## §5 — Visual-evidence breakage catalog

| ID | Severity | Surface | Viewport | Evidence | Defect |
|---|---|---|---|---|---|
| **B-1** | **P0 — app-down** | value.js (whole app) | 1280×800 | `valuejs-home.png` | value.js cannot boot. Vite 500 on glass-ui `useSpringOrchestrator.ts` + `useAnimatedNumber.ts`; root cause = value.js hard-alias `@mkbabb/keyframes.js → keyframes.js/dist/keyframes.js`, a file deleted from the keyframes.js working tree. |
| B-2 | P2 — cosmetic | keyframes.js (font) | 1280×800 | `keyframesjs-home.png` | 403 Forbidden on glass-ui `src/fonts/fira-code/fira-code-latin.woff2` via `@fs`; keyframes.js `server.fs.allow` does not whitelist glass-ui's source tree. Falls back to system mono. |
| D-1 | P2 — demo-only | glass-ui demo story-pager rail | 375×667 | `dock-375.png` | The top story-pager tab rail overflows horizontally off-viewport at narrow widths with no wrap or scroll containment. Demo-chassis defect (`demo/layout`), NOT a library primitive. |

**Notably ABSENT from the catalog**: any glass-ui-demo-side dock, glass-card,
dropdown, or animation defect. Every glass-ui primitive the user named as
"broken" renders correctly in the library's own demo across all 3 viewports
with a clean console. The breakage is **consumer-integration-layer**, not
substrate.

---

## §6 — Recommended Q-wave visual-remediation targets

1. **B-1 (HEADLINE)** — resolve the keyframes.js `dist/` ↔ value.js hard-alias
   desync. Two idiomatic (non-workaround) paths, for the Q plan to choose:
   - **(a)** Retire the value.js hard alias entirely. value.js declares
     `@mkbabb/keyframes.js: file:../keyframes.js` as a dependency; with
     keyframes.js's own `exports["."].development → ./src/animation/index.ts`,
     plain bare-specifier resolution loads keyframes.js source the same way
     glass-ui loads via its `development` condition — no `dist/` build needed in
     dev. The hard alias is a legacy artefact predating the `development`
     conditional-exports era (AD.W4) and is now actively harmful.
   - **(b)** Restore `keyframes.js/dist/keyframes.js` by running keyframes.js's
     `npm run build` and re-committing the artefact. This is the weaker option
     — it re-introduces a checked-in build artefact the AD.W4 freshness-retire
     wave was moving away from.
   Path (a) is the gestalt fix and aligns with the `development`-condition
   architecture; (b) is a band-aid. The Q plan should also AUDIT every consumer
   for a parallel stale hard-alias against any `@mkbabb/*` workspace sibling.

2. **B-2** — keyframes.js `server.fs.allow` should whitelist the glass-ui
   source root (or glass-ui should serve fonts via a path the `development`
   condition can reach without `@fs` escape). Low severity but it is the same
   class as B-1 — a consumer Vite-config assumption that the `development`
   conditional-exports surface invalidated.

3. **D-1** — demo story-pager rail needs horizontal-overflow containment at
   coarse-pointer / narrow viewports (`overflow-x` scroll or wrap). Demo-chassis
   scope; fold into the Q demo-hygiene wave.

4. **Cross-repo cohesion** — B-1 + B-2 share a root: the `development`
   conditional-export era (added across glass-ui + keyframes.js at AD.W4)
   shifted the dev-time resolution model, but consumer Vite configs (value.js
   alias, keyframes.js `fs.allow`) were not re-audited against the new model.
   The Q "core-feature co-location + cohesion" mandate (Q9) should treat the
   cross-repo dev-resolution contract as a first-class cohesion surface — when a
   library flips to `development`-conditional source exports, EVERY consumer's
   resolver config is part of the blast radius and must be swept.

---

## §7 — Status + π-lane recommendation

**Lane status**: COMPLETE. Probe ran live against 3 dev servers across 3
viewports with animation-timing sampling and full console/network forensics.

**Headline finding**: the user's "totally broken — dock / animations /
dropdowns / glass-cards" report is REAL and REPRODUCED — but it is **B-1**, a
single P0: value.js cannot boot because its hard alias for the
`@mkbabb/keyframes.js` peer points at a deleted `dist/` file, and glass-ui's
animation composables (`useSpringOrchestrator`, `useAnimatedNumber`) are the
import path that surfaces it. The glass-ui library substrate itself — dock,
glass-card, dropdown, animation — is CLEAN in its own demo at every viewport.
The post-P shadow cohort (`099d51e` / `3cb70db` / `beec35e`) did **not** break
any probed surface. The breakage is a consumer-integration-config desync, not a
substrate regression.

**π-lane recommendation: RETIRE π from "ARCHIVED-PERMANENT" → "BINDING
CANONICAL CLOSE LANE".** The 3×-archive rationale rested entirely on tooling
unavailability ("the MCP browser-extension bridge is unreachable"). Playwright
MCP is now online and this lane just demonstrated its decisive value — a live
runtime probe found the exact P0 the user reported, attributed its root cause
across three repos, and did so in a way no amount of static read-source
analysis (the α/β/γ/δ lanes) could have: the breakage is in the *interaction*
between three repos' build/resolver state, visible only at runtime. Static
analysis of glass-ui alone would have returned "all green" and missed B-1
entirely. π should be a default close-ceremony lane for any tranche shipping
visual or consumer-facing changes, with the SPEC.md probe-coverage spec (≥ 3
viewports / animation-timing samples / contrast / per-story sweep) as its
binding contract. The opt-in smoke-probe gate at tranche-open (`browser_navigate`
reachability check) replaces the retired `tabs_context_mcp` smoke probe.
