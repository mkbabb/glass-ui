# BD viz — the GPU-only / no-Canvas2D / no-fallback conflict audit

**Mandate (binding):** every web facility renders via **WebGPU or WebGL2** — ZERO Canvas2D (`getContext("2d")`), **NO fallbacks**, no legacy, no quick workarounds. Idiomatic, gestalt, architectural-transposition for elegance/simplicity/performance.

**Scope note (important):** the BC tranche already migrated the viz suite OFF the Canvas2D *render path* — fourier-field, constellation, dot-flow-field, dot-matrix, goo-dot-matrix, paper-grid, concentric, aurora, blob all render via `useGpuSubstrate` (WebGPU-first) or `useWebGLCanvas`/WGSL today; their Canvas2D bodies are already deleted (the README/comment mentions of "Canvas2D … GONE" are stale prose, not live code). So the conflict surface is now narrower than the prompt's premise but DIFFERENT in kind: **the residual Canvas2D substrate that still ships unconsumed, two live data-texture `getContext("2d")` paint paths, and — the larger conflict — the pervasive "WebGL2 *fallback*" architecture that the new "NO fallbacks" clause forbids.** Each is listed below with a delete + migration target.

The BD union (`docs/tranches/BD/union/`) carries NO wave addressing this — confirmed: the only union waves matching `canvas2d|fallback|getContext|webgl` are incidental (Safari stacking, filter floor, maps card, dock constellation). **This is genuinely new BD scope.**

---

## A. LIVE Canvas2D paint paths — `getContext("2d")` that actually runs (DELETE)

These are the only `getContext("2d")` sites that execute at runtime in shipped code.

### A1. `auroraFallbackGround.ts` — the software-raster luminance ground (`src/components/custom/aurora/composables/auroraFallbackGround.ts:346`)
- **What:** a low-res `<canvas>` 2D context paints a downsampled `sampleAuroraField` raster, exports a `data:` URI, CSS-upscales it as the static aurora ground on the `"css"` substrate (headless / software-raster / GPU-blocklisted). Wired in `Aurora.vue` (`faithfulGround` computed, `auroraFallbackGround(props.config)`).
- **Conflict:** a Canvas2D raster, AND it IS the fallback ("the CSS/2D fallback the brief names") the mandate forbids.
- **DELETE:** `auroraFallbackGround.ts` whole + the `Aurora.vue` `faithfulGround`/`resolvedRenderMode`/`renderMode` `"css"` plumbing + `paletteToCssGradient` placeholder dependence.
- **Migration target:** aurora renders WebGPU-first / WebGL2 always (the `useGpuSubstrate` try-WebGPU-then-WebGL2 picker the other viz already use). NO static ground. The W-AURORA-SWRASTER certification harness (speedtest headless AA contrast) must move to a real-GPU capture or be retired — see §C2 (the harness reason that justified this path no longer survives the mandate).

### A2. `useGlassRenderer.ts` — the refraction displacement-map texture (`src/composables/glass/useGlassRenderer.ts:55,98`)
- **What:** `generateDisplacementMap` / `generateNormalMap` paint an `ImageData` on a 2D canvas to encode a Snell-law RGB displacement map, consumed by `GlassPanel.vue` + `dock/DockGooFilter.vue` as the `feDisplacementMap` source for the `backdrop-filter: url(#…)` glass-lens.
- **Nuance:** this is a one-shot CPU **data-texture bake**, not a per-frame render loop, and feeds an SVG filter, not a `<canvas>` surface. It is the weakest conflict (arguably "texture authoring," not "a viz facility rendering via Canvas2D").
- **DECISION for the wave:** the mandate says ZERO `getContext("2d")` with no exception, so it must go. **Migration target:** encode the displacement/normal map procedurally without a 2D context — either (a) author the squircle bevel-profile map as a static data-URI / SVG gradient (the W-LENSING crossed-gradient encoding already exists in CSS — `f(x)=⁴√(1-(1-x)⁴)` as a crossed R/G gradient), eliminating the canvas bake entirely; or (b) bake it in a WebGL2/WebGPU off-screen render-to-texture pass. Option (a) is the elegant transposition (the lens displacement is already expressible as pure CSS gradients per W-LENSING) and is preferred.

---

## B. SHIPPED-BUT-UNCONSUMED Canvas2D substrate — `useCanvas2D` (DELETE WHOLESALE)

`useCanvas2D` / `createCanvas2D` has **ZERO live call sites** in `src/` (grep for `createCanvas2D(`/`useCanvas2D(` outside the substrate dir + comments = empty). It survives only as a published subpath + barrel export + its gates. Per the no-legacy mandate it is dead weight to remove.

| Artefact | Path | Action |
|---|---|---|
| The substrate | `src/composables/glass/canvas2d/useCanvas2D.ts` | DELETE |
| The color resolver | `src/composables/glass/canvas2d/resolveCanvasColor.ts` (only consumer: the barrel re-export) | DELETE |
| The dir barrel | `src/composables/glass/canvas2d/index.ts` | DELETE |
| The subpath | `src/subpaths/canvas.ts` (`export * from "../composables/glass/canvas2d"`) + `package.json` `/canvas` export entry | DELETE (clean break, no alias — MIGRATION row) |
| Barrel exports | `src/composables/glass/index.ts:42-48` (`useCanvas2D`, `useCanvasLifecycle`, `resolveCanvasColor`, `Canvas2DFrame/Handle/Options/SuspendReason` types) + the AW.W17 comment block | DELETE |
| `/api` types | `src/api/index.ts` + `src/api/types-extra.ts` Canvas2D type re-exports | PURGE |

**Gates to retire** (registered in `scripts/gates.mjs`): `proof:canvas2d-substrate` (`scripts/proof-canvas2d-substrate.mjs`-equiv), `proof:resolve-canvas-color`. **Gate to re-point, NOT retire:** `proof:webgl-substrate-single` (`scripts/proof-webgl-substrate-single.mjs`) — its clause-e ("`useCanvas2D` composes the leaf AND carries no inline fork", the composition+fork self-test bite) must drop the Canvas2D arm; the WebGL2/WebGPU clauses stay GREEN. `proof:constellation-substrate-single` (`scripts/proof-constellation-substrate-single.mjs`) asserts `useCanvas2D exports createCanvas2D…` — re-point its SUBSTRATE-EXISTS assert onto `useGpuSubstrate`/`useWebGLCanvas` (constellation already renders GL, the gate text is stale).

---

## C. THE "WebGL2 fallback" ARCHITECTURE — the larger conflict ("NO fallbacks")

This is the heart of the mandate's bite. The BC design is explicitly **WebGPU-first with a WebGL2 fallback net**. The new clause is "WebGPU OR WebGL2 … NO fallbacks" — read strictly, the *fallback layering* itself (two `setup` callbacks, a try-then-rebuild picker, "the invisible don't-crash-to-black insurance") is legacy to remove. There are two defensible readings; the wave must pick one (flagged for the orchestrator):

- **Reading 1 (literal — "no fallbacks at all"):** each viz commits to ONE backend. WebGPU where June-2026 Baseline allows (Chrome 113+/Safari 26+/FF 141+), else WebGL2 — but as a **single chosen backend per device, not a runtime fallback chain.** The picker becomes a pure feature-detect *selector* (no try-rebuild, no dual `setup`), or every viz standardizes on WebGL2 (universal, no dual authoring) OR WebGPU (cutting the ~5-10% tail). This kills the "fallback" language and the dual-setup authoring burden.
- **Reading 2 (charitable — "no Canvas2D / no CSS fallback"):** WebGPU↔WebGL2 is "two GPU backends," not a "fallback to a lesser tier"; the forbidden fallbacks are the Canvas2D/CSS-gradient tiers (§A, §C2). Keep `useGpuSubstrate`'s WebGPU→WebGL2 net, delete only the sub-GPU tiers.

**Recommendation:** Reading 2 for the GPU↔GPU net (it is genuinely no-crash insurance, not a degrade), Reading 1's spirit for the language — purge every "fallback / don't-crash-to-black / graceful path / ~5-10% tail" framing and the sub-GPU tiers. The decisive deletes either reading shares:

### C1. The software-raster guard + the `"css"`/`"webgl"`/`"auto"` render-mode machine (DELETE)
- `src/components/custom/aurora/constants/renderMode.ts` — `resolveRenderMode`, `isSoftwareWebGLRenderer`, `AuroraRenderMode` (`"webgl"|"css"|"auto"`), `ResolveRenderModeOptions.forceWebGLUnderSoftwareRaster`. The entire "software renderer → `"css"` static ground" guard (BB.W-AURORA-SWRASTER) conflicts with "NO fallbacks."
- **Migration target:** aurora always arms `useGpuSubstrate` (WGSL + GL setup); the `useGpuSubstrate` try-WebGPU-then-WebGL2 picker is its own no-black insurance (keep under Reading 2). The `renderMode` prop on `Aurora.vue` (`webgl|css|auto`) RETIRES (clean break, no alias). `probeWebGL2Renderer` stays (it's the single substrate bootstrap), but the *consumer* `isSoftwareWebGLRenderer` goes.
- **Gate:** `proof:aurora-swraster` (`scripts/proof-aurora-swraster.mjs`) RETIRES with the path it locks; `tests-visual/aurora-swraster.spec.ts` deletes.

### C2. The W-AURORA-SWRASTER certification rationale (RESOLVE)
The whole §A1+§C1 machinery exists to let **speedtest's headless CI certify text-on-aurora AA contrast without a real GPU.** The mandate forbids the mechanism, so the cross-repo contract must move: the certification migrates to a real-GPU capture (the W-REFLECT-style Metal-GPU live capture the tranche already uses for binding π), or speedtest's headless AA floor is re-derived from the palette stops directly (no rendered ground). **This is a cross-repo coordination ask** (foreign-tree fence — speedtest's edit, not ours) — book it to a BD cross-repo asks relay.

### C3. The per-viz "WebGL2 fallback" prose + dual-setup language (RECONCILE / re-author)
Every migrated viz carries "the WebGL2 fallback" framing in code comments, READMEs, and CLAUDE.md. Under either reading the *language* must change from "fallback" to "WebGL2 backend" (the GPU↔GPU pair is co-equal, not a degrade). Files: `useDotFlowField.ts`/`useFlowParticles.ts`/`flow-field.glsl.ts`, `useDotMatrix.ts`/`useDotSphere.ts`, `useGooDotMatrix.ts`, the concentric/paper-grid GL setups, `useGpuSubstrate.ts`'s own header ("the INVISIBLE don't-crash-to-black insurance for the ~5-10% tail"). Plus the PROCEDURAL-SUITE.md "parity status `degraded`" rows. **No code-path delete here under Reading 2 — a doc/comment reconcile + the `WebGL2 fallback`→`WebGL2 backend` rename.** Under Reading 1, the dual-`setup` authoring + the try-rebuild picker collapse to a single selected backend.

---

## D. CLAUDE.md / precept language that CONFLICTS (reconcile at the BD close)

- §"The Canvas2D substrate is single-source over the same leaf (BB.W-CANVAS-UNIFY)" — **whole section RETIRES** (the substrate it documents is deleted, §B).
- §"The software-raster guard + the luminance-faithful headless fallback (BB.W-AURORA-SWRASTER)" — **RETIRES** (§A1/§C1/§C2).
- §"The WebGPU substrate is the THIRD thin backend… the WebGL2 fallback is NOT retired — it is the graceful path for the ~5-10% tail" — **re-author** ("graceful path"/"~5-10% tail"/"fallback" → "co-equal WebGL2 backend"); under Reading 1, "the THIRD thin backend" drops to TWO (WebGPU + WebGL2; Canvas2D gone).
- §"#### The Canvas2D substrate is single-source" structure-list line + the `useCanvas2D` mention in §Structure `glass/` tree — **purge.**
- Conventions / `color-radius.css:176-227` — the "§5c CONSTELLATION — Canvas2D proximity-graph lattice" + "Canvas2D silently REJECTS light-dark()" comments are stale (constellation is GL); **purge the Canvas2D-leak commentary.**
- `feedback_live_pi_oklab_paint_arm` MEMORY + any "Canvas2D fillStyle" notes — incidental, leave (not src).

---

## E. Files-touched manifest (delete / migrate / reconcile)

**DELETE:** `canvas2d/{useCanvas2D,resolveCanvasColor,index}.ts` · `subpaths/canvas.ts` · `aurora/composables/auroraFallbackGround.ts` · `aurora/constants/renderMode.ts` · `proof-canvas2d-substrate.mjs` · `proof-aurora-swraster.mjs` (+ gate rows) · `tests-visual/aurora-swraster.spec.ts` · the `/canvas` package.json export.
**MIGRATE:** `useGlassRenderer.ts` (displacement map → CSS-gradient / RTT encoding, §A2) · `Aurora.vue` (drop `renderMode`/`css`/`faithfulGround`, always GPU) · `glass/index.ts` (purge Canvas2D barrel block) · `api/{index,types-extra}.ts` (purge Canvas2D types) · `proof-webgl-substrate-single.mjs` + `proof-constellation-substrate-single.mjs` (drop Canvas2D arms, re-point).
**RECONCILE (doc/comment):** the per-viz "fallback"→"backend" rename across the 6 GPU viz + `useGpuSubstrate.ts` header + PROCEDURAL-SUITE.md + the CLAUDE.md sections in §D + `color-radius.css` comments.
**KEEP (untouched, mandate-clean):** `createCanvasLifecycle.ts` (backend-agnostic core — no `getContext("2d")`, survives) · `useWebGLCanvas.ts` · `useWebGPUCanvas.ts` · `useGpuSubstrate.ts` machinery (Reading 2) · `watercolor-dot` (deliberate pure-CSS/SVG counterexample, NO canvas of any kind — not a conflict).

## F. Open decisions for the orchestrator
1. **Reading 1 vs 2** on the WebGPU↔WebGL2 net (§C) — single-backend selector vs keep-the-GPU-net. Recommend Reading 2 for the net + Reading 1's language purge.
2. **`useGlassRenderer` displacement bake** (§A2) — CSS-gradient encoding (preferred) vs WebGL2 RTT vs treat-as-texture-authoring-exempt.
3. **W-AURORA-SWRASTER certification** (§C2) — real-GPU capture vs palette-derived floor; cross-repo ask to speedtest.
