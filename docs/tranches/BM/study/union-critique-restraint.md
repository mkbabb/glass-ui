# BM study: critique of the union, from restraint and production

Seat: critic for restraint and production, claude-opus-5-5 (asserted from its own system identity), 2026-11-22. I read `CHARTER.md`, `study/UNION.md`, the four reads under `study/read/`, `study/INBOUND.md`, `docs/precepts/restraint.md`, `motion-canon.md` P0 to P7, `affordance-map.md` (its header, the plate-and-glyph section and the map rows) and the owner sections of `docs/precepts/README.md`. I checked three claims in source: the loupe clone's blur (`src/components/slider/styles.css:569`), the spring tokens' curves (`src/styles/tokens/scheme-spring.css:59`) and the luminance clamp's static walk (`src/composables/glass/backdropLuminanceSample.ts:206-237`). I changed no source and ran no browser.

`U` with a row id or section cites `study/UNION.md` (`U L6`, `U §2`, `U Q10`). The reads keep the union's keys: [RI], [RU], [GI], [IOS], [IN].

## What holds

- The union names and refuses every workaround the charter names: the page snapshot and composite texture (U L11, G3, I15), the scroll-container controllers and their sampler and boost (U L14, I2 to I8), and the OffscreenCanvas present at 120 Hz (U I14). rida's smaller tricks go too (U L17, L18, D9, A9, I17).
- The ornament stays out: the glow and press light (U L8), the lens rim (U L13), specular and sheen (U G4, G13), vibrancy blends (U G14), clear glass (U G8), blur on content in motion (U M5), velocity squash (U L5) and the menu's edge flex (U D5).
- Several decisions remove shipped code: the run mark's five per-frame length writes and the indicator's `width` and `height` glide (U T1, T4); the capsule's blur in its track and CommandDialog's plate in a plate (U T2, F5, D15); the grasp carriers (U L7); the focus veil (U S6); the catch-light (U L8).
- It settles the Low Power Mode disagreement with a fetch and designs for 30 fps (U discrepancy 1).

What follows is what remains.

## Objections

### O1. The pass plan leaves the only valid glass evidence to its last pass (blocking)

**Claim.** Passes 2, 4 and 7 must decide questions about the backdrop, on engines that cannot draw it. The owner's iPhone readings arrive in pass 10, after six passes have built on them. No step puts a prototype where the owner can see it.

**Evidence.**
- The plan says: "Headless Chromium gives strips; Playwright WebKit gives behaviour" (U §4). Playwright WebKit draws no backdrop blur ([GI §0.1]; `RULINGS-8.md:19`). WebKit draws backdrop filters through a Core Animation `CABackdropLayer` ([IOS §2.2]). Nothing in the reads shows Core Animation's blur matching Chromium's at the same radius, so a calibration read in Chromium strips does not carry over.
- The questions are about the backdrop:
  - Q10 is the material against the measured iOS 27 numbers.
  - Q1 asks whether the blur follows a scaled or clipped shape. [IOS §4.7] marks it unread.
  - Q2 asks whether a neck reads as one surface over a blur.

  Neither test engine draws any of these.
- The charter says real iOS Safari readings "are owed to the owner's iPhone and are marked as such, never inferred" (`CHARTER.md:23`). The plan gathers them in pass 10, "the iPhone reading list". Pass 4 depends on passes 2 and 3, pass 5 on passes 3 and 4, and pass 7 on passes 2 and 4.
- Prototypes are "small pages in a study worktree", and no step hosts one.
- Each pass "rewrites the whole of" `DESIGN.md`, and the two critics read that document. Passes 1, 9 and 10 produce prose only.
- Five of the seventeen questions are look and feel that only the owner can settle by seeing: Q3 (the mark's look), Q8 (stretch and swell), Q9 (a presentation's spring), Q13 (the edge) and Q15 (the mark's geometry).

**Remedy.**
- Each prototype pass (2 to 8) ends by hosting its page where the owner's iPhone can open it: a preview deploy of the demo site, or a published page. The page shows the candidates side by side in light and dark. One line to the owner says what to look at and what reading is owed.
- Passes 4, 5 and 7 wait for the readings from passes 2 to 4. A pass that proceeds without its reading says so in its first line, and its decision stays provisional.
- Each pass writes its own section and links its page, instead of rewriting the whole document. Both critics read the page as well as the section.
- Q3, Q8, Q9, Q13 and Q15 go to the owner as pages with their candidates, not as prose.

### O2. The thesis's compositor clause is false in the Safari that ships (major)

**Claim.** U §2 says the motion runs "on a `SPRING_PRESETS` curve, the set WebKit runs on its compositor". In Safari 27.2, the current release, an animation eased with `linear()` is not accelerated. That arrives in the 27.3 beta. Every glass-ui spring curve is a `linear()`.

**Evidence.**
- U I12 itself says "`linear()` easing ... accelerated from the 27.3 beta". [IOS §2.3], under "Production today (27.2)", reads: "Spring curves written with `linear()` therefore run on the main thread in 27.2 and on the compositor in 27.3."
- `--spring-press` is a 48-stop `linear()` (`scheme-spring.css:59`), and every other row is built the same way ([GI §8]).
- So every spring leg glass-ui ships today runs on the main thread in 27.2, in all of iOS 26 (last release 26.6, [IOS §0]) and in a WKWebView on those versions, which is HA's app. The same holds for each per-release `linear()` curve that Q6 proposes.
- Pass 3 tests three ways to deliver a settle: kf on rAF, rAF writing `translate`, and WAAPI with `linear()`. None of the three runs on the compositor in 27.2.

**Remedy.**
- State this in U §2, and give it its own row in §1.8: in 27.2 a spring leg runs on the main thread, whatever property it animates. It is the largest production fact in the matrix.
- Add a fourth way to pass 3: each row's spring fitted as a `cubic-bezier()`, or as a few keyframes that each carry a `cubic-bezier()`. The release velocity goes into the slope at the first control point. On `transform`, `opacity` or `backdrop-filter`, a cubic Bézier is the one spring-shaped curve that 27.2 runs on the compositor (an inference, [IOS §2.3]). Pass 3 measures its error against each row.
- Q7 stays as written.

### O3. The thesis is partly a slogan (major)

**Claim.** "One plate, one mark, one law of contact, played on the compositor" names four things. A component can be checked against two of them as written.

**Evidence.** Each clause of U §2 in turn:
- *One backdrop per container, and anything on it is a fill.* Checkable: count the `backdrop-filter`s per container, and look for any blurred element with a blurred ancestor.
- *One mark per selection group.* The node count is checkable. "Lifts when pressed" has no amount, clock or property list; those are left to Q3 and Q8.
- *"Commits once, on settle."* Ambiguous (O13).
- *"One scalar from the gap says how far they are one plate."* In Safari no channel draws it: Q2 is open, and F1 says "How c is drawn is Q2".
  - If pass 7 ends with no bridge, which Q2 allows, c is seen only at 0 and 1. The law then reduces to swapping two plates for one at the end of a split.
  - If c reaches the page as a custom property written each frame, it is the main-thread write that U §2 sets out to remove.
  - F7's "the fold is the contact law run inward" has the same gap.
- *"A split starts with the second plate under the first."* Checkable on frame 0.
- *"Glass enters by its material rising from `none`."* Checkable.
- *"Played on the compositor."* False in 27.2 (O2).

**Remedy.** Restate U §2 as numbered checks, each with its measurement:
1. One `backdrop-filter` per container.
2. One mark node per selection group.
3. At most two animations per press and two properties per node per change (`restraint.md:202`, `:204`).
4. Animated properties come only from `translate`, `scale`, `opacity` and `backdrop-filter`, with the easing caveat for 27.2 (O2).
5. Nothing refracts.
6. P0a's amounts and clocks for every named motion.

Take the contact law out of the thesis and keep it under Q2 until pass 7 shows a channel that a person can see in Safari.

### O4. The luminance clamp reads the backdrop from the DOM, and the union takes it (major)

**Claim.** The union takes the clamp (U G7) but refuses its two siblings because they need the backdrop's pixels. The clamp's static path reconstructs those pixels from computed style, the same class of technique as the page snapshot the union refuses.

**Evidence.**
- The static path calls `document.elementsFromPoint` at the surface's centre and reads `getComputedStyle(node).backgroundColor` down the stack (`backdropLuminanceSample.ts:206-237`). That is a one-point guess at the painted backdrop. It cannot see images, gradients, text, or any canvas it is not handed.
- That is the class of rida's serialiser, which rebuilds pixels from computed style ([RI §6.1]), done at one point instead of over a page. [IOS §3] classes reading the backdrop's luminance as "workaround (sampling)".
- The union refuses the adaptive shadow because it "needs the backdrop's pixels" (U G6), and refuses the light and dark flip (U G7). It then takes the clamp, which needs the same input.
- The clamp is 825 lines (`useGlassBackdropLuminance.ts` 546, `backdropLuminanceSample.ts` 279), mounted by `GlassDock`.

**Remedy.**
- Refuse the static walk.
- Keep a clamp only where the page hands it a canvas the page paints itself (aurora, blob), or drop it altogether.
- Pass 2 checks whether the calibrated veil (U G1: 53.5 % in light, 65.1 % in dark) keeps on-glass text and icons legible over white, black and the aurora. If it does, the clamp goes in 12.0.0, and the ledger gains 825 lines.

### O5. L6 and L7 adopt gel on controls before the owner rules on it (major)

**Claim.** L6 decides "ADAPT: one rubber-band law for every edge a drag can pass (bar, slider ends, sheet)". L7 decides on "a swell ... or the material thickening". Both settle what Q8 asks the owner.

**Evidence.**
- U L5 refuses the squash on this ruling: the gel squish "is allowed only on the spatial morphs the owner ruled (dock fission and fusion, the blob, the card shuffle)" (`affordance-map.md:22-24`).
- A bar stretching toward a finger while its cross axis thins is rida's own law ([RU §3.7]). It is a squash of a control under a press, not a fission. rida returns it on ζ 0.62, under the owner's 0.71 floor ([IN atlas 4]).
- No site asked for it:
  - value.js and HA say the drag already owns their sliders ([IN value.js 1], [IN HA 1]).
  - The sheet already slides past its edge to close (11.1.1, [GI §4.5]).
- L7's thickening re-blurs the whole bar on every press.
  - It runs against "slightly less blur" (C-4).
  - It runs against HA's bound of one live blur in WKWebView ([IN HA 2]).
  - The mark already answers the press, so the bar's answer is a second motion on it (O6).

**Remedy.** Mark L6 and L7 REFUSE in the matrix. Q8 goes to the owner as a page showing the mark with a stretch and without one. The grasp carriers still go: removing them needs no replacement.

### O6. A tap breaks the press ceiling (major)

**Claim.** The union counts properties per node for the mark: "two properties per change (`scale` and the face's `opacity`)" (U Q3). It never counts what one press starts.

**Evidence.**
- A tap on another tab, by U L1, L2, L3, L4, L9 and L7, starts five animations:
  1. the mark's `translate` glide;
  2. its `scale` lift, rising and falling in full (L2);
  3. the lifted face's `opacity`, which carries its shadow (L13);
  4. the glyph's `scale`, by a twelfth;
  5. the bar's swell or blur.
- The ceiling is "animations running on a press: 2" (`restraint.md:204`).
- The mark alone changes three properties (translate, scale and its face's opacity), against two per node per change (`restraint.md:202`).
- Lifting the plate and growing the glyph together is the double answer that `affordance-map.md:92` forbids: "the plate grows, or the glyph speaks; never both".
- Apple ships a restrained reading of the same bar: "the selection slides under the finger without lifting into a lens, and nothing swells or flexes" ([IOS §1.9], Liquidum).

**Remedy.**
- Start from Apple's restrained reading. The mark moves by `translate`, and its fill strengthens within P0a's press amount (2 % of colour).
- The lift (`scale`) and the glyph's growth compete for one slot. Pass 5 shows both on the owner's phone and keeps at most one.
- L7 goes (O5).
- Every row that adds a motion states its count, per press and per node.

### O7. The bud stacks three changes on one plate, and it is born as glass on glass (major)

**Claim.** U F9, M1 and G9 together change the plate's shape, material and rung in one motion. The union never counts this, and it does not name the overlap at birth.

**Evidence.**
- F9: "the plate starts at the control's own box and grows into the panel as one plate".
- M1: "a plate enters as its `backdrop-filter` rising from `none`".
- G9: the plate "moves from the control's rung to the overlay rung as it grows".
- The plate therefore animates its shape (Q1), its `backdrop-filter` and its veil. That is three properties on one node, against two (`restraint.md:202`), with the content's fade on top.
- Apple separates the two cases. Effects within the container's spacing take `matchedGeometry`; `materialize` is for effects "farther from each other than the container's assigned spacing" ([IOS §1.3]). A menu growing out of its own control is the near case.
- A bud from a dock seat is born on the dock's plate, one translucent plate over another. That is the doubled ink the union reads in RU-14's "junction" (U F3), and it is close to the owner's "darker square ghost" (U Q1).
- Q10 then offers G2, folding the veil into the filter, which buys back a leg the composition spent.

**Remedy.**
- Pass 8 counts the bud's changes per node before Q10 is decided.
- Drop G9 for buds first: a presented panel keeps one rung.
- Name the birth over a glass host and design it, with one of two answers:
  - the material rises from `none` while the bud is still over the host;
  - the panel grows from the host's edge and never overlaps it, at rest or in motion.
- G2 is not adopted to pay for a change that the composition can drop.

### O8. G2 offers to give up the warm ink for one composited change (major)

**Claim.** G2 and Q10 put losing the warm ink on the table.

**Evidence.**
- U G2: "glass-ui's warm ink, `oklch(0.28 0.035 70)`, cannot be a filter that treats the three channels alike."
- U Q10: "Move a neutral veil into the filter (G2) and lose the warm ink, or keep the ink as a background fill".
- Restraint "removes affectation, never identity" (`restraint.md:28-30`). "Warm cream, deft rounding, our color palettes, our glass" is in what he wants (`restraint.md:148`).
- G2's values are solved to Apple's neutral greys (rgb 253 and rgb 49, U G1), so adopting them replaces the owner's ink with Apple's.
- The arithmetic is correct: a neutral veil is a per-channel affine map, and `contrast()` followed by `brightness()` reproduces it. The objection is to what it costs, not to the math.
- G1's "calibrate the ladder against the measured values" carries the same risk if the calibration moves the ink's hue.

**Remedy.**
- Strike the "lose the warm ink" branch from Q10.
- G1's calibration moves amounts only (blur σ, saturation, veil strength), never the ink's hue.
- If a composited veil is needed, put it on the plate's one state pseudo-element and animate its `opacity`; that keeps the ink.
- G2 stays a note.

### O9. Press, slide and release adds a gesture system that no site asked for (major)

**Claim.** D2 and D4 add a gesture system with no customer, and D2's commit rule runs against HA's bound as written.

**Evidence.**
- D2 and D4 add ([RU §4.2]):
  - a 160 ms hold that opens a menu under the finger;
  - a 160 ms arm within 6 pt;
  - pointer capture across reka's portal (Q11);
  - auto-scroll at 120 to 800 pt/s.
- No INBOUND answer asks for it. The question asked about a lens across tabs, segments or rows, and no site asked to open a menu by holding.
- HA's bound, as written: "fine if the lens never commits on release over a row the finger only passed" ([IN HA 1]). D2 commits the row under the finger at release, which is a row the finger passed on its way there.
- atlas: long lists "must not settle on the nearest row" ([IN atlas 1]). Auto-scroll exists only for long lists.
- D2 names nothing that it removes.

**Remedy.**
- Move D2 and D4 to the owner's list, with HA's and atlas's bounds quoted.
- If he wants it, it is opt-in per menu and limited to short menus. Its ledger row names what it removes.
- Ask HA what "a row the finger only passed" means before pass 8 designs the commit.

### O10. A gliding row highlight adds a node for a motion in every menu (major)

**Claim.** D3's gliding highlight adds a node whose only job is to animate, in five components.

**Evidence.**
- U D3: "ADAPT: the highlight glides between rows as L1's mark at rest".
- Today a row is highlighted by its own `data-highlighted` fill. This covers Dropdown, Context, Select, Combobox and Command items (the menu row in `affordance-map.md`).
- A gliding mark is a new absolute node in each menu that exists only to animate, against "nodes or wrappers added for a motion: 0" (`restraint.md:201`).
- Under a mouse the mark trails the pointer by its spring's settle. Under arrow keys and typeahead it glides on every key, which is the case Q16 has not settled.
- P0a rule 4 already covers a highlight moving between rows without a new node: "Two marks of one size trade places in one seat, neither above half strength" (`motion-canon.md:89-91`).

**Remedy.**
- Refuse the gliding row mark.
- Keep each row's own fill, tweened in and out by rule 4, and drop the −1 px lift, as the union says.
- A glide stays possible only under a finger in D2, and only if D2 survives O9.

### O11. Rows that add a facility with no customer and nothing removed (major)

**Claim.** Three rows add facilities that no site asked for and that remove nothing. L6 is a fourth (O5).

**Evidence.**
- U S2 adds a switch that drags across its two slots. No INBOUND answer mentions a switch.
- U M7 adds a scroll edge effect. glass-ui has none ([GI §2]) and no site asked for one.
  - The union's own guard ("never on an ancestor of glass") rules it out wherever the scrolled content holds glass cards.
  - A `mask` on the scrolled content makes it the backdrop root for those cards, and their blur then sees only what the content paints ([IOS §2.2], backdrop roots).
- U D12 adds a lift while a long press runs.
- U L6 adds a rubber band in three hosts (O5).
- The rules:
  - "A public surface, helper, prompt, token, component ... needs a current consumer and evidence. Otherwise delete it." (`docs/precepts/README.md:10-12`)
  - "A seat that adds a piece states what it removes" (`restraint.md:210`).

**Remedy.**
- Each of these either goes to the owner's list or is refused, unless pass 1 finds two sites for it and names what it removes.
- If M7 is kept, its row says which pages it can apply to.

### O12. The slider loupe is kept on a misattributed quote, against two of the union's own refusals (major)

**Claim.** U L12 and S5 take the loupe. They keep a blur in motion and a per-frame custom property that the union refuses elsewhere, and they rest on an owner quote that may concern a different part.

**Evidence.**
- The loupe's clone blurs with velocity: `filter: blur(calc(var(--loupe-vel, 0) * 0.75px))` (`slider/styles.css:569`). U M5 refuses blur in motion, on HA's "no blur in motion" ([IN HA 4]).
- Its magnification `k` and its blur read custom properties written on every frame of a drag (`Slider.vue:185-195`, [GI §6.1]). U §2 lists that write for replacement.
- U L12 cites the owner's words "is slow and unintuitive; redesign multitouch-first" as the loupe's verdict. value.js gave them for "the Extract loupe":
  - it lists that loupe apart from "colour's channel sliders";
  - it calls it "a magnifier, not refraction" ([IN value.js 3, 4]).
- Nothing in the reads shows that Extract uses glass-ui's `Slider` `loupe`, yet pass 6 is scoped around "the loupe redesigned multitouch-first".
- value.js and HA both say no lens over their sliders ([IN value.js 1], [IN HA 1]).

**Remedy.**
- Ask value.js whether Extract is built on `Slider` `loupe`.
- Pass 1 lists the prop's consumers. With fewer than two, the loupe goes in 12.0.0, with the veil.
- If it stays, its velocity blur goes (M5), and `k` stops reading a custom property written each frame.

### O13. Committing on settle delays every tab change until the settle (major)

**Claim.** U L15 says "The commit fires once, on settle", and U §2 repeats it. If "settle" means the spring at rest, every tap waits for the motion before it commits.

**Evidence.**
- The dock clock is 0.21 s. A tap must also wait for L2's lift to finish its rise.
- So the commit lands about a quarter of a second after every tap, on every tab, segment and dock seat on every site. Until then, `aria-selected` and the content trail the mark that the reader can already see.
- The rule for frequent actions: "Frequent actions are fast ... toggle feedback at 200ms or less" (`restraint.md:129-130`).
- The sites asked for something narrower: never a commit for each row or slot passed. value.js: "it settles, then commits", said of a drag across rows ([IN value.js 1]); HA likewise ([IN HA 1]).
- The target is known at release, because the projection chooses it (U L15).

**Remedy.**
- The commit is the decision at release:
  - on a tap, immediately;
  - after a drag, at release, to the projected target;
  - never for a slot passed.
- The mark's settle plays after the commit.

### O14. The ledger counts only removals, and two of them free no consumer bytes (major)

**Claim.** The union counts what it deletes but not what it adds, and part of its removal list frees nothing for the sites.

**Evidence.**
- Q17 lists candidate deletions only.
- Two items on U §2's replacement list cost consumers nothing today:
  - "the struck neck" never shipped ([GI §2]: "none shipped");
  - no component mounts `useLiquidReveal` or `useDockCtaReceive` ([GI §9]), and a consumer that does not import them does not carry them.
- The ADAPT rows that add code carry no cost:
  - the mark's lift, follow, cancel and keyboard paths;
  - the rubber band in three hosts;
  - press, slide and release, with its timers and auto-scroll;
  - a per-release `linear()` generator;
  - the contact scalar;
  - the scroll edge mask;
  - the switch drag;
  - the glyph's growth under the lens;
  - the long-press lift.
- The sites' bounds:
  - HA has 0.2 kB of entry room (71.6 of 71.8 kB, [IN HA 5]);
  - daraksha has about 6 KB in total ([IN value.js 5]);
  - gaggle has 11,282 bytes ([IN gaggle 5]).
- "A seat that adds a piece states what it removes, and the removal outweighs the addition" (`restraint.md:210`).

**Remedy.**
- In the folded union, every ADAPT row names what it removes, or says "nothing".
- Pass 1's ledger counts both sides, in gzipped bytes for each entry a site loads, and counts dead exports apart from shipped code.
- An ADAPT row that removes nothing and has fewer than two sites goes to the owner's list.

### O15. M2 takes a named reka workaround with no exit (minor)

**Claim.** The union takes 11.1.1's exits, which rest on a workaround for reka, without saying when the workaround ends.

**Evidence.**
- U M2 notes that "the presence hold works round reka", then takes 11.1.1's exits.
- The keyframe that paints nothing exists because reka's `usePresence` waits only on `animationName` ([GI §4.2]).

**Remedy.** The row calls it a workaround that ends with Q11's decision on the overlay substrate.

### O16. Equal slots as the default would move boxes in every strip (minor)

**Claim.** U T5 and Q15 make equal slots the default, so that the mark can move by `translate` alone. That changes the layout of every existing strip.

**Evidence.**
- SegmentedTabs sizes slots to their content today ([GI §5]). Equal slots move boxes in every existing strip.
- atlas's suites fail on that: "Box identity: suites fail any box that moves" ([IN atlas 5]).
- Equal slots also widen any strip with one long label, such as HA's worded tabs.

**Remedy.**
- Treat it as a 12.0.0 break and ask the sites before pass 5 adopts it, rather than a default the union sets.
- The width correction on an out-of-flow mark (P0a: 120 ms) stays a candidate.

### O17. Small conflicts with the thesis (minor)

- **U I9, a velocity estimator.** "One velocity estimator ... no second one": if glass-ui builds it, it is a third off-spine motion piece. P7 names keyframes.js as "the ONE motion brain" and reds "A THIRD un-sanctioned off-spine spring/rAF" (`motion-canon.md:277`). Use kf's estimator with an 80 ms window.
- **U I19, still-scroll scheduling.** It adapts rida's still-scroll deferral, which polls page speed every 30 ms ([RI §4]). Safari has had `scrollend` since 26.2 ([IOS §2.1]). Use the event.
- **U I13, scroll-driven animation.** It takes scroll-driven animation "on accelerated properties only". But the dock run's end caps animate `border-*-radius` on that timeline (`run.css:650-670`). The row should say that the caps change.
- **U D16 against U L14 and I2.** D16 considers React Aria's scroll-based sheet, while L14 and I2 refuse scrollers as input. The two differ in one way: the sheet's scroller holds the real content, and no script reads its position. Write that test into the matrix so the passes can apply it.

## The second reading

I read the union a second time against my first list, looking for objections that were wrong, overstated or misplaced.

- **Raised O1 to blocking.** The charter's evidence rule (`CHARTER.md:23`) leaves Q1, Q2 and Q10 undecidable on the plan's engines, so passes 2, 4 and 7 cannot close as planned.
- **Dropped an objection to G2's arithmetic.**
  - A neutral veil composites as `α·v + (1 − α)·x`.
  - `brightness(b)` after `contrast(k)` maps x to `b·k·x + b·(1 − k)/2`.
  - The union's solved values reproduce the measured endpoints.
  - O8 now objects only to the cost in identity.
- **Dropped an objection that M1 (materializing) is ornament.** It is Apple's documented entry, and `backdrop-filter` is on WebKit's always-accelerated list ([IOS §2.3]). It survives only where it stacks in the bud (O7).
- **Dropped an objection to G5's edge.** The union leaves it to Q13, and it refuses stacked lines.
- **Softened O12.** The reads do not show whether Extract uses glass-ui's loupe, so the remedy is to ask, not to assert.
- **Kept O13** after rereading value.js. "It settles, then commits" was said of rows passed in a drag, and the remedy keeps that.
- **Kept O10 as major.** It touches the rows of five components.
- **Merged** two objections about the contact law into O3.
- **Checked O2's premise.** The 27.3 beta note lists `linear()` among the easings "now also accelerated", and [IOS §2.3] infers what that means for 27.2. It is an inference from a release note and is owed to the iPhone. O2's remedy, a fourth way in pass 3, holds either way.

## Summary

| # | Severity | Rows | In one line |
|---|---|---|---|
| O1 | blocking | §4 | Glass is decided on engines that draw no glass; the iPhone comes last; no page reaches the owner |
| O2 | major | §2, I12, Q6 | `linear()` springs run on the main thread in shipping Safari 27.2; pass 3 lacks the Bézier fit |
| O3 | major | §2, F1, F7 | The thesis's contact law and its compositor clause cannot be checked |
| O4 | major | G7, G6 | The clamp's static walk rebuilds the backdrop from computed style; 825 lines |
| O5 | major | L6, L7, Q8 | Gel and swell on controls are decided before the owner rules |
| O6 | major | L1-L4, L9, L7 | One tap starts five animations against a ceiling of two |
| O7 | major | F9, M1, G9, Q10 | The bud changes three properties at once and is born glass on glass |
| O8 | major | G2, G1, Q10 | Gives up the warm ink, which is identity, for one composited change |
| O9 | major | D2, D4 | A gesture system with no customer, against HA's bound as written |
| O10 | major | D3 | A node added for a motion in five components |
| O11 | major | S2, M7, D12 | Additions with no customer; M7 kills the blur of glass cards in content |
| O12 | major | L12, S5 | The loupe is kept on a misread quote, with a blur in motion and per-frame writes |
| O13 | major | L15, §2 | Committing on settle delays every tab change |
| O14 | major | Q17, §2 | The ledger counts only removals, two of which free nothing for consumers |
| O15 | minor | M2 | A named reka workaround taken with no exit |
| O16 | minor | T5, Q15 | Equal slots by default move boxes in every strip |
| O17 | minor | I9, I19, I13, D16 | Small conflicts with the thesis and with P7 |
