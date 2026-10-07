# BL — formation fix, seat 11

| field | value |
|---|---|
| seat | formation fix seat 11, before audit pass 11. Answers `formation-audit/pass-10.md` (FJ-01 to FJ-05) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `734b38a1`. `git diff --stat ecef2007 734b38a1 -- docs/tranches/BL ':!docs/tranches/BL/design'` touches `FORMATION-PROGRESS.md` only, so the plan this seat started from is the one pass 10 read |
| where probes ran | a worktree at `734b38a1` (`.claude/worktrees/bl/formation/fix-11/wt`, `node_modules` and `tests-visual/node_modules` symlinked). No build. Every plant there was undone with `git show HEAD:<file> > <file>` or `rm`; `git status --short` read 0 lines before `git worktree remove --force` (`git worktree list \| grep -c fix-11` → 0). The before runs read a `git archive` copy of the HEAD plan through `BL_ROOT` |
| machine | load average 320-370 the whole seat (`uptime`); the worktree checkout took 11 min 34 s. No timing cell was read. No browser ran (the Playwright and chrome-devtools MCP servers failed to connect). Real Safari is UNMEASURED (OW-3) |
| writes | `PLAN.md`; `LEDGER.md`; `waves/W-0.11.md`, `W-0.8.md`, `W-H.6.md`, `W-L.8.md`, `W-B.15.md`, `W-G.2.md`; under `formation-audit/sweeps/`: `gates.py` (new shared reader), `fail-open-gates.py` and `hold-line-scope.py` (new, each with its `.out`), `chronic-decided.py` (arm L04-ROW) and `release-gates.py` (arm CHECKLIST-7), a `# ===== fix-11` section appended to every older `.out`; this file. The plan has no `MIGRATION.md` |
| fences | nothing under `design/` read or written; no git write in the checkout; no sibling repo touched; every sweep ran with `PYTHONDONTWRITEBYTECODE=1` and `sweeps/` has no `__pycache__`. One slip, caught: the first plant test of H6-G3 ran under zsh, which does not split `$F`, so its readings were void; they were re-run under `bash -c` and only those readings are cited |

## Result

Every finding is cured by class. FJ-01 is cured at its source: the driver amended checklist row 7 (`driver/bl-formation-audit-loop3.js`, `CHECK`), and the plan already followed the owner. This seat adds a sweep arm that holds the plan to the amended set, and fixes a count in §1 that the arm found.

| finding | class | sweep | before (HEAD plan) | after |
|---|---|---|---|---|
| FJ-01 | band 0's outside dependencies against the owner-ruled set (D3 for W-0.1, W-0.2, W-0.11; D2 for W-0.8), and every claim of that set | `release-gates.py`, new arm CHECKLIST-7 | **exit 1**, open 1 (`"Five band-0 waves are loop waves"` against 4) | **exit 0**, open 0 |
| FJ-02, FJ-03 | a gate in a fail-open form (`!`, `test -z`, a zero count, a printed value, a docket grep) that reads its pass value at HEAD, a script reader piped into a count, or a docket gate that cannot match its row | `fail-open-gates.py` (new) | **exit 1**, open 10 | **exit 0**, 126 fail-open rows run, open 0 |
| FJ-04 | a hold line that asserts absence, fenced to fewer `src`/`demo` files than its own §4 writes | `hold-line-scope.py` (new) | **exit 1**, open 1 | **exit 0**, open 0 |
| FJ-05 | a row of L04's master ledger (45 numbered carried items) with no deciding LEDGER row, a traced row that does not name the item, or a **D** row with no deciding wave | `chronic-decided.py`, new arm L04-ROW | **exit 1**, open 6 | **exit 0**, 45 rows traced, open 0 |

Both runs of each sweep are in its `.out`. The other sweeps, after: `borrowed-red.py` exit 0 (rows 1, open 0); `inbound-fold.py` exit 0 (ids 37, open 0); `ledger-terminal.py` exit 0 (ledger rows 824, open 0: it recounts §9 against the four new rows); `reshape-order.py` exit 0 (rows 83, open 0); `fl6-plate-reads.py /Users/mkbabb/Programming/glass-ui` exit 0 (reads 27, open 0). A column count over every table in the eight edited plan files finds 0 mismatches.

## What the sweeps found that pass 10 did not name

| sweep row | what it is | cure |
|---|---|---|
| `PASS-AT-HEAD W-B.15 B15-G3` | exits 0 at HEAD. Its HEAD cell gave a bite but did not label it a hold line, which PLAN §1 requires of a gate that enters a wave green | `waves/W-B.15.md:42`: HEAD cell opens "hold line:". The bite (a non-passive `wheel` listener in any `src` file) was already stated |
| `PASS-AT-HEAD W-G.2 G2-G4` | the same: "a guard on step 3's premise, not a born-RED", exit 0 at HEAD, unlabelled | `waves/W-G.2.md:61`: HEAD cell opens "hold line:"; its bite (a planted `device.destroy()`) was already stated |
| `CHECKLIST-7 PLAN.md` | §1 said "Five band-0 waves are loop waves" and listed four | `PLAN.md:38`: "Four" |
| `L04-ROW 33` | the morph discontinuity at `layers.css:348` (L04-F27, "FOLD into #48"): LEDGER `#48` said "the zero-width morph window goes with it" and no plan record named the site | `LEDGER.md:118`: `#48` names `layers.css:348`, a:55 and L04-F27 |
| `L04-ROW 36` | two unverified smells (C-14, C-15), **D** in L04, RETIRE with no wave. W-L.8 listed their finding (L04-F24) and misdescribed it, as it did L04-F25 | `LEDGER.md:239-240`: wave `W-L.8`; `waves/W-L.8.md:20` and `:65` decide them |

The run arm also listed four rows it did not keep: A1-G11 (it needs a prior Playwright run; the arm now skips any row with a heavy span, not only heavy commands), C4-G7 (its pass cell is a bare `0`; the arm now reads bare values as a printed pass, and C4-G7 prints 20: RED), and two readings that came from running plan-file spans against the worktree's committed `LEDGER.md` instead of the copy under audit (the arm now points `LEDGER.md`, `PLAN.md` and `waves/` reads at that copy, and nothing else). Each refinement is in the sweep, and the before run in `fail-open-gates.out` is the refined sweep on the HEAD plan.

## FJ-01 · checklist row 7

**Cured at its source.** The driver's `CHECK` now reads: band 0 "depends on nothing outside itself except the two design loops the owner ruled into 10.2.0 on 2026-10-06: D3 (the veil rows and W-0.11's lighting tokens, O-87) and D2 (W-0.8's dock collapse unit, O-88)". PLAN §5 (`W-0.8 | D2 gate, W-0.3, W-0.11`; `W-0.11 | D3 gate, W-0.1, W-0.3`) matches it with no edit.

- `release-gates.py`, arm CHECKLIST-7. Fails when any band-0 wave's loop gates differ from that set, when any band-0 wave has a §5 edge to a wave outside band 0, and when PLAN §1 miscounts band 0's loop waves.
- `PLAN.md:38`: "Five" → "Four".
- `PLAN.md:391`: the shared-kit note cites both rulings and the arm. §5 stays the one record.
- `PLAN.md:11`: the amendment line.

## FJ-02 · W-0.11 G1 to G4

**Cause.** `node <census> | grep -c '^KIND'`: the pipeline's status is grep's, and with the census absent `grep -c` prints 0, the pass value.

**Cure.** `waves/W-0.11.md:72-75`.
- **G1 to G3** now read the census's own summary line with a positive match, for example `node scripts/probes/band-0/lighting-census.mjs . \| grep -qE '^LIGHTING-CENSUS .* blur=0 '`. The line prints only when the census runs to its end.
- **G4** keeps "the census exits 0" and adds the census's own bite. It re-runs the census on `git archive v10.1.0 src/styles`, which must still print `LIGHTING-CENSUS stacked=2 halo=2 blur=5 open=9`. A census rewritten to report less fails it. This answers pass 10's "a wave that lands any census exiting 0 passes it".
- **`:81-83`** state the reason and the readings.

**Readings in the worktree.** Appendix A's census was copied to `scripts/probes/band-0/` for the second and third rows and removed after.

| state | G1 | G2 | G3 | G4 | old G1-G3 printed |
|---|---|---|---|---|---|
| HEAD, census absent | exit 1 | exit 1 | exit 1 | exit 1 | 0, 0, 0 (the defect) |
| census planted, HEAD tokens (`stacked=2 halo=2 blur=5 open=9`) | exit 1 | exit 1 | exit 1 | exit 1 | 5, 2, 2 |
| census + fixture (radii −1 to −2 px, modal one layer, dock `0 2px`) → `open=0` | exit 0 | exit 0 | exit 0 | exit 0 | — |

## FJ-03 · W-0.8 G18 and the docket row

**Two causes.**
1. The gate cell wrote `\|`. In a table cell that is the Markdown escape for a pipe, so the rendered regex `'^| DOCKET-O-88 |.*| pending |'` is an alternation. Run under `bash` in the worktree it exits 0 (the critic's reading). The other nine docket gates write `\\|`.
2. The LEDGER answer cell read `pending; asked with the 10.2.0 publish go`, which the PLAN §1 template (bare `pending`) cannot match.

**Cure, at the record.**
- **`LEDGER.md:340`.** The answer cell is a bare `pending`. "Asked with the 10.2.0 publish go" moves to the question cell.
- **`LEDGER.md:318`.** A pending cell is `pending` and nothing else. OW-2 and DOCKET-10.2.0-TAG are the two partial answers, and no gate reads them.
- **`waves/W-0.8.md:181`.** G18 is written in the template's form (`\\|`).

**Reading.** `bash -c "! grep -qE '^\| DOCKET-O-88 \|.*\| pending \|' docs/tranches/BL/LEDGER.md"` → **exit 1** on the plan as left.

**Fail-open arm, before and after.** Before, it listed G18 twice: DOCKET (outside the template's form) and PASS-AT-HEAD (exit 0). After, it lists neither.

## FJ-04 · W-H.6 H6-G3

**Cure.**
- **`waves/W-H.6.md:66`.** The gate reads all six files §3 and §4 say the seat may write: `ladder.css`, `material.css`, `glass-capsule.css`, `surfaces.css`, `surfaces-pager.css` and `utilities/components.css`. Its pattern now catches a negative length on `inset`, `inset-block`, `inset-inline`, `top`, `right`, `bottom` or `left`, optionally `-start`/`-end`.
- **The pattern is a negative length only.** `--overlay-viewport-inset: 4px` (`overlay-plate.css:286`) does not trip it.
- **`:54`.** §4 names the four files by path, so the sweep can read them.

**Readings under `bash -c` in the worktree.**
- HEAD: exit 0. It is a hold line.
- `.x::after { inset: -32px; }` appended to each file in turn: exit 1, 6 of 6.
- `inset-inline-start: -8px` in `surfaces.css`: exit 1.
- The old form with the same plant in `material.css`: exit 0. That is FJ-04 reproduced.

## FJ-05 · L04's carried items

**Ledger.** Four rows are added in `LEDGER.md:423-426`, all RETIRE in W-L.8:

| row | item | note |
|---|---|---|
| `L04-M37` | g10 | the value.js pinned worktree, `BK/ASK.md:41`; a consumer act (E-6). #76's adopts stay `#76a` |
| `L04-M38` | the GREENFIELD-TERMINAL `:233/:239` dock figures | DISEASE, 3 closes, five restatements; decided in W-L.8, its family's wave (F-12) |
| `L04-M40` | `./drawer` | CURED by N-6 |
| `L04-M41` | W-ATLAS | not a glass-ui row |

Other ledger edits:
- `:239-240`: C-14 and C-15 take wave W-L.8.
- `:118`: `#48` names `layers.css:348`.
- §9 recounted: RETIRE 187, rows 824, DISEASE 46.

**Wave.** `waves/W-L.8.md`.
- **`:20-22`.** One §1 row per finding. L04-F24 is the smells. L04-F25 is the moot items, with each LEDGER id. Pass 10's misdescription is struck.
- **`:58-71`.** §3.3 decides each item.
- **`:118`.** New G-L8-15, `test -f docs/tranches/BL/FINAL.md && ! grep -qiE '…' docs/tranches/BL/FINAL.md`. It is the enactment: FINAL.md exists and carries none of them.
  - HEAD: **exit 1** (FINAL.md absent).
  - A planted FINAL.md naming W-ATLAS: exit 1.
  - A clean one: exit 0.
  - Each plant removed.
- **`:135`.** §8 names the rows.

**The rest of the class.** `chronic-decided.py`'s L04-ROW arm traces all 45 rows of `audit/round-1/L04.md`'s master ledger, the only numbered carried-item table in `audit/`, to LEDGER rows. It checks:
- each traced id is a LEDGER row with a terminal;
- the traced rows, or their waves' specs, name the item by pattern;
- every **D** row has a deciding wave.

It also fails if the table changes shape. The remaining 39 rows were already decided. 41 of the 45 resolved before this seat's ledger edits, and rows 33 and 36 are the two the table above names.

## Open

1. **Real Safari** is UNMEASURED (OW-3) for every gate this seat touched.
2. **The run arm judges light static spans only.** That is 126 rows after this seat. Browser, `$H`, build and `dist/` rows are judged at their wave's base re-run (PLAN §1).
3. **Fix-10's open items 3 to 6 stand as fix-10 listed them:** W-0.11's family cell, W-0.8's harness readings, RUL R-7, and W-J.2's D5 header. None maps to a finding here.
