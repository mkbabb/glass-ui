# W-I.8: the rulings on the seventh measure

The ruling seat, claude-opus-5-5, in the seat written for Fable (out of quota until 2026-11-21; the owner's standing ruling puts design, ruling and critique seats on Opus until then). 2026-11-17. I wrote none of the wave, the prototype, the challenges, the folds, the measurements or the verification. I launched no browser and no build, changed no source, and staged nothing. RU-66 to RU-85 follow RU-52 to RU-65 (`RULINGS-6.md`, as its fold amended it) and the orchestrator's four binding lines (`ORCH-LINES-6.md`). Each ruling is the owner's to reverse.

*Folded (fold 7).* The fold seat, claude-opus-5-5, in the seat written for Fable, 2026-11-17, folded `challenge-7-restraint.md` (R7-1 to R7-9), `challenge-7-measurement.md` (C7-M1 to C7-M14) and `challenge-7-consumers.md` (C7-1 to C7-13) into this file in place. Each accepted objection is a paragraph beginning *Amended (fold 7: id)* in the ruling it answers. The lists that close this file (the orchestrator's lines asked for, the eighth-pass order, the ready list, the REMOVES list and the budget arithmetic, the owner questions, the step-10 messages) are the fold's, and they are the one source of record: the ruling seat's versions are struck to pointers. Every disposition, with its evidence, is in `fold-7.md`.

*Second round (fold 7).* The fold seat, claude-opus-5-5, in the seat written for Fable, 2026-11-17, ruled RU-86 to RU-88 (section (h)) on what a completeness check found open: each kept name's site line, `data-dock-glyph`, and fourier's `StageDock`. The final lists and drafts are corrected where they stood, and the dispositions are appended to `fold-7.md`.

**What I read.** In full: `RULINGS-6.md` with every amendment, `ORCH-LINES-6.md`, `MEASURE-7.md`, `verify-7.md`, `OWNER-READ.md`. Every strip in `fold/` named `-7`, each opened (both engines where two exist): `strip-ladder-7`, `strip-fold-7`, `strip-swap-7`, `crop-many-7`, `strip-names-7`, `strip-hover3-7`, `strip-glyph3-7`, `strip-glyph-7`, `strip-hover-7`, `strip-seatset-7`, `strip-phone-7`, `strip-legend-7`, `strip-inflow-7`, `strip-cue-7`, `strip-transport-7`. The owner's frames `f1`, `f4`, `f5`, `f6`, `f8` and `owner-frame-120.png`. On `bl/dock/wi8` (src at `943fe6e9d`, the pass at `3a923d2ea`), read only: `dock.css:100-260`, `shell.css:110-160`, `:450-470`, `adaptive-legibility.css:60-115`, `glass.css:120-180`, `glass/veil.css:22-80`, `glass/a11y-fallback.css:15-50`, `dark-arm.css:270-300`, `sizing.css:210-285`, `triggers.css:40-75`, `tab-button.css`, `icon-button.css:240-275`, `morph.css:200-320`, `ControlsDock.vue`, `GlassDock.vue:84-93`, `:140-160`, `:449-518`, `useDockBody.ts:494-567`, `:720-730`, `:1045-1060`, `useGlassBackdropLuminance.ts:295-330`, `:425-440`, `ModalOverlay.vue`, the diff of `ec71b3cd4`, `GlassDock.posture.test.ts:140-200`; harness `m7/ink7.mjs`, `m7/trig7.mjs`, `m7/owner8.mjs:1-60`, `m7/owner7.mjs:105-115`, `m7/strips7.py:1-20`, `m7/g16.sh`, `m6/judge7.mjs:1-60`, `:230-360`, `:383-460`, `m6/comp/action-row.stage.vue`, `m7/comp/chrome.stage.vue`; logs `m7-ladder-read.txt`, every `m7-ink-ladder*`, `m7-ink-base1102.*`, `m7-ink-m7p.*`, `m7-ink-plant7-baked.*`, `m7-trig-*`, `m7-appgrep.txt`, `m7-g16-*.json`, `m7p-g16.txt`, `m7p-judge-chromium.txt` (the reversal rows), `m7-step3-cost.chromium.txt` (head). `docs/precepts/motion-canon.md` P0a; `INPUT-first-load-size`, `INPUT-hover-shift`, `INPUT-gregg`; `audit/dock-usage/USAGE.md` (the rim and gregg entries). On the main checkout, `git` over the tags `v11.0.2`, `v11.1.0` and `master`.

**What is a reading.** *Record* quotes another seat's log. *Source* quotes code. *Count* is my own `git` count. *Pixels* is my own look at a strip's image file, not a measurement. *Hypothesis* has no reading behind it and is read before it is cured.

## A finding no seat had made

**The branch does not contain v11.0.2 or v11.1.0.** *Count*: `git merge-base --is-ancestor v11.0.2 943fe6e9d` and the same for `v11.1.0` both answer no; the branch's base is `99a1389e6`, from before either. 11.0.2 and 11.1.0 carry about twenty dock commits the branch lacks (O-262, O-269, O-270, O-300, the six-second idle, O-360a among them): +944 −193 lines over 17 dock files, plus `useGlassBackdropLuminance.ts` (+99). Three of the seventh pass's reds come from that gap and not from the redesign:
- G-15's loose `DockControl` cell differs from v11.0.2 because the branch lacks O-269's dark seat fills (`8124e3e53`), which MEASURE-7 reported for that cell alone.
  *Amended (fold 7: C7-M5).* The dark half only. The cell's light hover reads 11.914 (Chromium) and 11.933 (WebKit) against v11.0.2's 1.287 and 1.293 because `ink7` took a glyph pixel, (28,25,23), as the hover's fill; that is the instrument's, and it stays after the merge until RU-82's background read cures it.
- G-11's second extra layout is the luminance sampler forced inside a ResizeObserver delivery (`useGlassBackdropLuminance.ts:433`, `useResizeObserver(target, () => sampleNow())`). On v11.1.0 that line is `requestBatchSample()`, one batched sample on the next frame (*Source*, `git diff 99a1389e6 v11.1.0`, the O-360a work).
  *Amended (fold 7: C7-M6).* That the merge cures this layout is a *Hypothesis*, as RU-74 labels it. The batched sample runs in the next frame, after the carrier has written `--dock-expand-t` and `--dock-morph-t` (`useDockBody.ts:1057`, `:1075`), so its read may still force a layout, one frame later, where G-11 does not look. RU-74 reads it by stack after the merge before anyone counts it cured.
- RULINGS-6's line bound (10,880) was set from the prototype's 11,225 lines, a tree that never held 11.1.0's dock fixes, against v11.1.0's 11,081, which does. The bound has to absorb the merge it assumed had happened.

Everything measured on this branch is a reading of a release that will not ship, so the eighth pass merges first (RU-66).

## The orchestrator's four observations, verified

| # | the note | verdict | ruling |
|---|---|---|---|
| 1 | dark 0.4 is a near-opaque slab while 0.7 and 0.85 read as glass; in light the plate whitens as the level falls and the selection shows at every level; one level may not serve both themes | **Confirmed, and the light ladder is not monotone.** *Record* (dials, Chromium, open): light plate (225,177,155) on field (247,201,183) at level 1, darker than its field, 1.278; (243,218,204) at 0.4, lighter than its field, 1.121; between, near 0.55 to 0.7, it crosses the field's luminance and stands off by 1.04 to 1.06. Dark darkens monotonically, 1.055 to 1.785. Only level 1 stands off more than v11.0.2 in light (1.195 Chromium, 1.191 WebKit); in dark level 1 equals today's (1.055 against 1.044). The marks in light read 1.79 to 2.28 at every rung. One number cannot serve both | RU-67 |
| 2 | the folded and open columns are the same frames | **Confirmed.** *Source*: the dials stage mounts `:collapse="false"` (`dials.stage.vue:30`); *Record*: `owner8.*.json` gives `open: true` on all 24 "folded" frames per engine; `ink7`'s "folded" is the page at rest with the pointer at (2, 2) (`ink7.mjs:169-170`, `:190`). No folded plate was read | RU-83 |
| 3 | a black band down the right edge of every 390 dark crop | **A harness crop, not an overflow.** *Source*: `owner8.mjs:51-55` pads the dials dock by 40 px and clamps the clip to the viewport, never to the stage. *Pixels*: the stage at 390 is a card inset 24 px from the viewport (`strip-phone-7`), so the clip runs past the card into the page, near-black in dark, near-white in light (invisible on the strip's white). The bands sit on both edges of the dark crops, the right one wider | RU-83 |
| 4 | the first row is labelled v11.0.2's veil but reads as level 1's plate | **Confirmed.** *Record*: `m7-ink-laddertoday.*` and `m7-ink-ladder1.*` give the same plate colour on every dials cell, (142,85,66) dark and (225,177,155) light in Chromium. No row shows today's dock | RU-69 |

*Amended (fold 7: R7-1, C7-M1).* Row 1's "only level 1 stands off more than v11.0.2 in light" holds on the warm field; on the flat ground 0.85 (1.27) and 0.7 (1.211) also read at or above today's 1.208. "One number cannot serve both" stands, on the readings in RU-67's amendment.

## The rulings

### (a) The branch

**RU-66. The branch carries master before anything is measured again.**
Merge `master` at its head (it holds v11.0.2, v11.1.0 and the later source fix `e7c0be688`) into `bl/dock/wi8`, as the first source commit of the eighth pass. Each 11.0.2 and 11.1.0 dock commit is carried, or recorded as superseded in the merge's message with the shipped witness that proves the redesign covers it; a commit whose file the redesign deleted (`useDockRunMark.ts`, `dockMorphMeasure.ts`) is superseded by the deletion and its release spec is read.
*Reason.* 11.2.0 ships over 11.1.0, so a reading on a tree without 11.1.0's dock fixes measures nothing that ships, and three of this pass's reds are that gap (above).
*Witness.* G-14 gains the two spec sets the branch lacks, `tests-visual/release-11-0-2*` and `tests-visual/ro-loop*`, and master's snapshot is re-taken on the merged-from commit for all of G-14. The budget's three numbers and G-16 are read again right after the merge.
*Touches.* The merge; `useGlassBackdropLuminance.ts:433` arrives as v11.1.0 wrote it.
*Amended (fold 7: C7-1).* `useDockRunMark.ts` is not a file the redesign deleted. *Count*: it is absent at the branch's base `99a1389e6` and at the tip `943fe6e9d`; v11.1.0 added it with `1263cd5cf` ("feat(dock): content-sized collapsed face, gliding nav mark, border-edge progress rim") and seven fixes (`33a826d11`, `bd16cb097`, `55c5dc48d`, `0bd7ed13d`, `ecefe3260`, `df8a65446`, `02d13a4c7`). It is a shipped feature: one plate per navigation run that glides between seats on the dock spring, written because "each seat used to paint its own selected plate, so a change of destination cut" (*Source*, v11.1.0 `useDockRunMark.ts:1-8`). RULINGS-6's "Removed by this redesign and already built: … `useDockRunMark.ts`" and RULINGS-4's "moving it costs 11.2.0 nothing it has today" were both read on a base that never had it.
- *The merge carries it* onto the redesign's run, on its merit: the owner's rule that nothing changes instantly and every change tweens with weight is what it does. gregg (pinned to 11.1.0, PageDock and HeroPlate built on it, its own indicator deleted for it, `style.css:502`: "the current control is then told by the gliding mark under its label alone") shows it is in use; that is the consumer, not the reason.
- The mark paints RU-68's current step, and the seat under it paints no fill of its own, as in v11.1.0.
- *Witness.* master's `tests/components/custom/dock/GlassDock.run-mark.test.ts` joins G-14, with a plant: the mark's move removed, so the plate jumps (RED). G-15's mark clause reads the mark's plate on the current seat as it reads a seat's fill.
- *Budget.* Its 282 lines (about 181 of code) are counted in the merged tree. It adds no public name (`useDockRunMark` and `isRunSeat` are imported by `GlassDock.vue` and `useDockRun.ts` only).
- `dockMorphMeasure.ts` stays superseded by its deletion. The merge's message names the 11.1.0 changes to it (`1263cd5cf`'s content-sized folded face) and the witness that covers them (RU-76's G-13 line).

### (b) The plate and the fills

**RU-67. The plate's level is one number per scheme: level 1 in light, 0.7 in dark. Level 0.4 is withdrawn in both. ORCH line 4 is restated.**
*Record*, the plate against the field under it on dials, open, Chromium / WebKit at 1440 (390 where 1440 is unread):

| | v11.0.2 | 1 | 0.85 | 0.7 | 0.55 | 0.4 |
|---|---|---|---|---|---|---|
| light | 1.195 / 1.191 | **1.278 / 1.275** | 1.176 / 1.183 | 1.059 / (1.056) | 1.038 / 1.034 | 1.121 / 1.119 |
| dark | 1.044 / 1.225 | 1.055 / 1.232 | 1.152 / 1.423 | **1.334 / (1.493)** | 1.535 / 1.720 | 1.785 / 1.938 |

- *Light: level 1.* It is the only rung that stands off its field more than today's plate in either engine, which RU-57's C6-M2 window already requires; every lower rung stands off less, and 0.55 to 0.7 nearly vanish into the field.
- *Dark: level 0.7.* The owner's "too transparent" frames are all dark (`f1`, `f4`, `f5`, `f8`), and today's dark plate stands off its field by 1.02 to 1.05 in Chromium, so level 1 changes nothing he can see. The default is the first rung from the glass end that stands off its field at least as far as the light plate does at its own level (1.27, the light plate he did not call too transparent, one step firmer) in both engines, and below 0.4's slab (1.70): Chromium 0.85 reads 1.15, under today's light plate; 0.7 reads 1.33; WebKit 0.85 reads 1.42 and 0.7 reads 1.49 at 390. WebKit's 0.7 at 1440 is unread (`plate: dials {}`); the eighth pass reads it, and if it reads at or above 1.70 the default goes to the owner.
- *ORCH line 4 restated, with the reading that shows it cannot hold.* "Take the first rung that passes G-15" has no member: `m7-ladder-read.txt` excludes every rung in both engines, 0.4 included. The failures that survive at every rung are a current or pressed seat's words (nav's Reports, dials's 5Y and Lin, action-row's pressed Format), a glyph the composition sized (chrome's folded hexagon, `h-4 w-4`), and reads taken while a glyph was mid-change (WebKit's canvas-tools grid and figure-tools table glyph at 1:1, docks recorded `opened: false`). None is set by the plate's level: a darker plate only gives the current seat's words more room, and that reaches 4.5 on nav at 0.4 in WebKit and nowhere in Chromium (4.37 at 0.4). So the plate is picked by the written rule above from the plate readings, never for looks, and G-15 is made to pass at that level by curing each failure at its cause (RU-68, RU-76, RU-82). The owner still picks from the strip (question 10); the default holds until he does.

*Reason.* The ladder's readings run opposite ways in the two schemes, and the owner's complaint and frames are dark; a per-scheme number is what lets the dark dock firm up "a bit" without the light dock losing its glass.
*Witness.* G-15 at these levels in both engines. A cell reads computed `--glass-level` on a dock: 1 light, 0.7 dark, 0 under `prefers-reduced-transparency` in both schemes, 0.3 under `prefers-contrast: more`, 0 on `data-backdrop-mode="static"` (the brackets at `glass/a11y-fallback.css:20-25`, `:38-42` and `adaptive-legibility.css:80-83` must still win over the dark arm). Plant: the dark arm removed (the dark plate at 1.055, RED on the strip's plate clause and on G-15's dark words).
*Touches.* `dock.css:216-220`: `.glass-dock { --glass-level: 1 }` and a plain `.dark .glass-dock { --glass-level: 0.7 }`, never `light-dark()` for a number.
*Reverts.* `5eccb8554`'s level line (the one tier at the base rung stays).

*Amended (fold 7: C7-M1, R7-2, C7-M8, C7-M9, C7-M10; R7-1 in part).* The dark half was picked on one ground with a quantity that cannot see what the owner named.
- *The flat ground is in the same logs, and the rule has no member on it.* *Record*, every `m7-ink-ladder*` and `m7-ink-base1102.*`, ground `flat` (page (11,10,9)), dark, open, every dock: v11.0.2 1.001 to 1.014; level 1 1.001 to 1.010; 0.85 1.038 to 1.047; 0.7 1.082 to 1.086; 0.55 1.135 to 1.140; 0.4 1.191 to 1.203, both engines. No rung reaches 1.27, the slab included, while light at level 1 reads 1.306 to 1.310 on the same ground (1.668 on action-row and figure-tools in Chromium). `f8` (near-black, a grid running through the plate) and `f1` are flat dark grounds; only `f5` is warm like the dials field.
- *The quantity is a tint offset.* Plate against field is the modal colour of the box against the same box with the dock hidden (*Source*, `ink7.mjs`, `fieldUnder`). Both harness grounds are smooth, so nothing can show through either, and the light ladder shows it is not opacity: 0.55 and 0.7 carry more solid `--card` than level 1 and read 1.04 to 1.06 against 1.278. On `f8` the challenger's pixels put the grid's amplitude inside the plate at about 0.84 of its amplitude beside it, while plate against field reads 1.00 on the same frame.
- *The rule, restated.* The stage gains a grid ground: a 1 to 2 px grid at `f8`'s 32 px pitch on the near-black page with a line of card text under the plate, and its light twin. Each rung is read on it in both engines and both schemes, today's dock (RU-69's row) included, for **show-through**: the grid's luminance amplitude inside the plate over its amplitude beside it, the median of three reads, the spread printed. The dark default is the first rung from the glass end whose show-through, in both engines, is no more than the light default's on the light grid, and whose plate against the warm field (median colour, three reads) stays under 0.4's 1.70 in both engines. If today's dark dock already meets the first clause, the rule cannot see the complaint, and the dark default is the owner's from the strip, 0.7 standing until he picks. If no rung meets both clauses, the firmest rung under 1.70 is the default and question 10 says so.
- *Until H6 reads it,* 0.7 stands as the dark default, labelled "chosen on the warm field".
- *WebKit's 0.7 at 1440 is read on four of eleven pages,* not "dials {}": nav, chrome, rail and figure-tools, 32 cells against 92 in every other rung (`m7-ink-ladder07.webkit.json`). Nav dark reads 1.624 there, 0.08 under 1.70, and WebKit's reading of one open plate swings 0.05 to 0.10 between two reads (dials dark 1.497 and 1.423 at 0.85, 1.81 and 1.72 at 0.55: the field's modal bin flips at G = 96, `ink7.mjs`, `>> 4`). H6 reads the whole rung again and applies 1.70 to the median.
- *What 0.7 does, from source.* The plate's alpha is level × rung + (1 − level) (`glass/veil.css`: `color-mix(in srgb, <ink at the rung> calc(var(--glass-level) * 100%), var(--card))`), so at the dark base rung 0.18 (`tokens/dark-arm.css:285`) the cover goes from 0.18 at level 1 to about 0.43 at 0.7, about 2.4 times. "About a third firmer" in the drafts named the mix parameter; it is struck from every draft and from question 10, and so is "stands off the page about as clearly as the light dock does".
- *The witness, restated.* Until the owner picks, the level has a token witness only: the computed `--glass-level` cells above. The brackets win the (0,2,0) tie because `accessibility.css` loads after the dock styles (`styles/index.css:271` against `:207`), and the static arm sets the plate's own level; the cells still read all three. "RED on the strip's plate clause" is struck, since no such gate exists (RULINGS-6's C6-M2 made the plate reading an exclusion). Plant: the dark arm removed (the dark cell reads 1: RED). After his pick, the show-through at his rung becomes a G-15 clause, as C6-M2 says a bound is written only then.
- *Light stays level 1, and R7-1's single level 0.85 is not taken.* On the flat ground 0.85 moves the dark plate from 1.004 to 1.014 to 1.040 to 1.047 and leaves it about 0.22 under light at the same level (1.270); in WebKit on the field dark at 0.85 stands off more than light by 0.21 to 0.26 (nav 1.452 against 1.190). One number serves both schemes on one engine and one ground only. Level 1 is what RULINGS-6's C6-M2 window returns in light on the field (the only rung above v11.0.2's plate in both engines: 1.278 and 1.275 against 1.195 and 1.191; 0.85 reads 1.176 and 1.183), and its extra ink has its source in INPUT-plate-opacity ("a default that reads as a surface over a busy ground in dark and in light") and in daraksha's measurement (RULINGS-6, RU-57). Its cost, stated in question 10: on a plain white page level 1 is a step greyer than today, (223,220,216) against (230,229,225), 1.31 against 1.208.

*Amended (fold 7: C7-3, C7-2, C7-4).* The dark level's reach.
- *The selector.* The arm is `.dark .glass-dock, .glass-dock.dark`, still a plain per-mode arm with no `light-dark()` for a number. slides puts `.dark` on its dock per slide in a light document (`src/deck/DeckView.vue:144-147`), and GlassDock binds its class on its root (`GlassDock.vue:66`, `inheritAttrs: false`; `:468-470`, `v-bind="$attrs"` on the `.glass-dock` root), so a descendant selector alone misses it. `shell.css:263`'s dark blur arm takes the same selector. One witness cell is added: computed `--glass-level` at the dark level on a `.glass-dock.dark` in a light document.
- *Where it lands, from source.* A static dock's plate sets its own level 1 over an opaque `--card` (`adaptive-legibility.css:92-102`), and speedtest sets the plate's `--glass-veil` itself, unlayered (`src/design/register.css:240-244`), so the level reaches neither.

  | the dark level | sites |
  |---|---|
  | firmer | value.js (its colour session measures `.dock-plate`), keyframes (ChromeDock, TransportDock, RibbonBar), fourier, daraksha, gaggle's site dock and KitDock, Home Assistant, slides (by the selector above) |
  | unchanged | atlas (every dock static), gregg (every dock static), gaggle's report dock (static), speedtest (its own plate veil) |

  The drafts follow this table.
- *A plate outside a dock.* `--glass-level` is 1 outside a dock (its registered initial, `tokens/property-regs.css:154-158`), so daraksha's fission neck (`SiteDock.vue:275`, a `glass-plate` between its two docks) and the bare-plate recipe RULINGS-6 gave daraksha (`Star.vue`, `Clasp.vue`) would read clearer than the docks in dark. The README's recipe for a plate that matches the dock carries the dark arm at the ruled number; the daraksha draft names the neck and the recipe; RU-85's daraksha ground reads the fission in dark.

**RU-68. The fills take one current step per scheme, read at the ruled levels; hover sits in P0a's range; every word on a current or pressed seat reads 4.5; a trigger's ink is full.**
*Record.* Light at level 1, Chromium: the marks read 1.787 and 2.067 (dials 5Y, Lin) against v11.0.2's 1.374 and 1.381, and the pressed Format reads 3.8: the light step is about half again heavier than the shipped mark and costs its own words. Dark at 0.7: Reports 3.53 (Chromium) and 3.95 (WebKit), Lin 4.45, while Lin's mark reads 1.343 against v11.0.2's 1.774. v11.0.2's dark dials mark was darker than its track (fill (106,56,31) on (152,74,45)) and sat beside words at 3.33 to 3.46 (1Y, All, Log, `m7-ink-base1102.chromium.json`); every RU-56 mark in dark is lighter.
- *The steps.* The current step is a per-scheme number on `.glass-dock`, with a dark arm beside RU-67's. Hover is 5 to 8 % of the ink (P0a: "a hover fill: 5 to 8 % of the ink"; the build's 10 % is over it). Press keeps its built offset above current.
- *The reading.* At the ruled levels, both engines: light current at 12, 14 and 16 %, dark current at 10, 12 and 14 %, each with hover at 5 and 7 %. Per scheme the default is the weakest current step whose every current and pressed seat's words read 4.5 and whose marks meet the floor, with the weakest hover that reads 1.2 against current at a fine pointer.
- *The floors.* Light: each engine's v11.0.2 reading on the same cell, as RU-56's C6-M3 wrote. Dark, restated: a lighter mark reads 1.2 or more against its ground. Reason: 1.774 on dials was a darker mark of the other polarity that bought its ratio with failing words beside it, and for a lighter mark under light words that ratio needs a plate darker than level 0.4 on that cell (arithmetic on the recorded colours); 1.2 is WebKit's shipped dark mark (5Y, 1.237) and the weakest mark the strips show as selected (*Pixels*: dark Lin at level 1, recorded 1.195, reads as a pill in `strip-ladder-7`).
- *If one dark step cannot hold both at 0.7 in both engines,* the words win, the mark takes the strongest step the words allow, the cells under 1.2 are listed, and question 21 is the owner's. The dark level is not moved for it.
- *The trigger's ink.* A trigger's label and chevron are mixed down by `--opacity-icon-muted`; inside a dock they take the full ink (RU-44: nothing in a dock is drawn dimmer to rank it). *Record*: transport's "1×" and its chevron read 4.15 together at level 1 in dark, one colour.

*Reason.* The step that suits one scheme is wrong in the other: in light it is heavier than the owner has now ("NO overuse of shading") and in dark it costs the current page's words.
*Witness.* G-15 with these clauses; `ink7`'s mark selector takes `[aria-pressed='true']`, so a pressed seat's fill and words are read as a mark. Plants: the `:root`-baked plates restored (as now), and current set equal to hover.
*Touches.* `dock.css:222-233` and its dark arm; `controls/triggers.css:47-52`; `ink7.mjs:36`.

*Amended (fold 7: R7-5).* One grid, not two. The union, current at 10, 12, 14 and 16 %, is read in both schemes. One step is taken if one holds both schemes' words and floors; a dark arm (on RU-67's selector) is written only if none does, with the failing reading named.

*Amended (fold 7: C7-M3).* The dark floor is restated per cell. v11.0.2's dark mark is already the lighter side of its ground on nav (Reports 1.252 in Chromium, fill (163,114,104) on (151,96,85); 1.318 in WebKit), rail (1.350, 1.340), canvas-tools (1.315 to 1.331), the loose cell (1.31, 1.28) and every mark on the flat ground (1.356 to 1.373 on nav, rail and canvas-tools; 1.08 on dials, fill (30,20,9) on (16,11,7)) (*Record*, `m7-ink-base1102.*`). Those cells keep each engine's v11.0.2 reading, as light does. 1.2 applies only where the polarity flipped, dials's 5Y and Lin on the field in both engines (Chromium fill (106,56,31) on (152,74,45), WebKit (90,60,42) on (108,72,56)), with the arithmetic printed beside it. Question 21 holds the fallback.

*Amended (fold 7: R7-3, C7-M4).* The order of the choice, and a floor for the hover against its own ground.
- The current step is set by the words and the mark floors alone.
- *Read first:* whether the segmented control's hover takes the dock's token at all. At the build's 10 %, dials's hovered 1Y reads 1.019 (flat) and 1.061 (field) against its own ground in Chromium, 1.020 and 1.086 in WebKit (`m7-ink-m7p.*`), too faint for 10 % of the ink. If it does not, its cell names its own fill and these steps do not govern it.
- The hover step is the weakest in P0a's 5 to 8 % whose hover reads against its own ground no weaker than each engine's v11.0.2 hover on the same cell (`m7-ink-base1102.*` records 1.11 to 1.30 on nav and rail), or 1.1 where v11.0.2 has no hover reading, until the owner picks (question 18). If no step in the range meets it, 8 % is taken and the cell is listed for question 18.
- Hover against current is then read at that pair. Under 1.2, question 18's strip shows it and the owner decides. The current step is never raised for the hover.
- `ink7` gates the hover against its ground as well as against current (it records `againstGround` and gates only `againstCurrent` today). As first written, "the weakest hover that reads 1.2 against current" returned 5 % or nothing, since a weaker hover lies further from current.

*Amended (fold 7: R7-6, C7-M11).* The press. The press fill is a momentary `:active` fill (`icon-button.css:139-141`, `tab-button.css:75-77`, `triggers.css:91`) of 28 % (`dock.css:230`), on top of the dock's press scale (`--scale-press-dock`, `scale-paper.css:25`). P0a's press row: "2 % of colour, or a scale no deeper than 0.96". The 28 % step leaves `.glass-dock`: inside a dock a press is the scale it already has, over the seat's own fill plus 2 % of the ink. The CSS form is the build seat's, in the fewest lines. The loose `DockControl` keeps its `:root` press. H5 reads it once (a held press on a current and on a non-current seat, both schemes) and prints it; no new clause.

**RU-69. The ladder's control row is today's dock, shot on v11.0.2's own build. Whether `--glass-veil-dock` paints is read once and decides nothing.**
The row is shot from the `git archive` tree of v11.0.2 that `g16.sh … keep` already builds and that `ink7` read as its base (`m7-ink-base1102.*`), labelled "today's dock (11.0.2)", folded and open, both schemes, both widths.
*Reason.* A token state on this build cannot show a release whose fills, tier and level all differ; the shipped build can.
*Witness.* The row's plate readings equal `m7-ink-base1102.*` within 0.02 on the same cells.
*The token.* MEASURE-7's "`--glass-veil-dock` does not paint the plate" is a reading of an injected `:root` rule, and *Hypothesis*: the token sheet loads after the injected rule and wins the cascade. One reading: with the control-row CSS injected, the computed `--glass-veil-dock`, `--dock-plate-collapsed-tier`, `--glass-veil-tier` and `--glass-veil-rung` on `.dock-plate`. If the token reaches the tier, the claim is withdrawn in the record; if it does not, `glass.css:170-172`'s comment ("the ink rung `--glass-veil-dock` above is the live one") is corrected.
*Touches.* `owner8.mjs:99-105`, `states/ladder-today.css`; `glass.css:170-172` only on the second outcome.
*Amended (fold 7: C7-M9, C7-13).* The witness's tolerance is the larger of 0.02 and the spread of three reads by median colour (RU-82), since WebKit's modal read of one plate swings 0.05 to 0.10. On the second outcome, the value.js and daraksha drafts say which token now moves the dock's veil, because O-370 told value.js that `--glass-veil-dock` is the knob. On either outcome daraksha's two `--glass-veil-dock: var(--glass-veil-base)` lines (`SiteDock.vue:373`, `ControlsSeat.vue:125`) equal the branch's default (`glass.css:135`), and its draft says they can go.

### (c) The motion reds

**RU-70. G-2 and G-4: a fade is judged in frames, read interpolated. The 75 ms clause is restated to P0a's own check.**
The clause becomes P0a's two-part check: no 60 Hz window moves a face's or a seat's opacity by more than two fifths (the gate's `op60` clause, `judge7.mjs:296-301`, `:350`, unchanged), and a fade is at least five 60 Hz frames long on any phase, which is four frame intervals, 66.7 ms, between its last value within 0.02 of one end and its first within 0.02 of the other, read interpolated between samples (`m7/fadelen.py`'s method) and not from the sampled rows.
*Reason.* 75 ms is P0a's whole out, start to stop, applied to a window that cuts the tails, and the build sits on it (72.9 to 77.3 ms interpolated, the same fade as MEASURE-6, no source touched it), so the sample's phase picked the side; a fade 2 ms shorter is nothing the owner can see, while a fade that lands in one or two frames is, and both parts read that.
*Witness.* G-2 and G-4 by `judge8.mjs`, re-judged first on `rows/m7p` and then on the eighth build. Plant, new: the face window halved (RULINGS-2's 0.55 to 0.275, about 40 ms and about 0.45 per frame), RED on both parts in both engines.
*Touches.* `judge7.mjs:303-312`, `:351` (into `judge8.mjs`).

**RU-71. G-3: a travel ends where the lane turns, and "shown" allows the lane clause's own half pixel. Both are the judge's, cured in the judge and read again.**
- *The ptr row.* `judge7.mjs:422-423` starts a new travel at the turn's mark. With momentum the lane keeps folding for up to the preset's stop time after the mark, which G-3's own bound allows (1.15 times the stop plus a row), so seat#3's sliver at the mark and its hiding three frames later are the old travel's, and its return is the new travel's. The new travel starts at the row where the lane's leading edge reverses (the row `judge7.mjs:248` already finds for the turn).
- *The press row.* A seat counts as shown when it meets the lane by more than 0.5 px (`:435`), and the lane clause lets the carrier write its clip up to 0.5 px inside the lane (`:419`), so a seat 0.5 to 1.0 px inside the lane may be legally clipped and read as hidden-while-shown. "Shown" becomes: meets the lane by more than the visibility threshold plus the lane clause's tolerance (1.0 px).
*Reason.* The two rows fail on the judge's own phase and its own stacked tolerances, not on a frame the owner can see.
*Witness.* G-3 by `judge8.mjs` on `rows/m7p`, then on the eighth build. g3-retarget (30 and 24 rows) and the lane plant (12 px inside, 1.62 px) must still bite in both engines; if either row still fails, it is a fault of the carrier.
*Touches.* `judge7.mjs:422-423`, `:435`.

**RU-72. G-8: a press on a dialog's scrim is the dialog's own, as the Sheet's is. The touch rows are read before anything is cured.**
- *The dialog.* RU-62's stamp on the shared scrim stands for the Dialog: a press on the scrim closes the dialog once, focus returns to its seat, and the dock lingers. G-8's clause from MEASURE-5 ("a press outside an open dialog folds the dock at once") is restated to that. Reason: a modal makes the page inert, so a press on its scrim cannot reach the page and is not "anywhere else"; one press closes one layer, as Escape closes the menu first and the dock second. A non-modal surface keeps "a press outside closes it and the dock at once". Question 19 is the owner's, default yes.
- *The touch rows, read first.* At each tap: `document.elementFromPoint` at the tap point, the target seat's box against the plate's and the run's port, and the order of `pointerdown`, `touchend`, `click` and the open state. *Hypothesis* for the popover: at 390 its seat lies past the run's cut, so the tap lands outside the dock (in two of the four runs the dock folded). *Hypothesis* for WebKit's Select and Sheet: the open surface covers the trigger (the Select's item-aligned list, the Sheet's scrim), so the second tap never reaches it.
- *The cure follows the reading.* A seat past the cut is brought into view the way a person would (a swipe of the run) before the tap: harness. A covered trigger is not pressable, so on touch the clause reads what a person can press: the scrim for a Sheet (closes once, the dock lingers) and an item or an outside press for a Select. A tap that reaches the trigger or the scrim and does nothing is a fault in the build and is cured there with its reading.
*Witness.* G-8 with the trigger clause, four surfaces, mouse and touch, both engines, and the dialog's scrim clause restated. Plants: the trigger exemption removed; the scrim stamp removed (g8-trigger: the dock folds at 5.4 and 6 ms).
*Touches.* `ModalOverlay.vue:57-58`, `:79` (kept); `m7/trig7.mjs:44-52`; the G-8 dialog cell.
*Amended (fold 7: C7-M13).* The cover hypothesis is struck for the Sheet. *Record*: in Chromium `sheet-touch` closes once with the dock open (`m7-trig-m7p.chromium.json`), and in WebKit it reads `closed: false`; the scrim covers the trigger in both engines, so cover cannot explain a WebKit-only failure. The Sheet's reading starts from WebKit's `elementFromPoint` at the tap and the event order on the scrim. "The scrim for a Sheet" in the touch clause is the tap that fails today, and is not presented as its cure.
*Amended (fold 7: C7-8).* O-380 booked fourier's "dock pinned on touch" red to W-I.8, and no file here had named it. H2 adds one 390 touch cell on fourier's AppDock composition (or the nearest stage, named in the log), reading whether the dock stays open after a tap once the finger is up. The fourier draft says what is read and what is cured.

**RU-73. G-1 (f): the unit witness models the tap's focus and takes a plant that bites under RU-62's quiet return. Until then (f) is unread in WebKit and G-1 is not GREEN there.**
*Source.* RU-62's `quietReturn` (`useDockState.ts:555-565`, `ec71b3cd4`) keeps a pending linger when focus arrives without `:focus-visible` and the pointer outside. The witness calls `handle.onFocusIn()` with no event (`tests/components/custom/dock/GlassDock.posture.test.ts:179`), so the planted early linger survives the focus and folds at the same time as the build. The fault the plant modelled, focus cancelling a linger scheduled too early, no longer exists.
- The witness passes the tap's `FocusEvent` with the seat as its target.
- Two plants replace the old one, each in the unit: the press hold removed (a held finger no longer holds: RED at 9 s), and the linger timed from the press (RED: the dock folds at the lift).
- Chromium's finger cell keeps the clause on a real touch; `quietReturn` stays as built.
*Reason.* RU-42 moved (f) to a unit witness with a plant that bites, and this one no longer bites, so WebKit's (f) has no reading.
*Witness.* The unit test RED under each plant and GREEN on the build. *Touches.* `tests/components/custom/dock/GlassDock.posture.test.ts:160-186`.
*Amended (fold 7: C7-M12).* The only recorded order of a seat tap is Chromium's (`m7p-side-chromium.log`: pointerdown, pointerup, touchend, focusin, click); WebKit's was never recorded (`m7p-side-webkit.log`). H3 records the event order and `document.activeElement` at WebKit's seat tap where the harness can tap there, and the unit witness runs both with and without the focus event: GREEN on the build and RED under each plant, both ways.

**RU-74. G-11: the sampler's layout leaves the trigger frame with RU-66's merge; every remaining layout is named by its phase; none is listed as the engine's.**
- *The sampler.* *Hypothesis*: v11.1.0's `requestBatchSample()` on the resize path (a rAF asked for inside an observer delivery runs in the next frame) takes the luminance sampler's layout out of the trigger frame. First reading after the merge, by stack.
- *The stackless layouts.* `cost7` brackets every ResizeObserver flush the dock owns and every rAF callback with `dock:` marks, so a layout without a stack is named by the phase it falls in (after the carrier's write, inside a delivery, after a delivery's writes). The cure, if one is still needed, waits for that name.
- *No engine exit.* ORCH line 2 asks for stacks with no glass frame in both engines, and WebKit has no trace, so no layout can be listed as the engine's in 11.2.0; all count.
- *The bound stays RU-29's three, four only where `dock:reread`'s detail names RU-54's second read or a flag that changed.* `useDockBody.ts:720` calls every deciding frame the named flag frame "whether or not a flag moved", which is wider than RU-53 and RU-54 wrote; the mark is emitted only for those two cases.
- *The rest clause runs in WebKit,* by script (rAF calls, mutations, running animations), which needs no trace.
*Reason.* One of the two extra layouts is a shipped cure the branch lacks, and the other cannot be named or cured until its phase is read.
*Witness.* G-11's trigger clause in Chromium by trace; the rest clause in both. Plant: g11-rest (about 500 callbacks at rest).
*Touches.* `useDockBody.ts:720-722`; `m7/cost7.mjs`; the merge.
*Amended (fold 7: C7-M6).* The batched sample (v11.1.0 `useGlassBackdropLuminance.ts:139-145`, `:335-354`) runs in the frame after the trigger, where the carrier re-requests its own frame first (`useDockBody.ts:981`, `:1047`) and writes before the sample reads (`:1057`, `:1075`). `cost7.mjs` builds G-11's verdict from `triggerFrames` alone; the travel's counts (`layoutsPerFrameMax`, `framesOver1Layout`) are printed and never judged. So G-11's trigger clause now reads the trigger frame and the two after it: each of the two carries no layout under a script stack beyond the frame's own. The merged build's batched sample is read by stack before the cure is counted.

### (d) The seats and glyphs

**RU-75. G-13: every seat in a run is `--dock-control-size` tall, worded or not.**
*Record.* The tab seat holds 38.59 px at 1440 and 38 at 390; the labelled icon seat 35.91 and 32.78 (`m7/census7.mjs`). *Source*: the tab seat's `min-height` falls to `auto` (`tab-button.css:26`) and its height is its word plus `padding-block`; the labelled icon seat's rule sizes only its glyph (`icon-button.css:263-267`).
The tab seat's default `--dock-tab-min-height` becomes `var(--dock-control-size)`, and the labelled icon seat takes `min-block-size: var(--dock-control-size)`, as step 7 already gave the trigger.
*Reason.* RU-55 wrote the invariant so no selector could miss it, and two selectors miss it; a 33 px seat beside 44 px seats is an uneven row of fills the owner sees, and on a phone it is under the touch floor.
*Witness.* G-13's seat line, both engines. Plant: the tab seat's default back to `auto` (RED, 38.59). *Touches.* `controls/tab-button.css:24-28`, `controls/icon-button.css:263-267`.
*Amended (fold 7: C7-12).* The taller tab seat lands wherever a site sets neither `--dock-tab-h` nor `--dock-tab-min-height`: gaggle's view tabs, gregg's PageDock and HeroPlate, keyframes's Apply CSS tab. Their drafts say so. Home Assistant and speedtest set their own tab height and keep it, and the Home Assistant draft no longer says its tabs grow.

**RU-76. The folded face's glyph takes the icon share like any seat; glass's compositions carry no size class on a folded face.**
*Pixels.* `strip-fold-7`: the folded face's glyph is about 16 px in a 52 px plate after a run of 36 px glyphs; `strip-legend-7`: atlas's folded sliders glyph is about 11 px beside a 26 px Table glyph. *Source*: the folded face floors its glyph at 1 rem and sizes nothing else (`morph.css:305-310`); RU-58 kept the faces' own `h-4 w-4` (`6269ed6ad`, for example `chrome.stage.vue:70`). *Record*: chrome's folded hexagon fails G-15 at 2.18 to 2.89.
The folded face's direct glyph, in the four forms, is the share of the layer height, as an icon seat's; the floor stays; the compositions drop `h-4 w-4` on every `#collapsed` glyph; `w-many`'s avatar seats carry `data-dock-glyph`, the attribute's own case.
*Reason.* "Our icons should be 2x bigger … Show them more" names every glyph in a dock, and the folded face is the glyph the owner sees most.
*Witness.* G-13's composition line extended to folded faces (each unsized folded glyph is the share times the layer height within 0.5 px); G-15 re-read on chrome. If the hexagon still reads under 3:1 once settled and at its size, its opacity in the open dock is read: a folded face that still paints in an open dock is a G-2 fault ("out, then in"). Plant: the face rule removed (RED, 16 px). *Touches.* `morph.css:305-310`; the compositions in `m7/comp` and on `bl/demo`.
*Amended (fold 7: R7-8).* The share reaches the face's direct glyph only, so the size class comes off only where the glyph is the face's direct child. A composed face, such as canvas-tools's `<span class="canvas-face"><PenTool class="h-4 w-4" /><StatusDot … /></span>` (`m6/comp/canvas-tools.stage.vue:33-35`), keeps its class or has its glyph made the face's direct child; it never falls to lucide's 24 px, a size no ruling chose. G-13's folded-face line lists the faces it reads.
*Amended (fold 7, second round: RU-87).* The face's glyph takes three forms, a direct `svg`, `img` or `picture`, since `data-dock-glyph` goes. "`w-many`'s avatar seats carry `data-dock-glyph`, the attribute's own case" is struck: the letter avatars keep the harness's own size (`.wi8-avatar`), as Home Assistant's faces keep theirs.

### (e) The budget

**RU-77. G-16 reads the dock's static closure, not the entry file. ORCH line 3's G-16 clause is restated.**
*Record* (`m7p-g16.txt`, `m7-g16-v11.0.2.json`; the closure method verified by verify-7): the entry is 23,080 B gzipped against v11.0.2's 17,827, and the closure (the entry plus every chunk it imports statically) is 35,761 B in 19 files against 38,758 B in 27; raw, 103,964 against 106,369.
The bound becomes: the closure from `glass-ui/dock`, gzipped file by file on `git archive` builds, no larger than v11.0.2's (38,758 B). The entry is reported beside it.
*Reason, the reading that shows the entry clause cannot hold.* The site behind the gate budgets bytes per page (value.js: 125 KB a page), which is the closure; the entry moved opposite to it (+5,253 B while the closure fell 2,997 B), because v11.0.2 spread the same code over eight more static chunks that load with the entry. A gate passable by splitting chunks, and RED on a build that costs the site less, does not measure first-load size.
*Witness.* G-16 after RU-66's merge (11.1.0 grew its entry about 1.6 KB over 11.0.2, `INPUT-first-load-size`). Plant: a static import of an unrelated module of known size into the dock entry, RED by that size. *Touches.* `m7/g16.sh` (the verdict line).
*Amended (fold 7: C7-M2, C7-5).* The reason above is withdrawn, and the closure is not the bound.
- *The record contradicts it.* The prototype before the removals had the same 27 files as v11.0.2 (`m7-g16-ddfa8a2ba.json`: 27 files, 46,302 B, entry 25,372 B), and the removals commit took it to 19 (`m7-g16-668e02a82.json`: 35,423 B, entry 22,742 B). The eight chunks are the step-2 deletions (`DockBackgroundToggle`, `useDockSearch` and the rest), not v11.0.2 spreading the same code.
- *Neither number is what a page pays.* A site's bundler drops what it does not import (`package.json`: `"sideEffects": ["*.css"]`), and `DockBackgroundToggle` has no app use, so part of the closure's 2,997 B fall is code no page loaded. Every non-entry chunk exists because another entry imports it too, and a dock page also loads `/dock-trigger` and the overlays its dock holds (USAGE.md), so a chunk the dock stops importing is saved only if nothing else on the page imports it. The entry's +5,253 B is paid in full.
- *The measure.* A consumer fixture: one page that imports value.js's dock names (`GlassDock`, `DockLayerGroup`, `DockLayer`, `DockControl`, `DockSeparator`, `DockCrossfade`, and `DockTrigger` from `/dock-trigger`) and one each of the overlays its dock holds (DropdownMenu, Select, Popover, Tooltip), built with Vite against each ref's `git archive` dist. The reading is its total gzipped JS, v11.0.2 against the build; the fixture's own code is the same on both sides, so the difference is glass-ui's. Reported beside it: the entry, the closure, and the union closure of `dock`, `dock-trigger`, `dropdown-menu`, `select`, `popover` and `tooltip`, each file counted once. Plants: an unused export added to the dock entry (must not move the fixture), and a used import added (must move it by its size).
- *The clause.* "The fixture no larger than v11.0.2's" is asked of the orchestrator as ORCH line 3's G-16 clause (the last section). Until he restates it, G-16 is ORCH line 3 as written, the entry, and it is RED (23,080 B against 17,827 on the tip, before 11.1.0's +1.6 KB arrives). The value.js draft states no page figure the fixture has not read.

**RU-78. Every name added since v11.1.0 is cited by a site line or goes (R-5): `GlassDock`'s `pinned`, `update:pinned` and `data-dock-scope` go, `controlCount` leaves the exposed surface, `#rim` stays only on a cited rim line.**
*Record*, `m7-appgrep.txt`: `pinned` and `update:pinned` "0 in the apps" (the two glass hits are `ControlsDock.vue:68`, which does not pass it, and a test harness); `data-dock-scope` 0 in the apps, used only by the measure harness; `#rim` 0 in the apps; `GlassDock run` 1 in the apps, atlas `src/charts/frame/PlateDock.vue:298` (`run="plain"`), so MEASURE-7's "no site line was found for `run`" is corrected and `run` stays.
- `pinned`, `update:pinned`: removed (`GlassDock.vue:84`, `:90`, `:93`, `:185-192`). Reverts their part of `8dd82bc57`.
- `data-dock-scope`: removed, and with it a cross-tree style write on every frame of a travel (`useDockBody.ts:1057-1060`). Reverts its part of `8dd82bc57`.
- `controlCount`: glass's own `ControlsDock` is its only reader, which is not a site. It leaves `defineExpose` (`GlassDock.vue:461-462`); `ControlsDock` provides an unexported injection key that `GlassDock` writes its count into. Reverts the expose of `d4211a9db`.
- `#rim`: USAGE records a `ScrollProgressRim` beside gregg's `PageDock` "sized from the plate's computed radius" and one on fourier's app dock; the eighth pass's grep records each line. A recorded line cites `#rim` (it replaces that workaround) and the slot stays; with no line, it goes (`GlassDock.vue:514`, reverts `c9107efad`).
*Reason.* The budget is a gate (ORCH line 3), and names nobody uses are the ones R-5 says go first.
*Witness.* `m7/names.mjs` on the merged tree: 78 against 80, or 77 without `#rim` (the arithmetic is below). *Touches.* as listed.
*Amended (fold 7: R7-7, C7-10).*
- *`controlCount` stays exposed.* Without `pinned`, `update:pinned` and `data-dock-scope` the count is 79, under the bound. The injection key would add code to every `GlassDock` for one preset, and any `GlassDock` mounted inside a `ControlsDock`'s subtree would inject the key and write its own count (restraint.md: "the removal outweighs the addition"). It is recorded as the one name added since v11.1.0 whose reader is glass's own cited preset, and the injection key is not built.
- *`#rim` stays.* fourier's `AppDock.vue:371-373` teleports a `ScrollProgressRim` into the dock's root, the workaround the slot replaces. atlas's rail and phone bar carry their own `DockProgressRim` in `#persistent` (atlas-rc `Dock.vue:473`, `:539`; SURFACE.md:218): atlas joins the grep and the atlas draft. gregg's rim is already `edge="border"` on the plate's radius since 11.1.0 (O-383; `PageDock.vue:242-244`), so the gregg draft names no radius code.
- *The witness:* 79 against 80.

*Amended (fold 7, second round: RU-86, RU-87).* The heading's rule covered six of the nineteen names added. RU-86 cites each of the fifteen that stay by its site line and states the one name kept without a site line, `controlCount`, as the rule's exception; RU-87 removes `data-dock-glyph`, which has no site. The witness is 78 against 80.

**RU-79. `ControlsDock` folds at every width when it holds two or more controls; with one it is that control. The harness's controls cells drop `collapse="closed"`.**
*Source.* `collapseFor` returns `false` above 40 rem whatever the count (`ControlsDock.vue:28`, `:58-62`), and step 2 deleted the only way to ask for a fold, so at 1440 every controls dock rests open (MEASURE-7, verify-7 item 8). The three sites the cells model fold at 1440 today with `GlassDock collapse="closed"`.
`collapseFor` returns `count === 1 ? false : "closed"`; `useMediaQuery` and `phone` go; the comment at `:29-31` ("folds as `collapse` says") is corrected. No prop returns.
*Reason.* OWNER-READ already promises it ("It lingers 3 s, not 6, so a page of figures does not fill with open docks"; question 4, a figure's controls dock opening when the pointer reaches it), and the owner's words are that the docks lacked collapse states. A preset that cannot fold at a desktop width cannot replace the docks it was built for.
*Witness.* G-2 and G-10 over the 21 scenarios that lost their fold (the 1440 rows of ctl-be, ctl-bs, ctl-te-parent, ctl-ts-parent, ctlout, fourier, sci, kfcode), and c2's C2-14 and C2-1. Plant: the phone rule restored (RED: no fold at 1440). Question 20 is the owner's, default yes.
*Touches.* `ControlsDock.vue:7`, `:28-31`, `:58-62`; the six cells in the harness. *Reverts.* The phone-only fold of `95004b894`.
*Amended (fold 7: C7-6).* "The three sites" are fourier (CanvasControlsDock, EditorControlsDock), atlas (`PlateDock`) and daraksha (its several-action controls seat). keyframes's code pane is not one of them: it is `<GlassDock fit-content :collapse="false">` (`demo/components/instrument/pane/RibbonBar.vue:76` at `d92c7a53`; COMPOSITIONS.md composition 10, "Never folds"), and moving it to the preset would make a row that never folds fold after the linger, with no way back since no prop returns. `w-kfcode` stays as a cell of a four-control `ControlsDock` and is relabelled so, not as keyframes's dock; its scenarios stay in the fold count under that label. The README says a row of controls that must never fold stays a `GlassDock` with `:collapse="false"`. sci-report mounts no dock of its own (`bbcbd503`, USAGE.md:250-252); the figure docks it shows are atlas's `PlateDock`, so its draft goes and its line joins atlas's.
*Amended (fold 7, second round: RU-88).* fourier's sites are `StageDock`, the dock that CanvasControlsDock and PlotToolsDock are built on, and EditorControlsDock. `StageDock` gives way to the preset.

**RU-80. RU-54's fit memory goes if one cost reading shows it saves nothing; the second read stays.**
*Record.* The memory plant passes fit7's sweep, rest and `w-pwords` cells and s2 at 1440 and 390 in all three projects; the second read (C6-M1) is what holds s2.
One reading first: `cost7` with the memory plant, Chromium, every cost cell, trigger frames and the travel's frames. If the layout counts and the summed layout time match the build's within the run-to-run spread, the memory and its key go (`useDockBody.ts:494-567`, `:726-730`), every sync reads the fit fresh, and the C6-M8 staleness cannot happen. `w-pwords` stays as a witness with a new plant: the fit read skipped when only a sibling region's box changed (RED where the lifted read differs).
*Reason.* An artefact earns its place by a reading that needs it, and no gate cell does.
*Witness.* s2, k2, the RU-39 sweep and `w-pwords`, both engines; G-11 with RU-74's bound (without the memory, `dock:reread` still marks only the second read or a changed flag). *Reverts.* The memory half of `d5d3f09b0`.

### (f) The harness

**RU-81. A plant that bites nowhere leaves its clause unwitnessed; each is rewritten or run where it was not.**
- *g4-ghost* bites in neither engine (RU-52 left a fitting run unclipped, so a control held inside it is never hidden). It is rewritten to the fault it names, a removed seat that keeps painting for rows after its exit, in a form that does not lean on the run's clip. G-4's seat-set clause is unwitnessed, and G-4 is not GREEN in either engine, until it bites in both.
- *G-14's plants* ran in Chromium and coarse touch only (`m7/g14plantrun7.sh`). Each restated group's plant runs in WebKit 2287 too.
- *G-11's rest clause* runs in WebKit (RU-74).
*Reason.* The ready list asks for a plant that bites in every engine the gate claims, and these three did not.
*Touches.* `m7/plants7.py` (g4-ghost), `m7/g14plantrun7.sh`, `m7/cost7.mjs`.

**RU-82. G-15's instrument reads a settled dock, an opened dock, and the base it names.**
- Each shot waits until the stage's docks run no animation and carry no `[data-morphing]` (up to 3 s); an item whose opacity product lies between 0.02 and 0.98 is printed as unsettled and its cell is read once more. WebKit's grid and table glyphs at 1:1 are of this kind (`ink7.mjs:86-91` reads the CSS colour times the opacity product, so 1:1 means an opacity near 0).
- A cell recorded `opened: false` is opened again, and never judged as open (figure-tools's three docks did not open).
- `--base` that does not exist exits non-zero (`ink7.mjs:32`); the mark and loose clauses are read in the pass, not applied afterwards.
- The hover clause reads fine-pointer cells only: a phone has no hover, and the 390 cells read 1:1 at every rung because the pointer never hovered (`m7-ladder-read.txt`, "hover fails 4 (min 1)" at every 390 rung).
- The folded posture is read on a composition that folds, confirmed by the `collapsed` class at the shot.
*Reason.* Four of G-15's reds at the rungs came from these and none from the dock.
*Touches.* `ink7.mjs:32`, `:36`, `:86-91`, `:168-171`, `:190-207`.
*Amended (fold 7: C7-M5, C7-M14, C7-M9).*
- *The background read.* An item's background is the modal 16-level bin of its own box widened 3 px (`ink7.mjs`, `bgOf` and `modal`), and a glyph whose strokes are one flat colour can own that bin. WebKit's canvas-tools Grid glyph reads 1:1 in an opened dock in three separate runs (`m7-ink-m7p.webkit`, `-ladder1.webkit`, `-ladder04.webkit`), with the Grid seat's mark fill (255,255,255) at 10.853, 7.356 and 10.919, where Chromium reads 1.808 on (133,96,81). "WebKit's grid and table glyphs at 1:1 are of this kind" is a hypothesis three runs did not move, and it is struck. The background is taken from a ring outside the item's box (as the marks' ground already is, `ringPts`), or from the box with ink-coloured pixels masked; each item records its background and its opacity product. WebKit's canvas-tools and figure-tools cells and the loose cell are read again, and WebKit's crop of the Grid seat is saved before the read is called settled or unsettled. If WebKit paints that seat white, that is a paint fault and is ruled on its own reading.
- *An item still unsettled on its second read fails its cell* and is printed with its opacity; it is never skipped, since a folded face painting at part opacity in an open dock is RU-76's G-2 fault.
- *Plate and field* are the median colour of the box, read three times, with the spread printed.

**RU-83. The owner's strips show what their labels say.**
- *Q10.* Folded frames from a composition that folds (nav or the pill), labelled from the recorded state; `strips7.py` refuses a frame whose posture differs from its label, as it does a scheme (`strips7.py:13-17`). Rows: today's dock from v11.0.2's build (RU-69), then levels 1, 0.85, 0.7, 0.55, 0.4, both schemes, the default marked per scheme. Beside each frame: the plate against its field. A dock on the wash tier (gregg's pair docks) beside a default one at the dark level (C-6). Daraksha's ground (RU-85). The crop clamps to the stage's box (`owner8.mjs:51-55`); at 390 a reading of `scrollWidth` against `clientWidth` in both engines and schemes records that nothing overflows.
- *Q18.* The hover step solved from a reading to give 1.1, 1.2 and 1.3 against current, plus the build's own step, each labelled "the pointer rests on Home; Reports is the current page".
- *Q17.* Row three sizes every icon seat from the words, the theme seat included (the sun stayed 36 px beside a 27.9 px Find); row four spaces glyph and word as the sites do and uses real pictures, not grey dots; a row shows the tab glyph at a 14 px word (21 px) beside lucide's 24 px; "at sized from" is corrected.
- *Q13.* Press and hold an icon seat on `w-many` at 390 (the nav composition's 390 seat is a worded Select, which opened its menu in Chromium).
- *Q14.* On this build the label says the dock pushes the legend about 36 px and covers none of it; the prototype's frames are cropped to the row, not the viewport.
- *The seat-set strip.* The pointer leaves the dock before the seat is added (`owner7.mjs:111-112` left it on the centre seat, so its hover fill read as a selection).
*Reason.* verify-7 found the Q10 strip unable to answer its question and five other labels that mislead, and a strip the owner misreads is worse than none.
*Touches.* `owner8.mjs`, `owner7.mjs:111-112`, `strips7.py:13-17`.
*Amended (fold 7: R7-2, R7-9, C7-2, C7-M1).*
- *Q10* is shot on one composition that folds, nav, in both postures. Its plate reads within 0.01 of the pager's at every rung on both grounds (*Record*, the ladder logs), and the pager is the dock the owner asked "why is this dock so transparent" of. Both schemes, every rung and today's row, on three grounds: RU-67's grid ground (near-black, card text under the plate, as `f8`), the warm field, and daraksha's ground. Beside each frame, to two decimals: plate against field, and show-through.
- *The 390 columns leave the Q10 strip.* On nav, chrome and transport their plate readings equal 1440's within 0.012 at every rung, and no 390 reading reorders the rungs; they stay in the record, with the `scrollWidth` reading.
- *The wash-tier row is slides's case* (`decks/parkway-lab/theme.css`, a live dock). gregg's pair docks are static and the level does not reach them (RU-67's reach table).
- *Q18* shows the hover at 5, 6.5 and 8 % (P0a's range) over the current step taken, both schemes, each labelled with its reading against current and against its ground and with where the pointer is. The build's 10 % appears only as a labelled reference beside them.

### (g) The in-flow dock and what was not run

**RU-84. RU-61 gets one more prototype round on its named faults, and joins 11.2.0 only if GREEN in both engines with the owner's cover strip seen.**
*Record.* The margin held `w-inflow` still (0 px from 76) but moved atlas's legend 28 px with its Table 132 px, left keyframes's transport (centre) at 97 px and `anchor="start"` at 4 px, and put 3 of 12 trigger frames at four layouts. Atlas's Table slide is RU-61's C-3 amendment working as written (`anchor="end"` with Table in `#persistent`); the legend's 28 px, the 4 px and the extra layout are faults.
The margin is written from the extents RU-35 already holds, in the carrier's one write, with no read of the root after it moves; the legend's 28 px is read against the anchored edge's arithmetic before it is cured.
*Reason.* The owner's O-366 ("hovering over cards/dashboard items should not shift the main cards or vizzes around, too") is binding, and three named faults are a smaller job than shipping without it.
*Witness.* RU-61's gate as RULINGS-6 wrote it, `tools/shift-gate.mjs` over every composition both engines at 1440 and 390, the cover reading, and RU-74's bound. Plant: the margin removed (RED, 76 px). If it is not GREEN, 11.2.0's release note says an in-flow dock still moves its row and atlas keeps its own hold, as RULINGS-6 allows.
*Touches.* `m7/ru61.patch` on `useDockBody.ts` (the flags write); `GlassDock.vue:478`.
*Amended (fold 7: R7-4).* The prototype covers a control. *Record* (MEASURE-7): 1,872 px² of atlas's legend and its link lie under the open plate; the plate takes pointer events (`dock.css:208-213`), and the dock lingers 3 to 6 s after the pointer leaves, so the link cannot be pressed for that time. That is a fourth named fault and question 14's trigger (RULINGS-6, C6-M7: "if words show through words, or a control is covered, that is the owner's (question 14) before RU-61 joins the pass"). RU-61 joins only on the owner's answer, not on the strip seen. The firmer plate for an in-flow dock is struck from question 14 (restraint.md: "One variant per job"). Its choices are: the plate grows away from the legend (the edge the site sets with `anchor`), the reserve, or no overlay in 11.2.0. Until he answers, no overlay.
*Amended (fold 7: C7-7).* Independent of the margin. RU-61's own clause, "one cross extent in both postures for a one-row dock is read, and cured only if RED (value.js's 40 against 48 px)" (O-386), was read in neither MEASURE-6 nor MEASURE-7, and this ruling dropped it without saying so. H10 reads the plate's block size folded and open on value.js's composition and `w-inflow`, both engines, 1440 and 390. If the two differ, S6 cures it with a plant (the cure removed: RED by the difference), whether or not RU-61 joins. RU-75's seat extent may already close it; the reading says.

**RU-85. What MEASURE-7 did not run, and RU-62's lines outside the directory.**
- *Daraksha's ground.* The harness builds a `ground=daraksha` stage from daraksha's Aurora preset, with the source line cited in the harness. If it cannot be reproduced, daraksha is asked through value.js for a frame at the two ruled levels.
- *RU-60's `touchname` gate and its real-Safari clause.* Tooltip's wave; required before the tag only if question 13 says so.
- *A WebKit cost cell.* None is possible without a trace; G-11's cost clause stays Chromium's, its rest clause runs in WebKit (RU-74).
- *The 1440 fold of every controls dock.* RU-79.
- *ink7's base path, G-12's build.* RU-82; G-12's item builds in a `git archive` tree, as `g16.sh` does, and reads that tree's `dist/`.
- *RU-62's lines outside the dock directory* are reported in the budget: `participation.ts` +7 (a comment), `ModalOverlay.vue` +4 (`inheritAttrs: false` and `$attrs` on the scrim), one line changed in each of `DialogContent.vue` and `SheetContent.vue`. `ModalOverlay` is internal with two callers, both glass's, both passing only the stamp, so no site's attribute moves.
- *Stale comments that name deleted parts* go in the removals commit: `participation.ts:22`, `:30`; `useDockShellProps.ts:14-15`; `dockContext.ts:100` (the deleted `#search` slot); the morph names in `GlassDock.vue:7`, `:242`, `:245`, `run.css:399`, `:751`, `shape.css:122`, `morph.css:324`.
*Touches.* `m7/g12*`, the harness stage, the budget table.
*Amended (fold 7: C7-4).* Daraksha's ground reads the fission in dark at the ruled level: the neck against the two plates it joins, with the neck carrying the README's matching-plate recipe.

### (h) The names, after the completeness check

Fold seat, second round, 2026-11-17. A completeness check found three things RU-78 left open: the closing count keeps sixteen added names and cites three (`run`, `#rim`, `controlCount`); `data-dock-glyph` reads 0 in the apps (`m7-appgrep.txt:273`) and is not disposed of; and RU-79 names fourier's CanvasControlsDock and EditorControlsDock without saying whether `StageDock`, which RULINGS-6:312 cites, moves to the preset. The consumer lines below are *Source*, read with `git show` and `git grep` at the refs `m7/appgrep.mjs` reads: fourier-analysis `origin/master` `67a0c57`, daraksha `origin/master` `919090c`, atlas-rc `88bde3b`, lt-integ-atlas `834c98b`, Home Assistant `apx-ui-r11` `b48da4b0` and `6d5ac72a` (the tree COMPOSITIONS.md read); glass at `943fe6e9d`.

**RU-86. Each name added since v11.1.0 that 11.2.0 keeps is cited here by its site line, and the budget points here. `controlCount` is the rule's one stated exception.**

| name | site line |
|---|---|
| `ControlsDock` | daraksha `src/shell/ControlsSeat.vue:98-113`, whose header asks for it (`:6-7`: "Glass ships this composition as a named piece in 11.2.0: REPLACE THIS FILE'S DOCK WITH IT THEN"); fourier `web/src/components/shared/StageDock.vue:88-110` (`:17-18`; RU-88) and `EditorControlsDock.vue:88` |
| `label` | `ControlsSeat.vue:46`, passed by each of its five mounts (`ColourPage.vue:213`, `MotionPage.vue:116`, `NamePage.vue:45`, `PortraitsPage.vue:508`, `ReaderDock.vue:145`); `StageDock.vue:25`, bound at `:98-99` |
| `corner` | `ControlsSeat.vue:126-128` (the window's top right) and `StageDock.vue:115-117` ("the host places it at its stage's top-right corner"): both `top-end` |
| `within` | `viewport`: `ControlsSeat.vue:126-128` (`position: fixed` inside the safe area, which `density.css:432-441` gives the preset); `parent`: `StageDock.vue:115-117` with `PlotToolsDock.vue:43-46` (the dock floats over its stage card) |
| `#default` (ControlsDock) | every site: the five `ControlsSeat` mounts above; `StageDock.vue:89`, `:104` |
| `#collapsed` (ControlsDock) | `ControlsSeat.vue:109`; `StageDock.vue:101-103`, filled by `CanvasControlsDock.vue:63-68` and `PlotToolsDock.vue:48-53`; `EditorControlsDock.vue:157`; atlas `PlateDock.vue` (atlas-rc `:171`, lt-integ `:359`) |
| `#persistent` (ControlsDock) | `EditorControlsDock.vue:124` (the point count and Save, kept at both poles); atlas `PlateDock.vue` (atlas-rc `:157`, lt-integ `:312`) |
| `#persistent-end` (ControlsDock) | `StageDock.vue:107-109`, filled by `CanvasControlsDock.vue:104-114` (Edit contour, and the page's own tools in the fullscreen takeover) |
| `DockOutlet` | daraksha's four teleports into its site dock: `NameDock.vue:67`, `PortraitsDock.vue:61`, `ReaderDock.vue:117` (`<Teleport defer to="#dock-page">`) and `MotionPage.vue:95` (`to="#dock-persistent-end"`), into the empty mount points `SiteDock.vue:233` and `:270` |
| `to` | the same four lines; the target is the dock's `id`, which `GlassDock` registers (`GlassDock.vue:222`), so no further name |
| `region` | `MotionPage.vue:95` (`persistent-end`); the other three take the default, `run` |
| `#default` (DockOutlet) | the four teleports' contents |
| `run` | atlas lt-integ `PlateDock.vue:298` (`run="plain"`), RU-78 |
| `#rim` | fourier `web/src/components/layout/AppDock.vue:371-373` (a `ScrollProgressRim` teleported into the dock's root), RU-78 as amended by C7-10 |
| `controlCount` (exposed) | none; read by glass's own `ControlsDock.vue:53`, `:59` |

What they replace: `ControlsDock`, the two files' own docks, their `fold` props and their holds (daraksha's `dockHold.ts`; `StageDock.vue:45-76`); `DockOutlet`, the four teleports and the two mount points; `#rim`, fourier's teleport. The three `ControlsDock` slots beyond the default pass through to `GlassDock`'s own, which each line above already fills.
- *Corrected in RULINGS-6:312.* The stage dock fills `#persistent-end`, not `#persistent` (`StageDock.vue:107`); fourier's `#persistent` line is EditorControlsDock's. atlas's `PlateDock` cites neither `corner` nor `within`: it stands in its figure's head row, in flow (lt-integ `PlateDock.vue:450-455`, atlas-rc `:273-277`), and the preset always places itself, fixed to the window or absolute in its parent (`density.css:417-422`). A move to the preset takes it out of that row; the atlas draft says so.
- *`controlCount`.* RU-78's rule reads "cited by a site line, or read by a preset this table cites, or goes", and `controlCount` is the one name the second clause admits, as R7-7 ruled: the injection key it weighed costs code in every `GlassDock`. The preset reads the mounted run's count because the authored slot (`ControlsDock.vue:38-46`) counts a child component as one control whatever it renders. The budget lists it as kept without a site line.

*Reason.* R-5 asks each added name for its site, and a budget that cites three of sixteen does not show the rest were checked; three of RULINGS-6's citations did not hold on the trees (the stage dock's `#persistent`, atlas's `corner` and `within`, Home Assistant's `ha-icon`, RU-87).
*Witness.* `m7/names.mjs` on the merged tree: 78 against 80 (RU-87). H12 prints each line of this table at its ref beside `appgrep.mjs`'s removals; a line no longer at its ref is reported, and its name is ruled again before the tag.

**RU-87. `data-dock-glyph` goes: no app has a site for it.**
*Record.* `m7-appgrep.txt:273`: 0 in the apps; the two glass hits are the census harness and the rule itself.
*Source.*
- The one site named for it (RULINGS-6's ADDS row and RU-65, from `challenge-6-consumers.md:51`) is Home Assistant's `ha-icon` at `frontend/src/tiles/dock_parts.ts:271`. That line is `floorIcon` (`:268-271`), whose one caller is the floor menu: `dock_menu.ts:96` puts it in a `DropdownMenuRadioItem`, in the menu's portal, outside every seat. The same at `6d5ac72a` (`dock_parts.ts:259`, `dock_menu.ts:97`). The worded tab's glyph is `tabIcon` (`dock_parts.ts:64`), an `svg` from `glyph()` (`tabs.ts:23-27`, `glyphs.ts:301-310`) or from lucide (`tabs.ts:11-12`), which the tab seat already sizes as an `svg`.
- A `git grep` of the twelve trees `appgrep.mjs` reads, for an icon element that is not an `svg` (a `*-icon` element in a template or a render call, iconify, Material or Font Awesome classes), finds that line and no other.
- The seats that wrap a glyph keep their own rules either way, since the attribute sizes the marked box (`width` and `height`, `icon-button.css:250-251`, `tab-button.css:161-162`), not what is inside it: daraksha's transport stack (`NameDock.vue:72`, its glyphs sized from glass's `--dock-icon-glyph` at `:108-110`), Motion's Again glyph inside `.kf-turn` (`MotionPage.vue:118`), Home Assistant's faces (glass `Avatar`s at their own size, `dock_parts.ts:166`), fourier's ℱ seal (a letter, `AppDock.vue:368`). daraksha's pictures and page icons are `img`, `picture` and `svg` (C-5; `PageIcon.vue`'s root is an `svg`).

The attribute leaves the three selectors (`controls/icon-button.css:249`, both places in `:263`'s `:has()`, `controls/tab-button.css:160`) and their comments: a glyph is a direct `svg`, `img` or `picture`. Reverts the attribute's part of `ddfa8a2ba` (RU-45) and `fb637fd31` (RU-55 with RU-65).
- RU-76's folded face takes the same three forms (its amendment above).
- RULINGS-6's RU-65, row 2, closes on three forms: a tab seat sizes a direct `img` or `picture` as it does an `svg`. Its plant stands (the tab rule cut back to `> svg`: RED on the tab seat holding a picture).
- The Home Assistant and daraksha drafts are corrected.

*Reason.* RU-78's rule: a name with no site goes, and the one site named for this one is a menu item's icon that no seat holds.
*Witness.* `m7/names.mjs` on the merged tree: 78 against 80. G-13's glyph census reads the three forms, its tab-seat line a direct `img` and `picture` at 1.5 em within 0.5 px (H12).
*Touches.* `controls/icon-button.css:246-265`, `controls/tab-button.css:157-163`; harness `m7/census7.mjs:41`, `g13.mjs:54`, the mark cells in `dock-wi8.vue:825-839`.

**RU-88. fourier's `StageDock` is the preset's fourier site, and it gives way to `ControlsDock`.**
*Source* (`origin/master` `67a0c57`). CanvasControlsDock (`:62`) and PlotToolsDock (`:47`) mount no `GlassDock` of their own; each is a `StageDock`, whose two `GlassDock`s (`StageDock.vue:88-90` for one action, `:91-110` for several) are the dock. Its header says it gives way when glass ships the composition (`:17-18`). It is the preset's case point for point: a `label` (`:25`); never folded with one action and folded at every width with more (`fold`, `:26-27`; `collapse="closed"`, `:94`); `expand-on="press"` (`:95`); the site's glyph in `#collapsed` (`:101-103`); a seat outside the fold in `#persistent-end` (`:107-109`); placed at its stage card's top end (`:115-122`); and the hold and outside-press memory that 11.2.0 makes the dock's own (`:45-76`).
- RU-79's fourier sites are `StageDock`, with its two callers, and EditorControlsDock (`:88`). `StageDock`'s two docks become one `ControlsDock` with `corner="top-end"` and `within="parent"`, and `expand-on="press"` passed through. Its `fold` prop, counted hold and outside-press memory go. The phone column (`:30-40`, `:97`) stays fourier's, an `orientation` passed through. Of the slot props the preset does not give, `hold` has no use once the dock holds for its own menus, and `column` is the site's.
- The fourier draft's bullet on `StageDock`'s hold and its bullet on the preset become one bullet on `StageDock` giving way, with EditorControlsDock's move beside it.

*Reason.* The preset was written for this file (INPUT-fourier-stage-dock: "fourier's file is the reference for a preset in 11.2.0"), and naming its callers left unnamed the file that holds the dock.
*Witness.* RU-79's. The harness's controls cells model the preset, not a file, so no cell is added.

## verify-7, each refutation

| # | refutation | ruling |
|---|---|---|
| 1 | G-1 (f) has no biting witness in WebKit | RU-73: G-1 not GREEN in WebKit until it does |
| 2 | G-14's plants never read in WebKit | RU-81 |
| 3 | RU-57 recorded as held while its amendment withdraws 0.4 | RU-67: 0.4 withdrawn in both schemes; MEASURE-7's "RU-57, held" is corrected to "not held" |
| 4 | the Q10 folded frames are open | RU-83 (and RU-82 for `ink7`'s folded posture) |
| 5 | no row shows today's plate; no wash-tier dock; WebKit's 0.7 unread | RU-69, RU-83, RU-67 (the 0.7 reading) |
| 6 | R-5 not applied to `pinned`, `update:pinned`, `#rim` | RU-78 |
| 7 | `run` has a site line | RU-78 (record corrected) |
| 8 | the controls cells mount an overridden attribute | RU-79 |
| 9 | g4-ghost bites nowhere; WebKit's G-11 rest clause not run | RU-81, RU-74 |
| 10 | RU-62's overlay lines left out of the budget | RU-85 |
| 11 | the strips' labels | RU-83, RU-76 (the folded face's small glyph) |

## The eighth pass's order

*Struck (fold 7):* superseded by "The final eighth-pass order" at the end of this file.

## The ready list

*Struck (fold 7):* superseded by "The final ready list" at the end of this file.

## The REMOVES list, in the eighth pass

*Struck (fold 7):* superseded by "The final REMOVES list" at the end of this file.

## The budget arithmetic

*Struck (fold 7):* superseded by "The budget arithmetic, folded" at the end of this file. The ruling seat's "+430" for the merge is corrected there to +343, plus the 282 lines of `useDockRunMark.ts` that RU-66 now carries.

## The owner questions

*Struck (fold 7):* superseded by "The owner questions, folded" at the end of this file.

## The step-10 messages, rewritten

*Struck (fold 7):* superseded by "The step-10 messages, folded" at the end of this file. Only those drafts are to be sent.

## What I did not decide

- What the stackless layouts are. RU-74 names the reading.
- Whether the merge lands the dock under 10,880 lines. The arithmetic says it may not; the first reading after the merge decides.
- WebKit's level 0.7 at 1440. If it reads at or above 1.70, the dark default goes to the owner.
- Whether one dark fill step holds the words and the 1.2 mark on every dock. RU-68 names the reading and question 21 the fallback.
- Why the popover does not open by touch, and why WebKit's Select and Sheet ignore the second tap. RU-72 names the reading.
- Whether the fit memory saves a layout. RU-80 names the reading.
- Whether `--glass-veil-dock` reaches the plate. RU-69 names the reading; nothing depends on it.
- Whether real Safari agrees with any of it.

## After the fold: the final lists

Fold seat, claude-opus-5-5, in the seat written for Fable, 2026-11-17. These are the one source of record for the eighth pass. Every disposition is in `fold-7.md`.

### Asked of the orchestrator

ORCH line 3 binds as written until he restates it. Two clauses of it cannot read what they are for, and one restatement of line 4 needs his confirmation.

1. **G-16 (ORCH line 3).** Restate the clause to the consumer fixture of RU-77 as amended: its total gzipped JS no larger than v11.0.2's on the same fixture, with the entry, the closure and the union closure reported beside it. Without his line, G-16 is the entry, and it is RED (23,080 B against 17,827 on the tip, before 11.1.0's +1.6 KB arrives).
2. **Dock lines (ORCH line 3).** Restate the clause to code lines: a line is code unless it is blank or its first non-blank characters open or continue a comment, so a trailing comment counts as code; at or under v11.1.0's code count, 4,741, read on the merged tree, with `wc -l` reported beside. *Count*: the tip already carries 4,872 code lines, 131 more than v11.1.0, while reading 467 fewer by `wc -l`, and the bound as written passes on the merged tree only by deleting prose. The projection below is RED on both counts. The orchestrator says whether that is a NOT READY, as ORCH line 3 says a budget NOT READY is, or whether the bound moves, with its reason.
3. **The plate (ORCH line 4).** RU-67 restates it, with the reading that shows it has no member: G-15 excludes rungs and does not pick one, and the plate is picked by RU-67's written rule, now on show-through over the grid ground. The orchestrator confirms or restates.

### What the fold did not decide

- The dark level. RU-67's restated rule picks it from H6's show-through reading; 0.7 is provisional.
- Whether the gliding mark carries onto the redesign's whole-seat run without a fault. The merge reads it, under its unit test and plant.
- Whether WebKit paints the canvas-tools Grid seat white. RU-82's ring read and the saved crop decide.
- Whether the segmented control's hover takes the dock's token. RU-68 names the reading.
- Whether the budget's line clause can be met after the merge. The orchestrator's line decides.
- Whether the consumer fixture is under v11.0.2's. H8 reads it.
- Whether O-386's two extents differ once RU-75's seat extent lands. H10 reads it.

### The final eighth-pass order

On `bl/dock/wi8` from `943fe6e9d`. Harness first, each cure read on the current build or its rows where it can be; then source, one commit each; then one whole measure. Every run under `guarded`, one heavy run at a time, and every run that starts Playwright WebKit under `guarded --exclusive webkit`.

**H. Harness (no source).**
1. `judge8.mjs`: RU-70's fade in frames, RU-71's travel at the lane's turn and the shown tolerance, the new fade plant. Re-judge `rows/m7p`; g3-retarget and the lane plant still bite.
2. `trig7`'s reading at every tap (RU-72): `elementFromPoint`, the seat's box against the plate's and the port's, the event order and the open state; WebKit's Sheet read from the scrim (C7-M13); the popover past the cut; WebKit's Select. One 390 touch cell on fourier's AppDock composition for O-380's pinned-on-touch (C7-8). The cure it names, if it is the harness's.
3. G-1 (f)'s unit witness with and without the tap's focus event, and its two plants, on the current build; WebKit's seat-tap event order and `document.activeElement` recorded (RU-73, C7-M12).
4. g4-ghost rewritten; G-14's plant runner in WebKit; G-11's rest clause in WebKit; `cost7`'s phase marks, and the two frames after each trigger judged (RU-81, RU-74, C7-M6).
5. `ink7`: settle; opened cells only; the base that fails loud; hover at fine pointers only; the folded posture on a folding composition; `[aria-pressed]` in the mark selector; each item's background from a ring outside its box or with ink pixels masked, with its opacity product recorded; an item unsettled on its second read fails; plate and field by median colour, three reads, the spread printed; the hover-against-ground clause; whether the segmented control's hover takes the dock's token; one held-press read (RU-82, RU-68, C7-M3, C7-M4, C7-M5, C7-M9, C7-M14, R7-6). Then WebKit's canvas-tools and figure-tools cells and the loose cell read again, and WebKit's Grid-seat crop saved.
6. The grid ground (RU-67 as amended): the dark stage and its light twin; show-through per rung in both engines and both schemes, today's dock from v11.0.2's tree included; the whole WebKit 0.7 rung at 1440 (C7-M8); RU-67's rule applied and its result recorded as the dark default S4 writes.
7. `owner8` and `strips7`: the crop to the stage, the posture check, today's row from v11.0.2's tree; Q10 on nav, both postures, on the three grounds, with plate against field and show-through to two decimals; slides's wash-tier row; the Q13, Q14, Q17, Q18 and seat-set frames; the `--glass-veil-dock` reading (RU-83, RU-69).
8. Daraksha's ground, with the fission neck in dark (RU-85, C7-4). G-12 in a `git archive` tree. G-16's consumer fixture, the union closure and the two plants, on v11.0.2 and on the current build (RU-77, C7-M2, C7-5).
9. RU-54's memory plant on `cost7` (RU-80), on the current build.
10. O-386's cross extent: the plate's block size folded and open on value.js's composition and `w-inflow`, both engines, 1440 and 390 (C7-7).
11. The six controls cells drop `collapse="closed"` (they fold once S3 lands); `w-kfcode` relabelled as a four-control `ControlsDock` cell (RU-79, C7-6).
12. The names: `appgrep.mjs` prints each line of RU-86's table at its ref beside the removals; G-13's glyph census (`census7.mjs:41`, `g13.mjs:54`) reads three forms, and the `[data-dock-glyph]` mark cells in `dock-wi8.vue:825-839` go (RU-86, RU-87).

**S. Source.**
1. The merge of `master` (RU-66), carrying `useDockRunMark.ts` onto the redesign's run with the mark painting RU-68's current step (C7-1). G-14 gains `release-11-0-2*`, `ro-loop*` and `GlassDock.run-mark.test.ts` with its plant; master's snapshot re-taken. Then the names, the lines (`wc -l` and code), the G-16 fixture, and G-11's batched sample by stack (C7-M6).
2. The removals: `pinned`, `update:pinned`, `data-dock-scope`, `data-dock-glyph` and its form in three selectors; the fit memory if H9 says so; the trigger's muted ink; the 28 % press step; struck-history and stale comments (RU-78, RU-87, RU-80, RU-68, RU-85). `controlCount` and `#rim` stay. The names and the lines again.
3. `ControlsDock`'s fold at every width, and the README's line for a row that never folds (RU-79).
4. The plate: `.glass-dock { --glass-level: 1 }` and `.dark .glass-dock, .glass-dock.dark { --glass-level: <H6's dark default> }`, `shell.css:263` on the same selector, the README's matching-plate recipe (RU-67, C7-3, C7-4). Then the fill union read and one step taken (a dark arm only if none holds both), the hover by RU-68's order, the press at 2 % over the seat's own fill; RU-56's plant read again at those levels.
5. The seat extent (RU-75); the folded face's share over a direct `svg`, `img` or `picture`, with size classes off direct-child glyphs only, here and on `bl/demo` (RU-76, R7-8, RU-87; `bl/demo`'s `nav.stage.vue` also loses its duplicated `<style scoped>` block).
6. G-8's touch cures, if H2 names a build fault (RU-72); `useDockBody.ts:720`'s mark narrowed (RU-74); O-386's cure with its plant, if H10 reads a difference (C7-7).
7. RU-61's second round as a prototype on its four named faults, joining only on the owner's answer to question 14 (RU-84, R7-4).

**M. One whole measure** on one build: every cell in both engines, G-14 in three projects with the 11.0.2 and 11.1.0 specs and the run-mark test, every plant in every engine its gate claims, the load per cell, the budget's numbers, then the strips and the owner's page. Then the step-10 messages again with the final numbers.

### The final ready list

*Ready for an 11.2.0 build seat* is this list and nothing more, on one build that contains `master` (RU-66), each gate read at a load of 36 or under, each with a plant that bites in every engine the gate claims:
- G-1 GREEN in both; (f) by Chromium's finger cell and the unit witness, run with and without the focus event, under its two plants (RU-73).
- G-2 and G-4 GREEN in both with RU-70's fade clause; G-2 and G-10 over the controls docks' 1440 folds (RU-79); G-4 with a biting ghost plant (RU-81).
- G-3 GREEN in both by `judge8.mjs` (RU-71).
- G-6, G-7, G-9, G-10, G-12 GREEN in both; G-12 on a `git archive` build.
- G-8 GREEN in both: four surfaces by mouse and by touch, the touch clause reading what a person can press, and a modal's scrim press closing the modal with the dock lingering (RU-72).
- G-11 GREEN in Chromium by trace: three layouts on a trigger frame, four only on a frame `dock:reread` names, and no layout under a script stack in the two frames after it beyond each frame's own; every layout named, none listed as the engine's; the rest clause in both (RU-74).
- G-13 GREEN in both with the seat line (RU-75) and the folded-face line over the faces it lists (RU-76); the glyph census over a direct `svg`, `img` or `picture` (RU-87).
- G-14: no failure in any of the three projects that master's re-taken snapshot does not also have, the 11.0.2 and 11.1.0 specs and the run-mark test included; each restated group's plant bites in each project (RU-66).
- G-15 GREEN in both at the level RU-67's rule returns (or the owner's pick) and the step RU-68 takes: words 4.5 on every seat, current and pressed included; glyphs 3; marks at their floors (each engine's v11.0.2 reading on the cell, and 1.2 for dials's two marks on the dark field, or question 21's answer); hover against its own ground no weaker than v11.0.2's on the cell (1.1 where none), and against current 1.2 or the separation at the floor-set pair until the owner picks, at fine pointers; the loose `DockControl` as v11.0.2; backgrounds read from the ring, and an item unsettled on its second read failing (RU-82).
- G-16 GREEN by the consumer fixture if the orchestrator restates ORCH line 3 so; without his line, by the entry as written (RU-77).
- The public names fewer than 80 (78, RU-78, RU-87), each kept addition at its site line in RU-86's table as H12 prints it. Dock lines by the clause the orchestrator writes (code lines, with `wc -l` beside); without his line, 10,880 or fewer by `wc -l`.
- `w-pwords` GREEN with its plant (RU-80).
- O-386's cross extent equal folded and open, or cured with its plant (RU-84, C7-7).
- RU-61 GREEN in both with question 14 answered, or reported not built (RU-84).

Not required of the build seat, required before the tag: real Safari; the owner's look at the strips; the step-10 messages with final numbers, including the fixture's figure for value.js (or value.js's own budget run on a tarball of the build); RU-60's press-and-hold name only if question 13 makes it one. Not in 11.2.0: the scroll fold, the anchor inferred from slots, a preset beyond `ControlsDock`, the deprecation list.

### The final REMOVES list

Counted by SURFACE.md's method. RULINGS-6's final list and step 2's removals stand; these are added.

| what | names | lines (*estimate*) | reverts | condition |
|---|---|---|---|---|
| `GlassDock`'s `pinned` and `update:pinned` | 2 | about 10 | their part of `8dd82bc57` | none: 0 app uses |
| `data-dock-scope` and its per-frame write | 1 | about 4 | its part of `8dd82bc57` | none: 0 app uses |
| `ControlsDock`'s phone-only fold | 0 | about 3 | `95004b894`'s rule | none |
| RU-54's fit memory and its key | 0 | about 35 | the memory half of `d5d3f09b0` | only if H9 reads no layout saved |
| the trigger's muted ink inside a dock | 0 | about 5 | none (predates W-I.8) | none |
| the 28 % press step inside a dock | 0 | about 1 | none | none (R7-6) |
| `data-dock-glyph` | 1 | 0 (three selectors lose a form) | its part of `ddfa8a2ba` and `fb637fd31` | none: no app site (RU-87) |
| level 0.4 | 0 | 0 | `5eccb8554`'s level line | replaced by RU-67's two |
| struck-history and stale comments in the dock directory | 0 | read on the tree (92 lines carry a strike) | none | they change no behaviour |

Struck from the ruling seat's list: `controlCount` from the exposed surface (it stays, R7-7) and `#rim` (it stays on fourier's line, C7-10). Not removed: `useDockRunMark.ts`, which the merge carries (C7-1).

### The budget arithmetic, folded

**Names** (SURFACE.md's method, `m7/names.mjs`), against v11.1.0's 80:

| | added | removed | count | net |
|---|---|---|---|---|
| the tip `943fe6e9d` | 19 | 17 | 82 | 2 up |
| less `pinned`, `update:pinned` | 17 | 17 | 80 | 0 |
| less `data-dock-scope` | 16 | 17 | 79 | 1 down |
| less `data-dock-glyph` (RU-87) | 15 | 17 | **78** | **2 down** |

`controlCount` and `#rim` stay. Each of the 15 kept additions is cited by its site line in RU-86's table; `controlCount` is the one kept without a site line, read by glass's own preset. The merge adds no name to this count: every name v11.1.0 has that the branch lacked shows among the 17 removals, all deliberate, and the carried run mark exports none. The second number, not bounded: the names a site is expected to use rise by 14 (the 15 less `controlCount`) and fall by none.

**Dock lines** (every `.ts`, `.vue` and `.css` under `src/components/dock`; *Count*, mine, matching C7-M7's code column exactly):

| tree | `wc -l` | code |
|---|---|---|
| the branch's base `99a1389e6` | 10,372 | 4,332 |
| v11.0.2 | 10,489 | 4,375 |
| v11.1.0 | 11,081 | 4,741 |
| the tip `943fe6e9d` | 10,614 | 4,872 |

- *The merge.* `git diff --numstat 99a1389e6 v11.1.0 -- src/components/dock` gives +944 −193. Less `README.md` (+45 −3, outside the count) and `dockMorphMeasure.ts` (+102 −17, which goes with the morph), it brings up to +343 by `wc -l`, about +194 of it code. `useDockRunMark.ts`, now carried (C7-1), adds 282, about 181 of code.
- *By `wc -l`:* 10,614 + 343 + 282 = 11,239; less about 60 removed, plus about 15 added (two level lines, the fill and hover lines, the seat extent, the folded share): about 11,194; less the 92 struck lines: about 11,102. RU-61, if it joins, adds about 30. So the merged tree is projected up to about 220 lines over 10,880 after the comment cut, and level with v11.1.0's 11,081.
- *By code:* 4,872 + 194 + 181, less about 50 removed, plus about 15: about 5,210, some 470 over v11.1.0's 4,741.
- Reconciliation, 11.1.0's hunks that the redesign supersedes in `run.css`, `morph.css` and `useDockState.ts`, lowers both figures by an amount only the merge reads. Closing either gap needs code removed beyond this list, and none is ruled here. Reported beside: `useDockBody.ts`'s own count, and the lines outside the directory (RU-85).

**G-16.** The consumer fixture against v11.0.2's (RU-77 as amended), if the orchestrator restates the clause. Today, by the entry: 23,080 B against 17,827 (RED); the closure, 35,761 against 38,758, reported beside. Read again after the merge.

### The owner questions, folded

Each has a default, and the work goes on with it. Questions 13, 15, 16 and 17 keep RULINGS-6's text as its fold amended it.

10. **A firmer dock** (amended again). The frames you sent of a too-clear dock were all dark, and in dark today's dock barely stands off the page. So dark and light get their own firmness. Default for dark: the dock hides as much of a patterned page as the light dock does, measured on a near-black grid page with text under the dock, like the pager frame you sent; until that reading is in, the third of five steps. Default for light: one step more ink than today, which also makes the light dock a shade greyer on a plain white page. The strip shows today's dock and five firmnesses, in both themes, folded and open, on three pages: the dark grid page, a warm figure page and daraksha's ground. Beside each frame: how far the dock stands off the page, and how much of the grid shows through it. The near-solid dark dock of the sixth build is gone.
12. **Delete what no site uses, now** (amended again). Counted on the next build, the dock ends 2 names smaller than 11.1.0 (78 against 80). Default: delete them in 11.2.0.
14. **A dock that sits in a row with other things** (amended again). Opening over its row moves nothing beside it, but on atlas the open dock covers part of the figure's legend, a link included, and it stays open a few seconds after the pointer leaves, so for that time the link cannot be pressed. You can have the dock grow away from the legend (the site picks the edge that stays put), the row keep an empty space the size of the open dock, or no change in 11.2.0, so the dock still pushes its row when it opens. Default: no change in 11.2.0 until you answer.
18. **How different a hovered icon looks from the current page's** (amended again). The strip shows three hover strengths, all inside the range our motion rules allow, each labelled "the pointer rests on Home; Reports is the current page", with how far each stands from the current page's highlight and from the dock behind it. Today's build's stronger hover is beside them for reference. Default: the faintest of the three that shows on the dock at least as clearly as today's hover does.
19. **A dialog opened from the dock.** A press on the dimmed page behind a dialog or a sheet closes it, and the dock stays open for its usual pause instead of closing at the same moment, just as Escape closes a menu first and the dock second. A press outside a menu still closes both at once. Default: yes.
20. **The controls dock on a desktop.** Once it holds two or more controls it folds at every width after its short pause, so a page of figures does not fill with open docks; with one control it is that control. A row of controls that should never fold stays an ordinary dock. Default: yes.
21. **The selected tab in dark** (amended; asked only if the next build hits it). In dark the selected tab is a lighter patch with light words on it. On some docks the words cannot stay fully readable while the patch stays as strong as today's, unless the dark dock goes nearly solid. Default: keep the dock glass, keep the words readable, and let the patch be fainter than today's on those docks, which the next build will name.

### The step-10 messages, folded

Drafts, not sent. At booking now, and again before the tag with the final numbers. Each says what the site sees and what it does about it. sci-report gets no draft: it mounts no dock of its own, and the figure docks it shows are atlas's, so atlas's draft carries that line.

#### atlas

Here is what the next glass-ui minor, 11.2.0, changes in the docks atlas mounts, so nothing in it surprises you.

- **The plate.** A dock still rests as a fully rounded capsule. Your docks are static, so each plate stays an opaque card in both themes; the firmer dark plate other sites get does not reach them.
- **Seat fills.** A hovered seat and the current seat are now light steps of the dock's own text colour, and a press shrinks the seat with only a touch more of that colour. If you set `--dock-control-hover-bg` or `--dock-control-active-bg` for a dock, check it still lands; inside a dock those defaults now sit on `.glass-dock`.
- **Glyphs.** An icon you have not sized fills nine tenths of its seat, and so does a folded face's icon when it is the face's own child. Anything you sized with a class keeps your size, so PlateDock's folded sliders glyph stays small beside the Table glyph until its size class comes off.
- **Seat heights and ink.** Every seat in a run is the control's height, 40 px on desktop and 44 on touch, triggers and tabs included, and a trigger's label and chevron are drawn at full strength instead of dimmed.
- **The controls preset** folds at every width once it holds two or more controls, after its short pause; with one control it is just that control. PlateDock could move to it, passing its `expand-on` through, and that also covers the figure docks sci-report shows. The preset always sits at a corner, fixed to the window or absolute in its parent, so a PlateDock on it leaves the head row it stands in today.
- **Overlays.** Menus, popovers, dialogs and sheets opened from a dock seat hold the dock open with nothing to wire. A press on a dialog's or sheet's dimmed backdrop closes it, and the dock stays open for its pause.
- **In-flow docks.** The overlay that would let an in-flow dock open without pushing its row covers part of a figure's legend, its link included, while the dock lingers, so it waits for the owner's call. Until then an in-flow dock still pushes its row and `anchor` still does nothing, so please keep your own layout hold. We will tell you before the tag.
- **Progress rims.** The dock's new `#rim` slot takes a progress rim and follows the plate's outline in every frame, so the `DockProgressRim` in the rail's and the phone bar's `#persistent` could move into it.
- **Unchanged for you.** `run="plain"` stays as you use it. The `:hover-intent` that PlateDock passes is not a dock prop and does nothing; the pause before a hover opens the dock is the `--dock-intent` token. The scroll fold moved to 11.3.0, so your own scroll rule stays for now.

#### fourier

A short list of what 11.2.0 lets fourier delete, and what to keep.

- The scroll fold moved to 11.3.0, so keep folding the app dock on scroll in your own code for this release.
- `--dock-trigger-min-height: var(--dock-control-size)` in `AppDock.vue` can go: a trigger in a run now takes the seat height by itself.
- The `keepOpen()` and `release()` calls around your menus can go too. A menu, popover, dialog or sheet opened from a dock seat holds the dock on its own, and a press on a dialog's dimmed backdrop closes the dialog while the dock stays open for its pause.
- `StageDock.vue` can give way to the controls preset, as its header says it will. One `ControlsDock` with `corner="top-end"` and `within="parent"`, passing `expand-on="press"` through, replaces its two `GlassDock`s; the folded glyph stays in `#collapsed` and Edit contour in `#persistent-end`. Its `fold` prop goes, since the preset is the one control when it holds one and folds at every width once it holds two or more. The counted hold (a `keepOpen()` for each open menu) and the collapse after an outside press within 600 ms (lines 45 to 76) go too: the dock now holds for an open menu and folds on an outside press by itself. The phone column stays yours, as an `orientation` you pass. The preset takes no `collapse` prop.
- `EditorControlsDock` can move to the preset as well, with the point count and Save in `#persistent`.
- The `ScrollProgressRim` you teleport into the app dock can sit in the dock's new `#rim` slot and follow the plate's outline in every frame.
- Of the eighteen reds booked for this release, the 4 to 8 px row overflow is what 11.2.0's fit rule is measured to cure. Whether the dock stays pinned open after a tap on a phone is read on the next build, and we will tell you what it shows.
- In dark mode the plate is firmer and hides more of the page behind it; in light it takes one more step of ink. Seat fills are now steps of the dock's own text colour, and an unsized icon fills nine tenths of its seat. The exact dark firmness comes from the next build's reading, and we will send it before the tag.

#### Home Assistant

Three changes in 11.2.0 touch the Home Assistant tabs directly, and one waits.

- **The worded tab's icon.** A tab seat now sizes the `svg` that is its direct child at one and a half times the word, and your tab icons are svgs (`tabIcon` in `frontend/src/tiles/tabs.ts`), so there is nothing to mark. Your kit's glyph base in `tiles/css/marks.css` is unlayered and still wins over the library's layered rule, as your note in `tiles/css/tabs.css` says of the icon seats, so a worded tab's icon stays at the kit's size unless `.shell-dock .dock-tab-button > .glyph` takes `1.5em` beside that line. The floor icons in the floor menu sit in menu rows, which the dock does not size.
- **The trigger beside icon seats** now matches their height, 40 px on desktop and 44 on touch, so the short wide trigger is gone. Its inline padding stays the density's 8 px; set `--dock-trigger-padding-inline` if you want it to match the tabs' 12 px. Your own tab height still wins for the tabs.
- **The active fill.** The current seat's fill is a step of the dock's own text colour now, so your `--dock-control-active-bg` override can be deleted.
- **One base size set in px** moved to 12.0.0, so keep your own scaling until then.

In dark mode the plate is firmer and hides more of the page behind it; in light it stays glass with one more step of ink. We will send the exact dark firmness before the tag.

#### speedtest

Not much changes for speedtest in 11.2.0, but two things are worth a look in both themes.

- You set `--dock-fg-on-aurora` on `.glass-dock`, and the hovered, current and pressed fills inside a dock now follow that colour.
- Your plate keeps `--material-bg-dock` in both themes: `design/register.css` sets the plate's veil itself, so the firmer dark plate the other sites get does not reach it.

`--dock-scale` keeps working; one base size set in px moved to 12.0.0. `DockBackgroundToggle` is deleted in 11.2.0, which you had already dropped (only comments still name it). Your `--dock-trigger-padding-*` values still win over the new trigger default, and your own tab height still wins over the new tab default.

#### gregg

A few deletions open up in gregg with 11.2.0, plus one thing that did not make it.

- **The gliding mark stays.** The mark under PageDock's and HeroPlate's current control keeps gliding between seats as 11.1.0 shipped it, now painted in the dock's new current step.
- **The fills.** You set `--dock-fg-on-aurora` on `.glass-dock`, so hovered, current and pressed fills now follow your ink. The new current step in dark lands between 10 and 16 % of the ink, against the 24 % your `style.css` sets; we will send the exact step before the tag, and whether to keep your override is yours.
- **PageDock's run.** A `role="group"` child of the run is now a frame whose seats are the snap targets, so your `scroll-snap-align` rules can go. The `--dock-open-seat: max-content` line no longer does anything, since 11.2.0 has no widened current tab.
- **Seat heights.** The tab seats in PageDock and HeroPlate grow to the control's height, 40 px on desktop and 44 on touch (about 38.6 and 38 today).
- **The plate.** Your docks are static, so their plates stay an opaque card in both themes, and your pair docks' wash tier is untouched.
- **The progress rim** already rides the plate's border, so nothing there changes; the dock's new `#rim` slot is there if you ever want the rim inside the dock.
- **Not built.** Trailing persistent seats that give way on a narrow screen: persistent seats never yield, and the run takes the room left. `dockFold.ts`'s pin stays as it is.

#### value.js

Three notes for value.js: colour, the plate, and bytes.

- Inside a dock, the hovered, current and pressed fills now follow your `--dock-fg-on-aurora`. A `DockControl` outside any dock keeps today's fills, including 11.0.2's dark-mode lift. `type="submit"` on `DockControl` stays.
- **The plate in dark.** Your docks take the firmer dark plate, so the band your colour session measures off `.dock-plate` will read differently in dark; light takes one more step of ink. We are also checking that `--glass-veil-dock` still reaches the plate on the new build, and if it does not, we will tell you which token does before the tag.
- **First-load size.** We are building a small page that imports the dock parts you use and the menus they hold, on 11.0.2 and on the merged 11.2.0 build, and will send you the difference before the tag. If you would rather run your own budget, we can send a tarball of the build first. There is no separate chunk for the morph.

#### daraksha (through value.js)

Could you pass these along to daraksha?

- Tab seats now size a direct `img` or `picture` at one and a half times the word, as they already did an `svg`, so daraksha's own size rules for tab pictures can go. Icon seats already size pictures at nine tenths of the seat. A glyph inside a wrapper, such as Motion's Again inside `.kf-turn`, is reached only as the tab's direct child.
- The two `--glass-veil-dock: var(--glass-veil-base)` lines, in `SiteDock.vue` and `ControlsSeat.vue`, now equal the default and can go.
- In dark the dock's plate is firmer. The neck between the site dock and the theme dock is a `glass-plate` outside both docks, so it would keep the clearer level and read thinner than the two plates it joins. The README's recipe for a plate that matches the dock carries the dark level, and the same line suits `Star.vue` and `Clasp.vue`. We will send the exact line with the final number.
- The controls seat can become the controls preset: it folds at every width once it holds two or more controls, `dockHold.ts` can go, and `DockOutlet` carries the teleported docks.
- `dockTip.ts` should stay for now: page names on a press and hold come with the tooltip work, after this release.
- We are building daraksha's ornamented ground into our test stage to check the firmer dark plate on it, the neck included. If we cannot match it closely, we will ask for a frame of the dock at two firmnesses.

#### slides

One visual change for slides in 11.2.0: in dark mode the dock's plate is firmer and hides more of the slide behind it, and that includes the deck dock on a dark slide in a light deck, since it carries `.dark` itself. The firmer level also mixes the tier `decks/parkway-lab/theme.css` sets on the dock toward the card colour. Light mode takes one more step of ink. Seat fills are now steps of the dock's own text colour, unsized icons fill nine tenths of their seat, and menus or dialogs opened from a dock seat hold the dock with nothing to wire. A quick look at a deck in dark mode once the build lands would settle it.

#### keyframes

Four things for keyframes in 11.2.0.

- `graspHeld` stays exposed through 11.2.0 and is removed in 12.0.0, so the dock-context test can keep reading it for now.
- The transport's Play seat still slides when the dock opens: the in-flow overlay waits for the owner's call. If it lands, setting `anchor="start"` keeps Play within a few pixels of the pointer; we will say before the tag.
- The `keepOpen()` and `release()` calls around your menus can go. The code pane's RibbonBar stays a `GlassDock` with `:collapse="false"`: the controls preset always folds once it holds two or more controls, and that row should not.
- In dark the ChromeDock, TransportDock and RibbonBar plates are firmer and hide more of the aurora behind them; light takes one more step of ink. The Apply CSS tab grows to the control's height, 40 px on desktop and 44 on touch.

#### gaggle

Three small changes reach gaggle's docks in 11.2.0. An unsized icon beside a word in a tab is now one and a half times the word: 21 px at a 14 px word, where lucide's default made it 24. If the tabs should stay at 24, a size class on those icons keeps them there. The view tabs grow to the control's height, 40 px on desktop and 44 on touch. In dark the site dock's and KitDock's plates are firmer; the report dock is static and keeps its opaque card. The `keepOpen()` and `release()` calls around your menus can go, since a menu opened from a dock seat now holds the dock on its own. The dock's search slot is gone, which changes nothing for you since your search lives in its own slot.
