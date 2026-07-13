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

## Disposition — KEEP (executed at BI.W-ORPHAN-BINARY-SPLIT, DOC-4/DOC-5)

**KEEP.** Under the mechanism-distinctness law, `/deck` owns a mechanism DISTINCT
from `/carousel` (a keyboard-paged aria-live full-viewport presentation register vs
an embla item-scroller), so a fold onto `/carousel` is not a byte-equivalent
substitution — a fold would DELETE a mechanism, not de-duplicate one. The
KEEP-vs-FOLD decision the `W-DOC-CANON-REWRITE` audit routed to the consumer-truth
band (B8) is resolved here: **KEEP with the honest single-repo note.**

The `proof:component-orphan` binary-vs-demo/internal split (the same wave) measures
`/deck` at the file level as **4 BINARY call-sites, all in slides** (`DeckPager.vue`,
`DeckSlide.vue`, `deckKeys.ts`, `useDeck.ts`), so it clears the ≥2-BINARY bar on the
census's file unit — it is NOT on the `demoOnlyWatch` surface. The honest caveat the
census's file count cannot see: those 4 call-sites are a **single external repo**
(slides), so at the repo grain `/deck` is a one-consumer KEEP (distinct mechanism),
not a two-repo KEEP. Both truths hold: the gate greens on the 4 binary files; this
doc records that they are one repo. If the slides adopt never lands (the consume-back
is gated on the 5.0.0 publish), the 4 call-sites evaporate and the verdict returns to
`library-orphan` — the subpath folds at the next prune census.

## Re-audit proof

The honest greps: speedtest imports no `@mkbabb/glass-ui/deck`
(`rg -n 'glass-ui/deck' ../speedtest/src` finds nothing), and slides is the sole
intended binding (the consume-back, gated on the 5.0.0 publish). If slides never
adopts, the verdict returns to `library-orphan` and the subpath folds.
