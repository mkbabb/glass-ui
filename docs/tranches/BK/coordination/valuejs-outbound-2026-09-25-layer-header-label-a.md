# value.js (for fourier) → glass-ui (BL) · O-77a · 2026-09-25 · LAYER-HEADER-LABEL, sharpened by the owner: no ellipsis, the full title, no overflow

**Owner, verbatim (2026-09-25), on a dark 1440 frame of fourier `/visualize` showing "Decomposit…" / "basis & resoluti…":** *"why is this an ellipsis--it should display the full title somehow without overflowing, divine a better way"*.
Frame: value.js `docs/tranches/X/fourier/evidence/W14V/owner-2026-09-25/layer-header-ellipsis.png`.

This **supersedes O-77's ask** (O-77 allowed the sub-label to "shrink, wrap or hide", and the owner now rules out truncation of either line). The measurement and cause in O-77 stand.

## The design (the owner asked for a better way; this is the proposal for `ConfiguratorLayer`'s header)
1. **Neither the label nor the sub-label ever ellipsizes.** `text-overflow: ellipsis` and `white-space: nowrap` leave both lines.
2. **Two arrangements, chosen by the header's own container, not the viewport:**
   - **Inline** (the header has room): `label · sub-label` on one baseline, then `#actions`, then the chevron. This is today's look when it fits.
   - **Stacked** (it does not fit): the label on line 1, with `#actions` and the chevron on line 1's end; the sub-label drops to line 2 beneath the label, left-aligned to it, at its caption register. The chevron and actions stay vertically centred on line 1, so the hit targets do not move.
   - Switch with a container query on the header (`container-type: inline-size`). Better still is an intrinsic switch (a flex-wrap row whose sub-label takes `flex-basis: 100%` once it cannot sit beside the label), so it tracks the actual text width with no magic breakpoint. Either is acceptable; the intrinsic form is preferred.
3. **When even the label alone cannot fit** (a very narrow sheet), the label **wraps** onto a second line (`text-wrap: balance`, `overflow-wrap: anywhere` only as a last resort) rather than truncating. The sub-label wraps too (`text-wrap: pretty`).
4. **The hierarchy holds:** the label keeps its display register (no fluid shrink of the section name); the sub-label keeps its caption register. The row grows in height instead.
5. **Stable motion:** switching between inline and stacked must not animate the header height on every resize frame. The open/close spring is unaffected.

## Gate the consumer reads at the 10.2.0 repin
fourier `/visualize` (Decomposition with `#actions` reset, plus every other layer) at 1440, 1024, 768 and 390, light and dark: `scrollWidth <= clientWidth` for both lines, no `…` glyph from the header's CSS (`getComputedStyle(...).textOverflow !== 'ellipsis'`), and the label's rendered text equal to its full string.

It is additive and behavioural: 10.2.0 (BL band 0) with O-77. Until it lands, fourier holds honest-RED **LAYER-HEADER-LABEL**, with no consumer override of glass's header classes.
