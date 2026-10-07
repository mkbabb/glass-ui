# BL — formation fix, seat 13

| field | value |
|---|---|
| seat | formation fix seat 13, before audit pass 13. Answers `formation-audit/pass-12.md` (FL-01 to FL-05) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `3ce80b06` when the seat opened; the checkout's HEAD is now `2794898e` (design-loop commits). `git diff --stat 3ce80b06 2794898e -- docs/tranches/BL/PLAN.md docs/tranches/BL/LEDGER.md docs/tranches/BL/waves docs/tranches/BL/formation-audit src` prints nothing, so the plan and `src` this seat edited and probed are the ones pass 12 read |
| where probes ran | a worktree at `3ce80b06` (`.claude/worktrees/bl/formation/fix-13/wt`, `node_modules` and `tests-visual/node_modules` symlinked). No build, no browser. Every plant was undone: the sweep restores each file it plants or cures, and `git status --short` in the worktree read 0 lines after every run. The before runs read the worktree's copy of the HEAD plan through `BL_ROOT` |
| machine | no timing cell was read. The Playwright and chrome-devtools MCP servers failed to connect. Real Safari is UNMEASURED (OW-3) |
| writes | `PLAN.md`, `LEDGER.md`, `waves/INDEX.md`, `waves/W-0.12.md` (new), 40 other wave specs (listed under FL-01/02/03 and FL-04); under `formation-audit/sweeps/`: `hold-line-claim.py` (rewritten), `chronic-decided.py` (SHARED arm), `borrowed-red.py` (CURED-EARLIER arm), `fail-open-gates.py` (HEAVY's placeholder arm), a `# ===== fix-13` section appended to every `.out`; this file. The plan has no `MIGRATION.md` |
| fences | nothing under `design/` read, run or written; no git write in the checkout; no sibling repo touched; every sweep ran with `PYTHONDONTWRITEBYTECODE=1`; a `sweeps/__pycache__` left by an earlier run was deleted |

## Result

| finding | class | sweep | before (HEAD plan) | after |
|---|---|---|---|---|
| FL-01, FL-02, FL-03 | a static gate that forbids something passes on a spelling of the defect its own pass cell names, or its recorded bite does not bite on a cured tree. Fix-12's sweep read hold lines only; this one reads every unstruck static gate that forbids, born RED or hold line | `hold-line-claim.py` (rewritten) | **exit 1**: 136 in-scope gates, 311 plants, open 121 (NARROW 114, CURE 2, UNREAD 2, STALE 3) across 58 gates | **exit 0**: 137 in-scope gates (hold lines 6), 352 plants, open 0 |
| FL-04, FL-05 | a DISEASE ledger row whose rationale does not say its deciding wave is its own, or names a deciding wave other than its wave cell | `chronic-decided.py`, SHARED arm widened | **exit 1**, open 4 (L04-M33 twice, C-11, C-13a) | **exit 0**, members 51, ledger rows 825, open 0 |
| (found while curing FL-01) | CURED-EARLIER compared patterns literally, so widening A2-G7 dropped W-I.1 G13's row and hid a second guard that entered its wave green | `borrowed-red.py`, CURED-EARLIER arm | **exit 1**: W-G.6 G6-G6 open | **exit 0**, rows 1, open 0 |

The other sweeps, after: `release-gates.py` exit 0 (waves 102, band-0 loop gates {D2, D3}); `ledger-terminal.py` exit 0 (825 rows); `reshape-order.py` exit 0 (rows 83); `inbound-fold.py` exit 0 (ids 37); `hold-line-scope.py` exit 0 (static hold lines with paths 2); `fl6-plate-reads.py <worktree>` exit 0 (reads 27); `fail-open-gates.py <worktree>` exit 0 (gate rows 730, fail-open rows run 123, docket rows 20; before: 731, 125). A column count over every table in the 43 edited plan files finds 0 mismatches.

## FL-01, FL-02, FL-03 · static gates that pass on the defect they forbid

**Class.** A static gate earns its place by failing on every form of the defect its pass cell names, on a tree where the cure has landed. Fix-12's sweep tested hold lines only (FL-03). The born-RED gates have the same exposure, and their bite is harder to read: they already fail at HEAD, so a narrow pattern shows only once the wave's cure lands.

**Sweep.** `hold-line-claim.py <worktree>` (docstring at the head of the file). Its scope is every unstruck §5 row whose first span is a `test`, `grep`, `git grep`, `rg`, `sed` or `awk` command with no build, browser or placeholder, and that forbids something (a leading `!`, a `-eq 0` count and similar). For each gate it:
1. builds the cured base: the entry's own cure steps, then the gate's absence searches re-run with `-n`, deleting each hit, up to four rounds;
2. requires that base to pass (CURE);
3. re-plants the first deleted line, which must fail (NOBITE);
4. plants each spelling in the gate's CLAIMS entry, which must fail (NARROW), and each green form, which must pass (WIDE);
5. restores every file.

A gate whose claim is the literal it names is an `L` entry; a gate held in paint by a measured gate of the same wave is an `H` entry. Every in-scope gate has an entry (UNREAD otherwise), and an entry with no row is STALE.

**Cure.** Each gate below has a new §5 gate cell and a HEAD cell recording what the new span read in the worktree at `3ce80b06`. The earlier HEAD reading is kept after "Before fix-13:". The spellings each gate is held to are its CLAIMS entry.

| gate | file:line | the spelling it missed | HEAD now |
|---|---|---|---|
| W-0.4 G3 | `waves/W-0.4.md:81` | `dataset.reveal`; the §3/§4 readers `foundations/motion.vue`, `capture/capture.css` | exit 1, 31 lines |
| W-0.4 G4 | `:82` | `z-popover` in a class list | exit 1, 3 lines |
| W-0.7 G2 | `waves/W-0.7.md:84` | `BK #`, `O-`, `~~`, `docs/tranches/` in the 10.2.0 entry | exit 1 |
| W-0.8 G16 | `waves/W-0.8.md:183` | `scrollContainer`, `chromeRef`, `scrollChrome`, the barrel | exit 1, 12 lines |
| W-0.9 G1 | `waves/W-0.9.md:48` | `1.272 *` in either order | exit 1 |
| A1-G3 | `waves/W-A.1.md:67` | a template-literal path (the span broke on an escaped backtick: STALE) | exit 1, 168 lines |
| A1-G5, A1-G9, A1-G10 | `:69`, `:73`, `:74` | `describe.fixme`, `it.skip`; the digits without the leading `0`; `docs/archive`, `path.join` segments, `.mjs` helpers | exit 1 each |
| A2-G7 | `waves/W-A.2.md:107` | `test.fails`, `it.fails.each` | exit 1, 36 lines |
| A4-G2, A4-G7, A4-G8 | `waves/W-A.4.md:57,62,63` | `navigator, "gpu"`, `delete navigator.gpu`; `.toEqual(n)`; case | exit 1 each |
| A6-G6, B13-G4 | `waves/W-A.6.md:71`, `waves/W-B.13.md:49` | case | exit 1 each |
| B1-G3, C1-G4 | `waves/W-B.1.md:104`, `waves/W-C.1.md:67` | (spans broke on an escaped backtick: STALE) now `rg` with `\x60` | exit 1 each |
| B9-G1, B9-G3 | `waves/W-B.9.md:38,42` | `getContext('2d')`; `draw-overlay` | exit 1 each |
| C1-G1, C1-G2, C1-G5 | `waves/W-C.1.md:64,65,68` | other script and media extensions; `fetch-depth: "0"` | exit 1 each |
| C4-G7 | `waves/W-C.4.md:73` | `.x:hover {` and compound selectors | prints 2, 19, 12, 18, 13 |
| C5-G7 | `waves/W-C.5.md:82` | `getRandomValues`, `randomUUID` | exit 1, 28 lines |
| E1-G6 | `waves/W-E.1.md:80` | `env( safe-area-inset`, case | exit 1, 5 lines |
| E11-G6, E12-G2, E13-G6 | `waves/W-E.11.md:67`, `waves/W-E.12.md:56`, `waves/W-E.13.md:57` | quotes; a spaced call; `@media screen, print` | exit 1 each |
| E3-G9 | `waves/W-E.3.md:69` | `min-block-size: calc(`; `innerHeight` | exit 1/1 |
| E4-G19 | `waves/W-E.4.md:94` | `side-offset`, an unspaced `999` | exit 1, 6 lines |
| E5-G9, E5-G10, E5-G14 | `waves/W-E.5.md:74,75,79` | `splice`; any weight utility or `font-weight` (§3 item 10); `column-reverse` | exit 1 each |
| E7-G9, E8-G4, E9-G7 | `waves/W-E.7.md:78`, `waves/W-E.8.md:67`, `waves/W-E.9.md:69` | `width >` range syntax; `var(--radius-sm,`; `useBreakpoints`, `innerWidth` | exit 1 each |
| G1-G2, G1-G3 | `waves/W-G.1.md:91,92` | other shader extensions; `getContext('2d')`, spaced | exit 1 each |
| G3-G7, G3-G8 | `waves/W-G.3.md:66,67` | `getContext('2d')`; `background-canvas` | exit 1 each |
| G6-G7, G7-G4 | `waves/W-G.6.md:66`, `waves/W-G.7.md:64` | `findIndex`, `some`, the toggle-group `ordered` scan; `export *` | exit 1 each |
| H1 G15 | `waves/W-H.1.md:162` | `outline-color`, `box-shadow` forms (the 5 % and 12 % background mixes stay green) | exit 1, 2 lines |
| H6-G3 | `waves/W-H.6.md:66` | see below | hold line, exit 0/0 |
| I1 G18, I2 G1, I2 G10 | `waves/W-I.1.md:225`, `waves/W-I.2.md:84,93` | `any-pointer`; spread and other element names; a rule split across lines | exit 1 each |
| I7-G1, I7-G2, I7-G3 | `waves/W-I.7.md:42,43,44` | `transition-property`, `width`; `box-content`; `padding-inline` | exit 1 each |
| J1 G11, G12, G13 | `waves/W-J.1.md:187,188,189` | `selected:` without `?`; `cell` in prose and props; `ariaPressed` | exit 1 each |
| J2 G2 | `waves/W-J.2.md:95` | `dataset.engaged` in a `.ts` | exit 1, 3 lines in 2 files |
| K1-S | `waves/W-K.1.md:66` | (CURE: the cured base did not pass) | exit 1, 10 lines |
| G-L4-3 | `waves/W-L.4.md:108` | `onSnap?.(` | exit 1 |
| G-L8-2, G-L8-14 | `waves/W-L.8.md:106,115` | the 10.2.0 forms of G2 above, and the MIGRATION stream; other script extensions | exit 1 each |

The three gates the rewritten sweep reported NOBITE on the HEAD plan now carry a red plant that is the row's bite: A3-G4 (a capture tool named without its underscore), G-L3-8 (the retired script run again) and G-L8-15 (a retired item booked again). The E13-G6 plant in a component stylesheet was a false claim: the gate reads `src/styles`, and `deck/styles/capture.css` carries a print rule of its own by design. It is dropped, not cured.

**FL-01 · W-0.8 G19.** The gate moved with its item to W-0.12 (FL-04) as `waves/W-0.12.md:41` G1. The awk was rewritten to read rules, not lines. It drops comments, reads a declaration across lines, keeps a stack of enclosing rules so `&` nesting and nested `@media` resolve, reads only the `<style>` blocks of `.vue` files, and checks `width`, `height`, `inline-size` and `block-size` with their `min-` and `max-` forms plus `flex` and `flex-basis`.
- At HEAD it exits 1 with one rule, `layers.css:349`. On the cured base (`:348` gated `:not([data-morphing])`) it exits 0.
- All 20 red plants exit 1, including the one-line rule that fix-12's form passed.
- All 5 green plants exit 0.

**FL-02 · H6-G3.** The gate is now two `rg -U --pcre2` spans, case-blind.
- The first reads each `inset`, side or `margin` declaration whole, across lines. It fails on a negative literal length, a literal inside `calc()`, or a `var()` of any custom property except `--glass-blur-*`, the token W-H.6 §3 item 1 names.
- The second fails on any custom property declared negative.
- At HEAD both spans exit 0. All 17 red plants fail it, and the cure's form passes.
- Fix-12's recorded green, `calc(var(--radius-ctx) * -1)`, is now red. It read the corner token rather than the blur radius that §3 item 1 names.

**FL-03.** The scope is now every static gate that forbids something, not only hold lines.

**Not extended: the file axis.** `hold-line-scope.py` was not widened to born-RED gates. A probe that ran it over all unstruck static gates listed 135 rows. Nearly all are §4 files the gate has no reason to read: tests, barrels, shaders, and stories. The arm needs a per-gate scope claim before its rows mean anything, and adding one would be new scope. The spelling-axis CLAIMS entries already carry the files whose readers the specs name (W-0.4 G3's `motion.vue` and `capture.css`).

## FL-04 · L04-M33, a disease row, decided in W-0.8, a shared wave

**Cure.** A new wave decides it: `waves/W-0.12.md`, band 0, not a loop wave.
- It depends on W-0.8 (`PLAN.md:286`). W-0.7, the 10.2.0 cut, now waits on it (`PLAN.md:281`). The edge note is at `PLAN.md:390`.
- §3 rules BUILD. The form follows the carrier W-0.8 lands: the rule takes its sibling's `:not([data-morphing])` gate, or it is struck. If that tree already closes the window, the base reading is recorded and G1 stays as the hold line.
- §6 owns the per-frame width strip. Before = W-0.8's swap cell; after = this wave's.
- It carries no D2 gate of its own, so PLAN §1 checklist row 7 (four band-0 loop waves) is unchanged. `release-gates.py` reads 102 waves and band-0 loop gates {D2, D3}.

Other places changed:
- **PLAN:** `:11` (amended), `:47` (§2 band 0 reads W-0.1 .. W-0.12), `:91` (§3 row), `:426` (§7 band 0), the W-0.8 §3 row (it no longer carries L04-M33), and the DAG count, now 102.
- **INDEX:** `waves/INDEX.md:19` (row) and `:112` (102 waves, band 0: 12).
- **LEDGER:** `:423` L04-M33 is re-pointed to W-0.12 and reads "decided in W-0.12 (own)". `:118` #48's note is updated, the §8 F-3 list at `:530` gains "L04-M33 W-0.12 (fix-13)", and the §9 recount note at `:553` is updated.
- **W-0.8:** `:10` families, `:27` §1 row (handed to W-0.12), `:110` §3 paragraph, `:196` §6 swap cell, and the §8 closes. The §2 G19 reading and the §5 G19 row moved out.
- **W-I.5:** `:10` now points at W-0.12.

## FL-05 · the SHARED arm flags only the word "shared"

**Cure.** `chronic-decided.py`'s SHARED arm now has three checks:
- A DISEASE row is open when its rationale says "shared".
- It is open when the rationale does not say "own".
- It is open when the rationale's "decided … in W-x (own" names a wave other than the row's wave cell (two homes for one row).

The sweep listed four rows; each was cured:
- **L04-M33** (`LEDGER.md:423`): see FL-04.
- **C-11** (`:234`): its wave cell is W-G.1, but the rationale said "decided with #50 in W-G.5 (own)". W-G.1 deletes the blob's GL arm and runs π-W1 (W-G.1 §9), so the rationale now decides it in W-G.1 (own), and #50's W2-W6 cells stay W-G.5's.
- **C-13a** (`:236`): the rationale decided it in W-G.4 (own) under a W-G.1 wave cell. The wave cell is now W-G.4, whose G4-G2 is the medium-distinctness acceptance. The GL delete it fenced rides W-G.1, which W-G.4 depends on.

## Found while curing: CURED-EARLIER compared patterns as text

Widening A2-G7 to `(it|test)\.fails` removed W-I.1 G13's adjudicated row from `borrowed-red.py`, because the arm compared patterns literally. The sweep then exited 1 with STALE.

**The arm now has two tests.**
- It still counts an identical pattern.
- It also counts an earlier wave's grep whose HEAD hits, over the later gate's scope, include every HEAD hit of the later grep. It uses `git grep` on the index, which writes nothing.

**What the wider arm found.** It brought back W-I.1 G13, adjudicated as before. It also found **W-G.6 G6-G6**, a guard that copied W-G.1 G1-G3's `toDataURL` ban and so entered its wave green.

**Cure.** G6-G6 is struck (`waves/W-G.6.md:65`), citing G1-G3 as the one source of record. Its CLAIMS entry was removed.

`fail-open-gates.py` and `hold-line-claim.py` share one fix. HEAVY's placeholder arm read the awk `/<style/` and the regex `[<>]` as `<…>` placeholders. It now matches a placeholder only.

## Open

- Real Safari: UNMEASURED (OW-3). No browser ran at this seat, so W-0.12's §6 per-frame width strip has no formation reading. It is that wave's first measurement.
- `hold-line-scope.py` does not cover born-RED gates, for the reason given under FL-03.
