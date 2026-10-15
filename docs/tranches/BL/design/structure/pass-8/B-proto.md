# D1 · pass 8 · B-proto: sealed modules, flat

| field | value |
|---|---|
| seat | D1-B prototype, pass 8. Extends the pass-7 chain from its tail by the work listed in §P7-6.3 |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD at close | `a36fe2be`. `git diff 6154d6ec HEAD -- . ':!docs'` is empty: the chain runs over 10.1.0's code, the same as pass 7 |
| kit | `pass-8/B-kit/` (557 files, every result under `results/p8/`). Untracked: the seat makes no git write; the driver commits it before the critic launches (S-01) |
| sessions | the seat ran across four session restarts (2026-10-08 to 2026-10-15). Replays r1-r6 used HEAD `00f191d8`, `d6f68b88` and `2e22ae10`, and every one reached the same code digest (§2). This closing session re-derived the browser tally from the committed reports and found it byte-identical to `tally.txt` (load 13 at 1 min) |
| fences | worktree `.claude/worktrees/bl/D1/p8/B-proto/wt` only, now removed; checkout writes limited to `docs/tranches/BL/design/structure/pass-8/` |

Citations: `R/` is `pass-8/B-kit/results/p8/`. Loads are the 1/5/15-minute averages at each run, as logged.

---

## §0 · In brief

| bar (§P7-6.4) | result |
|---|---|
| replay | **121 steps**, digest `05aaa6edbe0f8f242f0ffe5f37a4e46f9e880ec237e30a3d4293f8f9a451e1b3` over 1,585 files; r5 904.0 s MATCH, r6 `--twice` 1,430.9 s MATCH; rerun no-op (1.8 s, 0.5 s) |
| gate | **19/19**, every clause 0, exit 0 (B18 new, P7-R1 (a)) |
| S-14 | **closed at cause**: the CLI imports only node's own modules, installs the guard as its first statement, then loads the gate with a dynamic import the guard covers. Every throw exits 2: at module evaluation (non-JSON `package.json`, a throwing floor module, a throwing clause module, a throwing B18 reader), in `main()`, and at record write. 12/12 EXIT plants; the pass-7 critic's C3 now reads 2 |
| package | verify:package **CLEAN** at **2,920,391**. The datum rebinds once, at S70, after S73c (the last step that changes shipped bytes). That is +6,845 B over the floor and −10 B against pass 7 |
| cascade | **GREEN** against the floor base (`./styles` 28 moved, `./styles.css` 10 moved, risks 0, unlisted 0, stale 0) |
| browser | **GREEN**: 428 base-green keys, 428 held, 0 failed, 0 absent; 1 flaky under P7-R2 (blob D2), outside the bar; 155 specs selected (154 by band, 1 by name: `w38-binding`) |
| `./motion-core` | keyframes-free on all three arms (names 55, dist 5 files, files 38); B18 now judges this in the gate |
| plants | p8 27/27; p7 17/17; p6 re-run PASS; pass-7 critic's 17 + 4 and the 371 regressions, tallies identical to the critic's; p2 battery 12 CAUGHT, 2 FALSE+ (the recorded L1/L2 classes) |
| 27 items | route claims 27/27 closed (§6). S-14 needs the critic's confirmation |

---

## §1 · The chain

Copied from `pass-7/B-kit` and extended from its tail. Pass 7 had 117 steps; pass 8 has 121, of which 4 are new and 3 re-derived.

| step | kind | what | why |
|---|---|---|---|
| S72 | row | `src/styles/scroll/scroll-driven.css`: the membership note now names `demo/stories/motion/scroll/useScrollScene.ts` | P7-G6 (P6-R1) |
| S73 | row | the dock context's injection label moves into the context | B18's names arm (below) |
| S73b | moves | the context becomes `dock/context/`, the dock's sub-module | B7 |
| S73c | row | the context's door, with every reader crossing through it (the slider's dock hold included) | B1 |
| S69 | row, re-derived | the gate re-land (`derive/land-gate.mjs`). It is re-derived once and stays the last gate step: it lands `seal/seal.mjs` (the guarded CLI), `seal/clauses.mjs`, `seal/peer.mjs` (B18) and `tests/gates/seal.test.ts` | S-14, P7-R1 |
| S69s | row, re-derived | the pin (`seal-pin.json`, `peerHolds` reviewed) | P7-R1 |
| S70 | row, re-derived | the datum: `.bundle-ratchet` 2,919,057 → 2,920,391 | P4-R3/P5-R2/P6-R2 |

**S73-S73c were not in the pass-8 plan; B18 forced them.** B18's names arm found a break the chain itself had made, which the entry-grain probe could not see because the root was already broken for that peer (P7-G5). The root's `Slider` reached `@mkbabb/keyframes.js` through this path:

- S15 placed `useDockHold` beside the slider;
- B1 routed its dock-context read through the dock entry's door;
- the context read `dock/constants.ts`, which reads `springPreset` through the motion door.

The cure is at the cause: the label moves into the context, and the context gets its own door. The bytes are −147, −8 and +181 B (S70's step record). LAW §5 records it. The critic should judge it as route work beyond the plan.

---

## §2 · Replay and digest

| run | HEAD | start | wall | digest | rerun | load start → end |
|---|---|---|---:|---|---|---|
| r1 | `00f191d8` | 2026-10-09 15:22Z | — | `05aaa6ed…` | — | 234 101 48 |
| r2 `--twice` | `00f191d8` | 2026-10-09 15:35Z | — | `05aaa6ed…` | — | 447 473 323 |
| r3 | `d6f68b88` | 2026-10-13 18:51Z | — | `05aaa6ed…` | — | 97 57 29 |
| r4 `--twice` | `d6f68b88` | 2026-10-13 19:09Z | — | `05aaa6ed…` | — | 169 142 102 |
| **r5** | `2e22ae10` | 2026-10-14 15:12Z | 904.0 s | `05aaa6ed…` MATCH | 1.8 s no-op | 32 104 148 → 86 84 98 |
| **r6 `--twice`** | `2e22ae10` | 2026-10-14 15:12Z | 1,430.9 s | `05aaa6ed…` MATCH | 0.5 s no-op | 32 104 148 → 94 100 104 |

- **Digest:** `05aaa6edbe0f8f242f0ffe5f37a4e46f9e880ec237e30a3d4293f8f9a451e1b3` over 1,585 files.
- **Floor base (S1):** `5b14c6c7ce4e36f092263a90a269d842a0bccf9a131012fe03889d0bf705402f` over 1,354 files (`R/base-floor-r5.txt`).
- **Chain base:** `35f7b831…`.
- **Rerun:** under `--twice`, every step reads "0 written, N applied", so the rerun is a no-op.
- **Timings:** they are not verdicts; the loads were 32-447.

---

## §3 · The gate: nineteen clauses

`R/seal-r5.txt`, on the r5 tree:

| clause | count | | clause | count |
|---|---:|---|---|---:|
| B0 | 0 | | B10 | 0 |
| B1 | 0 | | B11 | 0 |
| B2 | 0 | | B12 | 0 |
| B3 | 0 | | B13 | 0 |
| B4 | 0 | | B14 | 0 |
| B5 | 0 | | B15 | 0 |
| B6 | 0 | | B16 | 0 |
| B7 | 0 | | B17 | 0 |
| B8 | 0 | | **B18** | **0** |
| B9 | 0 | | | |

The seal record's other fields:

- `files` 1,583 (`filesScope`: "the five zones and the root files"), edges 8,347, modules 141 (required 141);
- B10: anchored 39, held 0;
- `multiDoorSymbols` 0;
- peer: entries `.` and `./motion-core`, heavy peers `@mkbabb/keyframes.js` and `@vueuse/core`, `held` 23 (the pin's reviewed `peerHolds` for the root's base-state breaks, P7-G5);
- pin: modules 141, doors 121, names 1,289, reviewed 2.

**The S-14 clause, as LAW "The gate" now states it.** The CLI exits 0 on GREEN, 1 on RED, and 2 on no verdict, and "every throw is no verdict, without exception". That covers module evaluation, the run and record write. `seal.mjs` imports only `node:fs` and `node:path`. Its first statement is `process.on("uncaughtException", … exit 2)`, which an unhandled rejection or a rejected top-level await also reaches. The gate loads after it, through `await import("./clauses.mjs")`. `derive/land-gate.mjs` accepts 0 and 1 and rethrows anything else.

**B18, P7-R1 (a).** B18 judges each entry's names and files arms against the class declared in `src/README.md` ("Heavy-peer exclusions"), in the gate's one static walk, under `npm test`. Its reader is `gate/peer.mjs`, landed as `scripts/structure/seal/peer.mjs`. These conditions throw (exit 2) and are never read as an empty class: a missing table, a row with no peer, or a declared entry the record does not publish. The dist arm stays in `tools/peer-closure.mjs`, which reads the same two source arms through the same file. A missing `dist/glass-ui.js` is a throw there (exit 2).

**`tests/gates/seal.test.ts`: 24/24** (`R/logs/r5-seal-test.log`, 26.9 s, load 110 → 85). It has one `it` per clause, one that requires all nineteen, and these:

- a refused `--pin` exits 2;
- a run or record-write throw exits 2, and a RED overlay exits 1;
- **an import-time throw exits 2**: the floor runtime copied under a root whose `package.json` does not parse, and under one where a floor module throws as it loads;
- **B18 RED**: a keyframes.js leaf that `./motion-core` publishes;
- **B18 GREEN**: the same leaf loading vue only.

---

## §4 · Toolchain, package, cascade, peer

All on the r5 tree, 2026-10-14 15:27-15:33Z (`R/toolchain-r5.txt`).

| check | exit | time | load start → end |
|---|---:|---:|---|
| seal (unbuilt tree) | 0 | 18 s | 95 87 99 → 107 90 99 |
| peer probe, unbuilt tree (expect 2) | **2** | 7 s | 107 90 99 |
| base `vite build` | 0 | 34 s | 107 → 153 |
| base cascade snapshot (identical to the committed baseline in all four sequences) | 0 | 1 s | 153 |
| base peer probe (expect 1: the root is broken at the base) | 1 | 4 s | 163 |
| `vite build` | 0 | 29 s | 163 → 186 |
| verify:package | 0, **CLEAN** | 86 s | 186 → 154 |
| `vue-tsc` (library) / `vue-tsc` (tests) | 0 / 0 | 25 / 30 s | 154 → 116 |
| `demo:dist:build` | 0 | 7 s | 116 → 111 |
| cascade verify against the floor base | 0, GREEN | 3 s | 111 |
| peer probe (built) | 0, GREEN | 4 s | 110 |
| `seal.test.ts` | 0, 24/24 | 27 s | 110 → 85 |
| vitest full (`--maxWorkers=2`) | 0 | 56 s | 85 → 84 |

**Versions.** Node v26.0.0, vite 8.1.5, vue-tsc 6.0.3, vitest 4.1.10, TypeScript 6.0.3, Playwright 1.61.1, macOS 26.4.1.

**vitest:** 275 files, 2,333 passed, 10 expected-fail, 1 skipped, 0 failed. The order was `demo:dist:build` first, so pass 7's three boot-graph failures (P5-G5) do not appear here.

**Package** (`R/pack/pack-diff-r5.json`, `logs/r5-verify-package.log`):

- ratchet `PRESENT`, datum 2,920,391, `equal: true`, `increase: false`;
- floor 2,913,546 → route 2,920,391 (+6,845 B, files 838 → 921);
- by class: MIGRATION.md +9,338, door declarations +2,977, other declarations −5,422, CSS doors +574, other CSS +69, JS −923, other +232;
- against pass 7's 2,920,401: −10 B.

**Cascade** (`R/cascade/verify-r5.txt`):

| entry | result |
|---|---|
| `./styles` | listed reorder: 28 moved, 1,950 swapped pairs, 0 risks |
| `./styles.css` | listed reorder: 10 moved |
| `./styles/fonts`, `./styles/theme` | identical |
| scope Timeline → TimelineMarks | 40 rule lines |

No listing is stale or unlisted.

**Peer probe** (`R/peer-closure-r5.txt`):

| entry | class | names | dist | files |
|---|---|---|---|---|
| `./motion-core` | kept | 55, peers none | 5 files, peers none | 38, peers none |
| `.` | kept | holds the base state (P7-G5) | — | — |

Unbuilt tree: exit 2, "the build is missing (./dist/glass-ui.js)".

---

## §5 · The browser bar (S-12, P7-R2)

Committed under `R/browser/`.

| artifact | content |
|---|---|
| `selection.json` | 155 specs: 154 selected by 69 bands, plus `tests-visual/aurora/w38-binding.spec.ts` by name (P7-G3) |
| `specs.txt`, `changed.txt`, `moved.json`, `base-specs.txt` | the selection's inputs: 155 specs, 721 changed paths |
| `base.json` (`/2` report, floor base) | 866 keys; 2026-10-09, 11,755 s, load 459 → 133 |
| `base-rekeyed.json`, `rekey.log` | the base report re-keyed onto the migrated program (153 specs) |
| `route.json` (`/2` report, r5 tree) | 867 keys; 2026-10-14 15:33-17:11Z, 5,879 s, load 72 103 106 → 32 51 59. The run's own exit is 1: it reports base-red keys, which the tally reads |
| `reruns/` | P7-R2: the plan reruns one spec, `tests-visual/blob/blob-config-delta.spec.ts`, alternating base first, 3 per tree (74-85 s each, load 47-54) |
| `tally.txt` | the verdict, with all six rerun reports |

**The tally.** `browser-tally.mjs` iterates the base keys and counts a key absent from the route report as not held.

- base keys 866, route keys 867; base runs 4, route runs 4;
- **base-green 428; held 428; not held 0 (failed 0, absent 0)**; flaky 1, out of the bar; base-red route-green 1;
- **verdict: GREEN, every base-green key accounted for: 428 held + 0 failed + 0 absent.**

The flaky key is blob D2, "a negative attraction SHIES…". The base read it expected, unexpected, unexpected, unexpected; the route read it unexpected four times. It passed in the base's full run and failed in every base rerun, which is P7-R2's flaky class.

Seven route keys have no base key (`UNKEYED`): one new Chip test, and six from the `w1-radius-redress` split whose base titles were red. None is base-green.

**Per band** (base-green counts, 0 not held in every band):

| band | base-green | band | base-green | band | base-green |
|---|---:|---|---:|---|---:|
| styles | 424 | dock | 423 | aurora | 414 |
| dark-mode-toggle | 410 | blob | 291 | surface | 235 |
| motion | 232 | pager-dots | 213 | configurator | 204 |
| button | 202 | color | 195 | handmark | 194 |
| sortable-list | 191 | dialog | 142 | fourier-field | 125 |
| tabs | 117 | constellation | 99 | easing | 85 |
| sheet | 84 | timeline | 71 | slider | 69 |
| glass | 42 | alert | 37 | progress | 33 |
| menu | 23 | chip | 22 | shared | 18 |
| music-staff | 14 | toast | 14 | fading-scroll | 12 |
| dark | 10 | search | 8 | expandable-container | 4 |
| command | 4 | input | 4 | README, card, table | 3 each |
| badge, carousel, context, deck, index, infinite-scroll, metric, scroll-progress-rim, select, sidebar, textarea | 2 each | 18 bands | no browser signal | | |

A band's tests overlap other bands, so the band counts sum past 428.

**Closing-session check.** This seat re-ran `browser-tally.mjs` over the committed `base-rekeyed.json`, `route.json` and the six reruns at load 13 111 95. The output is byte-identical to `tally.txt`, exit 0.

---

## §6 · Plants

### Pass-8 battery: 27/27

`R/plants-p8.txt`, r5 tree, unbuilt, 77 s, load 46 → 48.

| group | count | what it showed |
|---|---:|---|
| EXIT | 12 | clean 0; RED overlay 1. Exit 2 in every phase: **import** (non-JSON `package.json`, a throwing `lib/tree.mjs`, a throwing clause module, a throwing B18 reader); **run** (non-JSON overlay, `--pin`, `--root` naming nothing, missing pin, B18's table gone from `src/README.md`); **record write** (`--json` and `--write-pin` under a regular file) |
| KF | 7 | KF-new RED [B1, B18]; KF-existing RED [B9, B18]; KF-leaf RED [B18]; KF-deep RED [B18]; KF-root (Badge gains keyframes.js; the root's holds do not hide a new name) RED [B18]; KF-vueuse RED [B18]; KF-CTL (vue only) GREEN |
| PROBE | 2 | unbuilt tree exits 2; built tree GREEN |
| TALLY | 4 | a base-green key removed from the route report reads ABSENT, exit 1; a key that fails a base rerun reads FLAKY, out of the bar; a key that passes every base run and fails the route reads NEW, exit 1; the two full runs alone, without reruns, read RED (429 base-green, 1 failed: D2), so the reruns are what classify D2 |
| SELECT | 1 | a moved spec no band selects is selected by name: 154 by band, 155 with names, `w38-binding` the one |

### Earlier batteries

| battery | result | file | load |
|---|---|---|---|
| pass 7's route battery | 17/17 (I7 family 8, TD/TDL 2, KF/KF6/KFL 3, EXIT 4) | `R/plants-p7-r5.txt` | 50 → 100 |
| pass 6's battery | PASS (X5 5, N 4) | `R/plants-p6-r5.txt` | — |
| pass-7 critic's crash battery | C0 0, C1 1, C2-C5 2. **C3 (non-JSON `package.json`) now exits 2**; pass 7 read 1. C6 INFO, C7 0 | `R/crit7-crash-r4.txt` | 85 → 92 |
| pass-7 critic's 17 plants | SKIP 1, RECORDED 5, CAUGHT 6, CLEAN 1, SAME-AS-CTL 4 | `R/crit7-plants.txt` | 272 → 465 |
| pass-7 critic's 4 extra plants | RECORDED 1, SAME-AS-CTL 3, identical to the critic | `R/crit7-extra-plants.txt` | — |
| regressions (371) | CAUGHT 326, CLEAN 32, FALSE+ 11, OTHER 5, UNNAMED 6, SKIP 1: the pass-7 critic's `regress.txt` tallies exactly | `R/crit7-regress.txt` | 500 → 290 |
| pass-2 battery | I23-I34 CAUGHT (12), L1/L2 FALSE+ (the recorded B15 classes) | `R/battery-p2-r4.txt` | 114 → 92 |
| FP6-4 two-children split | Aurora → ShadeA + ShadeB; listed GREEN, changed-value RED (rc 1), restore 0 | `R/sfc-split2-run.txt` | 290 |

In the 17 plants, the critic's 2 MISSED-RECORD cases are now RECORDED: B18 reads them.

None of these verdicts rests on timing.

---

## §7 · The 27 items

| item | entering pass 8 | route's status | what holds it |
|---|---|---|---|
| S-01 | CLOSED | CLOSED | kit, results, selection and both `/2` reports written under `pass-8/B-kit/` for the driver's commit before the critic |
| S-02 | CLOSED | CLOSED | B8 0, B9 0 |
| S-03 | CLOSED | CLOSED | P6-R1..P6-R3 on their arms; P7-R1 (a) landed as B18; P7-R2 (a) in LAW §13 with results committed; datum rebound once (S70) |
| S-04..S-08 | CLOSED | CLOSED | gate 19/19; replay and pin unchanged in kind |
| S-09 | CLOSED | CLOSED | digest `05aaa6ed…` in six replays, rerun a no-op |
| S-10 | CLOSED | CLOSED | cascade GREEN, every moved rule listed; FD-4 `/2` coverage |
| S-11 | CLOSED | CLOSED | — |
| S-12 | CLOSED | CLOSED | 428/428 base-green held, 0 absent; the tally iterates base keys; the selection picks moved band-less specs; flakes by protocol |
| S-13 | CLOSED | CLOSED | — |
| **S-14** | **OPEN** | **CLOSED (route claim)** | B17 0; every gate throw exits 2, import time included (4 import plants, 2 `seal.test.ts` cases, C3 reads 2); the peer probe throws on a missing build; B18 throws on a missing table |
| B-01 | CLOSED | CLOSED | every clause 0, B2 0; I7 caught |
| B-02..B-06 | CLOSED | CLOSED | — |
| B-07 | CLOSED | CLOSED | B15 over every stem |
| B-08, B-09 | CLOSED | CLOSED | — |
| B-10 | CLOSED | CLOSED | the residual names on the ruled arms; the peer class owned by B18 (P7-R1); `scroll-driven.css` cites the demo spine (S72) |
| B-11..B-13 | CLOSED | CLOSED | — |

**Count:** 27 items, route claims 27 closed. The two-clean-passes count stays 0 until the pass-8 critique.

---

## §8 · Open gaps

1. **S73-S73c are route work outside the plan,** forced by B18's names arm (§1). The critic should judge them as cures at the cause.
2. **P7-G5 is unchanged:** the root's peer class is broken at the floor base. The pin's `peerHolds` (23) name those breaks exactly, and B18 fails on any new one (KF-root).
3. **The base `/2` run is from 2026-10-09 at load 459-133.** The P7-R2 reruns ran at load 47-54. Only blob D2 needed reruns.
4. **The seat dir is still there.** The tool permission refused removing the empty `.claude/worktrees/bl/D1/p8/B-proto/` (with its empty `crit-tmp/`). The worktree `wt` is gone. The driver removes the dir (as P7-G7).
5. **Outside D1, unchanged:** P5-G3, P5-G5 (vitest is green here only because `demo:dist:build` ran first), P5-G8.
