# BM study: critique of UNION.md for completeness and truth

Seat: critic (completeness and truth), claude-opus-5-5, asserted from its own system identity, 2026-11-22. I changed no source and ran no browser.

I read CHARTER.md, UNION.md, INBOUND.md and the four reads, then checked them against their sources:

- **rida's chunks.** glass-nav-config @2240, @3240, @4770 and @5320; glass.worker @74700; post-contents-config @100-2300 and @5900-7300; and the chunks neither read cites (client is React DOM, disclaimer is an audience-gated QR panel, demo-presence pauses an island's clock while it is dormant).
- **glass-ui at HEAD `10a762d28`.** The precepts, RULINGS-2 and RULINGS-8, the files named below, and the git history.
- **Three fetches.** Apple's Safari 27.3 beta release notes (`.md`), MacStories' iOS 26 review p.3 and Apple support 101604.

I made each objection, then re-read its evidence. Objections that did not survive are listed at the end.

---

## O1 (blocking). The tab lens glass-ui built, read in Safari, shipped, and the owner removed

**Claim.** The thesis and L1, L3, L7, L9 and T1 put a lifting, scaling lens on SegmentedTabs and on every selection group. glass-ui already built that lens to the owner's order and read it in real Safari 26. It shipped, and on 2026-10-19 the owner had it removed. The union cites none of this. L1's G column ("the dock's run mark … never follows a finger"; SegmentedTabs' indicator "follows a drag") describes glass-ui as if it never had a lens.

**Evidence.**
- **The directive.** The owner, 2026-07-10: "We should serve to perfect, within the bounds of CSS and modern web design, the eye-glass ios27 tabs toggle select effect" (`docs/tranches/BG/audit/ios27-eyeglass-tabs/EYEGLASS-TABS-DIRECTIVE.md:3-4`). It came with a 60 fps iPhone recording of Find My's tab bar.
- **The build.** BG.W-EYEGLASS-TABS is marked "DONE (dual-engine paint PASS 2026-07-11 — real ANGLE-Metal Chrome 150 + real Safari-26 WebKit … squish peak 1.1015× … proud 1.15× static, continuous transit … Safari honest proud-capsule degrade EMPIRICALLY confirmed" (`docs/tranches/BG/execution/EXECUTION-PROGRESS.md:367`).
- **The removal.** Commit `629773393` (2026-10-20), "the eyeglass, press squish and capsule hover leave", carries out the owner's O-4: "The tabs animations on the filter on the homepage is flashy and too gaudy--more glass-ui and subtle".
- **The spec it set.** "one object moves, the indicator, at its own size, in one monotone leg; the strip does not move and no tab scales on hover or press" (`tests-visual/SegmentedTabs.glide.spec.ts:3-6`). A gate on master asserts the lens is absent (`tests/gates/tabs-seam.test.ts:24-27`).
- **The collision.** L1 (the lift), L3 (about 1.16×), L9 (the glyph grows a twelfth), L7 (the bar swells) and T1 ("ADAPT into L1") each make a tab scale on press, against that spec and that gate. "eyeglass", "O-4" and "flashy" appear nowhere in UNION.md or the four reads.
- **Device evidence the union lacks.** `RESEARCH-KINEMATICS.md:33`: the lens slides continuously through an intermediate tab. `:41-55`: a two-slot travel departs at 150 ms and settles by 467 ms, with width peaking about 20 % on arrival. The pill rests proud of the bar at about 1.14 to 1.15×. The union's lift figure comes from Liquidum (a third-party simulator rebuild) and from rida.
- **When the lens appears.** The union's only Apple source on this is MacStories, and it ties the lens to a long press. Fetched today: "At any moment, you can long-press on an iOS 26 tab bar to turn the highlight shape into a 'selection bubble'", and "It's pretty cool, it's pretty useless". L2 takes a full lift on every tap from rida alone.

**Remedy.**
- Add the eyeglass record and O-4 to L1, L3 and T1, and to the discrepancies at the top.
- State that the 2026-11-22 brief is the later ruling, and which parts of O-4 survive it: no tab scales on hover, the indicator stays at its own size, one object moves.
- Have Q3 and Q4 answer O-4 directly: does a tap lift at all, or only a press-and-drag, and by how much?
- Read BG's KINEMATICS, FEASIBILITY and DELTA before pass 5.
- Name tabs-seam arm (e) as a gate the 11.3.0 wave amends only on the owner's word.

## O2 (major). Shipped scroll facilities missing or misdescribed

**Claim.** Four facilities concern content scrolling under glass, in glass-ui or on rida's site:
- M7 says glass-ui has no scroll edge effect; it has one.
- T8 treats the scroll collapse as only booked; a collapse recipe already ships.
- glass-ui's dock border progress has no row.
- rida's reading-progress track has no row.

**Evidence.**
- **FadingScroll** (`src/components/fading-scroll/FadingScroll.vue:1-17`) is "the library's single scroll-state-driven edge-fade primitive": a mask driven by a `scroll(self)` timeline, with a JS fallback. M7 says "G: none found [GI §2]".
- **scroll-chrome.** `src/styles/scroll-chrome.css:1-40` with `useScrollChrome`: "scroll down and it SHRINKS … scroll up and it EXPANDS back"; "the SEPARATION/shadow LIFTS as content scrolls under".
  - Under reduced motion it "snaps `--chrome-collapse-t` to a discrete 0/1 endpoint … instant". That is a cut, against P0 and `restraint.md:164-182`.
  - It writes a registered custom property from JS, which WebKit never accelerates (the union's own discrepancy 2).
  - T8 lists only "the scroll fold moved to 11.3.0".
- **ScrollProgressRim** (`src/components/dock/README.md:99-100`; `scroll-progress-rim/styles.css:69`) draws progress on the dock's own border.
  - It is fed a JS `value` and animated by `transition: clip-path`, so it runs on the main thread in WebKit.
  - The owner made it binding: "Scroll progress is the dock's own border hairline, edge to edge" (`docs/precepts/README.md:108`).
- **rida's reading-progress track** is a capsule beside the menu button that dissolves as the menu opens: blur 0 to 3 pt, fade from 15 % to 90 % open (RU §4.6, pcc@11331). It is rida's case of a neighbouring plate yielding to a presentation, which F9 does not take up.
- A grep of UNION.md and the reads for "fading", "scroll-chrome" and "ScrollProgressRim" finds nothing.

**Remedy.** Give each its own row:
- **FadingScroll: TAKE.** M7's ADAPT already ships; what is left is its delivery, and the rule that the mask sits on content, never on a glass ancestor.
- **scroll-chrome: ADAPT under T8.** Cure its reduced-motion snap.
- **ScrollProgressRim: TAKE,** per the owner's order. REFUSE rida's separate capsule. Move the rim's delivery to a scroll-driven animation on an accelerated property, per I13.
- **The neighbour that yields:** decide under F9 whether a nearby plate yields as a presentation buds.

Give M7 and T8 a home in §4. Neither pass names them.

## O3 (major). The material: one fit taken, three left out, and the owner's "more glassy" omitted

**Claim.** G1 calibrates the ladder from one record, rida's menu material, and says the measurements point to "more veil, less saturation". rida's own record and glass-ui's device archive hold other fits that point elsewhere. G1 also quotes the owner only where he asked for less glass.

**Evidence.**
- **rida's bar body.** The record holds the bar body, `glassEffect(.regular)`, which is the dock's analogue (post-contents-config @~100-1900).
  - Light: tone lift 132.5, gain 0.474, saturation 0.9.
  - Dark: lift 32, gain 0.99, curve 0.395, saturation 1.2.
  - Blur: `wideSigma:16, sharpShare:.33, sharpSigma:.47` (dark: `.25` and `.48`).
  - So the light body desaturates, and about a third of its signal passes almost unblurred.
- **rida's thick panel.** The record also holds a 250 × 160 `thickPanel` with `sharpSigma:6.7, wideSigma:21.7` (@~1900).
- **What one blur can do.** No single `blur()` reproduces a two-part blur. G1 and G2 use only the menu record's `blurSigma:12` and `8.4`.
- **G2's check.** That black and white land within a level of 136 and 254, and of 32 and 121, tests only the tone map. Any blur passes it.
- **glass-ui's device archive.** From iPhone 16 Pro screen recordings: "iOS glass is *near-zero veil + heavy blur + strong saturate*"; transmission "mean L −2 % … saturation +62 %". Its retune is titled "veil down, saturate up" (`docs/tranches/BJ/addenda/2026-07-24-refinement/IOS27-ARCHIVE.md:20, :262`). The union does not cite the archive.
- **The owner, for more glass.**
  - value.js relays popups that are "not glassy" (THIRTY-FIRST; FORTIETH D) and his ask for "glassy, translucent popups everywhere" [IN value.js 4].
  - HA: "these modals should be more glassy" [IN HA, bounds].
  - G1 quotes only C-4 and C-59.

**Remedy.**
- Carry all four fits (menu, bar body, thick panel, device archive) and both sets of the owner's words in G1 and Q10.
- Say which surface each fit applies to: control-sized plates or overlays (G9).
- Withdraw "the measurements point the way" until pass 2 reconciles them.
- Test any filter-only veil (G2) over a mid-tone and over a textured backdrop, not only over black and white.
- Put the light and dark material on the first iPhone list (O8).

## O4 (major). Two restraint rules and the press ceiling are not counted

**Claim.** The union proposes several blur levels, motion carried by `backdrop-filter`, and a press that sets off three or four animations. It cites none of the restraint lines these meet.

**Evidence.**
- **One blur level.** `restraint.md:60-62`: "One blur level everywhere, and never a blur inside a blur … Check: one `backdrop-filter` value across the app". RULINGS-8.md:722, addressed to the owner: "Your rule is one blur on every glass surface".
  - The union cites line 60 only for "never a blur inside a blur" (F5, M7, S6).
  - Against the first half stand G1 (calibrate a five-rung ladder), G2 (12 px light, 8.4 px dark), G9 (a plate moves from the control's rung to the overlay rung as it grows) and L7 (the material thickening as one `backdrop-filter` tween).
- **Transform and opacity only.** `restraint.md:142-143`: "Choreographed, not batched … Transform and opacity only." The union cites this for M5, then makes `backdrop-filter` the channel for M1 (materialize), L7 and G9.
- **The press ceiling.** `restraint.md:204`: "animations running on a press | 2".
  - On one tab press under the union, the mark lifts (L1: `scale`, plus the lifted face's `opacity` per Q3), the glyph grows (L9) and the bar answers (L7). That is three or four.
  - Q3's "two properties per change" counts the mark alone.
- **Pass 10.** Its amendment list names "restraint's ceilings" and P5 and P7. It names neither line 60's check nor line 143.

**Remedy.**
- Add both rules to the discrepancies, each with either the owner quote that would amend it or a design that keeps it. A materialize by the opacity of a full-strength plate keeps line 143; one blur value keeps line 60.
- In Q3 and Q8, count every press against line 204 and cut to two. For example: the mark alone, with no bar swell and no glyph grow on a tab the mark already covers.

## O5 (major). L15's settle law contradicts its own row and three sites

**Claim.** L15 takes glass-ui's velocity projection as "the one settle law". But rida, Apple and three sites settle on the item under the finger at release, and D2's own commit rule is the release point.

**Evidence.**
- **L15's own row.** "R: the nearest at release, momentum killed (input@2705). A: it settles on the tab let go over (Liquidum)". RU §3.2: the lens settles on `clamp(round(thumb/slot))` "at the moment of release, not after momentum".
- **What projection does.** It carries a flick past the item under the finger. "the release velocity is projected through the catching spring's own settle horizon, and the nearest rung wins" (GI §4.5); kf `snap` "projects the rest" (GI §5).
- **The sites.**
  - atlas: long lists "must not settle on the nearest row … a lens that guesses would make that worse" [IN atlas 1].
  - HA: "fine if the lens never commits on release over a row the finger only passed" [IN HA 1].
  - value.js: "it settles, then commits" [IN value.js 1].
- **D2.** "a release over a row commits that row".

**Remedy.**
- Split the law. A selection mark settles on the item under the release point, and the release velocity only seeds the settle spring.
- Projection stays for sheets and detents. Pass 6 decides it for the switch's fling.
- Rewrite L15 and the thesis's "settles on the nearest choice" to say which law applies where.

## O6 (major). The compositor claim holds only in a beta, and pass 3 omits the candidate that might run in shipping Safari

**Claim.** The thesis says releases, settles, entries and exits play "on a `SPRING_PRESETS` curve, the set WebKit runs on its compositor". glass-ui's spring curves are `linear()` functions, which released Safari does not accelerate. Pass 3 tests only a `linear()` delivery.

**Evidence.**
- **Apple.** The Safari 27.3 beta notes, Animations (fetched today): "Animations that target the `offset` property, composed animations, animations that have a `playbackRate` other than 1 and animations that use the `linear()` and `steps()` easing functions are now also accelerated. (190761783)".
- **The read.** IOS §2.3 infers for 27.2: "Spring curves written with `linear()` therefore run on the main thread in 27.2".
- **glass-ui's curves.** Each CSS spring is a 48-sample `linear()` per row (GI §8; `springProjection.ts:26-68`). Every `--spring-*` transition therefore runs on the main thread in Safari 27.2 and in every iOS 26 Safari.
- **Pass 3.** Q6 and pass 3 test "WAAPI with a per-release `linear()` spring seeded with velocity". A velocity seed by additive composition is a composed animation, which is also beta-only.
- **The missing candidate.** A spring sampled into keyframe offsets, with keyword easing between them (no `linear()`, no composite). Whether it is accelerated in 27.2 has not been read.

**Remedy.**
- Restate the thesis: accelerated from 27.3, main thread before it.
- Add the keyframe-sampled spring as pass 3's fourth candidate.
- Add to the reading list: is a keyframe-sampled transform spring accelerated in 27.2, and what share of readers will be on 27.3 when 11.3.0 ships?

## O7 (major). The neck's failure is misdescribed

**Claim.** F2 and Q2 present the built necks as failing in an engine that draws no blur, which implies the engine was to blame. RU-14 records three necks that failed in both engines, Chromium included. Q2 offers one of them again as unread.

**Evidence.**
- **RU-14** (`RULINGS-2.md`): "WebKit: 'flat deviation 204 to 209 …'; Chromium: 'flat deviation up to 42 (bound 2)' … Three necks, two build passes, no pass in either engine".
- **The union.** F2: "failed in Playwright WebKit (`RULINGS-2.md:88-90`), which draws no blur". Q2: "a third neck leaf (built, read only in an engine that draws no blur)".
- **Device evidence Q2 omits.** iOS 27 shows a bridge: "Live Activity two-lobe goo with a meniscus waist" (`IOS27-ARCHIVE.md:29`).

**Remedy.**
- Quote RU-14 whole in F2 and Q2.
- Drop the third leaf as a candidate unless pass 7 names what changes from the version that failed in Chromium.
- Add the archive's two-lobe goo as Apple evidence, and as a crop to compare prototypes against.

## O8 (major). The readings the decisions need arrive after the decisions

**Claim.** Passes 2, 4 and 7 "decide" Q10, Q13, Q1 and Q2 using engines that cannot show the property in question. The iPhone reading list arrives only in pass 10.

**Evidence.**
- **Pass 2** reads the material "in Chromium strips and in WebKit". Playwright WebKit draws no backdrop blur (`RULINGS-8.md:19`), which the union says itself in G1.
- **Pass 4** reads "backdrop clipping".
  - WebKit's backdrop geometry reads `border-radius` and `corner-shape` but not `clip-path`, so the answer is owed to a device (IOS §4.7).
  - Chromium's compositor says nothing about WebKit's `CABackdropLayer`, and Playwright WebKit draws no blur.
- **The only reader.** Machine law bars headed browsers, so July's real-Safari lane (`EXECUTION-PROGRESS.md:367`) is closed. The owner's iPhone is the only WebKit that draws the blur.
- **Pass 10** produces "the iPhone reading list".

**Remedy.**
- Issue a first iPhone list after pass 1, with one small page per reading:
  - whether `clip-path` clips a backdrop;
  - the frame rate of an accelerated transform on 27.2 and on 27.3;
  - the material, light and dark, beside a native control;
  - the neck crop;
  - the menu spring beside Safari's own.
- Mark the decisions of passes 2, 4 and 7 conditional until the list returns.
- Fold the readings before convergence, either in a new pass or by moving pass 9's cost work.

## O9 (major). Site answers ignored or misquoted

**Claim and evidence.**
- **gaggle 2:** "Find growing out of its seat fits", and "A fused lamp must not read as a button" (a readout fused with a control). Neither is in F8 to F10 or in Q2 or Q9.
- **HA 2:** "at most one live lens or fuse at a time".
  - S6 cites this as "HA's bound of one live blur".
  - No rule carries the real bound, although D2 (press, slide and release from a dock seat) runs a bud (F9) and a moving mark at the same time.
- **HA 4:** "out 100-150".
  - M2 takes 11.1.1's exits, in which "Menus and selects take about 220 ms to leave, popovers 250 ms" (release-11.1.1 `CHANGELOG.md:27`).
  - Those are above HA's figures and above P0a's own out row of 75 to 120 ms (`motion-canon.md:76`), while M3 cites P0a's ratio.
- **value.js 3:** the owner's words and one measured delay, none of which the union weighs. I10 accepts 60 Hz without them.
  - The owner: "jittery" dragging and panning; "very fast and smoothed out scrolling"; keyframes' "multitouch is slow".
  - The measurement: keyframes' touch reaches its handler about 14 ms late while a scene plays.
  - kf `Draggable` is the follow engine under L1 (GI §5).
- **value.js 2:** the fold should be "faster, less fade" (FORTIETH K). F7 does not carry it.
- **atlas 2 and 5:** "never between a hover card and a dock"; "a lens is ornament unless it shows where the selection is going". Neither is carried.
- **value.js 5:** "one WebKit crash in daraksha's occasion mode not yet run down".

**Remedy.** Carry each into the row it bounds:
- gaggle's Find seat and the fused-lamp rule into F8 to F10;
- HA's real bound into a corrected S6 and into D2;
- an exit number in milliseconds into M2 and M3;
- the owner's smoothness words into I10;
- "faster, less fade" into F7;
- atlas's two rules into L1 and Q4;
- daraksha's WebKit crash under the evidence pass 9 owes.

## O10 (major). The 11.2.0 plate answers the same press the mark lifts on

**Claim.** The matrix leaves out the plate, glass-ui's own press and hover answer. It ships in 11.2.0 and answers the press on which the union's mark lifts.

**Evidence.**
- **The plate** (`affordance-map.md:57-77`): "The plate is the control's own shape as a flat fill behind it … the full strength for a press, never shorter than the press clock | received"; "on a row, a tab or a card it is the fill alone"; "They ship in glass-ui 11.2.0" (`:60`).
- **The tab rule** (`:75`): "A tab under its travelling indicator … already marked, and take[s] no held plate". This rules out a held plate only, not a press plate.
- **The clash.** L1 lifts the mark on a press at the pressed tab (rida: "lens x springs to tab i", RU §3.3). With the plate also at full strength, that tab carries two marks for one state (`restraint.md:206`: "marks for one state | 1") and two answers to one press.

**Remedy.** Add a row for the plate in §1.1. Decide in Q3 which one answers a press in a lens group: the mark, with the plate standing down, or the reverse.

## O11 (minor). P0a's hover row applied to a press

**Claim.** L7 ("a swell within P0a's 4 px edge") and D12 ("lifts within P0a's 4 px") take 4 px from P0a's hover row. P0a's press row has no swell, and atlas's suites fail any box that moves on open.

**Evidence.** `motion-canon.md:64` (hover: "its edge moves 4 px or less"); `:68` ("a press | 2 % of colour, or a scale no deeper than 0.96"). [IN atlas 5]: "suites fail any box that moves on hover, open or fold". A press that opens a menu from a swollen bar moves the box during the open.

**Remedy.** Cite the press row. Either name the owner quote that allows a press swell, or replace the swell (L7) and the hold lift (D12) with a colour leg.

## O12 (minor). Claims the sources mark as rida's or as inference, stated as source

**Evidence.**
- L6 says "pointer events at the page rate, 60 Hz by default [IOS §2.4]".
- I10 says "rAF and pointer events held to 60 Hz … (`UnifiedWebPreferences.yaml:L5142-5150`; blog:83)".
- In both, the preference governs rendering updates. The pointer half is rida's alone (RI §1: "The event-rate half is the author's").
- F13's "the group animates `width` and `height`" is IOS §2.3's own inference ("not re-read here").

**Remedy.** Mark the first as rida's and the second as inference. Add the pointer-event rate to the iPhone list.

## O13 (minor). Two items in the 27.3 beta notes missed

**Evidence.** The 27.3 beta notes, fetched today, list two items that bear on the union:
- "Added support for `popover=hint`. (184548373)". This bears on tooltips (D13) and on the overlay substrate (Q11).
- "Fixed scroll snap animation taking a long time to settle on iOS after flicking past the last snap position. (189473962)". This bears on the dock run as a native snap scroller (I1, Q5).

**Remedy.** Add both to the platform table, and carry them through Q11 and Q5.

## O14 (minor). Two iOS 27 idioms from the archive left out

**Claim.** glass-ui's archive measured two iOS 27 idioms on device. They bear on rows the union settled without them.

**Evidence.**
- `IOS27-ARCHIVE.md:18` and its §6, "Segmented-as-liquid-volume": "selection = occupied length, unfilled stops render as dots that the pill *absorbs*". Here the selection grows instead of translating, which competes with the union's one translating mark on segments and sliders (S1, S4, T5).
- `:27`, "Split tab bar + detached accessory circle (Find My)": "iOS separates the *bar* from a peer *circular* control at the same altitude". This is iOS 27 evidence for F8's split seat. F6's "iOS 27 dropped it" is true only of search.

**Remedy.** Add both as rows (the S section, and F8). Let pass 6 weigh the liquid volume against the one mark.

## O15 (minor). Fission and fusion get one pass

**Claim.** The brief asks for a 10-pass study "on the ios 27 fission, fusion, and glass". The plan gives fission and fusion one pass (7) and the neck, the owner's one named Safari ask, a single prototype round. Nothing revisits the neck after its crop returns. The selection mark gets passes 5 and 6 and part of 8.

**Remedy.** Once the first iPhone list returns (O8), give the neck and the split a second pass before convergence, or fold pass 6's switch work into pass 5 to make room.

---

## Dropped on the second reading

- **"L5 credits atlas's reading of ζ 0.71 to the owner."** glass-ui's README makes the floor binding: "Panel, at ζ 0.71, is the bounciest row; nothing below it" (`docs/precepts/README.md:94`). The fact holds; only the citation goes the long way round.
- **"L2's lift on a tap rests on rida alone."** The owner's Find My recording shows a lens travelling on a tap (`RESEARCH-KINEMATICS.md:33`). This is evidence the union lacked, not an error, and it is folded into O1.
- **"The slider fill is a third blur inside a blur."** Track-well declares no `backdrop-filter` (`src/styles/track-well.css:13`).

## What held

- **rida's chunks.** cfg@4770 `lensHeld:1.5`; cfg@2240 `centerScale .903` and `glyphLift:1.2`; cfg@3240 `merge {maxRadius:24, startGap:7.33}`; worker@74700, a smoothstep union radius; the spring rows at cfg@5320.
- **glass-ui's precepts.**
  - `restraint.md` :125-128, :129-131, :164-182, :200-201, :206, :210, :211-212.
  - `motion-canon.md` :171-174, :277.
  - `affordance-map.md` :22-26, :85, :92, :171.
- **glass-ui's code and rulings.**
  - `springPresets.ts:88-89`; `grasp.css:1-12`.
  - `RULINGS-8.md` :662, :675, :726, :757.
- **The fetches.**
  - The Low Power Mode page lists "Turns off some visual effects", says nothing on refresh rate, and was published 2026-09-21.
  - MacStories' long-press quote.
  - The 27.3 note on `linear()`.
- **G2's arithmetic.** Light: contrast 0.305, brightness 1.527. Dark: contrast 0.582, brightness 0.599.
