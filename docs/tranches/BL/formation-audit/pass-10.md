# BL — formation audit, pass 10

| field | value |
|---|---|
| seat | formation critic, pass 10. Authored none of `PLAN.md`, `waves/`, `LEDGER.md`, passes 1-9, fixes 2-10 or the sweeps |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `4a76c9f2`. `git diff --stat 31b19bfb 4a76c9f2` touches `FORMATION-PROGRESS.md` and `driver/` only, so the plan read here is fix-10's as committed. `git status` over `docs/tranches/BL` outside `design/` was empty before this file was written |
| inputs read | `PLAN.md` (§1, §2, §3 and §5 by script, §6); `waves/W-0.8.md` (header, §5, §7), `W-0.11.md` in full, `W-H.6.md` §3-§9, `W-0.3.md` G9 and §6, `W-L.8.md` §1 and families; every spec's §5 by script; `LEDGER.md` by script plus the docket rows (`:322-341`), `:403`, `:417`, `:487-489`; `audit/REGISTRY.md` family headers and members; `audit/round-1/L04.md` (master ledger `:44-95`, `L04-F25` at `:39` and `:436-450`); `audit/INBOUND.md` in full; `FORMATION-PROGRESS.md:95-140`; `formation-audit/pass-9.md`; every file under `sweeps/`; `formation-audit/fix-10.md` last |
| where probes ran | a worktree at `4a76c9f2` (`scratchpad/formation/crit-10/wt`, `node_modules` and `tests-visual/node_modules` symlinked). `npm run build` exit 0 (39 s wall). Removed before return (`git worktree list \| grep -c crit-10` → 0). Load average 150-545 and swap 35.0 of 35.8 GB used for the whole seat (`uptime`, `sysctl vm.swapusage`); no timing cell was read. No browser ran: the Playwright and chrome-devtools MCP servers failed to connect. Real-Safari cells are UNMEASURED (OW-3) |
| fences | no source edit, no git write, nothing under `design/` read or written, no sibling repo touched. Every sweep ran with `PYTHONDONTWRITEBYTECODE=1`; `sweeps/` has no `__pycache__`. The one write in the checkout is this file |

The checklist has nine fixed rows. Each finding names its row. Notes at the end are outside the checklist and do not count.

## Result

| row | check | result |
|---|---|---|
| 1 | all 85 families placed exactly once | PASS |
| 2 | every spec has a gate; every gate RED at HEAD | FAIL (FJ-02, FJ-03) |
| 3 | no vacuous gate | FAIL (FJ-03, FJ-04) |
| 4 | every visual claim carries π/DELTA | PASS |
| 5 | every ledger row terminal, pointing at a wave that covers it | PASS |
| 6 | no loop wave pre-empts its loop, except owner-ratified and recorded exceptions | PASS |
| 7 | DAG acyclic, one source, band 0 external only on D3 for the veil rows | FAIL (FJ-01) |
| 8 | every break has a MIGRATION row, no alias | PASS |
| 9 | no re-booked chronic | FAIL (FJ-05) |

**clean = false.** Five findings. All four of pass 9's are cured as named, and every sweep exits 0. The new findings are:
- FJ-01: the checklist's row-7 text against the owner's O-88 ruling, which the plan follows;
- FJ-02 to FJ-04: three gates fix-10 wrote, two of which read green at HEAD;
- FJ-05: a chronic the sweeps cannot see.

## Sweeps, re-run at `4a76c9f2`

| sweep | command | exit | summary line |
|---|---|---:|---|
| `reshape-order.py` | `python3 reshape-order.py` | **0** | `rows 83, open 0, stale 0` |
| `borrowed-red.py` | `python3 borrowed-red.py` | **0** | `rows 1, open 0, stale 0` |
| `fl6-plate-reads.py` | `python3 fl6-plate-reads.py /Users/mkbabb/Programming/glass-ui` | **0** | `reads 27, open 0` |
| `inbound-fold.py` | `python3 inbound-fold.py` | **0** | `ids 37, open 0, stale 0` |
| `release-gates.py` | `python3 release-gates.py` | **0** | `waves 101, band-0 loop gates {D2, D3}, open 0` |
| `chronic-decided.py` | `python3 chronic-decided.py` | **0** | `members 51, ledger rows 820, open 0` |
| `ledger-terminal.py` | `python3 ledger-terminal.py` | **0** | `ledger rows 820, open 0` |
| `plan_dag.py` | `python3 -c "import plan_dag"` (shared reader) | **0** | used for row 7 |

**How wide each sweep is against its class:**
- **`chronic-decided.py` is too narrow (row 9, FJ-05).** Its `FIND` pattern reads only rows keyed `Lnn-Fnn` or `Rn-n-n`. L04's master ledger (`audit/round-1/L04.md:44-95`) keys its 45 carried items by number, and 38 of them are marked **D** (disease). The sweep never reads that table. Its MEMBER arm also clears a member as soon as any spec names the member's id, even when the spec misdescribes it. Missed instance: `L04-F25` and its L04 rows 38, 40 and 41 (FJ-05).
- **No sweep reads a gate's own command against its own HEAD claim.** That is how FJ-02 and FJ-03 slipped through: fix-10 recorded readings taken from scratch copies or a different pattern. This is a gap in what the sweeps cover, not a finding on any one sweep. The findings sit on rows 2 and 3.
- **`reshape-order.py`, `borrowed-red.py`, `fl6-plate-reads.py`, `inbound-fold.py`, `release-gates.py`, `ledger-terminal.py`: no missed instance found.** Spot checks: O-87, O-88, O-89, T-45 and BG-ONWARD-4 each have `LEDGER.md` rows (9, 12, 4, 3 and 2 hits) and spec hits (8, 5, 3, 3 and 1 files). Every docket row's wave exists.

## Pass 9, re-verified

| id | verdict | reading here |
|---|---|---|
| FI-01 | cured as named | O-87 → W-0.11, O-88 → W-0.8 (re-scoped), O-89 → W-0.3 G7-G9. LEDGER `:487-489` re-points O-83, O-84 and O-84a at W-0.8; `:911` re-points O-65 R-1. `inbound-fold.py` exits 0 |
| FI-02 | cured in the plan; the checklist text is still open | PLAN §5 (`:274-284`) is the one record. §6 `:413` and §1 `:21` agree with it. `release-gates.py` exits 0. What remains is the conflict between the owner's ruling and checklist row 7's fixed text. Fix-10 listed it as open item 2, and the driver has not amended the text. See FJ-01 |
| FI-03 | cured as named | LEDGER `:417` T-45 is BUILD at W-H.6, marked DISEASE and decided in a wave of its own. W-L.7 item 6 no longer hangs on "if W-H.2 cures T-45" |
| FI-04 | cured as named | LEDGER `:403` BG-ONWARD-4 is RETIRE (DECLINE) with its grounds and no re-trigger. `ledger-terminal.py` exits 0 |

## Gates re-run at `4a76c9f2`

**Static gates, all 101 specs.** Pass 9's extractor (`crit-9/extract.py`), unchanged, gives 927 spans:
- 518 fragments;
- 102 harness spans;
- 6 struck spans;
- 301 runnable spans. Of these, 252 light commands ran 4 at a time with a 60 s cap, and the W-A.2 build/vitest spans ran serially with a 600 s cap.

Nonzero exits, light spans:

| band | nonzero / run | timeouts |
|---|---|---|
| 0 | 22/29 | 1 (W-0.7 G5, a `dist-demo` grep under load) |
| A | 39/40 | 0 |
| B | 26/27 | 0 |
| C | 19/20 | 0 |
| D | 6/7 | 0 |
| E | 29/32 | 2 (E6-G8, E6-G10, under load) |
| F | 3/3 | 0 |
| G | 20/22 | 0 |
| H | 11/12 | 0 |
| I | 19/19 | 0 |
| J | 4/4 | 0 |
| K | 11/11 | 0 |
| L | 24/26 | 0 |

**Every band reads RED.**

**Exit-0 spans.** Each is a hold line, a recorded value, or a half run without its plant, as pass 9 read them, with these exceptions:
- **W-E.11 E11-G3 and W-G.1 G1-G11** exited 0 before the build: they read `dist/`, and the worktree had none. After `npm run build` both exit **1**, matching pass 9.
- **W-0.1 G5** (`node scripts/verify-export-types.mjs`) exited 1 before the build and **0** after, as a hold line.
- **W-0.8 G18** exits **0**. See FJ-03.
- **W-H.6 H6-G3** exits **0**, as its hold line states. See FJ-04.
- **W-0.11 G5 and W-0.8 G14's floor half** exit 0, labelled hold lines.

**Fix-10's static gates, re-run here.**

| gate | exit |
|---|---:|
| W-0.8 G4 | 1 |
| W-0.8 G10 | 1 |
| W-0.8 G11 (`test -f`) | 1 |
| W-0.8 G14, first half | 1 |
| W-0.8 G15 | 1 |
| W-0.8 G16 | 1 |
| W-0.3 G9, half 1 | 1 |
| W-0.3 G9, half 2 | 1 |
| W-0.11 G4 | 1 (the census file is absent, so `node` cannot load it) |

**BLOCKER families.**
- **F-01 (W-A.2).** All five runnable spans exit **1**:
  - A2-G1, A2-G4 and A2-G9: no test files found, because the files are the wave's to write;
  - A2-G8: `3 failed | 151 passed | 2 expected fail`;
  - A2-G10: `3 failed | 11 passed`.

  Pass 9 read A2-G8 and A2-G10 as exit 0 run bare. Here each fails on `boot-graph.test.ts` in a freshly checked-out worktree that has just been built. That is the freshness defect A2-G10 is born to catch, so both stay RED.
- **F-68 (W-0.7, W-L.7, W-L.8).** These have no runnable build/vitest spans. Their light spans are in the band table above.
- **F-21 (W-E.2).** Its gates are Chromium-only and were not run (no browser). Fix-10 changed none of them.

**Not re-run here:**
- every browser, `$H`, `$D3_OUT`, GPU and wired gate;
- appendix-extracted gates;
- fix-10's paint probes (O-89 G7/G8, H6-G1/G2). Their probe source is printed in `fix-10.md` appendix V; no browser was available.

## Row 1 · families placed

No finding. `audit/REGISTRY.md` has 85 `#### F-nn` headers. PLAN §3's 101 rows name all 85 (0 missing, 0 extra, by script). No family has more than one unsplit placement. The new placements are named splits:
- W-0.11: F-31, the O-87 lighting-token split;
- W-H.6: an F-13 split;
- W-0.8: F-16 extent/morph, F-17 whole, F-29 O-84a split.

## Row 2 · gates exist and are RED at HEAD

Every spec has a §5 with at least one gate. W-F.5's gates are in its appendix A, as before.

### FJ-02 · W-0.11 G1, G2 and G3 pass at HEAD as written

- **Where.** `waves/W-0.11.md:72-74`.
- **The gates.** Each is `node scripts/probes/band-0/lighting-census.mjs . | grep -c '^<KIND>'` and passes when it "prints 0". The recorded HEAD readings are **5**, **2** and **2**.
- **Defect.** `scripts/probes/` does not exist at HEAD (`ls scripts/probes` → No such file or directory). The census lands with this wave (§4, appendix A).
  - Run as written at HEAD, `node` fails to load the file, and `grep -c` on empty input prints **0**. All three gates read their pass value while the defect stands: two stacked modal shadows, two dock halos and five unlowered radii.
  - The recorded readings came from fix-10's scratch copy of the census (`fix-10.md`, FI-01 "O-87"), not from the gate's own path.
  - PLAN §1, "Gate paths and the base re-run" (`PLAN.md:29`), forbids exactly this: "No gate enters a wave green unless it is a labelled hold line". G1-G3 are not hold lines.
  - G4 (`exit 0`) is RED at HEAD only because the file is absent. A wave that lands any census exiting 0 passes it.
- **Evidence.** In this seat's worktree at `4a76c9f2`:
  - `node scripts/probes/band-0/lighting-census.mjs . 2>/dev/null | grep -c '^BLUR'` prints `0`, and the same for `^STACKED` and `^HALO`;
  - `node scripts/probes/band-0/lighting-census.mjs .` exits 1 (module not found).
- **Class.** A gate passes on a printed count, and its reader is a file the wave itself lands. Among the "prints 0" gate cells over `waves/*.md`, only W-0.11 G1-G3 have this shape (`grep -n "| prints 0"`). Every other `grep -c` gate tests through `test … -eq 0`, over files that exist at HEAD.

### FJ-03 · W-0.8 G18, the docket gate, exits 0 at HEAD; its recorded reading is false

- **Where.**
  - The gate: `waves/W-0.8.md:181`, `! grep -qE '^\| DOCKET-O-88 \|.*\| pending \|' docs/tranches/BL/LEDGER.md`, which passes on exit 0. Its HEAD reading is recorded as "**exit 1**: the docket row reads `pending`". `fix-10.md` repeats the reading ("G18 · docket gate · exit 1").
  - The row: `LEDGER.md:340`, whose status cell is `pending; asked with the 10.2.0 publish go`.
- **Defect.** The pattern needs the cell to be exactly ` pending `. The cell carries a suffix, so `grep` finds nothing and the `!` turns that into exit 0. The gate reads the owner's word as given while the owner has not answered. It can never go RED on the row as written: it is vacuous (row 3) as well as not RED at HEAD (row 2).
- **Evidence.**
  - Run at HEAD: exit **0** in this seat's light run and again by hand.
  - `awk -F'|' '/^\| DOCKET-O-88/ {print $5}' LEDGER.md` prints ` pending; asked with the 10.2.0 publish go `.
  - The other docket rows whose status reads `pending` (OW-1, OW-3 to OW-9d, DOCKET-11.0.0-TAG, DOCKET-Q-10, DOCKET-Q063) are bare `pending`. No other spec gate greps a docket row: W-L.8's G-L8-7 reads them through `verify-ledger.mjs`. This is the one instance.

## Row 3 · vacuous gates

FJ-03 above is also a row-3 instance.

### FJ-04 · W-H.6 H6-G3 is fenced to one file while the cure is written in others

- **Where.** `waves/W-H.6.md:66`: `! git grep -nE 'inset: *-?[0-9.]+px' -- src/styles/glass/ladder.css`. It is a hold line whose bite is "an overshoot written `inset: -32px` fails it".
- **Defect.** The gate claims "the overshoot is computed from the rung's radius token, not written as a length", but it scans only `ladder.css`. The spec puts the overshoot elsewhere:
  - §3 item 2: "which element carries it is the converged spec's", and both ladder pseudo-elements are candidates;
  - §4 names `src/styles/glass/material.css` as "the pseudo-element the seat uses";
  - §3 item 4 extends the seat to `glass-capsule.css`, `surfaces.css`, `surfaces-pager.css` and `utilities/components.css`.

  An `inset: -32px` written in `material.css` or in any of those four files passes H6-G3. The stated bite therefore holds only for the one file the cure is least likely to write.
- **Evidence.** `git grep -lE '\.glass-resting\b' -- 'src/**/*.css'` lists `ladder.css`, `material.css`, `rim.css` and `a11y-fallback.css`. The rung's material rule is `material.css:38`, which is outside the gate's pathspec. H6-G3 exits 0 at HEAD, as recorded.

## Row 4 · π and DELTA

No finding. Each new visual claim carries paired captures with π rows:
- W-0.11 §6: plates, Dialog and Sheet, dock, owner's glance;
- W-H.6 §6: edge pair, corner crop, consumer capture;
- W-0.3 §6 row `:110`: O-89 at 390 and 260 px;
- W-0.8 §6.

Real Safari is UNMEASURED in each, as stated.

## Row 5 · ledger rows

No finding. `ledger-terminal.py` and `inbound-fold.py` exit 0. Every docket row names a wave (`LEDGER.md:322-341`). The rows fix-10 moved from W-I.1 to W-0.8 point at a spec that names them in its §1 (`inbound-fold.py`'s WAVE arm). FJ-05 is about items that have no row at all, so it is filed under row 9.

## Row 6 · loop pre-emption

No finding. Each new loop wave lands only from its loop's converged spec, and its header says so:
- W-0.8: "never before D2 meets its gate";
- W-0.11: D3;
- W-H.6: D3.

The old O-83 exception is gone because W-0.8 is now D2's own wave (PLAN `:21`, `:47`). No wave builds ahead of a loop.

## Row 7 · the DAG

**The walk.** `plan_dag.py` with `graphlib`, run here, reads:
- 101 specs and 101 §5 rows, none missing either way;
- a full topological order of 101, so no cycles;
- 0 dangling ids and 0 edges into a later band;
- 0 band-0 edges to a wave outside band 0.

§5 is the one record. §6 `:413` and §1 `:21` cite it and agree with it.

### FJ-01 · band 0 now depends on D2 and on a non-veil D3 row; the checklist text admits only "D3 for the veil rows"

- **Where.**
  - PLAN §5 `:281`: `W-0.8 | D2 gate, W-0.3, W-0.11`.
  - PLAN §5 `:284`: `W-0.11 | D3 gate, W-0.1, W-0.3`. W-0.11 is the lighting-token wave (blur radii and shadows), not a veil row.
  - PLAN §6 `:413`: "D2 and D3 gate 10.2.0".
  - `release-gates.py` prints `band-0 loop gates {D2, D3}`.
- **Defect.** Checklist row 7 reads: "the 10.x minor band depends on nothing outside itself except D3 for the veil rows". Band 0 now has two outside dependencies that wording does not admit:
  - the D2 gate (W-0.8);
  - a D3 gate on a row that is not a veil row (W-0.11).
- **The plan is right to do this.** Both come from the owner's in-session rulings of 2026-10-06:
  - O-88: "ALL OF IT IN 10.2.0 … gated on D2 converging as well as D3" (`audit/INBOUND.md:45`, `FORMATION-PROGRESS.md:112`);
  - O-87: "the token-level refinement rides 10.2.0" (`INBOUND.md:44`).
- **The cure is the checklist text, not the plan.** The fixed wording is out of date. Fix-10 open item 2 asked the driver to amend it, and this pass's prompt still carries the old wording. The cure is to amend row 7 to "except D3 (W-0.1, W-0.2, W-0.11) and D2 (W-0.8), per the owner's O-87 and O-88 rulings". Editing the plan to satisfy the old text would overrule the owner.

## Row 8 · breaks and aliases

No finding.
- **W-0.8 §7.** It carries a MIGRATION row for each O-88 break:
  - `useDockSearch`'s four scroll members → `GlassDock`'s `scroll`;
  - a consumer `ScrollProgressRim` → `scroll.rim`;
  - the summary's `aspect-ratio`;
  - `.metric__value`'s `3ch`;
  - the `--dock-cap-rest` value.

  It keeps no alias. The owner's confirmation of breaks in the minor is LEDGER `DOCKET-O-88`, and its gate is FJ-03's.
- **W-0.11.** It keeps every name (G5).
- **W-H.6 §7.** Its row is conditional on the converged seat, stated with the condition under which it is recorded "not needed".

## Row 9 · re-booked chronics

### FJ-05 · L04-F25's carried items (L04 rows 38, 40, 41) have no decided row, and the one wave that names L04-F25 misdescribes it

- **Where.**
  - **The finding.** `audit/round-1/L04.md:39`: `L04-F25 | LOW | Moot items still carried | … dispersion rims retired in code; ./drawer cured N-6; W-ATLAS not a glass-ui row; #76 L2 adopts and g10 are consumer acts; GREENFIELD-TERMINAL figures | RETIRE`.
  - **L04's master ledger rows.** "Count = closes ridden undecided … **D** = DISEASE (≥2). 'Re-booked' = restated as carried at a later close without a decision":
    - row 37, `#76 L2 consumer adopts + g10 | 3 D`;
    - row 38, `GREENFIELD-TERMINAL :233/:239 dock figures | 3 D | yes, five restatements`;
    - row 40, `./drawer MIGRATION item`;
    - row 41, `W-ATLAS`.
  - **The evidence for row 38.** `L04.md:450`: "restated five times as 'owed, out of fence' (`EXECUTION-PROGRESS.md:4994,5173,5463,5652,5836,6281`) … All RETIRE".
  - **The wave.** `waves/W-L.8.md:9` lists L04-F25 among F-12's members. `:20` describes `L04-F24, L04-F25, L04-F26` together as "close duties that never fired: #70 archaeology, the P-6 audit at 10.0.0, #15 provenance hooks, Q063". Those are L04-F24's and L04-F26's items. L04-F25 is the moot-items finding.
- **Defect.**
  - **Row 38 is a disease row.** It rode three closes and was re-booked five times. The charter (`CHARTER.md:23`) needs a decided row from a wave of its own. The audit's decision is RETIRE, and no plan record carries it.
  - **Row 41 (W-ATLAS) and row 40 (`./drawer`)** are carried items with no terminal in the plan.
  - **g10** (row 37's second half) has no row. `#76a` (FOLD, W-L.7) takes "the adopts" only.
  - **The dispersion rims** (RT-71A, `LEDGER.md:177`, W-H.3) are decided. That is the one item of L04-F25 the plan carries.
  - **W-L.8 names the id but decides none of these.** `grep -n -i "moot\|ATLAS\|drawer\|GREENFIELD\|dispersion\|g10" waves/W-L.8.md` finds nothing. `chronic-decided.py`'s MEMBER arm clears L04-F25 on the name alone.
- **Evidence.** Over `LEDGER.md` and `ledger/*.md`:
  - `grep -c "GREENFIELD-TERMINAL"` → 0;
  - `grep -rn -i "W-ATLAS\|\./drawer\|\bg10\b\|figure"` → no row for any of the four;
  - `grep -c "L04-F25"` → 0 in `LEDGER.md`.

  The three `waves/W-G.*` hits for GREENFIELD-TERMINAL cite it as the aurora's and blob's spec of record, not the dock figures.
- **The class the sweep misses.** Every row of L04's master ledger is a carried item with a close count. 38 are marked **D**. `chronic-decided.py` reads none of them by number (its `FIND` is `Lnn[ab]?-F?nn` or `Rn-n-n`). A sweep for this class reads `L04.md:48-95` row by row and asks, for each row, whether a LEDGER row or a spec decides that item, not just the finding that lists it. This seat spot-checked 15 of the 38 by keyword. Rows 38, 40 and 41 were the misses; the other 12 checked have a ledger row or a deciding spec.

## Notes outside the checklist (not counted)

- **A2-G8 and A2-G10 run bare.**
  - **This seat.** Both exit 1 here (`boot-graph.test.ts`: 3 failed) in a freshly built worktree.
  - **Pass 9.** Both read exit 0 bare.
  - **Why.** The difference is file mtimes, which is the defect A2-G10 exists to catch.
  - **Why it is not a finding.** Each still has a RED reading at HEAD.
- **W-0.3 G9, half 1** keys on `class="[^"]*\btruncate\b` on the `readoutEl` line. A cure that moves the class into `:class` passes the static half without curing anything. G7, the paint row, still holds the class, so this is noted, not filed.
- **W-0.8 G5-G9** read the D2 harness under `design/`. This seat did not run them (fence and no browser); their readings are fix-2's and the W-I.1 seat's.
- **Fix-10's open items 3, 5, 6 and 7:**
  - item 3: W-0.11's family cell;
  - item 5: RUL R-7;
  - item 6: W-J.2's D5 header;
  - item 7: Safari.

  These stay open as fix-10 listed them, and none maps to a checklist row.
- **The machine.** Load average 150-545 and swap nearly full for the whole seat. Three light spans timed out at 60 s (W-0.7 G5, E6-G8, E6-G10). In pass 9 they exited 1, 0 and 0, and fix-10 did not touch those waves.
