# BM pass 8: Critic B (production iOS Safari and the evidence)

Seat: Critic B, claude-opus-5-5 (asserted from its own system identity), 2026-11-23. I judged pass 8 against its line in UNION §4 ("Presentations … decisions on Q9, Q11 and Q12"). I read CHARTER, UNION, union-fold, INBOUND, READINGS, DESIGN §2.1 and §8 to §10, and pass 8's working files: `bud/bud.mjs` and `.json`, every sketch under `bud/sketch/`, `bud/P8-present.src.html`, `fold/hosts.json` and the crop outputs. I re-read the source each claim cites: reka-ui 2.10.1's `PopperContent.js`, `MenuItemImpl.js`, `MenuItem.js`, `TooltipTrigger.js`, `DismissableLayer.js` and `utils.js`, `DialogContent.js`, `DialogContentModal.js`, `DialogContentImpl.js` and `useBodyScrollLock.js`. In glass-ui I re-read `DropdownMenuContent.vue`, `overlay-plate.css`, `DialogContent.vue`, `ModalOverlay.vue`, `ModalScrim.vue`, `surface/resolve.ts` and `focus-veil.css`, plus `release/11.1.1`'s `motion-registers.css`, `scheme-spring.css`, `reveal.css` and CHANGELOG, `motion-canon.md` P0a, and BL `audit/INBOUND.md` O-171, O-260, O-305, O-313 and O-349.

I changed no design, page or source, and staged nothing. I added two check scripts beside the pass's own and ran them under `guarded`, headless, with one browser per run, a context per cell and everything closed in `finally`:

- `critique-B-check.mjs`, run in Chromium and in Playwright WebKit (`--exclusive webkit`), output in `critique-B-check-{chromium,webkit}.json`.
- `critique-B-snap.mjs`, the rung variants plus P8-present's own sheet B, run in Playwright WebKit (`--exclusive webkit`), output in `critique-B-snap-webkit.json`, and in Chromium for parity (`critique-B-snap-chromium.json`).

Playwright WebKit is not Safari and draws no backdrop blur. These cells read script, scroll position and observer timing, never paint.

**No reading has returned, and no page is published** (`READINGS.md`: "Pages published: (none yet)"; PROGRESS 2026-11-23 10:16). Every pass-8 decision is a proposal, provisional until pass 9.

## Objections, after the second reading

Each objection was made, then re-read against its evidence. Three were dropped and are listed at the end.

### B8-1 (blocking). The native-scroll sheet does not open in Playwright WebKit: it rests at 0 and the sketch's observer closes it

- **Claim (§10.5, §10.10).** "The sheet opens at its first rung before its first paint". The page check read sheet B "rest at 85 %", in headless Chromium only.
- **Evidence.** `critique-B-check.mjs` transcribes `sheet-scroll.next.css` and `useSheetScroll.next.ts`: zero-height, absolutely placed rung snap areas; `scrollTop` written to the 0.40 rung at mount; the observer and its thresholds. In WebKit the scroller rests at **0** whether the write runs at mount or in a rAF, which is how P8-present's B writes it (`P8-present.src.html:334`). The observer reports a close 10 ms (mount) and 1 ms (rAF) after load (`critique-B-check-webkit.json`, `openAt_mount`, `openAt_raf`). In Chromium both rest at 0.40. `critique-B-snap.mjs` separates the cause in WebKit (`critique-B-snap-webkit.json`): with `scrollTop` written to 0.40, the sketch's zero-height absolute rung rests at **0**, while a 1 px absolute rung and an in-flow rung both rest at **0.40**. WebKit drops a zero-height snap area. Chromium keeps all three at 0.40 (`critique-B-snap-chromium.json`), which is why §10.10's check, run in Chromium only, read the sheet as working.
- **P8-present itself.** Its sheet B uses the same construction (`:128-129`, `:331-345`; the rAF write at `:334`). Run as the page check wraps it, in Playwright WebKit at 390 px, sheet B rests at 0 with its readout "Closed" after load, and still at 0, "Closed", after its Show button. In Chromium it rests at 40 % both times (`critique-B-snap-{webkit,chromium}.json`, `p8presentSheetB`). Playwright WebKit and Safari share WebCore's snap-offset logic (an inference; Safari itself is unread). If Safari behaves the same way, the owner's section 3 shows a sheet B that will not open. His letter would then read a construction fault, not the design.
- **Remedy.** Give each rung a snap area WebKit keeps: in flow, or at least 1 px tall. Do it in the sketch and on the page, and rerun section 3 in Playwright WebKit (exclusive) before the orchestrator publishes P8-present. The observer must not take a callback that arrives before the opening scroll lands as a close.

### B8-2 (blocking). `usePresent` never unmounts an overlay that holds an infinite animation, and reka keeps the page `aria-hidden` and unclickable while it waits

- **Claim (§10.4 item 1).** "on close [glass-ui] waits for the element's running animations … then unmounts. … Nothing is written per frame and no keyframe is held."
- **Evidence.**
  - The sketch waits on `Promise.allSettled(node.getAnimations({ subtree: true }).map(a => a.finished))` (`usePresent.next.ts:20`). An infinite animation's `finished` never settles. With a spinner inside, the transcribed close path is "still mounted after 3000 ms" in both engines, and "unmounted" without one (`critique-B-check-*.json`, `presentWithSpinner`, `presentPlain`).
  - glass-ui ships infinite animations a dialog, sheet or menu may hold: `Skeleton.vue:147`, `:221`; `StatusDot.vue:269`; `TypewriterText.vue:246`; `dot-ring.css:104`; `track-flow.css:53`; the shimmer utilities (`literals.css:45-48`).
  - The sketch binds `:force-mount="present"`. reka then holds the content present (`DialogContent.js:47`, `present: forceMount || open`). While it is present, `DialogContentModal.js:52-53` keeps `hideOthers` on the rest of the page. `DismissableLayer.js:86-93`, with `disableOutsidePointerEvents` defaulting to true (`DialogContentModal.js:20-23`), keeps `body` at `pointer-events: none`.
- **Failure.** Close a Dialog that holds a Skeleton, and the page behind stays `aria-hidden` and takes no pointer. This is Home Assistant's LF-38 ([IN HA 5]) made deterministic. Today's `useSpringMount` always terminates.
- **Remedy.**
  - Wait only on the transitions and animations the close itself started, for example those whose `transitionProperty` or name is the exit's, or on the content's own `transitionend`.
  - Bound the wait by the exit clock.
  - Then read the Skeleton cell again.

### B8-3 (major). The sheet's observer writes the detent mid-drag and before rest, while §10.5 and the question to gaggle say the opposite

- **Claim.** §10.5: one observer "reports the rung it rests on". §10.12, to gaggle: "`v-model:detent` changes when the sheet comes to rest on a rung, not while it is dragged."
- **Evidence.**
  - A finger held at 0.64, past the 0.625 basin edge, with snap off as the platform does while a finger is down: the observer writes 0.85 in both engines (`heldPastEdge`).
  - A smooth scroll from 0.40 to 0.85: the rung is written 243 ms before `scrollend` in Chromium (397 against 640 ms) and 117 ms before it in WebKit (439 against 556 ms) (`smoothToNextRung`).
  - The sketch's callback writes `opts.rung.value` on every crossing (`useSheetScroll.next.ts:28-31`).
  - P8-present's readout does the same (`:340-342`), so the owner's page shows "Rests at 85 %" under a finger that has not let go.
- **Remedy.** Correct the gaggle question and §10.5's wording, or commit the rung on `scrollend` (Safari 26.2) and name what does it below the 17.5 floor. Say that any watcher which scrolls the sheet to its `v-model` would fight a finger mid-drag.

### B8-4 (major). §10.2's "one prop" moves the menu's alignment and width, not only its side offset

- **Claim.** "A trigger on a plate passes the plate, so the menu's `sideOffset` … is measured from the plate's outer edge, and the grow's strip is the plate's height. It is unmeasured and under 100 B."
- **Evidence.**
  - reka hands `reference` to floating-ui as the anchor for every middleware (`PopperContent.js:207`). Its size middleware writes `--reka-popper-anchor-width` and `-height` from `rects.reference` (the same file, the `size` block).
  - glass-ui's menu aligns `start` (`DropdownMenuContent.vue:33`) and floors its width at the anchor's: "A plate is at least as wide as its anchor" (`overlay-plate.css:70-82`, `:350-353`).
  - So a seat's menu, given the dock plate, aligns to the dock's start edge and is at least as wide as the dock, up to the cap. glass-ui's `DropdownMenuContentProps` has no `reference` today (`:16-18`).
  - P8-present places its menu by hand from the seat's centre (`P8-present.src.html:240-243`), so neither the page nor its check could show this.
- **Remedy.** Pass a virtual reference: the seat's inline extent with the plate's block edge. Or offset by the seat's inset plus 4 px. Then measure it.

### B8-5 (major). The touch slide's Safari mechanism is unread, and P8-present's section 2 does not exercise it

- **Claim (§10.4 item 2).** The lift commits through "reka's own `pointerup`", which "clicks a row the press did not start on (`MenuItem.js:57-61`)". The Chromium read "the lift's `pointerup` reached Garage … as the first listener intends", and only the second try stays the owner's reading.
- **Evidence.**
  - reka's commit is the row's own `onPointerup` (`MenuItem.js:57-61`). It fires on the row under the finger only if the engine retargets a touch's `pointerup` after `releasePointerCapture`.
  - P8-present commits through its own `document` `pointerup` and `elementFromPoint` (`P8-present.src.html:272-276`). That chooses the row under the lift whether or not the capture was released.
  - So a "yes" from the owner confirms the page's path, not glass-ui's. Retargeting after release in iOS Safari is read nowhere in the study. Only Chromium read it.
- **Remedy.** Make section 2 commit as reka does: a per-row `pointerup` that clicks only when that row did not take the press. Show the `pointerup`'s target in the readout, so the owner's yes or no reads the mechanism the design ships.

### B8-6 (major). At 30 fps the 120 ms exit is O-313(c)'s fault again, and §10.3 does not say so

- **Claim (§10.3).** "120 ms is inside all three bounds … its steepest frame carries 0.158 of the fade, under 11.1.1's fifth and P0a's two fifths. In Low Power Mode's 30 fps it is 3.6 frames at 0.315 each." `bud.next.css` calls 11.1.1's bound met "at its tightest".
- **Evidence.**
  - UNION discrepancy 1 and I20 design for 30 fps in Low Power Mode.
  - O-313(c), the audit finding behind 11.1.1's exits, is "Every exit loses a fifth to a third of its opacity in its first frame" (BL `audit/INBOUND.md:288`).
  - 11.1.1 promises "no single frame takes more than a fifth of it" (CHANGELOG, `release/11.1.1`).
  - P0a requires a leg "at least five frames long" (`motion-canon.md:104-106`).
  - At 30 fps a 120 ms exit's steepest frame takes 0.315 over 3.6 frames (`bud.json`, `exitClocks`): above a fifth and under five frames. 0.315 is the steepest frame, not "each".
  - Meeting a fifth at 30 fps needs about 190 ms (0.211 at 180 ms, 0.171 at 222), above HA's 150 and P0a's 120.
- **Remedy.** State that the three bounds cannot all hold at 30 fps, and put the trade to the owner with M3. The Low Power Mode reading is owed to his iPhone.

### B8-7 (major). Q22's sketch matches nothing in glass-ui's Dialog, and section 4's veil is not glass-ui's veil

- **Claim (§10.6).** "B, the veil is the one blur … (`dialog-veil.next.css`, ≤ 115 B)."
- **Evidence.**
  - The sketch's selectors are `.glass-focus-veil ~ [role="dialog"].glass-overlay-plate` and `.glass-focus-veil + * [role="dialog"].glass-overlay-plate`.
  - In glass-ui the veil is a `<span>` inside the scrim (`ModalOverlay.vue:87`), and the dialog is the scrim's sibling in the portal (`DialogContent.vue:195-200`). The dialog's class is `glass-floating` (`surfaceClass("floating")`, `surface/resolve.ts:19`; `DialogContent.vue:180-183`), not `glass-overlay-plate`.
  - Neither selector matches, so the plate keeps its blur, and the ≤ 115 B prices a no-op.
  - P8-present's veil frosts the whole stage with no mask (`P8-present.src.html:135-137`). glass-ui's veil frosts a graded pool around the dialog, "a fixed `--glass-focus-veil-core-x/-y` 13rem core plus a 7rem bloom" (`ModalOverlay.vue:20-21`; `focus-veil.css:1-10`), and leaves the page beyond the bloom untouched. The owner's letter for B would therefore judge a look glass-ui does not ship.
- **Remedy.** Key the rule on an attribute the Dialog sets when it passes `veil`, and re-measure it. Draw the veil's x- and y-ramps on the page.

### B8-8 (major). Q12's fit with reka is asserted, not read, and the reading named to settle it cannot settle it

- **Claim.** UNION Q12 asks "Does a native scroller fit reka's Dialog, its focus trap and the detent model?" §10.11 makes Q12 "provisional until P8-present's third section returns", and the sketch says "a tap on the scroller above the panel is outside the content and closes; a drag there scrolls".
- **Evidence.**
  - P8-present is "a model drawn by this page alone, not glass-ui": no reka Dialog, no focus scope, no dismissable layer.
  - reka's modal layer sets `body` to `pointer-events: none` while present (`DismissableLayer.js:90-93`). The sketch's scroller sits outside the content and is not given `pointer-events: auto` (`sheet-scroll.next.css`), the line glass-ui's own scrim needs for the same reason (`ModalScrim.vue:24`). As sketched, the region above the panel takes no pointer, so "a drag there scrolls" does not follow (unread).
  - §10.13 owes a scrolling-content prototype on `bm/study`, but not this fit.
- **Remedy.** Owe a glass-ui prototype of the detented sheet inside reka's Dialog, on `bm/study`, before pass 9. Run it in Playwright WebKit for behaviour and then on the phone, and name it as Q12's reading for the fit.

### B8-9 (major). P8-present's ask is not answerable in one look, and section 4's question does not say which release it decides

- **Evidence.**
  - The page asks for six answers in four sections, with Dark and Busy page toggled (`P8-present.src.html:153`, `:163-185`).
  - Section 1 sends the owner to Safari's tab overview to compare a close.
  - Section 3 sends him to Maps, then back for a second letter with Busy page on.
  - Section 4 asks for "the letter you would ship", but §10.6 makes B an 11.3.0 answer only. In 12.0.0, O-260 zeroes the veil's rung and C ships unless W-R.1 re-points it.
  - Section 2 is a function test (did the lift choose the row), not a design choice, and per B8-5 it tests the page's path.
- **Remedy.** One ask per section, each labelled with the release it decides. Section 2 stays a test whose readout the owner screenshots.

### B8-10 (minor). "Done by 205 ms meets 200 ms", from the closed-form spring, not the shipped single curve

- **Evidence.**
  - §10.1 says present is "done by 205 ms, which meets Home Assistant's 'popups read as done by 200 ms'". 205 ms is over 200 ms, and it is the closed-form spring's 98 % (`bud.json`, `entry.present`).
  - Pass 2's delivery ships each row as a single curve over its settle clock: present 0.2 s (`scheme-spring.css`, the settle tokens). P8-present's dialog uses 200 ms.
  - "C and D cannot meet Home Assistant's 200 ms" equates "read as done" with 98 % of the box's travel. A grow's rows are at full strength from the first frame (`reveal.css`, 11.1.1, the menu-grow comment), and M4 puts legibility at 147 ms.
- **Remedy.** Quote the single curve's figures, and leave "read as done" to R5.

### B8-11 (minor). gaggle's thirteen detented sheets include eight prototypes

- **Evidence.** `fold/hosts.json` lists 13 files for gaggle. Eight are under `dashboard/proto/`; five are under `dashboard/src/` (`App.vue`, `parts/ItemSheet.vue`, `report/kit/Lamp.vue`, `report/page/Page.vue`, `shell/FeedSheet.vue`). §10.5 and the question to gaggle say "Thirteen of your sheets".
- **Remedy.** Say five shipped and eight in prototypes.

### B8-12 (minor). An uncited claim discharges law 7 for the sheet

- **Evidence.** §10.5 says "The platform's scroll is the reference that iOS's own sheets use, so this is no breach of law 7". No source in the study says iOS sheets are driven by a scroll view, and none of [IOS], [ARC] or [BG] reads a sheet's detent mechanics.
- **Remedy.** Cite it, or drop the clause and leave the change of who times the motion to the owner, as the next sentence already does.

### B8-13 (minor). The first line drops "none published"

- **Evidence.** Passes 1 to 7 opened with "(`READINGS.md`: none published, none returned)". Passes 5 and 6 named it the orchestrator's gate. Pass 8 says "none returned" and calls the pages "live". READINGS.md still lists none published, and PROGRESS 2026-11-23 10:16 says "none was published".
- **Remedy.** Restore "none published".

## Dropped on the second reading

- **reka's iOS scroll lock would put a non-passive `touchmove` under the sheet.** glass-ui's modal does not take reka's `useBodyScrollLock`. Its `ModalScrim` holds the page through its own root lock (`ModalScrim.vue:5-17`, `root-scroll-lock.ts`), and no glass-ui file adds a `touchmove` listener. Dropped.
- **O-313(c) is an owner ruling behind 11.1.1's exits.** O-313 comes from the animation audit the owner ordered (O-305), not from the owner's own figure. §10.3's provenance holds. What survives is B8-6.
- **The crop's frost cells pass trivially in Playwright WebKit.** They do, but §9.2 (amended) already says "Playwright WebKit draws no backdrop blur, so its frost cells read the clip alone, and the bar decides nothing about the seat". Dropped.

## What holds

The reka citations are exact: `MenuItemImpl.js:39`, `MenuItem.js:57-61`, `TooltipTrigger.js:55`, `utils.js:40-56`, and `PopperContent.js`'s `reference`. So are the Dialog's veil mount (`DialogContent.vue:195`, `ModalOverlay.vue:87`), the Safari 17.5 floor (`W-B.17.md:194`), the exit tokens on `release/11.1.1`, and `useSpringMount`'s two mounts (Dialog and Sheet, with an export on the motion subpath). Every decision is marked provisional, and the pass names its owed readings.
