<!-- surface-paths: demo/layout/dock-nav.css -->
<!-- surface-hash: 365c5f6028f076f7708c781f28486babb54c00da328b54b4a11e420b17090f73 -->

# BB.W-CHIP-GRAZE — DELTA: the SidebarDock facet carousel re-fanned clear of the /forms/inputs field band

**Wave:** BB.W-CHIP-GRAZE · **Branch:** tranche/BB @ HEAD · **Date:** 2026-06-16 · **Mode:** SOURCE redress + the born-RED CG2 clause + the roster PASS revocation (the live `chipOverField:false` close measure is W-REFLECT3's, Batch 7)

## The miss — the P-1 close-class recurred INSIDE its own fix

W-SHELL-RAIL-RESEAT (BA) was the named successor born from W-REFLECT2's `dock`+`shell` FAIL — the desktop SidebarDock floating-carousel facet chips painting OVER the page `<h1>`. Its fix re-pointed the rail's anchor seam DOWN the column to the trailing `utility` separator (y≈529), clearing the title band, and the reflection flipped the roster `dock`+`shell` rows FAIL→PASS — **on the title-fix alone.** But the chips still fan RIGHT (`justify-content: flex-end`, the slot overruns the inline-end edge into `<main>`). Seated at y≈529 — squarely in the band where `/forms/inputs`'s FORM FIELDS live — the carousel GRAZES the input affordance. shell.md §5 ITSELF admitted this ("the chips graze the LEFT EDGE of an Email field ... fully recoverable") and ACCEPTED it — the P-1 lie: a per-mechanism (title) green over a still-broken gestalt (the chip-over-field relationship), recurring INSIDE the wave that named the P-1 fix as its charge.

## CG1 — the title-fix PASS is REVOKED (the roster re-anchor)

`docs/tranches/BA/audit/reflect/ba-gestalt-roster.md` `dock` + `shell` rows re-anchored **PASS → FAIL** with the field-graze ground-anchor. A PASS→FAIL revocation is the honest re-statement of an open defect, NOT a verdict flip — flipping FAIL→PASS stays W-REFLECT3's (Batch 7) sole authority (the single authorized verdict-flipper, preserved from BA). The dock.md / shell.md records gained a §field-graze measure + the revocation note.

## CG2 — the chipOverField:false witness (the born-RED gate clause)

`scripts/proof-ba-gestalt.mjs` extended-in-place (on W-GESTALT-GATE2's hardened gate — same id, no new gate id, no schema change): a new CG2 clause requires the `dock` + `shell` surface records to carry a MEASURED `chipOverField:false` witness at the narrow-desktop breakpoint over a FRESH source. Born-RED at HEAD: the witness is absent (the records carry the `chipOverField:true` HEAD evidence + the redress note, not the fresh close witness) AND honored only when the surface is FRESH (the redress drifted the dock surface-hash; W-REFLECT3 re-captures + re-stamps in lockstep). The clause runs only on the `dock`+`shell` surfaces; it is `["release"]`-tagged (NOT ci) so it never blocks mid-tranche CI. Two self-test bites ride every run (witnessed-but-stale rejected; the `:true` HEAD evidence does not satisfy the `:false` close).

## The field-graze measure — the binding evidence the title-only DELTA masked

Live `:5174` (the dev server's port; 5173/5199 were in use), viewport **1100×900** (the narrow-desktop breakpoint), `/forms/inputs`. The bbox-intersection of the desktop SidebarDock `.dock-hairline-extend-chip` set vs the first `.input-pill` form field:

| frame | chips bbox | field bbox | chipOverField | chip → `<main>` (x≥83) | overlapsH1 | mode |
|---|---|---|---|---|---|---|
| **BEFORE (HEAD)** | x=[73,329] / y=[532,558] | x=[144,528] / y=[520,560] | **true** | reaches x=329 (into `<main>`) | false | light |
| **AFTER (redress)** | x=[24,60] / y=[547,637] | x=[144,528] / y=[520,560] | **false** | max x=60 (within the 83px aside) | false | light |
| **AFTER (redress)** | x=[24,60] / y=[547,637] | — | **false** | max x=60 | false | dark |

Verified ALSO at viewport 1280×900 (chips stay x=[24,60], `chipOverField:false`, `anyChipIntoMain:false` — the chip column is anchored to the dock-center in the fixed-width aside, independent of viewport width across the breakpoint range).

**Non-regress witnesses (the redress did not trade back):**
- `overlapsH1:false` STAYS true (h1 at y=[58,98], no chip intersection — the title fix preserved).
- The 3 chips stay RENDERED + REACHABLE (icon + the existing `title` tooltip; never `display:none`'d — the gate's "hide-it-to-green-it" evasion barred). The active-facet highlight (`.is-active`) still tracks.
- The seam stays the REAL measured `--dock-rail-seam-offset` (529px) — NEVER the forbidden `inset-block-start: 50%` midline workaround #4.
- The `/dock/rail` story `<DockRail>` + the BottomDock are UNTOUCHED (the override is scoped to `.demo-sidebar-rail`): the story rail keeps `flex-direction: row` + visible labels + horizontal fan, the floating-carousel facility intact for the census.

Captures: `chip-graze-before-light-desktop.png` · `chip-graze-after-light-desktop.png` · `chip-graze-after-dark-desktop.png` (this directory).

## The direction decision — (b), the recorded de-risk (direction (a) cannot hold the census)

The spec recommended direction (a) (render the desktop facets via the in-pane switcher, keep the floating carousel on BottomDock + the story only). **Direction (a) cannot hold the R-arms:**
- `proof:rail3` **R6** binds BOTH shell docks to mount a live `<DockRail>` (`sidebarMountsRail = /<DockRail\b/.test(sidebar)`). Removing `<DockRail>` from the SidebarDock REDs R6 — the census does NOT count the `/dock/rail` story, so "BottomDock + the story" cannot carry it.
- `proof:rail3` **R1** forbids re-mounting an in-dock `<DockLayerGroup>` switcher (the box-inflation deletion source) — which is exactly what an in-pane facet switcher requires.

So the spec's documented scope-reveal applies (Triumvirate Dispatch / Named-successor #2): **hold the census INSIDE the wave → direction (b).** Keep the floating carousel on the SidebarDock (R6 + R1 hold, the box INVIOLATE); re-fan its reach so the chips fan DOWN the rail's own gutter (a vertical icon column centered on the dock) instead of RIGHT into `<main>`. The fix is **demo-shell-local CSS** (`demo/layout/dock-nav.css`, scoped `.demo-sidebar-rail`); the library `src/styles/dock/rail-extend.css` is **byte-untouched**, so the box-equality + escape-architecture + ≥2-consumer R-arms all survive by construction.

## CG3 — the R-arms stay GREEN (the no-regress floor)

| gate | exit | witness |
|---|---|---|
| `proof:rail3` | 0 | R6 ≥2 live SHELL consumers: sidebar=true bottom=true OK |
| `proof:rail-extend` | 0 | R6 shell-mount witness: shell=SidebarDock.vue mounted=true OK |
| `proof:dock-sections` | 0 | S2 no midline seat; S5 FadingScroll no dup fade OK |
| `proof:dock-plate-clearance` | 0 | W3 contain:paint audit verdict(a)=true OK |
| `proof:dock-unify` | 0 | F5 CLAUDE.md records the contract: YES |
| `proof:ba-gestalt` | 1 | RUNS; CG2 dock=witnessed-stale shell=witnessed-stale (born-RED — the operative FAIL is correct mid-tranche; `["release"]`, not ci) |
| `proof:gate-script-parity` | 0 | NEW dangling refs 0; no new gate id |

## Files

- `demo/layout/dock-nav.css` — the desktop SidebarDock field-clearance re-fan (direction (b); the ONLY source edit).
- `scripts/proof-ba-gestalt.mjs` — the born-RED CG2 chipOverField clause (extend-in-place; + 2 self-test bites).
- `docs/tranches/BA/audit/reflect/ba-gestalt-roster.md` — the dock+shell PASS→FAIL revocation (CG1).
- `docs/tranches/BA/audit/reflect/{dock,shell}.md` — the §field-graze measure + the revocation note.

## W-REFLECT3 obligation (Batch 7 — the close re-earn)

W-REFLECT3 re-walks `dock` + `shell` whole-page in BOTH viewports × modes over the real W-DARK-MATERIAL backdrop, re-stamps each record's surface-hash to the post-redress source, records the fresh content+dimension+freshness-verified `chipOverField:false` at the narrow-desktop breakpoint, and flips the roster `dock`+`shell` rows FAIL→PASS — the only authorized verdict-flip. The §5 binding close (`proof:ba-gestalt` 8/8 under `--strict-freshness`) is unmeetable on `dock`+`shell` until that re-earn.
