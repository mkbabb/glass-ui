# Pass-E component deep audit — `motion/animated-digit`

**Page:** `demo/stories/motion/animated-digit.vue` · **Import label (manifest):** `@mkbabb/glass-ui/animated-digit`
**Real src under audit (NOT the demo):**
- `src/components/custom/animated-digit/AnimatedDigit.vue` (~115L SFC)
- `src/composables/motion/useAnimatedNumber.ts` (the animation engine)
- `src/composables/motion/constants.ts` (`DAMPING`/`SNAP_THRESHOLD`)

This is NOT a procedural-viz member (not in `PROCEDURAL-SUITE.md`'s ten). It is a single-glyph DOM numeric reel: `AnimatedDigit` damps the FORMATTED number toward its bound `value` via `useAnimatedNumber` → keyframes.js `SmoothProgress`, and ships the tabular-numerals (`ss01`/`tnum`/`lnum`) font-feature register so consumers stop hand-wiring it. Promoted (AC.W6d) from speedtest's hand-wired `useAnimatedNumber(metric) → <span class="tabular-nums">`.

---

## 1 · ANIMATION affordance

**What it HAS (correct + idiomatic):**
- The motion IS real physics — `SmoothProgress` (keyframes.js) owns the rAF; the composable exposes a smoothed reactive `current`, damped per `DAMPING.domHero` (0.12) with a `SNAP_THRESHOLD.dom` (0.05) settle. This is the composable-first motion idiom (mirrors `useNumericTransition`), not a hand-rolled lerp. CORRECT.
- PRM-safe: `respectReducedMotion` (default true) → `SmoothProgress` synchronous target-snaps under reduce. Motion-canon P6 held at the engine.
- Lifecycle-clean: `onScopeDispose` stops the smoother + target watcher; `dispose`/`snap`/`reset` exposed. CORRECT.
- `progress` mode keeps the smoother in `[0,1]` and scales at the read boundary (no stale-100 backward-animate). CORRECT.

**FINDINGS (gaps against the motion-canon four-state + entrance contract):**

- **F1 (MISSING — entrance, motion-canon P3) — the digit has NO mount entrance.** A bound digit paints its value flat on first render (the spring only animates on SUBSEQUENT target changes, since the watcher `immediate: true` seeds the target but `initial` is 0 → it actually DOES count up from 0 on mount, which is an UNINTENTIONAL/un-tuned entrance, not a designed coupled fade+transform). There is no opacity/transform coupling — the glyph appears as a bare number, no `--spring-*`-clocked fade-rise. Per P3 "a bare opacity fade reads flat; a bare transform reads abrupt" — here it's a bare value count with NEITHER. A hero metric deserves the coupled materialize (the `metric-swap` recipe in `transitions.css` is the model). **AUGMENT.**

- **F2 (DEAD ATTRIBUTE — four-state contract) — `data-is-animating` is written but has ZERO consumer.** `AnimatedDigit.vue:90` binds `:data-is-animating="…"` to the root `<span>`, but `grep` over `src/styles` + `demo` finds NO CSS/JS hook reading it (verified — 1 grep hit, the write site itself). It is dead surface: the "while animating" state of the four-state contract is EXPOSED but never PAINTED (no glow/tint/scale lift while the reel is in flight). Either wire a `[data-is-animating="true"]` register (a sub-perceptual `--motion-accent` glint or a brightness lift while tweening) or it's dead code. **AUGMENT (wire it) or PRUNE (drop the attr).**

- **F3 (no value-change emphasis) — a metric that JUMPS 248→890 reads identically to one that drifts 14→15.** The reel tweens but gives no magnitude cue. The `metric-pill`/`metric-cell` family and the iOS odometer idiom flash/pulse on a large delta. Not load-bearing, but a HIGH-animation-affordance bar (the prompt's "HIGH animation affordance for EVERY component") wants the flip-emphasis. **AUGMENT (optional, beside F1).**

## 2 · PROCEDURAL VIZ
N/A — not a canvas/GPU member. No PROCEDURAL-SUITE spec applies; the GPU-only/Safari-substrate bar does not bind. (Recorded so a future pass does not mis-file it.)

## 3 · PERFORMANCE
- **Compositor:** the only per-frame write is `current.value` → a text-node update (`{{ formatted }}`). That is a paint of the glyph run on every frame while animating — NOT a compositor-only transform. For a single small reel this is cheap and correct (you cannot tween a NUMBER's digits on the compositor — the text content itself changes), so this is the legitimate exception, not a P5 violation. NO finding.
- **No offscreen-pause:** the rAF runs whenever a target is in flight regardless of viewport visibility. A `SmoothProgress` settles in <1s so the window is bounded — acceptable. A page with N off-screen digits mid-tween would attach N rAFs briefly; not worth an `useIntersectionPause` for a settling reel. NO finding (recorded).
- **No layout thrash:** `--digit-count` is published from the formatted string length (a width-clamp single-source) — read-only, no forced reflow. CORRECT.

## 4 · SAFARI compatibility
- `font-feature-settings: "ss01","tnum","lnum"` + `font-variant-numeric: tabular-nums lining-nums` — both fully Safari-supported. The double-declaration (feature-settings AND variant-numeric for tnum/lnum) is belt-and-suspenders, harmless. NO finding.
- No `backdrop-filter`, no `@property`, no CSS that needs a Safari gate. CLEAN.

## 5 · IDIOMATIC / no-legacy
- **F4 (NON-IDIOMATIC — glass six-layer absent at the primitive; this is BY DESIGN but undocumented at the demo).** `AnimatedDigit` is a bare `<span>` — no glass plate, no rim, no catch-light (correct: it's an inline glyph register, the glass belongs to the HOST card, not the reel). The DEMO page (`animated-digit.vue`), however, renders the figures on bare `<StorySection>` flow with NO glassy card wrapping each sub-section — directly contradicting the user's "each sub-section in its OWN glassy card · glass demos over COLORFUL aurora · bigger main card." This is a DEMO finding (zero src paint), mapped below. The COMPONENT itself is idiomatic. NO src finding.
- No dead-code in the engine; the `placeholder: "—"` AZ.W-METRIC-UNIFY keep is deliberate + documented (not a fold-candidate). No dual-path. The component is clean — the only true component-level finding is the dead `data-is-animating` attr (F2).

## 6 · Glass six-layer composite
Not present, correctly — an inline numeric span is not a glass surface. The composite is the host card's responsibility. NO finding at the component.

---

## BD-tranche mapping

| # | Finding | Disposition | BD wave |
|---|---------|-------------|---------|
| F1 | No coupled fade+transform mount entrance (P3) | **AUGMENT** | NEW sub-wave under the component-canon family — fold beside `BD.W-BC-COMPONENT-CANON` (component register canon) as an `AnimatedDigit` entrance-register addition; cite motion-canon P3 + the `transitions.css` `metric-swap` recipe. |
| F2 | `data-is-animating` dead attr (no four-state paint) | **AUGMENT** (wire) or **PRUNE** (drop) | NEW — same component-canon sub-wave; wire `[data-is-animating="true"]` to a sub-perceptual glint, OR prune the attr. Born-RED bite: assert the attr has a CSS consumer XOR is absent. |
| F3 | No large-delta flip-emphasis | **AUGMENT** (optional) | Defer — beside F1, only if the entrance register lands. |
| F4 (demo) | Sub-sections not in glassy cards; not over aurora; main card not bigger; import-label OK (manifest already maps `@mkbabb/glass-ui/animated-digit`) | **MODIFY** (demo-private, zero src) | `BD.W-DATA-BAND-GLASS`-class re-thread for the MOTION band — wrap each `<StorySection>` in `<ShowcaseFrame tier="field">` over the constellation/aurora bg; superfluous-language tighten on the blurbs. The import label is already standardized (manifest `:319` + `:1121`), so the "standardize import-path label" ask is SATISFIED for this page. |

**Net:** ONE genuine component-level defect class (F1+F2 — the entrance + the dead four-state attr), AUGMENT-shaped, foldable into the BC component-canon family. Everything else is correct-by-design or demo-private.
