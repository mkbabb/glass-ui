# BI.W-P056 — Demo information architecture and shell restraint

**Status:** PLANNED
**Topological stratum:** BI.S23
**Formation family:** demo
**Core centers:** C6_COMPONENT_APOTHEOSIS, C8_DEMO_CHASSIS
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P056`

## Intent

Make the demo a navigable product instrument with clear concept taxonomy, stable route state, and quiet chrome.

## Exact scope

- Rebuild home/category/story hierarchy from the final concept taxonomy and rendered-story graph.
- Keep shell glass functional and content warm; remove generic dashboard cards, duplicated navigation, and page-local shells.
- Preserve current canonical deep links, browser history, scroll/focus restoration, narrow/coarse access, and semantic not-found handling; retired/folded/relocated paths are clean-break 404s rather than compatibility redirects.
- Use final Dock dogfood without making Dock a dependency of content rendering.
- Render unknown paths with exactly one visible primary heading, a reachable recovery action, correct main/landmark semantics, and no shell state that falsely identifies a retained story.

## File manifest (20)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | modify | demo/App.vue | — | e1b22a59dd425c2a6b1cfa23d34c539062045fc4 | source base |
| 2 | repair | demo/chassis/landing/SectionLanding.vue | — | aa70cb4d1b1e105017218f47ff1f4eab75f7439a | source base |
| 3 | modify | demo/demo.css | — | 73b1530fe2e69a1e42c4bf22e412f40e509d090b | source base |
| 4 | repair | demo/main.ts | — | 52322d0a200903207f071f4e218987f1f32f456d | source base |
| 5 | modify | demo/router.ts | — | 7f88ba5492b7d6a17bc890f3898edd7d8749dfc2 | source base |
| 6 | modify | demo/shell/AppShell.vue | — | c9f0f90f580b056074503693674211ce215e343e | source base |
| 7 | modify | demo/shell/BottomDock.vue | — | 7272ac4c8df457fda07fccc16edb032f76e06931 | source base |
| 8 | modify | demo/shell/dock-layer-contexts.ts | — | a89627e10ced4c94b5ba249f439316e81dd0e00a | source base |
| 9 | modify | demo/shell/dock-nav.css | — | 95f917e36e353c294f617ea2afec7a839aff59f6 | source base |
| 10 | modify | demo/shell/NotFound.vue | — | 46ce8b6fe07e7bbc8fc8430ab29809ce7d9042a1 | source base |
| 11 | modify | demo/shell/SidebarDock.vue | — | 29a2eacac8153dc0b5a94af4cc96313cd97100f3 | source base |
| 12 | modify | demo/shell/useContextualDockLayers.ts | — | 3593d181db2a3d7141a29d2667a2d83d75da7c27 | source base |
| 13 | modify | demo/shell/useShellNavDock.ts | — | ebc895e0b3bc51abcac8306b45705b33e98c122a | source base |
| 14 | modify | demo/shell/useShellScrollProgress.ts | — | 6a91376e18030fac65507ee8b15bfa23f37950b9 | source base |
| 15 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 16 | repair | demo/vite.demo-dist.config.ts | — | 09244211a97a27c9df46b0c931dc01920871290a | source base |
| 17 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 18 | repair | README.md | — | a12a23d4b4b52565af5af0eaff8949683140c482 | source base |
| 19 | create | tests-visual/demo-ia.spec.ts | — | — | source base |
| 20 | create | tests/demo/router.test.ts | — | — | source base |

## Repair manifest (8)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/chassis/landing/SectionLanding.vue |
| imports | 2 | demo/main.ts |
| imports | 3 | demo/stories/manifest.ts |
| tests | 1 | tests-visual/demo-ia.spec.ts |
| tests | 2 | tests/demo/router.test.ts |
| build | 1 | demo/vite.demo-dist.config.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | README.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P056/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Every retained concept/story is reachable through one stable direct route hierarchy, every retired path is an honest semantic 404, navigation never mutates route on hydration, and shell chrome does not compete with content.

**Required mutation bite:** Add a duplicate/compatibility redirect, omit the not-found h1, or make Dock v-model echo push on mount; clean-break/route/hold/accessibility checks must fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P056`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.clean-break | device-free | No legacy alias, deprecated prop, compatibility shim, dual read/write, silent masking path, or retired public name survives. | Re-export Countup as an alias.; Read both variant and morphT for the same blob state. |
| behavior.focus-escape | browser | Focus order, focus visibility, containment, restoration, and Escape ownership remain correct across every interactive composition. | Restore focus to a removed trigger.; Hide the focus ring on glass. |
| demo.gestalt | browser | The demo reads as one intentional product: warm field, functional glass, audacious typographic hierarchy, restrained color, and concept-driven motion without page-local design forks. | Restore a generic teal-gradient hero on one route.; Give every card an independent glow and pill title. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: demo-home-wide, demo-category, demo-story-deeplink, demo-retired-route-404, demo-unknown-route-404, demo-back-forward, demo-narrow, demo-keyboard
Observables: direct route stability, retired/unknown route heading and recovery semantics, reachability, focus/scroll restoration, shell/content hierarchy
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P042 | Demo navigation is a thin real consumer of the published Dock and exercises every declared state without a local behavior/style fork, hidden/inactive action, unnamed control, warning storm, or mobile reachability gap. |
| BI.W-P055 | Every story composition uses one semantic chassis grammar, leads with a visible live product witness, and has no second page/hero/section/specimen authority. |

Declared semantic locks: `demo-router`, `demo-shell`. The cursor also acquires 20 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
