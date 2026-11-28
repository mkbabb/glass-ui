# BM-7: the rim's window

| field | value |
|---|---|
| release | BM's parts minor |
| status | planned |
| rests on | choice 26 B, ratified under IN O-426; the owner's order that scroll progress sits on the dock's own border, edge to edge (`docs/precepts/README.md:105-108`) |
| DESIGN | §4.3; §3 (the window); §4.2 rule 4 |
| sketch | `study/pass-2/delivery/sketch/scroll-progress-rim.next.css` |
| page | P2-scroll (Scroll Under Load), optional reading |
| gates | G-2, G-5 |
| depends on | BM-0 |

## What it builds

`ScrollProgressRim` (`src/components/scroll-progress-rim/`) reveals its stroke by a translated window, where today it redraws a `clip-path` on its border legs. Both legs of the window are `translate`, so the reveal rides the compositor.

- **What feeds it.** The rim draws the value it is given (`R111` `ScrollProgressRim.vue:26-38`, `:72-91`: `value` only, no scroll-timeline mode). Both sites compute that value in script: atlas's is its beat progress over the route's sections (`useBeatProgress`, `DockProgressRim.vue:11-20`), and fourier's is its dock's progress or the page's (`AppDock.vue:601`, `:785`). Neither is the page's scroll fraction, so no scroll timeline can stand in for it, and no scroll mode is added. Each value a site sends is one write of the window's `translate` on the rim's one element, which replaces today's custom property (`--scroll-progress-rim-fill`), so nothing writes a custom property per frame (P5).
- **Under Reduce Motion** a line that tracks the reader's own scroll stays, since it is the reader's scroll. A change the reader's scroll did not make (a route's first value, a jump) tweens over 100 to 150 ms on an ease-out on the compositor, in both modes, so the quantity's one sign never cuts (P6; D§5.3). Under Reduce Motion that tween is an `!important` carve in the rim's sheet. D§4.2's rule-4 row ("a reveal lands in its end state") is superseded.
- The window is the rim's own element and its stroke a child, so no node is added.
- The rim publishes no window primitive, span token or ring. The span-bar and ring part (Home Assistant's LF-23 and LF-24, amended into one part with two forms, shown to the owner before it is built) is BL's; if it wants D§3's capsule window it takes the geometry from the study, not from a BM export (BM.md §7).

## Bytes

CSS +273 B (the window) and −319 B (the clip legs) (`study/pass-10/ledger/ledger.json`). Indicative until G-4.

## Proof

In headless Chromium and Playwright WebKit, through `guarded`, on glass's demo dock with a scrolling page and on each site's dock:

- the stroke's revealed length equals today's at 0, 25, 50, 75 and 100 % of the scroll, to half a pixel, on a pill and a rounded dock;
- `document.getAnimations()` and the computed style over a scroll, fed as each site feeds it (atlas's beat progress, fourier's dock progress), show only the rim's `translate` changing and no custom property written;
- a jump of the value tweens over 100 to 150 ms, with Reduce Motion off and on;
- with Busy page on, the stroke keeps pace with the scroll (a film, not a gate);
- Reduce Motion, forced colours (the stroke in CanvasText) and more contrast;
- G-2 and G-5 in both modes.

## Sites it serves

| Site | Where the rim mounts (newest branch, read 2026-11-24) |
|---|---|
| atlas | `src/platform/chrome/dock/components/DockProgressRim.vue:20`, `edge="border"` (`u/s24-atlas`) |
| fourier | `web/src/components/layout/AppDock.vue:785`, `edge="border"` with stops (`origin/master`) |

None changes anything. fourier is asked whether a test reads the rim's clip. gaggle mounts no rim in its site: its page dock's header comment names one (`dashboard/src/report/page/PageDock.vue:4`), but only its F3 prototype draws it (`dashboard/proto/F3/App.vue:412`).

## Not this wave's

The dock's run corners as it scrolls (D§4.3, BL's run; a picture for the owner once the dock-redesign minor ships); FadingScroll and the collapsing bar (BM-9); the span-bar and ring part (BL's).
