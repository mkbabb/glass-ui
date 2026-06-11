# AZ.W-RAIL3 — the floating-carousel rail: the facets MOVE OUT of the dock onto the hairline; the box INVIOLATE · DELTA

<!-- surface-paths: src/components/custom/dock/DockRail.vue, src/components/custom/dock/constants.ts, src/components/custom/dock/index.ts, src/styles/dock/rail-extend.css, demo/layout/SidebarDock.vue, demo/layout/BottomDock.vue, demo/layout/dock-nav.css, demo/stories/dock/rail.vue -->
<!-- surface-hash: b9561057e1fb0d52e80d13a36d083b8ee5ee3a29fd1662d0b6555dd08616235c -->

THE THIRD RAIL. The two prior attempts (W-RAIL-EXTEND → R4-RAIL) each "passed" a gate
while the user's live SHELL stayed broken — the recorded **source-green / shell-broken**
failure class. The R6 audit (USER-AUDIT-2026-06-11-R6.md): *"The rail is still entirely
broken. The docks are awful. Far too wide. The rail should overflow OUTSIDE of the docks
and NOT!!!!! increase the width or height! The rail items should be like a floating
carousel almost?"*

This wave does not patch — it **MOVES** the contextual facets OUT of the dock body (the
measured ~2× inflators) and re-homes them as a floating, cyclable strip of detached glass
chips on the visible hairline OUTSIDE the dock box, so the dock returns INVIOLATE to its
tight icon pill.

## The re-ground (measured on :5199 BEFORE editing — the defect is live)

| surface | pre-fix (the defect) | bare-icon ideal |
|---|---|---|
| SidebarDock (vertical) | **115px** wide (in-dock `<DockLayerGroup>` = 96px stretches it) | ~59px (40 icon + 2×8 pad + 2×1.5 border) |
| BottomDock (horizontal) | **578×111px** (~3 rows; the column switcher rail = 96px tall) | ~52px-tall single row |
| the rotated label | `.demo-sidebar-context-label` `writing-mode: vertical-rl` — the clipped "Eng…" (R6-2) | gone |

These match R6-1/R6-2 exactly. The in-dock contextual `<DockLayerGroup>` (fed by
`useContextualDockLayers`) is the inflator; `align-items: stretch` stretches the whole
dock to the 96px facet group.

## The redirect (the six moves)

1. **DELETED the in-dock contextual `<DockLayerGroup>` from BOTH shell docks.**
   `SidebarDock.vue` (the `<template v-if="showContextGroup">` + the rotated
   `.demo-sidebar-context-label`) and `BottomDock.vue` (the `<DockLayerGroup>` + the
   `.demo-bottom-dock__tabs` story-tab run). On deletion the dock body is icons-only →
   it shrink-wraps back to the tight pill. The orphaned CSS rules
   (`.demo-sidebar-context-label`, `.demo-bottom-dock__tabs`, `.demo-bottom-dock__tab`)
   were buried with them (no dead orphan).
2. **EVOLVED `<DockRail>` from a single end-icon into the carousel chip STRIP.** It now
   renders N detached glass chips (one per facet descriptor — `DockRailItem { id, label,
   icon? }`), the active one highlighted, on the connective hairline OUTSIDE the dock box.
   `entries` (the prior id-cycle) is preserved for back-compat (a chip per id).
3. **The hairline VISIBLY CONNECTS.** The `.dock-hairline-extend::before` composes
   `box-shadow: var(--border-hairline)` PLUS a faint `--dock-layer-rail-divider`
   background so the connector reads even over a busy backdrop (the user audited "NO
   VISIBLE HAIRLINE"). It overruns by `--dock-rail-extend-length` (R3 extent).
4. **The strip renders via the `.glass-dock-frame` escape (box-INVIOLATE).** The `#rail`
   slot is a SIBLING of `.glass-dock` inside the non-clipping `.glass-dock-frame`
   (`position: absolute`), so it never re-enters the dock clip AND never feeds the dock's
   intrinsic size. Axis-aware placement: a **vertical** dock hangs the carousel as a
   COLUMN beside it (connector a horizontal hairline); a **horizontal**
   viewport-bottom-anchored dock hangs it as a ROW ABOVE it (so it stays ON-SCREEN —
   the below-the-dock placement fell off-screen for the bottom-anchored shell dock).
5. **Carousel scroll on overflow.** The strip is `display: flex` + `overflow-{x,y}: auto`
   + `scroll-snap` (the common 2-4-facet case fits inline; embla momentum-paging is the
   booked successor for a genuinely-overflowing set — `AZ.W-RAIL3.1`).
6. **Authored `proof:rail3` + this binding π SHELL DELTA.**

## The shell-dock binding — ONE registry (R2)

Each shell dock binds a `railContext` writable computed: GET returns the facet whose
entries contain the current story (the highlight tracks the route); SET navigates to that
facet's first story. The chips write the SAME router navigation state the nav items
drive — no parallel store. `railItems` maps `contextLayers` (the KEPT route→facet
resolver — only the render target moved). The strip mounts only when the section carries
>1 facet.

## G1 — box INVIOLATE (the headline assert, captured)

`tests-visual/rail3.spec.ts` reads each shell dock's `getBoundingClientRect` with the
rail strip mounted, removes the strip slot, and re-measures. **Both shell docks: deltaW =
deltaH = 0** — the dock box is byte-identical with the rail+carousel mounted vs absent.
The box did NOT grow.

- Live :5199 (Chrome, 1280×860): SidebarDock 59px (was 115) · BottomDock 235×55px (was
  578×111). `docs/tranches/AZ/audit/visual/rail3/box-equality-readback.json`.
- Headless π (`readback-{light,dark}-{1280,820}.json`): sidebar `{deltaW:0, deltaH:0}`,
  bottom `{deltaW:0, deltaH:0}` at every viewport × mode.

The pre-fix tree FAILS this (115px vs 59px / 578px vs 235px is the ~2× inflation).

## G2 — the strip paints OUTSIDE on the visible hairline (captured)

Every chip's bounding box lies entirely OUTSIDE the dock's border box
(`allChipsOutside: true`); the strip is a `.glass-dock-frame` sibling, NOT a
`.glass-dock` descendant (`stripIsDockDescendant: false`); the connective
`--border-hairline` line is computed-present (`hairlinePresent: true`) on both shell
docks. Captures (literal): `rail3/shell-light-forms-1280.png`, `rail3/shell-dark-forms-1280.png`,
`rail3/shell-light-forms-820.png`, `rail3/shell-dark-forms-820.png` — the SidebarDock
carousel column beside the pill on the horizontal connector, the BottomDock carousel row
above the pill on the vertical connector.

## G3 — the carousel cycles (the ONE registry, captured)

Clicking the "Selection" chip moves the active highlight Text → Selection AND navigates
`/forms/inputs` → `/forms/select` (the facet's first story). On the `dock/rail` story,
clicking "Libraries" flips the `dock-rail-readout` to "libraries" and the active chip to
Libraries (the rail writes the SAME `railLayer` the `<DockLayerGroup>` reads). Captures:
`rail3/readback-cycle.json`.

## G4 — the corpses are buried (captured)

No `writing-mode`/rotate clipped label on the dock edge (`rotatedLabel: false` — the
"Eng…" label is gone); no in-dock contextual `<DockLayerGroup>` inside either shell dock
body (`inDockContextGroup: false` — the orphan indicator is gone).

## The `proof:rail3` born-RED → GREEN gate

Device-free static src-scan (R1-R6), `tags: ["local","ci","release"]`. GREEN stdout:

```
proof:rail3 — the floating-carousel rail (facets OUT of the dock, box INVIOLATE) gate (AZ.W-RAIL3)
  R1 in-dock group GONE (both shell) : sidebar=true bottom=true OK
  R2 one registry, no shadow         : contextModel=true internalShadow=false OK
  R3 hairline whisper + extent       : composes=true hardBorder=false token=true overrun=true OK
  R4 strip outside containment       : slot=true railshell=true sibling=true escapes=true OK
  R5 flex strip of chips, cyclable   : flex=true overflow=true snap=true chipVfor=true OK
  R6 ≥2 live SHELL consumers          : sidebar=true bottom=true OK
  status: PASS
```

Born-RED bite (each clause independently falsifiable; baseline GREEN):

| mutation | clause | result |
|---|---|---|
| restore the in-dock `<DockLayerGroup>` in either shell dock | R1 | RED |
| add an internal `const activeLayer = ref(...)` to DockRail.vue | R2 | RED |
| swap the hairline `box-shadow: var(--border-hairline)` → `border: 1px solid` | R3 | RED |
| delete the `--dock-rail-extend-length` rule | R3 | RED |
| collapse the strip to a single DockIconButton (no chip v-for) | R5 | RED |
| drop the rail from either shell dock | R6 | RED |

## Verification

- `npm run typecheck` — GREEN (vue-tsc `--noEmit` both projects, exit 0).
- `proof:rail3` — GREEN (R1-R6, born-RED verified on the 6 mutations).
- `tests-visual/rail3.spec.ts` — 10/10 GREEN (G1 box-equality + G2 outside-paint + G3
  cycle + G4 no-corpse on BOTH shell docks × {1280, 820} × {light, dark} × {fine, coarse}).
- The adjacent dock fleet — `proof:rail-extend` (R1-R6), `proof:dock-taxonomy`
  (`DockRailItem` added to the T2 rail-noun allowlist — a member type of the sanctioned
  `DockRail` noun, not a re-overload), `proof:dock-unify`, `proof:dock-rail-hairline`
  (the in-dock `/dock/layers` switcher rail UNTOUCHED), `proof:dock-contextual-layers`
  (W2 updated to accept the rail-strip render target — the resolver is KEPT),
  `proof:dock-perfection`, `proof:dock-region-model`, `proof:colocation` — all GREEN.
- The dock unit fleet — `tests/components/custom/dock/` 93/93 GREEN.

## Coordination / hand-off

- `proof:dock-contextual-layers` W2 (the gate SCRIPT, NOT package.json) was updated: the
  shell docks now RENDER the contextual layers via the `<DockRail :items>` strip mapped
  over `contextLayers` (the resolver KEPT, the render target moved). The legacy in-dock
  `<DockLayerGroup>` render path is still accepted (no regression for a future in-dock
  consumer).
- `proof:dock-taxonomy` T2 allowlist (the gate SCRIPT) gained `DockRailItem` — the chip
  descriptor type of the sanctioned `DockRail` noun.
- The one-shot `_dock-context-capture.spec.ts` (a LOCAL generator, not in the gate
  battery) re-points to the rail-strip chips (`sidebar-dock-rail`/`bottom-dock-rail`).
- **Orchestrator-owed registration (sharedFileDeltas):** the `proof:rail3` key in
  `package.json` + the `gates.mjs` GATES row (`tags: ["local","ci","release"]`) +
  `proof:gen-ci-fresh` re-lock; the `PROGRESS` row; the `VISUAL-ALLOWLIST` adds for the
  rail3 captures; the `MIGRATION.md` note for the `<DockRail>` `items` API. NOT edited by
  this lane.

---

## Orchestrator refinements (post-lane, captures + hash re-stamped)

1. **The `entries` prop clean break.** The lane preserved the prior single-end-icon
   `entries?: readonly string[]` prop "for back-compat" — the legacy-alias pattern the house
   prohibits. Zero consumers passed it at the cut (all three pass `items`); the prop, its
   fallback branch, and its doc references are DELETED (MIGRATION.md callout updated to the
   clean-break wording).
2. **The vertical-dock strip seat → CENTER.** The lane's top-anchored seat
   (`inset-block-start: calc(control + 1rem)`) landed the chip strip in the page H1/breadcrumb
   band at scroll-top (the "Text" chip occluded the `Inputs` heading — a first-time-auditor
   wtf). Re-seated to the dock's vertical midline (`inset-block-start: 50%` + `translate: 0
   -50%`) — stable across viewport heights, clear of the title band, and reads as the carousel
   riding the dock's midline. Mid-body chip overlap is the inherent floating-overlay tradeoff
   (content scrolls behind), accepted by design.

Re-verified after both: `proof:rail3` R1–R6 GREEN · `tests-visual/rail3.spec.ts` 5/5 (the
G1 box-equality + G2 outside-paint + G3 cycle + G4 no-corpse arms, 2 viewports x 2 modes; the
rail3/ captures + readbacks REGENERATED at the centered seat) · typecheck 0 · dock units 93/93.
