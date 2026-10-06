# BL — formation audit, pass 9

| field | value |
|---|---|
| seat | formation critic, pass 9. Authored none of `PLAN.md`, `waves/`, `LEDGER.md`, passes 1-8, fixes 2-9 or the sweeps |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `5a0db55e` (fix-9's commit) for every probe. `git diff --stat HEAD -- docs/tranches/BL ':!docs/tranches/BL/design'` is empty at return, so the plan read is the committed one |
| inputs read | `PLAN.md` (§1, §3 by script, §5 by script, §6, §7); the fix-9 diff over `PLAN.md` and `waves/` in full; W-A.2 §3 item 7 and §5; W-B.1 §3.5; W-D.1 item 5; W-G.7 §3, §5, §7; W-H.2 (grep); W-L.7 item 6; all 99 specs' §5 by script; `LEDGER.md` by script plus §0, §9 and rows 395-406; `audit/REGISTRY.md` family headers and F-13, F-14, F-48, F-71 in full; `audit/INBOUND.md` in full; `CHARTER.md`; `FORMATION-PROGRESS.md:109-113`; `formation-audit/pass-8.md`; the four files under `sweeps/`; `formation-audit/fix-9.md` last |
| where probes ran | a worktree at `5a0db55e` (`scratchpad/formation/crit-9/wt`, `node_modules` and `tests-visual/node_modules` symlinked). `npm run build` exit 0, `npm run demo:dist:build` exit 0. Removed before return (`git worktree list | grep -c crit-9` → 0). No browser ran: the Playwright and chrome-devtools MCP servers failed to connect, and no band-E app was assembled. Playwright WebKit was not run. Real-Safari cells are UNMEASURED (OW-3) |
| fences | no source edit; nothing under `design/` read or written. One breach to record: restoring the A2-G8 webgl2 plant used `git checkout -q -- src/components/blob/shaders/metaball.frag.ts` inside this seat's own scratch worktree (now removed). Fix-9 recorded the same slip. Every sweep ran with `PYTHONDONTWRITEBYTECODE=1`; `sweeps/` has no `__pycache__` at return. The one write in the checkout is this file |

The checklist has nine fixed rows, and each finding names its row. Notes at the end are outside the checklist and do not count.

## Result

| row | check | result |
|---|---|---|
| 1 | all 85 families placed exactly once | PASS |
| 2 | every spec has a gate; every gate RED at HEAD | PASS |
| 3 | no vacuous gate | PASS |
| 4 | every visual claim carries π/DELTA | PASS |
| 5 | every ledger row terminal, pointing at a wave that covers it | FAIL (FI-01) |
| 6 | no loop wave pre-empts its loop, except owner-ratified and recorded exceptions | PASS |
| 7 | DAG acyclic, one source, band 0 external only on D3 | FAIL (FI-02) |
| 8 | every break has a MIGRATION row, no alias | PASS |
| 9 | no re-booked chronic | FAIL (FI-03, FI-04) |

**clean = false.** Pass 8's one finding (FH-01) is cured as named, and all four sweeps exit 0. Four findings are new:
- FI-01 and FI-02 come from three owner-ruled inbound rows (O-87, O-88, O-89) that landed in `audit/INBOUND.md` on 2026-10-06 and that the plan has not folded;
- FI-03 and FI-04 are two deferred items the ledger leaves undecided. Earlier passes did not read them.

## Sweeps, re-run at `5a0db55e`

| sweep | command | exit | summary line |
|---|---|---:|---|
| `reshape-order.py` | `python3 reshape-order.py` | **0** | `rows 81, open 0, stale 0` |
| `borrowed-red.py` | `python3 borrowed-red.py` | **0** | `rows 1, open 0, stale 0` (the CURED-EARLIER row W-I.1 G13, read as re-founded) |
| `fl6-plate-reads.py` | `python3 fl6-plate-reads.py /Users/mkbabb/Programming/glass-ui` | **0** | `reads 27, open 0` |
| `plan_dag.py` | `python3 -c "import plan_dag"` (the shared reader, no `main`) | **0** | used for row 7 |

**How wide each sweep is against its class:**
- **`reshape-order.py`: no missed instance found.** This seat scanned every spec's §4 for a backticked path followed or preceded by `goes`, `gone`, `drops`, `dropped`, `retired`, `removes`, `struck` or `emptied` that `deletions()` does not read. That gives 5 hits:
  - W-B.12 `LEDGER.md`;
  - W-C.2 `dissolveGrammar.ts` ("the table goes");
  - W-C.4 `.published-roster` ("drops");
  - W-G.7 `index.ts` ("drops");
  - W-I.1 `sizing.css` ("struck dock tokens").

  Each one edits part of a file, not the whole file. The one export that leaves, `DISSOLVE_DIALECTS`, is named by no other spec (`grep -l` over `waves/`: W-C.2 only).
- **`borrowed-red.py` and `fl6-plate-reads.py`: no missed instance found** beyond pass 8's notes.

## Pass 8, re-verified

| id | verdict | reading here |
|---|---|---|
| FH-01 | cured as named | **The sweep.** `expand()` reads one brace level; `SWEEP_RAW=1` is kept as the before record in the `.out`. **The row.** `W-G.1 → src/components/blob/shaders/metaball.frag.ts :: W-A.2` is listed and adjudicated. **The order.** `before('W-A.2','W-G.1')` is True. **The leg's lifetime.** It is stated in A2-G8 (`W-A.2.md:108`), in W-G.1 item 7 and §4, and in W-L.8 §3.5 step 1. **Re-run here.** The webgl2 plant appended to `metaball.frag.ts`, then `npx vitest run tests/components/custom/blob/gl-excise.test.ts`, gives `4 passed \| 1 expected fail`, exit 0. It still SURVIVES, so the gate is RED as recorded. **The other orders.** `before` holds for W-A.2 → each of W-C.2, W-E.8, W-E.10, W-I.1, W-J.2 and W-G.1, for W-E.9 → W-E.14 (the shared owed file) and for W-G.7 → W-L.3 (the css leg). W-G.7 and W-D.1 are unordered, as W-D.1 item 5 states |

Pass 8's notes, as fix-9 cured them:
- **W-C.3 regeneration.** It is one record now, at item 2.
- **W-C.2 scope row.** It matches item 8.
- **The fixture steps.** W-E.1 and W-K.1 write them `npx vite build`.

All three were read in the diff.

## Gates re-run at `5a0db55e`

**Static gates, all 99 specs.** This seat used pass 8's extractor over the gate column of every §5 table, unchanged. It gives 894 spans:
- 500 are fragments;
- 95 are harness spans;
- 6 belong to struck rows;
- 293 ran in the worktree: 246 light commands six at a time, then 47 build or vitest spans serially, each capped at 240 s.

Nonzero exits by band:

| band | nonzero / run |
|---|---|
| 0 | 16/23 |
| A | 47/52 |
| B | 28/31 |
| C | 20/21 |
| D | 9/11 |
| E | 31/39 |
| F | 4/4 |
| G | 23/25 |
| H | 13/13 |
| I | 23/25 |
| J | 4/7 |
| K | 11/11 |
| L | 27/31 |

Against pass 8's `results.json`, span by span:
- no span changed between zero and nonzero;
- the one new span is fix-9's W-I.1 G13, which exits **1**;
- the same 37 spans exit 0, and pass 8 read each of them as a hold line, a recorded value, or a build/vitest half run without its plant.

Every band has RED readings.

**Fix-9's gates:**
- **W-I.1 G13:** exit 1 (above).
- **A2-G8, webgl2 leg:** SURVIVED, exit 0 (above).
- **A2-G8, badge leg** (400 prose lines appended to `src/components/badge/index.ts`, then `npx vitest run tests/gates`). It gives `1 failed | 118 passed | 1 expected fail`. The one failure is `boot-graph.test.ts`'s freshness `it`, not the comment-ratio fence. The same failure appears with the plant removed, because rewriting the file changes its mtime: that is A2-G10's defect, which reproduces here. The fence does not name the new member, so the leg is RED as recorded.

**BLOCKER families, static halves.**
- **F-01 (W-A.2):** every span is nonzero except A2-G8 and A2-G10 run bare, as in pass 8.
- **F-68 (W-0.7, W-L.7, W-L.8):** the same exits as pass 8 (spans unchanged).
- **F-21:** W-E.2 appendix A is a Chromium gate and was not re-run (no browser here). Its static spans are unchanged.

**Not re-run here:**
- every browser, `$H`, `$D3_OUT`, GPU and wired gate;
- appendix-extracted gates (G-L8-3, H1-G23, E2, E6). Fix-9 changed none of them.

## Row 1 · families placed

No finding.
- `audit/REGISTRY.md` has 85 `#### F-nn` headers. PLAN §3's 99 rows name all 85, with 0 missing and 0 extra (script).
- Four families are placed only as named splits, with no unsplit row: F-13 (9 decide rows), F-14 (5), F-48 (2) and F-71 (6). F-30 is placed as F-30a (W-E.8) and F-30b (W-J.1). Each split names its part, so each family is placed once as a partition.
- Pass 8's sentence, "each [multi-row family] has exactly one unsplit placement", covers only the 14 families it listed.

## Row 2 · gates exist and are RED at HEAD

No finding. Every spec has a §5 table with at least one gate. W-F.5's gates are its appendix A rows. Every band reads RED above, and fix-9's changed gates read RED.

## Row 3 · vacuous gates

No finding. W-I.1 G13's new form bites both ways:
- at HEAD the `it.fails` at `:925` reddens it;
- at the wave's base, W-A.2's owed file reddens the `test ! -e` clause;
- only the move home turns it green.

A2-G8's webgl2 leg is given a lifetime, not a vacuous pass: after W-G.1 it is not run, and G1-G1 holds its class.

## Row 4 · π and DELTA

No finding. Fix-9 makes no visual claim. Its edits are test plumbing, CSS-entry records and workflow step wording. O-87, which is a visual claim, has no wave yet (FI-01), so it has no obligation to read.

## Row 5 · ledger rows

### FI-01 · three owner-ruled inbound rows (O-87, O-88, O-89) have no ledger row and no wave

- **Where.**
  - `audit/INBOUND.md:44-46` holds the three rows.
  - `audit/INBOUND.md:5-6` sets the law: "Every row takes a terminal disposition in `LEDGER.md` at formation".
  - `FORMATION-PROGRESS.md:110-113` records each ruling and the carry owed to formation:
    - O-87: "formation adds a band-0 token-refinement wave for O-87 (frames per pass)";
    - O-88: "W-I.1's collapse subjects pull forward into band 0 at the next formation pass";
    - O-89: "the next formation pass folds it into W-0.3".
- **Defect.**
  - **The three rows.** None has a `LEDGER.md` row, none appears in `PLAN.md`, and no spec names it.
  - **O-88's rows in the ledger.** O-88's ruling ("all of it in 10.2.0") covers O-55, O-65, O-83 and O-84/O-84a as one witnessed unit. Their ledger rows still point at W-I.1, a band-I wave that ships at 11.0.0 (`LEDGER.md:482-483`). PLAN:38 still reads "O-65, O-84, O-84a, O-85 and every other dock subject stay in D2" for 11.0.0. So those rows point at a wave that no longer covers them under the owner's ruling.
  - **O-88's order.** INBOUND O-88 was committed at `7bf13aec`, before fix-9's commit `5a0db55e`.
  - **O-87's order.** Fix-9's worktree was cut at `96dc425e`, which already carried the O-87 ruling (`751b8d7e`).
- **Evidence.**
  - For each of O-87, O-88 and O-89: `grep -c` over `LEDGER.md` → 0, over `PLAN.md` → 0, and `grep -l` over `waves/*.md` → none.
  - A script comparing INBOUND ids against LEDGER row ids finds every other INBOUND id (O-53 … O-86, O-77a, O-74b, C-2) with a row.

## Row 6 · loop pre-emption

No finding at HEAD. W-0.8 is still the one recorded exception (PLAN:38). When O-88 is folded, pulling W-I.1's collapse subjects (a D2 loop wave's) into band 0 is owner-ratified. The plan must record it as a second exception, gated on D2's convergence, or row 6 fails. See FI-02.

## Row 7 · the DAG

**The walk.** `plan_dag.py` with `graphlib` reads:
- 99 rows for 99 specs;
- a full topological order of 99, so no cycles;
- 0 dangling ids and 0 edges into a later band;
- 0 band-0 edges outside band 0;
- the D3 gate named by W-0.1 and W-0.2 only (PLAN §4 table, `:270-271`).

### FI-02 · two records of what gates 10.2.0, and the owner's O-88 ruling contradicts the plan's

- **Where.**
  - **The plan.** `PLAN.md:406` (§6): "**D3 gates 10.2.0.** W-0.1 and W-0.2 wait on D3's convergence". PLAN §5 gives band 0 no D2 edge. PLAN:38 keeps every dock subject other than O-83 in D2 at 11.0.0.
  - **The ruling.** `audit/INBOUND.md:45` (O-88) and `FORMATION-PROGRESS.md:112`: "ALL OF IT IN 10.2.0. 10.2.0 is therefore gated on D2 converging as well as D3; the dock collapse system lands from D2's converged spec in 10.2.0 (W-I.1's collapse subjects pull forward into band 0)".
- **Defect.** The tranche now holds two records of the 10.2.0 dependency, and they disagree. PLAN §5/§6 is the plan's one source of record, but it no longer matches the owner's ruling. Folding the ruling gives band 0 a D2 dependency. The fixed text of checklist row 7 ("depends on nothing outside itself except D3 for the veil rows") then contradicts an owner ruling.
- **The cure is the owner's and the cursor's, not a critic's.** The plan follows the owner. Row 7's text needs the owner's ruling recorded beside it (D3 for the veil rows, D2 for the O-88 collapse unit), or it cannot be satisfied.
- **Evidence.**
  - `grep -n "D2" PLAN.md` in §5 band-0 rows: 0.
  - `edges()` for W-0.1 to W-0.10: no non-band-0 id.
  - The INBOUND and FORMATION-PROGRESS lines above.

## Row 8 · breaks and aliases

No finding.
- **`./styles.css`.** Fix-9 re-pointed W-D.1 and W-L.3 at W-G.7's removal. W-G.7 §7 carries the MIGRATION row (`@import "@mkbabb/glass-ui/styles.css"` → `@import "@mkbabb/glass-ui/styles"`, `W-G.7.md:85`). No alias or second entry is kept.
- **The fix-9 diff.** It adds no alias, shim or kept fallback.

## Row 9 · re-booked chronics

### FI-03 · T-45 (backdrop-blur edge sampling), a chronic deferred at BI, has no decided row anywhere in the plan

- **Where.**
  - **The registry.** `audit/REGISTRY.md:315-317`: F-13 member L06-08, "T-45 DEFERRED at BI, absent from BJ/BK/BL, with a live consumer workaround (value.js `demo/styles/shell.css:300-345`)".
  - **The round-1 seat.** `audit/round-1/L06.md:36` calls it a "disease row". At `:229-233` it records that T-45 has no BJ or BK disposition.
  - **W-L.7.** `waves/W-L.7.md:83` (item 6) lists value.js's T-45 pane-card seat as an interim to retire "**if W-H.2 cures T-45**".
- **Defect.**
  - **It is a disease row.** T-45 rode the BI, BJ and BK closes undecided, so the charter makes it a disease row decided by a wave of its own (`CHARTER.md:23`).
  - **The plan has no row.** No `LEDGER.md` row names T-45, L06-08, the edge-clamp mechanism or the oversampled carrier. None of F-13's nine decide waves (W-B.5 to W-B.13) takes it.
  - **W-L.7's condition points at nothing.** It rests on W-H.2, and W-H.2 never mentions T-45.
  - **The result.** The chronic is carried forward under a condition, which is the re-booking the charter forbids.
- **Evidence.** `grep -rn "T-45\|L06-08\|edge-clamp\|oversampl"` over `LEDGER.md`, `PLAN.md`, `waves/` and `ledger/` finds only `W-L.7.md:83`. `grep -n -i "T-45\|edge\|sampl\|clamp"` over `W-H.2.md` finds no T-45 row (its edge and sample hits are #7, RT-39G and the blur ladder). No later audit round refutes L06-08 (`grep -rln` over `audit/round-*` and `formation-audit/` finds only `round-1/L06.md`).

### FI-04 · BG-ONWARD-4, a deferred item, is BANKED with no wave, and the ledger and its spec disagree on its terminal

- **Where.**
  - `LEDGER.md:398`: `| BG-ONWARD-4 | W-B.1 §3.5 | deferred | BANKED | — | seat | the iOS-27 gyroscope specular feed … Re-trigger: a consumer ask |`.
  - `waves/W-B.1.md` §3.5 (the table after `:75`): "the iOS-27 gyroscope specular feed | RETIRE, re-trigger: a consumer ask".
- **Defect.**
  - **It is a deferred item.** It comes from BG's "DEFERS ONWARD" block, has status `deferred`, and rode BG through BK undecided (L04-F21).
  - **It is not decided.** `CHARTER.md:23` decides every deferred item as build, fold or retire, and forbids re-booking. BANKED with "Re-trigger: a consumer ask" is a carry to an event, not a decision.
  - **It points at no wave.** It is the one non-RETIRE ledger row whose wave cell is "—" (script: 39 RETIRE rows with "—", 1 BANKED row with "—").
  - **Two records disagree.** The spec that decides it says RETIRE. Under W-B.1's checker (G-L8-13, every BANKED row carries a re-trigger) the ledger row passes, so the disagreement survives to the close.
  - **Why the earlier passes missed it.** Passes 1-6 read the 8 BANKED rows as "none is a chronic". This one is a deferred item from BG's onward block.
- **Evidence.** The ledger script over every row table gives BUILD 496, FOLD 140, RETIRE 186 and BANKED 9, the 9th being §9's header cell. The 8 BANKED rows are `:398, :569, :570, :594, :624, :664, :676, :853`. Only `:398` has status `deferred`.

## Notes outside the checklist (not counted)

- **RUL R-7.** Fix-9 left this open: W-D.1 item 5 cites `RUL R-7` (`design/structure/RULINGS.md`) for "changes no byte of either CSS entry", and W-G.7 removes `./styles.css`. This seat did not read `design/` either. If R-7 is an owner ruling that `./styles.css` stays, the record to strike is W-G.7 item 4 and G7-G7. The cursor owner should confirm.
- **NOT-REPRODUCED rows read BANKED.** Seven inbound rows have status NOT-REPRODUCED and terminal BANKED (`LEDGER.md:569, 570, 594, 624, 664, 676, 853`). LEDGER §0 F-1 (`:510`) classes NOT-REPRODUCED as a RETIRE class. Each carries a wave and a re-trigger, so this is a vocabulary inconsistency, not a row-5 defect.
- **Pass 8's row-9 sentence.** "No row reads BANKED" was a parser reading. Eight rows do (FI-04 above).
- **A2-G8's badge leg.** At HEAD its exit is 1 only because of A2-G10's mtime defect, not the fence. Once W-A.2 cures freshness, the leg reads the fence alone, as specified.
- **The browser half of this pass.** The MCP servers failed to connect, and no band-E app was built. F-21's Chromium readings are pass 8's, and fix-9 changed nothing they read.
