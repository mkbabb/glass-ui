# BL — formation audit, pass 21

| field | value |
|---|---|
| seat | formation critic, pass 21. Authored none of `PLAN.md`, `waves/`, `LEDGER.md`, passes 1-20, fixes 2-21 or the sweeps |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `39bcd650` (fix 21 banked). The worktree was cut at `d95b5248` before that commit landed, with fix 21's five plan files copied in; `cmp` against `39bcd650` reads all five byte-equal (`waves/W-0.12.md`, `W-I.2.md`, `W-I.7.md`, `sweeps/hold-line-claim.py`, `fix-21.md`), and `git diff d95b5248 39bcd650 -- src` is empty. Since pass 20, the plan changed in four `§5` rows only (`W-0.12.md:41`, `W-I.2.md:93`, `W-I.7.md:42`, `:44`), plus `hold-line-claim.py` and the `.out` files. `git diff 27243e4a 39bcd650 -- PLAN.md LEDGER.md audit waves/INDEX.md CHARTER.md` is empty |
| inputs read | `formation-audit/pass-20.md`; `formation-audit/fix-21.md` (last); the four rewritten rows as rendered through `gates.py`; `hold-line-claim.py`'s nesting docstring (`:140-160`), its I7-G1 plants (`:860-905`) and its `Tree` plant/restore code (`:1293-1340`); PLAN §3 and §5 by script; `audit/REGISTRY.md` by family-header count; W-F.5 §5; every file under `sweeps/` |
| where probes ran | worktree `.claude/worktrees/bl/formation/crit-21/wt`, `node_modules` and `tests-visual/node_modules` symlinked. No build, no browser (the Playwright and chrome-devtools MCP servers failed to connect). Playwright WebKit is not Safari; no WebKit cell was read. Real Safari is UNMEASURED (OW-3) |
| fences | no source edit and no git write in the checkout; nothing under `design/` read, run or written; no sibling repo touched. One collision, undone: my first G10 plant run overlapped a background `hold-line-claim.py` run in the same worktree. I stopped the sweep, rewrote every modified `src` file from `git show HEAD:<path>`, confirmed `git status --short src` at 0 lines, re-ran the sweep alone, then re-ran every plant after it finished. No result below comes from the overlapped runs. Every plant was undone from a `git show HEAD` copy. `git status --short src tests tests-visual` in the worktree read 0 lines before `git worktree remove --force` (`git worktree list \| grep -c crit-21` → 0). Sweeps ran with `PYTHONDONTWRITEBYTECODE=1` and `python3 -B`; `sweeps/` holds no `__pycache__`, and no `.out` changed. The only write in the checkout is this file |

The checklist has nine fixed rows. Each finding names its row. Notes at the end are outside the checklist and do not count.

## Result

| row | check | result |
|---|---|---|
| 1 | all 85 families placed exactly once | PASS |
| 2 | every spec has a gate; every gate RED at HEAD | PASS |
| 3 | no vacuous gate | FAIL (FU-01, FU-02) |
| 4 | every visual claim carries π/DELTA | PASS |
| 5 | every ledger row terminal, pointing at a wave that covers it | PASS |
| 6 | no loop wave pre-empts its loop, except owner-ratified and recorded exceptions | PASS |
| 7 | DAG acyclic, one source; band 0 external only on D3 and D2 | PASS |
| 8 | every break has a MIGRATION row, no alias | PASS |
| 9 | no re-booked chronic | PASS |

**clean = false.** Two findings, both on row 3. Pass 20's FT-01 and FT-02 are cured on their own plants, and FT-03 is cured for the two instances it named. The class is still open in one place: a declaration written after a nested rule, inside `src/components/dock`, passes I7-G1, and the sweep plants that shape only outside the dock. Every sweep exits 0.

- **FU-01.** I7-G1's first arm (the one that reads `src/components/dock`) passes a seat-size `transition` written as the parent's own declaration after a nested rule or a nested at-rule. The pass cell names that spelling ("the parent's own `transition` after a nested rule, are read as well") and says "The declaration arm reads a rule whole, selector to declaration". Fix 21 widened only the third arm (outside the dock).
- **FU-02.** `hold-line-claim.py` plants "the parent's own declaration after a nested rule" for I7-G1 only in `glass/glass-capsule.css` (`:898`), where the third arm reads. It has no plant in that shape under `src/components/dock`, where the first arm reads. FU-01 is the missed instance.

## Sweeps, re-run

The plan read is the checkout's (fix 21's files, equal to `39bcd650`). Sweeps that take a tree read the crit-21 worktree, except `fl6-plate-reads.py`, which reads the checkout (as passes 17 to 20 did).

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
| `hold-line-claim.py` | `python3 -B hold-line-claim.py <worktree>`, run alone | **0** | `in-scope static gates 137 (hold lines 6; S 65, L 67, H 5), plants 755, open 0` (666 s) |
| `gates.py`, `plan_dag.py` | run bare, and imported by every sweep | **0** | — |

**How wide each sweep is against its class:**
- **`hold-line-claim.py` is too narrow (row 3, FU-02).** Missed instance: FU-01.
- **The other twelve:** no missed instance found. Their inputs (PLAN, LEDGER, REGISTRY, INBOUND, every wave other than W-0.12, W-I.2 and W-I.7) are byte-equal to pass 20's, and each summary line matches pass 20's.

## Pass 20, re-verified

Each cure was read on a cured base in the worktree, with each plant appended to a fresh copy of the cured file and the file restored after each.

| id | verdict | reading here |
|---|---|---|
| FT-01 | cured | G10. Base: `run.css:269` rewritten to `.glass-dock .dock-run [data-dock-seat] {` (exit 0; HEAD exit 1, `run.css`). Pass 20's plants: `flex: 0 0 auto; & > :not([aria-current]) {…}` **1**; the multi-line `gap: …; & > * {…}` **1**; `&:hover {…} & > * {…}` **1**. Also: `@media` after a declaration with `& > *` inside **1**; parent list `.glass-dock .dock-run, .x` and `.x, .glass-dock .dock-run` with `& > *` **1**; `@starting-style` after a declaration **1**; `> :not([data-dock-seat])` **1**; `> :is([data-dock-seat], .x)` **1**; `:where(.glass-dock, .dock-layer-group) .dock-layer { color: red; & > * {…} }` **1**; a snap declaration after a nested rule **1**. Controls: `& > :not([aria-current])` first **1**. Green: `flex: 0 0 auto; & > [data-dock-seat] {…}` **0** |
| FT-02 | cured | I7-G3. Base: `run.css:251` and `:310` deleted (exit 0; HEAD exit 1). Pass 20's plants: `--control-icon-padding: var(--dock-ring-reserve)` under `.glass-dock .dark-mode-toggle-button[data-size="control"]` **1**; `.glass-dock { --control-icon-padding: var(--dock-ring-reserve); }` in `glass-capsule.css` **1**. Also: the glyph-size term **1**; `--dock-control-size: calc(2rem + 2 * var(--dock-ring-reserve))` **1**; a two-hop alias `--seat-gap` → `--dock-icon-padding` **1**; `max(var(--dock-ring-reserve), 0px)` **1**; `padding-inline: var(--focus-ring-width)` **1**. Green: `outline-offset: var(--dock-ring-reserve)` **0**. The closed list holds 104 properties at HEAD (recomputed here) |
| FT-03 | cured for FT-01 and FT-02; the class is open (FU-02) | `readvia` is transitive and the new `nesting` kind plants three shapes; the 755 plants hold (exit 0). The decl-after-nested-rule shape is planted for I7-G1 outside the dock only |

## Gates re-run at HEAD

**Static gates.** A runner in this seat's scratchpad read every non-struck §5 span through `gates.py` (spans come out of `gates.py` already rendered) and ran each one that starts with a command (`!`, `rg`, `grep`, `git`, `test`, `awk`, `find`, `[`, `sed`, `perl`, `wc`, `diff`, `cmp`) and names none of `npm`, `npx`, `node`, `python`, `playwright`, `vite`, `tsc`, `curl`, `$H`, `$D3_OUT`, `dist/`, `.cache/`, `design/`, `…`, or a lower-case `<…>` placeholder. It ran 4 at a time, with a 60 s cap, stdin closed, in the worktree. 211 spans ran (pass 20: 210; W-0.12 G1's rewritten span now passes the filter).

| band | nonzero / run | timeouts |
|---|---|---|
| 0 | 18/23 | 0 |
| A | 30/31 | 0 |
| B | 20/21 | 0 |
| C | 18/19 | 0 |
| D | 4/5 | 0 |
| E | 28/29 | 0 |
| F | 2/2 | 0 |
| G | 16/17 | 0 |
| H | 9/12 | 0 |
| I | 17/17 | 0 |
| J | 4/4 | 0 |
| K | 13/13 | 0 |
| L | 16/18 | 0 |

**Every band reads RED.** The 16 exit-0 spans are pass 20's set, unchanged: the labelled hold lines (W-0.1 G5, W-0.10 G3, W-0.11 G5, W-0.2 G3, B15-G3, D2-G5, G2-G4, H6-G3's three spans, G-L3-9's two spans); the floor half of a born-RED row (W-0.8 G14); a gate that depends on state by its own cell (A1-G11); a printed value (C4-G7); and a prose fragment (E6-G8).

**Filtered BLOCKER spans, run alone:** W-0.7 G8 **1** (no `outbox/*10.2.0-value.js.md`); W-L.7 G-L7-1 **1** and G-L7-4 **1**.

**BLOCKER families.** F-01 (W-A.2): A2-G3, A2-G7, A2-G11 exit 1. F-68: W-0.7 G2 and G5 exit 1; W-L.7 G-L7-1 and G-L7-4 exit 1; W-L.8 G-L8-2 exits 1. F-21 (W-E.2): E2-G9, E2-G11, E2-G12 exit 1. W-0.12 G1 exits 1 (`layers.css:349`).

**HIGH families.** Every wave's static spans ran as above, so every HIGH family's static gates are in the table.

**Fix 21's four rewritten gates at HEAD:** W-0.12 G1 **1** (`layers.css:349`, 3.2 s); G10 **1** (`run.css`, 2.4 s); I7-G1 **1** (the first arm, `run.css:320-384`); I7-G3 **1** (19.8 s).

**Not run:** browser, `$H`, harness and GPU gates, and any gate that reads `design/` (fence).

## Row 1 · families placed

No finding. `REGISTRY.md` has 85 `#### F-` headers, no duplicate. PLAN §3 has 102 wave rows naming all 85 families. PLAN is unchanged since pass 20, which checked single placement row by row.

## Row 2 · gates exist and are RED at HEAD

No finding. 101 of 102 specs have a gate row that `gates.py` reads (730 rows). The 102nd, W-F.5, carries seven gates (F5-G1 to F5-G7) in a two-column `id | passes when` table, which `gates.py` skips because it needs three cells. They are harness gates that §5 records as failing at HEAD, and W-F.5 is unchanged since fix 15. Every band reads RED, every BLOCKER gate that runs statically exits 1, and all four rewritten gates exit 1.

## Row 3 · vacuous gates

### FU-01 · I7-G1's dock arm passes a transition written after a nested rule

- **Where.** `waves/W-I.7.md:42`, I7-G1, first arm: `! rg -niU --pcre2 '(?:^|[{};])(?![^{}]*dock-layer-tab-indicator)[^{};]*\{[^{}]*?(?<![\w-])transition(?:-property)?\s*:…' src/components/dock`.
- **Spec names the spelling.** The pass cell says the third arm "reads the rule past closed sibling nested rules, so `&:hover { transition: … }` after `&:focus { … }`, and the parent's own `transition` after a nested rule, are read as well", and that "The declaration arm reads a rule whole, selector to declaration". The CSS arms "read every stylesheet and SFC `<style>` block in `src/components/dock`". Fix 21 widened only the third arm, which excludes `src/components/dock/**`.
- **Defect.** The first arm reads from a rule's `{` up to the next `{` or `}`. A declaration after a closed nested block is reached only by starting at that block's `}`, and from there `[^{};]*\{` finds no brace before the declaration. So `run.css`, the file §3 item 1 cures, can carry a seat-size transition the gate never reads.
- **Evidence.** Base: `run.css:357`, `:366`, `:376`, `:384` rewritten to §3 item 1's appended form `transition: var(--icon-button-transition), <size> …` (exit 0; HEAD exit 1).

  | plant | file | exit |
  |---|---|---:|
  | `.glass-dock .dock-run > * { &:focus { color: red; } transition: inline-size 1s; }` | `run.css` | **0** |
  | `.glass-dock .dock-run > * { color: red; @media (min-width: 1px) { color: blue; } transition: width 1s; }` | `run.css` | **0** |
  | `.glass-dock .dock-run > * { color: red; &:hover { transition: inline-size 1s; } }` (control) | `run.css` | 1 |
  | `.glass-dock .dock-run > * { &:focus { color: red; } &:hover { transition: inline-size 1s; } }` (control) | `run.css` | 1 |
  | `.glass-dock .dock-run > * { color: red; @media (min-width: 1px) { transition: width 1s; } }` (control) | `run.css` | 1 |
  | `.glass-dock .dock-icon-button { &:focus { color: red; } transition: width 1s; }` (control, third arm) | `glass/glass-capsule.css` | 1 |
  | `… &:hover { transition: var(--icon-button-transition), inline-size 1s; }` (green, §3's form) | `glass/glass-capsule.css` | 0 |

- **Shape of a cure.** Give the first arm the third arm's skip over closed sibling nested blocks (`\{(?:[^{}]*\{[^{}]*\})*…`), without the `dock` selector lookahead. Or read rules with a selector stack, as G10 does now. Add the two plants above.

### FU-02 · `hold-line-claim.py` plants the decl-after-rule shape on one arm only

- **Where.** `formation-audit/sweeps/hold-line-claim.py`, I7-G1 plants `:895-905`; the `nesting` kind (docstring `:148-153`).
- **Defect.** The `nesting` kind lists only shapes `src` writes (`&` after a declaration, `&` after a sibling rule, an at-rule after a declaration), and `src` never writes a declaration after a nested block (a brace walk over every `src/**/*.css` finds none). The one decl-after-rule plant is a hand plant at `:898`, in `glass/glass-capsule.css`, which only the third arm reads. The pass cell names the spelling for I7-G1 as a whole, and the first arm reads `src/components/dock`, where no plant in that shape goes. So a spec-named spelling is held on one arm's scope only.
- **Missed instance.** FU-01.
- **Shape of a cure.** When a row's pass cell names a nesting shape, plant it under every scope the span reads (here `src/components/dock/styles/run.css` as well as `glass-capsule.css`), the at-rule variant included.

## Row 4 · π and DELTA

No finding. `pi-surface.py` exits 0. Fix 21 changed four gate rows and added no §3 or §6 visual claim.

## Row 5 · ledger rows

No finding. `ledger-terminal.py` (825 rows) and `chronic-decided.py` exit 0. LEDGER is unchanged since pass 20.

## Row 6 · loop pre-emption

No finding. `git diff d95b5248 39bcd650 -- docs/tranches/BL/waves` has three hunks, one §5 row in W-0.12 (`:41`) and W-I.2 (`:93`), two in W-I.7 (`:42`, `:44`). Each widens what a gate reads for a defect the wave already names. No §3 cure, mechanism or loop-owned design line changed. W-0.12's own header says it is not a loop wave and lands after W-0.8.

## Row 7 · the DAG

No finding. `plan_dag.edges()` with `graphlib`, run here: 102 edge rows for 102 specs, a topological order of 102 (no cycle), 0 dangling ids, 0 band-0 edges to a wave outside band 0. `release-gates.py` exits 0 with band-0 loop gates {D2, D3}. PLAN §5 is the one record of edges.

## Row 8 · breaks and aliases

No finding. `migration-values.py` exits 0. Fix 21 adds no break.

## Row 9 · re-booked chronics

No finding. `chronic-decided.py` exits 0. No chronic changed wave.

## Hardening notes (invented spellings; never make a pass unclean)

No spec names these spellings, no CLAIMS entry lists them, and `src` has no instance of them in this role.

- **G10, a combinator inside `:is()`.** `.glass-dock :is(.dock-run > *) { scroll-snap-align: start; }` exits 0 on the cured base: the walk crosses only top-level combinators. `src` writes `:is()`/`:where()` only around comma lists of single compounds (`layer-group.css:118`, `layers.css:44`), never a combinator inside.
- **G10, an upper-case property.** `SCROLL-SNAP-ALIGN: start` exits 0; the match is case-sensitive. `src` writes no upper-case property.
- **W-0.12 G1, a relative nested selector without `&`.** `.glass-dock.collapsed .dock-layers { color: red; > * { inline-size: 0; } }` exits 0. A brace walk over every `src` stylesheet and `<style>` block finds 10 nested rules, all with `&`.
- **W-0.12 G1, `&` under a selector-list parent.** `.glass-dock.collapsed .dock-layer--summary, .glass-dock.collapsed .dock-persistent { color: red; &.is-active { inline-size: 0; } }` exits 0: `ctx` substitutes the whole list into `&` and `last()` reads only the final item. `src` writes no `&` rule under a list parent (same walk).
- **I7-G3, a carrier set from script.** The closure reads CSS declarations only. Of the 104 listed carriers, `src` sets 13 by name in a `.ts`/`.vue` string, among them `--dock-morph-t` (`useDockMorph.ts:79`), a morph scalar. `src` sets none of the seat's padding carriers (`--dock-icon-padding`, `--dock-control-safe-inset`, `--dark-mode-toggle-padding`, `--control-icon-padding`) from script.

## Notes outside the checklist (not counted)

- **G-L7-6** still exits 2 on its upper-case `<W-L.7 base>` placeholder, as passes 14 to 20 read.
- **W-0.7 G6, G9 and G-L8-12** read tags that do not exist (`v10.2.0`, `v11.0.0`), as passes 13 to 20 read.
- **W-F.5's gate table** has two columns, so no sweep that walks §5 through `gates.py` sees its seven gates. They are harness gates, and none of the sweeps' classes needs them today.
- **G10's subject test over-reaches:** `\.dock-(run|layer)([^a-z0-9_]|$)` also matches `.dock-layer-group` and `.dock-layer-switcher`, so a snap rule under `:where(.glass-dock, .dock-layer-group)` on any later compound fails. `src` has no snap rule there, so nothing reads false-red today.
- **Sweep runtime.** `hold-line-claim.py` took 666 s here (fix 21 said about 6 minutes). It plants into the tree it is given, so nothing else may write to that tree while it runs. This seat learned that the hard way (see fences).
- **Fix 20's observation stands:** W-I.7 §3 item 1's cure form reads `var(--icon-button-transition)`, which `src` does not declare at HEAD.
- **Fix 19's open items stand:** I7-G1 finds dock rules outside the dock by the word `dock`, and its indicator exception works by selector name; real Safari is unmeasured (OW-3); `hold-line-scope.py` does not cover born-RED gates; W-0.12's per-frame strip has no formation reading; the ROUTE arm does not check fixture scenes; G15 does not resolve a ring token declared outside `src/components/dialog`.
