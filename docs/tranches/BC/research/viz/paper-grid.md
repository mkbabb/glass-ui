# BC viz research — paper-grid (LIQUID)

> Per-viz SOTA re-modernization research. RESEARCH ONLY — zero `src/` edits.
> Viz: `paper-grid` — a NEW liquid-wave grid viz (subpath TBD `/paper-grid`; it does
> not exist yet — it is born this tranche).
> User defect (USER-DEFECTS.md §E, verbatim, the TWO conjoined items):
> "The PAPER GRID procedural: a mess → fix to be **evenly spaced + LARGER**; the grid
> LINES must **morph + wave in a liquid way**; suffuse it throughout the site as a
> **subtle background element**."
> AND: "The new grid background is a **blurry mess → TOTALLY ABROGATE it. It's a SIMPLE
> grid — like in keyframes.js.** The grid is oddly spaced → consistent + larger, and
> **NOT displayed in the card** on pages like this."
> Plus the §E global mandate: "**WebGPU is present EVERYWHERE (as long as it works on
> Safari) — ALL animations use it. NO FALLBACKS. EVER.** No canvas anywhere." And §E:
> "**REMOVE the teal-on-navy reference entirely.**"

---

## 0. Verdict in one line

There is **no `paper-grid` viz today** — the grid is a static CSS `linear-gradient` STACK
(`--paper-grid-texture`, `tokens/scale-paper.css:118-134`; the demo twin
`.story-bg-grid`, `story-hero.css:283-296`), and the user condemns BOTH its current form
("oddly spaced," "blurry mess," "displayed in the card") AND demands a NEW liquid register
("the grid LINES must morph + wave in a liquid way"). The two defect items reconcile into
a **two-register split, NOT a contradiction**: (a) the *baseline* grid is RE-EXPRESSED as
"a SIMPLE grid — like in keyframes.js" (the kf two-tier `--graph-pitch: 1rem` / `--graph-major:
5rem` engineering-paper grid, evenly spaced + LARGER, NOT in the card — a calm static CSS
underlay that already exists in kf and just needs the tuning fix); (b) a NEW
**`PaperGrid` liquid viz** is born — a WebGPU-first fullscreen-fragment grid whose lines
are drawn by the canonical AA-grid distance function (Ben Golus) over a **domain-warped UV
field** (Iñigo Quílez domain warping fed by the shared `curlFBM` divergence-free flow), so
the lines undulate + wave in a *liquid* way while staying evenly spaced at the cell level. It
is built to **suffuse site-wide as a very-subtle background** (a `suffusion` mode) AND to
demo at full strength. This is the EXACT consumer #2 the shared `curlFBM` chunk already
**books by name**: "B5 paper-grid-breathe (`<Card grid animated>` — the ¼-res curl-driven
grid breathe)" (`flow.glsl.ts:33`, `docs/consumer-evidence/curl-fbm.md` §Consumers #2). The
fix is to *build that booked consumer*, WebGPU-first, on the proven `useGpuSubstrate` leaf.

The distinction the user draws — "distinct from grid-simple (the static one)" — is the
PRODUCT split: `grid-simple` is the static kf-style CSS grid (the calm default underlay,
no GL); `PaperGrid` is the liquid GL viz (the suffusable wave-grid). Two registers, one
vocabulary, ONE math source.

---

## 1. The reference, read precisely (the binding acceptance target)

Two named references, both binding:

### 1.1 "A SIMPLE grid — like in keyframes.js" (the baseline)
The kf demo grid (`~/Programming/keyframes.js/demo/@/styles/design-idioms.css:273-302`) is
a **two-tier engineering-graph-paper** background:
- `--graph-pitch: 1rem` — the FINE cell pitch (1rem ≈ 16px lines).
- `--graph-major: 5rem` — the MAJOR rule every 5 fine cells (5rem ≈ 80px) — "bolder 5rem
  majors" (`:276-277`).
- `--graph-opacity: 3%` / `--graph-major-opacity: 11%` — line strengths "mixed over
  `--foreground` so dark mode retints for free" (`:280-281`); the major tier "DELIBERATELY
  held STRICTLY ABOVE the 10% legibility floor" (`:289-291`).
- It is the page SUBSTRATE ("EditorShell `.grid-background`"), NOT in a card.

This is the user's "simple, evenly spaced, larger, not in the card" target for the BASELINE
grid. glass-ui's current `--paper-grid-texture` is ALMOST this (a 32px MINOR + 128px MAJOR
4× stack, `scale-paper.css:119-134`) but the user calls it "oddly spaced" + "blurry mess"
+ wrongly "displayed in the card." The baseline fix: re-tune to the kf two-tier proportions
(larger, evenly spaced) AND move it OUT of the card onto the page substrate
(`.story-bg-grid` already does this; `.paper-grid` in `cards.css:52` paints it INTO the
card — that is the "displayed in the card" defect; the card-interior grid is the one to
abrogate per "NOT displayed in the card").

### 1.2 "The grid LINES must morph + wave in a liquid way" (the new viz)
The liquid target: a grid of evenly-spaced lines whose **whole field undulates** — the lines
bow, swell, and flow as if drawn on a gently rippling surface (the "2d-plane-with-3d-feel"
the assignment names). This is NOT a per-line random wobble (that reads as noise — the very
thing the user condemns elsewhere). It is a COHERENT low-frequency warp of the entire UV
domain, so adjacent lines move TOGETHER (a sheet of liquid, not TV static). Subtle amplitude
(the lines stay clearly a grid; the wave is felt, not loud). The pointer BULGES the grid
toward the cursor (the assignment's explicit interaction). Suffusable as a near-invisible
site-wide layer.

The gestalt: **a calm engineering grid drawn on a slowly breathing liquid sheet.** The grid
is the stable identity; the warp is the slow brush. (This is the EXACT inverse-coherence
lesson the dot-flow-field doc landed: large structures come from LOW spatial frequency; a
high-frequency warp would re-introduce the "noise" the user hates — `dot-flow-field.md`
§3.2.)

---

## 2. Current state — what exists, and why it's a mess

### 2.1 There is no viz; there are TWO static CSS grids (the duplication)
1. **Library token grid** — `--paper-grid-texture` (`tokens/scale-paper.css:130-134`): a
   four-`linear-gradient` stack (major to-right + major to-bottom + minor to-right + minor
   to-bottom), sized `32px` minor / `128px` (`* 4`) major (`cards.css:52-61`). Painted as a
   card-interior `background-image` via `.paper-grid` (`cards.css:52`, consumed by
   `math-paper.vue:21` `paper-grain-overlay paper-grid`). Ink = `color-mix(in srgb,
   var(--foreground) calc(--paper-grid-opacity * 100%), transparent)`, `--paper-grid-opacity:
   0.08` (`scale-paper.css:118`).
2. **Demo page grid** — `.story-bg-grid` (`story-hero.css:283-296`): the same four-gradient
   stack, `--story-grid-size: 28px` minor / `* 4` = 112px major, ink 7%/12% light
   (`:15-16`), lifted 18%/30% dark (`:44-45`). This is the page-background underlay (the
   `manifest.ts` `grid` background kind, the default for forms/containers/dock/data/
   compositions — `manifest.ts:120-131`).

The "oddly spaced" defect: the two grids use DIFFERENT pitches (32px vs 28px) and a 4×-major
that lands at 112px/128px — not the clean kf 1rem/5rem proportions. The "blurry mess"
defect: a 1px `linear-gradient` line at a non-integer device-pixel offset (a `28px` cell on
a 1.25× DPR display lands lines at fractional device pixels) renders as a blurry 2px-soft
band, NOT a crisp hairline — the classic CSS-grid sub-pixel-blur failure that a
derivative-AA shader (§3.1) fixes exactly. The "displayed in the card" defect: `.paper-grid`
paints the card's OWN `background-image`, so the grid sits UNDER the prose inside the plate
(`math-paper.vue`) — the user wants it on the page substrate, behind the card.

### 2.2 Why the static grid can never be "liquid"
A CSS `linear-gradient` background-image is a STATIC raster repeated by `background-repeat`.
It cannot warp — there is no per-pixel domain function, no time, no pointer. A "liquid wave"
grid is intrinsically a per-pixel computed field: each pixel must evaluate "how far am I from
the nearest (warped) grid line?" That is a fragment-shader question. So the liquid register
MUST be a GL viz; the static register STAYS CSS (the free, calm, zero-GL underlay). The two
cannot be the same artefact — hence the two-register split (§0).

### 2.3 The §E mandate forces WebGPU-first (no canvas, no Canvas2D)
"WebGPU EVERYWHERE … NO FALLBACKS. EVER. No canvas anywhere." A liquid grid is a textbook
**fullscreen fragment** problem (the aurora/concentric shape-class — NO compute pass, NO
particles, NO Canvas2D point-cloud). So the WebGPU primary is a single fullscreen-triangle
fragment pass; the WebGL2 fallback (kept ONLY for the genuinely-absent ~5-10% tail per §4) is
the byte-identical GLSL twin of the SAME fragment — parity `verified`, not `degraded`. There
is no Canvas2D path at all (a CPU grid-warp at frame rates is hopeless AND violates "no
canvas"). The §E "no canvas anywhere" intent is fully honored: the surface is GPU on every
Baseline browser, and the fallback is also GPU (WebGL2 fragment), never a 2D context.

---

## 3. The SOTA technique (cited) — the liquid AA-grid

The viz is the composition of THREE cited techniques: (1) the derivative-AA grid distance
function, (2) domain warping of the UV before the grid evaluation, (3) the divergence-free
curl-flow that drives the warp coherently.

### 3.1 The anti-aliased grid distance function (Ben Golus — the crisp-line fix)
The "blurry mess" dies here. The canonical pixel-perfect grid (Ben Golus, *The Best Darn Grid
Shader (Yet)*) computes line coverage from the **screen-space derivative of the UV**, so a
line is exactly N device-pixels wide regardless of zoom/DPR — never the CSS sub-pixel blur:

```glsl
// distance to nearest grid line: a sawtooth→triangle wave, 0 at the line, 1 at cell center
vec2 gridUV   = 1.0 - abs(fract(uv) * 2.0 - 1.0);
// screen-space derivative (length(), NOT fwidth — Golus: "length() is the correct one … the
// right balance of sharpness without aliasing"):
vec2 uvDeriv  = vec2(length(vec2(dFdx(uv.x), dFdy(uv.x))),
                     length(vec2(dFdx(uv.y), dFdy(uv.y))));
vec2 drawWidth = clamp(vec2(targetWidth), uvDeriv, vec2(0.5));   // never thinner than 1px-ish
vec2 lineAA    = uvDeriv * 1.5;
vec2 grid2     = smoothstep(drawWidth + lineAA, drawWidth - lineAA, gridUV);
grid2         *= clamp(targetWidth / drawWidth, 0.0, 1.0);       // preserve thin-line intensity
// Moiré suppression: once cells are sub-pixel, fade to a flat tone (no shimmering):
grid2          = mix(grid2, vec2(targetWidth), clamp(uvDeriv * 2.0 - 1.0, 0.0, 1.0));
float line     = max(grid2.x, grid2.y);                          // the line coverage [0..1]
```
[bgolus.medium.com/the-best-darn-grid-shader-yet; madebyevan.com/shaders/grid]. WGSL has the
exact same primitives — `fract`, `abs`, `smoothstep`, `clamp`, and `dpdx`/`dpdy`/`fwidth`
in the fragment stage (the goo-blob `metaball.wgsl` already transcribes two `fwidth()` sites
to WGSL fragment-stage `fwidth()` — `PROCEDURAL-SUITE.md` goo-blob row, the precedent). The
two-tier minor+major grid is two evaluations of this at `uv` and `uv / majorEvery` (Golus
"major grid divisions" variant), composited.

### 3.2 Domain warping the UV (Iñigo Quílez — the "liquid" fix)
The grid is computed not at `uv` but at a **warped** coordinate `g(uv) = uv + warp(uv, t)` —
the IQ domain-warp substitution `f(p) → f(g(p))`, `g(p) = p + h(p)`
[iquilezles.org/articles/warp/]. Because the warp `h` is a smooth low-frequency field,
adjacent cells warp TOGETHER — the whole grid sheet bows and flows (the "liquid" gestalt),
never a per-line jitter. IQ's recursive form (`q = fbm(p + off₁)`, `r = fbm(p + 4q + off₂)`,
`fbm(p + 4r)`) gives the maximally organic flow; for a SUBTLE grid we use a SHALLOW warp (one
level, low amplitude) so the lines bow gently. The warp amplitude is the `amplitude` config
axis; "if the flow is easily noticeable, there's too much of it" — the subtle-background
guidance (Alex Harri, *A flowing WebGL gradient, deconstructed*: flow constant `F = 0.043`,
speed `S = 0.6`, stacked noise layers at speeds `0.90, 1.15, -0.75, 0.65, -1.05` so
counter-flow prevents monotony) — informs the default amplitude (small) + the multi-component
wave sum (so the breath never visibly loops). [alexharri.com/blog/webgl-gradients].

### 3.3 The warp is the divergence-free curl flow (Bridson — the SHARED chunk)
The warp field `warp(uv,t)` is **`curlFBM(uv·warpScale + t·warpSpeed) · amplitude`** — the
2D curl of an fbm potential (Bridson, Hourihan, Nordenstam, *Curl-Noise for Procedural Fluid
Flow*, SIGGRAPH 2007): `∇×ψ = (∂ψ/∂y, −∂ψ/∂x)`, divergence-free BY CONSTRUCTION so the warp
"folds and stretches like real fluid advection rather than the source-y bulge a raw fbm
gradient produces" (`flow.glsl.ts:5-8`). This is the EXACT use the shared chunk **books**:
consumer #2 "B5 paper-grid-breathe … the animated paper-grid offsets sample the SAME
`curlFBM` so the grid breathes along a divergence-free flow rather than a source-y noise
gradient. PRM-static, ≤4ms compute" (`curl-fbm.md` §Consumers #2). Building `PaperGrid`
*satisfies that booking* — the divergence-free curl is precisely why the grid breathes like
a liquid sheet and not like noise (a source-y fbm gradient would pinch and bulge unevenly;
the curl preserves the sheet's area locally). The host shader owns the noise basis
(`potentialFBM`); the chunk owns only the basis-agnostic curl operator (`flow.glsl.ts:23-28`).
[cs.ubc.ca/~rbridson/docs/bridson-siggraph2007-curlnoise.pdf]. The WGSL twin is the booked
`flow.wgsl.ts` (the procedural-tail WGSL chunk, `curl-fbm.md` final ¶) — minted by this viz
since it is the FIRST WebGPU-primary curl consumer (aurora's WGSL arm degrades curl→fbm
today; this viz needs the real WGSL curl).

### 3.4 The pointer bulge (interactive — Gaussian falloff)
The cursor bulges the grid toward (or away from) itself via a SECOND, local warp term added
to `g(uv)`:
```glsl
vec2  toCursor = uv - uCursor;          // uCursor in UV space
float d        = length(toCursor);
float bulge    = uBulgeStrength * exp(-(d*d) / (2.0 * uBulgeRadius*uBulgeRadius)); // Gaussian
g += normalize(toCursor) * bulge;       // radial push (attract: negate)
```
The Gaussian/quadratic falloff over a `bulgeRadius` is the standard repel/attract field
[iquilezles.org/articles/warp; speckyboy repel-effect; threejs-journey particles-cursor]. The
push magnitude is scaled by pointer VELOCITY + a transient ACCELERATION burst (§8). This is a
LOCAL warp added on top of the GLOBAL liquid warp — the grid stays coherent everywhere except
where the cursor presses, so it reads as "the cursor pushing a bulge through a calm liquid
grid" (the iOS-control-centre liquid feel).

### 3.5 The ONE-math-source discipline
A pure JS evaluator `paperGrid.ts` (`composables/paperGrid.ts`) is the single source,
node-testable, transcribed line-for-line by the WGSL kernel (and the GLSL fallback):
- `potentialFBM(p)` — the noise basis (the host fbm).
- `curlWarp(uv, t, scale, speed, amp)` — the global liquid warp (`curlFBM`-based).
- `cursorBulge(uv, cursor, strength, radius)` — the local Gaussian bulge.
- `gridCoverage(g, minorPitch, majorEvery, targetWidth, uvDeriv)` — the Golus AA-grid
  distance→coverage (the JS twin computes `uvDeriv` analytically from the pitch since JS has
  no fragment derivatives — the parity sample set uses a fixed `uvDeriv` so JS↔WGSL agree).
`proof:paper-grid` clause 3 round-trips JS vs WGSL at a fixed `(uv, t, cursor)` sample set
(the std140/transcription-drift trap closed by round-trip, the `proof:flow-field`/`proof:gpu-
substrate-single` precedent).

---

## 4. Substrate, Safari, and the WebGPU-everywhere mandate

### 4.1 WebGPU is Baseline — Safari 26+ ships it (the mandate is satisfiable)
- **WebGPU reached Baseline "Newly available" January 2026** — Chrome/Edge 113+, Firefox
  141+ (macOS Tahoe ARM64 145+), and **Safari 26+** (macOS Tahoe 26, iOS 26, iPadOS 26,
  visionOS 26 — enabled by default; all iOS browsers follow WebKit). ~82% global traffic.
  [web.dev/blog/webgpu-supported-major-browsers; caniuse.com/webgpu;
  webgpu.com/news/webgpu-hits-critical-mass-all-major-browsers; webo360solutions WebGPU
  browser-support 2026]. Safari 26 even ships HDR-image WebGPU canvas + (26.2) WebXR-WebGPU
  on Vision Pro. The sibling docs (`aurora.md`, `dot-flow-field.md` §4.1, `concentric.md`)
  establish this same Baseline fact — `PaperGrid` inherits it.
- **WGSL is the W3C CR Draft (2026-06-17)** [w3.org/TR/WGSL]; it ships wherever WebGPU does.
- **A fullscreen-fragment pass is the simplest possible WebGPU workload** — a 3-vertex
  full-screen-triangle vertex shader (`@builtin(vertex_index)` → clip-space corners, no
  vertex buffer) + the grid fragment. This is the aurora/concentric WGSL precedent
  (`aurora.wgsl.ts` "the full-screen-triangle `vs_main`" — `CLAUDE.md` W-AURORA-WGPU). NO
  compute pass, NO storage buffers — the lightest viz in the suite.

**Conclusion:** the §E "WebGPU everywhere, works on Safari" mandate is fully met. The
fragment grid IS the surface on Safari 26+. The only caveat is the substrate must use
`armAsync()` (async device acquisition) + the `device.lost` self-heal the leaf already owns
(`useWebGPUCanvas.ts`) — inherited for free via `useGpuSubstrate`.

### 4.2 The fallback disposition (the "no canvas anywhere" reconciliation)
- **The WebGPU WGSL fragment is THE surface on every Baseline browser (incl. Safari 26+).**
- **There is NO Canvas2D path** (unlike the OLD dot-flow-field) — a liquid grid is a
  per-pixel field; a CPU grid-warp is hopeless AND the §E "no canvas anywhere" forbids it.
- **The WebGL2 fragment fallback is the byte-identical GLSL twin** of the WGSL fragment, kept
  ONLY for the genuinely-absent ~5-10% tail (Linux Firefox pre-141, pre-A12 iPhones),
  gate-blocked from retirement by `proof:gpu-substrate-single` clause B until the tail closes.
  Because it is the SAME fragment math (the `curlFBM` chunk + the Golus grid function + the
  shared `procedural-color.glsl.ts` ink), parity is `verified` (not `degraded`) — a real win
  the fragment design unlocks (the same disposition `concentric.md` §4 reaches). It is GPU,
  not 2D-context, so it respects the "no canvas" intent.

### 4.3 Substrate reuse (the discipline — no fork)
- Compose `createGpuSubstrate` (`useGpuSubstrate.ts:87`) → `useWebGPUCanvas` over the ONE
  `createCanvasLifecycle` leaf. ZERO scheduling re-fork — offscreen-pause, live-PRM-freeze,
  the demand loop all inherited (`useGpuSubstrate.ts:8-13`). `usePaperGrid` keeps the uniform
  handle shape (`armAsync`/`arm`/`suspend`/`resume`/`wake`/`renderAt`/`dispose`/
  `reducedMotion` — `useGpuSubstrate.ts:67-80`).
- **DPR — the grid is wash-class, but the AA matters.** The Golus AA function is DPR-correct
  by construction (the derivative scales with the backing-store resolution), so the grid is
  crisp at any DPR. The viz is wash-class so a budget DPR cap (`resolveBudgetDpr()`-style,
  ≤1.5 — the aurora budget) keeps the compute cheap; the AA holds at the capped DPR because
  the derivative reads the ACTUAL backing-store pixel size. KEEP the wash-class cap.
- **Color:** the shared `procedural-color.wgsl.ts` / `procedural-color.glsl.ts` OKLCh ramp
  (ONE color source — `PROCEDURAL-SUITE.md` §shared chunk). The grid LINE INK reads the warm
  `--foreground` identity (the no-gray floor), mixed at the line alpha — NOT a sampled
  palette stop (a grid is monochrome ink, not a gradient field), so the color use is a single
  `--foreground`-derived `<color>` uniform, the warm-cream identity default.

---

## 5. The WGSL-first kernel design (the new shape)

### 5.1 Vertex pass (full-screen triangle — no buffer)
`paper-grid.wgsl` `vs_main` (the aurora/concentric precedent):
```wgsl
@vertex fn vs_main(@builtin(vertex_index) vid: u32) -> VsOut {
  // 3-vertex full-screen triangle; no vertex buffer
  let p = array(vec2f(-1,-1), vec2f(3,-1), vec2f(-1,3))[vid];
  var o: VsOut; o.pos = vec4f(p, 0, 1); o.uv = (p * 0.5 + 0.5); return o;
}
```

### 5.2 Fragment pass (the liquid AA-grid — the whole viz)
`paper-grid.wgsl` `fs_main` per-pixel:
```wgsl
// 1. map screen uv → grid space (the cell pitch in UV; pitch is a config axis)
var g = uv * uGridScale;                 // uGridScale = view / minorPitch  (LARGER cells = smaller scale)
// 2. GLOBAL liquid warp — divergence-free curl flow (the SHARED curlFBM, basis = host fbm)
g += curlFBM(g * uWarpScale + uTime * uWarpSpeed) * uAmplitude;   // the "liquid wave"
// 3. multi-component breath so it never visibly loops (Alex Harri counter-flow):
g += curlFBM(g * uWarpScale2 - uTime * uWarpSpeed2) * (uAmplitude * 0.5);
// 4. LOCAL pointer bulge (Gaussian falloff; uCursor in grid space, velocity/accel scaled)
let toC = g - uCursor; let d = length(toC);
g += normalize(toC) * uBulgeStrength * exp(-(d*d) / (2.0 * uBulgeRadius * uBulgeRadius));
// 5. Golus derivative-AA grid coverage at the warped coord (minor + major tiers)
let dv  = vec2f(length(vec2f(dpdx(g.x), dpdy(g.x))), length(vec2f(dpdx(g.y), dpdy(g.y))));
let minor = gridCoverage(g,                 uTargetWidth,       dv);
let major = gridCoverage(g / uMajorEvery,    uTargetWidthMajor,  dv / uMajorEvery);
let line  = max(minor * uMinorAlpha, major * uMajorAlpha);     // two-tier weights
// 6. ink = warm --foreground identity at the line coverage; subtle suffusion alpha
var col = uLineColor.rgb;
let a   = line * uFieldAlpha;            // uFieldAlpha is the global subtlety knob (suffusion → tiny)
return vec4f(col * a, a);                // premultiplied alpha over the transparent ground
```
- NO compute pass, NO particles, NO storage buffers — the lightest viz in the suite (one
  fragment, ≤8 noise taps for the two curl terms + the Golus AA, well under the ≤4ms budget
  the booking names).
- Uniforms (typed-struct SoT via a `uniformBridgeWGPU.ts` twin — std140-safe packing, the
  `aurora.wgsl`/`metaball.wgsl` precedent): `time, gridScale, minorPitch, majorEvery`;
  `warpScale, warpSpeed, warpScale2, warpSpeed2, amplitude`; `targetWidth, targetWidthMajor,
  minorAlpha, majorAlpha, fieldAlpha`; `cursor.xy, bulgeStrength, bulgeRadius`; `lineColor`
  (vec4 — the `--foreground`-derived warm ink). The two scalar `Alpha` knobs map to the kf
  3%/11% minor/major weights (§1.1) so the DEFAULT reads as the calm kf engineering grid,
  the warp adding the liquid life.

### 5.3 The WGSL/GLSL round-trip (the parity floor)
`curlWarp`, `cursorBulge`, `gridCoverage`, `potentialFBM` transcribed line-for-line JS↔WGSL
↔GLSL; the shared `curlFBM` is ONE source per backend (`flow.glsl.ts` + the new
`flow.wgsl.ts`); `proof:paper-grid` clause 3 asserts agreement at a fixed `(uv, t, cursor)`
sample set; `proof:gpu-substrate-single` clause F asserts the on-disk OKLab ΔE capture-pair
(mean ≤ 2.0 / p99 ≤ 5.0 — the fragment-identical-math makes this trivially `verified`).

---

## 6. The full configurator (the tunable axes — controls-on-the-RIGHT per §E/§D)

A `useConfiguratorState<PaperGridConfig>` studio (commit-on-write — a single surface, the
README discipline) seated in a `<ConfiguratorLayer>`/`<ConfiguratorRow>` shell, **on the
RIGHT on desktop** (the §E configurator-placement mandate — ALL configurators move to a right
rail; §E "the configurator is misplaced → must be on the RIGHT on desktop"). It inherits the
AZ.W-HIERARCHY configurator vocabulary (the 20.4px section rung, the row/sub-label register).
Defaults bias **SUBTLE + LARGE + evenly-spaced** (the user's binding aesthetic):

| axis | type / range | default | what it does |
|---|---|---|---|
| **Cell size** | slider, minor pitch px, 24–128 | **64px** (LARGER than the 28/32px static — the user's "LARGER") | the grid cell pitch; LARGER = bigger cells |
| **Major every** | slider, N cells, 2–10 | **5** (the kf `--graph-major` 5rem/1rem ratio) | how many minor cells per major rule |
| **Minor weight** | slider 0–0.3 | **0.04** (≈ kf 3%) | minor line alpha — the calm hairline |
| **Major weight** | slider 0–0.3 | **0.11** (kf 11%, above the 10% floor) | major rule alpha — the bolder tier |
| **Line width** | slider px, 0.5–2 | **1.0** (one crisp device-pixel via Golus AA) | the target line thickness |
| **Wave amplitude** | slider 0–0.5 cell | **0.10** (subtle — "felt, not loud") | how far the lines bow (the liquid) |
| **Wave scale** | slider, λ multiple, 0.2–2 | **0.5** (LOW freq → the whole sheet bows together) | the warp spatial frequency — LOW = sweeping |
| **Wave speed** | slider, ω-scale 0–1 | **0.15** (slow breath) | the warp drift speed |
| **Field alpha** | slider 0–1 | **1.0** (demo) / **~0.12** (suffusion preset) | the GLOBAL subtlety knob (suffusion → tiny) |
| **Bulge strength** | slider 0–0.5 | **0.12** | how far the cursor pushes the grid |
| **Bulge radius** | slider, cells | **3** | the Gaussian falloff radius |
| **Bulge mode** | toggle attract/repel | repel | push grid away (repel) or toward (attract) cursor |
| **Line color** | `<ColorSwatch>` | warm `--foreground` identity | the ink (NEVER teal-on-navy — §E REMOVE) |
| **Background** | `<ColorSwatch>` / transparent | **transparent** | the ground (so it suffuses over the page) |
| **Interactive** | toggle | on (demo) / off (suffusion) | pointer bulge (§8) |
| **Paused** | toggle (WCAG 2.2.2) | off | `<DockBackgroundToggle>` seam |

Caps mirror the WGSL `#define`s. The `suffusion` MODE (a named preset, NOT a separate axis)
clamps `fieldAlpha ≈ 0.10–0.15`, `interactive: false`, `waveSpeed` low — the site-wide
underlay register (§7 story 8). Presets-in-consumers: the demo presets (the warm default, the
suffusion preset, a "bold liquid" showcase) live in `demo/stories/substrates/presets.ts`,
NEVER a library token (the §6 teal/navy fence — `proof:paper-grid` reds a teal/navy literal).

---

## 7. The comprehensive demo-suite scope

The substrate page reuses the giant-hero-shrinks-on-scroll + body-in-ONE-card idiom per
§C/§E (ONE card with the procedural animation, NOT the double-card-grid idiom the user
condemns; the hero is large + shrinks on scroll; the page title is standardized with its
subpath `/paper-grid` explicitly defined per §E). Stories:

1. **Hero — the liquid grid at calm strength.** Warm-ink lines on the page, the global curl
   warp slowly breathing, the two-tier minor+major rule — the "evenly spaced, LARGER, morphs
   + waves in a liquid way" target, the calm default the page leads with.
2. **The static-vs-liquid pair.** Side-by-side: `grid-simple` (the kf-style static CSS grid,
   no GL) next to `PaperGrid` at low amplitude — proves the liquid register is a *gentle*
   evolution of the simple grid, not a different animal.
3. **Amplitude sweep.** Three stills (subtle 0.05 / medium 0.10 / bold 0.30) — the "felt, not
   loud" calibration; shows where the liquid reads as a grid vs reads as a warp.
4. **Wave-scale sweep.** Low (whole sheet bows together — the target) → high (per-cell
   chatter — the deliberate counter-example, "this is the noise we DON'T want").
5. **Cell-size / density.** Coarse (96px) vs fine (32px) — the "LARGER" axis; proves even
   spacing at every pitch (the "oddly spaced" defect's positive counter).
6. **Interactive bulge.** Pointer drag/hover bulges the grid; velocity drags a directional
   wake; an acceleration flick fires a transient ripple burst (§8) — the cursor pushing a
   bulge through a liquid grid.
7. **Major-tier composition.** The two-tier engineering-grid (minor 3% + major 11%) — the kf
   blueprint identity, animated.
8. **Suffusion mode — the site-wide subtle background.** The §E "suffuse it throughout the
   site as a subtle background element" done RIGHT: a `fieldAlpha ≈ 0.12`, large-pitch,
   slow-warp instance behind page content (NOT in a card — the "not displayed in the card"
   fix). This is the register the demo shell can adopt as the `grid` background kind's LIVE
   upgrade (a `manifest.ts` `grid` → a `liquid-grid` background kind, opt-in — the static CSS
   grid stays the zero-GL default; the liquid one is the one-GL-per-route showcase).
9. **Reduced-motion.** One static frame then park — the warp freezes mid-breath, the grid
   held crisp (the WCAG/PRM proof; the warp is decorative so it can simply freeze — the
   web.dev motion guidance: decorative motion is removed/frozen under reduce, the grid stays
   legible). [web.dev/learn/accessibility/motion; w3.org/WAI WCAG C39].
10. **Paused (WCAG 2.2.2).** `<DockBackgroundToggle>` pause/resume.

Each story is a configurator preset (presets-in-consumers); the warm default + the suffusion
preset live in `demo/stories/substrates/presets.ts`, NEVER a library token (§6 fence).

---

## 8. The cursor/touch + velocity/acceleration interaction model

Compose the shipped `usePointerVelocityField` (`@mkbabb/glass-ui/motion-core` — BB.B4):
position (event-driven, PRM-gated) + derived **velocity** + derived **acceleration** + a
flick **burst**. It owns no rAF — the renderer FEEDS it `tick(deltaMs)` from inside the
canvas-lifecycle frame callback (the one-loop discipline; `proof:offscreen-pause` intact;
`CLAUDE.md` BB.B4 W-VIZ-POINTER).

The interaction (a **local bulge**, NOT a global warp — the grid stays coherent everywhere
else):
- **Pointer position → the Gaussian bulge center** (§3.4). Inside the `bulgeRadius`, the grid
  warps radially toward/away from the cursor; outside, untouched. The grid bulges toward the
  cursor (the assignment's explicit "the grid bulges toward the cursor"; `bulgeMode` chooses
  attract/repel — toward is `attract`).
- **Velocity → bulge amplitude + a directional drag.** A fast sweep drags a stronger,
  velocity-directional bulge wake (the cursor "smears" the liquid as it moves); a slow hover
  is a gentle local lift. `velocity` scales `bulgeStrength` and adds a small lead offset along
  the velocity direction.
- **Acceleration (the second derivative) → a transient ripple BURST.** A flick (high accel)
  fires a brief expanding ring of extra amplitude at the cursor (the `flick burst` term) that
  decays on a spring — the acceleration term made visible (per the user mandate the
  interaction read velocity AND acceleration). The ripple is a `sin(d·k − decayT)` envelope
  added to the bulge, its decay on a `decayRest`-projected spring rest.
- **Choreography on ONE clock (keyframes.js).** The enter/transition/restart is one
  `SpringProgress`-backed clock: the field's appearance (the build-in fade of the grid from
  `fieldAlpha 0` → target + the first warp settle) rides a `SpringProgress`; a preset switch
  re-seats it velocity-continuously (`reseatToSpring` — `keyframes.d.ts:2550`); the cursor
  ripple burst decays on the same spring family (`decayRest` — `keyframes.d.ts:1366`). The
  optional looped breath is the **LIGHT `Oscillator`** (the booked loop-clock,
  kf-republish-gated — `keyframes.d.ts:3289` the damped-harmonic-oscillator solver) — until
  it ships, the breath rides the substrate's own `time` uniform (a pure `t` drive, no
  hand-rolled rAF spring). keyframes.js is the single choreography source — NO hand-rolled rAF
  spring.
- **PRM:** `usePointerVelocityField`'s deterministic `tick(0)` freeze — under reduce the
  pointer interaction is inert (no live velocity), the grid paints one static frame, the warp
  frozen mid-breath (§7 story 9). The interaction is GPU-only (it perturbs the `cursor`/
  `bulge` uniforms, never a layout property).

---

## 9. The static `grid-simple` companion (the OTHER half of the user's ask)

The user's "TOTALLY ABROGATE … it's a SIMPLE grid — like in keyframes.js" is a SEPARATE,
NON-GL deliverable that ships ALONGSIDE the liquid viz (the two-register split, §0). This is
NOT this viz's `src/` — it is a CSS retune + a placement fix:
- **Re-tune the static grid to the kf two-tier proportions.** The `--paper-grid-texture` +
  `.story-bg-grid` move to a clean `1rem` minor / `5rem` major (or LARGER — `64px`/`320px`)
  evenly-spaced stack, ink 3%/11% over `--foreground` (the kf `--graph-opacity`/
  `--graph-major-opacity`, dark-retinted for free). This fixes "oddly spaced."
- **Move it OUT of the card.** The card-interior `.paper-grid` (`cards.css:52`,
  `math-paper.vue:21`) is the "displayed in the card" defect — abrogate the card-interior
  paint; the grid lives on the page substrate (`.story-bg-grid`, behind the card). The
  document-register interior grid is retired (it is the "blurry mess in the card").
- The static grid stays the ZERO-GL default for the calm content bands (the `manifest.ts`
  `grid` background kind); the LIQUID `PaperGrid` is the one-GL-per-route showcase + the
  opt-in `liquid-grid` background kind for hero surfaces.

This companion is recorded here for completeness (it is the user's conjoined ask) but is a
demo/CSS concern, not part of the `PaperGrid` viz `src/` — the viz IS the liquid register.

---

## 10. Discipline checklist (the binding fences)

- **ONE lifecycle leaf:** `createCanvasLifecycle` via `useGpuSubstrate`/`useWebGPUCanvas`. Do
  NOT fork. ✓ (`useGpuSubstrate.ts`)
- **ONE math source:** `paperGrid.ts` (`potentialFBM`/`curlWarp`/`cursorBulge`/`gridCoverage`);
  WGSL + GLSL transcribe line-for-line; `proof:paper-grid` clause 3 round-trips. The shared
  `curlFBM` is ONE source per backend (`flow.glsl.ts` + the new `flow.wgsl.ts`) — this viz is
  the FIRST WGSL curl consumer (mints `flow.wgsl.ts`, the booked procedural-tail chunk).
- **Warm-cream identity default;** teal-on-navy is GONE (§E "REMOVE the teal-on-navy reference
  entirely"). The library default line ink is the warm `--foreground`; any themed preset lives
  in `presets.ts`; `proof:paper-grid` reds a teal/navy literal in `constants.ts`.
- **keyframes.js for the start/transition/end/restart choreography (ONE clock);** the LIGHT
  `Oscillator` is the booked loop-clock (kf-republish-gated). ✓ (§8)
- **Real cited math, no arbitrary noise:** Bridson 2007 curl (the divergence-free warp =
  WHY it's liquid not noise), IQ domain warping, Golus derivative-AA grid, Alex-Harri subtle-
  flow calibration — all cited. ✓
- **Compositor/GPU-only;** the interaction perturbs uniforms only; `proof:no-layout-animation`
  n/a (canvas). ✓
- **WebGPU primary on Safari 26+ (Baseline);** NO Canvas2D path; a byte-identical WebGL2
  fragment fallback for the genuinely-absent tail, parity `verified`. ✓
- **Configurator on the RIGHT on desktop (§E);** body in ONE card; hero shrinks on scroll;
  subpath `/paper-grid` explicit in the title (§E). ✓
- **Satisfies the booked `curlFBM` consumer #2** (`flow.glsl.ts:33`, `curl-fbm.md`
  §Consumers #2 "B5 paper-grid-breathe") — building this viz fills the shared-chunk ≥3-bar
  booking. ✓
- **Suffusion mode** (§7 story 8) is the §E "suffuse it throughout the site as a subtle
  background element" — a low-`fieldAlpha`, large-pitch, slow-warp instance behind content,
  NOT in a card. ✓
- **`proof:gpu-substrate-single` clause F** — the paper-grid parity row resolves on disk
  (`verified`; the fragment-identical math makes byte-parity trivial). ✓
- **PROCEDURAL-SUITE.md** gains an 8th member row (the suite goes 7 → 8; the table + the
  migration verdict "BORN WebGPU-first — fullscreen fragment, the aurora/concentric shape-
  class; the fallback is the SAME pure fragment → parity `verified`").

---

## 11. Sources (cited)

- Ben Golus, *The Best Darn Grid Shader (Yet)* — the derivative-AA grid distance function +
  Moiré suppression + two-tier major/minor — https://bgolus.medium.com/the-best-darn-grid-shader-yet-727f9278b9d8
- Evan Wallace, *Anti-Aliased Grid Shader* — fract/fwidth/smoothstep grid AA —
  https://madebyevan.com/shaders/grid/
- Iñigo Quílez, *Domain Warping* — f(p)→f(g(p)), recursive fbm warp, organic flow —
  https://iquilezles.org/articles/warp/
- Bridson, Hourihan, Nordenstam, *Curl-Noise for Procedural Fluid Flow*, SIGGRAPH 2007 — the
  divergence-free curl warp (WHY liquid, not noise) —
  https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph2007-curlnoise.pdf
- Alex Harri, *A flowing WebGL gradient, deconstructed* — subtle-flow calibration ("if the
  flow is easily noticeable, there's too much of it"; F=0.043/S=0.6; counter-flow layer
  speeds) — https://alexharri.com/blog/webgl-gradients
- WebGPU Baseline + Safari 26 — https://web.dev/blog/webgpu-supported-major-browsers ;
  https://caniuse.com/webgpu ; https://www.webgpu.com/news/webgpu-hits-critical-mass-all-major-browsers/ ;
  https://webo360solutions.com/blog/webgpu-browser-support/
- WGSL CR draft (2026-06-17) — https://www.w3.org/TR/WGSL/
- Codrops, *How to Code a Subtle Shader Background Effect with React Three Fiber* (dot/grid
  subtle background patterns) — https://tympanus.net/codrops/2024/10/31/how-to-code-a-subtle-shader-background-effect-with-react-three-fiber/
- Cursor repel/attract Gaussian falloff — https://speckyboy.com/repelling-effect-in-web-design/ ;
  https://threejs-journey.com/lessons/particles-cursor-animation-shader
- prefers-reduced-motion (decorative motion frozen/removed under reduce) —
  https://web.dev/learn/accessibility/motion ; https://www.w3.org/WAI/WCAG21/Techniques/css/C39 ;
  https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion
- keyframes.js reference (the kf SIMPLE grid + the choreography API) —
  `~/Programming/keyframes.js/demo/@/styles/design-idioms.css:273-302` (`--graph-pitch`/
  `--graph-major`/`--graph-opacity`/`--graph-major-opacity`)
- In-repo: `tokens/scale-paper.css:97-134` (`--paper-grid-texture`), `cards.css:22-92`
  (`.paper-grid` card-interior paint), `demo/stories/story-hero.css:283-296` (`.story-bg-grid`),
  `src/composables/glass/webgl/shaders/flow.glsl.ts:1-57` (`curlFBM` + the booked consumer #2),
  `docs/consumer-evidence/curl-fbm.md` §Consumers #2 (the B5 paper-grid-breathe booking),
  `src/composables/glass/webgpu/useGpuSubstrate.ts:38-145` (the substrate handle),
  `src/components/custom/PROCEDURAL-SUITE.md` (the suite + the WGSL-first dual-substrate +
  the shared-chunk discipline), `docs/tranches/BC/research/viz/dot-flow-field.md` §3.2
  (the inverse-coherence "low-freq = coherent, high-freq = noise" lesson),
  `demo/stories/aurora-hero.ts:69-84` (the `StoryBackgroundKind` union — the `grid` kind +
  the booked `liquid-grid` upgrade), `demo/stories/manifest.ts:120-131` (the per-category
  background map — `grid` default for forms/containers/dock/data/compositions).
