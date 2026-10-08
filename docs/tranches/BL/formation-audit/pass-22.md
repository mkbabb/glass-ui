# BL — formation audit, pass 22

| field | value |
|---|---|
| seat | formation critic, pass 22. Authored none of `PLAN.md`, `waves/`, `LEDGER.md`, passes 1-21, fixes 2-22 or the sweeps |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `544c9271` (fix 22 banked). `git diff --stat 8becaac7 544c9271` touches, in the plan, only `waves/W-I.7.md` (one hunk, the I7-G1 row at `:42`), `formation-audit/sweeps/hold-line-claim.py`, the `.out` files and `fix-22.md`; the rest is `design/` and `driver/`. `-- src tests tests-visual` is empty. The worktree's `waves/`, `PLAN.md`, `LEDGER.md`, `audit/REGISTRY.md`, `audit/INBOUND.md`, `fix-22.md` and `hold-line-claim.py` compare equal to the checkout's (`diff -r`, `cmp`) |
| inputs read | `PLAN.md` §3 and §5 by script; `waves/W-I.7.md` §5 (the rewritten I7-G1 row) through `gates.py`; `audit/REGISTRY.md` by family-header count; `formation-audit/pass-21.md`; `formation-audit/fix-22.md` (last); `hold-line-claim.py`'s I7-G1 plants (`:880-925`) and its `nesting` code (`:1925-2030`); every file under `sweeps/` |
| where probes ran | worktree `.claude/worktrees/bl/formation/crit-22/wt` at `544c9271`, `node_modules` and `tests-visual/node_modules` symlinked; `hold-line-claim.py` ran alone in it. I7-G1 plants ran on a `git archive HEAD src` copy in this seat's scratchpad, so they never shared a tree with the sweep. No browser (the Playwright and chrome-devtools MCP servers failed to connect). Playwright WebKit is not Safari; no WebKit cell was read. Real Safari is UNMEASURED (OW-3) |
| fences | no source edit and no git write in the checkout; nothing under `design/` read, run or written; no sibling repo touched. One gate span (A2-G10's first span, a `vite build`) built `dist-demo/` inside the worktree; it is ignored and went with the worktree. `git status --short` in the worktree read 0 lines before `git worktree remove --force` (`git worktree list \| grep -c crit-22` → 0). Sweeps ran with `PYTHONDONTWRITEBYTECODE=1` and `python3 -B`; `sweeps/` holds no `__pycache__`, and no `.out` changed. The only write in the checkout is this file |

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

**clean = true.** Pass 21's FU-01 and FU-02 are cured. Every sweep exits 0. One hardening note (an invented composite spelling, not in the spec or in `src`) is recorded below and does not count.

## Sweeps, re-run

The plan read is the worktree's (equal to the checkout's). Sweeps that take a tree read the crit-22 worktree, except `fl6-plate-reads.py`, which reads the checkout (as passes 17 to 21 did).

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
| `hold-line-claim.py` | `python3 -B hold-line-claim.py <worktree>`, run alone | **0** | `in-scope static gates 137 (hold lines 6; S 65, L 67, H 5), plants 767, open 0` (489 s) |
| `gates.py`, `plan_dag.py` | run bare, and imported by every sweep | **0** | — |

**How wide each sweep is against its class.** No sweep is too narrow on a spelling the bounded row 3 admits. `hold-line-claim.py` now lists the `nesting` kind once per CSS scope an arm reads (`_css_scopes`, `_inscope`), with `decl after amp` and `decl after at` added; I7-G1's two scopes (`src/components/dock`; `src !src/components/dock`) each carry red plants of both shapes (`run.css` at `:912-914`, two green at `:915-916`; `glass-capsule.css` at `:917`, `:919`). The one gap I found, a nested dock rule's own declaration after its own nested block outside the dock, is a composite the spec does not write and `src` does not contain (hardening note H-1). The other twelve sweeps' inputs are byte-equal to pass 21's and their summary lines match.

## Pass 21, re-verified

Cured base: `run.css:357,366,376,384` rewritten to §3 item 1's appended form (`transition: var(--icon-button-transition), <size> …`). I7-G1 at HEAD on the copy: **exit 1**; on the cured base: **exit 0**. Each plant below was appended to the cured file, run, and the file restored (`md5` of `run.css` equal to the cured copy after the run).

| id | verdict | reading here |
|---|---|---|
| FU-01 | cured | `run.css`: `.glass-dock .dock-run > * { &:focus { color: red; } transition: inline-size 1s; }` **1** (pass 21: 0); `{ color: red; @media (min-width: 1px) { color: blue; } transition: width 1s; }` **1** (pass 21: 0). Also: two-level `@media { &:hover {…} }` then the declaration **1**; under `@layer x { … }` **1**; `transition-property: opacity, width` after two sibling nested rules **1**; `--seat-t: inline-size 1s` after a nested rule **1**; the value on the next line after a nested rule **1**; `background 1s, block-size 1s` after a nested rule **1**; the declaration before a nested block **1**; an indicator rule with a nested block, then a seat rule **1**. Green: §3 item 1's appended form after a nested rule **0**. Third arm (`glass/glass-capsule.css`): parent's `transition: width` after a nested `@media` **1**, after a two-level block **1**, before a nested block **1**; `.carousel-item` width transition after a nested rule **0**; `.glass-dock .dock-layer-tab-indicator` width transition after a nested rule **0** |
| FU-02 | cured | `hold-line-claim.py` exits 0 with 767 plants (pass 21: 755). The `nesting` kind is now per scope; the first arm's scope holds `decl after amp`, `decl after at` and a two-level red plant in `run.css` (`:912-914`), and the third arm's scope holds `decl after at` and `decl after amp` in `glass-capsule.css` (`:917`, `:919`) |

Spec-named shapes the third arm must still read, run on the cured base in `glass-capsule.css` or `dark-mode-toggle.css`: `.glass-dock { & .seat { transition: width 1s; } }` **1**; the same under `@layer components` **1**; after a sibling `&:focus { … }` **1**; `.glass-dock { & .dark-mode-toggle-button { color: red; transition: width 1s; } }` in `dark-mode-toggle.css` **1**; `.glass-dock { color: red; & .seat { … } transition: width 1s; }` **1**.

## Gates re-run at HEAD

**Static gates.** A runner in this seat's scratchpad read every non-struck §5 span through `gates.py` and ran each one that starts with a command (`!`, `rg`, `grep`, `git`, `test`, `awk`, `find`, `[`, `sed`, `perl`, `wc`, `diff`, `cmp`) and names none of `npm`, `npx`, `node`, `python`, `playwright`, `vite`, `tsc`, `curl`, `$H`, `$D3_OUT`, `dist/`, `.cache/`, `design/`, `…`, or a lower-case `<…>` placeholder. It ran 4 at a time, 60 s cap, stdin closed, in the worktree, after `hold-line-claim.py` finished. 197 spans ran (pass 21: 211; my placeholder filter is broader, matching any `<` followed by a lower-case letter, so 14 spans that pass 21 ran were left to the next step).

| band | nonzero / run | timeouts |
|---|---|---|
| 0 | 17/22 | 0 |
| A | 27/28 | 0 |
| B | 20/21 | 0 |
| C | 16/17 | 0 |
| D | 1/2 | 0 |
| E | 27/28 | 0 |
| F | 2/2 | 0 |
| G | 16/17 | 0 |
| H | 9/12 | 0 |
| I | 17/17 | 0 |
| J | 4/4 | 0 |
| K | 11/11 | 0 |
| L | 14/16 | 0 |

**Every band reads RED.** The 16 exit-0 spans are pass 21's set exactly: the labelled hold lines (W-0.1 G5, W-0.10 G3, W-0.11 G5, W-0.2 G3, B15-G3, D2-G5, G2-G4, H6-G3's three spans, G-L3-9's two spans); the floor half of a born-RED row (W-0.8 G14); a gate that depends on state by its own cell (A1-G11); a printed value (C4-G7); a prose fragment (E6-G8).

**BLOCKER spans, run by name (alone where the filter skipped them):** W-0.12 G1 **1** (`layers.css:349`); W-0.7 G2 **1**; W-0.7 G5's static span **1**; W-0.7 G8 **1** (no `outbox/*10.2.0-value.js.md`); W-L.7 G-L7-1 **1**; G-L7-4 **1** (no `outbox/*-11.0.0-chicago.md`); W-L.8 G-L8-2 **1**; F-01 (W-A.2) A2-G3 **1**, A2-G7 **1**, A2-G11 **1**; F-21 (W-E.2) E2-G9 **1**, E2-G11 **1**, E2-G12 **1**. The rewritten I7-G1 **1**; I7-G3 **1**; W-I.2 G10 **1**.

**HIGH families.** Every wave's static spans ran in the table above, so every HIGH family's static gates are in it.

**Not run:** browser, `$H`, harness and GPU gates, `npm pack` arms, and any gate that reads `design/` (fence).

## Row 1 · families placed

No finding. `REGISTRY.md` has 85 `#### F-` headers, no duplicate. A script over PLAN §3's 102 wave rows (struck text removed) finds all 85, no extra id. The families in more than one row (F-16, F-21, F-28, F-33) are `split` in every row but one; F-30 is placed as `F-30a` and `F-30b`.

## Row 2 · gates exist and are RED at HEAD

No finding. 101 specs have gate rows `gates.py` reads (730 rows); W-F.5 carries F5-G1 to F5-G7 in its two-column table (unchanged since fix 15). Every band reads RED, and every BLOCKER span above exits 1.

## Row 3 · vacuous gates

No finding. I7-G1, the one row fix 22 changed, exits 1 at HEAD and 0 on §3 item 1's cure form, and every spelling its pass cell names exits 1 on the cured base (above). No other gate span changed since pass 21, and `hold-line-claim.py` and `fail-open-gates.py` exit 0.

## Row 4 · π and DELTA

No finding. `pi-surface.py` exits 0. Fix 22 changed one gate row and added no visual claim.

## Row 5 · ledger rows

No finding. `ledger-terminal.py` (825 rows) and `chronic-decided.py` exit 0. LEDGER is unchanged since pass 21.

## Row 6 · loop pre-emption

No finding. `git diff 8becaac7 544c9271 -- docs/tranches/BL/waves` has one hunk, W-I.7's §5 I7-G1 row (`:42`). It widens what the gate reads; no §3 cure, mechanism or loop-owned design line changed.

## Row 7 · the DAG

No finding. `plan_dag.edges()` with `graphlib`: 102 nodes for 102 specs, a topological order of 102 (no cycle), 0 dangling ids, 0 band-0 edges to a wave outside band 0. `release-gates.py` exits 0 with band-0 loop gates {D2, D3}. PLAN §5 is the one record of edges.

## Row 8 · breaks and aliases

No finding. `migration-values.py` exits 0. Fix 22 adds no break.

## Row 9 · re-booked chronics

No finding. `chronic-decided.py` exits 0. No chronic changed wave.

## Hardening notes (invented spellings; never make a pass unclean)

No spec names these spellings, no CLAIMS entry lists them, and `src` has no instance of them.

- **H-1 · I7-G1's third arm, a nested dock rule's own declaration after its own nested block.** `.glass-dock { & .seat { &:focus { color: red; } transition: width 1s; } }` in `glass/glass-capsule.css` exits **0** on the cured base, and so does the same under `@layer x { … }`. The third arm reads one nesting level into a dock rule (`(?:…[^{}]*\{)?`) after its balanced skip, but has no skip after that level, so a nested seat rule is read only up to its own first nested block. The pass cell names each half (`.glass-dock { & .seat { … } }`, and the parent's own `transition` after a nested rule), not the composite. A brace walk over every `src` stylesheet and `<style>` block finds no declaration after a closed nested block at any depth, so `src` does not write it. `hold-line-claim.py`'s `decl after amp` shape regex matches this composite too, so it would count such a plant as carrying the shape; no plant of that form exists. The first arm (`src/components/dock`) reads the same composite (**1**), because it starts at any `{`.
- **Pass 21's hardening notes stand** (fix 22 did not take them up): G10 with a combinator inside `:is()` or an upper-case property; W-0.12 G1 with a relative nested selector without `&`, or `&` under a selector-list parent; I7-G3 with a carrier set from script.

## Notes outside the checklist (not counted)

- **The gate runner's filter.** My placeholder exclusion (`<[a-z]…>`) is broader than pass 21's, so 197 spans ran against its 211. Every band still has a nonzero span, and the BLOCKER spans were run by name.
- **G-L7-6** still exits 2 on its upper-case `<W-L.7 base>` placeholder; **W-0.7 G6, G9 and G-L8-12** read tags that do not exist yet (`v10.2.0`, `v11.0.0`).
- **W-F.5's gate table** has two columns, so `gates.py` does not see its seven gates.
- **G10's subject test** also matches `.dock-layer-group` and `.dock-layer-switcher`; nothing reads false-red today.
- **W-I.7 §3 item 1's** `var(--icon-button-transition)` is not declared in `src` at HEAD (fix 20's observation).
- **Fix 19's open items stand:** I7-G1 finds dock rules outside the dock by the word `dock`, and its indicator exception works by selector name; real Safari is unmeasured (OW-3); `hold-line-scope.py` does not cover born-RED gates; W-0.12's per-frame strip has no formation reading; the ROUTE arm does not check fixture scenes; G15 does not resolve a ring token declared outside `src/components/dialog`.
- **Sweep runtime.** `hold-line-claim.py` took 489 s here. It plants into the tree it is given, so the plants and gate runs in this pass ran either on a separate `src` copy or after it finished.
