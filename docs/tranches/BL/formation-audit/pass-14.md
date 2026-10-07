# BL — formation audit, pass 14

| field | value |
|---|---|
| seat | formation critic, pass 14. Authored none of `PLAN.md`, `waves/`, `LEDGER.md`, passes 1-13, fixes 2-14 or the sweeps |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `534e2644` (fix 14 was committed while this seat read; it opened at `f9cf010e` with fix-14's files modified in the tree). `git diff --stat f9cf010e 534e2644 -- src tests tests-visual demo` is empty, so no probe reading differs between the two |
| inputs read | `PLAN.md` (§3 and §5 by script; fix-14's one note); `LEDGER.md` by sweep, and `:835`; `audit/REGISTRY.md` headers and counts; `audit/INBOUND-MAP.md:458`; `waves/W-0.12.md` whole; §3, §5, §6 and §7 of W-E.3, W-E.4, W-E.8, W-E.9, W-C.5, W-H.6 and W-E.11 as needed; fix-14's diffs to W-0.7, W-E.4, W-E.8 and `PLAN.md`; `formation-audit/pass-13.md`; `formation-audit/fix-14.md` last; every file under `sweeps/` |
| where probes ran | worktree `.claude/worktrees/bl/formation/crit-14/wt`, made at `f9cf010e` for the sweeps, then removed and re-made at `534e2644` for the gate run and the plants. `node_modules` and `tests-visual/node_modules` symlinked. No build ran. No browser ran: the Playwright and chrome-devtools MCP servers failed to connect. Real-Safari cells are UNMEASURED (OW-3). Load average 53-65 (`uptime`); no timing cell was read |
| fences | no source edit, no git write in the checkout, nothing under `design/` read, run or written, no sibling repo touched. Every plant was restored from a saved copy. One file (`prng.ts`, which had no hit and so no saved copy) was restored with `git checkout-index` inside the worktree, not the checkout. `git status --short` in the worktree read 0 lines before `git worktree remove --force`, and `git worktree list \| grep -c crit-14` → 0. This seat's gate runner wrote a `__pycache__` into `sweeps/` (it set `PYTHONDONTWRITEBYTECODE` after the interpreter had started). The directory held only `gates` and `plan_dag` `.pyc` files stamped 13:02, the runner's minute, and it was deleted; `sweeps/` holds no `__pycache__` now. The only other write in the checkout is this file |

The checklist has nine fixed rows. Each finding names its row. Notes at the end are outside the checklist and do not count.

## Result

| row | check | result |
|---|---|---|
| 1 | all 85 families placed exactly once | PASS |
| 2 | every spec has a gate; every gate RED at HEAD | PASS |
| 3 | no vacuous gate | FAIL (FN-01 to FN-05) |
| 4 | every visual claim carries π/DELTA | FAIL (FN-07) |
| 5 | every ledger row terminal, pointing at a wave that covers it | PASS |
| 6 | no loop wave pre-empts its loop, except owner-ratified and recorded exceptions | PASS |
| 7 | DAG acyclic, one source; band 0 external only on D3 (veil rows, W-0.11) and D2 (W-0.8) | PASS |
| 8 | every break has a MIGRATION row, no alias | FAIL (FN-06) |
| 9 | no re-booked chronic | PASS |

**clean = false.** Seven findings. Pass 13's five are cured as named, and every sweep exits 0. The new findings:

- **FN-01 (row 3).** W-0.12 G1 passes a state rule on `.dock-run`. That is the full layer's third class (`GlassDock.vue:464`), and `run.css` already sizes the layer through it.
- **FN-02 (row 3).** E9-G7 passes `useBreakpoint(…)`, the library's own `matchMedia` wrapper (`src/composables/dom/useBreakpoint.ts:46`).
- **FN-03 (row 3).** E3-G9 passes a second floor folded into `block-size` with `max()` or `clamp()`. `src` writes floors in that idiom at `touch-floor.css:50` and `control-bit.css:152`.
- **FN-04 (row 3).** E8-G4, "Metric reads the context radius", passes any fixed radius token but the two Metric reads today, for example `var(--radius-panel)` (`music-staff/styles.css:64`).
- **FN-05 (row 3).** `hold-line-claim.py` is too narrow for its class. FN-01 to FN-04 are its missed instances. Its NOUN arm reaches only the nouns the gate's own text names.
- **FN-06 (row 8).** Fix-14's W-E.4 §3 item 11 changes two published values at rest, and §7 has a row for neither:
  - `--z-toggle` (`z-toggle` through `--z-index-toggle`, `bridges.css:277`);
  - the popper `sideOffset` defaults.
- **FN-07 (row 4).** Fix-14's W-E.8 §3 item 5 changes Metric's two corners, and §6 names no Metric surface.

## Sweeps, re-run

The plan was read at fix-14. The worktree was at `f9cf010e` for the sweeps; `src` is identical to `534e2644`. Each sweep ran with `PYTHONDONTWRITEBYTECODE=1`.

| sweep | command | exit | summary line |
|---|---|---:|---|
| `reshape-order.py` | `python3 reshape-order.py` | **0** | `rows 83, open 0, stale 0` |
| `borrowed-red.py` | `python3 borrowed-red.py` | **0** | `rows 1, open 0, stale 0` |
| `inbound-fold.py` | `python3 inbound-fold.py` | **0** | `ids 37, open 0, stale 0` |
| `release-gates.py` | `python3 release-gates.py` | **0** | `waves 102, band-0 loop gates {D2, D3}, open 0` |
| `chronic-decided.py` | `python3 chronic-decided.py` | **0** | `members 51, ledger rows 825, L04 master rows 45, open 0` |
| `ledger-terminal.py` | `python3 ledger-terminal.py` | **0** | `ledger rows 825, open 0` |
| `hold-line-scope.py` | `python3 hold-line-scope.py` | **0** | `static hold lines with paths 2, open 0` |
| `fl6-plate-reads.py` | `python3 fl6-plate-reads.py /Users/mkbabb/Programming/glass-ui` | **0** | `reads 27, open 0` |
| `fail-open-gates.py` | `python3 fail-open-gates.py <crit-14 worktree>` | **0** | `gate rows 730, fail-open rows run 124, docket rows 20, open 0` |
| `hold-line-claim.py` | `python3 hold-line-claim.py <crit-14 worktree>` | **0** | `in-scope static gates 137 (hold lines 6; S 65, L 67, H 5), plants 442, open 0` (63 s) |
| `gates.py`, `plan_dag.py` | run bare, and imported by every sweep | **0** | — |

**How wide each sweep is against its class:**
- **`hold-line-claim.py` is too narrow (row 3, FN-05).** Fix-14's arms are sound for what they read: SPEC, the `C` cure plants, NOSPEC, NOCURE, NOUN and the survival check. The C plants cure pass 13's FM-04 gap; C5-G7, E11-G6 and H6-G3 now pass their own cure forms (re-run below). NOUN, though, draws its plants only from the gate's title, its pass cell and the spec quote. A spelling of the defect that `src` uses but the gate's text does not name still passes both gate and sweep. FN-01 to FN-04 are four instances.
- **The other nine: no missed instance found.**

## Pass 13, re-verified

| id | verdict | reading here |
|---|---|---|
| FM-01 | cured as named; see FN-01 | On a cured base (`layers.css:348` gated `:not([data-morphing])`, G1 exit 0), each of pass 13's five exit-0 plants now exits **1**: `.dock-layer { width: 0 }`, `.dock-layer.is-active`, `.dock-layers > *`, `.dock-layers > .dock-layer` and the state-set `--x` read by `.dock-layer--full`. So do `--x` read by `.dock-layers > *`, `--x` read by `flex-basis: calc(var(--x) + 1px)` on `.dock-layer`, `:is(.dock-layer--summary)` under `.dock-layers >`, the unspaced `.dock-layers>*{width:0}`, `:first-child` and `::before`. At HEAD, G1 exits **1** (`layers.css:349`) |
| FM-02 | cured | H6-G3's three spans, chained, exit 0 at HEAD (the hold). Planted in `material.css`: `inset: -2rem`, `--glass-blur-pad: 32px` read in `calc(… * -1)`, and the re-declared `--glass-blur-resting-radius: 32px` each exit **1**. §3 item 1's form `calc(var(--glass-blur-resting-radius) * var(--glass-level) * -2)` exits 0, with or without its clip, and so does the logical `inset-inline`/`inset-block` pair |
| FM-03 | cured as named; see FN-02, FN-03 | **E9-G7:** on a cured base (§3 item 5's `@container field (max-width: 36rem)`, `useTabResponsive.ts`'s hit lines stripped; exit 0), `window.matchMedia(…)` and `window.innerWidth` exit **1**, and fix-14 records the range-syntax plants at the same exit in its CLAIMS entry. **E3-G9:** on a cured base (`styles.css:531`'s `min-block-size: calc(…)` deleted, `use.ts:85` reading `visualViewport`; exit 0), `min-block-size: var(--sheet-floor)`, `min-height: calc(50vh - 1rem)` and `min-block-size: max(12rem, 30dvh)` each exit **1** |
| FM-04 | cured | C5-G7 exits **1** at HEAD. The 10 files with a hit were stripped of their hit lines, and the gate still exits 1 (no `freshSeed()`, so `prng.ts` has no `getRandomValues`). With §3 item 7's `freshSeed()` appended to `prng.ts` it exits **0**. A second `getRandomValues` read in `prng.ts` exits **1** |
| FM-05 | cured for what it named; see FN-05 | The sweep now plants each S entry's spec cure form and fails a gate that strips it (CURE). NOUN requires a plant for every backticked noun of the gate's own text. The arms run: exit 0 over 442 plants. The narrowness that remains is FN-05 |

## Gates re-run at `534e2644`

**Static gates.** `gates.py` reads 730 gate rows. A runner in this seat's scratchpad ran every non-struck span that:
- starts with a command (`!`, `rg`, `grep`, `git`, `test`, `awk`, `find`, `[`, `sed`, …);
- names no `npm`, `npx`, `node`, `python`, `playwright`, `vite`, `tsc`, `curl`, `$H`, `$D3_OUT`, `dist/`, `.cache/`, `design/`, `…` or lower-case `<…>` placeholder.

It ran them 4 at a time, with a 60 s cap and stdin closed, in the worktree.

| band | nonzero / run | timeouts |
|---|---|---|
| 0 | 18/23 | 0 |
| A | 31/32 | 0 |
| B | 22/23 | 0 |
| C | 19/20 | 0 |
| D | 4/5 | 0 |
| E | 29/31 | 0 |
| F | 2/2 | 0 |
| G | 19/21 | 0 |
| H | 9/13 | 0 |
| I | 17/17 | 0 |
| J | 4/4 | 0 |
| K | 15/17 | 0 |
| L | 19/23 | 0 |

**Every band reads RED.** This filter is wider than pass 13's, so the counts are higher. The runner skips W-0.12 G1, whose awk contains `<style`. This seat ran it on its own: exit **1** at HEAD, one rule, `layers.css:349`.

**Exit-0 spans.** Each was read:
- **Labelled hold lines.** W-0.1 G5, W-0.11 G5, W-0.10 G3, W-0.2 G3, B15-G3, G2-G4, all three spans of H6-G3, and both spans of G-L3-9.
- **The floor half of a born-RED row.** W-0.8 G14.
- **A printed value.** C4-G7.
- **State-dependent, as its own cell says.** A1-G11.
- **Not gates.** Prose fragments the wider filter caught: E6-G8 `perl`, E9-G5 `s=count`, G5-G1 `c=blob`, H1-G21 `s=toggle`, K6-G1 `s=names`, K8-G6 `true`, G-L1-18 `true`, G-L2-6 `form=`. Each row is a measured gate whose HEAD cell reads FAIL.
- **Build-dependent.** D2-G5's second span, `diff <(cd a/dist …)`, a labelled hold.

Spans that exit nonzero for a reason other than the defect:
- G-L7-6 exits 2 on its `<W-L.7 base>` placeholder, which the filter missed because it is upper case.
- W-0.7 G6, G9 and G-L8-12 exit 128, because there is no `v10.2.0` tag. These are the same rows pass 13 read.

**BLOCKER families** (`audit/REGISTRY.md` §Counts: BLOCKER 3):
- **F-01 (W-A.2).** A2-G3, A2-G6, A2-G7 and A2-G11 exit 1. A2-G6's two other backticked spans are prose fragments; they exit 2 and 128.
- **F-68.**
  - W-0.7: G2, G5 and G8 exit 1; G6 and G9 exit 128.
  - W-L.7: G-L7-1 and G-L7-4 exit 1.
  - W-L.8: G-L8-2, G-L8-14 and G-L8-15 exit 1; G-L8-12 exits 128.
- **F-21 (W-E.2).** E2-G9, E2-G11 and E2-G12 exit 1.

**HIGH families.** The static spans of every wave ran as above, so every HIGH family's static gates are in the table.

**Fix-14's rewritten gates at HEAD:** G1 1, C5-G7 1, E3-G9 1, E9-G7 1, E11-G6 1, E4-G19 1, E8-G4 1, W-0.7 G2 1, and H6-G3 0 (a hold line).

**Not run:** browser, `$H`, harness and GPU gates, and any gate that reads `design/` (fence).

## Row 1 · families placed

No finding.
- `REGISTRY.md` has 85 `#### F-` headers.
- PLAN §3 has 102 wave rows, which name all 85 and no other family (script).
- Only one family has two unqualified holders: F-30, as F-30a (W-E.8) and F-30b (W-J.1). `waves/INDEX.md:112` records that split.
- F-13, F-14, F-48 and F-71 are held only by named splits, which `INDEX.md:112` lists.
- Fix-14 changed no §3 row.

## Row 2 · gates exist and are RED at HEAD

No finding.
- **Gate rows.** `gates.py` finds unstruck gate rows in 101 of 102 specs. The 102nd is W-F.5: its seven rows F5-G1 to F5-G7 sit in a two-column table (`W-F.5.md:62-72`) that `gates.py` skips (`len(c) < 3`). They are measured rows that FAIL at HEAD by §2.
- **RED at HEAD.** Every band is RED (table above). Fix-14's C5-G7 and E11-G6 now pass their own cures (FM-04, and E11-G6 under Notes), so no rewritten gate is RED for a reason its cure cannot clear.

## Row 3 · vacuous gates

### FN-01 · W-0.12 G1 passes a state rule on `.dock-run`, the full layer's third class

- **Where.** `waves/W-0.12.md:41`, G1.
  - The pass cell reads: "no rule … sizes a layer (`.dock-layers`, `.dock-layer` (the base class both layers carry …) or `.dock-layer--*` as the last compound …)".
  - §3 reads: "No rule sizes a dock layer from a dock state while the dock morphs."
- **Defect.** The full layer is one element with three classes: `'dock-layer dock-layer--full dock-run'` (`GlassDock.vue:464`). `src` already sizes that element through `.dock-run`:
  - `run.css:154` says "`.dock-run` rides the SAME element as `.dock-layer--full`";
  - `run.css:287-292` sets `min-block-size: 0` on `.glass-dock.vertical .dock-run`.

  G1's subject test is `\.dock-layer(s|--…)?` or a last compound under `.dock-layers >`. So a state rule that sizes the full layer through `.dock-run` passes.
- **Evidence.** In the worktree at `534e2644`, `layers.css:348` was gated `:not([data-morphing])`, the cured base (G1 exit 0). Each plant was appended to `layers.css`, and the file was restored after each run:

  | plant on the cured base | exit |
  |---|---:|
  | `.glass-dock.collapsed .dock-layer--full { inline-size: 0 }` (control) | 1 |
  | `.glass-dock.collapsed .dock-layer { width: 0 }` | 1 |
  | `.glass-dock.collapsed .dock-layers .dock-run { width: 0 }` | **0** |

  `.dock-run` is in neither the pass cell nor G1's CLAIMS entry (`hold-line-claim.py:168`), so the NOUN arm cannot reach it.
- **Shape of a cure.**
  - Read the layer's subject as any class the layer elements carry (`.dock-layer`, `.dock-layer--*`, `.dock-run`), or name `.dock-run` in the subject test.
  - Add `.dock-run` to the pass cell and to the CLAIMS entry.

### FN-02 · E9-G7 passes `useBreakpoint(…)`, the library's own `matchMedia` wrapper

- **Where.** `waves/W-E.9.md:69`, E9-G7, "no viewport keys in the fold".
  - §3 item 4: `useTabResponsive` "drops `matchMedia`" and observes the strip's own box.
  - The span names `matchMedia`, `useMediaQuery`, `useBreakpoints`, `useWindowSize`, `innerWidth`, `visualViewport`, `screen.width` and `documentElement.clientWidth`.
- **Defect.** `src/composables/dom/useBreakpoint.ts:46` exports `useBreakpoint(query)`, which "wraps `window.matchMedia(query)`" (`:20`). It is the library's own spelling of a viewport key. `useBreakpoints` (vueuse) is in the span; `useBreakpoint` is not, and the regex does not match it. The media query a caller passes, such as `"(min-width: 640px)"`, has no `@media` before it, so the span's first arm misses it too.
- **Evidence.** In the worktree, the cured base was §3 item 5's `@container field (max-width: 36rem)` in `LabeledField.vue` plus `useTabResponsive.ts` with its hit lines stripped; E9-G7 exited 0 on it. Each plant was appended to `useTabResponsive.ts`, and both files were restored after:

  | plant | exit |
  |---|---:|
  | `const mql = window.matchMedia("(min-width: 640px)");` (control) | 1 |
  | `const w = window.innerWidth;` | 1 |
  | `const { matches: isDesktop } = useBreakpoint("(min-width: 640px)");` | **0** |

- **Shape of a cure.** Name `useBreakpoint\b` (or `useBreakpoints?`) in the span, and add the plant to the CLAIMS entry (`hold-line-claim.py:414`).

### FN-03 · E3-G9 passes a second floor folded into `block-size`

- **Where.** `waves/W-E.3.md:69`, E3-G9, "one floor authority". Its pass cell reads: "no rule or script in `src/components/sheet` floors the content a second time."
  - §3 item 3 says the floor is "computed once in TS … and published as `--sheet-floor`", and "the ladder is the one authority".
- **Defect.** The span reads only `min-block-size`, `min-height`, `min-h-*`, `minHeight` and `minBlockSize`. `src` also writes a floor as `block-size: max(<size>, <floor>)`:
  - `src/components/dock/styles/controls/touch-floor.css:50`: `block-size: max(100%, var(--dock-touch-target, 2.75rem))`;
  - `src/styles/glass/control-bit.css:152`: `block-size: max(var(--touch-target), …)`.

  The sheet's content box at HEAD is `block-size: calc(clamp(0, var(--detent-t), 1) * 100dvh)` (`styles.css:530`). Folding `--sheet-floor` into that declaration with `max()` or `clamp()` floors the content a second time in CSS, and it passes.
- **Evidence.** In the worktree, the cured base was `styles.css:531`'s `min-block-size: calc(…)` deleted, with `use.ts:85` reading `visualViewport`; E3-G9 exited 0 on it. Each plant was appended to `styles.css`, and both files were restored after:

  | plant | exit |
  |---|---:|
  | `.x { min-block-size: var(--sheet-floor); }` (control) | 1 |
  | `[data-slot="sheet-content"] { block-size: max(var(--sheet-floor), calc(clamp(0, var(--detent-t), 1) * 100dvh)); }` | **0** |
  | `[data-slot="sheet-content"] { block-size: clamp(var(--sheet-floor), calc(var(--detent-t) * 100dvh), 100dvh); }` | **0** |

  E3-G3 to G5 are measured and would see a CSS floor in paint. But E3-G9's CLAIMS entry is kind S (`hold-line-claim.py:367`), so the sweep holds it to its spellings, and these pass.
- **Shape of a cure.**
  - Also fail any `block-size` or `height` in `src/components/sheet` whose value reads `--sheet-floor` or wraps a `max(`/`clamp(` around the detent span.
  - Add both plants to the CLAIMS entry.

### FN-04 · E8-G4 passes any fixed radius token but `--radius-sm` and `--radius-card`

- **Where.** `waves/W-E.8.md:68`, E8-G4, "Metric reads the context radius (static; UIA-F-149)". §3 item 5 (fix-14) reads: "`metric/styles.css:123,142` read `--radius-ctx` in place of `--radius-sm` and `--radius-card`".
- **Defect.** The span forbids `var(--radius-sm` and `var(--radius-card` only, the two tokens Metric reads at HEAD. The claim is that Metric reads the context radius. Another fixed rung, read the way other components in `src` read one, passes:
  - `src/components/music-staff/styles.css:64`: `border-radius: var(--radius-panel)`;
  - `src/components/dialog/styles.css:22`: `border-radius: var(--radius-3xl)`.

  So does a literal radius.
- **Evidence.** In the worktree, `:123` and `:142` were rewritten to `var(--radius-ctx)` (the cure; exit 0). Each plant was appended, and the file was restored after:

  | plant | exit |
  |---|---:|
  | `.x { border-radius: var(--radius-sm); }` (control) | 1 |
  | `.x { border-radius: var(--radius-3xl); }` | **0** |
  | `.x { border-radius: var(--radius-panel); }` | **0** |
  | `.x { border-radius: 0.75rem; }` | **0** |

- **Shape of a cure.** Fail any `border-radius` or `border-*-radius` in `metric/styles.css` whose value is not `var(--radius-ctx)` (or a `calc()` of it, if the spec allows one). Add the plants to the CLAIMS entry (`:410`, SPEC `:688`).

### FN-05 · `hold-line-claim.py` is still narrower than its class

- **Where.** `formation-audit/sweeps/hold-line-claim.py`: the NOUN arm (`nouns`, per fix-14 `:1043`), and the CLAIMS and SPEC entries for W-0.12 G1 (`:168`, `:623`), E9-G7 (`:414`, `:691`), E3-G9 (`:367`) and E8-G4 (`:410`, `:688`).
- **Defect.**
  - **The class** (fix-14): a static gate must "fail on every form of the defect its pass cell or its spec names".
  - **What NOUN reaches.** It reaches spellings no seat listed only when the gate's title, pass cell or spec quote names them in backticks.
  - **What it misses.** A spelling of the defect that `src` uses for the same subject, but that the gate's text does not name: a third class on the same element, a wrapper of a named API, or a sibling idiom for the same declaration. Such a spelling passes the gate, and the sweep has no plant for it.
- **Missed instances.** FN-01 (`.dock-run`), FN-02 (`useBreakpoint`), FN-03 (`block-size: max(var(--sheet-floor), …)`), FN-04 (`var(--radius-panel)`).
- **Shape of a cure.**
  - For each S entry whose subject is a selector, plant every class the subject element carries in `src`.
  - For an entry that forbids an API, plant every `src` export that wraps it (a grep of `src` for exports whose body calls it).
  - For an entry that forbids a property, plant the property's siblings that `src` uses for the same job.
  - The four instances become plants.

## Row 4 · π and DELTA

### FN-07 · W-E.8 §3 item 5 changes Metric's corners, and §6 names no Metric surface

- **Where.** `waves/W-E.8.md:55`, §3 item 5 (added by fix-14): `metric/styles.css:123,142` move from `--radius-sm` and `--radius-card` to `--radius-ctx`. W-E.8 §6 (`W-E.8.md`, "π and DELTA obligations") is the section that should carry it.
- **Defect.**
  - **What changes.** Metric's two corners change in paint, a visual claim.
  - **What §6 covers.** Its surfaces are "the 14 routes of the census". Its paired capture is `/navigation/tabs`, `/containers/configurator`, `/display/music-staff` and `/navigation/toc-tracking`, with a DELTA stated in 12 px rungs.
  - **What is missing.** No line of W-E.8 names Metric outside §3 item 5, §4 and E8-G4 (`grep -ni metric W-E.8.md` → lines 55, 59, 68). Metric reads `--radius-sm` and `--radius-card`, not the 12 px rung the census counts, so the census does not carry it either.
- **Shape of a cure.** Add a Metric surface to §6, with before and after, light and dark, Chromium and WebKit as §6's engines, and real Safari UNMEASURED. Name the DELTA as the cell's corner going from `--radius-sm`/`--radius-card` to `--radius-ctx` in its context.

Otherwise no finding.
- **W-0.12 §6** is unchanged.
- **W-E.4 §3 item 11** changes the side offset of every popper. Its §6 surfaces include `/overlays/popover`, `/overlays/menu` and `/forms/select` and fixture scenes `tip`, `pop&tall` and `menu&tall`, so the offset is on a π surface. Nothing in `src` reads `--z-toggle` but the bridge, so the z change has no surface in the library's demo.

## Row 5 · ledger rows

No finding.
- `ledger-terminal.py` exits 0 over 825 rows.
- Fix-14 changed no LEDGER row.
- The two §3 items it added are the cures of rows that already point at their gates:
  - UIA-F-149 → W-E.8, E8-G4 (`LEDGER.md:835`; `INBOUND-MAP.md:458`);
  - UIA-V-676 and UIA-F-219 → W-E.4, E4-G19 (`W-E.4.md:101`).

## Row 6 · loop pre-emption

No finding.
- W-0.12 still depends on W-0.8 alone (PLAN §5), so it opens after D2 converges through W-0.8.
- Fix-14 edited no loop wave's §3 except W-H.6's gate, which holds §3 item 1's token. §3 item 2 leaves the seat to D3.
- W-0.7 §3 item 2's change is to the CHANGELOG's wording.

## Row 7 · the DAG

No finding. `plan_dag.edges()` with `graphlib`, run here, reads:
- 102 §5 rows for 102 specs, none missing either way;
- a topological order of 102, so no cycles;
- 0 dangling ids;
- 0 band-0 edges to a wave outside band 0.

`release-gates.py` exits 0 with band-0 loop gates {D2, D3}. Fix-14's PLAN note names W-0.12 among the band-0 waves that read D2's harness at its `docs/` path. The DAG holds it: W-0.12 reaches W-C.1 through W-0.7 → W-A.1 (pass 13).

## Row 8 · breaks and aliases

### FN-06 · W-E.4 §3 item 11 changes two published values at rest without a MIGRATION row

- **Where.** `waves/W-E.4.md:67`, §3 item 11 (added by fix-14), and W-E.4 §7 (MIGRATION rows).
- **Defect.** Item 11 changes two published values, and §7 has a row for neither.
  - **`--z-toggle`.** "`--z-toggle` takes a rung of the z scale …, not `999`." It is a published token. `scheme-motion.css:215` declares it, and `bridges.css:277` bridges it as `--z-index-toggle`, so consumers reach it as the `z-toggle` utility. Nothing in `src` reads it but the bridge (`rg z-toggle src`: two lines). So the change reaches consumers only: a consumer's `z-toggle` element that sat above every rung (999, over `--z-toast: 160`) moves to a rung the spec does not name.
  - **The popper offsets.** "The content seam passes one side offset, read from a token …, to every popper." At HEAD the public `sideOffset` defaults differ:
    - 4 on `TooltipContent.vue:26`, `PopoverContent.vue:39` and `DropdownMenuContent.vue:35`;
    - 0 on `SelectContent.vue:35` and `DropdownMenuSubContent.vue:20`.

    One value for every popper changes at least one set of defaults.
- **The plan's own rule.**
  - W-E.4 §7 already gives a row for value changes at rest of the same kind: `--overlay-max-block: min(24rem, 60dvh)` → `24rem`, and the Popover panel width → content-fit.
  - W-0.12 §7 states the rule a wave without a row must meet: "no published name or value changes at rest."
- **Shape of a cure.**
  - Name the rung `--z-toggle` takes, and the offset token's value.
  - Add a §7 row for each value that changes: `--z-toggle` 999 → the named rung; the `sideOffset` default per component, before and after.

Otherwise no finding.
- Fix-14's other §3 edits change no published name.
- No alias was added.

## Row 9 · re-booked chronics

No finding.
- `chronic-decided.py` exits 0.
- Fix-14 changed no LEDGER row, and no chronic changed wave.
- W-E.4 item 11 and W-E.8 item 5 state cures for rows already decided in those waves (row 5).

## Hardening notes (invented spellings; never make a pass unclean)

These spellings are this seat's. No spec names them, no CLAIMS entry lists them, and `src` has no instance.

- **H6-G3** passes `inset: calc(-2 * var(--glass-blur-resting-radius) * 3)`, a different multiple of the rung's own token, and `translate: -32px -32px` on the pseudo-element.
- **E4-G19** passes `--z-toggle: 170`, a literal that is not a rung. The z scale's rungs are themselves literals, so the gate cannot tell them apart by form. Naming the rung in §3 (FN-06's cure) would let the span read `--z-toggle: var(--z-…)`.
- **W-0.12 G1** fails `.dock-layer::before { width: 0 }` under a state. A pseudo-element is not the layer, so the gate fails closed there. That is not vacuity.

## Notes outside the checklist (not counted)

- **E11-G6** (fix-14) now reads names declared twice, compared without quotes, spaces or case. It exits 1 at HEAD: four `@font-face` blocks share `"Plus Jakarta Sans Fallback"` (`scale.css:23,32,39,46`). §3 item 4's four platform names would pass it.
- **C5-G7's prose hits** (`constellation/README.md:43,144`) still fail closed, as passes 13 and 14 note.
- **This seat's runner filter** is wider than pass 13's, so band counts are not comparable one to one. Every extra exit-0 span is listed above and is a prose fragment or a build-dependent hold.
- **Fix-14's open items stand:**
  - real Safari, OW-3;
  - `hold-line-scope.py` does not cover born-RED gates;
  - W-0.12's per-frame strip has no formation reading (no browser at this seat either).
