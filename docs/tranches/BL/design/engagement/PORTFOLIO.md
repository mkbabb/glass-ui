# D5 · round 0 · the engagement register portfolio

| field | value |
|---|---|
| seat | D5 round-zero portfolio. Design loop D5 covers the engagement register component-wide: what "engaged" means for every glass-ui component, the rung beyond hover, the commit, momentum for all components (hallmark 6), and the idle rung (F-54 remainder; W-J.2) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | measured at `476a0cd6` in a scratch worktree (the checkout moved from `70a128b5` during the run through docs-only commits). `git diff --stat v10.1.0 HEAD -- src` prints nothing: `src/` is the published 10.1.0 bytes, the same bytes W-J.2 measured at `7f92584c` |
| inputs | `CHARTER.md:50-89` (the design loop). `audit/PROMPT-RECAP-SEED.md:11-39` (E-1, E-2, D-1..D-4, P-1, P-3). `waves/W-J.2.md` (whole; §2 readings `:30-47`, §3.1 entry gate `:50-61`, §3.2 fixed rows `:63-72`). `audit/REGISTRY.md:1264-1274` (F-54). `PLAN.md:241-259` (§4) and `:379-381` (§6). `design/{tile,dock,material,structure}/PORTFOLIO.md` and `REGISTRY.md` as pattern; `design/tile/harness/t6-engagement.mjs` and `measure.mjs:395-455` (the commit bar, H-4). `src/composables/motion/engage/engageLadder.ts` and `engageEnvelopes.ts` (whole). `src/styles/tokens/motion-registers.css` (whole). `tests/styles/engage-ladder.test.ts` (whole). `slider/Slider.vue:81-111,265-312`, `slider/styles.css:420-445`, `dialog/ModalOverlay.vue:55-77`, `styles/glass/focus-veil.css:145-172`, `styles/glass/grasp.css:1-40`, `styles/utilities/base.css:240-340`, `styles/glass/glass-capsule.css:118-139`, `styles/glass/glass-chip.css:27-57`, `styles/glass/material.css:255-285`, `composables/motion/spring/useLiquidPress.ts:1-200`, `dock/composables/useDockHold.ts:1-90`, `composables/dom/useDragVelocity.ts:1-50`. Routed rows: `W-B.4.md:23` (L05a-16), `W-B.2.md:64` (UIA-F-84), `W-H.3.md:46` (S6), `W-I.3.md:55-66`, `W-F.6.md` (the compositor-only bound), `BI/waves/BI.W-ENGAGE-AFFORD.md:115-130` (T1 GROW), `IOS27-MICRO/CHARTER.md:25-55` (hallmarks), `audit/round-1/L05b.md:31`, `audit/round-2/R2-04.md:39` |
| instruments | A scratch probe app (`r0/probe/App.vue`, eleven scenes) bundled against the worktree's `src` through `@glass` (`r0/probe/build.mjs`, the band-I build pattern). Probes: `census.mjs` (E-1), `battery.mjs` (E-2, E-3, E-4, E-6), `e5.mjs` (E-5), `e3m.mjs` (E-3's phone arm), `supports.mjs`. Playwright 1.61 from `glass-ui/node_modules`, headless Chromium 149.0.7827.55 and Playwright WebKit 26.5. Real Safari: **UNMEASURED (owner's safaridriver checkbox)**. Every cell carries the 1/5/15-minute load average; other seats ran browsers throughout (load 28.9-48.7). Every probe has a `--plant` arm that injects a fixture satisfying its witness. All output: `r0/logs/r0.log` |
| tools | the owner withholds Fable (`CHARTER.md:3-5`), so this seat is Opus; the verdict comes from the codebase, the probes and the critiques |
| deliverable | Five orthogonal families (D5-A..D5-E), three routes considered and not minted, and a witness battery E-1..E-8 whose born-RED rows are RED at HEAD with a planted PASS in both engines where the engine can be driven. Each family has its charter, a code sketch of its load-bearing mechanism, its answer for passive components, engine support, the HEAD reading it leans on, cost, consumer impact, known risks, pass-1 questions and its own born-RED witness. This document picks no winner |

## 0 · The problem

D-2 says "every component always displays engagement" (`PROMPT-RECAP-SEED.md:27`). The library has the vocabulary for it and almost nothing that speaks it. `engageLadder.ts` names five rungs (rest, hover, press, engaged, modal) and binds each to a spring row and an envelope row (`:133-211`); `engageEnvelopes.ts` owns the light clocks (`:58-91`); `motion-registers.css:180-187` mirrors them as `--engage-*` tokens. The components adopted the press rung in places and the engaged rung in one (the slider), and the family that owns the rest was never built (F-54, `audit/REGISTRY.md:1264-1274`).

Five readings from HEAD (§1 has the numbers):

1. **The census reads 17 of 55 with a rung** (`engage-ladder.test.ts:123-135`, re-run here), and the census itself is unsound in both directions: it counts prose in comments, misses presses written by script, and misses presses that live in shared recipes outside the component's directory.
2. **`data-engaged` has two writers with two meanings.** `Slider.vue:289,307` write it while the pointer holds the thumb; `ModalOverlay.vue:74` writes it bare, meaning "this veil is rendered". Both land on `.glass-focus-veil`, and `focus-veil.css:153,160` cannot tell them apart.
3. **T1 GROW was specified and never built** (`BI.W-ENGAGE-AFFORD.md:115-130`; 0 hits for `engage-grow`). The slider held or focused measures ×1.000 in both engines.
4. **Hallmark 6 (momentum for all components) has no shared artefact** (0 hits for `--impulse`, `useLiquidSpine`, `--overpull`), but release velocity is carried in four places, each with its own code (§2.2). The slider, the exemplar, drops its velocity at release: 0.00 px of travel after a fling.
5. **The denominator.** The census reads every directory, so `separator`, `skeleton`, `status-dot` and `aurora` count as rungless beside `accordion`. The test's `describe` says "every interactive component" (`:130`) while its assertion says every directory (`:134-135`). The register has to say what engagement is for a component nobody presses.

**Scope boundaries** (W-J.2 §1, `:26`): the dock hallmarks 1, 2, 5 and OWED-3 are W-I.1's and W-I.6's; the hover guard is W-I.3's; the tile's own commit is W-J.1's (D4), which this loop's commit bar generalizes; spring physics and presets are W-F.1's. D5 decides the rung per class, its look and motion, its PRM arm, the passive components' engagement, and the modality split (`W-J.2.md:74-76`).

**Standing law every family is held to:** E-1 clean breaks, no aliases (the veil's presence meaning leaves `data-engaged` with no fallback reader); E-2 no masking fallback; D-1 inertia, weight and bounce in all motion; D-2 engagement everywhere; D-3 best iOS 27; D-4 both engines banked, Playwright WebKit is not Safari; P-1 KISS; P-3 one source of record (the class declaration, the ladder, the envelope table and the spring table each stated once); E-7 two sites or exported; W-J.2 §3.2 item 6: every rung rides the one spring authority and the envelope table, with no duration or scale literal per component.

## 1 · Baseline at HEAD (measured here)

### 1.1 The witness battery

W-J.2 §3.1 item 1 names six starting points (`W-J.2.md:52-58`). Each is a witness here, plus the two executable rows W-J.2 already carries. The bounds are fixed at round 0; pass 1's agglomeration fixes the checklist (`CHARTER.md:82`).

| id | starting point | property that must hold (the pass bound) | HEAD reading | plant (the witness can go green) | probe |
|---|---|---|---|---|---|
| E-1 | the census, its denominator re-stated (§3.2 item 1) | Every component directory is declared into exactly one register class in one source of record; every class names its rung; every directory's rung is present by the class's own test (behaviour, not bytes); comment lines never count. Bound: 0 unclassed directories, 0 classes without a rung, 0 directories failing their class test | **RED.** No class declaration exists. The shipped detector reads 17 with a rung, 38 rungless; with comments stripped, 15 and 40 | none needed: the bound is a declaration plus a runtime read; pass 1 builds it (H-6) | `census.mjs` |
| E-2 | D4's T-6 commit bar (H-4), generalized from the tile to every interactive component | Per interactive class exemplar, sampled every frame for 800 ms after the commit: a pop that peaks ≥ 0.015 above its settle and bounces ≥ 0.002 below it, or a body that travels ≥ 4 px and overshoots its landing by ≥ 0.5 px (`tile/harness/measure.mjs:403`). Three commits each gate: keyboard, programmatic with focus parked outside, pointer release. Tab entry pops nothing (scale range < 0.002, body < 1 px) | **RED.** Commit cells: Chromium 2 of 24 (SegmentedTabs keyboard and pointer), Playwright WebKit 2 of 22 measured plus 2 page crashes. Tab entry 8 of 8 Chromium, 5 of 5 WebKit recorded | Chromium 32 of 32, Playwright WebKit 24 of 24 (a WAAPI `transform` pop on the commit) | `battery.mjs --only E-2` |
| E-3 | the slider probe (T1 GROW) and L05a-16's mobile expansion | The slider's root, pointer-held 450 ms and keyboard-focused, reads ≥ ×1.03 of rest, sustained; light and dark, both engines. Phone arm: touch-held on a 390×844 coarse viewport, ≥ ×1.03 | **RED.** ×1.000 in all 4 desk cells (2 `[data-engaged]` nodes present, the veil and the loupe) and both phone cells | ×1.060 in all 6 | `battery.mjs --only E-3`, `e3m.mjs` |
| E-4 | hallmark 6: a released drag or fling carries its velocity into the settle | A fling (three 40 px moves, release) on the slider thumb, read every frame for 600 ms: the thumb travels ≥ 4 px past its release point before it settles | **RED.** 0.00 px in both engines | 13.89 px Chromium, 12.84 px WebKit | `battery.mjs --only E-4` |
| E-5 | the touch rows W-I.3 records | Under `(hover: none)` and `(pointer: coarse)`, a held touch answers through a press rung: \|Δscale\| ≥ 0.01, or a property that changes under the touch and not under hover alone | **RED** in Chromium, 6 of 7: the accordion trigger's only answer to a held touch is its hover background, leaked by sticky touch hover (Δscale 0.000, press-only set empty). Playwright WebKit: **UNMEASURED** (no held-touch input) | 7 of 7 with `.disclosure-trigger:active { scale: .96 }` | `e5.mjs` |
| E-6 | S6's breathing preset under W-F.6's compositor-only bound | An idle rung is present on the S6 subject (≥ 1 running animation at rest) and it is compositor-only (0 layouts/s over 3 s, Chromium CDP) | **RED** (absent): 0 running animations; layouts/s 0.0 | Chromium 1 animation, 0.0 layouts/s; WebKit 1 animation, layouts n/a | `battery.mjs --only E-6` |
| E-7 | one writer per attribute (W-J.2 §3.2 item 2, G2) | `git grep -l 'data-engaged' -- 'src/**/*.vue' \| wc -l` ≤ 1, and that one file is the register's owner | **RED**: 2 (`dialog/ModalOverlay.vue`, `slider/Slider.vue`) | n/a (static) | `git grep` |
| E-8 | one clock authority (W-J.2 §3.2 item 6, G6) | `engage-ladder.test.ts`'s mirror arm green, and no rung spells a duration or scale literal | **GREEN, a hold line** (25 passed, 1 expected fail). Not born RED, like W-J.2's G6 | n/a | `npx vitest run tests/styles/engage-ladder.test.ts` |

What the battery does not yet have (pass-1 harness rows, §6 and REGISTRY §3): a clean fixture every witness passes plus a planted FAIL per witness (the D4 H2 self-test pattern; here HEAD is the FAIL arm and a plant is the PASS arm, which proves each witness can go green but not that it catches every defect class); the PRM arm W-J.2's former G5 named (`PLAN.md:251`), not measured at round 0; E-6's bound, which a trivial opacity loop passes (§1.3 item 6).

### 1.2 The measurements

**E-1, the census** (`census.mjs <wt>`, reads files only):

| read | result |
|---|---|
| directories (the test's denominator, `engage-ladder.test.ts:95-97`) | 55 |
| the shipped detector, raw (`:123-124`) | 17 with a rung, 38 rungless: accordion alert aurora avatar badge blob chip collapsible command constellation dark-mode-toggle data-table deck expandable-container fading-scroll fourier-field handmark infinite-scroll input label labeled-field metric music-staff number-field popover progress scroll-progress-rim separator sheet skeleton status-dot surface table textarea timeline toast tooltip typewriter. Identical to W-J.2's list (`W-J.2.md:42`) |
| comments stripped | 15 and 40. `carousel` and `pager-dots` carry their only match in a doc comment, `/** v-model:active — …` (`Carousel.vue:23`, `PagerDots.vue:85`): the lookahead admits the space after `:active`, so the false-positive guard the test documents (`:117-121`) leaks |
| rungless with a press written by script | `dark-mode-toggle`, `timeline`: both compose `useLiquidPress`, which stamps `data-press-armed` and becomes the scale writer on mount (`useLiquidPress.ts:190-195`) |
| rungless with a press in a shared recipe outside the directory | `chip`: composes `glass-capsule-hover` (`chipVariants.ts:6`), whose press is `glass-capsule.css:128-131`. The detector reads only the directory's bytes |
| rungless with an interactivity signal (a crude read: a handler, `v-model`, a role, `tabindex`, a native control, reka) | 27 |
| rungless with none | 11: alert aurora badge infinite-scroll labeled-field metric scroll-progress-rim skeleton status-dot table typewriter |
| rungless that paint `:hover` (hover as their only answer) | 7: blob dark-mode-toggle data-table expandable-container sheet timeline toast |

**E-2, the commit bar** (`battery.mjs`; Chromium median frame 8.3 ms, Playwright WebKit 10.0 ms; load 28.9-43.0):

| scene | what the commit does (Chromium; WebKit agrees within 0.01 unless noted) | keyboard | programmatic | pointer |
|---|---|---|---|---|
| Switch | the thumb glides 20.00 px and lands dead (overshoot 0.00 px); the root never scales | FAIL | FAIL | FAIL |
| Checkbox | the mark appears; no scale moves (1.000 throughout) | FAIL | FAIL | FAIL |
| RadioGroup | the dot appears; no scale moves | FAIL | FAIL | FAIL |
| SegmentedTabs | the indicator glides 78.31 px and overshoots 1.73 px (keyboard) and 1.76 px (pointer); the programmatic commit glides the same 78.31 px with overshoot 0.00 | **PASS** | FAIL | **PASS** |
| ToggleGroupItem | a colour change; scale holds at 1.007 (1.023 after a pointer, the hover lift); WebKit's pointer cell closes the page | FAIL | FAIL | FAIL (WebKit: crash) |
| Chip (selectable) | the flood: scale rises to 1.083 and settles at 1.068 with no bounce (`glass-chip.css:27-34`, `--ease-cartoon-punch`) | FAIL | FAIL | FAIL |
| Accordion trigger | nothing on the trigger (1.000); the panel opens below. WebKit's pointer cell closes the page, 2 of 2 | FAIL | FAIL | FAIL (WebKit: crash) |
| Button | the press releases to 0.997 (keyboard) or to the hover lift 1.012 (pointer); no pop | FAIL | FAIL | FAIL |

Tab entry: 8 of 8 quiet in Chromium, 5 of 5 recorded in WebKit. The two passing cells show the witness passes on shipped code, not only on a plant; the tabs' programmatic cell shows the same component taking a different path for a model change than for a gesture.

**E-3 and E-3m, the slider** (`battery.mjs --only E-3`, `e3m.mjs`): rest 360.0 px. Pointer-held ×1.000 and keyboard-focused ×1.000 in Chromium and WebKit, light and dark. On the phone viewport the touch hold sets `:active` and mounts the loupe (120×52, opacity 1) and the veil (2 `[data-engaged]` nodes), and the root stays ×1.000. With `.glass-slider:where(:active, :has(:focus-visible)) { scale: 1.06 }` every cell reads ×1.060. On the 390 px viewport that grow takes the 360 px track to 381.6 px, past the 358 px a 16 px gutter leaves (§2.4).

**E-4, momentum:** thumb at release 271.2 px, 0.00 px of travel after release in 600 ms, both engines. Reka writes the value under the pointer and stops; `useDragVelocity` measures the drag velocity for the smear and tears its rAF down at `pointerup` (`useDragVelocity.ts:12-16`), so nothing carries it past the release.

**E-5, touch** (`e5.mjs`, Chromium): Switch −0.040, Checkbox −0.040, Tabs −0.030, ToggleGroupItem −0.030, Chip −0.032, Button +0.028 (the reciprocal squish widens the X axis), each with `:active` true. Accordion trigger: Δscale 0.000; the one property that moves is `background-color`, which hover alone also moves.

**E-6, idle:** the Switch at rest runs 0 animations and 0.0 layouts/s. The only idle loops in the library are the ambient ones W-F.6 censuses (music-staff's 52 SVG animations, the track flow, the configurator shimmer; `W-F.6.md:17-21`).

**Engine support** (`supports.mjs`): `linear()` easing, `:has()`, `@property`, `anchor-name` and `position-anchor`, the `popover` attribute, `transition-behavior: allow-discrete`, `animation-timeline: scroll()`, `@starting-style`, WAAPI `composite: "add"` and `sibling-index()` parse in both engines. `interpolate-size` and `if()` parse in Chromium only.

### 1.3 Corrections and candidate rows

1. **Hallmark 6 is not zero; it is fragmented.** R2-04-17 and W-J.2 read 0 artefacts by three names. Release velocity is carried today by the Sheet's detent projection (`sheet/detents/projection.ts:5`), the sortable list's release spring (`sortable-list/motion.ts:13,78`), SegmentedTabs' drag morph fling (`tabs/composables/useTabDragMorph.ts:24`) and the platform scroll-snap of Carousel and Deck (`carousel/useCarousel.ts:7`, `deck/composables/useDeckSnap.ts:7`), each with its own code. The exemplar W-J.2 names, the slider, is one of the surfaces that drops it. The defect is four owners and no shared rule (P-3), plus the surfaces with none.
2. **Three partial engage primitives already exist**, none named as one: `useDockHold` (the hand: a pointer or touch hold, instant-on, window-scoped release, `useDockHold.ts:1-60`), `useLiquidPress` (the press: an interruptible spring on scale and `--press-t`, `useLiquidPress.ts:1-24`) and `useDragVelocity` (the velocity: one CSS var in a drag window, `useDragVelocity.ts:1-30`). The slider composes the first and third; Button, DarkModeToggle, Timeline and DockControl compose the second.
3. **The census detector leaks in both directions** (§1.2): two false positives from prose, three false negatives (two script presses, one shared recipe). Any census that reads bytes for behaviour will keep leaking; E-1's bound reads a declaration and a runtime test instead.
4. **The ladder and the S6 fold disagree.** The REST rung rules "a control never carries a decorative idle animation" and puts the one legal idle loop on ambient surfaces (`engageLadder.ts:143-151`). W-H.3 folds "the breathing preset" of the glass track, a control, into this loop (`W-H.3.md:46`). One of them yields; that is owner question Q-2.
5. **T1 GROW and the ladder's engaged rung are two readings.** T1 is an in-place 1.06 scale on `:active` and focus (`BI.W-ENGAGE-AFFORD.md:115-130`). The ladder's engaged rung is "the control promoted out of its own footprint ... a temporary overlay of itself while its rest footprint stays visible beneath", a singleton, with the world receding at rank 6 (`engageLadder.ts:182-193`). The slider's loupe and veil are the second reading; T1 is the first. Q-3.
6. **E-6 as stated is vacuous.** The plant that passes it is `opacity: .9` on a 4 s loop. "Breathing" needs a stated form (channel, period, amplitude, its PRM arm) before its witness means anything. Pass-1 harness row H-5.
7. **Playwright WebKit closes the page on pointer entry over the accordion trigger** (2 of 2), as it does over ToggleGroupItem (D4 PF-1, `tile/REGISTRY.md:214`). Candidate extension of PF-1: the disclosure trigger's hover register is a second trigger.
8. **Headless touch facts** (instrument, not product): a raw CDP `touchStart` hold never sets `:active` in Chromium (0 of 7 scenes, and a planted `:active` rule stayed RED); a synthesized long-tap gesture sets `:active` and a sticky `:hover` together. A touch witness must subtract hover, as `e5.mjs` does.

### 1.4 The code in play

- The register: `composables/motion/engage/engageLadder.ts:52-227` (five rungs, channel budget 2, `HOVER_GEOMETRY_BUDGET` 1.08, `LADDER_EXIT_LAW`), `engageEnvelopes.ts:17-107` (four roles; attack band 40-60 ms; acknowledge window 150 ms), `motion-registers.css:150-187` (the mirror).
- The shared press recipes: `.tap-squish` (`utilities/base.css:300-340`, press to `--scale-press` 0.96, PRM retires scale), `.interactive-item:active` (`base.css:253-259`, 0.97), `.glass-capsule-hover` (`glass-capsule.css:122-139`, hover 1.015, press 0.97), the plate gleam `.glass-*:active::before` (`material.css:266-284`).
- The script press: `useLiquidPress` (`composables/motion/spring/useLiquidPress.ts:141`), `data-press-armed` handing scale from CSS to the spring on mount.
- The hold and the engaged rung: `useDockHold` (`dock/composables/useDockHold.ts:86`) → `isHeld` → `Slider.vue:269` (`data-held`), `:289,307` (`data-engaged` on the teleported veil and loupe); the grasp register `glass/grasp.css` (a material answer to `[data-held]`); the veil `glass/focus-veil.css:145-172`; the loupe `slider/styles.css:420-445`.
- The second veil writer: `dialog/ModalOverlay.vue:74`.
- The velocity bridge: `composables/dom/useDragVelocity.ts` (`--atom-drag-v`, the slider only, `Slider.vue` and `_shared/useMotionAxis.ts`).
- The commit today: Chip's flood (`glass-chip.css:27-57`), SegmentedTabs' indicator (`useSelectionIndicator`, the one travelling-indicator writer, `tile/REGISTRY.md:331`), Switch's thumb glide.

### 1.5 Consumer census (read-only)

`grep` over authored sources (`*.vue`, `*.ts`, `*.css`; `node_modules`, `dist`, `.git` and value.js's `bench/` bundles excluded):

| repo | reads | note |
|---|---|---|
| value.js | `useLiquidPress` ×2 (`demo/palettes/PaletteInspector.vue`) | its 4 `data-engaged` and 75 `glass-focus-veil` hits are one bundled stylesheet, `bench/paired/sheets/keyframes-js-index.css`, not authored reads |
| keyframes.js | `useLiquidPress` ×3 (`demo/components/instrument/transport/TransportDock/usePlayActuation.ts`, `demo/app/dock/MbabbMenu.vue`), `interactive-item` ×1 (`demo/styles/playback-idiom.css`) | |
| fourier-analysis | `interactive-item` ×9, `tap-squish` ×3 (including `.worktrees/` copies) | |
| chicago | `tap-squish` ×3 (`src/TempApp.vue`) | |

No authored consumer reads `data-engaged` or `.glass-focus-veil`, so the E-7 split breaks no consumer read. Renaming or retiring `tap-squish`, `interactive-item` or `useLiquidPress` reaches four consumers; each updates in its own tranche (E-6 law, W-J.2 §7).

## 2 · Facts every family inherits

### 2.1 The vocabulary is fixed; families differ in who speaks it

Every family rides `ENGAGE_LADDER`, `ENGAGE_ENVELOPES` and `SPRING_PRESETS` and mints no figure (W-J.2 §3.2 item 6; `engageLadder.ts:11-18`). A family that needs a new clock adds a row to one of the two tables. The families differ in the unit that carries a rung (a declared class, a composable, a scalar, a substrate, a stage) and in where the census reads it.

### 2.2 Velocity has four owners and no rule

§1.3 item 1. Whatever family wins, hallmark 6 lands as one rule with one owner for "a release carries velocity into its settle", and the four local implementations either become its consumers or say why not. A button has no velocity; "momentum for all components" (`IOS27-MICRO/CHARTER.md:42-47`) has to be scoped to the surfaces that are dragged or flung, or re-read as momentum in the rung's own spring (a press released mid-flight carries its velocity, which `useLiquidPress` already does, `useLiquidPress.ts:5-8`). Q-4.

### 2.3 Two engagement meanings share one attribute today

E-7 lands whatever the family: the modal veil keys on the overlay's open state through its own attribute, `data-engaged` means held, and one owner writes it (W-J.2 §3.2 item 2, §7). The families differ in who that owner is.

### 2.4 A grow on a phone runs into the gutter

The 360 px slider held on a 390 px viewport grows to 381.6 px under ×1.06 (§1.2). A full-width control cannot grow in place by a ratio without leaving the 16 px gutter or clipping. An in-place grow needs a pixel cap, or the engaged rung on a phone is a promotion (the ladder's reading, §1.3 item 5), or the grow is along one axis. Each family states which.

### 2.5 The commit is where the library is weakest, and the tabs show it can be done

E-2 fails 22 of 24 commit cells. The one component that passes, SegmentedTabs, passes by a travelling body with overshoot, and only for gestures: its programmatic commit lands dead. A commit that fires from the model, not from the event, is what the programmatic cell asks for, and what D4's C-crit C-1 found missing (`tile/REGISTRY.md:46`).

### 2.6 The common floor (not a differentiator)

PRM (spatial legs retire, the light channel stays; the ladder's PRM arm, `engage-ladder.test.ts` "PRM arm"), forced colors, reduced transparency (the veil is removed, `focus-veil.css:166-174`), coarse pointers (no hover latch, W-I.3), the 44 px touch floor, the singleton law for the engaged rung (`engageLadder.ts:190`), Chromium and Playwright WebKit banked, real Safari UNMEASURED until the owner's checkbox, and W-F.6's compositor-only bound for anything that runs at rest.

## 3 · Axes, and where each family sits

| family | the unit that carries a rung | where the census reads it | passive components | commit (E-2) | momentum (E-4) | writer of `data-engaged` |
|---|---|---|---|---|---|---|
| D5-A the declared class table | a class row + one CSS recipe per class | the table, then a runtime test per class | a declared class with its own rung (or a declared exemption with a reason) | the class recipe, keyed on state attributes | a class property; script for draggable classes | the class recipe's composable for the `held` class |
| D5-B one engage primitive | a composable instance per component | a DEV registry of mounted instances | not engaged by B; they are outside its denominator by construction | a model watcher fires the commit edge | the primitive's release spring | the primitive |
| D5-C the engagement scalar | one registered property, `--engage`, each component maps | a mapping per component, read at runtime | the scalar driven by the pointer field and scroll | a state-keyed CSS animation of the scalar | one script write of release velocity into the scalar's spring | none: C retires the attribute for a scalar |
| D5-D the material carries it | a substrate recipe (control bit, capsule, plate, disclosure) | "composes a registered substrate" | their material answers the pointer field (the ladder's REST text) | the substrate's state recipe | the substrate cannot; banked to the platform and D5-B's rule | the grasp register's host |
| D5-E the engaged stage | one document-level stage the engaged control is promoted into | not a census family; it answers the rung beyond press | not engaged; the stage is for held controls | not addressed | the stage's release | the stage (the one singleton) |

## 4 · The families

### D5-A · The declared class table (a register every component declares into)

**Charter.** The register gains the one thing it lacks: a declaration of what each component is. A table in `composables/motion/engage/` maps every component directory to one class, and each class to the rungs it owes, the channels it moves and a runtime test that proves them. Six classes to start: `pressed` (Button, Chip action), `chosen` (Switch, Checkbox, Radio, Tabs, ToggleGroup, Chip selectable: a commit), `held` (Slider, NumberField scrub, the dock controls: a hold and an engaged rung), `disclosed` (Accordion, Collapsible, Popover trigger: a press and an open), `ambient` (Aurora, Blob, Constellation, FourierField, MusicStaff: engagement is the field's answer to the pointer and an idle loop inside W-F.6's bound), `static` (Separator, Skeleton, Label, StatusDot: engagement is declared as the parent's, with the reason). Each class owns one shared recipe; a component composes its class and states nothing else. The census reads the table: a directory with no row fails, a class with no rung fails, a row whose runtime test fails fails.

**Mechanism.**

```ts
// composables/motion/engage/engageClasses.ts — the one declaration (P-3)
export type EngageClass = "pressed" | "chosen" | "held" | "disclosed" | "ambient" | "static";
export interface EngageClassRow {
  readonly cls: EngageClass;
  readonly rungs: readonly EngageRungName[];            // from ENGAGE_LADDER, never restated
  readonly commit: "pop" | "travel" | null;              // what E-2 reads for this class
  readonly idle: boolean;                                // an idle loop, only under W-F.6's bound
  readonly recipe: `engage-${EngageClass}` | null;       // the one CSS utility the class composes
}
export const ENGAGE_CLASSES: readonly EngageClassRow[] = [ /* six rows */ ];
export const ENGAGE_MEMBERS: Readonly<Record<string, EngageClass>> = {
  accordion: "disclosed", slider: "held", switch: "chosen", separator: "static", aurora: "ambient", /* … all 55 */
};
```

```css
/* styles/utilities/engage.css — one recipe per class, clocks from the two tables */
@utility engage-chosen {
  &[data-state="on"], &[data-state="checked"] { animation: engage-commit var(--spring-press-duration) var(--spring-press); }
  &:not([data-state="on"]):not([data-state="checked"]) { animation: engage-commit-off var(--spring-press-duration) var(--spring-press); }
}
@keyframes engage-commit     { 35% { scale: var(--scale-commit-peak); } 60% { scale: var(--scale-commit-rebound); } }
@keyframes engage-commit-off { 35% { scale: var(--scale-commit-peak); } 60% { scale: var(--scale-commit-rebound); } }
/* two names so every state entry restarts the animation; the peak tokens are rows in the scale register */
```

The census test becomes three assertions over `ENGAGE_MEMBERS`: every directory is a key; every class has ≥ 1 rung beyond rest (or is `static` with a reason string); and a Playwright pass mounts one exemplar per class and runs that class's E-row.

**Passive components.** Declared, not guessed. `static` is a class with a stated answer (engagement is the owning surface's; the atom has no input), which makes the denominator honest instead of pretending a separator can be pressed. `ambient` owes the pointer-field answer and at most one idle loop.

**Engine support.** CSS animations keyed by attribute, `@utility`, both engines. The two-name restart trick is plain CSS.

**HEAD reading it leans on.** The census's own ambiguity (`engage-ladder.test.ts:130` vs `:134`) and the 11 directories with no interactivity signal (§1.2). The shared recipes already exist in four places (§1.4); A consolidates them.

**Cost.** One TS table (55 rows, 6 classes), one CSS file of about six recipes, one class line per component (about 40 components change a class list), the census test rewritten. The four existing press recipes fold into the class recipes: `.tap-squish` and `.interactive-item` retire (E-1, no alias), each consumer updates in its tranche.

**Consumer impact.** `tap-squish` (fourier-analysis ×3, chicago ×3) and `interactive-item` (keyframes.js ×1, fourier-analysis ×9) are renamed to class recipes: a MIGRATION row each, named in W-L.7's packets.

**Known risks.**
- Two sources for one fact: the table says `chosen`, the component's template composes `engage-pressed`. The census must check the composition against the table, or the table drifts.
- A CSS state animation fires on mount for a component that mounts already on. That is a pop nobody asked for (the D4 C-1 class in reverse). Needs `@starting-style` or a mount guard; measure it.
- Classes are a taxonomy, and taxonomies grow. Six may become twelve.
- A does not answer momentum by itself: `held` needs script for velocity, so A is CSS plus one script class.

**Pass-1 questions.** §6.

**Born-RED witness.** *Every directory is declared, and every declaration holds at runtime.* HEAD: no declaration; 38 of 55 rungless by the byte detector, 40 decommented; 0 runtime class tests exist. RED.

### D5-B · One engage primitive (a composable owns the state, the attributes and the velocity)

**Charter.** Engagement is behaviour, so it lives in one composable. `useEngage(host, options)` owns the element's engagement state (`rest → hover → press → held → engaged`, plus a one-shot `commit` edge), writes the only engagement attributes (`data-engaged`, `data-held`, `data-press`, `data-commit`), watches the component's model so a programmatic commit fires the same edge as a gesture, and carries the release velocity into the settle spring. It merges the three partial primitives (§1.3 item 2): `useDockHold`'s hand, `useLiquidPress`'s press spring, `useDragVelocity`'s velocity. CSS reads the attributes. The census is a runtime registry: a component is engaged if and only if it mounts the primitive.

**Mechanism.**

```ts
// composables/motion/engage/useEngage.ts — the one writer of the engagement attributes (E-7)
export function useEngage(host: () => HTMLElement | null, o: {
  model?: MaybeRefOrGetter<unknown>;          // a commit is a MODEL change, whoever made it
  drag?: "x" | "y" | null;                    // carry release velocity (hallmark 6)
  engaged?: "promote" | null;                 // the ladder's engaged rung, singleton
}) {
  const state = shallowRef<"rest" | "press" | "held" | "engaged">("rest");
  const hand = useHand(host);                               // useDockHold's acquire, dock-free
  const press = useLiquidPress({ el: host });                // the press spring, interruptible
  const vel = o.drag ? useDragVelocity({ host, axis: o.drag }) : null;
  watch(() => toValue(o.model), () => fireCommit(host()));   // keyboard, pointer and programmatic alike
  watch(hand.isHeld, (h) => stamp(host(), "data-held", h));
  onRelease(() => vel && settleFrom(vel.releaseVelocity()));  // velocity → the settle spring's v0
  if (import.meta.env.DEV) ENGAGE_REGISTRY.add(host);         // the census reads this
  return { state, pressStyle: press.pressStyle };
}
```

The commit edge is `data-commit` set for one frame and cleared on `animationend`; the CSS pop keys on it. The veil and loupe read `data-engaged` from the primitive; ModalOverlay stops writing it and keys its veil on `data-state="open"`.

**Passive components.** B does not engage them. A component that mounts no primitive is outside B's denominator by construction, and B must say whether that is a declared exemption (then B needs A's table for the exemption list) or the ladder's REST rung (material answers the pointer; no census row). B's honest answer at round 0: the census counts primitives, and passive components need a separate ruling (Q-1).

**Engine support.** Plain script, WAAPI and CSS; nothing engine-gated. The hold's native `pointerdown` and `touchstart` path is already measured on both engines through the slider.

**HEAD reading it leans on.** SegmentedTabs' programmatic commit lands dead while its gestures overshoot (§1.2): an event-driven commit misses the model path. The slider's velocity dies at `pointerup` (`useDragVelocity.ts:12-16`). Three primitives already exist with overlapping jobs.

**Cost.** One composable (merging three), about 25 interactive adopters (the chosen, pressed, held and disclosed components), a DEV registry, the census rewritten as a mount test. `useDockHold` moves out of `dock/` (it already serves the slider) or becomes the primitive's hand. `useLiquidPress` and `useDragVelocity` become internals or stay as the primitive's parts; each is exported today, so their fate is a clean-break row.

**Consumer impact.** `useLiquidPress` (value.js ×2, keyframes.js ×3) either stays exported as a leaf or is replaced by `useEngage` with a MIGRATION row. No consumer reads `data-engaged`.

**Known risks.**
- Script-owned state is absent before hydration and without JS: the press falls back to `.tap-squish`'s `:active` floor, which `useLiquidPress` already documents (`useLiquidPress.ts:19-21`). A commit pop before mount does not exist, which is correct.
- A model watcher fires on initial load if the model arrives async: the same mount-pop risk as A, in script.
- 25 adopters each wire a host getter; the forwarded-root trap (`useDockHold.ts:77-84`) recurs per component.
- The composable can grow into a god module (N-1's "long-running dirs"); the merge must stay three small parts behind one door.

**Born-RED witness.** *One writer, and every commit fires from the model.* E-7 (2 writers today) plus E-2's programmatic column (0 of 8 components commit visibly from the model in Chromium; SegmentedTabs glides 78.31 px with 0.00 overshoot). RED.

### D5-C · The engagement scalar (one registered property, every component maps it)

**Charter.** Engagement is one number. A registered custom property, `--engage` (0 at rest, 1 fully engaged), is driven by CSS from the states that already exist (`:hover` under `(hover: hover)`, `:active`, `:focus-visible`, `[data-held]`, `[data-state]`), transitioned on the ladder's spring through `linear()`, and each component maps the one scalar onto its own channels in one declaration (a slider grows its track, a switch lifts its thumb, a separator thickens a hair). A second registered property, `--commit`, is a state-keyed impulse (0 → 1 → 0 on every state entry) that gives every component its pop from one keyframe. No component writes a figure: the mapping multiplies the scalar by a ladder budget. The census reads whether each component maps the scalar, at runtime: set `--engage: 1` on its root and read that something moved.

**Mechanism.**

```css
/* styles/tokens/engage-scalar.css */
@property --engage { syntax: "<number>"; inherits: true; initial-value: 0; }
@property --commit { syntax: "<number>"; inherits: true; initial-value: 0; }

:where([data-engage]) {
  transition: --engage var(--spring-press-duration) var(--spring-press);  /* linear() spring, overshoot included */
  @media (hover: hover) { &:hover { --engage: 0.35; } }
  &:active, &:has(:focus-visible), &[data-held] { --engage: 1; }
  &[data-state="on"], &[data-state="checked"], &[data-state="open"] { animation: commit-a var(--spring-press-duration) linear; }
  &[data-state="off"], &[data-state="unchecked"], &[data-state="closed"] { animation: commit-b var(--spring-press-duration) linear; }
}
@keyframes commit-a { from { --commit: 1; } to { --commit: 0; } }   /* two names: every entry restarts */
@keyframes commit-b { from { --commit: 1; } to { --commit: 0; } }

/* a component maps; it never states a clock */
.glass-slider { scale: calc(1 + var(--engage) * var(--engage-grow-budget)); }
.switch__thumb { scale: calc(1 + var(--commit) * var(--commit-pop-budget)); }
.separator     { opacity: calc(var(--separator-rest) + var(--engage) * 0.1); }  /* passive: it answers its host's --engage, inherited */
```

Momentum is the one script leg: on release, the velocity measured by `useDragVelocity` is written once as the scalar spring's initial slope (`--engage-v`), and the settle carries it.

**Passive components.** `--engage` inherits. A separator inside an engaged card reads its host's scalar, so a passive atom displays engagement by answering the surface it sits in. That is a concrete answer to "what engagement is for a component nobody presses": it is its container's engagement, visible in the atom. The census row for a passive directory is "maps the inherited scalar".

**Engine support.** `@property` and `linear()` in both engines (§1.2). Transitioning a registered `<number>` and animating it in `@keyframes` are the shipped `--press-t` and specular patterns (`property-regs-specular.css`). `if()` is Chromium only, so no mapping may use it.

**HEAD reading it leans on.** The press already works this way for one leg: `useLiquidPress` writes `--press-t` and the surface CSS reads it (`useLiquidPress.ts:9-13`); the specular gleam transitions registered positions (`material.css:266-284`). C generalizes a pattern the tree has.

**Cost.** Two registered properties, one state block, one mapping line per component (about 50), a ladder budget token per channel kind, one script write for momentum. No composable per component.

**Consumer impact.** `tap-squish` and `interactive-item` retire into `[data-engage]` (the same four consumers as A). A consumer can map `--engage` on its own surfaces, which is a new public token and must be exported with a stated contract.

**Known risks.**
- Custom-property animation on an inherited property invalidates style on the whole subtree every frame. `--engage` on a card with 200 descendants is a style-recalc cost W-F.6 would catch. `inherits: false` fixes the cost and kills the passive answer; pass 1 measures both.
- The `--commit` keyframe fires on mount for components that mount in a state (same risk as A).
- A scalar compresses the ladder: hover, press, held and engaged become four values of one number, and the ladder's channel budget (two channels per rung, `engageLadder.ts:96`) is per rung, not per scalar. A mapping that moves geometry at 0.35 and blur at 1 is two rungs in one line; the budget check has to read the mapping.
- `:has(:focus-visible)` on every `[data-engage]` host is a broad selector; measure its invalidation cost.

**Born-RED witness.** *Setting `--engage: 1` on each component's root moves its paint or geometry.* HEAD: the property does not exist; 0 components map it. The slider exemplar (E-3) reads ×1.000. RED.

### D5-D · The material carries engagement (the substrate answers; components inherit by composing)

**Charter.** Components never state a rung. The library already renders every interactive surface through a handful of substrates: the control bit (Switch, Checkbox, Radio), the capsule (Button, Chip, Tabs, ToggleGroup), the control surface, the plate rungs (Card, Command, Toast, Tooltip, Popover) and the disclosure trigger. Each substrate carries the full ladder for its kind in its own recipe: press, commit, held, the light answer, the PRM arm. A component is engaged because its material is. The census becomes "every component directory composes a registered substrate, and every substrate passes the battery", which moves the count from 55 components to about 6 substrates. Passive components are engaged the way the REST rung already says: the material answers the pointer field (`engageLadder.ts:143-151`).

**Mechanism.**

```css
/* styles/glass/control-bit.css — the substrate owns its whole ladder */
.control-bit {
  scale: 1;
  transition: scale var(--spring-press-duration) var(--spring-press), /* light legs on --engage-control-engage-* */;
  &:active { scale: var(--scale-press); }
  &[data-state="checked"] { animation: bit-commit-a var(--spring-panel-duration) linear; }   /* the panel row: intrinsic rebound */
  &[data-state="unchecked"] { animation: bit-commit-b var(--spring-panel-duration) linear; }
  @media (prefers-reduced-motion: reduce) { &, &:active { scale: 1; animation: none; } }
}
/* the registry the census reads: one row per substrate */
/* engage-substrates.ts: { "control-bit": ["switch","checkbox","radio-group"], "capsule": [...], "plate": [...], "disclosure": [...] } */
```

The veil's two meanings split at the substrates: the grasp register (`grasp.css`) already keys the material on `[data-held]` from a live pointer only; the modal scrim is the plate rung's `open` state.

**Passive components.** Their plate answers the pointer field (the moving specular, `material.css:255-284`) and that is their engagement. A skeleton or separator with no plate is `static` and declared so.

**Engine support.** Plain CSS on classes the tree ships. Both engines.

**HEAD reading it leans on.** The substrates already carry the press: `.tap-squish` on the control bit (Switch and Checkbox press to 0.960 under touch, §1.2), `glass-capsule-hover` (Chip, 0.97), `.glass-*:active::before` on every plate. And the census's false negative for Chip (§1.3 item 3) is exactly a rung that lives in the material.

**Cost.** About six substrate recipes extended with commit and held arms; a registry of 55 directories onto about six substrates; components that paint their own surface (the accordion trigger, the data-table row, the timeline) move onto a substrate. Smallest per-component change of the five.

**Consumer impact.** Consumers composing a library surface inherit engagement with no change. Consumers that paint their own tiles (the D4 finding, `tile/PORTFOLIO.md` T-7) get nothing until they compose a substrate.

**Known risks.**
- The substrate cannot see the model: a commit keyed on `[data-state]` works for reka-driven components, but Button has no state and a Chip `action` has no commit. D covers state-bearing components only.
- Momentum is out of reach: CSS cannot carry a release velocity. D banks hallmark 6 to the platform (scroll-snap surfaces) and to a script rule it does not own. The route is incomplete on E-4 by construction.
- Substrates are shared: tuning the capsule's commit for Tabs changes Chip and Button. Per-component character (the Chip's flood, the tabs' glide) either becomes a substrate variant or is lost.
- One substrate per component is not true today: Switch composes `control-bit` and `tap-squish`; Button composes `glass-capsule`, `tap-squish` and `glass-specular-track`. Consolidation is part of D's cost.

**Born-RED witness.** *Every substrate passes E-2 and E-5 on its own exemplar, and every directory composes one.* HEAD: the control-bit exemplars (Switch, Checkbox, Radio) fail E-2 in all 18 cells across both engines; the disclosure trigger fails E-5 (its touch answer is leaked hover). RED.

### D5-E · The engaged stage (the rung beyond press is one document-level singleton)

**Charter.** The rung beyond hover that nobody has built is the ladder's ENGAGED rung, and the ladder already says what it is: the control "promoted out of its own footprint ... a temporary overlay of itself while its rest footprint stays visible beneath", a singleton, with the world receding at rank 6 (`engageLadder.ts:182-193`). The slider's loupe and veil are that rung built once, by hand, with two teleports (`Slider.vue:277-312`). E makes it one facility: a document-level stage in the top layer (`popover="manual"`), anchored to the engaged control with CSS anchor positioning, holding a projection of the control at its engaged size, with the veil as the stage's own backdrop. At most one control is on the stage at a time (G6). Every held control (Slider, NumberField scrub, the colour spectrum, the dock's grasp) engages by requesting the stage; the stage is the one writer of `data-engaged`; ModalOverlay's veil becomes the dialog's own scrim, not an engagement.

**Mechanism.**

```ts
// composables/motion/engage/engageStage.ts — one per document
const stage = document.createElement("div");
stage.popover = "manual"; stage.className = "engage-stage";            // top layer: no ancestor clips, no backdrop-root trap
export function engage(anchor: HTMLElement, project: (host: HTMLElement) => void) {
  current?.release();                                                      // singleton (G6)
  anchor.style.anchorName = "--engaged"; stage.showPopover(); project(stage);
  anchor.dataset.engaged = "";                                             // the one writer (E-7)
  return { release: (v0 = 0) => settle(stage, v0).then(() => { stage.hidePopover(); delete anchor.dataset.engaged; }) };
}
```

```css
.engage-stage { position-anchor: --engaged; position-area: center; inset: auto;
  transition: scale var(--spring-dock-duration) var(--spring-dock), overlay var(--spring-dock-duration) allow-discrete, display var(--spring-dock-duration) allow-discrete; }
.engage-stage::backdrop { backdrop-filter: blur(var(--glass-blur-floating-radius)); }   /* the veil, one owner */
@starting-style { .engage-stage:popover-open { scale: 1; } }
```

On a phone the stage is where L05a-16's mobile expansion lives: the engaged slider is a full-width projection in the stage, not a grown track in the gutter (§2.4).

**Passive components.** Not addressed: the stage is for controls a hand holds. E is a partial family by design and says so: it answers E-3, E-3m, E-7 and the veil; it leaves E-1, E-2 and E-5 to whichever census family it pairs with. That makes it a candidate for cross-pollination, not a standalone winner, and it is minted because no other family has a construction for the rung the ladder already defines.

**Engine support.** `popover`, `anchor-name`, `position-anchor`, `transition-behavior: allow-discrete` and `@starting-style` parse in both engines (§1.2). `::backdrop` with `backdrop-filter` on a manual popover needs a paint read in both engines (pass 1).

**HEAD reading it leans on.** Two teleports exist because "`position: fixed` resolves against the viewport only while no ancestor carries `backdrop-filter`/`transform`/`filter`/`contain: paint`" (`Slider.vue:276-282`): the top layer is the platform answer to that exact trap. `grasp.css` documents the same backdrop-root formers as the reason a card cannot be grasped today.

**Cost.** One stage module, one CSS block, the slider's two teleports replaced, ModalOverlay's veil moved to the scrim, two or three more held adopters. Small in files; large in paint verification (the projection has to look like the control).

**Consumer impact.** None read the veil or the attribute (§1.5). A consumer that builds its own held control gains a public `engage()`.

**Known risks.**
- The projection is the hard part: a second render of the control (the loupe already clones the track at `--s: 3`, `Slider.vue:293-297`) or a moved node. A moved node loses its layout context; a clone doubles the DOM and its state sync. This is the family's "and then the hard part" until pass 1 prototypes it.
- Top-layer popovers steal nothing from focus when `manual`, but screen readers may announce the stage; it has to be `aria-hidden` and inert while the control keeps focus.
- A singleton stage serializes two-handed use (two sliders held by two fingers). The ladder's G6 rules it singleton; the owner may not want that on touch.
- E does not answer the census, the commit or passive components; alone it cannot close W-J.2.

**Born-RED witness.** *A held control is promoted into one stage, and there is one writer.* HEAD: E-3 ×1.000 in all 6 cells (the root never leaves its footprint; the loupe is a 120×52 detail, not the control); E-7 reads 2 writers; the slider's engaged rung runs on two teleports. RED.

## 5 · Considered and not minted

| route | why not minted |
|---|---|
| T1 GROW as specified, applied to every component (`.engage-grow` on all 55) | A single rung is not a register: it answers E-3 on the slider and nothing on the commit, the touch rows, passive components or momentum. It survives as a candidate rung inside A, C or D (the `held` class's in-place arm), and E states the alternative reading (§1.3 item 5) |
| Engagement as a DEV-only lint (a component that renders a focusable element without a rung fails a build check) | A detector over bytes, the E-1 failure class in a new place (§1.3 item 3). The census reads a declaration or a runtime result, never source text |
| One shared View Transition for every commit (`document.startViewTransition` on each model change) | Global: a transition snapshots the page, so two commits interleave badly, and a slider drag commits every frame. It is the right tool for route changes (`view-transition.css`), not for a per-control pop. Shares nothing with the register |

## 6 · Pass-1 research questions

### D5-A
1. The classes: do six cover all 55 directories without a seventh? Classify every directory with the reason, and flag each that fits two.
2. The mount pop: does an attribute-keyed CSS animation fire for a component that mounts already on, in both engines? Measure on Switch mounted checked and Chip mounted on; test `@starting-style` and a `data-engage-ready` guard.
3. The drift check: how does the census prove a component composes its declared class's recipe at runtime (a computed `animation-name` read per exemplar, or a class check)?
4. The `held` class needs script (velocity). Does A accept one script class, or does A pair with B for it?
5. The pop's form: scale peak and rebound per class, derived from `SPRING_PRESETS` rows rather than minted (the ladder mints no figure). Which row: `press` lands dead by construction (`engageLadder.ts:174-178`), `panel` has an intrinsic rebound.

### D5-B
1. The merge: can `useDockHold`, `useLiquidPress` and `useDragVelocity` become one door with three internal parts, and what does each current caller (dock, slider, Button, DarkModeToggle, Timeline, DockControl) lose or gain?
2. The model watcher: does a watch on the model fire exactly once per commit for reka components whose model updates twice (the `update:open` double-fire F-70 records)? And not on async initial load?
3. Momentum: implement the release velocity into the settle for the slider thumb and measure E-4 per frame in both engines; then the same rule on the Sheet detents and the sortable list, to test whether one rule serves the four existing owners.
4. The DEV registry as the census: does a mount test over one exemplar per component cover the 55, and what does B say about passive directories (Q-1)?
5. Cost of 25 host getters: prototype three adopters (Slider, Switch, Accordion trigger) and count the lines.

### D5-C
1. Style-recalc cost: `--engage` with `inherits: true` on a Card holding 200 nodes, transitioning, in both engines; the same with `inherits: false`. Read layouts and recalcs per frame (W-F.6's instrument).
2. The passive answer: does an inherited scalar make a separator or skeleton visibly engaged inside an engaged card, and is that engagement or noise? Owner glance on captures.
3. The channel budget: can the ladder's two-channel rule be checked on a mapping (a static read of each component's `--engage` expressions)?
4. `linear()` on a registered number: does the scalar's overshoot read as bounce once mapped to scale, and does E-2's pop bound pass on the Switch and Chip from `--commit` alone?
5. The one script write: velocity into `--engage-v`; does a CSS transition accept an initial slope, or does the scalar need WAAPI for the release?

### D5-D
1. The substrate map: list every component's surface composition and the minimum set of substrates that covers all interactive directories. Which components paint their own surface?
2. Commit without state: Button and the action Chip have no `[data-state]`. Does D give them a commit, or declare them `pressed` with no commit?
3. Per-component character inside a shared substrate: can the Chip's flood and the tabs' glide stay as substrate variants without re-creating per-component rungs?
4. Momentum: state the exact surfaces D cannot serve and which rule serves them. If the answer is "B's primitive", D merges with B for E-4.
5. The PF-1 link: both WebKit crashes are on hover registers of substrates (`--control-surface-bg-hover`, the disclosure trigger). Does consolidating substrates localize the fix?

### D5-E
1. The projection: clone (the loupe's pattern) or moved node? Prototype both for the slider and read paint parity against the in-place control in both engines.
2. The phone arm: the engaged slider as a full-width stage projection on 390×844; does it meet E-3m's intent (L05a-16) better than an in-place grow, by owner glance?
3. `::backdrop` with `backdrop-filter` on a manual popover: paint read in both engines; replace the teleported veil and compare.
4. Accessibility: stage `inert` and `aria-hidden` while focus stays on the control; screen-reader read of a held slider.
5. The singleton on touch: two sliders held at once. What does the stage do with the second, and is G6 right for touch?

## 7 · The approach-family registry and the born-RED witnesses

| id | family | mechanism | center | round-0 status |
|---|---|---|---|---|
| D5-A | the declared class table | a table maps every directory to one of six classes; one CSS recipe per class; the census reads the table and runs one runtime test per class | declaration (P-3) | minted |
| D5-B | one engage primitive | `useEngage` merges the hand, the press and the velocity; the one writer of the engagement attributes; commits fire from the model; a DEV registry is the census | a composable | minted |
| D5-C | the engagement scalar | a registered `--engage` driven by CSS state and mapped per component; a `--commit` impulse; one script write for velocity; passive atoms inherit their host's scalar | a CSS channel | minted |
| D5-D | the material carries it | each substrate (control bit, capsule, control surface, plate, disclosure) owns its whole ladder; components inherit by composing; the census counts substrates | the substrates | minted |
| D5-E | the engaged stage | one top-layer, anchor-positioned stage the held control is promoted into; singleton; the one writer of `data-engaged`; the veil is its backdrop | the document | minted (partial by design: rung beyond press only) |
| D5-X1 | T1 GROW everywhere | `.engage-grow` on all components | one rung | not minted: one rung is not a register (§5) |
| D5-X2 | a DEV lint over source | a build check for a rung in bytes | a detector | not minted: the E-1 failure class (§1.3 item 3) |
| D5-X3 | View Transitions for every commit | a document transition per model change | the platform | not minted: global, interleaves, wrong grain (§5) |

**The shared battery.** Every family must turn E-1..E-7 green and hold E-8, or name the row it leaves RED and why. The open cells as minted:
- D5-A: E-4 needs one script class (the `held` class) or B's rule.
- D5-B: E-1's passive directories need a ruling (Q-1) or A's table for exemptions.
- D5-C: E-4 is one script write; E-6 depends on whether an idle loop may drive the scalar (Q-2).
- D5-D: E-4 out of reach by construction; E-2 for stateless components (Button, action Chip).
- D5-E: E-1, E-2, E-5, E-6 are outside its scope; it pairs or it banks.

**Each family's own born-RED witness:**

| family | witness | HEAD reading |
|---|---|---|
| D5-A | **Every directory is declared, and every declaration holds at runtime** | RED: no declaration; 38 of 55 rungless by bytes (40 decommented); 0 runtime class tests |
| D5-B | **One writer, and every commit fires from the model** | RED: 2 writers; E-2 programmatic column 0 of 8 in Chromium (tabs glide 78.31 px, overshoot 0.00) |
| D5-C | **`--engage: 1` on each root moves its paint or geometry** | RED: the property does not exist; the slider reads ×1.000 |
| D5-D | **Every substrate passes E-2 and E-5 on its exemplar; every directory composes one** | RED: control-bit exemplars fail E-2 in 18 of 18 cells across both engines; the disclosure trigger fails E-5 |
| D5-E | **A held control is promoted into one stage; one writer** | RED: E-3 ×1.000 in 6 of 6 cells; 2 writers; two hand-built teleports |

**Owner questions raised at round 0** (the loop builds on the stated default until a ruling arrives, `W-J.2.md:59`):

| id | question | options | default until ruled |
|---|---|---|---|
| Q-1 | What is engagement for a component nobody presses (separator, skeleton, status-dot, badge, alert)? | (a) the container's engagement, visible in the atom (C's inheritance); (b) the material's answer to the pointer field, the REST rung (D); (c) declared exempt with a reason (A's `static`) | (c), the smallest claim that the census can check |
| Q-2 | S6's breathing preset on the glass track, a control, against the REST rung's "a control never carries a decorative idle animation" (`engageLadder.ts:143-151`) | (a) the ladder yields: controls may breathe under W-F.6's bound; (b) the fold yields: breathing is for ambient surfaces only and S6 is RETIRED with the owner's words (W-J.2 §3.2 item 5) | (b), the ladder's standing ruling R-4 |
| Q-3 | The engaged rung: in-place grow (T1 GROW, 1.06) or promotion (the ladder's reading, D5-E)? On a phone a 360 px track grows past the gutter | (a) in-place with a pixel cap; (b) promotion; (c) in-place on fine pointers, promotion on coarse | (c) |
| Q-4 | Hallmark 6's reach: "momentum for all components" literally, or every surface that is dragged or flung plus the press spring's re-press momentum? | (a) literal; (b) dragged and flung surfaces (slider, sheet, sortable, tabs drag, carousel, deck, dock run) | (b) |
| Q-5 | The commit's form per class: pop, travel or both? D4 Q-11 asks the same for the tile | (a) pop for chosen atoms, travel where a body exists; (b) both always | (a) |
