<!-- surface-paths: demo/layout/AppShell.vue,demo/stories/forms/inputs.vue -->
<!-- surface-hash: 1c0bd3a553996a07fc70c9868fc0be95060b7e85b14aa04cbe0dc751f4ddee7f -->

# BA.W-REFLECT2 — shell surface reflection record

**Surface:** shell (the demo-layout shell: BottomDock + SidebarDock nav, the section model, the held page — live on every route, the `/forms/inputs` StoryPage-chrome route as the primary read, both modes, 2 viewports)
**Auditor:** W-REFLECT2 reflection conductor · **Date:** 2026-06-15 · **Branch:** tranche/BA @ HEAD
**Routes:** the demo-layout shell (BottomDock + SidebarDock nav, the section model, the held page)
**Ground-anchor (the FAIL baseline):** R8-1 (`R8-01-dock-rail-misaligned-b.png`); R8-9 (`R8-09-docks-lack-sections.png`)

## 1 — RECAPITULATE (the R8 reads × the discharging BA waves × evidence)

| R8 read | discharging wave | discharging evidence |
|---|---|---|
| R8-9 docks lack sections | W-DOCK-SECTIONS (the tripartite section model on BOTH shell docks) | `W-DOCK-SECTIONS-DELTA.md` (G4 zones=`["section","nav"]` on both docks) |
| R8-1 dock rail misaligned | W-DOCK-SECTIONS (the separator-seam re-seat) | `W-DOCK-SECTIONS-DELTA.md` (G1 the seam-anchored Y/X within ≤6px) |
| FD-FS-4 the held page (no auto-navigate race) | W-SHELL-HOLD | `W-SHELL-HOLD-DELTA.md` |
| the route page-enter | W-ANIMATE (the `<RouterView>` `<Transition>`) | `ba-animate.spec.ts` W1 |

## 2 — RE-VERIFY LIVE (fresh whole-page captures, both modes × 2 viewports)

Captured live on `:5199` (Playwright, `reducedMotion:reduce`). Whole-page, over the real dark register.

- `shell-light-desktop-full.png` / `shell-dark-desktop-full.png` (1440×900)
- `shell-light-mobile-full.png` / `shell-dark-mobile-full.png` (390×844)

π readback (live `:5199` this pass):
- **DESKTOP — the title-band collision (the binding miss).** On the StoryPage-chrome routes the SidebarDock's DockRail floating facet chips overflow rightward INTO the `<main>` top band and paint OVER the page `<h1>`. Measured: the `.dock-hairline-slot.vertical` anchors at `y=78` (the ℱ-home seam), spans `x=[-28,110]` (overflowing the 82px-wide sidebar into the content), and the facet chips reach `x=[70,228]` — directly over the page `<h1>` at `y=58`. Per-route horizontal title-text occlusion: `/forms/inputs` chips "Selection"+"Toggles" overlap "Inputs" (85px); `/dock/overview` "Panes" over "Overview" (43px); `/feedback/notification` "Progress" over "Notification" (65px). Full-res crop (`shell-light-desktop-full.png` top band): the chips sit ON the title glyphs, AND the mono breadcrumb (`FORMS · INPUTS`) is clipped at the very top.
- **MOBILE — clean.** The BottomDock carries the section model + the facet chips fanning ABOVE it; the page title (`Inputs`) is fully legible (no collision). `shell-{light,dark}-mobile-full.png`.
- The section model + held page + route-enter all read correctly; the shell chrome is otherwise coherent in both modes.

## 3 — THE PERFECTION QUESTION (first-time-auditor, cold)

Walking the shell on a desktop StoryPage-chrome route fresh: the floating nav chips sitting directly on top of the page TITLE ("Selection"/"Toggles" across "Inputs") reads as a "wtf — the navigation is colliding with the heading." This is the exact R8 "totally mis-aligned" class. The mobile BottomDock read is clean; the substrate/hero routes (where the `<h1>` is a card lower on the page) are clean; but the StoryPage-chrome DESKTOP routes show the collision, and they are a primary read of the shell.

## 4 — MISS (S1 — structural, named successor)

**MISS — S1 (the title-band collision on desktop StoryPage-chrome routes).** The SidebarDock's W-RAIL3 floating-carousel facet chips, seated at the binding ℱ-home anchor seam (top of the fixed vertical rail), overflow into the `<main>` top band and occlude the page `<h1>` + breadcrumb on every StoryPage-chrome desktop route. W-DOCK-SECTIONS recorded this as an "accepted tradeoff" describing it as a *breadcrumb* graze — the live render shows it as a full *title* occlusion, the per-mechanism DELTA understating the whole-page severity (the precise P-1 gap this gestalt gate exists to catch).

- **Mechanism:** `.dock-hairline-slot.vertical` on the SidebarDock (`src/styles/dock/rail-extend.css` + `demo/layout/SidebarDock.vue`) anchors at the ℱ-home separator seam near the rail top and overflows right by `--dock-rail-extend-length` into `<main>` (which starts at x=82); the StoryPage chrome `<h1>` + breadcrumb sit in that same top band (`<main>` `pt-6/md:pt-10` → `<h1>` at y≈58). The `inset-block-start:50%` midline relocate that would clear the title is the W-DOCK-SECTIONS forbidden workaround #4 — so this is NOT a token nudge; it is a topology re-think.
- **Named successor:** `BA.W-SHELL-RAIL-RESEAT` (triumvirate) — re-seat the SidebarDock facet-chip carousel so it does NOT collide with the page-title band on desktop WITHOUT re-introducing the midline workaround #4 (candidate directions for the research lane: (a) seat the sidebar facet carousel BELOW the title band / at the rail's trailing gutter clear of `<main>`'s top, (b) on the always-expanded desktop sidebar render the facets via the in-pane switcher and keep the floating carousel on the BottomDock only — re-checking `proof:rail3` R6 ≥2-shell-consumer, (c) clear the `<main>` title band of the sidebar chip reach). Must keep `proof:dock-sections` / `proof:rail3` / `proof:rail-extend` GREEN.

**VERDICT: FAIL.** The shell does NOT read as a designed whole on desktop StoryPage-chrome routes: the SidebarDock floating facet chips occlude the page title. Routed to the triumvirate (`BA.W-SHELL-RAIL-RESEAT`). `proof:ba-gestalt` stays RED on this surface until the successor lands and this record gains a RE-REFLECTION verdict that supersedes this FAIL.
