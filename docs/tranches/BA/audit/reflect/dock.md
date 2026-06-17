<!-- surface-paths: demo/layout/SidebarDock.vue,demo/layout/BottomDock.vue,demo/layout/dock-nav.css,src/components/custom/dock/DockRail.vue,src/styles/dock/rail-extend.css -->
<!-- surface-hash: d3fd8f92aca685c4eb3472ce4216de1ba86e02d2a2ef93803fc52726213b88d9 -->

# BA.W-REFLECT2 — dock surface reflection record

**Surface:** dock (the taxonomy · the in-dock hairline switcher rail + the DockRail beyond-dock floating-carousel chip strip · collapse/expand/morph · the section model · the in-situ V↔H morph · the iOS-glassy register · the adaptive darken — live on `/dock/overview`, `/dock/layers`, `/dock/rail`, `/dock/morph-showcase` + the shell BottomDock+SidebarDock, both modes, 2 viewports)
**Auditor:** W-REFLECT2 reflection conductor · **Date:** 2026-06-15 · **Branch:** tranche/BA @ HEAD
**Routes:** `/dock/overview`; `/dock/layers`; `/dock/rail`; `/dock/morph-showcase`; the shell BottomDock+SidebarDock
**Ground-anchor (the FAIL baseline):** R8-1; R8-2; R8-6 (`R8-06-dock-buttons-cutoff-rail-fanout.png`); R8-9

## 1 — RECAPITULATE (the R8 reads × the discharging BA waves × evidence)

| R8 read | discharging wave | discharging evidence | live state this pass |
|---|---|---|---|
| R8-9 docks lack sections | W-DOCK-SECTIONS (tripartite section model) | `W-DOCK-SECTIONS-DELTA.md` G4 | HELD (section model on both docks) |
| R8-1/R8-6 dock rail misaligned / buttons cutoff / rail fanout | W-DOCK-SECTIONS (separator-seam re-seat) | `W-DOCK-SECTIONS-DELTA.md` G1-G3 + box-inviolate G5 | the SEAM geometry holds, but the desktop FAN-OUT collides with the page title — see §4 |
| R8-2 morph holds on showcase, want it IN the shell | W-DOCK-MORPH-INSITU (in-situ V↔H + layering) | `W-DOCK-MORPH-INSITU-DELTA.md` (the in-situ morph + BA-VJS-1 nested-measure fix; the shell-gestalt PASS) | HELD (the in-situ morph + layering switch live) |
| the de-red iOS register + adaptive darken + collapsed-circle | W-REGISTER-IOS / W-ADAPTIVE-AUTO / W-DOCK-NAV (inherited AZ) + W-GLASS-CAL (de-disco) | `W-GLASS-CAL-DELTA.md` (D3 dock-tab primary collapsed onto plain glass; no phase-grain) | HELD (no brand-red interactive register; the dock pills read as glass over the field) |

The DAG §7 cross-surface obligation: the dock verdict reads the section model (W-DOCK-SECTIONS) + the rail re-seat + the morph-insitu (W-DOCK-MORPH-INSITU) as ONE designed dock. Most of these read finished — but the SidebarDock's beyond-dock floating-carousel chips collide with the page-title band on desktop (§4), so the dock does NOT read as one finished designed dock on the primary `/dock/overview` desktop route.

## 2 — RE-VERIFY LIVE (fresh whole-page captures, both modes × 2 viewports)

Captured live on `:5199` (Playwright, `reducedMotion:reduce` — the dock-stage field parks). Whole-page, over the real dark register.

- `dock-light-desktop-full.png` / `dock-dark-desktop-full.png` (1440×900)
- `dock-light-mobile-full.png` / `dock-dark-mobile-full.png` (390×844)

π readback (live `:5199` this pass):
- **The CLEAN deliverables (held):** the dock pills (collapsible circle, media transport, select/dropdown triggers) read as glass over the live blueprint-grid field in BOTH modes (dark is NOT a void — the dark-material register holds); the de-red iOS register holds (no warm-red on interactive states); the collapsed pill is a tight circle; the in-situ morph + layering are wired.
- **The MISS (desktop):** the SidebarDock DockRail floating facet chips ("Shell/Panes") overflow into the `<main>` top band and paint OVER the page `<h1>` "Overview" → it reads "verview" with the "Panes" chip on the "O" (measured: chips at `x=[70,228]` / `y=[63,93]` over the `<h1>` at `y=58`; `overlapsH1: true`). MOBILE is clean (the BottomDock chips fan above it; the title is fully legible).

## 3 — THE PERFECTION QUESTION (first-time-auditor, cold)

Walking `/dock/overview` desktop fresh: the dock demos themselves read finished (glass pills over a live field, a tight circle, a media transport) — but the floating facet chips sitting on the page TITLE at the top draw a "wtf — the nav chips are on the heading." This is the R8 mis-alignment class. Mobile + the substrate dock stories are clean; the desktop StoryPage-chrome collision is the open miss.

## 4 — MISS (S1 — structural, shared root with the shell surface)

**MISS — S1 (the SidebarDock floating-chip-over-title collision).** Same root as the shell surface: the SidebarDock W-RAIL3 floating-carousel facet chips, seated at the binding ℱ-home anchor seam, overflow into the `<main>` top band and occlude the page `<h1>`. W-DOCK-SECTIONS booked this as an accepted *breadcrumb* tradeoff; the whole-page render shows a full *title* occlusion — the P-1 gap.

- **Mechanism:** identical to the shell record — `.dock-hairline-slot.vertical` overflows the 82px sidebar into `<main>` at the ℱ-home seam y≈78, over the StoryPage `<h1>` at y≈58; the midline relocate that clears it is W-DOCK-SECTIONS forbidden workaround #4.
- **Named successor:** `BA.W-SHELL-RAIL-RESEAT` (the SAME triumvirate as the shell surface — ONE shared root, ONE successor, not two). Must keep `proof:dock-sections`/`proof:rail3`/`proof:rail-extend` GREEN.

**VERDICT: FAIL.** The dock does NOT read as one finished designed dock on the primary `/dock/overview` desktop route: the SidebarDock floating facet chips occlude the page title. Routed to the triumvirate (`BA.W-SHELL-RAIL-RESEAT`, shared with the shell surface). `proof:ba-gestalt` stays RED on this surface until the successor lands and this record gains a RE-REFLECTION verdict that supersedes this FAIL.

## 5 — RE-REFLECTION (BA.W-SHELL-RAIL-RESEAT landed; the superseding pass)

**Date:** 2026-06-15 · **Branch:** tranche/BA @ HEAD (post-reseat) · **Auditor:** W-SHELL-RAIL-RESEAT triumvirate-redress (re-reflection)

**The redress (direction (a) — the below-title trailing-gutter seat).** The SidebarDock rail's anchor seam moved OFF the top ℱ-home separator (measured y≈62, in the title band) DOWN to the trailing `utility` (`nav`) separator (measured y≈529, the rail's lower gutter). The `<DockSeparator anchor>` flag is removed from the ℱ-home divider in `#persistent` and `<DockSection anchor-id="utility">` makes the `nav`-zone leading separator the rail's anchor (the section model's natural `nav`-first default, made explicit). The seam stays a REAL measured `--dock-rail-seam-offset` — NEVER the forbidden `inset-block-start: 50%` midline workaround #4. The dock box is UNCHANGED (the chips ride the `.glass-dock-frame` escape OUTSIDE the box). Single demo-file change in `demo/layout/SidebarDock.vue`; no library CSS touched.

**RE-VERIFY LIVE (fresh whole-page captures, both modes × 2 viewports, post-reseat):**
- `dock-light-desktop-full.png` / `dock-dark-desktop-full.png` (1440×900) — the page `<h1>` "Overview" + the "DOCK · OVERVIEW" breadcrumb read FULLY CLEAR; the "Shell"/"Panes" facet chips sit in the rail's lower-left gutter, fanning over the page's left margin (clear of content here).
- `dock-light-mobile-full.png` / `dock-dark-mobile-full.png` (390×844) — the BottomDock carries the facets above it; unchanged, clean.

π readback (live `:5199`, measured this pass — the binding truth):
- The SidebarDock seam offset moved **62px → 529px**; the slot anchors at y=545; the facet chips fan at **y=[532,558]** (was y=[65,91]). The page `<h1>` "Overview" sits at y=[58,98]. **overlapH1: false** (was `true`) on all three named desktop StoryPage routes (`/forms/inputs`, `/feedback/notification`, `/dock/overview`) — the title-band collision is GONE, measured.

**VERDICT: PASS.** The dock reads as one finished designed dock on the primary `/dock/overview` desktop route — the SidebarDock floating facet carousel is re-seated in the rail's lower gutter, clear of the page title; the section model + in-situ morph + de-red iOS glass register all hold. The W-REFLECT2 desktop title-collision miss is discharged. `proof:dock-sections` / `proof:rail3` / `proof:rail-extend` stay GREEN; the box stays INVIOLATE. This RE-REFLECTION verdict supersedes the §4 FAIL.

## 6 — §field-graze (BB.W-CHIP-GRAZE — the §5 PASS REVOKED; the P-1 recurred INSIDE its own fix)

**Date:** 2026-06-16 · **Branch:** tranche/BB @ HEAD · **Auditor:** BB.W-CHIP-GRAZE redress lane

**The lie.** §5's RE-REFLECTION flipped the roster `dock` row FAIL→PASS on the title-fix ALONE. It measured `overlapH1:false` on `/dock/overview` and asserted "the facet chips sit in the rail's lower-left gutter ... clear of content here" — but "clear of content **here**" was measured on `/dock/overview`, whose content column has no field at the y≈529 seam band. On `/forms/inputs` a real `.input-pill` form field DOES live in that band, and the re-seat's chips fan RIGHT into `<main>` directly over it. The §5 verdict judged the TITLE relationship only — never the FIELD relationship — the exact P-1 close-class lie this gestalt gate exists to catch, recurring INSIDE the wave that named the P-1 fix as its charge.

**THE MEASURE (live `:5174`, viewport 1100×900, `/forms/inputs`, the narrow-desktop breakpoint — the binding evidence the title-only DELTA masked):**
- **BEFORE (HEAD — the field graze):** the desktop SidebarDock `.dock-hairline-extend-chip` set sits at **x=[73,329] / y=[532,558]**, fanning RIGHTWARD past the rail edge into `<main>` (which begins at x=83). The first `.input-pill` form field sits at **x=[144,528] / y=[520,560]**. The bboxes INTERSECT → **chipOverField:true.** (Capture: `docs/tranches/BB/audit/visual/chip-graze-before-light-desktop.png`.)
- **AFTER (the SOURCE redress — the field-clearance re-fan):** the desktop SidebarDock carousel re-fans DOWN the rail's own gutter as a vertical icon column centered on the dock (`demo/layout/dock-nav.css`, scoped to `.demo-sidebar-rail`): the chips seat at **x=[24,60]** — fully WITHIN the 83px rail aside, never reaching `<main>` (x≥83) nor off the viewport's left edge — at **y=[547,637]**. The `.input-pill` is no longer intersected → **chipOverField:false** (measured this pass, both light + dark). The 3 chips stay RENDERED + REACHABLE (icon + the existing `title` tooltip; never `display:none`'d), and the active-facet highlight still tracks. **overlapsH1:false STAYS true** (the title fix is NOT regressed — h1 at y=[58,98], no chip intersection). The seam stays the REAL measured `--dock-rail-seam-offset` (529px) — NEVER the forbidden `inset-block-start: 50%` midline workaround #4. The library `rail-extend.css` is byte-untouched, so `proof:dock-sections` S2 / `proof:rail3` (incl. R6 ≥2-SHELL-consumer — the SidebarDock keeps its `<DockRail>`) / `proof:rail-extend` (box-equality) all stay GREEN. (Capture: `docs/tranches/BB/audit/visual/chip-graze-after-{light,dark}-desktop.png`.)

**Direction decision:** direction (b) (keep the floating carousel on the SidebarDock, re-fan its reach within the gutter) — direction (a) (the desktop in-pane switcher) CANNOT hold `proof:rail3` R6, which binds BOTH shell docks to mount a live `<DockRail>` (removing it from the SidebarDock reds R6) AND R1's box-inflation prohibition (an in-pane `<DockLayerGroup>` switcher is the deletion source). The spec's recorded de-risk is direction (b); the census is held INSIDE the wave.

**VERDICT: FAIL (the §5 PASS REVOKED).** The dock does NOT read as one finished designed dock until W-REFLECT3 (Batch 7 — the single authorized verdict-flipper) re-walks it whole-page in BOTH viewports × modes over the real backdrop, re-stamps this record's surface-hash to the post-redress source, and records the fresh content+dimension+freshness-verified `chipOverField:false`. This wave lands the SOURCE redress + the CG2 clause + the roster revocation; the PASS is re-earned, not re-asserted here (a PASS→FAIL revocation is the honest re-statement of the open defect, never a flip-to-PASS).
