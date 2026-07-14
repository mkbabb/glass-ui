# BI.W-P109 — Card apotheosis — semantic content group

**Status:** PLANNED
**Topological stratum:** BI.S16
**Formation family:** component-display
**Core centers:** C1_LIQUID_GLASS, C6_COMPONENT_APOTHEOSIS, C9_PRUNE
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P109`

## Intent

Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS. Card owns content grouping and optional declared action/selection composition but delegates all material to Surface and command semantics to Button/Link.

## Exact scope

- Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS.
- Make the binding concept contract explicit: Card owns content grouping and optional declared action/selection composition but delegates all material to Surface and command semantics to Button/Link.
- Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.
- Render and exercise the exact state set in the shared specimen chassis: content, elevated, interactive-composed, selected, dense, narrow.
- Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.

## File manifest (47)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/chassis/code/CodeBlock.vue | — | cb7518f7dac78b6d7f446c3ce940332427ac220f | source base |
| 2 | repair | demo/chassis/hero/StoryHero.vue | — | 2f9d2faee4826ca52eb3a4ea4e7c93d1242cec43 | source base |
| 3 | repair | demo/chassis/showcase/ShowcaseFrame.vue | — | f3ca53e001a4ccebf55c203b2c204d6eafc42a58 | source base |
| 4 | repair | demo/shell/NotFound.vue | — | 46ce8b6fe07e7bbc8fc8430ab29809ce7d9042a1 | source base |
| 5 | repair | demo/stories/compositions/empty-states.vue | — | 4392d08eb5622e47f82e2ca12a4cc273c9f97ec0 | source base |
| 6 | repair | demo/stories/compositions/gate-pattern.vue | — | 3b7062ae79091429f1685e72afd1f1a22edcd945 | source base |
| 7 | repair | demo/stories/compositions/settings.vue | — | bd85599716f2c4f667f37e835637c1f457cc1ff2 | source base |
| 8 | repair | demo/stories/containers/card-pressable.vue | — | 7486ccdd103aa62b9cb41326445bb4b48bb4d1dc | source base |
| 9 | repair | demo/stories/containers/dropdown-menu.vue | — | 9057dacd0e81425206b638869ad6369e03e929d1 | source base |
| 10 | repair | demo/stories/containers/hover-popover.vue | — | 8364ae7c7fa3aaf07de168d90e7a0e597f6d9864 | source base |
| 11 | repair | demo/stories/containers/popover.vue | — | 69fed437b98377fe2e3945e26cb99b9b8e0033e7 | source base |
| 12 | repair | demo/stories/containers/sheet.vue | — | b173b82f248f4a852cc8e463e715a5e97abeda03 | source base |
| 13 | repair | demo/stories/data/avatar.vue | — | 2cc58a59a3153e9f6fa88c311f6bbabd96cd2c06 | source base |
| 14 | repair | demo/stories/data/search.vue | — | 9b6acc4a11a8e3d6405fd584bd9615d5e57f7f0f | source base |
| 15 | repair | demo/stories/data/sortable-list.vue | — | 56ca5d25709686e17ab154ac92774daf94e49a8c | source base |
| 16 | repair | demo/stories/data/tags-input.vue | — | 82920c7ce0a17d515f6815d03da15cddff321587 | source base |
| 17 | repair | demo/stories/display/card.tile.vue | — | 71c976ca2df650772d5f3e43a757a6b96394e192 | source base |
| 18 | modify | demo/stories/display/card.vue | — | 4f4bbfe9a19fe26508c82a120ebceb82714dfae9 | source base |
| 19 | repair | demo/stories/display/separator.vue | — | baa51f9a5bc48a5209eccb267d87f0661f936ce0 | source base |
| 20 | repair | demo/stories/foundations/surface-taxonomy.vue | — | 884041cef453dd00977463b403a3c1ed9f1dee59 | source base |
| 21 | repair | demo/stories/foundations/surface-tints.vue | — | bbb5f37280d6b8118c48f335bc2044afd17bc667 | source base |
| 22 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 23 | repair | demo/stories/substrates/glass-material.vue | — | 9fe945f10389188119d13f1642078715e511548f | source base |
| 24 | repair | demo/stories/substrates/glass-panel.vue | — | ff1fe558ecfd84fd3543b4c7162cfe1030da6cca | source base |
| 25 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 26 | modify | src/components/card/Card.vue | — | — | BI.W-P008 |
| 27 | modify | src/components/card/CardAction.vue | — | — | BI.W-P008 |
| 28 | modify | src/components/card/CardContent.vue | — | — | BI.W-P008 |
| 29 | modify | src/components/card/CardDescription.vue | — | — | BI.W-P008 |
| 30 | modify | src/components/card/CardFooter.vue | — | — | BI.W-P008 |
| 31 | modify | src/components/card/CardHeader.vue | — | — | BI.W-P008 |
| 32 | modify | src/components/card/CardTitle.vue | — | — | BI.W-P008 |
| 33 | modify | src/components/card/index.ts | — | — | BI.W-P008 |
| 34 | modify | src/components/card/ScrollCard.vue | — | — | BI.W-P008 |
| 35 | modify | src/components/card/ScrollCardHeader.vue | — | — | BI.W-P008 |
| 36 | create | tests-visual/card.contract.spec.ts | — | — | source base |
| 37 | repair | tests-visual/glass-prune.spec.ts | — | ca8fb6268cf6706dee89b0952e6cd7703d3c51f0 | source base |
| 38 | repair | tests-visual/no-gray.spec.ts | — | e5cddd233ea4eafd9c33daa6151c3587ba2b2296 | source base |
| 39 | repair | tests-visual/paper-grid.spec.ts | — | 799f3b9d1a2e23cfc82e9bee335cdb3f2255478d | source base |
| 40 | repair | tests-visual/selection-card.spec.ts | — | 3714139e0b65c5fddf60a1698b85ffd25270a722 | source base |
| 41 | repair | tests-visual/separator.spec.ts | — | 5a05b6bc06b9a7d749e211d73ae1518caec8d58c | source base |
| 42 | repair | tests-visual/shadow-grammar.spec.ts | — | 362342ca50cab94bda1a379320e7b0723aad9223 | source base |
| 43 | repair | tests-visual/storybook-meta.spec.ts | — | 24ac892fc46cd02a7e852f715f4254b282d61e7b | source base |
| 44 | repair | tests-visual/substrate-cohesion.spec.ts | — | bf042da59c96872a096d87c5c0539dc992c2d7c6 | source base |
| 45 | create | tests/components/card.contract.test.ts | — | — | source base |
| 46 | repair | tests/components/ui/card/Card.test.ts | — | f50d2c31f516e623ed27acd7d7a54df0b6a78134 | source base |
| 47 | repair | tests/scripts/storybook-complete.detect.test.ts | — | 9bdf1ba970e751915127e5c4c686cc2bf4c094ab | source base |

## Repair manifest (48)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/chassis/code/CodeBlock.vue |
| imports | 2 | demo/chassis/hero/StoryHero.vue |
| imports | 3 | demo/chassis/showcase/ShowcaseFrame.vue |
| imports | 4 | demo/shell/NotFound.vue |
| imports | 5 | demo/stories/compositions/empty-states.vue |
| imports | 6 | demo/stories/compositions/gate-pattern.vue |
| imports | 7 | demo/stories/compositions/settings.vue |
| imports | 8 | demo/stories/containers/card-pressable.vue |
| imports | 9 | demo/stories/containers/dropdown-menu.vue |
| imports | 10 | demo/stories/containers/hover-popover.vue |
| imports | 11 | demo/stories/containers/popover.vue |
| imports | 12 | demo/stories/containers/sheet.vue |
| imports | 13 | demo/stories/data/avatar.vue |
| imports | 14 | demo/stories/data/search.vue |
| imports | 15 | demo/stories/data/sortable-list.vue |
| imports | 16 | demo/stories/data/tags-input.vue |
| imports | 17 | demo/stories/display/card.tile.vue |
| imports | 18 | demo/stories/display/card.vue |
| imports | 19 | demo/stories/display/separator.vue |
| imports | 20 | demo/stories/foundations/surface-taxonomy.vue |
| imports | 21 | demo/stories/foundations/surface-tints.vue |
| imports | 22 | demo/stories/manifest.ts |
| imports | 23 | demo/stories/substrates/glass-material.vue |
| imports | 24 | demo/stories/substrates/glass-panel.vue |
| imports | 25 | tests-visual/glass-prune.spec.ts |
| imports | 26 | tests-visual/no-gray.spec.ts |
| imports | 27 | tests-visual/paper-grid.spec.ts |
| imports | 28 | tests-visual/selection-card.spec.ts |
| imports | 29 | tests-visual/separator.spec.ts |
| imports | 30 | tests-visual/shadow-grammar.spec.ts |
| imports | 31 | tests-visual/storybook-meta.spec.ts |
| imports | 32 | tests-visual/substrate-cohesion.spec.ts |
| imports | 33 | tests/components/ui/card/Card.test.ts |
| imports | 34 | tests/scripts/storybook-complete.detect.test.ts |
| tests | 1 | tests-visual/card.contract.spec.ts |
| tests | 2 | tests-visual/glass-prune.spec.ts |
| tests | 3 | tests-visual/no-gray.spec.ts |
| tests | 4 | tests-visual/paper-grid.spec.ts |
| tests | 5 | tests-visual/selection-card.spec.ts |
| tests | 6 | tests-visual/separator.spec.ts |
| tests | 7 | tests-visual/shadow-grammar.spec.ts |
| tests | 8 | tests-visual/storybook-meta.spec.ts |
| tests | 9 | tests-visual/substrate-cohesion.spec.ts |
| tests | 10 | tests/components/card.contract.test.ts |
| tests | 11 | tests/components/ui/card/Card.test.ts |
| tests | 12 | tests/scripts/storybook-complete.detect.test.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | demo/stories/display/card.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P109/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Card owns content grouping and optional declared action/selection composition but delegates all material to Surface and command semantics to Button/Link.

**Required mutation bite:** Mint independent card glass/shadow variants or make the whole card clickable without link/button semantics; material/affordance evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P109`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.affordance | browser | Interactive, selected, disabled, destructive, draggable, and static states remain distinguishable without relying on color alone. | Make a static Badge visually identical to a Button.; Remove the noncolor selected indicator. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| design.material-hierarchy | browser | Content field, elevated content surface, functional glass, and transient overlay remain perceptually ordered in light/dark and simple/complex backdrops. | Give a content card the same translucency as navigation glass.; Remove overlay edge separation on a complex backdrop. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: card-content, card-elevated, card-interactive-composed, card-selected, card-dense, card-narrow
Observables: role/state, focus/keyboard, material/contrast, responsive geometry, motion/PRM
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P063 | Surface alone selects material and elevation; it never implies content grouping, interactivity, or a copied glass recipe. |

Declared semantic locks: `component-card`. The cursor also acquires 47 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home ui/card at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=retain.
