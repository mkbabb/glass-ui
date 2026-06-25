# Dot-matrix / image-dot-matrix — BD research + brainstorm (the arbitrary-image dot-matrix redesign)

**Lane** BD viz-research / dot-matrix · **Status** AUTHORED 2026-06-22 · **Branch** prototype/liquid-dock ·
**Substrate-grounded** against `src/components/custom/{dot-flow-field,dot-matrix,goo-dot-matrix}/**` at HEAD +
the BD union wave pool · **Scope** PLANNING/RESEARCH ONLY — zero `src/` edits. This is the dot-matrix chapter
of the BD generative-viz expansion: the user's "tessellate dots to display ARBITRARY IMAGES (a blob, a wave
washing over, a cloud washing over) leveraging similar AURORA logic in dot-matrix areas." The deliverable is
the GPU architecture (dot grid × target-image field × aurora-flow modulation), the THREE-dot-viz reconciliation,
and 12 falsifiable ideas.

> Read alongside the shipped READMEs: `dot-flow-field/README.md` (the anchored-lattice-swept-by-a-wave
> retopology, BC.W-VIZ-DOTFLOW), `dot-matrix/README.md` (the Fibonacci phyllotaxis dot-sphere,
> BC.W-VIZ-DOTMATRIX), `goo-dot-matrix/README.md` (the SDF-field-as-dots HYBRID, BC.W-VIZ-HYBRID) +
> the sibling research (`research/aurora.md` for the field/flow vocabulary, `research/blob.md` for the
> SDF-as-target lineage) + `src/components/custom/PROCEDURAL-SUITE.md`.

---

## 0. TL;DR

The user wants a NEW capability the three shipped dot vizzes do NOT have: a dot grid that **tessellates to
display arbitrary IMAGES** — and where those images are not static stills but slow generative SHAPES that
**wash over naturally** (a blob forming, a wave crossing, a cloud drifting), driven by the SAME field math
aurora and the flow-field already own. The shipped dot-flow-field is exactly the right CHASSIS (an anchored
dot-matrix lit by a swept scalar field) but its "image" is one hardcoded sweeping band; the shipped
dot-matrix is a Fibonacci SPHERE (a fixed 3D shape, not an image surface); the hybrid is an SDF metaball
rendered as dots. None reads an **arbitrary target field** — a texture, an SDF, or a generative sampler — and
modulates the dots' size/opacity/phase from it.

The redesign is a **single new register on the dot-flow-field chassis**: the swept "height" scalar generalizes
to a **target-coverage field `T(uv, t) ∈ [0,1]`** with FOUR pluggable sources — (a) a generative-shape
sampler (blob/wave/cloud, the aurora-field math), (b) a uploaded image's luminance/alpha texture, (c) an
SDF (the metaball, reusing the hybrid's field), (d) a glyph/text mask. The dots' size + opacity + reveal-phase
read `T`; an aurora-grade FLOW field (`curlFBM` + the Gerstner sweep) animates the WASH (the temporal
coverage sweep) so the shape forms by flowing across the grid rather than fading in place. The three dot vizzes
**unify into ONE `<DotMatrix>` with a `mode`/`target` axis** — they are the SAME rasterizer (instanced
billboard quads + the `fwidth` SDF circle) over THREE different scalar drivers; keeping three near-identical
shaders + three composables is the DRY/KISS violation the congruence bar (ORCHESTRATOR-NOTES) hunts.

The whole thing is born WebGPU-first/WebGL2-fallback (the BD "zero Canvas2D" mandate — the dot-flow fallback
already retopologized to a pure fragment), warm-cream-identity default (presets-in-consumers), compositor-safe,
PRM-frozen, one-loop, Safari-first.

---

## 1. The shipped SOTA (the substrate we build ON — recorded, not re-researched)

| viz | what ships at HEAD | the scalar driver | render |
|---|---|---|---|
| **dot-flow-field** (BC.W-VIZ-DOTFLOW) | an ANCHORED dot-matrix (deterministic lattice, restoring spring) a slow LARGE Gerstner wave sweeps through; the dots breathe a hair off anchor | `waveBand(sampleHeight(o,t))·contrast` — ONE hardcoded sweeping iso-band over a normalized Gerstner height | instanced billboard quads (WGSL) / pure fullscreen-fragment dot-lattice (WebGL2) — parity `verified` |
| **dot-matrix** (BC.W-VIZ-DOTMATRIX) | a Fibonacci phyllotaxis dot-SPHERE, depth-shaded into a translucent shell, tilted spin, pointer parallax | `facing = clamp(n.z·0.5+0.5)` depth-fade over a 3D sphere lattice | instanced billboard quads + `fwidth` SDF circle (WGSL primary, WebGL2 fallback) — parity `verified` |
| **goo-dot-matrix** (BC.W-VIZ-HYBRID) | the goo-blob `sceneDistG` SDF rendered as a dot matrix — dense/big/bright inside the merged blob, sparse/small/dim at the rim | `v = thickness(sceneDistG(cellCenter))` (tixy.land applied to an SDF) | the metaball FRAGMENT pass swapped to a dot-stamp; 4 registers (dot-field/dither/lattice/sphere) |

**The shared substrate (already owned).** ALL THREE compose `createCanvasLifecycle` (the demand loop +
offscreen-park + content-visibility + live-PRM one-static-frame freeze + `device.lost` self-heal) via
`useGpuSubstrate` (the WebGPU-first/WebGL2 picker). ALL THREE read the shared `procedural-color.{wgsl,glsl}.ts`
OKLCh ramp (ONE color source). The flow-field + the aurora share the cited wave math (`flowField.ts`
Gerstner/Tessendorf sum-of-sines + the shared `curlFBM` Bridson curl chunk, `flow.glsl.ts`). The pointer is
the shared `usePointerVelocityField` (BB.B4, fed `tick(delta)` from the renderer frame — no own rAF). **The
rasterizer is THE SAME** in all three: instanced billboard quads + the `fwidth`-smoothstep SDF circle fragment
(the ONE AA canon).

**The key realization.** dot-flow-field already proved the architecture the user is asking for — an anchored
dot grid whose per-dot brightness/size reads a SCALAR FIELD sampled at the anchor. The user's "tessellate to
show arbitrary images" is the **generalization of that scalar from `waveBand(height)` to an arbitrary
`T(uv,t)`** — plus a TEMPORAL WASH so the image forms by flowing, not by fading.

---

## 2. The user mandate decoded (the binding asks → falsifiable shape)

| user phrase | decoded requirement | falsifiable bar |
|---|---|---|
| "a series of dots that fade in/out, grow/shrink slightly in size" | each dot's **opacity AND radius** read the target coverage `T` (the dot is small+faint where `T≈0`, big+bright where `T≈1`); the modulation is SUBTLE (the dots stay a fine field, never solid fill) | a both-mode π: a dot at a `T=1` cell resolves radius ≥ 1.4× and opacity ≥ 2× a `T=0` cell, AND the max dot radius ≤ `gridPitch·0.5` (never tessellates into a solid blob — it stays a DOT matrix) |
| "TESSELLATE + display to show ARBITRARY IMAGES in a dot-matrix" | the dot grid samples a **target field `T(uv)`** that can be ANY image — a generative shape, an uploaded texture, an SDF, a glyph mask; the silhouette READS as that image from the dot density/brightness alone (a halftone) | given a target `T` (a circle SDF), the rendered dot field's coverage-weighted centroid + bounding silhouette match `T`'s within a named tolerance (the image-fidelity π — stop the motion and the blob/circle still reads) |
| "showing a blob, or a wave that washes over naturally, or a cloud that washes over naturally" | a GENERATIVE-SHAPE source for `T` — three named presets (blob = metaball SDF, wave = Gerstner iso-band, cloud = thresholded fbm) — that EVOLVE over time | each shape preset has a π capture proving it reads as that shape; the "washes over" is a temporal coverage sweep (§4) — the shape enters from one edge and crosses, never a global cross-fade |
| "leverage similar AURORA logic but in dot-matrix areas" | the field math is aurora's (multi-nuclei fbm zones, the `curlFBM` domain warp, the Gerstner sweep) — the dots SAMPLE the aurora-style field; "dot-matrix areas" = the dots tessellate the aurora field into a halftone | the cloud/wave preset shares the `flowField.ts` / `curlFBM` / aurora-nuclei math source (one math, two renders: aurora paints pixels, this stamps dots) — `proof:viz-image-dotmatrix` round-trips the shared field |
| "robust CONFIGURATOR + mouse/keyboard INTERACTIVITY + birthdaycolor-like" | a full studio (target source picker, wash controls, dot/grid knobs) + the shared pointer field (cursor reveals/disturbs the dots) + keyboard (step the target, nudge the wash) | the BD per-viz robust-configurator + interactivity mandate — §6/§7 |

---

## 3. The GPU architecture (the dot grid × the target field × the aurora-flow wash)

The architecture is THREE composable layers over the existing dot-flow chassis. Each is a pure function of
`(uv, t)`, sampled per dot, transcribed JS↔WGSL↔GLSL (the round-trip parity anchor the suite enforces).

### 3.1 Layer 1 — the dot lattice (KEEP, unchanged)

The deterministic anchored grid the dot-flow-field already ships: `gridOrigin(index, cols, pitch)` →
each dot's origin `o`; a restoring spring eases the live position toward `o + drift`. NO re-seed, NO wrap —
the lattice is permanent (the "tessellate" substrate). Rendered as instanced billboard quads + the `fwidth`
SDF circle. This is the canvas; everything else drives it.

### 3.2 Layer 2 — the target-coverage field `T(uv, t) ∈ [0,1]` (the NEW idea)

The single generalization: **the per-dot scalar driver is no longer the hardcoded `waveBand(height)` — it is a
pluggable `T(uv,t)`** sampled at the dot anchor. FOUR sources behind ONE `targetMode` discriminated union:

- **`generative` (the headline — blob/wave/cloud).** `T` is an analytic generative shape evaluated in-shader,
  the aurora math reused:
  - **blob** — `T = thickness(metaballSDF(uv, t))` (the goo-blob `sceneDistG`, IMPORTED not re-forked; the
    hybrid's field generalized off its dedicated viz onto the shared target).
  - **wave** — `T = waveBand(sampleHeight(uv, t), center, width)` (the dot-flow-field's CURRENT driver, now
    one source among four — the existing behavior is preserved as a target preset, a clean fold).
  - **cloud** — `T = smoothstep(lo, hi, fbm(warp(uv, t)))` where `warp` is the shared `curlFBM` domain warp
    (the aurora cloud edge): a thresholded multi-octave fbm whose edge breathes via the curl flow. This is
    LITERALLY "aurora logic in dot-matrix areas" — the aurora nuclei/fbm field thresholded into a coverage
    mask the dots tessellate.
- **`texture` (the uploaded image).** `T` = the sampled luminance (or alpha) of an uploaded `<image>` /
  `<canvas>` bound as a GPU texture (`texture_2d<f32>` WGSL / `sampler2D` GLSL). The dot grid halftones the
  image — a portrait, a logo, album art. The texture is sampled at the dot anchor `uv`; a downsample/blur
  pre-pass keeps the halftone legible (dots can't resolve per-pixel detail). **The fence:** binding a texture
  is a GPU upload, NOT a `getContext("2d")` draw — the BD zero-Canvas2D mandate is honored (the image is
  decoded to an `ImageBitmap` → `copyExternalImageToTexture` WGPU / `texImage2D` WebGL2, no 2D context).
- **`sdf` (an arbitrary signed-distance shape).** `T = thickness(sdf(uv))` for a parametric SDF (circle,
  rounded-box, the metaball, a star) — the analytic-shape register (crisp silhouettes the texture path can't
  give). Reuses the SDF-as-target lineage the hybrid established.
- **`glyph` (text/icon mask).** `T` = an SDF-text or alpha-coverage mask of a character/glyph (a MSDF atlas
  or a pre-rasterized alpha texture) — the "spell a word in dots" register. A `texture`-mode special case with
  a glyph source.

`T` is THE protagonist. Everything downstream reads it.

### 3.3 Layer 3 — the per-dot modulation (the "fade in/out, grow/shrink")

Each dot reads `T` at its anchor and modulates THREE channels (compositor-safe, all in the instanced vertex/
fragment):

```
coverage = T(o, t)                                   // ∈ [0,1], the target
reveal   = washPhase(o, t, coverage)                 // §4 — the temporal wash gate
v        = coverage · reveal                          // the effective per-dot value
opacity  = baseOpacity + (1 - baseOpacity) · v        // fade in/out
radius   = dotSize · (lerp(minScale, maxScale, v))    // grow/shrink (maxScale ≤ 0.5·pitch/dotSize)
tint     = samplePaletteOklch(v)                      // the warm-cream ramp, v drives the stop
jitter   = drift(o, t) · (0.5 + 0.5·v)                // sub-cell breathing, livelier where covered
```

The dots stay a FINE FIELD (the `radius` cap keeps the matrix from tessellating into a solid blob — the
"grow/shrink SLIGHTLY" fence is the `maxScale ≤ 0.5·pitch` clamp). The silhouette is painted by COVERAGE,
exactly as dot-flow paints by the sweeping band today.

### 3.4 The flow — `T` itself is animated, but the WASH is the aurora flow

Two temporal mechanisms, both aurora-grade:

1. **The shape evolves** — `T(uv, t)` has `t` (the blob morphs, the wave sweeps, the cloud's fbm warp drifts
   on `curlFBM`). This is the aurora field math advancing.
2. **The wash gates the reveal** — `washPhase` (§4) is a coverage front that crosses the grid so the shape
   FORMS by flowing in (the user's "washes over naturally"), not by a global opacity fade.

### 3.5 The shader topology (WGSL primary / WebGL2 fallback — born GPU)

Two viable render topologies; the dot-flow precedent already proved BOTH parity-able:

- **Instanced-billboard (the primary).** N instanced quads, one per lattice cell; the vertex stage samples
  `T(o,t)` (analytic sources in-shader; the texture source samples the bound texture), sizes the quad, the
  fragment draws the `fwidth` SDF circle tinted by the palette. Per-dot size/opacity the user's "grow/shrink"
  needs (a GL point-list can't size). This is the dot-flow render-WGSL + the dot-matrix billboard, unified.
- **Fullscreen-fragment dot-lattice (the WebGL2 fallback / a cheap mode).** For each pixel: find the nearest
  cell, sample `T` at the cell center, draw the analytic dot mask (`fract(uv·gridFreq)` circle) lit by the
  coverage. The dot-flow WebGL2 fallback ALREADY does this — it generalizes to the arbitrary `T` for free
  (swap `waveBand(sampleHeight)` → `T(uv,t)`). Parity stays `verified` (one analytic field, two renders).

The texture source needs the instanced path on both backends (a fragment sampler is trivial; the per-dot
size still wants the billboard). The generative/sdf sources work in BOTH topologies.

---

## 4. "Washes over naturally" — the temporal-coverage wash (the hardest, most novel sub-problem)

The user is precise: not "fades in" (a global opacity ramp) but **washes over** — the shape ENTERS from
somewhere and CROSSES. The dot-flow-field's sweeping band is the seed of this. The full register:

- **`washPhase(o, t, coverage)`** — a coverage FRONT `f(t)` (a moving threshold) that sweeps across the grid
  along a wash direction `D`: `reveal = smoothstep(f(t) - feather, f(t) + feather, projection(o, D))`. A dot
  reveals only once the front passes its position. Compose with `coverage` so the shape both FORMS (the front
  arrives) and IS the target (coverage gates which dots ever light). This is a 1-D analog of the dot-flow
  `waveBand` lifted to a directional front.
- **The wash direction sources.** (a) linear (a tide from an edge — the wave preset), (b) radial (a bloom from
  a focal point — the blob preset), (c) **curl-warped** (the front itself is perturbed by `curlFBM` so the
  wash edge is organic, not a straight line — the cloud preset, "washes over naturally" verbatim). The same
  `curlFBM` chunk that warps aurora warps the wash edge → the wash reads as a natural cloud/fluid front.
- **The cross-fade between targets.** When the configurator/keyboard steps the target (blob → wave → cloud),
  the OLD coverage washes OUT as the NEW washes IN — a directional dissolve, not a hard cut. `T` interpolates
  in COVERAGE space (a dot whose old+new coverage both 0 never lights — no flash).

The wash is the temporal soul of the redesign — it is what makes the dot-matrix feel ALIVE (a wave actually
crossing) rather than a slideshow of halftones.

---

## 5. The three-dot-viz reconciliation (the DRY/KISS unification — congruence-bar binding)

There are THREE dot vizzes with near-identical rasterizers. The congruence bar (KISS + DRY, ORCHESTRATOR-
NOTES) demands this be examined. The verdict:

**UNIFY into ONE `<DotMatrix>` primitive with a `target` axis** — they are the SAME instanced-billboard +
`fwidth`-SDF-circle rasterizer over THREE different scalar drivers, plus ONE 3D-projection variant:

| current viz | becomes | the driver |
|---|---|---|
| **dot-flow-field** | `<DotMatrix target="generative" shape="wave">` | `waveBand(sampleHeight)` — the existing sweep, now ONE target preset |
| **goo-dot-matrix** | `<DotMatrix target="sdf" sdf="metaball">` (or `target="generative" shape="blob"`) | `thickness(sceneDistG)` — the SDF target |
| **dot-matrix** (sphere) | `<DotMatrix projection="sphere">` | the Fibonacci 3D lattice + depth-fade — a PROJECTION variant (the lattice is on a sphere surface, not a 2D grid), NOT a 2D-grid target |

The NEW image-dot-matrix is `<DotMatrix target="texture">` / `target="generative" shape="cloud"` /
`target="glyph"` — new TARGETS on the SAME primitive, not a fourth viz.

**The unification mechanism — two axes on one rasterizer:**
- **`projection: "grid" | "sphere"`** — the lattice topology (2D anchored grid vs Fibonacci 3D sphere). The
  sphere is the special case where the lattice lives on a sphere surface and the driver is depth-facing; the
  grid is the general 2D case the target field samples.
- **`target: "generative" | "texture" | "sdf" | "glyph"`** + (for generative) `shape: "blob" | "wave" | "cloud"`
  — the scalar driver `T`. The discriminated union the studio picks.

**Why unify (the case FOR):** ONE rasterizer, ONE pointer wiring, ONE substrate pick, ONE color seam, ONE set
of caps + one round-trip parity test instead of three near-duplicates; the user's mental model ("dots showing
a shape") is ONE concept. The three READMEs already cross-reference ("the goo-blob sibling the hybrid reuses").

**Why NOT unify / the fence (the case AGAINST, recorded honestly):** the sphere is a genuinely different
lattice (3D phyllotaxis + a spin matrix vs a 2D anchored grid) — folding it risks a god-component with two
disjoint code paths under one prop (the substitution trap). The MITIGATION: the rasterizer + the SDF circle +
the palette + the pointer + the substrate are SHARED (a `dotRasterizer` leaf), but the LATTICE BUILDER stays
pluggable (`gridLattice` vs `sphereLattice`, each a pure builder feeding the same render). Unify the
RASTERIZER + the TARGET (the high-duplication surface); keep the lattice builders separate (the genuinely
different geometry). This is the goo-dot-matrix's own discipline ("ONE field, ONE rasterizer; the lattice
math is the per-register delta") generalized.

**Subpath/migration.** Clean-break the three subpaths onto `/dot-matrix` with the axes (no aliases — the
no-legacy law); the existing `target="generative" shape="wave"` reproduces dot-flow byte-near, the sphere
projection reproduces dot-matrix, the SDF target reproduces the hybrid. A MIGRATION row per old subpath. The
~3 composables collapse to one `useDotMatrix` + the pluggable lattice/target leaves. This is the
W-PRUNE-CONSOLIDATE no-dual-path discipline applied to the dot family.

---

## 6. The robust configurator (the BD per-viz mandate — atom door → designed studio)

The studio inherits the AZ.W-HIERARCHY configurator vocabulary (section weight / label register / control
rhythm); it is a CONSUMER composition (presets-in-consumers — the demo ships the studio SFC, the library
ships the target resolvers). The rungs:

- **Section 1 — Target (the protagonist).** `target` picker (`<SegmentedTabs>`: Generative / Image / SDF /
  Glyph). For Generative: `shape` (Blob / Wave / Cloud) sub-picker. For Image: an **image-drop slot** (drop a
  photo, the dots halftone it — the birthdaycolor album-art parallel) + a downsample/contrast slider. For SDF:
  the SDF shape picker + params. For Glyph: a text input.
- **Section 2 — Dot grid.** `gridPitch` (lattice density), `dotSize` (base radius), `minScale`/`maxScale` (the
  grow/shrink range — capped so it stays a dot matrix), `baseOpacity`, the palette (`<ColorSwatch>` ramp).
- **Section 3 — Wash + flow.** wash direction (Linear / Radial / Curl-warped), wash speed, feather width, the
  `curlStrength` organic-edge knob, the shape's own evolution speed.
- **Section 4 — Motion + interactivity.** still / breathing / washing (the calm-ceiling register), the
  interactivity toggles (cursor reveal / cursor disturb / flick bloom), the pointer-mode picker.
- **Section 5 — Style.** `projection` (Grid / Sphere), cartoon-shadow on/off (the user's blob-redev ask
  generalizes — a dot field can carry a soft offset drop-shadow for the sticker register), `globeMask`,
  background.

The cloud/wave/blob shapes are LIBRARY presets (the generative math is the library's identity, warm-cream);
themed COLOR presets (mono-on-near-black, teal references) stay in consumers.

---

## 7. Mouse + keyboard interactivity (the BD robustness mandate)

All on the shared `usePointerVelocityField` (fed `tick(delta)` from the renderer frame — NO new rAF),
compositor-safe, PRM-gated:

- **Mouse — cursor REVEAL.** The cursor is a moving local coverage SOURCE: dots near the pointer reveal
  (a soft radial `T += expImpulse(dist)` boost) so you "paint" the image into existence by sweeping the
  cursor — a birthdaycolor-grade protagonist move (the field reacts, isn't inert).
- **Mouse — cursor DISTURB.** The velocity drags the lattice (a local displacement ripple — the dot-flow
  interactive mode, KEEP) and the flick BURST (the accel term) fires a one-shot brightness bloom that decays
  (the dot-flow + hybrid precedent).
- **Mouse — drag the wash focal.** For the radial wash, a held pointer moves the bloom focal (the wash washes
  from where you point) — the aurora draggable-focal idiom.
- **Keyboard (the NEW surface — the mandate gap none of the three ship).** Arrow keys nudge the wash direction/
  focal; `[`/`]` step the `shape` (Blob → Wave → Cloud, cross-dissolved per §4); `Space` toggles pause (the
  WCAG-2.2.2 seam); digit keys jump target presets. The keyboard surface is focus-guarded (reaches a focused
  control's native activation first — the deck-keyboard precedent).

---

## 8. The 12 ideas (each: a SOTA anchor, a Safari-first fence, a falsifiable bar)

### I1 — The target-field generalization (the headline; HIGH confidence)
`T(uv,t)` as the pluggable per-dot driver (§3.2). SOTA anchor: **tixy.land** (`(t,i,x,y) ⇒ v` driving a dot
grid — the goo-dot-matrix already cites it; this generalizes the function from the SDF to ANY field). Safari:
pure analytic shaders + a texture sampler — both WebKit-native (no `backdrop-filter:url()` gap). Bar: a circle
SDF target's rendered dot-coverage silhouette matches `T` within a named IoU; stop the motion, the shape reads.

### I2 — "Washes over naturally" via a curl-warped coverage front (the temporal soul; HIGH)
The directional wash front perturbed by `curlFBM` (§4). SOTA anchor: **Bridson curl-noise** (the shared chunk,
its #4 consumer) + Tessendorf sweep. Safari: pure fragment math. Bar: a π frame-series shows the shape ENTER
from an edge and CROSS (the coverage centroid translates), the edge organic (not a straight line) — distinct
from a global opacity fade (the flat-pole control fades uniformly).

### I3 — Image halftone via a GPU texture sample (no Canvas2D; HIGH)
Upload an image → `ImageBitmap` → `copyExternalImageToTexture` (WGPU) / `texImage2D` (WebGL2); the dots sample
its downsampled luminance (§3.2 texture). SOTA anchor: classic **halftone / dithering** (ordered-dither for the
ON/OFF register, continuous-tone for the size register). Safari: WebGL2 `texImage2D` + WebGPU texture both
WebKit-supported; NO 2D context (the mandate). Bar: a recognizable image (a face, a logo) reads in the dot
field; a both-mode π over a known test image; the decode path is `ImageBitmap`, asserted no `getContext("2d")`.

### I4 — The cloud-wash (aurora field thresholded into dots; HIGH)
`T = smoothstep(fbm(curlWarp(uv,t)))` — the literal "aurora logic in dot-matrix areas" (§3.2 cloud). SOTA
anchor: the aurora multi-nuclei fbm + the −5/3 cascade, thresholded. Safari: pure fragment. Bar: the cloud
preset shares the aurora/`curlFBM` math source (round-trip asserted); it reads as a soft drifting cloud, the
edge breathing.

### I5 — The blob-wash via the shared SDF (folds the hybrid; HIGH)
`T = thickness(sceneDistG(uv,t))` — the goo-blob metaball as the target, the satellites morphing the dot
density (§3.2 blob). SOTA anchor: the smin metaball SDF (BC.W-GOOBLOB-MEATBALL). Safari: pure analytic SDF.
Bar: a satellite orbiting in thickens the dot bridge then snaps as it absorbs (the hybrid's binding gestalt,
now a target preset on the unified primitive) — the goo-dot-matrix π reused.

### I6 — The unified `<DotMatrix>` (DRY/KISS; HIGH — the congruence-bar fold)
The three-viz unification (§5): ONE rasterizer + the `target` × `projection` axes, the lattice builders
pluggable. SOTA anchor: the W-PRUNE-CONSOLIDATE no-dual-path discipline. Safari: unchanged. Bar:
`proof:no-dual-path` — three near-identical dot shaders/composables collapse to one rasterizer + the pluggable
leaves; the old behaviors reproduce byte-near via the target presets; ZERO third dot-rasterizer survives.

### I7 — Cursor-paint reveal (birthdaycolor-grade protagonist; MED-HIGH)
The cursor is a moving coverage source — sweep it to paint the image in (§7). SOTA anchor: birthdaycolor's
reactive field (better-it: theirs is inert post-select, this paints). Safari: pointer + analytic boost, native.
Bar: a captured interaction DELTA — a cursor sweep lights a trail of dots that decays; the field is NOT inert.

### I8 — The grow/shrink-and-fade dot dynamics, decoupled per channel (the user-verbatim; HIGH)
opacity + radius + tint as THREE independent `v`-driven channels with separate response curves (§3.3) — the
dot "fades in/out, grows/shrinks slightly." SOTA anchor: the dot-flow brightness/size model split. Safari:
vertex/fragment math. Bar: the per-channel π — radius ≥ 1.4× and opacity ≥ 2× at full coverage, radius capped
≤ 0.5·pitch (stays a dot matrix, the "slightly" fence).

### I9 — The dot-jitter livelier-where-covered (organic life; MED)
The sub-cell breathing scales with coverage (`jitter = drift·(0.5+0.5·v)`) so covered dots shimmer + faint
dots sit still — the shape feels ALIVE, not a static mask. SOTA anchor: the dot-flow restoring-spring drift.
Safari: native. Bar: a covered region's dots show measurable sub-cell motion; an uncovered region's dots are
near-static (a motion-variance π by coverage band).

### I10 — Ordered-dither ON/OFF register (the crisp halftone alternative; MED)
A `dither` sub-mode: the coverage is Bayer8-dithered into ON/OFF dots (denser at the core, sparser at the rim)
— the classic dotted-tone read the goo-dot-matrix already ships as `dot-dither`, now a register on the unified
primitive for ALL targets. SOTA anchor: Codrops Bayer8 ordered dither. Safari: pure fragment. Bar: a dither-mode
π reads as a halftone of `T`; the threshold pattern is the Bayer matrix.

### I11 — The cartoon-shadow dot register (the blob-redev ask generalized; MED-LOW)
An opt-in soft offset drop-shadow on the dot field (the Memphis-sticker `--shadow-cartoon-*` register applied to
the dot billboards) for the sticker aesthetic the user asks for on the blob redev — a dot field with a cartoon
shadow reads as a cut-paper halftone. SOTA anchor: the glass-ui `--shadow-cartoon-*` identity tokens. Safari:
a second offset billboard pass (a darkened, displaced dot quad behind) — native, no filter. Bar: cartoon-shadow
on reads an offset stamp shadow; off is byte-identical to today; the toggle is a config axis.

### I12 — The dot-sphere as a `projection`, the image wrapped on it (the synthesis; MED)
The Fibonacci sphere (the shipped dot-matrix) becomes `projection="sphere"` and the target `T` is sampled in
the sphere's UV — so an IMAGE wraps onto the rotating dot-globe (a halftone earth, a logo on a spinning ball).
SOTA anchor: phyllotaxis sphere + UV-mapped texture. Safari: instanced billboards + texture sample, native.
Bar: a known texture wraps onto the spinning dot-sphere and reads (a both-mode π); the sphere lattice + the 2D
target compose without a god-path (the pluggable-lattice mitigation §5 holds).

---

## 9. The fences (load-bearing — recorded so the build doesn't drift)

- **Zero Canvas2D (the BD mandate).** The image source is a GPU texture upload (`ImageBitmap` →
  `copyExternalImageToTexture` / `texImage2D`), NEVER a `getContext("2d")` draw or `getImageData` raster. The
  dot-flow WebGL2 fallback already retopologized off Canvas2D — the fragment-dot-lattice generalizes to the
  arbitrary `T`. `proof:webgpu-everywhere` reds a 2D context.
- **It stays a DOT MATRIX (the "slightly" fence).** `maxScale·dotSize ≤ 0.5·gridPitch` — the dots grow/shrink
  but NEVER tessellate into a solid fill; the silhouette is a HALFTONE, not a filled shape. The gate clamps it.
- **Warm-cream identity default; presets-in-consumers.** The library default palette is the warm-cream
  `{L:0.92,C:0.03,h:78}` family (mirrors the three siblings); mono-on-near-black + the reference reproductions
  + teal/navy are DEMO presets, never a library token. The generative SHAPE math IS the library identity (the
  blob/wave/cloud are library presets); the COLOR theming stays in consumers.
- **One math source, round-tripped.** `T`'s analytic sources (the Gerstner sweep, the `curlFBM` cloud, the
  metaball SDF) are pure JS exports the WGSL+GLSL transcribe; `proof` round-trips JS↔WGSL↔GLSL at a fixed
  sample set (the transcription-drift trap closed by a round-trip, the suite discipline).
- **One loop, offscreen-park, live-PRM freeze.** Inherited from `createCanvasLifecycle`; the pointer field is
  fed `tick(delta)` from the renderer frame (no own rAF). PRM → one static frame then park (the shape held +
  legible mid-wash).
- **Safari-first.** Every path is pure WGSL/WebGL2 fragment+vertex+texture — all WebKit-native. No
  `backdrop-filter:url()`, no Chromium-only compute requirement (the fullscreen-fragment fallback covers the
  no-WebGPU tail). The wash/reveal is compositor-safe.
- **The unification keeps the lattice builders separate (the no-god-path mitigation).** Unify the rasterizer +
  target + pointer + substrate + color (the high-duplication surface); keep `gridLattice` / `sphereLattice` as
  pluggable pure builders (the genuinely-different geometry) — §5.

---

## 10. Open questions (for the orchestrator / the wave-spec author)

1. **Unify now or after the redesign?** The §5 unification is a large refactor (3 vizzes → 1). OPTION A: ship
   the image-dot-matrix as the NEW target on the dot-flow chassis FIRST, then unify the three in a follow-wave
   (lower risk, the unification is a clean-up). OPTION B: unify-first so the new target lands on the unified
   primitive (no double-migration). Recommend A (the image target is the user's headline ask; the unification
   is the congruence-bar follow).
2. **Texture upload — library API or demo-only?** The image-drop is a consumer affordance (presets-in-consumers
   suggests the demo owns the drop UI). The library should ship the texture-binding seam (`target="texture"` +
   a `source: ImageBitmap | HTMLCanvasElement` prop); the drop-zone UI is the demo studio.
3. **Glyph source — MSDF atlas or pre-rasterized alpha?** An MSDF atlas is crisp + tiny but needs a build step;
   a pre-rasterized alpha texture is simpler (a hidden canvas-rasterize — but that's a `getContext("2d")`, the
   mandate trap). RESOLUTION: rasterize the glyph to an OffscreenCanvas with a 2D context is FORBIDDEN by the
   mandate; use a pre-baked MSDF/alpha texture asset OR a WebGPU/WebGL render-to-texture glyph pass. Flag for
   the wave-spec — the glyph register (I-glyph) may be the lowest-priority, highest-friction idea; defer if it
   forces a Canvas2D path.
4. **Does the sphere-projection survive, or fold to a pure 2D matrix?** If the sphere is rarely used it could
   stay its own thin viz; if I12 (image-on-sphere) is compelling it justifies the `projection` axis. The
   research recommends keeping it as a `projection` variant (the synthesis is a strong demo).

---

## 11. Cross-viz coordination (what this shares / books)

- **CONSUMES** the shared `flowField.ts` Gerstner sweep + the `curlFBM` chunk (its #4 consumer — the cloud
  wash + the curl-warped front) + the goo-blob `sceneDistG` SDF (the blob target, IMPORTED) + the dot-matrix
  `fibonacciDot` lattice (the sphere projection) + the shared `procedural-color` OKLCh ramp + the shared
  `usePointerVelocityField`.
- **BOOKS** the three-viz unification (`/dot-matrix` absorbs `/dot-flow-field` + `/goo-dot-matrix` — the
  W-PRUNE-CONSOLIDATE fold; the congruence-bar follow-wave). Coordinate with the blob redev (research/blob.md)
  so the goo-blob `sceneDistG` stays the ONE field source both the blob viz AND the blob target read.
- **ALIGNS** with the aurora research (research/aurora.md): the cloud/wave targets ARE aurora's field math in a
  dot render — keep the field math source-shared so a tune to one tunes both (one math, two renders).
