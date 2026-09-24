# D4 · pass 1 · D4-D · critique: the tile shape on ToggleGroup

| field | value |
|---|---|
| seat | D4-D adversarial critic. I did not author the family, its spec or its prototype |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the checkout reads `da5ecfe2`. `git diff --stat 91dbcbd8 da5ecfe2 -- src tests demo vite.targets.ts package.json` is empty. `git apply --check` of `D4-D-proto.patch` passes at `da5ecfe2` |
| worktree | `…/scratchpad/D4/p1/D4-D-crit/wt` at `da5ecfe2`, with the patch applied and `node_modules` and `tests-visual/node_modules` symlinked from the checkout. Plants were written into worktree files and restored by copy; `git diff \| shasum` matched before and after (`logs/wt-diff-{before,after}.sha`). Removed with `git worktree remove --force` before returning |
| harnesses | canonical `docs/tranches/BL/design/tile/harness/` (unchanged) for the unmigrated consumer; the prototype seat's migrated copy, `cp -R` into `…/D4-D-crit/harness-mig/` and unedited, for the migrated consumer; `harness-t7/` (one added consumer rule) for the T-7 plant |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, from `glass-ui/node_modules/playwright`, headless, 1000×900 at DSF 2. Playwright WebKit is not Safari. Real Safari: UNMEASURED (owner's safaridriver checkbox) in every cell |
| load | load average 50 / 56 / 76 at the worktree add, 68 / 51 / 56 at the end. Every number is a settled static read or a real input event |
| scratch | `C=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D4/p1/D4-D-crit`: `plant.mjs`, `probe-cx.mjs`, `devnoise.mjs`, `logs/`, `out/runs/<label>/*.json`, `shots/{chromium,webkit}/` |

## 0 · Verdict

**ADVANCE, at 55 % convergence.** D is the smallest delta of the five: one prop, one shared corner rule, one engine option. It runs on the real source, and I reproduced every number it claims, in both engines. Every witness it claims green catches a violation planted in D's own code. But the audit found three defects the prototype did not report, and two battery holes that make its headline witness unable to fail on its own claim:

1. **The library's own invalid state erases the selected carrier.** When the group is invalid, the selected tile's full-ink edge turns red like its siblings. The ≥3:1 area is 0.00 px² in 9/9 cells (three scenes × light, dark, PRT), in Chromium and in Playwright WebKit. The fill that is left reads 1.20:1, and 1.00:1 under PRT. The prototype cured invalid-under-hover and never tried invalid-with-a-selection (§3 CX-1).
2. **W-D cannot fail on "declared once, at the group".** With `shape` ignored, so that every ToggleGroupItem gets the cell anatomy and corner, W-D still passes 22/22 and T-2 passes 4/4. T-2 moves the eight pills it should judge to "not one line, not judged". T-1 rises to 8/10, above the spec's own 7/10 (§2, plant `wd2`).
3. **Engagement stops at the D-2 bar.** The commit is the existing 180 ms colour transition, and the hover edge sits one step below the selected edge on the same channel. A hovered tile reads "almost selected", and in light it clears the separation bar by 11 % (§4).

D advances because none of these needs a primitive as hard as the problem: the defects are one precedence rule, one second carrier and one commit arm, and the holes are two harness fixes. It does not advance on the evidence as filed. The open-gap list (§6) is the pass-2 contract.

## 1 · Step 1: the failures I expected a tile design to hide (written before reading the spec)

From PORTFOLIO §0-2 and §7 and HARNESS.md alone:

- **E1, a witness that reads the declaration it was handed.** W-D reads `shape="cell"` items in a scene the harness author wrote. It checks the corner, column, leading and row count, but it has no arm showing that an undeclared group stays a pill. A library that ignores the declaration could pass it.
- **E2, a selected carrier on a shared channel.** If selection moves to the border, whatever else paints the border (the invalid grammar, consumer paint, hover) competes with it, and precedence decides silently.
- **E3, a self-authored migration.** The migrated scenes transcribe what consumers "will" do. T-7 then measures the transcriber's deletions, not the library.
- **E4, the D-2 commit reduced to "a transition".** T-6 passes a 180 ms colour change (HARNESS §6), so an iOS-27 commit can be claimed without being built.
- **E5, a pill that still balloons.** A declared axis fixes only groups that declare it, and a wrong declaration or a hard break regrows the stadium (PORTFOLIO D4-D known risks).
- **E6, grid arrows on a model that is not the platform's.** A geometric walk fixes grids, but a one-line radiogroup keeps a dead cross axis, which native radios do not have (SF-11).
- **E7, WebKit.** The ToggleGroupItem hover hang (SF-8) makes every Playwright WebKit T-6 cell unreadable, so engagement is Chromium-only evidence.
- **E8, a consumer-less arm.** Chip `cell` has zero consumer sites (SF-19); sharing a declaration with it keeps an arm alive for no reader.

All eight showed up. E1, E2 and E3 turned out worse than the prototype recorded (§2, §3).

## 2 · Re-run and plants

### 2.1 The battery, re-run

`node harness-mig/run.mjs --build out/builds/mig --out out --webkit` (`logs/mig-run.log`, `out/runs/mig/`), plus `node $H/wd-declared-cell.mjs` on the canonical build (`out/runs/canon/`). The builds came from my worktree: `mig` (migrated scenes) and `canon` (canonical scenes), both production.

| witness | migrated, Chromium | migrated, Playwright WebKit | prototype claimed |
|---|---|---|---|
| T-1 | 7/10 | 7/10 | 7/10, 7/10 |
| T-2 | 12/12 | 12/12 | 12/12, 12/12 |
| T-3 | 10/15 | 10/15 | 10/15, 10/15 |
| T-4 | 20/20 | 20/20 | 20/20, 20/20 |
| T-5 | 27/38 | (Chromium only) | 27/38 |
| T-6 | 27/30 | 9/15: preset, specimen and strip "no answer within 120 s (hung)" | 27/30, 9/15 |
| T-7 | 12/12 | (Chromium only) | 12/12 |
| T-8 | 16/16, real Safari UNMEASURED | (in T-8) | 16/16 |
| W-D | 22/22 | 22/22 | 22/22, 22/22 |
| W-D canonical `family-d` | 4/4 | 4/4 | 4/4, 4/4 |
| W-A / W-B / W-C / W-E | 1/3, 0/1, 0/7, 0/0 | 1/3, —, —, 0/0 | the same |

Re-run as well: gap 9, hovered-unselected against selected (`logs/gap9.log`, Chromium): preset 297.00 / 300.50 / 304.50 px² against a 267 bar, specimen 539.50 / 543.75 / 545.00 against 299, strip 120.50 / 121.25 / 122.50 against 94. These match the prototype to the quarter pixel. Unit tests (`logs/unit-clean.log`), `vitest run tests/components/ui/toggle-group tests/styles/radius-role-canon.test.ts` with the cache in scratch: 55 passed, 1 expected fail.

### 2.2 One planted violation per claimed-green witness

`node plant.mjs <id>` (`logs/plants.log`). Each plant edits D's code in the worktree, builds `plant-<id>` with the migrated harness, runs the witness, and restores the file.

| plant | the violation | witness | result |
|---|---|---|---|
| `wd1` | cell item `flex-direction: row` | W-D Chromium | **FAIL 0/22**, caught |
| `t1` | `cell.css` corner → `--radius-pill` | T-1 Chromium | **FAIL 1/10** (preset 31.79 → 51.96, ÷h/2 1.00), caught |
| `t2` | pill arm gets `--radius-field` | T-2 Chromium | **FAIL 4/12** (single 16 on 36, ÷h/2 0.89), caught |
| `t3` | selected edge back to `--ink-perimeter` (0.48) | T-3 Chromium | **FAIL 4/15**: preset, specimen, strip 0.00 px² in light and PRT, caught |
| `t4` | ring clearance padding deleted | T-4 Chromium | **FAIL 12/20**: specimen ring top 0.00 / left 0.00, caught |
| `t5` | `grid: computed(() => false)` | T-5 Chromium | **FAIL 23/38**: preset and specimen Down/Up dead, caught |
| `t6` | hover edge rule disabled | T-6 Chromium | **FAIL 21/30**: light channel 0.00-0.01 %, caught |
| `t7` | consumer rule `.specimen-tile.kf-verbatim { border-radius: 12px }` (harness copy) | T-7 Chromium | **FAIL 8/12**, caught |
| `t8` | `@supports (hanging-punctuation: first)` (WebKit-only) restores the stadium | T-8 | **FAIL 14/16**: Playwright WebKit T-1 preset and specimen, caught |
| unit | the lane sheet restates the corner as `.toggle-group:is([data-shape=cell]) .toggle-group__item { border-radius: var(--radius-field) }` | `radius-role-canon` "one declaration" case | **passes 55/55. Not caught** (`logs/unit-plant.log`): the test matches only the quoted spelling `data-shape="cell"` |
| **`wd2`** | **the declaration ignored**: `cell.css` and the cell item rule re-keyed to `.toggle-group .toggle-group__item`, so every item is a cell whatever `shape` says | W-D, T-2, T-1, W-A, T-5 | **W-D PASS 22/22. T-2 PASS 4/4**: `single` and `vertical`, now 42.20 / 45.50 px tall 16 px cards, are logged "not one line, not judged" and dropped from the gate. T-1 **8/10** (better than D's 7/10: the `wrap` ToggleGroupItem is now 16 flat). W-A 1/3 and T-5 27/38, identical to D. **Not caught** |

So every witness is live against a crude violation. The family's own claim, that the shape is declared at the group, is witnessed by nothing: a library with no shape axis at all scores as well as D or better on every tally. This is the vacuous-convergence item, and it is the harness's defect as much as D's. Pass 2 needs (a) a W-D arm in which the same items without `shape` stay one-line stadiums at h/2, and (b) T-2 failing, not skipping, a gated item that has left its rung.

## 3 · Counterexamples (measured)

- **CX-1, the invalid group with a selection.** `probe-cx.mjs` sets `data-invalid` and `aria-invalid` on the migrated group, which is what `controlStateAttrs` stamps, and reads T-3's rule (`logs/cx-{chromium,webkit}.log`).

  | scene | valid ≥3:1 area, light / dark / PRT (Chromium) | invalid (Chromium) | invalid (Playwright WebKit) |
  |---|---|---|---|
  | preset | 318.00 / 334.75 / 326.00 | **0.00 / 0.00 / 0.00** | **0.00 / 0.00 / 0.00** |
  | specimen | 559.75 / 576.75 / 568.00 | **0.00 / 0.00 / 0.00** | **0.00 / 0.00 / 0.00** |
  | strip | 142.50 / 152.75 / 144.00 | **0.00 / 0.00 / 0.00** | **0.00 / 0.00 / 0.00** |

  The computed edge is `rgb(219, 36, 36)` on the selected and the unselected tile alike (dark `oklch(0.702 0.184 27.5)`). The cause is precedence: `.toggle-group[data-invalid] .toggle-group__item` is (0,3,0) and `.toggle-group__item[data-state="on"]` is (0,2,0). The fill that is left, 1.20:1 (1.00:1 under PRT), is the masked-fallback shape E-2 forbids: the tile still looks faintly chosen while its carrier is dead. The prototype's §3 item 1 fixed the invalid grammar against hover and did not check it against selection. One border cannot carry both states, so this needs a second carrier (a mark, or a fill that clears 3:1 on the plate), not a specificity tweak.
- **CX-2, consumer paint on the border still erases the carrier.** Canonical T-3 on `preset-verbatim` (the unmigrated K1 with its `border-color: transparent`), Chromium: 0.00 / 263.75 / 0.00 px² against a 278 bar. HEAD shows the same, so this is not a regression. It is C-6 in its general form: any author rule on `border-color` at (0,2,0) or above removes selection, and D has no channel it could fall back to.
- **CX-3, the one-line radiogroup keeps a dead cross axis.** `probe-cx.mjs` CX-keys, Chromium, real click then key: `single` ArrowDown from 0 → 0 and ArrowUp from 1 → 1 (dead); `vertical` ArrowRight and ArrowLeft dead. Native `<input type=radio>` and the APG radio group move on all four arrows (SF-11). T-5 does not gate this: it logs "no item has a neighbour that way" and marks the cell null. D's `grid: computed(() => true)` takes react-aria's grid model for every ToggleGroup, including the one-line rows that were never grids.
- **CX-4, the unmigrated consumer gets noise and height.** `devnoise.mjs` on a `--dev` canonical build: preset 4 and specimen 8 `[glass-ui] … holds more than one line in a pill group` errors at mount, one per item, in both engines. The unmigrated preset item is 208×70.17, against 61.58 at HEAD, because of the pill law's `padding-block: 0.15em`. `single`, `vertical` and `wrap` at mount: 0 errors.
- **CX-5, V1 fights the grid it was handed.** The migrated strip needs the consumer rule `.toggle-group.strip-row { display: inline-flex; … }` (harness-mig `scenes.mjs`) to undo the group's `display: grid`. One of the three migrated sites overrides the layout that `cell` bundles with the shape, so `cell` conflates shape with layout. The 40×54.80 strip tile at 16 px reads as a lozenge (`shots/chromium/strip-light-rest.png`; C-4).

## 4 · Gestalt (own captures, `shots/chromium/*.png`, `shots/webkit/*-rest.png`)

- **Card-like option: yes, on K1 and K2.** `preset-light-rest.png` shows four 16 px tiles with a start-aligned name and readout. `specimen-dark-rest.png` is a clean two-column portrait grid. Neither reads as a pill.
- **Selected without colour: yes, at rest.** A 1 px near-black edge in light and a near-white one in dark carry it on luminance, plus a slightly darker fill.
- **Hover against selected: weak.** In `preset-light-hover0.png`, the hovered "Smooth" wears a 0.48 edge and at a glance it reads almost like the selected "Snappy" beside it. The measured margin is 297 against a 267 px² bar (1.11×) in light. Two states sit on one channel, one rung apart.
- **Uncluttered and glass-idiomatic: partly.** Each tile carries its own grey plate inside the quiet Card, so the preset panel reads as four slabs in a slab (SF-25). Nothing specular or refractive is visible at rest or on hover. The selected pill in `single-light-rest.png` ("Power", black edge, weight 600) reads heavy in light (SF-4, prototype §3 item 6). The strip tiles read as small lozenges (CX-5).
- **iOS-27 grade: no.** Press is 0.97 and the commit is a 180 ms colour and edge fade. No pop, flood or glide exists, so D-2 and D-3 ("best iOS 27") are not met, and T-6 cannot see the difference (SF-10).

## 5 · The checklist

| item | answer | evidence |
|---|---|---|
| vacuous convergence | **present.** W-D + T-2 pass a library with no shape axis; T-7's migrated green compares `preset-verbatim` with markup identical to `preset` | §2.2 `wd2`; harness-mig `scenes.mjs:155-166` (no verbatim branch on the preset item) |
| spec cites itself | **partly.** SPECS §D.3 quotes the research seat, and the prototype re-measures with the research seat's own migrated harness. I broke the loop by re-running and planting: numbers reproduce, and plants are caught except `wd2` and the unit re-spelling | §2.1, §2.2 |
| gates that cannot fail | **two.** W-D on the declaration (`wd2`); the canon "one declaration" case on a re-spelled attribute (55/55). Also T-6's commit cell, which accepts any non-scale transition (SF-10), and T-5's null cells for one-line cross arrows (CX-3) | §2.2, §3 |
| elegant-reduction trap | **present on engagement and on the border.** "Engagement: the capsule hover and press as today" defers the D-2 commit. "All of them ride the item's border" defers what happens when a second state also wants the border (CX-1, CX-2) | SPECS §D.1 state table; §3 |
| aliases, shims, dual paths | **none in the API.** `pill`/`cell` is a variant; Chip moves `--radius-card` → `--radius-field` with no alias. Minor P-3 restatements: `context.ts` spells `"pill" \| "cell"` instead of importing `ToggleGroupShape`; the ring clearance restates the 2 px ring offset as a literal (named gap 7). The V1 layout override is a second layout path (CX-5) | patch `context.ts`, `styles.css` |
| masked fallback | **present.** In an invalid group the edge is dead and the 1.20:1 fill still paints (CX-1). The pill-balloon refusal is DEV-only, so production fails silently (C-1, C-2) | §3 CX-1, CX-4 |
| unverified gestalt | checked by me in both modes (§4): card-like yes, selection unmistakable at rest yes, hover near-collision, plated slabs, not iOS-27 | `shots/` |
| consumer-less substrate | **Chip `cell`** (zero consumer sites, SF-19) is re-homed into the new shared `cell.css` and shares only its corner with ToggleGroup (C-12). `shape="cell"` has 3 sites (K1, K2, V1). `--toggle-group-cell-min` has one (K2) | SPECS §D.2; §3 CX-5 |

## 6 · Convergence and open gaps

**Convergence: 55 %.** What is closed and reproduced: the corner (T-1 on all three tiles, both engines), the selected edge in the valid state (T-3 light, dark, PRT, both engines), the ring (T-4 20/20, both), grid arrows on grids (T-5), consumer paint deletable (T-7, as authored), W-D as specified, the build, typecheck and units. Open, each a pass-2 item:

1. **CX-1:** the invalid state erases the selected carrier, 0.00 px² in 9/9 cells in both engines. It needs a second carrier or a stated precedence, measured.
2. **W-D and T-2 vacuity (`wd2`):** add a paired undeclared-pill arm to W-D, and make T-2 fail a gated item off its rung instead of skipping it.
3. The canon "one declaration" case is evaded by an unquoted attribute. Match on the parsed selector, not on text.
4. **D-2 commit:** a pop, flood or glide on commit, with a witness cell that can tell one from a colour fade (C-9, SF-10).
5. **Hover and selected on one channel:** a 1.11× margin in light, and a visual near-collision (§4). Hover needs a carrier the selected state does not use (a light channel, not the edge).
6. **CX-3:** one-line radiogroups keep a dead cross axis. Either go linear on all four arrows where there is no second line (the platform answer), or rule against it explicitly. T-5 should gate the choice.
7. **CX-5:** `cell` bundles grid layout with shape, and V1 overrides it. Decide whether the grid belongs to the shape.
8. The full-ink edge on every selected pill library-wide, heavy in light, with no owner ruling (SF-4).
9. C-4: the 16 px corner on the 40 px V1 tile reads as a stadium.
10. C-1 and C-2: the production pill balloon is silent, and a two-line label inside the rung is uncaught. CX-4: one DEV error per item, and the unmigrated tile grows 61.58 → 70.17 px.
11. CX-2 / C-6 / C-7: consumer or second-state `border-color` erases selection, and no selected-ink token reaches the media.
12. C-12 and SF-19: Chip `cell` shares the corner, not the state, and has no consumer.
13. Playwright WebKit T-6: 9/15, hover hangs on preset, specimen and strip (SF-8, not D's code). Real Safari: UNMEASURED (owner's safaridriver checkbox) in every cell.
14. G-BUNDLE-RATCHET +3,153 bytes, as reported by the prototype (`verify-package-final.log`). **Not re-measured here.**
15. P-3 nits: the `context.ts` union restatement, and the ring-clearance literal (named gap 7).

## 7 · Artefacts

Under `C=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D4/p1/D4-D-crit/`:
- `logs/`: `mig-run.log` (battery), `plants.log`, `cx-chromium.log`, `cx-webkit.log`, `gap9.log`, `devnoise.log`, `unit-clean.log`, `unit-plant.log`, `wt-diff-{before,after}.sha`, build logs
- `out/builds/{mig,canon,canon-dev,plant-*}/` and `out/runs/<label>/*.json`
- `shots/chromium/{preset,specimen,strip,single}-{light,dark}-{rest,hover0}.png`, `shots/webkit/*-rest.png`
- `plant.mjs`, `probe-cx.mjs`, `devnoise.mjs`, `harness-mig/` (the prototype's copy, unedited), `harness-t7/`

My only write to the checkout is this file.
