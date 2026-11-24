# BM pass 10: Critic B (production iOS Safari and the evidence)

Seat: Critic B, claude-opus-5-5 (asserted from its own system identity), 2026-11-24. I judged pass 10 against its line in UNION §4 ("Convergence": access under every mode, the byte ledger closed against each site's bound and split by release, each question closed or marked owed, DESIGN.md rewritten whole, the tranche's waves with gates, the precept amendments and the messages), and against the two lines the ratified driver adds (`driver/bm-passes-ratified.json`, `pass-10`): the apotheosis table, every facility of rida.dev, iOS 27 and the ChatGPT slider "marked matched (with its reading), surpassed (how, with its reading) or refused (the law that refuses it)", and a message to each site saying "what each site gains and what it does to reach it".

**Read.** CHARTER; UNION.md in full; union-fold; INBOUND; READINGS; `choices/RULING-2026-11-23.md`; DESIGN.md as pass 10 rewrote it, in full; `pass-9/fold.md`; every file under `pass-10/` (`precepts.md`, `tranche-draft.md`, the nine messages, `access/frames.{mjs,json}`, `access/p10-probe.{mjs,json}`, `access/window-hit.mjs` and `window-hit-chromium.json`, `ledger/ledger.{mjs,json}`, `slider/slider.json` and `sketch/slider-expand-c.css`, `toggle/toggle.json`, `goo/goo.next.css`); the passages of `pass-10/DESIGN.before-pass10.md` the rewrite rests on (law 7 at :25, the R2 Low Power line at :341, the sheet at :1511, the exits at :1476, the goo at :1762, the ledger at :1561-1575); `pages/P10-toggle.html`, `pages/P10-plate.html` and the asks of `pages/P10-slider.html`; `pass-7/fold/hosts.json` and `pass-8/fold/hosts.json` (the census); `pass-6/fold/forced-colors.json` and `pass-6/fold/ledger.json`; `pass-9/critique-B-check-webkit.json`; BL's `design/dock/wi8/MEASURE-9.md` (:198-232, :585-600) and `design/intent-motion/PROTOTYPE.md` and `fold.md` (the plate and `installPress`); glass-ui `master` for `useSpringMount`, `useSelectionIndicator`, `useSelectionGroup`, `useDockRunMark` and the section colours, `bl/dock/wi8` for `useDockRunMark`, and `fe30f9882` (BL's slider build) for its hover gating and commit message.

**Ran.** I changed no design, page or source and staged nothing. I added one check beside the pass's own, `pass-10/critique-B-check.mjs`, run once per engine through `guarded` (Chromium in the browser pool; WebKit under `--exclusive webkit`), headless, one browser per run, a context per cell, all closed in `finally`. Its outputs are `pass-10/critique-B-check-chromium.json` and `critique-B-check-webkit.json`. It re-reads three cells only a run can judge: the folded window's hit region at points the pass's probe did not test, the slider's grown ground as a hit target beside a neighbour, and the toggle's legs and glyph through a theme flip. Neither engine is Safari or an iPhone; Playwright WebKit draws no backdrop blur, and no cell needs one.

**Readings.** No iPhone reading has returned (`READINGS.md`, "Readings returned (none yet)"). Under O-426 the defaults hold and a reading amends; I do not object to deciding on defaults. I object where a decision or a message states as read, measured or matched what the record says is unread, unmeasured or refused.

## Objections, after the second reading

Each objection was made, then re-read against its evidence. The ones that did not survive are listed at the end.

### B10-1 (blocking). The toggle's night does not carve the crescent, and a press starts three legs, not two

- **Claim.** §9: "A night mask circle of r 5.75 at (15.5, 8.5) slides from `translate: 9px -9px` to 0 and carves the crescent"; "a press starts two legs, the rays and the night". §10.1: "the legs are the night's `translate` and the rays' `scale`". §10.3: under forced colours "its night still carves by mask". The design ships in 11.2.0 (BM-1) on O-428.
- **Evidence.**
  - The sketch sets `.dark-mode-toggle-button > svg { fill: currentColor; }` and gives the mask's `<circle class="toggle-night">` no fill of its own (`toggle/sketch/DarkModeToggle.next.vue`, `dark-mode-toggle.next.css`). P10-toggle is built the same way (`.tg:is([data-v="b"], [data-v="c"]) svg { fill: currentColor; }`, `<circle class="night" …>` in the mask). The circle inherits the night's own tone, and a luminance mask cuts only as far as its fill is dark.
  - My run, at the dark end state of P10-toggle's B (the large toggle; `critique-B-check-{chromium,webkit}.json`, "toggle B, dark end state"). WebKit 26.5: the bite at the night's centre reads rgb(124, 144, 204), the disc outside the bite rgb(136, 161, 231), the card rgb(53, 42, 34): the bite keeps about 86 % of the disc's ink. With only `.night { fill: #000 }` added, the bite is the card exactly and the glyph's ink falls from 1,228 px to 711 px, which is the crescent (the lens of the two circles is 44 % of the disc; the disc alone is 1,194 px at this size). Chromium 149: the bite rgb(106, 117, 159) against the disc rgb(136, 161, 232), about 63 % kept; ink 1,228 px as built, 709 px with the black fill, the bite then the card exactly.
  - Through the flip, the glyph's ink falls with the rays (1,804, 1,320, 1,228 px at 0, 60 and 120 ms in WebKit) and then stays flat while the night travels its last 3.6 units (1,228 and 1,230 px at 180 and 260 ms). The night moves; the page cannot see it.
  - The legs. p10-probe's own cell "toggle B click" lists five transitions within 30 ms of Enter: `tg color`, `tg opacity`, `tg scale`, `night translate`, `rays scale`. Two are the focus plate appearing. With no pointer and no focus (a bare `click()`), my run reads three on the toggle in both engines: `tg big color`, `night translate`, `rays scale`. The sun-to-night colour change is a third leg of every press, and it is the design's own colour sign (§9, "Colour").
  - Under Reduce Motion the probe's cell still lists `tg scale`: the page's plate grows from 0.8 by `scale` with no reduced branch. That is the page's model, not W-B.17 (whose reduced plate fades, BL `intent-motion/PROTOTYPE.md`), but it is what the owner is shown.
- **Failure.** In 11.2.0 dark mode, at every site that mounts DarkModeToggle (value.js, keyframes, slides, atlas, gaggle's prototype), the toggle shows a full indigo disc with a faint bite where the design promises a crescent: the dark state's one sign is nearly lost. The same fault is on P10-toggle, so a letter the owner sends for B would judge the broken glyph. Under forced colours the circle takes the forced text colour, so in a theme with light text it cuts almost nothing (an inference from the same mechanism; unrun). The press runs three animations against restraint's two (`restraint.md:204`), and the count in §9, §10.1 and BM-1 is not what either run shows.
- **Remedy.** Give the mask's circle its own `fill="#000"` (and `forced-color-adjust: none` on the mask's content), rebuild P10-toggle with it, and read the crescent by pixels, not by computed `translate`. Count the colour leg: either the night's colour change rides inside the two legs (the glyph painted in one colour per theme with the colour switched under the mask, no transition), or the toggle is a named exception to the ceiling, on the owner's word. Give the page's plate a reduced branch.

### B10-2 (blocking). The apotheosis table marks refused facilities "Matched"

- **Claim.** §13: "Matched means the design does what the reference does"; "Refused means a law refuses it". O-426: "Nothing is left unanswered."
- **Evidence** (each union row against its §13 row):
  - **L7** "The bar's answer to a press | R, A | Matched". UNION L7: rida swells the bar to 1.047 × 1.073, Apple "swells, glows and washes"; decision "**REFUSE** the swell and the thickening". Glass answers with a fill. That is a refusal under P0a's press row and `restraint.md:204`.
  - **M3** "An exit shorter than its entrance | R | Matched". UNION M3: rida closes "on ζ 0.8 r 0.49, slower than open"; decision "**REFUSE** rida's". The facility named is glass's and Home Assistant's, attributed to rida.
  - **M9** "Scroll progress on the dock's border | R | Matched". rida has no border rim; its facility is "a separate reading-progress capsule beside the menu button that dissolves as the menu opens" (UNION M9), which the union refused and §6.3 refuses again ("No neighbour yields").
  - **D3** "The row highlight | R | Matched". rida's highlight "glides on ζ 0.9 r 0.15" between rows (UNION D3); the union refused "a mark that glides between rows". Glass keeps each row's own fill.
  - **F2** "The neck between fusing shapes | Matched". On a fold (the fusion) "no drawn frame falls between 0 and 5 px, so a fold shows no bridge" (§7.4), the open draws it on 3 frames at 60 Hz and 1 at 30, and "the neck is thinner than iOS's". F1 "Matched" carries "Safari's own reading owed".
  - **F9** "Matched" omits what the union refused of rida's bud: the seed, the kick, the button's shrink and travel, the content's overscale and blur.
  - **L1** "Surpassed": rida's lens measured 118 fps on the author's phone (UNION L1); glass's follow is "one `translate` write per pointer event" (§4.2 rule 3), which UNION I10 takes as 60 Hz in production Safari. "Surpassed" cites a headless file and no frame rate.
  - **13.10**: "Three nested capsules … shell ⊃ fill ⊃ thumb | Matched", while the next row refuses the thumb; "shell 1.6 times the fill | Matched" with 1.57 to 2.33 (ChatGPT 68/42 = 1.62; md 1.8, sm 2.33).
  - **Missing.** UNION D16 carries Apple's "a sheet dragged up becomes more opaque" (356); no §13 row answers it.
- **Failure.** The owner asked for this table to tell him where glass meets, beats or refuses each reference. Read as written, he would believe glass swells its bar, exits like rida, has rida's reading capsule and gliding row highlight, and draws iOS's neck on fusion, none of which the design does.
- **Remedy.** Re-mark L7, M3, M9, D3 and F2 as Refused (naming the law) or as Matched in part with the refused part and its law. Split F9. Give L1 its frame-rate caveat or mark it Matched. Correct 13.10's two rows. Add D16. Re-attribute M3's facility to rida's actual exit.

### B10-3 (major). "Reading" is redefined, and no answer says what kind of evidence it rests on

- **Claim.** §13: "A reading here is the evidence of ours that shows the answer: a page, a probe file or a measure." Rows cite R3, R3b, R7, P2-scroll, P4-bud, P5-mark and P7-fuse as their readings.
- **Evidence.** UNION §4 (binding): "A reading is the owner's report or his screen recording, marked as such." DESIGN §2.1: "A reading is marked by kind: author, sim, device, source, or a run of ours." READINGS.md: none returned. Each cited page is a prototype the owner was asked to read, not a reading. No §13 row names its kind. Many rows cite only a section or a law (D3, D6, D7, G6, G8, G10, I19, A7, T9). F7, M8 and M9's "on the compositor" are source inferences (§4.1), and M9's scroll timeline is threaded only from Safari 26.4 ([IOS §2.3], UNION I12).
- **Failure.** O-426 asks for "Matched, with its reading". A reader cannot tell which answers rest on a run in Chromium, on Playwright WebKit, on arithmetic, on WebKit source, or on an unread page, and the table reads as if each were seen.
- **Remedy.** Add a "kind" column (source, Chromium, Playwright WebKit, arithmetic, owner page unread, none), and say at the head of §13 that no answer rests on an iPhone reading.

### B10-4 (major). Law 7's 30 fps line is claimed held by every leg; pass 10's own table shows legs that break it

- **Claim.** §10.6: "The short legs show three to five frames, which is law 7's 30 fps line for a compositor leg. The exit on `ease-out` was the one leg that put more than half its travel in one frame." §13.8 I20: "Matched | Law 7's 30 fps line, held by every leg".
- **Evidence.** Law 7 (§1; `precepts.md`): "A leg under 167 ms is a compositor leg (rules 1, 2 or 4), or it shows fewer than five frames in Low Power Mode"; the record says why: "which is why §4 puts short legs on the compositor" (`DESIGN.before-pass10.md:25`). `access/frames.json`:
  - "slider: the ground shrinks", 120 ms, "page thread (clip-path)": 4 frames at 30 Hz, `fiveFramesAt30: false`, steepest 0.488.
  - "toggle, Reduce Motion: the crossfade", 150 ms, "page thread (SVG child)": under 167 ms on the page's thread (4.5 frames; the script's loop counts a fifth past the end), steepest 0.536.
  - More than half in one 30 Hz frame: the readout leaving (0.530), the plate's hover fade (0.530), the toggle's reduced crossfade (0.536), a length's reduced tween (0.536). The ease-out exit is not "the one leg".
- **Failure.** In Low Power Mode, and on any busy page, the slider's ground snaps back in four frames on the page's thread, the case law 7's line exists to prevent, and I20 tells the owner the opposite.
- **Remedy.** Put the shrink on 167 ms or more (it is a reveal on the page's thread, so it cannot move to the compositor), or name it as law 7's exception for the owner. Correct §10.6's two sentences and I20.

### B10-5 (major). The linear exit is "Decided" on a frame rate the record calls unread, and §15.2's promise to mark inferences is not kept

- **Claim.** §5.2: "**Decided: `--exit-curve` becomes `linear` in 11.3.0**", because ease-out "drops … 0.616 at 30 Hz". §15.2: "Each claim that rests on one is marked an inference where it stands."
- **Evidence.**
  - The exit is an opacity fade, a compositor leg. Whether compositor legs drop to 30 fps in Low Power Mode is unread: "R2's second run, with Low Power Mode on, shows whether compositor legs keep their pace when the page's rendering halves" (`DESIGN.before-pass10.md:341`). WebKit's 30 fps throttle is on the page's rendering updates (`AnimationFrameRate.cpp`, [IOS §2.4]). Law 7's own line assumes compositor legs escape it.
  - At 60 Hz ease-out's steepest frame is 0.388, inside law 7's two fifths (`frames.json`).
  - §15.2 lists "A Low Power Mode look at the 120 ms exit" as a fact reading; §5.2 does not say it is an inference. Neither does §10.2: "VoiceOver on an iPhone follows the same tree" rests on Chromium's accessibility tree (`p10-probe.json`), and VoiceOver reads WebKit's.
- **Failure.** Every exit at every site changes in 11.3.0 on a premise that, if law 7 is right, does not apply; if it does apply, law 7's compositor exemption fails for every short leg (the press, the dip, the hover fade) and §10.6 is wrong in the other direction.
- **Remedy.** Mark §5.2 provisional on the Low Power reading, or argue it at 60 Hz alone; mark §10.2's VoiceOver sentence an inference.

### B10-6 (major). The slider's grown ground takes the pointer, and takes a neighbour's taps

- **Claim.** §10.7: "The slider's grown ground takes no pointer (`pointer-events: none` on the shell). The root's box is the hit region at every state." §13.9 A8: "the grown ground never changes the hit box". §8.3: "The root's box never changes."
- **Evidence.**
  - The sketch: `.glass-slider[data-expand]:is([data-held], [data-focus-key], [data-hover]) .slider-shell { pointer-events: auto; }` (`slider/sketch/slider-expand-c.css`). BL's build commit says the same: "the shell grows by clip-path and takes the pointer while grown" (`fe30f9882`).
  - My run, on p10-probe's own fixture (BL's sheet with C spliced in) with a button whose right edge sits 4 px left of the slider (`critique-B-check-{chromium,webkit}.json`, "slider hit"), the same in Chromium 149 and WebKit 26.5: at rest the point 2 px outside the root hits the page and the point 6 px outside hits the neighbour; hovered, 2 px out hits the slider's shell; held or keyed, the point 6 px outside the root, over the neighbour, hits the slider's shell.
- **Failure.** While a slider is held or keyed, a tap up to 8 px outside it, on a neighbour, goes to the slider; under a resting mouse the slider's hit grows by 4 px. On a phone the hold is the touch itself, so on a touch screen this reaches a second finger only; with keyboard focus (`data-focus-key`) it lasts while that focus stays, and a click on the neighbour then lands on the slider. The atlas, fourier and Home Assistant messages ask about sliders "within 8 px of something its grown track would cover"; none says the grown track takes the taps.
- **Remedy.** Either the shell takes no pointer in every state (the hover is held by the root, which already owns `pointerenter`), or state the hit growth in §8.3, §10.7, A8 and the three messages and add it to atlas's box-identity question.

### B10-7 (major). The window's rounded clip does not bound the plate's hit area, and the cell that said it does cannot tell

- **Claim.** §10.7: "With pass 5's cure (§3) only the disc is hit … So the rounded clip bounds the `::before`'s hit area in Chromium." BM-8's proof is "the same cell in Playwright WebKit, then Safari".
- **Evidence.** `access/window-hit.mjs`'s four points lie outside the `::before`'s own box (100, 180) or outside its own rounded corner (203, 102); none lies inside the `::before` and outside the window's clip, so none tests the clip. I kept the four and added two (`critique-B-check-*.json`, "window pass5_cure"): (300, 126), inside the `::before`'s box past the window's straight edge, hits nothing (the rectangular clip holds); (250, 102), inside the `::before`'s box and outside the window's rounded end, hits the dock, in Chromium 149 and in WebKit 26.5 alike.
- **Failure.** The folded disc takes taps in the corners of its square on the clipped side, outside the visible disc (about 290 px² at 52 px). Small, but §10.7 states the opposite as read, and BM-8's proof would re-run four points that cannot fail.
- **Remedy.** Correct §10.7 and §3. Add the two points to `window-hit.mjs` and to BM-8's proof, and say what bounds the corner (a `clip-path` on the window, which clips hit testing, or an accepted corner).

### B10-8 (major). On the three docks that mount the goo, the fold is not a compositor motion, and the goo's cost has no gate

- **Claim.** §7.1: the fold "rides the dock's row as compositor keyframes (rule 2)". §10.6's table: "The fold … compositor". §10.6: "In Home Assistant's WKWebView the springs' move to single curves is what keeps every state change on the compositor." §13.2 F7: "on the compositor". BM-12: the goo's paint cost is a fact check that will "amend, never block".
- **Evidence.**
  - The record pass 10 rewrote: "WebKit does not composite an element with `filter: url()` (`RenderLayerBacking.cpp:L1025-1031`), so the window's translates under it are painted on each frame … A busy page can stall the fold while the filter is on. Law 5 is broken for those frames, by the owner's order" (`DESIGN.before-pass10.md:1762`). The rewrite keeps the cost line (§7.4) and drops the stall and the law 5 break.
  - The filter is on "on the frame a close starts" and "through the folded rest" (§7.4), on value.js's, daraksha's and Home Assistant's docks (`ledger.mjs`, `GOO`). Every close there repaints the layer in the web process each frame, two CPU blurs over 218,880 device px, and the record's own words are that a busy page stalls it.
  - O-426: the study's objections to C "remain as costs to meet, not as a refusal". The tranche's only goo gate, G-6, checks that the dock samples nothing; it does not measure the cost.
  - Home Assistant's bound: "each fused surface is a blur layer in WKWebView, so at most one live lens or fuse at a time" ([IN HA 2]). The filter held through the folded rest is a live fuse whenever the dock is folded; a dialog opened then adds the veil's blur. The design does not say how that counts.
- **Failure.** In Home Assistant's app, the one place every site's bound calls first-class, the folded faces seat's dock runs its close on the page's thread through a CPU filter, while the design and the message say every state change there is on the compositor. A cost "to meet" ships with no measure.
- **Remedy.** Restore the record's sentence in §7.1, §10.6 and F7 for the goo docks. Give BM-12 a cost gate it can run (Playwright WebKit's paint time per frame of a close with Busy page on is an indication; Safari's Web Inspector is the reading), with a bound the owner sets, or say the cost is unmet. Say how a filter held at the folded rest counts against Home Assistant's one fuse.

### B10-9 (major). The menu's grow breaks the P5 draft pass 10 writes, and G-2 does not name it

- **Claim.** `precepts.md`, P5: page-thread properties "may carry an effect of 200 ms or less (a reveal, a hover fill, a tint, a glyph), never a body's travel". G-2's named exceptions: "the slider ground's clip, the toggle's SVG children, a colour" and the fusion layer.
- **Evidence.** §6.3: the menu grows "on `bloom` (0.42, 0.9). Its clip runs on the page's thread". `scheme-spring.css`: `--spring-bloom-settle: 0.37s`; the record's bloom row lands 98 % in 314 ms (`DESIGN.before-pass10.md:1443`). DropdownMenu is mounted at fourier, keyframes, value.js, daraksha, gaggle, atlas and Home Assistant (`pass-8/fold/hosts.json`).
- **Failure.** Either G-2 fails on today's grow when BM-6 lands, or the gate is passed by leaving the menu out. A 370 ms clip on the page's thread stalls on a busy page in every Safari, including Home Assistant's floor menu, while that site's message says every spring runs off the page's thread.
- **Remedy.** Name the grow in P5 and G-2 as the owner's O-171 exception with its length, or bring it under 200 ms; correct the messages (B10-10).

### B10-10 (major). The messages state inferences, and things the design says are false, as facts

- **Evidence.**
  - Eight of nine messages say every spring "runs off the page's thread", five add "in every version" (atlas, keyframes, fourier, slides; Home Assistant: "that WebKit runs off the page's thread in every version"). §15.2 calls this "§4.2's delivery, an inference from WebKit's source and release notes", owed to Q7. In scope it is false by the design's own text: the menu's grow (§6.3), the slider's ground (§8.3), the toggle's glyph (§9) and the goo fold (B10-8) run on the page's thread on single curves.
  - value.js: the goo "works in Safari". §7.4: its cost is "unmeasured", and whether WebKit paints a translated child inside the filtered layer is a check for the split wave; the Playwright WebKit cell is "an indication only".
  - Home Assistant: "Added up as upper bounds, your entry falls by about 1.3 KB." Summing upper bounds on both sides bounds neither side of a net (B10-11). daraksha: "the reader route's eager script falls by about 0.8 KB rather than rising", stated as fact.
- **Failure.** The sites act on these notes. atlas is told "Safari gets the same thing Chromium does"; Home Assistant plans its entry margin on a fall the ledger cannot promise.
- **Remedy.** Say what is known: the curves WebKit's source and release notes say it accelerates, the parts that stay on the page's thread, the goo's cost unmeasured, byte figures as estimates closed by each site's build at the release candidate.

### B10-11 (major). The ledger's "within" verdicts and Q17's "closed by sum" go past what its figures can show

- **Claim.** §11's table: daraksha, gaggle and Home Assistant "Within: yes". §16 Q17: "Closed by sum".
- **Evidence.**
  - Method (`ledger.mjs`): standalone gzip -9 of each part, "an upper bound on both sides". A removal's standalone figure is an upper bound on what it frees, so a net of two upper bounds bounds nothing. The margins are 200 B (Home Assistant's entry) and 45 B (daraksha's reader route).
  - Reach. `DIALOG` omits gaggle, but gaggle mounts Dialog 15 times, SheetContent 15, DropdownMenu 3, with 13 detented-sheet files (`pass-8/fold/hosts.json`); gaggle's 11.3.0 overlay rows and 12.0.0 sheet rows are missing, while its message promises "Your five detented sheets … become native scrollers".
  - Unpriced: the touch slide's own chunk, "≤ 377 B, loaded on a menu's first touch" (`DESIGN.before-pass10.md:1571`); only its 60 B loader is in the ledger.
  - Unchecked: Home Assistant's second bound, "every script 438.2 of 439 kB" ([IN HA 5]). The on-intent player (655 B) and the touch slide (377 B) land in it.
  - `useSelectionIndicator` (−534 B) is credited at four sites because SegmentedTabs stops calling it, but on `master` SegmentedTabs and DockLayerGroup reach it through `useSelectionGroup` (`useSelectionGroup.ts:2`), which the ledger does not change.
  - The goo: `ledger.mjs` marks it on intent; §7.4 and §11 say "loaded with the dock".
- **Remedy.** Mark the verdict column "indicative", leave Q17 open until G-4, add gaggle to the overlay and sheet rows, price the touch slide's chunk, add Home Assistant's every-script bound, show `useSelectionIndicator` leaving the import graph or drop its credit, and make the goo's loading one thing.

### B10-12 (major). Sheets as native snap scrollers drop the iOS snap-settle fault the union carried

- **Claim.** §6.4: in 12.0.0 a detented sheet is a native snap scroller that "commits its rung only at rest, on `scrollend`".
- **Evidence.** UNION I1 and Q5 carry the 27.3 beta note: "Fixed scroll snap animation taking a long time to settle on iOS after flicking past the last snap position. (189473962)" (union-fold C-O13). Neither DESIGN.md nor the record's sheet section (`DESIGN.before-pass10.md:1511`) mentions it.
- **Failure.** In every iOS 26 and 27.2 Safari, and in Home Assistant's WKWebView until iOS carries 27.3's engine, a sheet flicked past its top detent, the commonest sheet gesture, takes a long time to settle, and `v-model:detent` waits for that settle. That reaches gaggle's sheets, atlas's FilterPanel and EntityDetail, keyframes' pane and Home Assistant's sheet.
- **Remedy.** Name the fault in §6.4 and in the sheet sites' messages, list it with §15.2's fact readings (it needs a phone), and decide whether BM-10 waits for a 27.3 floor or ships with the fault stated.

### B10-13 (major). Plate C's first reason rests on a measure that says otherwise, and the table misstates the page

- **Claim.** §6.2: "A hovered seat beside the current one must read below it. At B's 12 % a hover outweighs the current seat's 10 % … C is the dock's own ladder, measured in BL's dock study."
- **Evidence.**
  - BL `wi8/MEASURE-9.md` (at 6.5 % hover and 10 % current): "Hover against current is under 1.2 in every open nav cell, 1.0 on the light grid"; its G-15 ink row reads RED in both engines.
  - §6.2's table gives A and B no current fill ("—"); P10-plate draws and states "A: hover 5 %, current 12 %. B: hover 12 %, current 12 %." The reason compares B's hover with C's current.
- **Failure.** The recommendation that ships in 11.2.0 claims a separation its cited measure does not find, and the owner's page and the design describe different A and B.
- **Remedy.** Cite the measure as it reads; compare each letter on its own values (B: hover equals current); say what C does buy.

### B10-14 (major). The access run is three pages in headless Chromium

- **Claim.** UNION §4, pass 10: "run every part under the keyboard, VoiceOver order, forced colours, more contrast, reduced motion, Low Power Mode at 30 fps and WKWebView at 60".
- **Evidence.** `p10-probe.json` covers P10-slider, P10-toggle and P10-plate in headless Chromium. The mark, menus, dialogs, sheets, the fold, the goo and the rim were not run under any mode in pass 10; §10.5 says they "take the forms in §5.3" and leaves them to gate G-5. Low Power Mode and WKWebView are arithmetic (`frames.json`). No WebKit cell ran: §10.7 calls the window's WebKit cell "queued and never admitted, with the machine's load over the guard's ceiling", which is a queue wait, not a refusal (the machine law); the same cell ran for this critique after a queue of a few minutes (B10-7).
- **Failure.** The pass's own access product is partial, and three of the faults above (B10-1, B10-6, B10-7) are ones a pixel or hit read in either engine shows.
- **Remedy.** Run the mark, one menu, one dialog and the fold in both engines under each mode with the same probe, read the toggle by pixels, and keep §10's claims to what ran.

### B10-15 (minor). M1's refusal gives a technical reason the design's own §4.1 contradicts

- **Evidence.** §13.3 M1 and §6.6: an animated `backdrop-filter` "runs on the page's thread". §4.1: "WebKit hands … `filter` and `backdrop-filter` to its compositor"; UNION M1 cites `CSSProperties.json:L11333` and `GraphicsLayerCA.cpp:L721-726`.
- **Remedy.** Refuse M1 on `restraint.md:143` and choice 27 A alone, and drop the thread claim.

### B10-16 (minor). Q2 and Q12 are "Closed" while the fact each asks is owed

- **Evidence.** Q12 asks "Does a native scroller fit reka's Dialog, its focus trap and the detent model?"; §16: "Closed. The check inside reka's Dialog is owed on `bm/study`." Q2 asks how a fusion shows a bridge "in production Safari without a workaround"; its WebKit layers and cost are owed (§15.2).
- **Remedy.** "Decided on the default; fact owed", not "Closed".

### B10-17 (minor). Two of the three new pages cannot be answered in one look

- **Evidence.** P10-slider asks "Send A, B or C" where B is withdrawn (§8.3), and needs an iPhone for the press and a Mac for Tab and the mouse rest. P10-plate needs a Mac with a mouse, both themes, three letters and two runs of seats, to judge fills 1.5 points apart; the local site is served for the owner's iPhone, which has no hover. P10-toggle shows the broken crescent (B10-1).
- **Remedy.** Drop B from P10-slider's choices (or show it as withdrawn and not sendable); give P10-plate a still of each letter hovered beside the current seat, so a phone can answer.

## Dropped on the second reading

- **The first line.** DESIGN.md's opening block says "No iPhone reading has returned" (line 9), and O-426 makes letters optional. Not an objection.
- **The toggle's colour contrast.** `--section-color-5` is 5.02:1 on the card by its token's own comment (`color-radius.css:333`), and the dark arm clears it. Dropped.
- **A double credit for `useDockRunMark`.** BL's merge carries the file (wi8 `RULINGS-7.md`, C7-1), so its removal is BM's own. BM-4's phrase "BL's deletion of `useDockRunMark`" is loose wording only.
- **WebKit paints no plate on a tap.** BL's `installPress` writes `data-press` (`intent-motion/fold.md`, C-5), so the press tone does not depend on `:active`. Dropped.
- **The forced-colours 8 px shift.** `pass-6/fold/forced-colors.json` shows it (Chromium, 11.1.0): the boxes move from 35 / 108.3 / 181.6 to 35 / 112.3 / 189.6. The claim holds.
- **The goo's threshold makes the plates opaque.** `goo.next.css` makes the plates solid inside a layer at `opacity: var(--glass-alpha)`, so the union is not doubled and the alpha holds. Dropped.
- **A single curve stops at speed.** `present`'s end slope is a motion-quality question for Critic A, within P7's stated 2.65 % fit, not a claim past evidence.
