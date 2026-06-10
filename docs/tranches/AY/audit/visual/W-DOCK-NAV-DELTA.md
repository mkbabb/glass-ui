# AY.W-DOCK-NAV-BAND — the dock convergence fix-fleet · DELTA

The whole dock band (B1/B2/B4/B5/B6/B7/B8/B9/B15 of USER-AUDIT-2026-06-10 §B). The
user's live audit OVERRODE gate-green: the four dock gates were PASS while the docks
read broken to the eye. Every fix below is captured with a real-dims own-surface
DELTA on `:5199`. Demo measured with the WebGL canvas neutered (the aurora wash
blocks the screenshot compositor — it is decorative, not under test here).

Landed on `tranche/AY`. The four dock gates (`proof:dock-unify` ·
`proof:dock-region-model` · `proof:dock-perfection` · `proof:dock-rail-cohesion`)
stay GREEN; main `vue-tsc --noEmit` GREEN.

---

## B4 + B15 — the collapsed pill is a PERFECT CIRCLE, the morph is CENTER-OUT

**ROOT CAUSE (measured).** Two coupled defects produced the user's "oval, not circle"
+ "expands from the right":

1. The collapsed `.dock-layer--summary` floored its `min-width` at `0.7 ×
   --dock-layer-height` (28px) but the `.dock-layer` base rule LOCKED `height:
   var(--dock-layer-height)` (40px) — so the collapsed pane was 40h × ~30w, an oval
   (the measured aspect was **0.76** on the slider dock, taller-than-wide).
2. A `#persistent`-bearing dock with NO `#collapsed` slot (the overview first-section
   dock) still rendered a `.dock-layer--summary` pane that floored to the circle
   min-width — so collapsed it read as a **WIDE pill**: the Home glyph on the LEFT +
   an empty circle of dead space on the RIGHT (measured **84×50**, aspect 1.68).
   Expanding grew the content INTO that right-side void → the morph read "from the
   right", not center-out.

**FIX.**
- `tokens.css`: `--dock-collapsed-summary-min-size` is now `calc(--dock-layer-height
  × 0.85)` — a tight proportioned circle a step below the full control (the gate's
  `summaryBelow` clause stays satisfied).
- `dock/morph.css` `.glass-dock.collapsed .dock-layer--summary` LIFTS the
  `.dock-layer` height-lock (sets `block-size`/`height` to the SAME token its
  `min-width` floors at) + `aspect-ratio: 1` — the pane is a square, so the root's
  symmetric collapsed padding makes the pill a circle.
- `dock/morph.css` `.glass-dock.collapsed .dock-layer--summary:empty` (the empty-slot
  case — an empty Vue `#collapsed` slot renders ZERO child nodes, so `:empty` matches
  it precisely; a flat `:empty` avoids the nested-`:has()` form Lightning CSS drops)
  collapses the empty summary to zero width + no floor, so the persistent control
  stands ALONE as the collapsed circle and the morph grows symmetrically about it.

**RESULT (measured, π).** Both the persistent-only first-section dock AND the
`#collapsed`-slot slider dock now collapse to **50×50, aspect 1.00** — perfect
circles. The expand morph trajectory is `cx = 761` CONSTANT through the whole spring
(off = 0 at every frame, t = 0 → 1): the left edge moves left (736→518) and the right
edge moves right (786→1004) symmetrically — center-out, not right-anchored.

Captures: `W-DOCK-NAV-collapse-circle-desktop-{light,dark}.png` (the 50×50 circle),
`W-DOCK-NAV-morph-center-mid-desktop-light.png` (the centered morph).

## B2 + B8 + B9 — the bottom-nav active register + adaptive controls

**B2 (the "underline + darkness is awful" tab).** `demo/layout/dock-nav.css` stacked
THREE marks on the active story tab — the shipped glass active fill
(`--dock-control-active-bg`, a `--glass-bg-floating` tier), PLUS a NCSU-red `::after`
underline, PLUS red text. RETIRED the bespoke red underline; the active tab now
carries the GLASS pill alone (measured `bg: srgb …/0.8` = the floating glass tier,
reading the dock substrate through it) + a restrained accent GLYPH tint + weight-600
— the AX.W61 glass-first selected register, one mark not three.

**B9 (greyed dead chrome → adaptive).** `demo/layout/BottomDock.vue`: the prev/next
STORY arrows were `:disabled` (greyed) at the category boundaries. Now they are
ADAPTIVE — `v-if="hasPrev"` / `v-if="hasNext"` — ABSENT when there is nothing more,
never a greyed-out stub. Two `<DockSeparator>` dividers added: one after the home-left
category trigger (before the nav run), one before the trailing category-jump group
(the divider before the right item).

**B8 (two indistinguishable variants + misaligned bar).** The two arrow pairs are now
DIFFERENTIATED — single chevrons (`<` `>`) = in-category STORY nav (adaptive); double
chevrons (`<<` `>>`) = CATEGORY jump (always live, they wrap), separated by the
divider. In the layer-switcher rail context the indicator misalignment is fixed by
the B6 rail rebuild (the indicator now tracks the active tab — measured aligned on all
3 tabs).

Captures: `W-DOCK-NAV-bottom-nav-desktop-{light,dark}.png`.

## B6 + B7 — `/dock/layers` REBUILT: the rail element line RESTORED, the lag root-caused

**ROOT CAUSE (measured).** Three coupled defects:

1. **The shared `activeLayer` ref.** `layers.vue` shared ONE `activeLayer` (init
   `"root"`) across the drill-in group AND the switcher-rail group — but the rail
   group has NO `root` pane (just `assets/layers/libs`). So NO pane matched `active`
   → the rail group collapsed to a 55px empty stub showing only a letter glyph (the
   "totally broken, no rail line" read). FIX: each section owns its own ref scoped to
   its own pane set (`switcherLayer` init `"assets"`).
2. **The icon fallback.** `DockLayerGroup.vue` `isComponent()` guarded `typeof icon
   === "object"` — but `@lucide/vue` v1 ships its icons as FUNCTIONAL components
   (functions), so every lucide icon fell through to the first-letter rail glyph (the
   "A/L/L" letters the user saw instead of Package/Layers/Library). FIX: accept both
   the object and function component forms.
3. **The rail clip.** A horizontal dock hosting a COLUMN rail clipped the rail's lower
   tabs + the indicator BELOW the dock floor (measured: 2 of 3 tabs clipped, the rail
   squished to 40px against its 96px content). FIX: `dock/layers.css` relaxes the
   `.dock-layer` `height` lock to a `min-height` floor; `dock/layer-group.css` gives
   the rail `align-self: start` + `min-height: max-content` + `flex-shrink: 0` tabs so
   the rail demands its natural column height and the dock grows to contain it; a
   dedicated `--dock-layer-tab-size` (28px, not the 40px control) keeps the rail a
   compact icon column (the prior 40px tabs stood the rail ~140px tall).

**RESULT (measured, π).** The switcher rail renders all 3 icon tabs (`hasSvg:
[true,true,true]`, no letter fallback), the rail plate/line is restored, and clicking
each tab swaps the pane AND the indicator follows the active tab (aligned ±4px on all
3). The rail dock is a proportioned 110px (rail 96 + dock padding 14).

**The lag (B6).** The crossfade rides the ONE `--dock-morph-t` spring scalar (AX.W45
DK7 — no second clock); the drill-in swap settles in ~270–340ms (the spring's
meaningful travel) with a 506ms full envelope — the intended `--spring-dock` register,
not a fixed-linear lag. The "laggy" read was the BROKEN rail rendering (the collapsed
stub), now fixed.

**B7 (vertical overflow).** Same root cause (the shared ref + icon fallback). The
vertical-overflow dock now renders the row-rail + the 9-row active pane correctly
(`overflowY: auto`, capped at `--dock-max-block-size: 760px`; the 250px content fits
under the cap so it does not scroll, but the structure + the over-cap scroll port are
intact and re-gated).

Captures: `W-DOCK-NAV-layers-rail-desktop-{light,dark}.png`,
`W-DOCK-NAV-vertical-overflow-desktop-light.png`.

## B1 + B5 — the nav-pattern across the demo docks

The showcase docks (`overview.vue`, `rail.vue`) already compose the AX.W61
nav-pattern (home-left `#persistent` + `<DockSeparator>` dividers); the bottom-dock
gains its two dividers (B9). The overview control families (select/dropdown triggers,
media transport) carry their `<DockSeparator>` dividers + icon affordances. The four
`proof:dock-*` gates ratify the census.

---

## Gate status

| Gate | Status |
|------|--------|
| `proof:dock-unify` | PASS |
| `proof:dock-region-model` | PASS |
| `proof:dock-perfection` | PASS |
| `proof:dock-rail-cohesion` | PASS |
| `vue-tsc --noEmit` (main) | GREEN |

## Files

- `src/styles/tokens.css` — `--dock-collapsed-summary-min-size` (0.85× circle),
  `--dock-layer-tab-size` (compact rail tab)
- `src/styles/dock/morph.css` — collapsed-circle square + `:empty` summary collapse
- `src/styles/dock/layers.css` — `.dock-layer` height-lock → `min-height` floor
- `src/styles/dock/layer-group.css` — rail `align-self`/`min-height`/tab `flex-shrink`
- `src/components/custom/dock/DockLayerGroup.vue` — `isComponent()` accepts functions
- `demo/stories/dock/layers.vue` — per-group `activeLayer` refs
- `demo/layout/dock-nav.css` — glass-first active tab (no underline)
- `demo/layout/BottomDock.vue` — adaptive arrows + dividers + differentiated pairs
