# D — Substrate-with-Consumer · FINAL

Tranche D closed the library-cleanup thesis: exported substrate must have a current consumer, a demo story, or a named deletion. The original D waves wired real story consumers, deleted stale wrappers/composables/styles, hoisted sidebar helpers, and added consumer evidence. D-II was opened when W4 revealed two facts that made a normal close dishonest: the visible vertical rail was not a `GlassDock`, and the fast iteration harness did not yet prove the root smoke tests, export declarations, or adjacent consumers.

## Landing Summary

- W0 produced the binding overfitting ledger and W1/W2 file bounds.
- W1 wired story consumers for the intended custom surfaces.
- W2 deleted zero-consumer surfaces, restored two speedtest-backed composables, and reconciled public-surface counts.
- W3 wrote durable consumer-evidence docs and verdict-precedence rules.
- W4/D-II collapsed the duplicate `Rail` package into `GlassDock variant="rail"`, removed unused dock composables and legacy dock CSS, hardened root tests and type export proof, removed `@utils` alias leakage, wired `useTouchGate` into the dock, and deleted unused `useInterval`.
- W5/D-II close reran the browser and package proof gates.

## Invariants

| Invariant | Close Evidence |
|---|---|
| One dock surface | App category rail and `/navigation/rail` render `GlassDock variant="rail"`; standalone `src/components/custom/rail/` deleted. |
| No legacy dock utilities | `.dock-icon-btn*`, `useDockTransition`, `usePopupMutex`, and dock action-bar exports removed from live source/demo/test paths. |
| Substrate is consumed | `useTouchGate` is used by `GlassDock`; `useTimer` backs it; `useInterval` was deleted. |
| Fast iteration is real | `npm run iter` passes with root smoke specs included. |
| Published types are real | `emit-types` and `verify-export-types` prove `dist/index.d.ts` and `dist/tokens.d.ts`. |
| Consumers still build | `fourier-analysis/web`, `words/frontend`, and `bbnf-lang/playground` all pass `scripts/validate-consumers.sh`. |

## Verification

- `npm run iter` — 186 tests across 9 files.
- `npm run verify-export-types` — export type targets present.
- `scripts/validate-consumers.sh` — all three adjacent consumers pass.
- Browser Use route proof — `/compositions/empty-states`, `/navigation/rail`, `/navigation/dock`, and `/navigation/dock-layers` render without fallback; dock routes expose the expected rail/dock/layer surfaces.
- `scripts/ay-close.sh` — clean dist, full typecheck, full build, iter tests, consumer validation, and dist-size report all pass.

## Forward Path

E opens only after this close. The refined path is one publication cutover: contract audit, package export/style entry normalization, three consumer migrations, and focused proof gates. Broad prop unification, speculative a11y expansion, and an F escape ledger are not part of E unless fresh evidence names them.
