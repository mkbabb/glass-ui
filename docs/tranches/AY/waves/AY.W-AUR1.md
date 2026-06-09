# AY.W-AUR1 — Aurora research-consume: the falsifiable arresting metric + RESEARCH.md

**Wave** `AY.W-AUR1` · **Band** A (perfect-at-the-root) · **State** DEV-LANDED (the artefact set is STAGED at HEAD — see "Landed-at-HEAD" below; this wave's residue is the VERIFY + the AY.md row reconcile) · **Repo** glass-ui
· **Kind** research-consume (writes a research artefact + 3 reference plates + 1 metric harness; writes NO `src/` shader code)
· **Blocks** `AY.W-AUR-PAINTERLY` (consumes the arresting metric + the plates), `AY.W-AUR-WEBGPU-DECIDE` (consumes the §6 decision row), `AY.W-DOC1` (consumes the research-backed README content)
· **Depends on** `AY.W0-REGROUND` (the stale-ledger correction — Finding 5's strike of the migration/atoms as DONE)
· **Hardening inputs** `audit/hardening/H-aurora.md` (the impl-scope red-team), `audit/hardening/H-research-aurora.md` (the authored brief this wave CONSUMES), `audit/hardening/H-precept-drift.md` F4 (the `≥N`-placeholder defect)

---

## Defect (source-grounded, file:line)

Three concrete, verified defects:

1. **The hard gate has an unbindable threshold.** `AY.md:55` (the directive-disposition row) and the
   seed both carry the "aurora SOTA … arresting metric" ask; the underlying defect the seed names is the
   `≥N`-placeholder class — `H-precept-drift.md:108-115` (F4): the W-AUR1/W-BLOB1 hard gates read
   "research doc with **≥N** cited techniques" where `≥N` is a **literal placeholder**. Per
   `TRANCHE-AND-WAVE-SPEC.md §"Hard gate"` ("valid only when it can be verified by an artefact") an unbound
   threshold **can never fail** — it is not an evidence-backed gate. (Verified: `grep -n "≥N" AY.md` —
   the placeholder appears in the §0 disposition lineage; the W-AUR1 table row at `AY.md:144` already
   carries the concrete metric definition, so THIS wave's job is to make that definition REAL — a
   committed artefact + a runnable harness — not merely a table claim.)

2. **No `aurora/RESEARCH.md` exists.** Verified: `find … -name RESEARCH.md -path "*aurora*"` → **0 hits**
   (`H-aurora.md:135-137`). The aurora component dir ships `README.md` (702 lines), `DESIGN.md`, the
   shaders, the atoms — but NO `RESEARCH.md` in the `W43-fourier-field-SOTA.md` shape (the exemplar:
   reference corpus + ranked techniques + per-axis verdict + sources). The "32-agent research" the AY
   corpus names has a count but **no brief** — process theatre absent the artefact.

3. **The "stunning/arresting" bar is unfalsifiable; the only render gate measures NOT-FLAT, not arresting.**
   The single render-based gate `proof:aurora-painterly-statistics`
   (`tests-visual/aurora-painterly-statistics.spec.ts:45-48`) floors at gap-fraction ≥ 0.04,
   density-variance ≥ 25, chroma ≥ 16, media-delta ≥ 6. The spec's own header
   (`spec:41-44`) admits these are **NOT-FLAT / NOT-PASSTHROUGH / NOT-GREY discriminators tuned
   conservatively** — "a muddy busy static-noise render passes all four"
   (`H-research-aurora.md:26-28`). The `AUDIT-LEDGER.md:25` marks the bar PARTIAL: "the 'stunning
   gradient-art / van-Gogh brush' bar NOT met." This is a CHRONIC miss spanning AW → AX → AY
   (`H-aurora.md:160-163`): the artistic bar was unmet at AX close and the AY plan inherited it
   verbatim with no new measurable criterion.

The brief that closes all three is **ALREADY AUTHORED** — `H-research-aurora.md` carries the reference
corpus (§1), the 8 ranked techniques (§3), the 3 falsifiable reference-anchored metrics (§4), the
WebGPU decision (§6), and the dispatch (§7). This wave **CONSUMES that brief** into the on-disk
`RESEARCH.md` artefact + the runnable metric harness; it does NOT re-run a from-zero research sweep
(the technique set is FIXED in the brief — re-discovering it would be process theatre).

---

## Landed-at-HEAD (state correction — the artefact set is already STAGED; this is a VERIFY, not author-from-zero)

Re-verified against live HEAD (`at-dock-convergence`, `git status`): the W-AUR1 deliverables are
**already on disk and tracked (status `A` = staged)**, and the metric harness **runs green**. This wave is
NOT a forward author-from-zero pass — it is the VERIFY that the staged artefacts meet the gate + the
AY.md-row reconcile. The edit-sites table below is annotated DONE / VERIFY accordingly.

| Artefact | HEAD state | Evidence |
|---|---|---|
| `src/components/custom/aurora/RESEARCH.md` | **STAGED** (304 lines, the `W43`-shaped artefact) | `git status` → `A`; §0.1 records the landed substrate, §3 the ranked table, §3.1 the citation-anchor count, §4 the 3 numeric bands, §6 the RETIRE decision row |
| `tests-visual/fixtures/aurora-ref-{mesh-gradient,skyscape,oil-pastel}.png` | **STAGED** (all 3) | `git status` → `A` ×3 |
| `scripts/aurora-arresting-metric.mjs` | **STAGED** + RUNS GREEN | `node scripts/aurora-arresting-metric.mjs tests-visual/fixtures/starry-night-crop.png` → `C=70.67`, `A=0.8324`, `β=−1.6719` (`§4.3 in-band: YES`) — the slope recovers Ma et al.'s β=1.67±0.13 on the ground-truth painting |
| `package.json` `proof:aurora-arresting-ref` | **PRESENT** at `package.json:620` (NOT a new add) | `grep -n "aurora-arresting-ref" package.json` → `620:` |
| `AY.md:144` W-AUR1 row | **RECONCILED** (says "14 cited techniques" + the 3 numeric bands + RETIRE) | `grep -n "≥N" AY.md` → **0** (the placeholder is already struck) |

**Count reconciliation (the one inconsistency to resolve).** The gate floor is **≥12** (the spec body's
threshold); the artefact actually carries **14** distinct citation anchors (RESEARCH.md:141 "That is
**14 distinct citation anchors** (≥12)", and the AY.md:144 row states "14 cited techniques"). Both are
true — 14 ≥ 12 — but the verify must read the gate as **≥12 (the binding floor), 14 achieved**; the row's
"14" is the actual, the spec's "≥12" is the floor that can never read as an unbound `≥N`. The VERIFY
confirms the artefact's "14 ≥ 12" claim resolves to 14 anchors in §Sources.

**What is genuinely LEFT for this wave** (the residue, not the bulk): (1) the gate-VERIFY that the staged
artefacts pass each of the five HARD GATE clauses on a fresh run; (2) confirm the `AY.md:144` row + the
`§0.1`-SHIPPED rows stay reconciled (no stale label re-introduced — the `proof:ay-w0-reground` meta-gate
co-owned with `W0-REGROUND` / `W-AUR2`); (3) IF any plate is degenerate (a crop with no turbulence
structure that mis-anchors §4.3), re-source it per the Named-successor branch. The harness recovering
β=−1.67 on Starry Night is the ratify the gate already passes — the wave's burden is verify-it-holds, not
build-it.

---

## Goal criterion (the aim)

After this wave, "stunning/arresting" is no longer a vibe — it is a **reproducible number with a
numeric band, anchored to committed reference plates**. A fresh reader of
`src/components/custom/aurora/RESEARCH.md` can: (a) read what aurora is measured AGAINST (the 4-plate
corpus); (b) read the ranked path-forward (≥12 cited techniques, each with a SOTA source + the
falsifiable evidence that proves it landed); (c) read the resolved WebGPU resurrect-or-retire decision
with a named consumer or a retirement plan; and (d) **run a harness** that computes the arresting
metric against `starry-night-crop.png` and prints the reference-anchor numbers that bound the
downstream `W-AUR-PAINTERLY` impl wave. The downstream painterly tuner has a falsifiable target, not a
re-stated vibe.

## Completion criterion (the artefact)

The HARD GATE below verifies. `RESEARCH.md` is present in the exemplar shape with the technique count,
the ranked table, the WebGPU row, and the 3 numeric metric bands; the 3 missing reference plates are
committed; the metric harness **runs and prints the reference-anchor numbers** against the committed
plates (the metric is not just DEFINED in prose — it is REPRODUCIBLE, the difference between an
artefact gate and an "API exists" gate).

---

## Objective — CONSUME the authored brief (not a from-zero re-run)

Produce **`src/components/custom/aurora/RESEARCH.md`** in the `W43-fourier-field-SOTA.md` shape, sourced
verbatim from the already-authored `H-research-aurora.md` brief. Concretely:

1. **§1 reference corpus — commit the 3 missing plates.** `starry-night-crop.png` EXISTS at HEAD
   (verified: 9030 bytes at `tests-visual/fixtures/starry-night-crop.png`). Commit the 3 named-missing
   plates under `tests-visual/fixtures/` (the existing fixtures precedent — NOT shipped in the library
   bundle):
   - `aurora-ref-mesh-gradient.png` — an OpenAI/"Ethereal-Glow" mesh-gradient crop (the smooth/wispy
     default target; the lower-colorfulness pole);
   - `aurora-ref-skyscape.png` — a landscape/skyscape atmospheric-scattering crop (the zones+gradient
     target);
   - `aurora-ref-oil-pastel.png` — an oil-pastel/crayon scan with visible tooth + scumble (the K-M
     subtractive-mix chroma target).

2. **§3 ranked path-forward table.** Transcribe the 8 ranked techniques (T1 turbulence-cascade eddy/dab
   law, T2 colorfulness-anchored chroma, T3 structure-tensor/ETF coherence, T4 Kubelka-Munk oil-pastel,
   T5 anisotropic-Kuwahara finish, T6 Khronos PBR-Neutral tonemap, T7 seed→whole-scene + degeneracy
   curation, T8 cursor-flow interaction) into a table, each row carrying **{technique, SOTA source,
   falsifiable evidence, ROI/risk}**. Each technique cites ≥1 of the 17 sources in the brief's §Sources;
   the cited-technique count is **≥12** (the 8 ranked techniques + the ≥4 sub-techniques the brief names
   inline — DC-suppression, broken-color jitter magnitude, the 3-radius cascade spacing, the
   orientation-histogram pinwheel detector — each a distinct cited move; the gate counts citation
   anchors, not headline rows).

3. **§4 THE DEFINED ARRESTING METRIC (the headline — the gap this wave closes).** Author the 3
   reference-anchored metrics with NUMERIC bands (no `≥N`):
   - **§4.1 Hasler-Süsstrunk colorfulness band** — `C = σ_rgyb + 0.3·μ_rgyb` (rg=R−G, yb=½(R+G)−B).
     The named perceptual cutoffs are LOAD-BEARING (moderately 33 / averagely 45 / quite 59 / highly 82
     / extremely 109). The bar: measure C on `starry-night-crop.png` → that is the per-medium target;
     the van-Gogh/oil mediums must render C within **[reference−15, reference+25]**.
   - **§4.2 structure-tensor orientation-coherence band** — anisotropy `A = (λ₁−λ₂)/(λ₁+λ₂)` from the
     Gaussian-smoothed gradient outer-product; the van-Gogh medium's mean interior A sits in
     **[reference_A − band, reference_A + band]** measured off `starry-night-crop.png` (catches both the
     stroke-coherence landing AND the Kuwahara pinwheel-banding regression via the orientation
     HISTOGRAM spike).
   - **§4.3 radial luminance power-spectrum slope (the keystone)** — fit the log-log slope of the 2D-FFT
     radially-averaged interior luminance over the large-scale band; the bar is **slope ∈ [−1.85, −1.45]**
     (the −5/3 Kolmogorov target ± the Ma-et-al. measured spread β=1.67±0.13). This is the metric the
     four AX floors structurally CANNOT provide — it separates van-Gogh-congruent painterly (−5/3) from
     busy muddy noise (flat β≈0) from a flat gradient (β≫2).
   - **§4.4 the cardinal-lesson DELTA discipline** — record that the metrics are the UNATTENDED gate; the
     BINDING close (in the downstream impl wave) is a committed paired BEFORE/AFTER/DELTA of EACH
     painterly medium full-bleed light+dark under `AY/audit/visual/`.

4. **§6 the WebGPU resurrect-or-retire DECISION ROW.** Transcribe the brief's resolved verdict (the
   decision the sibling `H-aurora.md` Finding 2 demands): re-run the AX.W14 default-off calculus against
   the NEW **Baseline-January-2026** fact (~70% global support; the AX.W14 "~5% WebGL2-only" calculus
   predates it). The verdict: smooth default + core field STAY WebGL2 (zero-regression floor); the
   anisotropic-Kuwahara finish (T5) is the ONE multi-pass operator that justifies WebGPU — **resurrect
   ONLY if a named consumer route demands it (the W60 hero candidate); else formally RETIRE the
   medium-less WGSL twin** per `W-AUR-WEBGPU-DECIDE`'s retire-branch edit-sites. The decision row STATES
   which branch fires at AY close (the named consumer OR the retirement plan) — it does NOT carry the
   twin forward undecided (the worst-of-both `H-aurora.md` Finding 2 names).

5. **§7 the dispatch.** Transcribe the 6-cohort partition (Turbulence-prior / Color-fidelity /
   Stroke-coherence / Tonemap+compositing / Generative-robustness / WebGPU-decision+interaction), each
   with its angle + output, as the concrete replacement for the `≥N`-placeholder count.

6. **Mint the metric HARNESS** (the reproducibility leg — what makes §4 a real gate, not prose).
   `scripts/aurora-arresting-metric.mjs` computes §4.1 colorfulness + §4.2 structure-tensor anisotropy +
   §4.3 power-spectrum slope on an input PNG and prints the three numbers. Run against
   `starry-night-crop.png` it prints the reference-anchor triple that bounds `W-AUR-PAINTERLY`. This is
   the same harness the downstream `proof:aurora-arresting` spec will call on the live-GPU readback
   (substrate-with-consumer: this wave is consumer #1, `W-AUR-PAINTERLY` is consumer #2 — clears the
   ≥2-consumer bar).

---

## Edit-sites (exact)

| # | file | edit | HEAD state |
|---|---|---|---|
| 1 | `src/components/custom/aurora/RESEARCH.md` | the `W43-fourier-field-SOTA.md`-shaped artefact (§§above), sourced from `H-research-aurora.md` | **STAGED** (304 lines) — VERIFY the 5 gate clauses parse |
| 2 | `tests-visual/fixtures/aurora-ref-mesh-gradient.png` | the OpenAI mesh-gradient smooth-pole plate | **STAGED** — VERIFY harness anchors §4.1 lower-pole C (37.78 moderately) |
| 3 | `tests-visual/fixtures/aurora-ref-skyscape.png` | the atmospheric-scattering skyscape plate | **STAGED** — VERIFY non-degenerate |
| 4 | `tests-visual/fixtures/aurora-ref-oil-pastel.png` | the oil-pastel/crayon tooth+scumble plate | **STAGED** — VERIFY non-degenerate |
| 5 | `scripts/aurora-arresting-metric.mjs` | the §4 metric harness (colorfulness + structure-tensor anisotropy + power-spectrum slope on an input PNG; prints the 3 numbers) | **STAGED + RUNS GREEN** (β=−1.6719 in-band on Starry Night) |
| 6 | `package.json:620` | `"proof:aurora-arresting-ref": "node scripts/aurora-arresting-metric.mjs tests-visual/fixtures/starry-night-crop.png"` — the harness invocation that prints the reference-anchor triple | **PRESENT** at `:620` (already added) — VERIFY `npm run` resolves |
| 7 | `docs/tranches/AY/AY.md:144` | the W-AUR1 row's hard-gate text points at the committed `RESEARCH.md` + the `proof:aurora-arresting-ref` harness | **RECONCILED** — `≥N` already struck (`grep -n "≥N" AY.md` → 0); VERIFY the "14 ≥ 12" count + the 3 bands stay; **OVERLAP NOTE: W-AUR2 also edits `AY.md` (rows :55,:145) — distinct rows, sequence W-AUR1 then W-AUR2 (or vice-versa) on the shared file, no line-region conflict** |

**Out of scope (named, so the wave does not drift):**
- NO shader edits — `mediums.glsl.ts`, `brush.glsl.ts`, `atoms.ts`, `color.ts`, `tonemap.glsl.ts` are
  the downstream `W-AUR-PAINTERLY` edit-sites; this wave writes the TARGET, not the tuning.
- NO WebGPU deletions — `aurora.wgsl.ts`, `gpuRuntime.ts`, the `WEBGPU_PARITY` flag are the downstream
  `W-AUR-WEBGPU-DECIDE` edit-sites; this wave writes the DECISION ROW, the next wave EXECUTES it.
- The `proof:aurora-arresting` LIVE-GPU spec (`tests-visual/aurora-arresting.spec.ts`) is minted by
  `W-AUR-PAINTERLY` (it calls THIS wave's harness on the live readback); this wave ships the harness +
  the static-plate reference invocation only.

---

## House-keep guards (no precept drift)

- **No re-build of DONE work** (`H-aurora.md` Finding 5, `H-precept-drift.md` F1/F4): this wave does NOT
  touch the OKLAB/OKLCH migration, the atoms door, or `deriveAurora` — all SHIPPED (`composition.glsl.ts:21`,
  `atoms.ts:89-127`, `aurora.frag.ts:308`), struck as done by `W0-REGROUND` / `W-AUR2`. RESEARCH.md
  RECORDS them as the landed substrate axis (the brief's §0), it does not re-research them.
- **Greenfield-no-meta** (`H-precept-drift.md` chronic): RESEARCH.md carries NO "ported from" / version
  history / "AX deferred this" meta-language — it is a forward research artefact in the exemplar's voice.
- **No speculative shared subpath** — the metric harness lives in `scripts/`, not a published `/aurora`
  metric export; it is a build/test leaf, not library surface (the ≥2-consumer bar applies to library
  substrate, not to a CI harness).
- **The reference plates are fixtures, not bundle assets** — under `tests-visual/fixtures/` (the
  `starry-night-crop.png` precedent), NEVER imported into `src/` or shipped in `dist/`.

---

## HARD GATE (evidence-backed)

> **Gate state at HEAD: SATISFIED (verify-it-holds, not RED).** The artefact set is staged and the
> harness runs green (see "Landed-at-HEAD"). All five clauses below pass on a fresh run TODAY; this wave's
> close is the re-run + the AY.md-row VERIFY, not a build. Clause 4 is the load-bearing one — it is a
> runnable-harness gate (reproducible number), NOT a doc-presence claim.

`src/components/custom/aurora/RESEARCH.md` is present in the `W43-fourier-field-SOTA.md` shape and
carries ALL FIVE, EACH machine-checkable:

1. **≥12 cited techniques (14 achieved)** in a ranked path-forward table — each row carries a SOTA source
   + the falsifiable evidence that proves it landed. Evidence: the harvested-doc structure check (the
   ranked table parses; the §3.1 line "14 distinct citation anchors (≥12)" resolves to 14 numbered
   entries in §Sources). The floor is ≥12 — a concrete numeral, NEVER an unbound `≥N`; the artefact
   exceeds it at 14.
2. **A WebGPU resurrect-or-retire DECISION ROW** that STATES which branch fires at AY close (a named ≥1
   consumer route demanding the Kuwahara finish, OR the retirement plan + edit-site list) — re-run
   against the Baseline-2026 fact, NOT carried undecided. Evidence: the §6 decision row is present and
   names a branch.
3. **The 3 NUMERIC arresting-metric bands** defined: §4.1 colorfulness ∈ [ref−15, ref+25] (with the
   named Hasler-Süsstrunk cutoffs), §4.2 structure-tensor anisotropy ∈ [ref_A−band, ref_A+band], §4.3
   power-spectrum slope ∈ **[−1.85, −1.45]**. Evidence: the three bands are present with concrete
   numerals — NO `≥N`, NO unbound threshold.
4. **The metric is REPRODUCIBLE against the committed plates** (the load-bearing artefact distinction —
   NOT "the metric is defined in prose"): `npm run proof:aurora-arresting-ref` runs
   `scripts/aurora-arresting-metric.mjs` against `tests-visual/fixtures/starry-night-crop.png` and prints
   the reference-anchor triple (colorfulness C, mean anisotropy A, spectrum slope β) — and the printed
   slope sits in [−1.85, −1.45] (the paper's measured van-Gogh value ratifies the harness against the
   ground-truth painting; a harness that does not recover −5/3 on Starry Night itself is broken). The 3
   reference plates are committed under `tests-visual/fixtures/` (verified: `git status` shows the 3 new
   PNGs tracked).
5. **The `≥N` placeholder is struck** — `grep -n "≥N" docs/tranches/AY/AY.md` returns 0 hits on the
   W-AUR1 lineage; the W-AUR1 hard-gate text points at the committed `RESEARCH.md` + the
   `proof:aurora-arresting-ref` harness.

**The binding single condition (the close reads this):** RESEARCH.md present with ≥12 cited techniques +
a ranked path-forward table + a resolved WebGPU decision row + a NUMERIC arresting-metric definition
(the 3 bands), AND `npm run proof:aurora-arresting-ref` runs the harness against
`starry-night-crop.png` and prints a power-spectrum slope ∈ [−1.85, −1.45] (the metric is reproducible
against the committed reference plate, not merely asserted in prose). The `≥N` placeholder struck from
`AY.md`.

---

## Named successor (on miss)

- If the 3 plates cannot be sourced at the stated quality (a degenerate crop with no turbulence
  structure would not anchor §4.3): the wave commits the plates it CAN and names
  `W-AUR-PAINTERLY` as the successor that re-sources any deficient plate during tuning (the plates are
  measurement ground, replaceable per the fixtures precedent — not a library API).
- If the harness recovers a slope OUTSIDE [−1.85, −1.45] on Starry Night itself: that is a HARNESS bug
  (the FFT band or the luminance projection), NOT a research miss — the diagnostic-loop trigger fires
  and the harness is fixed before the wave closes (the harness MUST recover the paper's measured value
  on the ground-truth painting, else it cannot bound the downstream tuner).
- The WebGPU decision row's named-consumer branch depends on W60 binding the van-Gogh medium full-bleed;
  if W60 has not named the hero at AY close, the decision row fires the RETIRE branch (no half-built
  medium-less twin survives — the `H-aurora.md` convergence criterion 2).
