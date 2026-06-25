# Critique — W-DOT-UNIFY → W-DOT-IMAGE (the 3 dot vizzes → ONE `<DotMatrix>`)

**Lane** BD viz / critique / dot-unify · **Status** ADVERSARIAL audit, 2026-06-22 · **Branch** `prototype/liquid-dock` ·
**Scope** PLANNING — zero `src/` edits · grounded against `src/components/custom/{dot-flow-field,dot-matrix,goo-dot-matrix}/**` + `union/{UNIFIED-ROSTER,EXECUTION-DAG}.md` + `fleet2/dotflow-surpass.md` + VIZ-BAND-PLAN.md D4 at HEAD.

VERDICT: **REVISE — the unify premise is FALSIFIED by HEAD, the texture path is greenfield-unproven on WebGL2, and the migration collides head-on with three live waves the fold does not name.** Three findings are blocking.

---

## 0. The load-bearing falsifications (each verified against HEAD source)

### F1 — [BLOCKING] "the SAME instanced-billboard + `fwidth`-SDF rasterizer over different drivers" is FALSE. The three vizzes are THREE DISTINCT rendering MECHANISMS.

D4 + dotflow-surpass §2.1 both rest on the claim that the three dot vizzes share "the SAME instanced-billboard + fwidth-SDF rasterizer." Grepped at HEAD, they do not:

| viz | WebGPU mechanism | AA / dot | compute? |
|---|---|---|---|
| dot-flow-field | **instanced billboard quads** (`@builtin(instance_index)` reads a `array<Particle>` storage buffer) | billboard-local **`smoothstep`** (`1 - smoothstep(1-feather,1,length(local))`), NO `fwidth` | **YES — a 64-wide `@compute` advection pass** (191 LOC `flow-field.compute.wgsl.ts`) |
| dot-matrix (sphere) | instanced billboard quads (static phyllotaxis buffer) | billboard-local soft falloff | NO |
| goo-dot-matrix | **fullscreen-triangle FRAGMENT** that QUANTIZES `fragCoord` to a dot grid (`uDotPixelSize`) — NO instancing, NO per-dot geometry | **`fwidth`-SDF** in the fragment | NO |

So `fwidth` lives in EXACTLY ONE of the three (goo-dot), and that one has NO instancing at all (it's a fullscreen fragment quantizer). dot-flow's WebGPU path is instanced-compute; its WebGL2 fallback is a *third* shape — a "fullscreen-fragment dot-lattice" (per `flow-field.glsl.ts:6`, the nearest-anchor-per-pixel model). The "ONE AA canon common to all three" is a fiction; the unify is collapsing **instanced-compute + instanced-static + fullscreen-quantize** into one component. That is not a DRY consolidation of a duplicated rasterizer — it is the **invention of a NEW rasterizer that none of the three currently uses**, plus a per-axis dispatch to choose among the old behaviours. The 5067-LOC "high-dup surface" is mostly the substrate/color/pointer/configurator scaffolding (genuinely shared already via `createGpuSubstrate` + `procedural-color` + `usePointerVelocityField`), NOT the rasterizer. **The unify's stated DRY win targets the wrong layer.**

### F2 — [BLOCKING] `<DotMatrix>` is a NAME COLLISION — the unified component silently takes over the sphere viz's already-exported public symbol, stranding that consumer.

`src/components/custom/dot-matrix/index.ts:1` already exports `DotMatrix` (the BC.W-VIZ-DOTMATRIX sphere globe) on the `/dot-matrix` subpath. The fleet doc's "unified `<DotMatrix>`" reuses BOTH the component name AND the subpath. So the "clean break" is not clean: a consumer importing `{ DotMatrix } from "@mkbabb/glass-ui/dot-matrix"` today gets the sphere; post-fold the SAME import gets a god-component whose default `projection` had better be `sphere` or every existing consumer + `tests-visual/dot-matrix.spec.ts` silently re-renders a grid. This is not addressed anywhere. Either (a) the unified primitive is a NEW name (`<DotField>`?) and `/dot-matrix` stays the sphere — contradicting the "consolidate onto `/dot-matrix`" plan — or (b) it keeps the name + subpath and the migration MUST prove byte-near-identity for `projection="sphere"` default, which the spec never commits to. **The no-legacy "clean break" hand-waves the one rename that actually has live binary consumers.**

### F3 — [BLOCKING] the migration collides with THREE live union waves the fold never names — a DAG hazard, not a clean sequence.

dotflow-surpass §4 + VIZ-DAG.md sequence `W-DOT-UNIFY ← W-GPU-ONLY-SPINE`, `W-DOT-IMAGE ← W-DOT-UNIFY + W-FIELD-ENGINE`. But the unify CONSUMES `goo-dot-matrix`, which:

1. **imports `sceneDistG`/`BLOB_CONFIG_DEFAULTS` from `goo-blob`** (`goo-dot-matrix/constants.ts:21`, `gooDotLattice.ts:17` `import { fibonacciDot } from "../../dot-matrix"`). The union's **W-BLOB-RENAME** is an atomic 195-file `goo-blob→blob` across dirs/subpaths/symbols/tests (critique pass-1, the explicit "DAG edge BEFORE D4's goo-dot-matrix sceneDistG re-home"). So W-DOT-UNIFY has a HARD predecessor edge on W-BLOB-RENAME that VIZ-DAG.md omits — it lists only `← W-GPU-ONLY-SPINE`. Fold goo-dot before the rename and the splice points move under it.
2. is the named ≥2nd consumer of **`useLavaField`** (critique pass-1: "the real GPU-SDF consumer"). If W-DOT-UNIFY dissolves goo-dot-matrix into a `target="sdf"` arm of `<DotMatrix>`, `useLavaField`'s 2-consumer bar must re-resolve to the unified arm — un-checked in either doc.
3. **W-VIZ-TAILS owns `BD.W-GOOBLOB-SAT-SHADE` · `W-GOOBLOB-SQUIRCLE-REFRACT` · `W-BLOB-MOTION-TUNE`** (UNIFIED-ROSTER L120) — parity/GL-fence tails that edit the SAME `metaball.frag`/`sceneDistG` the unify re-homes as its blob target. Two waves writing the same shader body with no recorded merge order = a parity-wave conflict. The fold doc claims "byte-untouched `sceneDistG`" but does not reconcile against the tails that are SPECIFICALLY chartered to touch it.

`tests-visual/{dot-matrix,goo-dot}.spec.ts` exist; the consolidation must re-home or retire them (no migration row for the specs).

---

## 1. The god-component matrix — `projection × target × shape` IS combinatorial, and the "pluggable lattice" fence is HALF a fig-leaf.

The axes multiply: `projection ∈ {grid,sphere}` × `target ∈ {generative,texture,sdf,glyph}` × (for generative) `shape ∈ {wave,blob,cloud}`. That is ~2×(3+3) ≈ 12+ render-meaningful combinations, several of which are NONSENSE or unbuilt:

- `projection="sphere" target="texture"` — halftone an arbitrary image onto a Fibonacci globe? Undefined; the fleet doc never says what UV→sphere mapping applies.
- `projection="sphere" target="generative" shape="wave"` — a Gerstner band on a sphere? Unspecified.
- `target="glyph"` — admitted §6 as "DEFER if it forces a 2D context" (it does — see §2). A born-deferred axis member is god-surface that ships dead.

The **lattice-builders-pluggable fence is REAL for the `projection` axis** (`gridLattice`/`sphereLattice` are genuinely different geometry, correctly spliced-at-construction). It is a **FIG-LEAF for the `target` axis**: §2.2 says `T(uv,t)` is "behind ONE `targetMode` discriminated union" — a discriminated union sampled per-dot IS a runtime god-branch inside the hot fragment/vertex path, exactly the thing D4's own fence forbids ("spliced at construction, not a runtime god-branch"). A texture sampler, a metaball SDF eval, a curlFBM threshold, and an MSDF lookup cannot all be construction-spliced into one shader without `#if`/permutation compilation — which the spec does not mention. **Either the target arms are construction-time shader permutations (then say so + count the permutations) or they are a runtime `switch(targetMode)` in-shader (then the fence is violated).** The doc wants both and commits to neither.

The honest scope: unify the SUBSTRATE/color/pointer/configurator scaffolding (already mostly shared) + the `projection` lattice (real, construction-spliced); keep the THREE rasterizer mechanisms as construction-selected shader bodies; treat `target` as a SECOND construction permutation, not a runtime union — and BUDGET the permutation count (`projection × rasterizer × target` shader permutations is the real combinatorial cost, not a runtime god-path).

---

## 2. The Canvas2D-trap — the texture path is GREENFIELD and unproven on WebGL2-WebKit; the glyph path is an admitted trap.

§6 asserts the image source is "zero Canvas2D" via `ImageBitmap → copyExternalImageToTexture`/`texImage2D`. Grepped at HEAD: **`copyExternalImageToTexture`, `texImage2D`, AND `ImageBitmap` appear NOWHERE in `src/`.** No viz samples a texture; the only WGSL texture binding in the repo is the **consumer-less** `glassShader.wgsl` pilot. So:

- **The texture path is 100% net-new, on BOTH backends, and the doc treats it as a free "GPU upload."** It is not validated that the WebGL2 arm can do it: dot-flow's WebGL2 fallback is a **fullscreen-fragment dot-lattice** (`flow-field.glsl.ts`), NOT instanced — a `sampler2D` in a fullscreen fragment is trivial, but the spec's whole "per-dot size from texture" model wants the INSTANCED billboard path, which the WebGL2 arm does NOT have for dot-flow. So `target="texture"` needs the instanced-WebGL2 path built from scratch on WebKit (where instanced arrays + per-instance vertex attribs + a sampler must co-exist) — the spec's "trivial on both backends" is unverified hand-waving. **Safari-first means this is the HIGH-RISK arm, and it is the one the doc calls easy.**
- **`copyExternalImageToTexture` is WebGPU-only.** The WebGL2-WebKit twin is `texImage2D(…, ImageBitmap)` — a DIFFERENT API with DIFFERENT colorspace/premultiply/flipY semantics (`UNPACK_COLORSPACE_CONVERSION_WEBGL`, `UNPACK_PREMULTIPLY_ALPHA_WEBGL`). The "ONE math source round-tripped JS↔WGSL↔GLSL" parity discipline does NOT cover a texture-upload colorspace divergence — two backends can sample the SAME image and disagree on luminance. The `proof:dot-image` I3 bite ("texture path is `copyExternalImageToTexture` with NO `getContext("2d")`") checks the WGPU call but says nothing about the WebGL2 upload semantics. **The zero-Canvas2D fence is satisfiable; the cross-backend texture-luminance parity is the real unaddressed trap.**
- **The glyph 2D-trap is ADMITTED and unresolved** (§6 "a runtime canvas-rasterize of text IS a Canvas2D path (forbidden)…DEFER if neither is cheap"). Shipping a `target="glyph"` axis member whose only honest implementation is deferred is god-surface. CUT the glyph axis from W-DOT-IMAGE entirely; re-book it as its own MSDF-atlas wave with a real ≥2-consumer bar, or it is born-dead.

---

## 3. `washPhase` "washes over naturally" — a real SEED, a hand-wavy SPEC.

The directional-coverage-front idea is the genuinely-good part of the surpass. But it is under-specified to the point of un-buildability:

- The ONLY thing grounding it at HEAD is `waveBand(h, center, width)` (`flowField.ts:294`) — a **1-D scalar smoothstep**, NOT a directional 2-D front. The §3 `washPhase(o,t) = smoothstep(f(t)-feather, f(t)+feather, projection(o,D))` is a NEW primitive; "the 1-D analog of waveBand lifted to a directional front" describes intent, not a spec. No `projection(o,D)`, no `f(t)` ramp law, no curl-warp coupling exists.
- "**curl-warped** so the edge is organic" — this re-invokes `curlFBM` (the shared chunk's "#4+ consumer per D2"), but `curlFBM` warps a UV DOMAIN, not a scalar threshold front. WARPING THE FRONT is a distinct operation the doc conflates with domain-warp; the falsifiable bar (I2 "edge organic, not a straight line") does not pin HOW the curl couples to `f(t)`.
- "**Cross-fade between targets** interpolates in COVERAGE space (no flash)" (§3 last bullet) — this is the one genuinely-rigorous sub-claim (coverage-space lerp avoids the both-zero flash) and should be kept. But it presumes both targets are cheaply sampleable simultaneously — which for `texture` vs `generative` means TWO target arms live at once in the shader, re-raising §1's runtime-union problem.

`washPhase` is worth keeping as W-DOT-IMAGE's protagonist BUT must be specced as a concrete primitive (`projection`, `f(t)`, curl-coupling) with its OWN JS↔WGSL↔GLSL round-trip — not folded into the under-defined `T` union.

---

## 4. The salvage (what to keep, what to cut)

- KEEP: the `T(uv,t)` generalization of dot-flow's hardcoded `waveBand(height)` — that IS the elegant minimal-substrate insight, and `target="generative" shape={wave,blob,cloud}` IS the aurora-math-in-a-dot-render idea. KEEP the coverage-space cross-fade. KEEP the `maxScale·dotSize ≤ 0.5·pitch` halftone fence.
- FIX: add the W-BLOB-RENAME predecessor edge + the W-VIZ-TAILS `sceneDistG`-tails merge-order to the DAG; resolve the `<DotMatrix>` name/subpath collision EXPLICITLY (rename or prove sphere-default byte-identity); re-home/retire `tests-visual/{dot-matrix,goo-dot}.spec.ts` with migration rows; re-pin `useLavaField`'s 2nd consumer onto the unified arm.
- DOWNGRADE: `target` from a runtime discriminated union to construction-time shader permutations, and BUDGET the `projection × rasterizer × target` permutation count.
- CUT from W-DOT-IMAGE: the `glyph` axis (born-deferred 2D-trap → its own MSDF wave). VALIDATE the WebGL2-WebKit instanced-texture path + the cross-backend texture-luminance parity BEFORE claiming "trivial on both backends."
- SPEC: `washPhase` as a concrete round-tripped primitive, not prose.
