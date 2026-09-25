# D1 pass 3 · D1-G prototype (eponymous closures)

Seat: PROTOTYPE, route D1-G, model **claude-opus-5-5** (asserted from the seat's own identity). This seat resumed the pass-3 G seat stopped by the 18:14 session limit. The kit that seat wrote under `pass-3/G-kit/` (law, gate, authored names and rows, generators) was banked at `f0a6637e` and edited after it. This seat re-recorded the chain from a fresh HEAD worktree, replayed it twice more, and ran the bar on the result. Every number below comes from a command this seat ran, and its output is saved under `pass-3/G-kit/results/`.

**Result in one line.** The chain replays from committed artifacts only (28 steps: 304 engine moves and 19 exact-text rows, FD-2 +0 at every step) to one code digest in three fresh worktrees. The toolchain is GREEN: build, both `vue-tsc` programs, demo build, entries, surface pin, the four floor gates and the cascade verifier. P3-R1(a) holds (E1K 0). 15 of the gate's 18 clauses are GREEN under `npm test`. **Three are RED**: E1 1 (an FD-8 hold the floor cannot carry), E4 64 (R-5 bounds) and E6 18 (demo reads of names no entry publishes). So the §P2-6.4 bar is **not met**, and the report says which items stay open and why.

Paths: `K` = `docs/tranches/BL/design/structure/pass-3/G-kit`, `R` = `K/results`. The migrated tree's **code digest** (every file outside `docs/`) is `b26243ef15a498507db269e4621e6271b3f99f66b36c2d39ff5fc5e1d37eb7c6` over 1,360 files.

---

## 0 · The replay command a non-author runs

From the checkout, at a commit that carries this kit:

```sh
docs/tranches/BL/design/structure/pass-3/G-kit/tools/replay.sh <new worktree path> --twice
```

`replay.sh` makes a fresh linked worktree at HEAD, symlinks both `node_modules`, applies the floor rows (`floor/rows/apply.mjs`), then runs `tools/replay.mjs`. That script reads `K/SEQUENCE.json` and the frozen lists and rows it names, and computes nothing. It exits 0 only when the tree ends on the final digest.

- **Whole-chain no-op.** Running `node K/tools/replay.mjs --root <wt>` a second time prints `the chain is applied; nothing to write`.
- **The bar.** `K/tools/verify.sh <wt> <out>` runs build, both typechecks, the demo build, entries, the surface pin, the floor gates, the G gate, vitest, bounds and the F-4 cascade verifier against a base it builds in a second worktree.
- **The browser seat.** It is run separately (§5), because it waits on the machine lock.
- **This seat ran both scripts end to end.** `replay.sh` built a third worktree (`R/replay-sh.log`: final digest MATCH). `verify.sh` on it gave the same verdicts as §4 (`R/verify-wt3/status`: build, tsc ×2, demo, entries, surface, gates, bounds and cascade 0; eponym 1 and vitest 1, with the same 3 + 9 failures).

## 1 · What ran

| step | artifact | result (`R/record.log`) |
|---|---|---|
| preamble | floor rows f3…fd11 | base code digest `f0019420…a8c` (= `SEQUENCE.base`) |
| G-S0b | `tools/land.mjs` (gate → `scripts/structure/eponym/`, `wire/eponym.test.ts` → `tests/gates/`) | 9 files |
| G-S1a | `rows/01-relay.json` | 31 files, FD-2 +0 |
| G-S2 | `lists/02-stage1.json` | 18 moves, 66 rewrites, residue 0 |
| G-S4 | `lists/03-stage2.json` | 84 moves, 330 rewrites, residue 0 |
| G-S3 | `lists/04-css-doors.json` | 1 move |
| G-S4b..e | seal and three JS purity rows | 6 + 3 + 3 + 2 files |
| G-S6 | `rows/06-walkers.json` | 7 files |
| G-S7a | `lists/07-tests.json` | 141 moves |
| G-S7b | `rows/08-programs.json` | 2 files |
| G-S9a..e | scripts relay row, `lists/10-cross-zone.json` (4), R-8 delete row, `lists/12-mirror.json` (1), mirror row | 1, 4 moves, 3, 1 move, 4 |
| G-S7c | `rows/14-subject-paths.json` | 4 files |
| G-S10a..c | CSS purity, `./aurora-config`, entries | 2, 2, 1 files |
| G-S11a, b | one-door rows | 31, 3 files |
| G-S12 | `rows/20-demo-doors.json` | 53 files |
| G-S13b, c | `lists/23-carve.json` (52), `lists/24-tests-carve.json` (3) | 166 + 3 rewrites |
| G-S14, S15 | test pins, surface pin | 6, 1 files |

Totals: 8 lists (304 moves), 19 rows and 1 land step. FD-2 was +0 at every step: the engine judged each list with G's unit function (L0.3), and `fd2-pairs.mjs` judged each row. The recording run took 183.7 s.

## 2 · Checklist: D1-G (REGISTRY §P2-7)

### G-01 · Law, gate, lists and rows re-authored; a literal reading gives the verdict: CLOSED (commit owed, S-01)

- **The law.** `K/LAW.md` holds L0–L7, the gate table §E and the migration §M. Every pass-2 §8 choice is written there as a rule (STAGES as L1–L2 stage order, slot tolerance L2.6, the eponymy pin L2.2, hysteresis L2.5, hook-only slotting L2.6).
- **The code.** It is in `K/eponym/*.mjs`. Every rule id is in that code except six, and `LAW.md`'s header names the carrier of each of those six.
- **Two corrections this seat made to the text,** to match the code literally (S-21):
  - L0.4 now names the `.tsx`/`.mts` test extensions `isTest` accepts.
  - The E7 row now states that it judges `*.test.*` and `*.test-d.*` files only. Playwright specs are not judged.
- **Frozen artifacts.** The lists are `K/lists/*.json` and the rows are `K/rows/*.json`. The authored hunk specs are under `K/authored/`, and the generator is `K/tools/generate.sh`.
- **Closing command.** `K/tools/replay.sh <wt> --twice` rebuilds the tree from the frozen files. `node scripts/structure/eponym/eponym.mjs` in that tree gives `R/gate.log`.
- **Still owed.** Nothing is committed yet: this seat has no git write, and the driver's commit is S-01.

### G-02 · E4–E7 wired into `npm test` and GREEN: OPEN (E4, E6 RED)

- **Wiring.** `tests/gates/eponym.test.ts` (from `K/wire/`) runs one `it` per clause and reads the clause list from the gate itself, plus one `it` checking that every clause is judged. So no clause is CLI-only. In vitest the file has 19 tests: 16 pass and 3 fail (`R/vitest-summary.json`).
- **E5** is 40 → 0 and **E7** is 144 → 0: GREEN.
- **E4** is 74 → 64, RED (`R/gate.log`, `R/bounds.log`).
  - Dirs over 12 go from 18 → 8: `tests-visual` 177, `tests/styles` 23, `src/components/dock/__tests__` 17 (a slot this migration created, over P3-R3's strict slot bound), `tests/gates` 14, `demo/stories/{containers,foundations}` 13, `tests/{components,demo}` 13.
  - Files over 500 lines stay at 56 → 56. No law in any route splits a long file: an SFC split is authored work under R-5.
- **E6** is 90 → 18, RED. 72 demo edges were re-pointed at published entries (G-S12). The 18 left read names that no entry publishes, such as `useFuzzySearch`, `rendererStatus`, `useGlassBackdropLuminance`, `runtime.ts`, `springProjection` and `motionTempo`. By L4.5 that is a surface question, never a reroute (X-5). It is owed to the owner: publish each name on the entry L4.7 would pick, or change the story.

### G-03 · Authored concepts kept; module set pinned: CLOSED

On the migrated tree:
- `src/components/sheet/detents/{SheetContent.vue, useSheetDetents.ts, projection.ts}`: `detents` kept, and `use.ts` renamed by L3.5.
- `fourier-field/renderer/`, and `blob/renderer/{webgl,webgpu,surface}`.
- `aurora/config.ts`, the `./aurora-config` entry source (P3-R5), beside `aurora/config/`, the L2.8 base module.
- The aurora shader dirs are named by concept: `aurora/runtime/{webgl,webgl/palette,webgpu,frame}`, with no `mediums`, `wgsl` or `glsl` level.

The module set is pinned in `names.json` `modules`, and E3N is 96 → 0. Plants P19 and P-carve raise E3N (`R/plants.json`). Command: `ls` of those dirs in the replayed tree, plus `R/gate.log` for E3N.

**Disclosure.** `aurora/config.ts` sits beside a dir `aurora/config/`. `import "./config"` resolves to the file, so the build is unambiguous, but a reader sees two things with one name. B's names put the base at `config`, and P3-R5 puts the entry at `config.ts`. The owner may prefer renaming the base.

### G-04 · Privacy and direction (B1, B8, B12, B14); P18, P20 and P21 caught: CLOSED

| clause | base | final |
|---|---|---|
| B1 | 10 | 0 |
| B8 | 1 (`styles/glass.css` → `chip/accent-tone.css`) | 0 |
| B12 | 24 | 0 |
| B14 | 3 | 0 |

Source: `R/gate-base.log`, `R/gate.log`.

Plants on the migrated tree (`node K/tools/plants.mjs --root <wt> --out r.json`, `R/plants.json`):
- P18, a deep reach: B1 and E1.
- P20, a relay plus an alias: B12 and A1.
- P21, a masking fallback: E0.
- P12, the kernel reaching a unit: B8.
- B-22, a `<style src>` carve: B1.

B's counterexample is cured here. `composables/search/index.ts` was a declared door with no entry. Once stage 1 moved its three files out, the relay row cut every one of its statements, so the file and its `record.doors` line are deleted. The search trio lives in `dock/search/`, and no kernel door re-publishes it.

### G-05 · Placeholder names: CLOSED

E3P (`PLACEHOLDER` in `eponym.mjs`, the same list as §E's row) goes from 1 → 0. `typewriter/utils/` dissolves by L3.4b. Plant P19 (`dock/utils/utils.ts`) raises E3P and E3N.

### G-06 · The `scripts/` law run (P28): CLOSED, with one disclosure

S1 is 6 → 0 and S2 is 3 → 0.
- **L6.0.** `comment-census`, `gate-register` → `tests/gates/`; `paint-arm`, `reflect-capture-verify` → `tests-visual/paint/`.
- **L6.2.** `safari-probe.mjs` and `lib/canon-doc.mjs` are deleted.
- **B12.** The `minify-css.d.mts` mirror becomes `minify-css.mts`.
- **P28** raises S1.

The pass-2 B-35 and B-38 plants were not re-run by name.

**Disclosure.** `safari-probe.mjs` is a hand-run probe with no command token, so L6.2 deletes it. R-8's last sentence ("tooling scripts … are placed inside the `scripts/` module they serve") may intend to keep it. That needs the owner's reading.

### G-07 · CSS: PARTLY closed, OPEN on the channel collapse

- **Closed.**
  - A glob out of a door is caught: plant B-14 raises B14.
  - A `<style src>` carve is caught: plant B-22 raises B1.
  - `accent-tone.css` goes to `src/styles/` by F-7/FD-3 (P3-R2), which clears HEAD's B8 line.
  - The dock controls door is made pure: its `:where()` group moves verbatim into `specular.css`, and the cascade is identical (§S-10).
- **Open.** The R-7 channel collapse is not built, so the aggregator-held sheets (B-10, B-28) are not placed on the post-collapse channel as P3-R2 requires. The symbol-grain question (B-30) is not answered.

### G-08 · Registration-weak rule exercised: CLOSED

Plant P07a adds `dock/registry.ts`, which registers three SFCs as object values, and GlassDock reads it. L2.4 finds exactly one wiring file, `src/components/dock/registry.ts` with 3 registrations (`R/plants.json`).

### G-09 · Churn replay with each commit's entry map and hysteresis: OPEN

Not run. It needs F-1 and stage 2 on each of the 200 historic trees, each with its own entry map. The floor's entry record exists only at HEAD, so every older commit would need an entry record derived from that commit's `package.json`. The pass-2 figure (14.5% raw, 9.5% at unit grain) stands unre-measured with L2.5's hysteresis.

### G-10 · Peer sets over 12 split under B's authored names: PARTLY closed

- **Split.** `menu` 16 is carved into `menu/{sub,items}` in stage 2 (L7.2). `styles/glass` 28, `styles/tokens` 21 and `dock/styles` are carved by `lists/23-carve.json` (52 moves), with every module name from B's carve.
- **Unchanged.** `tests-visual` stays at 177: B has no carve for it, and F-1 does not model Playwright's `testDir`.

`src` has 1 dir over 12, the new `dock/__tests__` slot (17). §G-02 lists the rest.

### G-11 · G-S6 to G-S9 run: CLOSED

Walkers G-S6, tests G-S7a–c (141 + 3 test moves into 72 `__tests__/` slots), programs G-S7b, scripts G-S9a–e: `R/record.log`. E7 is 0 and vitest collects the slots (241 files).

### G-12 · Depth 7 and parent↔child nesting cycles: CLOSED (FD-2 counts them)

- L0.3 counts FD-2 over R-2 dir units, so a parent ↔ child dir cycle is a co-cyclic pair. L2.8 moves the parent-level files a nested module reads into a sibling base.
- FD-2 was +0 on every step. `R/pairs-final.json` shows 1 pair on the final tree, `demo/stories/substrates/aurora ↔ …/sections`, and it was present at the base.
- E2 has 0 flattenings. The maximum `src` dir depth is 6 for code (`aurora/runtime/webgl/palette`) and 7 with its `__tests__` slot. It was 5 at the base.
- On the final tree the gate reports two FD-2 holds (info, L1.6): stage 1 would lift `aurora/runtime/frame/{textureUpload,uniformBridge}.ts`, and FD-2 refuses the move. So stage 1 and the L2.8 base `frame` disagree there, and FD-2 settles it by holding.

## 3 · Checklist: shared (S-items)

### S-01 · Artifacts committed before judgment: OPEN (driver)

Every law, gate, list, row, authored override, tool and result of this seat is written under `K/`, none only in scratch. The commit is the driver's.

### S-02 · P3-R1 ruled; arm (a) holds: CLOSED

E1K (a kernel entry publishing a `src` file outside the global zone) is 0 at the base and 0 on the final tree. 40 files are anchored (`R/gate.json` info).

### S-03 · P3-R2 to P3-R9 ruled: CLOSED as rulings; one consequence OPEN

- **Applied.** P3-R3 strict (E4 counts slots), P3-R4 (E5 0, blob-config owns), P3-R5 (`./aurora-config`, +1 key) and P3-R6 (below).
- **Open consequence, P3-R9.** No ratchet rebind row is written. `npm run verify:package` is RED: `G-BUNDLE-RATCHET shrink 2912236 < 2916129` (`R/verify-package.log`). The floor base alone reads 2,910,618 (FLOOR-P3), so G's migration adds +1,618 B on top of the floor's −5,511 B. The ceiling is its own ruled row, owed to the owner.

### S-04..S-11 · Floor items, used by this route: CLOSED on G's side

- **FD-1** anchors 40 files.
- **FD-2** is a stop in the engine and across every row.
- **Self-name.** E0 is 0.
- **FD-4.** The cascade verifier is GREEN, identical on all 4 CSS entries (1,964 / 4 / 4 / 365 rules; `R/cascade.log`).
- **FD-6/FD-7.** 72 `__tests__/` slots are collected with no `ledger-stale`. There are 0 FD-6-class vitest failures.
- **P3-F6.** Per-step and whole-chain idempotence are shown in `R/replay-twice.log` and `R/replay-again.log`.

### S-12 · π and Playwright executed through F-10: CLOSED as executed; the suite is RED at the base

The runs are 74 specs and 393 tests on the migrated tree, paired against the base: 0 new failures, the π floor passing, and the plant biting (§5).

### S-13 · The merge test: OPEN

Cross-judging is P2-6.2 step 5. B's migrated tree was not available to this seat.

## 4 · Toolchain on the migrated tree (`R/toolchain.status`)

| check | exit |
|---|---|
| `npx vite build` | 0 |
| `vue-tsc --noEmit` (app) | 0 |
| `vue-tsc --noEmit -p tsconfig.test.json` | 0 |
| `npm run demo:dist:build` | 0 |
| `scripts/structure/entries.mjs check` | 0: 64 js entries → 69 keys, byte-equal |
| `scripts/structure/surface.mjs check` | 0: pinned = now, 0 differences |
| `scripts/structure/gates.mjs` | 0: F-1 7,357 edges and 0 violations, F-3, F-4, F-9 PASS |
| cascade verify vs base | GREEN |
| vitest (`R/vitest-summary.json`) | 2,345 tests: 2,332 passed, 12 failed, 1 skipped |

**The surface diff** (base pin → final pin) is the ruled rows only:
- export keys 68 → 69, js entries 63 → 64 (`./aurora-config`);
- runtime names 603 → 583, type names 1,279 → 1,239 (the R-6 drops, one MIGRATION row per name);
- `MIGRATION.md` +62 lines.

**The 12 vitest failures.**
- 3 are the gate's RED clauses, E1, E4 and E6 (§G-02, §6).
- 9 are `gate-register.test.ts`. Its roster, a closed BJ record (`GATE-SEMANTIC-ROSTER-C20.json`), pins `tests/styles/token-graph.test.ts`, which R-3 moves to `src/styles/tokens/__tests__/`. R-1 retires the register in a collapse wave that lands before the migration, and closed records are never rewritten. So this is a sequencing dependency on R-1, not a G row. Pass-2's three timeout-class failures did not recur.

## 5 · F-10 browser seat (π and Playwright)

`floor/browser.mjs` (landed at `scripts/structure/browser.mjs`) was run on the migrated tree with `--moved` over all 8 frozen lists. The bands the moves touch select 74 specs, and the π pixel floor runs on every call. The seat waited 1,743 s on the machine lock, which the B seat held, then ran alone.

| arm | tree | specs | tests ran | passed | failed | report |
|---|---|---:|---:|---:|---:|---|
| migrated | final digest `b26243ef…` | 74 | 393 | 180 | 213 | `R/browser-migrated.json` |
| base, 64 of the specs | base digest `f0019420…` (the B seat's run on its `wt-base`; this seat re-measured that tree's code digest as `SEQUENCE.base`) | 65 | 324 | 134 | 190 | `R/browser-base-B-seat.json` |
| base, the other 10 specs | base digest, this seat's `wt2` | 11 | 76 | 49 | 27 | `R/browser-base-10.json` |
| π planted (`--pi-plant all --floors aurora,blob`) | final | 1 | 3 | 1 | 2 | `R/browser-pi-planted.json`: GREEN, the planted floors bit |

**The pairing.** `node K/tools/browser-pair.mjs --migrated R/browser-migrated.json --base R/browser-base-B-seat.json --base R/browser-base-10.json` writes `R/browser-pair.json`:
- 213 of the 213 migrated failures fail the same way on the base;
- **0 are new on the migrated tree**;
- 0 specs are unpaired.

The π floor (`substrate-paints-color.spec.ts`) passes on the migrated tree and bites under the plant.

So the migration adds no browser failure. The browser suite is not GREEN, though: 213 tests fail on the base tree as well (the headless environment and the state of HEAD, which neither route caused). By F-10's verdict both arms are RED, and the delta is 0.

## 6 · Open gaps

1. **E1 1.** The FD-8 hold on `_shared/overlay/isTeleportedTarget.ts`. P3-R6 places it by its readers, in `dock/`, but moving it takes it out of `demo.css`'s `@source "../src/components/_shared/**/*.ts"`, and the floor's F-2 has no arm to declare a css-source glob delta. B holds the same file for the same reason. The floor needs a declaration arm; the file holds no Tailwind classes.
2. **E4 64.** 8 dirs and 56 files over the bound. The new `dock/__tests__` slot (17) is this migration's own breach of P3-R3. L5.2 homes all 17 at the dock root, and G has no rule that splits a test slot.
3. **E6 18.** Demo reads of unpublished names (X-5, owner).
4. **G-07's channel collapse (R-7).** Not built, so the aggregator-held sheets are not placed; B-30 is unanswered.
5. **G-09 churn.** Not re-measured.
6. **G-10 `tests-visual` 177.** No authored carve, and Playwright's `testDir` is unmodelled.
7. **S-03/P3-R9.** `verify:package` RED at 2,912,236 against 2,916,129; no rebind row.
8. **R-1.** `gate-register` fails 9 tests until the collapse wave retires it.
9. **The browser suite.** 213 of 393 tests fail on the base tree too; the migration adds 0 (§5). F-10's verdict is RED on both arms.
10. **S-13.** The merge test was not run. **S-01.** The commit is the driver's.
11. **Disclosures.**
    - `aurora/config.ts` sits beside `aurora/config/`.
    - `safari-probe.mjs` is deleted under L6.2 against a possible reading of R-8.
    - `lists/12-mirror.json` is an authored one-move list: the B12 cure picks `.mts`, and the law does not derive it.
    - The 16 plants are the author's, not an independent battery.

## 7 · Fences

- **Writes in the checkout.** Only under `docs/tranches/BL/design/structure/pass-3/`: `G-proto.md`, and in `G-kit/` the files `LAW.md` (two text corrections), `SEQUENCE.json` (re-recorded digests), `tools/land.mjs` (a dead removal list dropped), `tools/plants.mjs` (a listing fix: `git ls-files -c` listed files the migration deleted), the new `tools/replay.sh`, `tools/verify.sh` and `tools/browser-pair.mjs`, and `results/`.
- **Git.** Worktree add and remove only. No sibling repo was touched, and nothing under `~/.claude` was read.
- **Worktrees.** All were removed before returning.
