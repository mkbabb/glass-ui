# Data + Feedback Critic 3 — systems, colocation, package, and subtraction (C44)

Date: 2026-07-22

Role: independent failure-assuming Sol x-high formation critic 3

Phase: formation/audit only

Product, test, gate, package, lock, repin, release, and acceptance credit: none

## Frozen input and cursor

I read `DATA-FEEDBACK-BROWSER-ASSAY-B-C43.md` in full. Its fresh identity is:

- 148 lines;
- SHA-256 `b4314c5015b1acd58b0ca3582dea8b8cae9b78c0125724a811c7ae397165247d`.

The source cursor I inspected is committed Glass HEAD
`0371836dfeeb3b7982250d612f93b5347a1d29d4`, tree
`97b386172a899ef43b686ffbe43263395b3a7744`, with a materially dirty worktree.
The Browser packet is explicitly source-demo formation evidence; it is not an
installed-package candidate. This distinction is structural, not ceremonial:

- root `vite.config.ts:14-24` maps `@glass` directly to `src/`;
- `demo/vite.demo-dist.config.ts:31-39` deliberately repeats that source alias;
- the latter states that the demo build does not use the library
  `publishStyleAssets` arm (`:13-22`).

Therefore a visually green demo frame cannot prove a packed export, and a source
fix can be invisible to the artifact that Atlas, SCI, or another package actually
installs. Every disposition below is formation-only.

## Verdict

**DEFECT / SUBTRACTION AUTHORITY PARTIAL / PRODUCER + PACKAGE + CONSUMER +
ACCEPTANCE RED / EXISTING OWNERS SUFFICIENT / ZERO NEW ROWS.**

C43 is a useful, honest Assay-B packet. It is not yet a systems apotheosis. It
correctly withholds package and interaction credit, but its positive static read
of several stories is too close to the demo composition and too far from the
published/installed contract. Three mechanisms are load-bearing:

1. `InstrumentChassis` is now terminally marked by the owner for deprecation and
   total removal. Its prior keep/delete ASK is superseded forward; no fourth
   aesthetic defence or local polish pass is admissible.
2. `DataTable` is still a conditional public-surface decision, and its current
   implementation fails both stable callback identity and story/runtime
   isomorphism. The owner has not yet selected its thin/public versus remove/fold
   branch.
3. the shared Slider/Progress track structure has the correct one-register
   direction, but source declarations and a source-alias demo do not close the
   dual public-style-entry or immutable-package contracts.

The owner's broader “remove all overfit items hereof” mark is a subtraction law,
not permission for an auditor to guess. A surface deletes only after its public
job, real consumers, and nearest surviving primitive/composition are named. The
single explicit exception is Instrument Chassis: the owner named it directly,
and the existing reduction record already contains the exact deletion topology.

## 1. Instrument Chassis — terminal REMOVE, not another redesign wave

### 1.1 It is a parallel surface system

The live component is not a small semantic adapter around `Surface` or `Card`.
It owns:

- a material plate (`border`, `background`, two inset catches,
  `backdrop-filter`) in `instrument-chassis/styles.css:17-34`;
- its own tone and state-mix machine (`:3-12`, `:24-57`);
- two proportional grid contracts (`golden` and `preview-dominant`, `:72-80`);
- two boundary axes and four reserve states (`types.ts:3-15`);
- its own responsive topology (`styles.css:118-130`);
- a private stage/inspector/action anatomy (`InstrumentChassis.vue:32-64`);
- dedicated global-cascade placement (`src/styles/index.css:147-150,206`);
- dedicated material tokens in `src/styles/tokens/glass.css:299-305,334`
  and a dark override in `src/styles/tokens/dark-arm.css:232`.

That is exactly the overfit shape the reduction band warned about: an
app-specific sleeve elevated into a public design-system ontology while
repainting the surface substrate. The visually coherent C43 frame does not cure
the abstraction error; it demonstrates that a tailored demo can make an
overfitted abstraction look persuasive.

### 1.2 Consumer truth does not rescue it

The existing two-grain census in `BAND-REDUCTION.md:583-605` already found that
the named speedtest and muster consumers use incompatible historical contracts:
`variant`, `phase`, a `#dial` slot, and `variant="spine"`, none of which belongs
to the 7.0 contract of `state`, `tone`, `proportion`, `boundaries`, and `reserve`.
Those consumers require rewrites whether this component stays or goes. They are
not evidence that the current public abstraction has a stable shared job.

The current repository corroborates the narrow topology:

- the only in-repository renderers are the component and its own demo story;
- `InstrumentChassis` is subpath-only, not a root export;
- its public-surface test merely asserts that the subpath exports the symbol;
- the contract test certifies the bespoke ontology, not a second real receiver;
- the demo itself adds a dial, metric stack, custom reserve dimensions, and
  preview treatment outside the component, proving the visually salient job is
  still consumer composition.

### 1.3 Exact removal closure

The owner's explicit mark makes the conditional language in
`BAND-REDUCTION.md:625-628` terminal in formation. A future authorized execution
cut must remove the complete closure atomically:

1. `src/components/instrument-chassis/` including component, types, styles,
   README, and barrel;
2. `./instrument-chassis` in package `exports` and `typesVersions`;
3. `demo/stories/data/instrument-chassis.vue` and the manifest route;
4. `tests/components/instrument-chassis.contract.test.ts` and the
   `tests/public-surface.spec.ts` row;
5. the `src/styles/index.css` cascade ledger/import;
6. `--glass-opacity-chassis` and `--glass-bg-chassis`, including the dark arm;
7. Chassis-specific prose/comments in `glass-fx.css`, `glass.css`, Dock source,
   migration/public ledgers, and generated-artifact policy;
8. exact speedtest/muster consumer relays toward app-local composition on the
   surviving `Surface`/layout/Metric pieces.

The generic Dock `[data-reserve]` contract is **not** automatically deleted by
this closure. Its current selector is class-neutral and has non-Chassis drawer
tests/receivers. It receives a separate census; stale Chassis prose can delete
without deleting a still-distinct host reservation job.

### 1.4 Born-RED removal proof

The detector must start RED on the current candidate and become GREEN only when:

- source, root cascade, tokens, tests, story, manifest, package export,
  `typesVersions`, generated declarations, packed tarball, installed fixture,
  and served consumer graph all contain no Chassis symbol/class/token;
- restoring any one package key, type entry, CSS import, token, story route, or
  stale generated file returns RED;
- the two named historical consumers have explicit migration receipts and do
  not receive a copied Glass component or private compatibility shim;
- the final owner-approved compositions preserve their actual app job without
  reinstalling a generic “chassis” under a new name.

This is a removal proof, not a request for new Chassis tests or better Chassis
pixels.

## 2. DataTable — branch first, mechanics second

### 2.1 The current stable-ref contract is still false

`DataTable.vue:87-95` centralizes `setRowEl`, but both projections still allocate
an inline closure inside the render loop:

- responsive card projection at `DataTable.vue:286-290`;
- table projection at `DataTable.vue:409-413`.

Vue can therefore call the old ref with `null` and the new closure with the same
element on an unrelated patch. The exported `rowRef(element,row,index)` contract
then reports a false DOM lifecycle to an observer-bearing consumer. A shared
helper body does not make the closure identities stable.

The direct test at `DataTable.test.ts:272-297` proves initial non-null delivery
and null on actual row removal. It does **not** exercise:

- an unrelated rerender with the same key/element;
- reorder with the same DOM identity;
- same-key immutable row replacement;
- index metadata replacement;
- replacing the `rowRef` handler itself;
- add/remove followed by dead-key cache eviction;
- parity between table and card projections.

Thus the existing G4/R-DATATABLE-REF ruling remains exact. If DataTable survives,
it needs one stable closure per row key, mutable current row/index metadata,
explicit old-handler-null/new-handler-element handoff, idempotent element
notifications, and dead-key eviction after genuine unmount. A wrapper around
the current inline lambda is not sufficient.

### 2.2 The responsive story is source/runtime non-isomorphic

The story explicitly passes `responsive` at
`demo/stories/data/data-table.vue:246-260`. The component explicitly computes
cards below the measured breakpoint in
`useDataTableResponsive.ts:32-49`. The unit test supplies a synthetic
`ResizeObserver` width of 320 and proves the card branch. Yet C43's true-mobile
Browser frame still shows the wide table with clipped Issues/Updated/action
columns.

This is not a minor demo blemish. It means at least one of these claims is false
in the real tree:

- the root's measured width reflects the available inline size;
- the observer fires before the story can become acceptance-relevant;
- the enclosing min-content/layout constraints allow the root to shrink;
- the served route carries the same bytes the source/test critic inspected;
- the advertised “responsive card states” story actually demonstrates its
  named contract without a manual “narrow” toggle.

The tests are detector-GREEN while the real story contract is Browser-RED.
Before selecting a fix, a born-RED browser arm must record root/container/table
geometry, observer width, `isCard`, every clipping ancestor, and the installed
artifact identity. Adding a viewport media query, hiding columns, or forcing a
consumer width would guess around the mechanism.

### 2.3 ASK-8 still controls retention

The original one-consumer premise was corrected: the later census names Atlas
and speedtest as live `/data-table` consumers. That withdraws automatic
demo-privatization, but it does not prove that all 24-ish public props belong in
the shared surface. The owner must select one branch against current receiver
jobs:

**Keep/thin public.** Name the exact Atlas and speedtest props/states. Preserve
only the shared table/card, sort, state, selection, identity, and truly used
windowing seams. Then land the stable-ref mechanism and real responsive proof.

**Remove/fold.** If both consumers can compose `Table` plus app-owned state more
simply, remove root/subpath/types/demo/tests and migrate them. Do not first spend
a wave perfecting a callback surface that is about to disappear.

No critic may resolve this branch by counting LOC alone, and no static success
in the polished demo resolves it either.

## 3. Table versus DataTable — related, not yet duplicates

`DataTable` currently composes the primitive `Table` family; it is not a second
native-table renderer. The two stories can have distinct jobs:

- `Table`: semantic anatomy and ordinary overflow;
- `DataTable`: controlled sort/selection/states plus an alternate card
  projection.

That distinction is defensible only if the advanced contract survives ASK-8 and
the browser actually displays the alternate projection. The C43 mobile Table
failure is story/consumer composition: the story inserts hand-coloured `Badge`
status pills and a fixed wide invoice schema. The fact that “Paid”, “Pending”,
and “Overdue” wrap one glyph per line is RED, but it does not by itself justify
a new Table status-cell primitive. The story must demonstrate an idiomatic
scroll/reflow/card policy while preserving header/cell association and focus.

If DataTable is removed, the Table story becomes the canonical public anatomy
and consumer-specific sorting/card logic stays outside Glass. If DataTable is
kept, both stories stay only with a crisp non-overlapping charter. Two routes
that merely show increasingly elaborate tables are overfit documentation even
if the source components share an implementation.

## 4. Track structure — sound primitive direction, unclosed package system

The shared structure is appropriately central rather than colocated twice:

- `.glass-track-well` is one groove register consumed by Slider and Progress;
- `.glass-value-marks`/`.glass-value-mark` is one decorative mark register
  consumed by both;
- Slider owns an image-capable
  `--glass-slider-track-background` input;
- Progress owns a color-only `--glass-progress-track-color` input;
- Timeline adoption remains excluded until its own one-family redesign.

That is a legitimate ≥2-consumer shared register and should not be “colocated”
back into either component. The C43 Progress frame does not close it, however.

Current source points `./styles.css` at `dist/component-styles.css`
(`package.json:492-495`) and the ordinary `build` script runs a post-build
generator (`:502`). But the system remains non-isomorphic:

- `build:watch` is only `vite build --watch` (`package.json:503`);
- `iter-build` is only `vite build --config vite.iter.config.ts`;
- `publishStyleAssets()` does not emit `component-styles.css`;
- `typed-track-seam.test.ts:110-125` silently returns GREEN when that generated
  manifest is missing;
- Assay B loads source through `@glass`, not either installed public CSS entry.

So the desired source/export spelling is bankable direction, not proof. The
existing `BJ.W-TRACK-DRY` / `R-TRACK-PUBLIC-BREAK` owner remains RED. A future
execution cut needs one publisher lifecycle used by canonical, watch, and iter
builds; fail-closed tests that require a fresh output; both `./styles` and
`./styles.css` installed independently; exact source→build→pack→install→serve
identity; and computed Slider/Progress paint in Chromium and actual Safari at
fractional geometry/DPR 1 and 2. No third paint axis, copied consumer CSS, or
source substitution is allowed.

## 5. Demo surfaces are not consumer truth

### 5.1 Confirm Dialog story is already redundant

There is no distinct ConfirmDialog producer anymore. The Feedback story says so
at `demo/stories/feedback/confirm-dialog.vue:5-18`: it is a Dialog preset. The
Containers Dialog story already contains the same confirm flow, loading guard,
focus restoration context, and broader Dialog states. `BAND-REDUCTION` has
already selected deletion of the duplicate story/manifest row and relocation of
the direct test. C43's useful motion frames become evidence for the Dialog
owner; they do not rescue the redundant route.

This is a strong second subtraction candidate because the distinct-job proof
already failed. It is not a request to delete Dialog or its confirm composition.

### 5.2 Fuzzy Search has already taken the correct reduction shape

The old standalone `FuzzySearch.vue` is absent. The current Search story composes
the retained `SearchBar` and retained `useFuzzySearch`; Dock also consumes that
engine. That is the desired “one engine, ordinary composition” result. The story
may need a title/copy correction so readers do not infer a public FuzzySearch
component, but recreating a component or deleting the shared engine would both
reverse the reduction.

### 5.3 Virtual Section is a candidate benchmark, not a proven product surface

`demo/stories/data/virtual-section.vue` explicitly imports a demo-local
`../../composables/virtual` implementation and synthesizes 1,000 sections. It is
not a public Glass component. That sharply limits blast radius, but it also
makes the gallery route a candidate overfit specimen:

- KEEP only if it has a named benchmark/audit job, deterministic far-jump and
  dynamic-height probes, and clear “demo-local” labeling;
- fold or remove it from the public component gallery if it is merely a polished
  pseudo-component with no ongoing benchmark owner.

C43's rest frame cannot decide between those branches. It does prove that no
new public virtualization primitive should be minted from the story.

### 5.4 Metric remains a separate owner ruling

The owner's Chassis removal does not silently delete Metric. The later census
found a current-contract keyframes.js receiver, while stale historical Metric
subpaths remain migration debt. The existing choice is still delete-with-relay
versus one collapsed Metric family. It requires its own current consumer/job
adjudication. Chassis-specific layout must not be smuggled into Metric as a
replacement sleeve.

### 5.5 Completion Seal is not overfit by this evidence

Completion Seal has multiple external receiver and build-plugin roles in the
existing census, and C43 records a genuinely distinctive one-shot semantic
motion. The Tabs decorative use is a receiver-local semantic restriction, not a
global demotion. Remove dead constants and duplicate animation ownership where
proven; do not delete or globally make the component decorative.

### 5.6 Remaining Data/Feedback surfaces

C43 provides no evidence that Progress, Skeleton, TagsInput, SortableList,
InfiniteScroll, Alert, Toast, or the base Dialog engine are duplicated public
semantics. They each have a distinct job and existing owner. This is not blanket
KEEP credit: package, interaction, PRM, and consumer proof remain RED. It means
the overfit detector must attack their props/consumers before proposing removal,
not infer deletion from proximity to Chassis.

Timeline is already under a 5→1 collapse decision. Its current story copy still
advertises continuous and segmented forms; that documentation must converge on
the surviving one-timeline contract rather than preserving variant nostalgia or
adopting the track register prematurely.

## 6. Colocation and test-isomorphism rulings

| Family | Colocation truth | Test-isomorphism verdict |
| --- | --- | --- |
| Instrument Chassis | component/types/styles/README are colocated, but the component also owns global tokens and a global cascade import; good file placement does not justify the abstraction | contract/public-surface tests certify a doomed ontology; remove with the product closure, do not grow them |
| DataTable | responsive and row-identity helpers are sensibly colocated | unit width injection and initial `rowRef` calls do not reproduce live mobile layout or closure lifecycle; RED |
| Table | one native anatomy split into small leaf components | mobile status failure is in the story composition; add real story/browser proof, not a Table-internal status fork |
| Slider/Progress | shared structural registers belong under central Glass styles because two components compose them; typed paint stays component-owned | source predicates are useful, but missing-dist skip and build-mode divergence make package proof RED |
| Confirm Dialog | correct home is a section/preset in the Dialog story | duplicate Feedback route/test is non-isomorphic documentation residue; delete/fold under existing W3 |
| Fuzzy Search | engine stays with Search; story composes it | do not let story title impersonate a public component |
| Virtual Section | correctly demo-local today | needs a benchmark charter or subtraction; no public test/export |
| Completion Seal | component, composable, constants, CSS, README are colocated; shared draw register is legitimately multi-consumer | natural lifecycle/PRM/package proof still owed; Tabs semantics remain consumer-local |

## 7. Required born-RED systems matrix

### S1 — Chassis total-removal closure

Start from the current source/package where the subpath, type entry, CSS import,
tokens, tests, and story all exist. Delete the complete closure. Mutations that
restore each category separately must RED. Pack and install the result; a bare
import of `@mkbabb/glass-ui/instrument-chassis` must fail as the documented clean
break, while the two migrated apps still render their app-specific instrument
layouts from surviving primitives.

### S2 — DataTable branch detector

Freeze the owner branch before implementation.

- KEEP/THIN mutation matrix: same-key rerender, reorder, same-key row
  replacement, index change, handler replacement, add/remove/re-add, table↔card
  projection, and unmount. Exactly one stable closure per key; only genuine
  element lifecycle calls; current row/index delivered; dead key evicted.
- REMOVE/FOLD matrix: root and subpath exports, declarations, styles, tests,
  story, and package bytes gone; every named consumer migrated; no private copy.

Both branches require a true-mobile real-tree probe. A synthetic 320px observer
alone is non-probative.

### S3 — public track package matrix

For one immutable candidate:

1. hash source Slider/Progress/register files;
2. run canonical, watch, and iter publishers through the same emitter;
3. pack once and hash the tarball;
4. install it in isolated fixtures, one importing only `./styles`, one only
   `./styles.css`;
5. prove both registered groove/mark rules, typed paint inputs, and no duplicate
   occurrence;
6. serve actual package consumers and match installed/served bytes;
7. prove computed paint and clipping at fractional rails/DPR1/2 in Chromium and
   actual Safari;
8. restore missing-manifest skip, build-mode omission, generic selector, shared
   paint knob, or copied consumer rule and turn RED.

### S4 — story-to-consumer isomorphism

Every story claim must be observable without an undisclosed control:

- DataTable true-mobile lands in its promised responsive projection and every
  required field/action remains reachable;
- Table statuses never collapse to one-glyph columns;
- Confirm evidence moves to the canonical Dialog story;
- Fuzzy Search is labeled as a Search composition;
- Virtual Section states whether it is an owned benchmark or leaves the public
  gallery;
- real consumers import the same immutable package and do not use private
  selectors, source aliases, copied Glass classes, or story-only wrappers.

### S5 — overfit subtraction law

For each additional candidate, freeze:

- public symbol/subpath/root status;
- source and packed LOC/bytes;
- distinct semantic job versus nearest surviving primitive;
- exact current-contract consumers at symbol and prop/slot grains;
- public prop setters and dead axes;
- story/test-only usage;
- migration target and blast radius.

Only then may the adjudicator choose KEEP, THIN/FOLD, DEMO-LOCAL, or REMOVE.
Restoring a deleted axis or duplicate story must RED after a removal cut. This
law prevents both “keep every polished demo” and indiscriminate mass deletion.

## 8. Dependency-ordered disposition

1. **Record the owner's Chassis removal as terminal formation authority.** Do
   not reopen ASK-A1 for the Chassis half.
2. **Complete the overfit/job census.** Confirm Dialog is already a decided
   duplicate; Virtual Section and the remaining open family-C candidates need
   distinct-job adjudication; Fuzzy Search's prior fold is preserved.
3. **Resolve DataTable ASK-8.** Only then does the stable-ref cut or full removal
   branch become executable.
4. **Keep W4 track/package work atomic.** One emitter and one immutable package
   precede consumer proof; no source-only green.
5. **Run independent Assay A and real-consumer formation evidence.** C43 remains
   Assay B only.
6. **Only after owner execution release:** perform removal/implementation cuts,
   immutable pack/install/serve matrices, Safari/VoiceOver, and two unchanged-
   byte independent audits.

## Final adjudication input

C43 should be accepted as a Browser-B discovery packet and rejected as systems
closure. Instrument Chassis is terminally deprecated for total removal. Confirm
Dialog's duplicate route is an already-proven subtraction. DataTable remains a
real shared-surface decision with two independent RED mechanisms, not an
automatic keep and not yet an authorized delete. The shared track structure is
architecturally justified, while its build/package graph remains unclosed.

No new component, engine, row, compatibility alias, consumer shim, or gate is
warranted. The parsimonious route is subtraction first, one owner per surviving
mechanism, and immutable package truth before any consumer or acceptance claim.
