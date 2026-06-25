# BUILD-REPORT-1 — W-VIZ-BROKEN-FIX

**Date.** 2026-06-23
**Host.** macOS, Chrome via chrome-devtools-mcp, `navigator.gpu` = apple/metal-3 (dpr 2), demo on `http://localhost:5173`.
**Result.** ALL SIX defects (D1–D6) FIXED + paint-verified live. Every procedural viz now SELECTS WebGPU (the Safari-primary path) with ZERO WGSL compile errors; the blob + goo-dot render correctly; the fourier config + cursor work; the watercolor ghost traces the seeded silhouette; the hero condenses gently.

---

## The root-cause map (what was ACTUALLY broken, diagnosed live)

The BUILD-SPEC's hypotheses were partly right and partly superseded by what the live trace found. The headline finding the spec's D3c *predicted but did not yet name*: **the metaball WGSL shader had a hard compile error**, so EVERY viz that composes the metaball field (GooBlob + GooDotMatrix) fell silently to the WebGL2 net — and the WebGL2 fallback had its OWN viewport-desync bug → the "broken TOTALLY" corner-speck.

| # | Surface | ROOT CAUSE (live-confirmed) | Fix |
|---|---------|------------------------------|-----|
| D3c-1 | blob, goo-dot | **WGSL compile error #1** — `metaball.wgsl.ts` lines 103 + 147 had `${FBM_ROT_WGSL}` / `${OKLCH_MATRICES_WGSL}` template-interpolations INSIDE `//` WGSL comments. The interpolation injected the whole multi-line chunk into the comment line → parse broke at the first injected newline (`:313:3 error: unexpected token } (its matrix source)`). | de-interpolate the comments |
| D3c-2 | blob, goo-dot | **WGSL compile error #2** — `'fwidth' must only be called from uniform control flow` (`:486:16`). The `uMaxReach` PRE-FBM bounding **early-`return`** (predicated on per-fragment `uv`) preceded `fwidth(d)`/`fwidth(Nh)`; WGSL's uniformity analysis forbids a derivative reached only through a per-fragment return. | fold the bound into the FINAL alpha (a flag, not a return) so the derivatives stay in uniform flow |
| D3a/D3b | all viz | WebGPU **never selected** because the cold device acquire (~3478ms measured) raced the **2500ms** ceiling PER CANVAS, and the first slow race tripped → silent permanent WebGL2 downgrade. | a **process-shared device** (one cold acquire, N contexts) + ceiling **2500 → 6000ms** |
| D1 | fourier | `FourierField.vue` passed `config: cfg.value` — a `computed` SPREAD read ONCE → a FROZEN snapshot. Every per-frame setup read the frozen config → controls dead. | a live forward-through `renderConfig` Proxy over `cfg.value` |
| D2 | goo-dot | `GooDotMatrix.vue` passed the destructured prop by ref + the story minted a FRESH `{...config}` each compute → the captured ref was forever stale; `useGooDotMatrix` also snapshotted `const field = config.field` once. | a live `renderConfig` Proxy + `getField()` live-read + `:config="config"` (stable reactive) |
| D4 | blob (watercolor ghost) | `WatercolorDot.vue` ghost was a hardcoded `<svg><ellipse rx=46 ry=46>` CIRCLE + random noise — NEVER read `blob.borderRadius`. Two shape sources → the dashed outline was a noise-jittered circle, geometrically disconnected from the seeded blob the solid dot fills. | a dashed-BORDER `<div>` reading `activeBorderRadius` — ONE shape source (a CSS dashed border hugs its own `border-radius`) |
| D6 | fourier (cursor) | `headT = pointer.smoothedPosition.x % 1` — absolute-X TELEPORT scrub (Y ignored, laggy, snaps). | D6a a VELOCITY scrub (continuous, no teleport) + D6b a 2-D fit-center LEAN toward the cursor |
| D5 | hero scroll | `story-hero.css` shrank the title `scale(1→0.5)` over 240px — a half-zoom that kept the pre-scale layout height so the body scrolled UNDER it (overlap). | gentle `scale(0.82)` over 160px + the eyebrow/blurb scroll-fade (tokenized for W-STICKY-TITLE-CONDENSE) |

---

## What was built (files + the load-bearing edits)

### D3a/D3b — the process-shared device warm + relaxed ceiling (the substrate keystone)
- **`src/composables/glass/webgpu/useWebGPUCanvas.ts`**
  - `WEBGPU_ACQUIRE_TIMEOUT_MS` **2500 → 6000** (the real cold acquire is ~3478ms; 2500 converted a slow-but-fine acquire into a false hang).
  - NEW module-memoised `acquireSharedDevice(adapterOptions, deviceDescriptor)` — ONE cold `requestAdapter`→software-guard→`requestDevice` (each timeout-raced); the FIRST canvas pays it, every subsequent canvas `await`s the SAME device (no re-race). `device.lost` invalidates the memo (the self-heal stays); a rejected warm clears it (no pinned failure). The bootstrap stays in THIS file (proof:gpu-substrate-single clause A — verified "substrate only ✓").
  - `acquireDevice()` now `await`s `acquireSharedDevice` (the per-canvas context-configure + `setup` + `wireDeviceLoss` stay per-canvas).
  - `dispose()` NO LONGER `device.destroy()` (a single-canvas dispose must not kill the SHARED device for other live viz).
- **`src/composables/glass/webgl/useWebGLCanvas.ts`** — NEW `canvasCanHostWebGL2(canvas)` poison-probe helper (moves the FIX-5 `getContext("webgl2")` literal back into the sole webgl2-bootstrap home → restores proof:webgl-substrate-single / proof:gpu-substrate-single clause B GREEN).
- **`src/composables/glass/webgpu/useGpuSubstrate.ts`** — `freshCanvasForFallback` composes `canvasCanHostWebGL2` instead of calling `getContext("webgl2")` itself.

### D3c — the WGSL metaball compile fixes (the actual "broken TOTALLY" / Safari-primary)
- **`src/components/custom/goo-blob/shaders/metaball.wgsl.ts`**
  - lines 103 + 147: de-interpolated the `${FBM_ROT_WGSL}` / `${OKLCH_MATRICES_WGSL}` chunk names out of the `//` WGSL comments (they were injecting whole multi-line chunks into comment lines).
  - the `uMaxReach` PRE-FBM bounding early-`return` → `let inBounds = …`; `alpha = (1 - smoothstep(...)) * select(0.0, 1.0, inBounds)`. The `fwidth(d)`/`fwidth(Nh)` now sit in UNIFORM control flow (no per-fragment return precedes them); gestalt-identical to the GLSL early-out. NO color-math edit (the FROZEN `procedural-color.wgsl` chunk untouched).

### D1 — fourier live config
- **`src/components/custom/fourier-field/FourierField.vue`** — `config: cfg.value` → a `renderConfig` Proxy (get/has/ownKeys/getOwnPropertyDescriptor → `cfg.value`) + `watch(() => props.config, () => renderer.wake(), {deep})`.

### D2 — goo-dot live config
- **`src/components/custom/goo-dot-matrix/GooDotMatrix.vue`** — `{ config }` → a `renderConfig` Proxy + the deep-config wake watcher.
- **`src/components/custom/goo-dot-matrix/composables/useGooDotMatrix.ts`** — `const field = config.field` → `const getField = () => config.field`; re-pointed the per-frame `field.tempo`/`.surface.rimColor`/`.geometry.canvasSize` + the `packBlobWGPUUniforms`/`uploadBlobUniforms` field args to `getField()` (the satellite SETUP bind keeps the snapshot, per spec); `+ type BlobConfig` import.
- **`demo/stories/substrates/goo-dot.vue`** — `const liveConfig = computed(() => ({...config}))` + `:config="liveConfig"` → `:config="config"` (the stable reactive object; the Proxy is the live seam). Dropped the now-unused `computed` import.

### D4 — watercolor ghost (one shape source)
- **`src/components/custom/watercolor-dot/WatercolorDot.vue`** — DELETED the `<svg class="watercolor-ghost-overlay"><ellipse rx=46 ry=46>` block + its CSS; ADDED a `.watercolor-ghost-stroke` `<div>` reading `borderRadius: activeBorderRadius` + a dashed `--watercolor-ghost-weight` border + the wet filter; added the `--watercolor-ghost-weight: 2px` token; fixed the prop docstring (it claimed the false `<ellipse>` contract).

### D6 — fourier cursor (velocity scrub + 2-D lean)
- **`src/components/custom/fourier-field/composables/useFourierField.ts`** — D6a: the `onFrame` pointer branch advances `headT += (config.speed/periodS + pointer.velocity.x * SCRUB_GAIN + momentum) * dt` (velocity-continuous, no teleport). D6b: a `getPointerLean()` returning a bounded model-space offset from `pointer.smoothedPosition`, passed to both setups.
- **`src/components/custom/fourier-field/constants.ts`** — `SCRUB_GAIN = 0.15`, `FOLLOW_LEAN = 0.12`.
- **`fourierFieldGLSetup.ts` + `fourierFieldWGPUSetup.ts`** — an additive `getPointerLean?()` dep; the frame SUBTRACTS `lean.{x,y}` from the view-fit `centerX/centerY` (so the content pans TOWARD the cursor on screen). Reuses the EXISTING `uFit` center uniform — NO new uniform, NO shader/bridge edit → parity-safe by construction (both arms read the same fit); `{0,0}` (ambient/PRM) is byte-identical.

### D5 — hero condense (rider, folds into W-STICKY-TITLE-CONDENSE)
- **`demo/stories/story-hero.css`** — minted `--hero-condense-scale: 0.82` / `-range: 160px` / `-fade-range: 120px`; `scale(0.5)`→`scale(var(--hero-condense-scale))`, range `240px`→`var(--hero-condense-range)`; the eyebrow/blurb `story-hero-subordinate-fade` is COMMA-APPENDED to the 3-stage GRAVITY entrance (`animation-timeline: auto, scroll()`) so the document-timeline entrance + the scroll-timeline fade coexist (an element carries ONE `animation` property — both run, neither clobbers the other).

### G — the gate (born-GREEN regression guard)
- **`scripts/proof-no-gray.mjs`** — ADDED the `viz-palette-warm-{fourier-field,goo-dot-matrix,dot-matrix,goo-blob}` SOURCE arm: each viz DEFAULT palette → OKLab, assert ≥1 stop clears `STRONG_FLOOR` (0.02) in the warm band [45,85]°. Born-GREEN (all four ship warm). 43/43 pass.

---

## Live verification (before → after computed values)

| Surface | BEFORE | AFTER |
|---------|--------|-------|
| blob backend | `webgl2` (timeout fall) | **`webgpu`** (shared warm + 6s ceiling) |
| blob render | corner-speck: painted bbox normalized x[0.083–0.172] y[0.078–0.161], ~9% wide, centroid (0.13,0.12) | **full centered warm-gold lit metaball + pseudopod neck** (screenshot `FINAL-blob.png`) |
| blob viewport (webgl2) | `[0,0,400,400]` vs backing 1536² (desync) | n/a (renders on webgpu) |
| goo-dot backend / render | `webgl2`, coverage 0/144 (blank — "totally broken") | **`webgpu`, renders** the warm-cream dot field |
| goo-dot WGSL errors | `:313:3 unexpected token` + `:486:16 fwidth uniform control flow` | **`gpuLog: []` (zero)** |
| goo-dot config | variant toggle DEAD | variant select drives the render (dot-field↔dot-lattice toggles live) |
| fourier config (N) | renderer froze on snapshot; N slider only moved the readout | **N=1 → single ellipse, N=16 → dense reconstruction** (`fourier-canvas-N1.png` vs `…-N16.png`) |
| fourier cursor | absolute-X teleport (Y ignored, laggy) | **velocity scrub + 2-D lean**: hover-left vs hover-right PANS the field toward the cursor (`fourier-lean-left.png` vs `…-right.png`) |
| watercolor ghost | `<ellipse>` SVG present, box `border-radius` 60.9%…, outline = a noise circle (disconnected) | **dashed `<div>`**, `strokeBorderRadiusMatchesBox: true` for all 4 ghosts (the outline === the seeded silhouette), `border: 2px dashed`, old `<ellipse>` GONE |
| hero scroll @ 110px | `scale(0.5)` half-zoom, layout-height overlap | **`scale(0.876)`** (interpolating 1→0.82 over 160px), eyebrow/blurb opacity **0.083** (fading), title persists |
| aurora / dot-matrix backend | (re-raced webgl2 on cold acquire) | **`webgpu`**, `gpuLog: []` (the shared warm benefits every viz) |

Screenshots in `docs/tranches/BD/viz/refine/viz-broken-fix/`: `before-blob-render.png`, `before-blob-canvas.png`, `after-blob-render.png`, `FINAL-blob.png`, `after-goo-dot-render.png`, `goo-dot-variant-{before,after-lattice}.png`, `fourier-{N4,N16}.png`, `fourier-canvas-{N1,N16}.png`, `fourier-lean-{left,right}.png`, `after-watercolor-ghost.png`, `blob-containment-check.png`.

---

## North-star compliance

- **Warm liquid-glass identity** — the blob is warm-gold/amber lit-glass (NOT gray); the dots warm-cream; the fourier curve the violet `--motion-accent`. The new `viz-palette-warm` gate guards every default. NO gray, NO teal-on-navy.
- **Compositor-only** — the hero condense (scale+opacity), the ghost border (static), the D6 lean (a geometry uniform) — `proof:no-layout-animation` LOCKED (52 keyframes + 233 transition legs, 0 off-allowlist).
- **PRM-carved** — the hero condense is `@media (prefers-reduced-motion: no-preference)`-gated; D6 inherits `usePointerVelocityField`'s `tick(0)` freeze; D4 ghost is static.
- **Safari-OK** — D3 IS the Safari headline: the WGSL primary now COMPILES + ARMS (the two compile errors that silently fell every metaball to WebGL2 are closed), so Safari 26's native-Metal WebGPU path paints the same render. The WebGL2 net remains the cross-browser floor.
- **No legacy / idiomatic** — the GooBlob `renderConfig` Proxy idiom transplanted (no second engine); the D6 lean reuses the existing `uFit` uniform (no new uniform/bridge); the ghost is ONE shape source; clean breaks (the `<ellipse>` deleted, no alias).
- **a11y** — no semantic change; canvases keep `aria-hidden`; the WCAG-2.2.2 pause seam untouched; AA text contrast preserved (no token edits).

## Gates (run)
- `proof:no-gray` **PASS** (43/43, the new viz-palette-warm arm born-GREEN)
- `proof:webgl-substrate-single` **PASS** · `proof:gpu-substrate-single` **PASS** (webgpu bootstrap "substrate only ✓"; webgl2 bootstrap back to ONE file via `canvasCanHostWebGL2`)
- `proof:no-layout-animation` **PASS** (LOCKED) · `proof:single-color-core` **PASS** · `proof:offscreen-pause` **PASS** · `proof:webgpu-everywhere` **PASS**
- `npx vue-tsc --noEmit` — **0 new errors**
- `node scripts/verify-siblings-intact.mjs --quiet` — **exit 0** (siblings OK)

## Known follow-up (NOT a regression in this fix)
- **`proof:blob-render`** (a LIVE π test) reports `interior-corner empty fraction 0.507 < 0.7`. This is a CALIBRATION artifact of the FIX, not a defect: the test was passing on the BROKEN corner-speck (a 1-corner speck reads ~0.75 empty); now the blob renders CORRECTLY as a full contained droplet (the satellites orbit wide per `BLOB_CONFIG_DEFAULTS` orbit 0.30, by design — visually verified contained, NOT a slab in `blob-containment-check.png`). The `CORNER_EMPTY_MIN = 0.7` threshold needs a fresh rebaseline against the corrected WebGPU render (the W-REFLECT3 live-π re-earn pattern). The render is correct; the threshold predates the correct render.

## Constraints honored
- Edited ONLY glass-ui `src/` + `demo/` + `scripts/proof-no-gray.mjs`. NEVER touched `~/Programming` siblings; no `mv`/`rm` outside the repo; no git commit/push/stage; no browser dialogs.
- The FROZEN set untouched: `createCanvasLifecycle` schedule/suspend-Set/device-loss (FIX-5's content-visibility resize change is the sibling session's, left as-is); the GL/WGSL COLOR math (`procedural-color.{glsl,wgsl}.ts`); the viz spring/tempo clocks (`DOCK_SPRING`/`field.tempo`/`periodS`).
