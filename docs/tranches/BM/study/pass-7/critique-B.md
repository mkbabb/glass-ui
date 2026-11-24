# BM study, pass 7: Critic B (production iOS Safari and the evidence)

Seat: Critic B, claude-opus-5-5 (asserted from its own system identity), 2026-11-22. I changed no design, page or source, and I staged nothing. I wrote this file and one check script, `pass-7/critique-B-check.mjs`, which writes nothing unless its browser part runs (it has not).

**First line, as the plan asks of every pass.** No iPhone reading has returned (`READINGS.md`: nothing published, nothing returned), R4 included, so every decision of pass 7 is provisional until pass 9. P7-fuse is unpublished and has not been opened in a browser.

**What I read.**
- The study: `CHARTER.md`; `UNION.md` whole (§2, §3's Q2 and Q9, §4's pass-7 line; rows F1 to F13, M1 to M9, I10 to I22); `union-fold.md`; `INBOUND.md`; `READINGS.md`.
- `DESIGN.md`: pass 7's section whole (§9.1 to §9.11), and the sections it leans on or amends: §1 (laws 1, 5, 7, 8), §4.1 to §4.3, §5.0, §6.1 to §6.9, §8.6, and the amendment lines in §2.1 and §3.
- Pass 7's files: `fuse/fuse.mjs` and `fuse.json`; the three sketches in `fuse/sketch/`; `fold/hosts.mjs` and `hosts.json`; `check/static-check.json`, `check/dom-run.mjs`, `check/page-check.mjs`, `check/crop.mjs`; `retry.log`; `pages/P7-fuse.html` whole; `pages/R4.html` (its C lane and ask); `pass-1/fold.md` (B-9); `pass-6/critique-B.md` and `pass-6/fold.md` (for what pass 7 folded).
- Behind the claims:
  - BL: `waves/W-I.8.md:85-132` (R-3, R-4, R-6) and `:340-352` (OQ-5); `design/dock/wi8/RULINGS-2.md:80-95` (RU-14); `waves/W-R.1.md:78-86`.
  - BI: `design/ios27-reference/DOCK-LADDER.md:105-145`, `:241`, `:262`; `addenda/Q021-FISSION-EVIDENCE.md:1-140`.
  - BJ: `addenda/2026-07-24-refinement/IOS27-ARCHIVE.md:25-31`.
  - `read/ios27-glass.md:96-133`, `:183`; `read/rida-ui.md:151-153`.
  - glass-ui: `src/components/dock/styles/index.css:66-84` on master, `bl/dock/wi8` and `release/11.1.1`; wi8 `src/components/dock/index.ts:60-72`; `cta-seat.css:55-60`; `useDockCtaReceive.ts:10-13`, `:55-59`; `useLiquidReveal.ts:70-74`; `docs/precepts/motion-canon.md:130-146`.
  - The sites, by `git show` and `git grep` only: daraksha `b11-occasion:src/shell/SiteDock.vue`; Home Assistant `0f6deae4` (`frontend/src/tiles/GlassTabs.ts:360-370`, `presets.ts:268-274`, `climate.ts:176-182`); gaggle `site-redesign:dashboard/scripts/check/vendor.mjs:20-82`; every site ref in `hosts.mjs` for `useDockCtaReceive` and `useLiquidReveal`.

**What I ran.**
- `pass-7/critique-B-check.mjs model` under `guarded --light`: the neck's lifetime on P7-fuse's own springs and geometry, the first hold in each lane, `--seat-from` as written, and the filter regions. It prints and writes nothing.
- `pass-7/check/dom-run.mjs` under `guarded --light`: all thirteen pages run in happy-dom with no script error. It says nothing about layout, which is where B7-1 lies.
- Two light `node -e` measures under `guarded --light`: the three sketches gzipped with comments stripped (354, 190 and 265 B, as §9.8 states), daraksha's removed blocks (871, 914 and 266 B by my cruder strip, against §9.3's 864, 898 and 262), `cta-seat.css` (288 B stripped, 248 minified, against "≤ 278"), and the spring times for the trade and the overlap.

**What I tried to run.** `pass-7/critique-B-check.mjs chromium` (P7-fuse's section 1 lanes in headless Chromium, the glass's columns along the dock's centre line, folded and held): refused on the kernel zone (Retry, below). B7-1 rests on the page's own CSS and arithmetic, not on that run.

**Verdict.** Pass 7 keeps its first line honest, its sketch bytes and spring clocks reproduce, and it names what changes since RU-14 (the material) as UNION Q2 asked. Its reading page cannot carry the decision it is built for. P7-fuse draws C, the goo, with its glass at the wrong end of the dock (B7-1). The page also plays C on a different delivery and over a filter four times the modelled size, so the C condition the provisional Q2 answer sets cannot be met (B7-2). The neck lives one or two frames, which §9 never states and the held screenshot hides, and the repo's own measured device record, which bounds both the neck's life and its width, is not cited (B7-3). The proposed 12.0.0 default, A, brings back the overlap that pass 1's fold B-9 took out of R4's C (B7-4). The owner's screenshots cannot be the R-6 crop §9.2 calls them (B7-5). §9 says both that a split ships in 11.x and that it lands in 12.0.0 (B7-6). Seven minor points follow.

## Objections

### B7-1 (blocking). P7-fuse draws C with its glass anchored at the dock's right end, so section 1's C cannot be read

**Claim.** §9.2 and §9.9: section 1 shows "C goo (no frost)" on the same geometry as A, B and D, and "Hold where they part" holds "all four letters 2.5 px apart". The provisional Q2 answer offers C on the condition "that P7-fuse's C reads as one piece on his iPhone".

**Evidence.**
- The window's `translate` is declared on `.win` only: `.win { … translate: var(--win-x, 0px) 0; }` (`P7-fuse.html:100`). C's window is `.goo .gwin` (`:111`), which has no `translate`, so the `--win-x` that `draw` sets on it (`:285`) moves nothing. Its glass, `.goo .gwin::before`, still reads `--fill-x` (`:112`). In A, B and D the window slides left and the glass slides right, so the glass stays at 0 and its right end is the moving end (0 to xe). In C the window stays at 0 to 236 and the glass slides right, so the visible glass is (236 − xe) to 236: its right end is fixed and its left end moves.
- The seat still travels from the left, `xs = (OPEN + GAP) * p` (`:233`), as in the other lanes.
- What that draws (`critique-B-check.mjs model`, `hold`):
  - Folded, at load (section 1 starts at p = 0): the seat is a solid circle at 0 to 52 px, under the folded glyph, and C's glass is a separate disc at 184 to 236 px. A, B and D show one disc at 0 to 52.
  - At the first hold (p = 0.908): the glass spans 16.9 to 236 px and the seat 221.6 to 273.6 px. The seat overlaps the glass by 14.4 px, so no neck is drawn, while the button reads "Held 2.5 px apart".
  - C's neck exists only for p from 0.967 to 0.988: 27 ms on an open and 5 ms on a fold on the dock row.
- `check/crop.mjs` takes C's shape from `.gwin`'s box (`:41`), the full 236 px window, so its C cells would read bare ground as glass. `dom-run.mjs` and the static check pass the page because neither lays it out. The page check that would have shown it is owed.

The C lane is the owner's own order ("goo (metaball pull-apart, fusing back on collapse)", [IN value.js 2]) and the only bridge §9.2 offers for 12.0.0. As built, the page would show him two separate blobs and ask him to judge them.

**Remedy.** Give `.goo .gwin` the window's `translate` (`translate: var(--win-x, 0px) 0`), take crop.mjs's C shape from the visible glass (the window's box intersected with its translated `::before`), and run `page-check.mjs` and this check's Chromium part before P7-fuse is published. Until then P7-fuse stays off the owner's list.

### B7-2 (major). C's cost, its Busy-page condition and its delivery cannot be read on P7-fuse, and what WebKit does with an animated layer under a painted filter is unread

**Claim.** §9.2 C, cost 2: "WebKit does not composite an element with `filter: url()` … so the window's translates under it are painted each frame", over "a 320 × 76 px region, or 218,880 device px at DPR 3". The provisional Q2 answer offers C on three conditions, the third "that it keeps gliding with Busy page on". §9.11 owes "The goo's paint cost per frame on a phone" to "P7-fuse's C with Busy page on".

**Evidence.**
- **The page plays C on a different delivery.** Its header: "The filter repaints each frame, so its plates are moved by per-frame writes" (`P7-fuse.html:12-13`); `played` is true for `under`, `cover` and `quick` only (`:268`), so C is drawn by a `requestAnimationFrame` loop. The proposal moves the plates by rule 2's Web Animations (`goo.next.css`; §9.2 C). Busy page blocks the page's thread for 45 ms of every 60 (`:212`), so every `requestAnimationFrame` lane stalls whatever the filter costs. On this page C cannot keep gliding with Busy page on. Under the proposal it cannot either, by §9.2's own account: "It moves the fold onto the page's thread while it is on." Whichever delivery is used, the third condition fails, and the reading cannot separate the filter's cost from the page's delivery.
- **The page's filter is four times the modelled one.** The page's `.goo` layer is the whole stage (`inset: 0`, `:110`), so the filter region (x −10 % to 110 %, y −60 % to 160 %, `:133`) is 396 × 264 CSS px at 390 wide: 940,896 device px at DPR 3, against `fuse.json`'s 218,880. The sketch's own region on a 236 × 52 root is 283.2 × 114.4, or 291,583 (`critique-B-check.mjs model`, `regions`).
- **The mechanism is unread.** `ios27-glass.md` says the filtered element is not composited and is painted on each repaint (`:123-124`). It does not say what happens to a descendant whose `translate` runs as a compositor animation: it may be painted with its ancestor each frame, it may leave the filter as its own layer, or its animation may move back to the page's thread. The read lists the cost of an animated goo chain as open (`:183`). "So the window's translates under it are painted each frame" is an inference. The page sidesteps it, and so does the toggle: P7-fuse keeps the filter on throughout, so the `data-fusing` switch is never shown. At that switch the layer is re-composited mid-travel, the ends step by up to 0.5 px, and the shadow changes from each plate's `box-shadow` to the union's `drop-shadow`.
- **The site that asked for a fuse is the busy one.** Home Assistant measured its Home settling in 2.2 to 2.9 s at 4x CPU against a 1.6 s budget, and its iPhone app is a WKWebView ([IN HA 3, 5]).

**Remedy.** Build C on P7-fuse as proposed: the plates on the same played legs as A, `data-fusing` set and cleared at reach, and the layer sized as the sketch's. Then C with Busy page off is the cost reading, and C against A with Busy page on shows what the fusing frames cost. Restate the third condition as one C can meet (for example, no stall visible outside the fusing frames), or say that C is offered knowing it stalls on a busy page. Name the composited-descendant question as a reading. A Playwright WebKit run under `--exclusive webkit` can show whether the plates leave the filter, which is about layout and paint, not the backdrop. The frame cost stays the phone's.

### B7-3 (major). The neck lives one or two frames, §9 never says so, the held frame hides it, and the measured device record that bounds it is not cited

**Claim.** §9.2: C "is the only bridge that draws F1's contact continuously", and "Its neck is the device record's shape: a Live Activity's two lobes join through 'a meniscus waist' ([ARC]:29)". The owner is asked for "the letter that looks most like one piece of glass parting and joining, with the two screenshots" of the first hold.

**Evidence.**
- **How long the neck lives.** On P7-fuse's springs and geometry (gap = 60p − 52; the goo's pinch at 5 px; `critique-B-check.mjs model`, `neck`):
  - Dock row: 39.2 ms on an open (2.35 frames at 60 Hz, 1.18 at 30) and 12.7 ms on a fold (0.76 and 0.38 frames).
  - Press row: 19.2 and 8.2 ms.
  - So on a fold at 60 Hz, the "fusing back on collapse" the owner ordered is drawn in at most one frame, and in Low Power Mode (30 fps, I20) usually in none. Home Assistant's WKWebView is 60 Hz at best (I21). Slow ×4 stretches an open's neck to 157 ms.
- **The record the pass did not cite.** BI's frame-by-frame reading of iOS 27 screen recordings, `DOCK-LADDER.md` §3, tagged [H]:
  - "The 'neck' lifetime is **1–2 frames (17–33ms)**", and the waist is "a ~10–15% inset per edge — never a thin thread" (`:113-124`).
  - "A goo filter that shows a fused waist for ~2 frames at 60fps and then clean capsules is FAITHFUL" (`:135-139`).
  - §8 bounds any rebuild: "The neck spec (§3) bounds the goo filter: waist visible ≤2 frames, no persistent strands" (`:262`; quoted in `Q021-FISSION-EVIDENCE.md`).
  - [ARC]:29, which §9.2 cites, gives no figure: "Live Activity two-lobe goo with a meniscus waist … nothing new to correct".
- **The width.** At σ 4 the goo's waist is 23 px at contact and 15.75 px at the 2.5 px hold (`fuse.json`), insets of 28 % and 35 % per edge of a 52 px plate. The measured device waist is 10 to 15 %. rida.dev's fit is 37.5 px at contact, 14 %. On the measured record, the goo's neck is thinner than the device's, while its lifetime fits. "The device record's shape" holds only for the unmeasured archive line.
- **The held frame.** At speed the hold shows a frame that exists for 0 to 2 frames. A letter chosen from the screenshots judges the neck's shape at a dwell the owner never sees.

**Remedy.** Cite DOCK-LADDER §3 and §8 in §9.2 and state the neck's lifetime per row and per frame rate. Ask for the section 1 letter at speed, and use the held screenshots for shape only. Put C's price to the owner as what it buys: a neck of about two frames on an open and at most one on a fold. Compare the goo's waist with the measured 10 to 15 % inset rather than the archive's word.

### B7-4 (major). A, the proposed 12.0.0 default, brings back the overlap that pass 1's fold B-9 took out of R4's C, calls itself R4's C, and understates how long the overlap lasts

**Claim.** §9.2 A ("F3, Apple's recipe; R4's C"): the seat's fill "rises as it comes clear", and its cost is "a darker lens … for the first 52 px of the seat's travel". §9.2's provisional answer makes A the 12.0.0 default.

**Evidence.**
- **The fold that removed it.** Pass 1's fold B-9: "R4's C overlapped two translucent plates for t < 0.7 with both veils on, the doubled ink F3 names; a rejection could not separate Apple's recipe from the overlap". The cure: "the seat carries no frost or tint while it is under the bar, and its glass rises by a tween once it has cleared the bar's end" (`pass-1/fold.md:48`; built at `R4.html:150-155`).
- **What P7-fuse's A does instead.** Its seat's fill is its share outside the plate (`prot`, `P7-fuse.html:234`, played on its `::before`), so two translucent plates overlap at every p below 0.867. A rejection of A on P7-fuse again cannot separate Apple's recipe from the overlap.
- **How long the overlap lasts.** It lasts while p < 0.867, which is 211.5 of the seat's 244 px of travel, not 52. In time, it is the first 145.8 ms of an open on the dock row, whose travel is 90 % done at 159 ms. On a fold it runs from 29.5 ms to the rest, with the fill falling as the seat goes under (my spring run; `fuse.json`, `clocks`). The device shows "the arriving left-circle … as a darker disc INSIDE the bar for ~2–3 frames" on a merge (`DOCK-LADDER.md:130-131`), and A shows it for about nine frames on an open.
- **The record behind it.** RU-14's second failed neck was overlap, not backdrop: "Three leaves met at junctions that showed (88.6 against 4)" (`W-I.8.md:126`). §9.1 summarises RU-14 as "readings of a backdrop under a filter and under a clip" and leaves that one out. Overlapping translucent fills keep it on 12.0.0's frostless material.
- **With Frost on**, A's two plates are both frosted where they overlap. That is a backdrop sampling a sibling's backdrop, which law 1's sibling clause counts (§1 row 1).

**Remedy.** Either give A B-9's rule (no fill while any part of the seat is under the plate, the glass rising once clear), or show both forms on P7-fuse as A and A′ so that a reading separates the recipe from the overlap. Correct "the first 52 px" to the times above. Restore the leaves' junction to §9.1's summary of RU-14. Until A and R4's C match, stop calling A R4's C.

### B7-5 (major). The owner's screenshots cannot be R-6's crop, and crop.mjs's light cells are blind on 12.0.0's material

**Claim.** §9.2: "The owner's screenshots of the first hold in Light and Dark are the second crop, from Safari." §9.10 asks BL whether R-6 "would read its crop on 12.0.0's material, with P7-fuse's D held as that crop". §9.11 owes crop.mjs "on a flat ground".

**Evidence.**
- **R-6's bar is a pixel bar on a flat ground.** "If every glass pixel on a flat ground is within 2 of 255 of the plate's centre and no junction column differs from its neighbours by more than 4" (`W-I.8.md:128`). Every P7-fuse stage is 45° stripes with a band (`P7-fuse.html:91-95`), so no plate sits on a flat ground. A plate at α 0.897 shows those stripes at about a tenth of their difference, far over 2. The screenshots can be looked at; they cannot be read against the bar.
- **crop.mjs uses a flat ground (`:17`), but in light mode it cannot fail.** By its own luminance weights, the light card `hsl(30 85% 96%)` is 246.0 and the flat ground `hsl(40 40% 96%)` is 246.3. A region where glass is missing, or doubled, reads within 0.3 of the plate's centre and passes. Dark mode separates them (about 41 against 20).
- **On 12.0.0's material the bar tests only the clip.** A flat fill cut by a path over a flat ground is uniform away from the edge band the script excludes. What "reopens" R-6 is O-260, not a reading. That is a fair question to put to BL, but §9.2 presents the screenshot as the evidence.
- crop.mjs's C shape is wrong (B7-1).

**Remedy.** Give P7-fuse a flat band under the held dock, or a separate flat crop stage, for the owner's screenshot. Pick a flat ground whose luminance differs from the card's in both modes. Say in §9.2 that on frostless material R-6's bar reads only the clip's edges and the engine's drawing, and send BL the question as that. Fix crop.mjs's C shape before it runs.

### B7-6 (major). §9 says a frosted split ships in 11.x, and also that the split lands in 12.0.0, so R4 either decides nothing or a law-1 breach ships uncounted

**Claim and evidence.**
- §9.2's provisional answer: "11.x: no bridge. The split is F3's recipe alone (A)." §9.6: "In 11.x the rule bounds A's two blurred plates overlapping during a split." §9.1 and §9.11: R4 stays owed "as the reading for 11.x's frosted dock".
- §9.8: "The split, A … 12.0.0, with R-6's `beside` slot." BL's R-6: "The `beside` slot, the second plate and the neck are moved to 12.0.0". In 11.2.0 the theme seat is "a round dock of its own … which neither parts nor fuses" (`W-I.8.md:125-127`).

If no split ships before 12.0.0, R4 decides nothing and §9.6's 11.x clause bounds nothing, but the owner is still asked to read R4. If a frosted split ships in 11.3.0 (the charter's slot for new parts), A puts two frosted plates over each other in one container, which law 1 counts (B7-4). That needs counting and R4's C's no-overlap rule.

**Remedy.** State the release once. If it is 12.0.0, mark R4 moot in §9.11 and §3.6 and drop the 11.x lines. If it is 11.3.0, count law 1 for A and build it to R4's C.

### B7-7 (minor). `--seat-from` as written puts the folded seat beside the disc, not inside it

**Evidence.** §9.3 and `seat-under.next.css`: "the open width less the disc's, plus the gap and the seat's width less the disc's". That is 184 + 8 + 0 = 192 px. The seat opens at `calc(100% + gap)`, 244 px, so folded it sits at 52 to 104 px against a disc at 0 to 52: tangent and outside. Law 8 ("its box lies inside the disc") fails as written. The page and `fuse.mjs` use 244 (`xs = (OPEN + GAP) * p`; gap = 60p − 52), so the model and the page are right and the text is wrong (`critique-B-check.mjs model`, `seatFromForm`).

**Remedy.** "The open width plus the gap, plus the seat's width less the disc's" (244 for a seat as wide as the disc), in §9.3 and the sketch.

### B7-8 (minor). The goo sketch's filter region cuts off the seat, and the seat's glyph needs a node the count does not carry

**Evidence.**
- `goo.next.css` makes the layer the dock root's box (`.dock-plates { position: absolute; inset: 0 }`) with the region `x="-10%" width="120%"` in the default bounding-box units. `seat-under.next.css` places the seat outside that box (`inset-inline-start: calc(100% + gap)`). On a 236 px root the region ends at 259.6 px (`critique-B-check.mjs model`), so a seat at 236 to 296 px in reach is cut. That holds if WebKit takes the border box as the reference box, which the Filter Effects spec says and no reading has checked. The page avoids it only because its layer is the whole stage (B7-2).
- A glyph inside the filtered layer would be blurred and thresholded away, so the page draws the seat's glyph outside `.goo` (`.moon`, `:126`). In the library that splits the seat into a plate inside the layer and a glyph outside it, which §9.2's "one wrapper" and §9.8's ≤ 190 B do not count.

**Remedy.** Size the region in user space or make the layer span both plates; count the seat's split; re-price C.

### B7-9 (minor). The fold sketch leaves seats two to four drawn and hit-testable outside the disc at the folded rest

**Evidence.** `fold-cover.next.css` clips the controls only under `[data-morphing]`, keeps `.dock-controls` translated by −`--from` and the row by +`--from` after the change, and fades only the first seat. At the folded rest, nothing clips (as §9.4 says) and nothing hides the other seats, so they stand at their open places beside the disc with no glass under them. P7-fuse's section 2 clips the seats' window at all times (`.faces { overflow: clip }`, `:122`), so the page never draws the proposal's rest. At that rest the controls' element also sits 184 px off its place, a box §9.10's atlas question does not ask about.

**Remedy.** One rest rule that hides the seats the disc does not show, set and cleared while the clip is on, so it never shows as a cut. Draw that rest on P7-fuse, and add the controls' box to atlas's question.

### B7-10 (minor). Compositor claims and "answered" are stated as settled

**Evidence.**
- §9.4: "every leg is a Web Animation of `translate` or `opacity`, on the compositor in every release". §9.2 A: "All three run on the compositor when played by rule 2". §9.7's thread column. §4.3 gives rule 2's compositor column as "R2, lane C", an inference, and pass 6's fold accepted the same objection (B6-12).
- §6.3 and §6.9 gain "*Answered in pass 7*" lines for decisions §9 calls provisional.

**Remedy.** "On the compositor if R2's lane C glides (inference)", and "proposed in pass 7" for "answered".

### B7-11 (minor). The folded seat takes no pointer but stays in focus and VoiceOver order

**Evidence.** `seat-under.next.css` gives the folded seat `pointer-events: none` and sets its plate and glyph to opacity 0. Nothing makes it inert. A keyboard or VoiceOver user reaches an invisible control under the disc. atlas keeps VoiceOver order ([IN atlas 5]), and Home Assistant already fights reka's stale `aria-hidden` (LF-38, [IN HA 5]).

**Remedy.** `inert` on the folded seat, set once per change, and counted. Pass 10's access run reads it.

### B7-12 (minor). The census misses Home Assistant's multi-line render mounts again

**Evidence.** `hosts.mjs` matches `h(Name` on one line (`:37`). Home Assistant writes `h(` and the component on the next line: `ToggleGroup` at `presets.ts:270-271` and `climate.ts:178-179`, and `GlassDock` at `GlassTabs.ts:366-367`. `hosts.json` lists eight Home Assistant files importing ToggleGroup, each with `type: "single"`, but one mount, and no GlassDock mount. So "Home Assistant mounts … a single ToggleGroup" (§9 opening, §2.1's ToggleGroup row) is wrong, and the census lists Home Assistant's GlassDock import with no mount, though §9.3 and §9.10 rightly treat its dock as glass-ui's. No decision changes, since ToggleGroup keeps its own fill and §9.3 takes the dock from INBOUND, but pass 10's per-entry ledger reads this census.

**Remedy.** Let the mount pattern span the whitespace after `h(`, re-run, and restate the two lines.

### B7-13 (minor). P7-fuse's ask is several sessions, and its Frost switch has no ask

**Evidence.** Section 1 asks for several opens, a hold, two screenshots with the phone's appearance switched between them (the page has no Light/Dark control; it follows `prefers-color-scheme`), and a letter. Section 2 asks for "the letter … with Busy page off and then on", which reads as one letter or two. The Frost switch is not mentioned in the ask, so a letter picked with Frost on compares C, which never frosts, against frosted A, B and D.

**Remedy.** A Light/Dark switch on the page. One letter per section, read at default with Frost off and Busy page off. Busy page as a second letter. Frost either asked for or removed.

## Dropped on the second reading

- **`cta-seat.css` "≤ 278 B".** My strip gives 288 B and a minified strip 248. My strip also overstates daraksha's three blocks by 7 to 16 B against §9.3's figures, so the gap is the method, not a copied number.
- **rida's smooth-min "assumed" quadratic variant.** `rida-ui.md:151` gives the mix form, which equals the quadratic form where the two distances are equal. The pinch at 5 px holds.
- **"No third leaf is built" while D is RU-14's leaf on the page.** UNION Q2 asks pass 7 to name what changes before a third leaf returns, and §9.1 names the material.
- **§9.5 cites `hosts.json` for "nothing mounts either composable"**, which that census does not count. `git grep` at all eight refs finds neither `useDockCtaReceive` nor `useLiquidReveal`, so the claim holds; only the citation is loose.
- **The press row passing the fold's rest by 2.8 px** under P2 is a question of law, for Critic A.
- **gaggle's vendor gate.** Its barred list is domain words (`vendor.mjs:23`, `:49-81`), and no sketch adds GPU code to a chunk gaggle may fetch.

## What the pass does not touch, checked

- **The clocks.** The fold's half point at 75 ms on the dock row and the 47 ms trade on the press row reproduce from the closed form. `fuse.json`'s 159, 137 and 95 ms to 90 % agree with the page's own spring.
- **The sketch bytes.** 354, 190 and 265 B reproduce exactly (gzip -9, comments stripped).
- **The call to action.** `cta-seat.css` is imported at `dock/styles/index.css:80` on master, `bl/dock/wi8` and `release/11.1.1`. wi8 stops re-exporting `useDockCtaReceive` (`index.ts:66-68`). The ghost at 0.35 (`cta-seat.css:58`), the 0.2 to 1.4 band (`useDockCtaReceive.ts:57-58`) and the 4 px blur channels (`useLiquidReveal.ts:72`, `useDockCtaReceive.ts:12`) are as cited.
- **RU-14 and R-6** are quoted as `W-I.8.md:125-128` and `RULINGS-2.md:85-90` state them, apart from the omission in B7-4.
- **daraksha.** The one clock (`SiteDock.vue:85-92`), the gap token in `.fission`, and the neck element are where §9.3 cites them, at `b11-occasion`.
- **The WebKit source claims** (`RenderLayerBacking.cpp:L1025-1031`, `Page.cpp:L5281-5303`, sRGB for the CoreGraphics mode) are as `ios27-glass.md:123-124` states them. Only the descendant question in B7-2 goes past them.
- **The page contract.** P7-fuse passes the static check and runs in happy-dom; it prints the Safari version and asks for Reduce Motion off.

## Retry

`pass-7/critique-B-check.mjs chromium` was refused on the kernel zone at 23:19:59 (`data.kalloc.1024` at 14.71M), at 23:26:30 (14.72M) and at 23:36:35 (14.77M). The second attempt came 6.5 minutes after the first, under the ten-minute floor: my error. The third was started by a wait that held it to the floor. The zone log shows the count still rising at 54 to 69 a second (`~/.claude/guard/log/zone.log`, 23:15 to 23:30), and it falls only on a reboot, so I stopped there rather than hold the seat for the hour. The cell stays owed with pass 7's own `page-check.mjs` and `crop.mjs`, after a reboot and after B7-1's fix. No headless engine draws WebKit's backdrop or reads the iPhone's frame rate, so none of these replaces P7-fuse on the owner's phone.
