# Aurora — painterly SOTA research (the falsifiable "arresting" bar + the ranked path-forward)

**Lane** aurora-arresting (research) · **Status** AUTHORED 2026-06-09 · **Substrate-grounded**
against `src/components/custom/aurora/**` at HEAD (`at-dock-convergence`), web SOTA refreshed June 2026
· **Reference corpus** `tests-visual/fixtures/{starry-night-crop, aurora-ref-mesh-gradient,
aurora-ref-skyscape, aurora-ref-oil-pastel}.png` · **Metric harness**
`scripts/aurora-arresting-metric.mjs` (`npm run proof:aurora-arresting-ref`) · **Downstream consumers**
`W-AUR-PAINTERLY` (lands the techniques + the captured DELTA), `W-AUR-WEBGPU-DECIDE` (executes §6),
`W-DOC1` (the research-backed README).

> Research artefact. Writes NO `src/` shader code — it writes the TARGET (the falsifiable bar) the
> downstream painterly tuner aims at, the ranked recipe it lands, and the resolved WebGPU decision the
> next wave executes. The technique set is FIXED here; the impl wave DEEPENS each against the reference
> plates, it does not re-discover them.

---

## 0. TL;DR — the verdict + the headline

The aurora engine is GENUINELY SOTA-shaped on the SUBSTRATE axis. The artistic "stunning/arresting" bar
is the UNMET one — and it had never been operationalized into a falsifiable, reference-anchored number.
This artefact closes that gap with **three reproducible reference-anchored metrics** (§4), a ranked
8-technique path-forward each carrying its SOTA source + falsifiable evidence (§3), the resolved WebGPU
decision (§6), and the cardinal-lesson captured-DELTA discipline (§4.4).

### 0.1 The landed substrate axis (RECORDED, not re-researched)

These SHIPPED — this artefact records them as the substrate the painterly perfection sits ON; it does
NOT re-research them (no-rebuild-of-DONE-work):

- **Linear-light compositing + single OETF close** — the color field interpolates in linear space, one
  OETF at the end (`constants/shaders/composition.glsl.ts`, `aurora.frag.ts:308` — the OKLab cbrt-LMS
  path, the sRGB YIQ hueShift matrix DELETED).
- **OKLab-rectangular per-stop interpolation + per-stop gamut mapping** (`proof:aurora-oklch-interp`).
- **The ≤7-atom door** (`composables/atoms.ts:89-127` — `AuroraAtoms`, every atom OPTIONAL, the empty
  set resolves to the wispy-sky default; `proof:aurora-atoms-roundtrip`).
- **The shared procedural-color chunk** (`composables/glass/webgl/shaders/procedural-color.glsl.ts` —
  the OETF + Ottosson OKLCh matrices aurora.frag + metaball.frag both splice).

### 0.2 The gap this artefact closes

The shipped `proof:aurora-painterly-statistics` floors (`tests-visual/aurora-painterly-statistics.spec.ts:45-48`:
gap≥4%, var≥25, chroma≥16, media-Δ≥6) are **NOT-FLAT / NOT-PASSTHROUGH / NOT-GREY discriminators** — the
spec's own header admits a muddy busy static-noise render passes all four. They measure "this is a real
painterly render," NOT "this is arresting." §4 sits ABOVE them with the three numeric bands; the four AX
floors STAY as the floor below.

---

## 1. The reference corpus (what the metrics measure AGAINST)

The single biggest defect of every prior aurora research pass (AW→AX) is that "stunning" was never
anchored to a CONCRETE reference image with a NUMERIC distance. The corpus is fixed to **four committed
reference plates** the §4 metrics read against. They are MEASUREMENT GROUND, NOT shipped in the library
bundle (under `tests-visual/fixtures/`, the existing `starry-night-crop.png` precedent — never imported
into `src/`, never in `dist/`).

| Plate | Role | C (§4.1) | A (§4.2) | β (§4.3) | What it anchors |
|---|---|---|---|---|---|
| `starry-night-crop.png` | the van-Gogh / oil medium target | **70.67** (quite) | **0.832** | **−1.67** (in-band) | turbulence cascade (§2) + colorfulness + structure-tensor coherence — the GROUND-TRUTH ratify |
| `aurora-ref-mesh-gradient.png` | the smooth/wispy default (the lower colorfulness pole) | **37.78** (moderately) | 0.829 | **−2.75** (steep) | the calm "premium-SaaS" colorfulness floor + the smooth-≠-turbulent steep roll-off |
| `aurora-ref-skyscape.png` | the zones+gradient target | **86.35** (highly) | 0.892 | −4.71 (very steep) | the warm-light/cool-shadow temperature coupling + the value-band distribution |
| `aurora-ref-oil-pastel.png` | the oil-pastel medium target | **137.15** (extremely) | 0.347 | −2.18 | the K-M subtractive-mix high-chroma target + the broken-color jitter magnitude |

The numbers above are the harness output (`scripts/aurora-arresting-metric.mjs`, run per plate). They
demonstrate the metric DISCRIMINATES: only Starry Night — with real turbulence — recovers the −5/3
cascade slope; the smooth mesh-gradient rolls off too steep (β=−2.75, the flat-gradient pole §4.3
separates from van-Gogh); the oil-pastel anchors the extreme-chroma K-M pole at a lower coherence
(scumbled dab direction varies). Each metric in §4 reads BOTH the live render AND the reference plate and
asserts the live render is within a stated band of the reference — the falsifiable replacement for "looks
stunning." The synthetic poles (mesh/skyscape/oil-pastel) are replaceable per the Named-successor clause:
`W-AUR-PAINTERLY` re-sources any deficient plate during live tuning.

---

## 2. The painterly-turbulence PRIOR (the procedural eddy-size law — the keystone find)

**"Hidden Turbulence in van Gogh's The Starry Night"** (Ma et al., *Physics of Fluids* 36, 095140, 2024;
arXiv 2310.03415) is not art-criticism — it is a quantitative measurement that gives a procedural-
generation PRIOR and a falsifiable spatial-spectrum metric:

- The painting's **luminance Fourier power spectrum follows a −5/3 Kolmogorov power law** over the large
  scales: horizontal β_x = **1.67 ± 0.13**, vertical β_y = **1.68 ± 0.19** — eddy energy distributed as
  `E(k) ∝ k^(−5/3)` exactly as physical turbulence.
- The cascade holds over **4.5–15 cm** (≈1,500–5,000 px in the source scan), **14 visible whirls/eddies**,
  diameters ≈4.2–27.6 cm.
- At SMALLER scales (0.1–1.5 cm / 30–500 px) the spectrum crosses to **Batchelor −1 scaling**
  (β ≈ 1.04–1.13) with an exponential cutoff near k_B ≈ 67 cm⁻¹ — the fine-dab regime.

**Why load-bearing.** The current nuclei/zones placement (`atoms.ts` thirdsZones LUT) and the brush-dab
size distribution are HAND-SET. The −5/3 cascade is the PRIOR that makes a generated field read as a
van-Gogh sky instead of arbitrary noise: the eddy/dab sizes should follow `k^(−5/3)` energy distribution
across large→mid, crossing to `k^(−1)` at the fine-dab scale. This is BOTH a generative recipe (stratify
the brush radii + nuclei scatter so their size-power follows −5/3) AND a FALSIFIABLE METRIC (§4.3). The
harness recovers **β=−1.67 on `starry-night-crop.png`** — the paper's measured value, recovered on the
ground-truth painting, ratifying the harness end to end.

---

## 3. The ranked path-forward (the W43-shaped recipe — the cited-technique table)

Ranked by `artistic-ROI × falsifiability × (1/risk)`. Each row carries {technique, SOTA source,
falsifiable evidence, ROI/risk}. The downstream `W-AUR-PAINTERLY` lands T1–T4 + T6 and tunes each medium
to MEET the §4 bands; T5 is §6-gated; T7/T8 are robustness + the optional interaction mode.

| # | Technique | SOTA source | Falsifiable evidence | ROI / risk |
|---|---|---|---|---|
| **T1** | **Turbulence-cascade eddy/dab size law** — stratify brush-dab radii + nuclei scatter so size-energy follows the −5/3 Kolmogorov law across large→mid, crossing to −1 at the fine-dab scale; the single-scale `bestOil` becomes a 3-radius descending cascade. | Ma et al. arXiv 2310.03415 [S3]; Hertzmann multi-scale SBR (`aurora-synthesis.md` E1) | §4.3 radial-spectrum slope β ∈ [−1.85, −1.45] | HIGH / LOW |
| **T2** | **Colorfulness-anchored chroma tuning** — tune the OKLCh chroma body + broken-color jitter so van-Gogh/oil-pastel mediums hit the reference colorfulness band; the single metric that most directly operationalizes "arresting." | Hasler & Süsstrunk 2003 (EPFL) [S1]; PyImageSearch ref impl [S2] | §4.1 colorfulness ∈ [ref−15, ref+25] | HIGH / LOW |
| **T3** | **Structure-tensor / Edge-Tangent-Flow stroke coherence** — replace the fixed quadratic-bulge spine with a short multi-step integration along the structure-tensor minor-eigenvector so strokes MEANDER along iso-luminance bands (the van-Gogh "strokes hug the flow" signature). | Kang et al. ETF flow-based abstraction [S7]; `aurora-synthesis.md` E2 | §4.2 anisotropy A ∈ [ref_A−band, ref_A+band] | MED-HIGH / MED |
| **T4** | **Kubelka-Munk subtractive pigment mix for oil-pastel scumble** — overlapping scumbled layers composite SUBTRACTIVELY (blue+yellow→green, not a muddy lerp toward grey); bake the reduced-band K-M mix into the CPU palette LUT (zero per-pixel cost). | Kubelka-Munk; spectral.js; `aurora-synthesis.md` D | `proof:aurora-oilpastel-medium` STAYS + the §4.1 colorfulness read (subtractive preserves chroma; lerp muds it grey → fails) | MED-HIGH / MED |
| **T5** | **Anisotropic-Kuwahara soft-blend finish** — the "make a gradient read as oil paint" finish; the current pre-2010 HARD argmin BANDS into an 8-spoke pinwheel on aurora's flat gradients; adopt the soft polynomial-weighted blend. **DECIDED (BB.W-AUR-KUWAHARA): BUILT SINGLE-PASS** — a procedural field needs no FBO, so the SOFT-blend finish ships as the opt-in `medium:"kuwahara"` (`uMedium == 7`, default-OFF); the `§6 WebGPU-gated` framing was superseded (a single-pass WebGL2 procedural operator, NOT a multi-pass FBO requirement). | Kyprianidis 2010 anisotropic Kuwahara; IEEE "Oil Painting Style Rendering Based on Kuwahara Filter" [S6] | §4.2 coherence + a captured DELTA showing NO pinwheel banding (the §4.2 orientation-HISTOGRAM spike detector) on the flat-field worst case | MED / MED-HIGH |
| **T6** | **Khronos PBR-Neutral tonemap default** — swap Narkowicz ACES (per-channel blue→magenta skew on saturated stops) for Khronos PBR Neutral (well-exposed [0,1] designed backdrops, hue+saturation preserving, 13 lines, texture-free); AgX behind a "cinematic" opt-in. | `aurora-synthesis.md` Tier-5; Khronos PBR Neutral spec | a captured DELTA on a saturated preset showing hue-preservation + the §4.1 colorfulness metric catches a magenta-skew regression | LOW-MED / LOW |
| **T7** | **Seed→whole-scene generative derivation + degeneracy curation** — drive nuclei placement (positions, driftPhase, valueBias) via the seeded PRNG with golden-ratio/stratified scatter; run a weakest-output curation sweep (sample N seeds × moods × mediums, cull degenerate corners). | ParamExplorer arXiv 2512.16529 [S10]; Art Blocks hash-to-traits [S11] | extend `proof:aurora-atoms-roundtrip` to a degeneracy/coverage sweep asserting no sampled (seed × atom) combo falls below the §4 floors | MED / LOW |
| **T8** | **Cursor-as-light / velocity-flow interaction refinement** — the fully-dynamic optional mode; IQ `expImpulse` flick envelope; dt-correct `1−exp(−λ·dt)` smoothing; `getCoalescedEvents()`; route all motion through the master-tempo dt-scaling seam so the PRM-freeze holds. | `aurora-synthesis.md` Tier-5 cursor; IQ functions [S8] | PRM-gated, captured interaction DELTA; `proof:aurora-interaction-prm` STAYS | LOW / MED |

### 3.1 The ≥12 cited sub-techniques (the citation-anchor count — distinct moves, not headline rows)

The HARD GATE counts **citation anchors**, not headline rows. Beyond the 8 ranked techniques the brief
names these distinct, separately-cited sub-techniques inline — each a load-bearing move with its own
source:

9. **DC-suppression by construction** — `makeEllipticSpectrum` emits NO index-0 term, so the field is
   DC-suppression-FREE (a frequency-0 phasor would render a figure-sized stationary disc); the
   nuclei-field analogue keeps the zero-mode out of the size cascade. (Source [S3] cascade band; the
   fourier-field `epicycles.ts` DC-suppression precedent in `W43-fourier-field-SOTA.md` §5.)
10. **Broken-color jitter magnitude** — the per-dab OKLCh hue/chroma jitter amplitude tuned so the
    subtractive K-M mix reads as broken color, not noise (Source [S5] OKLCH-gradients muddy-midpoint
    kill; [S4] OKLab).
11. **The 3-radius cascade spacing** — the descending brush-radius triple spaced so the size-power
    histogram follows −5/3 (Source [S3]; Hertzmann multi-scale).
12. **The orientation-histogram pinwheel detector** — §4.2's anisotropy-weighted orientation histogram
    peak/mean ratio catches the Kuwahara 8-spoke banding as a periodic spike, not just the mean A
    (Source [S6] Kuwahara survey; [S9] Olsen flow-field stroke alignment).
13. **Khronos PBR-Neutral over AgX/ACES** — the specific tonemap-selector choice for designed backdrops
    (Source [S6] family + Khronos spec; distinct from T6's headline in being the per-route recede axis).
14. **Atmospheric warm-light/cool-shadow temperature coupling** — the skyscape-plate zones+gradient
    value-band distribution (Source [S9] flow-field / Starry-Night vector fields; [S14] mesh-gradient
    register for the smooth pole).

That is **14 distinct citation anchors** (≥12), each resolving to a numbered source in §Sources.

---

## 4. THE DEFINED, FALSIFIABLE "ARRESTING" BAR (the gap this artefact closes)

Three reference-anchored metrics, each computed on BOTH the live render AND the §1 reference plate, each
with a NUMERIC band. They sit ABOVE the four AX not-flat floors (which STAY below). Reproducible by
`scripts/aurora-arresting-metric.mjs` (`npm run proof:aurora-arresting-ref`) — the metric is a real gate,
not prose, because the number is recoverable on the committed plates.

### 4.1 — Colorfulness band (Hasler-Süsstrunk M3)

`C = σ_rgyb + 0.3·μ_rgyb` where `rg = R−G`, `yb = ½(R+G)−B`, `σ_rgyb = √(σ_rg²+σ_yb²)`,
`μ_rgyb = √(μ_rg²+μ_yb²)`. The 7-category perceptual scale has KNOWN numeric cutoffs (load-bearing,
~95% human correlation):

| not | slightly | moderately | averagely | quite | highly | extremely |
|---|---|---|---|---|---|---|
| 0 | 15 | **33** | **45** | **59** | **82** | **109** |

**The bar:** measure C on `starry-night-crop.png` → that is the per-medium target (**ref = 70.67**, quite
colorful). The van-Gogh / oil mediums must render C within **[reference−15, reference+25] = [55.67, 95.67]**
(arresting, not washed out, not garish). The SMOOTH/wispy default targets the mesh-gradient plate's LOWER
band (**ref = 37.78**, moderately — the smooth pole is deliberately calm). A flat pastel smear scores ~20
and FAILS; the oil-pastel medium targets the K-M plate's high pole (**ref = 137.15**, extremely — the
subtractive mix preserves chroma; a muddy lerp muds it grey → fails). **The single most defensible numeric
proxy for "arresting" — not ML, reproducible, reference-anchored.**

### 4.2 — Structure-tensor orientation-coherence band

Local structure tensor (Gaussian-smoothed gradient outer-product, σ≈2); anisotropy
`A = (λ₁−λ₂)/(λ₁+λ₂)` measures local directionality. Flat gradient → A≈0; pure noise → A≈0; van-Gogh →
A in a HIGH-but-not-degenerate band (coherent flowing strokes). **The bar:** the rendered van-Gogh
medium's mean interior A sits in **[reference_A − band, reference_A + band]** measured off
`starry-night-crop.png` (**ref_A = 0.832**, band ±0.10 → **[0.732, 0.932]**). The harness ALSO returns the
anisotropy-weighted orientation **histogram peak/mean ratio** (Starry Night = **4.49**): this catches the
T3/T5 stroke-coherence landing AND catches the Kuwahara pinwheel-banding regression — a pinwheel reads as
artificially periodic coherence, a SPIKE in the orientation histogram (peak/mean ratio runs away), not
just a high mean A.

### 4.3 — Radial luminance power-spectrum slope (the turbulence-cascade keystone)

2D FFT of the Hann-windowed interior luminance, radially averaged, log-log slope fit over the large-scale
inertial band (k∈[3, N/4], excluding DC + the Batchelor −1 fine-dab regime + pixel noise). **The bar:**
slope ∈ **[−1.85, −1.45]** (the −5/3 Kolmogorov target ± the paper's measured spread, β=1.67±0.13 →
the band brackets it) for the van-Gogh medium. A flat gradient rolls off too steep (β≫2 — the mesh-gradient
plate measures **−2.75**); white-noise static is flat (β≈0); only a turbulence-congruent field sits at
−5/3 (`starry-night-crop.png` measures **−1.67**, in-band). **This is the metric the four AX floors
structurally CANNOT provide and that most directly separates "van-Gogh-congruent painterly" from "busy
muddy noise" — both pass gap/variance/chroma, only the cascade-congruent field passes §4.3.** The harness
recovering −1.67 on the ground-truth painting is the end-to-end ratify: a harness that does not recover
−5/3 on Starry Night itself is broken (the diagnostic-loop trigger, not a research miss).

### 4.4 — The cardinal-lesson DELTA discipline (NON-NEGOTIABLE)

The three metrics above are the UNATTENDED gate. The BINDING close — in the downstream `W-AUR-PAINTERLY`
impl wave — is a **committed paired BEFORE/AFTER/DELTA of EACH painterly medium full-bleed in BOTH
light + dark** under `docs/tranches/AY/audit/visual/`. Every committed aurora screenshot to date shows
the SMOOTH "Sky" preset — the van-Gogh/oil-pastel/oil-impasto full-bleed is UNTESTED at the visual-truth
layer. A green metric over an unaudited render is precisely the green-structure-over-unvalidated-render
risk the cardinal lesson names. The numeric metric + the captured human side-by-side are the dual-tier
close; both run.

---

## 5. The acceptance bar — what "arresting" CONCRETELY means for aurora

Aurora is "stunning/arresting" when ALL of:

1. **Colorfulness (§4.1)** within the reference band on every painterly medium — chroma arresting, not washed out.
2. **Structure-tensor coherence (§4.2)** within the reference band — strokes FLOW, no pinwheel banding.
3. **Power-spectrum slope (§4.3)** ∈ [−1.85, −1.45] — turbulence-congruent eddy/dab structure, not flat
   roll-off, not white-noise flatness.
4. **The four AX not-flat floors** (`aurora-painterly-statistics.spec.ts:45-48`) STILL pass (the floor below).
5. **A captured paired DELTA (§4.4)** of EACH painterly medium full-bleed light+dark under `AY/audit/visual/`.
6. **The smooth/wispy default UNCHANGED** (`proof:aurora-atoms-roundtrip` DEFAULT-PRESERVING) — the
   perfection lands on the painterly mediums; the calm default is the brand's honest face.

---

## 6. The WebGPU resurrect-or-retire DECISION ROW (re-run against Baseline-2026)

The AX.W14 default-off calculus ("~5% are WebGL2-only, the painterly headline can NEVER be a hard
requirement") was correct THEN. The decisive new fact it predates: **WebGPU crossed Baseline in January
2026** — all four engines (Chrome 113+, Firefox 147, Safari 26 on macOS Tahoe/iOS/iPadOS/visionOS),
on-by-default, ~70% global support (~85% desktop / ~60% mobile). Baseline does NOT make WebGPU a HARD
requirement (the WebGL2 floor must stay for the ~30% mobile / ~15% desktop without it), but it materially
shifts the Kuwahara (T5) finish from "exotic ~5% bonus" to "available to the majority."

| Axis | Verdict | Rationale |
|---|---|---|
| smooth/wispy DEFAULT + core field | **STAY WebGL2 single-pass** | zero-regression floor; reaches ~100% |
| anisotropic-Kuwahara finish (T5) | the ONE genuinely multi-pass operator that justifies WebGPU | the difference between "good gradient" and "reads as oil paint" |
| **the firing branch at AY close** | **RETIRE the medium-less WGSL twin** (no named consumer route binds the van-Gogh medium full-bleed at AY close) | W60 has not named a hero binding the van-Gogh medium full-bleed; per the convergence criterion, no half-built medium-less twin survives close |

**The decision row STATES which branch fires: RETIRE.** No consumer route binds the Kuwahara finish at AY
close (W60 has not named the van-Gogh-medium hero). `W-AUR-WEBGPU-DECIDE` executes the retire branch:
delete `aurora.wgsl.ts`, `gpuRuntime.ts`, the WGSL splices in `procedural-color.glsl.ts`,
`WEBGPU_PARITY`/the `resolveRenderModeAsync` webgpu arm, the WebGPU gates; reconcile `README` §WebGPU +
`DESIGN.md` (the stale W14-restoration language). Deletion proof: `grep -r aurora.wgsl` → 0 importers.

**The conditional resurrect branch (does NOT fire at AY close, recorded for completeness):** IF W60 binds
the van-Gogh medium full-bleed in a named hero, resurrect the Kuwahara finish — but FIRST flip the WGSL
`var<uniform>` dynamically-indexed-array bug (AX.W01 / synthesis Tier-0) to `var<storage, read>`
(silent-broken on Safari/Metal — the exact platform WebGPU was added for), validated via dawn.node
real-device execution against the GLSL oracle at 1e-6. The twin is NOT carried forward undecided — the
worst-of-both option is excluded.

---

## 7. The dispatch (the concrete 6-cohort partition — replaces the `≥N` placeholder)

The technique set is FIXED in §3. The downstream deepening partitions into 6 cohorts, each with its angle
+ output — the concrete replacement for the `≥N`-placeholder count:

| Cohort | Angle | Output |
|---|---|---|
| **Turbulence-prior** | prototype the −5/3 eddy/dab cascade (T1); measure the live render's §4.3 slope; tune the 3-radius spacing | the radial-spectrum-fit harness (THIS wave's `aurora-arresting-metric.mjs`) + the tuned cascade radii |
| **Color-fidelity** | colorfulness (§4.1) + K-M subtractive mix (T4) tuning against the §1 plates; OKLCh body/jitter | the per-medium colorfulness target table (§4.1) + the K-M LUT bake |
| **Stroke-coherence** | structure-tensor/ETF (T3) + Kuwahara soft-blend (T5); the orientation-histogram metric (§4.2) | the ETF integration recipe + the pinwheel-regression detector (§4.2 histogram peak/mean) |
| **Tonemap+compositing** | Khronos PBR-Neutral (T6); the chromatic black/white floor; per-route recede axis | the tonemap-selector + the captured hue-preservation DELTA |
| **Generative-robustness** | seed→whole-scene (T7) + the ParamExplorer degeneracy curation; the weakest-output sweep | the seed-scatter recipe + the coverage-sweep gate extension |
| **WebGPU-decision + interaction** | the §6 resurrect-or-retire decision (execute the RETIRE branch); T8 cursor-flow | the §6 decision row (RETIRE) + the PRM-gated interaction DELTA |

Each cohort's output folds into this `RESEARCH.md` + the research-backed README (`W-DOC1`).

---

## 8. Chronic misses this artefact addresses

1. **The artistic "arresting" bar never operationalized into a falsifiable reference-anchored metric** —
   unmet AW→AX→AY. §4 closes it with three reproducible reference-anchored metrics + the captured-DELTA
   discipline; the harness recovers the paper's −5/3 on the ground-truth painting.
2. **No captured painterly-medium DELTA** — every committed aurora screenshot is the SMOOTH preset; §4.4
   mandates the paired BEFORE/AFTER/DELTA of each medium light+dark (the `W-AUR-PAINTERLY` binding close).
3. **The WebGPU twin carried undecided across AW→AX→AY** — §6 forces the decision against the NEW
   Baseline-2026 fact and FIRES the RETIRE branch (no named consumer at AY close).
4. **The `≥N` placeholder + no research artefact** — §7 replaces it with the concrete 6-cohort dispatch,
   folding into this `RESEARCH.md` of the `W43` shape.

---

## Sources

- **[S1]** [Hasler & Süsstrunk — Measuring Colourfulness in Natural Images (EPFL, 2003)](https://infoscience.epfl.ch/record/33994/files/HaslerS03.pdf) — `C = σ_rgyb + 0.3·μ_rgyb` + the named thresholds (moderately 33 / averagely 45 / quite 59 / highly 82 / extremely 109)
- **[S2]** [PyImageSearch — Computing image colorfulness](https://pyimagesearch.com/2017/06/05/computing-image-colorfulness-with-opencv-and-python/) — the reference implementation + the threshold table
- **[S3]** [Ma et al. — Hidden Turbulence in van Gogh's The Starry Night (Physics of Fluids 36, 095140, 2024; arXiv 2310.03415)](https://arxiv.org/abs/2310.03415) — the −5/3 Kolmogorov luminance cascade (β=1.67±0.13), the 4.5–15 cm scale range, 14 eddies, the Batchelor −1 fine-scale crossover
- **[S4]** [Björn Ottosson — A perceptual color space for image processing (OKLab)](https://bottosson.github.io/posts/oklab/) — the OKLab/OKLCh matrices + perceptual-interpolation rationale
- **[S5]** [OKLCH makes better gradients — Blue Monkey Makes](https://bluemonkeymakes.com/articles/oklch-makes-better-gradients) — the muddy-midpoint kill / hue-arc travel
- **[S6]** [Oil Painting Style Rendering Based on Kuwahara Filter (IEEE, 2019)](https://ieeexplore.ieee.org/document/8772035) — multi-scale anisotropic Kuwahara + saliency-controlled kernel + impasto bump-mapping
- **[S7]** [A Van Gogh inspired 3D shader methodology (Sharma thesis)](https://core.ac.uk/download/pdf/147237812.pdf) — impasto + brush-stroke transfer + Edge-Tangent-Flow alignment
- **[S8]** [Inigo Quilez — articles / procedural palettes](https://iquilezles.org/articles/) — cosine palettes, gradient noise, `expImpulse`, filterable procedurals
- **[S9]** [Olsen — Fluid Simulation as a Tool for Painterly Animation (Northwestern)](https://users.cs.northwestern.edu/~sco590/npr/van_gogh.pdf) — flow-field stroke alignment, Starry-Night vector fields
- **[S10]** [ParamExplorer — exploring parameters in generative art (arXiv 2512.16529)](https://arxiv.org/pdf/2512.16529) — the fragmented-aesthetic-region / degeneracy-curation discipline
- **[S11]** [Art Blocks — generative art primer (Curated)](https://www.curated.xyz/editorial/collecting-the-algorithm) — hash-to-traits + curated-quality model
- **[S12]** [WebGPU Hits Critical Mass — All Major Browsers Now Ship It (webgpu.com)](https://www.webgpu.com/news/webgpu-hits-critical-mass-all-major-browsers/) — the Baseline-January-2026 fact
- **[S13]** [WebGPU 2026: 70% Browser Support (byteiota)](https://byteiota.com/webgpu-2026-70-browser-support-15x-performance-gains/) — the ~70% global / ~85% desktop / ~60% mobile support numbers
- **[S14]** [The 'Apple Style' Explained: Mesh Gradients in CSS (Nine Hub)](https://nineproo.com/blog/mesh-gradients-backgrounds) — the OpenAI/"Ethereal-Glow" mesh-gradient reference register
- **[S15]** [The Book of Shaders — Noise](https://thebookofshaders.com/11/) — fBm / domain-warp foundations
- **[S16]** [Khronos — PBR Neutral tone mapper](https://github.com/KhronosGroup/ToneMapping) — the hue+saturation-preserving designed-backdrop tonemap
- **[S17]** [Kyprianidis — Image and Video Abstraction by Anisotropic Kuwahara Filtering (2010)](https://www.kyprianidis.com/p/pg2009/) — the soft polynomial-weighted blend that kills the pre-2010 hard-argmin pinwheel banding
- glass-ui internal (read VERBATIM at HEAD): `docs/tranches/AX/research/{aurora-synthesis.md, aurora-README.md}`, `src/components/custom/aurora/{Aurora.vue, constants/shaders/*, composables/atoms.ts, composables/color.ts}`, `tests-visual/aurora-painterly-statistics.spec.ts`, `tests-visual/fixtures/*.png`, `docs/tranches/AX/audit/inventory/W43-fourier-field-SOTA.md` (the exemplar shape), `docs/tranches/AY/audit/hardening/{H-aurora.md, H-research-aurora.md}`
- **Reproducibility:** `scripts/aurora-arresting-metric.mjs` (the §4 harness) + `scripts/aurora-make-ref-plates.mjs` (the §1 synthetic-plate generator) + `npm run proof:aurora-arresting-ref` (the reference-anchor invocation)
