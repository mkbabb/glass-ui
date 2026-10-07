# BL — formation audit, pass 13

| field | value |
|---|---|
| seat | formation critic, pass 13. Authored none of `PLAN.md`, `waves/`, `LEDGER.md`, passes 1-12, fixes 2-13 or the sweeps |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `f2ee6a6f` (fix 13 was committed while this seat read; it opened at `2794898e` with fix-13's files modified in the tree). `git diff --stat 2794898e f2ee6a6f -- src tests tests-visual demo` is empty, so no probe reading differs between the two bases |
| inputs read | `PLAN.md` (§2, §3, §5 and its edge notes, by script and by line); `waves/W-0.12.md` whole; fix-13's diff to `W-0.8.md`; the §5 rows of W-0.7, W-0.8, W-A.2, W-A.4, W-B.9, W-C.5, W-E.3, W-E.4, W-E.9, W-G.1, W-G.3, W-G.6, W-G.7, W-H.6, W-I.1, W-I.2, W-J.1, W-J.2, W-L.4; `W-C.5` §3 item 7; `W-E.3` §3 item 3; `W-E.9` §3 item 5; `W-H.6` §3 items 1-4; `W-G.1` §0; `LEDGER.md` §0 (`:30-34`), `:118`, `:126`, `:234`, `:236`, `:423`, `:530`, `:553` and every DISEASE row by script; `waves/INDEX.md:19`; `audit/REGISTRY.md` headers and severity lines; `formation-audit/pass-12.md`; `formation-audit/fix-13.md` last; every file under `sweeps/` |
| where probes ran | worktree `.claude/worktrees/bl/formation/crit-13/wt`, made at `2794898e` for the sweeps and plant probes, then removed and re-made at `f2ee6a6f` for the gate run. `node_modules` and `tests-visual/node_modules` symlinked. No build ran. Every plant was restored from a saved copy; `git status --short` in the worktree read 0 lines before each `git worktree remove --force`, and `git worktree list \| grep -c crit-13` → 0. Load average 45-108 (`uptime`); no timing cell was read. No browser ran: the Playwright and chrome-devtools MCP servers failed to connect. Real-Safari cells are UNMEASURED (OW-3) |
| fences | no source edit, no git write in the checkout, nothing under `design/` read, run or written, no sibling repo touched. Every sweep ran with `PYTHONDONTWRITEBYTECODE=1`; `sweeps/` holds no `__pycache__`. The only write in the checkout is this file. Sweep logs went to the session scratchpad, where this seat's first eight logs overwrote same-named scratch logs of earlier seats (`reshape-order.log` and the like); nothing in the checkout reads them |

The checklist has nine fixed rows. Each finding names its row. Notes at the end are outside the checklist and do not count.

## Result

| row | check | result |
|---|---|---|
| 1 | all 85 families placed exactly once | PASS |
| 2 | every spec has a gate; every gate RED at HEAD | FAIL (FM-04) |
| 3 | no vacuous gate | FAIL (FM-01, FM-02, FM-03, FM-05) |
| 4 | every visual claim carries π/DELTA | PASS |
| 5 | every ledger row terminal, pointing at a wave that covers it | PASS |
| 6 | no loop wave pre-empts its loop, except owner-ratified and recorded exceptions | PASS |
| 7 | DAG acyclic, one source; band 0 external only on D3 (veil rows, W-0.11) and D2 (W-0.8) | PASS |
| 8 | every break has a MIGRATION row, no alias | PASS |
| 9 | no re-booked chronic | PASS |

**clean = false.** Five findings. Pass 12's five are cured as named, and every sweep exits 0. The new findings:
- **FM-01.** W-0.12 G1, the moved and rewritten G19, passes a state rule on `.dock-layer`, the base class both layers carry (`GlassDock.vue:464,478`), and on `.dock-layers > *`. It also passes a layer width laundered through a state-set custom property.
- **FM-02.** H6-G3 still passes a second radius laundered through a custom property, when the property's name starts `--glass-blur-`. That includes re-declaring the rung's own token with a literal.
- **FM-03.** Two more of fix-13's rewritten gates pass the defect their own spec names:
  - E9-G7 passes `@media (width < 36rem)`, though fix-13 holds E7-G9, its sibling, to range syntax;
  - E3-G9 passes `min-block-size: var(--sheet-floor)` and `min-height: calc(…)`.
- **FM-04.** C5-G7, as rewritten, forbids `getRandomValues` in all of `src`. W-C.5 §3 item 7 prescribes exactly one `crypto.getRandomValues` read, in `prng.ts`'s `freshSeed()`, so the gate fails on the cure the wave lands.
- **FM-05.** The CLAIMS entries of `hold-line-claim.py` are too narrow for the class the sweep claims. FM-01 to FM-04 are its missed instances. FM-04 also exposes a gap: the sweep's cured base is the gate's own hits deleted, never the spec's cure form, so a gate that forbids the cure passes the sweep.

## Sweeps, re-run (plan at fix-13; worktree at `2794898e`, `src` identical to `f2ee6a6f`)

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
| `hold-line-claim.py` | `python3 hold-line-claim.py <crit-13 worktree>` | **0** | `in-scope static gates 137 (hold lines 6; S 65, L 67, H 5), plants 352, open 0` (no NOTE line; 44.8 s) |
| `fail-open-gates.py` | `python3 fail-open-gates.py <crit-13 worktree>` | **0** | `gate rows 730, fail-open rows run 123, docket rows 20, open 0` |
| `gates.py`, `plan_dag.py` | run bare, and imported by every sweep | **0** | — |

**How wide each sweep is against its class:**
- **`hold-line-claim.py` is too narrow (row 3, FM-05).** Its mechanism is sound. Its CLAIMS entries, which are this sweep's reading of each gate's claim, miss the spellings in FM-01 to FM-03. Its cured base never plants the form the spec's §3 writes, so FM-04 passes it as well.
- **`chronic-decided.py`.** The widened SHARED arm (`:114-121`) checks the word "own". It cannot check that a wave which says "own" exists to decide the row. This seat read the two rows fix-13 re-labelled:
  - **C-11 in W-G.1.** It is the WebGL2 delete that W-G.1 exists for (#54a is the same wave's disease row, and W-G.1 §0 reads the blob's excise as "one of the WebGL2 arms").
  - **C-13a in W-G.4.** It is #49's medium collapse, decided with #49 in #49's wave.

  Neither is a disguised shared wave. No missed instance was found, so this is not a finding.
- **The other eight: no missed instance found.**

## Pass 12, re-verified

| id | verdict | reading here |
|---|---|---|
| FL-01 | cured as named; see FM-01 | G19 moved to `W-0.12.md:41` G1 and reads rules. On a cured base (`:348` gated `:not([data-morphing])`, G1 exit 0), each of pass 12's six exit-0 plants now exits **1**: the one-line rule, the one-line `.dock-layer--summary { inline-size: 0 }` bite, the trailing comment, `.is-active`, `[data-x]` and `max-width`. At HEAD, G1 exits **1** (`layers.css:349`) |
| FL-02 | cured as named; see FM-02 | Each of pass 12's five exit-0 plants now exits **1** against both spans: `--glass-overshoot: -32px` read by `inset`, negative `margin`, the value on the next line, `-32PX`, and `calc(var(--radius-ctx) * -1 - 32px)`. At HEAD both spans exit 0 (the hold) |
| FL-03 | cured | The sweep reads 137 forbidding static gates, 131 of them born RED. Its run prints no NOTE line, so G-L1-5's entry (`hold-line-claim.py:513`) runs, and so does W-0.12 G1's (`:151`) |
| FL-04 | cured | `LEDGER.md:423`: `L04-M33` is now W-0.12, "decided in W-0.12 (own)". `:530` lists it under F-3 as resolved. W-0.12 decides only that row (`W-0.12.md` §1, §8). W-0.8 no longer closes it (`W-0.8.md` §8) |
| FL-05 | cured | `chronic-decided.py:114`: a row is open if it says "shared" or does not say "own". `:117-121` also flag a row whose "(own" names a wave other than its wave cell |

## Gates re-run at `f2ee6a6f`

**Static gates.** `gates.py` reads 730 gate rows. A runner in this seat's scratchpad ran every non-struck span that starts with a command and names no build, browser, network, `node`, `python`, `$H`, `$D3_OUT`, `dist/`, `.cache/`, `design/` or `<…>`. It ran 4 at a time with a 60 s cap and stdin closed, in the worktree.

| band | nonzero / run | timeouts |
|---|---|---|
| 0 | 18/23 | 0 |
| A | 28/29 | 0 |
| B | 21/22 | 0 |
| C | 16/17 | 0 |
| D | 1/1 | 0 |
| E | 27/27 | 0 |
| F | 2/2 | 0 |
| G | 17/18 | 0 |
| H | 9/11 | 0 |
| I | 17/17 | 0 |
| J | 4/4 | 0 |
| K | 11/11 | 0 |
| L | 12/14 | 0 |

**Every band reads RED.** The runner skips W-0.12 G1, whose awk text contains `<style`. This seat ran it on its own: exit **1** at HEAD (`layers.css:349`). G6-G6 is struck, so band G runs one span fewer than in pass 12.

**Exit-0 spans.** Each is the same set that pass 12 accounted for:
- **Labelled hold lines.** W-0.1 G5 and W-0.11 G5, W-0.10 G3, W-0.2 G3, B15-G3, G2-G4, both spans of H6-G3, and both spans of G-L3-9.
- **The floor half of a born-RED row.** W-0.8 G14.
- **A printed value.** C4-G7.
- **State-dependent, as its own cell says.** A1-G11.

**BLOCKER families** (`audit/REGISTRY.md:31`):
- **F-01 (W-A.2).** A2-G3, A2-G6, A2-G7 (as widened) and A2-G11 exit 1. A2-G6's two other backticked spans are prose fragments (`git grep -E`); they exit 2 and 128 and are not gates.
- **F-68.**
  - W-0.7: G2 (as widened), G5 and G8 exit 1; G6 and G9 exit 128 (no `v10.2.0` tag).
  - W-L.7: G-L7-1 exits 1.
  - W-L.8: G-L8-2, G-L8-14 and G-L8-15 exit 1; G-L8-12 exits 128.
- **F-21 (W-E.2).** E2-G9, E2-G11 and E2-G12 exit 1. Its paint gates were not run (no browser).

Of the HIGH families, the static spans of every wave were run as above. Browser, `$H`, harness and GPU gates were not run, nor was any gate that reads `design/` (fence).

## Row 1 · families placed

No finding. `REGISTRY.md` has 85 `#### F-` headers. PLAN §3 has 102 rows, which name all 85 and no other family (script). The new row W-0.12 names "F-16 split (L04-M33, a disease row)". W-0.8's cell now reads "less #48, less L04-M33 and the corner and edge-witness split", so F-16 keeps one unqualified holder (W-0.8). Its named splits are W-0.12, W-I.1 and W-I.5. `waves/INDEX.md:19` agrees.

## Row 2 · gates exist and are RED at HEAD

### FM-04 · C5-G7 fails on the cure W-C.5 prescribes

- **Where.** `waves/W-C.5.md:82`: `! rg -n 'Math\.random|getRandomValues|randomUUID' src`. It passes on exit 0, under the title "one randomness source".
- **Defect.**
  - **What the spec prescribes.** §3 item 7 (`W-C.5.md:63`): "Every `Math.random` goes through `mulberry32` from `prng.ts`. `prng.ts` gains `freshSeed()` (one `crypto.getRandomValues` read), used where a caller gives no seed."
  - **What fix-13 did.** It widened the gate to forbid `getRandomValues` everywhere in `src`, `prng.ts` included, so the one source the wave writes fails it.
  - **The result.** The gate is RED at HEAD, but no tree that lands the specified cure can turn it green. An acceptance gate that cannot pass on its own wave's cure does not accept the wave.
- **Evidence.** In the worktree, the 10 files with a hit were stripped of every hit line, and the gate exited **0**. Then the line `export function freshSeed(): number { return crypto.getRandomValues(new Uint32Array(1))[0]; }` was appended to `src/composables/glass/procedural/prng.ts`, the form §3 item 7 names, and the gate exited **1**, on `prng.ts:27`. Every file was restored.
- **Sweep.** The C5-G7 entry in `hold-line-claim.py:304-306` carries `crypto.getRandomValues(...)` as a red plant and has no green plant for the cure. So the sweep encodes the contradiction instead of catching it (FM-05).
- **Shape of a cure.** Exclude `src/composables/glass/procedural/prng.ts` from the `getRandomValues` arm. Bound that file to one read (`-eq 1`). Add a green plant of `freshSeed()` to the CLAIMS entry.

## Row 3 · vacuous gates

### FM-01 · W-0.12 G1 passes a state rule on the layer's base class, on `.dock-layers > *`, and through a state-set custom property

- **Where.** `waves/W-0.12.md:41`, G1.
  - The pass cell reads: "no rule … sizes a layer (`.dock-layers`, `.dock-layer--*` as the last compound of a selector …) from a dock state".
  - §3's ruling reads: "No rule sizes a dock layer from a dock state while the dock morphs."
- **Defect.**
  - **The base class.** The subject test is `/\.dock-layer(s|--[a-z0-9-]+)([^a-z0-9_-]|$)/`, which leaves out the plain class `.dock-layer`. Both layers carry that class (`GlassDock.vue:464` `'dock-layer dock-layer--full dock-run'`, `:478` `'dock-layer dock-layer--summary'`). The stylesheets already size layers through it (`layers.css:224-226`, `.glass-dock:not(.vertical) .dock-layer { min-height: … }`). A state rule on `.dock-layer` sizes both layers, and it passes.
  - **A child of the group.** `.dock-layers > *` selects the same two elements. Its last compound is `*`, so it passes.
  - **A state-set custom property.** A state rule that sets a custom property, read by an ungated layer rule, sizes the layer from the state. That is the laundering FL-02 cured in H6-G3, and here it passes.
- **Evidence.** In the worktree, `layers.css:348` was gated `:not([data-morphing])` (the cured base, G1 exit 0). Each plant below was appended, G1 was run (span from `gates.py`), and the file was restored after each run:

  | plant on the cured base | exit |
  |---|---:|
  | `.glass-dock.collapsed .dock-layer--full { inline-size: 0 }` (control) | 1 |
  | `.glass-dock.collapsed .dock-layer { width: 0 }` | **0** |
  | `.glass-dock.collapsed .dock-layer.is-active { inline-size: 0 }` | **0** |
  | `.glass-dock.collapsed .dock-layers > * { width: 0 }` | **0** |
  | `.glass-dock.collapsed .dock-layers > .dock-layer { width: 0 }` | **0** |
  | `.glass-dock.collapsed { --x: 0px }` / `.dock-layer--full { width: var(--x) }` | **0** |

  The CLAIMS entry (`hold-line-claim.py:151`) holds G1 to 20 red plants, none of them `.dock-layer` or a custom property.
- **Shape of a cure.**
  - Widen the subject to `\.dock-layer(s|--…)?`, and to any last compound under `.dock-layers >`.
  - Fail any custom property set under a dock state and read by a sizing property of a layer rule.
  - Add the three spellings to the CLAIMS entry.

### FM-02 · H6-G3 passes a second radius laundered through any `--glass-blur-*` name

- **Where.** `waves/W-H.6.md:66`.
  - The first span exempts `var\(\s*--(?!glass-blur-)`, so any custom property whose name starts `--glass-blur-` is allowed in an `inset`, side or `margin` value.
  - The second span fails only a custom property declared with a negative literal.
  - §3 item 1 names the one allowed token: "the rung's own token (`--glass-blur-<rung>-radius` at the element's `--glass-level`), never a second value".
- **Defect.** A positive literal declared under a `--glass-blur-` name and read in the overshoot `calc()` passes both spans. So does re-declaring the rung's own radius token with a literal beside the overshoot. Each is a second value, laundered the same way as the custom-property form fix-13 cured.
- **Evidence.** Each pair was appended to `src/styles/glass/material.css` in the worktree, and both spans were run as one `&&` chain; the file was restored after each run:

  | plant | exit |
  |---|---:|
  | `.x::after { inset: -2rem; }` (control) | 1 |
  | `.x { --glass-blur-pad: 32px; }` and `.x::after { inset: calc(var(--glass-blur-pad) * -1); }` | **0** |
  | `.x { --glass-blur-resting-radius: 32px; }` and `.x::after { inset: calc(var(--glass-blur-resting-radius) * -2); }` | **0** |

- **Shape of a cure.**
  - Restrict the exemption to `--glass-blur-[a-z-]+-radius`.
  - Fail any declaration of a `--glass-blur-*-radius` token in the six files that are not the ladder's token source, or any such declaration with a literal length.
  - Add both plants to the CLAIMS entry.

### FM-03 · E9-G7 and E3-G9, as rewritten, pass the defect their specs name

**E9-G7** (`waves/W-E.9.md:69`, "no viewport keys in the fold").
- **The gate.** The LabeledField span is `! grep -qE '@media[^{]*max-width: *36rem' …LabeledField.vue`.
- **What it misses.** §3 item 5 replaces the viewport query with `@container field (max-width: 36rem)`. A viewport query in range syntax, which is the form fix-13 held E7-G9 to (`hold-line-claim.py`, the "range syntax" plant under W-E.7), passes.
- **Evidence.** In the worktree:
  - The base was made by applying §3 item 5's `@container` form and stripping the `useTabResponsive.ts` hits; the gate exited 0.
  - Each plant was appended in a `<style>` block and the files were restored after each run:

    | plant | exit |
    |---|---:|
    | `@media (max-width: 36rem)` (control) | 1 |
    | `@media (width < 36rem)` | **0** |
    | `@media (width <= 36rem)` | **0** |
    | `@media (max-inline-size: 36rem)` | **0** |
    | `@media (max-width: 576px)` | **0** |

- **Sweep.** The CLAIMS entry (`hold-line-claim.py:372-376`) has no range-syntax plant.

**E3-G9** (`waves/W-E.3.md:69`, "one floor authority").
- **The gate.** `! grep -qE 'min-block-size: *calc\(' …sheet/styles.css`.
- **What it misses.** §3 item 3 says the floor expression is "computed once in TS … and published as `--sheet-floor`. … The CSS `min-block-size` floor is deleted." A CSS floor that reads `--sheet-floor`, or one written as `min-height` or with `max()`, is the second authority the gate forbids, and it passes.
- **Evidence.** In the worktree:
  - The base was made by deleting the `min-block-size: calc(…)` declaration at `styles.css:531` and the `innerHeight` line in `use.ts`; the gate exited 0.
  - Each plant was appended and the files were restored after each run:

    | plant | exit |
    |---|---:|
    | `.x { min-block-size: calc(50vh); }` (control) | 1 |
    | `.x { min-block-size: var(--sheet-floor); }` | **0** |
    | `.x { min-height: calc(50vh - 1rem); }` | **0** |
    | `.x { min-block-size: max(12rem, 30dvh); }` | **0** |

  E3-G3 to G5 are measured, and the `PI_PLANT` bite at `W-E.3.md:72` would catch a planted floor in paint. But E3-G9's CLAIMS entry is kind S (`hold-line-claim.py:335-339`), not H, so the sweep holds it to its spellings, and these spellings pass.

**Shape of a cure for both.**
- E9-G7: match any `@media` whose query names `width`, `inline-size` or a `36rem`/`576px` bound.
- E3-G9: forbid any `min-block-size` or `min-height` on the sheet content that is not `0` or `var(--touch-target)`.
- Add each spelling to the CLAIMS entries.

### FM-05 · `hold-line-claim.py`'s CLAIMS entries are narrower than the class it sweeps, and its cured base never plants the spec's cure

- **Where.**
  - `formation-audit/sweeps/hold-line-claim.py`, the CLAIMS table: `:151` (W-0.12 G1), `:304-306` (C5-G7), `:335-339` (E3-G9), `:372-376` (E9-G7), and H6-G3's entry.
  - The cured-base step (docstring step 1): "the lines its own search reports are deleted".
- **Defect.**
  - **The class** (fix-13): "A static gate earns its place by failing on every form of the defect its pass cell names, on a tree where the cure has landed."
  - **What the sweep can test.** It can only test the spellings its entries list. Fix-13 wrote those entries, so a spelling fix-13 did not think of passes both the gate and the sweep.
  - **What its cured base is.** The tree with the gate's own hits deleted, not the spec's cure. So a gate that forbids the cure's own form passes the sweep, unless the entry happens to carry a green plant for it. C5-G7's entry carries the cure's form as a red plant.
- **Missed instances.**
  - FM-01: `.dock-layer`, `.dock-layers > *`, the state-set custom property.
  - FM-02: `--glass-blur-pad`, a re-declared rung token.
  - FM-03: E9-G7 range syntax; E3-G9 `var(--sheet-floor)`, `min-height`, `max()`.
  - FM-04: C5-G7 against §3 item 7.
- **Shape of a cure.**
  - Each S entry gets at least one green plant that is the spec's §3 cure form, written as the spec writes it. The sweep runs that plant as WIDE.
  - Each entry's red plants are checked against the pass cell's own nouns. A class, property or token the pass cell or §3 names must appear as a plant: `.dock-layer`, `--sheet-floor`, `--glass-blur-<rung>-radius`.

## Row 4 · π and DELTA

No finding.
- **W-0.12 §6** carries the layer-swap per-frame width strip, before and after, light and dark, Chromium and WebKit `+shim`, with real Safari UNMEASURED and captures under `.cache/evidence/W-0.12/`.
- **W-0.8 §6** (`:196`) hands the strip to W-0.12 and keeps the rest of its filmstrip. W-0.12's before strip is taken on the tree W-0.8 lands, which W-0.12 itself reads.
- Fix-13's other edits are static gate rewrites and carry no visual claim.

## Row 5 · ledger rows

No finding.
- `ledger-terminal.py` exits 0 over 825 rows.
- Fix-13's moves were read in their specs:
  - `L04-M33` → W-0.12 (`W-0.12.md` §1, §8);
  - C-11 → W-G.1 (`W-G.1.md:9,23,35,105`);
  - C-13a → W-G.4 (`W-G.4.md:9,28`, gate G4-G2).

## Row 6 · loop pre-emption

No finding.
- W-0.12 is not a loop wave. It depends on W-0.8, which carries D2's gate (`PLAN.md:282,286`), so it opens after D2 converges.
- Its §3 ruling leaves the form to the carrier W-0.8 lands: a gate as the sibling's, or a strike.
- W-0.8 §3 (`:110`) now says it neither rules on the window nor gates it.

## Row 7 · the DAG

No finding. `plan_dag.edges()` with `graphlib`, run here, reads:
- 102 §5 rows for 102 specs, none missing either way;
- a topological order of 102, so no cycles;
- 0 dangling ids;
- 0 band-0 edges to a wave outside band 0.

The band-0 rows that name a loop gate are W-0.1, W-0.2 and W-0.11 (`D3 gate`) and W-0.8 (`D2 gate`) (`PLAN.md:275,276,282,285`). W-0.12's one edge is W-0.8 (`:286`), and W-0.7 waits on W-0.12 (`:281`). W-0.12 reaches W-C.1 before W-C.1 moves the harness, through W-0.7 → W-A.1 → W-C.1 (`'W-0.12' in ancestors('W-C.1')` → True), so its `docs/` harness path holds. `release-gates.py` exits 0.

## Row 8 · breaks and aliases

No finding.
- W-0.12 §7 has no break.
- Fix-13 widened W-0.8 G16 to forbid `scrollContainer`, `chromeRef` and `scrollChrome` in `useDockSearch.ts` and the barrel. Each is in W-0.8's MIGRATION row (`:211`), as §3 (`:139`) removes them.
- The other rewrites change patterns only.

## Row 9 · re-booked chronics

No finding. `chronic-decided.py` exits 0 with its widened SHARED arm. Of 46 DISEASE rows, every rationale says "own", and every "decided in W-x (own" matches the row's wave cell (the sweep's arms, re-run). The rows fix-13 changed (`L04-M33`, C-11, C-13a) were read in their waves: each is decided by a wave that exists for that decision, or for the decision it is one arm of (see the sweep notes above). No row is booked to a later wave without a ruling.

## Notes outside the checklist (not counted)

- **`PLAN.md:392`'s harness note** lists W-0.1, W-0.2, W-0.8 and W-0.11 as the band-0 waves that read their loop's harness at its `docs/` path. W-0.12 reads D2's harness there too (`W-0.12.md` instruments) and is not named. The order holds through the DAG (row 7). The note is incomplete.
- **C5-G7 also reads prose.** `src/components/constellation/README.md:43,144` and doc comments count as hits. The gate fails closed on them, which the cure must strip. It is not a defect, but its HEAD count (28 lines) includes them.
- **Pass 12's notes stand.** These are A2-G8's qualifier and the DISEASE recount, 46 by rationale against 47 by word.
- **Fix-13's open items stand.** Real Safari OW-3. W-0.12's per-frame strip has no formation reading. `hold-line-scope.py` does not cover born-RED gates.
