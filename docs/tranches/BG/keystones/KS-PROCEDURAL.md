# KS-PROCEDURAL — the procedural-animation suite as ONE family voice

**Series:** KEYSTONE-PERFECTION KS-A · **Author:** Fable spec author · **Date:** 2026-07-01 ·
**HEAD:** `fa6ed40a` (tranche/BG, RESPEC-GESTALT fold LIVE).
**Binding for the frozen F9 wave ids:** `6.1 W-VIZ-RESIZE-ADOPT` · `6.3 W-VIZ-DEMIGRATE` (6.3+6.7 ATOMIC) ·
`6.4 W-VIZ-REVEAL-BLOOM` · `6.5 W-VIZ-PREVIEW-LIVE` · `6.6 W-DOTFLOW-REBUILD` (+advection) ·
`6.8 W-GOODOT-SETUP-SPLIT` · `6.9 W-BLOB-KINEMATICS-LEAF` · `W-AUR-METAL-FINISH` (plan alias 6.10) ·
`W-AUR-IMAGE-SOURCE` (plan alias 6.11).
**Feeders (read in full, built on):** `research/PROCEDURAL-sota.md` + `research/PROCEDURAL-corpus.md`.
**Fences honored:** this file is the ONLY write. The SYNTHESIS-PASS1 §4 protected set is inviolable. The wave
SET is frozen — everything this spec wants beyond the nine rows is a §7 fold-candidate note, never a
self-inserted row. Every corpus claim cites file:line; every SOTA reference is named in §2.

---

## §1 · The hallmark delineated

The procedural suite is the thing a stranger would screenshot first: **a family of living, warm,
mathematical fields that the glass refracts.** Not a particles.js sprinkle, not a looping video, not a
theme's decoration — ten members (`src/components/custom/PROCEDURAL-SUITE.md:11-24`: aurora · goo-blob ·
dot-flow-field · goo-dot-matrix · dot-matrix · concentric · paper-grid · fourier-field · constellation ·
watercolor-dot) that speak with ONE voice. The identity, stated as the five recognitions:

1. **Real, cited math — never arbitrary noise.** Tessendorf/Gerstner sum-of-sines, Bridson divergence-free
   curl (`∇⊥ψ`), Vogel golden-angle phyllotaxis, Kyprianidis anisotropic Kuwahara, DFT epicycles, IQ domain
   warp. The φ identity is IN the math (the 137.507° golden angle; the √φ-laddered flow anchors at
   `dot-flow-field/constants.ts:35-39`), not painted on.
2. **Warm everywhere, ambient by design.** Every library DEFAULT palette is the warm-cream identity
   (goo-blob `paletteStops` `types.ts:353`; aurora's warm-vivid 45-70° default `presets.ts:308+`; dotflow's
   `WARM_IDENTITY_PALETTE`). Technicolor punch exists — as a DEMO preset (`FLOW_PRESET_AURORA_CURRENT`,
   `demo/stories/substrates/presets.ts:83`), never a library token. The field is atmosphere a glass plate
   drinks; it recedes behind content (`opacity-ceiling`, content-mask) and never demands attention.
3. **One engine, one leaf, no forks.** ONE `createCanvasLifecycle` under three thin backends
   (WebGPU/WebGL2/Canvas2D), ONE feature-detect picker (`useGpuSubstrate`), ONE color-math source per
   backend pair (`procedural-color.{glsl,wgsl}.ts`, byte-identical numerics), ONE pointer-physics field
   (`usePointerVelocityField` — event-fed, frame-ticked, no second rAF).
4. **The right tool per viz, honestly recorded.** WebGPU where the particle math earns it, Canvas2D where a
   few dozen `ctx.stroke` phasors are the right tool, SVG where no drawing context is owed — each verdict
   written down WITH its reverse-trigger (SUITE §migration table). Substrate honesty IS part of the voice.
5. **Battery-respecting by construction.** Demand-driven rendering, offscreen-park, live-PRM
   one-static-frame-then-park, WCAG-2.2.2 pause — a parked field attaches ZERO frames. The field is alive
   when watched and silent when not; that restraint is the 2026 award-craft signature, not a compromise.

The F9 family gate pair is `proof:viz` (the growing family gate — each wave lands an ARM, never a new
singleton) + `proof:gpu-substrate-single` (the substrate-single/parity lock). The interactive response is
the SURPASS over every reference: a video cannot bend around your finger; this family can, parked-when-
hidden, on both engines.

---

## §2 · SOTA grounding (the research is the authority; this section binds it)

The lane's two research reports are the SOTA half of this keystone and are incorporated by reference —
`research/PROCEDURAL-sota.md` (the named 2026 references + per-technique ADOPT/REJECT ledger §9 + the
calibration table §7) and `research/PROCEDURAL-corpus.md` (the disk-true per-viz state + the settled
decisions §2 + the exact demigrate scope §3). The load-bearing anchors, named:

- **Ambient/restraint movement** — Index.dev + Muzli 2026 trend reports; School of Motion / Awwwards
  WebGL craft consensus ("restraint and polish over pyrotechnics"). The suite's discipline IS this center.
- **Curl-noise + GPGPU trails** — Bridson 2007; Emil Dziewanowski "Dissecting Curl Noise"; the
  state-texture ping-pong particle pipeline (ostefani.dev advection; three.js GPGPU showcases). ADOPT — 6.6.
- **Anisotropic Kuwahara** — Kyprianidis/Kang/Döllner 2010 + Papari soft-sector; Maxime Heckel "Painterly
  Shaders". Shipped at `uMedium 7`; the single-pass-because-procedural insight is a genuine advance.
- **Real-time metal** — the two-term microfacet game (anisotropic streak × `N·H` crest); Enterprise-PBR
  2025x / OpenPBR layering; Belcour thin-film (REJECTED for BG → §7). ADOPT — W-AUR-METAL-FINISH.
- **Texture upload cross-engine hazard** — NameOcean WebGL/WebGPU image loading; Toji.dev WebGPU textures;
  gpuweb #4356 blank-result hazard. ADOPT with the capture-pair parity law — W-AUR-IMAGE-SOURCE.
- **Canvas2D↔WebGL crossover** — semisignal / 2dgraphs / Demyanov: Canvas2D under ~a few hundred elements
  (+~15ms vs ~40ms context load); WebGL categorical above ~1k particles. THE demigrate authority — 6.3.
- **Demand-driven rendering** — MDN Page Visibility / rAF throttling. The corpus one-leaf discipline is
  stronger than the per-viz re-implementations the literature shows. No change owed.

**The ONE correction this keystone makes to the SOTA report — itself disk-corrected (crit M1).** The
report's flag #2 ("`preserveDrawingBuffer:false` is STILL LIVE — readback born-unmeasurable, fix it at the
substrate as R0") is answered in TWO halves, both disk-true:

- **The live default is DELIBERATE and stays.** `BD.W-SUBSTRATE-SIZE-UNIFY` landed the readback DOCTRINE at
  `useGpuSubstrate.ts:44-53` — live consumers keep `preserveDrawingBuffer:false` (the all-zero live
  `readPixels` is a FEATURE: it avoids WebKit's always-allocated readback buffer); a live π reads pixels
  via the COMPOSITOR (`locator.screenshot()`). NO wave flips the live default.
- **But the substrate comment OVERCLAIMS — the "exact-pixel capture read" it names is folklore.**
  `captureFrame(timeSec)` does NOT exist (its sole occurrence is the comment at `useGpuSubstrate.ts:51`;
  the real handle method is `renderAt(timeSec)` — `useGpuSubstrate.ts:164,390-392`), and `useGpuSubstrate`
  NEVER sets `preserveDrawingBuffer` (grep under `src/composables/glass/` → the two comment lines only).
  The capture-mode auto-flip is implemented ONLY in aurora's OWN imperative core
  (`aurora/composables/runtime.ts:120-125,165,254` — `shouldPreserveDrawingBuffer` inside `createAurora`),
  while the non-aurora viz hardcode `false` (`useGooDotMatrix.ts:471`, `useMetaballRenderer.ts:337`).

So the binding read path, stated exactly: **the deterministic-pixel read for EVERY F9 floor is
`mode:"capture"` (renderAt-only, no auto-loop — `useGpuSubstrate.ts:78-79`) + `renderAt(t)` at the fixed
signature time + the COMPOSITOR screenshot (`locator.screenshot()` + pngjs — the implemented, gate-proven
goo-blob precedent, `goo-blob/RESEARCH.md:194`).** The compositor holds the presented frame after
`renderAt`, so `preserveDrawingBuffer` is irrelevant on this path — every named floor (litFrac ·
meanChroma · orientation-coherence · meanByte · localContrast · ΔE pair) is a PNG statistic. Aurora ALONE
additionally owns a true in-page exact-pixel read via its runtime-local capture flip. If a future floor
genuinely needs in-page pixels on a non-aurora viz, the correctly-scoped move is the feeders' R0 confined
to capture mode (plumb the flip through `useGpuSubstrate`) — no F9 floor needs it. This is family law L8
(§3.0) and it binds every per-wave π below; 6.1 carries the substrate-comment reconcile (§4.1-5) so the
phantom `captureFrame` cannot mislead a build agent again.

---

## §3 · First-principles design — the family laws + the three mandated greenfield loops

### §3.0 The FAMILY LAWS (stated ONCE; every wave in §4 binds them by number)

- **L1 — ONE lifecycle leaf.** `createCanvasLifecycle` owns scheduling/park/PRM; the three backends are thin;
  a wave re-implements ZERO scheduling (`PROCEDURAL-SUITE.md:28-30`; protected set §4).
- **L2 — one GL context per route.** A story self-stages ONE live context; previews and thumbnails are
  one-shot captures, never N live contexts (SUITE:40-41).
- **L3 — PRM one-static-frame-then-park + WCAG-2.2.2 pause.** The live matchMedia re-monitor; the pause
  control is `v-model:paused`/`DockBackgroundToggle`; a trail/feedback buffer PRM-freezes as a HELD composite
  (a rich still, never a blank); `pointer.tick(0)` deterministic freeze.
- **L4 — consumer-owned DPR policy through the ONE leaf sizer.** The viz declares `dprPolicy`
  (`useGpuSubstrate.ts:97`); the leaf owns measurement + sizes SYNCHRONOUSLY at mount (`presize`, `:160,346`);
  backing == `round(gBCR × dpr)`. Self-measuring per-viz `resize()` is the retired anti-pattern.
- **L5 — warm identity default; presets-in-consumers.** Every library default palette is warm-cream/warm-
  amber; the teal-navy purge HOLDS (`proof:viz-dotflow` F5, `proof-viz-dotflow.mjs:260-280`); technicolor
  ramps and themed presets live in `demo/` or the consumer, never a library token.
- **L6 — ONE pointer-physics field.** `usePointerVelocityField` (position event-driven, velocity/accel
  derived in `tick(deltaMs)` from the renderer's OWN frame) is the sole pointer-dynamics reader; no viz
  mounts a second rAF or a private velocity sampler.
- **L7 — ONE color source + the parity bar.** `procedural-color.{glsl,wgsl}.ts` byte-identical numerics; the
  paired-engine parity bar is mean OKLab ΔE ≤ 2.0 / p99 ≤ 5.0 (`gpu-parity-table.md`; protected set §4).
- **L8 — the capture-read contract (§2 correction, disk-exact).** Gates/π read pixels via `mode:"capture"`
  (renderAt-only) + `renderAt(timeSec)` at the fixed signature time + the COMPOSITOR screenshot
  (`locator.screenshot()` + pngjs — the goo-blob precedent, `goo-blob/RESEARCH.md:194`); aurora ALONE adds
  a true in-page exact-pixel read via its runtime-local capture flip (`runtime.ts:120-125` — NOT a
  `useGpuSubstrate` contract; `captureFrame` does not exist, the real method is `renderAt`,
  `useGpuSubstrate.ts:164,390-392`). The live default stays `preserveDrawingBuffer:false`
  (`useGpuSubstrate.ts:44-53`). No wave flips it.
- **L9 — compositor-only, WebKit-safe.** No `backdrop-filter:url()` legs, no dynamic shader loop bounds
  (fixed tap counts), no layout-property animation; host-level motion rides `transform`/`opacity`/`filter`
  (`proof:no-layout-animation` floor).
- **L10 — the right-tool substrate rule is a standing PREDICATE.** Canvas2D under ~a few hundred stroked
  elements; GPU above ~1k particles/per-pixel fields (§2 crossover). The demigrate executes it now; its own
  REVERSE (`W-FOURIER-GPU`/`W-CONSTELLATION-GPU`, SUITE:98-101) re-triggers by the SAME rule. Symmetric,
  principled, recorded.
- **L11 — the GL fences.** Grep-locked shader bodies stay in their locked files (e.g. `mediumKuwahara` is
  grep-locked to `mediums.glsl.ts` by `proof:aur-kuwahara`); byte-untouched defaults are gate-asserted
  (`medium:"smooth"` byte-identity; the dotflow `cs_field` evaluator freeze under `proof:viz-dotflow` F1).

### §3.1 Greenfield loop A — the dotflow ADVECTION register (the Canvas2D-vs-WebGL2 decision axis)

**The contested question.** How does a LIVING flow field (dense motes, ribbons of light, cursor vortex)
render on the two real engines — and why does dotflow stay GPU while fourier/constellation demigrate in the
same tranche?

**Direction 1 — Canvas2D CPU advection.** Advect ~1-2k particles on the CPU, draw `arc()` motes + a
`globalAlpha` fade-rect trail. *Pro:* the demigrate direction applied uniformly; ~15ms load; trivially
measurable. *Con:* the reference gestalt needs 8-12k motes to read as a continuous current — Canvas2D's
practical ceiling is ~1k (the §2 crossover); the fade-rect trail muddies to gray (no additive float
blending); the family's boldest surface would ship at a tenth of its density.

**Direction 2 — fragment-space LIC/flow-visualization (no particles).** Render the flow as a screen-space
line-integral-convolution or advected-noise fragment pass. *Pro:* single fullscreen pass, both engines
trivially. *Con:* it reads as smeared noise, not MOTES — the reference is discrete particles trailing light;
LIC kills the per-mote squash/velocity-hue/lifetime vocabulary and the cursor-vortex legibility.

**Direction 3 — GPGPU state-texture particles + two-FBO trail feedback (WGPU compute primary; WebGL2
state-texture EQUAL-GESTALT fallback).** Particle state in a storage buffer (WGPU) / an `RGBA32F` texture
ping-pong advected in a fragment pass (WebGL2); the trail is an `RGBA16F` render-target pair — decay-blit
prev→cur at α, then motes draw additive (`ONE,ONE`); velocity-keyed hue through the ONE
`samplePaletteLin` OKLab seam.

**GOLDEN: Direction 3** — and it is spike-proven AND now substantially ON DISK. The BD GOLDEN's live spike
ran the full `MAX_PARTICLES 16384` at 60fps on the Safari-real WebGL2 path (`litFrac 0.231` · `meanChroma
20.2` · `frameDelta 10.30`, `greenfield/dot-flow-field/GOLDEN.md:311-333`); BD impl P5 (`a5f184cd`) landed
the register: the dual-mode compute kernel (`cs_field` anchored evaluator + `cs_flow` momentum-integrated
advection, `shaders/flow-field.compute.wgsl.ts:214,238,281-283`), the WebGL2 state-texture flow path
(`composables/flowSetupGLFlow.ts`, 327L), the √φ-anchored config (`constants.ts:35-39` — `vortexRadius=r₀`,
`bloomRadius=r₀·√φ`, `trailHalfLife=τ₀`, `lifetimeSec=τ₀·φ`), `DEFAULT_FLOW_CONFIG.mode="flow"` with
`particleCount: 12000` (`constants.ts:166-167`), and the demo lead preset (`FLOW_PRESET_AURORA_CURRENT`).

**The Canvas2D-vs-WebGL2 axis, resolved as ONE rule (L10):** dotflow is a *particle-population* viz — the
one class where GPU categorically wins (12k motes vs the ~1k Canvas2D ceiling) — so it keeps the GPU dual
path; fourier (a few dozen phasors + one stroked path) and constellation (tens-to-low-hundreds of
nodes/edges) sit squarely on Canvas2D's side of the SAME rule and demigrate (6.3). One predicate, both
directions, no per-viz vibes.

**Self-challenge.**
- *Two modes on one component is a fork risk.* Answered: the dock `dim`-idiom — ONE schema, mode-scoped
  lever sets; `cs_field` is byte-fenced under `proof:viz-dotflow` F1 (the gate greps the
  no-advection/no-reseed witness WITHIN the `cs_field` brace-span, `proof-viz-dotflow.mjs:106-134`); `cs_flow`
  is the carved-out NEW integrator. No fork; the fence already encodes the split.
- *A 120Hz display fades trails twice as fast (the SOTA report's correctness flag #14).* Answered in TWO
  halves: the DERIVATION is already DRY on disk — `flowTrailDecay(halfLifeSec, dtRef = 1/60)` derives α
  from a half-life (`constants.ts:48-52`, `α = 2^(−dtRef/halfLife)`) — but both setup paths currently call
  it ONE-ARG, riding the fixed 60fps `dtRef` default (`flowSetupGLFlow.ts:253`, `flowSetupWGPU.ts:347`). **6.6 carries the live-dt requirement:
  the decay uniform is recomputed per frame from the measured `dt` (`α(dt) = 2^(−dt/halfLife)`) — the frame
  loop already measures a clamped `dt` (`flowSetupGLFlow.ts:195`), so this is a one-line re-point per setup,
  not a mechanism change.** A 120Hz trail then holds the SAME half-life as a 60Hz one.
- *The WebGL2 gestalt could silently diverge from WGPU (two integrators).* Answered: both transcribe the ONE
  JS math source (`composables/flowField.ts` `sampleVelocity`, JS+WGSL+GLSL twins) and the paired-engine π
  (R6 below) reads both through the L8 read (capture-mode `renderAt(t)` + compositor screenshot) at fixed `t`.
- *Readback measurability on the fallback path.* Answered by L8 — capture-mode `renderAt(t)` + the
  compositor screenshot (the WebGL2 leg never flips `preserveDrawingBuffer`; every floor is a PNG
  statistic), not a live-default flip.

**Final form:** the 6.6 wave spec in §4.5 — the register is BUILT; BG's work is the live-dt decay
correctness, the calibration floors, the gate-arm completion, and the paint-verified both-engine close.
(Convergence note, crit m5: loop A is RATIFICATION of a BD-landed GOLDEN, recorded honestly — the
generative loops in this keystone are B and C.)

### §3.2 Greenfield loop B — the aurora METAL as a MEDIUM (`uMedium 8/9`, mutually-exclusive ladder)

**The contested question.** What mechanism makes a procedural field read as LIQUID METAL on both engines —
and where does it sit in aurora's taxonomy?

**Direction 1 — thin-film iridescence.** A wave-optics layer (Belcour; OpenPBR 2025) over the field: a
viewing-angle-keyed hue shift. *Pro:* the "real" physical iridescence. *Con:* the fullscreen procedural
field has no meaningful view vector `V` (no depth); a rainbow hue-shift fights the warm-cream fence
frontally; it is a second bold swing the asks don't need. **REJECT → booked successor (§7-3).**
- **Direction 2 — ramp-based metal (matcap/gradient-remap LUT).** Remap field luma through a "metallic"
  gradient LUT (dark-warm → bright-cream), maybe add a static sheen band. *Pro:* trivial, cheap, ports
  anywhere. *Con:* it is a TINT, not a RELIGHT — no fold, no crest/valley structure, fails the measurable
  "metal FOLDS" bar by construction (a remap cannot raise local crest-valley contrast above the smooth
  field's own). This is the "tinted orientation map" failure mode named in the GOLDEN. **REJECT.**
- **Direction 3 — the two-term anisotropic BRDF folded from the engine's DISCARDED gradient.**
  `structureTensorField` already Sobel-samples luma, forms `(Gx,Gy)`, eigen-decomposes, and **throws the
  gradient away** (`mediums.glsl.ts:89` `return vec3(dir, A)`; the WGSL twin discard
  `aurora-mediums.wgsl.ts:76`). Widen the return to `vec4(dir, A, packGrad)` — ZERO new taps — and relight:
  `streak = pow(sinTH, ANISO)` (the highlight runs ALONG the tensor tangent — brushed-metal WHERE) ×
  `crest = pow(N·H, CREST)` (the height-field specular off `N = normalize(vec3(grad·HEIGHT_SCALE, 1))` —
  polished BRIGHTNESS), gated by `smoothstep(0, COHERENCE_FLOOR, A)` (no phantom banding in structureless
  zones), over a technicolor-DR valley base (deep warm-shadow valleys, near-white crests), with an
  ACHROMATIC-WARM catch (`METAL_CATCH_WARM ≈ vec3(1.0, 0.97, 0.90)` — the existing
  `AURORA_CATCH_LIGHT_ANCHOR`, `uniformBridge.ts:106`).

**GOLDEN: Direction 3.** Spike-proven (WebGL2 gate GREEN: smooth localContrast 0.0011 → metal 0.0267,
metal-gradient 0.0302 — **25× fold**, `greenfield/aurora/GOLDEN.md:61-66`). Both BRDF terms are REQUIRED:
streak-only reads as a tinted orientation map, crest-only as plastic. The deftness is the identity move —
the metal is built from math the engine already computes and discards; the opposite of contrived.

**The taxonomy reconcile (the frozen plan AMENDS the BD GOLDEN — this spec ratifies the plan).** The BD
GOLDEN proposed a `finish:{none,kuwahara,metal,metal-gradient}` axis (kuwahara re-classed a finish). The
frozen row is explicit the other way: *"metal as a MEDIUM (uMedium 8/9, mutually-exclusive ladder, **NOT a
finish**"* (`AMENDED-GESTALT-PLAN.md` F9 row 6.10; `EXECUTION-PROGRESS.md:112`). **The plan wins.** Metal
lands as TWO NEW MEDIUMS on the EXISTING mutually-exclusive `uMedium` dispatch — `metal: 8` and
`metal-gradient: 9` (`MEDIUM_ID` stops at `kuwahara: 7`, `uniformBridge.ts:43-56`; the `AuroraMedium` union
stops at `"kuwahara"`, `presets.ts:61-76`). No `finish` axis lands in BG; kuwahara STAYS medium 7; a config
is exactly one medium at a time. Rationale beyond "frozen": the finish×medium product space (7 mediums × 4
finishes = 28 permutations) is untestable surface for zero asks — every named ask is reachable as a medium
value; the orthogonal-axis generalization re-enters only WITH a consumer that needs `kuwahara×metal`
composition (none exists).

**Self-challenge.**
- *Does a mutually-exclusive metal lose the "metal over oil" composition?* Yes, deliberately — no ask needs
  it; the ladder stays total over `MEDIUM_ID` (`mediumFor` is exhaustively typed, `uniformBridge.ts:132-136`).
- *WGSL invisibility.* The load-bearing cross-engine catch stands: `uLightDir` exists on the `.frag` but is
  ABSENT from the WGSL uniform struct; `uCursor` IS in-struct (off 64, `uniformBridgeWGPU.ts:17,62`). The
  light MUST be cursor-z-synthesized in-shader (`normalize(vec3(uCursor − p, METAL_LIGHT_Z))`, idle → a
  static upper-right rake) and metal MUST dual-port (a GLSL body + a WGSL body — a frag-only metal is
  invisible on the WGSL primary of BOTH browsers). Unlike kuwahara's degrade-to-smooth WGSL posture, metal
  ships BOTH bodies at birth.
- *Does the return-widening break kuwahara?* No — `.xy/.z` callers are byte-unchanged by construction; the
  gate asserts it (§4.7). `mediumKuwahara` stays grep-locked in place (L11).
- *Warm-fence risk.* The catch-light is achromatic-warm (never a blue-white chrome); the field hue tints the
  BODY; the valley term deepens toward warm shadow. Confirmed ADOPT per SOTA report verdict #5.
- *Twinkle boil.* metal-gradient's sparkle is twinkle-IN-PLACE: a `highp` per-cell hash seed (mediump boils
  cross-backend), PHASE-animated, position FIXED, gated on facing — a metallic flake, never noise-boil.

**Final form:** the W-AUR-METAL-FINISH wave spec in §4.7.

### §3.3 Greenfield loop C — the image-source pipeline (shared with `BD.W-DOT-IMAGE`)

**The contested question.** How does a photo enter a dual-engine shader family without forking a component,
diverging across engines, or breaking the single-pass substrate invariant?

**Direction 1 — per-viz ad-hoc uploads.** Each image-consuming viz calls `texImage2D`/
`copyExternalImageToTexture` with whatever defaults. *Pro:* smallest first diff. *Con:* the ONE genuine
cross-engine hazard (WebGL2 vs WebGPU premultiply/colorspace/flipY defaults DIFFER — gpuweb #4356; Safari's
`copyExternalImageToTexture(ImageBitmap)` history) then bites per-site, invisibly, and the ≥2-consumer seam
(aurora-image + dot-image) is squandered.

**Direction 2 — a DOM-composited blurred `<img>` behind the canvas.** Skip the texture entirely; blur in
CSS. *Pro:* zero shader work. *Con:* the blur cannot be zone-modulated by the drifting `nucleiField` (the
whole point — a photo dissolving INTO the aurora's own drift); it adds a second composited layer under a
transmissive glass stack (the WebKit re-blur trap adjacency); it is a `<BlurredImage>` fork in disguise.

**Direction 3 — ONE shared texture-upload primitive + in-shader bounded zone-blur + a build-time program
permutation.** Normalize at decode — `createImageBitmap(blob, {premultiplyAlpha:"none",
colorSpaceConversion:"none"})` — then declare the SAME flags explicitly on both uploads (WebGL2
`pixelStorei(UNPACK_PREMULTIPLY_ALPHA_WEBGL,false)` + `UNPACK_COLORSPACE_CONVERSION_WEBGL,NONE` +
`UNPACK_FLIP_Y_WEBGL,false`; WebGPU `copyExternalImageToTexture({premultipliedAlpha:false})`). The blur is a
FIXED-tap in-shader kernel (3 rings × 8 = 24 taps — the kuwahara-proven budget; no dynamic loop bound, no
FBO ping-pong, no `backdrop-filter:url`), radius modulated per-fragment by the SAME drifting `nucleiField`.
`source:"palette"|"image"` selects a SEPARATE shader program at construction (the BD.W-DOT-IMAGE B1
discipline) — never a per-fragment `if(uSource)` god-branch.

**GOLDEN: Direction 3.** It is `<Aurora source="image" :src>` — a color-stage swap on the existing engine
(substrate/lifecycle/drift/configurator REUSED), not a component. The vividness floor applies
source-agnostically (it operates on the final `col`, `aurora.wgsl.ts:281-286` — a washed-out photo blooms to
transmission-fit). Disk truth: NO upload primitive exists anywhere in `src/` at HEAD (grep
`copyExternalImageToTexture|createImageBitmap` → 0) and `BD.W-DOT-IMAGE` has not landed — **so
W-AUR-IMAGE-SOURCE BUILDS the shared seam and dot-image CONSUMES it** (the first-to-land-builds contract,
`EXECUTION-PROGRESS.md:113`).

**Self-challenge.**
- *A name-presence parity gate false-greens on a blank WebKit texture (the gpuweb #4356 class).* Answered:
  the parity gate is a REAL rendered-capture-pair (chromium-WGSL vs webkit-WGSL of the same decoded image,
  OKLab ΔE under the L7 bar), through the L8 read (capture-mode `renderAt(t)` + the compositor screenshot).
  Pinned as the gate's binding clause.
- *Is 24 taps enough for a "dramatically dissolved" zone?* The kernel radius (not count) carries the
  dissolve — `mix(BLUR_MIN, BLUR_MAX, zone)` with a large `BLUR_MAX` over 24 stratified taps reads as a
  heavy bokeh dissolve at field scale (the aurora is a backdrop, not a photo viewer); the kuwahara precedent
  proves the budget. A tap-count escalation is a calibration lever, never a loop-bound change.
- *Asset creep.* The macro-flower ARRAY is consumer/demo assets (presets-in-consumers); the library ships
  the axis only.

**Final form:** the W-AUR-IMAGE-SOURCE wave spec in §4.8.

---

## §4 · Wave binding — the nine perfected wave specs

Sequencing note (from the frozen preconds): 6.1 → 6.3 (6.3 preconds 6.1); 10.5 → 6.4; the rest are
order-free within F9. Every [P] wave closes at its OWN non-authoring paint close (the terminal funnel is
abolished, `EXECUTION-PROGRESS.md:33`): BOTH modes, BOTH engines where dual, a filed Fable gestalt PASS over
its `designSyncSurface` (F8.3 law), + its §6 family-voice verdict. The [H] carves are device-free
byte-identical drains — no Fable arm.

### §4.1 · 6.1 `BG.W-VIZ-RESIZE-ADOPT` [P] — every viz sizes to its box, upload-only

**Disk truth (the row is ADOPT, not mint).** The BD.W-SUBSTRATE-SIZE-UNIFY sizer EXISTS at the leaf —
`dprPolicy?` (`useGpuSubstrate.ts:97`), synchronous `presize` at mount (`:160,346`) — and adoption across
the 9 canvas-bearing viz is **ZERO** (grep `dprPolicy` under `src/components/custom/` → 0 files).

**Deliverables.**
1. Thread `dprPolicy` through all NINE canvas-bearing viz (aurora · goo-blob · dot-flow-field ·
   goo-dot-matrix · dot-matrix · concentric · paper-grid · fourier-field · constellation; watercolor-dot
   mounts no context — permanently out), each viz declaring its policy (flat multiplier or box-aware
   resolver — e.g. aurora keeps its sub-2×-DPR wash cap as its POLICY value; the LEAF owns the measurement).
   Files: each `use<Viz>.ts` composable's substrate-options site (e.g.
   `aurora/composables/useAurora.ts`, `goo-blob/composables/useMetaballRenderer.ts`,
   `dot-flow-field/composables/useDotFlowField.ts`, `goo-dot-matrix/composables/useGooDotMatrix.ts`, …).
2. DELETE the per-viz self-measuring `resize()` legs the sizer supersedes (clean break, no dual path —
   `grep "clientWidth ||" → 0` across the 9 dirs).
3. The backing-store law: `canvas.width/height == round(getBoundingClientRect × dpr)` at mount AND after a
   box change — no 300×150 intrinsic default, no 1px floor collapse, no CSS-upscaled soup.
4. For fourier/constellation this wave adopts on their CURRENT substrate; 6.3 carries the policy over to
   `useCanvas2D` (which composes the same leaf) — the adoption survives the demigrate by construction.
5. The substrate-comment reconcile (the §2/L8 correction — a ~4-line comment edit, zero behavior):
   rewrite `useGpuSubstrate.ts:44-53` to name the REAL read (`mode:"capture"` + `renderAt(timeSec)` + the
   compositor screenshot) and scope the auto-flip claim to aurora's `runtime.ts:120-125` — the phantom
   `captureFrame` folklore dies at its source.

**Gate arm.** `proof:viz` · `viz-resize-upload-only`: (a) `grep dprPolicy ≥ 9` across the viz dirs; (b) zero
self-measuring resize (`grep "clientWidth ||" == 0`); (c) the backing==round(gBCR×dpr) assert (headless,
per-viz mount at 2 viewport sizes + a DPR override); + a self-test bite (a planted self-measuring leg REDs).

**π (binding, L8).** The discriminating SPA-nav probe: navigate INTO each viz route (Chrome AND Safari),
per-viz compositor-screenshot `meanByte > floor` (the L8 read; a black/collapsed canvas REDs); the offscreen-park witness
(`suspend('off-screen-io')` fires when scrolled out). Fable arm: "every viz sizes to its box — crisp at
every DPR, no letterbox, no stretch." DesignSync surface: `/substrates` viz gallery.

**Delta vs the folded row.** Names the exact 9 adoption sites + the ADOPT-not-mint disk fact + the
demigrate-survival clause (4) + the substrate-comment reconcile (5) + the L8 compositor-read form of the π.

### §4.2 · 6.3 `BG.W-VIZ-DEMIGRATE` [P] — the ATOMIC de-migration (6.3+6.7 merged)

**The decision is SETTLED — do not re-litigate** (corpus §2.1): the BG plan amends the BD-era
`no-fallback-policy.md` for exactly two viz; fourier-field + constellation return to Canvas2D (their own
READMEs' verdict — `fourier-field/README.md:217-226`, `constellation/README.md:5,12,48`; the SUITE table
already records Canvas2D — the doc leads the code, this wave makes the code catch up). L10 is the authority.

**Deliverables (ONE atomic diff — source + gates co-move; no transient-RED window).**

*Swap 1 — fourier-field + constellation → `useCanvas2D` (keys PRESERVED).*
- DELETE (fourier, ~1,445 LOC): `shaders/fourier-field.compute.wgsl.ts` (100) ·
  `shaders/fourier-field.render.wgsl.ts` (280) · `shaders/fourier-field.glsl.ts` (228) ·
  `composables/fourierFieldWGPUSetup.ts` (339) · `composables/uniformBridgeWGPU.ts` (240) ·
  `composables/fourierFieldGLSetup.ts` (258). KEEP `math.ts` (GPU-agnostic DFT) — it feeds the new Canvas2D
  `ctx.stroke` renderer (epicycle phasors + the reconstructed closed curve) over `useCanvas2D`
  (`src/composables/glass/canvas2d/useCanvas2D.ts`), `dprPolicy` carried over (§4.1-4).
- DELETE (constellation, ~1,066 LOC): `shaders/constellation-{lines,points}.wgsl.ts` (115+97) ·
  `shaders/constellation-{lines,points}.glsl.ts` (94+75) · `composables/constellationWGPUSetup.ts` (267) ·
  `composables/uniformBridgeWGPU.ts` (196) · `composables/constellationGLSetup.ts` (222). KEEP the field
  math (`createConstellationField.ts`, `constellationField.ts`, `constellationRender.ts` incl.
  `readPalette`/`kVisOf`) — it feeds the Canvas2D node/edge loop.
- Keys `/fourier-field` + `/constellation` PRESERVED — a VISUAL re-baseline, NOT an import re-point; no
  by-name cross-repo ask owed (consumers: slides ×4/×2 + atlas ×1, re-approve fallback-first).

*Swap 2 — the folded 6.7 substrate-delete (concentric + paper-grid).*
- DELETE ONLY the `.wgsl` PRIMARY from concentric + paper-grid; KEEP the `.glsl` WebGL2 fallback + dir +
  `index.ts` + keys (they stay live GPU viz on the fragment path). DELETE the orphaned
  `flow.wgsl`/`waveField.wgsl`; relocate `CONCENTRIC_FIELD_NORM` to its surviving reader.

*The gate moves (atomic in THIS wave — the plan's 6.3+6.7 fold supersedes the build-map's split framing).*
- `proof-gpu-substrate-single.mjs:170-181`: flip fourier-field + constellation off `verified`; **the
  re-classification decision (corpus §5.4, this spec DECIDES): both become `no-migrate` rows with a
  Canvas2D reason, mirroring watercolor-dot** — `NON_MIGRATING = {watercolor-dot, fourier-field,
  constellation}` — so the family table stays COMPLETE per member (the "cover the extant items too"
  discipline), and the booked reverse-triggers (`W-FOURIER-GPU`/`W-CONSTELLATION-GPU`) stay recorded on the
  rows. Remove concentric/paper-grid from the `.wgsl`-primary set (their parity rows re-class
  `webgl2-only`).
- **The born-RED `DEFAULT_PARALLAX === 0` arm on `proof:constellation-gen` `[local,ci]`** — the LX.1
  protector (a HARD, non-optional deliverable): this wave rewrites `constellation/constants.ts`, the SAME
  file carrying the D-1 live fix (`constants.ts:146`, commit `07c6e6ec`). The arm reads the behavioral
  default (substrate-AGNOSTIC — it survives the de-migration; `proof:viz-constellation` C1 asserts WebGPU,
  the exact axis this wave inverts, the WRONG host), REDs on a planted non-zero, GREENs on the shipped `0`,
  + its born-RED self-test. At HEAD `proof-constellation-gen.mjs` has NO such assert (grep → 0).
- The `W5-viz-subpath-disposition` clause on `proof:crossrepo-asks` (NOT W4 — W4 is the live inv-26
  content-only fence; a name collision would smother it): ~40 LOC + 1 self-test bite, born-GREEN; REDs ONLY
  if a WS5 wave drops/renames a CONSUMED key without an import-re-point ask
  (reads `BH/coordination/asks-and-consumes.md` + `consumer-constellation.md` + `subpath-policy.mjs` + a
  `VIZ_SUBPATH_KEYS` constant).
- `profile:budget` re-pins DOWN (the ~2.5K LOC + shader bytes leave dist; the demigrate NET delta is
  signed-negative into F8.4); the `metaball.wgsl`/`flow-field.glsl` ratchet baselines drain (the WGSL
  deletes + the F6.5 `*.{wgsl,glsl,frag,vert}.ts` shader-exempt manifest).
- `PROCEDURAL-SUITE.md` + both per-viz READMEs re-synced (the migration table's Canvas2D verdict becomes
  disk-true; the gate-comment history at `proof-gpu-substrate-single.mjs:177-180` rewritten).

**π (binding, L8).** Crisp-DPR-arc capture per demigrated viz (Canvas2D at 1×/2× DPR — the stroked curve
and the node/edge lattice read crisp, no blur, no jaggies), BOTH modes, Chrome AND Safari; the re-baseline
captures ARE the consumer disposition artifacts (slides/atlas re-approve fallback-first). Fable arm: "the
demigrated pair reads IDENTICAL-or-better to its WGSL capture — the substrate is invisible to the eye."
DesignSync surface: de-migrate paint / slides+atlas fallback routes.

**Delta vs the folded row.** The exact DELETE/KEEP file inventory with LOC; the `no-migrate`-rows decision
made; the atomicity restated as source+gate co-move (the plan's fold supersedes bg-build-map's
"6.3 source-only" framing, per `EXECUTION-PROGRESS.md:106` — the plan wins); the doc-resync deliverable.

### §4.3 · 6.4 `BG.W-VIZ-REVEAL-BLOOM` [P] — the entrance reveal-bloom (BUILD only)

**Scope (amended row honored).** The `useVizChoreography` DELETE belongs to 10.5 (the dead-cut, owned ONCE);
this wave VERIFIES `useVizChoreography.ts` DEFINITION-ABSENT (it still exists at
`src/composables/glass/useVizChoreography.ts` at HEAD — precond **10.5 ∈ preconds(6.4)**) and BUILDS the
reveal. The "6.4 removes the last consumer" prose is STRUCK.

**The mechanism (lean, compositor-only, L9).** A viz canvas ENTERS as light blooming on: host-level
`filter: brightness()` envelope `0.9 → ≥1.12 → 1.0` (the ≥12% overshoot then settle) coupled with the
existing opacity fade-in — an EFFECTS channel on the bezier register (motion-canon P1: brightness is a
re-tint, not a reshape; the overshoot is the designed luminance envelope, not a spring), on the surface's
OWN pixels (`filter`, never `backdrop-filter`). The trigger is the substrate's FIRST PRESENTED FRAME (the
arm→first-frame latch — never a mount timer racing the async WebGPU acquire), written as a one-shot
`data-viz-revealed` attribute the CSS keys off; the latch is PER-MOUNT and does NOT reset on offscreen-park
(scroll-off-and-back re-arms the loop, NOT the bloom). PRM: instant — the attribute lands with zero
animation frames (the recipe sits under the no-preference bracket). Suggested homes:
`src/styles/viz/viz-reveal.css` (the recipe) + the first-frame latch at the ONE substrate seam
(`useGpuSubstrate`'s consumer-facing arm resolution — one writer, all nine viz inherit; NO per-viz re-fork,
NO re-minted choreography composable).

**Gate arm.** `proof:viz` · reveal arm: (a) `useVizChoreography.ts` DEFINITION-ABSENT (grep, src-wide);
(b) the recipe exists ONCE + every viz host reaches it through the one latch writer (no per-viz fork);
(c) PRM carve present; + a self-test bite (a planted second latch writer REDs).

**π (binding).** The deterministic brightness-filter readback frame-series (getComputedStyle `filter` over
the entrance — rises past 1.12, settles at 1.0); ZERO second bloom on scroll-off-and-back (park→resume shows
no re-entrance); PRM instant (a single terminal-state paint). Fable arm: "the field arrives as light coming
on — one breath, no flicker, no re-bloom." DesignSync surface: reveal bloom / `/substrates` viz previews.

**Delta vs the folded row.** The concrete mechanism (first-presented-frame latch at the ONE substrate seam +
the CSS recipe home + the per-mount no-reset law) and the P1 classification of the overshoot.

### §4.4 · 6.5 `BG.W-VIZ-PREVIEW-LIVE` [P] — 11 DISTINCT preview cards, ≤1 live context

**Scope.** The VizStudio / section-preview band shows ELEVEN distinct viz preview cards (7 leaf / 2
gated-approx / 2 field), sharing `demo/stories/SectionPreviewCard.vue` with the demo IA work (F7's 10.3 —
complementary, not a fork). The L2 budget makes the design: **the cards are one-shot capture-mode stills
(`mode:"capture"` + `renderAt(timeSec)` at a per-viz signature `t` — the painted frame simply STAYS
presented, parked; no readback is even needed for a still), with AT MOST ONE promoted-live card per route**
(hover/focus promotes; blur demotes back to its still) — the capture-mode contract (L8) earning its keep as a
product feature, not just a gate mechanism.

**Deliverables.** Per-card real render of ITS OWN viz (never a shared placeholder glyph or a stock
gradient); the per-viz signature-`t` choice (each card's still must be RECOGNIZABLE as that viz — the
fourier curve mid-reconstruction, the blob mid-neck, the dotflow ribbons braided); the promote/demote
live-card machinery on the ONE lifecycle leaf (arm on promote, dispose on demote — no context leak); warm
defaults on every card (L5).

**Gate arm.** `proof:viz` · preview arm: per-card pixel-hash pairwise DISTINCT (11 hashes, no two equal —
a shared-placeholder regression REDs); the ≤1-live-context assert (a route-wide count of armed contexts);
+ a self-test bite (two cards planted with the same still RED).

**π (binding).** Per-viz recognizability (the Fable verdict names each card's viz from the card alone);
≤1 live GL context verified live (the promote/demote cycle leaks nothing — context count returns to 0/1).
Fable arm: "eleven cards, eleven voices, one family — each still unmistakably ITS viz." DesignSync surface:
VizStudio preview / `/substrates`.

**Delta vs the folded row.** The stills-plus-one-promoted-live design (the L2/L8 reconcile made explicit)
and the signature-`t` recognizability requirement.

### §4.5 · 6.6 `BG.W-DOTFLOW-REBUILD` [P] — the AURORA CURRENT close (advection `flow` register)

**Disk truth (this wave PERFECTS a landed register — it does not build from zero).** BD impl P5
(`a5f184cd`) landed: the dual-mode kernel (`cs_field` fenced + `cs_flow` advection,
`flow-field.compute.wgsl.ts:214,238`), the WebGL2 state-texture GPGPU flow path (`flowSetupGLFlow.ts`,
327L — state in `RGBA32F` ping-pong, two-FBO `RGBA16F` trail, `EXT_color_buffer_float`, additive blend),
the √φ-anchored config + `flowTrailDecay` derivation (`constants.ts:35-52`), `mode:"flow"` default at
12,000 motes (`constants.ts:166-167`), the vortex levers, and the demo lead preset
(`FLOW_PRESET_AURORA_CURRENT`, `demo/stories/substrates/presets.ts:83`). The plan-row reconcile (corpus
§2.7) is RATIFIED as stated: "compute STAYS WebGPU" = the WGPU compute kernel is the rebuilt PRIMARY; the
WebGL2 fallback is the CO-EQUAL Safari channel running the SAME advected-population gestalt — both on disk.

**Deliverables (the remaining work).**
1. **The live-dt decay correctness (§3.1 self-challenge).** Re-point both setups' decay uniform off the
   fixed 60fps reference onto the measured frame `dt`: `flowSetupGLFlow.ts:253` +
   `flowSetupWGPU.ts:347` compute `flowTrailDecay(config.trailHalfLife, dt)` per frame (the helper already
   takes `dtRef` — `constants.ts:48`). A 120Hz display holds the same trail half-life.
2. **Calibration to the floors** (the GOLDEN's spike numbers, `dot-flow-field/GOLDEN.md:311-333`):
   `litFrac > 0.06` (spike 0.231) · demo-lead `meanChromaOfLit > 18` (spike 20.2; chroma sat AT the floor
   because the spike's curl field was slow-dominated — push `speedScale`/ramp saturation + the corner-bloom
   to clear comfortably; a tuning lever, not architecture) · `frameDelta > 1.5` (spike 10.30) ·
   streak anisotropy (orientation-coherence over the lit mask — a point-grid REDs) · vortex reads (a
   synthetic drag yields a measurable local swirl + burst delta).
3. **The vortex through the ONE field (L6):** `usePointerVelocityField.tick(delta)` inside the renderer
   frame — verify no second rAF survived the BD landing; PRM `tick(0)` + vortex-inert.
4. **The fences re-verified:** `cs_field` byte-fenced (F1 witnesses within the brace-span,
   `proof-viz-dotflow.mjs:106-134`); F5 warm identity — `DEFAULT_FLOW_CONFIG.palette` IS
   `WARM_IDENTITY_PALETTE`, zero teal/navy literal in library constants (`proof-viz-dotflow.mjs:260-280`);
   the technicolor ramp stays a DEMO preset (teal-navy-purge HELD).
5. **PRM = one static advected+trailed frame** — the trail buffer holds the composite (a rich still, L3).

**Gate arm.** `proof:viz` · dotflow (advection+trail): R1-R6 as numbered floors (2) — all through the L8
read: capture-mode `renderAt(t)` + the COMPOSITOR screenshot (`locator.screenshot()` + pngjs, the goo-blob
precedent — dotflow's WebGL2 leg never flips `preserveDrawingBuffer`, and every floor is a PNG statistic;
the GOLDEN's R0 is satisfied by this read path, NOT a live-default flip); + the live-dt decay witness (a
planted fixed-`dtRef` call REDs); F1/F5 stay green untouched.

**π (binding).** The reference-flowing-dot-wave read: dense braided ribbons of light advecting along curl
streamlines over the warm-near-black ground, cursor-vortex bending the streaks, BOTH engines BOTH modes at
fixed `t` (R6 paired-engine parity on trail length + hue). Fable arm: "the flowing dot-wave — ribbons braid,
the cursor stirs water, nothing jitters" (√φ in spawn density / trail half-life / vortex radius — the
`constants.ts:35-39` anchors ARE the verdict's proportion axis). DesignSync surface: dotflow field /
`/substrates` dot-flow-field. F8.7 GA-5 carrier.

**Delta vs the folded row.** The landed-at-BD disk truth (the wave re-scoped from build→perfect+close); the
live-dt decay correctness requirement; the L8 compositor-read form of R0; the calibration-lever note on
chroma.

### §4.6 · 6.8 `BG.W-GOODOT-SETUP-SPLIT` [H] — the setup carve (ratchet drain #15)

**Scope.** Carve `goo-dot-matrix/composables/useGooDotMatrix.ts` (508L at HEAD) under the 500-line bound by
moving the remaining setup/wiring logic into the established per-viz setup-module shape (the
`gooDotSetup.ts` sibling exists at 355L; the aurora `glSetup.ts`/`wgpuSetup.ts` and dotflow
`flowSetupGL/WGPU.ts` precedents) — the M1-adopted shape per the row. MECHANICAL + byte-identical paint:
the landed BD four-move register (presence-floor · neck-ridge weld-swell `uWeldSwell`
`goo-dot.wgsl.ts:110,168-169` · technicolor re-grade · aurora ground) is INSIDE this file set — the carve
preserves it byte-for-byte; the two-pass one-context aurora-ground budget (L2) is untouched. Absorbs the
7.1 colocation-verify as a CLAUSE (the overhead floor: sub-threshold work is a clause, never a row —
`AMENDED-GESTALT-PLAN.md:216`). Drains ratchet baseline #15.

**Gate arm.** `proof:viz`/`proof:colocation`: the file lands <500 + the baseline row DELETES in-diff (the
monotonic drain); the colocation clause (composables under `composables/`, the carved leaf's call-site args
⊆ leaf params — the WORM-BINDING discipline, so a carve that drops a prop on the floor REDs); the per-viz
gates (`proof:viz-hybrid`) stay GREEN unchanged.

**π.** None owed (device-free, zero paint delta — the [H] posture); the existing goo-dot parity/π rows are
the no-regression net. No Fable arm.

**Delta vs the folded row.** The byte-preservation fence over the LANDED four-move register named
explicitly; the setup-shape precedent list; the 7.1-as-clause absorption stated.

### §4.7 · 6.9 `BG.W-BLOB-KINEMATICS-LEAF` [H] — the satellite-kinematics carve (ratchet drain #10)

**Scope.** Carve `goo-blob/composables/useBlobSatellites.ts` (533L at HEAD) under the bound: the
satellite KINEMATICS — the phase machine (`orbiting → merging → absorbed → emerging` + the landed
BD.W-GOOBLOB-MERCURY-COLONY `fissioning` beat with its bounded-apex single-fissioner law,
`useBlobSatellites.ts:86-87,174-177`, and the `fissionSnap` easing import `:17`) — moves into a pure leaf
(suggested `composables/satelliteKinematics.ts`), the composable keeping the Vue wiring. **SCOPE FENCE
(binding):** this is the COLOCATION carve ONLY — zero behavior change, byte-identical paint including the
fission choreography; the BD GOLDEN's Move B (`uBackdrop` squircle-lens refraction) is NOT this wave (no
`uBackdrop` exists on disk — RESEARCH.md prose only; it is a §7 fold-candidate). The worst-case-orbit smin
band coupling + `uMaxReach` pad (BA.W-GOO-REDRESS) and the calm-lean ceiling are protected calibration —
the carve may not perturb a single constant.

**Gate arm.** `proof:encapsulation`/`proof:viz`: file <500 + baseline #10 DELETES in-diff; the
call-args⊆leaf-params WORM-BINDING clause; `proof:goo-redress`/`proof:blob-*` stay GREEN unchanged.

**π.** None owed (device-free [H]); the blob π suite is the no-regression net. No Fable arm.

**Delta vs the folded row.** The fission-machinery-is-landed disk fact (the carve moves MORE than the
pre-BD file did — the fence is therefore sharper); the explicit NOT-the-lens scope fence.

### §4.8 · `BG.W-AUR-METAL-FINISH` (6.10) [P] — metal + metal-gradient as MEDIUMS 8/9

**The §3.2 GOLDEN, bound.** Born-RED at HEAD (grep `mediumMetal|uMedium == 8` in `aurora/` → prose only;
`MEDIUM_ID` stops at `kuwahara: 7`, `uniformBridge.ts:43-56`; `AuroraMedium` stops at `"kuwahara"`,
`presets.ts:61-76`).

**Deliverables.**
1. **The union + ladder widen.** `AuroraMedium` gains `"metal" | "metal-gradient"` (`presets.ts`);
   `MEDIUM_ID` gains `metal: 8, "metal-gradient": 9` (`uniformBridge.ts` — `mediumFor` stays total by
   construction); the dispatch ladders in BOTH shader hosts gain the two arms. Mutually-exclusive medium,
   NOT a finish axis (the frozen-plan taxonomy, §3.2 — kuwahara stays medium 7).
2. **The gradient re-plumb (ZERO new taps), dual-ported.** `structureTensorField` widens
   `vec3(dir, A)` → `vec4(dir, A, packGrad(Gx,Gy))` in BOTH `mediums.glsl.ts:89` AND the WGSL twin
   `aurora-mediums.wgsl.ts:76`; all `.xy/.z` callers (kuwahara) byte-unchanged; `mediumKuwahara` stays
   grep-locked in `mediums.glsl.ts` (L11 — the metal body lands BESIDE it, relocating nothing).
3. **`mediumMetal()` — the two-term BRDF, BOTH backends** (a GLSL body in `mediums.glsl.ts` + a WGSL body
   in `aurora-mediums.wgsl.ts` — metal DUAL-PORTS; a frag-only metal is invisible on the WGSL primary of
   both browsers): `N = normalize(vec3(grad·METAL_HEIGHT_SCALE, 1))`; the cursor-z-synth light
   `normalize(vec3(uCursor − p, METAL_LIGHT_Z))` with the idle upper-right rake (`uCursor` off 64 IS
   in-struct, `uniformBridgeWGPU.ts:17,62`; `uLightDir` is frag-only and MUST NOT be read by the WGSL body);
   `streak = pow(sinTH, METAL_SHININESS_ANISO)` × `crest = pow(max(dot(N,H),0), METAL_SHININESS_CREST)`;
   the coherence gate `spec *= smoothstep(0, METAL_COHERENCE_FLOOR, A)`; the technicolor-DR valley base
   (field hue tints the body; luma rides the height field); the ACHROMATIC-WARM catch
   (`METAL_CATCH_WARM ≈ vec3(1.0, 0.97, 0.90)` — the `AURORA_CATCH_LIGHT_ANCHOR` register,
   `uniformBridge.ts:106`). WebKit-fenced: clamped `pow` exponents, `highp`.
4. **`medium:"metal-gradient"` (9)** = the SAME BRDF over a pre-flattened/gradient base (NOT a second
   BRDF) + the twinkle-in-place sparkle: `highp` per-cell `hash21(floor(p·DENSITY))` seed, PHASE-animated
   (`pow(max(sin(t + seed·TAU),0), 40)`), position FIXED, gated on facing — flake glint, never boil.
5. **The knobs pack the FREE pad slots** (`cursor.z/.w` off 72/76, written 0 today,
   `uniformBridgeWGPU.ts:136,141,154`) — `uMetalPolish` + `uMetalHeightScale`; ZERO new struct lanes,
   byte-offset lockstep preserved; the `.frag` uniform list gains the matching pair. NOTE (crit m4): these
   are the LAST two free shared-struct lanes — after metal, ZERO pad remains; image-source is unaffected
   (its lanes ride the image-permutation's own bind group, §4.9-4), but any FUTURE shared-struct aurora
   addition must APPEND a lane (a byte-offset lockstep re-pin, both bridges).
6. **Default byte-identity.** `medium:"smooth"` (and every existing medium) renders byte-identical — the
   ladder is additive; ids 8/9 are reached only by explicit config. `aurora.frag.ts` smooth-path
   byte-untouched (the row's GL fence). One generalized "Metal"/"Brushed Metal" DEMO preset
   (presets-in-consumers); PRM seats one lit static frame (rake frozen to idle, sparkle phase frozen — L3).
7. **Adjacent, already landed — record, do not re-do:** the §3 vividness floor + the warm-vivid default
   palette lift shipped at BD (`BD.W-AUR-VIVIDNESS` — `vividnessFloor` `aurora.wgsl.ts:273-286`,
   `VIVID_TARGET 0.115` + palette C 0.16/0.13/0.095 hue 45-68 `presets.ts:300-323`, `vividness:
   DEFAULT_VIVIDNESS` `:356`). The metal lands ON an already-vivid field.

**Gate arm.** `proof:viz` · aur-metal (born-RED at HEAD): (a) the medium-ladder witness — union total over
`MEDIUM_ID`, ids exactly 8/9, mutually-exclusive dispatch, kuwahara untouched at 7; (b) **metal FOLDS** —
localContrast ≥ 0.020 AND ≥ 1.5× the smooth field's (spike: 0.0267 vs 0.0011 — 25×), read via the aurora
runtime capture flip (`createAurora({mode:"capture"})` + `renderAt` — the ONE viz with a true in-page
exact-pixel read, L8) or the compositor screenshot; (c) the
catch-light CROSSES to WGSL — a chromium-WGSL capture shows a non-zero cursor-raked delta (a phantom
`uLightDir` read REDs by construction: it is 0 on the WGSL struct → flat); (d) the GL fence — smooth-default
byte-identity both backends + `mediumKuwahara` grep-lock intact; (e) warm-catch fence — the catch color is
the achromatic-warm anchor, no cold hue literal; + self-test bites (a planted `uLightDir` read in the WGSL
body REDs; a streak-only body fails (b)).

**π (binding).** Both engines both modes: the metal field FOLDS (warm folded metal, ridges riding the
drifting iso-bands, catch-light rakes with the cursor on the existing 0.22/frame inertial lerp — liquid
weight, never a snap); metal-gradient reads brushed-with-flake. Fable arm: "deeper reads warm folded metal —
25× local contrast, the ridges breathe with the drift, the catch is warm-white never chrome-blue."
DesignSync surface: metal medium / aurora metal cards. GA-5 carrier (BD metallic ×2).

**Delta vs the folded row.** The medium-not-finish taxonomy ratified with rationale; the full
shader/uniform name set (`packGrad`, `METAL_*` constants, pad-slot offsets); the dual-port + uCursor law as
gate bites; the vividness-already-landed record.

### §4.9 · `BG.W-AUR-IMAGE-SOURCE` (6.11) [P] — the blurred-image source + the ONE upload primitive

**The §3.3 GOLDEN, bound.** Born-RED at HEAD (no `source` axis, no upload primitive anywhere in `src/`).
This wave BUILDS the shared seam; `BD.W-DOT-IMAGE` consumes it (first-to-land-builds,
`EXECUTION-PROGRESS.md:113`).

**Deliverables.**
1. **The shared texture-upload primitive** (suggested home `src/composables/glass/textureUpload.ts`, beside
   the substrate it serves): shared decode `createImageBitmap(blob, {premultiplyAlpha:"none",
   colorSpaceConversion:"none"})`; the WebGL2 leg with explicit
   `UNPACK_PREMULTIPLY_ALPHA_WEBGL:false` + `UNPACK_COLORSPACE_CONVERSION_WEBGL:NONE` +
   `UNPACK_FLIP_Y_WEBGL:false`; the WebGPU leg with explicit
   `copyExternalImageToTexture({premultipliedAlpha:false})`; ONE primitive, two booked consumers
   (aurora-image + dot-image — the ≥2-consumer bar by construction, recorded in
   `docs/consumer-evidence/`).
2. **`<Aurora source="image" :src>`** — `source: "palette" | "image"` on `AuroraConfig`; a CONSTRUCTION-TIME
   program permutation (the image-variant fragment is a separate compiled program on both backends — never a
   per-fragment `if(uSource)` god-branch); the palette default byte-identical.
3. **The zone blur, in-shader, bounded, Safari-safe:** `radius = mix(BLUR_MIN, BLUR_MAX, zone)` where
   `zone = nucleiField(domainWarp(uv,t),t)` — the SAME drifting field drives BLUR instead of color; a FIXED
   24-tap kernel (3 rings × 8 — the kuwahara budget precedent), compile-time loop bound, per-fragment
   radius; sampled in linear-light via the shared OETF chunk; NO FBO ping-pong, NO `backdrop-filter:url`
   (L9). The vividness floor applies source-agnostically (it operates on the final `col`) — a washed-out
   photo blooms to transmission-fit.
4. **The uniform lane:** the image program's sampler + the `BLUR_MIN/MAX` pair ride the image-permutation's
   own bind group / uniform tail — the palette program's struct is byte-offset-untouched (lockstep held).
5. **PRM:** one static blurred frame (no zone drift, no cross-fade — L3). The macro-flower ARRAY +
   cross-fade cadence are DEMO/consumer assets (presets-in-consumers); the library ships the axis only.

**Gate arm.** `proof:viz` · aur-image (born-RED): (a) the single-texture-primitive witness — both backends'
uploads route through the ONE primitive with the explicit flag set (a planted raw `texImage2D` outside it
REDs); (b) the program-permutation witness (no `uSource` runtime branch in either shader body); (c) the
bounded-tap witness (compile-time constant loop bound); (d) **the capture-pair parity clause** — a REAL
chromium-WGSL vs webkit-WGSL rendered pair of the same decoded image within the L7 ΔE bar (never a
name-presence — the gpuweb #4356 blank-texture class REDs the pair); (e) palette-default byte-identity.

**π (binding).** "A real photo dissolving into a slow abstract color field" — near-sharp zones and
dramatically-dissolved zones DRIFTING like aurora nuclei, warm organic chroma reading through a glass plate
over it; BOTH engines BOTH modes. Fable arm: "the photo abstracts and re-forms — the blur zones ARE the
aurora's drift; nothing reads synthetic-flat." DesignSync surface: image-source / aurora image cards. GA-5
carrier.

**Delta vs the folded row.** The BUILDS-the-seam disposition resolved from disk (dot-image absent); the
primitive's home + flag set + the four gate witnesses; the bind-group isolation of the image lane.

---

## §5 · Precepts conformance (per `docs/precepts/` + the folded cross-cutting rules)

- **motion-canon P1-P7.** The family's per-frame channels are shader/canvas-resident (outside CSS's
  jurisdiction) — where the waves touch CSS/host motion they conform: 6.4's bloom is an EFFECTS channel on
  the bezier register with coupled opacity (P1/P3), PRM-instant (P6), compositor-only `filter` (P5); the
  metal catch-light rides the existing inertial cursor lerp (liquid-weight, never a snap); no wave animates
  a layout property (`proof:no-layout-animation` untouched).
- **tunable-anim.** Every new lever is a named config atom or CSS-reachable knob with a warm default
  (`trailHalfLife`/`turnRate`/`vortex*` on `FlowFieldConfig`; `uMetalPolish`/height-scale; `BLUR_MIN/MAX`);
  no magic inline numerics — the √φ anchors are DERIVED (`constants.ts:35-44`), the metal constants named.
- **design-idioms.** Presets-in-consumers held at every seam (technicolor ramp · metal preset ·
  macro-flower array); the configurator hierarchy vocabulary inherited (SUITE:42-43); clean breaks
  everywhere (6.3 deletes with no alias; 6.4 verifies the choreography DELETE; no dual paths — the
  `proof:no-dual-path` posture).
- **Overhead floor.** 7.1 rides 6.8/6.9 as a clause; no sub-threshold row is minted; the two [H] carves are
  pure ratchet drains with in-diff baseline deletes.
- **Gates as family arms.** Every arm lands ON `proof:viz` / `proof:gpu-substrate-single` /
  the named existing per-viz gates — zero new gate singletons; born-RED where the mechanism is absent
  (metal, image, the parallax arm), born-GREEN where protective (W5-disposition).
- **Fable arm + DesignSync surface per visual wave (F8.3).** Named per wave in §4; the [H] carves carry
  none (device-free). Paint closes are per-wave, both modes, both engines where dual — no terminal funnel.
- **≥2-consumer.** The upload primitive (aurora-image + dot-image, booked-with-evidence);
  `usePointerVelocityField` and `curlFBM` already clear the bar; no new primitive ships single-consumer.
- **Protected set (SYNTHESIS-PASS1 §4).** `createCanvasLifecycle` composed, never re-plumbed; the
  per-subpath JS split + 1-GL budget held; `DOCK_SPRING` untouched (no wave nears it); the warm HSL/alpha/φ
  identity values byte-identical — every default-palette touch in this lane LANDED at BD and is recorded,
  not re-made; the parity-ΔE bar is the L7 law.
- **Foreign-tree fence.** The 6.3 consumer disposition is a visual re-baseline with by-name evidence only —
  zero sibling edits; slides/atlas re-approve in THEIR repos.

---

## §6 · The gestalt bar — the family-voice acceptance language

Every F9 paint verdict is judged in this language (the F8.6 three-axis verdict + the family voice), per
wave, on a FRESH capture, both modes, both engines where dual:

1. **Warm identity in every default.** A bare mount of ANY member reads warm-cream/warm-amber at rest —
   never gray, never teal/navy (the purge HELD), never a cold chrome. The technicolor lives in the demo
   lead and reads DELIBERATE there (the one audacious surface), not bled into the library.
2. **Ambient, not demo.** At rest on a content route the field RECEDES — the glass above it reads first;
   the field is what the glass refracts. On its own `/substrates` stage it may lead. Restraint is the
   2026 award bar (§2); a field that demands attention on a content route FAILS.
3. **The reference reads, per member.** dotflow = the flowing dot-wave (ribbons braid, the cursor stirs
   water); aurora-metal = warm FOLDED metal (25× local contrast, ridges breathing with the drift);
   aurora-image = a photo dissolving into the field's own drift; goo-dot = liquid lattice with the weld as
   the climax; the demigrated pair = indistinguishable-or-better vs their WGSL captures; the preview band =
   eleven recognizable voices.
4. **√φ proportion.** The proportion axis is IN the math and the verdict names it: the golden-angle
   lattice; the √φ flow anchors (vortex/bloom radii, trail/lifetime ladder); the goo-dot presence floor at
   `1/φ²` of rim opacity.
5. **Animation laws.** Liquid weight universal — motes ease into arcs (low turn-rate inertia), the vortex
   is anticipation→impact→follow-through→settle, the catch-light rakes with inertia, trails ARE
   follow-through; nothing jitters, nothing snaps, nothing boils (twinkle-in-place is the law).
6. **Technicolor-cartoon punch WHERE audacious, subtle where subtle.** The demo-lead ramps and the metal's
   DR valley-to-crest range carry the punch; the paper-grid/concentric/dot-matrix registers stay whispers.
7. **The ONE pointer-physics field.** Every interactive response reads as the SAME hand in the same water —
   one velocity field, one burst law, PRM-inert everywhere.
8. **Battery honesty.** Parked is parked (zero frames offscreen/hidden); PRM is one RICH still (a held
   trail composite, a lit metal frame), never a blank.

A wave whose π is green but whose capture fails this language closes `complete_with_misses` and re-earns on
a fresh capture — the paint IS the gate.

---

## §7 · Fold-candidate notes (orchestrator-only — the wave SET is frozen; NONE self-inserted)

1. **`W-VIZ-ADAPTIVE-QUALITY`** — a `createCanvasLifecycle` frame-time EMA → quality scalar (particle/tap
   ladder) every viz reads; the ONE real SOTA gap vs the award circuit's "FPS-based quality scaling"
   (SOTA §1/§5/§8-1). Trivially ≥2-consumer; the budget-DPR clamp + static-mesh fallback remain the shipped
   floor, so genuinely optional.
2. **goo-blob `uBackdrop` mercury-LENS (BD GOLDEN Move B).** The squircle-dome Snell refraction of a
   glass-ui-produced warm backdrop — the fission half LANDED at BD (`useBlobSatellites.ts:86,174`); the
   lens half is prose-only (`goo-blob/RESEARCH.md:135-178`, grep `uBackdrop` in shaders → 0). A real visual
   mechanism with no BG row; NOT foldable into 6.9 (a [H] byte-identical carve).
3. **aurora thin-film iridescence** (`medium:"iridescent"` successor) — rejected for BG (§3.2 D1: no
   meaningful `V`, fights the warm fence); the metal-gradient twinkle is the restrained substitute. Books
   with its own consumer + fence (SOTA verdict #6).
4. **`W-AURORA-WGPU-MEDIUMS` tail reminder** — the painterly stroke-cascade mediums still degrade to smooth
   on WGSL (already booked pre-BG; recorded here because the metal dual-port narrows the degrade set and a
   future fold could close it).

---

## §8 · Source-verify ledger (every §4 disk claim grepped/read on HEAD `fa6ed40a`)

`useGpuSubstrate.ts:44-53,78-79,97,160,346` (readback doctrine comment · capture mode · dprPolicy/presize)
· `captureFrame` grep → the `:51` comment ONLY (phantom; real method `renderAt`,
`useGpuSubstrate.ts:164,390-392`) · `preserveDrawingBuffer` grep under `src/composables/glass/` → comment
lines only (the substrate never sets it) · `aurora/composables/runtime.ts:120-125,165,254`
(`shouldPreserveDrawingBuffer` — the capture flip is aurora-runtime-LOCAL) · `useGooDotMatrix.ts:471` +
`useMetaballRenderer.ts:337` (non-aurora hardcoded `false`) · `goo-blob/RESEARCH.md:194` (the
`locator.screenshot()` + pngjs compositor read, implemented + gate-proven) ·
`dprPolicy` adoption grep → 0 under `src/components/custom/` · `flow-field.compute.wgsl.ts:214,238,281-283`
(cs_field/cs_flow) · `flowSetupGLFlow.ts:195,253` + `flowSetupWGPU.ts:347` (dt measured; decay at fixed ref)
· `constants.ts:35-52,70,166-167` (√φ anchors · flowTrailDecay · mode:"flow" · 12000) ·
`demo/stories/substrates/presets.ts:44-95` (FLOW presets incl. AURORA_CURRENT) ·
`proof-viz-dotflow.mjs:106-134,260-280` (F1 fence · F5 warm fence) · `mediums.glsl.ts:89` +
`aurora-mediums.wgsl.ts:76,182` (the discard, both twins) · `uniformBridge.ts:43-56,106,132-136` (MEDIUM_ID
· catch anchor · mediumFor) · `uniformBridgeWGPU.ts:16-17,62,136-154` (scalars3/cursor lanes · free pads) ·
`presets.ts:61-76,300-356` (AuroraMedium · VIVID_TARGET · warm-vivid default palette · DEFAULT_VIVIDNESS) ·
`aurora.wgsl.ts:273-286,348,374` (vividnessFloor landed) · `goo-dot.wgsl.ts:110,168-169` (uWeldSwell
neck-ridge landed) · `useBlobSatellites.ts:17,86-87,174-177` (fissionSnap · fissioning beat landed) ·
`uBackdrop` grep → RESEARCH.md prose only · upload-primitive grep (`copyExternalImageToTexture|
createImageBitmap`) → 0 in src · `useVizChoreography.ts` present at HEAD (6.4's verify is real) ·
`proof-gpu-substrate-single.mjs:170-181` (VALID_STATUS · NON_MIGRATING={watercolor-dot}) ·
`constellation/constants.ts:146` (DEFAULT_PARALLAX=0) · `proof-constellation-gen.mjs` grep DEFAULT_PARALLAX
→ 0 (the arm is genuinely absent) · demigrate file inventory + LOC (corpus §2.3, re-verified; the
constellation itemization incl. `constellation-{lines,points}.glsl.ts` 94+75 — `wc -l` on disk — sums
115+97+94+75+267+196+222 = 1,066, matching the bullet header) ·
`EXECUTION-PROGRESS.md:105-113` (the frozen rows) · `AMENDED-GESTALT-PLAN.md` F9 table (6.10 medium-NOT-
finish · 6.8/6.9 +7.1 clause · 6.4 precond 10.5) · `bg-build-map.md:531-590,1381-1407` (WS5 detail · G7
Lock-1 W5-clause) · `SYNTHESIS-PASS1.md:108-116` (the protected set) · git log `a5f184cd`/`cb1e09fd`
(BD impl P5 / BC Band 4 — the landed-register provenance).

---

## REVISION — critique fixes applied (per `critique/PROCEDURAL-crit.md`, 2026-07-01)

- **M1 (critical) — FIXED.** The §2 correction, L8, and every dependent gate/π are re-grounded on disk:
  `captureFrame` deleted everywhere (the real method is `renderAt(timeSec)`, `useGpuSubstrate.ts:164,390-392`
  — the sole `captureFrame` occurrence on disk is the substrate's own folklore comment at `:51`); the
  capture-mode `preserveDrawingBuffer` auto-flip is scoped to aurora's OWN runtime
  (`runtime.ts:120-125,165,254`), NOT a `useGpuSubstrate` contract (the substrate never sets the flag; the
  non-aurora viz hardcode `false` — `useGooDotMatrix.ts:471`, `useMetaballRenderer.ts:337`). The binding
  read for every non-aurora pixel floor (6.6 R1-R6, 6.1 `meanByte`, the §4.9-d ΔE pair) is capture-mode
  `renderAt(t)` + the COMPOSITOR screenshot (`locator.screenshot()` + pngjs — the implemented goo-blob
  precedent, `RESEARCH.md:194`); aurora floors (§4.8-b) may additionally use the runtime-local in-page
  read. The critic's OR-branch (plumb the flip through `useGpuSubstrate`) is recorded as the correctly-
  scoped move IF a future floor needs in-page pixels on a non-aurora viz — no F9 floor does, so no
  substrate re-plumb is mandated (protected-set posture). 6.1 gains deliverable 5: the ~4-line
  substrate-comment reconcile so the folklore dies at its source. Sections touched: §2 · §3.0-L8 ·
  §3.1 (two self-challenge answers) · §3.3 · §4.1 (π, deliverable 5, delta) · §4.4 · §4.5 (gate arm,
  delta) · §4.8-b · §8 ledger.
- **M2 (major) — VERIFIED CONSISTENT (no content change needed).** The §4.2 constellation DELETE
  itemization on the current file ALREADY carries `shaders/constellation-{lines,points}.glsl.ts` (94+75)
  and sums 115+97+94+75+267+196+222 = 1,066, matching the "~1,066 LOC" header (the critique read a prior
  draft). Re-verified on disk (`wc -l`: lines.glsl 94 · points.glsl 75); the §8 ledger now records the
  sum-check explicitly so the inventory cannot silently desync again.
- **m3 — FIXED.** §3.1 now writes the real signature `flowTrailDecay(halfLifeSec, dtRef = 1/60)`
  (`constants.ts:48`) and states both call sites ride the fixed default ONE-ARG; §4.5-1 unchanged
  (already disk-accurate).
- **m4 — FIXED.** §4.8-5 now states metal consumes the LAST two free shared-struct WGSL lanes
  (`cursor.z/.w` off 72/76): zero pad remains after metal; image-source is unaffected (own bind group);
  any future shared-struct addition must APPEND a lane (byte-offset lockstep re-pin, both bridges).
- **m5 — NOTED.** §3.1 carries the convergence note: loop A is RATIFICATION of a BD-landed GOLDEN; the
  generative greenfield loops are B (metal) and C (image-source). The greenfield-loop record is preserved
  unchanged.
