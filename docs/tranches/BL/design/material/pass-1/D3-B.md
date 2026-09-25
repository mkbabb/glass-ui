# D3 · pass 1 · D3-B · the field signal (research)

| field | value |
|---|---|
| seat | D3 pass 1, the research seat for family D3-B: the substrate reduces its own frame to per-tile luminance on the GPU, publishes it through `mapAsync`, and each glass surface solves its α from the tiles under it |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | tasked at `9aa2b7f9`; the tree read `145f199d`. `git diff --stat 9aa2b7f9 HEAD -- src` is empty, so every `src/` reading holds for the tasked HEAD. The HEAD battery numbers are the harness's own (`harness/HARNESS.md` §3, measured at `991067c8`, the same `src` bytes) |
| inputs | `PORTFOLIO.md` §0-§2, the D3-B section of §4, §6 (D3-B), §7 (the battery and the family registry). Background: `pass-1/W.md` (§1 finding 6 and §10, the T7 reduction timing), `pass-1/X.md` (the consumer census), `harness/HARNESS.md`. No other family's section was read |
| instruments | Headless Chromium 149.0.7827.55 (`--enable-unsafe-webgpu --ignore-gpu-blocklist --use-angle=metal`, adapter `apple metal-3`) and Playwright WebKit 26.5, Playwright imported from `glass-ui/node_modules/playwright`. One SwiftShader leg (`--use-webgpu-adapter=swiftshader`). Machine: Apple M5 Max, 40 GPU cores. Load averages 7-18 during the runs. All scratch lives under `S = /private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D3/p1/D3-B-research/` (`probe/` for scripts and outputs, `out/` for the battery builds and captures). The probe worktree (`S/wt`, detached at `145f199d`) is removed; its final diff is `S/probe/d3b-probe.diff` (784 lines) |
| engine labels | **Playwright WebKit is not Safari.** Every WebKit number is labelled Playwright WebKit and is paint-only (headless paints no `backdrop-filter`, exposes no `navigator.gpu`, and crashes on any page that mounts `GlassDock`). Every real-Safari cell is UNMEASURED (owner's safaridriver checkbox) |

## 0 · Findings that change the family

1. **The reduction is cheap and the publication is fast on this GPU.** A 128-bin histogram reduction of a 1280×900 frame into per-tile p05/p95 and mean costs 71-114 µs of GPU time at p50 (Chromium, Metal), and submit-to-`mapAsync` lands in 1.8-2.1 ms at p50 and ≤ 3.3 ms at p99, with 0-1 dropped publications in 600 frames. At the DPR-2 backing size the aurora actually allocates (1920×1350) it is 115-127 µs and 2.8 ms p50, 5.1 ms p99. The integrated probe in the real `<Aurora>` publishes within 2 frames of a ceiling step in 7 of 8 live windows (§4).
2. **The publication is exact where it is honest.** Against a clean raw capture, the published mean under the dock matches the painted mean to 0.001 in all four field cells, both themes (§4.3). The remaining W-B RED rows are an instrument defect: **the harness's `raw` mode leaks the dock's contents.** It hides `[data-spec]` by `visibility: hidden`, but the dock's layers set `visibility: visible` (`dock/styles/layers.css:148,169,182`, `crossfade.css:61`), so the tabs, the dark active pill and the labels still paint into every `raw` capture. That biases W-B's "painted mean under the dock" by −0.008 to +0.036. It touches every witness that reads `raw` under the dock (W-B, W-F's under-rect reading). Cure: hide `[data-spec], [data-spec] *`.
3. **The Y-linear solve in the charter under-lifts in light and over-lifts in dark; the cure is to solve in encoded tone, which CSS can do with `pow()`.** The charter's `(need − Y) / (pole − Y)` misses the exact α by −0.047 to −0.114 for light muted over the ceiling-1 field (muted falls to p05 3.88, min 3.13), and wastes +0.12 to +0.18 of α in dark. Solving on `E(y) = 1.055·y^(1/2.4) − 0.055` cuts the error to −0.032..+0.024; the residual is chroma, which a solve target of 4.7 in light absorbs (min 4.53). No lookup table is needed (§1.3).
4. **"The page publishes its ground" is the masking fallback in this family.** Measured both ways on the real source (§4): when the page publishes paper under every surface no substrate covers, the paper plates turn into a light frost (M-1 green on every plate, L 0.980-0.984, ΔE 0.003-0.008), but every surface over DOM content the page did not declare paints thin and fails silently: light fg 1.01 and muted 1.16 over black, dark fg 1.69 and muted 1.09 over white, M-8 chroma 0.049-0.070 over the stripes. When nothing publishes by default, the unpublished state is the any-input bound (α 0.894 light, 0.853 dark), M-2 is green on 558 of 560 rows including every hostile ground, and the ladder collapses to one α wherever nothing publishes (M-6 RED). Only the second is E-2-clean.
5. **A DOM layer between the publisher and the surface falsifies the publication.** The modal scrim sits between the aurora and the `DialogContent`; the aurora publishes its own frame, not the scrim-darkened composite, so the Dialog solves for a field brighter than what it sits on. Dialog muted reads 4.20 over the ceiling-1 field and 3.23 over ceiling 0.5. These are the only two M-2 failures left in the final probe.
6. **The light ladder cannot be both M-1-clean and M-6-separable with one pole.** Every composite of `--card` over paper lies on one segment whose full length is ΔE_OK 0.017, so four adjacent steps of ≥ 0.010 do not fit. And `--card` (L 0.974) itself sits under M-1's L floor (0.975), so a surface at the bound α misses M-1 by 0.001. Both are properties of the pole choice, not of the signal.
7. **The WebGL2 arm publishes nothing.** Playwright WebKit (no `navigator.gpu`) and any engine without WebGPU run the aurora's GL arm, which this probe does not reduce. On those, every surface is unpublished and sits at the bound. An asynchronous GL path (PBO + `fenceSync`) is a `readPixels` call, which W-B counts as a readback.

## 1 · The research questions

### 1.1 Q1 · cost of the reduction and `mapAsync` latency

**Command.** `node S/probe/q1/run2.mjs "grid=8x8" "grid=16x9" "grid=32x18" "grid=16x9&reduce=0" "grid=32x18&stride=2"`, then `node S/probe/q1/run3.mjs "size=1920x1350&grid=32x18" "size=1920x1350&grid=16x9"`, and `SW=1 FRAMES=240 node S/probe/q1/run2.mjs …` for SwiftShader. The page (`q1/index.html`, `index2.html`) draws a 24-iteration full-screen shader into a WebGPU canvas configured with `TEXTURE_BINDING`, then in the same encoder runs the reduction (16×16 workgroups, one per tile, 128-bin workgroup-atomic histogram of relative luminance after the ceiling composite on encoded channels, p10/p90 and mean), copies the stats into a 3-deep ring of `MAP_READ` buffers and resolves `timestamp-query` pairs. 600 frames, the first 60 excluded. Outputs: `q1-metal.jsonl`, `q1-dpr2.jsonl`, `q1-sw2.jsonl`.

| adapter, frame | grid | GPU reduce p50 / p99 (µs) | submit → `mapAsync` p50 / p99 / max (ms) | published / dropped of 600 | draw p50 (µs) |
|---|---|---|---|---|---|
| Metal, 1280×900 | 8×8 | 114 / 730 | 2.1 / 3.3 / 4.2 | 600 / 0 | 784 |
| Metal, 1280×900 | 16×9 | 71 / 595 | 1.8 / 2.8 / 3.9 | 599 / 1 | 761 |
| Metal, 1280×900 | 32×18 | 85 / 561 | 2.0 / 3.2 / 3.5 | 600 / 0 | 780 |
| Metal, 1280×900 | 32×18, stride 2 | 39 / 365 | 1.8 / 3.0 / 6.9 | 600 / 0 | 616 |
| Metal, 1280×900 | no reduction | — | — | — | 624 |
| Metal, 1920×1350 (the DPR-2 backing) | 32×18 | 115 / 728 | 2.8 / 5.0 / 5.7 | 600 / 0 | 1627 |
| Metal, 1920×1350 | 16×9 | 127 / 533 | 2.8 / 5.1 / 6.0 | 600 / 0 | 1607 |
| SwiftShader, 1280×900 | 16×9 | 10 019 / 11 070 | 314 / 879 / 902 (n 6) | 6 / 231 of 240 | 3157 |
| SwiftShader, 1280×900 | 16×9, stride 8 | 7 494 / 9 315 | 424 / 1154 / 1194 (n 6) | 6 / 231 of 240 | 3613 |

rAF ran at 7.9-8.2 ms (headless 120 Hz). The aurora's real backing store is 1280×900 at DPR 1 and 1920×1350 at DPR 2 (`node S/probe/canvas-size.mjs`: "DPR 2: backing 1920×1350, CSS 1280×900").

**Reading.**
- On an M-class GPU the reduction is 1-2% of an 8 ms frame and the publication lands inside the next frame. The 32×18 grid costs no more than 16×9.
- **Integrated GPUs: UNMEASURED here.** No integrated adapter is on this machine. W's cited gpuweb #4432 (2023) reports 5-15 ms `mapAsync` on Intel iGPU under Chrome/Dawn, traced to Dawn polling. SwiftShader is not an integrated GPU; it is the floor: 7.5-10 ms of reduction and 0.3-1.2 s to map, so only 6 of 240 frames publish. The aurora never runs its GPU arm there (`resolveRenderMode` falls to `"css"` on a software renderer, `Aurora.vue` props doc), so on software raster the field has no GPU publisher at all.
- **Safari 26 `mapAsync` latency: UNMEASURED (owner's safaridriver checkbox).** Playwright WebKit has no `navigator.gpu`.

### 1.2 Q2 · per-tile low percentile against the glyph ring, over the moving field

**Command.** `node S/probe/q2-tiles-vs-ring.mjs` (12 live frames per cell, 900 ms apart, motion on, every surface and its whole subtree hidden, both themes, ceilings 1 and 0.5), then offline re-reads of the same frames: `OFFLINE=1 SIGMA=<σ> PLO=<p> PAD=<px> node S/probe/q2-tiles-vs-ring.mjs`. The glyph ring is the harness HEAD capture's mask pair (the same layout), 1 px. Per surface the tile value is the worst over the tiles the rect (optionally padded) touches: the low percentile in light, the high one in dark. "Under-lift" is `tile − ring worst` in the direction that would thin the veil, in Y. The contrast is muted ink over the ring's worst pixel after the α the tile value solves. The ring is read raw and after a Gaussian blur of σ (CSS `blur(16px)` is σ 16). Outputs: `q2.out`, `q2-variants.out`.

A first pass hid `[data-spec]` only and produced nonsense (tile minima 0.36 Y below the ring): the dock's own tabs and labels were in the frames (§0 finding 2). All numbers below are from the clean re-capture.

| grid | theme · surfaces | p10/p90, no pad, raw ring: under-lift p50 / max (Y) · min contrast | p10/p90, σ16 ring: max · min contrast | p05/p95 + 21 px pad, σ7 ring: max · min contrast | min/max + 3σ pad, σ7: max · min contrast |
|---|---|---|---|---|---|
| 8×8 | light · dock | −0.004 / 0.000 · 4.50 | −0.003 · 4.51 | −0.003 · 4.51 | −0.005 · 4.52 |
| 8×8 | light · all 10 | −0.005 / +0.004 · 4.49 | −0.001 · 4.50 | −0.002 · 4.51 | −0.003 · 4.51 |
| 16×9 | light · dock | −0.006 / 0.000 · 4.50 | −0.003 · 4.51 | −0.004 · 4.51 | −0.005 · 4.52 |
| 16×9 | light · all | −0.005 / +0.004 · 4.48 | −0.000 · 4.51 | −0.002 · 4.51 | −0.003 · 4.51 |
| 32×18 | light · dock | −0.006 / 0.000 · 4.50 | −0.003 · 4.51 | −0.004 · 4.51 | −0.005 · 4.52 |
| 32×18 | light · all | −0.006 / +0.004 · 4.48 | −0.000 · 4.51 | −0.003 · 4.51 | −0.003 · 4.51 |
| 8×8 | dark · dock | −0.110 / −0.026 · 4.97 | −0.026 · 4.99 | −0.028 · 5.01 | −0.033 · 5.06 |
| 16×9 | dark · all | −0.033 / +0.002 · 4.50 | +0.000 · 4.50 | −0.000 · 4.50 | −0.005 · 4.54 |
| 32×18 | dark · all | −0.028 / +0.002 · 4.49 | +0.000 · 4.50 | −0.000 · 4.50 | −0.002 · 4.51 |

**Reading.**
- On this field the tile p10 sits within 0.006 Y of the glyph-ring p05 under the dock at every grid, and the worst under-lift over every surface and frame is +0.004 Y (contrast 4.48 against a 4.50 solve). Grid resolution hardly matters: the default aurora is smooth at 40-160 px.
- The blur is what makes the tile statistic a bound. Any positive under-lift disappears under a blurred ring at σ7 (7.0.0's blur) and σ16 (HEAD's).
- The bound by construction: a blurred backdrop pixel is a convex combination of field pixels within about 3σ, so the minimum (light) or maximum (dark) over the tiles touching the rect padded by 3σ bounds every blurred ring pixel. Measured cost of that bound on this field: 0.003-0.005 Y in light and 0.03-0.18 Y in dark (dark dock p50 −0.13 to −0.18), because single bright pixels set a tile's maximum. **The spec publishes p05/p95 and pads by 3σ**, which measured zero under-lift here (max 0.000). That is an empirical margin, not a proof.
- Drift: `node S/probe/q2b-drift-rate.mjs` gives |Δ tile p10/p90| between frames 900 ms apart of 0.004-0.005 Y/s at p50 and 0.06-0.21 Y/s at max, so a 2-frame publication delay at 60 Hz moves the worst tile by at most 0.007 Y (`q2b.out`). This linearises 900 ms of drift; a pointer-driven gel pulse is faster and was not measured.

### 1.3 Q3 · the Y-linear solve against encoded-channel compositing

**Command.** `node S/probe/q3-solve-error.mjs` and `node S/probe/q3b-margin.mjs`, over the HEAD raw captures of the frozen field (`harness/out/caps/head/png/chromium-{light,dark}-{aurora,aurora50}-ladder-base-raw.png`, every 6th pixel, 32 100 pixels). For each pixel that needs lift, the exact α (bisection on the real encoded mix `α·pole + (1 − α)·field` per channel, WCAG against the ink) is compared with the Y-linear solve and with an encoded-tone solve `(E(need) − E(Y)) / (E(pole) − E(Y))`. Pole `--card` (light `#fdf5ec`, dark `#352a22`), ink `--on-glass-muted`. Outputs: `q3.out`, `q3b.out`.

| cell | exact α p50 / max | Y-linear α − exact, p05 / p50 / p95 | contrast after Y-linear, min / p05 | encoded-tone α − exact, p05 / p50 / p95 | contrast after encoded-tone, min / p05 |
|---|---|---|---|---|---|
| light c1, muted | 0.631 / 0.870 | −0.114 / −0.088 / −0.047 | 3.13 / 3.88 | −0.032 / −0.026 / −0.016 | 4.31 / 4.32 |
| light c0.5, muted | 0.427 / 0.870 | −0.061 / −0.051 / −0.013 | 3.13 / 4.33 | −0.012 / −0.011 / −0.003 | 4.46 / 4.47 |
| dark c1, muted | 0.738 / 0.852 | +0.118 / +0.132 / +0.156 | 5.13 / 5.50 | +0.001 / +0.004 / +0.024 | 4.50 / 4.51 |
| dark c0.5, muted | 0.456 / 0.852 | +0.027 / +0.115 / +0.119 | 4.50 / 4.57 | +0.001 / +0.001 / +0.005 | 4.50 / 4.50 |

The encoded-tone solve at a raised target (`q3b.out`): light c1 muted reaches min 4.53 at target 4.7 (α p50 0.660, max 0.888) and 4.64 at 4.8; dark is exact at 4.5.

**Reading.** The Y-linear solve is wrong in the unsafe direction in light and wastes transmission in dark. The encoded-tone solve is exact for greys; the rest of its error is the pole's and field's chroma, and a target of 4.7 (light) covers it. CSS expresses it directly: `calc(1.055 * pow(y, 0.416667) - 0.055)` (Chrome 120, Safari 15.4 per BCD for `pow()`), so no α → Y table is needed. The probe ran dark at 4.6 after the bound read 4.47 over white at 4.5 (§4).

One more fact from this table: the α the default ceiling-1 aurora needs under light muted ink is 0.43-0.87 on every pixel (p50 0.63). Over the shipped hero field this family is never thin. The transmission it buys is over ceiling 0.5 and over the dark page.

### 1.4 Q4 · what publishes for DOM content, and E-2 and E-7

**Command.** `node S/probe/q4/run.mjs`: a same-origin 1280×900 PNG decoded, uploaded with `copyExternalImageToTexture`, reduced by the same shader, mapped; the same PNG from a second origin with no CORS header; and a 1280×720 `<video>` fed by `canvas.captureStream(60)`, imported with `importExternalTexture` on every `requestVideoFrameCallback` and reduced. Output `q4.out`. Then the two probe arms of §4 on the real source.

| content | path | measured |
|---|---|---|
| photo, same origin (or CORS) | decode → `createImageBitmap` → `copyExternalImageToTexture` → reduce → `mapAsync`, once | decode 8.4-13.4 ms, upload 4.6-7.1 ms, reduce + map 1.1-1.6 ms warm (347 ms on the first call, pipeline compile) |
| photo, cross-origin without CORS | same | `SecurityError: … The external image is tainted by cross-origin data.` Nothing can publish |
| video, same origin | `importExternalTexture` per frame → reduce → `mapAsync` | import 0.3 ms p50 (0.6 p99); import → stats 1.4 ms p50, 2.3 p90, 3.3 p99, 29.7 max; 296 of 300 frames reduced |
| 2D canvas the consumer owns (fourier's plots) | the consumer's own renderer can reduce, or a `copyExternalImageToTexture` of the canvas per change | not measured |
| prose, CSS gradients, arbitrary DOM (chicago's `.ground`, fourier's paper) | none: no primitive exposes the paint | — |

**What publishes, then.** A library substrate (GPU frame reduction), a same-origin or CORS image (reduced once on decode, 15-22 ms total, off any hot path), a same-origin video (per frame, 1.4 ms), and a consumer's own canvas. Cross-origin media and arbitrary DOM cannot publish.

**E-2.** The probe tested both answers on the real source (§4):
- **Unpublished takes the bound** (registered initials lo 0, hi 1, which the solve turns into α 0.894 light, 0.853 dark). This is not a masking fallback: the bound is a state that works in paint on every input. M-2 is green over black, white, the checker and the stripes in both themes. It costs the ladder its identity wherever nothing publishes. It is also marked: the bus stamps `data-field="published"` only on surfaces it wrote.
- **The page publishes its ground** everywhere no substrate covers. This is the masking fallback: a surface over undeclared content inherits a claim that is false, paints thin, and fails silently (light fg 1.01 over black, dark fg 1.69 over white). E-2 rules it out.

**`declareField(el, {mean, lo, hi})` and E-7.** The probe exports it from `/glass` (`composables/glass/index.ts`); it publishes a one-tile field that follows the element's box. It is exported, so E-7 is met by the letter. Its sites are real (chicago's listing photos, value.js's uploaded image and camera, fourier's plots, per X.md §3). The risk is the one the charter names, two owners of one region, and declared statistics that go stale when the content changes. The strongest form narrows the API to *sources*, not numbers: `declareField(el)` on an `<img>`, `<video>` or `<canvas>` element, which the library reduces itself; a consumer never hands in a number. That keeps one source of record (P-3), and cross-origin media fails loud at `copyExternalImageToTexture` instead of lying.

### 1.5 Q5 · the CPU mirror as the static publication

**Command.** `node S/probe/q5-cpu-mirror.mjs`: `sampleAuroraField(DEFAULT_AURORA_CONFIG, x, y)` (imported from the worktree's TS through jiti) sampled every 6 px inside each tile of a 16×9 grid, composited over the page at the ceiling, reduced to tile p10/p90 and mean; compared with the frozen PRM frame (the HEAD raw capture) and with the 12 live frames of Q2. Output `q5.out`.

| cell | mirror vs frozen frame, worst-percentile \|Δ\| p50 / p90 / max | signed (mirror − painted) p05 / p95 | drift, live vs frozen, p90 / max | mirror on the unsafe side of live by > 0.02 Y | mirror CPU time, 144 tiles |
|---|---|---|---|---|---|
| light c1 | 0.017 / 0.086 / 0.186 | −0.079 / +0.099 | 0.096 / 0.285 | 8.4% of tile-frames | 94 ms |
| light c0.5 | 0.013 / 0.068 / 0.157 | −0.062 / +0.075 | 0.080 / 0.215 | 8.3% | 71 ms |
| dark c1 | 0.021 / 0.088 / 0.202 | −0.085 / +0.091 | 0.093 / 0.292 | 34.6% | 73 ms |
| dark c0.5 | 0.006 / 0.021 / 0.046 | −0.021 / +0.021 | 0.022 / 0.068 | 5.4% | 93 ms |

**Reading.** No. The mirror errs by up to 0.19-0.20 Y against the very frame it models, and on the unsafe side in 8-35% of tile-frames once the field moves. It could only stand in with a margin of about 0.2-0.3 Y, which puts the solve at the bound anyway, and it costs 71-94 ms of main-thread time per publication. Until the GPU reduction exists on an arm, that arm is unpublished and sits at the bound; the mirror stays what it is today, the placeholder ground.

### 1.6 Q6 · restyle cost at 12 docks, 30 and 60 Hz

**Commands.** `node S/probe/q6-restyle.mjs`, `q6b-restyle-leaf.mjs`, `q6c-restyle-registered.mjs` (HEAD build, 12 cloned docks over the live aurora, a synthetic value written per surface at the given rate, CDP `Performance.getMetrics` over 6 s), and `ARM=d3b-strict2 node S/probe/q6d-bus-cost.mjs` (the probe's real bus, 12 docks plus the 8 plates and the popover, 21 surfaces, 8 s). Outputs `q6.out`, `q6b.out`, `q6c.out`, `q6d.out`.

| writer | rate | RecalcStyle ms/s | Task ms/s | frames > 20 ms |
|---|---|---|---|---|
| none (field only) | — | 0.0 | 50.5 | 0/771 |
| dock root, unregistered inherited prop the veil reads | 30 Hz | 186.4 | 252.0 | 2/609 |
| dock root, same | 60 Hz | 347.1 | 425.7 | 4/572 |
| 21 surfaces, same | 60 Hz | 537.3 | 631.4 | 7/600 |
| `.dock-plate` leaf, same | 30 / 60 Hz | 38.5 / 65.0 | 105.2 / 142.0 | 1/625, 0/698 |
| dock root, registered `inherits: true` | 60 Hz | 293.3 | 371.7 | 1/753 |
| dock root, registered `inherits: false` | 60 Hz | 97.1 | 151.8 | 0/803 |
| dock root, unregistered, change > ε 0.01 on a ±0.03 drift | 60 Hz tick | 10.3 (117 writes / 6 s) | 57.4 | 0/802 |
| **the probe's bus** (21 surfaces, 3 registered `inherits: false` props, ε 0.004), light | every rAF | 38.8 (1648 style mutations / 8 s) | 120.9 (Script 36.6) | 0/1019 |
| the probe's bus, dark | every rAF | 57.4 | 152.2 (Script 39.1) | 0/1006 |
| HEAD build, same page, no writer | — | 0.0 | 46.8 (Script 16.0) | 0/1054 |

**Reading.** Publication rate is not the cost; change rate and inheritance are. An inherited property written on a dock root restyles the dock's subtree: 6-7 ms per publication at 12 docks. Registered `inherits: false` cuts that by 3×, and an ε gate on a realistic drift cuts writes by 30×. The probe's bus, with both, adds 39-57 ms/s of style and 21-23 ms/s of script at 21 surfaces and drops no frame. The per-frame DOM discovery (`querySelectorAll` + `getBoundingClientRect` per surface) is part of that script time; the strongest form replaces it with registration (§2).

## 2 · The strongest form

What the family must specify precisely to work, each item grounded in a measurement above:

1. **Publishers.** A library substrate reduces the frame it just drew, inside its own command encoder, before presentation, from a swap-chain texture configured with `TEXTURE_BINDING` (`useWebGPUCanvas.ts:228` gains the usage bit). It reduces **the composite as it paints**: the frame at the root's computed opacity over the page ground, on encoded channels (X.md's keyframes case: a 0.1-ceiling hero publishes the composite or it is wrong by the whole ceiling). The probe reads both on the CPU each frame (`getComputedStyle(root).opacity`, body `background-color` parsed as `rgb()`, failing loud on any other form).
2. **Statistics.** Per tile, 32×18: the mean, p05 and p95 of relative luminance from a 128-bin histogram, with p05 on the bin's lower edge and p95 on its upper edge (§1.1, §1.2).
3. **Validity.** A publication carries a predicate the bus reads on every apply: false while the arm cross-fade is in flight (inner opacity < 0.999) or when the ceiling moved since the reduction (a parked PRM substrate cannot re-reduce). An invalid publication reads as unpublished. In the live windows this shows as one frame at the bound (the "frame 3 0.000" rows of the first strict run), then the new reduction lands.
4. **Surfaces.** Each surface receives the worst p05 (light) or p95 (dark) over the tiles its rect touches padded by 3σ of its blur, and the area-weighted mean under its own rect, as `--glass-backdrop-luma{,-lo,-hi}`, registered `<number>`, `inherits: false`, initials 0 / 0 / 1. Writes only when a value moves by more than 0.004. A surface that no single valid publisher covers is unpublished. Discovery by selector each frame is the probe's shortcut; the spec registers surfaces from the components that own them (`GlassDock`, `PopoverContent`, `DialogContent`, `Card`) with a `ResizeObserver` and scroll/transform notification, and plain `.glass-*` markup stays unpublished (the bound) unless a component registers it.
5. **The solve**, per theme, in `@utility glass-plate`:
   ```css
   --glass-field-sign: calc(2 * var(--glass-field-dir) - 1);            /* +1 light, −1 dark */
   --glass-field-worst: calc(var(--glass-field-dir) * var(--glass-backdrop-luma-lo)
                           + (1 - var(--glass-field-dir)) * var(--glass-backdrop-luma-hi));
   --glass-field-e: calc(1.055 * pow(var(--glass-field-worst), 0.416667) - 0.055);
   --glass-veil-rest: clamp(var(--glass-veil-tier),
       calc(max(0, var(--glass-field-sign) * (var(--glass-need-e) - var(--glass-field-e)))
          / max(0.001, var(--glass-field-sign) * (var(--glass-pole-e) - var(--glass-field-e)))),
       1);
   ```
   `need` is the composite luminance the muted ink needs at its target (4.7 light, 4.6 dark); `pole` is `--card`. The sign term is load-bearing: the first probe run omitted it, and a field brighter than the pole (paper in light, the dark page in dark) solved α 1, painting every plate opaque. Both inks' and the pole's luminances must come from one source of record: the strongest form authors `--card` and `--on-glass-muted` as `oklch(L …)` with L as its own token and derives `Y = L³`; the probe restated them as numbers (P-3 debt, marked in `tokens/glass.css`).
6. **Unpublished is the bound**, and nothing else. There is no page publication by default (§1.4). A page that is only paper under its chrome says so by making its ground a publisher: `declareField(document.body)` on the element that paints it, which the library reduces, not a number the author asserts.
7. **The DOM between publisher and surface.** A surface whose stacking context contains a layer the publisher did not reduce (the modal scrim) is unpublished. The spec names the scrim (`[data-raw-hide]`'s `.bg-overlay-scrim`, `.glass-focus-veil`) and any `[data-glass-occluder]` as breakers the bus checks by `elementsFromPoint` at registration.
8. **Retired by E-1:** the DOM sampler (`backdropLuminanceSample.ts`, `useGlassBackdropLuminance.ts`, `backdropSampleMath.ts`, 746 lines), `GlassDock`'s `backgroundCanvas` prop and the `backdropMode: "live"` observer branch, the luma knee (`--glass-backdrop-luma-knee`, `glass-fx.css:145`), the bright bucket and every `contrast-color()` glass ink (common floor row 2). The probe removed the call and the knee's reader; the files and prop types are deletions the wave owes.

## 3 · The probe on the real source

### 3.1 What changed

`S/probe/d3b-probe.diff` (13 files, +86 −141, plus two new files of 156 and 160 lines):
- `composables/glass/field/fieldBus.ts` (new): the registry, the per-frame apply, `declareField`.
- `composables/glass/field/reduceFrame.ts` (new): the WGSL reduction, the ring of 3 `MAP_READ` buffers, the validity predicate.
- `components/aurora/composables/wgpuSetup.ts`: the live (opaque) palette arm encodes the reduction after its render pass and maps after submit.
- `composables/glass/webgpu/useWebGPUCanvas.ts`: `usage: RENDER_ATTACHMENT | TEXTURE_BINDING`.
- `GlassDock.vue`: the `useGlassBackdropLuminance` call and import deleted.
- `tokens/property-regs.css`: the three registrations above, replacing the inherited `--glass-backdrop-luma`.
- `tokens/glass.css`, `tokens/dark-arm.css`: the pole (`--card`), the solve inputs, and the rung floors: light base 0.26, step 0.08 (wash 0.10 … overlay 0.42, dock 0.18); dark base 0.52 (wash 0.36 … overlay 0.68).
- `glass/veil.css`: the solve.
- `glass/ladder.css`, `dock/styles/adaptive-legibility.css`, `dock/styles/shell.css`: the bright bucket and the `contrast-color()` inks removed (common floor row 2); the dock's muted register reads `--on-glass-muted`.
- `glass/material.css`: `contain: paint` dropped (common floor row 1).
- `dock/styles/dock.css`: `.dock-plate` takes the three properties by `inherit` from the dock root.

Not done in the probe: the image arm of the aurora, the WebGL2 arm, blob and constellation substrates, component registration, the perimeter ink, and the scrim breaker.

### 3.2 The battery

**Commands.** `D3_OUT=S/out node docs/tranches/BL/design/material/harness/run.mjs S/wt --label <arm>` for three arms (the page arm was run once with the sign bug, `d3b-page`, which painted every plate opaque and is discarded):
- `d3b-strict2`: the final form above (unpublished = the bound).
- `d3b-page2`: the same plus one rule publishing the page's luminance under every surface no substrate covers.

Logs: `S/out/caps/<arm>/results/<id>.log`. Chromium is the gate; Playwright WebKit rows are informational and paint-only; real Safari UNMEASURED (owner's safaridriver checkbox).

| witness | HEAD (harness §3) | D3-B strict (final) | D3-B page publication |
|---|---|---|---|
| M-1 no grey | FAIL 11/11 | **FAIL 11/11**, by 0.001: every plate `#fdf5ed` L 0.974 C 0.0137 ΔE 0.016 against a floor of L 0.975 (the bound α 0.894 over paper; `--card` is L 0.974) | FAIL 2/11: plates L 0.980-0.984, ΔE 0.003-0.008 (green); the opaque escape L 0.974 and the real Dialog `#a7a096` L 0.710 (the scrim under a thin plate) fail |
| M-2 text | FAIL 169/560 | **FAIL 2/560**: only the real Dialog's muted caption over the aurora, 4.20 (c1) and 3.23 (c0.5), the scrim case. Every hostile ground green in both themes: light over black muted ≥ 4.79, dark over white ≥ 4.51 (4.47 at the 4.5 target in the first strict run, cured by 4.6) | FAIL 88/560: light over black fg 1.01, muted 1.16; dark over white fg 1.69, muted 1.09; checker and stripes 1.83-3.17 |
| M-3 non-text | FAIL 237/266 | FAIL 209/266: the well perimeter (`--ink-perimeter`) and the focus rings are untouched ink, 2.29-2.92 in light | FAIL 225/266 |
| M-4 dock register | FAIL 14/14 | FAIL 14/14: fg = muted = `#705942` (light) and `#c3b9ac` (dark). No longer `#000`/`#fff`; the inactive tab reads the muted register, so fg equals muted. An ink decision this family leaves static | FAIL 14/14 |
| M-5 live dock, no readback | FAIL 6/16 | **PASS 16/16**: 0 `getImageData`, 0 `readPixels` in every 9 s live window, default and fed; dock fg/muted 4.62/4.68 (light c1), 4.76/4.76 (light c0.5), 5.18/4.95 (dark c1), 5.19/4.92 (dark c0.5) | PASS 16/16 |
| M-6 separable ladder | FAIL 14/19 | FAIL 8/19: over paper every rung is unpublished and at the bound, adjacent ΔE 0.000 in both themes; every dark plate 0.131 from the page (green) | FAIL 5/19: light adjacent 0.000-0.004 (infeasible, §0 finding 6); dark adjacent 0.010-0.014 with resting→floating at 0.010 read as a fail; dark plates 0.055-0.150 from the page (green) |
| M-7 halos whole | FAIL 8/8 | **PASS 8/8** (floor row 1): reach 18 px light, 17 px dark in every host | PASS 8/8 |
| M-8 chrome calm | FAIL 8/8 | **PASS 8/8**: chroma 0.019-0.021 light, 0.029-0.034 dark; bleed 1.00-1.05 | FAIL 8/8: chroma 0.049-0.070 (thin plates over undeclared stripes) |
| **W-B the substrate publishes** | FAIL 20/24 | FAIL 7/24. **Readbacks 0 in all 8 live windows. Latency 2 frames in 7 of 8 steps.** Leg 1 published vs harness-painted mean: 0.281/0.266, 0.530/0.494, 0.281/0.271, 0.073/0.081. Against a clean raw (`node S/probe/wb-clean.mjs S/out/builds/d3b-strict2/dist`): Δ 0.001, 0.001, 0.001, 0.000. The light c1 → 0.5 steps settle at 0.491 against a leaky 0.455. The 4 WebKit rows are "no dock" | (same bus) FAIL 7/24 |
| W-A (A's witness) | FAIL 68/197 | FAIL 11/197 | FAIL 44/197 |
| W-C, W-D, W-E, W-F | FAIL | FAIL (not this family's centre) | FAIL |

**W-B, precisely.** Its three legs, against this probe:
- leg 2 (zero synchronous readbacks) is green;
- leg 3 (within 2 frames) is green in 7 of 8 steps and in all 8 once the painted reference is clean;
- leg 1 (±0.02 of the painted mean) is green on a clean raw.
The witness goes GREEN in full once `capture.mjs`'s `raw` mode hides the dock's subtree. That cure belongs to the harness, which this seat may not edit. Real Safari: UNMEASURED (owner's safaridriver checkbox).

**Cost, measured in the probe:** GPU 115-127 µs per frame at the DPR-2 backing size; publication 2.8 ms p50 after submit; main thread 21-23 ms/s script and 39-57 ms/s style at 21 surfaces (§1.6). Source: +316 new lines, −746 of the sampler once deleted.

### 3.3 Chrome and Playwright WebKit

- **Chromium 149:** the whole path runs: WebGPU reduction, `pow()` in `calc()` inside a relative-colour alpha, registered `inherits: false` properties taken by explicit `inherit`, and the solve over every ground.
- **Playwright WebKit 26.5, paint-only:** no `navigator.gpu`, so the aurora runs its GL arm and nothing publishes. Every surface sits at the bound, and the paint-only rows agree: light M-2 muted 4.58-5.72 over black, the aurora and white; M-1 fails by the same 0.001 (L 0.974); the CSS solve with `pow()` resolves (the bound α paints). `GlassDock` still crashes the page, so every dock row is UNMEASURED in Playwright WebKit.
- **Real Safari:** UNMEASURED (owner's safaridriver checkbox). Safari 26 ships WebGPU and `mapAsync` (BCD, per the portfolio), so the arm is expected to run there. Neither its latency nor the canvas's alpha and premultiply behaviour under `TEXTURE_BINDING` is measured.

## 4 · Public API and consumer impact

**API.**
- **New:** `declareField(el)` on `/glass`. The probe's shape takes numbers; the spec's takes a media element (§1.4). Also the three registered properties, as a read-only contract that `data-field="published"` marks.
- **Removed (E-1):** `GlassDock`'s `backgroundCanvas` prop; `backdropMode: "live"`'s observer (`"static"` stays as the level-0 escape); `--glass-backdrop` as a bucket; `--glass-backdrop-luma-knee`.
- **Changed:** `--glass-veil-tier` now means the rung's floor α of the `--card` pole, not an ink alpha. Any consumer override of a tier (chicago's `max(<token>, 0.62)`) changes meaning.

**Consumers** (read-only census from X.md, not re-measured here):
- **value.js.** Its atmosphere is `useAurora` on the consumer's own canvas, in WebGL2 or `"css"` mode (X.md §0.3). This probe publishes only from `<Aurora>`'s WebGPU arm, so value.js gets nothing until publication moves into `useAurora` and covers the WebGL2 arm, and the `"css"` arm, which has no GPU at all, stays at the bound. Its panes are content plates over the atmosphere; at the bound they read near-opaque `--card`. That keeps its certified-ink model solvable (THE STOP, X.md §3.3) but not by the ink's own solve. The `data-glass-field-canvas` stamp and `derivedLightness` retire in its tranche (E-6).
- **keyframes.js.** The `:background-canvas` binding (`ChromeDock.vue:370`) goes. The hero aurora at ceiling 0.1 over graph paper publishes the composite, which the probe computes from the root opacity, so it is correct by construction. Its 11 `.glass-*` class uses stay unpublished (the bound) unless its components register them.
- **fourier-analysis.** Nothing publishes for prose, its plots or its `isolate` paper. Everything sits at the bound: legible, and it ends GLASS-VEIL-GREY in light, since the bound α 0.894 `--card` is not grey (ΔE 0.016 from paper, C 0.014). But it is also the opaque look fourier escaped to (`.glass-opaque` Configurator). A `declareField(canvas)` on its plots is the only way to thin them.
- **chicago.** Listing photos are scraped and cross-origin; unless served with CORS they cannot publish (the `SecurityError` above), so the dock over photos sits at the bound. That is legible in both themes, and it retires the 0.62 floor by addendum, which X.md measured as breaking light (fg 2.90-3.92).

## 5 · Weaknesses, as named counterexamples

1. **The modal scrim.** A DOM layer between the publisher and the surface falsifies the publication: Dialog muted 4.20 and 3.23 over the aurora in the final probe. Any `backdrop-filter` or tinted layer the substrate did not draw breaks it the same way, including a nested glass plate over glass.
2. **The page publication lies.** Measured on the real source: light fg 1.01 over black, dark fg 1.69 over white, M-8 chroma 0.070. Removing it (the E-2-clean arm) makes the family's adaptive look reachable only over library substrates and declared media.
3. **Over the shipped hero it is never thin.** Light muted needs α 0.43-0.87 on every pixel of the ceiling-1 aurora (§1.3), and the probe paints 0.76-0.77 there. The family's "maximum transmission" pays out over ceiling 0.5, the dark page, and whatever is declared.
4. **The ladder collapses where nothing publishes.** Every unpublished rung is at the same bound α, so M-6 adjacency reads 0.000 over paper in both themes. In light, one `--card` pole cannot give four 0.01 steps inside M-1's 0.02 radius even when everything publishes (§0 finding 6).
5. **`--card` is under the paper's L floor.** L 0.974 against 0.975: every surface at or near the bound fails M-1 by 0.001. The pole needs its L at or above the paper's minus 0.01, which is a token change outside the signal.
6. **The WebGL2 and `"css"` arms publish nothing.** Playwright WebKit, software raster, value.js's atmosphere and any WebGPU-less engine get the bound. A GL publication through `readPixels` into a PBO is asynchronous but counts as a readback under W-B's wording.
7. **Integrated GPUs and Safari are unmeasured.** Cited Intel iGPU `mapAsync` is 5-15 ms (2023, Dawn polling), so 1-2 frames of latency there is a claim, not a measurement. SwiftShader shows the failure mode: 0.3-1.2 s latency, 6 of 240 frames published.
8. **Cold start.** The first reduction pays a 347 ms pipeline compile (the photo probe's first call; W's T7 cold p99 182 ms). Until then every surface is at the bound. That is correct under E-2, and it is a visible one-time step from thick to thin at page load, which D-1's weighted motion must dress (the veil's `background-color` transition rides `--spring-press`).
9. **Two owners.** A declared region overlapping a substrate: the probe takes the first publisher that fully covers the rect, not the topmost in paint order. The spec needs paint order.
10. **Per-surface restyle.** Inheritance and change rate drive the cost; an inherited write at the dock root costs 6-7 ms per publication at 12 docks. The spec depends on `inherits: false` and the ε gate. A fast pointer-driven field (the gel pulse) raises the change rate and was not measured.
11. **The dock register.** Static ink leaves M-4 RED (fg = muted on the inactive tab) and M-3 RED (the perimeter at 2.29-2.92); this family moves the veil, not the ink.

## 6 · Open gaps

- Real Safari: `mapAsync` latency, reduction cost, and the `TEXTURE_BINDING` swap chain's alpha and premultiply behaviour: UNMEASURED (owner's safaridriver checkbox).
- Integrated GPU (Intel/AMD iGPU) reduction cost and `mapAsync` latency on Chrome 149: no hardware here.
- The WebGL2 arm's publication, and whether a PBO + `fenceSync` read is acceptable under W-B and M-5.
- `useAurora` (value.js's path), the image-source arm (`setupImageWGPU`), blob and constellation substrates: no reduction written.
- The scrim/occluder breaker (§2 item 7) and component registration (§2 item 4): specified, not probed.
- The harness `raw` leak (§0 finding 2): W-B goes green only after `capture.mjs` hides `[data-spec] *`; the probe's clean re-read is `S/probe/wb-clean.mjs`.
- A pointer-driven field (the gel snap-back) against the 2-frame window: drift measured only for the autonomous drift.
- The pole's L (M-1's 0.001 miss) and the light ladder's separation over paper: both need a pole or floor decision outside the signal.
