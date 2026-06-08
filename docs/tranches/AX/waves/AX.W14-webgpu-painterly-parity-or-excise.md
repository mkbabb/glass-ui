# AX.W14 — WebGPU painterly parity: wire the multi-pass Kuwahara/LIC + wake, or excise

**Band** C · AURORA · **Severity** major · **dependsOn** AX.W07 (the non-black base field + the
`WEBGPU_PARITY` lever it sets `false`), AX.W13 (the GLSL/WebGL2 first-class mediums — the reference the
parity question is measured against) · **Charter** AX.md §3 (the `### AX.W14` block, lines 801-833) +
§4 note 14 (the `WEBGPU_PARITY` flip + the DELETE-the-auto-default disposition; the de-facto EXCISE
answer) + §2b band-C precept row · **Audit** `deep-audit-corpus.json` slice `aurora-webgpu-state` (index
10, findings F2 the dead multi-pass scaffold + F4 the `device.lost` punt) + slice `aurora-mediums-painterly`
(index 8, finding F3 — the Kuwahara/LIC NPR operators not executing) + `constellation-analysis-corpus.json`
result[29] findings 3 + 7 (the unmeetable-parity reconciliation + the RESOLVE-the-OR recommendation:
DEFAULT to EXCISION) + the preserved `audit/W01-aurora-webgpu-blackcanvas.md` (the address-space lineage).

---

## State (born-RED — the gate must fail at HEAD before the wave)

The wave is born-RED on a **dead-scaffold-OR-wired-multi-pass** witness AND a **device-loss-survives**
witness, NEITHER of which holds at HEAD `eaba94f`. The WebGPU painterly half ships as orphaned exports
over a single-pass field, and a lost GPU device freezes the surface black forever.

- **RED witness 1 (the dead painterly scaffold — DEVICE-PROVEN by grep + runtime, the headline).**
  `painterly.wgsl.ts` (W7c — `PAINTERLY_TENSOR_WGSL` structure-tensor, `PAINTERLY_SMOOTH_WGSL` separable
  Gaussian, `PAINTERLY_KUWAHARA_WGSL` anisotropic 8-sector Kuwahara, the `PAINTERLY_TENSOR_FORMAT =
  "rgba16float"` / `PAINTERLY_KUWAHARA_SECTORS = 8` const declarations) and `wake.wgsl.ts` (W8.2 —
  `WAKE_ADVECT_WGSL` self-advecting ping-pong stable-fluids splat, `WAKE_TEXTURE_FORMAT = "rg16float"`)
  are AUTHORED, EXPORT their WGSL strings + format constants, and are documented in DESIGN.md as "the
  WebGPU full-quality half" — but they are **DEAD EXPORTS**. The falsifiable RED assertion:
  *`grep -rn "PAINTERLY_\|WAKE_\|painterly.wgsl\|wake.wgsl" src/` returns ZERO importers outside
  `gpuRuntime.ts` COMMENTS + `DESIGN.md` prose* (verified — only the `painterly.wgsl.ts`/`wake.wgsl.ts`
  self-references + the DESIGN.md narrative match; `git log -S` confirms the strings appear only in their
  creating commits `c17b74c`/`753c281`). `gpuRuntime.ts` draws **ONE** render pass — `pass.draw(3)` over
  the full-screen triangle (`:106`), the SAME single-pass base field the WebGL2 fragment path draws (`:5`)
  — and the multi-pass tensor→smooth→Kuwahara ladder is referenced ONLY in comments (`gpuRuntime.ts:7-13`).
  `createGPUCanvas.ts:15` states it baldly: "the multi-pass FBO/storageTexture seam (W7c) is a GENERIC
  N-pass declaration the consumer configures" — and **NO consumer ever configures it**. So the §2.4 SOTA
  "Modern WebGPU rendering techniques" headline is UNREALIZED: even with the W07 black-canvas blocker
  fixed, the WebGPU path draws a reduced single-pass field, never the Kuwahara oil finish that was the
  whole point of routing to WebGPU. RED: the painterly scaffold exists as dead substrate-WITHOUT-consumer,
  forbidden by §0 ("excise or fail explicitly — dead scaffold is forbidden").

- **RED witness 2 (the `device.lost` silent-failure trap — grep + contrast-falsifiable).**
  `createGPUCanvas.ts:122-123` explicitly PUNTS device-loss handling: *"WebGPU has no webglcontextlost
  analogue exposed today; device-loss is handled via device.lost (the consumer's setup may subscribe). No
  context-event bind here."* — and **neither `gpuRuntime.ts` nor any consumer subscribes**. The falsifiable
  RED assertion: *`grep -rn "device.lost\|device\.lost" src/components/custom/aurora/ src/composables/glass/`
  finds the punt COMMENT but ZERO `.then`/`await` subscription* (the `device.lost` Promise is never awaited).
  A lost GPU device (driver reset, tab throttle, OOM) leaves the aurora **frozen-black with no fallback to
  WebGL2 and no surfaced error** — a silent-failure path the §0 mandate forbids. CONTRAST: the WebGL2 path
  self-heals via `webglcontextlost`/`restored` in `createCanvasLifecycle` (referenced `runtime.ts:200-204`);
  the WebGPU path was built to the swap-once-forward model (probe → pick backend → never re-evaluate) and
  has no device-loss → rebuild OR device-loss → WebGL2-fallback story. RED: a one-way trap, not a
  progressive enhancement.

- **RED witness 3 (the parity question is UNRESOLVED + the `WEBGPU_PARITY` lever is stuck `false` — the
  inherited W07 DEGRADED-restoration obligation).** W07 sets `WEBGPU_PARITY = false` (`renderMode.ts`) and
  names AX.W14 as its restoration wave (the SPEC.md §DEGRADED contract). At HEAD `eaba94f` the lever does
  not yet exist (W07 authors it); after W07 it is `false` with W14 owning the disposition. The falsifiable
  RED assertion: *the WGSL twin's `samplePalette` still uses the STRAIGHT-OKLab `mix(labA,labB,f)`
  (`aurora.wgsl.ts:121-123`), NOT the GLSL OKLCh hue-arc `mixPaletteOklchArc` (`aurora.frag.ts:249-259`) —
  so even the opt-in WebGPU palette ramp diverges from the WebGL2 reference* (slice 10 F3, the SECOND silent
  visual divergence the 1e-6 color-chunk gate never covers). RED: the WebGPU path, the moment it is enabled
  for ANY use, paints a ramp that does not match the universal WebGL2 ramp.

The wave is RED at HEAD on all three; the HardGate below drives each to GREEN (or, for witness 1 on the
EXCISE branch, drives the dead exports to DELETED — a deletion-proof artefact).

---

## Goal

Resolve the dead WebGPU painterly scaffold ONE way — either wire the authored Kuwahara/LIC/tensor
multi-pass + stable-fluids wake into a real ping-pong compositor in a cohesive `gpuPasses.ts` seam, OR
excise `painterly.wgsl.ts` + `wake.wgsl.ts` entirely and re-scope WebGPU to a parity-floor single-pass
enhancement — and in BOTH branches subscribe to `device.lost` so a lost GPU degrades silently to the
tested WebGL2 path instead of freezing black.

---

## Scope (the gestalt fix — no half-built scaffold, no silent device-loss trap)

The audit's findings (slice 10 F2 + slice 8 F3 the dead multi-pass; slice 10 F4 the device-loss punt;
slice 10 F3 the palette divergence) converge on one architectural question the charter left as an open
`OR`: **is the WebGPU painterly half built, or excised?** §17's fully-formed-spec mandate forbids leaving
the `OR` open. This spec RESOLVES it (RATIFY-BEFORE-IMPL below) and binds both branches' device-loss +
palette-parity legs.

### RATIFY-BEFORE-IMPL — the architecture decision (the load-bearing fork)

**Recommended disposition: BRANCH B (EXCISE), per §4 note 14 + constellation result[29] finding 7.** The
de-facto answer the convergence analysis arrived at, on three grounds:

1. **The GLSL/WebGL2 path is the shipped universal renderer** (DESIGN.md invariant 8 bans multi-pass on
   WebGL2; WebGL2 is the tested single-pass floor every machine reaches).
2. **The six first-class mediums live ONLY in GLSL** — W13 authors van-Gogh/oil-pastel/oil/crayon/
   watercolor/pastel stroke grammar in `mediums.glsl.ts`/`brush.glsl.ts` and does **NOT** port them into
   the WGSL twin (the WGSL `fs_main` has no `uMedium` dispatch — verified). So "medium parity" between the
   WebGPU twin and the WebGL2 reference is **UNMEETABLE by the wave chain** (constellation finding 3): the
   Kuwahara multi-pass is a SEPARATE painterly FINISH applied over a field, not the per-fragment medium
   strokes. Framing W14 as "re-enables the WebGPU auto-default on medium parity" is dishonest — the
   criterion can never be met without W14 also re-authoring all six mediums in WGSL, which is the antithesis
   of the single-source-shader charter (a second hand-maintained shader copy).
3. **The multi-pass compositor is large net-new GPU plumbing** (a ping-pong FBO/render-target ladder,
   per-pass render pipelines + bind groups, a pass scheduler) that may not fit a single `major` wave; if
   wired it would be a blocker-sized wave, not a `major` one.

**BRANCH B (EXCISE) — re-scope WebGPU to a parity-floor single-pass enhancement.** Concretely:
- **DELETE `painterly.wgsl.ts` + `wake.wgsl.ts` entirely** (the dead substrate — §0 "dead scaffold is
  forbidden") including their `PAINTERLY_*` / `WAKE_*` format constants. Strike every comment in
  `gpuRuntime.ts` + `createGPUCanvas.ts` that references the now-absent multi-pass FBO/storageTexture seam
  ("BAKES NO pass-count / tensor format / Kuwahara-sector-count", "the multi-pass FBO seam (W7c) is a no-op")
  — they describe a seam that no longer exists. Update `DESIGN.md` (the "modern WebGPU technique" /
  stateful-pointer-wake narrative) to the parity-floor reality.
- **Re-scope `proof:webgpu-substrate-single`** (the gate that FORBADE the substrate from baking pass-count/
  tensor-format/Kuwahara-sectors): its clause-2 "the consumer declares the N-pass seam" premise dies with
  the excision; the gate becomes "the substrate is a SINGLE-pass parity-floor backend — NO multi-pass seam,
  NO dead painterly exports" (a deletion-proof clause, not a never-asserted seam-declaration check).
- **Close the palette divergence (slice 10 F3)** so the opt-in WebGPU path's ramp matches WebGL2: port
  `mixPaletteOklchArc` (the OKLCh L/C-lerp + H-arc) into the WGSL `samplePalette` (`aurora.wgsl.ts:117-123`),
  reusing the already-spliced `OKLCH_MATRICES_WGSL` from the shared `procedural-color` chunk — single-source,
  no re-authored math. (The aurora COLOR-SEAM gate hole / catch-light OKLCh-derive is W11's surface; W14
  touches ONLY the `samplePalette` ramp-mix to close THIS divergence on the opt-in path.)
- **`WEBGPU_PARITY` stays the OPT-IN lever, NEVER auto-default (§4 note 14).** DELETE the "re-enable the
  auto-default on medium parity" framing W07's DEGRADED disclosure inherited. `WEBGPU_PARITY` is flipped
  `true` ONLY for an explicit opt-in (a consumer who knowingly requests the WebGPU enhancement); the
  `resolveRenderModeAsync` auto-probe NEVER returns `"webgpu"` on a capable machine by default — the
  universal WebGL2 path is the shipped default for ALL machines. The W07 DEGRADED outcome is thus
  RESOLVED-AS-INTENDED (WebGPU is a parity-floor opt-in enhancement, not a downgrade trap), not "restored to
  auto-default" (the unmeetable framing is deleted).

**BRANCH A (WIRE) — only if the orchestrator OVER-RIDES the recommendation.** Build the real multi-pass
painterly compositor in a NEW cohesive `gpuPasses.ts` seam: a ping-pong render-target ladder (base field →
structure-tensor `rgba16float` → separable smooth H/V → anisotropic 8-sector Kuwahara → swapchain), each
pass a render pipeline over the full-screen triangle, wiring the authored `PAINTERLY_*`/`WAKE_*` operators
(1e-6 color-verified — only the FBO ping-pong plumbing is missing), ALL gated by the shared
`shouldContinue()`/`isRunning()` park machinery (the offscreen/tab-hidden/PRM freeze the substrate owns —
no pass may attach a frame while parked). This makes WebGPU "genuinely better than WebGL2" and delivers the
§2.4 SOTA technique. **If Branch A is ratified, this wave is re-classed BLOCKER-sized** (its own FBO-ladder
FileBounds + a `proof:aurora-webgpu-multipass` render gate asserting the Kuwahara region differs from the
single-pass base) — NOT a `major`. Branch A does NOT port the six mediums into WGSL (that remains the
rejected real-parity path); it applies the Kuwahara FINISH over the parity-floor field as an opt-in.

### Device-loss fallback (BOTH branches — slice 10 F4, the befitting-silent leg)

Subscribe to `device.lost` in `createGPUAuroraSetup` (or `createGPUCanvas`): on a **non-destroy loss**
(driver reset / throttle / OOM — NOT a deliberate `device.destroy()`), tear down the GPU handle and fall
the runtime back to the WebGL2 `createWebGLCanvas` path (the universal floor already in `runtime.ts`),
reusing the same dispose-and-reconstruct seam the W07 probe-swap uses. Surface a **dev-only** error so the
loss is loud in development, not silent. This is a **BEFITTING-SILENT browser-API degradation** in
production (NOT a fail-explicit library-internal throw — the two are NEVER collapsed per the precept): the
browser took the device away; the library degrades gracefully to the tested path with rationale, it does
not throw at the consumer.

**Explicitly OUT of W14 scope (routes elsewhere):**
- The black-canvas root-cause (the int-in-float + `var<uniform>` dynamic-index defects), the storage-buffer
  transposition, the masterTempo frame-seam, and the `WEBGPU_PARITY` lever AUTHORING → **AX.W07** (W14
  inherits the non-black base field + sets the lever's opt-in disposition; it does NOT re-author the struct).
- The aurora COLOR-SEAM hoist (the `samplePalette` gate hole / OKLCh catch-light / palette-ramp twin hoist
  to the shared chunk) → **AX.W11** (W14 closes ONLY the straight-OKLab-vs-arc ramp divergence on the opt-in
  WebGPU path, reusing W11's hoisted arc if it lands first; coordinate the `samplePalette` line).
- The atoms door / config UI / dead `deriveScene` → **AX.W10**.
- The six first-class mediums (van-Gogh/oil-pastel split, OKLab/Kubelka-Munk stroke compositing) → **AX.W13**
  (the GLSL/WebGL2 path; W14 does NOT port them into WGSL — that is the rejected real-parity path).

---

## SOTA deepening (aurora research)

The corpus is decisive on this wave's central fork. If BRANCH A (WIRE) is ratified, the literature supplies the
EXACT anisotropic-Kuwahara recipe + constants AND a sharp warning: the engine's authored `painterly.wgsl.ts`
uses the PRE-2010 hard sector-binning that bands into a pinwheel on aurora's flat gradient fields (its worst
case). Cited facets: **6** (anisotropic Kuwahara — the "make a gradient read as oil paint" operator), **5**
(structure-tensor / ETF), **18** (WebGPU compute multi-pass), **20** (multi-pass FBO ping-pong), **22** (GPU
perf), **21** (parity), **23** (PRM / offscreen park).

- **The Kuwahara/LIC multi-pass IS the corpus's "make a gradient read as oil paint" operator [facets 6, 5].**
  Facet 6 names the anisotropic Kuwahara as THE canonical operator and it is inherently MULTI-PASS (tensor pass
  → smoothed tensor → filter pass → tonemap) — correctly scoped to WebGPU. The smoothed structure tensor is
  "the single biggest quality jump" (facet 5): smooth the tensor COMPONENTS `Jxx/Jyy/Jxy` (NOT the gradient
  vectors, which cancel at opposite-signed edges) with a separable Gaussian before eigen-decomposition. This is
  the genuine WebGPU enhancement — the thing that makes WebGPU "genuinely better than WebGL2."
- **CRITICAL — the authored scaffold uses the OBSOLETE hard-argmin form; the SOTA is a SOFT polynomial blend
  [facets 6, 5].** Facet 6/5's modern recipe (Kyprianidis 2009 / Acerola): N=8 OVERLAPPING sectors of an
  ELLIPTICAL kernel warped by the structure tensor (`a=R·clamp((α+A)/α,0.1,2)`, `b=R·clamp(α/(α+A),0.1,2)`),
  polynomial sector weights `max(0,(x+η)−λy²)²` (η≈0.1, λ≈0.5) computed IN-LOOP with NO precomputed mask
  texture, accumulate per-sector mean `m_k` + variance `s_k`, and combine via SOFT inverse-power weighting
  `w_k = 1/(1+(hardness·1000·s_k)^(sharpness/2))` (hardness≈8, sharpness≈8) — a SOFT variance blend, NOT a
  hard lowest-variance winner. The pre-2010 hard sector-binning + winner-take-all bands into an 8-spoke
  pinwheel on flat gradient fields — aurora's exact worst case. If Branch A is ratified, the wire MUST adopt
  the soft polynomial form (compute mean/variance in linear/OKLab, not gamma); the WGSL constants come
  straight from the corpus (Heckel 2024 "On crafting painterly shaders" is the closest portable reference,
  facet 11/17).
- **LIC is the stroke-texture half the orientation field alone cannot give [facets 5, 17].** Facet 5: the
  tensor/ETF answers "which way," LIC (line-integral-convolution — Euler-integrate the tangent field a few
  steps each direction, accumulate) answers "draw the bristle smear that way." ETF-without-LIC (the engine's
  current state) is an honest orientation-only approximation; LIC is the WebGPU multi-pass fold that turns the
  field into visible directional brush texture.
- **Performance: benchmark before promoting; half-res tensor; allocate-once [facets 18, 20, 22].** Facet 22's
  separable/decimated note: the tensor smooth is separable (two 1D passes, O(2r)) and can run at HALF res in an
  `rg16float` target then bilinear-upsample into the full-res Kuwahara — the standard real-time recipe. Facet
  18 (WebGPU compute): the Kuwahara gather benefits from workgroup shared-memory tiling, but the lisyarus
  finding (cited in the synthesis) warns texture cache often beats hand-rolled LDS — BENCHMARK first, convert
  ONLY the Kuwahara gather, keep tensor/smooth as fragment passes. Facet 20 (multi-pass FBO ping-pong):
  allocate intermediates ONCE (rebuild on resize only), use `rgba16float` for the tensor (renderable +
  filterable by default; NEVER `rgba32float`), and instrument each pass with `timestamp-query` to assert the
  multi-pass total stays inside `profile:budget`. The render-bundle reuse path amortizes pass setup.
- **The PRM / offscreen park gates EVERY pass [facet 23].** Facet 23: no pass may attach a frame while parked
  — the offscreen/tab-hidden/PRM freeze the `useWebGLCanvas` substrate owns must gate the whole ping-pong
  ladder (this is already in the W14 Branch-A scope; the corpus confirms it is non-negotiable for a continuous
  backdrop).
- **The palette-divergence close is single-source, confirmed-correct [facet 21].** Porting `mixPaletteOklchArc`
  into the WGSL `samplePalette` reuses the already-spliced `OKLCH_MATRICES_WGSL` (column-major, byte-identical
  per facet 21) — no re-authored color math. The OKLCh arc is the confirmed-correct interpolation (see W11
  deepening); W14 closes ONLY the straight-OKLab-vs-arc ramp divergence on the opt-in path.

**Reconciliation note (binding for BOTH branches):** WebGPU is an ENHANCEMENT, never the default and never a
hard requirement — the corpus confirms WebGPU ships in all four engines (Safari 26, Nov 2025) but is NOT yet
Baseline-widely-available (~5% still WebGL2-only). The wispy-sky default + the parity-floor field MUST render
acceptably single-pass WebGL2 (reaching ~100% of users); the Kuwahara/LIC finish is the gated bonus for the
~95% on WebGPU. This is the basis for the recommended BRANCH B (EXCISE) — but if Branch A (WIRE) is over-ridden,
the soft-polynomial-Kuwahara correction above is MANDATORY (the authored hard-argmin scaffold would pinwheel on
aurora's flat fields). Display-P3 + fp16 swapchain (facets 0, 11) is the wide-gamut hook that rides W14's canvas
config — flagged as an open gating question in the orchestrator return.

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

### Branch B (EXCISE — the recommended disposition)

| File | Edit |
|------|------|
| `src/components/custom/aurora/constants/shaders/painterly.wgsl.ts` | **DELETE** the file entirely (dead exports — `PAINTERLY_TENSOR_WGSL` / `PAINTERLY_SMOOTH_WGSL` / `PAINTERLY_KUWAHARA_WGSL` / `PAINTERLY_TENSOR_FORMAT` / `PAINTERLY_KUWAHARA_SECTORS`, zero importers). |
| `src/components/custom/aurora/constants/shaders/wake.wgsl.ts` | **DELETE** the file entirely (dead exports — `WAKE_ADVECT_WGSL` / `WAKE_TEXTURE_FORMAT`, zero importers). |
| `src/components/custom/aurora/composables/gpuRuntime.ts` | Strike the multi-pass comments (`:5-13` — the "multi-pass painterly half wired through the FBO/storageTexture seam" + "BAKES NO pass-count / tensor format / Kuwahara-sector-count" narrative); the runtime IS a single-pass parity-floor backend. Subscribe to `device.lost` in `createGPUAuroraSetup` (the device-loss → WebGL2 fallback + dev-error). |
| `src/composables/glass/createGPUCanvas.ts` | Strike the multi-pass FBO/storageTexture seam comment (`:15`) — the seam is removed. Move the `device.lost` subscription here if the setup-side hook is cleaner (the punt comment `:122-123` is REPLACED by a real subscription). |
| `src/components/custom/aurora/constants/shaders/aurora.wgsl.ts` | Port `mixPaletteOklchArc` (OKLCh L/C-lerp + H-arc) into `samplePalette` (`:117-123`), reusing the spliced `OKLCH_MATRICES_WGSL` — close the straight-OKLab-vs-arc ramp divergence (slice 10 F3). |
| `src/components/custom/aurora/constants/renderMode.ts` | DELETE the "re-enable the auto-default on medium parity" framing from the `WEBGPU_PARITY` JSDoc; `WEBGPU_PARITY` is the OPT-IN lever only — `resolveRenderModeAsync` never auto-returns `"webgpu"`. (The const VALUE stays `false` for the auto path; the opt-in path is an explicit caller decision.) |
| `scripts/proof-webgpu-substrate-single.mjs` | Re-scope clause-2: the substrate is a SINGLE-pass parity-floor backend — assert NO multi-pass seam + NO `painterly.wgsl`/`wake.wgsl` exports remain (a deletion-proof clause replacing the never-asserted N-pass-seam-declaration check). |
| `scripts/proof-aurora-webgpu-render.mjs` | EXTEND the W07 gate: assert the device-loss path falls back to WebGL2 (forced loss → WebGL2 context bound); assert the `samplePalette` ramp now matches the WebGL2 OKLCh-arc reference within tolerance. |
| `src/components/custom/aurora/DESIGN.md` | Rewrite the "Modern WebGPU rendering techniques" + "stateful pointer wake" narrative → the parity-floor reality (single-pass opt-in enhancement, no multi-pass painterly, device-loss → WebGL2). |
| `src/components/custom/aurora/README.md` | Update the WGSL section: WebGPU is a parity-floor single-pass OPT-IN enhancement (not an auto-default); the device-loss → WebGL2 degradation; the multi-pass Kuwahara is deferred to a future tranche if a real consumer demands it. |
| `CHANGELOG.md` | RESOLVE the W07 "KNOWN LIMITATION" entry: WebGPU is a parity-floor opt-in enhancement with device-loss fallback; the auto-default framing is retired (the DEGRADED outcome is resolved-as-intended, not restored-to-auto). |
| `docs/tranches/AX/audit/W14-webgpu-painterly.json` | **NEW** — the wave's audit artefact (born-RED→GREEN evidence + the architecture-decision ratification record + the deletion proof). |

### Branch A (WIRE — only if the orchestrator over-rides; re-class BLOCKER)

Adds (does NOT delete the two shader files): `src/components/custom/aurora/composables/gpuPasses.ts`
**(NEW)** — the ping-pong FBO ladder + per-pass pipelines/bind-groups + the pass scheduler, gated by the
shared park machinery; `scripts/proof-aurora-webgpu-multipass.mjs` **(NEW)** — the render gate asserting
the Kuwahara region differs from the single-pass base. `gpuRuntime.ts` dispatches the ladder; the device-
loss + palette-parity + DESIGN.md/README/CHANGELOG legs are identical to Branch B.

**OUT of bounds (BOTH branches):** `aurora.frag.ts` / `flow.glsl.ts` / `mediums.glsl.ts` / `brush.glsl.ts`
(the GLSL/WebGL2 reference — W13 + the W07 oracle; W14 reads it, never edits it); `uniformBridge.ts` /
the struct pack (W07); `atoms.ts` / `presets.ts` (W10); `color.ts` / the OKLCh catch-light + palette-ramp
hoist (W11 — W14 touches ONLY the WGSL `samplePalette` ramp-mix line); `useMetaballRenderer.ts` + the blob
surface (W08/W15/W16); the W00 `pi-manifest.ts` / `substrate-paints-color.spec.ts` (W00 owns those — W14
ADDS a sibling assertion, it does not edit W00's members).

---

## Disjointness (sibling waves it must NOT overlap)

W14 is the LAST aurora wave (band C, W10-W14 + W38); it runs AFTER its `dependsOn` set lands. The
disjointness contract:

- **vs AX.W07 (aurora core unblock — `aurora.wgsl.ts` struct + `uniformBridge.ts` + `renderMode.ts`
  `WEBGPU_PARITY` authoring).** W14 **dependsOn W07** — SEQUENTIAL in time, NOT concurrent. They SHARE
  `aurora.wgsl.ts` (W07 rewrites the struct + the storage transposition; W14 edits ONLY `samplePalette`'s
  ramp-mix), `renderMode.ts` (W07 AUTHORS `WEBGPU_PARITY = false`; W14 sets its opt-in-only disposition +
  deletes the auto-default JSDoc framing), and `scripts/proof-aurora-webgpu-render.mjs` (W07 authors it;
  W14 EXTENDS it). Disjoint by TIME + by LINE within the shared files: W07 lands first and leaves
  `samplePalette` as the straight-OKLab placeholder + the lever `false`; W14 ports the arc + sets the
  disposition. NO concurrent edit.
- **vs AX.W11 (aurora color seams — `color.ts` + the `samplePalette` gate hole + the OKLCh catch-light).**
  Both touch `samplePalette` (W11 closes the gate HOLE + hoists the palette-ramp TWIN to the shared chunk;
  W14 closes the straight-OKLab-vs-arc RAMP-MIX divergence on the WGSL twin). Coordinate: if W11 lands the
  hoisted OKLCh-arc into the shared `procedural-color` chunk first, W14 SPLICES it (single-source) rather
  than re-authoring; if W14 lands first, W11 inherits the WGSL `samplePalette` already on the arc. SHARED
  FILE `aurora.wgsl.ts` — sequence W11 before W14 (W14 is last in band C) so W14 splices W11's hoisted
  primitive. Coordinate the `samplePalette` hunk.
- **vs AX.W10 (aurora options — `atoms.ts` / `presets.ts` / `deriveScene`).** Disjoint by file entirely —
  W14 touches neither the config door nor the atoms. Concurrent-safe (sequenced after W07 either way).
- **vs AX.W13 (the first-class mediums — `mediums.glsl.ts` / `brush.glsl.ts`).** W14 **dependsOn W13** as
  the reference the parity question is measured against, but DISJOINT by file: W13 is the GLSL/WebGL2 medium
  bodies; W14 is the WGSL twin + the GPU runtime. W14 does NOT port W13's mediums into WGSL (the rejected
  real-parity path). No shared file.
- **vs AX.W08/W15/W16 (the blob surface — `useMetaballRenderer.ts` / `goo-blob/`).** Disjoint by file
  entirely — different custom-component subtree. The blob composes the SAME `useWebGLCanvas` park machinery
  W14's device-loss leg must respect, but W14 edits only the AURORA GPU runtime + `createGPUCanvas`. No
  shared source. (Note: `createGPUCanvas.ts` is GPU-only and aurora-exclusive today — the blob is on the
  WebGL2 `useWebGLCanvas` substrate, NOT the WebGPU `createGPUCanvas` — so the device-loss edit there does
  not touch the blob.)

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤1 agent — the EXCISE fold + device-loss + palette-parity; ≤2 if Branch A's net-new
  `gpuPasses.ts` is ratified).** Branch B: DELETE `painterly.wgsl.ts` + `wake.wgsl.ts`; strike the dead
  multi-pass comments in `gpuRuntime.ts`/`createGPUCanvas.ts`; subscribe to `device.lost` (the WebGL2
  fallback + dev-error); port `mixPaletteOklchArc` into the WGSL `samplePalette`; set the `WEBGPU_PARITY`
  opt-in-only disposition + delete the auto-default JSDoc framing; rewrite DESIGN.md/README/CHANGELOG to the
  parity-floor reality. Lint + typecheck at every interval. (Branch A adds the `gpuPasses.ts` ladder + the
  per-pass pipelines, all park-gated — a second agent, blocker-sized.)
- **Adversarially-verify (≤1 read-only lane).** (a) Re-runs the dead-scaffold grep on the patched tree:
  confirms `painterly.wgsl`/`wake.wgsl`/`PAINTERLY_*`/`WAKE_*` have ZERO references ANYWHERE (not just zero
  importers — the files are GONE) — the deletion proof. (b) On a WebGPU-capable device with the opt-in lever
  forced `true`: forces a `device.lost` (via `device.destroy()` is a DESTROY-loss → NO fallback; via a
  GPU-OOM allocation OR the test-only loss-injection hook is a NON-destroy loss → MUST fall back to WebGL2)
  and confirms the surface re-binds the WebGL2 context + keeps painting, with the dev-error surfaced — NOT
  frozen black. (c) Confirms the opt-in WebGPU `samplePalette` ramp now matches the WebGL2 OKLCh-arc
  reference within tolerance (the slice-10-F3 divergence closed). ADVERSARIAL twists: (i) confirms a
  DESTROY-loss (deliberate `device.destroy()`) does NOT trigger the fallback (the non-destroy guard is
  honest — a deliberate teardown is not a degradation); (ii) confirms the auto-probe
  `resolveRenderModeAsync("auto")` STILL returns `"webgl"` on a capable adapter (the opt-in disposition did
  not accidentally re-enable the auto-default).
- **Gate-author (≤1 agent — born-RED→GREEN + deletion-proof).** Re-scopes `proof:webgpu-substrate-single`
  clause-2 to the single-pass + no-dead-exports deletion clause; EXTENDS `proof:aurora-webgpu-render` with
  the device-loss-fallback + palette-ramp-parity assertions. Confirms each new clause FAILS at the
  pre-wave tree (the dead exports present / no device-loss subscription / the straight-OKLab ramp) and
  PASSES on the patched tree. (Branch A: authors `proof:aurora-webgpu-multipass` instead of the deletion
  clause.)

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 3, Branch B; 4 if
Branch A is ratified.)

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / runtime gate — born-RED→GREEN (Branch B, the recommended disposition).**

- **`proof:webgpu-substrate-single` (re-scoped, deletion-proof — born-RED).** Asserts (clause-2 replacement)
  that `painterly.wgsl.ts` + `wake.wgsl.ts` are GONE and that NO `PAINTERLY_*` / `WAKE_*` symbol is imported
  ANYWHERE in `src/`, AND that the substrate is a SINGLE-pass parity-floor backend (NO baked multi-pass FBO/
  storageTexture seam). **Born-RED at HEAD** (the files exist as dead exports). This is a **deletion-proof**
  artefact (SPEC.md §Hard Gates accepted form), not a "grep-found-a-string" invalid form — the assertion is
  that named exports NO LONGER EXIST.
- **`proof:aurora-webgpu-render` (extended from W07 — born-RED on the new clauses).** On a real `GPUDevice`
  in the W00 `tests-visual/` workspace (the W07 device render-and-readback gate, EXTENDED): (a) a forced
  **non-destroy `device.lost`** triggers the WebGL2 fallback — after the loss the surface binds
  `getContext("webgl2")` truthy + reads back a non-black centre pixel (NOT frozen-black). **Born-RED at HEAD**
  (no subscription → frozen black). (b) the opt-in WGSL `samplePalette` ramp matches the WebGL2 OKLCh-arc
  reference within the perceptual delta threshold (the slice-10-F3 divergence closed). **Born-RED at HEAD**
  (straight-OKLab `mix` vs the GLSL arc). (c) a DESTROY-loss does NOT trigger the fallback (the non-destroy
  guard is exercised — a runtime-observation, not a grep).

This is a **runtime-observation + deletion-proof** gate (the precept-valid artefact forms per SPEC.md §Hard
Gates), NOT a "grep found a source string for runtime behaviour" invalid form: the device-loss + palette-
parity clauses are real `GPUDevice` render + readback observations; the scaffold-gone clause is a deletion
proof (the symbols no longer exist), not a string match for runtime behaviour.

**(Branch A — if ratified)** `proof:aurora-webgpu-multipass` (born-RED): a real `GPUDevice` renders the
tensor→smooth→Kuwahara ladder; the gate asserts the Kuwahara output region MEASURABLY DIFFERS from the
single-pass base field (the multi-pass is genuinely executing, not a no-op), and that every pass parks under
the shared `shouldContinue()` freeze. Replaces the deletion clause.

**DEGRADED disclosure — W14 RESOLVES W07's inherited DEGRADED outcome (SPEC.md §DEGRADED).** W07 shipped
the WebGL2-default-until-parity DEGRADED outcome and named AX.W14 as its restoration wave. W14 discharges
that obligation NOT by restoring the auto-default (the unmeetable framing), but by RE-CLASSING the outcome:
WebGPU is a **parity-floor opt-in enhancement** with a device-loss → WebGL2 fallback — the universal WebGL2
path is the shipped default for ALL machines BY DESIGN, not a temporary degradation. The CHANGELOG "KNOWN
LIMITATION" entry is RESOLVED (the auto-default framing is retired with rationale). This is the honest close
of the W07 phased outcome — the "restoration" is the deletion of an unmeetable expectation, recorded, not a
silently-carried debt.

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion).** A live Playwright +
frontend-design pass on the live aurora demo (`/substrates/aurora`) on a **WebGPU-capable machine**, at
**≥ 3 viewports** (375×667 / 1280×800 / 1440×900) in **light AND dark**:
- **The opt-in WebGPU path paints (Branch B):** with the WebGPU opt-in forced on, the live `<Aurora>` paints
  the parity-floor single-pass field with the OKLCh-arc palette ramp — vivid, matching the WebGL2 reference
  ramp (the slice-10-F3 divergence visibly gone). (Branch A: it paints the Kuwahara oil finish at parity-
  or-better than WebGL2 — the §2.4 SOTA technique made visible.)
- **A forced device-loss degrades VISIBLY to WebGL2:** trigger a non-destroy device loss (the test-injection
  hook / a throttle) and confirm the surface keeps painting on the WebGL2 path — the user sees a continuous
  aurora, NOT a frozen black canvas. This is the cardinal befitting-silent degradation observed LIVE.
- **The shipped default is WebGL2 for all (Branch B):** with NO opt-in, the live `<Aurora>` binds the WebGL2
  context — no capable machine silently routes to the WebGPU enhancement.
- **Affordance / hierarchy / NO visual occlusion** per the AX cardinal gate.

**The wave does NOT close on the headless gate alone** — the executed live audit (captured as a paired-π
BEFORE/AFTER + DELTA artefact: the dead-scaffold-single-pass BEFORE vs the parity-floor-opt-in-plus-device-
loss-fallback AFTER) is the binding close criterion. A green deletion gate proves the scaffold is gone; only
the live device-loss observation proves the fallback actually paints.

---

## Cadence (sub-step order)

1. **RATIFY the architecture decision (RATIFY-BEFORE-IMPL).** The orchestrator confirms Branch B (EXCISE,
   the recommended disposition per §4 note 14 + constellation finding 7) OR over-rides to Branch A (WIRE,
   re-class BLOCKER). Record the ratification in `audit/W14-webgpu-painterly.json`. NO impl proceeds until
   ratified.
2. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the three RED witnesses against the post-W07
   tree on a WebGPU-capable device: `grep` the dead `PAINTERLY_*`/`WAKE_*` exports = importers-in-comments-
   only; instrument a forced `device.lost` → confirm the surface freezes black (no fallback); confirm the
   WGSL `samplePalette` ramp diverges from the WebGL2 OKLCh-arc. Record as the born-RED baseline. Do NOT
   proceed on the audit's word — re-prove.
3. **Author the born-RED gate clauses.** Re-scope `proof:webgpu-substrate-single` (the deletion clause) +
   extend `proof:aurora-webgpu-render` (device-loss fallback + palette parity); confirm each FAILS at the
   pre-wave tree.
4. **Excise the dead scaffold (Branch B).** DELETE `painterly.wgsl.ts` + `wake.wgsl.ts`; strike the dead
   multi-pass comments in `gpuRuntime.ts` + `createGPUCanvas.ts`. Lint + typecheck. (Branch A: author
   `gpuPasses.ts` + wire the ladder instead.)
5. **Device-loss fallback.** Subscribe to `device.lost` in `createGPUAuroraSetup`/`createGPUCanvas`: the
   non-destroy-loss → WebGL2 teardown-and-reconstruct + the dev-only error. Lint + typecheck.
6. **Palette-ramp parity.** Port `mixPaletteOklchArc` into the WGSL `samplePalette` (reusing the spliced
   `OKLCH_MATRICES_WGSL`); confirm the opt-in ramp matches the WebGL2 reference.
7. **The `WEBGPU_PARITY` disposition + the DEGRADED resolution.** Set the opt-in-only disposition in
   `renderMode.ts`; delete the auto-default JSDoc framing; rewrite DESIGN.md/README the parity-floor reality;
   RESOLVE the CHANGELOG "KNOWN LIMITATION" W07 entry.
8. **Gate GREEN + VISUAL-TRUTH.** Confirm both gates pass (deletion + device-loss + palette parity); run the
   live audit (opt-in paints + forced device-loss degrades visibly to WebGL2 + shipped-default is WebGL2);
   capture the paired-π BEFORE/AFTER + DELTA; write `audit/W14-webgpu-painterly.json` to GREEN.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W14-webgpu-painterly.json` — the born-RED→GREEN ledger: the architecture-decision
  ratification record (Branch B EXCISE, with the §4-note-14 + constellation-finding-7 rationale), the three
  RED witnesses (the dead-export grep, the frozen-black device-loss observation, the straight-OKLab ramp
  divergence), the per-finding (slice 10 F2/F3/F4 + slice 8 F3) disposition with the OUT-of-scope routes
  (W07/W11/W13), and the post-wave GREEN measurements (the deletion proof, the device-loss → WebGL2 readback,
  the palette-ramp delta).
- The re-scoped `scripts/proof-webgpu-substrate-single.mjs` (the deletion clause) + the extended
  `scripts/proof-aurora-webgpu-render.mjs` (device-loss + palette parity).
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): the dead-scaffold-over-single-pass +
  frozen-black-on-device-loss BEFORE vs the parity-floor-opt-in + visible-WebGL2-fallback AFTER, at ≥ 3
  viewports × light/dark, on a WebGPU-capable machine.
- The RESOLVED CHANGELOG "KNOWN LIMITATION" entry (the W07 DEGRADED outcome closed: WebGPU is a parity-floor
  opt-in enhancement with device-loss fallback, not an auto-default).
- The deletion proof: `git log -S "PAINTERLY_TENSOR_WGSL"` / `git log -S "WAKE_ADVECT_WGSL"` shows the
  symbols removed at this wave (`painterly.wgsl.ts`/`wake.wgsl.ts` deleted).

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(aurora): proof:webgpu-substrate-single deletion clause + proof:aurora-webgpu-render device-loss/palette clauses born-RED (AX.W14)`
2. `refactor(aurora): excise the dead WebGPU painterly scaffold — DELETE painterly.wgsl + wake.wgsl + the multi-pass seam comments (AX.W14 slice10-F2 + slice8-F3)`
3. `fix(aurora): device.lost → WebGL2 fallback — tear down the GPU handle on a non-destroy loss + dev-surfaced error (AX.W14 slice10-F4)`
4. `fix(aurora): port mixPaletteOklchArc into the WGSL samplePalette — close the straight-OKLab ramp divergence on the opt-in WebGPU path (AX.W14 slice10-F3)`
5. `refactor(aurora): WEBGPU_PARITY is the opt-in-only lever — delete the unmeetable auto-default-on-medium-parity framing (AX.W14 §4-note-14)`
6. `docs(aurora): WebGPU parity-floor opt-in reality + device-loss degradation + RESOLVE the W07 KNOWN LIMITATION (AX.W14)`
7. `chore(AX.W14): audit ledger GREEN + paired-π BEFORE/AFTER + DELTA + the architecture-decision ratification record`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash per
the hardened agent git clause, K W0. These are the messages the orchestrator authors. Branch A substitutes
commit 2 with `feat(aurora): gpuPasses.ts ping-pong FBO ladder — wire the Kuwahara/LIC/tensor multi-pass`.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W07 (aurora core unblock) — HARD.** W07 eliminates the WGSL black canvas (the f32-cast + the
  storage-buffer transposition) so the WebGPU base field actually PAINTS, AUTHORS the `WEBGPU_PARITY` lever
  (sets it `false`), and NAMES AX.W14 as its DEGRADED-restoration wave. W14 cannot resolve the opt-in
  painterly disposition, close the palette divergence, or test the device-loss fallback over a base field
  that renders black — the base must paint first. W14 inherits W07's restoration obligation and discharges
  it (the disposition + the CHANGELOG resolution). (Charter §3 dependsOn AX.W07.)
- **AX.W13 (the first-class mediums) — HARD (the parity REFERENCE).** W13 ships the GLSL/WebGL2 first-class
  van-Gogh/oil-pastel mediums — the reference the "WGSL medium parity" question is measured against. W14
  CITES W13 to PROVE parity is unmeetable by the wave chain (W13 does NOT port the mediums into WGSL), which
  is the load-bearing premise of the EXCISE disposition + the auto-default-framing deletion. Without W13
  landed, the parity question is undecidable. (Charter §3 dependsOn AX.W13.)
- **Coordinate (NOT a hard dependency):** **AX.W11** (the aurora color seams) owns the `samplePalette` gate
  hole + the palette-ramp twin hoist to the shared chunk; sequence W11 before W14 (W14 is last in band C) so
  W14 SPLICES W11's hoisted OKLCh-arc rather than re-authoring it. Shared file `aurora.wgsl.ts`
  (`samplePalette`).
- **Position:** W14 is the LAST aurora wave (band C, after W10/W11/W12/W13 + alongside W38); it closes the
  WebGPU painterly question the whole B/C band sequencing left open.

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **`753c281`** (AW.W7c / W8.2 — the painterly/wake scaffold ORIGIN) — authored `painterly.wgsl.ts`
  (structure-tensor + separable Gaussian + anisotropic 8-sector Kuwahara) + `wake.wgsl.ts` (ping-pong
  stable-fluids self-advecting wake) as "the WebGPU full-quality half," but NEVER wired the consumer-side FBO
  ladder. `git log -S "PAINTERLY_TENSOR_WGSL"` / `git log -S "WAKE_ADVECT_WGSL"` confirm the strings appear
  ONLY in this creating commit + are referenced only in `gpuRuntime.ts` comments + `DESIGN.md` prose — DEAD
  EXPORTS since birth. This is the substrate-WITHOUT-consumer the §0 mandate ("dead scaffold is forbidden")
  + the no-overfitting precept forbid. W14 resolves it (excise — the recommended disposition — or wire).
- **`c17b74c`** (AW.W7b — the WebGPU substrate swap ORIGIN) — introduced `createGPUCanvas.ts` with the
  device-loss PUNT (`:122-123` — "device-loss is handled via device.lost (the consumer's setup may
  subscribe). No context-event bind here.") and the swap-once-forward model (probe → pick backend → never
  re-evaluate). The silent-failure trap (a lost device freezes black) is BORN here. W14 subscribes to
  `device.lost` + the WebGL2 fallback.
- **`067473c` / `eaba94f`** (AW batch-1 integration, UNPUBLISHED) — the audit baseline. The dead painterly
  scaffold + the device-loss punt + the straight-OKLab palette divergence ship over GREEN structure/AST gates
  (`proof:webgpu-substrate-single` is regex/AST; `proof:aurora-wgsl-equivalence` is the color-chunk-only 1e-6
  TS port — neither catches dead exports or an unhandled device-loss). The cardinal headless-green/
  visually-incomplete signature.
- **§4 note 14 (the WEBGPU_PARITY unmeetable-parity reconciliation).** The W07↔W14 "re-enable on medium
  parity" criterion is UNMEETABLE: W13 ships the six mediums in GLSL/WebGL2 ONLY; the WGSL twin gains no
  medium dispatch; W14's Kuwahara is a separate painterly finish, not the per-fragment mediums. The decided
  disposition (the DELETE branch): WebGPU is an OPT-IN enhancement over a parity-floor field, NEVER
  auto-default; W14 flips `WEBGPU_PARITY` only for the opt-in path. This is the §4-recorded ratification W14
  carries as its scope decision.
- **Constellation `result[29]` findings 3 + 7 (the RESOLVE-the-OR convergence).** Finding 3: the re-enable
  criterion is never met by the wave chain — make it HONEST. Finding 7: RESOLVE the open `OR` now (the §17
  fully-formed-spec mandate); **DEFAULT to EXCISION** (delete `painterly.wgsl` + `wake.wgsl`, re-scope WebGPU
  to a parity-floor single-pass enhancement, keep the `device.lost` fallback), folding the SOTA multi-pass
  Kuwahara into a future tranche if a real consumer demands it; if the build path is kept, W14 must be a
  blocker-sized wave with its own FBO-ladder FileBounds, not a `major`.
- **HEAD `eaba94f`** (batch-1 integration, UNPUBLISHED) — the audit baseline; the dead `PAINTERLY_*`/`WAKE_*`
  exports + the punted `device.lost` + the straight-OKLab `samplePalette` are all present here.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-C (AURORA) binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **no-overfitting / substrate-with-consumer (Design-Axis-3; the headline precept).** `painterly.wgsl.ts` +
  `wake.wgsl.ts` are shipped substrate with ZERO consumer (zero importers — the visual-load-bearing-ness bar
  was never met; the multi-pass seam was BUILT but never wired). The recommended disposition (EXCISE) deletes
  them — the canonical no-overfitting resolution (substrate-without-consumer is binary; ship ≥2 consumers OR
  formally retire with rationale). MUST NOT carry them as dead exports into the AX cut. (Branch A wires them
  to a live consumer — the alternative resolution; either way the dead-scaffold class is closed.)
- **one-path / no-legacy-code ("excise or fail explicitly").** §0 forbids dead scaffold: every
  legacy/temporary/fallback path is DELETED or made to fail loudly. W14 deletes the dead painterly half (or
  wires it) — no half-built `OR` left open. The straight-OKLab-vs-arc palette divergence is a second drifting
  copy of the ramp math; W14 collapses the opt-in WGSL `samplePalette` onto the single-source OKLCh-arc
  (reusing the spliced `OKLCH_MATRICES_WGSL`), not a re-authored second copy.
- **fail-explicit on library-internal violations vs befitting-silent browser-API degradation (the two are
  NEVER collapsed; SPEC.md §Hard Gates + README §Edicts).** The `device.lost` → WebGL2 fallback is the
  CANONICAL befitting-silent browser-API degradation: the browser took the device away (not a library
  contract violation), so the library degrades gracefully to the tested WebGL2 path with rationale + a
  DEV-only error — it does NOT throw at the consumer in production. This is explicitly NOT collapsed with the
  fail-explicit library-internal-throw class (the W07 int-in-float / `var<uniform>` defects, which WERE fixed
  at the root). The non-destroy guard (a deliberate `device.destroy()` does NOT trigger the fallback) keeps
  the degradation befitting — a deliberate teardown is not a degradation.
- **π visual-runtime lane / Gates-close-on-evidence (SPEC.md §Hard Gates — no grep-only runtime gate).** The
  device-loss + palette-parity clauses are runtime-observation artefacts (a real `GPUDevice` render + readback
  through a forced loss); the scaffold-gone clause is a DELETION proof (the symbols no longer exist), an
  accepted §Hard-Gates form — NOT a "grep found a source string for runtime behaviour" invalid form. MUST NOT
  VIOLATE — the wave's close is the executed live Playwright + frontend-design audit on a WebGPU-capable
  machine (the opt-in paint + the VISIBLE device-loss → WebGL2 degradation), never a headless proof alone (the
  cardinal AX precept; only a live observation proves the fallback actually paints).
- **DEGRADED runtime outcome resolution (SPEC.md §DEGRADED — binding, INHERITED from W07).** W07 shipped the
  WebGL2-default DEGRADED outcome + named AX.W14 as its restoration wave + emitted the CHANGELOG "KNOWN
  LIMITATION." W14 DISCHARGES that named-restoration obligation: it RESOLVES the outcome (WebGPU is a
  parity-floor opt-in enhancement BY DESIGN, with a device-loss fallback) rather than restoring an unmeetable
  auto-default, and RESOLVES the CHANGELOG entry with rationale. A named-restoration wave that silently
  abandoned the obligation would be an invalid close; W14's explicit resolution-with-rationale makes the W07
  DEGRADED outcome a properly-closed phased deliverable, not a silently-carried debt.
- **canonical-readme-shape (band-C precept).** The aurora README/DESIGN.md WebGPU section is rewritten to the
  research-backed parity-floor reality (single-pass opt-in enhancement, device-loss → WebGL2, the SOTA
  multi-pass deferred-with-rationale) — documentation is part of the change, the false "modern WebGPU
  technique / full-quality multi-pass half" narrative is corrected, not left to mislead.
- **RATIFY-BEFORE-IMPL (the architecture decision — §4 note 14 + constellation finding 7).** The
  build-vs-excise fork is load-bearing for the B/C band sequencing + the wave's severity class (EXCISE =
  `major`; WIRE = blocker-sized). The orchestrator MUST ratify the disposition (recommended: EXCISE) BEFORE
  impl, because it determines whether `gpuPasses.ts` is authored (Branch A) or `painterly.wgsl.ts`/
  `wake.wgsl.ts` are deleted (Branch B). The spec records the recommended path + its three-fold rationale;
  the orchestrator's ratification binds the FileBounds + Triumvirate count + the gate form (deletion-proof vs
  multi-pass-render).
