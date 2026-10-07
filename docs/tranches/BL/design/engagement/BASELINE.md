# D5 · the engagement battery at HEAD

| field | value |
|---|---|
| seat | D5 round-0 battery seat |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `a1732a48`, in a scratch worktree (`git worktree add --detach`, removed after the run). `git diff --stat v10.1.0 HEAD -- src` prints nothing: the published 10.1.0 bytes, as at round 0 (`REGISTRY.md:7`) |
| build | `node harness/build.mjs <wt> --label head --out <scratch>/out`: `55 component directories · declaration composables/motion#ENGAGE_DECLARATION`; Vite warns `Import ENGAGE_DECLARATION will always be undefined because there is no matching export in src/composables/motion/index.ts` |
| run | `node harness/run.mjs --build <out>/builds/head --wt <wt> --out <out>/runs/head --verbose`, 12:06:05-12:31:24 local, exit 1 (`baseline/head/head.log:1,220-221`). E-4 again after its fix, 12:34:02, exit 1 (`baseline/head/head-e4.log`) |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, headless. **Playwright WebKit is not Safari.** Real Safari: **UNMEASURED (owner's safaridriver checkbox)** in every row |
| load | 8.90/10.52/10.03 at the start, 23.10/12.12/10.10 at the end (`head.log:2,222`); 28.21/18.19/12.94 at the E-4 re-run (`head-e4.log:2`). Other seats' browsers shared the machine; every cell line carries its own load |
| self-test | GREEN, `harness/SELFTEST.md` (pass 1: 98 runs, both engines; it supersedes round 0's 76) |
| pass-1 re-run | §0 below: pass 1's harness (H-1..H-9 landed) at `5d078ca4`, `src/` still the 10.1.0 bytes. §§1-6 are round 0's reading at `a1732a48`, kept because §0 restates none of it |
| artefacts | `baseline/head/head.log` (every FAIL and UNMEASURED line), `baseline/head/json/<id>-<engine>.json` (every cell, PASS included, with its load), `head-e4.log`, `e4-tabsdrag-repeat.log`, `tabsprobe.mjs` + `tabsprobe.log` (the tabs drag filmed per frame) |

## 0 · Pass 1: HEAD under the landed harness (R-H)

| field | value |
|---|---|
| seat | D5 pass 1, R-H; model `claude-opus-5-5`, asserted from own system identity |
| HEAD | `5d078ca4`, in a scratch worktree (removed after the run); `git diff --stat v10.1.0 HEAD -- src` prints nothing |
| run | `run.mjs --build <out>/builds/head --wt <wt> --verbose --only E-1,E-3,E-4,E-5,E-6,E-7,E-8,E-9`, 17:09:54 on (`baseline/p1/head.log`); the WebKit E-3, E-5 and the E-8 PRM re-runs in `baseline/p1/head-final.log`. Every cell with its load: `baseline/p1/head-cells.log`, `head-final-cells.log` |
| load | **233-830 (1-minute) throughout**: other seats' browsers, test suites and builds (`head.log:1`, `head-final.log:1,19`). Every cell carries its load. Timing-sensitive cells read under this load are marked; none is called a defect on this run alone |
| not re-read | **E-2** (stopped: at this load one witness took 25-80 min; round 0's §1-§2 reading stands, the harness did not change E-2). **E-8 WebKit, E-9 WebKit**: hung past the 1500 s deadline twice (`head.log:84,98`), before the harness's bounded engine kill landed. Round 0's WebKit readings stand for them |

| witness | Chromium | Playwright WebKit | what is new against round 0 |
|---|---|---|---|
| E-1 | FAIL 0/3 (`head.log:2`) | FAIL 0/3 (`:6`) | unchanged: no declaration; the PRM cell is not reached |
| E-3 | FAIL 6 / 6 of 12 (`:10`) | FAIL 6 / 6 of 12 (`head-final.log:10`) | **the WebKit phone arm reads (H-4)**: touch-held 358.0 → 358.0 px (×1.000), light and dark; all four **PRM cells PASS** in both engines (nothing grows, so nothing grows under reduce: vacuous at HEAD) |
| E-4 | FAIL 4 / 6 of 10 (`:24`) | FAIL 3 / 5, 2 UNMEASURED of 10 (`:31`) | five surfaces (H-7), table below |
| E-5 | FAIL 18 / 10 of 28 (`:39`) | FAIL 13 / 7 of 20, five scenes (`head-final.log:2`) | **WebKit reads (H-4)**. The accordion trigger fails as in round 0 (Chromium `:46,48`). **PRM press-light FAILs** on SegmentedTabs, ToggleGroupItem, Chip and the accordion trigger in Chromium (`:40-49`), and on SegmentedTabs and Chip in WebKit (`head-final.log:3-6`) |
| E-6 | FAIL (`:54`) | FAIL (`:65`) | unchanged: 0 idle animations; `shape` UNMEASURED with the others; PRM vacuous |
| E-7 | FAIL 2 / 2 (`:76`) | FAIL 2 / 2 (`:79`) | unchanged (2 writers; the open modal's veil carries `data-engaged`); **held PRM PASS** in both (2 nodes under reduce) |
| E-8 | first read FAIL 16 / 1 of 17 (`:82`); after the fix PASS 5/5 on the two scenes concerned (`head-final.log:17`) | not re-read | the one FAIL was the harness: the accordion's reduce arm runs `disclosure-open`/`-close` at 0 ms, an instant, and the witness called it a minted figure. Durations ≤ 1 ms are now instants. The PRM cells are otherwise GREEN: a hold line, as E-8 is |
| E-9 | FAIL 45 / 9 of 54 (`:88`) | not re-read | Chromium as round 0: four controls keep no press-only light answer under reduce (SegmentedTabs, ToggleGroupItem, Chip, the accordion trigger). New: **Button press-spatial dark FAILs in Chromium** (range 0.030, `:97`; round 0 read it in WebKit only), light passes; read at load 427, so it is load-suspect until re-read |

### 0.1 E-4 across the five surfaces (H-7)

| surface | Chromium | Playwright WebKit | reading |
|---|---|---|---|
| slider | FAIL: carry 0.00, settle 0.00 both releases (`:25`) | FAIL, same (`:32`) | as round 0. PRM PASS (vacuous: nothing moves after release) |
| tabs drag | FAIL: difference carry 1.96 px, settle 1.82 px; largest one-frame jump 247.8 px both releases (`:26`) | PASS: difference carry 4.60 px, settle 0.00 (`head-cells.log:48`), the round-0 split again: a coast the landing discards, just over the bound | as round 0. **PRM FAILs NOT DRIVEN** in both engines: under reduce the indicator does not follow the drag at all (moved 0.0 px, `:27,33`). Reduce took the drag away, not only its spring |
| Sheet detents | FAIL: the press point (350, 535) lies outside the 700×500 viewport (`:28`) | FAIL, same (`:34`) | **the detented sheet paints in flow.** `.glass-floating { position: relative }` (0,1,0, `src/styles/glass/ladder.css:124-131`) beats `:where([data-slot="sheet-content"]) { position: fixed }` (0,0,0, `src/components/sheet/styles.css:29-32`), both in `@layer components`. Computed `position: relative` with the class, `fixed` without it; the sheet's top sits at 500 px (the end of the document) instead of 328 px, both engines, four reads (`../pass-1/rh/film.log`). This is the harness build (`src` through `@glass`); the shipped package and the demo were not opened. Momentum on the sheet is unreadable until the sheet is on screen |
| sortable list | FAIL: difference carry −2.91 px, settle 0.00; largest one-frame jump 75.2 px (fling) vs 16.7 px (still) (`:30`) | FAIL: −0.01 / 0.00; jump 81.2 vs 14.1 px (`:36`) | **the fling's ghost flies home and the row teleports.** Filmed (`../pass-1/rh/film.log`, 3 readable flings of 4, both engines): after a fling the ghost flies back toward row a's original slot (y ≈ 21-31 px), then is replaced in one frame by the row at its new slot (y = 105 px): a 74-84 px jump. After a still release the ghost flies to 105 and hands over without a jump. Order after both is `bcadef`. The filmed loads were 570-780; the same shape was read at load 56 earlier in this session and in both engines, so it is not load-only. PRM PASS |
| Carousel (scroll-snap, touch) | **PASS**: fling carries 507 px, still settles back −105 px (`head-cells.log`, E-4 chromium) | UNMEASURED: macOS WebKit does not scroll on touch (`:37`) | the platform's own momentum and snap carry the velocity. PRM PASS (no overshoot) |

### 0.2 Load-suspect cells (not counted as readings)

E-5 WebKit `button press dark`, `press_switch press light`, `press_checkbox press light` read `touch-changed []` with `:active true` at load 799-811 (`head-final.log:7-9`), while their other theme passed in the same run; the round-0 Chromium cells for the same controls pass. Re-read at a sane load before any of them is called a defect. Same for E-9 `button press-spatial dark` in Chromium (§0 table).

## 1 · Verdicts (round 0, `a1732a48`)

| witness | Chromium | Playwright WebKit | the live defect it reads | HEAD |
|---|---|---|---|---|
| E-1 census | FAIL 0/3 (`head.log:3`) | FAIL 0/3 (`:7`) | no declaration exists: 0 of 55 directories declared, no classes | **RED** |
| E-2 commit bar | FAIL 36 pass / 60 fail of 96 (`:11`) | FAIL 36 / 60 of 96, 8 of the 60 engine closes (`:72`) | 58 of 64 commit cells per engine neither pop nor travel with weight; SegmentedTabs mounts with a glide | **RED** |
| E-3 slider | FAIL 2 / 6 of 8 (`:133`) | FAIL 0 / 4, 4 UNMEASURED (`:140`) | ×1.000 held, focused and touch-held | **RED** |
| E-4 momentum | FAIL 0 / 2 (`head-e4.log:3-5`) | FAIL 1 / 1 (`head-e4.log:6-7`) | the slider carries nothing; the tabs indicator lands where a still release lands | **RED** |
| E-5 touch | FAIL 12 / 2 of 14 (`:154`) | UNMEASURED 14/14, exit 3 (`:157`) | the accordion trigger's only touch answer is leaked hover | **RED** (Chromium) |
| E-6 idle | FAIL 4 / 2, 6 UNMEASURED of 12 (`:172`) | FAIL 2 / 2, 6 UNMEASURED of 10 (`:181`) | no idle rung on the S6 subject | **RED** (absent) |
| E-7 one writer | FAIL 1 / 2 of 3 (`:190`) | FAIL 1 / 2 of 3 (`:193`) | 2 writers; an open modal carries `data-engaged` with nothing held | **RED** |
| E-8 clock | PASS 9/9 (`:196`) | FAIL 7 / 2 of 9, both engine closes (`:197`) | none: a hold line (§4) | **GREEN, hold line** |
| E-9 PRM | FAIL 46 / 8 of 54 (`:200`) | FAIL 36 / 10 of 46, 4 engine closes (`:209`) | four controls keep no press-only light answer under reduce; Button squishes under reduce in WebKit | **RED** |

Eight witnesses are RED where the defect is live. E-8 is GREEN on its property in both engines, as W-J.2 planned it (§4).

## 2 · What each RED witness reads

**E-1.** `declaration present` FAIL, `the export does not exist; 55 directories to declare`; `denominator declared` FAIL 0 of 55; `class carries a rung` FAIL (`head.log:4-6`). The runtime cells are not reached: there is no class to exemplify. This is the round-0 reading (`PORTFOLIO.md:37`) without the byte detector (H-6). A route's declaration is read from the built library under the contract `HARNESS.md` §2 E-1 names.

**E-2.** Per scene, light and dark, both engines (cells: Tab entry, keyboard, programmatic, pointer, tap on a coarse pointer, mount):

| scene | Tab entry | keyboard | programmatic | pointer | tap (coarse) | mount (committed) | what the commit does |
|---|---|---|---|---|---|---|---|
| Switch | PASS | FAIL | FAIL | FAIL | FAIL | PASS | the thumb travels 20.00 px and lands with 0.00 px overshoot (`:12`); the coarse tap reads the press trough 0.960 and no pop (`:15`) |
| Checkbox | PASS | FAIL | FAIL | FAIL | FAIL | PASS | scale 1.000 throughout |
| RadioGroup | PASS | FAIL | FAIL | FAIL | FAIL | PASS | scale 1.000 throughout |
| SegmentedTabs | PASS | **PASS** | FAIL | **PASS** | **PASS** | **FAIL** | gestures travel with an overshoot; the programmatic commit glides 78.31 px with 0.00 overshoot (`:36`); **mounted already committed, the indicator travels 123.09 px (Chromium) and 120.65-121.81 px (WebKit) on mount** (`:37,39,98,100`) |
| ToggleGroupItem | PASS | FAIL | FAIL | FAIL / WebKit closes | FAIL / WebKit closes | PASS | a colour change; the pointer and tap settle on a hover lift of 1.015 with no bounce |
| Chip (selectable) | PASS | FAIL | FAIL | FAIL | FAIL | PASS | the flood rises to 1.090 and settles at 1.074 with no bounce below it (`:48`) |
| Accordion trigger | PASS | FAIL | FAIL | FAIL / WebKit closes | FAIL / WebKit closes | PASS | nothing on the trigger (1.000) |
| Button | PASS | FAIL | FAIL | FAIL | FAIL | PASS | the release settles on the hover lift, 1.015 (`:66`) |

6 of 64 commit cells pass per engine, all SegmentedTabs gestures (round 0 read 2 of 24 in Chromium, `PORTFOLIO.md:38`; this battery adds the tap and dark cells). WebKit closes the page on 8 cells: the pointer and the coarse tap on ToggleGroupItem and on the accordion trigger, light and dark, each `ENGINE CLOSED, REPRODUCED 2/2` (`:103-108,119-124`). The tap closures are new: round 0 recorded pointer entry only (`PORTFOLIO.md:96`, D4 PF-1).

**E-3.** Desk, both engines, light and dark: rest 360.0 px, pointer-held 360.0 (×1.000, 2 `[data-engaged]` nodes, the veil and the loupe), keyboard-focused 360.0 (×1.000) (`:134,141`). Phone, Chromium: rest 358.0, touch-held 358.0 (×1.000, 2 `[data-engaged]`) (`:136`). WebKit phone: UNMEASURED (no held-touch input, H-4) (`:143`).

**E-4.** After the fix (§3): the slider, both engines: fling and still releases both carry 0.00 px and settle 0.00 px (`head-e4.log:4,7`), the round-0 reading (`PORTFOLIO.md:80`). SegmentedTabs' draggable indicator, both releases at rest:

| engine | fling carry | still carry | difference | both settle (past release) | largest one-frame jump | cell |
|---|---|---|---|---|---|---|
| Chromium | 40.03 px | 36.73 px | 3.30 px | −54.53 px | 247.8 px | FAIL (`head-e4.log:5`) |
| WebKit | 44.37 px | 36.93 px | 7.44 px | −54.34 px | 240.5 px | PASS (`json/E-4-webkit.json`) |

Three more reads per engine at load 26.6-32.9: WebKit differences 5.76, 6.72 and 7.42 px (PASS 3/3); Chromium −0.00, 3.46 and 2.19 px (FAIL 3/3) (`e4-tabsdrag-repeat.log`). The split is stable, not noise. What the film shows (`tabsprobe.log`, both engines): after release the indicator coasts to about 339 px, past the strip's right edge (the strip spans about 52-287 px), holds there for about 0.6 s, jumps back to about 93-116 px in one frame, and springs to tab C's centre, 247.8 px. The fling and the still release land on the same tab. So the release velocity lengthens the coast a little (more in WebKit than in Chromium) and the landing discards it. E-4 is RED in both engines on the slider. Whether a coast the landing discards counts as hallmark 6 goes to pass 1 (§5).

**E-5.** Chromium: Tabs, ToggleGroupItem, Chip, Button, Switch and Checkbox answer a held touch through a press rung (12 PASS). The accordion trigger, light and dark: `:active true · Δscale 0.000 · touch-changed [background-color] · hover-changed [background-color] · press-only []` (`:155`), the round-0 reading (`PORTFOLIO.md:82`). WebKit: 14 UNMEASURED (H-4).

**E-6.** Both engines, light and dark: `0 running infinite animation(s) at rest` on the Switch (`:173,182`). The channel, amplitude and period cells are UNMEASURED with nothing to read. The Chromium `layouts/s` and both `PRM` cells pass because nothing runs; they gate a rung once one exists (§4).

**E-7.** Static: `2 writer file(s): src/components/dialog/ModalOverlay.vue, src/components/slider/Slider.vue` (`:191`). They are `ModalOverlay.vue:74` (a bare `data-engaged` on `.glass-focus-veil`) and `Slider.vue:289,307` (`:data-engaged="isHeld || undefined"`). Runtime, both engines: `dialog open true · veil nodes 1 · [data-engaged] nodes 1 (glass-focus-veil) · bound 0` (`:192,195`). The held slider carries ≥ 1 (PASS), the meaning the split must keep.

**E-9.** Under `prefers-reduced-motion: reduce`, verified:

| scene | press-spatial | press-light | commit-spatial |
|---|---|---|---|
| Switch, Checkbox, RadioGroup, Slider | PASS both | PASS both | PASS both |
| SegmentedTabs | PASS both | **FAIL both** (press-only paint []) | PASS both |
| ToggleGroupItem | PASS Chromium; WebKit closes (`:212-213`) | **FAIL Chromium**; WebKit not reached | PASS Chromium |
| Chip | PASS both | **FAIL both** | PASS both |
| Accordion trigger | PASS Chromium; WebKit closes (`:216-217`) | **FAIL Chromium**; WebKit not reached | PASS Chromium |
| Button | PASS Chromium (0.000); **FAIL WebKit, range 0.030** (`:218`) | PASS both (`::before opacity`) | PASS both |

Under reduce, the four controls that answer a press with scale alone keep no light answer. Button's press squish (`useLiquidPress`) retires under reduce in Chromium and not in Playwright WebKit. That engine split is a new reading; it is not checked against real Safari.

## 3 · The harness correction this run forced

The first HEAD run read E-4 with a fixed 700 ms window (`head.log:149-153`): Chromium tabsdrag FAIL `settles -208.91 px`, WebKit tabsdrag PASS `still: settles -123.58 px … settle 160.40 px`. The film shows both "settles" are frames in flight. In WebKit the still release's jump had started by 700 ms and the fling's had not, so the witness credited a timing accident: a GREEN that was vacuous. E-4 now reads 2000 ms, requires both releases at rest, and prints the largest one-frame jump. The plant `e4-hold` reproduces the shape: the old window PASSes it in both engines and the fixed witness FAILs it (`harness/SELFTEST.md` §3). `json/E-4-*.json` hold the corrected run; `head.log`'s E-4 lines are the superseded reading, kept as the evidence.

## 4 · Every GREEN at HEAD, accounted for

| GREEN | class | evidence |
|---|---|---|
| E-8 as a whole (Chromium 9/9; WebKit 7/7 measured) | **hold line**, not a cured defect and not vacuous. W-J.2 plans G6 as a hold line (`W-J.2.md:96`); round 0 registered it so (`REGISTRY.md:49`) | the reads are live: the mirror compares 4 rows with 8 `--engage-*` tokens, no drift, no orphan; the literal cells saw 7-76 animations per scene against 54-56 clock tokens, minted [] (`json/E-8-chromium.json`). The self-test fails it on `e8-drift` and `e8-literal` in both engines. Its 2 WebKit FAILs are page closes on ToggleGroupItem and the accordion trigger (`:198-199`), not literals |
| E-4 tabsdrag, WebKit | **a real partial carry**, neither cured nor vacuous | stable 4 of 4 reads (5.76-7.44 px), both releases at rest; the landing ignores the velocity (§2 E-4). The checklist question is §5 item 1 |
| E-2 Tab entry, 16 per engine | guard: entry must stay quiet | each cell sampled 700 ms; `e2-tabpop` proves it can fail |
| E-2 mount, 14 per engine (all but SegmentedTabs) | guard (H-8) | `e2-mountpop` proves it can fail; SegmentedTabs fails it at HEAD |
| E-2 SegmentedTabs keyboard, pointer, tap | the shipped commit that already meets the bar (`PORTFOLIO.md` §2.5) | travel 78 px with an overshoot |
| E-3 phone gutter, Chromium | guard, vacuous at HEAD by construction (nothing grows) | `e3-gutter` fails it; it gates any in-place grow (`PORTFOLIO.md` §2.4) |
| E-5, 12 Chromium cells | other components' press rungs exist | the witness is RED on the accordion trigger |
| E-6 layouts/s and PRM | vacuous at HEAD (no animation runs); the `present` cell carries the RED | `e6-layout`, `e6-prm` prove they fail when a rung exists |
| E-7 slider held | guard: the held meaning survives the split | `e7-veil`, `e7-two` fail the other two cells |
| E-9 cells outside the table's FAILs | controls that already retire their spatial legs under reduce | `e9-scale`, `e9-dark`, `e9-glide` prove each cell can fail |

## 5 · Open after this run

1. **E-4's carry arm on a snapping surface.** The tabs indicator's coast scales a little with velocity, but the release lands on the same detent as a still release. Is the bound "carry or settle ≥ 4 px", as round 0 fixed it (`PORTFOLIO.md:40`, `HARNESS.md` §2 E-4), or "the settle carries" for a surface with detents? This is for pass 1's checklist. The witness reads both numbers already.
2. **Candidate row: the tabs drag's release.** About 0.6 s held off the strip, then a one-frame jump of about 240-248 px back across it before the snap (`tabsprobe.log`). D-1 (inertia, weight) is broken on a shipped surface, and no witness gates a teleport. Route to the loop's agglomerator; the largest one-frame jump is already printed by E-4.
3. **Candidate row: SegmentedTabs mount glide.** A strip mounted with its choice made glides its indicator about 121-123 px on mount, in both engines (§2 E-2). H-8 is live on a shipped component, not only a risk the families share (`REGISTRY.md:76`).
4. **PF-1 widens.** Playwright WebKit closes the page on the coarse tap, not only on pointer entry, for ToggleGroupItem and the accordion trigger; it also closes the E-8 and E-9 cells there. The crash is PF-1's owner's (`REGISTRY.md:71`).
5. **Button under reduce, engine split.** press-spatial 0.000 in Chromium, 0.030 in Playwright WebKit. Real Safari is needed before this is called a product defect.
6. Owed rows unchanged: H-2 (exemplars per declared class), H-4 (WebKit held touch), H-7 (three of five momentum surfaces: Sheet detents, sortable list, a scroll-snap surface), FL-6 (an idle rung stops off-screen), FL-7 (real Safari), a `dist` flavour (`harness/HARNESS.md` §3).
7. `REGISTRY.md` §2.1 still lists E-9 as "not measured at round 0" (`REGISTRY.md:50`). It now reads RED here; the agglomerator updates the registry row, citing this file (P-3).

## 6 · Reproduce

```sh
H=docs/tranches/BL/design/engagement/harness; S=<scratch>
git worktree add --detach $S/wt a1732a48
ln -s "$PWD/node_modules" $S/wt/node_modules
node $H/build.mjs $S/wt --label head --out $S/out
node $H/run.mjs --build $S/out/builds/head --wt $S/wt --out $S/out/runs/head --verbose
node docs/tranches/BL/design/engagement/baseline/head/tabsprobe.mjs $S/out/builds/head webkit   # the tabs film (edit its import path if the harness moves)
git worktree remove --force $S/wt
```
