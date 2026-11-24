# BM pass 8: critique A (the owner's law and restraint)

Seat: critic A, claude-opus-5-5 (asserted from its own system identity), 2026-11-23. I changed no design, page or source and staged nothing.

I read `CHARTER.md`, `READINGS.md` (nothing published, nothing returned), `UNION.md` whole (pass 8's line in §4; F9, M2, M3, D3, D11 to D16, Q9, Q11, Q12, Q20), `union-fold.md`, `INBOUND.md`, and in `DESIGN.md` §1, §2.1, §3.5, §3.9, §4.3, §4.6, §6.2 to §6.4, §7.4, §7.5, §8.4, §8.9, and pass 8's opening and §10 whole. From pass 8's files I read `bud/P8-present.src.html` whole, `bud/bud.json`, `bud/bud.mjs`, every sketch in `bud/sketch/`, `pass-7/fold.md`, and the strips `check-all/P8-present-390-light.jpg`, `-s1-light-grow.png` and `-s4-b-light.png`. `pass-7/critique-A.md` gave the form.

I re-read the sources the objections rest on:

- **The precepts.** `restraint.md` whole; `motion-canon.md:31-104`, `:135-154` (P2, P3), `:200-225`, `:317-334`; `affordance-map.md:57-100`.
- **BL.** `waves/W-B.17.md:110` (R-14); `audit/INBOUND.md:146` (O-171), `:154` (O-179), `:288` (O-313), `:328-329` (O-349, O-350).
- **glass-ui master.** `reveal.css:40-130`, `:267-292`; `animations.css:150-250`; `overlay-plate.css:70-110`, `:340-356`; `focus-veil.css` whole; `dot-ring.css:104`; `menu/DropdownMenuContent.vue:30-36`; `sheet/motion.ts:1-70`; `sheet/detents/use.ts:60-62`, `:168-195`; `sheet/SheetContent.vue:310-323`; `composables/motion/index.ts:20`; commit `7e22fd6f4`. I also read `release/11.1.1`'s `animations.css` and its CHANGELOG.
- **reka-ui 2.10.1.** `Popper/PopperContent.js:108`, `:184`, `:207`; `DropdownMenu/DropdownMenuTrigger.js`; `Dialog/DialogTrigger.js:34`; `Dialog/DialogContentModal.js:53`; `shared/useHideOthers.js`.
- **Elsewhere.** slides `docs/tranches/NPIG/DESIGN-v3.md:54-62`, `:767`.

Each objection was made, then its evidence was re-read. The ones that did not survive are listed at the end.

## Objections

### A8-1 (major). The birth rule's "one prop" moves every dock seat's menu off its seat, and the page draws a geometry the prop cannot give

**Claim.** §10.2: "The rule is one prop. reka-ui 2.10.1's `PopperContent` takes a `reference` … A trigger on a plate passes the plate, so the menu's `sideOffset` … is measured from the plate's outer edge, and the grow's strip is the plate's height. It is unmeasured and under 100 B" (`DESIGN.md:1439`). For C and E on the dock the gain is stated as 4 px: "Today's menu from a dock seat already rests at the dock's top edge, with no gap … The rule adds 4 px" (`:1443`).

**Evidence.**
- reka passes `reference` to floating-ui as the anchor itself: `const reference = computed(() => props.reference ?? rootContext.anchor.value)` and `useFloating(reference, …)` (`PopperContent.js:207-208`). Side, alignment and the anchor's size variables all come from it (`:184`, `rects.reference`).
- glass-ui's menu aligns to the start: `align: "start"` (`DropdownMenuContent.vue:33`). With the dock as reference, every seat's menu starts at the dock's start edge. A seat at the dock's far end opens its menu at the other end.
- That breaks O-171's "the `data-reveal="menu"` plate grows from its trigger" (BL `audit/INBOUND.md:146`). It also moves a box on open, and atlas's suites "fail any box that moves on hover, open or fold" ([IN atlas 5]).
- A Select on a plate takes the plate's width as its floor: `min-inline-size: min(max(var(--overlay-min-width), var(--reka-popper-anchor-width)), …)` (`overlay-plate.css:350-352`).
- P8-present does not use reka. It centres each menu on its own seat (`m.style.left = … cx - 100`, `P8-present.src.html`, section 1). So the owner would read a geometry that neither the prop nor today's start alignment produces.
- For the dock, a seat anchor with a side offset of the seat's inset plus 4 px gives the same 4 px gap. It costs no bytes and leaves alignment alone.

**Remedy.** Keep the trigger as reka's anchor, and set the side offset from the host's inset (the dock knows its own). Or, if a general rule is needed, use a virtual reference whose inline extent is the seat's and whose block extent is the plate's, then measure it and count its bytes. State the alignment the page draws, and draw the one the library will ship.

### A8-2 (major). The presence that replaces the paint-nothing keyframe never unmounts an overlay that holds an infinite animation, and a modal then keeps the page `aria-hidden`

**Claim.** §10.4 item 1: "on close waits for the element's running animations, CSS transitions included (`getAnimations({ subtree: true })`), then unmounts … Nothing is written per frame and no keyframe is held" (`DESIGN.md:1470`). The sketch awaits `Promise.allSettled(node.getAnimations({ subtree: true }).map((a) => a.finished))` (`usePresent.next.ts:20`).

**Evidence.**
- An infinite animation's `finished` promise never settles. The library ships one for exactly the state the owner's law asks every control to show. The busy dot ring runs `animation: glass-dot-ring-redistribute var(--dot-ring-spin) linear infinite` (`dot-ring.css:104`). `affordance-map.md:77` puts it in a busy control's glyph seat. `restraint.md:173` and `motion-canon.md:27-28` require large elements to "communicate progress, loading, and intent with transitions".
- So a Dialog closed while its confirm button is busy, or a menu with a loading row, stays mounted indefinitely.
- For a modal, reka hides the rest of the page from assistive technology for as long as the content element is mounted: `useHideOthers` undoes only on unmount (`useHideOthers.js:13-25`; `DialogContentModal.js:53`). That is the class of Home Assistant's LF-38, "reka-ui leaves home-assistant aria-hidden after three sheets" ([IN HA 5]). §10.4 item 3 claims "No path in this section adds a call to reka's `hideOthers`". This path keeps one in force.
- Nothing fails loudly: the overlay sits at opacity 0, mounted. That is the masking the brief and §1 refuse.

**Remedy.** Wait only on the exit's own finite legs, the element's own transitions or animations whose computed end time is finite. Never wait on the subtree. Say in §10.4 that a busy ring inside an overlay does not hold it.

### A8-3 (major). Sheets as scroll silently drop two things today's sheet does: a mouse drag on its grip, and a live page above a peeking sheet

**Claim.** §10.5: "What a person gets is iOS's own drag, fling and rubber band … The props (`detents`, `v-model:detent`) stay; the engine under them changes" (`DESIGN.md:1490`). It also says: "A tap above the panel dismisses through reka's own touch path … so a drag there scrolls and does not dismiss" (`:1488`).

**Evidence.**
- **The mouse.** Today's engine takes any primary pointer, mouse included, on the grip or the dialog header: `if (event.button !== 0 …) return` with no pointer-type test, and `DRAG_HANDLES = '[data-slot="sheet-detent-handle"], [data-slot="dialog-header"]'` (`sheet/detents/use.ts:62`, `:170-193`). A native scroller moves under a wheel, a trackpad or a finger, never under a mouse drag. The pass's own check moved sheet B at 1440 px "by a wheel" (`DESIGN.md:1559`).
- So on a desktop (Home Assistant's desktop browser; gaggle's 13 detented sheets, `pass-8/fold/hosts.json`) the grip still says "drag me", and the drag does nothing. BL booked the same fault on Carousel as a defect: "a mouse drag does nothing" (O-350 row 6, `audit/INBOUND.md:329`). Restraint asks that every element explain itself or go (`restraint.md:89`).
- **The page above.** `.sheet-scroller { position: fixed; inset: 0; overflow-y: auto; … }` has no `pointer-events` rule (`sheet-scroll.next.css:11-18`). With its 100 dvh spacer, it lies over the whole page above the panel.
- A detented sheet exists to sit "over a live page": "a peek barely dims and a full commits hard, which is what makes a partly-open sheet read as a sheet over a live page rather than as a modal that failed to arrive" (`sheet/motion.ts:59-60`, the rung-scaled scrim at `:54-69`). Sheets can be non-modal (`SheetContent.vue:318`, `data-modal="false"`).
- Under B, a tap on that page reaches the scroller, and a drag there moves the sheet. §10.5's scrim, "a state, in and out", does not say whether the rung-scaled dim survives.

**Remedy.** Name both losses in §10.5 and §10.11. Keep a mouse follow on the grip (rule 3: one `scrollTop` write per `pointermove` for `pointerType === "mouse"`, released to the snap, one listener, counted). Or drop the grip on a fine pointer and say so to the owner. Let the page through above the panel (`pointer-events: none` on the scroller and the spacer, `auto` on the panel), and read whether WebKit still scrolls it from the panel. Say whether the scrim keeps its rung law. Ask gaggle and atlas whether any of their detented sheets are non-modal.

### A8-4 (major). Q22 leaves out the cheapest one-blur form, and proposes the one that keeps the library's costliest paint and takes the glass off the dialog

**Claim.** §10.6: "Proposed for 11.3.0: B, the veil is the one blur. Where the veil sits under a dialog, the dialog's plate samples nothing and is its tint alone over the veil's frosted pool … That is one blur and about 2.96 M device pixels" (`DESIGN.md:1500`). P8-present's section 4 offers A, B and C, where C is "a dim and a near-solid plate".

**Evidence.**
- `bud.json`, `q22`: A today 3,762,720 device px; B 2,962,440; C 0. The form missing is the plate's own blur over a veil that only dims. Its cost is the difference, A − B = **800,280 device px**: one blur, about 27 % of B's.
- The veil already carries its dim as a background (`focus-veil.css:72-74`, `background: var(--glass-focus-veil-dim)`). That form needs only `backdrop-filter: none` on the veil under a dialog, the same size of rule as B's `dialog-veil.next.css`.
- The library's own file calls this layer "the single most expensive thing this library can paint" (`focus-veil.css:21-23`). UNION S6 refused it for the slider on that ground and on Home Assistant's WKWebView bound ([IN HA, bounds; HA 2]).
- B keeps that layer and makes the dialog a tint. The form left out keeps the dialog as glass, which is the owner's "these modals should be more glassy" ([IN HA, 2026-11-15]), and it removes the full-viewport sample. Restraint's order is to cut the layer (`restraint.md:210-212`).
- Neither the count nor the page lets the owner see that form.

**Remedy.** Add it as D: the veil a dim, the plate its one blur. Count it in `bud.json` and put it on P8-present's section 4 in Light and Dark. Weigh B against D by pixels for Home Assistant's question (§10.12). If B stays the proposal, say what it buys over D.

### A8-5 (major). The side sheet's entry shear, which the owner liked and a site asked for, is refused by a study reason without his word

**Claim.** §10.5: "The entry shear (`--sheet-enter-skew`, `sheet/motion.ts:32-41`) is refused: a second property on the entrance that neither P0a's amounts nor the records hold" (`DESIGN.md:1492`). §2.1's Sheet row and §10.11 repeat "the entry shear refused" and "no shear".

**Evidence.**
- O-179: "G13: the `--sheet-enter-skew` token on side sheets (the owner likes the shear). → W-E.3 addendum, in 11.1.0" (BL `audit/INBOUND.md:154`).
- Parkway's design sent it to glass on purpose: "Arm B's drawer shear is not built locally. It goes to glass as a token (G13)", described as "the 'skew and matrix' motion the owner liked" (slides `NPIG/DESIGN-v3.md:54-62`, `:767`). It shipped in 11.1.0, set to 0 by default (`7e22fd6f4`).
- §1: "a part the owner ordered is never cut by a study law" (`DESIGN.md:15`). Pass 5's and pass 7's folds put each such conflict to him with no default (§6.4 item 3; §9.2, fold A7-1).
- The stated reason does not reach the ceiling. A slide plus a shear is two properties on one node, which the ceiling allows (`restraint.md:202`). P0a's amounts table has no row for a shear, which does not refuse it.
- No census of the token's consumers was run: `pass-8/fold/hosts.json` holds no `skew`. Its removal is also a public-token break for 12.0.0.

**Remedy.** Withdraw the refusal. Put the shear to the owner beside O-179, with its count. Census `--sheet-enter-skew` across the sites, and list its removal in 12.0.0 only if he rules against it.

### A8-6 (major). The panel rule's delay reads a variable the trigger never sees, so it is always 0 s, and §10.8's counts rest on it

**Claim.** §10.2: "the trigger's held fill … waits for the panel to land (`bud.next.css`, a `transition-delay` of the entering clock), so a press that opens a panel runs at most two animations at once under C and E" (`DESIGN.md:1448`). `bud.json`, `counts.fade_E.maxAtOnce: 2`.

**Evidence.**
- The sketch writes `[aria-expanded="true"]::after { transition-delay: var(--reveal-clock, 0s); }` (`bud.next.css:20-22`).
- `--reveal-clock` is declared only on `.glass-reveal`, the portalled content (`reveal.css:50`, `:100`, `:112`, `:125`). A dock seat or a button is not its descendant, so the delay resolves to 0 s.
- Under E the held fill then rises with the panel's opacity and scale: 3 at once, past the ceiling's 2 (`restraint.md:204`). The page hides this, because it sets its own `--held-delay` on the seat from script (`P8-present.src.html`, `seat.style.setProperty("--held-delay", …)`).
- If the delay is fixed by a root token, the selector is still too wide. It matches every disclosure trigger (accordion, collapsible, combobox). A `transition-delay` on `::after` also delays every change on that pseudo-element while it matches.
- The seat's hover plate and press tone live on the same `::after` (§9.3, fold A7-10). So while a menu is open, the trigger's hover would answer the pointer 205 to 370 ms late, against law 11 and P0a's hover clock (`motion-canon.md:75`).

**Remedy.** Scope the rule to `[aria-haspopup][aria-expanded="true"]`. Read the register's own root token per popup kind (`--enter-menu-clock`, `--enter-overlay-clock`). Hold only the leg into the held strength, for example a separate `opacity` leg on the held fill alone, so the hover still answers at once. Recount §10.8 from the sketch, not from the page.

### A8-7 (major). In 11.3.0 the pass's additions outweigh its removals, against Home Assistant's 0.2 kB, while the removal that would pay for them waits for 12.0.0

**Claim.** §10.9: "upper bounds on both sides, so no net is claimed" (`DESIGN.md:1526`). The presence lands in 11.3.0, removing 110 B. `useSpringMount` (791 B) waits for 12.0.0 (`:1530`). The slide removes nothing (`:1532`).

**Evidence.**
- 11.3.0 as booked adds ≤ 241 (presence) + ≤ 158 (`bud.next.css`) + < 100 (the reference) + ≤ 377 (the slide) + ≤ 115 (the veil) ≈ **≤ 991 B gz** (`bud.json`, `bytes`).
- It removes 110 B and "the per-register exit readers … unmeasured" (`DESIGN.md:1531`).
- Law 9 and `restraint.md:210`: "the removal outweighs the addition". Home Assistant's bound: "entry 71.6 of 71.8 kB gz … so a lens must come from the library's existing parts or replace something" ([IN HA 5]). daraksha: "one that loads on intent … would fit; one added eagerly to every route would not" ([IN value.js 5]).
- `usePresent` replaces `useSpringMount`'s job for Dialog and Sheet. The composable is public on `/motion` (`composables/motion/index.ts:20`), so deleting its export is 12.0.0's. Dialog and SheetContent can still stop calling it in the release that ships `usePresent`, which frees its bytes for every site that opens one. That is how 11.1.1 changed its exits in a patch.

**Remedy.** Move Dialog and SheetContent off `useSpringMount` in 11.3.0, beside the presence, and keep the export's deletion in 12.0.0. Measure the exit readers. Ship the slide as an import on the first touch `pointerdown` in a menu that fits. State the 11.3.0 net per site entry, Home Assistant's first, or say which part waits.

### A8-8 (minor). The fade-only close is named as the default against an owner order the pass says may cover it, and it breaks P3's exit clause without listing it

**Claim.** §10.3: "Proposed: everything that leaves by fading leaves in 120 ms … by its opacity alone … The menu's clip no longer runs back" (`DESIGN.md:1462`). And: "If the owner reads it as covering the close too, 11.1.1's clip stays on the way out" (`:1464`).

**Evidence.**
- O-171 is "owner order 2026-11-05 eve: every height and width animated, no needless fade" (BL `audit/INBOUND.md:146`). A close by fade alone animates no height.
- §6.4 item 3 and the fold of A7-1 put each such conflict to the owner "with no default named" (`DESIGN.md:759`, `:1268`). §10.3 names one, and §10.11 lists it as a decision.
- P3: "Every enter/exit pairs opacity WITH scale/translate in the SAME transition … A bare opacity fade with no transform reads flat" (`motion-canon.md:148-154`).
- P0a rule 3 (2026-11-12) says the out "fades and does not slide back" (`:88`). That is the later ruling for a slide. P3's pairing still binds a scale, and §4.6's amendment list does not name P3.

**Remedy.** Put the menu's close to the owner as A against B, with no default, as §6.4 did for the open. Add P3's exit clause to the amendments pass 10 drafts, citing P0a rule 3 as the later ruling.

### A8-9 (minor). The exit count says 2 for every presentation; a dialog leaves on 3, and its veil's clocks are designed nowhere

**Claim.** §10.8: "Any presentation leaving | 2 (its opacity; the trigger's held fill out)" (`DESIGN.md:1516`).

**Evidence.**
- reka's DialogTrigger sets `aria-expanded` (`DialogTrigger.js:34`), so it takes R-14's held fill (`W-B.17.md:110`). A dialog therefore leaves on its own opacity, the veil's opacity and the trigger's held fill: 3, the same as its entrance (`:1520`). A side sheet leaves on its `translate`, its scrim and the held fill.
- The veil keeps its own clocks: in over 300 ms after a 100 ms lag, out over 200 ms (`focus-veil.css`, the base rule and `[data-engaged]`). §10.6 proposes neither.
- P8-present plays the veil in over 200 ms with no lag and out over 120 ms (`.veil`, `.veil.on`). So the letters for section 4 are read on timings no design states. In the library the frosted pool would also outlast the 120 ms dialog by 80 ms.

**Remedy.** Count each leaving surface with its veil or scrim and its trigger. Propose the veil's in and out clocks in §10.6 beside the dialog's. Draw on the page the clocks that §10.6 proposes.

### A8-10 (minor). The dialog's bud is struck as a decision, with no letter for the owner

**Claim.** §10.6: "This overturns §2.1's 'buds from the button that opens it' for a centred dialog … a grow or windows from a button across the screen would travel further than any P0a row allows" (`DESIGN.md:1503`).

**Evidence.**
- UNION D15 adapted it from Apple: "dialogs morph out of the buttons that present them" (323). The brief asks that the dock's animations be "generalized over and suffused into our UI". Q9 is "settled by pass 8, on R5 and its bud page; the owner" (`UNION.md:259`).
- P8-present shows only the 0.96 entrance for dialogs, so the owner cannot rule on what was struck.
- The travel argument holds on a phone: a seat at the foot of the screen to the centre is about 350 px, past P0a's 320 px point (`motion-canon.md:98-99`). It is still a reading of a grammar against an iOS canon, which §1 leaves to him.

**Remedy.** Keep the proposal. Add one line to the owner's list, or one letter on P4-bud: the dialog's bud from its button, with the travel and the count.

### A8-11 (minor). Under C a context menu grows from nothing

**Claim.** §10.4: ContextMenu's "anchor is the press point, whose height is 0, so today's strip is a line at the press point. **Proposed:** it takes whatever lane the owner gives menus, about the press point" (`DESIGN.md:1480`).

**Evidence.**
- C's first frame is `inset(calc(100% - var(--reka-popper-anchor-height, 0px)) …)` (`animations.css:205-214`). With a height of 0, only the bleed band shows, which is the shadow with no plate.
- P0a: "a thing that appears: from 0.8 to 0.96 of its size, or 4 to 8 px of travel. Never from nothing" (`motion-canon.md:66`). The pass states the fact but not the breach. If the owner picks C for menus, context menus inherit the breach unannounced.

**Remedy.** Name the breach. Give C a seed for a press-point anchor (a row's height), or route context menus to E whatever lane menus take, and put that choice beside the menu lane.

### A8-12 (minor). Sheet B has no reduced-motion form for its close

**Claim.** §10.5 and the sketch: "Closing from a control is the platform's smooth scroll to the closed rung" (`DESIGN.md:1488`; `useSheetScroll.next.ts:38`, `scrollTo({ top: 0, behavior: "smooth" })`).

**Evidence.**
- Under Reduce Motion, P6 strips spatial travel and keeps a fade (`motion-canon.md:200-206`). Law 7 says it is "a short fade, never a cut" (`DESIGN.md:25`).
- A smooth scroll is a full-height travel that the page cannot shorten. The open's reduced form (rule 1) is covered by §4.3, but the close and the rung change by control are not. Neither §10.5 nor the sketches mention Reduce Motion.

**Remedy.** Under Reduce Motion, close with `behavior: "instant"` inside rule 2's opacity dip (out, land while hidden, in). State it in §10.5. A user's own drag and fling stay, as rule 3's follow does.

## Dropped on the second reading

- **"`present`'s 98 % at 205 ms misses Home Assistant's 200 ms."** The canon reads a spring's quick arrival at 90 % (`motion-canon.md:321-326`), which is 136 ms.
- **"11.1.1's exits came from an owner order (O-313(c), nearer 150 ms)."** O-313 is the animation audit's row (O-305), not the owner's (`audit/INBOUND.md:288`), as §10.3 says.
- **"The held fill on an open trigger is a second mark for one state."** W-B.17 R-14 rules a trigger with its popup open as a control with no other on-mark (`W-B.17.md:110`). That is BL's rule, and it is listed in §3.9.
- **"Two rows trade their fill by a simultaneous crossfade, against P0a rule 4."** Rule 4's half-strength clause binds a trade in one seat (`motion-canon.md:89-91`). Two rows are two seats, and its first clause, never two at full strength, holds.
- **"A 120 ms exit fails law 7 at 30 fps."** Law 7 is measured in milliseconds (none under 83 ms, no more than two fifths per 16.7 ms, `DESIGN.md:25`). At 30 fps the steepest frame carries 0.315, under two fifths.
- **"Sheet B's rubber band is Q8's stretch."** UNION I1 takes native scroll with its bounce. Q8 is the stretch the page would draw.
- **"The stand-in dialog's two equal buttons are restraint's equal-weight tell."** They are a prop for the veil's reading, and an ink there would add a variable to the letter.
- **"120 ms is not six tenths of the grow's entrance."** For a box that resizes, P0a's out is "the same, or shorter" (`motion-canon.md:77`).
- **"A dock seat's DropdownMenu takes the dock's width."** The menu role's floor is `--overlay-min-width` (`overlay-plate.css:101-103`). Only Select reads the anchor's width (`:350-352`), so A8-1 keeps that point for Select alone.

## Summary

Pass 8 says in its first line that no reading has returned. It keeps every decision provisional, adds no ornament, refuses the yielding neighbour, keeps Q20 at no, and sends the slide's listeners and the platform's timing to the owner. Its fold of pass 7 lands where `pass-7/fold.md` says.

Seven of its proposals do not stand as written:

- The birth rule's reka `reference` re-aligns every dock menu to the dock's start (A8-1).
- The presence hangs on the busy ring and keeps a modal's page `aria-hidden` (A8-2).
- Sheet B drops the mouse drag and the live page above a peek, unnamed (A8-3).
- Q22 omits the 0.80 M px one-blur form and keeps the costliest paint (A8-4).
- The owner-liked shear is refused on a study reason (A8-5).
- The panel rule's delay resolves to 0 s, so E's press count is 3 (A8-6).
- 11.3.0 adds about 1 kB against Home Assistant's 0.2 kB while `useSpringMount`'s 791 B waits (A8-7).

Five minor points concern the close's default against O-171 and P3, the exit counts and the veil's clocks, the struck dialog bud, a context menu grown from nothing, and sheet B under Reduce Motion.
