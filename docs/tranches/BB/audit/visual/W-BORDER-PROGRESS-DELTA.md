# W-BORDER-PROGRESS — DELTA (progress IS the element's border: the masked-conic ring)

## Freshness header

| field | value |
|---|---|
| Capture date | 2026-06-17 |
| HEAD sha (born-RED baseline) | `9b181790` |
| Gate | `proof:border-progress` (born-RED → GREEN; 22 violations at HEAD-state → 0 at close) |
| Binding π | `tests-visual/border-progress.spec.ts` (the radius-following ring / backdrop-intact interior / no-trough spectrum / bottom-edge coverage / 10-14px envelope, BOTH modes — rides W-REFLECT3 for the live capture) |
| Host route | `/substrates/aurora` (a busy live-GL backdrop — the backdrop-intact readback reads THROUGH a real substrate) |
| Viewports | mobile `390×844` · desktop `1280×800` |
| Modes | light + dark |
| Envelope | `--border-progress-width` default `12px`, locked to `[10, 14]px` (the AMENDED A1 thicker band — NOT the 6-8px hairline) |

## The gap (precise — the structural miss)

The library has THREE progress variants (`Progress.vue` dispatches
`ProgressDefault`/`ProgressGradient`/`ProgressSectioned`) and NONE is a border — every
one is a horizontal track-and-fill RECT, the floating-bar register the user is
rejecting (C2). speedtest paints progress as a detached `<GlassTimeline variant="continuous">`
child (`PhaseTimeline.vue`), not the card's own edge. The ask (speedtest AW v2.1
ask-brief §P0.1, the user verbatim): _"the bottom progressbar should serve as a
thicker, dynamic BORDER of the card… INTEGRATED into the border of the element and
thicker… a spectrum of our colors."_ The miss is structural: NO primitive where the
progress IS the chrome.

## The fix — the masked-conic border ring (the gestalt, not a workaround)

| axis | before (the floating-bar register being retired) | after (`<BorderProgress>`) |
|---|---|---|
| where the progress lives | a detached `<GlassTimeline>` RECT child bolted to a card edge | the element's BORDER band — a `conic-gradient` mask-composited into the border (`mask: …padding-box, …border-box; mask-composite: exclude`) that FOLLOWS `border-radius` |
| corner geometry | n/a (a rect bar) | round, radius-following (a `border-image` would SQUARE the corners — measured inferior, FORBIDDEN; `proof:border-progress` W1 reds it) |
| allocation | a child re-introduces relayout | allocation-free — paints in the existing border box; the content box is untouched (no reflow) |
| backdrop | the bar occludes nothing but is a separate surface | backdrop-intact — the ring is a border-band cut-out, so the glass interior still transmits the substrate THROUGH the content box (AX.W54 glass-first identity) |
| interpolation | width churn per frame | `@property --border-progress-fill <percentage>` (`property-regs.css §18`, `inherits: false`) drives the conic sweep so the fill INTERPOLATES (compositor-only; `proof:no-layout-animation` holds — no layout property animates) |
| color | a flat phase tint | the brand spectrum walked OKLCH/shorter-hue (no chroma trough — the OKLab grey midpoint avoided) via the EXISTING `/color` leaf (`cssToOklch`/`oklchStopToHex` + value.js `interpolateHue("shorter")`) — ZERO re-rolled color math (`proof:single-color-core` holds) |
| coverage | n/a | `full-ring` (default, perimeter) \| `bottom-edge` (the literal C2 case) — ONE conic-mask mechanism, a coverage-scoped mask region (NOT a second recipe) |
| milestone | n/a | a phase-edge `milestone` emit + a PRM-gated `data-milestone` pulse (the consumer owns the phase colors — presets-in-consumers, the chassis `--phase-color` cascade precedent) |
| thickness | n/a | 10-14px envelope (`--border-progress-width` default 12px) — the "thicker, dynamic BORDER" register |

## The CONSUME (the consume-and-delete interim)

The brand-spectrum fill's OKLCH/shorter-hue interpolation composes the EXISTING `/color`
leaf — `useBorderSpectrum.ts` imports `cssToOklch`/`oklchStopToHex` + value.js
`interpolateHue("shorter")`, re-implements ZERO color math. The
`// CONSUME(value.js 0.13.0 oklchSpectrum):` marker books the re-point onto value.js
0.13.0's named `oklchSpectrum`/`sampleColorRamp` helper (W-PEER-SPINE / W-ADOPT-RECONCILE).
The default spectrum is the LIBRARY `--section-color-*`/`--viz-*` ramp; a consumer
passes its OWN phase palette as the `stops` prop (presets-in-consumers — the speedtest
`#5B8DEF→#9B59B6→#CC2233→#E09030` set stays in speedtest, NEVER a library token).

## The π readback (W6 a-e — the binding visual truth)

- (a) **radius-following** — the ring layer's resolved `border-radius` is non-zero
  (round corners, not squared); `mask-composite: exclude` resolves the border-band
  cut-out; the `conic-gradient` background resolves.
- (b) **backdrop-intact** — the `.border-progress__content` (a glass-card) resolves a
  translucent/transparent background (α < 0.96), so the aurora reads THROUGH; the ring
  does NOT occlude the interior.
- (c) **no chroma trough** — a chroma scan of the conic at sampled angles shows no grey
  midpoint (the shorter-hue arc stays saturated).
- (d) **bottom-edge** — `coverage="bottom-edge"` resolves the scoped mask (≥2 mask
  gradient layers — the shared cut-out + the bottom-band scope).
- (e) **envelope** — the resolved ring `border-top-width` ∈ [10, 14]px.

Captured to `W-BORDER-PROGRESS-full-{light,dark}.png` + `W-BORDER-PROGRESS-bottom-edge.png`
(rides W-REFLECT3 for the live-GPU capture; the device-free `proof:border-progress`
source half is GREEN at close).

## The `proof:ba-gestalt` verdict (BA inv-4)

The owning surface (the results-card / dock band where the ring lives) joins the
gestalt roster; the whole-page capture is judged "does the progress read as the
element's LIVING border — integrated, thick, a spectrum of our colors — not a bar
bolted on?". The verdict rides W-REFLECT3 (Batch 7) on a fresh capture; a
source-green/visually-broken gap does NOT close.

## Born-RED → GREEN log

- HEAD-state (no dir): `detectBorderProgress({})` → 22 violations (W1-W5 all red).
- At close (the source I own): W1 (masked-conic, no border-image) ✓, W2 (@property fill
  registered + read) ✓, W3 (OKLCH/shorter-hue on leaf, CONSUME marker, no re-roll) ✓,
  W4 (coverage axis + 10-14px envelope, width default 12px) ✓, W6 (self-test 7 bites
  all RED) ✓. W5 goes GREEN once the orchestrator applies the returned `apiIndexDelta`
  (the `BorderProgress*` type publication) + the `package.json` `./border-progress`
  export + `typesVersions` entry.
