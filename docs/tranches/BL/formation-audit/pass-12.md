# BL — formation audit, pass 12

| field | value |
|---|---|
| seat | formation critic, pass 12. Authored none of `PLAN.md`, `waves/`, `LEDGER.md`, passes 1-11, fixes 2-12 or the sweeps |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `70e6702f` (fix 12 committed while this seat read; `git status --short docs/tranches/BL` outside `design/` read fix-12's files as modified at the start, and the commit carries them). The plan read here is fix-12's as committed |
| inputs read | `formation-audit/pass-11.md`; `formation-audit/fix-12.md` (read early to learn what changed, and re-read last); fix-12's diffs to `W-0.8`, `W-H.6`, `W-I.5`; `W-0.1` §1, §6; `W-E.1` §1, §3; `W-E.2` §1, §6; `W-D.1` §9; `W-G.1` §1; `W-L.8` §1, §5; `W-A.2` §5; `LEDGER.md` §0 (`:32`), `:118`, `:400-411`, `:423`, `:553`, `:940-942`, `:979`, and every DISEASE rationale by script; `audit/REGISTRY.md` headers and severity lines; `audit/INBOUND-MAP.md:656,679-681`; `audit/round-1/L04.md` master ledger by script; `PLAN.md` §5 by script and §1 `:39`; every file under `sweeps/` |
| where probes ran | worktree `.claude/worktrees/bl/formation/crit-12/wt`. It was first made at `ebcc691e` and then rebuilt at `70e6702f` when fix 12 was committed (`git diff --stat ebcc691e 70e6702f -- src tests tests-visual demo` is empty, so no reading taken at the first base differs). `node_modules` and `tests-visual/node_modules` were symlinked. Demo build (`vite build --config demo/vite.demo-dist.config.ts`) exit 0. Every plant was restored from a saved copy. `git status --short` read 0 lines before `git worktree remove --force`, and `git worktree list \| grep -c crit-12` → 0. Load average 83-121 (`uptime`); no timing cell was read. No browser ran: the Playwright and chrome-devtools MCP servers failed to connect. Real-Safari cells are UNMEASURED (OW-3) |
| fences | no source edit, no git write, nothing under `design/` read, run or written, and no sibling repo touched. **One stray write:** a `python3 -` call that imported `gates.py` without `PYTHONDONTWRITEBYTECODE` left `sweeps/__pycache__/` (`gates.cpython-314.pyc`, `plan_dag.cpython-314.pyc`, 11:13). The `rm` that would remove it was refused by the permission system, so it is still there, untracked. Every sweep run below used `PYTHONDONTWRITEBYTECODE=1`. Apart from that cache, the only write in the checkout is this file |

The checklist has nine fixed rows. Each finding names its row. Notes at the end are outside the checklist and do not count.

## Result

| row | check | result |
|---|---|---|
| 1 | all 85 families placed exactly once | PASS |
| 2 | every spec has a gate; every gate RED at HEAD | PASS |
| 3 | no vacuous gate | FAIL (FL-01, FL-02, FL-03) |
| 4 | every visual claim carries π/DELTA | PASS |
| 5 | every ledger row terminal, pointing at a wave that covers it | PASS |
| 6 | no loop wave pre-empts its loop, except owner-ratified and recorded exceptions | PASS |
| 7 | DAG acyclic, one source; band 0 external only on D3 (veil rows, W-0.11) and D2 (W-0.8) | PASS |
| 8 | every break has a MIGRATION row, no alias | PASS |
| 9 | no re-booked chronic | FAIL (FL-04, FL-05) |

**clean = false.** Five findings. All three of pass 11's are cured as named, and every sweep exits 0. The new findings:
- **FL-01.** Fix-12's new gate W-0.8 G19 passes the zero-width morph window when it is written as a one-line rule, with a trailing comment, on a compound subject, or with `max-width`. Its recorded one-line bite does not bite on a cured tree.
- **FL-02.** H6-G3 still passes a negative literal laundered through a custom property, a negative `margin`, and a value on the line after its property.
- **FL-03.** `hold-line-claim.py` reads only gates that are hold lines today. A born-RED static gate becomes a hold line when its wave lands, and its spellings are never tested. G19 and G-L1-5 are the missed instances.
- **FL-04.** `L04-M33`, a DISEASE row, is decided as one item of W-0.8, a wider wave. Its rationale says neither "own" nor "shared", which `LEDGER.md:32` requires.
- **FL-05.** `chronic-decided.py`'s SHARED arm flags a DISEASE row only when it says "shared". A row that says neither word passes, which is how FL-04 got through.

## Sweeps, re-run at `70e6702f`

| sweep | command | exit | summary line |
|---|---|---:|---|
| `reshape-order.py` | `python3 reshape-order.py` | **0** | `rows 83, open 0, stale 0` |
| `borrowed-red.py` | `python3 borrowed-red.py` | **0** | `rows 1, open 0, stale 0` |
| `fl6-plate-reads.py` | `python3 fl6-plate-reads.py /Users/mkbabb/Programming/glass-ui` | **0** | `reads 27, open 0` |
| `inbound-fold.py` | `python3 inbound-fold.py` | **0** | `ids 37, open 0, stale 0` |
| `release-gates.py` | `python3 release-gates.py` | **0** | `waves 101, band-0 loop gates {D2, D3}, open 0` |
| `chronic-decided.py` | `python3 chronic-decided.py` | **0** | `members 51, ledger rows 825, L04 master rows 45, open 0` |
| `ledger-terminal.py` | `python3 ledger-terminal.py` | **0** | `ledger rows 825, open 0` |
| `hold-line-scope.py` | `python3 hold-line-scope.py` | **0** | `static hold lines with paths 2, open 0` |
| `hold-line-claim.py` | `python3 hold-line-claim.py <crit-12 worktree>` | **0** | `static hold lines 6, plants 36, open 0` (one NOTE: G-L1-5 is not a hold line, so its CLAIMS entry is not run) |
| `fail-open-gates.py` | `python3 fail-open-gates.py <crit-12 worktree>` | **0** | `gate rows 731, fail-open rows run 125, docket rows 20, open 0` |
| `gates.py`, `plan_dag.py` | imported by every sweep, and used here for rows 1, 2 and 7 | **0** | — |

Run bare, `fail-open-gates.py` and `hold-line-claim.py` each print their usage line and exit **2**, as their docstrings say. The runs in the table are the ones with a worktree argument. The two worktree sweeps ran at `ebcc691e` first and again at `70e6702f`, with the same summary lines.

**How wide each sweep is against its class:**
- **`hold-line-claim.py` is too narrow (row 3, FL-03).** It skips every gate that is not a hold line at HEAD. A born-RED static gate is the hold line of its own wave once that wave lands, so its spellings are what keep the cure in place. Two instances:
  - G-L1-5: fix-12 made it born RED, and the sweep then demoted its two CLAIMS plants to a NOTE.
  - W-0.8 G19: new in fix-12, it has no CLAIMS entry and four missed spellings (FL-01).
- **`chronic-decided.py` is too narrow (row 9, FL-05).** Its SHARED arm (`:111`) matches `\(shared\b|\bshared\)` only. `LEDGER.md:32` requires every DISEASE rationale to say "own" or "shared". `L04-M33` says neither and passes.
- **`ledger-terminal.py`, arm COVER.** Its id class (`L..`, `R..-..-..`, `UIA-..`, `A2-..`, `KFA-..`) leaves out a ledger row's own id. This seat ran the wider check by script: 94 of 631 BUILD or FOLD rows have a row id that their wave spec does not name. A sample of 29 was read in the specs' own words, and each item was found. `W-D.1` names no `avatar`, but its §9 answers "W-B.2's O-48 … through the door rule". No missed instance was found, so this is not a finding.
- **The other seven: no missed instance found.** These are `reshape-order.py`, `borrowed-red.py`, `fl6-plate-reads.py`, `inbound-fold.py`, `release-gates.py`, `hold-line-scope.py` and `fail-open-gates.py`.

## Pass 11, re-verified

| id | verdict | reading here |
|---|---|---|
| FK-01 | cured as named; see FL-02 | `waves/W-H.6.md:66` now holds two spans. `hold-line-claim.py` plants all four of pass 11's spellings and four more, and each reddens one span (open 0). The light run reads both spans at exit 0 at HEAD, which is the hold. The spellings in FL-02 are new |
| FK-02 | cured; see FL-01 and FL-04 | `LEDGER.md:423`: `L04-M33` is BUILD in W-0.8. `:118` (`#48`) no longer describes the item. `W-I.5.md:10` points at `L04-M33`, and its old §1 row is struck. W-0.8 carries the item at `:27`, `:111`, `:186` (G19), `:198` (§6) and `:225` (§8). G19 at HEAD: exit **1** (`layers.css:349`) in this seat's light run |
| FK-03 | cured; see FL-05 | `chronic-decided.py`'s L04-ROW arm now reads only the traced rows' wave specs (`:136-139`). The LEDGER row's text counts only for a RETIRE row with no wave. Row 33's pattern `layers\.css:34[4-9]` hits `W-0.8.md:27`. The arm exits 0 |

## Gates re-run at `70e6702f`

**Static gates.** `gates.py` reads 731 gate rows. A runner in this seat's scratchpad ran every non-struck span that starts with a command and names no build, browser, network, `node`, `python`, `$H`, `$D3_OUT`, `dist/`, `.cache/`, `design/` or placeholder. It ran 4 at a time with a 60 s cap, in the worktree.

| band | nonzero / run | timeouts |
|---|---|---|
| 0 | 19/24 | 1 |
| A | 28/29 | 0 |
| B | 21/22 | 0 |
| C | 16/17 | 0 |
| D | 1/1 | 0 |
| E | 28/28 | 0 |
| F | 2/2 | 0 |
| G | 18/19 | 0 |
| H | 9/11 | 0 |
| I | 17/17 | 0 |
| J | 4/4 | 0 |
| K | 11/11 | 0 |
| L | 12/14 | 0 |

**Every band reads RED.** The one timeout is W-0.7 G5's fragment `grep -o 'data-reveal='`, which waits on stdin; it is a piece of a pipeline, not a gate.

**Exit-0 spans.** Each is one of these:
- **Labelled hold lines.** W-0.1 G5 and W-0.11 G5 (the roster `git diff`), W-0.10 G3, W-0.2 G3, W-B.15 B15-G3, W-G.2 G2-G4, both spans of W-H.6 H6-G3, and both spans of W-L.3 G-L3-9.
- **Half of a born-RED row.** W-0.8 G14's floor half.
- **A printed value that is not the pass value.** W-C.4 C4-G7.
- **State-dependent, as its own cell says.** W-A.1 A1-G11 in a fresh worktree.

**BLOCKER families** (`audit/REGISTRY.md:31`: three families at BLOCKER):
- **F-01 (W-A.2).**
  - A2-G1 (`npx vitest run tests/gates/roster.test.ts`): exit **1**; the file does not exist.
  - A2-G9 (`frost-computed.test.ts`): exit **1**; the file does not exist.
  - A2-G10, after the demo build and `touch src/components/badge/index.ts`: exit **1**, `the dist-demo it measures is NEWER than every source it is built from`.
  - A2-G8, with `export const __plant = "webgl2";` appended to `blob/shaders/metaball.frag.ts`: `2 failed | 152 passed | 2 expected fail`. The failures are the boot-graph freshness arm and `overfit-structure.test.ts`'s EXPORT-REACH arm, which the exported plant itself tripped. Neither names a webgl2 growth, so the pass condition is unmet and the gate is RED, as recorded.
  - A2-G3, A2-G6, A2-G7 and A2-G11 are in the light run, each exit 1.
- **F-68 (W-0.7, W-L.7, W-L.8).**
  - W-0.7 G2 and G8: exit 1. G6 and G9: exit 128 (no `v10.2.0` tag).
  - W-L.7 G-L7-1: exit 1.
  - W-L.8 G-L8-2, G-L8-14 and G-L8-15: exit 1. G-L8-12: exit 128.
- **F-21 (W-E.2).** E2-G9, E2-G11 and E2-G12: exit 1. Its paint gates were not run (no browser).

Of the 55 HIGH families, this seat ran the static spans of every wave above. Their browser, `$H` and harness gates were not run.

**Not re-run here:** every browser, `$H`, `$D3_OUT`, GPU and wired gate, and every gate that reads `design/` (fence).

## Row 1 · families placed

No finding. `PLAN.md` and `audit/REGISTRY.md` are unchanged since `b1d82396`, the base of pass 11's row-1 reading. `git diff --stat ebcc691e HEAD -- PLAN.md audit/REGISTRY.md` is empty, and `REGISTRY.md` has 85 `#### F-` headers. Fix-12 placed no family.

## Row 2 · gates exist and are RED at HEAD

No finding. Every one of the 101 specs has a §5 gate row (731 rows). Every band has nonzero spans, and every exit-0 span is accounted for above. Fix-12's G19 is born RED (exit 1, `layers.css:349`), and G-L1-5 now reads RED.

## Row 3 · vacuous gates

### FL-01 · W-0.8 G19 passes the zero-width morph window in four spellings its pass cell covers, and the one-line bite it records does not bite

- **Where.** `waves/W-0.8.md:186`. The pass cell reads: "no rule in the dock's stylesheets sizes a layer (`.dock-layers`, `.dock-layer--*` as the selector's subject) from a dock state … without the morph gate".
- **Defect.** The `awk` span misses four forms:
  - **A one-line rule.** The `/\{/{…; next}` arm skips the line that opens a rule, and the width test needs the declaration to start its own line.
  - **A trailing comment on the declaration line.** The `/\/\*/,/\*\//{next}` range skips the whole line, declaration included.
  - **A compound subject.** `.dock-layer--full.is-active` and `.dock-layer--full[data-x]` fail the subject test, which wants `[ \t]*[,{]` straight after the class or a pseudo-class.
  - **`max-width`.** It is not in the property list, though `max-width: 0` makes the same zero-width window.
- **The recorded bite.** The HEAD cell says a planted `.glass-dock.collapsed .dock-layer--summary { inline-size: 0 }` gives exit 1. That holds only on a tree where `:349` already fails. On a cured tree, that exact line exits **0**.
- **Evidence.** In the worktree at `70e6702f`, `layers.css:348` was gated `:not([data-morphing])` (the cured base, exit 0). Each plant below was appended and G19 was run (span from `gates.py`); the file was restored after each run.

  | plant on the cured base | exit |
  |---|---:|
  | `.glass-dock.expanded .dock-layer--full {` / `width: 0;` / `}` (three lines) | 1 |
  | `.glass-dock.collapsed .dock-layer--summary {` / `inline-size: 0;` / `}` (three lines) | 1 |
  | `.glass-dock.collapsed .dock-layer--summary { inline-size: 0 }` (W-0.8:186's recorded plant, as written) | **0** |
  | `.glass-dock.expanded .dock-layer--full { width: 0; }` | **0** |
  | `.glass-dock.expanded .dock-layer--full {` / `width: 0; /* collapse */` / `}` | **0** |
  | `.glass-dock.expanded .dock-layer--full.is-active {` / `width: 0;` / `}` | **0** |
  | `.glass-dock.expanded .dock-layer--full[data-x] {` / `width: 0;` / `}` | **0** |
  | `.glass-dock.expanded .dock-layer--full {` / `max-width: 0;` / `}` | **0** |

  The same one-line plant on the HEAD tree exits 1, through `:349` alone.
- **Shape of a cure.**
  - Read the stylesheet as rules (selector, declaration block), not as lines.
  - Treat a compound selector whose last compound carries `.dock-layers` or `.dock-layer--*` as the subject.
  - Add `max-width` and `max-inline-size` to the property list.
  - Re-record the bite on a cured base, with one row per spelling.

### FL-02 · H6-G3 still passes a second radius laundered through a custom property, a negative margin, and a value on its own line

- **Where.** `waves/W-H.6.md:66`. The pass cell reads "the overshoot is computed from the rung's radius token". §3 item 1 reads "The radius it reads is the rung's own token … never a second value".
- **Defect.** Both spans read the `inset` and side properties line by line, so three forms pass:
  - **A literal custom property.** `--x: -32px` read by `inset: var(--x)` is a second value written as a negative length, and it passes. Fix-12 records a lone `--plant-inset: -4px` as a form that must pass. That is right for a declaration nobody reads, but the same allowance passes the laundered form.
  - **A negative `margin`.** A negative margin on the pseudo-element overshoots without touching `inset`.
  - **A value on the next line.** `git grep` reads a line at a time, so `inset:` followed by `-32px` on the next line passes.
- **Evidence.** Each line below was appended to `src/styles/glass/material.css` in the worktree, and both spans were run as one `&&` chain; the file was restored after each run:

  | plant | exit |
  |---|---:|
  | `.x::after {` / `inset: -32px;` / `}` | 1 |
  | `.x { --glass-overshoot: -32px; }` and `.x::after { inset: var(--glass-overshoot); }` | **0** |
  | `.x::after { margin: -32px; }` | **0** |
  | `.x::after {` / `inset:` / `-32px;` / `}` | **0** |
  | `.x::after { inset: -32PX; }` | **0** |
  | `.x::after { inset: calc(var(--radius-ctx) * -1 - 32px); }` (a literal beside the token) | **0** |

- **Shape of a cure.**
  - Fail on any custom property declared with a negative literal length in the six files and read by an `inset`, side or `margin` property.
  - Add the `margin` family.
  - Read declarations across lines.
  - Fail a `calc()` that mixes the token with a literal length.

### FL-03 · `hold-line-claim.py` never tests a born-RED static gate's spellings

- **Where.** `formation-audit/sweeps/hold-line-claim.py:90-92`: `if not g.hold:` … `notes.append(… "is not a hold line (a born-RED row); its CLAIMS entry is not run")`.
- **Defect.**
  - **The class.** It is a static gate whose pattern catches fewer spellings than its claim (pass 11 FK-01, fix-12). A born-RED static gate is in the class: when its wave lands, the gate goes green and becomes the line that holds the cure.
  - **What the sweep reads.** Only gates that are hold lines today. It has no way to plant a spelling on a cured base, so a born-RED gate's narrowness waits until after its wave lands.
- **Missed instances.**
  - **W-0.8 G19.** Fix-12 wrote it, it has no CLAIMS entry, and four spellings pass it (FL-01).
  - **W-L.1 G-L1-5.** Fix-12 made it born RED, and the sweep then prints its two CLAIMS plants as a NOTE instead of running them (`hold-line-claim.py` output: `NOTE waves/W-L.1.md:193 G-L1-5 … its CLAIMS entry is not run`).
- **Shape of a cure.**
  - For every static gate, hold line or born RED, CLAIMS carries a cure plant (the cured form) as well as the spellings.
  - The sweep applies the cure plant first, so the gate reads green. It then plants each spelling on top, and each must redden the gate.

## Row 4 · π and DELTA

No finding. Fix-12's visual claims:
- **W-0.8 §6** (`:198`). The layer-swap strip records the full layer's inline size per frame, before and after, with real Safari UNMEASURED.
- **W-E.2 §1** (`:18`, R2-06-15's seated halo). It rides W-E.2 §6's `halo-*-on.png` pair.
- **W-0.1 §1** (`:20`, A2-KE-L3-4's two composites). It rides W-0.1 §6's field pair (`field-{engine}-{theme}.png`, before and after).

G19 is static.

## Row 5 · ledger rows

No finding.
- `ledger-terminal.py` exits 0 over 825 rows, with arms COVER and LINECITE.
- Fix-12's five COVER cures were read in their specs:
  - `W-E.2.md:18` (R2-06-15);
  - `W-E.1.md:20` (A2-FO-L2-2, A2-VA-L2-12, A2-KE-L2-15);
  - `W-0.1.md:20` (A2-KE-L3-4);
  - the `L04-M33` move.
- **The Configurator half of A2-FO-L2-2** is given to the consumer, and the reading holds. `git grep -n -i stage -- src/components/configurator` shows the stage is an in-flow grid track (`Configurator.vue:442-446`). `grep -n 'fixed\|sticky' src/components/configurator/*` finds no fixed or sticky position, so the library has no edge-anchored surface there to read a safe-area inset.
- `L04-M33`'s defect as a disease row is FL-04, on row 9.

## Row 6 · loop pre-emption

No finding. W-0.8 §3 (`:111`) leaves the form of the cure to D2's converged carrier: the rule gated as its sibling is, struck, or replaced. The wave lands that ruling. G19's span names the HEAD gate `:not([data-morphing])` and says a carrier that renames the morph state fails it closed. That is a hold on the outcome, not a design choice made ahead of the loop.

## Row 7 · the DAG

No finding. `plan_dag.edges()` with `graphlib`, run here, reads:
- 101 §5 rows for 101 specs, none missing either way;
- a topological order of 101, so no cycles;
- 0 dangling ids, 0 edges into a later band, and 0 band-0 edges to a wave outside band 0.

Band 0's outside dependencies are `D3 gate` (W-0.1, W-0.2, W-0.11) and `D2 gate` (W-0.8) (`PLAN.md` §5). Every spec's `depends on` cell reads "PLAN §5, the one record of edges" (101 of 101; 16 specs repeat the phrase in their text). `release-gates.py` exits 0. Fix-12 added no edge.

## Row 8 · breaks and aliases

No finding. Fix-12 added no break. Its rewrites of W-0.10 G3, W-0.2 G3, B15-G3, G2-G4 and G-L3-9 change patterns only. W-0.8 §7's O-88 MIGRATION rows are unchanged.

## Row 9 · re-booked chronics

### FL-04 · `L04-M33`, a DISEASE row, is decided as one item of a wider wave, and its rationale says neither "own" nor "shared"

- **Where.** `LEDGER.md:423`: `DISEASE, 2 closes, decided in W-0.8 (F-16's morph wave): the zero-width morph window …`.
- **Defect.** The rule is stated three times:
  - **Charter.** "A chronic that has ridden two or more closes un-decided is a disease row, and deciding it is a wave of its own" (`CHARTER.md:23`).
  - **Plan.** "A shared wave may hold its measurement; the ruling and the gate that enacts it are the own wave's" (`PLAN.md:39`).
  - **Ledger.** The rationale "says **own** when that wave exists to decide the row, **shared** when the decision is one item of a wider wave. Shared ones are listed in §8 (finding F-3)" (`LEDGER.md:32`).

  W-0.8 is the 10.2.0 dock collapse wave. It exists to land O-88: 37 rows were re-pointed to it from W-I.1 (`LEDGER.md:553`). In it, the morph window is one §3 paragraph (`:111`) and one gate (G19). That makes it a shared decision, but the row is not marked shared and §8 F-3 does not list it.

  Fix-12 cites `L04-M38` in W-L.8 as precedent, but that row says "own: F-12's close records" (W-L.8 is F-12's wave). `L04-M33` alone uses neither word.
- **Evidence.** Of the 46 LEDGER rows whose rationale begins `DISEASE`, 45 contain the word `own`. The one that does not is `L04-M33` (script over `LEDGER.md`, run here). `grep -n 'L04-M33' LEDGER.md` hits `:423` and `:553` only, so it is not in §8's F-3 list.
- **Shape of a cure.** Either:
  - give the morph window a wave of its own (a D2 loop wave beside W-I.5, W-I.6 and W-I.7, which already hold D2's other disease rows); or
  - record why W-0.8 is its own wave and say "own".

  Marking it "shared" and listing it under F-3 would leave it in breach of CH:23.

### FL-05 · `chronic-decided.py`'s SHARED arm passes a DISEASE row that says neither "own" nor "shared"

- **Where.** `formation-audit/sweeps/chronic-decided.py:110-112`: `if disease and re.search(r"\(shared\b|\bshared\)", why): out.append("OPEN SHARED …")`.
- **Defect.** The arm reads the ledger's word, not the ledger's rule. `LEDGER.md:32` requires each DISEASE rationale to say one of the two words. A rationale that says neither is not checked, so a disease row placed in a wider wave passes by leaving the word out.
- **Missed instance.** `L04-M33` (FL-04). The sweep exits 0 with it.
- **Shape of a cure.** Every DISEASE row must say "own". A row that says "shared", or neither word, is open.

## Notes outside the checklist (not counted)

- **The stray `sweeps/__pycache__/`** (`gates.cpython-314.pyc`, `plan_dag.cpython-314.pyc`) is this seat's, from one call made without `PYTHONDONTWRITEBYTECODE`. The permission system refused its removal. The next seat, or the orchestrator, can delete it. No sweep reads it.
- **Fix-12's count "DISEASE: 47"** (`LEDGER.md:553`) counts rows that name DISEASE anywhere. 46 rows have a rationale that begins with DISEASE. The two counts measure different things, and neither is checked against L04's **D** marks: pass 11's note on the 11 **D** rows with no DISEASE word stands.
- **A2-G8's RED still rests on its qualifier.** With a plant, the run fails on the freshness arm and, for an exported plant, on EXPORT-REACH, and on neither for the growth itself. A seat reading exit codes alone would read it RED for the wrong reason.
- **Fix-12's open items** (Safari OW-3; G19's per-frame width reading not yet run; the run arm's light-only scope; fix-10's items 3-6) stand as listed.
