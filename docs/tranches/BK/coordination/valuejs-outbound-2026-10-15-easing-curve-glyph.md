SERVED MODEL: claude-opus-5-5

# value.js (for keyframes.js) → glass-ui (BK; BL) · O-96 · 2026-10-15 · EASING-CURVE-GLYPH: `EasingCurve` is a framed plot with no glyph form

**Mirror for glass to land:** `docs/tranches/BK/coordination/valuejs-outbound-2026-10-15-easing-curve-glyph.md` (value.js writes no byte in the glass tree).

**From:** KF.W13X `.r4pane` (AUDIT-2 A2-KE-L1-6, the trigger-glyph limb: "RELAY (ADOPT-AT-LANDING); no consumer swap"; its residual "`.rel` files the EasingCurve glyph-form ask"); the RESUME 1 Close R-4; COHESION §0fa item 8. Beside O-74 E-3 (EasingCurve marker API + preset strip) and O-94. Filed by KF.W13X `.rel2`.

## The site
`@mkbabb/glass-ui@10.1.0`, installed in keyframes:
- `dist/easing.js:74-78`: the root is `block aspect-square w-full select-none`, with `role: "img"` and its own `aria-label`.
- `:80` onward draws a frame `rect`, a dashed diagonal, 3+3 grid lines, two end dots, and absolute `0` and `1` axis labels.
- `dist/components/easing/EasingCurve.vue.d.ts`: the props are `strokes`, `progress`, `travel`, `clipped`, `drawn`, `label` and `class`. None of them turns the frame, grid, diagonal, end dots or axis labels off, and none drops the `img` role.

Seated at 1.5em inside a labelled trigger, it puts a gridded, axis-labelled `role="img"` inside a button that already names the curve. `.r4pane` banked this as a design defect, not a size problem. Hiding the producer's parts from the consumer would be a copied producer selector, which is a HIGH defect.

**Consumer site (keyframes `c761d639`):**
- `demo/components/instrument/pane/channel-controls/EasingField.vue:45-56`: a hand-drawn `<svg class="curve-glyph" viewBox="0 0 1 1" preserveAspectRatio="none" overflow="visible" aria-hidden="true">` with one `<path vector-effect="non-scaling-stroke">`, styled at `:146` `.curve-glyph`. This is the one trigger glyph site (served `glyphSvg 1 · easingCurve 0` on cube and square, `.r4pane`).

## Ask (10.2.0)
**A glyph form of `EasingCurve`**, as a prop (for example `variant="glyph"`) or a sibling export (for example `EasingGlyph`), with these properties:
1. The ink stroke only. No frame, grid, diagonal, end dots or axis labels.
2. It sizes to the font box (`1em`-class), not `aspect-square w-full`.
3. It is `aria-hidden` when it carries no `label`, and `role="img"` with that name only when it does.
4. It takes the same `strokes` contract (a path `d`, `tone`), so one plot primitive draws both the plot and the glyph. Where `progress` is given, the dot stays on the curve, per the KF.W13W law.

With it, a trigger or a tile can show a curve through the one plot primitive.

## Consumer posture
No consumer copy of the producer's plot, and no CSS that hides its parts. Until the glyph form lands, `EasingField.vue`'s trigger glyph stays the one consumer site (no second copy), honest-RED on A2-KE-L1-6's trigger-glyph limb. It is ADOPT-AT-LANDING: at that repin `EasingField.vue` swaps the hand-drawn svg and its `.curve-glyph` rule for the glass glyph form.
