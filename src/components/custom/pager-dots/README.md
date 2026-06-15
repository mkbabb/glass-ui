# PagerDots

`@mkbabb/glass-ui/pager-dots` — the ONE position-dot rail register (BA.W-PAGER, R10-1 + R10-3).

A dot-per-page rail: a 24px hit-box (WCAG 2.5.8) with a `::before`-painted pip
centered by the grid; the active dot ELONGATES along the rail axis into a pill (a
real emitted morph on the governed `--spring-dock` register), inactive 52% / hover
72% / active full `--pager-dot-active`. This is the SHARED oracle — the carousel
ships it (`CarouselDots` retired onto it) and the slides deck `DeckPager` adopts it.

## Anatomy

The dots are the shared register the carousel and the slides deck were ALREADY
running (CarouselDots was "re-authored from first principles against the slides
DeckPager oracle"). This primitive harvests that convergence; it is not a new
substrate. ≥2 consumers by construction: the carousel (consumer #1) + the slides
DeckPager (consumer #2, adopts at the BA cut).

```vue
<script setup lang="ts">
import { PagerDots } from "@mkbabb/glass-ui/pager-dots";
import { ref } from "vue";
const active = ref(0);
</script>

<template>
    <!-- Ringed (default): the dots sit in the glass pager pill chassis. -->
    <PagerDots :count="5" v-model:active="active" />

    <!-- Flush on an ambient glass host (the deck dock): drop the ring. -->
    <PagerDots :count="20" v-model:active="active" :ring="false" :window-fit="9" />
</template>
```

## Props

| prop          | type                          | default        | note |
|---------------|-------------------------------|----------------|------|
| `count`       | `number`                      | —              | total dot count (the slide/snap count) |
| `active`      | `number` (`v-model:active`)   | `0`            | the active 0-based index |
| `orientation` | `"horizontal" \| "vertical"`  | `"horizontal"` | rail layout axis |
| `windowFit`   | `number`                      | `undefined`    | window the rail to `fit` dots centered on the active (the DeckPager dock-gutter overflow generalized); off → show every dot |
| `ring`        | `boolean`                     | `true`         | encapsulate the rail in the `.glass-pager-ring` glass pill chassis |
| `ariaLabel`   | `string`                      | `"Pager"`      | accessible name for the rail group |

`@select` emits the selected index alongside the `v-model:active` write.

## Tokens (retint with zero fork — presets-in-consumers)

| token                  | default                                              | what |
|------------------------|------------------------------------------------------|------|
| `--pager-dot-active`   | `var(--foreground)`                                  | the active fill — slides sets `var(--ncsu-red)` |
| `--pager-dot-inactive` | `color-mix(in srgb, var(--foreground) 52%, transparent)` | the resting fill (≥3:1 WCAG 1.4.11, both schemes) |
| `--pager-dot-hover`    | `color-mix(in srgb, var(--foreground) 72%, transparent)` | the hover fill |
| `--pager-dot-size`     | `0.375rem`                                           | the 6px base pip diameter |
| `--pager-dot-elongated`| `1.5rem`                                             | the 24px active elongation |

The fill reads `--foreground`-over-transparent, so it re-tints under `.dark` BY
CONSTRUCTION. The glass ring chassis (`.glass-pager-ring`, glass/surfaces.css) is
the DockRail-chip glass-floating recipe — NEVER an opaque `bg-card` slab.

The `--pager-dot-active` retint is the convergence with the slides DeckPager: the
deck sets `--pager-dot-active: var(--ncsu-red)` (the Wolfpack brand stays a
deck-local preset — it NEVER enters library tokens).
