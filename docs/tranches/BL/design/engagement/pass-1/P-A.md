# D5 · pass 1 · P-A: family A's prototype (the declared register)

| field | value |
|---|---|
| seat | P-A, the prototype seat for D5-A (`SPECS.md` §3, §6 "P-A") |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | worktree at `d36e08ab`; `P-A.patch` re-checked at `49db558e`: `git apply --check` clean. `git diff --stat d36e08ab 49db558e -- src` prints nothing; `src/` is the 10.1.0 bytes at both |
| prototype | `P-A.patch`: 31 files, +514/−150 (src 25 files +453/−84; tests 5 files +54/−66; `.published-roster` +7). Built from `R-A.patch` in a scratch worktree, removed after. **It runs** |
| harness | `../harness/` in place, plus one additive option on `harness/build.mjs` (`--app <file>`, a route's scene-app fork; default unchanged). P-A's fork with its H-2 rows: `P-A/scenes/App.vue`. Probes: `P-A/census.mjs`, `P-A/capture.mjs`; `syn/afterdrag.mjs` reused unchanged |
| engines | Chromium 149.0.7827.55, Playwright WebKit 26.5, headless. **Playwright WebKit is not Safari.** Real Safari: **UNMEASURED (owner's safaridriver checkbox)** in every cell |
| load | 1-minute load 23-68 for the final battery (`P-A/logs/battery-final.log`, 16:36-17:10); every cell line carries its own load, and each JSON in `P-A/json/` its start and end load. No cell below is called a defect on a reading taken only under load |
| standing defaults | Q-1 (c), Q-2 (b), Q-3 (c), Q-4 (b), Q-5 (a). O-87 binds the paint: the prototype adds no glow, gleam, shadow layer or idle loop, and removes one resting scale |

## 0 · In brief

1. **The spec runs on the trio, the passive atoms and four more members (Checkbox, Radio, Chip in two modes, Button).** E-2 on the seven migrated scenes (switch, checkbox, radio, chip, chipaction, button, accordion; 12 cells each, both engines) reads 167 of 168; the one miss is the radio's keyboard light cell, where ArrowDown does not select (HEAD's reka behaviour). HEAD passes none of those scenes' commit cells (`../BASELINE.md` §2 E-2). The mount case is quiet everywhere with no guard.
2. **The spec's crest, 1.0152, fails by sampling.** At the analytic minimum, 9 of 37 commit cells whose curve was right still missed the bar, because an 8.3 ms frame does not land on the exact crest or trough (`P-A/json/crest-1.0152/E-2-chromium.json`, load 38-68). The prototype carries 1.02 (rebound 0.0026). The bar's minimum is not a usable operating point.
3. **Three deviations from `SPECS.md` §3, each measured** (§2): the press is never a class's geometry (a CSS squish released into the pop cancelled it: action chip pointer peak 1.012, tap 1.000); the commit rides `transform`, not `scale` (the Button's script press writes an inline `scale` that would mask the pop); the dragged exemplar is the sortable row, not the Carousel.
4. **What A cannot carry, unchanged from the spec**: E-4 (velocity, 0.00 px), E-7 static (the Slider still writes `data-engaged`), E-3's keyboard arm (struck; needs a modality signal) and phone arm (promotion, D5-E), E-6 (Q-2 RETIRE). B carries the first three.
5. **The census holds at runtime in both engines.** Each exemplar's computed `--rung-class` matches its declaration (12 rows, the chip by rendered mode), no element composes two classes, the static roots are inert, and each of the three plants fails its cell (`P-A/logs/probes.log`).
6. **Two shipped defects cured on the way**: the chip's resting 7 % scale when selected (HEAD settle 1.074), and the accordion's WebKit page close (PF-1's disclosure arm, by re-pointing its hover off `--control-surface-bg-hover`; every accordion pointer and tap cell now reads in WebKit). The chip's and the accordion's missing PRM press-light (HEAD E-5, E-9) are green.
7. **R-A's patch never passed `npm run build`**: the published-roster ratchet refuses new utilities unless bound. P-A binds the seven `engage-*` names.

## 1 · Gates run

| gate | result | evidence |
|---|---|---|
| `npm run build` | PASS (after binding `.published-roster`; before it: `7 name(s) in the emitted roster are not in the datum`) | `P-A/logs/build.log`, `P-A/logs/final-checks.log` |
| `npm run typecheck` (both projects) | PASS, exit 0. The test project needs `dist` first (`@mkbabb/glass-ui/fourier-math` resolves through it); the first run before a build failed on that alone | `P-A/logs/typecheck.log`, `final-checks.log` |
| `vitest run` (full suite) | 2321 passed, 9 expected fail, 1 skipped; the one failure was `boot-graph`'s "dist-demo newer than every source" after my last source edit; `demo:dist:build` then `boot-graph` 14/14 | `P-A/logs/final-checks.log`, `P-A/logs/boot-graph.log`; load 29-42 |
| tests migrated | `binary-triad` (all three bits are `engage-chosen`, none `tap-squish`), `slider.contract` and `forms-seam` (the class token in the class list), `Button.test` (the surface legs now ride the class's list; its reduce arm retires `transform` only) | in the patch |
| census unit test | `engage-ladder.test.ts`: the byte detector (`RUNG_BEYOND_HOVER`, the `it.fails` latch) is replaced by the declaration census: the directory list equals `members`; every class names a ladder rung or a reason; a mode-split member lists its primary class first; each `@utility engage-<c>` stamps `--rung-class: <c>`. Two plants fail it (a member deleted; a stamp swapped), then restored | run in the worktree, 27/27 and the planted FAILs |

## 2 · What was built, against `SPECS.md` §3.1

| piece | built | where |
|---|---|---|
| the declaration | R-A's 55 members in 9 classes, plus `modes` (`chip: [chosen, pressed, static]`) so the census can check a mode-split member per rendered element. Dragged's exemplar is `sortable-list` | `src/composables/motion/engage/engageClasses.ts` |
| the stamp | `--rung-class` registered `<custom-ident>`, `inherits: false`, set by every `engage-*` utility | `src/styles/utilities/engage.css` |
| the commit | `--rung-commit` on `--spring-panel`, mapped `transform: scale(1 + (crest − 1)·sin(π·c))`, crest `--scale-commit-pop: 1.02` | `engage.css`, `src/styles/tokens/scale-paper.css` |
| chosen | Switch, Checkbox, RadioGroupItem, selectable Chip. Commit on `[data-state=checked|on]`; the Switch thumb travels on `panel` instead (crest 1). Press is light only: the bit's face fill (`control-bit.css`, unchanged rule) and a new chip press layer (`glass-chip.css`) | `Switch.vue`, `Checkbox.vue`, `RadioGroupItem.vue`, `Chip.vue`, `glass-chip.css`, `control-bit.css` (comments only) |
| pressed | Button and action Chip. The commit edge is a component-local parity flip on activation (`data-commit="a" ↔ "b"`), the minimal stand-in for B's door. The Button's press stays `useLiquidPress` (script, B's primitive); the action chip presses in light | `Button.vue`, `button/styles.css` (its transition list deleted: the class owns it), `Chip.vue` |
| disclosed | accordion trigger: light press on the press-drain attack, pop on open and close; the substrate's hover moved under `(hover: hover)` onto `--fill-hover` (S-10) | `AccordionTrigger.vue`, `_shared/disclosure/disclosure.css` |
| held | Slider: grow ×1.06 on `[data-held]` only, fine pointer only (the `:active` and `:has(:focus-visible)` arms struck, S-8) | `Slider.vue`, `slider/styles.css` |
| dragged | sortable row: stamp, plus a light press on the row (`--fill-selected`, the fill the lift holds) on the press-drain attack | `SortableItem.vue`, `sortable-list/styles.css` |
| field | Input: stamp only; its engagement is the substrate's focus paint | `Input.vue` |
| static | Separator, Skeleton (stamp); Skeleton's `1.1s` literal moved to `--duration-xl` (1 s) | `Separator.vue`, `Skeleton.vue` |
| veil split | `ModalOverlay.vue` drops `data-engaged`; the scrim keys on `[data-state="open"] > .glass-focus-veil` (identical in B, D, E) | `ModalOverlay.vue`, `focus-veil.css` |
| not built | presented and ambient recipes; `.tap-squish` and `.interactive-item` retirement (still composed by ToggleGroupItem, SelectTrigger, EasingPicker, the menu rows, the configurator, the demo); C's inherited-scalar variant | §8 |

### 2.1 Deviations from the spec, each with its reading

| id | spec | built | why (measured) |
|---|---|---|---|
| DV-1 | crest at the bar's minimum, 1.0152 (S-6) | 1.02 | at 1.0152 the curve is right and the reading is not: `peak 1.015 trough 0.998 settle 1.000` is PASS in 28 cells and FAIL in 9 of the same shape (Chromium, 8.3 ms frames, `P-A/logs/battery-crest1.0152-partial.log`, load 38-68). At 1.02: 167/168 migrated E-2 cells in the final battery, the miss being the radio's non-selecting ArrowDown |
| DV-2 | chosen and pressed press by host squish (R-A's switch; spec §3.1 limits the light press to the bit) | every class presses in light or by script; `engage-pressed` and `engage-chosen` set `scale: none` | a squish released into the commit cancels the pop: action chip pointer peak 1.012 and tap peak 1.000 / trough 0.967 (FAIL, crest-1.0152 run). The capsule's unguarded hover lift latched on a coarse tap and settled the chip at 1.015 (FAIL, same run). With the press in light both are PASS. This extends the spec's control-bit reason (S-6, `R-D.md` §3) to the class |
| DV-3 | commit on `scale` | commit on `transform`; held grow on `scale` | the Button's `useLiquidPress` writes an inline `scale` while pressed, which overrides any class `scale` and would hide the pop until its spring settles. On separate channels the two compose: Button pointer and tap commits PASS in both engines |
| DV-4 | dragged exemplar `carousel` (R-A) | `sortable-list` | a carousel slide has no paint of its own to press in light without inventing one; the row already holds `--fill-hover` and `--fill-selected` (`sortable-list/styles.css`) |
| DV-5 | retire `.glass-capsule-hover`'s press (§3.1 "press recipes retired") | not retired; overridden on migrated members by `scale: none` | `DockControl.vue:167` stamps `data-press-armed` only for icons (`!isTab && press.armed`), so dock **tabs** press through that rule. Retiring it reaches into D1's dock; that row needs D1's seat |
| DV-6 | one row per directory | `modes` row for the chip | the Chip is chosen, pressed or static by `mode` (`Chip.vue`); the runtime read accepts any listed class per element and the unit test pins the primary first |

## 3 · H-2 rows landed in P-A's fork

`P-A/scenes/App.vue` (diff against `harness/scenes/App.vue`: 14 lines added, 1 changed):

- `input`: the FIELD exemplar (`SCENE_OF_DIR.input`); E-1 presses it and reads the focus paint.
- `chipaction`: an action Chip gated E-2/E-5/E-8/E-9, the PRESSED class on the capsule through the parity edge.
- `SCENE_OF_DIR["sortable-list"] = "sortable"`: the DRAGGED exemplar.
- the Button's programmatic commit is `element.click()`: a stateless control's model is its activation (the shared app's `clicks++` never reaches the component).
- not mapped: `sheet`. Mapping it made E-1 **throw** (`page.evaluate … reading 's'`) on the PRM press cell instead of failing (`P-A/logs/battery-crest1.0152-partial.log:2-4`), the same harness gap R-D noted at `e1-census.mjs:53`. Presented stays "no harness scene".

## 4 · Every E-witness, both engines (final battery, `P-A/logs/battery-final.log`, `P-A/json/`)

Per-scene tallies are pass/fail. "HEAD" is `../BASELINE.md` §0-§2.

| witness | Chromium | Playwright WebKit | A's row | carried by |
|---|---|---|---|---|
| E-1 | FAIL 16/18 | FAIL 16/18 | structure 4/4; runtime and PRM press-light PASS for pressed (button), chosen (switch), held (slider), **dragged (sortable row: `background-color`)**, disclosed (accordion, **now readable in WebKit**), **field (input)**. FAIL: presented and ambient, "no harness scene". HEAD: 0/3 | H-2 for presented (needs E-1 to fail, not throw, on an absent target) and ambient (needs a pointer-field cell) |
| E-2 | FAIL 95/108 | FAIL 96/108 | **switch, checkbox, chip, chipaction, button, accordion 12/12 each, both engines; radio 12/12 WebKit, 11/12 Chromium.** The one radio miss is keyboard light: ArrowDown moved focus without selecting (peak 1.000), HEAD's reka behaviour (`R-D.md` §2, SPECS X-5). The other 24 FAILs are tabs (programmatic glide, mount glide 123 px) and toggle (no commit; WebKit closes), both unmigrated and as at HEAD | X-5; tabs and toggle are later members |
| E-3 | FAIL 8/12 | FAIL 8/12 | desk pointer-held ×1.060 PASS; PRM PASS; gutter PASS. FAIL: keyboard-focused ×1.000 (the arm is struck, S-8) and phone touch-held ×1.000 (Q-3 (c)) | keyboard: B's modality signal; phone: D5-E |
| X-1 (afterdrag) | drag release ×1.047 at 50 ms (the exit spring in flight), ×1.000 at 600 and 1500 ms; click ×1.000 | drag ×1.019 at 50 ms, ×1.000 at 600 and 1500 ms | **the S-8 defect is gone**: R-A and R-D held ×1.060 for ≥ 1.5 s (`syn/logs/afterdrag-ra.log`). Thumb `:focus-visible` is still true after the drag; nothing reads it now | — |
| E-4 | FAIL 4/10 | FAIL 2/10, 2 UNMEASURED | slider carry 0.00 px both releases; sortable difference −10.16 px (Chromium), −25.32 px (WebKit), the fling teleport (`RH.md` §3 item 2); tabsdrag 1.05 / 0.09 px; Sheet unreadable (paints in flow); Carousel PASS Chromium, UNMEASURED WebKit (no touch scrolling). All as HEAD | D5-B (velocity rule); the Sheet and sortable defects are X-9's owners |
| E-5 | FAIL 28/32 | FAIL 26/30 | **chip, chipaction, button, accordion, press_switch, press_checkbox 4/4 each, both engines.** The accordion answers a held touch through `background-color`, also under reduce (HEAD: `press-only []`); the chip's PRM press-light is cured (HEAD FAIL). FAIL: tabs PRM, toggle PRM (Chromium) and toggle closes WebKit | tabs and toggle (unmigrated) |
| E-6 | FAIL (present 0) | FAIL | absent by A's own row | owner (Q-2 (b), S6 RETIRE) |
| E-7 | FAIL 3/4 | FAIL 3/4 | **runtime modal 0 `[data-engaged]` PASS** (the veil split; HEAD 1); held 2 nodes PASS; held PRM PASS. Static FAIL: 1 writer, `Slider.vue`, not under `engage/` (HEAD: 2) | D5-B's door or D5-E's stage |
| E-8 | **PASS 19/19** | FAIL 17/19 | every press and commit animation reads a clock token; the mirror holds (`--rung-*` is outside `--engage-*`). The 2 WebKit FAILs are toggle cells that close the page (PF-1) | PF-1's owner |
| E-9 | FAIL 56/60 | FAIL 50/56 | **switch, checkbox, radio, chip, chipaction, accordion, slider 6/6 both engines; button 6/6 Chromium, 4/6 WebKit**: press-spatial range 0.030 under reduce (`useLiquidPress` squishes under reduce, HEAD's WebKit reading). FAIL otherwise: tabs and toggle (unmigrated) | button: D5-B (the press primitive's reduce arm, FL-8) |

Real Safari: UNMEASURED in every row. `RW.md` §4 (b) stands as a FL-7 cell: on iOS Safari `:active` needs a `touchstart` listener, and every light press here is a `:active` rule.

### 4.1 The mount case (H-8)

`E-2 mount(committed)`: 14 of 14 per engine on the migrated scenes (switch, checkbox, radio, chip, chipaction, button, accordion, light and dark): scale range 0.000, body moved 0.00 px. No guard. The parity edge mounts quiet by construction: the first `data-commit` renders with the element and has no before-change style. The async-arrival pop (S-9) is unchanged and family-independent.

### 4.2 The census cells (`P-A/census.mjs`, `P-A/logs/probes.log`)

| cell | Chromium | WebKit |
|---|---|---|
| drift: 12 rendered members (switch, checkbox, radio, chip selectable, chip action, button, accordion, slider, sortable row, input, separator, skeleton) stamp a declared class; no classed descendant | 12/12 PASS | 12/12 PASS |
| single: no element composes two `engage-*` classes, on every scene | PASS | PASS |
| static-inert: separator and skeleton roots are not focusable and carry no interactive role | PASS | PASS |
| plant: separator recomposed `engage-chosen` | FAILs (computed `chosen`, declared `static`) | FAILs |
| plant: switch composes `engage-chosen` and `engage-pressed` | FAILs (1 element; the computed stamp reads `pressed`, so a computed read alone would have missed it) | FAILs |
| plant: separator given `tabindex=0` | FAILs | FAILs |

## 5 · Q-1 (passive), census-checkable

Default (c), as the spec: `static` is `{ rung: null, reason }`; each static member stamps `engage-static`; drift and static-inert read it at runtime (§4.2). The removable and static Chip modes stamp `static` too, declared under `modes.chip`.

## 6 · Cost

| part | files | lines |
|---|---|---|
| declaration + export | 2 | +131 |
| recipes (`engage.css`), import, roster binding, scale rows | 4 | +221 |
| members: Switch, Checkbox, Radio, Chip, Button, Accordion, Slider, Sortable, Input, Separator, Skeleton | 14 | +54/−51 (Button's 18-line transition list and the Switch's 16-line travel block deleted: the class owns them) |
| substrates: control-bit (comments), disclosure hover, chip press layer and resting-scale removal, sortable press, veil split (`ModalOverlay.vue`, `focus-veil.css`) | 6 | +54/−33 |
| tests | 5 | +54/−66 |

Per member: one class token, plus deletions where its own press or travel moved into the class; a stateless member adds a parity edge (Button +12, Chip +22 with the mode map). The fixed cost is about 350 lines. Extrapolated to the library: about 40 class-list edits, the `.tap-squish` and `.interactive-item` retirement, the capsule press with D1, and H-2 scenes for presented and ambient.

## 7 · MIGRATION rows

Consumer reads are a read-only grep over the sibling repos as R-A ran it (`R-A.md` §5); not re-grepped here.

| row | what changes | consumers |
|---|---|---|
| M-A1 | the Switch, Checkbox and Radio no longer compose `.tap-squish`; they press in light, never by host scale | any consumer asserting `.tap-squish` on a bit (none found by R-A) |
| M-A2 | a selected Chip no longer rests at ×1.074; the flood is light only. Chips gain a press layer and lose the capsule's hover lift and press-snap | every Chip consumer (paint only) |
| M-A3 | Button and Chip carry `data-commit="a"|"b"`; the Button's own `transition` list moved into `engage-pressed` | a consumer overriding `.button { transition }` or reading `data-commit` (none found) |
| M-A4 | Button and Chip lose the capsule's 1.5 % hover lift (`scale: none` on the class) | paint only |
| M-A5 | the slider grows ×1.06 only while `[data-held]` on a fine pointer, no longer on `:active` or keyboard focus | value.js ×4, fourier-analysis ×3 (`R-A.md` §5) |
| M-A6 | the modal veil keys on `[data-state="open"]`; `data-engaged` leaves `ModalOverlay` | none found (`R-E.md` §5) |
| M-A7 | new public surface: `ENGAGE_DECLARATION` (with `modes`), `--rung-class`, `--rung-commit`, `--rung-grow`, `--scale-engage`, `--scale-commit-pop`, seven `engage-*` utilities on `./styles` | additive, bound in `.published-roster` |
| M-A8 | not built: `.tap-squish` and `.interactive-item` retired, no alias | fourier-analysis (`tap-squish` ×3, `interactive-item` ×9), chicago (`tap-squish` ×3), keyframes.js (`interactive-item` ×1) |

## 8 · Owner-glance captures (REGISTRY §2.5)

`P-A/captures/{head,proto}-{chromium,webkit}-{light,dark}-{switch,checkbox,chip,chipaction,button,accordion,slider}-{state}.png`, 216 files at 2x; each frame's measured scale is in `P-A/logs/probes.log`. States: rest, pressed, crest (90 ms after release), committed; slider rest, held, released. HEAD's WebKit accordion is taken by keyboard (`pressed-kbd`) because its pointer closes the page; the proto's is taken by pointer. Fine pointer only: the coarse set is not captured.

What the author sees, for the seats that judge (not a verdict):
- **Chip**: HEAD presses by squish and commits by swelling to a resting ×1.074; the proto presses with a darker flat fill and commits at the same size with a ×1.02 crest. The committed frames differ in size, which is the cure the O-87 ruling asks for.
- **Accordion**: the press is a full-row `--fill-selected` stadium. At 12 % it reads close to a selected state, as R-A said. The crest frame is 6.4 px wider on 320 px. The least deft frame of the set.
- **Checkbox and Radio**: a ×1.02 crest on a 44 px seat around a 20 px face is about 0.4 px on the face. It passes the ratio bar and is hard to see; SPECS X-3 (a pixel floor) is the open question.
- **Button**: unchanged press (the script squish, measured ×1.033 in width because of its reciprocal deform), then a ×1.021 crest.

## 9 · Open, for the critic and the agglomerator

1. **X-3 confirmed on the build**: a chosen bit passes E-2 with a sub-pixel pop. A pixel floor or a light-channel commit read needs the agglomerator.
2. **The bar's minimum is not usable** (DV-1): the S-6 arithmetic needs a sampling margin, or E-2 needs a continuous read.
3. **The capsule's press-snap and unguarded hover lift** stay for unmigrated consumers (ToggleGroupItem settles at 1.015 on a tap, as HEAD). Retiring them needs D1 (DV-5).
4. **Button under reduce squishes in WebKit** (E-9 0.030): `useLiquidPress`'s reduce arm, FL-8, B's.
5. **E-1 throws on an absent target** (§3): harness row for R-H's owner.
6. **The parity edge is component-local** (Button, Chip). Under a composition with B it becomes the door's `commit()`; as built it is the one script piece in A.
7. **Not built**: presented, ambient, the `.tap-squish`/`.interactive-item` retirement, the coarse capture set, real Safari (UNMEASURED).
8. The crest-1.0152 battery was stopped after E-2 Chromium once its finding was read; its E-1 throw and E-2 Chromium cells are the evidence for DV-1, DV-2 and §3.

## 10 · Reproduce

```sh
E=docs/tranches/BL/design/engagement; H=$E/harness; P=$E/pass-1; S=<scratch>
git worktree add --detach $S/wt HEAD && ln -s "$PWD/node_modules" $S/wt/node_modules
git -C $S/wt apply "$PWD/$P/P-A.patch"
(cd $S/wt && npm run build && npm run typecheck && npx vitest run)
node $H/build.mjs $S/wt --label final --out $S/out --app $P/P-A/scenes/App.vue
node $H/run.mjs --build $S/out/builds/final --wt $S/wt --out $S/out/runs/final --verbose
node $P/P-A/census.mjs --build $S/out/builds/final [--engine webkit]
node $P/syn/afterdrag.mjs --build $S/out/builds/final [--engine webkit]
node $P/P-A/capture.mjs $S/out/builds/final proto $S/captures [webkit]
git worktree remove --force $S/wt
```
