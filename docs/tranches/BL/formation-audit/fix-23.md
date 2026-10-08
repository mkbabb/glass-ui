# BL — formation fix, seat 23

| field | value |
|---|---|
| seat | formation fix seat 23, before audit pass 23. Answers `formation-audit/pass-22.md` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `544c9271`, the commit pass 22 read. `git diff --stat 544c9271 HEAD -- docs/tranches/BL/PLAN.md docs/tranches/BL/waves docs/tranches/BL/LEDGER.md docs/tranches/BL/formation-audit src tests tests-visual` is empty, and `git status --short` over the same paths lists only the untracked `pass-22.md`. The plan has no `MIGRATION.md` |
| where probes ran | worktree `.claude/worktrees/bl/formation/fix-23/wt` at `HEAD`, `node_modules` and `tests-visual/node_modules` symlinked. Nothing was built. Its `waves/`, `PLAN.md`, `LEDGER.md` and `sweeps/` compare equal to the checkout's (`diff -r`, `cmp`). `hold-line-claim.py` ran alone in it. After the run, `git status --short` in the worktree listed only the `pass-22.md` copy this seat placed there. `git worktree remove --force`, then `git worktree list \| grep -c fix-23` → 0 |
| engines | none. No browser, no Playwright WebKit. Real Safari is UNMEASURED (OW-3) |
| writes | this file only. No change to `PLAN.md`, `waves/`, `LEDGER.md` or any sweep or `.out`. Nothing under `design/` read or written; no tracked source, no git write in the checkout; no sibling repo touched. Sweep outputs went to this seat's scratchpad (`fix-23/*.out`); `sweeps/` holds no `__pycache__` |

## Result

Pass 22 reads **clean = true**. All nine checklist rows PASS, and it records no open finding. This seat therefore has **no finding to cure** and makes **no plan edit**. Changing the plan now would hand pass 23 a different plan from the one pass 22 found clean, and two consecutive clean passes have to read the same plan.

Since no finding is open, the CLASS-SWEEP LAW has no class to extend. Each of the twelve existing sweeps was re-run against the unchanged plan to confirm its class is still clean.

## Sweeps, re-run (this seat's commands)

`PYTHONDONTWRITEBYTECODE=1`, `python3 -B`, run from the worktree's `sweeps/`.

| sweep | argument | exit | summary line |
|---|---|---:|---|
| `reshape-order.py` | — | 0 | `rows 83, open 0, stale 0` |
| `borrowed-red.py` | — | 0 | `rows 1, open 0, stale 0` |
| `inbound-fold.py` | — | 0 | `ids 37, open 0, stale 0` |
| `release-gates.py` | — | 0 | `waves 102, band-0 loop gates {D2, D3}, open 0` |
| `chronic-decided.py` | — | 0 | `members 51, ledger rows 825, L04 master rows 45, open 0` |
| `ledger-terminal.py` | — | 0 | `ledger rows 825, open 0` |
| `hold-line-scope.py` | — | 0 | `static hold lines with paths 2, open 0` |
| `fl6-plate-reads.py` | checkout | 0 | `reads 27, open 0` |
| `fail-open-gates.py` | worktree | 0 | `gate rows 730, fail-open rows run 124, docket rows 20, open 0` |
| `migration-values.py` | worktree | 0 | `published tokens 902, props with defaults 109, candidates 52, open 0` |
| `pi-surface.py` | worktree | 0 | `component stylesheets 55, demo route mentions 487, manifest routes 80, open 0` |
| `hold-line-claim.py` | worktree, alone | 0 | `in-scope static gates 137 (hold lines 6; S 65, L 67, H 5), plants 767, open 0` (679 s) |
| `gates.py`, `plan_dag.py` | bare | 0 | — |

Every summary line matches pass 22's line for line.

## Pass 22's hardening note and notes outside the checklist

**H-1 (I7-G1 third arm, a nested dock rule's own declaration after its own nested block): left as it is, on purpose.** Pass 22 counts it as a hardening note that never makes a pass unclean. No spec writes the composite, and `src` holds no instance of it. This seat repeated the brace walk over every `src/**/*.css` file and every SFC `<style>` block (166 blocks, comments stripped). It counted declarations that follow a closed nested block at any depth: **0**. Rewriting I7-G1 for a spelling that exists nowhere is new scope, and it would change a gate row just before the pass that has to confirm convergence. One thing for pass 23 to weigh, which this seat does not rule on: W-I.7 `:42` says the third arm reads "past closed sibling nested rules, at any depth (fix-22)". H-1 shows that holds for the dock rule's own body but not inside a nested seat rule's body. If pass 23 reads that wording as a claim the gate breaks, the cure is to narrow the wording or extend the skip, and to extend `hold-line-claim.py`'s `nesting` plants to match.

**Pass 21's hardening notes (G10 combinator in `:is()`; W-0.12 G1 relative selector; I7-G3 script carrier) and the out-of-checklist notes (G-L7-6 placeholder, unborn tags, W-F.5's two-column table, G10 subject breadth, `--icon-button-transition` undeclared, fix 19's open items):** pass 22 records these as uncounted, and earlier seats either decided them or left them standing on recorded grounds. This seat does not reopen them.

## Open

Nothing from pass 22. Real-Safari cells stay UNMEASURED (OW-3, the owner's safaridriver checkbox).
