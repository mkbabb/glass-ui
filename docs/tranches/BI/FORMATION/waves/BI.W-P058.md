# BI.W-P058 — Concept-driven heroes and display typography

**Status:** PLANNED
**Topological stratum:** BI.S12
**Formation family:** demo
**Core centers:** C5_AUDACIOUS_TYPOGRAPHY, C8_DEMO_CHASSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P058`

## Intent

Give each major story one audacious but restrained concept-specific type gesture without reintroducing bespoke page shells.

## Exact scope

- Define hero composition slots for display title, lede, one color event, one concept-driven motion event, and optional procedural field.
- Remove generic teal gradients, repeated pill eyebrows, all-caps metadata clutter, and identical card-hero templates.
- Constrain specialized art direction through shared hierarchy/material/type contracts.
- Validate line fit, occlusion, focus, motion, dark/light, narrow/wide, and PRM while ensuring hero art never delays, covers, or displaces the first live subject/control below the bottom-Dock reserve.

## File manifest (41)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | modify | demo/chassis/hero/aurora-hero.ts | — | 64323221ff46602cdc8a485fec9d47a31e7ab98d | source base |
| 2 | modify | demo/chassis/hero/category-hero.ts | — | a6c576bb063cdd67aea4ea13decc13d8f8b4b5e0 | source base |
| 3 | create | demo/chassis/hero/concept-art-direction.ts | — | — | source base |
| 4 | modify | demo/chassis/hero/focal.ts | — | 9ad415a77a918ad566bc39d36b921b0a9aa59cae | source base |
| 5 | modify | demo/chassis/hero/story-hero.css | — | d0b98c8b53ec9860d77d80aedcc2ccf3d741d4ee | source base |
| 6 | modify | demo/chassis/hero/StoryHeader.vue | — | 88045c330d313b69defedc6b7d0d080d9b4903f8 | source base |
| 7 | modify | demo/chassis/hero/StoryHero.vue | — | 2f9d2faee4826ca52eb3a4ea4e7c93d1242cec43 | source base |
| 8 | modify | demo/chassis/hero/warm-field.ts | — | 69479e6b06d5a0dc0577ddca31dd8d467d9fe517 | source base |
| 9 | repair | demo/stories/compositions/auth-shell.vue | — | 47ec6daa3b28faba15c3a1e70ee0d6fb7913d69f | source base |
| 10 | repair | demo/stories/compositions/settings.vue | — | bd85599716f2c4f667f37e835637c1f457cc1ff2 | source base |
| 11 | repair | demo/stories/containers/configurator.vue | — | 887b9cbd50fada0688b1f5f021e461c980d4390f | source base |
| 12 | repair | demo/stories/data/instrument-chassis.vue | — | 5439f87b703c75b49e6009a7a188de721529fd18 | source base |
| 13 | repair | demo/stories/data/metric-cell.vue | — | ba851ae5f53abdb3aaf555eb5722ef19f374576e | source base |
| 14 | repair | demo/stories/data/metric-stack.vue | — | 373c38180f5cdc3071b23962b40f501614c84458 | source base |
| 15 | repair | demo/stories/data/search.vue | — | 9b6acc4a11a8e3d6405fd584bd9615d5e57f7f0f | source base |
| 16 | repair | demo/stories/data/sortable-list.vue | — | 56ca5d25709686e17ab154ac92774daf94e49a8c | source base |
| 17 | repair | demo/stories/display/buttons.vue | — | c3d77c92a6246cd97a99a006d3473bd6be8ecd19 | source base |
| 18 | repair | demo/stories/display/card.vue | — | 4f4bbfe9a19fe26508c82a120ebceb82714dfae9 | source base |
| 19 | repair | demo/stories/display/metric-badge.vue | — | 0ce729be9d5638820a513e649ae011004a647229 | source base |
| 20 | repair | demo/stories/dock/DockStage.vue | — | b2618b95b5589e287755d8a0348346274a107f2a | source base |
| 21 | repair | demo/stories/foundations/colors.vue | — | e135a8684cba765b758f96bbf2ae5a4d72f5831b | source base |
| 22 | repair | demo/stories/foundations/intro.vue | — | 4f4356e8b8fa4617908d22300b7ee0291822f25b | source base |
| 23 | repair | demo/stories/foundations/paper-glass.vue | — | 2301793abe89df723239e3600d526c54a5d06da6 | source base |
| 24 | repair | demo/stories/foundations/radii.vue | — | 9ac8e4263414017f8e04d818c374d2d8fd7f9687 | source base |
| 25 | repair | demo/stories/foundations/shadows.vue | — | 9603298a8cfaee80168b9956297b952139d7f615 | source base |
| 26 | repair | demo/stories/foundations/surface-taxonomy.vue | — | 884041cef453dd00977463b403a3c1ed9f1dee59 | source base |
| 27 | repair | demo/stories/foundations/typography.vue | — | f4aa9d7df182b7ed4fff85c82a8420ca92bae353 | source base |
| 28 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 29 | repair | demo/stories/motion/animated-digit.vue | — | 037ce8e85cfc0777dc4f8c60a991c5e3fb889e34 | source base |
| 30 | repair | demo/stories/motion/split-chars.vue | — | 6d46a23e25428031f226056dc6f7f24094ad489f | source base |
| 31 | repair | demo/stories/navigation/carousel.vue | — | dacae15e19c7ff559226cd3aa82be8e0b56e2436 | source base |
| 32 | repair | demo/stories/substrates/aurora.vue | — | 9a239fe268dd29053b55c368a0fee6ffd220dd1b | source base |
| 33 | repair | demo/stories/substrates/aurora/presets.ts | — | 74bd131a3d369e14ee35a26915db3afc178ee0b0 | source base |
| 34 | repair | demo/stories/substrates/blob.vue | — | c60101bc6dcb99e0f35b8b412bd92c8b6aa272e8 | source base |
| 35 | repair | demo/stories/substrates/constellation.vue | — | 6059b428d1d9a055ccf6df3d3f0b285a037151a0 | source base |
| 36 | repair | demo/stories/substrates/fourier-field.vue | — | 538ea7e2ca20dfd374fe0f77f1069a6de604ca36 | source base |
| 37 | repair | demo/stories/substrates/glass-material.vue | — | 9fe945f10389188119d13f1642078715e511548f | source base |
| 38 | repair | demo/stories/substrates/VizStudio.vue | — | 46f9330254244ae7e8ecb514bc662835da15a918 | source base |
| 39 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 40 | create | tests-visual/story-heroes.spec.ts | — | — | source base |
| 41 | create | tests/demo/hero-contract.test.ts | — | — | source base |

## Repair manifest (33)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/stories/compositions/auth-shell.vue |
| imports | 2 | demo/stories/compositions/settings.vue |
| imports | 3 | demo/stories/containers/configurator.vue |
| imports | 4 | demo/stories/data/instrument-chassis.vue |
| imports | 5 | demo/stories/data/metric-cell.vue |
| imports | 6 | demo/stories/data/metric-stack.vue |
| imports | 7 | demo/stories/data/search.vue |
| imports | 8 | demo/stories/data/sortable-list.vue |
| imports | 9 | demo/stories/display/buttons.vue |
| imports | 10 | demo/stories/display/card.vue |
| imports | 11 | demo/stories/display/metric-badge.vue |
| imports | 12 | demo/stories/dock/DockStage.vue |
| imports | 13 | demo/stories/foundations/colors.vue |
| imports | 14 | demo/stories/foundations/intro.vue |
| imports | 15 | demo/stories/foundations/paper-glass.vue |
| imports | 16 | demo/stories/foundations/radii.vue |
| imports | 17 | demo/stories/foundations/shadows.vue |
| imports | 18 | demo/stories/foundations/surface-taxonomy.vue |
| imports | 19 | demo/stories/foundations/typography.vue |
| imports | 20 | demo/stories/manifest.ts |
| imports | 21 | demo/stories/motion/animated-digit.vue |
| imports | 22 | demo/stories/motion/split-chars.vue |
| imports | 23 | demo/stories/navigation/carousel.vue |
| imports | 24 | demo/stories/substrates/VizStudio.vue |
| imports | 25 | demo/stories/substrates/aurora.vue |
| imports | 26 | demo/stories/substrates/aurora/presets.ts |
| imports | 27 | demo/stories/substrates/blob.vue |
| imports | 28 | demo/stories/substrates/constellation.vue |
| imports | 29 | demo/stories/substrates/fourier-field.vue |
| imports | 30 | demo/stories/substrates/glass-material.vue |
| tests | 1 | tests-visual/story-heroes.spec.ts |
| tests | 2 | tests/demo/hero-contract.test.ts |
| docs | 1 | DESIGN.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P058/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Every enrolled hero uses shared hierarchy and has a distinct concept-driven gesture without overflow, subject occlusion/displacement, decorative template sameness, or accessibility loss.

**Required mutation bite:** Restore a generic gradient/pill hero or make a narrow hero push the live specimen below a persistent Dock; cross-route gestalt/hero/reachability constraints must fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P058`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| demo.gestalt | browser | The demo reads as one intentional product: warm field, functional glass, audacious typographic hierarchy, restrained color, and concept-driven motion without page-local design forks. | Restore a generic teal-gradient hero on one route.; Give every card an independent glow and pill title. |
| design.material-hierarchy | browser | Content field, elevated content surface, functional glass, and transient overlay remain perceptually ordered in light/dark and simple/complex backdrops. | Give a content card the same translucency as navigation glass.; Remove overlay edge separation on a complex backdrop. |
| design.typography | browser | Display, heading, body, label, code, and numeric rungs are optically distinct, geometrically stable during font load, and never arbitrarily re-minted by a component. | Set a label larger than its section heading.; Remove size-adjust from the loading fallback and induce layout shift. |
| motion.reduced | browser | Reduced motion removes travel, continuous oscillation, and nonessential delay while preserving state change and focus causality. | Keep a breathing loop active under PRM.; Suppress the selected-state change along with its animation. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: hero-home, hero-component, hero-motion, hero-procedural, hero-narrow, hero-dark, hero-prm
Observables: type hierarchy/fit, content occlusion, color-event count, motion causality, cross-route distinctiveness
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P055 | Every story composition uses one semantic chassis grammar, leads with a visible live product witness, and has no second page/hero/section/specimen authority. |

Declared semantic locks: `demo-hero`. The cursor also acquires 41 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
