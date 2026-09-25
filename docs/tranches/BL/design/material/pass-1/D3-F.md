# D3 · pass 1 · D3-F · the yielding field

| field | value |
|---|---|
| seat | D3 pass 1, RESEARCH seat for family D3-F: glass registers its rects, and the substrate compresses its own OKLab lightness under them into the theme band, so the glass stays thin and the ink stays static |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | tasked at `9aa2b7f9`. The worktree was cut at the checkout's HEAD, which read `b37a37c3` at the start. `git diff --stat 9aa2b7f9 b37a37c3 -- src` touches only `src/components/configurator/*` and `src/index.ts` (117 insertions), none of it in the glass material, the dock, the aurora or the tokens, so every HEAD reading below holds for the tasked HEAD |
| inputs | `PORTFOLIO.md` §0-§2, the D3-F section of §4, the D3-F questions of §6 and §7; `pass-1/W.md` (background, §1 and §3.3); `pass-1/X.md` (the consumer census); `harness/HARNESS.md` and the harness scripts. No other family's section was read |
| instruments | The shared battery (`harness/run.mjs`, 68 cells plus 8 live windows plus the retune variant, 662 s + 53 s under load averages 54-68) against a detached scratch worktree carrying the probe. Scratch probes under `…/scratchpad/D3/p1/D3-F-research/probe/`: `q1.mjs` (feather placement), `lag.mjs` and `lagapp/` (the moving-rect latency and the overlap scene), `overlap.mjs`, `bench/` + `bench.mjs` (the shader cost), `cpu.mjs` (the registry's rect reads), `q5.mjs` (the global re-tone), `darkpole.mjs` (the dark pole ladder, analytic). Headless Chromium 149.0.7827.55 with `--enable-unsafe-webgpu --ignore-gpu-blocklist --use-angle=metal` (WebGPU adapter present) and Playwright WebKit 26.5, both with Playwright imported from `glass-ui/node_modules/playwright`. **Playwright WebKit is not Safari.** Every WebKit number is labelled "Playwright WebKit"; every real-Safari cell reads "UNMEASURED (owner's safaridriver checkbox)" |
| probe | 19 files, +330 −845 lines (`probe/F-probe.patch`, 1461 lines). The worktree was removed with `git worktree remove --force` before this write. One git write beyond add and remove: a `git add -N` of the new registry file inside the scratch worktree's own index, to include it in the saved diff. It never touched the checkout |
| load | Load averages ran 28-132 during the runs, and the first battery attempt died at the fifth cell with the browser closed (exit 144). The retry completed. GPU timings are contended; §4 says how that was handled |

## 0 · Verdict in one paragraph

The mechanism works in paint on the real source, on both GPU arms. With the aurora's own shader compressing OKLab L under every registered glass rect, the family's witness W-F goes **GREEN** (152 of 152 gated rows). The field under every plate sits at L 0.893-0.962 in light and 0.219-0.362 in dark, and it is unchanged 24 px outside. **M-5** goes green because the sampler is deleted and the dock reads 4.83-7.42 over the live field with zero readbacks, and **M-7** goes green by the common-floor row. **M-2** is green on every library-substrate and paper cell of the ladder in both themes, 36 of 36 rows per cell. HEAD's worst over the ceiling-1 aurora, light muted 1.47, now reads 4.64. The family does **not** cure:
- anything that is not a library substrate: black, white, checker and stripes stay RED;
- the real Dialog in light, whose plate transmits its own scrim (muted 2.33-2.74);
- chrome calm on the stripes (M-8);
- the perimeter and ring rung (M-3);
- M-4, which the probe halves: the dock inks are no longer poles, but the dock's inactive tab reads the muted register by design, so fg and muted coincide.

M-6 fails in light by construction: no single-pole ladder can satisfy M-1 and M-6 over paper together (§5.3). Motion costs one frame of lag whenever the glass's position writer runs after the substrate's frame callback (§2).

## 1 · The probe (what was built, in the worktree only)

| part | file(s) | what it does |
|---|---|---|
| registry | `src/composables/glass/fieldWell.ts` (new, 179 lines) | Finds glass by the ladder's own class set: `:is(.glass-wash, .glass-quiet, .glass-resting, .glass-card, .glass-floating, .glass-overlay, .dock-plate, [data-field-well])`. Refreshes the element list and each element's corner radius on a `MutationObserver` over `documentElement` (class, style, data-state, childList). Reads the band tokens from `:root`'s computed style on the same refresh. `fieldWellsFor(canvas)` returns at most 16 rects in the canvas's device-pixel space, read with `getBoundingClientRect` inside the substrate's own frame. `onFieldWellChange(cb)` wakes a parked substrate. A cheap rect-signature poll runs while anything may move and parks after 30 still frames; scroll, resize, `transitionrun` and `animationstart` restart it |
| well (WGSL) | `aurora.wgsl.ts` | `@group(0) @binding(1) var<uniform> well: Well` (352 B: band, extra, 16 rects, 4 radius lanes). `fieldWell(col, fragCoord)` is applied in linear light just before the OETF. The rect weight is `w = max_i (1 − smoothstep(outset − feather, outset, sdRoundBox_i))`, with `L' = mix(L, pole + gain·(L − pole), w)`. Hue is kept, and chroma is cut by a 6-step bisection only when the result leaves the sRGB gamut |
| well (GLSL) | `aurora.frag.ts` | The same function over `uWellBand`, `uWellExtra`, `uWellRects[16]` and `uWellRadius[16]`, with `gl_FragCoord.y` flipped to top-left |
| wiring | `wgpuSetup.ts`, `glSetup.ts`, `frameLoop.ts`, `runtime.ts` | A second uniform buffer and bind-group entry on WebGPU; four uniform names on WebGL2; a per-frame upload on both arms. `runtime.ts` subscribes `canvasHandle.wake`, which under reduced motion ticks one frame synchronously (`createCanvasLifecycle.ts:235-238`) |
| tokens | `tokens/glass.css`, `tokens/dark-arm.css` | Light: `--glass-veil-ink: oklch(from var(--card) l c h)` (the cream frost pole), alphas unchanged (.06-.22). Well: `--field-well-pole: 0.965`, `-gain: 0.2`, `-feather: 2px`, `-outset: 2px`, `-ambient: 0`. Dark: pole `oklch(0.45 0.03 60)`, `--glass-veil-base: 0.24` (rungs .16/.20/.24/.28/.32), well pole 0.18, gain 0.28 |
| common floor | `material.css`, `adaptive-legibility.css` | Floor row 1: `contain: paint` dropped from wash, quiet, resting and card. Floor row 2 (dock half only): the `contrast-color()` block is deleted, and the dock's `--muted-foreground` is `var(--on-glass-muted)` |
| deletion (E-1) | `useGlassBackdropLuminance.ts`, `backdropLuminanceSample.ts`, `backdropSampleMath.ts` (746 lines), the `backgroundCanvas` prop, the veil's luma clamp, `@property --glass-backdrop-luma`, `--glass-backdrop-luma-knee` | The sampler is gone. `--glass-veil-rest` is the tier itself |

Not in the probe: the `aurora-image` pipelines (WGSL and GLSL), the blob, constellation and fourier-field substrates, the placeholder ground and the `"css"` render mode, the ladder's `contrast-color()` bright bucket, the field-well rung (floor row 5), the perimeter rung, and stale prose comments that still name the sampler.

## 2 · The pass-1 research questions (PORTFOLIO §6, D3-F)

### Q1 · Can the feather sit wholly inside the rect with no visible seam at the plate edge under blur?

**No. A wholly inside feather is itself the seam. What removes it is a hard-edged well at the rect, which Chromium's backdrop blur allows because it does not sample past the element's box.**

`probe/q1.mjs` over `out/caps/q1` (Chromium, ceiling-1 aurora, reduced motion, 5 variants injected as `:root` tokens). The first four columns are:
- **edge ΔL**: the composite's L at 2 px inside the plate edge minus its centre (noink capture, midline, mean of 7 plates);
- **spill**: ΔE of the raw field against the empty field below the dock and the popover (isolated sides; the ladder grid's 24 px gutters make neighbour wells contaminate a ring read);
- **W-F leg 1**: p05 L under the rect, inset 4 px (light);
- **muted ring**: min p05 over the plates.

| variant (feather / outset) | light edge ΔL | light spill 2 / 4 / 8 / 12 / 16 px | light W-F leg 1 | light muted ring | dark edge ΔL | dark W-F leg 1 (p95) | dark muted ring |
|---|---|---|---|---|---|---|---|
| in (16 / 0), ramp wholly inside | **−0.079** (−0.047 at 16 px) | 0 / 0 / 0 / 0 / 0 | **0.681** | **4.06** | **+0.106** | **0.659** | **4.01** |
| mid (16 / 12) | −0.005 | 0.211 / 0.154 / 0.051 / 0.003 / 0 | 0.878 | 4.64 | +0.006 | 0.366 | 4.97 |
| out (16 / 20) | −0.002 | 0.297 / 0.295 / 0.257 / 0.153 / 0.051 | 0.895 | 4.64 | +0.001 | 0.362 | 4.97 |
| wide (24 / 22) | −0.002 | 0.279 / 0.254 / 0.187 / 0.110 / 0.048 | 0.895 | 4.64 | +0.002 | 0.362 | 4.97 |
| **hard (2 / 2)**, shipped in the probe | **−0.003** | **0.042 / 0 / 0 / 0 / 0** | **0.893** | **4.64** | +0.003 | 0.362 | 4.97 |

Reading:
- **The inside ramp leaves the plate's outer 16 px on an unwelled field:** a darker rim in light, a brighter one in dark. Muted ink sitting 14 px in reads 4.06 and 4.01.
- **Blur does not reach outside the box in Chromium.** The "mid" through "hard" rows show edge ΔL ≤ 0.005 while the unwelled field begins 2-20 px outside. That is only possible if `backdrop-filter: blur()` samples no farther than the element's own box. So the well need only cover the box, and a 2 px ramp straddling the edge spills 2 px, which the plate's own rim covers.
- **Playwright WebKit paints no `backdrop-filter`**, so the blur-edge question is unanswered there. Real Safari: UNMEASURED (owner's safaridriver checkbox). If Safari's backdrop blur does read past the box, the outset must grow to about 2σ of the rung's blur (20-44 px at the 10-22 px rungs), and the spill becomes a visible pale halo. That is the family's single largest engine risk.
- **The instrument.** W-F's leg 2 passes at the hard well only because the popover's 24 px ring crosses the "Filters" trigger label (present in `raw`, absent from `empty`): 29 pixels, within the witness's p95 allowance (`probe/leg2dbg.mjs`). A denser specimen would trip it on text, not on spill.

### Q2 · What latency does registering a rect add, from DOM to uniform to frame, during a dock morph? Does the well lead or trail at 120 Hz?

**It never leads. It trails by exactly 0 or 1 frame, and which one is decided by rAF callback order, not by the registry.**

`probe/lag.mjs` over `probe/lagapp/dist`: headless Chromium, motion on, the WebGPU aurora, and a 200×120 `[data-field-well]` box marked by 2 px blue top and bottom borders. Each screenshot is one composited frame holding both the DOM box and the substrate's well. The lag is (left gap − right gap)/2 against the box, over 16 frames per mover. The measured rAF period is **8.30 ms** (p50 over 239 intervals), so this *is* 120 Hz. At 900 px/s the box moves 7.5 px per frame.

| mover | position writer registered **before** the substrate's rAF | registered **after** it | dark theme (before) |
|---|---|---|---|
| JS rAF `transform` (the dock's morph idiom) | lag 0.0 px, **0 frames** | **7.5 px = 1.00 frame** (gaps −6…−8 px on the leading edge) | 0 frames |
| CSS animation of `left` (main thread) | 0 frames | 0 frames | 0 frames |
| CSS animation of `transform` (compositor) | **1.00 frame** in one run | 0 frames in two runs | 0 frames |

- **The registry adds nothing.** Rects are read inside the substrate's frame, and the upload rides that frame's submit.
- **The lag is ordering.** A JS writer whose rAF callback runs after the substrate's paints the box one frame ahead of the well. A compositor-thread transform animation can run a frame ahead of the main thread's view of it.
- **What that costs.** At 1 frame of lag with the hard 2 px well, the leading edge of a moving plate shows an unwelled sliver as wide as one frame's travel: 7.5 px at 900 px/s, about 17 px for a 2000 px/s morph at 120 Hz.
- **The cure is structural.** One library frame clock, with a write phase (dock morph, sheet detents, springs) that runs before a paint phase (substrates). Consumer JS movers that bypass the clock keep the one-frame trail, so the outset must carry a motion margin: `outset ≥ v_max / f`. That brings back a visible spill of that width at rest, unless the outset itself rides the rect's own velocity.

### Q3 · How does the well compose for overlapping and nested glass, several substrates, and page text lying between field and glass?

`probe/overlap.mjs` (reduced motion, frozen field, raw capture with the plates hidden):

| case | light field L (p05 / p50 / p95) | dark field L (p05 / p50 / p95) |
|---|---|---|
| plate A alone | 0.895 / 0.896 / 0.898 | 0.301 / 0.303 / 0.306 |
| A ∩ B overlap | 0.896 / 0.898 / 0.901 | 0.304 / 0.307 / 0.310 |
| plate B alone | 0.902 / 0.910 / 0.916 | 0.312 / 0.322 / 0.332 |
| L across B's left edge inside A, 262→298 px | 0.895-0.899 (no step) | 0.302-0.307 (no step) |
| nested quiet inside floating | 0.902 / 0.910 / 0.918 | 0.312 / 0.323 / 0.334 |

- **Overlap and nesting** compose by `max` of the weights, so the field is compressed once. There is no double well and no seam at an inner edge. The depth is not a per-level quantity: every level carries muted text, so every level needs the whole band. The portfolio's "a depth per level" collapses to one band per theme (P-1).
- **Page text between field and glass.** A `.glass-resting` plate over 18 px prose over the welled field: muted ink p05 in its text box reads **4.10** in light (5.06 on the same plate beside the prose) and **4.35** in dark (5.13). The prose is not the substrate, so nothing yields under the letters. The plate's blur smears them into the composite, and muted falls under 4.5.
- **Several substrates** (not measured). Each substrate carves under the rects that meet its own canvas. For a stack (a blob canvas over an aurora canvas), each layer must carve, or the transparent top layer's own pixels stay out of band. A substrate lying *above* glass must not carve. The registry needs a z-order test (the glass above the canvas in paint order), which the probe does not make: it wells every intersecting rect.

### Q4 · What is the shader cost per rect on the aurora and blob engines? What is the uniform bound (16 rects)?

`probe/bench/`: WebGPU, headless Chromium on Apple `metal-3`, a 2560×1600 full-frame pass (a 1280×800 viewport at DPR 2). The base is a 5-octave fbm plus one OKLab round trip; the probe's `fieldWell` WGSL was copied verbatim. GPU time comes from `timestamp-query`, over 3 interleaved repetitions × 150 frames. The GPU was shared with other seats, and p50 swung 0.48-2.6 ms for the same base pass between runs, so the table reports the **minimum** (the uncontended time) and the p10.

| config | min µs | p10 µs | Δ vs base (min) |
|---|---|---|---|
| base, no well code | 294.7 | 295.2 | — |
| well code, 0 rects | 349.7 | 382.7 | +55 (the loop preamble; within noise of the next row) |
| 1 rect, 360×180 (1.6% of the frame) | 311.0 | 320.6 | +16 |
| 4 rects (6.3%) | 349.6 | 386.9 | +55 |
| 16 rects (25% coverage) | 520.3 | 524.7 | +226 |
| 16 rects each covering the whole frame (worst) | 612.6 | 658.3 | +318 |

- **Per frame.** About +0.23-0.32 ms at 4 Mpx for the full 16-rect load: at most 4% of a 120 Hz frame budget (8.3 ms). The shipped aurora shader is much heavier than this base, so the relative cost is lower.
- **Where the cost sits.** The per-rect SDF loop runs on every pixel. The gamut bisection (up to 7 OKLab→linear conversions) runs only on welled pixels whose lifted colour leaves the gamut.
- **Not measured.** The WebGL2/GLSL arm's cost (the same op count), and the blob engine, whose metaball WGSL and GLSL were not touched. The bound of 16 fills 256 B of the 352 B uniform block. At 17+ surfaces the probe silently drops the rest, which E-2 forbids: the spec must fail loud (§3).
- **Main thread.** `probe/cpu.mjs`: 16 `getBoundingClientRect` plus the canvas rect per frame. Chromium clean-layout p50 < 0.1 ms, p95 0.1 ms; after a style write, p50 0.1, p95 0.2 ms. Playwright WebKit p50 < 0.1 ms, p95 ≤ 1.0 ms. The timer is coarsened to 0.1 ms.

### Q5 · Can the same site cure F-24's theme-blind aurora, a global re-tone per theme?

**Yes, as a parameter of the same function**: `--field-well-ambient` is a floor on the weight everywhere. `probe/q5.mjs`, dark theme, ceiling 1, the empty field (no glass), 3 px grid:

| ambient | L p01 / p50 / p99 | C p50 |
|---|---|---|
| 0 (HEAD's field) | 0.617 / 0.733 / 0.830 | 0.150 |
| 0.5 | 0.459 / 0.533 / 0.597 | 0.128 |
| 1 | 0.301 / 0.336 / 0.362 | 0.081 |

At ambient 1 the dark field sits inside the dark ink band everywhere, and every glass well becomes indistinguishable from the field. That reads as a darker aurora rather than as glass carving anything. The number is a design decision for the aurora's owner (F-24, F-75's interface), not D3's. D3's point is that no second mechanism is needed to make it.

### Q6 · For non-substrate backgrounds, which answer does F adopt, and does that make F a second mechanism?

**Measured.** Over the four hostile grounds, which no substrate paints, the probe's thin frost alone gives the following (`caps/f2/results/M-2.log`):
- light over black: fg down to 1.01 (quiet), muted 1.83, dock 2.65;
- light over the checker and stripes: muted 1.74-1.83;
- dark over white: fg 1.03, muted 1.15;
- dark over the checker and stripes: muted 1.25-2.27.

The consumer grounds are the same kind (`X.md` §3):
- fourier's glass over prose and its own 2D canvases;
- chicago's photos;
- keyframes' graph paper under a 0.1-ceiling aurora, where the well moves a 10% layer and the paper (L 0.98) already sits in the light band.

**The answer, stated without reference to other families.** Glass over a ground F does not own needs its legibility from somewhere F does not reach, and there are only three places to put it: a veil α bounded for the worst ground, a ground carried by the glyph, or a declared ground. Each is a second writer on either the plate or the ink.

**So yes, F alone is incomplete, and adopting any of these makes it two mechanisms.** The honest scoping is: F guarantees the band on library substrates, and nothing else is claimed. That scoping fails M-2 on the hostile grounds by construction, and it leaves fourier and chicago exactly where HEAD leaves them. Under E-2 the plate over an unknown ground would still fail loud rather than mask. That is legal, but it is not a cure for those consumers.

## 3 · The strongest form (what F must specify precisely to work)

1. **One band per theme, as tokens.** `--field-well-pole`, `-gain`, `-feather`, `-outset` and `-ambient` live in `tokens/glass.css` (light) and `tokens/dark-arm.css` (dark), in plain per-mode arms (E-13-safe; no `light-dark()`). Solve the band from the ink table of PORTFOLIO §2.1 with margin. The measured probe values are:
   - light pole 0.965, gain 0.2: field L 0.617-0.830 maps to 0.89-0.94, and muted needs ≥ 0.876;
   - dark pole 0.18, gain 0.28: maps to 0.30-0.36, and dark muted needs ≤ 0.408.
   
   The band is one per theme, not per level (Q3).
2. **A hard well at the painted box.** Feather 2 px, outset 2 px, the corner radius clamped to half the short side. The radius clamp is a real bug the probe hit: `.dock-plate`'s pill radius left the dock unwelled until it was clamped. The outset grows only by the declared motion margin (item 5).
3. **Registration by the ladder, not by consumers.** The selector *is* the ladder's class set plus `.dock-plate` and one opt-in attribute (`data-field-well`). Consumers write nothing. The dock publishes its **visible** extent: its plate morphs by `clip-path: inset()` (`dock.css:86-92`), so `getBoundingClientRect` over-reports a collapsed dock and would spill under the clipped-away area. The spec reads `--dock-plate-inset-*` off the plate, or the dock writes its own rect (the "morph writes" of the charter).
4. **A z-order test.** Only glass painted above the substrate canvas yields. The probe wells every intersecting rect.
5. **One library frame clock**, with a write phase then a paint phase, so library movers (dock morph, sheet detents, spring popovers) are never a frame ahead of the well (Q2). Consumer movers outside the clock get `outset = v_max / f` as a declared, measured margin, never an unbounded feather.
6. **Fail loud past the bound.** At more than 16 registered rects in one canvas the substrate reports `rendererStatus` failure attribution, rather than dropping wells in silence (E-2). The alternative is a rect texture or storage buffer with no fixed bound, at the cost of a second binding type across both arms.
7. **Every arm of every library substrate:**
   - aurora palette WGSL/GLSL (done in the probe);
   - aurora image WGSL/GLSL;
   - blob metaball WGSL/GLSL;
   - constellation (Canvas2D);
   - fourier-field;
   - the aurora placeholder ground and the `"css"` render mode (software raster), which paint a CSS gradient and have no shader.
   
   Without the last arm, a software-raster device, and the aurora's frame 0 before the canvas arms, show no well. The CSS arm can carve with the same rects as a mask over a second, lightened copy of the ground. That is a second implementation of the same law, and a real cost.
8. **The ceiling composes by construction.** The aurora's ceiling is CSS `opacity` on `.aurora-root` (`Aurora.vue:255`), so the composite is `ceiling·field' + (1 − ceiling)·page`. With the page on the same side of the band as the pole (light paper L 0.985, dark page L 0.146), mixing only moves toward the band. The measured cells agree: W-F at ceiling 0.5 reads light 0.934-0.962 and dark 0.219-0.260. A consumer page ground on the wrong side of the band (a dark page under a light theme) breaks this, and the spec must name it.

## 4 · The battery on the probe (both themes; Chromium gates; Playwright WebKit paint-only)

Capture `out/caps/f2` (build `out/builds/f2`, worktree `@ b37a37c3` + probe, 19 dirty src files). Logs are in `out/caps/f2/results/<id>.log`. The HEAD column is from HARNESS.md §3.

| witness | HEAD | probe | measured on the probe (Chromium) | Playwright WebKit (info) |
|---|---|---|---|---|
| **W-F** field yields | FAIL 66/152 | **PASS 152/152** | Light: c1 L p05 0.893 (dock) to 0.936 (popover); c0.5 0.934-0.962. Dark: c1 L p95 0.306-0.362; c0.5 0.219-0.260. 24 px out, ΔE p95 0.0000 on every surface | The GL arm yields: light c0.5 0.939-0.961; dark c1 0.306-0.362, c0.5 0.219-0.260; 24 px out ΔE 0.0000 |
| **M-5** live dock | FAIL 6/16 | **PASS 16/16** | 0 `getImageData`, 0 `readPixels` in all 8 live windows (9 s each, default and "fed" docks; the prop is gone). Dock M-2 over the field: light c1 fg 4.83 / muted 4.86, c0.5 5.54 / 5.57; dark c1 5.52 / 5.39, c0.5 7.42 / 7.26 | UNMEASURED in Playwright WebKit (GlassDock crashes it) |
| **M-7** halos whole | FAIL 8/8 | **PASS 8/8** | Reference and every host reach 18 px (light) and 17 px (dark) | PASS 8 |
| M-2 text | FAIL 169/560 | FAIL 110/560 | **Green:** light paper, c1, c0.5 and white; dark paper, c1, c0.5 and black: every ladder cell 36/36; dark Dialog 4/4 on all four. **RED:** the light real Dialog (scrim) muted 2.33 (c1) to 2.74 (white); light black 18/36 (fg 1.01), checker and stripes 10/36; dark white, checker and stripes 18/36 (fg 1.03-1.94) | FAIL 126/532 |
| M-1 no grey | FAIL 11/11 | FAIL 2/11 | Every translucent plate and the dock: L 0.981-0.985, ΔE 0.003-0.005 (HEAD 0.039-0.142). RED: opaque `#fdf5ec` L 0.974 (the `--card` fact, HARNESS §3 new reading 2); the real Dialog `#aba7a0` L 0.729, ΔE 0.256 (HEAD `#746f66` 0.441): the thin frost transmits the scrim | same two rows |
| M-6 separable | FAIL 14/19 | FAIL 4/19 | Dark: adjacent 0.010-0.016; from the page, wash 0.054 … overlay 0.106, dock 0.079, Dialog 0.146: **all green** (HEAD 0.002-0.005 and ≤ 0.011). Light over paper: adjacent 0.001-0.003 ✗ (§5.3) | 5 of 18 |
| M-4 dock register | FAIL 14/14 | FAIL 14/14 | Poles gone: fg = muted = `#705942` in light and `#c3b9ac` in dark (HEAD `#000` / `#fff`). ΔL 0: the dock's tab label reads `--muted-foreground` by design (`controls/tab-button.css:47`), and the probe points the dock's muted register at `--on-glass-muted` | — |
| M-3 non-text | FAIL 237/266 | FAIL 230/266 | Untouched rung: light paper perimeter 2.79, ring 2.92-2.94; light c1 perimeter 2.52-2.79; Dialog ring 2.29-2.36 | — |
| M-8 chrome calm | FAIL 8/8 | FAIL 8/8 | Chroma floating 0.0866, overlay 0.0819, Dialog 0.0629 in light; 0.0670-0.0832 in dark; bleed 1.01-1.07 (green half). The stripes are not a substrate | FAIL 8 |
| W-A / W-B / W-C / W-D / W-E | all FAIL | W-A 47/197, W-B 16/24, W-C 288/304, W-D 7/9, W-E 196/360 FAIL | Other families' centres. W-B still fails, because nothing publishes: F reads nothing | — |

**Real Safari: UNMEASURED (owner's safaridriver checkbox)** in every row.

**What this costs** (the common-floor rows excluded):
- **Added:** the registry, 179 lines; the WGSL well, +45; the GLSL well, +42; wiring, +45.
- **Deleted:** 746 sampler lines, plus the clamp, the prop and two tokens.
- **Measured per frame:** +0.02-0.32 ms of GPU at 4 Mpx, and main-thread rect reads under 0.1 ms at p50.

## 5 · Weaknesses, as named counterexamples

1. **C-F1 · Anything that is not a library substrate.** Over black, the light plate's fg reads 1.01 and muted 1.83. Over white, the dark plate's fg reads 1.03. Over prose, muted falls 5.06 → 4.10 (Q3). fourier's glass over papers and canvases and chicago's glass over photos get nothing (Q6).
2. **C-F2 · The modal scrim.** The real light Dialog composites `#aba7a0` (L 0.729) and muted 2.33-2.74. The scrim is library paint between the field and the plate, so the well under it is dimmed before the glass sees it. The cure lies outside F's mechanism. Either the scrim yields under the dialog rect (a second carve, in CSS), or the dialog plate is solved against the scrim's known colour.
3. **C-F3 · One frame of trail.** A JS mover registered after the substrate trails the well by 1.00 frame, 7.5 px at 900 px/s at 120 Hz, and so did a compositor transform animation in one of three runs (Q2). With a hard well this is a leading-edge sliver of unwelled field on every fast morph. D-1's weight and bounce make fast morphs the norm.
4. **C-F4 · Safari's backdrop edge.** The hard well is seamless only because Chromium's backdrop blur stops at the box (Q1). If Safari's blur reads past it, the rim returns, or the outset must grow to about 2σ and spill a halo. Playwright WebKit cannot answer this (no `backdrop-filter`). UNMEASURED (owner's safaridriver checkbox).
5. **C-F5 · The field responds to glass.** The overlap capture (`probe/overlap-light.png`, plates hidden) shows the wells as rose-cream rounded rectangles in the red field: hue kept, with chroma cut to the gamut ceiling at L ≈ 0.9 (§2.3 of the portfolio). Under the plate this reads as a frost carrying the field's hue. Wherever the plate's box and its paint diverge, it reads as a lit rectangle in the field: the dock's clip-path collapse, a plate fading out while its rect persists, and `visibility: hidden` glass (the probe wells it too, which W-F's raw capture relies on).
6. **C-F6 · The software-raster and frame-0 grounds.** The aurora's CSS mode and its placeholder ground paint no shader, so they have no well. Every headless or low-power consumer (value.js resolves to `"css"` on low-power GL, `X.md` §3.1) shows the unwelled field under the glass until F grows a CSS arm.
7. **C-F7 · Consumer-owned substrates.** value.js's atmosphere is `useAurora` on its own canvas, not `<Aurora>`. The well lives in the shared shader, so value.js gets it, but only while its canvas is the one `fieldWellsFor` is called with. The registry's element list is document-wide, so this holds. keyframes' hero runs at a 0.1 ceiling over graph paper, where the well moves a 10% layer (it helps nothing, and costs nothing).
8. **C-F8 · A silent bound.** The 17th glass surface over a canvas gets no well in the probe. A page with a card grid (fourier: 68 `.glass-*` class sites) exceeds 16 intersecting rects easily, so the bound must fail loud (item 6 of §3), or the storage becomes unbounded.
9. **C-F9 · M-1 and M-6 conflict over light paper.** For a ladder mixing one pole at α_wash + n·step, the composite distance from paper is α·D and adjacent levels differ by step·D. M-1 needs α_overlay·D ≤ 0.02, M-6 needs step·D ≥ 0.01, and α_overlay ≥ 4·step, so step·D ≤ 0.005. Measured on the probe: light adjacent 0.001-0.003 with every plate within 0.005 of paper. The conflict belongs to the battery, not to F. It is stated here because F's thin cream frost lands on it first.
10. **C-F10 · The dock's muted register.** Setting the dock's muted ink to the on-glass rung removes the poles, but the inactive tab reads muted (`tab-button.css:47`). M-4's fg run therefore equals its muted run. The one-line fix, pointing the inactive tab at `--dock-fg-on-aurora` (or 78% of it, as `layer-group.css:250` does), is D2's register call. It was not applied.

## 6 · Public API and consumer impact

| surface | change | E-6 addendum owed |
|---|---|---|
| `GlassDock` | The `backgroundCanvas` prop is deleted, with no alias (E-1). `backdropMode: "live" \| "static"` stays; "live" now means "the plate is translucent and the substrate yields". `--glass-backdrop-luma` and `--glass-backdrop-luma-knee` are gone | keyframes: delete `:background-canvas="auroraCanvas"` (`ChromeDock.vue:370`) and its getter (`:200-227`) |
| tokens | New: `--field-well-pole`, `-gain`, `-feather`, `-outset`, `-ambient` (per theme). Changed: `--glass-veil-ink` (light → the `--card` pole; dark → `oklch(0.45 0.03 60)`), and the dark `--glass-veil-base` (.18 → .24). The name `--glass-veil-ink` no longer describes an ink, so the spec renames it `--glass-veil-pole` across its 118 lines in 31 files (E-1) | value.js's e2e reads only `--glass-level` (`a11y-modality-support.spec.ts:201-228`), which is unchanged |
| new public attribute | `data-field-well` opts a non-ladder element into the registry | none |
| substrates | `<Aurora>`, `useAurora`, and (per spec) Blob, Constellation and FourierField gain the well with no consumer code | value.js gets the well on its atmosphere and stops relying on the stamp `data-glass-field-canvas` (`color-picker/App.vue:34`), which becomes dead: its addendum deletes it |
| chicago | Its 0.62 tier floor (`style.css:140-141`) retires only where glass sits over a library substrate. chicago's ground is a CSS `.ground` plus photos (`X.md` §3), so F gives chicago nothing, and the floor stays until another answer lands (Q6) | none from F; the floor-row-6 retirement is blocked for chicago |
| fourier | Its `.glass-opaque` Configurator escape (`VisualizationView.vue:302`) and GLASS-VEIL-GREY honest-RED: the grey is cured over paper by the cream frost (M-1 plates ΔE 0.003-0.005). Glass over prose or canvases is not cured (C-F1) | a partial retirement: the grey rows close, and the legibility rows over prose stay RED |
| keyframes | Its 11 `.glass-*` sites sit over graph paper plus a 0.1 aurora. The cream frost cures the grey, and the well is near-inert at 0.1 | delete the `:background-canvas` binding |
| value.js | O-62 (the grey veil) is cured at the token. The atmosphere wells under its panes. Its CSS-mode atmosphere is not welled (C-F6) | GLASS-VEIL-GREY rows close on the GPU path |

## 7 · Chrome and Playwright WebKit

- **Chromium 149.** Both themes, every field cell welled (W-F green). The WebGPU adapter is present, and the aurora stamps `data-aurora-substrate="webgl"` (a render mode, HARNESS §3 new reading 3). Which backend drew the Chromium field was not read: no context is requested, per the live-π rule. Both arms carry the well, so either way the paint is the well's.
- **Playwright WebKit 26.5.** It has no `navigator.gpu`, so the aurora runs its GLSL arm. W-F's informational WebKit rows show that arm yielding identically (dark c1 0.306-0.362, 24 px out ΔE 0.0000). Its rows are paint-only: no `backdrop-filter`, so Q1's edge question is void there, and no dock (the page crashes on `GlassDock`). Registry rect reads: p95 ≤ 1.0 ms.
- **Real Safari.** UNMEASURED (owner's safaridriver checkbox): the backdrop edge (C-F4), WebGPU `fieldWell` on Safari 26, and the dock.

## 8 · Artefacts (scratch, `…/scratchpad/D3/p1/D3-F-research/`)

- `probe/F-probe.patch`: the whole probe diff.
- `out/builds/f2/dist`: the specimen build.
- `out/caps/f2`: the battery capture, with `results/*.log` and `summary.json`.
- `out/caps/q1`: the feather sweep.
- `out/caps/q5`: the ambient re-tone.
- `probe/lagapp/dist`: the latency and overlap app.
- `probe/overlap-{light,dark}.png`: the wells with the plates hidden.
- `probe/bench/`: the WGSL cost bench, with `well.wgsl` and `well.glsl` extracted from the probe.
- `probe/dbg-raw.png`: the pre-fix capture showing the pill-radius bug.
