# RESEARCH-2 — viz-broken-fix: the TARGET spec + acceptance bar

**Role:** RESEARCH-2 (SOTA / design target). Define PRECISELY what the three broken vizzes
SHOULD look like + behave like, and the acceptance bar the fix must hit.
**North star:** `design.md` (the six-layer Liquid-Glass composite · the 7 glass tiers · warm-cream
identity) + iOS-26/27 Liquid Glass (real-time lensing, specular glint, warm adaptive tint) +
glass+PAPER morphism + `BA.W-NO-GRAY` (glass is warm MATERIAL at OKLab hue 62–75°, NEVER gray) +
`W-DARK-MATERIAL` (luminous-dark transmissive) + the **`feedback-liquid-weight-universal`** law
(inertia / weight / bounce / squish on ALL motion).
**Discipline:** NO legacy, idiomatic, gestalt, compositor-only, PRM-carved, Safari-compatible. NO
quick workarounds.

---

## 0 — Live diagnosis summary (Chrome, real Metal-3 host, :5199, dpr 2)

All three pages were root-caused LIVE. The **substrate canvas-resize hang (FIX 5)** HOLDS — every
canvas is now correctly sized (blob 1536²/1126², goo-dot 2066×920, fourier 1246×1042); **all three
run on the WebGL2 fallback** (this Chrome's `adapter.requestDevice()` times out per FIX 5, so WGSL
is never reached — a real WebGPU device runs WGSL and never trips the timeout). All three ANIMATE
(blob 512 raf/1s across 2 canvases, goo-dot 120 raf/1s, fourier active). **Zero shader/WebGPU
console errors** on any page. So "broken" is NOT a crash or a blank canvas — it is **render-quality,
field-scale, pointer-semantic, and shape-source** defects, plus the page-chrome (gray plate / no
colorful field / hero-scroll) defects the parallel waves already name.

Diagnostic captures: `docs/tranches/BD/viz/refine/viz-broken-fix-diag/{blob-diag,blob-now,goodot-now,fourier-now,fourier-canvas}.png`.

---

## 1 — `/substrates/blob` — the WebGL2 metaball

### What is BROKEN (live evidence)
- The blob renders as a **boxy, hard-edged, square-ish golden mass** — NOT a smooth liquid
  metaball. The silhouette has visible flat sides / jagged corners (see `blob-diag.png`); the
  smin-merged liquid roundness is absent.
- **No satellites visibly orbiting / merging.** The hero "studio" blob should show satellites
  cycling on mount (the demo's own promise: "satellites visibly cycling on mount") and the
  orbit → merge → absorb → emerge show. Live: a single static-ish lump.
- The blob stages over a **`<ShowcaseFrame tier="quiet">` plate** (blob.vue:459) — a translucent
  near-cream plate, NOT a colorful aurora `field`. Over a low-frequency plate the lit-glass /
  metaball has nothing behind it to read against; the golden bead floats on a washed gray-cream
  card (the §3 / FIX-8 / W-PAGE-BACKGROUND defect class, proven necessary-but-staged-wrong here).
- The dashed-outline (WatercolorDot ghost) "does not follow the proper path" — see §1b.
- The hero "GooBlob" title scrolls on every page — see §4 (W-STICKY-TITLE-CONDENSE).

### Root-cause hypotheses (for FIX-2 / triumvirate to confirm)
1. **The WebGL2 metaball fragment path (`metaball.frag.ts`) renders the boxy shape.** Candidates:
   the smin smoothing constant (`uSmoothK`) is too low for the WebGL2 arm (the `smoothK` 1.0-centred
   multiplier × the config absolute band — `constants.ts:81`), OR the SDF iso-threshold / AA `fwidth`
   edge half-width is mis-tuned on the WebGL2 derivative (the WGSL primary uses fragment-stage
   `fwidth`; the GLSL fallback's `fwidth` derivative differs per-GPU). A boxy blob = the metaball
   field is being thresholded with a near-binary step (no soft smin), so the union of body + 4
   satellites reads as overlapping discs with hard seams, not one liquid mass.
2. **Satellites may not be advancing / merging** — the orbit envelope (`useBlobSatellites`) or the
   `uMaxReach` / smin-band worst-case widen (`BA.W-GOO-REDRESS`) is mis-scaled on the WebGL2 arm, so
   satellites sit outside the smin band and either detach (read as separate discs) or are culled.
3. **The plate, not the field** — `tier="quiet"` must become `tier="field"` over a colorful Aurora
   (the FIX-8 / W-PAGE-BACKGROUND fix), so the lit glass + golden metaball read against a rich
   backdrop (§L1: glass BENDS + CONCENTRATES light — it needs a high-frequency field to bend).

### The TARGET (what it SHOULD look like)
- **A smooth, liquid, single-mass metaball** — the iOS-blob / lava-lamp gold bead: a rounded
  warm-gold (warm-cream identity, the earned-gold register is `--color-gold`; the library default
  blob is the warm-cream/amber bead, NOT a saturated brand hue) droplet with NO flat sides, NO
  jagged seams. The smin merge is VISIBLE — where a satellite meets the body the surface necks into
  one connected liquid bridge (the goo), never two overlapping discs.
- **Satellites visibly orbit + merge + emerge** on mount — the living lit GL bead the demo promises.
  The motion carries **liquid weight** (the orbit is a slow eccentric drift, the merge a smooth
  smin bridge, the emerge a separation that necks-and-snaps — the `feedback-liquid-weight-universal`
  law: nothing hops, the satellite glides on an inertial orbit and the merge/absorb reads as mass).
- **Lit glass surface** — the blob carries the six-layer optical reading on its OWN surface: the
  OKLCh-perturbed warm-gold fill (the per-position hue drift), a specular catch-light (the lit-glass
  highlight, the `metaball.frag` lit-surface + analytic-gradient normal), a soft rim. It reads as a
  3D refractive liquid bead, not a flat 2D fill.
- **Staged over a COLORFUL aurora field** (`tier="field"` + a vibrant `<Aurora :config>` preset, the
  one-GL-budget permitting — the studio hero is the ONE live stage, or the field is the page bg) so
  the bead reads as liquid glass over a rich backdrop. Warm-cream / dawn auroras for the warm
  identity; a vibrant cerulean (OPENAI_SKY) per the FIX-4 precedent makes the refraction POP.
- **Pointer-reactive** — drag the cursor and the blob LEANS / is attracted toward it (the
  `useBlobPointer` field-lean), near-cursor surface swells, a flick fires a one-shot bloom — all
  with inertial follow + spring settle (liquid weight), `wake()`-on-hover same-frame (BA.W-GOO-REDRESS).
- **Dark mode** — the luminous-dark transmissive register (`W-DARK-MATERIAL`): the bead glows where
  light passes; the field does not collapse to a muddy brown void.

### Acceptance bar (blob)
- [ ] The hero blob silhouette is SMOOTH + ROUNDED (no flat sides / jagged corners) in a live
      Chrome capture, both modes — the metaball reads as ONE liquid mass.
- [ ] Satellites are VISIBLE orbiting on mount; at least one satellite-merge → bridge → emerge cycle
      is captured (the smin bridge necks the two into one connected form, then snaps back).
- [ ] The blob carries a specular catch-light + OKLCh warm-gold fill (lit glass, not flat fill).
- [ ] The hero stages over a COLORFUL field (`tier="field"` over a live Aurora), NOT a flat plate —
      the refraction reads (the §3 / FIX-8 / W-PAGE-BACKGROUND closure for this page).
- [ ] Pointer drag: the blob leans toward the cursor with inertial follow + spring settle; a flick
      fires a bloom (liquid-weight law).
- [ ] WebGL2 arm AND (where a device runs it) WGSL arm both paint the smooth bead (parity — the
      WebGL2 fallback must NOT be the boxy degenerate while WGSL is smooth).
- [ ] PRM: one static frame then park, no live velocity (`proof:offscreen-pause` intact).

---

## 1b — `/substrates/blob` — the WatercolorDot **ghost** dashed outline ("does not follow the proper path")

### Root cause (CONFIRMED via source)
The SOLID WatercolorDot silhouette is a seeded **CSS `border-radius`** blob (an 8-value asymmetric
superellipse set once as the dot's identity — `useWatercolorBlob.ts:88/92`). The GHOST variant
traces the outline as an **SVG `<ellipse>` + `feDisplacementMap`** (WatercolorDot.vue:205–220) — a
PURE ellipse wobbled by a displacement filter. **The two shapes come from DIFFERENT generators:** a
displaced `<ellipse>` ≠ the seeded `border-radius` silhouette, so the dashed outline does NOT trace
the solid dot's actual path. This is the literal "does not follow the proper path" defect — the
ghost is an approximation (ellipse+noise), not the real silhouette.

### The TARGET
- The ghost dashed outline traces the **EXACT same seeded silhouette** the solid dot fills — ONE
  shape source feeds both (the README's own promise: "a ghost of a given `color + seed` carries the
  solid dot's outline exactly", emission §: "the geometry leaf is REUSED, the stroke its only delta").
- Idiomatic fix direction: convert the seeded `border-radius` blob into an SVG `path` (a superellipse
  / corner-arc path that matches the CSS `border-radius` rendering), and STROKE that path dashed for
  the ghost — so solid-fill and ghost-stroke are the SAME geometry. (Or, if `border-radius` cannot be
  faithfully reproduced as a path, drive BOTH the solid and the ghost from a single SVG blob path —
  the no-two-generators discipline.) The dashes stay arc-length-uniform (no rounded-rect bunching),
  the `--watercolor-dash`/`--watercolor-gap` axis preserved.
- The stroke reads the warm `--watercolor-color`, a low-alpha fill kept behind it; STATIC (PRM-neutral).

### Acceptance bar (ghost)
- [ ] A ghost + a solid WatercolorDot of the SAME `color + seed` are overlaid (or compared) in a
      live capture; the dashed stroke traces the solid fill's outline EXACTLY (≤ ~1px deviation).
- [ ] The outline is the seeded organic blob silhouette (NOT a plain ellipse, NOT a dashed rect).
- [ ] Dashes are arc-length-uniform along the path.

---

## 2 — `/substrates/goo-dot` — the goo+dot HYBRID

### What is BROKEN (live evidence)
- The viz renders a **tiny, faint, sparse cluster of dim dots (~120px)** floating in the centre of a
  ~1033px canvas (`goodot-now.png`). The dots are minuscule relative to the canvas, low-contrast,
  and do NOT form the merging-metaball goo shape. "Totally broken" = the field reads as a stray dot
  speck, not a dense bright dot-rendered goo blob.
- It animates (120 raf/1s) — so the loop runs; the defect is **field scale + dot density +
  brightness + the metaball-SDF mapping**, not a dead loop or a sizing hang.

### Root-cause hypotheses (for the triumvirate)
1. **The SDF field scale is wrong for the canvas aspect/size.** The hybrid drives the dot grid off
   `v = thickness(sceneDistG(cellCenter))` (the byte-untouched goo-blob `sceneDistG` SPLICED). If the
   field's UV scale / aspect correction is mis-mapped to the WebGL2 dot-stamp arm, the merged blob
   occupies a tiny UV region → a tiny dot patch. Candidate: the field is sized for a square/normalized
   UV but the canvas is 2.25:1 (2066×920), so the goo collapses to a small central island.
2. **Dot size + brightness floor too low** — the `dot-field` default register (dense+big+bright
   inside the merged blob, sparse+small+dim at rim) is rendering at the rim-register everywhere
   (small+dim) because the field thickness `v` is near-zero across the grid (the field is tiny/weak).
3. **The WebGL2 dot-stamp fallback** may mis-read the field (the WGSL primary is the design target;
   the WebGL2 dot-stamp must run the SAME field — "born-GPU, no Canvas2D" — and a fallback that
   under-scales the field is the live defect, mirroring the dot-matrix WebGL2 `PI`-undeclared class
   FIX 6 already hit on the sibling viz).

### The TARGET (what it SHOULD look like)
- **A dense, bright, warm-cream dot-cloud forming a merging-metaball goo shape** that FILLS a
  generous portion of the canvas (centered, breathing) — the "goo blob drawn entirely in dots".
  Inside the merged blob: dense + big + bright dots; at the rim: sparse + small + dim — the
  `v = thickness(sceneDistG)` gradient reads as a tixy-land SDF dot-field.
- **The goo MERGES in dots** — as a satellite meatballs into the body, the band of dots BETWEEN them
  thickens into a connected bridge then snaps back (the gooey form drawn in dots, with **liquid
  weight** — the bridge necks/thickens with mass, never a hard appear).
- **Warm-cream identity default** (the library default), the near-dark dotted-tone a non-default demo
  preset. Over a colorful field where the glass register applies (or the warm page bg).
- **Cursor gravity** (folds the sibling dot-matrix C4 ask, applicable here): the dot-cloud LEANS
  toward the cursor (field lean), near-cursor dots brighten + swell, a flick fires a one-shot accel
  bloom — inertial follow + spring settle (liquid weight). The viz also reads as a 2D background
  effect (a field that fills, not a tiny island).
- **The four registers** read (dot-field default · dot-dither Bayer8 halftone · dot-lattice ·
  dot-sphere) — ONE field, four looks; the default `dot-field` is the load-bearing one to fix first.

### Acceptance bar (goo-dot)
- [ ] The dot-cloud FILLS a generous, centered region of the canvas (NOT a ~120px speck) — the goo
      shape is unmistakable in a live capture, both modes.
- [ ] Dot density + brightness read the field gradient: dense+big+bright in the body, sparse+small+
      dim at the rim (the `v = thickness(sceneDistG)` mapping is visible).
- [ ] At least one satellite-merge captured: the dot-bridge between body + satellite thickens into a
      connected band then snaps back (the goo drawn in dots, liquid-weight).
- [ ] Cursor drag: the cloud leans toward the cursor with inertial follow; near-cursor dots brighten/
      swell; a flick fires a bloom.
- [ ] The default register is the warm-cream identity; WebGL2 dot-stamp runs the SAME field as WGSL
      (no degenerate-fallback divergence).
- [ ] PRM: one static frame then park.

---

## 3 — `/substrates/fourier-field` — cursor-follow + dead config options

### What is BROKEN (live evidence)
- **The viz RENDERS** — epicycle circles + a traced Fourier reconstruction curve (pink/red over the
  warm plate, `fourier-canvas.png`), "N x/16 playing". NOT blank.
- **The sliders DO work** (live-verified): Harmonics N drove 16→6 + the readout "N 16/16"→"N 6/16";
  the harmonicScale slider drove 0.24→0.29. So harmonics + harmonicScale ARE wired.
- **"These options do not even work"** — must be a SUBSET: the **Source `<select>`** (elliptic →
  another shape — the most likely dead option; a select binding that does not re-mint the spectrum),
  and/or epicycleArms / intensity / rainbowChain / trailArc whose VISUAL effect is imperceptible (a
  change that applies but does not visibly alter the curve reads as "doesn't work"). The triumvirate
  must test EACH option live and confirm which are (a) unwired, (b) wired-but-invisible, (c) working.
- **"does not follow the cursor properly"** — ROOT CAUSE (confirmed in source): the scrub maps
  `headT = pointer.smoothedPosition.x % 1` (`useFourierField.ts:115`). The pointer field is in
  normalized-host space [0,1], so `% 1` is a near-no-op and head_t = the cursor's normalized X. **The
  cursor only SCRUBS the reconstruction phase along the X axis (1D timeline scrub), it does NOT make
  the curve/field follow the cursor in 2D.** The user expects the field to FOLLOW / be attracted to
  the cursor (a 2D spatial lean toward the pointer), not a horizontal timeline scrub. Plus the
  smoothing lag + the X-only mapping make the response feel disconnected from where the cursor is.

### The TARGET (what it SHOULD look like)
- **The cursor genuinely follows / attracts.** Two coherent target semantics (the triumvirate
  decides which is the design intent; BOTH carry liquid weight):
  - **(A) the epicycle chain / reconstruction head is ATTRACTED toward the 2D cursor** — the rotating
    chain leans, the head_t advances toward the cursor's angular/parametric position, so the curve
    "reaches" for the pointer with inertial follow + spring settle. The field LEANS toward the
    cursor (the `usePointerVelocityField` smoothedPosition.x AND .y both consumed, mapped to a 2D
    attraction, not an X-only scrub).
  - **(B) if scrub IS the intent** (cursor X → timeline phase), the mapping must read as DELIBERATE +
    responsive: a clear visual scrub-head indicator at the cursor, no perceptible lag, and the Y axis
    also doing something (e.g., the reconstruction depth / N preview), so the cursor is not "ignored"
    on one axis. The current X-only-`% 1`-with-lag reads as "not following".
  - The DESIGN TARGET per the liquid-weight law + the demo's "drag the cursor to SCRUB" copy: a
    responsive, weighted scrub where the cursor position visibly + immediately drives the head with a
    spring-settled follow — AND a 2D lean of the chain toward the pointer so both axes register.
- **Every configurator option visibly works** — Source select re-mints the spectrum (elliptic →
  heart / star / wordmark shapes, `FOURIER_SHAPES`), each slider produces a perceptible curve change,
  the epicycle/rainbow/trail toggles read. No dead/no-op control.
- **Warm-cream identity** — the curve strokes `--motion-accent` (the `--viz-legendre` violet twin as
  the self-sufficient default), the plate is the warm-cream field (NOT gray); ideally staged over a
  colorful field per W-PAGE-BACKGROUND (the demo declares a calm `paper`/`fourier` bg — the glass
  chrome should read warm, not gray).
- **Liquid weight** — the curve assembles/disassembles as N changes with a spring-settled morph (not
  a hard term-snap); the scrub follows with inertial settle; a flick injects a momentum impulse
  (velocity-continuous fling-and-settle, already in the code — `momentum = burst * 4`).

### Acceptance bar (fourier-field)
- [ ] LIVE: every configurator control is tested + confirmed working (Source select re-mints the
      curve; each slider produces a visible change; each toggle reads). A per-control PASS/FAIL table
      is captured. Zero dead options.
- [ ] LIVE: the cursor genuinely follows — moving the pointer over the canvas makes the
      curve/chain/head respond in a way that reads as "following the cursor" (2D lean or a responsive
      weighted scrub with a visible head indicator), with inertial follow + spring settle.
- [ ] The cursor response carries liquid weight (no hard snap, no perceptible lag-disconnect).
- [ ] The plate/chrome reads WARM (not gray); the curve strokes the violet `--motion-accent`.
- [ ] PRM: the field freezes (tick(0)), no live scrub momentum.

---

## 4 — `/substrates/blob` (+ ALL pages) — "the hero text should NOT scroll like this on every page"

### Root cause + fold
The StoryHero giant display title (`GooBlob` / `Fourier Field` / etc.) scrolls up-and-away on every
page (confirmed live: scrolling the blob page revealed the giant "GooBlob" hero at top, then the blob
below). The user wants the hero NOT to scroll like this. **This folds into `W-STICKY-TITLE-CONDENSE`**
(the BD wave already named for it) — NOT a viz fix. Recorded here for completeness; the viz triumvirate
should NOT re-solve it.

### The TARGET (for W-STICKY-TITLE-CONDENSE, cross-referenced)
- The hero title condenses / sticks (a scroll-driven shrink-and-pin — the `<ScrollCard>` /
  `card-*-shrink` compositor-transform lanes, `W-CARD-COMPOSITE` / `W-SCROLL-CARD` discipline:
  `translateY` + `scale`, compositor-only, CLS 0) rather than a giant title that scrolls fully away
  on every page. The title stays a present, condensing anchor — liquid-weight (a spring-settled
  shrink), PRM-carved.

### Acceptance bar — DEFERRED to W-STICKY-TITLE-CONDENSE (not the viz fix's scope).

---

## 5 — The shared design north star (binds ALL the viz fixes)

### Warm-cream identity — NEVER gray (`BA.W-NO-GRAY`)
- The library default for every procedural surface + every host plate is the **warm-cream material**:
  the neutral ladder + `--card` resolve OKLab hue **62–75°** (the `--foreground` warm-amber family),
  cleared above the perceptual gray floor (mid/low-L rungs C ≥ 0.020; near-white plates a materially-
  warm ~2× HEAD floor). A viz that reads gray (the goo-dot dim cluster, a gray host plate) VIOLATES
  the floor. The blob is warm-gold/amber; the dots are warm-cream; the fourier curve is the violet
  `--motion-accent` over a warm plate. Gold (`--color-gold`) is EARNED, never the leaking default.
- DARK: the luminous-dark transmissive register (`W-DARK-MATERIAL`) — the surface glows where light
  passes; never a charcoal slab on a dead void.

### The six-layer Liquid-Glass composite (`design.md §L1`)
Where a viz hosts a GLASS plate or reads through one, it composes all six layers: backdrop blur+
saturate · warm surface tint · edge rim · inner catch-light · drop shadow · grain. The viz PIXELS
themselves are GL-procedural (not glass plates), but they STAGE over the field and under glass chrome
— so the field (colorful aurora) + the chrome (warm-cream glass) carry the composite. Glass BENDS +
CONCENTRATES light (lensing) — it needs a high-frequency colorful field to bend (the §3 / FIX-8
lesson: glass over a flat plate is invisible-by-construction; the COLORFUL FIELD is load-bearing).

### The liquid-weight motion law (`feedback-liquid-weight-universal`) — BINDING acceptance lens
- ALL motion carries **inertia · weight · bounce · squish · liquid-glass facility**. Nothing snaps;
  everything settles with spring physics + volume-preserving deformation. The blob orbit/merge, the
  goo-dot bridge, the fourier scrub/assemble, the cursor-follow — ALL must read as MASS in motion
  (a spring-with-overshoot enter / no-overshoot exit, the ≈0.88 squish, fade-coupled-to-transform).
- A viz that hops / snaps / linear-moves / responds-with-no-weight FAILS the bar. The cursor-follow
  is the acute case: the response must be a weighted, inertial, spring-settled follow — NOT a raw
  1:1 jump and NOT a laggy disconnected drift.

### Engineering discipline (binds every fix)
- **NO legacy / no aliases / no workarounds** — clean breaks; fix the root, not a band-aid.
- **Idiomatic** — reuse the shipped primitives (`useBlobPointer`, `usePointerVelocityField`,
  `useLiquidFlex`, `useSpringPress`, the smin field, `useWatercolorBlob`); no demo-local re-fork, no
  second engine, no parallel rAF (the one-loop / `proof:offscreen-pause` discipline).
- **Compositor-only** (transform/opacity/filter, never a layout property — `proof:no-layout-animation`).
- **PRM-carved** — one static frame then park; no live velocity under reduce; the gesture still
  functions (drag/snap), the physics off.
- **Safari-compatible** — the `backdrop-filter` / `filter` blur-settle on WebKit; the WebGL2 fallback
  is the cross-browser floor; the WGSL primary where supported. Verify the WebGL2 arm renders the
  CORRECT result (the live defects ARE on the WebGL2 arm — the fallback must reach parity with WGSL,
  not be a degenerate).
- **WebGPU/WebGL2 parity** — the design target is identical across both arms (the boxy blob / tiny
  goo-dot are WebGL2-arm defects; fixing them must not regress the WGSL arm — `proof:gpu-substrate-single`).

---

## 6 — Disposition map (which wave / triumvirate owns each)

| Defect | Owner | Type |
|---|---|---|
| blob boxy/non-liquid metaball + no satellites | viz-broken-fix (this triumvirate) | render-quality, WebGL2 arm |
| blob over flat plate (no colorful field) | viz-broken-fix + W-PAGE-BACKGROUND | demo staging (`tier="field"` + Aurora) |
| WatercolorDot ghost outline ≠ solid path | viz-broken-fix | shape-source unification (one geometry leaf) |
| goo-dot tiny/faint/sparse (field scale/density) | viz-broken-fix | render-quality, field-scale, WebGL2 dot-stamp |
| goo-dot cursor gravity / 2D bg | viz-broken-fix | pointer (field lean) |
| fourier cursor "doesn't follow" (X-only scrub) | viz-broken-fix | pointer-semantic (2D follow / weighted scrub) |
| fourier dead options (Source select, etc.) | viz-broken-fix | config-binding (per-control live audit) |
| hero text scroll on every page | **W-STICKY-TITLE-CONDENSE** (NOT this fix) | scroll/hero (cross-ref only) |
| gray plates on viz pages | W-GLASS-ABROGATE-GRAY (parallel) | chrome (cross-ref; `tier="field"` removes most) |

---

## 7 — The single binding acceptance gate (gestalt)

Each viz is `complete` IFF, in a LIVE Chrome capture (both modes, WebGL2 arm AND — where a device
runs it — WGSL arm):

1. **It reads as its reference** (blob = a smooth liquid lit-gold metaball with merging satellites;
   goo-dot = a dense bright warm dot-cloud forming a merging goo shape; fourier = a clean epicycle
   reconstruction that genuinely follows the cursor) — a GESTALT judgement, not a pixel delta.
2. **Every interactive control + the cursor work** (the fourier config audit PASSES; the cursor
   genuinely follows on all three).
3. **The motion carries liquid weight** (inertia/spring/squish — nothing snaps).
4. **The identity is warm** (warm-cream/gold/amber, never gray; the violet motion-accent for fourier).
5. **PRM-carved, compositor-only, Safari/WebGL2-WGSL parity** — the discipline holds.
6. **The WatercolorDot ghost traces the solid's exact path.**

A PASS with the blob still boxy, the goo-dot still a speck, the fourier cursor still X-scrub-only, or
the ghost still an ellipse is the close-class lie — FORBIDDEN.
