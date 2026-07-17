# FadingScroll — the scroll-state-driven edge-fade primitive

`<FadingScroll>` is glass-ui's ONE scroll-state-aware edge-fade primitive: a thin
default-slotted scroll-port wrapper whose start edge feathers ONLY past
`scroll > 0` and whose end edge feathers ONLY while trailing overflow remains. It
supersedes the scroll-blind static `.scroll-fade-*` mask utilities (a clean
break, no alias) — those feathered BOTH edges unconditionally, so the first
card's chrome was half-erased at rest (the "Shy" defect). Here the at-rest
no-overflow edge is SHARP by construction.

It reaches consumers via `@mkbabb/glass-ui/fading-scroll`.

```vue
<script setup lang="ts">
import { FadingScroll } from "@mkbabb/glass-ui/fading-scroll";
</script>

<template>
    <!-- horizontal chip strip — feathers the right edge while it overflows -->
    <FadingScroll axis="x" aria-label="Filters" class="flex gap-2 scrollbar-hidden">
        <button v-for="c in chips" :key="c.id">{{ c.label }}</button>
    </FadingScroll>

    <!-- vertical controls column — feathers the bottom edge while it overflows -->
    <FadingScroll axis="y" class="flex-1 min-h-0 scrollbar-thin">
        <ConfiguratorLayer v-for="s in sections" :key="s.id" v-bind="s" />
    </FadingScroll>
</template>
```

---

## Props

| prop        | type            | default | meaning                                          |
| ----------- | --------------- | ------- | ------------------------------------------------ |
| `axis`      | `"x"` \| `"y"`  | `"x"`   | scroll axis (horizontal strip / vertical column) |
| `fadeStart` | `boolean`       | `true`  | feather the start edge once scrolled past start  |
| `fadeEnd`   | `boolean`       | `true`  | feather the end edge while trailing overflow      |
| `ariaLabel` / `ariaLabelledby` | `string` | — | optional accessible name; named ports become `role="region"` |

The root IS the scroll port; the default slot IS the scrolled content. Pass the
flex/overflow/scrollbar utilities (`flex gap-2`, `scrollbar-hidden`, `min-h-0`)
on `<FadingScroll>` itself — they land on the scroll-port root.
Unnamed ports remain ordinary focusable scroll containers; Glass does not create
repeated, indistinguishable region landmarks.

## The dual-path single-writer mechanism

The edge fade is a `mask-image` whose per-edge ramp width is driven by two
registered `@property <length-percentage>` customs — `--fade-start` and
`--fade-end` — that interpolate between `0` (sharp) and `--fade-scroll-width`
(feathered). There is exactly ONE writer of those customs at a time:

- **Native primary** — on an engine that supports `animation-timeline: scroll()`
  (Baseline Newly Available, the same bar `scroll-driven.css` cleared), the
  `.fading-scroll` CSS recipe in `src/styles/utilities/base.css` drives the
  customs off a `scroll(self inline)` (axis `x`) / `scroll(self block)` (axis
  `y`) timeline. `animation-range` opens `--fade-start` only once `scroll > 0`
  and closes `--fade-end` when there is no trailing overflow. ZERO JS.
- **JS fallback** — `useFadingScroll(el, { axis, fadeStart, fadeEnd })` (this
  dir's composable) writes the SAME customs off logical inline/block progress +
  `scrollWidth/Height −
  clientWidth/Height` with a `ResizeObserver` (the shared `useResizeObserver`
  substrate) + a rAF-coalesced `scroll` listener. It is feature-detect-gated OFF
  (`supportsScrollTimeline()`) when the native timeline is supported, so the two
  paths NEVER both write. Horizontal RTL progress normalizes negative,
  positive-ascending, and positive-descending `scrollLeft` models before edge
  selection — no double-feather (the `scroll-driven.css` /
  `useScrollProgress` discipline).

## `useFadingScroll` — the composable form

When wrapping the scroll port in a `<FadingScroll>` node would re-parent a
load-bearing anchor (e.g. the SegmentedTabs `variant="underline"` indicator
anchored on the container root), call `useFadingScroll(containerRef)` directly on
the existing scroll element — no extra DOM node. The composable applies the same
`--fade-start` / `--fade-end` customs to the element it is given.

## PRM — a legibility cue, not motion

Under `prefers-reduced-motion: reduce` the edge fade does NOT vanish (unlike the
`scroll-driven.css` animations, which sit under `no-preference` and disappear).
The fade is a legibility cue, so it stays present — it simply stops interpolating
(the native side drops the animated feather; the discrete overflow-edge presence
stays correct, which is also exactly what the JS fallback always did).

## The token surface

`--fade-scroll-width` (default `1rem`, inheriting, retunable on any ancestor) is
the public knob — it supersedes the retired `--mask-fade-width`. The registered
`@property` interpolation customs `--fade-start` / `--fade-end` are INTERNAL, not
a public token.

## Colocation map

```
fading-scroll/
├── FadingScroll.vue                 # the scroll-port wrapper (root = port, slot = content)
├── composables/
│   └── useFadingScroll.ts           # the JS fallback writer + the composable form
├── index.ts                         # barrel
└── README.md                        # this file
```

The CSS half lives in `src/styles/utilities/base.css` (the `.fading-scroll`
recipe + the `@property` customs); the token lives in
`src/styles/tokens/offsets-sizing.css` (`--fade-scroll-width`).
