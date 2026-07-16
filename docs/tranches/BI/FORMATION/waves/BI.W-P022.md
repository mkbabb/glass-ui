# BI.W-P022 — Accessibility material and interaction modes

**Status:** IMPLEMENTED — NATIVE ACCESSIBILITY-MODE ACCEPTANCE PENDING
**Topological stratum:** BI.S11
**Formation family:** design-foundation
**Core centers:** C1_LIQUID_GLASS, C3_MOTION, C7_KEYFRAMES_INTEGRATION
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P022`

## Intent

Treat reduced transparency, increased contrast, forced colors, reduced motion, keyboard, and zoom as complete design modes.

## Exact scope

- Consolidate mode resolution after tokens/materials so adaptations replace rather than fight the base cascade.
- Ensure focus, selection, error, hierarchy, and glass/content separation remain explicit in every mode.
- Delete compatibility-class branches where current Safari/Chrome semantics are sufficient while retaining first-class accessibility adaptations.
- Run the entire rendered story roster through applicable mode matrices.

## File manifest (9)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/demo.css | — | 73b1530fe2e69a1e42c4bf22e412f40e509d090b | source base |
| 2 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 3 | repair | README.md | — | a12a23d4b4b52565af5af0eaff8949683140c482 | source base |
| 4 | create | src/styles/accessibility.css | — | — | source base |
| 5 | modify | src/styles/glass/a11y-fallback.css | — | c6bf39491d993644c8abeff837db5ace5225ca79 | source base |
| 6 | repair | src/styles/index.css | — | 16de2284dc725ba78c144bb329629ade60aaf077 | source base |
| 7 | modify | src/styles/utilities/a11y-overrides.css | — | dd89b1d7c21f30807080f0627cac012698b3ce9c | source base |
| 8 | create | tests-visual/accessibility-modes.spec.ts | — | — | source base |
| 9 | create | tests/a11y/story-contract.test.ts | — | — | source base |

## Repair manifest (6)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/demo.css |
| imports | 2 | src/styles/index.css |
| tests | 1 | tests-visual/accessibility-modes.spec.ts |
| tests | 2 | tests/a11y/story-contract.test.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | README.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P022/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Accessibility modes preserve complete meaning and hierarchy; no required state disappears when visual effects or color are removed.

**Required mutation bite:** Remove the selected boundary under forced colors and keep only hue; the mode matrix must fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P022`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| behavior.focus-escape | browser | Focus order, focus visibility, containment, restoration, and Escape ownership remain correct across every interactive composition. | Restore focus to a removed trigger.; Hide the focus ring on glass. |
| design.adaptive-accessibility | browser | Reduced transparency, increased contrast, forced colors, and reduced motion remain complete product states with visible hierarchy and semantics. | Leave text on transparent glass under reduced transparency.; Use color alone for forced-colors selection. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| motion.reduced | browser | Reduced motion removes travel, continuous oscillation, and nonessential delay while preserving state change and focus causality. | Keep a breathing loop active under PRM.; Suppress the selected-state change along with its animation. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: reduced-transparency, contrast-more, forced-colors, reduced-motion, keyboard-only, zoom-200
Observables: state visibility, focus, contrast, material replacement, no hidden action
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P016 | Material level follows semantic function and remains perceptually ordered in every supported appearance/accessibility state; any adaptive-luminance claim is backed by a fresh live sample with explicit provenance or an observable typed failure. |
| BI.W-P019 | Every text node resolves to a semantic role, hierarchy never inverts, display type is distinctive, and font loading does not move layout materially. |
| BI.W-P020 | Color roles are semantic and linear-light consistent; state remains legible without hue and each composition has at most its declared accent event. |
| BI.W-P021 | Every primary action remains visible, reachable, ordered, and adequately sized across declared widths/input modes without a duplicate component path. |

Declared semantic locks: `global-accessibility`, `style-assembly`. The cursor also acquires 9 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
