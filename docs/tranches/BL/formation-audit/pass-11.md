# BL — formation audit, pass 11

| field | value |
|---|---|
| seat | formation critic, pass 11. Authored none of `PLAN.md`, `waves/`, `LEDGER.md`, passes 1-10, fixes 2-11 or the sweeps |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `b1d82396` (fix 11 committed). `git status --short docs/tranches/BL` outside `design/` was empty before this file was written, so the plan read here is fix-11's as committed |
| inputs read | `PLAN.md` (§1, §2, §3 and §5 by script); `waves/` by script (every §5 through `sweeps/gates.py`), and in part `W-0.1`, `W-0.2`, `W-0.7` §5, `W-0.8` §1, §5, §7, `W-0.11` §4-§6, `W-A.2` §5, `W-B.13` §5, `W-E.2` §5, `W-H.6` §3-§5, `W-I.5` in full, `W-L.8` §1, §3.3, §5; `LEDGER.md` by script plus §4 (the docket), `:117-118`, `:239-240`, `:423-426`, `:552`; `audit/REGISTRY.md` family headers; `audit/round-1/L04.md` master ledger (`:44-95`) and `L04-F27` (`:41`, `:471`); `audit/INBOUND.md`; `formation-audit/pass-10.md`; every file under `sweeps/`; `formation-audit/fix-11.md` last |
| where probes ran | worktree `.claude/worktrees/bl/formation/crit-11/wt` at `b1d82396`, `node_modules` and `tests-visual/node_modules` symlinked. Demo build (`vite build --config demo/vite.demo-dist.config.ts`) exit 0. Every plant restored with `git show HEAD:<file>`; `git status --short` read 0 lines before `git worktree remove --force` (`git worktree list \| grep -c crit-11` → 0). Load average 45-58 at the probes (`uptime`); no timing cell was read. No browser ran: the Playwright and chrome-devtools MCP servers failed to connect. Real-Safari cells are UNMEASURED (OW-3) |
| fences | no source edit, no git write, nothing under `design/` read, run or written, no sibling repo touched. Every sweep ran with `PYTHONDONTWRITEBYTECODE=1`; `sweeps/` has no `__pycache__`. The one write in the checkout is this file |

The checklist has nine fixed rows. Each finding names its row. Notes at the end are outside the checklist and do not count.

## Result

| row | check | result |
|---|---|---|
| 1 | all 85 families placed exactly once | PASS |
| 2 | every spec has a gate; every gate RED at HEAD | PASS |
| 3 | no vacuous gate | FAIL (FK-01) |
| 4 | every visual claim carries π/DELTA | PASS |
| 5 | every ledger row terminal, pointing at a wave that covers it | FAIL (FK-02) |
| 6 | no loop wave pre-empts its loop, except owner-ratified and recorded exceptions | PASS |
| 7 | DAG acyclic, one source; band 0 external only on D3 (veil rows, W-0.11) and D2 (W-0.8) | PASS |
| 8 | every break has a MIGRATION row, no alias | PASS |
| 9 | no re-booked chronic | FAIL (FK-03) |

**clean = false.** Three findings. All five of pass 10's are cured as named, and every sweep exits 0. The new findings:
- FK-01: fix-11's widened H6-G3 still passes a negative overshoot written in any form but `-<n>px` first;
- FK-02: L04 master row 33 (the morph discontinuity at `layers.css:348`) is folded into `#48`, whose wave does not touch it;
- FK-03: `chronic-decided.py`'s L04-ROW arm accepts the LEDGER row's own words as coverage, which is how FK-02 passed it.

## Sweeps, re-run at `b1d82396`

| sweep | command | exit | summary line |
|---|---|---:|---|
| `reshape-order.py` | `python3 reshape-order.py` | **0** | `rows 83, open 0, stale 0` |
| `borrowed-red.py` | `python3 borrowed-red.py` | **0** | `rows 1, open 0, stale 0` |
| `fl6-plate-reads.py` | `python3 fl6-plate-reads.py /Users/mkbabb/Programming/glass-ui` | **0** | `reads 27, open 0` |
| `inbound-fold.py` | `python3 inbound-fold.py` | **0** | `ids 37, open 0, stale 0` |
| `release-gates.py` | `python3 release-gates.py` | **0** | `waves 101, band-0 loop gates {D2, D3}, open 0` |
| `chronic-decided.py` | `python3 chronic-decided.py` | **0** | `members 51, ledger rows 824, L04 master rows 45, open 0` |
| `ledger-terminal.py` | `python3 ledger-terminal.py` | **0** | `ledger rows 824, open 0` |
| `fail-open-gates.py` | `python3 fail-open-gates.py <crit-11 worktree>` | **0** | `gate rows 730, fail-open rows run 126, docket rows 20, open 0` |
| `hold-line-scope.py` | `python3 hold-line-scope.py` | **0** | `static hold lines with paths 4, open 0` |
| `gates.py`, `plan_dag.py` | `python3 -c "import plan_dag, gates"` (shared readers) | **0** | used for rows 1, 2, 7 |

`fail-open-gates.py` run bare prints its usage line and exits 2; it needs a checkout of HEAD as its argument, as its docstring says. The run above is the one with that argument.

**How wide each sweep is against its class:**
- **`chronic-decided.py` is too narrow (row 9, FK-03).** Its L04-ROW arm passes a row when the pattern matches the traced LEDGER row's text *or* its wave's spec. A fix seat can satisfy it by writing the item's name into the LEDGER row without the wave covering it. Run against wave specs only, 4 of the 45 patterns miss (rows 16, 33, 34, 45). Rows 16, 34 and 45 are covered by the spec in other words (`W-B.7.md:16` #44; `W-A.4.md:19,21` captureScreenshot and C-16; `W-B.1` "disease"). Row 33 is not: FK-02.
- **No sweep reads a hold line's pattern against the claim it states.** `hold-line-scope.py` reads which files a hold line covers, not which spellings its pattern catches. That is a gap, not a finding on the sweep; FK-01 sits on row 3.
- **`reshape-order.py`, `borrowed-red.py`, `fl6-plate-reads.py`, `inbound-fold.py`, `release-gates.py`, `ledger-terminal.py`, `fail-open-gates.py`, `hold-line-scope.py`: no missed instance found.** This seat ran every light span itself (below). Every exit-0 span was a labelled hold line, a half of a born-RED row, a printed value that is not the pass value, or state-dependent as its own cell says. `fail-open-gates.py` agrees with that census.

## Pass 10, re-verified

| id | verdict | reading here |
|---|---|---|
| FJ-01 | cured | The checklist text is amended (this pass's prompt carries row 7 as "D3 (the veil rows and W-0.11's lighting tokens, O-87) and D2 (W-0.8's dock collapse unit, O-88)"). PLAN §5 `:274-284`: band 0's only outside edges are `D3 gate` (W-0.1, W-0.2, W-0.11) and `D2 gate` (W-0.8). `PLAN.md:38` reads "Four band-0 waves are loop waves" and lists four. `release-gates.py` exits 0 |
| FJ-02 | cured | In the worktree at HEAD (census absent), W-0.11 G1, G2, G3 and G4's first half each exit **1** under `bash -c` (`MODULE_NOT_FOUND`, `grep -q` finds no summary line). The bite with the census planted is fix-11's reading; no census exists at HEAD to re-plant |
| FJ-03 | cured | `bash -c "! grep -qE '^\| DOCKET-O-88 \|.*\| pending \|' docs/tranches/BL/LEDGER.md"` → exit **1**. LEDGER `:340`'s answer cell is a bare `pending`. `grep -cE '^\| (OW\|DOCKET)-[^\|]*\|.*\| pending \|' LEDGER.md` → 15, matching `:552` |
| FJ-04 | cured as named; see FK-01 | H6-G3 now reads all six files of §3/§4 (`W-H.6.md:54,66`). `.x::after { inset: -32px; }` appended to `material.css` → exit 1. The scope defect is gone. The pattern defect in FK-01 is new |
| FJ-05 | cured as named; see FK-02 and FK-03 | `LEDGER.md:423-426` add L04-M37, L04-M38 (DISEASE), L04-M40 and L04-M41, all RETIRE in W-L.8. `W-L.8.md:20-21` describes L04-F24 and L04-F25 correctly; `:58-71` decides each item. G-L8-15's pattern bites under macOS `grep -E`: each of `g10`, `GREENFIELD-TERMINAL`, `flex-basis` and `run.css 15:29:40` in a scratch file → match 0; plain text → 1. Row 33 of the same L04 table is FK-02 |

## Gates re-run at `b1d82396`

**Static gates, all 101 specs.** `gates.py` reads 730 gate rows. A runner in this seat's scratchpad ran every non-struck span that starts with a command and names no build, browser, network, `$H`, `$D3_OUT`, `dist/`, `.cache/` or placeholder: 232 spans, 4 at a time, 60 s cap, in the worktree. Plan-file paths pointed at the committed plan.

| band | nonzero / run | timeouts |
|---|---|---|
| 0 | 24/29 | 0 |
| A | 38/39 | 0 |
| B | 25/26 | 0 |
| C | 19/20 | 0 |
| D | 3/4 | 0 |
| E | 27/28 | 0 |
| F | 1/1 | 0 |
| G | 17/18 | 0 |
| H | 9/10 | 0 |
| I | 19/19 | 0 |
| J | 4/4 | 0 |
| K | 10/10 | 0 |
| L | 21/24 | 0 |

**Every band reads RED.**

**Exit-0 spans.** Each of these is accounted for:
- **Labelled hold lines.** W-0.1 G5 and W-0.11 G5 (the roster `git diff`), W-0.10 G3, W-0.2 G3, W-B.15 B15-G3, W-D.2 D2-G5 (no `a/dist`, stated as not run), W-G.2 G2-G4, W-H.6 H6-G3, W-L.1 G-L1-5, W-L.3 G-L3-9.
- **Halves of a born-RED row.** W-0.8 G14's floor half: its first half exits 1.
- **Printed values that are not the pass value.**
  - W-C.4 C4-G7 prints counts summing to 20 against a pass of 0.
  - W-L.5 G-L5-4 prints `4.0.0` against `≥ 4.1.0`.
- **A fragment.** W-E.6 E6-G10's `node --experimental-strip-types` span.
- **State-dependent, as its own cell says.** W-A.1 A1-G11 ("after any `npx playwright test`") prints 0 in a fresh worktree. In the main checkout, `git status --porcelain --ignored -- docs/tranches/BG docs/tranches/BA | wc -l` → 2708, which is RED.

**BLOCKER families.**
- **F-01 (W-A.2).**
  - A2-G1 (`npx vitest run tests/gates/roster.test.ts`): exit **1**, no test files.
  - A2-G9 (`frost-computed.test.ts`): exit **1**, no test files.
  - A2-G10, after the demo build and `touch src/components/badge/index.ts`: exit **1**, `the dist-demo it measures is NEWER than every source it is built from`.
  - A2-G8 with the webgl2 growth plant in `src/components/blob/shaders/metaball.frag.ts`: `1 failed | 153 passed | 2 expected fail`. The one failure is `boot-graph.test.ts`'s freshness arm, not a fence naming the plant. The pass condition ("the failure naming the new member") is unmet, so the gate is RED, as recorded.
  - A2-G3 and A2-G7 are in the light run: both exit 1.
- **F-68 (W-0.7, W-L.7, W-L.8).** Every light span is in the table above. G-L8-15 exits 1 (no FINAL.md).
- **F-21 (W-E.2).** The static spans E2-G9, E2-G11 and E2-G12 exit 1. Its paint gates are Chromium-only and were not run (no browser). Fix-11 touched none of them.

**Not re-run here:** every browser, `$H`, `$D3_OUT`, GPU and wired gate; every gate that reads `design/` (fence); the paint probes of fix-10's appendix V.

## Row 1 · families placed

No finding. `audit/REGISTRY.md` has 85 `#### F-` headers. PLAN §3's 101 rows name all 85, with F-30 as its registry-declared halves F-30a (W-E.8) and F-30b (W-J.1). No family has two unqualified placements: F-16, F-21, F-28 and F-33 each have one unqualified holder (W-0.8, W-E.2, W-E.6, W-E.9) plus named splits elsewhere. W-0.8's own cell says "less #48 and the corner and edge-witness split".

## Row 2 · gates exist and are RED at HEAD

No finding. Every spec has a §5 gate row (730 rows over 101 specs). Every band has nonzero spans, and every exit-0 span is accounted for above. Fix-11's relabels hold up:
- W-B.15 B15-G3 and W-G.2 G2-G4 now open their HEAD cells with "hold line:", each with its bite.
- G-L8-15 is born RED (exit 1).

## Row 3 · vacuous gates

### FK-01 · W-H.6 H6-G3 passes the overshoot written as any negative length but `-<n>px` as the first value

- **Where.** `waves/W-H.6.md:66`. The gate is `! git grep -nE '(^|[^-a-z])(inset|inset-block|inset-inline|top|right|bottom|left)(-start|-end)?: *-[0-9.]+px' -- <six files>`. It passes when "the overshoot is computed from the rung's radius token, not written as a negative length".
- **Defect.** The pattern needs the value to begin with `-` and end in `px`. Three negative lengths pass it:
  - a negative length in another unit;
  - a negative length after a first value;
  - a literal length wrapped in `calc()`.

  The bite therefore covers only one spelling of the regression the cell names. This is the same class as FJ-04 (a hold line narrower than its claim), on the pattern axis instead of the file axis.
- **Evidence.** In the worktree at `b1d82396`, each line below was appended to `src/styles/glass/material.css` and H6-G3 was run under `bash -c`; the file was restored after each run:

  | plant | exit |
  |---|---:|
  | `.x::after { inset: -32px; }` | 1 |
  | `.x::after { inset: -2rem; }` | **0** |
  | `.x::after { inset: 0 -32px; }` | **0** |
  | `.x::after { inset: calc(-1 * 32px); }` | **0** |

  HEAD itself exits 0, as recorded.
- **Shape of a cure.** Fail on any negative literal length in any unit or position on those properties, and on a `calc()` whose operands hold no `var(`. The bite table should name each spelling.

## Row 4 · π and DELTA

No finding. Fix-11 added no visual claim. Its new gates (W-0.11 G1-G4, W-0.8 G18, W-H.6 H6-G3, G-L8-15) are static. The π rows of W-0.11 §6 and W-H.6 §6 stand as pass 10 read them, with real Safari UNMEASURED.

## Row 5 · ledger rows

### FK-02 · L04 master row 33, the morph discontinuity at `layers.css:348`, is folded into `#48`, and `#48`'s wave does not touch it

- **Where.**
  - **The audit.** `audit/round-1/L04.md:41` (`L04-F27 | LOW | The morph discontinuity (layers.css:348 ungated) … | FOLD into #48`) and master row 33 (`2 **D**`, re-booked "yes", "ungated").
  - **The ledger.** `LEDGER.md:118`, `#48 … BUILD | W-I.5 … The zero-width morph window goes with it: the morph discontinuity at layers.css:348 (the ungated width: 100%, a:55; L04-F27, L04 master row 33)`.
- **Defect.** W-I.5 does not cover the item:
  - `waves/W-I.5.md:19` says only "the zero-width morph window | goes with #48 (LEDGER:117)".
  - Its cure (§3) strikes the words fission, V↔H morph and Siri under D2's Q-9.
  - Its gates are I5-G1, a word grep for `fission|siri`, and I5-G2, an orientation-morph witness under Q-9 (b) only.
  - Nothing in W-I.5 names `layers.css`, `.dock-layer--full` or `[data-morphing]`. No gate goes RED on the ungated rule, and no step changes it.

  W-0.8 lists `L04-F27` among F-16's members (`waves/W-0.8.md:26`), and neither its steps, its §4 nor its gates name `layers.css` (`grep -n "layers.css" waves/W-0.8.md` → none). The LEDGER row points at a wave that does not cover this part of it.
- **Evidence.**
  - At HEAD, `src/components/dock/styles/layers.css:344-350` still reads: `.glass-dock.expanded:not(.fit-content):not([data-morphing]) .dock-layers { width: 100%; }` beside the ungated `.glass-dock.expanded:not(.fit-content) .dock-layer--full { width: 100%; }`.
  - `grep -n -i "morph\|width" waves/W-I.5.md` hits only the fission/V↔H text and the §1 row above.
- **Note.** W-I.5's cite `LEDGER:117` is now `#47b`; `#48` is `:118`.

## Row 6 · loop pre-emption

No finding. Fix-11's edits add no build step. W-L.8 §3.3's RETIREs build nothing. W-0.8, W-0.11 and W-H.6 still land only from their loops' converged specs, per their headers.

## Row 7 · the DAG

No finding. `plan_dag.edges()` with `graphlib`, run here, reads:
- 101 §5 rows for 101 specs, none missing either way;
- a full topological order of 101, so no cycles;
- 0 dangling ids;
- 0 edges into a later band;
- 0 band-0 edges to a wave outside band 0.

Band 0's only outside dependencies are `D3 gate` (W-0.1, W-0.2, W-0.11) and `D2 gate` (W-0.8), the set the amended row 7 admits. W-0.2 is O-76's tint. It rides D3 because "O-76 folds with the O-66 grey measure" (`W-0.2.md` header, CUR:45), which is the veil convergence. Every spec's `depends on` cell reads "PLAN §5, the one record of edges" (101 of 101).

## Row 8 · breaks and aliases

No finding. Fix-11 added no break. W-0.8 §7 keeps its MIGRATION row for each O-88 break, with no alias. `.published-roster` names neither `useDockSearch` nor `ScrollProgressRim`, so W-0.7 G6's hold does not conflict with them. W-H.6 §7's row stays conditional on the converged seat.

## Row 9 · re-booked chronics

### FK-03 · `chronic-decided.py`'s L04-ROW arm counts the LEDGER row's own words as the wave covering the item

- **Where.** `formation-audit/sweeps/chronic-decided.py:136-139`. `texts = [" ".join(by_id[i][1]) for i in ids] + [spec_text[...] ...]`, then `if not any(re.search(pat, t) for t in texts)`.
- **Defect.** A carried **D** item passes once its name is written into the LEDGER row that folds it, whether or not the receiving wave decides or builds it. This is the gap pass 10 named for the MEMBER arm ("clears a member as soon as any spec names the member's id, even when the spec misdescribes it"), one level down. Fix-11 cured row 33 this way: it wrote `layers.css:348` into `LEDGER.md:118` and left `W-I.5.md` unchanged (fix-11, "L04-ROW 33").
- **Missed instance.** L04 master row 33 (FK-02), a **D** row: two closes, re-booked. It is now folded into a wave that does not decide it, which is a re-booking under another id.
- **Evidence.** The arm's 45 patterns run against wave specs only (`spec_text` of each traced row's wave) miss rows 16, 33, 34 and 45. Rows 16, 34 and 45 are covered by their specs in other words (`W-B.7.md:9,16`; `W-A.4.md:19,21`; `W-B.1`). Row 33 has no hit in `W-I.5.md` and no `layers.css` in `W-0.8.md`.

## Notes outside the checklist (not counted)

- **DISEASE marks.** L04's master ledger marks 11 carried rows **D** whose LEDGER rows carry no DISEASE word:
  - row 2 `N-1a`;
  - row 3, the `BG-ONWARD-*` rows;
  - row 21 `#29a`;
  - row 22 `#15`;
  - row 23 `#70`;
  - row 24 `Q063`;
  - row 26 `#17b/#23/#58b/#47a`;
  - row 34 `C-16`;
  - row 35 `C-1`;
  - row 36 `C-14/C-15`;
  - row 37 `#76a/L04-M37`.

  Each has a deciding wave, so row 9 holds. LEDGER §9's "DISEASE: 46" and W-B.1's checker (N-2: "DISEASE marks, deciding waves") read the marks, so the count undercounts L04's own classification.
- **A2-G8's RED rests on its qualifier.** After any source plant, the `boot-graph.test.ts` freshness arm fails on mtimes, so the run exits 1 whatever the fences do. The gate stays RED only because its pass condition requires "the failure naming the new member". A seat reading exit codes alone would read it green.
- **`fail-open-gates.py` with no argument** exits 2 (usage). Fix-11's `.out` records the run with the argument.
- **Fix-11's open items** (Safari OW-3; the run arm's light-only scope; fix-10's items 3-6) stand as listed. None maps to a finding here.
