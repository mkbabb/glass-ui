# W-VIZ-PAPERGRID — the liquid paper-grid viz DELTA

**Wave:** BC.W-VIZ-PAPERGRID · **Status:** SOURCE GREEN (`proof:viz-papergrid` P1-P6 born-RED→GREEN + a 7-bite self-test; `proof:subpath-enumeration` 85→86; `proof:gpu-substrate-single` 7→8 rows, `paper-grid:verified`); the binding live Metal-GPU paint rides the orchestrator capture (this wave captures its OWN paint — `BC.W-GESTALT-FIRST`).

## Before → After (the headline)

| | HEAD (before) | BC.W-VIZ-PAPERGRID (after) |
|---|---|---|
| register | a static `linear-gradient` STACK (`--paper-grid-texture` / `.story-bg-grid`) — a `background-image` that CANNOT evaluate a per-pixel warp | a per-pixel fullscreen fragment field (`<PaperGrid>`) on the WebGPU-first substrate — the LIGHTEST viz in the suite (no compute, no particles, no storage buffer) |
| spacing | 28px (`.story-bg-grid`) vs 32px (`--paper-grid-texture`) — the "oddly spaced" split; a 1px line at a non-integer device-pixel offset rendered as a blurry 2px-soft band | **evenly-spaced, LARGER 64px cells**, a crisp fine rule with a bolder major rule every 5 cells (the kf blueprint identity) |
| crispness | the CSS sub-pixel blur (the "blurry mess") | exactly ONE device-pixel crisp at ANY DPR — the Ben Golus screen-space derivative AA (`length(vec2(dFdx,dFdy))` + `smoothstep(drawWidth±lineAA)` + the Moiré-suppression `mix`) reads the ACTUAL backing-store pixel |
| motion | none — a static raster cannot warp | the IQ domain warp `g(uv) = uv + curlWarp(uv,t)` driven by the Bridson divergence-free curl (`curlFBM`) — the whole sheet bows + flows TOGETHER (liquid), never a per-line jitter (the inverse-coherence law: LARGE structures from LOW spatial frequency) |
| interaction | none | a LOCAL Gaussian bulge presses the grid toward (repel: away from) the cursor (`usePointerVelocityField` — position→cursor, velocity→directional lead/wake, burst→ripple impulse); coherent everywhere else |
| placement | "displayed in the card" (the `.paper-grid` card-interior paint) | suffuses over the page (transparent ground — the page reads through the cells); the suffusion preset rides full-bleed behind content (NOT in a card — the `liquid-grid` `StoryBackgroundKind` + the `.story-hero-bg--bleed` escape) |
| color | teal-on-navy reference (condemned) | the warm `--foreground` identity ink (resolved live at mount); **teal-on-navy is GONE** (`proof:viz-papergrid` P5 reds a teal/navy hue in the LIBRARY constants.ts) |

## The eye should see (the gestalt criterion — orchestrator live capture)

Route `/substrates/paper-grid`, canvas selector `[data-testid="paper-grid-canvas"]` (the `<canvas>` inside the `<PaperGrid>` mount), BOTH modes + WebKit, over ~3s:

1. **A crisp, evenly-spaced, LARGE-cell two-tier grid** — warm-ink lines, one device-pixel crisp at Retina DPR (NOT the blurry oddly-spaced soft-band of the old 28px-center CSS grid), a bolder major rule every 5 cells. A side-by-side OLD vs NEW still is the headline.
2. **The lines bow and flow TOGETHER in a slow liquid breath** — the curl warp slowly undulates the whole sheet (the IQ domain warp, the Bridson divergence-free curl), never a per-cell chatter. A human reads "an evenly-spaced larger grid that morphs + waves in a liquid way," NOT a blurry oddly-spaced in-card mess.
3. **The pointer bulge** — dragging the cursor pushes a soft bulge through the grid toward (repel: away from) the pointer like a finger pressed into the liquid; a fast sweep smears a velocity-directional wake; a flick fires a transient ripple.
4. **The suffusion preset** reads as a near-invisible site-wide grid behind real content (legible content over it) — NOT a focal element, NOT in a card (the `liquid-grid` background kind, full-bleed).
5. **PRM** — under `prefers-reduced-motion: reduce` the warp freezes mid-breath and the grid holds crisp + legible.
6. **Backend** — the resolved backend is `webgpu` on the Metal GPU (the WGSL primary `paper-grid.wgsl.ts`, the FIRST WGSL curl consumer); the WebGL2 GLSL twin is the genuinely-absent-tail fallback (the SAME pure fragment field → parity `verified`).

## Parity (device-free structural proxy)

paper-grid is a PURE fragment field (no compute, no particles, no storage buffer): BOTH backends evaluate ONE analytic liquid-grid evaluator (`composables/paperGrid.ts` `samplePaperGrid` — the Ben Golus derivative-AA two-tier grid on the Bridson divergence-free curl-warped UV) through ONE shared curl chunk (`flow.wgsl.ts` ⟷ `flow.glsl.ts`, the byte-identical 2D-curl operator) + ONE OETF, so the line coverage + the premultiplied ink are numerically identical at every (uv,t) → ΔE mean/p99 = 0.0 (`proof:viz-papergrid` clause P3 round-trips JS↔WGSL↔GLSL). The structural-proxy capture-pair (4128/9216 line pixels — the grid READS) lands at `docs/tranches/BC/audit/visual/paper-grid-parity/` (regen `node scripts/paper-grid-wgpu-parity-capture.mjs`). The binding Metal-GPU live capture-pair (the real WebGPU swap-chain readback vs WebGL2 `readPixels`) rides this wave's close + re-records the empirical rasterizer-drift ΔE.

## The proxy raster (structural capture)

The `paper-grid-parity/paper-grid-wgpu-primary.png` proxy (the JS evaluator rendered over a neutral cream page so the lines read) shows the warm-ink two-tier grid gently curl-warped — a crisp evenly-spaced larger grid that morphs in a liquid way, in warm-cream (NOT teal/navy). The WebGPU primary + the WebGL2 fallback rasters are byte-identical (ΔE 0.0 — the ONE math source).

## Composition (the three cited techniques)

- **The crisp line** — Ben Golus *The Best Darn Grid Shader (Yet)* / Evan Wallace *Anti-Aliased Grid Shader* (`gridCoverage`): line coverage from the screen-space derivative → N device-pixels crisp at any DPR.
- **The "liquid"** — Iñigo Quílez domain warp (`curlWarp`): the grid at `g(uv) = uv + warp(uv,t)`, a SHALLOW LOW-frequency field → adjacent cells warp together.
- **WHY liquid not noise** — Bridson 2007 divergence-free curl flow (`curlFBM`, the shared chunk): area-preserving → the grid folds + stretches like fluid advection, never the source-y bulge a raw fbm gradient produces; a SECOND counter-flowing curl term (Alex Harri) never visibly loops.
