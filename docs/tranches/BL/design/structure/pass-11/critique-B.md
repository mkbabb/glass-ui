# D1 · pass 11 · critique-B: sealed modules, flat

| field | value |
|---|---|
| seat | fresh adversarial critic for D1-B, pass 11. Authored nothing in passes 2-11, the pass-6..10 critiques included |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the kit, the floor row (`floor/lib/move.mjs`, `floor/FLOOR.md`) and `B-proto.md` were committed at `8af2de6f` (09:23:47Z), before this seat's battery hash (09:30:08Z). One commit followed during the run, `78dd4981` (D5 records). `git diff 8af2de6f HEAD -- docs/tranches/BL/design/structure` and `-- . ':!docs'` are both empty |
| battery | written and hashed before reading `pass-11/B-kit/`, `pass-11/B-proto.md` or `pass-11/plants/`: `317fd849…2c023bdd` (`critique-B/BATTERY-HASH.txt`, 7 files). Earlier batteries were run by path and re-hashed to their own records: pass 10 `7b7b5303…`, pass 9 `748826fb…` |
| worktree | `.claude/worktrees/bl/D1/p11/crit-B/wt` from HEAD with `node_modules` symlinked. Cut three times: run 1 of phase 1 died on this seat's defect (§7), the second cut carried phase 1, the toolchain and the battery, and the third (fresh, pre-S1) carried the docs-engine floor plant. Removed with `git worktree remove --force`; `crit-B/` removed |
| fences | no source edit; no git write beyond worktree add/remove. Writes: this file and `pass-11/critique-B/{battery,tools,results}/`, `BATTERY-HASH.txt` |
| guard | phase 1 heavy (run 1 admitted at once and died at 09:35Z on the battery defect; run 2 09:37→09:50Z). Toolchain + battery: one heavy run, queued 09:50:44Z, admitted 10:04:32Z (14 min, under the 30-min rule), done 10:23:37Z. `tools/f7.sh` and `tools/floor-docs.sh` ran `--light`. No 13M refusal. No browser was launched. Nothing is left running |

Short citations: `R/` is `pass-11/critique-B/results/`, `K/` is `pass-11/B-kit/`, `Bp11` is `pass-11/B-proto.md`. Loads are `sysctl vm.loadavg` (1/5/15 min).

---

## §0 · Verdict

**26/27 CLOSED. S-14 stays OPEN.** It entered pass 11 open. The route claims it closed (Bp11 §9), and this seat's measurement does not close it. No item that entered closed is re-opened. The pass is **not clean**, so the two-clean-passes count stays at 0.

The reason, in one paragraph. §P10-6.4's battery list names the kinds one by one: "every committed report kind in every slot: the base run, a re-keyed base, a route run, **a base rerun (raw and re-keyed)**, a route rerun …; each wrong one exits 2". It also requires "F6 … read through every wrong-kind `--base` … path, never 0". S-14's hold (§P10-7) ends with "no judge reads a malformed input as an all-clear". The cured `browser-tally` treats a full run and a rerun of one kind as one kind; LAW §14 (pass 11) says "the caller names which is which by the slot". So a committed re-keyed base **rerun**, or a touched-spec pair's re-keyed base, passed as `--base` is accepted. It then reads **GREEN, exit 0, over F6's failing route**, because the tally judges only the 8 (or 3, or 33) keys that partial report holds (`R/f7.txt`: 10 of 10 such paths read 0; the control with the full re-keyed base reads RED). This is pass 10's O-1 (the wrong report in `--base` masks a failing route) through a kind the plan enumerated and the route accepted. The route planted the case and read it as accepted ("each kind it takes reads a verdict", Bp11 §6 KIND). Every other part of S-14 is met: the kind discriminant on `rekeyedFrom`, every flag form, duplicates, trees, and pass 10's seven failing rows.

| bar (§P10-6.4) | this seat's measurement | load |
|---|---|---|
| floor row (P10-R1 (a)) | the committed docs engine and the engine S1 lands are byte-equal (`ee305d6f…`). Against `16e907cb3` the docs engine differs in line 168 only. **This seat's floor plant** (`battery/floor11.mjs`, 7 shapes): on a pre-S1 HEAD tree the docs engine KEEPs every `./`-lead shape (`"./dist/index.d.ts"` read, exists, object literal, `?raw` query); with line 168 put back to `16e907cb3`'s text it LOSES all four (three are respelled to `dist/…` with the move exit 0, one is refused with 1 edge lost), so the plant discriminates; on the floor base the landed engine KEEPs; on the replayed tree the chain's own engine KEEPs. The no-lead and `../`-lead controls are kept by every engine (`R/floor-plant-docs-preS1.txt`, `R/floor-plant-landed.txt`, `R/floor-landed.txt`) | 20-28; 36 → 84 at floor-landed |
| floor base re-cut | S1's own script → **`6773b4ec1217ab41…532f2cadb`** over 1,354 files = S1's recorded digest (FB1); it differs from pass 10's `5b14c6c7…` (FB2); with the landed line put back to the pre-cure text the digest reads **exactly `5b14c6c7ce4e36f0…705402f`** (FB5): the re-cut is that one line (`R/phase1.txt`) | 27.5 |
| replay from committed bytes | HEAD code digest `35f7b831…` = the chain's base; 126 steps, no S74c id; `K/replay.mjs` S1b→S70 **474 s, `chain final MATCH`, `6fdd4ec7bd259630d38a466a444e45b2b18f71b4cbf2259d258a4c6177996bbf` over 1,587 files**; rerun 0.7 s, "the chain is applied". The digest was unchanged after every battery family (`R/digest-after.txt`) | 24.4 → 43.0 (replay); 15-84 (battery) |
| floor-base records | four cascade `.seq` identical to `K/results/p11/cascade/baseline`; the base peer report equals `K/results/p11/peer-closure-base.json` (root aside); floor-base `MIGRATION.md` = HEAD's | 24.2 |
| gate | **19/19 at 0** (`PASS B0..B18 0`), exit 0; files 1,585, edges 8,350, modules 142/142, pin 142/122/1,320/2, B10 anchored 39, peer held 23 (`R/seal-wt.txt`) | 19.1 |
| package | verify:package **CLEAN**; ratchet PRESENT, datum **2,920,386**, `equal: true`, `increase: false` | 23.8 → 22.4 |
| cascade | GREEN against this seat's floor-base snapshot with the kit's listing (exit 0); RED with an empty listing (exit 1) | 19.9 |
| toolchain | build 0; `vue-tsc` ×2 0; `demo:dist:build` 0; `seal.test.ts` **26/26**; vitest 275 files, **2,335 passed**, 10 expected-fail, 1 skipped, 0 failed (`--maxWorkers=2`, 86 s) (`R/toolchain.txt`) | 19.1 → 14.8 |
| `./motion-core` | keyframes-free on all three arms: names 55, dist 5 files, files 38, peers none; exit 0 against both base reports | 19.1 |
| browser | re-derived from committed reports by the cured kit tally and by this battery's own reader (`tally11.mjs`, with its own `rekeyedFrom` kind check): **428 base-green, 428 held, 0 failed, 0 absent, flaky 1**, both readers equal; the same with both touched-spec pairs added (BW5); selection re-derived: 155 specs, 14 captures excluded, new 0, left 0 (`R/browser11.txt`) | 36 → 15 |

---

## §1 · S-14: every kit judge, every input argument

`R/judges11.txt` (hashed `battery/judges11.sh`): **161 PASS, 4 FAIL, 14 INFO**. The 4 FAILs are this seat's control defects (§7). Pass 10's critic's `judges10.sh` by path: **145/0** (its own run, 138/7: the seven O-1/O-2 rows now pass, with every other verdict line identical, `R/p10-regress/judges10.txt`).

| family | planted | result |
|---|---|---|
| KIND, tally `--base` / `--route` / `--base-rerun` / `--route-rerun` | 16 kinds each (raw base, re-keyed base, route, raw base rerun, re-keyed base rerun, route rerun with `baseReport: null`, the p11 touched-spec pair's three, the probe's floor-base and clean reports, selection, moved, plan, a seal report, SEQUENCE.json) | every kind outside the hashed right/INFO set exits **2**. The INFO alternates: a re-keyed base **rerun** as `--base` **rc 0 GREEN over 8 keys**; the touched-spec re-keyed base as `--base` **rc 0 GREEN over 3 keys**; a route rerun or a touched-spec route as `--route` rc 1 (420 or 426 absent); the full re-keyed base as `--base-rerun` and the full route as `--route-rerun` rc 1 (the flaky key, no rerun to place it) |
| KIND, `rekey` base | 16 kinds | 14 PASS: every re-keyed or route kind exits **2**; the raw base 0; INFO: a raw base rerun 0, the touched-spec raw base 0 (both base runs) |
| KIND, peer `--base`, `--overlay`; select's SEQUENCE.json | 16 kinds each | **48/48** as expected (floor-base report 0, every other kind 2; every kind as overlay 2; every kind substituted for SEQUENCE.json 2, control 0) |
| F6 (one base-green key of the route flipped) | right base → 1 (with reruns 1); the failing route, the passing route, a route rerun, the raw base, the touched-spec route as `--base`; the failing route, the route, a route rerun, a failing route rerun, a raw base rerun as `--base-rerun`; the re-keyed base and a re-keyed base rerun as `--route-rerun`; `rekey` on the failing route, the route, a route rerun, a failing route rerun, the re-keyed base; duplicated `--route` / `--base` in both orders | **22/22**: none reads 0; every `rekey` path 2 |
| FLAG | every value-taking flag of every judge last on the line and followed by another flag (tally ×4, select ×2, peer ×5, plus `--base-rerun` beside a failing route) | **23/23 exit 2**; no file named `--base` written |
| FLX (other flags the sources name) | `--plan` bare: 0 (a switch, stated); `--floor-base` bare on the migrated tree: 2 (the TREE rule) | INFO, as LAW §14 states |
| DUP | `--route` twice; peer `--base` twice | both 2 (LAW §14: a single-valued option twice is a throw) |

**F7, the masking made concrete** (`tools/f7.sh`, post-hash, `--light`, load 14.5; `R/f7.txt`). F6's failing route (`expandable-container.visual.ts :: (a) inline renders real canvas …` flipped):

| `--base` | other inputs | exit | verdict |
|---|---|---:|---|
| the full re-keyed base | — | 1 | RED: 427 held + 2 failed |
| the full re-keyed base | every committed rerun | 1 | RED: 427 held + 1 failed |
| `reruns/base-1-{1,2,3}.rekeyed.json` (each) | none, or every committed rerun | **0** | **GREEN: 8 held + 0 failed** (6 rows) |
| `p10-steps/base.rekeyed.json` | none, or every rerun | **0** | **GREEN: 33 held** (2 rows) |
| `p11-steps/base.rekeyed.json` | none, or every rerun | **0** | **GREEN: 3 held** (2 rows) |

**Reading.** P10-G1 as §P10-6.3 specified it is landed. `rekeyedFrom` separates base from route in every slot, `rekey` refuses route runs and reruns, and every value-taking flag throws on a missing value (P10-G2 landed). But §P10-6.3's discriminant cannot tell a full base from a base rerun, and §P10-6.4 lists the base rerun as its own kind to be planted in every slot, with F6's never-0 required through every wrong-kind `--base` path. In the tally's own words, `--base` is "the base's full run", and the reruns go in `--base-rerun`. A partial base in that slot judges only its own keys and reads every unjudged key as nothing to hold, so a failing route reads GREEN. The cure stays inside the kit, with no digest change. One possible check: the `--base` report must hold a key for every spec the route's band table names, or, more strictly, for every key the route holds, apart from keys the protocol already states. Bp11 §10 G-4 (a forged `rekeyedFrom`) is a hand-written field, not a committed report; this seat does not count it.

---

## §2 · S-03, S-08, S-09: the rulings on the replayed tree

- **P10-R1 (a).** The floor row is one line (`ee305d6f…` docs = landed; FB4/FB5). The plant discriminates on both homes: pre-S1 docs engine KEPT / pre-cure LOST; landed engine on the floor base KEPT; the chain's engine on the replayed tree KEPT (`scripts/structure/lib/move.mjs:166` carries the cure). S74c has left the chain: SEQUENCE.json holds 126 steps and none is named S74c. The digest is `6fdd4ec7…`, the same as pass 10's, as Bp11 §3 explains: S74b now lands on the tree pass 10 reached after S74c. The datum is unchanged at 2,920,386, and only S70 writes it.
- **P9-R1 (a)** (`R/p10-post.txt`, pass 10's corrected `plants10b.mjs` by path): PD-val-1..3 B4 `value SCC at module grain … (parent<->child)`; PD-type-1..3 clean; **6/6**. Pass 10's hashed `plants10.mjs`: verdict lines identical to its own run (its 5 known FALSE+ PC-type rows).
- **P9-R2 (a)** (pass 10's `fix10b.sh` by path, W-C.2's appendices from the tree's committed wave): section 8..127; C2-G1 0 META hits in the section; MIGRATION.md 1,648 = HEAD 1,648; the four tranche-id plants 1 hit each; `(BL)` and "tranche" 0 (pass 10's O-3, W-C.2's grammar).
- **P8-R3** (pass 10's `plants10.mjs`): PR-* 6/6 THROWS, control CLEAN.

---

## §3 · S-12: the browser bar

`R/browser11.txt` (hashed): BW1-BW6 **6/6 PASS**. Kit tally and `tally11.mjs` over the committed pair and the six reruns: 428 / 428 / 0 / 0, flaky 1 (blob D2), `ACCOUNTED … : yes`. With pass 10's and pass 11's touched-spec pairs: the same. `browser-select` on the replayed tree: 604 moves, 723 changed, 155 specs, 14 captures excluded; `specs.txt` equals the kit's copy, which is byte-identical to pass 10's (as are `captures.txt`, `base.json`, `route.json`, the raw reruns and the route reruns). The four re-keyed reports differ in bytes from pass 10's copies, as Bp11 §8 says (they were re-derived through the cured `rekey`), and both readers read the same 428 from them. Pass 9's capture checks (`select-capture.sh`, `plants9.mjs` CAP-*) match pass 10's: 17 PASS, 1 SKIP. No browser ran in this seat. §P10-6.2 step 4 does not require a full run, and no `src` file moves.

---

## §4 · Regressions

| set | result |
|---|---|
| pass 10's critic battery (`run10.sh` by path) | judges10 145/0 (diff to its own run: only the seven O-1/O-2 rows, FAIL → PASS); plants10, migration10, browser10 verdict lines **identical** to its own run (their known defect rows, cured by its post-hash tools) |
| pass 9's battery through it | **402 rows, 0 differ**; p8 plants 11 same; judge-throws **52/0** (the new kit modules `lib/argv.mjs`, `digest.mjs`, `sequence.mjs` add rows, each 2); b18-inputs 5/1 and browser-plants 2 FAIL as before; plants9 17/0/1; crash8 **39/39**; tree-probes FAIL lines identical to pass 10's run |
| pass 10's post-hash corrections | plants10b 6/6; fix10b as §2; pass 6's fd4-probe re-pointed (one line, diff printed): A, G, G2, U, RESTORE **PASS** |
| P10-G4 census | the battery files that name a path S74d moved: `pass-6/…/fd4-probe.mjs:21` and `pass-3/…/probes.mjs:77,119`. This matches Bp11 §6's list (the pass-3 battery left the regression lists at pass 4; Bp11 G-5) |
| the route's own `tools/batteries.sh` | not re-run (it takes three trees, built, unbuilt and floor base; this seat's call gave two arguments and it stopped at `$4`). The route's committed results are its claim; this seat's regressions above carry the critics' batteries independently |

---

## §5 · Findings

| # | finding | item it maps to | effect on the score |
|---|---|---|---|
| O-1 | `browser-tally` accepts a re-keyed base **rerun**, or a touched-spec pair's re-keyed base, in `--base`, and reads a failing route **GREEN** (exit 0) over the 3-33 keys that partial base holds (`R/f7.txt`, 10/10 paths; `R/judges11.txt` KM-tally-base-rekeyed-base-rerun, KM-tally-base-steps-rekeyed-base) | **S-14**: §P10-7 hold "a wrong-schema or wrong-kind report in every slot … no judge reads a malformed input as an all-clear"; §P10-6.4 "every committed report kind in every slot: … a base rerun (raw and re-keyed) …; each wrong one exits 2" and "F6 … through every wrong-kind `--base` … path, never 0" | S-14 not closed. Kit-only cure, no digest change: `--base` must cover the route's program (a key, or at least a spec, for every spec the route's band table names), or the slot must otherwise refuse a partial base. A route rerun or partial route as `--route` reads RED (absent), never GREEN, so it is the lesser shape |
| O-2 | the route's `tools/batteries.sh` names three trees and a scratch dir; this is clear from its header but differs from pass 10's `run10.sh` shape | none | none (INFO) |

No finding maps to an edict clause that the list leaves out. The checklist stays at 27.

---

## §6 · The 27 items

| item | status | the measurement that holds it (all in `R/`, replayable) |
|---|---|---|
| S-01 | CLOSED | the kit, the floor row and the route's results were committed at `8af2de6f` (09:23:47Z), before this seat's hash (09:30:08Z); no structure change since |
| S-02 | CLOSED | B8 0, B9 0 (`seal-wt.txt`) |
| S-03 | CLOSED | P10-R1 (a): floor row planted LOST → KEPT on both homes, the floor base re-cut by S1's script (`6773b4ec…`, one line from `5b14c6c7…`), S74c out (126 steps), replay MATCH; P9-R1 PD 6/6; P9-R2 fix10b; P8-R3 PR 6/6; the datum rebound once, unchanged at 2,920,386 |
| S-04..S-08 | CLOSED | gate 19/19 at 0; the floor row planted (`floor-plant-docs-preS1.txt`, `floor-plant-landed.txt`, `floor-landed.txt`) |
| S-09 | CLOSED | `6fdd4ec7…` from committed bytes in a fresh HEAD worktree, MATCH; rerun 0.7 s no-op; unchanged after every family |
| S-10 | CLOSED | cascade GREEN listed (0), RED unlisted (1) against this seat's floor-base snapshot |
| S-11 | CLOSED | vitest 2,335 passed, 0 failed; `seal.test.ts` 26/26 |
| S-12 | CLOSED | 428 held + 0 failed + 0 absent through the cured tally and an independent reader, with and without both touched-spec pairs; captures stated, printed (14), read by B0 (CAP-*) |
| S-13 | CLOSED | 402 rows 0 differ; every earlier critic battery runs on the pass-11 tree with verdicts identical to its own run (the cured rows aside); the S74d-moved paths re-pointed by diff (fd4 PASS) |
| **S-14** | **OPEN** | B17 0; gate throws 39/39; judge-throws 52/0; KIND 3 tally slots × wrong kinds 2, rekey 14/14, probe/overlay/select 48/48; FLAG 23/23; F6 22/22; **a re-keyed base rerun or touched-spec base as `--base` reads a failing route GREEN (O-1, F7 10/10)** |
| B-01 | CLOSED | every clause 0, B2 0; I7 inside the 402 rows |
| B-02..B-06 | CLOSED | 402 rows 0 differ |
| B-07 | CLOSED | B15 0 |
| B-08, B-09 | CLOSED | gate 0; regressions |
| B-10 | CLOSED | B18 throws on a peer-less, whitespace-only and subpath-less row (PR 6/6); `./motion-core` keyframes-free on names, dist and files |
| B-11..B-13 | CLOSED | regressions unchanged |

**Count:** 27 items, **26 closed, 1 open (S-14)**, 0 re-opened. Convergence by §P2-6.5's formula: 26/27 = **96.3%**. The two-clean-passes count stays **0**.

---

## §7 · This seat's own defects (each re-run post-hash, expectation unchanged)

1. **`phase1-11.sh` run 1** died at line 33 under `set -u`. The string `$P10FB…` made bash read the `…` as part of the variable name. `tools/phase1-11b.sh` braces the variable (`${P10FB}…`) and points `HERE` at the battery; the diff is printed in this seat's log. It ran on a fresh worktree. Run 1's log is kept in `R/phase1-run1/`.
2. **The docs-engine floor plant** in phase 1 ran after S1, but S1's `fd11-land` moves the floor runtime out of `docs/`, so the module was not found (`R/floor-plant-docs.txt`, `-precure.txt`: SETUP-FAIL). FB3/FB4 compared against that missing path for the same reason. `tools/floor-docs.sh` runs the hashed `floor11.mjs` against the docs engine on a fresh pre-S1 HEAD tree, cured and pre-cure, as the plant's header states: KEPT 8/8, then LOST 4/4 with DISCRIMINATES PASS. One engine was checked by sha256: committed docs `move.mjs` = landed `move.mjs` (`ee305d6f…`), and the diff to `16e907cb3` is line 168.
3. **Four KIND/T control rows** (`T-ctl-min`, `KM-tally-base-rekeyed-base`, `KM-tally-route-route`, `KM-tally-route-rerun-route-rerun`) expected 0 from the full pair **without the base reruns**. Under P7-R2 that pair reads RED with the flaky blob D2 key (429 base-green, 1 failed). The kit is right and the expectation was wrong. `T-ctl` with every rerun reads 0, as do BW1/BW2.
4. **BW6** compared the selection with the kit's pass-11 `specs.txt` rather than pass 10's. The two are byte-identical (checked), so the reading stands.

None of these changes a hashed expectation for a judge under test. O-1 rests on hashed KIND rows. The hashed battery classified those rows INFO (right-kind alternates), and this seat discloses that classification. `tools/f7.sh` only makes the reading concrete against F6's failing route, which §P10-6.4 asks of every wrong-kind `--base` path.
