# BorderProgress

`@mkbabb/glass-ui/border-progress` — progress IS the element's border (BB.W-BORDER-PROGRESS).

The living-chrome border ring: a determinate progress where the fill is the card's
own EDGE, not a floating bar bolted to it. A `@property`-animated masked CONIC ring
(`conic-gradient` painted into the border band via a `padding-box`/`border-box`
mask-composite cut-out that FOLLOWS `border-radius`) carrying the brand spectrum,
allocation-free + backdrop-intact (the glass interior still transmits the substrate).

This is the C2 ask verbatim: _"the bottom progressbar should serve as a thicker,
dynamic BORDER of the card… INTEGRATED into the border of the element and thicker…
a spectrum of our colors."_

## Anatomy

- **The ring is the BORDER, masked-conic — NOT a floating bar.** The
  `.border-progress__ring` layer paints a `conic-gradient` MASK-COMPOSITED into the
  border band (`mask: …padding-box, …border-box; mask-composite: exclude`), so ONLY
  the band paints AND it follows `border-radius` exactly. A `border-image` SQUARES
  the corners (measured inferior, forbidden); a floating-bar child re-introduces the
  allocation/relayout the dock-morph defect is about (forbidden). The host INTERIOR
  is untouched — a default-slotted glass card still transmits the backdrop THROUGH
  its content box (the AX.W54 glass-first identity preserved, not occluded).
- **The `@property`-animated sweep.** The registered `--border-progress-fill`
  `<percentage>` (`tokens/property-regs.css §18`, `inherits: false`) drives the conic
  sweep extent so the fill INTERPOLATES (a bare unregistered `var()` snaps). The
  `initial-value: 0%` is the safe resting ring on a non-supporting engine.
- **The brand-spectrum fill via the OKLCH/shorter-hue helper (the CONSUME).** The
  conic stops are the section/viz brand ramp (`--section-color-*`/`--viz-*`)
  interpolated SHORTER-hue (no chroma trough — OKLab greys a warm→cool midpoint; the
  shorter arc stays saturated). `composables/useBorderSpectrum.ts` is a thin consumer
  of the EXISTING `/color` leaf (`cssToOklch`/`oklchStopToHex` + value.js's
  `interpolateHue("shorter")`) — it re-implements ZERO color math
  (`proof:single-color-core` holds). The `// CONSUME(value.js 0.13.0 oklchSpectrum):`
  marker books the consume-and-delete onto value.js 0.13.0's named helper.
- **The `coverage` axis — `full-ring` | `bottom-edge`.** `full-ring` (default)
  sweeps the perimeter; `bottom-edge` paints ONLY the bottom band (the literal C2
  case). The two share the ONE conic-mask mechanism (a `coverage`-scoped mask region,
  NOT a second recipe).
- **The phase-edge milestone register.** The consumer declares `milestones`
  (value-axis boundaries); the ring fires a `milestone` emit + (PRM-gated) pulses
  when the value crosses one. The consumer owns the phase colors
  (presets-in-consumers — the milestone is the EVENT seam, the chassis `--phase-color`
  cascade precedent).
- **The 10-14px thickness envelope.** `--border-progress-width` (default 12px,
  centre of the envelope) — the "thicker, dynamic BORDER" register (AMENDED 6-8px →
  10-14px, speedtest AW v3 relay A1: the hairline rim read too thin).

```vue
<script setup lang="ts">
import { BorderProgress } from "@mkbabb/glass-ui/border-progress";
import { ref } from "vue";
const v = ref(0.42);
</script>

<template>
    <!-- The whole-perimeter living border, library brand spectrum. -->
    <BorderProgress :value="v">
        <Card>…the glass interior reads the backdrop THROUGH…</Card>
    </BorderProgress>

    <!-- The bottom-edge register (the literal C2 case) with a consumer palette. -->
    <BorderProgress
        :value="v"
        coverage="bottom-edge"
        :stops="['#5B8DEF', '#9B59B6', '#CC2233', '#E09030']"
        :milestones="[{ at: 0.25, id: 'ping' }, { at: 0.5, id: 'download' }]"
        @milestone="onMilestone"
    />
</template>
```

## Consumers

≥2 consumers by construction (the cross-repo trigger):

- **speedtest results-card** (consumer #1) — `coverage="bottom-edge"` on `.results-card`,
  retiring the floating `PhaseTimeline` (speedtest AW.W7, the consumer's repo).
- **speedtest dock + survey band** (consumer #2) — `full-ring` on the dock/survey
  surfaces.

The cross-repo CONSUME (speedtest binds `^4.1.0`) happens in the consumer's repo,
never edited here. The library DEFAULT spectrum is the `--section-color-*`/`--viz-*`
ramp; the speedtest phase palette (`#5B8DEF→#9B59B6→#CC2233→#E09030`) stays a
speedtest preset (presets-in-consumers — no consumer hue enters a library token).

## Tokens (retint with zero fork — presets-in-consumers)

| token | default | role |
|---|---|---|
| `--border-progress-width` | `12px` | the band thickness (10-14px envelope) |
| `--border-progress-radius` | `16px` | the host radius the ring follows |
| `--border-progress-fill` | `0%` (`@property`) | the swept fill extent (interpolable) |
| `--border-progress-spectrum` | the brand ramp | the conic color-stop list |
