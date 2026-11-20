# Glass-owned faults seen on the Connectivity Atlas, 15 November 2026

To the glass-ui maintainers. This note covers only the faults where the Atlas uses a glass component as intended and the fault lives in the component. Everything else is in `FINDINGS.md` beside this file. The build audited is `.u-build/out/sp/dist-6`, which bundles glass-ui **10.1.2**, so the fixes booked for 11.1.1 in your animation audit (`glass-ui/docs/tranches/BL/audit/animation/AUDIT.md`) are not in it. Where a fault matches one of your audit's rows, I cite the row and add only what the Atlas showed. A separate phone audit by touch has its own glass note, `sci-report/atlas/docs/tranches/U/design/PHONE-AUDIT-GLASS-2026-11-15.md` (select sheet seating, touch tooltips, detentless sheet drag, the full-height overshoot, the square focus ring). I do not repeat those here.

All runs used headless Chromium (Playwright 1.61) unless a row says otherwise. The phone runs used 390 × 844, touch and 4x CPU throttling through CDP. Frame times come from a requestAnimationFrame recorder, and motion from the Web Animations list plus a per-frame rect and opacity tracker. The filmstrips named below are in `films/`.

## 1. Reduced motion cuts instead of fading (your row 13, with an Atlas-specific twist)

With `prefers-reduced-motion: reduce` emulated, every surface on the Atlas cuts: the route change, the filter drawer, the dock rail, the theme flip, the enlarge layer and the plate dials. The Atlas did write its own fallback. `design/foundations/base.css:93–103` gives every element a 120 ms opacity and colour crossfade under reduced motion, marked `!important`. It never applies. `styles/utilities/a11y-overrides.css:46–52` sets `transition-duration: 0s !important` inside `@layer components`. In the cascade, an `!important` declaration in a layer beats an `!important` declaration outside any layer, so a consumer cannot override the kill without layering its own rule above yours. Computed `transition-duration` reads `0s` on the dock buttons, on `.glass-dock` and on the Atlas's `.viz-plate__body`.

Reproduction: open `/sci` at 1440 with reduced motion and read `getComputedStyle(document.querySelector('.glass-dock')).transitionDuration`. Then open the Filters drawer and watch it appear whole.

Suspected cause and ask: besides the authorized fades your row 13 already plans, please make the reduced-motion rule something a consumer can relax. Either keep opacity and colour out of the kill, or put the kill in a low layer without `!important`. Evidence: `data/timings.jsonl` ids `rm-*`, TIMINGS rows `env:rm-*`.

## 2. The Sheet's main-thread spring loses its travel on a busy phone (new; related to your row 36)

On a phone at 4x CPU, tapping Filters on `/sci` produces no visible response for about 225–300 ms. The first frame that paints already shows the bottom sheet at its overshoot, almost fully open. It then settles downward for about 500 ms. The upward travel is never seen: the largest single-frame step is 756 px. A 167 ms long task sits at the start. Most of it is the Atlas mounting the drawer's body, which the Atlas owns. But `SheetContent.vue:142` drives the travel through `useSpringMount` on the main thread, so whatever blocks the main thread at open time also takes the motion. The Select and Popover entrances, which run on CSS, stayed intact under the same throttle.

At 1440 without throttling, the sheet opens in 581 ms and closes in 184–203 ms. The phone sheet opens in 640 ms. Every other overlay on the site opens in 200–240 ms, so the sheet is two to three times slower than its siblings. This matches your row 36: the panel preset overshoots and settles slowly.

Reproduction: `/sci` at 390 × 844 with touch and `Emulation.setCPUThrottlingRate {rate: 4}`. Tap the Filters button in the bar and record the panel's `translate` each frame. Film: `films/ctl-filter-drawer-open-chromium-p390-x4-light_sci.jpg`.

Ask: run the sheet's travel on the compositor (a WAAPI or CSS `linear()` spring from the same preset), so a busy main thread delays the start but cannot erase the path. Also bring the open time into the 200–350 ms band your rubric names for panels.

## 3. The page recolours in one frame on a theme change (your row 10)

On the Atlas, the toggle press gives no response for about 230 ms, including a 108–134 ms frame and a 62–77 ms long task. The whole page then recolours in a single frame. Only the toggle's icon (210 ms) and some dock borders tween. The OS scheme flip behaves the same way: an 83–100 ms frame and 11–16 dropped frames. The Atlas passes `disableTransitions: true` (`platform/chrome/dock/Dock.vue:89`), which turns on your `html.no-transition` blanket. Even so, the cut comes from `useGlobalDark.ts` toggling the class with nothing to fade between, as your row says. Your proposed cure, a view-transition crossfade with `.no-transition` inside it, would fix this for the Atlas with no change on its side. Film: `films/ctl-theme-toggle-1-chromium-d1440-light_sci.jpg`. Data: TIMINGS `ctl:theme-toggle-*`, `env:os-scheme-flip-*`.

## 4. ExpandableContainer: the close ends in a one-frame layout swap (your row 27)

The Atlas's "Enlarge" control uses ExpandableContainer around a chart plate (`charts/frame/ChartFrame.vue:527`). On close, the scrim fades for 150 ms and the panel travels back. For about 300 ms the subtree still shows the enlarged layout squeezed into the plate's box. Then, at settle, the plate's own layout replaces it in one frame. This is the same "the out has no frames" root as your row 27, seen from the content's side. The container hands the subtree back to its home only at the end, and nothing crossfades the two layouts. The open has the opposite problem, which the Atlas owns: its enlarged numeral mounts late and counts up again. Films: `films/ctl-plate-enlarge-close-esc-chromium-d1440-light_sci.jpg`, `films/ctl-plate-enlarge-open-chromium-d1440-light_sci.jpg`.

## 5. GlassDock rail: a fixed hold before the fold

On the desktop rail, the crest disc blooms to the vertical rail in 219–231 ms. When the pointer leaves, the rail holds for 430–840 ms and then folds over 249 ms. The hold does not depend on how long the pointer stayed. The owner asked on 12 November for a linger that grows with dwell, followed by an eased fold. The spread of 430–840 ms in our runs points to a timer whose start is tied to the last hover-intent tick rather than to the leave. Film: `films/ctl-rail-collapse-leave-chromium-d1440-light_sci.jpg`. Data: TIMINGS `ctl:rail-*`.

## 6. Carousel: a mouse drag does nothing

The home page's carousel is glass Carousel with native scroll-snap. A touch swipe tracks 1:1 and a flick carries momentum (a 393 px flick ran to 781 px). The chevrons travel in about 240 ms. A trackpad swipe works. A mouse press-and-drag on the strip, though, does nothing: no movement and no snap. A desktop visitor who reaches for the cards to pull them gets no answer. This is separate from your row 33, which is about the snap after a touch drag. Data: `data/drag.jsonl` part=carousel. Film: `films/drag-carousel-chevron-next-chromium-d1440.jpg`.

Ask: a pointer-drag path for `pointerType === "mouse"` that writes `scrollLeft` while dragging and releases into the snap with the drag's velocity.

## 7. Command palette: the list is gone in the first frame of the close (your row 12)

As your row 12 describes: on Escape, the Atlas's search palette (`CommandDialog`) drops from 437 to 67 px in the first frame, and then only the input fades. The Atlas adds to it. `DockSearchPalette.vue:29` clears its query as soon as `open` turns false, so its results list unmounts at the same moment. Your fix ("hold the inner list open while the dialog exits") will need the Atlas to stop clearing early, and the Atlas row is L-18 in FINDINGS. Film: `films/ctl-search-close-esc-chromium-d1440-light_sci.jpg`.

## 8. Command input is 14 px, so iOS zooms the page on focus

The input inside the filter drawer's search ("District or charter name", a `CommandInput`) computes to 14 px. `components/command/styles.css:121` sets it to `--dropdown-text`, which resolves to `--control-text`. Safari on iOS zooms the page when a focused input is under 16 px. That zoom cannot be seen in Chromium emulation, so it needs a real phone to watch, but the size is measured. Ask: 16 px at `(pointer: coarse)` for every text input glass ships. Data: `data/text.jsonl` where=filter-drawer.

## 9. Tooltip opens without intent

Two cases. When the filter drawer closes, focus returns to the Filters button and its tooltip opens, even though the user pressed Escape and never hovered. And when a route arrives under a resting pointer, a tooltip on the control under the pointer opens with no movement. Both come from the Tooltip opening on programmatic focus and on a pointer that was already there. It should open on a deliberate hover (a pointer move) or on keyboard focus (`:focus-visible`). This shares a root with your row 6 (the tooltip's enter), but the trigger condition is the fault here, not the frames. Films: `films/ctl-filter-drawer-close-esc-chromium-d1440-light_sci.jpg`, `films/route-homelink-sci-chromium-d1440.jpg`.

## What I could not check

Real iOS Safari, including the 14 px zoom, the sheet under real momentum and the theme flip at ProMotion frame rates. Pinch on real hardware. WebKit runs of the chrome walk were queued but blocked by another session's machine-wide WebKit lock for the length of this audit (see FINDINGS).
