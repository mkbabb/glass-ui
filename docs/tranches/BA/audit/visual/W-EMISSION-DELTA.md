# BA.W-EMISSION — the self-emission class closed at the root · DELTA

<!-- surface-paths: src/styles/index.css, src/styles/select.css, src/components/ui/select/SelectContent.vue, src/components/ui/slider/index.ts, src/components/ui/slider/Slider.vue, src/components/custom/watercolor-dot/WatercolorDot.vue, scripts/proof-emission.mjs, tests-visual/emission.spec.ts -->
<!-- surface-hash: f82a4fea2f9cba6efd62d5c684380912520c1347a5537cd79bce645aa098d689 -->
<!-- AZ.W-GATES content-hash freshness model: fresh IFF the eight surface-paths' bytes are
     byte-identical to capture time (sha256 of the concatenated bytes). Captured own-surface
     at :5199 against the live demo cascade (the demo imports ../src/styles/index.css, so the
     PRECOMPILED Select bound + the [data-size] Slider rule + the ghost CSS all resolve), both
     the chromium-headless-new (1280×800) + coarse-touch (390×844) projects. -->

**Wave**: BA.W-EMISSION — the value.js register-B emission class closed at the ROOT.
**Status**: COMPLETE — `proof:emission` born-RED (3/9) → GREEN (9/9); the π readback 3/3 on BOTH projects; no Batch-1 regression (proof:no-gray 27/27, proof:dark-material 20/20, proof:adaptive-glass 26/26).

## §0 RE-GROUND drift notes (every cite re-grepped at HEAD)

| cite | HEAD status |
|---|---|
| `src/styles/index.css:152` `@source "../components"` (the dead pointer) | EXACT — confirmed dead: `dist/components/` has 0 `.js`, 0 `.vue` (only `.d.ts` mirrors) |
| `dist/glass-ui.css` `grep reka-popper-available-height` = 0 | EXACT — the Select bound DEAD in shipped CSS at HEAD |
| `dist/*.css` `grep slider-track-height:1.25rem` = 0 | EXACT — the Slider size axis DEAD at HEAD |
| `SelectContent.vue:47` the authored `[max-height:var(--reka-popper-available-height,60dvh)]` | EXACT — present in source, never compiled |
| `slider/index.ts:60-62` the dead CVA size axis | EXACT — `md:'[--slider-track-height:1.25rem] [--slider-thumb-size:1rem]'` present, dead |
| `Slider.vue:344` the spectrum thumb `× 0.75` on the same axis | EXACT — re-verified slim (π: ratio 0.5 at md) |
| `WatercolorDot.vue:18-37` — NO `variant`/`ghost` axis | EXACT — confirmed no variant axis at HEAD |

### DRIFT FINDING #1 — the P9 `emitComponentUtilities` already exists (the spec's Archaeology underweighted it).

`vite.style-assets.ts emitComponentUtilities` (P9) ALREADY ships glass-ui's component-utility RULES build-independently into `dist/styles/components.css` — it scans `dist/*.js` + `dist/glass-ui.css` for class-shaped tokens, safelists them via `@source inline()`, compiles against glass-ui's `@theme`. This is the primary self-emission path; the `@source "../components"` directive is a fragile BACKSTOP. **BUT** the P9 `classish` token filter `^-?[a-z]…` REJECTS fully-arbitrary BRACKET utilities (`[max-height:…]`, `[--slider-track-height:…]` start with `[`, not `-?[a-z]`). So even the P9 path drops the two structural bracket utilities — which REINFORCES the wave's thesis: the structural-only precompile (moving these OUT of bracket form into shipped CSS) is the correct cure, because NO scan path (consumer JIT, the dead `@source`, OR the classish safelist) reaches a `[…]`-form structural utility.

### DRIFT FINDING #2 — the `@source` re-point glob (the source-green/visually-broken trap, caught LIVE).

The naïve re-point `@source "../"` (src/ in source, dist/ in the shipped copy) **PASSED the production build** but **BROKE the demo dev cascade**: `@tailwindcss/vite:generate:serve` threw `Missing opening (` parsing `demo/demo.css` because the bare `../` glob now scanned the `src/` shader `.glsl.ts` template strings and tripped Tailwind's dev candidate-extractor. The π readback caught it (the demo rendered unstyled, locators timed out) — exactly the P-1 close-class BA exists to fix (build-green / visually-broken). **The corrected re-point is `@source "../*.js"`**: in the SHIPPED dist it is `dist/*.js` (the 156 flat compiled chunks that carry glass-ui's utility class strings — the surface the dead `../components` mirror never held); in glass-ui's own source build it is `src/*.js` (empty — glass-ui's SFCs compile via vite, off this `@source`), so it never scans the shader tree. The dev cascade compiles clean (0 `Missing opening` errors after the fix), the π readback 3/3.

## The chosen `@source` re-point

`@source "../components"` → **`@source "../*.js"`** (`src/styles/index.css`). Resolves to `dist/*.js` (156 compiled chunks) in the shipped copy, `src/*.js` (empty, no-op) in the own build. The PRIMARY self-emission path stays `emitComponentUtilities` (P9 → `dist/styles/components.css`); this directive is a backstop. The two STRUCTURAL bracket utilities the P9 path drops are pre-compiled instead (below).

## The structural-utility census verdict (scope 5)

The full inventory of arbitrary-bracket utilities in shipped CVAs + SFCs, each with disposition. STRUCTURAL = geometry/bounds/sizing (the consumer-JIT-load-bearing class); decoration (filter/shadow/background) is left as-is per the structural-only boundary (the AN.W2 blanket-emit reject — confirmed held).

| # | utility | site | class | disposition |
|---|---|---|---|---|
| 1 | `[max-height:var(--reka-popper-available-height,60dvh)]` | `SelectContent.vue:47` | **STRUCTURAL** (bound) | **PRECOMPILED** → `src/styles/select.css` `[data-slot=select-content]` rule (`max-height: min(--select-content-max-h, --reka-popper-available-height)`); ships in `dist/styles/select.css` (the `/styles` cascade). Backed ✓ |
| 2 | `[--slider-track-height:1.25rem] [--slider-thumb-size:1rem]` (+sm/lg) | `slider/index.ts:60-62` | **STRUCTURAL** (sizing) | **DATA-SCOPED** → `Slider.vue` `[data-size=sm\|md\|lg]` scoped-CSS rules; ships in `dist/glass-ui.css`. The CVA `size` key kept (drives `:data-size`); only the geometry moved. Backed ✓ |
| 3 | `[--card-spacing:--spacing(6)]` (base) + `data-[size=sm]:[--card-spacing:--spacing(4)]` | `Card.vue:155` | **STRUCTURAL** (spacing) | **BOOKED** — OUT of W-EMISSION File Bounds (Card.vue not in scope). The `data-[size=sm]` arm survives the P9 classish filter (data-prefixed); the BASE `[--card-spacing:--spacing(6)]` setter does NOT (bracket-prefixed) → a default `<Card>` reads `p-(--card-spacing)` against an undefined var → no default padding. RECORDED in `proof:emission`'s census (`inBounds: false`, `backed: null`). Same fix-class (move the base setter to a shipped `[data-slot=card]`/default rule, OR add a `var(…, N)` fallback at the consumer reads). Degrades to no-padding (a layout-soft miss), NOT the 745px/6px structural break — a recorded booking, not a born-RED assert this in-bounds wave can green. |
| 4 | `[backdrop-filter:var(--glass-blur-quiet)]` / `[backdrop-filter:var(--glass-blur-wash)]` | `TabsIndicator.vue`, `TagsInput.vue` | DECORATION (blur) | **LEFT AS-IS** — decoration, not geometry/bounds/sizing. Per the structural-only boundary (the AN.W2 blanket-emit reject); degrades to no-blur (a glass surface without blur is still a glass surface — not a layout break). |
| 5 | `[box-shadow:var(--glass-shadow-floating)]` / `[background:var(…)]` / `[length:var(--control-text-sm)]` | various SFCs | DECORATION (shadow/bg/font-size) | **LEFT AS-IS** — decoration/typography, not structural. |

The TS-type-annotation `[…]` matches (`[id: string]`, `[index: number]`, …) are NOT CSS utilities (false-positive grep noise), excluded.

## (a) `proof:emission` born-RED → GREEN

**Born-RED (HEAD, pre-fix dist):** 3/9 pass — the source-half W1 passed once the index.css edit landed, but the BUILT-CSS reads (W2 select-bound, W3 slider-md, W3 full-axis, W4 census) RED'd (`grep` = 0 in `dist/glass-ui.css`), the WatercolorDot variant absent, the π spec not yet authored:

```
3/9 pass
  ✗ select-bound-in-built-css     — ABSENT (reka-popper-available-height = 0 in dist)
  ✗ slider-md-geometry-in-built-css — ABSENT (slider-track-height:1.25rem = 0 in dist)
  ✗ slider-full-size-axis-in-built-css
  ✗ census-structural-utilities-backed — select-bound, slider-size-axis unbacked
  ✗ watercolor-ghost-variant — no variant axis
  ✗ pi-readback-spec-exists
```

**GREEN (post-fix + rebuild):** 9/9 pass —

```
9/9 pass
  ✓ source-dead-pointer-gone — live directives: ["../*.js"]
  ✓ source-reaches-compiled-surface — dist/ carries 156 compiled .js chunks; dead mirror 0
  ✓ select-bound-in-built-css — the [data-slot=select-content] max-height rule SHIPS
  ✓ slider-md-geometry-in-built-css — [data-size=md] --slider-track-height:1.25rem SHIPS
  ✓ slider-full-size-axis-in-built-css — sm 0.75rem ✓, lg 1.75rem ✓
  ✓ census-structural-utilities-backed — select-bound + slider-size-axis backed; card booked
  ✓ watercolor-ghost-variant — variant axis + ghost value reusing useWatercolorBlob (stroke)
  ✓ pi-readback-spec-exists
```

## (b) The π binding readback (`tests-visual/emission.spec.ts`, both projects, 3/3 each)

| arm | readback | verdict |
|---|---|---|
| (a) Select collision-bound | `maxHeight: "249.656px"` (REAL, not `none`), `bottom: 443.66 < viewport 460` (in-viewport), `overflowY: auto` (inner scroll), `transformOrigin: "111px 124px"` (set) | the 16-item-class dropdown BOUNDS inside the viewport with inner scroll; the WO-1 acceptance MET (real computed maxHeight, in-viewport, inner scroll) |
| (b) origin-anchored open | `transformOrigin` set to the measured anchor (not the empty default) | WO-2 — the panel grows from the trigger edge, no lateral settle |
| (c) Slider size axis | `standard md` track = **20px** (`--slider-track-height: 1.25rem`), NOT the 6px fallback; `spectrum md` thumb ratio = **0.5** (12px thumb over 24px track) | the A3 acceptance MET — md track painted real, spectrum thumb slim (≤0.5×) |
| (d) WatercolorDot ghost | `ghostBorderWidth: 2`, `ghostBorderStyle: solid` (NOT dashed), `ghostRadius` === `solidRadius` (`60.9072% 43.6223% 21.9287% 59.7097% / 65.2026% 44.7639% 35.308% 25.7651%`), low-alpha fill `0.12` | the C-2 acceptance MET — the seeded blob silhouette as a STROKE, the ghost of a seed EXACTLY matches the solid dot's outline |

Captured frames: `W-EMISSION-select-bound-light.png`, `W-EMISSION-slider-size-light.png`, `W-EMISSION-watercolor-ghost-light.png`.

## (c) No Batch-1 regression

`proof:no-gray` 27/27, `proof:dark-material` 20/20, `proof:adaptive-glass` 26/26 — all GREEN after the shared `index.css` touch. `npm run typecheck` clean (`SliderVariants` unchanged surface; WatercolorDot `variant` prop additive). The full library build is GREEN (`built in 635ms`).

## Triumvirate triggers fired

NONE. The §Triumvirate scope-reveal (the `@source` re-point coupling to the build pipeline) did NOT fire: the fix is a pure `src/styles/index.css` edit (`../*.js`), no `vite.library.ts`/build-config change; the precompile is structural-only (not the rejected AN.W2 blanket emit). The drift-finding-#2 `@source "../"`-breaks-dev was caught + resolved in-bounds by tightening the glob, not a build-pipeline change.
