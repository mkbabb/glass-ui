# BI.W-DOCK-OVERFLOW — native scroll + scrollIntoView + the fisheye-iff-fits enhancement

Band B3 (dock greenfield). Design: D-DOCK PASS-1 §2.5 (overflow), PASS-4B ruling 1 (fisheye and scroll are
exclusive MODES, never composed — fisheye iff the row FITS), G4/G9 CLOSED with measured WebKit evidence.
Lands ON the W-DOCK-SPINE L1 control run + W-DOCK-CONTROLS' `useSelectionGroup` (which fires the recenter).

## §Mandate

Discharges: **UF-C8** ("ux: when you click on an element in a scrolled dock, it should properly scroll you to
see more of what's to the left or right … how many elements remain and are hidden" — ss-16: clipped labels
both ends, no scroll-into-view). Registry: FAM-3 (scroll-into-view unbuilt; no `scrollIntoView` call exists
anywhere in the module); the `overflow-clip-margin` band-aids (`overflow.css:55-60`, `shell.css:294`); G9
indicator↔scroll coupling.

## §Design

**The facility is native scroll (PASS-1 §2.5).** A DISTINCT inner scroll track (`overflow-x: auto`), edge
legibility via `<FadingScroll>`'s dual-path mask (never a clip that eats hover — hover lift is scale/Z toward
the viewer), cross axis honestly `visible`, and **`el.scrollIntoView({inline:'nearest', block:'nearest'})`
fired on EVERY select** — this line IS the UF-C8 recenter defect, owned once in `useSelectionGroup`
(W-DOCK-CONTROLS' engine), and tabs get it for free. `scroll-padding-inline` gutters the recenter so a
selected member lands with ≥1px port slack.

**Fisheye is the exclusive-mode enhancement (PASS-4B ruling 1 — the composition break, decided).** Fisheye
engages **iff the row FITS (N ≤ fit)**; a scrollable row (N > fit) runs native scroll + FadingScroll +
scrollIntoView with **fisheye OFF**. They are NOT composed (the pass-1 "orthogonal, on-top-of-scroll" claim
is REFUTED — the codebase's own `overflow.css:48-59` documents the `overflow-y: visible` pin as a NO-OP:
`overflow-x: auto` per CSS Overflow §3 FORCES the cross axis to clip, and the 1.6× fisheye hump (+26px
bottom-anchored overhang) is clipped ~22px past the ~10% clip-margin band). Rationale (PASS-4B ruling 1): the
codebase's own cross-axis clip trap makes the composition structurally hostile; macOS magnifies because its
dock never scrolls; KISS. REJECT DOCK-A's "compress-to-fit, never scroll" absolutism (forces the 44px breach
on touch) AND any layout-based fisheye (compresses neighbors → breach).

**The fisheye mechanism (G4 CLOSED — 60fps on WebKit at 15 items, 0.058ms/write).** One rAF-coalesced
pointermove writes `--dock-px`; each item scales by a pure-CSS Gaussian `calc(1 + var(--amp) * exp(-pow(
var(--d),2) / (2*pow(var(--sigma),2))))` (`exp()`/`pow()` Baseline 2026-06, Safari 15.4+), `transition:
--dock-px 80ms linear` easing the hump. **Hit boxes stay at base geometry** (scale is visual/transform-only,
so the fisheye can NEVER breach the 44px floor); `hover: none` → flat; PRM → off.

**The indicator↔scroll coupling (G9 CLOSED — content-coordinate indicator).** The ONE traveling indicator
(W-DOCK-CONTROLS' `useSelectionIndicator`) tracks a SCROLLED member's center in CONTENT coordinates — it
travels WITH scroll needing **ZERO scroll listener** (1 RO total, +1 measure/select), lands center-accurate
(0.07–0.37px) with ≥1px port slack once `scroll-padding-inline` gutters the recenter. NO second measure loop
fights the RO. **G9 = the indicator is a scroll CHILD** (inside the scroll port), not an ancestor-positioned
overlay that clips at port ends.

## §Work

- Mint `src/styles/dock/fisheye.css` (iff P4 ships): the `--dock-px` Gaussian `scale` on the fine-pointer
  fits-branch, `transition: --dock-px 80ms linear`, `hover:none`→flat, PRM→off. The rAF-coalesced pointermove
  `--dock-px` writer.
- `src/styles/dock/overflow.css` (20K) — collapse to the native-scroll track: `overflow-x: auto` on the
  scroll port, cross axis honestly `visible`, `<FadingScroll>` edge mask, `scroll-padding-inline` gutter. The
  `overflow-clip-margin` band-aids (`:55-60`) + the `overflow-y: visible` NO-OP pin DEFINITION-ABSENT (the
  clip-era shell retires in W-DOCK-RETIRES).
- The `el.scrollIntoView({inline:'nearest', block:'nearest'})`-on-select CALL lives in W-DOCK-CONTROLS'
  `useSelectionGroup`; this wave owns the FACILITY (the native scroll track + the recenter UX + the
  `scroll-padding-inline` gutter + the indicator-as-scroll-child structure).
- The fits-vs-scrollable mode resolution (N ≤ fit → fisheye; N > fit → scroll, fisheye off) — a single
  container-query / measured branch, never a composed hybrid.
- `demo/stories/dock/*` — the scrollable dock row demo (the P4 overflow-feel reference: 15-item fisheye
  side-by-side with the native scroll track).

## §Acceptance

Gate: **`proof:dock-overflow`** (NEW, born-RED at HEAD — NO `scrollIntoView` call exists in the module; the
`overflow-clip-margin` band-aids + the NO-OP `overflow-y: visible` pin are live).
- O1 **scroll-into-view** (BORN-RED): the select path fires `scrollIntoView` (via `useSelectionGroup`); the
  scroll port has `scroll-padding-inline` → GREEN when the recenter is wired.
- O2 **native-scroll-facility** (BORN-RED): the overflow port is `overflow-x: auto` + `<FadingScroll>`; ZERO
  `overflow-clip-margin` band-aid + ZERO clip on the interactive run survive → GREEN.
- O3 **fisheye-iff-fits**: fisheye engages ONLY on the fits-branch (N ≤ fit); a scrollable row carries NO
  `--dock-px` scale (the exclusive-mode ruling — never composed).
- O4 **fisheye-hit-box-invariant**: the fisheye is transform/scale-only; the hit box holds base geometry
  ≥44px (can never breach the touch floor); `hover:none` → flat.
- O5 **indicator-is-scroll-child** (G9): the traveling indicator is INSIDE the scroll port (a scroll child),
  no ancestor-positioned overlay clips at port ends; ZERO scroll listener (1 RO).
- Self-test bites: a synthetic fisheye-on-a-scrollable-row REDs O3; a synthetic re-added `overflow-clip-
  margin` REDs O2; a synthetic layout-property fisheye REDs O4.

## §π/DELTA

- **Select-on-a-half-off item recenters it** (UF-C8 killed): click a partly-hidden dock control → it scrolls
  center-into-view (`scrollIntoView` + `scroll-padding-inline` gutter), the indicator lands center-accurate
  with ≥1px port slack, Chrome + Safari, both modes.
- **The overflow-feel side-by-side** (P4): 15-item pure-CSS Gaussian fisheye vs the native scroll track —
  the WebKit recalc-per-frame trace ≤ budget, the hump reads buttery (not stair-step), hit boxes hold 44px,
  the touch breach yields to scroll without a jarring mode flip.
- DELTA: `docs/tranches/BI/audit/visual/W-DOCK-OVERFLOW-DELTA.md`. Rides W-DOCK-DEVICE (the visible-Metal
  15-item fisheye sweep at 60fps) + the `proof:ba-gestalt` dock verdict.

## §Obligations

- **Visible-Safari.app Metal** confirmation of the 15-item fisheye sweep at 60fps (low-risk — transform-only,
  no per-frame backdrop re-raster — but owed) → W-DOCK-DEVICE.
- The P4 ship/park verdict: if the visible-Metal fisheye sweep misses 60fps, the fisheye PARKS (native scroll
  is the universal floor that ships regardless — the honest degrade, never a masking fallback).

## §Dispositions

None terminalized here (the `overflow-clip-margin` / clip-era shell retire terminalizes in W-DOCK-RETIRES;
this wave WIRES the native-scroll replacement so the retire is clean).
