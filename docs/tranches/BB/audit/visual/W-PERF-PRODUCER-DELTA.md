# W-PERF-PRODUCER — DELTA (the value.js A′ perf-producer cluster, dispositioned producer-side)

<!-- AZ-form freshness headers (the cardinal-lesson freshness clause reads these) -->
<!-- surface-paths: src/styles/dock/shell.css,src/styles/tokens/offsets-sizing.css,src/styles/dock/density.css,src/styles/dock/overflow.css,src/components/custom/dock/composables/useLayerTransition.ts,src/components/custom/aurora/constants/budget.ts,src/components/custom/aurora/composables/runtime.ts -->
<!-- surface-hash: 52812f289e220c9d10f636faa4fb1d5d0977cc9ec857c77a43f1938e1e5cf66e -->
- **Capture date**: 2026-06-17
- **Branch / base commit**: `tranche/BB` @ `bdbcd479` (Batch-2 HEAD; this wave's edits in the working tree)
- **Demo build**: vite dev server `:5199` — routes `/dock/layers` (A′-4 nested DockLayerGroup morph), `/substrates/blob` (A′-1 GooBlob), `/substrates/aurora` (A′-5 wash), `/dock/overview` (A′-6 density glyph)
- **Measurement tool**: Chromium (Playwright, headed GPU) — per-frame rAF `performance.now()` median fps, `canvas.getContext("webgl2")` live-context count, `canvas.width / getBoundingClientRect().width` backing-store DPR, `getComputedStyle(svg).width` across `data-density`
- **Browser / GPU**: headed Chromium on the dev box (the per-FRAME runtime protocol — DISTINCT from W-LIGHTHOUSE's throttled production-preview first-paint)
- **Gates**: `proof:perf-producer` (born-RED 4 witnesses → GREEN, device-free SOURCE, `["ci"]`) + `tests-visual/perf-producer.spec.ts` (the binding headed-GPU π, `["local"]`)
- **π readback JSON**: `docs/tranches/BB/audit/visual/perf-producer/readback.json` (written by the spec's `afterAll`)

## The cluster — four producers, each dispositioned producer-side (the no-silent-drop close)

The value.js N2 letter's S2 addendum (2026-06-12) named the A′ perf-producer cluster — A′-1, A′-4, A′-5, A′-6 — and BA NEVER dispositioned it (the audit's no-silent-drop violation, BB.md §3). This wave closes the violation: each ask gets a NAMED, machine-locked disposition (built where the producer owns the fix, proven-clean-plus-routed where the producer is already correct).

| A′ item | mechanism (value.js trace) | disposition | the fix |
|---|---|---|---|
| **A′-4** dock-morph restyle | each `--dock-morph-t` write recomputes the 10-selector inheriting `calc()` group → ~13fps/~900ms; the layer swap forces a ~40ms reka Popper reflow inside the Vue flush | **BUILT** | `.glass-dock` carries `contain: layout style paint` (the restyle-scope narrowing); `useLayerTransition` exposes `morphing` + `deferReposition(cb)` (the Popper re-position deferred off the synchronous flush). `DOCK_SPRING` byte-fenced. |
| **A′-6** dock-glyph density | `density="spacious"` grows the shelf but not the glyph (the glyph rode `--dock-scale`, NOT the per-density `--dock-layer-height`) | **BUILT** | `--dock-icon-glyph` is a RATIO of `--dock-layer-height` (`--dock-icon-glyph-ratio` 0.5 + the WCAG `--dock-icon-glyph-floor` 1rem), re-resolved inside the painted `[data-density]` scope + the coarse overflow.css re-declare made density-aware. |
| **A′-1** zombie second canvas | one mount → two `<canvas>`, a live 358×358 AND a 400×400/0×0 holding a live WebGL2 context + a RAF loop | **PROVEN-CLEAN + machine-locked + ROUTED BY NAME** | the producer ships EXACTLY ONE `<canvas>` + the `!canvasHandle` double-arm guard + `onUnmounted` dispose — CLEAN. The value.js demo-side double-mount (the 400×400/0×0 zombie) is ROUTED to value.js BY NAME (see §value.js below). |
| **A′-5** aurora wash DPR | the decorative blurred wash backs at full-viewport DPR×2 (~2880×1800, ~21.8MB) where 1–1.5× is indistinguishable on a drift background | **BUILT** | `AV_AURORA_DPR_MAX = 1.5` minted < `AV_DPR_MAX = 2` + `resolveAuroraWashDpr()`; aurora `runtime.ts` reads the sub-cap; the focal goo-blob KEEPS `resolveBudgetDpr()` (2×). `aurora.frag`/`metaball.frag` byte-fenced. |

### The two non-charges (cluster accounting — recorded, NOT touched)

- **A′-2** (GooBlob visibility/PRM gate) — **ALREADY MET** (AV.W7). GooBlob composes `useIntersectionPause` + `content-visibility: auto` + the `useWebGLCanvas` substrate PRM freeze (gated `proof:offscreen-pause`). This wave does NOT touch it.
- **A′-3** (card-shrink layout-animation CLS) — **W-SCROLL-CARD/W-CARD-COMPOSITE's** (landed, `proof:no-layout-animation`). OUT of this wave's bounds.

## A′-4 — the dock morph restyle scope-narrowed (the containment + the deferred Popper measure)

**The containment.** The per-frame `--dock-morph-t` scalar write recomputes the inheriting `calc()` group across the dock subtree (dock.css's 10-selector `:where()` consumers). `.glass-dock` already carried `contain: paint` (the BA.W-DOCK-GEOMETRY clip box); this wave adds the `layout` + `style` axes — `contain: layout style paint` — so a scalar write recomputes layout/style WITHIN the dock subtree, not up the document. The `size`/`inline-size` axis is **DELIBERATELY excluded** (it would re-introduce the 3.3.0 sliver regression — the free-floating dock must stay shrink-to-fit; `container-type: inline-size` carries `inline-size` ONLY on the opt-in `containerName` host). The morph-axis `overflow: clip` reveal aperture + the `.glass-dock-frame` rail-escape are unaffected (`layout`/`style` containment scopes RECALC, not a paint clip beyond the already-present `paint` axis).

**The deferred Popper measure.** A floating dock consumer (a Select/Dropdown anchored to a dock trigger) re-positions synchronously inside the Vue flush that runs the morph's first frames (the ~40ms floating-ui reflow). `useLayerTransition` now exposes a reactive `morphing` flag (the twin of the `data-morphing` attr) + a `deferReposition(cb)` helper: while a morph is in flight the passed reka re-position is QUEUED and flushed ONCE on settle (against the final box); when no morph is live it runs on the next rAF (still off the synchronous flush). The FLIP one-time `getBoundingClientRect` measure is UNTOUCHED (the value.js letter fences the FLIP primitive). `DOCK_SPRING {response:0.32, dampingFraction:0.7}` is byte-fenced — this is restyle COST + reflow ORDERING, never a spring re-tune (the gate's bite asserts the byte form).

**π readback (A′-4):** `/dock/layers`, the `.glass-dock` computes `contain: layout style paint` live, and the morph median fps clears the ≥30fps floor (pinned above the value.js ~13fps HEAD baseline; the achieved number is recorded in `readback.json` `a4_fps`, never a lowered bar).

## A′-6 — the dock glyph rides the density cascade

`--dock-icon-glyph` was `calc(1.25rem * var(--dock-scale))` — a flat rem that rode the coarse-pointer multiplier but NOT the per-density box. Now it is a RATIO of `--dock-layer-height`:

```
--dock-icon-glyph-ratio: 0.5;
--dock-icon-glyph-floor: 1rem;                    /* the WCAG glyph floor */
--dock-icon-glyph: max(
    calc(var(--dock-layer-height) * var(--dock-icon-glyph-ratio)),
    var(--dock-icon-glyph-floor)
);
```

Because density.css paints `--dock-layer-height` ONLY on `.glass-dock[data-density]`, the `:root` definition resolves the fallback ladder — so density.css **re-resolves** `--dock-icon-glyph` inside the `.glass-dock[data-density]` scope where the painted height flows in (the substitution-vs-inheritance trap, mirroring the R5-1 sweep's `--dock-collapsed-summary-min-size` fix in overflow.css). The coarse overflow.css re-declare (which source-order-wins on touch) is made density-aware too (the flat rem there would re-freeze the glyph on coarse pointers). The `.dark-mode-toggle-button > svg` mirror reads the same re-resolved token, so both glyphs move onto the density axis together. The `--dock-scale` coarse thread is preserved transitively (`--dock-layer-height` already rides it).

**π readback (A′-6):** `/dock/overview`, the `.dock-icon-button svg` computed width grows monotonically compact → comfortable → spacious → audacious (`readback.json` `a6_glyph`), spacious > compact (the D5-1 defect dead), and the compact glyph honors the 16px floor.

## A′-1 — one canvas + one context per GooBlob mount + clean dispose (PROVEN-CLEAN + ROUTED BY NAME)

The producer side is CLEAN at HEAD: `GooBlob.vue` ships EXACTLY ONE `<canvas ref="canvasRef">`, `useMetaballRenderer.ts` arms behind the `if (canvas && !canvasHandle) start(canvas)` double-arm guard and `onUnmounted` disposes + nulls the handle, and `proof:webgl-substrate-single` already asserts ONE `getContext("webgl2")` src site. The disposition is **prove-clean + machine-lock the invariant** (the gate's W3 reds if a future producer adds a second canvas / drops the dispose / double-arms) + **route the demo double-mount by name**.

### value.js demo-side double-mount — ROUTED BY NAME

The value.js trace's 400×400/0×0 second canvas (a live WebGL2 context + RAF loop on a never-laid-out 0×0 box) is a **value.js DEMO-side artefact**, NOT a glass-ui producer leak: a double-mounted `<GooBlob>` (a stale slot survivor / an HMR-orphaned mount) leaves the orphan. The fix is value.js's own — the consumer de-duplicates its `<GooBlob>` mount (a `v-if`/`:key` slot reconcile or the HMR-dispose). glass-ui writes NO value.js code; this is the atlas register-D by-name route (the producer proves it ships no leak; the consumer fixes its double-mount). The value.js session consumes this at its 4.1.0 re-pin.

**π readback (A′-1):** `/substrates/blob`, every `.goo-blob-wrapper` ships exactly one `<canvas>` with exactly one live WebGL2 context (`readback.json` `a1_mounted`); routing away releases them (`a1_canvasesAfterUnmount`).

## A′-5 — the aurora wash sub-2× DPR ceiling (the focal goo-blob keeps 2×)

`AV_AURORA_DPR_MAX = 1.5` is minted < the shared `AV_DPR_MAX = 2`, with `resolveAuroraWashDpr()` (the SSR-safe `min(devicePixelRatio, 1.5)`). Aurora's `runtime.ts` `resize()` reads the wash sub-cap; the focal goo-blob's `useMetaballRenderer.ts` STILL reads `resolveBudgetDpr()` (the 2× ceiling — its silhouette is sharp). The aurora is a heavily-blurred decorative drift wash (the per-pixel FBM is already below the DPR-2 detail floor), so 1.5× is visually indistinguishable from 2× while quartering the GPU memory + per-composite raster (the value.js LP1 ~21.8MB full-viewport-2× trace). This is the CPU-side backing-store DIMENSION only — `aurora.frag`/`metaball.frag` are byte-fenced (the GL fence is absolute; the cap never reaches the shader).

**π readback (A′-5):** `/substrates/aurora`, the largest non-blob WebGL2 canvas's backing-store DPR (`canvas.width / cssWidth`) is ≤ 1.5× the wash cap (`readback.json` `a5_backing`), NOT the focal 2× — verified on the dev box (and asserted < 1.8 on a retina box). The side-by-side capture (`a5-aurora-wash.png`) shows no perceptible wash loss.

## The fences held

- `DOCK_SPRING {response:0.32, dampingFraction:0.7}` — byte-unchanged (the gate's W1 bite). A′-4 is restyle cost + reflow ordering.
- `aurora.frag.ts` / `metaball.frag.ts` — byte-unchanged (the gate's W4 bite). A′-5 is the CPU-side DPR seam.
- The focal goo-blob's `resolveBudgetDpr()` (2×) — untouched. Only the aurora wash sub-caps.
- The GooBlob visibility/PRM seam (A′-2) — untouched (already met).
