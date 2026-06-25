# GPU-only substrate unification — DELETE Canvas2D, ONE substrate spine (BD viz-arch)

**Lane** BD viz-research / architecture · **Status** AUTHORED 2026-06-22 · **Branch** `prototype/liquid-dock` ·
**Substrate-grounded** against `src/composables/glass/{webgl,webgpu,canvas2d}/*` + the 10 viz consumers + `scripts/proof-{webgl-substrate-single,gpu-substrate-single,webgpu-everywhere}.mjs` ·
**Scope** PLANNING/RESEARCH ONLY — zero `src/` edits. THIS doc is the binding artifact; the wave that executes it is `W-GPU-ONLY-SPINE` (named below).

> Read alongside `wave-math-shared.md` (the shared field chunk is WebGPU/WebGL2-only by construction — it consumes this spine) and `live-audit.md` §"cross-cutting findings 2/5" (the live-confirmed purge targets).

---

## 0. TL;DR — the finding overturns the mandate's premise

The mandate names FOUR Canvas2D viz to migrate (fourier-field, constellation, dot-flow-fallback, aurora-ground). **All four ALREADY render on `createGpuSubstrate` at HEAD** — the migration the mandate asks for is DONE (BC.W-VIZ-* + W-WEBGPU-EVERYWHERE landed it). The live Canvas2D footprint is now:

1. **The unused `useCanvas2D` substrate** (`canvas2d/useCanvas2D.ts`, 321L) + its barrel/subpath/api exports — **ZERO runtime callers** in `src/` (grep-confirmed: no `useCanvas2D(` / `useCanvasLifecycle(` call site survives). It is dead substrate kept alive only by the export surface + `proof:webgl-substrate-single` clause (e).
2. **`resolveCanvasColor.ts`** (95L) — a `light-dark()`→`rgb()` probe for a Canvas2D `strokeStyle` write. Its three named consumers (constellationField, the slides constellation, FourierField) all left Canvas2D, so it is dead too.
3. **`useGlassRenderer.ts` displacement/specular map generators** (`getContext("2d")` ×2) — these bake a STATIC texture into an SVG `feImage` `data:` URI. NOT a render loop, NOT a viz substrate. Live consumers: `GlassPanel.vue` + `DockGooFilter.vue`.
4. **`auroraFallbackGround.ts` `getContext("2d")`** (1 site) — a one-shot `createImageData`/`putImageData`/`toDataURL` raster that bakes the field's static composite into a CSS-background `data:` URI for the SwiftShader/no-GPU CSS ground.

**The architectural decision splits cleanly:** (1)+(2) are a pure DELETE (dead code). (3)+(4) are NOT viz-substrate Canvas2D — they are STATIC-RASTER-INTO-A-DATA-URI utilities on the CSS/SVG fallback path. The mandate's "ZERO Canvas2D, no fallbacks" is a statement about the LIVE VIZ RENDER PATH; (3)+(4) are the *don't-crash-to-black* insurance, which is a distinct concern with a distinct (and defensible) answer — see §4.

---

## 1. The substrate stack at HEAD (the real shape)

```
createCanvasLifecycle           ← the backend-AGNOSTIC schedule core (AU.W6, 362L)
  │   suspend-Set · rAF demand-gate · tab-visibility · content-visibility park ·
  │   live-PRM re-monitor · the Safari context-loss circuit-breaker (BC.W-SAFARI-WEBGL)
  ├── useWebGLCanvas   (WebGL2 backend, 234L)  — getContext("webgl2") + program + buffers
  ├── useWebGPUCanvas  (WebGPU backend, 442L)  — async device + WGSL pipeline + device.lost heal
  └── useCanvas2D      (Canvas2D backend, 321L) — getContext("2d")  ← DEAD, 0 callers

useGpuSubstrate (createGpuSubstrate, 310L)
  the WebGPU-first / WebGL2-net PICKER — armAsync() tries WebGPU, falls to WebGL2
  on ANY init failure (no-adapter / device-reject / device-lost-at-birth / validation).
  The fall is INVISIBLE (same viz, WebGL2 net). Canvas-clone on the fall (the
  one-context-type poison). This is the SOLE substrate seam the 10 viz compose.
```

The 10 viz, by substrate at HEAD (all GPU, none Canvas2D-for-render):

| viz | substrate seam | WGSL primary | WebGL2 net | notes |
|---|---|---|---|---|
| aurora | `createWebGPUCanvas`/`createWebGLCanvas` direct (legacy, pre-picker) | yes (`aurora.wgsl`) | yes (`aurora.frag`) | + the CSS static-raster ground (§4) |
| blob (goo-blob) | `createGpuSubstrate` | yes (`metaball.wgsl`) | yes (`metaball.frag`) | |
| fourier-field | `createGpuSubstrate` | yes | yes | **migrated** — no Canvas2D |
| constellation | `createGpuSubstrate` | yes (`constellationWGPUSetup`) | yes (`constellationGLSetup`) | **migrated** — no Canvas2D |
| concentric | `createGpuSubstrate` | yes | yes | already GPU-only |
| dot-flow-field | `createGpuSubstrate` | yes (compute+render) | yes (fullscreen-frag) | **migrated** — Canvas2D point-cloud GONE |
| dot-matrix | `createGpuSubstrate` | yes | yes | already GPU-only |
| goo-dot-matrix | `createGpuSubstrate` | yes | yes | already GPU-only |
| paper-grid | `createGpuSubstrate` | yes | yes | already GPU-only |
| watercolor-dot | CSS/SVG (no canvas substrate) | — | — | a seeded SVG blob, not a GPU surface |

**Conclusion:** the viz render path is ALREADY 100% GPU. The work is (a) DELETE the dead Canvas2D substrate + the dead color-probe, (b) DECIDE the WebGL2-fallback policy, (c) MIGRATE aurora off its pre-picker direct-backend wiring onto the picker (so there is ONE substrate seam), (d) RESOLVE the two static-raster utilities.

---

## 2. The policy decision — is WebGL2 a forbidden "fallback" or an allowed GPU path?

**DECISION: WebGL2 is an ALLOWED GPU path, NOT a forbidden fallback. KEEP the WebGPU-first / WebGL2-net picker.**

### Rationale

The mandate's exact words: *"ALL web facilities use WebGPU or WebGL2 — ZERO Canvas2D, NO fallbacks, NO legacy."* Parse it precisely: the forbidden thing is **Canvas2D**. The phrase *"WebGPU or WebGL2"* explicitly NAMES WebGL2 as an allowed facility — the `or` is the permission. Both WebGPU and WebGL2 are GPU shader pipelines (programmable fragment/compute stages on the GPU rasterizer); the only thing that runs on the CPU rasterizer is Canvas2D. So:

- **"NO fallbacks"** binds the Canvas2D fallback (the CPU-raster don't-crash-to-black path), NOT the WebGL2 path. A WebGL2 render of the SAME viz is not a "fallback" in the degraded-quality sense the mandate rejects — it is a second GPU backend with byte-equivalent OKLab output (the `proof:gpu-substrate-single` parity table asserts ΔE mean≤2.0/p99≤5.0; the two are visually indistinguishable).
- **WebGPU is NOT universally available in June-2026.** Baseline: Chrome/Edge 113+, Safari 26+ on Metal, Firefox 141+ — but Linux Firefox still flags it, pre-A12 iPhones lack it, and headless/software-raster CI returns `null` from `requestAdapter()`. Dropping WebGL2 = crash-to-black on the ~5-10% tail + on EVERY headless π capture (the live-verify discipline dies). That is a regression the mandate's *"robust"* intent forbids.
- **The picker's fall is INVISIBLE** (`useGpuSubstrate` §0 — "the user never sees a downgrade, the SAME viz just renders via the WebGL2 net"). It is not legacy cruft; it is the load-bearing don't-crash insurance that lets WebGPU-first ship at all.

### The one nuance — "no fallbacks" DOES bite the CSS/Canvas2D ground

Where the mandate's "no fallbacks" lands with full force is the **third tier below WebGL2**: the CSS static-raster ground (`auroraFallbackGround`) and the layered-CSS-gradient placeholder. Those exist for hosts with NEITHER WebGPU NOR WebGL2 (a genuinely GL-less env, or a SwiftShader CI that the swraster guard forces to CSS). That tier is a Canvas2D-raster-into-`data:`-URI on aurora and a flat gradient elsewhere. §4 decides its fate.

### The de-overload of "fallback" (record this)

There are THREE distinct meanings of "fallback" in the substrate, and conflating them is the trap:

1. **WebGL2-net fallback** (WebGPU→WebGL2) — ALLOWED (a GPU path; KEEP).
2. **Canvas2D-substrate fallback** (the dead `useCanvas2D`) — FORBIDDEN (CPU raster; DELETE; already 0 callers).
3. **CSS/raster ground fallback** (no-GPU-at-all) — the "no fallbacks" target; §4 decides (recommend: KEEP as the inert don't-wedge floor, re-expressed off Canvas2D where cheap).

---

## 3. The clean ONE-substrate design (the target shape)

```
createCanvasLifecycle              ← UNCHANGED (the schedule core; byte-untouched)
  ├── useWebGLCanvas   (WebGL2)    ← KEEP (the allowed GPU path)
  └── useWebGPUCanvas  (WebGPU)    ← KEEP (the primary GPU path)
       (useCanvas2D     DELETED)

useGpuSubstrate (createGpuSubstrate) ← KEEP — the SOLE substrate seam every viz composes
```

Two backends over one schedule core, one picker, one consumer-facing handle. The mandate's *"clean ONE-substrate design: createCanvasLifecycle + the WebGPU-first/WebGL2 picker as the SOLE path"* is satisfied EXACTLY by deleting the third (Canvas2D) backend and routing aurora's pre-picker direct wiring through the picker.

### The aurora consolidation (the one real wiring change)

aurora is the ONLY viz still wiring `createWebGPUCanvas`/`createWebGLCanvas` DIRECTLY (pre-picker, because it predates `createGpuSubstrate` + carries the swraster guard + the album-reactive register + the CSS ground). The target is: aurora composes `createGpuSubstrate` like every sibling, and the swraster-guard + CSS-ground concern moves to a thin pre-check the picker already half-owns (`onBackendFallback` is the diagnostic seam; the no-GPU-at-all case is the new bit). This is the single non-trivial migration; everything else is delete-or-keep. (Detailed aurora wiring is `aurora.md`'s scope; this doc names the consolidation as a spine requirement.)

---

## 4. The two static-raster utilities — NOT viz substrate, decided separately

Neither is a render loop; both bake a STATIC texture into a `data:` URI consumed by CSS/SVG. They are the "no-GPU-at-all" insurance + a glass-decoration generator. The mandate's GPU-only spirit is about the LIVE viz; these are edge concerns.

### 4a. `useGlassRenderer.ts` displacement + specular maps (`getContext("2d")` ×2)

- **What it is:** generates a Snell's-law displacement map + a Fresnel specular map as a hidden `<canvas>`, `toDataURL()`s them into an SVG `<feImage href>`, and applies `backdrop-filter: url(#filter)`. The Canvas2D is a one-shot texture BAKE, not animation.
- **Consumers:** `GlassPanel.vue`, `DockGooFilter.vue` (the goo-dock SVG filter).
- **DECISION: KEEP, but flag for a separate GPU-or-CSS-mask successor.** This is glass-DECORATION (the refractive lens), not a viz. The `getContext("2d")` here is a build-a-texture call, the same morally-neutral use as `createImageData`. Forcing it to WebGL2 (render-to-texture → `readPixels` → `toDataURL`) buys NOTHING — it is slower, needs a GL context for a static map, and the displacement profile is already expressed as a CSS-gradient squircle in `W-LENSING`'s `.glass-lens` (`src/styles/glass/`), which is the GPU-free path the lens band moved to. **Recommendation:** the live `.glass-lens` SVG-filter graph (a crossed-gradient `data:` URI, no Canvas2D) likely SUPERSEDES `generateDisplacementMap` already — audit whether `useGlassRenderer.createGlassFilter` still has live consumers or is itself dead (GlassPanel/DockGooFilter may have moved to `.glass-lens`). If dead → DELETE with the rest. If live → it is a glass-decoration concern, NOT in the viz GPU-only mandate's scope; book a `W-LENS-RASTER-PURGE` successor to fold it onto the CSS-gradient squircle.

### 4b. `auroraFallbackGround.ts` `getContext("2d")` (the no-GPU CSS ground)

- **What it is:** `sampleAuroraField` mirrors the shader's static composite CPU-side, then a one-shot `createImageData`/`putImageData`/`toDataURL` bakes it to a `data:` PNG used as a CSS `background-image` for hosts with NEITHER WebGPU NOR WebGL2 (the W-AURORA-SWRASTER certify-grade ground).
- **DECISION: KEEP as the inert no-GPU floor, but it is the "no fallbacks" tension point — make it a CONSCIOUS keep, not a silent one.** The CPU field-sample is the only way to certify a contrast floor in a HEADLESS no-GPU CI (no `--use-gl=angle`), and it never animates (one raster, then parked). Two options:
  - **(i) KEEP as-is** — it is a no-GPU-at-all floor, not a viz path; the mandate's "no fallbacks" is about the live render, and a host with no GPU has no GPU path to offer. The honest answer to "no GPU" is a static image, and a static image needs a raster — Canvas2D `putImageData` is the cheapest correct one (a WebGL2 render-to-texture for a static no-GPU host is a contradiction — the host has no GL).
  - **(ii) Re-express the raster off Canvas2D** — bake the field into a CSS layered-`radial-gradient` stack (the SSR-degrade path already does this) so the no-GPU ground carries ZERO `getContext` anywhere. Lower fidelity, but truly Canvas2D-free.
  - **Recommendation: (i), recorded as a conscious keep.** The CPU field-sample IS the certify mechanism (`tests-visual/aurora-swraster.spec.ts` asserts the mean/per-quadrant luminance band against it); deleting it deletes the headless contrast certification. The `getContext("2d")` here is a `putImageData` texture bake on a host that by definition cannot run a GPU shader — it is the don't-crash floor, categorically distinct from a viz substrate. If the orchestrator insists on a LITERAL zero-`getContext("2d")` repo, take (ii) and accept the fidelity drop + the certification rework.

---

## 5. The DELETE list (the dead Canvas2D — pure removal)

| path | LOC | reason |
|---|---|---|
| `src/composables/glass/canvas2d/useCanvas2D.ts` | 321 | dead substrate, 0 callers |
| `src/composables/glass/canvas2d/resolveCanvasColor.ts` | 95 | dead probe, 0 callers (all consumers left Canvas2D) |
| `src/composables/glass/canvas2d/index.ts` | 16 | the dead barrel |
| `src/subpaths/canvas.ts` | 1 | `export * from canvas2d` — retire the `/canvas` subpath (clean break, no alias — `no-backwards-compat`) |
| `src/api/types-extra.ts` §"Canvas2D lifecycle substrate" | ~10 | the dead public type re-exports (`Canvas2DFrame`/`Handle`/`Options`/`SuspendReason`) |
| `tests/composables/glass/canvas2d/{useCanvas2D,resolveCanvasColor}.test.ts` | — | the tests of the deleted modules |

**Coordinated edits (the export-surface unwind):**
- `src/composables/glass/index.ts` line 42 — drop the `useCanvas2D, useCanvasLifecycle, resolveCanvasColor` re-export.
- `package.json` exports + `typesVersions` — drop the `./canvas` subpath entry (the `proof:subpath-enumeration` count drops by 1; update the CLAUDE.md "72 JS subpath exports" prose-trailing figure).
- `useWebGPUCanvas.ts` / `createCanvasLifecycle.ts` doc-comments — scrub the "the third thin wrapper beside Canvas2D" / "all THREE backends" prose to "the two GPU backends" (doc accuracy, not behavior).
- The `proof:webgl-substrate-single` clause (e) (the Canvas2D single-source detector) — RETIRE the clause + its self-test bite (the module it guards is gone). The WebGL2/WebGPU clauses A-D stay. `proof:gpu-substrate-single` is the surviving superset; re-point any "all three backends" assertion to "the two GPU backends."

This is a **clean-break DELETE** per `feedback_no_backwards_compat` — no alias, no deprecation shim. The `/canvas` subpath had no binary consumer (substrate-without-consumer, J inv-10) so its retirement needs only a MIGRATION.md row + the disposition-register flip (book→retired, `retiredBy: BD.W-GPU-ONLY-SPINE`, successor: `createGpuSubstrate` for a viz / the two GPU backends directly for a lifecycle host).

---

## 6. The migration plan for the (already-done) four — verification, not work

The mandate's four are migrated; the wave's job is to VERIFY + lock, not re-migrate:

1. **fourier-field** — composes `createGpuSubstrate` (`useFourierField.ts` header asserts "carries NO `useCanvas2D` import and NO `getContext("2d")`"). ✓ Verify the gate (`proof:viz-fourier`) stays green post-delete.
2. **constellation** — `useConstellation.ts` composes `createGpuSubstrate` (WGSL instanced-points + GL fallback). The `constellationInteraction.ts:89` Canvas2D comment is STALE prose (the offscreen/PRM freeze now comes from the lifecycle core, not `useCanvas2D`) — scrub it. ✓
3. **dot-flow-field** — `useDotFlowField.ts` composes `createGpuSubstrate`; the Canvas2D point-cloud `createCpuFlowField` is already deleted (the `flow-field.glsl.ts:3-4` comment records the clean break). ✓
4. **aurora ground** — the live viz is GPU (WGSL primary + WebGL2 net); the only `getContext("2d")` is the no-GPU CSS raster ground (§4b). The live render path is already GPU-only. ✓

**Net new work = §3 aurora picker-consolidation + §5 delete + §4 decisions.** The four-viz migration is a checkbox.

---

## 7. The wave + the gate (the executable spine)

**Wave: `BD.W-GPU-ONLY-SPINE`** (viz-arch band, BEFORE the per-viz redevelopment waves — they consume the clean two-backend spine).

- **Builds:** delete §5; consolidate aurora onto `createGpuSubstrate` (§3); decide §4a/§4b (recommend keep-and-flag / conscious-keep); scrub the stale Canvas2D prose; flip the disposition register.
- **Gate `proof:gpu-only-spine`** (device-free, `ci`):
  - G1 — `useCanvas2D.ts` + `canvas2d/` dir + `resolveCanvasColor.ts` are DEFINITION-ABSENT (the no-survivor floor); `src/subpaths/canvas.ts` absent; the `/canvas` package.json export absent.
  - G2 — ZERO `getContext("2d")` in the live VIZ render path (`src/components/custom/*/composables/**` + the shader trees) — a viz `getContext("2d")` reds. (The two §4 utilities are on a NAMED ALLOWLIST with a recorded rationale — `useGlassRenderer` displacement-map + `auroraFallbackGround` no-GPU raster — so a NEW Canvas2D-in-a-viz reds while the two decided edge cases pass; the allowlist is the anti-evasion seam.)
  - G3 — every viz composes `createGpuSubstrate` (the SOLE seam) OR the two GPU backends directly (aurora's swraster pre-check) — no fourth substrate seam; a re-minted Canvas2D substrate reds.
  - G4 — `createCanvasLifecycle` is byte-untouched (the schedule core is sound; the spine deletes a BACKEND, never re-forks the core).
  - G5 — the WebGL2-net policy is RECORDED (the "WebGL2 is an allowed GPU path, not a forbidden fallback" decision is in this doc + the disposition register) + the de-overload of the three "fallback" meanings (§2) — so a future agent cannot silently drop the WebGL2 net reading "no fallbacks" literally.
  - G6 — a self-test bite per clause (a synthetic `getContext("2d")` in a viz composable reds G2; a synthetic re-minted `useCanvas2D` reds G3; an off-allowlist raster reds G2).
- **No `proof:ba-gestalt`** — a backend DELETE changes ZERO live pixels (every viz already paints via the GPU path; the deleted substrate had no consumer). The per-viz redevelopment waves carry the gestalt verdicts.

---

## 8. Summary deltas (for the roster)

- **WebGL2 = allowed GPU path** (not a forbidden fallback) — the mandate's `or` is the permission; both are GPU shaders, only Canvas2D is CPU. KEEP the WebGPU-first/WebGL2 picker.
- **All four named Canvas2D viz are ALREADY migrated** (fourier/constellation/dot-flow/aurora-render are on `createGpuSubstrate`); the migration is a verify-and-lock, not work.
- **DELETE the dead `useCanvas2D` substrate** (321L) + `resolveCanvasColor` (95L) + the `canvas2d/` barrel + the `/canvas` subpath + the api type re-exports — ZERO runtime callers, a clean break (no alias).
- **The two static-raster utilities** (`useGlassRenderer` displacement-map, `auroraFallbackGround` no-GPU ground) are NOT viz substrate — glass-decoration + don't-crash-floor; keep-and-flag / conscious-keep on a named allowlist (or take the literal-zero option in §4 if the orchestrator insists).
- **The ONE wiring change** is aurora onto the picker (so `createGpuSubstrate` is the SOLE substrate seam).
- **Wave `BD.W-GPU-ONLY-SPINE`** + `proof:gpu-only-spine` (G1-G6) lock it; no `proof:ba-gestalt` (zero-pixel delete).
