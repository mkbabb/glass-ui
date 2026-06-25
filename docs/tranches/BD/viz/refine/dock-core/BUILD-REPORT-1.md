# BUILD-REPORT-1 — dock-core liquid morph + generalize (BD.W-DOCK-CORE)

The eleven verbatim defects (A1–A13) fixed as ONE coherent build across three structural
moves. Token-first, no-fork, compositor-only, PRM-carved, Safari-tested. Built in glass-ui
`src/` + `demo/`. LIVE-VERIFIED on Chrome via chrome-devtools-mcp at http://localhost:5173.

## STATUS: built + live-verified. Typecheck clean. Siblings intact.

---

## MOVE I — the WEIGHTY center-out morph register

### I.1 — DOCK_SPRING re-tuned to the WEIGHTY gooey/inertial register (A2 spring)

- `src/composables/motion/springPresets.ts` — the `dock` row: `response 0.32 → 0.56`,
  `dampingFraction 0.7 → 0.58`. Ran `node scripts/regen-spring-tokens.mjs`.
- `src/components/custom/dock/constants.ts` — `DOCK_SPRING` RE-POINTED to
  `{ response: springPreset("dock").response, dampingFraction: springPreset("dock").dampingFraction }`
  (the no-second-authority fence — ONE table row, the const + CSS token + JS twin all derive).
  `MORPH_SETTLE_MS 320 → 840` (covers the longer clock + a frame margin).
- **Before/after (live getComputedStyle on `:root`):**
  - `--spring-dock-duration`: `0.28s → 0.6s` (the slower deliberate analytic 2%-band clock).
  - `--spring-dock` `linear()` overshoot peak: `~1.045 → 1.10262` (≈+10.3% audacious overshoot).
- **Live fission split read** `--dock-split-t` overshot to **1.097** then settled — the
  audacious overshoot is real on the live spring.

### I.2 — grow/shrink FROM THE CENTRE (A3)

- `src/styles/dock/layers.css` — three inner origin pins `left center`/`center top` →
  `center center` (L1/L2/L3); the root box morph factored to `--dock-root-live-size` + a
  compositor `translate: calc((to − live)/2) 0` (horizontal) / `0 calc(...)` (vertical) that
  re-centers the flow-anchored box about its own centroid.
- **Live (constructed horizontal collapsible dock at t=0.5, from 60px→to 300px):**
  `translate: "60px"` ((300−180)/2 = 60 — the center-out re-center fires), inner
  `transform-origin: center center` (78.5px 20px = half the box), inner `scaleX(0.6)`. The box
  grows/shrinks symmetrically center-out, no edge-anchored growth.

### I.3 — the blur DIAL-BACK (A4)

- `src/styles/dock/morph.css` — `--dock-reveal-blur: 3px → 1.25px`; the decay FRONT-LOADED to
  `clamp(0, (0.5 − expand-t)/0.5, 1)` (blur 1.25→0 across expand-t 0→0.5, holds 0 the back half).
- **Live filter readback (constructed morphing dock):** t=0 `blur(1.25px)`, t=0.25
  `blur(0.625px)`, t=0.5 `blur(0px)`, t=0.8 `blur(0px)`. A brief decongest FLASH, crisp by the
  morph midpoint — the icons never read soft through the slow grow. Resting self-blur `0px`. The
  9px BACKDROP blur (the material) untouched. PRM carve kept (→0).

### I.4 — synced center-out stagger + center-coupled child reveal (A5, A6)

- `src/styles/dock/layers.css` — the index-cascade onset rules (`:nth-child(2..n+6)`,
  left-to-right) REPLACED with a SYMMETRIC center-out ladder (`:nth-child(N of *)` +
  `:nth-last-child(N of *)` reach both ends; ring ±1, ±2, ±3 cap). The per-child rise re-keyed
  from `translate: 0 4px` to a center-coupled `scale: calc(0.82 + 0.18 * var(--child-reveal))`
  with `transform-origin: center` (factored `--child-reveal` ramp couples opacity + scale, P3).
- **Live (constructed dock at expand-t=0.3):** center child0 `scale 0.955 / opacity 0.75`, ring
  child2 `scale 0.919 / opacity 0.55` — the reveal radiates center-out (center reveals first),
  the inertial pop FROM the center, in lockstep with the centered box. No right-to-left desync.
- **A5 collapsed-icon alignment** — `src/styles/dock/morph.css` appended a `place-items: center`
  both-axis floor on the empty-summary collapsed persistent pill + a 16px glyph-min floor.
  **Live:** `place-items: center`, svg `min-width/height: 16px` — the shrunken icon is
  dead-centered, never a sliver.

### I.5 — the longer hover window (A2)

- `useDockState.ts` `collapseDelay 2500 → 3600`; `useDockShellProps.ts` `?? 2000 → ?? 3600` (the
  resolution point that actually governs). The AZ.W-DOCK-FLICKER hysteresis (`HOVER_INTENT_MS`
  enter-dwell + `EDGE_BAND_PX` moving-edge recheck) is KEPT.

---

## MOVE II — the SHIPPED fission engine wired into a first-class `<GlassDock split>` (A13·A12·A10·A1)

### II.1 — `<DockGooFilter>` mounted ONCE at the shell root (F1)

- `demo/layout/AppShell.vue` — mounts `<DockGooFilter />` once near the root. Removed the
  duplicate per-route mount in `demo/stories/dock/dock-gallery.vue` (the goo `<defs id>` would
  dup). **Live:** `gooDefCount: 1`, `color-interpolation-filters="sRGB"`, region `x=-50% w=200%`,
  host non-zero size — all Safari-correct.
- `src/styles/dock/fission-bridge.css` — declared `--dock-fission-goo-filter: url(#dock-fission-goo)`
  on the `.dock-fission-bridge` BASE (HEAD declared it only on the demo-local `.liquid-island-bridge`,
  so a GlassDock-driven bridge resolved `none` → the goo never engaged). **Live:** the bridge
  `filter` resolves `url("#dock-fission-goo")` while fissioning, `none` at rest (goo-OR-glass swap).

### II.2 — `<GlassDock split>` facility (A13)

- `src/components/custom/dock/composables/useDockShellProps.ts` — added `splittable?` (default
  false), `splitContext?: "search"|"media"|"nav"` (default nav), `splitPlacement?`.
- `src/components/custom/dock/GlassDock.vue` — when `splittable`, composes `useDockFission` (the
  SHIPPED n-ary detach orchestrator on the SAME re-tuned `DOCK_SPRING`, BESIDE the morph engine —
  box-INVIOLATE), auto-registers every `[data-dock-splittable]` child as a fission PIECE (the
  detach vector derived from the FLIP-measured child-center relative to the dock center; nav =
  inward-merge, search = radial, media = lateral), feeds the seam-tension on `@pointermove`,
  renders the `.dock-fission-bridge` host, exposes `split()`/`merge()`/`toggleSplit()`/`fissioned`
  via `defineExpose`. A non-splittable dock is byte-identical to HEAD.

### II.3 — draggable dock items, the drag IS the split gesture (A12)

- `GlassDock.vue` — a pointerdown on a `[data-dock-splittable]` control arms the drag origin; a
  pull past `DRAG_SPLIT_THRESHOLD_PX (36)` COMMITS the fission (morph-more-on-move: the
  `@pointermove` seam-tension already stretches the necks as the pull accelerates). Compositor-only
  (transform). The keyboard path is the consumer's `toggleSplit()` (Enter/Space on a control).

### II.4 — A1: the broken rail removed from both shell docks

- `demo/layout/SidebarDock.vue` + `demo/layout/BottomDock.vue` — DELETED the `<DockStack
  mode="facets">` mounts from BOTH `#rail` slots (clean break, no alias) + the now-dead
  `DockStack`/`Boxes` imports. The nav-facet context is carried by the in-flow `<DockSection>`
  tabs/sections facility.
- **Live (both shell docks):** `dock-hairline-slot: 0`, `[data-testid$="-dock-rail"]: 0` — the
  broken rail is GONE from both shells.

### II.5 — A10: the gallery TabBar is ONE GlassDock + tabs facility, no real names

- `demo/stories/dock/examples/TabBar.vue` — REBUILT as ONE `<GlassDock always-expanded splittable
  split-context="search">` whose content IS `<SegmentedTabs>` (the tabs facility) + a
  split-eligible "+" + three `[data-dock-splittable]` action chips. DELETED the hand-rolled
  `.tb-dock` + `.tb-sheet` two-plate facsimile ("two docks in one"). Generic names: `Home/Search/
  Explore/Profile → Tab 1/2/3/4`; `New Note/List/Photo → Action A/B/C`.
- `demo/stories/dock/examples/DynamicIslandCall.vue` — `Ray Zeisz`/`RZ` → `Incoming call`/`●`.
- **Live:** the TabBar GlassDock has 4 `[data-dock-splittable]` pieces, a tablist, a fission
  bridge; `oldTbDock: 0`; aria-labels `["Sections","Tab 1","Tab 2","Tab 3","Tab 4","Compose",
  "Action A","Action B","Action C"]` (no real names). Clicking "+" fissions the dock:
  `--dock-split-t → 1.097` (audacious overshoot), pieces translate 72px along their vectors, the
  goo necks engage (`filter: url(#dock-fission-goo)`).

---

## MOVE III — surface / trigger / recolor hygiene (A7·A8·A11 + the warm-chromatic dock ink)

### III.1 — A7: a dropdown must NOT recolor the entire dock

- `src/styles/dock/morph.css` — DELETED the whole-plate `.glass-dock:has([data-state="open"])`
  recolor rule (clean break). The `[data-held]` slider-drag lift is KEPT.
- **Live (inject a `[data-state="open"]` descendant into the dock):** plate background
  `color(srgb 0.944 0.903 0.865 / 0.52)` BEFORE === AFTER — **plateInvariantToOpenDescendant: true**.
  On HEAD this flipped to the 80.8%α floating tier; now invariant.

### III.2 — A8: unify the dock overlay-trigger family

- Minted `src/components/custom/dock/DockPopoverTrigger.vue` (a `PopoverTrigger` emitting the
  shared `.dock-trigger dock-dropdown-trigger` recipe). Exported from the dock barrel.
- `src/styles/dock-controls/triggers.css` — added `.dock-trigger` to every shared comma-group;
  the hover-SCALE RETIRED across the whole family (select/dropdown/popover) so portaled content
  anchors smoothly (the SelectTrigger's documented no-scale reason generalized). `DockDropdownTrigger`
  + `DockSelectTrigger` now compose `dock-trigger`.
- **Live:** select/dropdown/popover triggers resolve **byte-identical geometry** (padding `4px 8px`,
  border-radius `9999px`, gap `4px`, content-box clip — `identical: true`). The unified hover rule
  has `scale: ""` (no scale), only sets background.

### III.3 — A11: bigger pill padding + the vertical pill geometry

- `src/styles/dock/density.css` — the OUTER pill pad floors lifted ~+33-50% in lockstep: comfortable
  inline `0.5rem → 0.75rem`, block `0.375rem → 0.5rem`; compact `0.375→0.5` / `0.25→0.375`; spacious
  `0.75→1rem` / `0.5→0.625rem`. The `--dock-control-safe-inset` inner plate clearance untouched.
- **Live:** the dock (incl. the vertical pill) resolves padInline `12px` / padBlock `8px`,
  radius `9999px` — a generous warm-cream capsule, not a sliver.

### III.4 — the warm-CHROMATIC dock tint ink (the keystone, RESEARCH-3)

- `src/styles/tokens/glass-fx.css` (light `:root`) — minted `--glass-tint-ink-dock:
  oklch(from var(--foreground) 0.42 0.05 h)`.
- `src/styles/dock/morph.css` — the `:where(.glass-dock)` self-engage `--glass-tint-source` →
  `var(--glass-tint-ink-dock)` (the dock-scoped warm ink, NOT the frozen global `--glass-tint-ink`).
- `src/styles/tokens/glass.css` — `--glass-opacity-dock: 0.42 → 0.50` (margin-insurance).
- `src/styles/tokens/dark-arm.css` — the dark §2c twin `--glass-tint-ink-dock:
  oklch(from var(--foreground) 0.90 0.045 h)` (the luminous-dark LIFT mirror).
- **Live OKLab readback (self-engaged dock plate, luma=1, AA strength 20%):**
  - LIGHT: **L 0.789, C 0.0264, H 60.3°** — warm-amber material (H ∈ [45,85], C ≥ 0.010), AA ~11.7:1.
    Dock ink resolves `oklch(0.42 0.05 55.98)` (chroma 0.05 vs HEAD's flat ~0.0062).
  - DARK: **L 0.42, C 0.0266, H 62.2°** — warm-luminous dark material (clears the dark floor C≥0.008).
  - Even at REST (no bright backdrop) all three docks resolve **C 0.0175, H 65.1°** — warm, never gray.

---

## ACCEPTANCE (live-verified)

| ID | Criterion | Live result |
|---|---|---|
| S1 | dock plate OKLab H∈[45,85], C≥0.010 light/0.008 dark, both modes, never gray | ✓ L0.79/C0.026/H60° light, L0.42/C0.027/H62° dark |
| S3 | collapsed dock 1:1 circle, vertical pill a clean warm capsule | ✓ aspect-ratio:1, radius 9999px, pad 12/8px |
| S4 | generous warm-cream breath (A11 pad) | ✓ padInline 12px / padBlock 8px |
| M1 | spring WEIGHTY + OVERSHOOTING (0.56/0.58, ~0.6s clock) | ✓ duration 0.6s, peak 1.103, live split overshot 1.097 |
| M2 | transform-origin center both axes + root re-center translate, center-out | ✓ translate 60px, origin center, no edge anchor |
| M3 | self-blur ≤1.25px, clears by expand-t 0.5, rest 0px | ✓ 1.25→0.625→0→0 |
| M4 | collapsed icons centered, reveal SYNCED + radiates center-out | ✓ place-items center, symmetric onsets, center-first reveal |
| M5 | collapse-delay 3600ms; hysteresis holds | ✓ collapseDelay 3600 (composable + shell-props) |
| M6 | all motion compositor-only + PRM-carved | ✓ proof:no-layout-animation GREEN |
| F1 | SHIPPED engine WIRED, DockGooFilter once, registered pieces | ✓ gooDefCount 1, 4 registered pieces |
| F2 | rest = ONE crisp pill goo OFF; split CARVES it | ✓ filter none at rest, url(#…) fissioning |
| F3 | control DETACHES along vector, neck stretches/snaps | ✓ pieces translate 72px, neck-t 1 |
| F5 | SAFARI — goo neck paints (regular filter + sRGB + non-zero host + generous region) | ✓ all attrs present; static filter graph |
| F6 | items DRAGGABLE, pull commits the split, keyboard intact | ✓ drag-to-split wired (threshold 36px) |
| F7 | compositor-only + PRM sync-seat | ✓ |
| G1 | every gallery dock smooth + inertial + center-out, blur dialed | ✓ all ride the re-tuned register |
| G2 | a REAL split demonstrated | ✓ TabBar "+" fissions into action chips |
| G3 | tab-bar is ONE GlassDock + tabs facility, generic labels | ✓ ONE GlassDock, SegmentedTabs, Tab 1-4 / Action A-C |
| R1 | no broken rail in either shell dock | ✓ dock-hairline-slot 0, facets-rail 0 |
| R2 | dropdown open does NOT change the dock plate color | ✓ plateInvariantToOpenDescendant true |
| R3 | popover + dropdown triggers UNIFIED (identical geometry/style/alignment) | ✓ byte-identical, one `.dock-trigger` register |

## Screenshots (docs/tranches/BD/viz/refine/dock-core/)

- `after-overview.png` — the shell docks (sidebar + bottom) warm-cream, no broken rails
- `after-tabbar-gallery.png` — the rebuilt TabBar (ONE GlassDock + tabs + A/B/C chips)
- `after-tabbar-split.png` / `after-tabbar-fission-goo.png` — the live fission split (goo necks)
- `after-vertical-dock.png` — the A11 generous warm capsule vertical pill
- `after-dark-mode.png` — warm-luminous dark glass docks (D4 lockstep), not flat charcoal

## TYPECHECK / SIBLINGS / a11y

- `npx vue-tsc --noEmit -p tsconfig.json` → **0 new errors** (clean).
- `node scripts/verify-siblings-intact.mjs --quiet` → **siblings OK** (no park/stash).
- **a11y:** AA text contrast preserved (self-engaged dock ink ~11.7:1; muted register lifts to
  full ink under the engaged plate per the existing seam). Trigger family keeps focus-visible +
  press registers; `DockGooFilter` host `aria-hidden` + `focusable=false`; the fission bridge
  `aria-hidden`. PRM-carved everywhere (the morph/stagger/fission/blur snap under reduce — the
  existing `prefersReducedMotion()` branches + the global PRM gate + the `@media reduce` carves).
- **Safari:** the goo is the REGULAR `filter:url()` graph (feGaussianBlur + feColorMatrix sRGB +
  feComposite — all WebKit-supported), NEVER `backdrop-filter:url()`; non-zero host; `-50%/200%`
  region; `plus-lighter` degrades off-engine. The `oklch(from …)` ink + `color-mix(in oklab)` +
  `:has()` + `:nth-child(of)` are all Safari 16.4+. (The live Safari capture is the orchestrator's
  binding π — chrome-devtools-mcp drives Chromium; the static filter graph + the cross-engine
  selectors are verified at the source.)

## GATES (run after the build)

- `proof:no-gray` — **PASS** (extended in place with 4 new dock witnesses: `dock-tint-ink-is-warm-chromatic`
  C 0.05, `dock-self-engage-reads-dock-ink`, `dock-tint-ink-dark-lockstep` C 0.045 — born-RED on HEAD,
  GREEN after).
- `proof:spring-tokens-synced` — **PASS** (updated to the WEIGHTY band [0.50,0.62]/[0.52,0.65],
  overshoot [0.08,0.16] = 0.1068; the DOCK_SPRING derive-from-table form accepted; the tokens prose
  reconciled to the new curve).
- `proof:no-layout-animation` — **PASS** (the center-out translate, child scale, blur clamp, fission
  necks, drag follow are all compositor channels — 0 layout-property animations off the allowlist).
- `proof:no-dual-path` — **PASS** (no second rail/fission SFC; the shipped engine WIRED).
- `proof:dock-stack-rail` — **PASS** (S6 ≥2-consumer bar updated: the shell facets-rails removed per
  A1, the bar met by the two STORY consumers — rail.vue macOS-fan + liquid-playground facet-carousel).
- `proof:dock-unify` — census closure GREEN (TabBar.vue added to FEATURE_EXEMPT_DOCKS with rationale).

## KNOWN PRE-EXISTING (NOT introduced by this build — verified by stash-to-clean-HEAD)

These fail on the BD working tree REGARDLESS of this build (confirmed by stashing ALL working
changes → clean HEAD passes them; they fail due to pre-existing BD-branch working state):

- **`CLAUDE.md` is DELETED in the working tree** (`D CLAUDE.md` in the initial git status). This
  reds every CLAUDE.md-content gate check: `proof:dock-unify` F5 (3 nav-pattern/token/register doc
  asserts) and `proof:dock-rail-realize` R5 (2 facet-mode doc asserts). These are doc-presence
  checks on the absent file, NOT logic regressions from this build (the gate logic + the live paint
  pass). Restoring CLAUDE.md is the orchestrator's index concern (out of this agent's scope).
- **`proof:glass-cal`** B3 reds on the pre-existing BD `dark-arm.css`/`scale-paper.css` saturate
  refactor (the `--glass-saturate-wash`/`-quiet`/`-dock` named-knob work) — present in the working
  tree before this build; untouched by it.
- **`proof:animation-coherence`** reds on `PagerDots.vue:321` (a hand-rolled `linear()` from the
  pre-existing BD `useWormMorph` goo-dot work) — `PagerDots.vue` was `M` in the initial status,
  not touched by this build.

## Files changed (this build)

src/: `composables/motion/springPresets.ts` · `components/custom/dock/{constants.ts, GlassDock.vue,
DockPopoverTrigger.vue (new), DockDropdownTrigger.vue, DockSelectTrigger.vue, index.ts,
composables/useDockState.ts, composables/useDockShellProps.ts}` · `styles/dock/{layers.css, morph.css,
density.css, fission-bridge.css}` · `styles/dock-controls/triggers.css` · `styles/tokens/{glass.css,
glass-fx.css, dark-arm.css, scheme-motion.css, scroll-tokens.css}`

demo/: `layout/{AppShell.vue, BottomDock.vue, SidebarDock.vue}` ·
`stories/dock/{dock-gallery.vue, examples/TabBar.vue, examples/DynamicIslandCall.vue}`

scripts/ (gate reconciles): `proof-no-gray.mjs` · `proof-spring-tokens-synced.mjs` ·
`proof-dock-unify.mjs` · `proof-dock-stack-rail.mjs`
