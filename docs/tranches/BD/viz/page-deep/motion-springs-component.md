# Pass-E · motion/springs — COMPONENT deep audit

**Page:** `demo/stories/motion/springs.vue` (`import @mkbabb/glass-ui/motion`)
**Real component(s) audited:** there is NO visual SFC here — the page demos the motion-system VOCABULARY. The load-bearing src is the spring-curve register set:
- `src/composables/motion/springPresets.ts` (143L) — `SPRING_PRESETS` / `springPreset()`, the no-second-authority `(response, ζ)` table (6 rows: smooth · snappy · bouncy · gentle · dock · press).
- `src/composables/motion/curves.ts` (≈230L) — `MOTION_CURVES` CSS↔JS twin table + `springTimingFunction` re-export (the `{fn,css}` pair via keyframes.js, solved off the SAME pair `springLinearStops` solves the CSS `linear()` from).
- `src/composables/motion/useNumericTransition.ts` (151L) — the fixed-duration TWEEN orchestrator the page's "Named registers" stage actually drives (wraps keyframes.js `NumericAnimation`).
- `src/composables/motion/useSpring.ts` (193L) — the TRUE physics engine (`SpringProgress`, PRM-aware), the reserved `spring` name — **NOT used by this page** (the central finding).
- `springLinearStops` / `springTimingFunction` (keyframes.js peer) — the single solver both halves derive from.

Lens: ANIMATION affordance · procedural-viz · performance · Safari · idiomatic/no-legacy · the glass six-layer composite. Mapped to FOLD/MODIFY/AUGMENT/PRUNE on the BD tranche.

---

## 1 · ANIMATION — four-state + spring + entrance/exit (per motion-canon)

The page is a motion-EXPLAINER, so the four-state interactive contract (rest/hover/active/disabled) is N/A for the stage itself; the relevant axis is *does the demo teach the SHIPPED curves with the SHIPPED engine, with HIGH affordance*. Two real findings:

- **FINDING A1 (architectural — the wrong engine teaches springs).** The flagship "Named registers" stage drives `useNumericTransition` — a **fixed-1100ms tween** with `timingFunction: springTimingFunction(preset).fn` — to "play" a spring. This samples the spring's `linear()` CURVE over a fixed clock; it is NOT spring PHYSICS. The library SHIPS the real engine (`useSpring` → `SpringProgress`: live-target, velocity-continuous, interruptible re-seat, analytic settle clock). A spring demo that cannot be RE-PRESSED mid-flight (the iOS interruptible-momentum hallmark, the W-PRESS-UNIFY contract) and that runs every register on ONE wall clock (when the whole point of `--spring-<name>-duration` is per-register settle clocks) under-teaches the system it documents. The page even names this in its own header comment ("True spring physics … lives in `useSpring`") yet demos the tween. → **AUGMENT / re-transpose: the stage should bind `useSpring` (a live `target` ref the play button re-seats), so a re-press inherits live `(position, velocity)` and each register settles on its OWN clock.**
- **FINDING A2 (entrance — DEAD).** No card / sub-section / stage has ANY entrance animation — zero `.scroll-cascade`/`.scroll-build`/`vReveal`/`<StoryHeader>` cluster, zero spring-mount. On a MOTION page this is the most conspicuous miss: the page that teaches the entrance vocabulary has no entrance of its own. → covered by **W-STORY-PAGE-STANDARD** (the standardized glassy-sub-card entrance) + **W-LIQUID-ENTRANCE-GENERAL** (the iOS-27 squish-fade-settle generalized to every surface entrance). The springs page is the canonical first consumer of both.
- **GOOD:** the named-register table is genuinely single-sourced (no local `damped()` fork — the dead closed-form is gone), the playground response/ζ → `linear()` readout is correct + live, and the overshoot computation samples the REAL `springTimingFunction(.fn)`.

## 2 · PROCEDURAL VIZ — adherence to PROCEDURAL-SUITE + GPU/Safari bar

**N/A — no procedural viz.** This is a CSS/rAF transform demo, not a suite member (no aurora/blob/fourier/dot GPU surface). The manifest assigns `background: "constellation"` (a LIVE GL field) to the page — correct per the "glass over a colorful field" mandate, and within the one-GL-per-route budget (the page itself spends zero GL). No spec to grade. The lone concern is the demo card's own readability over the constellation field (see §6).

## 3 · PERFORMANCE — compositor-only? offscreen-pause? layout-thrash?

**Mostly good, one PRM-correctness gap that is also the perf gap.**

- **Compositor-only: PASS.** The named-register card writes `--demo-x`/`--demo-rotate`/`--demo-l` into a `transform: translate()+rotate()` + `oklch()` background (transform + paint, no layout property). The playground writes `transform: translateX()` directly. Both honor motion-canon P5 — no `width`/`top`/`left` animation, no layout-thrash.
- **FINDING P1 (the playground rAF is unmanaged + PRM-blind).** `playgroundPlay()` hand-rolls a raw `requestAnimationFrame` loop (`springs.vue:127-134`) with NO `prefers-reduced-motion` gate, NO offscreen-pause, and NO `onBeforeUnmount` cancel (only an in-function `cancelAnimationFrame(playRaf)` on re-press — a play in flight when the user navigates away leaks the rAF). This is the exact hand-rolled-rAF anti-pattern the motion canon forbids: the library OWNS `useNumericTransition` (auto-cancels on unmount) and `useSpring` (PRM fast-path + scope-dispose). → **MODIFY: route the playground travel through `useSpring` (live target = the 280px end), which gives free PRM-snap + scope cleanup + the interruptible re-press the playground most wants.**
- **FINDING P2 (the named-register tween is PRM-blind).** `NumericAnimation` (the tween `useNumericTransition` wraps) has NO PRM amplitude-scale — only `SpringProgress` does (the keyframes.js `amplitudeScale` resolved per re-seat). So under `prefers-reduced-motion: reduce` the named-register stage animates at FULL travel (360px slide + 18° rotate). Motion-canon P6 (PRM keeps the fade, drops the transform) is VIOLATED on this page. Fixing A1 (bind `useSpring`) closes this for free — `useSpring`'s `respectReducedMotion` default snaps the value with zero transform frames.

## 4 · SAFARI compatibility

**PASS — no WebKit hazard.** `transform`/`oklch()`/CSS-custom-property writes are all Safari-safe; `oklch()` is Baseline in Safari 15.4+. No `backdrop-filter` animation, no `filter` blur-settle (the WebKit-fragile path), no scroll-timeline on this page. The ONE caveat: if A2/W-LIQUID-ENTRANCE-GENERAL lands a `filter: blur()` settle on the sub-card entrance, it must carry the Safari `filter` arm the entrance wave already scopes.

## 5 · IDIOMATIC / no-legacy — transpose for elegance

- **GOOD (single-source, no fork):** the dead local `damped(stiffness, damping)` closed-form is gone; `PRESET_IDS` is derived off `SPRING_PRESETS` (filtered for `dock`); `presetFn` reads `springPreset` + `springTimingFunction`. The demo genuinely cannot drift from the token vocabulary. This is the idiomatic core — KEEP.
- **FINDING I1 (dual animation path — the tween-vs-physics split IS the legacy).** The page runs TWO motion paths to show ONE thing: the tween (`useNumericTransition`) for the named card + a raw rAF for the playground. Both should be the ONE shipped physics engine (`useSpring`). The split is the architectural-transposition target — collapse to `useSpring` and the page teaches what it documents.
- **FINDING I2 (raw chrome off the chassis).** The playground "seed a register" chips + the copy button are hand-rolled `<button class="rounded-pill border border-border/60 …">` with bespoke `hover:bg-[var(--surface-tint-1)]` recipes — NOT `<Button>` / `<SelectableChip>` / `<IconChip>`. The page that should "deftly use a series of glass-ui components" hand-rolls its chrome. → **FOLD into W-STORY-PAGE-STANDARD** (the chips → `<SelectableChip>` / `<ToggleGroup>`; the copy → `<Button variant="ghost" size="icon">`).
- **FINDING I3 (path label — already standard).** The page's import label is `@mkbabb/glass-ui/motion` (the public-export convention) — CORRECT, no fix. (It is one of the 90 conformant pages, not the 28 `/cat/slug` stragglers.)

## 6 · The glass six-layer composite

**ABSENT on the hero surface — the central structural finding for the user's brief.** The named-register STAGE is `bg-background/40` + `paper-grain-overlay` (a flat translucent paper plate), and the moving card is an OPAQUE `oklch()` violet tile with `shadow-cartoon` — neither is a glass tier, so backdrop-blur + surface-tint + edge-rim + inner catch-light are all missing; the constellation field behind it is occluded, not refracted. The sub-sections are bare `<StorySection>` blocks, NOT "each in its OWN glassy card", and there is no BIGGER main card. The only real glass is the small `linear() readout` (`glass-card`) + the range cells (`glass-quiet`). → the page is the textbook case for the user's four asks: **(a) each sub-section → its own glassy card; (b) the main register stage → a BIGGER deep-glass tier (`.glass-deep`, W-DEEP-GLASS-20PX) so the moving spring tile floats over the LIVE constellation as refractive glass; (c) leverage the dock contextual-switch API to swap register/playground contexts (the `<DockLayerGroup>` idiom) instead of two stacked `<StorySection>`s; (d) demos over the colorful field.** → **FOLD into W-STORY-PAGE-STANDARD** (the glassy-sub-card + bigger-main-card conformity) + **MODIFY W-DEEP-GLASS-20PX** to name the spring stage as a consumer.

---

## Tranche mapping (FOLD / MODIFY / AUGMENT / PRUNE)

| # | Finding | Action | Wave |
|---|---|---|---|
| A1/I1/P2 | Demo drives a TWEEN (+ raw rAF), not the shipped `useSpring` physics; PRM-blind; not interruptible | **AUGMENT** (re-transpose the stage onto `useSpring` — live target, per-register clock, interruptible re-press, free PRM) | **W-STORY-PAGE-STANDARD** (`<DemoInteraction>` sub-type binds the real engine) + note on motion-canon P4/P6 |
| A2 | No entrance animation anywhere on a MOTION page | **FOLD** | **W-STORY-PAGE-STANDARD** + **W-LIQUID-ENTRANCE-GENERAL** (springs = first consumer) |
| P1 | Playground hand-rolled rAF: no PRM, no offscreen-pause, leaks on unmount | **MODIFY** (route through `useSpring`) | **W-STORY-PAGE-STANDARD** |
| I2 | Raw `<button>` chrome instead of `<Button>`/`<SelectableChip>`/`<IconChip>` | **FOLD** | **W-STORY-PAGE-STANDARD** (the "deftly composes a series of components" gate) |
| §6 | No glass six-layer on the hero stage; no per-section glassy cards; no BIGGER main card; dock-switch API unused | **FOLD** + **MODIFY** | **W-STORY-PAGE-STANDARD** + **W-DEEP-GLASS-20PX** (name the spring stage consumer) |
| I3 | Path label `@mkbabb/glass-ui/motion` | **none** (already conformant) | — |
| — | `SPRING_PRESETS`/`curves.ts` single-source, no fork | **KEEP** | — |

No NEW wave required — every finding folds onto the two drafted Band-17 waves (`W-STORY-PAGE-STANDARD`, `W-LIQUID-ENTRANCE-GENERAL`) + a `MODIFY` on `W-DEEP-GLASS-20PX`. The src components themselves are sound (single-sourced, no dead code); the gap is the DEMO under-using the shipped engine + glass — exactly the Pass-E thesis.

---

### 5-line verdict
1. **The src is sound — the DEMO is the gap:** `SPRING_PRESETS`/`curves.ts` are genuinely single-sourced (dead `damped()` fork already pruned), but the page drives a fixed-duration TWEEN (`useNumericTransition`) + a raw rAF to "play" springs while the library SHIPS the real physics engine (`useSpring`, PRM-aware, interruptible) it never binds.
2. **PRM is VIOLATED (motion-canon P6):** the named-register stage (NumericAnimation has no PRM amplitude-scale) AND the playground (raw rAF, zero PRM gate) both animate at full travel under `prefers-reduced-motion: reduce`; the raw rAF also leaks on unmount.
3. **No glass + no entrance:** the hero stage is a flat paper plate with an OPAQUE cartoon tile (zero of the six glass layers), sub-sections are bare blocks (not per-section glassy cards), there's no BIGGER main card, the dock contextual-switch API is unused, and the page that teaches entrances has none.
4. **Safari: clean** (transform/oklch only, no `backdrop-filter`/`filter` animation); chrome is hand-rolled `<button>`s instead of `<Button>`/`<SelectableChip>` — the "deftly composes components" bar is missed.
5. **Action:** all findings FOLD onto the drafted `W-STORY-PAGE-STANDARD` (glassy sub-cards + bigger main card + bind `useSpring` + real component chrome) + `W-LIQUID-ENTRANCE-GENERAL` (the springs page as first consumer) + a MODIFY on `W-DEEP-GLASS-20PX` (name the spring stage) — no new wave needed.
