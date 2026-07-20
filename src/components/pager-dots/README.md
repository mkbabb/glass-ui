# PagerDots

`@mkbabb/glass-ui/pager-dots` — the ONE position-dot rail register.

A dot-per-page rail: a crisp `::before`-painted 13px pip centered in each cell, with
a LIQUID dot-MORPH worm as the active indicator — a two-edge
lead/trail barbell that STRETCHES → TRAVELS → RE-FORMS between dots with liquid weight
(the Google-worm edict), driven by `useLeadTrail` (the ONE shared two-edge integrator —
NO `--spring-dock`/CSS-transition clock; release-at-arrival is emergent). The paint is a
THREE-LAYER split — a crisp BED (N pips, never filtered), the WORM masses (the goo
an instance-local filter + translucency ONCE), and the transparent hit-target buttons —
so the whole-layer-filter empty-pill annihilation is structurally impossible. Inactive
52% / hover 72% / active-under-worm dims ~35% / the worm masses paint full
`--pager-dot-active`. This is the SHARED oracle — the carousel ships it (`CarouselDots`
retired onto it) and the deck composes it DIRECTLY (`<PagerDots pattern="group">`, no
wrapper — `/deck` is purely headless).

Keyboard: the rail is a roving-tabindex tablist/toolbar — EXACTLY ONE
tab stop (the active dot); a root `@keydown` handles the axis-derived arrows
(ArrowRight/Left horizontal ⇄ ArrowDown/Up vertical), Home/End jump, wrapping. Each
hit-target grows to a ≥28px comfort box (24px cell, WCAG 2.5.8 AA — a deliberate,
documented below-44px exemption for a dense position rail) while the painted pip stays
UNMOVED.

## Anatomy

The dots are the shared register the carousel and the deck were ALREADY running
(CarouselDots was "re-authored from first principles against the deck's group-pattern
oracle"). This primitive harvests that convergence; it is not a new substrate. ≥2
consumers by construction: the carousel (consumer #1) + the deck (consumer #2, composed
directly — `<PagerDots pattern="group" :ring="false">`, no wrapper).

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
| `windowFit`   | `number`                      | `undefined`    | window the rail to `fit` dots centered on the active (the deck dock-gutter overflow generalized); off → show every dot |
| `ring`        | `boolean`                     | `true`         | encapsulate the rail in the `.glass-pager-ring` glass pill chassis |
| `ariaLabel`   | `string`                      | `"Pager"`      | accessible name for the rail group |

`@select` emits the selected index alongside the `v-model:active` write.

## Tokens (retint with zero fork — presets-in-consumers)

| token                  | default                                              | what |
|------------------------|------------------------------------------------------|------|
| `--pager-dot-active`     | `var(--foreground)`                                  | the solid ink the worm masses paint — slides sets `var(--ncsu-red)` |
| `--pager-dot-inactive`   | `color-mix(in srgb, var(--foreground) 52%, transparent)` | the resting bed pip (≥3:1 WCAG 1.4.11, both schemes) |
| `--pager-dot-active-dim` | `color-mix(in srgb, var(--foreground) 35%, transparent)` | the active bed pip dimmed UNDER the worm (the brightness hierarchy) |
| `--pager-dot-hover`      | `color-mix(in srgb, var(--foreground) 72%, transparent)` | the hover fill |
| `--pager-dot-size`       | `0.8125rem`                                          | the 13px base pip diameter (the worm body D — a real dot with mass to merge) |
| `--pager-dot-elongated`  | `2.25rem`                                            | the 36px max worm elongation (the lead↔trail gap clamp — bounded, never taffy) |

The fill reads `--foreground`-over-transparent, so it re-tints under `.dark` BY
CONSTRUCTION. The glass ring chassis (`.glass-pager-ring`, glass/surfaces.css) is
the DockRail-chip glass-floating recipe — NEVER an opaque `bg-card` slab.

The `--pager-dot-active` retint is the convergence with the deck consumer: the deck
sets `--pager-dot-active: var(--ncsu-red)` (the Wolfpack brand stays a deck-local
preset — it NEVER enters library tokens).
