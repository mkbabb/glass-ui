# D4 · the tile witness battery (pass 1)

| field | value |
|---|---|
| seat | D4 pass 1, battery seat. Promotes the round-0 scratch probes (`probe.mjs`, `wk.mjs`, `keys.mjs`, `ring-noselect.mjs`, `shapes.mjs`, `wrap.mjs`, `tabs.mjs` and the ten-scene harness, PORTFOLIO.md §1, §8) into durable tooling: T-1..T-8 (§1.1) and the five family witnesses (§7) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | measured at `991067c8`. `git diff --stat 91dbcbd8 991067c8 -- src vite.targets.ts package.json` is empty: `src/` is the tree the portfolio names |
| engines | Chromium 149.0.7827.55 (`channel: "chromium"`) and Playwright WebKit 26.5, from `glass-ui/node_modules/playwright` 1.61.1, headless, 1000×900 at DSF 2. Playwright WebKit is not Safari. Real Safari: UNMEASURED (owner's safaridriver checkbox) in every cell |
| consumers | keyframes.js `dd7eae52` (the tile files are byte-identical to `87bcc597`, the revision `scenes.mjs` transcribes); value.js `494f8004` working tree. Read-only |
| load | load average 120 / 67 / 53 at the first run (other seats building). Every number is a settled static read or a real input event; none is a wall-clock timing |

## 1 · What it is

A build of one scene page against any worktree's `src`, and thirteen witness scripts that read that page. Each witness prints PASS or FAIL per cell with the measured numbers, writes JSON, and exits 0 on PASS, 1 on FAIL, 2 on a harness error or a hang. Every read is painted pixels (screenshots decoded with pngjs), computed style and layout geometry, the CDP accessibility tree, or a real key press, pointer event or touch tap. No witness reads source text. Radius role names are enumerated from the live CSSOM (`document.styleSheets`) and each is resolved in the item's own context.

| file | role |
|---|---|
| `build.mjs` | `node build.mjs <worktree> [--label head] [--out <dir>] [--dev]`. Writes the scene app into `<out>/builds/<label>/app`, bundles it with Vite (cache and dist in the same folder, nothing written to the worktree), `@glass` aliased to `<worktree>/src`. Production SFC compile by default; `--dev` for a DEV-only refusal. When the worktree carries `src/components/choice/` or `src/components/selection/`, the app imports it and publishes its export names on `window.__tile.exports` |
| `scenes.mjs` | The scene registry (which witness each scene gates or reports) and the scene app. Declares the DOM contract the witnesses read |
| `fixtures.mjs` | The minimal fixture: one hand-made page on the same contract that satisfies every witness, plus one planted violation per witness (`FAULTS`) |
| `lib.mjs` | Serving, engines, the mode cells, the in-page helpers (`window.__th`), pixel maths, CDP, the CLI wrapper and its watchdog |
| `measure.mjs` | The shared measurements: corner story, selected separation, ring coverage, AX roles, tab stops, arrow moves, engagement, consumer paint |
| `t1-…mjs` .. `t8-…mjs` | T-1..T-8 |
| `wa-…mjs` .. `we-…mjs` | W-A..W-E, the family witnesses |
| `run.mjs` | The whole battery against one target: `node run.mjs --build <dir> [--webkit]` or `--fixture` |
| `selftest.mjs` | Every witness on the clean fixture (must exit 0) and on its planted fault (must exit 1) |
| `glance.mjs` | Owner-glance captures. Not a witness |

### 1.1 Running it

```sh
H=docs/tranches/BL/design/tile/harness
OUT=<scratch>/out                                   # or TILE_HARNESS_OUT
git worktree add <scratch>/wt <rev>
ln -s "$PWD/node_modules" <scratch>/wt/node_modules
node $H/build.mjs <scratch>/wt --label <rev> --out $OUT
node $H/run.mjs --build $OUT/builds/<rev> --out $OUT --webkit
node $H/selftest.mjs --out $OUT
node $H/glance.mjs --build $OUT/builds/<rev> --dest <dir>
```

Per witness: `--engine webkit` (T-1, T-2, T-3, T-4, T-6, W-A, W-D, W-E); `--save <dir>` (T-3, T-4 write the compared crops); `--deadline <s>` (default 1200). T-5, W-B and W-C read the accessibility tree over CDP and run in Chromium only. T-8 runs both engines itself.

### 1.2 The DOM contract (scenes and fixture alike)

`[data-scene]` the scene root; `[data-group]` the selection group; `[data-item]` each selectable item, the element that owns the corner, the state and the focus; `[data-ink]` the consumer content inside an item (hidden when a witness reads the plate); `[data-line-slot]` where a witness appends a line; `[data-sentinel="before" | "after"]` focusable buttons around the group; `window.__tile = { ready, dev, scenes, exports, select(i), selected() }`. URL: `?scene=<id>&mode=dark&sel=<i>|none&shape=stadium|rungHalf|field` (`shape` is read by `glance.mjs` only).

A family build keeps the contract by stamping `data-item` and `data-ink` in the scene markup. A new scene for a family's own primitive goes in `SCENES` with the witnesses it gates.

### 1.3 The scenes

| id | what it transcribes | gates | reports |
|---|---|---|---|
| `preset` | keyframes.js SpringPhysicsFacet preset tiles, bare: markup, layout and content typography of `SpringPhysicsFacet.vue:72-90`, the consumer's cell paint dropped | T-1 T-3 T-4 T-5 T-6 T-8 W-B W-E | |
| `preset-verbatim` | the same with the consumer's paint: the group reset utilities and `:197-215` (the 16 px radius, the dashed outline, the washes) | T-4 T-7 | T-1 T-3 |
| `specimen` | keyframes.js EasingTarget specimen tiles in FadingScroll, bare (`EasingTarget.vue:115-156`, `EasingTarget.css:100-224` layout and type), eight of the 28 curves | T-1 T-3 T-4 T-5 T-6 T-8 W-B W-E | |
| `specimen-verbatim` | the same with `EasingTarget.css:116` (`--radius-field`), the state-keyed ink and the grid reset | T-4 T-7 | T-1 T-3 |
| `strip` | value.js EasingSpecimenStrip (`EasingSpecimenStrip.vue:86-122`), the third site PORTFOLIO §1.5 names: selectable Chip `shape="icon"` circles in a `role="group"`, bare | T-3 T-5 W-B W-E | T-1 T-6 |
| `strip-verbatim` | the same with the strip's state-keyed ink | T-7 | T-3 |
| `single` | single-line reference: the keyframes.js family filter, ToggleGroup `size="sm"` | T-2 T-5 | T-3 T-6 |
| `vertical` | single-line reference: a four-item vertical ToggleGroup (the ConsoleRail analogue) | T-2 T-5 | |
| `tabs` | single-line reference: SegmentedTabs `semantics="toggle"` | T-2 T-5 | |
| `card` | Card's selectable arm, wired as `demo/stories/display/card.vue:117-137` | T-1 T-3 T-4 T-5 T-6 W-C | |
| `chipcell` | selectable Chip `shape="cell"`, two lines | T-1 T-3 T-5 T-6 | |
| `wrap` | the control-role holders whose content can wrap: ToggleGroupItem, pill Chip, Button, each capped at 110 px | T-1 W-A | |
| `family-d` | the preset tiles as `<ToggleGroup shape="cell">` with no item utilities | W-D | |

### 1.4 The mode cells

`light`; `dark` (`.dark` on `html` plus `colorScheme: dark`, verified by class); `prt`: Chromium emulates `prefers-reduced-transparency: reduce` over CDP (`Emulation.setEmulatedMedia`, verified by `matchMedia`); Playwright WebKit cannot, so its PRT cell takes the forced level-0 path (`--glass-level: 0`, `--glass-grain-opacity: 0` on `:root`) and says so in the cell label; `forced`: `forcedColors: "active"`, verified by `matchMedia`, reported and not gated (the §2.5 floor); `prm`: `reducedMotion: "reduce"`; `coarse`: `hasTouch` (plus `isMobile` in Chromium), verified as `(hover: none)` and `(pointer: coarse)`. A cell whose mode did not apply fails and says `MODE NOT APPLIED`.

## 2 · The witnesses, exactly as run

| id | the property (§1.1 / §7) | how the script decides |
|---|---|---|
| T-1 | past its control rung, the used corner stops growing and equals a named role rung | Per distinct holder: the used corner by the CSS Backgrounds 3 §5.5 overlap rule at mount and with one and two lines appended to `[data-line-slot]`. The rung is the item's computed `min-block-size` (else its height with its ink swapped for one short line). PASS when every reading past the rung is one value (±0.5 px) that a named `--radius-*` role resolves to in the item's context. Scale-step tokens (`--radius-sm` and the like) do not count as roles |
| T-2 | a one-line item stays a stadium | Every item at its rung (±0.5 px) uses h/2 (±0.5 px) |
| T-3 | the selected state separates ≥ 3:1 on painted pixels, or through a second carrier the content cannot override, in light, dark and PRT | Ink hidden (`[data-ink]` visibility hidden), scale pinned to 1, the selected item and its nearest-sized unselected sibling screenshotted at the same size. PASS when the mean inner fill (inset past the corner) is ≥ 3:1, or when the device pixels that separate ≥ 3:1 cover at least a 1 px band along half the perimeter (an edge, a mark or a flood). Forced colours reported |
| T-4 | focus paints whole and apart from selection | Tab (real key) from the `before` sentinel; the focused item against itself after Shift+Tab. Along the middle 60 % of each side, the band 0-6 px outside the curved edge must carry ≥ 1.5 px of moved paint (10th percentile). Two cells per scene: nothing selected, and an item selected (Tab lands on it), so selection paint cannot stand in for the ring. Light and dark gate; forced reported |
| T-5 | one-of-N ARIA and keys | CDP AX: group `radiogroup`, every item `radio` with a checked state. Tab from `before` to `after` passes exactly one item. Arrows (real keys, after a real click on the start item): in a grid all four must move focus and check; in a row or column the two axis arrows gate and the cross arrows are reported |
| T-6 | engagement | hover light channel (scale pinned, ≥ 2 % of pixels move by more than 10 levels); hover scale > 1.001; press (mouse down 180 ms) scale < 0.999; commit (on release over an unselected item it runs a transition or animation on a property other than scale or transform); PRM keeps the light channel; coarse: tap u then v, u's scale is 1 and its paint moves on < 1 % of pixels against its pre-tap rest. Each scene runs under a 120 s deadline; an engine that hangs or crashes under the pointer is a FAIL cell in that engine |
| T-7 | no consumer paint on the tile | Each verbatim scene against its bare pair: the item's computed radius (four corners), outline style, width, colour and offset, background colour and image, box shadow, border colours and colour, in four states (rest, selected, hovered, focused by Tab). Any difference is consumer paint. Content ink differences are reported |
| T-8 | both engines (D-4) | T-1 and T-3 (light, dark, PRT) on the T-8 scenes in Chromium and in Playwright WebKit; the real-Safari cell is carried UNMEASURED |
| W-A | D4-A: curvature never tracks content | Per wrap holder: the one-line corner is h/2 and the one- and two-added-line corners equal it (±0.5 px). This is A1's witness; A2 (the field rung past the rung) is judged by T-1 |
| W-B | D4-B: every multi-line one-of-N site composes the choice card, and its contract holds | The bundle exports `ChoiceGroup` and `ChoiceCard`; on preset, specimen and strip every item holding more than one row is `[data-slot="choice-card"]`, AX `radio`, used corner 16 px, one tab stop; T-3 holds in light, dark, PRT |
| W-C | D4-C: selection is a behaviour | The bundle exports `SelectionGroup` and `SelectionItem`; on the card board the AX tree reads `radiogroup` / `radio`, one tab stop, every arrow that has a neighbour moves and checks; the item carries the group's stamp (`data-selection-item`) or declares no role and no tabindex of its own |
| W-D | D4-D: the tile is declared once, at the group | In `family-d` (`shape="cell"` on the group, no item utilities) every item uses 16 px equal to its resolved `--radius-field`, `flex-direction: column`, a line height equal to `--type-leading-body` × font size, and more than one row |
| W-E | D4-E: every one-of-N option is one line, and the library refuses one that is not | On preset, specimen and strip every item holds one row at its rung (±0.5 px); then a line is appended to item 0 and within 600 ms the page must log a console error or throw. A DEV-only refusal needs `build.mjs --dev` |

## 3 · The self-test (every witness PASS on the fixture, FAIL on a planted violation)

`node selftest.mjs --out <out>`, run on 2026-09-24 (log closed 11:05; T-6 re-run after its deadline edit), printed `selftest: every witness passes its fixture and fails its planted violation`. W-E runs on `--fixture --family e` (one-line options with a ResizeObserver refusal), because the other families need multi-line tiles on the same scenes.

| witness | clean fixture | planted violation | on the fault |
|---|---|---|---|
| T-1 | PASS 7/7 | `t1` the tiles wear `9999px` | FAIL 3/7 |
| T-2 | PASS 12/12 | `t2` one-line pills get 12 px | FAIL 0/12 |
| T-3 | PASS 15/15 | `t3` selection is a faint fill only, no edge | FAIL 0/15 |
| T-4 | PASS 20/20 | `t4` the specimen port keeps 2 px of padding | FAIL 12/20 |
| T-5 | PASS 38/38 | `t5` ArrowUp and ArrowDown are dead | FAIL 30/38 |
| T-6 | PASS 24/24 | `t6` only scale transitions; colour snaps | FAIL 20/24 |
| T-7 | PASS 12/12 | `t7` the verbatim tiles carry a dashed outline | FAIL 0/12 |
| T-8 | PASS 16/16, Safari unmeasured | `t8` a WebKit-only rule restores the stadium | FAIL 14/16 |
| W-A | PASS 3/3 | `wa` the holders keep the stadium | FAIL 0/3 |
| W-B | PASS 13/13 | `wb` no choice-card slot or export | FAIL 9/13 |
| W-C | PASS 7/7 | `wc` a listbox of options, four tab stops | FAIL 1/7 |
| W-D | PASS 4/4 | `wd` the declared cell lays out as a row | FAIL 0/4 |
| W-E | PASS 6/6 (`--family e`) | `we` no refusal guard | FAIL 3/6 |

The fixture's compliant arm, for reference: tiles on `--radius-field` (16 px); control-role holders on `--radius-control: calc(var(--control-rung) / 2)` (20 px, one named role, so A1 passes T-1 as well as W-A); selection a 2 px perimeter edge at full ink plus a fill; a 2 px ring at a 2 px offset inside a port with 6 px of padding; `radiogroup` with a roving tabindex and geometric Up/Down; hover a fill shift and a 1.015 scale behind `(hover: hover)`; press 0.97; the commit a 260 ms colour transition.

## 4 · HEAD, RED (`991067c8`, production build, Chromium unless marked)

| id | verdict | HEAD numbers | PORTFOLIO §1.1 / §1.2 reading |
|---|---|---|---|
| T-1 | **FAIL 3/8** | preset 208×61.58 `9999px` → 30.79, 40.88, 50.96 px as lines are added (÷h/2 1.00 at each); specimen 150.53×100.16 → 50.08, 59.16, 68.23 (1.00); wrap ToggleGroupItem 20.00 → 23.95 → 39.24; pill Chip 10.70 → 21.41 → 32.11; Button 20 → 20 → 20, flat but no role names 20 px (FAIL); card and chipcell 16 px flat, named `--radius-field` (PASS). Playwright WebKit identical to 0.03 px | 25.02 on 208×50, 49.57 on 150×99.1, 29.08 wrapped, 36.23 pill. The preset tile is taller now (61.58, not 50): at keyframes.js `87bcc597` it holds a name row and a readout row (`SpringPhysicsFacet.vue:86-87`) where round 0 saw a live track. The ratio 1.00 is the same |
| T-2 | **PASS 12/12** | single 36 → 18.00; vertical 64×40 → 20.00; SegmentedTabs 69.47×32.94 → 16.47. Playwright WebKit the same | GREEN, 20 px on 76.4×40 and 64×40 |
| T-3 | **FAIL 2/15** | preset 1.20 / 1.23 / 1.00 (light / dark / PRT); specimen 1.19 / 1.22 / 1.00; strip 1.49 / 3.21 (PASS) / 1.13; card 1.28 / 1.31 / 1.28; chipcell 1.49 / 3.21 (PASS) / 1.13. No scene has a ≥ 3:1 carrier band (area 0 px² in every failing cell). Forced colours separate (preset 11.31:1). Verbatim, reported: preset 1.09 / 1.06 / 1.07 | 1.20 / 1.23, PRT 1.00 (R3-02-08); specimen 1.20 / 1.21; Card 1.29 / 1.32; Chip cell 1.49 / 3.30; strip 1.50 / 3.33 |
| T-4 | **FAIL 8/20** | preset bare whole (2.00 px every side, both selection states, light and dark); card whole; preset-verbatim 0.00 px on every side in every cell: the consumer's `outline: 1px dashed transparent; outline-offset: -1px` (`SpringPhysicsFacet.vue:197-204`) replaces the ring whether or not an item is selected; specimen and specimen-verbatim cut to 1.00 px on top and left (first item) and on top (item 1) by the FadingScroll port | whole in Card; specimen cut 2 px on the left; the kf composition paints no focus with `NO_PRESET` |
| T-5 | **FAIL 19/38** | preset and specimen: `radiogroup`, `radio`, one stop, Right and Left move and check, Down and Up do not move (0 → 0, 2 → 2). strip: `group` of `button`s with `aria-pressed`, 6 stops, arrows inert. card: `listbox` of `option`s with `aria-selected`, 4 stops, arrows inert. chipcell: `group`, `aria-pressed`, 4 stops, arrows inert. tabs (`semantics="toggle"`): `group` of `button`s with `aria-pressed`, 1 stop, arrows move. single and vertical pass | the same, row for row |
| T-6 | **FAIL 17/24** | ToggleGroupItem (preset, specimen, single) and Chip (chipcell, strip): hover scale 1.015, press 0.97 × 0.97, commit a 180 ms (ToggleGroupItem) or 200 ms (Chip) colour transition, no coarse latch; the hover light channel moves 0.00 % of pixels past 10 levels (p95 1.09:1 preset, 1.07 specimen, 1.00 chip), with and without PRM. Card: light channel 4.27 % (PRM the same), hover scale 1.00, press 0.97, commit `--card-fill` 60 ms and a 300 ms `::before` opacity | ToggleGroupItem hover 1.015 plus the capsule gleam; Card hover `scale: 1` with a 0.05 fill. The gleam is present but faint: its largest per-pixel move stays at or under 10 levels on the tile |
| T-6 Playwright WebKit | **FAIL 9/14** | hovering any ToggleGroupItem (preset, specimen, single) hangs the Playwright WebKit renderer: `mouse.move` does not return within 15 s and the next call reports `Target crashed`. Card and Chip hover do not hang (card light channel 54.57 %). Probe: `wk6b.mjs` in scratch | not measured in round 0. Playwright WebKit and Safari have given opposite results on this library before; the Safari cell is UNMEASURED (owner's safaridriver checkbox) |
| T-7 | **FAIL 4/12** | preset-verbatim in all four states: radius `9999px → 16px`, outline `none → dashed 1px`, plus the washes; specimen-verbatim in all four states: radius `9999px → 16px` (`EasingTarget.css:116`); strip-verbatim: no tile paint (its state paint is content ink, reported) | `rounded-pill` at `:93` and the dashed selection at `:293-309`. The consumer has since replaced `rounded-pill` with its own `--radius-field` rule, which is still consumer paint on the tile |
| T-8 | **FAIL 0/16** | T-1 and T-3 fail in both engines. Playwright WebKit T-3: preset 1.21 / 1.20 / 1.00 (forced level-0 path), specimen 1.21 / 1.20 / 1.00. Real Safari: UNMEASURED (owner's safaridriver checkbox) | Playwright WebKit preset 1.21 / 1.21, specimen 1.22 / 1.20 |
| W-A | **FAIL 1/3** (both engines) | ToggleGroupItem Δ 19.24 px across two added lines; pill Chip Δ 21.41 px; Button PASS (20 px at 40, 52.44 and 86.06 tall) | RED on ToggleGroupItem and pill Chip, GREEN on Button |
| W-B | **FAIL 1/13**, RED by absence | no `ChoiceGroup` / `ChoiceCard` in the bundle; the multi-line items are `toggle-group-item` (30.79 and 50.08 px) and strip buttons (22 px, 6 stops); the one passing cell is the strip's dark T-3 (3.21:1) | RED; three sites and no primitive |
| W-C | **FAIL 0/7**, RED by absence | no `SelectionGroup` / `SelectionItem`; the card board is a `listbox` of `option`s, 4 stops, no arrow moves; each card declares `role="option"` and `tabindex="0"` itself | RED; four stops, arrows inert |
| W-D | **FAIL 0/4** (both engines), RED by absence | `shape` is not a prop: the items render as the pill, a row, 20 px (the field role resolves to 16), line height 15.30 px against body 22.95 px, one row | RED; no `shape` prop |
| W-E | **FAIL 0/6** (both engines; production and `--dev` builds), RED | preset 61.58 px at rung 40 (1.54 rungs, 2 rows); specimen 100.16 at 36 (2.78 rungs); strip 44 at 44 but 2 rows (glyph and label in a circle); a line appended to item 0 is refused by nothing in either build | RED; 1.25 and 2.75 rungs, a 44 px circle with two rows |

## 5 · Owner-glance captures

`node glance.mjs --build <out>/builds/head --dest …/D4/p1/harness/glance` wrote, under `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D4/p1/harness/glance/`, one PNG per cell and one contact sheet per scene and mode (`{preset,specimen}-{light,dark}-sheet.png`, top to bottom: head, consumer, rungHalf, field), plus `glance.json`. Chromium, the scene's host width (460 px), the second item selected.

| cell | preset (208×61.6) | specimen (150.5×100.2) | what it shows |
|---|---|---|---|
| head | `9999px`, used 30.79 (÷h/2 1.00) | used 50.08 (1.00) | the library at HEAD, bare: a lozenge on the preset tile, an oval on the specimen; the selected tile a slightly darker grey |
| consumer | 16 px (0.52) | 16 px (0.32) | keyframes.js as it ships: its own 16 px corner, a transparent-rest tile, the selected preset marked by a dashed violet outline, the selected specimen by a violet curve and name |
| rungHalf | 20 px (0.65) | 18 px (0.36) | D4-A arm A1: half the item's control rung (md 40, sm 36) |
| field | 16 px (0.52) | 16 px (0.32) | `--radius-field`: the card rung (A2, D, B's corner) |

Both candidates read as cards at both sizes, in both modes; rungHalf is visibly softer on the preset tile (20 against 16) and nearly indistinguishable on the specimen (18 against 16). Neither candidate changes the selected state: in every candidate cell the selected tile is separated only by the 1.2:1 fill.

## 6 · Notes for the family seats

- **T-1 against W-A on the Button law.** Button's 20 px corner is flat but no named role resolves to 20 px, so Button fails T-1 and passes W-A. A1 passes T-1 only if the rung/2 corner becomes a named role (the fixture names it `--radius-control`). The canon's two laws (§1.3 item 2) are now two witnesses that disagree on one holder.
- **T-6's commit rule is lenient.** A 180 ms colour transition passes "a commit transitions". The iOS-27 commit bar (a flood, a scale pop, a glide; D-2) is stricter, and no witness here measures it; a family that claims it should add a cell.
- **The hover light threshold.** The capsule gleam exists (p95 1.09:1) and moves no pixel by more than 10 levels on these tiles. Whether a light channel that faint counts is a design ruling; the witness counts it as absent.
- **Playwright WebKit crashes on ToggleGroupItem hover.** Any family that keeps ToggleGroupItem inherits a WebKit T-6 cell it cannot pass in Playwright WebKit until the crash is understood. Real Safari may differ.
- **Consumer drift.** The preset tile's geometry and the consumer's paint changed after round 0 (§4 T-1, T-7). The scenes transcribe the current consumer. Re-read the consumer before quoting a number from here.
- **Harness state that is not the library.** `build.mjs` builds only the scene app; the family directories it looks for (`choice/`, `selection/`) are the portfolio's sketch names. A family that picks other names updates `FAMILY_DIRS` and its witness's export list.

## 7 · Artefacts

Scratch root `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D4/p1/harness/`: `out/builds/{head,head-dev}/` (the bundles), `out/runs/<label>/*.json` (every witness's cells), `out/t3shots/`, `out/t4shots/` (the compared crops), `logs/head-*.log` and `logs/selftest-final.log` (the printed runs quoted above), `glance/` (§5), `wk6.mjs` and `wk6b.mjs` (the WebKit hang probes). The worktree used for the HEAD build was removed after the run.
