# Data and remaining Feedback critic 2 — accessibility, interaction, and reach — C44

**Date:** 2026-07-22  
**Seat:** independent failure-assuming Sol x-high critic 2  
**Phase:** formation only  
**Product, test, gate, package, lock, repin, release, and acceptance credit:** none

## Verdict

**DEFECT / RESPONSIVE REACH RED / COARSE-ACTION RED / KEYBOARD+FOCUS RED /
AT+PRM RED / EXISTING OWNERS SUFFICIENT / ZERO NEW PRIMITIVES.**

The frozen C43 Browser packet is valuable and truthful as a rest-and-sparse-motion
assay. It is not an interaction or accessibility close. Its two strongest visual
falsifiers survive: the Table's status words collapse into one-glyph lines at
390px, and the DataTable does not show its advertised card projection in the
retained mobile frame. Neither frame establishes whether horizontal scrolling is
possible, whether a hidden control is focus-revealed, or whether a trusted action
succeeds. Those remain explicit missing states rather than inferred failures.

The source reconciliation adds four material findings:

1. responsive selectable DataTable cards use `listbox`/`option` semantics while
   allowing an interactive row-action button inside each option; that is not a
   valid or robust accessibility tree for the actual story;
2. the TagsInput validation specimen marks the input invalid but neither links
   the transient error copy nor announces it;
3. the Fuzzy Search story says screen readers hear the running result count, but
   its count is an ordinary Badge and the rendered result Cards expose no
   keyboard selection or active-descendant relationship; and
4. the Progress story's JavaScript loop continues changing the semantic progress
   value under reduced motion, while several canonical specimens have no
   accessible name.

The strongest positive substrates are retained narrowly: native Table semantics
and an overflow container exist; DataTable has real sort/selection/roving code;
TagsInput composes Reka and names delete controls; SortableList has native handles,
a keyboard transaction, cancellation, focus return, and a polite transaction
region; Skeleton is correctly decorative with caller-owned busy context; Progress
uses a semantic Reka progressbar; and Dialog is one shared modal kernel. None of
those source facts substitutes for the required true-mobile, keyboard, AT, PRM,
focus-reveal, and installed-package matrix.

The owner has separately and explicitly deprecated Instrument Chassis. C43's
positive visual observation is historical evidence only and cannot become a
survival argument. This seat binds that removal to the existing cross-repository
reduction owner rather than spending accessibility work on a component that must
be removed.

## Frozen input and source cursor

This seat read the following immutable formation inputs in full:

| Input | SHA-256 |
| --- | --- |
| `DATA-FEEDBACK-BROWSER-ASSAY-B-C43.md` | `b4314c5015b1acd58b0ca3582dea8b8cae9b78c0125724a811c7ae397165247d` |
| `OVERFIT-SUBTRACTION-OWNER-RULING-C45.md` | `ef7abd0d52af58b91ef2310a9b969b6dd958dae2a55e39f60bfff9c50ef2ff5f` |

Repository identity during source reconciliation:

- HEAD `0371836dfeeb3b7982250d612f93b5347a1d29d4`;
- tree `97b386172a899ef43b686ffbe43263395b3a7744`;
- worktree dirty before this seat began;
- no dirty test, package, gate, or formation file is treated as a candidate;
- no source, test, package, or route was edited by this seat.

Selected exact source witnesses:

| Witness | SHA-256 |
| --- | --- |
| `src/components/table/Table.vue` | `268c7f8075dd314b1cdcd1a43f23b214567e6d7f0aa01a447da866e0d9fcbcad` |
| `demo/stories/data/table.vue` | `d2ee4f0f9af83457db8dabf4af11c223e334c908af5d99439cb837e14ff79283` |
| `src/components/data-table/DataTable.vue` | `b801596f81fce24f2e324a82f9c9a4378852560650c6a9651d47109d032f4cce` |
| `useDataTableResponsive.ts` | `3d59b48ed93456878caab7b418edc3f016b0b6775a6f49ec64a29f0a67b87e0f` |
| `useDataTableRowIdentity.ts` | `af8c71616de3a8701dc4db8fbaaf802b867e62dad48622c572e0271fa85ef859` |
| `demo/stories/data/data-table.vue` | `a4bbcb9f3b7ea2036e3448131ba49f0dd993155f31779c3338adecab4294ef17` |
| `src/components/tags-input/TagsInput.vue` | `21558765f76366ab58c30e4be64e0ade0da18a6e4cd32c4d41d347fc212daf71` |
| `src/components/tags-input/TagsInputItemDelete.vue` | `6e32c7b4cc7bbe4fa49a0b01d31c8d0edea3bbdfad041ebd2a553bf947fd4592` |
| `src/components/tags-input/styles.css` | `fc2b6d1dd50143729765d3fb647219157f8759fe3c7b4484f4299b337ad4b01d` |
| `src/components/sortable-list/SortableList.vue` | `02736d77012472c4d77bd723689dc3abde35bd844abdbcc94714982c4381c179` |
| `sortable-list/composables/dragController.ts` | `b40fcbe6335b3f5d5edfd707977472177a918c28afcd306aec140aae1d09a841` |
| `src/components/infinite-scroll/InfiniteScroll.vue` | `0711b15a69f5754503580dba949aaf89fdd0c9006a49a7e33b158655cc969891` |
| `demo/stories/data/search.vue` | `331d6c685837ceb95247f08143a7b994f1223361e7a660958497397bf27d01af` |
| `demo/stories/data/virtual-section.vue` | `e1bf130ba783eb9e65a02086b376fea824d3ffa6f002be3d3409f8fb5444ebc0` |
| `src/components/completion-seal/CompletionSeal.vue` | `e1843e0599c4dab5fa2fd0df1071e04ee7a0094b810c341ef777e180917879a1` |
| `useCompletionSeal.ts` | `bbce13ca0bb7316d1161a4567665937ed11a26af067629b84da4bf6a35ec6eeb` |
| `src/components/progress/Progress.vue` | `78330692a87b3be09e13a03b86bd2ba2f6d053b03828e370600d7913fbe84e83` |
| `src/components/skeleton/Skeleton.vue` | `f96bc1744cce9ed3841837b5bae4e4c1c2e8c608de98d1bd9b55b1d507d785b6` |
| `src/components/instrument-chassis/InstrumentChassis.vue` | `74496580fb19e11db8e9c930b5fa239bf8c5431b0f20ca11fe2baba38fb2be57` |

The C43 desktop/mobile frame hashes are accepted exactly as listed there. This
seat does not reinterpret a PNG as DOM, accessibility-tree, hit-test, focus,
scroll, announcement, or reduced-motion evidence.

## 1. Table — native structure survives; mobile legibility and reachable-width policy fail

`Table.vue` retains a native `<table>` inside `overflow-auto`. That is a sound
semantic starting point. The ordinary invoice story, however, gives its table no
minimum readable measure, reflow policy, or mobile alternative. The browser is
therefore free to compress its cells until the Badge status words render one
glyph per line. The status remains programmatically text, but visual recognition,
zoom, translation, and low-vision reading are materially impaired.

C43 says the Amount column is outside the initial mobile view. Because the
container is scrollable, the frame does **not** prove the column is unreachable.
It proves that initial composition does not preserve a readable status or expose
the full row. Closure must choose and prove one idiomatic policy—honest horizontal
scroll, a responsive row/card projection, or deliberate column prioritization—
without severing header/cell associations. This critic does not prescribe which.

Born-RED detector:

- at 390px coarse, 200% and 400% zoom, every status token remains a readable
  word rather than a one-glyph column;
- a keyboard user reaches the final Amount cell and any row action, with the
  focused cell scrolled fully into view;
- VoiceOver traverses each row with the correct Invoice/Customer/Status/Method/
  Amount headers after the chosen responsive policy;
- an RTL and long-localized status mutation does not overlap, truncate the only
  status meaning, or detach headers;
- restoring the compress-to-glyph policy turns the detector RED.

Route to the existing responsive/story composition owner and status-contrast
owner. No new Table primitive or status component follows.

## 2. DataTable — responsive paint RED and responsive semantics structurally contradictory

### What is bankable

DataTable has real mechanisms rather than story-only prose:

- a `ResizeObserver`-driven container breakpoint;
- a card projection when `responsive` is true and measured width is below the
  breakpoint;
- stable row-key validation;
- truthful `aria-sort` on sortable headers;
- controlled selected/tabbable row identity;
- ArrowUp/ArrowDown/Home/End roving and Enter/Space selection; and
- error, empty, filtered-empty, loading, and `aria-busy` states.

These facts make the missing mobile card projection more serious, not less. The
canonical story explicitly supplies `responsive`; C43's mobile frame still shows
the wide projection. The root itself uses `overflow:hidden`, while the nested
Table owns `overflow-auto`. Without exact root/container/table clientWidth,
scrollWidth, ResizeObserver and `isCard` receipts, the failure cannot yet be
assigned to measurement, CSS containment, capture timing, or a story wrapper.

### Source-confirmed semantic conflict

When selectable cards do render, `DataTable.vue:280-332` creates a
`role="listbox"` whose card roots are `role="option"`. The same card can contain
the `row-actions` slot; the canonical story supplies an `Inspect` Button. A
listbox option is not a sound host for an independently interactive descendant:
the nested button can be flattened, skipped, or conflict with option selection
in accessibility APIs. The component cannot claim both one selectable option and
an independently actionable Inspect control without selecting a valid composite
model and proving it in AT.

Further, `focus({ preventScroll:true })` is used after selection, roving and
update restoration. Preventing scroll is not visibility proof. On projection
switch, reorder, filter, same-key replacement, or a Dock overlap, focus can be
logically retained while remaining visually clipped.

Born-RED matrix:

1. start wide with focus on a row and its Inspect action, cross the live
   breakpoint in both directions, and retain the logical target or move focus to
   an explicitly documented equivalent;
2. at mobile, expose every column/value and Inspect action through a valid AT
   structure—never an interactive descendant hidden inside an option;
3. run Arrow/Home/End, selection, nested Inspect, sort, filter, empty/error/
   loading, and caller-windowed row indices through Chromium and Safari/VO;
4. reorder, replace a row with the same key, replace the `rowRef` handler, add/
   remove keys, and verify visible focus plus the existing stable-ref handoff;
5. mutate the card projection back to listbox-with-button, restore inline ref
   closures, force `isCard=false`, or hide the focused action and require RED.

This remains `R-DATATABLE-REF` after ASK-8 / REDUCTION W3. If ASK-8 removes or
demo-privatizes DataTable, do not repair a public API that no longer survives;
delete/migrate the receiver instead. No new responsive-table primitive.

## 3. TagsInput — a credible native composition with an unlinked error contract

The component composes the Reka root/input/item primitives, forwards invalid
state, names each remove control as `Remove <value>`, and authors a 44px coarse
delete box. C43's rest frame proves wrapping and readable labels only. It does not
prove any of those action regions or keyboard transactions.

The validation story's error is source-confirmed incomplete. The input receives
`aria-invalid`, but the transient `Rejected: …` paragraph has no stable ID, no
`aria-describedby`/`aria-errormessage` linkage and no live role. It disappears
after 2.4 seconds. A screen-reader or speech-input user can therefore receive an
invalid state without the reason, and a user who misses the timeout loses it.
The model watcher also commits then removes the invalid tag; the browser matrix
must prove that this transaction does not produce duplicate add/remove speech or
unexpected focus movement.

Born-RED matrix:

- add by Enter/delimiter/Tab/blur as configured; paste several; reject duplicate,
  invalid and max-limit values; preserve IME composition;
- Backspace selects then removes exactly the intended tag, and each named delete
  Button owns center plus eight coarse-floor points without overlapping its input
  or neighboring delete controls;
- invalid reason is persistently linked and announced once, clears by an explicit
  state transition rather than an inaccessible timer-only disappearance, and
  survives long/localized content;
- disabled/read-only/form serialization, wrap, focus-visible, forced colors and
  Safari/VO remain coherent;
- mutations removing linkage, restoring a sub-44 action region, double-firing a
  paste, or deleting the wrong duplicate turn RED.

Route material/radius/delete paint to `R-SHIPPED-MATERIAL` and
`R-RADIUS-PUBLIC-BREAK`; route name/error linkage and announcement behavior to
`BJ.W-A11Y-LINKAGE` / the existing `invalid`/`errorLive` ruling. No second tag or
field engine.

## 4. SortableList — keyboard transaction exists; live parity and announcement lifecycle do not

Source and colocated tests establish a meaningful substrate: semantic `ul/li`,
native named Button handles, disabled handles, Space/Enter lift/drop,
Arrow/Home/End proposal, Escape and pointercancel cancellation, same-list and
pointer cross-list commits, polite atomic announcements, and focus restoration
to the moved handle. This is more than a visual affordance.

The retained browser evidence is rest-only. It does not prove:

- the global coarse floor reaches the actual handle through center/corners/edges;
- a touch drag distinguishes page scroll from reorder and maintains pointer
  capture across cancellation;
- the focused handle is revealed rather than hidden by a scroll edge or Dock;
- a repeated identical transaction is announced again;
- rapid lift/propose/cancel does not queue stale polite messages;
- cross-list keyboard parity exists (the current keyboard path proposes within
  the source list only); or
- shimmer and ghost cues retain sufficient non-motion meaning under PRM and
  forced colors.

Keyboard cross-list parity must be either implemented through the existing
transaction owner or explicitly ruled out and documented. It is not proof of a
new drag engine.

Born-RED mutations restore missed pointercancel cleanup, lose pointer capture,
return focus to the old/deleted node, repeat an identical live-region string
without a re-announcement generation, move a disabled row, place the target
under the Dock, or remove the handle's 44px action ownership. Each must fail a
natural Browser/AT transaction, not only a direct controller call.

Route to the existing Sortable interaction/a11y owner, `BJ.W-RADIUS-ROLE` for the
drop-indicator role, and GF-DOCK only for independently measured occlusion.

## 5. InfiniteScroll — live node exists, delivery semantics remain RED

`InfiniteScroll.vue` now has a persistent atomic polite status node with three
strings: idle empty, `Loading more items`, and `All items loaded`. The sentinel is
correctly hidden, and the observer disconnects on a load trigger then rearms
after loading. This banks the intended direction of `BJ.W-A11Y-LIVE-REGIONS`, not
its close.

Current tests assert only current DOM strings. They do not prove AT delivery,
repeat delivery, coalescing, observer races, or error behavior. The public
component has no error state; that can remain consumer-owned, but a real receiver
must prove an error does not leave `aria-busy`, loading speech, or the sentinel in
a false loop. The story also begins loading immediately, so its mobile rest frame
being empty is not exhaustion, reach or progression evidence.

Born-RED sequence:

1. idle → loading → loaded-with-more → loading again → exhausted;
2. rapid IntersectionObserver repeats during each stage produce one request and
   one meaningful announcement per transaction;
3. the second identical loading message is spoken after a completed first load;
4. reset during loading, error/retry and unmount leave no stale observer or stale
   announcement;
5. newly inserted content does not steal focus, and keyboard/VO users can reach
   the end state without being trapped in the nested scroller;
6. mutations that duplicate requests/speech, omit exhaustion, or retain a stale
   loading message turn RED.

No second loader or live-region engine is authorized.

## 6. Fuzzy Search — the story's accessibility claim is false at the receiver

The SearchBar itself forwards its attributes to a native search input, and the
canonical live field has a stable `aria-label="Search the catalogue"`. Visual
placeholder truncation is therefore not accessible-name loss by itself.

The broader story overclaims. It says screen readers hear the running result
count, but `resultCount` is rendered as an ordinary Badge with no live status or
link to the field. Result Cards are static content: they are not links/buttons,
there is no listbox/option model, no active descendant, and no visible binding
from a result action to `searchState.select`. `selectedResult` can therefore read
`No selection` indefinitely in this receiver even though the composable owns a
selected index and callback. Comments about an overlay/command palette are not a
rendered contract.

This does **not** justify resurrecting the removed public FuzzySearch component.
Under `R-PUBLIC-8-LEDGER`, either the demo remains a simple native search plus
static results and truthfully documents that model, or a surviving existing
combobox/command owner supplies a fully wired composite.

Born-RED proof: type with keyboard and IME; wait for debounce; hear one coalesced
count/empty transition; reach and activate a result if results are claimed
interactive; preserve focus and query on selection; clear; handle rapid source
replacement; and prove mobile/zoom text plus result reach. Mutations restoring a
silent ordinary count, stale result count, inaccessible result action, or
placeholder-as-name dependence must fail.

## 7. Timeline — rest legibility cannot rescue the overfit three-variant facade

C43 correctly routes Timeline to `BJ.W-REDUCE-TIMELINE` and excludes it from the
shared Slider/Progress track adoption by assumption. The source still dispatches
scrubber, segmented and continuous structures with different semantics and event
models. Rest frames do not prove any of them.

The close must first obey the reduction ruling: identify the one surviving
semantic job and delete/fold the overfit public facade before refining its a11y.
For the survivor, prove label/value, Arrow/Home/End, pointer capture, cancellation,
RTL, zoom, coarse floor, current-vs-hover state, focus-visible, popover relation,
detail continuity and PRM. A segmented marker's hover detail must also be
keyboard reachable and correctly named. Mutation-restoring one of the retired
facades or an unlabelled/hover-only state turns the reduction detector RED.

No generic timeline or fourth interaction primitive is minted here.

## 8. Virtual Section — demo-only windowing has no keyboard/AT continuity proof

The story is candidly demo-owned. Its window math and spacer arithmetic can be
useful performance evidence, but the actual scroll region has no explicit name,
region semantics or tab stop. The Jump button imperatively changes nested
`scrollTop`; focus stays on the external button, the target article is not
focusable, and the active-id Badge is not a live region. A visual jump can
therefore strand keyboard and screen-reader context even if the right pixels are
rendered.

Before this specimen survives the overfit subtraction assay, prove a real need
that is not already owned by an application-specific virtualizer. If retained as
a demo helper, born-RED proof covers far jump/reverse, dynamic-height correction,
focus or reading-context transfer, named scroll-region reach, DOM recycling
identity, active-state announcement policy, zoom, mobile and Safari/VO. Otherwise
delete the demo-only helper and route consumers to their existing owner. No
public virtualization primitive.

## 9. Metric — static truth is narrow and does not imply announcement semantics

Metric correctly avoids inventing buttons or live regions. Its icon is decorative,
zero is preserved, absent/loading values are distinct, and `aria-busy` identifies
updating roots. That is a reasonable static readout substrate.

Do not infer from this that loading completion, rapidly changing telemetry, or
an optional adjacent action is announced. Those are receiver decisions. The
story also calls `MetricStack` a definition-list grid while the implementation is
plain nested `div`/`span`; visual term/value alignment is not definition-list
semantics. The wording must be corrected or the semantic contract separately
adjudicated if the family survives its existing cross-repository reduction
census.

Born-RED proof for any surviving Metric receiver covers label/value/unit/context
reading order, zero/empty/NaN/loading, long labels, zoom, live-update policy and
adjacent action naming without internal selectors. Keep it under
`BJ.W-REDUCE-CROSSREPO-GATED`; do not mint a new Metric wave.

## 10. Instrument Chassis — owner-directed total removal

`OVERFIT-SUBTRACTION-OWNER-RULING-C45.md` supersedes C43's retention implication.
No accessibility retrofit, public seam or consumer migration may be used to
argue that Instrument Chassis should remain.

The later execution detector must prove atomic absence of component, styles,
barrel/subpath/package export, story route, tests and stale prose; exact consumer
census and migration; source→pack→install→serve agreement; and a mutation that
restores any removed edge turns RED. Remaining layouts compose existing public
primitives without a compatibility wrapper. Formation does not authorize that
deletion today.

Route exclusively to `BJ.W-REDUCE-CROSSREPO-GATED` plus C45. Dock overlap remains
GF-DOCK evidence and is not a reason to preserve or modify the chassis.

## 11. Progress — semantic core survives; canonical naming and PRM receiver are RED

The core uses Reka's `role=progressbar`, removes `aria-valuenow` when
indeterminate, carries max/value/orientation and hides decorative marks. Local CSS
stops its indeterminate animation and fill transition under OS PRM. These are
bankable source directions.

The canonical story violates its own a11y claim in two ways:

- indeterminate, size, gradient and liquid specimens are mounted without an
  accessible label; adjacent prose is not programmatically associated; and
- the `animated` specimen uses an unconditional requestAnimationFrame loop that
  continuously changes `modelValue`. CSS PRM stops paint animation but does not
  stop this JavaScript value clock or its semantic `aria-valuenow` updates.

Thus “static under reduced motion” is false for the complete receiver. The core
component and the story driver must not be conflated.

Born-RED matrix: every canonical progressbar has a stable name; determinate,
indeterminate, complete and error states expose truthful value semantics; OS PRM
and motion-off terminate all decorative and story-driven clocks at an equivalent
meaningful state; forced colors preserves the fill/track distinction; RTL and
vertical values remain correct; and repeated updates do not create an AT speech
storm. Restore an unnamed specimen or PRM-live rAF and require RED.

Track paint remains `BJ.W-TRACK-DRY` / `R-TRACK-PUBLIC-BREAK`; receiver clock and
PRM truth remain under `BJ.W-FEEDBACK-MOTION-TUNE` and existing A11Y state policy.
No third track axis or Progress-specific motion engine.

## 12. Skeleton — decorative leaf is correct; replacement lifecycle is unproved

Skeleton deliberately strips caller role/ARIA attributes and stays
`aria-hidden=true`. The demo correctly places busy/name semantics on its parent
ShowcaseFrame. That division is preferable to many independently announced
placeholder bars.

Rest frames prove neither the shimmer/PRM clock nor replacement behavior. Born
RED: the parent is named and busy; skeleton descendants stay absent from the
accessibility tree; content replacement clears busy once without focus shift or
duplicate speech; caller radius overrides survive the actual cascade; PRM and
forced colors retain a visible static placeholder. Mutations making each bar a
status, leaving parent busy after content arrives, or defeating caller geometry
must fail.

Route to `BJ.W-RADIUS-ROLE` / `R-RADIUS-PUBLIC-BREAK` and the existing feedback
motion owner. No loading-state primitive.

## 13. Confirm Dialog — modal kernel survives; destructive transaction focus is RED

The story composes one Dialog kernel and gives title/description content. Existing
tests prove opener ownership and `aria-controls`, not the natural modal lifecycle.
The Browser onset blur is already routed to the Dialog/feedback-motion owner.

The destructive path introduces an additional a11y risk: activating Delete sets
both Cancel and Delete to native disabled, hides the close button, and prevents
Escape/outside dismissal for 900ms. It supplies no `aria-busy` or named status.
If focus remains on a button as it becomes disabled, browser/AT behavior can lose
or strand focus; if focus moves, there may be no actionable target. The sparse
frames do not resolve this.

Born-RED sequence:

- natural opener → safely chosen initial focus → title/description announcement;
- destructive and benign default-action order is explicit, not inferred from DOM;
- confirm enters a named busy transaction without focus escaping the dialog;
- Escape/outside policy is announced or remains predictably blocked only while
  busy; cancellation and completion restore focus to the exact live opener or a
  documented fallback;
- rapid re-entry, trigger removal, unmount, error, PRM and mobile action stacking
  preserve one focus owner;
- mutations that disable the only focus target, focus background content, lose
  return, or allow a destructive accidental default turn RED.

No `ConfirmDialog` engine should be resurrected; this remains a Dialog
composition plus existing focus/motion owners.

## 14. CompletionSeal — positive visual reference, unclosed status lifecycle

The staged disc/ring/check/wordmark draw is a strong visual reference, but
`CompletionSeal` always mounts `role=status aria-live=polite`. The canonical
story simultaneously mounts several labelled seals and remounts all of them on
Replay. That can generate a queue of repeated completion announcements unrelated
to one real transaction. Conversely, a seal without `label` still creates an
empty status node.

`useCompletionSeal` sets `playing=true` after one rAF and never observes an
animation finish to clear it. `drawn` and `playing` therefore do not describe a
completed lifecycle independently. The visual fill mode may settle, but the
state seam stays armed. C43's frames cannot prove replay, cancellation, unmount or
announcement delivery.

Born-RED matrix:

- one real completion event produces one intended announcement;
- a gallery of specimens is explicitly decorative or otherwise silent, without
  globally stripping standalone CompletionSeal semantics;
- replay/retrigger owns one generation, clears `playing` on settle/cancel, and
  cannot leak a stale rAF after unmount;
- PRM produces the same final mark and announcement once with no animation clock;
- the Tabs active-adornment use remains inert/decorative under `R-TABS-ADORN`,
  while CategoryHome or another standalone labelled receiver remains independently
  adjudicable;
- mutations restoring an announcement storm, empty status ownership, stale
  playing generation or duplicate selected-state speech turn RED.

Keep the keyframe/lifecycle reduction under `BJ.W-REDUCE-CROSSREPO-GATED`; do not
create another completion renderer.

## Cross-cutting reach and Dock separation

The fixed demo Dock overlaps lower mobile content in several frames. Charge only
measured intersection, hit ownership or focus occlusion to GF-DOCK. Do not use
the Dock as a blanket explanation for Table/DataTable reflow, TagsInput error
linkage, Search count speech, Progress naming or CompletionSeal status behavior.

For every screen in this cohort, the second Browser assay and execution-phase
matrix must retain:

- desktop fine pointer and true-mobile coarse pointer;
- 200%/400% zoom, long localized strings and RTL where meaningful;
- natural Tab/Shift-Tab/Arrow/Home/End/Enter/Space/Escape paths;
- center plus four corners plus four edge-midpoints for every claimed 44px target;
- scrollWidth/clientWidth, clipping ancestors and focus-reveal receipts;
- OS PRM, component motion-off where public, forced colors and reduced
  transparency;
- Chromium detector coverage and actual Safari/VoiceOver;
- exact source, built, packed, installed and served artifact identity.

No rest-frame or programmatic `.click()` substitutes for those paths.

## Existing-owner routing

| Finding | Existing owner | New primitive/row? |
| --- | --- | --- |
| Table mobile status and final-column reach | responsive/story composition + `BJ.W-A11Y-CONTRAST` where tone contrast applies | No |
| DataTable projection, composite semantics, stable refs | ASK-8 / REDUCTION W3 / `R-DATATABLE-REF` | No |
| TagsInput material, delete target, error linkage | `R-SHIPPED-MATERIAL`, `R-RADIUS-PUBLIC-BREAK`, `BJ.W-A11Y-LINKAGE`, invalid/errorLive ruling | No |
| Sortable transaction/focus/announcement | existing Sortable interaction owner + `BJ.W-RADIUS-ROLE` | No |
| InfiniteScroll announcements | `BJ.W-A11Y-LIVE-REGIONS` | No |
| Fuzzy Search receiver/public removal truth | `R-PUBLIC-8-LEDGER` + existing Search/Command owner if retained | No |
| Timeline simplification and survivor a11y | `BJ.W-REDUCE-TIMELINE` | No |
| Virtual Section disposition | demo-owned reduction/consumer census | No |
| Metric disposition | `BJ.W-REDUCE-CROSSREPO-GATED` | No |
| Instrument Chassis deletion | C45 + `BJ.W-REDUCE-CROSSREPO-GATED` | No replacement |
| Progress paint, labels and PRM receiver | `BJ.W-TRACK-DRY`, `R-TRACK-PUBLIC-BREAK`, `BJ.W-FEEDBACK-MOTION-TUNE` | No |
| Skeleton geometry/replacement | `BJ.W-RADIUS-ROLE`, `R-RADIUS-PUBLIC-BREAK`, existing feedback motion | No |
| Confirm modal transaction | existing Dialog focus/overlay + `BJ.W-FEEDBACK-MOTION-TUNE` | No |
| CompletionSeal status/lifecycle | `BJ.W-REDUCE-CROSSREPO-GATED`, `R-TABS-ADORN` only for decorative Tabs use | No |
| Fixed-Dock intersections | GF-DOCK only when independently measured | No posture ruling |

## Adjudication recommendation

Accept C43 as Browser Assay B discovery and this critic as failure-assuming
formation input. Do not call the cohort converged yet. The separate adjudicator
must reconcile this seat with the motion and systems seats, apply C45's removal
ruling, distinguish story/receiver bugs from core producer defects, and prevent
the following false closes:

- horizontal overflow existing is not proof that every table cell/action is
  keyboard/focus/AT reachable;
- a 44px CSS box is not proof that nine trusted action points belong to the
  intended control;
- a current live-region string is not proof it was delivered once, repeated when
  needed, or coalesced under rapid changes;
- `aria-busy` is not a completion announcement;
- a DOM focus call with `preventScroll` is not visible-focus proof;
- a rest frame is not drag, sort, query, dismiss, replacement or replay proof;
- a coherent screenshot is not a survival argument for an owner-deprecated
  abstraction; and
- source/local story success is not immutable package, Safari/VO or consumer
  acceptance.

The parsimonious outcome is subtraction plus stronger existing contracts: remove
Instrument Chassis, resolve ASK-8 before investing in DataTable, reduce Timeline,
truth the Fuzzy/Virtual stories, and harden only the surviving Table, TagsInput,
Sortable, InfiniteScroll, Progress, Skeleton, Dialog and CompletionSeal jobs.
Formation remains RED until the second independent Browser assay and separate
three-seat adjudication are frozen. Execution remains unauthorized.
