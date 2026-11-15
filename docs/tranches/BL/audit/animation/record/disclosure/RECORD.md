# The disclosure family: frame record

The recorder for the family "disclosure": Accordion, Collapsible, ExpandableContainer, the tabs content panel, Timeline, TypewriterText, Deck (slide change and its pager) and Configurator.

Every motion below was driven on the real control and sampled on every rendered frame in headless Chromium with GPU compositing. That is about 7.7 ms a frame, median. The tree is the published **v11.0.1** (`e42bc2705`). "f25" means row 25 of the rows file named beside the fault.

- **Rows:** `rows/<scenario>.tree-v11.0.1.chromium.<cell>.rows.json`, with the analyser's `.faults.txt` and `.faults.json` beside each. Traced runs, with layout counted per frame, are in `rows/trace/`.
- **Strips:** `strips/`. A strip shows about every other rendered frame; the rows are the frame record. Only the strips cited below were kept.
- **Scenarios:** `scenarios/*.json`, written by `tools/gen.mjs`.
- **Tools:**
  - `tools/run.sh` runs scenarios in sequence under one guard slot.
  - `tools/frames.mjs <rows> <from> <to> <as.ch,...>` prints chosen channels per frame, with each step. Every frame table below came from it.
  - `tools/outline.mjs` dumps the page outlines; `tools/keep-strips.sh` keeps the cited strips.
- **Logs:** `logs/`.

## How it was read

**Server.** One preview server for `tree-v11.0.1`, on a private port (5481), so it would not collide with the other recorders. It is stopped.

**Pages.** All the pages are story pages (`?c=<name>`), except the tabs panel, which is the hand page `?c=tabs`, cell `tabs-panel`. Two pages needed help before their motion could be reached:
- **Timeline and Deck.** Their story buttons ("Advance phase", "Reset", "Indeterminate", "Prev", "Next") carry no test id, so a `before` step stamps `data-tid` on them by text.
- **Configurator.** At 1440 the story's studio gives its control column 9 px of height (the `.configurator-aside` is 644 × 9, with 441 px of layer inside a fading scroll). The layer triggers cannot be clicked there. The `before` step sets the shell's height to auto and gives the aside 640 px. This is a layout fault in the story, not a motion fault, and it is noted here only so the next reader is not surprised.

**Cells.**
- 1440 fine light for everything.
- 390 coarse (real touch) for the accordion, collapsible, expandable container, timeline, typewriter, deck and configurator.
- 1440 dark where colour animates: the accordion trigger hover, the timeline marks, the preset tiles.
- Reduced motion once per component.

**Re-run.** After the first battery I lost its strips through a shell slip (a `zsh` list that did not split, followed by a delete). I re-ran every cell whose strip is cited, so those rows were overwritten by the second run. Every frame number below is read from the rows now on disk. Two numbers differ between the runs, and both are noted where they appear: the deck's first-turn long frame, and the frame indices in general.

**WebKit.** Confirmation of the first-ranked fault (D-1) was attempted under `guarded --exclusive webkit --timeout 8`. Playwright WebKit aborted at launch (`libc++abi: terminating`; `logs/webkit-attempt.txt`), the probe hung, and the guard killed it at 8 minutes. I did not retry, so as not to hold the machine-wide WebKit lock again. **No fault in this record is WebKit-confirmed.** D-1, D-2 and D-3 are the ones to confirm when the engine runs.

**The three spring tails.** Several faults below come back to one cause, so it is stated once here.
- The `linear()` springs in `src/styles/tokens/scheme-spring.css` are sampled up to their settle band and then jump to 1 at 100 %.
- `--spring-present` (line 60) ends `0.97550 97.959%, 1`, and `--spring-dock` (line 61) ends `0.97317 97.959%, 1`. Both are sampled to a 2 % band, so 2.5 to 2.7 % of the travel lands in the last 2 % of the clock.
- `--spring-world` (line 64) is sampled to a 0.5 % band, but its last segment still carries 0.56 % of the travel: 8 px on a 1438 px deck turn.
- In frames, the last step is 3 to 5 times the one before it. This is the same cause the drag recorder found on the tab indicator (its T-3).

## The animations, per component

Clock and easing are as computed (`document.getAnimations()` in each rows file) and as measured from the rows (the 2 % band).

### Accordion (`AccordionContent`, `AccordionTrigger`; styles `components/_shared/disclosure/disclosure.css`)

| Animation | Trigger | What moves | Clock and easing, as computed | In | Out |
|---|---|---|---|---|---|
| Content open | trigger click, Enter or Space | `block-size` 0 → `--reka-accordion-content-height`, and `opacity` 0 → 1 in the same keyframe (`disclosure.css:1-11`) | CSS animation `disclosure-open`, 200 ms (`--spring-present-duration`), `--spring-present` `linear()` on both properties (`:105-106`) | 181 ms (2 % band), 200 ms in all | |
| Content close | the same | the reverse keyframe (`:13-23`) | the same 200 ms on the same curve | | 181 ms; the same as in |
| Swap (single) | open another item | one closes while the other opens | both on the same clock and the same frames; the item below does not move (t3.y holds at 422.05) | 200 ms | 200 ms |
| Chevron | open or close | `rotate` 0 ↔ 180° | `transition: rotate 200ms var(--ease-cartoon-punch)` (`styles/utilities/btn.css:82-83`); the curve dips to −0.038 and peaks at 1.22 (`styles/tokens/scheme-motion.css:162-176`) | 200 ms | 200 ms |
| Trigger hover | pointer over | `background-color` to `--control-surface-bg-hover` | 120 ms, `cubic-bezier(0.4, 0, 0.2, 1)` (`disclosure.css:79-82`) | 88 ms (2 % band) | 87 ms |
| Reduced motion | any | everything | `animation-duration: 0.01ms` locally (`disclosure.css:131-138`), and the universal carve (`styles/utilities/a11y-overrides.css:46-53`) | one frame | one frame |

### Collapsible (`CollapsibleContent`; the same stylesheet)

The same content keyframes, clocks and reduced-motion behaviour as the accordion. The trigger is whatever the consumer passes. The story's chevron uses the same `transition-disclosure` (`demo/stories/containers/collapsible.vue:78-79`).

### ExpandableContainer (`components/expandable-container/styles.css`)

| Animation | Trigger | What moves | Clock and easing, as computed | In | Out |
|---|---|---|---|---|---|
| Birth | Maximize click | the panel's `scale` 0.78 → 1 and `opacity` 0 → 1 (`styles.css:30-45`) | CSS animation, 210 ms (`--spring-dock-duration`), `--spring-dock` on both | 210 ms | |
| Scrim | the same | the root's `background` to `--overlay-scrim` (`styles.css:15`) | no transition | one frame | one frame |
| Collapse | Escape, or the Minimize click | everything returns | none | | one frame (a cut) |
| Expand/Minimize icon | the same | two chrome blocks swapped by `hidden` | none | one frame | one frame |
| Trigger hover | pointer over | `color` | 200 ms (`--duration-fast`) | | |
| Reduced motion | expand | opacity only | a local 0.12 s fade (`styles.css:113-115`), overridden by the universal carve | one frame | one frame |

### Tabs content panel

SegmentedTabs ships no content panel. The panel is the consumer's element under the tabs (`harness/app/mounts/tabs.vue:87`). The indicator belongs to the drag record and is not repeated here.

| Animation | Trigger | What moves | Clock | In | Out |
|---|---|---|---|---|---|
| Panel swap | a tab click | the text, and the panel's height (27.9 ↔ 55.8 px) | none | one frame | one frame |

### Timeline (`components/timeline/Timeline.vue`)

| Animation | Trigger | What moves | Clock and easing, as computed | In | Out |
|---|---|---|---|---|---|
| Fill travel | `progress` rises | each span's `.tl__fill` `translateX`, driven by `--tl-f` from a JS spring on the dock preset (`:98-114`, `:146-155`, `:476`) | `useSpring`, response 0.3, damping 0.88; 46 px in about 290 ms, with no snap | 290 ms | |
| Fill when progress falls (Reset) | `progress` or `state` falls | the same | none: the per-span clamp (`:150-152`) | | one frame |
| Meniscus cap | the travel's velocity | `.tl__cap` `scaleX` | `useLiquidFlex` tanh | measured at most 1.0017 (no visible stretch) | |
| Mark state (pending, active, completed) | `state` changes | `.tl__disc` `background`, `border-color`, `border-width` | none (`:599-610`) | one frame | one frame |
| Current ring | `current` changes | `box-shadow` 0 0 0 2px | none (`:614-620`) | one frame | one frame |
| Check | `state` becomes completed | `stroke-dashoffset` 32 → 0 | CSS animation `tl-check`, 210 ms on `--spring-dock` (`:648`); mounted by `v-if` | 210 ms | removed with no frames |
| Mark hover | pointer over | `.tl__disc` `scale` 1 → 1.08 and `background` | none (`:663-671`) | one frame | one frame |
| Detail swap | hover, focus or select on another mark | the old detail is removed; the new one fades in and travels 8 px (`tl-detail`, `:682-697`) | 210 ms on `--spring-dock` | 210 ms | the old one is cut |
| Flow band | active, or indeterminate | `.track-flow` sweep | the register's loop | | |
| Reduced motion | any | the springs seat at once; the check and detail lose their animations (`:708-720`) | | one frame | one frame |

### TypewriterText (`components/typewriter/TypewriterText.vue`)

| Animation | Trigger | What moves | Clock | In | Out |
|---|---|---|---|---|---|
| Glyphs | the typing clock | one grapheme appears or disappears per keystroke | `useTypewriter`, about 75 to 120 ms a key in the story | a glyph lands whole, by design | the same |
| Cursor travel | each keystroke | the cursor's x | none | one frame | |
| Cursor blink | not typing | opacity 1/0 | `typewriter-blink 1.06s step-end` (`:236-238`); not reached (see below) | | |
| Reserve | mount | none: hidden settled phrases size the box (`:7-15`) | | | |

### Deck (`components/deck/styles/turn.css`, `stage.css`; PagerDots)

| Animation | Trigger | What moves | Clock and easing, as computed | In | Out |
|---|---|---|---|---|---|
| Turn, entering page | Next, Prev, a pager dot, keys | `transform` translate3d(100cqi → 0), `rotateY(6deg → 0)`; `opacity` 0 → 1 | transform 570 ms on `--spring-world`; opacity 300 ms `cubic-bezier(0.4, 0, 0.2, 1)` (`turn.css:97-100`, `:123-126`) | transform 570 ms, opacity 218 ms (2 % band) | |
| Turn, leaving page | the same | `transform` 0 → −100cqi, `scale` → 0.985; `opacity` 1 → 0; `visibility` hidden after 570 ms | the same | | the same (a push; the out and in are one gesture) |
| Leaving page scrim | the same | `::after` opacity | 300 ms | | |
| Flat push (390, square or short stage) | the same | translate 88cqi, no lift | `--spring-panel-duration` (450 ms), opacity 200 ms (`turn.css:169-179`) | | |
| Pager worm | the active index changes | `.goo-body`, `.goo-neck` | JS spring (PagerDots) | see the drag record, P-1 to P-3 | |
| Pager dot | the active index changes | dot `::before` `background-color` 200 ms, `scale` 120 ms | | | |
| Build reveals | step index | `deck-reveal-rise` and `deck-reveal-fade` (`reveal.css:20-60`) | not reached: the story's slides have no builds | | |
| Reduced motion | any | opacity only, 200 ms, by the local arm (`turn.css:192-201`), overridden by the universal carve | | one frame | one frame |

### Configurator (`components/configurator/ConfiguratorLayer.vue`, `styles.css`)

| Animation | Trigger | What moves | Clock and easing, as computed | In | Out |
|---|---|---|---|---|---|
| Layer reveal | the layer trigger | `grid-template-rows` 0fr ↔ 1fr (`ConfiguratorLayer.vue:195-196`, `:238-240`); the body is clipped, not faded | 210 ms (`--spring-dock-duration`), `--spring-dock` | 210 ms | 210 ms |
| Chevron | the same | `rotate` (Tailwind `rotate-180`) | `transition-disclosure`: 200 ms, `--ease-cartoon-punch` (`:168`) | 200 ms | 200 ms |
| Trigger hover | pointer over | `background` | 120 ms (`transition-control`; `styles.css:245-260`) | | |
| Preset tile select | a tile click | `.is-active`: an inset 2 px ring and a deeper cast (`styles.css:511-517`) | none: the shadow lists differ in length | one frame | one frame |
| Reset button | a value leaves its preset | `v-if="canReset"` (`ConfiguratorRow.vue:156`) | none | appears | cut |
| Preset well shimmer | loading | `background-position` loop 1.2 s | not reached (the field build is synchronous) | | |
| Reduced motion | any | `transition: none` on the region (`ConfiguratorLayer.vue:241-245`) | | one frame | one frame |

## Faults

Each block gives the component, the motion and the fault kind, then:
- the frames and values;
- the strip;
- the source line;
- the smallest cure.

The cure line also says whether it is a patch (no API change) or the work of a wave.

**D-1 · Accordion and Collapsible · open or close reversed mid-motion · INTERRUPTION (it restarts from the far end)**
- **Rows:** `rows/acc-reverse.tree-v11.0.1.chromium.1440-fine-light.rows.json`, item 1 (89.83 px open).

| reversed at | frames | height before → after | what follows |
|---|---|---|---|
| close, 30 % | f14 → f15 | 56.08 → 0.00 | grows again from 0 (2.28, 5.52, ...) |
| close, 50 % | f107 → f108 | step −39.06 | the same |
| close, 80 % | f206 → f207 | step −16.14 | the same |
| open, 30 % | f382 → f383 | 33.31 → 89.83 | closes from the full height (87.42, 84.23, ...) |
| open, 50 % | f477 → f478 | step +39.00 | the same |
| open, 80 % | f578 → f579 | step +15.95 | the same |

- On every reversal the content's `animation-name` switches between `disclosure-close` and `disclosure-open`. The new keyframe starts at its own `from`, not at the height on screen. The content flashes empty, or flashes full, for one frame and then runs a full 200 ms.
- The chevron turns from where it is (172.4° → 180° in one frame), so for that frame the chevron and the content disagree.
- The collapsible reads the same (`rows/col-reverse...`, INTERRUPTION at both marks).
- **Strips:** `strips/acc-reverse.tree-v11.0.1.chromium.1440-fine-light.seg1.start.png` (close reversed at 30 %), `...seg4.start.png` (open reversed at 30 %).
- **Source:** `components/_shared/disclosure/disclosure.css:1-23, 117-123`. Two keyframes with fixed `from` values are swapped by `data-state`.
- **Smallest cure (patch):** when `data-state` flips while an animation is running, start the new one at the mirrored progress. In the content component, on the state change, read the running animation's progress p, and once the new animation is created set its `currentTime` to (1 − p) × duration. A wave could instead move the reveal onto one interruptible transition. reka's presence needs an animation on close, so that is a larger change.

**D-2 · Collapsible · open and close · FIRST-FRAME JUMP and LAST-FRAME SNAP of everything below (the 12 px gap)**
- **Rows:** `rows/col.tree-v11.0.1.chromium.1440-fine-light.rows.json`, collapsible-0. The caption under the frame is `cap0`.
- **Open:** the content mounts at f7 at height 0, and in that same frame the caption drops 12.00 px (232.44 → 244.44). Then it follows the content's height (0.25, 1.73, ...).
- **Close:** the content shrinks to 1.17 px at f111. At f112 it unmounts and the caption jumps −13.17 px: 1.17 px of tail plus the 12 px gap. That is 23 % of the travel in one frame.
- At 390 coarse it is the same: +12.00 at f10, −12.50 at f129 to f130, 40 % of that travel.
- Under reduced motion it is a two-frame cut: the gap at f8, the content at f9 (`rows/col...1440-rm`).
- **Strips:** `strips/col.tree-v11.0.1.chromium.1440-fine-light.seg1.start.png` (open), `...seg2.end.png` (close).
- **Source:**
  - The story puts `class="grid gap-3"` on every `Collapsible` (`demo/stories/containers/collapsible.vue:26, 40, 61, 117, 132`), and `CollapsibleContent` unmounts when closed. The grid's gap appears and leaves with the row, and nothing tweens it.
  - The Accordion does not show this, because its spacing lives inside the clipped body (`.disclosure-content-body` padding, `disclosure.css:125-127`).
- **Smallest cure (patch):**
  - Give `CollapsibleContent` the same inner body wrapper the Accordion has, so spacing sits inside the clipped box.
  - Change the stories to use it instead of `gap-3`.
  - Say in the README that a gap on the root jumps.

**D-3 · Timeline · progress falls (Reset) · FIRST-FRAME JUMP (lands whole)**
- **Rows:** `rows/tl-advance.tree-v11.0.1.chromium.1440-fine-light.rows.json`, the Reset at f294.
- At f294 the Build fill jumps from full to 45 % (translateX 0.00 → −101.64 px) in one frame, and Beta's fill drops from 10 % to 0 (−95.03 → −105.59). Nothing moves after that.
- The aggregate spring does travel backwards (`aria-valuenow` falls over about 300 ms), but the fills never show it.
- The same holds for any fall in `progress`, or a state that goes back from completed.
- **Strip:** `strips/tl-advance.tree-v11.0.1.chromium.1440-fine-light.seg4.start.png`.
- **Source:** `Timeline.vue:146-155`. Each span takes `Math.min(remaining, own)`, and `own` is the span's new data at once, so a lower target clamps the fill in the first frame.
- **Smallest cure (patch):** while the travel is running, clamp each span to the larger of its old and new effective progress, and drop to the new one only on settle. Or give each span its own spring on `--tl-f`.

**D-4 · ExpandableContainer · collapse, and expand reversed · OUT AGAINST IN (a cut), and the scrim lands whole**
- **Rows:** `rows/exp.tree-v11.0.1.chromium.1440-fine-light.rows.json`.
- **Expand (f7 → f8):**
  - The scrim goes from `rgba(0,0,0,0)` to its full colour in one frame.
  - In the same frame the panel leaves its 118.5 px card and appears at 1123.2 px wide (scale 0.78 of the viewport) at x 158.4, at opacity 0. Then it grows on the dock spring for 210 ms.
  - It grows from the viewport's centre, not from the card it came from, although the stylesheet comment says it "grows out of the rect it was promoted from" (`styles.css:20-21`).
- **Escape (f127) and Minimize (f319):** the panel is back in its card in one frame (width 1440 → 118.5), and the scrim is gone in the same frame. The out has no frames.
- **Reversed** (Escape at 30, 50 and 80 % of the birth; `rows/exp-reverse...`): the panel jumps −1116, −1177 and −1267 px in one frame (f16 → f17, f79 → f80, f146 → f147).
- The page under it did not reflow in this story: the card holds its row in a two-column grid, card1.h stays at 234. The census note about reflow holds only for a container that is alone in its flow.
- **Strips:** `strips/exp.tree-v11.0.1.chromium.1440-fine-light.seg1.start.png` (the birth and the scrim), `...seg2.start.png` (the Escape cut), `strips/exp-reverse.tree-v11.0.1.chromium.1440-fine-light.seg2.start.png` (reversed at 50 %).
- **Source:** `expandable-container/styles.css:6-17` (no transition on the scrim), `:41-45` (an enter animation only), and `ExpandableContainer.vue:2, 12` (the `Teleport` and `data-state` flip at once).
- **Cure:** the scrim's fade in and out is a patch: transition `background-color` 200 ms in and 150 ms out. The exit itself needs the panel to stay teleported until an exit animation ends, plus an origin taken from the card's rect. That is the wave's work (census 20, W-I-series).

**D-5 · Disclosure chevron (Accordion, Collapsible story, Configurator layer; also every `transition-disclosure` user) · REVERSAL (overshoot and anticipation on a control)**
- **Rows:** `rows/acc-single.tree-v11.0.1.chromium.1440-fine-light.rows.json`, item 2 opening (f163 to f190).
- The chevron first turns backwards to −6.7°.
- By f182 it overshoots to 218.93°, which is 38.9° past 180, or 21.6 % of the travel. It then swings back over eight frames (213.05, 206.66, ... 180.84) and lands at f190.
- Every open and close shows the same: 36.9 to 38.9° in the accordion, 38.1° and 37.8° in the configurator (`rows/cfg-layer...`), and 37.5° and 39.0° in the collapsible story.
- **Against the content:**
  - The chevron is at 31° when the content is 57 % open (f172 in the first run).
  - It reaches 180° when the content is at 87 %, and then is still swinging when the content lands.
  - The content's 2 % band runs 66 to 246 ms; the chevron's runs 73 to 231 ms, and its overshoot sits inside the content's last third.
- motion-canon P2 says controls ease without overshoot, and that overshoot belongs only to the ruled spatial morphs (the dock, the blob, the card shuffle). The `--ease-cartoon-punch` curve designs this overshoot (it peaks at 1.22), so it is designed, but against the canon.
- **Strip:** `strips/acc-single.tree-v11.0.1.chromium.1440-fine-light.seg3.end.png`. The chevron is caught past vertical in several tiles.
- **Source:** `styles/utilities/btn.css:82-83` (`transition: rotate var(--spring-present-duration) var(--ease-cartoon-punch)`).
- **Smallest cure (patch):** put `transition-disclosure` on the content's own curve, `--spring-present` (or `--ease-standard`), so that the glyph and the box share one clock.

**D-6 · Accordion, Collapsible, Configurator, ExpandableContainer, Deck · the end of every spring · LAST-FRAME SNAP (the spring tail)**

| Where | Rows | Frames | Last step against the one before |
|---|---|---|---|
| Accordion open | `acc-single...1440-fine-light` | f189 → f190 | +2.33 px after +0.31; the item below lands the same way |
| Accordion close | the same | f111 → f112 | −2.34 after −0.64 |
| Accordion close | the same | f265 → f266 | −2.34 after −0.30 |
| Accordion, multiple | `acc-multi...1440-fine-light` | f33 | −2.44 after −0.56 |
| Accordion, multiple | the same | f43 | +1.66 after +0.28 |
| Collapsible open | `col...1440-fine-light` | f34 → f35 | +1.19 after +0.33 |
| Configurator layer open | `cfg-layer...1440-fine-light` | f119 → f120 | **+10.39 px after +1.98** (the region is 385 px) |
| Configurator layer reopen | the same | f201 → f202 | +7.75 after +4.08 |
| ExpandableContainer birth | `exp...1440-fine-light` | f34 → f35 | panel width +8.55 after +1.37 |
| ExpandableContainer birth | the same | f271 → f272 | +7.22 after +3.18 |
| Deck turn (Prev) | `deck-turn...1440-fine-light` | f213 | +6.05 px after +0.79, then +1.83 |
| Deck turn (first run) | first run, overwritten | f77 to f79 | −2.50, −3.71, −2.32 after −0.90 |

- The snap scales with the travel. It is under 2.5 px on a short accordion item and 8 to 10 px on the configurator layer, the expanding panel and the deck. At those sizes it reads as a small kick at the landing.
- **Strip:** `strips/cfg-layer.tree-v11.0.1.chromium.1440-fine-light.seg1.end.png` (the close; the last tile moves the next trigger 8.4 px).
- **Source:** `styles/tokens/scheme-spring.css:60, 61, 64`, generated by `scripts/regen-spring-tokens.mjs` from `composables/motion/spring/springPresets.ts:66-122` (settle band 0.02 for present and dock, 0.005 for world). The curve's last sample is short of 1, and the last segment jumps.
- **Smallest cure (patch, token regeneration, no API change):** have the generator divide every sample by the curve's value at its last sample, so the curve reaches 1 continuously. The drag record proposes a different cure: sample the dock row to 0.005, as world is. The world row here shows that 0.005 still leaves 8 px on a full-stage travel, so the rescale is the cure that ends it for every row.

**D-7 · Reduced motion across the family · a cut, not a fade (two local fades are overridden)**
- Each row below holds the content at its rest value in one frame.

| Component | Rows (1440-rm) | Frames |
|---|---|---|
| Accordion swap | `acc-single` | 89.83 → 0 and 0 → 89.83 at f7 → f8; the chevron turns 180° in one frame |
| Collapsible | `col` | the gap at f8, the content at f9 |
| ExpandableContainer | `exp` | opacity 0 → 1 in f8 → f9 |
| Deck | `deck-turn` | the pages' opacities swap at f7 |
| Configurator | `cfg-layer` | the 385 px region and the 180° chevron at f7 |
| Timeline | `tl-advance` | the fill +46.20 px at f8 and f64 |

- ExpandableContainer (`styles.css:113-115`, a 0.12 s fade) and the deck (`turn.css:192-201`, a 200 ms fade) each author a reduced-motion fade. Neither survives: the universal carve sets `transition-duration: 0s !important` and `animation-duration: 0.01ms !important` (`styles/utilities/a11y-overrides.css:46-53`).
- P6 asks for a shortened fade. This is census item 4, confirmed per component.
- **Strips:** `strips/acc-single.tree-v11.0.1.chromium.1440-rm.seg1.start.png`, `strips/exp.tree-v11.0.1.chromium.1440-rm.seg1.start.png`, `strips/deck-turn.tree-v11.0.1.chromium.1440-rm.seg1.start.png`.
- **Cure (wave):** the carve must exempt the opacity legs the canon authorises. That is the BJ PRM-authorised set named in the carve's own comment. It is one rule, but it touches every component, so it belongs to the wave that owns census 4.

**D-8 · Timeline · completion · MISMATCH (the disc fills before the fill front reaches it), and the mark state snaps**
- **Rows:** `rows/tl-advance.tree-v11.0.1.chromium.1440-fine-light.rows.json`, the third Advance at f197.
- At f197 the Build disc turns from the card colour to the accent in one frame, while the Build fill is still 8.26 px short of the mark. The fill arrives at f204, about 60 ms later.
- In the same frame:
  - Beta's ring changes colour (border alpha 0.48 → 1, LANDS WHOLE) and width (1 → 2 px).
  - The current ring (`box-shadow 0 0 0 2px`) moves from Build to Beta (DISCRETE).
  - The old detail is removed and the new one starts at opacity 0.
- The check mounts at f197 and draws on over 210 ms. On Reset (f294) the check is removed with no frames.
- **Strip:** `strips/tl-advance.tree-v11.0.1.chromium.1440-fine-light.seg3.start.png`.
- **Source:** `Timeline.vue:578-627` (no transition on the disc), `:360-367` (`v-if` on the check), `:373` (keyed detail).
- **Smallest cure (patch):**
  - Transition the disc's `background-color`, `border-color` and `box-shadow` (200 ms `--ease-standard`).
  - Start the state paint when the travel's front crosses the mark: the component already computes `crossing` for that.

**D-9 · Timeline · mark hover · FIRST-FRAME JUMP (lands whole), in and out**
- **Rows:** `rows/tl-hover.tree-v11.0.1.chromium.1440-fine-light.rows.json`.
- At f7 Beta's disc grows from scale 1.00 to 1.08 and takes its hover fill (`rgb(253,245,236)` → oklab 0.950) in one frame. On the move to Design (f82) it returns in one frame.
- The detail below is cut and the new one fades in over about 220 ms (f7 to f37).
- The dark cell is the same (`rows/tl-hover...1440-fine-dark`).
- **Strip:** `strips/tl-hover.tree-v11.0.1.chromium.1440-fine-light.seg1.start.png`.
- **Source:** `Timeline.vue:663-676`.
- **Smallest cure (patch):** add `transition: scale 120ms var(--ease-standard), background-color 120ms var(--ease-standard)` to `.tl__disc`. The pager dot is the model in the house.

**D-10 · Deck · a turn reversed mid-travel · INTERRUPTION (the velocity turns in one frame)**
- **Rows:** `rows/deck-reverse.tree-v11.0.1.chromium.1440-fine-light.rows.json`.
- Prev pressed at 30, 50 and 80 % of the entering page's travel.
- The position is continuous, but at 50 % (f167 → f168) the step goes from −30.65 px to +12.51 px, then +33, +43, +53 px. The page stops dead and accelerates back from zero.
- 30 % (f20) and 80 % (f328) read the same.
- **Strip:** `strips/deck-reverse.tree-v11.0.1.chromium.1440-fine-light.seg2.start.png`.
- **Source:** `turn.css:97-100`. A CSS transition retargets from the current value with zero velocity and a fresh 570 ms clock. It is the same cause as the tabs T-4 in the drag record.
- **Cure (wave):** carry the turn on a JS spring that keeps velocity. This is not a patch.

**D-11 · Deck · the first turn on a fresh page · DROPPED FRAMES**
- **Rows:** `rows/deck-turn.tree-v11.0.1.chromium.1440-fine-light.rows.json`.
- The very first Next ran a 282.6 ms frame at f77 → f78. It was a long animation frame with no script attributed, so it was render work. The page landed 14.62 px in that one frame.
- The first run of the same cell (since overwritten) had a 49.4 ms frame at its f13 → f14, early in the travel: a 327 px step.
- The traced run, the coarse run and every later turn showed no gap.
- The machine was under load during these runs (the guard waited for load 44 > 36), so this is ranked low until it repeats on a quiet machine.
- **Strip:** `strips/deck-turn.tree-v11.0.1.chromium.1440-fine-light.seg1.end.png`.
- **Likely cause:** the first raster of the next page, which was `visibility: hidden` until that frame, with a `glass-floating` backdrop and `will-change` on every slide (`turn.css:101`).
- **Cure:** to be named after a quiet-machine repeat. If it holds, rasterise the neighbour pages once at mount.

**D-12 · Configurator · preset tile selected · DISCRETE (the ring and the cast swap in one frame)**
- **Rows:** `rows/cfg-preset.tree-v11.0.1.chromium.1440-fine-light.rows.json`.
- At f278 the clicked tile takes its inset 2 px ring and the deeper cast, and the old tile loses them, in one frame. The shadow lists differ in length, so no transition could interpolate them. The dark cell is the same.
- The first click in this scenario landed on the tile that was already active, so only one change was recorded.
- **Strip:** `strips/cfg-preset.tree-v11.0.1.chromium.1440-fine-light.start.png`.
- **Source:** `configurator/styles.css:511-517`, and the story's `shadow-cartoon-md` (`demo/stories/containers/configurator.vue:211`).
- **Smallest cure (patch):** give the resting tile the same list, with the ring at `inset 0 0 0 0 transparent`, and transition `box-shadow` 200 ms.

**D-13 · Tabs content panel · the consumer's panel swaps whole (FIRST-FRAME JUMP, lands whole)**
- **Rows:** `rows/tabs-panel.tree-v11.0.1.chromium.1440-fine-light.rows.json`.
- The panel goes 27.91 → 55.81 px at f7, and back at f92. Its text is cut. The indicator then glides for 230 ms under a panel that has already changed.
- This confirms the drag record's T-6 (same page, same numbers).
- At 390 coarse the tap did not land on a tab: the page is wider than the viewport, and the tap's coordinates missed. Not reached at 390.
- **Strip:** `strips/tabs-panel.tree-v11.0.1.chromium.1440-fine-light.seg1.start.png`.
- **Source:** none in the library; SegmentedTabs has no panel.
- **Cure (wave):** a panel recipe (cross-fade inside a silhouette whose height tweens), if the gestalt rules that the tabs owe one.

**D-14 · Configurator · layer reveal · the content is clipped, never faded, and the chevron leads with a backward turn**
- **Rows:** `rows/cfg-layer.tree-v11.0.1.chromium.1440-fine-light.rows.json`, f7 to f37 of the first run.
- The body keeps opacity 1 throughout (`body1.eop` 1.00). The 385 px region closes as a hard clip edge sweeping up through the text.
- The chevron turns backwards 6.5° (f9 to f11) before it starts.
- P3 (fade coupled to transform) is not met. The accordion, by contrast, fades its content with its height.
- **Strip:** `strips/cfg-layer.tree-v11.0.1.chromium.1440-fine-light.seg1.start.png`.
- **Source:** `ConfiguratorLayer.vue:195-196, 238-240`.
- **Smallest cure (patch):** add an opacity transition on the inner wrapper, keyed to `data-state` (150 ms out, 200 ms in, `--ease-standard`).

## Layout in frames (traced runs, `rows/trace/`)

| Motion | Changed frames | Frames with layout | Layout per frame |
|---|---|---|---|
| Accordion open, close, swap (`acc-single`) | 129 | 98 | median 0.10 ms, at most 0.96 ms |
| Configurator layer (`cfg-layer`) | 104 | 81 | median 0.15 ms, at most 2.47 ms |
| Deck turns (`deck-turn`) | 305 | 5 | the turn itself is compositor-only |

The two reveals lay out on every frame they move. The canon allows this as a bounded one-shot reclaim (P5). At these sizes it costs well under a frame, so it is a cost and not a visible fault.

## Ranked by how visible

1. **D-1** Accordion and Collapsible: a reversed open or close restarts from the far end. The content flashes empty or full, a 16 to 57 px jump.
2. **D-4** ExpandableContainer: the collapse is a cut, a reversed expand jumps over 1100 px, and the scrim lands whole.
3. **D-3** Timeline: a falling progress clamps the fill in one frame (101.6 px).
4. **D-2** Collapsible: everything below jumps by the 12 px gap on the first frame of an open and the last frame of a close.
5. **D-5** The disclosure chevron overshoots 37 to 39° and turns backwards first, on every open and close, against P2.
6. **D-6** The spring tail: the last frame is 3 to 5 times the one before it. It is 8 to 10 px on the configurator layer, the expanding panel and the deck.
7. **D-8** Timeline completion: the disc fills before the front arrives, and the state paints snap.
8. **D-9** Timeline mark hover: the grow and fill snap, in and out.
9. **D-7** Reduced motion is a cut everywhere, and two authored fades are overridden.
10. **D-10** Deck: a reversed turn stops dead and restarts from zero velocity.
11. **D-14** Configurator layer: a clip with no fade; the chevron leads backwards.
12. **D-12** Configurator preset tile: the ring and cast swap in one frame.
13. **D-13** Tabs content panel: the consumer's panel swaps whole (the drag record's T-6).
14. **D-11** Deck: one long frame on the first turn of a fresh page, seen twice under machine load.

## Read and found clean

- **Accordion swap.** The two items share one clock and the same frames, so the item below holds still (t3.y 422.05 throughout). As a whole it reads as one gesture with a soft start; only the chevron's swing and the 2.3 px landing break it.
- **Accordion, multiple.** Closing one item while another opens 60 ms later: the items below follow the sum with no step. The two clocks are offset by the input, not by the component.
- **Accordion trigger hover.** 120 ms in and out on `cubic-bezier(0.4, 0, 0.2, 1)`, in both light and dark: one fade each way. (The analyser's "lands whole" lines there are the transparent colour's L, a and b, which do not paint.)
- **Timeline fill travel.** On a rise (0.45 → 0.70 → 0.95) the first step is 2.3 px, there is no reversal, and there are under 80 ms of sub-pixel tail. It reads as one push.
- **Timeline check.** It draws on as a stroke over 210 ms, apart from the tail (D-6).
- **Typewriter.** The reserve holds the box: the root and hero sizes do not change over 7 s of typing, deletion and wrapping, at 1440 or at 390. Glyphs land whole by design. Reduced motion shows the settled phrase with no change.
- **Deck turn (forward and back).**
  - The leaving and entering pages share one transform clock to the frame.
  - The fade (218 ms) finishes inside the travel (570 ms), as `turn.css` intends.
  - `visibility` holds the leaving page until the travel ends, with no flicker at either end.
  - It reads as one push, apart from the landing (D-6) and the first-turn frame (D-11).
- **Deck at 390.** The flat push runs on the panel clock with no 3D. No dropped frame.
- **Configurator reveal reversed at 50 %.** It turns from where it is (f187 → f188: 174.05 → 182.61 px), with no jump. The velocity changes sign in a frame, but at this speed it reads as a turn.
- **Collapsible and Accordion at 390 coarse.** The same as at 1440, with the same faults.

## Not reached

- **Deck build reveals** (`reveal.css`): the story's slides have no build steps.
- **Typewriter cursor blink:** in rotation mode the cursor never took `tw-cursor--blink` during the 2.2 s holds. Its class stayed `tw-cursor` and its opacity stayed 1 at both cells (`rows/tw...`), so the blink was never on screen. This may be a behaviour fault (`isTyping` stays true through the hold, `TypewriterText.vue:22-37`), but it was not followed further.
- **Configurator preset shimmer:** the well's loading state never showed.
- **Configurator expand host** (`Configurator.vue:290-310`): the story is not `expandable`. Its motion is ExpandableContainer's (D-4).
- **The tabs panel at 390 coarse:** the tap missed (D-13).
- **The timeline flow band:** recorded as running; it is the register's loop, and not this family's to judge.
- **WebKit:** the engine aborted at launch (above). Nothing is confirmed there.
