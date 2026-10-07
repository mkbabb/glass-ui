# D1-B pass 5 · critique

Seat: fresh adversarial critic, model claude-opus-5-5, asserted from the seat's own identity. It authored nothing in passes 2-5. Checklist: REGISTRY §P3-9 text with the §P4-9 status, 27 items, frozen. Bar: §P3-8.4 and §P4-8.4. Rulings: `RULINGS.md` R-1..R-10 as amended, X-10, P3-R1..P3-R9, and P4-R1..P4-R5. Every number comes from a command this seat ran, and the outputs are in `critique-B/results/RESULTS.md`.

**Verdict: ADVANCE, not converged.** 22 of 27 items are closed (81.5%). Five are open: S-14, B-01, B-10, and two that I re-opened, **S-10** and **B-07**. Because I re-opened items, the two-clean-passes count restarts at 0 (§P4-8.5). The replay is exact: digest `4678be8f…` over 1,564 files. The browser bar is met, with 0 new failures over 68 bands.

## 1 · Order of work

1. I read REGISTRY §P2-6.4, §P2-6.5, §P4-8, §P4-9 (and §P3-8.4, §P3-9 for the item text) and `RULINGS.md`. I then wrote the battery under `critique-B/battery/` and hashed it before opening `pass-5/B-kit/` or `B-proto.md`: `BATTERY-HASH.txt`, `d5b13d5c…`.
2. One amendment followed the hash, before any verdict on the probe it touches. `pw-program.mjs` passed a relative config path from the wrong directory, and every file read as MISSING. The amended hash is `84686d2f…`, and no other file changed.
3. Plants that needed knowledge of `fallbacks.mjs` went into `critique-B/tools/extra-plants.mjs`, after the hash and outside it, as in pass 4. So did the FD-4 coverage probe, `tools/fd4-cover-probe.mjs`.
4. I replayed from committed bytes. A pristine HEAD worktree supplied the kit and floor, and a second fresh HEAD worktree took the replay. A third worktree took the floor rows alone, as the cascade and browser base.

## 2 · Replay: the digest is confirmed

- From the base `35f7b831…`, the chain reaches **`4678be8f16e559ad4a5af028a3bb39b01b0b331314b0a43485cb519eee9801ac` over 1,564 files, MATCH**. Every step's digest equals the chain's.
- A rerun prints "the chain is applied" (18.8 s).
- The floor-only cut reads `025409f8…`, the chain's S1 digest.
- Disclosed: `--twice` ran for S1..S2b only. At load 519, after 2 h 15 min with 7 of 103 steps done, I stopped the driver process. The in-flight S3 engine finished on its own, and the run resumed after S3 without `--twice`, in 8,270 s.

The gate on the replayed tree reads `FAIL B2 61` with the other 17 clauses at 0, which equals B-proto.

## 3 · Checklist

| item | verdict | measurement (this seat) |
|---|---|---|
| S-01 | CLOSED | kit committed at `b100cc80`; replay from committed bytes MATCH |
| S-02 | CLOSED | B8 0, B9 0; P4-K-REEX caught (B4, B8, B9, B11) |
| S-03 | CLOSED | P3-R3: SLOT13-dock and P4-SLOT-13/501 caught (B6). P4-R5: `dock/__tests__` holds 12 after the split, reported 17 → 12 (see §5.3). P3-R5: 69 keys, `./aurora-config` present. P3-R6: `isTeleportedTarget.ts` in `dock/composables/`. P4-R3: verify:package CLEAN at 2,959,588 = datum. P4-R4: `./styles/theme` → `dist/styles/theme/index.css`, no file at the old name |
| S-04..S-08 | CLOSED | build 0, demo build 0, both `vue-tsc` 0; P4-SELF and P4-WALK caught (B0); B2 deep-path plants caught (B0) |
| S-09 | CLOSED | MATCH, rerun a no-op, gate pure (GATE-PURE), every battery run RESTORED with the digest unchanged |
| **S-10** | **OPEN (re-opened)** | Under P5-F3 the route's tree behaves as listed: a listing of one rung plus an unlisted reorder reads RED with 4 UNLISTED rules, and the listed risky pair alone reads RED. **But FD-4 cannot judge the migrated tree.** (a) Against my own floor base (byte-equal to the committed snapshots) the verifier reads `./styles` and `./styles.css` **RED: content changed**. With scope ids erased, both are the same rule multiset (17 → 0). The 10 Timeline rules cannot be listed, so no listing can make this migration GREEN. (b) FD-4's coverage arm cannot count a carved spec as evidence. `coverRisks` reads `tests-visual/<basename>` and swallows the miss as `""` (cascade.mjs:219), and it matches results by basename against band paths. `fd4-cover-probe.mjs`: the carved chip readback spec (which names `--accent-band-strength`, `glass-chip` and `accent-tone`) gives covered=false. The same text at the pre-carve path gives covered=true. FP4-3's cure ("the readback spec lands in chip's unit so FD-4 evidence is in the tree") is therefore unreachable |
| S-11 | CLOSED | vitest 262 files, 2,333 tests: 2,331 passed, 1 failed (seal B2, an open item's clause), 1 pending. The route's own run under load lost 9 files and had 5 timeouts |
| S-12 | CLOSED | Full graph selection (the committed 154 specs) on both trees. Floor 864 tests: 428 passed, 392 failed, 44 skipped. Migrated 866 tests: 429 / 393 / 44, verdict GREEN, **0 new failures**, 68 bands with base-green counts (24 with no browser signal, named). The chip readback spec passes on the migrated tree |
| S-13 | CLOSED | not re-run; nothing in pass 5 touches G |
| **S-14** | **OPEN** | 120 of 140 shape plants caught by B17, and the literal-path forms of every named shape are caught. **Missed:** a loader bound to a name and called with an argument. On a parameter target this is caught only incidentally (B0, computed import), in all 5 zones; on a literal target it is MISSED outright in demo, tests, tests-visual and scripts (X5-LOADER-ARG). A read through the tree's own reader, `try { return tree.read(p) } catch { return "" }`, is MISSED (X5-TREEREAD). That shape is **live** at `scripts/structure/cascade.mjs:219` and `lib/graph/graph.mjs:37` (also `lib/recipes.mjs:58`). Also live and unseen: `vite.style-fold.ts:412` folds the SFC bundle only `if (existsSync(…))`, with no else, and `vite.utility-emit.ts:94` scans it only if present. `readFile(p).catch(() => "")` is missed in every zone (plant only; no live instance found) |
| **B-01** | **OPEN** | B2 = 61, unchanged from B-proto. The other 17 clauses are 0, and the census finds 0 dirs over 12 and 0 zone files over 500 lines |
| B-02 | CLOSED | P4-K-REEX, P4-D-DUAL caught (B9, B11) |
| B-03 | CLOSED | P4-SELF caught (B0) |
| B-04 | CLOSED | P4-T-OUT, P4-T-WRONG caught (B16); P4-T-OWN-L clean |
| B-05 | CLOSED | P4x-X-SCR caught (B10) |
| B-06 | CLOSED | B13 0, not re-opened |
| **B-07** | **OPEN (re-opened)** | The §P4-8.4 plant "a split file's new module given a placeholder name" is missed. `dock/part-1.ts`, `dock/GlassDock-2.ts`, `dock/GlassDock2.ts`, `dock/GlassDockPart2.ts`, `dock/bs11.ts` and `dock/GlassDockSplit.ts` pass B15. `-N`, `part-N` and wave ids are in B15's directory pattern, not its file pattern. And **B15 judges no test file** (`isTest(f) → continue`): `tests/styles/part-2.test.ts` passes, and the carve kept `tests-visual/storybook/configurator/suffuse2.spec.ts` (beside `suffuse.spec.ts`) and `motion/motion2.spec.ts`, which are live on the tree. LAW §11 says B15 judges "the directories and file stems of all five zones", and the item reads "file names are judged". The gate and its law disagree, and the tree holds an instance |
| B-08 | CLOSED | `src/styles/glass/accent-tone.css` at its HEAD rung (after ladder-undershadow, before rim). The chip readback spec passes on the migrated tree. The chip band has 22 base-green tests and 0 new failures. The accent-tone reorder plant reads RED under a listing that names it |
| B-09 | CLOSED | P4-G-RULE, P4-TH-RULE caught (B14) |
| **B-10** | **OPEN** | B-S14 is not run (B2 61). B-S11, B-S12 and the B-S16 bounds and program are done: B6 0, B0 0, `playwright --list` holds all 169 Playwright test files on the tree. But the gate does not guard the program. A Playwright file outside `testMatch` (`tests-visual/zqCarveOrphan.ts`) is MISSED, and the split-name gap is under B-07 |
| B-11 | CLOSED | `--pin` and `--no-pin` refused; 0 off-switch lines |
| B-12 | CLOSED | door plants regress: K-INT, K-INT-T, N-INT (B1); T-CYC, T-CYC-N, V-CYC (B4); K-DOOR-L clean |
| B-13 | CLOSED | not re-opened |

**Count: 27 items, 22 closed, 5 open.** Convergence 22/27 = 0.815.

- Of the route's claimed closures: S-14 is refuted again, with new live counterexamples. B-S11 and B-S12 are confirmed. P4-G10 (the digit suffix) is confirmed for non-test files only.
- **Re-opened by this seat: S-10 and B-07.**

### Why S-10 and B-07 re-open

- **S-10 ("FD-3, FD-4 and FD-5 on the floor").**
  - This seat measured FD-4 on the migration it judges. The verifier has no reading of an SFC style move, so a value-identical migration reads RED and cannot be listed.
  - After the carve, FD-4's coverage arm can no longer see the one spec that was placed to be its evidence.
  - A masking fallback hides the second fault: a missing spec text reads as `""`, so the coverage lookup fails without any message.
  - Both faults are FD-4's, and both show only on this tree.
- **B-07.**
  - The item's text is "file names are judged", and §P4-8.4 plants a split module named as a placeholder.
  - The gate passes `part-1.ts`, `GlassDock-2.ts` and every test stem. `part-1` is the bar's own example of a forbidden name (§6.4 "Structure").

## 4 · The §P4-8.4 bar

| bar | result |
|---|---|
| all 18 clauses GREEN, wired into `npm test` with no off switch | **no**: B2 61 (B-01). The wiring holds: `tests/gates/seal.test.ts` fails on B2 alone, and there is no off switch |
| `verify:package` GREEN against a ruled datum row | GREEN against S59's datum 2,959,588. **The route row is not ruled.** P4-R3 held it until P4-G9 was explained; the route explained it and rebound the datum itself. The ruling is owed (not an item) |
| full graph-selected browser run, per-band base-green, 0 new failures | **yes** (S-12 row) |
| plants: every S-14 shape, literal and parameter, in each zone | run, 140 + controls; misses under S-14 |
| a split file's new module given a placeholder name | run; **missed** (B-07) |
| a carved visual spec that leaves the Playwright program | run; the orphan is **missed** by the gate; the tree itself has none (169/169) |
| a directory over 12 after the splits | run; caught in all 5 zones, the dock root and `dock/__tests__` (B6) |
| a B2 reach re-pointed to a private | run; caught in 4 zones × 6 forms (B2); deep paths caught by B0 |
| a reorder outside the listed rung | run; RED, 4 UNLISTED (P5-F3 holds) |
| pass 4's door plants as regressions | all caught |

## 5 · Outside the checklist

These are logged for the next registry. Where a finding maps to an item, that is stated.

1. **FD-4's coverage arm is unreachable after the carve** (§3 S-10). This maps to S-10, which I re-opened. The cure is at cause: key results and bands by the spec's path relative to the config's `testDir`, read the spec at that path, and let a missing spec fail the verdict loud.
2. **Masking fallbacks outside S-14's two forms.** These are live on the tree and B17 does not see them:
   - `armAsync().catch(() => undefined)` in the aurora, blob and fourier-field renderers;
   - roughly 90 `page.goto/waitForSelector/click(…).catch(() => {})` sites in tests-visual.

   Neither is a missing file or a module load, so they fall outside S-14's text. They do fall under the edict's "no masking fallbacks", which S-14 carries. This maps to S-14, already open, so it adds no re-opening.
3. **B16 cannot place a page-driving visual spec.** A legal `chip/__tests__/*.visual.ts` that imports no sealed file is flagged "its subject's home is the harness" (VIS-in-L). B16 also skips the tests-visual zone, so a single-unit visual spec left in `tests-visual/` is never judged. Only 2 of 169 Playwright files sit in a unit slot. The aurora specs that dynamically import aurora privates (8 of the B2 lines) stay in `tests-visual/aurora/`. This maps to B-10 (B-S16, "each unit's visual spec into its unit's `__tests__/`"), which is already open.
4. **`dock/__tests__` reached 12 by merging 8 test files into 3** (S56) after the split left 17. P4-R5 ruled "(b) defer … if still over 12, the route reports it and the driver rules then", and listed merged test files as arm (a), which was not chosen. The route reports both numbers, so S-03's text is met. The merge still needs the driver's ruling.
5. **The datum row is self-rebound** (§4). P4-R3 held the route row. The ruling is owed.
6. **LAW.md is stale.**
   - Its header still says "pass 4".
   - §10 still declares the ternary, `.then(ok, h)` and the named loader "not seen", although the pass-5 gate reads them.
   - §11 says B15 judges all five zones' file stems, but the gate skips test files.

   A literal reading of the law no longer gives the gate's verdict. This maps to B-07 and S-14.
7. **`vite.style-fold.ts` is 588 lines.** It is a root config, outside R-5's five zones, and was over 500 at HEAD. The edict reads "long running dirs … the same for backend files". No item covers root configs, and R-5 rules the zones. Logged; it does not re-open.
8. **The 38 shipped CSS doors are one-line `@import` files in dist** (`dist/components/<unit>/index.css`). They are LAW §5 doors, not forwarders at a moved entry's old name, so P4-R4 holds. They are noted because the edict's "no shims" reading of a pure forwarding file applies to them in form. The doors decision (§P3-4, B-12) covers them.
9. **Battery defects, disclosed:**
   - the pw-program config path (amendment 1);
   - 6 S-14 controls whose parameter read is a B0 computed read (FALSE+ by design of the route's B0, not a gate defect);
   - the runner's strict mark match printed six pass-4 regressions as UNNAMED, and a solo re-run shows each gained line naming the planted files;
   - the selection did not re-derive from the committed `changed` list alone, so both browser arms ran the committed 154-spec selection.

## 6 · What closes the open items

- **S-14.** B17 reads a named loader called with arguments; a swallowed read through any reader the tree defines (`tree.read`, `T.read`), or its rule states which readers count and the tree uses only those; the promise form `readFile(…).catch(h)`. The live sites at `cascade.mjs:219`, `graph.mjs:37`, `recipes.mjs:58` and `vite.style-fold.ts:412` are cured at cause.
- **S-10.** FD-4 reads an SFC style move (scope-id renumbering) as a move, so the Timeline split can be listed. Its coverage arm keys and reads carved specs by path, and a missing spec fails loud.
- **B-07.** B15's file pattern takes the provenance forms of its directory pattern (`-N`, `part-N`, wave ids, an eponym plus a digit), and B15 judges test stems. `suffuse2.spec.ts` and `motion2.spec.ts` are renamed by concept.
- **B-01 / B-10.** B-S14 per P4-R1/P4-R2 (B2 61 → 0, the dispositions in B-proto §4 ruled where owed). The gate guards Playwright-program membership. The unit visual specs go to their slots, or a law states how a page-driving spec's subject is read.

## 7 · Files

- `critique-B/battery/` (hashed): `ITEMS.md`, `plants.mjs`, `probes.mjs`, `pw-program.mjs` (amendment 1), `regress.mjs`, `reorder.mjs`, `run-plants.mjs`, `tree-probes.sh`.
- `critique-B/BATTERY-HASH.txt`.
- `critique-B/tools/`: `adapter.mjs`, `extra-plants.mjs`, `fd4-cover-probe.mjs`.
- `critique-B/results/RESULTS.md`.

To re-run on a replayed tree `W` (with `node_modules` linked):

```sh
B=critique-B/battery; T=critique-B/tools
node $B/run-plants.mjs --root W --adapter $T/adapter.mjs --set $B/plants.mjs --group     # DIR13*/SLOT13* with --only, no --group
node $B/run-plants.mjs --root W --adapter $T/adapter.mjs --set $B/regress.mjs --group
node $B/run-plants.mjs --root W --adapter $T/adapter.mjs --set $T/extra-plants.mjs --group
node $B/probes.mjs --root W ; node $T/fd4-cover-probe.mjs --root W
SEAL="node W/scripts/structure/seal/seal.mjs --root W" … bash $B/tree-probes.sh W
```
