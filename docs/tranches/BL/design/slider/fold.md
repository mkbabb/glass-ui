# Slider — the fold

Seat: FOLD (claude-fable-5-2), 2026-11-12. I read the brief, the three owner frames, the precepts (motion-canon P0, affordance-map "Intent first", restraint), master's `src/components/slider/`, `challenge.md`, `PROTOTYPE.md`, `MEASURE.md` and the wave.

What this seat did:

- **Folded all twelve findings into `../../waves/W-B.18.md`** as one text. The wave now reads as a single design, not a design with amendments.
- **Built every amendment** on the prototype worktree (`.claude/worktrees/bl/slider/proto`, one commit, `fe30f9882`, on `576c9b99a`). The diff is `fold/amendments.patch`: `Slider.vue`, `styles.css` and the worktree's own `expand.test.ts`, +327 / −600. The Slider's two files are 1,125 lines with the expanded view, against 1,019 on master without it and 1,398 as first built.
- **Measured it** in headless Chromium and in Playwright WebKit (`fold/probe.mjs`, the page in `fold/harness/`). Every run went through `guarded`, every WebKit run through `guarded --exclusive webkit`; one browser per run, a new context per cell, everything closed in `finally`. Results: `fold/runs/{chromium,webkit}/*.json`, crops in `shots/` beside them, figures in `fold/*.png`.
- Nothing is left listening on 5381–5384. The worktree is clean. No release worktree and no sibling repo was written.

Every number below is measured on `fe30f9882` unless it says *derived* or *read*. Where the two engines differ the cell says so; otherwise one number stands for both.

One thing about where I wrote: the task names `W-B.18.md` and the only file of that name is `docs/tranches/BL/waves/W-B.18.md`, which is outside `design/slider/`. I wrote it in place, as the design seat did. Nothing else outside `design/slider/` and the scratch worktree was touched.

## The choices the fold made

The challenge left four things open. These are the ones a reader should check first.

1. **The lens leaves in the patch** (finding 6 offered this, or holding 11.1.1 back). From 11.1.1 the Slider mounts no loupe, no veil and no carriers. The patch is no longer styles only: `Slider.vue` changes. It still changes no prop and no token name. The cost is named in the wave: 6 rows in two style suites pin the Slider as a host of those registers and are rewritten, and each register is left with one consumer, which is W-R.1's to rule on.
2. **The colour slider's ring ships with the band, in 11.1.1** (finding 6 offered this, or a note that the colour console is not cured yet). The owner sees it by capture first.
3. **The knob is the page's colour (`--background`), and the shell is `--card` with the ink at 6 %** (finding 7 left the tone to the owner). This is the fold's default, not a ruling. It is the only pair I found that reads against the fill, the track and the shell in both themes; its limit is stated below and in the wave, and it is the owner's first question.
4. **`motion` stays on the Slider.** The first form removed it in 12.0.0. The expanded view's reduced form reads it (`reduced`, `off`), so it still has a job.

## Finding by finding

| # | finding | where it is in the wave | what was built | reading, Chromium and WebKit |
|---|---|---|---|---|
| 1 | A press on a grown thumb moves the value; the thumb then trails | R-10 (reka's node is never scaled), G-TOUCH | The disc is the thumb's `::before`; only it scales. No border on the node, forced colours included | Press after the dwell and after a keyboard grow, no move: 50 → 50 at md, sm 155 px, lg, RTL, vertical, the spectrum, and on the disc's rim outside the node (was 50 → 47, 49, 51, 52). Through a 30 px drag on a continuous slider: 0.00 to 0.01 px from the grab point (was −3.00 to −4.40). On a stepped one: on the nearest step (worst 0.80 px against a half step of 1.46) |
| 2 | After one key or track press, a driven value trails by 30 to 45 px | R-9 (the travel belongs to one value change), G-TWEEN | The mark is dropped before any later value is written, and on `transitionend` and `transitioncancel` | 60 driven frames after ArrowRight and after a track click: 0 frames marked, 0 with a transition running, 0.00 px of lag from the first frame (was 60, 60, 30 to 45 px). A Page key still travels: 12 to 16 distinct positions, monotone |
| 3 | The grown shell cannot be touched, and resting on it closes it | R-10 (the shell takes the pointer while grown), G-TOUCH | `pointer-events: auto` in the grown state only | Pointer 5 px above the band: the element under it is the shell, the view stays grown, and a press there sets 71, which is what a track press at that x sets (was: not the Slider, shrunk, 50). At rest a press in the outset leaves the value alone |
| 4 | Script focus counts as keyboard focus | R-11 (the keyboard mark needs a key), G-TOUCH | One page-wide flag for the last input, a key or a pointer; the mark is set only after a key | `blur(); focus()` after a mouse press: mark off, shell at rest, readout closed (was all three on). Tab: all three on. Shift+Tab: all off |
| 5 | The readout cannot ship anchored | R-12, G-COST, G-LIFT | No `anchor()`. One rectangle read at the show, again on scroll and resize while shown; a fixed box in `ch`, `contain: layout size`; hidden unless it is an open popover | See "G-COST" below. Readout − thumb: 0.00 px (WebKit 0.01) with no transform and under `translateX(40px)`, `translate3d(12px, 18px, 0)`, `scale(0.9)` and `scale(1.25)`, at the press and after a 60 px drag (was 10.0 and 16.9 under `scale(0.9)`); the same in RTL, inverted, vertical and with two thumbs. After a 60 px page scroll in the hold: 0.00, and the drag carries on. In a `contain: paint` plate its own pixels equal the twin's (3,678 of 3,678; WebKit 3,707 of 3,707). Its width through a drag: one value, 51 px |
| 6 | 11.1.1 puts the cured band under the lens | R-5, R-13, G-HELD, Scope | The loupe, the veil, the carriers, the velocity bridge and their CSS are deleted from the Slider; the fill is a plain background | Held: 5 nodes under the root (was 12); nothing added to `<body>`; the fill's colour held equals rest, and with a gold ink on a wrapper it is the gold (`rgb(214, 170, 80)`, was the page's ink); a mouse press shows no ring on the track |
| 7 | In dark there is no knob; in light, grown, the knob is the shell's colour | R-7, G-READ, G-READ again, OQ-1 | Knob `--background`; shell `--card` with the ink at 6 %; disabled dims the root | Luminance, knob against fill / track / shell. Dark: 10 against 230 / 45 / 54 (first build: 230 against 230; today's `--card`: 44 against a track of 45). Light: 250 against 25 / 188 / 231 (first build grown: 250 against a shell of 246). With a violet fill: 10 and 250 against 153. Disabled: the root at 0.5, the disc at 1 |
| 8 | Between rest and full the shell is concentric with nothing | R-11 (the shell is always its full length), G-CONCENTRIC again | The shell grows by `clip-path`, `inset(g round H/2)` to `inset(0 round H/2 + g)`; no shadow | Every frame sampled inside the grow and the shrink (19 to 24 and 11 to 14 frames a leg, at 0, 50 and 100, by press, key and hover): the painted caps are 0.00 px from the track's and the radius is half the painted thickness (was up to 173 px) |
| 9a | A radial glow on the thumb | R-7 | `glass-specular-track` off the thumb | No node or pseudo computes a `radial-gradient` |
| 9b | Two shadows on the spectrum handle | R-8 | The halo rules are deleted; the state mark is the ring's edge, 2 to 3 px | One shadow layer on the disc, at rest, hovered and held, both variants |
| 9c | A grey track in light | R-7, OQ-2 | Not changed. The light capture is in the owner's page beside the dark one | Track 188 against a page of 250 |
| 9d | The fill's edge shows round the thumb | R-4, G-READ | The cap is drawn 0.25 px short, under the upper thumb and under the lower one of a pair | Default ink, rim pixels lit by the fill: 30 of 400 at 2× (WebKit 28) and 14 of 106 at 1×, down to 0 and 2. At 0.5 px: 0 and 2. I took 0.25: it clears 2× and leaves the cap's centre reading 0.25 px, half of what the gates allow. With the darker knob a violet fill shows no lit pixel even at 0 |
| 10 | It is called granular and changes neither gain nor track; the proportions leave the table at small heights | R-10 (bigger, not finer; the outset's bound), OQ-3 | The outset is `min(--slider-expand-outset, 2H/3)` | Disc scale and shell at *H* = 6, 9, 12, 20, 28, 40: 1.67 / 14, 1.67 / 21, 1.67 / 28, 1.40 / 36, 1.29 / 44, 1.20 / 56. O-254 is not closed by this wave |
| 11 | Consumers | Consumer half | Nothing built in any consumer | *Read* from their trees. Two additions to the challenge's list: value.js's needle is on the thumb's `::after`, so the library's `::before` disc does not collide with it; and the ring reads both of value.js's variables |
| 12 | What the gates did not read | Gates | A hybrid-pointer cell; four bites; OQ-4 names Safari 17 and 18 | A touch on a context that also has a mouse: no hover mark and the shell at rest one second after, and the mouse then grows it. Bites below |

Three more from PROTOTYPE's own list, folded with the rest:

- **Its note 9** (the readout's exit ran on the entry clock while the pointer still hovered): the readout's clocks are its own now. R-11.
- **Its note 8** (reka's centring transform under the grow): moot, since the node no longer scales; the variable is still set to `none`. R-9.
- **Its cure 2 came back twice in my own build**: a forced-colours rule lost to a longer selector (the fill was not `Highlight`; the focused shell kept the ring's colour). Both are fixed and the wave says how the block is to be written. R-11.

One thing I found that no seat had: under reduced motion the rest shell is unclipped and transparent, and with the shell taking the pointer it would have answered a press 8 px outside the band. The shell takes the pointer only in the grown state. G-STILL reads it: no hover mark and 50 → 50.

## The gates on the amended build

| gate | reading | |
|---|---|---|
| G-CONCENTRIC | 224 cells an engine (sm, md, lg and three other heights; horizontal, vertical, inverted, RTL, vertical inverted; the spectrum; 8 values; at rest and grown). Thumb against the law: 0.00. Thumb against the track's caps: 0.00. Thumb against the fill's cap: 0.25, by R-4. Two thumbs, 8 cells: 0.25 at each cap | GREEN |
| G-HEIGHT | Thumb, fill and track equal to 0.00 px in every cell; reka's node is never scaled (`scale: none` in all 224). `radius-pill` appears nowhere in the Slider; the only reads of `--slider-thumb-size` are the spectrum's track height | GREEN |
| G-READ | The knob's floors hold in both themes and with a violet fill (table above). The fill's colour is the root's `color`, at rest and held. The rim reading is 0 of 400 at 2×. **The column scan of the band heights was not re-read after the fold** (PROTOTYPE's 12 against 12 stands for the first build; by rectangle the owner's repro reads 12 / 12 / 12) | GREEN, one clause unread |
| G-HELD | 5 nodes at rest and held; nothing on `<body>`; the fill unchanged held; no ring on a mouse press and one on Tab; one shadow layer, on the disc; no `backdrop-filter`; no `radial-gradient`. By mouse. Held by touch was read for the grow only | GREEN by mouse |
| G-CONCENTRIC again | Rest shell: the track's own capsule. Grown: 0.00. Mid frames: 0.00. Disc scale at most 1.67 at six heights | GREEN |
| G-READ again | Disc against shell: 44 in dark, 19 in light | GREEN |
| G-TWEEN | Every way in and out, at 0, 50 and 100: first frame the rest state, last the end state, `clip-path`, `opacity` and the disc's `scale` monotone. Largest step of a leg: Chromium 0.10 in and 0.17 out; WebKit 0.12 and 0.20 (fewer frames). A release 70 ms into a grow turns back at an inset of 2.5 px (WebKit 2.7) with no jump. The readout never opens on hover. Driven values after a step: row 2 above. **No per-curve bound was derived**, as in PROTOTYPE | GREEN; the step bound unread |
| G-COST | Below | GREEN on the restated text |
| G-NODES | 5 / 5, 6 / 6, 7 / 7 in the browser and in vitest (`expand.test.ts`) | GREEN |
| G-FORM | vitest: a named Slider submits after a key press, `expand` off and on. The browser drag was not re-read | GREEN in vitest |
| G-BOX | **Not re-read after the fold.** PROTOTYPE's GREEN stands for the first build. The fold changes no box in flow (the readout is fixed and contained; the shell's box is unchanged) | unread |
| G-LIFT | Row 5 above | GREEN |
| G-TOUCH | Rows 1, 3, 4 and 12 above. Chromium touch through a 12-move drag: on the nearest step (worst 1.00 px against a half step of 1.50). WebKit: the tap only; Playwright has no touch press and drag there | GREEN where read |
| G-STILL | Forced colours (Chromium): the shell, the disc and the readout have a 1 px `CanvasText` border, the fill is the system highlight, the focused root has a 2 px outline, the node has no border and its `clientWidth` is 20, and a press leaves the value alone. Reduced motion: nothing scales and nothing is unclipped, the rest outset takes no pointer. **The fade still cuts** (2 distinct opacities), from `utilities/a11y-overrides.css:46-53`, as PROTOTYPE found | forced colours GREEN; the fade RED from outside the Slider |
| Existing specs | `slider.contract`, `Slider.marks`, `attrs-pointerdown-channel`, `dock-hold-contract`, `slider-cursor-affordance`, `expand`: 6 files pass. `focus-veil.test.ts`: 4 of 19 fail. `glass-subtlety.test.ts`: 2 of 36 fail. All six name the Slider as a host of the veil or the grasp register. `vue-tsc` on the source is clean. The browser `size-tokens` test and the e2e cells were not re-run; PROTOTYPE's failures there pin rules the wave still deletes | as the wave names |

**G-COST.** Chromium trace, `Layout` events in each window:

| | grow by press | 60-frame drag | shrink | 60 frames driven | grow by hover |
|---|---|---|---|---|---|
| `expand` off | 0 | 0 | 0 | 0 | 0 |
| `expand`, no `valueText` | 0 | 0 | 0 | 0 | 0 |
| `expand` + `valueText` | 1 | 40, all rooted in the readout | 1 | 0 | 0 |
| the same as first built | 54 | 78 | 51 | 0 | |

The 1 in the grow and the 1 in the shrink are the readout entering and leaving the top layer. The 40 in the drag are its text changing, each laid out inside its own box (the trace's layout root is the readout's node in all 40). With `expand` off the first build read 2 and 39, which were the loupe and the veil. What animates, in both engines: `clip-path`, `opacity`, `scale`, `background-color`, `z-index`.

**Bites**, each a gate clause read once with its cure undone, both engines:

- reka's node scaled: a press after the dwell reads 50 → 49;
- the shell deaf to the pointer: resting on it, it goes back to rest;
- a border on reka's node: a press reads 60 → 59;
- the thumb at 16 px: 16 in a 20 px track;
- the cap not drawn short, the first build's knob tone, the first build's travel mark, focus mark and anchor: their RED readings are the rows above and the challenge's own.

The bites of the gates the fold did not add (the shell under `v-if`, the `!important` hold removed, a second surface under the readout, growing by `height`) were not run.

## Where a gate's text changed

No bound was raised. Five places read differently from the first form, and a reviewer should look at each:

1. **G-COST, the `Layout` arm with `valueText`.** The first form asked for 0 in every window and the first build read 54, 78 and 51. The fold reads 0 in every frame but two: one layout when the readout enters the top layer and one when it leaves. An element that is shown on demand is laid out when it is shown; I know of no way to 0 short of keeping every readout open for the life of the page. The gate now says exactly one in each of those two windows and 0 rooted outside the readout elsewhere. If that is judged a loosening, the alternative is the readout as a child of the shell, which a plate cuts.
2. **G-COST, the property list.** The first form listed `scale`, `translate` and `opacity`. The wave's own rulings also tween the track's ink (R-7, `background-color`) and raise the root (R-11, `z-index`), which PROTOTYPE read as a failure of the list, and finding 8 adds `clip-path`. The list is now the table under **Counted**, every row on motion-canon P5's list, and anything outside it fails.
3. **G-TOUCH, the drag bound.** 1 px became 0.5 px on a continuous slider, and "on the nearest step" on a stepped one. A thumb that sits on 3 px steps cannot be within 1 px of every pointer position, so the first form was not a reading of the grab at all on the stepped cell.
4. **G-CONCENTRIC, the fill's cap.** It read 0.00 and now reads 0.25, on purpose (finding 9d). The bound is still 0.5.
5. **G-NODES and the table.** Held with `expand` off is 5, not 12, because the lens leaves in the patch.

## Not done, and unread

- **The amended 11.1.1 was not built as a commit of its own.** The patch gates were read on the 11.2.0 build with `expand` off, in both engines. The challenge's reading of the first 11.1.1 commit (`87b3d259c`, Chromium) stands for the geometry on the layout mechanism.
- G-BOX, the band-height column scan, the browser form drag, twenty frames inside a drag, and the hover and held states of the 224-cell grid were not re-read after the fold (the grid reads rest and keyboard-grown).
- WebKit: no trace (animation list only), no forced colours, no touch press and drag.
- No real Safari; nothing on Safari 17 or 18. That the readout is simply absent without the popover API is *derived*.
- No consumer was built against the amended Slider.
- The track's strength (16 %) is as the first form guessed it. Finding 9c is answered only by putting the light capture in front of the owner.
- The knob's limit: at 0 and at 100 half its edge is against whatever the Slider sits on, and on a ground of its own colour in dark nothing marks it. `fold/rest-dark-webkit.png`, right column, shows it on a bare page. No tone cures this; a hairline on the disc would, and I did not add one, because it is an addition and the tone is the owner's to say first.
- One machine note for the next seat that runs WebKit here: a single Playwright WebKit browser stalled on `page.goto` after about 90 navigations (the same stall the 10.1.3 close met). The probe now sets values in place, and the WebKit read is three browser runs of under 50 navigations each.

## For the orchestrator

These are outside what this seat may write:

- **A library row for the reduced-motion carve.** `utilities/a11y-overrides.css:46-53` cuts every fade, against motion-canon P6 and P0. The wave makes 11.2.0 wait on it.
- **W-R.1**: after 11.1.1 the focus veil's only consumer is the modal scrim and the grasp register's only consumer is the dock plate.
- **`INDEX.md`**: the split is still three ways, but 11.1.1 now carries the ring and the lens's removal, and 12.0.0 only flips `expand`'s default.
- **atlas**: three defaults change at 11.1.1 (the fill is the text colour in both themes; the knob's tone; the colour slider's handle).
- The scratch branch `bl/slider/proto` holds four commits; the wave cites `fe30f9882`.

## Files

- `../../waves/W-B.18.md`: the wave, folded.
- `OWNER-READ.md`: one page for the owner.
- `fold/amendments.patch`: the build, on `576c9b99a`.
- `fold/probe.mjs`, `fold/harness/`, `fold/compose.py`: the readings and the figures. `node probe.mjs <chromium|webkit> [phase…]`.
- `fold/runs/{chromium,webkit}/`: one JSON a phase, `shots/`, and the logs.
- Figures (`-webkit` and `-chromium` of each): `owner-before-after`, `owner-after-held`, `expanded-strip-{dark,light}`, `knob-tone-{dark,light}`, `rest-{dark,light}`; and `shell-grounds-chromium.png` (four candidate grounds for the shell under the knob, dark above light: `--card`, the ink at 6 % and at 10 % in `--card`, the ink at 16 % in `--background`; shell luminance 44 / 54 / 60 / 38 in dark and 246 / 231 / 221 / 210 in light).
