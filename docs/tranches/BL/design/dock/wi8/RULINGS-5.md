# W-I.8: the rulings on the fifth measure

The ruling seat, claude-fable-5-2, 2026-11-15. I wrote none of the wave, the prototype, the challenges, the folds or the measurements. I launched no browser and no build, and changed no source. RU-36 to RU-49 follow RU-25 to RU-35 (`RULINGS-4.md`). Each is the owner's to reverse.

**What I read.** In full: `RULINGS-4.md`, `MEASURE-5.md`, `OWNER-READ.md`, `LEDGER.md`, the seven `INPUT-*` notes, and `audit/INBOUND.md` rows O-366, O-368, O-369, O-369a, O-370, O-374, O-376. The three strips (`fold/strip-fold-5.png`, `strip-swap-5.png`, `crop-many-5.png`) and two of daraksha's frames (`frames-dock-2x/compare-119-before-after-1440-dark.png`, `after-1440-dark-plain-hover-crop2x.png`). By section: `audit/dock-usage/COMPOSITIONS.md` (the workaround list and the proposed surface), `design/demo-site/build/P3.md` (the ink table and F3, F6). In the worktree `.claude/worktrees/bl/dock/wi8` at `2a9e1aba4` (source as `d50460b34`), read only: `useDockBody.ts` `:425-830` and `:1218-1334`; `run.css:360-454`; `dock.css:86-135`; `shell.css:140-150`; `tokens/glass.css:34-52`, `:134-172`; `tokens/sizing.css:170-185`; `adaptive-legibility.css:40-75`; `controls/tab-button.css:40-62`, `icon-button.css:195-250`, `triggers.css` by rule; `glass/veil.css` by rule; `g-dock-lattice.test.ts:885-900`; `measure/harness/probe.mjs:318-440`, `m5/judge6.mjs` and `m5/read5.mjs` by clause, `scenarios-m3/p3-swap-return-30.json`, `logs/m5-r30-chromium.txt`. Line numbers below are that worktree's.

**What is a reading and what is not.** *Source* quotes the code. *Record* quotes a measurement another seat took. *Hypothesis* is my best-supported cause with no reading behind it; the build seat confirms it before it cures it. I took no reading of my own.

## Two findings that change how MEASURE-5 is read

1. **The harness stamps a cause before it causes it.** *Source*: a scenario's `mark` step is its own `page.evaluate` (`probe.mjs:324-331`); the `click` that follows is a second round trip to find the point and a third to press (`:395-409`). `p3-swap-return-30.json` is `mark "return-30"`, then `click`. So every "N ms after the cause" in the judges is measured from a mark that precedes the cause by two transport round trips, which cost nothing at calm load and anything under a loaded machine. Every timing failure in MEASURE-5 is of this shape: three G-2 first-row cells at load 217, G-10's one swap cell, G-4's return-30. RU-37.

2. **A window resize already seats the dock with no travel.** *Source*: `useDockBody.ts:800-804`, R-1: `seated = (resized && raf === null && !travelling) || !shown`. The lifted-cap cell is the one place where a room change made from outside the dock is put on the spring, and it is the one cell that cannot close. RU-36.

## The rulings

**RU-36. A room the host changes is followed at layout, as a window resize is. The lifted-cap clause stands as written. (Matter 1)**
Record: MEASURE-5, RU-27 the lift: seats show 5 to 8 rows after the cap lifts; "the far seat goes in one row while the plate still covers it for 22 to 30 rows".
The right behaviour: the dock tweens the changes it makes (its posture, its layers, its seats, its content). A change of its room is made by its host, and the dock stays in the room it is given, in the row it is given. Then a seat arrives with the plate and leaves with the plate, because the plate is at layout in that row; and when the host tweens its own change, as the law asks of it, the dock is tweened with it frame by frame.
Why not the spring. On a shrink, a plate on the spring paints outside its room for the length of the travel, and the run's port (layout) cuts the far seat before the plate arrives: that is the measured fault, and curing it under the spring means holding the run out of flow at its old width for the travel and releasing it at the landing, a third face mechanism for a case no site has. On a host that drags (a splitter, a sidebar), a spring retargeted every frame trails its container. The window case was ruled this way in R-1 and nothing reads RED there. L-2's change list, the owner's list of what must animate, does not name a host resize.
The mechanism: in `sync()`, a reading whose reason is the observer's (`"ro"`, `:1239`), with no posture change, no pending leave or join, the seats' span and count what they were at the last reading, and the run not fitting before or not fitting after, is a change of room: `seated` is true for it (`:804`). A change that arrives while a travel runs is a retarget and glides on, as built (C2-17). Everything else travels as built.
The gate, G-2: RU-27's clause is kept to the letter ("with the host's cap lifted on an open dock the run shows every seat within two rows of the change") and gains its mirror: with the cap returned, the plate's edges are at layout within two rows, and in every row a seat is hidden only where it does not meet its lane (RU-25). Plant: the seated branch removed for a room change (RED on both halves, as measured today).
Touches: `useDockBody.ts:499-539` (the plan carries span and count), `:800-804`.

**RU-37. A timing bound is read from the cause as the page received it. Return-30 is not yet a fault or an artefact; one reading settles it. (Matter 2)**
Record: return-30 read 289, 98, 24 (bound 23), pass, pass. *Source*: finding 1; the bound is `1.15 × stop + one row` (`judge6.mjs:209`).
Two different things are in those five readings. 24 against 23 is under the sampler's resolution (a row is 8.3 ms): the judge compares a turn in whole rows, `ceil(rev / row) > ceil(bound / row)`, and that reading passes. 289 and 98 cannot be told from a late click, because the mark was stamped before the click was sent.
The ruling: the sampler stamps a cause itself, in a capture listener for the event that is the cause (it already listens, `sampler.js:41`), and the scenario's `mark` step only names the next such event. Keyboard and `collapse()` causes are stamped in the same `evaluate` that makes them.
The reading that settles return-30: twenty runs of the cell with the in-page cause, each recording the largest gap between consecutive rows from the cause to the turn, and the machine load. It is a fault if any run turns more than one row late while rows arrive at cadence (no gap over two rows). It is an artefact if every late turn has a row gap that accounts for it. If it is a fault, look first at whether a return made while the first change's faces are placed is held until that change settles: 289 ms is the length of one travel.
A timing cell read at a load over 36 (the guard's own headroom figure) is void and read again; it is not a failure and not a pass.
Touches: `probe.mjs:324-331`, `sampler.js`, `judge6.mjs:209-215`, `:522`.

**RU-38. G-11 keeps three layouts on a trigger frame that changes no flag. (Matter 3)**
Record: MEASURE-5: "3 of 24 fold trigger frames read 4 (the pill at 4x twice, the controls dock at 4x once: the carrier's two plus two of the frame's own)".
A fold changes no flag since `95a2612e9` (the fit is the open run's, and `fitRun` returns before it reads), so a second carrier layout on a fold frame is not RU-29's named reread. It appears in 3 of 24 and only under the throttle, so it is not the fold's own logic, which is the same every time. *Hypothesis*: a second `sync()` in the same frame. The posture watch syncs before the flush; the class change resizes the root; under the throttle the ResizeObserver's delivery lands in that same frame and calls `sync("ro")` (`:1239`) on a layout the first sync's writes have dirtied.
First reading: put `reason` in the `dock:read` mark's detail and read the three frames. If it is the observer: an observer delivery in a frame that has already synced compares the entry's own border-box size (the entry carries it, no layout is read) with the layout that sync holds, and returns when they are equal. If the reading names something else, report it. The bound does not move: a restated bound here would be a convenience, since the fourth layout has a nameable owner.
Touches: `useDockBody.ts:663`, `:1239`.

**RU-39. The fit law is one comparison on one box: the seats' layout span against the uncapped run's client box, in the integers layout reports. A capped run is asked by lifting its cap for the read, never by arithmetic. (Matter 4, first half)**
Record: MEASURE-5, G-14: after `d50460b34`, s2 holds `"fits":true,"span":250,"port":249`. *Source*: `:530`, the capped port is `Math.round(host width + capExtra)`, where `capExtra` (`:498`, `:532`) is a rounded client width less a fractional box, remembered from another layout.
A port rebuilt from two boxes read at two times, in two roundings, is off by a pixel in one direction or the other whatever the rounding; `a4a2682e6` erred one way (a fitting dock read as not fitting) and `d50460b34` errs the other. The shipped law (10.1.5 e4, k3, p2, s2) is exact because it reads one box.
The mechanism: `capExtra` and the capped branch are deleted. Uncapped, the reading is as shipped: `span <= run.clientWidth`. Capped, the carrier remembers the three numbers the cap was set on (the span, the seat count, the region's width); while all three are unchanged the cap stands and nothing is read. When one has changed, the carrier removes `data-run-whole`, reads `run.clientWidth`, and sets the flag again or leaves it off. That frame is RU-29's named flag frame (four layouts), and it is the only frame that pays.
This is not RU-26's struck lift: that one ran on every reading and wrote a length. This one runs only when a capped run's room or seats changed, and writes nothing but the flag.
The gate, G-14 and G-2: e4, k3, p2 and s2 pass in all three projects; and one new cell sweeps a host's width one pixel at a time from three under the span's fit to three over and back: at every step the flag equals `span <= clientWidth` read uncapped, and the flag at a given width is the same in both directions. Plant: the capped arithmetic restored (RED at one width of the sweep).
Touches: `useDockBody.ts:497-539`.

**RU-40. The ring's 4 px stands; a run that fits rests at offset 0. (Matter 4, second half)**
Record: MEASURE-5, the reserve note: read5 reads 4 px of "content outside its region" on three overlay cells and the keyboard cell, every seat whole; "a focus or the carrier's resting offset takes it".
The 4 px is master's ring yield (`run.css:369-381`): a fitting run keeps the ring's reach so a focused end seat's ring is not cut. RU-26's clause is that every seat's visible box is whole, and it is. So it stands. What does not stand is a carrier that spends that 4 px with no focus to show: in a run that fits, the carrier writes no resting offset (`:759-763`), and only reach for a focused seat moves it.
The gate, added to G-2's rest clause: a fitting run at rest with no focus inside reads a scroll offset of 0, in both directions of writing. read5's "content outside its region" clause is deleted; it is stricter than any ruling and has no owner.

**RU-41. Selection is the current seat's mark. The width test is retired and its promise restated on the mark. (Matter 5)**
Record: MEASURE-5, pile (c): "The geometric carrier of selection … is kept as `it.fails`". *Source*: `g-dock-lattice.test.ts:888-900` asserts `--dock-open-pitches >= 2` and a rule reading `--dock-open-seat`; RU-28 left both names declared and unread, so the test can never pass again.
What shows selection: the fill the current seat carries (`[data-active]`, the capsule, `icon-button.css:216-232`; `aria-current` on a tab seat, `tab-button.css:96`), which arrives and leaves on the seat's own paint transition, so no change of page is a cut. The indicator that glides at its own size exists since 11.1.0 in the layer switcher and SegmentedTabs; carrying it to the run's seats stays 12.0.0's, with W-R.1's seats (RU-28), and 11.2.0 does not build it.
The test: an expected failure that cannot pass is a dropped promise with a label on it. It is restated as a passing witness: in both orientations exactly one seat of a run carries the mark, its box equals every other seat's within 0.5 px, and its fill differs from a resting seat's. `tests-visual/release-10-1-5-critic-11/12-r11.spec.ts:399` takes the same restatement.
This remains the owner's to reverse (OWNER-READ, question 8). If he wants the name beside the icon it returns with 12.0.0's mark and not before.

**RU-42. The three plants. (Matter 6)**
- *G-3, the intent plant bites only in WebKit.* A new plant, in the carrier and not in the event path: on a posture change that arrives mid-travel, the retarget is held four rows. It bites wherever the turn's bound is read, in either engine, because both engines run the same loop. The old plant is dropped. G-3 is not GREEN in Chromium until it bites there.
- *G-4, the inline-size plant has nothing to bite.* The plant is retired, not the gate. What it proved (no seat's width changes in one row on a change of open seat) is proved by RU-28's plant, the open-seat width rule restored, which reads 96 px in one row in both engines.
- *G-1, the finger plant does not bite in WebKit.* WebKit's finger there is dispatched pointer events, which is what a unit test sends. Clause (f), a held finger holds and the linger runs from the lift, moves to a unit witness on `useDockState` with the same plant (the lift scheduled before the tap's focus). Chromium's cell keeps the clause on a real touch. WebKit's cell for (f) is retired: it claimed an engine reading it never took.

**RU-43. The fold's two laws, the trigger of an open surface, and a dock with nothing to tap. (Matter 7, the fold setting)**
Record: `INPUT-fold-rule-races`: atlas's bar slid out about 20 ms after the finger landed, 12 of 12; its drawer closed 32 ms after touch-down and its own trigger reopened it. O-376 (b): a rail whose folded face is only persistent seats opens on touch only by a 500 ms long press.
- *Law, binding on every fold glass starts that is not a dismissal (the linger today; scroll when it exists).* It never starts while a pointer is down, anywhere on the page, and its clock runs again from the lift. Scroll is counted within one gesture: the count starts at the gesture's first movement and is tested while the gesture moves, never when it ends, and nothing reads `scrollend`.
- *Nothing to build for it in the sixth pass.* `collapse` keeps its three values through 11.2.0. Glass has no scroll fold; G-1 (f) already reads the first law on the linger. A fold on scroll is one additive opt-in for fourier's and atlas's chrome (compositions 2 and 3), later in 11.2.0, after the build seat, and only against those two apps deleting their own; it is written to these two laws and gated on them (a touch that stops a fling over the dock folds nothing). A fold by room is struck: RU-27 is the one rule for seats that do not fit.
- *The trigger of an open surface is not outside it.* One clause added to G-8, read in the sixth pass: a press on the trigger of an open Popover, Select, DropdownMenu and Sheet, by mouse and by touch, closes the surface once, it stays closed, and the dock stays open. Cure only what reads RED.
- *O-376 (b) is R-2's case.* A dock with nothing to tap rests open on a coarse pointer; the touch plant already bites. One cell is added to G-1's 390 clock: a vertical rail whose folded face is only persistent seats rests open there.

**RU-44. The plate is one tier in both postures, firmer by tint, and no ink in a dock is dimmed. A gate reads it. (Matter 7, the plate)**
Record: O-376 (a): dock ink 1.9 to 4.1 in dark on five pages (the current tab 2.74, select chevrons 1.91 to 1.97, a rail icon 2.76); in light, inactive options 3.12 to 3.25. O-374: one veil step is enough, two read "only greyer"; "opacity alone does not buy legibility". *Source*: the folded plate is the wash rung and the open plate the dock rung, lerped (`shell.css:147-149`, `dock.css:126-131`); `--glass-veil-dock` is one step under the base (`glass.css:135`); the plate is composed with `--card` by `--glass-level`, and 0.3 is the firm plate `prefers-contrast` uses (`glass.css:155-165`, `a11y-fallback.css:39`); a tab seat's ink is `--muted-foreground` (`tab-button.css:52`); a select's chevron is at opacity 0.5 (`triggers.css:146`).
Light ink reads 4.5:1 only on a ground of luminance about 0.18 or less. A veil of ink at 0.14 or 0.18 over a bright field cannot reach that at any step the owner would call glass, which is daraksha's finding in arithmetic. What moves, in this order, each a token, stopping at the first that makes the gate GREEN:
1. *Alpha, one step, one tier.* `--glass-veil-dock` is the base rung (0.14 light, 0.18 dark), and the folded plate takes the same rung as the open one. Not two steps. The second name (`--dock-plate-collapsed-tier`) stays declared at the same value through 11.2.0 and is deleted in 12.0.0.
2. *Tint.* The dock's plate takes more of the scheme's own surface: `--glass-level` on `.glass-dock`, tried at 0.7, 0.6, 0.5, 0.4. It is the existing lever and the existing name. It does not go to 0.3, which stays the firmer plate a person asks for.
3. *Ink, by deletion.* No word or glyph inside a dock is dimmed to rank it, by a muted colour or by opacity: the tab seat's ink and the chevron's are the dock's ink (`--dock-fg-on-aurora`). An inactive seat differs from the current one by the mark. A disabled control is the exception.
Blur and shadow do not move (the owner's rule on shading). No ink that flips with the ground is added. If the gate is not GREEN at level 0.4, stop and report with strips; a firmer plate than that, or a flipping ink, is the owner's.
The gate, new, **G-15 · ink over a field**: on the ten composition pages, P3's instrument, folded and open, dark and light, over the stage's field and over a flat ground, both engines: every word 4.5:1 or more and every glyph and mark 3:1 or more against the plate as painted. Plant: today's tiers and level restored (RED in dark, as O-376 measured).
The owner sees strips before the default is taken (OWNER-READ, question 10): today, step 1, and the first GREEN.

**RU-45. The glyph's box is 0.9 of its seat by default, carried by `--dock-icon-glyph-ratio`, and it reaches a site's own picture and a tab seat's glyph. (Matter 7, the glyph)**
Record: O-368, the owner: "our icons sohuld be 2x bigger with not so much padding around the icon like that. Show them more"; his frame has a 20 px glyph in a 44 px seat. O-374: 40 px in 44 (0.91) "reads as his 2x". *Source*: `--dock-icon-glyph-ratio: 0.5` (`sizing.css:179`); the size is applied to `.dock-icon-button > svg` only (`icon-button.css:247`).
- The default is 0.9. It is his number, asked twice, and the one share a site has measured. The token is the one that exists.
- The pitch and the plate do not change. A seat is the touch target, 40 px fine and 44 px coarse, and the plate is the seat and its padding (52 and 56 px, which is daraksha's 56). The padding he saw is inside the seat, and the share removes it. The run's gap stays 8 px: RU-27's absent seat depends on the gap being larger than the reserve.
- *A site's own picture.* The seat sizes its direct `svg`, `img` and `picture`, and any direct child that carries `data-dock-glyph`, to `--dock-control-glyph-size`. One new public name, for composition 1 (daraksha's pictures and marks).
- *A tab seat.* A glyph beside a word is sized from the word, 1.5 em, not from the seat: 21 px beside a 14 px word, where it was 16. No new name; the word's size is the knob.
- The fill behind a glyph is the seat's whole box, as today (RU-46, row 6).
The owner sees strips at 0.5, 0.75 and 0.9, at 1440 and 390, dark and light, before 11.2.0 takes the default (OWNER-READ, question 9). atlas is told at booking; it is a default atlas consumes.
Gate: G-13's census gains one line: at 390 coarse every seat's hit box is 44 px or more at the new share. Touches: `sizing.css:179`, `icon-button.css:247`, `tab-button.css`.

**RU-46. daraksha's seven gaps. (Matter 7)**

| # | the gap | where | why |
|---|---|---|---|
| 1 | a glyph size that reaches a site's own pictures | sixth build | RU-45; without it the new default does nothing on the dock in the owner's frame |
| 2 | a glyph size for tab-shaped controls | sixth build | RU-45, one rule, no name |
| 3 | a documented seat padding | struck | the padding is the seat less the glyph, and the share is its knob; two knobs for one quantity is two writers. `--dock-icon-padding` stays undocumented and is listed for deletion in 12.0.0 |
| 4 | a resting veil apart from the open one | sixth build, by removal | RU-44: one tier, so `--glass-veil-dock` reaches the folded plate and no second knob exists |
| 5 | a published resting plate height | later in 11.2.0 | the name exists (`--dock-plate-cross-px`, RU-35); it is also written on the dock's scope element (`data-dock-scope`, G-9's) so a page's floor can read it. It now has a reader, so 12.0.0 renames it and does not delete it |
| 6 | room for the hover and press fill at a high share | 12.0.0 | the seat's material is rebuilt there (W-R.1); a rule for the fill's inset written now is written twice. In 11.2.0 the fill is the seat's whole box |
| 7 | a label on a seat that never re-lays the row | later in 11.2.0 | RU-47 |

**RU-47. A seat's name shows above the seat, out of flow; hovering a seat moves no box. (Matter 7, the label; O-366)**
Record: O-366, the owner: "hovering over cards/dashboard items should not shift the main cards or vizzes around". O-374, row 7: daraksha's hover name slid its neighbours and is becoming a label above the seat. RU-15 struck the labelled seat and put names above the seat by Tooltip; RU-28 took the last name out of the run.
There is no label slot in the run and none is added. A seat's name is its accessible name, and DockControl shows it above the seat by Tooltip, in the top layer, on hover and focus; on touch by Tooltip's press and hold when that lands. No new prop. It is later in 11.2.0 and not in the sixth build, but 11.2.0 does not ship RU-28 without it at a fine pointer: the owner's "what do some of these dock buttons even do?" is the reason names existed.
In the sixth pass, G-6 is widened and nothing is built: on hover, focus and press of each seat, the box of every seat in the run and of every plate changes by 0.25 px or less (it reads the root and the plates today). When the names land, the same clause is read with a name showing.

**RU-48. The usage audit: nothing of the surface moves in the sixth build. (O-369a)**
Record: `INPUT-dock-usage`: 47 of 93 public names used by no app; `collapse` pinned to `false` on 15 of 29 docks; `fitContent` true on 20 of 29.
- The sixth build adds one public name, `data-dock-glyph` (RU-45), and no other.
- The defaults of `collapse` and `fitContent` do not flip in 11.2.0: a default flipped in a minor release changes 29 docks nobody asked to change. They flip in 12.0.0 with the audit's surface. Until then the preset carries the right ones, and `ControlsDock` is the first preset.
- The two apps that mount a dock as a plate behind one button mount a one-seat `ControlsDock`, which is that seat at rest and never folds (RU-18).
- Later in 11.2.0, additive: a preset where two apps share a composition, and the unused names marked deprecated. Deleted in 12.0.0.
- Not adopted as a gate: "no frame's step over three times its neighbours'" (`INPUT-plate-opacity`). G-2's step bounds (first 4 %, largest 12 %, last 2 % of travel, L-1) bound the same quantity, and a second instrument on one quantity is a duplicate. The judge prints the ratio as a reading on the strip cells.

**RU-49. The sixth pass, what "ready" requires, and what the pass removes. (Matter 8)**

*The order.* On `bl/dock/wi8` from `d50460b34`.
1. **Instruments, before any build.** RU-37's in-page cause in the sampler and the whole-row comparison in the judge; if `rows/m5` already carry the sampler's pointer events, the five timing cells are judged again on them first. `reason` on the `dock:read` mark (RU-38). read5's two stray clauses deleted (RU-40, and its hover clause, which reads the keyboard cell's unfold as a hover: G-6 is `g6.mjs`'s).
2. **One commit of deletions.** `capExtra` and the capped port (RU-39); the carrier's resting offset on a run that fits (RU-40); G-4's inline-size plant and G-1 (f)'s WebKit cell (RU-42); the `it.fails`, restated (RU-41).
3. **Three cures, one commit each, each read on its own cells in both engines.** RU-39's lifted read (the four fit-law sites in three projects, and the sweep). RU-36's seated room change (the lifted-cap cell). RU-38's second sync, after its reading.
4. **Tokens, with strips.** RU-44 (the tier, then the level, then the ink) read by G-15; RU-45 (the share and the two selectors).
5. **Cells that are readings only.** The worded Select triggers RULINGS-4's clarification asked for (one value changed to a longer word, neighbours carried on the clock; MEASURE-5 does not report it). The trigger of an open surface and the rail on touch (RU-43). G-6 on every seat's box (RU-47). G-3's new plant (RU-42). Return-30, twenty times (RU-37).
6. **One whole pass** on one build: every cell in both engines, G-14 in all three projects, every plant, the load recorded per cell.
7. **Strips and the owner's page**: the fold, a layer change, a change of seat set, a seat's hover and press, the seven-seat dock, the glyph share at three values, the plate at three firmnesses.

*Ready for an 11.2.0 build seat* is this list and nothing more, on one build, each gate read at a load of 36 or under, each with a plant that bites in every engine the gate claims:
- G-1, G-2, G-3, G-4, G-6, G-7, G-8, G-9, G-10, G-13 and G-15 GREEN in Chromium and in WebKit 2287 (G-1 (f) in Chromium and by unit; G-13's forced colours and safe area in Chromium alone, as written).
- G-11 GREEN in Chromium by trace, and its rest clause (0 callbacks in 2 s) in both.
- G-12 GREEN (engine-free).
- G-14: no failure in any of the three projects that master's snapshot does not also have, and the dock unit specs with no expected failure of this design's making.
G-5 stays retired. Not required of the build seat: real Safari (the owner's look, before the tag), the names above the seat, the scroll fold, the presets, the deprecation list.

*What the sixth pass removes.*
- The spring on a room change (RU-36), and with it the only cell that could not close.
- `capExtra` and the rebuilt port: a remembered box and two roundings (RU-39).
- The carrier's resting offset on a run that fits (RU-40).
- The second plate tier and its lerp's reason to exist (RU-44), and with it daraksha's ask for a second veil knob.
- Dimmed ink inside a dock: the muted tab ink and the half-strength chevron (RU-44).
- Harness marks as causes (RU-37).
- One dead plant, one engine cell that read nothing, two judge clauses with no ruling behind them, one expected failure that could not pass (RU-40, RU-41, RU-42).
- Three asks struck, not built: a seat-padding knob, a fold by room, a label slot in the run (RU-43, RU-46, RU-47).
The next candidate, if the owner answers question 5 with a rounded rectangle for docks of two rows or more: `fitCurve` (`:575-631`), sixty lines that measure every child against the cap's curve, and the source of RU-30's loop.

## What I did not decide

- Whether return-30 is a fault. The readings taken cannot tell; RU-37 names the reading that can.
- What the fourth layout is. RU-38's cause is a hypothesis with its first reading named.
- The plate's level. The gate picks the first value that passes; I have no reading of the field's luminance.
- Whether 0.9 holds for line glyphs as it does for daraksha's pictures. No frame of it exists; the strips are owed, and the default is the owner's to see.
- Whether real Safari agrees with any of it. Nothing has read it.
- `d50460b34` was read in Chromium only. RU-39 replaces its capped branch, so WebKit's and coarse-touch's reading of the fit law is the sixth pass's.
- The eight O-101 reversal failures at 446 fail on master's snapshot too. They are not this design's and are not in the ready list.
- Which wave builds the names above the seat and the scroll fold. The orchestrator's.
