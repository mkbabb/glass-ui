# BI.W-P019 — Audacious display type and disciplined text hierarchy

**Status:** PLANNED
**Topological stratum:** BI.S10
**Formation family:** design-foundation
**Core centers:** C5_AUDACIOUS_TYPOGRAPHY
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P019`

## Intent

Create a distinctive left-weighted display gesture while making all reading/UI rungs coherent and font-load stable.

## Exact scope

- Define display, title, heading, body, label, code, and numeric roles as a coordinated semantic scale.
- Make story heroes optically fitted and deliberately asymmetric without clipping or template sameness.
- Delete arbitrary component text-size/weight recipes and fallback-face geometry drift.
- Validate hierarchy at narrow/wide, light/dark, zoom, and font-swap states.

## File manifest (14)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | modify | demo/chassis/hero/story-hero.css | — | d0b98c8b53ec9860d77d80aedcc2ccf3d741d4ee | source base |
| 2 | repair | demo/chassis/hero/StoryHeader.vue | — | 88045c330d313b69defedc6b7d0d080d9b4903f8 | source base |
| 3 | modify | demo/chassis/hero/StoryHero.vue | — | 2f9d2faee4826ca52eb3a4ea4e7c93d1242cec43 | source base |
| 4 | repair | demo/demo.css | — | 73b1530fe2e69a1e42c4bf22e412f40e509d090b | source base |
| 5 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 6 | repair | README.md | — | a12a23d4b4b52565af5af0eaff8949683140c482 | source base |
| 7 | modify | src/styles/fonts.css | — | 65e7cb7241aa36ca5262ff61fc6b6c2410871ead | source base |
| 8 | repair | src/styles/index.css | — | 16de2284dc725ba78c144bb329629ade60aaf077 | source base |
| 9 | modify | src/styles/typography.css | — | 78204d4626f1bbe7cb1490184fad019d5c4d7de8 | source base |
| 10 | modify | src/styles/typography/scale.css | — | 60aa59d15c74d55f0a814760d77ca624960a6f0b | source base |
| 11 | modify | src/styles/typography/semantic.css | — | a03ae59f35f99212e45bfec8bf42863e6f90d1be | source base |
| 12 | modify | src/styles/typography/utilities.css | — | 4415aa88142764007bb0e7fa998be59d5ea0cfb4 | source base |
| 13 | create | tests-visual/typography-system.spec.ts | — | — | source base |
| 14 | repair | vite.style-assets.ts | — | 8a08d092e864493af96512904b3f41d661bb45a9 | source base |

## Repair manifest (7)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/chassis/hero/StoryHeader.vue |
| imports | 2 | demo/demo.css |
| imports | 3 | src/styles/index.css |
| tests | 1 | tests-visual/typography-system.spec.ts |
| build | 1 | vite.style-assets.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | README.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P019/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Every text node resolves to a semantic role, hierarchy never inverts, display type is distinctive, and font loading does not move layout materially.

**Required mutation bite:** Make a field label larger/heavier than its section heading and remove one fallback metric override; both must fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P019`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |
| design.typography | browser | Display, heading, body, label, code, and numeric rungs are optically distinct, geometrically stable during font load, and never arbitrarily re-minted by a component. | Set a label larger than its section heading.; Remove size-adjust from the loading fallback and induce layout shift. |
| performance.experience | browser | Supported routes meet interaction, loading, layout stability, long-task, memory, and frame-pacing budgets under representative hardware profiles without hiding work. | Eager-load every procedural renderer on the landing route.; Move work into an unmeasured post-load timer. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: type-home-wide, type-story-narrow, type-dark, type-font-swap, type-200-percent-zoom
Observables: role hierarchy, line wrapping, overflow, layout shift, display signature
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P015 | Every live token has one semantic definition, typed domain, computed consumer, and accessible mode resolution; no alias is needed to preserve an old name. |

Declared semantic locks: `demo-hero`, `global-typography`. The cursor also acquires 14 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
