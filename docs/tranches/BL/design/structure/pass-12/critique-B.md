# D1 · pass 12 · critique-B: sealed modules, flat

| field | value |
|---|---|
| seat | fresh adversarial critic for D1-B, pass 12. Authored nothing in passes 2-12, the pass-6..11 critiques included |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `9144cbe12` (2026-10-16T13:19:18Z): the kit, its results and `B-proto.md` were committed there, before this seat's battery hash (13:26:27Z). No commit followed during the run |
| battery | written and hashed before reading `pass-12/B-kit/` or `pass-12/B-proto.md`: **`c6fdf555…f7ace9c1`** (`critique-B/BATTERY-HASH.txt`, 6 files). Earlier batteries were run by path and re-hashed to their own records: pass 11 `317fd849…`, pass 10 `7b7b5303…`, pass 9 `748826fb…` |
| worktree | `.claude/worktrees/bl/D1/p12/crit-B/wt` from HEAD, `node_modules` symlinked. Two APFS clones in the same seat dir (`fb`: the built floor base; `ub`: the unbuilt replayed tree) for the route battery's three-tree signature. All removed: clones `rm -rf`, `git worktree remove --force`, `crit-B/` removed; `p12/` left empty |
| fences | no source edit; no git write beyond worktree add/remove. Checkout writes: this file and `pass-12/critique-B/{battery,tools,results}/`, `BATTERY-HASH.txt` |
| guard | one heavy run: queued 13:27:36Z, admitted 13:29:45Z (2 min), phase 1 → toolchain → battery, done 14:07:19Z. Then one heavy run for `tools/route-batt.sh`: queued 14:07:33Z, admitted 14:08:25Z, done 14:17:35Z. Light: the tree gate (`seal-wt.txt`), `tools/xnew.sh` (`--rss-gb 8`). No 13M refusal. No browser was launched. Nothing is left running |

Short citations: `R/` is `pass-12/critique-B/results/`, `K/` is `pass-12/B-kit/`, `Bp12` is `pass-12/B-proto.md`. Loads are `sysctl vm.loadavg` (1/5/15 min).

---

## §0 · Verdict

**27/27 CLOSED. S-14 closes on this seat's measurement. Nothing is re-opened, and no finding maps to a listed item left open or to an edict clause the list leaves out. The pass is clean.**

S-14 entered pass 12 open on one hole (cB11 O-1): a partial re-keyed base in `--base` read a failing route GREEN. The cured `browser-tally` reads the chain's own map (`lib/follow.mjs` `chainOrigin`, `baseProgram` at `baseSha`) and requires `--base` to hold results for every route spec with a base origin, or it throws. This seat's battery discovers the 18 committed `browser-seat/2` reports, puts each in each of the tally's four slots and in `rekey`'s base, and runs F6 through every row. **Only `base-rekeyed.json` reads 0 in `--base` against the full route (`ZERO` PASS). F6 never reads 0 in 86 rows. F7's ten rows each exit 2**, both through this seat's rows and through pass 11's `f7.sh` by path ("never-0 rows reading 0: 0"; pass 11 read 10). The touched-spec pairs on their own read a verdict, and F6's analogue on each reads RED. A base with one base-origin spec deleted exits 2 for five different specs. `judges12` **233 PASS / 0 FAIL**.

| bar (§P11-6.4) | this seat's measurement | load |
|---|---|---|
| `6fdd4ec7…` replayed, rerun a no-op | HEAD code digest `35f7b831…` = the chain's base; 126 steps, no S74c; `K/replay.mjs` from committed bytes in a fresh worktree: **416 s, `chain final MATCH`, `6fdd4ec7bd259630d38a466a444e45b2b18f71b4cbf2259d258a4c6177996bbf` over 1,587 files** (FIN, FIN2); rerun 0.5 s, "the chain is applied". Unchanged after every battery family (`R/digest-after.txt`, `R/route-batt/digest-after.txt`) | 22.5 → 19.9 |
| floor base `6773b4ec…` | S1's script → **`6773b4ec1217ab41…532f2cadb`** over 1,354 files = S1's recorded digest (FB1) = the re-cut base (FB2). With the landed engine put back to `16e907cb3`'s text, the digest reads **`5b14c6c7…705402f`**, pass 10's (FB5): the re-cut is one line. The floor plant (pass 11's `floor11.mjs`): pre-S1 docs engine **KEPT** 4/4 `./`-lead shapes, the pre-cure engine **LOST** 4/4, the landed engine on the floor base KEPT, the chain's engine on the replayed tree KEPT (`R/phase1.txt`, `R/p11-regress/floor-landed.txt`) | 20.5 → 18.3 |
| gate | **19/19 at 0** (`PASS B0..B18 0`), exit 0 (`R/seal-wt.txt`, light); files 1,585, edges 8,350, modules 142/142, pin 142/122/1,320/2 (`R/toolchain.txt`) | 13.8 |
| package | verify:package **CLEAN**; ratchet PRESENT, datum **2,920,386**, `equal: true`, `increase: false` | 20.4 → 24.0 |
| cascade | the floor base's four `.seq` sequences are identical to `K/results/p12/cascade/baseline`. GREEN against this seat's floor-base snapshot with the kit's listing (exit 0); RED with an empty listing (exit 1) | 23.2 |
| toolchain | build 0; `vue-tsc` ×2 0; `demo:dist:build` 0; `seal.test.ts` **26/26**; vitest 275 files, **2,335 passed**, 10 expected-fail, 1 skipped, 0 failed (`--maxWorkers=2`, 120 s) | 21.8 → 12.0 |
| `./motion-core` | keyframes-free on all three arms: names 55, dist 5 files, files 38, peers none; exit 0 against the kit's base report and against this seat's (the latter equals the kit's, root aside) | 23.2 |
| browser | **428 base-green, 428 held, 0 failed, 0 absent, flaky 1** through the cured kit tally and through this seat's reader (`tally12.mjs`, with its own kind and extent checks); the same with both touched-spec pairs added; selection re-derived: 155 specs, 14 captures, new 0 / left 0 against the kit's, pass 11's and pass 10's `specs.txt` (`R/browser12.txt`) | 13.2 → 13.4 |

---

## §1 · S-14: the extent, every committed report in every slot

`R/judges12.txt` (hashed `battery/judges12.sh`): **233 PASS, 0 FAIL, 9 INFO**. The report set is discovered, not listed: 18 `browser-seat/2` reports under `K/results/p12/browser/` (raw base, re-keyed base, route; three raw and three re-keyed base reruns; three route reruns; the p10 and p11 pairs' raw base, re-keyed base and route).

| family | rows | result |
|---|---:|---|
| `--base` × 18 reports, with and without every rerun | 36 | `base-rekeyed.json` with the reruns **0**, without them **1** (the flaky blob D2 key needs its reruns, P7-R2). **The other 34 rows exit 2.** `ZERO`: 0 rows other than the right full base read 0 |
| `--route` × 18 | 18 | `route.json` 0; the 5 partial route reports never 0 (RED, absent keys); the 12 base kinds 2 |
| `--base-rerun` × 18 | 18 | the 5 partial re-keyed bases 0 (three reruns, the two pairs' bases: "the touched-spec pairs pass … when added as reruns"); the full re-keyed base INFO 0; raw and route kinds 2 |
| `--route-rerun` × 18 | 18 | the 5 partial routes 0; the full route INFO 0; base kinds 2 |
| `rekey` base × 18 | 18 | the 6 raw base runs 0 (the seat's re-key of `base.json` holds the committed `base-rekeyed.json`'s results byte for byte); the 12 others 2 |
| F6 (`expandable-container.visual.ts :: (a) inline renders real canvas…` flipped; its spec held by no rerun or pair) | 86 | through every report in `--base` (± reruns), `--base-rerun`, `--route-rerun`, and through every `rekey` output as `--base` and `--base-rerun`: **none reads 0**. Control: the right base reads 1 (427 held + 1 failed with reruns) |
| F7, cB11's ten rows | 10 | each **2** ("holds no results for … of the route's 153 base-origin spec(s)") |
| PAIR | 4 | p10 pair on its own GREEN 33/33, p11 GREEN 3/3; each with one base-green key of its route flipped: **RED** (32 + 1 failed, 2 + 1 failed) |
| DEL: the full re-keyed base minus every result of one base-origin spec (F6's spec, a moved spec `a11y-slider.spec.ts`, the flaky key's spec, each pair's spec) | 15 | against the full route, with and without reruns: **2**; against F6's failing route: 2, never 0 |
| MAP: `frozen/SEQUENCE.json` as `{}`, `[]`, missing, non-JSON (restored by sha256) | 12 | a partial base and the full base over F6: 2 in every form (the `{}`/`[]` forms throw "names no baseSha", missing ENOENT, non-JSON SyntaxError); the restored control reads 0 |

**Regression rows, by the pass-11 critic's hashed `judges11.sh` (run by path):** 161 / 4, the same count as its own run. Compared line by line with its own run (paths aside), exactly two rows differ: `KM-tally-base-rekeyed-base-rerun` and `KM-tally-base-steps-rekeyed-base` go from rc **0 → 2**. Those are cB11 O-1's rows, now cured. Its four FAILs are its own disclosed controls (cB11 §7 item 3). Pass 10's `judges10.sh` reads **145/0**, its flag and degenerate-input rows identical to pass 11's run.

**INFO extents** (this seat's adversarial rows; judged here, not scored):

| row | reading | judgement |
|---|---|---|
| X-KEY: the full base minus only F6's **key** (its spec kept), against F6's route | **RED** (1 route key UNBASED) | the key-grain reading Bp12 §1 and LAW §14 state: a verdict, never GREEN |
| X-SKIP: the full base with F6's spec's 8 results all `skipped`, against F6's route | GREEN, 424 base-green | the base vouches for 4 fewer keys, and the control against the passing route also reads 424 (`R/xnew.txt` X-SKIP-CTL). This is not a partial report and not a committed one. It is a hand-edited status, the same class as the forged `rekeyedFrom` (Bp11 G-4, Bp12 G-4, declared limits). A real base whose tests skip vouches for nothing by the same rule. No item is touched |
| X-NEW (hashed): the route's first spec renamed to a path with no origin | GREEN | **vacuous**: that spec's two base results are base-red, so it held no base-green key (§7 item 2). Re-planted post-hash on F6's spec (8 results): **RED, 4 absent**, the renamed spec judged for nothing (`R/xnew.txt` X-NEW2) |
| X-DUPR: every route result doubled | RED, 860 UNBASED | a route holding keys `#2` the base lacks is read short, not GREEN |
| X-ORIG: `rekeyedFrom.report` pointed at a missing file | GREEN | the field's `report` path is a label; `testDir` is what the tally reads. Declared limit (G-4) |

---

## §2 · S-03, S-08, S-09: the rulings on the replayed tree

- **P11-R1 (a).** In the kit: `browser-tally.mjs` reads `chainOrigin`/`baseProgram` (diff to pass 11: the extent block, the UNBASED count, the verdict line). `lib/sequence.mjs` now throws on an absent chain (MAP-missing 2). No chain step, frozen file or floor file changes; the digest holds at `6fdd4ec7…`.
- **P10-R1 (a).** One engine: the landed `scripts/structure/lib/move.mjs` (saved before FB5) and the committed docs `floor/lib/move.mjs` are both `ee305d6f…`, and the docs engine differs from `16e907cb3` at line 168 only (§7 item 1 gives the method). Plants as §0.
- **P9-R1 (a)** (pass 10's `plants10b.mjs`, through `run11.sh` p10-post): PD **6/6**. **P9-R2 (a)** (`fix10b.sh`): C2-G1 0 in the section; MIGRATION META 1,648 = HEAD; the four tranche-id plants 1 hit each. **P8-R3** (`plants10.mjs` PR-*): identical to pass 11's run.

---

## §3 · S-12: the browser bar

`R/browser12.txt` (hashed): **BW1-BW7 7/7 PASS.**

- The kit tally and `tally12.mjs` read the committed full pair and the six reruns: **428 / 428 / 0 / 0, flaky 1**, `ACCOUNTED … : yes`. With both touched-spec pairs added as reruns: the same.
- **BW7.** The route specs the full base lacks are exactly `chip-accent-band.visual.ts` and `w1-radius-redress-inputs.spec.ts`. Neither exists on the floor base at that path, and neither is in the raw base report. They are the chain's creations, as Bp12 §1 says. `tally12.mjs` reads the bar with only these two excused, and refuses a base rerun as `--base` (151 uncovered specs; dry run before the hash).
- **BW6.** `browser-select` on the replayed tree: 604 moves, 723 changed, 155 specs, 14 captures, equal to the kit's, pass 11's and pass 10's `specs.txt`.
- **BW8.** Every committed pass-12 browser report is byte-identical to pass 11's, except `base-rekeyed.json`. That one was re-derived (its `rekeyedFrom.report` names this kit), and its results equal this seat's own re-key of `base.json`.
- Pass 11's `browser11.sh` and pass 10's `browser10.sh` (by path) read 6/0 and identical respectively.

No browser ran. No `src` file or code line moved (§P11-6.2 step 2).

---

## §4 · Regressions

| set | result |
|---|---|
| pass 11's critic battery (`run11.sh` by path) | judges11 161/4, only the two O-1 rows changed (0 → 2); browser11 6/0; floor-landed identical; p10-post: plants10b PD 6/6, fix10b as §2, fd4 A/G/G2/U/RESTORE PASS |
| pass 10's through it | judges10, plants10, migration10, browser10: **0 lines differ** from pass 11's run (paths, loads and timings stripped) |
| pass 9's through that | **402 rows, 0 differ**; crash8 **39/39**; p8-plants, b18-inputs (5/1 as before), flake9, plants9 (17/0/1), browser-plants: 0 lines differ. judge-throws **55/0** (52 before: `lib/follow.mjs`, `lib/sequence.mjs` now planted under the tally, each 2, and one INFO row for `plants-p12`). select-capture: +2 SC4 lines (LAW §14's new capture sentences read as text). tree-probes: only path and truncation differences |
| pass 11's post-hash `f7.sh` | ten rows **2**, controls 1, "never-0 rows reading 0: 0" (`R/p11-post.txt`; re-pointed copy, diff printed) |
| the route's batteries (passes 6-12, `tools/route-batt.sh`, post-hash) | `plants-p12` 148/148, `plants-p11` 115/116 (its one changed row the cure, as Bp12 §6), p10-p6, fix10, critic9x, fd4, floor: **11/11 summary lines SAME** as the route's committed results, every exit code equal (`R/route-batt/compare.txt`) |

---

## §5 · Findings

| # | finding | item it maps to | effect |
|---|---|---|---|
| I-1 | A hand-edited base with one spec's results set to `skipped` reads GREEN over a route failing a key of that spec (X-SKIP). The base-green set shrinks from 428 to 424 | none newly: S-14's text names partial and malformed reports. This report is neither partial nor committed, and it falls in the declared forged-report limit (Bp11 G-4 / Bp12 G-4). A real skipped base test vouches for nothing by P7-R2's definition | none (INFO). The convergence record may list it with G-4 |
| I-2 | `rekeyedFrom.report` is not read (X-ORIG) | as I-1 (a label) | none (INFO) |
| I-3 | the route's runner is `tools/batteries-p12.sh`, not `tools/batteries.sh` | none | none. The next critic should know the name; four arguments, as Bp12 states |

No finding maps to an item left open or to an edict clause the list leaves out. The checklist stays at 27.

---

## §6 · The 27 items

| item | status | the measurement that holds it (all in `R/`, replayable) |
|---|---|---|
| S-01 | CLOSED | kit, results and `B-proto.md` committed at `9144cbe12` (13:19:18Z), before this seat's hash (13:26:27Z); no commit after |
| S-02 | CLOSED | B8 0, B9 0 (`seal-wt.txt`) |
| S-03 | CLOSED | P11-R1 (a) landed in the kit and measured (§1); P10-R1 (a) FB1/FB2/FB5 and plants; P9-R1 PD 6/6; P9-R2 fix10b; P8-R3 PR; the datum rebound once, 2,920,386 |
| S-04..S-08 | CLOSED | gate 19/19 at 0; floor plant KEPT/LOST/KEPT/KEPT (`phase1.txt`, `p11-regress/floor-landed.txt`, `route-batt/floor.txt`) |
| S-09 | CLOSED | `6fdd4ec7…` from committed bytes in a fresh worktree, MATCH; rerun 0.5 s no-op; unchanged after every family |
| S-10 | CLOSED | cascade GREEN listed (0), RED unlisted (1) against this seat's `6773b4ec…` snapshot, identical to the committed baseline |
| S-11 | CLOSED | vitest 2,335 passed, 0 failed; `seal.test.ts` 26/26 |
| S-12 | CLOSED | 428 held + 0 failed + 0 absent through the cured tally and an independent reader with its own extent check, with and without both pairs; the two route-only specs shown absent from the floor base; captures stated and printed (14), and pass 9's capture checks unchanged |
| S-13 | CLOSED | 402 rows 0 differ; every earlier critic battery runs on the pass-12 tree with every verdict identical, except the rows the cure changes by design (two judges11 rows, three judge-throws rows); the route's batteries 11/11 SAME |
| **S-14** | **CLOSED** | B17 0; crash8 39/39; judge-throws 55/0; judges10 145/0; every committed report in every slot: refused kinds 2, **no report other than the full re-keyed base reads 0 in `--base`** (34/34 rows exit 2); F6 never 0 in 86 rows; F7 10/10 at 2 (this seat's rows and `f7.sh`); a spec deleted from the base 2 (five specs); a degenerate map 2 (four forms); a missing key RED. This closes "a partial report where a full one is required" and "F6 never 0 through every committed report in every slot" |
| B-01 | CLOSED | every clause 0, B2 0; I7 inside the 402 rows |
| B-02..B-06 | CLOSED | 402 rows 0 differ |
| B-07 | CLOSED | B15 0 |
| B-08, B-09 | CLOSED | gate 0; regressions |
| B-10 | CLOSED | B18 throws on a peer-less, whitespace-only and subpath-less row (plants10 PR, critic9x BI3 2, b18-inputs as before); `./motion-core` keyframes-free on names, dist and files |
| B-11..B-13 | CLOSED | regressions unchanged (p7 EXIT `--pin` refused 2) |

**Count:** 27 items, **27 closed, 0 open**, 0 re-opened. Convergence by §P2-6.5's formula: 27/27 = **100%**. This critique re-opens nothing and maps no finding to an open item or an unlisted edict clause. Under §P11-6.5 the two-clean-passes count moves from 0 to **1**. The registry records it.

---

## §7 · This seat's own defects (each re-run or re-planted post-hash, expectation unchanged)

1. **FB3/FB4** (`phase1-12.sh`) compared the landed engine with `floor/lib/move.mjs` after S1. S1 moves the docs floor runtime out of `docs/` (the trap cB11 §7 item 2 disclosed), so the docs file was absent: FB3 FAIL, FB4 "0 lines". Re-checked from committed bytes: `git show HEAD:…/floor/lib/move.mjs` is `ee305d6f…`, the landed copy saved by FB5 (`R/logs/move.landed.mjs`) is `ee305d6f…`, and the diff to `16e907cb3` is line 168 only. FP0 (pre-S1, cured KEPT / pre-cure LOST) and FB5 carry the discriminating measurement.
2. **X-NEW** renamed a spec with no base-green key, so it judged nothing. `tools/xnew.sh` re-plants it on F6's spec: RED (§1).
3. **`run12.sh` route-batt** looked for `tools/batteries.sh` (pass 11's name) and found none. `tools/route-batt.sh` runs `batteries-p12.sh`'s families line for line, except `critic11`, which `run12.sh` already ran by path (§4).
4. **The toolchain's seal block** printed only B16-B18. The gate was re-run `--light` on the same tree (`R/seal-wt.txt`, all 19 at 0).

None of these changes a hashed expectation for a judge under test. S-14's closure rests on hashed rows (`judges12.sh` KIND × EXTENT, F6, F7, PAIR, DEL, MAP) and on pass 11's `f7.sh` by path.
