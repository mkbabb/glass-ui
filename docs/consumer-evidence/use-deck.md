# useDeck (+ useDeckKeyboard + useDeckSpring + DeckPager)

## Artefact path

`src/components/custom/deck/` — the headless PRESENTATION core published OFF the
root barrel via `@mkbabb/glass-ui/deck`: `useDeck` (the index/progress/liveMessage
core, vueuse+keyframes-free), `useDeckKeyboard` (focus-guarded Space/digit paging),
`useDeckSpring` (`installDeckSpring` → keyframes.js `springTimingFunction`, the lazy
dynamic import), `<DeckPager>` (the windowed dots over `PagerDots`' one `pagerWindow`
oracle), and `--spring-deck = var(--spring-smooth)`. It is DISTINCT from
`/carousel`'s embla item-scroller — a full-viewport keyboard-paged aria-live
presentation register, not a horizontal item strip.

## Current consumer state (honest count: 1 consumer — slides)

**slides is the sole consumer.** The `/deck` primitive was lifted at BC.W-DECK
from the slides donor's headless core; the intended second repo (speedtest) never
bound it. The honest tally:

- **slides (the consume-back)** — slides retires its local `src/deck/` onto
  `@mkbabb/glass-ui/deck`, re-composing `useDeck` / `useDeckKeyboard` / `DeckPager`
  under its own app-shell nav glue. This is the single live external binding (a
  named-successor consume, gated on the 5.0.0 publish + the slides adopt).
- **speedtest — ZERO deck imports.** The BC-era "≥2-consumer bar met by
  construction (speedtest survey-deck + slides)" claim was aspirational: the
  speedtest survey-deck binding never landed, so speedtest carries zero deck
  imports and is NOT a `/deck` consumer. The earlier two-repos-by-construction
  framing is corrected here.
- The in-repo demo deck story exercises the primitive (a demo exerciser, not a
  binary consumer).

So the honest count is ONE external consumer (slides); the earlier claim of two
consumers by construction is false.

## Disposition — KEEP-vs-FOLD (deferred to B8)

Under the mechanism-distinctness law, `/deck` owns a mechanism DISTINCT from
`/carousel` (a keyboard-paged aria-live full-viewport presentation register vs an
embla item-scroller), so a fold onto `/carousel` is not a byte-equivalent
substitution. This wave records the honest single-consumer count; it does NOT
execute a fold. The KEEP-with-single-consumer-note vs FOLD decision, and the
`W-ORPHAN-BINARY-SPLIT` orphan-gate mechanism split, are the consumer-truth band
(B8) — recorded, not re-booked.

## Re-audit proof

The honest greps: speedtest imports no `@mkbabb/glass-ui/deck`
(`rg -n 'glass-ui/deck' ../speedtest/src` finds nothing), and slides is the sole
intended binding (the consume-back, gated on the 5.0.0 publish). If slides never
adopts, the verdict returns to `library-orphan` and the subpath folds.
