# value.js (and keyframes) → glass-ui (BL) · O-83 · 2026-09-25 · DOCK-CAP-ELLIPSE: the scroll-driven cut-cap rests at `50%`, so the dock plate paints as an ellipse

**Owner, verbatim (2026-09-25):** *"the dock background is not right still--fix at the root glass-ui"*. Frame: value.js `docs/tranches/X/waves/owner-2026-09-25/dock-ellipse.png` (value.js on glass 10.1.0, `/atmosphere`, 1440, light; reproduced exactly, and in dark too).
Evidence: value.js `docs/tranches/X/waves/W7L-evidence/dock-ellipse/` (`probe.mjs` layer walk and `elementsFromPoint`, `sweep.mjs`, `route-sweep.mjs`, `tokens.mjs`, frames, sweep JSON).

## The element and the rule (glass v10.1.0; unchanged at HEAD `84b470aa`)
- The ellipse is **`div.dock-plate`** itself, and its `::after` grain inherits the radius. At 307×61 the computed values are `border-start-start-radius: 50%` and `border-start-end-radius: calc(41.67% + 2.67px)`; the run overflows by 8 px.
- `src/components/dock/styles/run.css:468`: `.glass-dock { --dock-cap-rest: 50%; --dock-cap-cut: var(--radius-card); }`. `:504-512` drives it with `animation-timeline: --dock-run`, over the range `0 var(--dock-pitch)` and its mirror. The keyframes are `:557-577` (inline) and `:579-598` (vertical). The comment at `:448-452` states the wrong premise ("`50%` resolves to the stadium's own corner").
- **Cause:** a percentage radius resolves per axis (width for the horizontal radius, height for the vertical), so `50%` on 307×61 is 153.5 × 30.5 px, an ellipse. The stadium corner is 30.5 × 30.5. With an overflow under one pitch, both arms sit near `from`, so both ends read about 50% and the whole plate is an ellipse. Below 1024 (the compact dock 172×56, overflowing about 143 px) the leading end is 50% and the trailing end 16 px: a half-ellipse against a cut corner.
- **keyframes:** the collapsed 56×56 plate's run overflows by 99–178 px at every width. The leading end is 50%, which is circular on a square, and the trailing end is 16 px: a lopsided shape. An expanded keyframes dock of the right width shows the ellipse. **fourier:** clean, because its run never overflows.

## Ask (root cure)
1. `--dock-cap-rest` must be a **length equal to half the plate's block size**. `dockMorphMeasure.ts:98` already publishes `--dock-collapsed-px`; have it also publish the measured plate block size and set `--dock-cap-rest: calc(var(--dock-block-px) / 2)`. That interpolates without the 9999px clamp-and-snap. A no-JS fallback, `calc(var(--dock-control-size) / 2 + var(--dock-padding-block))`, is exact on 56 px docks but 2.5 px short on value's 61 px dock. The vertical dock needs the same cure on the inline axis.
2. **Gating (judgement calls, for BL to rule):** the cap should engage only when the overflow reaches at least one pitch (the 8 px case hides nothing), and should be off on a collapsed dock.
3. Please add a born-RED witness: the plate's two corner radii are equal (circular) at every overflow state, on horizontal and vertical docks.
value.js investigates its own 8 px `/atmosphere` overflow separately (X-W12U). The ellipse is glass's regardless.
