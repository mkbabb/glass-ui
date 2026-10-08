# BL — formation audit, pass 23

| field | value |
|---|---|
| seat | formation critic, pass 23. Authored none of `PLAN.md`, `waves/`, `LEDGER.md`, passes 1-22, fixes 2-23 or the sweeps |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `0cda880f` (fix 23 banked). `git diff --stat 544c9271 HEAD -- docs/tranches/BL ':!design' ':!driver' src tests tests-visual` touches only `FORMATION-PROGRESS.md`, `formation-audit/fix-23.md` and `formation-audit/pass-22.md`. The plan pass 22 found clean is the plan read here, byte for byte. The worktree's `PLAN.md`, `LEDGER.md`, `audit/REGISTRY.md`, `audit/INBOUND.md`, `waves/` and `sweeps/` compare equal to the checkout's (`cmp`, `diff -r`) |
| inputs read | `PLAN.md` §3 and §5 by script; `waves/W-I.7.md` whole; every §5 row through `gates.py`; `audit/REGISTRY.md` by family-header count; `formation-audit/pass-22.md`; `formation-audit/fix-23.md` (last); every file under `sweeps/` run |
| where probes ran | worktree `.claude/worktrees/bl/formation/crit-23/wt` at `0cda880f`, `node_modules` and `tests-visual/node_modules` symlinked; nothing built. `hold-line-claim.py` ran alone in it, and the gate runner ran after it finished. I7-G1 plants ran on a `git archive HEAD src` copy in this seat's scratchpad. No browser (the Playwright and chrome-devtools MCP servers failed to connect). Playwright WebKit is not Safari; no WebKit cell was read. Real Safari is UNMEASURED (OW-3) |
| fences | no source edit and no git write in the checkout; nothing under `design/` read, run or written; no sibling repo touched. `git status --short` in the worktree read 0 lines before `git worktree remove --force`; `git worktree list \| grep -c crit-23` → 0. Sweeps ran with `PYTHONDONTWRITEBYTECODE=1`, `python3 -B`, output to the scratchpad; `sweeps/` holds no `__pycache__` and no `.out` changed. The only write in the checkout is this file |

The checklist has nine fixed rows. Each finding names its row. Notes at the end are outside the checklist and do not count.

## Result

| row | check | result |
|---|---|---|
| 1 | all 85 families placed exactly once | PASS |
| 2 | every spec has a gate; every gate RED at HEAD | PASS |
| 3 | no vacuous gate | PASS |
| 4 | every visual claim carries π/DELTA | PASS |
| 5 | every ledger row terminal, pointing at a wave that covers it | PASS |
| 6 | no loop wave pre-empts its loop, except owner-ratified and recorded exceptions | PASS |
| 7 | DAG acyclic, one source; band 0 external only on D3 and D2 | PASS |
| 8 | every break has a MIGRATION row, no alias | PASS |
| 9 | no re-booked chronic | PASS |

**clean = true.** Pass 22 recorded no finding, so nothing carries in. Every sweep exits 0. Pass 22 and this pass read the same plan, so this is the second consecutive clean pass over it. H-1 stays a hardening note, for the reason given below.

## Sweeps, re-run

| sweep | command | exit | summary line |
|---|---|---:|---|
| `reshape-order.py` | `python3 -B reshape-order.py` | **0** | `rows 83, open 0, stale 0` |
| `borrowed-red.py` | `python3 -B borrowed-red.py` | **0** | `rows 1, open 0, stale 0` |
| `inbound-fold.py` | `python3 -B inbound-fold.py` | **0** | `ids 37, open 0, stale 0` |
| `release-gates.py` | `python3 -B release-gates.py` | **0** | `waves 102, band-0 loop gates {D2, D3}, open 0` |
| `chronic-decided.py` | `python3 -B chronic-decided.py` | **0** | `members 51, ledger rows 825, L04 master rows 45, open 0` |
| `ledger-terminal.py` | `python3 -B ledger-terminal.py` | **0** | `ledger rows 825, open 0` |
| `hold-line-scope.py` | `python3 -B hold-line-scope.py` | **0** | `static hold lines with paths 2, open 0` |
| `fl6-plate-reads.py` | `python3 -B fl6-plate-reads.py <checkout>` | **0** | `reads 27, open 0` |
| `fail-open-gates.py` | `python3 -B fail-open-gates.py <worktree>` | **0** | `gate rows 730, fail-open rows run 124, docket rows 20, open 0` |
| `migration-values.py` | `python3 -B migration-values.py <worktree>` | **0** | `published tokens 902, props with defaults 109, candidates 52, open 0` |
| `pi-surface.py` | `python3 -B pi-surface.py <worktree>` | **0** | `component stylesheets 55, demo route mentions 487, manifest routes 80, open 0` |
| `hold-line-claim.py` | `python3 -B hold-line-claim.py <worktree>`, run alone | **0** | `in-scope static gates 137 (hold lines 6; S 65, L 67, H 5), plants 767, open 0` |
| `gates.py`, `plan_dag.py` | run bare | **0** | — |

Every summary line matches pass 22's and fix 23's. Each sweep's inputs are unchanged since pass 22, so no sweep is newly too narrow. I checked the one width question left open (H-1, below) against row 3's bound.

## Pass 22, re-verified

Pass 22 recorded no finding (all nine rows PASS). Its hardening note H-1 and the notes outside the checklist are re-read below.

## Gates re-run at HEAD

A runner read every non-struck §5 span through `gates.py`. It ran each span that starts with a command (`!`, `rg`, `grep`, `git`, `test`, `awk`, `find`, `[`, `sed`, `perl`, `wc`, `diff`, `cmp`) and names none of `npm`, `npx`, `node `, `python`, `playwright`, `vite`, `tsc`, `curl`, `$H`, `$D3_OUT`, `dist/`, `.cache/`, `design/`, `…` or a `<word>` placeholder. Spans ran 4 at a time with a 60 s cap and stdin closed, in the worktree, after `hold-line-claim.py` had finished. 209 spans ran.

| band | nonzero / run | timeouts |
|---|---|---|
| 0 | 16/21 | 0 |
| A | 30/31 | 0 |
| B | 20/21 | 0 |
| C | 19/20 | 0 |
| D | 4/5 | 0 |
| E | 28/29 | 0 |
| F | 2/2 | 0 |
| G | 16/17 | 0 |
| H | 9/12 | 0 |
| I | 17/17 | 0 |
| J | 4/4 | 0 |
| K | 13/13 | 0 |
| L | 15/17 | 0 |

**Every band reads RED.** The 16 spans that exit 0 are pass 22's set exactly. They are the labelled hold lines (W-0.1 G5, W-0.10 G3, W-0.11 G5, W-0.2 G3, B15-G3, D2-G5, G2-G4, H6-G3's three spans, G-L3-9's two spans), the floor half of a born-RED row (W-0.8 G14), a gate whose reading depends on state (A1-G11), a printed value (C4-G7) and a prose fragment (E6-G8).

**BLOCKER spans, by name:** W-0.12 G1 **1** (`layers.css:349`); W-0.7 G2 **1**; W-0.7 G5's static span **1**; W-0.7 G8 **1**; G-L7-1 **1**; G-L7-4 **1**; G-L8-2 **1**; A2-G3 **1**, A2-G7 **1**, A2-G11 **1**; E2-G9 **1**, E2-G11 **1**, E2-G12 **1**; I7-G1 **1**; I7-G3 **1**; W-I.2 G10 **1**. W-0.12 G1, W-0.7 G8, G-L7-1 and G-L7-4 were run alone because the runner's filter skipped them.

**HIGH families.** Every wave's static spans are in the table, so every HIGH family's static gates ran.

**Not run:** browser, `$H`, harness and GPU gates, `npm pack` arms, and any gate that reads `design/` (fence).

## Row 1 · families placed

No finding. `REGISTRY.md` has 85 `#### F-` headers and no duplicates. A script over the families column of PLAN §3's 102 wave rows (struck text removed) finds all 85 and no extra id. Every family placed in more than one row has at most one row without `split` or an `a`/`b` suffix.

## Row 2 · gates exist and are RED at HEAD

No finding. `gates.py` reads gate rows from 101 specs. W-F.5 carries F5-G1 to F5-G7 in a two-column table. Every band reads RED, and every BLOCKER span exits 1.

## Row 3 · vacuous gates

No finding. `hold-line-claim.py` and `fail-open-gates.py` exit 0. No gate span changed since pass 22.

I7-G1 on the copy: HEAD **1**. On the cured base (`run.css:357,366,376,384` in §3 item 1's appended form) it gives **0**. These spec-named spellings, appended to the cured `glass/glass-capsule.css`, each exit **1**:

- `.glass-dock { & .seat { transition: width 1s; } }`
- the parent's own `transition` after `&:focus { … }`
- `&:hover { transition: inline-size … }` after `&:focus { … }`, both flat under `.glass-dock .dock-icon-button` and nested under `.glass-dock { & .dock-icon-button { … } }`

`md5` of the sheet read the same before and after the plants.

**Fix 23's question on H-1.** H-1 is `.glass-dock { & .seat { &:focus { color: red; } transition: width 1s; } }`. It exits **0** on the cured base; so does its `@media` variant, and so does the same under `@layer x`. Fix 23 asked whether W-I.7 `:42`, "it reads the rule past closed sibling nested rules, at any depth", names this spelling.

I read it as not naming it. The sentence's subject is "the rule", the dock-named rule. Its two examples are that rule's own body: `&:hover` after `&:focus`, and the parent's own `transition` after a nested rule. "At any depth" sits where the first arm's sentence ("past any closed nested rule or nested at-rule at any depth (a balanced-brace skip)") puts it, as the depth of the closed rule that is skipped. The spec bounds the selector reading at "one nesting level deep". H-1 needs a skip inside that one-level child, after the child's own nested block. That combines two named forms, and the spec writes neither the combination nor a claim about it.

`src` holds no instance. Fix 23's brace walk found 0 declarations after a closed nested block at any depth. When the nested child's selector names `dock`, as every seat selector in `src` does (`.dock-run`, `.dock-icon-button`, `[data-dock-seat]`), the arm starts at the child and reads it (**1**, above). Under row 3's bound, H-1 stays a hardening note.

## Row 4 · π and DELTA

No finding. `pi-surface.py` exits 0. The plan is unchanged and adds no visual claim.

## Row 5 · ledger rows

No finding. `ledger-terminal.py` (825 rows) and `chronic-decided.py` exit 0.

## Row 6 · loop pre-emption

No finding. No line under `waves/` changed since pass 22's clean reading.

## Row 7 · the DAG

No finding. `plan_dag.edges()` with `graphlib`: 102 nodes, a topological order of 102 (no cycle), 0 dangling ids, and 0 band-0 edges to a wave outside band 0. `release-gates.py` exits 0 with band-0 loop gates {D2, D3}. PLAN §5 is the one record of edges.

## Row 8 · breaks and aliases

No finding. `migration-values.py` exits 0.

## Row 9 · re-booked chronics

No finding. `chronic-decided.py` exits 0.

## Hardening notes (invented spellings; never make a pass unclean)

- **H-1 stands**, as read above. The cheapest close, if a later seat wants one: narrow `:42`'s "at any depth" to "the dock-named rule's own body", or add a balanced skip after the optional nesting level and a matching `nesting` plant in `hold-line-claim.py`.
- **Pass 21's notes stand:** G10 with a combinator inside `:is()` or an upper-case property; W-0.12 G1 with a relative nested selector without `&`, or `&` under a selector-list parent; I7-G3 with a carrier set from script.

## Notes outside the checklist (not counted)

- G-L7-6 still exits 2 on its upper-case `<W-L.7 base>` placeholder. W-0.7 G6, G9 and G-L8-12 read tags that do not exist yet (`v10.2.0`, `v11.0.0`).
- W-F.5's two-column gate table is not seen by `gates.py`.
- W-I.7 §3 item 1's `var(--icon-button-transition)` is not declared in `src` at HEAD.
- Fix 19's open items stand, as pass 22 lists them.
- A `git archive` copy is no stand-in for the worktree in a gate run, because `git grep` reads nothing outside a repository, so a `test "$(git grep -c …)" -eq 0` span falsely exits 0 there (B9-G1 did on this seat's first attempt). Only the worktree run is cited above.
