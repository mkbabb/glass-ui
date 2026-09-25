# critique-B battery · one probe per checklist item (REGISTRY §P2-7, shared S-01..S-13 + D1-B B-01..B-13)

Seat: fresh adversarial critic for D1-B, pass 3. Model `claude-opus-5-5`. Written before reading
`pass-3/B-kit/`, `pass-3/B-proto.md` or `pass-3/xj-*.md`. Inputs read: REGISTRY §P2-6.4, §P2-6.5, §P2-7 (and the
pass-2 route entries), RULINGS.md, pass-2 SPECS-v2 §1-§2, pass-3 FLOOR-P3.md, pass-2 B-critique §6.

Two kinds of probe:

- **Plants** (`plants.mjs`, run by `run-plants.mjs`). Each plant is written onto the replayed tree alone, the gate is
  run, the gate's lines are diffed against the unplanted tree, and the files are restored byte-for-byte. A plant is
  CAUGHT when a new line in the expected clause names its mark; OTHER when only another clause names it; MISSED
  otherwise. A legal plant (`expect: null`) must gain nothing. The gate is reached through an adapter
  (`../tools/adapter.mjs`), written after this hash, that only maps the route's gate output to `{clause: lines[]}`;
  the adapter decides nothing.
- **Measurements** (`probes.mjs`). Each prints `ITEM <id> PASS|FAIL <evidence>` from the tree, the floor or the
  committed records.

Plants follow the file: a plant names a file by basename (`find`), so a migration that moved it does not defeat it.

| item | probe | CLOSED when |
|---|---|---|
| S-01 | probes `S-01`: every file under `pass-3/B-kit/` and `B-proto.md` is tracked and clean at the cut; no kit file the replay executes names `/tmp`, `/private/tmp` or `scratchpad` | 0 untracked, 0 modified, 0 scratch references |
| S-02 | probes `S-02`: for every entry source in the global zone, every re-export origin (`makeOrigins.exportsOf`) lies in the global zone; the 7 published kernel hooks are in `src/composables/` | 0 origins outside; 7/7 home |
| S-03 | probes `S-03`: P3-R2..R9 each have a measurable consequence on the tree: `./aurora-config` key (R5); no config name on both `./blob` and `./blob-config` (R4); `@source not` for `__tests__` in every `@source` site that globs `src` (R6); every kind slot ≤12 files (R3); `.bundle-ratchet` ceilings byte-equal to base, or a ruled row (R9) | all hold |
| S-04 | probes `S-04`: `placement.mjs --anchor publication` on the replayed tree: `Skeleton.vue` not a `move` row; anchor code in `lib/placement.mjs` | both |
| S-05 | probes `S-05`: a constructed move that makes a new co-cyclic unit pair is run through the tree's `runMoves` dry; it must be refused, and nothing written | refused, 0 files changed |
| S-06 | plant `I6` (self-name import from `src`) | CAUGHT (graph violation or seal clause) |
| S-07 | plants `I32`, `I32b`, `I32c` | 3/3 caught |
| S-08 | probes `S-08`: `src/styles/glass.css` and `src/styles/theme.css` gone, their `index.css` doors present; CSS entries in the record carry `dist`; 0 empty dirs under `src` | all hold |
| S-09 | STEP 2: replay twice from committed artifacts, same digest; the second pass a no-op | equal digests |
| S-10 | probes `S-10`: one `isSlot` imported by both placement and bounds; `scopedKeyframes` in the cascade verifier; `classify.mjs` present and run by the route | all present and run |
| S-11 | probes `S-11` + vitest on the replayed tree: harness reader present, `tsconfig.build.json` gone, floor landed at `scripts/structure/` with no `docs/` import, CI YAML edges in the graph; vitest failures in the FD-6 class = 0 | all hold, FD-6 class 0 |
| S-12 | `browser.mjs` on the replayed tree (π + Playwright), serialized seat | executed, GREEN |
| S-13 | `pass-3/xj-GonB.md` and `xj-BonG.md` exist, each with a per-clause verdict, committed | both present, clause tables |
| B-01 | the gate on the replayed tree, plus teeth plants T-B0..T-B15 (a zero must be able to go non-zero) | 16/16 clauses 0; each clause bites its plant |
| B-02 | gate B8 = 0 and B9 lines each a ruled R-6 row; plant `K1` (kernel door re-exports a unit file) | B8 0, B9 ⊆ ruled rows, K1 CAUGHT |
| B-03 | plant `I6` | CAUGHT |
| B-04 | plants `I11` (single-subject test left in `tests/`), `I12` (test in the wrong unit); legal `L2` | I11, I12 CAUGHT; L2 CLEAN |
| B-05 | plant `I38` (scripts-zone misplacement) | CAUGHT in B10 |
| B-06 | plant `Y1` (a bin named only in CI YAML, imported by another bin); legal `LY` (CI-only bin, no importer) | Y1 CAUGHT in B13; LY CLEAN |
| B-07 | plants `N-utils`, `N-v2`, `N-misc` (dirs), `N-use` (`use.ts`), `N-foreign` (`slider/useDockHold.ts`) | all CAUGHT in B15, or the spec states verbatim that names are reviewed through the pin and not gated (then the dir plants still bite) |
| B-08 | probes `B-08`: `accent-tone.css` location against its readers on the post-collapse channel (P3-R2), and against G's placement; plant `C1` (a style-kernel sheet loaded only by slider) | location = law's home; C1 CAUGHT |
| B-09 | probes `B-09`: every dir under `src/styles/` has an `index.css` door, no `src/styles` dir over 12; plants `G1` (rule in the glass door), `G2` (doorless dir under styles/glass) | all hold; G1, G2 CAUGHT |
| B-10 | probes `B-10`: B-S7..B-S16 each leave a trace: `SelectionValue` in `motion/morph/`; R-6 rows; `./aurora-config`; 0 hand-written src files over 500; FD-6 suites; colocated tests; demo 0 edges past a door; `scripts/lib/index.mjs`; `tests-visual` top ≤12 | every step traced |
| B-11 | probes `B-11`: the `npm test` path invoked with `--no-pin` (and with the env or argv the gate reads) refuses | non-zero, refusal message |
| B-12 | probes `B-12`: a committed tool measures, on one tree, door count, bytes and battery catches for B7's door-in-every-dir against G's "eponymous root or door"; rerun reproduces | reproduced |
| B-13 | the gate at the base (10.0.1 src) re-run; the count and the 1,902/1,888 reconciliation are reproduced | reproduced |

Legal plants that must stay clean: `L1` (slider reads dock through its door), `L2` (chip test in `chip/__tests__/`
reading `..`), `LC` (a slider-local composable read only by slider), `LY`.
