# Breadth critic 1 — motion, material, raster and performance — C36

**Date:** 2026-07-22  
**Seat:** independent failure-assuming Sol x-high motion/material critic  
**Phase:** formation only  
**Product, test, package, lock, repin and acceptance credit:** none

## Verdict

**DEFECT / FORMATION RED / EXISTING OWNERS SUFFICIENT / BROWSER ASSAY B IS
DISCOVERY, NOT MOTION OR MATERIAL ACCEPTANCE.**

The packet is a useful detector. It proves that the desktop pill Tabs rest state is
coherent, that Slider keyboard value mutation is not inert, and that Alert is
materially sharper than Card. It does not prove the claimed iOS-27 motion or
transmissive material contracts. The source and retained frames expose five
load-bearing failures:

1. Tabs' purported one timeline is three authorities: a CSS geometry transition, a
   timeout-driven squish/blob envelope, and a separate 220 ms WAAPI press. The
   underline is a second anchor-pseudo geometry writer and cannot drag at all.
2. The desktop `+80 ms` Tabs frame corrupts glyphs outside the active indicator,
   while `click-0` already shows the destination selected. These frames do not prove
   continuous, localized onset-to-settle motion.
3. Slider's standard semantic thumb is intentionally `width: 0; opacity: 0`; comments
   claim a `.touch-hit-area` halo that the template never composes. The packet's
   eight-point miss is therefore source-explained, not an uncertain aesthetic read.
4. Slider's 88%-strength warm fill paints as a bright opaque-looking bar over the
   demo's nearly uniform substrate. Neither frost nor underlay transmission is
   falsifiable in this corpus.
5. Alert uses the generic 10 px `rounded-lg` rung while Card uses the 16 px
   `rounded-card` role. This contradicts the explicit owner ruling and the radius
   canon's own content-container role.

No new engine, public prop or tranche row is justified. Route the exact deltas into
the existing Tabs/iOS motion, Slider/A11Y/material, W1 radius, W-COLO-3 and package
consumer owners.

## Frozen inputs and candidate identity

Normative packets, read unchanged:

- `BREADTH-COHORT-TABS-SLIDER-ALERT-C35.md`, SHA-256
  `1c9985788b2a79767db7ac491f191c4f794d58a8ca644c15e620869080b339b6`;
- `TWELVE-HOUR-CONVERGENCE-BURNDOWN-C34.md`, SHA-256
  `67efc3f11d87164664e6d1d4ec89a75bea84fb05493e388eb9976f0f990f8553`.

Current committed source cursor:

- Glass commit `0371836dfeeb3b7982250d612f93b5347a1d29d4`;
- tree `97b386172a899ef43b686ffbe43263395b3a7744`.

The inspected component/demo sources are clean relative to that commit. The current
`tests/components/slider.contract.test.ts` is separately dirty at SHA-256
`a08fe7dbcde06b293a025379f536b1afc89ccf4549debfd5e9c880d5f54ad436`;
it is identified but earns no frozen-test credit.

### Exact source identities

| Owner | SHA-256 |
|---|---|
| `src/components/tabs/SegmentedTabs.vue` | `28bc80dbfea63f9857ed90f38c8ec29270acd6717b552a2862645b6e69368578` |
| `src/components/tabs/composables/useTabDragMorph.ts` | `7503e821180a8d9feffdd7d56347c50208f91f06ce153ee8fe9cca1ad4d9c7bc` |
| `src/components/tabs/styles/segmented.css` | `93e2e15916a9d5ff7b77c03aff2a7719dd8cbfbc03897d15dc62c2d9794f4f7a` |
| `src/components/tabs/styles/drag.css` | `52bb917d9cef9d20a0acf376546f344b825ab2339b74eff2aed93fcc021b1b77` |
| `src/composables/motion/morph/useSelectionIndicator.ts` | `205de9d54cc178f86ef5e4190ceb10f242da6ae26eb5da59c651f388ed5a3b69` |
| `src/composables/motion/morph/useDragMorph.ts` | `211da5d1d0870340a3b624cf89de1583f5881e950d05197d050bb22c6bc8c48f` |
| `src/components/slider/Slider.vue` | `fec904b6134d13fd7487ecb0cec6f510819cf7ee30d4aa09f923732771d21a51` |
| `src/composables/dom/useDragVelocity.ts` | `13d0231ad834161e309fe99f76188295e4a114987514622ef38ab4ed9e8ad221` |
| `src/composables/dom/useTouchGate.ts` | `fcc8cd2a4afd7709e1d1c96e9047449092e0bc8a3d965f4b00f9877978e6d975` |
| `src/styles/glass/track-well.css` | `e7f6e835cc4aefbc9ecf8f6d1a09baf9a73852393bc66522e7842d4ef5e2596d` |
| `src/styles/glass/liquid-fill.css` | `9b7a9a8a64ed7a189ede6b7bb86bba56b166bc146e71826fb13238f337c9ff02` |
| `src/components/alert/Alert.vue` | `883b5829a1d864671c53ce5827b53fa8e2c4a7a076705512039088f3739931c1` |
| `src/components/alert/index.ts` | `18c353b73e5b29d7cd3067ad42a0ce0b608e3a1e5d96efb91b2f67a65bf97979` |
| `src/components/card/Card.vue` | `4855b4ef43db7ea4cdb302a788de351687970c3ac5de18dcb919bf724caff2f3` |
| `src/components/card/styles.css` | `ffd3280f901f39ad4487bbdfb6f8218aed204ca697229cd2d2e2ef638940e617` |
| `src/styles/theme/radius.css` | `3131c7daed2e1ac7aeffdaa6aeb7e0fa642bc1da7d92423fe009ef5c3651336e` |

The demo sources inspected were Tabs `c199ee7f...`, Slider `0d4affcd...`, Alert
`04f8b948...`, and Card `310606e1...`. The live evidence does not carry a frozen
served-artifact digest equal to these sources, so no source-to-browser identity or
package claim follows.

## Tabs challenge

### T1 — the “one clock” claim is false in the current implementation

`SegmentedTabs.vue:244-276` starts a 220 ms WAAPI `transform` animation on the
selected button and cancels every animation already attached to that button.
`segmented.css:140-148` separately transitions indicator `translate`, `width`,
`height`, `scale`, and `opacity`. `useSelectionIndicator.ts:176-292` owns a third
timeline: it sets `--stretch` and `--tab-blob` synchronously, then releases both
with a `setTimeout(clock * 0.82)`.

This is not one momentum-bearing trajectory. It is a fixed-distance CSS glide, a
distance-derived but timer-released envelope, and a button press with another
duration and easing. A reversal can cancel the button WAAPI and replace the timer,
but there is no shared sampled position/velocity generation across those three
channels. Calling their nominal durations “one calibrated clock” does not make the
motion C1-continuous or interruption-safe.

Animating `width` and `height` also invalidates the source's compositor-only
aspiration when option sizes differ. The moving `.glass-lens` carries backdrop
filter and layered shadows, so a native-DPR3 path can combine layout/paint work with
backdrop rerasterization. No trace, paint-invalidation boundary, frame-time ledger,
or native Safari raster witness is retained.

### T2 — the retained frames falsify localization and do not prove onset

The desktop sequence is exact:

- rest `b81c51c8...`;
- `click-0` `50bb7b3c...`;
- `+80 ms` `1afc7b15...`;
- `+400 ms` `0a4716a6...`.

At `click-0`, Kanban already owns selection and the focus ring; the corpus has no
pre-commit first animation frame. At `+80 ms`, not only the selected pill but
unrelated labels in both Tabs specimens and the global navigation lose or smear
glyph fragments (`Low`, `Normal`, `Timeline`, and dock labels). The `+400 ms` frame
is crisp again. The same mobile four-frame family (`98aaebf9...`, `bbf05ff5...`,
`d7630ba6...`, `c2f7cf49...`) is too spatially compressed to distinguish indicator
deformation, target ownership, or label stability.

This does not prove that SegmentedTabs alone causes the glyph corruption; it proves
that the current Browser candidate cannot credit localized clean motion until the
Tabs indicator is isolated from shell/Dock compositing and the corruption is either
reproduced or ruled out under the same bytes.

### T3 — “one engine, two materials” is ontologically overstated

The pill uses the JS `ResizeObserver`/DOMRect writer. The underline uses an
anchor-positioned `::before`; non-supporting engines receive a static selected
border. `useTabDragMorph.ts:69-104` explicitly disables drag for underline. These
are three geometry behaviors, not one engine with two paints. The distinction can
be legitimate, but the public story and acceptance law must say so honestly or the
existing R-TABS owner must reconcile them.

The pill's natural center origin is a preserved GREEN invariant: its selected box
uses `transform-origin: center`, and rest geometry measures the selected button.
The current responsive result is still RED because `.segmented-tabs` is an
intrinsic `inline-grid`, buttons are `white-space: nowrap`, and mobile shrinks type
and padding instead of proving a reachable, legible constrained-width policy.

### T4 — the existing tests cannot close these mechanisms

`tests-visual/tabs-std.spec.ts` uses programmatic `.click()`, samples only the first
time the indicator enters a target tolerance, and never proves that it stays there
or that unrelated pixels remain stable. Its underline-center arm constructs a
synthetic rectangle from the active tab's own center, making that comparison
tautological rather than measuring the pseudo. Unit geometry uses mocked DOMRects;
the responsive test mocks `matchMedia`. None covers trusted pointer drag, capture,
cancel, reversal, interruption, constrained width, active-content reflow, PRM
terminal parity, DPR3 blur, or actual Safari.

## Slider challenge

### S1 — the 44 px hit-floor prose has no implementation

The template emits `class="slider-thumb glass-specular-track"`. It never composes
`touch-hit-area`. Yet `Slider.vue:342-379` says the zero-width thumb has a 44 px
`.touch-hit-area::before` halo. Repository search finds the name in those comments
and the shared utility, not on the emitted Slider thumb.

The CSS then explicitly makes the semantic thumb `width: 0; opacity: 0`. This
explains the live `0×20` semantic box and why all eight points around the proposed
44 px envelope resolve outside its lineage. The keyboard `42→43` GREEN result is
valuable: it isolates geometry and pointer ownership from value semantics.

The source also deliberately swallows the first touch while `useTouchGate` decides
scroll versus drag (`Slider.vue:109-133`). A direct-manipulation slider cannot earn
Breath-of-Life or first-action credit until a real coarse sequence proves that the
first intentional pull changes value while a vertical scroll gesture remains page
scroll. A second-tap activation ritual is not an acceptable substitute.

### S2 — material reads as flat luminous fill, not falsifiable frost

`liquid-fill.css:46-51` mixes the phase tint at 88% against a zero-alpha warm leg.
The desktop and mobile rest frames (`28b39175...` and `9cbda075...`) show bright
cream/salmon cylinders over a nearly uniform dark-brown field. The result may
technically execute backdrop blur, but no meaningful underlay crosses the fill, so
the corpus cannot distinguish transmissive frosted glass from an opaque color bar.

The component's shared well/fill extraction and logical value origins are GREEN:
the material is colocated once; LTR/RTL/inverted origins are explicit; vertical
uses the corresponding block edge. The material-strength decision remains RED.
It needs a patterned/high-chroma underlay and an opaque/no-blur mutation, not another
token prose assertion.

### S3 — motion and listener cost are under-specified

`useDragVelocity` correctly opens its rAF only during a pointer drag and pins its
velocity at zero under PRM. Preserve that. However, every Slider instance installs
window `pointerup` and `pointercancel` listeners at setup, including instances whose
`motion` resolves reduced/off and whose host never binds. It also attaches three
native touch listeners to every mounted Slider. The many-Slider story therefore
needs an exact listener/idle-frame census; “no idle rAF” alone is not a complete
performance contract.

The current visual focus image `3f7a8354...` is not visibly distinguishable enough
from rest to certify the focus ribbon at true-mobile scale. The house ring rule may
exist, but paint ownership and contrast remain unproved.

The clean visual test is stale against the current source:
`tests-visual/slider-spectrum-fallback.spec.ts` expects the first standard thumb to
be square with a circular radius, while the component intentionally makes that
thumb zero-width and invisible. A test whose asserted ontology contradicts its
component cannot serve as a pixel floor.

Finally, the Slider demo's “viz-fourier fill” reaches into
`.slider-track` and `.slider-range` through descendant utilities even though the
component exposes the public `--glass-slider-track-background` seam. That is a
private-receiver demonstration, not idiomatic public consumption, and it masks the
very producer material contract this assay is meant to judge.

## Alert and Card challenge

### A1 — exact radius mismatch

`alert/index.ts:7-18` uses `rounded-lg`; the radius canon resolves
`--radius-lg` to the 10 px base rung. Card emits `rounded-card`; the canon resolves
`--radius-card` to 16 px. The live 10/16 computation and desktop/mobile frames agree.
The Alert is visibly sharper, not merely token-different.

The owner asked for Alerts to be card-equivalent or slightly more rounded. Route the
decision through the existing W1 semantic-radius owner. Do not invent an
Alert-specific raw pixel or copy Card internals. The born-RED proof is relational:
default and tone Alerts must compute at least the adjudicated Card-family corner
while preserving density, icon grid, wrap, focus/forced-color edge and both browser
families.

### A2 — static feedback is a preserved GREEN, not missing animation

Persistent Alert and Card surfaces are appropriately still at rest. Breath of Life
does not require decorative perpetual motion. The retained frames show readable
tone hierarchy, coherent Card proportions, and stable warm surfaces. Preserve those
invariants. If a later overlay/toast composition animates an Alert, that composition
must own the semantic origin and lifecycle; Alert itself should not acquire an idle
clock to satisfy an animation quota.

### A3 — Alert carries a live colocation/package cycle

`Alert.vue:4` imports `alertVariants` from its own barrel while `alert/index.ts:3`
re-exports `Alert.vue`. This is the already-known Alert self-cycle. It is not a new
visual row, but it belongs in existing W-COLO-3 and undermines clean package
topology/performance until the defining variant function lives in a leaf.

No retained Alert/Card frame covers light theme, forced colors, reduced
transparency, browser fallback, dynamic insertion, long unbroken content, 200% zoom,
or radius alias mutation. Their current pixels are discovery only.

## Born-RED mutation and proof matrix

| Existing owner | Mutation that must turn RED | Required positive proof |
|---|---|---|
| R-TABS / iOS FINAL W5 | diverge press, glide and blob clocks; reintroduce timer-only early release; change target during travel | trusted first action, 60/120 Hz onset-to-settle samples, C0/C1 reversal/cancel, no unrelated glyph/raster movement, stable final geometry |
| R-TABS responsive / G5 | add active-only intrinsic adornment; narrow host below min-content; change label width | 390 coarse and desktop constrained-width reach, stable surrounding geometry, active-indicator congruence, focus reveal, no clipping/miniaturization |
| R-TABS drag | disable capture/cancel; resize or RTL-flip during gesture; force underline fallback | real pointer/touch follow, cancel, reversal, resize, RTL, vertical, PRM and agreed material parity without a second state owner |
| Tabs material | force capsule opaque or set backdrop blur to none | meaningful patterned/aurora underlay, light/dark, DPR1/3, Chromium and actual Safari pixels that distinguish tint, blur, rim and text contrast |
| Slider A11Y | restore zero-width thumb without an owned hit floor; remove focus ribbon | center + four corners + four midpoints owned by the real action at coarse 44×44, trusted first pull, visible keyboard focus, neighbor isolation |
| Slider motion | force first intentional pull to be swallowed; strand `--atom-drag-v`; preserve listeners for motion-off | first-action drag versus scroll arbitration, release/cancel/reentry, idle-rAF=0, listener census, PRM terminal parity |
| Slider material | force opaque fill, remove blur, or make tint-strength invariant across underlays | patterned/high-chroma and calm underlays, light/dark, native-DPR and Safari/Chromium delta proving frost rather than flat brightness |
| W1 radius | restore `rounded-lg` on Alert or make Alert sharper than Card | relational computed-radius and raster proof for every tone at desktop/mobile/zoom/fallback |
| W-COLO-3 | restore `Alert.vue -> ./ -> Alert.vue` self-barrel import | value-edge Tarjan and package build prove the cycle absent with variants defined in a leaf |

## Missing evidence

The cohort still lacks:

- a frozen source-to-served-to-installed identity;
- light-theme and meaningful-underlay material cells;
- true pointer drag, cancel, interruption and reversal for Tabs and Slider;
- PRM, reduced-transparency, forced-colors and high-contrast terminal frames;
- native-DPR frame-time, long-task, paint-invalidation and memory/listener traces;
- Firefox parity and actual Safari/VoiceOver evidence;
- a real responsive Select specimen and constrained-width long-label/active-adornment
  witness;
- Slider eight-point event-path ownership and first-touch scroll arbitration;
- Alert/Card zoom, long-content, tone and fallback radius comparisons;
- unchanged-byte independent challenges 2 and 3 and separate adjudication.

## Binding disposition

Bank only the following GREEN facts:

- the desktop pill rest composition is visually coherent;
- pill indicator rest geometry has a natural center origin;
- Tabs' semantic click/keyboard model and Slider keyboard step are functional;
- Slider's shared well/fill extraction, logical origins and drag-window-gated rAF are
  directionally sound;
- Alert tone hierarchy and Card proportional anatomy remain readable;
- the 10 px Alert versus 16 px Card mismatch and Slider 0×20 geometry are honest
  live detectors.

Keep motion, material, raster/performance, responsive, coarse ownership, radius,
package and acceptance **RED**. The next critics should challenge the same unchanged
packet independently; adjudication should select the smallest existing-owner
contracts that satisfy the evidence rather than minting new APIs from this report.
