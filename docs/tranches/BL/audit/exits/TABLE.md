# Exits: every glass surface that opens, measured

Measuring seat, claude-opus-5-5, 2026-11-15. Read-only; no source changed. The owner's order (INBOUND O-365): "The value.js pages pop-up from the dropdown on mobile instantly transitions out, and is not glassy--many of our popups and the like are like this, and many of our glass-ui components instantly transition out like this. Audit and mark."

**Trees.** v11.0.2 = `c0f09570d` (tag v11.0.2), served on 5431. The 11.1.0 tip = `release/11.1.0` @ `95cd5bb3360798f501d0f83ceceb7ffd5b646c83`, served on 5432. Both were built with `git archive` under `trees/`, using `tools/build-tree-ex.sh`, which is last-ten's `build-tree-lt.sh` plus one mount, `tools/mounts/exits-dock.vue`: a Select seated in a GlassDock through `DockTrigger`, its open state driven by `v-model:open` the way value.js's `DockViewSelect.vue` drives it, with a dock DropdownMenu and a dock Popover beside it. Source lines below are v11.0.2's.

**How it was read.** Every frame (requestAnimationFrame) records the surface's presence, its own and effective opacity (the product up the ancestor chain), `scale`, `translate`, `transform`, `clip-path`, `filter`, `background-color`, `backdrop-filter`, its first child's opacity, its box, `data-state`, and `getAnimations({subtree:true})`. Each route gets a fresh page load and a fresh open. The **phone** form is 390×844, DPR 3, `hasTouch` and `isMobile`, with real touch input: CDP `Input.dispatchTouchEvent` in Chromium, and `page.touchscreen.tap` in WebKit. The **desktop** form is 1440×900 with a mouse. Chromium is the Playwright headless shell, sampling at about 120 Hz. WebKit is Playwright's build 2287 (`executablePath` webkit-2287), sampling at about 100 Hz. Reduced motion means `reducedMotion: "reduce"`. Glass is read from computed style with the surface at rest and open, in light and in dark.

**The marks.**
- A number is the visible leave in ms, from the first changed frame to the last.
- **CUT** means gone, or at its end state, within two frames.
- **CUT (moves N px)** means the surface leaves its own place in one frame and finishes its exit somewhere else. That is the owner's case.
- **CUT (removed at N % painted)** means the surface is unmounted while that share of it is still on screen.
- The cell holds Chromium's reading. **[WK: …]** is added only where WebKit's verdict differs.
- "WK outside: harness" means that in WebKit at the phone form, Playwright's `touchscreen.tap` produces no `pointerdown` that reka's outside-press listener sees. No surface dismissed that way, the Dialog included, so the route is not readable in WebKit at 390. It was read at 1440 with the mouse.

**Reverse.** Whether a surface turns from where it is is cited from `last-ten/FINDINGS.md` ("Reversal", LT-5, LT-8, LT-9, LT-10) where it already holds the cell. This pass adds only the dock Select, the context menu and the WebKit readings.

## The owner's case, frame by frame

This is a Select seated in a GlassDock at 390 with touch, on v11.0.2 (`?c=exits-dock`, `xd-select`). It opens as the **sheet form**, a full-width plate rising from the foot of the screen. The plate sits at y 607, 390 px wide and 237 px tall, opaque cream (`data-surface="opaque"`, `backdrop-filter: none`, background alpha 1). The open is a 205 ms tween that animates opacity, scale, translate and blur.

**Pick an item** (tap "Gradient"). Rows are from `rows/11.0.2.chromium.phone.light/dock-select.pick.json.gz`, and the strip is `films/dock-select.pick.11.0.2.phone.png`.

| frame (ms after the tap) | data-state | box (x, y, w × h) | opacity | material |
|---|---|---|---|---|
| 0-58 | open | 0, 607, 390 × 237 | 1 | opaque (bg alpha 1, no backdrop) |
| +75 | closed | 16, 602, 192 × 238 | 1 | **glass** (bg alpha 0.18, `blur(20px) saturate(1.5)`) |
| +80 | closed | 137, 72, 192 × 238 | 1 | glass |
| +86 → +150 | closed | 137, 70 → 64 | 0.65 → 0 | glass, `glass-reveal-out` 120 ms |
| +260 | absent | | | |

In one frame the sheet loses its width, its corners and its opaque material, so it turns into a small glass popover. In the next frame that popover jumps 530 px, from the foot of the screen to just under the dock trigger. Only then does it fade, for 75 to 92 ms, in a place the reader was not looking. On a phone, the sheet at the bottom of the screen vanishes within two frames, and a faint ghost flickers near the top. **Press outside** does the same: the plate moves 532 px in one frame, then fades for 75 ms (`films/dock-select.outside.11.0.2.phone.png`). So do Escape (530 px, 82 ms) and the trigger again (530 px, 83 ms). The collapsible dock (`xd-select2`) and the plain story Select read the same. The plain Select moves 286 to 291 px, because its trigger sits lower on the page. WebKit 2287 reads the same: 531 px in one frame on pick, then a 111 ms fade. The 11.1.0 tip reads the same: 530 px in one frame, then a 136 to 148 ms clip-path wipe at the top.

**Cause.**
- `src/components/_shared/overlay/sheet-width.ts:25-35`. The sheet flag is computed from `open` in a `flush: "sync"` watcher. On close it calls `release()` and then `sync()`, so `sheet` becomes `false` in the same tick that `data-state` becomes `closed`, before the exit animation's first frame.
- `src/components/select/SelectContent.vue:77-92`. That flag swaps the floating-ui `reference` from the viewport foot back to the trigger, and the side from `top` to `bottom`.
- `SelectContent.vue:131-132`. It also drops `data-form="sheet"` and `data-surface="opaque"`.
- `styles/glass/overlay-plate.css:377-384`. The full-width sheet rule falls away with them.

The exit then runs, but it is the anchored menu's exit (`glass-reveal-out`, 120 ms, `reveal.css:112, 199`), played on a different box in a different place.

**"Not glassy".** At 390 the Select is opaque on purpose. `sheet-width.ts:4-7` and `SelectContent.vue:55-60` say: "on the opaque rung; the anchored form keeps glass". The same holds for a DropdownMenu seated in a dock (`DropdownMenuContent.vue:79-85, 105`). At 1440 both are glass: `blur(20px) saturate(1.5)`, bg alpha 0.22 light and 0.26 dark. So the owner's "not glassy" is the D-6 sheet rule (U/B7) working as written. A ruling is needed before anything is cured (see the list at the end).

**Cure.**
- Latch the sheet form for the life of the content. Read the query on open, and release it only when reka's Presence unmounts.
- Give the sheet form its own exit: slide down past the screen edge and fade, on the panel clock.
- Then decide the material. If the owner wants glass, the sheet form takes `.glass-floating` and drops `data-surface="opaque"`.

Under **reduced motion** the same Select cuts outright (see the PRM row in the shared causes).

## The table

Phone = 390×844 touch. Desktop = 1440×900 mouse. Each "leaves by route" cell gives the route's ms, or CUT. The v11.0.2 / tip column lists only the cells where the 11.1.0 tip differs by more than 25 ms or in verdict.

| surface | form | enters (ms) | leaves by route (ms or CUT) | reverses | glass | reduced motion | v11.0.2 / 11.1.0 tip | cause (v11.0.2 file:line) | cure in one line |
|---|---|---|---|---|---|---|---|---|---|
| Select in GlassDock (owner's case, controlled `v-model:open`) | phone | 205 (opacity, scale, translate, blur) | pick **CUT (moves 530 px, then 92 fade)**; outside **CUT (532 px, 75)** [WK outside: harness]; Escape **CUT (530 px, 82)**; trigger again **CUT (530 px, 83)** [WK: harness]. Material flips opaque → glass in 1 frame on every route | reopen 60 ms after Escape: closes fully, then reopens from 0 (Chromium); WK: opacity jumps | solid by design: sheet form, `data-surface=opaque`, no backdrop, bg alpha 1, light and dark, WK the same (`sheet-width.ts:4-7`) | enter CUT; pick CUT (moves 546 px, then a 28 ms remainder); outside CUT. WK: CUT | tip: enter 390 (clip-path grow); every route still moves 530 px in 1 frame, then a 136-148 ms clip wipe | `_shared/overlay/sheet-width.ts:25-35` drops the sheet on close; `select/SelectContent.vue:77-92, 131-132` swap the reference and material | hold the sheet form until Presence unmounts; give the sheet a slide-down exit |
| Select in GlassDock | desktop | 202 | pick 72; outside 65; Escape 66; trigger 64 | reopen during close ignored (as LT-5) | glass: `.glass-floating`, `blur(20px) saturate(1.5)`, bg alpha 0.22 (0.26 dark), 1px rim, floating shadow | all CUT | tip: enter 419; routes 136-139 (clip) | exit is `glass-reveal-out` 120 ms with opacity 0 at 60 %: `styles/animations.css:157-174`, `tokens/scheme-spring.css:115`, `glass/reveal.css:112` | tween, but about 70 ms is visible; lengthen the menu exit (see shared causes) |
| Select in a collapsible GlassDock (uncontrolled) | phone | 206 | pick **CUT (438 px, then 92)**; outside **CUT (438 px, 83)**; Escape **CUT (438 px, 83)**; WK the same | as above | solid by design (sheet form) | CUT | tip: same moves, then 145 clip | as the owner's case | as the owner's case |
| Select in a collapsible GlassDock | desktop | 203 | pick 67; outside 65; Escape 67 | LT-5 | glass, as above | CUT | tip: 136-138 | as Select desktop | as Select desktop |
| Select (story, SelectTrigger) | phone | 200 | pick **CUT (291 px, then 84)**; outside **CUT (288 px, 75)**; Escape **CUT (286 px, 83)**; trigger **CUT (286 px, 82)**; WK pick CUT (262 px, 112), Escape CUT (266 px, 92) | reopen during close ignored (LT-5) | solid by design (sheet form) | CUT | tip: same moves, then 137-139 clip | as the owner's case | as the owner's case |
| Select (story) | desktop | 208 | pick 67; outside 64; Escape 67; trigger 66 | none: open jumps to full, reopen ignored (FINDINGS Reversal) | glass, bg alpha 0.22 | CUT | tip: enter 388; 136-137 (clip) | `animations.css:157-174` (60 % fade stop), `scheme-spring.css:115` (0.12 s) | as Select desktop |
| DropdownMenu in GlassDock | phone | 196 | pick 74; outside 74 [WK: harness]; Escape 75; trigger 75. **Material flips opaque → glass in 1 frame** on every route, then a 74 ms fade in place | not read | solid by design: dock menu at sheet width, `data-surface=opaque`, bg alpha 1 (`DropdownMenuContent.vue:79-85`) | CUT | tip: enter 394; 134-136 | `DropdownMenuContent.vue:84-85, 105` with `sheet-width.ts:25-35`: the opaque flag drops on close | hold the material through the exit (the same latch) |
| DropdownMenu in GlassDock | desktop | 198 | pick 62; outside 64; Escape 67; trigger 66 | LT-8 | glass, bg alpha 0.18 (0.22 dark) | CUT | tip: enter 414; 134-136 | as the menu below | as the menu below |
| Popover in GlassDock | phone | 458 | outside 132 [WK: harness]; Escape 131; trigger 134 | LT-9 (jumps) | glass, bg alpha 0.18 | CUT | none | panel exit 0.25 s, fade done at 60 % | none needed for the exit; reduced motion as below |
| Popover in GlassDock | desktop | 447 | outside 133; Escape 133; trigger 131 | LT-9 | glass | CUT | none | | |
| DropdownMenu | phone | 210 | pick 71; outside 72 [WK: harness]; Escape 64; trigger 67; focus out (Tab) 70 | open jumps, reopen restarts (LT-8) | glass, bg alpha 0.18 | CUT | tip: enter 388; 132-136 (clip) | 120 ms exit, opacity 0 at 72 ms: `animations.css:169`, `scheme-spring.css:115`, `reveal.css:112` | an exit of at least 180 ms, fading across the whole clock |
| DropdownMenu | desktop | 200 | pick 68; outside 73; Escape 67; trigger 70; focus out 66 | LT-8 | glass | CUT | tip: enter 422; 134-136 | as above | as above |
| DropdownMenu submenu | phone | 207 (tap opens it) | pick 72; Escape 74; outside 71 [WK: harness]; parent item: pointer only | not read | glass | enter 167 (not cut); pick CUT | tip: enter 389; 136-138 | as DropdownMenu | as DropdownMenu |
| DropdownMenu submenu | desktop | 200 | pick 69; pointer to a parent item 63; Escape 68; outside 69 | not read | glass | CUT | tip: enter 383; 134-136 | as DropdownMenu | as DropdownMenu |
| ContextMenu | phone | **opens on a 700 ms long-press, then closes when the finger lifts** (Chromium CDP touch: open at +727 ms, `closed` on the frame after touchEnd, 72 ms fade) | not reachable: the menu does not survive the lift. WK: no long-press in Playwright | not read | not read at 390 | not read | same | not attributed. reka `ContextMenuTrigger` long-press, then the lift's synthesized pointer events; confirm on a device | confirm on iOS Safari before booking |
| ContextMenu | desktop | 208 (right-click) | pick 63; outside 66; Escape 66 | not read | glass, bg alpha 0.18 | CUT | tip: enter 385; 133-135 | as DropdownMenu | as DropdownMenu |
| Popover | phone | 447 | outside 133 [WK: harness]; Escape 133; trigger 137; focus out 131 | jumps to opacity 1 both ways (LT-9) | glass, bg alpha 0.18 (0.22 dark) | CUT | none | panel exit `scheme-spring.css:117` (0.25 s), opacity 0 at 150 ms | reduced motion as below |
| Popover | desktop | 445 | outside 138; Escape 133; trigger 133; focus out 132 | LT-9 | glass | CUT | none | | |
| HoverCard (Popover `trigger="hover"`) | phone | 449 (a tap opens it) | outside 133 [WK: harness]; Escape 133; leave: no hover on touch | not read | glass | CUT | none | | |
| HoverCard | desktop | 458 (hover, 250 ms delay not counted) | pointer leave 133; outside 133; Escape 133 | not read | glass | CUT | none | | |
| Tooltip | phone | does not open on touch (reka Tooltip ignores touch; by design) | n/a | n/a | n/a | n/a | same | | |
| Tooltip | desktop | **CUT** (appears whole in 1 frame; LT-9, LT-23) | pointer leave 74; Escape 75; press the trigger 75 | none on enter (FINDINGS) | glass, bg alpha 0.18 | CUT | tip: same | `glass/reveal.css:136-161`: the `@starting-style` from-state is keyed on `[data-state="open"]`, and reka's tooltip states are `delayed-open` and `instant-open` | key the enter on `[data-state$="open"]` |
| Dialog | phone | 454 | close (✕) 251; outside 247 [WK: harness]; Escape 241 | reopen during close ignored (LT-5) | glass, `data-surface=glass`, bg alpha 0.18 | CUT | none | | reduced motion as below |
| Dialog | desktop | 509 | close 303; outside 303; Escape 327 | LT-5 | glass | CUT | tip: outside 345, Escape 271 | | |
| Dialog, `surface="opaque"` | phone | 459 | Escape 232 | LT-5 | solid by design: bg alpha 1; only its close capsule carries `blur(14px)` | CUT | none | the variant | |
| Dialog, opaque | desktop | 546 | Escape 297 | LT-5 | solid by design | CUT | none | | |
| AlertDialog (Dialog `dismiss="deliberate"`; there is no AlertDialog export) | phone | 447 | close (footer action) 236; Escape 229; outside 239 [WK: harness] | LT-5 | glass | CUT | none | | |
| AlertDialog | desktop | 505 | close 349; Escape 269; outside 355 | LT-5 | glass | CUT | tip: Escape 318, outside 259 | | |
| Sheet, top / right / bottom / left | phone | 830-840 (spring) | close 208-211; outside 207-209 [WK: harness]; Escape 205-208; swipe: **not a route** (side sheets take no drag: `SheetContent.vue:319` binds the pointer handler only when detented) | partial (side Sheet; LT-5) | glass, bg alpha 0.18 | CUT | none | | reduced motion as below |
| Sheet, four sides | desktop | 841-883 | close 209-292; outside 213-289; Escape 211-252; swipe not a route. The top sheet is still 14 % on screen when it unmounts on close (9 % on the tip): below the CUT bar, but a visible snap | LT-5 | glass | CUT | tip: top close 240, Escape 224 | | |
| Sheet, detented | phone | 600 | close **CUT (removed at 47 % painted, after 475)**; outside **CUT (47 %, 474)** [WK: harness]; Escape **CUT (47 %, 475)**; swipe down **CUT (47 %, 926)**; WK 51 % | reverses on open only (FINDINGS) | glass, bg alpha 0.196 | CUT | none (tip the same) | `sheet/styles.css:534-544`: `min-block-size` floors the plate at about 171 px, so as `--detent-t` → 0 the plate stops shrinking and holds with its scrim; `detents/use.ts:133` unmounts it when the spring settles (the comment at `styles.css:525-528` names "the exit is the unmount") | as t → 0, translate the floored remainder off the edge (or fade it over the last rung) before unmount |
| Sheet, detented | desktop | 893 | close **CUT (57 %, 530)**; outside **CUT (57 %, 704)**; Escape **CUT (57 %, 729)**; drag down **CUT (57 %, 988)**; WK the same at 471 | as above | glass | CUT | tip: the same CUTs | as above | as above |
| Toast | phone | 450 | close (✕) 260 (vaporize: plate, rim, backdrop and ink release; no geometry); swipe 566; timeout 267 | dismissed mid-enter jumps to opacity 1 (LT-9) | glass, bg alpha 0.18 | enter CUT; close 267 and swipe 566 still tween (the vaporize keeps its own PRM licence, `glass/dissolve.css:276-283`) | none | | |
| Toast | desktop | 448 | close 268; swipe 574; timeout 259 | LT-9 | glass | enter CUT; close 260; swipe 585 | none | | |
| Command palette (CommandDialog) | phone | 437 | pick **CUT (list removed in 1 frame: plate 435 → 51 px), then 249 fade of the input bar**; outside the same, 240 [WK: harness]; Escape the same, 237. WK: same, 265 | not read | glass, bg alpha 0.18 | CUT | none | `command/CommandList.vue:34-48`: reka `ComboboxContent` unmounts as soon as the combobox closes, which `CommandDialog.vue:97-100` ties to the dialog's close, so the list goes before the dialog's exit starts | force-mount the list while the dialog's Presence holds the exit |
| Command palette | desktop | 489 | pick **CUT (list removed in 1 frame), then 339**; outside the same, 298; Escape the same, 312; WK the same | not read | glass | CUT | tip: the same | as above | as above |
| Command (inline palette) | both | does not open: an always-visible list, nothing to leave | n/a | n/a | n/a | n/a | | | |
| ExpandableContainer (fullscreen) | phone | 224 (panel scale 0.78 → 1 and fade) | Exit button **CUT** (fullscreen → in-flow 364 × 192 in 1 frame); Escape **CUT**; WK the same | not read | solid by design: a background-only scrim, `backdrop-filter: none` (`expandable-container/styles.css:12-16`) | enter CUT (2 frames); leaves CUT | none | `expandable-container/styles.css:41-45` animates only `[data-state="expanded"]` (the birth); no collapse rule; `ExpandableContainer.vue:2, 12`: the Teleport's `:disabled` and `data-state` flip in the same render | a collapse keyframe (scale back into the origin rect) with the Teleport held until `animationend` |
| ExpandableContainer | desktop | 246 | Exit **CUT** (1440 × 900 → 118 × 192 in 1 frame); Escape **CUT** | not read | as above | enter 36; leaves CUT | none | as above | as above |
| Accordion | phone | 202 (height and opacity) | trigger again 200 | restarts from the far end (LT-10) | in place; no surface of its own (the story's card carries `glass-quiet`) | CUT | none | | reduced motion as below |
| Accordion | desktop | 201 | trigger 207 | LT-10 | in place | CUT | none | | |
| Collapsible | phone | 192 | trigger 192 | restarts (LT-10) | in place | CUT | none | | |
| Collapsible | desktop | 198 | trigger 201 | LT-10 | in place | CUT | none | | |
| GlassDock collapse | phone | expand on tap 550 | outside tap → collapse 550; pointer leave: no hover on touch | partial (LT-4) | glass: `.dock-plate` `blur(16px) saturate(1.2)` (dark `saturate(1.3) brightness(1.14)`), bg alpha 0.10 | CUT both ways | none | | reduced motion as below |
| GlassDock collapse | desktop | 548 | outside click 547; pointer leave did not collapse inside 1.4 s (idle window) | partial (LT-4) | glass | CUT | none | | |
| Dock layer change (DockLayerGroup) | phone | 283 (indicator translate); WK 223 | back 283; WK 235 | not measurable on desktop | indicator: bg alpha 0.18, no backdrop (an indicator, not a surface) | CUT | none | | |
| Dock layer change | desktop | **a click does not switch the layer**; the indicator's opacity flips (O-312, LT-19) | the same | n/a | as above | CUT | tip: the same | O-312 | O-312 |
| Theme toggle (DarkModeToggle) | phone | 225 (sun half-turn) | back 225 | not read | not a surface | 11.0.2 desktop: CUT both ways; tip phone: 67 | none | | |
| Theme toggle | desktop | 253 | back 225 | not read | not a surface | CUT | none | | |
| Tabs content (SegmentedTabs) | both | SegmentedTabs has no content panels to animate; the indicator is in FINDINGS (LT-2, LT-3) | n/a | | | | | | |
| DatePicker, Calendar, Drawer, Combobox | none | none exported (`components/index.ts:17`: "there is no `<Combobox>` component"; the Command is reka's Combobox) | | | | | | | |

## Shared causes

1. **The sheet-width flag drops on close** (`_shared/overlay/sheet-width.ts:25-35`). This is the owner's case. Every overlay with a sheet form below 30 rem (Select; a DropdownMenu seated in a dock) loses its form and material in the frame it closes. The Select also loses its anchor, so it jumps to the trigger.
2. **Reduced motion cuts everything** (`styles/utilities/a11y-overrides.css:46-53`). `*, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0s !important }` sits in `@layer components`. It outranks the reveal's own PRM carve (`glass/reveal.css:316-338`, which says "the OPACITY fade SURVIVES") and the fade-only `glass-reveal-out-reduced` keyframe (`styles/animations.css:186-193`). Measured: every menu, popover, dialog, sheet, disclosure and dock motion enters and leaves in one or two frames, in Chromium and WebKit, on both trees. Only the Toast keeps its fade, because `glass/dissolve.css:276-283` authorizes it, so the Toast is the precedent to copy. A phone with Reduce Motion on sees every popup cut.
3. **The menu-register exit is 120 ms, and the light is gone at 72 ms**:
   - `--spring-present-exit-duration` is `clamp(0.12s, 0.2s × 0.6, 0.25s)` = 0.12 s (`tokens/scheme-spring.css:115`).
   - `data-reveal="menu"` binds it (`glass/reveal.css:112`).
   - `glass-reveal-out` reaches opacity 0 at its 60 % stop (`animations.css:169`), on `cubic-bezier(0, 0, 0.2, 1)`.
   - The first 120 Hz frame takes 34 % of the opacity, and the first 60 Hz frame about half. It counts as a tween by the two-frame rule, but on a phone it reads as instant.
   - On the 11.1.0 tip the menus and the Select exit by a clip-path wipe of 132 to 148 ms (LT-8), roughly twice as long.

   The Popover, Dialog and Sheet exits (130 to 350 ms) are not in this class.
4. **Unmount before the exit**:
   - The Command list unmounts with the combobox (`CommandList.vue:34-48`).
   - The detented Sheet unmounts at its floor (`sheet/styles.css:534-544` with `detents/use.ts:133`).
   - ExpandableContainer has no collapse animation, and its Teleport flips in the same render (`expandable-container/styles.css:41-45`, `ExpandableContainer.vue:2, 12`).

## What the owner sees: the surfaces that cut on a phone, worst first

1. **Select inside a GlassDock** (value.js's pages dropdown), and the story Select. Every route (pick, outside, Escape, trigger) cuts: the bottom sheet loses its form and material in one frame and jumps 290 to 530 px to the trigger, then a 75 to 92 ms glass ghost fades there. This holds on v11.0.2 and 11.1.0, in Chromium and WebKit. Film: `films/dock-select.pick.11.0.2.phone.png`, `films/dock-select.outside.11.0.2.phone.png`.
2. **Every popup under Reduce Motion.** All of them cut on enter and leave, on every route, except the Toast's leave. Film: `films/select.pick.11.0.2.phone.rm.png`, `films/dialog.escape.11.0.2.phone.rm.png`.
3. **Detented Sheet.** Every route (✕, outside, Escape, swipe) slides about half way, holds about 171 px of plate and its scrim for about 350 ms, then removes 47 % of the plate in one frame (51 % in WebKit). Film: `films/sheet-detented.close.11.0.2.phone.png`.
4. **ExpandableContainer.** Exit and Escape: fullscreen to the in-flow box in one frame. Film: `films/expandable-container.exit.11.0.2.phone.png`.
5. **Command palette.** Pick, outside and Escape: the result list vanishes in one frame (plate 435 → 51 px), and only the input bar fades. Film: `films/command-dialog.escape.11.0.2.phone.png`.
6. **DropdownMenu inside a GlassDock.** Every route: the opaque plate turns to glass in one frame, then fades in place for 74 ms. Film: `films/dock-dropdown.pick.11.0.2.phone.png`.
7. **Every other menu (DropdownMenu, submenu, ContextMenu) and the desktop Select.** A tween by the rule, but 64 to 75 ms, with half the light gone in the first 60 Hz frame. This is shared cause 3.
8. **ContextMenu by long-press.** It closes as the finger lifts (Chromium CDP touch; not attributed; confirm on a device).

## Not glass

There is no surface that lacks its tier where its siblings have one. Every anchored popup, the Popover, the Dialog, the Sheets, the Toast, the Command palette and the dock plate compute a real `backdrop-filter`:
- Popups and panels: `blur(20px) saturate(1.5)`, bg alpha 0.18 to 0.26 light and dark.
- Dock plate: `blur(16px) saturate(1.2)`, bg alpha 0.10.

WebKit 2287 reads the same computed values. Playwright WebKit may still draw the glass without the blur.

**Solid by design**, with the source that says so:
- the Select's sheet form at 390 (`sheet-width.ts:4-7`, `SelectContent.vue:55-60`);
- a dock DropdownMenu at 390 (`DropdownMenuContent.vue:79-85`);
- Dialog `surface="opaque"` (the story's opaque variant);
- the ExpandableContainer scrim (`expandable-container/styles.css:12-16`).

The first two are the owner's "not glassy". They need an owner ruling against U/B7 D-6 before any cure.

**Material flips during the exit:** the Select (sheet form) and the dock DropdownMenu turn from opaque to glass in the first frame of every close (shared cause 1).

## Counts

- **Surfaces:** 28 specs over 25 surfaces. The dock Select is read in three forms (controlled, collapsible and the story). Sheets are read on 4 sides plus detented. The Dialog is read plain, opaque and deliberate. Not present: Tabs content, DatePicker, Calendar, Drawer and Combobox (none exported). The inline Command does not open.
- **Forms:** 2 (phone 390 touch, desktop 1440 mouse).
- **Readings:** 14 result files under `logs/results/`.
  - Full motion: 7 cells. Chromium 2 trees × 2 forms; WebKit 2287 v11.0.2 phone, v11.0.2 desktop and tip phone.
  - Reduced motion: 4 cells. Chromium v11.0.2 phone and desktop, tip phone; WebKit v11.0.2 phone.
  - Dark glass: 3 cells. Chromium v11.0.2 both forms; WebKit v11.0.2 phone.
  - 543 leave readings at full motion and 180 under reduced motion, not counting n/a routes.
  - 374 enter readings, 360 glass reads and 21 reverse readings.
- **Phone CUTs on leave** (v11.0.2, Chromium):

  | surface | cut routes |
  |---|---|
  | Select (three forms) | 11 of 11 |
  | detented Sheet | 4 of 4 |
  | ExpandableContainer | 2 of 2 |
  | Command palette | 3 of 3 |
  | dock DropdownMenu | 4 of 4, material flip only |
  | **total** | **24 routes on 7 surfaces** at full motion |

  Under reduced motion, every leave route on every surface cuts except the Toast's.

## Evidence

- `rows/<tree>.<engine>.<form>.<scheme>[.rm]/<surface>.<route>.json.gz` holds one row per frame. `s` is the surface; `m` marks the action.
- `logs/results/*.json` holds every reading. `logs/run-*.log` and `logs/batch-*.log` are the run logs.
- `films/` holds one strip per CUT cited above, drawn from the Chromium screencast, one image per painted frame, labelled with ms after the action.
- `tools/`:
  - `exits.mjs` (the runner), `specs.mjs` (surfaces and routes), `lib.mjs` (sampler and reader), `reread.mjs`, `collate.mjs`, `table.mjs`;
  - `films.mjs` with `strip.py`;
  - `build-tree-ex.sh`, `setup.sh`, `serve.sh`, `stop.sh`, `batch.sh`, `census.mjs`, `mounts/exits-dock.vue`.

## What did not run, and limits

- **WebKit, outside press at 390.** Playwright's `touchscreen.tap` produced no dismissal on any surface (Dialog included), so it is a harness limit, read instead at 1440. WebKit has no long-press, so the ContextMenu at 390 was not read there. WebKit has no touch-move, so swipes in WebKit used the mouse.
- **Route change.** No glass surface closes on a router push of its own. In value.js the pick navigates, but the dock persists, so the Select's exit is the same one measured here. A route change was not driven.
- **Pointer leave on the collapsible dock** did not collapse it inside the 1.4 s window (the idle delay). The collapse was read by outside press.
- **Reverse readings** beyond FINDINGS: only the dock Select, the story Select and the Dialog (Escape, then reopen 60 ms later). The 60 ms reopen landed after the 120 ms menu exit had mostly run, so FINDINGS LT-5 and LT-8 stay the reference.
- **The dark-scheme pass** read glass only; motion does not change with the scheme.
- **11.1.0 tip in WebKit:** phone only. It reads the same as v11.0.2: the Select moves in one frame, and the detented Sheet is removed at 51 %. Its reverse for the dock Select reads "turns".
- **WebKit glass** is computed style only. Playwright WebKit may not draw the blur, and Safari was not run.
