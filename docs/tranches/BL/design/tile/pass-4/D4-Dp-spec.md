# D4 · pass 4 · D4-D′ · spec: the declared cell, on floor v3

| field | value |
|---|---|
| seat | D4-D′ spec, pass 4. Answers the route's open rows from REGISTRY §P3-6.4 with probes on HEAD + floor v3, and specifies the route against the fixed 40-row checklist (§P2-6.3, unchanged by §P3-6.3). Did not read the other route's pass-4 files. Picks no winner, adds no row |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | The task names `9219651e`. The worktree (`.claude/worktrees/bl/D4/p4/D4-Dp-spec/wt`, detached, removed before return) was made at `b798fdd3`. `git diff --stat 9219651e b798fdd3 -- src tests MIGRATION.md package.json demo vite.config.ts` is empty. `floor-v3.patch` (sha1 `f8f57677…`) applied first, clean, then `D4-Dp-spec/route.patch` |
| patch | **`D4-Dp-spec/route.patch`**, relative to HEAD + floor v3, sha1 `45309cb4f0df8aeb97cc111f1b53d8241754596a`: 8 files (7 changed, 1 added), +282 / −10 by `git apply --numstat`, of which source +27 / −1, MIGRATION +25 / −6, tests +230 / −3. Built by `run-dp4.sh patch`, which diffs each file against its HEAD + floor v3 copy kept beside the worktree, so the patch never touches the checkout. `patch -p1 --dry-run` on a fresh copy of those base files applies all 8 |
| harness | **Two hashes, not by this seat's hand.** Commit `10c89b18c` ("browser-memory cures …", 15:14:58) changed `harness/lib.mjs` while the Chromium battery ran: Chromium now launches Playwright's default headless shell unless `BL_GPU_CHROME` is set (was `channel: "chromium"`), and the BL WebKit lock `holdWebkit()` became a no-op (`guarded --exclusive webkit` is now the one lock). Chromium T-1, T-2 and T-3 read H4 `e40bfd8801ef`; every later run reads `a26206b6a740` (39 files). Chromium T-1..T-3 were re-run under `a26206b6a740` (§3.3) so every scored cell carries one hash. Harness files unedited by this seat |
| engines | Chromium 149.0.7827.55 and **Playwright WebKit 26.5** (Playwright 1.61.1), headless, from `glass-ui/node_modules/playwright`. Playwright WebKit is not Safari. Every real-Safari cell: **UNMEASURED (owner's safaridriver checkbox)** |
| machine | Every build, unit run and browser run went through `~/.claude/guard/guarded --light --rss-gb 8` (the heavy queue's path every pass-4 seat took); every run that can start Playwright WebKit also held `--exclusive webkit`. One heavy run at a time. The guard held the library build **24 min for headroom** (14:46 → 15:10; the machine at 1,607-1,632 processes, most of them other sessions' `vitest-vscode` ×290 and R ×112, not this seat's to stop), and the WebKit stage queued on the machine-wide WebKit lock from 15:33 to about 15:48 and then ran 15:48 → 16:14 in one hold (§3.4). The guard clamped the 240-min stage timeouts to 90 min; no stage reached it. 1-min load: Chromium stages 8.0-15.3, Playwright WebKit 11.1-33.9, unit and bundle 11.3-20.7. Every log's first and last line carry the 1 / 5 / 15-min load |
| records | Everything under `pass-4/D4-Dp-spec/`: `run-dp4.sh` (the driver: one stage per call), `route.patch`, `route/` (`route.json`; `migrated.mjs`, the pass-3 prototype's six migrations byte-identical below a new header), `logs/` (every log cited), `probes/canon-fact.mjs` and `probes/fact-write.mjs` (this seat's two probes). Builds, run JSON and captures stay in `.claude/worktrees/bl/D4/p4/D4-Dp-spec/out/` |

Citations: `D′s` / `D′p` / `D′c` are the pass-3 D′ spec, prototype and critique; `FV3` is `FLOOR-V3.md`; `H4` is `H4.md`.

---

## 0 · In brief

1. **After floor v3 the route only writes the fact.** D′ is one prop and one CSS rule:
   - `shape: "pill" | "cell"` on `<ToggleGroup>`, refused through the floor's `refuseUnknown` when unknown, and stamped as `data-shape`;
   - `.toggle-group[data-shape="cell"] { --selection-tile: flush }`.

   Nothing else in the route reads the declaration. The tile's corner, column, pad, leading, row height, perimeter, flush plate, pill law, names and Q-9 exemption all come from the floor reading the fact. The pass-3 route's own copies of the M-10 fixes and of the tile geometry are gone (they are floor v3's).
2. **The route's three open rows outside the owner's (§P3-6.4) are met on HEAD + floor v3 + D′**, measured on the route's own build rather than the floor's stub:
   - **R-10**: FACT 12/12 on `src` and on `dist` (pass 3: `fact-split` 8/20). A unit pins that the declaration writes the fact and nothing else, and the R-10 plant (the pass-3 descendant corner put back) fails it;
   - **FV-2**: T-2 52/52 on `src` and `dist` (pass 3: D′ was unread on `late`; floor v2 read 40/52);
   - **E-3's pill clause**: the MIGRATION pill row is floor v3's, made true there (T-2's 12 late cells, `pill-row` 27/27). The route's own MIGRATION claims are each measured: CORNER 5/5, FACT-WRITE 12/12 for the new "write over `shape="cell"`" claim, and the shape refusal pinned by a unit plant.
3. **One row the floor's move re-opened for this route, and its cure: R-7.** The harness CANON reads 1/3 on the route (`no rule declares the tile`), because `canon.mjs` does not evaluate the `@container` condition every route's tile corner now sits under (`FV3` §5, F3-1). The route's own canon unit (`radius-role-canon.test.ts`) now evaluates container conditions against each twin's fact. It passes clean and fails plants A, S, H and I, plus two route plants (§2.4 R-7). The seat's probe `canon-fact.mjs`, which is CANON's law with the container evaluated in the engine, reads 4/4 clean and fails plants A, S and H on their own cells, in Chromium and Playwright WebKit alike. R-7 is scored on the unit, which is what the row names. CANON's own 1/3 is the harness's to cure (H5).
4. **Migrated arm, Chromium · Playwright WebKit, identical tallies in the two engines**: T-1 15/15 · 18/18, T-2 52/52 · 52/52 (`dist` the same), T-3 40/43 · 40/43, T-4 24/24 · 24/24, T-5 38/38 · 38/38 (`dist` the same), T-6 33/33 · 33/33, T-7 24/24 · 24/24, T-8 27/27 (one run), W-D 8/8 · 8/8, FACT 12/12 · 12/12, ATTACK 3/3 · 3/3 (`src-dev` 4/4 · 4/4), CORNER 5/5 · 5/5 (`dist` the same). The three T-3 misses are C1 (Q-10). No stall, no hang, no NOT-REPRODUCED in either engine.
5. **Projected checklist: 34 / 40, at the owner-gated fixed point.** The six open rows are the six §P3-6.4 names, each built at its default: T-3 and E-2 (Q-10), R-1 (Q-5, Q-15), R-8 (Q-5), G (Q-2, Q-3), E-4 (the checkbox). None is claimed by ruling.

---

## 1 · The mechanism

Line numbers are in the patched tree (HEAD + floor v3 + `route.patch`).

| # | where | what |
|---|---|---|
| M-1 | `src/components/toggle-group/shape.ts:1-7` (new) | `TOGGLE_GROUP_SHAPES = ["pill", "cell"] as const` and `type ToggleGroupShape`. One list read by the prop type and the guard (P-3) |
| M-2 | `toggle-group/ToggleGroup.vue:2, 11-12, 49-50, 59, 62, 166` | `shape?: ToggleGroupShape`, default `"pill"`. `:data-shape="props.shape"` on the root. `watchEffect(() => refuseUnknown("ToggleGroup", "shape", props.shape, TOGGLE_GROUP_SHAPES))`: an unknown value throws `TypeError: [ToggleGroup] shape="card" is not one of pill, cell.` in production as in development, through the app's error handler, and the group renders as pills (FV-10's one policy, `_shared/guard.ts`) |
| M-3 | `toggle-group/index.ts:2`; `src/index.ts:374` | `type ToggleGroupShape` in both barrels (E-7) |
| M-4 | `toggle-group/styles.css:52-60` | **The route's whole tile rule:** `.toggle-group[data-shape="cell"] { --selection-tile: flush; }`, in `@layer components`, (0,2,0) over the floor's per-group reset `.toggle-group { --selection-tile: none }` (`:39`, (0,1,0)). It writes the fact and nothing else |
| — | floor v3, read, not written | `styles.css:206-219` (`@container not style(--selection-tile: none)`: the field corner as a layered `!important`, column, stretch, `align-self`, gap, `--toggle-group-tile-pad`, start text, body leading, `--selection-perimeter: 1`); `:141-157` (the pill law); `utilities/base.css:69-108` (the pill row); `control-surfaces.css:100-106` (flush); `ToggleGroupItem.vue:148` (the names read the fact) |
| M-5 | `MIGRATION.md:41-54` and `:100-109` | The `shape="cell"` row (rewritten: `shape="cell"` sets the fact "and that is all it sets"). The Chip detector narrowed to `<Chip[^>]*shape="cell"` (`:27-28`). The `--selection-tile` row now says `flush` on `shape="cell"`, and states what a consumer write does: on the group element itself it writes over the declaration (`plated` for a plate, `none` for pills); on an ancestor it has no effect, because the group sets its own |
| M-6 | `tests/components/ui/toggle-group/ToggleGroup.test.ts:390, 398-428` | The barrel lists `ToggleGroupShape`. **`shape stamps data-shape, defaults to pill, and refuses an unknown value`.** **`the declaration writes the tile fact and nothing else (R-10: one spelling)`**: the only rule naming `data-shape` is `.toggle-group[data-shape="cell"] { --selection-tile: flush }`, and the only non-`none` writer of the fact in the sheet is that selector |
| M-7 | `tests/styles/radius-role-canon.test.ts:3, 568-757` | **The canon unit, container-aware** (§2.4 R-7). It replaces HEAD's text match on `.toggle-group__item … var(--radius-pill)` with the pass-3 parsed-selector law over 48 twins (`D′p` M-9), plus one new step. A rule under `@container [not] style(--selection-tile: V)` reaches a twin only when the condition holds on that twin's fact. The fact is the cascade's winner among the sheet's `--selection-tile` declarations that match the item's group: the highest specificity, a tie to the later declaration, and the `@property` initial `none` when nothing matches. Any other container condition is unmatched, which is a FAIL. The law also asserts every twin's fact is `flush` (cell) / `none` (pill), so a missing writer cannot pass vacuously |

**Not in the route, on purpose:**
- no geometry, corner, pad, perimeter, plate or name of its own. Each is the floor's, and a second copy would be the R-10 split pass 3 measured;
- no grid on `cell` (CX-5 stays closed): the consumer keeps its layout;
- no `#title`, `#meta` or `#mark`. Anatomy is F's centre, and the mark is Q-3 (b)'s (FV3-6, not built);
- no `!important` on the writer. A consumer rule on the group must be able to write `plated` (Q-2's other arm, reachable only through the token on this route) or `none`. FACT-WRITE measures both, and measures that a write on an ancestor does nothing (§2.5 E-3).

**Pass-3 route parts that left the route** (now floor v3, applied under every route): the perimeter at inset 0 (FV3-1), `inheritAttrs: false` with the engine last and the consumer-ARIA name (FV3-2), FadingScroll's stop rule (FV3-3), the descendant geometry block and its `sm` pad arm (FV3-4), `item-attrs.test.ts` and the FadingScroll contract case. `route.patch` is +27 / −1 in `src`, against pass 3's +342 / −25 over floor v2 across all 12 files.

---

## 2 · The checklist (REGISTRY §P2-6.3), row by row

"Witness" names the shared witness or probe and its log. Rows are scored on the migrated arm, the gating unmigrated arm and the non-transcription library scenes. Under D′ a library transcription arm (`preset`, `specimen`, `strip`, `f1`, `v2`, `c1`) is the consumer markup with its paint dropped, which is an undeclared group, so pills. Its cells are R-1's. Library residue outside the route is unchanged from `FV3` §4.1 and named once: `card` and `chipcell` are retired bindings; `wrap`'s pill Chip and coarse Button are Q-1's A1 sub-choice; FL-5 is K2's unlayered pad.

Chromium numbers are from `logs/battery-src-chromium.log` (15:11 → 15:27, load 8.0-14.5; T-1..T-3 re-read in `logs/rechrome-T-*.log`, §3.3), `logs/dist-*-chromium.log`, `logs/atkdist-*-chromium.log`, `logs/atkdev-attack-chromium.log` and `logs/probe-*-chromium.log` (15:27 → 15:33, load 9.6-11.1). Playwright WebKit numbers are from `logs/src-*-webkit.log`, `logs/src-T-8-both.log`, `logs/dist-*-webkit.log`, `logs/atk*-webkit.log` and `logs/probe-*-webkit.log` (15:48 → 16:14, load 11.1-33.9, one lock hold). "A · B" is Chromium · Playwright WebKit.

### 2.1 · T-1..T-8

| row | how it is met | witness and reading | status |
|---|---|---|---|
| T-1 | the floor's field corner, switched on by the fact the declaration writes | T-1 migrated **15/15 · 18/18**: preset, specimen and strip at 16.00 px at fine, coarse and `--ui-scale 1.25`. Library 5/27 (12 UNMEASURED: held pills, R-1) | met |
| T-2 | floor FV3-5's pill row on every undeclared group | T-2 **52/52 · 52/52** on `src` and on `dist`, H4-2's 12 late cells included | met |
| T-3 | the floor perimeter, on by the fact | migrated **40/43 · 40/43**: preset, specimen, strip, F1, V2 and the H3-11 state scenes in light, dark and PRT. **Open:** `c1-migrated` 22.50 px² (perimeter band 0.00) against 224 in light, dark and PRT (fill 1.17 / 1.23 / 1.01:1). Gating shipped `preset-verbatim` 0.00 / 233.00 / 0.00 px² against 248 (Chromium). The unmigrated arm reads 12/48 · 9/48, as on HEAD and both floors | **open: owner Q-10 (C1), Q-5 (shipped K1)** |
| T-4 | the floor's ring reach | migrated **24/24 · 24/24** | met |
| T-5 | the engine, FV3-2, FV3-3 | migrated **38/38 · 38/38** on `src` and `dist` | met |
| T-6 | the floor's kick and hover rung, on tiles | migrated **33/33 · 33/33**. `preset-migrated` keyboard pop 1.03 at 90 · 76 ms, programmatic 1.03 at 85 · 75 ms, calm observer 1.03 at 79 · 80 ms, pointer 1.04 at 124 · 108 ms, each with a trough and a settle. Tab entry 0.00. Hover ΔE 0.0946 · 0.0953 (PRM the same), PRT 0.0332 · 0.0309 (WebKit's PRT is the forced level-0 path) against 0.02. Coarse taps latch nothing. No janky-frame cell, so no re-run was owed | met |
| T-7 | the six migrations delete every item paint class | migrated **24/24 · 24/24** | met |
| T-8 | H3-2 reads the migrated arms | migrated **27/27** in one run over both engines (`logs/src-T-8-both.log`). The library 0/12 are held transcription pills (R-1); the 13th unmeasured cell is real Safari, E-4's | met |

### 2.2 · X-1..X-7

The route adds nothing to the floor's register, so these read the floor through the route's declaration. They are carried on the battery cells that hold them:

| row | witness and reading | status |
|---|---|---|
| X-1 sibling state | T-3 `preset-sibling-migrated` light, dark, PRT green in both engines | met |
| X-2 selected ink reaches the media | the migrations stroke with `var(--selection-ink)`; T-3 and T-7 migrated green with no `[data-state="on"]` rule. The dark K2 stroke contrast is R-5's | met |
| X-3 state paint never re-renders the slot | floor; unchanged from pass 3 (`D′c` §3.2, 4/4). The route adds no slot and no render path | met (carried) |
| X-4 multi-select, same anatomy | V2 `type="multiple" shape="cell"`: T-1 and T-3 migrated green | met |
| X-5 interactive descendant named | floor FV-7, unchanged; ATTACK on `src-dev` 4/4 | met (carried) |
| X-6 deselectable single | floor; unchanged from pass 3 (2/2) | met (carried) |
| X-7 tone on edge, tint, ink | T-3 `preset-tone-translucent-migrated` and `-unresolvable-` green; floor FV-4 unchanged from pass 3's 24/24 | met (carried) |

"Carried" rows rest on floor code this route does not touch and on pass-3 readings of the same floor code. The critic re-reads them with the shared probes (`D4-Dp-spec/probes/states.mjs`, `crit.mjs`) on this route's build.

### 2.3 · FV-1..FV-10, read under the route

| row | reading under D′ | status |
|---|---|---|
| FV-1 | T-5 and T-6 green on the migrated arms | met |
| **FV-2** | **T-2 52/52 · 52/52 on `src` and `dist`**, including the inline-style and utility `display: block` cells on all six gating pill scenes. Floor v3's `pill-row.mjs` on this build: **27/27 · 27/27** (`logs/probe-pill-row-*.log`) | **met** (pass-3 open row) |
| FV-3 | T-6 calm-observer commit 1.03 at 79 ms | met |
| FV-4 | X-7 above | met |
| FV-5 | floor; the a11y probe reads it (pass 3: 9/9) | met (carried) |
| FV-6 | T-5 arrows on every migrated grid, `src` and `dist` | met |
| FV-7 | ATTACK `src-dev` 4/4: the `sup` pills name nothing, the consumer-ARIA name fires | met |
| FV-8 | PRT hover ΔE 0.0332 · 0.0309 on `preset-migrated` | met |
| FV-9 | `flush` from the declaration; `plated` by a consumer rule on the group: FACT-WRITE `declared-plated-rule` reads fact `plated`, 16.00 px, column, in light and dark (§2.5 E-3) | met (the look is G's) |
| FV-10 | the `shape` guard (M-2); the unit case fails when the guard is deleted (`logs/unit-plant-guard-gone.log`) and when the stamp is deleted (`unit-plant-stamp-gone.log`) | met |

### 2.4 · R-1..R-10

| row | how it is met, or why it is not | witness and reading | status |
|---|---|---|---|
| R-1 the unmigrated consumer | Q-5's default (b)+(d), built by the floor | `logs/probe-unmigrated-dist-*.log` (`dist`): shipped K1 `preset-verbatim` 208.00×40.00, 1 row, nothing cut, with no selected carrier in light or PRT (T-3 above); shipped K2 `specimen-verbatim` 207.00×36.00, 3 rows, **CUT 4 boxes, up to 24.64 · 24.86 px**, silent. W-E `dist` 1/6 · 1/6 | **open: owner Q-5, Q-15** |
| R-2 the H-2 pair | an undeclared group is pills at h/2; declared, tiles; nested either way, each group its own | W-D **8/8 · 8/8**; T-2 52/52 · 52/52; FACT `pill-in-tile`, `pill-beside-tile`, `tile-in-pill` green in both engines (12/12 · 12/12) | met |
| R-3 the commit, plant-checked | the floor's kick | T-6 commit cells above. The plant is the floor's kick deleted, which the route does not touch; pass 3 read 33/33 → 21/33 on the same kick code (`D′c` §1). The critic re-plants on this build | met (plant carried) |
| R-4 hover against selected | floor | T-6 hover ΔE 0.0946 · 0.0953 rest, 0.0332 · 0.0309 PRT; the selected tile's T-3 separation holds beside a hovered sibling in pass 3's `states --part hover` (18/18) on the same floor register | met |
| R-5 X-2 media ink, dark stroke reported | `--selection-ink` | pass 3, unchanged code: K2 stroke 2.66:1 light / **1.56:1 dark**; the perimeter carries T-3 | met, reported |
| R-6 the comfort axis | the field rung at every rung | T-1 migrated coarse and `--ui-scale 1.25` cells 16.00 px; floor `tile-geometry.mjs` on this build 30/30 · 30/30 (sm / md / lg, light and dark, five consumer-corner forms) | met |
| **R-7** the canon unit fails plants A, S, H | M-7: the unit now evaluates the container condition the field corner sits under | **Unit** through H4-3's `unit.mjs` (config `f70c44e4`): clean 63/63 (`logs/unit-plant-clean.log`). Plants, each `1 failed`: **A** (`:is(<tile>)` 12 px), **S** (`[data-size="sm"]` arm on `--radius-panel`), **H** (`:has(> * + *)` 12 px), **I** (the corner without `!important`), **no-writer** (the fact never written: no twin is a tile, so the law fails rather than passing on zero), **split** (pass 3's descendant corner put back: fails both the canon case and the R-10 case). **Probe** `canon-fact.mjs` (`logs/probe-canon-fact*-{chromium,webkit}.log`, identical in both engines): clean 4/4, with exactly one tile rule, `«.toggle-group__item @container not style(--selection-tile: none)» → var(--radius-field)`, 48/48 twins, and twin facts `flush/none`. Plant A FAILs `tile corner` (2 rules), S FAILs `tile corner` (2 rules), H FAILs `pill corner` (`.toggle-group__item:has(> * + *) → 12px`, 24 twins). **Harness CANON reads 1/3 · 1/3**: `0 rule(s): no rule declares the tile` and `«.toggle-group__item» → var(--radius-field)` reaching all 48 pill twins, because it ignores the container condition (F3-1) | **met on the unit**; CANON's 1/3 is the harness's (H5) |
| R-8 refusal per Q-5 on `dist` | Q-5's default: refused structurally in production, named in development | T-2 52/52 · 52/52 on `dist` (nothing cut, nothing stacked, after mount); CORNER 5/5 · 5/5 on `dist`; W-E `dist` 1/6 · 1/6 (W-E counts only an error or a throw in production, which (b) does not give) | **open: owner Q-5** |
| R-9 the bundle datum | stated (§4) | `logs/bundle.log` | met (stated); the rebind is Q-14 |
| **R-10** "is a tile" spelled once | M-4 writes the fact and nothing else; the floor's geometry reads only the fact | FACT **12/12 · 12/12** on `src` and `dist`: `declared` 16.00 px; `pill-in-tile` and `tile-in-pill` pills at h/2; `fact-plated` and `fact-flush` on the undeclared preset agree (a tile on the field corner, 204.00×61.58 at 16 px, where pass 3 read the lozenge at 30.79). Unit M-6 (R-10 pin), and the `split` plant fails it | **met** (pass-3 open row) |

### 2.5 · E-1..E-4

| row | reading | status |
|---|---|---|
| E-1 every cell readable in both engines | every witness and probe gave a verdict in both engines in one sitting: no stall, no hang, no NOT-REPRODUCED, no engine failure (`grep` over every log) | met |
| E-2 the H-10 scenes | F1, V2, the sibling state, the interactive descendant, the keyed reorder and the deselectable single are green on the migrated arms (T-3, T-5, T-6). **C1:** T-3 0/3 | **open: owner Q-10** |
| **E-3** MIGRATION rows, falsifiable claims only | Each of the route's claims was measured. (1) **"a corner on a tile has no effect"**: CORNER **5/5 · 5/5** on `src` and `dist` (utility, scoped, unlayered `!important`; inline `!important` printed INFO), and `tile-geometry.mjs` 30/30 · 30/30. (2) **"`shape="cell"` sets `--selection-tile: flush` … and that is all it sets"**: the unit R-10 pin and FACT `declared`. (3) **"a value other than `pill` or `cell` throws …; the group still renders, as pills"**: unit case, plant-checked. (4) **The `--selection-tile` row's new sentence**, by `probes/fact-write.mjs` on the attack build: **FACT-WRITE 12/12 · 12/12** (`logs/probe-fact-write-*.log`). Declared group with `none` inline or by an unlayered rule: a pill at h/2 on one row. Declared with `plated` by a rule: fact `plated`, 16.00 px. `plated` on the declared group's ancestor: fact stays `flush` (95.94×40.00, 16.00 px, no effect). `flush` on an undeclared pill group's ancestor: fact `none`, 9999px → 20.00 = h/2, one row (no effect). Light and dark. (5) **The pill clause**: the floor's rewritten row; T-2 52/52 · 52/52 on `dist` is its witness | **met** (pass-3 open row: the pill clause) |
| E-4 real Safari | **UNMEASURED (owner's safaridriver checkbox)** in every cell | **open: owner** |

**A falsifiable claim the seat did not make, and a floor comment it found wrong.** The first draft of the `--selection-tile` sentence said a rule "on the group (or an ancestor of its options)" writes over the declaration. That is false: every group resets the fact, so an ancestor's value never reaches a group's items. The shipped sentence says so, and FACT-WRITE's two ancestor cells hold it. `utilities/base.css:54-55` (floor v3) still says a tile route sets the fact "on the group (or any ancestor of its options)". That is a comment, not a MIGRATION claim, and not this route's file; the floor seat should strike the parenthesis (P-3).

### 2.6 · G, the gestalt

D′ paints exactly what the floor paints under `flush` (the route adds no paint value, and O-87 holds trivially), so pass 3's frames stand for the register. The open findings are unchanged: focused-selected shows two concentric outlines (Q-3); plated against flush barely separates in dark (Q-2). The critic re-films H3-13's pair on this build. **Status: open, owner Q-2 and Q-3.**

### 2.7 · Projection

| block | met | open (owner) |
|---|---:|---|
| T (8) | 7 | T-3 (Q-10, Q-5) |
| X (7) | 7 | |
| FV (10) | 10 | |
| R (10) | 8 | R-1 (Q-5, Q-15), R-8 (Q-5) |
| E (4) | 2 | E-2 (Q-10), E-4 (checkbox) |
| G (1) | 0 | G (Q-2, Q-3) |
| **total** | **34** | **6**, each built at its default |

That is §P3-6.4's expected 34/40. Every open row waits on an owner input. Pass 4's route-owned work is done if the critic reproduces §2 and §3.

---

## 3 · Readings in full

### 3.1 · Typecheck, unit, build

| check | result | log |
|---|---|---|
| `vue-tsc --noEmit` (src + demo) | exit 0 | `logs/tsc-app.log` (14:33, load 8.1) |
| `vue-tsc --noEmit -p tsconfig.test.json` | exit 0 after the library build (before it: only the two `@mkbabb/glass-ui/fourier-math` self-imports, as `FV3` §3) | `logs/tsc-test.log` (15:11) |
| the route's unit files, clean | 63/63 (`ToggleGroup.test.ts`, `radius-role-canon.test.ts`) | `logs/unit-plant-clean.log` |
| plants (each must fail) | 8/8 fail: `canon-a`, `canon-s`, `canon-h`, `canon-i`, `no-writer`, `split` (2 cases), `guard-gone`, `stamp-gone` | `logs/unit-plant-*.log` (14:34-14:42, load 8.9-17.0) |
| plant diagnosis | each canon plant fails on the assertion it targets, not on a parse: a diagnostic run with S and H planted printed `expected [ …(2) ] to deeply equal [ Array(1) ]` on the `tileOnly` assertion, with `unmatched` empty (the sheet was restored and checked against its base after) | this document |
| the whole suite | §3.5 | `logs/unit-all.log` |
| library build and scene builds | exit 0: `src`, `src-dev`, `dist`, `dist-dev` with `--route route/`, and `src`, `src-dev`, `dist` with `--route harness/attack-route` | `logs/libbuild.log`, `logs/build-dp-*.log` (15:10-15:11) |

### 3.2 · H4 on HEAD + floor v3 + D′, Chromium

| witness | build | tally (gating) | arms | 1-min load at start |
|---|---|---|---|---|
| T-1 | src | 20/42 (+12 unmeasured) | migrated **15/15** · library 5/27 · unmigrated 3/6 | 14.52 |
| T-2 | src · dist | **52/52** · **52/52** | library | 11.33 |
| T-3 | src | 42/85 (+12 unmeasured) | migrated **40/43** · library 2/39 · unmigrated 12/48 | 11.16 |
| T-4 | src | 36/54 | migrated **24/24** · library 12/30 · unmigrated 3/24 | 8.05 |
| T-5 | src · dist | 87/116 · 88/117 | migrated **38/38** · **38/38**; library 49/78 · 50/79; unmigrated 20/37 | 10.09 |
| T-6 | src | 64/88 | migrated **33/33** · library 31/55 · unmigrated 34/48 | 10.02 |
| T-7 | src | 24/24 | migrated **24/24** · unmigrated 4/32 | 11.09 |
| W-A · W-B · W-C · W-E | src | 5/9 · 9/25 · 0/8 · 1/3 | library, as `FV3` §4 | 10.0-10.4 |
| W-D | src | **8/8** | library | 10.13 |
| W-E | dist | 1/6 | library | — |
| CANON | src | **1/3** (F3-1) | library | 10.04 |
| FACT | attack src · dist | **12/12** · **12/12** | | 9.96 |
| ATTACK | attack src · dist · src-dev | **3/3** · **3/3** · **4/4** | | 10.22 |
| CORNER | attack src · dist | **5/5** · **5/5** | | 10.12 |
| REPORT | src | reported: `kick` push **0.16 px** at 300 px against a 4 px gap (peak 1.0277; want ≤ 0.05); 0.00 px at the scene's 204 px; `mark` UNMEASURED (no FV3-6) | | 10.19 |

The seat's probes on the same builds, Chromium · Playwright WebKit: `canon-fact` 4/4 · 4/4 clean, plants A, S, H each 3/4 · 3/4 on their own cell; `fact-write` 12/12 · 12/12; `corner-gap` (`D′p`'s, unchanged) 10/10 · 10/10, side band 2.00 css px, edge inset Δ 0.03-0.25 · 0.05-0.18 css px; `tile-geometry` (floor's) 30/30 · 30/30; `pill-row` (floor's) 27/27 · 27/27; `unmigrated` as R-1.

### 3.3 · The harness hash

The battery's T-1, T-2 and T-3 were first read under `e40bfd8801ef`, and everything from T-4 on under `a26206b6a740` (the header). `run-dp4.sh rechrome` re-read Chromium T-1..T-3 under `a26206b6a740` at 16:15-16:22 (load 9.7-20.7, `logs/rechrome-T-*.log`): T-1 20/42 (migrated 15/15), T-2 52/52, T-3 42/85 (migrated 40/43). Every tally is identical to the first read, so the change of Chromium build moved no cell. Every run JSON the scores cite now carries `a26206b6a740`: the battery, `dist`, attack, T-8, the WebKit stage, the probes and the unit suite.

### 3.4 · Playwright WebKit

One `--exclusive webkit` hold, 15:48 → 16:14, after about 15 min in the lock's queue (`logs/webkit-all.log`; the stage's inner logs carry their own wall clock and load).

| witness | build | tally (gating) | arms | 1-min load at start |
|---|---|---|---|---|
| T-1 | src | 23/45 (+12 unmeasured) | migrated **18/18** · library 5/27 · unmigrated 3/6 | 28.71 |
| T-2 | src · dist | **52/52** · **52/52** | library | 31.33 · 23.76 |
| T-3 | src | 42/85 (+12 unmeasured) | migrated **40/43** · library 2/39 · unmigrated 9/48 | 33.88 |
| T-4 | src | 36/54 | migrated **24/24** | 20.85 |
| T-5 | src · dist | 87/116 · 88/117 | migrated **38/38** · **38/38** | 20.28 · 19.83 |
| T-6 | src | 64/88 | migrated **33/33** · library 31/55 · unmigrated 34/48 | 19.97 |
| T-7 | src | 24/24 | migrated **24/24** · unmigrated 4/32 | 19.72 |
| T-8 | src (both engines) | 27/39 (+13 unmeasured) | migrated **27/27** · library 0/12; real Safari: "You must enable 'Allow remote automation' …" | 16.26 |
| W-A · W-B · W-C · W-E | src | 5/9 · 9/25 · 0/8 · 1/3 | library | 17.3-21.7 |
| W-D | src | **8/8** | library | 20.99 |
| W-E | dist | 1/6 | library | 20.85 |
| CANON | src | **1/3** (F3-1) | library | 19.14 |
| FACT | attack src · dist | **12/12** · **12/12** | | 19.14 · 20.70 |
| ATTACK | attack src · dist · src-dev | **3/3** · **3/3** · **4/4** | | 17.33 · 24.42 · 23.21 |
| CORNER | attack src · dist | **5/5** · **5/5** | | 17.39 · 23.32 |
| REPORT | attack src | reported: `kick` push **0.13 px** at 300 px against a 4 px gap (peak 1.0275), 0.00 px at 204 px; `mark` UNMEASURED. (The driver read WebKit's REPORT on the attack build, whose `preset` tile is 40 px tall; Chromium's battery read it on the route build's `preset-migrated`, 63.58 px. The push is a width effect, and both builds give 300 px tiles) | | 17.20 |

The two engines agree on every tally.

### 3.5 · The whole unit suite

Through H4-3's `unit.mjs` (config `f70c44e4`, two workers), `logs/unit-all.log` (16:14 → 16:15, load 11.3-20.7): **2,352 ran: 2,349 passed, 3 failed** (`gate:boot-graph` ×3, no `dist-demo`: HEAD's own, as `FV3` §3), 1 skipped. That is three more than floor v3's 2,349: the shape case, the R-10 pin and the container-aware canon case. The canon file's old stadium text match is removed from its existing case, which the new case replaces.

---

## 4 · The bundle datum (R-9)

`../pass-3/floor-v2/probes/bundle.sh` (npm `unpackedSize`, G-BUNDLE-RATCHET's measure, `--dry-run`), `logs/bundle.log` (16:15, load 20.4-20.7):

| build | unpacked (packed files) | vs datum 2,919,057 | `dist/` | JS gzip-9 |
|---|---|---|---|---|
| HEAD + floor v3 (`FV3` §6) | 2,934,126 B (843) | +15,069 | 2,543,198 B | 330,571 B |
| **HEAD + floor v3 + D′** | **2,936,340 B (844)** | **+17,283** | 2,543,882 B, 840 files | 330,651 B |

The route over floor v3 is **+2,214 B** unpacked: `dist/` +684 B, JS gzip-9 +80 B, and the rest is `MIGRATION.md`. Pass 3's D′ was +4,133 B over floor v2, and most of that difference moved into floor v3. `dist/` holds one more file than on floor v3 (840 against 839). Landing D′ re-binds the datum at the cut with the floor's +15,069; that is a deliberate rebind under G-BUNDLE-RATCHET and the owner's to rule (Q-14).

---

## 5 · MIGRATION rows (in `route.patch`, under the floor's Unreleased section)

1. **New: _A set whose options hold more than one row declares `<ToggleGroup shape="cell">`_** (`MIGRATION.md:41-54`). The prop, its type, what `cell` sets (the fact, and only the fact), the utilities and paint to delete, the refusal of an unknown value, and the detectors (the development name `asks for a second row`; `rg 'ToggleGroupItem[^>]*(flex-col|rounded-)'`). It promises nothing about the tile that the floor's `--selection-tile` row does not already state and measure.
2. **Edited: Chip's detector** narrows to `rg '<Chip[^>]*shape="cell"'`, so a `ToggleGroup`'s `shape="cell"` is not a false hit (`:26-28`).
3. **Edited: the `--selection-tile` row** (`:100-109`). "nothing in the library sets it yet" becomes "`flush` on a `<ToggleGroup shape="cell">`", plus the write-over sentence FACT-WRITE measures.
4. **Header**: "Four bindings leave and one arrives."

**Consumer edits** (E-6: each lands in its consumer's own tranche; transcribed in `route/migrated.mjs`, unchanged from pass 3):
- K1 `SpringPhysicsFacet.vue`: `shape="cell"` on the group. Delete the group reset, the item utilities, `rounded-pill`, the name's `text-foreground` pin and the dashed selection paint.
- K2 `EasingCatalogue.vue`: `shape="cell" size="sm"`. Delete the item utilities, the group reset with its `padding: 2px 2px 1rem` (FL-5), the corner, the outline selection, and the `[data-state="on"]` stroke and ink rules (→ `var(--selection-ink)`).
- V1 `EasingSpecimenStrip.vue`: Chips in a `group` become one `ToggleGroup type="single" shape="cell" size="sm"`.
- F1 and V2: `shape="cell"` (V2 `type="multiple"`).
- C1: a vertical pill group.
- fourier-analysis `EquationModeToggle.vue:62`: `semantics="radio"` (FL-3, the floor's).

---

## 6 · Risks

| id | risk | measured | what would close it |
|---|---|---|---|
| R-1 | The unmigrated consumer pays for the one-row law: shipped K2 is cut in production with no signal, and shipped K1 carries no selection in light and PRT. This is the floor's law, and it is the same on any route | R-1 above | Q-5 / Q-15; the consumer migrations (E-6) |
| R-2 | C1 has no passing answer under Q-10 (b). On D′ it could declare `shape="cell"`, which gives a 16 px corner on a 40 px one-row option (0.80 of h/2) | T-3 C1 0/3 | Q-10 |
| R-3 | **The harness cannot score R-7 on any floor-v3 route** (CANON 1/3, F3-1). The route's unit carries the law with container evaluation, and the probe `canon-fact.mjs` shows the engine-side form. A critic who scores R-7 on CANON alone would fail it on an instrument blind spot. The probe is not a witness, and the hash rule forbids a route to edit `canon.mjs` | §2.4 R-7 | H5: `canon.mjs` evaluates `style(--selection-tile: …)` against the twin's parent, as `canon-fact.mjs` does |
| R-4 | **The fact is a public input**, so `shape` and a consumer write are two ways to make a tile. They cannot disagree in paint, because the geometry reads only the fact (FACT 12/12, FACT-WRITE 12/12), but `shape="cell"` plus a consumer `none` is a declared group that paints pills, with no name | FACT-WRITE `declared-none-*` | none needed for paint (the consumer wrote it). If the owner wants the declaration to win, the writer takes `!important`. That closes `plated` to consumers until Q-2 is ruled |
| R-5 | A consumer who forgets `shape="cell"` gets pills, held to one row, with the second row named only in development | W-E, T-2 | Q-5 |
| R-6 | The selected edge and the focus ring read as two concentric outlines when focused | pass-3 frames; D′ adds no paint | Q-3 |
| R-7 | The kick pushes 0.16 · 0.13 px into a 4 px neighbour gap on 300 px tiles (REPORT, not gating; the floor alone read 0.14 · 0.13 on floor v2, `H4` §3). Floor-owned | §3.2, §3.4 REPORT | the consumer's gap; or a kick that scales with the item's own size |
| R-8 | **The harness changed under the run** (`10c89b18c`). The headless shell is a different Chromium build from the `chromium` channel pass 1-3 and H4 measured, with the same version string | §3.3 | every pass-4 tally names its hash; H4's and floor v3's Chromium numbers were read on the channel build |

**For the next pass's record** (§P3-6.3 forbids new rows now):
- CANON's container blind spot (F3-1) now decides R-7's shared instrument for both routes; `canon-fact.mjs` is a candidate H5 witness (it still owes a fixture PASS and a planted FAIL inside the harness's self-test).
- `utilities/base.css:54-55` says the fact may be set on "any ancestor of its options", which the per-group reset makes false (§2.5).

**Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell.
