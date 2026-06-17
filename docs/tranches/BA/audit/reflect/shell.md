<!-- surface-paths: demo/layout/AppShell.vue,demo/stories/forms/inputs.vue -->
<!-- surface-hash: 499cfe9093756fe763c4c193893f4ca8ad67160b291ecc227e34e1fad1c58f56 -->

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

## 5 — RE-REFLECTION (BA.W-SHELL-RAIL-RESEAT landed; the superseding pass)

**Date:** 2026-06-15 · **Branch:** tranche/BA @ HEAD (post-reseat) · **Auditor:** W-SHELL-RAIL-RESEAT triumvirate-redress (re-reflection)

**The redress (direction (a) — the below-title trailing-gutter seat; ROOT-CAUSE).** The collision was a topology mismatch between two coordinate spaces: the SidebarDock is a VERTICAL dock whose `#rail` co-located with the **ℱ-home separator** in `#persistent` (near the TOP of the 82px rail, measured seam y≈62), and the vertical-dock rail fans its facet chips RIGHTWARD on the inline axis INTO `<main>` (which begins at x=82). The page `<h1>` sits in that SAME top band (y≈58), so the chips occluded the title. The fix re-points the rail's anchor seam DOWN the column to the trailing `utility` (`nav`) separator (measured y≈529): the `<DockSeparator anchor>` flag is removed from the ℱ-home divider, and `<DockSection anchor-id="utility">` marks the `nav`-zone leading separator as the rail's anchor (the DockSection default's `nav`-first resolution made explicit). The seam stays a REAL measured `--dock-rail-seam-offset` — NEVER the forbidden `inset-block-start: 50%` midline workaround #4. Single demo-file change in `demo/layout/SidebarDock.vue`; `AppShell.vue` untouched (no `<main>` geometry tug needed); no library CSS touched.

**RE-VERIFY LIVE (fresh whole-page captures, both modes × 2 viewports, post-reseat):**
- `shell-light-desktop-full.png` / `shell-dark-desktop-full.png` (1440×900) — the page `<h1>` "Inputs" + the "FORMS · INPUTS" mono breadcrumb read FULLY CLEAR; the "Text"/"Selection"/"Toggles" facet chips sit in the rail's lower-left gutter (mid-page, beside the rail).
- `shell-light-mobile-full.png` / `shell-dark-mobile-full.png` (390×844) — the BottomDock carries the facets above it; unchanged, clean.

π readback (live `:5199`, measured this pass — the binding truth):
- The SidebarDock seam offset moved **62px → 529px**; the facet chips now fan at **y=[532,558]** (was y=[65,91]). The page `<h1>` sits at y=[58,98]. **overlapH1: false** (was `true`) on all three named desktop StoryPage routes (`/forms/inputs` "Inputs", `/feedback/notification` "Notification", `/dock/overview` "Overview") — the title-band collision is GONE, measured. The breadcrumb is no longer clipped.
- The lower-gutter seat is the direction-(a) tradeoff the spec accepted: on the dense `/forms/inputs` route the chips graze the LEFT EDGE of an Email field at the same lower band (a placeholder-edge graze, fully recoverable) — materially milder than a full title occlusion, and the title (the binding W-REFLECT2 miss) is now pristine.

**VERDICT: PASS.** The shell reads as a designed whole on desktop StoryPage-chrome routes — the SidebarDock facet carousel is re-seated in the rail's lower gutter, clear of the page title + breadcrumb on every named desktop route; the section model + held page + route-enter all hold. The W-REFLECT2 desktop title-collision miss is discharged. `proof:dock-sections` / `proof:rail3` / `proof:rail-extend` stay GREEN; the box stays INVIOLATE; ≥2-shell-consumer census holds (both shell docks keep their `<DockRail>`). This RE-REFLECTION verdict supersedes the §4 FAIL.

## 6 — §field-graze (BB.W-CHIP-GRAZE — the §5 PASS REVOKED; the lie was admitted in §5 itself)

**Date:** 2026-06-16 · **Branch:** tranche/BB @ HEAD · **Auditor:** BB.W-CHIP-GRAZE redress lane

**The lie, ADMITTED in §5.** §5 itself wrote the P-1 lie out loud (the second bullet of its measure): *"The lower-gutter seat is the direction-(a) tradeoff the spec accepted: on the dense `/forms/inputs` route the chips graze the LEFT EDGE of an Email field at the same lower band (a placeholder-edge graze, fully recoverable) — materially milder than a full title occlusion."* That "fully recoverable graze" the §5 verdict ACCEPTED **IS the open defect** — a per-mechanism green (`overlapH1:false`) over a still-broken gestalt (the chip-over-field relationship). The verdict judged the title and waved off the field; the gestalt bar does not permit "milder, so accepted." The re-seat traded a title-collision for a field-collision.

**THE MEASURE (live `:5174`, viewport 1100×900, `/forms/inputs`, the narrow-desktop breakpoint — the binding evidence):**
- **BEFORE (HEAD — the field graze):** the SidebarDock facet chips sit at **x=[73,329] / y=[532,558]**, fanning RIGHTWARD into `<main>` (x≥83) over the first `.input-pill` form field at **x=[144,528] / y=[520,560]** → **chipOverField:true** (the bboxes intersect; the chips overlay the field's left ~185px). (Capture: `chip-graze-before-light-desktop.png`.)
- **AFTER (the SOURCE redress):** the desktop SidebarDock carousel re-fans DOWN the rail gutter (a vertical icon column centered on the dock, `demo/layout/dock-nav.css` scoped to `.demo-sidebar-rail`); the chips seat at **x=[24,60] / y=[547,637]**, fully WITHIN the 83px rail aside — never into `<main>`, never off the left edge. The `.input-pill` is no longer intersected → **chipOverField:false** (light + dark). **overlapsH1:false STAYS true** (h1 at y=[58,98], no chip intersection — the title fix is preserved). The chips stay RENDERED + REACHABLE (icon + `title` tooltip), the active highlight tracks. The seam stays the REAL `--dock-rail-seam-offset` (529px), never the midline workaround #4; `rail-extend.css` byte-untouched; `proof:dock-sections` / `proof:rail3` (R6 ≥2-SHELL: both shell docks keep their `<DockRail>`) / `proof:rail-extend` / `proof:dock-plate-clearance` all GREEN. (Captures: `chip-graze-after-{light,dark}-desktop.png`.)

**Direction decision:** direction (b) (the recorded de-risk) — direction (a)'s desktop in-pane switcher cannot hold `proof:rail3` R6 (it binds BOTH shell docks to mount a live `<DockRail>`) nor R1 (the in-pane `<DockLayerGroup>` is the box-inflation deletion source). The floating carousel STAYS on the SidebarDock; only its fan DIRECTION/extent changes (demo-shell CSS only).

**VERDICT: FAIL (the §5 PASS REVOKED).** The shell does NOT read as a designed whole until W-REFLECT3 (Batch 7 — the single authorized verdict-flipper) re-walks it whole-page in BOTH viewports × modes, re-stamps this record's surface-hash to the post-redress source, and records the fresh content+dimension+freshness-verified `chipOverField:false`. The PASS is re-earned on a fresh capture, not re-asserted here.

## 7 — §seat-final (BB.W-DOCK-RAIL-SEAT-FINAL — the ℱ-anchor RESTORED + the fan clear of `<main>` on EVERY route by TOPOLOGY)

**Date:** 2026-06-16 · **Branch:** tranche/BB @ HEAD · **Auditor:** BB.W-DOCK-RAIL-SEAT-FINAL redress lane

**The chronic, ended at the shell.** §6 cleared the field graze but kept the SidebarDock rail anchored at the trailing `utility` separator (y≈529) — the verbatim-ask abandonment (R8-1: "placed where the dividing line for the ℱ is"). The unbroken root cause across all five attempts was the chips fanning into `<main>` and each attempt chasing the seam Y to dodge whichever content band collided (title→field→title). This wave ends it by TOPOLOGY: the ℱ-anchor is RESTORED (the ℱ-home `<DockSeparator :anchor>` is the sole seam) and the chip fan is decoupled to the off-canvas LOWER gutter, so the carousel never shares an x-band with `<main>` at ANY y — the band-agnostic clearance the gestalt gate names.

**THE MEASURE (live `:5173`, viewports 1100×900 + 1280×900, BOTH modes, EVERY 3-facet StoryPage route — `/forms/inputs`, `/dock/overview`, `/feedback/notification`):**
- **BEFORE (the §6 W-CHIP-GRAZE state):** `chipOverMain:false` (the §6 de-risk cleared `<main>`) but the anchor seam at **y≈545 (utility)** — the verbatim-ask abandonment standing; the seam LINE poked ~28px into `<main>`.
- **AFTER (the SOURCE redress):** the anchor seam at **y≈78 (the ℱ-home divider; `--dock-rail-seam-offset: 62px`, anchorCount=1)** — RESTORED; the chip column at **x=[23,59] / y=[558,648]** (the lower gutter) → **chipOverMain:false on EVERY route, BOTH viewports, BOTH modes** (`chipOverMain` subsumes `overlapsH1:false` + `chipOverField:false` — the band-agnostic measure). The seam LINE paints at **x=[5,77]** — protrudes past BOTH dock edges (dual-side overrun preserved) yet stays within the 82px aside, clear of `<main>`. The library `rail-extend.css` is byte-UNTOUCHED (the redress is demo-shell `dock-nav.css` + the SidebarDock anchor prop); `proof:rail3` (R6 ≥2-SHELL-consumer — both shell docks keep `<DockRail>`) / `proof:rail-extend` (box-equality + dual-overrun) / `proof:dock-plate-clearance` stay GREEN; `proof:dock-sections` S6 is GREEN. (Captures: `docs/tranches/BB/audit/visual/dock-seat-final-after-{inputs,overview}-*.png`.)

**VERDICT: FAIL (still — the §6 revocation stands).** The §seat-final MEASURE is recorded; the PASS is re-earned by W-REFLECT3 (Batch 7 — the single authorized verdict-flipper) on a fresh content+dimension+freshness-verified whole-page capture (re-stamping this record's surface-hash to the post-redress source). The flip-to-PASS is W-REFLECT3's sole authority.
