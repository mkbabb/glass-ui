# EasingCurve / EasingPicker

`@mkbabb/glass-ui/easing` publishes two things: a curve you can **show** and a curve
you can **author**. It used to publish only the second, which is why three downstream
repositories each grew their own plot.

```vue
<!-- DISPLAY — no state, no composable, nothing to interact with -->
<EasingCurve :strokes="[{ d: pathD, tone: 'ink' }]" />

<!-- AUTHOR — one editor, both curves, one literal -->
<EasingPicker v-model="curve" />
<EasingPicker v-model="curve" surface="bare" :playback="false" />
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

`<EasingPicker>` takes four props — `initial` (any subset of the payload above),
`playback`, `label`, `surface` — plus `class`. The mode is chosen **in** the editor,
not by the parent: a segmented control switches which curve the handles edit, and the
other mode's curve stays on screen as a ghost.

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

## The frame is a constant

`viewBox` is `-0.1 -0.1 1.2 1.2` — square, both modes, every preset, every frame of a
drag. It is not fitted to the curve, and nothing in the plot is a function of it:
every stroke is a whole CSS pixel carried by `vector-effect: non-scaling-stroke`, axis
type is HTML rather than SVG text, and pointer hit radii are in pixels with a 44px
diameter floor. Two plots on one page therefore compare directly, and the coordinate
system does not move under a dragging finger.

A control point authored past the frame **pins to its edge along its own leader**
while the authored value keeps going, so a handle never leaves the plot and never
lies about where it is. When the CURVE itself leaves the frame — which takes both
handles above `y ≈ 1.2` — the extremum is solved analytically (`B′(t) = 0` is a
quadratic; zero samples), `data-curve-clipped` mounts on the root, and the crossed
edge takes the accent. The excursion is reported, never silently cropped, and no
dimension moves when it happens.

## Ownership boundary

Curve **math = value.js** · curve **component = glass-ui**. This family OWNS only the
chassis — the frame, the handle overlay, the control row, the re-parseable readout,
the travelling dot — and REACHES for its math by composition:

- the bezier curve is value.js `CubicBezier(x1,y1,x2,y2)`;
- the staircase is value.js `steppedEase(n, term)`;
- the preset catalogue is value.js `bezierPresets`;
- the jump-term family is value.js `jumpTerms`;
- the literal round-trips through value.js `parseTimingFunction`.

There is no local cubic-bezier solver and no staircase evaluator. The staircase is
**constructed, not sampled**: each tread's height is one read of the owner's callable
at the tread midpoint, and the risers sit at exactly `i/n`, so the plot costs at most
`2n + 1` path commands (25 at the maximum count of 12) and the riser reads crisp
because it is exact rather than dense.

`EasingPicker` deliberately authors only CSS-reparseable cubic-bezier and steps
curves. Analytic bounce and spring catalogues remain value.js/keyframes-owned; this
component does not duplicate them.

## Engagement — the sweep and the press

A new curve **wipes itself on**. On a preset pick, a mode switch or a step-count/term
change the ink stroke reveals left to right over `--duration-slow` on
`--ease-out-expo`, and `data-drawing` sits on the editor root for the length of the
sweep. A DRAG is deliberately exempt: it is a continuous edit of one curve, not the
arrival of a new one. `<EasingCurve>` takes the sweep as the `drawn` prop and keeps no
state of its own; the default is `true`, so a plot that is merely shown is shown
finished.

The mechanism is the `clip-path` WIPE — `<HandMark>`'s second draw-on arm — and not
its `stroke-dashoffset` one, because every stroke here carries
`vector-effect: non-scaling-stroke` and Chrome does not gate the paint by
`stroke-dashoffset` under it. Measured by rasterizing the stroke and counting painted
pixels: untouched **2998**, `pathLength="1"` + `dashoffset: 1` **2827**, the same sweep
in real user units **2851** — no reveal at all — against the wipe's **0** closed,
**2107** half, **2998** open. A wipe is also the truer reading for a curve plot: it
travels along the axis the curve is a function of.

The handles answer a press with the house `.tap-squish` register — `--scale-press` on
the `--spring-press` clock, plus `grab`/`grabbing`. Two lane-local additions: SVG
elements transform about the view box, so the handle carries
`transform-box: fill-box` to squish about its own centre, and it stamps the house's
`data-press-armed` because a pointer-captured drag suppresses `:active` outright — the
drag state, not the CSS pseudo-class, is the press truth here.

Under `prefers-reduced-motion: reduce` both collapse to **one frame**: the sweep is
never armed (the finished plot arrives on the frame the curve changes, with no
un-drawn state to see) and the press keeps its scale but drops the interpolation.

## Preview authority

The travelling dot uses one local `requestAnimationFrame` clock for a single 1200 ms
normalized pass. This deliberately small authority is owned and cancelled by the
editor; it makes no keyframes.js ownership claim and creates no periodic or physical
playback mechanism. Under reduced motion it completes immediately without scheduling
travel frames.

## The single color event

The curve strokes `--motion-accent` — the motion family's single color event. The
`EasingCurve` root folds it into the component-local `--easing-curve-accent`
(`--easing-curve-accent: var(--motion-accent, var(--viz-legendre))`), so every accent
site reads the bare `currentColor` off one declaration while the library's OWN
`--viz-legendre` violet twin is the self-sufficient default when a consumer has not
declared `--motion-accent`. The primitive is self-sufficient standalone AND holds
the fence in the other direction — a demo hue never enters a library token — while
a consumer still overrides `--motion-accent` from any ancestor.

## Consumers

Re-grepped at this wave's cut, in-repo:

1. `demo/stories/motion/curve-gallery.vue` — the Motion Lab route mounts
   `<EasingPicker>` directly (one editor, both modes).

Cross-repo, on the published subpath: value.js consumes the picker for its
ease-along-the-ramp axis. `<EasingCurve>` adoption in fourier-analysis — retiring its
name-colliding fork and `EasingCurvePreview.vue` — is **routed, not done**: it is owed
to that tranche's own marked addendum
(`docs/tranches/BJ/coordination/glass-outbound-2026-08-08-easing-consumer-addenda.md`)
under the consumer-updates ruling, and neither repo is edited from here.
