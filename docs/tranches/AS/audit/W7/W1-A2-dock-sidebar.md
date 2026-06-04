# AS.W7 · W1 — Cluster A2 audit: dock + sidebar chrome (D2, D4, D11, D12)

READ-ONLY diagnosis. Each defect grounded at `file:line` with the live-DOM
measurement that proves the mechanism, classed demo-vs-library, and a precise
fix spec for Wave 2. Measured against the running demo (`:5173`) at the
viewports where each defect manifests.

Cluster verdict—two of the four are the SAME root: the GlassDock primitive has
**no clip-or-scroll path when expanded content exceeds its cap on either axis**.
The lib deliberately chose grow-to-fit-then-visibly-overflow (the dock.css
comments cite prior tranches that *removed* the scroll affordance). D2 is that
gap on the inline axis, D12 on the block axis. D4 + D11 are demo-surface.

---

## D2 — horizontal nav/category dock overflows the viewport (GENERAL · library gap)

**Surface.** The overflowing row in the screenshot is the **StoryPager**
(`demo/layout/StoryPager.vue`), NOT the left rail—it renders the active
category's stories as `<DockTabButton>`s inside an `always-expanded fit-content`
horizontal `<GlassDock>`. Foundations carries 13 stories, whose combined tab
width is ~1464px.

**Live measurement (viewport 1440w, route `/foundations/paper-glass`):**

| element | clientW | scrollW | overflowX | width / cap | rect right |
|---|---|---|---|---|---|
| `.glass-dock.story-pager-dock` | 893 | 1472 | visible | `max-inline-size: min(100%, 896px)` | 1210 (in-bounds) |
| `.dock-layers` (grid) | 877 | 1464 | visible | `width: 877px`, `min-width: 0` | — |
| `.dock-layer--full` (flex) | 1464 | 1464 | visible | `width: 1464px`, **`min-width: auto`** | bursts track |
| `.story-pager-row` (demo) | 1464 | 1464 | **auto** | `max-width: none` | **1783 (past 1440 vp)** |

**Root cause.** The dock root *is* correctly clamped
(`max-inline-size: var(--dock-max-inline-size)` — `src/styles/dock.css:69`;
token `--dock-max-inline-size: min(80vw, 64rem)` — `src/styles/tokens.css:826`;
overridden per-instance to `min(100%, 56rem)` by the demo at
`demo/layout/StoryPager.vue:62`). The clamp propagates to `.dock-layers`
(877px). But it dies there:

1. `.dock-layer--full` is a flex item with default `min-width: auto`, so it
   refuses to shrink below its content's min-content width (1464px) and bursts
   the 877px grid track. The grid track does NOT clip it because—
2. `.glass-dock.always-expanded { overflow: visible }`
   (`src/styles/dock.css:479-482`) and
   `.glass-dock.expanded:not(.dock-wrap) > .dock-layers { overflow-x: visible }`
   (`src/styles/dock.css:391-393`). The lib's own comment there
   (`dock.css:386-390`) states the design intent: *"Horizontal dock content
   grows visibly … No edge-fade mask — content never clips or scrolls."*
3. The demo tried to add a scroll container—`.story-pager-row { overflow-x:
   auto }` (`demo/layout/StoryPager.vue:65-72`)—but `overflow-x: auto` only
   engages when the box is NARROWER than its content. Since nothing constrains
   the row's width (its parent `.dock-layer--full` is itself content-sized at
   1464px, `max-width: none`), the row IS its content width—so `auto` has
   nothing to scroll and is inert.

**Class.** Library gap, surfaced by demo misuse. The demo's `overflow-x: auto`
on a child can never win while the dock chain hands down a `min-width: auto`
flex item under an `overflow: visible` root. A horizontal `fit-content`
GlassDock whose content exceeds the cap has no first-class scroll path. The
StoryPager is the canonical ≥2-consumer case for it (the configurator pill row
D8 is the second—same overflow class).

**Fix spec (Wave 2).** Give GlassDock a first-class horizontal-scroll mode on
the inline axis, then have the StoryPager opt in.

- LIBRARY — `src/styles/dock.css`. Add a `scroll`/overflow opt-in for horizontal
  docks that flips the no-scroll defaults. Concretely: introduce a class hook
  (e.g. `.glass-dock.dock-scroll-x`) OR thread it off the existing
  `containerName`-free path, such that on the active layer:
  - `.dock-layer--full` gets `min-width: 0` + `overflow-x: auto` +
    `scrollbar-width: none` (so the flex item can shrink under the track and
    becomes the scroll port), and
  - the `.glass-dock.expanded … > .dock-layers { overflow-x: visible }` rule
    (`dock.css:391-393`) is NOT applied in this mode (keep `overflow-x` clipping
    on `.dock-layers` so the rounded pill masks the scroll edge).
  Pair with the existing mask-fade idiom the file already references (the
  J.W3.C `--dock-max-inline-size` clamp at `dock.css:69-75`) for the edge
  feather. This makes the dock the scroll port instead of a content-sized child.
- GlassDock.vue — surface the opt-in as a prop (e.g. `scrollOnOverflow?:
  boolean` / `overflow?: "grow" | "scroll"`), defaulting to today's grow
  behaviour so no existing consumer changes. Apply the class in the root
  `:class` block (`src/components/custom/dock/GlassDock.vue:292-300`).
- DEMO — `demo/layout/StoryPager.vue`: set the new prop on the `<GlassDock>`
  (line 39) and DELETE the dead `.story-pager-row { overflow-x: auto }` scoped
  block (lines 65-76)—it cannot work and the lib mode replaces it.

---

## D12 — demo sidebar (CategoryRail) too long + doesn't scroll (library gap, same root as D2 on block axis)

**Surface.** The left `CategoryRail` (`demo/layout/CategoryRail.vue`)—a vertical
`<GlassDock variant="rail">` (`CategoryRail.vue:29`) carrying the brand
wordmark + 13 category icon buttons + a divider + the Aurora flat-story button
(14 buttons total).

**Live measurement (viewport 680h, route `/foundations/paper-glass`):**

| element | clientH | scrollH | overflowY | cap | last button (Aurora) bottom |
|---|---|---|---|---|---|
| `aside` (sticky h-screen) | 680 | 680 | visible | `h-screen` | — |
| `.glass-dock.variant-rail` | 541 | **670** | **visible** | `max-block-size: 544px` (=80vh) | **688 — clipped below rail (560) AND viewport (680)** |

At 900h the rail fits (689px content, last-btn bottom 699 < 900). At ≤~830h it
overflows; the Aurora button falls off the bottom with no scroll.

**Root cause.** `.glass-dock.vertical` sets
`max-block-size: var(--dock-max-block-size)` + `overflow-y: visible`
(`src/styles/dock.css:199-211`, specifically lines 208-210); token
`--dock-max-block-size: min(80vh, 48rem)` (`src/styles/tokens.css:827`). The
`always-expanded` vertical path reasserts the same:
`.glass-dock.vertical.always-expanded { overflow-x: visible; overflow-y: visible }`
(`src/styles/dock.css:487-490`). The comment block at `dock.css:194-198`
states the design choice verbatim: *"Vertical rails grow-to-fit + clamp, no
scroll … the cap fails visibly rather than masking overflow as a scroll
affordance."* So when buttons exceed the cap, the rail clips them off the bottom
edge with no recovery—exactly D12.

This is **the same defect class as D2, rotated to the block axis**: a cap with
`overflow: visible` and a deliberate no-scroll stance. The
`demo/layout/CategoryRail.vue` `aside` wrapper (line 28: `sticky top-0 h-screen`)
also does not provide a scroll port—it's `overflow: visible`.

**Class.** Library gap. The demo can't fix it from outside because the rail's
`overflow-y: visible` + `max-block-size` are inside the primitive, and the
design explicitly forbade scroll. With a 14-item nav this is now a real
≥2-consumer need (any app-chrome rail with > ~10 entries hits it).

**Fix spec (Wave 2).** Mirror the D2 fix on the block axis—give the vertical
rail a first-class scroll-on-overflow mode.

- LIBRARY — `src/styles/dock.css`: add a vertical scroll opt-in (e.g.
  `.glass-dock.vertical.dock-scroll-y` or the same `scrollOnOverflow` prop
  surfaced for D2) that sets `overflow-y: auto` + `scrollbar-width: none` (or a
  thin styled scrollbar) on `.glass-dock.vertical`, overriding the
  `overflow-y: visible` at `dock.css:209-210` and `dock.css:489`. Keep the
  `max-block-size` cap—the cap + scroll together are the correct pairing the
  current code split apart. Optionally add the top/bottom mask-fade the file
  already references for the inline axis.
- GlassDock.vue — same prop as D2 (block-axis branch reads `orientation ===
  "vertical"`). Apply the class in the root `:class` block.
- DEMO — `demo/layout/CategoryRail.vue`: set the prop on the `<GlassDock
  variant="rail">` (line 29). No change needed to the `aside` wrapper—the
  scroll lives inside the dock so the sticky positioning is preserved.
- Acceptance: at 680h, all 14 rail buttons reachable; the Aurora button
  scrolls into view; rail box never exceeds `min(80vh, 48rem)`.

---

## D4 — DarkModeToggle "dock" rung too large + the dock tab is useless (demo misuse)

**Surface.** `/primitives/dark-mode-toggle`
(`demo/stories/primitives/dark-mode-toggle.vue`)—the "size axis" section renders
the toggle at 5 rungs side by side (line 22, `v-for` over
`["sm","md","lg","control","dock"]`).

**Live measurement (the size-axis row):**

| rung | rendered px | `--dark-mode-toggle-size` | inside a dock? |
|---|---|---|---|
| sm | 28 | 1.75rem | no |
| md (default) | 36 | 2.25rem | no |
| lg | 44 | 2.75rem | no |
| control | 36 | 2.25rem (`--control-size` fallback) | no |
| **dock** | **40** | 2.5rem | **no** |

**Root cause.** The `dock` rung resolves `--dark-mode-toggle-size:
var(--dock-control-size, var(--size-icon-btn))` (`src/styles/dock.css:793-797`).
Standalone there is no `--dock-control-size` in scope, so it falls through to
`--size-icon-btn: 2.5rem` (`src/styles/tokens.css:874`) = 40px. Two problems,
both demo-side:

1. **"Too large":** 40px is the largest non-`lg` rung in the row and visually
   reads as oversized next to the 36px default, because it's shown free-floating
   instead of in its intended host.
2. **"The dock tab is useless":** the `dock` rung's entire purpose is to INHERIT
   the host `<GlassDock>`'s `--dock-control-size` (which varies by density:
   compact 32px → audacious 64px, `dock.css:92/107/120/137`). Demonstrated
   outside a dock it inherits nothing distinct—it's just a static 40px button,
   so the rung teaches nothing and looks like a pointless oversized variant.
   `inDock: false` confirmed live.

**Class.** Demo misuse. `DarkModeToggle.vue` and the `data-size="dock"` CSS are
correct—the story presents the dock rung in the wrong context.

**Fix spec (Wave 2).** `demo/stories/primitives/dark-mode-toggle.vue`—host the
`dock` rung inside a real `<GlassDock>` so it inherits live dock sizing and the
rung becomes meaningful.

- Remove `"dock"` from the flat size-axis `v-for` loop (lines 9 + 20-25) OR keep
  it but wrap ONLY the dock-rung instance in `<GlassDock>` (import from
  `../../../src/components/custom/dock`).
- Add a dedicated section demonstrating the `dock` rung inside a
  `<GlassDock density="…">` across 2-3 densities so the size-inheritance is the
  teaching point (the rung's purpose). The toggle then renders at the dock's
  `--dock-control-size`, not the bare 40px fallback.
- This also resolves the "too large" read—in-dock it sizes to the dock's own
  control scale, matching its siblings.

---

## D11 — no blob configurator/demo tab on the sidebar (demo addition; couples to D10)

**Surface.** The left rail renders `FLAT_STORIES` as standalone icon buttons
(`demo/layout/CategoryRail.vue:86-119`); routes derive from the same manifest
(`demo/router.ts:20-30`). Today `FLAT_STORIES` has exactly ONE entry—Aurora
(`demo/stories/manifest.ts:295-304`). There is no blob story/component anywhere
in the tree (grep for `blob`/`Blob`/`metaball`/`BlobDot` across `demo/` + `src/`
returns only the aurora shader's prose, no implementation).

**Root cause.** Pure absence—no manifest entry, no SFC. The rail + router are
fully manifest-driven, so adding a tab is a one-row manifest change plus the
story SFC. Nothing in the chrome blocks it.

**Class.** Demo addition. NOTE the blob runtime itself is D10's deliverable—the
ledger couples D11 to D10 ("blob configurator + demo … couples to D10's aurora +
the value.js blob systems / P3 Metaballs+BlobDot", `W7-visual-defect-ledger.md`
lines 58-60). The blob renderer + `deriveAurora` producer do NOT exist yet, so
A2 can only scaffold the tab; the working blob system is out of this cluster's
scope.

**Fix spec (Wave 2).** Add the tab; wire the runtime under D10.

- `demo/stories/manifest.ts`: append a `FLAT_STORIES` entry (lines 295-304
  pattern) — `{ id: "blob", title: "Blob", blurb: "…", icon: <a Lucide glyph,
  e.g. Droplet/Circle — import at lines 12-27>, component: () =>
  import("./blob.vue").then((m) => m.default) }`. This auto-wires the rail icon
  (CategoryRail `FLAT_STORIES` loop), the `/blob` route (router.ts:20-30), and
  `useStoryNavigation`. No CategoryRail/router edits needed.
- `demo/stories/blob.vue`: new SFC. For A2, scaffold a `<StoryPage>` shell with
  a `<Configurator>` + blob stage placeholder. The actual blob renderer +
  `deriveAurora` single-color→palette producer land under D10—A2 leaves a
  TODO-marked stage so the tab is navigable and the D10 work fills it.
- Sequence note for the orchestrator: land D11's scaffold AFTER (or alongside)
  D10's blob runtime, else the tab shows an empty stage. The manifest entry +
  route are safe to land independently.

---

## Cross-cluster notes

- D2 + D12 share one library root (no scroll-on-overflow on either dock axis)
  and SHOULD be fixed by one GlassDock prop (`scrollOnOverflow` /
  `overflow="scroll"`) that branches inline-vs-block off `orientation`. This is
  the highest-leverage A2 fix—it also closes **D8** (the configurator pill row
  overflow, another `:5173` site of the same class, owned by a different
  cluster). Flag to the D8 owner.
- D2's demo-side dead code (`.story-pager-row { overflow-x: auto }`,
  `StoryPager.vue:65-76`) must be deleted as part of the fix—leaving it is
  harmless but misleads the next reader into thinking scroll is handled.
- D4 + D11 are demo-only and independent of the library scroll work.
- Tokens involved (no change needed, cited for the fix author):
  `--dock-max-inline-size: min(80vw, 64rem)` (tokens.css:826),
  `--dock-max-block-size: min(80vh, 48rem)` (tokens.css:827),
  `--dock-control-size` density rungs (dock.css:92/107/120/137),
  `--size-icon-btn: 2.5rem` (tokens.css:874).

Screenshots captured: `w7-a2-pager-overflow-1100.png` (D2, tabs clip off right),
`w7-a2-rail-clip-680.png` (D12 context, rail near viewport bottom).
