# BL — formation fix, seat 20

| field | value |
|---|---|
| seat | formation fix seat 20, before audit pass 20. Answers `formation-audit/pass-19.md` (FS-01 to FS-03) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `a4ea8339` (pass 19 banked) |
| where probes ran | worktree `.claude/worktrees/bl/formation/fix-20/wt` at `a4ea8339`, `node_modules` and `tests-visual/node_modules` symlinked. No build, no browser, no dev server. Every plant was undone by writing back each file's original text: `git status --short` in the worktree read 0 lines after the last run. The worktree is removed (`git worktree list \| grep -c fix-20` → 0). Playwright WebKit is not Safari; no WebKit cell was read. Real Safari is UNMEASURED (OW-3) |
| writes | `waves/W-I.2.md:93` (G10), `waves/W-I.7.md:44` (I7-G3); under `formation-audit/sweeps/`: `hold-line-claim.py` (three new SIBLING kinds, 28 new plants, `_outsheets` folded onto the new `_own`) and a `# ===== fix-20` section on every `.out`; this file. `PLAN.md` and `LEDGER.md` need no change (below). The plan has no `MIGRATION.md` |
| fences | nothing under `design/` read, run or written. No git write in the checkout (the before-run's HEAD plan came from `git archive HEAD`, extracted into the scratchpad). No sibling repo touched. Sweeps ran with `PYTHONDONTWRITEBYTECODE=1` and `python3 -B`; `sweeps/` holds no `__pycache__` |

## Result

| finding | class | sweep | before | after |
|---|---|---|---|---|
| FS-01 to FS-03 | a static gate passes its subject when `src` spells it (a) through a custom property that the gated property reads, (b) as the definition of the token the gate names, or (c) after the combinator the gate reads, with a compound the gate does not list | `hold-line-claim.py`, SIBLING arm, new kinds `readvia`, `inline`, `compound` | **exit 1**, open 20, enumeration alone (HEAD CLAIMS, HEAD plan). **exit 1**, open 22, all NARROW, with fix-20's plants on the HEAD plan | **exit 0**, open 0, plants 732 |

The sweep found the class past the two named gates in one more row: **W-E.8 E8-G4** (`--radius-card` and `--radius-sm`, read as whole corner values in `metric/styles.css:123,142`). Both are green there (below), so E8-G4's span is unchanged.

The other twelve sweeps exit 0 on the plan fix-20 leaves, with pass 19's summary lines: `reshape-order.py` (rows 83), `borrowed-red.py` (rows 1), `inbound-fold.py` (ids 37), `release-gates.py` (waves 102, band-0 loop gates {D2, D3}), `chronic-decided.py` (members 51, ledger rows 825), `ledger-terminal.py` (825), `hold-line-scope.py` (2), `fl6-plate-reads.py <checkout>` (reads 27), `fail-open-gates.py <worktree>` (gate rows 730, fail-open rows run 124), `migration-values.py <worktree>` (candidates 52), `pi-surface.py <worktree>` (manifest routes 80). `gates.py` and `plan_dag.py` exit 0. Each edited row still splits into 4 cells and renders one span, byte-equal (newlines aside) to the script run in the worktree.

**The two rewritten gates at HEAD**, rendered through `gates.py` and run in the worktree:

| gate | file:line | HEAD |
|---|---|---|
| G10 | `waves/W-I.2.md:93` | **exit 1**: `run.css` (the rule at `:270`), no other file |
| I7-G3 | `waves/W-I.7.md:44` | **exit 1**: `run.css:251`, `:310`. The carrier arm alone also exits 1 at HEAD, through `--dock-ring-reserve` itself (those two lines read it as padding; `index.css:240` sets it from the ring terms). It lists 50 custom properties that padding reads in `src` at HEAD, 49 on the cured base, and prints nothing there |

Neither is GREEN at HEAD, so neither is removed.

## The class and the sweep

**Why fix-19's arm missed it.** Every earlier kind reads a name or a form the gated declaration itself is written in. None read a value that reaches the declaration from elsewhere: a custom property the declaration reads, the definition behind the token, or the other compounds `src` writes after the selector path the gate reads. `carried` came closest, but it fires only when `src` already declares a carrier whose value the span fails.

**The kinds** (`hold-line-claim.py`: docstring `:125-145`; `decls` at `:1571`; the enumeration at `:1816-1853`; `SHAPED` at `:1877-1880`; `_blocks` `:1899`, `_members` `:1916`, `_own` `:1940`, `_readvia` `:1953`):

| kind | enumerated when | carried by |
|---|---|---|
| readvia | an S entry's red plants declare a property the span touches, and `src` reads a custom property as a whole value member of it (`padding: var(--x, var(--y, 0))`; a `transition` list member that is `var(--x)`) in a rule of a component directory the row names (a file under it, or a selector naming a class the directory both styles, writes and names for itself), or reads it so anywhere and declares it in such a rule | a plant that declares `--x` |
| inline | the span reads a token in a declaration value (`:[^;{}]*--t`, not inside a `(?!…)` allow-list, which fails closed on any other spelling), and `src` declares that token from other tokens; one level further too | a plant naming every term |
| compound | the span reads a class before a `>` combinator; each compound head `src` writes after that class and `>` (`*`, `:not(`, `:has(`, `[aria-current`, `.class`, a tag) | a plant writing that head after that class and `>` |

**Scope of `readvia`.** Unscoped, the kind listed 48 to 114 properties per gate (every `--_music-staff-*` read by a size). Two limits make each listed property a real route: the property must be a whole value member (so `--duration-fast` inside a `transition` member, or `--detent-t` inside `calc()`, is not a carrier), and the rule must belong to a directory the row names. With them the census over all 65 S entries is 13 properties for I7-G3, 2 for E8-G4, and none elsewhere. W-I.1 G18 would have listed 15 size tokens through its `@media` plants; its span reads the pointer query, not a property, so the touched-family test leaves it out.

`_outsheets` (fix-19) now calls `_own` instead of repeating it. Read on the checkout's `src`, the old and new `_outsheets` return the same set for all 44 component directories (dock: 6 files).

## Per finding

**FS-01 · cured.** `waves/W-I.7.md:44`, I7-G3.
- The first arm fails a `padding*` declaration or padding utility naming any ring token: `--dock-ring-reserve`, its terms `--dock-ring-width` and `--dock-ring-offset` (`dock/styles/index.css:240`), or theirs, `--focus-ring-width` (`:227-228`). No padding in `src` names one at HEAD except `run.css:251,310` (`rg 'padding…(focus-ring\|dock-ring)' src`), so the widening adds no false red.
- A second arm lists every custom property a `padding*` declaration or padding utility in `src` reads, and fails if any of them is set anywhere in `src` to a value naming a ring token. This is pass 19's suggested cure, read from `src` rather than from a fixed list.
- Plants (`hold-line-claim.py:912-930`). Red, each exit 1 on the cured base and exit 0 on the HEAD plan (before (2)): `--dock-icon-padding: var(--dock-ring-reserve)` in `glass/glass-capsule.css` and on `.dock-run > [data-dock-seat]` in `run.css` (pass 19's plants); `--dock-control-safe-inset` with the reserve on the next line; `--dark-mode-toggle-padding` in `dark-mode-toggle.css` (pass 19's plant); the nine other dock padding carriers the kind lists; `padding-block: calc(var(--dock-ring-width) + var(--dock-ring-offset))` (pass 19's plant); `padding: var(--dock-ring-width)`; `padding-inline: calc(2 * var(--focus-ring-width))`. Green, exit 0: `outline-offset: var(--dock-ring-reserve)`; the reserve carried on a custom property to `outline-offset`; the ring's own `outline` and `outline-offset` (`index.css:286-287`); HEAD's `margin-block` pair; the reserve re-declared under `.glass-dock.compact` (no padding reads it once cured).
- The entry gained a cure op (`striphits` of the reserve-as-padding lines), so the cured base is built from the first arm's own hits and the carrier arm's listing is never stripped.

**FS-02 · cured.** `waves/W-I.2.md:93`, G10.
- The awk now reads each rule with `scroll-snap-align` as its selector (comments, at-rule heads and declarations before a nested rule removed, `&` and `{` joined into the selector chain). For each item of the selector list, if a compound after `.dock-run`, `.dock-layer` or a `.dock-layer--*` modifier follows a combinator (`>`, space, `+`, `~`, at paren depth 0), the last compound must carry `[data-dock-seat]`. So any compound after the run fails, not only `*`, and so does a descendant.
- Plants (`hold-line-claim.py:826-833`). Red, each exit 1 on the cured base (the cure op now rewrites `run.css:270` to §3 item 2's `.glass-dock .dock-run [data-dock-seat]`, replacing the old strip of every snap line): pass 19's three plants (`> :not(…)`, `> [aria-current]`, the three-line vertical form), `> :has(…)`, a descendant `.dock-run button`, and `& > :not([x])` nested under the run. The existing `.dock-layer--summary > *`, `.dock-layer--full > *`, `.dock-layer > *` and `.dock-run[data-overflowing] > *` plants still exit 1. Green, exit 0: `.dock-run [data-dock-seat]`, `.dock-run > [data-dock-seat]`, `.dock-run[data-overflowing] [data-dock-seat]`, `.dock-layers > .dock-layer`.
- My first draft read `.dock-layer--full` by name and lost `.dock-layer--summary`; the sweep's existing plant caught it (NARROW), and the class test now reads `\.dock-(run|layer)([^a-z0-9_]|$)`.

**FS-03 · cured.** `formation-audit/sweeps/hold-line-claim.py`, kinds `readvia` (FS-03 (a)), `compound` (FS-03 (b)) and `inline` (the definition spelling FS-01 names). FS-01 and FS-02 are now their plants. The third instance is E8-G4:
- **W-E.8 E8-G4** (`waves/W-E.8.md:68`). `metric/styles.css:123,142` read `--radius-sm` and `--radius-card` as whole corner values (the live defect). Both plants are green (`hold-line-claim.py:629-630`): once Metric reads `--radius-ctx`, re-declaring a rung on Metric moves no corner, because `--radius-ctx` is computed where it is declared (`theme/radius.css:203`, `glass/overlay-plate.css:64`) and inherited as a value. E8-G4 passes both. Its span is unchanged.
- **Not listed, with reasons.** `inline` reads E8-G4's `--radius-ctx` only inside the allow-list, which fails any other spelling closed. E12-G2 reads `--pager-dot-size` through `getPropertyValue`, a script read, not a declaration value. I7-G1's carrier `--icon-button-transition` is not declared in `src` at HEAD (`rg icon-button-transition src` → 0 lines), so no `transition` reads it.

## Sources that disagreed

None found. `LEDGER.md:231` (C-8) cites I7-G1 to I7-G4 by id only, and R3-01-15 points at W-I.1 and W-I.2 by wave. `grep -rln 'dock-ring-reserve\|snap-align' PLAN.md LEDGER.md waves/` lists only `W-I.2.md` and `W-I.7.md`, so no other file repeats either span.

## Open, carried

- **One hop.** I7-G3's carrier arm reads one custom property deep: `--a: var(--dock-ring-reserve)` read by `--dock-icon-padding: var(--a)` passes. `src` writes no such chain to a padding carrier today.
- **G10's subject test is by marker name.** `:is([data-dock-seat], .x)` as the last compound passes, and a snap declaration written after a nested rule in the same block is read without its selector. `src` writes neither.
- **The two kinds stop seeing these rows once cured.** I7-G3's span now names the ring tokens through a group (`--(?:dock-ring-(?:reserve|offset)|…)`), and G10 no longer names `>`, so `inline` and `compound` list nothing for them after the rewrite. Their plants stay in the entries and run on every pass.
- **Observation, not a finding.** W-I.7 §3 item 1's cure form reads `var(--icon-button-transition)`, which `src` does not declare at HEAD (the control's list is literal at `controls/icon-button.css:60-71`, which §4 marks "read, not changed"). The wave must publish that token or write the list out.
- Fix-19's open items stand: I7-G1 finds dock rules by the word `dock`, and its indicator exception works by selector name; real Safari (OW-3); `hold-line-scope.py` does not cover born-RED gates; W-0.12's per-frame strip has no formation reading; the ROUTE arm does not check fixture scenes; G15 does not resolve a ring token declared outside `src/components/dialog`.
