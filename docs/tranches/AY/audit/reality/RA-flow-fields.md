# RA-flow-fields — reality audit of the flow-field substrates

**Lane** RA-flow-fields (RealityA) · **Date** 2026-06-09 · **Method** live demo driven at
`http://localhost:5199` (the 5199 server was DOWN on arrival; 5183 died mid-audit; this lane restarted
`vite --port 5199` from the repo root and drove that), throwaway Playwright drivers (repo-installed
playwright, `--use-angle=metal`), canvas `getImageData` readbacks, computed-style probes, plus a live run
of the shipped π spec. **Verdict: MIXED** — the three substrate STORY pages range from good to genuinely
SOTA-shaped, but the hero-background CONSUMPTION layer is visually dead for 2 of the 3 substrates, and no
gate covers that layer.

## Inventory — what "flow field" means in this library

| Substrate | Engine | The "flow" | Where it ships |
|---|---|---|---|
| Aurora flow/tensor field | WebGL2 fragment (`flow.glsl.ts`) | 5-pattern directional field (radial/swirl/diagonal/multi/**tensor-ETF**) + curl + cursor swirl; drives painterly STROKE ORIENTATION | `/aurora`; demo `/substrates/aurora` |
| FourierField | Canvas2D (`useCanvas2D`) | a 1-D inverse-DFT closed-curve trace with comet trail + epicycles — a CURVE, not a field | `/fourier-field`; demo `/substrates/fourier-field`; hero bg of `/compositions/auth-shell` |
| Constellation | Canvas2D (`constellationField.ts`) | constant-velocity billiard DRIFT + proximity edges + warp spring/wander/gravity-well — ambient drift, not directional flow | `/constellation`; demo `/substrates/constellation`; hero bg of `/compositions/hero` |

There is **no standalone flow-field primitive** (particle advection / streamlines over a vector field).
The aurora's vector field exists only inside the fragment shader as stroke orientation.

## 1. Aurora tensor/flow field — what does `proof:aurora-tensor-field` drive visually?

**It drives painterly stroke orientation, and the result genuinely reads.** The gate (run live: PASS,
static regex over `mediums/flow/brush/frag/glSetup/bridge` + 8 green eigen-math vitest asserts) locks the
structure-tensor minor-eigenvector (edge-tangent) plumbing. Visually verified on the live configurator:

- `RA-flow-fields-aurora-vangogh.png` + `-closeup.png` — the Van Gogh preset paints a dramatic blue/orange
  spiral whose stroke tendrils visibly HUG the color-zone boundaries and wrap the swirl center with real
  directional continuity. This is the "strokes derive orientation from image structure" claim, TRUE on
  screen. The single most SOTA-looking thing in the flow-field set.
- `RA-flow-fields-aurora-oilpastel.png` + `-closeup.png` — Oil Pastel Sunset: long creamy diagonal bands,
  coherent flow along the −15° diagonal with tensor-hugged band edges. Reads strongly.
- `RA-flow-fields-aurora-radial-deliberative.png` — the pastel/radial preset is a soft wash; the radial
  flow is present but much subtler (correct for the register, not a defect).

Two calibrated dings:

1. **The `uFlowPattern == 5` tensor FLOW branch is consumer-dead.** No preset sets
   `flow.pattern: "tensor"` (src, demo, tests — zero hits) and the configurator's Flow tab
   (`demo/stories/aurora/config/options.ts` `flowPatternOptions`) omits "tensor" entirely. The visible
   tensor truth ships ONLY through the separate `strokeOrient: "tensor"` path, which the painterly mediums
   FORCE in `atoms.ts`/`uniformBridge.ts`. The gate locks a shader branch nothing drives — gate-green
   substrate-without-consumer, in miniature.
2. The tensor-vs-flow orientation A/B is not driveable from the demo UI (strokeOrient has no control);
   judged from the rendered result only.

**Coherence verdict: coherent flow, yes** — directionality + continuity are plainly visible in the
painterly mediums.

## 2. FourierField — both presets, both modes, live

Story page `/substrates/fourier-field` (`RA-flow-fields-fourier-story-light.png`,
`-hero-vs-final.png`, `-dark-panes.png`, `-indigo.png`, `-freeze-dark.png`):

- **Animates** (live canvas readback): hero 3 401 px changed / 700 ms; final 398 px. **Freeze is
  byte-deterministic**: identical PNG length, 0 px diff over 700 ms — the capture lever is real.
- **Dark mode is the genuinely good register**: the additive `lighter` phosphor-comet reads — white-hot
  head bloom (max R 255 readback), warm fading trail, faint gold epicycle scaffolding. The W43 "CRT-vector
  phosphor" claim is TRUE on dark ink.
- **Light mode is legible but quiet**: a thin red comet + whisper-faint scaffolding on cream. The hero
  pane's epicycle chain reads as a coherent mechanism; the `final` pane at any instant is a short arc in a
  large empty frame (0.40% pixel coverage measured) — honest as "recessed ambient chrome", thin as a
  showcase pane.
- **Injected color seam works live**: clicking Indigo retinted the field (capture), and the dark flip
  retinted via the token path. Zero console errors throughout.
- The shipped π spec `fourier-field-visibility.spec.ts` was run live against this server: **2/2 PASS**
  (light + dark). The gate matches the visual truth — on the SUBSTRATE page.

As a "flow field": it is not a field at all — a single 1-D curve trace. Judged as what it claims to be (a
comet/epicycle ambient mark), it is well-built; the math (sorted-draw spectrum, order-independent sum) and
the 3-pass recipe from the W43 SOTA doc are genuinely implemented in `FourierField.vue`.

## 3. Constellation — drift + interactions, live

Story page `/substrates/constellation` (`RA-flow-fields-constellation-story.png`, `-pointer-web.png`,
`-warp-before/mid/after.png`, `-gravity-held.png`):

- **Lattice drifts**: 11 793 px changed / 900 ms readback; proximity edges continually re-triangulate.
- **Click-to-warp verified as a spring, not a snap**: before (focal at center) → mid-flight 350 ms after
  click → settled pinned on the nearest node. The three captures show the full eased path.
- **Gravity well is the standout interaction**: a held pointer visibly pulls the lattice into a dense
  converging cluster around the cursor (`-gravity-held.png`) — striking, immediately legible.
- Pointer-web steering is SUBTLE — after a slow sweep across the canvas the lean toward the cursor is
  barely distinguishable from ambient drift in a static capture. Not broken (the focal/halo follows), just
  a quiet effect oversold by "steer-toward-cursor" in the caption.

**Coherence verdict: not a flow, by design.** Constant-velocity drift + bounce has no directionality or
continuity of flow — it reads as an ambient drifting lattice, which is its stated intent ("drifting
proximity-graph"). No false claim here.

## 4. The hero-consumption layer — the headline reality gap

The manifest promises "A HERO page declares a rich live substrate (aurora / constellation / fourier); the
page chassis reads it and renders it once." Live, **1 of 3 actually reads**:

| Hero page | Declared bg | Live reality | Evidence |
|---|---|---|---|
| `/foundations/intro` | aurora | **WORKS** — rose-indigo-amber wash clearly visible through the 0.8-α blur(16px) glass card | `RA-flow-fields-intro-aurora-bg.png` |
| `/compositions/hero` | constellation | **DEAD — renders 0 px.** Computed-style readback: host `position: relative`, `height: 0px` inside a 943 px `.story-hero`; canvas backing stuck at the 300×150 default | `RA-flow-fields-hero-constellation-bg.png` |
| `/compositions/auth-shell` | fourier | **RUNS but 100% OCCLUDED.** Canvas sized + painting (~8 800 px), but the floating card's footprint covers the full canvas (cardFrac = 1.0); 12 samples over 24 s: painted-pixels-outside-card = 0 in every sample | `RA-flow-fields-auth-shell-fourier-bg.png`, `-dark.png` |

**Mechanism (read, not patched — implementation is halted):**

- Constellation: the scoped root rule `.constellation { position: relative; inline-size: 100%;
  block-size: 100% }` (`Constellation.vue`) carries the `[data-v-…]` attribute → specificity (0,2,0),
  beating `.story-hero-bg { position: absolute; inset: 0; z-index: -10 }` (0,1,0) in
  `demo/stories/story-hero.css`. The in-flow relative box with percent height against the auto-height
  `.story-hero` collapses to 0. FourierField "works" here only because ITS scoped root happens to be
  `position: absolute; inset: 0` — the two "sibling" substrates have inconsistent root-positioning
  contracts and the shared `.story-hero-bg` chassis silently depends on the difference. (Same-class note:
  the fourier scoped `z-index: 0` also beats the chassis's intended `-10`.)
- Auth-shell: geometry, not timing — the hero-variant card spans the entire `.story-hero`, so a
  0.66%-coverage hairline comet behind a 0.8-α cream card is invisible at every instant. A full-field WASH
  (aurora) survives that filter; a thin LINE does not. The fourier-as-hero-bg recipe needs either card
  translucency headroom or comet intensity the current `opacityCeiling` wiring does not give it.
- **No π spec covers either hero page** (`grep compositions/hero|auth-shell tests-visual/*.spec.ts` → no
  spec hits; all constellation/fourier specs target `/substrates/*`). Gate-green, visually absent — the
  exact AX cardinal-lesson class, recurring one layer up.

## 5. Is a standalone flow-field primitive missing?

The set IMPLIES one — "flow field" appears throughout the corpus, yet no consumer-usable flow-field
BACKGROUND exists (particles advected along a curl-noise/ETF vector field, the classic generative
register). The aurora's field is shader-internal; W60 wants a unique rich background per hero and the trio
currently offers wash (aurora) / lattice (constellation) / line (fourier) — a particle-flow substrate is
the obvious fourth register. HOWEVER, under the substrate-without-consumer-binary invariant it should only
ship WITH the W60 consumer. The actionable gap is not a missing primitive — it is that the EXISTING
hero-consumption plumbing is broken for 2 of 3 substrates and ungated.

## Verdict on the flow-field story as a set

**MIXED.** Substrate-by-substrate, judged live: the aurora painterly tensor flow is genuinely excellent —
the one artifact here that earns "SOTA" against its own claims; the fourier phosphor-comet is well-built
and honest (best on dark); the constellation is a polished ambient lattice with a standout gravity-well
interaction. But the SET's front-door promise — heroes over rich live flow-field substrates — fails
visibly on 2 of 3 pages (one renders zero pixels, one is fully occluded), the tensor FLOW pattern the
proof gate locks is consumer-dead, and the hero layer has no visual gate. The pieces are strong; the
story they were built to tell is not yet on screen.

## Captures (this lane)

`RA-flow-fields-aurora-{default,vangogh,vangogh-closeup,oilpastel,oilpastel-closeup,radial-deliberative}.png`,
`RA-flow-fields-fourier-{story-light,story-dark,hero-vs-final,dark-panes,indigo,freeze-dark}.png`,
`RA-flow-fields-constellation-{story,pointer-web,warp-before,warp-mid,warp-after,gravity-held}.png`,
`RA-flow-fields-{hero-constellation-bg,auth-shell-fourier-bg,auth-shell-fourier-dark,intro-aurora-bg}.png`
— all in `docs/tranches/AY/audit/reality/`.
