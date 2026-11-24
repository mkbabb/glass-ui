# BM pass 10: the precept amendments, drafted

These are drafts for the tranche's first wave to apply (DESIGN §14, wave BM-0). Each one names the line it changes, the ruling it rests on, and its text. Under O-426 every choice took its default, and the owner ratified "the design study changes", so each draft below rests on a ratified choice, on an order, or on a law the owner set. None is applied here: `docs/precepts/` is untouched.

Amended by the final fold (`pass-10/fold.md`). Two drafts rested on no ratified choice and no order, and are struck: P0a's exit-curve line (A10-3) and the ceiling's glyph clause (A10-7). `:130` is scoped to a keyed choice (A10-7). P5 names the menu's grow as the owner's (B10-9). The toggle's reduced form rides its 200 ms clock (B10-4). Law 7's line binds a page-thread leg, and the ceiling names the counts over two (A10-6, A10-7).

## motion-canon.md

### P3, the exit clause (pass 9, fold A8-8; choice 11 B)

Today P3 reads: "Every enter/exit pairs opacity WITH scale/translate in the SAME transition … A bare opacity fade with no transform reads flat" (`motion-canon.md:148-154`). P0a rule 3 is the later ruling. Replace it with:

> Every entrance pairs opacity with scale or translate in the same transition. An exit fades where it is: it does not slide or shrink back (P0a rule 3). A sheet leaves the way it came.

### P0a rule 6 (pass 3, fold A11)

> Anything that can come back inside a tenth of a second is a node that stays. A state change turns round on a CSS transition. A body that carries a speed (a release, a settle, a mark retargeted mid-glide) turns round on the settle player, which starts again from the spring's own position and speed; a transition would restart it from still.

### P5, rewritten (pass 2, §4.6; choice 4 B; the goo's clause, pass 9's fold A9-7)

> P5: the compositor's properties. Motion (anything that moves, scales or fades a body) animates only `translate`, `scale`, `rotate`, `transform` and `opacity`. These are the properties WebKit hands to its compositor. `clip-path`, `mask`, `border-radius`, `box-shadow`, colours, SVG children's transforms and every registered custom property run on the page's thread in WebKit. They may carry an effect of 200 ms or less (a reveal, a hover fill, a tint, a glyph), never a body's travel, a scroll-linked change or a breath. The curve must be one the compositor takes in every Safari the library supports: a `cubic-bezier()` or a keyword for a transition, keyframes with keyword easing for a played settle. `linear()` and `steps()` reach WebKit's compositor only from 27.3; this sentence is struck when the library's floor reaches 27.3. Nothing writes a custom property per frame to drive motion. Layout properties never animate.
>
> Two orders the owner gave stand past this rule, each with its length.
>
> - The menu's grow (O-171, 5 November: "every height and width animated, no needless fade"; choice 10's default). A menu, select or popover grows from its button by a clip of its own shape, on `bloom`, over 370 ms on the page's thread.
> - The dock's fusion layer (choice 24 C). While a seat parts from or joins the dock, and through the folded rest, one layer per document may carry `filter: url()` over the two plates, on the 12.0.0 register only. WebKit paints that layer on the page's thread, so the fold's translates under it are painted there too. Its licence is `restraint.md:125-128`, and gate G-7 holds its cost.

The toast's vaporize drives `backdrop-filter` from registered properties (`dissolve.css:60-72`). It is on choice 27's separate line, the owner's, and P5 does not reach it until he rules.

### P6, one line (pass 2, §4.6; choice 8 A)

> A fill's length, such as a progress line's reveal, is an effect, not a body's travel. Under reduced motion it keeps a tween of 150 ms or less on an ease-out, and the universal carve lets it through. A transform that is a state's only sign of place dips: out where it is, landed while hidden, in, 100 ms each way. A choice's mark fades across.

P6's line naming `DarkModeToggle` changes with O-428. Its icon's reduced form is a crossfade of the rays and the night on its own 200 ms clock, with its colour still tweening, enrolled by `data-allow-motion` (DESIGN §9). The clock is 200 ms, not 150, because the crossfade runs on the page's thread, and law 7's line below asks such a leg for 167 ms or more (B10-4).

### P7, amended (pass 2, §4.6; pass 3, fold B-3; pass 4, fold A6)

> The `--spring-*` tokens are generated from `SPRING_PRESETS` as the closest single `cubic-bezier()` that leaves rest at no speed and, on every row but panel, never passes its target (within 2.65 % of the former `linear()`). Panel's curve passes it by no more than its own row's overshoot, 4.21 %, and eases only the spatial morphs the owner ruled. Every entrance rides a row that does not pass its target. A settle that carries a speed is played as compositor keyframes that keyframes.js samples from the same row, and a retarget samples again from the spring's own state. keyframes.js computes; the browser plays. A follow writes `translate` per pointer event and runs no spring. The off-spine set is unchanged; wi8's private integrator is not admitted.

### Law 7's 30 fps line (pass 2, fold B-10)

> A leg on the page's thread runs 167 ms or more, so it shows five frames when Low Power Mode halves the page's rendering to 30 fps. A shorter leg rides the compositor (rules 1, 2 or 4). Whether the compositor itself keeps 60 Hz in Low Power Mode is unread.

Every leg this study adds is listed with its frames at 60 and 30 Hz in `pass-10/access/frames.json`, re-run by the final fold. Every page-thread leg there runs 200 ms. This line measures frames, not the share of a leg's travel drawn in one 30 Hz frame, which no law bounds (A10-3).

## restraint.md

### `:60`, one blur (unchanged by BM)

O-260 sets three content values (4, 6 and 8 px) where line 60 says one. W-R.1 owns that register and puts it to the owner. BM's own surfaces add no blur value: the dialog's veil is the one blur under a modal in 11.3.0 (choice 12 B), and from 12.0.0 chrome samples nothing.

### `:130`, keyboard motion (choice 18 C; P0, the later ruling)

Today: "no motion on keyboard-triggered actions" (2026-11-09). P0 (2026-11-12) asks that every change be tweened, and the later ruling wins (`restraint.md:23`). Choice 18 C kept both lines by reading this one as "no movement" for a choice. As pass 10 drafted it, the line barred a keyed menu's grow, a keyed dialog's entrance and a keyed toggle's glyph, all of which the design moves (A10-7). Scoped to what Q16 asked:

> A keyed choice moves nothing: its mark fades across (choice 18 C). Every other action a key starts moves as it does for the pointer (P0): a menu grows, a dialog enters, the toggle's glyph turns, a slider's ground grows on Tab.

### `:143`, transform and opacity only (choice 27 A: unchanged)

Glass arrives at full strength by `opacity` and `scale`, so line 143 stands. Its exceptions are the ones P5 names: effects of 200 ms or less, and the two orders, the menu's grow (O-171) and the dock's fusion layer.

### The ceiling (choice 19 B; the goo, fold A9-7; the named counts, final fold A10-7)

Add under the table:

> Counting. Two words trading ink count once, as the mark's colour leg. A window with what it reveals counts as one shape, and a crossfade's two legs count as one. When a press opens a panel, the control's held fill waits for the panel to land, so the press stays at two.
>
> Counted so, these run over two, each by an order or as today: the dock's fold, 3, and an open with its seat's split, 5 (choice 19 B's own figures); a dialog's open and its leave, 3 each, as today; the dark-mode toggle's tap, 3, its rays, its night and its colour (O-428); a slider with both a knob and a readout, 3 on a press (O-426). Nothing else does.
>
> Nodes or wrappers added for a motion: 0. The one exception is the dock's fusion layer and the seat's plate inside it (two nodes, `aria-hidden` and inert, mounted only on a dock with a beside seat; choice 24 C).

## affordance-map.md

| Row | Today | Drafted |
|---|---|---|
| DarkModeToggle | `--scale-hover-dock`, `v-specular`, `:active` press | H: the plate (W-B.17) as a fill alone; G: a warm sun drawing its rays in and a cool night carving the crescent, the rays, the night and the colour on one 200 ms clock (O-428); P: the glyph's change, with no press tone, no on fill from `aria-pressed` and no shrink; F: `.focus-ring` and the plate's fill |
| Slider thumb | the halo (`data-held`), the drag-grab | H: the ground grows by g/2 after a 120 ms dwell, and returns on the same 200 ms clock; P: the ground grows by g, and a knob (where a site asks for one) grows by `scale`; D: the track drag; F: a 2 px ring at the grown ground's edge, shown on Tab; the grown ground takes no pointer; thumbless by default (O-408) |
| SegmentedTabs pill indicator | glass plate, tier `::before`, squish-on-travel `--stretch`, `:draggable` | the one mark: a plain capsule moved by `translate`; no lift, no stretch (choices 15 A, 16 A); equal options (17 A); keys fade it across (18 C); drag where the host opts in |
| Every plate | `scale-hover`, the specular | the plate in the control's own tone at the dock's ladder, on two rungs: hover 6.5 % in light and 5 % in dark, on (current, open, pressed) 10 %; the glyph keeps its colour; no drawn shape (choice 5, recommended; DESIGN §6.2) |

## tabs-seam arm (e) (`tests/gates/tabs-seam.test.ts:24-27`)

The owner ruled Q3 A (the mark glides and never lifts) and Q16 C (keys fade it across) by O-426, so the arm's substance stands: no eyeglass, no `--stretch`, no press squish, no capsule hover, no label delay. Pass 10 drafts one change, on that word. The arm also asserts that the indicator's transition list carries `translate` alone, with no `width` or `height` leg (choice 17 A, equal options). Its reduced form is the crossfade.
