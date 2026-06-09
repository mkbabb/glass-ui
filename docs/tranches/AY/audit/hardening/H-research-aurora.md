# H-research-aurora — the aurora SOTA research brief (seeds AY.W-AUR1's 32-agent sweep)

**Lane** H-research-aurora (the RESEARCH leg) · **Verdict** NEEDS-RESEARCH (the brief + ranked
techniques + the falsifiable "stunning" bar are AUTHORED here; the 32-agent deep sweep CONSUMES this)
· **Source-grounded** against `src/components/custom/aurora/**` at HEAD (`at-dock-convergence`), the AX
research corpus (`aurora-synthesis.md` / `aurora-README.md`), `W43-fourier-field-SOTA.md` (the exemplar
shape), the AY plan + ledger + corpus, web SOTA refreshed June 2026.

> This lane is DISTINCT from the sibling `H-aurora.md` (which red-teams the AY.W-AUR1..4 wave SCOPE — the
> no-op double-count, the WebGPU scope-confusion, the unfalsifiable bar). This lane is the RESEARCH SEED:
> it answers the three questions the sibling correctly says are missing — (1) WHAT does the 32-agent sweep
> investigate against WHAT corpus, (2) WHAT are the ranked techniques that better the current engine, and
> (3) WHAT is the DEFINED, falsifiable "stunning/arresting" acceptance bar. It is the `W43`-shaped artefact
> the sibling Finding 6 demands, pre-built so W-AUR1 has a real brief instead of process theatre.

---

## 0. TL;DR — the verdict + the headline

The AX engine is GENUINELY SOTA-shaped on the SUBSTRATE axis (the `aurora-synthesis.md` Part-1 README is a
real research artefact: linear-light compositing + single OETF close, OKLab-rectangular interpolation,
per-stop gamut-mapping, the ≤7-atom door, the shared color chunk). Two of AY.W-AUR2's three stated
objectives (OKLAB/OKLCH migration, atoms-door simplification) are LANDED — the sibling H-aurora is correct.

**The unmet bar is the ARTISTIC one, and it has never been operationalized into a falsifiable, REFERENCE-
ANCHORED metric.** The shipped `proof:aurora-painterly-statistics` floors (`spec:45-48`: gap≥4%, var≥25,
chroma≥16, media-Δ≥6) are NOT-FLAT / NOT-PASSTHROUGH / NOT-GREY discriminators — a muddy busy static-noise
render passes all four. They measure "this is a real painterly render," NOT "this is arresting." This
research lane closes that gap with **three falsifiable reference-anchored metrics** (§4) and a captured-DELTA
discipline (§5). It also DECIDES the WebGPU question the sibling flags (§6): WebGPU crossed **Baseline in
January 2026** (all four engines, on-by-default), which materially changes the AX.W14 "default-off because
~5% are WebGL2-only" calculus — the brief must re-run that decision against ~70% support, not retire blind.

The ranked path-forward (§3) is **8 techniques**, each carrying its SOTA source + the falsifiable evidence
that proves it landed. The 32-agent sweep's job is to DEEPEN each (real-device prototypes, the reference-
plate tuning), not to re-discover the technique set — that is fixed here.

---

## 1. The reference corpus (what the 32 agents measure AGAINST)

The single biggest defect of every prior aurora research pass (AW→AX) is that "stunning" was never anchored
to a CONCRETE reference image with a NUMERIC distance. The brief fixes the corpus to **four committed
reference plates** the metrics (§4) read against:

| Plate | Role | Status | What it anchors |
|---|---|---|---|
| `tests-visual/fixtures/starry-night-crop.png` | the van-Gogh / oil medium target | **EXISTS at HEAD** (verified) | turbulence-cascade prior (§2) + colorfulness (§4.1) + structure-tensor coherence (§4.2) |
| an OpenAI/"Ethereal-Glow" mesh-gradient crop | the smooth/wispy-sky default target | **TO COMMIT** (the brief mints it) | colorfulness floor for the smooth pole (§4.1); the "premium-SaaS" register reference |
| a landscape/skyscape photographic crop (atmospheric-scattering sky) | the zones+gradient target | **TO COMMIT** | the warm-light/cool-shadow temperature coupling + the value-band distribution |
| an oil-pastel/crayon scan (tooth + scumble) | the oil-pastel medium target | **TO COMMIT** | the K-M subtractive-mix chroma target + the broken-color jitter magnitude |

The reference plates are the MEASUREMENT GROUND. They are NOT shipped in the library bundle (they live under
`tests-visual/fixtures/` already, the existing starry-night precedent). Each metric in §4 reads BOTH the
live render AND the reference plate and asserts the live render is within a stated band of the reference —
the falsifiable replacement for "looks stunning."

---

## 2. The painterly-turbulence PRIOR (the procedural eddy-size law — the keystone find)

The single most actionable web find: **"Hidden Turbulence in van Gogh's The Starry Night"** (Ma et al.,
*Physics of Fluids* 36, 095140, 2024; arXiv 2310.03415). It is not art-criticism — it is a quantitative
measurement that gives a procedural-generation PRIOR and a falsifiable spatial-spectrum metric:

- The painting's **luminance Fourier power spectrum follows a −5/3 Kolmogorov power law** over the large
  scales: horizontal β_x = **1.67 ± 0.13**, vertical β_y = **1.68 ± 0.19** — i.e. the eddy energy is
  distributed as `E(k) ∝ k^(−5/3)` exactly as physical turbulence.
- The cascade holds over **4.5–15 cm** (≈1,500–5,000 px in the source scan), wavenumber 6.7×10⁻²–2.3×10⁻¹
  cm⁻¹. **14 visible whirls/eddies**, diameters ≈4.2–27.6 cm (1,400–9,200 px).
- At SMALLER scales (0.1–1.5 cm / 30–500 px) the spectrum crosses to **Batchelor −1 scaling** (β ≈ 1.04–1.13)
  with an exponential cutoff near k_B ≈ 67 cm⁻¹ (≈5 px) — the fine-dab regime.

**Why this is load-bearing for aurora.** The current nuclei/zones placement (`atoms.ts` thirdsZones 6-anchor
LUT) and the brush-dab size distribution are HAND-SET. The −5/3 cascade is the PRIOR that makes a generated
field read as a van-Gogh sky instead of arbitrary noise: the eddy/dab sizes should follow `k^(−5/3)` energy
distribution across the large→mid range, crossing to `k^(−1)` at the fine-dab scale. This is BOTH (a) a
generative recipe (stratify the brush radii + nuclei scatter so their size-power follows −5/3) AND (b) a
FALSIFIABLE METRIC (§4.3): compute the rendered field's radial luminance power spectrum and assert the
log-log slope sits in [−1.85, −1.45] over the large-scale band — the same measurement the paper ran on the
painting, run on our render. A flat gradient has a steep roll-off (β≫2); white noise is flat (β≈0); a
van-Gogh-congruent field sits at −5/3. **This is the metric that separates "arresting painterly" from
"busy muddy static" — which the four AX floors cannot.**

---

## 3. The ranked path-forward (8 techniques — the W43-shaped recipe)

Ranked by `artistic-ROI × falsifiability × (1/risk)`. Each carries SOTA source + the evidence that proves
it. The 32-agent sweep prototypes each against the §1 plates; this brief FIXES the technique set.

### T1 — The turbulence-cascade eddy/dab size law (the keystone; HIGH ROI, LOW risk)
Stratify the brush-dab radii AND the nuclei/zones scatter so their size-energy distribution follows the
**−5/3 Kolmogorov law** (§2) across the large→mid band, crossing to −1 at the fine-dab scale. The current
single-scale `bestOil` (AX synthesis lever E1: "multi-scale coarse-to-fine is the biggest quality lever,
currently single-scale") becomes a 3-radius descending cascade whose radii are −5/3-spaced. Source: arXiv
2310.03415; Hertzmann multi-scale SBR (cited in `aurora-synthesis.md` E1). Evidence: §4.3 radial-spectrum
slope ∈ [−1.85, −1.45].

### T2 — Colorfulness-anchored chroma tuning (HIGH ROI, LOW risk — the falsifiable "arresting" lever)
Tune the OKLCh chroma body + broken-color jitter so the rendered van-Gogh/oil-pastel mediums hit the
Hasler-Süsstrunk colorfulness band of the reference plate (§4.1). This is the SINGLE metric that most
directly operationalizes "arresting": a washed-out pastel scores ~20 (slightly colorful); Starry Night
scores high (≥60, quite-to-highly colorful). Source: Hasler & Süsstrunk 2003 (EPFL). Evidence: §4.1
colorfulness ∈ reference-anchored band.

### T3 — Structure-tensor / Edge-Tangent-Flow stroke coherence (MED-HIGH ROI, MED risk)
Replace the fixed quadratic-bulge stroke spine with a short multi-step integration along the structure-
tensor minor-eigenvector (Edge Tangent Flow) so strokes MEANDER along iso-luminance bands — the van-Gogh
"strokes hug the flow" signature. Source: Kang et al. ETF / flow-based abstraction; `aurora-synthesis.md`
lever E2. Evidence: §4.2 the rendered field's local-orientation coherence (the structure-tensor anisotropy
λ-ratio) sits in a band matching the reference (high-but-not-degenerate directionality).

### T4 — Kubelka-Munk subtractive pigment mix for oil-pastel scumble (MED-HIGH ROI, MED risk)
The oil-pastel headline (`aurora-synthesis.md` lever D): overlapping scumbled layers must composite
SUBTRACTIVELY (blue+yellow→green, not a muddy lerp toward grey). Bake the reduced-band K-M mix into the CPU
palette LUT (zero per-pixel cost) rather than per-fragment spectral mixing. Source: Kubelka-Munk; spectral.js;
`aurora-synthesis.md` D. Evidence: the AX `proof:aurora-oilpastel-medium` gate STAYS; ADD the §4.1
colorfulness read on the oil-pastel medium (subtractive mix preserves chroma; lerp muds it grey → fails).

### T5 — Anisotropic-Kuwahara soft-blend finish (MED ROI, MED-HIGH risk; WebGPU-gated — see §6)
The "make a gradient read as oil paint" finish. The AX synthesis (lever F) correctly notes the current
`painterly.wgsl.ts` uses the pre-2010 HARD argmin → it BANDS into an 8-spoke pinwheel on aurora's flat
gradients (its worst case). Adopt the soft polynomial-weighted blend (Kyprianidis 2010). Source: Kyprianidis
anisotropic Kuwahara; the IEEE "Oil Painting Style Rendering Based on Kuwahara Filter" survey. Gated on the
§6 WebGPU decision. Evidence: §4.2 coherence + a captured DELTA showing NO pinwheel banding on the flat-field
worst case.

### T6 — Khronos PBR-Neutral tonemap default (LOW-MED ROI, LOW risk — real polish)
Swap the Narkowicz ACES (per-channel blue→magenta skew on saturated stops) for Khronos PBR Neutral (built
for well-exposed [0,1] designed backdrops, hue+saturation preserving, 13 lines, texture-free), AgX behind a
"cinematic" opt-in. Source: `aurora-synthesis.md` Tier-5; Khronos PBR Neutral spec. Evidence: a captured
DELTA on a saturated preset showing the hue-preservation (a magenta-skew regression is visible + the
colorfulness metric T2 catches it).

### T7 — Seed→whole-scene generative derivation + degeneracy curation (MED ROI, LOW risk)
Today `seed` drives only the palette; the FIXED 6-anchor zones LUT means two seeds give identically-arranged
scenes (`aurora-synthesis.md` lever I). Drive nuclei placement (positions, driftPhase, valueBias) via the
seeded PRNG with golden-ratio/stratified scatter, and run a **weakest-output curation sweep** (sample N seeds
× moods × mediums, surface the worst frames) — the Art-Blocks/ParamExplorer discipline: "aesthetically
compelling outputs occupy only small fragmented regions; sample the space, cull the degenerate corners."
Source: ParamExplorer (arXiv 2512.16529); Art Blocks hash-to-traits curation. Evidence: extend
`proof:aurora-atoms-roundtrip` to a degeneracy/coverage sweep that asserts no sampled (seed × atom) combo
falls below the §4 floors.

### T8 — Cursor-as-light / velocity-flow interaction refinement (LOW ROI, MED risk; the W-AUR4 optional mode)
The fully-dynamic optional mode (PROMPT-CORPUS #6 "fully dynamic/interactive optional"). IQ `expImpulse`
flick envelope; dt-correct `1−exp(−λ·dt)` smoothing; `getCoalescedEvents()` for accurate flick magnitude;
route all new motion through the master-tempo dt-scaling seam so the PRM-freeze holds. Source:
`aurora-synthesis.md` Tier-5 cursor refinements; IQ functions. Evidence: PRM-gated, captured interaction
DELTA; `proof:aurora-interaction-prm` STAYS.

---

## 4. THE DEFINED, FALSIFIABLE "STUNNING" BAR (the gap this lane closes)

Three reference-anchored metrics, each computed on BOTH the live render AND the §1 reference plate, each
with a numeric band. These sit ABOVE the four AX not-flat floors (which STAY as the floor below). This is
the answer to the sibling H-aurora Finding 3 + Convergence-criterion 1.

### 4.1 — Colorfulness band (Hasler-Süsstrunk M3)
`C = σ_rgyb + 0.3·μ_rgyb` where `rg = R−G`, `yb = ½(R+G)−B`, `σ_rgyb = √(σ_rg²+σ_yb²)`,
`μ_rgyb = √(μ_rg²+μ_yb²)`. The 7-category perceptual scale has KNOWN numeric cutoffs (the load-bearing
find): **moderately=33, averagely=45, quite=59, highly=82, extremely=109** (Hasler-Süsstrunk 2003; the
metric correlates ~95% with human ratings).
**The bar:** measure C on `starry-night-crop.png` → that is the per-medium target. The van-Gogh / oil
mediums must render C within **[reference−15, reference+25]** (arresting, not washed out, not garish); the
SMOOTH/wispy default targets the OpenAI-plate C (a LOWER band — the smooth pole is deliberately calm).
A flat pastel smear scores ~20 and FAILS; a colorful painterly field passes. **This is the single most
defensible numeric proxy for "arresting" — it is not ML, it is reproducible, it is reference-anchored.**

### 4.2 — Structure-tensor orientation coherence band
Compute the local structure tensor (per `aurora-synthesis.md` — Gaussian-smoothed gradient outer-product);
the anisotropy `A = (λ₁−λ₂)/(λ₁+λ₂)` measures local directionality. A flat gradient → A≈0 (no strokes); pure
noise → A≈0 (no coherent direction); van-Gogh → A in a HIGH-but-not-degenerate band (coherent flowing
strokes). **The bar:** the rendered van-Gogh medium's mean interior A sits in **[reference_A − band,
reference_A + band]** measured off `starry-night-crop.png`. This is what catches the T3/T5 stroke-coherence
landing AND catches the Kuwahara pinwheel-banding regression (a pinwheel reads as artificially high,
periodic coherence — detectable as a spike in the orientation HISTOGRAM, not just the mean).

### 4.3 — Radial luminance power-spectrum slope (the turbulence-cascade metric — the keystone)
Compute the 2D FFT of the interior luminance, radially average, fit a log-log slope over the large-scale band.
**The bar:** slope ∈ **[−1.85, −1.45]** (the −5/3 Kolmogorov target ± the paper's measured spread,
β=1.67±0.13 → the band brackets it) for the van-Gogh medium. A flat gradient rolls off too steep (β≫2);
white-noise static is flat (β≈0); only a turbulence-congruent field sits at −5/3. **This is the metric the
four AX floors structurally CANNOT provide and that most directly separates "van-Gogh-congruent painterly"
from "busy muddy noise" — both pass gap/variance/chroma, only the cascade-congruent field passes 4.3.**

### 4.4 — The cardinal-lesson DELTA discipline (NON-NEGOTIABLE)
Per the H-aurora Finding 3 (NO captured painterly-medium DELTA exists — every committed screenshot shows the
SMOOTH "Sky" preset, never the van-Gogh/oil-pastel/oil-impasto full-bleed): the metrics above are the
UNATTENDED gate; the BINDING close is a **committed paired BEFORE/AFTER/DELTA of EACH painterly medium
full-bleed in BOTH light + dark** under `docs/tranches/AY/audit/visual/`. A green metric over an unaudited
render is precisely the green-structure-over-unvalidated-render risk the cardinal lesson names.

---

## 5. The acceptance bar — what "stunning" CONCRETELY means for aurora

Aurora is "stunning/arresting" (the PROMPT-CORPUS #6 bar) when ALL of:
1. **Colorfulness (§4.1)** within the reference band on every painterly medium (van-Gogh, oil-pastel, oil,
   crayon) — the chroma is arresting, not washed out.
2. **Structure-tensor coherence (§4.2)** within the reference band — the strokes FLOW (van-Gogh signature),
   no pinwheel banding artifact.
3. **Power-spectrum slope (§4.3)** ∈ [−1.85, −1.45] — the field carries turbulence-congruent eddy/dab
   structure, not flat-gradient roll-off, not white-noise flatness.
4. **The four AX not-flat floors** (`spec:45-48`) STILL pass (the floor below the new bar).
5. **A captured paired DELTA (§4.4)** of EACH painterly medium full-bleed light+dark exists under
   `AY/audit/visual/` — the human side-by-side ratifies the numeric gate (the dual-tier close).
6. The smooth/wispy-sky default is UNCHANGED (`proof:aurora-atoms-roundtrip` DEFAULT-PRESERVING) — the
   perfection lands on the painterly mediums, the calm default is the brand's honest face.

---

## 6. The WebGPU resurrect-or-retire DECISION (re-run against Baseline-2026)

The sibling H-aurora Finding 2 correctly says the AY plan re-opens "WebGPU path" without naming a consumer or
a parity definition, and that AX.W14 "de-facto excised" the multi-pass scaffold (`gpuRuntime.ts:14-20`;
`WEBGPU_PARITY=false`). The web research adds the DECISIVE new fact the AX decision predates:

**WebGPU crossed Baseline in January 2026** — all four engines (Chrome 113+, Firefox 147, Safari 26 on
macOS Tahoe/iOS/iPadOS/visionOS), on-by-default, ~70% global support (~85% desktop / ~60% mobile). The
AX.W14 "default-off because ~5% are WebGL2-only and the painterly headline can NEVER be a hard requirement"
calculus was correct THEN; the brief must re-run it now. The decision is NOT automatic — Baseline does not
make WebGPU a HARD requirement (the WebGL2 floor must stay for the ~30% mobile / ~15% desktop without it) —
but it materially shifts the cost/benefit of the Kuwahara (T5) finish from "exotic ~5% bonus" to "available
to the majority."

**The brief's WebGPU verdict (the decision row the sibling demands):**
- The smooth/wispy DEFAULT + the core field stay WebGL2 single-pass (zero-regression floor; reaches ~100%).
- The anisotropic-Kuwahara painterly finish (T5) is the ONE genuinely multi-pass operator that justifies
  WebGPU. The decision: **resurrect it ONLY if a named consumer route demands it** (the page-redesign W60
  hero is the candidate — if a hero binds the van-Gogh medium full-bleed, the Kuwahara finish is the
  difference between "good gradient" and "reads as oil paint"). If NO consumer route binds it at AY close →
  **formally retire** the half-built medium-less WGSL twin (delete `aurora.wgsl.ts`, `gpuRuntime.ts`, the
  WGSL splices, `WEBGPU_PARITY`, the WebGPU gates) per the sibling's retire-branch edit-sites — no dead
  scaffold survives close. The 32-agent sweep names the consumer or executes the retirement; it does NOT
  carry the twin forward undecided (the worst-of-both the sibling Finding 2 names).
- If resurrected: the WGSL `var<uniform>` dynamically-indexed-array bug (AX W01 / synthesis Tier-0) MUST be
  flipped to `var<storage, read>` first (silent-broken on Safari/Metal — the exact platform WebGPU was added
  for), validated via dawn.node real-device execution against the GLSL oracle at 1e-6.

---

## 7. The 32-agent sweep brief (the concrete dispatch — replaces the `≥N` placeholder)

The AY.W-AUR1 gate's `≥N` placeholder (`AY.md:55`) is replaced by a CONCRETE count and a per-agent angle.
The 32 agents do NOT re-discover the technique set (fixed in §3) — they DEEPEN it via real-device prototypes
+ reference-plate tuning. The brief partitions the 32 into 6 cohorts:

| Cohort | Agents | Angle | Output |
|---|---|---|---|
| **Turbulence-prior** | 6 | prototype the −5/3 eddy/dab cascade (T1); measure the live render's §4.3 slope; tune the 3-radius spacing | the radial-spectrum-fit harness + the tuned cascade radii |
| **Color-fidelity** | 6 | colorfulness (§4.1) + K-M subtractive mix (T4) tuning against the §1 plates; OKLCh body/jitter | the per-medium colorfulness target table + the K-M LUT bake |
| **Stroke-coherence** | 6 | structure-tensor/ETF (T3) + Kuwahara soft-blend (T5); the orientation-histogram metric (§4.2) | the ETF integration recipe + the pinwheel-regression detector |
| **Tonemap+compositing** | 4 | Khronos PBR-Neutral (T6); the chromatic black/white floor; per-route recede axis | the tonemap-selector + the captured hue-preservation DELTA |
| **Generative-robustness** | 6 | seed→whole-scene (T7) + the ParamExplorer degeneracy curation; the weakest-output sweep | the seed-scatter recipe + the coverage-sweep gate extension |
| **WebGPU-decision + interaction** | 4 | the §6 resurrect-or-retire decision (name the consumer or execute retirement); T8 cursor-flow | the WebGPU decision row + the PRM-gated interaction DELTA |

Each cohort's output folds into `src/components/custom/aurora/RESEARCH.md` (the W43-shaped artefact the
sibling Finding 6 demands) + the research-backed README (W-DOC1).

---

## 8. Chronic misses this brief addresses

1. **The artistic "stunning" bar never operationalized into a falsifiable reference-anchored metric** —
   unmet AW→AX→AY (sibling H-aurora chronic #1). §4 closes it with three reproducible reference-anchored
   metrics (colorfulness, structure-tensor coherence, power-spectrum slope) + the captured-DELTA discipline.
2. **No captured painterly-medium DELTA** — every committed aurora screenshot is the SMOOTH preset; the
   van-Gogh/oil-pastel/oil-impasto full-bleed is UNTESTED at the visual-truth layer (sibling Finding 3).
   §4.4 mandates the paired BEFORE/AFTER/DELTA of each medium light+dark.
3. **The WebGPU twin carried undecided across AW→AX→AY** (sibling chronic #2) — §6 forces the decision
   against the NEW Baseline-2026 fact (the AX.W14 calculus predates it), with a named-consumer-or-retire bar.
4. **The `≥N` placeholder + no research artefact** (sibling Finding 6) — §7 replaces it with 32 agents in 6
   cohorts, each with a concrete angle + output, folding into a `RESEARCH.md` of the `W43` shape.

---

## 9. Wave-spec inputs (what AY.W-AUR1 needs, authored)

### AY.W-AUR1 (research) — the brief, now concrete
- **Defect**: `AY.md:55` `≥N` placeholder; no `aurora/RESEARCH.md`; no defined arresting metric (sibling
  Finding 6 + chronic #1/#4).
- **Objective**: produce `src/components/custom/aurora/RESEARCH.md` in the `W43-fourier-field-SOTA.md` shape
  from THIS brief: the §1 reference corpus (commit the 3 missing plates), the §3 ranked techniques, the §6
  WebGPU decision row, the §4 falsifiable arresting metrics, the §7 32-agent dispatch.
- **Edit sites**: new `src/components/custom/aurora/RESEARCH.md`; `AY.md:55` (replace `≥N` → 32 in 6
  cohorts); `tests-visual/fixtures/` (commit the 3 missing reference plates).
- **HARD GATE**: `RESEARCH.md` present with the 8 ranked techniques (each with SOTA source + falsifiable
  evidence), the 4-plate reference corpus committed, the WebGPU decision row resolved (named consumer OR
  retirement plan), AND the 3 arresting metrics defined with numeric bands reproducible against the plates
  (evidence: doc-presence + the metric harness runs against `starry-night-crop.png` and returns the
  reference-anchor numbers). The `≥N` placeholder struck.

### AY.W-AUR-PAINTERLY (impl, supersedes W-AUR3's unfalsifiable "stunning")
- **Defect**: AUDIT-LEDGER:25,66 "van-Gogh bar NOT met"; the four AX floors measure not-flat, not arresting
  (sibling Finding 3).
- **Objective**: land T1 (turbulence cascade) + T2 (colorfulness) + T3 (ETF coherence) + T4 (K-M oil-pastel)
  + T6 (tonemap); tune each medium to MEET the §4 reference-anchored bands; capture the §4.4 DELTA.
- **Edit sites**: `constants/shaders/mediums.glsl.ts` (`profileFor` van-Gogh/oil-pastel cases,
  `paintStrokeMedium`), `constants/shaders/brush.glsl.ts` (the multi-scale cascade + SDF + impasto),
  `composables/atoms.ts` (the colorEnergy/seed-scatter tuning), `composables/color.ts` (the K-M LUT bake),
  `constants/shaders/tonemap.glsl.ts` (Khronos PBR-Neutral).
- **HARD GATE**: a NEW `proof:aurora-arresting` spec computes §4.1 colorfulness + §4.2 structure-tensor
  coherence + §4.3 power-spectrum slope on each painterly medium (real-GPU readback) and asserts each within
  the reference-anchored band; the four AX floors STAY below it; a committed paired BEFORE/AFTER/DELTA of
  EACH painterly medium full-bleed light+dark under `AY/audit/visual/` (evidence: the captured DELTA, NOT a
  commit-message claim — the cardinal lesson). The smooth default UNCHANGED (`proof:aurora-atoms-roundtrip`).

### AY.W-AUR-WEBGPU-DECIDE (decision, supersedes W-AUR3's "WebGPU path")
- **Defect**: WGSL twin medium-less (sibling Finding 1); `aurora.wgsl.ts:226` comment references the deleted
  W7c path; AY re-opens "WebGPU path" with no consumer/parity definition (sibling Finding 2); the AX.W14
  default-off calculus predates the §6 Baseline-2026 fact.
- **Objective**: execute the §6 decision — name the consumer route (W60 hero binding the van-Gogh medium →
  resurrect the Kuwahara finish, flip the `var<uniform>`→`var<storage,read>` bug, dawn.node parity) OR
  formally retire the twin.
- **Edit sites (retire branch)**: delete `aurora.wgsl.ts`, `gpuRuntime.ts`, the WGSL splices in
  `procedural-color.glsl.ts`, `WEBGPU_PARITY`/`resolveRenderModeAsync` webgpu arm, the WebGPU gates;
  reconcile `README` §WebGPU + `DESIGN.md` (the stale W14-restoration language, sibling Finding 7).
- **HARD GATE**: no dead WGSL scaffold survives (deletion proof: `grep -r aurora.wgsl` → 0 importers) OR the
  named consumer route renders the Kuwahara finish (captured DELTA, no pinwheel banding per §4.2) + the
  `var<storage,read>` flip validated via dawn.node real-device parity at 1e-6.

---

## Sources

- [Hasler & Süsstrunk — Measuring Colourfulness in Natural Images (EPFL, 2003)](https://infoscience.epfl.ch/record/33994/files/HaslerS03.pdf) — the `C = σ_rgyb + 0.3·μ_rgyb` metric + the named thresholds (moderately 33 / averagely 45 / quite 59 / highly 82 / extremely 109)
- [PyImageSearch — Computing image colorfulness](https://pyimagesearch.com/2017/06/05/computing-image-colorfulness-with-opencv-and-python/) — the reference implementation + the threshold table
- [Ma et al. — Hidden Turbulence in van Gogh's The Starry Night (Physics of Fluids 36, 095140, 2024; arXiv 2310.03415)](https://arxiv.org/abs/2310.03415) — the −5/3 Kolmogorov luminance cascade (β=1.67±0.13), the 4.5–15 cm scale range, 14 eddies, the Batchelor −1 fine-scale crossover
- [Björn Ottosson — A perceptual color space for image processing (OKLab)](https://bottosson.github.io/posts/oklab/) — the OKLab/OKLCh matrices + the perceptual-interpolation rationale
- [OKLCH makes better gradients — Blue Monkey Makes](https://bluemonkeymakes.com/articles/oklch-makes-better-gradients) — the muddy-midpoint kill / hue-arc travel
- [Oil Painting Style Rendering Based on Kuwahara Filter (IEEE, 2019)](https://ieeexplore.ieee.org/document/8772035) — multi-scale anisotropic Kuwahara + saliency-controlled kernel + impasto bump-mapping
- [A Van Gogh inspired 3D shader methodology (Sharma thesis)](https://core.ac.uk/download/pdf/147237812.pdf) — impasto + brush-stroke transfer
- [Olsen — Fluid Simulation as a Tool for Painterly Animation (Northwestern)](https://users.cs.northwestern.edu/~sco590/npr/van_gogh.pdf) — flow-field stroke alignment, Starry-Night vector fields
- [Inigo Quilez — articles / procedural palettes](https://iquilezles.org/articles/) — cosine palettes, gradient noise, filterable procedurals
- [The Book of Shaders — Noise](https://thebookofshaders.com/11/) — fBm / domain-warp foundations
- [ParamExplorer — exploring parameters in generative art (arXiv 2512.16529)](https://arxiv.org/pdf/2512.16529) — the fragmented-aesthetic-region / degeneracy-curation discipline
- [Art Blocks — generative art primer (Curated)](https://www.curated.xyz/editorial/collecting-the-algorithm) — hash-to-traits + curated-quality model
- [WebGPU Hits Critical Mass — All Major Browsers Now Ship It (webgpu.com)](https://www.webgpu.com/news/webgpu-hits-critical-mass-all-major-browsers/) — the Baseline-January-2026 fact
- [WebGPU 2026: 70% Browser Support (byteiota)](https://byteiota.com/webgpu-2026-70-browser-support-15x-performance-gains/) — the ~70% global / ~85% desktop / ~60% mobile support numbers
- [The 'Apple Style' Explained: Mesh Gradients in CSS (Nine Hub)](https://nineproo.com/blog/mesh-gradients-backgrounds) — the OpenAI/"Ethereal-Glow" mesh-gradient reference register
- glass-ui internal (read VERBATIM at HEAD): `docs/tranches/AX/research/{aurora-synthesis.md, aurora-README.md}`, `src/components/custom/aurora/{Aurora.vue, constants/shaders/*, composables/atoms.ts, composables/color.ts}`, `tests-visual/aurora-painterly-statistics.spec.ts`, `tests-visual/fixtures/starry-night-crop.png`, `docs/tranches/AX/audit/inventory/W43-fourier-field-SOTA.md` (the exemplar shape), `docs/tranches/AY/audit/hardening/H-aurora.md` (the sibling impl-scope red-team)
