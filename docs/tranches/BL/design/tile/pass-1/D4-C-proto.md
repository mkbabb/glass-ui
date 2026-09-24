# D4 · pass 1 · D4-C · selection as a behaviour (prototype)

| field | value |
|---|---|
| seat | D4 pass 1, prototype seat for D4-C. It implements SPECS.md §D4-C on the real source in a worktree, runs typecheck, unit suites, the library build, the whole battery in both engines, and a gestalt read |
| model | `claude-opus-5-5`, asserted from own system identity |
| verdict | **RUNS.** Typecheck exit 0, the full unit suite green, the library builds, the battery runs to completion on two arms in Chromium and Playwright WebKit |
| HEAD | The task named `91dbcbd8`. The worktree seeded at `4a95b5b8`, and the checkout read `8c2abb78` at close. `git diff --stat 91dbcbd8 4a95b5b8` and `4a95b5b8 8c2abb78` over `src tests demo scripts package.json vite.targets.ts` are both empty. The patch applies cleanly to an archive of `8c2abb78` (`git apply --check` exit 0; 39 files, +746 −567) |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, from `glass-ui/node_modules/playwright`, headless. Playwright WebKit is not Safari. Real Safari: UNMEASURED (owner's safaridriver checkbox) in every cell |
| worktree | `…/scratchpad/D4/p1/D4-C-proto/wt`, `node_modules` symlinked (the checkout has no `tests-visual/node_modules`, so there was nothing to link there), vite cache inside the worktree, harness bundles under `…/D4-C-proto/out/`. Removed with `git worktree remove --force` before return |
| load | load average 66 / 149 / 114 at resume, 37-52 during the battery. Every number is a settled static read or a real input event |
| resumption | This seat was paused by a usage limit and resumed. The implementation, the before/after gestalt captures and one battery pass were made before the pause. On resume the seat re-ran typecheck, the unit suites, the library build, rebuilt all three harness bundles, re-ran the whole battery on both arms, and re-ran the DEV-guard and key probes. Every number below is from the resumed runs except the gestalt captures (§5), which predate the pause. No file under `src/` is newer than the pre-pause harness build |
| patch | `docs/tranches/BL/design/tile/pass-1/D4-C-proto.patch` (`git diff` in the worktree plus `git diff --no-index` for the seven new files; byte-identical to the pre-pause save). It includes the worktree's `harness/scenes.mjs` family arm so the critic can rebuild the same scenes |

## 0 · In brief

1. **The spec implements as written, with three small deviations** (§1.2). Nothing in it needed design work at the keyboard.
2. **Gates.** `npm run typecheck` exit 0 (both `vue-tsc` passes, source and test). The touched suites: 48 files, 791 passed, 6 expected-fail. The whole suite: 240 files, 2320 passed, 10 expected-fail, 1 skipped, exit 0. The library build exits 0 and emits `dist/selection.{js,d.ts}`. This closes the spec's open gap "the test typecheck and the unit suites were not run on the probe".
3. **The battery matches the spec's numbers cell for cell.** Card arm and flush arm alike: T-2 12/12, T-3 18/18, T-5 44/44, T-6 30/30, T-8 16/16, W-C 13/13 GREEN in both engines where the witness runs in both. T-1 6/9, T-4 12/24 and T-7 8/12 stay RED for the causes the spec names (§3).
4. **What broke.**
   - The ToggleGroupItem still hangs Playwright WebKit on hover (`single`, `no answer within 120 s`). It also crashed the WebKit DEV-guard probe on the `single` scene (`page.waitForTimeout: Page crashed`).
   - On the shipped keyframes.js composition (`preset-verbatim`), the consumer's `border: transparent` and dashed outline erase the register's edge. T-3 reads 0.00 px² at ≥ 3:1 in light and PRT there, in both engines. The library fixes the bare tile; the shipped tile stays unselected-looking until keyframes.js deletes `SpringPhysicsFacet.vue:197-215`.
   - The value.js strip loses its accent flood and its circle: a stamped `shape="cell"` chip is a 44 px squircle with a flat fill and a black edge.
   - The specimen tiles widen from 150.5 px to 207 px because a stamped Card fills its grid cell where the pill sized to content.

## 1 · What was built

### 1.1 Files (worktree diff, 32 changed + 7 new)

| spec item | file(s) | size |
|---|---|---|
| `SelectionGroup`, `SelectionItem`, context, DEV guards, subpath | `src/components/selection/{SelectionGroup.vue,SelectionItem.vue,context.ts,guard.ts,index.ts}` | 88 + 61 + 27 + 28 + 2 lines |
| the register | `src/components/selection/styles.css` | 121 lines (the spec says 112) |
| published as `@mkbabb/glass-ui/selection` | `package.json` (`exports`, `typesVersions`), `scripts/lib/subpath-policy.mjs` (`selection: "PUBLISH"`), `src/index.ts` | +7, +1, +6 |
| `@property --selection-fill` | `src/styles/tokens/property-regs.css` | +11 |
| the five plate arms | `glass/veil.css` +2, `glass/defined.css` +2, `glass/control-surfaces.css` +2, `glass/glass-chip.css` +4 −4, `glass/surface-axis.css` +2 | as specified |
| Card's `selected` arm deleted (E-1) | `card/Card.vue` (prop + four bindings + `computed`), `card/styles.css` (−98: `@property --card-fill`, `.card[role="option"]`) | |
| Chip admits the stamp | `chip/Chip.vue` `staticAttrs` passes everything when `data-selection-item` is present | +8 −4 |
| ToggleGroup on the behaviour | `toggle-group/ToggleGroup.vue` (−116 net), `ToggleGroupItem.vue` (−65 net), `toggle-group/context.ts` deleted (53), `toggle-group/styles.css` (on-state fill rules deleted, ink and weight kept) | |
| geometric cross-axis walk | `tabs/composables/useTabRovingFocus.ts` | +33, as specified |
| SegmentedTabs `toggle` → `radiogroup` | `tabs/SegmentedTabs.vue` (4 lines), `tabs/README.md`, `tabs/styles/segmented.css` (comments) | |
| re-points | `demo/stories/display/card.vue` (a four-card `SelectionGroup`), `demo/stories/data/search.vue`, `tests/gates/overfit-structure.test.ts` (message), `tests/gates/tabs-seam.test.ts`, `tests/components/{card,custom/tabs,ui/toggle-group}/…`, `tests/composables/search/search-contracts.test.ts`, `tests/components/primitive-display.public-contracts.test-d.ts`, `tests/public-surface.spec.ts` | |
| new unit suite | `tests/components/selection/selection.test.ts` (92 lines): one-of-N stamp on four hosts, N-of-M `aria-pressed`, refusal outside a group, both DEV guards | |
| paper seam comment | `src/styles/paper.css`: the `.card[role="option"]` collision note re-pointed at the state layer (`.paper-grid` on a stamped option replaces the image list, so the option keeps its edge and loses its fill; no site combines them) | comment only |

The engine consumer count stays three (the dock, SegmentedTabs, SelectionGroup) and `overfit-structure.test.ts`'s one-engine arm passes with only its message edited.

### 1.2 Deviations from the spec

- **`radius-role-canon.test.ts:555-568` needed no re-point.** The spec lists it. The test asserts that `toggle-group/styles.css` holds no `--radius-ctx`, and the register writes `--radius-ctx` in `selection/styles.css`, so the test passes unchanged (the `tests/styles` run above). The file is `tests/styles/radius-role-canon.test.ts`, not `tests/gates/`.
- **`demo/stories/data/search.vue` is not an option set, and it needed its own answer.** It is an `aria-activedescendant` listbox: focus stays in the field. With Card's `selected` deleted it writes `role="option"` and `aria-selected` on the Card directly (these now land, since Card binds no role), and it adds a 6-line scoped style so the active row carries an edge. That is demo paint on a Card, outside the register.
- **The register restates the whole `transition` list.** `[data-selection-item]` at (0,1,0) outranks each host's own `transition` shorthand, so it lists the union of what every host animates (`--selection-fill`, `border-color`, `background-color`, `box-shadow`, `color`, `opacity`, `--specular-intensity`, `scale`). The chip's `scale var(--duration-normal) var(--ease-cartoon-punch)` is replaced by the press spring on a stamped chip. This is a second plate contract, alongside the image-list arms: every future host transition must be listed here.

Also: `ToggleGroupItem` derives `:disabled` from the stamp's `data-disabled`, so the group's disabled reaches the native button through one source.

## 2 · Gates, as run on resume

| gate | command (in the worktree) | result | log |
|---|---|---|---|
| typecheck | `npm run typecheck` | exit 0 | `…/D4-C-proto/typecheck-r2.log` |
| touched suites | `npx vitest run tests/components/selection tests/components/card tests/components/chip.contract.test.ts tests/components/ui/toggle-group tests/components/custom/tabs tests/components/ui/surface tests/styles tests/gates tests/composables/search tests/public-surface.spec.ts` | 48 files, 791 passed, 6 expected-fail, exit 0 | `vitest-touched-r2.log` |
| whole suite | `npx vitest run` | 240 files, 2320 passed, 10 expected-fail, 1 skipped, exit 0 | `vitest-full-r2.log` |
| library build | `npx vite build --config lib.config.mjs` (the repo config with `cacheDir` in the worktree) | exit 0; 64 declaration entries; `dist/selection.js`, `dist/selection.d.ts`; `--selection-fill` present in `dist/glass-ui.css`; generation `3b48d57c…` | `lib-build-r2.log` |
| patch | `git apply --check` on `git archive 8c2abb78` | exit 0, 39 files, +746 −567 | |

Before the pause, one whole-suite run failed on `tests/components/menu/contract.test.ts` "restores focus on execute" and a `slider.size-tokens` hook timeout at 10 s (`vitest-full-final.log`). The menu case is the fixed-sleep flake the BL cursor already records, and neither file is touched by this patch. The resumed run passed both.

## 3 · The battery

Builds: `r2` (tiles are Card `size="sm"`, `tier="wash"`, `:shadow="false"`), `r2-bare` (flush bare options, `D4C_TILE=bare`), `r2-dev` (DEV SFC compile). All from the worktree at `4a95b5b8` with 20 dirty `src` files. `node run.mjs --build <b> --out … --webkit` on each (`logs/run-r2.log`, `logs/run-r2-bare.log`; cells in `out/runs/r2*/`). HEAD is SF-13 (HARNESS §4); this seat did not re-run HEAD.

| witness | HEAD | `r2` Card arm | `r2-bare` flush arm | engines |
|---|---|---|---|---|
| T-1 | 3/8 | **FAIL 6/9**. preset 208×61.58 → 81.75 → 101.92, used 16.00 flat, named `--radius-card\|--radius-ctx\|--radius-dialog\|--radius-field`; specimen 207×100.16 16.00 flat; card, surface, chipcell PASS. `wrap` FAIL: ToggleGroupItem 20.00 → 23.95 → 39.24, pill Chip 10.70 → 32.11, Button 20 flat with no role | FAIL 6/9, the same cells | Chromium and Playwright WebKit agree to 0.03 px |
| T-2 | 12/12 | **PASS 12/12** (single 18.00 on 36, vertical 20.00 on 40, SegmentedTabs) | PASS 12/12 | both |
| T-3 | 2/15 | **PASS 18/18**. ≥ 3:1 area light / dark / PRT against the bar, Chromium: preset 324.5 / 341 / 328 (269); specimen 586 / 592 / 586 (307); strip 141 / 159.5 / 148.25 (88); card 552 / 567 / 559.75 (294); surface 574 / 588 / 576 (301); chipcell 134.5 / 153.75 / 142 (93). Fill 1.26-1.42:1. Playwright WebKit: preset 416.75 / 430 / 420, card 455 / 470 / 462, surface 571.5 / 584.5 / 575 (PRT on the forced level-0 path) | PASS 18/18. preset 328 / 341 / 328, specimen 586 / 599 / 586 | both |
| T-4 | 8/20 | **FAIL 12/24**. preset, card and surface whole at 2.00 px. `preset-verbatim` 0.00 px every side (consumer `outline: 1px dashed`, offset −1 px). `specimen` and `specimen-verbatim`: top and left 1.00 px in Chromium, 0.50 px in Playwright WebKit (the FadingScroll port's 2 px padding) | FAIL 12/24, the same causes | both |
| T-5 | 19/38 | **PASS 44/44**, including `tabs` (`radiogroup`, `radio`, one stop) | PASS 44/44 | Chromium (CDP) |
| T-6 | 17/24 (WebKit 9/14) | **PASS 30/30**. Hover light, Chromium: preset 6.44 %, specimen 71.69 %, card 4.27 %, surface 72.18 %, chipcell 7.05 % (PRM the same, card 4.14 %). Playwright WebKit: preset 84.08 %, specimen 72.67 %, card 54.57 %, chipcell 7.45 %. Hover 1.015, press 0.97 × 0.97, commit `--selection-fill` and `border-*-color` 180 ms, coarse 0.00 % latch | PASS 30/30. Hover light preset 75.29 % / 62.31 %, specimen 3.93 % / 5.14 % (Chromium / Playwright WebKit) | both. Info cell `single` (ToggleGroupItem): Chromium 58.13 % (HEAD 0.00 %, SF-9); Playwright WebKit `no answer within 120 s (hung)` |
| T-7 | 4/12 | **FAIL 8/12**. `preset-verbatim` in all four states (dashed outline, `bg-background`, washes). `specimen-verbatim` and `strip-verbatim` pass with content-ink differences reported | FAIL 8/12 | Chromium |
| T-8 | 0/16 | **PASS 16/16**; real Safari UNMEASURED (owner's safaridriver checkbox) | PASS 16/16 | Chromium + Playwright WebKit |
| **W-C** (the family's witness) | 0/7 | **PASS 13/13**: exports present; card and surface boards `radiogroup`/`radio`, one stop, Right/Left/Down/Up all move and check, items group-stamped (`role radio`, `tabindex 0`); preset and specimen Down 0 → 2, Up 2 → 0; vertical column Down/Up; strip and single have no neighbour across (info) | PASS 13/13 | Chromium |
| W-A, W-B, W-D, W-E (other families' witnesses, reported) | 1/3, 1/13, 0/4, 0/6 | W-A 1/3; W-B 9/13 (RED by absence of `ChoiceCard`; the multi-line items are radio, 16.00 px, one stop); W-D 0/4; W-E 0/6 | the same | |

**Left RED, and why** (all as the spec predicts):

| cells | cause |
|---|---|
| T-1 `wrap` ×3 | the control-role holders, which D4-C does not touch |
| T-4 `specimen`, `specimen-verbatim` | the consumer's 2 px grid padding inside FadingScroll against the ring's 4 px reach (SF-6). No lever in this family |
| T-4 and T-7 `preset-verbatim` | consumer paint, until keyframes.js deletes `SpringPhysicsFacet.vue:197-215` |
| T-7 `specimen-verbatim` | passes only because the consumer's `--radius-field` equals Card's 16 (SF-20 last item) |

**Reported cells worth reading.** T-3 on `preset-verbatim` (not gating): 0.00 px² at ≥ 3:1 in light and PRT, 174.25 px² in dark (Chromium; Playwright WebKit 0.00 / 165.75 / 0.00). The consumer's `outline: 1px dashed transparent` and transparent border win over the register's `border-color` at (0,2,0) (`gestalt/tiles-after-preset-verbatim-light-chromium.png`: the selected tile shows the consumer's dashed violet outline and no tone edge). The shipped composition keeps its own selection paint until the consumer migrates. Forced colours: Chromium 11.31:1 on every scene; Playwright WebKit 1.35-1.52:1 fill with a ≥ 3:1 area of 121-569 px² (reported, not gated).

### 3.1 Probes

| probe | build | Chromium | Playwright WebKit |
|---|---|---|---|
| DEV guards, 13 scenes, click item 1 (`probes/devguard.mjs`) | `r2-dev` | 0 guard or console errors on every scene | 0 on the 10 scenes without a ToggleGroupItem (`devguard-nopill.mjs`). The full run crashed on `single`: `page.waitForTimeout: Page crashed` (SF-8) |
| planted `<button>` inside a card option | `r2-dev` | throws `[SelectionItem] an option cannot hold interactive content (ARIA: a radio's children are presentational). Found <button> inside the item. Split the action out of the option.` | the same message |
| real-key grid walk (`probes/keys.mjs`) | `r2` | preset Down → 2, Right → 3, Up → 1, Left → 0; specimen Down 0 → 2 → 4 → 6, Right → 7, Up → 5, End → 7, Home → 0; card and surface all four; chipcell and strip (one row) Down/Up inert, Right and End move. Each move checks | identical sequence and checks |

The key probe's `tabs` row errors (`Cannot read properties of undefined (reading 'click')`) because the tabs scene has no `[data-item]`; that is the probe's defect, and T-5 and W-C read the tabs cells instead.

## 4 · Chrome and WebKit

- T-1, T-2, T-3, T-6 and T-8 give the same verdicts in both engines; T-1 geometry agrees to 0.03 px.
- T-4 fails for the same causes in both. The port cut is deeper in Playwright WebKit (0.50 px against 1.00 px).
- T-6 hover light channel is larger in Playwright WebKit on the plated tiles (card 54.57 % against 4.27 %; preset 84.08 % against 6.44 %). The verdict is the same.
- The ToggleGroupItem hang is unchanged by this patch: it still hangs T-6 `single` and crashed the DEV-guard probe. Card, Surface, Chip and bare items do not hang. The register did not introduce it and did not cure it.
- Real Safari: every cell UNMEASURED (owner's safaridriver checkbox).

## 5 · Gestalt read

Captured with `gestalt.mjs` before the pause, from the HEAD build (`head-tree`, an archive of `4a95b5b8`) and the worktree build. Consumer tiles are the harness scenes at 460 px host width; demo stories are the demo build at 1440×900 and 390×900, light and dark, Chromium. Everything is under `…/scratchpad/D4/p1/D4-C-proto/gestalt/`; readbacks in `gestalt-chromium.json`, `gestalt-chromium-stories.json`, `gestalt-webkit.json`; pixel diffs in `logs/pxdiff.log`.

**The three consumer tiles** (`tiles-{before,after,after-bare}-{preset,specimen,strip}-{light,dark}-{chromium,webkit}.png`):

- **Preset (K1).** Before: four grey lozenges (`9999px` at 208×61.6), the selected one a slightly darker grey. After, Card arm: four 16 px cards on the quiet host. Each tile carries a second grey veil, and the selected tile has a near-black 1 px edge (`rgb(28,25,23)`) and a darker fill. Flush arm: the resting options are seam cells on the host's own plate, with no second veil; the selected option takes the fill and the black edge. In light, the flush arm reads as one card holding four options and the Card arm as four cards in a card, as SF-25 says. Dark (Playwright WebKit): the selected tile has a light 1 px edge and a faint lift; the rest sit nearly flush with the host.
- **Specimen (K2).** Before: eight 150.5×100.2 ovals. After: 207×100.2 cards with a 16 px corner, two columns filling the drawer. The width change is layout, not corner: a stamped Card fills its grid cell. In dark the selected tile has a white edge, a warmer fill and a soft spot of light.
- **Strip (V1).** Before: 44 px circles; the selected one floods near-white (the accent flood). After: 44 px squircles at 16 px; the selected one is a flat darker fill with a black edge, and the flood is gone (§C.5 "the Chip flood under the stamp").
- **Preset verbatim (the shipped keyframes.js tile).** Before and after look alike: 16 px white tiles, with the selected one marked by the consumer's dashed violet outline. The register's edge does not show (§3).

**Demo stories** (`story-{before,after}-{forms-toggle,forms-chip,display-card}-{1440,390}-{light,dark}-chromium.png`, element crops `crop-*`):

- **ToggleGroup** (`forms/toggle`). Before: the on pill is a slightly darker circle. After: the on pill adds a near-black edge in light and a light edge in dark (`crop-after-forms-toggle-390-dark`). The pill shape, sizes, the wrapped row and the ink are unchanged. 0.09 % of pixels moved at 1440 and 0.22 % at 390, all inside the toggle rows. The readback shows the `multiple` group still `aria-pressed` (no role) and the `single` group `radio`, both now `data-selection-item`.
- **Chip** (`forms/chip`). 0.00 % of pixels moved at both widths and both modes. The story has no selectable chip in a set, and its one `shape="cell"` chip is static and unstamped, so nothing changes.
- **Card** (`display/card`, "Selectable cards"). Before: a `listbox` of two `option` cards, both at `tabindex 0` (two tab stops), the selected one a warmer fill. After: a `radiogroup` of four `radio` cards, one at `tabindex 0` and three at `-1`, 418.7×134.2 at 1440 and 350×105.8 at 390, 16 px. The selected card has the black edge in light and a light edge in dark, and the rest are wash cards. 15.89 % (light) and 4.35 % (dark) of the 1440 viewport moved. At 390 the viewport diff reads 0.00 % because the section sits below the first 900 px; the element crops show it.
- No story overflowed horizontally at 390 (`overflowX: false`), and no page logged an error.

**Reading.** In dark the edge reads as a card being picked. In light, the full-tone 1 px edge draws a black line around a pale card, which is heavier than anything else on the page. That is the spec's open question on edge weight, now seen at story scale: on the Card story and the flush preset it reads as "chosen", and on the pill row it reads as an outlined button.

## 6 · Breaks, recorded

1. Playwright WebKit hangs on ToggleGroupItem hover (T-6 `single`, 120 s) and crashed the DEV-guard probe on the `single` scene. SF-8, unchanged.
2. The shipped `preset-verbatim` composition erases the register's edge, 0.00 px² in light and PRT (consumer paint wins over the register).
3. The value.js strip loses its accent flood and its circle under the stamp (a D-2 regression for V1, §C.5).
4. The specimen tiles widen from 150.5 px to 207 px.
5. The register's `transition` shorthand replaces each host's list, so every host's animated properties must be restated in `selection/styles.css`. It is a second unenforced plate contract.
6. `demo/stories/data/search.vue` needed a scoped consumer style for its active-row edge once Card lost `selected`.
7. The pre-pause whole-suite run hit the menu focus-restore flake and a slider hook timeout. Neither file is touched, and the resumed run is green.
8. Probe defect: `keys.mjs` cannot read the tabs scene.

## 7 · Open gaps

- Real Safari: every cell UNMEASURED (owner's safaridriver checkbox).
- The content refusal and the stamp readback are DEV-only. A production build ships an option holding a button with no sound (§C.5, counterexample 3).
- Edge weight in light (§5 reading): a full-tone 1 px edge against a lighter 2 px edge was not measured.
- The Chip flood under the stamp is not re-keyed.
- A deselectable single (X-6) is not specified, and nothing here implements it.
- T-4 `specimen`: port clearance is the consumer's layout.
- The plate contract (image-list arm plus `transition` restatement) has no gate.
- The ToggleGroupItem hover hang in Playwright WebKit is not understood.
- `useAttrs()` reactivity in `SelectionItem`'s `itemProps` (a consumer attribute that changes after mount) was not exercised.
- HEAD was not re-run by this seat; the HEAD column is SF-13.
- The gestalt captures predate the pause. The source did not change after them, but they were not re-shot.
