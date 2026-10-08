# BL — formation fix, seat 22

| field | value |
|---|---|
| seat | formation fix seat 22, before audit pass 22. Answers `formation-audit/pass-21.md` (FU-01, FU-02) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `8becaac7` (pass 21 banked). The checkout's plan files equalled the worktree's before any edit (`diff -r waves` empty) |
| where probes ran | worktree `.claude/worktrees/bl/formation/fix-22/wt` at `8becaac7`, `node_modules` and `tests-visual/node_modules` symlinked. No build, no browser, no dev server. Each plant was undone by writing the original file back. `git status --short` in the worktree read 0 lines after each run, and the worktree is removed (`git worktree list \| grep -c fix-22` → 0). `hold-line-claim.py` ran alone in the worktree. The three sweeps that read the tree (`fail-open-gates`, `migration-values`, `pi-surface`) were re-run after it finished, and those are the runs recorded. Playwright WebKit is not Safari; no WebKit cell was read. Real Safari is UNMEASURED (OW-3) |
| writes | `waves/W-I.7.md:42` (I7-G1: span, pass cell, HEAD cell); `formation-audit/sweeps/hold-line-claim.py` (the `nesting` kind is now listed per scope, two new shapes, a rule-walk trigger, 13 new plants); a `# ===== fix-22` section on every `.out`; this file. `PLAN.md`, `LEDGER.md` and `waves/INDEX.md` need no change (below). The plan has no `MIGRATION.md` |
| fences | Nothing under `design/` was read, run or written, and no sibling repo was touched. No git write in the checkout. The sweeps ran with `PYTHONDONTWRITEBYTECODE=1` and `python3 -B`, and `sweeps/` holds no `__pycache__` |

## Result

| finding | class | sweep | before | after |
|---|---|---|---|---|
| FU-01, FU-02 | a static gate that reads a declaration inside a CSS rule misses a nesting shape on one of the scopes its arms read. The shapes that slip through are the parent's own declaration after a closed nested rule or at-rule, and nesting deeper than one level. The sweep held each shape once per row, not once per arm, so a plant in one arm's files stood in for every arm | `hold-line-claim.py`, SIBLING kind `nesting`, widened | **exit 1**, 7 open SIBLING (enumeration over fix-21's plants). **exit 1**, open 3, all NARROW on I7-G1 in `run.css` (fix-22's plants, HEAD plan through `BL_ROOT`) | **exit 0**, open 0, plants 767 |

How far the class reaches: three spans in the plan read a declaration inside a CSS rule: W-0.12 G1 and G10 (both awk walks of the braces) and I7-G1 (a regex that crosses the rule's `{`). A scan of every unstruck §5 span for a `\{[^{}` regex or an awk brace walk found these three and no others. C4-G7's `[^{;]*\{` counts rule heads and reads no declaration. K7-S's `\{` is a JavaScript literal.

The seven instances the widened sweep listed (`hold-line-claim.out`, fix-22 "before (1)"):

| row | scope | shape | carried now by |
|---|---|---|---|
| W-0.12 G1 | `src` | decl after amp, decl after at | `hold-line-claim.py:298-300` (two red, one green) |
| G10 | `src` | decl after amp, decl after at | `:860-862` (two red, one green) |
| I7-G1 | `src/components/dock` (first arm) | decl after amp, decl after at | `:912-916` (three red incl. two-level nesting, two green) |
| I7-G1 | `src` less `src/components/dock` (third arm) | decl after at | `:917` (red) |

W-0.12 G1 and G10 already read both shapes. Their stack walks keep the parent's selector after a nested `}`, and each new red plant exits 1 on the cured base. Only I7-G1's first arm was narrow, which is FU-01.

## Per finding

**FU-01 · cured.** `waves/W-I.7.md:42`, I7-G1.
- Before the change, the first arm read `[^{};]*\{[^{}]*?transition…` from a rule's `{` to the first nested block and stopped there. It now reads `[^{};]*\{(?:[^{}]*+(\{(?:[^{}]++\|(?-1))*+\}))*[^{}]*?transition…`, which skips any number of closed nested blocks of any depth (PCRE2 recursion) before the declaration. The third arm's one-level skip `(?:[^{}]*\{[^{}]*\})*` is replaced by the same balanced skip, so both CSS arms read the same way. The indicator exception still works: a nested indicator block is skipped as a whole, and a match that starts at its selector is still blocked by the lookahead.
- Probes on the cured base (`run.css:357,366,376,384` in §3 item 1's appended form). That base exits 0. With the old span:
  - the parent's `transition: inline-size 1s` after `&:focus { … }` in `run.css` exits **0**
  - the parent's `transition: width 1s` after a nested `@media { … }` in `run.css` exits **0** (pass 21's two plants, reproduced)

  With the new span:
  - those two plants, plus the same declaration after a two-level nested block, each exit **1** in `run.css`
  - in `glass/glass-capsule.css`, the parent's `transition: width` after `&:focus { … }`, after a nested `@media { … }`, and after a two-level block each exit **1**
  - pass 21's three `run.css` controls still exit **1**
  - §3 item 1's appended form after a nested rule exits **0** in both sheets, and so does an indicator glide nested after a sibling rule in `run.css`
- HEAD: **exit 1** (`run.css`, the first arm, from `:322`), run last in the worktree before its removal. The pass cell now says the first arm reads past closed nested blocks at any depth, and the HEAD cell records these readings ahead of fix-21's.

**FU-02 · cured.** `formation-audit/sweeps/hold-line-claim.py`.
- `_css_scopes` (`:1993`) splits each span into its `&&` arms with `_arms` (`:1975`, quote-aware). For each arm that names `.css`, it records the arm's path arguments less its `-g '!…'` exclusions. I7-G1 reads as `src/components/dock` and `src !src/components/dock`. W-0.12 G1 and G10 each read as `src`.
- The `nesting` kind (`:1933`) is now listed as `<shape> @ <scope>` for every scope. A plant carries an entry only when its file lies in that scope (`_inscope`, `:2023`; check at `:2149`).
- `DECL_AFTER` (`:1972`) adds `decl after amp` and `decl after at` with their shape regexes (`:1966`). These are the shapes I7-G1's pass cell names. A rule body may take them, though `src` writes neither.
- `_walks_rules` (`:2015`) also lists the kind for any row whose span reads a declaration inside a rule, whether or not it names nesting. It finds the same three rows today.
- Docstring: `:153`.

## Gates GREEN at HEAD

None of the edited rows is GREEN. I7-G1 exits 1 at HEAD.

## Sources that disagreed

None. `grep -rn 'I7-G1' PLAN.md LEDGER.md waves/INDEX.md waves/*.md` finds only the spec row itself, `LEDGER.md:231` (the C-8 row, which names the gates but does not repeat a span) and `W-I.7.md:62` (its wave gate). No span or pass cell is copied anywhere else.

## Sweeps, re-run

| sweep | exit | summary line |
|---|---:|---|
| `reshape-order.py` | 0 | `rows 83, open 0, stale 0` |
| `borrowed-red.py` | 0 | `rows 1, open 0, stale 0` |
| `inbound-fold.py` | 0 | `ids 37, open 0, stale 0` |
| `release-gates.py` | 0 | `waves 102, band-0 loop gates {D2, D3}, open 0` |
| `chronic-decided.py` | 0 | `members 51, ledger rows 825, L04 master rows 45, open 0` |
| `ledger-terminal.py` | 0 | `ledger rows 825, open 0` |
| `hold-line-scope.py` | 0 | `static hold lines with paths 2, open 0` |
| `fl6-plate-reads.py <checkout>` | 0 | `reads 27, open 0` |
| `fail-open-gates.py <worktree>` | 0 | `gate rows 730, fail-open rows run 124, docket rows 20, open 0` |
| `migration-values.py <worktree>` | 0 | `published tokens 902, props with defaults 109, candidates 52, open 0` |
| `pi-surface.py <worktree>` | 0 | `component stylesheets 55, demo route mentions 487, manifest routes 80, open 0` |
| `hold-line-claim.py <worktree>` | 0 | `in-scope static gates 137 (hold lines 6; S 65, L 67, H 5), plants 767, open 0` (11 min 6 s; the before run took 14 min 53 s) |
| `gates.py`, `plan_dag.py` | 0 | — |

## Open, carried

- **Pass 21's hardening notes** are outside the checklist and no spec names them, so they are not cured here: G10 with a combinator inside `:is()`, G10 with an upper-case property, W-0.12 G1 with a relative nested selector or `&` under a parent selector list, and I7-G3 with a carrier set from script.
- **Pass 21's notes outside the checklist stand:** G-L7-6's placeholder; W-0.7 G6, G9 and G-L8-12 read tags that do not exist yet; `gates.py` skips W-F.5's two-column table; G10's subject test also matches `.dock-layer-group` and `.dock-layer-switcher`; W-I.7 §3 item 1's `var(--icon-button-transition)` is not declared at HEAD.
- **Fix 19's open items stand:** I7-G1 finds dock rules outside the dock by the word `dock`, and its indicator exception works by selector name. Real Safari is unmeasured (OW-3). `hold-line-scope.py` does not cover born-RED gates. W-0.12's per-frame strip has no formation reading. The ROUTE arm does not check fixture scenes. G15 does not resolve a ring token declared outside `src/components/dialog`.
- **Sweep runtime.** `hold-line-claim.py` takes about 11 minutes, and it plants into the tree it is given. Nothing else may write to or read that tree while it runs.
