# BI.W-P062 — Story-wide accessibility-mode orchestration

**Status:** PLANNED
**Topological stratum:** BI.S14
**Formation family:** demo
**Core centers:** C3_MOTION, C7_KEYFRAMES_INTEGRATION, C8_DEMO_CHASSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P062`

## Intent

Enroll every applicable story in keyboard, reduced-motion, reduced-transparency, contrast, forced-colors, zoom, and coarse-input scenarios as it lands.

## Exact scope

- Derive applicable modes from component semantics and story metadata rather than a fixed component count.
- Run generic focus/landmark/name/target/overflow checks plus family-specific behavioral invariants, including modal background inertness/aria isolation, invalid-field error linkage, inactive-face removal from the accessibility/focus tree, and keyboard reveal of offscreen Dock actions.
- Make missing mode metadata or an untestable interactive story fail in the producing component wave.
- Keep the matrix incremental so no terminal accessibility sweep discovers first-order omissions.
- At 390×844 coarse input, reject opacity-zero focusables, non-intersecting actions without a focus-reveal/overflow projection, nondegenerate scrollers below the declared usable extent, and interactive targets below their semantic floor.
- Inspect interactive SVG descendants rather than crediting the host image: draggable editor handles require names, values/bounds, focus, keyboard parity, and visible focus while the noninteractive plot retains its description.
- Discover every composed operable surface from the current import/render/route graph, including intrinsic controls, polymorphic as/asChild hosts, clickable table headers/rows/cards, canvas/SDF hit layers, list-item choices, per-glyph handlers, imperative DOM listeners, intrinsic render-function handlers, and custom-component event delegation. Source tags, wrapper names, host roles, and a fixed file/arm count receive no completeness credit.

## File manifest (6)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | CONTRIBUTING.md | — | 1994046ce7f0d8f361333bc644885214da00a8eb | source base |
| 2 | modify | demo/stories/manifest/schema.ts | — | — | BI.W-P057 |
| 3 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 4 | create | tests-visual/accessibility-matrix.spec.ts | — | — | source base |
| 5 | create | tests-visual/helpers/story-matrix.ts | — | — | source base |
| 6 | modify | tests/a11y/story-contract.test.ts | — | — | BI.W-P022 |

## Repair manifest (4)

| surface | # | exact path |
| --- | --- | --- |
| tests | 1 | tests-visual/accessibility-matrix.spec.ts |
| tests | 2 | tests/a11y/story-contract.test.ts |
| docs | 1 | CONTRIBUTING.md |
| docs | 2 | DESIGN.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P062/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Applicable accessibility/input modes are declared and green when each story lands; modal isolation, form error linkage, inactive-face exclusion, mobile action reachability, and target floors are first-order predicates rather than terminal-sweep discoveries.

**Required mutation bite:** Remove forced-colors enrollment, leave #app exposed behind a modal, detach an invalid field's error, keep an opacity-zero Dock face tabbable, move a pointer-only action behind a custom wrapper, or credit a semantic sibling for an inoperable control; schema/matrix coverage must fail before its component wave closes.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P062`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| behavior.focus-escape | browser | Focus order, focus visibility, containment, restoration, and Escape ownership remain correct across every interactive composition. | Restore focus to a removed trigger.; Hide the focus ring on glass. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.adaptive-accessibility | browser | Reduced transparency, increased contrast, forced colors, and reduced motion remain complete product states with visible hierarchy and semantics. | Leave text on transparent glass under reduced transparency.; Use color alone for forced-colors selection. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: matrix-keyboard, matrix-modal-isolation, matrix-invalid-error-linkage, matrix-inactive-face, matrix-prm, matrix-reduced-transparency, matrix-contrast, matrix-forced-colors, matrix-zoom, matrix-coarse-390x844
Observables: enrollment completeness, focus/name/role and background isolation, error description linkage, state visibility, overflow/focus reveal/target floor, zero hidden action
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P022 | Accessibility modes preserve complete meaning and hierarchy; no required state disappears when visual effects or color are removed. |
| BI.W-P061 | Every visual claim has fresh warning-clean semantic native Safari/Chrome evidence for the exact terminal source and actual renderer, including trace-backed animation-channel classification where claimed, and cannot pass from an image hash, source whitelist, formation capture, missing capture, wrong server, harness-provided identity, unhandled rejection, or older commit. |

Declared semantic locks: `demo-manifest`, `visual-runner`. The cursor also acquires 6 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
