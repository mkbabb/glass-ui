# PERFECTED-BI formation

This directory is the executable handoff for the single perfected BI tranche. It
supersedes every still-open BI wave, milestone, close batch, and successor booking
at source base `26c5ae68`. Nothing in this directory is implementation: its job is
to make the implementation finite, current-HEAD-specific, mechanically schedulable,
and impossible to call complete while any promise remains merely deferred.

## Binding formation contract

1. The only terminal wave states are `DONE` and `DEAD`. `DEAD` means the subject is
   permanently rejected with evidence and a product-owner rationale; it is not a
   spelling of postponed, blocked, or moved. Both outcomes receive exactly one
   orchestrator-owned first-parent commit and immutable receipt. Only `DONE`
   unlocks dependents. `BI.W-P002` is foundational: if it is `DEAD`, the entire
   perfected-BI execution lineage is withdrawn, no later wave may integrate, and
   tag, publish, and release remain permanently forbidden on that lineage.
2. A tranche closes only when every wave is terminal, the single verifier proves
   every applicable property, every required browser/device observation is current for the terminal
   source tree, and `FINAL.md` already exists and validates. There is no provisional
   close, tooling-deferred close, named-successor close, or post-cut paint batch.
3. Discovery changes this graph in place. It does not mint `BI-II`, a tail tranche,
   or a future-book row. A user-directed stop may leave the tranche `BLOCKED`; it
   may not relabel missing work as success.
4. Every wave owns an exact source manifest, an exact repair manifest, a falsifiable
   property, an evidence-plan projection, a π disposition, a terminal owner, and only
   the dependency edges needed for correctness. `REPAIR` is conditional write
   authority, never a read-only suggestion: the cursor leases the path and closes a
   conditional repair as `MODIFIED` or `VERIFIED_UNCHANGED`; an overlapping explicit
   create, rename, or delete closes with its matching structural outcome. A prose
   assertion, current count, package alias, or per-property command is never evidence.
5. Repeated obligations become tooling during the wave that creates them. Formation
   documents are evidence and inputs to validators, not substitutes for runtime,
   type, build, consumer, accessibility, performance, or painted-browser truth.
6. Implementation uses one orchestrator-owned commit per wave. Research agents may
   inspect and return bounded patches/evidence; they never stage or commit. First-parent
   Git history plus append-only committed receipts is authoritative. The cursor beneath
   the Git directory is disposable cache reconstructed after every integration, so a
   reboot or fresh checkout cannot replay or lose a terminal wave.
7. The ROOT precepts repository is read-only from this tranche. Proposed canonical
   changes are recorded in `PRECEPTS-AMENDMENTS.md`; nothing here edits that repo.
8. The nine sibling repositories are read-only. Their actual imports and current
   worktree state constrain this tranche, but all consumer mutations require their
   own owner and handshake.

## Artifact map

| Artifact | Binding purpose |
| --- | --- |
| `POSTMORTEM.md` | Promise-versus-delivery history and the causal failure model. |
| `EXECUTION-READINESS.md` | Source-base preflight, unresolved launch authority, and exact bootstrap order. |
| `PRECEPTS-AMENDMENTS.md` | Exact recommendations for the ROOT precepts canon. |
| `PORTFOLIO.md` | Current-HEAD product, component, style, motion, demo, and residue census. |
| `PRODUCT-ASSAY.md` / `product-assay.json` | First-principles contracts for every material, Dock, motion, procedural, demo, and component family, each tied to actual current stories. |
| `FIRST-PARTY-DEMO-ASSAY.md` / `first-party-demo-assay.json` | Exact direct-route/transitive-import witness graph for all 73 component concepts; wave membership, redirects, shell presence, and prose earn no demo credit. |
| `COMPONENT-CONSUMER-ASSAY.md` / `component-consumer-assay.json` | Tracked-HEAD symbol/subpath imports across nine read-only siblings, including clean-break destinations and explicit review pressure for first-party-only concepts. |
| `RENDERED-DEMO-AUDIT.md` / `rendered-demo-audit.json` | Bound 124×2 route census, contact-sheet hashes, exercised interactions, current RED findings, and exact wave/family predicates; explicitly not execution π. |
| `SEMANTIC-OPERABILITY-CENSUS.md` / `semantic-operability-census.json` | Quote-aware source-base enrollment and one reviewed disposition for every Vue activation/direct-manipulation/keyboard event host; frozen counts are research only, while execution rediscovers composed controls from current reachability. |
| `PLATFORM-RESEARCH.md` / `platform-research.json` | Current primary-source Apple/WebKit/W3C/WAI/WebGPU/Chrome constraints, local observations, and exact transposition into canonical waves without new gates. |
| `GATE-CONTRADICTION-AUDIT.md` / `gate-contradiction-audit.json` | Exact source-base proof that selected legacy gates reward compatibility, masking, shallow source shape, prose receipts, or fixed script counts; each false oracle is explicitly reversed or tightened. |
| `PROCEDURAL-FIRST-PRINCIPLES-AUDIT.md` / `procedural-first-principles-audit.json` | Exact source reachability, consumer evidence, and desktop/mobile demo reconciliation for the shared substrate plus all eight procedural component concepts; renderer choice is proportionate per product rather than a parity quota. |
| `MOTION-FIRST-PRINCIPLES-AUDIT.md` / `motion-first-principles-audit.json` | First-principles temporal ownership for ten motion families, all direct motion/interaction demos, and a descriptive current-tree census of every raw scheduler/native-timeline/engine-bearing source file; one authority is per property/episode, never a global callback quota. |
| `CONSTELLATION.md` | Read-only sibling import truth, holds, asks, and no-write fences. |
| `VERIFICATION-ARCHITECTURE.md` / `invariants.json` | One cursor-derived verifier and a non-normative descriptive property vocabulary with zero per-property executable identities. |
| `INVARIANT-FAMILY-AUDIT.md` / `invariant-family-audit.json` | Authored independence, lifecycle, anti-contrivance, realistic RED, and authority judgment for each presently useful property; the row count is not a target. |
| `PACKAGE-SCRIPT-ABROGATION.md` / `package-script-dispositions.json` | Exact disposition of all 435 source package scripts, including fifteen executable proof/gate aliases the 403-row registry omitted. |
| `LEGACY-GATE-ABROGATION.md` / `legacy-gate-dispositions.json` / `legacy-gates.registry.mjs` | Exhaustive 403-row registry-identity abrogation with exact note-digest bindings; only typecheck/test/build keep their spelling as ordinary non-gate tasks, and no proof/gate alias, table file, or legacy-named case survives. |
| `waves.json` / `waves/` | Fully specified current-HEAD execution subjects. |
| `PATH-LIFECYCLE-PROJECTION.md` / `path-lifecycle-projection.json` | DAG-aware transposition from frozen-source repair discoveries to paths that actually exist when each wave starts; authored stale subjects fail rather than being silently rewritten. |
| `dag.json` / `STRATA.md` | Minimal dependency graph and maximum safe parallel strata. |
| `INTEGRATION-PROTOCOL.md` / `integration-artifact-ledger.json` | Acyclic per-wave receipt → attestation → FINAL → commit protocol, Git-private cache recovery, and the integration-only P002 activation barrier that preserves parallel builder launches. |
| `prompt-recap-routing.json`, `coordination-routing.json`, `open-row-routing.json` | Every prompt, communique, and DEFER/OQ/D occurrence mapped to one explicit disposition and executable owner. |
| `execution-cursor.seed.json` | Crash-safe runtime-state seed; no in-memory completion authority. |
| `FORMATION-MANIFEST.json` | Byte/hash closure over every formation artifact except itself. |
| `validate-formation.mjs` | Fail-closed schema, topology, subject, and anti-folly validator. |

`waves.json`, `dag.json`, the per-wave Markdown files, and `STRATA.md` are generated
from one registry and then checked for byte-level freshness. Editing a generated
surface without changing its authority is a formation failure.

## Product direction fixed by formation

Glass is a functional plane for controls, navigation, and transient chrome; it is
not a universal content texture. Content remains a warm, legible field. The visual
signature is a quiet field cut by one optically strong type gesture, a restrained
color event, and motion that explains state rather than decorating it. Modern Safari
and Chrome are the supported browser truth. WebGPU is the preferred procedural
renderer, with a deliberately equivalent WebGL2 capability path where the product
contract requires reach; that capability path is not a legacy compatibility alias.

This direction follows Apple's current material guidance that Liquid Glass belongs
in the functional layer, and WebKit's shipped support for WebGPU, scroll-driven
animations, and anchor positioning. It also preserves reduced-transparency,
increased-contrast, forced-colors, keyboard, touch, and reduced-motion semantics as
first-class product states rather than alternate visual themes.

Primary references:

- [Apple Human Interface Guidelines — Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- [WWDC25 — Meet Liquid Glass](https://developer.apple.com/videos/play/wwdc2025/219/)
- [WWDC25 — Get to know the new design system](https://developer.apple.com/videos/play/wwdc2025/356/)
- [WebKit features in Safari 26.0](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/)
- [CSS Scroll-driven Animations Level 1](https://www.w3.org/TR/scroll-animations-1/)
- [WebGPU specification](https://gpuweb.github.io/gpuweb/)

## Formation checksum

The implementation subject is the tree at `26c5ae68`. Formation-only files under
this directory may advance the documentation commit without changing that base.
The validator permits only that formation-confined descendant delta; it rejects an
execution launch if any declared source-base subject has drifted without a
deliberate regeneration and renewed convergence pass.
