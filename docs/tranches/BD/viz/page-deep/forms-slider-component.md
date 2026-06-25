# Pass-E deep audit — forms/slider COMPONENT

**Page:** `demo/stories/forms/slider.vue` · **Import label (demo):** `../../../src/components/ui/slider` (raw relative — the published label is `@mkbabb/glass-ui/slider`)
**Real source under audit:**
- `src/components/ui/slider/Slider.vue` (19.5 KB SFC — reka `SliderRoot`/`Track`/`Range`/`Thumb` wrapper + scoped CSS recipes)
- `src/components/ui/slider/index.ts` (`sliderVariants` CVA — `standard`|`spectrum` × `sm`|`md`|`lg`)
- `src/components/custom/dock/composables/useDockHold.ts` (host-native keep-dock-open token)
- `src/composables/dom/useTouchGate.ts` (scroll-vs-drag arbitration)

This is a **glass primitive, not a procedural-viz** — sections (2) PROCEDURAL VIZ and the GPU/compute bars are N/A by type. Audit covers ANIMATION, PERFORMANCE, SAFARI, IDIOMATIC/no-legacy, and the glass six-layer composite.

---

## 1 · ANIMATION — four-state contract + spring physics + entrance/exit

**Four-state contract: PARTIAL.**
- **rest / hover / active / disabled** all paint (hover lifts the fill rim `0 0 0 1px --surface-tint-8`; `:active` scales the fill `--scale-press-btn` 0.97; `[data-disabled]` drops opacity). Plus a `[data-held]` 5th register (dock-keep-open halo) and `[data-touch-active]`. The state *coverage* is good.
- **MISSING — no spring-physics primitive.** The press "give" is a CSS `transition: transform … --spring-smooth` only. The component imports **zero** of `useSpringPress` / `useLiquidPress` / `useLiquidFlex` — the motion-canon §"ONE interruptible coupled spring-press" (W-PRESS-UNIFY) names the interactive surfaces that should ride `useSpringPress`, and the dock control is the *booked third consumer*. A scrubber the user drags continuously is the strongest spring-press candidate in the forms band, yet it has the **weakest** press model (a one-shot CSS transition, not the interruptible velocity-continuous re-seat). A rapid press-release-press does not inherit momentum.

**P4 VIOLATION (motion-canon, MANDATORY) — 4 sites.** Every spring-curve transition MUST pair `--spring-<name>` with its matching `--spring-<name>-duration`, NEVER a generic `--duration-*`. The slider pairs `--spring-smooth` (the `linear()` curve, normalized 0..1, settle-time DISCARDED) with **`--duration-fast` (0.2s)** instead of **`--spring-smooth-duration` (0.36s)**:
- `Slider.vue:271` (`.slider-thumb` transform)
- `Slider.vue:314` (`.glass-slider:active .slider-range` press)

This re-times the smooth spring to the wrong wall clock and drags the exact dead sub-pixel tail motion-canon P4 condemns (the R10-2 read). `proof:animation-coherence`'s DURATION-BAND arm is the gate that should red this; it is currently green only because the slider was never enrolled — a genuine miss.

**Entrance/exit: ABSENT.** No mount entrance, no `vReveal`, no `--scroll-cascade` build. Per motion-canon P2 (enter bouncy/snappy) + the W-SCROLL-MOTION `.scroll-cascade` register every StoryPage child should build in; the slider section paints flat. (This is half a demo-page concern, half a primitive concern — a primitive should at least be `vReveal`-compatible without re-parenting.)

**Surface (EFFECTS) transitions: CORRECT.** bg/border/box-shadow legs ride `--duration-fast --ease-standard` (bezier) — P1-correct (effects-on-bezier). Only the transform legs are mis-clocked.

---

## 2 · PROCEDURAL VIZ — N/A

No aurora/blob/fourier/GPU surface. The `spectrum` variant consumes a consumer-supplied `--slider-track-bg` gradient (value.js LCH ramp) but renders no shader. GPU-only/Safari/PROCEDURAL-SUITE bars do not apply.

---

## 3 · PERFORMANCE

- **Compositor-only: MOSTLY.** Press rides `transform: scale` (compositor-safe). BUT the hover/held registers animate `box-shadow` (`transition: box-shadow …`) — box-shadow is a **paint** property, not compositor; a hovered/held slider repaints the rim each frame. Low-frequency (hover is a step, not a per-frame drive) so not a thrash, but it is not the `filter`/`opacity` compositor ideal.
- **No layout-thrash in steady state.** The only `getBoundingClientRect`-class read is none here (useTouchGate reads `clientY` deltas only). `useDockHold` attaches/removes window listeners only on press — clean.
- **`backdrop-filter` on `.slider-range`** (`--glass-blur-quiet`) is a real per-frame backdrop cost on the moving fill during a drag — acceptable for a single control, but note glass-cannot-sample-glass: a glass slider inside a glass card double-blurs (DESIGN.md §six-layer — the dock/card already blurs; the range re-blurs the already-blurred plate). Worth a gestalt check on the colorful-aurora redesign.
- **No `will-change`/`contain`** on the moving range — a `will-change: transform` on `.slider-range` during `:active`/`[data-held]` would promote the press cleanly. Minor.

---

## 4 · SAFARI compatibility — GOOD

- `-webkit-backdrop-filter` paired on every `backdrop-filter` site (range fill + spectrum reset). ✓
- `corner-shape: superellipse(2)` is `@supports`-gated with a generous proportional `border-radius` round fallback (`:379`) — the ~35% of engines without `corner-shape` get a squircle-adjacent round, not a broken square. ✓ (the documented cross-engine contract).
- No `:has()`/container-query in the critical path. The size geometry is `[data-size]`-scoped shipped CSS (BA.W-EMISSION fix — the dead arbitrary-property CVA that left `size` inert in consumers is already corrected). ✓

---

## 5 · IDIOMATIC / no-legacy

- **GOOD architectural transposition already landed:** the native-host-listener fix for reka's forwardRef `@pointerdown`-drop (useDockHold) is the *correct* idiom — a Vue template binding silently no-ops across the Slot boundary (the `feedback_glass_ui_binding_verification` class). The single-acquire-flag collapse (no duplicated booleans, no window-pointerup re-impl, no parallel `touchGate` watch) is clean.
- **`--slider-thumb-spring` indirection (`:272`/`:315`)** — a `var(--slider-thumb-spring, --spring-smooth)` consumer hook. Harmless, but it lets a consumer pair an arbitrary spring with the hardcoded `--duration-fast` — compounding the P4 miss. The retune knob should be the *duration-paired* register, not a bare curve override.
- **No dead code / dual-path** found in the SFC — the invisible-thumb model (standard) vs visible-thumb (spectrum) is ONE recipe forked by `[data-variant]`, not two components. Idiomatic.
- **DOC-LANGUAGE BLOAT (user ask "tighten superfluous language"):** the scoped CSS carries ~120 lines of comment prose re-deriving the same "you pull the track, the thumb is invisible" point across `.slider-range`/`.slider-thumb`/index.ts — heavily redundant with the CLAUDE.md/index.ts docstring. A tightening pass is warranted.

---

## 6 · Glass six-layer composite — PARTIAL (4 of 6 on the fill)

On `.slider-range` (the standard glass cylinder):
1. backdrop blur+saturate — ✓ (`--glass-blur-quiet`, which carries the saturate companion)
2. surface tint — ✓ (`color-mix(in oklab, --primary 88%, transparent)`)
3. edge rim — ✓ (`--glass-material-rim`)
4. inner catch-light — ✓ (`.glass-specular-track` on the thumb routes the unified `.glass-material::before` catch-light; PRM-pinned)
5. drop shadow — ✓ (`--glass-under-shadow-quiet` under-shadow)
6. grain — **MISSING** (no `--paper-clean-texture` grain `::after` on the range; the W-LIQUIDHOVER grain layer is not composed). For a hero glass cylinder this is the one absent optical layer.

The catch-light (layer 4) lives on the *thumb* (`glass-specular-track`), which is **invisible** in the standard variant — so the standard cylinder's catch-light rides a zero-width element. Worth verifying the `::before` actually paints over the fill, not the collapsed thumb box.

---

## FOLD/MODIFY/AUGMENT/PRUNE → BD tranche mapping

| Finding | Action | Wave |
|---|---|---|
| P4: `--duration-fast` paired with `--spring-smooth` (4 sites) — generic clock on a spring leg | **MODIFY** (src paint) — re-pair to `--spring-smooth-duration`; enroll in `proof:animation-coherence` DURATION-BAND | **NEW wave needed** — no current BD wave touches `Slider.vue` src (BD is Band-4 *zero-src* demo-fold + the single `BD.W-ARIA-ORIENTATION-GUARD` which is `SegmentedTabs`-fenced). Cite as a BD src-defect to slot beside W-ARIA-ORIENTATION-GUARD's "net-new SFC wave the cut owes" precedent. |
| No `useSpringPress` — weakest press in the band; W-PRESS-UNIFY booked the dock-control third consumer, slider is the stronger candidate | **AUGMENT** — bind `useLiquidPress`/`useSpringPress`, interruptible velocity-continuous press | **NEW wave** (W-PRESS-UNIFY successor — slider as the 4th/booked consumer) |
| Layer-6 grain absent on the glass cylinder; verify catch-light paints over fill not collapsed thumb | **AUGMENT** — compose the W-LIQUIDHOVER grain `::after`; relocate catch-light owner | **NEW wave** (glass-composite completeness, beside `BD.W-DEEP-GLASS-20PX`) |
| Demo page: bare `<section>`s, no glassy cards, no aurora, flat header paste | **FOLD** (demo, zero src) — each sub-section → its own `<Card>`/`<ShowcaseFrame>`; header → chassis; bigger main card; aurora backdrop | **`BD.W-FORMS-CARD-FOLD`** (card/section fold) + **`BD.W-PAGE-HEADER-FOLD`** (the 36-file header paste — forms/slider IS in the set) |
| Import label is raw relative `../../../src/...` | **MODIFY** (demo) — standardize to `@mkbabb/glass-ui/slider` | folds into **`BD.W-FORMS-CARD-FOLD`** demo-modernization scope |
| ~120 lines redundant CSS-comment prose | **PRUNE** (src, doc-only) — tighten | beside the MODIFY src wave above |
| box-shadow animated on hover/held (paint, not compositor); no `will-change` on press | **MODIFY** (minor) — `will-change: transform` on `:active`/`[data-held]`; accept box-shadow step | low-priority rider on the press-AUGMENT wave |
