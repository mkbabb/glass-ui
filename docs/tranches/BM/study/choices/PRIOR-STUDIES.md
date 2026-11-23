# Earlier design studies, marked

Written 2026-11-23 by one Opus seat (claude-opus-5-5), after the reboot, for Mike's question of that morning: "What of our previous design studies, like our google motion one a few days ago, mark." It covers every folder under `docs/tranches/BL/design/`. The Google motion study is the first section.

Each study gets one mark:

- **landed**: what it set out to do is in a published release (11.0.1, 11.0.2 or 11.1.0) or on the live demo site;
- **partly landed**: some of it shipped and the rest is still to build;
- **decided but not built**: the design is settled (by you, by your delegate, or by a default you can still reverse) and none of it has shipped;
- **open**: a question only you can answer holds it, and at least one has no default or holds the release;
- **superseded**: a later order or design replaced it.

Two releases are not out yet: 11.1.1 (closing now, about how popups leave) and 11.1.2 (the patch after it). Anything booked there has not landed. No reading in any study is from an iPhone or from Safari itself: every "WebKit" number is Playwright's WebKit build, which also draws no blur.

Each section ends with its sources: paths under `docs/tranches/BL/` unless they start elsewhere, and commit hashes, for whoever builds the choices page from this file.

## The marks at a glance

| Study | Began | Mark | What waits on you | The new glass study (22 Nov) |
|---|---|---|---|---|
| Intent-first motion (Google Chat's icon bar, Material 3 Expressive, Apple) | 12 Nov | **open** | The hover plate's strength and shape: a, b or c, with no default. Four more with defaults: the press shrink, the focus ring, how things leave, idle | Builds on it |
| The dock redesign (the 14-pass collapse study, then the one-dock redesign, nine passes) | 23 Sep; redesign 9 to 14 Nov | **open** | 22 questions, all with defaults; the dock's code is 439 lines over its budget, so 11.2.0 waits until you name what to drop or let the apps' deletions count | Builds on it; one conflict on the dark dock's plate |
| The Apple Home View carousel | 15 Oct | **open** | Three questions with recommendations and no default: the entrance spring, one card per flick, the dots' length in flight; and where seven carousel pieces should go | Leaves it to you |
| The Slider | 11 to 12 Nov | **partly landed** | Its three questions were overtaken by your 19 November orders (no visible thumb); finer travel is still open | Builds on it |
| The pager dots | 11 to 12 Nov | **partly landed** | "Like apple and google": the same three dot questions as the Home View study | Leaves it to you |
| Depth and parallax | 14 Nov | **decided but not built** | Six questions with defaults; the amount is one to judge by scrolling | Untouched |
| The text mark (underline and highlight) | 11 Nov | **decided but not built** | Four questions with defaults | Untouched |
| The specular dot | 15 Nov | **decided but not built** | Five questions; the defaults were taken and can be reversed | Agrees |
| The engagement register (how every component answers) | 17 Jul edict; study from 26 Sep | **decided but not built** | One question with a default: does a held control glide or move with the page | In conflict on three points |
| The glass material | 23 Sep; your lighting words 6 Oct | **decided but not built** | Two confirmations and one optional question; its blur row was replaced by your low-blur word of 11 Nov | Folded in |
| The selectable tile | 23 Sep | **decided but not built** | One question with a default (nothing travels between tiles) and a capture of Apple's option cards | Untouched, and consistent |
| The file layout (colocation) | 23 Sep | **decided but not built** | None; the driver's rulings stand unless you override one | Untouched |
| The demo site, glass.babb.dev | 15 Nov | **landed** | Seven questions with defaults, already built on them, and one on the code font's fetch | Untouched |
| The fission dock cluster | 9 Nov | **superseded** | None of its own | Takes up the fusion question again |

Two audits are not in this list because they live under `audit/`, not `design/`: the frame-by-frame animation audit of 12 November and the exits audit of 15 November (now the 11.1.1 patch).

---

## 1. Intent-first motion (the Google motion study)

**Began.** 2026-11-12, 11:40, with your frame of Google Chat's icon bar (four outline icons on grey plates, the hovered pin on a peach, soft-cornered plate). Your words:

> "I really like the google icon animations, which have svgs that grow, morph, and animate in and out smoothly on hover. Perform a design study on the google websites, apple websites, heretofore mentioned design websites ... --record, analyze, and suffuse small design elements like this into glass-ui."
>
> "items that grow smoothly from BEGINNING TO END with START AND STOP animations in and out--this is critical. Growing instantly in height or other states is not acceptable ever--all items should be tweened."

And minutes later: "NO overuse of shading, transition, or markup--this is an AI smell. Have touch like apple." The study ran the same day and was done at 22:48.

**What it proposed.** Three recorders measured Google (Chat, Material 3 Expressive), Apple's sites, the design references (emilkowal.ski, rauno.me, family.co, benji.org) and keyframes.babb.dev. Google's hover is a flat plate that starts at four fifths of its size and turns into place over half a second; Apple's is one or two properties on one node. Both cut where your law forbids it (Google on every leave). The study proposed a few small pieces, each removing more than it adds:

- a hover plate that grows from the control and fades, the same way in and out;
- an icon that answers with one of four moves (grow, nudge, turn, draw), dropped onto any icon with one attribute and no wrapper;
- presence: anything that comes or goes, height included, starts and stops;
- one press: buttons and icons shrink evenly to 0.97 and back in about a tenth of a second, no bounce, no inset shadow;
- a 100 ms focus-ring fade;
- leave rules: a hover leaves the way it came, a thing that appeared leaves in about half the time, and two icons that trade places (play and pause) cross over;
- a reduced-motion fade, and a no-snap check sites can run on their own pages.

A box that follows its content (and two pieces like it) was built and held until its cost is read on real components. Building cut the design down: the pulsing idle and busy plate jumped in four places and was dropped, and the icon's default grow could not be seen and became one named move. Releases planned: the plate, the icon moves, presence, the focus ring, the fades and the check in 11.2.0; the press and the busy Button in 12.0.0.

**What you chose.** No answer to the study's five questions is recorded: the owner page has no reply, and the spec still lists the press, the plate, the busy Button and idle as yours. Your words since then that bear on it: on 12 November at 17:05 dock icons should be "a bit more flat in color, not shaded so much and AI-like, and have text labels"; at 21:20 a name that shows on hover. The law you set that day is in the precepts (below).

**What landed.**

- The precepts: your tween law the same day, and the study's measured grammar of motion, the plate and icon vocabulary, the restraint ceiling and idle for large elements the next morning.
- 11.1.1 (not yet released): reduced motion is a fade on every popup, sheet, dialog and the dock's fold, never a cut, and a site's own fade keeps its clock. That is this study's reduced-motion fade, built in the patch from the same reports (atlas's, Gregg's and the animation audit's).
- The prototype is banked on its scratch branch. The plate, the icon moves, presence, the focus ring and the no-snap check are in no release. The release index has no row for this study, so 11.2.0's list does not carry it yet.

**Still open.**

1. **The plate: a, b or c, or say what is missing.** a is the plate as first built (a 5 % grey fill); b is the plate at full strength in the seat's own colour, the icon taking that colour; c is b with a soft shape. **No default: the plate waits for your pick.**
2. **The press.** Default: yes on buttons and icon buttons; cards, rows and large surfaces answer by colour alone. On a yes, the 12.0.0 restraint release's "no press scale" rule is amended.
3. **The focus ring.** Default: a 100 ms fade in and out, no swell.
4. **How things leave.** Default: adopt all three rules.
5. **Idle.** Default: the one element a view asks you to act on rests at hover strength; no pulse.
6. By strip, each with a default: a busy Button shows its dot ring in its icon's seat (as written); the gap that draws along an easing curve is 0.12 of the path; the play and pause cross-over as built; one look in Safari at the close, not a release blocker.

**With the new glass study.** Builds on it. The new study's selection shape carries this study's "on" fill at the strength you pick (it assumes the built 0.12 until you do), every option keeps this study's hover, focus and press, a trigger keeps its fill while its menu is open, and menu rows keep the plate without the old lift. Two of the new study's questions would amend this one: what a press on a selection looks like (a lift, or the plate's tone), and whether the selection glides under the keyboard, which this study keeps still. One tension to read before either builds: this study's held pieces tween a box's size, and the new study refuses size changes for a glass shape.

Sources: `design/intent-motion/BRIEF.md`, `STUDY.md`, `OWNER-READ.md`, `challenge.md`, `fold.md`; `waves/W-B.17.md` (open questions at the end); `audit/INBOUND.md` rows O-278, O-284 to O-287, O-290, O-308, O-332; precepts `d5fb05c` and `76bf0fb`; 11.1.1 `faf12109d`, `5d1467b77`, `9f9719c76`, `6231b371e` on `release/11.1.1`; prototype `16b94912f` (`bl/intent`); git log 2026-11-12 to 11-13 (`e72a7f3b8` to `890e2d0a6`); new study `BM/study/DESIGN.md` §2.1, §3.9, §6.4, §7.2.

## 2. The dock redesign

**Began.** Twice. The collapse study opened with the tranche on 23 September; your words on 6 October: "the shrunken and dock animations, and all facilities thereof--are still broken in the demos. Mark and communicate." The redesign grew from your orders of 9 to 14 November:

> "We should likely have ONE dock, not two, with layers of controls." (9 Nov)
>
> "ALL dock animations should be well defined in animating, not just telporting and instantly changing, the heigth and width" (11 Nov)
>
> "Rounded." (9 Nov and again 13 to 14 Nov)

**What it proposed.** The collapse study ran fourteen passes and closed on 10 November. It handed the redesign its carrier: one body that steps every part of the dock on the dock spring, the plate moved with no scale, its edge the only clip. Its content exchange was not built. The redesign has run nine build-and-measure passes since 13 November. What you will see when it ships, by its owner page: rounded in every frame; width and height glide together; the old controls fade under the closing edge and the folded face fades in after them; the dock stays 6 s after you leave (3 s for a controls dock); a scroll never opens it; a press elsewhere closes it; a menu or dialog opened from the dock holds it open; a layer change is one movement; a small round controls dock for a page's own controls; names above icons on hover; icons at nine tenths of their seat; a firmer plate; 17 names no site uses deleted. The theme toggle ships as its own round dock in 11.2.0; fusing waits for 12.0.0.

**What you chose.** "ONE dock", "Rounded.", a longer dwell (12 Nov, 21:48), icons "2x bigger with not so much padding" and "the dock is a bit too transparent. Smooth out the animations" (both 15 Nov). None of the 22 questions on the owner page has an answer, and the collapse study's one question (the content exchange or the timed fade) took its default, the fade. Recorded in `audit/INBOUND.md` and `~/.dev-logs/owner-1112/ORDER.md` (the 25th and 26th orders).

**What landed.**

- 11.0.1: the squared end cured at rest and folded.
- 11.0.2: several dock cures from the sites' measurements.
- 11.1.0: the dock rests as a capsule; a collapsed dock can show a glyph with a short reading; the selected tab glides; the reading-progress rim follows the edge.
- The redesign itself is on its branch and is not ready for 11.2.0. Pass 9 stopped partway on the kernel memory and resumed after this morning's reboot. Its reds: the dock's code 439 lines over 11.1.0's; a dock page 299 bytes heavier; a few extra layout passes when a dock opens; two older-release tests that fail; some buttons that still jump; a few ends short of round.

**Still open** (each default holds unless you say otherwise):

1. Theme toggle as its own round dock, fusing in 12.0.0 behind a Safari test: yes.
2. Names above the icon on hover and on press and hold, nothing shifting: yes, with the Tooltip work.
3. How long the dock stays: a fixed 6 s, 3 s for a controls dock.
4. A figure's controls dock opens whole: yes.
5. A folded card or rounded dock becomes a 56 px circle; taller docks keep 11.1.0's corners.
6. The edge (three hairlines, one white) and the soft shadow: keep both, and decide the rim for all glass at once.
7. Between two layers: out, then in (the dip), not a dissolve.
8. The current page's name leaves the dock; names show above: yes.
9. Icons at nine tenths of the seat on every site: yes.
10. A firmer dock: the third of five steps in dark (its blur drops to 11.2 px), the first in light.
11. When a page changes the dock's room, the dock follows at once: yes.
12. Delete the names no site uses in 11.2.0 (78 against 11.1.0's 80): yes.
13. A name after a tap on a phone: no, press and hold only.
14. A dock in a row with other things: no change in 11.2.0 (atlas moved its figure docks to the head row).
15. A dock with one always-shown button: in 11.2.0 a dock opens to one side only where a site asks; a yes makes "open away from that button" the rule in 12.0.0 (amended, `RULINGS-6.md:337`).
16. A cue for icons past the edge on a phone: none.
17. Big icons beside words: nine tenths of the seat for an icon-only seat, 21 px beside a word (amended, `RULINGS-6.md:339`).
18. Hover against the current page's highlight: as built (6.5 % in light, 5 % in dark, against 10 %).
19. A dialog opened from the dock: the dock stays its usual pause after: yes.
20. The controls dock on a desktop rests folded, icons at half the button: yes.
21. The selected tab in dark: keep the glass and every name readable; where a name cannot reach 4.5 to 1, the faintest highlight that still reads, and those docks named.
22. **The dock's code budget.** Default: keep every behaviour, and **11.2.0 waits** until the count is met, until you name what to drop, or until you let the apps' 425 lines of deletions count against the dock's growth.
23. One look at any dock page in Safari on your phone.

**With the new glass study.** Builds on it: the new study lands after 11.2.0 and leaves this pass undisturbed. It would replace the dock run's highlight with its one selection shape, the fold's per-frame size and corner writes with a capsule window, and the theme seat's start with a seat born under the dock. One conflict: in this redesign the dark plate's firmness also lowers its blur (question 10), where the new study keeps firmness apart from blur, and your low-blur word sets the dock's blur for 12.0.0. Both designs clip the controls while a fold runs, which the precept "nothing clips" forbids; the new study puts that to you as an amendment.

Sources: `design/dock/LANDING.md`; `design/dock/wi8/OWNER-READ.md` (questions 1 to 22, working copy with the 22 Nov section), `MEASURE-9.md`, `RULINGS-8.md`, `ORCH-LINES-8.md`; `waves/W-I.8.md`; `audit/INBOUND.md` rows O-88, O-199, O-200, O-202, O-248, O-275, O-301 to O-304, O-340, O-368, O-370; 11.1.0 `72f2d5ec5`, `1263cd5cf`, `6dc977fe2` (tag `v11.1.0` @ `d19e12559`); branch `bl/dock/wi8` @ `d48c19ec8`; `FORMATION-PROGRESS.md` 2026-11-22 15:50 and 11-23 10:16; new study `BM/CHARTER.md`, `DESIGN.md` §3.9, §6.3, §9.

## 3. The Apple Home View carousel

**Began.** 2026-10-15, in session:

> "Ensure, that we suffuse and properly have carousel elements and animations like on: https://www.apple.com/apple-homeview/ Like the dock carousel animation therein, mark and analyze it highly scrupulously, frame by frame. Ensure our other glass elements are superior or match items like this. Goo. Breath of life. Movement of momentum."

It converged the next day after nine rounds of critique.

**What it proposed.** A frame-by-frame record of Apple's page and a gap report against glass's carousel, pager dots and dock. Apple's dock rises once on a spring with a visible bounce, buds its button, and slides its dots; its active dot rests as a capsule six times a dot's width and lengthens with the scroll. glass had no entrance, a worm whose bar drew hundreds of pixels long, and an indicator that ignored the scroll. It found a real defect: a carousel moved by its model never scrolled. It routed fixes to existing waves and proposed ten carousel pieces: keep the deck and its model in step, a media dock with a transport button, the dock's one-time entrance, a resting capsule for the active dot, an indicator that follows the scroll, autoplay with a progress fill, and four smaller ones.

**What you chose.** Nothing yet. The three questions and the placements were "owed to the owner" on 16 October and are still unanswered.

**What landed.** One gap: 11.0.2 fixed the worm's bar (it read its dot size from the token's text, so `.75rem` counted as 0.75 px). The carousel defect and the routed fixes sit in waves that are not yet placed in a release.

**Still open.**

1. **The entrance spring.** Recommended: a new, fired entrance spring with a visible bounce, like Apple's. No default. Since then your restraint precept (9 November) has ruled out overshoot on an enter, so a yes now amends that precept.
2. **One card per flick, or a landing chosen by speed.** No default.
3. **The dots' length in flight.** Recommended: the total length holds at rest and under a held scrub, and the active dot may stretch with its speed in flight, back on the rule when it lands. No default.
4. Where the seven carousel pieces with no home should go.

**With the new glass study.** Untouched. It proposes nothing for the dots and leaves them to you beside this study.

Sources: `design/reference/apple-homeview/STUDY.md`, `GAP.md` §4 and §5; `audit/INBOUND.md` row O-95; 11.0.2 `065ae4240`; git log 2026-10-15 to 10-16 (`5e9f70dd1` to `5a6aa79cb`); new study `BM/study/DESIGN.md` §3.9 (the dots row), §8.5.

## 4. The Slider

**Began.** Four notes, 11 and 12 November:

> "sliders likely need a expanded granular view re-write, with popup animation that enlarges the slider to interact with it, animating in and out, and shrinking when not interacting with it." (11 Nov)
>
> "the granular UI sldier from glass-ui is not rounded properly--study the chatgpt app's screenshots and ios27 items for more information. Think of it again from first principles in glass-ui." (12 Nov, 11:50)
>
> "the glass-ui slider thumb should be more filled to the slider, taking up the full height" (12 Nov, 12:05)

The study ran the same day.

**What it proposed.** One geometry rule: the track, the fill's end and the knob are circles of one size on one line at every value. The knob fills the band's height. The fill is the colour of the text beside it at full strength. The knob takes the page's colour. The magnifier and the frost behind a held slider go. The expanded view: on a press, on Tab or when the mouse rests, a rounded shell grows out of the track, the knob grows inside it, and the value shows above while you change it. It is bigger, not finer. Planned: the geometry in a patch, the expanded view behind a setting in 11.2.0, then the default in 12.0.0.

**What you chose.** The three questions (knob colour, the light theme and colour slider's ring, bigger not finer) have no reply. Your later orders overtook the knob. On 19 November: "the thumbs should not be so fully rounded--though they should be capped and invisible, like your's just pulling the track". The same evening you said "yes" to a thin capped line for colour ramps. Both are in `~/.dev-logs/owner-1112/ORDER.md` (the 42nd and 43rd orders) and placed in 11.3.0.

**What landed.** 11.0.2 (15 Nov): one height and one radius, so the thumb fills the track and every end is concentric; the colour slider's handle became a ring; the held magnifier and its frost became opt-in; a thumb colour token; a focus outline under forced colours. One difference from the study: the release paints the thumb in the text colour, not the page's colour, so it reads on the track at the minimum.

**Still to build.** No press squash on the held fill (11.1.2); no visible thumb by default and the thin line for colour ramps (11.3.0); the expanded view (moved to 11.3.0); the slider no longer mounting the magnifier at all (release not set).

**Still open.**

1. The knob's colour: overtaken by the thumbless default. daraksha styles its own knob on purpose, and the thumbless default removes it there; that is being asked of daraksha.
2. The fill in the text colour on a grey track in light: moved to 11.3.0 with the thumbless form.
3. Finer travel. Default: the view ships bigger, not finer, and finer travel stays its own piece of work.
4. Three lines on a held slider disagree: a 1.06 grow in the 12.0.0 restraint release, "no held transform" in 11.1.2, and the knob growing in its shell. They need one answer.

**With the new glass study.** Builds on it. The new study credits every removal to this one and sides with removing the magnifier. It proposes that the 1.06 held grow goes, that a stepped slider travels a step at each boundary instead of jumping, and it asks whether the expanded view's colour and clip changes could be opacity changes, since they run on the page's thread.

Sources: `design/slider/OWNER-READ.md`, `MEASURE.md`, `challenge.md`, `fold.md`; `waves/W-B.18.md` (open questions at the end); `audit/INBOUND.md` rows O-254, O-273, O-280, O-283, O-408; `audit/triage-1119/PLACED.md` lines 28 and 42; 11.0.2 `0e3cbfb3d`, `a671920c6`, `64b280711`, `a427be012`, `3aa871c28` (tag `v11.0.2` @ `c0f09570d`); branch `bl/slider/proto` @ `fe30f9882`; new study `BM/study/DESIGN.md` §8.2.

## 5. The pager dots

**Began.** 2026-11-11, 13:40: "the glass-ui dots need refinement in animation--they're jerky, and teleport." And 2026-11-12, 17:14, with daraksha's slide dots: "the glass-ui dots transition for slides is not right and turns into a giant rectangle. This needs to be like apple and google--refer to our design study."

**What it proposed.** The folder holds only your frame. The cause was traced the same evening: the worm read its dot size from the token's text, so its bar stretched about sixteen times its hop. atlas had already found and fixed it.

**What you chose.** Nothing beyond the two notes.

**What landed.** 11.0.2: the worm measures its dot from its own box, so a step to a neighbour bridges no more than the gap and a dot.

**Still open.** "Like apple and google" is the Home View study's three dot questions: a resting capsule for the active dot, dots that follow the scroll, and how far the active dot may stretch in flight. The motion study also lists the pager dots among its cases.

**With the new glass study.** Untouched; it leaves the dots to you.

Sources: `design/pager-dots/owner/daraksha-slide-dots-2026-11-12.png`; `audit/INBOUND.md` rows O-250, O-261, O-295; 11.0.2 `065ae4240`.

## 6. Depth and parallax

**Began.** 2026-11-14, 22:22:

> "let's study and implement elements of parallax, and depth--like having text behind and in front of figures and areas--deftly. Generalized."

Done 2026-11-15, 03:38.

**What it proposed.** Twenty sites read, eight with real depth. Apple does not parallax its heroes; where a layer trails the page on the deft sites it is one layer, the picture, and the words never move. The design is one stylesheet with three placements: a title and its figure, a figure in a window with its caption, and a stage with its readout. A word sits behind or in front of the figure, one word at a time. One layer per scene trails the scroll: the Blob 36 px each way on a desktop and 12 on a phone, a picture in its window 44 and 22. With reduced motion, and on Safari before 26, the same pictures stay still. A caption on a photograph rides a solid card, since frosted glass over a picture reads at 2.5 to 2.9 to 1. The landing page would open on "Glass" behind the Blob and "UI" in front. The precept "no parallax" would give way to one line saying where depth is allowed.

**What you chose.** No answer to the six questions.

**What landed.** Nothing. The build is on its scratch branch. The precept change is not applied: `restraint.md` still says "no parallax". Planned for 11.2.0 as an addition; the release index has no row for it yet. One known fault: in Playwright's WebKit at 360 px the tail of the "q" in "Liquid" touches the "l" below it.

**Still open** (each default holds):

1. Is a weave by word enough? Default: by word.
2. Does the landing page take the Blob title? Default: yes.
3. Is the amount right? Judge it by scrolling: `/demo/depth/index.html` on the scratch branch, `?lag=0.0625` for half, `?still=1` for none. Default: as specified.
4. Will you look at it in Safari on an iPhone before it ships? Default: you look once, on Safari 26.
5. Does the Blob rest flat in a scene, without its own shadow? Default: flat.
6. Is the dark Blob right, a deep quiet bead? Default: the quiet bead.

**With the new glass study.** Untouched.

Sources: `design/depth/BRIEF.md`, `STUDY.md`, `OWNER-READ.md`, `challenge.md`, `fold.md`, `PRECEPTS-ADDENDUM.md`; `waves/W-B.19.md`; `audit/INBOUND.md` row O-345; branch `bl/depth/proto` @ `e4275ac40`; git log `8f9ea49e4`, `3f28e20f6`.

## 7. The text mark (underline and highlight)

**Began.** 2026-11-11, on atlas's preview: "underline and highlighting within glass-ui needs to be re-designed from first principles." Your screenshot showed the hand-drawn underline as a thin wobbling stroke that ran past the text. Spec, challenge and fold were done 2026-11-12.

**What it proposed.** Three designs measured side by side, two of glass's and one of atlas's. The winner makes the mark the browser's own text decoration, placed from the font. It stops where the words stop, breaks around descenders, wraps line by line and prints. It is a straight rule 0.07 em thick at every size, never under 2 px. The only motion left is the draw: the ink laid once along the line in 200 ms when you scroll to it. The family is two shapes, underline and highlight. The new mark ships beside today's in 11.2.0; the strike-through, the ring and the old hand-drawn mark go in 12.0.0.

**What you chose.** No answer to the four questions.

**What landed.** None of the new mark. 11.1.0 changed today's hand-drawn mark (it draws in your page's focal colour, and its draw timing was fixed); those came from the same reports, not from this design. The prototype is a patch in the study's folder. The release index has no row for it yet.

**Still open** (each default holds):

1. A plain rule, or a round-ended stroke with a faint bow? Default: the straight rule.
2. Drop the strike-through and the ring? The searches found neither mounted in Gregg, atlas, sci-report or slides. Default: yes, in 12.0.0, after atlas confirms.
3. A phrase full of descenders ("by program") breaks into dashes. The cure is one unbroken rule a quarter em under the baseline, chosen per phrase. Default: yes; an automatic choice waits until measured.
4. In glass's own light theme the default ink is the text colour, so an unstyled underline looks like a link. Default: keep it.

**With the new glass study.** Untouched. The new study's "mark" is a different thing (the shape that shows a selection), and it leaves the hand-drawn mark's draw alone.

Sources: `design/marks/OWNER-READ.md`, `AB.md`, `challenge.md`, `fold.md`, `inbound/`; `waves/W-B.16.md`; `audit/INBOUND.md` rows O-251, O-265; git log `8475187e2` to `af999e708`; new study `BM/study/DESIGN.md` §4 (the hand-drawn mark's `linear()` draw, left alone).

## 8. The specular dot

**Began.** 2026-11-15, 17:19 (relayed by the value.js session), with your frame of daraksha's theme seat: "the glass specular dot for buttons and the like needs refinement." The study was done that evening and ruled after midnight.

**What it proposed.** The smudge was glass's: a soft disc of light centred on the pointer, on every dock seat, glass button and slider thumb. It is 12 px across where a seat has 10 px of room round its icon, so it always lands on the icon or is cut off. The same rule lit an oval on every pane when the pointer entered (the "strange circular item" on keyframes on 13 November). Your rule already said "Remove, do not tune." Two versions were drawn: A, no highlight; B, a one-pixel rim along the fill's upper edge, fading in with it. The study recommended A.

**What you chose.** No reply. On 16 November the orchestrator took the defaults, marked as yours to reverse: A ships; B is dropped (invisible in light, and one more change on every hover); the glass Button and icon button get a plain hover in place of the light: one tint step in light, the rest fill mixed 8 % toward the text colour in dark.

**What landed.** Nothing in a release. It is built on its scratch branch and booked for 11.1.2, which is not cut yet; 11.1.1 does not carry it. It deletes 248 lines of CSS. One check is owed: the dark hover's nested colour mix in real Safari.

**Still open** (the defaults below were taken; any is yours to reverse):

1. Remove the moving highlight from every control: yes.
2. Panes and cards stop lighting on hover unless a site asks by name: yes.
3. A site may still switch it on for a large pane until 12.0.0, where it is deleted: yes. Say "keep it" if you want it for surfaces of 240 px or more.
4. The rim of B: no.
5. daraksha's darker hover disc: leave it, it is the site's.

**With the new glass study.** Agrees, and folds it in: the new study refuses every specular, sheen and glow and credits their deletion to 12.0.0. It does not mention this 11.1.2 patch, which takes the light off controls sooner.

Sources: `design/specular/BRIEF.md`, `STUDY.md`, `SPEC.md`, `OWNER-READ.md`, `RULING.md`, `PROTOTYPE.md`; `driver/glass-11.1.1-scope.md` (the 11.1.2 scope, "Added 2026-11-16: the specular change"); `audit/INBOUND.md` rows O-339, O-367, O-367a; `~/.dev-logs/owner-1112/ORDER.md` (the 24th order); branch `bl/specular/proto` @ `3795843de`; new study `BM/study/UNION.md` rows L8 and G4.

## 9. The engagement register

**Began.** From your edict of 2026-07-17: "we suffuse the breath of life into our components with affordance and facility to always display engagement; within our aristotelian proportion in the abstract." The study opened on 26 September and closed after fifteen passes on 11 November.

**What it proposed** (to land inside the 12.0.0 restraint release): every component declares which of nine kinds it is, so "engaged" means one thing per kind; one writer for each held, pressed and engaged state; a press shown by tone, with nothing scaling; a held control growing 1.06 on one axis; the slider's magnifier hung from its track; one rule for every control a finger flings (settle, then stop); nothing played on mount. It retired the pop on every commit, the Button's squish, and a 1,285-line script that glided a held control when the page moved under it.

**What you chose.** Through your delegate (the value.js session, which you accepted for these calls), a run of rulings in October. On 2 November you had the orchestrator ratify that the press stays on Button, Switch, Checkbox and Select. On 9 November your restraint precept retired the press indent and overshoot, which outranks both. On 11 November, asking for the Slider's expanded view, you answered the held-grow half of this study's question: you want the grow, larger. The other half is unanswered.

**What landed.** Nothing. It lands in 12.0.0.

**Still open.**

1. When the page moves under a held control, does the control glide to its new place or move with the page? Default: it moves with the page, and the grow is on one axis only.

**With the new glass study.** In conflict on three points, all inside 12.0.0's lines. The new study would drop the 1.06 held grow, which the 11.1.2 Slider fix also rules out. It sides with the Slider study in removing the magnifier this study keeps. And it would let a continuous slider's value stay where the finger lifts, where this study seeds a settle from the release speed. On reduced motion it reconciles this study's "a commit is an instant change" with its own "a fade, never a cut": the commit is instant, and its tone cross-fades.

Sources: `design/engagement/LANDING.md`, `PORTFOLIO.md`, `REGISTRY.md`; `waves/W-R.1.md` §2.3 and open questions; `audit/INBOUND.md` rows O-103d, O-103f, O-118, O-203, O-254; git log `43093f458` to `705d83e76`; new study `BM/study/DESIGN.md` §3.9, §8.2.

## 10. The glass material

**Began.** With the tranche on 23 September, from reports that the light glass read grey (your "why are our docks grayed out, too") and that shadows clipped ("the shadows on the left clip and are not displayed properly"). On 6 October:

> "the cube and other items in ALL of our UIs (value, keyframes, fourier) are OVERLY shaded, lighted and reek of affectation and slop. ... this note should be made and done for glass-ui, too. The original keyframes.js ui was flatly lit and proper design"

It converged on 20 October after thirteen passes.

**What it proposed.** A light card pole lifted toward cream; each light rung at a computed bound, so words hold on any ground; one field surface for Select and Input; a menu row marked by state alone; a firmer perimeter ink; one-layer modal and dock shadows with no glow; the backdrop-brightness sampler and its clamp deleted; a dark focus veil that dims and keeps the colour's chroma (a deeper, quieter orange, not brown). Blur 6, 10, 12, 18 and 20 px. Most of it was to land in a 10.2.0 that was never cut.

**What you chose.** Through your delegate: three glance frames accepted and the brown one declined (19 October); the chroma-keeping dark veil accepted (20 October); the go for the release once the dock and material studies converged. Then on 11 November, through atlas, "glass-default for low-blur": wash 4 px, quiet 6, resting 8, floating and overlay 0, saturate 1, for 12.0.0. That replaces this study's blur row.

**What landed.** Nothing. Its waves have no release. Its two patches were measured on 10.1.0's tree and would need rebasing onto 11.x.

**Still open.**

1. Confirm the accepted dark-veil frame. Default: it stands.
2. Confirm the value.js session as your delegate for these calls. Default: its rulings stand.
3. Optional: should the veil keep chroma on every hue, not only the orange spot? Default: reported, not built.
4. A look in real Safari at its landing, the one engine besides Chromium that paints its dark arm.

**With the new glass study.** Folded in. The new study takes this study's floor as its material, proposes no material code of its own, and asks you one question on top of it: which ink the chrome's bound is solved for (the muted ink, as here, or the full ink every word in a dock now uses). It also binds to your low-blur word.

Sources: `design/material/PORTFOLIO.md` §0, `REGISTRY.md` §P13-1.2, §P13-4, §P13-C; `audit/INBOUND.md` rows O-87, O-103, O-103a, O-103b, O-260; `waves/INDEX.md` rows W-0.1, W-0.11, W-H.1, W-H.2; git log `9aa2b7f96` to `e71aef240`; new study `BM/study/DESIGN.md` §3.9, §5.0, §5.3.

## 11. The selectable tile

**Began.** 2026-09-23, relayed from keyframes.js's Spring scene: "this entire UI is god awful, not glass-ui idiomatic, cluttered, and too rounded in some pills ... The smooth and bouncy pills, for example are too rounded and should be more card like". It converged on 29 October after twelve passes.

**What it proposed.** A selectable tile holding more than one line is a declared cell with a card corner, not a stadium. Selection changes no geometry: the selected weight does not change, so a long label never re-wraps. Each state (selected, hover, focus, press) has its own channel. It lands as its own wave in 12.0.0.

**What you chose.** Through your delegate: the declared cell; tiles only; the cell in both states, so selection never moves a box (21 October); and that rule for any content, not only today's labels (27 October).

**What landed.** Nothing. It lands in 12.0.0.

**Still open.**

1. Should a selection travel as a body from tile to tile? Default: no; each tile keeps its own fill.
2. An on-device capture of Apple's option cards, owed since the first pass.
3. Under reduced transparency the selected tint loses to the plate; the fix is yours to order or not.

**With the new glass study.** Untouched, and consistent: the new study's one moving selection lives on short strips and dock runs, and a ToggleGroup keeps its own fill.

Sources: `design/tile/PORTFOLIO.md` §0, `REGISTRY.md` (the convergence record, C-4 to C-7); `waves/W-J.1.md`; `audit/INBOUND.md` rows O-103, O-103c, O-103e; git log `91dbcbd85` to `b7ec589d4`; new study `BM/study/DESIGN.md` §2.1 (the ToggleGroup row).

## 12. The file layout (colocation)

**Began.** With the tranche on 23 September, your edict: "components should be COLOCATED with their sub-components, composables, skeletons, constants, etc (and this should be done recursively for nested components)." It converged on 16 October after thirteen passes. This study is about how the source files are arranged, not about anything on screen.

**What it proposed.** Sealed modules, flat. Tests live with their subject. `composables/` is kept, as you named it. A folder holds at most 12 files and a file at most 500 lines. Each symbol is published from one door. The demo uses only the public doors. It is replayed as a 126-step move on 10.1.0's tree.

**What you chose.** Your edict decided four of its ten first rulings. The driver ruled the rest, each marked as yours to override. No override has come.

**What landed.** Nothing; it has no release. Its move was measured on 10.1.0's tree, and the source has changed through 11.1.x since, so landing it means replaying it.

**Still open.** No question waits on you. One ruling has a cost you may want to see first: one symbol, one door, is a breaking change (when it was measured, value.js imported one name from two doors).

**With the new glass study.** Untouched.

Sources: `design/structure/RULINGS.md`, `REGISTRY.md` (the convergence record); `waves/W-D.1.md`; `CHARTER.md` (the closing paragraphs); git log `9a4356063` to `ac85995e3`.

## 13. The demo site, glass.babb.dev

**Began.** 2026-11-15, 17:28, your review of the live site, thirteen points, among them:

> "most pages, like this, have way too much internal text and a poor focus on the ACTUAL UI element and component we're demoing"
>
> "https://glass.babb.dev/dock--poor demo of the dock. Dock seems like a mess with all of this complexity. Full audit from all of our app implementations, too."
>
> "docks should almost always be rounded, some are not in some cases."

**What it proposed.** Every page becomes one thing: a title, one sentence, then the working component, large, at the top. Editor pages fill the screen. One of everything (one Blob, one Constellation, one front door). The dock section becomes ten pages, one per way the apps use a dock. The site's own two docks fold and move. No black flash on load. Cards mount the real component. 92 pages become 78.

**What you chose.** No reply to its seven questions; it was built on the defaults.

**What landed.** Live on glass.babb.dev: the rebuild merged on 16 November, three follow-up rounds on 17 November, and the last cure (every stage swap fades as one layer, and no text changes typeface in view) live on 22 November. The library faults it found are booked to 11.1.2 and 11.2.0.

**Still open** (each default is already built):

1. Giant titles only on the front door and section pages: yes.
2. The sticky page header removed: yes.
3. The rail starts open and folds when you press into the page: yes.
4. The library's own card corner stays 16 px; only the site goes to 24: yes.
5. One short usage snippet per page, closed until opened: yes.
6. Old addresses show not-found, with no forwarding: yes. Say so if `/foundations/intro` should forward.
7. Disabled labels at 3 to 1 or better: yes.
8. New on 22 November: the code font is fetched at start so two pages paint 30 to 34 ms later on a slow network; whether that trade stands is yours.

**With the new glass study.** Untouched.

Sources: `audit/demo-site/OWNER-ORDER.md`; `design/demo-site/OWNER-READ.md`, `FORM.md`, `ROUTES.md`, `LIBRARY-FAULTS.md`; `audit/INBOUND.md` row O-369; master merges `b4d29361a`, `0a42c54f7`, `4c8d0d428`, `2b534227f`, `f0a2d0273`, `22c4ea976`; `FORMATION-PROGRESS.md` 2026-11-22 05:30 and 05:52.

## 14. The fission dock cluster

**Began.** 2026-11-09, 12:20, relayed: you liked daraksha's "fission dock", two glass plates side by side that fuse into one and part again as the dock changes, with the theme toggle parting as its own small plate. At 17:15: "why is darkmode not split out in fission to the side, and why are these docks not rounded, and why are they not animated and have collapse states" and "We should likely have ONE dock, not two, with layers of controls." At 17:19: "it should appear as ONE dock with many layers that are smoothly eased and grow, fission, fuse, and animate."

**What it proposed.** A new cluster component: separate plates fusing into one silhouette and parting again. Two mechanisms were measured (a spring per plate, and one shared clipped silhouette), neither passing alone, and a graft of the two was specified for 11.2.0. A second pass rebuilt it as one dock with layers beside a theme plate.

**What you chose.** One dock with layers (9 November, 17:15), and "Rounded." that evening.

**What landed.** No cluster component. Your "Rounded." shipped in 11.1.0 as the capsule dock.

**Superseded.** On 11 November the dock spec was re-cut to one dock with the theme seat beside it and no cluster component; that is the dock redesign (section 2). Its neck between two plates was built three ways and none read as one piece of glass, so the theme toggle ships as its own round dock in 11.2.0 and fusing waits for 12.0.0.

**Still open.** None of its own. The fusion question is the dock redesign's first question and the new study's.

**With the new glass study.** The new study takes up what remained, the bridge between two plates. Its proposal: the theme seat is born under the dock, one fuse runs at a time, the goo is offered for 12.0.0's frostless dock as your order with its price, and no split ships on frosted glass in 11.x unless you say otherwise.

Sources: `design/dock-cluster/proposal-A.md`, `proposal-B.md`, `AB.md`, `orchestrator-note-one-dock.md`, `pass2-*.md`; `audit/INBOUND.md` rows O-195, O-199, O-200, O-202; `waves/INDEX.md` row W-I.8 ("no DockCluster"); 11.1.0 `72f2d5ec5`; git log `077287c5f` to `aefaa58a2`; new study `BM/study/DESIGN.md` §9.
