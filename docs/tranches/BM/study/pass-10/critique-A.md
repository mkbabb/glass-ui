# BM pass 10: critique A (the owner's law and restraint)

Seat: critic A, claude-opus-5-5 (asserted from its own system identity), 2026-11-24. I changed no design, page or source and staged nothing. I added one check script and its output beside this file (`critique-A-check.mjs`, `critique-A-check.json`).

No iPhone reading has returned (READINGS.md). Under O-426 none is owed, and this critique judges pass 10 on the ruling's defaults.

I read `CHARTER.md`, `PROGRESS.md`, `UNION.md` whole (pass 10's line in §4; §2's checks; §3's questions), `union-fold.md`, `INBOUND.md`, `READINGS.md`, `choices/RULING-2026-11-23.md`, and in `CHOICES.md` choices 5, 9, 11, 19 and 23. I read `DESIGN.md` whole as pass 10 rewrote it. From pass 10's files I read `precepts.md`, `tranche-draft.md`, `pass-9/fold.md` (pass 10's fold), the three pages (`pages/P10-plate.html`, `P10-slider.html`, `P10-toggle.html`) whole, the slider sketch and its forced-colours arm, the toggle sketch (`.vue` and `.css`), the goo sketch, `slider/slider.json` and `slider-bytes.mjs`, `toggle/toggle.json`, `ledger/ledger.mjs` and `ledger.json`, `access/frames.mjs`, `frames.json`, `p10-probe.json` and the head of `p10-probe.mjs`, and five of the nine messages (README, atlas, Home Assistant, daraksha, value.js). `pass-9/critique-A.md` gave the form.

I re-read the sources the objections rest on:

- **The precepts.** `restraint.md:20-62` (how conflicts settle; shading) and `:120-215` (motion, the owner law, the ceiling); `motion-canon.md:25-40` (P0), `:55-100` (P0a), `:105-120` (P1).
- **BL.** `waves/W-B.17.md:40-75` (R-1 to R-6) and `:480-495`; the plate as prototyped, `git show bl/intent/proto:src/styles/glass/plate.css`; `design/slider/OWNER-READ.md`; `audit/INBOUND.md` O-260, O-279, O-289, O-408.
- **glass-ui master.** `src/components/dark-mode-toggle/DarkModeToggle.vue` and `dark-mode-toggle.css`; `src/styles/tokens/scheme-spring.css:108-115`, `scheme-motion.css:101`, `property-regs.css:240` (`--motion-tempo`); `motion-registers.css:149`; `color-radius.css:330-333` and `dark-arm.css:157-160` (the section colours).
- **P8-present** at its `:root` (`pages/P8-present.html:164`), for the exit curve it draws.

**The one browser run.** `critique-A-check.mjs` runs in headless Chromium through `guarded` (one browser, one context per cell, closed in `finally`). It says nothing about threads or the blur, and Chromium is not Safari.

| Cell | What it read | Result |
|---|---|---|
| toggle-carve, page, dark | the night circle's computed fill inside the mask; the pixel where the night should cut the disc, against the ground and the drawn crescent | B: fill `oklch(0.718 0.107 268.4)`, the cut shows the disc at 0.63 of its strength. C: fill `rgb(233, 230, 226)`, 0.90 |
| toggle-carve, sketch, `html.dark` | the same, on `DarkModeToggle.next.vue` with `dark-mode-toggle.next.css` over master's sizes | fill `oklch(0.718 0.107 268.4)`, 0.63 |
| readout-leave, P10-slider C | the readout's `scale` and `opacity` per frame after a press is released | frame 1: scale 0.9, opacity 1.0 |
| ring-leave, P10-slider C | the track's `outline-offset` and colour per frame after Tab leaves | frame 1: offset 2 px (it was 8), colour at full strength, fading over the next 100 ms |
| ring-leave, the sketch | the same rule on BL's sheet with C spliced in, `data-focus-key` removed | frame 1: offset 2 px, colour at 0.996 of full |
| plate-hover, P10-plate C | animations a mouse rest starts | a seat in the text's colour: 3 (`background-color`, `opacity`, `scale` on `::before`). A seat with its own colour: 4 (those and the glyph's `color`) |

The sketch's ring cell inherits the same token gap as `p10-probe.mjs` (A10-11): its shell clip does not tween in that fixture. The ring's offset is read regardless, since the sketch lists no transition for it.

Each objection was made, then its evidence was re-read. The ones that did not survive are listed at the end.

## Objections

### A10-1 (blocking). The toggle's night does not cut the crescent: the mask's circle inherits the glyph's colour

**Claim.** §9: "A night mask circle of r 5.75 at (15.5, 8.5) slides from `translate: 9px -9px` to 0 and carves the crescent." B ships in 11.2.0 unless the owner writes.

**Evidence.**
- The sketch sets `.dark-mode-toggle-button > svg { fill: currentColor; }` and gives the mask's `<circle class="toggle-night">` no fill of its own (`toggle/sketch/DarkModeToggle.next.vue`, `dark-mode-toggle.next.css`). The circle inherits `fill: currentColor`. A luminance mask keeps what lies under a coloured circle at that colour's luminance. It cuts only under black.
- In dark the colour is `--section-color-2`, `oklch(0.718 0.107 268.4)` (`dark-arm.css:157`). The run reads the circle's fill as exactly that, and the part of the disc the night should remove shows at 0.63 of the glyph's strength, on the page and on the sketch alike (`critique-A-check.json`, toggle-carve). The dark toggle is a two-tone disc, not a crescent.
- C, in the text's colour, fares worse: its circle fills with `rgb(233, 230, 226)` and the cut shows at 0.90. C draws nearly a full disc in dark. The owner is asked to judge the colour from C.
- §10.3 says that under forced colours "its night still carves by mask". Under a dark forced-colours theme ButtonText is light, so by the same inheritance the circle is light and nothing is cut. The claim was not run (§10.3 says so), and the cascade gives the opposite.
- The toggle is the one part on the owner's 11.2.0 list whose page and sketch both draw the design wrong.

**Remedy.** Give the mask's circle `fill="#000"` (and the rect stays `#fff`) in the sketch and on P10-toggle, re-run the carve in both themes and in forced colours, and rebuild the local site before the owner reads it.

### A10-2 (major). The toggle's press runs five legs; the design reports two

**Claim.** §9: "The pressed tone waits for the glyph to land (§4.4), so a press starts two legs, the rays and the night." §10.1 cites `toggle B click` for "the legs are the night's `translate` and the rays' `scale`".

**Evidence.**
- `p10-probe.json`, `toggle B click`, lists five legs: `tg color`, `tg opacity`, `tg scale`, `night translate`, `rays scale`. Under Reduce Motion it lists `tg color`, `tg opacity`, `tg scale`, `night opacity`, `rays opacity`, so the page's plate still grows by `scale` with Reduce Motion on, against its own text ("With Reduce Motion on, nothing moves").
- The fill's rise is a press leg. Choice 19 B's third rule, as ratified, is "when a press opens a panel, the button's held fill waits for the panel to land, so the press stays at two" (`CHOICES.md` §19): the fill is one of the two. With a glyph of two legs, the toggle's press is three at least (fill, rays, night), under the rule as written and under pass 10's extension of it.
- "The fill alone" rests on W-B.17 R-3, which keys on `data-glyph` (`plate.css`: `.plate:has([data-glyph="grow"], …) { --plate-from: 1 }`). The sketch's template sets no `data-glyph`, so on BL's plate the toggle's fill grows from 0.8 as it fades, which is the probe's `tg scale`.
- The colour leg. P10-toggle tweens the glyph's colour over 200 ms (`.tg { transition: color 200ms }`). The sketch has no colour transition: master's button lists `opacity`, `background-color` and `box-shadow` only, and the sketch adds none. So the shipped glyph swaps amber for indigo on the frame the class flips while its shape tweens for 200 ms. Either the colour tweens and is a further leg, or it is an instant change (P0: "No element changes … colour … between two frames"). The design counts neither.
- The tranche's G-3 applies to "every wave that moves anything" (`tranche-draft.md:23`), BM-1 included. The toggle as sketched fails it.

**Remedy.** Count the toggle from the probe. Make the fill a fill (`data-glyph` on the svg, or `--plate-from: 1` on the toggle), decide the colour leg (tween it in the sketch and count it, or keep the glyph in the ink, which is C), and put the resulting count to the owner beside O-428 rather than writing "two".

### A10-3 (major). The exit curve becomes `linear` against P0 and P1, on pass 10's own word, with no page and on a criterion it does not apply to its own legs

**Claim.** §5.2: "**Decided: `--exit-curve` becomes `linear` in 11.3.0**". §10.6: "The exit on `ease-out` was the one leg that put more than half its travel in one frame, and the linear exit cures it."

**Evidence.**
- P0, the owner's law: "Every state change has a start, a travel and a stop, in AND out: it eases off its rest, moves with weight, and settles. An exit is an animation too" (`motion-canon.md:31-34`). A linear fade leaves its rest at full speed and stops at full speed. P1 puts every effect on "a bezier `--ease-*`" (`:113-114`). `precepts.md` drafts a P0a line only, so BM-0 would leave P0 and P1 saying the opposite of the token.
- The change is not on the board, and the ruling ratified "the design study changes" on 2026-11-23, before pass 10 made it. `precepts.md:3` says "each draft below rests on a ratified choice or on a law the owner set"; this one rests on neither. UNION §4's list of amendments for pass 10 does not include P0a.
- No page shows it. The reading §15 names for it is P8-present §1, whose exit curve is `cubic-bezier(0.3, 0.2, 0.7, 0.8)` (`pages/P8-present.html:164`): neither today's `ease-out` nor the decided `linear`. The owner asked on 2026-11-23 to see "what I have to choose, visually, with before and after" (PROGRESS).
- The "one leg" claim is false in the same table. At 30 Hz `frames.json` gives 0.536 for the toggle's reduced crossfade (pass 10's own leg, on `--ease-out`), 0.536 for a length's reduced tween, 0.530 for the readout's leave and 0.530 for the plate's hover fade. The half-a-frame criterion is pass 10's, it is not in law 7, and it is applied to the exits alone.

**Remedy.** Keep `--exit-curve` eased. If a 30 Hz criterion is wanted, write it into law 7 and apply it to every leg. An eased in-out meets it at 120 ms: `cubic-bezier(0.42, 0, 0.58, 1)` puts 0.236 of the fade in one frame at 60 Hz and 0.435 at 30 Hz, by `frames.mjs`'s arithmetic. If `linear` is still proposed, put it on §14.1 as a P0 and P1 amendment with a before-and-after page, and mark it not decided.

### A10-4 (major). The recommended plate C starts a third hover leg on a tinted seat, and its page models every hover with a colour leg BL ruled out

**Claim.** §6.2's C: hover 6.5 % light, 5 % dark, current 10 %, pressed 12 %, "the seat's own [tone]; the glyph takes it where a site sets one". BM-2: "The glyph takes the tone on hover where a site sets one." "The ladder costs 0 B, since it is a set of token values on BL's build."

**Evidence.**
- W-B.17 R-3: "one hover, one motion. The plate grows and the glyph is still; or the glyph carries a verb and the plate is a fill. Never both, and never a third leg. … A hover therefore runs two animations, not three" (`W-B.17.md:51-53`). The ceiling: "animations running on a hover | 2: one fade and one movement" (`restraint.md`). C on a tinted seat runs the plate's fade, the plate's growth from 0.8 and the glyph's colour: three.
- The page shows more. Each plate level is a `background-color` change through `color-mix(… var(--level) …)`, so every hover runs three legs and a tinted seat four (`critique-A-check.json`, plate-hover). W-B.17 R-1: "One fill at one strength, with `opacity` carrying every lighter state, so no colour ever transitions." The owner judges the strengths on a model whose motion is not the plate's.
- C's first reason is that "a hovered seat beside the current one must read below it" (law 10). On a tinted seat the hovered glyph turns fully peach, sea or plum beside a current seat at 10 % grey. That is the two inks in one run that the reason sets out to avoid.
- §6.2 puts the plate "on its `::after`". W-B.17 R-1 puts it on `::before` (`W-B.17.md:44`; `plate.css`). §7.3 then gives the 12.0.0 seat's `::before` to the split's plate, which would move BL's fill to the other pseudo-element without a row in §14.2.
- "0 B": BL's plate gives current and pressed one rule at `opacity: 1` (`plate.css`, "On, held"). C's 10 % against 12 % needs a third rung, a new rule.

**Remedy.** Drop the glyph's tone on hover, or take R-3's own other branch (`--plate-from: 1` where the glyph takes the tone) so a hover stays at two. Redraw P10-plate's strengths by `opacity` over one fill. Correct the pseudo-element and the bytes, and add the split's `::before` to BL's rows.

### A10-5 (major). The slider has an instant change on its way out in the sketch, and another on its page

**Claim.** §8.3: "The focus ring is the track's outline at `outline-offset: max(2px, var(--slider-open))`. It sits at the grown ground's edge and fades on `--duration-fast`." "The readout … leaves by fading alone (P0a rule 3)."

**Evidence.**
- The sketch's track transitions `outline-color` only (`slider-expand-c.css`, `.glass-slider[data-expand] .slider-track`). When Tab leaves, `--slider-open` drops to 0 and the ring jumps from 8 px out to 2 px on the first frame, at full colour, then fades inside a ground still shrinking (`critique-A-check.json`, ring-leave, the sketch and the page alike). P0: nothing changes "position … between two frames". This ships in BM-5.
- On P10-slider the readout's resting rule is `scale: 0.9` with only `opacity` in its transition, so on release the readout shrinks by a tenth on frame 1 while fully opaque (readout-leave: scale 0.9, opacity 1.0 at 1 ms). The sketch is right here; the page the owner reads is not, and it shows him the fault pass 9's fold A9-10 cured.

**Remedy.** Add `outline-offset` to the track's transition on the ground's own clock and curve. On the page, keep the readout at `scale: 1` on the way out, as the sketch does.

### A10-6 (major). The ground's shrink breaks law 7's 30 fps line, the hover leaves on a different clock, and §10.6 and the apotheosis say every leg holds

**Claim.** §10.6: "The short legs show three to five frames, which is law 7's 30 fps line for a compositor leg." §13, I10: "Every leg is drawn within law 7 at 60 and 30 Hz". I20: "Law 7's 30 fps line, held by every leg".

**Evidence.**
- Law 7: "A leg under 167 ms is a compositor leg, or it shows fewer than five frames at 30 fps" (§1). The record states its purpose: "any leg that runs on the page's thread and lasts under 167 ms shows fewer than five frames there … which is why §4 puts short legs on the compositor" (`DESIGN.before-pass10.md:25`).
- C's ground shrinks by `clip-path`, on the page's thread, in 120 ms: 4 frames at 30 Hz (`frames.json`, "slider: the ground shrinks", `fiveFramesAt30: false`; §10.6's own table: "4, 0.488 | page"). It is the one page-thread leg in the table that shows fewer than five frames at 30 Hz, and pass 10 designed it.
- The hover. The sketch grows the half-open ground on `--spring-present-duration` (200 ms) and returns it on `--spring-present-exit-duration` (120 ms). P0a: "A hover leaves the way it came: one declaration serves both ways", and the hover row's out is "the same clock, the same curve" (`motion-canon.md:75`, `:86`). OWNER-READ, which the ruling cites: "both go back the same way".

**Remedy.** Return the ground on the 200 ms clock it grows on. That meets law 7's line on the page's thread and P0a rule 1 for the hover in one change. If the press's return must stay at 120 ms, name it as an exception to law 7 on §14.1 and correct §10.6, I10 and I20.

### A10-7 (major). Counting rules and precept drafts that no ratified choice carries, one of them shipping over the ceiling

**Claim.** §14.1 item 7: a slider with a knob and a readout "starts three legs on a press, one over the ceiling. The proposal counts the knob with the ground it grows inside". Item 7 sits under "Each ships as written here until he sends otherwise." `precepts.md:3`: "each draft below rests on a ratified choice or on a law the owner set".

**Evidence.**
- The three-leg slider ships while the tranche's own G-3, "No change runs more than two animations on one control, counted under choice 19 B's three rules", gates BM-5 (`tranche-draft.md:23`, `:67`). The wave fails its gate, or the gate takes a fourth rule the owner has not given.
- The ceiling draft extends 19 B's third rule from "when a press opens a panel" (`CHOICES.md` §19, as ratified) to "When a press opens a panel, or commits a glyph's change". The glyph clause is pass 10's, written for the toggle (A10-2).
- The `:130` draft: "No movement on keyboard-triggered actions: a keyed choice fades across. The one exception is … a slider grows its ground on Tab". §10.1 has the toggle's Enter and Space run "the same two legs as a click", a `scale` and a `translate`. A menu opened by a key grows (§6.3, `bloom`), and a dialog opened by a key enters from 0.96 (§5.1). As drafted, the line bars all three, or the design breaks the line it drafts.
- The preamble's claim fails on these two and on P0a's exit line (A10-3).

**Remedy.** Hold the knob-and-readout slider at two (the readout waits for the knob, or the knob is not grown when a readout shows) until the owner rules, or list the fourth rule as his to give and keep G-3's text in step. Mark the glyph clause and the exit line as new and not ratified. Scope `:130` to a keyed choice, as Q16 asked, rather than every keyed action.

### A10-8 (major). The apotheosis rounds partial answers up

**Claim.** §13: "**Matched** means the design does what the reference does … **Refused** means a law refuses it, and the law is named." The ruling asks that nothing be left unanswered.

**Evidence.**
- **G1, frost, saturation and veil: "Matched".** From 12.0.0 "the dock, menus, sheets and dialogs sample nothing" (§6.1; O-260: "floating and overlay 0"), at α 0.897 in light. The references are a 53.5 % veil at σ 12 (rida) and "near-zero veil + heavy blur + strong saturate" (the archive). On chrome the frost is refused by O-260, and only the content rungs (4 to 8 px) frost at all.
- **F2, the neck: "Matched".** The same cell: "A fold shows filleted corners and no bridge, and the neck is thinner than iOS's". On a close the neck is not drawn.
- **S9, a pill that absorbs the next stop: "Matched".** §13.10 refuses the detent dots, so there is no stop to absorb. The step travel is matched; the absorbed dot is refused (Q20).
- **13.10, opens on hover: "Surpassed".** C opens half way on a mouse rest, where ChatGPT opens fully. It does less, to meet P0a's 4 px hover edge: a partial refusal by a named law.

**Remedy.** Split each of these rows into the part matched and the part refused, each with its reading or law. G1 should read "Refused on chrome (O-260); matched on content rungs" so the owner sees what the 12.0.0 dock is.

### A10-9 (minor). The toggle's colour and its two motions are yields to O-428 that §1 does not name, and atlas is not asked

**Claim.** §1: "Where the law yields to an order, the order is named in the section that carries it. There are three". The affordance-map draft calls the toggle's legs "the glyph's one change".

**Evidence.**
- Law 10 is one focal ink per view. A sun in `--section-color-5` or a night in `--section-color-2` sits in every dock that mounts the toggle, beside the current seat's ink. atlas's bound: "Restraint: one focal ink per page" ([IN atlas 5]). §9 lists atlas's `DockSettings` and `DockFoot` among the mounts, and the atlas message says only that it "picks up the new one".
- P0a's glyph row is "one motion of its own strokes" (`motion-canon.md:67`), and W-B.17 R-6 gives a glyph one `transform` on one leg. The toggle runs two motions on two SVG children.
- O-428 asks for colour and for daraksha's grammar, so the yield is licensed. It is not named, and the one site that stated a one-ink bound is not told.

**Remedy.** Add the toggle to §1's list of yields (law 10 and P0a's glyph row, by O-428). Give the colour a token a site can set to the ink, and ask atlas whether its docks take the coloured toggle.

### A10-10 (minor). The goo is "loaded with the dock" in the design and "on intent" in the ledger, and the touch slide is unpriced

**Evidence.**
- §7.4 and §11: "+468 B, loaded with the dock"; the daraksha and value.js messages say the same. `ledger.mjs` marks the row `onIntent: true` and counts it at three sites (`GOO`); `tranche-draft.md` BM-12 says "+468 B on intent". If the 267 B of rules ride the dock's sheet, atlas, fourier, keyframes, gaggle and slides pay them uncounted. If they load on intent, the design does not say how a stylesheet does.
- §6.3's touch slide prices only its loader, "about 60 B by estimate". The slide's own code, loaded on a menu's first touch, has no figure anywhere in the ledger.

**Remedy.** Say where the goo's rules live and count them at every site that loads them. Measure the touch slide's chunk and add it as an on-intent row.

### A10-11 (minor). The real sheet never showed C's grow tweening

**Evidence.**
- `p10-probe.mjs` builds its real-sheet fixture from the 11.1.0 dist's `index.css` inlined in a `<style>`. That file is a list of relative `@import`s, which do not load under `setContent`, so `property-regs.css` is absent and `--motion-tempo` is undefined. Every spring duration (`calc(… * var(--motion-tempo))`, `scheme-spring.css:108-115`) is then invalid, and with it the shell's and the knob's transitions.
- The probe's own `started` lists show it: "real sheet C plain", hover `[]`, held `[]`, Tab only `outline-color` (`p10-probe.json`). The end states are right, but the grow on the sketch was never seen to tween in or out. §8.3's "What runs" counts come from the page's model, and BM-5's gate cites "`p10-probe.json`'s cells, run on the real sheet" for "the ground contains the band on every frame", a cell the page's model produced.

**Remedy.** Load `property-regs.css` and the token partials into the fixture, re-run the real-sheet cells, and report the counts and frames from the sketch.

### A10-12 (minor). Access ran on pass 10's parts, where the plan's line says every part

**Claim.** UNION §4, pass 10: "run every part under the keyboard, VoiceOver order, forced colours, more contrast, reduced motion, Low Power Mode at 30 fps and WKWebView at 60."

**Evidence.** §10 runs the slider, the toggle, the plate, the mark's forced-colours fixture and the window's hit region. For the goo, the fold, the sheets and the menus' touch slide it says "Every other part takes the forms in §5.3. The tranche's gate G-5 holds it there" (§10.5). None of those is listed as owed in §15, and their pages exist (P7-fuse, P8-present).

**Remedy.** Run P7-fuse and P8-present under the keyboard, forced colours and Reduce Motion, or list each part and mode as owed in §15.

## Dropped on the second reading

- **"C draws no knob on the default slider, against the ruling's 'with the knob growing inside it'."** The owner's own words are "using a slider enlarges it"; the knob is the ruling's gloss of OWNER-READ. O-408 ("capped and invisible") is his word on the thumb, and pass 9's critics settled the same point.
- **"Under Reduce Motion a thumbless slider without a readout shows no held sign."** The value still follows the finger, which is the answer to a press. A fade on the ground would need the opacity leg C removed, and P6 drops a body's movement.
- **"The goo's filter held through the folded rest breaks 'animations running at rest: 0' and Home Assistant's one live fuse."** A held filter is not an animation. Its cost is listed as a fact reading (§15), and the bound's reading in WKWebView belongs to the production critic.
- **"ContextMenu's grow starts from a seed, against P0a's 'never from nothing'."** The seed is a row's height, 2.75rem (record, fold A8-11), not a point.
- **"BM-8 holds the 11.x window on a reading, against O-426."** The default is today's shapes in 11.x, and a reading amends it upward. Shipping a clip over frost unread could hide a stopped blur, which the no-masking law forbids.
- **"L1 is marked Surpassed while the follow is opt-in."** The cell says "where a host opts in", and what it claims to surpass is the delivery.
- **"The plate's growth from 0.8 moves a 44 px seat's edge 4.4 px, past P0a's 4 px."** P0a's own row names "a plate behind a 40 px control grows from four fifths", and the figure is BL's R-2.
- **"The readout keeps a card ground and a hairline that C removed from the shell."** The readout is BL's R-12 as built, a label over the slider, not glass, and choice 7's edge governs glass.
- **"The value.js message says the goo 'works in Safari' though its WebKit layers are unread."** An evidence claim; left to critic B.

## Summary

Pass 10 meets most of its line in UNION §4. DESIGN.md is rewritten whole, and its first section says no reading has returned and that none is owed under O-426. Every question is closed or marked owed. The ledger is closed by sum against each site's bound, with the per-entry closure given to G-4. The work is split into 11.2.0, 11.3.0 and 12.0.0. The tranche is drafted with six gates and thirteen waves, the precept amendments are drafted, and the nine messages are written in the owner's voice without study terms. The slider's C is ChatGPT's construction with one leg and a cut of BL's card shell, as pass 9's critics asked.

What does not stand as written:

- The toggle that ships in 11.2.0 draws no crescent in dark, on its page or its sketch (A10-1). Its press runs five legs where the design reports two, and its colour change is either untweened or uncounted (A10-2).
- `--exit-curve` becomes `linear` against P0 and P1, on the pass's own word, with no page, and on a criterion four of its own legs fail (A10-3).
- The recommended plate runs a third hover leg on a tinted seat, and its page models hover with the colour leg BL ruled out (A10-4).
- The slider's focus ring jumps 6 px in one frame as Tab leaves, and its page's readout shrinks in one frame on release (A10-5).
- The ground's 120 ms shrink breaks law 7's 30 fps line, and the hover leaves on a shorter clock than it came; §10.6, I10 and I20 say every leg holds (A10-6).
- A knob-and-readout slider ships at three on a press against the tranche's own G-3, and three precept drafts claim a ratification they lack (A10-7).
- The apotheosis marks the frost, the neck, the absorbed stop and the hover as matched or surpassed where each is matched only in part (A10-8).

Four minor points: the toggle's yields are not named and atlas is not asked; the goo's bytes are counted two ways and the touch slide is unpriced; the real sheet's tween was never seen; and access ran on pass 10's parts only.
