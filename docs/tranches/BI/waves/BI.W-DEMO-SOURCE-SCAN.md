# BI.W-DEMO-SOURCE-SCAN — the CVA-foreground emission gap (the destructive-label contrast fail)

Band B8 (prunes + consumer-truth / a11y + emission). Born-RED at HEAD.

## §Mandate

Discharges:
- **A11Y-1** [P1] (FAM-15) — the destructive `<Button>` label reads 3.57:1 in light mode on the SHIPPED demo;
  root cause is the FAM-1/emission class: `.text-destructive-foreground` (a CVA-only utility) has NO backing
  rule in the demo's built CSS (the CVA class string is unscanned), so the foreground color never applies and
  the label falls to a low-contrast default.

## §Design

Decided mechanism (ROUND-1 FAM-15, source-verified — a decidable emission fix, no design loop). The CVA base
`button/index.ts:114` emits `text-destructive-foreground` as a plain class string; Tailwind v4 only generates a
utility it FINDS during content scanning, and the demo's scan does not reach glass-ui's compiled CVA strings, so
`.text-destructive-foreground` has no backing rule and the destructive label paints the inherited ink over the
`bg-destructive` fill (3.57:1). Two coupled fixes (the BA.W-EMISSION self-emission discipline extended to CVA
FOREGROUND utilities):

- **Producer-side self-emission (the durable fix).** `emitComponentUtilities` (`vite.style-assets.ts`, the P9
  self-emission path) must safelist the CVA `text-*-foreground` (and `bg-*`/`hover:bg-*/N`) tokens it scans off
  `dist/*.js` + `dist/glass-ui.css`, so a bare consumer with no `@source` gets the destructive-foreground
  backing rule for free (the emission floor BA.W-EMISSION built for structural utilities, now covering the CVA
  color utilities the a11y contract depends on).
- **Consumer-side scan (the demo).** The demo's `@source "@mkbabb/glass-ui/dist"` must reach the compiled
  templates so the CVA strings generate; confirm the demo build scans the dist (the `@source` depth is correct
  for the demo layout).

## §Work

- `vite.style-assets.ts` (`emitComponentUtilities`, the P9 `classish` filter) — include `text-*-foreground` +
  the CVA tone fills in the safelisted set so their backing rules ship into `dist/styles/components.css`.
- `demo/**/*.css` — confirm the `@source` reaches glass-ui's `dist/*.js` (the demo scans the compiled CVA
  strings; adjust depth if the emission arm is not the chosen path).
- `scripts/proof-emission.mjs` — the new CVA-foreground clause (below).

## §Acceptance

Gate: **`proof:emission`** (EXTENDED — a CVA-foreground backing-rule clause, no 2nd gate).
- **BORN-RED at HEAD**: `.text-destructive-foreground` has NO backing rule in the built demo/dist CSS (the
  CVA-foreground-backing clause reds); the destructive label measures 3.57:1.
- E-CVA — every CVA `text-*-foreground` utility referenced by a `ui/*/index.ts` CVA map resolves a backing rule
  in the BUILT `dist/glass-ui.css` + the `/styles` cascade (the producer-side probe, mirroring the structural
  arm).
- Self-test bite: a synthetic CVA `text-<x>-foreground` with no backing rule reds E-CVA.

## §π/DELTA

`tests-visual/emission.spec.ts` (EXTEND — the destructive-contrast arm; LOCAL-only, rides W-REFLECT):
- render `<Button variant/tone="destructive">` on the shipped demo: the label resolves the
  `--destructive-foreground` ink and clears WCAG AA (≥4.5:1) over the `bg-destructive` fill in LIGHT mode
  (was 3.57:1); axe `color-contrast` clean. BOTH modes, Chromium + real WebKit.

## §Obligations

- No cross-repo ask (producer self-emission + demo scan; the consumer-facing `@source` requirement is already
  documented in CLAUDE.md §Consumer wiring — this closes the CVA-foreground gap for bare consumers too).
- Coordinates with **W-BUTTON-TONE** (B8, D-FACTOR): destructive migrates to the `tone` axis — this wave's
  emission clause covers the `tone="destructive"` fill/foreground utilities in the SAME pass (the CVA class
  strings are the same emission target).

## §Dispositions

- Terminalizes **A11Y-1** (FAM-15): BUILT (the CVA-foreground self-emission + the demo scan). Liveness probe:
  a CVA `text-*-foreground` with no backing rule in the built CSS REDs (the emission-gap class cannot silently
  return).
