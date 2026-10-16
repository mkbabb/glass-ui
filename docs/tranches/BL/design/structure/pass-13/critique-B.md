# D1 · pass 13 · critique-B: sealed modules, flat

| field | value |
|---|---|
| seat | fresh adversarial critic for D1-B, pass 13. Authored nothing in passes 2-13, the earlier critiques included |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `6a80458ca` (the pass-13 route commit, 2026-10-16T15:30:59Z). The kit and `B-proto.md` were committed there, before this seat's battery hash (15:36:03Z). `git status` under `pass-13/B-kit/` empty; the only untracked path is this seat's `pass-13/critique-B/` |
| battery | written and hashed BEFORE reading `pass-13/B-kit/` or `pass-13/B-proto.md`: `8cf445d0ad9ad40ad3d7970798e0d8c7b71f16131f099363d5088d23195ea53d` (`critique-B/BATTERY-HASH.txt`; five files: `ITEMS.md`, `phase1-13.sh`, `judges13.sh`, `extent13.sh`, `run13.sh`). Earlier batteries re-hashed at the same time and by the same method, each equal to its record: p12 `c6fdf555…`, p11 `317fd849…`, p10 `7b7b5303…`, p9 `748826fb…`; `f7.sh` `4353aec4…`. `run13.sh` re-hashed all five at run start (`results/digest-after.txt` line 2): unchanged |
| post-hash tool | `critique-B/tools/tally13.mjs` (an independent browser tally sharing no code with the kit or `tally12.mjs`), written after the hash and after reading the kit; its verdict is corroboration, the hashed `browser12.sh` row is the scored one |
| guard | the heavy run queued 15:36:40Z (load 7.83 / 10.26 / 13.71) and was not admitted in 30 min (16:06:46Z, load 11.15 / 10.36 / 10.34; the heavy slots were held by other sessions' runs). Per the task, it was withdrawn and everything ran `--light --rss-gb 8`, one run at a time: phase 1 16:07:17-16:17:12Z (`--timeout 60`), toolchain 16:17:12-16:20:10Z (`--timeout 45`), `run13.sh` 16:20:10-16:50:15Z (`--timeout 150`). No 13M refusal. No browser was launched. `results/queue.txt` holds every line |
| worktree | `.claude/worktrees/bl/D1/p13/crit-B/wt` at HEAD with `node_modules` symlinked; two APFS clones beside it (`fb`, the built floor base; `ub`, the unbuilt replayed tree) and `scratch/`. All removed (`git worktree remove --force`, then the clones, scratch and the `crit-B/` dir); `git worktree list` shows 0 `bl/D1` entries |

Citations: `R/` is `pass-13/critique-B/results/`, `K/` is `pass-13/B-kit/`, `Bp13` is `pass-13/B-proto.md`. Every load is the 1/5/15-minute average printed beside the measurement.

---

## §0 · Verdict

**27/27 CLOSED. Re-opened: 0. No finding maps to a listed item's own text or to an edict clause the list leaves out.** Every item closes on a measurement this seat ran from committed bytes.

| bar (§P12-6.4) | this seat's measurement | load |
|---|---|---|
| `6fdd4ec7…` replayed, rerun a no-op | fresh HEAD worktree: replay exit 0 in 279 s, digest `6fdd4ec7bd259630d38a466a444e45b2b18f71b4cbf2259d258a4c6177996bbf` over 1,587 files, FIN and FIN2 PASS; rerun 0.4 s "the chain is applied" (`R/phase1.txt`). The tree reads the same digest after every battery family, the route's own included (`R/digest-after.txt`, 6 lines) | 18.06 → 10.12 |
| floor base `6773b4ec…` | cut by S1's `apply.mjs` on the worktree: FB1, FB2 PASS, `6773b4ec1217ab416eea2e5ec1b79d39587c4201a70871d347e919d532f2cadb` over 1,354 files | 12.86 |
| 19 clauses at 0 | `R/seal-wt.txt`: `PASS B0 0` … `PASS B18 0`, exit 0; files 1,585, edges 8,350, modules 142/142, pin 142 / 122 / 1,320 / 2, peer held 23 | 12.63 |
| verify:package CLEAN at 2,920,386 | `terminal: CLEAN`, ratchet PRESENT, datum 2,920,386, `equal: true`, `increase: false` (`R/toolchain.txt`) | 13.57 |
| cascade GREEN against the floor base | this seat's floor-base snapshot: all four `.seq` identical to `K/results/p13/cascade/baseline`; verify with the kit listing exit 0, with an empty listing exit 1 (RED) | 12.63 |
| 428/428 base-green through the tally | `browser12.sh` (hashed, by path) BW1-BW7 PASS, `BW SUMMARY pass=7 fail=0`: kit tally 428/428/0/0, its own reader 428/428/0/0, flaky 1; `tally13.mjs` (post-hash, independent) the same, unbased 0, verdict GREEN | 13.10 |
| `./motion-core` keyframes-free on all three arms | names 55 → none; dist 5 files → none; files 38 → none; GREEN against the kit's base report and against this seat's own (`R/peer-built.txt`, `R/peer-built-ownbase.txt`) | 12.63 |
| `seal.test.ts` 26/26; vitest 0 failed | 26 passed (26); 275 files, 2,335 passed, 10 expected-fail, 1 skipped, 0 failed, `--maxWorkers=2` | 12.10 → 13.61 |
| floor plant KEPT on the landed engine, LOST with line 168 reverted | FP0 docs engine KEPT 8/8; pre-cure docs engine LOST (all four dot holders); landed engine KEPT 8/8; FB5 the landed engine at the pre-cure text reads pass 10's `5b14c6c7…`, restored by sha256 | 9.77 |

Timings are not verdicts; no verdict above depends on one.

---

## §1 · Step 1: the battery (hashed before the kit was read)

Read before the hash: REGISTRY §P2-6.4, §P2-6.5, §P2-7, §P3-9 and the pass-12 part §P12-0..§P12-7; `RULINGS.md` through P11-R1; every earlier critic's battery (pass 12's in full); `pass-12/B-proto.md` §1, the extent sweep §P12-6.4 cites as "Bp12 §1's stated reading"; the CLI headers of `pass-12/B-kit`'s `rekey`, `browser-select`, `peer-closure` and `batteries-p12.sh` (to address their arguments; §P12-6.2 says K13's code is K12's).

| §P12-6.4 plant | this seat's rows | result |
|---|---|---|
| every committed `browser-seat/2` report, discovered, in every tally slot and in `rekey`'s base; F6 never 0; F7's ten rows 2; each pair a verdict and its F6 analogue RED; a base missing one base-origin spec 2 | `judges13.sh`: 18 reports discovered; KM × 5 slots, F6' with the LAST eligible key (judges12 flips the first), F7, PAIR, and **DELALL: every one of the 153 specs of the full re-keyed base deleted in turn, each against the full route with the reruns** | **`J13 SUMMARY pass=207 fail=0`**; ZERO PASS (no report other than `base-rekeyed.json` reads 0 in `--base`); DELALL **153/153** exit 2 (`R/judges13.txt`) |
| the same, pass 12's plants | `judges12.sh` by path (through `run12.sh`) | **233/0**; REKEY-EQ: this seat's re-key of `base.json` holds the committed `base-rekeyed.json`'s results byte for byte (`R/p12-regress/judges12.txt`) |
| `rekey` off the final digest; a base spec the chain does not land | `extent13.sh` RK-OFF-floorbase, RK-OFF-byte (one comment line on the unbuilt replayed tree, digest `550ef99d…`), RK-UNLANDED-added, RK-UNLANDED-renamed; control RK-CTL-U 0 (153 specs) | all 2 (the digest check `rekey.mjs:40`, the unlanded throw `:60`) |
| `browser-select --root` off the final digest; a frozen step with neither move list nor row | BS-OFF-floorbase, BS-OFF-byte; BS-STEP × {`{}`, `[]`, nulls, missing} on the first and last moves step (S2-pass-1, S74d) and the first and last row step (S1b, S70); BS-SEQ-nofile, BS-SEQ-unknownkind; controls BS-CTL, BS-CTL-U, BS-CTL-after 0, selection byte-identical before and after (155 specs) | all 2 |
| `peer-closure --base` missing a declared-free entry or one of its `broken` lists; `--floor-base` off S1's digest | PC-DEL-entry × 2, PC-DEL-broken × 6, PC-STR-broken × 6 (a string for a list), PC-NULL-broken × 2, PC-EMPTY-entries; PC-FB-OFF-final, PC-FB-OFF-byte, PC-FB-with-base; controls PC-CTL 0, PC-FB-CTL a verdict (1, the base's P7-G5 RED) | all 2 |
| (this seat) `SEQUENCE.json` absent, every judge that reads it | SEQ-missing-{rekey, select, peer-fb, tally} 2; SEQ-missing-peer (no `--floor-base`) **0** | 4 PASS, 1 FAIL against this seat's own expectation: §3 F-1 |
| P12-G1's premise against the route's listing | `phase1-13.sh` PREMISE | §2 |
| regressions | `run12.sh` (c6fdf555…) by path with the four-argument tree signature; through it `run11.sh`, `run10.sh`, `run-battery.sh` (pass 9), p10-post, f7 | §4 |
| the route's batteries | `K/tools/batteries-p13.sh`, four arguments (INFO) | §4 |

`extent13.sh`: **`E13 SUMMARY pass=54 fail=1`**, every tree digest unchanged after (T and U `6fdd4ec7…`, FB `6773b4ec…`), every planted kit file restored by sha256 (`R/extent13.txt`, load 14.91 → 14.29).

---

## §2 · P12-G1: the base-program premise

| measurement | this seat | the route (`K/results/p13/floor-premise.txt`) |
|---|---|---|
| paths the nine floor rows touch | **88** distinct (`git status` of the worktree after `apply.mjs`, against before; `R/premise-touched-paths.txt`) | 100 summed per row; **88 distinct** (several rows touch the same file, e.g. `vite.style-fold.ts` in f3, f4 and later rows); the two distinct sets are **identical** (diff 0) |
| under `tests-visual/` | **0** | 0 |
| base program: `git ls-tree` at `baseSha` `16e907cb`, `*.spec.ts`, `_` captures out | **153** | — |
| base program: the floor base's own `tests-visual/**/*.spec.ts`, captures out | **153**, EQUAL to ls-tree | 153 |
| the kit's `lib/follow.mjs` `baseProgram()` | **153**, EQUAL to ls-tree | 153 |

The premise holds on this seat's measurement. The route's "100 paths" is a per-row sum, not a distinct count; the table in Bp13 §2 labels it "paths touched" with a "total", which a reader can take as distinct. INFO (§3 I-2).

---

## §3 · Findings

| # | finding | measurement | item it maps to, and the text that decides | effect |
|---|---|---|---|---|
| F-1 | `peer-closure` without `--floor-base` reads no `SEQUENCE.json`: with the file deleted, `--root <replayed tree> --base <kit base>` exits **0** GREEN. Bp12 §1's last-but-one row lists `peer-closure` among the judges that throw ENOENT on an absent `SEQUENCE.json`, without the mode qualifier | `R/extent13.txt` SEQ-missing-peer rc=0; with `--floor-base`, SEQ-missing-peer-fb rc=2; `K/tools/peer-closure.mjs:87-90` calls `readSeq()` only under `--floor-base` | **S-14.** Its own text: "a silent return on a missing file and a swallowed load". The probe's non-floor verdict reads the tree, the table, `--base` and `authored/p6-publish.mjs`; it reads nothing of the chain, so no load is swallowed and no return depends on the absent file. The hold column's "an absent or degenerate `SEQUENCE.json`" is scoped by "on every input argument": where the probe takes the file (`--floor-base`) it exits 2. The defect is in this seat's expectation, copied from a table row that over-states one judge's inputs | none (INFO). Bp12 §1's row is a pass-12 record; the convergence record can carry the qualifier ("`peer-closure`: under `--floor-base`") |
| I-2 | Bp13 §2's "100 paths touched" is a per-row sum; the distinct set is 88 | §2 | none: S-12/S-14 need the count under `tests-visual`, 0 either way | none (INFO) |
| I-3 | an off-chain tree under the non-floor probe: `peer-closure --root <floor base> --base <kit base>` | exit 2 (the floor base has no `src/README.md` table; `R/xpeer-wrongtree.txt`, post-hash, light, load 16.11) | none: Bp12 §1 states no tree-digest check for the non-floor mode; the one off-chain tree tried does not read GREEN | none (INFO) |
| I-4 | the route's runner leaves 30+ result files rewritten in the kit it runs from (it writes into `K/results/p13/`) | `R/route-batt-INFO.txt` status block, in this seat's worktree only; verdict lines identical to the committed ones (§4) | none: a record-writing runner, run in a disposable worktree | none (INFO) |

No finding maps to an edict clause the list leaves out: F-1 is in S-14's clause (no masking fallbacks) and does not fail its text; I-2..I-4 map to no clause.

---

## §4 · Regressions

| battery | result | against | file |
|---|---|---|---|
| pass 12's `run12.sh` (`c6fdf555…`) by path | judges12 **233/0**; browser12 **7/0**; p11-post: F7 ten rows rc 2, "never-0 rows reading 0: 0" | the pass-12 critic's own run | `R/p12-regress/` |
| through it, pass 11's `run11.sh` (`317fd849…`) | judges11, floor-landed (8/0, KEPT on the replayed tree's engine), browser11 6/0, p10-post (plants10b `PD ROWS pass 6 fail 0`; fix10b; fd4) | the pass-12 critic's `results/p11-regress/`: the verdict lines (`SUMMARY`, `ROWS`, `TALLY`, `PASS`, `FAIL`, `THROWS`, `CAUGHT`, `CLEAN`), paths and loads normalized, **identical in 22 of 23 files**; the 23rd (`tree-probes.txt`) differs only in absolute paths and temp-dir suffixes inside four error texts | `R/p12-regress/p11-regress/` |
| through that, pass 10's and pass 9's | judges10 **145/0**; migration10 5/5 and browser10 5/1 as recorded; **regress 402 rows: 402 same, 0 differ**; p8-plants 11 same; judge-throws **55/0**; **crash8 39/39**; PR rows (peer-less, whitespace Peer, no subpath) THROWS 6/6 | the same, identical | `…/p10-regress/`, `…/p9-regress/` |
| P10-R1 floor plants | phase 1 FP0 / FB5 / FP (§0) | — | `R/phase1.txt` |
| the route's `batteries-p13.sh`, four arguments (INFO) | plants-p12 148/0, p11 115/1, p10 105/0, p9 43/0, p8 27/0, p7 17/0, p6 20/0 (each verdict line equal to the committed one); f7 10 rows rc 2; floor KEPT; floor-lost LOST (rc 1, lost 2, tree restored `5b14c6c7…`); critic12 judges12 233/0, browser12 7/0 | `K/results/p13/` at HEAD | `R/route-batt-INFO.txt` |
| W-D.1 §0 | `R/wd1-measure.txt` equal to the route's but for its trailing rc label; VALUE-SCC 0 | `K/results/p13/wd1-measure.txt` | — |

The frozen kit, measured here: `diff -r -x results` of `pass-12/B-kit` and `pass-13/B-kit`, run scripts, `floor-premise.mjs` and `RESULTS-PATHS-p1*.txt` excluded, is 16 lines in 6 files (`critic9-extra.sh`, `plants-p{7,8,9,10}.mjs`, `repointed/pass-10-fix10.sh`), each a `p12` → `p13` pair: with that token normalized, 0 lines are unpaired, and 0 added lines lack `p13`. `lib/`, `gate/`, `frozen/`, `authored/`, `derive/`, `LAW.md`, the root scripts and the four judges: no diff. Committed browser reports: `base.json`, `route.json` and the route reruns byte-identical to pass 12's and pass 8's; `diff -rq` against pass 12's browser dir lists `base-rekeyed.json` (its `rekeyedFrom.report` path; its results equal this seat's re-key, REKEY-EQ) and the run-named files only.

---

## §5 · The browser verdict, re-derived

From the committed reports in `K/results/p13/browser/`: six base runs (the full re-keyed base, three P7-R2 reruns, the p10 and p11 pairs' bases) and six route runs.

| count | kit tally (via BW1) | `tally12.mjs` (BW2) | `tally13.mjs` (post-hash) |
|---|---:|---:|---:|
| base keys / route keys | 866 / 867 | — | 866 / 867 |
| base-green | 428 | 428 | **428** |
| held | 428 | 428 | **428** |
| failed / absent | 0 / 0 | 0 / 0 | **0 / 0** |
| unbased | 0 | — | **0** |
| flaky (out of the bar) | 1 | 1 | 1 (`blob-config-delta.spec.ts` D2) |
| accounted (held + failed + absent = base-green) | yes | yes | yes |
| verdict | GREEN | GREEN | GREEN |

Every base-green key is accounted for. The two route specs with no base origin (`chip-accent-band.visual.ts`, `w1-radius-redress-inputs.spec.ts`) exist neither on the floor base at that path nor in the raw base report (BW7 PASS); the base titles that `w1-radius-redress-inputs` carries read `unexpected` or `skipped` in the base's `w1-radius-redress.spec.ts`, so no base-green key leaves the bar through them. The selection re-derived on the replayed tree: 604 moves, 723 changed, 155 specs, 14 captures excluded, equal to the committed `specs.txt` (BW6, BS-CTL). No browser runs are owed (§P12-6.2 step 2): no file of either tree changed.

---

## §6 · The 27 items

| item | verdict | closing measurement (this seat's, committed under `pass-13/critique-B/`) |
|---|---|---|
| S-01 | CLOSED | kit and `B-proto.md` committed at `6a80458ca` (15:30:59Z), before the hash (15:36:03Z); K13 = K12 in code (§4: 16 path lines, 0 unpaired) |
| S-02 | CLOSED | B8 0, B9 0 (`R/seal-wt.txt`) |
| S-03 | CLOSED | the rulings on their arms as landed: P9-R1 (PD 6/0; VALUE-SCC 0), P9-R2 (`## 11.0.0`, fix10b), P10-R1 (FP0/FB5/FP), P11-R1 (DELALL 153/153, judges12 233/0); datum 2,920,386 `equal: true` |
| S-04 | CLOSED | gate 19/19 at 0; FB1/FB2 the floor base is S1's |
| S-05 | CLOSED | B4 0 and the gate's stop on every crash row (crash8 39/39) |
| S-06 | CLOSED | regress 402 rows 0 differ (the I6 self-name rows among them) |
| S-07 | CLOSED | B0 `f1 0, walks 0, computed 0` |
| S-08 | CLOSED | floor plant KEPT on the docs and landed engines, LOST on the pre-cure engine; FB5 |
| S-09 | CLOSED | `6fdd4ec7…` replayed from committed bytes in a fresh worktree, rerun 0.4 s no-op |
| S-10 | CLOSED | cascade verify against this seat's floor-base snapshot: listed 0, empty listing RED; baseline identical |
| S-11 | CLOSED | vitest 2,335 passed, 0 failed; `seal.test.ts` 26/26 |
| S-12 | CLOSED | §5: 428/428/0/0, 0 unbased, three readers; capture exclusion printed (14) |
| S-13 | CLOSED | every earlier battery runnable on the pass-13 tree, verdict lines identical (§4) |
| S-14 | CLOSED | B17 0; judges13 207/0 and judges12 233/0 (every report in every slot, F6 never 0, F7 2, DELALL 153/153); extent13's rekey, select and peer rows 2 on every off-extent input; judge-throws 55/0; crash8 39/39; the extent premise measured (§2). F-1 judged against S-14's text (§3): not a fallback |
| B-01 | CLOSED | every clause 0, B2 0; p7 plants 17/0 (I7) |
| B-02 | CLOSED | B8 0, B9 0, multi-door symbols 0 |
| B-03..B-06 | CLOSED | regress 402 rows 0 differ; the route's p6-p12 plant sets' verdict lines equal to the committed |
| B-07 | CLOSED | B15 0 |
| B-08, B-09 | CLOSED | cascade GREEN (the style channel and `accent-tone.css` placement carried by the frozen chain, digest equal) |
| B-10 | CLOSED | B18 0; PR rows THROWS 6/6; `./motion-core` keyframes-free on all three arms; PC rows 2 |
| B-11 | CLOSED | the seal reads one pin (`pin 142/122/1,320/2`); regressions identical |
| B-12, B-13 | CLOSED | answered records, unchanged (frozen kit, no diff) |

**27 closed, 0 open, 0 re-opened.**

---

## §7 · This seat's own defects

1. **F-1's expectation** (`extent13.sh` SEQ-missing-peer) was written from Bp12 §1's table row without checking which mode of the probe reads the chain. The row is kept as hashed; §3 judges it.
2. **A fence slip.** At 15:38Z one shell command ended with `ls ~/.claude/guard/ | head -0`, a directory listing of the guard dir; `head -0` errored and nothing was printed. No file was read and no number rests on it.
3. **A shell slip.** The first light launch put the guard and its flags in one variable; zsh did not split it, the three steps exited 127 before the guard started, and nothing ran (`R/queue.txt` says so). Relaunched under `bash -c` at once.
4. **A stray redirect.** One read-only comparison redirected into `/tmp/x`, which is an existing directory of someone else's; the redirect failed and the following `rm -f /tmp/x` failed on the directory. Nothing was written or removed there.
5. `R/premise-touched-paths.txt` and `R/xpeer-wrongtree.txt` were written after the hash (a reduction of a hashed output, and an INFO probe); neither carries a scored expectation.
