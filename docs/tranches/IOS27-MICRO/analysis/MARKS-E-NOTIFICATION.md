# MARKS-E — the notification still (the corner-perched X, measured + the vaporize brief)

Seat: S1-NOTIFICATION, model claude-fable-5 (read verbatim from this seat's system context).
Source: `Screenshot 2026-07-18 at 15.05.34.png` — a macOS 27 AirDrop-Complete notification over
a dark terminal, ONE still (no ffmpeg ladder; the vaporize half of this doc is a design brief
grounded in the on-disk corpus, not a timeline). Frame dir + scripts:
`scratchpad/exemplars2/S1-NOTIFICATION/` (README stamps the contract).

**The pixel contract**: 762×306 image px @2x → 381×153 display pt; 1pt = 2px. All px below are
IMAGE px, origin top-left. Sub-pixel edges via gradient-magnitude centroid (±0.3px); the same
two-coordinate discipline as MARKS PASS-2 (no 12fps aliasing risk here — a still — but the
occlusion honesty problem is this doc's equivalent: the chip HIDES the corner apex it sits on,
so the corner model is bounded, never over-fitted).

## 1. The scene, measured

| element | geometry (image px) | display pt |
|---|---|---|
| card top edge (straight run) | y = 26.21 (flat x≈118→671, ±0.03) | 13.1 |
| card left edge (straight run) | x = 58.28 (flat y≈84→190) | 29.1 |
| card right edge | x = 671.4 (two rows agree ±0.15) | 335.7 |
| card bottom edge | y ≈ 244.7 (ONE clean column — BOUNDED) | ≈122.4 |
| card size | ≈613 × 218.5 | ≈306.6 × 109.2 |
| X chip outer circle | center (65.5, 37.5), r = 20.0 ±0.5 | c (32.75, 18.75), r 10.0 |
| X glyph box | 14×14 (x 59..72, y 32..45), stroke ≈3.1 | 7×7, stroke ≈1.5 |
| stacked 2nd card peek | x ≈ 712..745, own hairline rim | ≈16.5pt sliver |

Luminance ladder (mean lum, clean patches): desktop 33.7 → card container fill 36.8 → chip
fill 49 → chip hairline ring 55-63 (width ~1-1.5px) → glyph strokes 162. The chip is uniformly
49 over BOTH backdrops it straddles (desktop 33.7 / card 36.8) — at a Δ3 backdrop separation
translucency cannot be resolved: chip translucency INCONCLUSIVE (reads as opaque-ish control
glass). No cast shadow: the desktop annulus r21-24 around the chip reads 33.2 vs ambient 33.7 —
separation is entirely rim-borne (hairline ring + fill delta), zero shadow machinery.

The card's own hairline rim emerges from BEHIND the chip on both sides (zoom-tight-8x.png):
the chip occludes the card rim and carries its own unbroken ring — it is a separate body
astride the boundary, not a notch or a mask cut. This is the D-LENS/V-PERCH architecture
photographed: chrome that escapes the plate clip as its own layer.

## 2. The corner, fitted — and the overlap fraction

**MEASURED — the corner is a continuous curve, not a circular arc.** The top edge deviates
from straight by 2.23px at x=86 decaying smoothly to 0 by x≈116-118 (a ~30px tangent
run-out); the left edge mirrors it (1.34px at y=58 → flat by y≈80-84; run-outs symmetric
within ~10%). A circular corner fit (n=2) bottoms at RMS 0.293px; superellipse fits reach
0.083px — the circle is rejected at ×3.5 the residual. The long soft run-out is the
continuous-corner signature.

**BOUNDED — (n, R) is degenerate from one occluded still.** The chip hides the corner apex
(disc spans x 45.5..85.5, y 17.5..57.5; the arc proper lives under it), so only the tangent
tails constrain the fit and exponent trades off against radius along a ridge: the ≤1.15×-RMS
band spans n 4-6 with R 68-95px (grid to 120), and n=3/R=55.5 sits just outside it (RMS
0.147). Honest statement: **continuous corner, exponent n ≥ 3, effective border-radius
R ≈ 28-48pt** — no tighter claim is defensible. Note for our tokens: our squircle axis
`--corner-k-squircle: 2` (n=4) and `--corner-k-sharp: 2.4` (n=4.8) both sit INSIDE the fitted
exponent band; the measured surface is the sheet/dock-card radius class (≥ `--radius-3xl`),
nowhere near the 16px card rung.

**MEASURED — the overlap fraction is robust across the whole model family.** Integrating the
r=20px disc against every (n, R) in the 1.15× band plus the rejected circular model:

| model | disc fraction OUTSIDE the card |
|---|---|
| best superellipse (band n 4-6, R 68-95px) | 62.5-64.7% |
| n=3, R=55.5 | 66.0% (±0.1 over r 19.5-20.5) |
| circular R=43 (rejected, bounding) | 69.3% |

**The verdict: ~two-thirds of the chip rides outside the card — 62-69% under every admissible
corner model.** The charter's "partially outside" is measured at 2/3 : 1/3.

**MEASURED — the seat point is the corner-curve APEX, not the box corner.** The chip center
sits (7.22, 11.29)px inside the box-corner point — 13.4px (6.7pt) away from it — and evaluates
to |Δx/R|ⁿ+|Δy/R|ⁿ ≈ 1.10-1.16 against every band model: **+3-5px (~1.6-2.5pt) OUTSIDE the
border curve, along the corner ray**. Against each model's 45° apex point the center lands at
apex HEIGHT (Δy < 1px) with a ~3.4-4.2px outward bias along the top-leading-left direction
(±2px tolerance — real but small, BOUNDED). Design reading: the chip center is seated ON the
corner-curve apex, nudged a hair outward; the corner's convexity is what buys the
mostly-outside read (center-on-border at a convex apex is automatically >50% outside).

## 3. The seat law — corrections to V-PERCH (roster card 6)

Two corrections to the card, both measured:

1. ~~"perched astride the corner border, HALF outside"~~ → **two-thirds outside (62-69%)**,
   center +1.6-2.5pt beyond the border curve.
2. ~~"static position at the corner point (`translate(-50%,-50%)` on the border
   intersection)"~~ → the box-corner intersection is the WRONG anchor by 6.7pt. The seat is
   the **corner-curve apex**: for a corner of radius R and superellipse exponent n (n = 2k in
   our `--corner-k` vocabulary), the apex offset from the box corner is
   `R·(1 − 2^(−1/n))` along each axis — 0.159R at n=4, 0.293R at n=2 (round). Seat =
   `translate(-50%,-50%)` at that point. This derives from tokens we already own: resolve R
   through the concentric relay (`--radius-ctx` − `--radius-inset`, Law-1 grammar) and n from
   the surface's `--corner-shape-*` alias — the perch point becomes a DERIVED geometry, one
   calc(), shape-aware on Chrome and honestly round-seated (0.293R) on engines without
   `corner-shape`. No magic numbers, no per-surface hand placement.

What survives of the card intact: the chrome-outside-clip architecture (photographed here —
§1), the engage envelope, the V-VAPOR handoff. What the still adds: the chip's material
recipe (control-tier fill ≈ +12-15 lum over container, unbroken hairline ring, NO shadow, glyph
at 35% of chip diameter with ~1.5pt stroke) and the 20pt visual diameter — which is BELOW
comfortable hit size; our register pads an invisible hit area to ≥44px CSS and keeps the 20pt
optic. Whether macOS shows this chip idle or hover-only cannot be read from one still —
INCONCLUSIVE; our breath-of-life register decides for itself (idle-parked → hover
charge-bloom → press rim-flare → commit vaporize).

**Codex law crosswalk:** law 3 CONFIRMED (rim-borne separation, negligible shadow — the
14.38.58 search-capsule clause, now attested on a second surface class); law 4 REFINED (the
radius role grammar gains the apex-seat formula; the chip itself is circle=single-tap-target,
consistent); the MARKS §4 two-tier rule CONFIRMED with numbers (container 36.8 vs control 49);
law 18's overlay grammar is the iOS BANNER exit (corner-tuck) — the macOS 27 notification exit
is a DIFFERENT member of the same exit family (vaporize), which is the brief below.

## 4. The vaporize/dissolve register — the design brief (V-VAPOR, re-grounded)

The user's order: the iOS27/macOS27 notification vaporizing dismissal is "quite good —
re-deploy in our own facilities." The effect itself is not capturable from a still; this brief
unions the still's contribution (the perch geometry that TRIGGERS it) with every prior
on-disk sighting: roster card 4 + the built `v-vapor` prototype (3-layer static-mask erosion,
PROBE-NOTES verified — masks are warm cream, R>B per texel, decoded not asserted), MARKS §5/C6
(the close order + the empty-medium beat, twice-sampled), MARKS-D b60-dismiss (text killed
first, ≤1 frame at 60fps), codex laws 5/8/15/17, and the two standing defects the critiques
filed against the prototype: CRIT-DESIGN m1 (fired content channel 433ms — 2.5× the corpus
exit register) and CRIT-MECH M2 (the close-order "beat" was −30ms — an overlap, not a beat).

### The register

1. **Trigger organ.** The perch chip (§3) is the vaporize's origin: press-charge on the chip
   (engage envelope, one-beat rim light — the R-EFFERVESCE register), commit hands off via the
   existing `vapor-handoff` seam. The composed PERCH→VAPOR organ exists nowhere yet
   (CRIT-MECH scope note 9) — this brief is its integration spec.
2. **The erosion ladder.** Exactly 3 layers, only during dismissal: the body under a shallow
   fine grain + two cream ghost layers under coarse/mid static noise masks (build-time
   data-URI PNGs at three densities; mask GEOMETRY never animates — mask motion repaints,
   banned). The read must be EROSION through frost, never two soft ghosts crossfading.
3. **The clocks** (the m1 + M2 cures, made canonical):
   - under gesture: dissolve fraction = the drag scalar, scrub-mapped, catchable and
     reversible before commit (C¹ at the catch — the finger owns velocity);
   - on commit: text dies FIRST (≤50ms, the MARKS-D precedent) → body erosion **170-250ms**
     (the corpus exit register; never 433ms) → a GENUINELY POSITIVE beat of pure contentless
     medium (**80-140ms**, the MARKS §5 signature moment, order verified by sign not
     positivity) → the medium relaxes last, **300-400ms decelerating**. Exit never mirrors
     entry (law 8's asymmetry).
4. **Directionality = breath.** The vapor pulls TOWARD the perch corner: ghost translate
   vectors run from card center toward the chip's seat (~12-20pt total, ease-out), and the
   chip itself vaporizes FIRST, with the first ghost — the control that caused the death goes
   first. Direction comes from layer TRANSFORMS only, never from mask motion.
5. **Glass dies as material, not as opacity.** No backdrop-filter radius animates: the body's
   glass thins via its own masked opacity; the medium (scrim/blur layer) relaxes on its own
   clock. Fixed blur radii, moving layer opacities — works in paint or fails loud, no masking
   fallback, no Chrome-special behavior (EXEMPLARS-2 order 2).
6. **Physics vocabulary.** Commit inherits gesture velocity as an erosion-rate seed (clamped);
   there is no landing, so nothing overshoots — consistent with the C2 lesson that overshoot
   is velocity-bought, never intrinsic.
7. **Our identity** (the standing law): warm cream vapor on the dark arm / muted-black grain
   on the light arm — never white noise; rim work inside the 0.10-0.22 hairline band (the m5
   drift is not repeated); frosted-blurred glass throughout, specular spent ONLY at the
   press-charge and the one commit flare. iOS's vaporize is fire-and-forget and colorless;
   ours is scrubbed, directional, warm, and owned by the chip that triggered it.
8. **Honesty + a11y.** PRM: single-step removal, state relayed (law 17). The ONE queued paint
   risk carried forward: WebKit compositing backdrop-filter under a tiled alpha mask
   (prototype probe note 3) — video-path judged before any adoption language; the 96/64px mask
   tiling repeat is likewise paint-judged (probe note: cure = larger single tiles, still
   static).

### Performance card

Compositor-only channels (opacity + transform); 3 extra layers exist only between commit and
removal; zero runtime `feTurbulence`/SVG filters; zero per-frame layout reads; masks static;
promoted for the dismissal's duration only; rAF parked outside dismissal (the R3b budget).

## 5. Mark verdicts (one line each)

- **S1-PERCH-SEAT** → X chip r=10pt, center seated ON the corner-curve apex (+1.6-2.5pt
  outside the border), 62-69% of area outside, robust across every admissible corner model →
  V-PERCH card 6 corrected (apex-seat formula `R·(1−2^(−1/n))` off the concentric relay;
  two-thirds not half); codex law 4 refined.
- **S1-PERCH-MATERIAL** → chip = control-tier glass (+12-15 lum over container), unbroken
  0.5-0.75pt hairline ring, ZERO cast shadow, glyph 7pt/35% of chip → law 3 + the two-tier
  rule CONFIRMED with numbers; our register: warm-cream chip, ≥44px invisible hit pad,
  engagement ladder idle→hover→press→commit.
- **S1-CORNER** → the notification corner is continuous (circle rejected ×3.5 RMS), n ≥ 3
  with R ≈ 28-48pt (BOUNDED — apex occluded by the chip, (n,R) degenerate) → our
  `--corner-k-squircle`(n=4)/`--corner-k-sharp`(n=4.8) sit inside the measured exponent band.
- **S1-VAPOR** → design brief written (§4): perch-triggered 3-layer static-noise erosion,
  scrub-mapped + catchable, text ≤50ms → body 170-250ms → positive 80-140ms empty-medium
  beat → medium 300-400ms, direction-by-transform toward the perch, warm grain, compositor
  only → cures CRIT m1 + M2 by construction; the PERCH→VAPOR composed organ's integration
  spec.

## Honesty line

One still, sub-pixel measured, occlusion declared: every corner-model number is bracketed, the
(n,R) ridge is reported instead of a point claim, and nothing about motion (hover reveal,
dismissal timing, translucency) is asserted from this frame — motion claims in §4 carry their
on-disk citations (MARKS §5/C6, MARKS-D b60-dismiss, the prototype probe notes) or are marked
as design decisions, not observations. Scripts + zoom crops + the README contract sit in the
seat dir for re-derivation.
