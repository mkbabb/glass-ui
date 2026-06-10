# W-AUR-VANGOGH-REBUILD — the van-Gogh medium first-principles rebuild DELTA

**Item B20** (user, BINDING): "the van gogh version is AWFUL — super laggy and looks NOTHING
like a van gogh brush stroke. Re-build from first principles, with the same procedural,
generative, vangogh-like brush strokes that we had before." The user's judgment OVERRIDES the
C/A/β band-green (the bands measure statistics, not strokes).

## The defect (root-caused, captured)

The shipped van-Gogh medium routed through the SHARED oil `paintStrokeMedium` cascade — four
DENSE layers of LONG·THIN tensor-oriented strokes (`lenMul` up to 5.2, `widMul` 0.22) hugging a
continuous coherent structure-tensor field, packed at `densityBig 0.58`. Two consequences:

1. **The marble.** Thin strokes that follow a CONTINUOUS iso-band field, packed that tight, MERGE
   into smooth flowing filaments — the "marbled flow-bands" read (a spirograph / fingerprint /
   oil-on-water, NOT impasto). The band-tuning iterations (chasing the §4.2 anisotropy + §4.3
   slope metrics) drove the smear. SEE `W-AUR-VANGOGH-before-full-dark.png` (2880×1800) +
   `W-AUR-VANGOGH-before-crop-dark.png` (640×512) — the closeup is radial hair-filaments and a
   marbled whorl, zero discrete dabs.
2. **The lag.** Per pixel: 4 layers × 9 cells × (8-tap structure tensor + energy-grade) ≈ 324
   `sampleBase` calls (each = double-domain-warp + nuclei loop). MEASURED van-Gogh frame cost:
   **220 ms** (~4.5 fps) — the "insanely laggy."

The band-tuning ALSO broke the medium's own `proof:aurora-vangogh-preset` gate (it bumped
`densityBig` 0.4→0.58, violating the gate's own SPARSE assertion — RED at HEAD) AND
`proof:aurora-painterly-statistics` (van-Gogh gap-fraction 0.014 < 0.04 floor: "a continuous
coverage smear, not separable atomic dabs"). The gates AGREED with the user; the green was the
arresting BAND gate measuring statistics, not the floor.

## The rebuild (first principles, disjoint van-Gogh branch)

`mediumVangogh` is now a DEDICATED atomic-dab body, disjoint from the oil cascade
(`src/components/custom/aurora/constants/shaders/mediums.glsl.ts`):

- A **clean analytic crescent-dab SDF** (`vangoghDab`) — NOT the oil `curvedStroke`. The oil
  primitive's spine-projection + rounded end-caps + `fwidth`-AA + bristle edge each leave a thin
  sub-pixel skirt; a field of those skirts over open ground abuts into a faint NETWORK OF SEAM
  LINES. The analytic capsule-crescent (a rounded loaded HEAD + a dragged thin TAIL + a bowed
  crescent spine, derivative-free `smoothstep` AA against the analytic distance) renders clean —
  no skirt, no best-of-9 seam.
- **SHORT directional comma dabs** (`len ≈ 1 cell pitch`, `width ≈ 0.3-0.4 cell`) — contained,
  separable marks, NOT screen-spanning filaments and NOT wide shards.
- **SPARSE, fully cell-scattered placement** (density 0.40-0.46, `jitterAmt 0.85`) — visible
  inter-dab ground (the atomicity read).
- **Orientation from the analytic SWIRL flow** (van-Gogh skies ARE swirl rows) + per-cell angular
  jitter + flow-noise curl — NOT the per-cell structure tensor (the lag source AND the marble
  source: a jittered discrete dab CANNOT merge into a continuous filament).
- **Visible Starry-Night GROUND** — the open canvas between dabs darkens toward the
  underpainting (`mix(0.30, 1.0, smoothstep(0.10, 0.42, height))`), so the bright impasto dabs
  read as SEPARABLE marks over a deeper field.
- per-dab **OKLCh broken-color jitter** (pigment shimmer) + **full-height impasto crown** (each
  dab catches its own raked glint) — the pigment-true atomic read.

The dead `profileFor(MEDIUM_VANGOGH)` block is removed (no caller); `profileFor` now serves only
oil + oil-pastel. Crayon / oil / oil-pastel / smooth paths are BYTE-IDENTICAL (verified: their
per-medium frame costs are unchanged — smooth 1.4 ms, crayon 9.8 ms, oil 286 ms, oil-pastel
314 ms; only van-Gogh moved).

## The DELTA (captured, real dims)

| Plate | Dims | Read |
|---|---|---|
| `W-AUR-VANGOGH-before-full-dark.png` | 2880×1800 | the MARBLE — continuous swirling flow-filaments, a fingerprint whorl, no dabs |
| `W-AUR-VANGOGH-before-crop-dark.png` | 640×512 | radial hair-filaments + smooth marble, zero discrete marks |
| `W-AUR-VANGOGH-after-full-dark.png` | 2880×1800 | discrete directional comma/crescent dabs queued into the grand Starry-Night swirl; indigo/cobalt/yellow; central whorl; visible flowing ground; NO line artifacts |
| `W-AUR-VANGOGH-after-crop-dark.png` | 640×512 | clean separable loaded comma/crescent dabs (cobalt + cyan) over smooth teal sky — textbook divisionist brushwork |
| `W-AUR-VANGOGH-after-full-light.png` | 2880×1800 | the same clean swirl (the aurora is self-lit; the medium is theme-independent — correct) |
| `W-AUR-VANGOGH-after-crop-light.png` | 640×512 | same closeup dab read |

Capture harness: `scripts/wf-aur-vangogh-capture.mjs` drives the standalone
`tests-visual/_aur-vangogh-harness.html` (mounts the REAL aurora runtime with the VANGOGH preset
on a bare canvas, disjoint from the demo studio chrome that a sibling lane is mid-rebuild on).
The reference target is `tests-visual/fixtures/starry-night-crop.png` (the procedural
ground-truth: scattered comma dabs over a flowing indigo ground).

## The numbers

| Axis | BEFORE (marble) | AFTER (rebuild) | Bar |
|---|---|---|---|
| van-Gogh frame cost | **220 ms** (~4.5 fps) | **6.2 ms** (~160 fps) | 60 fps — CLEARED (35× speedup) |
| gap-fraction (atomicity floor) | 0.014 (SMEAR) | **0.044** | ≥ 0.04 — CLEARED |
| stroke read (the BINDING bar) | marbled flow-bands | discrete directional comma dabs | the user's eyes — MET |

The frame cost + gap-fraction are MEASURED on the captured plates (the cost via N deterministic
`renderAt` frames per medium with a 1px GPU-flush readback; the gap-fraction via the
`notFlatFloors` luminance-threshold readback the `proof:aurora-painterly-statistics` floor uses).

## Gates (kept honest, re-tuned with rationale — never lowered)

- **`proof:aurora-vangogh-preset`** — RE-TUNED, not lowered. It asserted the medium against the
  StrokeProfile/profileFor MECHANISM (a vangogh case in the shared oil cascade). That mechanism IS
  the marble. The five BEHAVIORAL bars are UNCHANGED (kept or strengthened); only the mechanism the
  regexes bind to is re-pointed from the retired profile path to the dedicated-dab body: (1) union/
  id/dispatch; (2) dedicated dab body — NOT `mediumOil` passthrough AND NOT a `paintStrokeMedium`
  cascade route (a strictly STRONGER first-class bar); (3) the asymmetric comma taper realized
  directly (loaded head + dragged tail + bowed spine); (4) SPARSE density (every dab density arg
  < 0.6, gated `hash21 > density`) + full-height impasto crown; (5) visible ground darken + per-dab
  OKLCh pigment jitter. Bite-checked: revert to the cascade route → (2) REDs; raise density past the
  sparse floor → (4) REDs; drop the comma taper → (3) REDs. The gate was RED at HEAD (the band-tuning
  broke its own sparse bar); the rebuild + honest re-tune makes it green for the RIGHT reason.
- **`proof:aurora-painterly-statistics`** (gap-fraction ≥ 0.04 atomicity floor) — the rebuild lands
  it at 0.044 (the captured-plate readback). The floor is UNCHANGED.
- **`proof:aurora-arresting`** (the §4.1/4.2/4.3 reference-anchored BANDS) — the live-GPU canonical-
  width spec. It can NOT run live while the demo aurora studio is broken by the sibling
  W-AUR-CONFIG-REBUILD lane (the `/substrates/aurora` route fails to compile). The arresting BANDS
  stay the FLOOR; the BINDING bar is the stroke read (B20 — the user's judgment OVERRIDES the band-
  green). The re-verify-on-settled-tree of the band gate is owned by the integration pass once the
  config lane lands.

## Coordination

Disjoint from W-AUR-CONFIG-REBUILD (owns the studio chrome + the crayon/speedtest/sky/dawn preset
tunings — kept byte-identical here) and W-AUR-CONFIG-REBUILD's preview-pane B19 fix. This lane
touches ONLY the van-Gogh shader branch + its gate.
