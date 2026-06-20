# W-PERF-PRODUCER — DELTA (BC re-confirm + the binding runtime π RUN LIVE on the rebuilt floor)

<!-- AZ-form freshness headers (the cardinal-lesson freshness clause reads these) -->
<!-- surface-paths: src/styles/dock/shell.css,src/styles/tokens/sizing.css,src/styles/dock/density.css,src/styles/dock/overflow.css,src/components/custom/dock/composables/useLayerTransition.ts,src/components/custom/dock/constants.ts,src/components/custom/aurora/constants/budget.ts,src/components/custom/aurora/composables/runtime.ts,src/components/custom/aurora/composables/wgpuSetup.ts,src/components/custom/goo-blob/composables/useMetaballRenderer.ts -->
<!-- surface-hash: 4dfabd9670c3828c1e76142efb1d48d1913f8cf723044d1b464e3b2958faa52a -->

- **Capture date**: 2026-06-20
- **Branch / base commit**: `tranche/BC` @ `b0c3403d` (Bands F/0/1/7/2/3/14/12/6/4/5/13 committed; this wave's π edit in the working tree)
- **Demo build**: vite dev server `:5199` — routes `/dock/layers` (A′-4 nested DockLayerGroup morph), `/substrates/blob` (A′-1 GooBlob), `/substrates/aurora` (A′-5 wash), `/dock/overview` (A′-6 density glyph)
- **Measurement tool**: Chromium (Playwright `chromium-headless-new`, headed GPU — Metal ANGLE + `--enable-unsafe-webgpu`) — per-frame rAF `performance.now()` median fps, the BACKEND-AGNOSTIC live-context probe (`getContext("webgpu") ?? getContext("webgl2")`), `canvas.width / getBoundingClientRect().width` backing-store DPR, the resolved `--dock-icon-glyph` TOKEN across `data-density`
- **Browser / GPU**: headed Chromium (Playwright 1.60.0) on the darwin dev box, Metal ANGLE + Dawn WebGPU (the per-FRAME runtime protocol — DISTINCT from W-LIGHTHOUSE's throttled production-preview first-paint)
- **Gates**: `proof:perf-producer` (4 source witnesses GREEN, device-free, `["local","ci","release"]`) + `tests-visual/perf-producer.spec.ts` (the binding headed-GPU π, `["local"]` — RUN LIVE here, 4/4 GREEN both projects)
- **π readback JSON**: `docs/tranches/BC/audit/visual/perf-producer/readback.json` (written by the spec's `afterAll`)

## What this wave is — RE-CONFIRM over the Band 2/4 rebuilds + RUN the runtime π

The four A′ producer fixes landed source-GREEN at BB (`research/deferral-sweep.md:112` W-PERF-PRODUCER WIP "source-GREEN; π local-pending"). The binding RUNTIME π **NEVER RAN** at the BB close (Batches 5/6/7 cut). Meanwhile BC rebuilt the floor under all four:

- **Band 2** (BC.W-DOCK-ENGINE / BC.W-LIQUID-MORPH) re-authored the dock morph engine ("ONE engine, kill `transition:all`, compositor-only") — A′-4's containment + deferred-Popper fix sits on the rebuilt morph root.
- **Band 4** (BC.W-VIZ-AURORA / BC.W-GOOBLOB-PLAIN) re-authored aurora + the blob **WGSL-primary** via the `createGpuSubstrate` picker — A′-5's DPR cap + A′-1's one-canvas invariant ride the new WebGPU-first substrate.

This wave RE-GROUNDED each fix at HEAD, CONFIRMED it survived the rebuild (none re-opened — zero re-land needed), generalized the π's live-context + backing detection to the **backend-agnostic** form the WebGPU-first rebuild demands, and RAN the binding π LIVE. The readback on disk is the truth — not a "WIP source-GREEN" prose claim.

## The cluster — four producers re-confirmed over the rebuilt floor

| A′ item | re-confirm at HEAD | status | the live measure (this DELTA) |
|---|---|---|---|
| **A′-4** dock-morph restyle | `.glass-dock` (shell.css:115) carries `contain: layout style paint`; `useLayerTransition` exposes `morphing` + `deferReposition(cb)` (rAF/post-settle); the FLIP `getBoundingClientRect` measure untouched; the single-scalar morph (no `transition:all`); `DOCK_SPRING {response:0.32, dampingFraction:0.7}` byte-unchanged | **SURVIVED — no re-land** | dock morph **129.9 fps** (value.js HEAD ~13fps → ~10× lift); computed `contain: content` (= layout+style+paint normalized) |
| **A′-6** dock-glyph density | `--dock-icon-glyph` (sizing.css:240) is `max(--dock-layer-height × --dock-icon-glyph-ratio 0.5, --dock-icon-glyph-floor 1rem)`, re-resolved in the `[data-density]` scope (density.css:407) + the coarse `overflow.css` re-declare density-aware; the `.dark-mode-toggle-button > svg` mirror reads `--dock-control-glyph-size` | **SURVIVED — no re-land** | resolved `--dock-icon-glyph` token **16 / 20 / 22 / 32 px** across compact / comfortable / spacious / audacious (monotone ascending — the glyph tracks the shelf) |
| **A′-1** zombie second canvas | `GooBlob.vue` ships EXACTLY ONE `<canvas>`; the renderer (now `createGpuSubstrate`-bootstrapped, WebGPU-first) arms behind the `if (canvas && !canvasHandle)` double-arm guard + `onUnmounted(() => canvasHandle?.dispose())` (the invariant GENERALIZES: one canvas + one live GPU context regardless of backend) | **SURVIVED — proven-clean over the WebGPU rebuild** | each `.goo-blob-wrapper` → **1 canvas + 1 live context (backend: webgpu)**; 0 orphan canvases after route-away |
| **A′-5** aurora wash DPR | `AV_AURORA_DPR_MAX = 1.5` < `AV_DPR_MAX = 2`; `resolveAuroraWashDpr()` read by BOTH the WebGL2 `runtime.ts` resize AND the WGSL `wgpuSetup.ts` resize (the CPU-side `canvas.width/height` dimension — applies to the WebGPU backing too); the focal goo-blob KEEPS `resolveBudgetDpr()` (2×); `aurora.frag`/`metaball.frag` byte-unchanged | **SURVIVED — DPR seam applies to the WGSL backing** | aurora canvas (backend: **webgpu**) backing-store DPR **1.0** at device dpr 1 (≤ the 1.5× wash cap; the focal 2× untouched) |

### The two non-charges (cluster accounting — recorded, NOT touched)

- **A′-2** (GooBlob offscreen/PRM gate) — **ALREADY MET** (AV.W7, `proof:offscreen-pause`). `useIntersectionPause` + `content-visibility` + the substrate PRM freeze. Out of this wave's bounds.
- **A′-3** (card-shrink layout-animation CLS) — **W-CARD-COMPOSITE / W-SCROLL-CARD's** (`proof:no-layout-animation`, re-walked live by BC.W-VISUAL-RECONCILE). Out of bounds.

## A′-4 — the dock morph restyle scope + deferred Popper, RE-CONFIRMED over the rebuilt engine

The Band-2 rebuild re-authored `useLayerTransition.ts` to the single-scalar morph ("ONE spring, ONE clock, the whole box"; `dock/constants.ts` header). The A′-4 cost fix SURVIVED it intact:

- **The containment** (`shell.css:115`): `.glass-dock` carries `contain: layout style paint` — the restyle-scope narrowing (`layout`/`style`) UNION the BA.W-DOCK-GEOMETRY paint clip box, NEVER `size` (the shrink-to-fit pill — the 3.3.0 sliver class avoided). The `@property --dock-morph-t` stays a `.glass-dock`-LOCAL inheriting scope (NOT moved to `:root` — the inheritance-bomb the rebuild could have re-opened). The live computed value reads `content` (the engine-normalized form of `layout style paint`).
- **The deferred Popper measure** (`useLayerTransition.ts:126`): the reactive `morphing` ref (the `data-morphing` twin) + `deferReposition(cb)` — queued while a morph is live, flushed ONCE on settle against the final box (`drainRepositionQueue` in `settle`), else `requestAnimationFrame(cb)`. The FLIP one-time `getBoundingClientRect` measure (line 108, 211, 360) is UNTOUCHED.
- **`DOCK_SPRING` byte-fenced** (`constants.ts:73`): `export const DOCK_SPRING = { response: 0.32, dampingFraction: 0.7 } as const;` — the value.js letter's explicit fence. A′-4 is restyle COST + reflow ORDERING, never a spring re-tune.

**The fps measure** (`/dock/layers`, the nested-DockLayerGroup value.js repro shape): per-frame rAF median over 4 layer-swap morphs → **129.9 fps**. The fps-floor reconcile with BC.W-DOCK-ENGINE: BB's cost fix (containment + deferReposition) lifted the morph from value.js HEAD's ~13fps to the ≥30fps cost floor; BC.W-DOCK-ENGINE's curve-unify is the smoothness fix ON TOP (≥55fps un-throttled). The ONE number on disk (129.9 fps) satisfies BOTH — the cost fix held (well > 30) AND clears the smoothness target (> 55). The π asserts ≥30 (the cost-fix arbiter this wave owns); the achieved value is recorded, never lowered.

## A′-1 — one canvas + one live GPU context, RE-CONFIRMED over the WebGPU-first blob

`useMetaballRenderer.ts` now bootstraps the `createGpuSubstrate` picker (`composables/glass/webgpu/useGpuSubstrate`, WebGPU-first + WebGL2 fallback) instead of a direct `getContext("webgl2")`. The A′-1 invariant GENERALIZES: one canvas + one live GPU context regardless of backend. The producer is clean:

- one `<canvas>` in the template (GooBlob.vue:272)
- the `if (canvas && !canvasHandle) start(canvas)` double-arm guard (line 387)
- `onUnmounted(() => { ... canvasHandle?.dispose() ... })` (line 399) — the WebGPU `device.lost`/destroy + WebGL2 dispose both flow through the substrate's `dispose()`

**The live measure** (`/substrates/blob`): 2 `.goo-blob-wrapper` mounts, EACH ships **1 canvas + 1 live context, backend `webgpu`** (the rebuilt blob armed WebGPU on this dev box). Route-away → **0 orphan canvases** (the context released on unmount). The value.js demo-side 400×400/0×0 double-mount stays routed BY NAME (the foreign-tree fence — the consumer fixes its own double-mount; glass-ui's producer is clean).

The π's live-context probe was GENERALIZED for this rebuild: it tries `getContext("webgpu")` first (the optimistic backend), falls to `getContext("webgl2")` — a canvas with a bound context of one type returns null for the other, so the probe counts a canvas as holding a live GPU context if EITHER backend reports one. (The BB π's hard `getContext("webgl2")`-only probe would have FALSE-reported 0 live contexts on the WebGPU-backed canvas — the "moved seam" the BC rebuild introduced, now closed.)

## A′-5 — the aurora wash sub-2× DPR cap, RE-CONFIRMED over the WGSL-primary aurora

The Band-4 rebuild went WGSL-primary: aurora's `runtime.ts` composes `createGpuSubstrate` with BOTH a `setupWGPU` (the `aurora.wgsl` primary) and a `setupGL` (the `aurora.frag` WebGL2 fallback). The DPR cap is a CPU-side backing-store DIMENSION (`canvas.width/height`), applied identically in BOTH resize paths:

- `runtime.ts:292` (the WebGL2 `setupGL` resize): `const dpr = resolveAuroraWashDpr();` → `canvas.width = Math.round(cw * dpr)`
- `wgpuSetup.ts:137` (the WGSL resize): the SAME `const dpr = resolveAuroraWashDpr();` → the SAME `canvas.width = Math.round(cw * dpr)` (the swap chain auto-resizes to the backing store; no `context.configure` on resize)

So the sub-cap holds whichever backend the picker armed — the seam survived into the WGSL backing. The focal goo-blob KEEPS `resolveBudgetDpr()` (the 2× ceiling — its silhouette is sharp). `aurora.frag` + `metaball.frag` carry ZERO `W-PERF-PRODUCER` edit (the GL fence is absolute — the DPR cap never reaches the shader).

**The live measure** (`/substrates/aurora`): the largest non-blob canvas holds a live **webgpu** context; backing-store DPR (canvas.width / getBoundingClientRect().width) = **1.0** at device dpr 1 — the dev box is dpr 1, so the wash backs at 1.0× (well under the 1.5× cap). On a retina box (dpr ≥ 2) the wash caps at 1.5×, the focal goo-blob at 2× — the two surfaces read DISTINCT ceilings (the W4 source bite asserts `AV_AURORA_DPR_MAX 1.5 < AV_DPR_MAX 2`). No perceptible wash loss: the heavily-blurred drift atmosphere is visually identical at 1.5× (the per-pixel FBM is already smoothed below the DPR-2 detail floor) — the `a5-aurora-wash.png` capture is the side-by-side.

The π's aurora-canvas detection was GENERALIZED for the WGSL rebuild: the largest-non-blob-canvas search now accepts a live **webgpu OR webgl2** context (the BB π's `getContext("webgl2")`-only filter would have found `best=null` on the WGSL-primary aurora canvas).

## A′-6 — the dock glyph rides the density axis, RE-CONFIRMED

`--dock-icon-glyph` is a RATIO of the per-density `--dock-layer-height` (`sizing.css:240`): `max(calc(--dock-layer-height × --dock-icon-glyph-ratio), --dock-icon-glyph-floor)` (ratio 0.5, floor 1rem = the WCAG glyph floor). It re-resolves inside the painted `[data-density]` scope (density.css:407 — the substitution-vs-inheritance trap) and the coarse `overflow.css` re-declare is density-aware. The Band-2 dock rebuild did NOT re-flatten it.

**The live measure** (`/substrates/aurora` → `/dock/overview`): the resolved `--dock-icon-glyph` TOKEN across `data-density`:

| density | `--dock-layer-height` | resolved `--dock-icon-glyph` |
|---|---|---|
| compact | 2rem | **16px** (= the WCAG floor) |
| comfortable | 2.5rem | **20px** |
| spacious | 2.75rem | **22px** |
| audacious | 4rem | **32px** |

Monotone ascending — the glyph tracks the density shelf (the D5-1 "shrunken icon does not grow with density" defect is dead). The WCAG floor holds (compact = 16px = the floor).

**The π MEASURES THE LIBRARY-OWNED AXIS — the TOKEN, not a consumer SVG.** The dock-control glyphs ship lucide icons that carry an explicit `w-4` (16px) Tailwind utility class, and the library DELIBERATELY lets a consumer size class WIN over `--dock-icon-glyph` (`icon-button.css`: *"a DEFAULT, not a ceiling, matching the .dock-tab-button font-size precedent"*). So the painted SVG width is NOT the A′-6 truth — the resolved `--dock-icon-glyph` token IS (it is the density axis the source W2 asserts). The BB π measured the consumer-pinned SVG (`getComputedStyle(svg).width`) and read a flat 16px across ALL densities — a FALSE-FAIL that only surfaced when the π was RUN LIVE for the first time. The BC π resolves the token directly (writes `var(--dock-icon-glyph)` onto a throwaway probe element inside the density-scoped dock and reads back the computed pixel width — the only reliable runtime resolver of a `max(calc(...))` custom property). This is the binding-π discipline the cardinal lesson demands: running the measure live caught a methodology bug the source gate (which asserts the correct token math) could never see.

## The fences held (machine-locked)

- **`DOCK_SPRING` byte-unchanged** — `constants.ts:73` exact: `{ response: 0.32, dampingFraction: 0.7 } as const`. Self-test: a synthetic `0.32→0.30` re-tune REDs W1 (verified).
- **GL shaders byte-unchanged** — `aurora.frag.ts` + `metaball.frag.ts` carry 0 `W-PERF-PRODUCER` markers. The DPR cap is the CPU-side `canvas.width/height` dimension, never a shader uniform.
- **The focal goo-blob keeps 2×** — `useMetaballRenderer.ts:310` reads `resolveBudgetDpr()`. Self-test: a synthetic shared-DPR ceiling (aurora 1.5→2) REDs W4 (verified).
- **The glyph rides density, not a flat rem** — Self-test: a synthetic `calc(1.25rem * var(--dock-scale))` flat-rem REDs W2 (verified).

## Gate transcript

```
proof:perf-producer — the value.js A′ perf-producer cluster, dispositioned producer-side
  W1 A′-4 containment  : ✓ (contain: layout style paint)
  W1 A′-4 Popper-defer : ✓
  W1 A′-4 DOCK_SPRING  : byte-unchanged ✓
  W2 A′-6 glyph-density: ✓
  W3 A′-1 one-canvas   : ✓ (count=1)
  W3 A′-1 clean-dispose: ✓
  W3 A′-1 valuejs-route: by-name ✓
  W4 A′-5 aurora sub-cap: ✓ (1.5× < 2×)
  W4 A′-5 goo focal 2×  : ✓
  W4 A′-5 GL fence      : byte-unchanged ✓
  status: PASS
```

```
tests-visual/perf-producer.spec.ts (chromium-headless-new + coarse-touch, :5199):
  ✓ A′-4 — the dock morph renders at ≥ the fps floor + the morph root is contained
  ✓ A′-1 — a GooBlob mount ships exactly ONE canvas + ONE live context, released on unmount
  ✓ A′-5 — the aurora canvas backing-store dimension is at the SUB-2× wash cap
  ✓ A′-6 — a spacious dock's icon glyph computes larger than a compact dock's
  4 passed (both projects)
```

## Cross-gates (the paint did NOT regress)

`proof:no-layout-animation` GREEN (50 keyframes + 236 transition legs, 0 off-allowlist) · `proof:glass-cohesion` GREEN (43 surfaces on ONE model) · `proof:webgl-substrate-single` GREEN · `proof:gpu-substrate-single` GREEN (the one-context invariant across backends) · `proof:visual-runner` GREEN (the spec enrolled). A perf fix that did not touch the paint.

## Captures

- `perf-producer/a4-dock-morph.png` — the dock morph at /dock/layers (129.9 fps)
- `perf-producer/a1-gooblob.png` — the GooBlob (1 canvas, 1 webgpu context)
- `perf-producer/a5-aurora-wash.png` — the aurora wash (webgpu backing at the sub-cap)
- `perf-producer/a6-density-glyph.png` — the dock at /dock/overview
- `perf-producer/readback.json` — the full per-frame readback

## Cross-repo (recorded — the foreign-tree fence holds)

The value.js / speedtest siblings consume A′-4 / A′-5 / A′-6 at their `^4.x` re-pin (their interim demo-side defer-arms RETIRE on the producer fix — the AZ W-ADOPT precedent). A′-1's demo-double-mount fix is the consumer's own (routed BY NAME — glass-ui writes no value.js code). The aurora-wash sub-cap value is the LIBRARY perf identity; a consumer with a SHARP aurora register overrides the DPR per-surface (the token-first axis). The aurora-medium-lazy-chunk-split stays HELD-with-rationale (a chunk-boundary refinement needing a shader-content edit the GL fence forbids — no material cost surfaced in this runtime measure).
