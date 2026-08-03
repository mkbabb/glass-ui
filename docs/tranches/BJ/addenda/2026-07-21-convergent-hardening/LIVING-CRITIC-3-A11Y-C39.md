# Living substrate / overlay / motion — interaction and accessibility critic 3 (C39)

Date: 2026-07-22  
Role: independent failure-assuming Sol x-high critic 3  
Phase: formation and Browser-evidence criticism only  
Product, test, package, lock, repin, browser-acceptance and release credit: none

## Frozen inputs and inspected cursor

- Normative cohort input:
  `LIVING-SUBSTRATE-OVERLAY-MOTION-COHORT-C38.md`, SHA-256
  `103c2dd934c23b8165acb0bb60583c3d00747f3965e16fd8efc386758751c301`.
- Twelve-hour formation law:
  `TWELVE-HOUR-CONVERGENCE-BURNDOWN-C34.md`, SHA-256
  `67efc3f11d87164664e6d1d4ec89a75bea84fb05493e388eb9976f0f990f8553`.
- Glass source cursor: committed HEAD
  `0371836dfeeb3b7982250d612f93b5347a1d29d4`, tree
  `97b386172a899ef43b686ffbe43263395b3a7744`, with the reviewed cohort source
  paths clean at inspection time. The wider worktree was dirty and is not a
  package or acceptance candidate.
- Visual evidence: the exact desktop/mobile frames retained by C38 under
  `evidence/browser-assay-b/`. I independently inspected representative Aurora,
  Blob, Dialog, Drawer, ExpandableContainer, Configurator, Spring and Toast
  onset/settle frames, including the mobile states.
- Independent Browser attempt: unavailable. The in-app Browser controller in
  this critic seat returned `No browser is available`; this critic therefore
  does not present C38 Assay B as its own live run. It treats the retained,
  hashed C38 frames as visual evidence and independently challenges the current
  source, styles, tests, exports, demos and consumers. Actual AT and Browser
  independence remain explicitly missing.

## Verdict

**DEFECT / FORMATION RED / INTERACTION-A11Y PARTIAL / EXISTING OWNERS
SUFFICIENT / NO NEW ROW OR ENGINE.**

C38's Browser detector is valid and its strongest positive findings survive:
Aurora and Blob are living, authored visual substrates; the Spring specimen has
a readable trajectory; Dialog/Drawer inherit meaningful Reka semantics;
Drawer already has a keyboard-operable 44px detent handle; and
ExpandableContainer already has a focus trap, body-lock accounting and a LIFO
Escape registry. Those are real GREEN mechanisms, not to be discarded.

They do not close the cohort. Seven interaction/a11y failures are source-proven,
two consequential policy questions remain owner-held, and the retained mobile
frames expose reach and occlusion problems that unit contracts do not cover.
The dominant failure is not absence of semantics everywhere; it is the split
between generally sound semantic kernels and unproved or contradictory live
gesture, target, focus, announcement and spatial-continuity behavior.

## Banked GREEN — do not regress these seams

1. **Aurora has an honest decorative core.** `Aurora.vue` keeps its canvas and
   placeholder out of the accessibility tree. Pointer policy is an optional
   consumer layer through `useCursorInteraction`, and the runtime suppresses
   cursor response under reduced motion. The Atlas background receiver consumes
   the public `@mkbabb/glass-ui/aurora` subpath, passes public config/render/opacity
   props, and marks the atmosphere wrapper decorative and pointer-transparent.
   That is an idiomatic thin consumer, not a hand-rolled renderer.
2. **Blob's optional activation kernel is native.** With `pressLabel`, Blob
   renders one named `<button>` over an aria-hidden canvas; without it Blob is
   decorative and listener-free. Enter/Space/click therefore inherit native
   behavior. The same renderer owns pause/resume, PRM and pointer wake; there is
   no second interaction loop.
3. **Dialog's modal semantics are not bespoke.** Reka owns Portal, DialogContent,
   dismiss, trap and trigger. Spring-retained exit content becomes inert and the
   component has a scoped trigger-focus handoff. `stage=scale|immersive` degrades
   to dim under PRM.
4. **Drawer's detent handle has a substantive accessible contract.** It is a
   focusable `role=slider` with value text and Home/End/Arrow behavior, while
   `styles.css:262-277` gives the handle a `2.75rem` minimum block size and a
   visible focus treatment. Existing lifecycle tests cover PRM endpoints,
   Escape focus return, live-behind versus modal ownership and nested stage
   isolation.
5. **ExpandableContainer's single-subtree intent is sound.** It uses one
   teleported subtree, a trapped looping FocusScope, reference-counted body
   lock, named native controls with `data-control-target`, and the shared LIFO
   Escape dispatcher. Preserve those mechanisms while fixing continuity and
   terminal focus edges.
6. **Configurator preserves DOM/tab order when its visual aside flips.** Stage
   precedes controls in source order; presets use native toggle buttons with
   `aria-pressed` inside a named group; ConfiguratorLayer has explicit
   expanded/controlled-region state.
7. **Spring cancellation and PRM are centralized.** The managed preview cancels
   its prior animation and generation-guards late completion; the numeric
   animation path respects reduced motion. The visible C38 trajectory is worth
   keeping as a motion-language reference.
8. **Toast has one queue/provider/viewport topology and named actions.** The
   public queue, one provider, Portal, Reka swipe/Escape semantics, default
   `Dismiss` label and action `altText` are the correct substrate. The fix is to
   harden that topology, not create a second notification system.

## Binding source-proven RED findings

### A1. Dialog and Toast expose sub-coarse, visually hidden dismiss targets

`DialogContent.vue:494-500` renders a bare 16px X with no padding, no
`data-control-target`, no `touch-hit-area` and no pseudo hit floor. The mobile
Dialog frame corroborates a very small close target. `ToastClose.vue:27-43`
adds only `p-1` around the same 16px glyph and keeps the whole control
`opacity-0` until hover/focus. On a coarse/no-hover device the default toast has
no discoverable visible dismiss affordance; C38's mobile and desktop frames
show precisely that absence.

This is not a request for a permanently loud X. The owner-requested partially
outboard iOS-style close can remain visually light and partly cross the border,
but its actual hit envelope must remain at least 44×44, remain inside a safe
non-overlapping region, be discoverable without hover, show keyboard focus,
and retain the accessible name. Dialog and Toast own their respective repairs;
do not copy target padding into consumers.

### A2. Toast currently establishes two announcement paths

`Toaster.vue:121-135` asserts that Reka's viewport has no live-announcement
contract and adds `aria-live=polite` to the whole viewport. The installed Reka
`ToastRootImpl.js:130-139`, however, renders its own hidden `ToastAnnounce` with
`aria-live=assertive` for foreground toasts and `polite` otherwise. Thus a new
toast is eligible for Reka's deliberate announcement and for mutation within a
second live region surrounding the teleported toast tree. That is a concrete
double-announcement risk, not merely missing screen-reader evidence.

Retain exactly one announcement owner, preserve Reka's foreground/background
urgency distinction unless the public Glass API deliberately replaces it, and
prove title/description/action alternate text are announced once. The viewport
may remain a named landmark without becoming a second live announcer.

### A3. Drawer conflates cancel with release and lacks lost-capture ownership

`useDrawerSnap.ts:308-325` starts a drag for any pointerdown; it does not reject
non-primary pointers or non-primary buttons. `:344-374` treats release as a
velocity-based commit. `:384-397` binds **the same handler** to `pointerup` and
`pointercancel`, has no `lostpointercapture` handler, and releases capture
without an exception guard. A canceled OS gesture can therefore fling, advance
a detent or dismiss the Drawer. A capture lost before explicit release can
leave internal pointer/dragging state stale or throw on release. Detaching or
unmounting the handle likewise removes listeners without an explicit gesture
retirement.

The existing keyboard and lifecycle tests are valuable but do not exercise a
genuine primary-touch pointerdown→move→cancel/lostcapture stream. Drawer owns a
separate cancel law: rollback or deterministic nearest-seat without using a
canceled release velocity; retire capture/state on cancel, lost capture,
handle replacement and unmount; ignore secondary pointers/buttons; preserve
interruption/reversal and the 44px slider contract.

### A4. ExpandableContainer does not restore focus when removed while open

`ExpandableContainer.vue:180-202` restores focus only on the normal
`open: true→false` transition. `:204-208` unregisters Escape and releases the
body lock on unmount, but does not call `restoreFocus`. A router/conditional
unmount while fullscreen can therefore leave focus on a detached node or body.
The shared Escape registry has unit-level LIFO tests, but the component's
current contract does not mount two real fullscreen containers and prove
first-Escape-inner / second-Escape-outer focus return and lock-depth behavior.

This is an edge repair to the existing Expandable owner, not grounds for a new
fullscreen primitive. Also keep the visual finding distinct: the immediate
relative→fixed Teleport produces an almost blank context-free viewport in all
three C38 open samples. Semantic focus trapping can be GREEN while the owner’s
Breath-of-Life continuity remains RED.

### A5. Configurator preset controls lack a producer-backed coarse floor and
their rail has no proved focus reveal

`Configurator.vue:278-309` renders default preset buttons as
`px-3 py-1 text-micro` capsules. They carry neither `data-control-target` nor
the shared interactive-chip/touch-floor contract. The FadingScroll host is
focusable, and C38 shows its later mobile choices clipped, but no component
logic proves that focusing or selecting an offscreen preset reveals it without
moving the surrounding page or obscuring it beneath the fixed Dock. The
alternative Nuclei controls also locally force `h-7` and `h-6` on Add/Remove;
their actual coarse hit ownership is unproved.

Configurator owns one public, reusable coarse target/focus-reveal policy for
its default preset gallery and controls. The cure must not be a per-story
radius/padding override. Preserve native toggle semantics and stage→controls
DOM order.

### A6. Aurora's live canvas affordance is pointer-only and not associated with
its keyboard alternative

The Aurora renderer itself is correctly decorative. The demo's interactive
stage, however, is a plain `div` (`AuroraStage.vue:62-83`) with pointer-only
instructions, no role/tab stop/name and an aria-hidden nuclei overlay. The
separate NucleiLayer does expose Add/Remove buttons and labeled sliders, which
is meaningful GREEN, but it is spatially remote below the clipped preset/chassis
stack and has no programmatic association or focus jump from the canvas cue.
The copy advertises alt/shift/right-click and drag operations that cannot be
performed from the canvas by keyboard or touch alone.

Do not make the canvas itself a fake monolithic slider. The existing Aurora /
Configurator / STORY-W6 owners must expose an understandable route between the
visual stage and equivalent named controls, prove all CRUD/move operations in
keyboard and touch postures, and remove desktop-only instruction claims where
the equivalent is not available in that posture.

### A7. The Spring story creates duplicate live status announcements

The playground publishes the same `playing|settled · duration` status in two
separate `aria-live=polite` nodes (`springs.vue:428-434` and `:528-535`). The
larger named-register grid is also live (`:323-325`) and changes authority text
when its preview plays. A single activation can therefore create multiple
polite announcements for visually duplicated state. This is a demo/receiver
defect under the existing Spring/VizStudio story owner, not a flaw in the
numeric spring engine.

Choose one concise status owner per preview, keep copy-result status separate,
and prove interruption/restart does not announce a stale settled state after a
new generation begins.

## Owner-held questions that must be resolved, not guessed

### P1. Blob pause versus action availability

`Blob.vue:99-103,304-314` makes `paused` disable the named activation button as
well as park the renderer. If “Poke” is a semantic product action, pausing
continuous decorative motion must not silently remove that action; if the
action exists only to animate, disabling it is coherent but the paused state
must be exposed and understood. The current code and programmatic-click test
encode the latter without a frozen public policy. Existing GF-BLOB ownership
must adjudicate the semantics before implementation. Preserve the one native
button and one renderer either way.

### P2. Blob body versus outboard-satellite hit topology

The renderer paints satellites on a 160% overflowing canvas, while the only
button is clipped to a body-centered circle (`Blob.vue:301-314,376-405`). That
is internally consistent for core activation but makes visually detached
satellites noninteractive. Existing GF-BLOB ownership has already reserved the
silhouette/outboard satellite decision; this critic does not replace it with a
core-only rule. The final contract must make visible hit ownership, focus
geometry, touch geometry and fission/merge continuity agree through every
posture.

## Motion, interruption and focus timing

1. C38's Dialog, Drawer and Toast click-0 frames show blurred/duplicated
   destination content followed by essentially settled 80ms frames. Fast visual
   response is not itself a defect, but the current frames do not demonstrate a
   continuous natural-origin trajectory. The iOS-27 law requires onset,
   midcourse, settle, reverse and cancel receipts—not only rest/click-0/80/400.
2. Dialog's scoped staging and inert exit are good. Its synchronous close watch
   moves focus to the trigger while the inert surface remains visibly exiting
   (`DialogContent.vue:387-410`). That may be correct, but it still owes a live
   proof that focus is neither lost nor visibly exposed behind an obscuring
   surface, that nested overlay LIFO is preserved, and that reopening during
   exit does not generate a stale trigger jump.
3. Drawer has the strongest actual interruption kernel (one retargetable spring
   and scalar), but the cancel bug above makes its gesture transaction
   incomplete.
4. ExpandableContainer has no observable transition in C38: click-0, 80ms and
   400ms are visually identical. Focus and body lock cannot substitute for
   spatial continuity from the invoking chart/stage.
5. Toast's center-origin reveal may be a useful material choice, but it owes
   swipe-start/cancel/end coexistence, hover/focus pause, focus persistence,
   queue stacking and vaporize/dissolve exit proof. The partly outboard close
   must not overlap swipe/action ownership.
6. C38 contains no PRM frames for this cohort. Source-level PRM branches are
   bankable mechanism evidence only; terminal-position, information parity,
   focus and announcement parity remain RED.

## Mobile reach and consumer idiomaticity

- Every inspected C38 mobile specimen retains the global story Dock over the
  lower viewport. Spring begins with its governed specimen hidden until scroll;
  Aurora/Configurator place meaningful controls beyond the initial aperture;
  Toast can cover the page title; and Dialog/Drawer/Expandable add a second
  fixed/portal layer. This routes to existing GF-DOCK safe-frame and STORY-W6
  reach owners. No component should add route-local padding or z-index shims.
- The Atlas Aurora background is an idiomatic public consumer and should stay
  thin.
- Atlas ChartFrame consumes the public, subpath-only ExpandableContainer and
  uses the documented slot's `fullscreen` flag for its own content sizing.
  That is preferable to private selectors. Its comments still describe an
  installed 4.x shared-element/settle future and a synthetic settle bridge; the
  actual receiver must be reconciled atomically when the producer's continuity
  contract is frozen. Do not claim current Glass source or a mutable version as
  the installed receiver.
- Atlas ReadoutSheet consumes Drawer publicly and limits local CSS to its own
  content/safe-area layout, which is idiomatic. Its comment that teleported
  `aria-labelledby` is dropped is stale against the current attr-forwarding
  producer and should be removed by the consumer when its exact installed
  artifact is proved; it is not a new Drawer feature ask.
- Atlas VizAppendixDock uses public DrawerTrigger/Content/Close composition and
  provides a visible close action on phone. It also hand-styles its own 2rem
  appendix trigger without a public coarse floor. That consumer-side target is
  RED under the consume/edge-efficiency law, but must not be “fixed” by reaching
  into Drawer internals.

## Born-RED detectors and mutations required before execution handoff

These are proof designs, not authorization to edit tests now.

1. **Dialog/Toast coarse close:** at 390×844 coarse/no-hover, assert painted and
   actual hit regions separately; center, four corners and four edge midpoints of
   a 44×44 envelope must resolve to the close owner without neighbor overlap.
   Keyboard focus must reveal the ring and named action. Mutation restoring
   Dialog's bare 16px X or Toast's `p-1 opacity-0` coarse path must fail.
2. **Exactly-one Toast announcement:** capture accessibility events for
   foreground/background toasts with title, description, action and close.
   Mutation restoring simultaneous viewport `aria-live` plus Reka
   ToastAnnounce must create a detectable duplicate and fail.
3. **Drawer gesture transaction:** run primary touch down→move→up,
   down→move→cancel, lostpointercapture, handle replacement and unmount; add
   secondary-button and second-pointer attempts. Cancel/loss must retire state
   without fling/dismiss. Mutation binding cancel to release must fail.
4. **Overlay LIFO/focus:** mount real nested Dialog/Drawer/Expandable surfaces.
   First Escape closes only the topmost; focus returns to its invoker; second
   Escape closes the next. Unmount the open Expandable and assert focus and body
   lock restoration. Mutations reversing registry order or omitting unmount
   restoration must fail.
5. **Configurator coarse/reveal:** for every default preset at 390 coarse, prove
   44×44 eight-point ownership, keyboard traversal and focus reveal without
   document displacement or Dock occlusion. Mutation removing the public floor
   or reveal step must fail.
6. **Aurora equivalent operation path:** from the stage cue, reach named controls
   and add/remove/move a nucleus with keyboard and coarse touch; keep stage and
   control state synchronized. Mutation removing the association/reveal or one
   operation must fail.
7. **Blob policy/topology:** freeze pause/action and satellite ownership first;
   then prove keyboard, coarse eight-point hits, focus ring, fission/merge,
   cancel/reverse and PRM endpoints. The opposite policy mutation must fail.
8. **Spring announcements:** one activation yields one playing and one settled
   announcement for that preview. Interrupt/restart must suppress the superseded
   generation's settled announcement. Mutation restoring the duplicate live
   regions must fail.
9. **Motion sequences:** for Dialog, Drawer, Expandable and Toast record first
   input, onset, multiple true midpoints, settle, immediate reversal and cancel
   with dynamic geometry, focus owner and animation owner. Mutations restoring
   a single blurred onset followed by destination snap must fail.
10. **PRM and AT parity:** repeat the foregoing with PRM under Chromium and
    actual Safari/VoiceOver. PRM may eliminate travel but not state, focus,
    dismiss, announcement, hit ownership or reach.

## Missing evidence — terminally non-crediting

- No second independent live Browser assay was available to this critic.
- No actual Safari, VoiceOver, switch control or screen-reader announcement
  capture exists for the cohort.
- No retained C38 PRM frame series exists.
- No real coarse corner/edge ownership proof exists for Dialog close, Toast
  close, Blob, Configurator presets or the Atlas appendix trigger.
- No real pointercancel/lostcapture/multi-pointer Drawer sequence exists.
- No real nested mixed-overlay LIFO/focus sequence or open-unmount fullscreen
  sequence exists.
- No immutable source→pack→install→served identity binds these visual frames to
  a release candidate.
- The fixed story Dock remains an uncontrolled occlusion variable in mobile
  component evidence.

## Adjudication routing

No new row, renderer, overlay engine, fullscreen engine, notification system or
consumer shim is justified.

- Aurora + Configurator + mobile reach → existing Aurora/VizStudio/STORY-W6
  owners.
- Blob activation and hit topology → existing GF-BLOB owners.
- Dialog/Drawer targets, gesture transaction and focus timing → existing overlay,
  Drawer motion and A11Y owners.
- Expandable continuity/focus terminal edges → existing Expandable/VizStudio
  owner and Atlas ChartFrame consume edge.
- Spring duplicate announcements → existing motion-story/VizStudio owner.
- Toast target, announcement and exit choreography → existing feedback-motion /
  Toast owner.
- Cross-surface mobile occlusion → existing GF-DOCK safe-frame owner.

The separate C39 adjudication should bank the GREEN kernels above, accept A1–A7
as source-proven RED, preserve P1–P2 as explicit owner decisions, and require the
born-RED matrix rather than further prose recursion. Formation can converge
once those deltas are losslessly attached to their existing owners and the
missing browser/AT evidence is named in the restart-safe execution handoff;
none of that is present tranche execution or acceptance.
