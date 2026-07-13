# BI.W-DOCK-FOLD — cross-repo asks (the dock control/trigger fold)

The foreign-tree fence (inv-26) is literal: glass-ui edits ZERO sibling files. Every
public-surface break below is a by-name ASK; the sibling owns its own edit on its
`^5.0.0` bump. This roster feeds the master relay
(`docs/tranches/BI/coordination/asks-and-consumes.md`, row 12) — every row PAIRS its
import re-point with the kf `^5.2.0` + value `^3.1.0` peer bump (the XR-9 lockstep), so
a subpath fix never lands the consumer on an unsatisfiable value.js peer floor.

## The break, exactly

The five legacy dock control/trigger SFCs FOLD onto two survivors (clean break, no
alias): `<DockControl>` (a `shape` axis — `icon` default | `tab`) and `<DockTrigger>`
(a `for` axis — `select` default | `dropdown` | `popover`). `DockIconButton` dominates
the blast radius: **~24 import sites across ~9 consuming repos**. The reka `ui/tabs`
substrate + the demo-only `useDockItemDrag` dock-item drag-reorder retire (internal /
demo-only — no consumer-facing import).

`useDockCtaReceive` + `cta-seat.css` are PRESERVED (the /motion + /dock + /api triple
export STAYS — the pass-2 /dock-only-export charge was REVERSED). The
speedtest cta-seat consume contract (BC.W-AX-DOCK-CTA-SEAT) is real and unbroken.

## Asks — the by-name rename roster

Row grammar: *sibling · trigger (the consumer site) · the ask · disposition · the
paired peer bump*. All rows issue at the 5.0.0 cut (USER-gated).

| # | Sibling(s) | Trigger (site) | The ask | Disposition | Paired peer bump |
|---|---|---|---|---|---|
| F1 | the ~9 `DockIconButton` consuming repos (speedtest, muster, sci-report, atlas, bbnf-buddy, slides, …) | every `import { DockIconButton } from "@mkbabb/glass-ui/dock"` + `<DockIconButton …>` render (~24 sites) | `migrate-dock-icon-button-to-dock-control` — rename `DockIconButton` → `DockControl` (props identical; `shape="icon"` is the default). Mechanical by-name rename, one line per site | CUT-FIXED (5.0.0); the sibling edits on its `^5.0.0` bump | kf `^5.2.0` + value `^3.1.0` (paired) |
| F2 | any repo using the dock text-tab | `<DockTabButton …>` | `migrate-dock-tab-button-to-dock-control-shape-tab` — rename `DockTabButton` → `<DockControl shape="tab">` | CUT-FIXED (5.0.0) | kf `^5.2.0` + value `^3.1.0` (paired) |
| F3 | any repo using the dock overlay triggers | `<DockSelectTrigger>` / `<DockDropdownTrigger>` / `<DockPopoverTrigger>` | `migrate-dock-triggers-to-dock-trigger` — rename onto `<DockTrigger for="select|dropdown|popover">` | CUT-FIXED (5.0.0) | kf `^5.2.0` + value `^3.1.0` (paired) |
| F4 | **value.js** | `ActionBarLayer.vue:8` + `Dock.vue` — `useLayerTransition` / `DockLayerGroup` / `DockLayer` | `migrate-layer-transition-to-dock-crossfade` — `useLayerTransition` is DEFINITION-ABSENT (folded onto `<DockCrossfade :active>` by BI.W-DOCK-CROSSFADE); re-point onto the thin controlled crossfade slot. The crossfade consumer set includes value.js, NOT speedtest alone — a silent prune of the published symbol is forbidden (F4) | CUT-FIXED (5.0.0); value.js edits on its bump | kf `^5.2.0` + value `^3.1.0` (paired) |
| F5 | any repo arming `<GlassDock draggable-items>` | `draggable-items` prop + `@update:order` + `data-dock-draggable` | `retire-dock-item-drag` — the demo-only dock-ITEM drag-reorder axis is DEFINITION-ABSENT (zero binary consumer, G10 census). A dock reorder is a consumer concern: compose `useSortable` (`@mkbabb/glass-ui/sortable`) | CUT-FIXED (5.0.0) | kf `^5.2.0` + value `^3.1.0` (paired) |

## The atlas DockAppendix PEEK-as-third-detent consideration (R5-C-02)

The atlas `DockAppendix` PEEK-as-third-detent ask (`atlas-inbox-2026-07-12-p-loop.md §3`,
refining ask #17) rides the SAME `useLayerTransition`→`<DockCrossfade>` fold (row F4):
the crossfade slot's design carries the tri-state (SHUT→PEEK→FULL) as a bounded
extension consideration. Atlas SELF-HOSTS the PEEK detent until the primitive ships that
axis, and swaps onto it on its consume batch (the foreign-tree fence — glass-ui mints the
crossfade slot; the tri-state detent is a booked extension, not a 5.0.0 blocker).

## Foreign-tree fence (by construction)

Every row above is content-only. glass-ui reads the siblings as version + response
AUTHORITY at HEAD (`2026-07-13`) but edits ZERO sibling tree — the by-name ask is the
only channel. The sibling's edit lands in the sibling repo on its own `^5.0.0` bump.
