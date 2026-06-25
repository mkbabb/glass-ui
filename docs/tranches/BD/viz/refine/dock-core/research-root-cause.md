# Dock-core liquid-animation defects — CONFIRMED root causes (RESEARCH-1, live)

Live-inspected on `http://localhost:5173` (Chrome DevTools MCP, real getComputedStyle +
frame-series sampling). Glass chrome reads warm-cream (NOT gray) — the BA.W-NO-GRAY floor
holds; every defect below is MOTION / STRUCTURE / SCOPED-RECOLOR, not a gray-glass token bug.

## Environment blockers encountered (pre-existing, concurrent BD work — NOT dock defects)

The dev app was broken by concurrent BD viz edits; I cleared two to inspect, the rest are
another agent's in-flight surface and must NOT be chased by the dock fix:

1. **`src/composables/glass/wave/waveField.glsl.ts:33` + `waveField.wgsl.ts:29`** — a stray
   `` `amp` `` backtick INSIDE the GLSL/WGSL template-literal body terminated the JS string
   → `[plugin:vite:oxc] PARSE_ERROR`, HMR overlay blocked the WHOLE app. FIXED (removed the
   two backticks; comments only, zero shader-byte change) to enable inspection.
2. **`src/components/custom/concentric/`** — a mid-flight refactor (radial ring engine →
   topographic contour map) removed `MAX_CENTERS`/`MAX_RINGS`/`renderModeToInt` from
   `constants.ts` while `useConcentric.ts`/`concentricGLSetup.ts`/`index.ts` still import
   them → 500 on any route whose manifest pulls concentric (incl. `/dock/dock-gallery`). This
   is another agent's active edit (a linter reverted my speculative restore). DO NOT touch —
   the dock-gallery DOM was analyzed from source instead. The app re-breaks intermittently as
   that work churns shared chunks.

`/dock/overview` rendered cleanly and is the source of all live frame-series data below.

---

## A1 — the BROKEN RAIL element in both shell docks  [CONFIRMED]

**Mechanism.** `demo/layout/SidebarDock.vue:416` AND `demo/layout/BottomDock.vue:382` both
mount `<DockStack mode="facets" :core="Boxes" core-label="Section facets">` in `<GlassDock>`'s
`#rail` slot, gated `v-if="railItems.length"`. This renders a `.dock-hairline-slot` +
`.dock-stack` in the dock gutter (`.glass-dock-frame` escape, `position:absolute`,
`pointer-events:none`).

**Live evidence (overview page, both shells present):**
- `.dock-hairline-slot.horizontal` = 997×40 absolute over the bottom dock; `.dock-hairline-slot.vertical` = 59×116 over the sidebar.
- The `.dock-stack-core` (the `Boxes` cluster-of-circles glyph) renders **visible, 40×40, opacity 1** at the dock's trailing edge.
- The facet MEMBERS are `opacity:0` at rest (folded behind the core — `DockStack.vue:191`) yet render at mismatched sizes (`is-active` 32px vs inactive 13px → a half-collapsed "broken" cluster).
- **Screenshot-confirmed:** on the wide bottom dock the `Boxes` core glyph paints ON TOP of the nav-tab text (a stray ring cluster overlapping "Dock Layers") — the user's "broken rail element."

**Root cause.** The `mode="facets"` DockStack rail is the wrong affordance for a NAV shell
dock — it adds a second glyph cluster + a half-rendered carousel in the gutter that collides
with the dock content. The `<DockStack>` (DockStack.vue) + `stack-rail.css` render a resting
core anchor regardless of whether the fan is open.

**Fix direction.** Remove the `<DockStack>` rail from the two shell nav docks (or replace the
facet-carousel with the generalized split/morph facility once A13 lands). The shell nav docks
need NO gutter rail — facet switching should be the tab strip itself (A10 lesson).

---

## A2 — shrunken states + LONGER hover/interaction window  [CONFIRMED]

**Mechanism / live values** (`src/components/custom/dock/{constants.ts,composables/useDockState.ts}`):
- `collapseDelay = 2500` ms (auto-collapse after mouseleave) — `useDockState.ts:78`.
- `HOVER_INTENT_MS = 60` ms (intent-dwell before expand) — `constants.ts:108`.
- The collapsible overview dock has an **EMPTY** `#collapsed` summary (childCount 0), so it
  collapses to a 55px circle (only the `#persistent` Home pill remains; the `:empty` rule
  morph.css:314 zeroes the summary).

**Root cause.** The 2500ms collapse delay is reasonable but the user wants it LONGER/more
forgiving (the dock collapses while they are still aiming). The dwell is fine. The shell docks
are `always-expanded` so they never get a shrunken state at all — A2 also asks that the shell
docks gain a proper shrunken state with the longer window.

**Fix direction.** Raise `collapseDelay` (e.g. 2500→3500-4000) and/or widen the edge-band
recheck; give the shell docks a genuine collapsible mode with the same window.

---

## A3 — docks GROW FROM THE RIGHT; must grow from + shrink to the CENTRE  [CONFIRMED — exact mechanism]

**Two LEFT/start-anchored growth legs**, both in `src/styles/dock/layers.css`:

1. **Inner `.dock-layers` (the content scale):**
   ```css
   .glass-dock[data-morphing] .dock-layers {
       inline-size: max(var(--dock-morph-to), var(--dock-morph-min, 2.75rem));
       transform: scaleX(var(--dock-morph-scale));
       transform-origin: left center;   /* ← layers.css:88 — ALWAYS grows rightward */
   }
   ```
   The vertical twin (`:130-139`, `:143-150`) uses `transform-origin: center top` → grows
   DOWNWARD from the top, not from center.

2. **Root `.glass-dock` box (the layout size):**
   ```css
   .glass-dock[data-morphing]:not(.vertical) {
       inline-size: calc(from + (to-from) * --dock-morph-t);   /* layers.css:106 */
   }
   ```
   A `display:inline-flex`/`flex` box growing its `inline-size` keeps its **start (left) edge
   pinned** in flow → the right edge sweeps out. (`dockMorphContext.ts` + `dockMorphMeasure.ts`
   `armRootMorphSpan` drive this; `transform-origin` of the ROOT is `center` but the root uses
   `inline-size`, NOT a transform, so origin is irrelevant for the box.)

**Live frame-series (collapse→expand of the centered overview dock):** collapsed `L:734 R:789`
(center 761) → expanded `L:656 R:868` (center 762). It *appears* center-grown ONLY because the
demo container centers the dock (`justify-content` symmetric). On a **left-anchored** dock (the
bottom shell dock, the gallery tiles, any in-flow dock) the same recipe grows rightward — that
is what the user sees.

**Root cause.** The inner `transform-origin: left center`/`center top` is hard-left/top-anchored,
and the root box grows via flow-anchored `inline-size`. Neither is center-symmetric.

**Fix direction.** (a) Set the inner scale origin to `center` (and `center` for vertical).
(b) Make the ROOT box growth center-symmetric — either couple a compositor `translateX` of
`-(liveWidth - settledWidth)/2` to the root's inline-size ramp (origin-correct), or guarantee
the dock container centers the box so the symmetric inline-size growth reads center-out. The
center-out requirement is universal (both axes, both directions, shell + free docks).

---

## A4 — dock BLURRING far too EXTREME / too long  [CONFIRMED — frame-series]

**Two blur layers stack:**
1. **Resting backdrop (the glass material):** `--glass-blur-dock` =
   `blur(9px) saturate(1.4) brightness(1.02)` (live `backdrop-filter`, glass.css:92/155). 9px
   is the W-GLASS-CAL calm radius — acceptable at rest.
2. **The morph self-blur (the offender):** morph.css:78-80 —
   ```css
   .glass-dock[data-morphing] {
       --dock-reveal-blur: 3px;
       filter: blur(calc(var(--dock-reveal-blur) * (1 - var(--dock-expand-t, 1))));
   }
   ```
   This is a `filter: blur()` on the dock's OWN pixels (icons + text + plate), peaking at 3px
   at morph start and decaying as `(1 - expand-t)`.

**Live frame-series (expand morph, ~660ms total):** `dt:66 blur(3px)` → `dt:90 blur(2.72px)`
→ `dt:123 blur(1.88px)` → `dt:157 blur(1.04px)` → `dt:223 blur(0.06px)` → `dt:454 blur≈0`. So
the ENTIRE dock (including the icons) is meaningfully blurred (>1px) for the first ~160ms and
non-zero to ~230ms, and `data-morphing` stays armed (carrying the filter root) to ~731ms.
Combined with the 9px backdrop, the morph reads as a long blurry smear of the icons.

**Root cause.** The `--dock-reveal-blur: 3px` own-pixel self-blur (the "iOS-27 bloom") is too
strong (3px on the glyphs) and decays over the full morph window. The icons blur during the
whole grow (also feeds the A5/A6 "icons look wrong" perception).

**Fix direction.** Dial `--dock-reveal-blur` down hard (≈1-1.5px) and/or front-load its decay
so the glyphs are crisp by ~80-100ms; consider gating the self-blur to the PLATE only (not the
content layer) so the icons never blur. The resting 9px backdrop can stay.

---

## A5 — icons in the SHRUNKEN state are NOT ALIGNED  [PARTIALLY OBSERVED]

**Mechanism.** Two known mis-centering classes in the dock:
- The grid big-dock already has `place-items: center` (layers.css:432) — fixed there.
- The collapsed summary centers via morph.css:281 (`justify-content:center` + `aspect-ratio:1`).
  BUT the EMPTY-summary case (overview dock) collapses the summary to zero and the `#persistent`
  Home glyph becomes the pill — its centering depends on the persistent region's own layout.

**Live.** Summary pane (collapsed): `justifyContent:normal` was read on the FULL pane (not the
`.collapsed` state which sets `center`). The shrunken-icon misalignment is the
persistent-glyph-in-the-collapsed-circle case + the self-blur (A4) making the glyph read soft
and off-center during the morph tail.

**Root cause (best evidence).** The collapsed pill centers the box but the GLYPH inside the
persistent control / summary is not guaranteed both-axis centered when the summary is empty and
the persistent pill carries the safe-inset padding (`--dock-control-safe-inset`,
`background-clip: content-box`). Combined with the A4 self-blur the shrunken glyph reads
misaligned.

**Fix direction.** Ensure the collapsed-circle's single glyph is `place-items:center` on BOTH
axes in the empty-summary + persistent-pill path; verify the safe-inset padding does not shift
the glyph. Kill A4's self-blur on the content layer so the glyph is crisp.

---

## A6 — the icon bounces OUT OF SYNC + right-to-left; must be SYNCED + inertia FROM THE CENTRE  [CONFIRMED — exact mechanism]

**Mechanism** (`src/styles/dock/layers.css:305-375`): the child stagger reveals each control on
`--dock-expand-t` crossing a per-CHILD onset, with a VERTICAL rise:
```css
.glass-dock[data-morphing] .dock-layer.is-active > * {
    opacity: clamp(0, (expand-t - onset) / window, 1);
    translate: 0 calc((1 - reveal) * --dock-stagger-rise /*4px*/);   /* ← translateY rise */
}
/* per-child onset = step × (childIndex - 1) — left-to-right cascade */
nth-child(2) → onset = step×1;  nth-child(3) → step×2; … capped at step×5
```

**Root cause.** (1) The onset ladder is keyed to child INDEX 1→N (leftmost reveals first) →
the cascade runs **left-to-right / outer-to-inner**, while the dock box (when centered) grows
**center-out** → the icons desync from the box ("bounces right-to-left, out of sync"). (2) The
rise is `translateY` (vertical 4px bounce) — there is no center-origin inertia; the icons pop
up independently per-index. (3) The morph spring (`DOCK_SPRING response 0.32 ζ 0.7`) overshoots
mildly (live `--dock-morph-t` peaked 1.046 then settled — a tight snappy bounce, not the gooey
inertial weight the user wants).

**Fix direction.** Re-key the stagger onset to be **symmetric about center** (center children
reveal first, edges last — a center-out wave) so it tracks the center-out box grow (A3), OR
sync them to one shared clock with sub-perceptual offset. Give the rise a center-origin inertia
(the children ride the SAME center-anchored scale as the box). Soften `DOCK_SPRING` toward
gooey/inertial (longer response, lower ζ for a fuller settle) per the liquid-weight law.

---

## A7 — a DROPDOWN changes the color of the ENTIRE dock  [CONFIRMED LIVE — the bug]

**Mechanism** (`src/styles/dock/morph.css:390-398`):
```css
.glass-dock:has([data-state="open"]) {
    background: color-mix(in oklab, var(--glass-bg-floating, …), var(--glass-tint-source) …);
    border-color: var(--glass-border-floating, …);
}
```
ANY dock descendant going `data-state="open"` (a Select/Dropdown/Popover trigger, a HoverCard)
re-paints the WHOLE `.glass-dock` plate to the floating tier.

**Live proof (overview dock, simulated `data-state="open"` on a `.dock-select-trigger`):**
- Before: `color(srgb 0.903 0.871 0.840 / 0.4432)` (warm-cream, 44% alpha).
- After:  `oklab(0.936 0.0056 0.0133 / 0.808)` (floating tier, **80.8% alpha** — markedly more
  opaque + brighter). `changed: true`.

**Root cause.** The `:has([data-state="open"])` whole-plate lift (intended as an
"open-descendant elevated read") repaints the entire dock when a single control's menu opens —
the user reads this as the dropdown recoloring the whole dock.

**Fix direction.** Remove (or drastically scope) the `:has([data-state="open"])` dock-plate
recolor. A dropdown opening should NOT change the dock's resting plate — at most lift the
TRIGGER, never the whole `.glass-dock` background. The `[data-held]` (slider drag) lift can
stay; the `:has([data-state="open"])` lift is the bug.

---

## A8 — POPOVER trigger misaligned + differs from the DROPDOWN; UNIFY + style identically  [CONFIRMED structural]

**Mechanism.** `DockDropdownTrigger.vue` emits `.dock-dropdown-trigger` and is documented to
match `DockIconButton`'s hover-scale; `DockSelectTrigger.vue` emits `.dock-select-trigger` and
explicitly does NOT hover-scale ("so dropdown content anchors smoothly"). There is NO
`DockPopoverTrigger` — popovers inside docks are wired ad-hoc (a bare `DockIconButton` as the
`PopoverTrigger`), so the popover trigger gets a different class contract (hover-scale on) than
the dropdown/select triggers (scale off) → different size/anchor/alignment.

**Root cause.** Three divergent trigger contracts (`dock-dropdown-trigger` scales,
`dock-select-trigger` does not, popover trigger = raw `DockIconButton` scales) with no shared
alignment/anchor recipe → the popover trigger misaligns vs the dropdown.

**Fix direction.** Unify the dock overlay-trigger family: ONE shared `.dock-trigger` recipe
(consistent size/padding/anchor, hover-scale OFF on all so portaled content anchors smoothly),
add a `DockPopoverTrigger` that emits the same contract, and route dropdown/select/popover
triggers through it.

---

## A10 — /dock/dock-gallery: TabBar is TWO docks in one; make it ONE dock with our TABS, NO real names  [CONFIRMED from source]

**Mechanism** (`demo/stories/dock/examples/TabBar.vue`):
- It is NOT a `<GlassDock>`. It hand-rolls a `.tb-dock` glass plate (`--glass-bg-floating`,
  hardcoded `blur(13px) saturate(1.35)`) hosting a `<SegmentedTabs>` + a separate `.tb-add` "+"
  button, AND a SECOND hand-rolled `.tb-sheet` overlay (another `--glass-bg-floating` plate)
  that blooms from "+".
- **Two distinct glass surfaces** (`.tb-dock` + `.tb-sheet`) + the tabs-strip vs the "+" cluster
  read as "two docks in one."
- **Real names:** tab labels `Home / Search / Explore / Profile`; action labels
  `New Note / New List / New Photo`; the fission demo uses `Ray Zeisz` (a real person). The user
  wants NO real names.

**Root cause.** TabBar is a facsimile of two glass plates, not ONE `<GlassDock>` using the
library tabs facility, and it carries real proper-noun labels.

**Fix direction.** Rebuild TabBar as ONE `<GlassDock>` whose content IS the `<SegmentedTabs>`
(the library tabs facility) + an in-dock "+" control; the compose sheet should be the dock
MORPHING/splitting (A13), not a second plate. Replace all real names with generic placeholders
(Tab 1-4, Action A/B/C). Also A10's "none smooth / no inertia / no grow-shrink / docks do not
SPLIT" = the gallery tiles ride hand-rolled CSS facsimiles, not the real `<GlassDock>` morph +
`useDockFission` split engine (see A13).

---

## A11 — the vertical pill is ugly + liquid pills need BIGGER PADDING  [CONFIRMED measurements]

**Live (sidebar shell dock, `.glass-dock.vertical shape-pill`):** `w:59 h:631`, bg warm-cream
`color(srgb 0.903 0.871 0.840 / 0.44)`. Icon buttons 40×40. With a 59px outer width around a
40px icon, only ~9px total inline padding → a cramped 59px-wide × 631px-tall sliver.

**Mechanism.** The vertical padding interp (`morph.css:224-237`) pins `padding-inline` at
`--dock-padding-inline` (0.5rem = 8px) and morphs `padding-block`. The vertical pill radius is
`--radius-dock` (9999px) via `shape.css:51`. The tight 8px inline padding + the very tall narrow
column is the "ugly pill."

**Root cause.** `--dock-padding-inline` (0.5rem) is too tight for the liquid-pill look; the
vertical column reads as a thin sliver, not a generous liquid pill.

**Fix direction.** Raise the dock padding tokens (`--dock-padding-inline`/`-block`,
`--dock-control-safe-inset`) for a more generous pill; reconsider the vertical pill geometry
(wider column / softer proportions) per the iOS-27 generous-glass language.

---

## A12 — the dock items are not DRAGGABLE  [CONFIRMED absent]

**Mechanism.** No drag wiring on `DockIconButton` / dock items. `useDragMorph` exists
(`@mkbabb/glass-ui/motion`, the SegmentedTabs `:draggable` + DockLayerGroup pull-to-switch
consumers) but `GlassDock` items are NOT bound to it. No `draggable`/`pointerdown`-grab on the
dock controls.

**Root cause.** The dock has no pull-to-reorder / grab-to-detach gesture on its items.

**Fix direction.** Wire the dock items to a drag gesture (compose the shipped `useDragMorph` +
the fission engine for grab-to-split per A13); compositor-only follow + fling-to-nearest.

---

## A13 (THE BIG ONE) — GENERALIZE: morph V/H + SPLITTABLE into arbitrary parts; engine 100% / assembly 0%  [CONFIRMED]

**The engine EXISTS and is correct:**
- `useDockFission.ts` — n-ary detach orchestrator on ONE `SpringProgress` (`DOCK_SPRING`),
  per-context goo `DOCK_SPLIT_SIGNATURES` (DATA not code paths), `registerPiece({el, vector,
  rank})`, writes `--dock-split-t`. A CONSUMING seam BESIDE the morph orchestrator (does not
  edit `dockMorphContext`/`DOCK_SPRING`).
- `DockGooFilter.vue` — the library goo `<filter>` mount, **Safari-correct**:
  `color-interpolation-filters="sRGB"`, generous `x=-50% y=-50% width=200% height=200%` region,
  regular `filter:url()` (NOT backdrop-filter), STATIC (no clock) → the neck PAINTS on Safari 26.
- `fission-bridge.css` — the `.dock-fission-bridge` / `.dock-fission-piece` recipe, references
  the filter by `var(--dock-fission-goo-filter)`.

**The assembly is a ONE-OFF demo, not a GlassDock facility:**
- `useDockFission` is consumed only by `DynamicIslandCall.vue`, `liquid-playground.vue`,
  `dock-gallery.vue` — each hand-rolls its own `.ci-blob`/`.ci-content` plates (DynamicIslandCall
  registers two pieces with `{dx:-1}`/`{dx:1}` vectors). It is NOT integrated into `<GlassDock>`.
- `<GlassDock>` has NO API to split an icon/element off into a NEW dock that sits beside/above/
  below (the iOS demos). The V↔H morph (`useDockOrientationMorph`) is likewise a separate driver
  the demo shell consumes via a focused stage, not a first-class GlassDock prop.
- **Live:** `/dock/overview` shows `gooFilter:0, fissionEls:0` (fission renders nowhere on the
  flagship pages).

**Root cause.** "engine 100%, assembly 0%" — the fission + orientation-morph engines are built
and Safari-safe but NOT wired into `<GlassDock>` as a generalized splittable/orientable
facility. The user wants: grab an item → it MORPHS + GOOS off → becomes a new dock beside the
original; and the dock morphs V↔H as a first-class capability.

**Fix direction.** Generalize `<GlassDock>` to expose: (a) a `split`/fission API that detaches a
named item/section into a sibling dock (positioned beside/above/below) via the existing
`useDockFission` + `DockGooFilter` + `fission-bridge.css`, goo-bridged on the split scalar; (b)
first-class orientation morph (V↔H) on the `--dock-morph-t` family. Wire the goo `<filter>` mount
once per app. Keep the spring gooey/inertial (soften `DOCK_SPRING`), compositor-only, PRM-carved,
Safari-tested (the static SVG filter already is).

---

## Cross-cutting motion law (applies to A2/A3/A4/A6/A13)

`DOCK_SPRING = { response: 0.32, dampingFraction: 0.7 }` (`constants.ts:84`) is the ONE shared
clock (morph + fission + V↔H). Live `--dock-morph-t` overshoots to ~1.046 then snaps back — a
TIGHT/SNAPPY register. The [[feedback-liquid-weight-universal]] law + the user's "smooth/gooey/
inertial NOT tight/springy, ios27-tuned, morph-more-on-move" ask require softening this toward
a fuller, more inertial spring (longer response, a touch more overshoot/looser settle) — applied
to the morph, the stagger, the fission, AND the V↔H morph in lockstep (one register).

## Token / file reference map (where each fix lands)

| Defect | Primary file(s) | Exact lever |
|---|---|---|
| A1 rail | `demo/layout/{SidebarDock,BottomDock}.vue` | remove `<DockStack mode="facets">` from `#rail` |
| A2 window | `useDockState.ts`, `constants.ts` | `collapseDelay` (2500→longer); shell collapsible mode |
| A3 grow-center | `src/styles/dock/layers.css:88,106,137` | inner `transform-origin: center`; root box center-symmetric |
| A4 blur | `src/styles/dock/morph.css:78-80` | `--dock-reveal-blur` 3px→~1px, front-load decay / plate-only |
| A5 align | `src/styles/dock/morph.css:263-282,314` | both-axis `place-items:center` on collapsed glyph |
| A6 stagger | `src/styles/dock/layers.css:325-375` | center-symmetric onset; center-origin inertia; soften spring |
| A7 recolor | `src/styles/dock/morph.css:390-398` | delete/scope `:has([data-state="open"])` dock recolor |
| A8 triggers | `DockDropdownTrigger.vue`/`DockSelectTrigger.vue` + new `DockPopoverTrigger` | one `.dock-trigger` contract |
| A10 tabbar | `demo/stories/dock/examples/TabBar.vue` | rebuild as ONE `<GlassDock>` + SegmentedTabs, generic names |
| A11 pill | `src/styles/dock/density.css` (`--dock-padding-*`), `shape.css` | bigger padding, vertical pill geometry |
| A12 drag | `DockIconButton.vue` + `useDragMorph` | wire drag gesture |
| A13 split | `GlassDock.vue` + `useDockFission`/`DockGooFilter`/`fission-bridge.css` + `useDockOrientationMorph` | generalize split + V↔H into GlassDock |
| motion | `constants.ts:84` `DOCK_SPRING` | soften toward gooey/inertial |
