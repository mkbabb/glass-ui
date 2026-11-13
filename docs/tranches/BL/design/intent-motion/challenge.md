# W-B.17: the challenge

The challenger (claude-fable-5-2, 2026-11-12) wrote nothing else in this directory. It read BRIEF, the three precepts, `W-B.17.md`, STUDY, PROTOTYPE with its strips and patch, both proposals, OWNER-READ and the records, and then measured on the prototype worktree without changing a file in it.

**How the new readings were taken.** `challenge/probe.mjs` and `challenge/probe2.mjs` serve the prototype's own harness from `.claude/worktrees/bl/intent/proto` (ports 5373 to 5376, the cache in the session scratchpad) and read it at 1440 light. One browser per run, a new context per reading, every run through `guarded`, WebKit through `guarded --exclusive webkit`. Wall-clock readings are one `getComputedStyle` per animation frame. Style overrides are injected with `addStyleTag` at run time. The numbers are in `challenge/data/chromium.json` and `challenge/data/webkit.json`; `challenge/summarize.py` prints them. Shipping Safari is unmeasured here too.

PROTOTYPE's own list of ten failures stands and is not repeated. Where a finding below extends one of them, it says which. Twenty-one findings: eleven on the law, five on restraint, five on Safari and cost.

## The law: what still snaps, or has no start, stop or weight

### C-1. A breathing plate cuts under the pointer, both ways, in Chromium

PROTOTYPE item 3 read the attribute dropping. The commoner case was not a cell: the pointer arriving on the declared idle element, which is the element the view asks the reader to act on.

| `#idle::before` opacity, per frame | before | after |
|---|---|---|
| Chromium, pointer arrives mid-breath | 0.301, 0.306, 0.310 | 0.417, 0.417, 0.417 |
| Chromium, pointer leaves | 0.417, 0.417, 0.417 | 0, 0.00005, 0.0002 |
| WebKit, pointer arrives mid-breath | 0.304, 0.313, 0.318 | 0.323, 0.350, 0.382, 0.402 |
| WebKit, pointer leaves | 0.417, 0.417, 0.417 | 0.393, 0.370, 0.352, 0.332 |

The idle rule's `:not(:hover, :focus-visible, :active)` removes the animation on arrival and restarts it on leave. WebKit hands the value on screen to the transition in both directions and passes. Chromium does not: there, every hover on an idle element is a cut in, and a cut of the whole hover plate out. With PROTOTYPE item 3 (WebKit's busy plate brightens by 0.15 on leaving), each engine fails a different edge of the same rule.

**Amendment.** The breath leaves `plate.css` in its present form. It may return only in a form whose four edges (idle on, idle off, pointer on, pointer off) each pass G-TWEEN in both engines by wall clock, and those four are added as cells. Two candidates, both unmeasured: one Web Animation that the consumer's one idle element starts and that is finished, not removed, when it stands down; or no loop at all, the idle element resting at the hover strength (Apple's default button is a resting fill, not a pulse). Until one passes, R-10 and the busy Button (OQ-3) are out of 11.2.0.

### C-2. Plain presence, turned round at 60 ms, cuts in both directions

The wave gates "a leave at 60 ms" for the glyph and "a second change at 80 ms" for follow. Presence had no such cell. Chromium, `<Presence><p v-if>`:

- Arriving, then told to leave at 60 ms: `translate` reads 1.656, 1.446 px, then `none`. The leave classes list no `translate` leg (`presence.css`, `.presence-leave-active`), so the travel still in flight lands in one frame at opacity 0.83.
- Leaving, then told to return at 60 ms: opacity reads 0.293, 0.224, then 0.000, and `translate` goes from `none` to 2.472 px in the same frame. Vue removes the leaving node when a node of the same key enters, so the mark on screen is dropped and a new one starts from nothing.

WebKit, the same two turns: `translate` 2.280, 1.871 px, then `none` at opacity 0.78; and opacity 0.399, 0.229, then 0.000.

**Amendment.** Add `translate 0s var(--spring-present-exit-duration)` to the two leave rules, the hold the node that stays already has. Rule in the wave that anything which can reverse inside 120 ms (a hover-driven line, validation that runs on each keystroke) is a node that stays, never `<Presence>`; a CSS transition reverses from the value on screen and Vue's cannot. Add "turned round at 60 ms" to G-TWEEN for plain presence, the swap and reclaim.

### C-3. Reclaim turned round at 60 ms

The error line in the twelve-field form, by wall clock, reading the top of the field below it. This is the case of validation that runs as the reader types.

- Arriving, then told to leave at 60 ms (Chromium): the field below reads 434.97, 436.69, 435.94, 434.94 px. It turns round from where it is. This direction holds.
- Leaving, then told to return at 60 ms (Chromium): the field below reads 435.05, 433.52, then **424.53**, 425.67 px, and the line's height reads 9.03, 7.78, then 0.42 px. The half-closed line is removed and a new one opens from nothing, so eleven fields jump 9 px in one frame. That is "growing instantly in height", in the piece written to end it.

WebKit: the first turn holds (437.05, 437.70, 435.20 px); the second jumps the same way, 437.25, 433.83, then **425.91** px, 8 px in one frame.

**Amendment.** As C-2: a line that can come back while it is leaving is not Vue's to remove. Reclaim for a field's error and description line is the node that stays with its block size followed, or `<Presence reclaim>` finishes its leave from the running animation's value when the same key returns. G-TWEEN's reclaim cell gains both turns.

### C-4. A press on a nested control presses its trigger too

PROTOTYPE's G-NEST failure read hover only. `:active` holds on every ancestor as `:hover` does. Chromium, pointer down on the inner edit button of the nested cell: the outer trigger's plate goes 0.417 to 1 and the outer trigger's own `scale` goes to 0.97 on the same frames as the inner one. The inner button's box is 22.58 px wide while held, which is 24 x 0.97 x 0.97. So the edit button shrinks twice and the whole trigger shrinks with it. The owner's ask was that the edit icon shrink (O-284).

The cure works and was read with the rule injected from outside:

```css
.plate:has(:is(.plate, button, a[href], [role="button"]):hover) { --intent: 0; }
.plate:has(:is(.plate, button, a[href], [role="button"]):hover)::before { opacity: 0; }
.plate:has(:is(.plate, button, a[href], [role="button"]):active) { scale: none; }
```

Chromium with it: over the inner button the outer plate is 0, the outer chevron 0 px, the inner plate 0.417 and the inner glyph 1.049; pressed, the inner `scale` is 0.97 and the outer `none`; over the trigger elsewhere the outer plate is 0.417, the chevron 1.236 px and the inner at rest. WebKit with it: the same nine values, to the last digit. Without it WebKit reads the same double press (22.58 px).

**Amendment.** The hover and press rules exclude a control that has a hovered or pressed control inside it, by `:has()` (Safari 15.4). G-NEST gains the press half. The claim in R-6 that resetting the two numbers makes a nested control "answer only for itself" is struck; it answers for itself and its ancestors answer too.

### C-5. A quick click shows no press at all

The press is `:active` and nothing else, so it lasts exactly as long as the button is down. Chromium, pointer already over the control:

| hold | least `scale` reached | most plate opacity reached (rest 0.417) |
|---|---|---|
| down and up together (a trackpad tap) | 1 | 0.417 |
| 60 ms | 0.981 | 0.858 |

WebKit: no hold, 1 and 0.417; 60 ms, 0.985 and 0.784.

A tap-to-click, which is how most Mac trackpads are set, gets no shrink and no tone. A fast mouse click gets under two thirds of it. "It should shrink like a click" is met only by a slow press.

**Amendment.** The press needs a floor: once begun, the down stroke completes before the return starts. CSS cannot hold `:active`, so the floor is `[data-press]`, which the plate already reads and W-R.1 §2.3 already names. The wave must say who writes it and for how long (the press clock, 0.12 s), and G-HIT gains a cell: a click with no hold reaches 0.97 and returns. If that writer is judged too much script for a press, the honest alternative is tone alone and no shrink, and OWNER-READ question 1 should say which he is being shown.

### C-6. The press rule replaces the control's whole transition list

`plate.css` writes `.plate { transition: scale … }` at specificity (0,1,0) in `@layer components`. `transition` is a shorthand, so on any control that already declares one, whichever rule wins erases the other's legs. glass has been bitten by exactly this and wrote it down: `src/components/button/styles.css:89-105`, "the later import replaces the whole list, so on HEAD the button's authored surface legs were simply gone". If `.plate` wins on a Button, its five colour legs become cuts; if `.button` wins, the press rides the Button's own clock by accident. The prototype read the press on a bare harness button with no transition of its own, so the cell cannot see it.

**Amendment.** The press rule is `:where(.plate)` so that it never outranks a component's list, and the wave lists each 12.0.0 control that carries its own `transition` with the `scale` leg written into that list. G-TWEEN's press cell runs on the real Button and the real SelectTrigger, reading every leg they declare.

### C-7. A swap is 320 ms with a blank seat in the middle

`strips/chromium/l1440/presence-swap.png`: the old mark is gone by 103 ms, the new one first shows at 149 ms and settles at 320 ms. PROTOTYPE item 4 gives the blank as about 50 ms in Chromium and 75 ms in WebKit. `restraint.md` checks "hover and toggle feedback at 200ms or less". Play and Pause is the most frequent toggle a consumer has, and it now blinks and takes 1.6 times the limit. A toggle back at 60 ms takes 250 ms to undo itself.

**Amendment.** Icon pairs in a fixed seat (Play and Pause, the checkbox's Minus and Check, the expand pair, the sort glyph) are two nodes that stay, stacked in the one seat, the incoming one delayed by half the exit clock. Out and in then overlap for about 60 ms below 0.5 opacity each, the whole change fits in 200 ms, and a reversal turns round in place. The cost is stated plainly: two nodes at rest where the wave gates one. `<Presence swap>` stays for content whose size differs, where out-then-in is needed. The gate's "never both above 0.05" becomes "never both above 0.5", with a strip beside `kf-play-click-step50ms.png` to show the ghosting he disliked is not back.

### C-8. Follow tweens the box and cuts what is in it, with one clock for every distance

- `strips/chromium/l1440/follow-cmd.png`, second frame: 49 rows are gone and the panel is still 372 px tall. The size is tweened; the content change is a cut, and for five frames the reader watches an empty panel close. Under reduced motion PROTOTYPE already reads "the 50 rows become one row with no fade".
- The clock is `present`, 0.2 s, whatever the distance. The plate's 2.7 px and the panel's 288 px take the same time. At the curve's steepest (0.171 of the travel per 60 Hz frame, PROTOTYPE's table) the panel's edge moves 49 px in one frame. P0 says "larger surfaces move later and longer". The owner's complaint in BRIEF was page changes "arriving fast".
- It does not stop: the curve is cut at its 2 % band, so the last frame is a 7.3 px step (PROTOTYPE, the frame-delta notes).
- It keeps no momentum: interrupted, its speed goes from 20 px a frame one way to 4 px the other between two frames (PROTOTYPE item 7). The wave says so itself.
- No strip shows a box whose width follows wrapped text. With `inline-size` tweened, the lines re-break on each frame. The one width case built (the select trigger) never ran.

**Amendment.** Follow's duration scales with the distance between two existing tokens (the `present` clock under about 40 px, a surface clock above it), and its curve ends inside half a pixel for the distance it is given. The rows inside a followed box fade as presence nodes or the list is a node that stays; follow alone is not a cure for row 4. A reversal that returns to the origin reverses the running animation instead of starting a new one. A strip of a tooltip or popover with wrapped text is owed before the "dialog, popover or tooltip whose content changes" row is claimed; if the lines re-break, width is not followed and only block size is.

### C-9. The draw breaks the curve, twice, and does not answer a click

`strips/chromium/l1440/glyph-draw.png`: at 57 and 86 ms the curve is two pieces with three tenths of it missing. On the way out it breaks again at 57 and 86 ms. Three things are wrong with that.

- It reads as a fault in the icon, not as a line being drawn. He asked that the curves "deftly and subtly animate".
- The out is paint spent on nothing. The dash pattern at offset -1.3 is the same picture as at 0, so the way back could be no transition at all and not one pixel would differ at either end or between.
- "The curve should animate in the dropdown icon on click, too." The offset is `max(--intent, --intent-set)`. With the pointer already on the trigger that is 1 before the click and 1 after, so on a fine pointer a click moves nothing. Only a pick does (the swap).

**Amendment.** Show him two strips before the default is taken: the gap at 0.3 as built and at about 0.12. Drop the return leg (`transition` on the hovered state only; G-TWEEN reads it as a change that paints the same at both ends). Give the open state its own pass, by adding the two numbers instead of taking their larger, so a click draws once more.

### C-10. A flipped chevron nudges against the way it points

`translate` is applied outside `rotate`. Chromium, the chevron cell: closed and hovered the glyph moves down 1.236 px (box top 305.5 to 306.74), which is the way it points. Open, turned 180 degrees and hovered, it moves down 1.236 px again, and now it points up. "Moves 2 px the way it points" holds for half of every chevron's life. WebKit: the same four readings.

**Amendment.** One `transform` on the glyph, written rotate first and translate inside it, so the nudge turns with the glyph. This is the same change C-17 asks for on cost.

### C-11. Busy has no mark of its own

`strips/chromium/l1440/plate-busy.png`: a busy Save button is the pressed plate dimming to the hover plate and back over 1.1 s. At its peak it is pixel for pixel the "on" state and at its trough the hover state. Under reduced motion the breath does not run (PROTOTYPE, G-PRM), so busy and pressed are the same picture with nothing to tell them apart. The law's last clause is that elements "communicate progress, loading, and intent". With C-1, the breath also cuts on entry and exit.

**Amendment.** Where the Button has a leading glyph, busy is a swap of that glyph for the DotRing in the same seat: no width change, a mark that reads as work, still legible when nothing moves. A Button with no glyph keeps its label and takes the ring by OQ-3's second form. OQ-3's strip to the owner shows this beside the breath, not the breath alone.

## Restraint: what is more than Apple would use, or reads as made by a machine

### C-12. The plate is not the thing he liked, and at its strength it is not there

`prototype/icon-bar-vs-owner-chromium.png`, pixels sampled from the file:

| | plate | host | largest channel difference |
|---|---|---|---|
| his frame (Google Chat) | 249, 221, 198 | 241, 244, 249 | 51 |
| glass, light, hover | 236, 230, 222 | 238, 236, 234 | 12 |
| glass, dark, hover | 33, 26, 19 | 24, 22, 21 | 9 |

The harness gave the pin a tone of its own (`--plate-tone: oklch(0.65 0.16 55)`), and it still reads 12 of 255, because hover is 0.42 of a 12 % fill. G-BARE counts a pixel as changed over 48. By the wave's own instrument a hovered plate on a filled bar is no change.

What he named was three things at once: a coloured plate, a shape, and a glyph that fills and takes the plate's colour. R-4 struck the shape, R-6 struck the fill, and the strength struck the colour. What is left grows 2.7 px in grey. That is restraint with the intent removed, and the law's first words are "communicate intent first with hover states, design affordance with color".

**Amendment.** OWNER-READ question 2 does not default by silence on this evidence. It carries one image: his frame, the plate as built, the plate at the selected strength with the seat's tone and the glyph's `color` tweened to that tone (one paint leg on a 20 px box, which Google ships), and one shaped plate. A shape need not be markup: a static `clip-path` or `mask` on the pseudo-element from one custom property, never animated, with `scale` and `opacity` still the only legs. Whichever he picks, G-BARE's threshold and the hover strength are set so that a hover the gate cannot see cannot ship.

### C-13. Three animations for a hover whose motion cannot be seen

A plain icon button on hover runs plate opacity, plate scale and glyph scale. The glyph's grow is half a pixel a side at 20 px; PROTOTYPE's own words for the strips are "barely there", and `plate-hover-g16.png` shows no difference between the first and last glyph. A motion nobody can see is cost with no intent, and it is the leg that stays on Chromium's main thread (C-17). Apple's hover on an icon button is a fill that fades.

**Amendment.** One of two, chosen by strip, not both: the plate grows and the glyph is still (the default, Apple's), or the glyph's verb is the motion and the plate is a fill (R-3 already says this for named verbs). The default grow on every `.plate > svg` is struck. Grow stays as a named verb at an amount that reads (OQ-4's 0.13), for the seats that ask for it. That takes a hover to two animations and removes one rule.

### C-14. "On" is marked twice where another piece already marks it

The plate's full-strength list includes `[data-state="active"]`, `[aria-current]` and `[aria-expanded="true"]`, and "Where glass uses the pieces" puts `.plate` on rows and tabs. A tab strip already has the travelling indicator (R-5 keeps it), so the active tab would carry a 12 % fill under the pill, and on a change the fill cross-fades while the pill slides: two marks and two motions for one state. An open accordion or collapsible row would hold a 12 % fill for as long as it is open, beside a chevron that has already turned.

**Amendment.** Hover, focus and press are every plate's. The persistent "on" fill is for controls with no other on-mark (a toggle button, a menu trigger while its menu is open). Tabs under an indicator and disclosure rows are excluded in the rule itself, and the cell for each reads one mark.

### C-15. Four spellings and two numbers on every control on the page

- Grow is written three ways (`.plate > svg`, `data-glyph`, `data-glyph="grow"`), and the harness needed a fourth value, `data-glyph="none"`, that the wave does not define (PROTOTYPE, "Where the build left the text"). Any unknown value silently turns the plate into a fill.
- `glyph.css` sets `--intent` and `--intent-set` on every `button`, `a[href]`, `summary` and six roles in a consumer's page, whether or not a glyph is near. It is zero specificity and cheap, but it is glass writing on elements that never asked.
- The surface is one class, five attributes (`data-glyph`, `data-presence`, `data-absent`, `data-idle`, `data-press`), nine custom properties, one component with two props and one function. BRIEF asked for few.

**Amendment.** With C-13, the glyph's values are the three named verbs plus grow, one spelling each, and `none` is defined or the harness case is solved another way. The two numbers are set on `.plate` and on controls that contain a `[data-glyph]`, or the wave states the page-wide rule as a default atlas and the others are told of at booking.

### C-16. The plate's corner on a bordered control

`inset: 0` places the plate on the padding box, and `border-radius: inherit` gives it the border box's radius. On any control with a border the plate's corner is rounder than the inner edge it sits against by the border's width. It is a small thing and it is the kind of thing Apple does not leave. **Amendment:** the cell for a bordered control (the outline Button, the SelectTrigger) is a crop at 4x, and if the corners are not concentric the plate takes `inset: calc(-1 * border width)` or the inner radius.

## Safari and cost

### C-17. The glyph's leg is the one Chromium keeps on the main thread, and the cause is the property

PROTOTYPE item 8 left this unisolated. Chromium trace, hover in on the 44 px seat, 350 ms window, style recalculations on the main thread:

| what runs | recalcs |
|---|---|
| as built (plate and glyph) | 25 |
| the same with bezier curves in place of `linear()` | 25 |
| plate alone, both legs | 14 |
| plate alone, opacity; plate alone, scale | 8; 7 |
| glyph alone, as built (`scale` on the `svg`) | 24 |
| glyph alone, `transform-box` changed, or `will-change: scale` | 24 to 26 |
| glyph alone, `scale` set by a plain `:hover` rule, no custom property | 25 |
| glyph alone, written as `transform: scale(…)`, driven by the same `--intent` | 8 |

The curve is not the cause and the inherited numbers are not the cause. An individual `scale` on an `svg` element is ticked on the main thread every frame; the same motion as `transform` is not. `translate` and `rotate` on the glyph are the same class (PROTOTYPE reads the nudge at 25 recalcs). WebKit has no counter, so which way it goes is unread.

**Amendment.** The glyph declares one `transform` and one transition leg instead of three individual properties and three legs. That fixes C-10 in the same line and takes G-RESTRAINT's glyph row from 3 legs to 1. G-COST gains the reading above as a cell: 10 or fewer recalcs in a hover.

### C-18. `linear()` on the compositor in Safari is unread, and the hover does not need it

Every spatial leg rides `--spring-present`, a `linear()` list, which sets the floor at Safari 17.2. The curve's largest value before 1 is 0.9755: it does not overshoot, as `restraint.md` requires of a control, so on a 2.7 px travel it is an ease-out by another name. Whether WebKit hands a `linear()` leg to its compositor or runs it on the main thread is unmeasured anywhere in this directory, and hover is the most frequent change in the library.

**Amendment.** Either the owner's Safari glance (OQ-6) includes one reading of the plate's hover in Web Inspector's timeline, or the hover legs (plate, glyph) take `--ease-out` over the same clock and keep the spring for presence and follow, where a distance is travelled. P1's "spring iff spatial" then needs one line saying a hover plate's 3 px is an effect.

### C-19. Follow and reclaim are layout in every frame, inside budget by 6 % on plain markup

BRIEF's fifth point is "no layout per frame". Follow lays out 26 times in 26 frames and reclaim 27 in 27 (PROTOTYPE, G-COST). The reclaim reading is 0.94 ms against 1 ms, on twelve bare inputs. The real row is `LabeledField` in a glass sheet or dialog, where each field below the line also repaints on a blurred host (51 paints in 27 frames already on the bare form). WebKit, the engine the brief names, has no reading at all; in this seat's one WebKit run of the reclaim leave, the frame log has a gap of 197 ms between two frames at its end (`challenge/data/webkit2.json`, 172 to 369 ms), read once and unexplained. And `motion-canon.md` P5 enforces its rule with a proof that scans `@keyframes`, `transition` declarations and Vue recipe classes; an `el.animate({ blockSize })` in script is outside what it reads, which P5 calls a silent escape.

**Amendment.** Before reclaim ships: the reading retaken on the real `LabeledField` inside a `glass-floating` surface, in Chromium by trace and in WebKit by frame pacing (the share of frames over 20 ms across the 200 ms). A margin of 6 % is treated as over. If it fails, the error line's seat is reserved and the line is a node that stays, which costs nothing and cannot push. `proof:no-layout-animation` learns to read size keys in `.animate(` calls, with follow as its one allowlisted row.

### C-20. A tap in Safari, and what the cure touches

PROTOTYPE failure 4 stands: WebKit applies `:active` on touch only where a touch listener exists. The cure is one passive `touchstart` listener on the document, or the `[data-press]` writer of C-5, which cures both. Either is script the plate was promised not to need ("no script, listener or observer"), and G-REST's grep reads only `presence/`. **Amendment:** the wave names the one writer, where it is installed and by whom, and G-REST's grep covers it.

### C-21. The check passes a cut that is given two frames

G-TWEEN's step clause compares each leg with its own curve (PROTOTYPE failure 9). Read on the planted case, Chromium, the plate and glyph of the 24 px cell with their transitions set to `20ms linear` and then `34ms linear`:

| leg | frames sampled | largest step, share of travel | verdict |
|---|---|---|---|
| 20 ms | 3 | 0.834 | pass, no findings |
| 34 ms | 4 | 0.490 | pass, no findings |

WebKit: the 34 ms leg passes the same way (4 frames, 0.490). The 20 ms leg fails there, but only because the sampler did not catch an animation that short before it ended and so called it a cut with no animation; the clause under test never ran.

A change that lands 83 % in one frame passes the helper that atlas will run on its own pages. Any consumer can turn a cut green with `transition: all 20ms`.

**Amendment.** `judgeChange` gains an absolute clause beside the relative one: no leg moves more than 0.4 of its travel between two 60 Hz samples, and a leg has at least five samples. The plate's 0.339 and presence's 0.388 pass it; 0.49 and 0.83 do not. G-EXPORT's plants gain this one. G-BARE's 48 is replaced by a threshold that can see the plate that ships (C-12).

## Read and found sound

- No piece adds a node. Counted in the patch and in PROTOTYPE's G-COST: the plate is one pseudo-element, `<Presence>` renders nothing.
- No shadow, gradient, blur or filter in any of the three partials.
- The plate's own hover, in and out, is clean in both engines: one declaration, reversed in place, the fade ahead of the growth.
- The node that stays is the strongest piece here: no script, reverses from the value on screen, holds its travel through the fade. C-2, C-3 and C-7 each ask for more of it and less of Vue's transition.
- R-9 (authorized fades, the universal rule kept) and R-5 (the indicator left alone) are right as ruled.

## What the orchestrator is asked to do

1. Strike the breath (C-1) and the default glyph grow (C-13) from 11.2.0 as written.
2. Take the one-line cures into the patch: the leave hold (C-2), the `:has()` exclusions (C-4), `:where(.plate)` on the press (C-6), one `transform` on the glyph (C-10, C-17), the draw's one-way leg (C-9), the absolute step clause (C-21).
3. Put four things to the owner by strip, not by default: the plate beside his frame at a strength that shows (C-12), the swap that overlaps (C-7), the draw's gap (C-9), busy as a ring in the glyph's seat (C-11).
4. Hold follow and reclaim behind the readings in C-8 and C-19, and name the press writer (C-5, C-20).
