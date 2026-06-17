# EasingPicker / EasingConfigurator

The ONE published curve-authoring primitive (`@mkbabb/glass-ui/easing`) — a curve
editor that authors a cubic-bezier (draggable handles) OR a stepped staircase over
the REAL value.js twin and reads it back as a re-parseable CSS literal. This is the
C-3 fold landed (BB.W-EASING-PRIMITIVE): the two demo curve editors (the curve-
gallery's `BezierEditor`/`StepsEditor`) re-home onto it — no fourth fork.

```vue
<EasingPicker v-model="curve" mode="bezier" />   <!-- draggable cubic-bezier -->
<EasingPicker v-model="curve" mode="steps" />    <!-- the steppedEase staircase -->

<!-- the chassis-seated register (the picker as one row in a controls column) -->
<EasingConfigurator v-model="curve" label="Easing" mode="bezier" />
```

The `v-model` payload is the full authored-curve shape:

```ts
interface EasingPickerValue {
    mode: "bezier" | "steps";
    css: string;        // the re-parseable literal — cubic-bezier(…) / steps(…)
    fn: (t: number) => number;  // the live value.js callable the literal evaluates to
    points: [number, number, number, number];  // bezier control points
    steps: number;      // steps mode jump count
    term: JumpTerm;     // steps mode jump term
}
```

## The boundary law (the recorded fence)

curve **MATH = value.js** · playback/spring = keyframes.js · the editor
**COMPONENT = glass-ui** (kf-AFFIRMED at `KF-TO-GLASSUI-BB-ASKS.md:48`).

This primitive OWNS only the chassis — the editable SVG canvas, the family/preset
selector, the re-parseable readout, the travelling-dot playback — and REACHES for
its math by COMPOSITION:

- the bezier curve is value.js `CSSCubicBezier(x1,y1,x2,y2)`;
- the staircase is value.js `steppedEase(n, term)`;
- the preset catalogue is value.js `bezierPresets`;
- the jump-term family is value.js `jumpTerms`.

It re-implements NEITHER half — no hand-rolled cubic-bezier Newton-solver, no
hand-rolled staircase evaluator (the `curves.ts` NO-FORK discipline, now in a
published component). The optional spring-driven dot reads the library's
`MOTION_CURVES` table (which itself composes the keyframes.js `springTimingFunction`
+ value.js callables), never a hand-rolled spring solver.

## The single color event

The curve strokes `--motion-accent` — the motion family's single color event. The
root folds it into the component-local `--easing-curve-accent`
(`--easing-curve-accent: var(--motion-accent, var(--viz-legendre))`), so every accent
site reads the bare `(--easing-curve-accent)` shorthand (no `text-[var]`/`stroke-[var]`
arbitrary wrap) while the library's OWN `--viz-legendre` violet twin is the
self-sufficient default when a consumer has not declared `--motion-accent`. The
primitive is self-sufficient standalone AND honours the ppmycota fence (a demo hue
NEVER enters a library token); a consumer still overrides `--motion-accent` from any
ancestor.

## The `loop` playback seam (named successor)

The travelling dot's default playback is a one-shot rAF travel. The keyframes.js
LIGHT `Oscillator` (BOOKED at `KF-TO-GLASSUI-BB-ASKS.md:47`) slots into the
`playTravel`/`progress` loop seam when kf ships it — the idle-breath periodic phase
the dot loops off, a named-successor consume, NOT a blocking dependency.

## Consumers (the ≥2-consumer bar)

1. the curve-gallery demo (`demo/stories/motion/curve-gallery.vue`) — binds the
   picker in BOTH modes (bezier + steps), two live in-repo bindings;
2. value.js's `GradientPane` — consumes `<EasingPicker>` for the ease-along-the-ramp
   axis on its next pin bump (the cross-repo CONSUME contract, recorded by name; the
   foreign-tree fence holds — this primitive does NOT edit value.js).
