# critique-B seat 2 · battery: one probe per checklist item

Seat: fresh critic for D1-B in D1 pass 3, model `claude-opus-5-5`. I wrote this before reading `pass-3/B-kit/`,
`pass-3/B-proto.md`, `pass-3/xj-*.md` or the stopped seat-1 files beside this directory. Inputs: REGISTRY §P2-6.4,
§P2-6.5 and §P2-7, RULINGS.md, pass-2 SPECS-v2 §1-§2, pass-2 B-critique's plant table and pass-3 FLOOR-P3.md.

The checklist is frozen at 26 items: S-01..S-13 and B-01..B-13. Each probe below names what makes it CLOSED. A
probe that needs a kit command (replay, seal path, output format) reaches it through `tools/seat-2/adapter.mjs`,
which I write after hashing. The adapter maps the kit's commands. It never changes a plant or an expectation.

Plants live in `plants.json` and run through `run-plants.mjs` (a fresh copy of the replayed tree per plant; the
verdict is the multiset difference of seal lines, planted minus baseline). Verdicts: `INTENDED` (a new line in an
intended clause), `OTHER` (new lines, none in the intended clause), `MISSED` (none), and for legal probes `CLEAN` or
`FALSE-POSITIVE`.

| item | probe | CLOSED when |
|---|---|---|
| S-01 | `git ls-files` at b602a59b covers `pass-3/B-kit/**` and `B-proto.md`; the working tree has nothing untracked or modified under `B-kit/`; `pass-2/kit/` is tracked | all three hold |
| S-02 | P3-R1 row present in RULINGS; on the replayed tree, the 7 hooks (`useClipboard`, `useDragVelocity`, `useRAFLoop`, `useYieldToMain`, `useScrollChrome`, `useScrollProgress`, `useRoutePointer`) sit under `src/composables/`; no kernel entry source re-exports a file outside `src/composables`, `src/styles`, `src/components/_shared` | all hold; plant `P-B8` caught |
| S-03 | P3-R2..R9 rows present; measurable arms on the replayed tree: R3 every kind slot at most 12 files; R4 no `blob-config` key also on `./blob`; R5 `./aurora-config` in `package.json` exports and 0 demo edges past a door (B2 0); R6 every `@source` glob that can match `__tests__` is negated; R7 `springProjection.ts`, `useScrollScene.ts` in the global zone; R9 ratchet ceilings unchanged or each change a ruled row | every arm holds |
| S-04 | `scripts/structure/lib/placement.mjs` (or the floor home) has an `anchor` parameter; placement with the publication anchor yields anchored rows | both hold |
| S-05 | plant `P-FD2`: a move list moving `useScrollChrome.ts` into `dock/` is refused by the move engine at preflight with an FD-2 message; the migration's own log shows no pass that grew `moduleSccs` | refused, and no growth |
| S-06 | plant `P-I6` | INTENDED in B0/B1 via `self-name-in-src` |
| S-07 | plants `P-I32`, `P-I32b`, `P-I32c` | all three caught |
| S-08 | on the replayed tree: `src/styles/glass/index.css` and `src/styles/theme/index.css` exist and `src/styles/{glass,theme}.css` do not; the build writes `dist/styles/theme.css`; no empty dir under `src`, `scripts`, `demo`, `tests`, `tests-visual` | all hold |
| S-09 | the kit replay run twice in one worktree gives the same digest; a second `rows/apply.mjs` chain on the final tree is a no-op | both hold |
| S-10 | one slot predicate (`isSlot`) imported by placement and bounds; `cascade.mjs verify` GREEN on the replayed tree against the base; the FD-5 classifier over base..replayed reports 0 `UNCLASSIFIED` or each one is an authored hunk the kit names | all hold |
| S-11 | vitest on the replayed tree: 0 FD-6-class failures (layout pins); `tsconfig.build.json` replaced by the entry-rooted program; the graph has `yaml-command` edges; `grep docs/tranches` in `package.json`, `scripts/`, `src/`, `tests/`, `vite*.ts` = 0; legal plant `L3` CLEAN | all hold |
| S-12 | a committed π and Playwright execution record for every band the migration moves, and my own run of the browser seat on the replayed tree GREEN | both hold |
| S-13 | `xj-GonB.md` and `xj-BonG.md` committed, each with the clause-by-clause result | both hold |
| B-01 | the seal on the replayed tree: every one of the 16 clauses (B0..B15) reads 0; plus the gate bites the regression plants `P-C6`, `P-B1`, `P-B2`, `P-B3`, `P-B4`, `P-B5`, `P-B6`, `P-B6s`, `P-B9`, `P-B11`, `P-B12`, `P-B14`, `P-B15`, `P-VAC10` in their intended clause | all 16 at 0 and all plants INTENDED |
| B-02 | seal B8 = 0; every B9 line maps to a MIGRATION row that names the R-6/P3-R4 ruling | both hold |
| B-03 | plant `P-I6` | INTENDED |
| B-04 | plants `P-I11`, `P-I12` caught by a clause that implements R-3 (not only a side effect); legal `L3` CLEAN | all hold |
| B-05 | plant `P-I38` caught in B10 | INTENDED |
| B-06 | plant `P-B13y` caught in B13; control `P-B13c` (same files, no YAML token) not in B13 | both hold |
| B-07 | plants `P-I15b` (`dock/utils/`), `P-I15c` (`dock/v2/`), `P-misc` (`dock/misc/`) caught in B15; plants `P-fn1` (`slider/useDockZz.ts`) and `P-fn2` (a new `use.ts`) caught in B15. OR the spec text states that names are reviewed through the pin and not gated, and then the dir plants must at least show in the B11 pin diff | one arm holds in full |
| B-08 | `accent-tone.css` location on the replayed tree equals the P3-R2 law's answer: its readers on the post-collapse channel computed from the graph (one reader unit: in that unit; several: their nearest common owner; none: `src/styles/`); and it equals G's placement | all hold |
| B-09 | every dir under `src/styles/` at most 12 direct files; `glass/` and `theme/` each have an `index.css` door listed in the record; no file in `src/styles/` over 500 lines | all hold |
| B-10 | a committed step exists for each of B-S7..B-S16 and its outcome holds on the replayed tree: S7 `SelectionValue` beside `useSelectionGroup`; S8/S9 B9 per B-02; S10 `./aurora-config` key; S11 0 hand-written files over 500 lines (B6 0); S12 0 computed reads outside the harness (B0 0); S13 colocated `__tests__` present; S14 demo manifest split and demo dirs at most 12; S15 `scripts/lib/index.mjs` door and no scripts file over 500; S16 `tests-visual` top level at most 12 direct files | every step holds |
| B-11 | `npm test`'s seal invocation, given `--no-pin`, exits non-zero (refuses); no `--no-pin` in `package.json` scripts | both hold |
| B-12 | a committed measurement of B7's door-in-every-dir against G's "eponymous root or door" on one tree (doors, bytes, battery catches), and my recount of doors and door bytes on the replayed tree agrees | both hold |
| B-13 | the seal at the base tree, run by me, gives one line count, and the kit's reconciliation of 1,902 vs 1,888 explains the difference by named causes | both hold |

The seat-1 battery beside this directory was written by a stopped seat. I did not read it, and I don't credit its
numbers.
