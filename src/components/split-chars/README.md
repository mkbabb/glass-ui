# SplitChars

`@mkbabb/glass-ui` (root barrel + `/motion-core`) — the per-glyph split partner
to the shipped `.char-stagger` CSS recipe (BC.W-SPLIT-CHARS, the FOURIER-INBOUND
#6 fold).

glass-ui ships `.char-stagger > .char { animation-delay: calc(var(--char-index) *
30ms) }` on the per-spring `--spring-smooth` clock (`typography/utilities.css`),
but had NO way to MINT the `.char` spans + their `--char-index` — so every hero
hand-rolled a `text.split('').map(...)` and routinely dropped the accessible
label, leaving AT to spell the word out ("F. o. u. r. i. e. r."). This is the
partner: it splits once, accessible by construction.

## Anatomy

```vue
<script setup lang="ts">
import { SplitChars } from "@mkbabb/glass-ui";
</script>

<template>
    <!-- Renders the kinetic word; AT hears "Fourier" (ONE name). -->
    <SplitChars text="Fourier" />

    <!-- As a heading, split on whitespace (each word is one .char unit). -->
    <SplitChars text="Hello World" by="word" as="h1" />
</template>
```

`<SplitChars text="Fourier" />` renders:

```html
<span class="char-stagger" role="img" aria-label="Fourier" style="--char-total:7">
    <span class="char" style="--char-index:0" aria-hidden="true">F</span>
    <span class="char" style="--char-index:1" aria-hidden="true">o</span>
    … (--char-index 2..6)
</span>
```

The shipped `.char-stagger` CSS staggers the glyphs into a `fade-in` entrance on
the per-spring clock; under `prefers-reduced-motion: reduce` the library-wide PRM
carve collapses the animation to its terminal (the glyphs paint in-place). The
split is STRUCTURAL — the text is always present; only the CSS flourish drops.

## Props

| prop   | type                              | default  | note |
|--------|-----------------------------------|----------|------|
| `text` | `string`                          | —        | the word — REQUIRED; the single source for BOTH the split AND the accessible label |
| `by`   | `"char" \| "word" \| "grapheme"`  | `"char"` | split unit; `"grapheme"` uses `Intl.Segmenter` (emoji/ZWJ safe) |
| `as`   | `string \| Component`             | `"span"` | reka-`Primitive` host tag — `as="h1"` renders the word as a heading |

There is NO default slot — the `text` prop is the single source so the accessible
name is unambiguous (a slot would split arbitrary markup).

## The accessible label is BY CONSTRUCTION

The wrapper carries `aria-label={text}` (the full word); every `.char` span is
`aria-hidden`. AT reads the word ONCE; the kinetic glyphs are invisible to AT. A
hand-roll could forget it; `<SplitChars>` cannot — the prop IS the label source.

The labeled wrapper also carries `role="img"` so the `aria-label` is spec-valid: a
bound `aria-label` on a role-less generic element (the default `span`) is an
ARIA-in-HTML violation (`aria-prohibited-attr`) — a generic element bears no name
from author. `role="img"` names the graphic-of-text whose glyph children are
decorative. The role is CONDITIONAL (the StatusDot idiom): an `as` override to an
element that already bears a name from author (`as="h1"`, a heading; a link; a
button) keeps its native role, and a custom Component `as` owns its own semantics.

## The composable

`useCharStagger(el, { by })` is the underlying split — the single producer of the
`.char` spans + `--char-index`/`--char-total` customs (ships on `/motion-core` +
the root barrel, the `vReveal` engine-free precedent). `<SplitChars>` is the
component face over it. Re-run the split after a text change via the returned
`split()` (idempotent — it restores the original word before re-minting).
