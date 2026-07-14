# BI.W-P030 — Native scroll timelines and single-owner scroll state

**Status:** PLANNED
**Topological stratum:** BI.S15
**Formation family:** motion
**Core centers:** C1_LIQUID_GLASS, C3_MOTION, C7_KEYFRAMES_INTEGRATION
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P030`

## Intent

Make native scroll-driven animation primary on modern Safari/Chrome and eliminate redundant JS shadow writers.

## Exact scope

- Map scroll progress, reveal, pin, and chrome concepts to named owning scrollers and native timelines where semantics match.
- Retain JavaScript only for measurement/behavior CSS cannot express; never run it concurrently with the native writer.
- Delete document-global listeners for component scrollers and obsolete old-engine class fallbacks.
- Measure monotonicity, main-thread work, resize behavior, PRM, and fast scrollbar drag.
- Bind the actual Safari/Chrome build and feature probes, then exercise dynamic pause/resume, 0%/100% boundary progress, bfcache back/forward restoration, nested scrollers, and scroll-padding focus reveal—the documented engine bug classes that feature presence alone cannot close.

## File manifest (59)

| # | action | path | target | source-base blob | provenance |
| --- | --- | --- | --- | --- | --- |
| 1 | repair | demo/chassis/hero/story-hero.css | — | d0b98c8b53ec9860d77d80aedcc2ccf3d741d4ee | source base |
| 2 | repair | demo/shell/useShellScrollProgress.ts | — | 6a91376e18030fac65507ee8b15bfa23f37950b9 | source base |
| 3 | repair | demo/stories/display/card.vue | — | 4f4bbfe9a19fe26508c82a120ebceb82714dfae9 | source base |
| 4 | repair | demo/stories/dock/dock-search.vue | — | 8e9beed9e5d4a855a52eea97e975b7173a84fa6e | source base |
| 5 | repair | demo/stories/manifest.ts | — | f21057ce0dc8086c56ee114f48dacb9d4bb287e1 | source base |
| 6 | repair | demo/stories/motion/ScrollChoreographyBody.vue | — | b858ac6530a4639409d25655316ac0503970142d | source base |
| 7 | repair | demo/stories/motion/ScrollNativeBody.vue | — | 00ed1e65541e689a6ebb06fa4500d854493d9fa5 | source base |
| 8 | repair | demo/stories/motion/ScrollReaderBody.vue | — | 4d3ec8ced13c59a194437e45dd25813027bf0684 | source base |
| 9 | repair | demo/stories/navigation/toc-tracking.vue | — | c9cf1693a0b1d05e7067be0faca2723e77effcf5 | source base |
| 10 | repair | DESIGN.md | — | 2bcbe5fe1bdf3f345b07ba80602dfe561c7bc306 | source base |
| 11 | repair | src/components/aurora/composables/atoms.ts | — | — | BI.W-P008 |
| 12 | repair | src/components/aurora/composables/useAurora.ts | — | — | BI.W-P008 |
| 13 | repair | src/components/aurora/constants/presets.ts | — | — | BI.W-P008 |
| 14 | repair | src/components/aurora/DESIGN.md | — | — | BI.W-P008 |
| 15 | repair | src/components/aurora/README.md | — | — | BI.W-P008 |
| 16 | repair | src/components/card/CardHeader.vue | — | — | BI.W-P008 |
| 17 | repair | src/components/card/ScrollCardHeader.vue | — | — | BI.W-P008 |
| 18 | repair | src/components/dock/composables/index.ts | — | — | BI.W-P008 |
| 19 | repair | src/components/dock/composables/useDockSearch.ts | — | — | BI.W-P008 |
| 20 | repair | src/components/dock/index.ts | — | — | BI.W-P008 |
| 21 | repair | src/components/fading-scroll/composables/useFadingScroll.ts | — | — | BI.W-P008 |
| 22 | repair | src/components/fading-scroll/constants.ts | — | — | BI.W-P008 |
| 23 | repair | src/components/fading-scroll/FadingScroll.vue | — | — | BI.W-P008 |
| 24 | repair | src/components/fading-scroll/README.md | — | — | BI.W-P008 |
| 25 | repair | src/composables/motion/core/index.ts | — | 1da2c2030d27d748be2375c9489606e102c90f10 | source base |
| 26 | repair | src/composables/motion/index.ts | — | f4b713bc43ee26cb9fdb359ac4f1bc4bdf5b60bb | source base |
| 27 | modify | src/composables/motion/scrollReader.ts | — | 6efbc1b4b32516b9571c63c59a0ca5694972243b | source base |
| 28 | modify | src/composables/motion/supportsCssTimeline.ts | — | 139436181337b0d91ad356e4cc4ceee49689778a | source base |
| 29 | repair | src/composables/motion/useLiquidFlex.ts | — | e3f6ca86fc2d8edf5df8f6989d424da6697fb512 | source base |
| 30 | repair | src/composables/motion/useScrollChrome.ts | — | eaa32a4fb96d0fc0b281cc6e4b6128c6b0f55613 | source base |
| 31 | repair | src/composables/motion/useScrollPin.ts | — | 94e393c719f9ec5328448481276e86641a078abb | source base |
| 32 | modify | src/composables/motion/useScrollProgress.ts | — | 3e9b7b012db55b46012ad728d943caf900e46a75 | source base |
| 33 | modify | src/composables/motion/useScrollScene.ts | — | 44a929c513b92f9a030b28c6cc71a7bbff6ff3ee | source base |
| 34 | modify | src/composables/motion/useScrollTrigger.ts | — | 0d05d75097f9e31d32c603032cf6efb0e5f4142e | source base |
| 35 | modify | src/composables/motion/useStaggerReveal.ts | — | 270369b8d5817855df8c2a6bcb1a0c058ecd84ac | source base |
| 36 | repair | src/composables/motion/useViewTransition.ts | — | e0dea38a9178c18a1396f946a7fdd04310c098f8 | source base |
| 37 | repair | src/composables/sidebar/index.ts | — | c2ed3d3f6431dcba004147da0b08993e35ad9c66 | source base |
| 38 | repair | src/composables/sidebar/types.ts | — | 076ce0e32d9aa67ffcd92a081d1262a507b3ceba | source base |
| 39 | repair | src/composables/sidebar/useClickDelegate.ts | — | eee36f2f0cd83ddd6d278ffa875ad32a4226d9d4 | source base |
| 40 | repair | src/composables/sidebar/useLazyLoader.ts | — | f5730e3151667465d5626c0082495c37b22b0a1f | source base |
| 41 | repair | src/composables/sidebar/useScrollTo.ts | — | d4c987073e0a1eac215bb3fba89078aef671eafb | source base |
| 42 | repair | src/composables/sidebar/useScrollTracker.ts | — | 326d8c871c6ff733f4888b60fa985ddd4f0d910a | source base |
| 43 | repair | src/composables/sidebar/useSidebarState.ts | — | f33701e87940228c00f1611154b03bdc52fe8825 | source base |
| 44 | repair | src/composables/virtual/useVirtualSectionWindow.ts | — | e287ce517d483df6ea5d21e7fd8dc15d84a5c1d7 | source base |
| 45 | repair | src/composables/virtual/virtualSectionLayout.ts | — | 531c96d53f5de9e00c9399aeef8d26df72d7144d | source base |
| 46 | repair | src/index.ts | — | 5ffc05996a586514a0dcf291c98734b1cc5d9861 | source base |
| 47 | repair | src/styles/card-scroll.css | — | c6ad3298f0c392429112ce739d5e1cc095d63226 | source base |
| 48 | repair | src/styles/dock/density.css | — | 9ddd19df8981f097523da7b432c3470a6602ac7b | source base |
| 49 | repair | src/styles/dock/overflow.css | — | 17dac57297457c34246364d810a6287845e0d4b7 | source base |
| 50 | repair | src/styles/dock/shell.css | — | 321e52fd87ccac9747685dd8fd4100abdb10a535 | source base |
| 51 | repair | src/styles/index.css | — | 16de2284dc725ba78c144bb329629ade60aaf077 | source base |
| 52 | modify | src/styles/scroll-choreography.css | — | 25d3153edfe9bea5d6731ba7fbbd389acc533f4d | source base |
| 53 | repair | src/styles/scroll-chrome.css | — | 3b175f8939c22a00c6ea0bbc298e34ac6b3d7273 | source base |
| 54 | modify | src/styles/scroll-driven.css | — | f82bd52fd9e9a1e63880cad6274b2fdb176b06b6 | source base |
| 55 | repair | src/styles/tokens/property-regs-specular.css | — | 2cc87ce0154718c1feb9676e672e262e3d5480d6 | source base |
| 56 | repair | src/styles/tokens/scroll-tokens.css | — | dadaef593729cbe8c1a974b9878f4b3161e8036e | source base |
| 57 | repair | src/styles/utilities/base-misc.css | — | a1530eb78f62e9566b0c43ee5791aff38efa2d9a | source base |
| 58 | modify | tests-visual/scroll-motion.spec.ts | — | 64956bf0b385a11c1bb817db875df5e509942033 | source base |
| 59 | create | tests/composables/motion/scroll-owner.test.ts | — | — | source base |

## Repair manifest (58)

| surface | # | exact path |
| --- | --- | --- |
| imports | 1 | demo/chassis/hero/story-hero.css |
| imports | 2 | demo/shell/useShellScrollProgress.ts |
| imports | 3 | demo/stories/display/card.vue |
| imports | 4 | demo/stories/dock/dock-search.vue |
| imports | 5 | demo/stories/manifest.ts |
| imports | 6 | demo/stories/motion/ScrollChoreographyBody.vue |
| imports | 7 | demo/stories/motion/ScrollNativeBody.vue |
| imports | 8 | demo/stories/motion/ScrollReaderBody.vue |
| imports | 9 | demo/stories/navigation/toc-tracking.vue |
| imports | 10 | src/components/aurora/DESIGN.md |
| imports | 11 | src/components/aurora/README.md |
| imports | 12 | src/components/aurora/composables/atoms.ts |
| imports | 13 | src/components/aurora/composables/useAurora.ts |
| imports | 14 | src/components/aurora/constants/presets.ts |
| imports | 15 | src/components/card/CardHeader.vue |
| imports | 16 | src/components/card/ScrollCardHeader.vue |
| imports | 17 | src/components/dock/composables/index.ts |
| imports | 18 | src/components/dock/composables/useDockSearch.ts |
| imports | 19 | src/components/dock/index.ts |
| imports | 20 | src/components/fading-scroll/FadingScroll.vue |
| imports | 21 | src/components/fading-scroll/README.md |
| imports | 22 | src/components/fading-scroll/composables/useFadingScroll.ts |
| imports | 23 | src/components/fading-scroll/constants.ts |
| imports | 24 | src/composables/motion/core/index.ts |
| imports | 25 | src/composables/motion/index.ts |
| imports | 26 | src/composables/motion/scrollReader.ts |
| imports | 27 | src/composables/motion/supportsCssTimeline.ts |
| imports | 28 | src/composables/motion/useLiquidFlex.ts |
| imports | 29 | src/composables/motion/useScrollChrome.ts |
| imports | 30 | src/composables/motion/useScrollPin.ts |
| imports | 31 | src/composables/motion/useScrollProgress.ts |
| imports | 32 | src/composables/motion/useScrollScene.ts |
| imports | 33 | src/composables/motion/useScrollTrigger.ts |
| imports | 34 | src/composables/motion/useViewTransition.ts |
| imports | 35 | src/composables/sidebar/index.ts |
| imports | 36 | src/composables/sidebar/types.ts |
| imports | 37 | src/composables/sidebar/useClickDelegate.ts |
| imports | 38 | src/composables/sidebar/useLazyLoader.ts |
| imports | 39 | src/composables/sidebar/useScrollTo.ts |
| imports | 40 | src/composables/sidebar/useScrollTracker.ts |
| imports | 41 | src/composables/sidebar/useSidebarState.ts |
| imports | 42 | src/composables/virtual/useVirtualSectionWindow.ts |
| imports | 43 | src/composables/virtual/virtualSectionLayout.ts |
| imports | 44 | src/index.ts |
| imports | 45 | src/styles/card-scroll.css |
| imports | 46 | src/styles/dock/density.css |
| imports | 47 | src/styles/dock/overflow.css |
| imports | 48 | src/styles/dock/shell.css |
| imports | 49 | src/styles/index.css |
| imports | 50 | src/styles/scroll-choreography.css |
| imports | 51 | src/styles/scroll-chrome.css |
| imports | 52 | src/styles/scroll-driven.css |
| imports | 53 | src/styles/tokens/property-regs-specular.css |
| imports | 54 | src/styles/tokens/scroll-tokens.css |
| imports | 55 | src/styles/utilities/base-misc.css |
| tests | 1 | tests-visual/scroll-motion.spec.ts |
| tests | 2 | tests/composables/motion/scroll-owner.test.ts |
| docs | 1 | DESIGN.md |

## Orchestrator integration envelope (3)

| # | action | path | role | producer | containing-commit policy |
| --- | --- | --- | --- | --- | --- |
| 1 | create | docs/tranches/BI/evidence/BI.W-P030/receipt.json | terminal-receipt | this wave | resolve externally from first-parent integration parent plus BI-Wave and artifact-digest trailers |
| 2 | modify | docs/tranches/BI/RELEASE-ATTESTATION.json | continuous-release-attestation | BI.W-P002 | mechanically rendered projection |
| 3 | modify | docs/tranches/BI/FINAL.md | continuous-final-projection | BI.W-P002 | mechanically rendered projection |

These paths are part of this wave's one terminal commit but are never builder-lane leases. After applying the bounded subject diff, the orchestrator alone acquires `serialized-orchestrator-envelope`, renders the acyclic receipt → attestation → FINAL chain, commits with raw-byte artifact digests in the transaction trailers, resolves the containing commit and tree externally from Git, recovers state read-only, and releases the mutex. Projection mode is `REFRESH`; integration-only wave references are `BI.W-P002`. The exact machine prerequisites are `BI.W-P002` status `DONE`, verified `ACTIVATE` receipt/trailers, and digest-matching RELEASE-ATTESTATION plus FINAL; P002 DEAD withdraws the entire perfected-BI formation, forbids every P003-P133 integration, and permanently denies release eligibility for this execution lineage.

## Durable acceptance

**Invariant:** Each scroll-linked property has one owner/scroller and one active writer; on an exact browser build, supported native timelines run without a JS shadow and preserve pause, boundary, bfcache, resize, nested-scroller, focus-reveal, and PRM semantics.

**Required mutation bite:** Enable useScrollProgress writes while animation-timeline is active, or pass from a feature probe while bfcache restoration returns the wrong progress; writer/state-matrix instrumentation must fail.

**Single executable owner:** `node scripts/verify.mjs --state auto --wave BI.W-P030`. P000's immutable one-shot plan is the sole pre-cursor exception; P001 and every later wave auto-recovers authoritative Git/receipt state before selecting its evidence plan. No row has an independently runnable command or table file.

| invariant family | evidence kind | oracle invariant | realistic RED mutations |
| --- | --- | --- | --- |
| motion.reduced | browser | Reduced motion removes travel, continuous oscillation, and nonessential delay while preserving state change and focus causality. | Keep a breathing loop active under PRM.; Suppress the selected-state change along with its animation. |
| motion.scroll | browser | Scroll-linked effects are bounded to the owning scroller, preserve input responsiveness, and use native timelines where supported without a shadow writer. | Attach a document listener for a component scroller.; Run JS progress writes while a native timeline is active. |
| motion.single-clock | device-free | Each animated property and semantic episode has one active temporal authority and one writer; physics playback, continuous fields, render loops, native/CSS timelines, one-shot coalescers, and discrete semantic timers use their declared lifecycle owner without overlap or orphan work. | Add a component-local rAF writer for a transform already controlled by engine playback.; Keep a native/CSS timeline and JS shadow writer active on the same property.; Let a discrete typing timer or one-shot coalescer survive cancellation/teardown. |
| performance.experience | browser | Supported routes meet interaction, loading, layout stability, long-task, memory, and frame-pacing budgets under representative hardware profiles without hiding work. | Eager-load every procedural renderer on the landing route.; Move work into an unmeasured post-load timer. |

## π obligation

Browsers: Safari-current, Chrome-current
Modes: wide-fine, narrow-coarse, prefers-reduced-motion
Scenarios: scroll-safari, scroll-chrome, scroll-dynamic-pause, scroll-boundaries, scroll-bfcache, scroll-nested, scroll-focus-reveal, scroll-resize, scroll-prm, scroll-fast-drag
Observables: exact browser build/feature probes, monotonic progress, owning scroller, writer count, pause/resume and restored state, main-thread work, final state
Freshness: terminal wave commit
Evidence: tests-visual/results/<wave-id>/<browser>/<scenario>.json plus PNG only when the scenario needs human review

## Minimal DAG edges

| dependency | required invariant |
| --- | --- |
| BI.W-P025 | Every animated property and semantic episode has one declared temporal authority and writer appropriate to its mechanism; its resolved channel is truthfully classified as layout, paint, or trace-supported composite; overlapping writers, local physics/easing loops, orphan work, permanent filename exceptions, and silent scheduler substitution are absent, while pause/settle/interruption/teardown are deterministic. |

Declared semantic locks: `motion-scroll`. The cursor also acquires 59 implicit exact-path write leases before the worktree starts and binds each to its current integration-parent blob. A repair-manifest path closes as MODIFIED or VERIFIED_UNCHANGED when its enrolled subject is conditional REPAIR, and as CREATED, RENAMED, or DELETED when an explicit structural subject owns it. Maximum live execution lanes remain three.

## Terminal transaction

DONE when every scope row, applicable invariant, and π obligation is current and every repair-manifest path has a disk receipt whose outcome matches its enrolled transaction action: MODIFIED or VERIFIED_UNCHANGED for conditional repair, CREATED, RENAMED, or DELETED for an explicit structural action; DEAD only if the product owner permanently withdraws the complete subject with evidence.

Commit policy: exactly one orchestrator-owned Conventional Commit containing the bounded subject diff, terminal receipt, and applicable continuous projections; research agents do not commit. Every wave requires `BI-Wave`, `BI-Status`, `BI-Receipt-SHA256`, and `BI-Formation-SHA256`; P002 and later also require `BI-Attestation-SHA256` and `BI-FINAL-SHA256`. A no-op without a disk-proven terminal disposition is RED. A wave may never become PARTIAL, carried, or successor-owned.

## Archaeology folded

- No distinct historical row; current-source product obligation only.
