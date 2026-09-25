# D1 pass 4 · the floor build (P4-F1..P4-F7)

Seat: FLOOR, model claude-opus-5-5, asserted from the seat's own identity. This is REGISTRY §P3-8.3, built once, into the floor: the scripts under `floor/` were edited in place and `floor/FLOOR.md` describes the result. Everything below comes from commands this seat ran on 2026-09-25, and each command and its output is recorded in `plants/results.txt`: the plant logs, then Appendix A (pass 3's tree battery), Appendix B (F9 re-issued) and Appendix C (the baseline).

Files this pass owns under `docs/tranches/BL/design/structure/`:

- the floor: `floor/` (the changed files are listed in §2);
- `pass-4/plants/`: the battery `p4-tree-plants.sh`, the move lists `lists/*.json`, `rung.mjs`, `listed-styles.json`, the fixture spec `zz-chip-band.spec.ts` and `results.txt`;
- `pass-4/tools/`: `fresh.sh` and `baseline.sh`.

**Base.** The checkout's HEAD moved twice during the run, both times by docs-only commits: `8141658d`, then `4d2e3123`. The code is 10.1.0 throughout, identical to REBASE.md's base. The plants ran on `8141658d` (the before-arm and 10 after-arm plants) and on `4d2e3123` (after-arm F48). The baseline and pass 3's regression battery ran on `4d2e3123`.

## 1 · Result

| battery | before (pass-3 floor, HEAD's own) | after (P4 floor) |
|---|---|---|
| `pass-4/plants/p4-tree-plants.sh` (11 tree plants) | **0/11** | **11/11** |
| `floor/plants/graph-plants.mjs` (59) | — | 59/59 |
| `pass-3/plants/p3-graph-plants.mjs` (18) | — | 18/18 |
| `pass-3/plants/p3-tree-plants.sh` (12), on 10.1.0 | — | 11/12 as the script issues them; 12/12 with F9 re-issued through the landed seat (§4) |

- **Before-arm:** `HEAD` with its committed floor and rows (pass 3's).
- **After-arm:** `HEAD` plus this floor, cut by `floor/rows/apply.mjs`, with `r1` first.
- **Plant cuts:** each plant cut a fresh linked worktree and removed it afterwards.

## 2 · Items

For each item: what was built, the plant, and its result on the before-arm and then the after-arm.

| item | built | plant: before → after |
|---|---|---|
| **P4-F1** R-1 retire (P3-G6) | New row `rows/r1-register-retire.mjs` removes `scripts/gate-register.mjs` and `tests/gates/gate-register.test.ts`. `apply.mjs` runs it first, before f3 and every other row or move. It writes no roster (the roster is W-REGISTER-COLLAPSE's) and edits no closed record. Route B's S21 now leaves its chain (§5). | **F1**, R-3's move of `tests/gates/tabs-seam.test.ts` into `tabs/__tests__/`. Before: register present, and the move reds `gate-register` 1/21 (`seat G-TABS-SEAM: bound to a missing file`). After: register retired by the cut, the move applies, and no register test exists to red. |
| **P4-F2** FD-8 glob deltas (P3-G1, P3-R6) | `lib/move.mjs` gets `globDeltasOf(g0, M)`: for each source-plane `@source` glob whose sheet stays put, it names every move that takes a file out of the match set or brings one in, with the sheet's own `@source not` subtracted. `runMoves` takes `declaredGlobDeltas`, refuses undeclared or stale declarations at preflight, and has the image check expect exactly the declared edge. `move.mjs` and `fixpoint.mjs` read `globDeltas` under the same ledger rule. | **F2**, `isTeleportedTarget.ts` out of `_shared` with the `demo/demo.css` glob delta declared. Before: move exit 1 (1 LOST, rolled back). After: `GLOB-DELTA carried`, applied, 4 move-only, vue-tsc 0. **F2u**, the same move undeclared. Before: exit 1 only after a write and a rollback. After: `GLOB-DELTA undeclared` at preflight, nothing written. |
| **P4-F3** generated targets (P3-G2) | `computeEdits`: a generated target (`e.generated` with no `e.to`) keeps its target, so its root-relative spelling stays verbatim. An edge with no target is residue (`no-target`), never the text `null`. | **F3**, `scripts/structure/lib/resolve.mjs` → `lib/scan/resolve.mjs`. Before: `LOST …\|path-literal\|tests-visual/.cache`, and the literal is not kept. After: applied, `"tests-visual/.cache"` kept once, graph 0. |
| **P4-F4** F-10 by the graph (FP3-4, P3-G5, S-28, S-29) | `browser.mjs` takes its specs from F-1's `test-program` edges. A spec joins a changed file's band by `reads`, `classes`, `paths` or `name` (new `lib/recipes.mjs`: class recipes, owners, implied classes). `--changed`, `--select-only`, `--base-report`. Each band reports its base-green count and its new failures, or `NO BROWSER SIGNAL`. | **F4**, the B-08 cure's move (`chip/accent-tone.css` → `src/styles/`). Before: 0/5 chip-paint specs; only the π floor was selected. After: 5/5 (css-critical, demo-design, glass-cal, page-chassis, storybook-meta) plus the π floor. **F47**, a base report on the chip band. Before: no band and no count. After: 5 specs, **base-green 18**, and on the accent-tone rung **0 new failures**. |
| **P4-F5** F-1 reads Playwright (FP3-5) | New scanner `lib/scan/playwright.mjs`: each literal `testDir`/`testMatch` pattern in a Playwright config (top level and per project) is a `test-program` edge with one glob edge per collected spec. A non-literal `testDir` or a RegExp `testMatch` is `opaque`. | **F5**, `tests-visual/css-critical.spec.ts` → `chip/__tests__/css-critical.visual.ts`. Before: applied, and the spec silently left the program. After: refused, `LOST tests-visual/playwright.config.ts\|test-program\|…`, rolled back. |
| **P4-F6** FD-5 on engine rewrites (P3-G3) | `lib/classify.mjs`: a path spelled over several literal segments with only separators between them is one reference site, and a shared site carries the sorted set of its targets. New `classifyImage` runs inside `runMoves` on every step (step 4). An `unclassified` file refuses the step and rolls it back, and the report carries `classified`. | **F6**, the tokens door (`join("src","styles","tokens.css")` respelled as one segment). Before: `UNCLASSIFIED tests/gates/token-hygiene.test.ts`, and the engine has no FD-5 field. After: the CLI gives PASS (3 move-only), and every engine step in the battery prints its `classified` counts. |
| **P4-F7** FD-4 listed-reorder judge (P3-G4, S-28) | `cascade.mjs verify --reorders listed.json [--browser seat.json]…`. A listed reorder is judged pair by pair (`reorderRisks`, base order against the longest kept subsequence). A swapped pair is a **risk** when the two rules share a declared property, sit in one `@layer` path, and hold equal-specificity selectors on classes that co-occur in a source recipe. A risk is **covered** only by a base-reported seat run in which a spec that names the property and a wearer's class passed with no new failure. A spec that names only the class is not evidence (§3). An unlisted reorder, a content change or a stale listing is RED. | **F7**, two rungs. Rung a (card/scroll, listed): moved 18, 1,818 swapped pairs, 0 risks → **GREEN**. Rung b (accent-tone after glass-chip, listed): moved 1, 78 swapped pairs, 1 risk, `RISK ./styles [--accent-band-strength] .accent-tone × .glass-chip (0,1,0; co-occur in chipVariants.ts)` → **RED**. Before: both rungs RED as unlisted, with no pair named. **F48**, the evidence arm (§3). Before: verify RED as unlisted, with no refutation. After: `REFUTED by zz-chip-band.spec.ts`. |
| **pin** (REBASE §3, gap 1) | `records/surface-pin.json` is re-recorded on 10.1.0: `ConfiguratorLayout` on `.` and `./configurator` (type names 1,279 → 1,281), the growth release `9065d924` added. | **F0**, the four gates on the cut. Before: `FAIL F-9 surface pin`, typeNames pinned 1,279 against 1,281 now. After: 4 PASS. |

## 3 · The chip band, measured (F47, F48)

| run | tests | passed | chip band | new failures |
|---|---:|---:|---|---:|
| F47 base (planted tree before the rung) | 36 | 21 | 5 specs; base-green 18 once used as the base report | — |
| F47 accent-tone rung | 36 | 21 | 18 base-green | **0** |
| F48 base, with `zz-chip-band.spec.ts` | 37 | 22 | 6 specs, base-green 19 | — |
| F48 accent-tone rung | 37 | 21 | 19 base-green | **1**: `zz-chip-band.spec.ts` |

- **The value read back.** The fixture spec reads a Chip's `--accent-band-strength` through `getComputedStyle`. At base it is `max(18%, calc(12% + 10%))`, glass-chip's floored band. On the rung it is `18%`, the register's flat value. The cascade verifier's reading (S-28) is confirmed in paint.
- **Why the band's green is not evidence.** All 18 base-green tests of the five chip-paint specs pass on the rung. Without P4-F7's reading rule, the pass-3 criterion ("a band spec ran green") would have accepted a paint change. P4-F7 therefore counts only a spec that names the property. On F47 it prints `not evidence (name the class, never the property): css-critical, demo-design, glass-cal, page-chassis, storybook-meta` and stays RED. On F48 the readback spec refutes it.
- **Base failures.** 15 of the 36 base tests fail, all at base: demo-design P2/P4/P5 ×2, glass-cal (a), page-chassis PC-1/PC-6, storybook-meta M5/M9/M9d ×2 (S-29).

## 4 · Baseline (HEAD `4d2e3123` + the P4 floor, `pass-4/tools/baseline.sh`)

The demo is built before vitest (FP3-10). Every step ran and none stopped early.

- **Before landing.**
  - Graph at the docs home: 7,527 edges, 0 violations, 539 census.
  - Plants: 59/59 and 18/18.
  - Chain: 9 rows (`r1` first). The replay is a no-op with the same digest.
- **Landed** (`scripts/structure`).
  - Graph: 7,436 edges, 0 violations, 520 census.
  - Placement (publication anchor): 36 anchored, 14 move, 2 global, 15 proposed, 1 NEEDS-NAME.
  - Placement (`--anchor none`): 40 move, 12 global, 47 proposed, 5 NEEDS-NAME.
  - Bounds: 18 dirs over 12 files (src 9, demo 2, tests 6, tests-visual 1), 55 files over 500 lines.
- **Fixpoint --dry.** Pass 1 proposes 15 moves and stops on FD-2: 169 added pairs, members 14 → 24.
  - Per move: useScrollChrome 70, useRoutePointer 45, useScrollProgress 34, isTeleportedTarget 3, createCanvasLifecycle 3, useDockHold 1, useFuzzySearch 1, and 0 for the other 8.
  - These equal pass 3's. 32 scan deltas are undeclared in the dry plan, which the dry run declares none of.
- **Build and gates.**
  - Build 0. Gates: 4 PASS (F-1; F-3 byte-equal; F-4 contract; F-9 pin, 603 runtime and 1,281 type names, 0 differences).
  - entries, cascade contract, snapshot and self-verify all 0. `surface check` 0.
- **Tests.** Demo build 0. **vitest: 239 files, 2,302 passed, 10 expected fail, 1 skipped (2,313), 0 failed.**
  - Pass 3's baseline had 3 failures (the boot-graph ordering artefact) and the register's tests. Both are gone: the ordering is fixed, and the register is retired by r1.
- **Other checks.**
  - typecheck (both programs) 0.
  - **verify:package is RED:** `G-BUNDLE-RATCHET shrink 2913546 < 2919057` (−5,511 B). This is the floor datum row §P3-5 names, re-measured on 10.1.0 and unchanged. It is owed to P4-R3.
  - browser-select on `chip/accent-tone.css`: chip band, 5 specs, plus the π floor.
  - browser seat: GREEN, 3/3.

**The tree digest.** Cuts of `4d2e3123` + this floor, taken after `FLOOR.md`'s last edit, give `e33bbac7344c0515f03523fea552b616f1123831ab2159e2a03acea5d946babc`: 14 digest lines across pass 3's tree battery (cuts and replays), plus the F9 re-issue's cut. The baseline's own cut printed `a8392e6d3c38…`, twice (chain and replay).

- **Probable cause of the difference.** The digest covers every file in the worktree, docs included. The baseline copied the floor at 15:49 UTC, seconds before the one `FLOOR.md` edit (15:49:29, the plant count).
- **What was ruled out.** A fresh cut shows no residue from the graph or either plant battery.
- **Consequence.** Any digest of this cut moves with HEAD's docs and with `FLOOR.md`. A chain that pins the floor digest must re-record it after this report is committed.

## 5 · What this changes for route B's chain (REBASE §6)

1. **S1c leaves B's chain.** The floor's pin now holds 10.1.0's surface. Re-deriving S1c over this floor would find no growth to admit (F0 after: 0 differences).
2. **S21 leaves B's chain.** The register retire is floor row `r1`, cut first.
3. **B's S1 digest changes.** The floor cut is new: `r1`, the changed engine, and FD-5 inside every engine step. Step 4 re-derives from this cut (`derive/chain.sh`).
   - Every engine step now also fails on an `UNCLASSIFIED` file. Any of B's computed steps that the classifier refuses is a finding, not a floor regression. In this seat's after-arm logs every engine step reports FD-5 `"failed": 0` (17 reports, m03 in each cut included), and no run in either battery refused on it.
4. **Engine changes the chain inherits.**
   - `isTeleportedTarget.ts` can now move, with its glob delta declared (P3-R6).
   - `resolve.mjs` can now move (F3).
   - `tests-visual` specs cannot leave the Playwright program unless the route edits the program first (F5). This is what B-S16 needs before the carve.
5. **B-08 has an evidence route.** A route listing the accent-tone rung must bring a spec that reads `--accent-band-strength`. On this floor the rung's only reading spec (the planted one) refutes it. §P3-5's cure, `src/styles/` loaded at its HEAD rung, changes no order and needs no listing.

## 6 · Open gaps

1. **The ratchet (P4-R3) is still unruled.** On the floor base it measures −5,511 B (2,913,546 against 2,919,057). This seat did not measure arm (a) or (b) of P4-R3, because neither is a floor build. Both are one command (`npm run verify:package`) once a datum row is written.
2. **P4-R4, the CSS dist name, is unanswered. The floor still does arm (b):** `dist/styles/theme.css` is a one-line `@import`. Arm (a) was not built or measured here. Building it changes `emitDeclaredCssEntries` and the record's `dist` semantics, and it should be ruled first, because arm (b) is the shape the edict's "no shims" reads against.
3. **FD-4's evidence is a spec, not a proof.** A covered risk means a property-reading spec ran green against a green base. Only a computed-style readback on a wearer proves value identity, and the planted `zz-chip-band.spec.ts` is such a readback. Nothing like it is in `tests-visual/` today: no committed spec reads `--accent-band-strength`. A route that lists a risky reorder must bring one.
4. **The co-occurrence index reads string literals only** (`lib/recipes.mjs`). A class assembled at run time is not a recipe, so a risk between two such classes would read as no risk. This is a declared limit in FLOOR.md.
5. **Pass 3's F9 plant cannot drive the P4 seat from the docs home.** The P4 seat builds the graph, and a landed tree refuses a foreign floor's records. That refusal is correct, and F9's property holds through the landed seat (Appendix B: B waited 40.3 s and took the seat 2 s after A's verdict; both GREEN). The pass-3 script is not edited: it is pass 3's record.
6. **The battery had one defect during its before-arm run.** A function named `cut` shadowed cut(1) in three MISSED detail strings (F0, F3, F6), which printed empty. The verdicts are unaffected; the header of `results.txt` gives the three details from the logs. It is renamed `cutwt` for the after-arm run.
7. **One report file was placed by `cp`, not the Write tool.** `results.txt` (342 KB, composed in scratch from the run logs) was copied into `pass-4/plants/`. It is the one named file, and no other file was created in the checkout.
8. **Nothing is committed.** Everything under `floor/` and `pass-4/` that this pass changed is uncommitted. §P3-8.2 orders the route's step 4 after the floor, so the floor should be committed before B re-derives.
9. **The floor seat does not re-run the 17-clause seal, `vitest` on B's tree, or F-10 on B's rebased tree.** Those belong to step 4.
