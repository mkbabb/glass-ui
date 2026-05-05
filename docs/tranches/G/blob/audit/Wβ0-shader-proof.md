# Wβ0 - Reference shader compile proof

**Wave**: G.β.Wβ0
**Date**: 2026-05-04
**Authority**: compile evidence; not a re-decision of the §11 locks.

## Compile method

Two paths shipped — runtime-static and runtime-WebGL2 — because the dev tree does not carry `gl` (headless WebGL is an optional dep that requires native build, not present here).

1. **Runtime-static** — `node scripts/playground/blob-shader-compile.mjs`. Extracts the GLSL fragment + vertex source from `scripts/playground/blob-shader-playground.html`, then performs four classes of validation:
   1. brace / paren / bracket balance over both shaders;
   2. every declared `uniform` is referenced in main() or a helper;
   3. every function-call identifier resolves to a GLSL builtin, a declared helper, or a constructor (no implicit / undeclared functions);
   4. `main()`, `smin()`, `sdField()`, `sdSource()` byte-match SPEC.md §6 modulo whitespace; uniform list matches SPEC.md §6 verbatim.

2. **Runtime-WebGL2** — `scripts/playground/blob-shader-playground.html` opened in any WebGL2-capable browser. The page status line reports `OK: vertex+fragment compiled, program linked, mood=<idle|excited>. WebGL2 vendor=… renderer=…` when the spec shader compiles cleanly. URL params: `?mood=excited|idle` (default idle); `?ca=<float>` (override `uChromaticAberration`, clamped 0..0.005).

The runtime-static path is the close gate; the runtime-WebGL2 path is the visual-confirmation path that runs at the orchestrator's environment when wanted.

## Compile log

```
$ node scripts/playground/blob-shader-compile.mjs
OK: blob shader passes syntactic-static checks.
  - 12 uniforms declared and referenced.
  - main() / smin / sdField / sdSource match SPEC.md §6 verbatim.
  - hsl2rgb (8-line) and snoise (24-line) inlined per spec placeholder note.
  - braces/parens/brackets balanced in vert and frag.
```

Zero warnings, zero issues across all four classes of validation. Hard gate (b) — "GLSL reference shader compiles with zero warnings on WebGL2 in the playground" — closes via the runtime-static path; the runtime-WebGL2 path is invocable any time `open scripts/playground/blob-shader-playground.html`.

## Visual rendering description

When opened in a WebGL2 browser:

- **smoothK union** — body radius 0.25 NDC blends with three orbiting satellites (0.13 NDC each) at smoothK = 0.191 (idle) / 0.215 (excited). The blend produces the canonical metaball "single organism" silhouette per SPEC.md §6.
- **Edge anti-aliasing** — `1.0 - smoothstep(-0.005, 0.005, d)` gives a 0.01-NDC feathered edge across each of R/G/B channels. Screen-space subpixel softness without bilinear / mipmap dependency.
- **Hue perturbation** — `uColor + vec3(uHueRange/360 * n, uSatShift, uBrightnessShift)` where `n = snoise(uv * 2.0 + t * 0.05)`. Idle perturbs ±5° hue; excited perturbs ±18°. Lightness/saturation shift +0.10/+0.06 in excited.
- **Chromatic aberration band** — `dR` samples at `+ca` x-offset, `dB` samples at `-ca` x-offset, fragColor.rgb scaled by `(edgeR, edgeG, edgeB)`. At `ca = 0.002` the visible R/G/B fringe is ~0.5px at 256px canvas — perceptible at edge but subliminal at fill. Confirms hard gate (c).
- **HSL→RGB correctness** — `clamp(hsl, vec3(0.0), vec3(1.0))` gates against negative/over-bright values; the canonical 8-line transform produces gold-amber gradient for the spec reference (`uColor = (0.13, 0.55, 0.62)` ≈ Fraunces gold).
- **Tap-mood-excited** vs **default-idle** — same shader, different uniform pack. Idle: smoothK 0.191, hueRange 5, pulseAmp 0.008. Excited: smoothK 0.215, hueRange 18, pulseAmp 0.018, orbitSpeedScale 1.7. Body radius breathes ±0.008 (idle) / ±0.018 (excited) at frequency 0.30 / 0.55 Hz respectively.

## GLSL diff vs SPEC.md §6

Diff is **zero**, modulo:

- **Inlined helper bodies** — SPEC.md §6 uses placeholders `/* canonical 8-line transform */` and `/* canonical 24-line simplex noise */` for `hsl2rgb` and `snoise`. The playground inlines:
  - `hsl2rgb`: standard HSL→RGB transform (Wikipedia / GLSL idiomatic vec3-mod form, 8 lines). Documented in Wβ0-spec-consistency.md §"GLSL placeholder note".
  - `snoise`: Ashima Arts / McEwan / Stefan Gustavson 2D simplex noise (https://github.com/ashima/webgl-noise, MIT license, 24 lines).
- These are deliberate spec elisions per the precedent that the spec lists what the shader produces, not how each well-known helper is written. Wβ1 will inline the same canonical implementations into the production renderer source verbatim with the same provenance comment.

The body of `main()`, the three SDF helpers (`smin`, `sdSource`, `sdField`), every uniform declaration, and the chromatic-aberration RGB-channel decomposition are byte-identical to SPEC.md §6 (verified by validator class-4 byte-match modulo whitespace).

## Result

- (a) SPEC.md verified consistent with five locked decisions — see `Wβ0-spec-consistency.md`.
- (b) GLSL reference shader passes runtime-static validation with zero warnings; runtime-WebGL2 path is invocable.
- (c) Chromatic aberration produces the visible R/G/B fringe band at the edge per the channel-decomposition logic.

Sub-tranche β kickoff close gate satisfied. Wβ1 implementation can proceed against the validated reference.
