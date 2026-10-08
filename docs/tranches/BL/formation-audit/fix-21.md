# BL — formation fix, seat 21

| field | value |
|---|---|
| seat | formation fix seat 21, before audit pass 21. Answers `formation-audit/pass-20.md` (FT-01 to FT-03) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `d95b5248` (pass 20 banked) |
| where probes ran | worktree `.claude/worktrees/bl/formation/fix-21/wt` at `d95b5248`, `node_modules` and `tests-visual/node_modules` symlinked. No build, no browser, no dev server. Every plant was undone by writing back the file's original: `git status --short` in the worktree read 0 lines after the last run. The worktree is removed (`git worktree list \| grep -c fix-21` → 0). Playwright WebKit is not Safari; no WebKit cell was read. Real Safari is UNMEASURED (OW-3) |
| writes | `waves/W-I.2.md:93` (G10), `waves/W-I.7.md:42` (I7-G1), `waves/W-I.7.md:44` (I7-G3), `waves/W-0.12.md:41` (G1); under `formation-audit/sweeps/`: `hold-line-claim.py` (new kind `nesting`, `readvia` made transitive, 23 new plants) and a `# ===== fix-21` section on every `.out`; this file. `PLAN.md` and `LEDGER.md` need no change (below). The plan has no `MIGRATION.md` |
| fences | nothing under `design/` read, run or written. No git write in the checkout. No sibling repo touched. Sweeps ran with `PYTHONDONTWRITEBYTECODE=1` and `python3 -B`; `sweeps/` holds no `__pycache__` |

## Result

| finding | class | sweep | before | after |
|---|---|---|---|---|
| FT-01 to FT-03 | a static gate passes its subject when `src` spells it (a) through a chain of custom properties more than one hop from the gated property, or (b) as a nested rule in a shape the gate's selector reading drops: `&` after a declaration, `&` after a sibling nested rule, an at-rule after a declaration | `hold-line-claim.py`, SIBLING arm: `readvia` made transitive; new kind `nesting` | **exit 1**, open 11 (enumeration alone, HEAD plan). **exit 1**, open 11, all NARROW (fix-21's plants on the HEAD plan) | **exit 0**, open 0, plants 755 |

The sweep found the class at two rows the critic did not name:

- **W-0.12 G1** (`waves/W-0.12.md:41`). Its stack parser joins the parent selector into `ctx` with its whitespace kept, so `&.is-active` under `.dock-layer--summary` reads as the descendant `.dock-layer--summary .is-active`. Any `&` compound nested rule passed, in any position (first place too). Probed on a file holding only the plant: `.glass-dock.collapsed .dock-layer--summary { &.is-active { inline-size: 0; } }` exit 0 before, 1 after.
- **W-I.7 I7-G1** (`waves/W-I.7.md:42`). The third arm (outside `src/components/dock`) reads one nesting level, but only into the first nested block: `&:hover { transition: inline-size … }` after a sibling `&:focus { … }`, and the parent's own `transition: width …` after a nested rule, passed in `glass/glass-capsule.css`.

**E8-G4** got one new readvia sibling (`--radius-2xl`, which `--radius-card` is set from at `theme/radius.css:123`). It is green: `--radius-ctx` is computed at `:root` (`radius.css:203`) and inherited as a value, so re-declaring `--radius-2xl` on Metric moves no corner. E8-G4's span is unchanged.

The other twelve sweeps exit 0 on the plan fix-21 leaves, with pass 20's summary lines: `reshape-order.py` (rows 83), `borrowed-red.py` (rows 1), `inbound-fold.py` (ids 37), `release-gates.py` (waves 102, band-0 loop gates {D2, D3}), `chronic-decided.py` (members 51, ledger rows 825), `ledger-terminal.py` (825), `hold-line-scope.py` (2), `fl6-plate-reads.py <checkout>` (reads 27), `fail-open-gates.py <worktree>` (gate rows 730, fail-open rows run 124), `migration-values.py <worktree>` (candidates 52), `pi-surface.py <worktree>` (manifest routes 80). `gates.py` and `plan_dag.py` exit 0. Each edited row still splits into 4 cells and renders one span, byte-equal to the script run in the worktree.

**The four rewritten gates at HEAD**, rendered through `gates.py` and run in the worktree:

| gate | file:line | HEAD |
|---|---|---|
| G10 | `waves/W-I.2.md:93` | **exit 1**: `run.css` (the rule at `:270`) |
| W-0.12 G1 | `waves/W-0.12.md:41` | **exit 1**: `layers.css:349` |
| I7-G1 | `waves/W-I.7.md:42` | **exit 1**: the first arm on `run.css:322-384`; the third arm exits 0 at HEAD before and after the change |
| I7-G3 | `waves/W-I.7.md:44` | **exit 1**: `run.css:251`, `:310`. The closed carrier list holds 104 custom properties at HEAD and 100 on the cured base, where the span exits 0 in 11.6 s |

None is GREEN at HEAD, so none is removed.

## Per finding

**FT-01 · cured.** `waves/W-I.2.md:93`, G10.
- The awk now reads each `.css` file as one record and walks it with a stack of selectors. On `{` it pushes the segment since the last `;`, `{` or `}`, expanded against the parent: each item of the parent's list times each item of the child's, `&` replaced by the parent item, a selector without `&` joined after it by a space, an at-rule keeping the parent's list. A `scroll-snap-align` declaration is checked against the full expanded list at its depth. The old `sub(/^.*[;}]/, "", s)`, which cut the parent's selector, is gone.
- The marker test now strips parenthesised text from the last compound first, so `> :not([data-dock-seat])` and `:is([data-dock-seat], .x)` fail (pass 20's hardening note).
- Plants (`hold-line-claim.py:845-852`). Red, each exit 1 on the cured base and each exit 0 before: nested after `flex: 0 0 auto;`, after a sibling `&:hover { … }`, inside `@media` after a declaration, under a parent list `.glass-dock .dock-run, .x`, and `> :not([data-dock-seat])`. `.dock-run > *` nested without `&` under `.glass-dock` after a declaration exits 1 (it did before too). Green, exit 0: `& > [data-dock-seat]` after a declaration and a sibling rule; a nested `&:hover` with no snap target. All earlier G10 plants still hold.
- One intermediate run read open 12: the awk named a variable `top`, which the `family` kind read as the `inset` property. Renamed `lv`; it was a word in the span, not a sibling (`hold-line-claim.out`, fix-21 "intermediate").

**FT-02 · cured.** `waves/W-I.7.md:44`, I7-G3.
- The carrier arm closes its list: from the custom properties a `padding*` declaration or padding utility reads, it adds every custom property named in the value of any listed one's declaration, until the list stops growing (4 rounds at HEAD: 50 → 87 → 101 → 104 → 104), then fails any listed property set to a ring token. It reads any position in the value, `calc()` included, so pass 20's glyph-term note is covered too.
- Plants (`hold-line-claim.py:955-957`). Red, each exit 1 on the cured base and each exit 0 before: `--control-icon-padding: var(--dock-ring-reserve)` under `.glass-dock .dark-mode-toggle-button[data-size="control"]`; `--control-icon-padding` set to `--dock-ring-width` with the value on the next line; `--dock-control-glyph-size: calc(var(--dock-control-size) - 2 * var(--dock-ring-reserve))`. Pass 20's `.glass-dock { --control-icon-padding: var(--dock-ring-reserve); }` in `glass-capsule.css` also exits 1 (probed). Green: `outline-offset: var(--dock-ring-reserve)`; the reserve carried to `outline-offset`.
- The pass cell's "The carrier arm reads one hop" sentence is replaced by the closure's description; fix 20's open item ("`src` writes no such chain") is withdrawn, since `dark-mode-toggle.css:54` is one.

**FT-03 · cured.** `formation-audit/sweeps/hold-line-claim.py`.
- (a) `_readvia` (`:2014`) closes its list over `_members` of every `src` declaration of a listed property, wherever written (`:2027`). It lists `--control-icon-padding` for I7-G3 and `--radius-2xl` for E8-G4. Docstring `:136-140`.
- (b) New kind `nesting` (docstring `:148-153`; enumeration `:1605`; listing `:1911`; shape `:1940`). `_src` reads every style text for the shapes `src` writes a nested rule in, inside a rule: `amp after decl` and `amp after rule` (`dock/styles/controls/icon-button.css:26-126`, 2 and 8 sites), `at after decl` (7 sites, `styles/animations.css`'s `@starting-style` among them). `src` nests one level only and never puts a nested rule first. The kind is listed for every row whose id or pass cell names nesting (W-0.12 G1, G10, I7-G1) and is carried only by a red or green plant in that shape.
- Plants: W-0.12 G1 `:286-288`, G10 `:845-852`, I7-G1 `:894-901` (inside and outside the dock), I7-G3 `:955-957`, E8-G4 `:644`.

**W-0.12 G1 (class instance, not named).** `waves/W-0.12.md:41`. `check` takes a local `x` and builds `ctx` from each trimmed enclosing selector, joined by one space. `&.is-active` after `color: red;`, after a sibling `&:hover { … }`, and in first place each exit 1 (each exited 0 before); the same rule under `.glass-dock:not([data-morphing])` exits 0.

**I7-G1 (class instance, not named).** `waves/W-I.7.md:42`. The third arm reads the parent rule past any number of closed sibling nested blocks (`(?:[^{}]*\{[^{}]*\})*`) before the optional nested block. The two plants above exit 1 (0 before). §3 item 1's appended form in that position and a `.carousel-item` width transition exit 0.

## Sources that disagreed

None found. `grep -rn 'one hop\|snap-align\|dock-ring-reserve\|zero-width morph\|seat transition' PLAN.md LEDGER.md waves/INDEX.md` returns the rows' titles only (`INDEX.md:19,89`, `PLAN.md:91`, `LEDGER.md:118,423`), none of which repeats a span or a pass cell. W-F.3's "one hop" (`:69`) is a frame strip, unrelated.

## Open, carried

- **Sweep runtime.** I7-G3's closed carrier arm takes about 12 s per run, so `hold-line-claim.py` now takes about 6 minutes (was about 90 s). Each run sits inside the 60 s cap pass 20's runner uses.
- **Fix-20's open items.** "One hop" is closed (FT-02). "G10's subject test is by marker name" is closed for the negation and `:is()` forms. "A snap declaration written after a nested rule in the same block is read without its selector" is closed (the stack reads it). The rest stands: the two kinds stop seeing these rows once cured, and their plants still run.
- **Observation (fix 20), not a finding.** W-I.7 §3 item 1's cure form reads `var(--icon-button-transition)`, which `src` does not declare at HEAD; the wave must publish that token or write the list out.
- **Fix 19's open items stand:** I7-G1 finds dock rules outside the dock by the word `dock`, and its indicator exception works by selector name; real Safari (OW-3); `hold-line-scope.py` does not cover born-RED gates; W-0.12's per-frame strip has no formation reading; the ROUTE arm does not check fixture scenes; G15 does not resolve a ring token declared outside `src/components/dialog`.
