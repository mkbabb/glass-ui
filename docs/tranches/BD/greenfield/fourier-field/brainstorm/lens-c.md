# FourierField — GREENFIELD lens-C: **THE TECHNICOLOR EPICYCLE ORCHESTRA**

> Lens: AUDACIOUS 1940s-technicolor FLOW & PUNCH. The viz must read as a *living
> harmonic machine* — a chain of rotating arms hauling a fat glowing comet around a
> path with real WEIGHT, anticipation, follow-through, overlapping action, and bold
> cel-shadow ink — over a WARM colorful field, never grey. Survival of the fittest:
> the math + the GPU twin + the head_t clock + the curated gallery SURVIVE byte-frozen;
> the WEAKNESSES (pale hairline, flat grey stage, no draw, no keyboard, no punch) are
> what this lens re-invents. Reconciles with `BD.W-FOURIER-INTERACT` (the
> capture→resample→DFT→swap loop is the same mechanism — I add the technicolor SKIN).

---

## 0. THE LIVE DELTA-ASSAY (judged on `localhost:5173/substrates/fourier-field`, both modes, canvas + screenshot)

Verified live, not asserted:

- **(1) Coherence — YES, but ANEMIC.** The chain renders correctly: a big pink ring +
  a smaller orange ring stacked tip-to-tail with the radial arm to a comet head, the
  warm comet curve trailing. The math is the canonical epicycle structure and it is
  ALIVE (the `playing` clock advances head_t). BUT the stroke is a **pale hairline**,
  the epicycle rings are **ghost-pink near-invisible**, and against the flat stage it
  reads delicate/academic — NOT "bold, technicolor, alive." The whole-page compositor
  readback sampled **avgRGB ≈ (237,101,101)** — warm amber/red, **zero teal**. Good hue,
  weak presence.
- **(2) Cursor-interactive — PARTIAL.** A velocity-coupled `head_t` scrub + a 2-D
  follow-lean ship (`useFourierField.ts:113-165`, the D6a/D6b fix — cursor MOTION nudges
  the clock, the field leans toward the pointer). This is real and correct. BUT there is
  **NO draw-your-own** (no stroke→DFT→swap) and **NO keyboard** — the host carries
  `tabindex=null`, zero key handlers (verified live). W-FOURIER-INTERACT's headline is
  still vapor on the surface.
- **(3) Vivid/warm + colorful field — HUE YES, FIELD NO.** Warm-amber palette confirmed,
  no teal/navy. BUT the stage is **flat grey-cream** (`ShowcaseFrame tier="quiet"`, wrapper
  `bg: rgba(0,0,0,0)` over a dead grey panel). This is the **SYSTEMIC §3 finding** — the
  glass/viz floats on a flat ground with no colorful field behind it. The viz needs a
  WARM colorful ground it does NOT currently have, and `auroraFallbackGround` is the WRONG
  source (it's the aurora's luminance-faithful ground, blue-cyan-capable — verified
  `aurora/composables/auroraFallbackGround.ts`). A **NEW warm CSS primitive** is owed.
- **(4) Cross-engine + lifecycle — SOLID.** `fourierFieldWGPUSetup` (compute→render twin)
  + `fourierFieldGLSetup` (CPU-steps `partialSumAt` into uniform arrays, same evaluator)
  both ship; the substrate owns pause/PRM/offscreen-park/renderAt. `MAX_PHASORS=64` is a
  hardcoded WGSL `const` in BOTH shaders (truncation is real). KEEP this spine.

**The verdict in one line:** the bones are RIGHT and FIT; the FLESH is thin. This lens
fattens the comet to a glowing technicolor rope, inks the chain with cartoon weight, drops
it onto a warm living field, and finishes the interaction (draw + keyboard) — all on the
SHIPPED engine, zero re-fork.

---

## 1. THE GESTALT — "the epicycle orchestra"

The reference image is a 1940s "Silly Symphony" instrument: each phasor is a brass ring
in a nested orrery, the arms are the connecting rods, and the comet is a fat luminous
bead being hauled around its orbit by the whole machine. You should feel the WEIGHT of
the big low-order rings dragging the small high-order ones; the bead should squash as it
rounds a tight corner and stretch on the straights; the whole machine should cast a bold
offset cartoon shadow onto a warm, breathing, colorful ground.

Three concentric registers, biggest-to-smallest (the golden-ratio depth ladder, §L6):

1. **THE FIELD (back).** A warm colorful ground — radial/conic amber→rose→cream that
   breathes. The §3 fix. The glass/viz reads BECAUSE there is color behind it.
2. **THE MACHINE (mid).** The epicycle chain — bold inked rings + rods + joint-beads,
   rainbow-warm across the spectrum, each ring casting a soft cel-shadow offset opposite
   its travel. The big rings are HEAVY (thick stroke, deep shadow); the small rings are
   light and quick (the overlapping-action lag).
3. **THE COMET (front).** A fat glowing technicolor rope — the partial-sum curve — with a
   blazing squash-and-stretch head bead, an additive bloom, and a long warm trail that
   fades on a soft curve (never to zero).

---

## 2. THE BOLD MOVES (visual + motion, all on the shipped render pass)

### M1 — **THE COMET BECOMES A FAT GLOWING ROPE** (the single biggest punch lever)

The current comet is `trailWidth ≈ 3px, peakAlpha ≈ 0.92` — a hairline. The lens triples
the presence at the DEMO-PRESET level (presets-in-consumers — the `src/` identity stays
frozen):

- **trailWidth → 5-6px** bold rope (the render pass already maps `trailWidthToModel`; just
  a bigger demo-preset value + a small bump to `MAX_CURVE_SAMPLES` budget headroom — 384
  already smooth).
- **A two-tone rope:** a hot saturated core (`--viz-fourier` amber) + a bloomed outer
  halo (additive `ONE / ONE_MINUS_SRC_ALPHA` blend already set in BOTH setups —
  `fourierFieldWGPUSetup.ts:180` + `fourierFieldGLSetup.ts:203`). The halo is the
  technicolor glow; the core is the ink.
- **trailFloor → 0.40-0.45** so the body never thins to a whisper (today 0.34) — the
  reference comet body reads near-uniform-bright, not a fading thread.

These are EXISTING render uniforms (`PEAK_ALPHA`/`TRAIL_FLOOR`/`trailWidth`/`HEAD_GLOW_*`
in both setups). No new shader code — a **DEMO preset** that pushes the magnitudes, the
library default stays calm/byte-frozen (the warm-identity fence).

### M2 — **THE SQUASH-&-STRETCH COMET HEAD** (the cartoon principle, NET-NEW shader math)

The reference's bead should DEFORM with its motion: stretch along the tangent on fast
straights, squash across it on tight corners — real weight. The head dot today is a fixed
round disc (`headDotRadius`). The lens makes it an **anisotropic bead** whose aspect ratio
is driven by the local curve speed:

- The head's velocity is `d/dt partialSumAt` — already computable from two adjacent curve
  samples the compute pass writes (`curveData[0]` vs `curveData[1]`). The shader derives a
  unit tangent + a speed magnitude.
- The head SDF becomes an **ellipse** elongated `(1 + k·speed)` along the tangent and
  squashed `1/(1 + k·speed)` across it — **volume-preserving** (the §L4 squash law: the
  bead keeps its area, it just stretches). `k` is a small bounded demo gain.
- This is ~8 lines added to the head-bead branch of `fourier-field.render.wgsl.ts` (the
  SDF distance is anisotropically scaled before the smoothstep), MIRRORED in the GLSL twin
  + the GL CPU-bead path — the cross-engine parity arm. It is the ONE genuinely-new shader
  math in this lens, and it's the cartoon SIGNATURE.

PRM: under reduce the head freezes at `frozenT` → speed is read at the static frame → a
fixed bead aspect (a static lean is not motion). No live deformation under PRM.

### M3 — **THE CHAIN GETS CARTOON INK + OVERLAPPING-ACTION LAG**

The epicycle rings are ghosts. The lens INKS them (the §"Cartoon shadows" register
elevated onto the viz):

- **Bold ring strokes** (`epicycleWidths.circle → 2.8-3.2`, the demo preset) + **filled
  joint-beads** at each tip (the rods connect through a solid dot — already
  `epicycleRatios`, push the arm/circle alphas to ≈0.6/0.85, off the 0.5/0.72 ghost).
- **A cel-shadow offset per ring:** each ring renders a second, darker, offset copy
  BEHIND it — a flat ink shadow cast opposite the ring's instantaneous travel direction
  (the §"MOVING cast" — the offset slides opposite the motion). Cheap: the render pass
  already loops the chain tips; a second pass at `tip + shadowOffset · (-travelDir)` with
  a dark low-alpha color is ~6 shader lines. This is the 1940s technicolor PUNCH on the
  machine itself.
- **OVERLAPPING ACTION (free, already in the math):** the high-order small rings naturally
  lag and whip behind the big low-order rings as the chain advances — the physics gives
  follow-through for free. The lens just makes it VISIBLE by inking the small rings (today
  they're invisible so the lag is unseen). No code — a presence fix.

PRM: cel-shadow becomes a STATIC offset (no travel), per §L7/§"Cartoon shadows" PRM carve.

### M4 — **THE WARM LIVING FIELD** (the §3 fix — a NEW warm CSS primitive)

The systemic finding: 6 vizzes confirm the pages are FLAT. The fix is a **warm-colourful
ground behind the viz**, NOT `auroraFallbackGround` (blue-cyan). Introduce a new
compositor-only CSS utility:

- **`--viz-warm-field` / `.viz-warm-field`** (new, in `src/styles/`): a layered
  `radial-gradient` + slow `conic-gradient` in the warm band — `--viz-fourier` amber at the
  hot center → `--viz-legendre`-adjacent rose at mid → warm cream at the edge, both modes
  (a dark-arm fork: deep warm-umber center → near-black edge, never grey/teal). A slow
  `@keyframes` hue-drift/scale-breathe (the T11 "living backdrop" register), PRM-static.
  **Compositor-only** (background-position/transform, never re-paint), Safari-safe (plain
  CSS gradients, sRGB interp, no `backdrop-filter:url`).
- This is a **DRY library primitive** (a content-surface affordance, like the dot-flow
  `--content-mask` seam) the fourier DEMO opts the stage into (`ShowcaseFrame` gains a
  `field="warm"` slot or the stage wrapper composes `.viz-warm-field`). It is REUSABLE by
  every flat viz page (the systemic §3 fix lands once, consumed N times — the no-overfit
  law: ≥2 sites by construction).
- The viz canvas composites over it via the additive blend already set, so the comet's
  amber GLOWS against the warm rose field — the technicolor read. The glass edge that §3
  asks for is the `ShowcaseFrame`'s existing rounded-card border (a defined edge over the
  colorful field).

**The library identity palette stays byte-frozen** (`WARM_IDENTITY_PALETTE` untouched);
`--viz-warm-field` is a NEW neutral-warm primitive (hue ∈ [28,90], passes the teal-navy
purge T1 chroma+hue gate by construction). The vivid LIFT (the bold comet preset) is a
DEMO preset — presets-in-consumers, honored.

### M5 — **THE DRAW-YOUR-OWN + KEYBOARD** (reconcile with `BD.W-FOURIER-INTERACT`, NOT a re-spec)

This lens does NOT re-invent the interaction mechanism — `BD.W-FOURIER-INTERACT` already
specs it correctly and I adopt it verbatim:

- `useFourierStroke` (NET-NEW leaf): `pointerdown→pointermove→pointerup` point BUFFER →
  `resampleArcLength(pts, min(N, MAX_PHASORS))` → `onCommit(resampled)` → the SFC runs the
  SHIPPED `dftFromPoints` → a `"drawn"` source joins `activeSpectrum`. (NOT
  `usePointerVelocityField` — that's a single smoothed position, the wrong primitive,
  verified live: it has `smoothedPosition`/`velocity`/`burst`, no point buffer.)
- The transport keymap composes `useKeyboardShortcuts` (verified `src/composables/keyboard/`)
  via the per-viz `useVizKeyboard` leaf (W-VIZ-KEYBOARD): `Space` play/pause, `,`/`.` scrub
  head_t, `[`/`]` change N, `Esc` cancel-draw, `Backspace` clear-drawn. Host gains `tabindex`.

**The lens's CONTRIBUTION to the interaction:** the technicolor PAYOFF of drawing — when
the stroke commits, the chain should **ASSEMBLE the drawn shape with anticipation +
follow-through**: the rings pop in big-to-small with a squish-overshoot (the
`useLiquidFlex`/`--spring-bouncy` register), the comet **bursts** to full brightness then
settles (a one-shot `--dock-accent-flood`-style amber flood, the T4 commit-flood precedent,
PRM-static), and the drawn curve traces ALIVE in glowing rope. Drawing your own path and
watching the orchestra ASSEMBLE it in technicolor is the gestalt headline made bold.

### M6 — **LIQUID-WEIGHT ON THE TRANSPORT** (the universal law)

Every transport gesture carries weight (the binding liquid-weight-universal precept):
- The N-harmonics change is NOT instant — the new ring **springs in** (squish-overshoot,
  `--spring-bouncy`) and the dropped ring **springs out** (squish-collapse, no
  overshoot-past-gone). The head_t flick already has momentum/decay (verified
  `useFourierField.ts:129` — `momentum = pointer.burst * 4.0; momentum *= 0.92^...`); KEEP
  + extend the same iOS-fling settle to the keyboard scrub steps (a `,`/`.` press injects a
  small momentum impulse, not a hard jump — the gooey register).
- The pager/source-swap morphs with goo (the goo-morph triumvirate) — switching
  elliptic→ℱ→heart→star cross-fades the spectra with a brief metaball-bridge, not a hard
  cut (composes the shipped goo-morph, no new filter).

---

## 3. THE MECHANISM (precise, source-verified — grep'd before citing)

| Lever | Where | Status | Action |
|---|---|---|---|
| `partialSumAt`/`positionsAt`/`dftFromPoints`/`makeEllipticSpectrum` | `fourier-field/math.ts:41-201` | EXISTS, 3.04e-15 correct | **BYTE-FROZEN** — consume, never touch |
| comet uniforms `PEAK_ALPHA`/`TRAIL_FLOOR`/`trailWidth`/`HEAD_GLOW_*` | `fourierFieldWGPUSetup.ts:42-45` + `fourierFieldGLSetup.ts:34-36` | EXISTS | bigger via DEMO preset (M1) |
| additive blend `one / one-minus-src-alpha` | both setups (WGPU `:180`, GL `:203`) | EXISTS | the glow channel (M1) — reuse |
| head-bead SDF | `fourier-field.render.wgsl.ts` head branch | EXISTS (round) | +anisotropic squash math (M2), mirror GLSL + GL CPU |
| chain-tip loop | render shader `:133`, GL `:173` | EXISTS | +cel-shadow offset pass (M3), mirror twin |
| `MAX_PHASORS:i32=64` | both `.wgsl.ts` consts | EXISTS | the resample cap (M5), honored |
| `usePointerVelocityField` (`smoothedPosition`/`velocity`/`burst`/`active`) | `motion/usePointerVelocityField.ts` | EXISTS | scrub/lean KEEP; NOT the draw primitive |
| `useKeyboardShortcuts` | `composables/keyboard/` | EXISTS | the keymap host (M5) |
| `useFourierStroke` | — | **NET-NEW** | the draw leaf (M5, per W-FOURIER-INTERACT) |
| `.viz-warm-field` / `--viz-warm-field` | — | **NET-NEW** | the §3 warm ground (M4) |
| `cartoon-surface` / `--shadow-cartoon-md` / `--ease-cartoon-punch` / `--scale-press-*` | `styles/cards.css:178`, `glass.css:26` | EXISTS | the ink register the cel-shadow + commit-flood compose (M3/M5) |
| `--viz-fourier` (oklch .693 .151 28.1) / `--viz-chebyshev` / `--viz-legendre` | `tokens/dark-arm.css:123` + light arm | EXISTS | the warm field + rope hues (M1/M4) |

**Cross-engine (Chrome WGPU + Safari WebGL2):** every shader edit (M2 squash, M3 cel-shadow)
lands in `fourier-field.render.wgsl.ts` AND `fourier-field.glsl` AND the GL CPU bead/chain
step (`fourierFieldGLSetup.ts:159-183`) — the SAME `partialSumAt` evaluator drives both, so
the squash tangent + the cel offset are derived identically. The `.viz-warm-field` is plain
CSS gradients (sRGB, no `filter:url`) — Safari-native. PRM floors carved per move (M2/M3/M4).

**a11y / PRM carve:** drawing is a deliberate gesture → captures + commits under PRM
(reconstruction seats the completed curve in one static frame, the existing head_t freeze);
the chain-assembly anticipation, the squash deformation, the cel-shadow travel, and the
warm-field breathe all DROP to static under `prefers-reduced-motion`. `prefers-contrast:more`
floors the cel-shadow ink UP (legibility asset). Keyboard transport is the non-pointer path
(WCAG); the `DockBackgroundToggle` pause seam (WCAG-2.2.2) survives.

---

## 4. THE DELTA-ASSAY → WAVE AMENDMENT (reconcile vs the 116 union waves; no dup vs dot/goo)

This lens is **NOT a new wave** — it is a TECHNICOLOR-SKIN amendment that rides two
existing waves + adds one shared primitive:

- **AMENDS `BD.W-FOURIER-INTERACT`** (adopt its draw+keyboard mechanism verbatim; ADD the
  M2 squash-head + M3 cel-shadow chain + M5 commit-flood assembly as the *technicolor
  payoff* clauses — the interaction gains its bold visual reward). The gate `proof:fourier-
  interact` F1-F7 stand; ADD a gestalt-row clause: the comet reads as a FAT glowing rope
  (born-RED on the hairline), the head SQUASHES (born-RED on the round disc), the chain is
  INKED with a cel-shadow (born-RED on the ghost rings).
- **CONTRIBUTES the shared `BD.W-VIZ-WARM-FIELD` primitive** (M4) — the systemic §3 fix as
  a REUSABLE `.viz-warm-field` utility consumed by fourier FIRST, then the other 5 flat viz
  pages (the no-overfit ≥2-sites law; this is the single landing of the systemic colorful-
  ground finding). This is the ONE genuinely-new artifact and it is cross-viz, not fourier-
  local — so it is NOT a dup of any per-viz wave; it is the COMMON dependency the dot/goo/
  concentric pages also fold.
- **NO DUP vs the dot/goo vizzes:** the dot-flow rebuild is a density-gradient halftone
  (no epicycles, no comet); the goo-blob is metaball merge (no harmonic chain). The fourier
  comet/chain/rope is structurally distinct. The ONLY shared seam is `.viz-warm-field` —
  which is INTENTIONALLY shared (the systemic fix), not a collision.

**Survival of the fittest verdict:** KEEP the math (byte-frozen), the GPU twin + lifecycle,
the scrub/lean, the curated gallery, the head_t momentum. REFINE the comet to a bold rope +
the chain to inked rings (demo-preset magnitudes + ~14 shader lines for squash+cel-shadow).
RE-INVENT only the FLAT STAGE (→ warm living field) and the MISSING interaction (→ draw +
keyboard, per W-FOURIER-INTERACT). Zero re-fork, zero parallel system, zero legacy.

---

## 5. THE BINDING π (both modes + webkit, default-to-broken)

- **The rope reads:** the comet's painted stroke width + peak luminance measurably exceed
  the HEAD hairline (born-RED on the current 3px/0.92); avg painted hue stays warm
  (∈[28,90], teal-navy purge holds).
- **The head squashes:** at a high-speed straight the head bead's tangent extent > its
  normal extent (anisotropy > 1); at a tight corner it inverts — born-RED on the round disc.
- **The chain is inked:** each ring carries a measurable offset cel-shadow (a dark pixel
  band opposite travel) — born-RED on the ghost rings; `prefers-contrast:more` floors it up.
- **The warm field paints:** the stage behind the canvas samples warm-amber/rose (NOT grey
  `rgba(0,0,0,0)`, NOT teal) — born-RED on the current flat ShowcaseFrame; both modes.
- **The draw assembles in technicolor:** a synthesized `pointerdown→move→up` triangle
  commits → the chain springs in big-to-small with overshoot + a one-shot amber flood →
  the drawn curve traces (Hausdorff-bounded to the stroke). Born-RED (no stroke capture at
  HEAD).
- **Keyboard transport:** `Space`/`,`/`.`/`[`/`]`/`Esc`/`Backspace` drive the same clock +
  N + draw. Born-RED (`tabindex=null`, zero handlers at HEAD).
- **PRM single-paint:** a drawn stroke still commits, seats the completed curve static; no
  squash-deform, no cel-travel, no field-breathe.
- **Cross-engine:** the webkit project paints the rope + squash + cel-shadow on the WebGL2
  GLSL twin matching the WGPU compute path (same `partialSumAt`).

---

## SUMMARY (core idea + boldest move)

**Core idea — "the technicolor epicycle orchestra":** the Fourier viz keeps its correct,
byte-frozen math + GPU twin + clock, but is re-skinned from a pale academic diagram into a
*living 1940s-technicolor machine* — a fat glowing two-tone comet ROPE with a
squash-and-stretch head bead, a chain of BOLD inked epicycle rings each casting a moving
cartoon cel-shadow, all hauled around with real weight + overlapping-action lag over a NEW
warm living color field (the systemic §3 fix as a reusable `.viz-warm-field` primitive,
NOT the blue-cyan `auroraFallbackGround`) — and the interaction is finished per
`BD.W-FOURIER-INTERACT` (draw-your-own stroke→DFT→swap + keyboard transport) with a
technicolor PAYOFF: drawing a path makes the orchestra ASSEMBLE your shape big-to-small with
anticipation, a squish-overshoot, and a one-shot amber commit-flood.

**The single boldest move — THE SQUASH-AND-STRETCH COMET HEAD (M2):** make the comet bead a
volume-preserving anisotropic ellipse driven by the local curve speed (stretch along the
tangent on straights, squash across it on corners) — the ONE genuinely-new shader math
(~8 lines, mirrored across the WGSL/GLSL/GL-CPU twins), turning the dead round dot into a
weighted cartoon bead that physically deforms as the harmonic machine drags it around its
orbit. That single deformation is what converts "correct diagram" into "alive technicolor
character," and it composes the SHIPPED `partialSumAt` evaluator with zero new uniforms and
full cross-engine parity.
