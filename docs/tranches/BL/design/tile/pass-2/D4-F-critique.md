# D4 · pass 2 · D4-F · critique: the anatomy declares the tile

| field | value |
|---|---|
| seat | adversarial critic for route D4-F. Did not author the block test, the spec, the prototype or the floor. Judges against REGISTRY §7.5's fixed checklist only; new defect classes go to §7 |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | checkout HEAD `2794898e` in a detached scratch worktree. `floor.patch` (sha1 `f1476eba`) applied first, then `D4-F-proto.patch` (sha1 `8b219cf6`); both `git apply --check` clean. `git diff --stat b67b056d 2794898e -- src package.json vite.config.ts` is empty, so this is the tree the prototype measured. A second worktree held HEAD+floor alone for the bundle datum. Both worktrees were removed at close |
| engines | Chromium 149.0.7827.55 and **Playwright WebKit 26.5**, headless, from `glass-ui/node_modules/playwright`. Playwright WebKit is not Safari. Every real-Safari cell: **UNMEASURED (owner's safaridriver checkbox)** |
| machine | shared. Load ran 37-172 across the seat (every log line carries it). Commit cells ran at a median frame of 8.3-8.4 ms (Chromium) and 10.0 ms (Playwright WebKit), so no commit verdict rests on janky frames and no re-read fired |
| records | all under `pass-2/D4-F-crit/`: `battery.sh`, `probe-chain.sh`; `probes/crit.mjs` (the D′ critic's probe, copied, with four parts added: `plants`, `br`, `late`, `a11yvalid`); `runs/crit-src/*.json` (the H2 battery), `runs/crit-dist/T-5-*.json`, `runs/proto-probe-*.json`; `logs/*.log`; `captures/*.png` (86). The prototype's own `D4-F-proto/probe.mjs` was re-run unchanged on this seat's builds |
| fence note | one `vitest run` in the worktree (the three lane suites) updated the shared cache file `node_modules/.vite/vitest/…/results.json` through the `node_modules` symlink into the checkout. It is a gitignored cache that every test run rewrites, but it is a write outside the task's named files, and it is recorded here. No other file in the checkout was touched outside `pass-2/D4-F-crit/` and this document |

Tallies: `node ../harness/tally.mjs D4-F-crit/runs/crit-src [--scenes] [--fails]`.

---

## 0 · Verdict

**ADVANCE, 68 % (23 of 34 checklist rows pass). Not converged: 11 open gaps.**

The prototype's numbers hold up. Every battery tally it reports reproduced here cell for cell, except one witness: Playwright WebKit T-3 could not be read in either of this seat's runs (§1). The commit kick, the perimeter and the tile corner each fail when planted, in both engines (76/76 plant cells, §4). The anatomy rule does what the block test said it would: the shape follows the slots and nothing else (Q-2, Q-3 and Q-5 green in both engines).

None of the open gaps needs a missing primitive, so this is not a BLOCK. It is not converged because:

1. **The pill's one-row law has a hole the row-lock cannot reach.** The row-lock acts on the item's direct children. A second row inside a label element (a `<br>`, or a block child of the label) paints as two lines inside the stadium. It is not cut, and no build names it. Cells: 0/8 on `src-dev` and 0/8 on `dist` for `<br>`, and 0/8 on each for an appended block (§3 CX-1).
2. **The unmigrated consumer breaks in production with no signal.** K2's stage is sliced by the 36 px plate on 8/8 items in both engines (R-1b, reproduced). The shipped K1 composition still reads 0 / 233 / 0 px² against 248 on its gating T-3 cell. Q-5 (d) is unbuilt, so the DEV names reach no consumer.
3. **Census and H-10 rows fail on the route's own migrations.** C1 reads 0 px² in every mode (Q-10 (b)). F1's hover reads 0.70 % in Chromium. FadingScroll's tab stop is one more stop on the K2 and V1 sites.
4. **Playwright WebKit T-3 hung in 2 of 2 runs here,** at load 55-127, which is F1-3's class. The recovery path the prototype added did not recover it (§1).
5. **The gestalt is not iOS-27 grade.** At `sm` the selected edge and the ring read alike, and a focused selected tile shows two concentric outlines (§5).

Rows are scored as the D′ critic scored them, so the two routes can be compared: on the migrated arm, the gating unmigrated arm (`armGates`), and library-arm scenes that are not consumer transcriptions.

---

## 1 · The battery, re-run

`logs/battery.log`, 12:08:39 → 12:57:52. Gating cells passed / measured.

| witness | Chromium: migrated · unmigrated · library | Playwright WebKit: migrated · unmigrated · library | prototype's reading | load at start (Chromium; WebKit) |
|---|---|---|---|---|
| T-1 | 12/12 · 3/6 · 5/27 (12 UNMEASURED) | 15/15 · 3/6 · 5/27 (12 UNMEASURED) | identical | 80.00; 95.77 |
| T-2 | library 22/22 | library 22/22 | identical | 120.35; 124.60 |
| T-3 | 15/18 · 12/48 · 2/39 | **HARNESS ERROR** in 2 of 2 runs (below) | Chromium identical; WebKit 15/18 on its re-run | 127.12; not printed (Chromium ended at 172.71), re-run 60.43 |
| T-4 | 16/16 · 3/24 · 8/20 | 16/16 · 3/24 · 8/20 | identical | 108.49; 93.03 |
| T-5 | 30/32 · 19/37 · 42/72 | 30/32 · 19/37 · 42/72 | identical | 102.32; 75.54 |
| T-5 on `dist` | 72/104, the same arms; `preset-input` PASS | the same | identical | 44.52 at chain end |
| T-6 | 25/27 · 32/40 · 27/45 | 27/27 · 32/40 · 27/45 | identical | 87.96; 47.25 |
| T-7 | 24/24 · 4/32 | 24/24 · 4/32 | identical | 72.53; 61.91 |
| T-8 | library 0/12, 13 UNMEASURED (both engines, one run) | | identical | 48.51 |

**Playwright WebKit T-3.**
- First run: `openPage preset-contents (light) stalled twice, REPRODUCED: page.goto: Timeout 60000ms exceeded` after 1,083 s. The process was stopped at the 18-minute mark with 4.9 s of CPU. Its verdict line had already printed (`logs/battery.log`).
- Re-run, alone under the lock: `T-3 HARNESS ERROR: no verdict within 1800 s (an engine hung)`, 13:39:50 → 14:09:51, load 60.43 → 63.06 (`logs/T-3-webkit-rerun.log`).

The hang reproduces at loads where the prototype's re-run finished (49). So it is not a load artefact. The block test traced it to the routed scene sequence, not to F's rule (`D4-F-block.md` F1-3, `floor+route-r1` with no reading rule). The prototype's stall re-open in `lib.mjs` turned an anonymous stall into a named one and did not recover it.

Outside the witness, the migrated arms' T-3 measure does read in Playwright WebKit. The prototype's probe re-run here gives 27/27 gating T-3 cells per engine: 5 sites plus 4 H-3 surgeries × light, dark and PRT (`logs/proto-probe-src.log`).

**The prototype's probe, re-run unchanged** (`logs/proto-probe-src.log`, load 43-63):
- 200/206 gating cells pass. By section: q2 18/18, q3 10/10, q4 60/66, q5 46/46, commit 26/26, hover 16/16, ink 12/12, double 4/4, contrast 8/8.
- The 6 FAILs are the row-lock cells on `specimen` and `specimen-verbatim` (a row cut by the plate 8/8) and `preset-verbatim` (the consumer's 16 px corner reads "other"), 3 per engine.
- One Playwright WebKit cell (H-3 `toneUnresolvable`, PRT) took about 26 minutes between log lines, 13:03 → 13:29. It then passed at 981.25 px², and the run finished. It is recorded as a stall, not a finding.

**Guard runs.** `logs/proto-probe-src-dev-guard.log` 20/22 and `logs/proto-probe-dist-guard.log` 20/22. The FAILs are `specimen` (8 clips named on `src-dev`, 0 on `dist`; the stage cut either way).

**Unit.** The toggle-group, roving-grid, tabs and radius-role-canon suites: 81 passed, 1 expected fail, 4 files (in the worktree, load 106).

**Bundle datum** (§7.3 item 10), measured as FLOOR.md measures it, both worktrees built here:

| build | files | bytes | JS gzip-9 | CSS bytes |
|---|---|---|---|---|
| HEAD+floor | 837 | 2,537,228 | 276,900 | 460,038 |
| HEAD+floor+F | 837 | 2,541,424 (+4,196) | 277,159 (+259) | 463,179 (+3,141) |

Reproduced to the byte. The DEV text ("clips its content") appears in 0 `dist` files.

---

## 2 · The checklist

### 2.1 · T-1..T-8 under H2, both engines: 4 of 8

| row | verdict | evidence, and the counterexample where it fails |
|---|---|---|
| T-1 | **PASS** | migrated 12/12 · 15/15 at fine, coarse and `--ui-scale 1.25`. Measurements: `preset-migrated` 204×70.59 → 116.98 at 16.00 px (÷h/2 0.45 → 0.27); coarse 204×81.83 at 16.00; `specimen-migrated` 205×98.16 at 16.00. **Not vacuous:** the `pill` plant fails T-1's own `judgeT1` in 8/8 cells (both scenes, fine and coarse, both engines; `logs/crit-plants.log`). Residue outside the route: `f1`/`v2` library arms are consumer Buttons and native buttons; `chipcell` is a retired binding; `wrap` is Q-1's A1 sub-choice |
| T-2 | **PASS** | 22/22 in both engines, `family-d-undeclared` included |
| T-3 | **FAIL** | (a) `c1-migrated`: 0.00 px² against a 224 px² bar in light, dark and PRT, Chromium battery and both engines in the probe (fill 1.16 / 1.22 / 1.00). (b) The gating shipped arm `preset-verbatim`: 0.00 / 233.00 / 0.00 px² against 248 (Chromium). (c) The Playwright WebKit witness gives no verdict (§1). The tile cells themselves are sound: 15/18 Chromium, 27/27 per engine on the probe, and not vacuous. With the perimeter planted off, `preset-migrated` falls to 34.75 px² (the check mark alone) and `specimen-migrated` to 0.00, in all three modes in both engines |
| T-4 | **PASS** | migrated 16/16 in both engines |
| T-5 | **FAIL** | `specimen-migrated` and `strip-migrated`: 2 tab stops between the sentinels, the second `div.fading-scroll`, in both engines. FadingScroll owns it (TF-6), but the cell is on the migrated arm and fails. The capture `specimen-migrated-light-fine-focus-chromium.png` shows Tab landing on the port, with a UA ring around the whole scroller. Everything else is green: the grid walk, the reorder, `sel=none`, the editable descendant on `dist` |
| T-6 | **FAIL** | `f1-migrated` hover light channel 0.70 % of pixels in Chromium, and its PRM arm (Playwright WebKit 27/27). This is the floor's 5 % hover rung on the witness's 10-level threshold, as both the prototype (§6.4) and the D′ critic found. The commit cells are green and not vacuous (§4) |
| T-7 | **PASS** | migrated 24/24 in both engines; F1's bound endpoint is a `#meta` word |
| T-8 | **FAIL** | 0/12 as printed. The witness reads library arms only, which under F are the unmigrated two-row slots, held as pills. Re-read on the route's arms it is T-1 (green) and T-3, which carries C1 and the unreadable WebKit witness. Real Safari: UNMEASURED (owner's safaridriver checkbox). The driver answered "You must enable 'Allow remote automation'" (`runs/crit-src/T-8-both.json`) |

### 2.2 · X-1..X-7: 7 of 7

| row | verdict | evidence |
|---|---|---|
| X-1 sibling state | **PASS** | the H-3 `sibling` surgery on `preset-migrated`: 553.25-557.25 px² against 274 in light, dark and PRT, both engines (`logs/proto-probe-src.log`). F1's own sibling state is content (`#meta` "bound") |
| X-2 selected ink reaches the media | **PASS** | the media stroke on K2, V1 and F1 equals the edge when on, against `rgb(112 89 66)` / `rgb(124 102 80)` off; 0 consumer `[data-state]` rules in the migrated arms; 12/12 across both engines |
| X-3 no slot re-render | **PASS** | `logs/crit-x3.log` 4/4. `specimen-migrated` keeps `content-visibility: auto`. A direct write into a tile's readout survives a programmatic and a pointer commit, with 0 mutations under the slot, in both engines. The `data-commit` stamp lands on the library's button only |
| X-4 multi-select arm has the same anatomy | **PASS** | `v2-migrated` (`type="multiple"`): cell 4/4 at 452×106.34; T-1, T-3 (1781.75 px² against 558) and T-7 pass; the paired witness passes |
| X-5 interactive descendants named in DEV | **PASS** | `logs/crit-desc-src-dev.log` 2/2: `preset-input` on `src-dev`, 1 "interactive descendant" error per engine (plus 4 clip names). In production the floor's editable-descendant rule keeps ArrowRight in the `<input>` (T-5 `dist`) |
| X-6 a deselectable single | **PASS** | `logs/crit-x6.log` 2/2: `sel=none` checks 0 of 4 with perimeter 0, Tab lands on item 0, `select(2)` checks exactly one, and back to none clears it, in both engines |
| X-7 a tone reaches the edge, tint and ink | **PASS** (ruled) | the edge moves (for example `oklch(0.216 …)` → `oklch(0.42 0.211 27.76)` for `rgb(210 30 30)`), and the painted tint moves 3.33-21.50 levels in every cell (`logs/crit-tone.log`). The media ink follows the edge under `oklch(0.62 0.2 300)` (`logs/proto-probe-src.log` ink). The probe as written also requires the item's **label** ink to move, and on that criterion it reads 0/24: F holds the label at `--foreground` for legibility and offers `--selection-ink` for a consumer that wants more. The census sites' tone reaches strokes and glyphs, which F carries, so the row passes. The agglomeration may re-score it strictly |

### 2.3 · Floor items 1-5 under the route: 5 of 5

| row | verdict | evidence |
|---|---|---|
| 1 SF-8 fix | **PASS** | Playwright WebKit T-6 and T-7 ran every ToggleGroupItem pointer segment; hover light 77.52-90.15 % |
| 2 TF-2 register | **PASS** | the switch is on in every tile; the planted removal fails (§4); dormant on the pill per Q-10 (b) |
| 3 TF-3 walk, reorder, unit | **PASS** | the route's row-clustering change keeps every T-5 arrow, reorder and `sel=none` cell green and walks the mixed 2×2 grid 16/16 in both engines; `roving-grid.test.ts` green |
| 4 TF-4..TF-8 | **PASS** | built and unbroken. The contrast-more arm still applies to non-tile selected elements in both engines under the route's `:not(:has())` exemption: `single` pill and `tabs` `[aria-checked]` at 2 px, the tile at 1 px (`logs/crit-a11yvalid.log` 6/6) |
| 5 Chip `cell` retired | **PASS** | `chipcell` reads 9999 px stadiums |

### 2.4 · §7.3 for D4-F: questions 2-5 and D′ items 3, 4, 6, 9, 10: 7 of 9

| # | verdict | evidence |
|---|---|---|
| Q-2 the mixed grid | **PASS** | 18/18 across both engines. K1 with `#meta` removed from items 1 and 3: cell 4/4 at 70.59 px. The mixed 2×2 walk matches 16/16. The consumer-centred row: 1D→3, 3U→1, 0D→2, 2U→0. `single`, `vertical`, `pill-icon`, `pill-badge` and `family-d-undeclared` stay pills. The live flip goes 36 → 66.3 px and back |
| Q-3 the paired witness | **PASS** | 10/10. On five migrated sites, removing the rows turns every cell into a pill at h/2 on its rung, with group and item attributes byte-identical. Not vacuous: the shape changes with nothing but the anatomy |
| Q-4 the unmigrated consumer | **FAIL** | (a) R-1b: `specimen` and `specimen-verbatim` are one row, but the 52 px stage is cut by the 36 px plate on 8/8 items in both engines. The frame (`D4-F-proto/glance/chromium-specimen-light.png`, reproduced in this run's q4) shows sliced curves and names truncated to "ease-". At HEAD the same markup is a legible lozenge. (b) The shipped K1 (`preset-verbatim`, gating) carries no selected state in light or PRT: 0.00 px² against 248, because the pill's ink and weight co-carriers are pinned by the consumer's own type. (c) Production names neither: 0 errors on `dist`. K1 itself is a tidy one-row pill. The answer is measured but is not a pass |
| Q-5 the comfort axis | **PASS** | 46/46: 16.00 px past the rung on five migrated sites at fine, coarse and `--ui-scale 1.25` in both engines; pills at h/2 on both axes |
| D′ 3 commit arm (H-4) | **PASS** | 26/26 commit cells: peak 1.03 on keyboard and programmatic, 1.04 on pointer, a bounce under the settle, Tab entry 0.00, reduced motion 0.0000. The double commit kicks twice on one item (1.028 at 83 and 391 ms). **Not vacuous:** with the kick planted off, keyboard, programmatic and pointer fail in both engines on both scenes ("peak 1.00 … amplitude < 0.015, no bounce"; pointer 1.01 flat), so the pointer pass is the kick and not the press release |
| D′ 4 hover on the plate | **PASS** | the selected tile against a hovered sibling: 881.75-981.00 px² against 274 (preset) and 567.00-568.00 against 303 (specimen), 8/8 per engine. The hover is on the plate layer; the selection is on the perimeter and the mark |
| D′ 6 X-2 | **PASS** | as X-2 |
| D′ 9 the refusal per Q-5 (b) + (d), production on `dist` | **FAIL** | (a) CX-1 below: a second row inside a label element paints as two lines inside the pill on `src-dev` and on `dist`, both engines, named 0 times. (b) The DEV name reads once, one frame after mount: a row that arrives later is never named (`late` 0/4 per flavour). (c) K2's stage is cut and production says nothing (R-1b). (d) Q-5 (d) is unbuilt, so the names never reach a consumer's dev server (`development conditions 0`, `logs/build.log`). What holds: content taller than the rung is clamped, the row-lock holds K1 to one row, and the interactive descendant is refused structurally on `dist` |
| D′ 10 bundle datum | **PASS** | +4,196 B, +259 B JS gzip-9, +3,141 B CSS, reproduced to the byte (§1); stated for the owner's row |

### 2.5 · "Every route": 0 of 4, and the gestalt: 0 of 1

| row | verdict | evidence |
|---|---|---|
| every cell in both engines, unmigrated beside migrated | **FAIL** | Playwright WebKit T-3 gave no verdict in 2 of 2 runs here (§1). Every other witness reproduced in both engines with both arms tallied. The cause is the harness's routed-sequence stall (F1-3), not F's CSS, but the row is about reading every cell, and one witness could not be read |
| H-10 scenes | **FAIL** | C1 fails T-3 0/3 on the route's own migration; F1 fails the hover cell in Chromium. V2, the sibling state, the keyed reorder, the deselectable single and the interactive descendant in production pass |
| MIGRATION rows, with an E-11 guard for the silent ones | **FAIL** | The rows are written and accurate about the slots. Two claims fail. The row says "A pill is one rung tall and lays its content out in one row whatever classes it carries", which CX-1 falsifies. The silent change (a two-row default slot becomes a clipped one-row pill) is named only in DEV, at mount, and is absent from `dist` |
| real Safari cells | **not passing** | UNMEASURED (owner's safaridriver checkbox) in every cell |
| gestalt read | **FAIL** | §5 |

**23 of 34** (4 + 7 + 5 + 7 + 0 + 0).

---

## 3 · Counterexamples

**CX-1 · a second row inside a label element.** The row-lock (`.toggle-group__item:not(…) { flex-direction: row !important; flex-wrap: nowrap !important }`) governs the item's children. The floor's `white-space: nowrap` does not suppress a `<br>`, and neither rule reaches a block box inside the label. Two lines at the pill's `line-height: 1` are about 31-35 px tall and fit under both rungs, so the `max-block-size` clamp never engages, the label's own `overflow: hidden` cuts nothing, and the DEV observer's tests never trip.

Measured:
- `label.innerHTML = "Smooth<br>0.5 s"` on `single`, `pill-badge`, `family-d-undeclared` and `vertical`: label 30.94-35.16 px, 2 rows painted inside a 36 or 40 px stadium at `9999px`, `[ToggleGroupItem]` errors 0. Both engines, 8/8 on `src-dev` and 8/8 on `dist` (`logs/crit-br-*.log`; `captures/br-pill-badge-chromium.png` shows "Smooth / 0.5 s" stacked in a pill beside its Badge).
- The D′ critic's `tworow` (a `div` appended inside the label): the row at 18.00-35.30 px of the item, hit-test inside, errors 0, 0/8 on each flavour (`logs/crit-tworow-*.log`).

This is the D′ critique's CX-1 class, and F inherits it: the row-lock closed the consumer's `flex-col` on the item, not a second line inside the label.

**CX-2 · the shipped K2 upgrades into a broken control.** The unmigrated `specimen-verbatim` on F is 207×36. The stage is cut on 8/8 items, the names are ellipsized to "ease-", and nothing is printed on `dist`. At HEAD it is a legible (if lozenge-shaped) tile. E-6 puts the migration in keyframes.js's tranche. E-2 asks that a primary that does not work fails loud, and this one fails silently in production. The prototype carries it as R-1b.

**CX-3 · C1.** A one-line radio row is the route's own migration target, and it fails the selected bar in every mode in both engines. Either Q-10 moves to (a), or the route has no passing answer for a one-line one-of-N row. The owner's Q-10 decides it.

**CX-4 · the routed WebKit T-3 cannot be read.** 2 of 2 runs, at load 55-127, stalled at `preset-contents` (first run, named) or hung past 1,800 s (re-run). The H2 owner's F1-3 stays open with this evidence.

---

## 4 · Vacuity checks (`logs/crit-plants.log`, 76/76, both engines)

| check | plant | result |
|---|---|---|
| T-6 commit bar | `.toggle-group__item[data-commit] { animation: none }` | keyboard, programmatic and pointer commits on `preset-migrated` and `specimen-migrated` all FAIL (peak 1.00, or 1.01 flat on pointer); the clean read beside each PASSES |
| T-3 on the tile | the perimeter `::before` at opacity 0 | FAIL in light, dark and PRT on both scenes (34.75 / 35.50 px² on preset, the mark alone; 0.00 on specimen) |
| T-3, the mark's share | perimeter and mark both off | FAIL in every cell. The check mark is not a T-3 carrier by area; it carries the "without colour" read only |
| T-1 on the tile | the tile corner as `9999px` | FAIL fine and coarse on both scenes |
| Q-3 paired witness | (the pair itself) | the attributes are byte-identical while the corner flips 16 ↔ 9999 px, so the witness can only pass when the anatomy decides the shape |
| contrast exemption | the arm on non-tiles (`a11yvalid`) | the pill and SegmentedTabs radio keep 2 px under contrast-more; the tile keeps 1 px. The `:not(:has())` list did not invalidate the rule in either engine |

No vacuous green was found on the migrated arms. The prototype's `--plant a11y` (the exemption removed) was not re-run here.

---

## 5 · Gestalt read (light and dark, fine and coarse, both engines)

Inputs: the prototype's 36 frames and this seat's 64 (`captures/<scene>-<mode>-<fine|coarse>[-focus]-<engine>.png`), plus the `br`/`late`/`tworow` frames.

| question | answer |
|---|---|
| does the tile read as a card-like option | **Yes.** K1 is four 16 px cards (204×70.59; 204×81.83 coarse), K2 a gallery of cards, V1 rounded squares at 16 px (40×58.8). No lozenge appears in any cell, fine or coarse |
| is the selection unmistakable without colour | **Yes at `md`:** a 2 px edge, a darker plate and the check (`preset-migrated-light-coarse-focus-chromium.png`). **Weak at `sm`:** K2 and V1 carry no mark (R-3), and the edge is the only shape cue. **No** on C1's pill row (0 px²) |
| is it apart from the ring | **No.** A focused selected tile shows the grey ring 2 px outside the dark edge, two concentric outlines (`preset-migrated-light-coarse-focus-chromium.png`). At `sm` in dark the selected edge is a light 2 px outline (`strip-migrated-dark-coarse-chromium.png`), the same register as a focus ring, and the check that tells them apart at `md` is absent. Pass 1's CX-11 recurs. Also, K2's selected edge paints 1 css px, not 2, under the consumer's `content-visibility: auto` (`logs/crit-clip.log`: 2 device px of edge on specimen against 4 on preset, both engines) |
| is it uncluttered | **Not shown.** Every tile is its own plate inside the host plate, four slabs in a slab on K1. Q-2's pass-2 default was to measure plated against flush and build flush until the owner's glance; the route built plated only and measured neither. On F1 the check overlaps the n=2 glyph, and the `#meta` word sits start-aligned under a centred label (`f1-migrated-light-fine-chromium.png`) |
| is it iOS-27 grade | **No.** The commit is a 2.8 % pop with a bounce over 450 ms, a perimeter fade and a check that springs from 0.4. Nothing travels and nothing floods. Against O-87 the route adds no lighting layer, glow or bevel, which passes that bar, and the kick carries state. The light-mode hover on F1 sits at the edge of perception (0.70 % in Chromium) |

---

## 6 · Open gaps (the checklist rows that do not pass)

1. **T-3:** `c1-migrated` 0.00 px² against 224 in every mode, both engines; `preset-verbatim` gating 0.00 / 233.00 / 0.00 against 248; Playwright WebKit witness unreadable.
2. **T-5:** FadingScroll's own tab stop on `specimen-migrated` and `strip-migrated`.
3. **T-6:** `f1-migrated` hover light 0.70 % in Chromium, and its PRM arm.
4. **T-8:** library arms only (0/12); Safari UNMEASURED.
5. **Q-4:** the unmigrated K2 stage cut 8/8 (R-1b), the shipped K1 carrying no selection, both silent in production.
6. **D′ 9:** CX-1 (a second row inside a label is neither cut nor named, on `src-dev` and `dist`); the DEV name reads at mount only; Q-5 (d) unbuilt.
7. **Every cell in both engines:** Playwright WebKit T-3 hung in 2 of 2 runs (CX-4).
8. **H-10 scenes:** C1 and F1.
9. **MIGRATION / E-11:** the "one row whatever classes" claim is false under CX-1; the silent change is named in DEV only.
10. **Real Safari:** UNMEASURED (owner's safaridriver checkbox).
11. **Gestalt:** the selected edge reads as a ring (doubled when focused, alike at `sm`); Q-2 (b) unbuilt; the commit is not iOS-27 grade.

Who owes each:
- **The owner:** gaps 1 (C1 under Q-10), 10, and part of 11 (Q-2, Q-3).
- **Another mechanism's owner:** gap 2 (FadingScroll), gap 3 (the floor's hover rung), gap 7 (the H2 harness).
- **The route:** gaps 5, 6, 9 and the `sm` half of 11.

A label-level one-row rule (for example, line breaks and block children inside a pill's label laid out inline, or a `1lh` block clamp per label element) would close CX-1 with no new primitive. The `sm` mark is one selector away.

---

## 7 · For the next pass's checklist (not scored here)

- `content-visibility: auto` on a consumer tile halves the perimeter to 1 css px (paint containment cuts the half that sits outside the padding box), in both engines; T-3 still passes. The D′ critic found the same.
- The tile reading is spelled in four CSS places plus the DEV script (P-3, the prototype's R-10). Only the tile rule's two forms are pinned by a unit; the row-lock, the mark and `accessibility.css` can drift from it.
- The group-level `:has(.toggle-group__media, .toggle-group__meta)` is a descendant match. Any `.toggle-group__item` under an ancestor group holding a tile becomes a tile. No real composition nests one today, but it is untested.
- The kick fires on a programmatic commit. The library's own motion law pins `--motion-weight: 0` on calm observers (`:where([data-reorder], [data-autoplay])`, `scheme-motion.css`). A programmatic commit under such an ancestor would not kick, and H-4 requires it to. The two laws have not been reconciled.
- The DEV name fires once, one frame after mount (`ToggleGroupItem.vue`). Content that loads later is never checked.
- Playwright WebKit stalls in the routed sequence also reached the prototype's probe (one cell held about 26 minutes before passing).
- In Playwright WebKit focus captures, Tab does not reach the tile on `specimen-migrated` (the FadingScroll port takes it in Chromium), so no capture shows the ring on a K2 tile.

**Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell.
