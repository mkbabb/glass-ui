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

`ScrollProgressRim` (`src/components/scroll-progress-rim/`) reveals its stroke by a translated window, where today it redraws a `clip-path` on its border legs. Both legs of the window are `translate`, so the reveal rides the compositor. A rim fed by the page's scroll rides a scroll timeline (rule 4), and nothing is written per frame.

- Under Reduce Motion a line that tracks the reader's own scroll stays, since it is the reader's scroll; a reveal lands in its end state.
- The window is the rim's own element and its stroke a child, so no node is added.
- The rim publishes no window primitive, span token or ring. The span-bar and ring part (Home Assistant's LF-23 and LF-24, amended into one part with two forms, shown to the owner before it is built) is BL's; if it wants D§3's capsule window it takes the geometry from the study, not from a BM export (BM.md §7).

## Bytes

CSS +273 B (the window) and −319 B (the clip legs) (`study/pass-10/ledger/ledger.json`). Indicative until G-4.

## Proof

In headless Chromium and Playwright WebKit, through `guarded`, on glass's demo dock with a scrolling page and on each site's dock:

- the stroke's revealed length equals today's at 0, 25, 50, 75 and 100 % of the scroll, to half a pixel, on a pill and a rounded dock;
- `document.getAnimations()` over a scroll lists only `translate` on the rim;
- with Busy page on, the stroke keeps pace with the scroll (a film, not a gate);
- Reduce Motion, forced colours (the stroke in CanvasText) and more contrast;
- G-2 and G-5.

## Sites it serves

| Site | Where the rim mounts (newest branch, read 2026-11-24) |
|---|---|
| atlas | `src/platform/chrome/dock/components/DockProgressRim.vue` (`u/s24-dd-atlas`) |
| fourier | `web/src/components/layout/AppDock.vue:597`, `edge="border"` with stops (`origin/master`) |
| gaggle | `dashboard/src/report/page/PageDock.vue` (`site-redesign`) |

None changes anything. fourier is asked whether a test reads the rim's clip.

## Not this wave's

The dock's run corners as it scrolls (D§4.3, BL's run; a picture for the owner once the dock-redesign minor ships); FadingScroll and the collapsing bar (BM-9); the span-bar and ring part (BL's).
