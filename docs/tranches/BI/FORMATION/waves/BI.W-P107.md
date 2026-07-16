# BI.W-P107 — Drawer apotheosis — edge-attached dialog/drawer

**Status:** IMPLEMENTED — GCF-02 NATIVE ACCEPTANCE PENDING
**Disposition:** retained canonical fixed/detented Drawer with one spring and instance-owned staging
**Topological stratum:** BI.S19
**Formation family:** component-containers
**Core centers:** C3_MOTION, C6_COMPONENT_APOTHEOSIS, C7_KEYFRAMES_INTEGRATION
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P107`

Current product evidence:

- `Drawer` retains the truthful modal/live-behind, fixed/detented, direction, stage,
  active-snap-point, semantic grip, surface, and drag APIs on the existing Dialog root.
- the root and private `DrawerOverlay` register the owning wrapper and portaled scrim in
  `DrawerSnapContext`; `useDrawerSnap` writes only those refs and contains no global
  first-match fallback.
- one `SpringProgress` still owns open, drag, interruption, reverse, and close. Every
  settle assigns its target before playback, so reduced motion paints the requested
  endpoint before Presence releases. The existing Presence hold keeps content inert and
  mounted through an animated close, then releases only the settling instance's gates.
- `tests/components/custom/drawer/Drawer.motion-lifecycle.test.ts` exercises bottom/right
  PRM endpoints, close retention/reversal, Escape/outside dismissal, focus restoration,
  and concurrent nested owner isolation through final settle.

## Intent

Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS. Drawer is Dialog semantics plus truthful modal/live-behind and fixed/detented modes. An explicit detent grip is one named slider-equivalent control whose pointer, touch, Arrow, Home, and End paths share activeSnapPoint, paint, stage, announcement, interruption, and PRM state; a fixed Drawer renders no drag affordance, and no historical Sheet alias survives.

## Exact scope

- Retain one public concept and remove shadcn/CVA/raw-utility styling authority, aliases, duplicated wrappers, and unowned CSS.
- Make the binding concept contract explicit: Drawer is Dialog semantics plus truthful modal/live-behind and fixed/detented modes. An explicit detent grip is one named slider-equivalent control whose pointer, touch, Arrow, Home, and End paths share activeSnapPoint, paint, stage, announcement, interruption, and PRM state; a fixed Drawer renders no drag affordance, and no historical Sheet alias survives.
- Replace shadcn/CVA/raw Tailwind visual recipes with typed semantic props/state attributes and colocated owned CSS while preserving Reka/native accessibility behavior.
- Render and exercise the exact state set in the shared specimen chassis: left-fixed, right-fixed, bottom-fixed, explicit-detents, live-behind-default-detents, inner-scroll, keyboard-arrows-home-end, touch, interrupt, prm.
- Repoint every listed local consumer/import/test/story/build projection atomically; update generated migration/entry facts when the public shape changes.
- Separate modal/content-sized omission from live-behind defaulting: omitted snapPoints on an ordinary Drawer means one full resting position and no handle; only a declared detented/live-behind contract synthesizes the default ladder.
- Replace the aria-hidden 25px pointer-only div with a coarse-target semantic detent control only when two or more stops exist; expose name, bounded value/value text, visible focus, Arrow stepping, Home/End, and one pointer/touch/keyboard state writer.
- Bind every settle and interruption to the public v-model readback, sheet/stage/scrim scalar, focus and announcement policy, reduced motion, nested scrolling, dismiss thresholds, and direct story readback; source comments or the dialog role cannot launder the grip.
- Remove DrawerOverlay from public projection while keeping the scrim private to DrawerContent/shared overlay ownership; modal/live-behind scenarios, not internal imports, prove its behavior.
- Delete DrawerPortal from /drawer without a root alias because DrawerContent already owns DialogPortal. Route muster's wrong-root MobileInstrumentSheet import and outer wrapper through the read-only constellation owner packet; exactly one portal boundary survives.

## File manifest (16)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | modify | demo/stories/containers/drawer.vue | — | b0b1fbdb6d48732d70330550ac61277f7592ca72 | source base |
| 2 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 3 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 4 | modify | src/components/drawer/composables/drawerSnapContext.ts | — | — | BI.W-P008 |
| 5 | modify | src/components/drawer/composables/useDrawerSnap.ts | — | — | BI.W-P008 |
| 6 | modify | src/components/drawer/constants.ts | — | — | BI.W-P008 |
| 7 | modify | src/components/drawer/Drawer.vue | — | — | BI.W-P008 |
| 8 | modify | src/components/drawer/DrawerContent.vue | — | — | BI.W-P008 |
| 9 | modify | src/components/drawer/DrawerDescription.vue | — | — | BI.W-P008 |
| 10 | modify | src/components/drawer/DrawerFooter.vue | — | — | BI.W-P008 |
| 11 | modify | src/components/drawer/DrawerHeader.vue | — | — | BI.W-P008 |
| 12 | modify | src/components/drawer/DrawerOverlay.vue | — | — | BI.W-P008 |
| 13 | modify | src/components/drawer/DrawerTitle.vue | — | — | BI.W-P008 |
| 14 | modify | src/components/drawer/index.ts | — | — | BI.W-P008 |
| 15 | create | tests-visual/drawer.contract.spec.ts | — | — | source base |
| 16 | create | tests/components/drawer.contract.test.ts | — | — | source base |

## Repair manifest (6)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/stories/containers/drawer.vue |
| imports | 2 | demo/stories/manifest.ts |
| tests | 1 | tests-visual/drawer.contract.spec.ts |
| tests | 2 | tests/components/drawer.contract.test.ts |
| docs | 1 | DESIGN.md |
| docs | 2 | demo/stories/containers/drawer.vue |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P107/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Drawer is Dialog semantics plus truthful modal/live-behind and fixed/detented modes. An explicit detent grip is one named slider-equivalent control whose pointer, touch, Arrow, Home, and End paths share activeSnapPoint, paint, stage, announcement, interruption, and PRM state; a fixed Drawer renders no drag affordance, and no historical Sheet alias survives.

**Required mutation bite:** Restore Sheet/DrawerPortal/public DrawerOverlay, render an aria-hidden drag handle, preserve muster's double portal, let ordinary omission inherit the live-behind ladder, diverge keyboard/pointer detents, split paint from v-model, or let drag dismiss while inner scroll owns the gesture; clean-break/overlay/selection evidence must turn RED.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P107`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| architecture.component-topology | device-free | Every public component concept has one flat family home; ui/custom tiers, public wrapper synonyms, and second authorities are absent. | Restore src/components/ui.; Export IconTooltip beside Tooltip. |
| architecture.present-tense-source | device-free | Production source explains current invariants without tranche IDs, recovery diaries, retired alternatives, or migration archaeology. | Add a BI.W identifier to src.; Describe a retired implementation as current rationale. |
| behavior.focus-escape | browser | Focus order, focus visibility, containment, restoration, and Escape ownership remain correct across every interactive composition. | Restore focus to a removed trigger.; Hide the focus ring on glass. |
| behavior.overlay-apg | browser | Dialog, drawer, popover, menu, tooltip, and toast honor their distinct APG roles, focus, dismissal, modality, and announcement contracts over shared infrastructure. | Give a tooltip dialog semantics.; Let Escape close the wrong stacked overlay. |
| behavior.selection | browser | Tabs, toggles, chips, radio, checkbox, and selectable lists expose the correct independent/exclusive selection semantics and roving focus. | Expose aria-pressed on a tab.; Allow an exclusive group to hold two values. |
| demo.scenario-contract | browser | Every story exposes the states required to evaluate its behavior, material, responsiveness, accessibility, and reduced-motion contract through reusable chassis. | Add a dark-mode control that changes no rendered subtree.; Omit invalid state from a form story. |
| design.adaptive-accessibility | browser | Reduced transparency, increased contrast, forced colors, and reduced motion remain complete product states with visible hierarchy and semantics. | Leave text on transparent glass under reduced transparency.; Use color alone for forced-colors selection. |
| design.contrast | browser | Text, icons, focus, selection, and nontext boundaries meet their semantic contrast requirements in every material and state. | Lower selected-control icon contrast below its required band.; Remove the noncolor focus boundary. |
| design.responsive-touch | browser | Components reflow without hidden controls, unintended overflow, or sub-floor touch targets at supported narrow/wide and coarse/fine inputs. | Reduce a primary coarse target below the product floor.; Hide a control at narrow width without an equivalent path. |
| motion.single-clock | device-free | Each animated property and semantic episode has one active temporal authority and one writer; physics playback, continuous fields, render loops, native/CSS timelines, one-shot coalescers, and discrete semantic timers use their declared lifecycle owner without overlap or orphan work. | Add a component-local rAF writer for a transform already controlled by engine playback.; Keep a native/CSS timeline and JS shadow writer active on the same property.; Let a discrete typing timer or one-shot coalescer survive cancellation/teardown. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: drawer-left-fixed, drawer-right-fixed, drawer-bottom-fixed, drawer-explicit-detents, drawer-live-behind-default-detents, drawer-inner-scroll, drawer-keyboard-arrows-home-end, drawer-touch, drawer-interrupt, drawer-prm
Observables: role/state, focus/keyboard, material/contrast, responsive geometry, motion/PRM
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P004 | Every authoritative consumer claim is bound to immutable tracked commit objects and a byte-stable foreign snapshot: index state, already-dirty tracked working bytes, and all nonignored untracked-tree bytes are protected before and after the probe; drift invalidates evidence without mutating or normalizing the sibling. |
| BI.W-P032 | Pointer/drag response uses one normalized sampler, stays bounded and frame-rate independent, and has coherent coarse/keyboard/PRM behavior. |
| BI.W-P106 | Dialog owns title/description, modality, focus containment/restoration, inert background, dismissal policy, portal, size/scroll, and shared overlay material/motion. |

Declared semantic locks: `component-drawer`. The cursor also acquires 16 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- Current family home ui/drawer at 26c5ae686fd0f1181083aebda1215b00524555f1; decision=retain.
