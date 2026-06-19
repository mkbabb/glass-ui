# DotMatrix — the Fibonacci phyllotaxis dot-sphere (BC.W-VIZ-DOTMATRIX)

A globe of fine warm-cream dots laid on a sphere SURFACE, depth-shaded so it reads as a
translucent dot-SHELL, slowly rotating on a tilted axis, pointer-aware. The Claude co-work
"fine-dot spheres on dark" reference (USER-DEFECTS §E), built as the 8th first-class member
of the procedural-animation suite (a goo-blob sibling, register **a** — the pure
phyllotaxis dot-SPHERE; the goo+dot HYBRID is register **b**, `BC.W-VIZ-HYBRID`, which
REUSES this rasterizer).

```ts
import { DotMatrix } from "@mkbabb/glass-ui/dot-matrix";
```

## The gestalt

A calm globe of fine dots floats in the hero card — unmistakably a 3D SPHERE built from
dots on its surface. The dots crowd toward the silhouette rim, the latitudinal banding
curves around the dome, the near hemisphere reads brighter + slightly larger while the rim
and far side fade toward near-invisible (the Fibonacci-lattice signature: even, fine
spacing across the whole surface, no pole-pinching, no banded rings). The shape is painted
by BRIGHTNESS + DEPTH, not by motion — stop the spin and it still reads as a translucent
dot-shell from the depth-shading alone. Move the cursor and the globe subtly tracks it (a
parallax depth illusion), a soft dimple pushes through the dot-shell near the cursor, and a
fast flick fires a brief brightness bloom that decays.

## The math (cited)

- **The distribution** — the area-centered Fibonacci-phyllotaxis golden-angle spiral
  (`y = 1 − 2(i+0.5)/N`, `r = √(1−y²)`, `θ = i·goldenAngle`, golden angle ≈ 2.39996 rad),
  Martin Roberts / extremelearning.com.au; arXiv 0912.4540 — near-equal AREA with no
  resonance gaps, beats lat-long (which clusters at the poles → banded rings).
- **The depth-fade** — `facing = clamp(n.z·0.5 + 0.5, 0, 1)`, `opacity = 0.15 + 0.85·facing`,
  `size = 0.6 + 0.4·facing` (the Will-Howard / COBE / Stripe lineage — a SOFT falloff, not a
  back-face cull → the translucent-shell read).
- **The render** — instanced billboard quads (`draw(6, N)`; WebGPU `point-list` is 1×1 px,
  useless for sized dots) + the crisp `fwidth`-smoothstep SDF circle fragment (the ONE AA
  canon — ~1px band at any DPR, fine sub-2px dots stay crisp).

## Substrate

- **Backend** — born WebGPU-first via `useGpuSubstrate` over the ONE `createCanvasLifecycle`
  leaf (offscreen-park, content-visibility, live-PRM one-static-frame freeze, demand-loop,
  `device.lost` self-heal all inherited). The WebGL2 instanced-billboard fallback (NOT a
  Canvas2D context) covers the genuinely-absent ~5-10% tail; parity `verified` (the dots +
  the closed-form vertex + the pure fragment are byte-parity-able).
- **One math source** — `composables/dotMatrixField.ts` (`fibonacciDot`/`facingFade`/
  `spinMatrix`/`breathRadius`, pure + node-testable); the WGSL/GLSL transcribe it; the dots
  buffer carries the JS-computed phyllotaxis positions (the round-trip parity anchor).
- **One pointer field** — the shared `usePointerVelocityField` (BB.B4), fed `tick(delta)`
  from the renderer frame callback (no own rAF). Velocity → the repel-dimple + parallax;
  acceleration/burst → the flick brightness bloom.
- **One color source** — the shared `procedural-color.wgsl.ts`/`.glsl.ts` OKLCh ramp; the
  depth-fade multiplies the resolved stop's luminance.

## Colocation

```
dot-matrix/
  DotMatrix.vue                  the thin props + refs + useDotMatrix() call
  composables/
    useDotMatrix.ts              the public composable (substrate + pointer wiring)
    useDotSphere.ts              the two substrate-setup builders (WGPU + WebGL2)
    dotMatrixField.ts            the ONE math source
    uniformBridgeWGPU.ts         the typed-struct uniform SoT + the static dots buffer
  shaders/
    dot-matrix.wgsl.ts           the WGSL primary (instanced billboard + fwidth SDF)
    dot-matrix.glsl.ts           the WebGL2 instanced-billboard fallback
  constants.ts                   DotMatrixConfig + DEFAULT_DOT_MATRIX_CONFIG + caps
  index.ts                       the package barrel
  README.md                      this file
```

## Fences

- **Warm-cream identity default; presets-in-consumers** — the library default palette is the
  warm-cream `{ L:0.92, C:0.03, h:78 }` family; the mono-warm-white-on-near-black reference
  + the two-globe composition are DEMO presets in `demo/stories/substrates/presets.ts`,
  never a library token. The teal-on-navy is GONE entirely (clean break — BC.W-TEAL-NAVY-PURGE).
- **It composes toward the HYBRID** — the dot-rasterizer is the shared primitive
  `BC.W-VIZ-HYBRID` reuses; dot-matrix does NOT edit the goo-blob SDF (the fence is binding).
