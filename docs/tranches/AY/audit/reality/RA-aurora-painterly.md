# RA-aurora-painterly — reality audit (live demo, real Metal GPU)

**Route** `/substrates/aurora` (demo live at `127.0.0.1:5199`; an earlier instance on 5183 was
retired mid-audit) · **Viewport** 1440×900 · **Driver** throwaway playwright scripts (Metal ANGLE,
the tests-visual launch-flag pattern), since cleaned up · **Captures** beside this doc,
`RA-aurora-painterly-*.png` · **Metrics** independently re-run through the repo's own
`scripts/aurora-arresting-metric.mjs` on canonical 464px downscales of my fresh captures.

**Verdict: MIXED.** The numeric DELTA claims reproduce almost exactly (honest numbers), the
van-Gogh hero is genuinely handsome at viewing distance, and the cursor-swirl interaction works.
But the strokes do NOT read as brush strokes up close (they are 1–2px aliased filament scratches
over smooth gradient washes, with visible grid-seam and nucleus-ring artifacts), the medium
SWITCHER is dead UI a real user cannot operate, and the "reference-anchored to Starry Night"
rigor story is anchored to a **synthetic mock plate**, not the painting.

---

## 1. The headline claim — "van-Gogh lands all 3 numeric bands"

**REPRODUCED, with one knife-edge.** Fresh single-frame reads off the live canvas
(hero presets, light + dark), through the repo's own harness at canonical width 464:

| Medium | C (band [55.67, 95.67]) | A (band [0.732, 0.932]) | β (band [−1.85, −1.45]) |
|---|---|---|---|
| van-Gogh light | **63.56** ✓ | **0.7246** ✗ (just under) | **−1.788** ✓ |
| van-Gogh dark | **63.53** ✓ | **0.7316** ✗ (just under) | **−1.800** ✓ |
| oil light | 73.66 ✓ | 0.3164 ✗ (residual, as recorded) | −1.480 ✓ |
| oil-pastel light | 79.73 ✓ | 0.6646 ✗ (residual, as recorded) | −2.529 ✗ (residual, as recorded) |
| reference plate | 70.67 | 0.8324 | −1.672 |

- The DELTA's per-medium triples are honest — my independent reads match within noise
  (e.g. claimed van-Gogh C=63.0/A=0.733/β=−1.82; oil A=0.36; oil-pastel β=−2.45).
- **The van-Gogh §4.2 anisotropy is a knife-edge, not a land.** Both of my independent
  single-frame reads (0.7246, 0.7316) sit BELOW the 0.732 floor; the gate's median-of-5
  evidently clears it by ~0.001. "Lands all 3 bands" is true only at the median of a
  quantity that straddles the floor frame-to-frame. A re-run can plausibly go red.
- Floors reproduce too: van-Gogh gap-fraction 0.045–0.048 (>0.04), variance 271–294,
  chroma 66.5; the three mediums are pairwise distinct. Gate ledger
  `.cache/gates/AY-aurora-arresting.json` says `pass` — consistent with what I measured.

## 2. Do the strokes read as STROKES? — No (the bands are passed by non-stroke structure)

Captures: `RA-aurora-painterly-vangogh-zoom4-spiral.png`, `-vangogh-zoom4-gold.png`
(4× zooms of the live light render).

- **The "strokes" are hair-thin filaments** — 1–2px dark stair-step zigzag lines drawn OVER
  smooth gradient color zones. They have no body, no width variation, no pigment along the
  stroke, no impasto lighting, no broken color. Actual van Gogh dabs are short, fat, juicy,
  side-by-side color strokes that BUILD the image; here the image is a smooth wash and the
  "strokes" are scratch overlays.
- **Hard geometry artifacts break the painterly illusion at any zoom**: a full-height
  straight vertical hairline and straight horizontal seams (cell/grid boundaries) cross the
  field (`-vangogh-zoom4-gold.png`, dead center); a faint circular nucleus ring sits baked in
  the gold zone; hard-edged dark polygon shards float top-right.
- **The atomicity gap-fraction (0.045) is satisfied by these dark scratch pixels and shards,
  not by canvas showing between separable dabs.** The metric direction was sound; the
  structure passing it is not the structure the bar named ("atomic brush strokes with depth,
  variation"). This is precisely band-passing noise.
- **Dark scheme shows prominent ghost rings** (`-vangogh-dark.png`): several large translucent
  circles (nucleus rings) read clearly over the artwork at rest — a visible blemish in the
  canonical dark register.

**Macro judgment, calibrated:** at viewing distance (`-vangogh-light.png`) the van-Gogh hero is
genuinely striking — a big indigo/teal vortex with radiating flow lines over an ochre zone,
reads like a handsome marbled-ink / flow-field drawing. It is the best artifact in the lane
and a legitimately good generative gradient. It is NOT congruent to van Gogh — it is congruent
to a line-integral-convolution flow drawing.

## 3. Oil pastel — pleasant, but it is not oil pastel

Captures: `-oil-pastel-light.png`, `-oil-pastel-dark.png`, `-oil-pastel-zoom4.png`.

- Macro: layered red/coral/orange ribbon shapes flowing horizontally over a warm yellow glow —
  a genuinely pleasant abstract sunset. "Painterly, non-uniform" is half-true at distance.
- At 4×: the ribbons are smooth, flat, translucent overlapping shapes — they read as
  tissue-paper / chiffon collage, not waxy opaque pastel. There is a faint global speckle
  (a whisper of tooth) but no scumble, no crayon-body deposition, no visible smear bodies.
  The thin dark squiggle threads are the same scratch-filament vocabulary as van-Gogh.
  Grid seams and a circular arc artifact are visible here too.
- The DELTA records the A and β residuals honestly (0.66 vs 0.732 floor; −2.53 vs −1.85) and
  routes them to the named T5 Kuwahara successor. That residual IS the visual gap: the field
  is too smooth/laminar to read as a stroke medium.

## 4. Oil — the weakest; "stunningly beautiful" is overstated

Captures: `-oil-light.png`, `-oil-dark.png`, `-oil-zoom4.png`.

- Macro: a near-monochrome wall of saturated red with faint horizontal streak bands. Low value
  contrast, no focal structure. It does not arrest; it reads as a red texture wallpaper.
- At 4×: scattered isolated white pixels ("specular glint") read as salt noise, not glints;
  rectangular grid seams upper-left; a large circular ring arc right edge. The directional
  raked-band character the DELTA describes is present but drowned by the monochrome flatness —
  consistent with its own recorded A=0.32–0.36 (strokes not coherent).
- The DELTA's honest side-by-side text ("directional diagonal raked-light ridges reading as oil
  strokes") oversells what is visible; β landing in the −5/3 band did not produce oil paint.

## 5. The medium SWITCHER is dead UI — a user cannot drive it at all

Probe: clicked `[data-atom="medium"]` trigger; `aria-expanded` stays `false`, `data-state`
stays `closed`, zero `[role="listbox"]`/`[role="option"]` ever mounts; ArrowDown/Enter on the
focused trigger also do nothing. Root cause is in the demo source (read-only observation):
`AuroraAtomsPanel.vue` binds **`:is-open="false"` hard-wired** on all four `LabeledSelect`s
(Harmony, Arrangement, Medium, Motion) with no `@update:open` listener — a controlled-closed
reka Select that can never open. The ONLY way a live user changes medium is the hero preset
strip. The lane brief said "drive the medium switcher live: van-Gogh, oil-pastel, oil" — a
real user cannot.

Corroboration at gate level: `[data-atom="medium"] select` matches **0 nodes** live (no native
select exists), so `tests-visual/aurora-painterly-statistics.spec.ts` cannot drive the page —
and indeed `.cache/gates/AX-aurora-painterly-statistics.json` is **`status:fail`** at HEAD
(both specs timeout on `locator.selectOption`). The W13 "machine-locked" statistics gate is
red/stale against today's markup; only the preset-driven W-AUR-PAINTERLY arresting gate runs.

To still judge medium-vs-palette, I drove the Vue emit directly (workaround, not a user path):
**the mediums do not generalize off their hand-tuned hero presets.** Van-Gogh on the default
Sky palette is a murky violet haze with floating dark shards (`-vangogh-switcher-sky.png`);
oil-pastel on Sky shows a cobblestone/fish-scale cell tiling (`-oil-pastel-switcher-sky.png`);
oil on Sky collapses to a smooth teal wash with ghost rings (`-oil-switcher-sky.png`). The hero
palettes are doing most of the aesthetic work; the medium operators alone are not.

## 6. The "Starry Night reference" is a synthetic mock — the anchor is hollow

`tests-visual/fixtures/starry-night-crop.png` (9 KB, 256×192; `-starry-ref-3x.png` beside this
doc) is NOT a crop of the painting: it is a perfectly smooth sinusoidal blue zigzag gradient
with sparse hard-edged two-color comma SPRITES scattered on top — procedurally generated. A
real crop of impasto paint does not compress to 9 KB or contain isolated repeated sprite dabs
on a clean gradient. `aurora-ref-oil-pastel.png` ("an oil-pastel scan with visible tooth +
scumble") is likewise synthetic confetti noise. Yet W-AUR1 and the DELTA repeatedly call this
"the ground-truth painting" and claim the harness "recovers Ma et al.'s β=1.67±0.13 on the
ground-truth painting". The β band has independent literature backing (Ma et al. is real); the
C and A bands have NO anchor beyond a synthetic plate apparently tuned to produce the published
numbers. "Congruence to actual van Gogh works" was never measured against van Gogh. The
side-by-side-eye anchor the DELTA cites is a side-by-side with a mock.

## 7. Motion + interaction

- **Swirl drag works and is good**: a pointer drag visibly warps the field around the path and
  it relaxes plausibly (`-vangogh-swirl-drag.png` vs `-vangogh-light.png`). The most
  SOTA-feeling thing in the lane.
- **Ambient motion** (`-vangogh-motion-sheet.png`, 4 frames at 700 ms; meanAbsDiff over 2.5 s:
  van-Gogh ≈7–10, oil ≈4–6, oil-pastel ≈3 8-bit/ch): the macro zones drift slowly while the
  filament layer visibly re-routes/slides over the color field — the texture is not pinned to
  the pigment. I'd call it gently swimmy (mild shower-door) rather than painterly advection;
  it is smooth and not offensive, but the strokes crawling over a static wash reinforces the
  overlay-not-paint read.
- Light vs dark canvas renders are near-identical (self-colored canvas; only surrounding chrome
  changes) — except the dark-register ghost rings noted in §2.

## 8. Calibrated bottom line per medium

| Medium | Macro (viewing distance) | Stroke-level ("atomic strokes, depth, congruence") | Numeric claim |
|---|---|---|---|
| van-Gogh | Genuinely handsome flow-field vortex — arresting-adjacent | FAIL — scratch filaments over smooth wash + grid/ring artifacts | Reproduces; A is a knife-edge straddling the floor |
| oil-pastel | Pleasant layered sunset | FAIL as pastel — chiffon/tissue collage, no wax, no tooth deposition | Reproduces (incl. the recorded residuals) |
| oil | Weak — monochrome red wall, salt-noise speckle | FAIL — band-passing β did not produce oil paint | Reproduces (incl. the recorded A residual) |

**Is it truly SOTA?** No. It is a competent, sometimes beautiful procedural gradient engine
with a thin scratch-line "stroke" overlay, honest numerics, one dead control surface, one red
gate it still references, and a rigor narrative anchored to synthetic mocks. The T5
anisotropic-Kuwahara successor the DELTA names is the right diagnosis — the single-pass path
has hit its ceiling, and the stroke-body gap (not the band numbers) is what separates this from
the bar the user set.

## Capture index

`RA-aurora-painterly-{vangogh,oil-pastel,oil}-{light,dark}.png` (hero presets, full canvas) ·
`-vangogh-light-t2.png` (+2.5 s frame) · `-vangogh-motion-sheet.png` (4×700 ms contact sheet) ·
`-vangogh-swirl-drag.png` (post-drag) · `-{vangogh,oil-pastel,oil}-switcher-sky.png` (medium
forced onto the default Sky palette via Vue emit — dead-UI workaround) ·
`-vangogh-zoom4-{spiral,gold}.png`, `-oil-pastel-zoom4.png`, `-oil-zoom4.png` (4× stroke-level
evidence) · `-starry-ref-3x.png` (the synthetic "Starry Night" fixture at 3×) ·
`-studio-context-light.png` (full studio chrome).
