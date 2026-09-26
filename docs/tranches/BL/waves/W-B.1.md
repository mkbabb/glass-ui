# W-B.1 · The BL ledger: every carried row terminal, every route to a row that exists · 11.0.0

| field | value |
|---|---|
| seat | band-B wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `19bf6569` in a scratch worktree (the task named `f3ad78d0`; the 13 commits between are docs-only: `git diff --stat f3ad78d0 HEAD -- src tests scripts .github package.json` prints nothing). `src` is the published 10.1.0 |
| ships in | 11.0.0 (the ledger is a tranche record; the checker ships in `scripts/`, not in the package) |
| families | F-11 whole (`audit/REGISTRY.md:292-299`) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what | where the dropped item re-enters |
|---|---|---|
| L05a-03 | the compositions prune (F43-F45) routed #18 → #21; #21 landed without it; the category and five stories are live (`demo/stories/manifest.ts:989-1062`) | W-E.10 (PLAN §3: "the compositions prune (#18)") |
| L01a-18 | RT-18D, the rest of `compositions/` → #21, unpaid | W-E.10, same row as L05a-03 |
| L01a-24 | #24 RT-24C: three consumer groups refused at #81, dropped at #89 | W-H.3 (the glass-register decide) |
| L01a-35 | T1 GROW and the slider exemplar routed from #27 to #35; #35 sealed without them | W-J.2 (the engaged rung) |
| L01b-X2 | residues routed to seven names that are not register rows: W-CONTROL-REGISTER, W-GLASS-DEDUP, W-CONTROL-CHASSIS, W-BLUR-LADDER, W-SLIDER-PROGRESS, DIRECTORY-SHAPE, CT-7 | one LEDGER row each (§3.3) |
| L01b-64 | #64 TIER-3 RESIDUAL never started | typewriter `Math.random` → W-C.5; the IDIOM-CLEARED column and the `data-slot` count → W-B.12; the shadcn provenance comments → W-C.2 |
| L01b-71 | RT-71A, the dispersion-rim register, unowned and contradicted by `glass-fx.css:148` | W-H.3 |
| L01b-82 | W-FIELD's G-F1 routed to W-CONTROL-REGISTER, a row that does not exist | W-C.4 (the dead `.input-pill` selectors); the in-tree fence is struck here (§3.4) |
| L01b-85 | W-EASING residues routed to sealed rows: `data-reparse-ok` has 0 readers (`EasingPicker.vue:571`), `./easing` unpinned | the dead seam → W-C.4; the subpath pin → W-A.5 |
| L04-F21 | BG's "What BG DEFERS ONWARD" block (`BG/FINAL.md:331-348`) skipped by both reconcilers | one table, §3.5 |

## 2 · The defect at HEAD

- **The ledger exists; its checker does not.** The formation LEDGER seat wrote `docs/tranches/BL/LEDGER.md` (committed at `ae8370e0`; `test -f` exits 0 at `183e021a`, read by fix-2). Before it, the census (`ledger/CENSUS.md`) holds 135 rows with HEAD words LANDED 14, PARTIAL 60, OPEN 44, BLOCKED 7, OWNER-GATED 4, RETIRED 6 (`CENSUS.md:20-25`). Those are status words, not terminals: 115 of the 135 carry no BUILD, FOLD, RETIRE, ANSWERED or DECLINE. `INBOUND.md:5` promises each inbound row "a terminal disposition in `LEDGER.md` at formation"; LEDGER §6-§7 and appendix A now carry them.
- **Routes to rows that do not exist, in the tree.** `git grep -nE '(fenced on|routed? (to|→)|rides|owed to|OWED|→) *`?(B[A-Z]\.)?W-[A-Z]{2,}' -- src tests scripts` prints 4 lines at HEAD:
  - `tests/components/field/forms-seam.test.ts:83` "KNOWN-RED half, fenced on W-CONTROL-REGISTER (§9 row 1)" (a row that never existed, L01b-82);
  - `tests/components/field/forms-seam.test.ts:91` "fill α fenced on W-FROST" (a BK wave name, closed);
  - `tests/components/sortable-list/battery.test.ts:7` "G-14 FROST → W-FROST's receiver matrix (#22)";
  - `tests/styles/radius-dialog-bind.test.ts:16` "routed to W-GATE-COLLAPSE".
  Two more of L01b-X2's names survive as provenance comments (`scripts/lib/subpath-policy.mjs:104` BI.W-GLASS-DEDUP, `src/styles/tokens/light-dark.css:26` BJ.W-BLUR-LADDER); those are W-C.2's E-10 residue.
- **No checker.** Nothing verifies that a route names a row that exists (`node scripts/tranche/verify-ledger.mjs` → `Cannot find module`). The BK census reconciled by id regex and so missed the un-id'd BG block (L04-F21).

## 3 · The cure

1. **`docs/tranches/BL/LEDGER.md`** (written at formation; this wave does not rewrite it), one table, one row per carried item:

   `| row | source | HEAD word | terminal | wave | ruler | rationale or owner quote |`

   - `row`: the census id (`#n`, `C-n`, `E-n`, `D-n`, `P-n`, `N-n`), the owner item (`OW-n`), the inbound id with its sender reference (W-B.2's `value.js:O-47` form), or an INBOUND-MAP row id (`UIA-*`, `KFA-*`, `A2-*`, `O-nn R-n`).
   - `terminal` is one of the charter's four words (CH:44), whose one statement is LEDGER §0: **BUILD**, **FOLD**, **BANKED** (with a named re-trigger), **RETIRE** (with a rationale that opens with its class where one applies: CURED, ANSWERED, DECLINE or NOT-REPRODUCED). OPEN, PARTIAL, BLOCKED, DEFERRED, OWED, OWNER-GATED and UNPLACED are not terminals.
   - BUILD and FOLD name a wave in `waves/INDEX.md`. RETIRE and DECLINE carry a rationale; the RETIRE of an owner ask carries the owner's words with a date, or the OW row that asks for them.
   - A row whose items span waves is split into item rows (`#51a`, `#51b`), each with one wave. The census's item columns (`CENSUS.md` §2) are the split list.
   - §4 of the file is the **owner docket**: one row per OW item with the question, the seat's default, the owner's verbatim answer and date, or `pending`. W-B.4, W-B.5, W-B.6, W-B.10, W-B.13, W-B.14 and W-B.15 write their owner questions here.

2. **`scripts/tranche/verify-ledger.mjs <tranche-dir> [--rows id,…] [--close]`.** It exits 1 when:
   - an id in the expected set has no row, or has two. The expected set is read, never typed: the first column of `ledger/census-register-a.md`, `census-register-b.md` and `census-carries-recap.md`, the OW items of `CENSUS.md` §4, every row id of `audit/INBOUND-MAP.md`, and every id in `audit/INBOUND.md`;
   - a terminal is not one of LEDGER §0's four words, a BANKED row names no re-trigger, or a RETIRE row's class (where given) is not one of the four;
   - a BUILD or FOLD row names a wave with no `waves/<id>.md` and no INDEX row;
   - a RETIRE or DECLINE row has an empty rationale, or an owner-ask row (source class `N-`, `D-`, `OW-`, a BD/BI/BJ/AY recap id, or an inbound owner quote) retires with neither an owner quote nor an owner-docket row;
   - any `W-x.n` id cited in `PLAN.md`, `waves/*.md` or `LEDGER.md` has no INDEX row (the F-11 mechanism, checked over the plan as well as the ledger);
   - with `--close`, any owner-docket row reads `pending`. W-L.8 records a pending row as its wave's terminal state with the owner act named (PLAN §1), and the close run prints each one.

   `--rows` limits the report to named rows, for a reader's lookup. No wave gates on it: a decide wave's gates are its enactment in the tree, and an owner-ruled row's gate is its docket line (PLAN §1). The script lives in `scripts/` (F-61: no tooling under `docs/`) and is tranche-generic: it reads the census, map and plan paths relative to the tranche dir, so a later tranche reuses it unchanged.

3. **L01b-X2's seven orphan names**, one row each:

   | name | what it held | terminal |
   |---|---|---|
   | W-CONTROL-REGISTER | G-F1 clause 1, the dead `.input-pill` selectors (22 lines, 0 producers) | FOLD → W-C.4 |
   | W-GLASS-DEDUP | the Surface/Card axis as one plate (`subpath-policy.mjs:104`) | CURED at HEAD: `glass-panel` retired, one plate; the provenance comment is W-C.2's |
   | W-CONTROL-CHASSIS | a third control-size mechanism, `controlSizeClass` with `--control-pill-h`, whose sole reader is `.input-bar` (`BJ/addenda/2026-07-24-refinement/COMPONENT-WAVES-TERMINAL-3.md:624`); at HEAD `--control-pill-h` 5 lines, `controlSizeClass` 6, `input-bar` 15 in `src` | FOLD → W-C.4 (a duplicate size authority is token hygiene; W-E.7's density ruling reads the one that survives) |
   | W-BLUR-LADDER | the blur ladder and its killed `2dppx` writer (`light-dark.css:26`) | FOLD → W-H.2 (the F48 blur ladder, OW-8) |
   | W-SLIDER-PROGRESS | `Progress.vue:138`, routed from #46 | FOLD → W-H.1 (the value mark in both slider variants and the progress fill) |
   | DIRECTORY-SHAPE | the directory shape | FOLD → W-D.1 (loop D1) |
   | CT-7 | `copyStyleAssets` emitting CSS partials into `dist` that no published CSS entry reaches (`COMPONENT-WAVES-TERMINAL-2.md:1107`, `-3.md:627`: the `tags-input/styles.css` orphan, since deleted, and the `_shared/field` orphans) | FOLD → W-A.5 (surface exactness over every subpath; the CSS-reach entry G-12 is W-A.2's) |

4. **The in-tree routes.** The four lines of §2 are rewritten: `forms-seam.test.ts:83` and `:91` state the rule the test holds and drop the fence (the dead selectors are W-C.4's G-13; the fill α is W-H.2's), `battery.test.ts:7` and `radius-dialog-bind.test.ts:16` drop the route. An owed item is a roster `owed` entry (W-A.2 §3.7) or a ledger row, never a comment.

5. **BG's onward block** (`BG/FINAL.md:331-348`), the eight items the reconcilers skipped (L04-F21):

   | item | terminal | ground |
   |---|---|---|
   | the default-Safari WebGPU promote | FOLD → W-G.1 | one engine, WebGPU; Safari 26 ships WebGPU, its cell is W-A.6's |
   | the in-shader squircle corner | RETIRE | the corner is the surface's CSS radius (F-21, W-E.2); no consumer or owner line names a shader corner |
   | the `flow.wgsl.ts` curl tail | FOLD → W-G.1 | `src/composables/glass/webgl/shaders/flow.wgsl.ts` has a GLSL twin `flow.glsl.ts`; the port-then-delete order is W-G.1's |
   | the iOS-27 gyroscope specular feed | RETIRE, re-trigger: a consumer ask | iOS Safari gates `deviceorientation` behind `DeviceOrientationEvent.requestPermission()` inside a user gesture, which a library cannot own; 0 `deviceorientation` sites in `src` |
   | the deckle torn-paper param | RETIRE | BG fenced it itself (skeuomorphic restraint); no consumer names it |
   | anisotropic crayon grain | RETIRE | the paper register is `--paper-grain-tooth` with `--paper-grain-relief` (O-79); no consumer names a second grain |
   | the raster paper fallback | RETIRE | a fallback engaged "only if the lit tooth diverges" is a masking fallback (E-2) |
   | the GU-1 holdout tier (`--shadow-sm…2xl` paper family, SortableList drag-lift) | FOLD → W-C.4 | a shadcn-default ladder beside the house shadows is F-64's legacy-ladder class, as the `--radius` ladder is |

   BG's other onward items resolved elsewhere (LENS-SAFARI → BI P132; metallic aurora retired at BI `PLAN.md:127`; perfect-freehand declined; the goo-blob rename shipped at 5.0.0), per L04-F21; each gets a CURED or RETIRE row citing that line.

## 4 · Files it touches

- New: `docs/tranches/BL/LEDGER.md`, `scripts/tranche/verify-ledger.mjs`.
- Edited: `tests/components/field/forms-seam.test.ts`, `tests/components/sortable-list/battery.test.ts`, `tests/styles/radius-dialog-bind.test.ts` (comments and test titles only).

## 5 · Acceptance gates

Run at `19bf6569` in the scratch worktree; the battery is `scratchpad/formation/band-B/probes/red-battery.sh`, its output `evidence/red-battery-HEAD.txt`.

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| B1-G2 · every row terminal, every route real | `node scripts/tranche/verify-ledger.mjs docs/tranches/BL` | exit 0 | **exit 1**: `Error: Cannot find module '…/scripts/tranche/verify-ledger.mjs'` |
| B1-G3 · no in-tree route to a dead row | `! git grep -nE '(fenced on\|routed? (to\|→)\|rides\|owed to\|OWED\|→) *`?(B[A-Z]\.)?W-[A-Z]{2,}' -- src tests scripts` | exit 0 | **exit 1**: 4 lines (§2) |
| B1-G4 · the checker bites | a copy of `LEDGER.md` with one BUILD row's wave set to `W-Z.9`, then `verify-ledger.mjs` on the copy's dir; again with one terminal set to `OPEN`; again with one census row deleted | exit 1 each, naming the row | the checker is absent |

B1-G1 (`test -f LEDGER.md`) is struck: it exits 0 at `183e021a` (the ledger was committed at `ae8370e0`). B1-G5 is struck: the orphan names and the BG block are rows at LEDGER:388-406 (§6.1), and B1-G2's run over the whole file reads them. B1-G2 alone could pass on a ledger whose expected set was typed short. The expected set is derived from the census and map files (§3.2), and B1-G4's third plant (a deleted census row) proves the derivation is read.

## 6 · π and DELTA obligations

None. The wave makes no visual claim: it writes records and a checker, and edits test comments.

## 7 · MIGRATION rows

None. Nothing published changes.

## 8 · Ledger rows

- F-11's ten members close here, each with the re-entry named in §1.
- The census item that routes to F-11 (#66's routing drop, `CENSUS.md:75`) closes here.
- CH-2 ("every partial, banked or abandoned item gets a terminal disposition", `CENSUS.md:197`) gets its enforcement: B1-G2, run by every band-B wave and at the close.
