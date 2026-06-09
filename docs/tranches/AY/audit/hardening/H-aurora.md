# H-aurora — adversarial hardening of the Aurora SOTA lane (AY.W-AUR1..4)

**Lane** H-aurora · **Verdict** GAPS-FOUND (+ one NOT-COHESIVE structural defect)
· **Source-grounded** against `src/components/custom/aurora/**` at HEAD (`at-dock-convergence`),
the AX W07-W14/W38/W47 wave docs, `W43-fourier-field-SOTA.md`, the AY plan + AUDIT-LEDGER + PROMPT-CORPUS.

> RED-TEAM thesis: the AX machinery is real and the OKLAB/OKLCH migration + atoms-door simplification
> are GENUINELY DONE — so two of W-AUR2's three objectives are already landed and the wave as written is
> partly a no-op. The actual unmet bar is the ARTISTIC one ("stunning/arresting/van-Gogh"), and the AY
> plan does NOT operationalize it any better than AX did — it re-states an unfalsifiable goal and points
> at the SAME conservative "not-flat" statistics gate that cannot measure beauty. Separately, the WebGPU
> axis the AY plan carries (W-AUR1 "WebGPU compute" research + W-AUR3 "WebGPU path") is SCOPE-CONFUSED:
> the README/AX.W14 already DECIDED WebGPU is gated OFF and the multi-pass painterly half is excised, so
> re-opening "WebGPU path" as an impl gate either re-litigates a closed decision or ships dead scaffold.

---

## Finding 1 (NOT-COHESIVE) — the WGSL/WebGPU twin is a medium-LESS smooth-pole renderer; the comment lies about parity

`aurora.wgsl.ts` (235 lines) `fs_main` (`aurora.wgsl.ts:215-230`) renders ONLY: `domainWarp` →
`nucleiField` → `samplePalette` → breath → `aces` → `linearToSrgb`. It has:
- NO medium dispatch (grep for `mediumOil|mediumVangogh|mediumOilPastel|mediumCrayon|mediumPastel|mediumWatercolor|uMedium|profileFor` in the WGSL → **zero hits**),
- NO brush engine (the 366-line `brush.glsl.ts` has no WGSL twin),
- NO structure-tensor / flow / cursor-warp / impasto-relight / grain.

The GLSL path is ~1000 lines of medium/brush (`mediums.glsl.ts` 463 + `brush.glsl.ts` 366 + `flow.glsl.ts` 95
+ `composition.glsl.ts` 65 + `tonemap.glsl.ts` 14). The WGSL twin is the smooth ATMOSPHERIC POLE ONLY.

The defect is the COMMENT, not (only) the gap. `aurora.wgsl.ts:226` reads
`// (The WebGPU smooth pole; the painterly mediums run the W7c multi-pass passes.)` — but per
`gpuRuntime.ts:14-20` the **W7c multi-pass scaffold was EXCISED (zero consumers, AX.W14)**. So the
comment points at a DELETED path; the painterly mediums run NOWHERE on WebGPU. `aurora.frag.ts:5`/`README` §"WebGPU"
both claim the WGSL draws "the SAME single-pass aurora" — it does NOT (the GLSL single-pass path
includes the full medium dispatch at `aurora.frag.ts:378-383`; the WGSL omits it). This is a parity
half-truth: same NUCLEI/PALETTE field, NOT the same painted image.

Mitigating (why this is not a silent ship): `WEBGPU_PARITY=false` (`renderMode.ts`) so a capable machine
is served the WebGL2 painterly path, never the reduced WGSL twin (README:424-438 discloses this as a
"KNOWN LIMITATION"). So no consumer silently downgrades TODAY. But the AY plan re-opens this — see Finding 2.

## Finding 2 (GAPS-FOUND) — W-AUR1/W-AUR3 WebGPU scope re-litigates a CLOSED decision; risks resurrecting dead scaffold

The AY plan (`AY.md:55,57`) carries WebGPU as live scope: W-AUR1 research = "WebGPU compute" and W-AUR3
hard gate = "...WebGPU path." But AX.W14 (`AX.W14-webgpu-painterly-parity-or-excise.md` title + the §4
note-14 "DELETE-the-auto-default disposition; the de-facto EXCISE answer") ALREADY decided:
1. the ONLY architectural reason for WebGPU is the multi-pass painterly half (Gaussian-smoothed tensor +
   anisotropic Kuwahara + LIC + stable-fluids wake) — `README:397-399`, `DESIGN.md:195`;
2. that scaffold was EXCISED as substrate-without-consumer (`gpuRuntime.ts:14-20`);
3. `WEBGPU_PARITY` stays `false`; restoration is "ONLY for the OPT-IN Kuwahara painterly finish over a
   parity-floor field, never to auto-default a capable machine" (`README:430-434`).

So "WebGPU path" as a W-AUR3 IMPL gate is under-specced AND scope-confused: either (a) it means
re-introduce the excised multi-pass scaffold — which violates the ≥2-consumer overfitting bar UNLESS a
real consumer (a hero route) demands the Kuwahara finish, in which case the consumer must be NAMED; or
(b) it means "ship the smooth single-pass WGSL twin by default" — which the AX.W14 verdict explicitly
forbids (no capable machine silently downgrades to the reduced twin). The AY plan names neither. **A
"WebGPU path" gate with no named consumer and no parity definition is exactly the dead-scaffold the
no-overfitting precept + AX.W14 §0 ("excise or fail explicitly") forbid.**

The clean disposition: W-AUR1's research brief must DECIDE WebGPU's fate first (resurrect-with-named-consumer
vs formally retire the twin + delete `aurora.wgsl.ts`/`gpuRuntime.ts`/the WGSL splices/`WEBGPU_PARITY`).
Carrying a half-built WGSL twin AND a "WebGPU path" impl gate without that decision is the worst of both.

## Finding 3 (GAPS-FOUND) — "stunning arresting gradient-art" has NO falsifiable acceptance criterion; the AY plan inherits AX's unmet bar verbatim

PROMPT-CORPUS #6 (`PROMPT-CORPUS.md:41-45`) wants: "perfect style/visual-detail; ...oil-pastel mode =
painterly van-Gogh-redolent atomic brush strokes, depth + variation; landscape/skyscape +
OpenAI-gradient reference, bettered procedurally; **stunning arresting gradient-art backdrops**." The
AUDIT-LEDGER (`AUDIT-LEDGER.md:25`) honestly marks this PARTIAL: "the 'stunning gradient-art / van-Gogh
brush' bar NOT met."

The only RENDER-based gate is `proof:aurora-painterly-statistics` (`tests-visual/aurora-painterly-statistics.spec.ts`).
Its four floors (`spec:45-48`) are: gap-fraction ≥ 4%, density-variance ≥ 25, chroma ≥ 16,
media-delta ≥ 6. These are NOT-FLAT / NOT-PASSTHROUGH / NOT-GREY discriminators — they separate "a real
painterly render" from "a flat gradient or a shared-body passthrough." **They do NOT measure
ARRESTING.** A noisy, muddy, busy render that looks like static can pass all four floors. The spec's own
header admits this: it operationalizes "stunning" into "an UNATTENDED run can close on" — i.e. it is a
floor for the autonomous loop, NOT the artistic bar. The DUAL-TIER close (`spec:29-32`) makes the human
side-by-side audit the actual "stunning" judge — but **there is no captured DELTA artifact of the
painterly mediums at all**. Every committed aurora screenshot
(`AX/audit/visual/W18-aurora-desktop-{light,dark}.png`, `W38-aurora-{after,studio}-*.png`) shows the
SMOOTH "Sky" preset (a pleasant pastel wisp) — NONE shows the van-Gogh / oil-pastel / oil-impasto medium
full-bleed. So the "stunning" claim is untested at the visual-truth layer per the cardinal lesson (a
green statistics gate over an unaudited render is precisely the green-structure-over-unvalidated-render
risk the spec's OWN header (`spec:6-7`) names).

W-AUR3's gate ("`proof:aurora-painterly-statistics` (real-GPU) MEET the stunning bar; live capture")
re-uses the SAME unfalsifiable phrasing — it does not define what "MEET the stunning bar" measures BEYOND
the four AX floors that the ledger already says do not meet it. **This is a CHRONIC-MISS: the artistic
bar was unmet at AX close, and the AY plan re-states it without a new measurable criterion or a captured
reference comparison.**

## Finding 4 (GAPS-FOUND) — `proof:aurora-vangogh-preset` is a SOURCE-TEXT gate, not a render gate; it cannot detect a regression that flattens the look

`proof:aurora-vangogh-preset.mjs` (`:35-44` `stripComments` + grep) asserts van-Gogh is "not a
passthrough" by INSPECTING THE SHADER SOURCE STRING — it greps that `mediumVangogh`'s body is not
`return mediumOil(...)`, that `profileFor(MEDIUM_VANGOGH,…)` sets `shapeType=4`, `impastoFloor=1.0`,
sparse density, `energyGrade=1.0`. This is a structural improvement over the OLD gate (which passed over
a literal passthrough — `:5-9`) BUT it is still a TEXT gate: a profile field could be tuned to a value
that compiles, passes the text assertions, yet renders flat or muddy. It "bite-checks" only the
passthrough revert + the buried-branch move (`:27-28`), not the VISUAL outcome. The render truth is
entirely on `proof:aurora-painterly-statistics` (Finding 3's conservative floors). So between the two:
one gate checks the source SAYS van-Gogh, the other checks the render is NOT-FLAT — neither checks it is
GOOD. The 18 `proof:aurora-*` gates (gate count verified) give a false sense of artistic coverage.

## Finding 5 (GAPS-FOUND, scope-overlap) — W-AUR2's "FULL OKLAB/OKLCH migration" + "simplify the options set to atoms" are ALREADY LANDED; the wave is partly a no-op

- **OKLAB/OKLCH is fully migrated in-shader.** `samplePalette` routes through the shared
  `samplePaletteRamp` (OKLab-rectangular + OKLCh hue-arc, `composition.glsl.ts:21`); `saturate3` is
  OKLCh chroma-scale (`aurora.frag.ts:335-339`); `brokenColorJitter` is OKLCh hue/chroma jitter
  (`:322-330`); `paintOver` composites overlapping strokes in OKLab (`DESIGN.md:194`); the legacy sRGB
  YIQ hueShift matrix is DELETED (`aurora.frag.ts:308` "the sRGB YIQ hueShift matrix is DELETED"). The
  ONLY sRGB lerp is the palette ENDPOINTS baked CPU-side to linear-sRGB (the Aras precompute pattern,
  `composition.glsl.ts:9`) — the INTERPOLATION is perceptual. **There is no in-shader sRGB color lerp
  to migrate.** W-AUR2's headline objective is DONE (gated by `proof:aurora-oklch-interp` +
  `proof:aurora-space-gamma`).
- **The atoms-door simplification is DONE.** `composables/atoms.ts` (`AuroraAtoms`, `:89-127`) is
  EXACTLY the ≤7-atom door W-AUR2 asks for — COLOR (seed+harmony+colorEnergy), ZONES (count+arrangement),
  NOISE (one knob), MEDIUM(+texture), MOTION, interactivity. The user's named "mood" is ALREADY folded
  into `colorEnergy`'s `temperatureShift` (`atoms.ts:151-155,327-330`) — so W-AUR2's literal
  "(seed/harmony/mood/medium/zones/motion)" atom list is STALE (it lists `mood` which was deliberately
  collapsed into `colorEnergy`). Gated by `proof:aurora-atoms-roundtrip` (TOTAL + DEFAULT-PRESERVING).
- **`derive-color` exists.** `deriveAurora` + the W5 `DeriveAuroraOptions` superset (harmonies + easing +
  temperature) is exported (`index.ts:48-56`) and consumed by the atoms COLOR door. W-AUR2's "a
  derive-color variant" is present — though NOTE it is a COMPOSABLE, not an `Aurora.vue` prop/variant
  (no `variant` prop exists on the component — verified). If W-AUR2 means a one-prop `<Aurora derive-color>`
  ergonomic shortcut, that is the only net-new sliver; it must be specced as such, not as "FULL migration."

Net: W-AUR2 as written triple-counts already-landed work. The wave must be RE-SCOPED to its actual
residue: (a) the stale `mood` atom mention struck, (b) whether a `derive-color` Aurora PROP is wanted vs
the existing composable, (c) the real residue is the ARTISTIC bar (Findings 3/4), not the migration.

## Finding 6 (GAPS-FOUND) — W-AUR1 "32-agent research" has NO research brief and no path-forward bar; the artefact does not exist

`AY.md:55` W-AUR1 hard gate: "research doc with ≥N cited techniques + a ranked path-forward" — the **≥N
is a literal placeholder** (no number), and there is NO `aurora/RESEARCH.md` at HEAD (verified: `find
... RESEARCH.md -path "*aurora*"` → NONE). The AY tranche dir has only `AY.md`, `AY-DRAFT.md`, `audit/`.
The "32-agent" count is the only concrete spec; the BRIEF (what the 32 agents investigate, against what
reference corpus, with what acceptance bar for "path-forward") is absent. By contrast the fourier-field
SOTA research (`W43-fourier-field-SOTA.md`) is the EXEMPLAR of a real research artefact — cited
techniques, a verdict axis-by-axis, an implementable recipe, sources. W-AUR1 must produce that SHAPE for
aurora: the reference corpus (OpenAI-gradient + landscape/skyscape + Starry-Night crop already committed
at `tests-visual/fixtures/starry-night-crop.png`), the ranked techniques, and crucially a DEFINED "stunning"
acceptance bar (the gap in Finding 3) BEFORE any impl wave consumes it. A 32-agent sweep with no brief
and a `≥N` placeholder gate is process theatre.

## Finding 7 (GAPS-FOUND, minor) — README §"WebGPU" + DESIGN.md carry stale "W14 restoration" language that contradicts the EXCISE outcome

`README:432-434` says the WebGPU "restoration wave is AX.W14" — but AX.W14 RAN and its verdict was the
"de-facto EXCISE answer" (the multi-pass scaffold deleted). So the README points at a wave that DID NOT
restore — it excised. `DESIGN.md:195-203` still describes the multi-pass Kuwahara/LIC/wake as a staged
"AW.W7 WebGPU branch" as though pending. This is forward-looking docs describing a deleted path — a
doc-vs-source drift that W-DOC1 (research-backed README) must reconcile, and that compounds Finding 1's
comment-lie. (Memory rule "greenfield no meta" + the doc-currency precept.)

---

## Chronic misses (deferred/missed across ≥2 passes)

1. **The artistic "stunning/arresting/van-Gogh-congruent" bar** — unmet at AX close (AUDIT-LEDGER:25,66),
   re-stated unfalsifiably in AY W-AUR3 with no new measurable criterion and NO captured painterly-medium
   DELTA. Spans AW (the "green-structure-over-unvalidated-render" cardinal lesson) → AX (operationalized
   to NOT-FLAT floors) → AY (inherited verbatim).
2. **The WebGPU parity question** — opened AW.W7, "resolved" by excise at AX.W14, re-opened as live impl
   scope in AY W-AUR1/W-AUR3 without naming a consumer or a parity definition. The WGSL twin sits
   half-built (medium-less) across three tranches.
3. **Research-backed aurora README** — DEFERRED (AUDIT-LEDGER:33 "aurora/blob/dock READMEs not
   research-backed"); the existing README carries stale W14-restoration language (Finding 7).

---

## Convergence criteria (the acceptance bar for this lane "perfected")

Aurora is PERFECTED when:
1. **A DEFINED, falsifiable "arresting" bar exists** beyond the four NOT-FLAT floors — e.g. a committed
   reference-comparison metric (LPIPS/SSIM or a histogram/structure-tensor-coherence comparison) against
   the `starry-night-crop.png` + an OpenAI/skyscape reference, with a numeric threshold AND a captured
   side-by-side DELTA artifact of EACH painterly medium (van-Gogh, oil-pastel, oil-impasto, crayon)
   full-bleed in both light/dark, committed under `docs/tranches/AY/audit/visual/`.
2. **The WebGPU twin is DECIDED** — either formally RETIRED (delete `aurora.wgsl.ts`, `gpuRuntime.ts`,
   the WGSL splices, `WEBGPU_PARITY`, the WebGPU gates; README/DESIGN reconciled) OR resurrected WITH a
   named ≥1 consumer route demanding the Kuwahara finish + a stated parity definition. No half-built
   medium-less twin survives close.
3. **W-AUR2 is re-scoped** to its actual residue (the OKLAB/OKLCH migration + atoms door + derive-color
   composable are struck as DONE; only a `derive-color` PROP-ergonomic, if wanted, remains).
4. **W-AUR1 ships a real research artefact** in the `W43-fourier-field-SOTA.md` shape (brief + reference
   corpus + ranked techniques + the defined acceptance bar from (1)), the `≥N` placeholder replaced with
   a concrete count.
5. Source comments + README + DESIGN carry NO stale/contradictory parity or restoration claims.

---

## Wave-spec inputs (material a fully-authored wave spec needs)

### Re-author W-AUR1 (research) — the brief
- **Defect**: `AY.md:55` hard gate has a `≥N` placeholder; no `aurora/RESEARCH.md` exists; no defined
  "stunning" bar.
- **Objective**: produce `src/components/custom/aurora/RESEARCH.md` in the `W43-fourier-field-SOTA.md`
  shape: (a) reference corpus = `tests-visual/fixtures/starry-night-crop.png` + a committed
  OpenAI-gradient + a landscape/skyscape plate; (b) ranked techniques bettering the current single-pass
  WebGL2 painterly engine; (c) the WebGPU resurrect-or-retire decision with named consumer; (d) THE
  DEFINED ARRESTING METRIC (replaces Finding 3's gap).
- **Edit sites**: new `aurora/RESEARCH.md`; `AY.md:55` (replace `≥N`).
- **HARD GATE**: `RESEARCH.md` present with ≥12 cited techniques, a ranked path-forward table, a
  WebGPU decision row, AND a concrete arresting-metric definition with a numeric threshold (evidence:
  doc-presence + the metric reproducible against the committed reference plates).

### W-AUR-PAINTERLY (impl, supersedes W-AUR3's "stunning") — the arresting bar
- **Defect**: AUDIT-LEDGER:25,66 "van-Gogh bar NOT met"; no captured painterly-medium DELTA; the
  statistics gate (`spec:45-48`) measures NOT-FLAT, not arresting.
- **Objective**: tune the van-Gogh / oil-pastel / oil-impasto mediums against the reference plates to
  MEET the W-AUR1 arresting metric; capture the DELTA.
- **Edit sites**: `mediums.glsl.ts` (`profileFor` van-Gogh/oil-pastel cases :256-300, `paintStrokeMedium`
  :399-429), `brush.glsl.ts` (the comma/crescent SDF + impasto), the COLOR_ENERGY/atoms tuning
  (`atoms.ts:150-155`).
- **HARD GATE**: the new arresting metric ≥ threshold against `starry-night-crop.png` (real-GPU readback)
  + a committed paired BEFORE/AFTER/DELTA of EACH painterly medium full-bleed light+dark under
  `AY/audit/visual/` (evidence: the captured DELTA artifact, NOT a commit-message claim — the cardinal
  lesson). The four AX statistics floors STAY as the not-flat floor BELOW the new metric.

### W-AUR-WEBGPU-DECIDE (decision, supersedes W-AUR3's "WebGPU path")
- **Defect**: WGSL twin is medium-less (Finding 1); `aurora.wgsl.ts:226` comment references the deleted
  W7c path; AY re-opens "WebGPU path" with no consumer/parity definition (Finding 2).
- **Objective**: execute the W-AUR1 WebGPU decision — RETIRE or resurrect-with-named-consumer.
- **Edit sites (retire branch)**: delete `aurora.wgsl.ts`, `gpuRuntime.ts`, the WGSL splices in
  `procedural-color.glsl.ts`, `WEBGPU_PARITY`/`resolveRenderModeAsync` webgpu arm, the WebGPU gates
  (`proof:aurora-webgpu-render`, `proof:aurora-wgsl-equivalence`, `proof:aurora-noise-hash-equivalence`,
  `proof:webgpu-substrate-single` aurora clause); reconcile README:395-445 + DESIGN.md:195-203.
- **HARD GATE**: no dead WGSL scaffold survives (deletion proof: `grep -r aurora.wgsl` → 0 importers) OR
  the named consumer route renders the Kuwahara finish (captured) + a stated parity definition.

### W-AUR2 re-scope (the no-op strike)
- **Defect**: W-AUR2 (`AY.md:56`) triple-counts done work (OKLAB/OKLCH migration, atoms door,
  derive-color all landed — Finding 5); the atom list cites a stale `mood`.
- **Objective**: strike the landed items; reduce W-AUR2 to the `derive-color` PROP-ergonomic question
  ONLY (or retire the wave if the composable suffices).
- **Edit sites**: `AY.md:56` (re-scope); IF a prop is wanted: `Aurora.vue` (new `deriveColor?` prop +
  `defineProps`).
- **HARD GATE**: `AY.md:56` no longer claims the migration/atoms as net-new (doc reconciliation);
  `proof:aurora-oklch-interp` + `proof:aurora-atoms-roundtrip` cited as the EXISTING evidence the
  objective is already met.
