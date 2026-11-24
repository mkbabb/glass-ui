# BM pass 9: Critic B (production iOS Safari and the evidence)

Seat: Critic B, claude-opus-5-5 (asserted from its own system identity), 2026-11-24. I judged pass 9 against its line in UNION §4: "Confirm or reopen every provisional decision of passes 2 to 8 against the returned readings. Fold the second crop: close Q2, or tell the owner the bridge needs a workaround in Safari and the split is Apple's recipe alone. It produces amendments to design §4 to §10 and the answer on Q2."

I read CHARTER, UNION (in full), union-fold, INBOUND, READINGS, `choices/RULING-2026-11-23.md`, `choices/CHOICES.md` (choices 4 to 9, 17 to 25 and the readings list), DESIGN.md's pass 9 (§11 and §12) and the sections it amends or leans on (§3.2, §3.9, §5.0, §6.1, §6.4, §7.5, §9), `pass-8/fold.md`, and pass 9's working files: `goo/swap.mjs`, `swap.json`, `iso.mjs`, `iso.json`; `slider/geometry.mjs` output `slider.json`, `probe.mjs`, `probe.json`, `slider-bytes.mjs`, `sketch/slider-expand.next.css`; `fold/fold.json`, `sheet-check-{chromium,webkit}.json`; `page-check.out`, `page-check-p9.out`; `pages/P9-slider.html` and `pages/P8-present.html`; the local reading site (`local/build.mjs`, `start.sh`, `www/`, `logs/`). I re-read `read/ios27-glass.md` §2.2 (the `filter: url()` rows), `pass-8/fold/sketch/goo.next.css`, `motion-canon.md` P0a, BL's slider sheet at `fe30f9882` (`--slider-thumb-bg`), BL `audit/INBOUND.md` O-408 and O-414, and `scheme-spring.css:95-120`. I grepped seven consumer checkouts' sources for `--slider-thumb-bg`.

I changed no design, page or source, and staged nothing. I added one check script beside the pass's own, `pass-9/critique-B-check.mjs`, and ran it under `guarded --exclusive webkit`, headless, one browser, a context per cell, everything closed in `finally`; its output is `pass-9/critique-B-check-webkit.json`. I also ran one arithmetic line under `guarded --light` (the gap per frame, below). Playwright WebKit is not Safari and draws no backdrop blur; neither cell needs the blur.

**No iPhone reading has returned** (`READINGS.md`: "Readings returned (none yet)"), and no site has answered. Pass 9 says so in its first line, and confirms decisions on the owner's ruling of 2026-11-23 (O-426) rather than on readings. That substitution is the owner's to make and I do not object to it. What I object to below is where a ratified decision is written as if its Safari premise had been read, and where the owner cannot reach the page that asks him.

## Objections, after the second reading

Each objection was made, then re-read against its evidence. Seven were dropped and are listed at the end.

### B9-1 (major). The owner's only reading route serves pass 8's broken P8-present and has no P9-slider

- **Claim.** §11.7: P8-present is "rebuilt (fold B8-9)"; P9-slider asks "A or B" and "B ships in 11.3.0 unless he sends A". §12.8: "Its first line asks for A or B, and B ships unless he sends A."
- **Evidence.**
  - READINGS.md: "the owner cannot open artifacts, so the pages are read from this Mac: http://MacBook-Pro-170.local:4415/ (docs/tranches/BM/study/local/, start.sh)".
  - `local/build.mjs` maps thirteen pages (`PAGES`, R1 to P8-present). P9-slider is not in it, the board (`choices/glass-choices.html`) does not link it, and READINGS.md does not list it.
  - The server (`logs/serve.pid` 39810, running) serves `www/`, built 2026-11-23 14:14. Its `menus-sheets-and-dialogs.html` is pass 8's page: its ask still reads "send a letter for sections 1, 3 and 4, and yes or no for section 2", and its rungs are `.rung { … block-size: 0; … }`. The rebuilt page has `block-size: 1px` and the new ask. The zero-height rung is pass 8's B8-1, blocking: in Playwright WebKit sheet B rests at 0 and reads "Closed" (`pass-8/critique-B-snap-webkit.json`).
- **Failure.** If the owner opens "Menus, Sheets and Dialogs" tonight he reads the page whose sheet B does not open in WebKit, and his letter for section 3 reads a construction fault that pass 9 has already cured. He cannot see P9-slider at all, so "B ships unless you send A" is a default by silence on a page he has no link to. B's form is pass 9's own reading of the order, not the owner's (the ruling says "refined … like that of our earlier chatgpt app"; §12.1 says A "meets the ruling's list as written"), so this is the one new decision of the pass that only his look checks.
- **Remedy.** Add `"P9-slider"` to `PAGES` in `local/build.mjs` (with the board linking it), rerun `start.sh`'s build so `www/` carries the rebuilt P8-present, list P9-slider in READINGS.md, and say in §11.7 where each page is served. Until then §12.8 should not say "B ships unless he sends A" as if he had been asked.

### B9-2 (minor, narrowed by my WebKit cell). Q2's closure writes as settled a Safari premise its own item 6 calls unread

- **Claim.** §11.3: "C uses only SVG filter primitives that WebKit paints on HTML content (§9.2 item 2), so it asks nothing of the engine beyond the library's 17.5 floor and needs no second path." Item 6: "What WebKit does under the filter is unread. Owed, not blocking."
- **Evidence.**
  - §9.2 item 2, which the sentence cites, says WebKit paints a `filter: url()` element "in the web process on each repaint, on the CPU by default", and that "whether iOS Safari then draws it through CoreGraphics is unread". `read/ios27-glass.md:183` lists the cost of an animated `filter: url()` goo as an open reading.
  - C moves its plates under the filter by `translate`, played by rule 2 or rule 1 (§9.2 C, §9.7), so WebKit gives the moving plate a compositing layer. Item 6 asks whether that layer is painted with its ancestor's software filter or leaves it; if it leaves, there is no neck and the seat draws solid on top.
  - My cell (`critique-B-check-webkit.json`, Playwright WebKit 26.5) put the dock and the seat 2.5 px apart under `filter: url(#goo)` with pass 7's matrix and σ 4. The neck's centre pixel is the plate's colour (51) with the plates still, with `will-change` on the seat and with a running Web Animation of the seat's `translate`. It is white (255) with no filter. (The transition cell started no animation and decides nothing.) So in Playwright WebKit's screenshot the moving plate stays inside the filter. That does not settle item 6 for Safari: the screenshot may flatten the layer tree, which Safari's screen does not.
  - The second crop UNION §4 names for pass 9 never returned.
- **What survives.** No failure was found, so the objection is to the wording only. "Asks nothing of the engine … needs no second path" is stated past what item 6 allows.
- **Remedy.** Write the closure as C by the owner's ruling, with item 6 as a check on the 12.0.0 split wave in Safari's Web Inspector (Layers), citing this cell as the engine-side indication. Keep "no second path" conditional until then.

### B9-3 (major). The goo's per-frame paint cost has dropped off the owed list, and "bounded" is an area, not a time

- **Claim.** §11.3 item 3: "The fold is painted on the page's thread while the filter is on. Bounded, and carried as the owner's order." Item 2: the filter "stays on while the dock rests folded".
- **Evidence.**
  - Pass 7 owed "The goo's paint cost per frame on a phone | P7-fuse's C with Busy page on | the owner's iPhone | §9.2, C's cost 2" (§9.11). Pass 9's §11.9 owes only the Layers read; the cost reading is gone, and every letter is now "optional".
  - The "bound" is 320 × 76 CSS px, 218,880 device px, for 12 frames on an open and the whole close. No figure says how many milliseconds that paint takes on an iPhone, in a WKWebView at 60 fps (Home Assistant's app, [IN HA bounds]) or at 30 fps in Low Power Mode. The chain is the threshold filter and then a `drop-shadow`, so each repaint runs two CPU blurs, not one.
  - The filter is now on at the folded rest. On a phone the dock rests folded while the reader scrolls (T8, the scroll fold booked for 11.3.0). Whether the filtered disc repaints on each scroll frame is item 6's second half, unread.
- **Failure.** The brief's bar is a part that "is performant in production ios safari", and the owner's order is goo that "must work in Safari". A CPU blur plus a CPU drop-shadow over 218,880 device pixels per frame, on a dock that rests filtered under every scroll, may hold or may stall; nothing in the study says which.
- **Remedy.** Restore the cost row to §11.9 as owed (P7-fuse's C with Busy page on, and a scroll with the dock folded), with Low Power Mode and Home Assistant's app named. Write item 3 as "unmeasured" rather than "bounded", and count the drop-shadow's blur in it.

### B9-4 (major). "Met by the release" drops the standing condition that the 12.0.0 dock samples nothing, and its fallback hides a missing goo in production

- **Claim.** §11.3 item 1: "It holds only on a plate with no backdrop. Met by the release. From 12.0.0 the dock samples nothing (O-260, and choice 6 A)." §11.2, §6.4 item 1: "Confirmed for 12.0.0, where chrome samples nothing."
- **Evidence.**
  - §3.9 (pass 5, fold B4-4): "The dock reads the resting rung (`shell.css:58`, master and wi8), which O-260 sets to 8 px, so the dock still blurs in 12.0.0 unless `--dock-surface-blur` moves to the zero rung. A zero radius composes `blur(0px) saturate(1)`, still a backdrop layer, so a zero rung must be written `backdrop-filter: none`. Both are conditions on §6's 12.0.0 path for the fold and the split." §6.1 repeats it. Settled by "W-R.1 (question 4) and BL's dock line", and no site or BL answer has returned.
  - Choice 6's question takes "from 12.0.0 the dock, menus, sheets and dialogs sample nothing" as its premise, and its A sets the fill's alpha. The premise rests on §3.9's two conditions, which the board does not repeat, so ratifying A does not meet them.
  - §11.3 item 1 and the sketch: a dock that keeps the old register and asks for the goo "gets a development warning and splits without the filter".
- **Failure.** If W-R.1 leaves the dock on the resting rung, the 12.0.0 dock still has a backdrop, the goo's layer would become its backdrop root, and the sketch's guard takes the no-filter branch. In a production build there is no warning: the owner's goo does not draw and nothing says so, which is a masking fallback by the owner's law.
- **Remedy.** Restore §3.9's two conditions in item 1 and in §6.4's verdict: "met if W-R.1 moves `--dock-surface-blur` to the zero rung and writes it `backdrop-filter: none`". Make the guard fail loud in every build (refuse the beside seat's goo prop on a dock with a backdrop, by type or by a thrown error in tests), not a development-only warning.

### B9-5 (major). §12's "one thread" reason for B is derived, misdescribes B's own stall, and B's cost on the page's thread is neither measured nor owed

- **Claim.** §12.2 item 3: "B puts all its geometry on the page's thread, on one clock and one curve: under a stall the picture is late, but its rings stay nested." P9-slider's header: "Busy page stalls the page's thread: B's whole grow stalls with it". §11.9 owes a Busy page reading for A only.
- **Evidence.**
  - A's failure, "at worst g/2 (4 px) outside the shell", is "derived from where WebKit runs each property, not read" (`slider.json`, `A_twoThreads_worst`). `probe.json` is "headless Chromium, the page's model on the page's thread".
  - B's knob and shell each carry an `opacity` leg (`slider-expand.next.css`: `opacity var(--slider-grow-duration) …`). WebKit runs `opacity` on the compositor (UNION discrepancy 2). The sketch says so: "The two fades may run ahead on the compositor". So under a stall B's thumbless knob reaches full opacity at its rest size, the band's full height in the page's colour over the fill's end, with no ring of fill round it, while the band waits. That is not "late"; it is a different picture, and the page's header calls it a whole stall.
  - B moves four legs onto the page's thread as paint (the track's and the fill's `box-shadow` spread, the knob's spread, the lane's `clip-path`); A has one (the shell's clip). A spread animation repaints its box every frame. Its cost in a WKWebView at 60 fps and at 30 fps is unread. Home Assistant names "a dimmer drag" as "the likeliest place to feel 60 Hz" and measured Home at 2.2 to 2.9 s against a 1.6 s budget ([IN HA 3]); from 11.3.0 every one of its rails starts that drag with B's grow, by default.
- **Failure.** The decision's only Safari reason rests on a derivation for A and none for B, and the page asks the owner to judge Busy page on a stall it describes wrongly for B.
- **Remedy.** Owe the same Busy page reading for B as for A (§11.9), describe B's stall as it will draw (the fades ahead of the spreads), state B as four main-thread paint legs per press against A's one, and ask Home Assistant the cost question beside the "turn it off?" question in §11.8.

### B9-6 (major). P9-slider's A and B are not drawn on the same thumbless terms, so the owner's one look compares unequal things

- **Claim.** §12.2 item 2: "Sites set the knob to the fill's colour (`--slider-thumb-bg`). Under A that knob grows held into an ink disc standing g/2 past the band at the fill's end, which P9-slider's A shows. Under B the knob rises in the page's colour out of the fill's cap". §12.4: "thumbless at rest is the knob at opacity 0, not the knob painted in the fill's colour. That is a requirement on BL's O-408 build."
- **Evidence.**
  - P9-slider draws A's thumbless knob with `background: var(--fg)` (the fill's colour, "O-408 as sites set it") and B's at `opacity: 0` in the page's colour, which is BM's own requirement on BL's build.
  - No consumer sets the knob to its fill. Of seven checkouts, only value.js sets `--slider-thumb-bg`, to the picked colour on its colour sliders (`demo/picker/controls/ComponentSliders/ComponentSliders.vue:243`); daraksha, fourier, keyframes, atlas (sci-report), gaggle and Home Assistant set nothing in their sources. O-414 says only that sites "may". BL's thumbless build is unbuilt (G1, 11.3.0, `audit/triage-1119/PLACED.md:28`).
  - The page's ask tells a phone reader to "Tab to it, and rest a mouse on it".
- **Failure.** The owner sees A with an ink disc proud of the band, a configuration no site uses and which BM's own requirement would also remove from A, beside B under that requirement. His "A or B" then reads the thumbless mechanism, not the construction. Half the ask cannot be done on the iPhone the page is built for.
- **Remedy.** Draw both letters' thumbless default under the same rule (opacity 0 at rest, the page's colour), or under the same site setting, and say which. Correct "Sites set the knob to the fill's colour" to what the census shows. Split the ask: press and drag on the phone; Tab and the mouse dwell on a Mac.

### B9-7 (major). Q7 disappears, and the readings that every "on the compositor" claim waits on are relabelled optional letters

- **Claim.** §11.9: "Every page's letter, now optional: a reading amends". §11.2, §4.3: "R2 and P2-scroll, if read, amend which curves stutter; they no longer hold it."
- **Evidence.**
  - UNION Q7 (frame rate and acceleration in production Safari) is "settled by the owner's iPhone (R2, R6)". Pass 9 neither closes nor carries it: Q7 and R6 appear nowhere in §11 or §12, and R2 appears once, as a letter that "no longer holds" Q6.
  - The ruling ratifies decisions; it reads no fact. Choice 4 itself says "Nearly every 'runs on the GPU' claim in choices 10 to 25 assumes B", and the design still states those claims conditionally: §9.4 "on the compositor in every release if R2's lane C glides, an inference"; §9.7's "compositor if R2's lane C glides (rule 2)"; §7.5's keyboard leg "must be a compositor leg (law 7), which the player's keyframes are if R2's lane C glides".
  - §6.4 item 1, confirmed in §11.2, still gates the window in 11.x on P4-bud's F with Frost on. That is not optional either.
  - The ruling's apotheosis asks that each facility be "Matched, with its reading" or "Surpassed, saying how, with its reading".
- **Failure.** With R2, R6 and P4-bud's frost read filed as optional letters, pass 10 can mark a facility "matched" with no reading behind it, and the conditional compositor claims harden into fact by omission.
- **Remedy.** Carry Q7 as owed to the owner's iPhone (R2, R6), and list the claims that stay inference until it returns. Keep P4-bud's F with Frost on as the gate it is for 11.x. Separate in §11.9 the letters the ruling made optional from the fact readings it did not.

### B9-8 (minor). On a fold the goo draws no bridge frame at all, at 60 or 30 Hz; "the device's one or two frames" holds only for an open

- **Claim.** §11.3 item 5: "The neck lives 39 ms on an open and 13 ms on a fold on the dock row, which is the device's one or two frames."
- **Evidence.** §9.2 item 5 gives the fold's 12.7 ms as 0.76 frames at 60 Hz and 0.38 at 30. Sampled at the frames themselves (the pass's own springs and geometry, `gap = 60p − 52`, run under `guarded --light`), the dock row's close goes 8 → 5.02 → −1.73 px at 60 Hz and 8 → −1.73 px at 30 Hz. No drawn frame falls between 0 and 5 px, where the bridge exists. The open draws it in 3 frames at 60 Hz and 1 at 30.
- **Failure.** On the collapse, which the owner's order names ("fusing back on collapse"), the goo shows only the plates overlapping with filleted corners, never a bridge, on every row at 30 fps and on the dock row at 60.
- **Remedy.** State the per-frame figures and put the fold's case on pass 10's list beside the thin waist.

### B9-9 (minor). §12.6 counts B's press as six animations; its own list has seven

- **Claim.** "6 on a thumbless slider: the shell's clip and opacity, the track's spread, the lane's clip, the fill's spread, the knob's spread and opacity."
- **Evidence.** The list names seven legs: two on the shell, one each on the track, lane and fill, two on the knob. A's row counts legs the same way (3), and adds "5 with the readout".
- **Remedy.** Seven, and nine with the readout's `scale` and `opacity`. The choice 19 B count (3) is unchanged.

### B9-10 (minor). O-428's toggle redesign, which the ruling hands to the design passes with choice 24, is not in pass 9

- **Evidence.** `RULING-2026-11-23.md`, addendum (O-428, committed `0da8c5450`, 23:10): "The design passes take this with the theme seat of choice 24, and it ships in 11.2.0." Pass 9 closes choice 24 in §11.3 and was last written after it; "O-428", the coloured sun and the crescent appear nowhere in DESIGN.md.
- **Failure.** The theme seat's own glyph motion (rays drawing in, the night disc sliding) runs on the same seat the goo splits, outside the filter layer, and adds legs to that seat's press; no pass counts them or puts them on pass 10's list.
- **Remedy.** Record O-428 under §11.3 as the seat's glyph, name its legs against law 4, and hand its design to pass 10 or to BL's 11.2.0 row explicitly.

## The WebKit cells (`pass-9/critique-B-check-webkit.json`)

Run under `guarded --exclusive webkit`, Playwright WebKit 26.5, 390 × 844 at DPR 1. It waited about 70 minutes in the queue behind other sessions' WebKit runs, with no refusal.

| Cell | What it reads | Result |
|---|---|---|
| `insetParse` | Does WebKit take B's held lane clip, a negative `inset()` written through `calc()`? | Yes: `CSS.supports` is true, and it computes to `inset(-4px round 14px)` |
| `slider: B md, no knob` | P9-slider's model through Hold open and back, per rAF, 54 frames | Held 36 / 28 / 24 (shell, band, knob). The track's spread, the fill's spread and the lane's clip agree to 0 px on every frame, the shell never falls inside the track, and the knob never leaves the fill. Same as Chromium's `probe.json` |
| `slider: B sm, knob` | the same, 53 frames | Held 28 / 20 / 16, nested on every frame |
| `slider: A md, no knob` | the same, 63 frames | Held 36 / 20 / 28; the knob stands 4 px outside the band, as designed |
| `goo: nofilter` | the neck's centre, the dock 2.5 px from the seat, no filter | white (255): no bridge, as expected |
| `goo: static`, `willchange`, `waapi` | the same under `filter: url(#goo)`, the seat still, under `will-change`, and under a running Web Animation of `translate` | the plate's colour (51) in all three: the neck forms. 14 px above the centre the pixel stays white |
| `goo: transition` | the same under a CSS transition | no animation started (`running: []`), so it decides nothing |

These cells read style and one screenshot pixel in WebCore's engine. They are not Safari and say nothing of cost or of which thread draws what.

## Dropped on the second reading

- **Home Assistant's entry and §11.5's +458 B for a menus-only entry.** Home Assistant mounts sheets in its tiles (`light_sheet.ts`, `cover_sheet.ts` and others), so its entry likely takes the −221 B row; pass 8's fold already asks which overlays its entry mounts, and closing per entry is pass 10's.
- **The slider's +199 B against Home Assistant's 0.2 kB.** Its bound is on the entry script; the figure is stylesheet, and §3.2 assigns per-entry closure to pass 10 from built bundles.
- **The shadow's change at the goo's swap.** A drop-shadow of the union against two plate shadows differs only by the product of the two shadows' alphas in the gap, about 0.026 at the shadow's 0.16; below a visible step.
- **The sheet check's commit at 0.699.** `heldPastEdge_quiet` turns snap off and never back on, so the scroller cannot land on the rung; the cell shows that nothing commits under a held finger, which is all §10.5 claims.
- **B's knob at 0.75 of its held size, under P0a's 0.8.** The pass states it and gives its reason; amounts are Critic A's.
- **B's fades breaking the nesting.** They move no edge, so the rings stay nested; what survives is the stall's picture, folded into B9-5.
- **`scheme-spring.css:103, :115`.** The lines are present's settle (0.2 s) and its exit clamp (0.12 s), which is what §12.5 cites them for; the curve is cited on the page to pass 2's `curves.json`.

## What holds

- B's geometry is not a Chromium artefact. In Playwright WebKit the negative lane clip parses, and the three band legs agree to 0 px on every frame (the WebKit cells above).
- In Playwright WebKit the goo's neck forms with the seat under a running Web Animation of `translate`, so the cheapest way for item 6 to fail does not happen in WebCore's screenshot path.
- The first line says no reading has returned, and §11.1 says that decisions are confirmed against ratified defaults, not readings. The ruling is quoted exactly.
- §6.4 item 1's verdict keeps the 11.x window behind a reading of its frost, for the reason the owner's law gives (a stopped blur hidden would be a masking fallback).
- §11.3 item 2's swap timing reproduces from `swap.mjs` (frame, gap and step per row at 60 and 30 Hz), and `iso.mjs`'s disc erosion matches σ²/2R to 0.003 px; the rejected outset is argued correctly (a straight side sits on the 0.5 level).
- The sheet and presence fold reads the same in both engines (`fold/sheet-check-{chromium,webkit}.json`): sheet B opens at 0.40 in WebKit, a spinner no longer holds the presence (126 to 134 ms), and the 1 px rung cures B8-1 on the page as rebuilt.
- §10.3's 30 fps exit is stated as a cost (0.315 of the fade in the steepest frame) with the Low Power Mode reading owed.
- `page-check.out` and `page-check-p9.out` show the eight cells and the four rechecked cells clean in headless Chromium, as §11.7 says.
