# D5 · pass 1 · R-E: the engaged stage

| field | value |
|---|---|
| seat | R-E, the research seat for family D5-E (`../PORTFOLIO.md` §4 D5-E, §6 D5-E) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | worktree at `493a8a11`; the checkout moved to `0cda880f` during the run through docs-only commits (`git diff --stat 493a8a11 HEAD -- src tests` prints nothing). `R-E.patch` passes `git apply --check` at `0cda880f` |
| harness | `../harness/` as R-H landed it (`RH.md`), unedited. Two pages of this seat's own: `R-E/glance/App.vue` (the trio and the passive atoms over body copy, two sliders) built by `R-E/build-glance.mjs`, read by `R-E/glance.mjs` |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, headless. **Playwright WebKit is not Safari.** Real Safari: **UNMEASURED (owner's safaridriver checkbox)** in every cell |
| load | 1-minute load 22-151 across the run; every cell line carries its own. The final battery ran 15:15-15:58 at 22-151 (`R-E/logs/final-battery.log:1` and the `# end` line). No verdict below rests on a timing read taken only under load |
| prototype | `R-E.patch` (12 files, src +317/−116). Final battery: `R-E/logs/final-battery.log`, cells `R-E/json/final/`. Owner-glance: `R-E/shots/` (84 PNGs, HEAD and prototype), numbers `R-E/logs/glance-re.log`, `glance-head-2.log` |

## 0 · In brief

1. **The stage works as "promote where it stands", not as a projection.** The held control takes `popover="manual"` and enters the top layer without moving in the DOM. Pointer capture, focus and inheritance survive; a moved node loses capture and focus in both engines (§1 Q-1). A footprint stays in flow and is the anchor the promoted control is pinned to. The slider's two teleports (veil and loupe) and its inline z-raise are deleted.
2. **E-7 goes GREEN in both engines** (4/4 each): one writer, `src/composables/motion/engage/engageStage.ts`; a held slider carries 2 `[data-engaged]` nodes (the control and the stage veil), the open modal 0.
3. **E-3 desk pointer-held goes GREEN** (×1.060, both engines, both themes). E-3 keyboard-focused stays RED by choice (§2), and **E-3's phone arm cannot be met by any route as written**: a full-width 358 px control in a 390 px viewport cannot be ×1.03 wider and inside the 16 px gutter at once (§2 E-3). The stage grows it ×1.058 along the block axis instead.
4. **The veil is not the host's `::backdrop`.** It paints in Chromium, but Playwright WebKit runs no transition on a `::backdrop` engaged after it opens, and with `@starting-style` it restarts the ramp from 0 at ~405 ms. The stage owns one veil element, a manual popover shown just under the host (§1 Q-3).
5. **Two defects found and fixed during the build**, each filmed: the singleton left a displaced control's `data-engaged` set; an in-place keyboard grow leaked after every pointer drag (reka focuses the thumb by script and both engines then match `:focus-visible`).
6. E stays partial by design: E-1, E-2, E-4, E-5, E-6 belong to a census family. The prototype changes none of them, except that the Switch now answers a held touch through a grow (Δscale +0.060, both engines).

## 1 · PORTFOLIO §6 D5-E, answered

### Q-1 · The projection: clone or moved node?

Neither. Both were measured against a third shape, promote in place, and in-place promotion was built.

| shape | rect at promotion (before → after) | pointer capture after | focus after | source |
|---|---|---|---|---|
| promote in place (`popover` + `showPopover()` on the control itself) | 100,100,300×40 → 100,100,300×40 (Δ 0) | kept, both engines; 3 further `pointermove`s delivered | kept on the control | `R-E/platform-probe.log` (load 56.8-57.4) |
| moved node (appended into a separate popover) | 100,100 → 0,300 | **lost** (`lostpointercapture` fires), both engines | **lost** (to `body`), both engines | same |
| clone (the loupe's second render) | not built | n/a | n/a | — |

On the real slider in the prototype: first frame after the press `l 48 t 150 w 360` in Chromium (Δ 0) and `l 47.6 w 360.8` in WebKit, where the grow has already started (scale 1.0022); a +60 px drag through the promotion moves `aria-valuenow` 40 → 52 in both engines (HEAD 40 → 53, the 6% wider track maps the same 60 px to fewer units) (`R-E/logs/glance-re.log`, slider rows).

The clone was not built because promote-in-place removes its reason to exist. A clone doubles the DOM and needs state sync, and on a ×1.06 projection its thumb would sit up to 10.8 px from the finger at the ends: reka maps the pointer against the rest box, not the clone. Paint parity of the in-place route holds by construction (it is the same node). The loupe stays what it is: a magnified detail, now the host's own child.

### Q-2 · The phone arm: full-width projection vs an in-place grow

On 390×844 coarse the promoted slider keeps its 358 px width and grows along the block axis: rest 358×24 → held 358×25.4 (inline ×1.000, block ×1.058), with the engaged box at 16.0..374.0 px, both engines, both themes (`glance-re.log` phone rows; `final-battery.log` E-3 gutter PASS ×4). The cap is CSS: `1 + 2·max(0, room − --space-section)/width`, where room is the control's own clearance to the viewport edge and `--space-section` is the spacing register's "page gutter" rung (`src/styles/tokens/sizing.css:105`). No gutter figure is minted. Typed arithmetic (length ÷ length) parses in both engines (`R-E/platform-probe.log`, `typedArith: true`).

Owner glance: `R-E/shots/re-{chromium,webkit}-{light,dark}-phone-slider-held.png` against `head-*`. A 1.4 px thickening is barely visible, so on the phone the veil carries the engagement and the geometry hardly does. The open owner question: does iOS-27 grade on a phone mean a visibly thicker track (iOS Control Center's held slider grows its thickness by far more than 6%)? Raising the block-axis grow needs a figure the ladder does not have (FL-2).

### Q-3 · `::backdrop` with `backdrop-filter` on a manual popover

| read | Chromium | Playwright WebKit |
|---|---|---|
| computed `backdrop-filter` and mask on `::backdrop`, inherited var resolved | yes (`blur(6px)`, mask at 40%) | yes (same values) |
| paint: stripe contrast at the mask core / outside (255 = untouched) | 23 / 255 | 255 / 255; **the control fails too**: a plain fixed div with `backdrop-filter` also reads 255, so headless Playwright WebKit paints no backdrop blur at all. UNMEASURED (instrument) (`R-E/backdrop-control.log`) |
| `::backdrop` opacity transition on an attribute set after open | runs (0 → 0.22 at 150 ms → 1) | **does not run**: 1.000 at 0 ms (`R-E/logs/backdrop-clock-probe.log`) |
| the same with `@starting-style` | runs | runs, then **restarts**: on the slider the veil fell from 0.99 to 0.00 at 405 ms and ramped again (`R-E/logs/stage-flicker-film.log`) |
| a registered `inherits: false` var (`--veil-x`, `property-regs.css:43-47`) reaching `::backdrop` | needs explicit `inherit` | same |

Verdict: the veil is one stage-owned element (`.glass-focus-veil`, the shipped recipe, unchanged), a manual popover shown just before the host, so the top layer stacks it under the control. Filmed after the change: the veil ramps 0 → 1 over ~100-400 ms with no drop in either engine (`R-E/logs/stage-flicker-film-veil.log`). Real Safari: UNMEASURED (owner's safaridriver checkbox).

### Q-4 · Accessibility

The stage is the control itself, so there is nothing extra to hide or make inert. Playwright's `ariaSnapshot()` of the slider reads `- slider "Volume"` at rest and held, identical, both engines and themes (`glance-re.log`, "aria rest → held"). The veil and the footprint carry `aria-hidden="true"`. Focus stays on the control through promotion (Q-1). Not read: a real screen reader (VoiceOver on Safari): UNMEASURED.

### Q-5 · Two sliders held at once

Chromium, two raw CDP touch points (`glance-re.log`, Q-5 rows): one finger, then a second on the other slider. Slider A is released from the stage, B is promoted (exactly one control on the stage; the top layer holds 2 elements, B and the veil), and both still report `data-held`. After the release nothing is left: 0 `[data-engaged]`, 0 open popovers, 0 footprints. Raw CDP touches did not move either value (40, 65), as at HEAD: the instrument does not drive reka, so the two-finger scrub itself is unread. WebKit: UNMEASURED (the raw driver takes one touch point).

The first build left A's `data-engaged` set after it was displaced (two engaged nodes, 1 open stage). Fixed: `hide()` clears the attribute. G6 holds as the ladder states it. Whether two-handed use on touch should keep both controls engaged is for the owner (it extends Q-3/Q-5; the default stands).

## 2 · Its row on every witness (REGISTRY §3.3 item 1)

Final prototype, `R-E/logs/final-battery.log` (E-2 narrowed to the Switch and the accordion trigger, the two trio members it gates). HEAD readings: `../BASELINE.md`.

| witness | Chromium | Playwright WebKit | E's reading | family that carries the RED |
|---|---|---|---|---|
| E-1 | FAIL 0/3 | FAIL 0/3 | unchanged: E declares no census | A, B, C or D |
| E-2 | FAIL 8/16 of 24 | FAIL 8/16 | Tab entry and mount PASS on both scenes (8/8). The Switch's pointer commit now peaks 1.046-1.052 (the grow on press) with no bounce below its settle, so no pop. The accordion is unchanged; WebKit's pointer and tap cells on it close the page (PF-1) | the commit belongs to a census family (B's model commit, C's `--commit`) |
| E-3 | FAIL 8/4 of 12 | FAIL 8/4 of 12 | **desk pointer-held ×1.060 PASS ×2**, phone gutter PASS ×2, all four PRM cells PASS. RED: keyboard-focused ×1.000 (×2) and phone touch-held ×1.000 (×2) | see below |
| E-4 | FAIL 4/6 | FAIL 2/6, 2 UNMEASURED | slider carry 0.00 px as HEAD; the drag still drives (moved 79.2 px under reduce, PRM PASS). Stage release velocity not built | B's velocity rule (FL-8) |
| E-5 | FAIL 18/10 of 28 | FAIL 16/8 of 24 | press_switch Δscale **+0.060** under a held touch (HEAD −0.040), both engines. The 10/8 FAILs are HEAD's (SegmentedTabs, ToggleGroupItem, Chip and accordion press-light under reduce; the accordion's leaked hover; WebKit closes ×4 on PF-1) | census family |
| E-6 | FAIL 4/2, 8 UNMEASURED | FAIL 2/2, 8 UNMEASURED | unchanged (no idle rung); Q-2 default (b) | C/D, or RETIRE per Q-2 |
| **E-7** | **PASS 4/4** | **PASS 4/4** | 1 writer, under `composables/motion/engage/`; held 2 nodes, held PRM 2, modal 0 | — |
| E-8 | **PASS 17/17** | FAIL 13/4 of 17 | WebKit's 4 FAILs are ToggleGroupItem and accordion page closes (PF-1), not literals. Hold line kept: the stage's grow reads `--spring-dock`/`--spring-dock-duration`, the veil the shipped `--duration-*` clocks | — |
| E-9 | FAIL 46/8 of 54 | FAIL 36/10 of 46 | Switch and Slider: press-spatial, press-light and commit-spatial PASS in both engines (the grow retires under reduce, the veil stays). FAILs as HEAD: four controls' press-light; WebKit page closes ×4; Button press-spatial 0.030 in WebKit (load 108-111, BASELINE §0.2's suspect cell, untouched by this patch) | census family; Button is `useLiquidPress`'s |

**E-3 keyboard-focused, RED with the reason.** An in-place focus grow was built (`.glass-slider:has(.slider-thumb:focus-visible) { scale: var(--scale-engage) }`) and it passed E-3 keyboard ×1.060. Filmed afterwards, it leaked. After a pointer drag, reka has focused the thumb by script and both engines report `:focus-visible true`, so the slider stayed at ×1.06 after release. Because the target never changed, the stage saw no transition and dropped the control out of the top layer at once (`R-E/logs/stage-backdrop-film.log`, "release" rows: `sc 1.06 open false` for 1 s; "focus-visible true on slider"). No clean keyboard-engaged signal exists on this control, so the arm was removed. Keyboard engagement is a rung E does not own: focus is not a hold, and the ladder's engaged rung is the hand's.

**E-3 phone touch-held, RED by the bound.** At HEAD the library scene's phone slider is the full 358 px column (`../harness/scenes/App.vue:103`). ×1.03 needs 368.7 px, and the gutter cell allows 358. The fixture passes both cells only because its phone slider is 300 px wide (`../harness/fixtures.mjs:120`). No route can pass both cells on the library scene by width. Proposed bound for the agglomerator: on a control that already fills its column, the phone arm reads area or block size (≥ ×1.03), inside the gutter. Under that bound the prototype passes (block ×1.058, inline ×1.000, gutter 16..374).

## 3 · Q-1 (passive components) in a census-checkable form (item 2)

E's answer is (c) by construction: the stage serves only controls a hand holds. The checkable form has two arms:

- **static:** the stage clients are the files that call `useEngageStage` (today `components/slider/Slider.vue`, `components/switch/Switch.vue`). A census family's declaration marks them as the `held` class with rung `engaged`; every other directory either names another class or is declared static with a reason.
- **runtime:** a client's exemplar held 450 ms carries `[data-engage-stage][data-engaged]`; a non-client's exemplar held 450 ms carries 0 `[data-engaged]` and 0 `[data-engage-stage]`. Measured on the passive atoms: Separator and Skeleton held 450 ms → `{engaged: 0, stage: 0}`, both engines, both themes (`glance-re.log`, passive rows). The accordion trigger, a one-shot control, is likewise not a stage client: pressed 300 ms → 0 engaged.

This plugs into E-1's contract (`../harness/HARNESS.md` §2 E-1) once a census family ships `ENGAGE_DECLARATION`; E does not ship one.

## 4 · The mount case, H-8 (item 3)

The stage engages only on the hold's edge (`watch(held)`, never `immediate`). A control that mounts already committed promotes nothing and pops nothing: E-2 `mount(committed)` PASS on the Switch and the accordion trigger, light and dark, both engines (scale range 0.000, body 0.00 px over 76-97 frames, `R-E/json/final/E-2-*.json`). A control that unmounts while held releases at once (`releaseStage(host, true)` in `onBeforeUnmount`), leaving no footprint or veil behind (`tests/styles/focus-veil.test.ts`, render test).

## 5 · Cost on the trio and the MIGRATION rows (item 4)

Measured with `git diff --numstat` in the worktree:

| file | + | − | role |
|---|---|---|---|
| `components/slider/Slider.vue` | 19 | 105 | both teleports, the veil-centre code, the scroll re-take and the inline z-raise deleted; one `useEngageStage` call; the loupe becomes the host's child (378 → 292 lines) |
| `components/slider/styles.css` | 16 | 6 | the loupe hangs host-relative; its show keys on the engaged host, with a starting style |
| `components/switch/Switch.vue` | 13 | 1 | `useDockHold` + `useEngageStage` |
| `components/accordion/AccordionTrigger.vue`, `components/separator/Separator.vue` | 0 | 0 | not stage clients (§3) |
| `composables/motion/engage/engageStage.ts` | 169 | 0 | the stage: promote, pin, veil, singleton, release on the transitions' end, the one writer |
| `styles/glass/engage-stage.css` | 74 | 0 | the UA popover box neutralized in `@layer base`; the pin unlayered (0,2,0); the grow and its gutter cap; PRM |
| `styles/glass/focus-veil.css` | 9 | 3 | in-clock keyed on the stage veil's `data-engaged` and the modal overlay's `data-state="open"` |
| `components/dialog/ModalOverlay.vue` | 1 | 1 | the veil loses its bare `data-engaged` |
| `composables/motion/index.ts`, `styles/glass.css`, `styles/tokens/scale-paper.css` | 16 | 0 | exports, import, `--scale-engage: 1.06` |
| tests: `tests/setup.ts`, `tests/styles/focus-veil.test.ts` | 58 | 40 | happy-dom has no popover API (stubs for `showPopover`/`hidePopover`/`:popover-open`); the render tests now read the promotion |

Verification in the worktree: `vue-tsc --noEmit -p tsconfig.src.json` clean; `-p tsconfig.test.json` clean except two `@mkbabb/glass-ui/fourier-math` resolution errors that need a `dist/` (the main checkout, which has one, reads 0). Vitest on `tests/styles`, `tests/components/{ui,dialog,sheet,dock}`, `switch*` and `lifecycle-cleanup`: 657 pass, 5 expected-fail. The 2 failures: `backdrop-prefix-normalization` arm (b) needs `dist/` and fails identically in a HEAD worktree; `glass-subtlety` "DISCOVERS its hosts" failed once under the parallel run and passed 36/36 twice alone.

**MIGRATION rows it creates** (consumer census: 0 authored reads of `glass-focus-veil`, `data-engaged`, `glass-loupe`, `data-focus-veil` or `--loupe-left/top` across value.js, keyframes.js, fourier-analysis, chicago, speedtest, atlas, sci-report and slides, `grep` excluding `node_modules`, `dist`, `bench/`, `.worktrees`):

1. `data-engaged` means held, and only the stage writes it: on the held control and on the stage veil. The modal's veil no longer carries it; it keys on its overlay's `data-state="open"`.
2. A held Slider or Switch is in the top layer: it carries `popover="manual"` and `data-engage-stage`, and while held it escapes ancestor clipping, stacking and `overflow`. An `.engage-footprint` span sits as its previous sibling while held, so a consumer's `:first-child`, `+` or `~` selectors around a Slider or Switch can change for the duration of a hold.
3. The Slider no longer writes `data-focus-veil` or an inline `z-index`; the loupe is the root's child, not a `<body>` child; `--loupe-left` and `--loupe-top` are gone.
4. New on `/motion`: `engageStage`, `releaseStage`, `useEngageStage`. New token: `--scale-engage` (1.06, T1 GROW's figure, under `HOVER_GEOMETRY_BUDGET` 1.08); FL-2 asks whether it belongs on the ladder row instead.

## 6 · Paint: the owner-glance set (item 5)

`R-E/shots/{head,re}-{chromium,webkit}-{light,dark}-…`: desk rest, slider held, slider released (+120 ms, mid-exit), slider focused, switch held, switch committed, accordion pressed and open (WebKit: focused and open by keyboard, PF-1), phone rest, phone slider held, and phone two fingers (Chromium). 42 per tree. Read by this seat, not judged: per REGISTRY §2.5 the iOS-27 verdict belongs to seats that did not build the route.

What the frames show, plainly:
- Desk held (`re-chromium-light-desk-slider-held.png` against `head-…`): the slider grows 6% over the veil, the loupe rides above it; at HEAD it sits at rest size over the same veil. Mid-exit at +120 ms: scale 1.017, veil 0.18 (Chromium) and 1.013, 0.11 (WebKit). It settles to rest and leaves the top layer by +1220 ms.
- Switch held: ×1.06 (44 → 46.6 px) with the veil. A 90 ms tap never frosts the world: veil opacity max 0 during the tap and in the 500 ms after, both engines (`glance-re.log`, "switch 90 ms tap"). That comes from the veil's 100 ms rank-6 lag.
- WebKit frames show no blur anywhere, including at HEAD: headless Playwright WebKit paints no `backdrop-filter` (§1 Q-3 control). Real Safari: UNMEASURED.
- O-87 (flatter, less blur): the route adds no lighting layer. The veil is the shipped recipe at the shipped tokens; the grow is geometry.

## 7 · Floor rows (REGISTRY §2.2) on this route

| row | state |
|---|---|
| FL-1 | clean break: no alias; the modal's presence meaning moved to `data-state="open"`; the teleported veil and loupe are gone, not kept beside the stage |
| FL-2 | the grow reads `--scale-engage` (one new row in the §11 scale table), the dock spring and the veil's existing clocks; E-8 PASS 17/17 Chromium. Open: whether the figure belongs on `ENGAGE_LADDER`'s engaged row |
| FL-3 | the veil keeps its removal under reduced transparency and forced colors (`focus-veil.css:166-174`, unchanged); the promoted control keeps its own forced-colors arm. Not read in a browser: UNMEASURED |
| FL-4 | coarse: the stage engages on the hold, never on hover. The 44 px touch floor holds (the Switch grows, never shrinks, while held) |
| FL-5 | singleton: measured (§1 Q-5) |
| FL-6 | nothing runs at rest: the stage and veil exist only during a hold |
| FL-7 | real Safari UNMEASURED in every visual claim |
| FL-8 | not addressed: the stage release carries no velocity (E-4 RED) |

## 8 · Open gaps (for the agglomerator)

1. E-3's phone-arm bound is infeasible on the library scene (§2). The proposed area/block-size bound needs the harness owner.
2. E-3's keyboard arm has no clean signal on the slider: reka's script focus makes `:focus-visible` true after any pointer drag, measured in both engines. Owner of the rung: a census family, or a reka-side fix.
3. Hallmark 6 on the stage: the release springs home on `--spring-dock` with no velocity. Pairs with B's rule.
4. Phone geometry is nearly invisible (block ×1.058 on a 24 px track): an owner glance and possibly a figure (Q-2).
5. The `.engage-footprint` sibling insertion beside Vue-managed nodes is untested under a parent re-render during a hold.
6. WebKit `::backdrop` transitions: worth reporting upstream once read in real Safari. The route no longer depends on them.
7. Real Safari for every row; VoiceOver for Q-4; a two-finger scrub that actually drives reka (instrument).

## 9 · Reproduce

```sh
H=docs/tranches/BL/design/engagement/harness; R=docs/tranches/BL/design/engagement/pass-1/R-E; S=<scratch>
git worktree add --detach $S/wt HEAD && ln -s "$PWD/node_modules" $S/wt/node_modules
git -C $S/wt apply "$PWD/docs/tranches/BL/design/engagement/pass-1/R-E.patch"
node $H/build.mjs $S/wt --label final --out $S/out
node $H/run.mjs --build $S/out/builds/final --wt $S/wt --only E-1,E-3,E-4,E-5,E-6,E-7,E-8,E-9 --verbose
node $H/run.mjs --build $S/out/builds/final --wt $S/wt --only E-2 --scenes switch,accordion --verbose
node $R/build-glance.mjs $S/wt --label re --out $S/out && node $R/glance.mjs --build $S/out/glance/re --label re --shots $R/shots
node $R/platform-probe.mjs; node $R/backdrop-control.mjs; node $R/backdrop-clock-probe.mjs
node $R/stage-flicker-film.mjs --build $S/out/glance/re
git worktree remove --force $S/wt
```

Artefact index: `R-E/logs/final-battery.log` (the scored run); `R-E/logs/re-battery.log` and `R-E/json/re/` (the first build, before the singleton fix, the focus-arm removal and the veil change, kept as the evidence for §2's E-3 keyboard and §1 Q-5); `glance-head.log` (first HEAD glance) and `glance-head-2.log` (the one compared); `stage-flicker-film.log` (`::backdrop` with `@starting-style`), `stage-flicker-film-fixed.log` (the engage one frame later: WebKit snaps, no ramp), `stage-flicker-film-veil.log` (the shipped veil element); `debug-probe.log`, `backdrop-restart-probe.log` (the plain-page restart did not reproduce: the glitch needs the stage's page).
