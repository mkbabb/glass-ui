# D4 · pass 1 · D4-B · the choice card (prototype)

| field | value |
|---|---|
| seat | D4 pass 1, prototype seat for family D4-B. Read: `pass-1/SPECS.md` (§D4-B and SHARED FACTS only), `pass-1/D4-B.md`, `harness/HARNESS.md` |
| model | `claude-opus-5-5`, asserted from own system identity |
| verdict | **RUNS.** The spec is implemented on the real source. Typecheck is clean, every affected unit suite passes, the library and demo build, and the battery reproduces the spec's `b4` row for row in Chromium and Playwright WebKit |
| HEAD | the task named `91dbcbd8`; the checkout read `99839631`. `git diff --stat 91dbcbd8 HEAD -- src package.json vite.targets.ts scripts tests demo` printed nothing, so the `src/` under test is the tree the spec names. The worktree seeded at `99839631` |
| seed | a pre-limit run of this seat left `…/D4-B-proto/D4-B-proto.patch` in scratch; its worktree was gone. I read that patch hunk by hunk against the spec, applied it to a fresh worktree, and re-ran every number below myself. It is the research probe `d4b-probe.patch` plus the subpath exports, the demo stories and tests. §2 lists the five defects I found in it and fixed |
| engines | Chromium 149.0.7827.55 (`channel: "chromium"`) and Playwright WebKit 26.5, from `glass-ui/node_modules/playwright` 1.61.1, headless. Playwright WebKit is not Safari. Real Safari: UNMEASURED (owner's safaridriver checkbox) in every cell |
| load | load average 36-48 during the runs (other seats building). Two full-suite unit failures were timeouts under that load and pass in isolation (§3) |
| worktree | `…/scratchpad/D4/p1/D4-B-proto/wt`, `node_modules` and `tests-visual/node_modules` symlinked, Vite `cacheDir` pointed inside the worktree through wrapper configs in scratch (`lib.config.mjs`, `demo-wt.config.mjs`). Removed with `git worktree remove --force` before return. Git writes: worktree add and remove only. The patch was made with `git diff HEAD` plus `git diff --no-index /dev/null <file>` for the new files, so the worktree index was not touched |
| scratch | `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D4/p1/D4-B-proto/` (§8) |
| outputs | this file, and `pass-1/D4-B-proto.patch` (26 files, +710 / −250; it applies clean to a `git archive HEAD` tree: `git apply --check` passed). The patch was copied into the checkout byte for byte with `cp` rather than retyped through the Write tool, so that the critic applies exactly what was measured |

## 0 · In brief

1. **It runs.** `npm run typecheck` exits 0 (both passes) once `dist/` exists. Without `dist/`, the test pass reports two TS2307 errors on `@mkbabb/glass-ui/fourier-math`, and a `git archive` of HEAD reports the same two. The library build exits 0 and emits `choice.js`, `choice-*.js` (4417 B, gzip 1891 B) and `choice.d.ts`. The affected suites pass: 92 files, 1092 tests, 9 expected-fail.
2. **Battery, final tree (Chromium / Playwright WebKit).** The prototype turns W-B, T-3, T-6 and T-8 green; the red cells left belong to other families or to consumer paint (item 5).

   | witness | result |
   |---|---|
   | T-1 | 4/7 / 4/7 |
   | T-2 | 12/12 / 12/12 |
   | T-3 | **15/15 / 15/15** |
   | T-4 | 16/20 / 16/20 |
   | T-5 | 37/38 (Chromium only, CDP) |
   | T-6 | **24/24 / 24/24** |
   | T-7 | 8/12 |
   | T-8 | **16/16**; real Safari UNMEASURED |
   | W-B | **13/13** |

   Every number equals the spec's `b4` table.
3. **Five defects in the seeded patch, all fixed and re-measured** (§2):
   - A keyboard commit ran the fill and edge at 180 ms, not the spec's 60 ms.
   - The body slot rendered above the title.
   - `search.vue` lost an unrelated combobox comment.
   - Two test pins were left stale: the root runtime surface and the search tab stops.
   - The Chip README and the story manifest still named `cell`.
4. **Two breaks found beyond the spec, measured and not fixed** (§4):
   - Under `prefers-contrast: more` and forced colours, the global `accessibility.css` rule widens the selected card's border from 1 to 2 px. The content moves 1 px and the box grows 2 px, which contradicts "the layout never shifts".
   - The demo boots to a crash in Playwright WebKit on all 24 story pages, HEAD and patched alike.
5. **What stays RED is outside B**, as the spec said:
   - T-1 `wrap`: ToggleGroupItem, pill Chip, Button.
   - T-4 and T-7: the keyframes.js preset site's own dashed outline, re-targeted onto the card.
   - T-5 `tabs`: SegmentedTabs `semantics="toggle"`.
   - W-A, W-C, W-D, W-E: other families' witnesses.

## 1 · What was implemented, against the spec

| spec item (SPECS §D4-B) | state in the patch |
|---|---|
| `ChoiceGroup`: `type`, `size`, `minColumn` (12rem), `disabled`, `v-model`; engine role; auto-fill grid; `gap: --space-atom`; `padding: --space-residue`; `arrows: "grid"`; activation automatic / manual; `data-live` one frame after mount | as specified (`choice/ChoiceGroup.vue`, 83 lines) |
| `ChoiceCard`: `value`, `disabled`, `tone`; default / `#title` / `#meta` / `#mark({ selected })`; 16 px default check disc at `md`; head row only with a title or a mark; `<button>` with `itemAttrs` and roving tabindex; throws outside a group; DEV `console.error` on a focusable descendant | as specified (`ChoiceCard.vue`, 82 lines). The spec gives no slot order. The patch renders, in reading order, head (title + mark) → body → meta (§2 item 2) |
| geometry: `--radius-card`, pad `--space-atom` / `--space-body` (sm `--space-residue` / `--space-atom`), control-rung `min-block-size`, flex column | as specified |
| the register | as specified (`choice/styles.css`, 259 lines):<br>- the `::before` 2 px floored-tone perimeter (L ≤ 0.42 light, ≥ 0.80 `.dark`), opacity `--choice-edge-t`<br>- `--choice-fill` at `--fill-selected` on the image layer<br>- the `::after` normal-blend flood (8 % → 3 %, `z-index: -1`)<br>- meta `--muted-foreground-strong` → `--foreground`<br>- hover inside `(hover: hover)`: fill, `--ink-perimeter` border, floating cast, 1.015<br>- press `--scale-press-sm` (0.97)<br>- `choice-commit` 1 → 1.025 → 1<br>- PRM drops scale and pop<br>- forced colours paint `Highlight`<br>Registered: `--choice-fill` (no inherit) and `--choice-edge-t` / `--choice-flood-t` (inherit). One addition: the `[data-state="on"]` rule carries the commit's attack clock (§2 item 1) |
| engine: `RovingArrows = "axis" \| "grid"`, `rowNeighbour`, RTL flips Left/Right, `axis` default | +56 lines `useTabRovingFocus.ts` (type exported from that module), +4 `useSelectionGroup.ts`. Only `ChoiceGroup` passes `grid` |
| `/choice` subpath, `typesVersions`, root re-exports, `subpath-policy.mjs` `choice: "PUBLISH"` | as specified. `public-surface.spec.ts` root list gains `ChoiceCard`, `ChoiceGroup` |
| Card `selected` arm retired: Card.vue, `card/styles.css` (−92 lines with `@property --card-fill`), `Card.test.ts:75-90`, `paper.css` comment | as specified. The Card test now asserts that a consumer's `role` / `aria-selected` pass through `$attrs` and that no tab stop is added. `primitive-display.public-contracts.test-d.ts` asserts `Lacks<"selected", CardProps>` |
| Chip `shape="cell"` retired (`chipVariants.ts` −1, `glass-chip.css` −5); `mode="selectable"` kept | as specified. Chip README shape list and `demo/stories/manifest.ts:582` blurb corrected |
| demo: `display/card.vue` → the group; `data/search.vue:582` → listbox option; `forms/chip.vue:50` drops `shape="cell"` | as specified. `search.vue` rows carry `role="option"` and `aria-selected` through `$attrs`, and paint the active row's edge in a scoped rule |
| harness | `scenes.mjs` composes the choice card at K1, K2, V1 and the card board, plus the `multi` and `matrix` probe scenes (the research seat's scene file, unchanged) |

Library `src` delta: `choice/` +452 new lines, engine +60, Card and Card styles −107, Chip −6, `paper.css` −9, index +6 (`git diff HEAD --stat -- src`: 9 files, +71 / −130, plus the new directory).

## 2 · Breaks found in the seeded patch, and their fixes

1. **The keyboard commit ran at the release clock.** The spec gives the commit `--choice-fill` 60 ms and `--choice-edge-t` 60 ms. The patch reached 60 ms only under `:hover`, whose rule carries the attack clock. A commit by arrow key, with the pointer elsewhere, ran on the base rule's 180 ms. Probe `probes/commit-key.mjs`: pointer parked at (2, 2), ArrowRight, read `getAnimations()` on the newly checked card one frame later.

   | tree | Chromium | Playwright WebKit |
   |---|---|---|
   | seeded patch (cascade re-created by injected CSS, `commit-key-prefix.mjs`) | `--choice-fill 180ms`, `--choice-edge-t 180ms`, `opacity::after 300ms`, `choice-commit 120ms` (preset and specimen) | not run |
   | final | `--choice-fill 60ms`, `--choice-edge-t 60ms`, `opacity::after 300ms`, `choice-commit 120ms` | the same four, 60 / 60 / 300 / 120 ms |

   Fix: `.choice-card[data-state="on"]` declares the attack clock for the fill and the edge, and the release back to rest keeps the base rule's 180 ms. T-6 cannot see this, because its commit cell clicks with the pointer and so always hovers.
2. **The body rendered above the title.** In the Card story capture, the plan card read "The everyday plan. / Balanced ✓ / 4 seats · monthly". Fix: head → body → meta. None of the three consumer sites renders both a head and a body: K1 has no body, and K2 and V1 are `sm` with no title and no mark, so no head. Their cells are unchanged: T-1 heights 65.11 / 86.17 / 56.17 px, T-3 bands 1198.50 / 534.00 / 325.50 px², and T-6 light channel 10.46 % / 8.93 % in Chromium, the same before and after the reorder. The one composition that moves is a titled card with a body. V2 (a thumbnail strip with `#title` / `#meta`) would now read title → thumbnail → meta. That is untested (§7).
3. **`search.vue` lost a comment it does not own.** The seeded patch overwrote the BK π-CURE R4 comment on the combobox `<input>` with a comment about the result rows. Fix: that comment restored verbatim from HEAD. The stale R4 comment above the result Card, which explained the Card option clobber, is replaced by a five-line note on the new contract.
4. **Two test pins were stale.**
   - `public-surface.spec.ts` "keeps the exact root runtime surface" failed, because the root barrel gained `ChoiceCard` and `ChoiceGroup`. Fix: both added to `rootRuntimeExports`.
   - `search-contracts.test.ts:187` pinned `tabindex="0"` on every search row. Its own comment calls this "THE RESIDUAL, PINNED RATHER THAN LEFT TO DRIFT… when it is answered this line is the site that says so". Card's option arm produced 12 tab stops beside an `aria-activedescendant` field. With the arm retired, the rows carry no tabindex. Fix: the assertion is now `toBeUndefined()`, with a three-line comment naming the single focus model.
5. **Stale `cell` text.** `src/components/chip/README.md:19` listed `pill | cell | icon`, and `demo/stories/manifest.ts:582` said "pill, cell, and icon geometry". Both corrected.

## 3 · Unit, type and build

| step | command (in the worktree) | result |
|---|---|---|
| types | `npm run typecheck` | final tree with `dist/` present: exit 0, 0 errors. Before any build: the test pass printed 2 × TS2307 `@mkbabb/glass-ui/fourier-math` (`FourierField.smoke.test.ts:18,19`). `npx vue-tsc --noEmit -p tsconfig.test.json` on a `git archive HEAD` copy printed the same two, so this is the dist-absent condition, not the patch |
| affected suites | `npx vitest run tests/components/choice tests/components/card tests/components/chip.contract.test.ts tests/components/custom/tabs tests/components/custom/dock tests/components/ui/toggle-group tests/components/radio-group.contract.test.ts tests/gates tests/composables/motion tests/composables/search tests/styles tests/public-surface.spec.ts tests/demo` | `Test Files 92 passed (92)`, `Tests 1092 passed \| 9 expected fail`. It needs `dist/` and `dist-demo/`: before the builds, `boot-graph` (3), `public-surface` Row 8 (5) and `backdrop-prefix-normalization` arm (b) fail on absent artefacts, in both trees |
| full suite | `npx vitest run` | `Tests 2 failed \| 2316 passed \| 10 expected fail \| 1 skipped (2329)`. The two failures were `aurora/atoms.test.ts` "total-function fuzz" (timeout 5000 ms) and `menu/contract.test.ts` "restores focus on execute". Re-run alone: `2 passed, 36 tests passed`. Neither touches B's code. An earlier full run (before the search fix) failed only the search contract. `glass-subtlety.test.ts` "stands DOWN every backdrop root" also timed out once under load and passed alone (36/36) |
| library | `npx vite build --config …/lib.config.mjs` (the worktree's `vite.config.ts`, `cacheDir` in the worktree) | exit 0, `glass-ui:ready`, tuple `js/sfc-css/declarations/relays/styles/fonts/utilities/component-styles`. `dist/choice-*.js` 4417 B (gzip 1891 B). `dist/glass-ui.css` 47 874 B (gzip 9108 B), against 42 374 B (gzip 8206 B) for HEAD built the same way: +5500 B, +902 B gzip. The choice CSS lands in the shared sheet, not a per-subpath file |
| demo | `npx vite build --config …/demo-wt.config.mjs` (`demo/vite.demo-dist.config.ts`) | exit 0 in the worktree and in the HEAD copy; `boot-graph.test.ts` then 14/14 |

## 4 · The battery, final tree

`node harness/build.mjs <wt> --label proto` (and `--dev`), then `node harness/run.mjs --build out/builds/proto --out out --webkit` (log `logs/run-proto-final.log`, cells `logs/cells-final.txt`, JSON `out/runs/proto/`). "Playwright WebKit" throughout, never Safari.

| id | Chromium | Playwright WebKit | the cells, and whose the RED is |
|---|---|---|---|
| T-1 | FAIL 4/7 | FAIL 4/7 | Every choice-card holder is 16.00 flat, named `--radius-card` / `--radius-field`: preset 204 × 65.11 → 85.28 → 105.45; specimen 205 × 86.17 → 126.52; strip 40 × 56.17 and 51.23 × 56.17 → 96.52. RED: `wrap` ToggleGroupItem 20.00 → 23.95 → 39.24, pill Chip 10.70 → 32.11, Button 20 flat but unnamed. Not B's holders. Engines agree to 0.03 px |
| T-2 | PASS 12/12 | PASS 12/12 | none |
| T-3 | **PASS 15/15** | **PASS 15/15** | Bands in px², light / dark / PRT, against the carrier bar:<br>- preset 1198.50 / 1215.50 / 1207.50 against 269 (fill 1.40 / 1.55 / 1.46)<br>- specimen 534.00 / 552.75 / 543.00 against 291 (fill 1.18 / 1.28 / 1.24)<br>- strip 325.50 / 333.00 / 326.00 against 96<br>- card 1274.50 / 1287.50 / 1279.50 against 287<br>- chipcell 493.50 / 501.00 / 494.00 against 138<br>Playwright WebKit: preset 1200.50 / 1213.50 / 1206.25, specimen 535.75 / 553.25 / 543.00; its PRT cells take the forced level-0 path. Forced colours, reported: preset 1210.50, specimen 1113.00 (Chromium) |
| T-4 | FAIL 16/20 | FAIL 16/20 | RED, `preset-verbatim` only: the consumer's `outline: 1px dashed; outline-offset: -1px` paints 0.00 px on every side, light and dark, selected or not. Every choice-card scene is whole at 2.00 px. Reported: in Chromium forced colours the specimen ring reads 1.00 px on two sides (top/left for item 0, top/right for item 1) despite the 4 px group pad; Playwright WebKit forced reads 2.00 on every side |
| T-5 | FAIL 37/38 | n/a (CDP) | preset, specimen, card: `radiogroup` / `radio`, one stop, all four arrows move and check (Down 0 → 2, Up 2 → 0). strip: Right and Left move; the cross arrows report "no neighbour" (a single row). RED: `tabs`, SegmentedTabs `semantics="toggle"` reads `group` / `button` + `aria-pressed` |
| T-6 | **PASS 24/24** | **PASS 24/24** | Hover light channel, Chromium / Playwright WebKit:<br>- preset 10.47 % / 65.90 %<br>- specimen 8.93 % / 11.19 %<br>- card 76.25 % / 63.72 %<br>- chipcell 75.32 % / 63.80 %<br>Hover scale 1.015, press 0.97 × 0.97. Commit: four non-scale motions, `--choice-fill` 60 ms, `--choice-edge-t` 60 ms, `::after` opacity 300 ms, `choice-commit` 120 ms. PRM keeps the light channel at the same percentage; coarse 0.00 %. Info: the ToggleGroup `single` cell moves 0.00 % in Chromium and hangs in Playwright WebKit ("no answer within 120 s") — SF-8, not B's |
| T-7 | FAIL 8/12 | n/a | RED, `preset-verbatim` in all four states: the consumer's outline and its transparent border / washes. `specimen-verbatim` and `strip-verbatim` pass. The strip's content ink differs (reported): the consumer's label ink |
| T-8 | **PASS 16/16** | (both) | real Safari: UNMEASURED (owner's safaridriver checkbox) |
| W-B | **PASS 13/13** | n/a | exports `ChoiceGroup`, `ChoiceCard`. `preset · 4 multi-line items · slots [choice-card] · roles [radio] · used corner 16.00 · tab stops 1`; specimen 8 items and strip 6 read the same; the nine T-3 contract cells pass |
| W-A / W-C / W-D / W-E | 1/3, 5/7, 0/4, 0/6 | 1/3, —, 0/4, 0/6 | the other families' witnesses. W-C's card board is now a `radiogroup` with one stop and four moving arrows, and fails only on its `SelectionGroup` export and its stamp |

The first battery run on the seeded patch plus fix 1 (`logs/run-proto.log`) printed the same 21 verdict lines. The key cells compared before and after fix 2 are identical to the hundredth.

**Probes beyond the battery** (Chromium unless marked):

- **Grid keys** (`probes/keys-eng.mjs`, `logs/keys-{chromium,webkit}.log`). The choice-card rows are identical in Chromium and Playwright WebKit:

  ```
  specimen · 8 items, 2 cols × 4 rows · start 0: Down→2 Down→4 Down→6 Down→7 Right→0 Up→7 Up→5 Up→3 Up→0 Left→7 End→7 Home→0
  specimen (repeat(3,1fr)) · 8 items, 3 cols × 3 rows · start 4: Down→7 Up→4 Down→7 Down→0
  preset · 4 items, 2 cols × 2 rows · start 0: Down→2 Right→3 Up→1 Left→0
  preset dir=rtl · start 0: Right→3 Down→0 Left→1 Up→0
  strip · 6 items, 6 cols × 1 rows · start 0: Down→1 Down→2 Up→1 Right→2 End→5 Right→0
  ```

  Every move checked its target. The ToggleGroup `single` row reads `Down→0 Right→1` in Chromium. In Playwright WebKit its click timed out (SF-8).
- **`type="multiple"`** (`probes/multi-b.mjs`): `group` / `button` + `aria-pressed`, tab stops `[1]`. Click #0 gives `["dusk","dawn"]`, ArrowRight moves focus to 1 without toggling, and Space gives `["dawn"]` with pressed `true,false,false,false`.
- **KF-047 matrix** (`probes/matrix-b.mjs`):
  - DEV build: 4 `[ChoiceCard] holds an interactive descendant…` errors.
  - Production build: 0 errors.
  - Both builds: clicking the input focuses the INPUT and checks card 2, and ArrowRight inside the input moves focus to BUTTON#3 and checks it. The production keyboard fight stays open (§6).
- **Contrast arms** (`probes/contrast-shift.mjs`, preset, CDP `Emulation.setEmulatedMedia`):

  | mode | unselected | selected |
  |---|---|---|
  | default | border 1px, 204 × 65.11, title at (13, 9) | border 1px, 204 × 65.11, title at (13, 9) |
  | `prefers-contrast: more` | border 1px, 204 × 67.11, title at (13, 9) | border **2px**, 204 × 67.11, title at **(14, 10)** |
  | `forced-colors: active` | border 1px, 204 × 67.11, title at (13, 9) | border **2px**, 204 × 67.11, title at **(14, 10)** |

  The source is `styles/accessibility.css:11-22` and `:32-43`: `[data-state="on"]` (and `aria-checked` / `aria-pressed`) get `border-width: 2px !important`. The card's own perimeter layer already carries the state. In these two modes the global rule adds a second, layout-moving carrier. The rule is shared, so the fix belongs to whoever owns it, not to B. The spec's "the layout never shifts" holds in light, dark and PRT only.

## 5 · Gestalt read

`gestalt.mjs` writes to `gestalt/` (65 PNGs; logs `logs/gestalt-*.log`, JSON `gestalt/gestalt-chromium.json`). Consumer tiles are the harness scenes at HEAD (`out/builds/head`, built from a `git archive` copy) and at the prototype. Stories are `dist-demo` from the HEAD copy and from the worktree, `?capture=/<story>&mode=<m>`, at 1440 and 390, light and dark, DSF 1.

**The three consumer tiles, transcribed** (`tiles-{before,after}-{preset,specimen,strip,preset-verbatim}-{light,dark}-{chromium,webkit}.png`, geometry identical in both engines):

- **K1, keyframes.js presets.**
  - HEAD: 208 × 61.6 lozenges, `9999px`; the selected one is a slightly darker grey.
  - After: 204 × 65.1 cards at 16 px, name above `0.35 s · ζ 0.78` in mono, a check disc on the selected card.
  - In light, the selected edge is a near-black 2 px outline, heavy against the pale plate (counterexample 4). In dark it is a near-white 2 px outline.
- **K2, keyframes.js specimens.**
  - HEAD: 150.5 × 100.2 ovals, two per row in the left half of the host.
  - After: 205 × 86.2 cards filling both columns, curve and ball above the curve name. The selected card carries the violet tone in a 2 px edge, a violet wash and a darker name.
  - The FadingScroll fade reads as before.
- **V1, value.js strip.**
  - HEAD: 44 px circles, the selected one a pink filled 47.3 px circle.
  - After: `sm` cards 40 and 51.2 px wide by 56.2 tall. The `in-out` cards are wider (counterexample 5), and the glyph and label sit start-aligned in a narrow tile where HEAD centred them.
  - In dark the selected card is a white 2 px outline with no hue, because the scene passes no `tone`.

**ToggleGroup story** (`story-*-forms-toggle-*`): pixel-identical before and after at 1440 and 390, light and dark (0.00 % of pixels changed by more than 30 levels summed over RGB). B leaves ToggleGroup the single-line stadium.

**Chip story** (`story-*-forms-chip-*`): the change is confined to the Geometry row, rows 227-395 at 1440 (1.57-1.81 % of pixels) and 384-540 at 390 (3.26-3.73 %). The cell chip is gone, pill and icon remain, and the page blurb reads "pill and icon geometry".

**Card story** (`story-*-display-card-*`, `crop-*-display-card-*`):
- HEAD: "Selectable cards", two Cards with a fill-only selected state (a slightly darker plate).
- After: "Choice cards", a `radiogroup` of three cards (410.7 × 96.8 at 1440, one 410.7 px column; 342 × 78.3 at 390). Each reads title → blurb → mono meta.
- The selected card is marked by the 2 px edge (near-black in light, near-white in dark) and the check disc.
- The title (weight 500 at `--control-text`) and the blurb share a size, so the hierarchy is weaker than HEAD's `CardTitle`. That is a typography ruling I did not make.
- No horizontal overflow at 390 in any cell. At 390 the section sits below the fold. The 0.00 % full-page diff there is the fold, and the crops show the section.

**Playwright WebKit stories: not captured.** All 24 story pages, HEAD and patched, reported `Page crashed` before `data-capture-ready` (`logs/gestalt-webkit-stories.log`). The demo boot crashes Playwright WebKit whatever the patch. The harness scenes, which do not boot the demo, rendered in Playwright WebKit and are above. Real Safari: UNMEASURED (owner's safaridriver checkbox).

## 6 · What is still open (spec §B.5, with this seat's additions)

- Real Safari, every cell: UNMEASURED (owner's safaridriver checkbox).
- **The demo crashes Playwright WebKit on boot (24/24 pages, HEAD and patched).** Nothing in this seat's gestalt reads the demo in WebKit.
- **Contrast arms move the selected card's content by 1 px** (§4). The owner of `accessibility.css` has to rule whether a component with its own perimeter layer is exempt, or whether the rule becomes a non-layout carrier.
- **Chromium forced colours cut the specimen ring to 1.00 px on two sides** despite the 4 px pad. It is reported, not gated, and not diagnosed.
- **Slot order** is a choice this seat made (head → body → meta), not a ruling. A thumbnail-first composition (V2) reads title first under it.
- **Title and body typography** in a text card: one size, weights 500 and 400.
- The interactive-descendant refusal is DEV-only. The production keyboard fight is measured (§4, matrix). E-2 is unruled.
- The shared item registry (P-3): not prototyped. `choice/context.ts` (26 lines) and `toggle-group/context.ts` both exist.
- F1, V2 and C1 are not transcribed into the harness. The `multiple` mode ran through one probe, not the battery.
- No witness holds the commit bar above "a non-scale transition runs". T-6 also cannot see a keyboard commit (§2 item 1), so the key path rests on `commit-key.mjs`.
- The cost of 28 blurred cards in a scroll port: not measured.
- A pale-tone consumer against the L 0.42 floor: not measured.
- A consumer class can override the group's ring-clearance padding: utilities outrank `@layer components`. Nothing enforces "may not replace the padding". It is a rule in prose.
- A MIGRATION.md entry for the major (Card `selected`, Chip `shape="cell"`, the `/choice` subpath) is owed. The patch writes none.
- `vue-tsc` does not flag a stale `<Chip shape="cell">` (E-11, SF-19). The patch removes the one site, and no guard is added.
- Named counterexamples still open (D4-B §6): 1 (a second state on one tile), 4 (the neutral tone is heavy; visible in §5), 5 (V1's ragged squares; visible in §5), 6 (the fill is decorative), 9 (retired bindings no-op silently), 12 (surface area and D1 placement).

## 7 · Commands, as run

`S` = the scratch root, `W` = `$S/wt`, `H` = `$W/docs/tranches/BL/design/tile/harness`.

```sh
git worktree add --detach $W HEAD                           # 99839631
ln -s …/glass-ui/node_modules $W/node_modules; ln -s …/glass-ui/tests-visual/node_modules $W/tests-visual/node_modules
(cd $W && git apply $S/D4-B-proto.patch)                    # the seed; then the §2 edits
git archive HEAD | tar -x -C $S/head-tree                   # HEAD baseline copy, node_modules symlinked
npm run typecheck                                           # in $W
npx vitest run <affected suites>                            # in $W and $S/head-tree
npx vitest run                                              # full, in $W
npx vite build --config $S/lib.config.mjs                   # lib, $W; $S/lib-head.config.mjs for HEAD
npx vite build --config $S/demo-wt.config.mjs               # demo, $W; demo-head-tree.config.mjs for HEAD
node $H/build.mjs $W --label proto --out $S/out             # and --label proto-dev --dev
node $S/head-tree/docs/…/harness/build.mjs $S/head-tree --label head --out $S/out
node $H/run.mjs --build $S/out/builds/proto --out $S/out --webkit
node $S/probes/commit-key.mjs $S/out/builds/proto           # and commit-key-prefix.mjs
ENG=chromium|webkit node $S/probes/keys-eng.mjs $S/out/builds/proto
node $S/probes/multi-b.mjs $S/out/builds/proto
node $S/probes/matrix-b.mjs $S/out/builds/proto-dev $S/out/builds/proto
node $S/probes/contrast-shift.mjs $S/out/builds/proto
node $S/gestalt.mjs chromium; STORIES_ONLY=1 node $S/gestalt.mjs webkit   # tiles in webkit came from the first webkit pass
{ git diff HEAD; for f in <untracked src tests>; do git diff --no-index -- /dev/null $f; done; } > $S/D4-B-proto.patch
git worktree remove --force $W
```

## 8 · Artefacts

Under `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D4/p1/D4-B-proto/`:

- `D4-B-proto.patch`: the whole change, the same bytes as `pass-1/D4-B-proto.patch`.
- `typecheck.log`, `vitest-wt*.log`, `vitest-head.log`, `vitest-full*.log`: the unit and type runs.
- `lib-build.log`, `lib-build-head.log`, `demo-build-*.log`: the build logs.
- `logs/run-proto.log`, `logs/run-proto-final.log`, `logs/cells.txt`, `logs/cells-final.txt`, `out/runs/proto/*.json`: the battery.
- `out/builds/{proto,proto-dev,head}/`: the scene bundles.
- `logs/keys-*.log` and `probes/*.mjs`: the probes.
- `gestalt/*.png`, `gestalt/gestalt-chromium.json`, `logs/gestalt-*.log`: the gestalt captures.
- `head-tree/`: the `git archive` HEAD copy with its `dist/` and `dist-demo/`.
