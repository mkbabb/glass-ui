# D-VIZ PASS-1 — the interaction-physics layer for the procedural substrates

Pass-1 synthesis of the four family returns (VIZ-A one-field-core · VIZ-B per-medium-physics · VIZ-C simulation-service · VIZ prior-art/aurora-color). This is the binding pass-1 design document: the verdict table, the composed architecture, the retirement map, the open-gap register (the convergence blockers pass 2 MUST close), and the pass-2 prototype slate.

## §0 Problem + fixed mandates

The procedural substrates (aurora, goo-blob, fourier-field, constellation) need ONE interaction-physics layer done right:

- fourier-field "should follow your cursor to be biased in that direction, more subtle, and gracefully fourier draw towards that"; velocity/acceleration must influence it; its perf is "god awful" — the physics design must also fix the perf model.
- goo-blob interaction is "not smooth, intuitive, or robust"; needs weighted/biased pull + satellite-blob demos.
- ALL background vizzes on any demo page must be interactive.
- all auroras need "slightly more vibrant and interesting colors" + a setting-sun preset (pink notes) + proper interactability + a larger studio canvas.
- constellation demos are duplicative.

FIXED (not relitigated here): dot-flow-field, concentric, dot-matrix are DELETED. Their `usePointerVelocityField` consumption retires WITH them; the surviving field-consumer compat set is aurora + goo-blob + fourier-field + constellation + `src/components/custom/liquid-grid/composables/useLiquidGrid.ts` (smoothedPosition/velocity/burst) + `src/components/custom/dock/composables/useDockFission.ts` (speed).

## §1 Synthesis summary — the leading composition

All four returns converge on the same source-verified diagnosis: **the grammar already exists, the architecture is split-brain.** `src/composables/motion/usePointerVelocityField.ts` (root barrel + `/motion-core`, vue-only, tick(dt)-fed, PRM=tick(0)) already exposes the full 4-verb prior-art grammar (follow · velocity-warp · impulse/burst · acceleration-push). The defects are:

1. **DUAL-PATH**: aurora runs BOTH `cursorModel.ts` AND the field (`runtime.ts:200-211,340-410`); goo-blob runs BOTH `useBlobPointer.ts` AND the field.
2. **DOUBLE-SMOOTH**: `useMetaballRenderer.ts:254` feeds the field the ALREADY-SpringProgress-smoothed position, so velocity is the derivative of a smoothed signal — compound lag = the "not smooth, intuitive" complaint, verbatim.
3. **BACKGROUND-DEAD**: full-bleed background vizzes are `pointer-events: none` + `FourierField.vue:78` explicitly forces `interactive=false` on background mounts — they can NEVER receive pointermove by construction.
4. **FOURIER OVER-CORRECTION**: BD shipped a subtle correct-feeling lean (`FOLLOW_LEAN=0.12`) with two math bugs (no y-invert, no aspect correction); BG (HEAD) fixed the math but threw out the subtlety (`FOLLOW_REACH=0.7` — a centroid teleport, precisely NOT the ask).
5. **FOURIER PERF**: attribution is CONTESTED across families (fullscreen per-pixel SDF loops vs per-frame CSS-var restyle vs per-frame `computeFourierFit`) — the fix shape is gated on a pass-2 trace (G1).

The leading composition (the hybrid, layer by layer):

- **Layer 0 — the evolved field core (VIZ-A spine + prior-art authoring).** Evolve `usePointerVelocityField` IN PLACE, additively: `engagement` (smoothed active-envelope 0..1) + `attractor`/`attractorVelocity` (a hand-rolled 2nd-order semi-implicit-Euler mass-spring-damper channel — hand-rolled, NOT keyframes, to keep the root-barrel keyframes-free fence) + `{mass, damping ζ, leadGain, restAnchor}` options + **halfLifeMs authoring** (the Driscoll/Holmer lesson: expose feel as half-life, derive k internally). Every existing output byte-frozen. Allocation-free hot path (mutate plain structs, refs only for template binding).
- **Layer 0.5 — the route pointer broadcaster (VIZ-C harvest).** `useRoutePointer` — ONE passive capture-phase window `pointermove` per route, provide/inject, viewport-normalized, PRM+paused-gated. The only structural answer to the backgrounds-interactive mandate (a `pointer-events:none` Teleport-to-body canvas cannot listen for itself).
- **Layer 1 — pure per-viz mappings (VIZ-A pattern, VIZ-B semantics).** Small pure functions in `src/composables/motion/pointerFieldMappings.ts` (no DOM, no rAF, unit-testable), whose BODIES carry VIZ-B's per-medium models: fourier = tangent draw-bias + restored ~0.15 lean with the corrected math; blob = heavy-mass weighted pull (ζ≈0.78-0.85 overshoot) + velocity-lead + accel-stretch + satellite wake-drag; aurora = cursorMapping replacing `cursorModel.ts` onto the existing `uCursor*` uniforms; constellation = well/burst mapping over its kept per-node integrators.
- **Render perf — fourier geometry-ribbon (VIZ-B) + restyle kill (VIZ-C), both gated on the G1 attribution trace.**
- **Color — config-level vibrancy + demo-local setting-sun (prior-art candidates A/B/C).** Zero shader edit; presets-in-consumers.

Sharing STOPS at the field + mappings. No simulation service, no shared clock, no particle-pool bus, no second rAF — VIZ-C's own adversarial review is adopted as a recorded fence.

## §2 Verdict table

| Family | Verdict | Why |
|---|---|---|
| **VIZ-A "one field core"** | **ADVANCE** (the architecture spine) | The dual-path/double-smooth diagnosis is source-verified at exact lines; the additive engagement+attractor evolution + pure-mapping pattern is the only return that retires all four legacy pointer models onto one vocabulary with a byte-frozen compat story. Residual risk = feel-parity of the hand-rolled integrator (G2). |
| **VIZ-B "per-medium physics"** | **ADVANCE** (per-medium semantics + render perf) | The fourier archaeology (BD `FOLLOW_LEAN=0.12` subtlety vs HEAD `FOLLOW_REACH=0.7` teleport) + the tangent-aligned DRAW-BIAS is the only mechanism that delivers "gracefully fourier-DRAW toward" (the curve draws toward the cursor) rather than translate-toward; the geometry-ribbon is the strongest fourier perf candidate. Its "sharing stops at the raw layer" stance is honored: the shared core carries dynamics only, the mappings carry the medium. |
| **VIZ-C "simulation service"** | **RETIRE the service framing** (self-rejected — correctly) **+ named HARVEST** | A stateful shared clock/pool either owns a second rAF (proof:offscreen-pause violation) or hides which-canvas-drives-the-clock coupling, for a 1-subscriber-per-route reality (one-GL-context-per-route). HARVESTED into the composition: `useRoutePointer` (load-bearing for the backgrounds mandate), the fourier `--ff-head-xy`/`--ff-head-hue` per-frame `setProperty` restyle finding, the aurora `uniformBridge.ts` uCursor* wiring map + flow/wake atom rewire. Its SpringProgress-INSIDE-the-field variant is REJECTED — it violates the root-barrel/`/motion-core` keyframes-free fence. |
| **VIZ prior-art + aurora color** | **BANK** (the binding constraint-source; re-trigger: every pass-2 tuning session + any future palette wave re-reads it) | Not a mechanism family — a research lane whose outputs are ADOPTED as constraints: the halfLifeMs authoring model, the subtlety bounds (background influence 2-6% of field, follow half-life 90-160ms, velocity tail 200-300ms, burst tail ~850ms, velocity clamp + dead-zone kept), the setting-sun OKLCH candidates A (default) / B / C, and the vibrancy moves (chroma into the 0.13-0.20 warm band + a second accent hue). No standalone prototype. |

**Hybridization (exact):** A's core evolution + A's mapping-fn pattern × B's mapping bodies (fourier draw-bias/lean, blob weight/lead/wake-drag) × B's geometry-ribbon ⊕ C's restyle-kill (G1 decides the mix) × C's `useRoutePointer` × prior-art's constants + palettes. The double-smooth kill is UNCONDITIONAL (raw pointer feeds the field once, one smoothing stage); whether the blob's SpringProgress retires onto the core attractor is CONDITIONAL on the G2 parity probe.

## §3 The composed architecture (mechanism level)

### 3.1 Layer 0 — the evolved field core

File: `src/composables/motion/usePointerVelocityField.ts` (evolve in place; additive; every existing output byte-frozen — smoothedPosition stays the 1st-order lerp, velocity/speed/acceleration/burst curves unchanged for a fixed trace).

New channels:

- `engagement: Ref<number>` — smoothed active-envelope: ramps toward 1 while `active`, decays to 0 on leave (`engagementRise`/`engagementFall` time-constants). Folds aurora's strength ramp, blob's active-bool cliff, fourier's active-gate onto one graceful ramp. **Park contract (G3):** every demand-loop predicate (`isAtRest`, `needsAnimation`, `cursorIsLive`) gates on `engagement < ε && speed < ε && burst < ε`, never `== 0`.
- `attractor` + `attractorVelocity: Ref<PointerVec2>` — a 2nd-order semi-implicit-Euler mass-spring-damper: `a = -ω²(x-target) - 2ζω·v; v += a·dt; x += v·dt`, with `target = lerp(restAnchor, position, engagement)` (rest-returns on leave, no snap) and the burst coupling in as an impulse LEAD: `target += burst · normalize(velocity) · leadGain` — a fast flick throws the attractor slightly PAST the pointer, then settles ("faster movements influence this" + the graceful overshoot). ω derives from `response·√mass` — the SAME (response, dampingFraction) convention already hand-rolled in `constellationInteraction.ts` warpStep / `constellationWell.ts` stepWell / `useFourierField.ts` settleMomentum / `useBlobPointer.ts` pulse. No second ω-formula is minted. HAND-ROLLED, not keyframes — the core lives on the root barrel + `/motion-core`, which are keyframes-free (the constellation FORBID-useSpring precedent; VIZ-C's SpringProgress-in-the-field is fence-violating and rejected).
- Options: `{ mass, stiffnessResponse, damping (ζ), restAnchor: () => Vec2, engagementRise, engagementFall, leadGain }` + **`halfLifeMs`** re-parameterization for the existing lerp constants (author-facing; k derived internally via `1 - 2^(-dt/halfLife)`; the current `positionLerp 0.22` ≈ 46ms and `velocityLerp 0.30` ≈ 32ms are documented as the snappy-crisp baseline; the graceful register targets 90-160ms). All defaulted so a bare call is byte-identical to today.
- Allocation-free hot path: the tick mutates plain non-reactive structs in place (verified: no consumer `watch()`es a field ref; all reads are imperative in onFrame), refs exposed for template binding only.

Kept disciplines: zero own rAF (fed `tick(dt)` from each renderer's `createCanvasLifecycle` onFrame), PRM = cached-matchMedia tick(0) deterministic freeze + PRM-gated setPointer write, velocity CLAMP (the cursorModel `0.12`/move teleport guard generalizes in) + speed DEAD-ZONE (micro-jitter never warps).

### 3.2 Layer 0.5 — the route pointer broadcaster

File (NEW): `src/composables/motion/useRoutePointer.ts`. ONE passive capture-phase window `pointermove` listener per route (capture survives child `stopPropagation`), normalizes to viewport coords (fixed full-bleed canvas = viewport space, no scroll offset), provide/inject; the live background viz reads it and feeds its own `field.setPointer(x, y)`. NEVER `preventDefault`, never focuses, never steals a click — a pointer SOURCE, not a clock. Gated on PRM AND the substrate's paused flag (the WCAG-2.2.2 DockBackgroundToggle seam must silence the feed too, not just the render).

Consumer wiring (demo, no src paint): `demo/.../StoryHero.vue` threads the broadcaster into its full-bleed background vizzes. `FourierField.vue:78`'s hard `interactive=false` background gate flips to a SUBTLE-interactive register — the prior-art background bounds (influence ~2-6% of the field, longer half-life) as the background default; the canvas stays `pointer-events: none`.

### 3.3 Layer 1 — per-viz mappings

File (NEW): `src/composables/motion/pointerFieldMappings.ts` — four pure functions (no DOM/rAF/state; unit- and byte-testable). The bodies are VIZ-B's per-medium models:

- **`fourierLeanMapping(field, fit, aspect)`** → `{ leanX, leanY, biasRate, scrubRate, flingBurst }`. TWO DECOUPLED channels replacing the conflated centroid-translate:
  1. **Directional DRAW-BIAS** (the headline): modulate the clock phase-rate by the alignment of the head's travel tangent with the cursor direction — `rate = baseRate · (1 + BIAS_GAIN · clamp(dot(headTangent, unit(cursor - head))))`; the curve advances a hair faster when drawing toward the cursor, slower away — it "gracefully draws toward" WITHOUT moving the figure. `headTangent` is a free byproduct of `partialSumAt` at t and t+ε. `BIAS_GAIN ≤ 0.15` (G6 legibility sweep).
  2. **Subtle LEAN** (restore BD, keep HEAD's math): bounded centroid lean at `FOLLOW_LEAN ≈ 0.12-0.18` WITH the HEAD-era y-invert + aspect/scale correction — take the correct math from HEAD's `getPointerLean`, drop the magnitude from 0.7. `constants.ts` `FOLLOW_REACH=0.7` retires.
  3. Velocity swells head/ribbon width sub-perceptually; accel injects a transient bias impulse via the KEPT clock-momentum spring (`SETTLE_OMEGA/ZETA` in `useFourierField.ts` — a 1-D clock-rate concern the core doesn't own). Scrub stays `velocity.x · SCRUB_GAIN`.
- **`blobPullMapping(field, geom)`** → `{ px, py, vel, stretch, decelTrigger }`. Heavy-mass attractor (mass ≈ 1.6, ζ ≈ 0.78-0.85 — the slight overshoot IS the weight; HEAD's ζ=1.0 critical damping is why the blob reads weightless), target = cursor + `LEAD_K · pointerVelocity` (leads toward where the cursor is heading — "biased in that direction"), accel adds a transient stretch along the motion axis (pseudopod elongates on a flick). The [0,1]→[-1,1] remap lives in the mapping. Raw pointer feeds the field ONCE — the `useMetaballRenderer.ts:254` double-smooth dies unconditionally. KEEP blob-local: the click-pulse oscillator, the TRAIL ring buffer (now fed attractor history), the SDF hit-test (geometry gate feeding `field.active`; G7 adds boundary hysteresis + gates the velocity-lead to hit-test-inside).
- **`auroraCursorMapping(field, cfg)`** → `{ cx, cy, strength, vel, burst }`: cx/cy = attractor, strength = `engagement · cfg.strength`, vel/burst pass through. Replaces `cursorModel.ts` (`advanceCursor`/`injectCursorVelocity`/`CursorState`) entirely; the `runtime.ts` half-migration retires. The shader path already exists — `uniformBridge.ts` ships `uCursor/uCursorStrength/uCursorRadius/uCursorVelocity/uCursorBurst` + `uFlowPattern/Focal/Angle/Curl` — so aurora interactability is a WIRING gap, zero shader edit (the GL fence holds). The excised-as-unwired `flow`/`wake` interactivity atoms (`atoms.ts`) get the wire-or-excise decision closed on the WIRE side under this mapping (pass-2 confirms scope). The WebGPU wake ping-pong velocity texture stays a BOOKED refinement (WebGPU-only; the honest degrade is the CPU burst term — present-but-simpler, fails loud-soft).
- **`constellationWellMapping(field)`** → `{ wellX, wellY, wellStrength, fireBurst }`: position/engagement/burst≥threshold. KEEP `constellationWell.ts` + `constellationInteraction.ts` well/warp/wander integrators — per-NODE forces, not pointer smoothing.
- **Satellites (the satellite-blob demo ask):** `satelliteKinematics.ts` + `useBlobSatellites.ts` KEPT pure; wake-drag = bias each satellite's orbit CENTER by a decaying fraction of `field.velocity`, threaded as PARAMS into the pure leaf (no state enters it — G12). Demo surface: an N-satellite orbit + fission/merge + wake-drag tile.

### 3.4 The fourier render-perf fix (gated on G1)

Three contested attributions, ALL plausibly real, must be apportioned by trace before committing the fix shape:

- (a) **Fullscreen per-pixel SDF** (VIZ-B): `fourier-field.render.wgsl.ts fs_main` + `fourier-field.glsl.ts` run a 256/384-sample curve loop (nested ×64 phasors with epicycles on) per PIXEL over 100% of the canvas while the ribbon covers <5% — O(pixels × 512..24K)/frame. (VIZ-A claims the WGSL primary precomputes the polyline in a compute pass and only the GLSL fallback loops — a direct source contradiction with VIZ-B; pass 2 reads both shaders.)
- (b) **Per-frame CSS-var restyle** (VIZ-C): `FourierField.vue:179/:197` write `--ff-head-xy` + `--ff-head-hue` via `el.style.setProperty` EVERY frame — a per-frame main-thread style-recalc bridge.
- (c) **Per-frame CPU recompute** (prior-art): `useFourierField.ts:221` runs `computeFourierFit(spectrum)` every frame + a per-frame compute dispatch on the WGPU path.

The fix set, applied per attribution: (a) → **geometry-ribbon**: build a ≤512-vertex instanced triangle-strip from the ≤256 CPU-evaluated trail samples (`partialSumAt` already yields them) + ≤64 instanced epicycle primitives; trivial loop-free fragment over covered pixels only; ships on BOTH engines (instancing is WebGL2-core, Safari-honest); the fullscreen-SDF fs bodies RETIRE wholesale; the draw-bias becomes free (bias the CPU sample eval, upload biased vertices). (b) → epsilon-change throttle or move head-tracking to a shader uniform channel (kills the JS→style bridge). (c) → hoist the fit out of the frame loop (recompute on spectrum/config change only) + `resolveBudgetDpr` clamp. The physics layer itself is NOT the hog (~20-30 flops/frame) — it stays a uniform-feeding push-tick either way.

### 3.5 Aurora color — vibrancy + setting-sun

- **Vibrancy (all auroras, config-level, ZERO shader edit):** lift the pale presets' chroma into the 0.13-0.20 warm band (the vivid presets already live there); engage the existing chroma-floor scaffold (`DEFAULT_VIVIDNESS`/`VIVID_TARGET`, `src/components/custom/aurora/constants/presets.ts`); "interesting" = a SECOND complementary-warm accent hue per palette (the DAWN-lilac / SUNSET-rose model) — a monochrome ramp reads flat.
- **Setting-sun preset:** DEMO-LOCAL (`demo/stories/substrates/aurora/presets.ts` — presets-in-consumers; never a library token). Closest existing: `OILPASTEL_SUNSET` by palette (wrong medium register), `OPENAI_DAWN` by usable-background shape. Ship smooth-medium, three OKLCH candidates (prior-art, converted from real references):
  - **A "Setting Sun" (default, safest):** `[{L:.52,C:.15,h:32}, {L:.66,C:.145,h:12}(rose sun-core — THE pink note), {L:.78,C:.135,h:55}, {L:.87,C:.11,h:82}, {L:.93,C:.045,h:78}]` — hues 12-82 all warm.
  - **B "Dusk":** stronger coral-rose + ONE low-chroma dusk-lilac top stop (`C 0.075, h 320` — whisper twilight, warm mass dominates).
  - **C "Vivid Setting Sun":** the "slightly more vibrant" delivery — two pink/coral notes, chroma to 0.175, still all-warm.
  - Composition: warm nuclei biased LOW (y 0.6-0.9), pale stop up top (y≈0.2), horizon glow horizontally elongated (elongation ≈2, angle 0 — a sun-BAND, not a blob), softmaxBeta ≈3.0, nucleiDrift 0.015-0.03.
- **Studio canvas:** `AuroraStage.vue`/`VizStudio.vue` max-width/height layout bump — demo-only, low-risk.

### 3.6 Demo surfaces

- Satellite-blob demo tile (wake-drag + fission/merge) — §3.3.
- Backgrounds-interactive wiring in StoryHero via `useRoutePointer` — §3.2.
- **Constellation demo dedup is UNOWNED by every family** (G10): pass 2 must census the constellation demo surfaces in `demo/stories/`, name the duplicative set, and record the collapse/retire plan (a decision artifact, not a prototype).

## §4 Retirement map (clean breaks, no aliases)

| Artifact | Disposition |
|---|---|
| `src/components/custom/aurora/composables/cursorModel.ts` | RETIRE onto core + `auroraCursorMapping` (frame-locked lerp, not dt-normalized, no accel term — the crudest fork; the CLAUDE.md "booked successor IFF byte-faithful" clause FIRES here: this greenfield IS the successor). |
| aurora `runtime.ts` dual-path (`:200-211,340-410`) | RETIRE — one field, one smoothing stage. |
| `useBlobPointer.ts` raw-pointer re-implementation (own listener/normalize/PRM path, ~60L) | RETIRE — compose the field for raw dynamics. |
| `useBlobPointer.ts` SpringProgress x/y follow | CONDITIONAL retire onto the core attractor — decided by G2 feel-parity; if parity fails, the spring stays viz-local but is fed RAW pointer (the double-smooth dies either way). |
| `useMetaballRenderer.ts:254` smoothed-position re-feed | RETIRE unconditionally (the double-smooth). |
| `fourier-field` fullscreen-SDF fragment bodies (`.render.wgsl.ts` fs_main + `.glsl.ts`) | RETIRE onto geometry-ribbon, gated on G1. |
| `constants.ts FOLLOW_REACH=0.7` | RETIRE → `FOLLOW_LEAN ≈ 0.15` with HEAD's corrected y-invert/aspect math. |
| `FourierField.vue:78` background `interactive=false` gate | RETIRE → subtle-interactive background register. |
| KEEP untouched | `useCursorInteraction.ts` (nucleus CRUD authoring), blob pulse/trail/SDF hit-test, `satelliteKinematics.ts` + `useBlobSatellites.ts`, constellation well/warp/wander integrators, `useDockFission.ts` + `useLiquidGrid.ts` reads (byte-frozen outputs), the GL shaders for aurora/blob (fence absolute). |

## §5 Open-gap register (the pass-2 convergence blockers)

- **G1 — Fourier perf attribution is CONTESTED (3 diagnoses + a WGSL source contradiction).** Closing probe: chrome-devtools performance trace on `/substrates/fourier-field` (main-thread style/recalc vs GPU time; toggle the `--ff-head-*` setProperty writes off and re-measure; `EXT_disjoint_timer_query_webgl2`/DPR-sweep for fragment cost) + READ both shader sources to resolve the VIZ-A-vs-VIZ-B WGSL claim. The fix shape (ribbon vs restyle-kill vs fit-hoist vs all three) commits only on the apportioned numbers.
- **G2 — Attractor feel-parity vs keyframes SpringProgress.** Drive one synthetic trace (step + flick) through both; overlay position/velocity frame-series; accept within a small band at mass≈1.6/ζ≈0.85 (tune ω = response·√mass). Decides the blob spring retirement (§4).
- **G3 — Engagement-vs-park.** The smoothed envelope never reaches exactly 0; every demand predicate must ε-gate; verify a parked offscreen viz attaches ZERO frames after hover ends (trace frame-count → 0).
- **G4 — Byte-frozen output compat.** dock-fission (speed) + liquid-grid (smoothedPosition/velocity/burst) + fourier reads unchanged: fixed-trace before/after regression on every existing output curve; plus the allocation-free claim (heap snapshot: 0 steady-state alloc/frame).
- **G5 — Ribbon visual parity** (conditional on G1 choosing the ribbon): round joins/miters, underglow band width, head-glow alpha, AA feathering vs the SDF look — diff-captures at 3 frozen-T frames, both modes.
- **G6 — Draw-bias legibility.** Tangent-aligned rate modulation can read as speed-stutter; live BIAS_GAIN slider, head-approaching-fixed-cursor frame-series from 3 tangent angles; find the intentional-not-stuttering gain (expected ≤0.15).
- **G7 — Blob edge robustness.** ζ<1 overshoot + velocity-lead near the SDF boundary risks engage-flicker (worsening "not robust"): damping+LEAD_K sweep over a scripted fast diagonal flick + slow edge-hover; measure active-toggles/sec + overshoot amplitude; add hit-test hysteresis; gate the lead to hit-test-inside.
- **G8 — Broadcaster correctness.** Capture-phase survives child stopPropagation; viewport coords map to the fixed canvas across scroll; the feed silences under BOTH PRM and the substrate paused flag; zero click/scroll theft over live content. Chrome + Safari.
- **G9 — Vibrancy/palette vs identity + AA.** Each candidate composited behind the real warm-glass plate at the vividness floor: mean OKLab chroma/hue reads warm-sun-with-pink not pink-field (mean C ≥ ~0.045, no grey wash); a caption over the busiest interactive frame clears AA/APCA in both modes (else vibrancy is bounded by the bright-bucket darken headroom).
- **G10 — Constellation demo dedup is UNOWNED.** No family enumerated the duplicative set. Pass 2 censuses the constellation demo surfaces and records the collapse plan (retire set + surviving demos).
- **G11 — Acceleration robustness on Safari.** The 2nd derivative of an event-driven signal spikes on Safari's under-delivered coalesced pointermove; log accel over slow-drag + flick on both engines; verify decel-detect fires on genuine flick-release only (stronger dead-zone / longer accel half-life if not).
- **G12 — Satellite wake-drag purity + surface.** The orbit-center bias must thread as params into the pure `satelliteKinematics.ts` leaf (no state enters it); the satellite demo tile needs a named home.
- **G13 — PRM unification regression.** PRM is currently enforced in 3 places (cursorModel tempo, blob substrate park, field tick(0)); the fold collapses to ONE seam — verify every viz paints exactly one static frame then parks, pointer motion produces zero field change, across all four vizzes.

## §6 Pass-2 prototype slate

| Proto | Family risk proven | Build |
|---|---|---|
| **P0 — fourier attribution trace** (BLOCKS P2's shape) | VIZ-B vs VIZ-C perf claims (G1) | DevTools trace + setProperty toggle + GPU timer/DPR sweep on `/substrates/fourier-field`; read both shader sources; publish the apportioned ms table. |
| **P1 — core-parity harness** | VIZ-A's core risk: one vue-only 2nd-order integrator gives the blob its spring WEIGHT, zero-alloc, zero own rAF (G2/G3/G4) | Headless harness driving a synthetic trace (hold/drag/flick/leave) through the evolved core AND the current SpringProgress; settle-curve overlay; ε-park assert; fixed-trace byte-frozen regression on existing outputs; heap-snapshot alloc check. |
| **P2 — fourier interaction + render** | VIZ-B's draw-bias legibility + ribbon parity + perf collapse (G5/G6) | WebGL2 (Safari-honest) geometry-ribbon behind a flag, side-by-side vs the SDF; live BIAS_GAIN/FOLLOW_LEAN/scrub sliders; 3 frozen-T diff-captures both modes; GPU frame-cost readback proving the fragment-work collapse; tuned constant set frozen. |
| **P3 — blob weight** | The weighted-pull feel without flicker (G2/G7/G12) | Evolved core wired into goo-blob behind a flag (raw pointer feeds the field once; SpringProgress kept as A/B arm); ζ/LEAD_K sweep under scripted flick + edge-hover with flicker/overshoot metrics; trail/pseudopod desync check; satellite wake-drag demo tile. |
| **P4 — broadcaster + setting-sun aurora** | VIZ-C harvest + the backgrounds mandate + the palette (G8/G9) | `useRoutePointer` wired to a full-bleed SETTING_SUN aurora on a real demo route, feeding setPointer + uCursorVelocity/uCursorBurst; verify the velocity-reactive swirl tracks the real pointer over content + scrolled page, Chrome + Safari 26; candidates A/B/C behind the warm-glass plate at the vividness floor with the AA readback. |
| **P5 — PRM/park sweep** | The unified PRM seam + the demand-park discipline (G3/G13) | Emulated reduce across all four vizzes: exactly one static frame then park; pointer motion inert; offscreen frame-count → 0. |
| **D1 — constellation dedup decision** (not a prototype) | G10 | Demo census + the named retire/collapse plan. |

## §7 Design-quality bar (binding on all pass-2 work)

- **Warm identity:** setting-sun/dusk presets are DEMO-LOCAL (presets-in-consumers); the pink note is bounded (candidate A default); no consumer hue enters a library token; the vibrancy lift never drops content-over-glass below the AA/APCA floor.
- **One loop, one context:** zero new rAF anywhere (push-tick only, fed from `createCanvasLifecycle` onFrame); one GL/GPU context per route; the demand-park/offscreen-pause discipline is inviolate (proof:offscreen-pause).
- **Compositor-only:** the physics writes uniforms + transforms, never a layout property; the per-frame CSS-var restyle bridge is a KILL, not a pattern.
- **PRM absolute:** ONE seam — cached matchMedia → tick(0) deterministic freeze + PRM-gated pointer write; static rest pose, never a degraded animation.
- **Safari-honest:** WebGL2 is a full-parity primary (instancing is core; the ribbon ships on both engines); dt-normalized derivation + clamp + dead-zone (never coalesced-event-count reliance); Chrome + Safari on every feel probe.
- **No masking fallbacks:** the interactive layer runs or is honestly absent (inert handle / static CSS ground with inert broadcaster writes); the WebGPU-only wake texture degrades to the visible-but-simpler CPU burst, never a fake.
- **Clean breaks:** cursorModel, the blob raw-path duplicate, FOLLOW_REACH, the SDF fs bodies (per G1), the `interactive=false` background gate — all retired with no alias; the field's EXISTING outputs byte-frozen (additive evolution, not redefinition).
- **KISS/DRY:** no simulation service/singleton/shared clock/particle bus; sharing stops at the field + pure mappings; any new non-spring kernel mints only on the ≥2-consumer bar (J-inv-10); keyframes stays OFF the root barrel/`/motion-core` (the fence that rejected VIZ-C's spring-in-core).
- **Gestalt:** the four verbs (follow/velocity-warp/burst/accel-push) read as ONE coherent liquid response per viz — subtle by default (background influence 2-6%, follow half-life 90-160ms), weighty where asked (blob), graceful where asked (fourier draw-bias), never jittery (clamp + dead-zone) and never dead (the engagement ramp replaces the boolean cliff).

## §8 Recorded disagreements (so pass 2 argues from evidence, not re-litigation)

1. **Fourier perf root cause** — VIZ-A: GLSL-fallback-only fragment loop (WGSL fine); VIZ-B: BOTH engines run the fullscreen SDF; VIZ-C: the per-frame setProperty restyle; prior-art: per-frame `computeFourierFit` + compute dispatch. → P0 resolves by trace + source read; the fixes are non-exclusive.
2. **Spring ownership** — VIZ-A: hand-roll the attractor in the core (fence-forced, feel-parity to prove); VIZ-B/C: keep SpringProgress per-viz. → The core hand-rolls (the fence is not negotiable); G2 decides whether the blob's spring retires onto it. VIZ-C's spring-in-the-field is rejected outright (fence violation).
3. **Fold depth** — VIZ-B warns the one-core framing is the god-abstraction; VIZ-A's answer is that the core carries only DYNAMICS and the mappings carry the medium. Adopted: if a fold requires per-viz param divergence beyond the option surface to preserve feel, the concern stays viz-local (the VIZ-C risk-1 escape hatch is the recorded fallback).
