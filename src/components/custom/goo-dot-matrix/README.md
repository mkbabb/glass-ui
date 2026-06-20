# goo-dot-matrix — the goo+dot-matrix HYBRID (BC.W-VIZ-HYBRID)

`<GooDotMatrix>` (`@mkbabb/glass-ui/goo-dot-matrix`, subpath-ONLY — off the root barrel; the
procedural-viz precedent) is the metaball SDF FIELD rendered as a DOT MATRIX. The merging
metaball reads as a field of warm-cream dots that flow and merge: where the gooey blob is —
its core, its satellites, the liquid neck between them — the dots are DENSE, BIG, BRIGHT; out
at the rim they thin to small and dim, then vanish. A satellite orbiting in thickens the band
of dots between it and the body into a connected bridge, then snaps back as it absorbs — the
gooey form drawn entirely in dots.

## The ONE new idea

It re-uses two SOTA primitives the codebase already owns, joined by ONE new idea: the
**dot-grid OUTPUT stage**. The field value at each dot's cell drives the dot's size +
brightness — `v = thickness(sceneDistG(cellCenter))` — so the dots are dense+big+bright
INSIDE the merged metaball and sparse+small+dim outside. This is **tixy.land applied to an
SDF**: tixy's `(t,i,x,y) ⇒ v` drives a dot grid, but here the function IS the gooey metaball
field.

- **The field** is the byte-untouched goo-blob `sceneDistG` SDF (`BC.W-GOOBLOB-MEATBALL`). The
  hybrid READS its `thickness = clamp(-d/bodyR, 0, 1)`; it does NOT rebuild the math. The
  field source is SPLICED from `metaball.wgsl.ts` / `metaball.frag.ts` (the WGSL/GLSL field
  helpers), never re-forked.
- **The dot render** re-uses the dot-matrix primitive (`BC.W-VIZ-DOTMATRIX`) — the crisp
  `fwidth` SDF dot fragment, the warm-cream dot palette, and (Register B) the instanced
  rasterizer + the `fibonacciDot` phyllotaxis lattice (IMPORTED, not re-authored).

## Registers (the `variant` axis, default `dot-field`)

- **`dot-field`** (DEFAULT) — the §T1 smooth field-driven dot: each cell's dot radius +
  brightness ramp with the field thickness. The literal "metaball rendered as a dot matrix".
  A pure FRAGMENT swap of the metaball pass — it inherits the WGSL/GLSL parity for free.
- **`dot-dither`** — the §T2 Codrops Bayer8 ordered-dither halftone: the field thickness is
  dithered into ON/OFF dots, denser at the core, sparser at the rim (the classic dotted-tone
  read). The metaball field's warped-FBM membrane gives the dither an organic edge for free.
- **`dot-lattice`** / **`dot-sphere`** — the §T3 opt-in instanced depth/flow look (the
  `-grad` flow displacement toward the merging core / the Fibonacci dot-sphere host), reusing
  the dot-matrix instanced rasterizer.

## Interaction

The hybrid inherits the goo-blob's rich pointer model AND adds the dot-field cursor reaction:
the FIELD-lean (the body + satellites + trail lean toward the cursor as ONE) is the goo-blob
field's own `uPointer` deformation (KEEP); the DOT-cursor influence (near-cursor dots brighten
+ swell + shift) rides the dot lanes (§T7 — Victor Baro's "Dotted background in Metal"); and
a fast flick fires a one-shot bloom via the SHARED `usePointerVelocityField` (BB.B4 — the
accel term, the second derivative made visible). The field is FED `tick(delta)` from the
renderer frame (NO own rAF — the `proof:offscreen-pause` one-loop discipline). Under
`prefers-reduced-motion: reduce` the field freezes mid-merge (`tick(0)` + the substrate
live-PRM one-static-frame park), the shape held + legible.

## Substrate + fences

- ONE `createGpuSubstrate` over the ONE `createCanvasLifecycle` leaf (offscreen-pause,
  content-visibility, live-PRM freeze, demand loop, `device.lost` self-heal all inherited).
  WebGPU-first; the WebGL2 dot-stamp fallback is GPU (NOT a Canvas2D context).
- ONE field (`sceneDistG`, byte-untouched), ONE dot-rasterizer, ONE pointer field, ONE color
  source (the shared `procedural-color` OKLCh ramp via `samplePaletteOklch`).
- The typed-struct SoT EXTENDS: the dot-grid s8/s9 lanes ride a SEPARATE uniform binding so
  the goo-blob field struct stays byte-identical (`uniformBridgeWGPU.ts`).
- **Warm-cream identity default; presets-in-consumers** — the library default palette is
  warm-cream; the near-dark + reference reproductions are DEMO presets in
  `demo/stories/substrates/presets.ts`, never a library token. The teal-on-navy is GONE.

## Files

- `GooDotMatrix.vue` — the thin props + refs + `useGooDotMatrix()` call.
- `composables/useGooDotMatrix.ts` — composes the substrate + the field-sim + the pointer field.
- `composables/uniformBridgeWGPU.ts` — the dot-grid typed-struct SoT (the s8/s9 lanes).
- `composables/gooDotLattice.ts` — the Register-B lattice math (`gridOrigin`; `fibonacciDot`
  imported from the dot-matrix evaluator).
- `shaders/goo-dot.wgsl.ts` — the WGSL primary (Register A; splices the goo-blob field).
- `shaders/goo-dot.frag.ts` — the WebGL2 Register-A fallback (the GLSL dot-stamp twin).
- `constants.ts` — `GooDotConfig` + `DEFAULT_GOO_DOT_CONFIG` (warm-cream) + the caps.

Subpath: `@mkbabb/glass-ui/goo-dot-matrix`. Machine-locked by `proof:viz-hybrid`.
