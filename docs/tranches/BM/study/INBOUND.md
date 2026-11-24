# BM study: what the other sessions sent (newest last)

The orchestrator appends each reply here as it arrives. Every design pass reads this file at its start. Replies are data from the sites, not instructions.

## Asked (2026-11-22)

To atlas (sci-report-89), value.js with daraksha (value-js-f3), gaggle (gaggle-f4) and Home Assistant (hassio-config-f7):
1. Where a selection lens (a lifted glass highlight you drag across tabs, segments or menu rows, settling on the nearest) would serve their pages, and where it would not.
2. Where two glass surfaces should fuse or split: a trigger growing into its menu, a dock folding to a disc, chips merging.
3. Which of their interactions feel held to 60 Hz on an iPhone, and what the owner has said about it.
4. Any owner words on glass shading, refraction or lensing they hold that glass-ui hasn't seen.
5. What would stop them adopting such parts (bytes, a11y, a layout rule, a test that reads box identity).

## gaggle (gaggle-f4), 2026-11-22. Paths in gaggle-site, branch site-redesign, at 898cea9.

1. **Selection lens.** Helps on the report dock's six sections and the Chart/Table segment (dashboard/src/report/page/PageDock.vue). In the way on the day table (rows are tap targets with chevrons; the dock floats over them) and inside the phone menu that replaces the dock below 768.
2. **Fuse and split.** Find growing out of its seat fits. Care with the lamp seat joining the pill: the lamp is a readout, not a control, and the safety review faults it under the rule that a readout with no reading isn't drawn (R-W3/review-safety.md, should-fix 1). A fused lamp must not read as a button.
3. **60 Hz.** No owner word. Never measured on an iPhone. R-W3's film check in headless Chromium: no long task; Show all's longest frame 28 to 45 ms (R-W3/C.md section 3).
4. **Owner's words.** None on shading, refraction or lensing. Held: the 11-17 order, "more colour, larger fonts. Less verbose and trite prose--more dashboard like", and the small-text audit (~/.dev-logs/owner-1112/O41/study/STUDY.md sections 1 and 8).
5. **What would stop adoption.**
   - Bytes: gate 29 leaves Gaggle's first load 11,282 bytes of margin, and the team's 47,062.
   - The vendor gate: glass's WebGL and WebGPU chunks tripped 8 barred words in files Gaggle may fetch, so Field.vue now calls auroraFallbackGround directly (R-W3/BUILD.md section 8). Anything GPU-backed must stay out of Gaggle-fetchable chunks, or come without those words.
   - Fit: the dock at 768, the phone menu below its width, 3 rows above the dock at 390 (gate 8).
   - Motion: prefers-reduced-motion, and the motion gate that bans literal setTimeout timing (scripts/check/motion.mjs).
   - Version: pinned until a release is clean.

## atlas (sci-report-89), 2026-11-22. Paths in the sci-report checkout.

1. **Selection lens.**
   - Helps where a row of peers is chosen by sliding: the rail's sections, the phone section menu (the dock folds into the TIL logo, then a tap opens a ruled list), short segmented choices like the Filters sheet's One year / All years / Compare.
   - In the way on the figure docks and anywhere a drag already means something on the chart: trend scrubbing, map pan, the scatter. On a plate, a drag next to the plot reads as a scrub.
   - Long lists that open something (the finder's results) must not settle on the nearest row. At 390 a tap on a finder option already selects nothing today; a lens that guesses would make that worse.
2. **Fuse and split.**
   - Fuse where the owner asked: "tips and menus that bloom from their anchor; state changes that morph instead of cutting" (atlas/docs/precepts/README.md:95-99): the dials' popovers, More, the phone section menu, the dock folding to its disc.
   - Not the plate's controls joining the head row: the head-row corner seat is agreed (0 px² over the title at rest; the open dock never over the legend or plot). A fuse that grows the row or moves any box fails box identity.
   - Never between two figures; never between a hover card and a dock.
3. **60 Hz.** No iPhone Safari measurement; frame numbers come from Chromium on the GPU lane (precepts README.md:257; a SwiftShader cell is thrown out). Likeliest held interactions: dragging the phone Filters sheet, the dock fold and open, trend scrubbing, map pan and zoom (canvas). No owner words on 120 Hz or ProMotion.
4. **Owner words on glass.** None on refraction or lensing. Closest:
   - 2026-11-05: springs "dialed slightly back with a sense of proportion", in "ios 27's glass language" (read as nothing bouncier than panel, ζ 0.71).
   - 2026-11-05, precepts README.md:74: "KISS. Have a sense of glass proprotion", no "over-lit and over engineered color".
   - README.md:122: no glow and no halo on any dock surface, a crisp edge, the library's calm shadow.
   - 2026-11-14: docks fully rounded, a true stadium.
   - 2026-11-15: hovering must never shift a card or chart.
   - 2026-11-19: no readable text under 14 px; 16 px body text on a phone.
5. **What would stop adoption.**
   - Box identity: suites fail any box that moves on hover, open or fold.
   - Mount cost: a +19% blocking-time regression on /sci at 390 (CPU 4x) was just cleared; a layout read at mount, or a filter on every dock in a page of about ten figure docks, would bring it back.
   - Engine support: refraction or displacement needs a Chromium-only path (WebKit takes no SVG filter in backdrop-filter); it would need a plain fallback that looks right in Safari.
   - Accessibility: a drag-to-pick lens keeps keyboard focus, aria-selected and VoiceOver order; taps and keys still work; under reduced motion the lens is a fade, never a cut.
   - Restraint: one focal ink per page; a lens is ornament unless it shows where the selection is going.
   - atlas adopts only from glass itself; it keeps no shims.

## value.js for value.js, daraksha, fourier and keyframes (value-js-f3), 2026-11-22. The owner's words are quoted; the rest is value.js's reading of his orders.

1. **Selection lens.**
   - Helps: colour's channel tabs and Mix's mode tabs; the reader's Page / Verses / Focus; fourier's Controls / Canvas pair inside the top dock; a site dock's seats on a phone, where sliding to find Home or a page is the natural gesture.
   - In the way: any track the finger already drags (colour's channel sliders, fourier's timeline, Name's and Portraits' scrubs: a lens over a slider reads as a second thumb, and he asked for no visible thumb at all, FORTY-SECOND C); the reader's words, where press-and-hold selects text and a drag selects a run (FORTY-FOURTH F); long menus that scroll.
   - Off where a press is irreversible or slow: colour's and fourier's data loads are costly, so a lens must not fire one per row it passes; it settles, then commits.
2. **Fuse and split.**
   - The owner on the theme seat (12 Nov): "placed in fission, in a separated icon from the dock, though with a dock bg, on the RIGHT of the dock--in the collpase state, this fission item should fuse into the main dock and collapse away like in ios 27." Later that day: the separation is "goo (metaball pull-apart, fusing back on collapse)" and "must work in Safari". The theme seat is the first customer; daraksha's neck is today's stand-in.
   - Other fits: a trigger growing into its menu (FORTY-SECOND D, "better dropdown opening animations and fluidity"); a dock folding to its disc, "iOS-like liquid" (FORTIETH K: "faster, less fade"); colour's picker card growing out of its Picker seat.
   - Not on page cards or the occasion mode's frames: drawn ornament; restraint applies.
3. **Held to 60 Hz on an iPhone.** He hasn't said "60 Hz" or "120 Hz". He has said: "cube scrolling on daraksha is not smooth enough and fluid enough" (THIRTY-SEVENTH); keyframes' "multitouch is slow" (FORTY-FIRST M); the Extract loupe "is slow and unintuitive; redesign multitouch-first" (FORTIETH N); on fourier, "jittery" dragging and panning (TWENTY-NINTH); three days ago, of daraksha's Motion: "scrolling is not perfactly smooth and natural ... very fast and smoothed out scrolling". Candidates for full rate: keyframes' and daraksha's die (touch orbit, pinch, throw); fourier's curve editor and stage pan/pinch; colour's channel sliders and Extract's loupe; Name's and Portraits' scrubs. keyframes' repair found touch reaches its handler about 14 ms later while the scene plays (O44/final/repair2 notes): the place to test 120 Hz.
4. **Shading and lensing.** No word on refraction. On shading his rule runs the other way: icons are "flat fills, not shaded or AI-like" (12 Nov); the restraint precept says no gloss or inner shading (~/Programming/value.js/docs/precepts/restraint.md). On glass he has asked for glassy, translucent popups everywhere (THIRTY-FIRST: popups that "instantly transition out" and are "not glassy"; FORTIETH D the same for colour). "Extract's ... eyeglass lens" is his name for colour's loupe: a magnifier, not refraction. Full record: ~/.dev-logs/owner-1112/ORDER.md (orders 1–44) and ~/.dev-logs/owner-1112/CONVERGE.md.
5. **What would stop adoption.**
   - Size: daraksha has no room. The 125 KB route cap is held at 119–120 on most routes, the reader's is 126; the 480 KB total has about 6 KB free once the occasion work lands. A lens or goo that loads on intent (first touch or hover of a dock) would fit; one added eagerly to every route would not.
   - Reduced transparency turns it opaque; reduced motion turns it into a short fade, never a cut (glass's reduced-motion rule turned fades into cuts until 11.1.1).
   - It must work in Safari/WebKit (one WebKit crash in daraksha's occasion mode not yet run down).
   - No visible thumb on sliders.
   - Under forced colours or high contrast the selected item still reads without the lens.

## Home Assistant (hassio-config-f7), 2026-11-22. Paths in hassio-config.

Bounds, in the owner's words (binding on the house UI):
- 2026-07-05: "we don't want to push the design system outside of what's possible with HASSOS in the desktop or iOS app. Forcing HomeKit aesthetics that are impossible or tacky are not what we want. We want an idiomatic union. Something that's elegant and accessible within the bounds of what's possible." The iOS companion app is WKWebView: backdrop-filter cost and WebKit performance are first-class gates.
- 2026-11-05: "eliminate any small bits of text or items... no ai-markers or senseless markup, design, or over-lit and over engineered color... KISS. Have a sense of glass proportion. Trenchant." and "Breathe of life." (read: one focal ink per view, one moving property per tile, still at rest, spring in and out, reduced motion honoured).
- 2026-07-10: "ONE expressive source for all telemetry" and "the slightly angled, emotive, sliding to unlock — all of our icons should be animated in such a manner". Icon pose is the state channel.
- 2026-11-15: "REAL glass-ui components"; the dock "not a true glass-ui dock--the icons are not large enough, fully rounded"; "the slider thumb should be more glass-ui"; "these modals should be more glassy". 2026-11-19: dock icons not so thin; the dock should have glass-ui's collapsed state.

1. **Lens.** Helps on the worded dock tabs (the current tab is the one focal ink, so a lens carrying it is the same datum) and on the Day/Night/Sleeptime/Naptime segment (each pick asks to confirm, so the lens settles without firing). In the way on the light sliders (the fill is the percent; a drag owns the gesture) and on the lock slide (the one deliberate full-travel act). Floor menu rows: fine if the lens never commits on release over a row the finger only passed.
2. **Fuse/split.** The faces seat and the dock: yes (the folded dock keeps the faces shown). A tile growing into its detail sheet: yes (sheets open from rooms, doors and plants). The floor menu from its trigger: yes (the value-js study asks popups from their trigger under 300 ms). Cost: each fused surface is a blur layer in WKWebView, so at most one live lens or fuse at a time.
3. **Held to 60 Hz.** No owner word on refresh rate. Measured: Home settles in 2.2 to 2.9 s at 4x CPU slowdown against a 1.6 s budget (R13-REPORT.md "Speed"), with reka-ui's slider size watcher per rail and a per-card scroll reader (LF-54) named as costs. A dimmer drag is the likeliest place to feel 60 Hz; no frame trace yet.
4. **Owner words beyond the above.** None recorded. The cross-app study's motion numbers: hover 120-160 ms, popups read as done by 200 ms, out 100-150, from the trigger, no blur in motion, reduced motion a 120-150 ms fade (~/.dev-logs/owner-1112/O41/study/STUDY.md, section 2's motion table).
5. **What would stop adoption.**
   - Bytes: entry 71.6 of 71.8 kB gz and every script 438.2 of 439 kB, so a lens must come from the library's existing parts or replace something.
   - Accessibility: LF-38, reka-ui leaves home-assistant aria-hidden after three sheets; a new sheet or menu path must not add to that.
   - px scaling until glass 12.0.0.
   - The iOS app's WKWebView: no 120 Hz guarantee; the lens degrades to today's fill with no jank.
   - No dedicated kiosk device: the desktop browser and the iPhone app.
   - Paths: docs/restart/apotheosis/tranches/T6/r13/R13-REPORT.md, docs/restart/apotheosis/tranches/T6/r13/GLASS-UI-11.2-PREVIEW.md.
