# Post-mortem: why the last tranches did not finish cleanly

## Executive finding

The crux is not that agents were insufficiently industrious, that the plans lacked
detail, or that the repository is simply large. The delivery system has repeatedly
allowed a nonterminal state to masquerade as a terminal one. Once that is legal,
the graph naturally pushes painted-browser truth, integration reconciliation,
consumer migration, gate repair, release evidence, and even `FINAL.md` into a tail.
That tail becomes the longest serial path. Session limits, stale worktrees, partial
commits, and executor restarts then strike exactly where the tranche has accumulated
the most uncertainty. The remainder is inherited, restamped, and planned again.

The governing causal chain is:

```text
permissive close law
  -> closure work represented as a tail
  -> late integration and paint discovery
  -> serial critical path exceeds execution/session envelope
  -> partial/no-op/nonterminal results are recorded as progress
  -> prose and snapshot gates remain green after reality drifts
  -> version/tag/consumer truth diverges
  -> successor inheritance and retrospective repair
  -> larger next plan, but unchanged close law
```

Infrastructure amplified this loop; it did not originate it. BD proves that a large
tranche can ship when a single writer works through the full close continuously.
BG proves that better fan-out cannot rescue a graph whose completion state is kept
in memory, whose worktrees are stale, and whose cut may remain paint-pending.

## Seven interacting failure classes

### 1. Semantic failure: “complete” has too many meanings

The history contains `complete_with_misses`, `READY-TO-PUBLISH`, `TOOLING-DEFERRED`,
`CLOSED DEGRADED`, `verified-but-un-applied`, `development complete`, and cut states
that are still paint-pending. Those labels may be honest descriptions, but they are
not successful termination. Canon currently lets some of them satisfy close.

The repair is a type system, not sharper prose: execution may be `PLANNED`,
`RUNNING`, or `BLOCKED`; termination is only `DONE` or `DEAD`. A tranche is not
complete while a wave is in an execution state. A device outage creates `BLOCKED`
or removes a claim; it never creates a lower verification floor called success.

### 2. Topological failure: proof is terminally batched

Many plans do implementation first, then reconciliation, π, close, cut, consumer
adoption, and documentation. That shape guarantees a large terminal antichain will
be serialized behind a small number of close waves. It also hides missing work until
the cost of changing a foundational decision is highest.

The repair is phase-local closure. Each wave states a falsifiable property, extends
ordinary tests or typed scenarios as needed, runs its relevant browser evidence,
repairs its own imports/build/config/tests, and lands
one commit. Final release evidence is a continuously maintained projection of
already-closed subjects, not a fresh body of work at the end. A terminal “run all
the things and fix whatever breaks” wave is forbidden.

### 3. Representational failure: gates preserve stories, not invariants

At the BI source base the gate manifest contains 403 unique rows: 375 local, 351 CI,
126 release. The scripts are often named after a tranche or wave, lock counts,
filenames, prose, or historic arrangements, and carry long narrative notes. A
committed consolidation manifest records a target of 40–60 family gates, yet the
physical registry is still 403. “Direction recorded” received delivery credit.

The repair is not a smaller registry of renamed gates. It is one cursor-derived
verifier projecting falsifiable properties into ordinary tests, semantic discovery,
typed live scenarios, and current evidence. A property cannot pass because a
sentence, fixed count, retired filename, table module, or package alias exists. The
descriptive property vocabulary may grow, merge, or disappear without changing the
executable surface. A specialized test survives only while its behavior is public;
it never receives a proof-command identity merely for being specialized.

The first gate-free rewrite showed how deep the representation had become. Although
the command/registry architecture was gone, 66 of 133 non-bootstrap mutation bites
still ended by saying that one or more “gates must fail.” A validator also required
the final topological stratum to contain browser work, rejecting a legitimate
device-free dependency/package owner solely because paint was not last. Neither rule
protected a product property: one preserved gate-shaped language as authority, and
the other forced terminal theater into a minimal DAG. Canonical bites now name the
observable evidence that must turn RED, and terminal position creates no special
evidence kind. Browser evidence is mandatory for painted claims wherever they occur;
device-free work remains device-free even if dependency topology puts it last.

### 4. Operational failure: execution state is not idempotent

The BG engine log shows stale worktrees seeded from an older base, a wave rebuilt
about five times, completed waves selected again after in-memory status drift,
40 agent runs producing no integrated commits, no-op results that did not become a
terminal disposition, and integration attempts colliding with 20–40 minute session
walls. Reducing batches from three to two changed load, not correctness.

The repair is a disk-backed cursor, immutable source-base checks, one writer, and a
transactional wave protocol: validate preconditions; mark `RUNNING`; implement;
run the cursor-derived verifier; integrate exactly one commit; recompute graph; mark `DONE`. On
restart, the repository and cursor decide what runs. A no-op is either `DEAD` with
evidence or a failed wave; it is not a third limbo state.

### 5. Canonical failure: lessons do not reach the ROOT authority

The ROOT precepts checkout is 22 commits behind its remote while three major canon
documents are untracked locally. Its grand audit describes a multi-tip family of
variants. Consequently a local lesson may govern one run without becoming the law
that governs the next. Several canon clauses still institutionalize the very tail
that local tranche retrospectives condemn.

The repair is single-writer canonical lineage plus conformance checks: an execution
must name the ROOT commit it obeys; that checkout must be clean and current against
the declared authority; local drafts have no normative force; and the canonical
schema must be machine-readable enough to detect lifecycle and DAG violations.

### 6. Transactional scope failure: the plan demands repairs it cannot write

The first perfected-BI draft reproduced a quieter version of the old execution
trap. A wave could promise to “repoint every importer,” enumerate the exact import,
test, build, and documentation paths under `repairs`, and then normalize every
existing repair path to `VERIFY`. The lease engine excluded `VERIFY` from its write
set. Across the 134-wave graph this affected 6,984 import rows, 863 test rows, 78
build rows, and 172 documentation rows. P006 alone promised to dissolve `src/utils`
while 216 detected importers were read-only. The plan was detailed, but its own
transaction type denied the implementation authority required by its scope.

This explains one recurring class of “agent did the center, tranche did not
execute”: a bounded worker can correctly change its named source family yet either
leave required consumers stale or mutate undeclared files that the orchestrator did
not lease. The former fails integration; the latter collides with parallel work or
gets rejected as scope escape. More prose and more gates cannot repair a malformed
write transaction.

The folded law is explicit. `VERIFY` is an immutable assay input. `REPAIR` is
conditional write authority and therefore an exclusive path lease. A conditional
repair terminates as `MODIFIED` or `VERIFIED_UNCHANGED`; when the repair-manifest
path is also an explicit create, rename, or delete, that structural action wins and
the receipt terminates as `CREATED`, `RENAMED`, or `DELETED`. Every receipt binds
the integration-parent blob and reason. An absent repair artifact is created by its
first owner; a later owner names that producer. A repair list that cannot write is
invalid, and an undeclared write cannot be excused as an obvious follow-on.

### 7. Path-lifecycle failure: frozen-source discovery masquerades as execution scope

Repair authority alone did not make the graph executable. The repair scanners were
correctly bound to the frozen source, but their results were copied unchanged into
descendant waves after structural waves had renamed or deleted those paths. The
first normalized-graph audit found 2,394 such descendants: 2,291 pre-rename names
and 103 post-deletion names. Examples included P008 trying to repair P007's old
sortable roots, later waves repairing `src/components/ui` and
`src/components/custom` after P008 flattened them, and P015 repairing root barrels
and `src/subpaths` definitions after P009/P010 deleted them.

The earlier P000-only filter made the defect harder to see: it silently removed
proof/gate paths without modeling why. Auditing the raw repair discoveries exposed
3,561 required lifecycle dispositions at this frozen source: 2,281 ancestor-rename
projections and 1,280 ancestor-deletion subtractions, including 1,177 P000 deletion
rows previously hidden by the special case. These are descriptive source facts, not
a count gate.

The repair is a DAG-aware path calculus. A mechanically discovered repair path is
projected through every rename in the requesting wave's dependency ancestry. A
definition deleted by an ancestor is removed from later repair scans because the
deleting transaction owns consumer repointing. The target binds the exact producing
wave and source-base provenance. An explicit subject receives no automatic repair:
if an author writes a later `modify`, `create`, `rename`, or `delete` against an
archaeological name, formation is RED. Same-wave structural sources remain valid
because they exist at transaction start and close with their structural receipt.

## Promise-versus-delivery ledger: every tranche directory

This is a forensic ledger, not a quality ranking. “Fold” names the rule perfected BI
inherits. A `FINAL.md` path is counted only under that exact filename; alternate
names and plan-only “finals” are evidence but do not satisfy the new close contract.

| Tranche | Promise | What the record actually proves | Delivery class | Fold into BI |
| --- | --- | --- | --- | --- |
| C | Operational truth and hard-gate closure. | `FINAL.md` exists and records closed waves, but explicitly routes deferred items onward. | Shipped with successor routing. | No successor-routing credit; unresolved work remains nonterminal. |
| D | Substrate-with-consumer and published-type truth. | `FINAL.md` exists; W4 later exposed unrecorded scope and a false dock close. | Closed, then reopened as D-II. | Discovery amends the live graph before close. |
| D-II | Repair D's dock surface and velocity close. | Two-file corrective pass; wave table reports completion, but no `FINAL.md`. | Repair landed; close artifact absent. | `FINAL.md` is a precondition, not optional ceremony. |
| E | Complete the next substrate spine. | `FINAL.md` says complete and cites `e-close`. | Compact shipped close. | Preserve small dependency-led execution. |
| F | Interaction/style/rendering hardening. | `FINAL.md` records landed corrections and evidence. | Shipped, later root-redress demand emerged. | Gates must describe durable behavior, not only wave facts. |
| H | Convergence after expansion. | `FINAL.md` says clean while routing named residuals. | Shipped with debt handoff. | A named residual still prevents terminal close. |
| I | Whole-library steady state and chronic-deferral closure. | `FINAL.md` itself creates five formal deferrals and retrospective status repairs. | Major work shipped; chronic class persisted. | Chronic rows become gates immediately; no formal-deferral escape. |
| J | Substrate convergence and promoted primitives. | `FINAL.md` explicitly defers StoryChassis after invalidating its premise. | Honest rejection mixed with deferral. | False-premise subjects become `DEAD`; future demand must be newly justified. |
| K | Reconciliation and strengthened audit. | `FINAL.md` reports a `CLOSED DEGRADED` wave and an SCC trap left for L. | Released with known incomplete headline. | “Degraded” is execution state, never terminal success. |
| L | v1.0 architectural transposition and SCC closure. | `FINAL.md` records coherent release and migration evidence. | Shipped close. | Keep release and migration truth in the producing waves. |
| M | Constellation standardization without speculative packages. | `FINAL.md` records per-consumer resolution and zero elevation. | Shipped close. | Prefer concrete consumer evidence over abstraction quotas. |
| N | Mobile-aware substrate and dock discipline. | `FINAL.md` declares a pending close commit/tag in its own close record. | Substantive landings; finality ambiguous. | A final cannot contain pending release facts. |
| O | Backend hygiene and transposition. | `FINAL.md` reports π `TOOLING-DEFERRED`, second consecutive deferral. | Released without binding visual truth. | Tool outage blocks visual claims; no verification-floor downgrade. |
| P | Zero-deferral close. | `FINAL.md` says zero residuals; it also performs catch-up tagging and absorbs inherited rows. | Successful cleanup, but dependent on retrospective repair. | Make zero-deferral structural, not tranche-specific policy. |
| Q | Cross-repo un-break and honest close. | `FINAL.md` admits non-literal zero residuals, verified-but-un-applied consumer patches, and π at build floor. | Honest but nonterminal under new law. | External dirty state is a hold, not completed delivery. |
| V | Foundation polish, structural unions, demo expansion. | Post-hoc plan folder and `FINAL.md` reconstruct work already landed. | Retrospective shadow. | Plan identifiers must be assigned before implementation and validated in commit lineage. |
| AB | Living-UI canon. | Post-hoc folder reconstructs earlier commits and close. | Retrospective shadow. | No post-hoc attribution as execution proof. |
| AB+1 | Consumer absorption cohort. | `FINAL.md` records three tags plus one deferred tag later placed ceremonially. | Retrospective/catch-up close. | Version and tag parity are same-wave gates. |
| AB+2 | Post-P settle cohort. | `FINAL.md` explicitly records zero tags and a post-hoc cohort. | Retrospective shadow. | Unplanned commits cannot silently become a tranche. |
| AM | Consumer-gap root redress. | `FINAL.md` status is `complete_with_misses`; aggregate consumer proof remained red and was assigned onward. | Nonterminal by perfected law. | Remove `complete_with_misses` from terminal vocabulary. |
| AN | F-root redress and role contracts. | `FINAL.md` says complete while one integrated build is `MET-pending-orchestrator-build`. | Evidence artifact precedes evidence. | Evidence must be current and observed before `DONE`. |
| AO | Measurement truth and CSS architecture. | `FINAL.md` stages v3.0.0 and leaves two consumer-domain residuals. | Internal work complete, constellation open. | Scope includes every promise explicitly accepted at formation. |
| AP | Derive-don't-duplicate and consumer repair. | `FINAL.md` identifies a refuted premise and zero-deferral repair; release remained unpublished. | Useful correction, release boundary unclear. | Mark false premises `DEAD`; distinguish package publish authority explicitly. |
| AQ | Modern-web platform substrate. | `FINAL.md` ships platform features behind fallbacks, including a JS scroll fallback. | Shipped for broad compatibility. | Modern Safari/Chrome support now permits deleting compatibility paths; capability paths need explicit product rationale. |
| AR | Make silent no-op impossible. | `FINAL.md` closes at W2 and re-homes W3–W6 to AS because the arc changed. | Partial tranche declared complete. | A tranche graph may be reduced only by `DEAD` decisions, not re-homing. |
| AS | Gate integrity and modern-web leverage. | `FINAL.md` records a central gate manifest and clean gate runs. | Strong infrastructure landing. | Preserve one verification entry point, but abolish proof-command registries and per-family executable identities. |
| AT | Blob/WebGL/color transposition and dock perfection. | Plan has many exact gates but no `FINAL.md`; close is represented by a “LAST” wave. | Planned/executed lineage without canonical close. | No “LAST” wave; all leaves close independently and final validates continuously. |
| AU | Publish-ready blob/polish pass. | Close file is `AU.FINAL.md`, not `FINAL.md`; WebGL golden is deferred; publish remains user-domain. | Ready-to-publish, not terminal. | Exact close path and paint evidence are hard preconditions. |
| AV | Aurora and SOTA motion follow-on. | Large plan contains `BOOK` and `DEFER` rows and ends with a “LAST” close wave; no `FINAL.md`. | Open tail. | Ban booked successors and tail close bands. |
| AW | Reinvention: dock, painterly rendering, convergence, demo. | 40-wave-era plan halted mid-flight; W33 is a “LAST” close; no `FINAL.md`. | Interrupted execution. | Bound critical path, not just wave count; proof travels with subject. |
| AX | Fully hardened convergent audit. | 67-wave corpus later de-marks “complete” waves after live evidence refutes them; no `FINAL.md`. | Extensive work, unstable completion semantics. | Terminal state requires current live proof and can only be revoked by source drift detected mechanically. |
| AY | Corrective AX close. | `FINAL.md` calls the cut staged, accepts successor-deferred work, and records a broad local run with 19 failures plus one environment issue while declaring readiness. A later patch tag represented truer close. | Released through corrective tail. | Release battery must be green at the exact tag commit; no successor-deferred close. |
| AZ | Blob/motion/shell convergence. | `FINAL.md` retains external pending/post-cut adoption and lineage repair. | Internal close with external tail. | Constellation acceptance is either in scope and blocking, or explicitly outside the promise before execution. |
| BA | Gestalt and release correction. | The v4.0.0 tag commit fixed five release-only gates that the nominal close had not run. | Tag commit became an unplanned repair wave. | Tag is preconditioned on the exact release battery; never repair while tagging. |
| BB | Large design/gate tranche. | Functional rows were green, but all gestalt/π was terminally deferred to W-REFLECT3; execution stopped before that tail. No `FINAL.md`. | Main body landed; binding truth never closed. | Paint is phase-local and blocks each visual subject. |
| BC | Fully specified corrective formation. | `FINAL.md` explicitly says development-only; the plan grew roughly 70→96 through four reopenings and a 213-item ledger. | Strong diagnosis, no source delivery. | Formation completeness is not implementation completion; freeze only after validation and challenge. |
| BD | 158-wave implementation and v4.2.0. | Shipped after roughly ten uninterrupted hours. P1–P9 integrated local π, but P10 still found 17 unit failures and about 96 proof-gate reds, followed by roughly nine terminal reconciliation commits. | Rare successful marathon; not a reusable close architecture. | Retain single writer and phase-local π; eliminate P10-style terminal reconciliation. |
| BE | Planned follow-on obligations. | Planning corpus only; open rows later folded into BF/BG/BI. | Never executed as its own tranche. | Superseded obligations map one-to-one into BI or are `DEAD`. |
| BF | Planned follow-on obligations. | Planning corpus only; many rows restamped into BG/BI. | Never executed as its own tranche. | Restamping is detected as lineage duplication. |
| BG | Development-complete master build and execution engines. | Development `FINAL.md` claims convergence; execution later lands many waves, but engine logs show stale worktrees, repeated waves, 40 agent runs/zero commits, no-op limbo, and session-wall failures. The 5.0.0 cut remains paint-pending and no v5 tag exists. | Large partial delivery with operational and semantic failure. | Disk cursor, source pin, transactional integration, no paint-pending cut. |
| BH | 5.0 restructure and cleanup. | Plan reports development complete; structure movers never executed and several assumptions are stale at BI HEAD. No `FINAL.md`. | Partially absorbed into BG/BI. | Recompute manifests from HEAD; plan counts never become inherited facts. |
| BI | Reformation plan, 93 repair waves, and held milestones. | B0–B8 landed; MS1–MS9, π, close/cut, D3/D4, and residues remain. Existing 103 wave files mix landed subjects with new tail work. No `FINAL.md`. | Active but structurally tail-heavy. | Perfected formation supersedes the roster; only unlanded current-HEAD subjects count. |

## Deep folds from the most diagnostic tranches

### BC: the diagnosis was right but remained documentary

BC correctly found that BB's “green” functional body concealed an entire class of
unexecuted gestalt and π obligations. Its repeated reopenings were not dithering;
they were discovery revealing an underspecified graph. The failure was freezing a
formation whose validator could not prove completeness. BI therefore treats a plan
as a generated program: omissions, cycles, nonminimal edges, missing repair files,
and tail-only proof nodes are schema errors before execution.

### BD: success by continuous ownership, followed by a proof cliff

BD supplies positive evidence for one orchestrator, phase-local π, and a persistent
close run. It also demonstrates that local π alone is insufficient if unit and proof
families are allowed to drift until P10. Perfected BI moves every relevant family
into the wave's acceptance and leaves no terminal “catch the integration fallout”
subject. The aggregate battery may confirm; it may not discover first-order debt.

### BG: automation repeated work because its authority was ephemeral

BG's executor selected waves from process memory and worktrees that could predate
the integrated base. When the process restarted, prior completion was not a durable
fact. A no-op could be neither successful nor rejected, so it stayed eligible. This
is exactly-once execution attempted without a transaction log. Perfected BI's cursor
records the base, precondition digest, terminal commit, gate evidence digests, and
π evidence before a dependent can become runnable.

### Current BI: cleanup direction is not cleanup delivery

Current HEAD still has 403 registered gates even though the family manifest states
a 40–60 target. It still has 67 generated subpath source files and the `ui/custom`
directory split despite pending structural milestones. It carries compatibility
aliases and tranche identifiers in production comments. These are not accusations
against the landed repair work; they prove that milestone and close bands are real
implementation subjects and cannot remain behind the whole product redesign.

### Current reenactment: some gates make the defect mandatory

The live browser assay makes the gate failure sharper than “too many scripts.” The
source-base fleet contains four distinct bad-oracle classes:

1. A **false oracle** rewards the state the product must delete. Passing it and fixing
   the product are mutually exclusive.
2. A **partial oracle** proves a leaf import, regex, host attribute, or registry row
   while the composed browser state remains false.
3. A **ceremony oracle** proves filenames, exact counts, prose fields, enrollment, or
   receipt shape rather than the represented behavior.
4. A **coercive source-shape oracle** makes one internal import/call topology, dormant
   facility, or scheduler label mandatory even when that shape duplicates the
   canonical owner or contradicts the actual product mechanism.

These are current reenactments, not merely historical cautions. The exact excerpts,
source-base blobs, and excerpt hashes are bound in
[`GATE-CONTRADICTION-AUDIT.md`](./GATE-CONTRADICTION-AUDIT.md).

| Legacy oracle | What it currently rewards | Contradicting current truth | Perfected disposition |
| --- | --- | --- | --- |
| `proof:demo` HD2/FR1/FR2 | `RELOCATED_STORY_ROUTES` and a redirect for every folded member. | The rendered census found 22 folded and six relocated compatibility redirects; the user requires no aliases, shims, migration paths, or compatibility surface. | Reverse the oracle in `architecture.clean-break` + `demo.scenario-contract`: retired paths go directly to semantic not-found. |
| `proof:demo` FR3 | Merely finding `:pathMatch(.*)*` in router source. | The actual unknown path rendered zero `h1` elements. | Browser negative control requires one semantic h1, recovery action, direct ownership, and no redirect. |
| `proof:webgpu-everywhere` + its unit test | WebGPU silently rebuilds as WebGL2 on any init/device/validation failure and suppresses `onInitError`. | Aurora reports an unhandled deferred-error risk and the demos do not expose the engine that actually painted. | Capability absence may select a peer path before commitment; internal failure stays attributed, typed, visible, and never switches silently. |
| `proof:adaptive-observer` | Token-write/import/Dock-wire/evidence-doc source shape. | Glass Material reports `luma 0.000 · dark` over a visibly warm moving Aurora. | Require temporal sample provenance and live composited variation; static coalescing on animated failure is RED. |
| `proof:no-masking-fallback` Arm C | Importing `DOCK_TAP_FLOOR_PX` and deleting a bare `44`. | A broken mounted token emitted 38 warnings and continued by returning the same semantic value through the constant. | A required mounted token fails once and visibly; named constants do not legalize semantic-value substitution. |
| `proof:dock-crossfade` + shallow unit test | Presence of `focus()`/`nextTick()` and `aria-hidden` on one inactive host. | Inactive blank controls remained in the composed accessibility tree; mobile exposed opacity-zero focusables and 20.6px targets. | Composed browser census requires every inactive descendant inert, hidden, untabbable, unnamed-control-free, and focus-correct. |
| `proof:liquid-morph` M5 | A Markdown DELTA names p50, 4× throttle, Metal/ANGLE, a default, and old numbers. | CTA→Dock took about 2009ms with no declared acceptance band. | Numeric trajectory/frame evidence and exact environment decide; prose fields have zero evidence credit. |
| `proof:dock-gate-roster` | Exactly ten named gate files and their close tags. | The exact roster can exist while Dock behavior is visibly broken. | Delete the count/file roster; ordinary Dock scenarios are discovered from product states and reject missing semantics, not filename changes. |
| visual enrollment/ledger architecture | CI can verify enrollment or a stored DELTA while native execution is absent from the run. | Enrollment and receipt integrity say nothing about current native paint, engine identity, console state, or gestalt. | A receipt authenticates an exact native run; it never substitutes for one or converts missing/stale evidence to PASS. |
| `proof:fourier-field` + `proof:viz-constellation` | The registry descriptions demand Canvas2D and forbid GPU paths while the executable scripts under those same IDs demand the exact inverse. | Both implementations arm WebGPU/WebGL2; Fourier's live route says so, while stale docs still claim Canvas2D, and Constellation's entire live story claims Canvas2D. | Delete both identities and decide per product: keep Fourier's justified compute/render pair; de-migrate the CPU-owned, seven-instance Constellation to one Canvas2D renderer and make every public projection agree. |
| `proof:no-retired-survivor` + `proof:constellation-substrate-single` | The former explicitly preserves `drawOverlay` as a public prop after admitting that the GPU loop never invokes it; the latter rewards the story that consumer skin reaches the canvas only through that callback. | Five advertised story bindings across seven mounted Constellation canvases pass a callback the renderer never reads; click-to-warp showed no accent focal after 700ms. | An inert public prop is a survivor: restore the proportionate Canvas2D renderer and its ordered overlay pass, delete the GPU fork, and prove every advertised skin causally. |
| `proof:motion-one-clock` | Calls itself completeness, but scans selected corpora and exempts a local rAF/easing loop whenever the file imports any keyframes primitive. | The live Springs playground self-schedules rAF; the published EasingPicker separately runs a fixed 1200ms rAF preview with no PRM/playing state; the command still reports one clock YES because complete product reachability and semantic authority do not control enrollment. | Replace “one global clock” with one temporal authority/writer per property or semantic episode; discover the whole current tree, make physical demos consume managed playback, and allow a bounded editor preview only when it truthfully owns its proportionate lifecycle. |
| `proof:deck` D7 | Requires `installDeckSpring`, lazy keyframes loading, `deckEase`, and a separate `DECK_SPRING` while calling `--spring-deck` an alias of canonical smooth. | The required 0.5/0.85 pair differs from canonical smooth 0.58/0.8, failure silently substitutes cubic-out, and no current Glass or tracked external package import consumes the exported easing; live Deck navigation works independently. | Delete the inert/forked Glass facility and its projections; retain actual Deck behavior and keep slides' distinct local editorial spring under the foreign owner rather than as a compatibility excuse. |
| `proof:button-glass` B2 | Requires Button to import/call `useSpringPress` and `useLiquidFlex` directly and retain a CSS `:active` scale. | `useLiquidPress` declares itself the sole canonical coupled wrapper and explicitly says Button stays inline so this proof remains green; DockControl already consumes the wrapper, and CSS/JS scale phases can overlap. | Fold the spring leaf private behind one public press owner, repoint all pressables, and make the CSS floor exclusive to no-JS/pre-hydration instead of a concurrent writer. |
| `proof:motion-suite` + `proof:motion2` + `proof:motion-demo` | Declare Glass a distribution seam for a hard-coded upstream export catalogue, require a reverse row for every CSS easing alias, and force the Glass demo to reproduce a foreign taxonomy; the sibling-source census skips when absent. | keyframes.js 5.2.0 currently exposes three root exports absent from the supposedly complete 31-name list; no tracked sibling consumes `/motion-curves`; the live “FULL 1:1” gallery shows stale numeric labels for all five spring rows while invoking/describing newer preset values. | Delete the upstream root re-export, `/motion-curves`, reverse table, mirror tests/docs, and foreign taxonomy. Preserve Glass-owned `/motion` bindings, semantic presets, and the real `/easing` editor; direct consumers import upstream directly. |
| `proof:motion-composables-consumer` | Defines demand as two existing path strings and deliberately counts a demo plus a unit test for both useCountup and vReveal. | A test is evidence for a chosen surface, not a reason the surface should exist; the detector does not even parse whether the cited file imports or executes the primitive. | Discover real runtime imports and causal rendered use. Tests, types, barrels, docs, future asks, and path existence have zero demand credit; delete an unowned primitive rather than letting its own test justify it. |
| `proof:no-layout-animation` | Calls every non-reflow-name, paint property, and untraced custom property compositor-safe, then allows nineteen named layout exceptions and reports the architecture LOCKED. | Paint is not compositing; custom properties inherit their sinks; width/height/grid/margin remain layout even on an allowlist; source parsing supplies no CLS, main-thread, layer, or frame evidence. | Resolve custom-property sinks, classify layout/paint/composite, and bind necessary layout reclaim plus composite claims to owner-specific native traces. Delete the filename allowlists and command identity while retaining the real negative properties. |
| `proof:motion-presets` | A constant prose `CONSUMER_RECORD` makes `--ease-convergence` and `[data-scroll-reveal-once]` permanent and the command currently PASSes. | Nine bound sibling HEADs have zero tracked product files containing either term. Glass's real section-reveal owner explicitly calls `vScrollRevealOnce` public-but-unused; the remaining witnesses are definitions, capture CSS, and the primitive's own test. | Delete the consumerless alias/directive/CSS/test/prose together. Preserve ordinary once behavior only through a current runtime owner; a future coordination ask is not present demand. |
| `proof:animation-coherence` | A fixed file→register roster requires a static `data-reveal="overlay"`, preserves filename exemptions, and counts alias definitions as spring consumers. | Dialog correctly resolves `:data-reveal="isCenter ? 'overlay' : undefined"`, yet the live command exits RED on that exact file; dead alias publication can simultaneously count itself green. | Delete the roster/exemptions/alias credit. Resolve dynamic bindings and token consumers semantically, then observe effective register/writer/PRM behavior in typed scenarios. |
| `proof:spring-tokens-synced` | Duplicates `0.68/0.64` as canonical Dock taste and freezes an exact spring-row count beside `SPRING_PRESETS`. | Its own run reports const/preset parity at current `0.30/0.82` and 8/8 CSS↔JS tempo parity, then exits RED solely because the obsolete `0.68/0.64` positive regex remains; the script itself says value-binding taste gates were forbidden. | Derive CSS/runtime/demo/docs from one preset owner; verify generated and trajectory equality plus measured bands, never duplicated taste literals or vocabulary counts. |
| `proof:easing-primitive` | Requires a vanished `src/api/index.ts` and exact old topology; calls two modes of one demo plus Markdown mentions a consumer bar. | W1–W4 are currently YES and the command exits RED only on the internal barrel, while the packed `/easing` surface has current imports in value.js and keyframes.js. The actual editor simultaneously has pointer-only Bezier handles, silent Clipboard rejection, a clipped play control, and an undeclared PRM-blind preview clock—none of which affects those witnesses. | Preserve `/easing`, delete the path oracle, and verify packed resolution, exact consumer fixtures, causal semantic editing, explicit copy failure, legible controls, and truthful preview/PRM behavior. Internal file movement is neutral. |
| `proof:demo-affordances` | Hard-enrolls selected files and claims the re-homed EasingPicker control remains covered without reading its new component path. | The exact forbidden `btn-pill glass-btn` stack now lives in EasingPicker; its `Climb the staircase` action renders as a visibly clipped 40×40 blob while the command reports W1 YES and PASS. | Delete the path roster. Discover rendered text actions through current story/component reachability and resolve actual width, clipping, label, and material semantics; a move or re-home cannot change enrollment. |
| `proof:a11y` | Calls a finite set of source arms a framework; its EasingPicker arm checks only two SelectTrigger labels and separately credits the SVG host's image role. | Live causal assays found pointer-only Bezier handles, Blob press, DataTable sorting/selection, Timeline event choices, and an imperative `aria-hidden` Drawer detent; a pointer-styled DarkMode no-op; and Typewriter's hidden pointer-only default. The command still reports EP triggers=2 unnamed=0 and PASS because none can contradict an arm that never enrolled them. | Delete the finite global arm roster. Discover every operable descendant and public default-on interaction from current template, imperative, render-function, and composed reachability; bind causal name/role/value/state/focus/keyboard behavior, and reject decorative handlers or control-styled no-ops. |

The semantic census also exposed a formation-tool failure that would have repeated the
same gate error under a new name. A first-pass source regex ended an opening tag at
the first `>`, so quoted Vue arrow expressions such as `@keydown="(event) => ..."`
silently truncated the tag and undercounted operable hosts. The quote-aware census
finds 184 template event-host rows across the frozen 370-file Vue source base. A
second full-tree TypeScript AST pass finds eighteen more imperative/render-function
event hosts across fourteen files—including the multiline Dock listener the lexical
search missed and the native `h("button", { onClick })` control a template-only pass
cannot see—for 202 reviewed source hosts in total. Every row receives one disposition,
but those cardinalities remain research observations, not a replacement roster.
Execution rediscovers from the current route/import/render graph; the frozen ledgers
prove formation completeness and parser integrity, never that a moved, dynamically
bound, or newly composed control does not exist.

The same rule applies to omission, not only event hosts. A full Vue-AST pass finds
291 explicit component/model defaults across 86 component files and binds every row
to direct first-party omission/override receipts plus one product disposition. Sixty-
four are behavior/mode candidates; four have direct demos that never exercise the
omission path, and three have no direct demo occurrence. These counts are descriptive,
not a verifier threshold. The authored review folds twenty-three RED declarations
into nine existing product findings. It catches Typewriter's default-on interaction,
Drawer's omission-derived ladder, and two demand-laundering patterns the event census
cannot: StackedIconGroup promises a default hover reveal after slicing hidden items
out of the DOM, while the retained Carousel concept shelters an exported
GlassCarouselPager with zero runtime consumers even though the live canonical pager
already moves `1 / 6 → 2 / 6` through native controls. The former remains P083
deletion; the latter is deleted inside P119. Neither earns a repair wave, alias, or
gate merely because a demo or sibling concept exists.

The exhaustive mechanics census removes any dependence on those representative
examples. All 403 registry rows have unique package command keys; 387 dispatch
directly to bespoke `scripts/proof-*` programs. Four hundred rows expose at least one
measured accretion mechanism. At the direct-command level, 380 read source files, 334
inspect file presence, 374 apply lexical string/regex predicates, 229 declare
path/file/roster/allowlist-like collections, 72 perform nontrivial fixed-cardinality
comparisons, 158 reference Markdown, 237 carry self-test vocabulary/machinery, and
365 write identity-specific gate artifacts. Most decisively, 297 rows donate at least
one browser-kind product property under the perfected mapping, while only 22 direct
commands invoke a browser runner; 277 cannot by themselves establish the browser
property now associated with them. These are lexical exposure facts, not an assertion
that every `readFileSync` or self-test is intrinsically wrong. The exact 403-row ledger
exists to make that distinction inspectable while still deleting every command
identity: useful device-free clauses move to ordinary tests or semantic discovery;
painted behavior moves to exact native scenarios; path, count, prose, and artifact
ceremony receives no product credit.

The rendered tempo counterexample is especially instructive because it requires no
legacy command to manufacture the contradiction. At `--motion-tempo: 0.70` and
`1.30`, the live Dialog panel resolves to 308 ms and 572 ms and its trigger to 245 ms
and 455 ms: both scale by exactly 13/7 within computed-style rounding. The same
portaled scrim remains 550 ms in both states because `glass-reveal` reads the
spring-tempo projection while `sheet-animate` reads fixed `--duration-panel`. Thus a
correct leaf projection and a truthful “8/8 token parity” report can coexist with a
false “one clock / every overlay” product claim. The retained property is normalized
clock-factor agreement over every named channel of the composed episode, including
close, interruption, and the newly constructed JS Dock morph; it is not another
token-row counter or a demand that every mechanism share one scheduler.

The adjacent `v-reveal` flagship repeats the split from the opposite direction. Its
six exercised rows all resolve `--spring-bouncy`, yet they run a local 500 ms duration
and 80–480 ms literal stagger while the owning bouncy row publishes a 570 ms settle
reader multiplied by `--motion-tempo`. Calling that CSS “consumer-owned” correctly
allocates composition, but it does not grant the demo an alternate spring horizon.
The repair pairs named physical trajectory and generated duration at their owner,
declares the stagger interval's tempo behavior, and treats the nested-rAF Replay as a
reset lifecycle to observe—not as proof that the motion contract is coherent.

The Springs lab then reveals that “same parameters” is still weaker than “same
generated product.” Its smooth authoring readout contains 24 percentage stops beginning
at 4%, while the effective shipped token contains 48 beginning at 2.041%; the strings
are 418 and 824 characters and unequal. The generator passes the measured settle as
`maxDuration`, but the story calls the default solver and plays every preset for a fixed
1100 ms. Even its prose says four shipped registers while the derived menu exposes
seven from an eight-row table. The repair derives option copy, exclusions, solver
configuration, readout, duration, and managed playback from the owner. No exact preset
count becomes a gate: the invariant is that adding or removing a row updates all
derived projections without a hand-edited numeral or lookalike solver call.

The published EasingPicker is the sharpest proof that wholesale gate abrogation must
preserve properties, not outcomes. Its real authoring core deserves retention: CUA
changed a Bezier literal by dragging, changed Steps 4→9 by pointer and 9→10 by
ArrowRight, changed `end`→`jump-none`, and kept the literal reparsable. Yet the old
path gate rejects that working product only because an internal barrel vanished,
while two green gates miss its actual regressions. The Bezier handles are pointer-only
inside `role=img`; Clipboard rejection leaves an unchanged button; the play label is
crushed by the exact mutually-exclusive class stack already documented in source; and
the fixed preview clock has neither PRM nor truthful authority state. The transposition
keeps `/easing` and its causal math, then binds semantic handles, copy-failure recovery,
content-width action geometry, and proportionate preview lifecycle to ordinary family
evidence. No command identity survives merely because it once named one of those
properties.

These rows expose the crux of gate accretion particularly clearly. The
registry can cease to describe its executable, and one gate can protect a no-op that
another gate narrates as the only valid product path. Each command may remain locally
green because neither owns end-to-end semantic truth. More gates then make the defect
harder to remove: fixing the implementation breaks one historical oracle, while
preserving the oracle leaves a false API and false demo. This is why wholesale
identity abrogation is not aesthetic cleanup; it removes conflicting authority lanes.

The motion cases add a second failure mode: a gate can keep its prose promise only by
forcing the repository to retain the wrong abstraction. “One clock” became an import
heuristic that missed the public demo's private clock. “Deck smooth” became two unequal
parameter sources plus silent substitution. “One press” became two implementations
because the Button oracle asserted implementation spelling instead of press behavior.
“Suite complete” became a stale downstream copy of an upstream root barrel, while the
live parity demo exposed five stale numeric labels over current callables. “Two
consumers” became a demo plus the primitive's own test. “Compositor-only” became a
name filter that treated paint and unknown custom-property sinks as composite and made
layout debt green by filename. “Future consumer” became a constant that kept two
zero-demand motion branches alive. “Coherent” became a static-literal regex that
rejected the correct dynamic Dialog value. “Synchronized” became a stale taste
literal that overruled its own one-source table. “Published” became a vanished
internal barrel even while two external repositories imported the actual packed
subpath. “Every overlay co-scales” became a correctly scaled focal Dialog panel beside
a fixed 550 ms portaled scrim. “Consumer-owned reveal” became a fixed 500 ms copy of
a 570 ms×tempo spring horizon. “Exact CSS twin” became a 24-stop default-horizon
lookalike beside the shipped 48-stop measured-horizon token. The fold is therefore not
a looser verifier. It is a
stricter semantic verifier with less executable identity: direct dependency authority,
current-tree runtime discovery, one owner per property/episode, sink- and trace-derived
channel truth, packed-boundary evidence, derived values, effective binding resolution,
and no credit for test existence, future prose, or historical implementation spelling.

The formation itself initially repeated this representational failure: its first
403-row disposition pass selected the first regex match over each gate's entire
historical note. Consequently `proof:webgpu-everywhere` mapped to package build,
`proof:adaptive-observer` mapped to present-tense comments, and
`proof:dock-crossfade` mapped to DAG governance. A complete-looking table therefore
hid semantic loss.

That classifier is now deleted. The next design pass then exposed a more subtle
reenactment: the proposed 403→40 consolidation still assigned one command and one
table file to each of forty renamed families and validated that there were exactly
forty. It deleted historical names while preserving the underlying rule “one proof
concept, one executable identity.” That was a compression of the registry, not an
abrogation of the contrivance.

The corrected authority contains 403 unique authored dispositions—one for every
source row and no fallback—binds each complete old note by SHA-256, and records
predicate reversal as data. **All 403 historical gates are abrogated wholesale as
identities, and all 403 have no one-to-one command successor.** Forty old rows donate
initial oracle research; 362 contribute audit lineage; the registry's aggregate
`test` gate has no semantic successor even though ordinary `npm test` remains a
developer task. The current forty invariant rows are a non-normative
descriptive vocabulary only: none has a command, package alias, named runnable case,
or table file, and nothing requires the vocabulary to remain forty. There is one
executable owner, `scripts/verify.mjs`, whose cursor selects ordinary tests, semantic
discovery, live scenarios, and evidence plans by owning wave.

Even “403” proved to be a registry-shaped blind spot. The frozen package has 435
scripts: fifteen executable proof/gate aggregates existed outside the manifest. The
atomic surface disposition therefore covers every package script, not only every
registry row: 415 aliases, all 383 `scripts/proof-*` files, and four registry/runner
files are deleted (387 gate/proof infrastructure files total); twenty
ordinary developer/lifecycle/demo/diagnostic tasks remain. Only `typecheck`, `test`,
and `build` retain a source-registry spelling, with registry membership and alias-only
acceptance explicitly removed. Those numbers document this source base and are not
future success criteria; the structural law is zero proof/gate aliases and one
verification owner.

Thus “fold” does not mean “hide the old gate under a table entry.” Terminal migration
facts stay wave acceptance; equivalent properties merge into discovery; consumer GG
predicates remain typed evidence-plan rows; ceremony has no execution shape. This is
still formation, not execution credit: every applicable property must prove a
realistic mutation RED→restored PASS against the then-current semantic roster.

The folding law is therefore stricter than “delete redundant scripts”: **reverse a
false oracle before deleting its command; compose partial oracles with their live
browser truth; reject ceremony without laundering it into a broad category; preserve
each retained negative control as typed evidence-plan data owned by the relevant
product wave, never as a new runnable case.** Otherwise consolidation only compresses
the evidence of wrongness.

## Counterfactual tests

The diagnosis would be wrong if any of these were true:

1. Large wave count alone caused failure. BD falsifies this: it shipped 158 waves.
2. More parallel agents alone solved failure. BG falsifies this: fan-out without
   durable integration produced repeated work and no commits.
3. More detailed prose alone solved failure. BC and BG falsify this: both contain
   extraordinarily detailed plans while implementation or closure remained open.
4. Visual tooling outage were the primary cause. AM, N, AN, BA, and BG contain
   nonvisual terminal mismatches too; the law accepted missing evidence.
5. Release ceremony were the only problem. BB stopped before release because its
   graph had already pushed product truth into a terminal tail.

The causal model survives those counterfactuals. The decisive variables are terminal
semantics, topology, executable write authority, durable representation, and
idempotent integration.

## Non-negotiable BI process repairs

- No execution wave called audit, close, final, reconcile, true-up, sweep, leftover,
  reflect, last, post-cut, or successor may exist unless its subject is a concrete
  product or durable-tool change that could not have landed with its producer.
- No wave passes on the existence or wording of this formation corpus.
- No current number is a success criterion. Counts may establish scope; structural
  and behavioral predicates establish acceptance.
- Every discovered omitted obligation is added to the current graph and challenged
  for dependency minimality before more dependents run.
- Every repair path carries conditional write authority and an exclusive lease; a
  conditional row closes as `MODIFIED` or `VERIFIED_UNCHANGED`, while an overlapping
  explicit create/rename/delete closes with its matching structural outcome.
  `VERIFY` paths are read-only and may never be used to imply a repair occurred.
- Frozen-source repair discoveries are projected through ancestor renames and
  deletions before dispatch; explicit stale subjects fail and are never silently
  rewritten.
- Every version and tag is a projection of terminal graph state; neither creates or
  repairs that state.
- Every visual claim names browser, viewport/input mode, state transition, observable
  properties, thresholds/ranges, reduced-motion behavior, and evidence freshness.
- Every external claim is either verified read-only, owned by a named handshake, or
  omitted from the tranche promise. Dirty sibling state is never overwritten.
