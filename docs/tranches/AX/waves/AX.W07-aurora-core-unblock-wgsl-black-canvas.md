# AX.W07 — Aurora core unblock: the WGSL black-canvas + WebGL2-default-until-parity

**Band** B · GRAPHICS · **Severity** blocker (co-headline) · **dependsOn** AX.W00 (the π visual-runtime
lane it closes on) · **Charter** AX.md §3 (the `### AX.W07` block, lines 528-575) + §4 note 1 (the two
black-canvas root-causes are ONE jointly-fixed defect) + §4 note 14 (the `WEBGPU_PARITY` lever + the
DELETE-the-auto-default disposition) + §4 note 12 (publish-currency vs code) + §2b band-B precept row ·
**Audit** `deep-audit-corpus.json` slice `aurora-core-breakage` (index 6, findings F0-F2) + slice
`aurora-webgpu-state` (index 10, findings F0-F4) + the preserved root-cause doc
`audit/W01-aurora-webgpu-blackcanvas.md` (pixel-level live confirmation) + `converge-digest.md`
(harden:aurora-blob — the gating-seam-is-not-an-existing-option + the unmeetable-parity reconciliation).

---

## State (born-RED — the gate must fail at HEAD before the wave)

The wave is born-RED on a **device-rendered non-black-aurora** witness that does NOT exist at HEAD
`eaba94f`. The live `<Aurora>` renders **pure black** on every WebGPU-capable machine — device-proven by
two converging audit slices + the preserved root-cause doc, all independently instrumenting the live GPU.

- **RED witness 1 (the headline — DEVICE-PROVEN, two compounding WGSL defects on ONE surface).** On a
  WebGPU-capable Mac/Chrome (`navigator.gpu` present, non-fallback adapter), the live `<Aurora>` stage
  swaps to the WebGPU backend (`canvas.getContext("webgpu")` truthy, `getContext("webgl2") === null`,
  `armed`, opacity 1, sized) and renders **`[0,0,0,255]`** (transparent-black on the premultiplied
  swapchain). Only the DOM `NucleiOverlay` rings show. The falsifiable RED assertion: *instantiate
  `createGPUCanvas` + `createGPUAuroraSetup` on a real `GPUDevice`, run the REAL `packGPUUniforms`, draw
  the DEFAULT config at t=1, read back the centre pixel — at HEAD `maxChannel === 0` (RED). After the wave
  it clears a non-black luma floor (GREEN).* The black is caused by **two distinct defects** that the
  audit device-bisected to the SAME symptom and that BOTH land together (§4 note 1):
  - **(1a) the int-in-float type mismatch.** `packGPUUniforms` (`uniformBridge.ts:151-167`) writes the five
    `i32` struct fields — `stopCount` / `nucleiCount` / `warpMode` / `noiseOctaves` / `medium`
    (`aurora.wgsl.ts:58,59,65,66,67`) — into a `Float32Array` (the `:151` comment literally says "as
    int-in-float"). WGSL reads the raw 4 bytes of `stopCount` as an `i32` and gets the IEEE-754 BIT-PATTERN
    of float `3.0` = **1077936128**, not the int `3` (device-verified: `stopCount_raw=1077936128`,
    `nucleiCount_raw=bits(2.0)`, `noiseOctaves_raw=bits(4.0)`). `samplePalette` then computes
    `t = id * f32(stopCount-1) ≈ id * 1.07e9` → `i0 = i32(floor(t))` overflows
    `array<vec4f, WGSL_MAX_STOPS>` bounds → `U.palette[i0]` returns zero → BLACK.
    (`warpMode`/`medium` read 0 only because config-0 ↔ float-0.0 share bit pattern 0 — coincidence.)
  - **(1b) the `var<uniform>` dynamic-index Metal miscompile.** `aurora.wgsl.ts:74-77` declares the
    dynamically-indexed `palette` / `nucleiPos` / `nucleiMod` arrays INSIDE the `var<uniform> U: Uniforms`
    struct (`:79`). On Apple/Metal (Tint→Metal codegen) a RUNTIME index into a `var<uniform> array<vec4f>`
    returns `[0,0,0,0]` while the IDENTICAL access from `var<storage,read>` reads `[93,185,191,255]`
    (device-proven in `W01-aurora-webgpu-blackcanvas.md`). `samplePalette` (`:117-123`, runtime `i0`/`i1`)
    and `nucleiField` (`:146-155`, `U.nucleiPos[i]` in a runtime loop) therefore sample a zeroed palette →
    black. The WGSL header comment claims "a storage buffer is dynamically sized" — the INTENT was storage,
    the implementation is uniform.

- **RED witness 2 (the gate-philosophy gap — the cardinal AX lesson, grep-falsifiable).** The aurora WebGPU
  substrate shipped GREEN across `proof:aurora-wgsl-equivalence` + `proof:webgpu-substrate-single` +
  `proof:aurora-backend-fallback` (all AW band, merged at `eaba94f`/`067473c`), yet renders BLACK on every
  WebGPU-capable device. `grep "GPUDevice"` over every `scripts/proof-*.mjs` = **0 acquisitions**:
  `proof:aurora-wgsl-equivalence` ports only the COLOR CHUNK (OETF/matrices/FBM) to TS and asserts 1e-6 vs a
  GLSL oracle (no device, never touches `samplePalette`/the assembled `fs_main`/the upload contract);
  `proof:webgpu-substrate-single` + `proof:aurora-backend-fallback` are regex/AST. NONE instantiates a
  `GPUDevice` or reads back a pixel — a `var<uniform>` dynamic-index miscompile is invisible to every
  existing gate BY CONSTRUCTION. RED: the gate fleet has a pipeline-level blind spot the wave makes concrete.

- **RED witness 3 (the gating seam does NOT exist — grep-falsifiable).** "DEFAULT the live `<Aurora>` to the
  WebGL2 path until parity" is NOT a flip of an existing option. The public `AuroraRenderMode` union is
  `"webgl" | "css" | "auto"` (`renderMode.ts:9`) — there is **NO `"webgpu"` value** a consumer can request
  or suppress. WebGPU is selected by the internal `resolveRenderModeAsync` probe (`renderMode.ts:95-126`)
  which returns `{ substrate: "webgpu", device }` at `:119` with NO consumer opt-out except forcing
  `renderMode="webgl"` (which ALSO kills the WebGL2-vs-CSS tiering). `grep "WEBGPU_PARITY"` over `src/` = 0.
  RED: there is no shared named lever W07 sets false and W14 owns.

The wave is RED at HEAD on all three; the HardGate below drives each to GREEN.

---

## Goal

The live `<Aurora>` paints a non-black image on a WebGPU-capable device matching the WebGL2 reference, by
eliminating both WGSL defects at their device-proven root (f32-cast the five count/enum fields + transpose
the dynamically-indexed arrays into a `var<storage,read>` buffer) while DEFAULTING the live `<Aurora>` to
the tested universal WebGL2 path behind a new `WEBGPU_PARITY` lever until the twin proves real-frame parity.

---

## Scope (the gestalt fix — no workaround, no legacy, no silent downgrade)

The audit's findings (slice 6 F0-F2, slice 10 F0-F4) are the SAME surface — the hand-transcribed WGSL twin
that drifted off the GLSL/WebGL2 reference. One cohesive architectural fix, four parts:

1. **Eliminate the int-in-float class entirely — f32-cast in-shader (slice 6 F0, blocker root).** Declare
   the five count/enum fields (`stopCount` / `nucleiCount` / `warpMode` / `noiseOctaves` / `medium`) as
   **`f32`** in the WGSL `Uniforms` struct and cast in-shader at every use site (`let n = i32(U.stopCount)`,
   `let mode = i32(U.warpMode)`, etc.). This keeps the SINGLE `Float32Array` pack path in `packGPUUniforms`
   — zero dual-view `Int32Array` juggling — and is the canonical all-f32-uniform WGSL pattern that removes
   the trap PERMANENTLY (the audit's preferred option (a) over the byte-offset `Int32Array` view (b)). The
   `// as int-in-float` comment at `uniformBridge.ts:151` is struck (the slot now legitimately carries a
   float the shader casts).

2. **Transpose the dynamically-indexed arrays into a storage buffer (slice 10 F0 + `W01-…blackcanvas.md`,
   blocker root).** Split the `Uniforms` struct: keep the 16 constant-indexed scalars (`time`…`alpha`) in a
   small `var<uniform>` block (constant-indexed, safe in uniform), and move the three dynamically-indexed
   arrays into one `struct Field { palette: array<vec4f, WGSL_MAX_STOPS>, nucleiPos: array<vec4f,
   WGSL_MAX_NUCLEI>, nucleiMod: array<vec4f, WGSL_MAX_NUCLEI> }` bound `var<storage, read>` at a SECOND
   binding. In `gpuRuntime.ts` allocate the field buffer `GPUBufferUsage.STORAGE | COPY_DST` + add the
   bind-group entry; in `uniformBridge.ts` `packGPUUniforms` keep the same Float32 std140 packing but write
   the array region to the storage buffer (the 16-byte vec4 stride is already storage-correct). **Free win:**
   storage is runtime-sized → lifts the `MAX_STOPS=8` / `MAX_NUCLEI=6` caps the WGSL header already aspired
   to. Storage dynamic-indexing is well-defined on EVERY WebGPU backend — no per-driver branch. This is the
   storage transposition the header's own "a storage buffer is dynamically sized" comment INTENDED.

   *(Note: 1a and 1b are independent defects — the f32-cast fixes the COUNTS, the storage move fixes the
   ARRAY ADDRESS SPACE. BOTH are required for a non-black render; landing only one still renders black. They
   land in ONE atomic shader-struct rewrite — §4 note 1.)*

3. **WebGL2-default-until-parity behind the `WEBGPU_PARITY` lever (slice 6 F2 + slice 10 F3, the honest
   substrate-binary stance — §4 note 14).** Add a NEW internal `WEBGPU_PARITY` const (a build-time/module
   boolean in `renderMode.ts`, **NOT a consumer prop** — consumers should not know the twin exists) gating
   the `"webgpu"` branch in `resolveRenderModeAsync` so it returns `{ substrate: "webgl", device: null }`
   while `WEBGPU_PARITY === false`. **W07 sets it `false`**; W14 owns the flip. This ships WebGL2 as the
   universal path per DESIGN.md invariant 8 (the tested, correct, single-pass renderer) so a capable Metal
   machine never silently downgrades to the reduced-parity twin. The twin is REDUCED-PARITY even once
   unblocked (slice 10 F3): isotropic-only nuclei, fbm-only warp, NO flow/cursor/lighting/mediums/strokes/
   grain, and a STRAIGHT OKLab `mix(labA,labB,f)` palette vs the GLSL OKLCh hue-arc `mixPaletteOklchArc`.
   **RATIFY-BEFORE-IMPL (the W07↔W14 re-enable criterion — §4 note 14):** the recommended disposition is the
   **DELETE-the-auto-default branch** — keep WebGPU as an OPT-IN enhancement (the W14 Kuwahara painterly
   finish) over a parity-FLOOR field, and DELETE the "re-enable the auto-default" framing entirely. The
   "until the WGSL twin reaches medium parity" criterion is currently UNMEETABLE by the wave chain (W13 ports
   the six mediums to GLSL/WebGL2 ONLY; the WGSL single-pass twin never gains a medium dispatch; W14's
   Kuwahara multi-pass is a SEPARATE painterly finish, not the per-fragment mediums), so framing W14 as
   "re-enables the auto-default" is dishonest. W14 flips `WEBGPU_PARITY` ONLY for the opt-in Kuwahara path,
   never to auto-default a capable machine. This makes W07 a **knowingly-DEGRADED-by-design phased outcome**
   with **W14 (band C · AURORA) named as the restoration wave** per SPEC.md §DEGRADED — see HardGate. (The
   alternative — W14 ports the six mediums into WGSL so parity is REAL and an auto-default re-enables — is
   NOT the de-facto plan and is explicitly rejected as the single-source-shader charter's antithesis.)

4. **Thread the masterTempo seam into the WebGPU frame (slice 6 F1, major — same WGSL-twin-drift class).**
   `createGPUAuroraSetup.frame()` (`gpuRuntime.ts:87`) calls `advanceCursor(cursor)` with NO master-tempo
   argument, whereas the WebGL2 `frameLoop.frame()` passes `advanceCursor(cursor, masterTempo())`
   (`frameLoop.ts:103`); `shouldContinue()` in `gpuRuntime` (`:113-122`) omits the `cursor.burst` liveness
   term the WebGL2 `needsAnimation()` carries (`frameLoop.ts:96`). The masterTempo seam — "the single
   suppression seam the whole interactive stack routes through" — was never threaded into the WebGPU frame.
   Thread `masterTempo()` into the WebGPU `advanceCursor` + align `shouldContinue` with the WebGL2 demand
   gate (the cursor/tempo/demand logic is backend-agnostic). These would surface the MOMENT the i32+storage
   fix makes the WebGPU path actually paint, so they land in the same wave. (Per item 3 the WebGPU branch is
   gated OFF by default — this is parity hygiene for the opt-in path + the W14 hand-off, not a live-on-capable
   regression.)

**Explicitly OUT of W07 scope (routes elsewhere):**
- The orphaned `painterly.wgsl.ts` / `wake.wgsl.ts` multi-pass Kuwahara + stable-fluids scaffold (slice 10
  F2 — DEAD EXPORTS, zero importers) → **AX.W14** (wire the multi-pass compositor OR excise per §0).
- `device.lost` subscription → WebGL2 fallback (slice 10 F5, minor — a befitting-silent browser-API
  degradation, NOT a library-internal throw) → **AX.W14** (the WebGPU finalize wave owns the device-loss story).
- The OKLCh hue-arc palette port (`mixPaletteOklchArc` into the WGSL `samplePalette`) is a PARITY refinement
  the opt-in WebGPU path needs but the default WebGL2 path already has → folded into the **W14** parity-floor
  finalize (W07 leaves the WGSL `samplePalette` as the straight-OKLab placeholder; it does not paint by
  default, so the divergence is invisible until W14 enables the opt-in). The aurora COLOR-SEAM hoist
  (samplePalette gate hole) → **AX.W11**.

---

## SOTA deepening (aurora research)

The 32-facet aurora corpus (`docs/tranches/AX/research/aurora-research-corpus.json`) confirms the W07 root-cause
diagnosis at the literature level and routes two upgrades into THIS wave's storage transposition + the
real-device gate. Cited facets: **19** (WGSL address-space), **21** (WGSL↔GLSL parity), **22** (GPU perf),
**0/11** (Display-P3 / fp16 headroom).

- **The `var<uniform>`→`var<storage,read>` flip is the named canonical fix, not a workaround [facet 19].**
  Facet 19's headline rule — DYNAMIC-INDEX-FORCES-STORAGE — is exactly W07 scope item 2: WGSL permits a
  fixed-size `array<vec4f,N>` in a `var<uniform>` block, but the moment a per-invocation index reads it (the
  `floor(t)` palette index, the `U.nucleiPos[i]` loop counter), Naga must map it to MSL `constant` address
  space, and MSL forbids per-instance dynamic indexing of `constant` (it requires `device`). Storage is
  always-legal for dynamic indices; uniform is the hazard. The fix is canonical SOTA (gpuweb #2559).
- **The SoA-of-vec4 packing means the flip is ZERO re-pack — the corpus confirms byte-identity [facet 19].**
  Facet 19's STRUCT-OF-ARRAYS-vs-ARRAY-OF-STRUCTS note validates the W07 claim that the existing two-vec4-lane
  nucleus padding (`nucleiPos.xyzw` + `nucleiMod.xyzw`) is std140-legal in BOTH uniform and storage, so only
  the binding keyword + the `GPUBufferUsage` flag change — the `Float32Array` byte layout is identical
  (std140 over-pads vs std430, but a vec4-aligned record is the same in both). This is the load-bearing reason
  the storage move keeps byte-exact visual parity.
- **The runtime-sized `array<T>` lifts the caps the WGSL header already aspired to [facet 19].** Facet 19's
  RUNTIME-SIZED-ARRAY note backs scope item 2's "free win": `array<vec4f>` with no length as the last storage
  member + `arrayLength(&field.nuclei)` retires the `MAX_NUCLEI=6`/`MAX_STOPS=8` compile-time caps and the
  `if (i >= n) break;` over-iteration guard — the buffer is exactly `nuclei.length` long. (The cap-lift is the
  follow-up form; W07 may land the minimal binding-flip first and defer the runtime-sized rewrite — both are
  storage-correct.)
- **The TEXTURE-LUT palette is a recorded alternative, NOT the W07 path [facet 19].** Facet 19's
  dependent-read escape hatch (bake the palette into a 1×N `texture_2d<f32>`, sample with hardware bilinear)
  sidesteps the uniform-dynamic-index hazard AND gives free stop interpolation. W07 takes the storage flip
  (byte-identical, no resample-path change); the LUT is noted as the W14/W11-era refinement if the WGSL ramp
  ever wants hardware-filtered stops — out of W07 scope.
- **The real-device gate IS the corpus-prescribed parity instrument [facet 21].** Facet 21's REAL-DEVICE WGSL
  EXECUTION via `dawn.node` (the `webgpu` npm package — Google's Dawn as a Node native addon, prebuilt for
  macOS Intel+ARM/Windows/Linux) is the exact device choice the W07 `proof:aurora-webgpu-render` gate ratifies
  in the W00 manifest. It closes the "WGSL cannot run in node" caveat that the current hand-transcribed
  `aurora-color.wgsl-port.ts` mirror was a stand-in for: the gate compiles + runs the ACTUAL WGSL string and
  reads back pixels (the CPU-reference-oracle / pixel-readback golden pattern, facet 21). The
  COLUMN-MAJOR-IS-THE-INVARIANT note confirms the one thing the twin already has right — the verbatim Ottosson
  column-major matrices are byte-identical GLSL↔WGSL with no re-transpose.
- **The masterTempo/demand-gate thread is also a perf lever [facet 22].** Facet 22's offscreen-park /
  early-out discipline backs scope item 4: the WebGPU frame must inherit the same `shouldContinue()`/
  `cursor.burst` demand gate the WebGL2 path carries, so a parked surface attaches zero frames — not just a
  parity nicety but the cheapest global perf lever.
- **Display-P3 / fp16 swapchain is the W07/W14 wide-gamut hook, recorded not landed [facets 0, 11].** Facets
  0 and 11 (Display-P3 / float-framebuffer headroom) note that an sRGB swapchain clamps the bell-curve chroma
  peak; a `display-p3` canvas color-space + fp16 intermediate storage unlocks ~25% more chroma and defers
  banding to the single OETF+dither close. This is a W07/W14 swapchain-config decision (the WebGPU canvas
  `configure({ format, colorSpace: "display-p3" })` + `@media (color-gamut: p3)` probe) — flagged here as an
  open gating question (see the orchestrator return), NOT landed in W07's black-canvas fix.

**Reconciliation note (no redo of landed work):** W07 fixes the WGSL UPLOAD + ADDRESS-SPACE defects only. The
OKLCh color core is confirmed-correct by the corpus (see W11 deepening) and W07 does NOT touch it — the WGSL
`samplePalette` stays the straight-OKLab placeholder until W14 enables the opt-in path. The storage flip is a
correctness fix the literature names canonical, not a speculative rearchitecture.

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/components/custom/aurora/constants/shaders/aurora.wgsl.ts` | The atomic struct rewrite: declare the five count/enum fields (`stopCount`/`nucleiCount`/`warpMode`/`noiseOctaves`/`medium`) as **`f32`** (`:58,59,65,66,67`) + `i32()`-cast at every use site (`samplePalette` `:113-124`, `nucleiField` `:146-155`, `fbm` `:noiseOctaves`, the warp-mode dispatch, the medium read); MOVE `palette`/`nucleiPos`/`nucleiMod` out of `struct Uniforms` into a new `struct Field` bound `@group(0) @binding(1) var<storage, read>` (`:74-79`); strike the now-false "std140 uniform struct" header line. |
| `src/components/custom/aurora/composables/uniformBridge.ts` | `packGPUUniforms` (`:145-196`): strike the `// as int-in-float` comment (`:151`); split the write — the 16 scalars + the 5 (now-f32) counts stay in the uniform buffer; the palette/nuclei array region writes to the SEPARATE storage-buffer view. Keep the Float32 std140 packing (the vec4 stride is storage-correct). |
| `src/components/custom/aurora/composables/gpuRuntime.ts` | `createGPUAuroraSetup`: allocate the `Field` storage buffer (`GPUBufferUsage.STORAGE \| COPY_DST`) + add the second bind-group entry; the bind-group layout gains the storage binding. Thread `masterTempo()` into `advanceCursor` (`:87`); add the `cursor.burst` liveness term to `shouldContinue` (`:113-122`) to match `frameLoop`. |
| `src/components/custom/aurora/constants/renderMode.ts` | ADD the `WEBGPU_PARITY` const (module-level boolean, `false`); gate the `"webgpu"` branch in `resolveRenderModeAsync` (`:115-119`) so it returns `{ substrate: "webgl", device: null }` while `WEBGPU_PARITY === false`. JSDoc the lever as the shared W07↔W14 switch. |
| `tests-visual/aurora-webgpu-render.spec.ts` | **NEW** (in the W00 `tests-visual/` workspace, OFF the publish surface) — the device render-and-readback spec: real `GPUDevice` + real `createGPUAuroraSetup` + real `packGPUUniforms`, DEFAULT + each preset at t=1, centre-pixel readback. |
| `scripts/proof-aurora-webgpu-render.mjs` | **NEW** — the `proof:aurora-webgpu-render` gate driver (invokes the workspace spec; per-i32-field parity decode + WebGL2-vs-WebGPU delta + the `WEBGPU_PARITY`-resolves-`"webgl"` assertion). |
| `package.json` | ADD the `proof:aurora-webgpu-render` script entry (+ the W00 `proof:gate-script-parity` meta-gate match). |
| `src/components/custom/aurora/README.md` | Re-write the WGSL section: f32-uniform + storage-field architecture; the `WEBGPU_PARITY` lever + the WebGL2-default-until-parity contract (the DEGRADED disclosure); strike the false "byte-for-byte parity" claim → "reduced-parity opt-in, gated OFF until W14." |
| `CHANGELOG.md` | The "KNOWN LIMITATION" honest-disclosure entry (SPEC.md §DEGRADED): WebGPU is gated OFF by default until the W14 parity-floor finalize. |
| `docs/tranches/AX/audit/W07-aurora-core-unblock.json` | **NEW** — the wave's audit artefact (born-RED→GREEN evidence). |

**OUT of bounds:** `aurora.frag.ts` / `flow.glsl.ts` / `mediums.glsl.ts` / `brush.glsl.ts` (the GLSL/WebGL2
path is the CORRECT reference — W07 does NOT touch it; it is the ORACLE the gate measures against);
`painterly.wgsl.ts` / `wake.wgsl.ts` (W14); `createGPUCanvas.ts` device-loss (W14); `color.ts` / the OKLCh
palette-arc port (W11/W14); `atoms.ts` / `presets.ts` (W10); `useAurora.ts` (the probe-swap orchestration is
NOT re-architected — W07 gates the swap at the `resolveRenderModeAsync` source, not at the consumer).

---

## Disjointness (sibling waves it must NOT overlap)

W07 is in band B (GRAPHICS), which runs **PARALLEL to the dock band A** (W01-W06) — graphics-blocker and
dock-desync are co-headline, not serialized (the `dependsOn` graph supports concurrency; only W00 is a hard
predecessor of both). The disjointness contract:

- **vs W08 (blob core unblock — `useMetaballRenderer.ts` + the metaball GLSL + `POS_SCALE`).** Disjoint by
  file: W08 is the BLOB surface (`src/components/custom/goo-blob/`, `useMetaballRenderer.ts`); W07 is the
  AURORA surface (`src/components/custom/aurora/`). Both add a per-surface π-lane spec under `tests-visual/`
  (W07 `aurora-*.spec.ts`, W08 `blob-*.spec.ts`) and both compose W00's shared `proof:substrate-paints-color`
  non-black/contained floor — NO shared `.spec.ts` file (W00's boundary clause). Both register a new
  `proof:*` in `package.json` — coordinate the two `package.json` script-block hunks (different lines).
  Fully concurrent.
- **vs W09 (specular tune — `glass.css` + `dock-controls.css` + `useSpecularTracking`).** Disjoint by file
  entirely; W09 never touches aurora source. Concurrent.
- **vs W00 (the π lane).** W07 **dependsOn W00** — W00 ships the `tests-visual/` workspace + the readPixels
  harness (`proof:substrate-paints-color`) + the `proof:gate-script-parity` meta-gate W07's new gate must
  satisfy. W07 ADDS a sibling spec in the SAME workspace; it does NOT modify W00's `pi-manifest.ts` /
  `substrate-paints-color.spec.ts` / the workspace `package.json` member (W00 owns those). W07 is the named
  OWNER of the **"aurora W7" AW PENDING browserVerify re-probe row** W00 enumerated — W07's close discharges
  that obligation (records `re-probed: GREEN` against the manifest). Sequential after W00.
- **vs W14 (WebGPU painterly parity — `painterly.wgsl.ts`/`wake.wgsl.ts` wire-or-excise + `device.lost` +
  the OKLCh-arc port + the `WEBGPU_PARITY` flip).** W14 **dependsOn W07** (the base field must paint
  correctly before stacking passes / flipping the lever). They SHARE the `WEBGPU_PARITY` const and the
  `aurora.wgsl.ts` `samplePalette` — but DISJOINT in TIME: W07 SETS the const `false` + leaves
  `samplePalette` as the straight-OKLab placeholder; W14 FLIPS the const (opt-in only) + ports
  `mixPaletteOklchArc`. W07 must NOT pre-author the W14 multi-pass FBO ladder or the device-loss subscription
  (that is W14's blocker-sized scope). Sequential.
- **vs W10/W11 (aurora options/color seams — `atoms.ts`/`presets.ts`/`color.ts`).** W11 owns the
  `samplePalette` gate-hole + the OKLCh catch-light; W07 leaves `samplePalette` untouched (the placeholder
  doesn't paint by default). W10 owns `atoms.ts`/`presets.ts` (the config door); W07 touches neither.
  Disjoint; sequenced after W07 (they perfect a surface W07 unblocks).

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤1 agent — one cohesive WGSL+TS shader-struct fold).** Lands the atomic `aurora.wgsl.ts`
  struct rewrite (f32-cast the five fields + the storage-buffer transposition), the `uniformBridge.ts`
  split-write, the `gpuRuntime.ts` storage-buffer allocation + bind-group entry + the masterTempo/burst
  thread, the `renderMode.ts` `WEBGPU_PARITY` lever (set `false`), and the README/CHANGELOG DEGRADED
  disclosure. Lint + typecheck at every interval. The f32-cast and the storage move land in ONE commit (both
  required for non-black — §4 note 1; a partial commit ships black).
- **Adversarially-verify (≤1 read-only lane).** Re-runs the live RED witnesses against the patched tree on a
  WebGPU-capable device: confirms the live `<Aurora>` (with `WEBGPU_PARITY` TEMPORARILY forced `true` for the
  verification only) now paints non-black centre pixels for DEFAULT + every preset; decodes the storage
  buffer the SAME way the shader does and confirms per-field int parity (`stopCount === 3`, not
  `1077936128`); A/B the WebGPU frame vs the WebGL2-baked reference and confirms the perceptual delta is
  below the threshold for the FIELDS the twin DOES carry (it does NOT assert full-medium parity — the twin is
  reduced-parity by design). ADVERSARIAL twists: (a) reverts ONLY the f32-cast (keeps the storage move) and
  confirms the gate STILL goes RED (the counts overflow) — proves both fixes are load-bearing; (b) reverts
  ONLY the storage move (keeps the f32-cast) and confirms the gate STILL goes RED on Metal (the uniform
  dynamic-index zeroes) — proves the storage transposition is not redundant; (c) confirms that with
  `WEBGPU_PARITY === false` the default live `<Aurora>` binds the WebGL2 context (`getContext("webgl2")`
  truthy), never WebGPU.
- **Gate-author (≤1 agent — born-RED→GREEN).** Authors `tests-visual/aurora-webgpu-render.spec.ts` +
  `scripts/proof-aurora-webgpu-render.mjs` (the π-lane device render-and-readback gate) + the `package.json`
  entry + the W00 `proof:gate-script-parity` match. Confirms the gate FAILS at `eaba94f` (black) and PASSES
  on the patched tree; confirms the `WEBGPU_PARITY`-resolves-`"webgl"` assertion is GREEN with the lever
  `false`. Records the "aurora W7" AW PENDING re-probe row in the W00 manifest as discharged.

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 3.)

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / runtime gate — born-RED→GREEN.** `proof:aurora-webgpu-render` (NEW, π-lane, fail-CLOSED, in the
W00 `tests-visual/` workspace; a Dawn/SwiftShader node binding OR a Playwright+Chrome `--enable-unsafe-webgpu`
lane — the device choice ratified in the W00 manifest):

- Instantiates `createGPUCanvas` + the REAL `createGPUAuroraSetup` on a real `GPUDevice` (the gate forces the
  WebGPU path internally regardless of `WEBGPU_PARITY` — it tests the SHADER, not the default routing); draws
  the DEFAULT config + each preset at t=1; reads back the centre pixel. Asserts **(a) a non-black luma floor**
  (`maxChannel > 0` over the interior — the W00 `proof:substrate-paints-color` primitive). **Born-RED at HEAD**
  (the live canvas is `[0,0,0,255]`).
- **(b) per-i32-field decode parity:** decodes the uniform/storage buffer the same way the shader reads it and
  asserts `stopCount === 3` / `nucleiCount === 2` / `noiseOctaves === 4` (the integer values, NOT the
  `bits(3.0)=1077936128` bit-patterns) — the assertion that catches the int-in-float class at the
  upload-contract boundary no function-level oracle reaches.
- **(c) WebGL2-vs-WebGPU image delta below a perceptual threshold** over the fields the twin carries (the
  substrate-equivalence contract the function-level equivalence gate never checks). Reduced-parity fields
  (mediums/flow/cursor) are EXCLUDED from the delta region by design — the gate asserts parity for the base
  isotropic field + the palette ramp, not the full GLSL six-medium image.
- **(d) the `WEBGPU_PARITY` lever resolves `"webgl"` while `false`:** asserts
  `resolveRenderModeAsync("auto")` returns `substrate: "webgl"` (not `"webgpu"`) on a WebGPU-capable adapter
  while the const is `false` — the gating-seam witness (RED witness 3).

This is a **runtime-observation** gate (the precept-valid artefact form per SPEC.md §Hard Gates — a real
device render + readback), NOT a "grep-found-a-source-string-for-runtime-behaviour" invalid form. The
`WEBGPU_PARITY`-resolves-`"webgl"` check is a runtime CALL of `resolveRenderModeAsync` (a runtime observation),
not a grep.

**DEGRADED-runtime-outcome declaration (SPEC.md §DEGRADED — MANDATORY).** W07 ships a knowingly-DEGRADED
runtime outcome BY DESIGN: a WebGPU-capable machine that COULD bind the twin is instead served the WebGL2
path (the structural full-parity fix is phased). Per SPEC.md §DEGRADED this wave:
- **declares the DEGRADED status in this status line:** *WebGPU is gated OFF by default (`WEBGPU_PARITY =
  false`); a capable machine renders the tested WebGL2 universal path, not the WGSL twin.*
- **cites the restoration wave AND tranche by name:** restoration is **AX.W14 (band C · AURORA)** — it owns
  the `WEBGPU_PARITY` flip (opt-in Kuwahara path only, per the §4 note 14 DELETE-the-auto-default disposition).
- **emits the CHANGELOG "KNOWN LIMITATION" honest-disclosure entry** (FileBounds row).
- **the receiving wave inherits the deferral as a hard-gate:** W14's open spec carries the `WEBGPU_PARITY`
  flip + the parity-floor proof as a hard gate, NOT optional cross-wave debt.

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion).** A live Playwright +
frontend-design pass on the live aurora demo (`/substrates/aurora`) on a **WebGPU-capable machine**, at **≥ 3
viewports** (375×667 / 1280×800 / 1440×900) in **light AND dark**:
- **The black-canvas defect is GONE:** with `WEBGPU_PARITY` forced `true` for the audit, the live `<Aurora>`
  stage paints the SKY default + every preset — vivid, matching the thumbnail-strip bake (the
  bake-correct/live-black signature is resolved). Sampled centre pixels are non-black.
- **WebGL2-default is the shipped reality:** with `WEBGPU_PARITY === false` (the shipped state) the live
  `<Aurora>` binds the WebGL2 context and paints the correct universal field — NO capable machine silently
  downgrades to the reduced-parity twin.
- **Affordance / hierarchy / NO visual occlusion** per the AX cardinal gate — the aurora wash composites
  correctly under the demo chrome at every viewport.

**The wave does NOT close on the headless gate alone** — the executed live audit (captured as a paired-π
BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/`: the black-stage BEFORE vs the vivid-paint
AFTER, plus the per-i32-field raw-decode delta) is the binding close criterion. This is the cardinal AX
lesson made concrete — the only assertion that catches this class is a real device render, never a function
oracle.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the three RED witnesses against HEAD `eaba94f`
   on a WebGPU-capable device: instrument the GPU (compute-shader readback of the raw i32 fields:
   `stopCount_raw === 1077936128`; render-stage bisection: `samplePalette → [0,0,0]` while
   `nucleiField → non-zero`; storage-vs-uniform address-space probe: `var<uniform>` dynamic-index → `[0,0,0,0]`
   vs `var<storage>` → non-zero), and grep `WEBGPU_PARITY` = 0 + `GPUDevice` in `proof-*.mjs` = 0. Record in
   `audit/W07-aurora-core-unblock.json` as the born-RED baseline. Do NOT proceed on the audit's word — re-prove.
2. **Author the born-RED gate.** `tests-visual/aurora-webgpu-render.spec.ts` +
   `scripts/proof-aurora-webgpu-render.mjs` + `package.json` entry; confirm it FAILS at HEAD (black centre
   pixel + the int-in-float decode mismatch).
3. **The atomic shader-struct rewrite.** `aurora.wgsl.ts`: f32-cast the five count/enum fields +
   `i32()`-cast at every use site, AND move the three arrays into the `var<storage, read> Field` buffer —
   ONE commit (both required for non-black). `uniformBridge.ts`: split the write (scalars+counts → uniform,
   arrays → storage). `gpuRuntime.ts`: allocate the storage buffer + bind-group entry. Lint + typecheck.
4. **Frame-seam parity.** `gpuRuntime.ts`: thread `masterTempo()` into `advanceCursor`; add the `cursor.burst`
   liveness term to `shouldContinue`. Lint + typecheck.
5. **The `WEBGPU_PARITY` lever + WebGL2-default.** `renderMode.ts`: add the const (`false`); gate the
   `"webgpu"` branch in `resolveRenderModeAsync` to return `"webgl"` while the lever is `false`. Confirm the
   default live `<Aurora>` now binds WebGL2 on a capable machine.
6. **The DEGRADED disclosure.** README WGSL-section rewrite + CHANGELOG "KNOWN LIMITATION" entry; record W14
   as the named restoration wave.
7. **Gate GREEN.** Confirm `proof:aurora-webgpu-render` passes (non-black + per-field parity + delta +
   `WEBGPU_PARITY`-resolves-`"webgl"`); discharge the W00 "aurora W7" AW PENDING re-probe row; run the
   VISUAL-TRUTH live audit (with the lever forced `true` for the paint confirmation, then `false` for the
   shipped-default confirmation); capture the paired-π BEFORE/AFTER + DELTA; write
   `audit/W07-aurora-core-unblock.json` to GREEN.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W07-aurora-core-unblock.json` — the born-RED→GREEN ledger: the three RED witnesses
  (the device-instrumented int-in-float raw-decode + the address-space probe + the `WEBGPU_PARITY`/`GPUDevice`
  grep=0), the per-finding (slice 6 F0-F2 + slice 10 F0-F4) disposition with the OUT-of-scope routes
  (W14/W11), and the post-wave GREEN measurements (non-black centre pixels, per-field int parity, the
  WebGL2-vs-WebGPU delta).
- `tests-visual/aurora-webgpu-render.spec.ts` + `scripts/proof-aurora-webgpu-render.mjs` — the new fail-CLOSED
  π-lane device render-and-readback gate.
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): the black-stage BEFORE (centre pixel
  `[0,0,0,255]`, `stopCount_raw=1077936128`) vs the vivid-paint AFTER (matching the thumbnail bake,
  `stopCount=3`), at ≥ 3 viewports × light/dark, on a WebGPU-capable machine.
- The W00 `pi-manifest.ts` "aurora W7" row updated to `re-probed: GREEN` (the AW PENDING browserVerify
  obligation discharged).
- The CHANGELOG "KNOWN LIMITATION" honest-disclosure entry (WebGPU gated OFF until W14).

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(aurora): proof:aurora-webgpu-render born-RED — device render-and-readback gate (AX.W07)`
2. `fix(aurora): kill the WGSL black canvas — f32-cast the 5 count/enum fields + transpose palette/nuclei into a var<storage,read> Field buffer (AX.W07 slice6-F0 + slice10-F0)`
3. `fix(aurora): thread masterTempo + cursor.burst into the WebGPU frame seam — parity with the WebGL2 demand gate (AX.W07 slice6-F1)`
4. `feat(aurora): WEBGPU_PARITY lever — default <Aurora> to the universal WebGL2 path until the W14 parity-floor finalize (AX.W07 slice10-F3)`
5. `docs(aurora): WGSL f32-uniform + storage-field architecture + the WebGPU-gated-off KNOWN LIMITATION disclosure (AX.W07)`
6. `chore(AX.W07): audit ledger GREEN + paired-π BEFORE/AFTER + DELTA + discharge the aurora-W7 AW re-probe row`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash per
the hardened agent git clause, K W0. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W00 (π visual-runtime lane) — HARD.** W00 stands up the `tests-visual/` workspace, the readPixels
  harness (`proof:substrate-paints-color` — the non-black floor W07's gate composes), the
  `proof:gate-script-parity` meta-gate, and enumerates the "aurora W7" AW PENDING browserVerify row W07
  discharges. W07 cannot close on a headless gate alone — the only assertion that catches the black-canvas
  class is a real device render + readback, which IS the π lane. (Charter §3 dependsOn AX.W00.)
- **Downstream:** **AX.W14 (WebGPU painterly parity) dependsOn W07** — the base field must paint correctly
  before W14 stacks the multi-pass Kuwahara on it / flips `WEBGPU_PARITY` for the opt-in path / ports the
  OKLCh palette arc / adds the `device.lost` fallback. W14 is the NAMED restoration wave for W07's DEGRADED
  WebGL2-default outcome. **AX.W10/W11** perfect the aurora options/color seams W07 unblocks (W11 owns the
  `samplePalette` gate-hole W07 leaves as a placeholder).
- **Parallel (NOT a dependency):** W07 runs CONCURRENTLY with the dock band (W01-W06) and the sibling
  graphics blockers W08/W09 — disjoint files, both compose W00's shared floor. Dock-first is PRIORITY, not
  serialization.

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **`c17b74c`** (AW.W7b — the WebGPU substrate swap ORIGIN) — introduced the hand-transcribed WGSL twin
  (`aurora.wgsl.ts`) whose `i32` struct fields are fed float bit-patterns by `packGPUUniforms` and whose
  dynamically-indexed arrays live in `var<uniform>`. The std140 type-contract break + the address-space bug
  are BORN here. The probe-swap (`useAurora.ts:334-362`) is SILENT (disposes the WebGL2 inst, reconstructs on
  WebGPU, no telemetry), so the regression is invisible headless — the exact `proof:aurora-wgsl-equivalence`
  blind spot.
- **`753c281`** (AW.W7c / W8.2 — the painterly/wake scaffold) — authored `painterly.wgsl.ts` (structure-tensor
  + separable Gaussian + anisotropic 8-sector Kuwahara) + `wake.wgsl.ts` (ping-pong stable-fluids wake) as
  the "WebGPU full-quality half," but NEVER wired the consumer-side FBO ladder. They are DEAD EXPORTS
  (`git log -S` confirms they appear only in their creating commits) — routed to W14, NOT W07.
- **`067473c` / `eaba94f`** (AW batch-1 integration, UNPUBLISHED) — the audit baseline. The live black render
  is device-proven here; the three WebGPU gates (`proof:aurora-wgsl-equivalence` + `proof:webgpu-substrate-single`
  + `proof:aurora-backend-fallback`, commits `753c281`/`c17b74c`/`cf53b83`) ship GREEN over it — the cardinal
  headless-green/visually-broken signature §0/§13 names.
- **§4 note 1 (the two-root-cause reconciliation).** Slice 6 device-bisected the int-in-float mismatch; slice
  10 + `W01-aurora-webgpu-blackcanvas.md` device-proved the `var<uniform>` dynamic-index Metal miscompile.
  Both are real, both produce the same black symptom, both fixes land together in W07 — NOT a contradiction,
  two distinct WGSL defects on one surface.
- **§4 note 12 (publish-currency, not code, for the consumer-side findings).** The thumbnails bake correct
  ONLY because `usePresetThumbnails.ts:61` uses `createAurora({mode:"capture"})` = pure WebGL2, never the
  WebGPU swap — the bake-correct/live-black signature. The consumers MEASURED published 3.6.0; the W07 fix
  reaches them only via the AX cut PUBLISHING (the W41 dts-watch + W33/W34/W35 republish hinge). W07 fixes the
  CODE; the publish is a separate hinge.
- **HEAD `eaba94f`** (batch-1 integration, UNPUBLISHED) — the audit baseline; the live `[0,0,0,255]` aurora
  stage + the raw-decode `stopCount_raw=1077936128` are device-proven here.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-B (GRAPHICS) binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **one-path / no-legacy-code.** The fix eliminates the int-in-float CLASS entirely (all-f32 uniform + in-shader
  `i32()` cast — ONE pack path, no `Int32Array` dual-view juggling) and moves the arrays to the ONE correct
  address space (storage), not a per-driver branch. Forbids leaving the renamed-but-broken WGSL twin as a
  second drifting copy. The single-source-shader charter is the architectural north star (the WGSL twin is a
  second hand-maintained copy — W07 makes it CORRECT and gates it OFF; a future tranche may generate it from
  the GLSL source to kill the two-copy class at the root, the AV.W1 lesson — explicitly out of W07 scope).
- **fail-explicit on library-internal violations vs befitting-silent browser-API degradation (the two are
  NEVER collapsed; SPEC.md §Hard Gates + README §Edicts).** The int-in-float + the `var<uniform>` miscompile
  are library-internal contract violations — FIXED at the root (a non-black render), not papered with a
  fallback. The `WEBGPU_PARITY` gate is a deliberate parity-FLOOR routing decision (the universal WebGL2 path),
  NOT a silent failure. The `device.lost` → WebGL2 fallback (W14, out of scope) is the ONE befitting-silent
  browser-API degradation — correctly routed to a later wave with a dev-surfaced error, never collapsed with
  the library-internal throw class.
- **no-overfitting / substrate-with-consumer (Design-Axis-3).** The WGSL twin is shipped substrate with ZERO
  device-audited consumer (the visual-load-bearing-ness bar was never met — three green CPU/structure gates
  over a black live render). W07 adds the device render-and-readback gate + the live VISUAL-TRUTH audit so the
  surface is consumer-PROVEN against live pixels. The orphaned painterly/wake scaffold (substrate-WITHOUT-
  consumer) is correctly routed to W14 (wire-or-excise), NOT carried as dead exports.
- **π visual-runtime lane / Gates-close-on-evidence (SPEC.md §Hard Gates — no grep-only runtime gate).** The
  gate is a runtime-observation artefact (a real `GPUDevice` render + centre-pixel readback + the raw-buffer
  decode), the ONLY form that catches a Metal miscompile invisible to every function-level oracle. The
  `WEBGPU_PARITY`-resolves-`"webgl"` check is a runtime CALL, not a grep. MUST NOT VIOLATE — the wave's close
  is the executed live Playwright + frontend-design audit on a WebGPU-capable machine, never a headless proof
  alone (the cardinal AX precept).
- **DEGRADED runtime outcome with a named restoration wave (SPEC.md §DEGRADED — binding).** WebGL2-default-
  until-parity is a knowingly-degraded phased outcome; W07 declares the DEGRADED status, names AX.W14 (band C)
  as the restoration wave, emits the CHANGELOG "KNOWN LIMITATION" disclosure, and W14's open spec inherits the
  `WEBGPU_PARITY` flip as a hard gate — NOT optional cross-wave debt. An un-named-restoration disabled lever
  would be an INVALID hard gate; the named-W14 restoration makes it valid.
- **RATIFY-BEFORE-IMPL (the W07↔W14 re-enable criterion — §4 note 14).** The recommended path is the
  DELETE-the-auto-default branch: WebGPU stays an OPT-IN enhancement (the W14 Kuwahara finish) over a
  parity-floor field; the "re-enable the auto-default on medium parity" framing is DELETED as unmeetable by
  the wave chain. The orchestrator MUST ratify this disposition before W07 impl, because it determines whether
  W14 ports the six mediums into WGSL (the rejected REAL-parity path) or flips `WEBGPU_PARITY` only for the
  opt-in path (the recommended path). W07 sets the lever `false` either way; the ratification binds W14's scope.
- **binding-verification (glass-ui MEMORY — stale prop/upload bindings silently no-op).** The int-in-float
  mismatch is a binding-verification-class break at the CPU↔GPU upload boundary: vue-tsc + units pass (the TS
  types are fine), only a device render catches the wrong bit-pattern. The wave's device-render gate is the
  e2e-class instrument the MEMORY precept prescribes for exactly this silent-no-op class.
