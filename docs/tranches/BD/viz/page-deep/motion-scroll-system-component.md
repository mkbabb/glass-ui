# Pass-E deep audit — motion/scroll-system component(s)

**Page:** `motion/scroll-system` · import label `@mkbabb/glass-ui/motion-core`
**Demo SFC:** `demo/stories/motion/scroll-system.vue` (consumer, not audited as src)
**Real src under audit:**
- `src/composables/motion/useScrollTrigger.ts` (327L) — the ONE scroll reader (BC.W-SCROLL-TRIGGER)
- `src/composables/motion/useScrollChrome.ts` (265L) — the floating-chrome collapse machine (BC.W-SCROLL-CHROME)
- `src/composables/motion/scrollReader.ts` (123L) — the rAF-coalesced listener core (INTERNAL leaf)
- `src/styles/scroll-chrome.css` (124L) — the `.scroll-chrome` compositor recipe + `@property --chrome-collapse-t` (property-regs.css §)

These are **composables + a CSS recipe**, NOT visual components. The "four-state contract" (DESIGN axis 2) and the glass six-layer composite do NOT apply — these are scroll-physics primitives a chrome surface (a dock/header) reads. The audit is scoped to what DOES apply: animation correctness, compositor-only/performance, Safari, idiomatic/no-legacy, and the dual-path single-writer.

---

## 1 · ANIMATION — affordance, spring physics, entrance/exit, dead/janky

**Strong, with two real defects.** The collapse machine is genuinely well-specced: motion-canon-coherent (P5 compositor-only, P6 PRM-discrete-survives, the SPATIAL `transform` / EFFECTS `opacity` split in the recipe), the iOS `onMomentumScrollEnd` snap-to-nearest, the velocity-flick short-circuit, and the persistent-by-default (`collapseOnScroll: false`) iOS-27 lesson. The bounded `opacity` floor (`--chrome-fade-depth: 0.28` → 0.72 floor, never invisible) correctly refuses the NN/g pale-fade trap. The shadow-lift-on-scroll is the Apple "shadows become more prominent as text scrolls under" cue, correctly OUTSIDE the PRM gate (a paint cue, not vestibular motion).

**DEFECT A1 — the ramp rides `linear()` only; there is NO spring physics on `collapseT` (the iOS-27 bar shrink is a hard-edged linear lerp).** `onDirectionTick` writes `apply(raw)` where `raw` is a pure `(pos - anchor) / span` linear fraction — no spring, no easing, no critically-damped follow. The DESIGN north-star + motion-canon P1 (spring-iff-spatial: a SPATIAL channel that reshapes rides a `--spring-<name>`) says the shrink IS a spatial reshape → it should glide on a spring's settle, not a raw scroll-proportional lerp. The reader's own `flipDeltaPx` hysteresis is the only smoothing; between flips the bar tracks the finger 1:1 with zero overshoot/settle. The `.scroll-chrome` recipe even comments "no CSS transition — the JS scalar already glides on the reader's tick" — but the JS scalar does NOT glide, it lerps. This is the gap between "functions" and "reads as liquid glass."
→ **AUGMENT** on `BD.W-PAGE-HEADER-FOLD` is the WRONG home (that's a demo-paste fold). This is a NEW src concern: thread a `useSpring`/`SpringProgress` (the `DRAWER_SNAP`/`DOCK_SPRING` per-spring-clock register) BETWEEN the reader's range-fraction and `apply()` so `collapseT` settles on a spring clock, PRM-snapped. Book a successor wave (`BD.W-SCROLL-CHROME-SPRING`) or FOLD into a motion-band wave; cite motion-canon P1/P4.

**DEFECT A2 — the ramp is driven by `watch(() => velocity.value)`, a value-identity-debounced tick that drops frames + couples the ramp to a velocity SIDE-channel.** `useScrollChrome` advances `collapseT` inside `watch(velocity, …)`. Vue's `watch` fires only on value CHANGE — two consecutive ticks with identical `velocity` (a perfectly steady scroll, or a velocity that round-trips to the same float) fire the watcher ZERO times that tick, so the range ramp skips. The ramp should be driven off the reader's OWN per-tick callback (the `createScrollReader` `onTick`), not a derived ref's change event. The reader already exposes `onCross` but the machine passes it a no-op and instead watches `velocity` + reads `readPos()` fresh — a second position read off the same source the reader just read (a redundant `scrollTop`/`scrollY` read, the "we read the live scroll position … the same way the reader does" comment admits the duplication).
→ **AUGMENT** (same successor wave): give `useScrollTrigger` a first-class `onTick(reader, {pos, dir, vel})` callback seam so a consumer machine drives off the canonical tick, not a velocity-ref side-channel. This removes the redundant `readPos()` AND the dropped-frame risk in one transposition.

**No entrance/exit on the chrome itself** is correct-by-design (a persistent bar has no mount entrance; the `.scroll-chrome` initial-value `--chrome-collapse-t: 0` is the expanded rest). No dead animation found in the recipe.

---

## 2 · PROCEDURAL VIZ

**N/A** — no aurora/blob/fourier/WebGL. These are pure DOM-scroll physics leaves. The PROCEDURAL-SUITE / GPU-only / Safari-GPU bar does not apply. (The demo story's `--motion-accent` dots are demo-local, not src.)

---

## 3 · PERFORMANCE — compositor-only, offscreen-pause, layout-thrash

**Clean.** (1) Compositor-only: the recipe touches ONLY `transform`/`opacity`/`box-shadow` + `will-change: transform, opacity` — zero layout props; `proof:no-layout-animation` holds by construction. (2) No free-running rAF: `scrollReader` schedules at most ONE in-flight frame per scroll burst (the `if (rafId) return` one-shot guard), event-driven — so when the user is NOT scrolling, zero CPU. This makes offscreen-pause MOOT (there is no loop to park; an offscreen un-scrolled port costs nothing). (3) No layout-thrash within a tick — `evaluate()` reads `position()`/`extent()` then writes refs; the only repeated read is the machine's redundant `readPos()` (DEFECT A2) which is a second `scrollTop` read but NOT interleaved with a write (no forced-reflow thrash). (4) Velocity is per-SECOND framerate-independent (`Δpos/Δt`), correct for 60/120Hz parity.

**MINOR P1 — element-trigger `resolveTriggerPx` calls `getBoundingClientRect()` on BOTH the element and the port EVERY tick** (`useScrollTrigger.ts:130-132`), a layout read per trigger per frame. For an element trigger under continuous scroll this is a per-frame rect read (cheap individually, but it forces style/layout flush each scroll frame if any pending mutation exists). The fraction/px triggers are flush-free. Acceptable at the current scale (a handful of triggers); worth a note if a consumer declares many element triggers.
→ **MODIFY** (low-pri, fold into the A2 successor): cache element-trigger rects + invalidate on `recalculate()`/ResizeObserver, not per tick.

---

## 4 · SAFARI compatibility

**Strong.** (1) The continuous `progress` ramp is `supportsScrollTimeline()`-gated (the dual-path single-writer): Safari (which shipped `animation-timeline: scroll()` in 26) rides the native compositor ramp; older Safari falls to the JS writer — both correct. (2) The discrete crossing events run the JS rAF tick on EVERY engine (events can't ride a CSS timeline) — no Safari gap. (3) `matchMedia` PRM + `addEventListener("change")` is the modern Safari-safe form (not the deprecated `addListener`). (4) `requestAnimationFrame`/`cancelAnimationFrame` guarded with `typeof … === "function"` (SSR-safe). (5) `window.pageYOffset` kept as a `scrollY` fallback (legacy-Safari-safe). (6) The `.scroll-chrome--native` keyframe path is `@supports (animation-timeline: scroll())`-gated, so non-supporting Safari reads the JS write. No `:has()`/container-query/un-gated-new-CSS Safari risk found.

---

## 5 · IDIOMATIC / no-legacy — workarounds, dead code, dual-path

**Mostly idiomatic — the no-fourth-listener fence is the headline win.** `scrollReader` correctly factors the ONE rAF-coalesced listener core that `useScrollTracker`/`useFadingScroll`/both readers compose; the SCC-trap discipline (vue-only, `/motion-core` subpath) is correct; the dual-path single-writer is the legitimate native-ramp/JS-events split, NOT a dual-path shelf-ware.

**DEFECT I1 (= A2 restated as a pattern smell) — the velocity-watch ramp is a non-idiomatic side-channel drive + a redundant second position read.** This is the architectural-transposition opportunity: a state machine over a reader should consume the reader's TICK, not watch a derived velocity ref and re-read the source. The clean transposition is the `onTick` seam (§1 A2). This is the single non-idiomatic pattern in the three leaves.

**No dead code, no dual-path, no legacy alias** found. `recalculate`/`recalc` naming (the reader's `recalculate` vs the machine's `recalc` that wraps it) is a faint smell but intentional (the machine re-settles the discrete state after the reader recalculates) — leave it.

---

## 6 · The glass six-layer composite

**N/A at the src leaf** — these composables paint nothing; the `.scroll-chrome` recipe deliberately touches only transform/opacity/box-shadow and DELEGATES the backdrop blur+tint+rim+catch-light to the chrome surface's own `glass-*` tier (the "blur stays crisp" W-DOCK-SHRINK-BLUR fence is correct — a shrinking bar must NOT animate its backdrop-filter). The six-layer composite lives on whatever surface (`glass-floating` header / a dock) composes `.scroll-chrome` — correctly out of scope here. The recipe's restraint (it does NOT clobber the surface's blur) is the RIGHT call, not a gap.

---

## 7 · Page-level asks (the user's redesign mandate — demo SFC, not src)

The story is `StoryPage` + 3 `StorySection`s of bordered-pill readouts + raw `glass-card`/`glass-quiet` scroll ports — it does NOT yet satisfy the user's per-page mandate (each sub-section its own glassy card / bigger main card / dock-API contextual-switching / glass-over-COLORFUL-aurora / a deft series of glass-ui components). The import label `@mkbabb/glass-ui/motion-core` is ALREADY standardized + consistent with its `scroll-vt`/`reveal`/`split-chars` siblings (no change owed). The header pills (`rounded-pill border border-border/60`) are raw recipe triplets, not `<MetricBadge>`/`<StatusDot>` primitives.
→ **AUGMENT** the demo SFC on `BD.W-PAGE-HEADER-FOLD` (the demo-page modernization band, zero src paint): give it the page-identity header fold; stage the two scroll ports over a colorful aurora (`<DockStage>`/`tier="field"` precedent, BA.W-STAGE); make the collapse-demo's floating header an ACTUAL `<GlassDock>` consuming `useScrollChrome` (dogfood the dock API the user asks for — this is also the binary-consumer-#2 the leaf's docstring promises but the demo currently fakes with a bare `<header>`); each readout pill → `<MetricBadge>`. This is a demo-paint wave, distinct from the §1/§3 src AUGMENTs.

---

## VERDICT (5 lines)

1. **Animation:** well-specced collapse machine (PRM-discrete, snap-to-nearest, velocity-flick, bounded opacity floor) BUT `collapseT` rides a raw LINEAR scroll-fraction with NO spring settle (DEFECT A1, motion-canon P1 violation) + is driven by a frame-dropping `watch(velocity)` side-channel with a redundant second position read (DEFECT A2/I1) → AUGMENT: a `useSpring` clock + an `onTick(reader)` seam, new wave `BD.W-SCROLL-CHROME-SPRING` (or fold into a motion-band wave).
2. **Procedural viz:** N/A — pure DOM-scroll physics, no WebGL.
3. **Performance:** clean — compositor-only (transform/opacity/box-shadow + will-change), one-shot-rAF event-driven (offscreen-pause moot), no thrash; MINOR per-tick `getBoundingClientRect` on element triggers → MODIFY (cache rects, fold into the A2 wave).
4. **Safari + idiomatic:** Safari-strong (scroll-timeline-gated dual-path, modern matchMedia, SSR guards); the no-fourth-listener `scrollReader` factor is the architectural win; the lone non-idiomatic pattern is the velocity-watch drive (= I1, transpose to `onTick`).
5. **Glass composite:** N/A at the leaf (correctly delegates blur+tint+rim to the chrome surface's `glass-*` tier — the blur-stays-crisp restraint is right); the demo SFC does NOT meet the user's bigger-card/colorful-aurora/dock-API mandate → AUGMENT on `BD.W-PAGE-HEADER-FOLD` (dogfood `<GlassDock>` + `useScrollChrome` as binary-consumer-#2, stage over aurora; import label already standardized).
