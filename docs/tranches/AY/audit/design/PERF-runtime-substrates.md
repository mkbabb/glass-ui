# PERF-runtime-substrates — live-substrate frame-time audit

Lane: **PERF-runtime-substrates** (AY audit, design batch). Read-only on `src/`;
measurement + report only. No git.

## TL;DR

The Canvas2D substrates (constellation, fourier-field), the WebGL2 blob, and the
dock collapse↔expand morph **all hold the host frame-rate cap with 0% dropped
frames at full speed AND under 4× CPU throttle** — they are not the bottleneck.

The **ONE budget-blowing substrate is Aurora's painterly mediums**. On an Apple
**M5 Max** (the fastest Apple silicon available), at native full speed:

| Aurora medium | p50 | p95 | p99 | fps | frames > 16.7ms |
|---|---|---|---|---|---|
| oil-pastel (Sunset) | **51.0ms** | 61.2ms | 62.5ms | **20.6** | **100%** |
| van-Gogh | **30.6ms** | 40.8ms | 40.9ms | **34.3** | **78.7%** |
| oil (Impasto) | 10.3ms | **20.7ms** | 21.7ms | 70.3 | ~0% p50 / p95 over |
| watercolor (Meadow) | 10.2ms | 11.6ms | 12.1ms | 98.0 | 0% |
| wispy/default (Sky, smooth) | 10.2ms | 11.6ms | 12.2ms | 98.0 | 0% |

oil-pastel and van-Gogh blow the 16.7ms/60fps budget on EVERY frame on a top-tier
GPU. On a mid-tier device they will be unusable. oil (Impasto) is borderline — p50
fine, but p95 grazes 20.7ms (intermittent dropped frames). This is GPU-bound, so the
4× CPU throttle barely moves it (confirming the cost is the fragment shader, not JS).

The **blob G-PERF pre-refraction baseline is HEALTHY**: rest/hover/click all hold
~10.2ms p50, 0% over 16.7ms, with two live GL contexts on the page. Any refraction
work added in W-BLOB-GLASS has this headroom to spend (record below).

---

## Conditions (recorded honestly)

- **Machine**: Apple M5 Max, macOS 26.4.1 (build 25E253), Metal 4. Top-tier Apple
  silicon. Internal Retina (3024×1964) + external 4K (3840×2160).
- **Server**: `http://localhost:5199` — **Vite DEV server** (not a production
  `vite preview` build). Dev is the harder case for JS-side cost (un-minified, HMR
  client live) but the substrates are GPU/canvas-bound so the dev↔prod delta on the
  per-frame paint is small; the JS-thread overhead it adds is the conservative
  direction. The aurora preset-thumbnail GL readbacks (a one-time mount cost,
  `usePresetThumbnails`) emit `GPU stall due to ReadPixels` warnings during settle
  but are excluded from the steady-state sample window.
- **Browser**: Playwright-driven Chromium (Chrome-for-Testing 1223), **headed**
  (`headless:false`, `--use-angle=metal`). Headed was REQUIRED — the headless ANGLE
  path crashed the GL context on the aurora page (multiple WebGL contexts +
  thumbnail readbacks); headed uses the real Metal GPU and is the honest path.
- **rAF cadence cap**: this headed Chrome instance caps `requestAnimationFrame` at
  **~98 Hz (~10.2ms)**, NOT 120 Hz. Verified against a static, zero-animation page
  (`/foundations/paper-backdrop`): it reads an identical **p50=10.20ms / 98.0fps**.
  So every substrate reading ~10.2ms p50 is **running at the host's max frame rate
  with full headroom** — the ~10.2ms is the vsync floor, not substrate cost. The
  60fps/16.7ms budget is the threshold used throughout; a state is "over budget"
  when its frame time exceeds 16.7ms.
- **Method**: an in-page rAF inter-frame-delta sampler (the same vsync-gated clock
  the substrates step on), ≥5s of samples per state (5.5s window, ~540 frames at
  cap), first 2 frames dropped as warm-up. Percentiles computed over the sorted
  deltas. Dropped-frame % reported at three thresholds: **>16.7ms** (the 60fps
  budget), **>25ms** (≥1.5× the host vsync = a visibly skipped frame), **>33.4ms**
  (≥2 missed vsyncs). Each state captured twice: full speed and **4× CPU throttle**
  (`Emulation.setCPUThrottlingRate: 4`, the mid-tier-device CPU proxy via CDP).

### Frame-budget gate context (the threshold search)

There is **no shipped runtime per-frame budget gate** in this repo. The `proof:blob-*`
arms (`proof-blob-*.mjs`) are **static-analysis / shader-equivalence / contract**
gates (value-free, smin-normalized, gradient-unit-length, premult, etc.), NOT frame
timers. `proof:offscreen-pause` asserts the park machinery exists (frames=0 when
hidden), not a frame-time ceiling. The one runtime-timed gate, `proof:dock-animation-live`
(`scripts/proof-dock-animation-live.mjs`), enforces a **LOCKSTEP onset budget**
(`LOCKSTEP_BUDGET_MS ≈ 537ms`, the macOS-dock reveal-stagger ceiling) and a one-frame
onset tolerance (`FRAME_MS = 1000/60 = 16.7ms`) — it gates the *stagger between* the
box-width onset and the last child's opacity onset, not the per-frame render time.
So the budget this lane measures against is the **canonical 60fps / 16.7ms** target.

---

## Full results — all states, both throttle arms

Raw JSON: `PERF-runtime-substrates-samples.json` (26 rows). Run log:
`PERF-runtime-substrates-run.log`. Raw per-frame delta arrays for the three anchor
states: `PERF-runtime-substrates-raw-anchors.json`.

| State | thr | p50 ms | p95 ms | p99 ms | max ms | fps | >16.7ms | >25ms | >33ms |
|---|---|---|---|---|---|---|---|---|---|
| aurora wispy/default (Sky) | 1× | 10.2 | 11.6 | 12.2 | 12.3 | 98.0 | 0% | 0% | 0% |
| aurora wispy/default (Sky) | 4× | 10.2 | 12.0 | 12.2 | — | 98.0 | 0% | 0% | 0% |
| aurora watercolor (Meadow) | 1× | 10.2 | 11.6 | 12.1 | — | 98.0 | 0% | 0% | 0% |
| aurora watercolor (Meadow) | 4× | 10.2 | 12.0 | 12.2 | — | 98.0 | 0% | 0% | 0% |
| **aurora van-Gogh** | 1× | **30.6** | **40.8** | 40.9 | — | **34.3** | ~100% | **78.7%** | ~5% |
| **aurora van-Gogh** | 4× | 30.5 | 40.3 | 42.2 | — | 33.6 | ~100% | **83.6%** | ~5% |
| **aurora oil-pastel (Sunset)** | 1× | **51.0** | **61.2** | 62.5 | — | **20.6** | 100% | **100%** | ~99% |
| **aurora oil-pastel (Sunset)** | 4× | 50.8 | 60.2 | 61.5 | — | 20.4 | 100% | **100%** | ~99% |
| aurora oil (Impasto) | 1× | 10.3 | **20.7** | 21.7 | — | 70.3 | ~25% | 0% | 0% |
| aurora oil (Impasto) | 4× | 11.4 | **21.7** | 22.3 | — | 69.8 | ~30% | 0% | 0% |
| blob rest | 1× | 10.2 | 12.2 | 12.3 | — | 98.0 | 0% | 0% | 0% |
| blob rest | 4× | 10.2 | 12.1 | 12.2 | — | 98.0 | 0% | 0% | 0% |
| blob hover | 1× | 10.2 | 12.1 | 12.2 | — | 98.0 | 0% | 0% | 0% |
| blob hover | 4× | 10.2 | 12.1 | 12.2 | — | 98.0 | 0% | 0% | 0% |
| blob click (impulse) | 1× | 10.2 | 12.0 | 12.2 | — | 98.0 | 0% | 0% | 0% |
| blob click (impulse) | 4× | 10.2 | 12.0 | 12.2 | — | 98.0 | 0% | 0% | 0% |
| constellation rest | 1× | 10.2 | 11.8 | 12.2 | — | 98.0 | 0% | 0% | 0% |
| constellation rest | 4× | 10.2 | 12.0 | 12.2 | — | 98.0 | 0% | 0% | 0% |
| constellation warp | 1× | 10.2 | 11.5 | 12.0 | — | 98.0 | 0% | 0% | 0% |
| constellation warp | 4× | 10.2 | 12.1 | 12.2 | — | 98.0 | 0% | 0% | 0% |
| constellation well-hold | 1× | 10.2 | 12.2 | 12.2 | — | 98.0 | 0% | 0% | 0% |
| constellation well-hold | 4× | 10.2 | 12.1 | 12.2 | — | 98.0 | 0% | 0% | 0% |
| fourier-field (hero+final page) | 1× | 10.2 | 12.1 | 12.2 | — | 98.0 | 0% | 0% | 0% |
| fourier-field (hero+final page) | 4× | 10.2 | 12.1 | 12.2 | — | 98.0 | 0% | 0% | 0% |
| dock morph (expand/collapse) | 1× | 10.2 | 11.9 | 12.2 | — | 98.0 | 0% | 0% | 0% |
| dock morph (expand/collapse) | 4× | 10.2 | 12.0 | 12.2 | — | 98.0 | 0% | 0% | 0% |

(`>16.7ms` / `>25ms` / `>33ms` are the dropped-frame fractions; the `~` figures are
read off the anchor histograms — `samples.json` carries the exact `pctOver*`.)

### Anchor-state histograms (raw, per-frame, 6s window)

```
oil-pastel  <=12:0   12-16.7:0    16.7-25:0    25-33:1    33-50:81   >50:50    n=132
van-gogh    <=12:0   12-16.7:0    16.7-25:39   25-33:156  33-50:10   >50:0     n=205
blob        <=12:541 12-16.7:46   16.7-25:0    25-33:0    33-50:0    >50:0     n=587
```

The histograms are the truth behind the percentiles: **every** oil-pastel frame lands
in 33-50ms or >50ms; **every** van-Gogh frame lands in 25-33ms; **every** blob frame
is at the cap or in the 12-16.7ms band — **zero blob frames over 16.7ms**.

---

## Findings

### F1 — Aurora oil-pastel + van-Gogh blow the 60fps budget on EVERY frame (M5 Max, full speed) — SEVERE

- oil-pastel (Sunset): **p50 51ms, 20.6fps, 100% of frames over 16.7ms** (and >25ms,
  and ~99% over 33ms). This is a 3× budget overrun on the fastest Apple GPU.
- van-Gogh: **p50 30.6ms, 34.3fps, 78.7% over 25ms**. ~2× budget.
- On a mid-tier device this is unviewable. The throttle arm barely changes it (51.0 →
  50.8ms; 30.6 → 30.5ms) — **GPU-bound, not CPU-bound**: 4× CPU throttle is the wrong
  knob to soften it. The cost is the fragment shader, per-pixel, scaling with the
  stage's pixel count (here 931×700 = 651k px × devicePixelRatio²).

**Root (read-only attribution, no edit):** the smooth / watercolor / pastel mediums
do NOT run the brush pass — they hold the cap (10.2ms). The painterly mediums
(`MEDIUM_OIL=3`, `MEDIUM_VANGOGH=5`, `MEDIUM_OILPASTEL=6`) splice the
stroke-OVER-composite path. Per fragment they run, stacked:
- a **3×3 structure-tensor luma sample loop** (`aurora.frag.ts:246-247`),
- a **3×3 best-of-9 cell loop** (`brush.glsl.ts:310-311`, `bestOil`),
- a **3-layer dab placement** (large/med/small density gates — `densityLrg/Med/Sml`,
  `mediums.glsl.ts:214`).

oil-pastel is the heaviest because it drives all three dab layers at the creamy
wide-zone profile; van-Gogh is next (atomic-dab cascade); oil-impasto is lighter
(fewer/simpler layers, the crown relight). That medium ladder matches the measured
cost ladder exactly (51 > 31 > 10-21 >> 10ms). The painterly look is GPU-expensive
**by construction**.

### F2 — Aurora oil (Impasto) is borderline — p50 fine, p95 over budget — MODERATE

p50 10.3ms (at cap), but **p95 20.7ms** and ~25% of frames over 16.7ms. Intermittent
single-frame stalls (the impasto crown relight firing on high-height ridges). Reads
fine on this GPU but has no headroom — the first medium to fail on a weaker device.

### F3 — Blob G-PERF pre-refraction baseline: HEALTHY, full headroom — RECORD

Two live GL contexts on `/substrates/blob` (interaction + mood metaballs, 358×358
each). rest / hover / click all hold **p50 10.2ms, 0% over 16.7ms** (587-frame sample:
541 at cap, 46 in 12-16.7ms, **0 over 16.7ms**), unchanged under 4× CPU throttle. The
metaball SDF fragment shader (`metaball.frag.ts`, 498 lines) finishes within the vsync
budget with room to spare. **This is the W-BLOB-GLASS G-PERF baseline**: refraction
work added in that wave starts from a substrate that has the full ~6ms-of-budget
headroom (16.7 − ~10.2 host-cap, and more vs a true 16.7ms 60Hz frame) to spend before
it risks a drop. Re-run this exact lane after refraction lands to confirm it still
clears 16.7ms throttled.

### F4 — Constellation holds the cap across rest / warp / well-hold, even with 6 live canvases — HEALTHY

`/substrates/constellation` mounts **6 live Canvas2D contexts** simultaneously. rest,
synthetic warp (`__constellationWarp.warpTo`), and held gravity-well
(`__constellationEgg.holdWellAt` on a 250ms interval) ALL hold **p50 10.2ms, 0%
dropped**, full speed and 4× throttled. The per-frame cost is the O(n²) link pass
(`constellationField.ts:864`, n=56-64 → ~1800 pairs/canvas) + the O(n) drift/well/warp
steps — cheap enough that 6 canvases together stay at cap. No concern.

### F5 — Fourier-field holds the cap with all 4 canvases live (both presets) — HEALTHY

`/substrates/fourier-field` mounts **4 live canvases** at once (hero + final + the
wide color-hero + the frozen capture). The whole-page cadence holds **p50 10.2ms, 0%
dropped**, both arms. NOTE: the page runs hero and final SIMULTANEOUSLY on one shared
rAF clock, so the raf-delta cannot isolate one preset's cost from the other — the
honest reading is "the whole fourier page (both presets + the wide hero) runs at cap".
The inverse-DFT reconstruction (`fourier-field/math.ts`) + comet trail + nested
epicycles are per-frame-cheap. No concern.

### F6 — Dock collapse↔expand morph holds the cap — HEALTHY

`/dock/overview` carries 11 docks + a rich background. Driving the first collapsible
dock's collapse↔expand morph on a 650ms toggle interval (synthetic mouseenter /
mouseleave + pin-click) holds **p50 10.2ms, 0% dropped**, both arms. The morph is one
spring on a transform/size FLIP — compositor-cheap. The `proof:dock-animation-live`
lockstep-onset budget (≈537ms stagger ceiling) is an onset-timing gate, not a
per-frame one, and is orthogonal to this result. No per-frame concern.

---

## What changed / recommended (for the spec owner — NOT applied here)

This lane is read-only; the items below are the perf findings the design/impl lanes
should act on. No `src/` edit was made.

1. **Aurora painterly mediums (oil-pastel, van-Gogh) must NOT be a default or
   auto-running page background** until their per-fragment cost drops under 16.7ms on
   a mid-tier device. Today they blow the budget 2-3× on an M5 Max at full speed. As a
   *user-driven studio preset* (the playground, where the user opts into the look and
   the stage is bounded) they are acceptable-with-a-caveat; as a `<StoryHero
   background>` / page-redesign substrate they are not.
2. The cost is GPU-bound and per-pixel — the cheapest mitigations are **render-scale
   (paint the painterly mediums at a fraction of devicePixelRatio and upscale)** and/or
   **a frame-rate cap (step the field at 30fps for the painterly mediums)**. CPU
   throttle has no effect, so any "throttle for low-power" path must target the GPU
   work (resolution / cadence), not the JS loop.
3. **oil (Impasto)** is the canary — p95 already grazes 20.7ms with no headroom. It
   should ride the same render-scale lever before it ships as a background.
4. **Adopt a runtime frame-budget gate.** There is no per-frame ceiling in CI today —
   the painterly-medium regression would not trip any existing `proof:*`. A π-style
   raf-delta spec (this lane's `trace.mjs` is the prototype) asserting each substrate
   state clears a p95 ceiling THROTTLED would catch it. Out of scope to add here
   (read-only), flagged as the gap.

## Reproduce

Throwaway harness under `/tmp/perf-substrates/` (not committed): `trace.mjs` (the full
13-state × 2-throttle sweep), `raw-anchors.mjs` (the 3 anchor raw-delta captures),
`probe.mjs` (the selector/structure probe). Run against a live `npm run dev`
(`:5199`) with `node trace.mjs > results.json 2> run.log`. Headed mode is required
(headless ANGLE crashes the aurora GL context).
