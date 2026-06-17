# HandMark (the underline.md DEC-8-fold successor)

## Artefact path

`src/components/custom/handmark/` (the published subpath `@mkbabb/glass-ui/handmark`).
`HandMark` (alias `InkMark`) is the platform's ONE hand voice — a hand-drawn mark
(underline · strike · highlight band · circle · box · bracket · arbitrary path) in any
medium, deterministic per `seed`, optionally animated; the slotted word stays REAL
selectable text and the mark is an `aria-hidden` SVG overlay.

## Verdict

`keep-current` — **user-directed wave (BA.W-HANDMARK), booked with a named consumer
roadmap.** This doc is the **DEC-8-fold successor of `underline.md`**: BA.W-HANDMARK
retired `GlassUnderline` + the `/underline` subpath onto `<HandMark shape="underline">`
(a clean break, no alias — the `underline/` dir + `src/subpaths/underline.ts` are GONE,
`handmark/` + `src/subpaths/handmark.ts` are the live surface). The booked-consumer
roadmap `underline.md` carried (the slides `SlideIntro`/`SlideCloser` re-point) carries
over to this doc, re-pointed onto `/handmark` per the fold. The honest component-orphan
census (source files only, library publication machinery + demo own-story excluded)
measures it at exactly **0 non-self consumers** — its only in-repo mount is its OWN
story (the own-story exclusion) — but a load-bearing published primitive with a NAMED,
non-phantom re-point deliverable. Booked here per the evidence-doc escape.

## Consumer proof (re-runnable)

**Internal consumers — 1 demo (the own showcase story, NOT counted).** The ONLY
`<HandMark>` mount in the repo is the story that demonstrates the brushes + shapes +
clocks:

```bash
grep -rln 'components/custom/handmark|@mkbabb/glass-ui/handmark' demo/ src/ \
  | grep -v '/components/custom/handmark/' | grep -v 'src/subpaths/'
#   → demo/stories/motion/handmark.vue   (the package's own story — own-story exclusion)
```

**External consumers — 0 at HEAD (the booked slides re-point).** slides today ships its
OWN LOCAL hand-underline — NOT `@mkbabb/glass-ui/handmark` — in the til-briefing cover +
bookend (the BINDING 2026-06-15 slides ground-truth, no slides break by construction):

```bash
# slides ships ZERO glass-ui/handmark imports at HEAD; the local glyphs persist:
grep -rln 'glass-ui/handmark|HandMark' ~/Programming/slides/src   # → NONE
grep -rn 'underline' ~/Programming/slides/src/decks/til-briefing/slides/SlideIntro.vue
#   → red pen-underline on "errors" (deck-LOCAL CSS/SVG ::after glyph)
grep -rn 'underline' ~/Programming/slides/src/decks/til-briefing/slides/SlideCloser.vue
#   → red cta-draw underline on "proven team" (deck-LOCAL glyph)
```

## The named ≥2-consumer TRIGGER

The REAL deliverable that clears this artefact: a slides-side adoption that swaps the
`SlideIntro` / `SlideCloser` LOCAL hand-underline → `<HandMark shape="underline">` from
`@mkbabb/glass-ui/handmark` (the editorial draw-on underline is
`animation="draw-on"`; the natural pencil-boil morphology is the `boil` brush), riding
the slides `@mkbabb/glass-ui` re-pin to the BB close cut. When slides re-points those two
glyphs, record the call-sites here; the component then clears the ≥2-consumer bar (slides
×2 markup sites) on its own and this evidence-doc escape is no longer load-bearing.
sci-report owns the `HandUnderline` source and adopts on its own (now-Python) cadence; it
is not the binding trigger.

## Re-audit proof

Satisfies the `proof:component-orphan` `keep-current` verdict for `handmark` while the
external-consumer greps stay empty AND the demo mount stays present. If the demo mount is
removed with no external consumer arriving, the verdict returns to `library-orphan`
(formally retire the `/handmark` subpath + export).

**Re-audit date: 2026-09-01.** By then either (a) slides has re-pointed
`SlideIntro`/`SlideCloser` → `@mkbabb/glass-ui/handmark` (record the call-sites here; the
≥2-consumer bar clears) OR (b) the swap has not landed → re-grade: RETIRE the `/handmark`
subpath + export (a one-band churn-out-and-back-in with no real consumer does not earn the
public surface). The next prune re-runs the slides re-grep at that date.

## Cross-references

- `src/components/custom/handmark/README.md` (the four-layer hybrid + the brushes/shapes).
- `demo/stories/motion/handmark.vue` (the showcase story — own-route, NOT a counted consumer).
- `docs/consumer-evidence/underline.md` (the retired `GlassUnderline` predecessor — the
  DEC-8 fold superseded onto this doc).
