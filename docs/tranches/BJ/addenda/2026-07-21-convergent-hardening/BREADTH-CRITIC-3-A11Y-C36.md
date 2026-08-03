# Breadth critic 3 — interaction, accessibility, and consumer idiomaticity — C36

**Date:** 2026-07-22
**Seat:** independent failure-assuming Sol x-high critic 3
**Phase:** formation only
**Product, test, package, lock, repin, browser-acceptance, and release credit:** none

## Verdict

**DEFECT / INTERACTION RED / A11Y RED / CONSUMER-IDIOM RED /
PACKAGE+AT+ACCEPTANCE RED.**

The frozen C35 observations survive source reconciliation, but the packet is not
yet strong enough to close any component family. It correctly distinguishes the
Slider's functional keyboard path from its failed coarse geometry. The deeper
source read shows that this is not merely a zero-width visual thumb: the existing
touch-floor prose and utility treat a `pointer-events:none` pseudo-element's box
as if it were an action region. C35's eight-point `elementFromPoint` result is the
direct falsifier. A geometrical readback is not a pointer target.

Tabs preserves substantial WAI-ARIA roving-focus behavior, but the live and unit
evidence leaves the actual pointer/drag owner, responsive focus restoration,
panel linkage, target size, forced-colors focus, AT speech, and `motion="off"`
behavior RED. Alert's announcement policy is a credible semantic substrate, but
its live-region delivery is unproved and its 10px role radius contradicts the
owner's explicit card-equivalent-or-rounder ruling. Card remains a sound static
content primitive; the demo's scroll-owned Card is not yet a named, visibly
focused scroll region.

No new primitive or tranche row is warranted. Existing owners are sufficient,
but two existing acceptance descriptions must be hardened: Slider's W2-F cannot
close on a class/computed-pseudo assertion, and Tabs L2 cannot close on roving DOM
tests without the real hit/focus/resize/AT matrix.

## Frozen input and current source cursor

The unchanged formation inputs read by this seat are:

| Input | SHA-256 |
| --- | --- |
| `BREADTH-COHORT-TABS-SLIDER-ALERT-C35.md` | `1c9985788b2a79767db7ac491f191c4f794d58a8ca644c15e620869080b339b6` |
| `TWELVE-HOUR-CONVERGENCE-BURNDOWN-C34.md` | `67efc3f11d87164664e6d1d4ec89a75bea84fb05493e388eb9976f0f990f8553` |

Current repository identity at inspection was:

- HEAD `0371836dfeeb3b7982250d612f93b5347a1d29d4`;
- tree `97b386172a899ef43b686ffbe43263395b3a7744`;
- the worktree was dirty before this seat began;
- the four component source files below were clean relative to HEAD;
- `tests/components/slider.contract.test.ts` was already dirty only for the
  governed-invariant wrapper, so this seat grants it no frozen-candidate credit.

Exact core source identities:

| Surface | SHA-256 |
| --- | --- |
| `src/components/tabs/SegmentedTabs.vue` | `28bc80dbfea63f9857ed90f38c8ec29270acd6717b552a2862645b6e69368578` |
| `src/components/tabs/composables/useTabRovingFocus.ts` | `6fd821c738a6f0c20653d069c99040ebd66fc3d02f7f6aabaef9a5b815585272` |
| `src/components/tabs/composables/useTabResponsive.ts` | `da86a04f96f95c16d059b202e6e1d821855185578d709e36b99203defee81d23` |
| `src/components/tabs/composables/useTabDragMorph.ts` | `7503e821180a8d9feffdd7d56347c50208f91f06ce153ee8fe9cca1ad4d9c7bc` |
| `src/components/tabs/styles/segmented.css` | `93e2e15916a9d5ff7b77c03aff2a7719dd8cbfbc03897d15dc62c2d9794f4f7a` |
| `src/components/tabs/styles/drag.css` | `52bb917d9cef9d20a0acf376546f344b825ab2339b74eff2aed93fcc021b1b77` |
| `src/composables/motion/morph/useDragMorph.ts` | `211da5d1d0870340a3b624cf89de1583f5881e950d05197d050bb22c6bc8c48f` |
| `src/components/slider/Slider.vue` | `fec904b6134d13fd7487ecb0cec6f510819cf7ee30d4aa09f923732771d21a51` |
| `src/styles/utilities/responsive.css` | `079d1c4886ee90214214ff009f5d27640f8d024011e6e6b264b0127413892009` |
| `src/styles/utilities/a11y-overrides.css` | `50897fb7c5b57938f50f9b12c39416c1377886a9a03ad41e3d62f8ab80671205` |
| `src/components/alert/Alert.vue` | `883b5829a1d864671c53ce5827b53fa8e2c4a7a076705512039088f3739931c1` |
| `src/components/alert/index.ts` | `18c353b73e5b29d7cd3067ad42a0ce0b608e3a1e5d96efb91b2f67a65bf97979` |
| `src/components/card/Card.vue` | `4855b4ef43db7ea4cdb302a788de351687970c3ac5de18dcb919bf724caff2f3` |
| `src/components/card/card-scroll.css` | `c3069f8fb2e61011f54dea72c6aee281dbd7b453c81903a5c2ad7aaad6911ca6` |
| `src/styles/theme/radius.css` | `3131c7daed2e1ac7aeffdaa6aeb7e0fa642bc1da7d92423fe009ef5c3651336e` |

Exact story/test witnesses used for reconciliation:

| Witness | SHA-256 |
| --- | --- |
| `demo/stories/navigation/tabs.vue` | `c199ee7f6348239a1337c6dffcaf6df10ad259b03338e7048baac85d0fa00596` |
| `tests/components/custom/tabs/segmented-tabs.test.ts` | `040c3839acb8921bc8c07e33c8e722c586c16b1ab65189f529d7b304bff34d3f` |
| `demo/stories/forms/slider.vue` | `0d4affcd82a23d732f4aa8d7e5f314a4b9efdb3553f43e21fd6d3e21684dc2f6` |
| `tests/components/slider.contract.test.ts` (dirty) | `a08fe7dbcde06b293a025379f536b1afc89ccf4549debfd5e9c880d5f54ad436` |
| `tests/components/ui/slider/Slider.marks.test.ts` | `c5fe9611e71f4e6432a279dac2e4f6e41ed6fe31a01d109591992c11c2cff7fb` |
| `tests/components/ui/slider/dock-hold-contract.test.ts` | `360d2ce190040409cf1d2e49e791e0a37ff1632dadfae67f2ab5bf8d6cf22946` |
| `demo/stories/feedback/alert.vue` | `04f8b94835b80c810c31df9313408232042e41da6e915741a48fbdf8ba61b226` |
| `tests/components/ui/alert/Alert.test.ts` | `3111482bf89d45237e58b016113aeaacd83e22695fcc71070704642eb4c4ef32` |
| `demo/stories/display/card.vue` | `310606e10839ca4528b67a6c8c51f2089fd0c4dc6bfb7f3b6bd2cc763c44909a` |
| `tests/components/ui/card/Card.test.ts` | `78903a0096babd7b0bcd67957b320de244d4a9b0ee7012c72686c43dedba180c` |

The retained frame hashes inspected by this seat match C35 exactly: Tabs mobile
rest `98aaebf9…`, Slider mobile keyboard focus `3f7a8354…`, Alert mobile rest
`68d0a329…`, and Card mobile rest `1e87a799…`.

## Per-surface adjudication input

### 1. Slider — keyboard mechanism GREEN; action ownership and naming RED

#### What survives

- C35's `aria-valuenow 42→43` ArrowRight result proves a functional semantic
  thumb and Reka keyboard path. It must be preserved.
- `Slider.vue:227-236` keeps the semantic thumbs mounted; invalid,
  `aria-labelledby`, `aria-describedby`, and `aria-errormessage` are forwarded.
- Value marks are decorative and correctly `aria-hidden`.
- Disabled and vertical state reach the semantic thumb in the colocated tests.
- The Dock hold tests prove the native host listener calls the one Dock hold owner;
  this is useful but orthogonal to a target-size claim.

#### RED-1 — the existing 44px story is a false ownership proof

The standard thumb is explicitly `width:0`, opacity zero
(`Slider.vue:342-370`). It does **not** compose the `touch-hit-area` class, despite
comments claiming that it does. The generic utility's coarse pseudo-element is
`pointer-events:none` (`a11y-overrides.css:150-181`). That preserves event
integrity, but it cannot make pixels outside the host's real hit box accept the
host's pointer action. The prose at `a11y-overrides.css:162-179` and the Slider
comments conflate a computed pseudo size with an interactive region.

C35 supplies the decisive browser fact: center, four corners, and four edge
midpoints of the proposed 44×44 envelope do not resolve to the `role=slider`
lineage; some resolve to track/range, others to an inert wrapper or the story.
Therefore:

- a rendered-class assertion on `touch-hit-area` is insufficient;
- a `getComputedStyle(::before).minWidth/minHeight` assertion is insufficient;
- transparent hit slop with `pointer-events:none` is insufficient;
- a wrapper is sufficient only if trusted pointer actions from the whole floor
  reach the correct thumb/value without stealing the other thumb.

Current source also places `data-control-target` on the SliderRoot and defines a
coarse 44px root minimum in `responsive.css`. The live 20px result and current
source therefore disagree. The packet omits the decisive media/cascade receipt:
`matchMedia('(pointer: coarse)')`, computed root min-size, root/track/thumb rects,
served CSS identity, and rule provenance. That missing state must be frozen before
assigning the discrepancy to source, build closure, or emulation.

#### RED-2 — focus modality is still wrong

The standard track ring uses `.glass-slider:focus-within`, not a
thumb-`:focus-visible` predicate (`Slider.vue:391-399`). A pointer press that
focuses the thumb can therefore paint the keyboard ribbon. C35's programmatic
focus plus ArrowRight proves neither natural Tab entry nor pointer-negative focus
behavior. The spectrum arm uses `:focus-visible`, so the two variants are
inconsistent. This is the already accepted `BJ.W-A11Y-LINKAGE` W2-E defect.

#### RED-3 — a multi-thumb label is fanned out as two identical names

`Slider.vue:227-234` copies the one caller `aria-label` onto every thumb. The live
story labels the two-thumb price window simply `Price range`; the tests preserve
the same single-label fan-out. That suppresses Reka's count-aware Minimum/Maximum
fallback and leaves two sibling sliders with indistinguishable accessible names.
The shared group label and the individual boundary names are separate semantics;
the public contract currently exposes only the former.

#### RED-4 — first-touch arbitration and PRM/prop parity are unproved

`Slider.vue:122-161` prevents and stops the initial touchstart while the shared
touch gate is pending; the gate activates only after timeout/touchend. The Dock
hold unit confirms a touchstart reaches the host, but it does not prove that the
same cold first touch changes the value, captures the pointer, distinguishes a
page scroll, and releases cleanly. A browser first-action matrix is required.

OS PRM removes the overshoot through the global zero-duration floor and local
media rule, but `motion="off"`/`"reduced"` only gates the velocity bridge. The
base `:active` squash remains authored independently of `--motion-weight`. Exact
prop-off and OS-PRM terminal parity is missing.

#### RED-5 — the reference story violates the public-consumption law

`demo/stories/forms/slider.vue:66-86` reskins `.slider-track` and `.slider-range`
through descendant selectors. The same story later demonstrates the documented
`--glass-slider-track-background` input, and Slider already preserves the public
`--slider-range-bg` bridge. The internal-selector example is therefore an
unjustified parallel consumption path. It teaches consumers to depend on private
DOM rather than the public producer seam.

### 2. SegmentedTabs — roving semantics GREEN; real interaction and responsive continuity RED

#### What survives

- Toggle semantics use native buttons plus `aria-pressed`; tab semantics use
  `tablist`/`tab` plus `aria-selected`.
- The one roving machine supports automatic/manual activation, orientation,
  Home/End, wrapping, disabled skipping, and RTL direction.
- The selected indicator follows selection rather than manual focus.
- The public option shape exposes `controls`, and the responsive arm composes the
  library Select instead of forking another picker.
- Current tests provide meaningful DOM coverage for those invariants.

These are preserved GREEN substrates, not whole-component acceptance.

#### RED-6 — the pointer hit owner changes with semantics

Every pill defaults to full motion, so its indicator is drag-enabled. The drag
stylesheet makes only an active `[aria-pressed="true"]` button
`pointer-events:none`, forwarding toggle-semantic presses to the indicator. It
does not cover active `[aria-selected="true"]` pill tabs. Consequently the same
pill material has two hit topologies:

- toggle semantics: the semantic active button is removed from pointer hit
  testing and the decorative indicator receives the press;
- tab semantics: the button stays topmost and the behind-button indicator cannot
  receive the pointerdown required to start drag.

Keyboard focus is not equivalent proof. A pointer user and an accessibility
tree user should not be offered different apparent owners for the same selected
control without a proved transactional composition. The L2 acceptance must
exercise the actual hit stack in both semantics.

#### RED-7 — disabled/stale targets and impossible-mode global listeners remain

`useTabDragMorph.resolveSnapTargets()` includes disabled options, and `onSnap`
writes the returned value without a disabled check. The shared `useDragMorph`
also installs window `pointerup`/`pointercancel` listeners at setup even when no
live draggable handle exists. The current unit file has no genuine browser drag,
pointer identity, cancel, disabled-target, or listener-lifecycle case. These are
already named by L2 and remain RED.

#### RED-8 — `motion="off"` does not turn component-authored motion off

`animatePress()` checks only OS PRM, not the resolved motion prop, and runs on
every click. The indicator's translate/size/scale transitions are also authored
without a `data-motion="off"` terminal arm. `--motion-weight:0` cannot suppress a
WAAPI button scale or a transition that does not read that scalar. Thus the
public motion axis and the component behavior are not isomorphic. The retained
onset/mid/settle frames do not include prop-off or OS-PRM actions.

#### RED-9 — the live tab story does not dogfood its own panel linkage

The README says tab semantics reveal distinct panels and the option type exposes
`controls`, but the story's underline, manual, history, and RTL tab options have
no `controls` IDs and their content is not rendered as linked `tabpanel`s. The
test file contains no `aria-controls` case. The component's public seam may be
correct while its canonical receiver remains semantically incomplete. This
belongs to the existing A11Y W2-A / story-fixture owner, not a new primitive.

#### RED-10 — naming and responsive focus are not stable by construction

`ariaLabel` is optional. When it is absent, the mobile trigger's fallback name is
the currently selected option label. Its accessible name can therefore change
from `Overview` to `Activity` while the value text changes too. The desktop group
or tablist may also be unnamed. A stable control/group name must be caller-owned
or fail loudly; selection is state, not the control's identity.

When `matchMedia` crosses the breakpoint, `v-if` replaces the focused strip with
a Select or vice versa. No focus handoff or logical active-control restoration is
implemented. The colocated test stubs a desktop media result once; it does not
dispatch a live media-query change while a tab/trigger is focused. This is a
focus-loss and zoom/reflow risk.

#### RED-11 — mobile target and focus paint remain observationally RED

C35's mobile frame shows substantially miniaturized labels and controls. Source
has no coarse floor on `.segmented-tab`; only the responsive Select trigger opts
into `data-control-target`. No exact tab-button rects, eight-point hit ownership,
visible keyboard focus, forced-colors outline, or touch/VO result is retained.
Absence of document overflow is not a usability proof. The responsive branch is
not a blanket excuse because the public component and canonical story render
non-responsive pill/tab strips on the same mobile route.

Disabled options with tooltips are another unclosed composition: a native
disabled button is neither focusable nor an event source, so Tooltip content is
unreachable unless a separate described/static path is proved.

### 3. Alert — semantic policy partially GREEN; material and AT proof RED

#### What survives

- persistent Alerts are silent by default;
- `announce="polite"` maps to `role=status`/`aria-live=polite`;
- `announce="assertive"` maps to `role=alert`/`aria-live=assertive`;
- caller-supplied semantics survive when announcement policy is off;
- the explicit policy correctly overrides contradictory caller live-region attrs.

#### RED-12 — owner radius and material role remain violated

The browser's 10px Alert versus 16px Card result maps exactly to source:
`alert/index.ts` uses `rounded-lg`, while `--radius-lg` is the 10px media rung and
Card consumes `--radius-card` at 16px. The owner explicitly requires Alert to be
card-equivalent or slightly rounder. `BJ.W-ALERT-IDIOM`, sequenced after Material
W1/W2 and with A11Y W3 re-ink, is the sufficient owner.

#### RED-13 — static attrs are not live-region delivery proof

The story mounts polite and assertive examples as static page content. Attribute
tests do not prove insertion/update announcements, duplicate suppression,
reading-order timing, or Safari/VoiceOver behavior. An always-mounted assertive
`Connection lost` specimen may itself announce a fictitious emergency on story
entry. The acceptance fixture must stage a user-comprehensible update rather than
counting the static specimen as AT proof.

`Alert.vue` also imports `alertVariants` from its own barrel, whose index reexports
`Alert.vue`; the already-known value self-cycle remains routed to `BJ.W-COLO-3`.

### 4. Card — static anatomy GREEN; scroll-owned receiver RED

Card does not infer command behavior, its selection paint is explicitly static,
and material axes delegate to Surface. Those are correct boundaries. The mobile
frame also confirms the intended 16px role radius.

The canonical scroll example is a focusable `.card-scroll-host` with hidden
scrollbar, but it has no region role, accessible name, or title linkage. Card's
focus elevation applies only to a **descendant** `:focus-visible`; it does not
match the Card root when the root itself is the focused scroll owner. The story
therefore does not yet prove a discoverable, named, visibly focused, keyboard-
scrollable region at mobile/zoom. This is a receiver/story correction under
existing A11Y name/focus and STORY reach ownership, not an automatic role to add
to every static Card.

The shrink header's PRM rule correctly removes its transitions and must survive.
The browser packet did not exercise shrink/restore, focus retention, description
availability, zoom, or AT reading order, so no broader Card closure follows.

## Born-RED acceptance mutations

| Existing owner | Mutation that must turn the detector RED | Required positive proof |
| --- | --- | --- |
| A11Y W2-F — Slider floor | restore zero-width/non-action thumb plus computed-only `pointer-events:none` pseudo, or remove the real root/hit owner while preserving 44px CSS readback | on true coarse input, center + four corners + four edge midpoints of each value owner's non-overlapping 44×44 floor resolve through the trusted event path to the correct thumb/value; drag and tap both work |
| A11Y W2-E — Slider focus | restore `:focus-within` as the standard ring predicate | natural Tab/Shift-Tab visibly rings the track; pointer focus does not; forced-colors exposes a real outline; invalid state remains distinguishable |
| A11Y W2 — multi-thumb naming | restore one identical `aria-label` on every thumb | accessibility snapshot and actual AT announce a stable group concept plus distinct minimum/maximum owners, with current value/bounds/error state |
| A11Y W2-F — touch onset | restore a cold first-touch sequence that merely arms a gate or loses the value change | first deliberate tap/drag from rest acts once; vertical scroll intent stays scroll; cancel/reentry releases gate and Dock hold |
| Tabs L2 — hit topology | restore `aria-pressed`-only pass-through, disabled snap targets, or stale target geometry | pill toggle + pill tabs both support first press/drag from the actual visual hit owner; disabled options can never receive selection; click/keyboard remain intact |
| Tabs L2 — lifecycle | restore setup-time window listeners when no drag-capable handle is mounted | zero global listeners in underline, reduced/off, unmounted, and absent-handle states; exactly one scoped pair during a viable gesture; cancel/unmount removes both |
| Tabs L2 — motion axis | restore unconditional `animatePress` or nonzero indicator transition under `motion="off"` | off has zero component WAAPI and immediate terminal selection; reduced/OS-PRM have the adjudicated calm terminal; functionality and focus remain |
| Tabs L2/A11Y W2-A — panels | remove one controls/id/labelledby edge or expose two panels | actual story receiver has one selected tab, one reachable current panel, exact reciprocal IDREFs, and correct manual/automatic focus behavior |
| Tabs L2 — responsive focus/name | switch a focused strip across breakpoint, or derive trigger name from selected value | focused logical control survives strip↔Select replacement; name stays stable while value changes; no scroll displacement hides focus |
| Tabs L2 — coarse/focus | restore sub-floor tab target or eliminate visible/WHC focus paint | true-mobile eight-point target ownership, keyboard focus/reveal, forced colors, and touch/VO speech across pill/underline/vertical/RTL |
| Alert Idiom + Material W1/W2 | restore `rounded-lg`/10px or wrong wash material/rim | computed Alert radius is card-equivalent or adjudicated slightly rounder in light/dark; contrast, busy-underlay rim, and role blur all pass |
| A11Y W4 / Alert fixture | replace a dynamic update with static initial alert markup | Chromium accessibility tree plus actual Safari/VO prove polite/assertive timing and no duplicate/fictitious initial announcement |
| W-COLO-3 | restore `Alert.vue → ./ → Alert.vue` value edge | value-edge graph contains no Alert self-cycle while public Alert API remains unchanged |
| STORY/A11Y Card receiver | remove region name/title linkage or self focus paint from the scroll specimen | mobile/desktop/zoom keyboard scrolling, visible focus, labelled region, full content reach, PRM shrink terminal and AT order |
| Material W4 / consumer idiom | restore `[&_.slider-track]` or `[&_.slider-range]` in the story | reference consumers use only public props/tokens/documented composition and retain intended paint without private selectors |

## Preserved GREEN invariants

The later implementation must not trade these away:

1. Slider Arrow-key value change, range ordering, uncontrolled mode, vertical
   semantics, disabled state, marks, error linkage, and one Dock hold owner.
2. Tabs' one roving machine, automatic/manual activation, disabled skip,
   Home/End, orientation and RTL behavior, and selection-following indicator.
3. The responsive branch must remain the canonical Select composition, not a
   bespoke picker or a consumer-only fixed-width shim.
4. Alert is silent by default and announces only under explicit policy.
5. Card remains a static semantic group unless the consumer explicitly authors
   an interactive or scroll-region role.
6. Card shrink PRM terminal behavior remains transition-free.
7. No consumer private selector, retry, synthetic forwarding, fixed delay, or
   copied Glass recipe is an acceptable cure.

## Existing-owner routing

- **Slider:** `BJ.W-A11Y-LINKAGE` W2-E/W2-F, hardened from class/geometry to
  trusted action ownership; Material W4 retains public track/fill contract;
  document truth must strike the pseudo-as-hit-region claim.
- **Tabs:** Glass UX Luna handoff L2 owns geometry, drag, responsive focus/reach,
  listener lifecycle, disabled targets, PRM and actual receivers. A11Y W2-A owns
  tab-to-panel linkage. No second tab engine or row.
- **Alert:** `BJ.W-ALERT-IDIOM` plus Material W1/W2 and A11Y W3/W4 own radius,
  material, contrast and announcement fixtures. `BJ.W-COLO-3` owns the self-cycle.
- **Card:** the static producer stays unchanged unless later evidence proves a
  producer gap; the named scroll/focus example routes first to existing STORY
  reach and A11Y name/focus ownership.
- **Consumer idiomaticity:** the Slider story's descendant reskin is removed only
  in a later authorized execution cut, after public token/package proof.

## Missing evidence; no credit by implication

The following remain mandatory before execution acceptance:

1. exact source→build→pack→install→served identity on one immutable Glass 8
   candidate; current source is 7.0 and the worktree is dirty;
2. Assay A and Assay B exact desktop/mobile completion for all cohort states,
   including the currently omitted Card scroll/shrink and Alert update states;
3. true coarse/fine media readbacks, computed rule provenance, trusted event
   paths and dynamic geometry—not programmatic click or pseudo size;
4. natural Tab/Shift-Tab, arrows, Home/End, Enter/Space, pointer, touch, drag,
   cancel, reversal, resize/zoom and focus-reveal sequences;
5. OS PRM plus `motion="reduced"`/`"off"` as distinct inputs;
6. light/dark, forced-colors, 200%/400% zoom, RTL, vertical and multi-thumb
   variants;
7. Chromium/Firefox plus actual Safari/VoiceOver. A DOM role/attr test is not AT
   speech proof;
8. two unchanged-byte independent critics and separate adjudication after the
   actual producer cut.

## Final disposition

C35 is a useful detector packet, not a closure packet. Bank its exact keyboard
GREEN and live geometry/radius REDs. Deepen Slider W2-F from a CSS/class floor to
an event-path floor; keep Tabs L2 open across semantic hit ownership, responsive
focus/name, motion-off, panel linkage and mobile reach; route Alert radius to its
existing idiom wave; keep Card producer-static while fixing/proving the named
scroll receiver. **No product edit, package credit, consumer repin, or acceptance
claim follows from this critic.**
