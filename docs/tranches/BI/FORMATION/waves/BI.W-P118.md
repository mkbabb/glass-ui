# BI.W-P118 — PagerDots apotheosis — page position and direct navigation indicator

**Status:** PLANNED
**Topological stratum:** BI.S23
**Formation family:** component-navigation
**Core centers:** C6_COMPONENT_APOTHEOSIS, C9_PRUNE
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P118`

## Intent

Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS. PagerDots exposes page count/current/direct navigation, accessible labels, roving/focus, dynamic count, and one velocity-bounded worm indicator with an instance-scoped SVG filter id; it has no Carousel coupling or document-global Goo dependency.

## Exact scope

- Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS.
- Make the binding concept contract explicit: PagerDots exposes page count/current/direct navigation, accessible labels, roving/focus, dynamic count, and one velocity-bounded worm indicator with an instance-scoped SVG filter id; it has no Carousel coupling or document-global Goo dependency.
- Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.
- Render and exercise the exact state set in the shared specimen chassis: static, interactive, dynamic-count, keyboard, touch, multi-instance, safari-filter, prm.
- Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.
- Dissolve the public/global GooFilter facility in this transaction: delete its flat component family, remove the Dock re-export and AppShell mount, and record the clean break without an alias or compatibility mount.
- Render the exact worm-scale SVG filter and fallback neck clipPath inside each PagerDots instance through one stable Vue useId-derived namespace; every local url(#…) reference must resolve within that instance, and simultaneous pagers must have distinct document IDs with identical local geometry.
- Delete the unconsumed dock-fission-goo, dock-morph-goo, and morph-goo registers rather than preserving speculative tunings; Deck's glass-goo obligation is separately localized by P121.
- Exercise two and four simultaneous pagers in native Safari and Chrome, including mount/unmount/remount, keyboard/touch travel, PRM, DOM-id uniqueness, filter/clipPath reference resolution, and zero shell-global defs.

## File manifest (21)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | modify | demo/shell/AppShell.vue | — | c9f0f90f580b056074503693674211ce215e343e | source base |
| 2 | repair | demo/stories/navigation/carousel.vue | — | dacae15e19c7ff559226cd3aa82be8e0b56e2436 | source base |
| 3 | create | demo/stories/navigation/pager-dots.vue | — | — | source base |
| 4 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 5 | modify | MIGRATION.md | — | 1068a94e272e770510befbf98a8dd8f7c3dbaeaf | source base |
| 6 | modify | package.json | — | 2eb141a061925a053bb06ab29c8f745aaee8ea8d | source base |
| 7 | modify | scripts/lib/subpath-policy.mjs | — | cb93f9896eb4f73f11992932ed2515f7954147af | source base |
| 8 | modify | src/components/dock/index.ts | — | — | BI.W-P008 |
| 9 | delete | src/components/goo-filter/GooFilter.vue | — | — | BI.W-P008 |
| 10 | delete | src/components/goo-filter/index.ts | — | — | BI.W-P008 |
| 11 | delete | src/components/goo-filter/README.md | — | — | BI.W-P008 |
| 12 | modify | src/components/pager-dots/composables/usePagerWorm.ts | — | — | BI.W-P008 |
| 13 | modify | src/components/pager-dots/constants.ts | — | — | BI.W-P008 |
| 14 | modify | src/components/pager-dots/index.ts | — | — | BI.W-P008 |
| 15 | modify | src/components/pager-dots/PagerDots.vue | — | — | BI.W-P008 |
| 16 | modify | src/components/pager-dots/pagerWindow.ts | — | — | BI.W-P008 |
| 17 | create | src/components/pager-dots/PagerWormFilter.vue | — | — | source base |
| 18 | modify | src/components/pager-dots/README.md | — | — | BI.W-P008 |
| 19 | create | tests-visual/pager-dots.contract.spec.ts | — | — | source base |
| 20 | create | tests/components/pager-dots.contract.test.ts | — | — | source base |
| 21 | modify | tests/public-surface.spec.ts | — | 6d575c3f2215ecaaef95e5aaf9bcd2b5f8aebea6 | source base |

## Repair manifest (10)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/shell/AppShell.vue |
| imports | 2 | demo/stories/navigation/carousel.vue |
| imports | 3 | src/components/dock/index.ts |
| imports | 4 | src/components/pager-dots/PagerDots.vue |
| imports | 5 | tests/public-surface.spec.ts |
| tests | 1 | tests-visual/pager-dots.contract.spec.ts |
| tests | 2 | tests/components/pager-dots.contract.test.ts |
| tests | 3 | tests/public-surface.spec.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | demo/stories/navigation/pager-dots.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P118/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** PagerDots exposes page count/current/direct navigation, accessible labels, roving/focus, dynamic count, and one velocity-bounded worm indicator with an instance-scoped SVG filter id; it has no Carousel coupling or document-global Goo dependency.

**Required mutation bite:** Mount one global filter, duplicate a pager filter or clipPath id across instances, keep a dead Goo id/export, make dots clickable without labels/focus, or stretch the worm beyond neighboring pages; ownership, clean-break, selection, and motion evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P118`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| behavior.selection | browser | Tabs, toggles, chips, radio, checkbox, and selectable lists expose the correct independent/exclusive selection semantics and roving focus. | Expose aria-pressed on a tab.; Allow an exclusive group to hold two values. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |
| motion.spring-language | browser | Press, selection, morph, dock, and route motion draw from one named spring vocabulary and settle without overshoot/magnitude anomalies. | Use an arbitrary cubic-bezier for a spring-owned press.; Double dock overshoot beyond its family band. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: pager-dots-static, pager-dots-interactive, pager-dots-dynamic-count, pager-dots-keyboard, pager-dots-touch, pager-dots-multi-instance, pager-dots-safari-filter, pager-dots-prm
Observables: role/state, focus/keyboard, material/contrast, responsive geometry, motion/PRM
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P042 | Demo navigation is a thin real consumer of the published Dock and exercises every declared state without a local behavior/style fork, hidden/inactive action, unnamed control, warning storm, or mobile reachability gap. |
| BI.W-P059 | Every story control has a typed live effect with a causal semantic/numeric observable and reset, applicable semantic states are reachable through one reusable accessible specimen grammar, and demo/runtime ownership is proven without foreign-inventory, file-existence, test-as-consumer, or stale-readout laundering. |
| BI.W-P062 | Applicable accessibility/input modes are declared and green when each story lands; modal isolation, form error linkage, inactive-face exclusion, mobile action reachability, and target floors are first-order predicates rather than terminal-sweep discoveries. |

Declared semantic locks: `component-dock`, `component-goo-filter`, `component-pager-dots`, `demo-shell`, `entry-graph`. The cursor also acquires 21 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home custom/pager-dots at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=retain.
