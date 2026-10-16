# D1 · pass 10 · critique-B: sealed modules, flat

| field | value |
|---|---|
| seat | fresh adversarial critic for D1-B, pass 10. Authored nothing in passes 2-10, the pass-6..9 critiques included |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the kit was committed at `aa46420a` (2026-10-16 02:44:48 -0400 = 06:44:48Z, 552 tracked files under `pass-10/`), before this seat's battery hash (06:52:45Z). The worktree was cut at `e7643fe6`: the five commits after `aa46420a` touch only O-95 records, `git diff aa46420a e7643fe6 -- docs/tranches/BL/design/structure` is empty, and `git diff 6154d6ec HEAD -- . ':!docs'` is empty (10.1.0's code) |
| battery | written and hashed before reading `pass-10/B-kit/` or `pass-10/B-proto.md`: `7b7b5303…d61499f6` (`critique-B/BATTERY-HASH.txt`: 10 files, plus 5 earlier critics' files run by path, hashes listed; pass 9's whole battery re-hashed to its own `748826fb…`) |
| worktree | one, `.claude/worktrees/bl/D1/p10/crit-B/wt` from HEAD, `node_modules` symlinked (the checkout has no `tests-visual/node_modules`, so no link was made). Removed with `git worktree remove --force`; `crit-B/` removed |
| fences | no source edit, no git write in the checkout beyond worktree add/remove. Writes: this file and `pass-10/critique-B/{battery,tools,results}/`, `BATTERY-HASH.txt` |
| guard | every run under `~/.claude/guard/guarded`: phase 1 (heavy, admitted after 1.5 min), the toolchain (heavy), the battery (heavy, `--timeout 120`), `tools/fix10.sh` (heavy), `tools/fix10b.sh` (`--light`). One run at a time; no browser was launched; nothing left running (`R/queue.txt`) |

Short citations: `R/` is `pass-10/critique-B/results/`, `K/` is `pass-10/B-kit/`, `Bp10` is `pass-10/B-proto.md`. Loads are `sysctl vm.loadavg` (1/5/15 min), logged beside every run.

---

## §0 · Verdict

**26/27 CLOSED. S-14 stays OPEN** (it entered pass 10 open; the route claims it closed; this seat's measurement does not close it). No item closed entering pass 10 is re-opened. The pass is **not clean**: the two-clean-passes count stays at 0.

The reason, in one paragraph. S-14's hold (§P9-7) reads "every kit judge exits 2 on a throw or a degenerate input on **every input argument**, a wrong-schema or **wrong-kind report** included; **no judge reads a malformed input as an all-clear**", and §P9-6.4's battery list names "a report of the right schema but the wrong kind … each exits 2" for every input argument of every kit judge. The probe now meets it in full (LEAK 20/20, never 0). `browser-tally` and `rekey` do not. `browser-tally --base <a route report>` and `--route <the re-keyed base report>` each read **GREEN, exit 0** (`R/judges10.txt`). Made concrete (`R/fix10.txt` F6): a route report in which one base-green test fails reads **RED (2 failed)** against the real re-keyed base, and **GREEN (0 failed)** when that same failing report is passed as `--base`; `rekey` accepts the failing route report as its base input (exit 0) and writes a "re-keyed base" that the tally then reads **GREEN** against the failing route. That is pass 9's O-1 (the probe's own non-floor report as `--base` read a leak GREEN) in the other two judges, on inputs the plan named. Each judge can tell the kinds apart from fields it already reads: every valid `--base` carries `rekeyedFrom` (the tally refuses a base whose `testDir` differs from the route's, so a usable base is always a re-keyed one), a route report never does and records its `baseReport`; LAW §14 (pass 10) already has `rekey` refuse a report carrying `rekeyedFrom`.

| bar (§P9-6.4) | this seat's measurement | load |
|---|---|---|
| replay from committed bytes | HEAD code digest `35f7b831…` = the chain's base. Floor rows (S1's own script, 28 s) → `5b14c6c7…705402f` over 1,354 files = S1's recorded digest. `K/replay.mjs` S1b→S70 (127 steps): **348 s, `chain final MATCH`, `6fdd4ec7bd259630d38a466a444e45b2b18f71b4cbf2259d258a4c6177996bbf` over 1,587 files** (`R/phase1.txt`, `R/replay.txt`) | 22.8 → 22.4 |
| rerun no-op | 0.4 s, "the chain is applied". The digest is unchanged after every battery family, the corrections and the extras (`R/digest-after.txt`, `R/fix10.txt`, `R/fix10b.txt`) | 22.4; 11-25 |
| floor base | four cascade `.seq` files byte-identical to `K/results/p10/cascade/baseline`; the base peer report equals `K/results/p10/peer-closure-base.json`, root aside; floor-base `MIGRATION.md` identical to HEAD's | 23.6 |
| gate | **19/19 at 0**, exit 0; files 1,585, edges 8,350, modules 142/142 (`R/seal-wt.txt`) | 17.5 |
| package | verify:package **CLEAN**; ratchet PRESENT, datum **2,920,386**, `equal: true`, `increase: false`; `.bundle-ratchet` reads `2920386` | 18.5 → 17.8 |
| cascade | GREEN against this seat's floor-base snapshot with the kit's listing (exit 0, Timeline → TimelineMarks 40); RED with an empty listing (exit 1) | 17.9 |
| toolchain | build 0; `vue-tsc` ×2 0; `demo:dist:build` 0; `seal.test.ts` **26/26**; vitest 275 files, **2,335 passed**, 10 expected-fail, 1 skipped, 0 failed (`R/toolchain.txt`) | 17.1 → 25.5 (seal.test); 25.5 → 21.1 (vitest, 119 s) |
| browser | re-derived from committed reports by the kit tally and by this battery's own reader (`battery/tally10.mjs`): **428 base-green, 428 held, 0 failed, 0 absent**, flaky 1, both readers equal; with the pass-10 touched-spec pair added as one more rerun per tree, the same (§3) | 17-25 |
| `./motion-core` | keyframes-free on all three arms: names 55, dist 5 files, files 38, peers none, against the kit's base report and this seat's (exit 0 both) | 17.5 |

---

## §1 · S-14: every kit judge, every input argument

`R/judges10.txt` (hashed `battery/judges10.sh`), 07:07-07:08Z, load 23.2 → 19.9: **138 PASS, 7 FAIL**.

| judge | planted (expect 2 unless stated) | result |
|---|---|---|
| `peer-closure --base` | missing, non-JSON, `{}`, `[]`, `null`, `5`, a directory; the floor-base report with `entries` `{}` / `[]` / absent / `./motion-core` dropped / `./motion-core` hollow; `floorBase` false / absent / `"true"`; a browser route report; a re-keyed browser base; **the probe's own report of the clean tree** | 18/18 exit 2. Control 0 |
| the leak | `useRAFLoop.ts` (`./motion-core`) gains a keyframes.js value import; the probe against each of the 18 forms above plus **the leaking tree's own report** | **19/19 exit 2, LEAK-NEVER-0 PASS**; against the floor-base report exit 1 (`BROKEN ./motion-core … names → @mkbabb/keyframes.js; files → @mkbabb/keyframes.js`); with no `--base` exit 1. **P9-G1 is cured** |
| `peer-closure --overlay`, `--table`, `--root` | overlay missing, non-JSON, `[]`, `null`, `5`, a browser report, a peer report; table missing, empty, `package.json`, `src`; root missing, empty dir, a file | 15/15 exit 2. `--overlay {}` exits 2 (INFO: the hashed battery called it the declared empty overlay; the kit refuses it, LAW §14) |
| `peer-closure` flags with no value | `--base` last on the line; `--table` last on the line | **`--base` → exit 1 (RED); `--table` → exit 0 (GREEN)**: `arg()` returns undefined, so `--base` with no value reads as no `--base`, and `--table` with no value falls through `?? PEER_TABLE` |
| `browser-tally` (4 arguments) | per argument: missing, non-JSON, `{}`, `[]`, `null`, `5`, a directory, a peer report, `browser-seat/1`, no `results`, no `testDir`, an empty report, no value; the raw base as `--base` and as `--route` | 48/48 exit 2. Control 0, GREEN 428 |
| `browser-tally`, right schema, wrong kind | **a route report as `--base`** | **exit 0, GREEN** (430 base-green, all held: the route read against itself) |
| | **the re-keyed base as `--route`** | **exit 0, GREEN** (429 held) |
| | a route rerun as `--base-rerun` | exit 0 (accepted) |
| | a re-keyed base rerun as `--route-rerun` | exit 1 (accepted, read as a verdict) |
| `rekey` | no arguments; no out; base missing, non-JSON, `{}`, `[]`, `null`, a directory, a peer report, `/1`, empty, **already re-keyed**; tree missing, empty dir, a file; out unwritable | 17/17 exit 2. Control 0 |
| | **a route report as the base** | **exit 0**: it writes a "re-keyed base" from a route run (`{"specs":155,"moved":[],"unmapped":[],"results":867}`) |
| `browser-select` | no arguments; `--root` no value, missing, empty dir, a file; `--out` a file; `SEQUENCE.json` non-JSON, `{}`, `[]`, `null`, no steps; a move step file (`S2-pass-1.json`) non-JSON, `{}`, `[]`, `null` | 16/16 exit 2. Control 0 |

**F6, the masking made concrete** (`R/fix10.txt`, post-hash probe, load 24): one base-green key of the committed route report flipped to `unexpected` (`expandable-container.visual.ts :: (a) inline renders real canvas …`, two keys of that title):

| `--base` | `--route` | exit | verdict |
|---|---|---:|---|
| the committed re-keyed base | the failing route | 1 | RED: 427 held + 2 failed |
| the failing route | the failing route | **0** | **GREEN: 429 held + 0 failed** |
| `rekey <the failing route>` (exit 0) | the failing route | **0** | **GREEN: 429 held + 0 failed** |

**The gate and the earlier judge plants** (regressions, §4): pass 9's hashed `judge-throws.sh` **45/45** (P-base-schema, pass 9's one FAIL, now 2); crash8 **39/39** (the two added gate modules `lib/tree/index.mjs` and `seal/cycles.mjs` among them); PEERU U1-U4 2. B17 0.

**Reading.** P9-G1 and P8-R2 as ruled (the guard, degenerate empty inputs, the probe's `--base` contract) are landed and measured. S-14's hold column is wider than P9-G1 and names wrong-kind reports on every input argument of every judge; `browser-tally` (`--base`, `--route`, both rerun arguments) and `rekey` (its base) accept the wrong kind, two of them as an all-clear. The route's INPUT group planted the tally's wrong kind only as a `testDir` mismatch (Bp10 §5). The flag-with-no-value cases are the lesser shape: `--base` degrades to the strictest reading (RED), `--table` to the stated default; LAW §14's sweep reads `?? PEER_TABLE` as "an absent option's stated default", but here the option is present and its value is missing.

---

## §2 · S-03, B-10: the rulings on the replayed tree

**P9-R1 (a), B4 widened** (`R/plants10.txt`, hashed; `R/fix10.txt` F1, corrected; load 19.9 → 17.0).

| plant | result |
|---|---|
| PC-val-1..3: a new parent file value-reads the child's door, a new child file value-reads it (aurora↔config, blob↔mood, dock↔context) | B4 CAUGHT, each naming `value SCC at module grain [… parent … child …] (parent<->child)` |
| PCG-val: grandparent↔grandchild (aurora → runtime door … runtime/frame → aurora) | B4 CAUGHT, module-grain line |
| PCX-val-1..2: an existing parent→child edge (`aurora-config.ts` → `config`, `runtime.ts` → `runtime/frame`) closed by one new child file | B4 CAUGHT, module-grain line |
| SIB-val (sibling regression) | B4 CAUGHT |
| **PD-val-1..3** (corrected): the parent's DOOR already reads the child (`aurora/index.ts` → `./runtime`, `dock/index.ts` → `./search`, `menu/index.ts` → `./items`); a new child file value-reads a new parent-level file that reads nothing | **B4 0 → 1, `value SCC at module grain [src/components/<unit> src/components/<unit>/<child>] (parent<->child)`**, 3/3 |
| **PD-type-1..3** (corrected): the same reverse edge `import type` | **B4 gains no line**, 3/3 |

The hashed PC-type/PCX-type rows read FALSE+ (5 rows): their parent-level file both read the child and was read by it, so the reverse type edge closed a **sibling** cycle at the parent's level, which LAW §8 has counted "value and type" since pass 4 (the line is `cycle @src/components/aurora [zq10p.ts config] … [type]`, not the module arm). That is this seat's plant defect (the route's run 1 hit the same trap, Bp10 §5); PD-* is the corrected form, expectations unchanged (§7).

**P9-R2 (a)** (`R/fix10b.txt`, W-C.2's appendices extracted from the tree's committed `W-C.2.md`, sha `1652c7b6…`):
- `MIGRATION.md:8` is exactly `## 11.0.0`; the chain's section runs to line 127;
- **C2-G1 (appendix A) reads 0 META hits in the section**; `MIGRATION.md`'s total hits route 1,648 = HEAD 1,648 (delta 0); 0 section lines name `BL` or "tranche";
- **C2-G4 (appendix B) over the section: 1 heading, 0 misses**, exit 0;
- a tranche id written into the section reads RED by C2-G1: `BL #10` 1 hit (row-ref), `BL.W3` 1 (wave-id), `W-STRUCTURE-CUT` 1 (wave-id), `[2026-10-16 · …]` 1 (dated-bracket); the heading written `## 11.0.0 — the structure cut (BL)` reads C2-G4 exit 1. A bare `(BL)` and the word "tranche" read 0 by C2-G1's grammar (INFO, §5 O-3).

**P8-R3 / P9-G2** (`R/plants10.txt`): the `./motion-core` row and the `./input` row, each with the Peer cell removed, the Peer cell whitespace only, and the subpath blanked: **6/6 THROWS** (seal exit 2); control (the row re-spaced) CLEAN. The pass-9 critic's hashed BI3 still FAILs on its own locator (it splits on `|`, the table is whitespace-aligned), as in pass 9.

**The datum** rebinds once: only S70 writes `.bundle-ratchet` (2,919,057 → 2,920,386); verify:package reads it `equal: true`.

---

## §3 · S-12: the browser bar

`R/browser10.txt` (hashed), `R/fix10.txt` F3, F5; load 17-25.

- **BW1/BW2/BW3/BW4:** the kit tally over the committed pair and its six reruns: 428 base-green, 428 held, flaky 1 (blob D2), exit 0. `tally10.mjs`, this battery's independent reader, over the same inputs: the same five counts; `ACCOUNTED base-green 428 = held 428 + failed 0 + absent 0`.
- **F5:** with the pass-10 touched-spec pair (`p10-steps/base.rekeyed.json`, `p10-steps/route.json`) as one more rerun per tree: 5 runs per tree, both readers 428 / 428 / 0 / 0, flaky 1.
- **BW5:** `browser-select` on the replayed tree: 604 moves, 723 changed, **155 specs, identical to the committed `specs.txt`**; 14 captures excluded.
- **BW6 (corrected, F3):** 0 specs newly selected against pass 9, 0 left. The hashed line read the "6" of its own marker (§7).
- **BW7:** every committed report is byte-identical to pass 9's copy except `base-rekeyed.json` (re-derived; the kit tally reads it to the same 428).
- **Pass 8's tally plants** through the pass-10 tally: T0 428; T1-T4 PASS; T5 named.
- **Capture specs** (pass 9's `select-capture.sh`): SC1-SC3 PASS (14 of 14 touched capture specs printed excluded); SC4 LAW §13 lines 406-413. Pass 9's `plants9.mjs`: CAP-new-01..14, CAP-stale, NC-new RED, CAP-ctl CLEAN, XR family as ruled: 17 PASS, 1 SKIP, identical to pass 9.

The 8 touched specs ran on both trees in the route's committed run (Bp10 §7); this seat ran no browser and reads only the committed reports. The tally's wrong-kind acceptance (§1) does not change these numbers: every report here is of the right kind.

---

## §4 · Regressions

`R/p9-regress/` (pass 9's hashed `run-battery.sh` by path, 07:09-07:17Z, load 17.0 → 11.4).

| set | result |
|---|---|
| the 402-row regression (passes 4-8 inside) | **402 same, 0 differ** |
| pass 8's 11 peer plants | 11 same, 0 differ |
| pass 9's judge-throws | 45/45 (pass 9: 44/45) |
| pass 9's b18-inputs | 5/1, the same row as pass 9 (BI3's own locator); this seat's PR-* cover the case |
| pass 9's flake9 | identical lines to pass 9's (`tally rc=2`: pass 8's fixtures carry no `testDir`, cB9 §7) |
| crash8 | 39/39; M4.1, R4 INFO as before |
| PEERU | U0/U5 rc 1 without `--base`, as in pass 9 (P7-G5); U1-U4 2 |
| pass 7's tree probes | identical to pass 9 except **P6:FD4**, which died on `ERR_MODULE_NOT_FOUND`: pass 6's `fd4-probe.mjs` imports `scripts/structure/lib/tree.mjs`, which S74d moved. Re-pointed to `lib/tree/tree.mjs` (F4, one line, `diff` printed): **A, G, G2, U and RESTORE all PASS**. The route's own copy of this run shows the same FAIL (`K/results/p10/critic9/tree-probes.txt:169`) and Bp10 §5 does not list it |

---

## §5 · Findings

| # | finding | item it maps to | effect on the score |
|---|---|---|---|
| O-1 | `browser-tally` reads a route report as `--base`, and the re-keyed base as `--route`, GREEN (exit 0); it accepts a route rerun as `--base-rerun` and a base rerun as `--route-rerun`. `rekey` accepts a route report as its base and writes a "re-keyed base" from it. F6: a failing route reads GREEN through either path | **S-14** (hold §P9-7: "a wrong-schema or wrong-kind report included; no judge reads a malformed input as an all-clear"; battery §P9-6.4) | S-14 not closed. Cure is kit-only, no digest change: `--base` and `--base-rerun` must carry `rekeyedFrom`, `--route` and `--route-rerun` must not (and the route carries `baseReport`); `rekey` refuses a report whose `testDir` is already the migrated program's |
| O-2 | `peer-closure --base` with no value reads RED (exit 1); `--table` with no value reads GREEN through `?? PEER_TABLE` | S-14 (same hold: "every input argument") | part of S-14's open state; the cure is a throw when a value-taking flag has no value (`arg()` in `lib/floor.mjs`) |
| O-3 | C2-G1's META grammar reads a bare `(BL)` and the word "tranche" as 0 hits | none of the 27; W-C.2's detector, which P9-R2 binds; the chain's text carries neither (MG2 0) | none; logged for W-C.2 |
| O-4 | W-C.2's appendix A as written dies on this repo: `git ls-files` exceeds `execFileSync`'s 1 MB buffer (ENOBUFS), and on an uncommitted migrated tree it reads paths the chain moved away (ENOENT) | none; W-C.2's gate (C2-G1) | none; logged for W-C.2. The route's `tools/wc2/` reads the delta its own way and reached the same 0 |
| O-5 | S74c edits the landed floor engine (`scripts/structure/lib/move.mjs:168`); the docs floor's `floor/lib/move.mjs:168` keeps the old line, so two copies of the engine disagree with each other and FLOOR.md F-2 | none of the 27 (S-08's hold is the gate at 0, met); maps to no edict clause (a record, not shipped code) | none; Bp10 G-1's floor row |
| O-6 | `.claude/worktrees/bl/D1/p8/B-proto/` (P9-G5, still present) and `p10/B-proto/` (5.4 GB snapshot, Bp10 G-11) | — | none; driver housekeeping |

No finding maps to an edict clause the list leaves out. The checklist stays at 27.

---

## §6 · The 27 items

| item | status | the measurement that holds it (all in `R/`, replayable) |
|---|---|---|
| S-01 | CLOSED | kit and results committed at `aa46420a` (06:44:48Z) before this seat's hash (06:52:45Z); no structure change since |
| S-02 | CLOSED | B8 0, B9 0 (`seal-wt.txt`) |
| S-03 | CLOSED | P9-R1 (a): PC/PCG/PCX/PD value plants B4 module-grain RED, PD-type clean, tree B4 0; P9-R2 (a): `## 11.0.0`, C2-G1 0 and C2-G4 0 in the section, four tranche-id plants RED; P8-R3: PR-* 6/6 throw; P8-R2's guard and degenerate inputs (§1); the datum rebound once at S70 |
| S-04..S-08 | CLOSED | gate 19/19 at 0 |
| S-09 | CLOSED | `6fdd4ec7…` from committed bytes in a fresh HEAD worktree, MATCH; rerun 0.4 s no-op; unchanged after every family |
| S-10 | CLOSED | cascade GREEN listed (0), RED unlisted (1) against this seat's floor-base snapshot |
| S-11 | CLOSED | vitest 2,335 passed, 0 failed; `seal.test.ts` 26/26 |
| S-12 | CLOSED | 428/428 held by two readers, every key accounted, with and without the pass-10 pair; selection 155 = committed; captures stated, printed (14/14) and read by B0 (CAP-*) |
| S-13 | CLOSED | regressions as §4 |
| **S-14** | **OPEN** | B17 0; gate throws 39/39; probe every argument and the leak 20/20 never 0; **`browser-tally` and `rekey` accept wrong-kind reports, two as an all-clear (O-1); two flags with no value read as verdicts (O-2)** |
| B-01 | CLOSED | every clause 0, B2 0; I7 inside the 402 rows |
| B-02..B-06 | CLOSED | 402 rows 0 differ |
| B-07 | CLOSED | B15 0 |
| B-08, B-09 | CLOSED | gate 0; regressions |
| B-10 | CLOSED | B18 throws on a peer-less, whitespace-only and subpath-less row (6/6); `./motion-core` keyframes-free on names, dist, files; XR family as ruled |
| B-11..B-13 | CLOSED | regressions (NOPIN/PIN-OPT, the pass-3 answers) unchanged |

**Count:** 27 items, **26 closed, 1 open (S-14)**, 0 re-opened. Convergence by §P2-6.5's formula: 26/27 = **96.3%**. The two-clean-passes count stays **0**.

---

## §7 · This seat's own defects (each re-run post-hash, expectation unchanged)

1. **PC-type/PCX-type** (5 rows FALSE+): the plant's parent-level file read the child and was read by it, a sibling cycle LAW §8 counts. Corrected as `tools/plants10b.mjs` (the cycle through the parent's door, a fresh parent-level file): 6/6 PASS (`R/plants10b.json`).
2. **migration10.sh**: appendix A died ENOBUFS, then ENOENT on the uncommitted tree, so its MG1/MG4/MGP lines read a crashed detector (0); appendix B received `--list` in its published-list slot (MG3 FAIL). Corrected in `tools/fix10.sh` F2 and `tools/fix10b.sh` (two patches to the extracted copy, printed by `diff`).
3. **BW6**: the grep counted the "6" in `BW6MISS`. Recounted (F3): 0.
4. **Pass 6's fd4-probe** path moved by S74d: re-pointed (F4), all arms PASS.
5. **P-overlay-obj** was marked INFO on the belief that `{}` is the declared empty overlay; the kit refuses it (exit 2), which is the stricter reading.

None of these changes a hashed expectation. O-1's decisive lines (`T-base-is-route`, `T-route-is-rekeyed-base`, `R-base-is-route`) are hashed battery rows; F6 adds only the concrete failing-route demonstration.
