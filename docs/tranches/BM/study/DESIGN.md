# BM: the design

Rewritten whole by pass 10 (claude-opus-5-5, 2026-11-24). It rests on the owner's ruling of 2026-11-23 (O-426, `choices/RULING-2026-11-23.md`) and his order on the toggle (O-428). This file states the design as it ships. The record of passes 1 to 9, where every amendment is marked where it lands, is `pass-10/DESIGN.before-pass10.md` ("the record" below), and each section here names the passages and files that carry its evidence. Row ids (L1, F9 …) and questions Q1 to Q21 are `UNION.md`'s, and Q22 is pass 2's. The sites' own words are in `INBOUND.md`, cited as [IN site n].

Amended by the final fold (claude-opus-5-5, 2026-11-24), which folded pass 10's two critiques (`pass-10/fold.md`). An amended passage carries its objection's id, as (A10-2) or (B10-8). What neither a default nor the ruling settles is listed in `OPEN.md`.

**Where it stands**

- **Defaults.** Every choice on the board (`choices/CHOICES.md`, 51 choices) takes its default. The four exceptions are 23, the slider's expanded view (C, §8.3); 6 (A, §6.1); 24, the goo (C, §7.4); and 5, the hover plate (C, recommended here, §6.2).
- **The studies run since the board** take their own defaults: the carousel study (A on all four questions), the overflow study, and the phone-scroll cure.
- **Readings.** No iPhone reading has returned. A reading that arrives amends a decision and never blocks one. §15 lists the optional letters, the optional fact readings, and the engine checks each wave's proof owes.
- **Releases.** BL's 11.2.0 carries two rows of ours: the toggle (§9) and the plate's strengths (§6.2). 11.3.0 carries the new parts and changed defaults. 12.0.0 carries the removals and what a consumer sees change in its API or its boxes. The tranche draft is `pass-10/tranche-draft.md` (§14).
- **Pages.** Each page says at its top what to look at and what to send back. The local site (`local/`, served at `http://MacBook-Pro-170.local:4415/`) serves every page, including the three that have no published link: Slider While Held (`pages/P10-slider.html`), Dark Mode Toggle (`pages/P10-toggle.html`) and The Hover Plate (`pages/P10-plate.html`).

## 1 The law

Every part BM touches is held to eleven laws (the record, pass 1 §1). A part that fails one goes to the owner with the law and the measure it fails.

| # | Law | What a person sees | How it is measured |
|---|---|---|---|
| 1 | One backdrop per container, one blur value | Glass never frosts glass. A highlight, an inner panel or a held control is a tint on its plate | `backdrop-filter` count per container, siblings included: 1 |
| 2 | One mark per selection group | The choice is one shape that travels between the options | One inert, `aria-hidden` node per group, moved by `translate` |
| 3 | Commit at the decision | A tap selects at once, a drag selects what the finger lifts over, and passing an option never fires it | The model changes on the tap or at `pointerup`; a costly load fires once per commit |
| 4 | Two per press, two per node | A press answers with two motions at most | Animations per press ≤ 2, properties per node per change ≤ 2, counted by §4.4's rules, which name the counts over two |
| 5 | Accelerated properties | Motion keeps gliding while the page is busy | `translate`, `scale`, `rotate`, `opacity` on a curve Safari hands to its compositor (§4.1); page-thread properties only for an effect of 200 ms or less (P5, §12) |
| 6 | Nothing refracts | No lens bends the page behind it | No `backdrop-filter: url()` and no page snapshot. WebKit drops a reference filter at compositing (`RenderLayerBacking.cpp:L1051-1054`) |
| 7 | P0a's amounts and clocks | Every change starts and stops, and under Reduce Motion it fades and never cuts | No leg lands more than two fifths of its travel in 16.7 ms, and none is shorter than 83 ms. A leg on the page's thread runs 167 ms or more, so it shows five frames when Low Power Mode halves rendering to 30 fps; a shorter leg rides the compositor, whose rate in Low Power Mode is unread (§10.6; A10-6, B10-4) |
| 8 | A split starts under its source | A piece that splits off is born from the piece it leaves | On frame 0 the new plate's box lies inside its source's |
| 9 | Additions are paid for | No site's first load gets heavier past its bound | §11's ledger, per site and per release |
| 10 | One focal ink per view | The selection is the one thing in its view that carries the ink | One ink-carrying sign per selection state |
| 11 | Intent first | Every pressable host answers the pointer before the press | A hover answer within P0a's hover row |

The owner's standing law sits over all eleven:

- Everything tweens, intent first, with liquid weight, and every component shows engagement.
- iOS 27, but flatter, more refined, deft, with slightly less blur.
- Restraint, one focal ink, KISS.
- No workaround and no masking fallback.
- Clean breaks: a consumer's dependence never keeps an obsolete API.
- Tailwind-first, and colocated.
- Refraction ships only if it needs no workaround in production iOS Safari. It does need one (law 6), so it is refused (§13).

Where the law yields to an order, the order is named in the section that carries it. There are five (A10-2, A10-7, A10-9, B10-8, B10-9):

- **The goo** (`restraint.md:125-128`; O-426; §7.4): its filter and its two nodes, and on the three docks that mount it, a close painted on the page's thread while the filter is on (law 5).
- **Overshoot** on the spatial morphs the owner ruled, and nowhere else (P2).
- **The menu's grow** (O-171; choice 10's default, today's grow; §6.3): a clip on the page's thread over bloom's 370 ms (law 5).
- **The toggle** (O-428; §9): its colour sits beside the current seat's ink (law 10), and a tap runs three legs, the rays, the night and the colour (P0a's glyph row; law 4).
- **A slider with both a knob and a readout** (O-426; §8.3): a press runs three legs, the ground, the knob and the readout, the three things the ruling names (law 4).

A slider's growth on Tab is no longer listed: a keyed action moves as it does for the pointer, and only a keyed choice fades (P0, the later ruling; choice 18 C; §12).

## 2 The references and the sites

### 2.1 The references

- **rida.dev.** The post on input and rendering (`read/rida-input-render.md`, [RI]) and its UI library (`read/rida-ui.md`, [RU]), read from `source/rida/`, which is never committed.
- **iOS 27.** `read/ios27-glass.md` ([IOS]), the WWDC25 sessions it cites, and the iPhone screen recordings measured in BJ's archive ([ARC]).
- **The ChatGPT app's slider.** BL's `design/slider/MEASURE.md` §2.2. It is measured from OpenAI's published animation of the thinking-level slider, a promotional render, since no screenshot of the app was available.

A reading is marked by kind: *author* (rida's own report), *sim* (the iOS simulator), *device* (a screen recording on an iPhone), *source* (WebKit source, a release note, MDN), or a run of ours. Playwright WebKit is an engine build, not Safari, and headless Chromium has no GPU, so neither is an iPhone reading.

### 2.2 The sites

The census is `pass-7/fold/hosts.json`, at each site's newest branch on 2026-11-23. slides and dns-analysis were read in pass 10.

| Site | Mounts | Bound ([IN]) |
|---|---|---|
| atlas (library and sci dashboards) | GlassDock, SegmentedTabs, Switch, ToggleGroup, Slider (5), PagerDots, Carousel | No box moves on hover, open or fold; nothing new at mount on /sci; Safari equal to Chromium; adopts only from glass |
| value.js (color) | SegmentedTabs, ToggleGroup, Slider (5), DockLayerGroup, GlassDock, DarkModeToggle | Loads on intent where eager loading would not fit; no visible thumb |
| daraksha | Slider (2), GlassDock (7), DockLayerGroup (3); its own neck and ThemeControl | The reader route's eager script at 125.3 of 126 KB; about 6 KB of 480 KB free; a WebKit crash in occasion mode is still open |
| fourier | SegmentedTabs, Progress (4), ToggleGroup (5), Carousel, GlassDock (5), Slider (2), DropdownMenu | None stated |
| keyframes | GlassDock (3), ToggleGroup (2), SegmentedTabs, Slider (4), Switch, DarkModeToggle; keyframes.js is the springs' maths | None stated |
| gaggle | GlassDock (9), ToggleGroup (2); five detented sheets; the lamp seat | 11,282 B of first-load margin; no GPU words in a fetchable chunk; the motion gate |
| Home Assistant | Switch (5), ToggleGroup (8), GlassDock, Progress, Slider; the faces seat | Entry 71.6 of 71.8 kB gz; WKWebView at 60 Hz; one live blur or fuse at a time; LF-38 |
| slides | Dock, DarkModeToggle (2), Popover, DropdownMenu, Dialog, Button, on 10.1.4 | None stated |
| dns-analysis | No glass-ui; its own dock, cards, dialogs, sheet and toggle | Its 4.2.0 spike measured +41 KB gz per route |

## 3 The window

A capsule that changes width takes the window. A capsule plate at its widest, seen through a window of the same capsule, is a capsule at every width when the window's `translate` sets one end and the plate's sets the other. On a quarter-pixel grid, at 21 widths from 236 to 52 px, the visible region and the ideal capsule agree everywhere (`pass-4/shape/geometry.json`, `F_window`). Both legs are `translate`, so they run on the compositor, and no node is added where the window is the part's own element and the glass its `::before` (the record, §6.3).

- **Where it serves:** the dock's fold (§7.1), the theme seat's split (§7.3), a seat wider than the disc, and the slider's fill (BL's R-9, the track as the window).
- **Refused for every shape change: stretching and resizing.** A non-uniform `scale` bends the capsule's ends to 5.7 × 26 px at the disc, 7.28 px from round (`G_scale`). Resizing lays the page out every frame.
- **Its hit region.** Folded, the window stands translated by the fold's travel, so its box spans 236 px for a 52 px disc. As pass 4 wrote it, a point 100 px past the disc, over the neighbour, hits the dock (`pass-4/critique-B-check.json`, run in pass 10). The window takes `pointer-events: none` and its `::before` takes `auto`, so the hit follows the plate: the neighbour, the gap and the disc's far corner hit nothing (`pass-10/access/window-hit-chromium.json`). The window's rectangular clip bounds that hit, and its rounded end does not. A point inside the `::before`'s box and outside the window's rounded end hits the dock in Chromium and in Playwright WebKit (`pass-10/critique-B-check-*.json`, (250, 102); B10-7). So the folded disc takes taps in the two square corners outside its round on the clipped side, about 290 px² at 52 px. The corner is accepted. A static `clip-path` on the window would bound it, but in 11.x that makes the window a backdrop root and stops the blur.
- **Its releases.** In 12.0.0 chrome samples nothing (O-260), so the window ships on the dock with no backdrop to clip. In 11.3.0 it ships only where P4-bud's F, with Frost on, shows no square patch on the owner's iPhone and its frost looks like G's. That is a conditional ship, not a hold: until the reading comes, 11.x keeps today's shapes, because shipping the window unread could hide a stopped blur.

## 4 Delivery

### 4.1 What WebKit's compositor takes

WebKit hands `transform`, `translate`, `scale`, `rotate`, `opacity`, `filter` and `backdrop-filter` to its compositor. It never takes `clip-path`, `mask`, `border-radius`, `box-shadow`, colours, SVG children's transforms or a registered custom property. A `linear()` or `steps()` curve reaches the compositor only from Safari 27.3 ([27.3] 190761783), and Home Assistant's WKWebView on iOS 26 never has it. So in every Safari the library supports, a state change that must glide while the page is busy rides a `cubic-bezier()` on a compositor property.

### 4.2 The springs (choice 4 B; Q6)

One source, `SPRING_PRESETS`, and five deliveries by what the motion is (the record, §4.3):

| Motion | Delivery | Under Reduce Motion |
|---|---|---|
| 1. A state change that can turn round: hover, press, toggle, open, close, a bar collapsing | A CSS transition of a compositor property on the row's token, now the closest single `cubic-bezier()` that leaves rest at no speed and, on every row but panel, never passes its target | The transform drops; an opacity fade of 150 ms or less remains (§5.3) |
| 2. A release, a settle with speed, a retarget | Keyframes keyframes.js samples from the row's closed form, from the body's own position and speed, played by `element.animate()`; a retarget samples again from where the body is; a `translate` ends within half a pixel of its rest | The dip, or the crossfade (§5.3) |
| 3. A follow while the finger is down | One `translate` write per pointer event, at the finger, with no spring; the spring starts at release, as 2 | Kept: it is the reader's own finger |
| 4. A function of scroll position | A scroll-driven animation of a compositor property, or nothing animated | A line that tracks the reader's scroll stays; a reveal lands in its end state |
| 5. A state set by scrolling | The direction sets an attribute once per change, which plays as 1 | As 1 |

- **The tokens.** Each is within 2.65 % of today's `linear()`, and panel is within 3.67 %, refitted so it keeps its own 4.21 % overshoot and no more: `cubic-bezier(0.215, 0, 0.059, 1.288)`. The rows this design uses: present (0.22, 1.0) `cubic-bezier(0.197, 0, 0.124, 0.808)`; dock (0.30, 0.88) `cubic-bezier(0.232, 0, 0.18, 0.703)`; press (0.20, 0.80) `cubic-bezier(0.244, 0, 0.251, 0.672)`.
- **Bytes.** The tokens free 1,487 B of stylesheet at every site, and the player adds 655 B of script. Where a site is at its cap (daraksha), the player loads on the first touch (§11).
- **Nothing writes a custom property each frame** to drive motion, and one node never carries a held animation and a transition on the same property.
- **`--ease-cartoon-punch`**, a 13-stop `linear()` with a 22 % overshoot, eases chips, buttons' rotation and the slider's old disc. Its comment calls it compositor-safe in both engines, which before 27.3 it is not. The comment is corrected in 11.3.0. Whether controls keep its overshoot is the owner's, since P2 bars overshoot on a control and no choice names the token. It is open (`OPEN.md`, O-1), and until he answers the curve stays as it is (§14.1).
- **R2 and P2-scroll** would read which curves stutter on a busy page. They amend if read (§15).

### 4.3 The scrolling parts (choice 26 B)

- **The edge fade.** FadingScroll takes fixed ramps over native scroll in 12.0.0 (+201 B sheet), and its fallback script goes (−904 B).
- **The collapsing bar** becomes a state (rule 5) in 12.0.0 (+330 B, −417 B, at Home Assistant).
- **The progress rim** reveals its stroke by a translated window in 11.3.0 (+273 B, −319 B of clip legs). A rim fed by the page's scroll rides a scroll timeline (rule 4).
- **The dock's run** stops animating its corners as it scrolls. A seat resting flush against an end is then clipped by the plate's arc, which ends the build's "flush means complete" look. The owner sees it as a picture once 11.2.0 ships (choice 26's note; §14.1).

### 4.4 Counting (choice 19 B)

The ceiling (`restraint.md:184-206`): 2 animations per press, 2 per hover (one fade and one movement), 2 properties per node, 0 nodes or wrappers added for a motion, and 0 listeners added per control. Three rules say how to count:

- Two words trading ink count once, as the mark's colour leg.
- A window with what it reveals is one shape, and a crossfade's two legs are one.
- When a press opens a panel, the control's held fill waits for the panel to land, so the press stays at two. This is choice 19 B's third rule as ratified; pass 10's extension to a glyph's change is struck, since the toggle no longer takes a press tone (A10-7).

Counted under those rules, these run over two, and each is named in gate G-3 (A10-7; the fold's finding 2):

- the fold, 3, and an open with the theme seat's split, 5 (choice 19 B's own cost line, ratified);
- a dialog's open and its leave, 3 each, as today (the veil's leg; Q22);
- the toggle's tap, 3, by O-428 (§9);
- a slider with both a knob and a readout, 3 on a press, by O-426 (§8.3).

One exception to the nodes rule is ruled: the dock's fusion layer and the seat's plate inside it (§7.4). The precept text is in `pass-10/precepts.md` (§12).

## 5 The grammar

### 5.1 Appear, hover and press (P0a)

- **Hover.** A hover is a fill at the hover strength over 120 to 150 ms (§6.2). An edge that moves under a hover moves 4 px or less.
- **Appear.** A thing that appears grows from 0.8 to 0.96 of its size with its coupled fade, over 200 ms on present.
- **Press (choice 9 A, with its scope).** On a button or icon that carries no mark, the press is an even shrink to 0.97 with the plate at full strength, 120 ms each way on press. On a host of the selection mark (a tab, a segment, a dock run), one press has one answer: the option's own fill takes the press tone, and nothing shrinks (§8.1). The toggle answers a press with its glyph's change alone, and its plate answers hover and focus (§9; A10-2).
- **A label swap** trades by P0a rule 4. The leaving word falls to 0 over 90 ms, and the arriving word starts at the halfway point (45 ms) and rises over 120 ms, both on `cubic-bezier(0.4, 0, 0.6, 1)`.

### 5.2 Leaving (choice 11 B)

Everything that leaves by fading leaves in 120 ms by opacity alone, where it is. It does not slide or shrink back (P0a rule 3). A sheet leaves the way it came.

The exit's curve stays `--exit-curve`, today's `--ease-out` (`motion-registers.css:149`). Over 120 ms it lands 0.388 of the fade in one 60 Hz frame, within law 7's two fifths (`pass-10/access/frames.json`). Pass 10 proposed `linear`, and the final fold withdrew it (A10-3, B10-5). A linear fade leaves its rest at full speed, against P0 ("it eases off its rest") and P1 (an effect rides an `--ease-*`). Its case rested on the 30 Hz column, which assumes the compositor is held to 30 fps in Low Power Mode, and nobody has read that. No page showed it, and it came after the ratification.

### 5.3 Reduced motion (choice 8 A)

Nothing cuts under Reduce Motion. Each form below is a tween the library's reduced-motion carve lets through (`data-allow-motion`):

- **A transition that moves a body** drops its transform and keeps an opacity fade of 150 ms or less.
- **A transform that is a state's only sign of place dips.** It fades out where it is, lands while hidden, and fades in, 100 ms each way. The switch thumb and the Carousel's press do this. BL's 11.1.2 Carousel press "arrives at once" under reduced motion, so it goes to BL as an 11.3.0 row at these figures, not daraksha's 144 ms and 144 ms (§14).
- **A quantity's length** (Progress, a level, the rim) tweens over 150 ms or less on an ease-out, so the quantity's one sign never hides.
- **A choice's mark fades across**, and arrow keys do the same (§8.1).
- **The slider grows nothing.** The readout fades, and the focus ring sits 2 px from the band (§8.3).
- **The toggle crossfades** its rays and its night on its own 200 ms clock, and its colour still tweens (§9; B10-4).
- **The goo's filter never turns on**, and the fold dips (§7.4).
- **A follow keeps the finger** (rule 3).

## 6 Surfaces

### 6.1 The material and the edge (choices 6 A, 7 B, 28 B, 29 B; Q10, Q13, Q14)

- **The chrome plate is BL's material floor (D3), choice 6 A.** The plate is `--card` at α. The α is the one at which the muted ink holds 4.8 (4.5:1 plus 0.3 for antialiasing) over the worst flat ground: 0.897 in light and 0.872 in dark with glass-ui's default colours (`pass-4/fold/material-fold.json`, a model computed in Node). BM writes no material code. The luminance clamp, 2,860 B of script and 187 B of sheet, goes with D3 and W-R.1 and is credited to BL.
- **The blur register is O-260's, written by W-R.1:** wash 4 px, quiet 6, resting 8, and floating and overlay 0. From 12.0.0 the dock, menus, sheets and dialogs sample nothing, and their fill alone holds the words.
- **The edge, choice 7 B.** One hairline in light, drawn as the border; none in dark; both under more contrast. It removes 213 B at every site. atlas and daraksha read the inner lines and are told (§17).
- **Hover surfaces, choice 28 B.** 11.1.1's firm plate becomes a declared option for hover cards, popovers, menus and selects in 11.3.0. BM adds nothing to it.
- **Reduce Transparency, choice 29 B.** Safari reports neither Reduce Transparency nor the Liquid Glass setting, so the firmer default carries every Safari reader, and a site's own setting writes one documented token.

### 6.2 The plate (choice 5: C, recommended)

The board named no default and the owner gave no order, so the final pass recommends, and the recommendation ships in 11.2.0 unless he sends another letter (O-426). The final fold restated it (A10-4, B10-13). The plate is W-B.17's: one flat fill on the control's own `::before`, at one strength, with `opacity` carrying every lighter state, so no colour ever transitions (R-1). P10-plate shows the three strengths on two dock runs with Home as the current seat, the second with three tinted seats. It draws its levels as colour legs and is listed for repair (§15.1).

| | Hover | On (current, open, pressed) | Tone |
|---|---|---|---|
| A, as first built | 5 % | 12 % | the ink |
| B, full strength | 12 % | 12 % | the seat's own; the glyph takes it |
| **C, recommended** | 6.5 % in light, 5 % in dark | 10 % | the seat's own, on the plate; the glyph keeps its colour |

**Why C.**

1. **B's hover equals its current**, 12 % and 12 %, so a hovered seat reads as a second current one. That is the fault the dock cured in choice 42.
2. **A's 5 % hover in light reads 1.098 against the dock** on one cell (canvas-tools, flat ground), under the 1.1 floor. 6.5 % clears every cell in light, and 5 % every cell in dark (BL's `design/dock/wi8/MEASURE-9.md`, S4's step choice, Chromium).
3. **It is the dock's ladder** as BL ships it in 11.2.0, so a plate and a dock seat answer alike. The same measure shows what C does not do: hover against current reads 1.0 to 1.2 (question 18's note there). A hover is lighter than the current seat by strength; it does not look different from it.
4. **The tone keeps a site's colour without a second ink.** A tinted seat's plate takes its tone and its glyph does not. A hover then runs two legs, the plate's fade and its growth (R-3), and a hovered glyph never outshines the current seat (law 10).

The measures are of the dock's fills on BL's build. That a plate outside a dock reads the same over a page's ground is an inference.

A press on a control already on is answered by choice 9's shrink, or in a dock by the dock's own 2 % layer, so C needs no third rung. A drawn shape (an outline or a ring on hover) is refused as ornament (restraint, Shading). The ladder is two token values and a dark value, with no new rule. If BM-2 sets them through `--fill-hover` and `--fill-selected`, their six other readers (Button, Card, Configurator, SortableList, Timeline and the control bit) move with them, and BM-2's strip shows each. It ships in 11.2.0 by W-B.17.

### 6.3 Menus and panels (choices 10 C, 14 B; Q9, Q11)

- **A menu grows out of its button (10 C).** Today's grow (a rounded clip with the opacity at 1 from the first frame, by the owner's O-171) starts from the button, on `bloom` (0.42, 0.9). Its clip runs on the page's thread over bloom's 370 ms, as O-171's grow always has. That is a body's travel on the page's thread, so it is one of §1's yields, and P5's draft and gate G-2 name it with its length (B10-9).
- **A panel opened from a seat on a plate is born outside the plate.** It is placed by a side offset from the host's inset, not by reka's `reference`, so no two translucent plates stack (F5; `pass-4/critique-B-check.json`: E's panel opens 8 px clear of the seat).
- **The details.** ContextMenu's grow starts from a seed at the pointer. No neighbour yields. The held fill waits for the panel to land (§4.4). Lane D (the morph with two wrappers) and E (the panel at its own size, from 0.96) are recorded in the record, §6.4.
- **A finger sliding across an open menu (14 B).** On a phone a short menu takes the touch slide: press, slide and release on a row, as atlas's phone section menu and Home Assistant's floor menu asked. A row the finger only passes never commits. Its code, at most 377 B (choice 14), loads on a menu's first touch, and only its loader, about 60 B by estimate, rides the entry (A10-10).
- **The overlay layer (Q11).** reka-ui stays, with glass's own presence and the touch slide.

### 6.4 Sheets (choice 13 B; Q12)

In 12.0.0 a detented sheet becomes a native snap scroller, with no per-frame script.

- Its rungs are 1 px tall, which WebKit keeps.
- It commits its rung only at rest, on `scrollend`, and `v-model:detent` changes then.
- The scroller itself takes no pointer, and a device with no coarse pointer draws no grip.
- A side sheet enters by rule 1 with no shear, and `--sheet-enter-skew` stays as a token at 0.
- Bytes: +246 B of sheet, +977 B and −1,546 B of script.
- **Before Safari 27.3.** The 27.3 beta fixed "scroll snap animation taking a long time to settle on iOS after flicking past the last snap position" (189473962). In every iOS 26 and 27.2 Safari, and in Home Assistant's WKWebView until iOS ships 27.3's engine, a sheet flicked past its last detent can be slow to settle, and `v-model:detent` waits for it. BM-10 ships with this stated, on choice 13's default. An iPhone reading amends it, including whether a sheet whose top detent is the scroller's end meets the fault at all (§15.2; B10-12).

11.x keeps today's detent engine. The sheet inside reka's Dialog is to be read on `bm/study` before the wave lands (§15).

### 6.5 Dialogs and the veil (choice 12 B; Q22)

- **11.3.0.** Under a centred dialog the veil is the one blur, and the dialog's plate becomes a tint over it, so Home Assistant's WKWebView pays for one live blur per modal, not two. The veil rule is keyed on the Dialog's slot.
- **12.0.0.** The veil follows O-260 (C) unless W-R.1 re-points it. D, the cheaper one-blur form, is recorded.
- **Presence** waits only on the content's own finite legs. A busy ring inside a dialog can no longer hold the page `aria-hidden` (Home Assistant's LF-38 class of fault; `pass-9/fold/sheet-check-{chromium,webkit}.json`).
- **Dialog and the side Sheet stop calling `useSpringMount`** (−791 B of script). The presence hold goes (−110 B).

### 6.6 How glass arrives (choice 27 A; Q19)

Glass arrives at full strength by `opacity` and `scale`. It does not materialize by animating its blur: `restraint.md:143` ("Transform and opacity only") and choice 27 A refuse it. WebKit's compositor would take an animated `backdrop-filter` (§4.1), so the refusal is the owner's rule, not a thread (B10-15). Whether the toast keeps its vanish through 11.x is a separate line of choice 27, and the owner's (`OPEN.md`).

## 7 The dock and the theme seat

### 7.1 The fold (choice 25 B; F7)

In 12.0.0 the plate is the capsule window (§3).

- **No seat fades.** The controls' own element becomes a second window of the plate's shape for the length of the change only (`data-morphing`). Its one child, the row of seats, stands still by the counter-translate, so the glass's edge cuts each seat exactly as it passes.
- **The one fade left is the trade at the disc.** The first seat and the folded glyph trade by P0a rule 4 (§5.1).
- **The rests.** The controls' window is the plate's shape grown by 5 px a side, so a 3 px focus ring at a 2 px offset is never cut. At the folded rest the row takes `visibility: hidden` and `inert`.
- **The clock.** It rides the dock's row as compositor keyframes (rule 2): over the 184 px fold, 159 ms to 90 % and 339 ms to half a pixel, 10.2 frames at 30 fps (`pass-7/fuse/fuse.json`, `clocks`). It does not fade the content as wi8's 11.2.0 grammar does, which answers the owner's "faster, less fade". On a dock with a seat beside it the goo's filter is on for every close (§7.4). WebKit does not composite an element with `filter: url()`, so for those frames the window's translates are painted on the page's thread, and a busy page can stall them. That is law 5 broken by the owner's order, under gate G-7 (B10-8).
- **Nothing is written per frame.** wi8's plate path, which writes the plate's `inset` and radius and each region's `clip-path` every frame, goes (−1,356 B of script; +393 B of sheet).

In 11.x the form is BL's 11.1.2 face trade on one window.

### 7.2 The run and its mark (choice 21 A; Q5)

- **A run that fits** carries the mark (§8.1). It takes the drag where the host opts in, with `touch-action: pan-y`.
- **A run that scrolls** keeps its native scroll. The mark lives in the scrolled box, there is no drag, and a slide scrolls.
- **Removed.** `useDockRunMark` (−1,349 B) and the run mark's rules in `run.css` (−494 B) go in 11.3.0.

### 7.3 The theme seat

- **In 11.x** the theme toggle is a round dock of its own beside the main one, and no split ships on frosted chrome.
- **In 12.0.0** the seat is a sibling of the plate and of the controls, placed at the open plate's end plus the gap. Folded, it rests translated back by `--seat-from`: the open width plus the gap, plus the seat's width less the disc's, which is 244 px for a seat as wide as the disc.
- **The split.** On frame 0 the seat lies inside the disc (law 8). It slides out on the window's own legs, two legs on one node (`pass-8/fold/sketch/seat-under.next.css`), on one clock with the plate, so the plate, the seat and the gap never drift apart.
- **Its hover and press** are W-B.17's fill on its `::before`, at §6.2's ladder. Its glass is its plate inside the fusion layer (§7.4), which the split's legs drive, so BL's fill stays on the pseudo-element BL builds it on. Pass 8's `seat-under` sketch put the fill on `::after` because its `::before` was the glass, which under the goo it no longer is (A10-4).
- **Reduce Motion.** The seat dips (§5.3).
- **The sites.**
  - A seat wider than the disc (daraksha's pill with its "i") needs its own plate as a window that widens from the disc's width, which costs one more `translate`. daraksha is asked.
  - gaggle's lamp is a readout: it takes no hover plate and no press tone, so it never reads as a button.
  - Home Assistant's faces seat fuses, and the folded dock keeps the faces shown.
  - atlas fuses nothing but a dock and its own seat.

### 7.4 The goo (choice 24 C; Q2)

The owner's orders of 12 November ask for goo: "this fission item should fuse into the main dock and collapse away like in ios 27", "animated that fission and separation in goo with safari compat". C is built within Safari's limits, and the study's objections to it are costs to meet, not a refusal (O-426). The sketch is `pass-10/goo/goo.next.css`, which supersedes pass 8's on the switching times and the guard.

- **The register.** The goo exists only on the 12.0.0 dock that samples nothing: W-R.1 moves `--dock-surface-blur` to the zero rung and writes the dock's `backdrop-filter: none`. That is the tranche's gate G-6. There is no second path and no development warning standing in for one. If G-6 fails, the goo does not ship, and no dock draws a split without it.
- **The layer.** One fusion layer per document holds the dock's plate and the seat's plate, `aria-hidden` and inert. It mounts only on a dock with a seat beside it: value.js's and daraksha's theme seats and Home Assistant's faces seat. While fusing it carries `filter: url(#glass-fuse)` and the dock's drop-shadow: a blur of σ 4, then a threshold on alpha.
- **When the filter is on.** It is set on the frame a close starts, so the first moving frame is already filtered, and it stays set through the folded rest: a folded dock and its disc are one union, and no swap lands on a still frame. On an open it is cleared on the first frame whose gap reaches 6 px, a pixel past the neck's pinch at 5. On the dock row that frame comes 200 ms in, and from there the plates are the 12.0.0 chrome, each with its own shadow. A reversal mid-change keeps the attribute and retargets the motion.
- **What a person sees.**
  - On an open, the neck draws on 3 frames at 60 Hz and 1 at 30.
  - On the dock row's close, the gap runs 8 → 5.02 → −1.73 px at 60 Hz and 8 → −1.73 px at 30 Hz (`pass-9/goo/swap.json`). No drawn frame falls between 0 and 5 px, so a fold shows no bridge, only the plates meeting with filleted corners.
  - At σ 4 the neck is thinner than iOS's.

  The last two are on the owner's list (§14).
- **The fold under the filter.** WebKit does not composite an element with `filter: url()` (`RenderLayerBacking.cpp:L1025-1031`). While the filter is on, the window's translates under it are therefore painted on the page's thread each frame, and a busy page can stall them. The filter is on for every close and through the folded rest. That is law 5 broken for those frames, by the owner's order, on the three docks that mount the layer (the record, `DESIGN.before-pass10.md:1762`; B10-8).
- **Its cost: unmeasured, and gated.** Each repaint runs two CPU blurs, the σ 4 blur under the threshold and the drop-shadow's own, over the layer's 320 × 76 CSS px (218,880 device px at DPR 3). The filter is on at the folded rest, so a page scroll with the dock folded may repaint it. The ruling makes this a cost to meet, so BM-12 carries gate G-7. With Busy page on in Playwright WebKit, a close with the filter must show no frame gap over 16.7 ms that the same close without it does not. That reads the ruling's "within Safari's limits" as law 7 at 60 Hz. Playwright WebKit is an engine build, so G-7 is an indication. Safari's Web Inspector on an iPhone is the reading, and it amends. A failing G-7 stops BM-12 and brings σ and the layer's region to the owner (B10-8).
- **What else is unread.** Whether WebKit paints a translated child inside the filtered layer is a fact reading for the same wave (Safari's Web Inspector, Layers; §15.2). Playwright WebKit drew the neck under a running Web Animation (`pass-9/critique-B-check-webkit.json`), which is an indication only.
- **Home Assistant's one fuse.** A filter held at the folded rest filters the dock's own paint and samples no backdrop, since the 12.0.0 dock samples nothing. Home Assistant is asked whether it counts that filter as its one live fuse, which would make a dialog's veil opened over a folded dock a second blur layer (§17; B10-8).
- **Reduce Motion.** The fold is the dip (§5.3), and the filter never turns on.
- **Bytes.** It adds 267 B of rules and 201 B of markup in the dock's split module, which only a dock with a seat beside it imports. They are eager at value.js, daraksha and Home Assistant and absent elsewhere (A10-10). daraksha deletes up to 2,024 B of its own neck when it adopts.
- **The law it needs.** P5 gains one exception and the ceiling another, both licensed by `restraint.md:125-128` ("Overshoot and goo belong to the spatial morphs he ruled: dock fission and fusion"). The text is in `pass-10/precepts.md`.

### 7.5 What the dock sheds

- **Choice 2 A.** The unused dock parts and the search helper go. No released site uses them.
- **12.0.0.** `useDockCtaReceive`, `useLiquidReveal` and `cta-seat.css` go (−278 B of sheet at every dock site). No site mounts the composables, and their motion broke the law: a second sign of state, a scaled box, and a blur channel. If a site asks for a call to action that joins a seat, it is §7.3 read backward.
- **D3 and W-R.1.** The luminance clamp goes (§6.1).

## 8 Controls

### 8.1 The selection mark (choices 15 A, 16 A, 17 A, 18 C, 19 B, 20 A; Q3, Q4, Q8, Q15, Q16)

One writer serves SegmentedTabs, a dock run, DockLayerGroup's switcher and the Switch's thumb. The mark is one inert, `aria-hidden` capsule per group, its option's size, moved by `translate` alone (law 2). The selection itself is `aria-selected` or `aria-current` on the option.

| State | What a person sees | Delivery |
|---|---|---|
| Rest | The chosen option sits on a soft fill. Its word is at full ink, the others at the muted ink | — |
| Hover | The option's own fill grows in at the hover strength (§6.2), the chosen option's too, under the mark | rule 1, 150 ms |
| Press | The pressed option's fill takes the press tone, and on the chosen option it shows through the mark. Nothing shrinks, and the mark does not move yet | rule 1, about 100 ms |
| Tap | The model and `aria-selected` change at once. The mark glides through the options between and settles on the tapped one, and the two words trade ink as it goes | rule 2 on the dock row: 225 ms on a 38 px hop to 383 ms on 300 px, to half a pixel, passing its rest by 0.30 % of its travel at most |
| A second tap mid-glide | The mark turns toward the new option from where it is and at its own speed | rule 2, sampled again |
| Drag (where the host opts in) | The mark follows the finger after 6 px of slack, taken where the slack runs out so it never jumps. Options passed are never chosen | rule 3 |
| Release | The option under the finger is chosen at once, and the mark settles on it with the finger's speed, capped so it passes its rest by no more than a settle from rest does | rule 2, seeded by keyframes.js's estimator over 80 ms |
| Cancel (a scroll takes the touch) | The mark returns to the chosen option, and nothing is chosen | rule 2 |
| Arrow keys | The mark fades across from the old option to the new one (18 C) | a crossfade, counted once |
| Reduce Motion | The mark fades across | 150 ms |

- **No lift (15 A) and no stretch (16 A).** O-4 holds: one object, at its own size.
- **Equal options in every pill strip (17 A).** No box moves when the choice moves. A strip without room scrolls (BL's overflow F1), and the mark lives in the scrolled box.
- **No more edges (20 A).** The fill and the ink, with an edge only under more contrast. Every host already has an edge (the strip's track, the dock's border), and restraint bars stacked hairlines.
- **Forced colours and more contrast.** The sign is drawn on the mark. Today `accessibility.css:9-51` rings every `aria-selected`, `aria-pressed`, `aria-checked` and `aria-current` element with a 2 px `!important` border inside `@layer components`. A border moves boxes: run on glass-ui 11.1.0, a three-tab strip's boxes shift by 8 px when the choice moves to the widest tab, in both modes (`pass-6/fold/forced-colors.json`, run in pass 10). The fixture's unlayered `border: 0 !important` could not undo it, because a layered `!important` declaration beats an unlayered one. So the cure is in the rule itself: both arms narrow to `:not(.selection-option)`, in the same release as the mark (§14).

The mark on each host:

| Host | The sign | Drag | Commit |
|---|---|---|---|
| SegmentedTabs, pill | the mark | where the host opts in (`:draggable`; no site sets it today) | at `click`, or at release on the option under the finger |
| SegmentedTabs, underline | a hairline, `scale` on its inline axis | no | at `click` |
| Dock run that fits | the mark | where the host opts in, with `pan-y` | navigation at `click`, or once at release |
| Dock run that scrolls | the mark, in the scrolled box | no: a slide scrolls | at `click` |
| DockLayerGroup's switcher | the mark on the block axis; no site shows it, so the overfitting rule decides whether the switcher stays | as SegmentedTabs | as SegmentedTabs |
| Switch | the thumb, the mark of a two-seat group | no (S2) | at `click` |
| PagerDots | today's worm (the carousel study's A) | no | at `click` |
| Slider, continuous | occupied length | the finger's own (rule 3) | the model as it moves; `valueCommit` once at release; no speed carries the value on (law 3) |
| Slider, stepped (22 B) | occupied length | the fill travels a step at each boundary crossed (R-9's leg) | at each boundary; the fill rests on the step it last reached |

Bytes: the mark's sheet +585 B and its writer +914 B; `useSelectionIndicator` is no longer called by SegmentedTabs (−534 B) in 11.3.0, and its export goes in 12.0.0. `useTabDragMorph` goes in 12.0.0 (−449 B).

### 8.2 The Switch, the pager and the carousel

- **The dark Switch, choice 30 B, in 11.3.0.** It also sets the dark value of the one knob tone that the Switch, the Slider and the capsule share.
- **A Switch is not dragged.** No site asked for that, and a tap still toggles (S2; Q20).
- **The carousel** takes its study's four defaults:
  - the picture moves with its slide;
  - a press uses the browser's own smooth scroll;
  - a flick turns one card;
  - the dots keep today's worm.

  Under Reduce Motion its press dips (§5.3), which goes to BL.

### 8.3 The slider while held (choice 23: C)

The owner kept the expanded view, refined after the ChatGPT app, and on by default on a phone and a desktop (O-426): "the rounded shell that grows out of the track, with the knob growing inside it, on a press, on Tab, and on hover-intent where there is a mouse". It lands on BL's slider build (W-B.18 at `fe30f9882`). That build already sets one height and radius for the track, fill and thumb (R-1, R-2) and the thumbless slider as the default (O-408: "capped and invisible, like you're just pulling the track"). It also makes the fill a capsule clipped by the track's round end (R-9), and stops mounting the loupe, the focus veil, the grasp carriers and the velocity bridge (R-13).

**C, the construction.** The slider's own ground is the shell. ChatGPT nests three capsules on one centre line, shell ⊃ fill ⊃ thumb, and its shell is the track (MEASURE §2.2). C does the same with the track's own ground, so nothing is added and nothing is stacked.

- The shell node (BL's) carries the track's ground, `--glass-slider-track-background`, or `currentColor` at 16 %. At rest it is clipped to the track's capsule, so the slider looks as it does today.
- One variable, `--slider-open`, drives one `clip-path` leg on the shell. It is 0 at rest, g/2 under a resting mouse after a 120 ms dwell (4 px or less, P0a's hover edge), and g on a press or on Tab. g is 8 px and never more than two thirds of the band.
- The fill does not change.
- A thumbless slider never draws a knob, at rest or held, so the fill's capped end is the grip (O-408). A slider with a knob grows it by `scale` to the band plus g, on a press or Tab only.
- The focus ring is the track's outline at `outline-offset: max(2px, var(--slider-g))`, the grown ground's edge, in every state. It shows only on Tab, when the ground is at g, so it never moves, and it fades in and out on `--duration-fast`; under Reduce Motion it sits 2 px out. The first sketch tied the offset to the opening, and as Tab left the ring jumped 6 px on the first frame (`pass-10/critique-A-check.json`, ring-leave; A10-5).
- A site's own ground grows in its own colour, so daraksha's gold groove grows gold. An image ground stays on the track's box (`background-origin: content-box`, `no-repeat`), so a ramp stays aligned with its values, and its ring is clear.
- The readout, the value said while held, enters from 0.9 with its fade and leaves by fading alone (P0a rule 3).
- The spectrum variant takes the same rules.
- The root's box never changes, and it is the hit region in every state: the grown ground takes no pointer, so a tap on a neighbour within g reaches the neighbour. The first sketch let the grown shell take taps up to g outside the root, in Chromium and Playwright WebKit (`pass-10/critique-B-check-*.json`, slider hit; B10-6). The grown ground overlaps a neighbour by up to g while it shows, and a site turns the view off with `:expand="false"`.

The sketch is `pass-10/slider/sketch/slider-expand-c.css`, with its forced-colours arm in `slider-expand-c.fc.css`. It replaces W-B.18's section from "THE EXPANDED VIEW" to the forced-colours block.

**The numbers** (outer · band · knob, in px; `pages/P10-slider.html`):

| Band | A, as built | B, pass 9's (withdrawn) | C |
|---|---|---|---|
| sm 12 | 28 · 12 · 20 | 28 · 20 · 16 | 28 · 12 · 20 |
| md 20 | 36 · 20 · 28 | 36 · 28 · 24 | 36 · 20 · 28 |
| lg 28 | 44 · 28 · 36 | 44 · 36 · 32 | 44 · 28 · 36 |
| ChatGPT | — | — | 68 · 42 · 34 (shell · fill · thumb) |

Each grows and returns over 200 ms on present, one clock both ways. A hover then leaves the way it came (P0a rule 1), and the page-thread clip shows six frames at 30 Hz. The first sketch returned on 120 ms, four frames (A10-6, B10-4).

**What runs**, read on the page's model in headless Chromium (`pass-10/access/p10-probe.json`). The real sheet's fixture inlined an `index.css` of relative `@import`s, so `--motion-tempo` was undefined, no spring duration resolved, and its own lists of what started are empty. BM-5's proof re-runs the real sheet with the token partials loaded (A10-11).

| Slider | A: hover / press | B: hover / press | C: hover / press |
|---|---|---|---|
| Default (thumbless, with a readout) | 3 / 5 | 6 / 8 | 1 / 3: the clip; the readout's opacity and scale, which are one appearance |
| With a knob | 3 / 3 | 6 / 6 | 1 / 2: the clip; the knob's `scale` |
| A site's own colour | 3 / 3 | 6 / 6 | 1 / 1 |

Under §4.4's rules, C is one movement on a hover and two on a press. The one case over the ceiling is a slider with both a knob and a readout, which starts three on a press: the ground, the knob and the readout. O-426 names all three ("the rounded shell that grows out of the track, with the knob growing inside it … the value said while held"), so it is one of §1's yields, gate G-3 names it, and the owner may cut one (§14.1; A10-7).

**Read on the real sheet** (BL's build with C spliced in, at md; `p10-probe.json`). These are end states only, since the fixture's transitions never resolved (A10-11), and they were read before the final fold's amendments. The ring now stands at g in every state and shows only on Tab.

- At rest the clip is `inset(8px round 10px)`, the ground is the track's colour at 16 %, the track itself is transparent, and the ring sits 2 px out.
- A mouse rest opens it to `inset(4px round 14px)`, with the knob at scale 1.
- A press or Tab opens it to `inset(0px round 18px)`: the ground is 36 px tall and the ring 8 px out. A knobbed slider's knob scales by 1.4.
- On release the ground returns to 10 px a side.
- Under Reduce Motion it stays at `inset(8px …)` with the ring 2 px out.
- Under forced colours the ground is Canvas with a 1 px CanvasText edge, the track's own outline is off, and the root's 2 px outline is the focus ring.
- More contrast changes nothing.

A, as built, also deepens the track's ink from 16 % to 24 % on hover and press. C removes that leg.

**Bytes.** C is +43 B over BL's sheet (2,320 → 2,363 B gz, re-priced after the final fold's amendments) and adds no script, node or listener (`pass-10/slider/slider.json`). It removes BL's separate card ground, its hairline, its opacity leg, the hover's knob growth and the track's ink leg. It ships in the release where BL's slider removals land (−776 B of sheet, −1,525 B of script), so no slider site's sheet grows.

**Why B was withdrawn** (pass 9's two critiques; `pass-9/fold.md`):

- B grew the band, the knob and a separate shell on five page-thread legs, nested four capsules where ChatGPT nests three, and moved a hover edge by more than 4 px.
- It raised a knob on the default thumbless slider, and painted a site's own ground grey.

**Under a stall.** On a knobbed slider, the knob's `scale` runs on the compositor and the ground's clip on the page's thread. Under a busy page the knob can stand g/2 past an ungrown band for those frames: a whole slider, not a broken one. A thumbless slider has one leg and cannot come apart. A Busy-page look at C is optional (§15).

**Strips.** `pass-10/slider/strip-held-{light,dark}.png` show P10-slider held open at 390 px. Its ground grows round the fill in the track's colour, gold on the site's own colour, and no knob shows on the default slider.

## 9 The toggle (O-428)

> "we should re-design the darkmode toggle to be more like daraksha's for glass-ui, but slightly less ornate, but coloured too."

daraksha's toggle (`ThemeControl.vue`, a private repo, so its idea is taken and none of its assets) is an eight-point star made of two squares that turns, draws its points into a disc, and lets a night disc slide across to carve a crescent. Glass's keeps that grammar with fewer parts. It ships in 11.2.0, after BL's 11.1.2 toggle fixes (the press stall, the reduced-motion cuts, the fade of the words).

**The glyph** (`pass-10/toggle/sketch/DarkModeToggle.next.vue`, `dark-mode-toggle.next.css`, amended by the final fold). It sits in a 24 × 24 viewBox:

- **The sun.** A disc of r 6.5, and eight round rays from r 8.5 to 10.5 (stroke 2).
- **Dark.** The rays scale to 0.5 about the centre, hidden under the disc. A night circle of r 5.75 at (15.5, 8.5), filled black inside the glyph's mask, slides from `translate: 9px -9px` to 0 and carves the crescent. A luminance mask cuts only under black. The first sketch's night inherited the glyph's colour and left 63 % (Chromium) to 86 % (Playwright WebKit) of the disc where the bite should be. With the black fill the bite is the ground exactly in both engines (`pass-10/critique-B-check-*.json`; A10-1).
- **One clock.** The rays, the night and the colour ride one 200 ms clock: the shapes on present's curve, the colour on `--ease-standard`. Going dark, the night follows the rays by 50 ms, and coming back it leads them.
- **Colour.** `--section-color-5` (amber) in light and `--section-color-2` (indigo) in dark: a warm sun and a cool night, each the library's own section colour for its theme. The colour tweens with the glyph, so nothing changes colour between two frames (P0; A10-2). `--toggle-tone`, set on an ancestor, replaces both, so a site with one ink sets it to that ink (A10-9).
- **The button.** It becomes a `.plate` that answers hover and focus as a fill alone (`--plate-from: 1`). Its glyph is its one on-mark and its press's answer, so the plate takes no on fill from `aria-pressed`, no press tone and no shrink. That needs one attribute the plate reads, a row for BL (§14.2). Without it, W-B.17's on-list, which takes `aria-pressed="true"`, would rest the toggle at the on strength in dark mode, a second current sign in every dock, and a flip would run the plate's two legs as well (A10-2). `useLiquidPress` leaves the component.
- **The count.** A tap runs three legs: the rays, the night and the colour. That is one of §1's yields, by O-428, and gate G-3 names it. A hover runs one, the plate's fade. On a phone, where nothing hovers, the glyph's change at the click is the press's whole answer.
- **Reduce Motion.** The rays' opacity crossfades against the night's at its carving place, on the same 200 ms clock, so the page-thread leg shows six frames at 30 Hz (B10-4). The crossfade counts as one, so a tap runs two with the colour.
- **Forced colours.** The mask keeps its own white and black (`forced-color-adjust: none`), so the night carves under any system theme, and the glyph takes the system's button text. This follows from the cascade and is unrun; BM-1's proof reads it (§15.3).

The rays and the night are SVG children's transforms, and the colour is a colour: all three run on the page's thread in WebKit, as effects of 200 ms, which P5 admits.

**Bytes.** Today the svg is 251 B and the css 246 B. The new svg is 312 B and the css 411 B, so the toggle grows by 226 B (`pass-10/toggle/toggle.json`, re-priced after the final fold's amendments). Its hover and focus rules move to W-B.17's plate.

**The page.** P10-toggle shows A (today's), B (the coloured design) and C (B's motion in the ink, which is what `--toggle-tone` gives a site). It still draws the first sketch's night and is listed for repair (§15.1). B ships unless the owner sends another letter.

**Where it mounts:**

- value.js's `Dock.vue`
- keyframes' `ChromeDock.vue`
- gaggle's prototype
- slides' `DeckView.vue` and `main.ts`
- atlas (`DockSettings`, `DockFoot`)
- fourier's end-to-end tests

dns-analysis draws its own, and Home Assistant only tests it. atlas holds a bound of one focal ink per page, so it is asked whether its docks take the coloured toggle or set `--toggle-tone` to their ink (§17; A10-9).

## 10 Access

Every part this design adds or changes, under each mode a reader can set. The runs are headless Chromium unless marked, which is not VoiceOver, Windows High Contrast or Safari. What only a device can show is listed in §15.

### 10.1 The keyboard

- **The sliders.** Tab reaches every slider in reading order (`p10-probe.json`, `tab order P10-slider`: the page's four buttons, then each card's Volume, Playback and Transport). Tab grows the ground to g, as a press does: a keyed action moves as it does for the pointer, and only a keyed choice fades (§12). The ring sits at the grown edge, 8 px out, and the arrow keys change the value with the ground held open.
- **The mark.** Focus enters on the chosen option under a roving tabindex. The arrow keys move the choice, and the mark fades across (§8.1).
- **The toggle.** It is a button with `aria-pressed`. Enter or Space flips it and runs the same legs as a click: the rays, the night and the colour. The probe's cell (`toggle B click`) read five, two of them the plate's on fill, which the toggle no longer takes (§9; A10-2).
- **The plate.** The seats are reached in run order (`tab order P10-plate`).

### 10.2 The reading order

The accessibility tree of each page (`p10-probe.json`, each `tab order` cell's `tree`) reads the ask first, then the controls in visual order. Each slider is named by its row and letter ("Volume, A"), and each toggle by its letter and size. The selection mark is `aria-hidden`, so the order is the options' own. That VoiceOver on an iPhone follows the same order is an inference: the run read Chromium's accessibility tree, and VoiceOver reads WebKit's (B10-5). VoiceOver itself is an optional device reading (§15.2).

### 10.3 Forced colours

- **The slider** (C on the real sheet). The ground is Canvas with a 1 px CanvasText edge, the track's own outline is off, and the root's 2 px solid outline is the focus ring.
- **The mark.** Today's border moves a strip's boxes by 8 px (§8.1). From 11.3.0 the sign is drawn on the mark and the global rule skips the options, so no box moves.
- **The toggle.** Forced colours set the button's `color`, and the glyph paints in `currentColor`, so it takes the system's button text. Its night carves because the mask keeps its own black and white (`forced-color-adjust: none`). The first sketch's night inherited the glyph's colour and, under a theme with light button text, would have cut nothing (A10-1). This follows from the cascade and is unrun; BM-1's proof reads it (§15.3).

### 10.4 More contrast

- **The slider.** Nothing changes.
- **The mark.** The mark's edge shows only under more contrast (20 A). The same global rule as under forced colours applies its 2 px border there, so its narrowing cures both modes.

### 10.5 Reduce Motion

Read on the real sheet and the pages (`p10-probe.json`):

- **The slider.** The ground stays at `inset(8px …)` with the ring 2 px out, so nothing grows. The readout fades.
- **The toggle.** Its legs become the rays' opacity and the night's opacity, a crossfade on its 200 ms clock, and the colour still tweens (§9).
- **Every other part** takes the forms in §5.3. Pass 10 ran none of them under Reduce Motion; the tranche's gate G-5 holds them there (no property a state change moves changes in one frame), and §15.3 lists the checks each wave's proof owes (A10-12, B10-14).

### 10.6 Low Power Mode at 30 fps, and WKWebView at 60

Every leg this design adds or changes, as frames and as the largest share of its travel drawn in one frame (`pass-10/access/frames.json`, arithmetic on the curves, re-run by the final fold):

| Leg | ms | 60 Hz: frames, steepest | 30 Hz: frames, steepest | Thread |
|---|---|---|---|---|
| The slider's ground grows (press, Tab, hover) | 200 | 12, 0.189 | 6, 0.323 | page (`clip-path`) |
| The slider's ground returns (A10-6) | 200 | 12, 0.189 | 6, 0.323 | page |
| A knob grows | 200 | 12, 0.189 | 6, 0.323 | compositor |
| The readout enters (opacity) / leaves | 200 / 120 | 12, 0.221 / 8, 0.339 | 6, 0.372 / 4, 0.530 | compositor |
| The toggle's rays and night | 200 | 12, 0.189 | 6, 0.323 | page (SVG children) |
| The toggle's colour (A10-2) | 200 | 12, 0.221 | 6, 0.372 | page |
| The toggle under Reduce Motion (B10-4) | 200 | 12, 0.221 | 6, 0.372 | page |
| The plate's hover fade | 120 | 8, 0.339 | 4, 0.530 | compositor |
| The press, each way | 120 | 8, 0.232 | 4, 0.378 | compositor |
| Every exit, on `--exit-curve` (`--ease-out`) | 120 | 8, 0.388 | 4, 0.616 | compositor |
| The dip, each half | 100 | 6, 0.372 | 3, 0.464 | compositor |
| The fold, dock row, to half a pixel | 339 | 20 | 10 | compositor; on a dock with a seat, the page while the goo's filter is on (§7.1) |

- **At 60 Hz**, WKWebView's rate and Safari's default, every leg lands within law 7's two fifths.
- **At 30 Hz**, every page-thread leg runs 200 ms or more and shows six frames, which is law 7's 30 fps line. The final fold brought the last two there: the slider's return and the toggle's reduced crossfade (A10-6, B10-4).
- **The compositor legs under 167 ms** (the press, the hover fade, the readout's leave, the exit and the dip) show three or four frames if the compositor is also held to 30 fps in Low Power Mode. Nobody has read whether it is (the record's R2, second run; B10-5). Law 7 exempts them on that inference, and the 30 Hz column is their worst case, not a reading. The share of travel drawn in one 30 Hz frame is not a law, and the design sets no bound on it (A10-3).
- **A page-thread leg can also lose frames to a busy page**, which this arithmetic does not model. That covers the slider's ground (§8.3's stall note), the toggle's glyph, the menu's grow (§6.3) and the goo docks' close (§7.1). Everywhere else, the move to single curves is what puts a state change on a curve WebKit's compositor takes (§4.1), Home Assistant's WKWebView included. That rests on WebKit's source and release notes; no iPhone has read it.

### 10.7 Hit regions

- **The folded window.** As pass 4 wrote it, the window's 236 px box takes the hit everywhere in its box: at the disc, 100 px past it over the neighbour, in the gap between, and outside the disc's rounded corner (`pass-4/critique-B-check.json`; `pass-10/access/window-hit-chromium.json`, `as_written`). With pass 5's cure (§3) the neighbour takes its own hit, and the gap and the far corner hit nothing (`pass5_cure`). The cure is bounded by the window's rectangular clip, not its rounded end. Critic B's two added points, in Chromium and in Playwright WebKit alike: (300, 126), past the window's straight edge, hits nothing; (250, 102), outside the window's rounded end, hits the dock (`pass-10/critique-B-check-*.json`; B10-7). The corner, about 290 px² at the 52 px disc, is accepted (§3). Both points join `window-hit.mjs` and the proofs of BM-8 and BM-11.
- **A panel opened from a seat** opens 8 px clear of the seat, so the seat's glass is never under it (`critique-B-check.json`, `E_over_seat`).
- **The slider's grown ground takes no pointer** in any state (`pointer-events: none` on the shell). The root's box is the hit region at every state. The first sketch gave the grown shell the pointer, and a tap 6 px outside the root, over a neighbour, went to the slider in both engines (B10-6). The cure is unrun, and BM-5's proof reads it (§15.3).

### 10.8 Owed

- **daraksha's WebKit crash in occasion mode** is still open ([IN value.js 5]). No glass part can be called safe in occasion mode until daraksha sends the steps and the WebKit version, and the slider and the toggle are run against it. Its message asks for both (§17).
- **VoiceOver on a device** is an optional reading (§15.2). **Forced colours on the toggle**, and every part and mode pass 10 did not run, are engine checks the waves' proofs owe (§15.3).

## 11 The ledger

Every figure is a standalone gzip -9 of the part, taken from passes 1 to 10 and re-run by the final fold (`pass-10/ledger/ledger.mjs`, `ledger.json`). A standalone figure is an upper bound on its own side of a site's bundle, so a net of an addition and a removal bounds neither side. **Every verdict below is indicative.** Gate G-4 closes each one per entry against the site's built bundle at each release candidate (B10-11). A row marked "on intent" loads on first use.

**By release**

- **11.2.0.** The toggle grows by 226 B where it mounts (`pass-10/toggle/toggle.json`, re-priced after the final fold's amendments). The plate's ladder is token values, with no new rule.
- **11.3.0.**
  - The springs: −1,637 B of `linear()` tokens and +150 B of single curves at every site; +655 B for the player, on intent.
  - The rim: +273 B and −319 B.
  - The mark: +585 B of sheet and +914 B of writer. `useDockRunMark` (−1,349 B) and the run's rules (−494 B) go. `useSelectionIndicator`'s −534 B is held out of the sums: SegmentedTabs and ToggleGroup reach it through `useSelectionGroup`, so it is credited only when BM-4 shows it leaving each entry's import graph (B10-11).
  - Presentations:
    - presence on its own legs, +345 B;
    - the hold, −110 B;
    - `useSpringMount`'s calls, −791 B;
    - the panel rule with the exit token and the context seed, +163 B;
    - the veil, +112 B;
    - the touch slide's loader in the entry, +60 B;
    - the touch slide itself, at most 377 B, on intent (A10-10).
  - The slider: +43 B (`pass-10/slider/slider.json`, re-priced).
- **12.0.0.**
  - FadingScroll: +201 B and −904 B.
  - The collapsing bar: −87 B.
  - Sheets: +246 B of sheet, and +977 B and −1,546 B of script.
  - The fold: +393 B and −1,356 B. `cta-seat.css`: −278 B. `useTabDragMorph`: −449 B.
  - The goo: +468 B in the dock's split module, which only a dock with a seat beside it imports. It is eager at value.js, daraksha and Home Assistant and absent elsewhere (A10-10). daraksha's own neck: −2,024 B.

**By site** (net bytes; CSS and JS apart; "eager" leaves out what loads on intent):

| Site | 11.2.0 | 11.3.0 CSS | 11.3.0 JS (eager) | 12.0.0 CSS | 12.0.0 JS | Bound | Within (indicative) |
|---|---|---|---|---|---|---|---|
| atlas | +226 | −1,234 | +211 (−821) | +562 | −3,278 | no new mount cost; no box moves | qualitative: nothing new runs at mount |
| value.js | +226 | −1,188 | +211 (−821) | +1,030 | −3,278 | on intent where eager won't fit | qualitative |
| daraksha | 0 | −1,188 | +211 (−821) | −1,195 | −1,925 | reader route's eager JS: 45 B spare | yes |
| fourier | 0 | −1,234 | +211 (−821) | +562 | −3,278 | none stated | — |
| keyframes | +226 | −1,188 | +211 (−821) | +562 | −3,278 | none stated | — |
| gaggle | +226 | −1,277 | +211 (−821) | +562 | −2,829 | 11,282 B first load | yes |
| Home Assistant | 0 | −1,188 | +211 (−821) | +742 | −1,925 | entry: 200 B, CSS and JS together; every script: 800 B | yes, both |
| slides | +226 | −1,231 | +211 (−821) | +361 | −1,925 | none stated | — |
| dns-analysis | — | — | — | — | — | no glass-ui | — |

What changed from pass 10's table (B10-11, A10-10):

- gaggle mounts Dialog, side sheets and menus (`pass-8/fold/hosts.json`), so it now carries the overlay and sheet rows that pass 10's sums left out.
- The touch slide's chunk is priced.
- `useSelectionIndicator`'s credit is held out.
- Home Assistant's every-script bound is checked beside its entry.
- The toggle and the slider are re-priced.

BL's own removals in the same releases are credited to BL, not counted above: W-B.18's slider removals (−1,525 B of script, −776 B of sheet) and D3's clamp (−2,860 B, −187 B).

Home Assistant's 11.3.0 sum depends on which overlays its entry mounts. The overlay rows alone net −221 B for an entry with a Dialog or side Sheet and +458 B for one with menus only, and the springs' −1,487 B comes on top in both cases. Its message asks which.

## 12 The precepts

The amendments are drafted in `pass-10/precepts.md` for the tranche's first wave (BM-0). None is applied in the study. Each rests on a choice the owner ratified, on an order, or on a law he set; the final fold struck the two drafts that rested on none (A10-3, A10-7).

- **motion-canon.md.**
  - P3's exit clause: an exit fades where it is.
  - P0a rule 6: a body that carries a speed turns round on the player.
  - P5 rewritten around WebKit's compositor list. It keeps the effect clause (a page-thread property may carry an effect of 200 ms or less) and names two orders: the menu's grow (O-171) and the goo (choice 24 C).
  - P6's line on lengths and dips, and the toggle's reduced form on its 200 ms clock.
  - P7: the single curves, the sampled settle, and keyframes.js as the one brain.
  - Law 7's 30 fps line, now binding a page-thread leg.
  - P0a's exit curve is unchanged (§5.2).
- **restraint.md.**
  - `:60`, one blur: unchanged by BM, since O-260's register is W-R.1's.
  - `:130`, scoped to a keyed choice, which fades its mark across (choice 18 C). Every other keyed action moves as it does for the pointer, by P0, the later ruling (`restraint.md:23`).
  - `:143`: unchanged (choice 27 A).
  - The ceiling: choice 19 B's three counting rules as ratified, the counts over two that §4.4 names, and the goo's two nodes.
- **affordance-map.md.** Four rows: DarkModeToggle, the slider, the pill indicator, and every plate.
- **The tabs-seam gate's arm (e).** Unchanged in substance under Q3 A and Q16 C. It adds one assertion: the indicator's transition list carries `translate` alone.

## 13 The apotheosis table

The owner asked that every facility of the reference sites be answered in one of three ways (O-426). **Matched** means the design does what the reference does. **Surpassed** means it does more, and says how. **Refused** means a law refuses it, and names the law. A facility the design meets only in part is split into the part matched and the part refused, each with its evidence or its law (A10-8, B10-2). The facilities are every row of `UNION.md`'s matrix that rida.dev (R) or Apple's iOS 27 (A) shows, plus the ChatGPT app's slider from BL's measure. A row the owner ordered against a law is answered by the order.

**No answer here rests on an iPhone reading.** None has returned (`READINGS.md`), and a reading, in UNION §4's sense, is the owner's report or his screen recording. "Evidence" names what of ours stands behind each answer, and "Kind" says what that is (B10-3):

- *source*: WebKit's source or release notes, an inference about production Safari;
- *Chromium*: a headless Chromium run, with no GPU;
- *WebKit*: a Playwright WebKit run, an engine build and not Safari;
- *arithmetic*: a computation on curves, geometry or bytes;
- *page*: a reading page the owner has not read;
- *design*: a rule of the design, not yet run;
- *law*: a refusal, which needs no measure.

The references' own readings are cited in the union rows.

### 13.1 The lens (rida's bar, iOS 27's tab bar)

| # | Facility | Who | Answer | Evidence or law | Kind |
|---|---|---|---|---|---|
| L1 | A selection lens that follows the finger and settles on a tab | R, A | Matched in motion; surpassed in access and cost | One mark, moved by `translate`, follows the finger where a host opts in and settles with the finger's speed (§8.1; `pass-6/fold/fold.json`; P5-mark). The follow writes at each pointer event, which production Safari delivers at 60 Hz by the platform's terms (UNION I10); rida reports 118 fps on its author's phone. It needs no shader, worker or page snapshot, and it keeps keys, `aria-selected` and VoiceOver order, where rida's bar is not operable by keyboard | arithmetic, Chromium, page |
| L2 | A lift that always completes its rise and fall | R | Refused | No lift: choice 15 A; O-4, "one object moves, at its own size" | law |
| L3 | How far the lens lifts | R, A | Refused | As L2. A 1.08 lift moves its edges 1.3 to 3.8 px under a fingertip ("a motion nobody can see is a cost with no intent", restraint's ceiling) | law |
| L4 | The pill and the lens never both at full strength | R | Matched | One ink-carrying sign per selection: the mark or the pressed fill, never both at full (law 10; §8.1) | design |
| L5 | A velocity squash at constant area | R, A | Refused | P2 (controls ease without overshoot) and choice 16 A; a squash is a non-uniform scale, which bends a capsule's ends (§3) | law |
| L6 | A rubber-band stretch past the bounds | R, A | Refused | Choice 16 A; law 3 | law |
| L7 | The bar swells, glows and washes under a press | R, A | Refused | P0a's press row ("2 % of colour, or a scale no deeper than 0.96") and the ceiling's two per press. Glass answers a press with the option's own fill (§5.1, §8.1) | law |
| L8 | Glow and press light under the finger | R, A | Refused | Restraint, Shading: no glow, sheen or cursor light | law |
| L9 | The glyph grows under the lens | R, A | Refused | O-4: no tab scales on hover or press | law |
| L10 | The filled glyph shows only inside the lens | R | Refused | Law 10: a second sign of one state | law |
| L11 | The lens refracts the page (magnify, edge pull, chromatic split) | R, A | Refused | Law 6: WebKit drops a reference filter at compositing, so refraction needs a page snapshot in production iOS Safari, a workaround | law (source) |
| L12 | Magnifying known content by a DOM copy | A | Refused | The loupe goes (Q18; BL's R-13); no site mounts it (`pass-6/census/hosts.json`) | law |
| L13 | The lens's rim line and shadow ring | R | Refused | Restraint: one shadow per surface, no stacked hairlines | law |
| L14 | An invisible snap scroller per tab as the input | R | Refused | No workaround; a tab is a button | law |
| L15 | Settle and commit | R, A | Matched | A release commits the option under the finger at once, and the mark settles to half a pixel (§8.1; `pass-6/fold/fold.json`, `band`) | arithmetic |
| L16 | A cancel returns the lens to the selection | R | Matched | A scroll that takes the touch returns the mark and chooses nothing (§8.1) | design |
| L17 | Momentum halted by toggling `overflow` | R | Refused | No workaround | law |
| L18 | A mouse drag emulated as a scroll, the trailing click swallowed | R | Refused | No workaround; law 3 (a tap commits) | law |
| L19 | Separate tap and snap springs | R | Refused | P7: one source, one row per lane | law |

### 13.2 Fission and fusion

| # | Facility | Who | Answer | Evidence or law | Kind |
|---|---|---|---|---|---|
| F1 | The contact law: two shapes blend as the gap closes | R, A | Matched | The goo blends the seat and the dock from a 6 px gap, in 12.0.0 (§7.4; `pass-9/goo/swap.json`, `iso.json`) | arithmetic; WebKit, an indication |
| F2 | The neck between fusing shapes | R, A | Matched in part | Matched on an open: the neck draws on 3 frames at 60 Hz and 1 at 30, thinner than iOS's at σ 4. Not drawn on a fold: no frame of the dock row's close falls in the neck's range, so the plates meet with filleted corners (§7.4). The ruling takes the goo within Safari's limits, and the thinner neck is its stated cost | arithmetic; WebKit, an indication |
| F3 | A split starts from one position | A, R | Matched | Law 8: the seat lies inside the disc on frame 0 (§7.3; P7-fuse) | arithmetic, page |
| F4 | A union at rest; grouped items share one background | A | Matched | The dock's run is one plate, and its seats are fills on it (§7.2) | design |
| F5 | Glass cannot sample glass | A | Matched | Law 1. A panel from a seat is born outside the plate (`pass-4/critique-B-check.json`, `E_over_seat`), and a dialog's plate is a tint over the veil (§6.5) | Chromium |
| F6 | A separate search button fusing with the bar | R, A | Refused | iOS 27 moved search back into the bar; the search helper goes for want of a site (choice 2 A; the overfitting rule) | law |
| F7 | The dock folds to a disc and opens | A | Matched | The glass's edge cuts each seat, nothing fades but the trade at the disc, and nothing is written per frame (§7.1; `pass-7/fuse/fuse.json`; P7-fuse §2). Its curve is one WebKit's compositor takes, by source; on a dock with a seat the goo's filter puts each close on the page's thread (§7.1; B10-8) | arithmetic, source, page |
| F8 | The theme seat in fission beside the dock | A | Matched | 12.0.0, by the goo (choice 24 C; §7.3, §7.4) | arithmetic; WebKit, an indication |
| F9 | A presentation buds out of its control | R, A | Matched in part | Matched: the menu grows from its button on `bloom`, born beside its host (choice 10 C; §6.3; P4-bud). Refused: rida's seed, a growth from nothing (P0a); its kick spring (P2); the button's shrink and travel (atlas: no box moves); the content's overscale and blur (restraint; Home Assistant's "no blur in motion") | Chromium, page; law |
| F10 | A call to action flies into a seat | A | Refused | No site mounts it, and its scaled box and second sign break laws 5 and 10 (§7.5; the overfitting rule) | law |
| F12 | An alert bubble morphs from a circle into a text panel | R | Matched in part | Its shape as F9. Refused: the glyph's bounce (P2) | law |

### 13.3 Arriving, leaving and scrolling

| # | Facility | Who | Answer | Evidence or law | Kind |
|---|---|---|---|---|---|
| M1 | Glass appears as material, its blur modulated | A | Refused | `restraint.md:143` ("Transform and opacity only") and choice 27 A: glass arrives at full strength by opacity and scale (§6.6; R7; B10-15) | law |
| M3 | A close slower than its open (rida's ζ 0.8, response 0.49) | R | Refused | P0a rule 2: a thing that appeared leaves in about six tenths of its entrance. Glass's exit is a 120 ms fade where it is (§5.2) | law |
| M4 | The first legible frame | R | Matched | A panel enters at 0.96 of its size with its words drawn (§5.1; `pass-8/bud/bud.json`, `entry`) | Chromium |
| M5 | Blur on content in motion | R | Refused | Restraint (no blur in motion) and law 5 | law |
| M6 | A label swap | R | Matched | P0a rule 4's trade (§5.1) | design |
| M7 | The scroll edge effect under a bar | A | Matched | FadingScroll's fixed ramps over native scroll (choice 26 B; §4.3; P2-scroll) | page |
| M8 | A bar that shrinks on scroll and returns | A | Matched | The direction sets a state once, and the change plays on a curve the compositor takes (rule 5), not as a scrub (§4.3; P2-scroll) | source, page |
| M9 | A reading-progress capsule beside the menu button, dissolving as the menu opens | R | Refused | The owner's order puts scroll progress on the dock's own border, edge to edge (`docs/precepts/README.md:105-108`), and no neighbour yields to a menu (§6.3). Glass's rim reveals its stroke by a translated window (§4.3) | law |

### 13.4 Menus, popovers and dialogs

| # | Facility | Who | Answer | Evidence or law | Kind |
|---|---|---|---|---|---|
| D1 | Menu proportions | R | Matched | The measured densities, with the 44 px target floor over 42 pt rows (UNION D1) | design |
| D2 | Press, slide and release across a menu | R | Matched in part | Matched: the touch slide across an open short menu on a phone (choice 14 B; §6.3; P8-present §2). Refused: the 160 ms hold that opens a menu under the finger (Q20: no site asked) | Chromium, page; law |
| D3 | The row highlight | R | Matched in part | Matched: rows take a fill, never the lifted lens, as iOS does. Refused: the highlight gliding between rows, a node added for a motion (the ceiling); each row keeps its own fill, and two rows trade it in place (P0a rule 4) | design; law |
| D4 | Auto-scroll near the edge while holding | R | Refused | Q20: no site asked, and it removes nothing (the overfitting rule) | law |
| D5 | Panel edges flex toward the finger; the list rubber-bands | R | Refused | P2 and choice 16 A | law |
| D6 | Dismissal | R | Matched | reka-ui's dismissal (an outside press, Escape), kept; the exit is §5.2's | design |
| D7 | The keyboard in menus | R | Surpassed | reka-ui's arrow keys, typeahead and Escape, where rida's menu has no arrow keys (UNION D7) | design |
| D8 | The menu opens on where you are | R | Refused | Q20 | law |
| D9 | Canvas-drawn text over transparent DOM text | R | Refused | No workaround; text stays text for zoom and screen readers | law |
| D12 | A long press shows its progress | R, A | Refused | Q20 | law |
| D15 | Dialogs morph out of their buttons; CommandDialog | A | Matched in part | Matched: one blur per modal, the plate a tint over the veil, and presence that can't keep the page hidden (§6.5; P8-present §4; `pass-9/fold/sheet-check-*.json`). Refused: a centred dialog's morph out of its button, struck for its 350 px of travel and three legs (the ceiling; the record, §10.2), and kept as a form the owner may take (§14.1) | Chromium, WebKit; law |
| D16 | A sheet dragged up grows more opaque | A | Refused | G9: a presented panel keeps one rung, and a thicker one would be a second blur value (`restraint.md:60`). The sheet keeps one material at every detent (§6.4; B10-2) | law |

### 13.5 Tabs and segments

| # | Facility | Who | Answer | Evidence or law | Kind |
|---|---|---|---|---|---|
| T5 | Equal slots | R, A | Matched | Choice 17 A (§8.1; P5-mark §3) | page |
| T8 | The bar minimizes on scroll and returns | A | Matched | As M8 | source, page |
| T9 | The selected tab reads first | A | Matched | The chosen word at full ink, the rest muted (law 10; §8.1) | design |
| T10 | Tabs under the keyboard and screen readers | R | Surpassed | Roving tabindex, the mark `aria-hidden`, and keys that fade it across (§10.1), where rida's tab bar is not operable by keyboard (UNION T10) | Chromium |

### 13.6 Sliders and switches

| # | Facility | Who | Answer | Evidence or law | Kind |
|---|---|---|---|---|---|
| S1 | A thumb turns to glass while held | A | Refused | O-260: no blur on controls; law 1. The held sign is the grown ground (§8.3) | law |
| S2 | A switch dragged to toggle | A | Refused | Q20: no site asked; a tap still toggles | law |
| S3 | Slider momentum and stretch at the ends | A | Refused | Law 3: a continuous value is the finger's at lift; choice 16 A | law |
| S4 | Thumbless sliders | A | Matched | The default (O-408; §8.3; P10-slider) | Chromium, page |
| S9 | A pill that absorbs the next stop's dot | A | Matched in part | Matched: the stepped fill travels a step at each boundary crossed (choice 22 B; §8.1; P6-hosts §3). Refused: the dots it absorbs (Q20: no site asked for detent marks) | page; law |

### 13.7 The material

| # | Facility | Who | Answer | Evidence or law | Kind |
|---|---|---|---|---|---|
| G1 | Frost, saturation and veil | R, A | Refused on chrome; matched in part on content | Chrome samples nothing from 12.0.0 (O-260, W-R.1) and stands on D3's firm floor, α 0.897 in light and 0.872 in dark, so its words hold 4.8 over the worst flat ground (choice 6 A; `pass-4/fold/material-fold.json`). Content keeps a frost of 4, 6 and 8 px, under a firmer veil than rida's 53.5 % or the archive's near-zero one (§6.1; R3, R3b) | arithmetic; page |
| G3 | Refraction at the rim and in the lens | R | Refused | Law 6 | law |
| G4 | Specular, sheen, inner and side shade | R, A | Refused | Restraint, Shading: "Remove, do not tune" | law |
| G5 | The edge | R, A | Matched | One hairline in light, none in dark, both under more contrast (choice 7 B; §6.1; R3b's foot) | page |
| G6 | Shadow | R, A | Matched in part | One neutral shadow from the elevation tokens. Refused: Apple's shadow that follows what is behind, which needs the backdrop's pixels (UNION G6) | design; law |
| G7 | Light and dark by what is behind | A | Refused | No masking fallback: the luminance clamp samples the page and goes; the floor solves for the worst ground instead (§6.1) | law |
| G8 | Regular and clear, never mixed | A | Matched in part | One material per surface. Refused: the clear material (the owner, C-59: "Too glassy") | law |
| G9 | Thickness follows size | A | Refused | `restraint.md:60`, one blur value; a firmer rung is a firmer tint, not more blur (law 1) | law |
| G10 | Tint on primary elements only | A | Matched | The plate's tone (§6.2) and the section colours | design |
| G12 | Squircle corners | A | Refused | `corner-shape` is not in a released Safari; capsules and `border-radius` instead | law (source) |
| G13 | Speculars that follow device motion | A | Refused | As G4, and a motion permission for an ornament | law |
| G14 | Content vibrancy | R | Refused | A blend mode on an ancestor makes a backdrop root (UNION G14). Glass's on-glass foregrounds hold 4.8 on the floor instead (§6.1) | law |
| G15 | The user's Liquid Glass setting | A | Refused | Safari exposes no signal, and guessing it would be a masking fallback. The firmer default carries every Safari reader (choice 29 B) | law (source) |

### 13.8 Input and frame rate

| # | Facility | Who | Answer | Evidence or law | Kind |
|---|---|---|---|---|---|
| I1 | Native scroll as the gesture engine | R | Matched | Sheets as native snap scrollers, with iOS's slow snap settle before 27.3 stated (§6.4); runs that scroll keep their scroll (§7.2) | Chromium, WebKit; source |
| I2 | An invisible controller laid over a control | R | Refused | No workaround | law |
| I3 | A 240-slot scroll sampler | R | Refused | No workaround | law |
| I4 | An empty rAF loop to flush the scroll IPC | R | Refused | No workaround; nothing runs at rest (restraint) | law |
| I5 | The display boost: a 1 px animation and an 8 px scroller every 250 ms | R | Refused | No workaround; an animation nobody sees | law |
| I6 | DPR-scaled scrollers and the device-pixel viewport | R | Refused | No workaround | law |
| I7 | The URL-bar throttle bypass | R | Refused | No workaround | law |
| I8 | A scroll-start tripwire; an endless pan that recentres | R | Refused | No workaround | law |
| I9 | Release velocity | R | Matched | keyframes.js's estimator over 80 ms seeds a sampled settle, capped so a release passes its rest by no more than a settle from rest does (§8.1; `pass-6/fold/fold.json`) | arithmetic |
| I10 | Input and rendering lifted past 60 Hz | R | Refused | No workaround: the tricks that lift it are I3 to I8 and I14. Glass designs for the platform's 60 Hz, and every page-thread leg holds law 7 at 60 and 30 Hz (§10.6) | law; arithmetic |
| I11 | A passive `touchmove` at 120 Hz | R | Refused | No use for DOM parts: a follow writes at each pointer event (rule 3) | law |
| I14 | An OffscreenCanvas worker presenting at 120 Hz | R | Refused | No DOM part draws in a worker; no workaround | law |
| I15 | A page snapshot, a glyph atlas, a live-source feed | R | Refused | Law 6 | law |
| I16 | A worker frame protocol with back-pressure | R | Refused | Not a DOM part's need; it fits a site's own canvas | law |
| I17 | A refresh-cap probe and a 60 Hz banner | R | Refused | Restraint: no message about the reader's device | law |
| I18 | Field frame-rate telemetry | R | Refused | No customer (Q20) | law |
| I19 | Dormancy and still-scroll scheduling | R | Matched | Nothing runs at rest; every settle commits its last frame and stops (§4.2) | design |
| I20 | Low Power Mode | A | Matched for page-thread legs | Every page-thread leg runs 200 ms or more and shows six frames at 30 Hz (§10.6). Whether the compositor keeps 60 Hz in Low Power Mode is unread, so the short compositor legs are unproven there | arithmetic |

### 13.9 Accessibility

| # | Facility | Who | Answer | Evidence or law | Kind |
|---|---|---|---|---|---|
| A1 | Reduce Motion | R, A | Matched | Nothing cuts: every part fades, dips or crossfades (choice 8 A; §5.3; `p10-probe.json` for the slider and the toggle) | Chromium; design |
| A2 | Reduce Transparency | A | Refused | As G15: Safari exposes no signal; the firmer default stands for it (choice 29 B) | law (source) |
| A3 | Increase Contrast | A | Matched | The edge, and the mark's edge, under more contrast (§6.1, §8.1, §10.4) | Chromium |
| A4 | Forced colours | R | Matched | The sign is drawn on the mark, and no box moves when the choice moves, which today's rule fails by 8 px (§8.1; `pass-6/fold/forced-colors.json`) | Chromium |
| A5 | The keyboard | R | Matched | Tab grows a slider's ground as a press does; keys fade a mark across (§10.1) | Chromium |
| A6 | Screen readers | R | Matched | The accessibility tree reads in visual order, and each mark is `aria-hidden` (§10.2). VoiceOver itself is unread | Chromium |
| A7 | Zoom | R | Matched | Text stays text; nothing is drawn to canvas (D9) | design |
| A8 | Targets | R | Matched | A 2.75rem target on coarse pointers (BL's G1(c)). The grown ground takes no pointer, so the root's box is the hit region in every state (§10.7; B10-6) | Chromium, WebKit (at rest; the cure is unrun) |
| A9 | Suppressing the context menu and callout | R | Refused | A reader's browser gestures are theirs; no workaround | law |

### 13.10 The ChatGPT app's slider (BL's MEASURE §2.2)

| Facility | Answer | Evidence or law | Kind |
|---|---|---|---|
| Three nested capsules on one centre line, shell ⊃ fill ⊃ thumb | Matched in part | Matched: the track's ground is the shell and grows round the fill on one centre line (§8.3; P10-slider). Refused on the default slider: the thumb (O-408) | Chromium, page; law |
| The shell grows out of the control and shrinks back into it | Matched | One clip grows the ground out of the band and back over 200 ms each way, and the root never moves (§8.3; `strip-held-*.png`) | Chromium (end states; the tween unseen on the real sheet, A10-11) |
| The value said while held | Matched | The readout enters from 0.9 and leaves by fading (§8.3) | Chromium |
| The thumb inset in the fill by a constant margin | Refused | O-408: the default slider has no thumb, and the fill's capped end is the grip. A knobbed slider follows Apple's, its knob over the band (BL's R-1 and R-2) | law |
| The fill's minimum is a circle | Matched | BL's R-9: the fill is a capsule as long as the track, clipped by its round end | design (BL's build) |
| The shell's soft shadow | Refused | Restraint, Shading: a control takes no shadow beyond its surface's one | law |
| The shell as a second, white ground | Refused | Law 1 and restraint (no stacked plates): the track's own ground grows instead, in the site's colour | law |
| Detent dots, grey outside the fill and white inside | Refused | Q20: no site asked for marks; the stepped fill rests on its step (choice 22 B) | law |
| Proportions: the shell 1.62 times the fill (68 over 42) | Matched in part | lg is close at 1.57 (44 over 28). md at 1.8 and sm at 2.33 run larger, since g is a fixed 8 px, capped at two thirds of the band (§8.3) | arithmetic |
| Opens on a press, and on a desktop on hover | Matched in part | Fully on a press or Tab. Half open on a mouse rest: a full opening on hover is refused by P0a's hover edge, 4 px or less | Chromium; law |

## 14 The owner's list, BL's rows and the tranche

### 14.1 For the owner

None of these blocks implementation. Each ships as written here until he sends otherwise, except the two marked open, which are in `OPEN.md`.

1. **The hover plate, choice 5: C** (§6.2), restated by the final fold. Hover is 6.5 % in light and 5 % in dark, on is 10 %, the seat's tone sits on the plate, and the glyph stays still. It ships in 11.2.0. P10-plate shows A, B and C once repaired.
2. **The slider, choice 23: C** (§8.3). It ships in 11.3.0. P10-slider shows A, B and C. B is withdrawn, and once the page is repaired it cannot be sent.
3. **The toggle: B, coloured** (§9). It ships in 11.2.0. A tap runs three legs by O-428: the rays, the night and the colour. P10-toggle's C, B's motion in the ink, is what a site gets by setting `--toggle-tone`.
4. **Choice 9's scope** (§5.1). The shrink stays on buttons and icons that carry no mark. A host of the mark answers by its fill alone, and the toggle by its glyph alone.
5. **Choice 20: A**, no extra edge on the chosen option except under more contrast (§8.1).
6. **A slider with both a knob and a readout** starts three legs on a press: the ground, the knob and the readout, which are the three things O-426 names. It ships so, and he may cut one (§8.3).
7. **The goo** (§7.4).
   - Its neck is thinner than iOS's at σ 4.
   - A fold shows the plates meeting with filleted corners and no bridge frame. An open draws the neck on 3 frames at 60 Hz and 1 at 30.
   - On a dock with a seat, every close runs on the page's thread while the filter is on. Gate G-7 reads its cost, and a failing read brings σ and the layer's region to him.
8. **`--ease-cartoon-punch`'s overshoot** on chips, buttons' rotation and the slider (§4.2). P2 bars overshoot on a control, and no choice names it. **Open** (`OPEN.md`).
9. **Recorded forms he may still take.**
   - Lane D or E for a menu's grow. Today's grow, which ships, is a 370 ms clip on the page's thread by O-171 (§6.3).
   - D for the dialog's veil (§6.5).
   - The struck dialog bud, about 350 px of travel and three legs (the record, §10.2).
   - A grip on a desktop sheet (§6.4).
10. **Choice 27's separate line**: whether the toast keeps its vanish through 11.x (§6.6). **Open** (`OPEN.md`).
11. **The run's corners** (choice 26 B): a seat flush against the run's end is clipped by the plate's arc (§4.3). It is shown to him as a picture once 11.2.0 ships.
12. **Sheets before Safari 27.3** (§6.4). A flick past the last detent can be slow to settle in iOS 26 and 27.2 and in Home Assistant's app. BM-10 ships in 12.0.0 with this stated; he may hold BM-10 for a 27.3 floor.

The exit on `linear`, item 6 in pass 10's list, is withdrawn (§5.2).

### 14.2 BL's rows

- **W-B.18, R-10 and R-11.** C replaces the disc rules and the card shell. O-408's build names the thumbless attribute, which C reads (§8.3). This lands in 11.3.0 with BL's slider removals.
- **W-B.17, in 11.2.0.**
  - The plate's ladder, at C's two rungs (§6.2).
  - The toggle's button as a `.plate`.
  - One attribute the plate reads. With it, a control whose glyph is its on-mark keeps only its hover and focus answers: no on fill from `aria-pressed`, no press tone and no shrink. The toggle is its first reader (A10-2).
  - The toggle itself, as the 11.2.0 row O-428 asks for.
- **The Carousel's reduced press.** It is the dip, 100 ms out and 100 ms in (§5.3), in 11.3.0.
- **W-R.1, in 12.0.0.**
  - The dock's zero rung, written as `backdrop-filter: none`, which is the goo's gate G-6.
  - The veil's register.
  - The luminance clamp's removal with D3.
- **`accessibility.css`.** Both arms narrow to `:not(.selection-option)`, in the release that ships the mark (§8.1).

### 14.3 The tranche

`pass-10/tranche-draft.md` drafts it in the tranche format, for the formation that follows the final fold.

**Seven durable gates:**

- G-1: the single-curve tokens.
- G-2: compositor properties, with named effects and named orders (the menu's grow, the goo's layer).
- G-3: the press and hover counts, with the counts over two named (§4.4).
- G-4: each site's entry, and Home Assistant's every script, within its bound.
- G-5: nothing changes in one frame under Reduce Motion.
- G-6: the 12.0.0 dock samples nothing.
- G-7: the goo's close adds no frame gap over 16.7 ms, in Playwright WebKit with Busy page on (B10-8).

**The waves:**

- **BM-0** applies the precepts.
- **11.2.0** carries BM-1, the toggle, and BM-2, the plate.
- **11.3.0** carries:
  - BM-3, the springs;
  - BM-4, the mark;
  - BM-5, the slider;
  - BM-6, the presentations;
  - BM-7, the rim;
  - BM-8, the conditional 11.x window;
  - its release candidate.
- **12.0.0** carries:
  - BM-9, the removals;
  - BM-10, the sheets;
  - BM-11, the fold;
  - BM-12, the goo, gated on G-6 and G-7;
  - its release candidate.

## 15 Readings and checks

Nothing here blocks a release. Under O-426 every iPhone reading is optional: one that arrives amends its decision. `OPEN.md` lists each with what it would amend.

### 15.1 The letters, optional

Every page on the board, and the three pass 10 adds, asks the owner for a letter. Under O-426 each letter is optional. One that arrives amends its decision, and none holds a release. Every page is listed with its local address in `READINGS.md`.

Four pages show faults the final fold cured in the design. They are repaired, with the page check, before the owner reads them (`pass-10/fold.md`, "The pages"; B10-17):

- P10-toggle draws the first sketch's night, which carves no crescent.
- P10-slider offers B, which is withdrawn, and shrinks its readout in one frame.
- P10-plate draws its levels as colour legs and needs a mouse.
- P8-present §1 draws an exit curve that is neither today's nor any proposed one.

### 15.2 Fact readings on a device, optional

These are not letters. Each claim that rests on one is marked an inference where it stands. None blocks, though BM-8 ships only where its own reading holds.

| Reading | Settles | The claim that rests on it | Where |
|---|---|---|---|
| Q7: frame rate in production Safari, with Low Power Mode off and on | Whether single curves and sampled settles glide on a busy page, and whether the compositor keeps 60 Hz in Low Power Mode | §4.2's delivery; law 7's compositor exemption (§10.6) | R2, R6, P2-scroll on an iPhone |
| P4-bud's F with Frost on | Whether WebKit clips a backdrop by an ancestor's rounded clip with no square patch, and keeps G's frost | The 11.3.0 window (§3, BM-8). Without it, 11.x keeps today's shapes | P4-bud on an iPhone |
| The goo's cost per frame | Paint time on a phone, in Low Power Mode, under a scroll with the dock folded, and in Home Assistant's app | G-7's bound in production (§7.4) | P7-fuse's C with Busy page on; Safari's Web Inspector, Timelines; Home Assistant |
| The goo under WebKit's layers | Whether WebKit paints a translated child inside the filtered layer | §7.4 | Safari's Web Inspector, Layers, in BM-12 |
| The sheet's snap settle before 27.3 | How long a sheet flicked past its last detent takes to settle in iOS 26 and 27.2, and whether a top detent at the scroller's end meets the fault | §6.4; BM-10 (B10-12) | An iPhone on iOS 26 or 27.2; P8-present §3 |
| VoiceOver on a device | The reading order | §10.2 | An iPhone, with BM-1 and BM-5 |
| One blur per modal in WKWebView | Whether Home Assistant's app holds it | §6.5 | Home Assistant's message |
| A Busy-page look at C | Whether a knobbed slider's knob runs ahead of its ground | §8.3's stall note | P10-slider with Busy page on |
| daraksha's occasion-mode crash | Whether any glass part trips it | §10.8 | daraksha's steps, then a WebKit run |

The Low Power Mode look at the exit is dropped, since the exit stays on today's curve. The window's hit region in Playwright WebKit is no longer owed: critic B ran it (B10-7).

### 15.3 Engine checks each wave's proof owes

These need no one's word and no iPhone. Each wave runs its own in headless Chromium and Playwright WebKit through `guarded` before it lands, and §10's claims hold only for what has run (A10-11, A10-12, B10-14).

- **BM-1.**
  - The crescent, read by pixels in both themes.
  - The crescent under forced colours, in a light-text and a dark-text theme.
  - A tap's three legs and a hover's one.
  - No on fill under `aria-pressed`.
- **BM-2.** The strengths by `opacity` over one fill, and a tinted seat's glyph still on hover.
- **BM-4.** The mark under the keyboard, forced colours, more contrast and Reduce Motion, with no option's box moved.
- **BM-5.**
  - The real sheet with `property-regs.css` and the token partials loaded, so the grow is seen to tween in and out.
  - The ring at g, with no jump as Tab leaves.
  - A tap within g of the root reaching a neighbour.
- **BM-6.** One menu and one dialog under each mode; the touch slide's chunk measured.
- **BM-8 and BM-11.** The window's six hit points, (300, 126) and (250, 102) among them.
- **BM-10.** The sheet inside reka's Dialog on `bm/study`, with its focus trap and scroll lock.
- **BM-11 and BM-12.** The fold and the goo under the keyboard, forced colours and Reduce Motion; G-7.
- **Each release candidate.** G-4 against each site's built entry.

## 16 The questions

| Q | Question | Answer | Where | Status |
|---|---|---|---|---|
| Q1 | How a glass plate changes shape | The capsule window for any capsule that changes width; stretching and resizing refused; a control grows into its panel by today's grow (10 C); a split by the window | §3, §6.3, §7.3 | Closed. The 11.x window ships only where P4-bud's F reads clean (§15.2) |
| Q2 | Does a fusion show a bridge, and how, in Safari | The goo, in 12.0.0, on a dock that samples nothing; no split on frosted chrome in 11.x | §7.4 | Decided on the default (24 C, O-426); facts owed: its cost (G-7, then a device) and its layers (§15.2) (B10-16) |
| Q3 | The mark's look and the one answer to a press | It glides and never lifts; a press answers with the option's fill | §8.1, §5.1 | Closed |
| Q4 | Where the mark lives, and what a release commits | Per host; a release commits the option under the finger | §8.1 | Closed. Home Assistant's floor menu amends its row if it answers |
| Q5 | The mark in a run that scrolls | The run keeps its scroll; the mark lives in the scrolled box; no drag | §7.2 | Closed |
| Q6 | The delivery of motion | Five deliveries from one source; single curves; sampled settles | §4.2 | Closed |
| Q7 | Frame rate in production Safari | — | §15.2 | An optional fact reading |
| Q8 | Stretch | None | §8.1 | Closed |
| Q9 | A presentation's spring, the bud, its birth on glass | The row follows the lane (present at its own size, `bloom` for a grow); born beside its host; no neighbour yields | §6.3 | Closed |
| Q10 | The material | D3's floor at the muted ink's 4.8; O-260's blur register; no material code from BM | §6.1 | Closed |
| Q11 | The overlay layer | reka-ui stays, with glass's presence and the touch slide | §6.3 | Closed |
| Q12 | Sheets as native scroll | Yes, in 12.0.0, with iOS's slow snap settle before 27.3 stated | §6.4 | Decided on the default (13 B); facts owed: the check inside reka's Dialog (§15.3) and the settle on iOS 26 and 27.2 (§15.2) (B10-12, B10-16) |
| Q13 | The edge | One hairline in light, none in dark, both under more contrast | §6.1 | Closed |
| Q14 | Reduce Transparency and the Liquid Glass setting | The firmer default for every Safari reader; a site writes one token | §6.1 | Closed |
| Q15 | The mark's geometry | Equal options | §8.1 | Closed |
| Q16 | The mark under the keyboard | It fades across | §8.1 | Closed |
| Q17 | Bytes, both sides | Every site within its bound by the sum, which is indicative | §11 | Open until G-4 closes each entry at each release candidate (B10-11, B10-16) |
| Q18 | The slider loupe | It goes. The held view is C | §8.3 | Closed |
| Q19 | How glass enters | At full strength by opacity and scale | §6.6 | Closed. The toast's vanish is the owner's line (`OPEN.md`) |
| Q20 | Additions with no customer | No to each | §13 (D2's hold, D4, D8, D12, S2, I18) | Closed |
| Q21 | Occupied length against the one mark | Two engines by what the control is: the mark for a choice, occupied length for a quantity; a stepped slider travels a step at each boundary | §8.1 | Closed |
| Q22 | The veil under a dialog | 11.3.0: the veil is the one blur and the plate a tint. 12.0.0: O-260's register unless W-R.1 re-points it | §6.5 | Closed for 11.3.0. 12.0.0's is W-R.1's |

## 17 The messages

`pass-10/messages/` holds one note per site, written for the site's own session in the owner's voice, with no study terms. Each says what the site gains in 11.2.0, 11.3.0 and 12.0.0, what it does to reach it, and what we need back. They go out with the tranche (BM part 3). The final fold rewrote each claim to what is known (B10-10). The curves are ones WebKit's source and release notes say its compositor takes, and no iPhone has read the frame rate. The parts that stay on the page's thread are named. The goo's cost per frame is unmeasured. Every byte figure is an estimate the site's own build closes.

| Site | What it gains | What it does | What we ask |
|---|---|---|---|
| atlas | The toggle; single curves; one sliding mark with no box moved under forced colours; sliders that grow while used; the touch slide on the phone section menu; native-scroll sheets | Run its box-identity suites on 11.3.0's release candidate; set `:expand="false"` where a grown slider would cover something | Sliders within 8 px of a neighbour; suites that read a held slider's size; the menu's height read on /sci; FilterPanel's and EntityDetail's sheets; whether its docks take the coloured toggle or set `--toggle-tone` to their ink |
| value.js (color) | The coloured toggle in its Dock; thumbless sliders that grow in their own colour; the goo for the theme seat in 12.0.0 | Nothing in 11.x | Whether the channel sliders' track is a gradient; whether any slider wants a knob; where the theme seat lives |
| keyframes | The toggle; single curves; growing sliders; the fold with no per-frame script | Nothing for the site | For keyframes.js: a sampler export, and a follow in `Draggable` that starts the spring at release |
| fourier | Single curves; the layers menu's grow and exit; the rim's window; growing sliders; the carousel's reduced dip | Possibly `:expand="false"` on the timeline | The timeline's growth; sliders near the canvas; tests that read a held slider or the rim's clip |
| daraksha | Single curves within its route cap, the player on first touch; a transport that grows in its gold; glass's goo replacing its own neck in 12.0.0 | In 12.0.0, delete its neck, mirror script and `.fission` rules (up to 2,024 B) | The occasion-mode crash's steps and WebKit version; the gold's growth on the gilt; the pill seat's way out of the disc |
| gaggle | The plate's tone on its seats; single curves; one-blur dialogs; a larger first-load margin; native-scroll sheets; the lamp kept a readout | Run gate 29 and the vendor gate on the release candidates | Whether anything reads `v-model:detent` mid-drag; whether the lamp sits apart from the dock |
| Home Assistant | Single curves in the app's WKWebView; one blur per modal; presence that can't hold the page hidden; the floor menu's touch slide; the faces seat's goo | Answer which overlays its entry mounts | The entry's overlays; the slider under its rails; one blur per modal; whether a filter held at the folded rest counts as its one fuse; timing the goo in the app |
| dns-analysis | Glass's new toggle, single curves, one-blur dialogs and native sheets if it adopts | Nothing now | Whether adoption is on the table, and its route bound |
| slides | The toggle, single curves, the menus' grow and exit, one-blur dialogs, once it moves from 10.1.4 | Move to 11.2.0 when it next touches the decks | Where the deck's toggle sits; `--sheet-enter-skew` on any deck |
