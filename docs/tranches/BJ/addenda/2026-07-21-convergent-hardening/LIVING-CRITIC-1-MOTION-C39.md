# Living cohort critic 1 — motion, material, raster, and momentum (C39)

Date: 2026-07-22  
Phase: formation / Browser-evidence criticism only  
Role: independent failure-assuming Sol x-high critic 1  
Product, test, package, lock, repin, browser-acceptance, and release credit: none

## Verdict

**DEFECT / FORMATION RED / EXISTING OWNERS SUFFICIENT / NO NEW MOTION ENGINE OR
TRANCHE ROW.**

The cohort contains real strengths worth banking: Aurora is one painterly field
with a disciplined lifecycle; Blob is one renderer/simulation and its pulse is
visibly alive; Drawer has one interruptible snap scalar and logical edge origins;
Dialog's centered origin and popper anchor origin are natural; ExpandableContainer
keeps one subtree and has sound body-lock/focus intent; Toast preserves Reka's
swipe/portal/status semantics; the Spring Orchestrator uses the governed numeric
spring projection. Those are not enough to satisfy BREATH OF LIFE or MOVEMENT OF
MOMENTUM.

Four source mechanisms are terminally formation-RED:

1. the shared overlay reveal deliberately applies `filter: blur(...)` to the
   surface's own pixels, including text and controls, producing the live
   Dialog/Toast blurred duplicate onset;
2. ExpandableContainer changes topology from in-flow to fixed/teleported with no
   spatial transition at all;
3. Blob hard-truncates live satellites when count falls and treats `paused` as a
   disabled press surface, contradicting the already-adjudicated living contract;
4. the Spring Orchestrator stops an in-flight animation and explicitly rewinds its
   specimen to progress zero before every replay.

Drawer and Aurora retain credible internal motion/lifecycle design but lack the
native Browser evidence needed to certify reversal, raster sharpness, compositing,
PRM, and actual Safari/VoiceOver. Configurator/VizStudio retains a good single
stage→controls order but does not yet dogfood the shared fullscreen chassis or
prove every control reachable. Toast has no visible coarse-pointer dismiss target
at rest. The correct action is therefore bounded absorption into the existing
owners, followed later by one frozen producer→package→actual-receiver proof chain;
not another abstraction, clock, or component.

## Exact inputs and cursor

| Input | Exact identity |
|---|---|
| normative cohort | `LIVING-SUBSTRATE-OVERLAY-MOTION-COHORT-C38.md`, SHA-256 `103c2dd934c23b8165acb0bb60583c3d00747f3965e16fd8efc386758751c301` |
| convergence authority | `TWELVE-HOUR-CONVERGENCE-BURNDOWN-C34.md`, SHA-256 `67efc3f11d87164664e6d1d4ec89a75bea84fb05493e388eb9976f0f990f8553` |
| source commit | `0371836dfeeb3b7982250d612f93b5347a1d29d4` |
| source tree | `97b386172a899ef43b686ffbe43263395b3a7744` |
| Browser assay | independent Assay B, desktop `1280×720` DPR 1 fine pointer and true mobile `390×844` DPR 3 coarse pointer; exact retained frame hashes are frozen in C38 |

Selected current-source identities used to challenge the packet:

| Source | SHA-256 |
|---|---|
| `src/styles/glass/reveal.css` | `debe9612fdbb0686aa67fdc4355628139320f6e39078c797a99be36b16e85c9f` |
| `src/styles/animations.css` | `aa9529493123a11db9983cce8dcdafc86c64b8e9dce808b32c04301c831273e7` |
| `src/components/dialog/DialogContent.vue` | `4143222d5e9d769326657bd779c431545e812f79472476dda68b24f2c0099dac` |
| `src/components/drawer/DrawerContent.vue` | `6cd768df0e94d5567a1466bd15478d7d73c52225bc82359ab4709da84b10fb03` |
| `src/components/drawer/composables/useDrawerSnap.ts` | `92c90048f900466c44541037529eed53ab9ed14e6a417a20e1a48391766b255b` |
| `src/components/expandable-container/ExpandableContainer.vue` | `e0c69f36baed2fcf6084eb105f9317ac0eca234c969e55487f1ae76ea0e8c66e` |
| `src/components/toast/Toast.vue` | `eb12bd3dd13e5a80b474637a39d53c037376562da447b095009e0dbb9535f717` |
| `src/components/toast/ToastClose.vue` | `b5a9638fe18b41633b61a5849f77f988c1f102a13ba164df0390a1048183c9fb` |
| `src/components/aurora/Aurora.vue` | `13bd9e29a0503a8eb36dc044a16b229f8695eccf4d4124eb507fa6e3a5c9c070` |
| `src/components/aurora/composables/useAurora.ts` | `ab44ed34691ea232d0a2f65c635f15e649c0a4216c17d22369b0b8c735ca410e` |
| `src/components/blob/Blob.vue` | `a2a50c9c7acaafb433d78f8a999e2f81454ad2cd7fc506b744c9d0fd493e5bdd` |
| `src/components/blob/composables/useBlobSatellites.ts` | `e75940509b621ce7db467f9182986d0341fc36180bac88d5592e3586403e4b11` |
| `src/components/configurator/Configurator.vue` | `7d2450de5ef0f85cfe6fc8d43a4f42ff32ab9080721e8059c76d8d12162fc8ef` |
| `demo/stories/motion/springs.vue` | `e4247b0db8f98783b17645641f2a8f2c792ad3804e296bce37ba3cd7709eb8c8` |

The Browser evidence is discovery against a moving development surface, not an
installed immutable package. This critic does not promote its pixels to release
acceptance.

## Failure-assuming findings

### M1 — Critical: the overlay onset glitch is an authored own-pixel blur

The live Dialog and Toast onset frames are not merely a timing/capture anomaly.
In C38, Dialog desktop click-0 `9f61f397…` and Toast mobile click-0 `32826245…`
show blurred/duplicated destination content; their 80ms frames `e59dd2f3…` and
`53611de0…` are already crisp and nearly settled.

`reveal.css:24-31` explicitly calls the effect a blur-settle and applies it through
`filter`, not `backdrop-filter`, to the surface's own pixels. The overlay register
sets the dominant blur to 6px (`:56-63`), transitions `filter` on the reveal clock
(`:72-84`), starts open content blurred (`:128-151`), and ends closed content
blurred (`:158-170`). The exit keyframe repeats the same own-pixel blur in
`animations.css:136-150`.

This is the wrong layer for the GOAL OF GLASS. Backdrop blur is the transmissive
material; foreground text, icons, focus rings, and controls must remain optically
sharp. Calling `filter` “compositor-safe” proves neither legibility nor performance:
it can promote/offscreen-rasterize the full subtree and the Browser frames show
that it visibly degrades content. The source is therefore the mechanism, not a
missing extra blur knob.

Preserve:

- center origin for a centered Dialog;
- `--reka-popper-transform-origin` for anchored poppers;
- one coupled scale/opacity arrival and the Reka-awaitable exit;
- resting `backdrop-filter` material and the PRM spatial snap.

Redress under the existing feedback/motion and overlay owners: remove foreground
content blur from the shared reveal, or isolate any desired optical modulation to
a non-legible decorative carrier. Do not replace it with a second reveal engine.

### M2 — Critical: ExpandableContainer preserves identity but not spatial continuity

`ExpandableContainer.vue:2-18` teleports the same subtree to `body` as soon as
`open` becomes true and switches its root to fixed fullscreen styling. The source
contains no geometry capture, spatial interpolation, spring, view transition, or
continuity handoff. Its only asynchronous work is focus timing
(`:148-162`) and focus restoration (`:164-199`).

C38's desktop open frames `a40fb021…`, `c6059143…`, and `e3c99148…` are visually
identical at click-0/80/400ms: an inline panel becomes a mostly blank viewport in
one topology change. “One subtree” prevents state duplication; it does not itself
create a contextual expansion. This fails the requested album-cover/page-style
continuous windowing and MOVEMENT OF MOMENTUM.

Preserve the one subtree, FocusScope, nested lock depth, Escape, LIFO, and return
focus. Existing STORY W6 / GF-AURORA W7 / Expandable ownership should give that
same subtree one observable inline→viewport and viewport→inline trajectory with a
stable natural origin. Shared VizStudio should adopt it once; story-local fullscreen
forks remain forbidden. PRM must reach the same terminal placement without travel.

### M3 — High: the Spring Orchestrator is not interruption-safe reference authority

The sample correctly uses `springProjection`, `NumericAnimation`, a single managed
preview, and `respectReducedMotion: true` (`springs.vue:43-76`). But each `play()`
explicitly writes progress zero before starting (`:106-113`), and the managed
preview stops the prior animation before constructing its replacement (`:48-62`).
The playground duplicates the same reset (`:194-207`). Re-pressing mid-flight
therefore teleports to the start instead of retargeting from the current value.

C38's sample remains useful as a curve/token specimen, but the fixed story Dock
obscures the initial motion object and the retained 0/300/1200 frames cannot certify
interruption, reversal, or even all intermediate travel. Do not use it to certify
Dock, overlays, tabs, notifications, or page transitions.

The reference story must demonstrate repeated play, mid-flight replay, reverse,
cancel, resize, PRM, and focus/keyboard activation without a discontinuous reset.
This is a story/reference correction under the existing motion owner, not a public
new animation primitive.

### M4 — High: Blob banks one living engine but violates its own totality contract

C38's mobile pulse series (`7a85c529…` → `9557b98f…` → `faf27e15…`) proves that
the current single Blob renderer can breathe and deform with warmth. Source also
correctly wakes the one substrate loop on pointer activity
(`Blob.vue:215-233`) and routes the click impulse through that existing loop
(`:262-270`). Preserve those GREENs.

Two current mechanisms remain RED:

- count growth creates transparent satellites, but count reduction truncates all
  three arrays immediately (`useBlobSatellites.ts:92-117`), so a live/fissioning
  satellite can pop out of existence rather than completing a bounded dissolve or
  reabsorption;
- `paused` removes the pointer host (`Blob.vue:99-103`) and sets the native press
  button disabled (`:304-314`). The frozen apotheosis already says “paused is not
  disabled”: a WCAG pause must park ambient motion without erasing an otherwise
  valid named action.

The existing GF-BLOB W0/W-SHOW/W-ALIVE/W-TOPOLOGY/W-FINAL owner must keep one
component/simulator/renderer, one body oscillator, and the established outboard
satellite silhouette while making count changes total and pause semantics honest.
No second “meatball renderer,” satellite clock, or state machine is warranted.

### M5 — High: Dialog has two entrance authorities without a shared live contract

Centered Dialog defaults to `.glass-reveal`; naming `springPreset` switches that
placement to `useSpringMount` (`DialogContent.vue:94-118`, `:229-235`). Side
placements always arm the JS spring while `motion="off"` is handled within that
path. The component also drives stage staging through its own two-rAF scalar seat
and flip (`:120-215`). This is understandable implementation composition, but the
live default Browser receiver exercised the CSS path and exposed M1; the stronger
JS spring tests cannot retroactively certify it.

The behavior contract must be common even where implementation differs: same
natural origin, actionable first frame, current-value interruption, reverse without
remount/snap, stable focus target, and sharp content. A mutation that silently
switches between CSS and JS authority must not change those outcomes. The remedy is
contract unification and source reduction where possible, not a third engine.

### M6 — High: Toast motion and dismiss affordance are both incomplete

Toast correctly uses one Reka root, one app-level provider/viewport, the shared
surface axis, swipe semantics, and a Reka-awaitable exit. Its live onset nevertheless
repeats M1. Its close control is `absolute right-2 top-2`, only `p-1`, and
`opacity-0` until hover or focus (`ToastClose.vue:26-43`). On the true coarse mobile
receiver there is no hover, and C38 records no visible dismiss affordance at rest.

The owner's partially outside corner-X and vaporize/dissolve request can be met
through this existing close and exit ownership, but it must be semantic rather than
decorative:

- logical corner placement compatible with writing direction and viewport edge;
- visible, named, focusable and at least 44×44 actual coarse hit ownership without
  stealing swipe/action targets;
- one exit clock that reconciles close, timeout, Escape, swipe end/cancel and PRM;
- dissolution that never makes text illegible during its useful lifetime and does
  not leave an unclickable transparent layer.

A hard-coded global top-left choice is not earned by one screenshot. The public
contract should permit the house/default logical corner while consumers remain
idiomatic and un-reskinned.

### M7 — Medium: Drawer source direction is strong; live raster/momentum proof is not

Drawer has the best internal motion topology in the overlay group. `useDrawerSnap`
owns one SpringProgress scalar; its writer updates `--glass-drawer-t` and the stage
scalar atomically; force-mount retains the sheet through exit. `DrawerContent.vue`
maps bottom/top/right/left to the appropriate logical offscreen translation
(`:154-173`). Colocated tests cover model reversal, lifecycle, PRM endpoints,
nested instances, Escape and focus return.

Bank that design. Do not call the cohort GREEN: C38's mobile and desktop 0/80/400
frames show the sheet nearly at destination at click-0 and settled by 80ms, with the
underlay heavily blurred. Those frames do not show a readable swept path, drag
release, reverse during the live spring, native-DPR text sharpness, or actual Safari
behavior. Accelerated happy-dom clocks are detectors, not pixel evidence.

### M8 — Medium: Aurora's architecture is credible but compositing remains confessed debt

Aurora has a coherent one-field architecture: one semantic config, one lifecycle,
deferred post-paint arm, explicit CSS substrate, intersection/visibility pause, and
a palette placeholder that stays beneath the canvas. `useAurora.ts:197-223`
replays the current config after deferred arm, avoiding a dropped pre-arm preset.
C38's stage frames are painterly, warm, full-width, and substantially better than
the broken Home composition. Preserve this GREEN and route Home's giant ellipse/
detached lump to its consumer composition.

However, `Aurora.vue:283-303` calls `isolation:isolate` an experimental,
efficacy-unverified hypothesis for a black-slab/backdrop snapshot race and explicitly
says real-app proof is owed. The retained preset 0/100/600ms frames are visually
indistinguishable; that can be a valid immediate parameter replacement, but it is
not proof of authored state-change choreography. The source and pixels therefore
do not close layered-alpha correctness, plate/backdrop interaction, raster sharpness,
frame budget, PRM terminal parity, or actual Safari.

Keep one Aurora runtime and one canvas/placeholder stack. GF-AURORA W7 owns the
real compositing witness and shared VizStudio integration; no opacity axis or second
field renderer follows.

### M9 — Medium: Configurator reach and shared-chassis adoption remain unproved

Configurator's DOM order remains stage→aside, its mobile grid reserves a definite
stage row, and its `auto`/`always` control paths use one FadingScroll owner
(`Configurator.vue:129-190`, `:235-241`). C38 proves a useful stage and the first
controls exist at 390px.

The clipped preset rail does not by itself prove that later presets are unreachable;
it is a horizontal scroll port. The missing evidence is objective: deepest preset
and control reachable by touch, keyboard and sequential focus; selected/focused
reveal; no clipping ancestor hiding a live target; zoom and orientation; one vertical
scroll owner. Demo-private VizStudio still does not wrap the Configurator once in
ExpandableContainer, so fullscreen context continuity is absent. This remains
STORY W6 / GF-AURORA W7 / Expandable work, not a Configurator-local fullscreen fork.

## Shared material and performance ruling

“Compositor-only” is not a sufficient performance or quality claim. Scale,
translate, opacity and filter may avoid layout, but a foreground filter can still
allocate an offscreen surface, rasterize the subtree, blur glyphs/focus rings, and
inflate texture memory. The execution proof must separate:

1. transmissive plate material (`backdrop-filter`, tint, rim, underlay signal);
2. decorative optical modulation that contains no legible content;
3. sharp interactive foreground pixels;
4. geometry motion driven by one current-value authority.

At native DPR, record the panel and foreground bounding/swept geometry, frame times,
long tasks, layer/raster changes, text edge sharpness, alpha/underlay samples and
first-action hit ownership. Test light/dark/high-chroma underlays and concurrent
GPU substrate + overlay. A smooth screenshot at settle does not prove the onset or
compositing path.

## PRM disposition

Source-level PRM intent is substantive but incomplete:

- `.glass-reveal` snaps scale/translate/filter and retains only a short opacity
  fade (`reveal.css:292-319`) — preserve this shape after foreground blur removal;
- Aurora reduces its placeholder→canvas fade to 1ms and its lifecycle has explicit
  pause paths;
- Drawer has endpoint tests and one scalar;
- Blob's substrate freeze makes click impulse a no-op, but pause currently disables
  the press surface and must be separated;
- Expandable has no motion to reduce, so its abrupt topology switch is not a PRM
  success;
- Spring delegates reduced motion to NumericAnimation but lacks live terminal proof;
- Toast inherits reveal PRM but still lacks close/dissolve parity.

No natural Browser PRM series, interrupted PRM action, or actual Safari/VoiceOver
series is retained for this cohort. PRM stays evidence-RED while the source design
GREENs above are banked.

## Born-RED mutation suite

| Mutation | Required failure |
|---|---|
| restore nonzero `filter: blur(...)` on the root of Dialog/Toast content during open or close | native frame/raster detector fails foreground sharpness while plate backdrop blur remains independently tested |
| replace centered/anchor-derived origin with arbitrary top-left/top-right | origin/swept-bounds continuity fails for center and anchored fixtures |
| remove an intermediate overlay frame or jump click-0 directly near terminal geometry | onset/mid/settle trajectory detector fails even if final screenshot matches |
| reverse or re-open Dialog/Drawer during live motion by restarting from endpoint | current-value continuity/reversal detector fails |
| turn Expandable back into an instantaneous Teleport/fixed switch | inline↔viewport swept-geometry and context-continuity detector fails |
| mount a second fullscreen subtree or reset Configurator/Aurora state on expansion | identity/config/canvas/focus continuity detector fails |
| truncate Blob source arrays while a removed satellite is visible, merging, emerging or fissioning | count-totality detector fails disappearance/neck/opacity continuity |
| make `paused` set the named Blob press surface `disabled` | pause-vs-disabled semantic and keyboard/touch action detector fails |
| replay Spring by writing progress `0` while progress is strictly between 0 and 1 | repeated-play C0/C1 continuity detector fails |
| hide ToastClose at coarse rest or shrink its actual hit owner below 44×44 | coarse visibility/eight-point ownership/focus/AT detector fails |
| give Toast timeout, close and swipe separate exit clocks | single-exit-authority and cancellation detector fails |
| remove Aurora isolation or force it without testing plate/backdrop interaction | concurrent Aurora+Glass compositing sentinel fails one of black-slab, blur, alpha or layer-budget arms |
| mark a clipped Configurator choice GREEN without touch/keyboard/focus reveal | deepest-reach detector fails |
| claim PRM from CSS/source alone while a spatial frame remains live | natural Browser PRM terminal-parity detector fails |

These mutations must be run against unchanged source/package/served bytes in the
eventual execution phase. Source-string assertions or synthetic final-state clicks
cannot substitute for them.

## Missing evidence ledger

| Family | Missing evidence before clean adjudication/execution handoff |
|---|---|
| Dialog/Toast reveal | native onset/mid/settle/close/reopen/reverse frames with text-edge and layer/raster truth; first-action hit/focus; actual Safari/VO |
| Drawer | drag release/cancel, live reverse, four directions, coarse/fine, DPR sharpness, nested/topmost focus and actual Safari/VO |
| Expandable | measured inline→fullscreen→inline geometry, interruption/reversal/resize, same-subtree/config/canvas proof, PRM endpoint, real VizStudio/Atlas consumer |
| Configurator/VizStudio | deepest preset/control reach, selected/focused reveal, all scroll/clipping ancestors, zoom/orientation/theme, one fullscreen chassis |
| Blob | core/meatball semantic fixtures, satellite count grow/shrink during every phase, fission reversal, pause-not-disabled, PRM, outboard hit topology, one gallery identity |
| Aurora | real concurrent plate/canvas compositing, alpha/layer order, field update intent, GPU failure/fallback, frame budget, PRM, actual Safari |
| Spring reference | visible unobscured specimen, repeated play, current-value retarget, reverse/cancel, resize, PRM and keyboard activation |
| package/consumer | unique immutable Glass artifact; source→pack→install→served equality; actual Atlas/SCI/value.js receivers; two unchanged-byte clean audits |

## Existing-owner routing

| Delta | Existing owner; no new row |
|---|---|
| foreground reveal blur, overlay interruption/PRM, Toast dissolve/close | `BJ.W-FEEDBACK-MOTION-TUNE` plus the existing Dialog/Drawer/Toast overlay owners |
| Drawer logical edge spring and native receiver proof | existing Drawer/sheet-motion owner |
| one living Blob, total count/fission/pause/action semantics | GF-BLOB W0 / W-SHOW / W-ALIVE / W-TOPOLOGY / W-FINAL + A11Y |
| Aurora compositing and final chassis | GF-AURORA W7 |
| Configurator reach and one shared fullscreen subtree | STORY W6 / GF-AURORA W7 / Expandable |
| Spring reference interruption and visibility | existing motion story/reference owner |
| package and downstream idiomatic consumption | existing package/consumer gates; no receiver shim |

## Required adjudication disposition

The separate adjudicator should:

1. bank the valid GREENs named here rather than retrying settled architecture;
2. accept M1–M4 as exact source-confirmed defects;
3. preserve M5–M9 as bounded proof and integration debts, not invitations to
   create new engines;
4. merge duplicate blur/overlay asks into one foreground-sharpness contract;
5. keep Blob, Aurora, Expandable/VizStudio and feedback deltas on their existing
   owner rows;
6. carry every Browser/Safari/VO/package absence explicitly into the restart-safe
   handoff.

**Final critic status:** Browser detector GREEN; architecture mixed; material,
motion continuity, raster/performance, PRM Browser proof, package/consumer proof,
and acceptance RED. The cohort is ready for independent critics 2 and 3 and then
one bounded adjudication; it is not ready for implementation or release credit.
