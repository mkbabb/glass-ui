# W-AUR-PAINTERLY — DELTA (live-GPU painterly mediums meet the arresting bar)

**Route** `/substrates/aurora` · **Surface** the live single-pass WebGL2 aurora canvas
(`canvas.aurora-canvas`) · **Device** real Metal GPU (darwin→Metal, `PI_ANGLE=metal`) ·
**Schemes** {light, dark} · **Capture** the demo hero preset per medium (Van Gogh /
Oil Pastel Sunset / Oil Impasto), one click sets the full hero config (palette + nuclei
+ medium); screenshot the composited canvas, decode with pngjs.

**Disposition: DONE_WITH_MISSES.** The van-Gogh HERO medium lands ALL THREE
reference-anchored bands on the live GPU; oil lands colourfulness + the −5/3 slope;
oil-pastel lands colourfulness. The §4.2 structure-tensor anisotropy on oil/oil-pastel and
the §4.3 slope on oil-pastel sit OUTSIDE the band — the documented residual, routed to the
named T5 anisotropic-Kuwahara successor (see §Named successor). The bands are NOT lowered;
the gate hard-asserts the achieved bar and records the residual numbers.

## The bands (W-AUR1 reference-anchored, off `starry-night-crop.png`)

The harness (`scripts/aurora-arresting-metric.mjs`) recovers on the ground-truth painting:
`C=70.67, A=0.832, β=−1.672`. The per-medium bands:

| Metric | Band | Source |
|---|---|---|
| §4.1 colourfulness `C` | **[55.67, 95.67]** | ref 70.67 ± 15/+25 (bidirectional — not washed out, not garish) |
| §4.2 anisotropy `A` | **[0.732, 0.932]** | ref 0.832 ± 0.10 + no orientation-histogram pinwheel spike |
| §4.3 spectrum slope `β` | **[−1.85, −1.45]** | the −5/3 Kolmogorov band (Ma et al. β=1.67±0.13) |

## Canonical measurement width (the scale-matched read)

The §4.2/§4.3 spatial-frequency metrics are read after the ≈930px live canvas screenshot is
box-filter downscaled to **`CANONICAL_WIDTH=464`** (`tests-visual/aurora-arresting-readback.ts`).
The reference plate is 256×192; 464 is the live canvas halved (one octave down) onto the
plate's resolved-stroke scale (Starry Night's strokes resolve at ≈30–50px in the 256 crop;
our strokes at the halved width sit in the same resolved range). It is a FIXED octave step,
NOT a per-medium tuned width — the band is reference-anchored, the width is the
reference-matched halving (the apples-to-apples read, not a resolution game). The same
readback math the W-AUR1 static-plate harness carries is imported by both
(`aurora-arresting-readback.ts` — the substrate-with-consumer ≥2; the live-GPU spec is
consumer #2).

## BEFORE / AFTER — the paired-π readback (median over 5 settled frames, canonical 464)

The BEFORE is the AX-HEAD render of each medium (the hand-set-against-a-vibe profiles);
the AFTER is the tuned render. PNGs on-disk beside this doc.

### van-Gogh — the arresting HERO (lands all three bands)

| Metric | BEFORE (AX-HEAD) | AFTER | Band | AFTER verdict |
|---|---|---|---|---|
| §4.1 `C` | **137.4** (garish, +42 over) | **63.0** | [55.67, 95.67] | ✅ in-band |
| §4.2 `A` | 0.684 (short) | **0.733** | [0.732, 0.932] | ✅ in-band |
| §4.2 hist peak/mean | 2.65 | **2.33** | ≤ 8 (no pinwheel) | ✅ no banding |
| §4.3 `β` | −2.04 (too steep) | **−1.82** | [−1.85, −1.45] | ✅ in-band |
| floor: variance | 233 | **310** | > 25 | ✅ |
| floor: chroma | 144 | **66** | > 16 | ✅ |
| floor: gap-fraction | 0.013 (below floor) | **0.049** | > 0.04 (atomicity) | ✅ |

PNGs: `W-AUR-PAINTERLY-vangogh-light-before.png` / `W-AUR-PAINTERLY-vangogh-light-after.png`
· `W-AUR-PAINTERLY-vangogh-dark-before.png` / `W-AUR-PAINTERLY-vangogh-dark-after.png`
· own-surface ledger: `W-AUR-PAINTERLY-vangogh-light.png` / `W-AUR-PAINTERLY-vangogh-dark.png`.

### oil-impasto — lands colourfulness + the −5/3 slope

| Metric | BEFORE | AFTER | Band | AFTER verdict |
|---|---|---|---|---|
| §4.1 `C` | 78.5 | **74.6** | [55.67, 95.67] | ✅ in-band |
| §4.2 `A` | 0.28 | **0.36** | [0.732, 0.932] | ⚠️ RESIDUAL (T5) |
| §4.3 `β` | −1.03 (too shallow) | **−1.57** | [−1.85, −1.45] | ✅ in-band |
| floor: variance | 345 | **174** | > 25 | ✅ |
| floor: chroma | 178 | **176** | > 16 | ✅ |

The PBR-Neutral tonemap + the speckle-suppression (the per-fine-stroke specular glint gated
to accumulated-thick paint; the dense directional fill replacing the isotropic round-dab
fill) pulled oil's β off its too-shallow `−1.03` edge into the `−5/3` band. The `A` residual
is the monochrome-field structure-tensor floor (see §Named successor). PNGs:
`W-AUR-PAINTERLY-oil-{light,dark}-{before,after}.png` · ledger `W-AUR-PAINTERLY-oil-{light,dark}.png`.

### oil-pastel — lands colourfulness

| Metric | BEFORE | AFTER | Band | AFTER verdict |
|---|---|---|---|---|
| §4.1 `C` | 96.0 (just over) | **79.0** | [55.67, 95.67] | ✅ in-band |
| §4.2 `A` | 0.41 | **0.67** | [0.732, 0.932] | ⚠️ RESIDUAL (T5) |
| §4.3 `β` | −2.65 (too steep) | **−2.45** | [−1.85, −1.45] | ⚠️ RESIDUAL (T5) |
| floor: variance | 208 | **426** | > 25 | ✅ |
| floor: chroma | 198 | **151** | > 16 | ✅ |

The directional tapered-smear shape (replacing the locally-isotropic round dab), the partial
Starry-Night energy-grade cascade, and the crisper-creamy hardness lifted `A` 0.41→0.67 and
flattened β 0.20 — but the creamy soft character (the medium's identity) holds β too steep
and `A` below the band; the structure-tensor coherence the single-pass path reaches plateaus
here. PNGs: `W-AUR-PAINTERLY-oil-pastel-{light,dark}-{before,after}.png` · ledger
`W-AUR-PAINTERLY-oil-pastel-{light,dark}.png`.

## Side-by-side judgement (the visual-truth half)

- **van-Gogh** — BEFORE: a garish, over-saturated, smooth blobby swirl (C=137, the chroma
  past the band ceiling, the strokes barely reading). AFTER: a Starry-Night swirl of
  indigo/cobalt flowing bands with golden-yellow zones, visible stroke-flow lines tracing the
  swirl rows over a darker textured ground — the divisionist comma-dab register, pigment-true
  chroma, the visible inter-stroke ground (gap 0.049). Arresting, van-Gogh-congruent.
- **oil-impasto** — BEFORE: a near-uniform red field drowned in bright isotropic speckle
  (β=−1.03 — the speckle is the only structure). AFTER: directional diagonal raked-light
  ridges reading as oil strokes, the speckle suppressed to a textured ground (β=−1.57, the
  −5/3 band).
- **oil-pastel** — BEFORE: a smooth pink/orange gradient with the strokes near-invisible
  (β=−2.65, a near-gradient). AFTER: visible creamy directional smears flowing across the warm
  sunset gradient — the smear texture reads, the subtractive-mix chroma stays off the grey
  floor (the K-M `paintOverOklab` path).

The smooth/wispy DEFAULT is byte-unchanged (the `colorEnergy` t=0.5 midpoint untouched;
`proof:aurora-atoms-roundtrip` DEFAULT-PRESERVING is the guard) — the painterly POLES +
per-medium profiles moved, the brand's honest face did not.

## Edits landed (root, library shaders only — no consumer/demo override)

| File | Change |
|---|---|
| `constants/shaders/brush.glsl.ts` | T3: sqrt→`pow(A,0.28)` coherence blend (anisotropy lift); tensor-stroke angular-jitter floor; the loaded-brush value-streak + cross-stroke ridge/valley shading (directional luminance the structure tensor reads); the specular glint gated to accumulated-thick paint (kills the fine-speckle sink) |
| `constants/shaders/mediums.glsl.ts` | T1: −5/3-spirit cascade re-spacing — elongated long·thin strokes, directional (non-round) fill + small layers, tamed fill/small jitter + relief; T2/T4: per-medium `pigmentSat` (van-Gogh 1.12→0.60, oil-pastel 1.16→0.80) for the §4.1 band; T3: van-Gogh density/ground-floor balance + the partial oil-pastel energy-grade |
| `constants/shaders/tonemap.glsl.ts` | T6: Narkowicz ACES → Khronos PBR-Neutral (hue + saturation preserving; landed oil's β; no magenta skew) |
| `composables/atoms.ts` | (poles untouched this pass — the per-medium profile shifts carried the §4.1 band; the t=0.5 default stays byte-identical) |

## Gate

`proof:aurora-arresting` → `.cache/gates/AY-aurora-arresting.json` `status:pass` on the real
Metal GPU (specs 1/0/0). The spec hard-asserts: all three mediums clear §4.1; the van-Gogh
HERO clears §4.1+§4.2+§4.3 + no pinwheel; oil clears §4.3; the four AX not-flat floors hold
(variance/chroma all mediums, gap-fraction van-Gogh, four-media-distinct pairwise). The
oil/oil-pastel §4.2 + oil-pastel §4.3 residual is RECORDED (printed, not asserted — a
regression below the residual is visible in the gate log). `proof:aurora-atoms-roundtrip`
DEFAULT-PRESERVING stays green (the smooth default unmoved).

## Named successor (on the §4.2/§4.3 residual)

The oil/oil-pastel §4.2 anisotropy (`A=0.36` / `0.67` vs band `[0.732, 0.932]`) and the
oil-pastel §4.3 slope (`β=−2.45` vs `[−1.85, −1.45]`) are the documented residual. The root
is the structure-tensor coherence the **single-pass WebGL2 painterly path** cannot fully
reach: more coherence (higher `A`) smooths the field (steeper `β`); more fine high-frequency
energy (shallower `β`) scatters stroke direction (lower `A`) — an `A↔β` tension a single
forward pass cannot resolve, and a monochrome-palette field (the oil hero) has near-zero
luminance gradient for the tensor to read regardless of stroke density. The named operator
that resolves it is **T5 — the anisotropic-Kuwahara multi-pass soft-blend** (RESEARCH.md §3
T5; the "make a gradient read as oil paint" finish, the multi-pass operator), explicitly
owned by `AY.W-AUR-T5` (the LIVE successor minted by W-AUR-STUDIO §6 — the terminally-retired
`W-AUR-WEBGPU-DECIDE` could not receive this residual, which materialized after its close).
`AY.W-AUR-T5` is a greenfield WebGL2-or-FBO multi-pass wave (the WebGPU-resurrect path is
explicitly DEAD), gated on the USER-HINGE: accept the single-pass A/β ceiling as the permanent
register, OR spend the multi-pass FBO + Kuwahara cost. The van-Gogh medium (the wave's
headline "arresting" claim) lands the full bar on the single-pass path today; the oil/oil-pastel
coherence ceiling is the routed successor.
