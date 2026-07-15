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

### Drive a preview from external progress

Disable the built-in travel dot when another control owns progress; the authored
callable in `v-model` can drive any external preview directly.

```vue
<script setup lang="ts">
import { computed, ref } from "vue";
import { EasingPicker, type EasingPickerValue } from "@mkbabb/glass-ui/easing";

const curve = ref<EasingPickerValue>();
const progress = ref(0);
const eased = computed(() => curve.value?.fn(progress.value) ?? progress.value);
</script>

<template>
    <EasingPicker v-model="curve" :playback="false" />
    <input v-model.number="progress" type="range" min="0" max="1" step="0.01" />
    <output>{{ eased.toFixed(3) }}</output>
</template>
```

## Ownership boundary

Curve **math = value.js** · editor **component = glass-ui**. The travelling-dot
preview is a bounded editor-local normalized one-shot: it communicates the authored
curve, but is not reusable physical/keyframes playback.

This primitive OWNS only the chassis — the editable SVG canvas, the family/preset
selector, the re-parseable readout, the travelling-dot playback — and REACHES for
its math by COMPOSITION:

- the bezier curve is value.js `CSSCubicBezier(x1,y1,x2,y2)`;
- the staircase is value.js `steppedEase(n, term)`;
- the preset catalogue is value.js `bezierPresets`;
- the jump-term family is value.js `jumpTerms`.

It re-implements no curve math: there is no local cubic-bezier solver or staircase
evaluator. The preview dot reads the active value.js callable and exposes idle,
playing, and complete state plus restart/cancel behavior. Under reduced motion it
completes immediately without scheduling travel frames.

`EasingPicker` deliberately authors only CSS-reparseable cubic-bezier and steps
curves. Analytic bounce and spring catalogues remain value.js/keyframes-owned;
this component does not duplicate them.

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

## Preview authority

The travelling dot uses one local `requestAnimationFrame` clock for a single 1200 ms
normalized pass. This deliberately small authority is owned and cancelled by the
editor; it makes no keyframes.js ownership claim and creates no periodic or physical
playback mechanism.

## Consumers (the ≥2-consumer bar)

1. the curve-gallery demo (`demo/stories/motion/curve-gallery.vue`) — binds the
   picker in BOTH modes (bezier + steps), two live in-repo bindings;
2. value.js's `GradientPane` — consumes `<EasingPicker>` for the ease-along-the-ramp
   axis on its next pin bump (the cross-repo CONSUME contract, recorded by name; the
   foreign-tree fence holds — this primitive does NOT edit value.js).
