# PROCEDURAL — corpus research (KS-A · lane PROCEDURAL)

**Date:** 2026-07-01 · **HEAD:** `fa6ed40a` · **Author role:** opus corpus researcher (KS-PROCEDURAL feeder).
**Scope:** disk-true per-viz state + every settled viz decision + the exact demigrate scope, for the 10 lane
waves: 6.1 W-VIZ-RESIZE-ADOPT · 6.3 W-VIZ-DEMIGRATE (atomic) · 6.4 W-VIZ-REVEAL-BLOOM · 6.5 W-VIZ-PREVIEW-LIVE ·
6.6 W-DOTFLOW-REBUILD (+advection) · 6.8 W-GOODOT-SETUP-SPLIT · 6.9 W-BLOB-KINEMATICS-LEAF · W-AUR-METAL-FINISH ·
W-AUR-IMAGE-SOURCE.

**Fences honored:** this file is the ONLY write. Every corpus claim is file:line-cited. Siblings READ-ONLY.
`docs/precepts/` untouched. The SYNTHESIS-PASS1 §4 protected set (`createCanvasLifecycle`, per-subpath JS split,
1-GL-per-route budget, `DOCK_SPRING`, warm identity, the parity-ΔE bar) is treated as inviolable.

---

## 0. The suite at a glance (the family the waves perfect)

glass-ui ships ONE procedural-animation SUITE — a documented FAMILY over ONE lifecycle leaf
(`src/components/custom/PROCEDURAL-SUITE.md:1-24`). Ten members, three cited-SOTA math vocabularies
(Tessendorf/Gerstner sum-of-sines · Bridson curl-noise ∇⊥ψ · Fourier/DFT epicycles), ONE shared discipline
(offscreen-park · live-PRM one-static-frame-then-park · consumer-owned DPR · one-GL-per-route · warm-identity
default + presets-in-consumers) (`PROCEDURAL-SUITE.md:26-49`).

**The three thin backends over ONE leaf** (`createCanvasLifecycle`, AU.W6): `useWebGLCanvas` (WebGL2),
`useCanvas2D` (Canvas2D), `useWebGPUCanvas` (WebGPU); `useGpuSubstrate` is the feature-detect picker
(`PROCEDURAL-SUITE.md:52-63`). The parity bar is **mean ΔE ≤ 2.0 / p99 ΔE ≤ 5.0**, machine-locked by
`proof:gpu-substrate-single` (`PROCEDURAL-SUITE.md:59-63`). This bar + the leaf + the JS split + the 1-GL budget
are all in the §4 protected set — my waves BUILD on them, never re-plumb them.

**Disk-true member roster** (`ls src/components/custom/`): aurora · goo-blob · dot-flow-field · goo-dot-matrix ·
constellation · fourier-field · concentric · paper-grid · dot-matrix · watercolor-dot · goo-filter (the shared
`<filter>` mount). Verified present with composables + shaders per dir.

---

## 1. Disk-true per-viz substrate state (HEAD `fa6ed40a`)

The load-bearing fact my waves turn on: the BC tranche OVER-MIGRATED every viz to WebGPU (all carry `.wgsl`
shaders + `createGpuSubstrate` on disk + `verified` parity rows), which CONTRADICTS the BB.W-VIZ-SUITE README
verdict for fourier-field + constellation ("Canvas2D — DO NOT MIGRATE"). The BG plan RESOLVES this by reverting
the two over-migrations (demigrate) and pruning the two never-earned WebGPU primaries (concentric, paper-grid).

| viz | substrate ON DISK (HEAD) | `.wgsl` present | BB README verdict | BG target | my wave |
|---|---|---|---|---|---|
| **aurora** | WGSL primary + `.frag` WebGL2 fallback | yes (`aurora.wgsl.ts`, `aurora-mediums.wgsl.ts`) | MIGRATED (rank 1) | **KEEP** WGSL; ADD metal medium 8/9 + image source | W-AUR-METAL-FINISH · W-AUR-IMAGE-SOURCE |
| **goo-blob** | WGSL primary + `.frag` fallback | yes (`metaball.wgsl.ts`) | MIGRATED (rank 2) | KEEP; carve kinematics leaf | 6.9 W-BLOB-KINEMATICS-LEAF |
| **dot-flow-field** | WGSL compute+render + `.glsl` fallback | yes | BORN WGPU (rank 3) | KEEP compute; rebuild flow (advection) | 6.6 W-DOTFLOW-REBUILD |
| **goo-dot-matrix** | WGSL + `.frag` | yes (`goo-dot.wgsl.ts`) | BORN WGPU (register b) | KEEP; carve setup split | 6.8 W-GOODOT-SETUP-SPLIT |
| **fourier-field** | **`createGpuSubstrate` WGSL compute+render** (`useFourierField.ts:27,311`) | **yes** (`fourier-field.compute/render.wgsl.ts`) | **Canvas2D — DO NOT MIGRATE** (`README.md:217-226`) | **DEMIGRATE → `useCanvas2D`** | 6.3 |
| **constellation** | **`createGpuSubstrate` WGSL** (`useConstellation.ts:19,377`) | **yes** (`constellation-{lines,points}.wgsl.ts`) | **Canvas2D substrate** (`README.md:5,12,48`) | **DEMIGRATE → `useCanvas2D`** | 6.3 |
| **concentric** | WGSL primary + `.glsl` fallback | yes | BORN WGPU (rank 4) | 6.7 (folded): DELETE `.wgsl` primary, KEEP GLSL fallback | 6.3-atomic |
| **paper-grid** | WGSL primary + `.glsl` fallback | yes | BORN WGPU (rank 5) | 6.7 (folded): DELETE `.wgsl` primary, KEEP GLSL fallback | 6.3-atomic |
| **dot-matrix** | WGSL + WebGL2 instanced fallback | yes | BORN WGPU (rank 6) | KEEP | (not a lane wave — 6.1 resize only) |
| **watercolor-dot** | SVG/CSS — NO drawing context | no | PERMANENTLY OUT | KEEP (never a viz wave) | (the canonical no-migrate case) |

**Parity-table state at HEAD** (`docs/tranches/BB/audit/gpu-parity-table.md`): fourier-field row (`:112-121`) +
constellation row (`:124`) both `verified` with `.wgsl` primaries — these are the rows the demigrate must flip.
The gate `proof-gpu-substrate-single.mjs:177-181` comment records "BC.W-VIZ-CONSTELLATION removed 'constellation'
— it MIGRATED … carries a `verified` row" and `NON_MIGRATING = new Set(["watercolor-dot"])` (`:181`) — the ONLY
current non-migrating member. Demigrate re-adds fourier + constellation to a `no-migrate`/Canvas2D disposition.

**Carve-target LOC at HEAD** (the ratchet baselines my colocation waves drain):
- `goo-blob/composables/useBlobSatellites.ts` = **533** (baseline #10 → 6.9 kinematics leaf).
- `goo-dot-matrix/composables/useGooDotMatrix.ts` = **508** (baseline #15 → 6.8 setup split; `gooDotSetup.ts`=355).

**`dprPolicy` adoption at HEAD = 0** across all vizzes (`grep -rln dprPolicy` in the 9 viz dirs → empty). The
substrate ALREADY exposes it — `useGpuSubstrate.ts:97 dprPolicy?`, `:160 presize`, `:346 presize()` (the
BD.W-SUBSTRATE-SIZE-UNIFY backing-store sizer landed). So **6.1 is the ADOPT wave (thread the existing
`dprPolicy` through all 9 vizzes), not the mint.** This is a precise disk fact the wave spec must state.

**Metal / image-source at HEAD = ABSENT** (`grep mediumMetal|uMedium == 8|uSource|uImage` in `aurora/` → only
README/DESIGN prose). Born-RED confirmed. The `AuroraMedium` union stops at `kuwahara` (`constants/presets.ts:74`);
`MEDIUM_ID` stops at `kuwahara: 7` (`uniformBridge.ts:51`) — metal is the NEXT two ids (8/9), NOT 10/11.

---

## 2. Every settled viz decision (the corpus verdicts, binding)

### 2.1 THE demigrate decision — the two contradictory directives, RESOLVED

There are two directives on disk that DISAGREE, and the resolution is settled by recency + explicit amendment:

- **BD viz-arch `no-fallback-policy.md`** (`docs/tranches/BD/viz/arch/`) mandates *"ZERO Canvas2D, NO fallbacks"*
  — DELETE the Canvas2D viz substrate; `NON_MIGRATING = {watercolor-dot}` only. Under this, fourier + constellation
  stay WebGPU.
- **BG RESPEC-GESTALT plan 6.3 W-VIZ-DEMIGRATE + the BB READMEs** de-migrate fourier + constellation BACK to
  `useCanvas2D` (their own "DO NOT MIGRATE" verdict — `fourier README:217`, `constellation README:5`).

**RESOLUTION (binding):** the BG live plan (HEAD `fa6ed40a`, EXECUTION-PROGRESS.md the DURABLE cursor) is
authoritative and EXPLICITLY amends the BD viz-arch (RESPEC-GESTALT ruling frame). The BD `no-fallback` GPU-only
mandate was a BD-era stance the RESPEC audit reversed for these two vizzes: a few-dozen-phasor `ctx.stroke` curve
and a drifting node/edge lattice are the RIGHT Canvas2D tools; the BC WebGPU migration was over-articulation. The
keystone spec must NOT re-litigate this — it is DECIDED. The BD `no-fallback-policy.md` is superseded FOR
fourier-field + constellation; it remains correct for the born-GPU field vizzes (aurora/goo-blob/dot-flow etc).

### 2.2 The demigrate has TWO distinct swaps (do NOT conflate them)

`bg-build-map.md:1383-1385` is explicit — the atomic 6.3 wave carries two different target substrates:

1. **fourier-field + constellation → `useCanvas2D`** (an internal WGSL→Canvas2D swap). `ctx.stroke` for fourier,
   Canvas2D node/edge for constellation. **Keys `/fourier-field` + `/constellation` PRESERVED**
   (`EXECUTION-PROGRESS.md:106`; `build-map:550`) — a VISUAL re-baseline, NOT an import re-point, so **NO by-name
   cross-repo ask is owed** (§2.6).
2. **6.7-folded VIZ-SUBSTRATE-DELETE → removes ONLY the `.wgsl` primary from concentric + paper-grid, KEEPS the
   GLSL WebGL2 fallback + dir + `index.ts`** (`build-map:1384-1385`). These stay live GPU vizzes on their WebGL2
   fragment path; only the never-earned WGSL twin is cut.

`useCanvas2D` exists as the re-home target (`src/composables/glass/canvas2d/useCanvas2D.ts`). The Canvas2D
single-source clause of `proof-gpu-substrate-single.mjs:404-412` stays GREEN (the backend is not retired).

### 2.3 The demigrate DELETE scope (exact files, on-disk LOC)

**fourier-field WGPU DELETE candidates** (revert to Canvas2D): `shaders/fourier-field.compute.wgsl.ts` (100) ·
`shaders/fourier-field.render.wgsl.ts` (280) · `composables/fourierFieldWGPUSetup.ts` (339) ·
`composables/uniformBridgeWGPU.ts` (240) · `composables/fourierFieldGLSetup.ts` (258) ·
`shaders/fourier-field.glsl.ts` (228). The `math.ts` (DFT epicycle math, GPU-agnostic) STAYS — it feeds the
Canvas2D `ctx.stroke` renderer directly (the README verdict: "the DFT math is already GPU-agnostic").

**constellation WGPU DELETE candidates:** `shaders/constellation-{lines,points}.wgsl.ts` (115+97) ·
`composables/constellationWGPUSetup.ts` (267) · `composables/uniformBridgeWGPU.ts` (196) ·
`composables/constellationGLSetup.ts` (222) · `shaders/constellation-{lines,points}.glsl.ts` (94+75). The field
math (`createConstellationField.ts`, `constellationField.ts`, `constellationRender.ts` incl. `readPalette`/`kVisOf`)
STAYS — it feeds the Canvas2D render loop. **Net: ~2.5K+ LOC deleted** (matches build-map §WS5.3 "≥13 files +
≥2500 LOC deleted").

**Budget goes DOWN** (`EXECUTION-PROGRESS.md:106` "budget DOWN"): the `metaball.wgsl`/`flow-field.glsl` baseline
rows drain (WGSL delete + the shader-exempt manifest). `profile:budget` re-pins DOWNWARD.

### 2.4 The DEFAULT_PARALLAX protector (a HARD, non-optional 6.3 build deliverable)

The demigrate rewrites `constellation/constants.ts` — the SAME file carrying the D-1 live-fix
`DEFAULT_PARALLAX = 0` (verified on disk: `constants.ts:146 export const DEFAULT_PARALLAX = 0;`, commit `07c6e6ec`,
LX.1 DONE). At HEAD `proof-constellation-gen.mjs` has **NO `DEFAULT_PARALLAX` assert** (`grep -c` → 0). So 6.3
carries a **born-RED `DEFAULT_PARALLAX===0` arm on `proof:constellation-gen [local,ci]`** (`build-map:557-573`) —
the durable substrate-AGNOSTIC protector that SURVIVES the de-migration (it reads `constants.ts` behavioral
defaults, unlike `proof:viz-constellation` C1 which asserts WebGPU — the exact axis 6.3 inverts, the WRONG host).
The arm must RED on a planted non-zero `DEFAULT_PARALLAX` + GREEN on the shipped `0`, with its born-RED self-test.
This is a HARD, non-optional build deliverable (the weakest of the 3 LX protectors — a build-time-landing
dependency, not a live-on-disk gate like WS2's E4).

### 2.5 The demigrate gate edit is ATOMIC in 6.3 (the transient-RED window closed)

`build-map:535-540` (COHERENCE FOLD G7 P3): the `proof-gpu-substrate-single.mjs:177-181` gate edit (flipping
fourier/constellation off `verified`, concentric/paper-grid `.wgsl` delete) lives ENTIRELY in the 6.3-atomic wave
(6.3+6.7 merged per `EXECUTION-PROGRESS.md:106`). The two half-edits (source-swap + gate-edit) are kept in ONE
wave so no transient window leaves a half-edited gate. The demigrate is "source-only + leaves the gate GREEN" is
the OLD split-wave framing — under the atomic fold it is ONE wave that co-moves source + gate.

### 2.6 The cross-repo disposition (key-preserved → NO ask, but a clause fires)

Because the keys `/fourier-field` + `/constellation` are PRESERVED (internal substrate swap), the disposition is
a **VISUAL re-baseline, NOT an import re-point** (`build-map:1383-1397`). Consumers: slides `/fourier-field`×4 +
`/constellation`×2, atlas `/constellation`×1 + `/dot-flow-field`×1 (re-approve fallback-first). The gate is the
NEW **`W5-viz-subpath-disposition`** clause on `proof:crossrepo-asks` (NOT `W4` — W4 is the inv-26 content-only
fence already on disk; naming it W4 would smother the fence). It REDs ONLY if a WS5 wave drops/renames a CONSUMED
key without an import-re-point ask. Born-GREEN at HEAD. ~40 LOC + 1 self-test bite (`build-map:1388-1396`).

### 2.7 dot-flow-field (6.6) — the settled GOLDEN "AURORA CURRENT" + the ONE reconcile

The BD GOLDEN (`greenfield/dot-flow-field/GOLDEN.md`) is spike-VERIFIED live (WebGL2/Safari-real path:
`litFrac 0.23`, `meanChroma 20`, `frameDelta 10.3`, cursor-vortex reads — `GOLDEN.md:8,311-333`). Settled facts:

- **The current viz is dead-flow** (`GOLDEN.md:20-42`): the BC retopology DELETED advection — dots nailed to a
  lattice anchor, `litFrac 0.029`, `meanChroma≈0`, `frameDelta≈0` (functionally static, monochrome, ~97% black).
- **TWO registers, ONE component** (the dock `dim`-idiom): `mode:"flow"` (the NEW default — advected motes +
  feedback-fade trails + velocity-technicolor + cursor VORTEX) and `mode:"field"` (the calm anchored halftone —
  the rebuild's content-deferential backdrop, KEPT, supersede-not-discard) (`GOLDEN.md:58-69,195-209`).
- **The advection `flow` register is the §4-D GA-5 carrier** (`EXECUTION-PROGRESS.md:109`): GPGPU state-texture +
  two-FBO trail + warm-fire ramp, teal-navy-purge HELD (technicolor is a DEMO preset — F5 warm-library palette
  fence holds, `GOLDEN.md:103,120`).
- **THE ONE RECONCILE the keystone spec MUST resolve:** the plan row 6.6 says *"compute STAYS WebGPU — the sole
  earner"* (`build-map:579`), but the GOLDEN adds a REAL WebGL2 state-texture GPGPU path (`GOLDEN.md:96-99,
  186-191`) so BOTH engines run the SAME advected-population gestalt, plus a substrate `preserveDrawingBuffer:true`
  fix (`GOLDEN.md:99,191,302` — closes the WebGL2 unmeasurable-zero-readback defect for EVERY viz). These are NOT
  in conflict: "compute STAYS WebGPU" = the WGPU compute kernel is the primary and is rebuilt (advection); the
  WebGL2 fallback GAINS an equal-gestalt state-texture path (it is not the "sole earner" — it is the co-equal
  Safari channel). The keystone should state BOTH: WGPU compute primary (rebuilt) + WebGL2 state-texture fallback
  (equal gestalt) + the substrate `preserveDrawingBuffer` R0 fix. The math fence: `proof:viz-dotflow` freeze
  applies ONLY to the `field` evaluator; `flow` is a NEW integrator (`GOLDEN.md:100-104,249`).
- **Cursor VORTEX** via the EXISTING `usePointerVelocityField` (`.velocity`/`.speed`/`.burst`/`.active`,
  `tick(delta)` in-frame — NO second rAF) (`GOLDEN.md:139-154`). Compositor-only trail = one screen-res texture +
  N point-sprites (NO `backdrop-filter`, NO SVG goo — `GOLDEN.md:225-229`).

### 2.8 aurora metal finish (W-AUR-METAL-FINISH) — the settled GOLDEN, slots 8/9

The BD aurora GOLDEN (`greenfield/aurora/GOLDEN.md`) is spike-VERIFIED (WebGL2 gate GREEN, 25× local
crest-valley contrast over the smooth wash — `GOLDEN.md:61-66`). Settled facts for MY narrower wave:

- **`finish:"metal"` (8) + `finish:"metal-gradient"` (9)** — the NEXT two `uMedium` ids after kuwahara:7 (corrected
  from the lens-a/b phantom 10/11 — `GOLDEN.md:31-37,425`). My plan row: "metal as a MEDIUM, uMedium 8/9,
  mutually-exclusive ladder, discarded Gx/Gy" (`EXECUTION-PROGRESS.md:112`).
- **The deftness — folded from the DISCARD:** `structureTensorField` computes `(Gx,Gy)`, eigen-decomposes, and
  `return vec3(dir,A)` THROWS the gradient away (`mediums.glsl.ts:89`; WGSL twin discard `aurora-mediums.wgsl.ts:76`
  — `GOLDEN.md:45-50,176`). Metal RE-PLUMBS both to `vec4(dir,A,packGrad)` — ZERO new taps. `.xy/.z` callers
  (kuwahara) byte-unchanged.
- **The light MUST cross to WGSL via `uCursor`, NOT `uLightDir`** — `uLightDir` exists on the `.frag` (`:130`) but
  is ABSENT from the WGSL uniform struct; `uCursor` IS in-struct (off 64) (`GOLDEN.md:52-56,181-185,324`). The
  cursor-z-synth light is the ONLY form that crosses; a frag-only metal is INVISIBLE on the WGSL primary of BOTH
  browsers → **metal DUAL-PORTS (GLSL body + WGSL body)** (`GOLDEN.md:27-30,321-323,427`).
- **The two-term anisotropic BRDF** = streak (WHERE, along tensor tangent) × crest (BRIGHTNESS, N·H height
  specular), gated by a coherence floor `smoothstep(0, FLOOR, A)` (no phantom banding in smooth zones) + a
  technicolor-DR valley term (deep warm-shadow valleys, near-white crests) + an ACHROMATIC-warm catch
  (`AURORA_CATCH_LIGHT_ANCHOR` already at `uniformBridge.ts:106` — warm floor holds, NO hue) (`GOLDEN.md:188-208`).
- **Two knobs pack the FREE pad slots** (`scalars3.w` off 60, `cursor.z/.w` off 72/76 — written 0 today,
  `uniformBridgeWGPU.ts:136,141,154` per `GOLDEN.md:57-59,212-213`) — no new struct lane, byte-offset lockstep.
- **iOS-27 alignment** (`fleet2/apple-awwwards-sota.md:123-131,179`): the iOS-27 flow-field backgrounds carry a
  SATIN/METALLIC sheen (anisotropic specular along the flow, catch-light riding the gradient) — the metal BRDF is
  the shader addition, the OKLCh field + flow unchanged; NEW mediums beside satin/oil/kuwahara on the EXISTING
  dispatch, NOT a new substrate. Aurora's metal is iOS-27-BETTER: it rides the STRUCTURE TENSOR of a LIVE drifting
  field (breathes as nuclei drift, cursor-rakable) — Apple's is a pre-baked smooth mesh that can't interact.
- **SCOPE NOTE for the keystone:** the GOLDEN also carries a "vividness floor" §3 identity move (default palette
  lift C:0.10→0.16-0.20). That is a BROADER aurora identity change NOT in my plan row (which is metal-medium only).
  The keystone should record it as an adjacent decision but NOT fold it into W-AUR-METAL-FINISH unless a fold-note
  to the orchestrator is raised (the wave SET is frozen — don't self-insert a vividness wave).

### 2.9 aurora image source (W-AUR-IMAGE-SOURCE) — the settled GOLDEN, shared upload seam

- **`<Aurora source="image" :src>`** — NOT a `<BlurredImage>` fork; a new color-stage operator on the existing
  aurora (substrate/lifecycle/drift REUSED) (`GOLDEN.md:86-89,239-282,433-438`). The SAME drifting `nucleiField`
  drives a per-zone blur radius over an uploaded macro-flower texture — a real photo dissolving into a slow
  abstract color field.
- **Single-pass, bounded, Safari-safe blur** — a FIXED tap count (e.g. 3 rings × 8 = 24, the kuwahara tap-budget
  precedent), NO FBO ping-pong, NO dynamic loop bound (WebKit chokes), NO `backdrop-filter:url` (`GOLDEN.md:257-262`).
- **Construction-time program permutation, NOT a runtime `if(uSource)` god-branch** (the BD.W-DOT-IMAGE B1
  discipline — `GOLDEN.md:263-265`).
- **The SHARED texture-upload seam** (`EXECUTION-PROGRESS.md:113` "SHARES the ONE texture-upload primitive with
  `BD.W-DOT-IMAGE` (first-to-land BUILDS, other CONSUMES)"): the ONE upload primitive with explicit
  premultiply/colorspace/flipY on BOTH backends (`copyExternalImageToTexture` vs `texImage2D` diverge —
  `GOLDEN.md:266-276`); the parity gate is a REAL chromium-WGSL vs webkit-WGSL rendered-capture-pair, never a
  name-presence (`GOLDEN.md:273-276`). W-DOT-IMAGE is a BD-carried dot-matrix image variant; whichever of the two
  lands first BUILDS the shared seam. **My W-AUR-IMAGE-SOURCE builds-or-consumes it.**
- **The macro-flower ARRAY is consumer assets** (presets-in-consumers — `GOLDEN.md:277-280`): the library ships
  the `source="image"` axis; the demo supplies the curated array + cross-fade.

### 2.10 goo-dot-matrix setup split (6.8) + goo-blob kinematics leaf (6.9) — colocation carves

These are `[H]` device-free colocation carves (ratchet drains), NOT visual re-designs:

- **6.8 W-GOODOT-SETUP-SPLIT** — carve `useGooDotMatrix.ts` (508) `setup` into the M1-adopted setup shape; drains
  ratchet baseline #15; absorbs 7.1 verify as a clause (`EXECUTION-PROGRESS.md:110`; `build-map:588`).
- **6.9 W-BLOB-KINEMATICS-LEAF** — carve `useBlobSatellites.ts` (533) kinematics into a leaf; drains baseline #10
  (`EXECUTION-PROGRESS.md:111`; `build-map:589`). **SCOPE FENCE:** the BD goo-blob GOLDEN describes the fission
  SPLIT (`orbitRadius 0.17→0.30`, the mercury-pinch — `greenfield/goo-blob/GOLDEN.md:24,86-110`) as a SEPARATE
  visual mechanism wave; my 6.9 is the COLOCATION carve only (kinematics → leaf, no behavior change). The keystone
  must NOT fold the fission-split into 6.9 (a `[H]` carve is byte-identical paint). If the fission is wanted it is
  a fold-candidate note for the orchestrator, not a self-inserted change to 6.9.

### 2.11 reveal-bloom (6.4) + preview-live (6.5) — the two amended/kept viz waves

- **6.4 W-VIZ-REVEAL-BLOOM** — the entrance reveal-bloom (brightness overshoot ≥12% then settle). **AMEND: strip
  the orphan-DELETE** — the `useVizChoreography` DELETE is 10.5's (the dead-cut wave); 6.4 only VERIFIES
  `useVizChoreography` DEFINITION-ABSENT + BUILDS the reveal. Precond **10.5 ∈ preconds(6.4)** (10.5 deletes, 6.4
  verifies; the "6.4 removes the last consumer" prose is STRUCK) (`EXECUTION-PROGRESS.md:107`; `build-map:155-156,
  574-576`). π: deterministic brightness-filter readback; zero second bloom on scroll-off-and-back; PRM instant.
- **6.5 W-VIZ-PREVIEW-LIVE** — 11 DISTINCT live GL preview cards (7 leaf / 2 gated-approx / 2 field); shares
  `SectionPreviewCard.vue` with the demo IA 10.3; gate = per-card pixel-hash differs; π = per-viz recognizability
  + ≤1 live GL context (`EXECUTION-PROGRESS.md:108`; `build-map:577-578`). KEEP as-is.

---

## 3. The exact demigrate scope (what deletes, what stays) — the single most important deliverable

**DELETES (6.3 atomic):**
1. fourier-field: all 6 WGPU files (§2.3, ~1,445 LOC of `.wgsl`+WGPU-setup+bridge+GL-setup) → renderer becomes
   Canvas2D `ctx.stroke` over `useCanvas2D`, fed by the KEPT `math.ts`.
2. constellation: all 7 WGPU files (§2.3, ~1,066 LOC) → renderer becomes Canvas2D node/edge over `useCanvas2D`,
   fed by the KEPT field math (`createConstellationField.ts` etc).
3. concentric: the `.wgsl` PRIMARY only (KEEP `.glsl` WebGL2 fallback + dir + `index.ts` + key `/concentric`).
4. paper-grid: the `.wgsl` PRIMARY only (KEEP `.glsl` WebGL2 fallback + dir + `index.ts` + key `/paper-grid`).
5. orphaned `flow.wgsl`/`waveField.wgsl` (build-map §WS5.7) + relocate `CONCENTRIC_FIELD_NORM`.
6. drained ratchet baselines: `metaball.wgsl`/`flow-field.glsl` rows (shader-exempt manifest).

**STAYS (do NOT delete):**
- fourier `math.ts` (DFT epicycle, GPU-agnostic); constellation field-math composables; `useCanvas2D` backend
  (single-source clause stays GREEN); the `/fourier-field` + `/constellation` + `/concentric` + `/paper-grid`
  subpath KEYS (all four PRESERVED — no import re-point, no by-name ask); `watercolor-dot` (permanently out, the
  canonical no-migrate case, `NON_MIGRATING` grows to {watercolor-dot, fourier-field, constellation} OR they get
  Canvas2D `no-migrate` rows — the gate's exact re-classification is the wave's to author).
- The `DEFAULT_PARALLAX = 0` value (constants.ts:146) + its NEW born-RED protector arm.

**GATE MOVES (atomic in 6.3):** `proof-gpu-substrate-single.mjs:177-181` — flip fourier + constellation off
`verified`, remove concentric/paper-grid `.wgsl` from the primary set; `proof:constellation-gen` gains the
`DEFAULT_PARALLAX===0` born-RED arm; `proof:crossrepo-asks` gains `W5-viz-subpath-disposition`; `profile:budget`
re-pins DOWN.

---

## 4. Precepts + protected-set conformance (per wave)

- **§4 protected set honored:** all 10 waves BUILD on `createCanvasLifecycle`, the 3-backend picker, the
  parity-ΔE bar, the 1-GL-per-route budget, the JS split — none re-plumb them. `DOCK_SPRING` untouched (viz waves).
  Warm identity: the technicolor dot-flow ramp + metal are DEMO presets / opt-in finishes; the library default
  palette stays warm-cream (F5 fence — `GOLDEN.md:103,120`; teal-navy-purge HELD).
- **Compositor-only + PRM:** dot-flow trail = screen-res texture + point-sprites (`GOLDEN.md:225-229`); metal +
  image are shader-resident (no new pass, no new rAF); every wave inherits the leaf's PRM one-static-frame-then-park
  + offscreen-park (`PROCEDURAL-SUITE.md:34-37`). WCAG-2.2.2 pause via `DockBackgroundToggle`/`v-model:paused`
  (`GOLDEN.md:235`, `dot-matrix GOLDEN:318`).
- **Clean breaks:** demigrate is no-alias (delete `.wgsl`, no dual-path); dot-flow `FlowFieldConfig` extends
  clean-break (`GOLDEN.md:195`); metal ids 8/9 replace nothing.
- **≥2-consumer:** the shared texture-upload seam (aurora-image + dot-image = 2, `EXECUTION-PROGRESS.md:113`);
  `usePointerVelocityField` (dot-flow vortex + dot-matrix warp + goo — ≥2); `curlFBM` (dot-flow + paper-grid +
  aurora-curl, `PROCEDURAL-SUITE.md` chunk).
- **Fable/DesignSync (F8.3):** every visual [P] wave (6.1/6.3/6.4/6.5/6.6/metal/image) names `fableArm` +
  `designSyncSurface` (the col in EXECUTION-PROGRESS.md §1 — e.g. 6.6 "dotflow field / `/substrates` dotflow").
  The `[H]` carves (6.8/6.9) are device-free, no Fable arm.
- **Gestalt bar:** dot-flow "the reference flowing dot-wave read" (√φ in spawn density/trail half-life/vortex
  radius — `GOLDEN.md:56`); metal "deeper reads warm folded metal, 25× local contrast" (technicolor-DR); image
  "a real photo dissolving into a slow abstract color field." Judged BOTH modes BOTH engines at each wave's OWN
  non-authoring close (NO terminal funnel — abolished, `EXECUTION-PROGRESS.md:33`).

---

## 5. Open reconciles the keystone spec author must resolve (flagged, not self-decided)

1. **dot-flow "compute STAYS WebGPU" vs the GOLDEN's real WebGL2 state-texture path** (§2.7). Resolution offered:
   both — WGPU compute primary (rebuilt/advected) + WebGL2 equal-gestalt state-texture fallback + the substrate
   `preserveDrawingBuffer:true` R0 fix. Not a conflict; the keystone should state the dual explicitly.
2. **aurora vividness floor** (§2.8): in the BD GOLDEN but NOT in the frozen wave row for W-AUR-METAL-FINISH.
   Record as adjacent; raise a fold-candidate note IF wanted, never self-insert (wave SET frozen).
3. **goo-blob fission SPLIT** (§2.10): a BD GOLDEN visual mechanism, DISTINCT from the 6.9 `[H]` kinematics carve.
   Keep them separate; fission is a fold-candidate note, not a 6.9 change.
4. **`NON_MIGRATING` re-classification shape** (§3): fourier + constellation to `no-migrate` Canvas2D rows OR
   removed from the WebGPU roster — the gate's exact re-classification is the demigrate wave's authored decision;
   the keystone should NAME which (recommend: `no-migrate` rows with a Canvas2D reason, mirroring watercolor-dot,
   so the family table stays complete per `gpu-parity-table.md:6-7`).

---

## 6. Source ledger (grepped/read before citing)

- `docs/tranches/BG/keystones/SEED-KEYSTONES.md` — the mandate + spec shape.
- `docs/tranches/BG/execution/EXECUTION-PROGRESS.md:105-113` — the 9 F9 rows (frozen wave ids).
- `docs/tranches/BG/execution/bg-build-map.md:531-590` (WS5 detail), `:1381-1407` (G7 viz-subpath lock),
  `:1383-1385` (the two-swap resolution).
- `src/components/custom/PROCEDURAL-SUITE.md` — the family doc + per-viz migration table.
- Per-viz disk: `ls` + `wc -l` + substrate-wiring greps (§1 table, all cited inline).
- `src/components/custom/fourier-field/README.md:217-226`, `constellation/README.md:5,12,48` — the DO-NOT-MIGRATE
  verdicts the demigrate restores.
- `scripts/proof-gpu-substrate-single.mjs:170-181,404-412` — `NON_MIGRATING`, VALID_STATUS, Canvas2D clause.
- `docs/tranches/BB/audit/gpu-parity-table.md:6-7,21-24,112-124` — the `verified`/`no-migrate` row shapes.
- `docs/tranches/BD/greenfield/aurora/GOLDEN.md` (metal 8/9, image source, discard re-plumb, dual-port);
  `dot-flow-field/GOLDEN.md` (AURORA CURRENT, spike-verified); `goo-blob/GOLDEN.md:24-110` (fission — NOT 6.9);
  `goo-dot-matrix/GOLDEN.md` (setup); `dot-matrix/GOLDEN.md` (velocity-warp, no image seam here).
- `docs/tranches/BD/viz/fleet2/apple-awwwards-sota.md:123-131,144-147,157,179-183` (iOS-27 metallic-flow-field +
  the one-GL/GPU-when-brand SOTA restraint) — the SOTA references for metal + the substrate discipline.
- `docs/tranches/BD/viz/arch/no-fallback-policy.md` — the SUPERSEDED-for-fourier/constellation GPU-only stance
  (§2.1 resolution).
- `src/composables/glass/webgpu/useGpuSubstrate.ts:97,160,346` (`dprPolicy`/`presize` already exist — 6.1 is
  ADOPT); `src/composables/glass/canvas2d/useCanvas2D.ts` (the demigrate re-home target).
- `src/components/custom/constellation/constants.ts:146` (`DEFAULT_PARALLAX = 0`);
  `src/components/custom/aurora/constants/presets.ts:61-74` (`AuroraMedium` union stops at kuwahara),
  `aurora/composables/uniformBridge.ts:51` (`MEDIUM_ID` stops at kuwahara:7 → metal is 8/9).
