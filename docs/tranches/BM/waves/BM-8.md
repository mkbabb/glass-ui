# BM-8: the capsule window in 11.x, conditional

| field | value |
|---|---|
| release | BM's parts minor, only where its reading holds; otherwise the window first ships with BM-11 in 12.0.0 |
| status | planned; ships in the minor only on its reading |
| rests on | Q1 (D§16, closed); choice 25 B's window (D§3) |
| DESIGN | §3; with §10.7 |
| sketch | `study/pass-4/shape/sketch/capsule-window.next.css` and `bud-windows.next.css`; the geometry `pass-4/shape/geometry.json` (`F_window`) |
| page | P4-bud (Glass Bud Shapes), lane F with Frost on |
| gates | G-2, G-5 |
| reading | P4-bud's F with Frost on, on an iPhone in Safari: no square patch, and its frost reads as G's (D§15.2). It is a conditional ship, not a hold: until it arrives, 11.x keeps today's shapes, because shipping the window unread could hide a stopped blur |

## What it builds

A capsule that changes width takes the window. A capsule plate at its widest, seen through a window of the same capsule, is a capsule at every width when the window's `translate` sets one end and the plate's sets the other. On a quarter-pixel grid, at 21 widths from 236 to 52 px, the visible region and the ideal capsule agree everywhere (`geometry.json`, `F_window`). Both legs are `translate`, so they run on the compositor, and no node is added where the window is the part's own element and the glass its `::before`.

- **Where it serves in 11.x:** the dock's fold, as BL's 11.1.2 face trade on one window (D§7.1), and a seat wider than the disc. Stretching (a non-uniform `scale` bends the ends to 5.7 × 26 px at the disc) and resizing (layout every frame) are refused.
- **Its hit region.** The window takes `pointer-events: none` and its `::before` takes `auto`, so the hit follows the plate: the neighbour takes its own hit, and the gap and the far corner hit nothing (`pass-10/access/window-hit-chromium.json`, `pass5_cure`). The window's rectangular clip bounds the hit and its rounded end does not, so the folded disc takes taps in the two square corners outside its round on the clipped side, about 290 px² at 52 px. The corner is accepted. A static `clip-path` on the window would bound it, but in 11.x that makes the window a backdrop root and stops the blur.

## Inputs folded

The dock's 11.1.2 cures stand under the window: the faces trade on one window and fade as wholes (IN O-430 items 1, 2, 4), the collapsed face fades in changed content (item 10), reduced motion trades the faces by a fade in place (item 8), `data-summary` and `data-persistent` on the root in place of `:has(:empty)` (IN O-433), and the press check through `composedPath()` (LF-56). The window changes the plate's shape and none of those.

## Bytes

The window's rules are counted with the fold (BM-11) in the ledger; in 11.x the wave adds the window's two `translate` legs to the dock's sheet and removes the shape's resize legs. G-4 reads it at BM-R1.

## Proof

- `study/pass-10/access/window-hit.mjs` with critic B's two added points, (300, 126) past the straight edge and (250, 102) outside the rounded end, and the four of pass 5: six points in headless Chromium and Playwright WebKit, through `guarded`.
- The fold's strip, light and dark, 390 and 1440, on glass's demo dock and value.js's.
- With Frost on, the frost inside the window against the frost outside it, as a film; the iPhone reading decides the ship.
- G-2 and G-5.

## Sites it serves

Every dock site: atlas, value.js, daraksha, fourier, keyframes, gaggle and Home Assistant. None changes anything.

## Not this wave's

The 12.0.0 fold (BM-11); the theme seat's split (BM-12); the dock redesign's width glide on a transform (IN O-430 item 3, the dock-redesign minor).
