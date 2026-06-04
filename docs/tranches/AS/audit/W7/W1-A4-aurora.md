# AS.W7 · WAVE-1 · Cluster A4 — Aurora engine + preset cards (D6, D10)

Read-only diagnosis. Every root cause is grounded at `file:line`; the live
measurements were taken against the running demo (`:5173/aurora`) with a
deterministic `createAurora({ mode:"capture" })` harness reading `renderAt(t)`
frames back via `readPixels`. This is the heaviest A4 slice — a first-principles
overhaul of the time-evolution and the missing `deriveAurora` producer.

---

## D6 — preset card black bar + left-edge scroll shadow

### Evidence (live, dark mode — the mode the user reviewed in)

Measured on the first card ("Sky") in `:5173/aurora`:

| probe | value |
|---|---|
| `card` (the `<button>`) `display` | `block` |
| `card` `overflow` | **`visible`** |
| `card` `background-color` (dark) | `rgb(28,25,23)` — reads as black |
| `card` `border-top-left-radius` | `16px` |
| well (`.aspect-[16/10]`) `border-top-left-radius` | `16px` |
| well `overflow` | `hidden` |
| **vertical gap, card-top → well-top** | **≈6px band of card bg** |
| horizontal gap each side (the border) | 1px |

The baked thumbnail itself is NOT the culprit — sampling the webp's top rows
returns opaque cerulean (`rgb(58,147,182)`, a=255 at y=0/2/5/10), so the dark
band is a COMPOSITION artifact, not baked pixels.

### Root cause — the black bar

`demo/stories/aurora/PresetPickerRow.vue:43-63`. The card is a
`<button>` styled `rounded-card border bg-card` with **`overflow:visible`**
(no clip class on the button). The image well — the FIRST child —
`demo/stories/aurora/PresetPickerRow.vue:63` carries its OWN
`rounded-t-card overflow-hidden`. Two independent rounded boxes:

1. The card paints `bg-card` (dark `rgb(28,25,23)`) across its full content box.
2. The well's `rounded-t-card` (16px) sits INSIDE the card's 1px border, so the
   well's 16px corner radius is geometrically larger than the card's inner
   radius (16px − 1px border = 15px). The card's dark surface bleeds through in
   the corner triangles AND in a ≈6px top band (the well box does not paint to
   the card's rounded top edge). In light mode `bg-card` is near-white so the
   band is invisible; in dark mode it reads as a black bar — exactly the
   user-reported "black bar at the top, image doesn't fill to the rounded top
   edge."

The 6px top band specifically: the card is `display:block` with no top padding,
but the well is double-clipped against the card's border + radius so its painted
top edge recedes from the card's rounded crown — the dark plate shows in the gap.

### Root cause — the left-edge shadow on scroll

`demo/stories/aurora/PresetPickerRow.vue:38` — the scroll row carries
`scroll-fade-mask`. That utility (`src/styles/utilities.css:260-263`) is a
`mask-image: linear-gradient(to right, transparent, black var(--mask-fade-width),
…)` with `--mask-fade-width: 1rem` (`src/styles/tokens.css:818`). The mask fades
the leading (left) and trailing (right) 16px of the scroll viewport to
transparent. With the row scrolled to the start, the FIRST card's left edge sits
under the transparent→black mask ramp — the card's `shadow-cartoon`
(`3px 3px` offset, `src/styles/tokens.css:488`) and its left border get
half-erased by the mask, reading as a dark/cut "shadow" hugging the left edge.
The mask is meant to feather mid-scroll overflow, but at scroll-start it eats the
first card's chrome. The active card's inset ring
(`shadow-[inset_0_0_0_2px_var(--foreground)]`, `:48`) compounds this on the left
when "Sky" is current.

### Fix spec (D6)

**File: `demo/stories/aurora/PresetPickerRow.vue`**

1. **Black bar** — make the CARD the single rounded clip, delete the inner
   redundant clip. At `:44-49` add `overflow-hidden` to the button's class list
   (the button becomes the one rounded-clipping box). At `:63` change the well's
   `rounded-t-card bg-transparent` → drop `rounded-t-card` (and the now-dead
   `overflow-hidden` on the well can stay or go — the card clip subsumes it); the
   image then meets the card's rounded crown directly with no `bg-card` band.
   Before: card `overflow:visible` + well owns a second 16px radius. After: card
   `overflow:hidden rounded-card`, well is a plain `aspect-[16/10] w-full`
   (no radius), image `object-cover` fills to the card's rounded edge.
   - Caveat the Wave-2 implementer must honor: the row at `:38` is
     `overflow-x-auto`, and a CSS-spec one-axis scroll forces the cross-axis to
     `auto`, which would clip an OUTSET ring. The existing code already routes
     the active/focus rings as INSET shadows (`:47-48`) for exactly this reason —
     keep them inset. Card-level `overflow-hidden` is safe because the cartoon
     drop-shadow is outset; if the row clips it, move the card's elevation to an
     inset treatment OR add horizontal padding on the scroll row so the cartoon
     offset has room. Simplest: pad the scroll container
     (`px-1 -mx-1` or `py-2 → px-2`) so the 3px cartoon offset is not clipped.

2. **Left-edge scroll shadow** — the `scroll-fade-mask` at `:38` erases the first
   card's left chrome at scroll-start. Two viable fixes; Wave-2 picks one:
   - (preferred) Replace the symmetric `scroll-fade-mask` with a
     scroll-state-aware fade that only feathers the edge that actually has
     overflow (a `[--mask-l]`/`[--mask-r]` pair toggled on `scrollLeft>0` /
     `scrollLeft<max`), so the left edge is sharp until the user scrolls past it.
     The library already ships a scroll-fade idiom; the cheapest demo-local move
     is a small `@scroll` handler setting a data-attr that gates the left ramp.
   - (cheaper) Add left padding inside the masked container
     (`pl-[var(--mask-fade-width)]` on an inner wrapper, mask on the outer) so the
     first card's chrome lives in the solid-black zone of the mask, not the ramp.

   demoOrLib: **demo** (the card lives in `demo/stories/aurora/`).

---

## D10a — aurora does not animate slowly over time

### Evidence (live, deterministic `renderAt(t)` pixel diff, default config)

Harness: `createAurora(canvas, DEFAULT_AURORA_CONFIG, { mode:"capture" })`,
`renderAt(t)` then `readPixels`, mean per-channel abs diff (0–255):

| window | meanAbsDiff (0–255/channel) | reading |
|---|---|---|
| 0 → 1s | **0.65** | sub-1.0 — frame-to-frame imperceptible |
| 0 → 5s | **1.61** | ~0.6%/channel — visually static |
| 0 → 30s | 4.08 | a faint shift after 30s |
| 0 → 300s (5min) | 4.41 | barely above the 30s value — drift has SATURATED |

The 0→300s value (4.41) barely exceeds 0→30s (4.08): the motion plateaus almost
immediately and never travels. So there are TWO compounding failures — the
temporal RATE is too slow AND the spatial AMPLITUDE is too shallow.

The runtime IS advancing `uTime` correctly: `tick()` computes
`t = (performance.now() - startTime) / 1000` (`runtime.ts:525-527`) and uploads
it (`runtime.ts:491`), and `needsAnimation()` returns true because the default
config's drift uniforms are non-zero (`runtime.ts:507-521`). The loop is NOT
parked. The defect is the drift COEFFICIENTS, consumed in the shader at a
radians-per-second scale ~100× too small.

### Root cause — the drift timescale + amplitude (shader, default config)

The four motion uniforms all multiply `uTime` (seconds) directly, producing
rad/sec rates that need minutes to traverse one cycle, and the amplitudes are
sub-perceptual:

- **Nuclei drift** — `src/components/custom/aurora/shaders/aurora.frag.ts:197-200`:
  `cos(t * uNucleiDrift + phase)`. Default `nucleiDrift = 0.01`
  (`src/components/custom/aurora/presets.ts:177`) → cosine arg advances
  `0.01 rad/s` → one orbit = `2π/0.01 ≈ 628s` (10.5 min), and the orbit RADIUS
  is `uNucleiDriftRadius` ≈ `0.015` (`presets.ts:155-156`, demo presets
  `0.015–0.022`). A 0.015-unit wobble over 10 minutes is invisible.
- **Palette drift** — `aurora.frag.ts:223`:
  `paletteId += 0.04 * sin(t * uPaletteDrift * 6.2831) * uPaletteDrift * 20.0`.
  Default `paletteDrift = 0.008` (`presets.ts:178`) → period
  `2π/(0.008·2π) ≈ 125s`, amplitude `0.04·0.008·20 = 0.0064` paletteId units —
  imperceptible.
- **Breath** — `aurora.frag.ts:780-781`:
  `sin(t·2π / breathPeriod)`, `col *= 1 + breathDepth·breath·0.5`. Default
  `breathDepth = 0.05`, `breathPeriod = 40` (`presets.ts:179-180`) → ±2.5%
  luminance over a 40s cycle. The only marginally-visible channel, and it is a
  whole-frame luminance pulse, not spatial motion.
- **Warp drift** — `aurora.frag.ts:137-138`:
  `fbm(p·uWarpScale + t·uWarpDrift)`. Default `warpDrift = 0.008`
  (`presets.ts:163`) → the warp domain scrolls `0.008/s`; over 60s the fbm
  coordinate shifts 0.48 units. The most visible source but still glacial.

The speedtest preset the user cites (`demo/.../presets.ts:419-422`) only 4×'s
these (`nucleiDrift 0.04`, `paletteDrift 0.02`, `breathDepth 0.08`) — orbit
period still ≈157s. Same class of defect, not a fix.

### Fix spec (D10a)

This is a library-runtime + shader rework. The intent: the field should read as
SLOWLY ALIVE — perceptible drift over a ~5–15s window, never a jarring
fast pan, never fully static.

demoOrLib: **lib** (shader + the library default config; demo presets inherit).

**File: `src/components/custom/aurora/shaders/aurora.frag.ts`** — raise the
time-rate constants so the same authored coefficient maps to a perceptible
period, decoupling the AUTHORING scale (0..~0.05, keep) from the RAD/SEC scale:

1. `:198-199` (nuclei): wrap the time term with a rate multiplier, e.g.
   `cos(t * uNucleiDrift * K_NUCLEI + phase)` with `K_NUCLEI ≈ 0.12–0.18`
   (target one orbit per ~60–90s at the default 0.01 → arg rate ~0.0015→ raise
   to ~0.05–0.1 rad/s; tune so 0→5s diff lands ~8–15/channel). ALSO raise the
   visible travel: the orbit radius `uNucleiDriftRadius` is too small — Wave-2
   raises the default driftRadius authoring band (`presets.ts:155-156` and the
   demo presets) from ~0.015 to ~0.04–0.06 so the wobble actually moves the
   composition.
2. `:223` (palette): the amplitude `0.04·d·20` and rate `d·6.2831` are both tiny.
   Recompute as a perceptual drift: rate `sin(t * uPaletteDrift * K_PAL)` with
   `K_PAL` chosen for a ~30–60s hue-cycle at default, and amplitude raised to
   ~0.03–0.06 paletteId units so the palette visibly breathes between adjacent
   stops.
3. `:780` (breath): `breathPeriod` 40 is fine as a period; the issue is depth.
   Keep the period authoring but ensure `breathDepth` default reads — it is the
   most-visible channel; leave the formula, raise nothing here unless the new
   nuclei/palette/warp rates over-dominate.
4. `:137-138`, `:145-146` (warp): `t * uWarpDrift` — multiply by a `K_WARP`
   (~3–6) so the domain warp scrolls perceptibly (one fbm-cell traverse per
   ~15–30s).

   IMPORTANT: introduce the K_* as shared `const float` at the top of the shader
   (a single "TIME RATE" block) so the authoring coefficients in `presets.ts`
   stay in their documented 0..~0.05 bands (no preset rewrite needed) — the
   shader does the rate lift. This keeps the config schema and all 12 demo
   presets untouched while every preset comes alive.

**File: `src/components/custom/aurora/presets.ts`** — raise the
`DEFAULT_AURORA_CONFIG` drift amplitudes that gate VISIBILITY rather than rate:
`nucleiDrift` (`:177`) and the per-nucleus `driftRadius` in the default nuclei
(`:155-156`) — bump driftRadius ~0.015→~0.045 so the K_NUCLEI rate has something
to move. `paletteDrift` (`:178`) ~0.008→~0.015. Leave `breathDepth`/`breathPeriod`.
The demo presets (`demo/stories/aurora/presets.ts`) inherit via `cfg(...)` spread,
so most come along free; the ones that override `driftRadius`/`warpDrift`
explicitly (all of them) get a one-pass amplitude bump in the same edit if Wave-2
wants per-preset polish — but the shader K_* lift alone already fixes the rate
for every preset without touching the demo file.

**Verification gate for Wave-3**: re-run the `renderAt(t)` diff harness; require
0→5s meanAbsDiff in the ~8–20/channel band (perceptible, not frantic) and
0→1s < ~4 (no jarring per-frame jump). The reduced-motion path
(`runtime.ts:508,525-526` freezes `t = frozenOffset`) MUST stay static — confirm
the K_* lift does not leak through the reduced-motion branch (it does not: `t` is
frozen before the shader sees it).

---

## D10b — `deriveAurora` not implemented + not wired into the configurator

### Evidence

`grep -rn deriveAurora src/` → **empty (exit 1)** — the producer does not exist
in source. The low-level OKLab/OKLCH math DOES ship and is the substrate:
`src/components/custom/aurora/composables/color.ts` exports `oklchToLinear:31`,
`flattenPalette:43`, `paletteToCssGradient:78`, `oklchStopToHex:89`,
`hexToOklchStop:96`, `cssToOklch:117`, all re-sourcing value.js's canonical
Ottosson core (`rawOklchToOklab`, `rawOklabToOklch`, `srgbToOKLab`, `gamutMapOKLab`
— signatures confirmed at
`node_modules/@mkbabb/value.js/dist/units/color/gamut.d.ts:50,55,62-66`).

The Palette configurator tab (`demo/stories/aurora/config/PaletteLayer.vue`)
only supports MANUAL per-stop editing: add/remove/reorder via `usePaletteStops`
(`demo/stories/aurora/config/usePaletteStops.ts`) + per-stop L/C/h sliders
(`OklchStopRow.vue`). There is NO "seed one color → N-stop palette" producer.
That is the entire D10b gap: the user wants to pick ONE color and have a
harmonious multi-stop aurora palette derived from it, wired into the Palette tab.

### Fix spec (D10b) — the `deriveAurora` producer + wiring

This is a net-new library function (the OKLab math it composes already ships — a
no-op re-implementation is FORBIDDEN per inv J-10; `deriveAurora` is a thin
COMPOSING producer over the shipped primitives, which clears the bar).

demoOrLib: **lib** (the producer) **+ demo** (the Palette-tab wiring).

**File: `src/components/custom/aurora/composables/color.ts`** — add the producer
(it lives next to the OKLab helpers it composes; export it from
`aurora/index.ts:26-33` alongside the existing color exports):

```
export type AuroraHarmony = "analogous" | "complementary" | "triad" | "monochrome";

export interface DeriveAuroraOptions {
    stopCount?: number;       // default 4; clamp 2..MAX_STOPS
    harmony?: AuroraHarmony;  // default "analogous"
    lightnessSpread?: number; // default ~0.32 — total L travel across the ramp
    chromaFalloff?: number;   // default ~0.85 — C multiplier toward the pale apex
    hueSpread?: number;       // default ~28 (deg) for analogous; ignored by monochrome
}

// seed: any CSS color string OR an OklchStop → N OklchStop[] (gamut-mapped)
export function deriveAurora(
    seed: string | OklchStop,
    options?: DeriveAuroraOptions,
): OklchStop[];
```

Algorithm (all in OKLCH, all gamut-safe):
1. Resolve `seed` → an `OklchStop` (`cssToOklch:117` for strings; pass-through
   for an `OklchStop`). The seed's `{L,C,h}` is the ANCHOR.
2. Build `stopCount` stops along a perceptual ramp:
   - **L**: spread the seed L across `[L - spread/2 … L + spread/2]` clamped to
     a painterly band (~`[0.35, 0.95]`) so there is a deep base and a near-white
     apex (matches the authored presets' "deep → cream" shape).
   - **C**: ramp DOWN toward the light apex by `chromaFalloff` (pale tops read
     atmospheric, not neon).
   - **h**: per `harmony` — `analogous` = anchor ± `hueSpread` walked across the
     ramp; `complementary` = anchor and anchor+180 split across the stops;
     `triad` = anchor, +120, +240 distributed; `monochrome` = constant hue.
3. **Gamut-map every stop** through `gamutMapOKLab` (compose:
   `rawOklchToOklab → gamutMapOKLab → rawOklabToOklch`) so no derived stop falls
   out of sRGB — this is the value.js core that already ships
   (`gamut.d.ts:50`). Return the `OklchStop[]`, length clamped to `[2, MAX_STOPS]`.

This is deterministic, DOM-free (SSR-safe, like `cssToOklch`), and adds a unit
home: extend `aurora/__tests__/` (sibling of `color-equivalence.test.ts`) with a
`derive-aurora.test.ts` asserting: stopCount honored + clamped; every output
stop in-gamut (`isInSRGBGamut` after `oklchToLinear`); seed hue preserved at the
anchor for `monochrome`; L monotonic across the ramp.

**File: `demo/stories/aurora/config/PaletteLayer.vue`** — wire a "Derive from
color" surface ABOVE the manual stop list (`:27`, before the `Stops (n/MAX)`
header). Add:
- a seed `<input type="color">` (the OKLCH round-trip idiom already used in
  `OklchStopRow.vue:34-39`),
- a small harmony `<select>`/segmented control (analogous · complementary · triad
  · monochrome) and a stop-count stepper (2..MAX_STOPS),
- a "Derive" `Button` that calls `deriveAurora(seedHex, { stopCount, harmony })`
  and writes the result into `config.palette` (replacing the manual array). Reuse
  `usePaletteStops`'s `config` ref — assigning `config.value.palette = derived`
  flows through the existing reactive `watch(getCfg,…)` in `useAurora.ts:201`
  so the canvas re-uploads (`flattenPalette` already drives the uniform at
  `runtime.ts:378`). No new plumbing — the derive just produces the same
  `OklchStop[]` the manual editor produces.

**File: `src/components/custom/aurora/index.ts`** — at `:26-33` add `deriveAurora`
+ `type AuroraHarmony, type DeriveAuroraOptions` to the `color` re-export block so
the producer reaches the `@mkbabb/glass-ui/aurora` subpath surface (the second
live consumer — speedtest's `useSpeedtestAuroraConfig` + value.js K.W4 — then
adopts it, closing the longstanding ≥2 gate and firing value.js VAL-1 rather than
its kill; this matches the AS plan's "ship ONLY-IF live ≥2" — the user's request
IS the live adoption witness).

---

## Demo-vs-library summary

| defect | surface | primary file:line |
|---|---|---|
| D6 black bar | demo | `demo/stories/aurora/PresetPickerRow.vue:44-63` |
| D6 left scroll-shadow | demo | `demo/stories/aurora/PresetPickerRow.vue:38` + `src/styles/utilities.css:260` |
| D10a slow-drift rate | lib (shader) | `aurora.frag.ts:197-199,223,137-138,780` |
| D10a shallow amplitude | lib (config) | `presets.ts:155-156,177-178` |
| D10b deriveAurora producer | lib | `aurora/composables/color.ts` (net-new) + `aurora/index.ts:26-33` |
| D10b configurator wiring | demo | `demo/stories/aurora/config/PaletteLayer.vue:27` |

## Notes for Wave-2

- The `/aurora` flat route resolves flakily under programmatic `router.push`
  (lands on `/foundations/*` or `/compositions/hero` on first try, settles on
  retry). This is a SEPARATE routing defect (FLAT_STORIES registration in
  `demo/router.ts:20-23`), NOT part of A4 — flagged so Wave-2 doesn't chase it
  under this cluster. A hard reload to `:5173/aurora` mounts cleanly.
- Do NOT rewrite the 12 demo presets to fix D10a — the shader K_* rate lift fixes
  EVERY preset at once. Only the DEFAULT config's two amplitude knobs
  (`driftRadius`, `nucleiDrift`/`paletteDrift`) need a library-side bump.
- The reduced-motion freeze (`runtime.ts:508,525-526`) is upstream of the shader
  time term — the K_* lift cannot leak motion into the reduced-motion path.
- `deriveAurora` composes only SHIPPED value.js primitives — no color math is
  re-implemented (inv J-10 clean). The gamut-map step is the load-bearing reuse.
