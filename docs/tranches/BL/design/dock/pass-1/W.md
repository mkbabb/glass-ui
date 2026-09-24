# D2 · pass 1 · W · the platform under the dock (prior art, support, measurements)

| field | value |
|---|---|
| seat | W, the prior-art seat of D2 pass 1. It picks no family; it states what each mechanism does on the engines the dock ships to, with dates, and measures what can be measured here |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `5804d8cc` at the start. The tree moved to `9e1c8f11` during the run, through docs-only commits: `git diff --stat 5804d8cc HEAD -- src` is empty. This seat wrote only this file in the checkout |
| inputs | `PORTFOLIO.md` §0-2 (problems, baseline, shared facts) and §6 (pass-1 questions). O-64 (`BK/coordination/valuejs-outbound-2026-09-23-kf-w13r-dock-morph.md`, R-1..R-6, owner words N-15). `audit/PROMPT-RECAP-SEED.md` |
| date | 2026-09-23. Every web source below was read that day |
| engines on the market that day | Chrome 154 (released 2026-09-22), Safari 27 (2026-09-14, WebKit 625.1.29), Firefox 156 (2026-09-15). Source: BCD `browsers/{chrome,safari,firefox}.json` |
| support source of record | MDN browser-compat-data, `main`, raw JSON fetched 2026-09-23 (latest commit 2026-09-23T12:58:59Z). Every "Chrome N / Safari N" below is BCD unless another source is named. Release dates come from the same BCD browser files |
| instruments | Headless Chromium 149.0.7827.55 and **Playwright WebKit** (Playwright 1.61.1, build `webkit-2311`, UA `Version/26.5`), launched from node with Playwright imported from `glass-ui/node_modules/playwright`. 17 tiny pages under the scratch root `…/scratchpad/D2/p1/W/pages/`, runners `run.mjs`, `run-05b.mjs`, `run-13.mjs`, `run-14.mjs`, `bisect/*.mjs`; outputs `results*.json`, `out-*.{json,txt}`. Probe ids below (P01..P16) are the page numbers. No worktree was created: nothing was built and no source was edited |
| Safari | Playwright WebKit is a WebKit trunk build, not Safari; its UA says 26.5 but it already parses Safari 27 features (`position-anchor: normal`, `anchor-visible`, `overflow-anchor`, P01). Every WebKit number below is "Playwright WebKit". Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |

## 0 · The findings in one table

| # | mechanism | Chrome | Safari (shipping) | measured here | what it means for the dock |
|---|---|---|---|---|---|
| 1 | scroll-driven animations | 115 (2023-07-18) | 26.0 (2025-09-15); threaded in 26.4 | ramps, length ranges and the `min(48px, 50%)` cap range resolve identically in Chromium and Playwright WebKit (P04, bisect) | a cross-engine primary for a scrubbed ramp and the rim fill; it carries no spring, no lag and no hysteresis of its own |
| 2 | scroll-triggered animations (`timeline-trigger`) | 146 (2026-03-10) | no; WebKit parsing behind a flag since 2026-07 | activation/active ranges give real hysteresis in Chromium; Playwright WebKit ignores the trigger and plays the animation to its end state at load (P13) | Chrome-only; an engine without it paints the triggered end state permanently, which E-2 forbids |
| 3 | scroll-state queries | 133 (`stuck`, `snapped`, `scrollable`), 144 (`scrolled`) | no | `scrolled` flips on a 1 px relative scroll; absolute scrolls do not count (P05b) | Chrome-only; a direction bit with no threshold and no hysteresis |
| 4 | `overflow: clip`, `overflow-clip-margin` | clip 90; margin 90, partial | clip 16; margin no | no scroll container paints past its padding box on either axis, in either engine; `overflow-clip-margin` works only on two-axis clip, Chromium only (P02) | the invariant "the scroll port is not the paint box" needs a padding gutter, a non-scroller, or paint outside the port |
| 5 | anchor positioning | 125 (2024-05-14) | 26.0; 27.0 changed defaults | the anchor box follows `translate` and `scale` in both engines; `anchor()` insets transition in both (P06) | a projection can follow a hovered seat; one `position-visibility` keyword is spelled differently per engine today |
| 6 | view transitions, document | 111 (2023-03-07) | 18.0 (2024-09-16) | a document transition swallows every click on the page while it runs; a second transition started mid-flight jumps 133-135 px (P07) | not an interruptible morph primitive |
| 7 | view transitions, element-scoped | 147 (2026-04-07) | no; no WebKit position, no implementation bug found | clicks outside the scope pass; a click inside the scope falls through to the page element behind it (P07, Chromium) | D2-F's scoped path has no Safari cell in 2026, and in Chrome a tap on a morphing dock would land on the page under it |
| 8 | `corner-shape`, `superellipse()` | 139 (2025-08-05) | no (BCD lists the property as Safari "preview"; WebKit bug 277912 active) | Chromium interpolates `round → squircle` through `superellipse(1.428)`; Playwright WebKit has none (P08) | Chrome-only; the stadium has to stand on `border-radius` |
| 9 | container units for radii | 105 | 16 | `50cqmin` = 28 / 32 / 20 px on 200×56 / 64×560 / 300×40 in both engines; on the container's own box it resolves to the viewport fallback, 300 px (P09) | the stadium radius is exact when a child or pseudo of a size container draws the corner |
| 10 | `linear()` springs | 113 | 17.2 (2023-12-11) | a retarget drops velocity by 70-75 %; a reversal takes 292-296 ms of a 600 ms clock; glass-ui's truncated `--spring-dock` adds a 5.2-5.9 px last-frame step on a 300 px travel (P10) | CSS carries the shape of a spring, not its state; the O-64 "land dead" and N-15 "not smooth" rows sit partly here |
| 11 | iOS tab-bar minimize | iOS 26 API; iOS 27 adds `UIBarMinimization` for the navigation bar | n/a | not measurable here | Apple documents no distance threshold; third parties measured restoration only at offset 0 and a ~200 ms UIKit reveal. A "72-point threshold" found by search is an app's own constant, not UIKit's |

## 1 · Scroll-driven animations

**Support** (BCD):

| feature | Chrome | Safari | Firefox |
|---|---|---|---|
| `animation-timeline: scroll() / view()` | 115 | 26.0 | preview only |
| `scroll-timeline-name`, `view-timeline-name` | 115 | 26.0 | preview only |
| `timeline-scope` | 116 | 26.0 | preview only |
| `timeline-scope: all` | 116, removed in 138 | 26.0 | preview only |
| `animation-range` | 115 | 26.0 | preview only |

- Safari 26.4 made them threaded: "the animations driven by scroll position run on the compositor thread, separate from the main thread … When you use `animation-timeline: scroll()` or `animation-timeline: view()`, you automatically get the same kind of performance benefit that CSS transitions and keyframe animations have long enjoyed" ([WebKit, Safari 26.4, 2026-03-24](https://webkit.org/blog/17862/webkit-features-for-safari-26-4/)). Chrome's guide says scroll-driven animations run "off the main thread" and names no per-property list ([Chrome for Developers, updated 2023-05-05](https://developer.chrome.com/docs/css-ui/scroll-driven-animations)). Which properties stay off the main thread in Safari is not stated in the WebKit post: UNVERIFIED.
- Spec: [Scroll-driven Animations ED, 2026-05-14](https://drafts.csswg.org/scroll-animations-1/). The ED now says named timelines are global by default, "the last one seen in flat tree order, globally", and `timeline-scope` localises them. Neither engine implements the global lookup (P16, below). WebKit's standards-positions [#632 "Global timeline scope"](https://github.com/WebKit/standards-positions/issues/632) (2026-03-17) is open with no position.

**Measured (P04, P15, P16, `bisect/`):**

| probe | Chromium 149 | Playwright WebKit |
|---|---|---|
| `scroll(root)` width ramp 100→300 px over 2,400 px, at y = 100 / 1,200 / 2,400 | 108.328 / 200 / 300 px | same (bisect variant `rootWidth`) |
| registered `--p`, `animation-range: 0 200px`, at y = 100 | 0.5 | 0.5 |
| **the cut-cap range (D2-A Q1).** A named inner scroller timeline (`scroll-timeline: --run x`, 24 px of overflow) read by a sibling through `:root { timeline-scope: --run }`, `animation-range: 0 min(48px, 50%)`, at scrollLeft 0 / 6 / 12 / 18 / 24 | 0 / 0.5 / 1 / 1 / 1 | 0 / 0.5 / 1 / 1 / 1 |
| the end cap, `animation-range: calc(100% - min(48px, 50%)) 100%`, same offsets | 0 / 0 / 0 / 0.5 / 1 | 0 / 0 / 0 / 0.5 / 1 (bisect4 `noGetAnimations`) |
| a timeline named on the root (`html { scroll-timeline: --page block }`) read by two fixed "docks" at mid-scroll | 0.5, 0.5 | 0.5, 0.5 |
| two scrollers declaring the same name under one `timeline-scope` | inactive: value 0 whichever scroller moves | inactive: value 0, `timeline.currentTime` null |
| a name read from outside its declaring subtree with no `timeline-scope` | unresolved; the animation shows its **end** keyframe (value 1) | same |

Readings:
- On a sub-pitch overflow of 24 px, `min(48px, 50%)` resolves to 12 px and both caps reach both ends. That answers the resolution half of D2-A Q1 in Playwright WebKit. Paint on real Safari is UNMEASURED (owner's safaridriver checkbox).
- A name collision fails quietly, to the start value. A name that does not resolve fails quietly, to the end value. Neither fails loud (E-2). A dock that names a consumer's timeline has to own the name's uniqueness.
- **Playwright WebKit crash.** Reading `Animation.rangeEnd` on a CSS animation whose range end is `min(48px, 50%)` kills the web process, reproduced 1 of 1 (`bisect/out-bisect5.txt`). `rangeStart`, plain `12px` ends and `normal` do not crash. Paint is unaffected: the crash needs a script to read the property (a test harness, a devtools panel). Not filed; real Safari UNMEASURED.
- What the mechanism cannot do, by definition: progress is a function of scroll offset alone (Scroll-driven Animations ED, §2). The same offset gives the same value in both directions, so hysteresis cannot be expressed, and the ramp has no lag or spring of its own. It moves with whatever momentum the scroller has. D-1's weight and bounce have to come from the scroller's own physics or from something time-based.

## 2 · Scroll-triggered animations (`timeline-trigger`)

- **Support:** `timeline-trigger`, `timeline-trigger-name`, `animation-trigger`, `trigger-scope` are Chrome 146, Safari no, Firefox no (BCD). Chrome 146 release notes: "adds scroll-position-based control of animations, for example, playing, pausing, and resetting animations" ([Chrome 146](https://developer.chrome.com/release-notes/146)). The introducing post dates from 2025-12-12 and then targeted Chrome 145 ([Chrome for Developers](https://developer.chrome.com/blog/scroll-triggered-animations)).
- **The hysteresis is native.** "The trigger activates when the subject is in the `entry 100% exit 0%` range. The trigger remains active until it has left the `entry 0% exit 100%` range" (same post). Syntax: `timeline-trigger: <name> <source> <activation-range> / <active-range>`.
- **WebKit status:** implementation is under way behind an `AnimationTriggersEnabled` flag. Bugs [318858](https://bugs.webkit.org/show_bug.cgi?id=318858) (flag), 318864, 318906, 318979, 319205, 319239 and 319418 add parsing, all RESOLVED 2026-07-08..16; [305311](https://bugs.webkit.org/show_bug.cgi?id=305311) ("implement the `animation-trigger` property") is NEW. Standards positions [#576](https://github.com/WebKit/standards-positions/issues/576) and [#589](https://github.com/WebKit/standards-positions/issues/589) are open with no position.

**Measured (P13, `out-13.txt`).** `timeline-trigger: --compact scroll(root) 120px 100% / 40px 100%` on a fixed box, a 400 ms linear animation of `--k`, `animation-trigger: --compact play-forwards play-backwards`:

| step | Chromium 149 `--k` | Playwright WebKit `--k` |
|---|---|---|
| load, y = 0 | 0 (paused) | **1** (finished at load) |
| y = 100, below activation | 0 | 1 |
| y = 160, inside activation | 1 | 1 |
| y = 60, outside activation, inside active | 1 (held) | 1 |
| y = 30, outside active | 0 (played back) | 1 |
| y = 230, read at +150 ms | 0.396 (running) | 1 |
| back to y = 20 mid-flight, read 50 ms later | 0.304 (reversed from where it was, no jump) | 1 |

- In Chromium a mid-flight reversal is continuous in value. The velocity sign flips in one frame: the animation is time-based and carries no inertia.
- In an engine without the feature, `animation-trigger` is dropped and the animation plays unconditionally, so the "compact" end state shows from load. Using it would need an `@supports` fork, a dual path that E-1 and E-2 both forbid.

## 3 · Scroll-state container queries

**Support** (BCD):

| feature | Chrome | Safari | Firefox |
|---|---|---|---|
| `container-type: scroll-state`; `stuck`, `snapped`, `scrollable` | 133 (2025-02-04) | no | no |
| `scrolled` (direction) | 144 (2026-01-13) | no | no |

Chrome 133 notes: "The query container is either a scroll container, or an element affected by the scroll position of a scroll container" ([Chrome 133](https://developer.chrome.com/release-notes/133)). Chrome 144 notes: "style descendants of containers based on the most recent scrolling direction" ([Chrome 144](https://developer.chrome.com/release-notes/144)).

**Spec** ([CSS Conditional 5, WD 2026-06-30](https://drafts.csswg.org/css-conditional-5/), §6.3.5): "For a query container that is a scroll container, the `scrolled` container feature queries the direction of its most recent relative scroll." Values: `none | top | right | bottom | left | block-start | inline-start | block-end | inline-end | x | y | block | inline`.

**WebKit:**
- Standards position [#261](https://github.com/WebKit/standards-positions/issues/261) is open with no position; its last comment, 2026-05-22, links the bugs below. The `scrolled` direction feature has its own open issue, [#548](https://github.com/WebKit/standards-positions/issues/548).
- Bug [314082](https://bugs.webkit.org/show_bug.cgi?id=314082) ("Add scroll-state value for container-type property (parsing and computed value)") is RESOLVED FIXED 2026-05-28.
- Bug [313234](https://bugs.webkit.org/show_bug.cgi?id=313234) ("Implement scroll-state() container queries") is NEW.
- Bug [320328](https://bugs.webkit.org/show_bug.cgi?id=320328) ("Evaluate scroll-state(scrolled) container queries") was opened 2026-07-26 and is NEW.
- Safari 27's feature post does not mention the feature ([WebKit, 2026-09-17](https://webkit.org/blog/18325/webkit-features-for-safari-27-0/)).

**Measured (P05, P05b, P13):**

| step on a 300 px scroller | Chromium 149 | Playwright WebKit |
|---|---|---|
| `scrollTop = 300` (absolute) | `scrolled` does not match | no match |
| `scrollBy(0, 100)` | `bottom` | no match |
| `scrollBy(0, -1)` | `top` | no match |
| `scrollBy(0, 1)` | `bottom` | no match |
| wheel -50, then +50 | `top`, then `bottom` | no match |
| `scrollable: top` after scrolling down | matches | no match |
| `html { container-type: scroll-state }`, window `scrollBy(0, 100)` | `bottom` (P13) | no match |

- One pixel flips the direction bit, and there is no threshold. P13 shows the contrast: at y = 100 `scrolled: bottom` already matched while the 120 px trigger had not fired.
- Programmatic absolute scrolls (`scrollTop =`, `scrollTo`) never update it, and the root element works as the container.

## 4 · `overflow: clip`, `overflow-clip-margin`, and whether a scroll container can paint past its cross axis

**Support** (BCD): `overflow: clip` is Chrome 90 (2021-04-13), Safari 16 (2022-09-12), Firefox 81.

`overflow-clip-margin`:
- Chrome 90 is partial: "Only works when both axes are using `overflow: clip`" ([crbug 40235584](https://crbug.com/40235584)). The `<visual-box>` values are Chrome 104.
- Firefox 102.
- Safari no. [WebKit bug 236153](https://bugs.webkit.org/show_bug.cgi?id=236153), "Implement overflow-clip-margin", has been NEW since 2022-02-04 (last change 2026-09-20). WebKit's standards position [#427](https://github.com/WebKit/standards-positions/issues/427) was closed as **support** on 2026-09-23 at 19:06Z.

**Spec** ([CSS Overflow 3 ED, 2026-08-13](https://drafts.csswg.org/css-overflow-3/)):
- "if the other axis specifies a scrollable value, a specified value of `visible` computes to `auto` … If only one axis computes to a scrollable value (i.e. the other axis is `clip`), the box is a single-axis scroll container."
- On `overflow-clip-margin`: "If the box is a scroll container: the overflow clip edge is clamped to stay within the element's padding box … Note: This property was previously defined to only affect `overflow: clip`. It now also affects scroll containers, but only to shrink the clipping edge."
- §3.1.2: "when one of `overflow-x` or `overflow-y` computes to `clip` and the other computes to `visible`, the clipping region is not rounded."
- §3.3: the scrollable overflow area takes in descendants' border boxes "accounting for transforms", plus "additional padding … to enable scroll positions that satisfy … `place-content: end`". Also: "The `clip`, `clip-path`, and `mask-*` properties do not affect the scrollable overflow area."

**Measured, paint (P02).** The case is a 200×40 box holding five 50×40 seats. The first seat has a 6 px outline, so its ring pokes 6 px past the box on top, bottom and inline start. The probe samples one pixel 3 px outside the box. Both engines gave the same result on every row except E.

| case | computed (both) | scroll container | ring past the cross axis | ring past inline start |
|---|---|---|---|---|
| A `overflow-x: auto; overflow-y: visible` | `auto/auto` | yes | clipped | clipped |
| B `overflow-x: auto; overflow-y: clip` | `auto/hidden` | yes | clipped | clipped |
| C `overflow-x: clip; overflow-y: visible` | `clip/visible` | no (`scrollLeft` stays 0) | **painted** | clipped |
| D = C + `overflow-clip-margin: 10px` | `clip/visible` | no | painted | clipped (margin ignored) |
| E `overflow: clip; overflow-clip-margin: 10px` | `clip/clip` | no | Chromium painted, WebKit clipped | Chromium painted, WebKit clipped |
| F `overflow-x: auto; overflow-y: hidden; overflow-clip-margin: 10px` | `auto/hidden` | yes | clipped | clipped |
| G `overflow: visible` (control) | `visible/visible` | no | painted | painted |
| H `overflow-x: hidden; overflow-y: visible` | `hidden/auto` | yes | clipped | clipped |
| J `overflow-x: visible; overflow-y: clip; overflow-clip-margin: 10px` | `visible/clip` | no | clipped (margin ignored) | painted |

**Measured, scroll range (P03).** A 200 px flex scroller holding four 44 px seats with an 8 px gap; the probe decorates the last seat. Both engines gave identical results:

| last seat | `scrollWidth`/`clientWidth` | range |
|---|---|---|
| `scale: 1.1`, no padding | 202 / 200 | 2 |
| `scale: 1.1`, 4 px inline padding | 208 / 208 | 0 |
| `scale: 1.2`, 4 px inline padding | 208 / 208 | 0 |
| `translate: 4px 0`, no padding | 204 / 200 | 4 |
| 6 px outline, no padding | 200 / 200 | 0 |
| 6 px box-shadow spread, no padding | 200 / 200 | 0 |

**Measured, the rim under the plate radius (P14).** A 200×56 plate with a 28 px radius holds a 4 px bottom bar; the probe samples the bottom-left corner pixel.

| clip on the plate | Chromium 149 | Playwright WebKit |
|---|---|---|
| `overflow: clip` (both axes), static, animated child, and with `backdrop-filter` | corner clipped | corner clipped |
| `overflow: hidden` | clipped | clipped |
| `clip-path: inset(0 round 28px)`, static, and animated under `backdrop-filter` | clipped | clipped |
| `overflow-x: clip` alone | **leaks** (per spec §3.1.2) | clipped (rounded anyway, a divergence from §3.1.2) |

Readings:
1. **A scroll container cannot paint past its padding box on either axis, in any engine, now or under the current spec.** The clip edge can only shrink. The ED's single-axis scroll container (`auto/clip`) is not implemented: both engines compute `auto/hidden`. That cross axis clips either way.
2. `overflow-clip-margin` gives no way out. It needs two-axis `clip`, which is not a scroller, and it does nothing in Safari today. WebKit adopted a support position today, 2026-09-23, with no implementation date.
3. The non-scroller `overflow-x: clip; overflow-y: visible` computes `clip/visible` in both engines. It paints the cross axis and does not scroll. That answers D2-C Q6 for Playwright WebKit.
4. Transforms grow the scroll range; outlines and box-shadows do not. Inline end padding absorbs a transform that stays inside it, identically in both engines. That answers D2-A Q2 for Playwright WebKit.
5. The rim is clipped by the plate radius in both engines when the clip covers both axes (`overflow: clip` or `clip-path: inset(… round …)`), including over `backdrop-filter`. A one-axis `clip` rounds in WebKit and not in Chromium, so a rim must not depend on it.

## 5 · Anchor positioning

**Support** (BCD):

| feature | Chrome | Safari | Firefox |
|---|---|---|---|
| `anchor-name`, `anchor()`, `anchor-size()`, `position-area` | 125 (2024-05-14) | 26.0 | 147 (2026-01-13) |
| `anchor-scope` | 131 | 26.0 | 147 |
| `position-visibility: anchors-visible` | 125 | 26.2 | 147 |
| `position-visibility: anchor-visible` (the renamed keyword) | no | 27.0 | no |
| `position-anchor: normal` (the new initial value) | 151 (2026-07-28) | 27.0 | 151 |
| `anchor()` / `anchor-size()` transitionable | 125 | 26.0 | no |

- **Safari 27** ([WebKit, 2026-09-17](https://webkit.org/blog/18325/webkit-features-for-safari-27-0/)) made three changes.
  - "transform-aware anchor positioning. Now, when an anchor element has a CSS transform applied … elements positioned relative to that anchor follow its transformed position instead of its pre-transform layout position … even with animated transforms."
  - The `position-anchor` default moved from `auto` to `normal`.
  - `anchors-valid`/`anchors-visible` became `anchor-valid`/`anchor-visible`; Safari "temporarily supports the old keywords."
- **Spec** ([CSS Anchor Positioning 1, WD 2026-09-06](https://drafts.csswg.org/css-anchor-position-1/)): the anchor box "includes … transforms (such as `transform` or `offset-path`) … the axis-aligned bounding rectangle of the anchor box … is used instead. Transforms are often optimized onto a different thread, so transform-based updates to an anchor box's position may be delayed by a few frames."

**Measured (P06).** Both engines gave identical results:

| case | anchor rect (l, t, w) | positioned box (l, t, w) |
|---|---|---|
| no transform | 100, 100, 100 | 100, 140, 100 |
| `translate: 50px 0` | 150, 200, 100 | 150, 240, 100 |
| `scale: 1.5` | 75, 290, 150 | 75, 350, 150 |
| `left: anchor(--a1 left)` → `anchor(--b1 left)` under a 1 s linear transition, read at 500 ms | n/a | Chromium 250.05 px, WebKit 248.8 px (the interpolated midpoint of 100→400) |
| anchor inside a scroller, scroller moved 50 px | 120 → 70 | 120 → 70 (follows) |

- Chromium 149 is transform-aware as well, although Safari's post presents the behaviour as new in 27.
- The spec's "delayed by a few frames" note applies to D2-E's projection during a hover `scale` spring. Frame lag was not measured here: headless reads come after layout, so they cannot see compositor lag.
- A D2-E design that reads `position-visibility: anchor-visible` works only in Safari 27. `anchors-visible` works in both engines today but is the retiring spelling (E-1 tension).

## 6 · View Transitions

**Support** (BCD):

| feature | Chrome | Safari | Firefox |
|---|---|---|---|
| `document.startViewTransition`, `view-transition-name` | 111 (2023-03-07) | 18.0 (2024-09-16) | 144 (2025-10-14) |
| `types`, `view-transition-class` | 125 | 18.2 | 144/147 |
| `document.activeViewTransition` | 142 | 26.2 | 147 |
| **`Element.startViewTransition` (element-scoped)**, `view-transition-scope`, `ViewTransition.transitionRoot` | **147** (2026-04-07) | **no** | no |
| `ViewTransition.waitUntil` | 144 | no | no |

- Chrome 147 notes: element-scoped transitions let "the transition pseudo-elements [be] affected by ancestor clips and transforms, and multiple transitions on separate elements can run concurrently" ([Chrome 147](https://developer.chrome.com/release-notes/147)).
- The Chrome guide ([Chrome for Developers, element-scoped view transitions](https://developer.chrome.com/docs/css-ui/view-transitions/element-scoped-view-transitions)) adds:
  - the scope gets `view-transition-name: root` and `view-transition-group: contain`;
  - "the resulting `::view-transition-group-children(root)` pseudo automatically clips its contents using `overflow: clip`";
  - "calling `element.startViewTransition()` again skips the existing transition in favor of the new one."
- **WebKit:**
  - Standards position [#611 "Scoped View Transitions"](https://github.com/WebKit/standards-positions/issues/611), opened 2026-02-04, is open with no position.
  - A Bugzilla search for scoped or element view transitions found no implementation bug.
  - Safari 27's post lists only view-transition fixes. One is relevant: "inserting a CSS rule while a view transition is active causing the group animation to snap to its final state."
  - [WebKit bug 320238](https://bugs.webkit.org/show_bug.cgi?id=320238), "View Transitions cause flash when overlapping iOS Safari header and footer" (NEW, 2026-07-24), bears on a bottom-edge dock.
- **Backdrop filter:** the CSSWG resolved on 2023-09-27 to "animate backdrop-filter for view transitions similar to transform/size" ([csswg-drafts#9358](https://github.com/w3c/csswg-drafts/issues/9358)).

**Measured (P07):**

| probe | Chromium 149 | Playwright WebKit |
|---|---|---|
| keyframes on `::view-transition-group(dock)` for a named plate with `backdrop-filter: blur(8px)`, width 100→300 | `width, height, transform, backdropFilter` | same set |
| real mouse click on a button outside the named element, during a document transition | not delivered (`elementFromPoint` → `HTML`) | not delivered (`HTML`) |
| same click after the transition | delivered | delivered |
| element-scoped transition: click outside the scope / inside it | delivered / **falls through**: `elementFromPoint` inside the scope returns the page background behind the scope, and a real click there fires on that background, not on the in-scope button (`bisect/out-scoped-hit.txt`, `bisect/out-scoped-click.txt`) | API absent |
| element-scoped: extra animated properties | `::view-transition-group-children(root)` animates the scope's four border radii, border widths and four `corner-*-shape` longhands | n/a |
| **retarget:** transition 1 (width 100→300, 600 ms linear) interrupted at 200 ms by transition 2 (→150) | transition 1 at progress 0.335 (visual ≈ 167 px); transition 2's group starts at **300 px**: a 133 px jump | progress 0.323 (≈ 165 px), transition 2 starts at 300 px: 135 px |

Answers for D2-F:
- **Q1.** No WebKit signal makes element-scoped transitions a 2026 Safari cell: no position, no bug, not in Safari 27. Under D-4 the scoped path is BLOCKED. The fallback, a document transition, stops every click on the page for its duration in both engines, so it fails D2-F's own guard (a click at +100 ms reaches its target). The scoped path also fails that guard in Chrome, and worse: the click reaches whatever lies behind the dock (a misroute of the O-59 class).
- **Q2.** The group pseudo carries `backdrop-filter` as an animated property in both engines. What it blurs is the transition's own snapshot layers, not live DOM: during a transition the page underneath is the frozen old/new root images. That reading follows from the pseudo-tree structure; the pixels were not captured here, so it is UNVERIFIED in paint.
- **Q3.** A second transition captures the DOM's committed state, not the visual mid-state, so a retarget jumps (133-135 px here). A view transition cannot be retargeted with continuity. That rules it out against D-1 for any gesture that can be interrupted.

## 7 · `corner-shape` and `superellipse()`

**Support** (BCD):
- `corner-shape`: Chrome 139 (2025-08-05). BCD lists Safari and Firefox as "preview" for the property but "no" for the `<corner-shape-value>` type; the two entries disagree.
- `superellipse()`: Chrome 139; Safari no; Firefox no.
- `border-shape`: Chrome 147 only.

**Spec:** [CSS Borders 4](https://drafts.csswg.org/css-borders-4/#propdef-corner-shape).

**WebKit:**
- Standards position [#229](https://github.com/WebKit/standards-positions/issues/229) is **support**.
- The implementation bug [277912](https://bugs.webkit.org/show_bug.cgi?id=277912) is NEW, with active follow-ups:
  - 320109 (2026-07-23): superellipse outline and box-shadow offsets;
  - 322193 (2026-08-20);
  - 323849 (2026-09-10): `notch` cropping;
  - 325010 (opened 2026-09-23): "Implement the CSS corner and corner-* shorthands".
- The work is live, but the feature is not in Safari 27's feature post.

**Measured (P08):**
- Chromium: `corner-shape: round` → `squircle` under a 1 s transition reads `superellipse(1.42803)` at 500 ms, so it interpolates on the superellipse parameter. `superellipse(2)` computes to `squircle`.
- Playwright WebKit: the property is absent (empty computed value, `CSS.supports` false).

**Apple's own capsule**, for reference: SwiftUI `Capsule` "is equivalent to a rounded rectangle where the corner radius is chosen as half the length of the rectangle's smallest edge." `init(style:)` defaults to `.continuous` ([Apple, Capsule](https://developer.apple.com/documentation/swiftui/capsule)). Whether a `.continuous` capsule's ends are exact semicircles is not documented: UNVERIFIED.

For the dock: a continuous-curvature corner is Chrome-only in 2026. Under D-4 and E-2, the stadium in every rung is `border-radius`, and `corner-shape` can only be an addition that leaves Safari's paint correct, never the thing the shape depends on.

## 8 · Container units for the cross-axis radius

- **Support:** `cqw/cqh/cqi/cqb/cqmin/cqmax` are Chrome 105 (2022-09-02), Safari 16 (2022-09-12), Firefox 110 (BCD).
- **Spec:** [CSS Conditional 5 §7](https://drafts.csswg.org/css-conditional-5/). Units resolve against the nearest ancestor query container, or the small viewport units when there is none.

**Measured (P09).** A `::before` of a `container-type: size` box with `border-radius: 50cqmin`. Both engines gave identical results:

| box | `::before` radius |
|---|---|
| 200×56 | 28px |
| 64×560 | 32px |
| 200×56 resized to 300×40 | 20px |
| the container's **own** `border-radius: 50cqmin`, 200×56, 800×600 viewport | 300px (the `svmin` fallback) |

`50cqmin` on a child or pseudo is SwiftUI's capsule definition (half the smallest edge) expressed in CSS. The corner has to be drawn one box below the container: the container's own radius resolves against the ancestor or the viewport. The portfolio's §2.2 measured the first two rows in Chromium; Playwright WebKit agrees.

## 9 · The iOS 26/27 Liquid Glass tab bar: minimize on scroll

**Documented by Apple:**
- **iOS 26 API.**
  - `UITabBarController.tabBarMinimizeBehavior` and SwiftUI `tabBarMinimizeBehavior(_:)`, iOS 26.0. The cases are `automatic`, `never`, `onScrollDown` and `onScrollUp`.
  - `onScrollDown`: "Minimize the tab bar when downwards scrolling starts. Minimizing is supported for tab bars on only iPhone."
  - `automatic`: "On iOS, iPadOS, tvOS, and watchOS, the tab bar does not minimize."
  - The SwiftUI overview says `onScrollDown` "minimizes the tab bar as soon as someone scrolls down through a feed, and restores it when they scroll back up" ([TabBarMinimizeBehavior](https://developer.apple.com/documentation/swiftui/tabbarminimizebehavior), [MinimizeBehavior](https://developer.apple.com/documentation/uikit/uitabbarcontroller/minimizebehavior)).
- **HIG, Tab bars** (change log: Liquid Glass guidance added 2025-07-28, updated 2025-12-16 and 2026-06-08): "For tab bars with an attached accessory, like the MiniPlayer in Music, you can choose to minimize the tab bar and move the accessory inline with it when a person scrolls down. A person can exit the minimized state by tapping a tab or scrolling to the top of the view" ([HIG](https://developer.apple.com/design/human-interface-guidelines/tab-bars)).
- **The bottom accessory:** "when the tab bar is normal size, the accessory appears above it; when the tab bar is collapsed, the accessory displays inline" ([tabViewBottomAccessory](https://developer.apple.com/documentation/swiftui/view/tabviewbottomaccessory(content:))).
- **An Apple DTS reply** on the developer forums ([thread 809945](https://developer.apple.com/forums/thread/809945), Dec 2025) says the accessory's automatic collapse "should only collapse automatically when the scroll area significantly exceeds the screen height." This quote was read through a fetch summary and is not verified verbatim.
- **iOS 27** adds `UINavigationItem.navigationBarMinimization: UIBarMinimization` (iOS 27.0), which has three properties ([UIBarMinimization](https://developer.apple.com/documentation/uikit/uibarminimization-c.class)):
  - `minimizationBehavior`: `automatic | never | onScrollDown | onScrollUp`;
  - `restorationBehavior`: "By default the bar restores when the user reverses scroll direction; with `…AtScrollEdge`, the bar instead restores only when the scroll view's content reaches the scroll edge. Currently only honored in combination with `…OnScrollDown`";
  - `safeAreaAdjustment`: `automatic | disabled | enabled`, where `enabled` means "the safe area adjusts as bars minimize, allowing content to reflow". "Currently, only the navigation bar supports customizing the safe area adjustment."
  - Also: "When the navigation bar minimizes, an integrated top tab bar will also minimize."
  - iOS 27.0 adds `prominentTabIdentifier` ("the specified tab receives enhanced visual emphasis in the tab bar").
  - iOS 27.1 beta adds `UIVerticalBarCompressionBehavior` for a tab bar and bar items hosted together.
  - Beta-era write-ups used other names ([Kyle Howells, 2026-06-09](https://ikyle.me/blog/2026/whats-new-in-uikit-ios-27): `barMinimizeBehavior`; [Anton Gubarenko, 2026-07-22](https://antongubarenko.substack.com/p/ios-27-uibarminimization)). Apple's current docs, cited above, are the source of record.

**Measured by others (not by this seat):**
- **Restoration happens only at the scroll edge**, for the tab bar, on both iOS 26.5 and iOS 27 RC. [Twinskaraoke PR #133](https://github.com/Evil-Project/Twinskaraoke/pull/133) (2026-09-18) measured it "with a bare probe and no flip installed". Each row gives the restored flag, then the content offset before → after one upward gesture:

  | gesture | iOS 26.5 | iOS 27 RC (27A266a) |
  |---|---|---|
  | 160 pt slow drag | false 2839 → 2689 | false 2683 → 2533 |
  | 160 pt flick | false 2689 → 1211 | false 2533 → 1055 |
  | 400 pt drag | false 1211 → 505 | false 1055 → 385 |
  | full swipe down | true 505 → 0 | true 385 → 0 |

  "Only the gesture reaching offset 0 restores the bar, confirmed on an iOS 27 device against Apple Music. `TabBarMinimizeBehavior`'s documentation says `onScrollDown` 'restores it when they scroll back up'; that is not what either OS does." The same PR: "UIKit exposes no threshold, no state and no restoration behaviour for the tab bar."
- **Reveal timing.** The same project's commit [`c1dd2e7974`](https://github.com/Evil-Project/Twinskaraoke/pull/133/commits) (2026-09-17) reports:
  - "UIKit's own scroll-driven reveal animates correctly over ~200ms";
  - on iOS 27 a policy flip (`tabBarMinimizeBehavior` set to `.never` to force expansion) "arrives with no transition", held "about 995ms after the minimize began … then lands in two jumps roughly 100ms apart."
- **A third-party recreation's constants, not Apple's.** [expo-glass-tabs](https://github.com/davidmokos/expo-glass-tabs) (created 2026-07-22) notes that "iOS 26's native tab bar can minimize on scroll — but it collapses to a single icon". Its own minimize rule, in `src/minimize-context.tsx`:
  - offsets are clamped to the scroll range "so rubber-band overscroll can't flip the direction";
  - expand when y < 24; minimize on a per-event delta > 3; expand on a delta < −3;
  - a critically damped spring, `{ duration: 380, dampingRatio: 1 }`, "Spring, not timing: scroll direction flips mid-animation constantly, and a spring retargets while preserving velocity."

**Refuted:** a web-search summary presented "iOS 26 keeps the 72-point threshold reveal" as a system threshold. The phrase comes from the Twinskaraoke commit above and names that **app's own** threshold reveal, which the final PR removed. It is not a UIKit constant.

**Not found, UNVERIFIED:** Apple's minimize trigger distance, its velocity gating, and the spring constants of the tab bar morph. Apple documents none of them, and this seat has no iOS device or simulator.

**What this gives the dock's problem 4 (O-55 R-1, N-7):**
- The documented iOS model is a gate, not a scrubbed ramp. It minimizes when a downward scroll starts. It restores on scroll-direction reversal (iOS 27 navigation bar, `automatic`) or at the scroll edge (iOS 27 `atScrollEdge`, and the tab bar as measured). The move between the two states is a time-based spring.
- The owner's "expand on focus and hover" has an iOS analogue in "tapping a tab".
- On the web in 2026, the two native gates are Chrome-only: the direction bit (§3) and the offset trigger with hysteresis (§2). A gate that works on both engines is script (scroll events plus `scrollend`, which ships in Chrome 114 and Safari 26.2, measured in both in P11). The scrubbed ramp can be CSS on both engines (§1).

## 10 · Springs: `linear()` against script

**Support:** `linear()` easing is Chrome 113 (2023-05-02), Safari 17.2 (2023-12-11) and Firefox 112 (BCD). **Spec:** [CSS Easing 2](https://drafts.csswg.org/css-easing-2/#the-linear-easing-function).

A native `spring()` has been open as [csswg-drafts#280](https://github.com/w3c/csswg-drafts/issues/280) since 2016-07-06, with its last comment on 2026-09-08. A 2025-10-06 comment by flackr sets out the blocker: "In the full generality of keyframed animations, distance needs to be a parameter, right?"

Prior art on the limits:
- Josh Comeau, "Springs and Bounces in Native CSS" (2025-10-28, updated 2026-05-05). On interruption, CSS applies a "reversing shortening factor", and "the version using React Spring takes the element's *current inertia* into account … The CSS version, by contrast, turns around instantly, as though it hit a wall" ([joshwcomeau.com](https://www.joshwcomeau.com/animation/linear-timing-function/)).
- Motion compiles springs to `linear()` with a computed duration ([motion.dev/docs/css](https://motion.dev/docs/css)).
- Apple, WWDC23 "Animate with springs": "a spring animation uses the velocity it had when it was retargeted as the initial velocity towards its new destination" ([session 10158](https://developer.apple.com/videos/play/wwdc2023/10158/)).

**Measured (P10).** A `translate` transition over 600 ms on glass-ui's own `--spring-dock` curve, copied from `src/styles/tokens/scheme-spring.css:61`:

| probe | Chromium 149 | Playwright WebKit |
|---|---|---|
| velocity just before / just after a retarget to 500 px at 200 ms (x ≈ 142-145 px) | 0.814 → 0.206 px/ms (−75 %) | 0.819 → 0.249 px/ms (−70 %) |
| reversal to 0 at 200 ms: time to reach 0 | 291.6 ms | 296 ms |
| the last three frame steps of an uninterrupted 0→300 px run | 0.68, 3.45, **5.16** px | 1.02, 2.79, **5.92** px |

Readings:
1. A retarget restarts the easing from its own initial slope. glass-ui's spring curves start at a slope of zero, so every retarget loses most of the current velocity (row 1). That runs against D-1 and against Apple's stated spring behaviour. It is also the mechanism behind O-64's owner words "jittery … not smooth" wherever the dock morph is a CSS transition that gets retargeted.
2. A reversal takes a shortened clock: 292-296 ms of 600, which matches the ~0.48 of travel already done when it reversed.
3. **The tail is truncated.** The `--spring-dock` token's last stop is `0.97317 97.959%` followed by `1` (`scheme-spring.css:61`). The curve was sampled to its 2 % settle band, and the last 2.683 % of travel arrives in the final 2.041 % of the clock. At the dock's 210 ms clock (`--spring-dock-settle: 0.21s`, `:104`) that is 4.3 ms, less than one 60 Hz frame. The arithmetic applied to measured travels:

   | travel | source | step in the final frame |
   |---|---|---|
   | 284.7 px | W-6 | 7.6 px |
   | 179.33 px | W-13 | 4.8 px |
   | 398.49 px | O-64 R-1 | 10.7 px |

   P10 shows the effect at 600 ms: the frame-to-frame step grows in the last frames of the run (0.68 → 3.45 → 5.16 px in Chromium) where a spring's steps shrink. This is computed from the token and measured at a 600 ms clock. It was not measured on the dock itself.
4. A script integrator (one rAF loop owning position and velocity) keeps velocity continuous across retargets by construction, and it costs main-thread time every frame. One hybrid might keep both: on each retarget, a script solves the damped spring in closed form from the current position and velocity and hands a new `linear()` to WAAPI. That would keep the compositor path and the velocity. It is this seat's inference; no documented prior art for it was found, and it was not measured. UNVERIFIED.

## 11 · Adjacent platform facts the families lean on

| fact | support | measured |
|---|---|---|
| `scrollend` | Chrome 114, Safari 26.2 (2025-12-12) | fires once in both after a smooth `scrollTo` onto a 48 px snap lattice (100 → 96): Chromium at 177 ms, WebKit at 109 ms (P11) |
| `scrollsnapchange` / `scrollsnapchanging` | Chrome 129, Safari no | fires in Chromium only (P11) |
| `sibling-count()` / `sibling-index()` | Chrome 138, Safari 26.2, Firefox 154 | parse in both (P01). Spec: "the total number of child elements in the parent of the element on which the notation is used" ([CSS Values 5 ED, 2026-09-04](https://drafts.csswg.org/css-values-5/)). It counts an element's own siblings, so a count read from an ancestor still needs `:has()` or a property set on the children (D2-A Q4) |
| `clip-path: shape()` | Chrome 135, Safari 18.4, Firefox 148 | parses in both (P01) (D2-D Q1 support half) |
| `interpolate-size` / `calc-size()` | Chrome 129, Safari no. WebKit position closed as **support** 2026-09-23 ([#348](https://github.com/WebKit/standards-positions/issues/348)); bug [274177](https://bugs.webkit.org/show_bug.cgi?id=274177) reported as in progress | Chromium animates `width: auto → 50px` through 118.7 px at mid-clock; Playwright WebKit jumps to 50 px (P12). This is a layout animation either way (canon P5) |
| `progress()` | Chrome 138, Safari 26.0, Firefox 155; `no-clamp` in Safari 27.0 per the Safari 27 post (BCD still says "preview") and Firefox 155, not Chrome | parses in both (P01) |
| scroll anchoring (`overflow-anchor`) | Chrome 56, Safari 27.0, Firefox 66 | parses in both (P01) |

## 12 · Pass-1 questions from `PORTFOLIO.md` §6 that this seat closes or narrows

| question | answer | evidence |
|---|---|---|
| D2-A Q1 (`animation-range: 0 min(pitch, 50%)` on a named, scoped timeline; a 24 px overflow reaches both ends) | Resolves: 0 / 0.5 / 1 at 0 / 6 / 12 px, and the end cap 0.5 / 1 at 18 / 24, in Chromium and Playwright WebKit. Real Safari paint UNMEASURED | §1, P04 |
| D2-A Q2 (does WebKit count inline-end padding) | Yes in Playwright WebKit: 208 / 208 with `scale: 1.1` and `1.2`, the same as Chromium | §4, P03 |
| D2-A Q4 (`sibling-count()` in place of the `:has()` rungs) | Only for an element counting its own siblings. Counting from an ancestor still needs `:has()` | §11 |
| D2-A Q5 (a consumer's named timeline under `:root { timeline-scope }`, two docks sharing one scroller) | Root and inner scrollers both resolve, and two readers share one timeline. A duplicate name goes inactive (start value); an unresolved name shows the end keyframe. Both engines | §1, P15, P16 |
| D2-B Q5 (hysteresis on `useScrollTrigger` or on `scrollend`) | `scrollend` ships in both engines and fired once per smooth scroll in both | §11, P11 |
| D2-C Q6 (`overflow-x: clip; overflow-y: visible` is a non-scroller on Safari) | `clip/visible`, `scrollLeft` pinned at 0, cross-axis ring painted in Playwright WebKit | §4, P02 |
| D2-D Q1 (support half) | `shape()` is Chrome 135 and Safari 18.4 | §11 |
| D2-E Q1 (`anchor()` insets transition) | Yes in both engines; midpoint at mid-clock | §5, P06 |
| D2-E Q6 (`position-visibility` for seats scrolled away) | The keyword is `anchors-visible` in Chrome and `anchor-visible` in Safari 27 (old spelling kept for now) | §5 |
| D2-F Q1 (a WebKit signal for element-scoped transitions) | None: position #611 open with no position, no bug found, not in Safari 27. BLOCKED under D-4 | §6 |
| D2-F Q2 (the plate's lens during a scoped transition) | The group carries `backdrop-filter` as an animated property in both engines; what it paints over is snapshot layers. Pixels not captured | §6 |
| D2-F Q3 (hover-leave during a running transition; retargeting) | A new transition skips the running one and starts from the committed DOM: a 133-135 px jump | §6, P07 |
| D2-F guard (a click at +100 ms into a morph reaches its target) | Fails under both kinds: a document transition swallows the click (both engines); a scoped one sends it to the element behind the scope (Chromium) | §6, P07, `bisect/out-scoped-click.txt` |
| D2-F Q6 (a static rim seat filled by a scroll-driven animation, no JS) | Scroll-driven fills resolve in both engines, and a both-axes clip rounds the rim in both | §1, §4, P04, P14 |

## 13 · Unverified, refuted, or not reachable from here

- **Real Safari 26.x / 27:** every row. UNMEASURED (owner's safaridriver checkbox). Playwright WebKit already has Safari 27 parsing, which only shows the trunk is ahead of 26.5, not what Safari ships.
- **Compositor lag:** anchored boxes following a transformed anchor during an animated transform ("may be delayed by a few frames", spec); whether a registered-property scroll-driven animation stays off the main thread in either engine. Headless reads cannot observe either.
- **Paint during a view transition:** a live blur over snapshot layers versus a frozen image, and the iOS header/footer flash of WebKit bug 320238.
- **Apple's minimize threshold and spring constants:** not documented, not measured here.
- **The DTS forum quote in §9:** read through a fetch summary.
- **The closed-form `linear()` retarget hybrid (§10.4):** this seat's inference, with no prior art found.
- **Refuted:** "72-point" as a UIKit minimize threshold (§9). "Route to paint past a scroller's cross axis via `overflow-clip-margin`" (§4): the spec clamps a scroll container's clip edge to its padding box.
- **Spec against implementations, both engines:** the ED's single-axis scroll container (`auto/clip` computes `auto/hidden`), the ED's global timeline lookup (not implemented), and "last defined wins" for duplicate timeline names (implementations go inactive). Chromium and Playwright WebKit also split on rounding a one-axis `clip` (§4). Families should design to the measured behaviour and cite the ED gap.

## 14 · Sources (all read 2026-09-23)

**Support data**
- MDN browser-compat-data, raw JSON on `main`: `css/properties/{animation-timeline,timeline-scope,animation-range,scroll-timeline-name,view-timeline-name,container-type,overflow,overflow-x,overflow-clip-margin,anchor-name,position-anchor,position-area,anchor-scope,position-visibility,position-try-fallbacks,view-transition-name,view-transition-class,view-transition-scope,corner-shape,border-shape,interpolate-size,timeline-trigger,timeline-trigger-name,animation-trigger,trigger-scope,scroll-snap-type,scroll-marker-group,scroll-initial-target,container-name,backdrop-filter,clip-path,transition-behavior}`, `css/at-rules/{container,view-transition,property}`, `css/types/{anchor,anchor-size,length,easing-function,basic-shape,sibling-count,sibling-index,superellipse,corner-shape-value,calc-size,progress,if}`, `css/selectors/active-view-transition`, `api/{Document,Element,ViewTransition}`, `browsers/{chrome,safari,firefox}`. Base: `https://raw.githubusercontent.com/mdn/browser-compat-data/main/`.

**Specs (editor's or working drafts, dated as fetched)**
- [CSS Overflow 3 ED, 2026-08-13](https://drafts.csswg.org/css-overflow-3/)
- [CSS Conditional 5 WD, 2026-06-30](https://drafts.csswg.org/css-conditional-5/)
- [Scroll-driven Animations ED, 2026-05-14](https://drafts.csswg.org/scroll-animations-1/)
- [CSS Anchor Positioning 1 WD, 2026-09-06](https://drafts.csswg.org/css-anchor-position-1/)
- [CSS Values 5 ED, 2026-09-04](https://drafts.csswg.org/css-values-5/)
- [CSS Borders 4](https://drafts.csswg.org/css-borders-4/)
- [CSS Easing 2](https://drafts.csswg.org/css-easing-2/)
- [Animation Triggers 1](https://drafts.csswg.org/animation-triggers-1/)
- [CSS View Transitions 2](https://drafts.csswg.org/css-view-transitions-2/)

**Engine release notes and guides**
- WebKit: [Safari 26.0 (2025-09-15)](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/), [26.2 (2025-12-12)](https://webkit.org/blog/17640/webkit-features-for-safari-26-2/), [26.4 (2026-03-24)](https://webkit.org/blog/17862/webkit-features-for-safari-26-4/), [WWDC26 / Safari 27 beta (2026-06-08)](https://webkit.org/blog/17967/news-from-wwdc26-webkit-in-safari-27-beta/), [Safari 27.0 (2026-09-17)](https://webkit.org/blog/18325/webkit-features-for-safari-27-0/)
- Chrome release notes: [133](https://developer.chrome.com/release-notes/133), [144](https://developer.chrome.com/release-notes/144), [146](https://developer.chrome.com/release-notes/146), [147](https://developer.chrome.com/release-notes/147)
- Chrome guides: [scroll-driven animations](https://developer.chrome.com/docs/css-ui/scroll-driven-animations), [scroll-triggered animations (2025-12-12)](https://developer.chrome.com/blog/scroll-triggered-animations), [element-scoped view transitions](https://developer.chrome.com/docs/css-ui/view-transitions/element-scoped-view-transitions)

**Standards positions and bugs**
- WebKit standards-positions: [#229](https://github.com/WebKit/standards-positions/issues/229), [#261](https://github.com/WebKit/standards-positions/issues/261), [#348](https://github.com/WebKit/standards-positions/issues/348), [#427](https://github.com/WebKit/standards-positions/issues/427), [#548](https://github.com/WebKit/standards-positions/issues/548), [#576](https://github.com/WebKit/standards-positions/issues/576), [#589](https://github.com/WebKit/standards-positions/issues/589), [#611](https://github.com/WebKit/standards-positions/issues/611), [#632](https://github.com/WebKit/standards-positions/issues/632)
- WebKit Bugzilla (REST, 2026-09-23): 236153, 274177, 277912, 305311, 313234, 314082, 318858, 318864, 318906, 318979, 319205, 319239, 319418, 320109, 320238, 320328, 322193, 323849, 325010
- CSSWG: [#280 spring()](https://github.com/w3c/csswg-drafts/issues/280), [#9358 backdrop-filter in view transitions](https://github.com/w3c/csswg-drafts/issues/9358)

**Apple**
- UIKit: [`tabBarMinimizeBehavior`](https://developer.apple.com/documentation/uikit/uitabbarcontroller/tabbarminimizebehavior), [`MinimizeBehavior`](https://developer.apple.com/documentation/uikit/uitabbarcontroller/minimizebehavior), [`UIBarMinimization`](https://developer.apple.com/documentation/uikit/uibarminimization-c.class) and its three properties and enums, [`navigationBarMinimization`](https://developer.apple.com/documentation/uikit/uinavigationitem/navigationbarminimization-15u99), [`prominentTabIdentifier`](https://developer.apple.com/documentation/uikit/uitabbarcontroller/prominenttabidentifier), [`UIVerticalBarCompressionBehavior`](https://developer.apple.com/documentation/uikit/uiverticalbarcompressionbehavior)
- SwiftUI: [`tabBarMinimizeBehavior(_:)`](https://developer.apple.com/documentation/swiftui/view/tabbarminimizebehavior(_:)), [`TabBarMinimizeBehavior`](https://developer.apple.com/documentation/swiftui/tabbarminimizebehavior), [`tabViewBottomAccessory`](https://developer.apple.com/documentation/swiftui/view/tabviewbottomaccessory(content:)), [`Capsule`](https://developer.apple.com/documentation/swiftui/capsule)
- Design and developer relations: [HIG Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars), [WWDC23 Animate with springs](https://developer.apple.com/videos/play/wwdc2023/10158/), [developer forums thread 809945](https://developer.apple.com/forums/thread/809945)

**Measured or written by others**
- [Twinskaraoke PR #133 and commit c1dd2e7974](https://github.com/Evil-Project/Twinskaraoke/pull/133)
- [expo-glass-tabs](https://github.com/davidmokos/expo-glass-tabs) (`README.md`, `src/minimize-context.tsx`)
- [Josh Comeau, Springs and Bounces in Native CSS](https://www.joshwcomeau.com/animation/linear-timing-function/)
- [Motion, CSS springs](https://motion.dev/docs/css)
- [Kyle Howells, What's New in UIKit in iOS 27](https://ikyle.me/blog/2026/whats-new-in-uikit-ios-27)
- [Anton Gubarenko, iOS 27: UIBarMinimization](https://antongubarenko.substack.com/p/ios-27-uibarminimization)

**Read-only from this tree**
- `src/styles/tokens/scheme-spring.css:61,104`
- `src/composables/motion/spring/springPresets.ts:81-89`

## 15 · Probe index

Scratch root: `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D2/p1/W/`. Viewport 800×600 (P14: 800×700) at device scale factor 1.

| id | page | runner → output | what it checks |
|---|---|---|---|
| P01 | `pages/01-supports.html` | `run.mjs` → `results.json` | `CSS.supports` and API presence, 48 declarations and 10 APIs |
| P02 | `pages/02-overflow-paint.html` | `run.mjs 02` → `results-02.json` | computed overflow, scroll container status, a ring pixel 3 px outside the box |
| P03 | `pages/03-scroll-range.html` | `results.json` | scroll range under transform, outline, shadow, end padding |
| P04 | `pages/04-sda.html` | `results.json` (Chromium); WebKit via `bisect/run-bisect{,2,3,4}.mjs` | root and named-inner ramps, cap ranges |
| P05, P05b | `pages/05-scroll-state.html`, `pages/05b-scrolled.html` | `results.json`, `run-05b.mjs` → `out-05b.json` | `scrollable`, `scrolled` under absolute, relative and wheel scrolls |
| P06 | `pages/06-anchor.html` | `results.json` | transform-aware anchors, `anchor()` transition, scroll compensation |
| P07 | `pages/07-vt.html` | `results.json` | group keyframes, click delivery, scoped transitions, retarget |
| P08 | `pages/08-corner.html` | `results.json` | `corner-shape` computed values and interpolation |
| P09 | `pages/09-cq.html` | `results.json` | `50cqmin` radii, own-box fallback, resize |
| P10 | `pages/10-spring.html` | `results.json` | `--spring-dock` transition: retarget velocity, reversal time, tail steps |
| P11 | `pages/11-scrollend.html` | `results.json` | `scrollend` and `scrollsnapchange` |
| P12 | `pages/12-interp-size.html` | `results.json` | `interpolate-size` mid-clock width |
| P13 | `pages/13-trigger.html` | `run-13.mjs` → `out-13.txt` | `timeline-trigger` hysteresis; root `scroll-state` |
| P14 | `pages/14-rim-clip.html` | `run-14.mjs` → `out-14.txt` | bottom rim clipped by the plate radius under four clip forms |
| P15 | `pages/15-timeline-names.html` | `run.mjs 15` → `results-15.json` | root-named timeline shared by two readers |
| P16 | `pages/16-timeline-lookup.html` | `run.mjs 16` → `results-16.json` | duplicate names, global lookup |
| crash | `bisect/run-bisect5.mjs` | `bisect/out-bisect5.txt` | the Playwright WebKit `Animation.rangeEnd` crash |
| scoped hit | `bisect/run-scoped-hit.mjs`, `bisect/run-scoped-click.mjs` | `bisect/out-scoped-{hit,click}.txt` | where a click inside a running element-scoped transition lands (Chromium) |
