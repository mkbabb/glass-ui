# BM pass 2: Critic A (the owner's law and restraint)

Seat: Critic A, claude-opus-5-5 (asserted from its own system identity), 2026-11-22. I changed no design, no page and no source, and staged nothing.

Read in full: `CHARTER.md`, `study/UNION.md` (§2, §3 and §4 closely), `study/union-fold.md`, `study/INBOUND.md`, `study/READINGS.md`, `study/DESIGN.md` (pass 1 as amended, and pass 2's §4), `pass-1/fold.md`, and pass 2's working files: `delivery/sketch/` (all five), `delivery/curves.json`, `delivery/sketch-check.json`, `delivery/ledger.json`, `probe/probe.mjs`, `check/page-check.mjs`, `retry.log`. I read the pages pass 2 made or changed: `pages/P2-scroll.html` (new), `R2.html`, `R3.html` (rebuilt) and `R5.html` (changed by fold A10).

Checked against source at `2dbc19a5c`: `docs/precepts/restraint.md`, `docs/precepts/motion-canon.md` (P0 to P7), `src/composables/motion/spring/springPresets.ts`, `src/styles/scroll-chrome.css`, `src/composables/motion/scroll/useScrollChrome.ts`, `src/components/scroll-progress-rim/styles.css` and `ScrollProgressRim.vue`, `src/styles/utilities/a11y-overrides.css`, `src/styles/glass/dissolve.css`, `src/components/dock/styles/dock.css`, and `bl/dock/wi8:src/components/dock/styles/run.css` (:720-915). From git objects at the census refs: gaggle `dashboard/src/report/page/PageDock.vue`, fourier `web/src/composables/usePageScroll.ts` and `useDockProgress.ts`, daraksha `scripts/check-budget.mjs`, and Home Assistant `frontend/scripts/gates/bundle_budget.ts`, `frontend/package.json` and `frontend/src/core/sheet.css`.

**No browser run.** At 18:06 `guarded` refused my one headless Chromium read of P2-scroll (`data.kalloc.1024` at 13.70M). The zone log reads +72/s, so the count only climbs until a reboot. I retried once after the 10-minute floor (result at the end). The script is at `scratchpad/critA/read.mjs`. Every finding below comes from the HTML, the CSS, the sketches and pass 2's own numbers.

I made each objection, then re-read its evidence. The ones that did not survive are listed at the end.

## Objections

### A1 (major). The delivery has no reduced-motion branch. Rule 2 escapes the library's reduced-motion gate, and the reduced-motion fades sketched for rules 1 and 5 are forced to 0 s.

**Claim.** §4.3 decides five deliveries but never says what any of them plays under Reduce Motion. Law 7, which pass 2 restated (§1, line 25), says reduced motion is "a fade of 200 ms or less", never a cut.

**Evidence.**
- **Rule 2 escapes the gate.** Rule 2 plays the mark's settle, the slider thumb, a sheet's detent and "a dialog's spring" through `element.animate()` (§4.3, line 289; `sketch/playSpring.ts:68`). The library's reduced-motion fallback is CSS: `animation-duration: 0.01ms !important; transition-duration: 0s !important` on `*` (`src/styles/utilities/a11y-overrides.css:46-53`). CSS `animation-*` properties do not reach a Web Animation. P7 says every spring is "snapped by the SAME `prefers-reduced-motion` gate" (`motion-canon.md:233`), and `playSpring` has no gate. As sketched, a reader with Reduce Motion on gets the full `translate` spring: the vestibular motion P6 exists to strip (`motion-canon.md:200-206`).
- **The sketched fades are forced to zero.** scroll-chrome's reduced-motion branch is `transition: opacity 150ms var(--ease-out)` (`sketch/scroll-chrome.next.css:24-27`). The rim's is `transition-duration: 120ms` (`sketch/scroll-progress-rim.next.css:20-22`). Neither is `!important`, so the fallback's `transition-duration: 0s !important` wins in the same layer, and both are cuts. The fallback's own header says the only surviving reduced-motion clocks are enumerated, `!important` class authorizations (`a11y-overrides.css:32-43`). §4.6 drafts a carve line for the rim alone ("the universal carve lets it through"). §4.4 states scroll-chrome's 150 ms fade as a result ("Reduced motion keeps a 150 ms fade of the quiet") with no amendment behind it.
- **Rule 1 has the same fault.** Every rule-1 transition (the switch thumb, a toggle, a bar collapsing) becomes a 0 s cut under the same fallback. §2.1 lists the switch thumb as breaking law 5 only, not law 7.

**Why it matters.** Q6 is "the delivery of motion" (UNION §3). Without a reduced-motion branch, the decision either plays full springs to readers who asked for none, or cuts. The owner's law forbids both.

**Remedy.** Add a reduced-motion column to §4.3, one cell per rule:
- Rule 2's player reads the same gate kf uses and plays an `opacity` crossfade on the press clock (A1's "the mark crossfades from seat to seat").
- Rules 1, 4 and 5 name their reduced-motion fade and how it survives `a11y-overrides.css:46-53`: enrolment in the authorized set, or a fallback amended to shorten rather than zero. Either way the owner rules on it. BL's W-R.1 makes the opposite ruling ("A commit is an instant state change", §3.9), so the column goes to BL as well.
- Correct §4.4's scroll-chrome cell and §2.1's switch row (law 7).

### A2 (major). The player keeps its own clock. The dock row settles in 210 ms as a token and in 340 to 428 ms as a played settle.

**Claim.** The drafted P7 says "the one source and the one clock keep their table" (§4.6, line 333), and §4.3 opens "One source, the `SPRING_PRESETS` table". `playSpring` ignores the table's clock.

**Evidence.**
- `playSpring.ts:23-28` ends the animation at "the last moment the body is a quarter pixel or more from rest", an absolute band, for every row and every travel.
- The token clocks are the rows' own 2 % or 0.5 % settle (`springPresets.ts:20-24`, LAW 0b): press 120 ms, present 200, dock 210, panel 450, bloom 370 and world 570 (`curves.json`, `settle_token_s`).
- The player's durations (`sketch-check.json`) are press 244 to 276 ms, present 280 to 332 and dock 340 to 428. On those three 2 % rows that is 1.4 to 2.3 times the row's clock. On a 100 px travel, the extra time is the tail creeping from 2 px to 0.25 px. The three 0.5 % rows run 0.94 to 1.57 times theirs (bloom 348 to 580 ms, panel 440 to 664, world 584 to 724). The played clock follows the travel, not the row.
- P4: a curve off its own clock "drags a dead sub-pixel tail (snappy and smooth both running 300ms was the R10-2 read)" (`motion-canon.md:160-163`). P7 makes that clock universal (`:239-253`).
- R2 uses a third horizon, 0.3 % of travel (`R2.html:99-104`).

**Why it matters.** The mark is a frequent control, and P0a puts frequent feedback at 200 ms or less (`motion-canon.md:81`). A tapped tab's mark now runs 352 ms on the row whose transition runs 210. One row has two clocks, and the precept draft says it has one.

**Remedy.** End the samples at the row's own settle band, relative to the travel as LAW 0b sets it, and land the last band step at the end as the token does. At zero speed the played clock then equals the token's. State the clock with a release speed in §4.2, and recompute `sketch-check.json` against that horizon.

### A3 (major). The adopted rim writes a custom property every scroll frame, against law 5 as pass 2 amended it, and trails the scroll further than today.

**Claim.** §4.3 ends: "Nothing writes a custom property each frame to drive any of these". Law 5's measure, amended in this pass, says the same (line 23). Rule 4 puts any function of scroll position on a scroll-driven animation, or animates nothing. The rim adopted in §4.4 breaks all three wherever it shows scroll progress, which is the owner's order (`docs/precepts/README.md:105-108`).

**Evidence.**
- The sketch drives both legs from `--scroll-progress-rim-f` (`sketch/scroll-progress-rim.next.css:11`, `:15`). P2-scroll writes it "on each scroll event, as ScrollProgressRim's value is" (`P2-scroll.html:236-242`).
- §4.4 keeps the script value because "atlas feeds it beat progress … and fourier a job's progress". It leaves out the scroll feeds the census lists. gaggle's `PageDock.vue:4` draws "how far down the page" on the rim. fourier's `usePageScroll.ts:5-20` feeds AppDock's rim "the route's reading progress".
- Pass 2's own kink finding (§4.2) says a transition restarts at its curve's start slope. Fed every frame, the rim's 210 ms transition restarts every frame. On the proposed `cubic-bezier(0.232, 0, 0.18, 0.703)` (`P2-scroll.html:26`), one frame covers 3.4 % of the gap. At a steady scroll the line then trails by about 28 frames (0.47 s). On today's `linear()` token, one frame covers about 5.0 %, a trail of about 19 frames (0.32 s). (Steady state: lag = r(1 − y)/y, with y the curve's progress at 16.7 ms of 210.)
- §4.4 says "It keeps gliding while the page is busy". Its own input waits on the page's thread.

**Why it matters.** The rim's job is to report scroll position. A border line half a second behind the page reports where the reader was. The design breaks the law the pass wrote, in the part the owner ordered.

**Remedy.**
- Split the rim by its feed. A scroll-fed rim plays the window and stroke `translate` on a `scroll()` timeline (rule 4): no script, no transition, no trail. A rim fed discrete values (atlas's beats, fourier's job) keeps the value and the transition.
- Name both scroll feeds in §4.4, and ask gaggle and fourier whether their feed is the page's scroll alone.
- If a scroll timeline cannot draw it, the cell goes to the owner with the trail measured.

### A4 (major). The proposed scroll-chrome breaks the ceiling it replaces: three properties on one node, a second shadow layer, and a pseudo-element added for the motion.

**Claim.** §4.4 adopts the state-driven scroll-chrome without counting it against law 4 or restraint's ceiling. §1 says a part that fails a law goes to the owner with the measurement.

**Evidence.**
- **Three properties on one node.** `.scroll-chrome[data-collapsed] { scale: 0.88; translate: 0 -6px; opacity: 0.72; }` (`sketch/scroll-chrome.next.css:22`; `P2-scroll.html:98`). The ceiling is two (`restraint.md:202`; law 4). Pass 2 counts `translate`, `width` and `height` as three for SegmentedTabs (§2.1), so the same count applies here.
- **Two shadow layers.** The sketch leaves the bar's own shadow alone and adds a second, `0 8px 20px … 24%`, on `::after`, faded in on collapse (`:12-23`). In P2-scroll the collapsed B bar carries both: its own `0 2px 8px … 6%` (`:89`) and the `::after`'s (`:93-99`). On a glass host the bar's own `box-shadow` is already the rung's list (`ladder.css:144`). Restraint allows "at most one shadow per surface, taken from the shared elevation tokens" (`restraint.md:53-55`; ceiling, shadow layers 1, `:197`). The added shadow is not an elevation token.
- **A pseudo-element for the motion.** Today's recipe has none: one `box-shadow` on the bar, strengthened in place (`scroll-chrome.css:86-95`). The ceiling for nodes or wrappers added for a motion is zero (`restraint.md:201`).

**Why it matters.** The rewrite was meant to cure a page-thread scrub, and it does. It also adds a layer and keeps three moving properties, and nothing in §4.4 says so.

**Remedy.**
- Drop one of the three legs. The 6 px rise is the candidate: a scale from the top origin already reads as rising. Or put the choice to the owner.
- Keep one shadow: the bar's own elevation token, stepped to the next elevation on collapse. Since `box-shadow` is page-thread work (§4.1), that step is an effect leg of 200 ms or less, which the drafted P5 allows. No `::after`.
- Add the count to §4.4.

### A5 (major). The rim's window moves the progressbar's box, the site question asks about a box that never moves, and the inset variant clips the dots.

**Claim.** §4.4 places the rim in 11.3.0 as "internal styles". The design moves a box a site may check, and its inset form breaks "nothing clips".

**Evidence.**
- **The moving box.** The root is the element with `role="progressbar"` (`ScrollProgressRim.vue:98-108`). The sketch translates it by `(f − 1) × 100 %` (`scroll-progress-rim.next.css:11`), so at zero progress its whole box sits outside the host. The stroke counter-translates by the same amount (`:15`), so the stroke's box never moves.
- **The question.** §4.9 asks atlas, fourier and gaggle: "Does a suite of yours read the stroke's `clip-path` or its box?" That is the one box that stays put. atlas fails any box that moves ([IN atlas 5]), and a VoiceOver frame follows the moved root.
- **The clipped dots.** The inset variant "takes the same pair: its track clips round" (`scroll-progress-rim.next.css:4-5`; §4.4). The dots are children of the track (`ScrollProgressRim.vue:115-131`). The component's own header records why the track must not clip: 6 px dots on a 3 px band overhang it by 1.5 px, and "the register's `overflow: hidden` would CLIP them. A visible break beats one saved declaration" (`styles.css:10-15`). Restraint: "Nothing shifts layout and nothing clips" (`restraint.md:113`).
- **The pseudo-element.** Moving the band's gradient onto a pseudo-element so the window can slide adds a box for a motion (`restraint.md:201`).

**Remedy.**
- Ask the sites about the root's box (the progressbar), not the stroke's, and hold the 11.3.0 placement until they answer.
- For the inset variant, either keep today's clip, which A3's split leaves fed by discrete values, or find a window that does not clip the dots and adds no node. Otherwise leave the inset rim out of the change and say so.

### A6 (major). "11.3.0 is lighter for every site" nets CSS against JS. daraksha's caps count JS alone.

**Claim.** §4.7 says the tokens and the player "reach every site, so 11.3.0 is lighter for every site on its own". The proof is −1,487 B of token CSS against +655 B of player JS. The brief's bar is bytes per site entry.

**Evidence.**
- daraksha's budget is "The JS budget": per route "the eager set", and it measures `.js` files only (`scripts/check-budget.mjs:2-4`, `:116`). The reader's route cap is 126 KB, set by the owner on 21 Nov, against 125.3 KB measured (`:33-35`).
- value.js: "A lens or goo that loads on intent … would fit; one added eagerly to every route would not" ([IN value.js 5]).
- The player serves the mark. The dock is on every daraksha route, so the player is eager.
- By the charter, 11.3.0 carries additions and 12.0.0 the removals. 11.3.0 adds the player's 655 B to daraksha's eager JS and removes no JS from it; the JS removals (`useDockRunMark`, `useDragVelocity`) wait for 12.0.0. The player alone leaves the reader's route about 45 B of its 0.7 KB. If the mark lands in 11.3.0 as a new part, as the charter's split implies, its writer (about 600 B by pass 1's estimate) puts the route over its cap.
- For Home Assistant the netting holds: its build ships no CSS asset (`package.json`, `gate:no-css-asset`), so the token CSS sits in the measured script.

**Remedy.**
- Split §4.7 by asset kind per site, and say which caps count which kind.
- For daraksha, either load the player and the mark on intent (first touch of a seat), or land the JS removal that pays for them in the same release.
- Withdraw "lighter for every site" until the per-entry figure exists.

### A7 (major). R5's close re-creates the glass-over-glass that fold A10 cured, with a `backdrop-filter` tween nobody labelled.

**Claim.** §3.6 describes R5 (amended in pass 2): "The seat hands its glass to the menu at frame 0 and takes it back by a tween once the menu has cleared it, so no plate frosts another." On close, the page does neither.

**Evidence.**
- `close()` removes `lent` from the seat at once (`R5.html:141-147`), so the seat's blur tweens from 0 to 16 px over 120 ms (`:64`).
- The menu fades in place over the same seat for 110 ms (`:77`; it opened over its seat, `:156-157`), so it never clears the seat.
- For about 110 ms a frosted plate sits over a seat whose frost is rising. That breaks law 1 as pass 2 amended it: "a sibling painted before a glass plate is sampled by it", line 19.
- The return is an animated `backdrop-filter`, which `restraint.md:143` forbids until the owner rules on Q19. Fold A9 said such a lane is labelled on the page as an amendment request. This one is not.
- On open, `.seat.lent` sets `transition: none` (`:68`): the seat's frost goes in one frame, and the menu's same-sized plate stands in its place.

**Remedy.**
- Give the seat its glass back only after the menu is gone, with an `opacity`-only tween of the seat's veil, or none.
- Or label the return on the page as an animated material, Q19's question.
- Correct §3.6's sentence to match whichever the page does.

### A8 (minor). The run's caps and `useSpringMount` are credited in the 12.0.0 ledger before the decisions that remove them are made.

**Evidence.**
- §4.4 marks the caps "Proposed, after BL". §4.7 still counts their 597 B in the 12.0.0 net of −3,121.
- The stated result is "A seat resting flush against an end is clipped by the plate's arc". Restraint says nothing clips (`restraint.md:113`).
- The proposal also ends BL's "flush = completeness" grammar (`wi8:run.css:752-760`).
- UNION I13 offered moving the caps to an accelerated property first. §4.4 does not show that route failing.
- `useSpringMount`'s 791 B is credited "where Q6 holds", but its callers, Dialog and Sheet, are Q9's and Q12's (pass 8).

**Remedy.** Carry both as conditional rows outside the net until BL, the owner and pass 8 rule. State why the caps cannot move to an accelerated property. Put the clipped flush seat to the owner as a picture, beside BL's reduced-motion branch, which already rests the clip that way (`wi8:run.css:770-787`).

### A9 (minor). Rule 3 settles Q8, which the owner decides, and rule 2 places sheet detents ahead of Q12.

**Evidence.**
- Rule 3: "one write of `translate` per pointer event, at the finger (rubber-banded past a bound)" (§4.3, line 290). A rubber band past a bound is L6, which is OPEN under Q8, "the owner, from pass 5's page, with and without" (UNION L6, Q8).
- Rule 2 lists "a sheet's detent" for the played spring. Pass 8 decides whether detents become a native snap scroller (Q12, D16), in which case nothing is played.

**Remedy.** Strike the parenthetical, or write "past a bound: Q8". Write "a sheet's detent, unless Q12 moves it to native scroll".

### A10 (minor). FadingScroll's text and sketch disagree on a host without padding.

**Evidence.**
- §4.4: "A host with less than 1rem of padding on the scroll axis sees its content inset by the ramp instead."
- The sketch always applies `margin-inline: calc(-1 * var(--fade-scroll-width))` and the matching padding (`fading-scroll.next.css:5-11`). Content stays where it was, and the port overflows its host by the ramp.
- On a host that clips, the ramp is cut off and the edge is sharp. On a host near the viewport edge with less padding than the ramp, the page scrolls sideways at phone width (`restraint.md:113`).

**Remedy.** Say which behaviour is designed and sketch it (for example a `max()` against the host's padding). Ask the sites the padding question with that behaviour stated.

### A11 (minor). The drafted amendments leave out two rules the delivery overturns.

**Evidence.**
- **P0a rule 6.** "Anything that can come back inside a tenth of a second is a node that stays and changes by a CSS transition" (`motion-canon.md:93-95`). Rule 2 moves the tap-sent mark, which a second tap retargets, onto a Web Animation. §4.2's kink argument is a good case for changing rule 6, but §4.6 does not draft the change.
- **The vaporize.** The P5 rewrite limits motion to `translate`, `scale`, `rotate`, `transform` and `opacity`. It allows registered customs only "an effect of 200 ms or less". The toast's exit animates registered `--vap-blur` and `--vap-saturate` into `backdrop-filter` over 317 ms (`dissolve.css:69`; `animations.css:397-405`). That is a shipped design measured on the device, and the rewrite would condemn it without naming it.

**Remedy.** Add a P0a rule 6 line to §4.6. List the vaporize under the P5 draft as a part it breaks, for the owner's ruling with Q19.

### A12 (minor). The player holds its end value with `fill: "forwards"` and never commits it.

**Evidence.**
- `playSpring.ts:68` ends every settle on a forwards fill. A forwards fill overrides the element's own `translate`, so a later CSS transition on that property (rule 1: a keyboard glide, Q16) plays under it, unseen.
- Any cancel other than `retarget` (an unmount, a reduced-motion switch) drops the fill, and the node jumps to its underlying style in one frame. P0: "Nothing teleports" (`motion-canon.md:31-34`).

**Remedy.** On finish, commit the end value (`commitStyles()`, then `cancel()`). State in §4.3 that one node never mixes a held animation with a transition on the same property.

### A13 (minor). P2-scroll's F reads a different clip from the one §4.4 adopts.

**Evidence.**
- The sketch clips the window with `clip-path: inset(0)` and rules out `overflow: clip` by name ("Not `overflow: clip`, which would follow the root's inherited radius", `scroll-progress-rim.next.css:7-9`).
- P2-scroll's F window is `overflow: clip` (`P2-scroll.html:150`).
- The reading settles whether F stutters in Safari, so it can only speak for the clip the page draws.

**Remedy.** Make F the adopted primitive, or adopt the one F reads.

### A14 (minor). One retry came sooner than the machine law allows.

**Evidence.** `retry.log` records attempts at 17:36:52 and 17:44:44, 7 min 52 s apart. The law says at most once every 10 minutes.

**Remedy.** Note it in the log, and hold the 10-minute floor in the passes that follow.

## Objections that did not survive the second reading

- **The token swap changes the owner's signature motion** (`restraint.md:28-30`). Dropped. The shape moves by at most 2.65 %. LAW 0 already lands every row but panel dead (`springPresets.ts:13-18`), and the swap reaches the owner through the P7 draft and "What the owner sees change".
- **Removing overshoot from five rows breaks the bounce edict.** Dropped. Those rows ship no visible overshoot today: by LAW 0 no row but panel has a first peak above its settle band.
- **Home Assistant's 0.2 kB margin is netted across CSS and JS.** Dropped for Home Assistant: its build emits no CSS asset, so the netting is valid there. It survives for daraksha (A6).
- **The run's caps overturn BL's design without the owner.** Reduced to A8. UNION I13 gave pass 2 the choice to remove them, and §4.4 marks the removal as a proposal for BL.
- **Pass 2 stopped retrying at 33 minutes, not 60.** Dropped. "Up to 60 minutes" is a ceiling, and the zone only climbs until a reboot. Only the short gap (A14) breaks the law.
- **scroll-chrome's sketch drops `collapseOnScroll: false` and the four depth knobs.** Dropped. No site mounts `useScrollChrome`, and Home Assistant imports only the stylesheet and sets none of the knobs (`sheet.css:41`).
- **P2-scroll carries several inks** (the amber ask, the orange pressed fill, the violet rim). Dropped. That is the reading pages' own chrome, accepted by pass 1's fold, and the violet is the rim's default ink.
- **R3 shows three blur values.** Dropped. Choosing among them is R3's question, and each lane holds one value in both modes.

## Browser read

Refused at 18:06 (13.70M) and again at 18:16:34 (13.75M), after the 10-minute floor. The count only climbs until a reboot, so I stopped there. The read is owed: after a reboot, run `~/.claude/guard/guarded --timeout 5 -- node <scratchpad>/critA/read.mjs` from the glass-ui checkout. It reads B's two shadow layers, F's window and stroke boxes, and the page's scroll width at 390. Nothing above depends on it.
