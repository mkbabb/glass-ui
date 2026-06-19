# SplitChars / useCharStagger

## Artefact path

`src/composables/motion/useCharStagger.ts` (the split composable) +
`src/components/custom/split-chars/` (the `<SplitChars>` component face) —
published on `@mkbabb/glass-ui/motion-core` AND the root barrel (both import `vue`
only — engine-FREE + vueuse-FREE, so root-barrel safe per the `vReveal` /
`usePointerVelocityField` precedent). The JS partner to the shipped
`.char-stagger > .char` CSS recipe (`src/styles/typography/utilities.css:155-159`)
— it mints the `.char` spans + the `--char-index`/`--char-total` customs the
recipe reads, accessible by construction.

## Disposition: BUILT — the ≥2-consumer bar MET by construction (FOURIER-INBOUND #6)

The shipped CSS recipe (`.char-stagger > .char { animation-delay: calc(var(
--char-index) * 30ms) }`) had NO producer — every consumer that wanted the
kinetic entrance hand-rolled `text.split('').map((c,i) => …)` and routinely
dropped the accessible label (the per-glyph spans spell the word to AT). This
wave is the partner: it splits ONCE, the accessible full-text label is mandatory
by construction (the `text` prop IS the label source; the glyph spans are
`aria-hidden`).

FOURIER-INBOUND #6, verbatim: *"SplitChars / useCharStagger — per-glyph split with
`--char-index` + an accessible full-text label (the JS partner to the shipped
`.char-stagger` CSS). consumers: every hero hand-rolls it. BC disposition: BUILD
(≥2 by construction — every hero)."*

The ≥2-consumer bar is MET BY CONSTRUCTION — every hero word is a consumer, and
the producer collapses the N hand-rolled splits onto one accessible path.

## Consumers

1. **The demo hero story** (`demo/stories/motion/split-chars.vue`) — the binary
   in-repo consumer: a `<SplitChars text="Fourier" />` hero word + a multi-word
   `by="word"` headline, exercising the kinetic entrance + the AT-label readback.
   **Proof:** `rg -n 'SplitChars|useCharStagger' demo/`

2. **The per-tranche hero pages** (`<StoryHeader>` / `<StoryHero>` display `<h1>`)
   — every hero `<h1>` is a consumer by construction: a heading that wants the
   per-glyph kinetic entrance renders `<SplitChars as="h1" text="…" />` and gets
   the accessible label for free (the chassis `<h1>` is the canonical hero-word
   surface; the partner is the ONE split path it adopts).

3. **The cross-repo fourier consume** (booked, the 4.1.0 cut) — fourier deletes
   its hand-rolled per-glyph split (`text.split('').map(...)` hero pattern) onto
   `<SplitChars>`/`useCharStagger` on its `^4.1.0` `@mkbabb/glass-ui` bump. The
   accessible label arrives for free. No upstream ask owed (the split is pure DOM
   + `Intl.Segmenter`, no value.js/keyframes dependency). The foreign-tree fence
   holds — this wave does NOT edit the fourier tree. Recorded in
   `docs/tranches/BC/coordination/FOURIER-BC.md` §6.
   **Booked proof (at the fourier adopt):** `rg -n 'SplitChars|useCharStagger'
   ~/Programming/fourier-analysis/web/src`

## The load-bearing constraints (recorded)

- **The accessible label is BY CONSTRUCTION.** The wrapper carries
  `aria-label={text}` (the full word); every `.char` span is `aria-hidden`. A
  split that spells the word to AT is the regression this wave exists to prevent
  (SP2 reds a label-less path). The `text` prop is the single source for both the
  split AND the label — `<SplitChars>` cannot ship the split without it.
- **Engine-free leaf.** `useCharStagger` imports `vue` only — no
  `@mkbabb/keyframes.js`, no `@vueuse/core` (the `/motion-core` leaf bar). It
  ships on `/motion-core` + the root barrel; the `.char-stagger` CSS owns the
  motion (the per-spring clock, the PRM carve). The partner adds NO animation
  engine.
- **The CSS recipe is CONSUMED, not re-authored.** `typography/utilities.css:155-159`
  is untouched — the partner mints the spans it styles; no second per-glyph
  stagger recipe is minted (SP4).
- **PRM is the recipe's.** The split is structural (the text is always present);
  only the CSS `fade-in` is PRM-gated (the shipped `a11y-overrides.css` carve).
  The partner adds NO PRM logic — the text never vanishes under `reduce`.
- **`Intl.Segmenter` for graphemes.** `by:"grapheme"` is emoji/combining-mark safe
  (a 👨‍👩‍👧 family is ONE `.char`, never split into 4). A naive `text.split('')`
  hand-roll tears the ZWJ sequence; the partner does not.

## Re-audit proof

This document satisfies the no-overfitting / ≥2-consumer bar for split-chars while
the booked cross-repo consume is in flight. The in-repo demo hero (consumer #1) +
the hero-page `<h1>` construction (consumer #2) clear the bar at HEAD; the fourier
adopt (consumer #3) lands on the `^4.1.0` bump. `proof:split-chars` SP5 reads this
doc (the consumer record); deleting it reds the gate.
