# Data and remaining Feedback critic 1 — motion, material, and Breath of Life (C44)

Date: 2026-07-22  
Phase: formation / Browser-evidence criticism only  
Role: independent failure-assuming Sol x-high critic 1  
Product, test, gate, package, lock, repin, release, and acceptance credit: none

## Verdict

**DEFECT / FORMATION RED / ONE POSITIVE MOTION REFERENCE / EXISTING OWNERS
SUFFICIENT / ZERO NEW ROWS OR ENGINES.**

The packet correctly refuses to award interaction or motion credit from rest
frames. Its strongest visual claim also survives criticism: Completion Seal is a
meaningful, finite, semantic event whose disc, ring, check, scale settle, and one
catch-light pass visibly form an intelligible completion sentence. It is the
positive Breath-of-Life reference in this cohort.

That reference is not yet a closed lifecycle. The live story replays by remounting
the entire subtree, while the public composable's `playing` flag never returns to
false after normal playback and `drawn` becomes true at launch rather than at
settle. There is no colocated Completion Seal test. The Browser sequence proves a
good authored gesture, not replay, interruption, generation ownership, truthful
lifecycle state, or assistive announcement behavior.

The remaining motion findings divide cleanly:

1. Confirm Dialog repeats the already-proven shared foreground-blur onset defect.
   A centered origin is natural, but blurred text at its destination is not
   Movement of Momentum. The fix belongs to the existing overlay/feedback motion
   owner, not a new ConfirmDialog component or another reveal engine.
2. Progress and Skeleton have legitimate state-signaling clocks. They need
   reduced-motion and runtime paint proof, but neither should be inflated into a
   hero animation. Progress is an output, not a focusable input; the packet's
   generic demand for “Progress controls” must be narrowed accordingly.
3. Sortable List is the only Data surface in this packet whose core job inherently
   requires spatial motion. Its direct-manipulation ghost is coherent, but the
   source adds a looping gold shimmer to the drop line without a local PRM gate.
   That is an action-coupled cue, not an idle-animation entitlement; static under
   PRM and sharp current-position continuity are the contract.
4. Table, DataTable, Tags Input, Infinite Scroll, Timeline, Fuzzy Search, Virtual
   Section, and Metric do not earn decorative animation quotas. Their jobs are
   hierarchy, feedback, direct manipulation, loading truth, selection, and reach.
   Motion is justified only when it explains a state transition or preserves a
   user's spatial context.
5. The owner has now explicitly ordered Instrument Chassis deprecated and removed.
   C43's favorable static composition observation remains historical Browser truth,
   but no Chassis motion, material, package, or retention work follows. Any common
   pieces survive only after an independent consumer census proves they are not
   Chassis-specific overfit.

Assay A, natural interaction, PRM, interruption/reversal, native-DPR raster, an
immutable installed artifact, and actual Safari/VoiceOver remain absent. Nothing
in C43 closes a component, a row, or the tranche.

## Exact inputs and evidence boundary

| Input | Exact identity |
| --- | --- |
| normative Browser packet | `DATA-FEEDBACK-BROWSER-ASSAY-B-C43.md`, SHA-256 `b4314c5015b1acd58b0ca3582dea8b8cae9b78c0125724a811c7ae397165247d` |
| convergence cursor | `TWELVE-HOUR-CONVERGENCE-BURNDOWN-C34.md`, twelve-hour formation law |
| source commit | `0371836dfeeb3b7982250d612f93b5347a1d29d4` |
| source tree | `97b386172a899ef43b686ffbe43263395b3a7744` |
| Browser Assay B | desktop `1280×720` / DPR 1 / fine pointer and true mobile `390×844` / DPR 3 / coarse pointer / no hover |

C43 contains the exact retained frame hashes. This critic does not restate a
truncated frame identifier as a new identity. The working tree is materially dirty
and the browser surface is source-served. The source hashes below are therefore
formation witnesses only, not an installed-package chain:

| Source | SHA-256 |
| --- | --- |
| `src/components/progress/Progress.vue` | `78330692a87b3be09e13a03b86bd2ba2f6d053b03828e370600d7913fbe84e83` |
| `src/components/skeleton/Skeleton.vue` | `f96bc1744cce9ed3841837b5bae4e4c1c2e8c608de98d1bd9b55b1d507d785b6` |
| `src/components/completion-seal/CompletionSeal.vue` | `e1843e0599c4dab5fa2fd0df1071e04ee7a0094b810c341ef777e180917879a1` |
| `src/components/completion-seal/composables/useCompletionSeal.ts` | `bbce13ca0bb7316d1161a4567665937ed11a26af067629b84da4bf6a35ec6eeb` |
| `src/components/completion-seal/styles.css` | `897b226e2867fc736da82779e84af68f270399e42c25debadf62949927da70d4` |
| `src/components/dialog/DialogContent.vue` | `4143222d5e9d769326657bd779c431545e812f79472476dda68b24f2c0099dac` |
| `src/styles/glass/reveal.css` | `debe9612fdbb0686aa67fdc4355628139320f6e39078c797a99be36b16e85c9f` |
| `src/components/sortable-list/SortableList.vue` | `02736d77012472c4d77bd723689dc3abde35bd844abdbcc94714982c4381c179` |
| `src/components/sortable-list/composables/dragController.ts` | `b40fcbe6335b3f5d5edfd707977472177a918c28afcd306aec140aae1d09a841` |
| `src/components/infinite-scroll/InfiniteScroll.vue` | `0711b15a69f5754503580dba949aaf89fdd0c9006a49a7e33b158655cc969891` |
| `src/components/data-table/DataTable.vue` | `b801596f81fce24f2e324a82f9c9a4378852560650c6a9651d47109d032f4cce` |

The owner's Instrument Chassis retirement direction arrived after the immutable C43
input. This report records it forward; it does not back-edit C43.

## Failure-assuming findings

### M1 — Critical: Confirm Dialog begins with destination-shaped illegibility

C43's desktop and mobile click-0 frames show duplicated/blurred content already
near terminal geometry, while the 80/400ms frames are crisp and stable. This is not
a missing-frame ambiguity. Current `DialogContent.vue:229-235` composes the shared
`.glass-reveal` path for a centered, preset-less dialog. `reveal.css:128-151`
starts that newly inserted open surface with `filter: blur(...)`, opacity zero, and
a small scale; `:158-189` returns to the same blurred surface state on exit.

The centered growth origin is correct for a centered confirmation. The wrong part
is applying optical blur to the surface's own text, buttons, and focus paint. It
creates a hazy duplicate rather than a sharp object emerging through transmissive
material. It also makes the first visible action frame less legible even though the
control is already geometrically near its destination.

The prior living-cohort motion adjudication already owns this mechanism. Preserve
one Dialog kernel, one centered origin, the Reka-awaitable exit, and the backdrop
material. Remove foreground-legibility blur from the shared reveal or confine any
optical modulation to a nonsemantic decorative carrier. Do not create a
ConfirmDialog engine; the story is correctly a consumer preset over Dialog.

**Born-RED mutations:**

- restore `filter: blur(...)` to a semantic Dialog content subtree;
- make click-0 text or focused action fail a sharpness/contrast threshold while
  geometry is already within the actionable envelope;
- move the transform origin to a corner for a centered dialog;
- restart exit from a terminal open snapshot after an interrupted entry;
- let PRM retain a spatial/blur leg instead of the same sharp terminal state.

**Missing evidence:** Assay A, close during entry, reopen during exit, busy-state
dismiss guard, focus entry and return, error path, native-DPR text raster, PRM,
actual Safari, and VoiceOver.

### M2 — High: Completion Seal is visually alive but its lifecycle is not truthful

The C43 sequence is a genuine positive result. It records distinct onset,
construction, and settle states rather than a binary fade. The motion is earned by
the semantic event, stays inside the completion/gold family, and stops. This is the
right distinction between Breath of Life and decorative idle motion.

The implementation nevertheless overclaims its lifecycle:

- `useCompletionSeal.ts:96-114` writes `playing=true` and `drawn=true` together on
  the next animation frame. Normal playback has no end listener or duration owner
  that returns `playing` to false.
- The source comment says the arm is dropped afterward, but no normal-motion path
  drops it. `snap()` clears it only for PRM.
- `completion-seal.vue:12-17` implements “Replay” by changing a Vue key and
  remounting every seal. It does not test the public `draw()` method or a false→true
  `play` generation on a persistent instance.
- Repository search finds no colocated Completion Seal component/composable test.
- The disc sequence spans separate delayed CSS animations through roughly the
  1.36s glint tail. JS does not own or observe that terminal generation.
- Source prose calls the whole recipe compositor-only, but stroke-dashoffset is a
  paint operation and the SVG filter/glow still needs measured raster cost. “No
  layout animation” is true; “compositor-only” is not established.

Do not discard the gesture. Give one owner the generation and terminal contract,
or narrow the exposed state so it does not claim more than it knows. A successful
replay must not require subtree replacement; an interrupted old generation must
not clear or restyle a newer one. PRM shows the same final seal instantly and must
not arm a stale playing state.

**Born-RED mutations:**

- keep `data-play` armed after its terminal animation and require the lifecycle
  detector to fail;
- set `drawn` at launch, then interrupt/unmount before any glyph becomes visible;
- fire `draw()` twice inside one disc sequence and let the older delayed glint win;
- toggle `play` false→true without remount and fail to restart from a clean
  current generation;
- flip PRM during ring/check delay and leave a timer, animation, or `playing` arm;
- restore the active Tabs adornment's live label/status and duplicate the selected
  control announcement.

**Missing evidence:** persistent-instance replay, interruption, cancellation,
rapid re-entry, unmount, PRM at rest and mid-sequence, 30/60/120/240Hz sampling,
DPR 1/2/3 raster, dark/light material, installed CSS, Safari/VoiceOver, and a
consumer-local decorative Tabs arm.

### M3 — High: Progress has legitimate clocks, but rest frames prove none of them

Progress is not a generic animation surface. It is a status output whose spatial
fill may transition when a value changes, whose gradient may acknowledge intake or
completion once, and whose indeterminate state needs a bounded repeating cue while
duration is unknown. Current source has all three families:

- a determinate fill transition;
- one-shot gradient intake/discharge animations; and
- a four-second infinite indeterminate sweep/rise.

The local PRM block suppresses those clocks and snaps the fill. That is a credible
source direction, not Browser proof. C43 retained rest only; it did not change a
value, enter or leave indeterminate, cross the loading/complete boundaries, or
exercise effective generated CSS. The existing global PRM policy has also moved
during formation, so a source-local rule cannot certify the installed cascade.

C43's generic “Progress controls” requirement is overbroad. A native
`role=progressbar` is normally an output, not a focus target or an action. Focus and
keyboard proof belongs only to a real consumer control that owns a Progress child,
not the Progress primitive itself. This correction reduces the proof matrix without
lowering its rigor.

Keep one shared track/mark structure under `BJ.W-TRACK-DRY` and the typed Progress
color property under `R-TRACK-PUBLIC-BREAK`. Do not absorb Timeline, add Progress
inversion, invent a third track axis, or add animation merely to make the static
variants feel alive.

**Born-RED mutations:**

- leave the indeterminate sweep running or advancing under effective PRM;
- resurrect a fill transition through a later wildcard despite local
  `transition:none`/zero duration;
- restart intake/discharge continuously on unrelated parent renders;
- animate marks or track geometry rather than the value fill;
- let a 100%→lower-value reversal pop or begin from a stale endpoint;
- put a gradient into the Progress `<color>` property or hide an inherited
  approved override;
- move a fractional mark/fill center by one physical pixel at DPR 1/2/3.

**Missing evidence:** Assay A, value-change onset/mid/settle/reversal,
indeterminate start/stop, exact effective PRM, vertical and RTL frame series,
fractional/DPR mark geometry, forced colors, both public CSS entries, immutable
package, Chromium, actual Safari, and real installed consumers.

### M4 — Medium: Skeleton is quiet loading feedback, not a showcase animation

Skeleton's role is reserved geometry and latency legibility. Its shimmer can
communicate that the placeholder is live, but it must remain subordinate. Current
source places the scan only inside `prefers-reduced-motion: no-preference`, and the
component strips role/ARIA so loading semantics remain with the parent. Those are
sound boundaries.

The existing test enforces a three-second token and distinguishes it from the
five-second metal sweep by parsing source text. It does not prove that the band is
subtle, that caller geometry/radius still wins in emitted CSS, that replacement
does not flash, or that PRM produces a stable quiet placeholder. C43's still frame
cannot even prove that a scan was running.

Do not add bounce, scale, glow, or a replacement flourish. The correct Breath of
Life is a restrained, low-contrast loading cue that yields immediately when real
content arrives. Layered media/caller shape remains `BJ.W-RADIUS-ROLE` /
`R-RADIUS-PUBLIC-BREAK`; the clock remains `BJ.W-FEEDBACK-MOTION-TUNE`.

**Born-RED mutations:**

- move the scan outside the no-preference gate;
- bind it back to the brand-metal sweep or add an independent duration literal;
- raise the shimmer contrast until it becomes the page's chroma event;
- animate the root's size/radius and cause content replacement shift;
- let a later generated rule defeat a caller shape utility or PRM suppression.

**Missing evidence:** Assay A, natural loading→content replacement, caller shape
matrix, constrained/card/table receivers, effective PRM and transparency modes,
forced colors, native-DPR raster, immutable package, Chromium, and Safari/VO.

### M5 — High: Sortable owns necessary momentum, but the shimmering drop line is not free

Sortable is the motion-critical Data component. Pointer dragging requires the
ghost to follow the pointer without lag; keyboard reordering requires immediate
proposal feedback and focus continuity; cancellation/reversal must return the item
without a teleport or duplicate. C43 captures none of that.

Current source does contain a coherent single interaction authority:

- one drag controller owns pointer capture and document move/up/cancel cleanup;
- one ghost follows client coordinates;
- one mutually exclusive insertion edge is resolved at a time; and
- commit/cancel returns focus and announces the outcome.

However, `SortableList.vue:133-165` paints the insertion line as a looping gold
shimmer, with halo and glow, for the duration of the drag. It has no local PRM
gate. The global wildcard may shorten it in the current moving source, but only the
immutable emitted cascade can prove that. More importantly, the direct-manipulation
contract does not require a metallic marquee. A static, crisp, high-contrast line
is enough under PRM and may be the better default if the shimmer competes with the
dragged object.

The ghost's fixed `rotate(1.5deg)` and large gold halo are also aesthetic choices,
not correctness. Retain only if dual live assays show they improve pickup and
destination comprehension without blur, text degradation, or trite shine.

**Born-RED mutations:**

- leave the insertion shimmer advancing under PRM;
- release pointer capture or lose pointer identity mid-drag;
- render both above and below lines for one insertion boundary;
- let the ghost lag/jump across scroll or a foreign list;
- commit a different index from the visible line;
- cancel without destroying the ghost, clearing line state, restoring focus, and
  announcing cancellation;
- reorder by keyboard while the visible row and focus owner diverge;
- animate layout so neighboring rows jitter instead of explaining the new order.

**Missing evidence:** Assay A, trusted coarse/fine pointer drag, keyboard lift/move/
drop/cancel, cross-list transfer, auto-scroll, scroll during drag, reverse travel,
pointercancel/lost capture, dynamic row heights, PRM, focus/announcement delivery,
DPR raster, actual Safari/VoiceOver, and installed package truth.

### M6 — High: Table status failure is responsive hierarchy, not a motion deficit

C43 correctly records the 390px failure: `Paid`, `Pending`, and `Overdue` wrap one
glyph per line and the Amount column is outside the initial view. The source story
uses a horizontally scrollable public Table container, then wraps it in an
`overflow-hidden` card. It also applies a full loud-outline Badge for every status.
Without computed layout, scroll/reach, and Assay A, the packet cannot allocate the
root cause between the story wrapper, table minimum content, Badge sizing, and the
intended responsive policy.

Motion does not cure this. Animating columns, shrinking labels during scroll, or
adding a moving gradient would conceal rather than solve it. The status must remain
one readable semantic unit. The material hierarchy contributes only if Badge's
public padding/radius/surface makes the minimum status size incompatible with the
selected mobile reflow after a correct reach policy exists.

**Born-RED mutations:**

- permit a status token to wrap between glyphs;
- hide or clip a required column without a reachable reflow/scroll/card path;
- scroll a column into view while losing its header/cell association or focused
  control;
- solve the story with a private Badge selector, copied pill, or animated label;
- make status material dominate the row when a quieter public Badge surface is
  semantically sufficient.

**Missing evidence:** Assay A, actual horizontal-scroll reach, focus reveal,
selected policy under 320/390/430px and zoom, long/localized statuses, RTL,
coarse-pointer targets, forced colors, and real consumers. No new Table or Badge
primitive is warranted by this frame.

### M7 — High: DataTable's advertised responsive transition is not represented live

The mobile frame keeps the wide table and clips later columns even though the story
passes `responsive`. Source intends a container-driven card projection below 640px.
The live mismatch is therefore stronger than “tables are naturally wide”: either
the measured container remains above the breakpoint, intrinsic sizing prevents the
expected shrink, observation/readiness is wrong, or the story's surrounding layout
does not provide the claimed narrow receiver.

This remains a responsive/system defect, not an argument for a reflow animation.
If table→card projection changes, the selected row, roving focus, actions, and
logical fields must remain the same state owners. A subtle transition may be used
only after those invariants are proved and only if it does not create a duplicate
accessible tree during the switch.

The G4 row-ref closure defect remains independent. Inline closures at both card and
table projections can create lifecycle churn; visual clipping neither proves nor
weakens that mechanism. ASK-8 still decides retain/thin/demo-private/remove. Do not
invest in responsive motion until that product disposition is frozen.

**Born-RED mutations:**

- keep the table projection when the actual measured content box is below the
  accepted breakpoint;
- render both projections as accessible/focusable during a transition;
- change projection and lose selected row, tabbable key, action, or focused-field
  reveal;
- restore per-render inline row-ref closure identity;
- update a same-key row or replace a handler and emit a false DOM unmount/mount;
- animate max-width in the story and claim that as component responsiveness.

**Missing evidence:** Assay A, measured root/content/intrinsic widths, breakpoint
crossing both directions, ResizeObserver readiness, all states in both projections,
row/action focus retention, G4 lifecycle mutations, zoom/RTL/forced colors, Safari/
VO, installed package, and ASK-8 disposition.

### M8 — Medium: Tags Input needs event feedback, not ornamental motion

The rest frame is plausible and the chips wrap at 390px. That does not exercise the
component's job. Meaningful movement is limited to preserving cursor/focus context
when chips are added or removed and making invalid/duplicate feedback perceivable.
It does not require chips to fly, bounce, shimmer, or dissolve.

The material owner remains `R-SHIPPED-MATERIAL` W7 for real delete paint and
`BJ.W-RADIUS-ROLE` for field/control shape. Motion belongs to the shared feedback
owner only if a retained add/remove transition is specified. A static insertion or
removal is acceptable when focus and announcement are correct.

**Born-RED mutations:**

- delete a chip and move focus to nowhere or an unrelated control;
- animate removal while the chip remains an invisible hit target;
- paste several tokens and announce duplicates/errors repeatedly or out of order;
- let wrapping shift the input outside the reachable viewport;
- use a private Chip/field class to repair paint or motion;
- keep add/remove travel under PRM.

**Missing evidence:** Assay A, type/add/paste/duplicate/invalid, Backspace selection,
delete click and keyboard action, focus handoff, constrained wrapping, coarse hit
ownership, PRM, installed cascade, Safari/VoiceOver.

### M9 — Medium: Infinite Scroll's spinner is meaningful, but loading truth is unproved

The loading spinner is action-coupled status, not decorative idle breath. Source
adds `animate-spin` while `isLoading` and a persistent polite status string for
loading/exhausted transitions. That is a valid shape if it starts only for a real
load, stops on every terminal/error/unmount path, and the effective PRM cascade
reduces it to a stable loading indicator.

C43's mobile frame remains empty/loading. It cannot prove progression, repeat
suppression, errors, exhaustion, coalesced announcement, or observer cleanup. The
generic global PRM fallback in the dirty source is not immutable package evidence.

**Born-RED mutations:**

- allow two observer hits to issue concurrent duplicate loads;
- keep the spinner/observer active after exhausted, error, reset, or unmount;
- announce identical loading strings repeatedly without a state generation;
- spin under effective PRM without a static equivalent;
- append content and move focus/scroll unexpectedly;
- allow the fixed demo Dock to occlude the sentinel or final reachable item and
  attribute that to Infinite Scroll.

**Missing evidence:** Assay A, trusted scroll, slow load, error/retry, reset,
exhaustion, repeated intersection, background/visibility changes, nested scroll
owner, PRM, AT announcements, Safari observer behavior, and installed package.

### M10 — Medium: Timeline owns a different continuity problem and stays outside W4

Timeline's discrete rest composition is legible. Its meaningful motion, if retained,
is the exact correspondence between scrub position, selected event, focus, and
content—not a Progress-style fill flourish. C43 captures no scrub, click, key,
reverse, RTL, resize, or interruption state.

Keep it under `BJ.W-REDUCE-TIMELINE`. Do not adopt the W4 track/mark structure or
its animation merely because both draw rails. A collapse/retention decision must
precede further polish.

**Born-RED mutations:**

- make pointer or keyboard selection settle on a different event than the visible
  indicator;
- reverse/resize/RTL and let the indicator jump or use stale geometry;
- animate a continuous rail while the selected semantic event has already changed;
- duplicate focus/action owners across segmented and continuous presentations;
- restore motion under PRM or add an idle pulse to the selected event.

**Missing evidence:** Assay A, both presentations, trusted pointer/keyboard scrub,
selection announcement, interruption/reversal, scroll/resize/RTL, PRM, DPR,
Safari/VO, and the owner collapse ruling.

### M11 — Medium: Fuzzy Search, Virtual Section, and Metric need no idle animation budget

These three rest compositions are readable enough to continue formation, but none
earns decorative animation from that fact.

**Fuzzy Search** needs synchronous query/result/focus truth. Any movement should
preserve active-descendant context as results reorder; a placeholder flourish or
animated result count is not required. The removed public `FuzzySearch` ledger and
floating-vs-bare Search role remain the owners. Do not recreate a public component
from the demo.

**Virtual Section** needs native scroll continuity, correct window correction, and
focus reveal. Custom easing layered over user scroll would be counterproductive.
Its demo-owned virtualization should remain demo-owned unless a fresh consumer
census and owner ruling justify a public primitive.

**Metric** is strongest as a stable typographic readout. Optional actions need
ordinary feedback; value transitions, count-up, shimmer, or glowing idle states are
not presumed. Existing cross-repo reduction and public-props/slots ownership is
sufficient. Consumer private selectors remain deletion work, not a motion seam.

**Born-RED mutations:**

- reorder search results and leave `aria-activedescendant` or focus on a removed
  item;
- animate query results while hit geometry and visual geometry disagree;
- jump a Virtual Section window and lose focused content or exact scroll position;
- smooth-scroll under PRM or fight native user momentum;
- animate a Metric value without a consumer request, stable textual value, or PRM
  terminal parity;
- revive removed public APIs or private internal selectors as animation hooks.

**Missing evidence:** Assay A; query/ranking/highlight/empty/error/active descendant;
far jump/reverse/dynamic heights/focus reveal; Metric absent/loading/action/value
change; PRM, forced colors, zoom, RTL, Safari/VO, installed package, and current
consumer census.

### M12 — Owner-final: Instrument Chassis is retirement work, not a redress target

The Browser frame can remain a useful negative/archaeological reference for compact
data hierarchy. It cannot override the owner's explicit direction to deprecate and
remove Instrument Chassis totally alongside overfit surfaces. No new Chassis motion
test, package proof, consumer migration into a successor Chassis, or visual polish is
authorized.

The retirement packet must be lossless:

- census every public/subpath export, type, style, test, story, documentation link,
  and first-party/external consumer;
- classify any genuinely shared primitive separately from the Chassis composition;
- remove story navigation and package surface in the authorized clean break;
- migrate only real consumer needs into existing public primitives, never a renamed
  Chassis clone;
- delete `[data-reserve]` cross-component policy leakage rather than preserving it
  as a compatibility hook; and
- add a born-RED export/story/consumer absence mutation when execution is later
  authorized.

“Alongside all overfit items” is a portfolio criterion, not permission for this
critic to delete unnamed components. In this cohort, DataTable remains ASK-8-held,
Virtual Section remains demo-owned, and Fuzzy Search remains removed-public-ledger
work. Their retention/retirement decisions must be explicit in the reduction
portfolio rather than inferred from Chassis.

## Component-by-component motion disposition

| Surface | Meaningful motion obligation | Explicit non-obligation | Existing owner |
| --- | --- | --- | --- |
| Progress | value continuity; one-shot state cue; bounded indeterminate status | focusability; bounce/glow quota; Timeline adoption | `BJ.W-TRACK-DRY`, `R-TRACK-PUBLIC-BREAK`, `BJ.W-FEEDBACK-MOTION-TUNE` |
| Skeleton | quiet loading scan; instant content yield | hero arrival, bounce, size/radius animation | `BJ.W-FEEDBACK-MOTION-TUNE`, `BJ.W-RADIUS-ROLE`, `R-RADIUS-PUBLIC-BREAK` |
| Confirm Dialog | sharp center-origin enter/exit; interruption and focus continuity | new ConfirmDialog engine; foreground-text blur | `BJ.W-FEEDBACK-MOTION-TUNE`, existing Dialog/overlay owner |
| Completion Seal | finite semantic draw/settle/glint; truthful generation | idle loop; global decorative demotion | `BJ.W-REDUCE-FEEDBACK-MARK`, `BJ.W-REDUCE-CROSSREPO-GATED`, consumer-local `R-TABS-ADORN` |
| Table | optional focus/scroll reveal only | animated reflow or status marquee | `BJ.W-RESPONSIVE-AUDIT`, Table/Badge responsive composition |
| DataTable | projection continuity only after ASK-8 | responsive-animation polish before disposition | `BJ.W-REDUCE-DELETE`, `R-DATATABLE-REF`, `BJ.W-RESPONSIVE-AUDIT` |
| Tags Input | focus-preserving add/remove feedback if retained | flying/bouncy/shimmering chips | `R-SHIPPED-MATERIAL`, `BJ.W-RADIUS-ROLE` |
| Sortable List | direct pointer/keyboard spatial continuity and cancellation | perpetual metallic drop-line animation | existing Sortable interaction owner, `BJ.W-RADIUS-ROLE`, `BJ.W-FEEDBACK-MOTION-TUNE` PRM policy |
| Infinite Scroll | loading-only progress cue; stable append | idle loop outside loading; animated announcement | `BJ.W-A11Y-LIVE-REGIONS`, `BJ.W-FEEDBACK-MOTION-TUNE` |
| Timeline | selected-event/rail continuity if retained | Progress/W4 adoption; idle selected pulse | `BJ.W-REDUCE-TIMELINE` |
| Fuzzy Search | active-result continuity during query reorder | public-component resurrection; animated placeholder/count | `R-PUBLIC-8-LEDGER`, `BJ.W-RADIUS-ROLE` Search role |
| Virtual Section | native scroll/focus continuity | new public engine; ornamental smooth scrolling | demo-owned virtualization pending census/ruling |
| Metric | optional value continuity only with consumer need | assumed count-up/glow/shimmer | `BJ.W-REDUCE-CROSSREPO-GATED` |
| Instrument Chassis | none; preserve only retirement evidence | all polish, motion, package, successor-Chassis work | owner-directed retirement through reduction/public-ledger clean break |

## Required unchanged-packet Browser matrix

Assay B is only one half of the formation denominator. Assay A must be genuinely
independent and must not reuse B's session, script, detector, or inferred state.
For the motion-bearing surfaces, both assays owe:

| Family | Required natural cells |
| --- | --- |
| Confirm Dialog | rest; open 0/mid/settle; close; close-during-open; reopen-during-close; busy guard; focus entry/return; PRM |
| Completion Seal | persistent-instance play; mid-replay; cancel/unmount; rapid generation; every shape; PRM; consumer-decorative arm |
| Progress | value up/down; lifecycle thresholds; complete→lower; indeterminate start/stop; horizontal/vertical/RTL; PRM |
| Skeleton | natural load→content replacement; three caller shapes; PRM; transparency/forced-colors |
| Sortable | pointer and keyboard lift/move/drop/cancel; reverse; auto-scroll; cross-list; PRM |
| Infinite Scroll | loading/error/retry/exhaustion/reset; repeated observer; nested scroller; PRM |
| Timeline | segmented/continuous pointer+keyboard; reverse/interrupt; resize/RTL; PRM |

For static data surfaces, a four-timestamp animation film is not required. Both
assays instead owe rest plus the smallest complete natural interaction sequence.
Static surfaces must fail if a new idle animation appears without an owner-approved
semantic job.

Every dynamic cell records exact source, served source, packaged artifact where
applicable, viewport, DPR, pointer/hover media, PRM, theme, route, action, target,
timestamps, geometry, computed animation/transition names and clocks, active WAAPI
objects, screenshot hashes, console/page errors, and terminal focus/ARIA state.

Actual Safari/VoiceOver is not replaceable by a WebKit user-agent label, a synthetic
CSS support branch, or Chromium accessibility-tree output.

## Born-RED mutation register

| ID | Mutation | Expected RED detector |
| --- | --- | --- |
| DF-M01 | restore foreground `filter:blur` on Dialog content | click-0 sharpness/actionability and raster arm |
| DF-M02 | move centered Dialog origin to a corner | origin/geometry continuity arm |
| DF-M03 | leave Completion Seal `playing` armed after settle | lifecycle terminal-state arm |
| DF-M04 | use subtree remount as the only Seal replay path | persistent-instance replay arm |
| DF-M05 | let old Seal delayed glint win after a new play generation | generation/interruption arm |
| DF-M06 | run Progress indeterminate or fill transition under PRM | effective PRM arm |
| DF-M07 | animate Progress marks/track geometry | stationary-reference geometry arm |
| DF-M08 | move Skeleton scan outside no-preference or raise it to brand-metal | PRM/subtlety arm |
| DF-M09 | keep Sortable gold shimmer moving under PRM | direct-manipulation PRM arm |
| DF-M10 | render two Sortable insertion lines or mismatched drop index | visible-proposal/commit parity arm |
| DF-M11 | wrap a status one glyph per line | Table mobile readability arm |
| DF-M12 | clip a required table column without reachable policy | Table/DataTable reach arm |
| DF-M13 | render both DataTable projections focusable | projection a11y/isomorphism arm |
| DF-M14 | restore DataTable per-render row-ref closures | G4 lifecycle arm |
| DF-M15 | remove/reorder a chip and lose focus/announcement | Tags Input event-feedback arm |
| DF-M16 | duplicate Infinite Scroll load or live announcement | load-generation/live-region arm |
| DF-M17 | move Timeline indicator apart from semantic selection | timeline continuity arm |
| DF-M18 | attach idle motion to Table, DataTable, Search, Virtual, or Metric | no-decorative-quota arm |
| DF-M19 | retain any Instrument Chassis export/story/consumer after authorized removal | retirement absence arm |

Mutation evidence must record changed and restored byte hashes and prove that the
target detector changes GREEN→RED→GREEN. Source regex presence is insufficient for
paint, timing, cascade, lifecycle, or package claims.

## Conflicts resolved for adjudication

1. **Completion Seal is retained as a positive visual reference, not declared
   lifecycle-GREEN.** Its Browser choreography survives; replay and state ownership
   remain RED.
2. **Static components receive no animation quota.** Breath of Life is semantic
   responsiveness and material presence, not mandatory continuous motion.
3. **Progress is not a focusable control by default.** Its output semantics remain;
   a consumer control owns focus.
4. **Sortable shimmer is conditional, not canonical.** Direct manipulation needs a
   stable spatial cue; a looping metallic cue must prove subtlety and PRM or become
   static.
5. **Table/DataTable mobile failures are not solved by motion.** Material is charged
   only where its public minimum size or hierarchy remains incompatible after a
   correct responsive policy.
6. **Instrument Chassis is retired despite a visually coherent rest frame.** Visual
   quality does not override product ontology or justify an overfit public surface.
7. **Existing owners suffice.** Every retained defect maps to current motion,
   responsive, reduction, track, radius, live-region, overlay, or public-ledger
   authority. No new tranche row is earned.

## Disposition

This first failure-assuming pass is **frozen RED**. It banks Completion Seal's
finite semantic choreography and corrects three possible overreaches in C43:
Progress does not owe input focus, static data surfaces do not owe decorative
animation, and Instrument Chassis no longer has a retention path.

Route the bounded mechanisms as follows:

- shared own-pixel overlay blur and effective PRM policy →
  `BJ.W-FEEDBACK-MOTION-TUNE` plus the existing Dialog/overlay owner;
- Completion Seal lifecycle and consumer-local decoration →
  `BJ.W-REDUCE-FEEDBACK-MARK`, `BJ.W-REDUCE-CROSSREPO-GATED`, and
  `R-TABS-ADORN` only where embedded in a selected control;
- Progress/Skeleton material and package truth → `BJ.W-TRACK-DRY`,
  `R-TRACK-PUBLIC-BREAK`, `BJ.W-RADIUS-ROLE`, and
  `R-RADIUS-PUBLIC-BREAK`;
- Table/DataTable reach → `BJ.W-RESPONSIVE-AUDIT`, ASK-8,
  `BJ.W-REDUCE-DELETE`, and `R-DATATABLE-REF`;
- Infinite Scroll → `BJ.W-A11Y-LIVE-REGIONS`;
- Timeline → `BJ.W-REDUCE-TIMELINE`;
- Metric and public-removal census → `BJ.W-REDUCE-CROSSREPO-GATED` /
  `R-PUBLIC-8-LEDGER`; and
- Instrument Chassis → explicit owner-directed retirement in the reduction and
  public-surface clean-break ledger.

No product/test/package/consumer edit, new primitive, new clock, new row, repin,
or acceptance claim follows. Separate independent systems and interaction/a11y
critics must challenge the unchanged C43 packet, then an independent adjudicator
must reconcile all three with Assay A and the owner retirement direction.
