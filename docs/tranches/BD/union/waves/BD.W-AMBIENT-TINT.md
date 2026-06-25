# BD.W-AMBIENT-TINT — the backdrop hue the glass absorbs (the ambient-hue rider, reading the HOISTED hueHistogram leaf)

**Band 6 · depends: W-HUE-HISTOGRAM-HOIST (T1 — reads the ONE `composables/color/hueHistogram.ts` accumulator leaf; no second binning copy) · canonical source for `BE.W-AMBIENT-TINT` (BF carries no own copy)**

## The defect / the ask + the EXACT HEAD state (verified on disk)

iOS-27's defining glass move: the plate ABSORBS the room's HUE — the now-playing pill warms violet over "Your Essentials," teal over "Chill" (f_009/f_018: the same pill, a sub-perceptual cast per album). The sampled-luminance observer `useGlassBackdropLuminance` already samples the painted backdrop to derive the legibility DARKEN (the W55/AZ adaptive seam), but the HUE the plate floats over is not yet biased into the tint.

**The histogram ALREADY EXISTS at HEAD, INSIDE the observer** (VERIFIED on disk — the BE pool spec built it; it has since landed):
- `src/composables/glass/useGlassBackdropLuminance.ts:117-227` — a 12-bucket chroma×alpha-weighted OKLCh hue histogram (`AMBIENT_HUE_BUCKETS = 12`, `makeHueHistogram`/`accumulateHuePixel`/`resolveAmbientHue`) accumulated INSIDE the EXISTING per-pixel `getImageData` loop (the SAME pass — NO second canvas), the sRGB→OKLCh routed through value.js's primitives (the `proof:single-color-core` fence), a chroma×alpha weight (a gray pixel contributes ~0 — the gray-room-tints-nothing null), the modal hue refined via circular mean, written at a FIXED sub-perceptual `AMBIENT_HUE_L=0.72`/`AMBIENT_HUE_C=0.06`, a `AMBIENT_NULL_MASS=0.004` gray-null floor.
- `:448` — `el.style.setProperty("--glass-ambient-hue", result.ambientHue);` — the token IS written.

So the SAMPLER half is built. **What is NOT yet built (the born-RED anchor):** (1) the histogram is BURIED in `useGlassBackdropLuminance.ts` (W-HUE-HISTOGRAM-HOIST hoists it to `composables/color/hueHistogram.ts` as the ONE accumulator home; this wave reads the hoisted leaf — NO second binning copy survives); (2) the BIAS — `--glass-ambient-hue` is WRITTEN but NOT CONSUMED by the tint cascade (the plate absorbs no hue yet); there is NO `--glass-ambient-strength` opt-in knob. This wave WIRES the absorption: bias `--glass-tint-source` toward the sampled hue at a NEW opt-in `--glass-ambient-strength` (default 0%, ≤8% ceiling) through the EXACT existing tint cascade — ZERO new compositing seam.

## The mechanism — the bias on the existing cascade, the hoisted histogram, ZERO second pass

1. **Read the HOISTED histogram leaf (the no-dual-path consolidate).** W-HUE-HISTOGRAM-HOIST (T1) lifts the 12-bucket accumulator (`makeHueHistogram`/`accumulateHuePixel`/`resolveAmbientHue` + the `AMBIENT_HUE_*` constants) OUT of `useGlassBackdropLuminance.ts` INTO `composables/color/hueHistogram.ts` (the ONE accumulator home, beside the `composables/color` OKLCh primitives). The observer re-imports it (byte-identical behaviour — the hoist is the prerequisite, not this wave's work). This wave CONSUMES the hoisted leaf — it never re-implements a second binning copy (the W-AUR-ALBUM sibling also reads the ONE leaf; the gate asserts ONE home).
2. **The bias seam, on the EXISTING cascade (`ladder.css`).** The self-engage re-point (`ladder.css:154/213/275`) sets `--glass-tint-source: var(--glass-tint-ink)` today; extend it to `--glass-tint-source: color-mix(in oklab, var(--glass-tint-ink), var(--glass-ambient-hue) var(--glass-ambient-strength))`. A NEW `@property --glass-ambient-strength` (`<percentage>`, initial `0%` — the no-op floor; registered in `property-regs.css` beside `--glass-accent-strength`) is the opt-in knob, bounded ≤8% in the cascade. At `0%` the mix is the un-biased `--glass-tint-ink` BYTE-IDENTICAL (the `color-mix(… 0%)` identity). The `@property --glass-ambient-hue` (`<color>`, `inherits:true`, `initial-value: transparent`) is the neutral identity (already written by the observer at `:448`).
3. **Wire-ON for the DOCK only** (the H3 arm-a precedent — the dock's now-playing surface is the binary consumer). Every other surface stays at the `0%` no-op default (opt-in via `--glass-ambient-strength`). The demo-private barrel posture is preserved (the observer is off the public glass barrel; the dock is the binary consumer; `docs/consumer-evidence/use-glass-backdrop-luminance.md` names the booked 2nd-binary).

**Compositor-only / Safari-safe / PRM:** the histogram is JS over the EXISTING getImageData (no paint); the bias resolves onto the field's already-painted `color-mix` ONCE per frame (the same cost as the existing tint — free). The ≤4 Hz throttle + IntersectionObserver gate + hidden-park are INHERITED (the existing `sampleIntervalMs`/PRM-park machinery). PRM collapses to the single mount sample (the loop's `if (prefersReduced) return` guard) — the bias is a static cast under reduce. Cross-engine: getImageData + `color-mix(in oklab)` are universal Baseline (Safari ✓).

## The gate — `proof:ambient-hue` (NEW; born-RED → GREEN)

`scripts/proof-ambient-hue.mjs`, `tags: ["local","ci"]` (the binding hue PAINT is the π). Device-free SOURCE + the cited substrate seams. Born-RED at HEAD (the bias + the `--glass-ambient-strength` knob do not exist; the histogram is un-hoisted) → GREEN at build.

- **A1 — the histogram is the ONE hoisted leaf, a FREE rider in the SAME loop.** The hue accumulation lives in `composables/color/hueHistogram.ts` (the hoisted home, W-HUE-HISTOGRAM-HOIST) AND the observer imports it + runs it INSIDE the existing per-pixel loop — NO second `getImageData`, NO second canvas, NO second pass, NO second binning copy. Born-RED: a second `getImageData`/`createElement('canvas')` for hue, OR a second in-place histogram (un-hoisted), reds (the no-2nd-pass + no-dual-path fence). The detector counts the getImageData call-sites stay at the HEAD count + asserts ONE `accumulateHuePixel` definition (the hoisted leaf).
- **A2 — the value.js color source.** The sRGB→OKLCh conversion routes through value.js's primitives (the `composables/color` leaf), NOT a hand-rolled rgb→oklch matrix. Born-RED: an inline `Math`-based oklch conversion reds (cross-asserts `proof:single-color-core`).
- **A3 — chroma-weighted, gray-null.** The histogram weights by chroma×alpha; a flat-gray fixture yields a NULL `--glass-ambient-hue` (no dominant hue). Born-RED self-test: a synthetic flat-gray sample MUST write null/transparent (a gray backdrop that yields a hue reds — the unweighted-mean evasion; the `AMBIENT_NULL_MASS` floor is the mechanism).
- **A4 — the bias rides the EXISTING tint seam at ≤8% (the wire — the born-RED headline).** `--glass-ambient-strength` is a NEW `@property <percentage>` (initial `0%`, ceiling ≤8% in the cascade) biasing `--glass-tint-source` via `color-mix(in oklab, …)` at the EXISTING self-engage re-point (`ladder.css:154/213/275`) — NO new compositing path, NO new `background:` rule. **RED at HEAD** (the cascade reads `--glass-tint-ink` raw; the hue is written but un-consumed). At `0%` the cascade is byte-identical to HEAD (the no-op floor cross-asserted GREEN). A separate ambient-tint compositing layer reds; a `--glass-ambient-strength` ceiling > 8% reds.
- **A5 — PRM single-sample + the ≤4 Hz floor.** The histogram inherits the existing throttle (`sampleIntervalMs`) + the PRM single-mount-sample — NO new rAF, NO un-throttled hue loop. Born-RED: a hue re-sample outside the existing throttle reds.

**Self-test bites (`--self-test`, each MUST red):** (i) a flat-gray fixture writing a non-null hue → A3; (ii) a second getImageData/canvas for the histogram → A1; (iii) a hand-rolled oklch conversion → A2; (iv) a second in-place (un-hoisted) histogram copy → A1 (the no-dual-path); (v) `--glass-ambient-strength` > 8% or a new compositing layer → A4. Extend-vs-new: NEW gate; `proof:single-color-core` extended-NOT (cross-asserted).

## The π — the binding paint readback

`tests-visual/ambient-hue.spec.ts` (NET-NEW, auto-enrolled; `getComputedStyle` + sampled readback, the `no-gray.spec.ts` OKLab-readback idiom). Declares the MANDATORY `@webkit` tag (the W-SAFARI-CAPTURE enrollment floor) + runs on the `webkit` project AND `chromium-headless-new`. NO source-green close.

- **The binding paint:** a **warm-amber backdrop** vs a **cool-teal backdrop** under the SAME glass surface resolve DISTINCT `--glass-ambient-hue` (read the written custom property), and the plate's `getComputedStyle` `background-color` (decoded to OKLab) shifts SUB-PERCEPTUALLY toward each backdrop's hue (the hue-delta is measurable but the plate stays warm-cream-dominant — it absorbs the cast, it does NOT become the backdrop).
- **The gray-backdrop null arm:** a flat-gray backdrop yields no ambient hue (the plate's hue is the un-biased warm-ink — the gray-room-tints-nothing identity).
- **Both modes** (`setScheme`) + the `0%`-strength no-op arm (at `--glass-ambient-strength: 0%` the plate background byte-matches HEAD — no bias).
- **The @webkit arm:** the SAME amber-vs-teal + gray-null readback runs on the `webkit` project — the sampled `--glass-ambient-hue` + the plate's OKLab shift read IDENTICALLY on Safari and Chromium (the getImageData histogram + `color-mix(in oklab)` are cross-engine; the sampler is NOT a Chromium-only correctness — the most Safari-safe glass-tint move, no goo/no backdrop-filter:url()/no feDisplacement). **Born-RED on HEAD** (the plate hue is backdrop-invariant today — the hue is written but un-consumed). The live-paint sample runs over a real WebGL backdrop (the dock-over-aurora case) per the live-π-oklab-paint-arm discipline.

**Safari-support-matrix row:** `ambient-hue sampler · getImageData hue-histogram + color-mix(in oklab) tint bias · SUPPORTED (cross-engine Baseline) · none — the sampler reads + biases identically on WebKit`. The three liquid surfaces the sampler feeds (the now-playing pill / the bloom 4th channel / the aurora re-seed) inherit the WebKit-verified hue read.

## The gestalt row

**BD-union-roster surface: `ambient-hue`** (wired by W-GESTALT-WIRE). Verdict requirement: on a FRESH whole-page both-mode `:5199` capture (NEVER reducedMotion), the dock/now-playing glass plate quietly ABSORBS the room's color — a sub-perceptual cast toward the backdrop hue (violet over a purple field, teal over a teal field) WHILE staying warm-cream-dominant, AND a gray field tints nothing (the quiet-rightness null). Born-FAIL on HEAD (the plate hue is backdrop-invariant); GREEN at its OWN close; W-REFLECT re-confirms on fresh pixels; surface-hash freshness floor binds.

## Jubilance

- **FLOOR — the glass quietly absorbs the room's color** — a sub-perceptual delight the user FEELS more than sees (the pill that warms toward the album, the dock that picks up the page's accent). The gray-null correctness is itself a quiet rightness (gray rooms tint nothing — no false color).
- **OPT-IN — the dock wire-on** (the only at-HEAD binary consumer); a consumer dials `--glass-ambient-strength` up toward the 8% ceiling for a stronger cast (presets-in-consumers).
- **NO disco** — the bias is bounded sub-perceptual, the warm-cream identity dominant.

## Fences

1. **The histogram is the ONE hoisted leaf + a FREE rider** — ZERO second pass/canvas/getImageData, ZERO second binning copy (the no-dual-path + the budget-is-the-existing-loop).
2. **The value.js color source is the ONE math** — `proof:single-color-core` holds; no hand-rolled oklch.
3. **The bias rides the EXISTING `--glass-tint-source` color-mix** — ZERO new compositing seam (the W-DARK-MATERIAL frozen-bound discipline: read the seam context, never re-declare `--glass-tint-ink`/`--glass-tint-strength-*`).
4. **The ambient is a HUE event at FIXED sub-perceptual chroma (≤8% ceiling)** — the plate absorbs the cast, never the backdrop's saturation; the warm-cream identity is dominant (no ppmycota/cool hue enters a TOKEN — the hue is SAMPLED at runtime, not minted).
5. **The default-OFF no-op floor is byte-exact** (`0%` = HEAD; every `proof:adaptive-glass`/`dark-material` gate GREEN by construction).
6. **PRM single-sample + ≤4 Hz inherited; no new rAF** (the `proof:offscreen-pause`/PRM-freeze discipline).
7. **No-legacy** — a clean additive register, no alias; the in-oklab glass-tint axis only (the in-srgb `--surface-tint-*` family is NEVER touched — the AW.W26 fence).

## Disposition links

- **Canonical source for `BE.W-AMBIENT-TINT`** (BF carries no own copy — the BE spec is canonical). The SAMPLER half landed at HEAD; this wave wires the BIAS + reads the hoisted leaf.
- **DEPENDS on W-HUE-HISTOGRAM-HOIST (T1)** — reads the ONE `composables/color/hueHistogram.ts` accumulator leaf (the no-dual-path internal hoist); sequenced BEFORE this wave + W-AUR-ALBUM, both of which read the ONE leaf.
- **CONSUMED by W-DOCK-NOWPLAYING-PILL** (the pill-plate tints to the album-dominant hue via `--glass-fill-tint` off `--glass-ambient-hue`), **W-AUR-ALBUM** (the aurora re-derives toward the sampled hue), **the bloom 4th color channel** — two+ reads off the ONE sampler.
- **CONSUMES the EXISTING tint cascade** (`ladder.css:154/213/275` self-engage) + the value.js `composables/color` primitives + the `@property` registration idiom (`property-regs.css` `--glass-accent-strength` precedent) — zero new compositing seam.
