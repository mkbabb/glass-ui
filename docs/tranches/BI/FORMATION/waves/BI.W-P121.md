# BI.W-P121 — Deck apotheosis — ordered presentation/page deck

**Status:** PLANNED
**Topological stratum:** BI.S24
**Formation family:** component-navigation
**Core centers:** C3_MOTION, C6_COMPONENT_APOTHEOSIS, C7_KEYFRAMES_INTEGRATION, C8_DEMO_CHASSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P121`

## Intent

Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS. Deck owns page identity, next/previous/direct navigation, progress, keyboard/touch, focus/URL policy, and transition composition without duplicating Tabs/Carousel; its one showcase-only barbell morph and SVG filter stay private to the Deck story rather than masquerading as public library facilities.

## Exact scope

- Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS.
- Make the binding concept contract explicit: Deck owns page identity, next/previous/direct navigation, progress, keyboard/touch, focus/URL policy, and transition composition without duplicating Tabs/Carousel; its one showcase-only barbell morph and SVG filter stay private to the Deck story rather than masquerading as public library facilities.
- Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.
- Render and exercise the exact state set in the shared specimen chassis: start, middle, end, direct, keyboard, touch, goo-travel, safari-filter, prm.
- Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.
- Re-home useGooMorph, gooBarbellGeometry, and morphSignatures beside their sole runtime consumer under demo/stories/motion/deck; remove their root and motion-core exports and update token commentary without leaving a public alias.
- Replace url(#glass-goo) with one Deck-story-local filter whose stable instance id is passed to the painted layer; no AppShell or cross-route resource is a precondition for the story.
- Delete installDeckSpring, deckEase, and the glass-ui DECK_SPRING fork: no current Glass or tracked external import consumes the exported callable easing, its 0.5/0.85 pair contradicts the canonical smooth 0.58/0.8 row it claims to equal, and its caught lazy-load failure is silent scheduler substitution.
- Keep slides' distinct local editorial spring outside Glass authority and return an exact owner packet; do not retain a Glass alias or migration path merely because the donor has a local same-named facility.
- Run the private barbell through declared engine playback and the canonical Glass spring vocabulary, then prove interruption, reversal, rest opacity, teardown, and PRM without elevating the effect into Deck's public behavioral contract or hand-rolling another rAF.
- Exercise direct story load, two concurrently mounted story specimens, Safari filter resolution, unique IDs, route teardown/remount, and absence of GooFilter/useGooMorph/MORPH_SIGNATURES from the packed public surface.

## File manifest (25)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 2 | repair | demo/stories/motion/deck.vue | — | fb22f067f4c1a720b1383fcaa85af9e8e0a4d8b0 | source base |
| 3 | create | demo/stories/motion/deck/DeckGooFilter.vue | — | — | source base |
| 4 | create | demo/stories/navigation/deck.vue | — | — | source base |
| 5 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 6 | modify | MIGRATION.md | — | 1068a94e272e770510befbf98a8dd8f7c3dbaeaf | source base |
| 7 | modify | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 8 | modify | scripts/lib/subpath-policy.mjs | — | cb93f9896eb4f73f11992932ed2515f7954147af | source base |
| 9 | modify | src/components/deck/composables/useDeck.ts | — | — | BI.W-P008 |
| 10 | modify | src/components/deck/composables/useDeckKeyboard.ts | — | — | BI.W-P008 |
| 11 | delete | src/components/deck/composables/useDeckSpring.ts | — | — | BI.W-P008 |
| 12 | modify | src/components/deck/constants.ts | — | — | BI.W-P008 |
| 13 | modify | src/components/deck/DeckPager.vue | — | — | BI.W-P008 |
| 14 | modify | src/components/deck/index.ts | — | — | BI.W-P008 |
| 15 | modify | src/components/deck/README.md | — | — | BI.W-P008 |
| 16 | modify | src/composables/motion/core/index.ts | — | 1da2c2030d27d748be2375c9489606e102c90f10 | source base |
| 17 | rename | src/composables/motion/gooBarbellGeometry.ts | demo/stories/motion/deck/gooBarbellGeometry.ts | 2058899e104cb7b0f3f06dad41754b3e80190207 | source base |
| 18 | rename | src/composables/motion/morphSignatures.ts | demo/stories/motion/deck/morphSignatures.ts | bd3085c3ef919f8c00d14bce0033b8ab157f40ee | source base |
| 19 | rename | src/composables/motion/useGooMorph.ts | demo/stories/motion/deck/useGooMorph.ts | bca98104d3b8c2a7fdf9071358b71d65b00bc5ae | source base |
| 20 | modify | src/index.ts | — | 5ffc05996a586514a0dcf291c98734b1cc5d9861 | source base |
| 21 | modify | src/styles/tokens/property-regs.css | — | 18ef0df8b52f1cc9dfb8b92610a3a15dd8dc328e | source base |
| 22 | modify | src/styles/tokens/scheme-spring.css | — | 84e3623560597073922f8e006f8aa6195e4124cb | source base |
| 23 | create | tests-visual/deck.contract.spec.ts | — | — | source base |
| 24 | create | tests/components/deck.contract.test.ts | — | — | source base |
| 25 | modify | tests/public-surface.spec.ts | — | 6d575c3f2215ecaaef95e5aaf9bcd2b5f8aebea6 | source base |

## Repair manifest (13)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/stories/manifest.ts |
| imports | 2 | demo/stories/motion/deck.vue |
| imports | 3 | src/components/deck/README.md |
| imports | 4 | src/components/deck/constants.ts |
| imports | 5 | src/components/deck/index.ts |
| imports | 6 | src/composables/motion/core/index.ts |
| imports | 7 | src/index.ts |
| imports | 8 | tests/public-surface.spec.ts |
| tests | 1 | tests-visual/deck.contract.spec.ts |
| tests | 2 | tests/components/deck.contract.test.ts |
| tests | 3 | tests/public-surface.spec.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | demo/stories/navigation/deck.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P121/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Deck owns page identity, next/previous/direct navigation, progress, keyboard/touch, focus/URL policy, and transition composition without duplicating Tabs/Carousel; its one showcase-only barbell morph and SVG filter stay private to the Deck story rather than masquerading as public library facilities.

**Required mutation bite:** Lose slide identity/focus, restore a public GooFilter/useGooMorph/MORPH_SIGNATURES/installDeckSpring/deckEase/DECK_SPRING export, depend on a shell-global id, duplicate local filter IDs, or run a second transition clock; selection, continuity, temporal ownership, and clean-break evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P121`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| behavior.selection | browser | Tabs, toggles, chips, radio, checkbox, and selectable lists expose the correct independent/exclusive selection semantics and roving focus. | Expose aria-pressed on a tab.; Allow an exclusive group to hold two values. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |
| motion.transition-continuity | browser | Enter, exit, reorder, route, and shared-element transitions preserve identity, focus, and spatial continuity without layout flashing. | Unmount the source before the shared destination is measurable.; Lose focus during a dialog-to-page transition. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: deck-start, deck-middle, deck-end, deck-direct, deck-keyboard, deck-touch, deck-goo-travel, deck-safari-filter, deck-prm
Observables: role/state, focus/keyboard, material/contrast, responsive geometry, motion/PRM
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P075 | Progress exposes truthful value/min/max/indeterminate/segmented semantics, readable state, stable geometry, and no invented completion claim. |
| BI.W-P118 | PagerDots exposes page count/current/direct navigation, accessible labels, roving/focus, dynamic count, and one velocity-bounded worm indicator with an instance-scoped SVG filter id; it has no Carousel coupling or document-global Goo dependency. |

Declared semantic locks: `component-deck`, `component-goo-filter`, `entry-graph`, `motion-public-surface`. The cursor also acquires 28 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home custom/deck at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=retain.
