# D1 · pass 9 · B-proto: sealed modules, flat

| field | value |
|---|---|
| seat | D1-B prototype, pass 9. Copies `pass-8/B-kit` to `pass-9/B-kit` and does the route work §P8-6.3 lists: P8-R1 (a), P8-R2 (a), P8-R3 (b), and P8-G7 measured |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `9e10c074` at r1, `53f43a66` at r2, `5e9f70dd` at r3 and close. `git diff 6154d6ec HEAD -- . ':!docs'` is empty at close: the chain runs over 10.1.0's code, as in passes 7 and 8 |
| kit | `pass-9/B-kit/` (458 files with this report under `pass-9/`). Every result is under `results/p9/`. `results/p8/` stays with the pass-8 kit; its committed inputs (the `/2` reports, the reruns, the selection, the cascade baseline, the base probe report) are copied into `results/p9/`. The seat makes no git write; the driver commits the kit before the critic launches (S-01) |
| fences | worktrees `.claude/worktrees/bl/D1/p9/B-proto/{wt,wt2,base,unbuilt}` only, all removed with the `B-proto/` dir; checkout writes limited to `docs/tranches/BL/design/structure/pass-9/` |
| machine | the heavy guard queue held the first replay 45 min (18:50-19:35Z, load 13 → 128) and the toolchain 30 min (23:04-23:32Z). Both were stopped unstarted and re-run under `guarded --light --rss-gb 8`, as the law allows (`results/p9/replay-r0-queued.txt`, `toolchain-run.txt`). Under `--light` the guard still held r1 for its load headroom until 21:36Z |

Citations: `R/` is `pass-9/B-kit/results/p9/`. Loads are the 1/5/15-minute averages logged at each run.

---

## §0 · In brief

| bar (§P8-6.4) | result |
|---|---|
| chain | **untouched**. No clause widened (P8-R1's import read is B0's existing arm, §1), so `frozen/`, `gate/`, `derive/` and `authored/` are byte-identical to pass 8's (`diff -rq`). No step was added or re-derived; the gate re-land (S69) is still the last gate step and the datum (S70) is not rebound |
| replay | digest **`05aaa6edbe0f8f242f0ffe5f37a4e46f9e880ec237e30a3d4293f8f9a451e1b3`** over 1,585 files, MATCH from three fresh HEAD worktrees: r1 (`--twice`, resumed after a guard timeout), r2 (`--twice`, 469.1 s), r3 (plain, 300.0 s). Reruns are no-ops (0.9 s, 0.4 s) |
| floor base | `5b14c6c7ce4e36f092263a90a269d842a0bccf9a131012fe03889d0bf705402f` over 1,354 files (`R/base-floor.txt`) |
| gate | **19/19**, every clause 0, exit 0; `files` 1,583, modules 141/141, pin 141 / 121 doors / 1,289 names / 2 reviewed, peer held 23 |
| toolchain | build 0; verify:package **CLEAN at 2,920,391**; `vue-tsc` ×2 0; demo build 0; `seal.test.ts` 24/24; vitest 2,333 passed, 0 failed |
| cascade | **GREEN** against the floor base (`./styles` 28 moved, `./styles.css` 10 moved, risks 0, unlisted 0, stale 0) |
| browser | **GREEN**, re-derived from the committed pass-8 `/2` reports (no browser run; §P8-6.2 step 4): 428 base-green, 428 held, 0 failed, 0 absent; 1 flaky (blob D2) out of the bar. Byte-identical to pass 8's `tally.txt` |
| `./motion-core` | keyframes-free on all three arms (names 55, dist 5 files, files 38) |
| plants | p9 **43/43**; p8 27/27; p7 17/17; p6 20/20; the pass-8 critic's crash8 (battery hash `c3953aab…`) 37/37 |
| P8-G7 | W-D.1 §0's five items measured: **all five non-zero** on this tree (§6) |
| 27 items | route claims 27/27 closed (§7) |

---

## §1 · The route work

### P8-R1 (a): the capture specs

| what | where |
|---|---|
| the exclusion and its reason, stated | LAW §13, "Capture specs are excluded, by statement": a `_`-prefixed spec is a recording tool that writes into `docs/` and asserts no product behaviour; running one rewrites tranche records, so no run selects it on either tree and no base-green key exists for it |
| the program reader names what it leaves out | `lib/floor.mjs` `loadProgram` returns `specs` (without captures) and `captures` |
| the selection prints the excluded moved specs | `tools/browser-select.mjs` prints `EXCLUDED capture <key> (touched by <steps>; …)` for each, and writes `captures.txt`. On the r1 tree: **14 printed**, 12 by S43b and 2 by S43c (each also row-edited) (`R/browser/select.log`, `R/browser/captures.txt`). Its `moved.json`, `changed.txt` and `specs.txt` are byte-identical to pass 8's committed ones (598 moves, 721 changed, 155 specs) |
| a moved capture spec's imports are read | **by B0, which already reads them.** The floor's F-1 graph parses every file in `tests-visual/`, and an unresolved reference is a violation that B0 counts. The battery plants it (§5 CAPTURE): `tests-visual/substrate/_cohere-debug.spec.ts` (moved by S43b) with its `../pi-manifest.ts` import broken reads **B0 RED, CLI exit 1** (`…:5 unresolved [import]`); the same spec gaining an import that resolves reads no new count. The same holds for a moved `_` capture helper (`tests-visual/aurora/probes/_aur-vangogh-harness.ts`) |
| clause widening | none. So `seal.test.ts` needs no new RED case, and S69 and S69s are not re-derived (P8-R1's conditional arm does not fire) |

### P8-R2 (a): every kit judge exits 0/1/2

`tools/browser-tally.mjs`, `tools/browser-select.mjs`, `tools/rekey.mjs` and `tools/peer-closure.mjs` each import only node's own modules before their first statement, `process.on("uncaughtException", … exit 2)` (`seal.mjs`'s guard). The kit modules they need (`lib/floor.mjs`, `lib/sequence.mjs`, `lib/follow.mjs`, `gate/peer.mjs`) load after it, by dynamic import. `peer-closure.mjs`'s old `main().catch` becomes `await main()`, which the guard covers.

**Degenerate inputs now throw:**
- tally: a report with no `results` array, or an empty one; no `testDir`; a base that passes no test;
- rekey: an empty base report; a base none of whose specs the chain carries to the tree; a tree with no `package.json`; missing arguments;
- select: missing arguments; a `--root` with no `package.json`; a selection of no spec;
- probe: no `--root`; an empty dist entry, or an empty module it imports.

LAW §14 states the law once.

### P8-R3 (b): one LAW §5 sentence

LAW §5 "Peer classes", **(pass 9, P8-R3)**:
- `src/README.md`'s table is the one record of the declared classes, and the pin does not repeat it;
- withdrawing a class is a reviewed edit of that file, which B18 reads as written;
- a missing table, a row with no peer, or a declared entry the record does not publish stays a throw.

The battery's XR plants read exactly that (§5).

### Other kit edits

- `tools/toolchain.sh` runs vitest at `--maxWorkers=2` (the machine law; pass 8's script left the default);
- `tools/plants-p7.mjs` and `tools/plants-p8.mjs` read `results/p9/peer-closure-base.json`;
- `replay.mjs` has one comment path changed;
- new: `tools/plants-p9.mjs`, and `tools/wd1/` (W-D.1's appendix probes copied verbatim, plus `measure.mjs`).

---

## §2 · Replay and digest

| run | HEAD | worktree | wall | digest | rerun | load start → end |
|---|---|---|---:|---|---|---|
| r0 | `9e10c074` | `wt` | — | held 45 min in the heavy queue, stopped unstarted (exit 143, tree unchanged) | — | 13 → 128 |
| r1 `--twice` | `9e10c074` | `wt` (fresh) | killed by the guard's 60-min timeout after S2-2 (5 of 121 steps, CPU-starved at 13 %) | the tree read S2-3's recorded digest `faeb3655…`, a point on the chain | — | admitted 21:36Z at 123 (guard: 30-min headroom wait) → 97 |
| r1 resume | `9e10c074` | `wt` | 316.7 s (116 steps) | **`05aaa6ed…` MATCH** | 0.9 s no-op | 97 → 42 |
| **r2 `--twice`** | `53f43a66` | `wt2` (fresh) | **469.1 s** | **`05aaa6ed…` MATCH** | 0.4 s no-op | 32 → 32 |
| **r3** | `5e9f70dd` | `unbuilt` (fresh) | **300.0 s** | **`05aaa6ed…` MATCH** | — | 34 |

- **Digest:** `05aaa6edbe0f8f242f0ffe5f37a4e46f9e880ec237e30a3d4293f8f9a451e1b3` over 1,585 files, the registry's expected value.
- **r1 is a resumption, not a whole run.** The replay driver refuses any digest off the chain, so resuming from S2-3's recorded digest replays the same bytes. r2 is the uninterrupted whole-chain `--twice` run, and r3 is a third whole run.
- **After every battery** both trees still read `05aaa6ed…` (`R/digest-after-batteries.txt`).
- **Timings are not verdicts**; the loads ran from 21 to 128.

---

## §3 · The gate: nineteen clauses

`R/seal-r1.txt` and `R/seal-r1.json`, on the r1 tree, unbuilt, at load 44 → 47:

| clauses | count |
|---|---|
| B0-B18 | 0 each, exit 0 |

The record's other fields:
- `files` 1,583, edges 8,347, modules 141 (required 141);
- B10: anchored 39;
- pin: modules 141, doors 121, names 1,289, reviewed 2;
- peer: held 23 (P7-G5's reviewed `peerHolds`).

All of these equal pass 8's. `gate/` is byte-identical to pass 8's, so LAW "The gate" and the S-14 guard stand unchanged; crash8 re-confirms them (§5).

---

## §4 · Toolchain, package, cascade, peer

`R/toolchain-r1.txt`, run 2026-10-15 23:32-23:36Z under `guarded --light --rss-gb 8`, r1 tree against the `base` worktree:

| check | exit | time | load start → end |
|---|---:|---:|---|
| seal (unbuilt) | 0 | 4 s | 20 → 21 |
| peer probe, unbuilt (expect 2) | **2** | 2 s | 21 |
| base `vite build` | 0 | 9 s | 21 → 23 |
| base cascade snapshot | 0 | 1 s | 23 (all four sequences identical to the committed baseline) |
| base peer probe (expect 1: P7-G5) | 1 | 3 s | 23 → 22 |
| `vite build` | 0 | 9 s | 22 → 21 |
| verify:package | 0, **CLEAN** | 30 s | 21 → 23 |
| `vue-tsc` / `vue-tsc -p tsconfig.test.json` | 0 / 0 | 10 / 9 s | 23 → 24 |
| `demo:dist:build` | 0 | 2 s | 24 → 23 |
| cascade verify against the floor base | 0, GREEN | 0 s | 23 |
| peer probe (built) | 0, GREEN | 3 s | 23 |
| `seal.test.ts` (`--maxWorkers=2`) | 0, 24/24 | 19 s | 23 → 22 |
| vitest full (`--maxWorkers=2`) | 0 | 123 s | 22 → 27 |

**Toolchain:** Node v26.0.0, vite 8.1.5, vue-tsc 6.0.3, vitest 4.1.10, TypeScript 6.0.3, Playwright 1.61.1, macOS 26.4.1.

- **vitest:** 275 files; 2,333 passed, 10 expected-fail, 1 skipped, 0 failed (`demo:dist:build` ran first).
- **Package** (`R/pack/pack-diff-r1.json`, `R/logs/r1-verify-package.log`): ratchet `PRESENT`, datum 2,920,391, `equal: true`, `increase: false`. Floor 2,913,546 → route 2,920,391 (+6,845 B; files 838 → 921), by class identical to pass 8. **The datum is not rebound**: no step changed.
- **Cascade** (`R/cascade/verify-r1.txt`): `./styles` listed reorder, 28 moved; `./styles.css` listed reorder, 10 moved; no swapped pair shares a property on co-occurring classes; scope Timeline → TimelineMarks, 40 rule lines; 0 unlisted, 0 stale, 0 risks.
- **Peer probe** (`R/peer-closure-r1.txt`):
  - `./motion-core`: kept; names 55, peers none; dist 5 files, peers none; files 38, peers none;
  - `.`: kept against the base (P7-G5);
  - the unbuilt tree exits 2, "the build is missing".

---

## §5 · Plants

### Pass-9 battery: 43/43

`R/plants-p9.txt`, r1 tree, built, run under `--light --rss-gb 8` at load 21-23.

| group | n | what it showed |
|---|---:|---|
| JUDGE | 21 | **exit 2 with `<tool>: no verdict`** for: no arguments (all four tools); a missing input (tally, rekey, probe); a non-JSON input (tally, rekey, probe); a wrong-schema report (tally, rekey); a tree that names nothing (rekey, select); and a kit module that throws as it loads, in a copied kit (`lib/sequence.mjs` and `lib/floor.mjs` under select; `lib/floor.mjs` and `gate/peer.mjs` under the probe; `lib/follow.mjs` under rekey). Controls: the tally over the committed reports exits 0 GREEN; the probe on the built tree exits 0 |
| EMPTY | 9 | **exit 2** for: an empty route report; an empty base report; an empty route rerun beside the full runs; a base that passes no test (tally); an empty base report, and one the chain carries none of (rekey); `dist/motion-core.js` emptied; and the module it imports, `writeVelocityWeight-C2DwUcQ5.js`, emptied (probe). Bytes are restored in a `finally`; the control after the restores exits 0 |
| CAPTURE | 9 | a moved capture spec (`_cohere-debug.spec.ts`, S43b) with a broken import: B0 RED, CLI exit 1; with a side-effect import to nothing: B0 RED; with an import that resolves: no new count. The same three for a moved `_` capture helper (`_aur-vangogh-harness.ts`, S43b), plus one CLI run (exit 1) for the spec. The selection prints and lists 14 excluded captures, and every capture spec in the chain's move lists (12) is among them |
| XR | 3 | P8-R3 (b): XR-drop (the `./motion-core` row withdrawn) reads no count, a reviewed source edit read as written. XR-drop-KF reads **B18** (and B11): `. (declared free of @mkbabb/keyframes.js) publishes a name whose module reaches it: CardHeader`. XR-drop-leaf reads **B18** |
| REDERIVE | 1 | the committed `base.json` re-keyed onto the r1 tree gives results identical to the committed `base-rekeyed.json` (153 specs) |

**Run 1 read 38/39** (`R/plants-p9-run1.txt`). The one FAIL was the battery's own target filter, not a kit defect: it took the `_` helper as a capture spec and compared the selection's 14 capture specs against a list holding that helper. Run 2 restricts the spec plant to `*.spec.ts`, keeps the helper as its own plant, and reads 43/43.

### Earlier batteries on the pass-9 tree

| battery | result | file | load |
|---|---|---|---|
| pass 8's route battery | 27/27 (EXIT 13, KF 7, PROBE 2, TALLY 4, SELECT 1) | `R/plants-p8-r1.txt` | 25 → 28 |
| pass 7's route battery | 17/17 | `R/plants-p7-r1.txt` | 28 → 40 |
| pass 6's battery | 20/20 | `R/plants-p6-r1.txt` | 40 → 27 |
| pass-8 critic's crash8 (hashed battery, unmodified; hash re-read `c3953aab…a75f5d`) | **37/37**, `CRASH SUMMARY pass=37 fail=0`, on the r3 tree. The same two INFO rows as the pass-8 critic: M4.1 (a throw planted in `seal.mjs` itself, before its guard) and R4 (an unparsable source) | `R/crash8-r1.txt` | 30 |

The pass-8 critic's other files (`regress.mjs`, its 381 rows, `extra-plants.mjs`) were not re-run here. XR's three cases are re-planted in the p9 battery.

---

## §6 · P8-G7: W-D.1 §0's five items on the pass-9 tree

`R/wd1-measure.txt`, r1 tree, built, load 30. The tool is `tools/wd1/measure.mjs`, which runs W-D.1's own appendix probes (`tools/wd1/{d1-probe,one-door,one-name}.mjs`, copied verbatim) and adds file:line. These are measurements; they add no checklist item (§P8-5).

| # | item | count | file:line |
|---|---|---:|---|
| 1 | parent↔child value cycle | **1 SCC** (`fourier-field` ↔ `fourier-field/renderer`), 4 value edges | `renderer/mint.ts:21` → `fourier-field/math.ts`; reverse: `FourierField.vue:14`, `useFourierField.ts:31`, `index.ts:2` (re-export) → `renderer/index.ts` |
| 2 | `Surface` names two symbols | **1** collision (`Surface`: runtime on `./surface`; type-only on `.` and `./axes`); one-door: 1 name on `./axes` + `./surface` | `src/components/_shared/axes.ts:23`, `src/index.ts:486` |
| 3 | bare type aliases | **5** | `aurora/config/color.ts:96` AuroraHarmony = ColorHarmony; `progress/types.ts:7` ProgressOrientation = Orientation; `scroll-progress-rim/types.ts:4` ScrollProgressRimOrientation = Orientation; `surface/Surface.vue:11` SurfaceDecoration = SurfaceAxis; `tabs/types.ts:34` SegmentedTabsActivation = TabActivation |
| 4 | the `UNRELEASED` MIGRATION heading | **1 added by the chain**: `MIGRATION.md:8` `## UNRELEASED — the structure cut (BL)` | the floor base has 33 `##` headings, 26 of them not a bare version; the chain adds exactly this one (34 and 27). 9 lines name `BL` or "tranche" (first `MIGRATION.md:8`) |
| 5 | the consumer preset in `./tokens` | **3 of 3** exported by `dist/tokens.js` (D1-G7 RED, exit 1); 0 readers in `src`, `demo`, `tests`, `tests-visual` | `src/styles/tokens/tokens.ts:12,19,26` |

Items 1, 2, 3 and 5 are unchanged from W-D.1's measurement on pass 4's tree, apart from paths (`aurora/config/color.ts:96`, `styles/tokens/tokens.ts`). Item 4 is the chain's own text. **All five are non-zero.** By §P8-5, each is W-D.1's landing work (§3.5, §3.7, §3.9 of the wave) or a pass-9 ruling, and the convergence record states which.

---

## §7 · The browser bar (S-12, P7-R2)

§P8-6.2 step 4 says the browser run is not repeated when the chain is unchanged; it is not. The task text also asked for a full graph-selected run. This seat followed the registry's plan, which is the more specific instruction for pass 9. The bar is re-derived from committed bytes.

| artifact (`R/browser/`) | content |
|---|---|
| `base.json`, `route.json`, `reruns/` | pass 8's committed `/2` reports, copied unchanged (base: 866 keys; route: 867; six P7-R2 reruns of `blob-config-delta.spec.ts`) |
| `base-rekeyed.json` | pass 8's; this seat's battery re-derived it from `base.json` onto the r1 tree with identical results (§5 REDERIVE) |
| `moved.json`, `changed.txt`, `specs.txt`, `selection.json` | the selection. `browser-select.mjs` re-derived the first three on the r1 tree, byte-identical (`select.log`) |
| `captures.txt` | new: the 14 excluded capture specs the chain touches, with their steps |
| `tally.txt` (`tally-run.txt`: exit 0, load 9 → 9) | the guarded tally over the full runs and all six reruns; **byte-identical to pass 8's** (`tally-p8.txt`) |

**The tally:**
- base keys 866, route keys 867; 4 runs per tree;
- **base-green 428; held 428; not held 0 (failed 0, absent 0)**; flaky 1, out of the bar; base-red route-green 1;
- **verdict: GREEN. Every base-green key is accounted for: 428 held + 0 failed + 0 absent.**

The flaky key is blob D2, "a negative attraction SHIES…" (base: expected, unexpected ×3; route: unexpected ×4).

Seven route keys are `UNKEYED`. None is base-green, and per-band counts are as in pass 8.

---

## §8 · The 27 items

| item | entering pass 9 | route's status | what holds it |
|---|---|---|---|
| S-01 | CLOSED | CLOSED | the kit, results, selection, `captures.txt` and both `/2` reports are written under `pass-9/B-kit/` for the driver's commit before the critic |
| S-02 | CLOSED | CLOSED | B8 0, B9 0 |
| S-03 | CLOSED | CLOSED | P8-R1 (a), P8-R2 (a) and P8-R3 (b) landed in the kit (LAW §13, §14, §5); no clause widened; the datum is not rebound (rebound once, at S70) |
| S-04..S-08 | CLOSED | CLOSED | gate 19/19 |
| S-09 | CLOSED | CLOSED | `05aaa6ed…` from three fresh worktrees, reruns no-ops |
| S-10 | CLOSED | CLOSED | cascade GREEN against the floor base, every moved rule listed |
| S-11 | CLOSED | CLOSED | vitest 0 failed |
| S-12 | CLOSED | CLOSED | 428/428 base-green held, re-derived from committed reports. The capture exclusion is stated (LAW §13), printed (14) and listed (`captures.txt`). A moved capture spec's imports are read by B0 (CAPTURE plants RED) |
| S-13 | CLOSED | CLOSED | — |
| S-14 | CLOSED | CLOSED | B17 0; crash8 37/37 on `seal/`. Every kit judge exits 2 on a throw, at load time included (JUDGE 21), and on a degenerate input (EMPTY 9) |
| B-01 | CLOSED | CLOSED | every clause 0; I7 caught (p7 battery) |
| B-02..B-06 | CLOSED | CLOSED | p6, p7 and p8 batteries identical in verdict |
| B-07 | CLOSED | CLOSED | B15 over every stem |
| B-08, B-09 | CLOSED | CLOSED | — |
| B-10 | CLOSED | CLOSED | the peer class is owned by B18. Its declared set is ruled P8-R3 (b), stated in LAW §5 and planted (XR 3/3). `./motion-core` is keyframes-free on all three arms |
| B-11..B-13 | CLOSED | CLOSED | — |

**Count:** 27 items, route claims 27 closed. The two-clean-passes count is 1 entering pass 9; the pass-9 critique decides whether it reaches 2.

---

## §9 · Open gaps

1. **P8-G7's five items are all non-zero** (§6). They sit outside D1's frozen checklist; the convergence record must state each as W-D.1's landing work or rule on it.
2. **The browser run was not repeated** (§7), per §P8-6.2. If the driver reads the task's "full graph-selected browser run" as binding over the registry's plan, it is owed: about 3.3 h of base run plus 1.6 h of route run at pass 8's timings.
3. **r1 is a resumed replay** (§2). r2 and r3 are uninterrupted whole-chain runs at the same digest, so the digest claim does not rest on r1.
4. **Heavy-queue holds.** The heavy guard queue held two runs past 30 min, and both ran under `--light --rss-gb 8` (header). Nothing was left running.
5. **The empty `.claude/worktrees/bl/D1/p9/` parent dir** remains (the seat removed its own `B-proto/` dir). `.claude/worktrees/bl/D1/p8/` is the driver's (P8-G6).
6. **The pass-8 critic's `regress.mjs` (381 rows) and its browser-plant set** were not re-run by this seat; the pass-9 critic owns them under §P8-6.4.
7. **Outside D1, unchanged:** P7-G5, P5-G3, P5-G5 (vitest is green because `demo:dist:build` ran first), P5-G8.
