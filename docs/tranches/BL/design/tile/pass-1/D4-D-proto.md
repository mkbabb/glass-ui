# D4 · pass 1 · D4-D · prototype: the tile shape on ToggleGroup

| field | value |
|---|---|
| seat | D4-D prototype. Test-implements SPECS.md §D (and the SHARED FACTS) on the real source |
| model | `claude-opus-5-5`, asserted from own system identity |
| verdict | **RUNS.** The spec builds, typechecks, passes its unit tests, and turns W-D green in both engines. It turns T-1, T-3, T-4, T-7 and T-8 green on the three consumer tiles as migrated. Two breaks were found and one was cured (§3) |
| HEAD | the task named `91dbcbd8`; the worktree was cut at `4a95b5b8`, and the checkout now reads `8c2abb78`. `git diff --stat 91dbcbd8 HEAD -- src tests demo vite.targets.ts package.json` is empty, and `git apply --check` of the patch passes at `8c2abb78` |
| worktree | `…/scratchpad/D4/p1/D4-D-proto/wt`, with `node_modules` symlinked from the checkout. Caches and outputs went to `…/D4-D-proto/cache` and `…/D4-D-proto/out`, through four untracked configs in the worktree (`vite.proto.config.ts`, `vitest.proto.config.ts`, `vite.demo.proto{,2}.config.ts`), none of which are in the patch. `cell.css` was `git add -N`'d in the worktree's own index so `git diff` carries it. The worktree was removed with `--force` before returning |
| engines | Chromium 149 (`channel: "chromium"`) and Playwright WebKit 26.5, from `glass-ui/node_modules/playwright`, headless. Playwright WebKit is not Safari. Real Safari: UNMEASURED (owner's safaridriver checkbox) in every cell |
| load | load average 124 / 176 / 120 when the session resumed, and 57 / 118 / 106 at the T-6 re-run. Every number is a settled static read or a real input event. The one press cell that failed under load is re-run in §2 |
| patch | `docs/tranches/BL/design/tile/pass-1/D4-D-proto.patch`: `git diff` in the worktree, 13 files, +238 −12 (src 10 files +179 −7; tests 2 files; demo story 1 file). Copied byte for byte (`cmp`) from the worktree diff |
| scratch | `S=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D4/p1/D4-D-proto` |

## 0 · In brief

1. **The spec runs as written, with one correction.** The spec made the hover edge `.toggle-group__item[data-state="off"]:hover:not(:disabled)`, which is (0,4,0). That outranks the invalid grammar's red edge (0,3,0), so an unselected item in an invalid group lost its red border to a passing pointer. The prototype wraps the state in `:where()`, which keeps the hover at (0,2,0). Measured on the demo's invalid group: HEAD hovered-unselected `rgb(219, 36, 36)`, prototype `rgb(219, 36, 36)` (`logs/head-invalid.log`, `shots/demo/demo-probe.json`).
2. **The witnesses, on the migrated consumer.** W-D 22/22 in Chromium and in Playwright WebKit. T-1 7/10, T-2 12/12, T-3 10/15, T-4 20/20 in both engines. T-5 27/38, T-6 27/30, T-7 12/12 and T-8 16/16 in Chromium. Every preset, specimen and strip cell passes in every mode that ran. The red cells belong to Card, Chip, SegmentedTabs, the `wrap` scene, and the Playwright WebKit hover hang.
3. **Playwright WebKit T-6 is red: 9/15.** Hovering any ToggleGroupItem hangs the engine ("no answer within 120 s"). This is SF-8 and is not D's code. Separately, the demo's `/forms/toggle` page closes the Playwright WebKit target on load, at HEAD as well as on the prototype. So the demo gestalt is Chromium only.
4. **The library build passes. The package gate does not.** `vite build` completes, and `public-surface.spec.ts` passes 96/96 against the prototype's `dist/`. `verify-export-types` stops on `G-BUNDLE-RATCHET: bundle ratchet increase forbidden: 2919282 > 2916129` (+3,153 bytes). HEAD matched the ratchet exactly. Landing D means editing the ratchet datum.
5. **The gestalt.** The cell reads as a card-rung option grid in both modes. The full-ink selected edge is legible and reads heavy in light (SF-4). Every single-line ToggleGroup in the demo now also wears the full-ink edge when selected. On the 40 px strip tile the 16 px corner reads close to a stadium (C-4, still open). The Chip and Card stories show no visible change: the pixel diff moves 0.000 % of pixels by more than 10 levels.

## 1 · The change (what the patch does)

The patch follows SPECS §D.1, item for item.

| file | change |
|---|---|
| `src/components/toggle-group/ToggleGroup.vue` | `shape?: ToggleGroupShape` (`"pill" \| "cell"`, default `pill`), `data-shape`, `grid: computed(() => true)` into the engine, `shape` into the context |
| `src/components/toggle-group/context.ts`, `index.ts` | `shape: ComputedRef<"pill" \| "cell">` on the context; `ToggleGroupShape` exported from the barrel |
| `src/components/toggle-group/ToggleGroupItem.vue` | a DEV-only `ResizeObserver` that logs one `console.error` when a pill item grows past its `min-block-size` |
| `src/components/toggle-group/styles.css` | the pill law; the selected edge `border-color: var(--foreground)`; the hover edge at `--ink-perimeter` behind `@media (hover: hover)`, with the state in `:where()` (§0 item 1); the cell anatomy: grid, `--toggle-group-cell-min: 10rem`, ring clearance `calc(var(--focus-ring-width) + 2px)`, column, pad pair per size, body leading, `--space-residue` gap |
| `src/styles/glass/cell.css` (new), `glass.css`, `glass-chip.css` | one shared corner rule on `--radius-field` for `.glass-chip--cell`, `.glass-chip--cell.glass-capsule` and `.toggle-group[data-shape="cell"] .toggle-group__item`. Chip's `--radius-card` rule is deleted |
| `src/components/tabs/composables/useTabRovingFocus.ts`, `useSelectionGroup.ts` | `grid?: ComputedRef<boolean>`. With it on, the cross-axis arrows walk by geometry: the nearest enabled item on the adjacent line, closest on the main axis |
| `tests/components/ui/toggle-group/ToggleGroup.test.ts` | G-TOGGLE-WRAP re-pointed. `nowrap` and `safe center` may live only on the pill item arm, and the only padding a group may carry is the ring clearance. The barrel gains `ToggleGroupShape` |
| `tests/styles/radius-role-canon.test.ts` | a new case checks that the cell corner is one declaration in `cell.css`, and that neither `glass-chip.css` nor the toggle-group sheet restates it |
| `demo/stories/forms/toggle.vue` | a "The tile" section: a four-preset `shape="cell"` group (name plus mono readout) |

## 2 · Results

### 2.1 Typecheck, units, build

| step | command (in the worktree) | result |
|---|---|---|
| typecheck | `npm run typecheck` (`vue-tsc --noEmit && vue-tsc --noEmit -p tsconfig.test.json`) | **exit 0** (`logs/typecheck-resume.log`). The first run, before `dist/` existed, raised two TS2307 errors on `@mkbabb/glass-ui/fourier-math` in `FourierField.smoke.test.ts` (`typecheck.log`). Both depend on `dist/`, not on this change |
| affected units | `npx vitest run --config vitest.proto.config.ts tests/components/ui/toggle-group tests/styles tests/components/custom/tabs tests/composables tests/gates/overfit-structure.test.ts` | **76 files passed, 787 passed, 5 expected fail** (`logs/vitest-resume.log`) |
| chip and radio contracts | `… tests/components/chip.contract.test.ts tests/components/radio-group.contract.test.ts` | 2 files, 16 passed |
| whole suite | `npx vitest run --config vitest.proto.config.ts` | 238 files passed, 1 failed: `boot-graph.test.ts`, 3 cases, all "dist-demo/index.html is absent" (`vitest-full.log`). After the demo dist build it passes 14/14 (`boot-graph.log`) |
| public surface | `npx vitest run … tests/public-surface.spec.ts`, against the prototype's `dist/` | **96/96**. `.published-roster` needs no new row. This closes spec §D.5 gap 8 for the spec file |
| library build | `vite build` through the proto config | `✓ built`, `glass-ui:ready` (`build.log`) |
| package gate | `scripts/verify-export-types.mjs` | **FAIL** `G-BUNDLE-RATCHET: bundle ratchet increase forbidden: 2919282 > 2916129` (`verify-package-final.log`). HEAD: `equal: true`, 2916129 (`verify-package-head.log`) |

### 2.2 The battery

There are two harnesses, as in the research seat. The **canonical** harness (`docs/…/tile/harness/`, unchanged) shows a consumer that has not migrated. The **migrated** copy (`S/harness-mig/`) differs from it in two ways only: `lib.mjs` reads `REPO` from `TILE_REPO`, and `scenes.mjs` transcribes preset, specimen and strip as their D migrations, which puts `shape="cell"` on the group and removes the item utilities and the consumer's tile paint. Builds: `f-mig` and `f-canon` (production) from the final source. Logs: `S/logs/f-{mig,canon}-run{,2}.log`. The run was interrupted by the session limit after T-6 and resumed with `--only` for the rest. Cells: `S/out/runs/{f-mig,f-canon}/*.json`.

| witness | migrated, Chromium | migrated, Playwright WebKit | canonical (unmigrated), Chromium | canonical, Playwright WebKit | HEAD (SF-13) |
|---|---|---|---|---|---|
| T-1 | 7/10 | 7/10 | 3/8 | 3/8 | 3/8 |
| T-2 | **12/12** | **12/12** | 12/12 | 12/12 | 12/12 |
| T-3 | 10/15 | 10/15 | 8/15 | 8/15 | 2/15 |
| T-4 | **20/20** | **20/20** | 8/20 | 8/20 | 8/20 |
| T-5 | 27/38 | Chromium only (CDP) | 23/38 | — | 19/38 |
| T-6 | 27/30 (re-run; first pass 26/30, §2.3) | **9/15** | 21/24 (re-run; first pass 20/24) | 9/14 | 17/24 |
| T-7 | **12/12** | Chromium only | 4/12 | — | 4/12 |
| T-8 | **16/16**, Safari UNMEASURED | (in T-8) | 12/16 | (in T-8) | 0/16 |
| W-A | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 |
| W-B | 0/1 (not D's; RED by absence) | — | 7/13 | — | 1/13 |
| W-C | 0/7 (not D's; RED by absence) | — | 0/7 | — | 0/7 |
| **W-D** | **22/22** | **22/22** | **4/4** (`family-d`) | **4/4** | 0/4 |
| W-E | 0/0 (the migrated scenes gate nothing for E) | 0/0 | 0/6 | 0/6 | 0/6 |

**The consumer tiles as migrated, per mode.**

| witness | preset | specimen | strip |
|---|---|---|---|
| T-1 (both engines) | 204×63.58 → 103.92, 16.00 flat, named `--radius-field` | 205×94.16 → 130.47, 16.00 flat | 40×54.80 → 90×76.39, 16.00 flat |
| T-3 Chromium, ≥3:1 edge area, light / dark / PRT | 318.00 / 334.75 / 326.00 px² against 267 | 559.75 / 576.75 / 568.00 against 299 | 142.50 / 152.75 / 144.00 against 94 |
| T-3 Playwright WebKit (PRT on the forced level-0 path) | 414.50 / 424.00 / 418.00 | 565.50 / 577.25 / 570.00 | 143.25 / 156.00 / 145.00 |
| T-3 fill alone | 1.20 / 1.22 / **1.00** | 1.19 / 1.22 / **1.00** | 1.22 / 1.21 / **1.00** |
| T-4 | whole, both engines, both selection states | whole at 2.00 px on every side | whole |
| T-5 | `radiogroup`, 1 stop, all four arrows move and check | the same | `radiogroup`, 1 stop |
| T-6 Chromium: hover light channel (PRM the same) | 3.84 % | 2.91 % | 7.47 % |
| T-6 Chromium: press, commit, coarse | 0.97×0.97; 6 non-scale 180 ms transitions incl. `border-*-color`; coarse paint 0.00 % | the same | the same |
| T-6 Playwright WebKit | hung (120 s) | hung | hung |

**Left RED, and why.**

| cells | cause |
|---|---|
| T-1 / W-A `wrap` | a hard break (`<br>`) still grows a pill ToggleGroupItem, 20.00 → 26.23 → 41.52, and the scene sets `white-space: normal`. The pill Chip and Button are not D's (C-1) |
| T-3 card ×3, chipcell light and PRT (1.49 / 1.13) | Card's arm and Chip's flood; D does not change them (C-12) |
| T-5 tabs, card ×6, chipcell ×4 | SegmentedTabs `group` / `aria-pressed`, Card's `listbox`, Chip's `group`. None is D's |
| T-6 card hover scale 1.00, chipcell light channel 0.00 % | Card and Chip, not D's |
| T-6 Playwright WebKit preset, specimen, strip, single | the ToggleGroupItem hover hang (SF-8) |

### 2.3 Load flake on the press cell

The first Chromium T-6 pass read `chipcell press · scale 1.01×1.01` on the migrated build and `preset press · scale 1.01×1.01` on the canonical one. That is the hover scale, read before the press had landed. Load was 124-176. The standalone re-run passed both press cells at 0.97×0.97 (`S/out2/runs/{f-mig,f-canon}/T-6-chromium.json`): migrated 27/30, canonical 21/24. The source that differs between the `p-*` and `f-*` builds is one hover selector plus one demo class, and neither touches scale. The `p-mig` run had passed the same cell.

### 2.4 Probes beyond the battery

- **Hovered-unselected against selected** (spec §D.5 gap 9; `harness-mig/gap9-hover-vs-sel.mjs`, `logs/gap9.log`, Chromium). Selected against hovered-unselected, ≥3:1 area: preset 297.00 / 300.50 / 304.50 px² (light / dark / PRT) against a 267 bar; specimen 539.50 / 543.75 / 545.00 against 299; strip 120.50 / 121.25 / 122.50 against 94. Hover against rest, ≥1.5:1 area: preset 321.50 / 341.00 / 320.50 px². So the hover edge answers, and the selected edge still separates at ≥3:1 from a hovered sibling in every mode. Gap 9 is closed in Chromium.
- **The DEV refusal** (`probe-refusal.mjs` on the `--dev` builds; `logs/probe-refusal{,-canon}.log`, both engines). Migrated: 0 errors at mount on every scene, and 1 error once a line is added to the `wrap` pill. `single` (sm) plus a line gives 0 errors, which is C-2. Canonical (unmigrated K1 and K2): **4 errors at mount on preset and 8 on specimen, one per item**, in both engines. An unmigrated consumer's DEV console fills until it declares `cell` (C-10).
- **The demo's cell group** (`demo-probe.mjs`, `logs/demo-probe.log`, Chromium). At 1440: a grid of `201.328px 201.328px`, group pad 4px, items 201.3×67.9 with a 16px corner, column, line-height 24.6px. From 0: ArrowDown → 2, ArrowRight → 3, ArrowUp → 1, ArrowLeft → 0, focus and check together. At 390: `169px 169px`, items 169.0×53.2, line-height 21px. No horizontal page scroll at either width (`demo-shots.json`: `hscroll none`, 0 console errors).
- **Playwright WebKit on the demo.** `/forms/toggle` closes the target during load (`page.waitForSelector: Target page, context or browser has been closed`) on the **HEAD** demo (`logs/head-invalid.log`) and on the prototype (`logs/demo-probe.log`). This happens before any hover, and I did not isolate it. It is pre-existing, and it blocks the WebKit demo cells.

## 3 · Breaks recorded

1. **The spec's hover selector outranked the invalid grammar** (found, cured). As specified, `…[data-state="off"]:hover:not(:disabled)` sits at (0,4,0) and beats `[data-invalid]`'s (0,3,0) red edge, so a pointer passing over an unselected item in an invalid group turned its edge ink-grey. Cured with `.toggle-group__item:where([data-state="off"]:not(:disabled)):hover` (0,2,0). The demo's invalid group now reads red on hover, as at HEAD. SPECS §D.1's state table should carry the selector.
2. **G-BUNDLE-RATCHET** (open): +3,153 unpacked bytes against a ratchet that forbids any increase. It is a release gate, so landing D has to move the datum.
3. **Playwright WebKit T-6** (open, not D's): the hover hang, SF-8.
4. **Playwright WebKit demo load crash** (open, pre-existing at HEAD, not isolated).
5. **Unmigrated-consumer DEV noise** (open by design, C-10): K1 and K2 log one refusal per item until they declare `cell`. The unmigrated preset tile is also taller, 61.58 → 70.17 px (canonical T-1: 208×70.17), because of the pill law's label `padding-block: 0.15em`.
6. **Every selected pill gains the full-ink edge.** The demo's "Many of N", "One of N" and "The row wraps" rows now show a near-black ring on the selected pill in light and a near-white one in dark. That is D's carrier, applied library-wide. It reads heavy in light (SF-4), and C and E will have to reckon with it on the pill as well as the tile.

## 4 · Gestalt read

All screenshots are under `S/shots/`. The tile crops come from the `p-*` builds, whose rest and selected paint is identical to `f-*`, since only the hover selector specificity differs. The demo screenshots are Chromium at DSF 1, 1440×900 and 390×900, viewport captures.

**The three consumer tiles, transcribed** (`shots/tiles/{preset,specimen,strip}-{light,dark}-{head,p}-{canon,mig}.png`).
- **Preset, HEAD:** four lozenges (30.79 px on 61.58 px). The selected "Snappy" is a slightly darker grey and otherwise indistinguishable.
- **Preset, migrated:** four 16 px cards with start-aligned name and readout. "Snappy" carries a crisp black 1 px edge in light and a white one in dark. It reads as an option card, not a pill.
- **Specimen, migrated:** a two-column card grid of curve portraits. The selected "ease-in-quad" is edged in full ink. The name stays centred, which is the consumer's typography and is kept. The grid sits 4 px inside FadingScroll, so the ring no longer clips.
- **Strip, migrated:** the family rows keep their inline layout. The 40-51 px wide tiles with a 16 px corner read as rounded squares close to a stadium (C-4). The selected "out" is ringed in white in dark.

**The demo's ToggleGroup story, 1440 and 390, light and dark, before and after** (`shots/demo/forms-toggle-{1440,390}-{light,dark}-{head,proto}.png`; the section alone in `tile-section-{1440,390}-{light,dark}-chromium.png`).
- HEAD has no tile section.
- The prototype adds "The tile": a 2×2 grid of preset cards (Gentle / Snappy / Bouncy / Wobbly with a mono readout), 16 px corners, "Gentle" selected with a full-ink edge. It stays 2×2 at 390 (169 px columns).
- The pill rows above it are the same size and on the same stadium, and their selected item gains the edge (§3 item 6).
- The invalid row keeps its red edges.
- Pixel diff against HEAD (`logs/pxdiff.log`): 7.007 % / 3.708 % of pixels moved by more than 10 levels at 1440 light / dark (rows 290-831, the new section and the edges), and 0.223 % / 0.222 % at 390 (rows 240-704).

**Chip and Card stories** (`shots/demo/forms-chip-*`, `display-card-*`, head and proto). No visible change. The pixel diff moves 0.000 % of pixels by more than 10 levels at every width and mode, and the sub-10-level churn is the ambient backdrop. The demo Chip `shape="cell"` sits on 16 px before (`--radius-card`) and after (`--radius-field`).

## 5 · Open gaps

1. Real Safari: every cell UNMEASURED (owner's safaridriver checkbox).
2. Playwright WebKit T-6 on every ToggleGroup scene (SF-8), and the Playwright WebKit load crash on the demo's `/forms/toggle` at HEAD. The WebKit demo gestalt cells are unmeasured because of it.
3. G-BUNDLE-RATCHET +3,153 bytes: D cannot pass `verify-export-types` without a datum move.
4. The iOS-27 commit (C-9, D-2): the commit is still a 180 ms colour-and-edge transition, and no witness measures a flood or a pop.
5. C-1 (a hard break in a production pill), C-2 (two lines inside the rung, 0 refusals measured), C-3 (a bare text node is clipped with no ellipsis), C-4 (the 16 px corner on the 40 px strip tile), C-6 (a second state on the border), C-7 (selected ink never reaches the media), C-8 (the fill reads 1.00:1 under PRT in both engines; the edge carries PRT alone), C-11 (`cell` has two meanings), C-12 (Chip's cell shares the corner and not the state).
6. The ring's reach as a token. The ring clearance still restates the 2 px offset as a literal.
7. V2 (`type="multiple" shape="cell"`) and chicago C1 were not mounted.
8. The full-ink selected edge on every pill (§3 item 6) is a library-wide visual change with no owner ruling behind it.
9. Hovered-unselected against selected (spec gap 9) was measured in Chromium only.
