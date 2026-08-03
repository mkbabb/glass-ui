# Gate-collapse count-guard critic C2

Date: 2026-07-22  
Existing owner: `BJ.W-GATE-COLLAPSE` / P-EX1  
Disposition: **implementation absent; P-EX1 remains acceptance-RED**

## Exact inspected input

- HEAD: `0169e93534e754dea50e2a80dd499a26a2a955c4`
- tree: `8be0b36d4e34b6b8a7e6e4b70f7e2bcd5b53fa2c`
- parent: `620f0d37d9fe5da4042210efb2c5b1d18a8fd30d`
- `package.json` SHA-256:
  `39a2b340277f7fe8829fa26eb72891c5d60d2eafa00550a2e85575e131f063fb`
- `vitest.config.ts` SHA-256:
  `3d5c17e2bdee7397019f55d2a12a399439e838a64cec678ca56a407fe0bd861d`
- current gate files: four
- current line-anchored plain `it(`/`test(` blocks in `tests/gates/**`: 31
  (`boot-graph` 14, `orphan-css-partial` 7, `token-hygiene` 3, `type-hygiene` 7)

The current orphan-gate commit raises the gate-tree count relative to the precursor pin but adds no
count/budget instrument. The disposition is therefore unchanged.

## Exact finding

The committed execution ledger once claimed P-EX1 `COMPLETE — 5/5 GREEN`, but no replayable
invariant-count or invariant-budget guard exists in source, scripts, package scripts, Vitest config,
CI or release wiring. No machine-readable roster defines the retained standing invariant set. Deleting,
skipping, moving or rewriting a required test can therefore leave ordinary `npm test` GREEN.

The current mechanical censuses are mutually incompatible and cannot substitute for the missing
formation datum:

| scope | files | plain line-anchored `it(`/`test(` | other |
| --- | ---: | ---: | --- |
| historical `485891a2`, actual Vitest include | 184 | 1,029 | — |
| historical pin plus nine `.test-d.ts` fixtures | 193 | 1,032 | reproduces the charter figure but includes excluded fixtures |
| precursor `620f0d37`, actual Vitest include | 197 | 1,101 | 31 `it.each` declarations; 266 `describe` declarations |
| current `0169e935`, actual Vitest include | 197 | 1,104 | three new orphan-gate blocks, still no count guard |
| current `tests/gates/**` only | 4 | 31 | six semantic `gate:` suites; four unique gate families |

The historical 1,032 figure includes three declarations in a `.test-d.ts` fixture excluded by
`vitest.config.ts`; a line-anchored regex conversely misses the public-surface suite's `it.each`
registrations. Comments, templates, aliases, multiline calls and disabled modifiers create further
false counts. The band's “Vitest-fs membership” rule also conflicts with later keep-list-plus-gates
wording, while non-Vitest type/package/Playwright contracts are mixed into the prose without a common
runner.

Only one of PERF's promised four standing `tests/gates/**` newcomers exists (`boot-graph`); the named
`shell-field-governance`, `deferred-paint` and `route-pending` gates are absent. That does not prove
those product truths should be manufactured as files. It proves the retained roster has never been
reconciled.

## Born-RED matrix

The present tree has no detector for these required mutations:

1. add one governed invariant past the ruled maximum;
2. delete a named required invariant or the budget guard itself;
3. change a required registration to `skip`, `todo`, `only` or another disabled/exclusive form;
4. rename or move it outside the Vitest include;
5. split, merge or duplicate semantic invariants while gaming a raw line count;
6. replace `it(` with `it.each`, a multiline call or alias;
7. add apparent registrations in comments or template text; and
8. add an ordinary product regression outside the governed standing set.

An honest detector turns 1–7 RED where required and keeps 8 GREEN. Ordinary product truth must not be
suppressed merely because a whole-suite lexical number grows.

## Smallest honest continuation

Before implementation, freeze one exact machine-readable roster of retained standing semantic IDs and
their enrollment selectors. Then a bounded Luna x-high cut may:

1. use the installed TypeScript parser (or equivalent registration-aware mechanism), not a source-line
   regex;
2. require each governed ID exactly once, enabled and statically resolvable;
3. reject missing, duplicate, unregistered, skipped/todo/only/fails and unresolved governed entries;
4. enforce the ruled maximum of 60 over unique governed IDs without inventing a second lower bound;
5. list non-Vitest typecheck, package and Playwright enforcement separately;
6. add fail-closed enrollment so deleting or moving the guard itself turns the package test command RED;
   and
7. retain exact changed/restored hashes for the over-budget, vanish, disable, move, split/merge and
   guard-deletion mutations.

No raw line counter, arbitrary deletion, lower test-truth ceiling, new product primitive or historical
status rewrite follows. Two fresh unchanged-byte Sol x-high critics remain required before P-EX1 may
close.
