# motion/countup — COMPONENT deep audit (Pass-E)

**Page:** `motion/countup` · **Import label (canonical):** `@mkbabb/glass-ui/motion`
**Real source:** `src/composables/motion/useCountup.ts` (177L) — a DOM-walking editorial count-up animator. NOT a Vue component; a composable that reaches into live DOM, walks `[data-countup]` figures under a host, and tweens each `textContent` 0→target.
**Engine:** keyframes.js `NumericAnimation` (value.js-free callable easing — keeps the static graph off the value.js boundary). Correctly keyframes-BEARING → on `/motion`, OFF the root barrel + `/motion-core` (verified: `src/composables/motion/index.ts:82` re-exports; absent from `src/index.ts`/`src/motion-core.ts`). Published type alias `Countup` (api/types-extra.ts).
**Consumers (≥2 bar MET):** `demo/stories/motion/countup.vue` + `demo/stories/data/metric-cell.vue` (the `[data-countup]` DOM contract). Originated as the slides hand-rolled count-up reconciled into the library (the leaked-rAF-on-unmount fix the header comment names).

---

## (1) ANIMATION affordance — PARTIAL, NOT four-state; trigger-driven

- The tween itself is HIGH-quality: per-figure `dur`/`delay` off the DOM attrs, `easeOutBack` overshoot in the demo, `Math.round` per-frame write, in-flight handle tracked per element so a re-run/teardown stops the live tween (the leaked-rAF fix). PRM-snap correct (`prefersReducedMotion()` → instant target write, no tween). `settle()` snaps every doc-wide figure (still-capture path).
- **GAP A (the headline):** this is a manual-TRIGGER animator — the demo wires `runActive` to a `<Button>Run`. There is NO auto-play-on-enter. The motion-canon entrance contract (a figure that animates AS IT scrolls into view) is unmet: no `useIntersectionPause`/`IntersectionObserver`/`view()` gate, so a count-up below the fold is either already-finished or frozen-at-0 depending on when Run was clicked. An editorial count-up's canonical trigger is on-enter, not a button.
- **GAP B (engine PRM bypass):** the composable hand-rolls `prefersReducedMotion()` via `matchMedia` rather than letting `NumericAnimation`'s own `respectReducedMotion` policy snap (the engine ships `setRespectReducedMotion`/`respectReducedMotion` — verified in keyframes.d.ts). Two PRM paths for one concern; the engine path is the idiom (`useAnimatedNumber`/`useSpring` siblings use the engine policy). It also reads `matchMedia` ONCE at run-time with NO live `change` listener — a mid-session PRM flip is not re-monitored (the AV.W7 substrate live-re-monitor idiom is the canon this misses).
- **GAP C (delay = setTimeout):** the delay is a `setTimeout` deferral with a monkey-patched `anim.stop` to clear the timer (lines 138-148). Reassigning `anim.stop` is a non-idiomatic mutation of the engine handle; the engine has no delay opt so the workaround is understandable, but the clean transposition is a single grouped/staggered play (an `AnimationGroup` delay, or a `keyframes` offset).

## (2) PROCEDURAL VIZ — N/A
No aurora/blob/fourier/GPU surface. Out of scope for the GPU-only/Safari-shader bar; the `motion/countup` page is a text-tween demo, not a viz route.

## (3) PERFORMANCE — mostly clean; ONE thrash class
- **Compositor:** the per-frame write is `textContent` (a text-node mutation, NOT a transform), so EVERY frame triggers layout + paint on the figure. `tabular-nums` + `fira-code` (monospace) in the demo keep the box WIDTH stable so it is not a reflow-cascade, but it is by definition a non-compositor channel (the only honest way to tween a NUMBER's text). Acceptable for ≤3 short figures; a dense grid of count-ups is a per-frame layout storm. The `Math.round` keeps writes coarse (no sub-pixel churn).
- **NO offscreen-pause:** absent IntersectionObserver, an off-screen mid-tween figure keeps writing `textContent` each frame (the engine rAF runs regardless of visibility). This is the same omission as GAP A from the perf side.
- No leak (handle tracked + `onScopeDispose(cancel)` + per-element `stop`). Good.

## (4) SAFARI — compatible
`matchMedia`, `querySelectorAll`, `textContent`, `setTimeout`, keyframes.js rAF — all Safari-safe. No `@property`, no `backdrop-filter`, no scroll-timeline in the composable. PRM media query honored. Green.

## (5) IDIOMATIC / no-legacy
- The composable is well-shaped (single engine, value.js-free callable, tracked teardown, named `Use*Return`). NOT legacy.
- The monkey-patched `anim.stop` (GAP C) and the dual PRM path (GAP B) are the two non-idiomatic seams. The `el.getAttribute("data-countup-dur") ?? "1200"` magic-default trio is fine as a DOM contract but undocumented in any token.
- The demo (`countup.vue`) is the deeper miss per the user's brief: ONE flat `<section>` with a bare prose `<p>`, a button row, and a single 3-cell glass-card grid — NOT each sub-section in its own glassy card, the main card area is NOT bigger, NO dock contextual-switching, NO aurora backdrop, NO tabs. The three `glass-card` cells are the only glass present; they sit over the default StoryPage backdrop, not a colorful aurora. The import in the demo is the deep relative path (`../../../src/composables/motion/useCountup`), not the canonical `@mkbabb/glass-ui/motion` label — standardization owed.

## (6) Glass six-layer composite — DELEGATED (component is logic-only)
`useCountup` paints zero pixels (it writes text). The glass composite is the demo `.glass-card`'s responsibility (the 5-rung `--glass-*` ladder supplies backdrop blur+saturate · tint · rim · catch-light · shadow · grain). The figure itself rides NO glass; correct for a logic composable. The page-level six-layer obligation falls to the demo redesign, not the composable.

---

## BD tranche mapping

| Finding | Disposition | Wave |
|---|---|---|
| GAP A — no auto-play-on-enter / no IntersectionObserver entrance gate | **AUGMENT** — add an opt-in `playOnEnter`/`view()` entrance trigger (motion-canon P-entrance) | NEW sub-wave under the motion-band component canon; cite **BD.W-BC-COMPONENT-CANON** family (component-canon home) + the AV.W7 offscreen-pause idiom |
| GAP B — dual PRM path, no live re-monitor | **MODIFY** — route PRM through `NumericAnimation.setRespectReducedMotion` + a cached `matchMedia` `change` listener (the substrate idiom) | **MODIFY** under BD.W-BC-COMPONENT-CANON (P6 PRM canon already binding) |
| GAP C — monkey-patched `anim.stop` for delay | **MODIFY** — transpose the `setTimeout` delay onto a grouped/offset play, drop the handle mutation | same MODIFY wave |
| Perf — no offscreen-pause on the rAF text-write loop | **FOLD** into GAP A's entrance gate (the IO that gates play also parks off-screen) | folds with GAP A |
| Demo: not-per-card / small main / no aurora / no dock / no tabs / deep-import label | **AUGMENT (demo, not src)** — the page-redesign brief; standardize import label to `@mkbabb/glass-ui/motion`, big main card, sub-sections in glass cards over aurora, dock contextual-switch | **BD.W-PAGE-HEADER-FOLD** + a motion-band page-redesign wave (cite **BD.W-TOKEN-TOUR-GLASS** precedent for the glass-specimen-host idiom) |
| Component otherwise idiomatic, ≥2 consumers, correctly off root barrel | **KEEP** — no prune | n/a |

---

## 5-LINE VERDICT
1. `useCountup` (`@mkbabb/glass-ui/motion`) is a well-shaped value.js-free DOM-tween composable with tracked teardown — KEEP the core; it is not legacy.
2. ANIMATION gap: it is manual-TRIGGER only — no auto-play-on-enter / IntersectionObserver entrance, so the motion-canon entrance contract + offscreen-pause are unmet (AUGMENT with a `view()`/IO entrance gate).
3. PRM is hand-rolled (`matchMedia` once, no live re-monitor) instead of the engine's `respectReducedMotion` policy, and the delay rides a monkey-patched `anim.stop` (MODIFY — transpose both onto idiomatic engine seams).
4. No procedural viz; Safari-clean; perf is acceptable for sparse figures but the per-frame `textContent` write is a non-compositor layout channel with no off-screen park (fold into the entrance gate).
5. The page itself is the bigger miss: flat single-grid, no aurora/dock/tabs, small main, deep-relative import — AUGMENT the demo per the brief (cite BD.W-PAGE-HEADER-FOLD + BD.W-TOKEN-TOUR-GLASS), standardize the label to `@mkbabb/glass-ui/motion`.
