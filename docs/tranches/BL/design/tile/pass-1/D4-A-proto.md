# D4 · pass 1 · D4-A · prototype

| field | value |
|---|---|
| seat | D4 pass 1, prototype seat for D4-A (the corner reads the box). Read `pass-1/SPECS.md` (D4-A and SHARED FACTS only), `pass-1/D4-A.md`, `harness/HARNESS.md`. No other family's spec was read |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the task named `91dbcbd8`; the checkout and the worktree read `99839631`. Every `src/` cite in SPECS still matched the tree the patch applies to (the patch applies cleanly and reverse-applies at `99839631`) |
| verdict | **RUNS.** Arm A1 (closed form) plus the selected-edge floor, built on the real source, typechecked, unit-tested, library-built, demo-built and run through the whole battery in Chromium and Playwright WebKit. Arm A2 was not built here (see §1.3) |
| patch | `docs/tranches/BL/design/tile/pass-1/D4-A-proto.patch` (`git diff` in the worktree at `99839631`; 11 files, +119 / −64). The checked-in copy's blank context lines carry no leading space. `git apply --check -R` passes on it in the patched worktree, so it applies at `99839631`. The byte-exact `git diff` output is `D4-A-proto.final.patch` in scratch |
| engines | Chromium 149.0.7827.55 (`channel: "chromium"`) and Playwright WebKit 26.5, from `glass-ui/node_modules/playwright`, headless. Playwright WebKit is not Safari. Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox) |
| instruments | worktree `…/scratchpad/D4/p1/D4-A-proto/wt` (node_modules symlinked; removed with `git worktree remove --force` before return). Vite and vitest caches pointed into the worktree by three untracked wrapper configs that are not in the patch. The banked harness, run unmodified from the checkout, plus a scratch copy `hw/` with one added line (`@source "${wt}/src/components/**/*Variants.ts"`, SF-20) and the playwright root made absolute. Scratch probes: `shoot.mjs` (demo stories), `tiles.mjs` (consumer tiles, the rung-less reader, the invalid group), `invalid.mjs` |
| load | load average 22-55 during the runs (other seats). Geometry and paint numbers are settled reads; no number below is a wall-clock timing |

Scratch root for every path below: `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D4/p1/D4-A-proto/`.

## 0 · In brief

1. **A1 plus the floor edge runs as specified and turns its cells green in both engines.** T-1 8/8 · 8/8 (HEAD 3/8 · 3/8), T-2 12/12 · 12/12 (unchanged), T-3 8/15 · 8/15 (HEAD 2/15 · 2/15), T-8 16/16 (HEAD 0/16), W-A 2/3 · 2/3 on the banked harness and **3/3 · 3/3** on the harness with the chip's utilities emitted (HEAD 1/3 · 1/3 on either). Every other witness reads exactly as at HEAD, except W-B, which rises from 1/13 to 7/13 because its six contract T-3 cells are the preset and specimen cells the floor edge turns green. W-B is still RED by absence.
2. **Typecheck, units and builds are green on the final tree.** `npm run typecheck` exits 0. The affected suites pass 33 files (526 passed, 5 expected-fail). The full suite passes 239 files (2314 passed, 10 expected-fail, 1 skipped). The library build and the demo build exit 0.
3. **The spec as written broke one cell, and the patch fixes it.** On a coarse pointer, a `mode="removable"` Chip is floored at 44 px by its own rule, but the spec gives only `.glass-chip--interactive` the coarse rung. The demo's "Fourier ×" chip therefore painted a 15.8 px corner on a 44 px one-line box, a stadium lost (§3 B-1). The patch states the touch floor once (`--chip-floor`), and both the box and the rung read it. The demo's coarse chip cell then diffs at 0 px against HEAD.
4. **Two breaks the patch does not fix.** Both are measured and stated in §3:
   - **A holder's rung inherits.** A plain box that reads `var(--radius-control)` inside a ToggleGroupItem gets the item's 20 px, not the stadium (B-2). A registered, non-inheriting `--control-rung` cures it, but the battery's T-1 then reads 3/8, because the harness names roles through a probe child. The variant was built, measured and reverted.
   - **Validity and selection share one channel.** Inside an invalid ToggleGroup, the selected item's floor edge loses to `--destructive` at (0,3,0) against (0,2,0). Selected and unselected then paint the same red edge in both engines (B-3).
5. **The gestalt.** At fine pointer the preset lozenges become 20 px rounded rectangles and the specimen ovals become 18 px soft squares. The selected tile reads at a glance through a 1 px full-ink edge in light, dark and PRT. On a coarse pointer the preset tile's corner is 30 px on a 61.6 px box, 0.97 of h/2: it looks the same as the HEAD lozenge (C-2, now visible, §5.1). No witness runs a coarse T-1. The ToggleGroup demo story changes only in its selected edges (≈1130 px per 1440 wide shot). The Chip and Card stories are pixel-identical to HEAD in every cell, coarse included.

## 1 · What was built

### 1.1 The patch, file by file

| file | change | source of the change |
|---|---|---|
| `src/styles/theme/radius.css` | `--radius-control: calc(var(--control-rung) / 2)` in `@theme static`; `:root { --control-rung: calc(var(--radius-pill) * 2) }`; `@layer base { :where(*) { --radius-control: calc(var(--control-rung) / 2) } }`; the header role table's control row reads `rung/2` and the field row narrows to text entry | SPECS A.1 (arm A1), verbatim |
| `src/components/button/styles.css` | `--control-rung: var(--button-size); border-radius: var(--radius-control)` replaces `calc(var(--button-size) / 2)` and its 15-line comment | SPECS A.1 holders |
| `src/components/toggle-group/styles.css` | `--control-rung: var(--toggle-group-item-size); border-radius: var(--radius-control)` replaces `var(--radius-pill)`; `.toggle-group__item[data-state="on"] { border-color: var(--foreground) }`, the floor edge; the header comment says the on-state recolours the register's border and authors none (G-TOGGLE-REGISTER forbids a `border:` shorthand, and still passes) | SPECS A.1 holders and "The selected register" |
| `src/styles/glass/glass-chip.css` | the rung, `padding-block: var(--chip-pad-block)` and `border-radius: var(--radius-control)` on `.glass-chip`; four size classes carrying `--chip-pad-block` (.125 / .25 / .375 / .5 rem); the coarse arm states `--chip-floor` once for interactive and removable chips, and the rung is `max(calc(1lh + 2 × pad), var(--chip-floor, 0px))` | SPECS A.1 holders, **amended** by B-1 |
| `src/components/chip/chipVariants.ts` | `py-*` leave `SIZE` for `glass-chip--{size}` | SPECS A.2 |
| `src/components/_shared/disclosure/disclosure.css` | `.disclosure-group-trigger { --control-rung: max(2.75rem, calc(1lh + 2rem)) }` | SPECS A.1 holders |
| `DESIGN.md:385-386` | the A1 amendment: `--radius-control` is `calc(var(--control-rung) / 2)`, rung/2, "a control, one line or wrapped"; `--radius-field` narrows to text-entry fields | SPECS A.5 names this ruling as the owner's. The patch carries it because A1 without it contradicts the canon it ships with. **The owner rules whether it lands** |
| four test files | the five source-text pins SPECS A.2 names, re-pointed; the canon test gains "the control role is half the holder's own rung, re-declared on every element" and "each control holder publishes its rung and reads the control role" | SPECS A.2 |

### 1.2 Deviations from SPECS A.1, each with its cause

- **The chip's coarse rung** covers removable chips through one `--chip-floor` fact (B-1, measured).
- **The DESIGN.md amendment** is in the patch (above). Remove those two hunks if the owner keeps the 16 px row, which forces A2.
- **One variant built and reverted:** `@property --control-rung { syntax: "<length>"; inherits: false; initial-value: 19998px }` in place of the `:root` rule (B-2). It is not in the patch.

### 1.3 A2

A2 was not prototyped. Its costs are the research seat's measurements (SF-15; D4-A §3.2), and the harness reads T-1 and W-A synchronously, so an A2 build fails `wrap` on a read the family cannot change (SPECS A.3, A.5). A2 needs every holder declaration this patch makes, plus `_shared/extent/`, the registered rung and the token switch. The research seat's `a2.patch` is the starting point.

## 2 · Build and unit evidence

| step | command (in the worktree) | result |
|---|---|---|
| typecheck | `npm run typecheck` | exit 0 (`logs/typecheck-final.log`). Before `dist/` exists the second `vue-tsc` pass fails on `FourierField.smoke.test.ts:18-19`, `Cannot find module '@mkbabb/glass-ui/fourier-math'`: a package self-import that needs a built `dist/`. It is build order, not the patch |
| affected units | `npx vitest run tests/components/button tests/components/chip.contract.test.ts tests/components/ui/toggle-group tests/components/accordion.contract.test.ts tests/components/collapsible.contract.test.ts tests/styles` | 33 files, 526 passed, 5 expected-fail (`logs/vitest-affected2.log`) |
| full suite | `npx vitest run` | 239 files, 2314 passed, 10 expected-fail, 1 skipped (`logs/vitest-full-final.log`). An earlier full run under load 40 had 3 files fail: two 5 s timeouts (`glass-subtlety.test.ts:949`, `aurora/atoms.test.ts:141`) that pass alone, and `boot-graph.test.ts`, which needs `dist-demo/` and passes 14/14 once the demo is built (`logs/vitest-rerun-patched.log`, `logs/vitest-bootgraph-patched.log`) |
| library build | `vite build` (cacheDir in the worktree) | exit 0. `dist/styles/theme/radius.css` carries `:root{--control-rung: calc(var(--radius-pill) * 2);}` and `@layer base{:where(*){--radius-control: calc(var(--control-rung) / 2);}}`; `dist/glass-ui.css` carries the item, trigger and on-state rules (`logs/lib-build-final.log`) |
| demo build | `vite build --config demo/vite.demo-dist.config.ts` (cacheDir in the worktree) | exit 0 for HEAD (`demo-before/`) and the final tree (`demo-after/`) |

## 3 · Breaks

**B-1 · fixed in the patch: the removable chip's coarse rung.** As specified, `@media (pointer: coarse)` lifts the rung only for `.glass-chip--interactive`, while `.glass-chip[data-mode="removable"]` sets `min-block-size: var(--touch-target)`. A removable chip on a coarse pointer is a 44 px box on a 31.6 px rung, so its one-line corner is 15.8 px, not h/2. Measured in the demo Chip story at 390 wide, coarse, Chromium: "Fourier ×" 124.5×44, HEAD `9999px` → 22, spec `15.7969px` → 15.8, patch `22px` → 22. The paint diff against HEAD went from 178 px to 0 px (`shots/demo-report.json`). This is C-4 (the rung and the floor disagree) in a second holder. The fix makes the floor one fact that both the box and the rung read (P-3).

**B-2 · open: the rung inherits, so a reader inside a holder takes the holder's corner.** SPECS A.1 says "any `--radius-control` reader that publishes no rung resolves to the stadium limit". That holds only outside a holder: `:where(*)` re-declares the role on every element, but against the rung it *inherits*. Probe (`tiles.mjs`, the preset scene): a 80×60 box with `border-radius: var(--radius-control)` reads `9999px` as a child of `body` and **`20px` as a child of a ToggleGroupItem**, in Chromium and Playwright WebKit (HEAD: `9999px` in both places).
- No library reader of `--radius-control` sits inside a holder today (`.menu__trigger:focus-visible`, `.input-bar`, `.disclosure-trigger` and the holders themselves are the readers). The leak is live for a consumer's `rounded-control` child of a Button, Chip or ToggleGroupItem.
- The cure is `@property --control-rung { syntax: "<length>"; inherits: false; initial-value: 19998px }`, which replaces the `:root` rule. Built as `proto3` (`logs/battery-proto3-registered-variant.log`, `tiles-registered-variant/`): the inner reader reads `9999px` in both engines, the geometry is unchanged (preset 20 px flat, specimen 18 px flat), and the canon and component suites pass. But T-1 falls to **3/8 · 3/8**, every ToggleGroupItem, Chip and Button row reading `named none`.
- The cause is the witness. `lib.mjs:230-239` resolves a role name by appending a probe child to the item and reading `border-radius: var(<name>)` on the child, so it measures a descendant's role, not the item's. The patch keeps the spec's inheriting form. Choosing the registered form needs a harness ruling on what "named in the item's context" means (read the item's own `--radius-control` against its used corner).

**B-3 · open: validity and selection share the border.** `.toggle-group[data-invalid] .toggle-group__item { border-color: var(--destructive) }` is (0,3,0) and the floor edge `.toggle-group__item[data-state="on"]` is (0,2,0). With `data-invalid` stamped on the preset group and 800 ms to settle (`invalid.mjs`), the unselected, selected and unselected items read `rgb(219, 36, 36)` / `rgb(219, 36, 36)` / `rgb(219, 36, 36)` in light and `oklch(0.702 0.184 27.5)` ×3 in dark, in Chromium and Playwright WebKit alike. In an invalid group the selection falls back to the 1.2:1 fill plus ink and weight, the state T-3 fails at HEAD. `tiles/preset-invalid-light-chromium-final.png` shows it: four red-edged tiles, the selected one only a shade darker. SF-5 gives `border` to the selected carrier, and the invalid arm spends the same channel. The floor needs a rule for the pair (a second carrier for one of the two, or a documented precedence). A does not own state, so this is the floor's to settle, and no witness covers it.

**B-4 · spec text: the banked harness now half-fixes itself.** Moving the chip's block pad into `glass-chip.css` means the banked harness, which does not `@source` `chipVariants.ts` (SF-20), now emits `.glass-chip--md` and gets the block pad. It still misses `px-3.5`. So the banked pill chip is 25.91×33.41 (HEAD 25.9×21.4), its one-line corner is width-clamped to 12.95 (÷h/2 0.78), and W-A reads 2/3. The widened copy gives 53.91×33.41 and 3/3. W-A's third cell is the harness's, as SPECS A.3 says.

**B-5 · by design, recorded: the icon chip's pad.** At HEAD, `py-1.5` beat the icon shape's `p-0` in the utilities layer, so the 40×40 icon chip carried 6 px of block padding. Under the patch the pad is a components-layer declaration and `p-0` wins (0 px). The box is fixed by `size-10` and the glyph is centred, so the Chip story diffs at 0 px in all six cells.

## 4 · The battery

`node harness/run.mjs --build out/builds/<label> --out out --webkit` from the checkout (banked harness), and `node hw/run.mjs … --only T-1,T-3,W-A` on the widened copy. Cells read Chromium · Playwright WebKit. `head` is `99839631`; `final` is the patch.

| witness | HEAD (`logs/battery-head.log`) | final (`logs/battery-final.log`) | change |
|---|---|---|---|
| T-1 | FAIL 3/8 · 3/8 | **PASS 8/8 · 8/8** | preset `rung 40 · 208×61.58 20px→20 \| 81.75→20 \| 101.92→20 · named --radius-control`; specimen `rung 36 · 150.53×100.16 18px→18` flat; wrap ToggleGroupItem 20, pill Chip 16.70, Button 20, all flat and named `--radius-control`; card and chipcell 16 (unchanged) |
| T-2 | PASS 12/12 · 12/12 | PASS 12/12 · 12/12 | none |
| T-3 | FAIL 2/15 · 2/15 | FAIL **8/15 · 8/15** | preset and specimen pass in light, dark and PRT on the edge band alone (the table below). Strip light and PRT, card ×3 and chipcell light and PRT stay RED: Chip's flood and Card's arm, which A does not touch |
| T-4 | FAIL 8/20 · 8/20 | FAIL 8/20 · 8/20 | none: the FadingScroll port cut (specimen top/left 1.00 px Chromium, 0.50 px Playwright WebKit) and the consumer's dashed outline (preset-verbatim 0.00 px) |
| T-5 | FAIL 19/38 | FAIL 19/38 | none (dead cross axis; strip, card and chipcell ARIA) |
| T-6 | FAIL 17/24 · 9/14 | FAIL 17/24 · 9/14 | none. The Playwright WebKit preset and specimen cells are "no answer within 120 s (hung)", SF-8 unchanged |
| T-7 | FAIL 4/12 | FAIL 4/12 | the diff text changes: preset-verbatim reads `20px → 16px` (HEAD `9999px → 16px`), specimen-verbatim `18px → 16px`. The consumer's own corner rule is still consumer paint |
| T-8 | FAIL 0/16 | **PASS 16/16**, real Safari UNMEASURED | T-1 and T-3 on preset and specimen, both engines |
| W-A | FAIL 1/3 · 1/3 | FAIL 2/3 · 2/3 (B-4) | ToggleGroupItem Δ 19.24 → 0.00 px; Button unchanged PASS |
| W-B | FAIL 1/13 | FAIL 7/13 | the six contract T-3 cells on preset and specimen now pass; the export and slot cells stay RED by absence |
| W-C · W-D · W-E | 0/7 · 0/4 · 0/6 | unchanged | other families' centres |

**Widened harness** (`logs/battery-headw.log`, `battery-protow.log`, `battery-finalw.log`):

| witness | headw | final (widened) |
|---|---|---|
| T-1 | 3/8 · 3/8 (pill Chip `53.91×33.41 9999px→16.70 \| 76.22→38.11 \| 119.03→55.00`) | 8/8 · 8/8 (pill Chip `16.70` flat, named `--radius-control`) |
| T-3 | 2/15 · 2/15 | 8/15 · 8/15 |
| W-A | 1/3 · 1/3 (ToggleGroupItem Δ 19.24, Chip Δ 38.30) | **3/3 · 3/3** (all Δ 0.00 px) |

**T-3 on the floor edge**, final build (fill ratio; ≥ 3:1 edge area against the carrier bar):

| cell | Chromium | Playwright WebKit |
|---|---|---|
| preset light / dark / PRT | 1.21 / 1.22 / 1.00; 322.5 / 338 / 322.5 px² against 269 | 1.21 / 1.22 / 1.00; 413 / 426.5 / 411 px² against 269 (PRT on the forced level-0 path) |
| specimen light / dark / PRT | 1.19 / 1.22 / 1.00; 389 / 406.75 / 389 px² against 250 | 1.20 / 1.22 / 1.00; 426.25 / 441.5 / 427.5 px² against 250 |

The fill carries nothing in PRT (1.00:1), and the edge carries every cell.

## 5 · Gestalt

### 5.1 The three consumer tiles, transcribed (`tiles/`, `logs/tiles.log`)

Scenes `preset` (keyframes.js SpringPhysicsFacet), `specimen` (keyframes.js EasingTarget) and `strip` (value.js EasingSpecimenStrip), second item selected. HEAD on the left, the patch on the right, in `tiles/sheet-{preset,specimen,strip}-{chromium,webkit}.png`.

| tile | HEAD | patch | what it looks like |
|---|---|---|---|
| preset 208×61.6, fine | `9999px` → 30.79, a lozenge | 20 px (÷h/2 0.65) | a rounded rectangle; the four tiles read as a 2×2 set of cards. The selected tile (Snappy) has a crisp 1 px near-black edge in light and a near-white edge in dark; in PRT the fills are identical and the edge alone says which one is on. In dark the white edge is bold beside the 14 % siblings (SF-4's "heavy", seen) |
| preset, coarse | 30.79 | **30 px (÷h/2 0.97)** | indistinguishable from the HEAD lozenge. The rung is 60 on coarse, so A1's corner is 30 on a tile that is 61.6 tall. A1 cures nothing on this tile on touch, while A2 would paint 16 (SPECS A.1 table). The coarse owner glance SPECS A.5 says is owed is now captured: `tiles/preset-light-coarse-{chromium,webkit}-{head,proto}.png` |
| specimen 150.5×100.2 | → 50.08, an oval | 18 px (÷h/2 0.36) | soft-cornered squares; the curve plots gain room at the corners. The selected tile's edge reads the same way as on the preset |
| strip 44×44 | 22, a circle | 22, a circle | unchanged: `shape="icon"` is a declared circle. Its two rows (glyph and label) are not a corner defect |
| nesting | | | the 20 px tiles sit inside the scene's host plate, whose corner is visibly tighter, so the tiles read rounder than their container (C-10, seen) |

Playwright WebKit renders every cell with the same geometry to 0.03 px and the same edge colour (`rgb(28, 25, 23)` light, `rgb(233, 230, 226)` dark).

### 5.2 The demo stories (`shots/`, `logs/shoot.log`, `shots/demo-report.json`)

Chromium, `/forms/toggle`, `/forms/chip`, `/display/card`, 1440 and 390 wide, light and dark, reduced motion, fonts awaited. Two coarse cells were added (390, light, `hasTouch` and `isMobile`) for ToggleGroup and Chip. `before` is HEAD, `after` is the patch. Pixels moved by more than 10 levels:

| story | 1440 light | 1440 dark | 390 light | 390 dark | 390 coarse |
|---|---|---|---|---|---|
| ToggleGroup | 1132 (0.079 %) | 1129 (0.078 %) | 783 (0.201 %) | 778 (0.199 %) | 1132 (0.290 %) |
| Chip | 0 | 0 | 0 | 0 | 0 (178 px before the B-1 fix) |
| Card | 0 | 0 | 0 | 0 | not shot |

- **ToggleGroup.** Every item in the story is one line (40 px fine, 60 px coarse), so every corner is the same before and after: `9999px` → 20 before, `20px` → 20 after, and 30 on coarse. The moved pixels are the selected items' edges exactly (B, align-left, Comfortable, Balanced): the edge goes from `color(srgb … / 0.14)` to `rgb(28, 25, 23)` in light and `rgb(233, 230, 226)` in dark. The selected pills read as outlined and filled, where HEAD's read as a slightly darker fill. The invalid group keeps its red edges.
- **Chip.** Pill chips are 35 px tall, and `9999px` → 17.48 becomes `17.4688px` → 17.47, which is h/2. The cell chip stays 16 px and the icon chips stay circles. It is identical in paint in all six cells.
- **Card.** Not a holder. Identical.

A first capture raced the web font (the dark ToggleGroup "before" painted in the fallback sans, 5.6 % moved). The script now awaits `document.fonts.ready`, and both arms report Plus Jakarta Sans and Fira Code loaded.

## 6 · Chrome and WebKit

- Geometry agrees to 0.03 px on every T-1 cell, and the coarse, rung-less and invalid probes read the same in both engines.
- The T-3 edge areas are larger in Playwright WebKit (413 against 322.5 px² on the preset in light). Both clear the bar.
- The ToggleGroupItem hover hang (SF-8) is unchanged: T-6 Playwright WebKit preset, specimen and single are "no answer within 120 s (hung)". The patch does not touch `--control-surface-bg-hover`.
- The registered-rung variant (B-2) behaves the same in both engines.
- Real Safari: UNMEASURED (owner's safaridriver checkbox) in every cell.

## 7 · Open

- The owner's ruling on `DESIGN.md:385-386`. The patch carries the A1 amendment; the coarse cell (§5.1: 30 px on 61.6, which reads as HEAD's lozenge) is the evidence C-2 asked for.
- B-2: keep the inheriting rung (spec, T-1 green, consumer leak), or register it non-inheriting (no leak, T-1 3/8 on the harness's child-probe naming). Either way it needs a harness ruling on "named in the item's context".
- B-3: the floor's rule for a selected item in an invalid group. No witness covers it.
- T-1 has no coarse cell, so A1's coarse lozenge passes every witness.
- The harness `@source` widening (SF-20). Until it lands, W-A reads 2/3 on this patch.
- Button's coarse rung/floor split (C-4) is untouched. The Chip's is closed by `--chip-floor` (B-1), which is the same shape of fix Button would take.
- CollapsibleTrigger has no rung (C-3).
- The consumer `rounded-pill` / `rounded-full` override (C-7) and the DEV warning (SPECS A.5) were not built.
- A1's universal-rule style-recalc cost (C-9) was not re-measured here.
- Real Safari for every cell: UNMEASURED (owner's safaridriver checkbox).

## 8 · Artefacts

Under the scratch root:
- `out/builds/{head,proto,proto2,proto3,final}/`, `outw/builds/{headw,protow,proto2w,proto3w,finalw}/`: the scene bundles.
- `out/runs/<label>/*.json`, `outw/runs/<label>/*.json`: every witness's cells.
- `logs/battery-{head,proto,proto2,final,headw,protow,finalw}.log` and `logs/battery-proto3-registered-variant.log`: the printed runs.
- `logs/proto-cells.txt`: every cell line of the `proto` run. `proto` and `final` differ only in the chip's coarse floor, and their battery lines are identical.
- `logs/{typecheck-final,vitest-affected2,vitest-full-final,lib-build-final}.log`.
- `demo-before/`, `demo-after/`: the demo builds.
- `shots/`: 28 story PNGs plus `demo-report.json`.
- `tiles/`: consumer tile PNGs, contact sheets, `tiles.json`, and the invalid-group captures.
- `tiles-registered-variant/`: the B-2 variant's tile reads.
- `proto.patch`: the spec-only patch, before B-1.
- `D4-A-proto.final.patch`: identical to the checkout's `.patch`.
- `prior/`: artefacts from this seat's run that the session limit stopped. Nothing here cites them.
