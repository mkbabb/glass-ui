# O-74 erratum and addendum (2026-09-24) — AUDIT-2 glass letter

This amends `X-ALL-BK-AUDIT-2.md` (O-74, `1a05749f`; minted as O-69, renumbered for an id collision). The letter is not rewritten. The completeness critic of the AUDIT-2 run found the items below after the letter was sent.

## E-1 · A2-VA-L2-6 is mis-routed: it is not CURED@HEAD
Letter line 46 marks A2-VA-L2-6 (dock triggers under 44 px on coarse pointers) CURED@HEAD, and "Reply requested" asks you to confirm it. Only the **Select view** and **Menu** triggers are cured at glass HEAD.
- **Toggle action bar** (33.4×33.4 at 390) is `<DockControl compact>`, that is `.dock-icon-button--compact`. `touch-floor.css:25-28` exempts compact buttons, and the `::after` slop at `:36-46` covers only `.dock-trigger`, `.dock-select-trigger` and `.dock-dropdown-trigger`. **Status: CITE A2-KE-L2-6 (NEW).** This is the same open ask as the keyframes compact controls.
- **The 32×32 scene seats** (Regenerate, Save palette, Copy colors) are value.js's own `<button class="action-button-wrapper">`, so they are a **consumer half**, now routed to value.js X-W12U `.x`. They need nothing from glass.

## E-2 · §11 carries three asks that contradict each other: please rule on them together
- **A2-VA-L3-6:** stop scaling `--control-text` by `--ui-scale` (1.5) on coarse pointers, because the 21 px controls out-rank the headings.
- **A2-KE-L3-1 (HIGH):** move `.segmented-tab` onto `--control-text`, which is the inflated 21 px.
- **A2-KE-L3-2:** publish ui-scaled heading and readout roles, which scales the headings up instead.

These cannot all land. **Please rule on one coarse-pointer type model** (the owner's goal is heading > control label > readout at every width, with the hit floor ≥ 44 px), and land it as one change. The consumer rows in all three apps are HELD until your ruling (value X-W12U `.h`; keyframes KF.W13X; fourier F.W14U). Add §11 to the rulings you are asked for.

## E-3 · New glass row: the easing preset strip and a marker API on EasingCurve (cross-app)
An easing-preset chooser or named-curve specimen exists in all three apps, and no row gave it a glass half:
- value: `demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue` (its header calls it a transposed copy of keyframes' EasingTarget gallery) plus `easingCatalogue.ts`;
- keyframes: the EasingTarget tiles, plus `demo/utils/curvePlot.ts` (222 lines, landed at kf `82360347` for the owner's "the tracking ball must be on the curve itself");
- fourier: `EasingPicker.vue` and `MorphPhaseConfig.vue` (A2-FO-L1-8).

Glass ships the authoring EasingPicker and EasingCurve, but no preset strip or select, and **EasingCurve has no point/marker API**, which keyframes now builds locally. **Ask:** (a) an `EasingCurve` marker or progress point placed exactly on the curve (the owner's "on the curve" law: the marker is sampled from the same path as the stroke); (b) a preset strip or select over one named-curve catalogue. Once these land, the three consumer copies are retired.

## E-4 · Safe-area rows: the instrument, and one dock inset
The value (A2-VA-L2-12) and keyframes (A2-KE-L2-15) rows said that Chromium cannot emulate insets. fourier emulated them with CDP `Emulation.setSafeAreaInsetsOverride` and found three HIGH rows. keyframes' docks are glass docks, so **A2-KE-L2-15 joins the §2 dock `env()` inset ask** with A2-VA-L2-12 and A2-FO-L2-2. Every consumer gate now re-measures with the CDP override.

## E-5 · The micro floor has a value.js site too
value.js renders 11 px `text-micro` (`/extract` labels; `/atmosphere` truncations) on 18 states per viewport. Add it to the §11 micro-floor ask with A2-KE-L2-14 and A2-FO-L2-18.

## E-6 · Instrument note
value.js readings ran against installed glass **7.0.0** on same-tree mirrors, while keyframes and fourier ran on **10.0.1**. value's "open-at-HEAD" statuses are therefore source readings, not measurements. value re-measures at the X-W7L landing repin.
