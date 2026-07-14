# BI.W-P053 — Cross-engine perceptual parity matrix

**Status:** PLANNED
**Topological stratum:** BI.S18
**Formation family:** procedural
**Core centers:** C4_PROCEDURAL_VIZ
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P053`

## Intent

Replace per-scene self-certification with one seeded, repeatable Safari/Chrome WebGPU/WebGL2 comparison over every supported procedural scene.

## Exact scope

- Enroll the actual dual-renderer scenes—Aurora, Blob, FourierField, and LiquidGrid—through discovered renderer/config metadata; explicitly exclude single-renderer Constellation rather than manufacturing parity work.
- Compare analytic config, seeded geometry, color/readback, scene statistics, interaction response, and failure identity rather than screenshot equality.
- Define scene-specific perceptual bands with mutation evidence proving each discriminates a material defect.
- Store compact JSON/readback evidence keyed to exact wave/source/browser/engine; images support review but never decide success by pixel hash.

## File manifest (6)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 2 | create | scripts/verification/oracles/procedural-parity.mjs | — | — | source base |
| 3 | repair | src/components/PROCEDURAL-SUITE.md | — | — | BI.W-P008 |
| 4 | create | tests-visual/helpers/procedural-parity.ts | — | — | source base |
| 5 | modify | tests-visual/pi-runner-manifest.mjs | — | 01d2a772ace680a3a705a465f53a79e976290bde | source base |
| 6 | create | tests-visual/procedural-parity.spec.ts | — | — | source base |

## Repair manifest (3)

| surface | # | exact path |
| --- | --- | --- |
| tests | 1 | tests-visual/procedural-parity.spec.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | src/components/PROCEDURAL-SUITE.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P053/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Every supported dual-engine scene has current seeded semantic/perceptual parity evidence in Safari and Chrome, and each band rejects a known meaningful mutation.

**Required mutation bite:** Inject one engine-only color encode and one geometry parameter skew; both must fail without a screenshot hash.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P053`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| integrity.release | device-free | FINAL, version, changelog, migration, tarball, verifier evidence, π evidence, and tag all describe the exact same terminal source tree. | Change package version without projection regeneration.; Use a π artifact from the parent commit. |
| procedural.color | browser | Procedural scenes resolve CSS/OKLCh inputs through one linear-light pipeline with bounded gamut handling and no duplicate OETF or premultiplication error. | Apply sRGB encoding twice.; Interpolate OKLCh hue through the long arc unintentionally. |
| procedural.interaction | browser | Pointer/touch/keyboard/config interaction changes a scene deliberately, remains bounded, and preserves a calm default plus PRM behavior. | Let pointer velocity eject a blob satellite from containment.; Keep autonomous turbulence moving under PRM. |
| procedural.renderer-parity | browser | WebGPU-preferred and supported WebGL2 paths express the same scene identity, configuration semantics, color space, and interaction within declared perceptual bands. | Interpret a config scalar differently in GLSL and WGSL.; Silently render an unrelated Canvas2D scene after both GPU engines fail. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: parity-aurora, parity-blob, parity-fourier, parity-liquid-grid
Observables: config equality, seeded geometry, color/readback delta, scene statistics, interaction response
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P046 | Aurora has one config/color/lifecycle/failure semantics across engines, exposes its actual engine, and every medium remains recognizably Aurora, bounded, pause-aware, warning-free, and legible behind functional content. |
| BI.W-P047 | Blob exposes one clean config and renders a contained, legible gel identity with equivalent engine/color/interaction semantics, a named keyboard/pointer/touch press surface only when interactive, causal action observables, and no legacy prop path. |
| BI.W-P049 | Pure Fourier math/config feeds one field semantics across compute/render paths and engines, with bounded readable output and no duplicated math authority. |
| BI.W-P050 | LiquidGrid has one grid/warp/config meaning across engines and remains legible, bounded, pause-aware, and still under PRM. |

Declared semantic locks: `procedural-parity`, `visual-runner`. The cursor also acquires 6 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
