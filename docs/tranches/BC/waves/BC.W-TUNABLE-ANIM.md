# BC.W-TUNABLE-ANIM — the tunable-animation brainstorm + the live registry

- **Band:** 7 · **Status:** SPEC (tranche-dev; NOT executed) · **Sequence:** Last of Band 7 — after `BC.W-MOTION-ONE-CLOCK` (the single source the registry indexes), `BC.W-SPRING-EASE` (the eased curves + the minted `press` register the registry exposes), and `BC.W-AFFORDANCE-MAP` (the affordances whose timings the registry tunes). Reads the BB-shipped `<EasingPicker>`/`useConfiguratorState` (the live-tune chassis). Feeds `BC.W-VIZ-CONFIGURATOR-SUITE` (Band 4 — the viz studios expose the same tunable registry) + the `/motion` storybook (`BC.W-STORYBOOK-META` Band 9).
- **Owns / closes:**
  - ORCHESTRATION §1 Band 7 box: `BC.W-TUNABLE-ANIM — the tunable-animation brainstorm + registry`.
  - USER-DEFECTS §D: "the animation targets" (the design-hierarchy suffusion of motion as a TUNABLE surface) / "leverage keyframes.js + value.js (our rich animation facilities)" (the tunable curve/spring math).
  - DEFERRAL: `ba-motion3-stepped-ease-generator` / `az-motion3-steps-generator` (the live steppedEase(n,term) generator) + the KF-OSCILLATOR loop-seam consume.
  - PROMPT-LEDGER: the W-MOTION2/W-MOTION3 curve-gallery lineage (live-parameterized curve authoring).

## Goal (the gestalt)
Motion in glass-ui is a TUNABLE surface, not a fixed black box. There is ONE registry that names every animatable axis — the 5 named springs (`smooth`/`snappy`/`bouncy`/`gentle`/`dock`) + the new iOS `press`, their per-spring duration clocks, the affordance scales (`--scale-hover-*`/`--scale-press`), the squish caps, the reveal/morph timings — each as a TOKEN a consumer (or a live demo control) can re-tune, watch update in real time, and read back as a re-parseable value. On `/motion`, the user drags an N-harmonic slider and watches the Fourier curve assemble; drags a bezier handle in `<EasingPicker>` and watches the travelling dot re-trace; flips a spring's ζ and watches a live preview squish differently — the rich keyframes.js + value.js facilities exposed as a play-with-it surface, not buried. And a consumer THEME re-tunes the whole motion identity from a handful of documented tokens (presets-in-consumers — the library default IS its identity; a consumer dials it). The gestalt: motion is a first-class, documented, live-tunable design axis — the user reads "I can SEE and TUNE the animation system," not "the animations are whatever they are."

## Starting state (measured, file:line)
The tunable PIECES exist and are SOTA-correct, but there is no unified REGISTRY indexing them + no completeness over the live-tune surface (kf-vjs-facilities.md §2.3/§6; deferral/ba.md item 11/12):

- **The curve editor shipped (BB.W-EASING-PRIMITIVE).** `src/components/custom/easing/EasingPicker.vue` + `EasingConfigurator.vue` + `composables/useEasingPicker` (`/easing` subpath) — authors a cubic-bezier (draggable handles, `mode="bezier"`) OR a stepped staircase (`mode="steps"`) over the REAL value.js twin (`CSSCubicBezier`, `steppedEase(n, term)`, `bezierPresets`, `jumpTerms` — kf-vjs-facilities.md §2.3), reads back a re-parseable CSS literal. The boundary law holds (curve MATH = value.js, playback = keyframes.js, editor = glass-ui). This is the live-tune CHASSIS — built, correct (deferral/ba.md item 11: "MET — re-verify the primitive paints live").
- **The configurator-state chassis shipped.** `src/components/custom/configurator/useConfiguratorState.ts` + `Configurator`/`ConfiguratorLayer`/`ConfiguratorRow` — the preset-driven live-tune column the aurora/blob studios compose. The `cloneMode` (`commit-on-write`/`per-preset`) + the density cascade. The live-tune surface chassis — built, correct.
- **The spring registry IS the single source.** `SPRING_PRESETS` (`springPresets.ts:51-86`) → CSS `--spring-*` + JS `MOTION_CURVES` (`curves.ts:176` `Object.freeze`) + the per-spring `--spring-*-duration`. Every spring is already a NAMED, TOKENIZED axis — but there is no artefact that ENUMERATES the full tunable surface (springs + scales + caps + timings) as ONE registry a consumer reads.
- **The `/motion` route exists with the curve gallery.** `manifest.ts:182` ("motion", "Easings, damped spring linear() curves") + the Fourier studio (`manifest.ts:291` "drag the harmonic-count N slider and WATCH the summed curve assemble"). The live-tune demos exist — but the user-commissioned "tunable-animation brainstorm + registry" (ORCHESTRATION §1 Band 7) is not delivered as a unified artefact.
- **The GAPS:**
  - **No tunable REGISTRY.** No single `docs/precepts/tunable-anim.md` enumerating every animatable axis + its token + its re-tune path + its bound (the analogue of the affordance-map for TUNING). A consumer who wants to re-tune the motion identity has to grep the CSS.
  - **The live steppedEase generator is BOOKED, not built** (deferral/ba.md item 12 / deferral/az.md item 12 — W-MOTION3): the `<EasingPicker mode="steps">` authors a staircase but the live-parameterized `n + the 7 jump-terms` as a Custom-family sub-editor is a named-successor carry. kf-vjs-facilities.md §2.3 confirms `steppedEase(n, jumpTerm)` + `jumpTerms` are value.js-shipped (consumable NOW) — the math is there; the live control is the gap.
  - **The KF-OSCILLATOR loop seam is BOOKED** (kf-vjs-facilities.md §3.1 + §7): the `<EasingPicker>` `loop` playback seam consumes kf `Oscillator` when it ships (it is LOCAL-only past 4.3.0, machine-verified absent). The default one-shot rAF travel ships now; the loop is the kf-republish consume.
  - **No completeness over the live-tune surface.** No gate asserts the registry stays the single source (a tunable axis re-tuned in two places) or that the live controls read the REAL value.js/keyframes.js math (not a hand-rolled re-implementation — the boundary-law fence).

## Target spec (grounded)
KISS — the tunable chassis (`<EasingPicker>`, `useConfiguratorState`) + the single-source spring registry are built. This wave BRAINSTORMS the full tunable surface, INDEXES it as ONE registry, BUILDS the one cleanly-buildable live control the deferral names (the steppedEase generator, value.js-shipped), and GATES the registry stays single-source + boundary-law-correct.

### The brainstorm — the tunable-animation axes (the closed registry)
Every animatable axis is ONE of these tunable kinds, each a named TOKEN re-tunable by a consumer or a live control. The brainstorm names, per kind, the AUTHORITY (where the value lives), the RE-TUNE path, and whether it carries a LIVE control:

1. **SPRING shape** — the 5+1 named springs (`smooth`/`snappy`/`bouncy`/`gentle`/`dock`/`press`), each a `(response, ζ)` pair in `SPRING_PRESETS` (`springPresets.ts:51-86`) → the CSS `--spring-*` `linear()` (`scheme-motion.css:220-224`, generated) + the JS `MOTION_CURVES` twin (`curves.ts:176` `Object.freeze`, via `springTimingFunction`). Re-tune: edit the ONE table (library identity, `BC.W-SPRING-EASE`) OR override `--spring-<name>` on an instance (consumer). LIVE control: a `(response, ζ)` editor → a live spring preview (the `SpringScene` idiom, kf-vjs-facilities.md §6 "a live `liveSpring.target = …` chases the tap target" — composes `springTimingFunction`/`SpringProgress`, never a hand-rolled spring).
2. **CLOCK** — the per-spring `--spring-<name>-duration` (the analytic 2%-band settle `t_s = −ln(0.02)/(ζ·ωₙ)`, generated; `scheme-motion.css:242-246`). Re-tune: NEVER hand-set (generated from the spring's own (response, ζ)); the registry RECORDS it as DERIVED-not-tunable (the W-GLASS-CAL fence — truncating re-introduces tail-jank, `BC.W-SPRING-EASE` S6 / motion-canon.md P4). NO live control — the registry exposes it READ-ONLY (a "tune the clock" control is forbidden by T4).
3. **EASING curve** — the bezier/steps curves (`--ease-standard`/`--ease-out`/`--ease-in`/`--ease-out-expo`/`--ease-apple`, `scheme-motion.css:254-263`; the `MOTION_CURVES` JS twins; value.js `bezierPresets`/`jumpTerms`/`CSSCubicBezier`/`steppedEase`, kf-vjs-facilities.md §2.3). Re-tune: the `<EasingPicker>` (the live authoring chassis) OR override `--ease-<name>` (consumer). LIVE control: the draggable bezier handles + the steps staircase (BB-built) + the NEW live steppedEase `n + jumpTerm` generator (this wave builds it).
4. **AFFORDANCE magnitude** — the scales + caps (`--scale-hover-btn` 1.05 / `--scale-hover-dock` 1.1 / `--scale-hover` 1.08 / `--scale-press` 0.96 / `--scale-press-sm` 0.97, `scale-paper.css:9,24-41`; `--tab-indicator-max-stretch` 1.08, `scale-paper.css:53`; the squish caps). Re-tune: the token (consumer override on an instance) / the `affordance-map` (library identity, `BC.W-AFFORDANCE-MAP`). NO live control (the proportion fence — these are the affordance-map's, not a debug overlay); the registry INDEXES them with their anti-taffy bounds.
5. **REVEAL/MORPH timing** — the bloom/morph drive scalars (`--glass-btn-press-t`/`--card-press-t` press drives `property-regs.css:285`; `--dock-morph-t`/`--dock-expand-t` the dock morph scalar; `--border-progress-fill` `property-regs.css:53`; `--progress-crescendo` `property-regs.css:38`; `--phase-tint-amount` `property-regs.css:59`; the `--glass-reveal-blur` settle `glass/reveal.css`; the scroll-choreography knobs `--scroll-build-step` 90ms / `--scroll-cascade-rise` 1.25rem / `--scroll-cascade-range-end` 45% / `--scroll-pin-lift` 2.5rem / `--scroll-pin-stage-height` 320vh, `scroll-choreography.css:90,146,166,232,255`). Re-tune: the spring under them (registry kind 1) + the per-instance token (consumer). The registry indexes the drive scalars + their default + their range.

### The registry (`docs/precepts/tunable-anim.md`)
A markdown table: each tunable axis → its TOKEN → its DEFAULT → its BOUND (the valid range) → its RE-TUNE path (library-table vs consumer-override vs derived) → its PRM behavior → its LIVE control (which demo exposes it). The single index a consumer reads to re-theme the motion identity. Cited by `BC.W-VIZ-CONFIGURATOR-SUITE` (the viz studios) + the storybook. The full enumerated registry (the binding rows — the gate reads these; a token in the registry RESOLVES in source (T2), a token in source that is animatable but absent from the registry reds (T1's anti-gameability)):

**Kind 1 — SPRING shape** (`SPRING_PRESETS` → CSS `--spring-*` + JS `MOTION_CURVES`; the single authority is the table):

| spring | token (CSS + JS twin) | default (response, ζ) | bound (overshoot, `BC.W-SPRING-EASE` S2) | re-tune | PRM | live control |
|---|---|---|---|---|---|---|
| smooth | `--spring-smooth` / `MOTION_CURVES.smooth` | 0.5, 0.86 | ≤0.02 (the kept sub-perceptual alive-peak) | table (identity) or `--spring-smooth` override | snap (binary) or intensity-scaled | the spring editor preview |
| snappy | `--spring-snappy` | ~0.42, ~0.78 (SPRING-EASE clock-fill) | ≤0.08; 90%-travel ∈ [0.55,0.70] of clock | table or override | snap | preview |
| bouncy | `--spring-bouncy` | 0.5, 0.60 (SPRING-EASE eased) | ∈ [0.12,0.18] (the Apple band) | table or override | snap | preview |
| gentle | `--spring-gentle` | 0.7, 1.0 (critically-damped) | 0 (no overshoot) | table or override | snap | preview |
| dock | `--spring-dock` | 0.32, 0.7 (value.js/kf-fenced KEEP) | ≤0.06 | table (FROZEN — byte-unchanged) | snap | preview |
| press | `--spring-press` (MINTED, `BC.W-SPRING-EASE` S3) | 0.15, 0.86 (iOS interactiveSpring) | ≤0.08 | table or override | snap (zero transform frames) | preview |

**Kind 2 — CLOCK** (DERIVED-not-tunable; generated from the spring; the registry records READ-ONLY):

| clock | token | default | re-tune | note |
|---|---|---|---|---|
| smooth | `--spring-smooth-duration` | 0.36s | DERIVED (regen-spring-tokens.mjs) | NO control — `t_s = −ln(0.02)/(ζ·ωₙ)` |
| snappy | `--spring-snappy-duration` | 0.34s | DERIVED | truncating re-introduces tail-jank (W-GLASS-CAL fence) |
| bouncy | `--spring-bouncy-duration` | 0.69s | DERIVED | re-derives on the SPRING-EASE ζ change |
| gentle | `--spring-gentle-duration` | 0.44s | DERIVED | — |
| dock | `--spring-dock-duration` | 0.28s | DERIVED | FROZEN with the dock row |
| press | `--spring-press-duration` | (regen from 0.15/0.86) | DERIVED | minted with the press row |

**Kind 3 — EASING curve** (CSS `--ease-*` + JS `MOTION_CURVES` + value.js catalogue):

| curve | token | default | re-tune | live control |
|---|---|---|---|---|
| standard | `--ease-standard` | `var(--motion-ease-standard)` | `<EasingPicker>` bezier OR override | the draggable bezier handles |
| out | `--ease-out` | `var(--motion-ease-out)` | picker OR override | bezier handles |
| in | `--ease-in` | `var(--motion-ease-in)` | picker OR override | bezier handles |
| out-expo | `--ease-out-expo` | `var(--motion-ease-out-expo)` = `cubic-bezier(0.16,1,0.3,1)` | NAMED, never re-minted (a dup alias reds `proof:animation-coherence`) | the SOTA-arrival preset |
| apple | `--ease-apple` | `var(--motion-ease-apple)` | ambient-only (Pulse) | — |
| steps | (authored, not a token) | `steps(n, jumpTerm)` via value.js `steppedEase` | `<EasingPicker mode="steps">` | the NEW `n` slider + 7-term selector (this wave) |

**Kind 4 — AFFORDANCE magnitude** (`scale-paper.css`; the affordance-map's identity, the registry INDEXES with anti-taffy bounds):

| axis | token | default | bound | re-tune |
|---|---|---|---|---|
| button hover | `--scale-hover-btn` | 1.05 | ≤1.10 (sub-perceptual) | consumer override / affordance-map |
| dock hover | `--scale-hover-dock` | 1.1 | ≤1.15 | override |
| generic hover | `--scale-hover` | 1.08 | ≤1.10 | override |
| press | `--scale-press` | 0.96 | ∈ [0.94,0.98] (no collapse) | override |
| press (sm/btn) | `--scale-press-sm` / `--scale-press-btn` | 0.97 | ∈ [0.94,0.98] | override |
| tab squish cap | `--tab-indicator-max-stretch` | 1.08 | ≤1.20 (anti-taffy, the `useLiquidFlex` LOW cap) | override |

**Kind 5 — REVEAL/MORPH drive** (the `@property`-registered 0..1 scalars + the choreography knobs; the spring under them is kind 1):

| drive | token | default | range | re-tune |
|---|---|---|---|---|
| button press | `--glass-btn-press-t` | 0 | [0,1] | the spring (kind 1) + the surface CSS |
| card press | `--card-press-t` | 0 | [0,1] | spring + recipe |
| dock morph | `--dock-morph-t` / `--dock-expand-t` | 0 | [0,1] | `DOCK_SPRING` (value.js-fenced) |
| border-progress | `--border-progress-fill` | 0% | [0%,100%] | the value-axis + `useBorderSpectrum` |
| progress crescendo | `--progress-crescendo` | 0 | [0,1] | the progress value |
| reveal blur | `--glass-reveal-blur` | 4px | [0,8px] | per-instance |
| page-build stagger | `--scroll-build-step` | 90ms | [0,200ms] | consumer override (scroll-choreography) |
| cascade rise | `--scroll-cascade-rise` | 1.25rem | per-instance | override |
| cascade window | `--scroll-cascade-range-end` | 45% | [0%,100%] | override |
| scroll-pin lift | `--scroll-pin-lift` | 2.5rem | per-instance | override |
| scroll-pin stage | `--scroll-pin-stage-height` | 320vh | per-instance | override |

**The named-FUTURE axis (recorded, not built — the proportion fence):** the live `linear()` multi-stop editor (value.js `cssLinear(stops)` is shipped, kf-vjs-facilities.md §2.3, but the live multi-stop-drag editor exceeds the gallery-card register — deferral/az.md item 12). The registry records it as a future EASING-kind axis with its token-home named, NOT built this wave.

### The one buildable live control — the steppedEase generator (the deferral discharge)
Build the live-parameterized `steppedEase(n, jumpTerm)` generator INTO `<EasingPicker mode="steps">` (deferral/ba.md item 12 W-MOTION3): an `n` slider (the step count, integer ≥1) + a `jumpTerm` selector (the 7 value.js `jumpTerms = ["jump-start","jump-end","jump-none","jump-both","start","end","both"]` — kf-vjs-facilities.md §2.3, value.js 0.13.0-SHIPPED, the peer spine `^0.13.0` already admits it, consumable NOW with no republish) driving the REAL value.js `steppedEase(n, term)` → the live staircase preview + the re-parseable `steps(n, term)` readout. It is the natural inhabitant of the existing `mode="steps"` editor (deferral/ba.md item 12: "the natural inhabitant of the `<EasingPicker>` mode='steps' editor"); `useEasingPicker` already imports `steppedEase`/`jumpTerms`/`CSSCubicBezier`/`bezierPresets` (kf-vjs-facilities.md §4 baseline) — the generator WIRES the `n`/`jumpTerm` controls onto the existing import, it does not add a new dep. NO re-implemented staircase evaluator (the boundary law — value.js owns the math; T3 reds an inline staircase). The `n` slider IS a glass-ui `<Slider>` (dogfooding the affordance-mapped control) + the `jumpTerm` selector a `<Select>` (the 7 terms); the readout reads back through value.js `cubicBezierToString`-class serialization so it is re-parseable. The payload is the existing `v-model` `{ mode:"steps", css:"steps(n, term)", fn, steps:n, term }` shape (no new payload field — additive into the built shape).

### The KF-OSCILLATOR loop seam (BOOKED, not blocking)
The `<EasingPicker>` default playback is the one-shot rAF travel (ships now). The `loop` playback seam consumes kf `Oscillator` (kf-vjs-facilities.md §3.1 — a LIGHT phase clock, `tick(dt)`-driven, NO rAF ownership) WHEN keyframes.js republishes past 4.3.0 (it is LOCAL-only, machine-verified absent). BOOK the consume in `asks-and-consumes.md` (the cheap by-name ask, no peer-spine widen); the interim is the one-shot travel (NOT a blocker). The viz loop clock consume is `BC.W-VIZ-CHOREOGRAPHY`'s; this wave owns the picker `loop` seam consume.

This is the gestalt: the tunable-animation thinking becomes an EXPLICIT brainstorm + a BINDING registry (`tunable-anim.md`) indexing every animatable axis + the one cleanly-buildable live control (the steppedEase generator) + the BOOKED Oscillator consume — so motion is a documented, live-tunable, first-class design axis.

## Mechanism / files
- **NEW `docs/precepts/tunable-anim.md`** — the brainstorm (the 5 tunable kinds) + the REGISTRY table (axis → token → re-tune path → bound → live control). The canon home cited by `BC.W-VIZ-CONFIGURATOR-SUITE` + the storybook (the `tunable-animation idiom`).
- **NEW `scripts/proof-tunable-anim.mjs`** (`["local","ci","release"]` SOURCE arm) — the registry-completeness gate: every named spring/scale/cap/timing in the registry is a REAL token in source (no phantom axis), every live control reads the REAL value.js/keyframes.js math (the boundary-law fence — no re-implemented bezier/staircase/spring evaluator), and the registry is the single source (an axis re-tuned in two places reds). The registry is READ from `tunable-anim.md` (gate + canon single-sourced).
- **Edit `src/components/custom/easing/EasingPicker.vue` + `composables/useEasingPicker`** — wire the live steppedEase `n + jumpTerm` generator into `mode="steps"` (the `n` slider + the 7-term selector → value.js `steppedEase(n, term)` → the live staircase + the re-parseable readout). COMPOSES value.js (no re-implemented evaluator — the boundary law).
- **Edit `demo/stories/motion/` (the curve gallery / a new tunable-anim story)** — expose the registry as a live play-surface: the spring `(response,ζ)` editor → a live preview, the steppedEase generator, the affordance-scale sliders. The user-commissioned "play with the animation system" surface.
- **Edit `docs/tranches/BC/coordination/asks-and-consumes.md`** — BOOK the KF-OSCILLATOR loop-seam consume (the `<EasingPicker>` `loop` playback when kf republishes; the cheap by-name ask). NO kf-tree edit.
- The ONE source / ONE clock: the registry indexes the ONE `SPRING_PRESETS` table + the ONE `MOTION_CURVES` + the value.js curve math; the live controls compose them (boundary-law-correct). No second authority.

## Acceptance (gestalt + measured + gate)
1. **CAPTURED-PAINT gestalt criterion (dev-tools MCP):** a live tune-and-watch capture on `/motion` (dev-tools MCP, both modes): drag the bezier handles → the travelling dot re-traces; drag the steppedEase `n` slider → the staircase re-steps live + the readout updates to `steps(n, term)`; flip a spring's ζ → the live preview squishes differently. A human reads "I can SEE and TUNE the animation system — the rich facilities are exposed, not buried." The MEASURABLE bands the capture pins (inline so the executor needs no cross-reference): the staircase preview at `n=4` resolves exactly 4 risers (the painted step count == the slider `n`, ±0); changing the `jumpTerm` `jump-start`↔`jump-end` shifts the first/last riser position visibly (the term re-shapes the staircase); the readout text reads `steps(4, jump-start)` (re-parseable, matches the slider+selector); dragging a bezier handle moves the plotted curve's control point + the travelling dot's path re-traces the NEW curve (not the stale path); the live preview's overshoot peak shifts when ζ drops (a lower ζ → a higher painted peak). Lands at `docs/tranches/BC/audit/visual/W-TUNABLE-ANIM-DELTA.md` (Live-verify = captured delta via dev-tools MCP; per-wave fresh capture per `BC.W-GESTALT-FIRST`).
2. **Machine gate `proof:tunable-anim`** (born-RED if the registry is absent/incomplete → GREEN at the build):
   - **T1 — the registry is the binding index.** Every tunable axis (the 5+1 springs + their clocks + the affordance scales/caps + the reveal/morph timings) appears in `tunable-anim.md` with its token + re-tune path + bound + live control. Born-RED: the registry does not exist at HEAD. Self-test bite: a planted new spring token absent from the registry reds (anti-gameability — a future axis cannot ship un-indexed).
   - **T2 — the registry names REAL tokens (no phantom axis).** Every axis token in the registry RESOLVES in source (`SPRING_PRESETS` for the springs, `scheme-motion.css`/`scale-paper.css` for the scales/clocks). Self-test bite: a planted phantom `--spring-nonexistent` registry row reds.
   - **T3 — the boundary law holds (the live controls compose the real math).** The steppedEase generator reads value.js `steppedEase(n, term)` + `jumpTerms` (no re-implemented staircase evaluator); the bezier editor reads value.js `CSSCubicBezier` (built); the spring preview reads `springTimingFunction`/`SPRING_PRESETS` (no hand-rolled spring). Self-test bite: a planted inline staircase/bezier/spring re-implementation in the picker reds (the `curves.ts` NO-FORK discipline, now in the live control).
   - **T4 — the single source (no axis re-tuned twice).** Each tunable axis has ONE re-tune authority (the `SPRING_PRESETS` table OR the consumer token, not both as forks). The clock axis is recorded DERIVED-not-tunable (generated from the spring; the W-GLASS-CAL fence). Self-test bite: a second `(response,ζ)` literal for a registry spring reds.
   - **T5 — the steppedEase generator built + the Oscillator consume booked.** The `<EasingPicker mode="steps">` carries the live `n + jumpTerm` generator (the deferral discharge); the KF-OSCILLATOR loop-seam consume is a by-name row in `asks-and-consumes.md` (BOOKED, not faked — glass-ui edits zero kf tree). Self-test bite: a missing generator OR a missing book reds.
   - **+ a self-test bite per clause.**
3. **π readback `tests-visual/tunable-anim.spec.ts`** (both modes + WebKit, LOCAL real-render — the binding paint):
   - The live bezier tune: dragging a handle re-traces the curve + the travelling-dot playback follows the NEW curve (the value.js twin updates live, not a static preview).
   - The live steppedEase generator: changing `n` re-steps the staircase to `n` steps live; changing the `jumpTerm` re-shapes the jump (start/end/none/both); the readout reads `steps(n, term)` re-parseable. The staircase MATCHES value.js `steppedEase(n, term)` (the boundary law — the painted staircase IS the value.js math, not a hand-rolled approximation).
   - The live spring tune: editing `(response, ζ)` re-shapes the live preview's overshoot + settle (the `springTimingFunction` re-derives — the registry axis is genuinely tunable).
   - PRM: the live previews keep the curve plot (static) + drop the travelling-dot animation under reduce (P6) — the curve is readable, the playback off.
   - Safari/WebKit: the curve editor is SVG + pointer events + the value.js math (no `backdrop-filter: url()`, no WebGL) → identical on WebKit. The tunable surface is Safari-native.

## Fences / invariants (must NOT regress)
- **The boundary law** (CLAUDE.md W-EASING-PRIMITIVE): curve MATH = value.js · playback/spring = keyframes.js · the editor COMPONENT = glass-ui. The steppedEase generator reads value.js `steppedEase`/`jumpTerms`; NEVER a re-implemented staircase evaluator (T3 reds it). The `curves.ts` NO-FORK discipline holds in the live control.
- **The single `SPRING_PRESETS` table** (postmortem/az.md "What went RIGHT"): the registry INDEXES it, it does not fork it; a tunable axis has ONE authority (T4).
- **The clock is DERIVED-not-tunable** (W-GLASS-CAL + `BC.W-SPRING-EASE` S5): the `--spring-*-duration` is generated from the spring; the registry RECORDS it as not-hand-tunable (truncating re-introduces tail-jank). The registry does NOT expose a "tune the clock" control.
- **The foreign-tree fence** (inv-26): the KF-OSCILLATOR consume is a by-name BOOK in `asks-and-consumes.md`; glass-ui edits ZERO kf tree. The one-shot rAF travel ships now; the loop consume fires on the kf republish (no peer-spine widen).
- **Presets-in-consumers** (the headline tunable principle): the library motion identity IS its default; a consumer re-tunes via the documented tokens (`--spring-<name>`, `--scale-hover-*`, etc.). The library's OWN tokens evolve as the identity changes (`BC.W-SPRING-EASE`); a consumer's named preset lives in the consumer.
- **The `/easing` value.js-bearing leaf** (the SCC-trap, CLAUDE.md): `<EasingPicker>` ships on `/easing` (value.js-bearing), NEVER the root barrel. The steppedEase generator stays in the `/easing` leaf.
- **The clean-break discipline** (no back-compat): the steppedEase generator is additive into the existing `mode="steps"` (no new mode fork, no alias); the registry is a new doc (no surface change).
- **The proportion fence** (motion-canon.md): the tunable surface is the `/motion` DEMO + the consumer token axis — it does NOT add live-tune controls to every production component (the registry is the index, not a debug overlay on every element).

## Folds (deferrals discharged)
- **The tunable-animation brainstorm + registry** (ORCHESTRATION §1 Band 7 box; USER-DEFECTS §D): **DECIDED — BUILD:** the brainstorm (the 5 tunable kinds) + the binding REGISTRY (`tunable-anim.md`) + the registry-completeness gate land. Motion becomes a documented, indexed, live-tunable design axis.
- **`ba-motion3-stepped-ease-generator` / `az-motion3-steps-generator`** (deferral/ba.md item 12; deferral/az.md item 12 — the W-MOTION3 live steppedEase(n,term) generator, carried AZ→BA→BB as a named successor, "UNADDRESSED" prompts-recap-1.md:264): **DECIDED — BUILD (the deferral discharge):** the live `n + jumpTerm` generator lands in `<EasingPicker mode="steps">` reading value.js `steppedEase`/`jumpTerms` (value.js-SHIPPED, consumable NOW — no kf republish needed). The 3-tranche carry ENDS — built, not re-booked.
- **`ba-easing-primitive-book`** (deferral/ba.md item 11 — `<EasingPicker>` MET at BB): **DECIDED — MET + EXTENDED:** the BB primitive is re-verified painting live (the bezier/steps editor over the value.js twin); this wave EXTENDS it with the steppedEase generator. No re-book.
- **The KF-OSCILLATOR loop-seam consume** (kf-vjs-facilities.md §3.1, §7; the CLAUDE.md W-EASING-PRIMITIVE book "the Oscillator slots the `loop` seam on republish"): **DECIDED — BOOK (not blocking):** the one-shot rAF travel ships now; the `loop` consume is a by-name row in `asks-and-consumes.md`, firing on the cheap kf republish (no peer-spine widen). The foreign-tree fence holds; glass-ui does not re-fork the Oscillator.
- **`az-motion3-steps-generator` linear() multi-stop row** (deferral/az.md item 12, the `§3a scope-reveal defer`): **DECIDED — HELD-with-rationale:** the live `linear()` multi-stop editor needs a value.js `cssLinear` twin live-sampler the registry exposes as a FUTURE axis (kf-vjs-facilities.md §2.3 `cssLinear(stops)` is shipped, but the live multi-stop drag editor exceeds the gallery-card register — deferral/az.md item 12 "hold-with-rationale if it exceeds the gallery register"). Recorded DECIDED in the registry as a named-future axis; NOT built this wave (the proportion fence — the registry indexes it as future, no re-book).
