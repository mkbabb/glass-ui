# `@mkbabb/glass-ui/motion` + `/motion-curves` — the motion system

glass-ui's motion vocabulary has two published halves that speak ONE language:

- the **CSS half** — the `--spring-*` / `--ease-*` tokens (`tokens.css §2`, `theme.css`),
  consumed as `transition: … var(--spring-snappy)`;
- the **JS half** — the `@mkbabb/keyframes.js` suite (the steppers, sequencers, FLIP, gesture)
  + the `@mkbabb/value.js` easing set.

`/motion` is the distribution seam for the JS half. A consumer reaches the whole suite from ONE
place instead of adding a direct `@mkbabb/keyframes.js` + `@mkbabb/value.js` dependency and learning
a second vocabulary (AY.W-MOTION2).

## `/motion` — the keyframes.js suite + the composables (value.js-FREE)

```ts
import {
    // glass-ui composables (the keyframes-bearing leaves)
    useSpring, useSpringMount, useSpringPress, useNumericTransition,
    useAnimatedNumber, useCountup,
    // the keyframes.js STATIC suite, re-exported verbatim
    NumericAnimation, SpringProgress, SmoothProgress,
    Sequence, Timeline, ManualTimeline, RAFPlayback, ScrollTimeline, createNativeTimeline,
    flip, flipShared, ElementMorph, drag, Draggable, decay, decayRest, stagger,
    springTimingFunction, springLinearStops, toEasing, resolveEasing,
    loadAnimationEngine,
    // the shared spring-preset table (value.js-free pure data)
    SPRING_PRESETS, springPreset,
} from "@mkbabb/glass-ui/motion";
```

`/motion` ships the **STATIC** keyframes.js barrel (24 runtime exports + the erased types +
`loadAnimationEngine` itself). It is value.js-FREE — the cheap composables never drag the
~124 KB value.js peer.

### The HEAVY engine tier — behind `loadAnimationEngine()`

The 16-member `AnimationEngine` surface (`Animation`, `CSSKeyframesAnimation`, `AnimationGroup`,
`animate`, `presets`, `MotionPath`, `DrawSVG`, …) is the value.js-bearing heavy tier keyframes.js
deliberately gates behind a dynamic loader. glass-ui preserves that boundary verbatim — reach it
the same way keyframes.js consumers do:

```ts
const engine = await loadAnimationEngine();
engine.animate(el, { opacity: [0, 1] });
```

## `/motion-curves` — the complete curve library + the CSS↔JS table (value.js-BEARING)

```ts
import {
    MOTION_CURVES, motionCurve, MOTION_CURVES_CANONICAL,
    // the value.js ease* family + the bezier evaluator, re-exported verbatim
    easeOutCubic, easeOutExpo, easeInOutQuad, CSSCubicBezier, /* … */
} from "@mkbabb/glass-ui/motion-curves";

// the SAME curve the CSS uses, by name:
const easing = MOTION_CURVES["--spring-snappy"].js;   // a keyframes.js Easing
new NumericAnimation(frames, { timingFunction: easing });
```

`MOTION_CURVES` binds every `--ease-*`/`--spring-*` token to its JS twin:

- **spring rows** carry a keyframes.js `Easing` solved by `springTimingFunction(response, ζ)` over
  the SAME `(response, ζ)` pair the CSS `linear()` token was solved from (`springLinearStops`) — so
  the two halves can never drift (single-sourced in `springPresets.ts`).
- **bezier rows** carry a value.js `CSSCubicBezier(x1,y1,x2,y2)` callable (the same control points
  the `--motion-ease-*` token declares).
- **alias rows** resolve THROUGH their canonical row (`--ease-spring` → `--spring-snappy`), not a copy.

This is the value.js-bearing leaf, carved OFF `/motion` by measurement (§2.2): value.js has no
granular `/easing` sub-entry, so a consumer wanting ONLY the keyframes suite stays on `/motion` and
never reaches value.js; a consumer wanting the named curve set imports `/motion-curves`.

## The easing doctrine (§6) — which easing for which job

| Transition kind | Easing |
|---|---|
| Surface (bg / border / color / shadow / opacity) | `--ease-standard` (bezier — never a spring on a colour) |
| Transform — hover / press / active | `--spring-smooth` (the one interactive scale register) |
| Enter (mount / popover / dialog in) | `--spring-bouncy` / `--spring-snappy` |
| Exit (unmount / close) | `--ease-out` / `--ease-standard` (NO overshoot past gone) |
| Position-tracked (specular pointer follow) | `--ease-standard` |

The live `Curve Gallery` story (`/motion/curve-gallery`) renders every `MOTION_CURVES` row driven by
its JS twin, the token name + JS name side by side, with this table as the legend.

## Gate

`proof:motion-suite` is the two-tier parity manifest: STATIC rows PRESENT on `/motion`; DYNAMIC rows
REACHABLE through `loadAnimationEngine()` and NOT static (the boundary must not flatten);
CURVE-TABLE-BOUND (every `--ease-*`/`--spring-*` token has a `MOTION_CURVES` row); NO-FORK (rows
reference peer symbols, never inline a stop list or a bezier sampler); VALUE-FREE-MOTION (the
`/motion` chunk has zero static value.js import); a VERSION STAMP against the pinned
keyframes.js 4.1.0 / value.js 0.10.x.
