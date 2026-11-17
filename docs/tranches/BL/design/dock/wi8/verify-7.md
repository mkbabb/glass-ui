# W-I.8: the seventh pass, verified

2026-11-17. Seat: adversarial verifier of MEASURE-7. Model: claude-opus-5-5 (in the Fable seat; Fable is out of quota until 2026-11-21). I built nothing, changed no source, staged nothing and ran no browser. Every reading below comes from the pass's logs, rows, manifests and strips, from `git` on the worktree, or from re-gzipping the tip's built `dist/dock.js`.

Paths starting `logs/`, `harness/` or `owner-m7/` are under `.claude/worktrees/bl/dock/wi8/docs/tranches/BL/design/dock/wi8/measure/`. The strips are in `docs/tranches/BL/design/dock/wi8/fold/`.

## Verdict

**NOT READY holds.** Every red reading on MEASURE-7's list matches its log. The sentence "Everything else on the list reads GREEN in both engines, each with a plant that bites" does not hold. G-1 and G-14 each lack a biting witness in WebKit. RU-57 is recorded as held, but its amendment withdraws the level the build ships. The Q10 ladder strip labels every frame of an open dock "folded" and labels level 1's plate as v11.0.2's.

## What stands

- **The build.** `943fe6e9d` is src-clean against the pass commit `3a923d2ea`, which touches only `measure/` (618 files). `logs/m7p-build.sha` names the tip.
- **Load.** The probe rows read from 5.11 to 16.47 (the `load` field of `logs/m7p-judge-*.txt`). The queue started its items at loads from 3.9 to 17.5 (`logs/m7-runq-step8.log`), and RU-54's follow-up at 7.9 to 10.9. The battery's 40 % pause rule could not fire with the battery at 88 to 99 %.
- **Dock lines.** My own `wc -l` over `git cat-file` of every `.ts`, `.vue` and `.css` under `src/components/dock`, test files included and then excluded (none exist there): v11.0.2 10,489, v11.1.0 11,081, `ddfa8a2ba` 11,225, tip 10,614. That is GREEN against 10,880. No dock code moved out of the directory to make the number. Outside it, `ddfa8a2ba..tip` touches only participation, dialog and sheet (RU-62) and the blob and aurora READMEs and comments.
- **Public names.** 80 at v11.1.0 and 82 at the tip by `harness/m7/names.mjs`. I checked the +19 and −17 against the barrels (`index.ts`, `trigger.ts`) and the SFCs' `defineProps`, `defineEmits`, `defineModel`, `defineExpose` and `<slot>` tags on both refs. `DockProps` has the same nine keys on both refs, and the tip's `GlassDock` adds `pinned` and `run` in its intersection. Every one of the eleven SURFACE attributes is live in the tip's source. The net is +2, RED.
- **G-16.** Re-gzipping the tip's `dist/dock.js` (75,796 B, built 01:10 from `943fe6e9d`) at level 6 gives 23,080 B. The method is the one ruled: `git archive` builds, the same toolchain on both sides, and `dist/dock.js` read for both. The closure walk follows static `import … from` only, and the tip's entry has no `export … from`, so the closure figure is sound as reported. The entry is larger and the closure smaller (35,761 against 38,758): v11.0.2 spread dock code over 27 chunks, the tip over 19. The gate names the entry, so RED.
- **G-6, G-7, G-9, G-10, G-12 and the capped persistent-width cell** pass in both engines in their logs, each with a plant that bites:
  - G-6: g6-flow 24 px in both engines; g6-overflow 4 px (the press, plus WebKit's keyboard cell).
  - G-7: the plant's judge printed no lines. Its raw output reads `contextIsThisDock:false` 16 times against `true` in the pass.
  - G-9: g9-scope lags 4 rows in both engines.
  - G-10: g10-rm fails the fade in both engines.
  - G-12: g12-scale fails.
  - The capped persistent-width cell: g14-fitsibs reads `fits true` on 2 crossings in each engine.
- **G-6's instrument** (`harness/m7/g6c.mjs`) divides each seat's box by that seat's own `scale: sx sy`. That removes the designed press squash and nothing else, and the plants still read 24 px and 4 px through it.
- **G-14's data.** Chromium and coarse-touch ran 560 results (2 failed, both O-101, which master also fails). WebKit ran 270 results plus 10 skipped. `logs/m7p-g14cmp.txt` reads no new failure in any project. s2 passes at 1440 and 390 in all three projects with the fit memory removed, and the source is clean afterwards (`logs/m7-plant-g14-fitmemory-s2.txt`).
- **ControlsDock at 1440.** The tip's `ControlsDock.vue` has `inheritAttrs: false`, and `v-bind="attrs"` comes before `:collapse="collapseFor($slots)"`. The preset's binding therefore wins over a passed `collapse`, as MEASURE-7 says.
- **The reds.**
  - G-2 104/110 and 109/110, G-3 16/18 and G-4 41/43 match `logs/m7p-gates-*.txt`.
  - The 75 % reversal's 15.5 ms against its 14.5 ms bound passes, because RU-37 counts the turn in rows (`harness/m6/judge7.mjs:255`).

## Refutations

### 1. G-1 is not GREEN in WebKit: clause (f) has no witness that bites (major)

RU-42 (RULINGS-5:61) retired WebKit's finger cell. It moved clause (f) to a unit witness on `useDockState` "with the same plant". Under g1-lift that witness passes: `logs/m7-plant-g1-lift.txt` reads "Tests 1 passed | 20 skipped" and "unit rc=0".

The finger cell is CDP, so it runs in Chromium only. The plant log has one `finger` line. `logs/m7p-side-webkit.log` has none; its only lift reading is clause (g)'s tap, at 6013 ms.

The cause is in the tip's source. RU-62 added `quietReturn` to `useDockState.onFocusIn` (`ec71b3cd4`). The witness (`tests/components/custom/dock/GlassDock.posture.test.ts:160-186`) calls `handle.onFocusIn()` with no event while the pointer is outside, so a pending linger is no longer cleared. The planted early linger therefore survives, and the test cannot tell the plant from the build.

The g1-lift plant still bites in a real browser: Chromium's finger cell gets no fold, and the seat-tap cell gets no fold in either engine. So the witness has drifted from the fault it was written for. MEASURE-7 prints this in bold and still lists G-1 as GREEN. Under RU-42, (f) in WebKit is unread until it has a witness that fails under its plant.

### 2. G-14's plants were never read in WebKit (major)

`harness/m7/g14plantrun7.sh` runs each restated group's sites with `--project=chromium-headless-new`, or `--project=coarse-touch` for the touch group. Nothing in it runs WebKit. G-14 claims all three projects, and the ready list asks for "a plant that bites in every engine the gate claims". The table's "every restated group bites (corner 14 … zoom 3)" is a Chromium reading. In WebKit no G-14 plant was applied, apart from the fit plants on fit7's own cells.

### 3. RU-57 is recorded as "held as written: level 0.4 stands", but its amendment withdraws 0.4 (major)

- **The ruling.** RU-57's heading says "Level 0.4 is withdrawn as the default until then." Its C6-M2 amendment, which outranks the text above it by the header rule, sets the default as a rung whose plate reads "below level 0.4's (1.70:1, withdrawn as near-opaque)". ORCH-LINES-6 line 4 makes the default "the gate's first passing rung". No rung passes. The sentence "If nothing above 0.4 is GREEN, 0.4 stands" is the unamended text.
- **The seat's own instrument.** `logs/m7-ladder-read.txt` prints "level 04: excluded" in both engines.
- **Level 0.4 is excluded from both sides.** In dark its plate reads 1.781 (Chromium) and 2.038 (WebKit) on dials, above the 1.70 cut. In light it reads 1.119 and 1.117, below v11.0.2's own 1.199 and 1.193 (`logs/m7-ink-base1102.*`). In light the shipped plate stands off the page less than today's does. That fails Q10's default ("whose plate stands off the page more than today's does").
- **The messages.** atlas, gregg and slides are told "the plate stays at level 0.4" as if it were settled.

The truthful record is that RU-57 is unresolved. No rung is admissible, 0.4 included, and the orchestrator or the owner picks.

### 4. The Q10 strip's "folded" frames are the open dock, and so are RU-57's "folded" plate readings (major)

The dials composition mounts `<GlassDock :collapse="false" …>` (`demo/__anim/mounts/comp/dials.stage.vue:30`). It cannot fold. `owner-m7/owner8.chromium.json` and `owner8.webkit.json` record `open: true` on all 24 frames labelled "folded" in each engine. The harness knew the dock was open, and the label says folded.

`ink7`'s "folded" posture is the page at rest with the pointer at (2, 2) (`harness/m7/ink7.mjs:190-192`), not a folded plate. MEASURE-7's "1.009 folded and 1.055 open … softer folded, firmer open" compares two readings of an open dock. RU-57 as amended asks for the plate reading "for the open plate and the folded one". The folded plate was never read and is not on the strip.

RU-59's builder checks the scheme word only (`harness/m7/strips7.py:13-17`). It refused 0 frames while 48 posture labels contradicted the recorded state.

### 5. The Q10 strip has no row that shows today's plate (major)

- **The control row.** It is labelled "v11.0.2's veil (the control row)", but MEASURE-7 reads its plate as level 1's "to three places" (RU-57 paragraph). The label on the strip does not say so. The owner is asked to compare against today's dock and is shown level 1 twice.
- **Missing rows and readings:**
  - RU-57's C-6 amendment ("If a lower rung is taken, the strip carries a wash-tier dock beside a default one") is not met: a lower rung was taken, and no wash-tier dock is shown.
  - Daraksha's ground is not shown (admitted).
  - WebKit's level 0.7 row at 1440 prints "the plate against the field under it unread:1" in all four frames.

### 6. The names RED is counted right, but R-5 was not applied to the uncounted names (major)

fold-6's R-5 row reads "Each added name is cited or goes: `collapse`, `pinned`, `update:pinned` go unless a site line is cited."

The seat's own grep (`logs/m7-appgrep.txt`) reads "GlassDock pinned / update:pinned: 0 in the apps". Its two glass lines are `ControlsDock.vue:68`, which does not pass `pinned`, and a test harness. It also reads "#rim slot: 0 in the apps", with the only use in the measure harness.

MEASURE-7 counts these names as additions RULINGS-6 missed. It neither cites a site for them nor removes them, and it does not put the question to the orchestrator. Without `pinned` and `update:pinned` the table reads 80, which is still not fewer than 80. Without `#rim` as well it reads 79. Whether R-5 reaches these three is the orchestrator's ruling to make. The stated cause of the RED ("RULINGS-6's arithmetic … did not count four names") leaves it out.

### 7. MEASURE-7 says no site passes GlassDock's `run`; its own grep shows one (minor)

"No site line was found for `GlassDock`'s `run`" (MEASURE-7, the budget). `logs/m7-appgrep.txt` reads "GlassDock run: 1 in the apps": atlas (lt-integ) `src/charts/frame/PlateDock.vue:298` passes `run="plain"`. Glass's own `ControlsDock.vue` passes it as well. `run` is cited, so the count is unchanged, but the statement is wrong.

### 8. G-2 and G-10 GREEN cover fewer cells than RU-49 wrote, and the loss is the harness's (minor)

21 scenarios judge nothing because the harness's controls cells mount `ControlsDock collapse="closed"`, and that is now an attribute the preset overrides. G-10 reads 18 of MEASURE-6's 26 scenarios. G-2 reads 56 of 69.

The step-2 grep found no site passing `collapse` to `ControlsDock` ("0 in the apps"). The three sites the cells model keep `GlassDock collapse="closed"` and still fold at 1440, which is what MEASURE-7's own message to fourier says. Their 1440 folds (the corner anchors, `te-parent`, `be`, `bs`) went unjudged because the cells mount the wrong component, not because the product lost the behaviour. MEASURE-7 discloses the loss; the GREEN on G-2 and G-10 does not carry it.

### 9. Two witnesses the ready list names are missing from the red list (minor)

- **G-4.** g4-ghost bites in neither engine (MEASURE-7's table), so the seat-set clause that a removed control is hidden is unwitnessed. WebKit's 43/43 stands without it. The NOT READY list names only the fade.
- **G-11.** The ready list asks for "the rest clause in both". WebKit's rest clause was not run ("no cost cell in WebKit"), and the red list does not say so.

### 10. The budget's lines outside the directory leave out RU-62's overlay edits (minor)

RU-62 (`ec71b3cd4`) adds 4 lines to `src/components/dialog/ModalOverlay.vue`: `inheritAttrs: false`, and `$attrs` moved onto the scrim. Any attribute a site passed to `ModalOverlay` now lands on the scrim. The commit also edits `DialogContent.vue` and `SheetContent.vue`. The table reports `participation.ts` +7 and Tooltip +0 only. The ruling named those two files, but these lines are the same cure's.

### 11. The owner strips: labels and frames that mislead (minor)

- **`strip-hover3-7` (Q18).** The ruling (RU-56, C6-M3) asks for candidates at 1.1, 1.2 and 1.3. The strip shows 1:1, 1.19 / 1.14 and 1.39 to 1.45. The "near" frame shows two current pages, and the build's own 10 % (1.25) is not among the three. The default "middle" reads 1.14 to 1.20, under the 1.2 the gate holds until the owner picks.
- **`strip-glyph3-7` (Q17).**
  - In the "sized from the words" row the theme toggle stays at 36 px beside a 27.9 px Find glyph.
  - In row 4 each glyph touches its word ("⌂Home", "●Mark"), and grey dots stand in for pictures.
  - 21 against 24 px is not shown (admitted).
  - "at sized from" in the labels is a typo.
- **`strip-phone-7` (Q13).** The pressed seat is the worded Select that already reads "Reports", not an icon seat. On the 700 ms hold Chromium opens the menu and WebKit does nothing. The frame does not show the case Q13 asks about.
- **`strip-legend-7` (Q14).**
  - The middle label says "the dock open over the legend". On this build the dock pushes the legend about 36 px left and covers 0 px of it.
  - In the folded frame atlas's folded face glyph (sliders, about 11 px) sits beside the 26 px Table glyph in one dock. RU-58 kept the folded faces' own `h-4 w-4` (`6269ed6ad`).
- **`strip-fold-7`.** The face glyph is about 16 px in a 52 px plate, after a run of 36 px glyphs.
- **`strip-seatset-7`.** The fill that comes in on the centre seat is most likely the hover of a pointer `openDock` left over the dock's centre, not a selection. It appears 130 ms after the add in Chromium and 280 ms in WebKit. The label does not say a pointer rests on the dock. This one is an inference from `harness/m7/owner7.mjs:111-112`.
- **`strip-inflow-7`.** Each frame is a whole downscaled viewport in which the dock is about 12 px tall. The cover the owner is asked to judge needs zooming to see.

## Dropped on the second reading

- **"G-6's g6c is a quiet restatement."** Dropped: it removes the seat's own declared scale and nothing else, and both plants bite through it.
- **"G-16's closure misses re-exports."** Dropped: the tip's `dock.js` has no `export … from`.
- **"The 75 % reversal is over its bound."** Dropped: RU-37 judges in rows, and it passes there.
- **"The pass ran under a SIGSTOP."** Dropped: the battery read 88 to 99 % on the charger, below no threshold.
- **"G-7's plant shows no judge line, so it did not bite."** Dropped: the raw readings flip `contextIsThisDock` in both engines.
- **"The swap strip's WebKit 30 % frame is a mess."** Kept only as an owner-view note. Both faces show faintly at once in one held frame, which is the crossfade, and v11.0.1's frames overlap more.

## What the owner would see

The open docks read as glass in both engines. Words and glyphs are clear, the current page's fill shows in light and dark, and the fold and the swap change over the seven held points with no one-frame jump, though WebKit's swap at 30 % shows both faces at once. The Q10 ladder cannot answer its question: every "folded" frame is the open dock, the "v11.0.2" row is level 1, and the shipped level 0.4 is a near-solid brown slab in dark while in light it stands off the page less than today's dock does. He would also notice:
- the folded face's small glyph beside 26 to 36 px seat glyphs;
- avatar seats at about two thirds of the icons' size;
- a 36 px sun beside a 28 px magnifier in the Q17 row;
- in-flow frames where the dock is a few pixels tall.
