# GlassUnderline — the animated draw-on underline

An inline-SVG wavering cubic that DRAWS itself under a word — `stroke-dashoffset:
len → 0`, the pen laying ink beneath the picked-out content. The wobble lives in
authored control points; it is **FILTER-FREE** (no `feTurbulence`, no `filter:` —
the compositor-only invariant). The "hand never lays one clean line" read is a
second faint PEN ghost overdraw, a second `<path>` at lower opacity, not a per-paint
raster.

All `GlassUnderline` surfaces reach consumers via `@mkbabb/glass-ui/underline`.

## Use-cases

- **Masthead / hero word pick-out** — a word in a heading draws its underline once on
  load (the `play()`-chained Sequence register).
- **CTA ring** — a call-to-action's emphasis stroke draws as the section reveals.
- **Figure-item emphasis** — a scroll-clock underline that draws as the item enters
  view and un-draws on scroll-up (bidirectional, zero JS).

## The three clocks

| `clock` | mechanism | direction |
|---|---|---|
| `load` (default) | a keyframes.js `NumericAnimation` over `--gu-off`, fired via `play()` | once, never reverses |
| `scroll` | native CSS `@keyframes gu-draw` on a `view()` timeline | bidirectional (draws on enter, un-draws on scroll-up) |
| `static` | set drawn, no clock | — |

```vue
<script setup>
import { ref } from "vue";
import { GlassUnderline } from "@mkbabb/glass-ui/underline";
const u = ref();
// fire the load clock as a causal link in a load Sequence:
await u.value.play();
</script>

<template>
  <h1>The <GlassUnderline ref="u">future</GlassUnderline> is here</h1>
</template>
```

### The `active` declarative overlay

For activation-gated hosts (deck slides, tab panels, carousel slides) the
`active?: boolean` prop is a thin declarative overlay ON the load clock — no template
ref + watcher in the consumer:

- `undefined` (default) = source parity (seeds undrawn; the parent fires `play()`);
- rising edge → `play()` (under PRM → `snap()`); falling edge → reset to undrawn so a
  re-rise REPLAYS; mount with `active: true` → plays.

```vue
<GlassUnderline :active="slide.isActive">cover</GlassUnderline>
```

Only meaningful with `clock="load"`. Delay stays consumer-owned (flip `active` on your
own reveal beat — there is no `delayMs` prop).

## The PRM contract

Under `prefers-reduced-motion: reduce` both clocks collapse to *set, not drawn*: the
stroke is simply present at `stroke-dashoffset: 0` (full emphasis, no draw).
Information parity is total — the emphasis is the stroke COLOUR, present regardless of
the draw. The load clock's engine carries `respectReducedMotion: true`; the scroll
clock's `@keyframes` sits under the outer `@media (prefers-reduced-motion:
no-preference)` so it never binds under reduce.

## The `--gu-*` token table

The stroke geometry reads custom properties so a bolder register is a token override,
not a geometry fork. The defaults byte-match the source.

| token | default | what it tunes |
|---|---|---|
| `--gu-stroke-width` | `2.4` | the pen stroke width (the ghost derives `+1` user-unit) |
| `--gu-ink-height` | `0.5em` | the ink box height |
| `--gu-ink-offset` | `-0.18em` | the ink box block-end offset (under the baseline) |
| `--gu-timeline` | `view()` | the scroll-clock timeline name (set via the `timeline` prop) |

```css
/* a bolder slides register — three tokens, no geometry fork */
.hero .glass-underline {
    --gu-stroke-width: 6;
    --gu-ink-height: 0.3em;
    --gu-ink-offset: -0.16em;
}
```

## The default colour + the dark arm

The default stroke is `var(--primary)`, which re-resolves under `.dark` via the token
cascade — so the component carries NO `.dark` block. An explicit `color` prop wins both
grounds (a consumer passes `var(--ncsu-red)`, itself a re-resolving token, for the
NCSU-red register — presets-in-consumers; the library default is its own identity).

## The variant headroom

`variant="pen"` (default) is the only PROVEN, filter-free render. `pencil` | `crayon`
| `boil` are the API seam for future headroom — they render pen today and exist so a
future wave can light a textured render without re-authoring the component.

## The `paths` geometry escape

For a consumer geometry that differs from the canonical (`0 0 100 10` viewBox + a
fixed `len` of 120), the `paths` escape carries the FULL geometry tuple
(`{ stroke, ghost?, viewBox?, len? }`) so the dash model stays coherent — a bare
`d`-string escape would silently break the dash when the viewBox/length differ.

## Packaging — the `/underline`-vs-`/handmark` ruling (DEC-8)

This package is named for the SHIPPED surface (the pen underline, proven across 6
sites). A sci-report tranche stages a richer `/handmark` family (pencil-boil-generated
geometry, circle/strike/highlight, the boil clock) — but that family lands, if ever, in
its OWN wave AFTER its production proof, and the two components differ in implementation
model (authored-path + keyframes-only + ZERO new peers here, vs generated geometry +
optional peer there). When/if the family lands, the reconcile picks ONE of two
sanctioned outcomes: `GlassUnderline` FOLDS INTO the family as its pen-underline render
and `/underline` RETIRES in the same publish (clean break, one-rename re-point, no
alias), OR the family lands as a sibling `/handmark` consuming `GlassUnderline`'s pen
render (only if both surfaces independently clear the consumer bar). FORBIDDEN either
way: a second parallel underline implementation under `/handmark`. Until that reconcile,
`GlassUnderline` is canonical in glass-ui.
