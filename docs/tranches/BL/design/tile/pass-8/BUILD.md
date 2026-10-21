# D4 · pass 8 · BUILD: D′ v8 (Q-10 (i) with O-103c's condition, L-1, L-2, L-3)

| field | value |
|---|---|
| seat | D4 pass 8, BUILD seat. It builds D′ v8 on HEAD + floor v6 and lands H8 (H7 + the B-1 writer read, `H8.md`). Then it runs the battery on D′ v8 in Chromium and Playwright WebKit, light, dark and PRT, plus vue-tsc and vitest. It scores no row: the fixed 40-row checklist (§P2-6.3) is the critic's to read. No row is added, struck or renamed |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `78fc8f3b8` (INBOUND O-103c; the pass-8 driver). The worktree is `HEAD + pass-7/floor-v6.patch (09e74243) + pass-8/D4-Dp8.patch` |
| owner | **INBOUND O-103c** (the owner's delegate per O-102b, 2026-10-21): Q-10's remainder ruled **(i)**, "C1 declares shape=\"cell\"", with the condition that C1 is a cell in both states and selection changes no geometry. Every other ruling stands as O-102b/O-103 record it: Q-13 D′ (F struck); Q-10 (b)+(i); Q-5 (b) only; Q-15 (a); Q-2 (b); Q-3 (a); O-1 (a). **Q-11 (a) is a DEFAULT** and G stays BLOCK. The safaridriver checkbox is not granted, so E-4 is read against the Playwright WebKit run of record (O-103). L-3 (O-94/O-94a R-2) is confirmed into D4 |
| harness | **H8 `4159e027cdcf`, 43 files**, printed on every run below |
| engines | Chromium 149.0.7827.55: Playwright's default headless shell, no `channel`, no GPU arguments. **Playwright WebKit 26.5**, headless. Every WebKit number below is Playwright WebKit. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| machine | Every build, unit run and browser run went through `~/.claude/guard/guarded --rss-gb 8`. Engine-free reads and the unit runs used `--light`; no browser run did. Both Playwright WebKit holds ran under `--exclusive webkit`: hold A was admitted at once (02:36:08, load 15.75); hold B queued on the lock and was admitted after 2 min (03:00:11, load 9.51). Neither wait was cancelled. One heavy run at a time (`chain-b8.sh`). Loads across the run were 8.05-20.93 (the guard's admission gate is 36). Nothing is left running |
| records | driver `run-b8.sh`, chain `chain-b8.sh`, every log in `logs/` (`logs/chain.log` has the stage times and loads), the route `routes/D4-Dp8/`, L-3's compositions `routes/L3/` and `routes/L3-plant-on-item/`, probes `probes/c1-box.mjs` and `probes/l3-bare.mjs`, the harness diff `harness-h7-to-h8.diff`. Bulky outputs (builds, run JSON) were in `.claude/worktrees/bl/D4/p8/build8/out`, which is scratch |
| fences | No tracked source in the checkout was edited. The only git writes were `worktree add` and `worktree remove`. The checkout writes are under `docs/tranches/BL/design/tile/`: `harness/sheet.mjs`, `harness/lib.mjs`, `harness/HARNESS.md` and `pass-8/`. Every library plant was restored, and each restore was checked by `git diff HEAD` (equal in each log) |

Short citations: `D′c7` is `../pass-7/D4-Dp-critique.md`; `FV6` is `../pass-7/FLOOR-V6.md`.

---

## 0 · In brief

- **`D4-Dp8.patch`** (sha1 `b5f4ae22`, 8 files, +461 / −52) is the full D′ v8 on HEAD + floor v6. `git apply --check` is clean (`logs/patch-check.log`): the patch was reversed out of the worktree, `src`, `tests`, `demo` and `MIGRATION.md` each compared equal to HEAD + floor v6, and it re-applied clean. The worktree diff read `5d08df87ebbe` before and after.
- **(1) Q-10 (i) with O-103c's condition.** C1 declares `shape="cell"` (route `routes/D4-Dp8`). T-3 migrated reads **43/43** in both engines (40/43 in pass 7), and C1's selected option clears 932-946 px² of ≥ 3:1 carrier against the 251 px² bar in light, dark and PRT. C1 is a cell **at rest and selected**: every option in every one of 6 selection states is 16px and a column. **No box moves:** each option's rest box against its own selected box, and every option and the group across all 6 states, deviate by **0.00 px** (want ≤ 0.50). That holds in Chromium and Playwright WebKit, light, dark and PRT, on `src` and on `dist` (C1BOX 6/6 ×4). T-4 24/24, T-5 38/38 and T-7 24/24 hold in both engines.
- **(2) L-1.** H8 widens SHEET `writers`, and the patch widens FV6-1, its unit twin. A write is now any value other than `none` or `inherit`. The critic's three spellings, `crit-var-writer`, `crit-static-style` and `crit-ts-ternary`, each **FAIL** both readers, on the fixture and on the real library. A reads control passes both. Detail is in `H8.md`.
- **(3) L-2.** The nesting rule is stated once, in MIGRATION's O-2 clause. D′'s sheet comment drops its clause, and so does the floor's tile-geometry comment ("a pill group nested in a tile stays pills"), the other restatement in `src`.
- **(4) L-3.** `--selection-paint` (`auto` | `bare`, registered, inherited) is the tile fact's sibling on the group. Written `bare` on the group, it turns off the option's selected tint and the pill's stadium, and nothing else.
  - It is reset by every group and pinned on the option. The library never writes `bare`.
  - Unit: 2 cases, which pass clean and fail each of 4 mutations.
  - Paint (`probes/l3-bare.mjs`): **12/12** in both engines on `src` and on `dist`. The planted composition (the write on the option) FAILs `bare-pill` and `bare-tile`, **8/12**. The unpinned library FAILs `item-write`, **10/12**. Same in both engines.
- **Everything else reads as pass 7 under H7.** FACT **80/80** on `src`, `src-dev` and `dist` in both engines, and 76/80 on each B-1 plant. CANON 4/4 clean with the same plant tallies. ATTACK 5/5 and 3/3. CORNER 5/5 and 5/5. T-2 52/52 on `src`, `dist` and `dist-dev`. T-6 33/33. W-D 8/8. T-8 migrated 27/27. REPORT `name-ink` and `kick-spring` PASS (ζ ≈ 0.50); the kick is 0.14 px in both engines (want ≤ 0.05, B-5, reported).
- **Units:** clean ToggleGroup + canon **67/67**. The whole suite ran 2,356 cases: 2,353 passed, 1 skipped, and HEAD's 3 `boot-graph` cases failed, as in pass 7. **vue-tsc 0 · 0.** **Bundle 2,935,932 B** unpacked: +16,875 over the datum (2,919,057), +1,082 over pass 7's D′. Q-14 is unchanged and stays the owner's at release.
- **Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell.

---

## 1 · What changed, and why

D′ v8 is pass 7's D′ (`../pass-7/D4-Dp.patch`, `714cd3c0`) plus the changes below. Pass 7's `src` and test lines are carried unchanged except where named.

### 1.1 · Q-10 (i): C1 declares `shape="cell"` (O-103c)

- **Where.** In the pass-8 route's transcription, `routes/D4-Dp8/migrated.mjs`: `MIGRATED("shape")` with C1's `<ToggleGroup>` given `shape="cell"`. That is the same one-string change the pass-7 critic measured in `crit-route/`. It is a consumer-site declaration, so nothing in the library changes for it.
- **Why the route dir and not `sites.mjs`.** The task fixes H8 as H7 plus the B-1 read only. A transcription change in `sites.mjs` would be a second harness change. XSCRIPT reads the route as a declaration only: the pair against pass 7's `D4-Dp` route passes 19/19 (`logs/xscript-pair.log`). If the critic wants the ruled site in the transcription of record, that is one line in `sites.mjs` under a new hash. No number here changes.
- **Both states.** The declaration is on the group, and every option reads the fact from its parent (the floor's style query). So the rest and selected states are the same tile. Selection adds only paint (the tint, the perimeter `::before`, ink and weight) and the commit kick on `transform`, none of which moves layout. §2.1 measures this.

### 1.2 · L-1: B-1's writer read, widened (R-10)

- `harness/sheet.mjs` changes as H8 (`H8.md` §1).
- In the patch, `ToggleGroup.test.ts` widens floor v6's sheet-wide case the same way. It is renamed "every --selection-tile write other than none | inherit in src is the lane sheet's one rule". It treats any value but `none` or `inherit` as a write, strips comments, and reads the name in a writing position to its declaration's end, so a computed ternary is one value.

### 1.3 · L-2: one statement of the nesting rule (P-3)

`toggle-group/styles.css` had two restatements, and both are dropped:
- **D′'s declaration comment.** "…`plated` is the consumer's to write over it (Q-2), ~~and a group nested inside stays pills (every group resets the fact)~~". This is the line L-2 names.
- **The floor's tile-geometry comment.** "…a written `plated` is a card~~, and a pill group nested in a tile stays pills (the group resets the fact)~~". This is a second restatement of the same rule in the same sheet. It was true, because it says "pill group", but it is still a second writer of the fact.

The one statement left is MIGRATION's O-2 clause: "A `ToggleGroup` nested inside a tile is pills again unless it declares `shape="cell"` (every group resets the value)". Two comments still describe the reset mechanism (the pin's limit, "the scope stops at a nested group, which resets the fact", and the floor's registration in `base.css`). Neither states the outcome, and FACT reads the `base.css` text, so neither is touched. This is comment-only; no cell reads it.

### 1.4 · L-3: the selection paint, a sibling fact on the group (O-94/O-94a R-2)

The ask, narrowed by O-94a: an opt-out of the bare item's selected fill and pill radius that keeps selection state and roving focus, for keyframes' catalogue tiles, which paint their own ink and ring. O-103 places it in D4: "on D′ the selected fill is a sibling fact on the group".

- **The fact.** It is registered in the lane sheet (colocation: only toggle-group reads it):
  ```css
  @property --selection-paint { syntax: "auto | bare"; inherits: true; initial-value: auto; }
  ```
- **Written like the tile fact.** `.toggle-group { --selection-paint: auto }` resets it at every group, so a write on an ancestor never reaches the options. FV4-1's pin (`@scope (.toggle-group__item) to (.toggle-group, .segmented-tabs) { :scope, :scope * { … inherit !important } }`) gains `--selection-paint: inherit !important`, so an option and its content cannot write their own. The consumer writes it on the group element or on an element between the group and its options.
- **Read by exactly the two rules it turns off.** Each is under `@container not style(--selection-paint: bare)`:
  - the pill's stadium, `.toggle-group__item { border-radius: var(--radius-pill) }`, which moved out of the item's base rule unchanged;
  - the selected tint, the 12 % and 16 % (hover) `color-mix` on `[data-state="on"]`. The `[data-state="on"]` rule keeps `--selection-ink` and `font-weight: 600`.
- **What `bare` leaves alone, by design.** State, keys, roving and the one tab stop. The selected ink and weight. The rest plate (`.control-surface`). Forced colours. The commit kick and the hover. A tile's field corner (`!important`, the canon's one declaration) and its selected perimeter. **A tile stays a card whoever paints its selection** (N-9, the reason D4 exists), and the perimeter is the 3:1 carrier T-3 reads. A `bare` pill has no corner of its own (0px). The consumer gives it one, which is the radius half of the ask.
- **MIGRATION.** One bullet after `--selection-tile`, in "Behaviour and paint, nothing to change", filled at 88 columns. Every claim in it is read by the unit or the probe: `auto` everywhere; `bare` on the group turns off the tint and the stadium; state, keys, roving, ink and weight stay; a tile keeps its corner and perimeter; a `bare` pill has no corner; no effect from an ancestor or from an option.
- **The canon unit** (`radius-role-canon.test.ts`) now evaluates `style(--selection-paint: …)` on its 48 twins, from the cascade winner of the sheet's declarations of that property, as it already did for `--selection-tile`. Without that, the moved stadium rule is an unevaluated condition, which its law fails. It also asserts that every twin's paint fact is `auto/auto`, because the library writes no `bare`. CANON in the harness already evaluates any `style(--p: v)` on the container's computed value, so it needed no change and reads 4/4.
- **The value names** are the landing's to choose (§P7-4 L-3). `auto | bare` follows O-94's own words ("a bare variant that keeps selection state and roving focus").

### 1.5 · The patch

`D4-Dp8.patch`, 8 files, against HEAD + floor v6 (from `git apply --numstat`):

| file | + / − | what |
|---|---|---|
| `MIGRATION.md` | 49 / 21 | pass 7's D′ text, plus the `--selection-paint` bullet |
| `src/components/toggle-group/ToggleGroup.vue` | 9 / 1 | pass 7 (the `shape` prop, its stamp and its refusal) |
| `src/components/toggle-group/index.ts`, `src/index.ts` | 1 / 0 each | pass 7 (`ToggleGroupShape`) |
| `src/components/toggle-group/shape.ts` | 7 / 0 (new) | pass 7 |
| `src/components/toggle-group/styles.css` | 54 / 16 | pass 7's declaration rule; L-2's two dropped clauses; L-3's registration, reset, pin, stadium and tint |
| `tests/components/ui/toggle-group/ToggleGroup.test.ts` | 129 / 11 | pass 7's two D′ cases; L-1's widened FV6-1; L-3's two cases |
| `tests/styles/radius-role-canon.test.ts` | 211 / 3 | pass 7's canon case, now evaluating the paint fact |

---

## 2 · Every number

### 2.1 · O-103c's condition: C1 a cell in both states, no layout shift (`probes/c1-box.mjs`)

The probe walks C1 through every state: none selected, then each of its 5 options selected in turn (`__tile.select`, the same model write a pointer or a key makes). After each write it waits until no animation runs on the page. Then it reads every option's layout box (offset, transforms excluded) and settled border box (transforms included), its corner and its direction, and the group's box.

| build · engine | light | dark | PRT | logs |
|---|---|---|---|---|
| `dp8-src` · Chromium | cell-both-states PASS · no-shift PASS, max 0.00 px | the same | the same | `c1box-dp8-src-chromium.log` |
| `dp8-src` · Playwright WebKit | PASS · PASS, 0.00 px | the same | the same (forced level-0 path) | `c1box-dp8-src-webkit.log` |
| `dp8-dist` · Chromium | PASS · PASS, 0.00 px | the same | the same | `c1box-dp8-dist-chromium.log` |
| `dp8-dist` · Playwright WebKit | PASS · PASS, 0.00 px | the same | the same | `c1box-dp8-dist-webkit.log` |

- Options at rest: 184.00×40.94 ("Any status", which has no count, so one row) and 184.00×67.88 ×4 (label over count). Group 192.00×352.44.
- Each option against its own selected box: 0.00 px for all 5.
- Every option is 16px and a column in all 6 states. The count of options on per state is 0, 1, 1, 1, 1, 1.
- Settle waits were 360-627 ms, which covers the 450 ms kick.
- Loads: Chromium 15.75-19.34; Playwright WebKit 8.05-9.51.

**The condition holds.** The T-3 and T-4 C1 cells under the battery (below) read the same tile at rest (`sel=none`) and selected (`sel=1`).

### 2.2 · The battery on D′ v8 (`dp8-src`, route `routes/D4-Dp8`)

Cells read Chromium · Playwright WebKit. Logs: `battery-src-chromium.log` (one `run.mjs`), `src-*-webkit.log`, `src-T-8-both.log`, `dist-*`, `distdev-*`. Chromium ran at load 9.97-20.93; Playwright WebKit hold A at 8.22-15.75.

| witness | D′ v8, migrated arm | pass 7 D′ (`D′c7`) | whole witness (library and unmigrated arms are HEAD's consumers, gating as in pass 7) |
|---|---|---|---|
| T-1 | **15/15 · 18/18** | 15/15 · 18/18 | 20/42 · 23/45, the same as pass 7 |
| T-2 `src` · `dist` · `dist-dev` | 52/52 each, both engines | the same | — |
| **T-3** | **43/43 · 43/43** | 40/43 · 40/43 | 45/85 · 45/85 (pass 7: 42/85 · 42/85) |
| T-4 | 24/24 · 24/24 | the same | 36/54 · 36/54 |
| T-5 `src` · `dist` | 38/38 · 38/38 each | the same | 87/116, 88/117 (`dist`), both engines |
| T-6 | **33/33 · 33/33** | the same | 64/88 · 64/88 |
| T-7 | 24/24 · 24/24 | the same | PASS 24/24 both |
| T-8 (one run, both engines) | 27/27 | 27/27 | 27/39 (library 0/12) |
| W-D | 8/8 · 8/8 | the same | — |
| W-A · W-B · W-C · W-E | library arms 5/9 · 9/25 · 0/8 · 1/3, both engines | the same | — |
| W-E `dist` · `dist-dev` | 1/6 · 1/6, both engines | the same | — |

**T-3, C1** (the cell pass 7 left open; carrier ≥ 3:1 against the 251 px² bar, selected option 184×67):

| mode | Chromium | Playwright WebKit |
|---|---|---|
| light | 933.50 px² (perimeter band 873.75) · fill 1.28:1 | 932.00 px² (871.00) |
| dark | 946.50 px² (883.50) · fill 1.30:1 | 942.25 px² (879.75) |
| PRT | 937.75 px² (877.25) · fill 1.28:1 | 934.50 px² (873.50), forced level-0 path |
| forced (info) | 11,821.75 px² | — |

The fill-alone lines are reported, not gating ("decoration, reported apart from the edge"). In pass 7 C1 read 0.00 px² as a pill.

**T-4 C1:** the ring is whole at 2.00 px on every side, `sel=none` and `sel=1`, light, dark and forced. **T-5 C1:** `radiogroup`/`radio`, 1 tab stop, ArrowRight, ArrowLeft, ArrowDown and ArrowUp each move and check. **T-7:** migrated 24/24.

### 2.3 · FACT, SHEET, CANON, ATTACK, CORNER, REPORT

Chromium (`chromium-reads`, load 15.75-19.34) · Playwright WebKit (hold B, admitted 03:00:11 at load 9.51; exit 03:05:17 at load 8.05).

| witness | D′ v8 | pass 7 D′ |
|---|---|---|
| FACT `src` · `src-dev` · `dist` | **80/80 each, both engines** | 80/80 each |
| FACT on the B-1 plants (`foreign`, **`var`**) | 76/80 · 76/80, both engines (`foreign-ancestor` ×4 fails on each) | 76/80 (`foreign` only) |
| SHEET `writers` · `wrap` | PASS (the route's rule 1×) · PASS `MIGRATION.md:94-116` | the same (H7) |
| SHEET on the plants `foreign`, `var`, `static`, `ts` | FAIL ×4 (H8) | `foreign` FAIL; `var`, `static`, `ts` passed (H7) |
| CANON clean · plants | 4/4 · `a` 3, `s` 3, `h` 3, `layer` 2, `foreign` 3, `unlayered` 3, `cq` 3; controls `lowlayer` 4, `cqoff` 4, both engines | the same |
| ATTACK `src-dev` · `dist` | 5/5 · 3/3, both engines | the same |
| CORNER `src` · `dist` | 5/5 · 5/5, both engines | the same |
| REPORT `name-ink` · `kick-spring` | PASS light and dark · PASS, ζ ≈ 0.50, both engines | the same |
| REPORT kick (B-5, reported) | FAIL 0.14 px · 0.14 px (want ≤ 0.05) | 0.17 · 0.12 |
| REPORT `mark` | UNMEASURED (Q-3 (a): no mark) | the same |
| H7's B-3 probe | the trigger's children as the reference's (`span flow-root @13.00,9.30`, `svg block @51.00,12.00`), light and dark, both engines (info) | the same |
| XSCRIPT self · pair with pass 7's D′ | 19/19 · 19/19 | 19/19 |

### 2.4 · L-3's witnesses

**Unit** (`logs/unit-plant-*.log`, through `unit.mjs`, `-t "L-3"`, loads 8.39-8.51):

| run | want | read |
|---|---|---|
| clean (both L-3 cases, inside the 67/67) | PASS | PASS |
| `l3-pin-gone` (the pin's `--selection-paint` line deleted) | FAIL | FAIL, both cases |
| `l3-reset-gone` (the group's `auto` deleted) | FAIL | FAIL, both cases |
| `l3-tint-loose` (the tint's query re-keyed to `--selection-tile: plated`) | FAIL | FAIL, the sheet case |
| `l3-library-writer` (`.card > .toggle-group { --selection-paint: bare }` in base.css) | FAIL | FAIL, the src-wide case |

**Paint** (`probes/l3-bare.mjs` on `routes/L3`). After one pointer commit, options `a` (rest) and `b` (selected) of each composition are read. The fill is the mean of each option's inner box with its content hidden.

| cell | light, Chromium | dark, Chromium | Playwright WebKit (light · dark) |
|---|---|---|---|
| ref (control): ref-pill and ref-tile | 1.20:1, 9999px · 1.29:1, 16px | 1.22:1 · 1.31:1 | PASS · PASS |
| **bare-pill** | **1.00:1**, both `rgba(0,0,0,0)`, corner **0px** | 1.00:1, 0px | 1.00:1 · 1.00:1, 0px |
| **bare-tile** | **1.01:1**, corner **16px** | 1.01:1, 16px | 1.01:1 · 1.00:1, 16px |
| item-write (refused) | 1.20:1, 9999px, fact `auto` | 1.22:1 | PASS · PASS |
| ancestor (no effect) | 1.20:1, 9999px, fact `auto` | 1.22:1 | PASS · PASS |
| state (bare-pill) | `b` checked, `on`, weight 600, 1 tab stop; ArrowRight → `c` checked | the same | PASS · PASS |

| build | Chromium | Playwright WebKit |
|---|---|---|
| `l3-src` (fixture) | **12/12** | **12/12** |
| `l3-dist` (the installed library) | 12/12 | 12/12 |
| `l3-plant-on-item-src` (the write moved to each option) | **8/12**: bare-pill and bare-tile FAIL, light and dark (fill 1.20-1.31:1, stadium, fact `auto`) | 8/12, the same cells |
| `l3-unpinned-src` (the library without the pin's paint line) | **10/12**: item-write FAILs, light and dark (fact `bare` on the option) | 10/12, the same cells |

The plant builds were restored and checked: `logs/plant-builds.log`, `git diff HEAD` equal before and after.

### 2.5 · Units, types, bundle

| read | result | log |
|---|---|---|
| vue-tsc (app · test) | **0 · 0** | `tsc.log` (02:04:01, load 10.59) |
| units, the two route files clean | **67/67** | `unit-plant-clean.log` |
| units, the whole suite (`vitest`, 2 workers via `unit.mjs`) | 2,356 ran: 2,353 passed, 1 skipped, **3 failed: HEAD's `gate:boot-graph` build-arm cases** (no `dist-demo` in a worktree), the same 3 as pass 7 | `unit-all.log` |
| bundle (unpacked, `npm pack --dry-run`) | **2,935,932 B**, 844 files; `dist` 2,542,357 B in 840 files; JS gzip-9 329,772 B | `bundle.log` |

The bundle is +16,875 over `.bundle-ratchet` (2,919,057) and +1,082 over pass 7's D′ (2,934,850). That +1,082 is L-3's rules and comments and the MIGRATION bullet. R-9 is met as stated, and the datum rebind (Q-14) stays the owner's at release, not this pass's.

---

## 3 · For the critic

- **What moved:** T-3 and E-2's one cell, T-3 `c1-migrated`, reads 43/43 in both engines under O-103c's ruling, and O-103c's condition measures 0.00 px of shift. On the fixed list these are the rows pass 7 left open. Scoring them is the critic's, on its own instrument.
- **L-1 folds into R-10, L-3 into R-2/FV-2, and the no-shift condition into T-3/T-4.** No row was added. The C1 box read is a pass-8 probe; the T-3 and T-4 C1 cells are the harness's own and read the same tile at rest and selected.
- **Open, with the cell that reads each:**
  - `bare` is not in FACT. The paint witness is the pass-8 probe `l3-bare` (12/12, plants 8/12 and 10/12, both engines). Folding it into FACT is a harness change under a new hash; this task fixed H8 to the B-1 read.
  - C1's declaration rides the route dir, not `sites.mjs` (§1.1). XSCRIPT-pair reads it as the declaration only (19/19).
- **Reported, unchanged:** the kick (B-5) at 0.14 px in both engines. R-5's dark selected ink, 1.56:1 on K2, with the perimeter carrying the state.
- **Scratch:** the worktree was removed with `git worktree remove --force`, and `git worktree list` no longer shows it. **The permission system refused the `rm -rf` of `.claude/worktrees/bl/D4/p8/build8/`** (42 MB: `out/`, the `base-fv6`/`base-dp7` snapshots, the draft patch). The seat did not work around the refusal. Nothing depends on that directory, and it is the orchestrator's or the owner's to delete, as with pass 7's two.

**Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell. E-4 is read against this seat's Playwright WebKit run of record, as O-103 rules.
