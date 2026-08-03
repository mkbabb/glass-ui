# Living substrate, overlay, and motion — systems critic 2, C39

**Date:** 2026-07-22  
**Phase:** formation / Browser-evidence criticism only  
**Role:** independent failure-assuming Sol x-high systems / ontology / KISS critic  
**Product, test, package, lock, repin, Browser-acceptance, and release credit:** none

## Verdict

**DEFECT / FORMATION RED / VALID SINGLE-SUBSTRATE WORK BANKED / EXISTING
OWNERS SUFFICIENT / NO NEW ENGINE, PUBLIC API, OR TRANCHE ROW AUTHORIZED /
PACKAGE + RECEIVER + BROWSER ACCEPTANCE RED.**

The cohort is not a tale of nine components each needing a new animation
system. It is a smaller set of boundary failures:

1. the shared overlay reveal applies blur to content-bearing roots and the live
   frames read as a blurred duplicate followed by a snap;
2. `ExpandableContainer` preserves one subtree but changes its coordinate space
   instantaneously, so continuity of identity is not continuity of geometry;
3. Blob has one renderer and one frame-loop owner, yet dynamic topology and the
   pause/disabled ontology are incomplete;
4. Aurora and Configurator have credible shared substrates, but provisional
   compositing and clipped reach remain unproved at their actual boundaries;
5. the spring story is a useful projected-curve reference, not isomorphic proof
   of every production motion path; and
6. source barrels and subpath policy exist, but this moving tree is not an
   immutable source-to-pack-to-install-to-serve closure.

The correct hardening move is therefore to repair the existing owners and their
receiver seams. A second fullscreen engine, second Blob renderer, second Drawer
gesture kernel, public `VizStudio`, or speculative mandatory `settle` API would
increase state-space without curing the measured defects.

## Frozen inputs and observation boundary

The reviewed Browser packet is
`LIVING-SUBSTRATE-OVERLAY-MOTION-COHORT-C38.md`, 198 lines, SHA-256
`103c2dd934c23b8165acb0bb60583c3d00747f3965e16fd8efc386758751c301`.
The convergence authority is
`TWELVE-HOUR-CONVERGENCE-BURNDOWN-C34.md`, SHA-256
`67efc3f11d87164664e6d1d4ec89a75bea84fb05493e388eb9976f0f990f8553`.

Current source cursor read during this criticism:

- Glass HEAD `0371836dfeeb3b7982250d612f93b5347a1d29d4`, tree
  `97b386172a899ef43b686ffbe43263395b3a7744`;
- the reviewed cohort source directories are not modified relative to that
  cursor, but the wider worktree and `package.json` are dirty;
- consequently the source reading is valid formation evidence, while package
  identity and acceptance are not.

Selected retained frames were visually re-read rather than inferred from prose:

- Dialog desktop click-0
  `9f61f397781fadc388d362797dad91ac5560f9a4be73fcdc91c6cc4a083fcad1`;
- Expandable mobile open-400
  `cec330bfda8c780542dbcf7692cd4cde513686f11d454cdca33baa67674b8f34`;
- Toast desktop open-400
  `72cc87059243a72c63e75603ad109a1f97d8428b35213cdf455bc9900968b0e1`;
- Aurora mobile rest
  `e7da39af2598b3563ce9bb0ed6cdccee9fd5e49f5fbcf6039097f157d0977c2e`.

These frames corroborate C38's direct claims. They do not supply missing
interruption, reversal, zoom, keyboard, AT, PRM, Safari, package, or consumer
evidence.

## Cross-system ontology

| Family | System truth worth banking | Failure that remains RED | Existing owner |
|---|---|---|---|
| Aurora | One `Aurora` canvas, one `useAurora` lifecycle, one shared GPU substrate; WebGPU and WebGL are backend translators, not rival products | provisional isolation/compositing, mobile preset reach, source-to-real-receiver proof | Aurora renderer + compositing/package rows |
| Blob | One component, one metaball renderer/simulation, one shared GPU substrate; pointer springs and satellite state share the substrate tick | count replacement pops/truncates, pause means disabled, semantic Core/Meatball and fission continuity incomplete | existing GF-BLOB show/topology/final family |
| Dialog | Reka modal/focus owner plus optional shared spring mount; side sheet does not acquire Drawer gestures | content-root blur, multiple branch clocks with unproved trajectory equivalence, glitch/snap onset | existing overlay/motion/A11Y owner |
| Drawer | Distinct detent/drag problem owns one `useDrawerSnap` scalar and pointer-capture path | live raster continuity and cross-clock interruption remain unproved; no reason to delete the detent kernel | existing Drawer/overlay/motion owner |
| ExpandableContainer | One Vue subtree is reparented; focus, body lock, Escape, and restoration are real | immediate coordinate-space jump, blank fullscreen context, no deterministic receiver reflow truth | existing Expandable + STORY W6 / Atlas receiver |
| Configurator / VizStudio | Generic Configurator state/layout is separate from demo-private VizStudio composition | clipped preset reach, fixed-height allocation, no Expandable dogfood, no focused-item reveal proof | existing Configurator + STORY W6 |
| Spring story | Projected curve has a readable live specimen and managed replacement/stop ownership | precomputed `NumericAnimation` preview is not production `SpringProgress` equivalence proof | existing motion-token/spring owner |
| Toast | Shared reveal and Reka swipe/queue semantics avoid a bespoke entrance engine | inherits content blur; default story does not expose the requested corner dismiss; swipe/action/close arbitration unproved | existing feedback/motion/A11Y owner |

This ontology is deliberately asymmetric. One shared scheduler is not the same
as one scalar: Blob may have x/y springs, pulse, satellites, and mood so long as
one substrate owns ticking and lifetime. Conversely, one Vue subtree is not
enough to claim one continuous experience when reparenting changes every
coordinate at once.

## 1. Overlay reveal: shared code currently shares the defect

`src/styles/glass/reveal.css:41-88` owns the common reveal transition.
`reveal.css:128-151` places `filter: blur(...)` directly on the newly inserted
open root through `@starting-style`; `reveal.css:158-189` repeats blur on the
closed/exit state. Dialog's default center path composes this recipe, whereas
`DialogContent.vue:309-355` uses `useSpringMount` for a centered explicit preset
or a side placement. Scene staging is another state channel, seated by a
double-rAF flip at `DialogContent.vue:120-201`. Toast composes the same
`glass-reveal` root at `Toast.vue:100-108`.

The source therefore explains the C38 frames: text, borders, and the whole
surface are blurred together at onset. This is not merely an unfortunate
screenshot timestamp. It is an authored raster state. At the same time, it
would be false to say Dialog has two competing placement springs: the JS mount
is one shared kernel, and Drawer detents are a different interaction problem.

The system defect is branch equivalence and layer ownership. Default-center
CSS reveal, explicit-center JS reveal, side JS translation, CSS scrim effects,
and stage-rAF state may use different mechanisms, but they owe one semantic
state trajectory per instance: same origin law, same logical-open/inert/focus
boundary, interruptible reversal, and no blurry content-bearing intermediate.
The material may bloom; descendant ink and hit geometry must stay sharp.

### Born-RED overlay mutations

1. Restore nonzero `filter: blur(var(--glass-reveal-blur))` on a live Dialog or
   Toast content-bearing root. A native-DPR onset corpus must fail on sharp-ink,
   duplicate-edge, and readable-focus criteria even if the final frame matches.
2. Route the same modal through default-center CSS, explicit-center spring, and
   each side placement. Mutate one branch's origin, logical-open boundary, exit
   hold, or reversal direction; a shared trajectory/state matrix must bite.
3. Interrupt open with close and close with reopen during the live reveal and
   during the stage flip. Mutating either writer to restart from a resting
   endpoint must produce a discontinuity failure.
4. Re-enable spatial/filter frames under PRM, or make PRM leave a stale mounted
   inert surface. Terminal geometry/focus/visibility parity must fail.
5. Mutate Toast's exit animation name so `Toaster.vue:41-48` never receives the
   recognized completion. The queue must fail closed rather than leak an
   immortal held record.

### Missing overlay evidence

- true onset/mid/settle/reverse pixels for every Dialog motion branch, not just
  the default story;
- real first-focus, Tab loop, Escape, outside pointer and focus-return timing
  while the surface is mounted-but-closing;
- Toast swipe-cancel/swipe-end/action/close-button arbitration, hover/focus
  persistence, live-region speech, and the owner-requested corner-X composition;
- Chromium plus actual Safari/VoiceOver under normal and PRM.

## 2. Drawer: preserve the distinct detent engine, prove its composition

`DrawerContent.vue:70-92` binds the optional snap context to
`useDrawerSnap`; `DrawerContent.vue:154-174` maps its one scalar to the painted
axis. `useDrawerSnap.ts:215-240` creates the one `SpringProgress` used for open,
detent, reverse and close. The handle exposes a keyboard slider at
`DrawerContent.vue:199-219`. This is a legitimate house-owned gesture/state
machine, not redundant Dialog placement code.

The Drawer tests already cover more lifecycle law than the other overlay
members: detent keyboard semantics, pointer geometry, logical-close inertness,
reopen interruption, PRM endpoints, Escape focus, outside pointer and nested
ownership. Bank that. C38 still observes glitch-then-snap live motion, and no
happy-dom or fake-timer assertion certifies actual first-paint sharpness or
cross-subtree stage composition.

### Born-RED Drawer mutations

1. Give sheet and stage different scalar samples for one frame; a detector must
   fail atomic scene/sheet progress.
2. Restore endpoint restart on a drag-release or reopen interruption; swept
   geometry continuity must fail.
3. Remove pointer capture or swap the axis after pointerdown; cancel, out-of-
   bounds release, and direction-specific geometry must fail.
4. Keep the drawer focusable after logical close or return focus before the
   active nested owner closes; modal ownership tests plus real Browser focus
   readback must fail.

No mutation here justifies folding Drawer into Dialog or inventing another
sheet primitive.

## 3. ExpandableContainer: identity survives, geometry does not

`ExpandableContainer.vue:1-66` Teleports one subtree to `body` when `open`.
That is genuine progress over double rendering. `ExpandableContainer.vue:69-92`
owns a depth-counted body lock, and `:148-208` owns focus entry, Escape,
restoration, and cleanup. Preserve all of it.

But `styles.css:5-17` switches the same node immediately to `position: fixed;
inset: 0`. The only local transition is trigger color (`styles.css:31-36`). The
Browser frame at 400ms is therefore correctly blank and spatially unrelated to
the source card: no geometry owner exists to produce a contextual windowing
transition. One subtree prevents state duplication; it does not provide
BREATH OF LIFE.

The consumer boundary confirms why the result cannot be self-certified at
Glass source. Atlas `ChartFrame.vue:73` consumes the public subpath, but its
current comments at `:269-321` contradict the current single-subtree source and
synthesize a settle with `nextTick` plus an uncancelled
`requestAnimationFrame`. `charts/scene/expand-settle.ts:3-18`, meanwhile,
describes a native settle signal that this Glass source does not emit. The
receiver needs deterministic post-reparent geometry truth and stale prose
removal. Formation must not freeze a particular new public `settle` spelling
before the owner selects the smallest composition.

### Born-RED Expandable mutations

1. Reintroduce a second slot render or remount the panel during expand. Component
   state, focus identity and canvas identity must fail.
2. Keep one subtree but atomically jump relative-to-fixed without a measured
   source/target continuity phase. Swept bounds, context visibility, native-DPR
   sharpness and reversal must fail—the exact present defect.
3. Trigger expand-close-expand before the prior geometry/reflow observation
   completes. A stale callback, uncancelled Atlas rAF, or wrong final bounds
   must fail.
4. Open two Expandable instances, close them out of order, then unmount one.
   Body-lock depth, topmost Escape, focus return, and scroll restoration must
   remain instance-correct.
5. Resize/zoom/orientation-change during the transition and mutate source
   disconnection. The system must fail closed to a reachable stable endpoint.

### Smallest owner-respecting direction

Give the existing component one contextual geometry owner and let the shared
demo VizStudio and actual Atlas ChartFrame dogfood it. Do not create a parallel
fullscreen chassis. An observable post-reparent stable-geometry condition is
required; its eventual API or internal form remains an execution design
decision.

## 4. Blob: one renderer is true; bounded live topology is not

`Blob.vue:17-27` composes one renderer; `useMetaballRenderer.ts:93-170`
composes the shared GPU substrate; `blobSimulation.ts:68-193` owns pause,
quiescence and wake scheduling. `useBlobPointer.ts:64-65` has two axis springs,
but they are state dimensions ticked through the substrate lifecycle, not two
frame-loop owners. WebGPU/WebGL setup files are renderer backends. Preserve
this architecture.

Two exact ontology gaps remain:

- `useBlobSatellites.ts:93-116` grows arrays immediately and truncates all three
  arrays immediately when `satelliteCount` falls. The source contains no
  departure lifecycle; a count reduction must pop by construction.
- `Blob.vue:100-102` disables the press hit layer when `paused`, and
  `Blob.vue:310` sets the native press button disabled for `disabled || paused`.
  Pausing ongoing animation and disabling a named action are currently the same
  semantic state. That may be intentional, but it is neither documented nor
  adjudicated.

The one-renderer GREEN must therefore not be inflated into topology GREEN.
Likewise, the owner should freeze semantic Core/Meatball and satellite behavior
before freezing speculative prop names.

### Born-RED Blob mutations

1. Change `satelliteCount` N→0→N while satellites are detached, necked, merging
   and re-separating. Immediate array truncation or index reassignment must fail
   continuity, stable identity and no-pop criteria.
2. Replace the whole config object while live, not merely nested palette fields.
   Geometry, motion, renderer and interaction state must all bind the same
   generation; any mount-time stale closure must fail.
3. Pause during pulse/fission and resume. Mutate pause to advance an oscillator,
   or mutate resume to restart phase from zero; terminal and continuity checks
   must fail.
4. Adjudicate pause semantics, then mutate `paused` to silently disable a named,
   focusable action—or to permit an action whose required animation cannot run.
   The selected contract must bite the opposite behavior.
5. Mutate the gallery to instantiate two separately named live Blob identities.
   The one public specimen/one renderer ontology check must fail.

Missing evidence includes dynamic count replacement, interruption/reversal,
coarse satellite hit ownership, keyboard action, AT naming/state, PRM resume,
theme/mobile/native-DPR, and the value.js actual receiver.

## 5. Aurora: credible renderer, provisional compositing and reach

Aurora is not the malformed Home hero. `Aurora.vue`, `useAurora` and
`createGpuSubstrate` form one renderer/lifecycle; WebGPU and WebGL2 are backend
translations. The retained mobile story is materially painterly and warm, so a
blanket Aurora rejection would destroy valid work.

The component itself records its unresolved boundary: `Aurora.vue:283-293`
uses `isolation: isolate` while calling the mechanism experimental and owing
real in-app proof. The canvas/placeholder crossfade is locally coherent, but
configured live source discovery, composited luma, real underlay, alpha/layer
order and final receiver mapping remain separate existing obligations. The
mobile frame also proves the preset rail can hide later choices.

### Born-RED Aurora / reach mutations

1. Remove or invert the isolation boundary under an overlapping translucent
   receiver; hard seams, wrong blend ancestry or luma-source mismatch must fail.
2. Supply no canvas, a configured getter returning null, a declaratively
   discoverable canvas, and an already-composited provider. Undefined versus
   configured-null intent must not collapse to the same silent path.
3. Vary stacked alpha, placeholder gradient, page underlay and source alpha;
   a hardcoded opaque/white sample must fail the ordered composited-signal law.
4. On 390px, keyboard-focus the last preset and mutate FadingScroll reveal.
   Focused/selected content must remain fully visible without displacing the
   document scroll owner.
5. Lose/restore WebGPU and cross the fallback boundary while paused/PRM.
   One lifecycle must preserve state and final pixels without two live loops.

No second Aurora or Home-local renderer is authorized. Home owns its consumer
composition; Glass owns only exact producer contracts proven absent.

## 6. Configurator and VizStudio: shared composition, not a new primitive

`Configurator.vue:13-20` already delegates overflow to `FadingScroll` for
`auto`/`always` and permits a host-owned `never` mode. It keeps preset selection
semantics outside the primitive and provides a generic state composable. This
is sound KISS separation.

The demo-private `demo/stories/substrates/_frame/VizStudio.vue` composes
Configurator into a fixed-height story chassis and does not consume
`ExpandableContainer`. C38's clipped preset rail and below-fold controls expose
the composition debt. The correct response is dogfood and reach proof under the
existing owners, not a public `VizStudio` export or a story-local fullscreen
fork.

### Born-RED Configurator mutations

1. Make the preset strip overflow at 390px, 200% zoom and long localization;
   focus first→last→first and selected change must reveal the target, preserve
   order and avoid outer-page displacement.
2. Put nested controls inside each `scrollMode`; mutate the wrong element into
   the scroll owner. Keyboard focus reveal, wheel/touch reach and sticky-stage
   geometry must fail.
3. Expand/collapse the shared VizStudio chassis around live canvas state.
   Duplicate renderer, lost context/config, stale focus or orphan body lock must
   fail.
4. Mutate a story to hand-roll the fullscreen shell or copy Configurator glass
   internals. Colocation and public-consumption checks must fail.

Shell SegmentedTabs overflow remains a separate Tabs receiver finding. It must
not be misattributed to Aurora or Configurator.

## 7. Spring story: reference GREEN, isomorphism RED

`demo/stories/motion/springs.vue:44-76` uses one managed
`NumericAnimation` over precomputed projected frames. Generation replacement and
stop ownership are explicit. This is a legitimate visualization of a CSS
`linear()` projection, not automatically a duplicate product spring engine.

But the colocated test reads projection geometry and copy state; it does not
exercise the live playback path. Production `useSpring`/
`useSpringMount` use `SpringProgress`. One readable Browser specimen cannot
certify those runtime paths, Dock, Tabs, overlay, notification, or page
transitions.

### Born-RED spring mutations

1. Mutate a named response/damping register or projected stop while leaving the
   runtime preset unchanged. Sampled demo playback and production
   `SpringProgress` must diverge and fail within a frozen tolerance.
2. Play, stop, reverse, change parameters, and replay before settle. Generation,
   velocity direction and final endpoint must be deterministic.
3. Mutate tempo or PRM so the demo stops but the production spring advances—or
   vice versa. Terminal parity must fail.
4. Obscure the governed specimen with fixed chrome at rest. Reachability is a
   receiver requirement; scrolling before inspection cannot earn default-state
   GREEN.

## 8. Colocation, test isomorphism, and package closure

The component structures are mostly colocated: public component, styles,
composables and source barrels reside together; targeted unit tests exist for
all families; root/subpath policy intentionally keeps heavy Aurora, Blob,
Drawer and ExpandableContainer available through subpaths. Public mappings for
`./motion`, `./aurora`, `./blob`, `./configurator`, `./dialog`, `./drawer`,
`./expandable-container`, and `./toast` are present in the moving
`package.json`.

That is source-structure GREEN, not package closure. `tests/public-surface.spec.ts`
is a source-barrel assertion. It does not prove the exact packed archive,
installed types, both public CSS entries, transitive style closure, served
artifact identity, or absence of accidental root-heavy imports. Because
`package.json` is dirty and no immutable artifact is under this critic, no
consumer may repin from this packet.

The largest test-isomorphism gaps are:

- Expandable tests prove one subtree/body lock/focus, not contextual geometry;
- Dialog tests prove class/style/model structure, not the real CSS/JS/stage
  trajectory;
- Spring story tests prove projected values, not playback;
- Blob tests prove many static/fission states, not live count replacement;
- Configurator tests prove model/structure, not focused reach in constrained
  layouts;
- Aurora tests prove render/fallback/config math, not the acknowledged live
  compositing boundary; and
- Toast tests prove queue commands and animation-end cleanup, not live onset,
  swipe/action/close arbitration or AT.

### Born-RED package mutations

1. Remove one subpath type, runtime or CSS dependency after source tests pass;
   isolated pack-install consumers must fail.
2. Let source, packed, installed and served bytes differ while the version stays
   constant; identity law must fail before Browser credit.
3. Import each heavy subpath and both CSS public entries from a clean consumer;
   mutation removing a required style or adding an accidental root-heavy
   dependency must fail.
4. Run two unchanged-byte independent critics against the exact installed and
   served candidate; any moving package byte invalidates both.

## Dependency-ordered hardening without engine proliferation

1. **Overlay layer/state unit:** separate material bloom from sharp descendant
   ink; reconcile default-center, explicit-center, side, scrim and stage
   trajectories. Then re-prove Dialog and Toast; preserve Drawer detents.
2. **Expandable composition unit:** add contextual geometry ownership to the
   existing single subtree, dogfood it in shared VizStudio and actual Atlas,
   remove stale receiver prose/synthetic assumptions, and prove reflow/focus.
3. **Blob topology unit:** freeze behavior-level Core/Meatball/satellite
   semantics, add enter/leave identity for dynamic counts, adjudicate pause
   interaction, then prove actual receiver continuity.
4. **Aurora/Configurator boundary unit:** close provisional compositing/source
   plumbing and focused reach; keep Home and shell-Tabs consumer defects in
   their own owners.
5. **Motion-reference unit:** make the spring story and production runtime bite
   the same curve/PRM/interruption mutations without requiring them to share an
   implementation class.
6. **Immutable closure unit:** source → build → pack → install → serve exact
   bytes, actual receiver matrix, Chromium + actual Safari/VoiceOver, then two
   unchanged-byte critics.

## Adjudication questions

The later independent adjudicator should resolve only these bounded choices:

1. Does overlay blur move to a material-only layer, or is it removed entirely
   from content-bearing reveals? Either answer must preserve sharp ink.
2. What is the smallest observable stable-geometry contract for
   ExpandableContainer and Atlas without prematurely freezing a public event?
3. Is Blob `paused` intentionally interaction-disabled, or should it park motion
   while retaining a named action? Freeze one semantic law before coding.
4. Which Configurator/VizStudio element owns constrained scrolling and focused
   reveal in each posture?
5. What exact live receiver proves Aurora's isolation/composited-source seam?

Everything else already has an owner. Reopening settled architecture or minting
new engines would be wheel-spinning, not convergence.

## Terminal disposition

Bank the actual GREEN evidence: one Aurora renderer/lifecycle, one Blob
renderer/simulation/GPU substrate, one Expandable subtree, one Dialog spring
mount kernel, one distinct Drawer detent kernel, one managed spring-preview
owner, shared Toast reveal/queue semantics, and generic Configurator state.

Keep the cohort **RED** for overlay sharpness and continuity, Expandable spatial
context, Blob dynamic topology/pause semantics, Configurator reach, Aurora
compositing/source proof, production/demo spring isomorphism, immutable package
closure, actual receivers, PRM, Chromium, and actual Safari/VoiceOver.

No product edit, new row, new renderer, new scheduler, consumer repin, or
acceptance claim follows from this critic.
