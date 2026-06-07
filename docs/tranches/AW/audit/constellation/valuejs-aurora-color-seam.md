# valuejs-aurora-color-seam — AW.W5's color seam is correctly value.js-rooted; the derive-color DOMAIN layer is glass-ui's to own, but the `huePath` atom DUPLICATES a function value.js already ships, and value.js needs ZERO new harmony/derive API

## Findings

### 1. The seam is ALREADY a clean value.js-rooted leaf — the AW.W5 plan inherits a correct foundation, not a greenfield

`src/composables/color/index.ts` is the single runtime-JS color leaf. Every primitive it ships imports value.js directly and re-implements NO color math:

- `src/composables/color/index.ts:17-25` imports `colorUnit2, oklabToLinearSRGB, oklabToRgb255, parseCSSColor, rawOklabToOklch, rawOklchToOklab, srgbToOKLab` from `@mkbabb/value.js`.
- `oklchToLinear` (`:50-54`) = `rawOklchToOklab → oklabToLinearSRGB` + the ACES `Math.max(0,·)` wrap.
- `cssToOklch` (`:79-85`) = `parseCSSColor → colorUnit2 → srgbToOKLab → rawOklabToOklch` — DOM-free, value.js parser.

The aurora CPU derive path (`src/components/custom/aurora/composables/color.ts:13-26`) imports the leaf AND value.js's `gamutMapOKLab`/`isInSRGBGamut`/`srgbToOKLab` directly. The header comment (`color.ts:3-12`) is explicit: the aurora-DOMAIN composers (`deriveAurora`, `gamutMapStop`, the bake) "keep sourcing their math from value.js DIRECTLY — that is still ONE source (value.js), not a re-implementation." This is the UNION-COORDINATION contract already honored at HEAD: value.js owns color, glass-ui composes.

### 2. value.js owns the LOW-LEVEL science; it ships NO harmony/derive/scheme DOMAIN layer — so AW.W5.2 does NOT duplicate value.js math

I read value.js's full public color surface (`/Users/mkbabb/Programming/value.js/src/index.ts:61-168`) and grep'd the whole `src/units/color/` tree. What value.js exports:

- The 15 `Color` subclasses incl. `OKLCHColor`/`OKLABColor` (`index.ts:62-79`) — but the base `Color` class (`units/color/index.ts:108`) is a pure conversion + channel-access surface; it has NO `lighten`/`saturate`/`rotateHue`/`harmonize` instance methods (verified — only `toString`, channel getters, the V8-monomorphic shape).
- Perceptual mixing: `mixColors`/`mixColorsN` (`index.ts:123-142`; impl `dispatch.ts:277`), default space `oklab`, with premultiplied-alpha + hue-method.
- `interpolateHue` + `HueInterpolationMethod` (`index.ts:127,131`; impl `dispatch.ts:219-268`).
- Gamut: `gamutMapOKLab`, `gamutMapSRGB`, `gamutMap`, `isInSRGBGamut`, `findCusp`, `findGamutIntersection`, `computeMaxSaturation`, `deltaEOK` (`gamut.ts`/`dispatch.ts`).
- Contrast/accent: `computeSafeAccent`, `safeAccentColor`, `needsContrastAdjustment`, `getOklchLightness` (`contrast.ts:26-90`).
- Image quantize → palette EXTRACTION (`quantize/index.ts`) — a DIFFERENT concern (extract-from-image, not derive-from-seed).

A grep for `harmon|palette-derive|complement|analog|triad|tetrad|scheme` across `value.js/src/` returns ONLY the quantize palette-extraction and incidental hits (`dispatch.ts:76` "derives the exact" is a TS-type comment). **value.js has no `deriveAurora`-class generator, no `complementary(seed)`/`analogous(seed)`/`triad(seed)` harmony function, no eased-ramp/temperature-coupled palette builder.** AW.W5.2's `deriveHue`/`deriveAurora`/`deriveScene`/`temperatureShift`/eased-L-C is GENUINELY new DOMAIN composition, not a value.js re-own. The aurora `deriveAurora` (`color.ts:152-200`) + `gamutMapStop` (`color.ts:250-262`) are thin composers over value.js's `gamutMapOKLab` round-trip — this is correct per the contract.

### 3. THE ONE DUPLICATION FLAG: AW.W5.1's `huePath` atom re-invents value.js's `interpolateHue` + `HueInterpolationMethod`

AW.W5 scope item 3 (`AW.W5-aurora-color-derive.md:28`) plans a `huePath` atom with the union `shorter | longer | increasing | decreasing` and cites "MDN `<hue-interpolation-method>`". value.js ALREADY ships exactly this:

- `HueInterpolationMethod = "shorter" | "longer" | "increasing" | "decreasing"` — `value.js/src/units/color/dispatch.ts:219`, exported from the barrel at `index.ts:131`.
- `interpolateHue(h1, h2, t, method)` — `dispatch.ts:234-268`, the full four-branch arc implementation (normalized [0,1] hues).

The wave's GLSL arm (the GPU `samplePalette` hue-arc) is NECESSARILY a GLSL transcription — value.js cannot run on the GPU. But:
   - **The CPU-side `huePath` TYPE must be value.js's `HueInterpolationMethod`, not a new glass-ui union.** A parallel glass-ui `type HuePath = "shorter"|...` would be a duplicate of a peer-owned type — the no-duplicate-substrate invariant. The aurora config's `huePath` field should be `import type { HueInterpolationMethod } from "@mkbabb/value.js"` (re-exported through `/api` as an alias if a public name is wanted).
   - **The CPU REFERENCE for the GLSL hue-arc gate must be value.js's `interpolateHue`,** not a hand-rolled TS arc in the proof script. The gate `proof:aurora-oklch-interp` (`:112,141`) asserts the matrices to 1e-6 but the wave does NOT currently say its midpoint-chroma / hue-arc CPU reference routes through value.js's `interpolateHue` — it should, so the GLSL hue-arc is locked to the value.js arc the same way the matrices are locked to the value.js constants.

### 4. The matrix lock is already real but PARTIAL — the W5 gate must extend the EXISTING value.js drift canary, not stand alone

The in-shader GLSL OKLCh math IS necessarily GPU-duplicated. The lock that keeps it honest already exists in two forms:

- `procedural-color.glsl.ts:27-34,73-105` — the `OKLCH_MATRICES_GLSL` chunk is documented as "value.js's EXACT Ottosson values" transposed for column-major GLSL, with the blob's `tests/components/custom/goo-blob/blob-color-equivalence.test.ts` as the "8-assertion 1e-6 gate" (registered `package.json:587`).
- `tests/components/custom/aurora/color-equivalence.test.ts:54-118` — `EPS=1e-6`, asserts the aurora CPU helpers "≡ value.js canonical core (inv-K-2)".
- `proof:single-color-core` + `proof:color-acyclic` (`package.json:572-573`) keep the runtime graph one-core + DAG.

The NEW `proof:aurora-oklch-interp` gate (`AW.W5-aurora-color-derive.md:112,141`) must assert the spliced aurora `OKLCH_MATRICES_GLSL` matches the value.js Ottosson constants to 1e-6 — but the chunk is SHARED with the blob (already locked by `blob-color-equivalence`). The aurora gate is splicing the SAME already-locked chunk, so its NEW assertion is the chunk-identity + the interpolation-space (midpoint-chroma) behaviour, not a second matrix transcription. The plan's §3a triumvirate trigger "the spliced GLSL matrices drift from the value.js constants" (`:53`) is the right canary. CONFIRMED: the CPU side is locked to value.js; the GLSL side is locked to value.js's constants by the chunk-provenance + the equivalence gate.

### 5. The WGSL twin (AW.W7) extends the SAME value.js lock to a THIRD GPU copy — the seam is the pre-empt for a known bug class

AW.W7.2 (`AW.W7-aurora-webgpu.md:24,105-109`) makes `procedural-color.glsl.ts` emit/twin a WGSL OKLCh chunk gated by `proof:aurora-wgsl-equivalence` to 1e-6 against the GLSL twin. The GLSL is the reference; the GLSL is locked to value.js. So the chain is: **value.js (CPU truth) → GLSL chunk (1e-6 to value.js) → WGSL chunk (1e-6 to GLSL).** This is the explicit pre-empt of the AV.W1 divergence-bug class (two un-converged shader copies darkened aurora ~2.2×). The seam is sound; the only gap is that the equivalence gates lock CONSTANTS — the W5 `huePath` arc and W5.2 `chromaEasing`/`temperatureShift` are NEW behaviours that have no CPU value.js reference to lock against (because value.js has no harmony/easing API — see Finding 6).

### 6. value.js's version pin is STALE in glass-ui — and the local value.js (0.11.0) already has everything W5 needs except harmony

glass-ui `package.json:616,647` pins `@mkbabb/value.js: ^0.10.0` (peer + dev). The local value.js `package.json` is `0.11.0`. `^0.10.0` does NOT admit 0.11.0 — a consumer installing glass-ui against value.js 0.11.0 would get a peer-range warning, and glass-ui CI resolving the registry 0.10.x would NOT have whatever 0.11.0 added. The `interpolateHue`/`HueInterpolationMethod` and `mixColorsN` W5 wants ALL exist in the local tree (verified at HEAD); the question is whether they shipped in the 0.10.x line glass-ui's peer admits. This is a pin-coordination edge the wave-spec must resolve (bump the peer to `^0.10.0 || ^0.11.0` or `^0.11.0`).

## Wave-forming input

### A glass-ui AW.W5 AMENDMENT (consume value.js, don't re-own)

- **Scope add to AW.W5.1:** the aurora config `huePath` field TYPE is `HueInterpolationMethod` imported from `@mkbabb/value.js` (re-export through `src/api/index.ts` if a public alias `AuroraHuePath` is wanted) — NOT a new glass-ui union. File bound: `aurora.frag.ts` uniform stays GLSL-int; the TS config field + `uniformBridge.ts` thread (`AW.W5-aurora-color-derive.md:63,110`) take the value.js type.
- **Scope add to AW.W5.1 gate:** `proof:aurora-oklch-interp`'s midpoint-chroma / hue-arc CPU reference routes through value.js's `interpolateHue` + `mixColorsN(space:"oklab"/"oklch")` (`value.js/src/units/color/dispatch.ts:234,277`), so the GLSL hue-arc is locked to the value.js arc the same way the matrices are locked to value.js constants. Gate sketch: TS-port the GLSL `samplePalette` hue-arc, assert it matches `interpolateHue(h1,h2,t,method)` to 1e-6 for each of the four methods over a vivid-pair matrix; assert the blue→yellow OKLab-rectangular midpoint holds chroma above the linear-`mix` midpoint. Bite: revert `samplePalette` to linear `mix()` → midpoint-chroma assertion REDs.
- **Scope clarification (NEGATIVE):** AW.W5.2's `deriveHue`/`deriveAurora`/`deriveScene`/`temperatureShift`/eased-L-C is correctly glass-ui DOMAIN — value.js has NO harmony/derive/scheme/easing-ramp API, so there is NOTHING to consume here. Keep it in `color.ts`. Do NOT push it down into value.js (it is aurora-domain — `AuroraConfig` + nuclei + medium + motion in `deriveScene` are glass-ui types value.js must not know).
- **Peer-pin fix (publish-coordination, sequence on whichever value.js version ships `interpolateHue`/`mixColorsN`):** bump `package.json` `@mkbabb/value.js` peer + dev from `^0.10.0` to admit the version carrying `interpolateHue`/`HueInterpolationMethod`/`mixColorsN` (local is 0.11.0). Add a one-line note to the W5 commit body. Without this the gate can pass locally (0.11.0 linked) but a registry-resolved 0.10.x consumer/CI lacks the export.

### A value.js WAVE — verdict: NONE REQUIRED (honest negative)

value.js needs ZERO new exports for AW.W5. Everything the seam consumes already ships at HEAD: `rawOklchToOklab`/`rawOklabToOklch`/`oklabToLinearSRGB`/`srgbToOKLab`/`oklabToRgb255` (the conversions), `gamutMapOKLab`/`isInSRGBGamut` (the gamut guard), `interpolateHue`/`HueInterpolationMethod`/`mixColorsN` (the perceptual interpolation the GLSL arc mirrors + the CPU reference). A harmony/derive API in value.js would be SPECULATIVE substrate — aurora is its only consumer (the derive logic is aurora-domain), violating the ≥2-consumer invariant. The only value.js-side item is publication discipline: confirm `interpolateHue`/`HueInterpolationMethod`/`mixColorsN` are in a TAGGED 0.10.x-or-later that glass-ui's peer admits (they are present at HEAD `dispatch.ts:219,234,277` + barrel `index.ts:127,131,142`). If they landed only in unreleased 0.11.0, value.js must CUT that release before glass-ui's W5 gate can be CI-green against the registry — that is a value.js publish step, not a code wave.

### Sequencing edges

- AW.W5.1 (GLSL OKLCh + huePath) → AW.W4 (van-Gogh/oil-pastel consume the OKLCh `brokenColorJitter` seam; `AW.W4:8,202`) → AW.W7.2 (WGSL twin locks to the GLSL OKLCh contract; `AW.W7:24,109,175`).
- AW.W5.2 (`deriveAurora` harmonies/`deriveScene`) → AW.W6 (`resolveAtoms` `seed`/`harmony` atoms route through W5's `deriveAurora`/`deriveScene`, NO duplicate derivation — `AW.W6:23-24`).
- value.js publish of `interpolateHue`/`mixColorsN` (if 0.11.0-only) → glass-ui peer-pin bump → AW.W5 gate CI-green.

## Anti-findings (verified FINE / already done)

1. **The seam is NOT duplicating value.js color science.** `src/composables/color/index.ts` + `color.ts` re-implement NO conversions — all routed through value.js (`color.ts:3-12` is explicit). Verified file-by-file.
2. **AW.W5.2's derive-color is NOT a value.js re-own.** value.js has no harmony/derive/scheme API (grep'd the whole `units/color/` tree). It is correct glass-ui aurora-domain composition over value.js's `gamutMapOKLab`.
3. **The in-shader GLSL OKLCh is correctly locked to value.js.** `OKLCH_MATRICES_GLSL` (`procedural-color.glsl.ts:73-105`) is documented as value.js's EXACT Ottosson constants, gated by `blob-color-equivalence` (1e-6) + the aurora `color-equivalence.test.ts` (1e-6) + `proof:single-color-core`/`proof:color-acyclic`.
4. **The matrices ship ZERO new payload for aurora** — the chunk is already shipped + goo-blob-proven (`AW.W5:16,24`). Confirmed: `procedural-color.glsl.ts:73-134` exists at HEAD; aurora simply does not import it yet (`aurora.frag.ts:29-32` imports only `FBM_ROT_GLSL`/`OETF_GLSL`).
5. **`gamutMapStop` (`color.ts:250-262`) is correct** — the documented over-1-nudge + sub-1.1e-4-negative-residual handling is real, exercised by the adversarial neon × harmony matrix in `tests/.../derive-aurora.test.ts:49-69`. The plan keeps it verbatim (`AW.W5:38,121`).
6. **The existing `derive-aurora.test.ts` already sources its reference from value.js** (`tests/.../derive-aurora.test.ts:3-7` imports `isInSRGBGamut`/`oklabToLinearSRGB`/`rawOklchToOklab`) — the W5.2 `proof:aurora-derive-gamut` extends this established pattern.

## Summary

The value.js↔aurora-color seam is HEALTHY and the AW.W5 plan inherits it correctly: the CPU `/color` leaf and aurora `color.ts` re-implement no color math (all value.js-routed), and the in-shader GLSL OKLCh matrices are documented as value.js's EXACT Ottosson constants, locked 1e-6 by the blob + aurora equivalence tests. AW.W5.2's `deriveAurora`/`deriveScene` harmony/easing/temperature is GENUINELY glass-ui aurora-domain — value.js ships NO harmony/derive/scheme API, so there is no duplication and NO value.js wave is warranted (a harmony API in value.js would be speculative single-consumer substrate). The ONE duplication flag: AW.W5.1's planned `huePath` atom re-invents value.js's already-shipped `HueInterpolationMethod` union + `interpolateHue` arc (`value.js dispatch.ts:219,234`) — the amendment is to import that type from value.js and route the GLSL hue-arc gate's CPU reference through `interpolateHue`/`mixColorsN`, so the arc is locked to value.js the same way the matrices are. Second edge: glass-ui's `^0.10.0` value.js peer pin (`package.json:616`) is stale vs the local 0.11.0 that carries `interpolateHue`/`mixColorsN` — the W5 gate's CI-green-against-registry hinges on either those exports being in a tagged 0.10.x or a peer bump + value.js publish.

Digest path: /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/audit/constellation/valuejs-aurora-color-seam.md
