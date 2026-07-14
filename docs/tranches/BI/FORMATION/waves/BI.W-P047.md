# BI.W-P047 — Blob apotheosis — coherent gel body, satellites, and mood

**Status:** PLANNED
**Topological stratum:** BI.S17
**Formation family:** procedural
**Core centers:** C4_PROCEDURAL_VIZ
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P047`

## Intent

Make Blob a single coherent SDF/metaball product concept with clean config semantics, contained interaction, and equivalent engines.

## Exact scope

- Remove variant→morphT compatibility reads and define one typed geometry/mood/interaction config.
- Share SDF, palette, satellite, pointer, and uniform semantics across WebGPU/WebGL2 through the procedural substrate.
- Calibrate gel body, merge menisci, specular/contact shadow, satellite separation/containment, and calm default.
- Delete duplicated easing/setup/bridge code and historical source diaries.
- Give Poke, canvas press, preset, and fission actions independent semantic/numeric observables and reset points; continuously changing pixels or a screenshot hash cannot prove that an action caused the claimed state.
- Make canvas/SDF press an explicit product mode: an interactive Blob exposes one named focusable press surface with Enter/Space/touch/pointer parity through the same pulse owner, while decorative or aria-hidden Blob instances mount no operable hit surface and cannot intercept sibling controls.
- Replace the WebGL2-only component/README/story fiction with runtime-derived WebGPU/WebGL2 identity and one source-bound capability/failure account.

## File manifest (44)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/stories/compositions/empty-states.vue | — | 4392d08eb5622e47f82e2ca12a4cc273c9f97ec0 | source base |
| 2 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 3 | modify | demo/stories/substrates/blob.vue | — | c60101bc6dcb99e0f35b8b412bd92c8b6aa272e8 | source base |
| 4 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 5 | repair | MIGRATION.md | — | 1068a94e272e770510befbf98a8dd8f7c3dbaeaf | source base |
| 6 | repair | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 7 | repair | scripts/lib/subpath-policy.mjs | — | cb93f9896eb4f73f11992932ed2515f7954147af | source base |
| 8 | modify | src/components/blob/Blob.vue | — | — | BI.W-P008 |
| 9 | modify | src/components/blob/composables/buildMetaballProgram.ts | — | — | BI.W-P008 |
| 10 | modify | src/components/blob/composables/easing.ts | — | — | BI.W-P008 |
| 11 | modify | src/components/blob/composables/satelliteKinematics.ts | — | — | BI.W-P008 |
| 12 | modify | src/components/blob/composables/uniformBridgeWGPU.ts | — | — | BI.W-P008 |
| 13 | modify | src/components/blob/composables/uploadBlobUniforms.ts | — | — | BI.W-P008 |
| 14 | modify | src/components/blob/composables/useBlobMood.ts | — | — | BI.W-P008 |
| 15 | modify | src/components/blob/composables/useBlobPointer.ts | — | — | BI.W-P008 |
| 16 | modify | src/components/blob/composables/useBlobSatellites.ts | — | — | BI.W-P008 |
| 17 | modify | src/components/blob/composables/useMetaballRenderer.ts | — | — | BI.W-P008 |
| 18 | modify | src/components/blob/composables/wgpuSetup.ts | — | — | BI.W-P008 |
| 19 | modify | src/components/blob/config.ts | — | — | BI.W-P008 |
| 20 | modify | src/components/blob/constants.ts | — | — | BI.W-P008 |
| 21 | modify | src/components/blob/index.ts | — | — | BI.W-P008 |
| 22 | modify | src/components/blob/presets.ts | — | — | BI.W-P008 |
| 23 | modify | src/components/blob/README.md | — | — | BI.W-P008 |
| 24 | modify | src/components/blob/RESEARCH.md | — | — | BI.W-P008 |
| 25 | modify | src/components/blob/shaders/metaball-noise.wgsl.ts | — | — | BI.W-P008 |
| 26 | modify | src/components/blob/shaders/metaball-palette.wgsl.ts | — | — | BI.W-P008 |
| 27 | modify | src/components/blob/shaders/metaball-uniforms.glsl.ts | — | — | BI.W-P008 |
| 28 | modify | src/components/blob/shaders/metaball.frag.ts | — | — | BI.W-P008 |
| 29 | modify | src/components/blob/shaders/metaball.vert.ts | — | — | BI.W-P008 |
| 30 | modify | src/components/blob/shaders/metaball.wgsl.ts | — | — | BI.W-P008 |
| 31 | modify | src/components/blob/shaders/oklch-perturb.glsl.ts | — | — | BI.W-P008 |
| 32 | modify | src/components/blob/shaders/sdf-body.glsl.ts | — | — | BI.W-P008 |
| 33 | modify | src/components/blob/shaders/watercolor-edges.glsl.ts | — | — | BI.W-P008 |
| 34 | modify | src/components/blob/types.ts | — | — | BI.W-P008 |
| 35 | create | tests-visual/blob-apotheosis.spec.ts | — | — | source base |
| 36 | repair | tests-visual/blob-mood-live.spec.ts | — | 3c47e99dc4456c8366844b5e3a2c208205781cd3 | source base |
| 37 | repair | tests-visual/blob-page.spec.ts | — | 5807955224c4ec726695ec467760756a205d4c02 | source base |
| 38 | repair | tests-visual/blob-pause-seam.spec.ts | — | de54bae88366e78ab1bd1d3834363d6929fe833b | source base |
| 39 | repair | tests-visual/blob-render.spec.ts | — | 24884ea4817f253f9e2193a1000c1a9617c4cf47 | source base |
| 40 | repair | tests-visual/blob-warm-default.spec.ts | — | 53e3cc4993992717d7acf0d3f02487fe8d1d45f7 | source base |
| 41 | repair | tests-visual/blob3-interaction-capture.spec.ts | — | 1053c4917af2f7c2d26c2da2ed2d33b33900f1c1 | source base |
| 42 | repair | tests-visual/substrate-paints-color.spec.ts | — | fb966540fa32b9a578dd425db140e717684b9cd2 | source base |
| 43 | repair | tests-visual/webgpu-everywhere.spec.ts | — | 89191ad79581e316474d0675556cb5c579d7ac15 | source base |
| 44 | create | tests/components/blob/contract.test.ts | — | — | source base |

## Repair manifest (29)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/stories/compositions/empty-states.vue |
| imports | 2 | demo/stories/manifest.ts |
| imports | 3 | demo/stories/substrates/blob.vue |
| imports | 4 | tests-visual/blob-mood-live.spec.ts |
| imports | 5 | tests-visual/blob-page.spec.ts |
| imports | 6 | tests-visual/blob-pause-seam.spec.ts |
| imports | 7 | tests-visual/blob-render.spec.ts |
| imports | 8 | tests-visual/blob-warm-default.spec.ts |
| imports | 9 | tests-visual/blob3-interaction-capture.spec.ts |
| imports | 10 | tests-visual/substrate-paints-color.spec.ts |
| imports | 11 | tests-visual/webgpu-everywhere.spec.ts |
| tests | 1 | demo/stories/compositions/empty-states.vue |
| tests | 2 | demo/stories/manifest.ts |
| tests | 3 | demo/stories/substrates/blob.vue |
| tests | 4 | tests-visual/blob-apotheosis.spec.ts |
| tests | 5 | tests-visual/blob-mood-live.spec.ts |
| tests | 6 | tests-visual/blob-page.spec.ts |
| tests | 7 | tests-visual/blob-pause-seam.spec.ts |
| tests | 8 | tests-visual/blob-render.spec.ts |
| tests | 9 | tests-visual/blob-warm-default.spec.ts |
| tests | 10 | tests-visual/blob3-interaction-capture.spec.ts |
| tests | 11 | tests-visual/substrate-paints-color.spec.ts |
| tests | 12 | tests-visual/webgpu-everywhere.spec.ts |
| tests | 13 | tests/components/blob/contract.test.ts |
| build | 1 | package.json |
| build | 2 | scripts/lib/subpath-policy.mjs |
| docs | 1 | DESIGN.md |
| docs | 2 | MIGRATION.md |
| docs | 3 | src/components/blob/README.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P047/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Blob exposes one clean config and renders a contained, legible gel identity with equivalent engine/color/interaction semantics, a named keyboard/pointer/touch press surface only when interactive, causal action observables, and no legacy prop path.

**Required mutation bite:** Restore `variant` as a second reader, make Poke pass solely because a continuously animated screenshot changed, or retain an unnamed click-only SDF hit layer; clean-break/config/causality/operability evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P047`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.clean-break | device-free | No legacy alias, deprecated prop, compatibility shim, dual read/write, silent masking path, or retired public name survives. | Re-export Countup as an alias.; Read both variant and morphT for the same blob state. |
| behavior.focus-escape | browser | Focus order, focus visibility, containment, restoration, and Escape ownership remain correct across every interactive composition. | Restore focus to a removed trigger.; Hide the focus ring on glass. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.adaptive-accessibility | browser | Reduced transparency, increased contrast, forced colors, and reduced motion remain complete product states with visible hierarchy and semantics. | Leave text on transparent glass under reduced transparency.; Use color alone for forced-colors selection. |
| performance.experience | browser | Supported routes meet interaction, loading, layout stability, long-task, memory, and frame-pacing budgets under representative hardware profiles without hiding work. | Eager-load every procedural renderer on the landing route.; Move work into an unmeasured post-load timer. |
| procedural.color | browser | Procedural scenes resolve CSS/OKLCh inputs through one linear-light pipeline with bounded gamut handling and no duplicate OETF or premultiplication error. | Apply sRGB encoding twice.; Interpolate OKLCh hue through the long arc unintentionally. |
| procedural.interaction | browser | Pointer/touch/keyboard/config interaction changes a scene deliberately, remains bounded, and preserves a calm default plus PRM behavior. | Let pointer velocity eject a blob satellite from containment.; Keep autonomous turbulence moving under PRM. |
| procedural.lifecycle | device-free | Every GPU/Canvas scene composes one shared mount/resize/DPR/visibility/error lifecycle and releases resources deterministically. | Create a scene-local ResizeObserver lifecycle.; Leave a GPU buffer alive after unmount. |
| procedural.renderer-parity | browser | WebGPU-preferred and supported WebGL2 paths express the same scene identity, configuration semantics, color space, and interaction within declared perceptual bands. | Interpret a config scalar differently in GLSL and WGSL.; Silently render an unrelated Canvas2D scene after both GPU engines fail. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: blob-default, blob-merge, blob-satellites, blob-pointer, blob-canvas-press-keyboard, blob-poke-causality, blob-touch, blob-decorative-noninteractive, blob-prm, blob-parity
Observables: silhouette/menisci, satellite containment/separation, luma/specular bands, semantic/numeric interaction magnitude, role/name/focus and modality parity, causal reset, engine parity
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P032 | Pointer/drag response uses one normalized sampler, stays bounded and frame-rate independent, and has coherent coarse/keyboard/PRM behavior. |
| BI.W-P044 | The same semantic color/config produces equivalent linear-light composition in CSS, Canvas, GLSL, and WGSL with one output encoding. |
| BI.W-P045 | A scene runs on a declared capable engine with visible runtime-derived identity and an installed typed failure channel, or shows explicit failure; it never masks failure with an unrelated renderer, prose identity, warning, or unhandled rejection. |

Declared semantic locks: `component-blob`. The cursor also acquires 44 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
