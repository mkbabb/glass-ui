# BI.W-VALUE-MARKS — continuous rail checkpoints and the final Rim repair

**Status:** IMPLEMENT NOW in the active BI/P product batch. This wave supersedes no
public control and creates no new public component. Verification is direct unit/type/build
work plus native-browser inspection after the batch; no proof script, receipt framework, or
Playwright lane is part of the work.

## Product decision

Add one optional `marks?: readonly number[]` prop to `Progress` and `Slider`. A mark is a
quiet, circular delineator in the control's existing numeric domain. It is paint only: it does
not snap, quantize, label, focus, emit, or change the model. The fill continues smoothly over
the stationary marks, covering them as it advances. This preserves the screenshot's useful
read—future checkpoints remain visible in the recessed rail—without inventing a segmented
control or reviving `BorderProgress`.

Do not add mark objects, labels, events, a `markCount` shorthand, a public `Mark` component, a
composable, an observer, or a second animation owner. Do not overload either existing
`ScrollProgressRim.segments` (per-arc fill) or the retiring phase-bus `ProgressSegment` shape.

## One domain owner

Create one private pure helper, `src/components/_shared/valueDomain.ts`, with only:

```ts
resolveValueFraction(value: number | null | undefined, min: number, max: number): number
resolveValueMarks(marks: readonly number[] | undefined, min: number, max: number): ResolvedValueMark[]
```

`ResolvedValueMark` contains the original finite `value` and its `position` in `[0, 1]`.
Rules are exact and shared by both components:

1. An invalid domain (non-finite endpoints or `max <= min`) resolves to fraction `0` and no
   marks. A non-finite/missing value resolves from `min`; a finite value is clamped before its
   fraction is calculated.
2. Marks retain finite values **strictly inside** `(min, max)`, sort numerically, and collapse
   exact duplicates. Out-of-range values and endpoints are omitted, never clamped. The rail
   edges already delineate `min`/`max`; endpoint dots would be redundant and radius-clipped.
3. Position is exactly `(mark - min) / (max - min)`. No epsilon, pixel rounding, or `step`
   coercion enters the math.
4. Dense or nearly coincident marks may visually coalesce into a stronger delineator. There is
   no cap, measurement pass, hidden-index algorithm, or label collision problem. Exact
   duplicates alone are removed.

The templates render their own small `v-for` spans from this result. This deliberate three-line
local markup is cheaper than a private renderer component and keeps each track's stacking
context truthful. The shared helper is the sole math owner.

## Progress: repair value truth before adding marks

`ProgressRoot` supports arbitrary `max`, but all three continuous variants presently paint
`100 - modelValue` and Gradient compares the literals `5`, `85`, and `100`. Thus `.5 / 1`
paints as `.5%` while a mark at `.5` would resolve to `50%`. Fix this existing public defect in
the same slice:

- Progress remains a `[0, max]` control; do not invent `min` or `step` props.
- Forward `max` from `Progress` to its selected child. Default, Gradient, and Liquid all derive
  their clamped percentage from `resolveValueFraction(modelValue, 0, max ?? 100)`.
- Gradient lifecycle thresholds become fractions (`0`, `.05`, `.85`, `1`), and crescendo is
  derived from the same fraction. ARIA value/max/text remain Reka's one semantic owner.
- Emit one fill-percentage custom property and let CSS grow from logical inline-start. Inherited
  `:dir(rtl)` reverses the transform; do not add a duplicate `dir` prop.
- Render marks only for determinate Default, Gradient, and Liquid. The mark layer sits above the
  neutral track and below the indicator, so the indicator continuously overpaints it. At an
  exact checkpoint the moving edge crosses the dot continuously—no snap, jump, transparent
  seam, or second state machine.
- A non-empty `marks` array with Gradient `indeterminate` fails explicitly through the existing
  Progress contract signal; unknown progress has no truthful numeric checkpoints.

### Retire the phase-bus branch

Delete `ProgressSectioned.vue`, `useProgressGeometry.ts`, the `sectioned` variant arm, and the
public `useProgressGeometry`, `ProgressSegment`, and `SectionedCell` exports. Remove
`segments`, `currentSegmentKey`, and `activeProgress` from `Progress`. Delete the sectioned
story and tests. This branch has zero live external source consumers, carries speedtest-specific
phase vocabulary, adds a parallel value/refusal state machine, and animates layout width. It is
not the checkpoint facility.

Migration is explicit: a consumer wanting reference checkpoints uses numeric `marks` on a
continuous Progress; a consumer wanting colored lifecycle phases owns that product composition
locally. No alias or compatibility arm survives the 6.0 cut.

## Slider: preserve the one Reka control

- Add `marks?: readonly number[]`; remove it from the props forwarded to Reka and resolve it in
  the existing `min ?? 0` / `max ?? 100` domain. `step` remains Reka's quantizer. Marks may be
  off-step because they are advisory; the library never silently moves them or the value.
- Insert the mark layer inside `SliderTrack` before `SliderRange`. For one thumb the range covers
  `[min, value]`; for multiple thumbs it covers Reka's existing lowest-to-highest interval. No
  invented “passed” scalar is assigned to a range.
- Keep marks and their container `aria-hidden="true"` and `pointer-events: none`; they have no
  role, title, event, hit target, or focus stop. Thumb count, names, keyboard behavior, touch
  arbitration, dock hold, form value, update events, and `valueCommit` remain unchanged.
- Mirror Reka's physical origin using logical CSS. Horizontal positions use inline-start, or
  inline-end when inverted; RTL follows automatically. Vertical positions use block-end, or
  block-start when inverted. Expose only a local `data-inverted` attribute because Reka already
  exposes `data-orientation`.
- The wrapper currently forwards `orientation` while its own track/range/spectrum CSS is
  horizontal-only. Add the minimal vertical transpose now: a vertical root/track has a bounded
  block axis and track-width cross axis; the range fills blockwise; the spectrum thumb becomes
  a horizontal bar. Do not narrow a public Reka prop to conceal this defect.

## Paint and motion

The default mark is a quiet 6px circle, proportionate to the thick glass rail and subordinate to
the value edge. Both components use the same two retune seams:

```css
--value-mark-size: 0.375rem;
--value-mark-color: color-mix(in srgb, var(--foreground) 34%, transparent);
```

Component-local CSS owns geometry and stacking. The fill remains above the marks; focus remains
above all decorative paint. Marks are static, so they require no transition, keyframe, spring,
timer, registered property, or PRM branch. Existing value motion remains the only motion owner;
under reduced motion, only the current still value and marks paint.

## ScrollProgressRim: one repair, then freeze

Retain the focused public `ScrollProgressRim`—Atlas has one real mount—but stop generalizing it.
The current flush transparent-border mask and three-layer physical edge masks can lose corner
pixels, expose the host border through the unfilled tail, and treat inline-end as physical right.
Its prior test asserted CSS strings, not painted continuity.

Repair only this geometry:

- Give the Rim an explicit isolated local stacking context and keep its band wholly inside the
  host boundary with one inward safe inset; reduce the inherited radius by the same inset.
- Paint one quiet neutral base track beneath the colored fill, through the same radius-following
  band cutout. The unfilled perimeter is therefore intentional track, not an apparent missing
  border.
- Replace the brittle three-layer edge mask with the base two-layer border-band cutout plus a
  logical coverage clip. `inline-end-edge` must flip under `:dir(rtl)`; `bottom-edge` remains
  block-end. No SVG, canvas, ResizeObserver, milestone engine, or `BorderProgress` code returns.
- Keep the existing `value`/`max`, `segments`, `coverage`, and `stops` API unchanged. After this
  continuity repair, freeze the surface for the 6.0 release.

## InstrumentChassis disposition

**RETAIN in this wave. It is not currently speedtest-only.** The live census finds seven
`InstrumentChassis` mounts and three `ChassisDivider` mounts across two product families:
speedtest (App, ChartsView, MapView) and Muster (App spine, WinnerHero, InstrumentAside), plus
phase/variant type consumers. Glass demo mounts do not count, but Muster's production imports do.

Any later retirement must be its own atomic two-consumer migration: prove current runtime/import
use excluding docs/tests/demos, recompose both products with ordinary semantic sections plus the
shared Card/material primitives and owner-local phase/layout, publish those consumers, then
delete the whole subpath/family in one major boundary. If either product still imports the
component, divider, phase, or variant type, deletion is forbidden. No copied chassis, alias,
shim, or “speedtest-local” claim satisfies that procedure.

## Exact implementation surface

Create:

- `src/components/_shared/valueDomain.ts`
- `tests/components/_shared/valueDomain.test.ts`

Modify:

- `src/components/progress/{Progress,ProgressDefault,ProgressGradient,ProgressLiquid}.vue`
- `src/components/progress/index.ts`
- `src/components/slider/Slider.vue`
- `src/components/scroll-progress-rim/{ScrollProgressRim.vue,styles.css}` only if the neutral
  stacking layer needs one extra element; prefer CSS pseudos and preserve the public DOM
- `demo/stories/feedback/progress.vue`
- `demo/stories/forms/slider.vue`
- `demo/shell/SidebarDock.vue` only for native verification or a logical-direction specimen;
  no API change
- the focused Progress, Slider, and ScrollProgressRim unit tests
- `MIGRATION.md` and `CHANGELOG.md` for the `sectioned` removal and additive `marks` API

Delete:

- `src/components/progress/ProgressSectioned.vue`
- `src/components/progress/useProgressGeometry.ts`
- their sectioned-only tests/story content and stale public declarations

Do not edit InstrumentChassis, revive BorderProgress, or add gate/meta files.

## Acceptance

1. **Shared domain:** units cover `.5/1`, `125/250`, non-zero/negative minima,
   fractional values, unsorted input, exact duplicates, `NaN`, infinities, out-of-range values,
   omitted endpoints, and invalid domains.
2. **Progress alignment:** `.5/1` and `125/250` paint exactly `50%`; a midpoint mark shares that
   position. `0`, exact interior mark, and `max` have no jump or transparent seam. All three
   continuous variants agree. At `dir=rtl`, a 25% fill and mark grow from the right. Marks are
   absent when omitted and refused with indeterminate progress.
3. **Clean break:** no `sectioned`, `ProgressSectioned`, `useProgressGeometry`, `ProgressSegment`,
   `SectionedCell`, `segments`, `currentSegmentKey`, or `activeProgress` remains in the built
   Progress API, declarations, demo, or tests.
4. **Slider behavior:** single and range sliders retain the exact Reka values/events/step behavior
   with and without marks. LTR, RTL, inverted horizontal, vertical, and inverted vertical marks
   align with the corresponding range. Vertical computed track/range/thumb dimensions are
   transposed, not merely attributed. Pointer/touch drags pass through the decorative layer.
5. **Density and accessibility:** dense/near marks render stably without layout shift; duplicates
   collapse. The accessibility tree and focus order are identical to the no-marks case. Marks
   are non-interactive and cannot intercept a pointer.
6. **Rim continuity:** native-browser pixels show an intentional neutral band plus uninterrupted
   colored fill at `0`, `50`, and `100` on the real dock host and a collapsed-disc specimen.
   Check all four cardinal arcs/corners on full-ring, the visible endpoints of both edge
   coverages, LTR/RTL inline-end, narrow/tall resize, and widths `1px`, `4px`, and one deliberately
   large stress width. No colored or neutral band is clipped by the host border.
7. **Product demos:** Progress shows regular marks and arbitrary-`max` alignment; Slider shows
   irregular single, range, RTL/inverted, and vertical marks without adding prose-heavy cards or
   debug readouts. Visual hierarchy remains one rail, one fill, quiet checkpoints.
8. **Release:** typecheck, focused units, library build, demo build, and built declaration/export
   probes pass as one major batch. Native in-app-browser inspection—not Playwright—confirms the
   interactive and pixel cases before the 6.0 artifact is cut.
