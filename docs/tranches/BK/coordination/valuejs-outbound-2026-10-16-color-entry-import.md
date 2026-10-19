SERVED MODEL: claude-opus-5-5

# O-98 — value.js X·V → glass-ui BK: import the colour functions from `@mkbabb/value.js/color` (X-W12U close), 2026-10-16

**From:** value.js X·V, Track A, the X-W12U close seat (COHESION §0ft.2; W12U.md ADDENDUM (i) :127).
**To:** glass-ui, the BK coordination inbox (BL the newest tranche). **Pin read:** glass-ui `package.json:500,523` `"@mkbabb/value.js": "^4.0.0"`; glass HEAD `fc4ce33f3` (read-only).
**Disposition asked:** ADOPT-AT-LANDING, with the X-W11 repin. It lands once value.js 4.1.x is published. Today the registry reads ⟨`npm view @mkbabb/value.js version`⟩ → `4.0.0`; the repo reads `4.1.0` (unpublished).

## What changed in value.js (`1c04f8c68`, X-W12U `.g2s2`)
- `./color` now exports `parseCssColor` and `serializeCssColor` (plus the `CssColor`, `CssColorSpace`, `ParseIssue` and `ParseResult` types). They run on a `<color>`-rooted parser compiled from the same BBNF grammar (`src/css/grammar/color.bbnf` → `generated/color.js`). `./css` keeps both names, and they are the same function objects (`scripts/ci/verify-packed-surface.mjs` asserts this).
- Every `dist/subpaths/*.js` is now a re-export facade over shared chunks. The stylesheet grammar is in `css-grammar-*.js`, the colour grammar in `color-grammar-*.js`, and the action tables in `actions-*.js`. `sideEffects: false` is true to the bytes.
- Measured (X-W12U close, `W12U-evidence/close5/chunk-color-r{1,2}.txt`): an eager `parseCssColor` import from `./color` gives an eager chunk of 61,783 B raw / 16,342 B gz with the stylesheet grammar absent (`atKeyframes:false`). Before the change, `./color` had no `parseCssColor` (`MISSING_EXPORT`), and the same import from `./css` gave an eager chunk of 154,217 / 33,098 gz with the grammar present (`W12U-evidence/open5/chunk-exp/css-r{1,2}.txt`).

## The ask (one row)
**R-1.** Move the colour-only imports in glass from `@mkbabb/value.js/css` to `@mkbabb/value.js/color`:
- `src/composables/color/value.ts:8-12` (`parseCssColor`, `CssColor`, `ParseIssue`);
- `src/composables/color/accent-tone-solve.ts:14` (`serializeCssColor`).

`src/components/easing/usePicker.ts:40` (`parseTimingFunction`) is a stylesheet-grammar name and stays on `./css`.

**Why:** since `.g2s2`, the facade packaging alone keeps a glass consumer from pinning the stylesheet grammar eagerly, so this row is not needed for value.js's G2 bar (COHESION §0ft.2). It is still the cleaner seam: glass's colour code then names only the colour grammar, and a consumer that never parses a stylesheet never fetches its chunk. Nothing in value.js waits on this row.
