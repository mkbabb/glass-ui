# The GPU-only PERF budget — multi-viz, multi-blob, the dot-matrix image field, level-set rings (BD viz-arch)

**Lane** BD viz-research / architecture · **Status** AUTHORED 2026-06-22 · **Branch** `prototype/liquid-dock` ·
**Substrate-grounded** against `createCanvasLifecycle` + `useGpuSubstrate` + the 10 viz consumers + `scripts/{proof-offscreen-pause,proof-perf-producer,proof-lighthouse,profile-bundle}.mjs` + `src/components/custom/aurora/constants/budget.ts` + the existing `flow-field.compute.wgsl.ts` compute pattern ·
**Scope** PLANNING/RESEARCH ONLY — zero `src/` edits. THIS doc is the binding artifact; the wave that executes it is `W-VIZ-PERF-BUDGET` (named in §9).

> Read alongside `gpu-substrate-unify.md` (this doc OWNS the perf budget; that doc owns the backend DELETE — the two are complementary, no overlap), `blob.md` §4-5 (the SDF-field-vs-compute decision for the multi-blob sim), `dotmatrix-image.md` (the tessellated image field), `concentric-levelset.md` + `papergrid-warp.md` + `wave-math-shared.md` (the shared-wave-math viz that ride a single fullscreen fragment each).

---

## 0. TL;DR — the perf-first axioms (performance "above all")

The user's edict: **performance above all**, multiple vizzes per page, multi-blob + satellites + lava-lamp sim, the dot-matrix image field, the level-set rings. The budget is governed by SEVEN axioms, each gate-locked:

1. **ONE GPU context per route, hard cap N=2 live contexts simultaneously visible.** A `<canvas>` + GPU context is the expensive resource (driver memory, a swap chain, a present per frame), NOT the shader cost. The page budget is COUNTED IN CONTEXTS, not draws.
2. **Every context is offscreen-paused + PRM-frozen by construction** (the `createCanvasLifecycle` leaf — already shipped). A parked context attaches ZERO frames. This is what makes "multiple vizzes per page" affordable: only the on-screen+in-motion contexts cost anything.
3. **The simulation runs in a COMPUTE pass when N (balls/particles) crosses the break-even; in the FRAGMENT field below it.** The break-even is measured, not guessed (§3). For the ball-counts a UI mark needs, the screen-space SDF FRAGMENT field wins; the compute door opens only for the dense satellite-swarm / dot-image-field registers.
4. **Instancing for any repeated primitive** (dots, satellites-as-billboards, level-set ring segments) — one draw call, a per-instance storage buffer, never N draw calls.
5. **DPR is CAPPED per-surface by visual role** (focal sharp = 2×, decorative wash = 1.5×, dense dot-field = 1.5×). The fragment cost is `O(W·H·dpr²)` — the DPR cap is the single biggest fragment-cost lever.
6. **The fallback policy is settled by `gpu-substrate-unify.md`:** WebGPU-first / WebGL2-net (both GPU), ZERO Canvas2D render path. The compute-vs-fragment choice MUST degrade gracefully — a WebGL2 host has NO compute, so every compute-sim viz needs a fragment-field WebGL2 path (§3.4).
7. **The mobile floor is the binding number** — the lighthouse gate throttles 4×-CPU and pins mobile perf ≥69. The budget is sized for the THROTTLED mobile frame, not the dev-box Metal frame.

---

## 1. The page-context budget — the hard cap, counted in contexts

### 1.1 The cost model

A live GPU viz costs, per frame: (a) a `getCurrentTexture` + present (swap-chain churn), (b) the fragment/compute shader invocations, (c) the per-frame uniform upload, (d) — for a compute-sim — a storage-buffer round-trip. (a) is FIXED per context and is the dominant cost of having a context AT ALL; (b) scales with `W·H·dpr²`; (d) scales with N particles.

**The budget is therefore counted in CONTEXTS, with a per-context fragment/compute sub-budget.** A page with eight parked contexts and two live ones costs as much as a page with two live contexts — the park is total.

### 1.2 The hard cap

- **ONE live GPU context per ROUTE is the design default** (the shipped `one-GL-per-route` discipline — `proof:demo-design` D6 already reds a GL context added to a static-wash route). A story self-stages ONE context (the `rail.vue` / `DockStage` precedent).
- **N=2 live contexts visible SIMULTANEOUSLY is the absolute ceiling** (the demo-shell dock-over-aurora case: the dock's now-playing aurora + a foreground viz). A third live context on screen reds the budget gate.
- **The dock is NOT a separate context** — the dock's glass reads the route's aurora THROUGH `backdrop-filter` (the AX.W54 glass-first identity); it never mounts its own GPU surface. The "dock over a live aurora" is ONE aurora context, the dock is CSS glass over it.
- **A multi-blob field is ONE context** (N cores + M satellites in ONE fragment field / ONE compute buffer — never one context per blob; §3).
- **A dot-matrix image field is ONE context** (one instanced draw of the whole lattice; §4).

### 1.3 The offscreen-pause economics (why the cap is affordable)

`createCanvasLifecycle` parks a context on ANY of: tab-hidden, content-visibility-skipped, IntersectionObserver-offscreen, PRM-reduce, or manual pause. The suspend `Set` runs the loop IFF empty. So a storybook index page with twelve viz cards costs ONE-to-TWO live contexts (the in-viewport ones) regardless of how many are mounted — the rest are parked-zero-frame. **This is the load-bearing invariant that lets "multiple vizzes per page" coexist with "performance above all."** The wave MUST NOT introduce a viz that escapes the lifecycle park (a private rAF, a `setInterval` sim tick) — `proof:offscreen-pause` reds it.

---

## 2. DPR — the single biggest fragment-cost lever

Fragment cost is `O(W·H·dpr²)`. On a 4K retina display `devicePixelRatio` is 2-3; uncapped, a fullscreen fragment viz pays 4-9× the 1× cost. The shipped `budget.ts` already caps per visual role:

| surface role | DPR cap | rationale (shipped) | BD viz mapping |
|---|---|---|---|
| **focal sharp** | **2×** (`AV_DPR_MAX`) | a silhouette read crisp (blob edge, dot circles) | blob (the mark), dot-matrix (crisp SDF circles) |
| **decorative wash** | **1.5×** (`AV_AURORA_DPR_MAX`) | an atmosphere — structure reads at 1.5×, the wash hides the rest | aurora, concentric level-set rings, paper-grid, dot-image-field background |
| **dense particle field** | **1.5×** | the field density hides per-pixel sharpness | dot-flow-field, the dense satellite swarm |

**The BD rule:** every NEW viz declares its DPR cap as a named constant in its `constants/budget.ts` (the per-viz mirror), defaulting to 1.5× (decorative) and lifting to 2× ONLY for a focal silhouette-read surface. The `proof:perf-producer` W4 precedent (two surfaces read DISTINCT ceilings; a wave that lowers both fails) extends: a viz that uncaps DPR or pins a fullscreen wash at 2× reds the budget gate. **Never** read raw `devicePixelRatio` in a viz resize — read the capped getter.

### 2.1 The fragment-area sub-budget

Within a context, the fragment cost is bounded by `clientArea × dpr²`. The lever beyond DPR is the SHADER COMPLEXITY (loop counts):
- **fbm octaves** capped at 3-4 (the shipped aurora/flow `potentialFBM` is 3 octaves — each octave is a `valueNoise` + a rotation; 5+ is the mobile-throttle killer).
- **per-fragment SDF eval count** (the multi-blob field): each fragment evals `N+M` circle-SDFs in the smin loop. This is the `O(W·H·N)` term — §3 bounds N+M.
- **ring count** (concentric level-set): each fragment evals the distance to `R` rings. `R` capped at ~24 (a moiré field reads at 12-24; beyond is invisible-and-expensive).

---

## 3. The simulation — COMPUTE vs FRAGMENT, the measured break-even

This is the central perf-architecture decision for the multi-blob + satellite + lava-lamp + dot-flow scope.

### 3.1 The two architectures

- **FRAGMENT field (screen-space SDF):** the simulation state (N core positions, M satellite positions + radii) lives in a small UNIFORM buffer (≤ a few hundred floats), the CPU integrates the positions each frame (cheap — N+M is small), and EVERY FRAGMENT evals the `N+M` SDFs smin-merged. Cost: `O(W·H·(N+M))` fragment + `O(N+M)` CPU integrate. No storage buffer, no compute pass, no round-trip. **This is the shipped blob.**
- **COMPUTE sim (GPGPU particle buffer):** the state lives in a STORAGE buffer; a `@compute @workgroup_size(64)` pass integrates all P particles in parallel (the shipped `flow-field.compute.wgsl.ts` pattern — anchored-lattice critically-damped pull), then a RENDER pass (instanced billboards or a density-splat fragment) draws them. Cost: `O(P/64)` compute dispatches + the render pass. Scales to thousands-to-millions of particles; needs WebGPU (no WebGL2 compute).

### 3.2 The break-even — where compute wins

The compute pass has a FIXED overhead (dispatch + barrier + storage round-trip) that the fragment field does not pay. Compute wins ONLY when:
- **P is large** (thousands+): the parallel integrate beats the per-fragment re-eval. The shipped dot-flow-field (a few thousand anchored lattice dots) is the canonical compute case.
- **the per-particle state is rich** (velocity + acceleration + lifecycle phase): a uniform buffer cannot hold per-frame-evolving per-particle state cheaply; a storage buffer can.
- **the render is INSTANCED** (one billboard per particle), not a per-fragment field eval.

The fragment field wins when:
- **N+M is small** (≤ ~32 SDFs): a UI blob-mark (4-8 cores + 4-16 satellites = ≤24 SDFs) is BELOW the compute break-even. The AY research measured "WebGPU compute is a net LOSS at ≤4 nuclei" — the multi-blob scope lifts the count but stays in the ≤32-SDF fragment-field range for a mark.

### 3.3 The DECISION per BD register

| register | architecture | N/P | rationale |
|---|---|---|---|
| **blob — the lit mark** (N cores + M satellites, lava-lamp) | **FRAGMENT SDF field** | N≤8, M≤16, total ≤24 SDFs | below the compute break-even; keeps the analytic gradient → normal/lighting/refraction (the lit register needs it — a density-splat loses it). The CPU integrates the lava-lamp lifecycle (irrational-frequency drift + swell/fade envelope) into the uniform buffer; the fragment evals the smin field. |
| **blob — the dense satellite swarm** (OPT-IN, hundreds of micro-satellites) | **COMPUTE → density-splat** | P up to ~512 | above break-even; the dense swarm is a SEPARATE OPT-IN register (a config flag), NOT the default mark. It loses the analytic gradient (a `dFdx` of the density field substitutes) — so it is the un-lit "soup" register, the lit-mark stays on the SDF field. |
| **dot-flow-field** (anchored lattice) | **COMPUTE (shipped)** + instanced render | P = a few thousand | already shipped; the canonical compute case. KEEP. |
| **dot-matrix image field** (tessellated image) | **COMPUTE (fade/grow per-dot) + instanced billboards** | P = grid `cols×rows` (a few thousand) | the per-dot fade-in/out + grow/shrink + the image-target sampling is per-particle evolving state → storage buffer + compute integrate, instanced billboard render. The aurora field-sampling logic generalizes into the compute pass as the per-dot target value (§4). |
| **concentric level-set rings** | **FRAGMENT** (fullscreen) | R≤24 rings | a fullscreen fragment evaluating the distance-to-level-set field + the shared wave warp; no per-particle state → no compute, no instancing. ONE draw. |
| **paper-grid** | **FRAGMENT (shipped)** | — | a fullscreen derivative-AA grid on the curl-warped sheet; ONE draw. KEEP. |

**The architectural rule:** a viz uses COMPUTE iff (P > ~1000 AND per-particle state evolves per-frame AND the render is instanced). Otherwise it is a FRAGMENT field. The blob's LIT mark is a fragment field; its DENSE-swarm opt-in is compute. This split is gate-recorded so a future agent does not "upgrade" the lit mark to compute (losing the gradient) or "downgrade" the dot-flow to a fragment re-eval (losing the parallel integrate).

### 3.4 The WebGL2 graceful-degrade (the compute viz has no compute on WebGL2)

A WebGL2 host has NO compute pass. Every compute-sim viz MUST carry a WebGL2 path that produces the SAME gestalt:
- **dot-flow-field** (shipped): the WebGL2 net runs the SAME anchored-lattice math in a FULLSCREEN FRAGMENT that re-evals the displacement per-fragment (the `flow-field.glsl.ts` fallback) — a coarser CPU-stepped density, parity `degraded` but the same flow.
- **dot-matrix image field** (new): the WebGL2 net runs the per-dot fade/grow as a fullscreen fragment evaluating the dot-grid coverage + the image-target sample per-pixel (no instancing, no compute — the fragment re-derives each dot's state from `t` + the deterministic lattice). Parity `degraded` (CPU-equivalent density), same image read.
- **dense satellite swarm** (new opt-in): the WebGL2 net caps the swarm count to the fragment-field ceiling (≤24 SDFs) and runs the standard smin field — the dense register simply does not engage on WebGL2 (a documented degrade, never a crash).

**The fence:** the compute path is the WebGPU PRIMARY; the fragment re-eval is the WebGL2 NET. Both are GPU. The `gpu-substrate-unify.md` §2 decision (WebGL2 is an allowed GPU path) governs — the degrade is a second GPU backend, not a Canvas2D fallback.

---

## 4. The dot-matrix IMAGE field — tessellated arbitrary images (the new dot-flow scope)

The mandate: dot-flow-field becomes a dot-matrix facility where dots **fade in/out, grow/shrink slightly, and TESSELLATE to display ARBITRARY IMAGES** (a blob, a wave washing over naturally, a cloud washing over) — leveraging similar AURORA logic but in dot-matrix areas.

### 4.1 The architecture

- **ONE context, ONE instanced draw, ONE compute pass.** The lattice is a fixed `cols×rows` grid of dots (a few thousand). Each dot is an instance (a billboard quad), its per-instance state `(position, size, opacity, targetValue)` in a STORAGE buffer.
- **The compute pass** integrates each dot's state toward its TARGET each frame: the target `opacity`/`size` is sampled from the IMAGE-TARGET field at the dot's lattice position. The image target is either (a) a procedural field (the aurora `nucleiField` / a blob SDF / a cloud fbm — "similar aurora logic"), or (b) a sampled TEXTURE (an arbitrary uploaded image, sampled in the compute pass). The dot eases toward its target with the SAME critically-damped `mix(p, target, 1-exp(-k·dt))` the shipped flow-field uses — so the image "washes over naturally" (the ease IS the wash).
- **The render pass** draws the instanced billboards with the per-instance size/opacity, the crisp `fwidth` SDF circle (the dot-matrix rasterizer the suite already ships).

### 4.2 The perf bound

- **dot count** capped at ~`128×72 ≈ 9216` instances at the dense end (a few thousand is the readable range; beyond is invisible-and-expensive at the mobile throttle). The compute dispatch is `ceil(P/64)` workgroups — ~144 workgroups at 9216 dots, trivial.
- **DPR 1.5×** (the dense-field cap — the dot density hides per-pixel sharpness).
- **the image-target sample** is the per-dot cost: a procedural field (3-octave fbm / an SDF eval) is cheap; a TEXTURE sample is one `textureLoad` — both per-dot, not per-pixel. This is why it is COMPUTE not fragment: the target is sampled ONCE per dot, not once per pixel-of-dot.
- **the WebGL2 net** (no compute): a fullscreen fragment re-derives each dot's coverage from the lattice + samples the same target per-pixel — `degraded` (it pays the target sample per-pixel-of-dot, but at 1.5× DPR over a dot-grid the cost is bounded). The image still reads.

### 4.3 The shared-aurora-logic reuse

The image-target field reuses the aurora `nucleiField` / `procedural-color` chunk for the procedural-image case (a blob, a cloud) — ONE math source, the WGSL/GLSL chunk the suite already shares (`wave-math-shared.md`). The novel bit is the per-dot TARGET sample (compute) replacing the per-pixel composite (aurora's fragment) — the SAME field, a different sampling rate.

---

## 5. The level-set rings (concentric) + the shared wave-warp (paper-grid + concentric + dot-matrix)

### 5.1 Concentric — level sets of a random curve, fragment field

The mandate: irregular level-set rings of arbitrary count, moving together with inner variation, stretching/shrinking, warped by the SAME wave math as the grid lines.

- **ONE fullscreen FRAGMENT, no compute, no instancing.** Each fragment computes its distance to the level-set field of a randomly-generated curve (a sum of harmonics / an fbm potential), then draws the rings as the iso-contours of that field (`abs(fract(field·R) - 0.5)` band, AA'd by `fwidth`). The "arbitrary ring count" is a uniform `R`; the "inner variation" is a per-ring phase offset in the field; the warp is the shared curl/wave perturbation applied to the sample coordinate.
- **Perf:** `O(W·H)` fragment, R-independent (the ring band is a single `fract` of the field, not R distance evals) — so "arbitrary count" costs nothing extra. DPR 1.5× (decorative). ONE draw.
- **This is the cheapest viz in the suite** — a fullscreen fragment with no state, no buffer, no compute. It can coexist with a second live context comfortably.

### 5.2 The shared wave-math chunk (the perf consolidation)

paper-grid, concentric, and the dot-matrix-image procedural target all warp/perturb with the SAME wave math (`wave-math-shared.md` owns the chunk design). The PERF consequence: ONE shared WGSL/GLSL chunk (the curl-fbm + Gerstner sum already shipped in `flow.glsl.ts` / `flow-field.compute.wgsl.ts`) is spliced into each — no per-viz re-derivation, no shader-bytes duplication, and the `proof:gpu-substrate-single` parity bar measures ONE math across both backends. Deepening paper-grid's warp is a UNIFORM change (the warp amplitude/octaves), not new shader code — so it costs nothing beyond the (capped) octave count.

---

## 6. Instancing — the repeated-primitive rule

Any viz drawing a REPEATED primitive uses INSTANCING (one draw call, a per-instance storage/vertex buffer):
- **dot-matrix / dot-image-field / dot-sphere** — instanced billboard quads (shipped).
- **dense satellite swarm** — instanced billboards (the compute register).
- **level-set rings** — NOT instanced (a fullscreen fragment evals all rings; instancing N ring meshes would be SLOWER than the fragment iso-contour).
- **the lit blob field** — NOT instanced (a fullscreen fragment evals the smin field; the cores/satellites are uniform data, not instances).

**The rule:** instance a primitive iff it is a DISCRETE drawable with per-instance transform (a dot, a billboard). A FIELD (a smin merge, an iso-contour) is a fullscreen fragment, never N instanced meshes. A wave that instances a field, or fragment-re-evals a discrete primitive grid, fails the budget gate.

---

## 7. The per-frame upload + buffer discipline

- **Uniform upload** — ONE `writeBuffer` per frame per context, a typed-struct (the `uniformBridgeWGPU.ts` SoT — the std140-vs-WGSL alignment fence). Never N small writes.
- **Storage buffer** — allocated ONCE at setup, ping-pong only if the compute reads-and-writes the same buffer (the shipped flow-field reads+writes in place, no ping-pong needed for the critically-damped pull). Never re-allocated per frame.
- **No GPU→CPU readback in the loop** — a `mapAsync` round-trip stalls the pipeline. The sim state stays GPU-side; the CPU writes the uniform inputs, never reads the particle buffer back. (The shipped flow-field never reads back — the lattice is permanent, the CPU owns only the wave-table uniforms.)
- **One canvas, one context, disposed on unmount** — the `proof:perf-producer` W3 invariant (exactly ONE `<canvas>` per viz, ONE `getContext`, the double-arm guard, the `onUnmounted` dispose). Extends to every BD viz.

---

## 8. The budget gate numbers (the binding floor)

The shipped `proof:lighthouse` floor enrolls 6 surfaces, 4×-CPU-throttled mobile:
- **desktop perf ≥96** across all enrolled surfaces (incl. the live-WGSL viz floor class).
- **mobile perf ≥69-73** under the 4× throttle.
- **CLS ≈0** (the static `min-block-size` reserve + `proof:no-layout-animation` — a viz canvas reserves its box, never grows post-mount).

**The BD viz waves enroll their own surfaces** at the achieved floor (the dot-flow-field viz floor-class precedent). A NEW viz that drops a surface below its pinned floor reds the gate; the floor is re-pinned via `--rebaseline` (a reviewed write, never a silent lower). The binding measure is the LIVE Chrome run (the `proof:lighthouse` real-Chrome arm), not the device-free gate alone.

### 8.1 The multi-viz page test (the new binding case)

The BD scope (multiple vizzes per page) needs a NEW enrolled surface: a page with the N=2 simultaneous-live-context ceiling (the dock-over-aurora + a foreground viz). It is pinned at its achieved throttled-mobile floor and gated so a third live context (or an un-parked offscreen viz) reds it. This is the case the current 6-surface floor does NOT cover — the wave adds it.

---

## 9. The wave + the gate (the executable spine)

**Wave: `BD.W-VIZ-PERF-BUDGET`** (viz-arch band, ALONGSIDE `W-GPU-ONLY-SPINE` — the spine deletes the dead backend, this budget governs the live ones; the per-viz redevelopment waves CONSUME both).

- **Builds:** the per-viz DPR-cap constants (the `budget.ts` mirror per new viz); the compute-vs-fragment decision recorded per register (§3.3); the N=2-context page-budget gate; the multi-viz enrolled lighthouse surface (§8.1).
- **Gate `proof:viz-perf-budget`** (device-free arms + a binding live arm):
  - **P1 — the context cap.** A census over the demo routes asserts ≤1 live GPU context per route by default (the `proof:demo-design` D6 precedent extended to the viz routes) + the N=2 simultaneous ceiling on the dock-over-viz case. A third live context reds.
  - **P2 — every viz composes the lifecycle leaf** (no private rAF / `setInterval` sim tick that escapes the park — `proof:offscreen-pause` is the existing arm; this asserts the new viz are enrolled).
  - **P3 — the DPR cap.** Every new viz reads a CAPPED DPR getter (1.5× decorative / 2× focal), never raw `devicePixelRatio`; a fullscreen wash pinned at 2× reds (the `proof:perf-producer` W4 distinct-ceiling precedent).
  - **P4 — the compute-vs-fragment register is recorded** (§3.3 table) so the lit blob mark stays a fragment field (gradient-preserving) and the dot-flow stays compute (parallel-integrate) — a "upgrade the mark to compute" or "downgrade the flow to fragment" reds; a self-test bite plants each inversion.
  - **P5 — instancing** for discrete repeated primitives (dots/satellites-as-billboards), fullscreen-fragment for fields (smin/iso-contour); a field-instanced or grid-fragment-re-eval inversion reds.
  - **P6 — no in-loop readback** (`mapAsync` in the per-frame path reds); ONE uniform `writeBuffer`/frame; storage buffer allocated once.
  - **P7 — the lighthouse floor holds** (the binding live arm — the enrolled surfaces incl. the new multi-viz page stay ≥ their pinned throttled-mobile floor; re-pin via `--rebaseline` only).
  - **A self-test bite per device-free clause** (a synthetic third live context reds P1; a raw `devicePixelRatio` read reds P3; a compute-lit-mark reds P4; a private rAF reds P2).
- **`proof:ba-gestalt`** — the per-viz redevelopment waves carry the gestalt verdicts; this budget wave carries NO gestalt of its own (it sizes the budget, it paints no new pixel). The binding PAINT is the live lighthouse arm (P7).

---

## 10. Summary deltas (for the roster)

- **The budget is counted in CONTEXTS, not draws** — ONE live GPU context per route default, N=2 simultaneous-visible ceiling. Offscreen-pause makes "many vizzes per page" affordable (parked = zero frames).
- **The sim is COMPUTE iff (P>~1000 AND per-particle evolving state AND instanced render); else FRAGMENT field.** The lit blob mark is a fragment SDF field (≤24 SDFs, gradient-preserving); the dense satellite swarm + dot-image-field + dot-flow are compute; concentric + paper-grid are fullscreen fragments.
- **Every compute viz carries a WebGL2 fragment-re-eval net** (graceful degrade, parity `degraded`, same gestalt — no crash, no Canvas2D).
- **DPR is capped per visual role** (focal 2× / decorative+dense 1.5×) — the single biggest fragment-cost lever; never read raw `devicePixelRatio`.
- **Instance discrete repeated primitives; fullscreen-fragment fields** — never the inversion.
- **The dot-matrix image field is ONE context, ONE compute pass, ONE instanced draw** — per-dot target sampled (procedural aurora-logic field or a texture), the critically-damped ease IS the "natural wash-over."
- **The level-set rings are the cheapest viz** — a fullscreen fragment, R-independent iso-contours, no buffer/compute.
- **Wave `BD.W-VIZ-PERF-BUDGET`** + `proof:viz-perf-budget` (P1-P7 + self-test) + the live lighthouse floor lock it; no `proof:ba-gestalt` (the per-viz waves own the pixels).
