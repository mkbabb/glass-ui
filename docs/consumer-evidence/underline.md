# GlassUnderline

## Artefact path

`src/components/custom/underline/` (the published subpath `@mkbabb/glass-ui/underline`).

## Verdict

`keep-current` — **user-directed wave (AY.W-UNDERLINE), booked with a named consumer roadmap.**
`GlassUnderline` is the sci-report `HandUnderline` transposition: a filter-free, draw-on pen
underline (load clock with an imperative `play()` + an `:active` overlay, a native scroll
clock via `view()`, and a static register), with a `--gu-*` bold-register override and a color
preset. The wave was explicitly user-directed, with slides (×2) and sci-report (×4) named as the
intended consumers. The publication wiring (`package.json` `exports` + `typesVersions`) was the
ONLY missing piece — an orchestrator integration miss — now repaired.

## Half-published → published (the W-PRUNE integration fix)

At the prune audit HEAD the component was HALF-PUBLISHED: the `/underline` chunk emitted to
`dist/underline.js` (vite globs `src/subpaths/*.ts`), the 5 api-seat types existed
(`GlassUnderline*` in `src/api/index.ts`), and the demo story mounted it — but `./underline` was
absent from `package.json` `exports` AND `typesVersions`, so consumers could not reach it. The
lane's `package.json` export delta was never applied. W-PRUNE applied it:

- `package.json` `exports["./underline"]` → the contract-v2 `{ types, import }` shape, matching
  every sibling subpath.
- `package.json` `typesVersions["*"]["underline"]` → `["dist/underline.d.ts"]`.

`npm run verify-export-types` + `npm run build` confirm `dist/underline.js` + `dist/underline.d.ts`
publish cleanly.

## Consumer proof (re-runnable, re-grounded AZ.W-PRUNE2 2026-06-11)

**External consumers — 0 at HEAD.** The re-ground (AZ.W-PRUNE2 E4-4):

```bash
# slides STILL ships its OWN local hand-underline (re-grep at AZ HEAD → ZERO):
grep -rln 'GlassUnderline|glass-ui/underline' ~/Programming/slides/src   # → NONE
# the local hand-underline still lives in the til-briefing cover + bookend:
grep -rn 'underline' ~/Programming/slides/src/decks/til-briefing/slides/SlideIntro.vue   # → red pen-underline on "errors"
grep -rn 'underline' ~/Programming/slides/src/decks/til-briefing/slides/SlideCloser.vue  # → red cta-draw underline on "proven team"
# sci-report is now a Python project (E4-7) — it owns the HandUnderline source but adopts on its own cadence.
```

slides today ships its OWN local hand-underline (the til-briefing `SlideIntro` red pen-underline on
"errors", the `SlideCloser` red cta-draw underline on "proven team"). The named adoption is the
re-point of THOSE two glyphs to `@mkbabb/glass-ui/underline`.

**Internal consumers — 1 demo (the showcase story).** The ONLY `<GlassUnderline>` mounts in the
repo are the story that demonstrates the three clocks + the override:

```bash
grep -rn '<GlassUnderline' demo/   # → demo/stories/motion/underline.vue (load / active / scroll /
#                                       static / bold-register / tinted)
```

## The named ≥2-consumer TRIGGER (re-grounded — the phantom "W-ADOPT" trigger is killed)

AZ.W-ADOPT is the slides CONSTELLATION re-architecture (it migrates the `data-constellation`
canvases onto `@mkbabb/glass-ui/constellation`); it NEVER touches the hand-underline
(`grep -in underline AZ.W-ADOPT.md` → 0). So W-ADOPT is NOT the underline trigger.

The REAL deliverable that clears this artefact: a slides-side adoption that swaps the
`SlideIntro` / `SlideCloser` LOCAL hand-underline → `@mkbabb/glass-ui/underline`, riding the SAME
slides re-pin cut as the W-ADOPT constellation adoption (the slides `@mkbabb/glass-ui` pin moves to
the AZ close cut once; both the constellation swap AND the underline swap land on that pin). The
binding close-criterion is the FIRST real adoption: when slides re-points its
`SlideIntro` / `SlideCloser` underline to `@mkbabb/glass-ui/underline`, update this doc to record
the call-sites; the component then clears the ≥2-consumer bar (slides ×2 markup sites) on its own
and this evidence-doc escape is no longer load-bearing. sci-report adopts the `HandUnderline` source
on its own (now-Python) cadence; it is not the binding trigger.

## Re-audit proof + the hard date

This document satisfies the overfitting-audit / `proof:component-orphan` `keep-current` verdict for
`GlassUnderline` while the external-consumer greps stay empty AND the demo mount stays present. The
gate accepts `underline` on THIS evidence doc (a user-directed wave with a NAMED, non-phantom
re-point deliverable — the slides `SlideIntro`/`SlideCloser` swap riding the slides re-pin cut),
NOT a false `keep`. If the demo mount is removed with no external consumer arriving, the verdict
returns to `library-orphan` (formally retire the subpath + export).

**Re-audit date: 2026-09-01.** By then either (a) slides has re-pointed
`SlideIntro`/`SlideCloser` → `@mkbabb/glass-ui/underline` (record the call-sites here; the
≥2-consumer bar clears) OR (b) the swap has not landed → re-grade: RETIRE the `/underline` subpath +
export per FLEET E4-4 (a one-band churn-out-and-back-in with no real consumer does not earn the
public surface). The next prune re-runs the slides re-grep at that date.

## Cross-references

- `src/components/custom/underline/README.md` (the masthead-invariant pen render + the DEC-7
  geometry escape tuple).
- `demo/stories/motion/underline.vue` (the showcase story — all three clocks + the override).
