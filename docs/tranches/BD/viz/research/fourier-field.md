# FourierField — BD research + brainstorm (the epicycle viz: GPU-only completion + interactivity expansion)

**Lane** BD viz-research / fourier-field · **Status** AUTHORED 2026-06-22 · **Branch** prototype/liquid-dock ·
**Substrate-grounded** against `src/components/custom/fourier-field/**` at HEAD + the BD union wave pool ·
**Scope** PLANNING/RESEARCH ONLY — zero `src/` edits. Write findings + return a summary.

> Read alongside: the shipped `fourier-field/README.md` (STALE — see §1), `fourier-field/math.ts` (the ONE
> DFT/epicycle math leaf), the BB.W-VIZ-FOURIER / BC.W-VIZ-FOURIER record in `PROCEDURAL-SUITE.md`, and the
> sibling `docs/tranches/BD/viz/research/aurora.md` (the doc-format precedent + the shared-wave-math thread).

---

## 0. TL;DR — the headline finding

**The "kill Canvas2D / GPU-only" mandate is ALREADY DONE for fourier-field — it shipped at BC.W-VIZ-FOURIER.**
The grep evidence: `useFourierField.ts` carries NO `useCanvas2D` import and NO `getContext("2d")`; the renderer
is a `createGpuSubstrate` picker over a **WebGPU compute + fullscreen-fragment SDF primary** (`*.compute.wgsl.ts`
writes the partial-sum curve + chain tips to storage buffers; `*.render.wgsl.ts` composites the field by analytic
SDF) with a **WebGL2 GLSL twin** fallback (`fourier-field.glsl.ts`, same SDF over the same CPU-minted tables).
The old PROCEDURAL-SUITE "DO NOT MIGRATE / `ctx.stroke` is the right tool / W-FOURIER-GPU booked" verdict is
**superseded** — the migration happened and the "thousands of phasors" trigger is partially obviated by the
storage-buffer SDF path (it already scales the curve to `MAX_CURVE_SAMPLES=384` samples and `MAX_PHASORS=64`
phasors on the GPU).

So the BD scope is NOT "migrate off Canvas2D." It is THREE remaining gaps:

1. **Doc/canon debt** — `README.md` + `PROCEDURAL-SUITE.md` still describe a retired Canvas2D 4-pass phosphor
   renderer with a `variant="hero"|"final"` prop that no longer exists. A reader is actively misled. (Cheap, must-do.)
2. **Interactivity is thin** — only the pointer-X-scrubs-`head_t` + flick-momentum atom is wired (via the shared
   `usePointerVelocityField`). The user mandate names "draw-your-own-path" and "drag the epicycles" — NEITHER is
   built. `dftFromPoints` ships (the forward DFT) but its only live consumer is the demo's CURATED shape library
   (ℱ/heart/star); there is no live freehand-trace → DFT → reconstruct loop.
3. **The shared wave-math thread is UNCONNECTED** — the user's cross-viz edict (concentric + paper-grid +
   dot-matrix all warp/perturb with the SAME wave-based math) does not yet reach fourier-field. The epicycle curve
   is a pure DFT sum with zero spatial warp; a SHARED perturbation field would tie it into the suite gestalt.

The configurator is already a real studio (source/harmonics/epicycles/arms/rainbow/trailArc/trailWidth/intensity/
harmonicScale/color + a `head_t` scrubber transport via `GlassTimeline variant="scrubber"`), but it has NO
draw-surface, NO epicycle-drag, and NO keyboard map. That is the robustness gap.

---

## 1. The shipped state (substrate-grounded, HEAD)

| Axis | What ships at HEAD | Source-of-truth |
|---|---|---|
| **Substrate** | WebGPU compute+fullscreen-fragment PRIMARY + WebGL2 GLSL fallback; `createGpuSubstrate` picker over the ONE `createCanvasLifecycle` leaf (offscreen-park, live-PRM freeze, consumer-owned DPR) | `useFourierField.ts`, `fourierFieldWGPUSetup.ts`, `fourierFieldGLSetup.ts` |
| **Math** | the ONE DFT leaf — `positionsAt` (epicycle chain), `partialSumAt` (truncated curve point), `dftFromPoints` (forward DFT), `comp`, `makeEllipticSpectrum` (seeded generative spectrum). Pure, Vue/DOM-free, on `/fourier-math` | `math.ts` |
| **Compute kernel** | `@compute @workgroup_size(64)` writes `curveSamples[i]` (comet body, per-sample AGE) + `chainTips[k]` (epicycle chain), pure `f(coeffs, head_t, N)`; WGSL transcription of `math.ts` round-tripped by `proof:fourier-field` U3 | `fourier-field.compute.wgsl.ts` |
| **Render pass** | fullscreen-triangle SDF: comet TRAIL (min-dist polyline, fwidth-AA, per-fragment age fade), epicycle ARMS+RINGS+JOINT DOTS (SDFs over chain tips), comet HEAD (halo+core+specular); premultiplied-alpha (kills the `lighter` hue-blowout the Canvas2D path fought) | `fourier-field.render.wgsl.ts`, `fourier-field.glsl.ts` |
| **Color** | shared `procedural-color.{wgsl,glsl}.ts` OKLCh ramp (the ONE color source; rainbow chain = hue-sweep over it, not a 2nd path); warm-cream `--viz-fourier` default identity | `constants.ts` `WARM_IDENTITY_PALETTE`, `proof:single-color-core` |
| **Clock** | the ONE `head_t ∈ [0,1)` advanced inside the substrate `onFrame` hook (NO 2nd rAF); freeze/PRM → deterministic `frozenT`; pointer scrub re-seats `head_t`; flick injects decaying momentum | `useFourierField.ts` `onFrame` |
| **Interactivity** | the shared `usePointerVelocityField` FED `tick(delta)` from `onFrame`: pointer-X → `head_t` scrub + flick → clock momentum. PRM keeps the scrub, drops the momentum (the `tick(0)` discipline) | `useFourierField.ts`, `usePointerVelocityField` |
| **Configurator** | `useConfiguratorState<FourierViewCfg>`: source (elliptic / curated ℱ/heart/star) · harmonics N · showEpicycles · epicycleArms · rainbowChain · trailArc · trailWidth · intensity · harmonicScale · color (warm/cool/violet `--viz-*`) + a `head_t` scrubber transport | `demo/stories/substrates/fourier-field.vue`, `presets.ts` (the `variant` bundle is RETIRED) |
| **Trace library** | `FOURIER_SHAPES` — ℱ wordmark (its own glyph, by its own DFT) / heart / star, each a closed point set → `dftFromPoints` → reconstructed by the same engine | `demo/stories/substrates/fourier-paths.ts` |

**The stale-doc debt (record it).** `README.md` says "renders on the **Canvas2D** substrate … DO NOT MIGRATE
now … booked successor W-FOURIER-GPU" and documents a `variant="hero"|"final"` prop + a 4-pass `lighter`-comet
Canvas2D renderer + a `clock` prop — ALL retired at BC. `PROCEDURAL-SUITE.md` carries the matching stale
"Canvas2D / DO NOT MIGRATE" row + the W-FOURIER-GPU named successor. `presets.ts` still exports the `hero`/`final`
`VariantPreset` bundle that nothing consumes. A BD wave must reconcile the canon (the user's no-legacy +
paint-first-not-source-green discipline applies to docs too).

---

## 2. The GPU-only picture — what "kill Canvas2D" means here (it's DONE; the residue)

The mandate is satisfied at the renderer. The residue:

- **The GLSL `MAX_CURVE_SAMPLES` mismatch (latent parity bug).** The WGSL render declares `MAX_CURVE_SAMPLES=384`;
  the GLSL fallback declares `#define MAX_CURVE_SAMPLES 256`. A consumer on the WebGL2 tail reads a SHORTER comet
  than a WebGPU consumer at the same `trailArc`. Not a Canvas2D issue but a GPU-only parity gap the migration left;
  worth a BD note (the `proof:fourier-field` ΔE bar may or may not catch a length delta at the tail).
- **`presets.ts` is dead weight** — the `VariantPreset` schema + the `hero`/`final` records have zero live consumer
  after the variant fold into config presets. The overfitting-audit law (≥2 sites or exported-or-private-demo)
  flags it: it is exported from `index.ts` but consumed by nothing. Prune or fold into the demo presets.
- **No Canvas2D anywhere to remove** — unlike aurora (the `getContext("2d")` raster ground) / constellation /
  dot-flow-field-fallback, fourier-field carries no 2D context. The migration sweep over-cuts nothing here.

**Verdict:** the GPU-only mandate is a DOC + PRUNE task for fourier-field, not a renderer rewrite. The real BD
value is the interactivity + shared-wave-math expansion below.

---

## 3. The interactivity audit (the gap-to-robust)

### What's wired
- **Scrub** — pointer X → `head_t` (left rewinds, right fast-forwards); the chain assembles/disassembles under the
  finger. Smoothed via `usePointerVelocityField.smoothedPosition`.
- **Flick momentum** — a fast flick injects `pointer.burst * 4.0` clock momentum, decaying back to ambient speed
  (the iOS fling-settle). PRM drops it.

### What's named by the mandate but ABSENT
- **Draw-your-own-path** — the user-verbatim ask. The forward DFT (`dftFromPoints`) ships and the demo proves the
  CURATED path → DFT → reconstruct loop (ℱ/heart/star), but there is NO live freehand draw surface: pointer-down →
  capture a stroke → close + resample → `dftFromPoints` → swap the live spectrum → watch the epicycles redraw YOUR
  curve. This is the killer interaction (3Blue1Brown's signature) and it is one wave away — all the math exists.
- **Drag the epicycles** — the user-verbatim ask. The chain tips are computed on the GPU; there is no inverse path
  to GRAB a phasor's tip and re-aim/rescale it (edit the coefficient → re-sum). This is harder (the coefficient
  edit must round-trip to the CPU-minted phasor table) but tractable.
- **Keyboard** — ZERO map. No arrow-key `head_t` scrub, no N+/N- (harmonic count), no space-pause, no digit-jump.
  The aurora/dock keyboard precedent (roving-tabindex, axis-derived arrows) is the model.
- **birthdaycolor.com-grade protagonist** — the field is recessive; a pointer near the curve does not bloom/attract
  the head, satellites don't spawn at the cursor, the curve doesn't lean toward the pointer.

### The robustness bar
A "robust configurator + mouse/keyboard interactivity" (the user's per-viz mandate) means: every config axis has a
control; the pointer has a PRIMARY gesture (scrub) AND a secondary gesture (draw / drag-phasor); the keyboard
mirrors the pointer; PRM degrades gracefully (keeps position reads, drops momentum/bloom). Today only the primary
pointer gesture + the config axes are met.

---

## 4. The shared wave-math thread (the cross-viz edict)

The user's binding cross-viz edict: **concentric + paper-grid + dot-matrix all warp/perturb with the SAME
wave-based math** (Gerstner/Tessendorf sum-of-sines + Bridson curl, the `flow.{glsl,wgsl}.ts` `curlFBM` chunk
aurora already consumes). fourier-field is NOT named in that list — but the gestalt-congruence bar (every wave
congruent to the design language) argues for a thin, OPTIONAL tie-in so the suite reads as ONE family:

- The epicycle curve is currently a pure rigid DFT sum (no spatial life beyond the rotation). A SHARED low-amplitude
  curl/wave perturbation applied to the SDF UV (not the math — the math stays exact for the teaching/draw use) would
  make the comet trail "breathe" the same way the grid bows and the rings flow. Default-OFF (the teaching curve must
  stay mathematically exact when you're learning); a `perturb` config axis opts the ambient face into the family
  breath. This is the `aurora.md` "shared wave-math" thread reaching fourier-field.

---

## 5. The novel ideas (10 — each: idea · SOTA anchor · Safari-fence · falsifiable bar)

### Interaction-first (the mandate headline)

**I1 — Draw-your-own-curve (the freehand DFT loop).** Pointer-down on the interactive face captures a stroke;
on release, close + arc-length-resample (the `fourier-paths.ts` `recenterUnit` + `sampleClosed` idiom, already in
the demo) → `dftFromPoints` → swap the live spectrum → the epicycles redraw YOUR curve, assembling term-by-term as
N climbs. *SOTA:* 3Blue1Brown "But what is a Fourier series" — the canonical interaction. *Safari:* pure pointer
events + CPU DFT + the existing upload path; zero WebKit gap. *Bar:* a captured stroke (a hand-drawn "S") round-trips
through `dftFromPoints` → `partialSumAt` and the reconstructed curve's Hausdorff distance to the input stroke is
< ε at full N (a π that draws, transforms, reconstructs, and measures the fit).

**I2 — Drag a phasor tip (live coefficient editing).** Grab the tip of any chain arm; the drag re-aims + rescales
that phasor's coefficient (the inverse of `positionsAt` at that link); the curve re-sums live. A "reset to spectrum"
restores. *SOTA:* the epicycle-editor genre (Mathologer / interactive DFT toys). *Safari:* pointer-capture +
hit-test the chain-tip storage buffer read back (or hit-test CPU-side against the same `positionsAt` chain — cheaper,
no GPU readback). *Bar:* dragging arm k changes ONLY `coefficient[k]` (the others byte-identical), and the curve point
at `head_t` equals `partialSumAt` of the edited table (a π that drags + asserts the single-coefficient delta).

**I3 — Keyboard map (the pointer mirror).** Arrow L/R scrub `head_t`; Arrow U/D nudge N (harmonic count); `+`/`-`
speed; Space pause/resume; digits 1-9 jump `head_t` to k/10; `R` reset/reseed. Roving-tabindex-clean, axis-derived.
*SOTA:* the glass-ui dock/tabs keyboard contract (already canon). *Safari:* native keydown; no gap. *Bar:* every
mapped key changes the asserted state (a π exercising each key + reading the resulting `head_t`/N/paused).

**I4 — Pointer-attract protagonist (birthdaycolor-grade life).** When the pointer nears the curve, the comet HEAD
blooms (radius/glow up) and the curve leans a sub-perceptual amount toward the cursor (a soft UV bias in the SDF,
NOT a math edit). The accel term (already derived in `usePointerVelocityField`) drives the bloom; PRM freezes it.
*SOTA:* aurora's cursor-as-light bias + the birthdaycolor protagonist register (`aurora.md` §5). *Safari:* SDF
fragment bias, no filter; safe. *Bar:* a flick spikes the head-glow alpha and decays it; a static control field shows
0 response (the captured interaction DELTA).

### Math/render register

**I5 — The term-by-term ASSEMBLE animation (watch it sum).** A transport mode that sweeps N from 1 → full over a few
seconds, the curve growing from a single ellipse to the full reconstruction while the chain grows arms — the
reference "watch it build" beauty, on the SAME `partialSumAt` truncation axis the harmonics slider already drives.
*SOTA:* the 3B1B partial-sum animation. *Safari:* uniform N animated CPU-side, no gap. *Bar:* at N=1 a single
ellipse SDF; at full N the complete curve; a π samples the intermediate N frames and asserts monotone curve-complexity.

**I6 — Phase-portrait / harmonic spectrum overlay.** An opt-in side panel rendering the |c_k| amplitude bars (the
spectrum the curve reconstructs) synced to the curve — drag a bar to rescale that harmonic (the I2 inverse from the
spectrum side). Makes the abstract DFT legible. *SOTA:* DAW/EQ spectrum editors + DFT teaching figures. *Safari:* a
second small fragment pass or a DOM bar chart; safe. *Bar:* the bar heights equal `|coefficient[k]|` and a bar drag
mutates the matching phasor (shared with I2).

**I7 — Shared-wave breath (the suite tie-in, §4).** An optional default-OFF curl/wave UV perturbation on the SDF so
the ambient comet "breathes" with the same `curlFBM` math the grid + rings + dot-matrix use — fourier-field joins the
family gestalt without losing the exact teaching curve. *SOTA:* Bridson curl-noise (the shared `flow` chunk). *Safari:*
fragment UV warp, no gap. *Bar:* `perturb=0` is byte-identical to today (the no-op floor); `perturb>0` reads as a
gentle breath while the curve TOPOLOGY (the SDF zero-set ordering) is preserved.

**I8 — Comet-as-glass (the liquid-glass identity).** Render the comet head + trail with the library's specular/rim
language (the `--glass-accent` per-instance chromatic-rim seam) so the viz reads as the SAME liquid-glass material as
the dock — a lensing comet head over the field. *SOTA:* the glass-ui W-LENSING / W-GLASS-ACCENT seams. *Safari:* the
SDF already does halo+core+specular; this re-tints them off the glass tokens — no backdrop-filter, safe. *Bar:* the
head specular reads the `--glass-accent` hue when set; warm-cream identity at the default.

### Configurator / studio polish

**I9 — Live source-swap morph (OKLCh + spectrum interp).** Switching source (elliptic → ℱ → heart) MORPHS the
spectrum coefficient-by-coefficient (lerp the `c_k` tables) so the curve fluidly transforms between shapes instead of
hard-cutting — the `BD.W-SEED-MORPH` aurora idiom applied to the phasor table. Pad the shorter table with zeros.
*SOTA:* the seed-morph crossfade register. *Safari:* CPU coefficient lerp, no gap. *Bar:* a source switch produces a
frame-series where intermediate frames are valid partial curves (not a pop); the endpoints byte-match the targets.

**I10 — The "thousands of phasors" stress register (the original W-FOURIER-GPU trigger, now reachable).** Because the
renderer is already a storage-buffer SDF, the original booked trigger (dense spectra where `ctx.stroke` lost) is now
cheap — widen `MAX_PHASORS` (a storage-buffer bump, the constants note already flags it as cheap) and add a "fine
detail" preset tracing a complex glyph at 200+ phasors. *SOTA:* the W-FOURIER-GPU booking, now buildable. *Safari:*
storage buffer + compute (WebGPU) / uniform array cap (WebGL2 — the fallback caps at the tail's lower bound, recorded).
*Bar:* a 128-phasor trace renders at the budget on WebGPU; the WebGL2 fallback caps gracefully with a recorded degrade.

---

## 6. The dispatch + sequencing fences

- **Must-do (cheap, no-legacy discipline):** reconcile `README.md` + `PROCEDURAL-SUITE.md` (kill the Canvas2D /
  `variant`/`clock` prose + the W-FOURIER-GPU "do not migrate" row) and PRUNE `presets.ts` (dead `VariantPreset`).
  Fix the GLSL `MAX_CURVE_SAMPLES` 256-vs-384 parity gap. These are doc/prune, zero renderer risk.
- **Headline interaction wave (the mandate):** I1 (draw-your-own) + I2 (drag-phasor) + I3 (keyboard) as ONE
  "interactivity-robust" wave — all three share the CPU coefficient round-trip + the existing pointer host; gated
  `config.interactive`; PRM-degraded.
- **Protagonist + studio polish:** I4 (pointer-attract) + I5 (assemble) + I9 (source-morph) — the birthdaycolor-grade
  life + the "watch it sum" beauty.
- **Suite tie-in (optional, default-OFF):** I7 (shared-wave breath) + I8 (comet-as-glass) — congruence to the family
  gestalt; never break the exact teaching curve.
- **Deferred trigger (now reachable):** I10 (thousands of phasors) — the original W-FOURIER-GPU trigger, cheap on the
  storage-buffer SDF; build IF a dense-glyph register is wanted.

**Binding fences (all ideas):** Safari-first (no `backdrop-filter:url()` — the SDF/specular paths are WebKit-safe);
warm-cream library identity default + presets-in-consumers (no teal/cool token leak); compositor-only on the host
(the canvas owns the GPU); PRM keeps position reads, drops momentum/bloom; the ONE math leaf (`math.ts`) is the only
DFT source — no second evaluator; the ONE `head_t` clock (no 2nd rAF). Every idea has the round-trip `proof:fourier-field`
math bar as its correctness floor.

---

## Sources
- `src/components/custom/fourier-field/**` (HEAD) — the migrated GPU substrate, the `math.ts` DFT leaf, the WGSL/GLSL SDF.
- `docs/tranches/BD/viz/research/aurora.md` — the sibling doc format + the shared-wave-math + birthdaycolor protagonist threads.
- `src/components/custom/PROCEDURAL-SUITE.md` — the suite discipline + the (stale) fourier no-migrate row.
- 3Blue1Brown "But what is a Fourier series / drawing with circles" — the canonical draw-your-own-curve interaction.
- The shipped `usePointerVelocityField` + the dock/tabs keyboard contract — the interactivity precedents.
