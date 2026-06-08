# AX — PROTOTYPE + HARDEN BACKLOG (the PoC ledger the visual bands gate on)

The prototype-and-harden backlog synthesized from the 16-slice assay
(`research/prototype-harden-assay-corpus.json`) + the 30-slice final hardening
(`research/final-hardening-corpus.json`). It enumerates the genuinely-novel/high-risk approaches that
need a PoC and the un-ratified spec areas that need a forcing function BEFORE the AX bands drive. The
discrimination is deliberate — routine work (the CSS god-module carves, TS splits, legacy sweeps,
prunes, IA re-org, the forced-colors skin, the configurator restyle, Lighthouse, the build:watch-dts
fix) is EXCLUDED; only genuine uncertainty is listed.

Baseline: HEAD `cdcf331` (`at-dock-convergence`). Line anchors are `eaba94f`-relative; symbols
re-located by NAME at impl time. The load-bearing finding across every slice: **W00 is the keystone**
— there is no `playwright`, no `tests-visual/` workspace, and the existing substrate gates are
grep-class source analyzers while `proof:dock-animation-live` fail-opens with `process.exit(0)`. The
two W00 PoCs gate the ENTIRE tranche; nothing else closes visually-true until they prove out.

---

## PART 1 — THE PoC BACKLOG (17 prioritized PoCs)

Each carries owning wave · risk retired · the minimal spike · effort · GO/NO-GO. P0 gates everything;
P1 is the highest architecture-risk; P2 the highest visual-risk atoms; P3 bounded novelty.

### P0 — the keystone (gate the whole tranche; the FIRST spikes next session)

| # | PoC | Wave | Risk retired | Minimal spike | Effort | GO / NO-GO |
|---|---|---|---|---|---|---|
| 1 | **Headless WebGPU/WebGL pixel-readback device for the π-lane** | W00 | The substrate-paints-color foundation: a software/SwiftShader fallback false-GREENs a black render. The WebGPU-Metal reproducibility subtlety is the sharpest hidden risk — a Dawn-CPU headless device may not reproduce the `var<uniform>` Metal miscompile that IS the aurora-black root cause | Stand up a throwaway `tests-visual` workspace with Chrome-headless-new (`--enable-unsafe-webgpu`) + a Dawn/headless-gl fallback; render the existing aurora WebGL2 path + a deliberately-blacked render; confirm `readPixels` returns non-zero for the good render, zero for the black; confirm whether the device exposes a REAL Metal adapter (not `isFallbackAdapter`) | medium | GO iff the good render reads non-zero + the black reads zero on the chosen device AND a real Apple/Metal adapter is confirmed. If the device can't run WebGPU at all, the W07 gate degrades to a WebGL2-only floor and that limitation is RECORDED before W07 drives |
| 2 | **Deterministic-drive dock-morph readback** (the 181-rAF-sample no-morph trap pre-solve) | W00 | The keyframes device-proof that 181 `getBoundingClientRect` samples over 1.5s captured ZERO morph — VT runs on snapshots invisible to live geometry, so a naive box poll proves nothing | Drive collapse on the CURRENT demo dock with `startViewTransition` removed (force the FLIP arm) + a lowered collapse-delay + real `page.hover`; rAF-sample dock-root box geometry AND a child opacity on ONE timeline; confirm a captured lead/lag delta (not a flatline); 3× for anti-flake; parse `--spring-dock linear()` ramp peak as the flake-free secondary | medium | GO iff the lead/lag delta is captured deterministically (born-RED: root leads inner ~16ms) — proving the gate is load-bearing BEFORE W01 depends on it. NO-GO → escalate the test-seam design (`__springProgress`), never hand-patch a rect probe |

### P1 — highest architecture-risk

| # | PoC | Wave | Risk retired | Minimal spike | Effort | GO / NO-GO |
|---|---|---|---|---|---|---|
| 3 | **Single-scalar `--dock-morph-t` calc-ramp across the D+C-tier axes in one paint** | W01 | The W01 headline architecture is a DIFFERENT morph model than what ships (3 clocks today, no registered scalar). The expensive corner: a registered `@property <number>` driving D-tier `inline-size`+`padding` AND C-tier `border-radius`+`background`+`box-shadow` per frame | A throwaway `.glass-dock`-shaped box driven by ONE SpringProgress writing a `@property`-registered `--morph-t {inherits:false}` LOCALLY on the box root; every axis a pure `calc()` read, ZERO CSS transition on any morph prop; drive hover-open + a rapid re-toggle at t≈0.2/0.5/0.85 + a PRM toggle; rAF-sample box + a child on one timeline; FPS/long-task overlay | spike | GO iff box-chrome + a child land in the SAME frame (≤1 frame), reads as ONE iOS spring (≤+4.6%, no re-bounce), the re-toggle reads velocity-continuous at all 3 phases, 60fps + PRM snaps. NO-GO → research+plan+redress if the calc surface can't reproduce (0.32,0.7) after 3 retunes OR the per-frame writes blow budget |
| 4 | **`useLiquidMorph` unified morph substrate** (the net-new §18.3 facility) | W42 | The 30%-net-new API shape + the ≥2-consumer + axes-union choices are unratified; W42 is the **distinct-wave-vs-fold + second-consumer RATIFY** (the one remaining open hinge — see Part 2) | AFTER W01's single-scalar dock model is live: prototype `useLiquidMorph(elRef)` driving ONE second consumer (the `UnderlineTabs` indicator glide OR a card→detail expand) against the `--dock-morph-t` pattern, `--morph-t` `@property`-registered; validate the axes-declaration carries radius+specular+inline-size off one scalar with one FLIP-measured axis; resolve the 5 open questions in the spike record | medium | GO iff the second consumer reads BETTER (not just compiles) off the substrate AND the axes-union/second-consumer choices ratify against a real morph. Throwaway exploration to settle the API before the real ≥2-consumer build |
| 5 | **Constellation focal-node click-to-warp spring integrator** (the §15 net-new interaction) | W17 | The forbidden-`useSpring` constraint + the integrator-body fork (the W17 §4 spec prescribes a hand-rolled semi-implicit Euler; the codebase precedent is keyframes.js `SpringProgress.tick(dt)` — they disagree). A second rAF must NOT spawn | A <100-line spike: the `warpStep(field, dt)` critically-damped integrator (reuse the keyframes (response, dampingFraction) PARAM model but NOT its rAF ownership; now-delta gives dt, clamp ~50ms for tab-throttle) + `nearestNode` O(count) scan + live-target-by-index tracking, advanced inside the existing `stepField`; confirm it chases a drifting target and arrives ON it, PRM-snaps, never spins a second rAF | spike | GO iff the focal converges ONTO a real moving node (identity-ride, not next-to a frozen click-time snapshot), no `.play()`/second rAF, PRM-snaps. RATIFY the integrator body (hand-rolled Euler vs `SpringProgress.tick`) with evidence before W17 (and the contingent slides adoption) drives |

### P2 — highest visual-risk atoms

| # | PoC | Wave | Risk retired | Minimal spike | Effort | GO / NO-GO |
|---|---|---|---|---|---|---|
| 6 | **Does the SHIPPED `#glass-refract` displacement map read as a convex iOS-26 lens?** | W20 (retire-target) / W42 (springs it) | The baked map DISAGREES with its own comment — `glass-refract.css:46` claims a Snell-derived squircle map but bakes a CRUDE radialGradient (single-pass, no chromatic aberration). The synthesis names it: "a crude radial-gradient map and a single pass." The load-bearing visual-fidelity question — if it doesn't read as glass, every downstream wave ships a non-convincing lens | A static Chromium-headless spike: mount `.glass-material.glass-refract` over a STATIC high-frequency backdrop (checkerboard/text grid — displacement is invisible over flat color), 3 aspect ratios, screenshot, frontend-design JUDGE: does the edge bend the backdrop convincingly? | small | GO (crude map reads as glass) → close the loop, document the Snell-normal-map + 3-pass chromatic-aberration upgrade as explicitly OUT of AX with a named successor (the upgrade has NO owning wave today — a scope hole all three waves point at). NO-GO → mint a distinct lens filter-graph re-author wave |
| 7 | **`--glass-refract-scale` spring-off-`--morph-t` mechanism** (prove only `scale` animates without a map rebuild) | W42 | An UNVALIDATED assumption: the `feDisplacementMap` `scale` is an SVG attr baked into the data-URI, NOT reachable by `var()` — there may be NO cheap CSS path to animate the displacement scale at all without rebuilding the data-URI (which tanks INP). The map must NEVER regenerate mid-morph | Register `@property --glass-refract-scale`, drive it 1→1.4 via a keyframes spring; try each wiring: (a) `feDisplacementMap scale` via CSS attr (expected: fails), (b) a second `backdrop-filter scale()`/`blur()` multiplier off the var, (c) re-emit the data-URI per frame (measure the cost) | spike | GO iff a cheap CSS path springs the lens as the box flexes on Chromium AND degrades to the universal blur base off-Chromium (zero broken `url()`, zero blank-first-paint). Ratifies the in-scope boundary (registration + scale-read IN, chromatic-aberration upgrade OUT) |
| 8 | **Non-fallback Metal-adapter feasibility + storage-buffer-split render** (the aurora black-canvas fix) | W07 (co-ratified with W00) | The `var<uniform>`→`var<storage>` + `i32`→`f32` Metal miscompile is the aurora-black root cause; the gate's load-bearing assumption is a real Metal adapter. A green readback on the wrong (fallback) device is a false-GREEN of exactly the AW class | On this Metal box: install playwright+chromium, launch headless with `--enable-unsafe-webgpu`, assert a real Apple/Metal adapter (not `swiftshader`/fallback); compile a WGSL probe exercising the `var<uniform> array<vec4f,8>` path; then a standalone harness importing the REAL patched `aurora.wgsl.ts` + `packGPUUniforms` split-write + `createGPUAuroraSetup` storage-buffer split, render the DEFAULT config, read back the centre pixel | spike→small | GO iff the centre pixel reads non-black after BOTH the f32-cast fix AND the storage-buffer split, on a confirmed real-Metal adapter. NO-GO → record the WebGL2-only floor + the WEBGPU_PARITY-stays-opt-in disposition |
| 9 | **A quantitative painterly-fidelity oracle** (the "does it read as Van Gogh / oil pastel?" acceptance metric) | W13 | The single biggest un-de-risked gap in band C — the cardinal AW green-structure-over-unvalidated-render risk re-entering at the painterly layer; "stunning/congruent to Van Gogh" is NOT operationalized for the unattended lane | Spike a measurable atomicity/separability metric on the LIVE HEAD render BEFORE W12 drives: render the current vangogh + oil-pastel presets at t=1 via the W00 readPixels harness; compute a stroke-separability statistic (local-variance / high-frequency-energy histogram OR a connected-component count over a coverage mask) distinguishing separable atomic dabs from a smooth blur; add a no-flat-fills variance + an OKLab overlap-not-grey + a four-media-distinct check | medium | GO iff the metric cleanly separates the current (too-smooth) render from a target atomic-dab render — dual-tier the W13 close (human side-by-side = enrichment, the numeric gate = the unattended close) + name a public-domain Starry Night fixture. NO-GO → the metric is not discriminating; escalate the acceptance design |
| 10 | **Blob composed-`uSmoothK` distance regime + lit warm-cream default** (un-flood + contained lit droplet) | W08 (smin) / W15 (lit) | The wet-bead look is a perceptual target only a rendered pixel validates; the static `proof:blob-smin-normalized` shipped GREEN over a 6.28× flood. The composed arithmetic has THREE multiplied factors + the in-shader `k*=4.0` + a 0.5 half-extent UV — one mis-stacked factor re-floods. The lit rim is tinted to `var(--foreground)` (near-white in dark) so one `rimStrength` can wash a `var(--primary)` blob out in dark | A constant-sweep harness: mount GooBlob with `BLOB_CONFIG_DEFAULTS`, sweep `smoothK` over ~0.03-0.10 (light + circular merge), readback opaque-fraction + center-vs-corner gradient, pin the value landing opaque-fraction ~0.25-0.6 with a transparent edge margin; sweep the `{quadratic, circular} × {min, max arousal}` 4-corner matrix; flip `lit:true` and verify a measurable dome luminance VARIANCE + every grid blob legible against both backgrounds + the foreground-aware min-contrast rim | small→medium | GO iff all 4 corners stay a contained legible droplet (no flood, no hard split) AND the lit default reads as a wet dimensional bead legible in BOTH modes. NO-GO if any corner re-floods or the `var(--primary)` blob washes out in dark |
| 11 | **Re-baseline the slides L-band born-RED witnesses against CURRENT slides HEAD** | W30 | The entire L band assumes a STALE snapshot — H is committed, the pin is already `^3.7.0`, HEAD advanced through tranche I, the constellation leak is fixed at `constellation.ts:116`, the deck is deployed. An agent re-lands already-committed work and never reaches `main` (the deploy never fires) | A LIVE pixel-histogram confirm on Slide01 (the constellation `--foreground` `light-dark()`-into-Canvas2D leak) + a re-diagnosis of the W30/W31/W32 born-RED witnesses against the CURRENT HEAD; record which are ALREADY GREEN (scope-collapse, never re-do) vs surviving RED | spike | GO iff the surviving-RED witnesses are pinned + the branch protocol is set (cut `tranche/AX-slides` FORWARD from `deck/feedback-coder`, `feedback-coder/**` hard out-of-bounds) + the merge-to-main → `deploy-pages.yml` terminal is wired. HARDEN-SLIDES-0 gates ALL L-band driving |

### P3 — bounded novelty (small, scoped — de-risk in-line as their band opens)

| # | PoC | Wave | Risk retired | Minimal spike | Effort | GO / NO-GO |
|---|---|---|---|---|---|---|
| 12 | **The comma/crescent asymmetric-taper stroke SDF** (the net-new van-Gogh stroke shape) | W13 | A net-new SDF that is hard to debug inside the medium body | Isolate the SDF in a standalone fragment-shader sandbox (single full-screen quad, no aurora): author the comma `strokeShape` + asymmetric taper + bulge, sweep curvature/scale/DPR, eyeball for self-intersection / AA breakup / cap artifacts | small | GO iff the shape reads as a comma (not a banana or a kinked line) before it lands in the medium body |
| 13 | **OKLab stroke OVER-compositing + within-stroke broken color** (the "pigment-not-grey" lever + its cost) | W13 | Open Question 1 (is Kubelka-Munk needed?) is a guess; the per-frame OKLab branch cost is unmeasured | A two-color overlap spike: render two complementary-hued curved strokes overlapping, composite with (a) linear mix, (b) OKLab lerp, (c) deferred KM `pigmentMix`, side-by-side; judge against the "pigment not grey" bar; instrument the per-frame GPU cost of the OKLab branch | small | GO iff OKLab-over reads as pigment (not grey) at an acceptable cost — RATIFIES whether KM is needed with evidence instead of a guess |
| 14 | **The PCG2D integer-bit hash + simplex gradient-noise leaf** (GLSL↔WGSL twin equivalence) | W12 | The net-new shared chunk is born-RED on a 1e-6 twin-equivalence gate; the integer-bit math must survive the transcription | Spike the PCG2D + simplex pair in both GLSL and a TS port; run the 1e-6 equivalence check over a witness coordinate set FIRST (before any medium integration); then bake the oil medium old-value-noise vs new-gradient-basis through the readPixels harness | spike | GO iff the twin-equivalence holds at 1e-6 AND the oil medium reads neutral (no regression) on the new basis. De-risks the gate the whole wave is born-RED on |
| 15 | **`device.lost` → WebGL2 teardown-and-reconstruct fallback** (the one genuinely-novel W14 deliverable) | W14 | The EXCISE branch is deletion-only; this is the one piece of real novelty if the wire-branch is taken | Prototype the `device.lost` subscription + the non-destroy guard + the WebGL2 reconstruct on the W00 device harness, with a test-only loss-injection hook (a deterministic non-destroy GPU loss is hard to force) | small | GO iff forced non-destroy loss → the surface re-binds `getContext('webgl2')` + keeps painting (non-black readback) AND a deliberate `device.destroy()` → NO fallback (no orphaned re-bind). Tied to the W14 wire-vs-excise ratify (if EXCISE, no PoC — deletion + WEBGPU_PARITY-stays-opt-in) |
| 16 | **Subtle-specular magnitude + blend-mode visual PoC** (the rest/hover/active rung triple) | W09 | The exact specular rung magnitudes + the `screen`-vs-`plus-lighter` blend over LIGHT surfaces are unvalidated (two consumers confirmed the resting-specular blowout); the rest-floor→0 is the single highest-value fix for a flat consumer | A live spike: drive the rest/hover/active rung triple over both light + dark surfaces; confirm the rest floor reads ≈0 (no white wash), hover/active read as a warm-cream specular not pure white; ratify the Card `specular` default = `subtle` (rest≈0) per §21's no-user-gate mandate | spike | GO iff rest≈0 (no resting blowout) + hover/active read warm-cream not white over both surfaces. Ratifies the calmer default (rest ≤ 0.25, radius ≤ 40%) |
| 17 | **Complex-graphs + xray-portal min-height/aspect-ratio live measurement** (the slides non-source-verifiable claims) | W31/W32 (+ slides H.W5/H.W8) | The genuinely-visual, non-source-verifiable slides claims (graph min-height, portal aspect-ratio) across the render matrix | Live-measure the complex-graphs + xray-portal min-height/aspect-ratio across the render matrix (3 viewports × the slide set); a PoC for the access-modal teleport color-scheme pin ONLY IF the lock is re-gated (the W31 RECOMMENDED path) | small | GO iff the graphs + portal hold their min-height/aspect-ratio across the matrix with no clipping/overflow |

---

## PART 2 — THE HARDENING BACKLOG (the un-ratified decisions + the forcing functions)

Grouped by class. The full coordination/DAG/gate/precept resolutions are pre-resolved as concrete
edits in `HARDENING.md §G`; this backlog records the RATIFY hinges + the soft-scope sharpenings that
are the forcing functions for those edits.

### 2A — Un-ratified decisions (the RATIFY hinges, with forcing functions)

- **W42 distinct-wave-vs-fold + second-consumer RATIFY** — **the one remaining open hinge.** W42
  (`useLiquidMorph`/`--morph-t`/`MorphGroup`) is no longer a charter-orphan: after `HARDENING §G`
  edit #3 it is enumerated in W33's terminal `dependsOn` and folded into AX.md's §1/§2 routing, and
  it appears in this doc's §1/§2 (PoC #4) + the DOCK-FACILITIES.md matrix (§19.3/§19.4/§19.11). What
  REMAINS un-ratified is the **distinct-wave-vs-fold** disposition + the **second-consumer** choice
  (PoC #4's forcing function: the substrate ships only when a real ≥2nd consumer reads BETTER off it).
- **W22 Fraunces font RATIFY** — USER-ADJUDICATED (the §5.3 ratify the charter marks user-gated);
  the autonomous lane does NOT self-ratify it.
- **W14 wire-vs-excise** — the WebGPU painterly multi-pass compositor; PoC #15 + the device-repro
  finding decide it. The autonomous default is Branch B EXCISE if no over-ride within the wave window
  (DISCHARGED-AS-EXCISE, substrate-without-consumer-with-rationale).
- **W23 glass-scrubber rename + W09 Card `specular` default** — ratified with PoC #16's evidence
  (specular default = `subtle`, rest≈0) per §21's no-user-gate mandate.

### 2B — DAG / disjointness fixes (pre-resolved in §G)

- The shared-file writer matrix (the lock manager keys on filename/selector, NEVER on `:NNN` line
  anchors — every shared-file line drifts the instant a co-writer lands first). The largest
  under-counts: `demo/stories/manifest.ts` (6 writers + W18 LAST), `tokens.css` (misses W17 + W20),
  `utilities.css`, `index.css` cascade. See `HARDENING §C.2`.
- The W19↔W35 latent near-cycle is RESOLVED by stage-typing (LAND vs PUBLISH vs CONSUME) — the only
  imprecise prose is AX.md line 1781 (drops the "PUBLISH" qualifier; an edge-extractor could
  synthesize a phantom cycle). Fixed in §G.

### 2C — Weak-gate / precept fixes (the cardinal GREEN-at-HEAD-ships-the-defect class)

The highest-priority sub-class — the exact AW headless-green/visually-broken failure re-entering
through AX's OWN gates: W18-RW2 (fabricated witness), W25a-RW2 (dir-existence vs class-strings),
W17-transitive-var (`light-dark()` re-admit through the neutral ladder), W08/W00 opaque-fraction band
contradiction, `proof:dock-animation-live`/`proof:deck-progress-rail`/`detectSliderHold` fail-open
gates. All pre-resolved in §G; PoCs #2/#9/#10 are the runtime de-risks that prove the rebuilt gates
bite.

### 2D — Soft-scope sharpenings

- §19.6 carousel-dock = **NON-GOAL + a W06 demo-section recipe** (resolved inline in
  DOCK-FACILITIES.md §1a — no dock-band wave owns it; a real 2nd consumer is the mint forcing
  function).
- §19.8 useIdle = **the inline `scheduleCollapse` resolution, owned by W26** (resolved inline in
  DOCK-FACILITIES.md §1b — leave inline, correct the charter wording, reconcile the 2000/2500ms
  divergence to one value; no net-new substrate without ≥2 consumers).
- §19.11 arbitrary-shape = **honestly narrowed** to the superellipse-k family (continuous) + discrete
  custom presets (snap) — PoC's GO/NO-GO is the forcing function (the web platform cannot continuously
  morph mismatched-topology clip-paths).
- §19.4 vertical = **RATIFY-BEFORE-IMPL build-vs-excise** — PoC #3's vertical arm + a named
  collapsible-vertical consumer decide it; else excise + the README strike.

### 2E — Cross-repo external blockers (the dirty-tree wall)

The dirty-tree wall is live + severe (muster 89 / words 23 / slides 17 / keyframes 14 / value 6
dirty; bbnf-playground absent). W28's R-clean gate-0, W34's bbnf-playground leg, and W30's
slides-baseline landing are externally blocked TODAY — not glass-ui dev work but un-ratified
preconditions dispositioned in `coordination/CONSTELLATION.md` (W28 the sole OPENER) before those
waves are assumed dispatchable. Per-leg eligibility: clean-NOW (speedtest, bbnf-buddy, fourier) vs
handoff-patch (muster, words, value.js, keyframes).

### 2F — Slides baseline staleness (HARDEN-SLIDES-0)

The L-band specs were authored against a stale snapshot (PoC #11). HARDEN-SLIDES-0 gates ALL L-band
driving: re-baseline the born-RED witnesses against current slides HEAD, set the branch protocol +
the merge-to-main → deploy terminal.

### 2G — π-lane readback-tier completeness (W00 backstop sufficiency)

The W00 π-lane must supply: the headless pixel-readback device (PoC #1), the deterministic dock-morph
drive (PoC #2), the DOM-cascade/`getComputedStyle` contrast-readback (shared by W09, W18, W23, W40),
and the `__springProgress`/exposed-field test-seam (shared by W01, W02, W10, W17). These are W00
dependencies, not per-band re-inventions.

---

## PART 3 — DRIVE-READINESS VERDICT

| Surface | Drives | Gated on |
|---|---|---|
| **Dock band** (W01-W06, W42) | prototype-first | W00 (PoCs #1/#2) → the single-scalar spike (#3) → the orchestrator/rail/morph PoCs; serial behind W01 |
| **Aurora band** (W07, W10-W14) | prototype-first | the real-Metal device (#1/#8) → the painterly-fidelity oracle (#9) + the stroke/color/noise leaves (#12/#13/#14); the W14 wire-vs-excise ratify |
| **Blob band** (W08, W15-W16) | prototype-first | the smin un-flood + lit droplet sweep (#10) |
| **Constellation** (W17) | prototype-first | the warp integrator (#5); the slides adoption is contingent |
| **Glass atoms** (W09, W20, W42 lens) | mixed | the lensing look + mechanism PoCs (#6/#7); the specular default ratify (#16) |
| **Primitives / storybook / encapsulation** (W18-W22, W25-W27) | drive-as-spec | bounded routine work (carves/splits/prunes/IA) — EXCLUDED from the PoC backlog; the gate fixes are §G |
| **Slides band** (W30-W32) | harden-first | HARDEN-SLIDES-0 (#11) — re-baseline before driving |
| **Cross-repo / close** (W28-W29, W33-W41) | precondition-gated | the dirty-tree wall (2E) dispositioned in CONSTELLATION.md; publish-currency-gated carries |

**The load-bearing sequencing law:** W00 first (proven on real devices) → the two ratification
hinges (W42 distinct-vs-fold, W22 Fraunces) → the device PoCs → the visual bands against a working
π-lane; cross-repo + slides waves are publish-currency-gated carries.
