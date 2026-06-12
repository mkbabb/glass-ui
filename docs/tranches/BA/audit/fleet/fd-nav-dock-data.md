# BA fleet — lane: fd-nav-dock-data (FRONTEND-DESIGN panes 3/4)

The navigation + dock + data categories — the SAME bar, both modes. The dock is the
user's named FLAGSHIP. AUDIT-ONLY; live-probed on :5199 (DARK primary — the flagged
register; system prefers light but the demo forces `.dark`, so dark IS the user's real
surface). Evidence pngs banked beside this report (`fd-*.png`). Source-confirmed where
mechanical.

NOTE on the live session: :5199 is shared with a parallel fleet lane; the route
intermittently reloaded-to-`/foundations/*` between my evaluate and screenshot. Every
capture below was URL-verified at the moment of `screenshot`; the design verdicts are
source-corroborated so the flaky reload does not weaken them.

---

## TL;DR — the gestalt verdict

The dock band's COMPONENTS are competent and the data surfaces are genuinely crafted
(invoice table, phased timeline, sortable, tabs). The FAILURE is **staging**: the
flagship dock demos sit on FLAT near-black `bg-card/40` panels with nothing behind the
glass to blur — so the liquid-glass identity reads as gray pills on charcoal, NOT
"liquid glass at full power." The ONE dock demo staged over `<Aurora>` (overview's first
collapsible) and the two aurora-backed pages (carousel, vertical-dock/rail) PROVE the
pattern works — the band just doesn't apply it. This is the same disjoint the user named
across R8-11/R8-15: glass with no rich substrate is invisible glass. Compounded by the
dark-register flatness (`--background` L6% vs `--card` L10%, 4% apart) the whole band
reads as low-contrast charcoal-on-charcoal.

The lifting move is a **dock-stage chassis**: a demo-private staging primitive that puts
EVERY flagship dock demo over a (budget-shared, paused-when-offscreen) procedural
backdrop — aurora/constellation/grid — the way carousel + rail already do, instead of
the flat `bg-card/40` panel. The dock components don't change; their stage does.

---

## DOCK (the flagship band)

### /dock/overview — the GlassDock walkthrough
- **VERDICT: components good, staging flat (the headline gap).** ~8 dock demos
  (collapsible morph, media transport, select/dropdown, popover, slider-hold, tap/click,
  menu-teleport, overflow-wrap, big-dock, bg-toggle). Each is a real, working dock with
  the four-state controls, the keep-open hold, the portal-teleport — the engineering is
  there. But **only the FIRST demo is staged over `<Aurora>`** (`overview.vue:120`,
  `opacity-ceiling:0.4`); **every other demo sits on a flat `bg-card/40 p-8` panel**
  (`overview.vue:143, 169, …`). In dark mode those flat panels are near-black, the dock
  pills are gray, and there is nothing behind the dock for the `backdrop-filter` to
  sample — so the glass reads as a flat rounded rectangle, not glass.
  (`fd-dock-ov-demos-dark.png`, `fd-dock-ov-collapsible-dark.png`.)
- **LIFT:** stage the WHOLE walkthrough over a shared backdrop (one paused-when-offscreen
  aurora/constellation behind the scroll column, or a per-demo grid wash), so each dock
  pops the way the first one does. Keep the one-GL-context budget by sharing a single
  backdrop layer across the demos rather than N auroras.

### /dock/layers — DockLayerGroup drill-in + switcher rail
- **VERDICT: the layering system demos well; ZERO rich staging.** The drill-in nav (Assets
  / Layers / Libraries) and the `show-rail` switcher (icon column + crossfade) ARE the
  robust layering/contextual facility the user asks to see (R8-2) — and they read clearly.
  But every demo is on `bg-card/40 p-10` flat panels (`layers.vue:66, 119`), no aurora,
  no grid — so again the glass is inert charcoal. (`fd-dock-layers-dark.png`.)
- **LIFT:** same dock-stage chassis. The layering demos are the user's "robust set of
  facilities" — staging them over a live backdrop is exactly where the crossfade + the
  glass-on-moving-substrate reads as liquid glass.

### /dock/morph-showcase — the V↔H liquid-glass morph (the named headline feature)
- **VERDICT: the headline feature is staged on a flat plate.** The "Morph to horizontal"
  button + "Liquid teardrop (preview)" toggle (`MODE = VIEW-TRANSITION · T = 0.000`) +
  the metaball-goo bridge are all present and the mechanism is sound. But the morphing
  dock sits on a flat dark stage; the only `background:` is the goo-bridge SVG filter
  (`morph-showcase.vue:331`), NOT a page backdrop. The single most impressive dock
  capability — an amorphous teardrop morph — has no rich substrate to read against, so
  the "liquid glass" reads as gray-on-charcoal. (`fd-dock-morph-dark.png`.)
- **LIFT:** this demo MOST needs the rich stage — a teardrop of glass morphing over a live
  aurora is the flagship money-shot. Stage it over aurora/constellation; the goo-bridge
  threshold already occludes the topology reflow, so a moving backdrop only helps.

### /dock/rail — the vertical GlassDock nav column
- **VERDICT: GOOD — this one is staged right.** `rail.vue:79` wraps the vertical dock in
  `<Aurora>`; the home-left `#persistent` + `<DockSeparator>` nav pattern + the
  `<DockRail>` chip strip are all present. This is the reference for how every dock demo
  should be staged. (Source-confirmed; live capture blocked by the route-reload, but the
  sidebar SHELL dock — itself a vertical dock — is visible in every other capture and
  reads as a competent thin column.)
- **LIFT:** none for staging; propagate THIS pattern to overview/layers/morph.

### The shell docks (sidebar + bottom, visible on every page)
- **VERDICT: the R8-1/R8-9 defects are LIVE and design-corroborated here.** Visible in
  EVERY capture: the sidebar dock's facet chips (Tables/Lists/Series, Shell/Panes, etc.)
  float DETACHED to the right of the column joined by a thin line — not seated at the ℱ
  divider seam (R8-1). The bottom dock is one undifferentiated `[panel] › « »` run with no
  rail-core/sections/nav-arrows gestalt (R8-9). The mechanical root-cause + re-seat is the
  `dock-rail-seat` lane; from the DESIGN side the finding is the same: the rail reads as a
  floating carousel orphan, not a dock affordance. (Every `fd-*.png`.)

---

## NAVIGATION

### /navigation/tabs
- **VERDICT: GOOD — crafted, comprehensive.** Default (segmented dark pill w/ active
  luminance-lift), Pill (inline highlight), Underline, Vertical — all four registers shown,
  the active indicator glides cleanly. On-brand. (`fd-nav-tabs-dark.png`.)
- **MINOR:** the panel CONTENT areas under each tab set ("Glanceable summary of everything
  that matters.") are flat near-black `bg-card`/muted plates — inert filler. The tabs are
  the star; the surrounding content panels are dead space. A small lift (a token chip, a
  fira-code caption, a mini metric) would make the panel read as a real destination.

### /navigation/carousel
- **VERDICT: GOOD — the aurora-backed model.** Declares `background: "aurora"`; the carousel
  card + nav dots + the glass-surface-scroller (Foundations cards) all float over the
  purple→peach→blue aurora and the glass POPS. This is the proof the dock band should copy.
  (`fd-nav-carousel-dark.png`.)

### /navigation/header-ribbon
- **VERDICT: THIN — adequate component, anemic demo.** ONE 128px-tall framed box
  (`header-ribbon.vue:19-49`, `h-32`) hosting a single HeaderRibbon (hover anchor → control
  row). No state variety shown statically (pinned vs unpinned, left vs right, the items
  fanned), no rich surface. It teaches the mechanic but doesn't SHOW the component's range.
- **LIFT:** expand to a multi-state showcase (pinned/unpinned side-by-side, both anchor
  positions, over a richer surface) — match the craft density of tabs/table.

---

## DATA (tables · timelines · sortables — crafted or bootstrap-ish?)

### /data/table — CRAFTED (not bootstrap-ish)
- **VERDICT: GOOD.** Invoice ledger (Ada Lovelace … Barbara Liskov) with status badges
  (Paid green / Pending amber / Overdue red, `statusTone()` section-color tints), fira-code
  IDs + amounts, a `Total · $3,446.75` footer, a `<TableEmpty>` empty-state, the blueprint
  grid faintly behind. This is a thoughtful financial table, the opposite of bootstrap.
  `bg-card` opaque is legit (table is on the W54 legibility allowlist).
  (`fd-data-table-dark.png`.)
- **MINOR:** the opaque card barely separates from the near-black bg (the 4% L gap); the
  grid background is almost invisible in dark. A stronger card/bg separation in dark would
  let the grid + the cartoon shadow read.

### /data/timeline-segmented — CRAFTED
- **VERDICT: GOOD.** Multi-phase progress bar (blue→red gradient segments, boundary dots),
  a Ping COMPLETED / Download ACTIVE / Upload PENDING legend with colored pills + mono
  percentages, Advance/Reset controls. On-brand, not bootstrap. (`fd-data-timeline-seg-dark.png`.)
- **MINOR:** the Advance phase / Reset buttons are plain dark outlined pills — flat and
  uninteresting (the R8-13 "large and uninteresting" register, applied to demo controls).
  The trailing un-filled track segment is a flat gray; a faint boundary notch is visible
  (adjacent to the R8-14 Progress-segment seam class — worth a glance during that fix).

### /data/sortable-list — CRAFTED
- **VERDICT: GOOD (source-confirmed).** Section-tone task rows, a handle-only variant, AND a
  live `SORTABLE_CONTEXT` readout (`isDragging/dragId/dropIndex`) proving the DI seam — a
  teaching demo that shows the internals, not a toy list. (`sortable-list.vue:1-60`.)

### the rest (timeline-continuous, metric-cell/stack, infinite-scroll, scrolling-text, etc.)
- Not individually re-captured this lane (covered by the data-craft sub-surfaces above +
  other fleet lanes); the data category overall reads as CRAFTED, not bootstrap. The data
  band is the band that needs the LEAST design work — it needs the same dark-register
  separation lift as everything else, not a craft rescue.

---

## The cross-cutting roots (this band's share)

1. **Flat dock staging (the headline).** The flagship dock demos are on `bg-card/40` flat
   panels; glass over a flat substrate is invisible glass. ROOT: `overview.vue:143,169+`,
   `layers.vue:66,119`, `morph-showcase.vue` (no page backdrop). The fix is a demo-private
   **dock-stage chassis** (one shared, offscreen-paused procedural backdrop behind the dock
   demos) — NOT per-demo aurora (budget) and NOT a component change (the docks are fine).
   This is the single biggest lever for "show the flagship at full power" (R8-2 coverage,
   R8-15 backgrounds, the frontend-design directive's "suffuse glass").
2. **Dark-register flatness.** `--background` L6% vs `--card` L10% (4% apart) makes every
   card-on-page in this band read as charcoal-on-charcoal; the grid/cartoon-shadow/glass
   ladder all collapse in dark. Cross-band root (R8-11/12/13/15/19), but it BITES this band
   on every table/timeline/tab panel. The fix is a dark-token recalibration (separate lane).
3. **Shell-dock rail orphan + sectionless bottom dock (R8-1/R8-9).** Live + design
   confirmed; mechanical re-seat is the `dock-rail-seat` lane.
4. **Inert content panels.** Tab panels + some demo stages are flat dead space; small
   suffusion (a chip, a metric, a mono caption) per the one-color-event idiom would lift
   them without over-spend.

---

## Evidence (banked beside this report)
- `fd-dock-overview-dark.png` — overview hero over aurora (the GOOD staging, light-ish).
- `fd-dock-ov-demos-dark.png` / `fd-dock-ov-collapsible-dark.png` — the flat `bg-card/40`
  dock demos (the headline gap).
- `fd-dock-layers-dark.png` — DockLayerGroup demos on flat panels.
- `fd-dock-morph-dark.png` — the V↔H morph on a flat stage.
- `fd-nav-tabs-dark.png` — the four tab registers (crafted).
- `fd-nav-carousel-dark.png` — the aurora-backed carousel (the model to copy).
- `fd-data-table-dark.png` — the crafted invoice table.
- `fd-data-timeline-seg-dark.png` — the crafted phased timeline.
- `fd-data-sortable-dark.png` — (caught a reload to /display/separator; sortable verdict is
  source-confirmed).
