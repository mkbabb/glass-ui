# AZ.W-MOTION-SUITE — the robust /motion demo + the springs.vue local-spring fork kill · DELTA

<!-- surface-paths: demo/stories/motion/curve-gallery.vue, demo/stories/motion/curve-families.ts, demo/stories/motion/BezierEditor.vue, demo/stories/motion/springs.vue, demo/stories/motion/scroll-vt.vue, demo/stories/foundations/motion.vue, demo/demo.css -->
<!-- surface-hash: ed06832b59daa2b23b79f748088b078aaca146444b8adb4aa114342dfa74d838 -->
<!-- AZ.W-GATES (D6) content-hash freshness model: fresh IFF the seven surface-paths'
     bytes are byte-identical to capture time (sha256 of the "\n"-joined bytes,
     computed via proof-live-verified-ledger.mjs::surfaceHash). Stamped at the
     own-surface capture against the current tree bytes — the /motion routes were
     navigated on :5199 (127.0.0.1) with the wave's source edits in place by
     tests-visual/motion-demo.spec.ts (the π half). -->

AY.W-MOTION2 landed the motion single-source (`springPresets.ts` / `curves.ts` /
`suite.ts`) explicitly to KILL spring-vocabulary drift — but the DEMO still forked it.
This wave makes the `/motion` section a robust demonstration of the FULL motion design
language and kills the demo-side fork.

## What changed

- **The springs.vue local-spring fork is DEAD (the headline).** The local
  `damped(stiffness, damping)` closed-form + the arbitrary `40/12·120/18·90/8·20/10`
  pairs are DELETED; the orchestrator now drives off `SPRING_PRESETS` / `springPreset()`
  / `springTimingFunction({response, dampingFraction})` — the SAME twin
  `springLinearStops` solves the CSS `linear()` token from. The `smooth`-register
  "Critically damped" mislabel is corrected (smooth is ζ=0.86 SETTLE; gentle is the
  critically-damped row — the blurb now reads the `springPresets.ts` register doc).
- **The curve gallery plots the FULL 10-family canon.** A SegmentedTabs family header
  (`Standard / Sine / Quad / Cubic / Expo / Circ / Back / Bounce / Steps / Custom`)
  groups every curve, each plotted off its REAL JS twin: the glass-ui canonical springs
  + bezier cores via `MOTION_CURVES`, the analytic ease* set via `curves.ts`, **Back**
  via the value.js `bezierPresets["ease-*-back"]` → `CSSCubicBezier`, the **Bounce**
  family via the value.js `bounce*Ease` siblings, and **Steps** via the value.js
  `steppedEase`/`stepStart`/`stepEnd` generators — all imported DIRECTLY from
  `@mkbabb/value.js` (the sanctioned twin; `curves.ts` is UNTOUCHED). No fake hint-SVG.
- **A live spring playground.** `response`/ζ `LabeledSlider`s feed `springTimingFunction`
  and read back the exact `linear()` stops `springLinearStops` emits (with copy +
  per-register seeds + an overshoot readout) — the user authors a spring live, which
  retires the fork's reason-to-exist.
- **A live editable cubic-bezier editor** (the `Custom` family), transposed
  TAILWIND-FIRST from the keyframes `EasingEditor` + `EasingCurveCanvas` chassis — the
  draggable canvas drives the REAL value.js `CSSCubicBezier` twin (no hand-rolled
  sampler), with the `bezierPresets` dropdown + the re-parseable `cubic-bezier(…)`
  readout/copy. NO raw pasted keyframes CSS (Tailwind utilities + token vars only).
- **A Scroll & View Transitions story** consuming the SHIPPED facilities: the
  `scroll-driven.css` `.scroll-progress` (scroll() timeline) + `[data-scroll-reveal]`
  (view() timeline), the `startViewTransition` `.gl-list-item` reorder, and a
  `supportsScrollTimeline`/`supportsViewTimeline` capability badge — their first live
  demonstration.
- **`foundations/motion.vue` de-duplicated.** The 10-curve fake-hint-SVG table (the
  hardcoded quarter-ellipse `path d` constants) is DELETED; the page now focuses on the
  §6 easing-doctrine legend + the Vue `<Transition>` grammar tour (the CSS-half).
- **The ONE coherent purple identity.** `--motion-accent: var(--viz-legendre)` is minted
  DEMO-LOCAL (the glass-ui violet twin of ppmycota) and re-points every plot stroke,
  driven dot, and the spring animated block off the prior warm-red `hsl(--demo-hue)`
  block. **ppmycota stays DEMO-LOCAL — it never enters `src/styles/`** (presets-in-
  consumers; machine-checked by `proof:motion-demo` + a `src/styles` grep).

## π readback (the binding visual truth)

`W-MOTION-SUITE-purple-readback.json` — the live `--motion-accent` resolves to hue
**317.4° (light)** / **318.3° (dark)**: the violet `--viz-legendre` family (`oklch
0.532 0.180 317.5` / `0.739 0.134 318.1`), verdict **violet** in both modes — NOT
warm-red (~20-40°). The plot strokes + driven dots read the SAME violet (one color
event), verified off the painted DOM by `tests-visual/motion-demo.spec.ts`.

## Captures (desktop 1280×900, light + dark)

- `W-MOTION-SUITE-curve-gallery-after-{light,dark}.png` — the all-families gallery (the
  SegmentedTabs family strip + the violet real-twin plots/dots).
- `W-MOTION-SUITE-bezier-editor-{light,dark}.png` — the live editable cubic-bezier
  (Custom family): the draggable violet curve + the preset dropdown + the readout/copy.
- `W-MOTION-SUITE-springs-after-{light,dark}.png` — the spring orchestrator (the violet
  block, no warm-red) + the spring playground.
- `W-MOTION-SUITE-scroll-vt-{light,dark}.png` — the scroll/VT story (the capability
  badges + the violet scroll-progress bar + the reveal scroller + the reorder list).

## Gates

- `proof:motion-demo` (device-free source arm) — **17/17 GREEN**: FORK-DEAD (no local
  `damped()`, imports the canonical source, no arbitrary pairs, no smooth-register
  mislabel), CURVE-FAMILIES-ALL (the exact 10-family set + the value.js direct twins +
  no fake SVG), SPRING-PLAYGROUND, SCROLL-VT-DEMO, FOUNDATIONS-DEDUP (no fake SVG, no
  curve table), PURPLE-IDENTITY (accent minted, plots read it, ppmycota demo-local),
  PARITY-PRESERVED (`proof:motion-suite` GREEN), the π-spec witness, and the bezier
  editor's tailwind-first witness.
- `tests-visual/motion-demo.spec.ts` (the π half) — 9/9 GREEN on chromium: the
  expanded-grid render, the live `linear()` slider-drag readback, the scroll/VT render,
  the violet color-readback, and the DELTA captures.
- The adjacent fleet (`proof:motion-suite` / `proof:motion-value-free` /
  `proof:motion-composables-consumer`) stays GREEN; `npm run typecheck` GREEN;
  `git diff --check` clean.
