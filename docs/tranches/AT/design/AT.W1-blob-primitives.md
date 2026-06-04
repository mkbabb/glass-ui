# AT.W1 design slice — the goo-blob + watercolor-dot wave spec

The binding design for the AT headline (AT.W2-W5). Built on `audit/W0-L6` (the
design lens), `audit/W0-L5` (the architecture transpositions), and a first-hand
read of the value.js reference impl. Every contract is file:line-grounded.

## §0 — The reference corpus (value.js demo, read in full)

`/Users/mkbabb/Programming/value.js/demo/@/components/custom/`:

**goo-blob/** (WebGL2 metaball):
- `GooBlob.vue` — the shell; takes `color: string` + a `BlobConfig`, owns the `<canvas>`.
- `composables/useMetaballRenderer.ts` — the renderer: WebGL2 bootstrap (`initGL` :105), a 20+-uniform set, the RAF loop (`render` :162) with pause/resume, `visibilitychange` tab-gating (:256), reduced-motion single-frame (:84,278), `ResizeObserver` (:265), `webglcontextlost`/`restored` (:285-302), `destroy` (:304). **The color resolver is a 1×1-canvas `fillStyle`+`getImageData` probe (`cssColorToRgb` :44-70) — DOM-coupled, memoised, silent-gray fallback.**
- `composables/{useBlobMood,useBlobPointer,useBlobSatellites}.ts` — the per-frame state (mood params, pointer tracking, satellite orbit/merge kinematics).
- `shaders/metaball.frag.glsl` + `metaball.vert.glsl` — SDF circles + `smin` gooey blend (:86) + FBM value-noise displacement (:67) + satellites; **color perturbed in HSV (`rgb2hsv` :93 → perturb hue/sat/L :146-155 → `hsv2rgb` :102)**.
- `types.ts` — `BlobConfig` (28 fields) + `BLOB_CONFIG_DEFAULTS` + `BLOB_CONFIG_KEY` (an `InjectionKey` — provide/inject pattern) + `BlobMood`/`MoodParams`/`MetaballSource`/`SatelliteInternal`.
- `composables/useMetaballRenderer.ts:2` imports `compileShader,linkProgram,createQuadVAO,getUniforms` from value.js's `@lib/animation/webgl-utils` (a SHARED GL util the lift must re-home).

**watercolor-dot/** (CSS/SVG — NOT WebGL):
- `WatercolorDot.vue` — `border-radius` morph + `filter: url(#watercolor-filter)` (a hidden `<defs>` singleton from value.js `SvgFilters.vue` — `audit/W0-L6 §2`).
- `composables/useWatercolorBlob.ts` — deterministic 8-value `border-radius` animation; seeds shape by `hashString(color+seed)` via `@composables/prng` (mulberry32/hashString/randomRadii/radiiToCSS). **The color only SEEDS the shape — no color→RGB resolution; NO ColorResolver needed here.**

## §1 — The subpath surface (DEC-AT-6: subpath-only, off the root barrel, off the value.js peer)

```ts
// @mkbabb/glass-ui/goo-blob  — standalone WebGL chunk (like /aurora), value.js-FREE
export { default as GooBlob } from "./GooBlob.vue";
export { useMetaballRenderer } from "./composables/useMetaballRenderer";
export type { ColorResolver } from "./colorResolver";          // the REQUIRED seam type
export type { BlobConfig, BlobMood, MoodParams, MetaballSource };
export { BLOB_CONFIG_DEFAULTS, BLOB_CONFIG_KEY };
// NOTE: NO defaultBlobColorResolver here — it would pull value.js into the chunk.

// @mkbabb/glass-ui/watercolor-dot  — CSS/SVG chunk, value.js-FREE, no resolver
export { default as WatercolorDot } from "./WatercolorDot.vue";
export { useWatercolorBlob } from "./composables/useWatercolorBlob";
export type { UseWatercolorBlobOptions };

// @mkbabb/glass-ui/color  — the EXTRACTED color leaf (L5 §2 transposition)
//   the value.js-backed color core, today aurora-local, hoisted so aurora +
//   the opt-in blob resolver share ONE home. value.js reach lives HERE (opt-in).
export { cssToOklch, oklchToLinear, oklchStopToHex, deriveAurora };
export type { OklchStop, AuroraHarmony };
export { defaultBlobColorResolver };   // opt-in; (css) => [r,g,b] via cssToOklch→oklchToLinear
```

`package.json` `exports` + `typesVersions` gain `./goo-blob`, `./watercolor-dot`,
`./color` (the hand-listed entry map slots them in cleanly — `audit/W0-L5 §3.1`).
The blobs are NOT added to `src/index.ts` (root barrel stays vueuse-free AND
value.js-free).

## §2 — Transposition A: `useWebGLCanvas` (AT.W2; DEC-AT-1)

The boilerplate `useMetaballRenderer` and `aurora/composables/runtime.ts` BOTH
carry — extract once:

```ts
// src/composables/glass/webgl/useWebGLCanvas.ts  (internal substrate; ≥2 consumers)
export interface UseWebGLCanvasOptions {
    canvasRef: Ref<HTMLCanvasElement | null>;
    vert: string;
    frag: string;
    uniformNames: readonly string[];
    /** Per-frame: set uniforms + draw. Receives elapsed seconds + dt(ms) + the GL handle bundle. */
    onFrame: (ctx: WebGLFrameContext) => void;
    /** Honour prefers-reduced-motion: render ONE frame, no loop (default true). */
    respectReducedMotion?: boolean;
}
export function useWebGLCanvas(o: UseWebGLCanvasOptions): {
    pause: () => void; resume: () => void;
};
```

It owns: `compileShader`/`linkProgram`/`createQuadVAO`/`getUniforms` (re-homed from
value.js's `webgl-utils` into `src/composables/glass/webgl/glUtils.ts`), the RAF
loop, `visibilitychange` tab-gate, reduced-motion single-frame, `ResizeObserver`
DPR-clamped resize, `webglcontextlost`/`restored` re-init, and `destroy`. aurora's
`runtime.ts` refactors onto it; `useMetaballRenderer` becomes a thin `onFrame` that
sets the metaball uniforms. **`frostShader.ts` is DELETED** (zero consumers, not
barrel-exported — `audit/W0-L5 §4.1`). The webgpu path stays separate.

**W2 gate:** aurora renders frame-parity-identical to 3.2.0 (a CPU-readback or a
captured-uniform-sequence equality check); `rg frostShader src/ = 0`; build/tests
green; the shared substrate is the single WebGL setup glass-ui ships.

## §3 — Transposition B: the `ColorResolver` seam (AT.W2 leaf + AT.W4; DEC-AT-2; inv-K-3)

```ts
// @mkbabb/glass-ui/goo-blob  — the seam type, no value.js
export type ColorResolver = (css: string) => [number, number, number]; // linear [0,1] RGB
```

- goo-blob **requires** a resolver: `<GooBlob :color :color-resolver>` OR
  `provide(COLOR_RESOLVER_KEY, fn)`. A mount with NO resolver throws a dev-time
  error (`useMetaballRenderer` asserts it) — the loud failure replacing the demo's
  silent-gray canvas fallback (`audit/W0-L5 §4.2`). **`dist/goo-blob.js` imports
  zero `@mkbabb/value.js`** (the inv-K-3 proof).
- The opt-in default lives in the EXTRACTED `/color` leaf:
  `defaultBlobColorResolver = (css) => oklchToLinear(cssToOklch(css))` — DOM-free,
  SSR-safe, value.js-backed. A consumer opts in:
  `import { defaultBlobColorResolver } from "@mkbabb/glass-ui/color"` and passes it.
  This is strictly better than the demo's 1×1-canvas hack (no DOM, no silent gray)
  AND keeps value.js OFF `/goo-blob`'s graph — the value.js reach is the consumer's
  explicit choice (`/color` is where value.js already lives, post-extraction).
- **Why a `/color` extraction and not "no default at all":** the color core
  (`cssToOklch`/`oklchToLinear`/`deriveAurora`) is today aurora-local but is a
  shared primitive (aurora + the blob default + future consumers). Hoisting it to
  `/color` (aurora re-exports it — no break) is the L5 §2 gestalt; the alternative
  (require-inject with NO shipped default) is the fallback if the extraction's
  blast-radius is deemed too high at impl — DEC-AT-2 picks the extraction.

**W4 inv-K-3 gate:** `proof:no-value-default` — a `proof:*` grep asserting
`dist/goo-blob.js` + `dist/watercolor-dot.js` import no `@mkbabb/value.js`; a unit
asserting a no-resolver mount throws; a unit asserting `defaultBlobColorResolver`
matches value.js linear RGB to 1e-6 (mirrors `aurora/__tests__/color-equivalence`).

## §4 — watercolor-dot (AT.W3; lightest, ships first; DEC-AT-3)

The CSS/SVG lift:
- `src/components/custom/watercolor-dot/` — `WatercolorDot.vue` + `composables/
  useWatercolorBlob.ts` (the per-vertex border-radius animation, verbatim logic).
- **`src/utils/prng.ts`** (NEW private leaf) — `mulberry32`, `hashString`,
  `randomRadii`, `radiiToCSS` (re-homed from value.js's `@composables/prng`; a
  generic util, ≥2 latent consumers). glass-ui has no prng today.
- **The internalized SVG filter (DEC-AT-3):** `WatercolorDot.vue` auto-mounts a
  namespaced `<filter id="glass-watercolor-filter">` via a `<Teleport to="body">`
  singleton (idempotent — mounted once per app), so a consumer needs ZERO `<defs>`
  wiring. This closes the same hidden-global-dependency class as the
  `tw-animate-css`/`@source` consumer-wiring traps (`audit/W0-L6 §2`).
- NO ColorResolver (color is a CSS passthrough that only seeds the shape — do NOT
  over-inject).

**W3 gate:** `/watercolor-dot` subpath + dts ship; `verify-export-types` +
`proof:resolution` green; a seeded-shape unit (same color+seed → same
`border-radius`); the filter renders with zero consumer wiring (a mount test
asserting the `<filter>` is present in the DOM).

## §5 — goo-blob (AT.W4; the renderer on the substrate + the seam)

- `src/components/custom/goo-blob/` — `GooBlob.vue` + `composables/{useMetaballRenderer,
  useBlobMood,useBlobPointer,useBlobSatellites}.ts` + `types.ts` + the shaders.
- `useMetaballRenderer` is rewritten as a thin `onFrame` over `useWebGLCanvas`
  (§2): it keeps the uniform-set + the mood/pointer/satellite `tick`s, drops the
  duplicated GL bootstrap + lifecycle. The `cssColorToRgb` canvas resolver (:44-70)
  is DELETED; `uBaseColor` is fed by the injected `ColorResolver` (§3).
- **Shader asset format (AT.W4 settles the consistency debt, `audit/W0-L5 §3.3`):**
  the lifted shaders convert from `.glsl?raw` to the `.ts` raw-string form glass-ui
  already uses (`aurora/shaders/aurora.frag.ts`) — no new Vite asset type.
- `BLOB_CONFIG_KEY` provide/inject is kept (the config seam).

**W4 gate:** the §3 inv-K-3 proof; `/goo-blob` subpath value.js-free; the glass-ui
demo story (§7) mounts it as consumer #2; off the root barrel.

## §6 — the D1 OKLCh shader (AT.W5; byte-isolated, highest risk; DEC-AT-4)

`metaball.frag.glsl` (now `.frag.ts`) color path, exact transposition:
- DELETE `rgb2hsv` (:93-100) + `hsv2rgb` (:102-106).
- The perturbation block (:146-155) moves from HSV to OKLab/OKLCh:
  - `vec3 oklab = rgbToOklab(uBaseColor);` then perturb in OKLCh — hue rotation on
    the `atan2(b,a)` angle by `(colorNoise-0.5)*uHueRange` (now radians, not /360);
    chroma scale by `uSatShift`; lightness `oklab.L += uBrightnessShift`. Convert
    back `oklabToRgb`. The GLSL OKLab matrices are the standard Ottosson constants
    (mirror value.js's core so the CPU-equivalence gate can assert agreement).
  - The edge-glow (:154-155) retunes on `oklab.L` (perceptual lightness) instead of
    HSV `z` — a subtler, gamut-safe inner glow.
- Add `rgbToOklab`/`oklabToRgb` GLSL fns (the inverse pair; ~10 lines each).

**W5 gate (DEC-AT-4):** a vitest spec running the GLSL OKLab math CPU-side (port the
fns to a test harness OR assert against value.js's `srgbToOKLab`/inverse): round-trip
identity (rgb→oklab→rgb ≈ id), value.js-core agreement to 1e-6, zero-perturb no-op
(uHueRange=uSatShift=uBrightnessShift=0 → output == input), in-gamut clamp. PLUS a
**manual visual-confirmation line-item** in the close checklist (the P5-precedent —
the one thing CPU math can't settle is "does it look right"). The Playwright+WebGL
frame-hash golden is OPTIONAL stretch (`audit/W0-L6` — glass-ui has no WebGL harness
today; tier-1 vitest is binding).

## §7 — the ≥2-distinct-consumer gate + the demo story (DEC-AT-5)

- **watercolor-dot:** MET decisively (10+ value.js demo sites = 1 context, + the
  glass-ui demo story = 2 contexts). Firm.
- **goo-blob:** THIN — one real value.js consumer (`HeroBlob.vue`). AT ships
  `demo/stories/blob-primitives.vue` (a real, non-throwaway story exercising
  GooBlob + WatercolorDot with a glass-ui-supplied resolver) as the BINDING 2nd
  consumer — the exact `deriveAurora`-at-W7 precedent. **Motive stated honestly:**
  the headline value is the D1 shader + the inv-K-3 seam + the substrate
  transposition, NOT consumer breadth. Do NOT manufacture a speedtest/muster
  consumer (speedtest doesn't consume value.js; muster's interest is design-survey).
- The existing canvas-2D `demo/stories/blob.vue` (the WebGL-vs-canvas collision
  `audit/W0-L1 head-a`) is RECONCILED: it re-points to the lifted WebGL `GooBlob`
  (or is retired into the new story) — the reconciliation is what MAKES the ≥2 true.

**Close gate:** the overfitting audit confirms goo-blob + watercolor-dot each clear
≥2 distinct consumer contexts.

## §8 — wave→gate summary

| Wave | Deliverable | Hard gate |
|---|---|---|
| W2 | `useWebGLCanvas` + aurora refactor + `frostShader` delete + `/color` extraction | aurora frame-parity; `rg frostShader = 0`; one WebGL setup |
| W3 | watercolor-dot + `prng` + internalized filter | `/watercolor-dot` ships; zero-wiring filter render; seeded-shape spec |
| W4 | goo-blob on the substrate + `ColorResolver` seam + demo #2 | `proof:no-value-default` (0 value.js in `dist/goo-blob.js`); no-resolver throws; ≥2 met |
| W5 | D1 OKLCh shader | vitest OKLCh-equivalence (round-trip · core-match · zero-perturb · gamut) + manual visual line |

The cross-repo counterpart (value.js K.W3: delete the demo impls, import the
published subpaths, supply its own `ColorResolver`) is NAME-FORWARD (inv-16) —
unblocked by AT's 3.3.0 publish (W8).

## §9 — W0b augmentation: the shader-quality wave + the color-space seam

The W0b SOTA lenses (`audit/W0b-A1/A2/A3`) found §6 ("the D1 OKLCh shader") was
correctly-aimed but UNDER-scoped — the demo's SDF/noise/AA core is competent
2020-era Shadertoy with four citable quality gaps, three of which are single-line
swaps to forms glass-ui's OWN aurora shader already trusts. W5 is RENAMED the
**"shader-quality wave"** (DEC-AT-8): five byte-isolated, individually-gated edits.

**The headline correctness bug — the color space (DEC-AT-7).** §6 never named what
space `uBaseColor` is in. The demo's canvas resolver returns GAMMA sRGB; AT's
`defaultBlobColorResolver` returns... it MUST return GAMMA at W4 (the faithful lift —
HSV needed no OETF) and the shader stays gamma. At W5, OKLCh is defined on LINEAR
light, so D1 flips `uBaseColor` to linear AND adds the mandatory `linearToSrgb()`
OUTPUT stage (the 3rd GLSL fn §6 omitted). Without it the blob paints visibly
too-dark AND the perceptual-uniformity claim D1 is sold on is voided. The seam is the
W4-vs-W5 boundary, NOT a conflict: **GAMMA@W4, LINEAR@W5 as D1's own gated change.**
The `/color` leaf ships `oklchToGammaRgb` (W4 default) AND `oklchToLinear` (W5/aurora)
— both value.js-backed (`design/AT.W1c-color-gates.md §2`).

**The five W5 edits (each gated):**
1. **`fwidth(d)` derivative AA** replacing the hardcoded `±1.5px` (frag :137-138) —
   `smin`+FBM make the field gradient non-unit-length, so the fixed band is provably
   wrong at the satellite-merge neck and noisy rim (the exact gooey-blob loci). Guard
   `max(fwidth(d),1e-4)`. Free WebGL2 intrinsic.
2. **Quilez normalized quadratic `smin`** (frag :86-89) — `k` becomes neck-thickness-
   in-uv (a meaningful `--blob-smooth-k` token); deletes the `/0.22*POS_SCALE` fudge.
   −1 mul, faster. CPU unit: `smin(a,b,0)==min`.
3. **Aurora's rotated-octave FBM** (`mat2(0.8,0.6,-0.6,0.8)`+`2.02`,
   `aurora.frag.ts:121-132`) — kills the power-of-two grid artifacts; known-good form,
   same `hash21`. Visual A/B, no new unit.
4. **OKLCh perturbation** — exact value.js Ottosson matrices transposed for GLSL
   column-major (DEC-AT-10, NOT the GM-Shaders/LYGIA convenience matrices ~1e-4 off);
   `radians(uHueRange)` (the demo's degrees would over-rotate ~57×); MULTIPLICATIVE
   chroma; the linear flip + `linearToSrgb()` (per the seam above).
5. **Hue-preserving chroma-reduction** on gamut overflow (the GPU cousin of
   `color.ts`'s `safeC *= 0.999` loop) — NOT a naive `clamp(rgb,0,1)` which clips a
   channel and SHIFTS hue, defeating D1. The CPU-equivalence gate's out-of-gamut sweep
   asserts no hue drift.

**Preserve (a STRENGTH, not a gap):** premultiplied-alpha output (frag :159
`rgb*alpha`) — the D1 rewrite must keep "perturb straight RGB → gamut-clamp →
premultiply LAST" ordering or it reintroduces edge fringing the math gate can't see
(W4 asserts `premultipliedAlpha:true` on the context).

**The gate (DEC-AT-4):** the CPU-equivalence hardens 4→8 assertions over a textually-
parallel `metaball-color.glsl-port.ts` (witness `#3a7bd5`) — see
`design/AT.W1c-color-gates.md §4`. PLUS `proof:webgl-golden` (the PROMOTED
`profile-aurora.mjs`, not a new harness): on-GPU zero-perturb output ==
`linearToSrgb(uBaseColor)`. The manual-visual line is scoped to the
`--blob-edge-glow-l` token ONLY (the one genuinely-subjective knob).

**The substrate inherits two robustness wins (W2, `audit/W0b-A3`):** the metaball
renderer pauses only on tab-hidden+reduced-motion, never off-screen (`:251-253`) — the
`useWebGLCanvas` harness folds `useIntersectionPause` so goo-blob inherits aurora's
intersection-gate for free; and it absorbs aurora's MISSING `webglcontextrestored`
handler (aurora goes permanently black on GPU reset today). The extraction is strictly
ADDITIVE on robustness.

**The aurora free-ride (W2b sub-slice):** D1's GLSL OKLab fn pair makes aurora's
palette a ≥2-consumer shared primitive — fold the **dither floor** (IGN/TPDF ±0.5/255
after `aces`+`paperGrain`, `aurora.frag.ts:808-817` — the #1 visible aurora banding
gap; OKLCh does NOT fix banding, it's a separate quantization problem) + the **OKLab
palette LUT** (`samplePalette` lerps in linear sRGB `:195-203`, throwing away half the
OKLCh authoring — reuse the W5 fn pair). Gated: byte-parity REBASED (composition path
byte-identical + dither bounded ≤1/255) + CPU amplitude unit + a "no banding" π
baseline|close.
