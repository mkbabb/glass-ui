# W-AURORA-SWRASTER — DELTA (the headless-safe aurora + the luminance-faithful fallback)

## Freshness header

| field | value |
|---|---|
| Capture date | 2026-06-17 |
| HEAD sha (born-RED baseline) | `2138ac02` |
| Gate | `proof:aurora-swraster` (born-RED → GREEN) |
| Binding π | `tests-visual/aurora-swraster.spec.ts` (headless, NO `--use-gl=angle` dependency) |
| Config seed | `DEFAULT_AURORA_CONFIG` — palette `[(0.72,0.10,220),(0.86,0.06,200),(0.95,0.03,80)]`, nuclei `[(0.3,0.3,r0.5,bias0.0),(0.7,0.65,r0.5,bias1.0)]`, softmaxBeta 3.0, valueVariance 0.08 (deterministic — the ground is `f(palette + nuclei)`) |
| Certify band (named conservative bound) | mean ΔL ≤ 0.05, per-quadrant ΔL ≤ 0.08 (the AA contrast-headroom band; the speedtest P14/P15 floor is a witness-PROCESS label, not a numeric, so the band is sized from the AA-headroom the certify needs — §scope-4 triumvirate "named conservative bound") |

## The gap (precise, not "no fallback exists")

A CSS fallback + a software-raster detector BOTH already existed; the gap was two-sided and narrow:

1. **The software-raster signal was `"auto"`-ONLY (the wedge vector).** `resolveRenderMode(mode)` consulted `isSoftwareWebGLRenderer()` only inside the `if (mode === "auto")` branch — a consumer (or capture harness) that pinned `mode:"webgl"`/`mode:"capture"` bypassed the probe, armed the full-viewport WebGL2 surface under SwiftShader, and the per-composite raster cost starved input → the headless page WEDGED (the speedtest harness could only run `?aurora=css`).
2. **The CSS fallback was a FLAT gradient, not the composited ground (the certify vector).** `paletteToCssGradient` rendered each OKLCh stop as a gamma hex joined into `linear-gradient(135deg, …)` — its mean AND spatial luminance both diverge from the shader's nuclei-field linear-sRGB composite, so a contrast capture against it certified the WRONG floor.

## The fix (three legs, GL-shader fence held — JS/CSS only)

- **W1 — the universal software-raster guard + the `forceWebGLUnderSoftwareRaster` escape** (`constants/renderMode.ts`). The `isSoftwareWebGLRenderer()` check is lifted OUT of the `"auto"`-only branch into a pre-check that runs for ANY WebGL-arming mode (gated `mode !== "css"`), BEFORE the `if (mode !== "auto") return mode;` short-circuit. A software renderer forces `"css"` regardless of the requested mode. The escape (default `false` — the guard is the safe default) opts a deterministic test back into the live GL surface. The capable path is byte-untouched (a hardware/null probe → the requested mode unchanged). The probe call is wrapped (a throwing partial-stub probe is morally `null` — "cannot prove software"), since the guard now reaches envs the `"auto"`-only gate never exercised.
- **W2 — the runtime wedge catch** (`composables/runtime.ts`). `createAurora` re-checks the SAME shared predicate (imported from `renderMode.ts` — ONE detector, no second `getContext("webgl2")`; `proof:webgl-substrate-single` held GREEN). Under a software renderer with the escape off, `wedgeBlocked` is set and the runtime returns the INERT handle — `createWebGLCanvas` is NEVER called, `arm()`/`renderAt()` are no-ops, the placeholder stays the surface, and no `onInitError` fires (a software-raster fall is a recognized substrate decision, not a contract violation; the `onInitError` contract is preserved for genuine shader/OOM violations).
- **W3 — the luminance-faithful fallback ground** (`composables/auroraFallbackGround.ts` + `Aurora.vue`). `sampleAuroraField` mirrors the shader's STATIC (t=0) composite — `composition.glsl`'s `nucleiField` (softmax-Gaussian → paletteId + valueMod) + `samplePalette` (the linear-baked LUT lerp) + the `valueVariance` modulation + `tonemap.glsl`'s PBR-Neutral `aces()` + the mandatory `linearToSrgb` OETF. The palette LUT is `oklchToLinear` (the SAME value.js Ottosson bake `flattenPalette` feeds the GPU — ONE color source, no re-implemented OKLCh math). The ground is a one-shot 2D-canvas raster (option b — the "CSS/2D fallback" the brief names) of the field, exported as a `data:` URI and CSS-upscaled (bilinear → preserves per-quadrant mean luminance), painted ONCE and parked (no rAF). SSR/no-`document` degrades to a deterministic pure-CSS layered radial-gradient stack. `Aurora.vue` threads it into the placeholder ONLY under the `"css"` substrate (the flat gradient stays the capable-device first-frame the canvas cross-fades over).

## The binding headless π — luminance faithfulness (the cardinal-lesson readback)

A HEADLESS capture (the readback is GL-FREE by construction — the composite reference is the shader's static composite sampled CPU-side via the LIBRARY's own `sampleAuroraField`, the fallback ground is the LIBRARY's `auroraFallbackGround`; both rendered to DOM, screenshotted, read back via `getImageData`). 256×256, `DEFAULT_AURORA_CONFIG`, both modes:

| ground | mean L | per-quadrant L [TL, TR, BL, BR] | Δmean vs composite | max-quadrant Δ vs composite | in band? |
|---|---|---|---|---|---|
| **Composite reference** (shader static composite) | 0.5871 | [0.373, 0.626, 0.586, 0.763] | — | — | — |
| **Faithful fallback ground** (W3 — after) | 0.5861 | [0.376, 0.624, 0.584, 0.760] | **0.0010** | **0.0026** | **YES** ✓ |
| Flat `linear-gradient(135deg)` (before) | 0.6321 | [0.506, 0.639, 0.639, 0.745] | 0.0451 | **0.1328** | **NO** ✗ (per-quadrant) |

**Before/after read.** The flat gradient's top-left quadrant reads **0.506** painted vs the composite's true **0.373** — a 0.133 luminance OVERSTATEMENT that certifies a too-easy (wrong) contrast floor. The field-sampled ground matches the composite to **0.0026** per quadrant — inside the 0.08 band with ~30× margin, so a headless contrast capture against the fallback certifies the SAME floor the real composite would, with NO headed `--use-gl=angle` browser.

**The no-hang capture (the guard's runtime truth).** A forced `mode:"capture"` `createAurora` mount under the harness returns promptly (< 5s, no wedge), never throws an `onInitError`-class violation, and a subsequent pointer interaction resolves immediately — the wedge catch left it un-armed (the inert handle, no live GL layer).

π result: **6/6 GREEN** across both Playwright projects (`chromium-headless-new` desktop + `coarse-touch` mobile) × {light, dark} faithfulness + the no-hang capture.

## Gate born-RED → GREEN log

- **Born-RED at HEAD `2138ac02`**: W1 ok=false (the guard reached only inside the `"auto"` branch), W2 ok=false (the arm path reached `createWebGLCanvas` un-guarded; no shared detector import), W3 ok=false (no `auroraFallbackGround.ts`; the only ground is the flat band) — 3 violations. Confirmed by re-running the pure detector against the HEAD source state.
- **GREEN at close**: W1/W2/W3 all YES, all 5 self-test bites RED (escape-default-true, guard-in-auto-tail, blanket-swallow, flat-only-ground, forked-color-math).

## Fences held

- `proof:aurora-space-gamma` GREEN (the CPU OETF closes with the SAME `linearToSrgb` transfer; `aurora.frag` byte-untouched).
- `proof:webgl-substrate-single` GREEN (the wedge catch reuses the shared `probeWebGL2Renderer`; no second context minted).
- The existing `tests/components/custom/aurora/render-mode.test.ts` (7/7) GREEN (the capable pass-through preserved; the probe-wrap keeps the un-stubbed `resolveRenderMode("webgl")` from throwing in happy-dom).
- GL-shader fence: `aurora.frag`/`tonemap.glsl`/`composition.glsl` byte-UNTOUCHED — the fallback is a CPU/CSS derivation; the PBR-Neutral tonemap + the OETF are MIRRORED (not edited) CPU-side.
- W-PAYLOAD-DEFER coordination: the ground reads the BASE palette/nuclei config; it imports ZERO medium GLSL (no medium-tail dependency, clean-disjoint).

## Cross-repo consume-and-delete ledger

speedtest **AW.W7 (R-CONSUME)** — the named successor (THEIR edit, recorded here, not executed — the foreign-tree fence): bump the `^` pin to 4.1.0 + DELETE the `?aurora=css` named-YELLOW interim (`speedtest/src/App.vue`) when this ships at the BB 4.1.0 cut. The ask's ACCEPTANCE ("a headless capture renders the aurora or a luminance-faithful fallback so contrast floors certify without a headed browser") is met by the faithful fallback ground above.

## `proof:ba-gestalt` substrates-band verdict

Booked to **W-REFLECT3 (Batch 7)** — the substrates band (the aurora wash on the gestalt roster) is captured WHOLE-PAGE in the software-raster substrate, both modes, and judged as a gestalt ("does the fallback read as a coherent aurora atmosphere — the nuclei-glow field, not a flat diagonal slab?"). The per-mechanism W1-W3 greens + this π's painted faithfulness are the binding evidence; the gestalt verdict re-earns its PASS on the fresh W-REFLECT3 capture.
