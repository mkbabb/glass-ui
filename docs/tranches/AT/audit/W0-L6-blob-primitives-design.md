# AT.W0 — L6 (THE HEADLINE): goo-blob + watercolor-dot blob-primitive wave spec

**Lens:** L6 — deep design of the blob-primitive lift wave.
**Scope:** the full contract for lifting value.js's demo-private `goo-blob` + `watercolor-dot` into glass-ui subpaths with an inv-K-3 injected color-resolver seam, plus the D1 OKLCh shader retune.
**Disposition:** authored design slice. NO src/ written; NO sibling written. Read-only across value.js + glass-ui.

---

## 0. Executive summary (the load-bearing decisions)

1. **`watercolor-dot` is NOT a WebGL chunk.** The task framing ("standalone WebGL chunks") is correct for `goo-blob` and WRONG for `watercolor-dot`. `WatercolorDot.vue` (value.js `demo/@/components/custom/watercolor-dot/WatercolorDot.vue:1-107`) is a pure CSS/SVG primitive — `border-radius` morph driven by rAF (`useWatercolorBlob.ts`) + a `filter: url(#watercolor-filter)` SVG displacement. Zero WebGL. The two primitives are different substrates and ship as different chunk shapes; the wave spec must NOT treat them as one.

2. **`watercolor-dot` carries a hidden global dependency: the `#watercolor-filter` SVG `<defs>`** (value.js `SvgFilters.vue:4-26`). The component references `url(#watercolor-filter)` by id; the filter is a separately-mounted singleton. A naive lift ships a primitive that renders an UNFILTERED rounded blob unless the consumer also mounts the filter. This is the same failure-class as the `tw-animate-css` / `@source` consumer-wiring trap (CLAUDE.md "Consumer wiring"). **The lift MUST internalize the filter** (a self-mounting `<defs>` teleported once per document, or a documented `<GlassDefs/>` mount) — see §2.4.

3. **The inv-K-3 seam is already 80% solved by the existing R1 posture.** glass-ui's aurora ALREADY consumes value.js's color core as a hard peer — `@mkbabb/value.js` is a `peerDependencies` entry (`package.json:546`, `^0.10.0`) AND a `libraryExternal` rollup external (`vite.library.ts:126`). `aurora/composables/color.ts:11-21` imports `parseCSSColor`, `srgbToOKLab`, etc. directly from `@mkbabb/value.js`. So glass-ui CAN resolve a CSS string → RGB today, DOM-free, via `cssToOklch`. The inv-K-3 requirement ("no value.js default baked in") is therefore NOT "value.js may not be reached" — it is "**glass-ui must not bake the value.js DEMO's 1×1-canvas `cssColorToRgb` resolver** (`useMetaballRenderer.ts:44-70`) as the default color path." The seam is a **required injected pure-fn**, and glass-ui ships a default resolver built on its OWN already-present value.js peer — see §2.

4. **glass-ui ships NO `MetaballCanvas` today.** The value.js coordination ledger (Q.md §2.1.2) asserts `@mkbabb/glass-ui/metaballs` is a live published surface. **This is STALE / wrong for current HEAD.** `package.json` exports has NO `./metaballs` entry; `vite.library.ts` has no metaballs entry; `grep metaball src/` finds only an aurora DESIGN.md prose reference + a configurator comment. The AT lift is therefore a genuinely-NEW subpath pair, not a migration of an existing publisher surface. The Q.md "MetaballCanvas is exported" framing was already a self-acknowledged stale-coord correction loop and never reflected a real glass-ui artefact.

5. **glass-ui has NO e2e/Playwright harness.** It runs `vitest` + `happy-dom` (`vitest.config.ts:18`) — no WebGL, no browser. The value.js `webgl-goo-blob.spec.ts` is a Playwright spec glass-ui CANNOT run. **The D1 shader's "frame-hash/golden" gate as proposed in the task is not currently runnable in this repo.** AT must EITHER stand up a minimal Playwright/WebGL harness (a real cost, a wave of its own) OR gate the shader the way aurora's OKLab path is already gated: a CPU-side vitest equivalence test that ports the GLSL color math to TS and asserts it against value.js's canonical Ottosson core (the `derive-aurora.test.ts` / `color-equivalence.test.ts` pattern). Recommend the latter as primary, the former as an OPTIONAL stretch wave — see §3.

---

## 1. The two primitives — what they actually are (file:line corpus)

### 1.1 goo-blob (WebGL2 metaball renderer) — the real WebGL chunk

The full module (value.js `demo/@/components/custom/goo-blob/`):

| File | Role | Lift notes |
|---|---|---|
| `GooBlob.vue:1-121` | wrapper: canvas + drop-shadow CSS + inject of `BLOB_CONFIG_KEY` | `:color` prop is a CSS string (`GooBlob.vue:21-24`); `inject(BLOB_CONFIG_KEY, null)` is the per-tree config override (`:28-29`); `defineExpose({nudge,setMood,currentMood})` (`:61`) |
| `types.ts:1-135` | `BlobMood` union, `MoodParams`, `MetaballSource`, `SatelliteInternal`, `BlobConfig` + `BLOB_CONFIG_DEFAULTS` + `BLOB_CONFIG_KEY` | pure types + defaults; lift verbatim. `BlobConfig` has 30+ fields (`:58-98`) |
| `composables/useMetaballRenderer.ts:1-343` | the WebGL2 renderer: GL init, RAF loop, uniform upload, context-loss recovery, `ResizeObserver`, `prefers-reduced-motion` | THE hot module. Carries the demo's color-resolver default (`:44-70` — `cssColorToRgb`, the 1×1-canvas `getImageData` trick) that inv-K-3 forbids baking |
| `composables/useBlobMood.ts:1-136` | 5-mood param interpolation (idle/happy/curious/sleepy/excited), eased transitions | pure logic; lift verbatim. `MOOD_TARGETS` (`:4-70`), `TRANSITION_MS` (`:72-78`) |
| `composables/useBlobPointer.ts:1-69` | pointer → normalized [-1,1] with smoothing decay | pure logic; lift verbatim |
| `composables/useBlobSatellites.ts:1-294` | the orbiting/merging/absorbing satellite state machine; seeded by `mulberry32(hashString(color+"goo"))` (`:110`) | depends on `@composables/prng` (`mulberry32`,`hashString`) — see §1.3 |
| `shaders/metaball.frag.glsl:1-160` | the SDF metaball + FBM-displaced edge + HSV color-perturbation fragment shader | THE D1 retune target (HSV → OKLCh). `rgb2hsv`/`hsv2rgb` at `:93-106`, perturbation at `:146-155` |
| `shaders/metaball.vert.glsl:1-9` | trivial fullscreen-quad passthrough | lift verbatim |
| `index.ts:1-3` | barrel | lift, extend with the renderer composable + seam types |

The renderer imports `@lib/animation/webgl-utils` (`useMetaballRenderer.ts:2`) — `compileShader`, `linkProgram`, `createQuadVAO`, `getUniforms` (value.js `demo/@/lib/animation/webgl-utils.ts:1-71`). **glass-ui has no equivalent shared WebGL util** — aurora's `runtime.ts` hand-rolls its own GL plumbing. See §4 (renderer-abstraction question).

### 1.2 watercolor-dot (CSS/SVG primitive) — NOT WebGL

| File | Role | Lift notes |
|---|---|---|
| `WatercolorDot.vue:1-107` | `<component :is="tag">` with `border-radius` morph + `filter: url(#watercolor-filter)` + box-shadow tiers | `:color` prop is a CSS string set straight onto `backgroundColor` (`:7`) — NO resolver needed; the browser paints the string. `tag: "div" \| "button"` (`:23`) |
| `composables/useWatercolorBlob.ts:1-138` | per-vertex rAF border-radius animation OR static seeded shape | depends on `@composables/prng`: `mulberry32`,`hashString`,`randomRadii`,`radiiToCSS` (`:2`) |
| `index.ts:1` | barrel | lift |
| (implicit) `SvgFilters.vue:4-26` | the `#watercolor-filter` `<defs>` singleton | **HIDDEN DEPENDENCY** — must be internalized (§2.4) |

`WatercolorDot` has **10+ distinct consumer contexts in the value.js demo** (grep confirms: `mix/MixResultDisplay.vue`, `mix/MixSourceSelector.vue`, `image-palette-extractor/ImageEyedropper.vue`, `color-picker/controls/SpectrumCanvas.vue`, `color-picker/editing/EditDrawer.vue`, `palette-browser/SwatchHoverMenu.vue`, `palette-browser/CurrentPaletteEditor.vue`, `palette-browser/PaletteDialog/.../PaletteDialogHeader.vue`, `dock/Dock.vue`). In EVERY site the `:color` is a pre-resolved CSS string. So watercolor-dot needs **no color-resolver seam at all** — it never decomposes color to channels. This sharpens the inv-K-3 scope: **the seam is a goo-blob concern only.**

### 1.3 The shared `prng` dependency (both primitives)

Both consume value.js `demo/@/composables/prng.ts:1-32` — `mulberry32`, `hashString`, `randomRadii`, `radiiToCSS`. These are 4 tiny pure functions (≤10 LoC each). glass-ui has no PRNG util today (grep: zero `mulberry32`/`hashString` in src/). **The lift must internalize these** — they are too small and too load-bearing (deterministic seeded shapes from the color string) to make a peer dependency. Recommend a private `src/utils/prng.ts` (NOT exported — it is a lift-internal helper, satisfies the overfitting rule as a ≥2-consumer internal: goo-blob satellites + watercolor-dot vertices). This is a clean lift target: 32 LoC, zero external deps.

---

## 2. The subpath surface + the inv-K-3 injected color-resolver seam

### 2.1 Subpath shape (mirror the aurora pattern)

Two new flat subpaths, each a standalone chunk:

```
@mkbabb/glass-ui/goo-blob        → dist/goo-blob.js   (WebGL2 chunk)
@mkbabb/glass-ui/watercolor-dot  → dist/watercolor-dot.js  (CSS/SVG chunk; lighter)
```

The wiring mirrors aurora exactly (the pattern is fully templated — `vite.library.ts:17` `aurora: resolve(rootDir, "src/aurora.ts")`, `src/aurora.ts` = `export * from "./components/custom/aurora"`, `package.json` exports `./aurora` `{types,import}` `:276-279`, `typesVersions` `aurora` `:49-51`). AT adds, per primitive:
- `src/goo-blob.ts` / `src/watercolor-dot.ts` (one-line `export *` mirror barrels)
- `vite.library.ts` entry rows
- `package.json` exports `{types, import}` entries (contract-v2 shape — no `development` condition)
- `package.json` `typesVersions["*"]` rows
- the `scripts/release.sh` subpath-publication probe picks them up automatically (inv: "subpath publication is binary", L.W0 Lane III) — the new subpaths are gated by `npm run verify-export-types` + `proof:resolution` with zero extra wiring.

**`goo-blob` exports** (from `components/custom/goo-blob/index.ts`):
- `GooBlob` (component)
- `useMetaballRenderer` (composable — value.js's Q.md §2.1.1 OPEN sub-asks land as its option surface)
- `useBlobMood`, `useBlobPointer`, `useBlobSatellites` (the sub-composables — exported so a consumer can compose a bespoke renderer; matches aurora exporting `useAurora` + `createAurora` + `useCursorInteraction`)
- types: `BlobMood`, `MoodParams`, `MetaballSource`, `BlobConfig`
- `BLOB_CONFIG_DEFAULTS`, `BLOB_CONFIG_KEY`
- **NEW (the seam):** `BlobColorResolver` type, `defaultBlobColorResolver` (glass-ui's own value.js-backed default), `BLOB_COLOR_RESOLVER_KEY` injection key — see §2.3.

**`watercolor-dot` exports** (from `components/custom/watercolor-dot/index.ts`):
- `WatercolorDot` (component)
- `useWatercolorBlob` (composable)
- `UseWatercolorBlobOptions` type
- `GlassWatercolorDefs` (the internalized `#watercolor-filter` singleton, §2.4) — OR auto-mount (recommend auto, §2.4).

NOTE on canonical naming-pair discipline (CLAUDE.md "Subpath naming pairs"): glass-ui already has a `watercolor` MEDIUM in aurora (`AuroraMedium = "...watercolor..."`, `presets.ts:48`). The subpath `watercolor-dot` reads cleanly distinct from the aurora medium — no name collision. But the design doc should call it out so a future audit doesn't flag a phantom pair.

### 2.2 What inv-K-3 actually forbids (the precise reading)

value.js coordination defines inv-K-3 in the H-SEED handoff as the rule that the lifted primitive must take an **injected color-resolver seam — no value.js default baked in**. The thing being forbidden is concretely identifiable: `useMetaballRenderer.ts:44-70` (`resolverCtx` + `cssColorToRgb` + `cssColorCache`) — the value.js demo's 1×1-`<canvas>` `getImageData` color resolver. It is:
- DOM-bound (`typeof document === "undefined"` guard `:46`) — breaks SSR/happy-dom,
- gamma-space (reads the canvas's sRGB byte, no linearization),
- silently-degrading (returns `[0.5,0.5,0.5]` gray on failure `:61`).

inv-K-3 says glass-ui must NOT inherit THIS as the un-overridable default. It does NOT forbid glass-ui from shipping ANY default — it forbids baking the DEMO's default such that the primitive is welded to it.

### 2.3 The seam contract (RECOMMENDED shape)

**`BlobColorResolver` is a pure function `(css: string) => [number, number, number]`** returning linear-or-gamma RGB in `[0,1]` (the shader's `uBaseColor` uniform — `metaball.frag.glsl:9`). The seam is provided by EITHER a prop OR an inject, prop wins (mirrors `GooBlob.vue`'s existing `inject(BLOB_CONFIG_KEY, null)` idiom `:28`):

```ts
// goo-blob/types.ts (lifted + extended)
export type BlobColorResolver = (css: string) => readonly [number, number, number];
export const BLOB_COLOR_RESOLVER_KEY: InjectionKey<BlobColorResolver> = Symbol("blobColorResolver");
```

```ts
// GooBlob.vue (extended)
const { color, seed = "", colorResolver } = defineProps<{
    color: string;
    seed?: string;
    colorResolver?: BlobColorResolver;   // prop seam (wins)
}>();
const injectedResolver = inject(BLOB_COLOR_RESOLVER_KEY, null);   // inject seam
const resolver = colorResolver ?? injectedResolver ?? defaultBlobColorResolver;
```

**Does glass-ui ship a default resolver? YES — but it is glass-ui's OWN, built on its already-present value.js peer, NOT the demo's canvas trick.** This is the reconciliation of the "is value.js a peer the consumer provides, or a pure-fn the consumer injects?" question:

> **value.js is ALREADY a glass-ui peer (R1).** So glass-ui's `defaultBlobColorResolver` is a pure fn it authors in `goo-blob/composables/color.ts`, composing `cssToOklch` (already in `aurora/composables/color.ts:119`) → `oklchToLinear` (`aurora/composables/color.ts:33`) — i.e. value.js's canonical Ottosson `parseCSSColor`/`srgbToOKLab`/`oklabToLinearSRGB` path. This is DOM-free (SSR-safe), linear-correct, and THROWS on invalid input (the inv-J-10 "fail explicitly" posture aurora already adopts) rather than silently returning gray.

The inv-K-3 requirement is satisfied because:
1. The DEMO'S canvas resolver (`useMetaballRenderer.ts:44-70`) is **deleted at lift** — not baked.
2. The default that ships is glass-ui's own, **fully overridable** at two levels (prop + inject).
3. A consumer with no value.js intent can pass `colorResolver={myFn}` and the value.js path is tree-shaken? — NO (value.js is reached unconditionally via the default fn's import). So the design must decide: is the default **eager** (import `cssToOklch` at module scope, value.js always in the chunk) or **lazy/opt-in** (the default is a thin `(css) => { throw "supply a colorResolver" }` stub and value.js is only reached if the consumer imports `defaultBlobColorResolver` explicitly)?

**RECOMMENDATION (the inv-K-3-strict reading):** ship `defaultBlobColorResolver` as a **named export the consumer opts into**, and make the GooBlob component's fallback a **fail-fast throw** when no resolver is supplied. i.e.:

```ts
const resolver = colorResolver ?? injectedResolver;   // NO baked default
if (!resolver) throw new Error(
  "GooBlob requires a colorResolver (prop or BLOB_COLOR_RESOLVER_KEY inject). " +
  "Import { defaultBlobColorResolver } from '@mkbabb/glass-ui/goo-blob' for the value.js-backed default."
);
```

This is the cleanest inv-K-3 honoring: the primitive ships with **no resolver baked** (consumer-required), AND glass-ui offers a one-line ergonomic default (`defaultBlobColorResolver`) on the SAME subpath that the consumer wires explicitly. value.js then reaches the goo-blob chunk ONLY when the consumer opts into the default. A consumer with their own OKLCh path (the value.js demo itself, post-lift) passes their own fn and never pulls glass-ui's value.js default. This keeps `dist/goo-blob.js`'s value.js reach **opt-in**, matching the "subpath-import discipline" payload ethos (CLAUDE.md) and the inv-K-3 letter exactly.

> The alternative (eager baked `defaultBlobColorResolver`) is more ergonomic but technically bakes a value.js default — a weaker inv-K-3 honoring. The wave plan should put this to the user as a 1-bit decision (DEC-AT-1) but the audit RECOMMENDS the strict fail-fast + opt-in-default shape.

### 2.4 The `#watercolor-filter` internalization (watercolor-dot)

The SVG filter singleton is the watercolor-dot lift's sharpest trap. Three options:

- **(A) Auto-mount via Teleport.** `WatercolorDot.vue` teleports a `<GlassWatercolorDefs/>` once per document (a module-level mounted flag so N dots share one `<defs>`). Zero consumer wiring — matches glass-ui's "component over CSS class" axis (the primitive bundles its own substrate). **RECOMMENDED.**
- **(B) Exported `<GlassWatercolorDefs/>` the consumer mounts once.** Explicit, but reintroduces the consumer-wiring trap (same class as a forgotten `@source`).
- **(C) Inline a per-instance `<filter>`.** N filters for N dots — wasteful but self-contained.

Recommend (A). The filter params (`baseFrequency="0.04" numOctaves="4" seed="2" scale="1.5"`, `SvgFilters.vue:13-23`) become `--watercolor-*` tokens so the look is token-tunable (token-first axis), with the lifted defaults as the canon. NOTE the filter id is GLOBAL — if two glass-ui-consuming libs both mount it, the id collides. Namespace it `glass-watercolor-filter` to avoid colliding with a consumer's own `#watercolor-filter`.

---

## 3. The D1 OKLCh GLSL shader retune (highest-risk item)

### 3.1 What changes — exact shader lines

The demo shader (`metaball.frag.glsl`) perturbs color in **HSV**. D1 replaces the HSV path with an **OKLCh/OKLab-L** path. The lines to change:

| Lines | Current (HSV) | D1 (OKLCh) |
|---|---|---|
| `:93-100` `vec3 rgb2hsv(vec3 c)` | full HSV decode | REPLACE with `rgb2oklab` / `rgb→oklch` (Ottosson sRGB→linear→LMS→OKLab→OKLCh). Port from value.js's canonical constants (the same matrices `oklabToLinearSRGB` inverts). |
| `:102-106` `vec3 hsv2rgb(vec3 c)` | full HSV encode | REPLACE with `oklab2rgb` / `oklch→rgb` (the forward Ottosson path the aurora shader's bake already trusts CPU-side). |
| `:146` `vec3 hsv = rgb2hsv(uBaseColor);` | decode base to HSV | `vec3 oklch = rgb2oklch(uBaseColor);` |
| `:148-150` hue/sat perturbation on `hsv.x/.y` | `hsv.x += (n-.5)*uHueRange/360.0; hsv.y = clamp(hsv.y + (n-.5)*uSatShift, 0, 1);` | perturb OKLCh **h** (degrees, `uHueRange` already in deg — no `/360`) + **C** (`uSatShift` → chroma delta). Perceptually-uniform hue rotation; far less lightness drift than HSV hue rotation. |
| `:151` `hsv.z = clamp(hsv.z + uBrightnessShift, 0, 1);` | brightness on HSV V | `oklch.x` (OKLab **L**) + `uBrightnessShift` — OKLab L is the perceptual lightness axis; this is the whole point of the D1 retune (a uniform L shift reads uniform; HSV V does not). |
| `:153-155` the inner edge-glow | `edgeGlow` mixes `hsv.z` up by 0.06 near the edge | **RE-TUNE** in OKLab L: the `+0.06` V bump becomes an L bump, and because OKLab L is perceptual, the visual glow magnitude shifts — the task flags this explicitly. The retune must re-pick the glow constant so the edge-glow reads the SAME as the HSV version did (a perceptual match, not a numeric copy). This is the subtle, untestable-by-unit part. |
| `:157` `vec3 rgb = hsv2rgb(hsv);` | encode | `vec3 rgb = oklch2rgb(oklch);` with a gamut clamp (`clamp(rgb,0,1)` or a soft desaturate — value.js's `gamutMapOKLab` is CPU-only; the GLSL needs a cheap in-shader clamp since a perturbed OKLCh can leave sRGB). |

The `uHueRange`/`uSatShift`/`uBrightnessShift` uniforms (`metaball.frag.glsl:33-35`, fed from `useMetaballRenderer.ts:221-223`) keep their names but change MEANING (degrees stay degrees for hue; sat→chroma; brightness→L). The CPU-side feeder (`useMetaballRenderer.ts:221`) divides hue by nothing and the GLSL did `/360.0` — that `/360.0` (`:149`) is DELETED since OKLCh h is already degrees. Mood params (`useBlobMood.ts` `hueRange:5..25`, `satShift`, `brightnessShift`) re-tune to OKLCh-natural magnitudes (an OKLCh chroma shift of 0.05 ≠ an HSV S shift of 0.05).

### 3.2 The gate (highest-risk — NO GLSL unit runner)

glass-ui has **no way to execute GLSL** (`vitest` + `happy-dom`, no WebGL; no Playwright). So the shader cannot be golden-imaged in-repo today. Two gate tiers:

**Gate tier 1 (PRIMARY — runnable today, vitest):** a **CPU-side OKLCh-equivalence test** that ports the NEW GLSL color math (`rgb2oklch`/`oklch2rgb` + the perturbation) to a TS reference and asserts it against value.js's canonical Ottosson core — exactly the pattern `aurora/__tests__/color-equivalence.test.ts` + `derive-aurora.test.ts` already use to gate the aurora bake's OKLab path. The test asserts:
- the GLSL `rgb2oklch`→`oklch2rgb` round-trip is identity to float tolerance over a color sweep,
- the GLSL forward matches value.js `srgbToOKLab`/`rawOklabToOklch` within the float epsilon a GPU `highp` allows,
- a zero-perturbation base (`uHueRange=0` etc.) yields `uBaseColor` unchanged (the no-op invariant),
- the edge-glow L-bump stays in-gamut after clamp.
This is the SAME gate-class glass-ui trusts for aurora's color core. It gates the MATH (the high-risk part) without executing GLSL.

**Gate tier 2 (STRETCH — optional new harness):** stand up a minimal Playwright + real-WebGL smoke, porting value.js's `e2e/smoke/webgl-goo-blob.spec.ts:9-57` (the context-loss survival check) AND adding a **frame-hash/golden**: render N frames at a fixed seed+time, read the pixel buffer, hash it, assert byte-stability across runs (the canonical "drawFrame byte-identical" gate-shape this repo already trusts — see commit `69d8202` "drawFrame byte-identical"). This requires a NEW Playwright harness in glass-ui (it has none) — a real cost, a wave of its own (AT.W-e2e). **Recommend tier 1 as the binding gate; tier 2 as an explicitly-optional stretch** flagged to the user, because the math is the risk and tier 1 covers it; the golden only adds regression-locking of the visual, which the demo-story consumer (#2, §5) covers manually.

> The shader's edge-glow PERCEPTUAL re-tune (`:153-155`) is the one thing NO automated gate settles (same class as AS's "P5 visual render confirmation" — a geometry/visual the code can't settle, deferred to a human visual confirmation, AS.md:117). The wave's gate must include a **manual visual-confirmation line item** (a demo story side-by-side: HSV-era look vs OKLCh-era look) — this is the P5-precedent for "the one thing code can't settle."

### 3.3 Why D1 is worth it (not gold-plating)

HSV hue rotation drags lightness (yellow→green at constant V reads as a brightness jump); OKLCh hue rotation is perceptually flat. The whole goo-blob aesthetic is a gently color-shifting organic body; doing that shift in OKLCh is the correct substrate and aligns the primitive with glass-ui's OKLCh-everywhere identity (aurora bakes OKLCh; tokens are OKLCh-derived). This is an architectural transposition for elegance (DESIRABLE per the precepts), not a patch.

---

## 4. Renderer abstraction — share a WebGL substrate, or standalone?

**Question:** should `useMetaballRenderer` share a WebGL substrate with `useAurora`/`useGlassRenderer` (an L5 transposition), or stay standalone?

**Finding — the three renderers do NOT share plumbing today:**
- aurora's `runtime.ts` hand-rolls its GL (its own `createAurora` imperative runtime; no shared util),
- `useGlassRenderer` (`composables/glass/useGlassRenderer.ts`) is its own WebGL/WebGPU frost renderer,
- value.js's `useMetaballRenderer` imports `@lib/animation/webgl-utils` (4 tiny helpers: `compileShader`/`linkProgram`/`createQuadVAO`/`getUniforms` — all fullscreen-quad boilerplate).

All three share the SAME 4-function boilerplate (compile, link, quad-VAO, uniform-locations) but each re-implements it. There IS a latent shared substrate (`src/composables/glass/webgl/` already exists as the WebGL-asset home).

**RECOMMENDATION: lift goo-blob's renderer STANDALONE in AT; do NOT attempt the L5 shared-substrate transposition in this tranche.** Rationale:
1. **Scope discipline.** AT's headline is the lift + the seam + the D1 shader. Refactoring aurora + glass + the new metaball renderer onto a unified GL substrate is a separate, higher-blast-radius transposition that would touch the two most visually-load-bearing shipped surfaces (aurora, glass). Bundling it into the lift wave risks the lift.
2. **The shared util is 4 trivial functions.** Internalize value.js's `webgl-utils.ts` as a private `src/composables/glass/webgl/glUtils.ts` (or co-located in goo-blob). It is small enough that duplication-with-aurora is NOT an overfitting violation today (aurora's GL is INSIDE its imperative runtime, not a shared util — there is nothing to dedupe against without first extracting aurora's).
3. **Name-forward the transposition.** The L5 "unify the three GL renderers behind one `createGLProgram`/quad substrate" is a legitimate FOLLOW-ON (a future tranche's gestalt cleanup) — seed it into AT's H-SEED forward-carry ledger as a named opportunity, gated on ≥2 (it already has 3 consumers: aurora, glass, metaball — so the ≥2 bar is MET the moment goo-blob lands, which is exactly why it should be a deliberate next-tranche wave, not a rushed sub-lane of the lift).

> So: standalone now, with the shared-substrate extraction named-forward as the natural next move once goo-blob makes it a 3-consumer case.

---

## 5. The ≥2-distinct-consumer gate (the overfitting bar)

The precept: every src/ artefact has ≥2 DISTINCT consumer CONTEXTS, OR is exported public, OR is a private demo helper. Both new subpaths are **exported public** — so they clear the bar by the "exported" clause automatically (a published subpath IS the public surface). But the SPIRIT of the rule (no abandonware substrate) wants ≥2 real consumers. The analysis per primitive:

**watercolor-dot — ≥2 MET decisively.** Post-lift, value.js's demo re-points its 10+ `WatercolorDot` sites at `@mkbabb/glass-ui/watercolor-dot` (the consumer-side rewrite is value.js's own arm per inv-16, NOT glass-ui's to execute). That is the canonical "this primitive has real demand" signal — it is the most-used demo primitive in the value.js corpus. Consumer #1 = value.js demo (10+ sites). Consumer #2 = a glass-ui demo story (AT ships one — see below). Bar MET, comfortably.

**goo-blob — ≥2 is THINNER; AT must ship a glass-ui demo story as consumer #2.** Consumer #1 = value.js demo's `HeroBlob.vue` (the single `<GooBlob>` site — `color-picker/visual/HeroBlob.vue:5`). That is ONE consumer context. The candidate second consumers and their verdict:
- **value.js's D1 shader path / the OKLCh retune** — NOT a distinct CONSUMER, it is the same primitive's internal. Does not count.
- **speedtest AU-R4 aurora** — speedtest does NOT consume value.js (Q.md §4.1 stale-coord correction) and there is no evidence speedtest wants a goo-blob; do NOT count this as a real consumer. Naming it would be speculative substrate.
- **a glass-ui demo story** — THE legitimate consumer #2. AT ships `demo/stories/blob-primitives.vue` (or folds into an existing motion/aurora story) that mounts both `<GooBlob>` and `<WatercolorDot>` with glass-ui tokens + the `defaultBlobColorResolver` wired, AND a side-by-side HSV-vs-OKLCh comparison for the §3.2 manual visual-confirmation. This is a "private demo helper" consumer (the third overfitting clause) AND a real second consumer context.

**Verdict on the bar:** the bar is GENUINELY MET for watercolor-dot (real ≥2: value.js demo + glass-ui story). For goo-blob the bar is met by **export-public + value.js-demo (1 real) + glass-ui-demo-story (consumer #2)** — i.e. AT SHIPS the glass-ui demo story as the binding second consumer. This is honest: goo-blob is a single-real-consumer primitive today, and AT's demo story is what makes the lift not-abandonware. The wave plan must therefore include the demo story as a HARD deliverable (not optional), or the goo-blob lift fails the overfitting audit at close.

> One caveat worth flagging to the user: if value.js's HeroBlob is goo-blob's ONLY real (non-demo) consumer, the lift is essentially "move value.js's demo primitive into glass-ui so value.js can consume it as a published peer." That is a LEGITIMATE motive (it makes the primitive a real shared-design-system citizen, and value.js becomes the deciding consumer voice per Q.md §2.1's "sole-identified-consumer" framing) — but the wave should state it plainly rather than manufacture phantom consumers. The headline value is the D1 shader (an actual improvement) + the inv-K-3 seam (a real architectural hardening), with the demo story as the second-consumer proof.

---

## 6. Wave breakdown + per-wave hard gate

Recommended decomposition (DEV/IMPL boundary honored — W0 is this audit + the design slices; W1+ are IMPL):

| Wave | Type | Deliverable | Hard gate |
|---|---|---|---|
| **AT.W0** | DEV — audit/design | THIS file + the sibling L-lens audits; the seam-shape decision surfaced as DEC-AT-1 (strict fail-fast vs eager default); the renderer standalone-vs-L5 ruling; the gate-tier ruling (vitest-equivalence primary, Playwright stretch optional) | design slices reviewed; DEC-AT-1 ruled by user; build/typecheck green (no src/ touched) |
| **AT.Wx — lift watercolor-dot** | IMPL | `src/components/custom/watercolor-dot/` (component + `useWatercolorBlob` + internalized `glass-watercolor-filter` defs auto-mount, §2.4) + private `src/utils/prng.ts` + `src/watercolor-dot.ts` barrel + `vite.library.ts`/`package.json`/`typesVersions` wiring | `npm run build` emits `dist/watercolor-dot.js` + `.d.ts`; `npm run verify-export-types` + `proof:resolution` green for `/watercolor-dot`; vitest unit for `useWatercolorBlob` (deterministic seeded shape from color string; rAF cleanup on unmount); the filter renders without consumer wiring (the §2.4 auto-mount proof) |
| **AT.Wy — lift goo-blob** | IMPL | `src/components/custom/goo-blob/` (component + `useMetaballRenderer` MINUS the demo's `cssColorToRgb` resolver + `useBlobMood`/`useBlobPointer`/`useBlobSatellites`) + the inv-K-3 seam (`BlobColorResolver`/`BLOB_COLOR_RESOLVER_KEY`/`defaultBlobColorResolver` per §2.3) + internalized GL utils (§4) + barrel/build/exports wiring. Shader stays HSV in THIS wave (the retune is Wz) | `dist/goo-blob.js` + `.d.ts` emitted; `/goo-blob` resolution-gated; **inv-K-3 proof**: a unit test asserts `GooBlob` with NO resolver supplied THROWS (no baked default); `defaultBlobColorResolver` resolves a known color to the value.js-canonical linear RGB (asserted against `cssToOklch`→`oklchToLinear`); context-loss recovery + reduced-motion paths unit-covered; **value.js reach is opt-in** (a proof that `dist/goo-blob.js` does not pull value.js unless `defaultBlobColorResolver` is imported — mirror the `/motion-core` engine-free proof, AP.W3 R0G-7) |
| **AT.Wz — the D1 OKLCh shader retune** | IMPL | `metaball.frag.glsl` HSV→OKLCh per §3.1 (the exact lines) + edge-glow perceptual re-tune + mood-param magnitude re-tune (`useBlobMood.ts`) + the CPU-side equivalence test | **PRIMARY gate**: the vitest OKLCh-equivalence test (§3.2 tier 1) green — round-trip identity, value.js-core match, zero-perturbation no-op, in-gamut-after-clamp; **manual visual confirmation** line-item (demo-story HSV-vs-OKLCh side-by-side, the P5-precedent §3.2); `npm run typecheck` green |
| **AT.W(demo) — the glass-ui demo story** (can fold into Wy/Wz close) | IMPL | `demo/stories/blob-primitives.vue` mounting both primitives with glass-ui tokens + `defaultBlobColorResolver` wired + the OKLCh comparison view — consumer #2 per §5 | story renders in the demo harness; the overfitting audit at AT close confirms goo-blob's ≥2 (value.js HeroBlob + this story) and watercolor-dot's ≥2; FINAL records the second-consumer proof |
| **AT.W-e2e (OPTIONAL stretch)** | IMPL | a minimal Playwright + real-WebGL harness in glass-ui (it has none today) porting value.js `webgl-goo-blob.spec.ts` + a frame-hash golden | OPT-IN; if undertaken: context-loss-survival + byte-stable frame-hash green. Explicitly flagged as stretch — tier-1 vitest gate is the binding one |

**Wave ordering rationale:** watercolor-dot first (lighter, no seam, no shader — proves the lift mechanics + the filter-internalization + prng-internalization in the lowest-risk module). Then goo-blob WITH the seam but on the UNCHANGED HSV shader (isolates the lift+seam risk from the shader risk). Then the D1 shader as its own wave (the highest-risk item gets a dedicated wave + a dedicated gate, byte-isolated from the lift). This mirrors AS's discipline of byte-isolating the high-risk change ("drawFrame byte-identical" — the shader change is provable-distinct from the mechanical lift).

---

## 7. Decisions to surface to the user (DEC-AT-*)

- **DEC-AT-1 (the seam shape):** strict fail-fast + opt-in `defaultBlobColorResolver` (inv-K-3-strict, value.js opt-in, RECOMMENDED §2.3) vs eager-baked value.js default (more ergonomic, weaker inv-K-3 honoring). Audit recommends strict.
- **DEC-AT-2 (the shader gate ceiling):** vitest-equivalence-only (tier 1, binding) vs also-stand-up-Playwright-WebGL (tier 2 stretch, a new harness glass-ui lacks). Audit recommends tier-1-binding, tier-2-optional.
- **DEC-AT-3 (renderer abstraction):** standalone lift now + name-forward the L5 GL-substrate unification (RECOMMENDED §4) vs attempt the unification in AT (blast-radius risk on aurora/glass). Audit recommends standalone + name-forward.
- **DEC-AT-4 (filter internalization):** auto-mount Teleport singleton (§2.4 option A, RECOMMENDED) vs exported `<GlassWatercolorDefs/>` consumer mounts.

## 8. inv-16 / cross-repo note

Everything above is glass-ui-internal authoring. The value.js consumer-side rewrite (re-point the 10+ `WatercolorDot` sites + the 1 `GooBlob` site at the published subpaths; retire the demo-private copies; supply value.js's OWN `colorResolver` — likely its real OKLCh path, not the canvas trick) is **value.js's own arm**, name-forward only — AT does NOT execute it. AT's H-SEED forward-carry ledger names it as the consumer-adoption follow-on (the Q.md R1/R3 "sole-identified-consumer" thread resolves when value.js adopts). The L5 GL-substrate unification (§4) is likewise named-forward as a glass-ui future-tranche opportunity.
