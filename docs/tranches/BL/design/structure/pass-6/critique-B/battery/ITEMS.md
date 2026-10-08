# critique-B pass 6 · battery map

Seat: fresh critic, model `claude-opus-5-5`, authored nothing in passes 2-6. Written and hashed BEFORE reading
`pass-6/B-kit/` or `pass-6/B-proto.md`. Checklist: REGISTRY §P3-9 text (frozen), status §P5-9, 27 items; bar §P2-6.4,
§P3-8.4, §P4-8.4, §P5-8.4. Rulings: RULINGS.md R-1..R-10, X-10, P3-R1..P3-R9 (P3-R9 as P4-R3), P4-R1..P4-R5, P5-R1..P5-R5.

Runner: `run-plants.mjs --root <tree> --adapter <adapter> --set <plants.mjs|regress.mjs> [--group]`. The adapter is
written after the hash and decides nothing: it returns the route gate's own clause table, renamed clauses mapped onto
B15/B16/B17 only.

## §P5-8.4 plants

| family | file | plants | expect | item |
|---|---|---|---|---|
| X6-<zone>-<shape>-<lit/par> | plants.mjs | 7 X5 shapes (LDARG, LDARGN named loader called with an argument; TREERET, TREEEMPTY `tree.read`; TREAD `T.read`; PROMISE, PROMISEE `readFile(...).catch`) × literal/parameter × 5 zones = 70 | B17 | S-14 |
| X6-<zone>-CTL-* | plants.mjs | loader with an argument and no catch; `tree.read` with no catch; a promise catch that rethrows: 15 legal controls | clean | S-14 |
| PH6-* | plants.mjs | `part-1.ts`, `GlassDock-2.ts`, `GlassDock2.ts`, `GlassDockPart2.ts`, `bs11.ts`, `GlassDockSplit.ts` in GlassDock's dir; the same forms once in scripts, demo, tests, tests-visual | B15 | B-07 |
| PHT6-* | plants.mjs | placeholder TEST stems: `Chip2.test.ts`, `part-1.test.ts`, `SliderSplit.test.ts`, `bs11.test.ts`, `GlassDock-2.test.ts`, and `<real spec stem>7.spec.ts` beside a real spec | B15 | B-07 |
| PH6-CTL-* | plants.mjs | two concept-named files | clean | B-07 |
| PW6-out-* | plants.mjs | a Playwright file outside the program: in tests-visual under a non-matching name, in chip's slot as `.vis.ts`, a `.spec.ts` in demo | any clause naming it | B-10 (B-S16) |
| PW6-legal-unit | plants.mjs | a page-driving `*.visual.ts` in chip's slot opening chip's story (goto copied from the tree) | clean | B-10 (P5-R5) |
| PW6-wrong-unit, PW6-tv-one-unit | plants.mjs | the chip-story spec in slider's slot; a tests-visual spec whose one subject is chip | any | B-10 (P5-R5) |
| SFC-keep / SFC-value | sfc-split.mjs via tree-probes.sh | an SFC style split on a component the route did not split: values kept (RED unlisted, GREEN once listed by `scopes` + moved rules); one value changed (RED content changed under the same listing) | as stated | S-10 (P6-F1) |
| FD4 A/G/G2/U | fd4-probe.mjs via tree-probes.sh | the carved readback spec counted (covered=true); the spec moved out from under the report (loud throw naming it); deleted (throw); unversioned report (throw) | as stated | S-10 (P6-F2), S-14 |
| PW-PROGRAM | pass-5 pw-program.mjs via pass-5 tree-probes.sh | every Playwright test file in `playwright test --list` | missing 0 | B-10 |

## Regressions (regress.mjs, tree-probes.sh, probes.mjs)

Pass 5's hashed battery (`pass-5/critique-B/battery/plants.mjs`), pass 5's regress set (which imports pass 4's battery
and extra plants), and pass 5's seven X5 extra plants, imported by path; pass 5's `tree-probes.sh` and `probes.mjs` run
from their committed bytes.

## One probe per item

| item | probe |
|---|---|
| S-01 | the pass-6 kit committed before judgment: `git status` of `pass-6/` clean for the kit, replay from committed bytes |
| S-02, S-03 | gate B8/B9; rulings P5-R1..P5-R5 landed as ruled (dock/__tests__ ≤ 12, datum row, B2 per P5-R3, vite.style-fold.ts split, B16 subject reading) |
| S-04..S-09 | gate GREEN; replay MATCH and rerun no-op; P5:GATE-PURE; P5:CSS-DIST |
| S-10 | SFC-keep, SFC-value, FD4 A/G/G2/U; cascade verify on the migrated tree against the floor base (route's committed listing) |
| S-11, S-12 | vitest on the replayed tree; the route's committed browser record |
| S-13 | not re-run (closed; nothing in pass 6 touches G) |
| S-14 | X6 70 + 15 controls; P5x X5 7; P5 S14 140 + controls; P5r MASK/X; MASK6 census against B17; the named sites `vite.style-fold.ts`, `vite.utility-emit.ts` |
| B-01 | gate all clauses GREEN, B2 0; P5 DIR13/B2 regressions |
| B-02..B-06, B-08, B-09, B-11..B-13 | pass 4/5 regressions as in pass 5's ITEMS.md |
| B-07 | PH6, PHT6, PH6-CTL, P5 PH5, PH6-NAMES census against B15; LAW §11 read against the gate |
| B-10 | PW6-*, P5 VIS-*, P5:PW-PROGRAM; B2 0; P5-R5 subject reading |
