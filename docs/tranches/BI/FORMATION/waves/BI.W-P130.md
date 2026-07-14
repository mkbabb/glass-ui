# BI.W-P130 — Owned profiling and diagnostic tools instead of one-off archaeology scripts

**Status:** PLANNED
**Topological stratum:** BI.S20
**Formation family:** performance-tooling
**Core centers:** C4_PROCEDURAL_VIZ, C9_PRUNE
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P130`

## Intent

Preserve reusable bundle, scene, capture, and resource diagnostics under semantic owners while deleting one-off readers and tranche-specific metric programs.

## Exact scope

- Unify bundle, Aurora, procedural-scene, capture, and lifecycle profiling through one scenario schema and trace receipt format.
- Move reusable shader/CSS/Dock inspection into library modules or tests that own the invariant; delete read-blob-shaders, read-css-monoliths, read-dock-css, and standalone arresting-metric programs after equivalence fixtures land.
- Classify animated output from resolved sinks and browser traces as layout, paint, or composite; correlate custom-property dependencies, layer promotion/demotion, CLS, main-thread cost, and frame pacing instead of retaining a reflow-name whitelist or filename exception register.
- Keep budgets as product distributions across named hardware/input scenarios, not frozen Lighthouse or image baselines.
- Correlate contexts, loops, observers, listeners, timers, memory, long tasks, and frame pacing with rendered owners and teardown.

## File manifest (16)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | CONTRIBUTING.md | — | 1994046ce7f0d8f361333bc644885214da00a8eb | source base |
| 2 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 3 | repair | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 4 | delete | scripts/aurora-arresting-metric.mjs | — | 929c30e669a8366f7c1f68cd9948a6606b12eea3 | source base |
| 5 | delete | scripts/aurora-profile/harness-browser.mjs | — | bc70de727a6bd88b3c1e0190de059975bed7c065 | source base |
| 6 | delete | scripts/profile-aurora.mjs | — | f063e00cc23e970c1058c76efbd38d5d0060b6c0 | source base |
| 7 | delete | scripts/profile-bundle.mjs | — | 34419261975b16924dead033076a9ea85980c274 | source base |
| 8 | create | scripts/profile/receipt-schema.json | — | — | source base |
| 9 | create | scripts/profile/run.mjs | — | — | source base |
| 10 | create | scripts/profile/scenarios.mjs | — | — | source base |
| 11 | delete | scripts/read-blob-shaders.mjs | — | 831d08fc9942b9a85f955046b45dd15131eb5a31 | source base |
| 12 | delete | scripts/read-css-monoliths.mjs | — | 58c29c3383a68d847f2042f28091b513c1f0d2c4 | source base |
| 13 | delete | scripts/read-dock-css.mjs | — | 19ce66080431238144a190009faeccc0c5dacf6c | source base |
| 14 | delete | scripts/reflect-capture-verify.mjs | — | de96afa9de19be5536b23eff31dff1e22c597e25 | source base |
| 15 | create | tests-visual/performance-experience.spec.ts | — | — | source base |
| 16 | create | tests/performance/profile-ownership.test.ts | — | — | source base |

## Repair manifest (5)

| surface | # | exact path |
| --- | --- | --- |
| tests | 1 | tests-visual/performance-experience.spec.ts |
| tests | 2 | tests/performance/profile-ownership.test.ts |
| build | 1 | package.json |
| docs | 1 | CONTRIBUTING.md |
| docs | 2 | DESIGN.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P130/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Every retained diagnostic is reusable, scenario-declared, owner-correlated, receipt-producing, and truthful about layout/paint/composite cost; no one-off tranche reader, property-name whitelist, filename allowlist, or frozen image/score baseline defines success.

**Required mutation bite:** Move expensive work into an unmeasured timer, leak one listener after route exit, feed --probe into width, or demote a transform from compositing; owner/sink/trace correlation must expose the defect despite an acceptable aggregate load score.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P130`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| performance.experience | browser | Supported routes meet interaction, loading, layout stability, long-task, memory, and frame-pacing budgets under representative hardware profiles without hiding work. | Eager-load every procedural renderer on the landing route.; Move work into an unmeasured post-load timer. |
| performance.resource-ownership | device-free | A route owns only the observers, contexts, event listeners, and timers required by rendered concepts, and teardown returns to baseline. | Leak a window listener across route exit.; Create two WebGL contexts for one rendered scene. |
| procedural.lifecycle | device-free | Every GPU/Canvas scene composes one shared mount/resize/DPR/visibility/error lifecycle and releases resources deterministically. | Create a scene-local ResizeObserver lifecycle.; Leave a GPU buffer alive after unmount. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: profile-cold-wide, profile-warm-wide, profile-narrow-coarse, profile-procedural-safari, profile-procedural-chrome
Observables: trace completeness, owner/resource correlation, frame pacing distribution, long tasks, memory/teardown
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P054 | Procedural routes own bounded resources, do zero continuous work while paused, resume once, lazy-load heavy code, and meet declared experience budgets with attribution. |
| BI.W-P058 | Every enrolled hero uses shared hierarchy and has a distinct concept-driven gesture without overflow, subject occlusion/displacement, decorative template sameness, or accessibility loss. |

Declared semantic locks: `profiling-tools`, `visual-runner`. The cursor also acquires 16 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- The current scripts root carries bespoke readers, Aurora-only profilers, snapshot floors, and tranche-named proof programs whose ownership expired after their wave.
