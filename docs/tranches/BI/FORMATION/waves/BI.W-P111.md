# BI.W-P111 — FadingScroll apotheosis — scroll-edge overflow affordance

**Status:** PLANNED
**Topological stratum:** BI.S16
**Formation family:** component-containers
**Core centers:** C1_LIQUID_GLASS, C3_MOTION, C6_COMPONENT_APOTHEOSIS, C7_KEYFRAMES_INTEGRATION
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P111`

## Intent

Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS. FadingScroll exposes content overflow at the owning scroller through edge masks, keyboard/touch scroll, RTL, resize, and reduced-transparency behavior without a JS shadow writer.

## Exact scope

- Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS.
- Make the binding concept contract explicit: FadingScroll exposes content overflow at the owning scroller through edge masks, keyboard/touch scroll, RTL, resize, and reduced-transparency behavior without a JS shadow writer.
- Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.
- Render and exercise the exact state set in the shared specimen chassis: top, middle, bottom, horizontal, rtl, keyboard, touch.
- Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.

## File manifest (17)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/chassis/code/CodeBlock.vue | — | cb7518f7dac78b6d7f446c3ce940332427ac220f | source base |
| 2 | repair | demo/shell/BottomDock.vue | — | 7272ac4c8df457fda07fccc16edb032f76e06931 | source base |
| 3 | create | demo/stories/containers/fading-scroll.vue | — | — | source base |
| 4 | repair | demo/stories/motion/curve-gallery.vue | — | c6105622a19aa7af053e3b6f962d5f2d6006fe00 | source base |
| 5 | repair | demo/stories/navigation/carousel.vue | — | dacae15e19c7ff559226cd3aa82be8e0b56e2436 | source base |
| 6 | repair | demo/stories/substrates/aurora/AuroraConfigDock.vue | — | 9cb90ff52688cb28ef73d9c4eafe4c7c37f619cb | source base |
| 7 | repair | demo/stories/substrates/aurora/PresetPickerRow.vue | — | 54862db17b5598523816cfc15ea18927a76c1b09 | source base |
| 8 | repair | demo/stories/substrates/blob.vue | — | c60101bc6dcb99e0f35b8b412bd92c8b6aa272e8 | source base |
| 9 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 10 | modify | src/components/fading-scroll/composables/useFadingScroll.ts | — | — | BI.W-P008 |
| 11 | modify | src/components/fading-scroll/constants.ts | — | — | BI.W-P008 |
| 12 | modify | src/components/fading-scroll/FadingScroll.vue | — | — | BI.W-P008 |
| 13 | modify | src/components/fading-scroll/index.ts | — | — | BI.W-P008 |
| 14 | modify | src/components/fading-scroll/README.md | — | — | BI.W-P008 |
| 15 | create | tests-visual/fading-scroll.contract.spec.ts | — | — | source base |
| 16 | repair | tests-visual/fading-scroll.spec.ts | — | 94d222c96dc8059ecca56de16338c981be85d058 | source base |
| 17 | create | tests/components/fading-scroll.contract.test.ts | — | — | source base |

## Repair manifest (13)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/chassis/code/CodeBlock.vue |
| imports | 2 | demo/shell/BottomDock.vue |
| imports | 3 | demo/stories/motion/curve-gallery.vue |
| imports | 4 | demo/stories/navigation/carousel.vue |
| imports | 5 | demo/stories/substrates/aurora/AuroraConfigDock.vue |
| imports | 6 | demo/stories/substrates/aurora/PresetPickerRow.vue |
| imports | 7 | demo/stories/substrates/blob.vue |
| imports | 8 | tests-visual/fading-scroll.spec.ts |
| tests | 1 | tests-visual/fading-scroll.contract.spec.ts |
| tests | 2 | tests-visual/fading-scroll.spec.ts |
| tests | 3 | tests/components/fading-scroll.contract.test.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | demo/stories/containers/fading-scroll.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P111/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** FadingScroll exposes content overflow at the owning scroller through edge masks, keyboard/touch scroll, RTL, resize, and reduced-transparency behavior without a JS shadow writer.

**Required mutation bite:** Attach document scroll listeners for a nested scroller or hide overflow affordance at keyboard focus; scroll/affordance evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P111`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.affordance | browser | Interactive, selected, disabled, destructive, draggable, and static states remain distinguishable without relying on color alone. | Make a static Badge visually identical to a Button.; Remove the noncolor selected indicator. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |
| motion.scroll | browser | Scroll-linked effects are bounded to the owning scroller, preserve input responsiveness, and use native timelines where supported without a shadow writer. | Attach a document listener for a component scroller.; Run JS progress writes while a native timeline is active. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: fading-scroll-top, fading-scroll-middle, fading-scroll-bottom, fading-scroll-horizontal, fading-scroll-rtl, fading-scroll-keyboard, fading-scroll-touch
Observables: role/state, focus/keyboard, material/contrast, responsive geometry, motion/PRM
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P017 | All functional glass consumes one anatomy and state grammar; content surfaces do not opt in by aesthetic variant. |
| BI.W-P030 | Each scroll-linked property has one owner/scroller and one active writer; on an exact browser build, supported native timelines run without a JS shadow and preserve pause, boundary, bfcache, resize, nested-scroller, focus-reveal, and PRM semantics. |
| BI.W-P059 | Every story control has a typed live effect with a causal semantic/numeric observable and reset, applicable semantic states are reachable through one reusable accessible specimen grammar, and demo/runtime ownership is proven without foreign-inventory, file-existence, test-as-consumer, or stale-readout laundering. |
| BI.W-P062 | Applicable accessibility/input modes are declared and green when each story lands; modal isolation, form error linkage, inactive-face exclusion, mobile action reachability, and target floors are first-order predicates rather than terminal-sweep discoveries. |

Declared semantic locks: `component-fading-scroll`. The cursor also acquires 17 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home custom/fading-scroll at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=retain.
