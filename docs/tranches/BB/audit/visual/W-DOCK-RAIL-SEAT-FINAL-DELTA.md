<!-- surface-paths: demo/layout/SidebarDock.vue,demo/layout/dock-nav.css,src/styles/dock/rail-extend.css -->
<!-- surface-hash: 3ebf8ace5e0255654c0d5ceb2bcc1e46227126edc9f2813667457199a10fab54 -->

# BB.W-DOCK-RAIL-SEAT-FINAL — DELTA: the ℱ-anchor RESTORED + the fan clear of `<main>` on EVERY route by TOPOLOGY (the chronic R8-1 seat, the 6th attempt as the topology-honest seat)

**Wave:** BB.W-DOCK-RAIL-SEAT-FINAL · **Branch:** tranche/BB @ HEAD · **Date:** 2026-06-16 · **Mode:** SOURCE redress + the born-RED S6 clause + the dock/shell §seat-final measure-record (the live `chipOverMain:false` close verdict is W-REFLECT3's, Batch 7)

## The chronic — the 5-attempt whack-a-mole, ended by topology

R8-1 is the user's verbatim ask: *"placed where the dividing line for the ℱ is."* Five attempts carried it and none cleanly resolved it (AZ.W-RAIL-EXTEND → R4-RAIL → W-RAIL3/R6 → BA.W-DOCK-SECTIONS → BA.W-SHELL-RAIL-RESEAT), each `live-verified` at its close while the SHELL stayed broken. The unbroken root cause across all five: **the chips fan into `<main>`, and each attempt chased the seam Y to dodge whichever content band currently collided** (title→field→title). W-SHELL-RAIL-RESEAT (BA) ABANDONED the verbatim ℱ-anchor (moved it DOWN to the `utility` separator, y≈529) to dodge the title; W-CHIP-GRAZE (Batch 1) then killed the rightward fan (re-fanned the chips DOWN the rail gutter, `chipOverMain:false`) but KEPT the anchor at the utility seam — the verbatim-ask abandonment standing.

This wave ends it by **topology**, not a sixth seam-Y chase:
1. **The ℱ-anchor is RESTORED.** SidebarDock marks the ℱ-home `<DockSeparator :anchor>` (in the `#persistent` slot); the `<DockSection>` `anchor-id` is nulled to a sentinel (`"__none__"`) so NO `<DockSection>`-rendered separator competes — the ℱ-home divider is the SOLE `[data-rail-anchor]` (anchorCount=1). GlassDock's seam-locator (byte-untouched) now measures it at the ℱ-home Y.
2. **The chip fan is DECOUPLED from the seam Y and seated in the off-canvas LOWER gutter.** The demo `dock-nav.css` (scoped `.demo-sidebar-rail`) seats the chip column at the slot BOTTOM (the dead rail space below the nav controls), capped at the rail width — so it never shares an x-band with `<main>` at ANY y, AND never collides the nav column. The seam LINE rides at the ℱ divider; the chips live in the lower gutter.

Because the fan never crosses into `<main>` at ANY y, neither the title NOR the field NOR any other band can be grazed — the band-agnostic graze is structurally dead, not chased — AND the anchor honors the verbatim ask. Both at once, not the seam-Y trade.

## The direction decision — (a) refined as the vertical LOWER-gutter column

The spec recommended direction (a) (the off-canvas gutter fan, ℱ-anchor restored). **The off-canvas gutter is the LOWER vertical gutter, not a side margin:** the fixed sidebar aside is 4.5rem (~82px), fully occupied by the 58px dock centered in it (x=[12,70]) — the side-gutters are ~12px each, far too narrow for a 36px chip. So the chips fan DOWN the rail's own lower gutter (below the nav controls), capped at the rail width. Direction (b)-as-in-pane-switcher is BARRED (it reds `proof:rail3` R6 — binds BOTH shell docks to mount a live `<DockRail>` — + R1's box-inflation prohibition, per W-CHIP-GRAZE §40-46). The floating carousel STAYS on the SidebarDock (box INVIOLATE — the library `rail-extend.css` is byte-untouched), the seam returns to the ℱ divider, the chips live in the lower gutter. This is the topology-honest seat that ends the chronic by structure.

## The binding live MEASURE — chipOverMain:false on EVERY route, anchor at the ℱ divider

Live `:5173` (the dev server's port), viewports **1100×900 + 1280×900** (the narrow-desktop breakpoint range), EVERY 3-facet StoryPage route (`/forms/inputs`, `/dock/overview`, `/feedback/notification`), BOTH modes. `chipOverMain` = the band-agnostic `<main>`-box intersection (subsumes `overlapsH1` AND `chipOverField`).

| frame | anchorY (seam) | chips bbox | chipOverMain | overlapsH1 | seam-line x-extent | mode/vp |
|---|---|---|---|---|---|---|
| **BEFORE (§6 W-CHIP-GRAZE state)** | **545 (utility seam — the abandonment)** | x=[23,59] / y=[547,637] | false | false | x→110 (pokes ~28px into `<main>`, mainL=82) | light·1100 |
| **AFTER (the ℱ-anchor restore + lower-gutter fan)** | **78 (ℱ-home divider — RESTORED; `--dock-rail-seam-offset: 62px`, anchorCount=1)** | x=[23,59] / y=[558,648] | **false** | false | x=[5,77] (protrudes BOTH dock edges, stays within the 82px aside) | light·1100 |
| **AFTER** | 78 | x=[23,59] / y=[558,648] | **false** | false | x=[5,77] | dark·1100 |
| **AFTER** | 78 | x=[23,59] / y=[558,648] (3-chip) · y=[590,648] (2-chip) | **false** | false | — | light·1280 |
| **AFTER** | 78 | x=[23,59] | **false** | false | — | dark·1280 |

Verified on ALL THREE routes (`/forms/inputs` = 3 chips, `/dock/overview` + `/feedback/notification` = 2 chips), BOTH viewports, BOTH modes: **chipOverMain:false everywhere; anchorY=78 everywhere (the ℱ-home seam); fHomeY=45 (the wordmark glyph center, the separator just below it).**

**The non-regress witnesses (the redress did not trade back):**
- **`overlapsH1:false` STAYS true + is now STRUCTURALLY guaranteed** (chips x≤59 < h1 x≥114 on every route — the title fix no longer seam-Y-dependent).
- **`chipOverField:false` STAYS true** (W-CHIP-GRAZE's close is preserved AND now holds at the ℱ-anchor — the chips are at x≤59, well left of the `.input-pill` at x≥144).
- The chips stay RENDERED + REACHABLE (icon + the existing `title` tooltip; never `display:none`'d — the gate's "hide-it-to-green-it" evasion barred). The active-facet highlight still tracks.
- The seam LINE overruns BOTH dock edges (x=[5,77]: dock x=[12,70], left 12→5, right 70→77 — the dual-side overrun R-arm preserved) yet stays WITHIN the aside (x2=77 < mainL=82, clear of `<main>` — the prior +28px poke gone). The cap is demo-shell-local; the library `--dock-rail-extend-length` is untouched.
- NO midline `inset-block-start: 50%` SLOT seat (gone in BOTH the library AND the demo override); the seam stays a REAL measured `--dock-rail-seam-offset`.

Captures: `dock-seat-final-before-inputs-{light,dark}.png` · `dock-seat-final-before-overview-light.png` · `dock-seat-final-after-inputs-{light,dark}.png` · `dock-seat-final-after-overview-light.png` (this directory).

## The R-arms stay GREEN (the no-regress floor)

| gate | exit | witness |
|---|---|---|
| `proof:dock-sections` | 0 | S1-S5 OK + **S6 ℱ-anchor + fan clear of main**: anchorSep=true dropsUtility=true isHome=true gutterFan=true lowerSeat=true noMidline=true OK |
| `proof:rail3` | 0 | R6 ≥2 live SHELL consumers: sidebar=true bottom=true OK (the SidebarDock keeps its `<DockRail>`) |
| `proof:rail-extend` | 0 | R6 shell-mount witness: shell=SidebarDock.vue mounted=true OK; box-inviolate + dual-overrun untouched (library byte-untouched) |
| `proof:dock-plate-clearance` | 0 | W3 contain:paint audit verdict(a)=true OK |
| `proof:dock-unify` | 0 | F-census + CLAUDE.md records OK |
| `proof:gate-script-parity` | 0 | NEW dangling refs 0; no new gate id (S6 in-place on proof:dock-sections) |
| `proof:ba-gestalt` | 1 (RUNS) | dock+shell read the honest REVOKED FAIL — operative RED is CORRECT mid-tranche (`["release"]`, not ci); W-REFLECT3 flips it |

## S6 — the born-RED gate clause (extend-in-place on proof:dock-sections, NO new gate id)

`scripts/proof-dock-sections.mjs` extended-in-place with the S6 SOURCE witnesses (device-free CI half — `proof:dock-sections` is `["local","ci","release"]`):
- **S6a** — the ℱ-anchor RESTORED: SidebarDock marks `<DockSeparator :anchor>` (the ℱ-home divider, in the `#persistent` region BEFORE the `<DockSection>` default slot), `anchor-id="utility"` is GONE. The POSITIVE bite: the anchored separator is the ℱ-home/leading divider, not merely "not utility" — a third arbitrary separator (buried in the section) still REDs.
- **S6b** — the desktop fan does NOT reach into `<main>`: the demo `dock-nav.css` scopes a `.demo-sidebar-rail` lower-gutter column (capped at `--demo-nav-rail-w`, seated via `inset-block-end` at the slot bottom), no rightward 60vw-into-`<main>` reach.
- **S6c** — the box-inviolate + dual-overrun R-arms hold (the library rail-extend.css byte-untouched; the dual-overrun witness survives).
- **S6d** — no midline regress (`inset-block-start: 50%` SLOT seat absent in both the library AND the demo override) + no verbatim abandonment (the anchor is the ℱ divider, not a dodge seam).

Born-RED demonstrated by `tests/scripts/dock-sections-seat-final.detect.test.ts` (4 self-test bites: the post-wave shape PASSES; the pre-wave shape — `anchor-id="utility"` + the seam-top fan — REDs S6a/S6b; a third-arbitrary-separator anchor REDs S6a's positive bite; a re-introduced midline SLOT seat REDs S6d).

## W-REFLECT3 obligation (Batch 7 — the close re-earn)

W-REFLECT3 re-walks `dock` + `shell` whole-page in BOTH viewports × modes over the real W-DARK-MATERIAL backdrop, re-stamps each record's surface-hash to the post-redress source, records the fresh content+dimension+freshness-verified `chipOverMain:false` + anchor-at-ℱ at the narrow-desktop breakpoint, and flips the roster `dock`+`shell` rows FAIL→PASS — the only authorized verdict-flip. The §5 binding close (`proof:ba-gestalt` 8/8 under `--strict-freshness`) is unmeetable on `dock`+`shell` until that re-earn.
