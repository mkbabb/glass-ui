# BI.W-P080 — Typewriter apotheosis — progressive textual reveal

**Status:** PLANNED
**Topological stratum:** BI.S16
**Formation family:** component-motion
**Core centers:** C3_MOTION, C5_AUDACIOUS_TYPOGRAPHY, C6_COMPONENT_APOTHEOSIS, C7_KEYFRAMES_INTEGRATION
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P080`

## Intent

Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS. Typewriter reveals grapheme-safe text through one cancellable discrete timing authority, with stable layout, explicit announcement policy, interruption/reset, complete immediate text under PRM, and no hidden pointer-only per-character editing behavior.

## Exact scope

- Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS.
- Make the binding concept contract explicit: Typewriter reveals grapheme-safe text through one cancellable discrete timing authority, with stable layout, explicit announcement policy, interruption/reset, complete immediate text under PRM, and no hidden pointer-only per-character editing behavior.
- Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.
- Render and exercise the exact state set in the shared specimen chassis: play, pause, reset, rapid-change, multiline, keyboard, prm.
- Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.
- Delete the default-true interactive prop and per-character click/backspace handlers: every first-party story already disables them, no current consumer demonstrates or justifies glyph-as-control semantics, and progressive reveal is not a text editor.
- Keep glyphs as ordinary semantic text. Pause/resume/reset are separately named native commands; if a future editing concept is wanted, it requires a newly formed focus/caret/selection/modality contract rather than click handlers on spans.

## File manifest (15)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 2 | modify | demo/stories/motion/typewriter.vue | — | 6cc0e56c1cea4e91b92f5597fabb8e92ae3f6f18 | source base |
| 3 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 4 | modify | src/components/typewriter/composables/index.ts | — | — | BI.W-P008 |
| 5 | modify | src/components/typewriter/composables/useTypewriter.ts | — | — | BI.W-P008 |
| 6 | modify | src/components/typewriter/index.ts | — | — | BI.W-P008 |
| 7 | modify | src/components/typewriter/types.ts | — | — | BI.W-P008 |
| 8 | modify | src/components/typewriter/TypewriterText.vue | — | — | BI.W-P008 |
| 9 | modify | src/components/typewriter/utils/keyboard.ts | — | — | BI.W-P008 |
| 10 | modify | src/components/typewriter/utils/pausePatterns.ts | — | — | BI.W-P008 |
| 11 | modify | src/components/typewriter/utils/timing.ts | — | — | BI.W-P008 |
| 12 | modify | src/components/typewriter/utils/typoStateMachine.ts | — | — | BI.W-P008 |
| 13 | create | tests-visual/typewriter.contract.spec.ts | — | — | source base |
| 14 | create | tests/components/typewriter.contract.test.ts | — | — | source base |
| 15 | repair | tests/lifecycle-cleanup.spec.ts | — | fdec64429520c0ce138839f13673a146c915b062 | source base |

## Repair manifest (8)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/stories/manifest.ts |
| imports | 2 | demo/stories/motion/typewriter.vue |
| imports | 3 | tests/lifecycle-cleanup.spec.ts |
| tests | 1 | tests-visual/typewriter.contract.spec.ts |
| tests | 2 | tests/components/typewriter.contract.test.ts |
| tests | 3 | tests/lifecycle-cleanup.spec.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | demo/stories/motion/typewriter.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P080/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Typewriter reveals grapheme-safe text through one cancellable discrete timing authority, with stable layout, explicit announcement policy, interruption/reset, complete immediate text under PRM, and no hidden pointer-only per-character editing behavior.

**Required mutation bite:** Create an uncancelled timer per glyph, strand a delay after reset/unmount, leave incomplete text under PRM, or restore click-only character deletion hidden from the direct story; motion/type/clean-break evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P080`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.clean-break | device-free | No legacy alias, deprecated prop, compatibility shim, dual read/write, silent masking path, or retired public name survives. | Re-export Countup as an alias.; Read both variant and morphT for the same blob state. |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| behavior.focus-escape | browser | Focus order, focus visibility, containment, restoration, and Escape ownership remain correct across every interactive composition. | Restore focus to a removed trigger.; Hide the focus ring on glass. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |
| design.typography | browser | Display, heading, body, label, code, and numeric rungs are optically distinct, geometrically stable during font load, and never arbitrarily re-minted by a component. | Set a label larger than its section heading.; Remove size-adjust from the loading fallback and induce layout shift. |
| motion.single-clock | device-free | Each animated property and semantic episode has one active temporal authority and one writer; physics playback, continuous fields, render loops, native/CSS timelines, one-shot coalescers, and discrete semantic timers use their declared lifecycle owner without overlap or orphan work. | Add a component-local rAF writer for a transform already controlled by engine playback.; Keep a native/CSS timeline and JS shadow writer active on the same property.; Let a discrete typing timer or one-shot coalescer survive cancellation/teardown. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: typewriter-play, typewriter-pause, typewriter-reset, typewriter-rapid-change, typewriter-multiline, typewriter-keyboard, typewriter-prm
Observables: role/state, focus/keyboard, material/contrast, responsive geometry, motion/PRM
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P025 | Every animated property and semantic episode has one declared temporal authority and writer appropriate to its mechanism; its resolved channel is truthfully classified as layout, paint, or trace-supported composite; overlapping writers, local physics/easing loops, orphan work, permanent filename exceptions, and silent scheduler substitution are absent, while pause/settle/interruption/teardown are deterministic. |
| BI.W-P079 | SplitChars creates grapheme-safe visual spans while exposing the unsplit text once to AT and delegates all motion to the shared motion language. |

Declared semantic locks: `component-typewriter`. The cursor also acquires 15 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home custom/typewriter at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=retain.
