# AX.W45 — Dock three-region morph + H/V proportion parity + `--dock-scale` mobile multiplier + `<DockSeparator>`

**Band** A · DOCK · **Severity** major · **dependsOn** AX.W01 (the single-scalar
`--dock-morph-t` spring the persistent region registers AROUND) + AX.W02 (the ONE
`SpringProgress` orchestrator the morph-region rides; the persistent region sits OUTSIDE
its crossfade) (· AX.W00 for the π-lane close machinery) · **Charter**
`docs/tranches/AX/audit/convergence/CONVERGENCE-PLAN.md` (the NET-NEW W45 row) +
`docs/tranches/AX/audit/convergence/A-waves-dock.md` §3 (the wave-set consolidation: D13 +
D15 are ONE dock-structural wave, not two racing the same files) · **Audit**
`docs/tranches/AX/audit/convergence/D13.md` (persistent controls + H/V proportion +
dividers — the three sub-defects D13-a/b/c) + `docs/tranches/AX/audit/convergence/D15.md`
(dock mobile ~1.5× — coarse-pointer SCALE not FLOOR + glyph ownership) +
`USER-DEFECTS-2026-06-08.md` D13 + D15

---

## State (born-RED — the gate must fail at HEAD before the wave)

The wave is born-RED on FIVE falsifiable witnesses at HEAD `002bda5`, each a source-true
line probe the new gate inverts. (Re-prove each live per the W00 ritual — do NOT proceed on
the audit's word.)

- **RED witness 1 (the headline — there is NO persistent-control region; the dock is a
  binary `full|summary` crossfade).** `GlassDock.vue:261-263` models the outer state as a
  binary `outerActiveLayer = visualExpanded ? "full" : "summary"`. The horizontal template
  (`GlassDock.vue:488-507`) renders EXACTLY two panes — `dock-layer--full` (the `#default`
  slot, the whole expanded control set) and `dock-layer--summary` (the `#collapsed` slot) —
  and on collapse the `--full` layer goes `:inert` + (per `dock.css` `position:absolute`,
  out of flow) while `--summary` becomes the only in-flow content. There is NO third region
  that lives in-flow in BOTH states. The ONLY way a consumer keeps a control visible while
  collapsed today is to HAND-DUPLICATE it into both slots — the demo does exactly this:
  `<Home>` appears in the `#default` slot (`demo/stories/navigation/dock.vue:85`) AND again
  in `#collapsed` (`:91`), a drift-prone double-authoring, not a persistent-element
  contract. **Falsifiable RED:** *parse the `GlassDock.vue` horizontal template — at HEAD it
  emits exactly `dock-layer--full` + `dock-layer--summary` (two panes, no `#persistent`
  slot; RED). After the wave it emits a THIRD `#persistent` region in-flow in both
  collapsed+expanded, never `:inert`, never a morph target, co-laid by the root flex; the
  `<Home>`-in-both-slots demo duplication is retired (GREEN).*

- **RED witness 2 (H and V docks have NO proportion parity — the vertical dock hardcodes
  gap, ignoring the density cascade).** The horizontal dock routes EVERY geometry axis
  through the `.glass-dock[data-density="…"]` cascade (`dock.css:221-326`):
  `--dock-control-size`, `--dock-padding-{block,inline}`, `--dock-layer-{height,gap}`,
  `--dock-tab-{h,padding-*}`, `--dock-trigger-{padding-*}`. The vertical dock
  (`.glass-dock.vertical`, `dock.css:463-491`) is a bare `inline-flex` column with
  **`gap: 0.25rem` HARDCODED** (`:468`) — it does NOT read `--dock-layer-gap`, so a
  `density="spacious"` vertical dock paints an IDENTICAL gap to `compact`. Its `padding`
  reads `var(--dock-vertical-padding, var(--dock-padding-block, 0.375rem))` — a
  density-blind override token, not the density cascade. The template confirms the
  asymmetry: a vertical dock drops the two-layer grid for a bare `<slot />`
  (`GlassDock.vue:509-511`) and is force-`alwaysExpanded` (`:188-193`). **Falsifiable RED:**
  *resolve the computed inter-item `gap` on a `<GlassDock orientation="vertical"
  density="spacious">` vs `density="compact">` mount — at HEAD both are `0.25rem` (the
  density axis is dead on the vertical dock; RED). After the wave the vertical dock reads
  `--dock-layer-gap` so `spacious` (`0.5rem`) ≠ `compact` (`0.25rem`), painting the same
  proportion the horizontal dock tunes (GREEN).*

- **RED witness 3 (the dock has a coarse-pointer FLOOR, not a coarse-pointer SCALE — the
  glyph, padding, gaps stay at desktop scale on touch).** The only mobile responsiveness the
  dock ships is a single WCAG-2.5.5 MINIMUM: `dock.css:1405-1409`
  `@media (pointer: coarse) { .glass-dock[data-density] { --dock-control-size: var(
  --dock-touch-target, 2.75rem); --size-icon-btn: var(--dock-touch-target, 2.75rem); } }`
  plus the companion per-button floor `dock-controls.css:484-488`
  (`.dock-icon-button:not(--compact) { min-block-size/min-inline-size: var(
  --dock-touch-target, 2.75rem) }`). Both pin the control BOX to 44px on touch; NEITHER
  lifts dock padding (`--dock-padding-*`), gaps (`--dock-layer-gap`), tab geometry
  (`--dock-tab-h`/`--dock-tab-padding-*`), trigger geometry, tile-min (`--dock-tile-min`),
  the dock radius, or the icon glyph. So on mobile the box snaps to 44px while the glyph,
  padding, and inter-item gaps stay at their desktop values — a 44px box around a 20px icon
  swimming in desktop padding (worse, not the user's ~1.5× coordinated scale).
  **Falsifiable RED:** *grep `dock.css` + `dock-controls.css` for the coarse-pointer block —
  at HEAD it lifts ONLY `--dock-control-size`/`--size-icon-btn`/`min-{block,inline}-size`
  (two FLOOR rules, no `--dock-scale`; RED). After the wave a single `--dock-scale:
  var(--dock-mobile-scale, 1.5)` threads the WHOLE density cascade so box+pad+gap+tab+
  tile-min+radius grow in lockstep, subsuming both floors via a `max(…, 44px)` WCAG clamp
  (GREEN).*

- **RED witness 4 (the library NEVER sizes the dock icon glyph — there is no
  `.dock-icon-button > svg` rule).** `dock-controls.css` carries a `& > svg` glyph-sizing
  rule ONLY on `.dark-mode-toggle-button` (`:158` — `width:100%;height:100%`). There is NO
  `.dock-icon-button > svg` sizing rule anywhere in `dock-controls.css` (grep `> svg`
  returns the single `:158` hit). `DockIconButton.vue:72` slots its glyph (`<slot />`) with
  no size contract — a dock icon's visual size is whatever the consumer's lucide utility
  bakes in (`size-5`/`h-4 w-4`). The library cannot up-scale "bigger icons on mobile" at all
  because it never owns the glyph size. **Falsifiable RED:** *grep `dock-controls.css` for a
  `.dock-icon-button > svg` width/height rule — at HEAD there is none (the glyph is
  consumer-owned; RED). After the wave `.dock-icon-button > svg { width/height:
  var(--dock-icon-glyph) }` lands (mirroring the dark-mode-toggle's `& > svg` ownership),
  with `--dock-icon-glyph: calc(1.25rem * var(--dock-scale))` so the glyph rides
  `--dock-scale` (GREEN — a consumer-passed explicit size still wins, utility layer >
  component layer).*

- **RED witness 5 (the divider is an axis-blind raw CSS class, not a component —
  component-over-class violation).** "Proper dividing lines" today is a hand-placed
  `<div class="dock-separator" />` the consumer authors inline at **7 demo sites**
  (`demo/stories/navigation/dock.vue:87,111,143,224`, `dock-layers.vue:91,95`,
  `compositions/dock-with-slider.vue:104`; plus the `.dock-spacer` flex-grow sibling at
  `instrument-chassis.vue:226`). `.dock-separator` (`dock.css:1174-1179`) is hardcoded
  `width:1px; height:var(--dock-separator-height)` — a VERTICAL hairline. In a VERTICAL dock
  (column flex) this paints a 1px-WIDE, half-height sliver floating in the column gap — it
  does NOT divide the stack (a vertical dock needs a HORIZONTAL rule: `height:1px;
  width:<cross-extent>`). The separator is **axis-blind** and **not a component** — it
  carries an orientation contract the bare class cannot express, the house
  component-over-class violation. There is NO `DockSeparator` export in the `/dock` barrel
  (`dock/index.ts` exports `GlassDock`/`DockLayerGroup`/`DockLayer`/`DockIconButton`/
  `DockBackgroundToggle`/`DockTabButton`/`DockSelectTrigger`/`DockDropdownTrigger` — no
  separator). **Falsifiable RED:** *grep `dock/index.ts` for `DockSeparator` — at HEAD there
  is no export, and `.dock-separator` is a fixed vertical hairline (axis-blind; RED). After
  the wave `<DockSeparator>` ships from the `/dock` barrel, reads `orientation` via
  `useOptionalDockContext()`, and paints a 1px rule PERPENDICULAR to the layout axis
  (vertical-hairline in a row dock, horizontal-rule in a column dock); the 7 demo sites
  migrate off the raw class (GREEN).*

The wave is RED at HEAD on all five; the HardGate below drives each to GREEN.

> **Witness correction (source-true, recorded for the implementer).** D13.md §c claims the
> `--dock-separator-height` fallback (`dock.css:83`, `calc(var(--dock-h, var(--size-icon-btn))
> * 0.5)`) is a DEAD fallback — "`--dock-h` is never defined anywhere." That is FALSE at
> HEAD: `--dock-h` IS defined at `tokens.css:1013` (`calc(var(--size-icon-btn) + 0.75rem +
> 3px)`), so the separator-height tracks `--dock-h` CORRECTLY (the `--size-icon-btn` fallback
> is the unused leg, not the live value). The dead-fallback class (the W06 USF-2
> `--dock-icon-padding` analogy) does NOT apply here. The REAL divider defect is the
> axis-blindness + raw-class (witness 5), NOT a dead fallback — do not "fix" a non-dead
> token. The `<DockSeparator>` primitive reads the live `--dock-separator-height` for its
> cross-extent on the perpendicular axis.

---

## Goal

The dock's binary `full|summary` crossfade becomes a **three-region morph**
`[persistent][divider][morph-region]` applied SYMMETRICALLY to both axes — a stable
always-present rail beside an expand-on-demand content region (the iOS Now-Playing / Stage
Manager idiom done STRUCTURALLY, no double-authoring) — with H/V proportion parity (one
density token ladder, both orientations), ONE `--dock-scale` coarse-pointer multiplier
growing the whole chrome ~1.5× on touch (subsuming both 44px floors), library ownership of
the icon glyph, and a first-class orientation-aware `<DockSeparator>` primitive replacing
the axis-blind raw class.

---

## Scope (the gestalt fix — one region-model + density-cascade restructure, no patches)

D13 (persistent controls + H/V proportion + dividers) and D15 (mobile scale + glyph
ownership) are the SAME architectural seam — the dock's region model is binary and its
geometry cascade is single-axis — read at multiple altitudes. ONE cohesive restructure, not
five patches. Per A-waves-dock §3, D13's H/V proportion parity (route the vertical dock
through the density cascade) and D15's `--dock-scale` multiplier operate on the IDENTICAL
density-token seam (`dock.css:221-326`) — split across two waves they would author the
cascade twice; folded here they are ONE density-cascade reauthor.

1. **A persistent region — `#persistent` slot threaded as a THIRD region (D13-a, the
   headline).** Add a `#persistent` named slot that lives IN-FLOW in BOTH collapsed and
   expanded states (never `:inert`, never crossfaded out). The dock becomes
   `[persistent][divider][morph-region]` where the morph-region is the EXISTING binary
   `full↔summary` crossfade (`GlassDock.vue:261-263` stays binary FOR THE MORPH region). The
   persistent region sits OUTSIDE the orchestrator's crossfade — co-laid by the root
   flex/grid, registered on the SAME W02 `SpringProgress` ONLY for its co-morphing chrome
   (padding/radius), NOT as a `registerGroup` morph TARGET (it has no pane to swap). This is
   the W02 one-orchestrator design — no second clock, no second spring: the persistent
   region is a layout sibling the orchestrator's root-scalar (`--dock-morph-t`) co-drives
   for padding/radius, not a crossfade participant. Retires the `<Home>`-in-both-slots
   double-authoring (`demo/stories/navigation/dock.vue:85`+`:91`) — the persistent
   `<Home>` is authored ONCE in `#persistent`. RATIFY (see Open Questions): whether the
   persistent rail co-morphs its own width on collapse (proportionally) or holds a fixed
   intrinsic width while only the morph-region's aperture animates.

2. **H/V proportion parity — route `.glass-dock.vertical` through the density cascade
   (D13-b).** DELETE the hardcoded `gap: 0.25rem` (`dock.css:468`) and the density-blind
   `--dock-vertical-padding` override (`:476`); route the vertical dock through the SAME
   `--dock-layer-gap` / `--dock-padding-*` cascade the horizontal dock tunes, so `density`
   paints IDENTICALLY on both axes. Give the vertical dock the same three-region structure
   (persistent rail + divider + content stack) so a multi-section vertical dock has built-in
   rhythm rather than a bare `<slot />` (`GlassDock.vue:509-511`). One token ladder, both
   orientations. The `instrument-strip`/`rail` force-vertical variants (`GlassDock.vue:168-
   172`) inherit the same parity for free.

3. **ONE `--dock-scale` coarse-pointer multiplier (D15 — the density-cascade reauthor).**
   Introduce a single `--dock-scale` knob (default `1`, tokens.css §10 dock block) and
   re-express the per-density geometry as `calc(<base> * var(--dock-scale))` at the token
   edge — set each per-density token to an already-`calc`'d product so the multiplier
   threads through the WHOLE `.glass-dock[data-density]` cascade (`--dock-control-size`,
   `--dock-padding-{block,inline}`, `--dock-layer-{height,gap}`, `--dock-tab-{h,padding-*}`,
   `--dock-trigger-{padding-*}`, `--dock-tile-min`, the dock radius) without touching every
   consumer rule. Then ONE `@media (pointer: coarse)` rule sets `.glass-dock[data-density] {
   --dock-scale: var(--dock-mobile-scale, 1.5); }` and every geometry axis grows in
   lockstep — the desktop proportion preserved, just scaled. `--dock-mobile-scale` (default
   `1.5`) is the public library-default identity (presets-in-consumers: a consumer sets
   `1.3`/`1.75` on `:root` or a dock scope), NOT a magic number sprinkled across rules.

4. **Retire the two coarse floors INTO the scale, with a `max(…, 44px)` WCAG clamp (D15 —
   no legacy double-path).** DELETE the `dock.css:1405` floor block and the
   `dock-controls.css:484` per-button floor block; they become a SINGLE `--dock-scale`-driven
   block. At 1.5× comfortable's 40px control → 60px and spacious's 44px → 66px, both past
   the 44px WCAG target, so the scale SUBSUMES the floor (the floor was a special case of
   "make it bigger on touch"; the scale is the general case). Keep a `max(…, 44px)` clamp
   INSIDE the scaled control-size so a consumer dialing `--dock-mobile-scale` below 1.0
   cannot drop under the WCAG target — the a11y guarantee survives as a CLAMP, not a
   parallel rule (clean break, no two-path).

5. **Library glyph ownership — `.dock-icon-button > svg` reads `--dock-icon-glyph` (D15).**
   Add `.dock-icon-button > svg { width: var(--dock-icon-glyph, 1.25rem); height: var(
   --dock-icon-glyph, 1.25rem); }` to `dock-controls.css` (mirroring the dark-mode-toggle's
   `:158` `& > svg` ownership), with `--dock-icon-glyph: calc(1.25rem * var(--dock-scale))`
   so the glyph rides `--dock-scale` and scales WITH the box instead of swimming. A consumer
   passing an explicit lucide size class still WINS (utility layer > component layer) — a
   DEFAULT, not a ceiling, matching the `.dock-tab-button` font-size precedent
   (`dock-controls.css:227-231`). Closes the "library never sizes the glyph" gap.

6. **`<DockSeparator>` component (D13-c — component-over-class).** Promote the axis-blind
   `.dock-separator` to a `<DockSeparator>` primitive that reads the dock `orientation` via
   `useOptionalDockContext()` (already provided, `dockContext.ts`; `orientation` is on
   `DockContext`) and paints a 1px rule PERPENDICULAR to the layout axis — vertical-hairline
   in a row dock, horizontal-rule sized to the cross-extent in a column dock — off the
   `--surface-tint-*` ladder (`--surface-tint-15`, the current `.dock-separator` background).
   It is a thin oriented `<div>` (KISS) that bundles the axis contract the raw class cannot.
   Export `DockSeparator` from the `/dock` barrel; migrate the 7 demo sites off the raw
   class. The `.dock-spacer` flex-grow `<div>` (`dock.css:1182-1184`, `@apply flex-1`) STAYS
   a class — a flex-grow gap is GENUINELY static decoration (no axis contract), defensibly a
   class per the house rule; only the SEPARATOR (which carries the orientation contract) is
   promoted. (Do NOT promote `.dock-spacer` to a component — that would over-fit a no-axis
   helper.)

All six folds are ONE region-model + density-cascade restructure — gestalt, not six
patches. The morph orchestrator already factors the FLIP (W02); the persistent region is a
layout sibling co-driven by the SAME root scalar; the `--dock-scale` multiplier is one knob
through the existing cascade; the divider is one primitive over the settled cascade.

### SOTA note (the iOS dock idiom this transposes)

The persistent-rail-beside-an-expanding-content-region is the iOS Now-Playing mini-bar /
Stage Manager idiom: a STABLE strip of always-present affordances (transport, gear, home)
with an expand-on-demand content panel beside them. The glass-ui dock today collapses the
ENTIRE control set to a single summary glyph, so the persistent-rail read is structurally
impossible without consumer double-authoring. The three-region model makes it structural.
The `--dock-scale` 1.5× coarse-pointer multiplier is the touch-ergonomics analogue of iOS's
larger-on-iPhone control metrics — a coordinated chrome up-scale, not a per-control minimum.
The morph scalar (`--dock-morph-t`) and the W01 FLIP px-measurement are geometry-AGNOSTIC —
they measure whatever natural size the scaled box produces, so the W01 morph keeps working
at 1.5× with zero changes (PRM is unaffected — scale is geometry, not motion).

### CONVERGE folds (consumer-grounded, NOT executed here)

- **W40 (demo-shell dock-nav) is the downstream dogfood (D9-owner, capability CONSUMER).**
  W40 rebuilds `SidebarDock`/`BottomDock` ON the AX dock; it CONSUMES the new persistent
  region + `--dock-scale` for free and is the dogfood surface that proves the 1.5× live on
  the mobile off-canvas/bottom-bar dock. W40 owns the D9 underline restyle, NOT this
  capability. This wave writes NO W40 source.
- **The D14 axis-tour (W06+W18 augment) is the live-audit anchor.** The dedicated dock
  showcase section W06/W18 author makes this wave's persistent-controls + mobile-scale +
  orientation parity VISIBLE — the axis-tour is the live-audit surface the π-lane reads. This
  wave authors the CAPABILITY; W06/W18 author the showcase.
- **External `--dock-*` consumers inherit the scale token-first.** speedtest dock +
  bbnf-buddy ToolsLayer + the demo SidebarDock/BottomDock are `DockIconButton` hosts that
  inherit `--dock-scale`/`--dock-icon-glyph` from glass-ui's `dist/`; no consumer edit is
  forced (token-first, consumer-overridable). The `> svg` glyph rule clears the ≥2-consumer
  bar at every host. Any consumer that wants a non-1.5× scale sets one token — recorded as a
  cross-repo NOTE (no sibling source here).

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/components/custom/dock/GlassDock.vue` | **Author the three-region template** — add the `#persistent` slot region in-flow in BOTH states (horizontal AND vertical branches), the `[persistent][divider][morph-region]` root layout; the morph-region stays the binary `full↔summary` crossfade (`:261-263` unchanged FOR THE MORPH). Give the vertical branch (`:509-511`) the same three-region structure (not a bare `<slot />`). The `#persistent` region registers on the W02 orchestrator's root-scalar for co-morphing chrome ONLY (NOT a `registerGroup` morph target). |
| `src/components/custom/dock/DockSeparator.vue` | **NEW** — the orientation-aware separator primitive; reads `useOptionalDockContext()` `orientation`, paints a 1px rule perpendicular to the layout axis off `--surface-tint-15`, sized to the cross-extent (the live `--dock-separator-height` for a row dock). Thin oriented `<div>`, single-root attr fall-through. |
| `src/components/custom/dock/index.ts` | **Export** `DockSeparator` from the `/dock` barrel (the `@mkbabb/glass-ui/dock` subpath). |
| `src/styles/dock.css` | Re-express the `.glass-dock[data-density]` cascade geometry (`:221-326`) as `calc(<base> * var(--dock-scale))` products (the multiplier seam); DELETE the hardcoded `.glass-dock.vertical` `gap:0.25rem` (`:468`) + the density-blind `--dock-vertical-padding` override (`:476`) → route through `--dock-layer-gap`/`--dock-padding-*`; REPLACE the coarse-pointer floor block (`:1405-1409`) with the single `--dock-scale: var(--dock-mobile-scale, 1.5)` block + the `max(…, 44px)` clamp; author the three-region layout rules (`.dock-persistent`, the divider slot, the morph-region grid). The `.dock-separator` raw rule stays as the `<DockSeparator>` paint source (read by the component's class) — or relocate its declarations INTO the SFC `<style>` per the component-over-class promotion (RATIFY). |
| `src/styles/dock-controls.css` | **Add** `.dock-icon-button > svg { width/height: var(--dock-icon-glyph, 1.25rem) }` (glyph ownership, mirroring `:158`); DELETE the per-button coarse floor block (`:484-488`) — subsumed by `--dock-scale` + the clamp. |
| `src/styles/tokens.css` | **Add** §10 dock block: `--dock-scale: 1` (the multiplier, default identity), `--dock-mobile-scale: 1.5` (the public coarse-pointer default), `--dock-icon-glyph: calc(1.25rem * var(--dock-scale))` (glyph size). The `--dock-h` (`:1013`) + `--dock-touch-target` (`:1045`) tokens are PRESERVED (the clamp reads `--dock-touch-target`; `--dock-h` is the live separator-height source). |
| `scripts/proof-dock-region-model.mjs` | **NEW** — the device-free arm (source-structure: `#persistent` slot present in both template branches + outside the `:inert` set; the density cascade is `calc(* --dock-scale)`-threaded; the vertical dock reads `--dock-layer-gap`; the `.dock-icon-button > svg` glyph rule + `--dock-icon-glyph` exist; the coarse block is ONE `--dock-scale` rule with a `max(…,44px)` clamp, NOT two floor blocks; `DockSeparator` is exported from the barrel + reads `useOptionalDockContext`). |
| `package.json` | Register `proof:dock-region-model` (+ the W00 meta-gate parity match). |
| `docs/tranches/AX/audit/W45-dock-region-model.json` | **NEW** — the born-RED→GREEN audit artefact + the consumer census + the paired-π BEFORE/AFTER + DELTA reference. |

**OUT of bounds:** the `--dock-morph-t` spring DRIVER + `useLayerTransition.ts` / the
`DOCK_SPRING` const (**W01 owns** — this wave registers the persistent region AROUND the
settled spring, it does NOT retune the morph curve); the `SpringProgress` orchestrator
internals in `dockMorphContext.ts` (**W02 owns** — this wave PROVIDES the persistent region
to the existing orchestrator's root scalar, it does NOT author a second spring or a new
`registerGroup` morph path); the `dock.css`→`src/styles/dock/` PARTITION carve (**W06 owns**
— W06 carves the SETTLED three-region + density-cascade model AFTER this wave; this wave
authors the model IN `dock.css`, it does NOT carve into partials); the `overflow="wrap"`
recipe + the `--dock-overflow-bp`/`--shadow-dock-wrap` token rows (**W04**); the
`--spring-*`/`--ease-apple-spring` cohort (**W05**); the `useDockHold`/Slider hold-state
wiring (**W03**); the storybook IA category-tree / `EXPECTED_TREE` (**W18**); the demo NAV
shell `SidebarDock`/`BottomDock` + the D9 underline restyle (**W40**); the
`ConfiguratorLayer` machined-groove divider (**W21** — a different surface). The demo
separator-site migrations (the 7 `<div class="dock-separator">` → `<DockSeparator>`) ARE in
bounds (demo consumer of THIS wave's new primitive).

---

## Disjointness (sibling waves it must NOT overlap)

W45 is a dock-band wave that mutates `GlassDock.vue` + `dock.css` + `dock-controls.css` +
`tokens.css` — the files W01/W02/W04/W05/W06 serialize on. The band's "cannot run
concurrently" contract applies; the dispatch order:

- **vs W01 (single-scalar morph) — HARD PREDECESSOR.** W01 owns the `--dock-morph-t` spring
  driver (`useLayerTransition.ts`/`dockMorphContext.ts` + the dock.css morph transition).
  W45 **dependsOn W01** — the persistent region registers AROUND the settled spring (the
  W01 FLIP px-measurement is geometry-agnostic, so the persistent region + the 1.5× scale
  compose with the settled morph). Sequencing W45 before W01 would build a region model
  around a spring W01 replaces. Both edit `GlassDock.vue` — W01 owns the morph-driver region
  (the VT removal + the `outerActiveLayer`/orchestrator wiring `:261-291`); W45 owns the
  TEMPLATE region model (`:451-512` — the three-region slots). Coordinate the
  `GlassDock.vue` hunks (W01's `<script>` morph wiring vs W45's `<template>` region) in
  dependency order: sequential, not concurrent.
- **vs W02 (orchestrator DI) — HARD PREDECESSOR.** W02 established the ONE `SpringProgress`
  per dock + the `registerGroup` seam (`dockMorphContext.ts`). W45 **dependsOn W02** — the
  persistent region rides the W02 orchestrator's ROOT scalar for co-morphing chrome, never
  as a new morph target. W45 does NOT edit `dockMorphContext.ts` (no second spring, no new
  `registerGroup` path — the §3a auto-trigger fires if it needs to). File-disjoint on the
  orchestrator internals; sequential by dependsOn.
- **vs W04 (dock overflow/wrap).** BOTH edit `dock.css` + `tokens.css` — W04 the wrap recipe
  + `--dock-overflow-bp`/`--shadow-dock-wrap` rows; W45 the density cascade + the `--dock-
  scale` rows. Disjoint CSS regions (wrap-layout vs density-geometry) + disjoint token
  cohorts (overflow vs scale). Coordinate the `dock.css`/`tokens.css` hunks; no semantic
  overlap. The `--dock-scale` cascade COMPOSES with the wrap cap (the scaled box reflows at
  the same `--dock-max-inline-size` cap — geometry-agnostic).
- **vs W05 (apple-spring excise).** Fully file-disjoint on the SPRING cohort — W05 touches
  the `--spring-*`/`--ease-apple-spring` token rows + SFC consumers; W45 touches the
  `--dock-*` geometry rows. Both edit `tokens.css` but disjoint cohorts (spring-easing vs
  dock-geometry). No overlap.
- **vs W06 (dock.css → partials carve) — DOWNSTREAM.** W06 **dependsOn W01 + W04** and lands
  LAST in the dock band, carving `dock.css` into `src/styles/dock/` partials VERBATIM. W45
  must land BEFORE W06's carve so W06 carves the SETTLED three-region + density-cascade model
  (carving before this restructure would shelve a model W45 rips out — the exact W06
  carve-last rationale). W06 explicitly authors NO morph-driver edits, NO persistent slot, NO
  `DockSeparator`, NO `--dock-scale` (W06 §FileBounds:168 "NO morph-driver edits (W01) / NO
  wrap-recipe edits (W04)"; its `dock-controls.css` touch is ONLY the 44px FLOOR hoist +
  the USF-2 glyph-padding token, NOT a 1.5× scale or the glyph `> svg` rule). **Sequence:
  W01 → W02 → W45 → W04 → W06.** W06 then relocates the SETTLED `DockSeparator` paint rule +
  the `--dock-scale` block into the carved partials. RECOMMENDATION: W06's freshness note
  (`dock.css` 1418 at HEAD) accounts for W45's net additions BEFORE the carve sizing.
- **vs W40 (demo nav shell) — DOWNSTREAM CONSUMER.** W40 rebuilds `SidebarDock`/`BottomDock`
  and explicitly must NOT touch `src/styles/dock*.css`/`src/styles/dock/` (W40 line 94). It
  CONSUMES the persistent region + `--dock-scale` and is the dogfood that proves 1.5× live.
  Not a capability owner.
- **vs W21 (configurator groove).** W21's divider is the `ConfiguratorLayer` machined-groove
  (a different surface); the `<DockSeparator>` is dock-specific. Fully file-disjoint.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤2 agents — the region-model restructure + the density-cascade/scale seam).**
  Agent 1 authors the three-region template (`GlassDock.vue` — the `#persistent` slot in both
  branches + the `[persistent][divider][morph-region]` layout + the vertical-dock parity
  structure) + the `<DockSeparator>` primitive + the barrel export + the 7 demo-site
  migrations. Agent 2 authors the density-cascade `calc(* --dock-scale)` reauthor + the
  `--dock-scale` coarse block + the `max(…,44px)` clamp + the vertical-dock density-cascade
  routing (delete the hardcoded gap) + the `.dock-icon-button > svg` glyph ownership + the
  `tokens.css` §10 additions. Both lint + typecheck at every interval; coordinate the
  `dock.css` hunks (the density-cascade region vs the three-region layout region are
  line-disjoint).
- **Adversarially-verify (≤1 read-only lane).** Re-runs the five RED witnesses against the
  patched tree: confirms the `#persistent` region is in-flow in BOTH states (NOT in the
  `:inert` set, NOT a `registerGroup` morph target); confirms a `density="spacious"`
  vertical dock now reads a LARGER gap than `compact` (the density axis is live on the
  vertical dock); confirms the coarse block is ONE `--dock-scale` rule (NOT two floor blocks)
  + the `max(…,44px)` clamp holds when `--dock-mobile-scale` is dialed below 1.0; confirms
  the `.dock-icon-button > svg` glyph rule + `--dock-icon-glyph` resolve; confirms
  `DockSeparator` exports + reads `useOptionalDockContext` + paints perpendicular to the
  axis. ADVERSARIAL twist: (a) tries to make `proof:dock-region-model` PASS with the
  `<Home>`-in-both-slots duplication still present (confirms the gate REDs on the binary
  two-pane template); (b) tries a `--dock-mobile-scale: 0.5` and confirms the clamp keeps the
  control ≥44px; (c) tries a vertical dock with a `<DockSeparator>` and confirms it paints a
  HORIZONTAL rule (the axis contract). Drives the VISUAL-TRUTH live audit (the binding close).
- **Gate-author (≤1 agent — born-RED→GREEN).** Authors `proof:dock-region-model` (the
  device-free source-structure arm) + the π live arm; confirms each FAILS at `002bda5` (the
  binary two-pane template, the hardcoded vertical gap, the two floor blocks, the missing
  glyph rule, the missing barrel export) and PASSES on the patched tree. Registers
  `proof:dock-region-model` in `package.json` + the W00 meta-gate parity.

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 4.)

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX
REQUIREMENTS §22.4b — mandatory):** the wave-agnostic authorization grant is AX.md §6.1
(work AROUND a roadblock with an idiomatic gestalt fix rather than stall; §6.2 bounds
halt-vs-work-around) — by reference, not restated. This wave's §3a auto-triggers (HALT the
failing unit + dispatch research→plan-augment→redress, never stall):

- **Scope-reveal → halt + triumvirate (Class 2; NEVER absorb in-line):** any need to touch
  the `--dock-morph-t` driver / `useLayerTransition.ts` / `DOCK_SPRING` (W01), the
  `dockMorphContext.ts` orchestrator internals / a SECOND spring / a new `registerGroup`
  morph path (W02 — the persistent region rides the EXISTING root scalar, it does NOT mint a
  morph target), the `dock.css`→partials carve (W06), the wrap recipe / `--dock-overflow-bp`
  rows (W04), the `--spring-*` cohort (W05), or the demo NAV shell `SidebarDock`/`BottomDock`
  (W40) — a scope-reveal → triumvirate, never absorbed in-line.
- **Non-local hard-gate failure → triumvirate (Class 2):** if `proof:dock-region-model` REDs
  non-locally — the `#persistent` region cannot be made in-flow in both states without a
  second clock, OR the density cascade cannot be `calc(* --dock-scale)`-threaded without
  breaking the W01 FLIP measurement, OR the vertical-dock density routing regresses the
  horizontal proportion — escalate the gate/model design, do NOT make a gate pass over a
  residual binary/floor state.
- **3rd diagnostic-loop iteration → triumvirate (Class 2):** if the persistent region does
  NOT read as a stable always-present rail beside the morphing content (it jitters during the
  morph, or the divider mis-aligns the rail), OR the 1.5× mobile scale breaks the dock's
  proportion (the box scales but the glyph/padding read wrong) after three retunes, dispatch
  research→plan→redress rather than tuning constants ad hoc.
- **§5.3 ratify reached un-ratified → HALT-and-ratify (Class 3):** the persistent-rail
  width-on-collapse behaviour (co-morph proportionally vs hold fixed intrinsic), the
  `<DockSeparator>` CSS home (keep the `.dock-separator` rule in `dock.css` as the paint
  source vs relocate into the SFC `<style scoped>`), and the `--dock-mobile-scale` default
  magnitude (1.5 vs a per-density-tier scale) are ratify-before-impl — if reached
  un-ratified, take the recorded default (co-morph proportionally; keep the paint rule in
  `dock.css` read by the component class; flat 1.5) + surface to the orchestrator, do NOT
  self-ratify.

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**`proof:dock-region-model` — born-RED→GREEN. TWO arms (device-free + fail-closed π live).**

### Arm 1 — device-free SOURCE/STRUCTURE (the no-device CI arm)

A source-structure parse (the precept-valid artefact form — the SFC template / CSS string /
barrel is the artefact, NOT a grep-for-runtime-behaviour):

- **Persistent region present in BOTH branches, outside the morph crossfade.** Parse
  `GlassDock.vue` — assert a `#persistent` slot region exists in BOTH the horizontal AND the
  vertical template branch, in-flow (NOT inside the `:inert` set, NOT a `dock-layer--full`/
  `--summary` crossfade pane). **Born-RED at HEAD** (the template emits exactly
  `dock-layer--full` + `dock-layer--summary`; no `#persistent`).
- **H/V proportion parity — the vertical dock reads the density cascade.** Assert
  `.glass-dock.vertical` (or the vertical structure rule) reads `var(--dock-layer-gap)` (NOT
  a hardcoded `gap:0.25rem`) and `var(--dock-padding-*)`. **Born-RED at HEAD** (`gap:0.25rem`
  hardcoded at `dock.css:468`).
- **ONE `--dock-scale` multiplier, NOT two floor blocks.** Assert the `@media (pointer:
  coarse)` dock block sets `--dock-scale: var(--dock-mobile-scale, …)` and the density
  geometry is `calc(* var(--dock-scale))`-threaded; assert NO standalone
  `--dock-control-size: var(--dock-touch-target)` floor block AND NO
  `.dock-icon-button:not(--compact) { min-{block,inline}-size: var(--dock-touch-target) }`
  per-button floor block survive (both subsumed); assert a `max(…, 44px)` WCAG clamp is
  present in the scaled control-size. **Born-RED at HEAD** (the two floor blocks exist at
  `dock.css:1405-1409` + `dock-controls.css:484-488`; no `--dock-scale`).
- **Library glyph ownership.** Assert `.dock-icon-button > svg { width/height: var(
  --dock-icon-glyph, …) }` exists in `dock-controls.css` and `--dock-icon-glyph: calc(1.25rem
  * var(--dock-scale))` resolves in `tokens.css`. **Born-RED at HEAD** (no
  `.dock-icon-button > svg` rule; the only `> svg` is on `.dark-mode-toggle-button:158`).
- **`<DockSeparator>` primitive + barrel export + axis-awareness.** Assert
  `DockSeparator.vue` exists, imports `useOptionalDockContext`, and is exported from
  `dock/index.ts`; assert NO demo `<div class="dock-separator">` survives (the 7 sites
  migrated). **Born-RED at HEAD** (no `DockSeparator` export; 7 raw-class demo sites).

These are **source-structure** proofs (an SFC template region / a CSS cascade rule / a
barrel export is the artefact — the precept-valid form for component/token structure). The
RUNTIME behaviour (the painted pixels) is proven by the π live arm, NOT a text gate.

### Arm 2 — fail-CLOSED π live/render (the device truth arm; the wave's binding close)

A live Playwright + frontend-design render in the π workspace, FAIL-CLOSED (the gate REDs if
the render does not produce the asserted pixels — it never passes on a green source arm
alone). Renders the dock at ≥2 viewports (desktop + 375×667 mobile) in light AND dark:

- **The persistent slot PAINTS in both states on one spring (the headline).** A
  `<GlassDock>` with a `#persistent` `<Home>` + a `#default` control set + a `#collapsed`
  summary: the persistent `<Home>` is VISIBLE both collapsed AND expanded (a pixel readback
  confirms the same glyph in-flow at both states), and during the collapse↔expand morph it
  does NOT crossfade/jitter — it holds steady while the morph-region's aperture animates on
  the ONE spring. FAIL-CLOSED: if the persistent glyph vanishes on collapse (the binary-
  crossfade state) the gate REDs.
- **H/V proportion parity PAINTS.** A `density="spacious"` vertical dock renders a measurably
  LARGER inter-item gap than a `density="compact"` vertical dock (the density axis is live on
  the vertical orientation); the horizontal + vertical docks at the same density read the
  same proportion. FAIL-CLOSED if the vertical gaps are identical across densities.
- **The 1.5× mobile scale PAINTS in lockstep.** At the 375×667 coarse-pointer viewport the
  control box AND the glyph AND the padding AND the inter-item gap all render ~1.5× their
  desktop size (a pixel-measured box + glyph delta above a 1.4× floor, below a 1.6× ceiling)
  — NOT a 44px box around a 20px glyph swimming in desktop padding. FAIL-CLOSED if only the
  box scales (the floor-not-scale state).
- **The clamp holds the WCAG floor.** With `--dock-mobile-scale: 0.5` the control box still
  renders ≥44×44 on touch (the `max(…,44px)` clamp). FAIL-CLOSED if it drops below 44px.
- **`<DockSeparator>` paints perpendicular to the axis.** In a horizontal dock it renders a
  VERTICAL 1px hairline; in a vertical dock a HORIZONTAL 1px rule sized to the cross-extent.
  FAIL-CLOSED if the vertical-dock separator paints a vertical sliver (the axis-blind state).
- **Affordance / hierarchy / spacing / NO visual occlusion** per the AX cardinal gate; no
  regression on the existing morph (the W01/W02 morph still settles on one spring).

**The wave does NOT close on the device-free arm alone** — the executed π live audit
(captured as a paired-π BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/`, per
the W00 protocol) is the binding close criterion. The BEFORE capture pins the HEAD binary-
crossfade / floor-only / axis-blind render the new model must visibly beat. The persistent-
slot-in-both-states + the 1.5×-in-lockstep are the load-bearing visual proofs (the cardinal
AX lesson: green source structure over an unvalidated render is the failure W00 was built to
close — the π arm is fail-closed so a green source arm alone cannot mark this complete).

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the five RED witnesses against
   HEAD `002bda5` on the live demo: the binary two-pane crossfade (no `#persistent`), the
   hardcoded vertical `gap:0.25rem`, the two coarse floor blocks (no `--dock-scale`), the
   missing `.dock-icon-button > svg` glyph rule, the axis-blind raw `.dock-separator` + the 7
   demo sites + the missing barrel export. Confirm W01 (the `--dock-morph-t` spring) + W02
   (the ONE orchestrator) ARE landed (this wave registers AROUND them). Confirm the
   `--dock-h`/`--dock-touch-target` tokens ARE defined (the witness correction). Capture the
   BEFORE π render (Home vanishes on collapse; vertical density dead; floor-not-scale on
   mobile; vertical separator sliver) as the born-RED baseline in
   `audit/W45-dock-region-model.json`. Do NOT proceed on the audit's word — re-prove.
2. **Author the born-RED gate.** `proof:dock-region-model` (the device-free source-structure
   arm + the fail-closed π live arm); register in `package.json` + the W00 meta-gate; confirm
   it FAILS at HEAD.
3. **Three-region template + vertical parity structure.** Author the `#persistent` slot
   region in both `GlassDock.vue` branches + the `[persistent][divider][morph-region]` root
   layout; give the vertical branch the three-region structure (retire the bare `<slot />`);
   wire the persistent region to the W02 orchestrator's root scalar for chrome co-morph
   (NOT a morph target). Lint + typecheck.
4. **Density-cascade `--dock-scale` reauthor.** Re-express the `.glass-dock[data-density]`
   geometry as `calc(* var(--dock-scale))`; delete the hardcoded vertical `gap:0.25rem` +
   the density-blind `--dock-vertical-padding` → route through `--dock-layer-gap`/
   `--dock-padding-*`; add the §10 `tokens.css` block (`--dock-scale`/`--dock-mobile-scale`/
   `--dock-icon-glyph`). Lint + typecheck.
5. **Coarse-pointer scale + clamp + glyph ownership.** Replace the two floor blocks with the
   single `--dock-scale: var(--dock-mobile-scale, 1.5)` coarse block + the `max(…,44px)`
   clamp; add the `.dock-icon-button > svg { width/height: var(--dock-icon-glyph) }` rule.
   Lint + typecheck.
6. **`<DockSeparator>` primitive + barrel + demo migration.** Author `DockSeparator.vue`
   (reads `useOptionalDockContext`, paints perpendicular to the axis); export from
   `dock/index.ts`; migrate the 7 demo `<div class="dock-separator">` sites →
   `<DockSeparator>`; retire the `<Home>`-in-both-slots demo duplication (Home authored once
   in `#persistent`). Lint + typecheck.
7. **Gate GREEN + VISUAL-TRUTH.** Confirm the device-free arm passes; run the fail-closed π
   live audit (persistent slot in both states on one spring; H/V parity; 1.5× lockstep
   scale; clamp floor; axis-aware separator) at ≥2 viewports × light/dark; capture the
   paired-π BEFORE/AFTER + DELTA; write `audit/W45-dock-region-model.json` to GREEN.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W45-dock-region-model.json` — the born-RED→GREEN ledger: the five
  RED witnesses (binary crossfade, hardcoded vertical gap, two floor blocks, missing glyph
  rule, axis-blind raw separator), the witness correction (the `--dock-h` token is live —
  not a dead fallback), the per-fold (D13-a/b/c + D15) disposition, the consumer census (the
  `> svg` ≥2-consumer coverage + the `--dock-scale`/`--dock-icon-glyph` public-token clear),
  and the post-wave GREEN structure + π-readback measurements.
- `scripts/proof-dock-region-model.mjs` — the device-free source-structure arm + the
  fail-closed π live arm.
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): the persistent-slot
  vanish-on-collapse BEFORE vs in-flow-both-states AFTER; the vertical density-dead BEFORE vs
  parity AFTER; the floor-not-scale mobile BEFORE vs 1.5×-lockstep AFTER; the
  vertical-separator-sliver BEFORE vs horizontal-rule AFTER — at ≥2 viewports × light/dark.
- A cross-repo NOTE annex (NOT executed here): the speedtest dock + bbnf-buddy ToolsLayer
  inherit `--dock-scale`/`--dock-icon-glyph` token-first; any non-1.5× consumer override is
  a one-token set (routes to W34 if a consumer wants a different default).

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(dock): proof:dock-region-model born-RED — persistent region, H/V parity, --dock-scale, glyph ownership, DockSeparator (AX.W45)`
2. `feat(dock): three-region morph — #persistent slot in-flow in both states + vertical-dock parity structure (AX.W45 D13-a/b)`
3. `refactor(dock): density cascade as calc(* --dock-scale) + route the vertical dock through --dock-layer-gap (AX.W45 D13-b/D15)`
4. `feat(dock): --dock-scale coarse-pointer multiplier (default 1.5) subsuming both 44px floors via max(…,44px) clamp + glyph ownership (AX.W45 D15)`
5. `feat(dock): <DockSeparator> orientation-aware primitive + barrel export + demo migration off the raw class (AX.W45 D13-c)`
6. `chore(AX.W45): audit ledger GREEN + paired-π BEFORE/AFTER + DELTA + consumer-token NOTE`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER
stage/commit/stash per the hardened agent git clause. These are the messages the
orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W01 (single-scalar morph) — HARD.** W01 owns the `--dock-morph-t` spring driver. W45
  registers the persistent region AROUND the settled spring (the FLIP px-measurement is
  geometry-agnostic, so the persistent region + the 1.5× scale compose). Must run AFTER W01.
- **AX.W02 (orchestrator DI) — HARD.** W02 established the ONE `SpringProgress` per dock +
  the `registerGroup` seam. The persistent region rides W02's root scalar for chrome
  co-morph, never a new morph target. Must run AFTER W02.
- **AX.W00 (π visual-runtime lane) — the close machinery.** The device-free + fail-closed π
  arms ride the W00 lane; the persistent-slot-in-both-states + the 1.5×-lockstep π audit is
  the binding close. W45 cannot close on the source arm alone.
- **Downstream:** **AX.W06** must carve the SETTLED three-region + density-cascade model
  (W45 lands BEFORE W06's carve — W01 → W02 → W45 → W04 → W06). **AX.W18** places the dock
  showcase category; **AX.W40** consumes the persistent region + `--dock-scale` (the mobile
  dogfood). **AX.W34** receives the consumer-token NOTE (any non-1.5× consumer default).

---

## DEDUP (why no OTHER planned wave owns this — the convergence finding proved it)

The convergence audit (`D13.md`, `D15.md`, `A-waves-dock.md`) proved at SOURCE that no
existing wave owns the dock's structural-capability gap — D13 + D15 unify into THIS one
net-new dock-structural wave (NOT two waves racing the same files). The exclusions, restated:

- **vs W06 (dock storybook honest rail + css split) — DISTINCT.** W06 is a
  consolidate/honest/CARVE wave. Its FileBounds (W06:168) state explicitly **"NO morph-driver
  edits (W01) / NO wrap-recipe edits (W04)"**; its `GlassDock.vue` touch is a rail-prop
  type-narrow ONLY; its `dock.css` work is the VERBATIM carve into `src/styles/dock/`
  partials; its `dock-controls.css` touch is the 44px FLOOR hoist + the USF-2 glyph-PADDING
  token — NOT a persistent slot, NOT a `--dock-scale` multiplier, NOT the glyph `> svg`
  ownership rule, NOT H/V proportion parity, NOT a `DockSeparator` component. W06 carries NO
  region-model edit (A-waves-dock §1: "W06's own four folds are SUFFICIENT and unchanged").
  W45 authors the structural CAPABILITY; W06 carves it AFTER (W01 → W02 → W45 → W04 → W06).
  The carve would MOVE `.dock-separator` into a partial UNCHANGED — it does not fix the
  axis-blindness or promote it to a component. **W06 ≠ this wave.**
- **vs W40 (demo-shell dock-nav reaudit) — DISTINCT (CONSUMER).** W40 rebuilds the DEMO nav
  shell (`SidebarDock`/`BottomDock`) ON the AX dock and must NOT touch `src/styles/dock*.css`
  (W40:94). It CONSUMES the persistent region + `--dock-scale` downstream (the mobile
  dogfood) and owns the D9 underline restyle — it adds NO primitive capability. A
  persistent-control slot + a divider component + a scale multiplier are UPSTREAM of it (W40
  consumes them). **W40 ≠ this wave.**
- **vs W21 (configurator groove divider) — DISTINCT (different surface).** W21's divider work
  is the CONFIGURATOR machined-groove (porting the `.instrument-rail` twin-line groove into
  `ConfiguratorLayer` rows) — a DIFFERENT surface entirely. The `<DockSeparator>` is
  dock-specific (reads the dock `orientation` via `useOptionalDockContext`). **W21 ≠ this
  wave.**
- **vs W01/W02 (morph driver + orchestrator) — PREDECESSORS, not owners of THIS scope.** W01
  owns the `--dock-morph-t` spring; W02 owns the ONE `SpringProgress` + `registerGroup`.
  Neither authors a persistent REGION, H/V proportion PARITY, a `--dock-scale` MULTIPLIER, a
  glyph OWNERSHIP rule, or a `DockSeparator` COMPONENT — those are this wave's structural
  capability ON TOP OF the settled morph engine. **W01/W02 ≠ this wave.**
- **D13 + D15 are ONE wave, not two (A-waves-dock §3 — the wave-set headline).** Both edit
  the SAME three files (`GlassDock.vue` + `dock.css`/the carved partials + `dock-controls.css`)
  on the SAME density-token seam (`dock.css:221-326`): D13-b's H/V proportion parity (route
  the vertical dock through the density cascade) and D15's `--dock-scale` multiplier are the
  SAME cascade reauthor; D13-c's `<DockSeparator>` and D15's glyph ownership are both
  component-over-class/token-first fixes on the dock-control family. Two separate waves would
  RACE each other for the same files (the band's "cannot run concurrently" violation) and
  author the density cascade TWICE. Folded here, they are ONE region-model + density-cascade
  restructure — gestalt, not two parallel patches.

No planned wave owns the dock's structural-capability gap (persistent controls, H/V
proportion parity, a coordinated mobile scale, glyph ownership, a divider component). This is
NET-NEW, as the CONVERGENCE-PLAN W45 row + A-waves-dock §6 verdict ratified.
