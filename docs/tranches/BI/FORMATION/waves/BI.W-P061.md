# BI.W-P061 — π scenario runner and source-bound evidence

**Status:** PLANNED
**Topological stratum:** BI.S13
**Formation family:** demo
**Core centers:** C8_DEMO_CHASSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P061`

## Intent

Replace ad hoc screenshots and local-only ledger claims with one semantic scenario runner whose evidence is bound to exact source/browser/state.

## Exact scope

- Generate scenario enrollment from story/wave metadata and execute named setup/action/observable contracts in Safari and Chrome.
- Record exact browser name/version/build and native-vs-emulated status, per-feature probe results, actual runtime engine/hardware identity where applicable, viewport/input, mode, source/commit, tarball, actions, numeric/semantic observations, console/unhandled-rejection ledger, and evidence hashes; `Safari-current`/`Chrome-current` are enrollment labels, never receipt identities.
- Use images for human review only where gestalt/paint needs it; prohibit screenshot equality and stale-capture acceptance.
- For animation/performance claims, record the resolved custom-property sink graph plus trace-derived layout/paint/composite classification, CLS, main-thread work, and frame pacing; source property names and allowlist membership cannot supply compositor credit.
- Fail when a visual wave has no scenario, a declared capture is absent, a server is wrong, or evidence predates its terminal commit.
- Ingest the 124×2 rendered formation census only as RED/observational design input; its in-app harness, screenshot hashes, and unavailable engine identity can never satisfy native Safari/Chrome π, DELTA, tested-source refresh, or an execution invariant.
- Require zero unexpected console warnings/errors and zero unhandled rejections in ordinary scenarios; expected injected failures must match one named typed error and may not continue as product success.
- Exercise editor controls through success and failure receipts: pointer/keyboard value parity, Clipboard success/denial/missing-API status, playback restart/final/PRM state, and rendered text-control geometry are semantic observables rather than inferred source enrollment.

## File manifest (15)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | CONTRIBUTING.md | — | 1994046ce7f0d8f361333bc644885214da00a8eb | source base |
| 2 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 3 | verify | docs/tranches/BI/FORMATION/build-rendered-demo-audit.mjs | — | — | FORMATION |
| 4 | verify | docs/tranches/BI/FORMATION/refresh-rendered-demo-authored-research.mjs | — | — | FORMATION |
| 5 | verify | docs/tranches/BI/FORMATION/rendered-demo-addenda.registry.mjs | — | — | FORMATION |
| 6 | verify | docs/tranches/BI/FORMATION/rendered-demo-audit.json | — | — | FORMATION |
| 7 | verify | docs/tranches/BI/FORMATION/RENDERED-DEMO-AUDIT.md | — | — | FORMATION |
| 8 | repair | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 9 | create | scripts/pi/evidence-schema.json | — | — | source base |
| 10 | create | scripts/pi/run.mjs | — | — | source base |
| 11 | create | tests-visual/helpers/scenario-runner.ts | — | — | source base |
| 12 | modify | tests-visual/pi-runner-manifest.mjs | — | 01d2a772ace680a3a705a465f53a79e976290bde | source base |
| 13 | repair | tests-visual/playwright.config.ts | — | 360ab7c98cdf22d96db6c49d51ac6d42092a0117 | source base |
| 14 | create | tests-visual/served-app-sentinel.spec.ts | — | — | source base |
| 15 | create | tests/pi/scenario-runner.test.ts | — | — | source base |

## Repair manifest (6)

| surface | # | exact path |
| --- | --- | --- |
| tests | 1 | tests-visual/served-app-sentinel.spec.ts |
| tests | 2 | tests/pi/scenario-runner.test.ts |
| build | 1 | package.json |
| build | 2 | tests-visual/playwright.config.ts |
| docs | 1 | CONTRIBUTING.md |
| docs | 2 | DESIGN.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P061/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Every visual claim has fresh warning-clean semantic native Safari/Chrome evidence for the exact terminal source and actual renderer, including trace-backed animation-channel classification where claimed, and cannot pass from an image hash, source whitelist, formation capture, missing capture, wrong server, harness-provided identity, unhandled rejection, or older commit.

**Required mutation bite:** Copy a green parent-commit receipt, substitute the formation in-app capture, point at a static wrong app, emit the current Dock/Aurora warning while marking success, or label a paint/custom-property animation compositor-only without its sink/trace payload; evidence must fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P061`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.token-graph | device-free | Every semantic token has one definition, typed domain, live consumer, valid dark/contrast resolution, and no alias cycle or dead rung. | Create a token alias cycle.; Add a defined token with no computed consumer. |
| integrity.lineage | device-free | The execution branch, ROOT canon commit, source-base commit, and wave commits form one declared lineage with no retrospective or duplicate wave attribution. | Assign one commit to two waves.; Move the ROOT canon pointer without renewing conformance. |
| integrity.release | device-free | FINAL, version, changelog, migration, tarball, verifier evidence, π evidence, and tag all describe the exact same terminal source tree. | Change package version without projection regeneration.; Use a π artifact from the parent commit. |
| performance.experience | browser | Supported routes meet interaction, loading, layout stability, long-task, memory, and frame-pacing budgets under representative hardware profiles without hiding work. | Eager-load every procedural renderer on the landing route.; Move work into an unmeasured post-load timer. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: runner-selftest-safari, runner-selftest-chrome, runner-wrong-server, runner-stale-evidence, runner-formation-capture-no-credit, runner-harness-engine-spoof, runner-unexpected-console, runner-missing-capture
Observables: source/browser/runtime-engine binding, served-app identity, causal semantic/numeric observable, console/unhandled-rejection cleanliness, freshness, negative fixture red
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P057 | Public concepts, story modules, rendered components, and direct canonical routes form a generated semantic mapping with no import-only, phantom, dead-member, folded, relocated, alias, shim, or compatibility-route success. |

Declared semantic locks: `package-manifest`, `visual-runner`. The cursor also acquires 10 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
