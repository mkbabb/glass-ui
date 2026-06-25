# BD.W-GPU-ONLY-SPINE — the GPU-only dual-backend selector + the `/canvas` REGISTRY-contract removal + the code-aware D1 census (the V-keystone)

**Band 11 (V GPU-only spine + field) · depends: NONE (none-inbound, the V-keystone)** — the GPU-only PRECEPT-INVERSION over `proof:gpu-substrate-single` clause B+C; it RETIRES the `W-VIZ-FALLBACK-RETIRE-WATCH` arm of `W-VIZ-TAILS` (the `.glsl`↔`.wgsl` two-GPU-backend twins SURVIVE — the Safari path is a backend, not a fallback). `W-VIZ-PERF-BUDGET` declares `depends: W-GPU-ONLY-SPINE` (`EXECUTION-DAG.md:127-128`). Subsumes `W-LENS-RASTER-PURGE` (the `useGlassRenderer` Snell-bake→`.glass-lens` arm — MIGRATE-WITH-π, NOT a presumed delete; see §3).

> **STATUS: IMPLEMENTATION-gated.** This is the tranche-DEV PLAN doc. The build edits `src/` + `package.json` + the disposition register + MIGRATION.md and is user-gated. The spec is in scope now.

## The defect / the ask (Pass-D code-grounded — `critique/passd-foundation.md F1-F4`, `PASSD-FOLD §Batch-2 W-GPU-ONLY-SPINE F1/F4 + D1 census`)

The roster one-liner (`UNIFIED-ROSTER.md:144`) frames the Canvas2D/swraster purge as "cleanup" and the `selectGpuBackend()` reorder as a "120 LOC evaporate." Pass-D traced the REAL code at HEAD and found FOUR substance holes the one-liner hides — three are corrections of an over-read, one is an UNNAMED registry breaking change:

1. **`/canvas` is a REGISTRY-PUBLISHED subpath, NOT an internal symbol (the hardest, F1).** `package.json:371` ships `"./canvas": { "types": "./dist/canvas.d.ts", "import": "./dist/canvas.js" }`, `src/subpaths/canvas.ts` mirrors it (`export * from "../composables/glass/canvas2d"`), and `dist/canvas.d.ts` is enrolled in `typesVersions` (`package.json:71`). Per inv-11 (no out-of-band lineage publish) + the prune-census-must-probe-the-registry corollary every OTHER prune in this repo meets (`W-NDA-DECIDE`/`W-PRUNE-CONSOLIDATE` carry the disposition-register row + the MIGRATION line + the registry probe), removing a published subpath is a CONTRACT removal, not a refactor. The roster carries NONE of that discipline.

2. **The INTERNAL strand IS honest (the purge does not strand a live viz).** Every `useCanvas2D`/`createCanvas2D` importer traced: the ONLY real importers are the two barrels (`composables/glass/index.ts`, `canvas2d/index.ts`). Both `constellation` (`useConstellation.ts:377`) AND `fourier-field` (`useFourierField.ts:164`) already migrated to `createGpuSubstrate`; the `useCanvas2D` strings in those dirs are STALE README/comment prose, not imports. So in-tree nothing renders on Canvas2D — the purge is honest on the in-tree axis; the EXTERNAL/registry axis is the only real risk, and it's the one the roster ignores.

3. **The gate strand is 4 entries, not 1.** `proof:gpu-substrate-single` clause C (`scripts/proof-gpu-substrate-single.mjs:404-412`) asserts `useCanvas2D` exists AND composes the leaf — deleting the file REDs clause C. Clauses A/B reuse `detectCanvas2DSingleSource` imported from `proof-webgl-substrate-single.mjs:46` (the shared detector); AND `proof:canvas2d-substrate` (`package.json:876`) + `proof:resolve-canvas-color` (`package.json:877`) are standalone vitest gates over the file. That's **3 gate entries + 1 shared detector** to retire in lockstep, or the wave self-REDs at first run.

4. **`selectGpuBackend()` "120 LOC evaporate" is FALSE — the clone is STRUCTURALLY REQUIRED for ONE class (F4).** Tracing the REAL acquisition path: `acquireDevice()` (`useWebGPUCanvas.ts:291`) runs `requestAdapter` (`:298`) → `isSoftwareWebGPUAdapter` (`:312`) → `requestDevice` (`:320`) ALL before any `getContext` — those TWO classes (adapter-null + software-adapter) CAN be hoisted ahead of the canvas. BUT the **pipeline-validation reject** is at `armAsync:388` (the `WebGPUInitError("pipeline-validation", …)` throw), which fires AFTER `lifecycle.arm()` (`:366`) → `buildContext()` → **`canvas.getContext("webgpu")` (`:197`)** has ALREADY POISONED the canvas (the one-context-type rule: a canvas that has hosted `webgpu` returns `null` from `getContext("webgl2")` forever). You CANNOT validate a render pipeline without a configured `webgpu` context, and configuring IS the poison — so on a lying-adapter host (Metal reporting `apple/metal-3` that passes adapter+device but fails the metaball pipeline) the canvas is poisoned when the reject fires, and **`freshCanvasForFallback` (`useGpuSubstrate.ts:147`, ALREADY a real function at HEAD) is structurally REQUIRED for that one class.** The "minimal retry survives" hedge is right but the wave must NAME the class + GATE that the clone PERSISTS (a future over-cut deleting it must RED — the symmetric closure W-PRUNE-CONSOLIDATE's D-clauses teach).

5. **The D1 census is 2 live `src/` surfaces + 1 demo egg, code-located (F3).** The comment-stripped `getContext("2d")` census at HEAD:
   - `demo/eggs/FRedrawOverlay.vue:47` — the fourier draw-overlay egg, **the ONE true cut** (a live Canvas2D draw on a viz surface).
   - `src/composables/glass/useGlassRenderer.ts:55,98` — the Snell displacement-map BAKE (`putImageData`; consumers `GlassPanel.vue` + `DockGooFilter.vue`). **The lens-raster-purge TARGET** — but the falloff at `:70` is `dist * (1 - dist * 0.3)` (PARABOLIC, NOT quartic — the Pass-D minor correction; the `.glass-lens` CSS-gradient equivalence is OVER-stated but the core-point argument survives) → **MIGRATE-WITH-π, not a presumed delete** (2 live consumers; the crossed-linear-gradient ≠ the data-URI displacement map pixel-for-pixel).
   - `src/components/custom/aurora/composables/auroraFallbackGround.ts:346` — the swraster CSS-fallback ground, **the swraster-purge TARGET** (cross-repo-blocked — see §5).
   - `src/composables/glass/useGlassBackdropLuminance.ts:316` — the dock adaptive-darken SAMPLER (`drawImage`+`getImageData`, `willReadFrequently`). **LEGITIMATE KEEP, EXEMPT** — there is NO web API that reads the pixels painted BEHIND a `backdrop-filter` element, so the 1-shot downsampled probe is the only way to write `--glass-backdrop-luma`; deleting it breaks the dock iOS-27 darken. The GPU-only mandate is about VIZ RENDER, not a probe.

The ask is the foundation critique's five FIXES (F1-F4 + cross-repo timing): name `/canvas` as a published-subpath retirement with the full prune discipline; reorder the selector probe-first but NAME + GATE the residual clone's one class; make the D1 gate code-aware (EXEMPT the luminance probe, MIGRATE-WITH-π the lens bake); block the `auroraFallbackGround` delete on the cross-repo cert.

## The mechanism

ONE selector reorder (probe-first, the residual clone NAMED) + the `/canvas` registry-contract removal (the full prune discipline) + the code-aware D1 cut (egg-only this wave; lens MIGRATE-WITH-π; luminance EXEMPT; swraster cross-repo-blocked).

### 1. `selectGpuBackend()` — probe-first, the residual clone NAMED to ONE class

`useGpuSubstrate.ts` gains a `selectGpuBackend(canvas, options)` prelude that runs the two HOISTABLE probe classes ahead of any `getContext`:

- **`navigator.gpu` absent / `requestAdapter()` null** → pick `"webgl2"` BEFORE the canvas is touched. The clone NEVER fires (the canvas is unpoisoned).
- **`isSoftwareWebGPUAdapter(adapter)` true** → pick `"webgl2"` BEFORE the canvas is touched (the software-Metal/SwiftShader signal the W-AURORA-SWRASTER guard already reads, hoisted ahead of `getContext`). The clone NEVER fires.
- **adapter + device acquire, pipeline VALIDATES** → `"webgpu"` (byte-untouched).
- **adapter + device acquire, pipeline FAILS validation (the lying-adapter class)** → the canvas is ALREADY poisoned (configure ran inside `buildContext`), so `fallToWebGL2(error)` calls `freshCanvasForFallback(liveCanvas)` (`:147`) and the clone fires. **This is the ONE residual clone class — pipeline-validation ONLY.** It is NAMED in the code comment + the disposition note so a future reader does not re-attempt to delete it.

The honest LOC accounting: the multi-class `try`/`catch` that fired the clone for THREE classes shrinks to a single-class chain (the two hoistable classes evaporate the clone); `onBackendFallback` + the narrowed chain STAY. The "120 LOC evaporate" claim is struck from the roster (the clone + its single-class chain persist).

### 2. The `/canvas` registry-contract removal (the F1 prune discipline)

Removing the `/canvas` published subpath is a CONTRACT removal owing the full prune bar:

- **A DISPOSITION-REGISTER row** (`docs/tranches/AX/audit/DISPOSITION-REGISTER.json`) — a `canvas-subpath` row flipped `book → retired` with `retiredBy: "BD.W-GPU-ONLY-SPINE"`, a non-empty `rationale` (the GPU-only PRECEPT-INVERSION — Canvas2D is no longer a backend; both in-tree viz consumers already migrated to `createGpuSubstrate`), and a `successor` (`@mkbabb/glass-ui/canvas` → `@mkbabb/glass-ui/glass`'s `createGpuSubstrate` for any external Canvas2D consumer). The no-delete fence: a fold is a disposition FLIP in place, never a row deletion.
- **A MIGRATION.md line** — `@mkbabb/glass-ui/canvas` RETIRED (clean break, no alias — the no-backwards-compat law); a Canvas2D consumer migrates to `createGpuSubstrate` (the WebGL2 backend over the same lifecycle leaf). Names the exact import rename.
- **A registry + constellation consumer probe** — the prune-census probes `npm view @mkbabb/glass-ui` + the known-consumer constellation for any live `@mkbabb/glass-ui/canvas` importer BEFORE the cut. A published-but-off-mainline `/canvas` consumer forces a NAMED fold line, never a silent prune (the inv-11 corollary, `proof:lineage-probe` L2).
- **The 4 gate entries retire in lockstep** — `proof:gpu-substrate-single` clause C is re-authored to NOT demand the deleted `useCanvas2D` (the WebGL2-single-source + WebGPU-single-source arms STAY; the Canvas2D arm is struck); `proof:canvas2d-substrate` + `proof:resolve-canvas-color` (the two vitest gates) are removed from `package.json`; the shared `detectCanvas2DSingleSource` reuse is removed where it gated the Canvas2D file.

### 3. The D1 census cut (egg-only this wave; lens MIGRATE-WITH-π; luminance EXEMPT)

- **The egg — the ONE true cut.** `demo/eggs/FRedrawOverlay.vue:47` (the live Canvas2D draw on the fourier surface) is removed/re-expressed off Canvas2D. This is the only unconditional D1 cut.
- **The lens bake — MIGRATE-WITH-π (subsumes `W-LENS-RASTER-PURGE`).** `useGlassRenderer.ts` (the Snell `putImageData` displacement-map bake, parabolic falloff `dist*(1-dist*0.3)`, 2 live consumers `GlassPanel.vue` + `DockGooFilter.vue`) is replaced by the `.glass-lens` CSS-gradient ONLY behind a rendered capture-pair proving the refraction reads equivalent on BOTH consumers (the crossed-linear-gradient is NOT pixel-identical to the data-URI displacement map — the equivalence is ASSERTED at the roster, PROVEN here). If the π shows a material divergence, the lens bake is KEPT (a non-GPU CSS-filter raster on a glass plate, not a viz render — the same D1-exempt class as watercolor-dot's once-rasterized SVG filter).
- **The luminance probe — EXEMPT.** `useGlassBackdropLuminance.ts:316` is on the D1 EXEMPT allowlist (no GPU equivalent; deleting it breaks the dock darken). The gate records it as a named keep, never a red.

## The gate — `proof:gpu-only-spine` (born-RED → GREEN; CODE-AWARE, never a naive `getContext` grep)

`scripts/proof-gpu-only-spine.mjs`, `tags: ["local","ci"]` (the source-structure + registry-prune arm; the lens MIGRATE-WITH-π paint is the π). The detector COMMENT-STRIPS first (a `getContext("2d")` inside a `//`/`/* */` comment or a negation string `carries NO getContext("2d")` does NOT count — the F3 false-RED fix) and exports a pure detector for the self-test bites.

- **C1 — the D1 viz-render census is code-aware + EXEMPT-allowlisted.** The detector scans `src/` + `demo/` for a LIVE `getContext("2d")`/`getContext('2d')` call-expression (comment-stripped) and asserts the ONLY surviving sites are on the EXEMPT allowlist (`useGlassBackdropLuminance.ts` — the named legit keep) OR the lens bake pending its MIGRATE-WITH-π (C3). A live Canvas2D draw on a viz surface (the egg class) REDs; a comment-string `getContext("2d")` does NOT red (the F3 false-RED bite). `facts.d1Sites` records every matched line + its verdict (cut / exempt / migrate-pending).
- **C2 — `selectGpuBackend` is probe-first AND the residual clone PERSISTS for its ONE class.** The detector asserts (a) `useGpuSubstrate.ts` carries a `selectGpuBackend(` call-expression that runs the adapter-null + software-adapter probe BEFORE the `getContext("webgpu")` path (the hoist), AND (b) `freshCanvasForFallback(` is STILL CALLED in `fallToWebGL2` (the residual clone PERSISTS) AND its call-site comment NAMES the pipeline-validation class (the symmetric-closure: a future over-cut deleting `freshCanvasForFallback` REDs). A `selectGpuBackend` that deletes the clone (claiming full evaporation) REDs; a clone that fires for MORE than the pipeline-validation class (an un-hoisted adapter-null still cloning) REDs.
- **C3 — `/canvas` is retired with the FULL prune discipline (registry-contract, not cleanup).** The detector asserts: (a) `package.json` carries NO `"./canvas"` export AND no `dist/canvas.d.ts` in `typesVersions` (the contract removed); (b) the DISPOSITION-REGISTER carries a `canvas-subpath` row flipped `retired` with a `retiredBy` resolving to THIS wave-spec + a non-empty `rationale` + `successor` (the prune bar); (c) MIGRATION.md carries the `/canvas` RETIRED line; (d) the 4 gate entries (`proof:canvas2d-substrate`, `proof:resolve-canvas-color` absent from `package.json`; clause C re-authored; the shared detector reuse struck). A `/canvas` removal with NO disposition row / NO MIGRATION line / a surviving gate entry REDs (the F1 "cleanup" framing barred).
- **C4 — the lens MIGRATE-WITH-π is gated, not presumed.** The detector asserts that IF `useGlassRenderer.ts` is deleted/CSS-gradient-replaced, a `tests-visual/lens-migrate.spec.ts` capture-pair exists asserting the refraction reads equivalent on `GlassPanel` + `DockGooFilter` (the 2 live consumers, both modes) — a presumed delete with NO capture-pair REDs. IF the bake is KEPT (the π showed divergence), it is on the D1 exempt allowlist with the recorded rationale (a CSS-filter raster, not a viz render). The wave records the verdict (migrated-with-π / kept-exempt) as a gate fact.
- **C5 — the `.glsl`↔`.wgsl` twins are KEPT (the GPU-only inversion is NOT a fallback retire).** The detector asserts every viz's `.wgsl.ts` AND `.glsl.ts` twin still exists (the two-GPU-backend Safari path) — a wave that deletes the WebGL2 GLSL twin (mis-reading "GPU-only" as "WebGPU-only") REDs. The PRECEPT-INVERSION retires Canvas2D/swraster, NEVER the WebGL2 backend.

**Self-test bites (each planted defect MUST red — sized to clear its own clause):**
- (a) a live `getContext("2d")` draw on a viz surface (a synthetic re-added egg) → C1 RED.
- (a2) a comment-string `// carries NO getContext("2d")` planted in a viz file → C1 must NOT red (the false-RED bite — the detector is comment-aware).
- (b) a `selectGpuBackend` that deletes `freshCanvasForFallback` → C2 RED (the over-cut symmetric-closure bite).
- (b2) a clone firing for the adapter-null class (un-hoisted) → C2 RED.
- (c) a `/canvas` removal with no DISPOSITION-REGISTER row → C3 RED (the cleanup-framing bite).
- (c2) a `/canvas` removal leaving `proof:canvas2d-substrate` in `package.json` → C3 RED.
- (d) a lens CSS-gradient replacement with NO capture-pair → C4 RED (the presumed-delete bite).
- (e) a deleted `.glsl.ts` WebGL2 twin → C5 RED (the GPU-only ≠ WebGPU-only bite).

**What reds on the pre-fix tree (born-RED by construction):** C1 (the egg is live), C2 (`selectGpuBackend` does not exist — the probe is committed at construction in `attemptWebGPU`), C3 (`"./canvas"` is published, no disposition row, the 4 gates live), C4 (no capture-pair for the lens). GREEN only after the selector reorder + the registry-contract removal + the egg cut + the lens MIGRATE-WITH-π land.

## The binding π — `tests-visual/lens-migrate.spec.ts` (the MIGRATE-WITH-π, only if the lens is replaced)

The painted-truth readback the lens equivalence needs (the C4 gate), BOTH modes (light + dark) + the **webkit project** (the `.glass-lens` is `@supports (backdrop-filter: url())`-gated; the capture proves the off-Chromium degrade-floor too). Surfaces: `GlassPanel.vue` + `DockGooFilter.vue` (the 2 live `useGlassRenderer` consumers) over a busy backdrop, served at `:5199`.

- **The refraction-equivalence capture-pair.** Capture the HEAD `useGlassRenderer` Snell-bake refraction on each consumer AND the `.glass-lens` CSS-gradient replacement, and assert the edge-concentrated displacement reads EQUIVALENT (a per-region structural-similarity bar over the rim band — the crossed-linear-gradient must carry the same edge-concentrated bend the parabolic falloff produces). If the divergence exceeds the bar, the verdict is KEEP-the-bake (the D1 exempt path); if within, the verdict is MIGRATED (the bake deleted).
- **The degrade-floor.** On the webkit project (where `backdrop-filter: url()` may be absent), the un-gated blur+tint base paints alone — the glass still reads as glass, never a broken transparent hole.

This π exists ONLY on the migrate path; the rest of the wave (selector reorder, registry-contract removal, egg cut) is device-free source/registry structure (it paints zero NEW pixels — the selector + the purge change no viz render at the default-GPU path; the swraster/lens are the only pixel-touching arms, and swraster is cross-repo-blocked).

## The gestalt row

**NO new `proof:ba-gestalt` viz verdict from the selector/purge arms (device-free — BB inv-4; they change no viz render).** The lens MIGRATE-WITH-π rides the EXISTING glass/CTA gestalt verdict (the `.glass-lens` is a W-LENSING surface — its gestalt is owned there; this wave only proves the migration is paint-equivalent, not a new surface). The swraster purge's gestalt (the aurora reads correct WITHOUT the CSS fallback ground) is the speedtest CI cross-repo concern (§5), not a glass-ui gestalt row. The acceptance is mechanical: the selector is probe-first, the clone persists for its one named class, `/canvas` is retired with the full prune bar, the egg is cut, the lens migration carries its π verdict.

## Fences

- **The clone is STRUCTURALLY REQUIRED for ONE class — never delete it.** `freshCanvasForFallback` fires for the pipeline-validation class ONLY (the canvas is poisoned before the reject fires — configure IS the poison). The "120 LOC evaporate" framing is FALSE; the clone + its single-class chain PERSIST (C2 symmetric-closure). A future over-cut deleting it REDs.
- **`/canvas` is a PUBLISHED subpath — the full prune discipline, not "cleanup."** Disposition-register row + MIGRATION line + registry probe + 4 gate entries in lockstep (C3). The roster's "cleanup" framing is struck.
- **The luminance probe is EXEMPT — no GPU equivalent.** `useGlassBackdropLuminance.ts:316` is a 1-shot downsampled `getImageData` probe of the backdrop (no web API reads behind `backdrop-filter`); it is a named keep, never a D1 red.
- **The lens bake is MIGRATE-WITH-π, not a presumed delete.** 2 live consumers; the falloff is PARABOLIC (`dist*(1-dist*0.3)`, NOT quartic) so the `.glass-lens` CSS-gradient equivalence is asserted-not-proven — a capture-pair gates the cut, or the bake is KEPT exempt (C4).
- **The code-aware D1 gate — comment-strings false-RED.** The detector comment-strips first; a `// carries NO getContext("2d")` negation string does NOT red (C1 false-RED bite). A naive grep is barred.
- **The `.glsl`↔`.wgsl` twins SURVIVE — GPU-only ≠ WebGPU-only.** The PRECEPT-INVERSION retires Canvas2D/swraster (no longer a backend); the WebGL2 GLSL twin is the Safari/tail path, a real GPU backend (C5). Deleting it REDs.
- **The swraster delete is CROSS-REPO-BLOCKED.** `auroraFallbackGround.ts` is the `proof:aurora-swraster` headless contrast-cert floor; the palette-derived AA cert must land in speedtest BEFORE glass-ui deletes the CSS fallback ground (or speedtest CI captures black). The cross-repo TIMING is a BLOCKING precondition (the foreign-tree fence — speedtest owns its edit), recorded as a §5 open orchestrator decision, never a parallel.

## Disposition links

- **`PASSD-FOLD §Batch-2 W-GPU-ONLY-SPINE F1`** (`/canvas` is a REGISTRY-PUBLISHED contract removal — disposition row + MIGRATION + registry probe + 4 gate entries) → BUILT (the spec; the build user-gated). CLOSED at the spec level.
- **`PASSD-FOLD §Batch-2 W-GPU-ONLY-SPINE F4`** (`selectGpuBackend` "120 LOC evaporate" is FALSE — the pipeline-validation reject poisons after `getContext`; `freshCanvasForFallback` is STRUCTURALLY REQUIRED for that ONE class; NAME it + GATE the clone PERSISTS) → BUILT (C2 the symmetric-closure persist assert). CLOSED.
- **`PASSD-FOLD §Batch-2 D1 census`** (`useGlassRenderer` Snell→`.glass-lens` MIGRATE-WITH-π, parabolic not quartic; `useGlassBackdropLuminance:316` LEGITIMATE KEEP; `FRedrawOverlay.vue:47` the one cut) → BUILT (C1 EXEMPT-allowlist + C4 MIGRATE-WITH-π). CLOSED.
- **`critique/passd-foundation.md F1-F4 + the 5 FIXES`** → each fix is a clause (F1→C3 registry-contract, F2→`W-VIZ-PERF-BUDGET` the sibling wave, F3→C1 code-aware census + C4 lens π, F4→C2 named clone, cross-repo timing→the §5 blocking precondition). CLOSED.
- **SUBSUMES `W-LENS-RASTER-PURGE`** (the `useGlassRenderer` Snell-bake→`.glass-lens` arm rides this wave as the MIGRATE-WITH-π, C4) → the presumed-delete is replaced by the gated capture-pair. CLOSED.
- **RETIRES `W-VIZ-FALLBACK-RETIRE-WATCH`** (the `W-VIZ-TAILS` arm, `EXECUTION-DAG.md:173`) → the GPU-only PRECEPT-INVERSION; the `.glsl`↔`.wgsl` twins SURVIVE (C5). CLOSED.
- **PREREQUISITE FOR** `W-VIZ-PERF-BUDGET` (`depends: W-GPU-ONLY-SPINE`, `EXECUTION-DAG.md:128` — the budget gate measures the GPU-only render path). Forward.
- **Band 11 V-keystone (`EXECUTION-DAG.md:127` — none-inbound, the V-keystone)** — the GPU-only inversion lands FIRST on the V GPU-only spine arm.
