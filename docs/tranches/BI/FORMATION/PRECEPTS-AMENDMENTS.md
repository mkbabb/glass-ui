# Proposed amendments to the ROOT precepts canon

## Authority and scope

These are recommendations against the ROOT repository at
`/Users/mkbabb/Programming/precepts`, not the glass-ui-local copy and not a
submodule mirror. The ROOT checkout was inspected read-only. After the 2026-07-14
execution-preflight fetch, it is on local `main` at
`458c2d1167f4e3a327edf17fc7509da533cacf1e`, 40 commits behind the observed
`origin/main` tip `8781ebb06c03547f57e33182ec1a970fd96d7069`, and has untracked
`instructions/TRANCHE-FORMULATION.md`, `instructions/DESIGN-ITERATION.md`, and
`instructions/PRECEPTS-GRAND-AUDIT.md`. No change to that repository is authorized
or performed by perfected BI.

That lineage condition is itself a material finding: an untracked instruction can
govern a session without governing the next session, while a behind checkout can
validate against superseded law. Canon needs one declared authority and a validator,
not another local reminder to remember the right file.

## Amendment map

| ID | ROOT file and current locus | Current failure | Recommended canonical change |
| --- | --- | --- | --- |
| P-01 | `instructions/tranche/SPEC.md:21-33` | A plan explicitly contains “cross-tranche debt and explicit deferrals,” making the tail part of the expected shape. | Replace with an obligations ledger whose only planned terminal dispositions are `DONE` and `DEAD`; debt may be recorded as context but cannot satisfy close. |
| P-02 | `instructions/tranche/SPEC.md:83-102` | Scope reveal may automatically open `{LETTER}-II` or the next letter. Discovery is therefore allowed to escape the graph that omitted it. | Absorb revealed obligations into the current DAG by default. A successor is allowed only after explicit user termination of the current tranche; the current tranche remains `BLOCKED`, never “honestly closed.” |
| P-03 | `instructions/tranche/SPEC.md:111-120` | Close accepts “landed, retired, or has a named destination.” A named destination is not delivery. | Require every wave terminal `DONE|DEAD`, every applicable property current through one verifier, every π obligation current, exact `FINAL.md` present and validated, release/tag parity true, and no open brittleness window. Remove the named-destination clause. |
| P-04 | `instructions/tranche/WAVE_SPEC.md:20-27` | Legal statuses include `complete_with_misses`, `blocked`, and `superseded` beside `complete`, conflating execution and terminal state. | Define execution state separately: `PLANNED|RUNNABLE|RUNNING|BLOCKED`; define terminal disposition: `DONE|DEAD`. Only the latter satisfy dependencies. `DEAD` requires a permanent rationale and evidence that the promise is withdrawn. |
| P-05 | `instructions/tranche/WAVE_SPEC.md:34-42` | File bounds have a flat table but no exact repair closure, source-base digest, ownership, or create/delete/rename semantics. A detailed repair list can therefore remain read-only while scope requires it to change. | Add machine-readable `subjects`, `repairs`, and `artifacts` arrays; each path has before-state digest, action, owning unit, and after-state predicate. `VERIFY` is read-only; `REPAIR` is conditional write authority and an exclusive lease. Conditional repair closes `MODIFIED|VERIFIED_UNCHANGED`; an overlapping explicit action closes `CREATED|RENAMED|DELETED` as applicable. Include import, test, verification, Vite, TypeScript, package/export, and docs categories with explicit zero rows where inapplicable. |
| P-06 | `instructions/tranche/WAVE_SPEC.md:56-76` | Hard gates can be individually plausible while collectively vacuous; dependency edges have no minimality proof. | Require a falsifiable acceptance property, at least one discriminating bite, an evidence-plan projection into the one verifier, π/device-free declaration, minimal incoming edges, terminal owner, and a machine-generated `blocks` set. Reject transitive or ceremony-only edges and reject any wave that creates its own proof command merely to restate its acceptance. |
| P-07 | `instructions/tranche/WAVE_SPEC.md:78-84` | Prohibitions do not forbid aliases, shims, fallback masks, count locks, prose-presence checks, per-property commands, or tail-only proof waves. | Add explicit bans and a schema validator. Capability degradation paths are allowed only when named product reach requires them and both paths share observable acceptance. |
| P-08 | `instructions/ORCHESTRATION.md:3-45` and `instructions/tranche/AGENT_DISPATCH_TEMPLATE.md:34-39` | The orchestrator appears to own integration, yet dispatch permits an agent commit “if commits are part of this workflow.” Other variants contain a 0.9-budget commit instruction. Ownership is not singular. | Select one model: research agents are read-only; implementation agents return bounded diffs/artifacts; the orchestrator alone commits and updates the disk cursor. Remove every elapsed-budget commit instruction. If agent commits are ever supported, define a different explicit protocol rather than conditional prose. |
| P-09 | `instructions/ORCHESTRATION.md:47-68` | A stall may open a new tranche/pass, again allowing the current omission to escape. | A stall can split, amend, or block the current graph. Opening a successor requires explicit user termination and cannot change the current terminal result. |
| P-10 | `instructions/ORCHESTRATION.md:84-92` | Status is written at wave boundaries but no transactional order or recovery authority exists. | Canonize `preflight -> cursor RUNNING -> bounded diff -> verifier evidence -> one integration commit -> cursor DONE -> graph recompute`. On restart, disk cursor plus git is authority. Define stale-worktree and no-op terminalization. |
| P-11 | `instructions/tranche/RESEARCH.md:20-24` plus the substrate-with-consumer rule | Existing variants allow an exported substrate to stand without a real consumer, and consumer evidence often becomes a fixed count. | Require at least one real runtime consumer for an internal substrate; a public primitive additionally needs a named external import or a product-owner decision plus a first-party runtime demonstration. Discover rosters from syntax/import graphs; never lock a count. |
| P-12 | `instructions/tranche/CHALLENGE.md:8-9,38` | “Do not expand scope” prevents a challenger from naming an omitted obligation—the central purpose of adversarial review. | Say: challengers may widen the obligation set when evidence proves the plan incomplete; they may not broaden architecture or product ambition without such evidence. Every omission becomes a finding with a graph consequence. |
| P-13 | `instructions/TRANCHE-FORMULATION.md:18-30` | The 32-agent budget and batch rule are prose; model identities are persona names and there is no availability check or run record. | Add a routing manifest with exact provider/model IDs, roles, concurrency, context policy, and fail-closed availability check. Record every dispatch. Never silently inherit or relabel a model. Design/synthesis must route to the declared design model; mechanical fan-out to the declared research model. |
| P-14 | `instructions/TRANCHE-FORMULATION.md:32-38` | A “banked with re-trigger” partial is allowed, which conflicts with the same document's no-rebooking rule and the desired terminal law. | Remove banked as a terminal disposition. During formation a route may be `ACTIVE|BLOCKED|REJECTED`; at handoff every accepted product obligation maps to a wave and every rejected route maps to `DEAD`. |
| P-15 | `instructions/DESIGN-ITERATION.md:27-35` | Two clean passes and independent audit are normative but not defined as artifacts or authorship constraints. | Require pass manifests: input graph hash, author IDs/models, findings, dispositions, graph diff, and clean/not-clean result. An auditor cannot have authored a challenged family. Two clean passes must use the same winning-spec digest and current source base. |
| P-16 | `instructions/tranche/SPEC.md:49-66` | “Explicit document reconciliation” is an accepted hard gate and runtime string grep is only narrowly rejected. This enables spec-cites-itself proof. | Documents may prove documentary obligations only. Runtime, API, behavior, visual, performance, and architecture claims require executable evidence. Ban fixed-count, prose-string, file-presence-only, and self-citing checks unless existence itself is the user-visible contract. |
| P-17 | ROOT repository lineage (missing machine rule) | A behind/dirty checkout and untracked canon can still drive execution. The grand audit reports multiple variants/tips. | Add `CANON.json` and `validate-canon.mjs`: one normative branch/commit, clean-tree requirement, versioned schema, variant lineage, required-document hashes, and consumer conformance. Refuse execution when authority is ambiguous. |
| P-18 | Close/release canon (missing) | `FINAL.md`, release battery, version, tag, and publish are often ordered as tail ceremony; tag commits have repaired failures. | Define `FINAL.md` as a continuously updated generated projection and a precondition to tag. Tag commit must be source-identical to the fully green release commit except permitted metadata; the single verifier proves tag/version/changelog/dist parity. |
| P-19 | π canon (missing from ROOT core spec) | Historical close permits tool-deferred or build-floor visual claims. Captures may be stale or absent, while labels such as “Safari-current” hide the actual build and assume volatile platform behavior from feature existence. | Add a π schema: exact browser name/version/build and native-vs-emulated status, device/adapter/renderer identity, feature-probe results, viewport/input, setup/action/causal semantic or numeric observable, quantitative band or discriminating comparison, PRM/contrast state, console/unhandled-rejection ledger, evidence path, source/build/tarball hash, capture timestamp, and freshness. Tool unavailable => `BLOCKED` or claim withdrawal. |
| P-20 | Verification identity lifecycle (missing) | Per-wave proof commands accumulate indefinitely; even a consolidation can reenact the problem by minting one command/table per renamed family and count-locking the replacement registry. | Canonize one cursor-derived verifier. Recurring properties extend ordinary tests, typed live scenarios, semantic discovery, or evidence-plan data in their producing wave; they do not receive commands, package aliases, table files, named runnable cases, or historical wave names. Property vocabulary size is non-normative. A retained property must state public behavior, realistic RED mutation, evidence contract, owner, and retirement rule. |
| P-21 | Repair transaction authority (missing) | Existing schemas do not distinguish an immutable assay input from a consumer/build/test path that may need an in-wave edit. Executors either leave demanded repairs stale or write outside their lease. | Add `REPAIR` as a first-class conditional action. Acquire the exact-path lease before dispatch; bind its integration-parent blob; require a per-path terminal disposition of `MODIFIED` with postimage or `VERIFIED_UNCHANGED` with reason; reject completion if a repair remains read-only, undispositioned, or was changed outside its owner transaction. |
| P-22 | Repair-path lifecycle projection (missing) | Repair discovery is source-base-bound, but later manifests can continue naming paths that ancestor waves renamed or deleted. A special-case filter can hide one deletion family while leaving the graph archaeological and unexecutable. | Before dispatch, project every mechanically discovered repair path through rename/delete events in the wave's dependency ancestry. Bind every projected target to its exact producer and source provenance; subtract ancestor-deleted definitions from descendant repair scans. Reject any explicit subject that names a pre-mutation path. Preserve same-wave rename/delete sources and close them with structural receipts. Generate a complete source→execution-path ledger; its observed row count is non-normative. |
| P-23 | Evidence-kind and terminal-stratum neutrality (missing) | Gate-shaped thinking can survive command deletion in acceptance prose and sequencing rules: mutation bites still say “the gate must fail,” or a validator forces painted/browser work to be last regardless of dependency topology. This recreates terminal ceremony and makes evidence type a phase label. | Require every mutation bite to name the property or observable evidence that turns RED; reserve “gate” only for historical archaeology and explicit removal. Derive the last stratum solely from minimal semantic dependencies. Browser evidence follows painted claims wherever they occur; device-free claims remain device-free even when topologically last. Never add an edge or tail wave to make the tranche end on a preferred evidence aesthetic. |
| P-24 | Declared-oracle congruence and public no-op prohibition (missing) | A gate registry can state the logical inverse of the executable under the same ID, while a retirement check can explicitly preserve a public callback after admitting the implementation never invokes it. Each local check remains green because no authority owns source→type→docs→demo→runtime agreement. | Forbid separate normative prose and executable meanings. Derive public claims from one typed property/evidence-plan record and reject any registry, docs, demo, or receipt projection that disagrees with reachable source or selected runtime state. Treat every accepted prop, event, slot, export, and command as an executable obligation: an inert compatibility no-op is a surviving API defect and must either be implemented end to end or removed with every consumer in one clean break. |
| P-25 | Temporal ownership and scheduler proportionality (missing) | “One clock” can be interpreted as one application-wide callback or checked through import names/raw rAF counts. That both forces unlike work—physics, render loops, native timelines, event coalescers, and discrete typing—through the wrong mechanism and lets an unrelated local loop pass merely because its file imports the blessed engine. | Define the invariant at property/episode level: one temporal authority and one writer, with an explicit mechanism class, stop condition, pause/PRM/interruption semantics, and teardown. Permit upstream managed playback, lifecycle-aware continuous loops, native/CSS timelines, one-shot coalescers, and cancellable semantic timers where proportionate. Discover the full current source and demo tree; forbid import-based exemptions, global callback quotas, fixed scheduler counts, and concurrent capability-phase writers. |
| P-26 | Product predicates over implementation spelling (missing) | A proof can require an exact internal import/call pair and thereby make a duplicate implementation mandatory after the repository has created a canonical wrapper. The gate stays green only while architecture remains worse. | A retained predicate names public behavior, ownership, resource bounds, and causal observables. It may constrain an internal boundary only when that boundary is itself an accepted architecture/product contract and must survive refactoring. Reject checks whose only bite is changing an import, helper name, call nesting, file count, or wrapper topology while behavior and ownership remain correct. Canonical-owner discovery must RED duplicate implementations even when a historic gate demanded one. |
| P-27 | Dependency ownership versus distribution mirroring (missing) | A consumer library can call itself a “distribution seam,” re-export a dependency's entire public catalogue, and then use a hard-coded parity gate to make that redundant surface permanent. The mirror drifts whenever upstream grows and creates wrapper work without product demand. | A dependency remains the direct authority for its primitives. Re-export only a deliberately owned adaptation with real consumer need; never mirror an upstream root barrel, demo taxonomy, or callable catalogue for convenience. Upstream export growth must require no downstream wrapper edit. Boundary evidence proves direct imports, owned adaptations, packed resolution, and actual consumers—not name parity. |
| P-28 | Consumer evidence excludes tests, path existence, and sibling demand (missing) | “Two consumers” is often satisfied by one demo path plus one unit-test path, checked only for existence. A primitive can therefore create its own test and become self-justifying shelfware; a file can count even after its import disappears. A retained product concept can also donate its real demand to an unused sibling implementation: Carousel's causal `CarouselPager` does not make the exported zero-consumer `GlassCarouselPager` fork necessary. | Discover consumers through syntax/import resolution and runtime behavior at the exact public member/implementation boundary. Unit tests, type-only imports, barrels, docs, registry rows, future asks, path existence, and demand for a sibling member contribute zero product-demand credit. A demo is a first-party product witness, not automatic external demand. Internal substrates require a real runtime owner; public primitives require a current external receipt or explicit owner decision plus causal first-party demonstration. A future coordination ask creates a formation/co-land obligation, never present producer demand; unused substrate does not land in advance. Counts are descriptive, never thresholds. |
| P-29 | Animation channel truth and custom-property sink resolution (missing) | A source gate can call every non-layout-name “compositor-safe,” including paint properties and all custom properties, while permanently allowlisting named width/height/grid/margin animations. This confuses no-reflow with compositor execution and cannot prove CLS, main-thread work, layer state, or frame pacing. | Resolve each animated custom property to its final sinks and classify actual output as layout, paint, or composite. Paint never receives compositor credit; transform/filter candidates require current browser trace evidence. A necessary user-initiated layout reclaim must state its semantic need and meet owner-specific CLS/main-thread/frame bands; filename/path allowlists have no authority. Discover the current tree and retain negative controls for custom-property layout sinks, paint, layer demotion, and excessive reclaim cost. |
| P-30 | Dynamic binding and effective-state semantics (missing) | Regex gates often require one static Vue/JSX/HTML spelling and reject an equivalent dynamic binding, computed class, generated attribute, or wrapper-owned projection. A correct runtime state can be RED while a dead literal in an unreachable branch is GREEN. | Verify effective semantics through compiler/AST-aware resolution plus typed runtime observations. A source predicate may constrain a literal only when the literal itself is the public wire format. Equivalent static, dynamic, or generated implementations satisfy the same property; unreachable/comment/prose strings never do. Retain negative controls that change the resolved value while preserving the old source-shaped token. |
| P-31 | Derived values and non-normative vocabulary cardinality (missing) | A verifier can duplicate exact aesthetic values, stale-number blacklists, and a canonical row count beside the alleged owner. It then becomes a second design authority, rejects a current owner for not reverting to old taste, and makes vocabulary growth a gate edit. | Values have one owner. Generated code, runtime consumers, demos, and docs derive from it; verification checks projection equality, dimensional/physical validity, semantic assignment, and measured ranges or relations. Exact taste literals and vocabulary counts appear in verifier code only when the user has expressly made them immutable product law; otherwise counts are descriptive and parameter changes need no verifier rewrite. |
| P-32 | Packed public boundary over internal barrel topology (missing) | Public-surface gates can demand a vanished `src/api/index.ts`, root barrel, hand-written subpath file, or pre-flatten directory even when the packed export resolves and current external owners import and execute it. Internal reorganization therefore makes a working product RED. | Define public truth at the packed candidate: package exports/types, emitted declarations/assets, exact consumer resolution, and causal runtime behavior. Internal barrels and paths are generated architecture unless expressly public. A move/flatten/regeneration with an identical packed/runtime contract is neutral; a missing packed export, declaration, consumer resolution, or behavior is RED. |
| P-33 | Legacy command outcomes are diagnostic, not normative (missing) | During tranche formation a green historical command may certify dead substrate, while a red command may reject the correct current architecture. Treating either exit status as inherited acceptance forces the new tranche to repair false oracles back to green. | Run legacy commands only as source-bound diagnostic probes. For every contradictory command, record the exact rewarded state, current counterexample, disposition, replacement property, and retained negative controls. Reverse or reject the false predicate before deleting the identity. A legacy PASS/RED has no execution authority in the new formation; only the canonical property evidence decides the product. |
| P-34 | Semantic enrollment follows current reachability, not authored path rosters (missing) | A source verifier can hand-enroll old component/story files, then keep reporting PASS after a control is moved or re-homed into an omitted path. In the current counterexample, `proof:demo-affordances` explicitly says the re-homed EasingPicker playback control remains covered but never reads `EasingPicker.vue`; the exact forbidden fixed-square/text-pill collision therefore renders as a clipped 40px blob under PASS. A parallel finite accessibility-arm list checks only EasingPicker combobox labels and misses its pointer-active, focusless SVG handles. | Generate enrollment from the current import/render/route graph and semantic roles, then apply reusable generic predicates plus family-specific cases. Moves, re-homes, new consumers, and deletions update reach automatically without a verifier roster edit. A fixed file or arm list may optimize discovery only when it is generated and completeness-checked against the semantic graph; omission is RED. Source parsing cannot override composed browser controls, resolved style geometry, focus/role/value behavior, or causal interaction. Retain negative controls that move a known defect to a new file while preserving the same semantics. |
| P-35 | Public omission/default and false-affordance law (missing) | A public interaction may default on while every first-party consumer explicitly disables it, leaving a latent pointer-only contract that no direct scenario exercises. Non-boolean omission can be equally active: Drawer omits `snapPoints` yet synthesizes an undocumented detent ladder; StackedIconGroup defaults a hover “reveal” whose hidden items are not rendered. Conversely, a branch may retain click/pointer handlers, `cursor:pointer`, and control styling while intentionally doing nothing, then be excused as passive or decorative. Typewriter's per-glyph backspace and DarkModeToggle's passive branch are current counterexamples. | Treat the whole omission contract—boolean, enum, host tag, model seed, derived fallback, and mode-coupled defaults—as public behavior. Every omission that changes interaction, state, motion, semantics, or geometry requires a direct first-party causal scenario across every applicable modality/state; explicit-override stories cannot substitute. A pointer-, hover-, or focus-styled no-op is a product defect, not a disabled or decorative control. A decorative branch owns no activation handler, pointer cursor, focus semantics, or operable name; a disabled control retains the correct native disabled contract. Component, wrapper, host, or source-tag spelling grants no semantic credit. Delete hidden/default interactions and false affordances unless a current product owner supplies a coherent demonstrated contract. |

## Proposed normative replacements

The following language is ready to transplant into ROOT after owner review. It is
written as law rather than glass-ui-specific advice.

### Replace `SPEC.md` scope reveal

> Scope reveal amends the active tranche. Add, split, remove, or reorder waves and
> rerun topology validation before executing affected dependents. A revealed
> obligation cannot be routed to a successor merely because it exceeds estimated
> paths, time, or agents. If authority or environment prevents continuation, mark
> the tranche `BLOCKED` and ask the user. A successor may begin only after the user
> explicitly terminates the current tranche; termination does not convert open work
> into a successful close.

### Replace `SPEC.md` close

> A tranche is `DONE` only when every accepted wave is terminal `DONE` or `DEAD`,
> the source tree matches the validated graph, the one verifier proves every
> applicable property,
> every required runtime/π artifact is current for that tree, every brittleness
> window is restored, `PROGRESS.md` and the disk cursor agree with git, and exact
> `FINAL.md` already exists and passes the close validator. `DEAD` permanently
> withdraws a promise with evidence and rationale. Deferred, successor-routed,
> blocked, superseded, provisional, degraded, paint-pending, tooling-deferred, and
> complete-with-misses are nonterminal and cannot satisfy close.

### Replace `WAVE_SPEC.md` state block

```yaml
source_base: <commit>
execution_state: PLANNED | RUNNABLE | RUNNING | BLOCKED
terminal_disposition: null | DONE | DEAD
terminal_owner: <one owner>
terminal_commit: null | <commit>
subjects:
  - path: <exact path>
    action: create | modify | repair | carve | rename | delete | verify
    owner: <unit>
repairs:
  imports:
    - {source_path: <frozen discovery path>, path: <execution path>, enrolled_action: repair | create | rename | delete, terminal: null | MODIFIED | VERIFIED_UNCHANGED | CREATED | RENAMED | DELETED}
  tests:
    - {source_path: <frozen discovery path>, path: <execution path>, enrolled_action: repair | create | rename | delete, terminal: null | MODIFIED | VERIFIED_UNCHANGED | CREATED | RENAMED | DELETED}
  verification:
    - {source_path: <frozen discovery path>, path: <ordinary test, scenario, discovery, or evidence-plan path>, enrolled_action: repair | create | rename | delete, terminal: null | MODIFIED | VERIFIED_UNCHANGED | CREATED | RENAMED | DELETED}
  build:
    - {source_path: <frozen discovery path>, path: <exact Vite/TypeScript/package/export path>, enrolled_action: repair | create | rename | delete, terminal: null | MODIFIED | VERIFIED_UNCHANGED | CREATED | RENAMED | DELETED}
invariant: <behavioral property>
mutation_bite: <realistic change that must make invariant evidence red>
pi: {kind: device-free | browser, ...}
depends_on: [<minimal direct predecessors>]
```

### Add transactional integration to `ORCHESTRATION.md`

> The orchestrator is the only mutation and commit authority. Before dispatch it
> verifies source base and writes `RUNNING` plus the precondition digest to the
> cursor. An agent result is evidence, not completion. The orchestrator checks the
> bounded diff, runs the single verifier over the cursor-derived wave plan, integrates one wave commit, records the
> commit and evidence digests, marks `DONE`, and recomputes runnability. A restart
> resumes from git and the cursor. If the declared change is already present, the
> orchestrator either proves the wave `DONE` at an existing in-scope commit or marks
> it `DEAD`; it never leaves a no-op wave eligible for repeated dispatch.

### Amend `CHALLENGE.md`

> Challenge does not invent scope, but it must expose omitted scope. Evidence that
> an accepted promise requires unplanned work widens the active obligation set and
> forces graph amendment. Architecture or product ambition may expand only when
> necessary to resolve that evidenced contradiction and after synthesis review.

### Add canonical model routing

```json
{
  "routing": {
    "core": { "selector": "current-core-session", "roles": ["orchestration", "design", "synthesis", "adjudication"] },
    "fanout": { "selectors": ["luna", "terra"], "roles": ["research", "mechanical-audit", "implementation", "challenge"] }
  },
  "maxConcurrent": 3,
  "inheritModel": false,
  "failWhenUnavailable": true
}
```

The selectors are the current user's declared routing vocabulary. Every receipt also
records whatever provider/model identity the platform actually exposes; a lane label
must never be presented as hidden provider attestation. A later user order may
supersede routing, but the conflict and effective order remain in lineage.

## Congruence repairs across ROOT documents

1. `README.md`, `SPEC.md`, `WAVE_SPEC.md`, `ORCHESTRATION.md`, the dispatch
   template, formulation, design iteration, and close prompts must import one
   lifecycle definition instead of restating related vocabularies.
2. Concurrency should have one ceiling and one rate-wall rule. The current 10-agent
   tranche ceiling, 32-agent budget, up-to-eight design pass, and batch-of-three rule
   can coexist only when represented as budget, per-wave ceiling, and live concurrency
   respectively—not interchangeable agent counts.
3. “Sequence by dependency, not ceremony” must be validated by the DAG tool. A
   prose principle did not stop `LAST`, `REFLECT`, post-cut, and close bands.
4. “No substrate without consumer” needs one definition of consumer. Documentation,
   a barrel export, a demo import that never renders, and a future ask do not count.
5. “No workaround/fallback” needs a capability distinction. A WebGL2 renderer can be
   a supported capability path for machines without WebGPU; an old export alias or
   silent canvas replacement is compatibility masking. Both supported renderers must
   meet the same observable product contract, or the lesser path is removed.
6. Formation and execution must be separate statuses. A development `FINAL.md` must
   not use the same word “complete” as a shipped tranche.
7. “Current browser” needs a recorded version/build and capability probes, not a
   label. Safari 26.4 threaded scroll timelines, 26.5 repaired pause/boundary/bfcache
   behavior, and Safari 27 beta changes anchor-positioning defaults/keywords; a
   feature-presence check cannot prove the state matrix. Chrome-only `corner-shape`
   remains an enhancement until the declared cross-engine matrix demonstrates more.
8. Accessibility floors must distinguish standards from product policy. WCAG 2.5.8
   is a 24 CSS-pixel minimum with spacing/equivalent exceptions; WCAG 2.5.5's 44 CSS
   pixels is enhanced AAA guidance. A product may require 44, but canon must call it
   the product floor and test the actual hit target, rather than mislabeling it as
   the universal WCAG minimum or silently substituting it for an unreadable token.

## Adoption order in ROOT

1. Reconcile the 40-commit divergence and the three untracked canon files under one
   owner; choose the normative tip before editing policy.
2. Land the lifecycle schema and `CANON.json` validator first.
3. Make `SPEC.md`, `WAVE_SPEC.md`, orchestration, dispatch, research, and challenge
   consume that shared schema.
4. Add DAG, cursor, π, and single-verifier/property-plan validators with negative fixtures.
5. Migrate one active tranche as a proving case; deliberately inject a transitive
   edge, a successor-routed item, stale π evidence, a no-op replay, and a prose-only
   self-citing check, and require all five to fail.
6. Only then retire contradictory variant documents. Preserve them as history, not
   alternate live authorities.

## What perfected BI can prove without editing ROOT

BI can embody all amendments locally in its formation schema, validator, cursor,
and execution handoff. It cannot claim the ROOT canon is fixed. The outbound result
is this exact amendment set plus the local proving case. Canon adoption remains an
explicit owner action in `/Users/mkbabb/Programming/precepts`.
