# BG.W-BE-BF-LEDGER — the 70-wave BE+BF parity floor

> The no-silent-drop ledger for the two tranches BG unioned. BE (39 developed wave-specs) and
> BF (31 developed wave-specs) were tranche-DEVELOPED but **NEVER executed as their own
> tranches** — both were folded into BG. Their per-wave deliverables must not vanish in the
> fold. Every one of the 70 BE+BF wave-specs (`docs/tranches/{BE,BF}/waves/*.md`) carries
> exactly one DECIDED disposition here, each with load-bearing evidence:
>
> - **LANDED-no-build** — the wave's mechanism is already on committed disk (it landed via an
>   earlier integration; BG owes no new build). The `landed-evidence` cell names the on-disk
>   path, which `proof:be-bf-ledger` resolves with `existsSync` — a LANDED claim cannot float
>   free of the file.
> - **NEVER-BUILT-names-a-wave** — never built; a real BG wave carries the work forward. The
>   `carry-dest` cell names a `BG.W-*` wave from the locked BG plan (the registry below); a
>   phantom or band-only dest REDs.
> - **RETIRE** — never built, retired; the `rationale` cell records WHY (a bare RETIRE REDs).
>
> The corpus (the 70 wave ids) is DERIVED from disk (readdir of `docs/tranches/{BE,BF}/waves`),
> never a hand-list — so a renamed/added BE/BF spec is enrolled the moment it lands and a
> dropped row REDs. Machine-locked by `proof:be-bf-ledger` (L1–L8 + a 7-bite self-test).
>
> **Tally:** 27 LANDED-no-build · 33 NEVER-BUILT-names-a-wave · 10 RETIRE (39 BE + 31 BF = 70).

## BG WAVE REGISTRY

The valid `carry-dest` set — the locked BG wave plan (FINAL.md / `execution/bg-build-map.md`).
`proof:be-bf-ledger` L4 requires every NEVER-BUILT dest to be a member here; L7 cross-checks
this list against `bg-build-map.md` when present (a registry entry not in the locked plan REDs).

```text
BG.W-12-LAWS-UNIVERSAL
BG.W-AMBIENT-HISTOGRAM-LEAF
BG.W-ANIMATION-CONGRUENCE
BG.W-BE-BF-LEDGER
BG.W-BENTO-FRONTDOOR-UNFORK
BG.W-BLOB-KINEMATICS-LEAF
BG.W-CANVAS-LIFECYCLE-LEAVES
BG.W-CARTOON-INK-GAMUT
BG.W-CHART-FAMILY
BG.W-CHIP-ALIAS-KILL
BG.W-COHERENCE-CENSUS
BG.W-COHERENCE-GATE
BG.W-COLOCATION-GATE-STRUCTURAL
BG.W-CONSTRAINT-MANIFEST
BG.W-CUT
BG.W-DATE-CALENDAR
BG.W-DEAD-COMPOSABLE-CUT
BG.W-DEAD-GATE-SWEEP
BG.W-DEAD-TOKEN-SWEEP
BG.W-DEFERRED-LEDGER
BG.W-DEMO-CHASSIS-CONSOLIDATE
BG.W-DEMO-STYLE-REHOME
BG.W-DESHADCN-CENSUS
BG.W-DESHADCN-GATE
BG.W-DESHADCN-MATERIAL
BG.W-DESHADCN-SWEEP
BG.W-DESHADCN-TOKEN-REPLACE
BG.W-DESIGN-LANGUAGE-UNIFY
BG.W-DISPOSITION-RESTAMP
BG.W-DOCK-BUSY-SINGLE
BG.W-DOCK-CAP-SCROLLS
BG.W-DOCK-CAST-RETIRE
BG.W-DOCK-CUT
BG.W-DOCK-DECOMPOSE
BG.W-DOCK-FISSION-WIRE
BG.W-DOCK-INPLACE-MORPH
BG.W-DOCK-LEGIBILITY-RECAL
BG.W-DOCK-MORPH-UNIFY
BG.W-DOCK-OVERFLOW-FADE
BG.W-DOCK-PERSISTENT-CUT
BG.W-DOCK-STORY-MODULARIZE
BG.W-DOTFLOW-REBUILD
BG.W-DS-COMPLETE
BG.W-FIELD-ACCENT-RECONCILE
BG.W-FIELD-AURORA
BG.W-FLIP-ONE
BG.W-GATE-FIELD-AURORA
BG.W-GATE-PREVIEWS-RENDER
BG.W-GATE-ROUTING-LIVE
BG.W-GATE-UNIFORM-BLUR
BG.W-GESTALT-ROSTER-RE-POINT
BG.W-GLASS-BACKDROP-SAMPLE
BG.W-GLASS-BLUR-ENGAGE
BG.W-GLASS-BLUR-PEER
BG.W-GLASS-CLIP-DISCIPLINE
BG.W-GLASS-CONSUMER-BAND
BG.W-GLASS-DYNAMICS
BG.W-GLASS-IDIOM-FACTOR
BG.W-GLASS-LIQUID-TRANSITION
BG.W-GLASS-PAPER-CONGRUENCE
BG.W-GLASS-REFRACT-WEBGL
BG.W-GLASS-SOTA-LADDER
BG.W-GLASS-SUFFUSE-UNIVERSAL
BG.W-GLASS-TINT-UNIFY
BG.W-GOO-BARBELL-CSS
BG.W-GOODOT-SETUP-SPLIT
BG.W-HANDMARK-PERFECT
BG.W-HERO-FIT
BG.W-JUBILANCE-DECIDE
BG.W-LIQUID-ENTRANCE-GENERAL
BG.W-MANIFEST-COLOCATE
BG.W-PAGE-COMPONENT-AUDIT
BG.W-PAINT-IS-THE-GATE
BG.W-PAPER-CROSSREPO-ASKS
BG.W-PAPER-GRAIN-OPTIN
BG.W-PAPER-GRAIN-REAL
BG.W-PAPER-SUFFUSE
BG.W-PENCIL-BOIL-DEEPEN
BG.W-PRESS-MOUNT-RECONCILE
BG.W-ROUTE-TRANSITION
BG.W-SAFARI-BLUR-LITERAL
BG.W-SAFARI-PARITY-GATE
BG.W-SCROLL-PROGRESS-GLASSY
BG.W-SCROLL-PROGRESS-RAIL
BG.W-SCROLL-READER-UNIFY
BG.W-SCROLL-SHRINK
BG.W-SCROLL-SHRINK-UNIFY
BG.W-SECTION-TYPEWRITER-FADEUP
BG.W-SFC-CSS-PARTIAL-SWEEP
BG.W-SHEET-INSET-ROOT
BG.W-SHELL-DOCK-DRY
BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION
BG.W-SIRI-DOCK-INTEGRATION
BG.W-SIRI-ISLAND
BG.W-SIRI-WAVEFORM
BG.W-SPECIMEN-PER-STORY
BG.W-SPIKE-DELETE
BG.W-SPRING-REGISTER-TIDY
BG.W-STORY-PAGE-API
BG.W-STORYBOOK-SUFFUSE
BG.W-TABS-KEYBOARD-LEAF
BG.W-TAILWIND4-IDIOM
BG.W-TIMELINE-ENCAPSULATE
BG.W-UNIFORM-LAYOUT-BUILDER
BG.W-VIZ-DEMIGRATE
BG.W-VIZ-INTRINSIC-SIZE
BG.W-VIZ-PREVIEW-LIVE
BG.W-VIZ-REVEAL-BLOOM
BG.W-VIZ-SIZER-ADOPT-HARD
BG.W-VIZ-SUBSTRATE-DELETE
BG.W-VIZ-SUBSTRATE-DELETE2
BG.W-VT-ROUTE-ENHANCE
```

## THE 70-WAVE DISPOSITION TABLE

| tranche | wave | disposition | landed-evidence | carry-dest | rationale |
|---|---|---|---|---|---|
| BE | BE.W-ALIVE-IDLE | RETIRE | — | — | the ±1.5% breathing-pill idle micro-animation; never built, no binary consumer; offscreen-pause + the dock rest state already cover idle (a jubilance nicety below the ≥2-consumer bar) |
| BE | BE.W-AMBIENT-TINT | LANDED-no-build | src/composables/glass/useGlassBackdropLuminance.ts | — | the OKLCh ambient-hue histogram + the --glass-ambient-hue bias is on disk in the backdrop-luminance leaf |
| BE | BE.W-ANTICIPATE-FOLLOW | LANDED-no-build | src/composables/motion/curves.ts | — | the anticipation-dip then overshoot register (BD.W-CARTOON-PUNCH) is on disk in the curve catalogue |
| BE | BE.W-ARIA-ORIENTATION-GUARD | LANDED-no-build | src/components/custom/tabs/SegmentedTabs.vue | — | the role-conditional aria-orientation guard is on disk (bound only on the underline tablist arm, undefined on the group arm) |
| BE | BE.W-AUR-PRISM | RETIRE | — | — | the album-art aurora burst medium (uMedium==9); never built (the procedural mediums stop at kuwahara uMedium==7); the GL-fence plus the music-app context has no library consumer; the procedural-medium tail is the booked W-AURORA-WGPU-MEDIUMS successor |
| BE | BE.W-AUR-REACTIVE | RETIRE | — | — | the album-reactive aurora is a consumer-side DockStage seam (presets-in-consumers, never a library edit) depending on the never-built now-playing pill; there is no library deliverable to carry |
| BE | BE.W-AUR-SATIN | RETIRE | — | — | the album-art aurora satin medium (uMedium==8); never built; the same GL-fence and no-library-consumer reasoning as BE.W-AUR-PRISM stands |
| BE | BE.W-BACKDROP-SETTLE | LANDED-no-build | src/composables/motion/useLiquidReveal.ts | — | the three-channel reveal carries the opt-in backdrop-blur-settle leg on disk |
| BE | BE.W-BLOOM-UP | LANDED-no-build | src/composables/motion/useBloomUp.ts | — | the shared-element FLIP with the destination-field color channel is on disk |
| BE | BE.W-CELEBRATE-BURST | LANDED-no-build | src/composables/motion/useCelebrationBurst.ts | — | the one-shot earned glass-petal radial bloom composable is on disk |
| BE | BE.W-CLEAR-VARIANT | LANDED-no-build | src/components/ui/_shared/useSurfaceAxis.ts | — | the surface="clear" 4th surface-axis member plus --glass-opacity-clear is on disk |
| BE | BE.W-CONCENTRIC-RADIUS | RETIRE | — | — | the standalone --radius-concentric(parent, inset) system register was never minted; the Apple containerConcentric idiom is applied per-surface inline (segmented-tabs track-radius re-resolves concentric by construction); the shared-register ≥2-distinct-consumer bar is unmet |
| BE | BE.W-CUT | NEVER-BUILT-names-a-wave | — | BG.W-CUT | the terminal user-gated 4.x publish folds into the single BG cut |
| BE | BE.W-DEEP-CEILING | LANDED-no-build | src/styles/glass/deep.css | — | the glass-deep tier plus the --glass-depth Apple-ceiling scalar is on disk |
| BE | BE.W-DESHADCN-GATE-WIDEN | NEVER-BUILT-names-a-wave | — | BG.W-DESHADCN-GATE | the proof:no-shadcn-default gate widen is carried by the BG deshadcn gate |
| BE | BE.W-DESHADCN-SWEEP | NEVER-BUILT-names-a-wave | — | BG.W-DESHADCN-SWEEP | the custom/ form-residue sweep onto house registers is carried by the BG deshadcn sweep |
| BE | BE.W-DISPOSITION-RESTAMP | NEVER-BUILT-names-a-wave | — | BG.W-DISPOSITION-RESTAMP | the book/archived watch re-stamp is carried by the BG disposition restamp |
| BE | BE.W-DOCK-CONTEXT-SILHOUETTE | LANDED-no-build | src/components/custom/dock/composables/useDockContextSilhouette.ts | — | the declarative silhouette-descriptor composable is on disk; BG.W-DOCK-CUT separately DECIDES its coordinated-WS6 fate |
| BE | BE.W-DOCK-FISSION | LANDED-no-build | src/components/custom/dock/composables/useDockFission.ts | — | the n-ary detach orchestrator is on disk |
| BE | BE.W-DOCK-JUBILANCE | LANDED-no-build | src/styles/jubilance.css | — | the fission-ripple / merge-splash / magnetic-tendril recipes are on disk |
| BE | BE.W-DOCK-NOWPLAYING-PILL | RETIRE | — | — | the DockNowPlaying music-pill SFC; never built; an iOS-27 music-app reference surface with no library consumer (collapsed-dock interactive children cover the pattern; album-art tinting is presets-in-consumers) |
| BE | BE.W-DOCK-RAIL-REALIZE | LANDED-no-build | src/components/custom/dock/DockStack.vue | — | the facets render mode plus the railProjection carousel is on disk (CLAUDE.md documents BC.W-DOCK-STACK-RAIL then BE.W-DOCK-RAIL-REALIZE) |
| BE | BE.W-DOCK-TINTED-CHIP | LANDED-no-build | src/components/custom/dock/DockStack.vue | — | the per-facet --glass-accent chromatic-rim chip face is on disk in the DockStack facets mode |
| BE | BE.W-FOLD-LEDGER | NEVER-BUILT-names-a-wave | — | BG.W-DEFERRED-LEDGER | the no-silent-drop machine ledger is the BG deferred ledger; this BE tail folds into it |
| BE | BE.W-GESTALT-ROSTER-BE | NEVER-BUILT-names-a-wave | — | BG.W-GESTALT-ROSTER-RE-POINT | the proof:ba-gestalt re-point plus roster grow is carried by the BG gestalt roster re-point |
| BE | BE.W-GLASS-CONTROL | RETIRE | — | — | the floating-circle GlassControl Maps control; never built; ExpandableContainer corner buttons compose existing chrome; the ≥2-binary-consumer bar is unmet |
| BE | BE.W-GOO-SPLIT-PERF | LANDED-no-build | src/styles/dock/fission-bridge.css | — | the N-piece goo bridge plus the library SVG-filter mount is on disk |
| BE | BE.W-HAPTIC-COUPLE | LANDED-no-build | src/composables/motion/core/useHaptic.ts | — | the navigator.vibrate haptic composable is on disk; BG.W-JUBILANCE-DECIDE separately re-decides its retirement |
| BE | BE.W-ICONCHIP-GLASS | LANDED-no-build | src/styles/icon-chip.css | — | the frosted-glass backdrop-filter icon-chip register is on disk |
| BE | BE.W-LENS-PRISM | LANDED-no-build | src/styles/tokens/glass-fx.css | — | the --glass-edge-dispersion chromatic-aberration fringe token is on disk |
| BE | BE.W-LENS-SAFARI | NEVER-BUILT-names-a-wave | — | BG.W-GLASS-REFRACT-WEBGL | the real cross-engine Safari refraction floor is the BG dual-stack refraction shader re-architecture (the lens currently rides the Chromium-only backdrop-filter url() path) |
| BE | BE.W-METABALL-BRIDGE2 | LANDED-no-build | src/styles/dock/morph-bridge.css | — | the N-seam stretch-and-snap goo bridge is on disk |
| BE | BE.W-PRECEPT-CANON | NEVER-BUILT-names-a-wave | — | BG.W-CONSTRAINT-MANIFEST | the cut-discipline canon plus the lessons backfill is carried by the BG constraint manifest |
| BE | BE.W-SAFARI-CAPTURE | NEVER-BUILT-names-a-wave | — | BG.W-SAFARI-PARITY-GATE | the WebKit liquid-spec validation is carried by the BG safari parity gate |
| BE | BE.W-SHEET-TRANSLUCENT | LANDED-no-build | src/styles/tokens/glass.css | — | the --glass-opacity-sheet 0.74 translucent sheet/drawer crown token is on disk |
| BE | BE.W-SQUIRCLE-COVERAGE | LANDED-no-build | src/styles/glass/squircle.css | — | the cross-engine clip-path squircle silhouette floor is on disk |
| BE | BE.W-TAB-IOS-CAPSULE | LANDED-no-build | src/styles/segmented-tabs.css | — | the .glass-capsule-track / .glass-capsule recessed-accent tab register is on disk |
| BE | BE.W-TINTED-CHIP | LANDED-no-build | src/styles/glass/glass-chip.css | — | the --glass-fill-tint / --glass-fill-strength plate-fill tint axis is on disk |
| BE | BE.W-VIZ-PARITY-METAL | NEVER-BUILT-names-a-wave | — | BG.W-PAINT-IS-THE-GATE | the real-Metal and real-WebKit cross-backend parity is the BG live-paint oracle's domain |
| BF | BF.W-AUR-PRISM | RETIRE | — | — | the album-art aurora burst medium (uMedium==9); never built; the GL-fence plus no-library-consumer reasoning of BE.W-AUR-PRISM stands |
| BF | BF.W-AUR-REACTIVE | RETIRE | — | — | the album-reactive aurora is a consumer-side DockStage seam (presets-in-consumers); there is no library deliverable to carry |
| BF | BF.W-AUR-SATIN | RETIRE | — | — | the album-art aurora satin medium (uMedium==8); never built; the same reasoning as BE.W-AUR-SATIN stands |
| BF | BF.W-CONSUMER-BAND | NEVER-BUILT-names-a-wave | — | BG.W-GLASS-CONSUMER-BAND | the iOS-27 consumer band giving the W5 foundation tokens real consumers is the BG glass consumer band |
| BF | BF.W-CORNER-AA | NEVER-BUILT-names-a-wave | — | BG.W-GLASS-CLIP-DISCIPLINE | re-establishing and locking corner/edge AA under the bloom/clip architecture is the BG glass-clip discipline |
| BF | BF.W-CUT | NEVER-BUILT-names-a-wave | — | BG.W-CUT | the honest 4.x publish plus the slides redeploy folds into the single BG cut |
| BF | BF.W-DEEP-GLASS-WIRE | LANDED-no-build | src/styles/glass/deep.css | — | the --glass-depth / .glass-deep tier composed onto the liquid surfaces is on disk (Button composes glass-deep) |
| BF | BF.W-DEMO-BREADTH | NEVER-BUILT-names-a-wave | — | BG.W-SPECIMEN-PER-STORY | the many-more-examples breadth (each composing the shipped engine) is carried by the BG per-story specimen registry |
| BF | BF.W-DESHADCN-GATE | NEVER-BUILT-names-a-wave | — | BG.W-DESHADCN-GATE | the proof:de-shadcn regression lock is the BG deshadcn gate |
| BF | BF.W-DESHADCN-SWEEP | NEVER-BUILT-names-a-wave | — | BG.W-DESHADCN-SWEEP | the per-component reka/shadcn form abrogation is the BG deshadcn sweep |
| BF | BF.W-DOCK-INTEGRATE | NEVER-BUILT-names-a-wave | — | BG.W-DOCK-FISSION-WIRE | wiring the fission/goo/bloom engines into a real library SFC is the BG dock fission-wire DECIDE |
| BF | BF.W-FISSION-FILAMENT | NEVER-BUILT-names-a-wave | — | BG.W-DOCK-FISSION-WIRE | the goo-neck-spans-the-gap split-convincingness fix lands in the BG dock fission-wire DECIDE |
| BF | BF.W-FLIP-SPINE | NEVER-BUILT-names-a-wave | — | BG.W-FLIP-ONE | the ONE shared FLIP-inversion runner (folding the 5-way re-fork) is the BG flip-one |
| BF | BF.W-FOLD-LEDGER | NEVER-BUILT-names-a-wave | — | BG.W-DEFERRED-LEDGER | the no-silent-drop disposition machine for the BE-to-BF fold is the BG deferred ledger |
| BF | BF.W-GESTALT-WIRE | NEVER-BUILT-names-a-wave | — | BG.W-GESTALT-ROSTER-RE-POINT | the proof:ba-gestalt re-point onto the BF tree is carried by the BG gestalt roster re-point |
| BF | BF.W-GOO-SPLIT-PERF | NEVER-BUILT-names-a-wave | — | BG.W-SAFARI-PARITY-GATE | the manual real-Safari-26-on-Metal goo-fission p50 budget (the un-automatable number) is the BG safari parity gate's domain |
| BF | BF.W-ICON-PRESENCE | LANDED-no-build | src/components/custom/dock/DockStack.vue | — | the DockStack glyph-floor plus the receding-facet legibility floor is on disk |
| BF | BF.W-JUBILANCE-WIRE | NEVER-BUILT-names-a-wave | — | BG.W-JUBILANCE-DECIDE | wiring and DECIDING the haptic plus celebration-burst engines (and killing the phantom-consumer gate class) is the BG jubilance DECIDE |
| BF | BF.W-LAYER-IN-LIQUID | NEVER-BUILT-names-a-wave | — | BG.W-DOCK-FISSION-WIRE | bringing DockLayerGroup layering into the liquid surface and folding the two contextual models is the BG dock fission-wire DECIDE |
| BF | BF.W-LENS-PRISM | LANDED-no-build | src/styles/tokens/glass-fx.css | — | the --glass-edge-dispersion fringe on the shipped .glass-lens SVG seam is on disk |
| BF | BF.W-LIQUID-GROW-ON-EVENT | NEVER-BUILT-names-a-wave | — | BG.W-DOCK-INPLACE-MORPH | the dock grows and shrinks under the user's hand via the BG dock in-place morph (passive-scroll-condense was DECIDED-OUT; touch-grow is the morph's domain) |
| BF | BF.W-PI-AUTHOR | NEVER-BUILT-names-a-wave | — | BG.W-PAINT-IS-THE-GATE | authoring the binding-π layer and de-fanging the source-only release gates is the BG paint-is-the-gate |
| BF | BF.W-RAIL-FIDELITY | NEVER-BUILT-names-a-wave | — | BG.W-DOCK-FISSION-WIRE | the wire-or-delete φ-tier projection math (flooring railProjection.fadeMinAlpha) is named in the BG dock fission-wire DECIDE |
| BF | BF.W-REFLECT | NEVER-BUILT-names-a-wave | — | BG.W-PAINT-IS-THE-GATE | flipping every gestalt-roster row GREEN on fresh whole-page captures is the BG live-paint oracle's close |
| BF | BF.W-SAFARI-CAPTURE | NEVER-BUILT-names-a-wave | — | BG.W-SAFARI-PARITY-GATE | the WebKit liquid-surface validation (the twice-asked Safari validation) is the BG safari parity gate |
| BF | BF.W-SCROLL-FLUIDITY | NEVER-BUILT-names-a-wave | — | BG.W-DOCK-OVERFLOW-FADE | re-homing the continuous-position slow-glide rail scroll onto DockStack is the BG dock overflow-fade port |
| BF | BF.W-SILHOUETTE-REALIZE | NEVER-BUILT-names-a-wave | — | BG.W-DOCK-CUT | the DECIDE-don't-rebook context silhouette (wire OR retire) is the BG dock-cut coordinated-WS6 DECIDE |
| BF | BF.W-SPIKE-DELETE | NEVER-BUILT-names-a-wave | — | BG.W-SPIKE-DELETE | the W-PRUNE-CONSOLIDATE spike cut plus the demo-CSS relocate is the BG spike delete |
| BF | BF.W-SQUIRCLE | LANDED-no-build | src/styles/glass/squircle.css | — | the cross-engine superellipse squircle silhouette floor is on disk |
| BF | BF.W-TAB-IOS-CAPSULE | LANDED-no-build | src/styles/segmented-tabs.css | — | the recessed-accent .glass-capsule register (the SegmentedTabs plus dock-tab fold) is on disk |
| BF | BF.W-VH-COMPOSE | NEVER-BUILT-names-a-wave | — | BG.W-DOCK-INPLACE-MORPH | composing the shipped V↔H morph plus grab-pull (retiring the crossfade facsimile) is the BG dock in-place morph headline |
