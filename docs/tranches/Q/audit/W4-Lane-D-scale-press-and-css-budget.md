# Q.W4 Lane D — `--scale-press-*` disposition + CSS budget rebaseline (Q-sty-5 + Q-sty-6)

## Charter

Per Qγ T2 + Qγ §CSS-budget.

- **Q-sty-5**: `--scale-press-{xs,md,lg}` are substrate-without-consumer in
  `src/` (only `sm` + `btn` consumed). Verify the words/frontend P.W4-Lane-D
  consumer landing. If the rungs are consumed there → WIRE-DOCUMENT; if not →
  RETIRE per N invariant 23.
- **Q-sty-6**: rebaseline the CSS budget in `scripts/profile-bundle.mjs`,
  gated AFTER Lanes A-C land (token promotions move CSS around). Rebaseline
  once, against the settled post-W4 draw, to ≈10% headroom.

## Q-sty-5 — `--scale-press-*` disposition

### Evidence

Fleet-wide grep for `scale-press` references (source files only — `.vue`,
`.css`, `.ts`; `dist/` and `node_modules/` excluded):

- **words/frontend** (`src/`): ZERO hits. The compiled `dist/assets/*.css`
  carries the token *definitions* `--scale-press-xs/md/lg` — but that is the
  inlined glass-ui token block every consumer's CSS bundle reproduces, NOT
  consumption. A `grep -oE 'var\(--scale-press-(xs|md|lg)\)'` against the dist
  CSS returns ZERO `var()` references. The P.W4-Lane-D `active:scale-[X.XX]`
  absorption the rungs were minted for never landed.
- **fourier-analysis, bbnf-buddy, speedtest, keyframes.js**: ZERO source hits.
- **glass-ui `src/`**: only `--scale-press` (generic), `--scale-press-sm`
  (via the `-btn` alias), `--scale-press-btn`, `--scale-press-dock` are
  consumed. `xs`, `md`, `lg` have ZERO consumers.

### Verdict — RETIRE

`--scale-press-{xs,md,lg}` are substrate-without-consumer across the entire
fleet. Per N invariant 23 / L invariant 8 (substrate-without-consumer is
binary), the three unused rungs are RETIRED.

- `src/styles/tokens.css §11` — the 4-rung ladder collapses to the consumed
  pair: `--scale-press-sm: 0.97` (the named rung `--scale-press-btn` aliases)
  + `--scale-press-btn: var(--scale-press-sm)`. The token comment records the
  retirement + the fleet-grep rationale.
- `DESIGN.md` — the §State table row dropped the `4-rung ladder` clause; the
  "Press-scale ladder" subsection rewritten to "Press-scale tokens",
  documenting the 3 shipped amplitudes and recording the Q.W4 retirement.

`--scale-press-btn` keeps its prior value (0.97) — every button + slider
recipe is visually unchanged.

## Q-sty-6 — CSS budget rebaseline

Gated after Lanes A-C landed (token promotions are net-additive on raw bytes —
the declared §17 METRIC / §16 TIMELINE defaults outweigh the shed SFC `var()`
fallbacks; the `@layer` wrap is near-zero).

### Measurement

`npm run build` then `npm run profile:bundle`, settled post-W4 draw:

| Axis | Old budget | Old draw (Qγ HEAD) | Settled post-W4 draw | New budget | New headroom |
|------|-----------|--------------------|--------------------|-----------|-------------|
| `dist/glass-ui.css` raw  | 46_000 | 42_667 (92.8%) | **43_340** | **48_000** | 90.3% draw → ≈10.7% |
| `dist/glass-ui.css` gzip | 8_200  | 7_674 (93.6%)  | **7_780**  | **8_650**  | 89.9% draw → ≈10.1% |

The Qγ-flagged thin headroom (93.6% gzip — below the ε-thin threshold) is
restored to the canonical ≈10% margin. The growth is load-bearing (token
co-location is not deletable behaviour) — REBASELINE, not reduce.

`scripts/profile-bundle.mjs` — `BUDGETS["dist/glass-ui.css"]` bumped
`46_000/8_200` → `48_000/8_650`; a Q.W4 rebaseline-rationale comment block
added above the `BUDGETS` constant, continuing the documented
N.W0 → P.W0 → P.W3 → Q.W4 tranche-close rebaseline cadence.

## Verification

- `npm run typecheck` — GREEN.
- `npx vitest run` — 379/379 GREEN.
- `npm run profile:budget` — **GREEN**:
  `[PASS] dist/glass-ui.css — raw 43340 / 48000 (90.3%); gzip 7780 / 8650 (89.9%)`.

## Verdict

**CLOSED.** Q-sty-5: `--scale-press-{xs,md,lg}` RETIRED (zero fleet consumers,
substrate-without-consumer binary). Q-sty-6: CSS budget rebaselined once,
post-token-promotion, to 48_000 raw / 8_650 gzip (≈10% headroom); the budget
gate passes.
