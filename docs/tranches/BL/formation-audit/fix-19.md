# BL — formation fix, seat 19

| field | value |
|---|---|
| seat | formation fix seat 19, before audit pass 19. Answers `formation-audit/pass-18.md` (FR-01 to FR-03) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `b0111693` (pass 18 banked) |
| where probes ran | worktree `.claude/worktrees/bl/formation/fix-19/wt` at `b0111693`, `node_modules` and `tests-visual/node_modules` symlinked. No build, no browser, no dev server. Every plant was undone by writing back each file's original text: `git status --short` in the worktree read 0 lines after the last run. The worktree is removed (`git worktree list \| grep -c fix-19` → 0). Playwright WebKit is not Safari; no WebKit cell was read. Real Safari is UNMEASURED (OW-3) |
| writes | `waves/W-I.7.md` (rows I7-G1, I7-G3), `waves/W-I.2.md` (row G10); under `formation-audit/sweeps/`: `hold-line-claim.py` (one new SIBLING kind, `outsheet`, and its 25 plants) and a `# ===== fix-19` section on every `.out`; this file. `PLAN.md` and `LEDGER.md` need no change (below). The plan has no `MIGRATION.md` |
| fences | nothing under `design/` read, run or written. No git write in the checkout (the before-run's HEAD plan came from `git archive HEAD`, extracted into the scratchpad). No sibling repo touched. Sweeps ran with `PYTHONDONTWRITEBYTECODE=1` and `python3 -B`; `sweeps/` holds no `__pycache__` |

## Result

| finding | class | sweep | before | after |
|---|---|---|---|---|
| FR-01 to FR-03 | a static gate scoped to one component directory passes a declaration on that component's own classes written in a stylesheet outside the directory, a form `src` uses (`styles/glass/glass-capsule.css:167-169` pads the dock seat) | `hold-line-claim.py`, SIBLING arm, new kind `outsheet` | **exit 1**: 18 SIBLING in 3 gates (enumeration alone); 20 NARROW in 3 gates once the plants are in (plan at `b0111693`) | **exit 0**, open 0, plants 704 |

Pass 18 named two gates. The sweep found the class in a third: **W-I.2 G10** (snap targets), whose awk read `src/components/dock/styles/*.css` only.

The other twelve sweeps exit 0 on the plan fix-19 leaves, with pass 18's summary lines: `reshape-order.py` (rows 83), `borrowed-red.py` (rows 1), `inbound-fold.py` (ids 37), `release-gates.py` (waves 102, band-0 loop gates {D2, D3}), `chronic-decided.py` (members 51, ledger rows 825), `ledger-terminal.py` (825), `hold-line-scope.py` (2), `fl6-plate-reads.py <checkout>` (reads 27), `fail-open-gates.py <worktree>` (gate rows 730, fail-open rows run 124), `migration-values.py <worktree>` (candidates 52), `pi-surface.py <worktree>` (manifest routes 80). `gates.py` and `plan_dag.py` exit 0. The three edited rows each split into 4 cells (`gates.split_cells`), and `gates.py` renders each span byte-equal to the span run in the worktree.

**The three rewritten gates at HEAD**, run in the worktree, each exit **1** on the live defect, on the same lines as before:

| gate | file:line | HEAD hits |
|---|---|---|
| I7-G1 | `waves/W-I.7.md:42` | first arm: `run.css:357,366,376,384`. The new third arm exits 1 (no hit) at HEAD; over all of `src` it lists `run.css` only |
| I7-G3 | `waves/W-I.7.md:44` | `run.css:251`, `:310`; `rg -lU '…padding…--dock-ring-reserve' src` lists `run.css` only |
| G10 | `waves/W-I.2.md:93` | `run.css`; the awk over every `src` `.css` prints that one file |

None of them is GREEN where its row says RED, so none is removed.

## The class and the sweep

**Why fix-18's arm missed it.** Fix-18's `sibsheet` read other stylesheets of the same directory, and `sfcstyle` read SFC `<style>` blocks of the same directory. Both stop at the directory boundary. `src` styles a component's classes from global sheets too.

**The kind** (`hold-line-claim.py`: docstring `:118-124`; `_src` gains `styletexts` and `quoted`; the enumeration at `:1754-1763`; `_outsheets` at `:1788`; `_filed` at `:1818`; `sibling_arm` at `:1832`):

| kind | enumerated when | carried by |
|---|---|---|
| outsheet | an S entry's span reads a component directory (not `src` whole), touches a property family, and a style file outside that directory names, in its selectors, a class the directory both styles and writes and names for itself (its folder name as a hyphenated word: `.dock-icon-button`, `.glass-dock`, `.dock-run`) | a plant written in that file, red where the spec holds the claim on that rule, green where it does not |

The name filter keeps shared classes out (`.button`, `.dark`, `.glass-capsule` are written by many directories; without it the dock alone listed 23 files, most with no dock rule). With it, the dock lists six files, the four pass 18 named and two more: `styles/glass-specular-track.css:37-40` (`.dock-icon-button::before` and the dock triggers) and `dark-mode-toggle/dark-mode-toggle.css:57-58` (`.glass-dock` sizing the toggle).

**What it does not read: a wave's §4 list.** Pass 18 suggested adding every §4 path outside the directory. I built that arm and ran it: it listed 26 more files across three gates (W-H.1 G15 alone: 20 sheets, including `slider/styles.css` and `tokens/property-regs.css`), because §4 names files for every item of a wave, not for one gate's subject. A §4 sheet that styles the component's classes is listed by the selector read already: W-I.1 §4's `glass-capsule.css` and `material.css` are both in the six. So the arm reads selectors only; the reason is in the code comment at the enumeration.

**Before (1), enumeration alone** (`hold-line-claim.out`, `# ===== fix-19`; the fix-19 sweep less its outsheet plants, plan at `b0111693` via `BL_ROOT`): **exit 1**, 18 SIBLING: G10 ×6, I7-G1 ×6, I7-G3 ×6, the same six files each.

**Before (2), the fix-19 plants on the HEAD plan:** **exit 1**, open 20, all NARROW: G10 6, I7-G1 7, I7-G3 7.

**After:** **exit 0**, open 0, in-scope static gates 137 (S 65, L 67, H 5), plants 704.

## Per finding

**FR-01 · cured.** `waves/W-I.7.md:44`, I7-G3.
- The span reads `src` instead of `src/components/dock`. The reserve token is declared and read in the dock directory only (`rg -c dock-ring-reserve src` → `dock/styles/run.css:4`, `dock/styles/index.css:1`), so reading `src` whole adds no false red. That is pass 18's first suggested cure.
- Plants (`hold-line-claim.py:872-880`). Red: the reserve as padding on `.dock-run` and on `.dock-icon-button` in `glass/glass-capsule.css` (pass 18's two plants), in `glass/material.css` with the value on the next line, in `glass/rim.css`, `utilities/a11y-overrides.css`, `glass-specular-track.css` and `dark-mode-toggle.css`. Each exits 1 on the cured base (exit 0 before the widening). Green: `outline-offset: var(--dock-ring-reserve)` and HEAD's own seat padding (`glass-capsule.css:168`) exit 0.

**FR-02 · cured.** `waves/W-I.7.md:42`, I7-G1.
- A third arm runs the same size-transition and carried patterns over `src -g '*.css' -g '*.vue' -g '!src/components/dock/**'`, for a rule whose selector names a dock class (`(?=[^{}]*dock)` on the selector), one nesting level deep, with the indicator exception at both levels. Pass 18's first suggested shape (all of `src/styles` with no selector test) was not used: a size transition on a non-dock rule in a global sheet is not this claim's subject. The dock-directory arm is unchanged, so its existing `.x` plants still hold.
- Plants (`:841-849`). Red: a seat transition in `glass-capsule.css` (pass 18's plant), in `material.css` (pass 18's second plant), in `rim.css` with the value on the next line, in `a11y-overrides.css` with the size second in the list, carried on a custom property in `glass-specular-track.css`, nested under `.glass-dock { & … }` in `dark-mode-toggle.css`, and `:where(.glass-dock) .x { transition-property: opacity, width }` under `@layer components`. Each exits 1 on the cured base (the cure ops rewrite `run.css:357,366,376,384` to §3 item 1's form, exit 0); each exited 0 before. Green: §3 item 1's appended form in `glass-capsule.css`, and `.glass-capsule { transition: width … }` in `material.css`, exit 0.

**FR-03 · cured.** `formation-audit/sweeps/hold-line-claim.py`, kind `outsheet` (above). FR-01 and FR-02 are now its plants. Its third instance:
- **W-I.2 G10** (`waves/W-I.2.md:93`). The awk read `src/components/dock/styles/*.css`; it now reads `$(find src -name '*.css')`. The pass cell already says "no snap rule targets the run's children", with no file bound, so the claim reaches a global sheet. Plants (`:797-803`): `.glass-dock .dock-run > * { scroll-snap-align: start }` in each of the six files exits 1 on the cured base (0 before); `.dock-run[data-overflowing] [data-dock-seat]` in `glass-capsule.css` exits 0.

**The census pass 18 listed** (W-I.1 G11, G18; W-I.5 I5-G1; W-I.2 G10; W-0.8 G4, G14). The arm reads S entries that touch a property family. G10 is the one listed. W-0.8 G14 is an H entry (held in paint by G12), so the arm does not read it. W-I.1 G11, G18, I5-G1 and W-0.8 G4 touch no CSS property family, so a global sheet's rule is not a spelling of their subject.

## Sources that disagreed

None found. Each widened gate owns its file set; `LEDGER.md:231` (C-8) cites "I7-G1 to I7-G4" by id only, and R2-02-04 and R3-02-09 point at W-I.7 by wave, so no ledger cell repeats a span.

## Open, carried

- **Selector-by-name.** I7-G1's third arm finds a dock rule by the word `dock` in its selector, one nesting level deep. A dock seat styled through a class that does not carry the word (a bare `button` under `.glass-dock` two levels up) passes. `src` writes no such rule today.
- **I7-G1's indicator exception** works by selector name, as fix-18 recorded.
- Fix-18's other open items stand: real Safari (OW-3); `hold-line-scope.py` does not cover born-RED gates; W-0.12's per-frame strip has no formation reading; the ROUTE arm does not check fixture scenes; G15 does not resolve a ring token declared outside `src/components/dialog`.
