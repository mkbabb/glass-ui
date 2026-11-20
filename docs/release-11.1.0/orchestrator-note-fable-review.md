# Orchestrator note for the fix seat, the critics after it and the orchestrator: the Fable second look at 11.1.0 (claude-fable-5-2, 2026-11-10 night)

A read-only seat. It read the precepts, INBOUND O-185 to O-222, the seven lane records, critique 1, the three orchestrator notes, the commits in `master..release/11.1.0`, the captures named below, and the fix seat's uncommitted working tree as it stood at 22:19. It ran nothing. Each judgment below was checked a second time against the source line or the capture it cites; what did not survive is listed at the end. Paths are relative to this worktree unless they start with `/`.

Items 1 to 3 change what ships. Items 4 to 8 each ask for one reading or one small cut. Item 9 closes ground so no critic reopens it.

## 1. The Collapsible is on its third height engine in two days. Stop; ship reka's content with a CSS-only change, and move the engine to 12.0.0.

**Judgment.** Lane L2 replaced reka's content with a grid-row region, which broke two 11.0.0 contracts (critique 1, finding 3). The fix seat first went back to reka's content, then by 22:19 had written a third engine: a four-phase state machine (`open`, `opening`, `closed`, `measure`), a ResizeObserver, forced reads (`scrollHeight`, `void node.offsetHeight`), a `block-size` plus `margin-block-start` transition, and glass itself writing a variable named `--reka-collapsible-content-height`. The test file and the component disagreed with each other mid-edit. That is more machinery than "the Collapsible animates its height" needs, it animates a margin (motion canon P5 forbids it), and it leaves Accordion on a different engine. 11.0.0 already animated the height (lane L2's own table: 23 and 24 moving frames on v11.0.0); the real deltas were the fade, the gap that snaps, and the reversal that jumps.

**Evidence.** `src/components/collapsible/CollapsibleContent.vue` (working tree, 22:19, the `Phase` type and `toOpen`/`toClosed`); `src/components/_shared/disclosure/disclosure.css:121-138` (working tree, the margin transition); `tests/components/collapsible.contract.test.ts` (working tree, `data-phase` assertions); `docs/release-11.1.0/lane-L2.md` O-189 table (v11.0.0 column); `docs/release-11.1.0/lane-L2.md` open gaps, first bullet (Accordion keeps the measured keyframes).

**Instruction.**
- 11.1.0 ships `CollapsibleContent` as reka's `CollapsibleContent` again (the 11.0.0 component file, plus nothing). The slot's children are the region's children and reka writes its own variable. No phase machine, no observer, no glass-written `--reka-*` name.
- The only changes are in `disclosure.css`: the shared `disclosure-open` / `disclosure-close` keyframes lose their `opacity` lines for Collapsible and Accordion both (owner order behind O-171: no needless fade; one keyframe pair, no `--disclosure-content-fade` knob), on `--spring-present` and its own clock.
- `--collapsible-gap` is a block inside the region, not padding and not margin: `.disclosure-content[data-disclosure="collapsible"]::before { content: ""; display: block; block-size: var(--collapsible-gap, 0px); }`. A pseudo-element is inside the clipped content box, so it travels with the height; it adds no wrapper, so a consumer's `>` rule still reaches the children. Padding does not work: a box with `block-size: 0` and 12 px of block padding is 12 px tall on its first frame, which is the same snap 11.0.0 had.
- Lane L2's O-189 witness is amended honestly before it is rerun. Its `extra` reading (`lane-L2/probe.mjs:197`, root minus trigger minus the content's rect) is blind to a gap that lives inside the content's rect; replace it with: the root's height on the first open frame is within 2 px of its closed height, and the same on the last close frame. Its reversal cell (`probe.mjs:246`) is struck for 11.1.0 and the record says so: a reversal still restarts, as on 11.0.0.
- The CHANGELOG bullet keeps "opens without fading" and the gap sentence, and drops any claim about turning around mid-flight.
- Book for 12.0.0, in the restraint run's scope: one height engine for Collapsible and Accordion (the grid-row region from `8d3dc8d2d` is the candidate), with the wrapper and the dropped reka variable declared as breaks.
- If the phase engine is already committed with its witness green in both engines when a critic reads this, the critic still raises it as a defect under this item: the cure removes it.

## 2. The lateral card swap cuts the arriving card square, and its WebKit paint is not witnessed.

**Judgment.** The owner asked for a card swap. In the Chromium capture the arriving card has round corners on its leading side and a flat vertical cut on its trailing side, because the window group clips it to the old card's rect; the silhouette goes round, square, round. That is the clipping class the owner has rejected on the dock (O-201). Lane L2 left it as "a design call for the close"; this is the call. Separately, both WebKit mid-swap captures read here show only the old card, whole and unmoved, so the record's sentence "the new card opaque over the receding one" is backed in Chromium only.

**Evidence.** `docs/release-11.1.0/lane-L2/out/png/green-chromium-o173-mid-390-dark.png` and `green-chromium-o173-mid-1440-light.png` (the flat cut at x ≈ 363 in both, so it is the group, not the viewport); `green-webkit-o173-mid-390-light.png` and `green-webkit-o173-mid-1440-dark.png` (no arriving card); `src/styles/view-transition.css:158-160` (`::view-transition-group(gl-route-window) { overflow: clip }`); `src/styles/view-transition.css:384-389` (the recede: scale, sink and brightness); `docs/release-11.1.0/lane-L2.md` open gaps, fourth bullet.

**Instruction.**
- Under `lateral`, the window group does not clip: `html:active-view-transition-type(lateral)::view-transition-group(gl-route-window) { overflow: visible; }`. The card arrives whole. The clip stays for `zoom`, where its reason (a tall snapshot flying into a short cell) applies.
- The receding card loses two of its three channels: delete `--route-card-sink` and `--route-card-dim` and their keyframe lines; it recedes by scale alone. One motion per card; a brightness filter on a card is shading the restraint precept does not want added.
- The witness gains a paint cell in both engines: at 90 ms, the arriving card's four corner squares each match the page ground outside its arc (the table witness's method), and the arriving card's pixels are present. If Playwright WebKit cannot paint a paused view transition, record that as unmeasurable with a control, as lane L7 did for its stall cell; do not leave the Chromium sentence standing for both.

## 3. Freeze the scope, and build each 11-line cure once.

**Judgment.** Critique 1 found seven items "not built" that were never lane items: they reached this release through critic notes dated after the lanes were cut (O-211, O-212, O-213, O-214, G13, G14, K12). The fix seat is now doing lane-sized work under a fix label: a 237-line change to `DockLayerGroup.vue` with a new `DockLayerSwitcher.vue`, a transform rewrite of the Slider with a new `SliderThumb.vue`, a Select focus rework with a new `openInput.ts`. None has a lane-form witness yet, and the WebKit half cannot be read at all right now: the fix seat's first WebKit run waited ten minutes twice and never got the lock, as critic 1's did for forty. A release whose scope grows through its critics does not converge. Also, O-212 and O-214 are 11.0.1's items; no `release/11.0.1` branch exists, so their cure is being written here first and would be written again there.

**Evidence.** `git -C . status --short` (the uncommitted set: 21 modified files and three new source files); `docs/release-11.1.0/fix-2/chain.log` ("lane L1 never got the lock (10 min wait)", twice); `docs/release-11.1.0/critique-1.md` "What ran", the WebKit rows; `/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/driver/glass-11.0.1-scope.md` items 2, 2b and 5; `git branch --list "*11.0.1*"` (empty).

**Instruction.**
- Orchestrator: no further INBOUND row joins 11.1.0. Anything new goes to 11.0.1 (a defect on the published line) or 11.2.0.
- Fix seat: O-212 with O-213's cap, O-214, and O-219 if the Slider work touched it, land as one commit per row, source and tests only, so 11.0.1 cherry-picks them. 11.0.1's scope file gains one line naming those commits once they exist (read the hashes from `git log`).
- Each of K12, O-211, G13, G14 and O-213's shell floor ships in 11.1.0 only with its gate from `orchestrator-note-critics-kf.md` read RED on v11.0.0 and GREEN on the branch in both engines. One that cannot reach that by the close moves to 11.2.0 whole, with its working-tree change reverted, not half-landed. K12 and O-211 are the two most likely to move; neither blocks a consumer on 11.0.0 from adopting 11.1.0.
- Orchestrator: the next critic and the fix seat need the machine-wide WebKit lock. Pause the design loops in the main checkout for the length of the fix seat's WebKit chain and the critic's, or the WebKit column of this release stays the lanes' own readings and nobody else's.

## 4. Every `<Table>` now paints a plate and a rim, and no capture shows what that looks like.

**Judgment.** `.table-container` gives every `Table` and `DataTable` the quiet plate and the material rim by default; 11.0.0's container had neither. O-184 asked for plate material, so a table standing on the page is right. A table inside a Card, a Dialog or a Sheet now sits in a second surface, which is the nesting the owner called out ("why are these wrapped in TWO layers of cards"). The witness cannot speak to either case: it paints every cell strong blue and green, so the plate is never visible in any capture.

**Evidence.** `src/components/table/styles.css:19-27`; `git diff v11.0.0 release/11.1.0 -- src/components/table/Table.vue` (the container class swap); `docs/release-11.1.0/lane-L3/out/png/green-webkit-o184-component-390-light.png` (painted cells only); `/Users/mkbabb/Programming/glass-ui/docs/precepts/restraint.md`, Controls and layout, "One container".

**Instruction.** The critic takes four captures in each engine with unpainted cells: a `Table` on the page ground and a `Table` inside a `Card`, light and dark, at 390 and 1440. If the nested table reads as a card in a card, the cure is one rule and it removes: inside a glass surface the container keeps its radius and clip and drops its plate and rim (`background: transparent; box-shadow: none`). No prop, no variant. If it reads as one surface, record the captures and ship as built.

## 5. The gliding mark reads layout and writes size every frame, with no cost reading, in the release that faults the Slider for the same thing.

**Judgment.** The glide looks right at rest and mid-flight. Its mechanism, per frame of the glide: two `getBoundingClientRect` calls and a `getComputedStyle`, then five custom properties written on the run, two of which feed the mark's `width` and `height`. Unregistered custom properties inherit, so each write restyles every seat in the run. Its MutationObserver watches the run's whole subtree for child changes, so a seat whose text ticks (a clock, a count) runs the same reads on every tick. Lane L1 held the border rim to "one element restyled, zero layouts" and gave the mark no such reading. This is the K12 class.

**Evidence.** `src/components/dock/composables/useDockRunMark.ts:74-94` (`plateOf`), `:111-119` (`paint`), `:152-156` (the per-frame `onFrame`), `:169-174` (the observer options); `src/components/dock/styles/run.css:398-410` (`width`, `height` from the variables); `docs/release-11.1.0/lane-L1.md` O-169 "The tick" against O-188's witness.

**Instruction.** One Chromium trace cell for the glide at 4x CPU, read the way lane L1 read the rim's tick: `Layout` events and elements restyled per frame over the glide, and the same for one text change in a seat of a run that has a mark. Then the smallest cure the numbers ask for, in this order: register the five properties with `@property` and `inherits: false` so a write restyles the run and its pseudo-element alone; narrow the observer to the `aria-current` attribute plus direct child-list changes. Do not rebuild the mark as a transform-scaled plate in 11.1.0; if the numbers after those two cures are still poor, record them and book it with the dock morph rewrite.

## 6. A chart bar keeps its clip after it lands.

**Judgment.** `.viz-bar` and `.viz-ripple` animate with fill mode `both` and an explicit `to` keyframe, so `clip-path: inset(0 0 0 0)` (or the circle) stays on the element for good. A clip-path clips everything the element paints, so a focus ring on a focusable bar, a value label that overhangs it, or a hover shadow is cut after the entrance. The entrance itself is sound: the clip, not a scale, is the right way to keep a bar from drawing past its value.

**Evidence.** `src/styles/glass/viz-enter.css:45` and `:59` (`animation: … both` on the bar and the ripple), `:72-115` (the `to` keyframes).

**Instruction.** Change `both` to `backwards` on `.viz-bar` and `.viz-ripple` (the delay still needs the backward fill; the forward fill is the defect). Add one line to the entrance test: after the animation ends, the bar's computed `clip-path` is `none`. `.viz-mark` has no `to` keyframe and is unaffected.

## 7. The long press is the only way to open a persistent-face dock on a touch screen, and no touch screen has run it.

**Judgment.** The persistent face and "a press on a seat is the seat's own" are right and at the root. The coarse expand path is a hidden 500 ms hold with a click-and-context-menu swallow, witnessed by synthetic pointer sequences and Chromium's CDP touch pipeline; lane L6 says real iOS Safari and Android Chrome were not measured. On iOS a held link raises the system preview without a `contextmenu` event, so a seat that is a `RouterLink` may race it. This is recorded honestly; what is missing is the reading. The owner's later rulings (O-200, O-222, O-224) move the theme toggle out of the dock and hand the collapsed face to the W-I.8 design loop, so this path will be redesigned in 11.2.0 whatever it reads.

**Evidence.** `docs/release-11.1.0/lane-L6.md` open gaps, third bullet; `src/components/dock/composables/useDockState.ts:222-294` (the timer, slop and swallow; no `-webkit-touch-callout`); `/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/audit/INBOUND.md` rows O-222 and O-224.

**Instruction.** No seat adds machinery to the long press in 11.1.0, and no critic mints findings on its ergonomics; that is W-I.8's subject. The orchestrator books one reading at publish: on the deployed demo, the owner holds a persistent seat on his phone once, button seat and link seat. If the hold does not open the dock on iOS, the cure is an 11.1.x patch and W-I.8 is told. The CHANGELOG sentence stays as written.

## 8. The dock grain is now three radial gradients that paint nothing anyone can see. Ship it; book its deletion.

**Judgment.** The LCP cure is correct and at the root. But lane L4's own reading is that the grain sits at or below one 8-bit step at its default strength, and the restraint precept's shading check counts radial gradients on docks. An ornament that is imperceptible by default and needs a blended pseudo-element and three gradient layers to exist is what the precept removes. It cannot go in a minor, because `--glass-grain-opacity` is a token consumers can raise. One honesty point for now: raised, the new grain is a regular dot lattice, not paper noise, and the CHANGELOG says only "at the same faint strength".

**Evidence.** `src/components/dock/styles/dock.css:169-185`; `docs/release-11.1.0/lane-L4.md` O-185 "Paint" (deltas of 0 and 1; "both grains sit at or below one 8-bit step"); `/Users/mkbabb/Programming/glass-ui/docs/precepts/restraint.md`, Shading, first check.

**Instruction.** Ship as built. The CHANGELOG bullet gains one clause: a consumer who raised `--glass-grain-opacity` on a dock will see dots where there was noise. The orchestrator adds one line to the 12.0.0 restraint scope: delete the dock plate's grain pseudo-element and its token on the dock.

## 9. These stand as built. Critics do not reopen them without a new measurement.

**Judgment.** Read against the bar with their captures and found right, at the root, and no larger than the ask:
- the dock capsule and the counter-scaled corner through the morph (one token, the posture rules deleted; `lane-L6/out/png/green-*-o199-open-h-*`, `-open-v-*`, `-col-wide-*`);
- the content-sized collapsed seat (one declaration, `min-inline-size: auto`);
- the trailing gap and the dock under reduced motion (each deletes a second owner);
- the bare Badge (one value on the existing axis; the gold glyph at cap height beside the whole name in `lane-L3/out/png/green-webkit-o158-390-light-coarse.png`);
- `reference` on `PopoverContent`;
- IBM Plex Sans and the `font-files` entry (two consumers asked; the inlined sheet is byte-identical; files-only delivery is already recorded for a major);
- the shadow token table ("stable within a major" is accurate, and 12.0.0 is where the set shrinks);
- the class as the scheme authority (11.0.0's no-class state on a dark OS was a split render, so this is a fix);
- the menu grown from its trigger (`lane-L2/out/png/green-webkit-o171-first-1440-dark.png`: the trigger-height strip, first row sharp, no blur, no fade);
- HandMark's compositor draw and `drawn` (the straight wipe is the right front for near-horizontal strokes, `lane-L7/out/png/green-chromium-stall-1440-dark-highlight-3.png`; the ring keeping dash offset is recorded with its stall);
- the sheet shear with critic 1's clamp, already in the fix seat's tree (`src/components/sheet/motion.ts`, `Math.max(0, p)`); the owner likes the shear (O-179) and it defaults to none.

**Instruction.** Critic 1's findings 8, 9 and 10 stand as written and are not restated here. A critic that returns to any item in this list brings a reading that contradicts the lane's, or leaves it.

## Struck on the second pass

- "The glide's last tab is clipped at 390": the flat end on the last seat is in the v11.0.0 capture too (`lane-L1/out/png/red-webkit-o188-rest-390-light.png`); the harness dock is narrower than its run. Not this release's.
- "The table rim breaks one-shadow-per-surface": `--glass-material-rim` is the house rim every glass surface reads (`src/styles/glass/rim.css:54`); the count belongs to the 12.0.0 audit, not to this container.
- "The shear's clamp leaves a visible hard stop": analytic only, about 0.06° a frame at the crossing; no reading supports it.
- "Cut the bare Badge as a lookalike variant", "cut Plex as a consumer preset" and "the shadow table over-promises": each fell to the source row (value asked for exactly this; two consumers self-host the face; the README says "within a major").
- "Move the dock capsule and the other default changes to 12.0.0": the capsule is an owner ruling with a one-line restore, the scheme change is a fix, and the fix seat's rewritten CHANGELOG headline now names every default that changes.
