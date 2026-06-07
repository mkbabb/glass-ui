# AW.W4 — AURORA-PAINTERLY (the structure-tensor keystone + the van-Gogh / impasto / oil-pastel engine)

> **Numbering note:** W5 (OKLCh color core) opens BEFORE W4 by dependency — W4's van-Gogh/oil-pastel per-stroke jitter consumes the OKLCh `brokenColorJitter` seam W5 lands. The wave NUMBER ordering (W4 then W5) is not the EXECUTION ordering (W5 then W4's integration). The charter §2 open-order is fixed to match by the charter-AW fixer.

## 2. State

**Name**: W4 — AURORA-PAINTERLY (the genuinely-painterly engine — strokes that hug the forms)
**Opens after**: AW.W5 (OKLCh color core) lands — the van-Gogh broken-color and the oil-pastel scumble consume the OKLCh per-stroke jitter seam. The structure-tensor keystone itself is color-agnostic and could open at HEAD, but the van-Gogh/oil-pastel mediums want the OKLCh path, so the wave opens after W5.
**Agents**: 4 serial — AW.W4.1 (structure-tensor / ETF orientation field — the keystone), AW.W4.2 (real impasto — height→normal→relit), AW.W4.3 (van-Gogh atomic-stroke medium), AW.W4.4 (genuine oil-pastel medium). .1 is the dependency root; .3 and .4 consume .1's orientation field; .2 is the depth term .3/.4 both relight. All four touch the shader partials — they serialize in one shader worktree per §4a (NOT file-disjoint).
**Hard gate**: four born-RED gates green — `proof:aurora-tensor-field` (the structure-tensor eigen-decomposition matches a synthetic gradient field within tolerance + `strokeOrient:"tensor"` tracks the field gradient, not the global flow pattern), `proof:aurora-impasto-relight` (the fixed-RGB rim constant is gone from `paintOver`; a `uLightDir` sweep moves the catch-light), `proof:aurora-vangogh-preset` (the `vangogh` medium resolves its uniforms + the deterministic `renderAt(t)` bake is snapshot-blessed), `proof:aurora-oilpastel-medium` (the reworked oil-pastel bake is blessed + the WebGL2 single-pass path stays inside `profile:budget`). `typecheck` + `build` + the existing gate matrix stay green.
**Status**: planned

**Type:** IMPL (VISUAL — the user-mandated "genuinely oil-pastel-redolent" + "atomic brushstrokes congruent to real van Gogh"). Not publish-blocking (a shader/medium edit, not an API break — the `AuroraMedium` union gains `"vangogh"` additively).
**Scope source:** `docs/tranches/AW/aurora/PATH-FORWARD.md` §1 (the painterly engine — §1a keystone, §1b van-Gogh, §1c impasto, §1d oil-pastel), `docs/tranches/AW/waves/aurora-wave-seeds.md` W4/W5/W6/W7 (this wave consolidates the painterly arc the seeds split across four; the WebGPU multi-pass HALF of each — the smoothed multi-tap tensor and the anisotropic Kuwahara finish — defers to AW.W7-WebGPU), and the 32-agent SOTA research digest (`docs/tranches/AW/audit/research/aurora-digest.md` Lanes 1/2/6/7/8/9 — ETF + LIC + impasto + Kuwahara + the Starry-Night turbulence cascade).

**Precepts in force.** No legacy / no back-compat — the `vangogh` medium is a first-class member, NOT an "oil + swirl preset"; the faked fixed-RGB impasto rim (`brush.glsl.ts:173-178`) is RETIRED, not flagged-off; there is no `strokeOrient` default that keeps the old flow-only path as a hidden duplicate (the `flow` value stays as a named choice, the `tensor` value is the new path). Gestalt: derive stroke orientation from the color field's OWN gradient — the single biggest fidelity lever — rather than bolting more flow patterns onto `flowField`. DRY: reuse `bestOil`'s placement + the `curvedStroke` SDF (`brush.glsl.ts`) verbatim; only the direction source, the energy grading, and the height accumulation change. The structure-tensor finite-difference reuses the watercolor edge-mask's existing `sampleBase` taps (`mediums.glsl.ts:29-32`) — no new full-field recompute beyond the gradient already paid for. value.js-FREE: every edit is a GLSL string literal; the OKLCh per-stroke jitter consumes the W5 in-shader OKLCh path (the `OKLCH_MATRICES_GLSL` chunk), not a runtime-JS color call. KISS: a single-pass WebGL2 approximation of the tensor (small fixed-tap neighborhood) ships now; the smoothed multi-tap + Kuwahara is the WebGPU branch (AW.W7). The wispy-sky default (`DEFAULT_AURORA_CONFIG`, `presets.ts:148`, `medium:"smooth"`) is UNTOUCHED — the painterly mediums are opt-in.

## 2a. Goal criterion

This wave succeeds if the aurora's brushwork reads as genuine paint that *follows the forms* rather than procedural texture laid over a gradient: stroke orientation derives from the color field's own structure-tensor minor eigenvector (the edge-tangent flow) so strokes hug the color zones like real Van Gogh contours; a first-class `medium:"vangogh"` paints energy-graded atomic strokes (long confident strokes in bright passages, short dabs in the darks, per the Starry-Night Kolmogorov/Batchelor cascade) with OKLCh per-stroke pigment variation; impasto is a real accumulated paint-height field lit by a movable directional source (not a faked fixed rim); and `medium:"oil-pastel"` deposits pigment on the paper tooth with scumble and a waxy burnish film. The reader's test: with `strokeOrient:"tensor"`, the mean stroke orientation tracks the field gradient (not the global `flowField` pattern); the `vangogh` bake shows directional brushwork with NO subject matter (the "source image" is the generated nuclei field); sweeping `uLightDir` moves the impasto catch-light; the oil-pastel mode shows paper through a broken upper layer. The cheap single-pass approximation ships on WebGL2; the smoothed/Kuwahara full quality lands on AW.W7.

## 3. Scope

1. **The structure-tensor / ETF orientation field (the keystone — AW.W4.1).** Add a `structureTensorField()` GLSL helper: Sobel-derivative `sampleBase` over a small fixed-tap neighborhood → `(Gx, Gy)`; form the structure tensor `J = [[Gx·Gx, Gx·Gy],[Gx·Gy, Gy·Gy]]`; eigen-decompose (closed-form 2×2) → the minor eigenvector (the stroke direction) + the coherence `A = (λ1−λ2)/(λ1+λ2)`. Thread it into `flowField` (`flow.glsl.ts:6`) as a new `uFlowPattern` `"tensor"`/`"etf"` branch and into `bestOil`'s `flow` arg (`brush.glsl.ts:206-210`) behind a `strokeOrient: "flow" | "tensor"` uniform switch. The single-pass small-tap form ships now; the Gaussian-smoothed multi-tap form is the AW.W7 WebGPU pass.

2. **Real impasto — height field → normal → relit (AW.W4.2).** Retire the faked fixed-RGB edge rim (`brush.glsl.ts:173-178`, the phantom upper-left light). Accumulate a per-pixel **paint height** across the four stroke layers in `mediumOil` (coverage × per-layer thickness, perturbed by the existing bristle/streak fBm for ridges/grooves; canvas tooth = base height). Derive a normal from the height gradient via `dFdx`/`dFdy` (already in-pattern — `fwidth` is used for AA). Apply diffuse + Blinn specular from a new movable `uLightDir`/`uLightColor`, in linear light *before* `aces()`. Thin strokes inherit canvas roughness; thick impasto overrides it. `uLightDir` becomes the interactive axis AW.W8 consumes (cursor-as-light).

3. **The van-Gogh atomic-stroke medium (AW.W4.3).** A first-class `medium:"vangogh"` on the `AuroraMedium` union (additive). It composes: direction from the AW.W4.1 ETF field (not the global flow pattern); energy-graded length + layer density (modulate by local luminance of `sampleBase` — big confident strokes in bright/energetic passages, short dabs in the darks; coherence `A` drives length so flat zones get stubby dabs); per-stroke OKLCh pigment jitter (small ΔL, Δh, ΔC seeded per cell, via the AW.W5 OKLCh broken-color path); real impasto (AW.W4.2) for depth. No subject matter — the "source image" is the generated nuclei field, so strokes trace its iso-bands. Reuses `bestOil` placement + `curvedStroke` SDF (`brush.glsl.ts`) verbatim.

4. **Genuine oil-pastel — deposition + scumble + waxy film (AW.W4.4).** Rework `mediumCrayon` (`mediums.glsl.ts:75-122`) from a tooth-multiply into a pigment-on-tooth deposition model: tooth-occlusion deposition (pigment on peaks, skips valleys — light pressure shows paper, heavy fills it, reading the AW.W4.2 paper-height field); a **scumble** broken-upper-layer pass (coverage < 1 letting the lower color show through); a **waxy specular film** (low-roughness broad lobe, sheen growing with layer count = burnish, distinct from oil's sharp glint). Oriented along the AW.W4.1 ETF field, OKLCh broken color. Rename the demo-facing label `crayon → oil-pastel` (the medium key MAY stay `crayon` internally if the `uMedium==4` route is load-bearing in the bridge — record the decision; no parallel duplicate medium).

5. **The four born-RED gates** — `proof:aurora-tensor-field`, `proof:aurora-impasto-relight`, `proof:aurora-vangogh-preset`, `proof:aurora-oilpastel-medium` (§6). Each authored on the house gate template (`scripts/proof-aurora-space-gamma.mjs`), registered `["local","ci"]` only after its fold lands.

6. **DESIGN.md §1/§7 update** — document the structure-tensor keystone (the four mediums consume it), the impasto height→normal→relit path (the fixed-rim RETIRE), the energy-graded van-Gogh cascade, the oil-pastel deposition model, and the WebGL2-single-pass-now / WebGPU-full-quality-later split (the AW.W4→AW.W7 handoff for the smoothed tensor + Kuwahara).

7. **Re-bake the preset thumbnails** affected by the painterly mediums (the Oil-* and Crayon-* presets become van-Gogh/oil-pastel; the Sky/atmospheric presets are unaffected). Re-run the demo thumbnail bake; refresh `docs/tranches/F/audit/W5-aurora-profile.json`.

The anisotropic Kuwahara finishing operator and the Gaussian-smoothed multi-tap tensor are EXPLICITLY OUT of this wave — they are multi-pass and ship on the AW.W7 WebGPU branch (no-op on WebGL2). The **LIC (line-integral-convolution) smear** — the second half of the cited "ETF + LIC" technique (the digest's Lane 1/2 stroke-following operator) — is likewise OUT: this wave lands the ETF orientation field (the direction source); the LIC convolution that smears the field ALONG that orientation is a multi-tap multi-pass operator the single-pass WebGL2 fragment shader cannot express, so it ships as an AW.W7 multi-pass fold beside the smoothed-tensor + Kuwahara passes. ETF-without-LIC here is honest — the orientation field is the load-bearing fidelity lever; the LIC smear is the WebGPU finish. The optional Kubelka-Munk pigment-mixing fold (PATH-FORWARD §1e) is DEFERRED with a trigger (see §10).

## 3a. Triumvirate Dispatch

A triumvirate (research + plan augment + redress) is mandatory — the orchestrator may NOT redispatch the failing unit alone — when:

- **The single-pass tensor approximation reads worse than the hand-authored flow.** The small fixed-tap structure tensor is an APPROXIMATION of the smoothed multi-tap form; if `strokeOrient:"tensor"` on a real preset produces noisier or less-coherent stroke fields than the existing `flowField` (the tensor is sensitive to high-frequency nuclei noise without the Gaussian smoothing), the redress is whether to (a) pre-blur `sampleBase` before the Sobel, (b) clamp the coherence floor so low-coherence regions fall back to the flow direction, or (c) BOOK the full-quality tensor to AW.W7 and ship `tensor` as a WebGPU-gated mode. This is a quality-vs-substrate decision, not a local tap-count tweak — halt and triumvirate.
- **The impasto height accumulation breaks the budget.** Accumulating a height field across four stroke layers + the normal derivative + the relight is ALU on the already fill-bound oil path (`brush.glsl.ts:220` runs `sampleBase` ~40× per fragment in oil mode). If `profile:budget` reds after the impasto fold, the redress is the field-bake hoist (PATH-FORWARD §6 — hoist the single `domainWarp`+`nucleiField` so `sampleBase`/`bestOil` stop recomputing it dozens of times) which is a structural perf transposition, not a local edit. Halt and triumvirate; do not ship a budget-busting oil path.
- **The `vangogh` medium needs a new uniform the bridge can't thread.** If the energy-graded stroke length needs a uniform that `uniformBridge.ts` cannot supply within the existing `WebGLCanvasFrame` seam (e.g. a per-cell buffer that only a storage buffer can carry), the energy grading is a WebGPU-branch feature (AW.W7) and the WebGL2 `vangogh` ships with a coarser luminance-driven approximation — escalate the seam decision.
- **Any diagnostic loop reaches its third iteration** on a single medium's snapshot-bless (the deterministic `renderAt(t)` bake drifts between runs, indicating a non-deterministic stroke-placement path) — halt, do not iterate a fourth time; the non-determinism is a placement-seed bug, not a bless-tolerance tweak.

File-bound expansion BEYOND the §4 table (a new shader partial, a `uniformBridge.ts` storage-buffer seam, a runtime.ts render-mode branch) invalidates the wave's single-pass-WebGL2 scope and triggers the triumvirate — that surface is AW.W7.

## 4. File Bounds

| File | Access |
|---|---|
| `src/components/custom/aurora/constants/shaders/flow.glsl.ts` | modify (the `tensor`/`etf` branch + the `structureTensorField()` helper) |
| `src/components/custom/aurora/constants/shaders/brush.glsl.ts` | modify (`strokeOrient` switch in `bestOil`; the impasto height→normal→relit retiring the fixed rim; the energy-graded van-Gogh path) |
| `src/components/custom/aurora/constants/shaders/mediums.glsl.ts` | modify (the oil-pastel deposition+scumble+waxy rework of `mediumCrayon`) |
| `src/components/custom/aurora/constants/shaders/aurora.frag.ts` | modify (the assembler — thread the new uniforms `uStrokeOrient`/`uLightDir`/`uLightColor`, the `vangogh` medium route) |
| `src/components/custom/aurora/constants/presets.ts` | modify (the `AuroraMedium` union gains `"vangogh"`; the `vangogh`/`oil-pastel` preset defaults) |
| `src/components/custom/aurora/composables/uniformBridge.ts` | modify (thread the new uniforms to the GL program — additive) |
| `src/components/custom/aurora/DESIGN.md` | modify (§1 painterly engine + §7 the keystone/impasto/medium notes) |
| `src/components/custom/aurora/__tests__/painterly.test.ts` | create (the tensor-math unit test + the medium-uniform-resolution asserts) |
| `scripts/proof-aurora-tensor-field.mjs` | create |
| `scripts/proof-aurora-impasto-relight.mjs` | create |
| `scripts/proof-aurora-vangogh-preset.mjs` | create |
| `scripts/proof-aurora-oilpastel-medium.mjs` | create |
| `scripts/gates.mjs` | modify (register the four gates) |
| `package.json` | modify (scripts only — the four gate entries) |
| `docs/tranches/F/audit/W5-aurora-profile.json` | regenerate (re-bake against the painterly shader) |
| `docs/tranches/AW/PROGRESS.md` | modify (record green runs + the snapshot blesses + the budget result) |
| the affected preset thumbnail PNG assets (the Oil-* / Crayon-* / van-Gogh thumbnails) | regenerate |

Do NOT touch: `aurora.vert.ts` (the vertex shader) · `composition.glsl.ts` (the nuclei/palette composition — the W5 OKLCh wave owns `samplePalette`; the tensor reads `sampleBase`, it does not edit the composition) · `tonemap.glsl.ts` (the ACES/OETF/dither pipeline — locked by `proof:aurora-space-gamma`, never touched) · `src/composables/glass/webgl/shaders/procedural-color.glsl.ts` (the shared OKLCh/OETF chunk — read-only here; W5 splices its OKLCh matrices) · `src/composables/glass/useWebGLCanvas.ts` (the substrate — AW.W7 owns the backend lift) · `color.ts` (the CPU palette bake — AW.W5/W6 own it) · the wispy-sky `DEFAULT_AURORA_CONFIG` (`presets.ts:148`, `medium:"smooth"` — UNTOUCHED). **The anisotropic Kuwahara finish + the Gaussian-smoothed multi-tap tensor + per-stroke compute are AW.W7-WebGPU scope, NOT this wave.**

## 4a. Disjointness

All four agent units modify shader partials that the assembler (`aurora.frag.ts`) and the bridge (`uniformBridge.ts`) splice together — they are NOT file-disjoint. They serialize in ONE shader worktree in dependency order:

- **AW.W4.1** (structure-tensor / ETF — the keystone) lands FIRST. It owns `flow.glsl.ts` (the `tensor`/`etf` branch + `structureTensorField()`) and the `strokeOrient` switch wiring in `brush.glsl.ts`. AW.W4.3 and AW.W4.4 both consume its orientation field, so it must commit before them.
- **AW.W4.2** (impasto height→normal→relit) lands SECOND. It owns the `paintOver`/`mediumOil` height-accumulation + relight in `brush.glsl.ts`. AW.W4.3 and AW.W4.4 both relight against its height field. .1 and .2 both touch `brush.glsl.ts` — they serialize (.1's `strokeOrient` wiring, then .2's impasto rework) on the same worktree branch.
- **AW.W4.3** (van-Gogh medium) lands THIRD — it consumes .1's ETF field + .2's impasto + the W5 OKLCh jitter. Owns the `vangogh` route in `brush.glsl.ts`/`aurora.frag.ts` + the union+preset edit in `presets.ts`.
- **AW.W4.4** (oil-pastel medium) lands FOURTH — it consumes .1's ETF field + .2's paper-height field. Owns the `mediumCrayon` rework in `mediums.glsl.ts`.

`presets.ts` is touched by .3 (the `vangogh` union member + preset) and .4 (the oil-pastel label) — they serialize on the same worktree (.3 → .4), no parallel write. `uniformBridge.ts` is touched by .1 (`uStrokeOrient`) and .2 (`uLightDir`/`uLightColor`) — same worktree, serial. `scripts/gates.mjs` + `package.json` are append-only per gate, written by each unit as its gate lands — serialized, no parallel append race. The four gate scripts are file-disjoint (one file each). `painterly.test.ts` is created by .1 and extended by .3/.4 — serial on the same worktree.

Net: ONE serial shader lane (.1 → .2 → .3 → .4), then the bake/docs close. No parallel writers to any shared file.

## 4b. Worktree Plan

Single serial shader lane — one worktree, four sequential agent units. No parallel agents, so no per-agent worktree split.

| Agent unit lane | Sibling worktree absolute path | notes |
|---|---|---|
| Lane A — painterly shader (AW.W4.1 → .2 → .3 → .4, serial) | `/Users/mkbabb/Programming/glass-ui-aw-w4` | serial within; owns all shader partials + presets + bridge + the four gates + the test |
| Lane B — bake/docs (close) | `/Users/mkbabb/Programming/glass-ui-aw-w4-b` | opens after Lane A commits all four folds; owns `DESIGN.md`, `W5-aurora-profile.json`, the thumbnails, `PROGRESS.md`; branches FROM Lane A's committed shader so it bakes the painterly output |

No `CARGO_TARGET_DIR` (Node/Vite repo). The orchestrator runs `git worktree add` for the two siblings and owns the close integration.

## 5. Agent Units

### AW.W4.1 Structure-tensor / edge-tangent-flow orientation field (the keystone)

- **Goal**: stroke orientation derives from the color field's own structure-tensor minor eigenvector (the edge-tangent flow) so brushwork hugs the color zones — the single biggest "congruent to real Van Gogh" lever — selectable via a `strokeOrient: "flow" | "tensor"` switch, with the WebGL2 single-pass small-tap approximation shipping now.
- **Mechanism**:
  - **`flow.glsl.ts` — add `structureTensorField()`.** Sobel-derivative `sampleBase` over a small fixed-tap neighborhood (reuse the watercolor edge-mask's existing 4 taps, `mediums.glsl.ts:29-32`, extended to a 3×3 Sobel) → `vec2 G = (Gx, Gy)`. Form the structure tensor components `Jxx = Gx*Gx`, `Jxy = Gx*Gy`, `Jyy = Gy*Gy`. Closed-form 2×2 eigen-decomposition: `λ = 0.5*(Jxx+Jyy ± sqrt((Jxx-Jyy)^2 + 4*Jxy^2))`; the minor eigenvector is `normalize(vec2(λ_minor - Jyy, Jxy))` (guard the degenerate `Jxy≈0` isotropic case → fall back to the flow direction); coherence `A = (λ1-λ2)/(λ1+λ2+ε)`. Return `vec3(dir.x, dir.y, A)`.
  - **`flow.glsl.ts:6` — the `tensor`/`etf` branch.** Add a `uFlowPattern` branch that returns the `structureTensorField()` minor-eigenvector direction (blended toward the existing flow direction by `(1 - A)` so low-coherence regions stay smooth — the coherence-weighted blend prevents tensor noise in flat zones).
  - **`brush.glsl.ts:206-210` — the `strokeOrient` switch.** Gate `bestOil`'s `flow` arg behind a `uStrokeOrient` uniform: `flow` keeps the current `flowField`+jitter source; `tensor` substitutes the `structureTensorField()` direction. No default that hides the old path as a duplicate — `flow` is the named legacy choice, `tensor` is the new one.
  - **`uniformBridge.ts`** — thread `uStrokeOrient` (an int/enum) from the config.
- **Files**: `flow.glsl.ts` (modify), `brush.glsl.ts` (modify — the switch), `uniformBridge.ts` (modify), `painterly.test.ts` (create — the tensor-math unit test), `scripts/proof-aurora-tensor-field.mjs` (create), `gates.mjs` + `package.json` (register).
- **Sub-gate**: `proof:aurora-tensor-field` GREEN + bite-verified — a unit test feeds a synthetic linear-gradient field (known orientation) to a TS port of the eigen-decomposition and asserts the minor eigenvector matches the expected tangent within `1e-4`; a behavioral assertion that `strokeOrient:"tensor"` on a synthetic field yields a mean stroke orientation tracking the field gradient (not the global flow pattern). Bite: change the eigenvector to the MAJOR eigenvector → the orientation assertion REDs (the minor eigenvector is the tangent, the major is the normal). `build` green (GLSL compiles).

### AW.W4.2 Real impasto — height field → normal → relit lighting

- **Goal**: impasto is a real accumulated paint-height field lit by a movable directional source — thick paint that catches a raking light — retiring the faked fixed-RGB edge rim, with the light direction becoming the interactive axis AW.W8 consumes.
- **Mechanism**:
  - **`brush.glsl.ts:173-178` — retire the fixed rim.** Delete the `vec3(0.18,0.15,0.11)`-style fixed-RGB rim/shadow add (the phantom upper-left light). It is REMOVED, not flagged.
  - **`mediumOil` — accumulate paint height.** Across the four stroke layers, accumulate `height += coverage * layerThickness` perturbed by the existing bristle/streak fBm (ridges/grooves); the canvas tooth becomes the base height term.
  - **Normal from height gradient.** `vec3 N = normalize(vec3(-dFdx(height), -dFdy(height), heightScale))` — `dFdx`/`dFdy` are in-pattern (`fwidth` is already used for AA, so derivatives are available in the WebGL2 context).
  - **Relight.** Diffuse `max(dot(N, uLightDir), 0.0)` + Blinn specular `pow(max(dot(N, H), 0.0), shininess)` with `H = normalize(uLightDir + viewDir)`, modulated by `uLightColor`, applied in linear light BEFORE `aces()` (the tonemap/OETF stay locked). Thin strokes inherit canvas roughness (low shininess); thick impasto overrides it (high shininess from the accumulated height). Default `uLightDir` = the prior upper-left direction so the still default reads identically.
  - **`uniformBridge.ts`** — thread `uLightDir` (vec3, default upper-left) + `uLightColor` (vec3, default white-warm).
- **Files**: `brush.glsl.ts` (modify), `uniformBridge.ts` (modify), `scripts/proof-aurora-impasto-relight.mjs` (create), `gates.mjs` + `package.json` (register).
- **Sub-gate**: `proof:aurora-impasto-relight` GREEN + bite-verified — assert the fixed-RGB rim constant (the `vec3(0.18,0.15,0.11)` literal or its kin) is ABSENT from `paintOver`, and a `height`→`dFdx`/`dFdy`→`uLightDir` relight path is PRESENT; a snapshot-bless that two `uLightDir` values produce DIFFERENT catch-light positions in the deterministic `renderAt(t)` bake (view/light-dependent, not a baked rim). Bite: restore the fixed rim → RED. `build` green. The light is in linear before the OETF (verified by the existing `proof:aurora-space-gamma` staying green).

### AW.W4.3 The van-Gogh atomic-stroke medium

- **Goal**: a first-class `medium:"vangogh"` paints energy-graded atomic strokes — long confident strokes in bright/energetic passages, short dabs in the darks (the Starry-Night turbulence cascade), oriented along the ETF field, with OKLCh per-stroke pigment variation and real impasto — congruent-to-real-Van-Gogh directionality with no subject matter.
- **Mechanism**:
  - **`presets.ts` — the union + the preset.** Add `"vangogh"` to the `AuroraMedium` union (additive); add a `vangogh` preset default (ETF orientation, high broken-color jitter, dense short directional layers, impasto on). Retire the prior "oil + swirl preset" approximation that demos used to fake van-Gogh (the Oil-VanGogh demo preset now routes the real medium).
  - **`brush.glsl.ts` / `aurora.frag.ts` — the `vangogh` route.** Direction from AW.W4.1's `structureTensorField()` (force `strokeOrient:tensor` for this medium). Energy grading: modulate `bestOil` stroke length + layer density by `luma(sampleBase)` (bright→long, dark→short dabs) AND by the coherence `A` (coherent zones → long strokes, flat zones → stubby dabs — the Kolmogorov/Batchelor congruence). Per-stroke OKLCh pigment jitter: small ΔL, Δh, ΔC seeded per cell via the AW.W5 OKLCh broken-color path (`brokenColorJitter` moved into OKLCh). Impasto from AW.W4.2. The "source image" is the generated nuclei field — strokes trace its iso-bands, no subject matter.
- **Files**: `presets.ts` (modify — union + preset), `brush.glsl.ts` / `aurora.frag.ts` (modify — the route), `painterly.test.ts` (extend — the `vangogh` uniform-resolution assert), `scripts/proof-aurora-vangogh-preset.mjs` (create), `gates.mjs` + `package.json` (register).
- **Sub-gate**: `proof:aurora-vangogh-preset` GREEN — a preset-canon test that `medium:"vangogh"` resolves its uniforms correctly (it forces `strokeOrient:tensor`, impasto on, OKLCh jitter on) + a snapshot-bless of the deterministic `renderAt(t)` van-Gogh bake (the existing thumbnail-bake harness). Bite: a config asserting `vangogh` falls back to the old oil+swirl uniforms → RED. Depends on AW.W4.1 + AW.W4.2 + AW.W5.

### AW.W4.4 Genuine oil-pastel — deposition + scumble + waxy film

- **Goal**: `medium:"oil-pastel"` reads as genuine oil pastel — pigment deposited on the paper tooth with a broken scumble upper layer letting the paper show through and a waxy burnish film — not the current tooth-multiply textured gradient.
- **Mechanism**:
  - **`mediums.glsl.ts:75-122` — rework `mediumCrayon`.** Replace the anisotropic-noise × base-color tooth-multiply with a pigment-on-tooth deposition: tooth-occlusion deposition (pigment on the AW.W4.2 paper-height peaks, skips valleys — `deposit = smoothstep(toothFloor, toothPeak, paperHeight) * pressure`, light pressure shows paper, heavy fills it); a **scumble** pass (a broken upper layer at `coverage < 1` letting the lower palette color through, the signature oil-pastel move); a **waxy specular film** (low-roughness broad lobe whose sheen grows with layer count = burnish, distinct from oil's sharp glint).
  - **Orientation + color.** Orient the deposition streaks along the AW.W4.1 ETF field; OKLCh broken color via the W5 path.
  - **The label.** The demo-facing medium label is `oil-pastel` (the union/internal `uMedium==4` route MAY stay `crayon` if load-bearing in the bridge — record the decision in DESIGN.md; no parallel duplicate medium).
- **Files**: `mediums.glsl.ts` (modify), `presets.ts` (modify — the oil-pastel label/preset, serial after .3), `painterly.test.ts` (extend — the oil-pastel uniform assert), `scripts/proof-aurora-oilpastel-medium.mjs` (create), `gates.mjs` + `package.json` (register).
- **Sub-gate**: `proof:aurora-oilpastel-medium` GREEN — a snapshot-bless of the reworked oil-pastel `renderAt(t)` bake (shows paper-through-scumble + the waxy film) + a perf assertion that the WebGL2 single-pass oil-pastel path stays inside `profile:budget`. Bite: revert to the tooth-multiply → the snapshot REDs. Depends on AW.W4.1 + AW.W4.2.

## 6. Hard Gate

W4 closes when every condition below is evidence-backed:

1. **AW.W4.1** — `flow.glsl.ts` carries `structureTensorField()` (Sobel → 2×2 tensor → closed-form eigen-decomposition → minor eigenvector + coherence); the `tensor`/`etf` `uFlowPattern` branch + the `strokeOrient` switch in `bestOil` are present. `proof:aurora-tensor-field` GREEN + bite-verified (major-eigenvector swap → RED). The single-pass WebGL2 approximation renders; the smoothed multi-tap is recorded as the AW.W7 handoff.
2. **AW.W4.2** — the fixed-RGB rim is GONE from `paintOver`; the height→normal→relit path (`dFdx`/`dFdy` of accumulated height, diffuse+Blinn from `uLightDir`/`uLightColor` in linear before `aces()`) is present. `proof:aurora-impasto-relight` GREEN + bite-verified (a `uLightDir` sweep moves the catch-light; restoring the fixed rim → RED). `proof:aurora-space-gamma` stays GREEN (the light is in linear before the OETF).
3. **AW.W4.3** — `medium:"vangogh"` is a first-class `AuroraMedium` member (ETF-oriented, energy-graded length/density by `luma(sampleBase)`+coherence, OKLCh per-stroke jitter, impasto on). `proof:aurora-vangogh-preset` GREEN (uniform-resolution + the deterministic bake snapshot-blessed). The "oil + swirl" van-Gogh approximation is RETIRED.
4. **AW.W4.4** — `mediumCrayon` is reworked into the oil-pastel deposition+scumble+waxy model; the demo label is `oil-pastel`. `proof:aurora-oilpastel-medium` GREEN (the bake shows paper-through-scumble; the WebGL2 path stays inside `profile:budget`).
5. **The wispy-sky default is UNCHANGED** — `DEFAULT_AURORA_CONFIG` (`presets.ts:148`, `medium:"smooth"`) byte-unchanged; the smooth/atmospheric pole renders identically (the painterly mediums are opt-in).
6. **The tonemap pipeline is UNTOUCHED** — `tonemap.glsl.ts` byte-unchanged; `proof:aurora-space-gamma` GREEN (the linear→ACES→OETF→dither pipeline intact; the impasto relight lands in linear BEFORE `aces()`).
7. **The Kuwahara + smoothed-tensor + per-stroke compute are NOT in this wave** — recorded as the AW.W7-WebGPU handoff in DESIGN.md (no multi-pass dispatch added here).
8. **No regression.** The existing gate matrix stays GREEN: `proof:aurora-space-gamma`, `proof:blob-color-equivalence`, `proof:webgl-substrate-single`, `proof:single-color-core`, `proof:offscreen-pause`, `npm run typecheck`, `npm run build`, the aurora + blob unit suites. `PROGRESS.md` records green run ids + the four snapshot blesses + the budget result.

**Born-RED gate registration (manifest==ci invariant):**

| gate | script | tags | bite-check |
|---|---|---|---|
| `proof:aurora-tensor-field` | `scripts/proof-aurora-tensor-field.mjs` | `["local","ci"]` | swap the minor eigenvector for the major → orientation assertion REDs |
| `proof:aurora-impasto-relight` | `scripts/proof-aurora-impasto-relight.mjs` | `["local","ci"]` | restore the fixed-RGB rim → RED |
| `proof:aurora-vangogh-preset` | `scripts/proof-aurora-vangogh-preset.mjs` | `["local","ci"]` | `vangogh` falls back to oil+swirl uniforms → RED |
| `proof:aurora-oilpastel-medium` | `scripts/proof-aurora-oilpastel-medium.mjs` | `["local","ci"]` | revert to the tooth-multiply → snapshot REDs |

Each follows the house gate template (`scripts/proof-aurora-space-gamma.mjs`): a pure read-and-detect over the shader/preset text (or a vitest-driven bake bless), a byte-stable JSON artefact via `scripts/gate-output.mjs`, a human summary, `process.exit(1)` on violation. Register in `package.json` + `gates.mjs` ONLY after each fold lands (`gates:verify-ci` enforces manifest==ci).

## 7. Format And Lint Cadence

- `npm run typecheck` (`vue-tsc --noEmit`) — after each unit (the shaders are string literals; the test + the union edit are the typed surface) and at close.
- `npm run build` — after each of .1/.2/.3/.4 (the GLSL compiles in the test harness) and at close.
- The four `proof:aurora-*` gates + the no-regression existing-gate matrix — after each fold lands and at close.
- `vitest run src/components/custom/aurora/__tests__/painterly.test.ts` — after .1 (tensor math), .3 (van-Gogh uniforms), .4 (oil-pastel uniforms).
- `npm run profile:aurora` + the demo thumbnail bake — once at close (Lane B), against the painterly shader.
- `git diff --check` on the docs (`DESIGN.md`, `PROGRESS.md`) at close.

No formatter is intentionally skipped; the four gates + the snapshot blesses are the binding evidence; the `profile:budget` result is the binding evidence for the single-pass perf envelope.

## 8. Verification Artefacts

- The four `proof:aurora-*` JSON gate artefacts (byte-stable, via `scripts/gate-output.mjs`) — born-RED (pre-fold) AND green (post-fold) captures for each.
- The `painterly.test.ts` run output (the tensor-math eigen assertion + the medium uniform-resolution asserts) green.
- The four snapshot-blessed deterministic `renderAt(t)` bakes (impasto-relight light sweep, van-Gogh, oil-pastel).
- The regenerated `docs/tranches/F/audit/W5-aurora-profile.json` + the `profile:budget` pass record (the single-pass oil/van-Gogh/oil-pastel paths inside budget).
- The refreshed preset thumbnail assets (the Oil-* / Crayon-* / van-Gogh thumbnails).
- DESIGN.md §1/§7 the painterly-engine notes (the keystone, the impasto retire, the energy cascade, the oil-pastel deposition, the AW.W7 handoff).
- Browser-verify notes (strokes hug the forms under `tensor`; `uLightDir` moves the catch-light; oil-pastel shows paper-through-scumble) + the green CI run ids + integration commit hashes — `docs/tranches/AW/PROGRESS.md`.

## 9. Commit Plan

- **Lane A (painterly shader) implementation commits** (serial):
  - `feat(tranche-AW): W4 — aurora structure-tensor/ETF orientation field + strokeOrient switch + born-RED proof:aurora-tensor-field` (body: the keystone — minor-eigenvector tangent, the coherence-weighted flow blend, the single-pass approximation, the AW.W7 smoothed-tensor handoff).
  - `feat(tranche-AW): W4 — aurora real impasto (height→normal→relit) retiring the fixed rim + born-RED proof:aurora-impasto-relight` (body: the retired phantom upper-left rim, the accumulated height field, the movable uLightDir, linear-before-aces).
  - `feat(tranche-AW): W4 — aurora first-class vangogh medium (ETF-oriented energy-graded atomic strokes) + born-RED proof:aurora-vangogh-preset` (body: the Starry-Night cascade, the OKLCh per-stroke jitter, no subject matter, the retired oil+swirl approximation).
  - `feat(tranche-AW): W4 — aurora genuine oil-pastel (deposition+scumble+waxy) reworking mediumCrayon + born-RED proof:aurora-oilpastel-medium` (body: the tooth-occlusion deposition, the scumble, the burnish film, the crayon→oil-pastel label).
- **Lane B (bake/docs) commits**:
  - `docs(tranche-AW): W4 — DESIGN.md §1/§7 painterly engine (tensor keystone, impasto retire, energy cascade, oil-pastel deposition, AW.W7 handoff)`.
  - `chore(tranche-AW): W4 — re-bake aurora profiler + painterly preset thumbnails (vangogh/oil-pastel/impasto-relight)` (body: the re-bake list).
- **Orchestrator integration + docs commit** — `docs(tranche-AW): W4 close — PROGRESS green run ids + the four snapshot blesses + the profile:budget result` (body: status/close).

## 10. Dependencies

- **Depends on**: **AW.W5** (the in-shader OKLCh color core) — the van-Gogh per-stroke pigment jitter and the oil-pastel broken color consume the OKLCh `brokenColorJitter` seam. The structure-tensor keystone (.1) and the impasto (.2) are color-agnostic and could open at HEAD, but the wave opens after W5 so the mediums get the OKLCh path in one pass (no second touch of `brush.glsl.ts`/`mediums.glsl.ts`). The AV.W1 OETF fix + AV.W2 shared-color chunk are landed (the linear pipeline is correct; the impasto relight lands in that correct linear space).
- **Blocks**: **AW.W7** (WebGPU) consumes the structure-tensor field — the full-quality Gaussian-smoothed multi-tap tensor, the **LIC line-integral-convolution smear** (the second half of the cited "ETF + LIC" technique — the multi-pass convolution that smears the field along the ETF orientation, which the single-pass WebGL2 shader cannot express), and the anisotropic Kuwahara finish are the multi-pass half AW.W7 stages on the WebGPU branch (this wave ships the ETF orientation field as the single-pass approximation + the declared WebGL2 fallback). **AW.W8** (interactivity) consumes the impasto `uLightDir` (cursor-as-light) — the movable light direction lands here, the pointer drives it there.

**Deferred against this wave (with trigger):** the Kubelka-Munk spectral pigment-mixing fold (PATH-FORWARD §1e — `spectral.js`, MIT, makes overlapping complementary strokes mix like real paint instead of muddying toward grey via linear `mix()`, `brush.glsl.ts:182`). DEFER — it is a `pigmentMix` flag on the painterly mediums only (the smooth/atmospheric pole stays linear for cost); trigger is a design pass judging the van-Gogh/oil-pastel overlap regions muddy. Recorded, not shipped, here.

## 11. Archaeology

Not a re-attempt of a prior failed wave. The painterly engine builds on the AV.W1 OETF correctness fix (`afdc485` lineage — the aurora was the un-converged sibling that shipped ~2.2× too dark until AV.W1 added `linearToSrgb`) and the AV.W2 shared-color convergence (`procedural-color.glsl.ts` — the single OKLCh/OETF/FBM_ROT source aurora + the goo-blob compose). The PATH-FORWARD names the four gaps precisely (§0): the brushwork is procedural-grid SDF oriented off the hand-authored `flowField` (`brush.glsl.ts:188`, `flow.glsl.ts:6`), NOT flow-guided from the image's own structure — the README itself names this gap (`README.md:273-275`); the impasto is a faked fixed-RGB rim (`brush.glsl.ts:173-178`); the crayon mode is a tooth-multiply (`mediums.glsl.ts:75`), not painterly. The structure-tensor/ETF keystone is the canonical NPR stroke-orientation primitive (Kyprianidis & Kang, *Image and Video Abstraction by Anisotropic Kuwahara Filtering*, CGF 2009, `kyprianidis.com/p/pg2009/`; Heckel, *On Crafting Painterly Shaders*, 2024, `blog.maximeheckel.com/posts/on-crafting-painterly-shaders/`; Kang/Lee/Chui ETF, NPAR 2007); the energy-graded van-Gogh cascade is grounded in the measured turbulence of the brushwork (*Hidden Turbulence in van Gogh's The Starry Night*, Physics of Fluids 36 / arXiv:2310.03415, 2024 — Kolmogorov −5/3 at large scale, Batchelor at small, stroke size tracking local luminance/energy; Hertzmann, *Painterly Rendering with Curved Brush Strokes of Multiple Sizes*, SIGGRAPH 1998); the impasto height→normal→relight is the SOTA paint-relief model (IMPaSTo, Baxter/Wendt/Lin, NPAR 2004, `gamma.cs.unc.edu/IMPASTO/`; Differentiable Stroke Planning, arXiv:2604.02752); the oil-pastel deposition is the material-truth model (Mont Marte / oil-pastel-technique references). All accessed 2026-06-06. The anisotropic Kuwahara finish + the Gaussian-smoothed multi-tap tensor are deferred to AW.W7 (WebGPU) because they are multi-pass — the single-pass WebGL2 fragment shader fundamentally cannot express them (DESIGN.md invariant 8 bans multi-pass; AW.W7 relaxes it on the WebGPU branch).
