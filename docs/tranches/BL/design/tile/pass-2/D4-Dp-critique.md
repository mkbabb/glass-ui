# D4 · pass 2 · D4-D′ · critique: the declared cell, on the floor register

| field | value |
|---|---|
| seat | adversarial critic for route D4-D′. Did not author the spec, the prototype or the floor. Judges against REGISTRY §7.5's fixed checklist only |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | the checkout's HEAD `f14bd7f7` in a clean detached worktree; `floor.patch` (sha1 `f1476eba…`) applied first, then `D4-Dp-proto.patch` (sha1 `42382258…`); both `git apply --check` clean. `git diff --stat a1732a48 f14bd7f7 -- src package.json` is empty, so this is the tree the prototype measured |
| engines | Chromium 149.0.7827.55 and **Playwright WebKit 26.5**, headless, from `glass-ui/node_modules/playwright`. Playwright WebKit is not Safari. Every real-Safari cell: **UNMEASURED (owner's safaridriver checkbox)** |
| machine | shared and heavily loaded. The battery ran at load 17-70; the later probes at 40-640. Every log line carries its load. No T-6 cell failed on janky frames (Chromium median 8.30 ms, Playwright WebKit 16-17 ms) and no re-read fired. The probes run above load 300 are geometry, computed style and console reads, not timings |
| records (every number below cites one) | `D4-Dp-crit/runs/crit-src/*.json` (the H2 battery, both engines), `runs/crit-dist/W-E-chromium.json`, `runs/plant-pop0/T-6-*.json`; `D4-Dp-crit/logs/*.log`; `D4-Dp-crit/probes/crit.mjs` and `plant-corner.mjs` (this seat's probes); `D4-Dp-crit/captures/*.png` (68). The prototype's own probes (`D4-Dp-proto/probes/states.mjs`, `refusal.mjs`) were re-run unchanged on this seat's builds |
| not run | the planted T-3 (`plant-perim0`) and the planted T-1 / W-D (`plant-stadium`, `plant-sm`) witness runs were aborted when the machine passed load 350 (one T-3 run was 35 min in). Their corners were read directly instead (`logs/plant-corner.log`). The Playwright WebKit half of the pop plant finished under load 80 → 425 and is reported, not relied on |

Tallies: `node ../harness/tally.mjs D4-Dp-crit/runs/crit-src [--scenes] [--fails]`.

---

## 0 · Verdict

**ADVANCE, 66 % (23 of 35 checklist rows pass). Not converged: 12 open gaps.**

The prototype's numbers are honest. Every tally it reports reproduced here cell for cell, and its commit arm, corner and separation cells each fail a plant. None of the open gaps needs a missing primitive, which is why this is not a BLOCK. It is not converged because:

1. **A two-row pill is still painted, uncut and unnamed** when its second row fits inside the rung. The prototype's claim "the pill holds one row, structurally" holds only for content taller than the rung (§3 CX-1).
2. **Three census rows fail on the migrated arms**: the tone does not reach the tint (X-7), no DEV name exists for an interactive descendant (X-5), and C1's selected state is 22.50 px² against a 224 px² bar (T-3).
3. **No DEV name reaches a consumer.** Both guards are absent from `dist`, and Q-5 (d) is unbuilt, so a consumer who upgrades without migrating gets K1 sheared to 40 px with no signal anywhere (§3 CX-2).
4. **The gestalt is not iOS-27 grade** and the selected edge reads as a second focus ring (§5).

Rows are scored on the cells the route owns: the migrated arm, the gating unmigrated arm (`armGates`), and library-arm scenes that are not consumer transcriptions. The witness verdicts as the harness prints them are in §1, so the agglomeration can re-score strictly.

---

## 1 · The battery, re-run

`logs/battery-crit-src.log`, 12:39:00 → 13:07:32, load 20.91 at start, 69.02 at end. Gating cells passed / measured.

| witness | Chromium: migrated · unmigrated · library | Playwright WebKit: migrated · unmigrated · library | prototype's reading | load at start (Chromium; WebKit) |
|---|---|---|---|---|
| T-1 | 12/12 · 3/6 · 5/27 (12 UNMEASURED) | 15/15 · 3/6 · 5/27 (12 UNMEASURED) | identical | 20.91; 19.84 |
| T-2 | library 22/22 | library 22/22 | identical | 17.61; 16.99 |
| T-3 | 15/18 · 12/48 · 2/39 | 15/18 · 9/48 · 2/39 | identical | 16.99; 19.68 |
| T-4 | 16/16 · 3/24 · 8/20 | 16/16 · 3/24 · 8/20 | identical | 31.59; 23.25 |
| T-5 | 30/32 · 19/37 · 42/72 | 30/32 · 19/37 · 42/72 | identical | 27.33; 57.32 |
| T-6 | 25/27 · 32/40 · 27/45 | 27/27 · 32/40 · 27/45 | identical | 31.23; 25.87 |
| T-7 | 24/24 · 4/32 | 24/24 · 4/32 | identical | 70.32; 60.43 |
| T-8 | library 0/12, 13 UNMEASURED (both engines, one run) | | identical | 43.45 |
| W-D | 8/8 | 8/8 | identical | 60.86; 64.72 |
| W-A · W-B · W-C · W-E | 5/9 · 9/25 · 0/8 · 0/3 (`dist` 0/6) | 5/9 · 9/25 · 0/8 · 0/3 | identical | 39-66 |

The prototype's probes, re-run: `states` 108/108 (`logs/states.log`); `hover` 12/18 and 7/12, every miss a PRT cell or F1 light in Chromium (`logs/hover.log`, `logs/hover-f1-v2.log`); `a11y` 9/9 (`logs/a11y.log`); `ink` K2 2.66:1 light and 1.56:1 dark, V1 3.23 / 2.06 (`logs/ink.log`); refusal rows on `dist` and `src-dev` as reported (`logs/refusal-*.log`); corner guard 24/24 on `src-dev`, 0 named on `dist` (`logs/corner-*.log`); unpacked package 2,926,750 B against the datum 2,919,057 (`logs/bundle-datum.log`). Unit: canon, ToggleGroup and roving-grid suites 65 passed, 1 expected fail (`logs/unit-canon-clean.log`).

---

## 2 · The checklist

### 2.1 · T-1..T-8 under H2, both engines: 4 of 8

| row | verdict | evidence, and the counterexample where it fails |
|---|---|---|
| T-1 | **PASS** | migrated 12/12 · 15/15 at fine, coarse and `--ui-scale 1.25`: 16.00 px flat on preset 204×63.58, specimen 205×86.16, strip 44×44 (54×54 coarse), F1, V2. Not vacuous: the stadium plant reads 31.79 and 43.08 px and a planted sm-arm corner reads 12.00 px against the 16 px bound (`logs/plant-corner.log`). Residue outside the route: `chipcell` 0/12 (retired binding), `f1` and `v2` library arms (consumer Buttons and native buttons), `wrap` Chip pill 38.11 → 55.00 px and Button coarse 30 px (Q-1's A1 sub-choice) |
| T-2 | **PASS** | 22/22 in both, `family-d-undeclared` 4/4 |
| T-3 | **FAIL** | `c1-migrated`: 22.50 px² of ≥ 3:1 against a 224 px² bar in light, dark and PRT, both engines (fill 1.17 / 1.23 / 1.01). The route migrates C1 to a pill, and Q-10 (b) keeps the perimeter off pills. Second counterexample: the gating shipped arm `preset-verbatim` reads 0.00 / 233.00 / 0.00 px² against 248 (Chromium) because the shipped K1 is undeclared. The tile cells themselves are sound: 15/15 on the five declared sites, and the same markup undeclared reads 0.00 px² |
| T-4 | **PASS** | migrated 16/16 in both, 2.00 px on every side in light and dark |
| T-5 | **FAIL** | `specimen-migrated` and `strip-migrated`: 2 tab stops between the sentinels, the second `div.fading-scroll`, both engines. Owned by FadingScroll (TF-6), but the cell is on the migrated arm and fails. Everything else is green: `radiogroup` / `radio`, one stop, all four arrows on the K1 grid (0 → 2 on Down, 2 → 0 on Up) |
| T-6 | **FAIL** | `f1-migrated` hover light channel 0.52 % of pixels in Chromium, and its PRM arm (Playwright WebKit 27/27). Cause isolated here (`logs/f1-hover-cause.log`): the tile matches `:hover` and its plate layer changes exactly as K1's does (warm ink at 0.10 → foreground at 0.15). The floor's hover rung is a 5 % ink step that sits on the instrument's 10-level threshold, so it passes or fails by ground and engine (specimen light: 5.30 % in Chromium, 85.12 % in Playwright WebKit). The commit bar is green and not vacuous (§4) |
| T-7 | **PASS** | migrated 24/24 in both engines |
| T-8 | **FAIL** | 0/12 as printed: the witness reads library arms only and cannot see a declared route (the prototype's HF-3). Re-read on the route's own arms it is T-1 and T-3 per engine, and T-3 carries the C1 miss in both. Real Safari: UNMEASURED (owner's safaridriver checkbox) |

### 2.2 · X-1..X-7: 5 of 7

| row | verdict | evidence |
|---|---|---|
| X-1 sibling state | **PASS** | `states` "sibling" 18/18 |
| X-2 selected ink reaches the media | **PASS** | `--selection-ink` on K2's and V1's stroke in one stateless rule. Dark K2 is 1.56:1, decoration only |
| X-3 state paint never re-renders the slot | **PASS** | `logs/x3.log` 4/4: K2 migrated keeps `content-visibility: auto`; a direct write into a tile's readout survives a programmatic and a pointer commit; 0 mutations under the slot, both engines |
| X-4 the multi-select arm has the same anatomy | **PASS** | V2 on `type="multiple" shape="cell"`: T-1 3/3, T-3 3/3, `group` of `aria-pressed` buttons, one stop |
| X-5 interactive descendants refused loudly in DEV | **FAIL** | `logs/x5-desc-src-dev.log`: on `preset-input` under `src-dev`, 4 console errors, 0 of them about the `<input>` (all four are the row name), both engines. The DEV block in `ToggleGroupItem.vue` has two branches, rows and corner, and none for a descendant. Production keeps the floor's structural walk |
| X-6 a deselectable single | **PASS** | `logs/x6.log` 2/2: `sel=none` on migrated K1 checks 0 of 4, paints no perimeter, Tab lands on item 0, a programmatic commit checks exactly one, and back to none clears it |
| X-7 a tone reaches the edge, tint and ink | **FAIL** | `logs/x7-tone.log` 0/24. With `--selection-tone: rgb(210 30 30)` on the group the edge and ink move (to `oklch(0.42 0.211 27.76)` in light) and the tint does not: computed fill `oklab(0.216 … / 0.12)` unchanged, painted interior 184.2, 179.5, 172.5 before and after, Δ 0.00 levels. The same on K2 and V1, light and dark, both engines. The on-state fill mixes `--foreground`, never the tone (`toggle-group/styles.css`, the `[data-state="on"]` rule) |

### 2.3 · Floor items 1-5: 5 of 5

| row | verdict | evidence |
|---|---|---|
| 1 SF-8 fix | **PASS** | Playwright WebKit T-6 and T-7 ran every pointer segment; no hang in any run |
| 2 TF-2 register | **PASS** | 108/108 with the switch on; dormant on the pill per Q-10 (b) |
| 3 TF-3 walk, reorder, unit | **PASS** | T-5 arrow cells green on every migrated grid; `roving-grid.test.ts` green |
| 4 TF-4..TF-8 | **PASS** | each is built and reads as specified. Two weaknesses belong to other rows: the hover's amplitude (T-6) and the two-row pill inside the rung (item 9) |
| 5 Chip `cell` retired | **PASS** | `chipcell` reads 9999 px stadiums, as the floor recorded |

### 2.4 · §7.3 D′ items 1-10: 8 of 10

| # | verdict | evidence |
|---|---|---|
| 1 CX-1 | **PASS** | invalid group: preset 820.00 px² light and 519.00 dark against 267 (Chromium), 18/18 invalid cells across both engines |
| 2 H-2's pair | **PASS** | W-D 8/8 · 8/8, T-2 22/22 · 22/22 |
| 3 commit arm | **PASS** | keyboard, programmatic and pointer on preset, specimen, F1 and strip, both engines: peak 1.03-1.05 at 179-218 ms, trough 0.99, Tab entry 0.00. Not vacuous (§4) |
| 4 hover on the plate | **PASS** | selected against a hovered sibling clears the bar in 30/30 cells, 1.87-3.57×. The hover is on the plate layer, not the edge |
| 5 CX-5 | **PASS** | the tile rule carries no group layout |
| 6 X-2 | **PASS** | as X-2 |
| 7 C-4 | **PASS** | 16 px on 44×44 is 0.73 of h/2 and reads as a rounded square in the captures; the glance is Q-1's |
| 8 canon test on the parsed selector | **FAIL** | the pass-1 evasion is closed (plant A fails). Two evasions of the same class pass 45/45 (`logs/unit-canon-plants.log`): plant S, `.toggle-group[data-shape="cell"][data-size="sm"] .toggle-group__item { border-radius: var(--radius-panel) }`, and plant H, `.toggle-group__item:has(> * + *) { border-radius: 12px }`. The test mounts one md item with no children, so a selector that needs a size, an orientation or a child reaches neither fixture, and a selector happy-dom cannot parse is caught and counted as no reach. Paint does see plant S (12.00 px against 16, `logs/plant-corner.log`), so the hole is the unit's, not the battery's |
| 9 DEV refusal per Q-5, production arm on `dist` | **FAIL** | three holes. (a) CX-1 below: a second row inside the rung is neither cut nor named, 8/8 cells on `src-dev` and 4/4 on `dist`. (b) No name for an interactive descendant (X-5). (c) Q-5's default is (b) plus (d); (d) is unbuilt, so both names exist only on a library `src` alias: 0 errors on `dist` for shipped K1 and K2 and for a planted 6 px tile corner. What does hold: rows taller than the rung are held at 40.00 and 36.00 px on `dist`, and the row name fires 4 and 8 times at mount on `src-dev` with 0 false positives on the controls it was aimed at |
| 10 bundle datum | **PASS** | stated as ruled row R-1; 2,926,750 B unpacked reproduced, 7,693 B over the datum |

### 2.5 · "Every route": 1 of 4, and the gestalt: 0 of 1

| row | verdict | evidence |
|---|---|---|
| every cell in both engines, unmigrated beside migrated | **PASS** | §1 |
| H-10 scenes | **FAIL** | C1 fails T-3 0/3 on the route's own migration; F1 fails the hover cell in Chromium. V2, the sibling state and the interactive descendant in production pass |
| MIGRATION rows, with an E-11 guard for the silent ones | **FAIL** | the rows are written. The guards are DEV-only: a consumer corner on a tile is named 0 times on `dist` and is not refused in paint either, so for that binding neither half of Q-5's default holds. The corner guard also reads at mount only |
| real Safari cells | **not passing** | UNMEASURED (owner's safaridriver checkbox) in every cell |
| gestalt read | **FAIL** | §5 |

**23 of 35.**

---

## 3 · Counterexamples

**CX-1 · the two-row pill inside the rung.** On an undeclared group, append one line to an item's label the way W-E and `refusal.mjs` do. The item stays 40.00 px tall with a 9999 px corner; the new row sits at 20.00-33.45 px of the item, inside the plate, painted; `[ToggleGroupItem]` errors 0. `family-d-undeclared`, `single` (36 px rung, row at 18.00-31.45), `vertical`, `pill-badge`; Chromium and Playwright WebKit on `src-dev`, Chromium on `dist` (`logs/tworow-*.log`; `captures/tworow-family-d-undeclared-chromium.png` shows "0.5 s · ζ 1" over "one more line" inside a stadium). Two lines at the pill's `line-height: 1` are about 31 px and fit under both rungs, so the clamp never engages and the DEV observer's two tests (a child past the box, `scrollHeight > clientHeight`) never trip. The prototype's own refusal log shows it as "appended row cut false … console errors 0" on six scenes and reads it as a pass. This is pass 1's D-crit gap 10 (C-2), still open.

**CX-2 · the unmigrated consumer.** The shipped K1 composition under D′ on `dist`: 208×40, names and readouts sheared mid-glyph (`D4-Dp-proto/captures/preset-verbatim-light-chromium.png`), T-3 0.00 px² in light and PRT, 0 console errors in both engines. At HEAD the same composition is legible. A consumer who upgrades without migrating gets an unreadable control and no signal in production or in their own dev server. The prototype names this R-1 and R-7; it is the cost of deciding the tile by declaration, and Q-5 (d) is the only thing that softens it.

**CX-3 · C1.** A one-line option row with a check mark is the route's own migration target, and it fails the selected bar in every mode in both engines. Either Q-10 moves to (a), or the route has no passing answer for a one-line one-of-N row.

---

## 4 · Vacuity checks

| check | plant | result |
|---|---|---|
| T-6 commit bar | `--selection-pop: 0` (`runs/plant-pop0`) | Chromium migrated 25/27 → 16/27 at a median frame of 8.30 ms. All twelve commit cells fail: "pop peak 1.00 … amplitude < 0.015, no bounce", and the pointer commit reads 1.01 flat, so the clean pointer pass is the pop and not the press release. Playwright WebKit 27/27 → 18/27, reported only (load 80 → 425) |
| T-3 on the tile | the same markup undeclared (the battery's own library arms) | 0.00 px² against 244 where the migrated arm reads 3/3 |
| T-1 on the tile | the tile rule on `--radius-pill`; the sm arm on `--radius-panel` | direct reads 31.79 / 43.08 px and 12.00 px against the 16 px bound. The witness runs themselves were not completed |
| canon unit | plants A, S, H | A fails; S and H pass (item 8) |
| refusal probe | this seat's `tworow` | the prototype's "REFUSED in paint (held at the rung)" verdict is vacuous for a row that fits: it tests only the item's block size (CX-1) |

No vacuous green was found in T-1, T-3, T-4, T-6 or T-7 on the migrated arms.

---

## 5 · Gestalt read (light and dark, fine and coarse, both engines)

Inputs: the prototype's 32 captures and this seat's 64 (`D4-Dp-crit/captures/`, coarse and focused arms added).

| question | answer |
|---|---|
| does the tile read as a card-like option | **Yes.** K1 reads as four cards and K2 as a grid of cards at 16 px. Coarse changes nothing on K1 or K2 (204×63.58, 16 px) and grows V1 to 54×54 at 16 px; no lozenge appears at any cell |
| is the selection unmistakable without colour | **Yes** on tiles: a 2 px edge, a darker fill and weight 600. **No** on C1's pill row |
| is it apart from the ring | **No.** The selected edge is an outline in near-foreground ink; the focus ring is a second outline 2 px outside it. A focused selected tile shows two concentric rings (`preset-migrated-light-coarse-focus-chromium.png`, `f1-migrated-light-coarse-focus-chromium.png`), and on V1's 44 px squares in dark the selected tile is hard to tell from a focused one. This is pass 1's CX-11 again |
| is it uncluttered | **Not shown.** Every tile is its own glass plate. Q-2's pass-2 default is to build flush and measure both; the route built plated only and reports no measurement of either |
| is it iOS-27 grade | **No.** The commit is a 3.7 % pop over 450 ms with a 60 ms opacity fade of an outline. Nothing travels, nothing floods. Hover in light is a 5 % ink veil at the edge of perception |

Also seen: on K2 the selected edge paints 1 px, not 2. The consumer's `content-visibility: auto` brings paint containment, which cuts the half of the perimeter that sits outside the padding box (`logs/clip.log`: 2 device pixels of edge on specimen against 4 on preset, both engines). T-3 still passes.

---

## 6 · Open gaps (the checklist rows that do not pass)

1. **T-3**: `c1-migrated` 22.50 px² against 224, all three modes, both engines; `preset-verbatim` gating arm 0.00 px² light.
2. **T-5**: FadingScroll's own tab stop on `specimen-migrated` and `strip-migrated`.
3. **T-6**: `f1-migrated` hover light 0.52 % in Chromium, and its PRM arm.
4. **T-8**: reads no declared arm (0/12); C1 on re-reading; Safari UNMEASURED.
5. **X-5**: no DEV name for an interactive descendant.
6. **X-7**: the tone does not reach the tint, 0/24.
7. **§7.3 item 8**: the canon unit passes a size-arm and a structural re-spelling of the tile corner.
8. **§7.3 item 9**: a second row inside the rung is neither cut nor named (CX-1); Q-5 (d) unbuilt, so no name reaches a consumer.
9. **H-10 scenes**: C1 and F1.
10. **MIGRATION / E-11**: the guards for the silent bindings are DEV-only and absent from `dist`; the corner is not refused in paint.
11. **Real Safari**: UNMEASURED (owner's safaridriver checkbox).
12. **Gestalt**: the selected edge reads as a ring, Q-2 (b) is unbuilt, and the commit is not iOS-27 grade.

Gaps 1 (C1), 11 and part of 12 wait on the owner (Q-10, the checkbox, Q-2 and Q-3). Gaps 2, 3 and 6 are the floor's or another owner's mechanism. Gaps 5, 7, 8 and 10 are the route's own.

## 7 · For the next pass's checklist (not scored here)

- Under PRT the hover moves 0.00 % of pixels on every migrated tile in both engines (16 of 16 PRT cells); the prototype's HF-4.
- Paint containment on a tile halves the perimeter (K2, §5).
- In forced colours the ring on `specimen-migrated` is cut to 1.00 px on one side (T-4, reported cells, Chromium): the group pads by a reach the forced-colours ring exceeds.
- `<ToggleGroup shape="…">` accepts an unknown value silently and renders pills, where the floor's Chip throws on one.
- Migrated F1 wraps to a second row where the consumer had a one-row scroller: the library's `flex-wrap: wrap` meets the consumer's `overflow-x: auto`.
- T-1 marks a clamped pill UNMEASURED, so no gating witness fails a held pill whose content is cut (the prototype's HF-5), and none counts rows inside the rung.
- The hover-light cell's 10-level threshold sits on the floor's 5 % rung, so the cell flips by engine and ground.

**Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell.
