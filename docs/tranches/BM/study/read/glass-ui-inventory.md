# BM study, read: glass-ui's side of the union

The inventory seat, claude-opus-5-5 (asserted from its own system identity), 2026-11-22. I read source and records only. I launched no browser, no build and no server, ran nothing in the `bl/dock/wi8` worktree, changed no source and staged nothing.

**Trees read.** Master at `eeff5a54d`. `bl/dock/wi8` at `a5a4fe546` through its worktree `.claude/worktrees/bl/dock/wi8` (files only; RULINGS-8 names its source at `575084358`). `release/11.1.1` at `1dca81ae4` through `.claude/worktrees/release-11.1.1` (its CHANGELOG and `src/styles/glass/reveal.css` only).

**Kinds of reading.** *Source* quotes code at a file and line. *Record* quotes our own docs. *Count* is a `wc -l` or `git diff --stat` I ran today. *Web* is a public page, cited by URL. *Hypothesis* has no reading behind it and is marked as one.

---

## 0. The top line

1. **No facility has ever been read in production iOS Safari.** The 11.1.0 lane notes say "real iOS Safari and Android Chrome are not measured" (`docs/release-11.1.0/lane-L6.md:367`). Every WebKit cell in BL's dock work is Playwright WebKit, which draws no backdrop blur (`docs/tranches/BL/design/dock/wi8/RULINGS-8.md:19`, `:101`; `OWNER-READ.md:89`), and "Whether real Safari agrees with any of it" is still open (`RULINGS-8.md:594`). The one real-Safari pass on record was macOS Safari 26.4 through safaridriver on 2026-07-24: every route rendered while Playwright WebKit crashed 5/5 (`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/memory/feedback_playwright_webkit_not_safari.md`). Two source comments cite real Safari 26.4: the run's scroll-snap set (`src/components/dock/styles/run.css:30-33`) and `corner-shape: squircle` reading false (`run.css:679-680`). Neither says which device was used, and no release record carries those readings.
2. **Most of our motion runs on the main thread.** The dock fold, the run mark, the dialog and sheet mounts, the drag morph and the slider's velocity term are all JS springs on `requestAnimationFrame`. Several CSS transitions animate layout or paint properties: the segmented indicator's `width`/`height`, the run seats' `inline-size`, and the menu's `clip-path`. The legs that can run on the compositor alone are few: the reveal's `scale`/`translate`/`opacity` transitions, the switch thumb's `translate`, the indicator's `translate` leg and the loupe's `scale`. On iOS Safari, rAF delivers at most 60 Hz, which is the post's premise (https://rida.dev/blog/bypassing-ios-safari-60-fps-limit; `docs/tranches/BM/CHARTER.md:19-20`). So every JS-driven motion we ship is bound to 60 Hz there by construction. This is an inference from the post and our mechanisms; it was never measured on our parts.
3. **We already have three lens-like parts and four fusion-like ones** (section 11). None of them refracts or magnifies the page behind it. The nearest thing to magnification is the slider's loupe, which re-lays out a copy of the track at 3× and scales it down (`src/components/slider/styles.css:466-575`). It is a DOM copy of known content, not a page snapshot.
4. **Fusion was built and cut.** The dock's fission seat with a goo neck was built three ways and failed in both engines (`RULINGS-2.md:88-90`). It is booked for 12.0.0 "behind one crop" (`RULINGS-8.md:662`; `OWNER-READ.md:52`, `:62`). The goo stylesheets that came before it were deleted as "the prime Safari suspect" (`src/components/dock/styles/index.css:72-76`).

---

## 1. Engine facts the rows below lean on

- **What composites by default.** Chromium's default list is `opacity`, `filter` and `transform`; `background-color` and `clip-path` "will soon join" (https://developer.chrome.com/blog/hardware-accelerated-animations, written around Chromium 88-89). web.dev names `transform` and `opacity` as the two cheap properties (https://web.dev/articles/animations-overview). WebKit's own record says opacity, transform and filter run hardware-composited under CSS Animations (https://auto-bugs.webkit.org/show_bug.cgi?id=179973, 2017). That WebKit also runs `backdrop-filter` off the main thread is only claimed secondhand, in a Gecko bug (https://bugzilla.mozilla.org/show_bug.cgi?id=1625029). No source I found puts `clip-path`, `border-radius`, `inset`, `width`/`height` or a custom property on WebKit's composited list. *Hypothesis:* in Safari each of those repaints or re-lays out on the main thread every frame.
- **A JS write each frame runs on the main thread**, whatever property it writes. When it writes a registered custom property, every rule that reads it recomputes style. Two of our records say otherwise:
  - `src/components/dock/styles/index.css:92` says the `@property`-registered `--dock-morph-t` "interpolates COMPOSITED". It is written from JS each frame (`useDockMorph.ts:96-98`), so nothing composites it.
  - `docs/precepts/motion-canon.md:171-174` (P5) lists `clip-path`, paint properties and "`--*` customs that resolve onto them" as compositor-safe. By the sources above, only transform, opacity and filter are.
  The study should correct both records rather than build on them.
- **Our test engines.** Playwright WebKit is the engine build, not Safari (`docs/tranches/BL/PLAN.md:34`; the memory record above). Headless Chromium defaults to SwiftShader, so frame-rate cells need the GPU lane. That is why the ninth pass runs its cost cells there (`RULINGS-8.md:598`), and atlas discards SwiftShader cells (`docs/tranches/BM/study/INBOUND.md` atlas §3).

---

## 2. The summary table

"Comp." lists the legs that can run on the compositor. "Main" lists the work done on the main thread in each frame of the motion. Sizes are *Count* (lines, `wc -l` over the directory) and, where the release notes give one, the entry's gzipped bytes from `.claude/worktrees/release-11.1.1/CHANGELOG.md:158-168` (11.1.0 → 11.1.1).

| Facility | Public names | Mechanism | Comp. | Main, each frame | Size | Idiomatic? | iOS Safari |
|---|---|---|---|---|---|---|---|
| Dock shell and plate | `GlassDock`, `backdropMode`, `shape` | one `.dock-plate` with the dock's single `backdrop-filter` | the plate's blur (secondhand, §1) | backdrop resample when the plate's box changes | dock dir 11,215 lines; `/dock` 40,541 → 40,533 B gz | idiomatic | unread; Playwright WebKit draws no blur |
| Fold and open (master) | `collapse`, `expandOn`, `--dock-morph-t`, `--dock-expand-t` | JS spring on rAF writes one scalar; a reserved box plus `scale`, with a counter-scale on the content | `scale` | the scalar write and style recalc; `padding-inline` re-layout; plate ink repaint | `useDockMorph.ts` 136, `dockMorphMeasure.ts` 777, `morph.css` 409, `layers.css` 403 | idiomatic, with measurement workarounds (§3.2) | unread; owner saw a squared plate and a ghost in Safari (OD-16) |
| Fold and open (wi8, 11.2.0) | same, plus `data-morphing` | one rAF loop per dock with its own closed-form spring; writes the plate's `inset` and `border-radius`, region `clip-path` and `translate` | the region and face `translate` | plate re-layout and backdrop resample; region clip repaint | `useDockBody.ts` +1,359; dock code 5,246 against 4,741 | idiomatic; P7 conflict (§3.3) | unread |
| Run and run mark | `aria-current`, `.dock-run-mark` | an inert absolute plate; a JS spring writes five lengths from layout boxes; native scroll-snap run | none | `inset`, `width`, `height` and `border-radius` re-layout and repaint | `useDockRunMark.ts` 281; `run.css` 1,059 | idiomatic | the scroll-snap set reads as supported in "real Safari 26.4" (`run.css:30-33`; device not named) |
| Face swap and switcher | `DockLayerGroup`, `DockLayer`, `DockCrossfade` | opacity overlap on the dock spring; the switcher indicator draggable through `useDragMorph` | opacity; the drag's `translate` | the spring and the scalar writes | `DockLayerGroup.vue` 284, `DockCrossfade.vue` 258 | idiomatic | unread |
| Holds and participation | `keepOpen()`, `release()`, `keep-dock-open` | the dock context; reka's dismissable-layer marker | — | — | `participation.ts` 156 | idiomatic | "a page scrolling under a still pointer… opens a dock in Safari" (`OWNER-READ.md:16`; engine not named) |
| Fission seat and goo | none shipped | built on the branch as the `#beside` slot with neck A (three leaves) and neck B (a `path()` clip) | — | — | struck | fails the readings | WebKit "flat deviation 204 to 209" (Playwright WebKit, `RULINGS-2.md:89`) |
| Overlay reveal | `.glass-reveal`, `data-reveal`, `--enter-*`, `--exit-curve`, `leave-finished` (11.1.1) | CSS transitions and `@starting-style`; a keyframe held for reka's presence | `scale`, `translate`, `opacity`, `filter` | none at rest; overlay blur repaint | `reveal.css` 382 | idiomatic; the presence hold is a workaround (§4.2) | unread |
| Menus and context menus | `DropdownMenu*`, `ContextMenu` | reka portal; a `clip-path` uncovers the plate from a strip the trigger's height | — | `clip-path` repaint, with the plate's backdrop under it | menu 995 lines; `menu` 11,865 → 12,555 B gz | idiomatic | unread |
| Select | `Select*` | same register as the menu; below 30rem it opens as a sheet at the foot of the screen | as menu | as menu | 642 lines; 8,453 → 9,517 B gz | idiomatic | unread |
| Popover and hover card | `Popover*` | panel role; 11.1.1 enters on opacity and a short slide | `opacity`, `translate` | — | 424 lines; 8,663 → 9,385 B gz | idiomatic | unread |
| Tooltip | `Tooltip*` | hint role; a bezier fade | `opacity` | — | 201 lines; 5,897 → 6,607 B gz | idiomatic | unread |
| Dialog and CommandDialog | `Dialog*`, `CommandDialog` | `useSpringMount` writes `scale` and `opacity` inline through Vue on each frame | the values it writes | spring tick, Vue patch, style | dialog 743, command 647; 12,508 → 14,529 and 16,804 → 18,898 B gz | idiomatic | unread |
| Sheet and detents | `Sheet*`, `v-model:detent` | `useSpringMount` slide; detents as a `block-size` scalar; a release projected through the spring to the nearest rung | `translate` | `block-size` re-layout while moving between rungs | 1,486 lines; 14,306 → 16,726 B gz | idiomatic | unread |
| SegmentedTabs | `SegmentedTabs`, `:draggable`, `variant` | a measured indicator gliding by CSS transition; a drag through `Draggable` that flings to the nearest tab | `translate` | `width`/`height` re-layout during the glide; drag spring and `transform` write | tabs 1,277 lines; 19,091 → 20,154 B gz | idiomatic; the size legs break P5 | unread |
| Slider loupe, grasp and veil | `Slider` `loupe`, `.glass-loupe` | a 3× copy of the track scaled to the value point; grasp carriers; a viewport-wide masked blur plate | loupe `scale`/`opacity`; veil `opacity` | velocity custom property each frame; loupe clone `transform` and `filter` from it | slider 1,161 lines | idiomatic; one pointer workaround (§6.1) | unread |
| Switch | `Switch` | the thumb's `translate` transition on `--spring-dock` | `translate` | none | 125 lines | idiomatic | unread |
| Glass material | `glass-plate`, rungs, `--glass-level`, `--glass-veil-*`, `--glass-blur-*` | `backdrop-filter: blur() saturate()` rungs and an ink veil | blur (secondhand) | backdrop resample under moving or resizing glass | glass CSS and tokens: 6,060 lines | idiomatic | Playwright WebKit draws no blur; Safari unread |
| Backdrop luminance | `useGlassBackdropLuminance` | downsamples a known canvas, or walks `elementsFromPoint`; at most 4 Hz | — | a sample per settle | 546 lines | idiomatic; never snapshots the page | unread |
| Spring system | `springPreset`, `SPRING_PRESETS`, `--spring-<row>`, `--spring-<row>-duration`, `--motion-tempo` | one table feeds JS `SpringProgress` and CSS `linear()` curves | CSS legs that use the `linear()` curve | JS springs tick on rAF | `spring/` 1,302 lines; `motion` 12,599 → 13,544 B gz | idiomatic | unread |
| FLIP fusion primitives | `useElementMorph`, `useLiquidReveal`, `useDockCtaReceive` | measured endpoints with a `transform`, opacity and blur channel | `transform`, `opacity`, `filter` | spring tick | `morph/` 1,951 lines | idiomatic | unread; no component mounts the reveal leaf |
| Blob | `Blob` | WebGPU metaballs with a declared WebGL2 path | its canvas | its rAF | blob 3,101 lines | idiomatic | unread |

---

## 3. The dock

### 3.1 Shell and plate (master)

- **What.** One surface with one layout axis, one collapse state machine and one motion spine (`src/components/dock/README.md:3-4`). Its parts are `GlassDock`, `DockControl`, `DockTrigger`, `DockSeparator`, `DockLayerGroup`, `DockLayer`, `DockCrossfade` and `DockBackgroundToggle` (`README.md:20-26`). Its props are `orientation`, `shape` (`pill`/`rounded`/`card`), `collapse` (`"closed"`/`"open"`/`false`), `expandOn` (`hover`/`press`), `anchor`, `collapsedLabel`, `backdropMode` (`live`/`static`), `fitContent` and `backgroundCanvas` (`README.md:34-44`). Its slots are `default`, `collapsed`, `persistent`, `persistent-end` and `search` (`README.md:78-85`).
- **Three layers** (`src/components/dock/styles/dock.css:1-50`):
  - L0 is `.dock-plate`, which holds the dock's one `backdrop-filter` (`dock.css:54`, `:78`).
  - L1 is the control run over the plate, with nothing clipping it at rest.
  - L2 is the transient surfaces.
  The plate's ink lerps between rungs on `--dock-expand-t` as one painted layer (`dock.css:118-125`), so the fold never crossfades two plates.
- **Blur and ink.** The plate reads `--dock-surface-blur: var(--glass-blur-resting)`, which is 16 px times `--glass-level` (`shell.css:58`; `src/styles/tokens/glass.css:71`, `:90`). Its ink rung is one step below resting (`glass.css:135`). The `static` mode paints an opaque plate with no backdrop sampling (`README.md:71-74`).
- **The fence.** No `filter` may sit on any ancestor of a lens, because it would make that ancestor the backdrop root (`morph.css:66-75`).
- **Compositor and main thread.** At rest nothing runs. The cost is the plate's backdrop resample whenever its painted box changes.
- **Idiomatic.**

### 3.2 Fold and open on master (the morph)

- **Drive.** One `SpringProgress` per dock (`composables/useDockSpring.ts:74-117`). It runs on `DOCK_SPRING`, which is `springPreset("dock")`: response 0.3 and ζ 0.88 (`constants.ts:11-14`; `src/composables/motion/spring/springPresets.ts:84-87`), with the response scaled by `--motion-tempo` (`useDockSpring.ts:95-101`). Each frame it writes `--dock-morph-t` on the root (`useDockMorph.ts:92-98`). A reversal mid-fold starts from `1 − t` and carries the velocity (`useDockMorph.ts:86-95`).
- **Geometry.** The box reserves its expanded footprint, and its visible size rides `scale: var(--dock-size-scale)`, a convex blend of two measured endpoints (`styles/layers.css:91-107`, `:126-131`; `styles/shape.css:105`). Each content region counter-scales so the content keeps its size (`shape.css:112-141`). The origin is measured, not centred (`layers.css:109-119`).
- **What else moves each frame:**
  - `padding-inline` is a `calc()` on `--dock-expand-t` (`morph.css:119-123`), which is a layout property.
  - The plate's ink, as above.
  - The leaving pane's opacity (`layers.css:194`) and each seat's `scale: calc(0.82 + 0.18 * var(--child-reveal))` (`layers.css:306`).
- **Measurement.** `dockMorphMeasure.ts` (777 lines) reads layout boxes by forcing layout under inline overrides. It carries two named WebKit workarounds:
  - WebKit does not restore an `!important` inline custom property (`dockMorphMeasure.ts:14-22`).
  - WebKit clamps a scroll offset under a forced layout (`:46-60`).
- **Timings.** Hover intent 60 ms (`constants.ts:45`), long press 500 ms (`:49`), idle fold 6000 ms (`:60`), settle window 840 ms (`:72`). The dock clock is 0.21 s (`src/styles/tokens/scheme-spring.css:104`).
- **Compositor and main thread.** The `scale` composites. Everything else is main-thread work each frame: the scalar write, the style recalc over the dock subtree, the padding re-layout and the ink repaint.
- **Idiomatic**, with the two measurement workarounds above.
- **iOS Safari.** Unread. The owner saw this in Safari at 10.1.5: "Collapsed in Safari, the plate paints as a squared rounded rectangle, with a darker square ghost behind it" (`docs/release-10.1.5/inbound-O-132.md:5`).

### 3.3 Fold and open on `bl/dock/wi8` (the 11.2.0 redesign, read only)

- **What changes.** `useDockBody.ts` replaces `useDockMorph.ts`, `dockMorphMeasure.ts` and `useDockSearch.ts` (*Count*, `git diff --stat master...bl/dock/wi8 -- src/`: +1,359, −136, −777, −306). It adds:
  - `ControlsDock`, a corner preset with `corner` and `within="viewport"|"parent"`;
  - `DockOutlet`, which renders a slot into a named dock's region;
  - `data-morphing` as the public morph signal;
  - `--glass-level-dock` (1 in light, 0.7 in dark).
  Sources: `.claude/worktrees/bl/dock/wi8/src/components/dock/README.md` (diff hunks at its lines 55-62, 81-95), `DockOutlet.vue:1-43`, `index.ts:20-21`.
- **Drive.** "One requestAnimationFrame loop per dock steps every moving quantity on `springPreset("dock")` and writes; it parks on the frame its last quantity lands" (`useDockBody.ts:1-14`). It steps the spring itself in closed form from `OMEGA` and `ZETA` (`useDockBody.ts:20-59`), not through `SpringProgress`.
- **What it writes each frame:**
  - the plate's `inset` and `border-radius` (`useDockBody.ts:1026-1027`);
  - each region's `clip-path: inset(... round ...)` (`:1045-1061`) and `translate` (`:1092`, `:1101`);
  - each face's `translate` (`:1142-1153`);
  - `--dock-expand-t` and `--dock-morph-t` (`:1008`, `:1022`).
- **Compositor and main thread.** Only the `translate` legs composite. The plate's `inset` is a layout change on the one backdrop-filtered box, so each frame re-lays out the plate and resamples its blur. *Hypothesis:* that is the single costliest write the dock makes in Safari.
- **Canon conflict.** P7 names exactly two sanctioned off-spine motion seams and reds "a THIRD un-sanctioned off-spine spring/rAF (… a private hand-rolled rAF integrator …)" (`docs/precepts/motion-canon.md:250-280`, the clause at `:277`). The carrier's own integrator is one such. RULINGS-8 does not rule on it.
- **Budget and state.** 5,246 code lines against v11.1.0's 4,741, which is NOT READY (`RULINGS-8.md:694`; `ORCH-LINES-8.md:9-11`). The consumer fixture is 105,249 B gz against v11.0.2's 102,631 (`RULINGS-8.md:712`). The ninth pass is in progress; real Safari is owed before the tag (`RULINGS-8.md:662`; `ORCH-LINES-8.md:7`).
- **Idiomatic.** It uses no platform trick; the cost and the P7 conflict are the issues.

### 3.4 The run, its seats and the run mark (the dock's lens-like part)

- **The run.** A native scroll-snap port: `scroll-snap-type: x mandatory`, `scroll-snap-align: start`, `scroll-padding: P/2`, `touch-action: pan-<axis>` and `overscroll-behavior-<axis>: contain` (`run.css:30-36`, `:260`, `:449`). The source says "All five measured supported in Chromium 149 AND real Safari 26.4". The run's end caps are a scroll-driven animation of `border-*-radius` on a named timeline (`run.css:659-670`, `:801-812`, keyframes at `:1001-1030`).
  - *Hypothesis:* the radius is not composited, so the cap repaints on the main thread while scrolling, even though the scroll itself is native.
  - This is the platform primitive the post uses as its input "controller" (`CHARTER.md:20`). Here it only places seats; it does not drive a lens.
- **Seat widths.** The open seat widens on `transition: inline-size var(--spring-dock-duration) var(--spring-dock)` (`run.css:562-567`), a layout transition.
- **The run mark** (`composables/useDockRunMark.ts`; `run.css:569-603`).
  - One inert `.dock-run-mark` element is rendered in the run while a seat carries `aria-current` (`GlassDock.vue:564`).
  - On a change of destination it glides from the seat it leaves to the seat it reaches on the dock spring, tracking the arriving seat's live box each frame (`useDockRunMark.ts:23-27`, `:192-222`).
  - It writes `--dock-run-mark-x/y/w/h/r` (`:171-179`), which feed `inset-block-start`, `inset-inline-start`, `width`, `height` and `border-radius` (`run.css:586-596`). It reads layout boxes, never rects, so it is right under zoom and scaled stages (`useDockRunMark.ts:17-21`, `:102-117`).
  - Under reduced motion it fades between seats (11.1.1: `CHANGELOG.md:151-155`). 11.1.0 introduced it (`CHANGELOG.md:211-224`).
  - **What it is not.** It cannot be dragged and never follows a finger. It has no magnification, no blur of its own and no lift. It paints one flat fill, `--dock-control-active-bg` (`run.css:594`).
- **Compositor and main thread.** All main-thread work each frame: re-layout and repaint of one small absolute box.
- **Idiomatic.**
- **iOS Safari.** Unread.

### 3.5 Face swap and the layer switcher

- **`DockCrossfade`.** A two-child opacity overlap on a per-face `--dock-t`, driven by the dock spring, with a running-max reserved `min-block-size` (`DockCrossfade.vue:16-29`).
- **`DockLayerGroup`.** Drives it through `useSelectionGroup`, the same engine as SegmentedTabs (`DockLayerGroup.vue:37-40`, `:103-111`). Its switcher indicator can be dragged through `useDragMorph` (`:131-154`); this is "consumer #2" of the drag morph.
- **Idiomatic.**
- **iOS Safari.** Unread.

### 3.6 Holds, grasp and overlay participation

- **Holds.** Menus, selects, popovers and hints opened from a dock carry the dock's portal stamp. A held overlay keeps the dock open; when the dock folds, it closes the overlays it opened (`src/components/_shared/overlay/participation.ts`, 156 lines; `DropdownMenuContent.vue:72-78`; `TooltipContent.vue:42-48`).
- **Escape.** The dock defers Escape to reka's dismissable-layer marker (`constants.ts:34-35`).
- **Grasp.** A pointer hold on the plate thickens its blur by 1.625× and sheds 40 % of its ink through two filter-only carriers (`src/styles/glass/grasp.css:1-12`, `:64-72`).
- **iOS Safari (records only, engine not named):**
  - "A page scrolling under a still pointer opens nothing; today that opens a dock in Safari" (`OWNER-READ.md:16`).
  - "A window resize during a fold (which Safari on a phone fires whenever its toolbar hides) snapped the dock shut in one frame. It glides on." (`OWNER-READ.md:37`).
  - "on a phone in Safari's engine, keyframes's transport dock cannot be opened by touch at all" (`OWNER-READ.md:46`).

### 3.7 Presets, shapes, density and placement

- **Shape.** The dock rests as a capsule whose corner is half its cross extent, bounded by `--radius-dock` (`README.md:87-90`).
- **Density.** `--dock-scale` scales every pad and size (`styles/density.css:119-165`). The cockpit preset (`data-preset="cockpit"`) has its own sizes (`density.css:185-226`). The coarse-pointer floor is 44 px through `--control-floor` (`src/styles/tokens/light-dark.css:11-20`).
- **Placement (master).** "`anchor` is a hook for your own CSS … It does not move the dock" (`README.md:58-69`). A page places the dock with its own wrapper.
- **Placement (wi8).** `ControlsDock` adds `corner` and `within` (the wi8 README hunk above). atlas's head-row placement is now the primary measure cell, at 0 px² over the title folded (`ORCH-LINES-8.md:25-33`).

### 3.8 What was cut or booked (the fusion record)

- **Goo.** `morph-bridge.css` (the V↔H goo teardrop), `fission-bridge.css`, `fission-island.css` and `siri.css` are deleted. "The goo `filter:url()` stacked over `backdrop-filter` was the prime Safari suspect" (`styles/index.css:72-76`).
- **The fission seat with its neck.** "One GlassDock; the theme seat on its own plate … parting and fusing as goo through a neck that keeps the backdrop in WebKit" (`LEDGER.md:181`). It was built as the `#beside` slot, with neck A (three leaves) and neck B (one leaf clipped by `path()`) (`PROTOTYPE.md:13`).
  - RU-14: "WebKit: flat deviation 204 to 209 and junction 103.5 … the WebKit leaf does not read as one surface"; Chromium "up to 42 (bound 2)". It is booked for 12.0.0 "behind one crop" (`RULINGS-2.md:88-90`; `RULINGS-8.md:662`).
  - Those WebKit readings were taken in Playwright WebKit, which draws no blur. The crop that reopens the seat has to come from real Safari.
  - The owner's words on it (12 Nov), as value.js relays them: "fuse into the main dock and collapse away like in ios 27 … goo (metaball pull-apart, fusing back on collapse) … must work in Safari" (`docs/tranches/BM/study/INBOUND.md:60`).
  - daraksha ships its own seat and neck until glass has one (`RULINGS-8.md:424`).
- **The labelled seat** is struck. Names go above the seat, by Tooltip (`RULINGS-2.md:92-94`).
- **Popups out of their seat, and the short list at its trigger,** are booked for 11.3.0 (`RULINGS-8.md:662`).
- **The search helper** (`useDockSearch`, the pill→field morph) is deleted in 11.2.0 by default (owner question 12, `RULINGS-8.md:726`; `ORCH-LINES-8.md:35`).

---

## 4. Overlays: menus, dropdowns, selects, popovers, context menus, command, tooltips, sheets

### 4.1 The one overlay register

- **Roles.** Every portalled overlay root takes its attributes from `overlayContentAttrs` (`src/components/_shared/overlay/content.ts:62-81`). Its role is `hint`, `menu` or `panel`, which binds `data-reveal="tooltip"|"menu"|"overlay"` and a z rung (`content.ts:23-48`). The material is the `floating` rung plus `.glass-overlay-plate`.
- **Assignments:**
  - Tooltip → hint (`TooltipContent.vue:59`).
  - DropdownMenu and its sub-content → menu (`DropdownMenuContent.vue:92`; `DropdownMenuSubContent.vue:45`).
  - ContextMenu shares `DropdownMenuContent` through the family context (`DropdownMenuContent.vue:45-63`; `menu/family-context.ts`).
  - Popover → panel (`PopoverContent.vue:156`).
  - Select carries `data-reveal="menu"` itself (`SelectContent.vue:129-136`).
  - Toast carries `overlay` (`Toast.vue:80`).
- **The substrate is reka-ui.** These overlays are "not native top-layer, so they cannot ride `@starting-style`" as a native popover would. `.glass-reveal` is the data-state form (`src/styles/glass/reveal.css:4-6`). Anchoring comes from reka's popper variables (`--reka-popper-transform-origin`, `--reka-popper-anchor-height`).
- **Placement.**
  - Collision padding is 16 (`DropdownMenuContent.vue:53`, `:61`).
  - Below 30rem a menu that a dock opened, and a Select, take the sheet form (`_shared/overlay/sheet-width.ts`, `SHEET_QUERY = "(width < 30rem)"`).
  - In 11.1.1 that form is glass firmed toward the card, marked `data-plate="firm"`, and leaves as a sheet does (`CHANGELOG.md:7-21`).

### 4.2 The reveal registers

- **The recipe on master** (`reveal.css:40-260`). Spatial legs (`scale`, `translate`) run on the register's spring `linear()` and clock. Effect legs (`opacity`, `filter: blur()`) run on an ease-out. Entry comes from `@starting-style`, with `transition-behavior: allow-discrete` over `display` and `overlay`.
- **Registers.** `enter-overlay` binds the `panel` row (scale-from 0.94, blur 6 px, slide 0.5rem). `enter-menu` binds `present`. `enter-tooltip` is a bezier (`src/styles/tokens/motion-registers.css:17-25`).
- **The menu register neutralizes every bloom channel** (`reveal.css:106-121`). The table in `motion-registers.css:23` still prints menu scale 0.96 and blur 2 px; that table is stale.
- **The exit.** It was a keyframe on master, because reka's `usePresence` waits only on `animationName` (`reveal.css:185-215`). That is a workaround for reka.
- **11.1.1 changes** (`CHANGELOG.md:22-77`):
  - Exits are transitions, held for presence by a keyframe that paints nothing (`glass-reveal-hold`), so a surface turned back mid-way turns from where it is.
  - Popover, hover card and toast drop the scale and the blur, and enter on opacity and a short slide.
  - One exit curve across all surfaces: `--exit-curve: cubic-bezier(0.3, 0.2, 0.7, 0.8)`.
  - Menus 220 ms, popovers 250, tooltips 120.
  - `leave-finished` is emitted and dispatched.
  - Reduced motion is a fade of at most 200 ms.
- **Compositor and main thread.** The `scale`, `translate`, `opacity` and `filter` legs can composite (§1). The overlay's `backdrop-filter` repaints under a moving or scaling plate.
- **Idiomatic**, apart from the presence hold.

### 4.3 The menu grows from its trigger (the fusion-like reveal)

- **Master.** The plate is laid out at its final size. A `clip-path: inset(... round var(--radius-ctx))` uncovers it from a strip the trigger's height at the edge facing the trigger, on the `bloom` spring, with no blur and no fade in (`reveal.css:267-292`; keyframes `src/styles/animations.css:181-260`).
- **11.1.1.** The same geometry as a transition, so a menu can reverse mid-way (`.claude/worktrees/release-11.1.1/src/styles/glass/reveal.css:262-318`; `CHANGELOG.md:58-63`).
- **What it is not.** The trigger and the plate stay two surfaces. The strip spans the plate's full width at the trigger's height, not the trigger's own box, and the trigger never moves or reshapes. The booked "popups out of their seat" (11.3.0) is the step that would make it a fusion.
- **Compositor and main thread.** `clip-path` is not on any composited list (§1), so *hypothesis:* main-thread repaint of the plate and its blur each frame in Safari.
- **Idiomatic.**

### 4.4 Dialog and CommandDialog

- **Dialog.** `useSpringMount({ preset: "present" })` writes `scale: 1 − 0.05·p` and `opacity: 1 − p` as an inline style through Vue each frame. The spring owns unmount timing through `forceMount` (`src/components/dialog/DialogContent.vue:79-111`; `src/composables/motion/spring/useSpringMount.ts:1-20`). The scrim reads the same scalar (`DialogContent.vue:114-122`).
- **CommandDialog** renders a `glass-floating` root inside `DialogContent`'s plate: plate inside plate, a bounded nested blur (`src/styles/glass/material.css:50-62`). `restraint.md:60` forbids "a blur inside a blur".
- **Idiomatic.**
- **iOS Safari.** Unread.

### 4.5 Sheet and detents

- **Side sheet.** `useSpringMount({ preset: "panel" })` drives a `translate` longhand plus an entry shear (`SheetContent.vue:130`; `sheet/motion.ts:17-41`).
- **Detents.** A size, not a translate: `block-size: calc(var(--detent-t) * 100dvh)`. Open and close ride `bloom`; rung to rung rides `dock` (`sheet/detents/use.ts:1-34`).
- **Release.** The release velocity is projected through the catching spring's own settle horizon, and the nearest rung wins (`sheet/detents/projection.ts:1-30`, `:60-100`). This is the library's existing "settle on the nearest" law, and the lens can take it as is.
- **11.1.1.** A detented sheet rises into place whole, carries a drag through its release, and slides past the edge to close (`CHANGELOG.md:47-58`).
- **Compositor and main thread.** The slide composites. The rung-to-rung `block-size` re-lays out the sheet each frame.

### 4.6 Tooltip and toast

- **Tooltip.** A hint: a fade with no change of size in 11.1.1, and a hand-off crossfade between neighbouring triggers (`CHANGELOG.md:78-82`).
- **Toast.** On the overlay register, entering on opacity and a slide in 11.1.1 (`CHANGELOG.md:35-42`).

---

## 5. Selection: SegmentedTabs, ToggleGroup, the drag morph

- **The indicator writer.** One writer for every selection strip (`src/composables/motion/morph/useSelectionIndicator.ts:16-47`). On a model, option or axis change, or a resize, it reads the selected button's rect and writes `translate`, `width` and `height` (`:150-167`).
- **The glide.** SegmentedTabs' indicator transitions all three on `--spring-dock`: `translate`, `width` and `height` share `--tab-indicator-duration`, which is the `dock` clock (`src/components/tabs/styles/segmented.css:163-171`; `src/styles/tokens/scale-paper.css:33`).
  - `width` and `height` are layout properties, which P5 forbids (`motion-canon.md:174-178`).
- **The drag.** With `:draggable` and full motion, the indicator can be grabbed (`SegmentedTabs.vue:122-142`; `tabs/composables/useTabDragMorph.ts:10-22`):
  - It follows the finger through keyframes.js `Draggable`, whose pointer capture writes `SpringProgress.target` on each `pointermove`.
  - On release, kf's `snap` projects the rest and re-seats toward the nearest tab centre, and `onSnap` commits the model (`useDragMorph.ts:11-30`, `:321-357`).
  - It writes `transform: translate` through `useElementMorph` (`useDragMorph.ts:44-50`). The velocity squish is off for tabs (`useTabDragMorph.ts:20-21`).
  - The affordance map keeps DRAG-MORPH's follow and snap; its squish survives only on the ruled spatial morphs (`docs/precepts/affordance-map.md:14-28`).
- **Material.** The indicator is a `.glass-capsule` with its own `backdrop-filter: var(--glass-blur-floating)`. It sits in a `.glass-capsule-track` that carries `backdrop-filter: var(--glass-blur-quiet)` (`src/styles/glass/glass-capsule.css:57`, `:79-81`; `SegmentedTabs.vue:213-225`). That is a moving blur inside a blur, against `restraint.md:60`. Inside a dock RU-95 removes the channel, its lens and the indicator's shadow (`RULINGS-8.md:181`, `:676`).
- **Responsive collapse.** Below a breakpoint the strip becomes a `Select` (`tabs/composables/useTabResponsive.ts`; `SegmentedTabs.vue:155-183`).
- **ToggleGroup.** It is "a ROW, not a strip — it declines the indicator" (`SegmentedTabs.vue:20-27`). In 11.1.1 a selected item keeps its weight (`CHANGELOG.md:143-146`).
- **Compositor and main thread.** The glide's `translate` composites; `width` and `height` re-lay out each frame. During a drag, pointer events, the spring tick and the transform write all run on the main thread, so on iOS the follow is capped at the page's rAF rate (§0.2).
- **Idiomatic**, with the P5 break.
- **iOS Safari.** Unread. 11.1.1 fixes the strip's round ends under a coarse pointer (`CHANGELOG.md:136-141`).

---

## 6. Slider and Switch

### 6.1 Slider: the loupe, the grasp and the focus veil

- **The loupe** (`loupe` prop; `Slider.vue:244-330`; `slider/styles.css:466-575`). While the hand is on the track, a lens rises above the finger:
  - The track's fill and mark are laid out once at 3× and transformed down by `k/3`, so the value point sits dead centre at every `k` (`styles.css:470-486`).
  - `k` runs from 2.6 at rest to 1.15 at speed, from the one velocity term `--flex-vel` (`styles.css:488-495`).
  - The clone blurs by velocity (`styles.css:569`).
  - The housing rises from `scale: 0.13` on the `present` spring (`styles.css:516-524`, `:537-548`).
  - The housing is the only material, `glass-plate` (`Slider.vue:424`). The clone samples nothing.
  - **This is our one magnifying lens.** It is a DOM copy of known content, needs no page snapshot and no WebGL, and is idiomatic.
- **The velocity bridge.** `useDragVelocity` writes `--atom-drag-v` and `--flex-vel` during the drag only (`Slider.vue:185-195`, from `composables/dom/useDragVelocity`): a main-thread custom property each frame.
- **The grasp.** Carriers are mounted for the duration of the hold (`Slider.vue:197-217`; `glass/grasp.css`).
- **The focus veil.** With `loupe`, one fixed full-viewport `backdrop-filter` plate under a double-ramp mask frosts the page while the slider stays crisp. Only opacity animates (`Slider.vue:219-243`; `src/styles/glass/focus-veil.css:1-40`). A full-viewport backdrop sample is "the single most expensive thing this library can paint" (`focus-veil.css:21-23`).
- **A workaround.** The slider re-dispatches one synthetic `pointermove` at the press, because reka 2.10 records the grab offset on the first move (`Slider.vue:160-181`).
- **iOS Safari.** Unread. value.js relays the owner on colour's loupe, "Extract's … eyeglass lens … is slow and unintuitive; redesign multitouch-first", and reads it as a magnifier, not refraction (`INBOUND.md:63-64`).

### 6.2 Switch

- **Mechanism.** The thumb's `translate` transitions on `--spring-dock` (`src/components/switch/styles.css:46-55`). There is no drag, and no lift or lens on press.
- **Compositor.** The `translate` composites.
- **Idiomatic.** 125 lines.

---

## 7. The glass material

- **The ladder.** One medium in five thicknesses: wash, quiet, resting, floating and overlay, with blur radii of 10, 14, 16, 20 and 22 px (`src/styles/tokens/glass.css:8-25`, `:67-71`).
  - The ink is `oklch(0.28 0.035 70)` (`:34`). The veil alpha is base 0.14 plus or minus n × 0.04 steps (`:45-55`).
  - Saturate is 1.5 at every rung (`:79`).
  - Each blur is `blur(radius × --glass-level) saturate(1.5)` (`:86-90`).
  - `--glass-level` is a registered number (`tokens/property-regs.css:154`). It is 0 under reduced transparency and 0.3 under more contrast (`src/styles/glass/a11y-fallback.css:20-22`, `:37-39`).
  - There is no brightness leg and no device-conditional rung (`glass.css:57-64`, `:81-84`).
- **The plate at the element.** `@utility glass-plate` paints `background: var(--glass-veil)` and nothing else. Its ink is clamped upward by the measured backdrop luminance, up to two more rungs over a bright ground (`glass/veil.css:1-60`).
- **Backdrop luminance.** `useGlassBackdropLuminance` (`src/composables/glass/useGlassBackdropLuminance.ts:1-9`; 546 lines):
  - It downsamples a known background canvas, or walks `elementsFromPoint` for a static page, because "browsers do not expose composited backdrop-filter pixels".
  - It samples at most 4 Hz, only when the field paints, scrolls, changes theme or ends a transition. It parks offscreen.
  - One shared observer per route can cover many docks (`:61-71`).
  - It reads a canvas the page owns and never snapshots the page. Idiomatic.
- **Rims, capsule and specular.**
  - Rims and the capsule's lift are box-shadow layers (`glass-capsule.css:58-71`).
  - The moving specular catch-light (`glass/material.css:6-46`) is retired by the owner ("Remove, do not tune.", `restraint.md:46-52`; `affordance-map.md:14-19`) but still ships on the material group and the dock controls. RULINGS-8 removes it from the dock's controls in 11.2.0 (`RULINGS-8.md:675`).
- **Grasp** (§3.6). Two filter-only carriers crossfade a thicker blur in. Hosts must stand down every backdrop-root former while held (`grasp.css:24-41`).
- **Size.** 6,060 lines over `src/styles/glass/*.css`, `glass.css`, `glass-specular-track.css` and `tokens/glass*.css` (*Count*).
- **iOS Safari.**
  - The WebKit black-premultiply hole with bare `transparent` is known and avoided (`glass-capsule.css:42`).
  - Playwright WebKit draws no backdrop blur (`RULINGS-8.md:19`).
  - The dark dock at level 0.7 blurs about 11 px against 16. The owner's real Safari look settles it (`RULINGS-8.md:722-724`).
  - Nothing else is read.

---

## 8. The spring and motion system

- **One table, six rows** (`springPresets.ts:63-121`):

  | Row | Response | ζ | Job |
  |---|---|---|---|
  | press | 0.2 | 0.8 | the press |
  | present | 0.22 | 1.0 | a menu, plate, toast or orb born from its anchor |
  | dock | 0.3 | 0.88 | coordinated travel: "member FLIP, the selection lens, indicator glide" |
  | panel | 0.4 | 0.71 | the one row that rebounds |
  | bloom | 0.42 | 0.9 | room-sized growth |
  | world | 0.48 | 1.0 | the world's recession |

  The `dock` row's own comment names "the selection lens" as its job (`springPresets.ts:88-89`).
- **Two deliveries from the same table.**
  - JS: keyframes.js `SpringProgress`, which ticks its own rAF (`useDockSpring.ts:12-14`).
  - CSS: a 48-sample `linear()` curve and a settle clock solved numerically (`springProjection.ts:26-68`). They are emitted as `--spring-<row>` and `--spring-<row>-duration = settle × --motion-tempo`. The settles are press 0.12 s, present 0.2, dock 0.21, panel 0.45, bloom 0.37 and world 0.57 (`src/styles/tokens/scheme-spring.css:61`, `:102-110`).
- **Gesture primitives:**
  - `useDragMorph` (follow, fling and nearest snap; `morph/useDragMorph.ts`, 449 lines).
  - `useElementMorph`, the one compositor FLIP writer (`morph/useElementMorph.ts:1-2`).
  - `useSpring`, `useSpringMount`, `useSpringPress`, `useLiquidPress` and `useLiquidFlex` (`spring/`, 1,302 lines).
  - The press squish is retired by the owner (`affordance-map.md:17-20`). 11.1.1 stops it under reduced motion (`CHANGELOG.md:103-116`).
- **Canon.** P0 says every change is tweened, and P0a gives the measured grammar: hover 100-200 ms, an exit about 0.6 of its entrance, an appearance from 0.8-0.96 or 4-8 px, no overshoot on a control, overshoot only on a morph (`motion-canon.md:17-104`). P7 says one source and one clock, with two sanctioned off-spine seams (`motion-canon.md:227-285`). The restraint ceiling per control allows one shadow layer, no gleams, two properties animating per change and zero nodes added for a motion (`restraint.md:184-212`).
- **What does not exist.** No OffscreenCanvas transfer and no worker (*Count*: `grep` over `src` for `transferControlToOffscreen`, `new Worker` and `OffscreenCanvas` finds only a type union in `aurora/composables/textureUpload.ts:40`). `MessageChannel` appears only as a `scheduler.yield` fallback (`core/useYieldToMain.ts:50-52`). Nothing reads scroll position on a vsync loop.

---

## 9. FLIP fusion primitives and the blob

- **`useLiquidReveal`.** Blooms a surface from its trigger's rect onto its own, with scale, fade and a 4 px blur settle on `bloom` (`src/composables/motion/reveal/useLiquidReveal.ts:1-15`, 82 lines). It is exported, but no component in the library mounts it (*Count*: `grep -rl useLiquidReveal src` finds only motion modules and CSS comments).
- **`useDockCtaReceive`.** Flies an outside call to action from its rect onto a dock seat and hands off (`morph/useDockCtaReceive.ts:1-24`). wi8 no longer re-exports it from the dock, since no app imported it (`.claude/worktrees/bl/dock/wi8/src/components/dock/index.ts:67`).
- **Both are idiomatic.** Both ride `useElementMorph`: measured endpoints and a `transform`, which composites, plus the spring's main-thread tick.
- **The blob.** A WebGPU metaball renderer with a declared WebGL2 path (`src/composables/glass/webgpu/useGpuSubstrate.ts:1-9`; `blob/composables/useMetaballRenderer.ts`). Its satellites merge, absorb, emerge and fission (`blob/README.md:327`). It is our only real goo. It draws itself on a canvas and does not sample the page. gaggle bars GPU-backed chunks from its fetchable set (`INBOUND.md` gaggle §5).

---

## 10. How a site places and sizes these parts

- **Docks.** By its own layout on master, through a wrapper (`README.md:58-69`). Through `ControlsDock` `corner`/`within` on wi8. In atlas's head row with a reserved folded box (`ORCH-LINES-8.md:27-33`).
- **Overlays.** Anchored by reka's popper, with 16 px collision padding. Below 30rem, a sheet at the foot of the screen (§4.1).
- **Sizes.** Dock sizes scale on `--dock-scale`. Every interactive target lifts to 44 px under a coarse pointer through `--control-floor`. A SegmentedTabs strip is then 50 px with its trim (`CHANGELOG.md:136-141`).
- **The level.** A site that pairs a bare plate with a dock uses `glass-plate` with `--glass-veil-tier: var(--glass-veil-dock)` and `--glass-level: var(--glass-level-dock)` (wi8 README hunk, its lines 91-95).

---

## 11. Where we already have a lens and a fusion

**Lens-like (a highlight that marks a selection and moves between choices):**

1. **The dock's gliding run mark** (§3.4). One flat plate glides on the `dock` spring and tracks the arriving seat's live box.
   - Missing against rida's lens: drag, finger follow, magnification, lift, and stretching past the bar.
   - Its glide is layout re-done in each frame.
2. **SegmentedTabs' indicator** (§5), and its twin the DockLayerGroup switcher (§3.5). Measured glide on `dock`, with `:draggable` follow and a fling to the nearest tab through kf `Draggable` and `snap`.
   - This is the closest part: it already has finger follow and settle-on-nearest.
   - Missing: lift, magnification and over-travel stretch. The squish was removed for tabs.
   - Its material is a capsule blur inside a track blur.
3. **The slider loupe** (§6.1). A real magnifier, by DOM copy at 3×, with a velocity-coupled `k`.
   - It magnifies known content, not the page behind.
   - **Related:** the grasp register (§3.6), the material's answer to a held finger. It thickens the blur and thins the ink; it is a state, not a moving lens.

**Fusion-like (one surface becomes another):**

1. **The dock's fold and open** (§3.2, §3.3). One plate morphs between the open bar and the folded disc or capsule, and its two faces cross under a content window.
2. **A trigger's menu reveal** (§4.3). The plate is uncovered from a trigger-height strip at the trigger's edge. It is anchored geometry, not a morph of the trigger.
3. **`useLiquidReveal`** (bloom from a trigger's rect) and **`useDockCtaReceive`** (an outside call to action flying into a seat) (§9). Both are shipped primitives that nothing in the library mounts.
4. **The fission seat with its neck** (§3.8). Built, failed and booked for 12.0.0. **The blob** (§9) is the only goo that ships.

---

## 12. Conflicts found while reading (for the design passes to resolve, not cured here)

1. `dock/styles/index.css:92` and `motion-canon.md:171-174` call JS-written custom properties, `clip-path` and paint properties "composited" or "compositor-safe". By §1's sources only transform, opacity and filter composite.
2. P5 forbids animating `width`/`height`/`inline-size` (`motion-canon.md:174-178`), yet:
   - the segmented indicator transitions `width` and `height` (`segmented.css:163-171`);
   - the run seats transition `inline-size` (`run.css:562-567`);
   - the run mark writes `width`/`height`/`inset` each frame (`run.css:586-596`);
   - the wi8 carrier writes the plate's `inset` each frame (`useDockBody.ts:1026`);
   - the dock's `padding-inline` follows the scalar (`morph.css:119-123`).
3. P7's one-clock rule (`motion-canon.md:277`) against the wi8 carrier's own closed-form integrator (`useDockBody.ts:20-59`).
4. `restraint.md:60` ("never a blur inside a blur") against the segmented capsule in its track and against CommandDialog's plate in a plate (`material.css:50-62`).
5. `affordance-map.md:114-131` still describes GLEAM-TRACK and PRESS-SQUISH, which its own header (`:14-28`) and `restraint.md` retire. The gleam code still ships (§7).
6. `motion-registers.css:23` prints menu scale 0.96 and blur 2 px, while `reveal.css:106-121` sets both to neutral.
7. `docs/precepts/declared-decisions.md:5-12` says "Safari is known-broken pending a WebKit performance fix" (2026-07-12). The same file speaks of `?board=` and an avatar host, which suggests it came from another app's tree. The study should not cite it as glass-ui's Safari position until its owner confirms it.

---

## 13. What iOS Safari knows of us, in one place

| Claim | Source | Device |
|---|---|---|
| iOS Safari and Android Chrome not measured (11.1.0) | `docs/release-11.1.0/lane-L6.md:367` | — |
| real Safari not measured; every WebKit cell is Playwright WebKit 2287/2311 (11.0.1, 11.0.2) | `docs/release-11.0.1/close/close.md:164`; `docs/release-11.0.2/close/close.md:175` | — |
| Playwright WebKit draws no backdrop blur; WebKit strips are labelled as such | `RULINGS-8.md:19`, `:101`, `:325`; `ORCH-LINES-8.md:7` | engine build |
| macOS Safari 26.4 rendered every route while Playwright WebKit crashed 5/5 | memory `feedback_playwright_webkit_not_safari.md` | macOS, safaridriver |
| scroll-snap, touch-action and overscroll-behavior supported "in real Safari 26.4" | `run.css:30-33` | not named |
| `corner-shape: squircle` "measured FALSE on real Safari 26.4" | `run.css:679-680` | not named |
| collapsed plate squared, with a darker ghost, "in Safari" (owner) | `docs/release-10.1.5/inbound-O-132.md:5` | owner's |
| a scroll under a still pointer opens a dock "in Safari" | `OWNER-READ.md:16` | not named |
| a toolbar-hide resize snapped the fold shut "on a phone" (now glides) | `OWNER-READ.md:37` | Safari's engine |
| keyframes's transport dock cannot be opened by touch "on a phone in Safari's engine" | `OWNER-READ.md:46` | Playwright WebKit |
| the neck "worst in Safari's engine" | `OWNER-READ.md:52`; `RULINGS-2.md:89` | Playwright WebKit |
| goo `filter:url()` over `backdrop-filter` "the prime Safari suspect" | `dock/styles/index.css:74-76` | suspicion only |
| WebKit keeps a clamped scroll offset, and fails to restore an `!important` inline custom property | `dockMorphMeasure.ts:14-22`, `:46-60` | engine |
| WebKit black-premultiply with bare `transparent` | `glass-capsule.css:42` | engine |
| "WebKit takes no SVG filter in backdrop-filter" (atlas) | `INBOUND.md:48` | atlas's reading |
| the iOS companion app is WKWebView, so backdrop-filter cost is a first-class gate (Home Assistant) | `INBOUND.md` Home Assistant, bounds | consumer |

---

## 14. Not read here

- `.claude/worktrees/bl/dock/wi8/src/components/dock/composables/useDockBody.ts` past the lines cited (about 1,000 of 1,359 unread), and wi8's `ControlsDock.vue`.
- `src/components/dock/composables/useDockState.ts` (740 lines), `useDockHold.ts`, `useDockClickIntegrity.ts`, `useDockRun.ts`: the posture clock and gesture guards, read only through RULINGS-8 and the README.
- `src/styles/glass/overlay-plate.css` (471 lines), `control-bit.css`, `ladder.css`, `liquid-enter.css` and `dissolve.css` in full.
- keyframes.js's `Draggable` and `SpringProgress` source: how its rAF is scheduled and whether `snap` projects with the row's own horizon.
- Gzipped sizes per part inside the dock entry (the release notes give the entry only).
