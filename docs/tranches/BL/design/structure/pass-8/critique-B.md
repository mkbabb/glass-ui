# D1 · pass 8 · critique-B: sealed modules, flat

| field | value |
|---|---|
| seat | fresh adversarial critic for D1-B, pass 8. Authored nothing in passes 2-8, the pass-6 and pass-7 critiques included |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `5acb3123`. The kit was committed at `b0900969` (2026-10-15 12:14:04 -0400; 558 tracked files under `pass-8/`). The three commits since touch docs only. `git diff 6154d6ec HEAD -- . ':!docs'` is empty: the route and this seat judged 10.1.0's code |
| battery | written and hashed before reading `pass-8/B-kit/` or `pass-8/B-proto.md`: `c3953aab…82adb6` (`critique-B/BATTERY-HASH.txt`, 11 files, plus 12 earlier-critic files run by path) |
| worktrees | `.claude/worktrees/bl/D1/p8/crit-B/{wt,base}` from HEAD, `node_modules` symlinked. Both were removed with `git worktree remove --force`, and the seat dir was removed too. `tests-visual/node_modules` does not exist in the checkout, so no link was made |
| fences | no source edit and no git write in the checkout. The only writes are `pass-8/critique-B.md` and `pass-8/critique-B/{battery,tools,results}/` |
| guard | every build, test and probe ran under `~/.claude/guard/guarded`. The battery run (`tools/run-battery.sh`) ran as `--light --rss-gb 8 --timeout 44`: as heavy, it sat unadmitted for about 50 minutes, and a trivial `guarded -- echo` also timed out at the queue (`results/` has no file for that; disclosed here). The battery is one sequential node process |

Short citations: `R/` is `pass-8/critique-B/results/`, `K/` is `pass-8/B-kit/`, and `Bp8` is `pass-8/B-proto.md`. Every timing-sensitive line carries its load (`sysctl -n vm.loadavg`).

---

## §0 · Verdict

**27/27 CLOSED, 0 re-opened. S-14 closes at cause. Verdict ADVANCE: this is the first clean pass.**

| bar (§P7-6.4) | this seat's measurement | load (1-min) |
|---|---|---|
| replay from committed bytes | `K/replay.mjs` in a fresh HEAD worktree: 121 steps, 338.4 s, `chain final MATCH`, digest `05aaa6edbe0f8f24…451e1b3` over 1,585 files (`R/replay-1.txt`) | 12 → 16 |
| rerun no-op | 0.9 s "the chain is applied". After every battery the digest is unchanged (`R/replay-rerun.txt`, `R/digest-after.txt`) | 15 |
| floor base | `K/truncate-seq.mjs S1` on a copy of the kit, replayed: `5b14c6c7…705402f` over 1,354 files (`R/floor-base.txt`) | 13 → 19 |
| gate | 19/19 clauses at 0, exit 0; files 1,583, `filesScope` "the five zones and the root files", modules 141/141, pin 141/121/1,289/2, peer held 23 (`R/seal-wt.txt`) | 15 |
| package | verify:package CLEAN; ratchet PRESENT, datum 2,920,391 = unpacked, `equal: true`, `increase: false`. Only `S70-datum.json` writes `.bundle-ratchet` (`R/toolchain.txt`) | 12 → 13 |
| cascade | GREEN against this seat's own floor-base snapshot with the kit's listing; RED with an empty listing. All four `.seq` files are byte-identical to the kit's committed baseline (`R/cascade/`) | 14 |
| toolchain | build 0; `vue-tsc` ×2 0; `demo:dist:build` 0; `seal.test.ts` 24/24; vitest 275 files, 2,333 passed, 10 expected-fail, 1 skipped, 0 failed (`R/toolchain.txt`) | 13 → 22 |
| browser | re-derived from the committed `/2` reports: 428 base-green, 428 held, 0 failed, 0 absent, 1 flaky (D2, P7-R2), outside the bar (§3) | 11 |
| `./motion-core` | keyframes-free on all three arms: names 55, dist 5 files, files 38. B18 reads every peer plant (§2) | 14 |

---

## §1 · S-14: every throw exits 2 (P6-R3, P7-G1), and no judge passes on a missing input

`R/tree-probes.txt` (`battery/crash8.sh`): **37 PASS, 0 FAIL**, at load 11-15.

| phase | plants | result |
|---|---|---|
| module evaluation | `package.json` not JSON, missing, or empty; a module-scope throw planted in each of the 24 modules the gate loads besides its CLI (`battery/gate-modules.mjs` closure: `clauses`, `law`, `fallbacks`, `walks`, `peer`, and 19 `lib/` modules); an unhandled rejection; a deferred `setTimeout` throw | every one exits 2, "seal: no verdict" |
| run | ledger missing; ledger not JSON; `--root` naming nothing | 2 |
| record write | `--json` under a regular file; `--json` into a read-only dir | 2 |
| controls | GREEN 0; RED (B15 plant) 1; GREEN again 0 | as expected |
| INFO | a throw planted in `seal.mjs` itself, before its guard line, exits 1. That is the guard's own file; LAW has the guard as the CLI's first statement | recorded, not judged |
| INFO | an unparsable source reads GREEN. The follow-up (`R/unparsable.txt`) shows the scanner still reads that file's edges: an unparsable file crossing the dock door reads B1 RED, the same as its parsable control. Nothing is hidden | recorded |

The pass-7 critic's C3 (non-JSON `package.json`) now reads 2 (`P7:CRASH C3-pkgjson PASS rc=2`).

**No judge passes on a missing input.**

| judge | missing or degenerate input | exit |
|---|---|---|
| peer probe | no `dist/`, empty `dist/`, `dist/motion-core.*` removed (U1-U3) | 2 |
| peer probe | built tree, with `--base` (U0, U5) | 0 |
| B18 | `Heavy-peer exclusions` heading gone; `src/README.md` missing; the motion-core row naming no package (`R/b18-inputs.txt`) | 2 |
| tally | a base-green key absent from the route report | not held (§3) |

Sources: `R/peer-unbuilt-base.txt`, `R/b18-inputs.txt`.

**B17** is 0 on the replay. The pass-5/6 B17 plants inside the 381-row regression read as in pass 7 (§4).

---

## §2 · The peer class through the gate (P7-R1)

`R/plants.txt`, hashed `battery/plants.mjs`, load 14-15. **CAUGHT 7, CLEAN 3, MISSED-RECORD 1.**

| plant | B18 | other clauses |
|---|---|---|
| KF-new: a new keyframes leaf on the motion-core door | 26 lines | B11 2 |
| KF-leaf: an existing leaf gains a value import | 27 | — |
| KF-deep: a transitive sibling | 27 | — |
| KF-existing: the door re-exports `useSpring` | 26 | B1, B4, B9, B11 |
| KF-side: a side-effect import | 27 | — |
| KF-reexport: `export *` from keyframes | 27 | — |
| VU-leaf: `@vueuse/core` in a leaf (motion-core is declared vueuse-free too) | 27 | — |
| CTL-free: a keyframes-free leaf on the door | silent (B11 records the new name) | — |
| CTL-type: an erased `import type` | silent | — |
| CTL-other: a second keyframes import inside `useSpring.ts`, an entry that may bear it | silent | — |
| KF-dyn: a literal dynamic `import()` | unread | — |

KF-dyn is unread, as LAW §5 states: "dynamic `import()` load[s] nothing at evaluation". It is recorded, not judged.

**The lines are `./motion-core`'s own, not only the root's.** `R/b18-by-entry.txt` re-plants KF-leaf: B18 reads `.` 10 and `./motion-core` 17, for example "`./motion-core` (declared free of @mkbabb/keyframes.js) publishes a name whose module reaches it: useStagger".

---

## §3 · The browser bar (S-12, P7-G2, P7-G3, P7-R2)

**Re-derived from committed bytes** (`R/browser-plants.txt`; the RD lines use no route tool), load 11.

- **Without the route's tally:** base 825 keys and route 826 when duplicate titles fold (866/867 with the tally's `#n`).
- **Base-green:** 411 folded keys, 18 of them duplicate-row, which is 429 rows.
- **Not held in the full runs:** exactly 1, blob D2 (route `unexpected`).
- **The committed reruns** (`K/results/p8/browser/reruns/`, read directly) give D2 as base `expected` (full run), then `unexpected` ×3, and route `unexpected` ×4. It is flaky under P7-R2, so the bar is **428 held / 428**, which matches `tally.txt`.
- **The rekey** keeps the (title, status) multiset, with 0 unmapped.
- **Base-red route-green 1:** `shell-config.spec.ts :: G2`.
- **Per band:** the 69 band rows are re-derived (`RD BAND`), 0 not held in each.

| plant (hashed `battery/browser-plants.mjs`) | result |
|---|---|
| T0: the kit's tally on the committed pair plus the 6 reruns (invocation shim `tools/tally-shim.mjs`) | rc 0, held 428 |
| T1: one base-green key removed from the route report | PASS: printed `ABSENT … (base-green; no route run reports it)`, held 427, rc 1 |
| T2: a spec's 8 base-green keys removed | PASS, all 8 named |
| T3: removed, with the same title added under another spec (title-match masking) | PASS: still ABSENT; the masking key reads `UNKEYED` |
| T4: flipped to `unexpected` | PASS, NEW |
| T5: one row of a duplicate-title key removed | the `#n` key is named |

**The P7-R2 protocol** (`R/flake.txt`; fixtures and expected verdicts hashed in `battery/flake-cases.mjs`, invocation `tools/flake-run.sh`): 8/8 match.

| case | runs | result |
|---|---|---|
| F1 | base P/PPP, route F/FFF | NEW |
| F2 | base P/PFP | FLAKY, out of the bar |
| F3 | base P/FFF | FLAKY, out of the bar |
| F4 | base F | not base-green |
| F5 | P throughout | held |
| F6 | route F/PPP | NEW (no route-side forgiveness, as LAW §13 states) |
| F7 | no reruns, route F | NEW |
| F8 | route absent | ABSENT |

**Selection.** `K/tools/browser-select.mjs` re-run on this seat's tree writes `moved.json`, `changed.txt` and `specs.txt` byte-identical to the kit's: 598 moves, 721 changed, 155 specs (`R/select-rederive.txt`). The hashed S1 property read FAIL on 21 specs. **Adjudicated** in `R/select-plant.txt`:

- 7 of the 21 are intermediate move targets that a later move carries on (for example S43b → S67 for `esc-stack`), so they are absent from the final tree;
- the other 14 are the `_*` capture specs (§5 O-1);
- every non-underscore spec of the program is selected (programSpecs 155 = named 155), so `w38-binding` is in;
- the planted S2 is moot as planted: there is no unselected non-underscore spec to plant.

---

## §4 · Regressions

**`R/regress.txt`** (hashed `battery/regress.mjs` through `tools/regress-fixed.mjs`, `--group`, load 11-13): the pass-7 critic's 381 committed `regress.json` rows (its 371 plus 10 extras) are reproduced **row for row, 0 differ**.

| pass-7 critic's own plants | result |
|---|---|
| I7 family | 6/6 CAUGHT by B3, control CLEAN |
| KF-new, KF-leaf, KF-deep, KF-existing | CAUGHT by B18. In pass 7, 2 of these were MISSED by every clause |
| DT on the entry door | SAME-AS-CTL (pin line only), as pass 7 read and the registry ruled "none" (§P7-2 #3) |
| XDT | SAME-AS-CTL at clause grain, as in pass 7 |
| DT-eyeglass | SKIP (no `Tabs.vue`), as in pass 7 |

`regress-fixed.mjs` exists because the hashed regress prefixed the ids but not the `contrast` references. The first run read those 7 as NO-CONTROL (`R/regress-run1.txt`, which is also discarded for a 2-second critic edit during its group judgement). The re-run (`R/regress.txt`) is the one counted.

**Pass 7's tree-probes from committed bytes** (`R/tree-probes.txt`, `P7:` lines):

- **crash:** C0-C5 and C7 PASS, C6 INFO;
- **peer:** motion-core 0, 38 files;
- **SFC2 (`Blob.vue` → two children):** none RED, scopes-only RED, listed GREEN, one-scope RED, value RED, restore GREEN;
- **pass 6/5 probes:** PIN-OPT and NOPIN refused (2), GATE-PURE, PW-PROGRAM, REORDER-acc/out, FD4 A/G/G2/U PASS, RATCHET CLEAN;
- **the three FAIL lines** (CSS-DIST, CASCADE-RESTORE, SFC-keep) are the same three, with the same readings, the pass-7 critic adjudicated: LAW §5's 38 CSS doors, this env passing a listing to a self-snapshot verify, and pass 6's disclosed listing-procedure defect.

---

## §5 · Findings outside the checklist (logged; the score does not change)

| # | finding | measurement | maps to |
|---|---|---|---|
| O-1 | **The selection drops the 14 `_*` capture specs that the chain moves, with no stated rule.** `K/lib/floor.mjs:39` (`loadProgram`) filters basenames starting `_`. The program's `testMatch` collects all 169 specs; the selection holds 155. LAW §13 says the run names "every spec of the final tree's Playwright program that a move or a row touches". S43b and S43c move all 14, and `base-specs.txt` carries none. P7-G3's text was "selects every spec the chain moves or creates" | `R/select-plant.txt` | S-12's bar (no base-green key exists for them, so 428/428 stands) and the edict's "no masking fallbacks" (an unstated filter); S-14 already lists that clause. Cure: LAW §13 states the capture exclusion and its reason (they write into `docs/`), or the run includes them |
| O-2 | **`browser-tally.mjs` exits 1, its own RED code, on every throw**, although its header says "2 on a throw": a missing `--base` file, no arguments, a `browser-seat/1` schema, a missing rerun file. This is pass 7's S-14 defect class, in the bar's judge. It never passes, so no judge passes on a missing input | this seat's direct runs, recorded in this section's text only (they were outside the battery) | P6-R3's exit law applied to a kit tool; "no masking fallbacks" is listed (S-14). Cure: the same guard as `seal.mjs` |
| O-3 | **The declared-free set is not pinned.** Removing the `./motion-core` row from `src/README.md`'s table reads GREEN on every clause (XR-drop). With the row gone or rewritten, a keyframes leaf in motion-core is still caught, but only through the root's class (B18 `.` 10 lines, against 27 with the row) | `R/extra-plants.txt` (post-hash `tools/extra-plants.mjs`) | B-10 / P7-R1 (the class owned by B18). Cure: the pin carries the declared set, so withdrawing a class is a reviewed diff |
| O-4 | **The dist arm reads an emptied `dist/motion-core.js` as GREEN** (U4) | `R/peer-unbuilt-base.txt` | P7-G4 neighbour; a build never emits an empty entry |
| O-5 | **The route seat's empty dir `.claude/worktrees/bl/D1/p8/B-proto/` is still present** (Bp8 §8 gap 4) | `ls` | driver housekeeping, as P7-G7 |

No finding maps to an edict clause the checklist leaves out.

---

## §6 · The 27 items

| item | verdict | closing measurement (this seat, committed under `R/`) |
|---|---|---|
| S-01 | CLOSED | kit, results, selection, both `/2` reports and the six reruns committed at `b0900969` before this seat read them; `git status` of `B-kit/` clean |
| S-02 | CLOSED | B8 0, B9 0 (`seal-wt.txt`); the K-REEX/D-DUAL regressions as in pass 7 |
| S-03 | CLOSED | P7-R1 (a) landed: B18 in the gate, `seal.test.ts` RED and GREEN cases (24/24), LAW §5 names the owner, the probe's dist arm throws (U1-U3). P7-R2 (a) in LAW §13; reruns committed; flake fixtures 8/8. P6-R1..R3 held: the scroll spine is cited at `src/styles/scroll/scroll-driven.css`, exit codes per crash8. The datum is rebound once (S70 only) |
| S-04..S-08 | CLOSED | gate 19/19 on the replay; regressions identical |
| S-09 | CLOSED | MATCH from committed bytes in a fresh HEAD worktree; rerun 0.9 s no-op; digest unchanged after every battery |
| S-10 | CLOSED | cascade GREEN listed and RED unlisted, against this seat's own floor-base snapshot; SFC2 6/6; FD4 arms PASS |
| S-11 | CLOSED | vitest 2,333 passed, 0 failed |
| S-12 | CLOSED | the committed run re-derived: 428/428 held, every base-green key accounted for; tally plants T1-T4 PASS; P7-R2 8/8 (O-1 logged) |
| S-13 | CLOSED | not re-run: nothing in pass 8 touches G |
| **S-14** | **CLOSED (was OPEN)** | crash8 37/37 (every module the gate loads, the run, record write); C3 reads 2; peer probe 2 on a missing build; B18 2 on a missing table; B17 0 |
| B-01 | CLOSED | 19/19, B2 0; I7 6/6 by B3 |
| B-02..B-06 | CLOSED | regressions identical (0 differ) |
| B-07 | CLOSED | B15 0; the PH6/PHT6 regressions identical |
| B-08, B-09 | CLOSED | regressions; cascade GREEN |
| B-10 | CLOSED | the residual names on the ruled arms (DT/XDT as pass 7); the peer class owned by B18 (§2); S72's citation present. S73-S73c are cures at the cause, outside the plan: the names arm found a chain-made break. They are judged right, and the gate is 19/19 with B1 and B7 at 0 |
| B-11 | CLOSED | `--pin` and `--no-pin` refused, exit 2 (P5 probes) |
| B-12, B-13 | CLOSED | — |

**Score: 27/27 = 100%. Re-opened: none.** Under §P2-6.5 the two-clean-passes count moves 0 → 1 at the pass-8 agglomeration. D1-B converges at pass 9 if the pass-9 critique also re-opens nothing.

---

## §7 · Disclosures (this seat's own defects and post-hash glue)

**Battery defects, each worked around in a post-hash tool and named in the results:**

- `peer-unbuilt.sh`'s `${PEER_CMD:-…{ROOT}}` appends a stray `}` to any `PEER_CMD`. The re-run passes the command ending `--root {ROOT`.
- `regress.mjs` did not prefix `contrast`; `tools/regress-fixed.mjs` fixes it.
- `browser-plants.mjs` S1 counted intermediate move targets (adjudicated in §3).
- `browser-plants.mjs` calls its tally positionally; `tools/tally-shim.mjs` forwards to the kit's flags.

**Post-hash tools:** `tally-shim.mjs`, `flake-run.sh`, `toolchain-crit.sh`, `run-battery.sh`, `regress-fixed.mjs`, `extra-plants.mjs`. None changes a hashed expectation.

**One critic edit overlapped a run.** A 2-second re-plant of `useRAFLoop.ts`, for `R/b18-by-entry.txt`, overlapped the first regression run's group judgement. That run is kept as `regress-run1.*` and not counted. A stray copy this seat made at `/tmp/x/useRAFLoop.ts` was removed.
