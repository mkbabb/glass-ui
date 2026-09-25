# D1 pass 3 · critique-G (run 2): the fresh adversarial critic of route D1-G

| field | value |
|---|---|
| seat | CRITIC, route D1-G (eponymous closures), run 2. Authored nothing in pass 2 or pass 3 |
| model | `claude-opus-5-5`, asserted from the seat's own identity |
| cut | worktree `<scratch>/D1/p3b/crit-G/wt` at `b602a59b`. Every kit and floor file came from `git archive b602a59b`, never from the working checkout |
| battery | `critique-G/battery/r2/` (BATTERY.md, probes.mjs, plants.mjs), sha256 `be928653fcba3a12770a5d98c849afdd3d88b027a321b717842a051655f35ffa` (`critique-G/BATTERY-HASH.txt`), written 07:18Z before reading `G-kit/`, `G-proto.md` or `xj-BonG.md` |
| tools after the hash (disclosed) | `critique-G/tools-r2/plants-v2.mjs` (re-aimed plants whose premise failed on the migrated layout, plus V9 and V10), `literal-reads.mjs`, `scc-arms.mjs` |
| results | `critique-G/results-r2/`. Every number below is in one of them |
| prior run | an uncommitted run-1 critique-G existed in this dir. Its report is kept at `critique-G/run-1/critique-G.md`, and its battery, tools and results are unchanged. I read its header only, after writing nothing. Its headline (14 → 91 SCC members under R-2 units) is the one number I had seen, and I re-measured it independently (§S-05) |

Paths: `P` = `docs/tranches/BL/design/structure/pass-3`, `C` = `P/critique-G`, `K` = `P/G-kit` at `b602a59b`.

**Verdict: ADVANCE. 11 of 25 items CLOSED, 14 OPEN, convergence 44%. Nothing earlier-closed re-opens.** The replay is exact and the gate is real: 26 of 29 applicable plants bite. The largest open finding is the unit function. Under the floor's R-2 unit (P3-F2's own), the migrated tree's static module SCC grows from 14 members to 91, and the growth comes from two exemptions that G wrote for itself and no ruling grants:
- L0.3 treats tests and doors as nodes of their own;
- the gate's B8 skips every test file, which LAW L4.2 does not say.

## 1 · The replay

```sh
git archive b602a59b docs/tranches/BL/design/structure package.json | tar -x -C <scratch>/r2/art
node <art>/…/floor/rows/apply.mjs --root <wt>                 # tree digest 7f26c673…; code digest = SEQUENCE.base f0019420…991a8c
node <art>/…/pass-3/G-kit/tools/replay.mjs --root <wt> --twice   # 525.8 s, exit 0
node <art>/…/pass-3/G-kit/tools/replay.mjs --root <wt>           # "the chain is applied; nothing to write"
```

- **Result.** All 28 steps reach their recorded digest, and each second application is a no-op (`C/results-r2/replay-1.log`). The final code digest is **`b26243ef15a498507db269e4621e6271b3f99f66b36c2d39ff5fc5e1d37eb7c6` over 1,360 files: CONFIRMED**. The whole-chain rerun is a no-op (`replay-2.log`).
- **Caveat.** "FD-2 +0" in that log is judged under G's L0.3 unit (see S-05).

## 2 · Gate and toolchain on the replayed tree

- **Gate.** `node scripts/structure/eponym/eponym.mjs` exits 1 (`gate.log`): E1 1, E4 64 and E6 18 FAIL. Every other clause is 0.
- **Toolchain** (`toolchain.status`): vite build, both vue-tsc programs, floor gates (F-1 7,357 edges, 0 violations; F-3; F-4; F-9), entries, surface and demo build all exit 0.
- **vitest.** 2,345 tests: 12 failed, 1 pending (`vitest-summary.json`). The failures are the 3 RED gate clauses and 9 `gate-register` failures, which are `sourcePath missing` pins on moved test paths.

## 3 · Plants (`plants.json`, `plants-v2.json`, `plants-v9.json`)

The unplanted gate already exits 1, so a plant counts as CAUGHT when a clause count rises or a new line names the planted path. The tree was restored after every plant: `git status` md5 is `8bc7f086…` before and after.

| plant | intent | result |
|---|---|---|
| K-selfname | S-06 | CAUGHT, E0 `self-name-in-src` |
| K-reach (P18) | G-04 | CAUGHT, B1 (as a reach) and E1 |
| K-alias (P20) | G-04 | CAUGHT, B12 and A1 |
| K-fallback-missing (P21) | G-04 | CAUGHT, E0 unresolved |
| **K-fallback-live** | G-04, no masking fallbacks | **MISSED**: `import("./DockSeparator.vue").catch(() => null)` to a live file |
| K-kernel-type (B8) | G-04 | CAUGHT, B1 and B8 |
| K-relay | G-04 | CAUGHT, E5 0→1 (my name-matcher missed the line; the count rose) |
| K-door-impure (B14) | G-04 | CAUGHT, B14 |
| K-placeholder (P19), K-misc | G-05 | CAUGHT, E3P 2 each, plus E3N and E2 |
| K-scripts-helper (P28) | G-06 | CAUGHT, S1 |
| **V4 scripts-shared-in-module** (B-38) | G-06 | **MISSED**: a helper in `scripts/structure/` read only by 2 top-level bins |
| V2 glob-out (B-14) | G-07 | CAUGHT, B1 8 and B14 1 |
| V3 source-out (P3-R8) | G-07 | CAUGHT, B14 |
| K-css-private (B-10) | G-07 | CAUGHT, B1 and E1 |
| V7 css-global-one (B-28, via `<style src>`) | G-07 | CAUGHT, E1 |
| K-style-src (same-unit `<style src>`) | G-07 | not caught. The premise was withdrawn: 17 SFCs use a same-unit `<style src>` at the cut, and R-5 bans it only as an over-500 split |
| K-pin-newdir, V5 rename-detents | G-03 | CAUGHT: E3N (the pin) rose in both, plus E2 and E3 |
| K-peer13, K-long | G-10 | CAUGHT, E4 64→65 |
| K-test-wrong-unit, K-test-outside | G-11 | CAUGHT, E7 |
| K-demo-deep | G-11 | CAUGHT, E6 18→19 |
| **V8 colocated test reads demo** | G-04 (L4.2) | **MISSED**: B8 skips `L.isTest(e.from)` (`eponym.mjs` B8 loop) |
| V9 nest-cycle (clean parent↔child) | G-12 | CAUGHT, E2 0→2 (flattening), E3 and E3N |
| controls: V1 (E2), K-no-root (E3), V7/K-css-private (E1) | re-open check | all CAUGHT |
| L-door-read, L-colocated-test, L-shared-hook, L-registry (P07a) | legal | all PASS (exit and output unchanged) |

Defective and disclosed:
- K-crossfade-helper: its premise is gone, since `DockCrossfade.vue` sits at dock's root.
- K-glob-out, K-source-out, K-scripts-shared-in-bin: target lookups failed. Each was re-aimed as V2, V3 and V4.
- K-rename-detents, K-skeleton-away: the move engine refused an undeclared scan delta. Each was re-aimed as V5 and V6.
- V6: my manual rewrite missed `./Skeleton.vue`, so its E0 hit is a plant defect and is not scored.
- V10 was written but not run.

## 4 · Items

### Shared

- **S-01 CLOSED.** `git ls-tree b602a59b` holds all 100 `G-kit` files. The replay ran from the archive alone and matched (§1).
- **S-02 CLOSED.** P3-R1(a) is ruled. `probes-final.json` gives `kernelReexportOutside` 0, and gate E1K is 0.
- **S-03 OPEN.** Two rulings are not applied:
  - P3-R2 needs CSS placed after the R-7 collapse, which is not built (LAW §E, "the R-7 channel collapse is not built").
  - P3-R9: no rebind row is in `SEQUENCE.json`'s 28 steps.
  - This seat did not run `verify:package`.
- **S-04 CLOSED.** `publicationAnchor` exists and runs on the replayed tree: 37 anchored rows (`probes-final.json`).
- **S-05 OPEN.** `scc-arms.mjs` on the replayed tree (`scc-arms-final.json`), against the base (`base-scc.json`, floor unit: 4 SCCs, 14 members, 26 pairs):

  | unit | SCCs | members | pairs |
  |---|---:|---:|---:|
  | floor `dirUnits` (the unit P3-F2 counts) | 1 | 91 | 4,095 |
  | tests as their own node | 5 | 16 | 27 |
  | G's L0.3 | 1 | 2 | 1 |

  - Even with tests excluded, 5 pairs are new: `menu↔menu/items↔menu/sub`, `sheet↔sheet/detents` and `toast↔toast/toaster`. Each is closed by a door re-export down (`sheet/index.ts → detents/SheetContent.vue`) and a child import up (`SheetContent.vue → sheet/motion.ts`).
  - FD-2 stops only under L0.3, which is route-authored and in no ruling.
- **S-06 CLOSED.** K-selfname is caught by E0, and `selfNameInSrc` is 0.
- **S-07 CLOSED.** The overlay census gives 3 `computed-read` rows with bases `src/components`, `src/components` and `src` (`probes-final.json`).
- **S-08 OPEN.** `cssWithoutDist` is `[]`, and the build and entries checks are 0. But this seat did not run the `glass.css`/`theme.css` moves on the tree: G does not move them, and my move-engine plants were refused by scan-delta declarations. So "no longer refused" is unmeasured by a non-author.
- **S-09 CLOSED.** Every step under `--twice` is a no-op, and the whole-chain rerun is a no-op (§1).
- **S-10 CLOSED (floor presence).** One `isSlot` is exported by `lib/placement.mjs` and imported by `bounds.mjs`. `cascade.mjs` has 2 `scopedKeyframes` hits. `classify.mjs` and `lib/classify.mjs` are landed. The cascade verify was not re-run by this seat.
- **S-11 OPEN.** vitest has 9 FD-6-class layout-pin failures (`gate-register`: `sourcePath missing — tests/styles/token-graph.test.ts`, …). The cure is R-1's collapse wave, which is not in the chain.
- **S-12 OPEN.**
  - The π floor was executed: 3/3 GREEN (`browser-migrated.json`).
  - The 74-spec band run was killed at the fence's worktree removal before it finished. The first attempt passed `--moved` as one argument (zsh no-split) and so selected only the π floor.
  - This seat has no complete Playwright measurement of its own.
- **S-13 CLOSED.** Both `xj-BonG.md` (RED, 14/17) and `xj-GonB.md` (RED, 54 lines) are committed at the cut with results.

### D1-G

- **G-01 OPEN.** A literal reading of LAW L4.2 ("`src` reads no consumer zone") gives **36** edges from 25 colocated test files into `demo`/`tests` (`literal-reads.json`), against the gate's B8 0. The code runs a rule the law does not state, which S-21 and LAW's own header call a defect.
- **G-02 OPEN.** E1 1, E4 64 and E6 18 are RED under `npm test` (`vitest-summary.json`).
- **G-03 CLOSED.**
  - The names are kept: `sheet/detents`, `blob/renderer`, `fourier-field/renderer` and `aurora/config`, with 0 shader-stem dirs (`probes-final.json`).
  - The pin bites: K-pin-newdir and V5 raise E3N.
- **G-04 OPEN.**
  - V8 is missed, and the tree already carries 36 such edges (see G-01).
  - The masking-fallback class misses a live target (K-fallback-live). P18, P20, P21, B8's kernel arm, B12 and B14 are CAUGHT.
- **G-05 CLOSED.** The E3P clause is in LAW §E, and P19 and misc raise E3P. Outside the scope: `tests/utils` is a placeholder dir that E3P does not judge.
- **G-06 OPEN.** V4 is missed. L6 carries no rule for a file that 2 or more bins reach, which SPECS-v2 §4.8 does state ("goes to `scripts/lib/`").
- **G-07 OPEN.** The R-7 collapse is not built, so the aggregator-held sheets are not placed on the post-collapse channel, and B-30 is not answered. B-14, B-22 (G's cross-unit reading), B-10 and B-28 via `<style src>` are CAUGHT. `accent-tone.css` is at `src/styles/`, read by `glass.css` only.
- **G-08 CLOSED.** L-registry (P07a) leaves the gate unchanged.
- **G-09 OPEN.** Churn was not replayed (G-proto §G-09).
- **G-10 OPEN.** 8 dirs are over 12, including `tests-visual` at 177. `menu` is 5, `styles/glass` 6 and `styles/tokens` 1 (`probes-final.json`).
- **G-11 OPEN.** SPECS-v2's G-S6 R-5 file splits were not run: 56 files over 500 lines, the same as the base. G-S8 leaves 18 demo reads past a door (`demoPastDoor` 18).
- **G-12 OPEN.** The door-mediated parent↔child cycles are co-cyclic under R-2's unit (S-05) and invisible under L0.3, and no ruling makes them intra-unit. Depth is max 5 below `src/components`. V9 is caught by E2.

**Re-opening check.** The E1, E2 and E3 controls bite and every legal probe passes, so no earlier-closed item re-opens.

## 5 · Outside the checklist

- `aurora/config.ts` sits beside the `aurora/config/` dir.
- The live-target masking fallback maps to G-04.
- `tests/utils` is a placeholder name outside E3P's scope. It maps to G-05, but the edict names no zone.
- L2.8's premise ("a parent dir P reads the modules nested in it") does not hold where P reaches the child only through its door: `sheet/motion.ts` is read by `detents/SheetContent.vue` and is not in a base.

## 6 · Fences

- **Checkout writes.** Only under `P/critique-G*`: `battery/r2/`, `BATTERY-HASH.txt` (run 1's hash kept inside), `tools-r2/`, `results-r2/`, `run-1/critique-G.md` (a copy), and this report.
- **Git writes.** Worktree add and remove only. The remove left an unregistered directory in scratch.
- **Not touched.** No sibling repo, and nothing under `~/.claude`.
