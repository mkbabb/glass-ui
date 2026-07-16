# BI.W-P106 — Dialog apotheosis — modal/nonmodal dialog

**Status:** DONE
**Disposition:** retained canonical modal/nonmodal Dialog with instance-owned portal staging
**Topological stratum:** BI.S18
**Formation family:** component-containers
**Core centers:** C1_LIQUID_GLASS, C3_MOTION, C6_COMPONENT_APOTHEOSIS, C7_KEYFRAMES_INTEGRATION
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P106`

Current product evidence:

- `DialogContent` retains the canonical center/edge placement, scroll, surface, motion,
  close-control, scrim-animation, and `none | dim | scale | immersive` stage axes.
- `Dialog` now provides instance-local stage wrapper and scrim refs. The in-flow root
  anchor resolves only its nearest consumer wrapper, while the portaled `ModalOverlay`
  registers only its own scrim; no global first-match stage mutation remains.
- stage flip frames are cancelled on close/teardown, and cleanup is limited to roots
  previously acquired by that Dialog instance.
- `tests/components/ui/dialog/dialog-stage-ownership.test.ts` exercises concurrent
  nested Dialog owners, isolated wrapper gates, isolated immersive scrim state, and
  owner-local close cleanup.
- `demo/stories/containers/dialog.vue` routes concise nonmodal, genuinely overflowing
  scroll, nested, and explicit-close specimens on the canonical Dialog anatomy.

**Active correction rider — native acceptance not yet credited.** A non-center `DialogContent` is one
stationary plate plus one stable inner content region. The region owns intrinsic top-flow anatomy and,
when named, scrolling; the host and any direct-child material sampler remain stationary. The prior
full-height implicit-grid stretch and host-scroll topology are not covered by this wave's existing DONE
record and remain open until the native matrix below passes.

## Intent

Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS. Dialog owns title/description, modality, focus containment/restoration, inert background, dismissal policy, portal, size/scroll, and shared overlay material/motion.

## Exact scope

- Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS.
- Make the binding concept contract explicit: Dialog owns title/description, modality, focus containment/restoration, inert background, dismissal policy, portal, size/scroll, and shared overlay material/motion.
- Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.
- Render and exercise the exact state set in the shared specimen chassis: modal, nonmodal, scroll, nested, no-close, keyboard, touch, prm.
- Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.
- Delete zero-witness DialogScrollContent and fold its long-content behavior into one explicit DialogContent size/scroll axis; no second DialogPortal/ModalOverlay/close/style recipe or alias survives.
- For every non-center placement, retain one stable side-content region across the `scroll` arms. Keep
  actions intrinsic and content-adjacent, and place overflow only on that region; do not patch the host,
  footer, or controls, conditionally re-parent the slot, or infer a bottom-anchored action policy.
- Collapse ModalOverlay to the distinct behavior Dialog actually consumes: no forward-reserved edge layout, no scale/slide spellings that resolve to fade, and no unused none arm. Preserve a scroll switch only if the folded DialogContent owner causally needs it.
- Exercise viewport-bounded inner scroll, inert background, title/description, focus, outside/Escape dismissal, touch, narrow geometry, and PRM with content that actually overflows.

## File manifest (25)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/shell/AppShell.vue | — | c9f0f90f580b056074503693674211ce215e343e | source base |
| 2 | repair | demo/shell/BottomDock.vue | — | 7272ac4c8df457fda07fccc16edb032f76e06931 | source base |
| 3 | repair | demo/shell/configurator/PresetEditor.vue | — | — | BI.W-P012 |
| 4 | repair | demo/stories/compositions/gate-pattern.vue | — | 3b7062ae79091429f1685e72afd1f1a22edcd945 | source base |
| 5 | modify | demo/stories/containers/dialog.vue | — | 28771964d8ef0171cadb3db8a7eeb850190495e5 | source base |
| 6 | repair | demo/stories/containers/sheet.vue | — | b173b82f248f4a852cc8e463e715a5e97abeda03 | source base |
| 7 | repair | demo/stories/feedback/confirm-dialog.vue | — | dd4cd511fcc738f1d30c2b76e352f364425a17e2 | source base |
| 8 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 9 | repair | demo/stories/motion/tempo.vue | — | b83267b3e247c1588362d8935b4ed5e4cc8fd96f | source base |
| 10 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 11 | modify | src/components/dialog/Dialog.vue | — | — | BI.W-P008 |
| 12 | modify | src/components/dialog/DialogClose.vue | — | — | BI.W-P008 |
| 13 | modify | src/components/dialog/DialogContent.vue | — | — | BI.W-P008 |
| 14 | modify | src/components/dialog/DialogDescription.vue | — | — | BI.W-P008 |
| 15 | modify | src/components/dialog/DialogFooter.vue | — | — | BI.W-P008 |
| 16 | modify | src/components/dialog/DialogHeader.vue | — | — | BI.W-P008 |
| 17 | delete | src/components/dialog/DialogScrollContent.vue | — | — | BI.W-P008 |
| 18 | modify | src/components/dialog/DialogTitle.vue | — | — | BI.W-P008 |
| 19 | modify | src/components/dialog/DialogTrigger.vue | — | — | BI.W-P008 |
| 20 | modify | src/components/dialog/index.ts | — | — | BI.W-P008 |
| 21 | repair | tests-visual/dialog-glass.spec.ts | — | 7756d5cfd41fe64b501846a5fcee8279e546c6b8 | source base |
| 22 | create | tests-visual/dialog.contract.spec.ts | — | — | source base |
| 23 | create | tests/components/dialog.contract.test.ts | — | — | source base |
| 24 | repair | tests/components/ui/dialog/dialog-show-close.test.ts | — | 6d769dffb48a42931883cf587152143aceedcdd4 | source base |
| 25 | repair | tests/components/ui/dialog/dialog-spring.test.ts | — | 497f321989249d0c1449780281c94fdbece6c122 | source base |

## Repair manifest (19)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/shell/AppShell.vue |
| imports | 2 | demo/shell/BottomDock.vue |
| imports | 3 | demo/shell/configurator/PresetEditor.vue |
| imports | 4 | demo/stories/compositions/gate-pattern.vue |
| imports | 5 | demo/stories/containers/dialog.vue |
| imports | 6 | demo/stories/containers/sheet.vue |
| imports | 7 | demo/stories/feedback/confirm-dialog.vue |
| imports | 8 | demo/stories/manifest.ts |
| imports | 9 | demo/stories/motion/tempo.vue |
| imports | 10 | tests-visual/dialog-glass.spec.ts |
| imports | 11 | tests/components/ui/dialog/dialog-show-close.test.ts |
| imports | 12 | tests/components/ui/dialog/dialog-spring.test.ts |
| tests | 1 | tests-visual/dialog-glass.spec.ts |
| tests | 2 | tests-visual/dialog.contract.spec.ts |
| tests | 3 | tests/components/dialog.contract.test.ts |
| tests | 4 | tests/components/ui/dialog/dialog-show-close.test.ts |
| tests | 5 | tests/components/ui/dialog/dialog-spring.test.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | demo/stories/containers/dialog.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P106/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Dialog owns title/description, modality, focus containment/restoration, inert background, dismissal policy, portal, size/scroll, and shared overlay material/motion.

**Required mutation bite:** Open a modal without accessible title/background inertness, restore DialogScrollContent, keep a second overlay recipe, or prove scroll with nonoverflowing content; dialog/topology evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P106`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| behavior.focus-escape | browser | Focus order, focus visibility, containment, restoration, and Escape ownership remain correct across every interactive composition. | Restore focus to a removed trigger.; Hide the focus ring on glass. |
| behavior.overlay-apg | browser | Dialog, drawer, popover, menu, tooltip, and toast honor their distinct APG roles, focus, dismissal, modality, and announcement contracts over shared infrastructure. | Give a tooltip dialog semantics.; Let Escape close the wrong stacked overlay. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: dialog-modal, dialog-nonmodal, dialog-scroll, dialog-nested, dialog-no-close, dialog-keyboard, dialog-touch, dialog-prm, dialog-placement-top, dialog-placement-right, dialog-placement-bottom, dialog-placement-left
Observables: role/state, focus/keyboard, material/contrast, responsive geometry, intrinsic action geometry, host-vs-inner scroll ownership, stationary graded-edge bounds, motion/PRM
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P029 | Every enter/exit/route transition has one owner, preserves focus/identity, updates instantly without visual residue when native motion is unavailable/reduced, and projects any advertised tempo scaling through every channel of the composed episode rather than only its focal panel. |
| BI.W-P100 | One private focus scope serves Dialog/Drawer/Popover/Menu/Dock overlays with stack-aware containment and restoration; it is not a public visual component. |

Declared semantic locks: `component-dialog`. The cursor also acquires 25 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home ui/dialog at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=retain.
