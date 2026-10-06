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
| self-test | GREEN, `harness/SELFTEST.md` (76 runs + 8 for E-4 after its fix) |
| artefacts | `baseline/head/head.log` (every FAIL and UNMEASURED line), `baseline/head/json/<id>-<engine>.json` (every cell, PASS included, with its load), `head-e4.log`, `e4-tabsdrag-repeat.log`, `tabsprobe.mjs` + `tabsprobe.log` (the tabs drag filmed per frame) |

## 1 · Verdicts

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
