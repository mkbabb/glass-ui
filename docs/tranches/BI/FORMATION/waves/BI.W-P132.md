# BI.W-P132 — Live refraction product — one public door, frame graph, and honest capability matrix

**Status:** PLANNED
**Topological stratum:** BI.S20
**Formation family:** material-runtime
**Core centers:** C1_LIQUID_GLASS, C4_PROCEDURAL_VIZ
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P132`

## Intent

Replace the orphan WebGL2/WGSL shaders and Chromium-only CSS/SVG garnish with one actually consumed RefractionRoot/RefractionSurface product whose two GPU translators share state, lifecycle, and perceptual obligations.

## Exact scope

- Start from the optical contract: refraction is geometry/depth, chromatic dispersion is a bounded rim phenomenon, the plate remains legible over adversarial luminance, and reduced-transparency removes the effect without removing hierarchy.
- Create one public /refraction entry exposing RefractionRoot and RefractionSurface; one frame graph owns backdrop capture, panel registry, state, scheduling, context, resources, and failures while private WebGPU and WebGL2 translators consume the same material/frame record.
- Move and reconcile the currently unimported glassShader.wgsl and glass-refract.glsl.ts under that owner, delete the inert data-URI SVG lens path and its .glass-lens opt-ins, and reject any public backend selector or second context.
- Treat capability absence as a declared static functional-glass material; shader compilation, binding, FBO/capture, lifecycle, or setup failure throws and remains observable instead of falling through to another renderer.
- Render a dedicated live story with one and multiple moving surfaces over a structured warm/color field, forced WebGPU, forced WebGL2, capability-absent material, high/low luminance, pointer/press/travel, resize/orientation, PRM, reduced transparency, and teardown states.
- Prove native Safari with safaridriver plus Metal/device identity and Chrome across the applicable matrix; bind π and DELTA receipts to tested source, build, route, predicate, browser, hardware, and deterministic material inputs.

## File manifest (39)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/stories/display/buttons.vue | — | c3d77c92a6246cd97a99a006d3473bd6be8ecd19 | source base |
| 2 | modify | demo/stories/substrates/glass-material.vue | — | 9fe945f10389188119d13f1642078715e511548f | source base |
| 3 | repair | demo/stories/substrates/glass-panel.vue | — | ff1fe558ecfd84fd3543b4c7162cfe1030da6cca | source base |
| 4 | create | demo/stories/substrates/refraction.vue | — | — | source base |
| 5 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 6 | repair | MIGRATION.md | — | 1068a94e272e770510befbf98a8dd8f7c3dbaeaf | source base |
| 7 | repair | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 8 | repair | README.md | — | a12a23d4b4b52565af5af0eaff8949683140c482 | source base |
| 9 | repair | scripts/lib/subpath-policy.mjs | — | cb93f9896eb4f73f11992932ed2515f7954147af | source base |
| 10 | repair | scripts/profile-bundle.mjs | — | 34419261975b16924dead033076a9ea85980c274 | source base |
| 11 | modify | src/components/button/Button.vue | — | — | BI.W-P008 |
| 12 | create | src/components/refraction/frame-graph.ts | — | — | source base |
| 13 | create | src/components/refraction/index.ts | — | — | source base |
| 14 | create | src/components/refraction/material-contract.ts | — | — | source base |
| 15 | create | src/components/refraction/refraction.css | — | — | source base |
| 16 | create | src/components/refraction/RefractionRoot.vue | — | — | source base |
| 17 | create | src/components/refraction/RefractionSurface.vue | — | — | source base |
| 18 | create | src/components/refraction/translators/webgl2.ts | — | — | source base |
| 19 | create | src/components/refraction/translators/webgpu.ts | — | — | source base |
| 20 | modify | src/components/tabs/SegmentedTabs.vue | — | — | BI.W-P008 |
| 21 | modify | src/composables/glass/index.ts | — | f60b67669b15fcdbf5eef4933a558a19d2fab467 | source base |
| 22 | rename | src/composables/glass/webgl/shaders/glass-refract.glsl.ts | src/components/refraction/shaders/refraction.glsl.ts | 661d6430f6e1166d0e053e652ecbd84b0c1c101d | source base |
| 23 | rename | src/composables/glass/webgpu/glassShader.wgsl | src/components/refraction/shaders/refraction.wgsl | b53c0d0b305fa40e8c973f4fa56f4118a4cb6c56 | source base |
| 24 | delete | src/styles/glass-refract.css | — | 503b21d79f89d34f6c624bf43c6f9bfdd463243c | source base |
| 25 | repair | src/styles/glass-specular-track.css | — | f7b915bda22f5f8f6bf23c882d09104b7c1a1f8e | source base |
| 26 | repair | src/styles/glass/material.css | — | ecf1ac55ad1e3caa9970c13adbc59bce65b73e36 | source base |
| 27 | repair | src/styles/glass/surfaces.css | — | 9eebf2e6b80cdd6c19c4e1500b8bc194dbca8a3b | source base |
| 28 | modify | src/styles/index.css | — | 16de2284dc725ba78c144bb329629ade60aaf077 | source base |
| 29 | repair | src/styles/segmented-tabs.css | — | 3139afb08242087d5b853acc54713acda9fd18c0 | source base |
| 30 | repair | src/styles/tabs/segmented-tabs-drag.css | — | 6c50427c9d299238b4ab086ffdf977820d31a9b8 | source base |
| 31 | repair | src/styles/tokens/property-regs-specular.css | — | 2cc87ce0154718c1feb9676e672e262e3d5480d6 | source base |
| 32 | repair | src/styles/tokens/property-regs.css | — | 18ef0df8b52f1cc9dfb8b92610a3a15dd8dc328e | source base |
| 33 | repair | tests-visual/button-glass.spec.ts | — | 118b4dd322baad2d283ea8825081d5d2c196fd5e | source base |
| 34 | repair | tests-visual/glass-prune.spec.ts | — | ca8fb6268cf6706dee89b0952e6cd7703d3c51f0 | source base |
| 35 | repair | tests-visual/lensing.spec.ts | — | a8527e8cf5480cf9a84ffc96e1a2fdf635457eac | source base |
| 36 | create | tests-visual/refraction-live.spec.ts | — | — | source base |
| 37 | create | tests/components/refraction.contract.test.ts | — | — | source base |
| 38 | repair | vite.config.ts | — | 7d9d1eb2030c4963c0359ee4083d7359c5e912db | source base |
| 39 | repair | vite.style-assets.ts | — | 8a08d092e864493af96512904b3f41d661bb45a9 | source base |

## Repair manifest (31)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/stories/display/buttons.vue |
| imports | 2 | demo/stories/substrates/glass-material.vue |
| imports | 3 | demo/stories/substrates/glass-panel.vue |
| imports | 4 | scripts/profile-bundle.mjs |
| imports | 5 | src/components/button/Button.vue |
| imports | 6 | src/components/tabs/SegmentedTabs.vue |
| imports | 7 | src/composables/glass/index.ts |
| imports | 8 | src/composables/glass/webgl/shaders/glass-refract.glsl.ts |
| imports | 9 | src/styles/glass-refract.css |
| imports | 10 | src/styles/glass-specular-track.css |
| imports | 11 | src/styles/glass/material.css |
| imports | 12 | src/styles/glass/surfaces.css |
| imports | 13 | src/styles/index.css |
| imports | 14 | src/styles/segmented-tabs.css |
| imports | 15 | src/styles/tabs/segmented-tabs-drag.css |
| imports | 16 | src/styles/tokens/property-regs-specular.css |
| imports | 17 | src/styles/tokens/property-regs.css |
| imports | 18 | tests-visual/button-glass.spec.ts |
| imports | 19 | tests-visual/glass-prune.spec.ts |
| imports | 20 | tests-visual/lensing.spec.ts |
| tests | 1 | tests-visual/refraction-live.spec.ts |
| tests | 2 | tests/components/refraction.contract.test.ts |
| build | 1 | package.json |
| build | 2 | scripts/lib/subpath-policy.mjs |
| build | 3 | vite.config.ts |
| build | 4 | vite.style-assets.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | MIGRATION.md |
| docs | 3 | README.md |
| docs | 4 | demo/stories/substrates/glass-material.vue |
| docs | 5 | demo/stories/substrates/refraction.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P132/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Every public refraction surface is painted by one live frame graph through exactly one declared translator, both translators implement the same material/state record, capability absence is honest material, internal failure is explicit, and no SVG lens, orphan shader, public backend choice, second context, stale receipt, or unobserved state can pass.

**Required mutation bite:** Remove runtime reachability, add a second context or public backend prop, set refraction strength to zero, leave the second panel inert, restore .glass-lens, catch a shader failure, perform a per-frame layout read, or substitute Playwright WebKit for native Safari; the owning family/case must fail with the planted defect.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P132`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| demo.gestalt | browser | The demo reads as one intentional product: warm field, functional glass, audacious typographic hierarchy, restrained color, and concept-driven motion without page-local design forks. | Restore a generic teal-gradient hero on one route.; Give every card an independent glow and pill title. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.adaptive-accessibility | browser | Reduced transparency, increased contrast, forced colors, and reduced motion remain complete product states with visible hierarchy and semantics. | Leave text on transparent glass under reduced transparency.; Use color alone for forced-colors selection. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| design.material-hierarchy | browser | Content field, elevated content surface, functional glass, and transient overlay remain perceptually ordered in light/dark and simple/complex backdrops. | Give a content card the same translucency as navigation glass.; Remove overlay edge separation on a complex backdrop. |
| integrity.entry-graph | device-free | One entry graph generates Vite inputs, declarations, package exports, types, and migration mappings; no hand mirror or source subpath barrel exists. | Add a package export absent from the authority.; Restore one src/subpaths mirror barrel. |
| performance.experience | browser | Supported routes meet interaction, loading, layout stability, long-task, memory, and frame-pacing budgets under representative hardware profiles without hiding work. | Eager-load every procedural renderer on the landing route.; Move work into an unmeasured post-load timer. |
| performance.resource-ownership | device-free | A route owns only the observers, contexts, event listeners, and timers required by rendered concepts, and teardown returns to baseline. | Leak a window listener across route exit.; Create two WebGL contexts for one rendered scene. |
| procedural.lifecycle | device-free | Every GPU/Canvas scene composes one shared mount/resize/DPR/visibility/error lifecycle and releases resources deterministically. | Create a scene-local ResizeObserver lifecycle.; Leave a GPU buffer alive after unmount. |
| procedural.renderer-parity | browser | WebGPU-preferred and supported WebGL2 paths express the same scene identity, configuration semantics, color space, and interaction within declared perceptual bands. | Interpret a config scalar differently in GLSL and WGSL.; Silently render an unrelated Canvas2D scene after both GPU engines fail. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: refraction-chrome-webgpu, refraction-chrome-webgl2, refraction-chrome-material, refraction-safari-metal-webgpu, refraction-safari-metal-webgl2, refraction-safari-material, refraction-multi-surface, refraction-high-low-luminance, refraction-narrow-orientation, refraction-prm, refraction-reduced-transparency, refraction-injected-failures, refraction-teardown
Observables: input→state→paint, nonzero depth displacement, bounded rim chroma, multi-surface liveness, contrast, translator parity, one context/frame graph, frame and resource budgets, explicit failures, teardown
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P054 | Procedural routes own bounded resources, do zero continuous work while paused, resume once, lazy-load heavy code, and meet declared experience budgets with attribution. |
| BI.W-P061 | Every visual claim has fresh warning-clean semantic native Safari/Chrome evidence for the exact terminal source and actual renderer, including trace-backed animation-channel classification where claimed, and cannot pass from an image hash, source whitelist, formation capture, missing capture, wrong server, harness-provided identity, unhandled rejection, or older commit. |
| BI.W-P133 | Every inbound row and predicate has one explicit producer disposition and executable owner; P-derived write authority exists only for the current fixed-point direct/required closure, all unrelated global BI work remains separately authorized and uncredited, and no ACK or earlier DesignSync phase can bypass a red external prerequisite. |

Declared semantic locks: `component-refraction`, `entry-graph`, `global-material`, `gpu-substrate`, `visual-runner`. The cursor also acquires 41 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current HEAD has zero runtime importers of both refraction shaders; scripts/proof-glass.mjs proves source shape while the live CSS/SVG path is Chromium-only, so source presence has repeatedly masqueraded as a product.
- sci-report Atlas P registry F52 independently found the declared primary shader unconsumed and G.W9/GG037–GG040 requires live reachability, native Safari/Metal, explicit internal failures, full π/DELTA, and tested-source DesignSync refresh.
