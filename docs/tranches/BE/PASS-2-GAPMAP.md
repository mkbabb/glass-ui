# BE tranche — PASS 2 (de-shadcn sweep · dock-fission mechanism · Safari · gates)

_16 lens findings, synthesized 2026-06-20._

## ds-overlays
- **summary:** De-shadcn audit of the 12-component overlay/menu group. The group is ALREADY ~85% de-shadcn'd: every content panel (Dialog/Sheet/Popover/DropdownMenu/ContextMenu/Tooltip/HoverCard/Command/Combobox/Select bodies) rides our `glass-reveal` + the shared {glass·veil·opaque} surface-axis + the φ `--overlay-pad-*` ladder + `glass-floating`; the menuItemVariants CVA defaults to our `.glass-menu-row` glass register (accent = the sanctioned BA inv-7 flat-fill escape); the shadcn token NAMES that survive (`text-popover-foregr
  - [major] **BE.W-DESHADCN-SWEEP-OVERLAYS** — ONE wave covers the whole 12-component group (NOT 12 per-component waves — the SEED's per-component framing over-scopes for this group). (a) Mint a canonical glass dismiss/icon-button register (.glass
  - [major] **BE.W-DESHADCN-GATE-WIDEN** — DO NOT mint a net-new proof:de-shadcn — proof:no-shadcn-default ALREADY EXISTS (BC.W-DESHADCN) and is fully green. INSTEAD widen its FORBIDDEN list to close the STATE-arm blind spot the sweep exposes:

## ds-formctl — de-shadcn FORM audit of ui/{input,textarea,number-field,checkbox,radio-group,switch,slider,tags-input,label,toggle,toggle-group}
- **summary:** The form-control group was ALREADY swept de-shadcn at BC.W-DESHADCN — `proof:no-shadcn-default` (scripts/proof-no-shadcn-default.mjs) is GREEN over all 233 ui/ files, the BC.W-CONTROL-SMOOTH reskins landed (tags-input→.control-surface/.focus-ring, switch-thumb→bg-card, toggle-outline→.control-surface), and Input/Textarea/NumberField are fully on .input-pill + --control-surface/--input-on-glass. So the group is ~90% CLEAN. But the BC gate is a FIXED forbidden-token list with a structural blind spot, and it left ONE 
  - [major] **BE.W-DESHADCN-SWEEP** — ONE wave covers the whole 92-package de-shadcn sweep (per SEED Band 9); for THIS group it must add the Toggle residue: re-point toggle/index.ts base CVA `data-[state=on]:bg-accent text-accent-foregrou
  - [major] **BE.W-DESHADCN-GATE** — Harden proof:no-shadcn-default beyond its 8-token fixed list: (a) add a STATE-ARM clause so `data-[state=on]:bg-accent`/`hover:bg-muted`/`focus:bg-accent` flat-neutral STATE fills on a NON-glass-tier 
  - [minor] **BE.W-DESHADCN-SWEEP (nuance arm)** — OPTIONAL strict-creed: re-point the slider spectrum FALLBACK defaults (Slider.vue:373 --background→--card thumb-border; :348 --secondary track fallback) to warm glass/paper tokens. Sub-perceptual; def

## ds-display — DE-SHADCN FORM AUDIT of ui/{card,badge,alert,avatar,separator,skeleton,progress,table,data-table,accordion,collapsible,carousel}
- **summary:** The 12-component group is MOSTLY CLEAN at the de-shadcn TOKEN-vocabulary level — the existing proof:no-shadcn-default gate (BC.W-DESHADCN) runs fully GREEN over all 233 ui/ files. The crucial framing: every Tailwind default-palette token in this group RESOLVES to a WARM glass-ui token, NOT zinc/slate residue — border-border→--neutral-4 (warm C≈0.036, BA.W-NO-GRAY), bg-muted→--neutral-1 (warm), bg-popover→--card (warm-cream hsl(36 48% 97%)), --separator-ink→color-mix(--foreground 22%), ring→warm --foreground. So PAL
  - [minor] **BE.W-DESHADCN-SWEEP (this group's slice)** — Re-point the 2 GENUINE residual FORM items: (1) GlassCarouselPager.vue:116 counter → .glass-pager-ring (delete bg-card/border-border/shadow-cartoon-sm, byte-match the already-migrated CarouselPager si
  - [major] **BE.W-DESHADCN-GATE (extend proof:no-shadcn-default)** — The existing gate's FORBIDDEN list has a resolution gap below the token-palette axis: it catches rounded-md but NOT rounded-lg/rounded-sm (the other bare-radius rungs), and catches bg-{muted,secondary

## ds-misc-chips — DE-SHADCN FORM AUDIT of ui/{notification,metric-pill,section,toast,_shared} + custom/{icon-chip,metric-badge,metric-cell,metric-stack,status-dot,pulse,toggle-chip,selectable-chip,labeled-field,color-swatch,stacked-icons,animated-digit}
- **summary:** This component group is ~90% CLEAN of residual shadcn/reka default FORM. The metric family (MetricBadge/Cell/Row/Stack/Pill), IconChip, ColorSwatch, Pulse, AnimatedDigit, the LabeledField family, Section, the Notification body, the _shared resolvers (useSurfaceAxis/useControlSize/menuItemVariants/ModalOverlay), and the accent-tone chips (Selectable/ToggleChip) are genuinely on the glass-ui register (--glass-*/--foreground/--muted-foreground/--card, .focus-ring, accent-tone, feedback-tone, surface-axis, the named --
  - [major] **BE.W-DESHADCN-SWEEP** — Confirms ONE sweep covers this group — the per-component re-points are ≤5 real files: (1) ToastClose.vue:24 destructive ink red-300/red-50 → --destructive register + rest glyph → text-muted-foreground
  - [critical] **BE.W-DESHADCN-GATE** — Confirms the gate is an EXTENSION of the existing proof:no-shadcn-default (proof-no-shadcn-default.mjs), NOT a net-new gate, along TWO uncovered axes this lens surfaced: (A) RAW-DEFAULT-PALETTE — add 

## ds-dock-nav — DE-SHADCN FORM AUDIT of custom/{dock,controls,pager-dots,tabs,scrolling-text,search,infinite-scroll,sortable-list,spa-view}
- **summary:** This component group is already 100% de-shadcn — there is NO residual default reka/shadcn FORM token in the entire lens group. Every component is either (a) a thin class-emitter whose visual lives in OUR src/styles/dock*.css / segmented-tabs.css / icon-chip / glass registers (DockIconButton/DockTabButton/DockSelect/DockDropdown/DockBackground/DockSeparator/DockSection/DockLayer/DockLayerGroup/DockStack/SegmentedTabs/PagerDots), or (b) fully token-driven scoped CSS reading our --glass-*/--foreground/--dock-*/--color
  - [minor] **BE.W-DESHADCN-SWEEP (this group's slice)** — CONFIRMED no-op for custom/{dock,controls,pager-dots,tabs,scrolling-text,search,infinite-scroll,sortable-list,spa-view}: zero residual reka/shadcn default FORM. No per-component abrogation wave needed
  - [major] **BE.W-DESHADCN-GATE (this group's enrollment)** — The regression-lock gate (proof:de-shadcn / extended proof:glass-cohesion) SHOULD enroll this group's class-emitter surfaces so a FUTURE re-introduction of a flat bg-accent/bg-popover/border-input/def
  - [minor] **BE-OBSERVE: <Badge variant=secondary> in FuzzySearch** — Cross-band: the FuzzySearch type-label chip composes ui/badge's `secondary` variant (bg-secondary/text-secondary-foreground). Tokens are OURS but the variant LOOK is shadcn-flavored. NOT a charge agai

## ds-containers — DE-SHADCN FORM AUDIT of custom/{configurator, confirm-dialog, expandable-container, glass-panel, header-ribbon, instrument-chassis, paper-backdrop, hover-popover, icon-tooltip, fading-scroll, deck}
- **summary:** This component group is OVERWHELMINGLY de-shadcn'd already — the prior BA/BC surface-axis + dialog-glass + overlay-uniform waves swept the big offenders (ConfirmDialog onto Dialog surface=glass, ExpandableContainer/GlassPanel onto the surface-axis, IconTooltip/HoverPopover onto glass-reveal). 7 of 11 components are CLEAN. The residue is SMALL and concentrated: (1) hover-popover.css carries DEAD shadcn-token fallbacks (var(--popover,white)/var(--popover-foreground,...)/var(--border,transparent)) behind the glass pri
  - [minor] **BE.W-DESHADCN-SWEEP (this group's slice)** — ONE wave covers the entire ds-containers residue — no per-component waves. Items: (1) hover-popover.css — delete the dead shadcn-token fallbacks var(--popover,white)/var(--popover-foreground,...)/var(
  - [major] **BE.W-DESHADCN-GATE (proof:de-shadcn) coverage for this group** — The regression-lock gate must flag, for this group: a dead shadcn-token fallback (var(--popover/--accent/--input,...)) in a sidecar CSS, a bare --radius-md/lg/sm/xl on a floating-glass overlay surface
  - [major] **BE.W-GLASS-CONTROL (CONSUME, not a ds-containers abrogation)** — ExpandableContainer's two corner affordance buttons (line 15/67) are the canonical consumer for the SEED's band-6 floating circular-glass button — when GlassControl/GlassControlButton lands, the hand-

## DE-SHADCN FORM audit — procedural-viz group: custom/{aurora, goo-blob, constellation, fourier-field, concentric, dot-flow-field, dot-matrix, goo-dot-matrix, paper-grid, watercolor-dot}
- **summary:** All 10 components are CLEAN. This group carries ZERO residual shadcn/reka default FORM — by construction, not by remediation. These are net-new bespoke generative-viz primitives: 9 are <canvas>-rooted (WebGL/WebGPU/Canvas2D) with a thin host <div> wrapper, and the 10th (WatercolorDot) is a CSS/SVG blob. There is NO reka-ui import, NO CVA, NO shadcn FORM token (bg-popover/bg-accent/border-input/ring-ring/focus-visible:ring/default-palette/bare-radius) anywhere in the group's vue/ts/css source — grep returns empty ac
  - [minor] **BE.W-DESHADCN-SWEEP (group exemption)** — The procedural-viz group needs NO abrogation wave. Confirm BE.W-DESHADCN-SWEEP's per-component pass SKIPS custom/{aurora,goo-blob,constellation,fourier-field,concentric,dot-flow-field,dot-matrix,goo-d
  - [minor] **BE.W-DESHADCN-GATE (named allowlist entry)** — Enroll this 10-component group as a NAMED clean-by-construction exemption in proof:de-shadcn's allowlist (the proof:no-gray KEEP-NEUTRAL precedent), so the regression lock proves the group stays FORM-
  - [minor] **BE.W-DESHADCN-SWEEP (optional watercolor focus normalize)** — OPTIONAL, non-load-bearing: normalize button.watercolor-swatch:focus-visible (WatercolorDot.vue:364-370) onto the .focus-ring utility for library-wide focus consistency. Currently a sanctioned bespoke

## ds-motion-text — DE-SHADCN FORM audit of custom/{easing, typewriter, split-chars, handmark, border-progress, completion-seal, timeline}
- **summary:** Read all 7 component groups (every .vue + scoped/dedicated CSS + constants/barrels). This is a MOSTLY-CLEAN group — 5 of 7 components are CLEAN, and the residue is small and concentrated in ONE family (timeline). split-chars/handmark/border-progress/completion-seal are fully on our design language (structural-only or token-driven: --glass-*, --foreground, --surface-tint-*, --color-gold/--phase-complete-color, --focus-ring-shadow, --radius-pill, char-stagger). typewriter is CLEAN (its only color event — the interact
  - [major] **BE.W-DESHADCN-SWEEP (this group's share)** — ONE sweep item covers the entire 7-component group — no per-component wave warranted. Concrete edits: (1) MAJOR — ScrubberTimeline.vue .caret-value (127-132): re-point the opaque shadcn caret-tooltip 
  - [minor] **BE.W-DESHADCN-GATE (this group's clause)** — proof:de-shadcn must red on a re-introduced OPAQUE background:var(--popover)/var(--card) flat-plate caret/tooltip FORM (the ScrubberTimeline class) when the canonical register is glass-reveal — i.e. t

## df-topology
- **summary:** The dock-fission/goo-split hallmark is fully designable on the EXISTING substrate with ZERO new engine — the four pieces are all on disk: (1) the ONE SpringProgress + inheriting --dock-morph-t scalar (dockMorphContext.ts / useDockOrientationMorph.ts) is the clock; (2) the CSS-SVG-goo bridge (morph-bridge.css + the feGaussianBlur stdDev=7 + feColorMatrix "0 0 0 20 -9" threshold authored in morph-showcase.vue:242-257) is the metaball substrate, Safari-safe (filter:url() works in WebKit); (3) ElementMorph + springTimi
  - [critical] **BE.W-DOCK-FISSION** — useDockFission + <DockSplit>/<DockFissionPiece> + the N-seam goo bridge (fission-bridge.css generalizing morph-bridge.css from merge-to-one to detach-N-toward-slots) + the ONE SpringProgress writing -
  - [major] **BE.W-METABALL-BRIDGE2** — The general N-seam stretch-and-snap as a reusable sub-primitive of the fission bridge — per-seam --neck-t (thins as the piece separates, snap-back overshoot via useLiquidFlex --stretch), the goo plate
  - [minor] **BE.W-DOCK-FISSION-WEBGL-TIER** — BOOKED successor (NOT this cut): the goo-blob smin metaball field (metaball.frag.ts sceneDistG/sminG) as the high-fidelity upgrade-tier goo substrate over the CSS-SVG floor, gated on a recorded real-M

## df-context — the context→silhouette state machine + the NOW-PLAYING PILL (`<DockNowPlaying>`)
- **summary:** The iOS-27 hallmark is a dock that RECONFIGURES ITS WHOLE SILHOUETTE per context — bar (f_002, 5-tab) ↔ bar+pill (f_055, 5-tab + media pill above) ↔ split{pill,circles} (f_021/f_038/f_040, three free-floating goo-split pieces: music-chip circle · center now-playing pill · search circle) ↔ search field. glass-ui has every substrate but has WIRED NONE of it: today `useContextualDockLayers(route)` only swaps a `<DockStack>` rail facet-set + pane content (`proof:dock-contextual-layers` W1/W2 lock that), and `useDockSta
  - [critical] **BE.W-DOCK-CONTEXT-SILHOUETTE** — Mint `useDockContextSilhouette` (library, /dock) reading a declarative `DockSilhouetteDescriptor[]` map (constants.ts types) → drives the control-SET morph (FLIP survivors via ElementMorph+springTimin
  - [critical] **BE.W-DOCK-NOWPLAYING-PILL** — `<DockNowPlaying>` (library, /dock subpath + barrel) — the media pill: a leading circular art-chip (#art slot, optional usePointerVelocityField parallax) + a `<ScrollingText>` title (byte-reuse, hover
  - [major] **BE.W-DOCK-CONTEXT-GATE** — Extend `proof:dock-contextual-layers` IN PLACE (no new key for the contextual seam) with the silhouette clauses C1-C7: primitive-exists-once + colocation/subpath surface; form-change drives `--dock-mo

## df-rail
- **summary:** The rail is the user's named regression: AZ.W-RAIL3 built a deliberate iOS-27 contextual context-strip (DockRail/DockRailItem — a floating tinted-glass facet carousel fanned against a visible connective hairline anchored to a measured `<DockSeparator anchor>` divider seam, overrunning both dock edges, box-INVIOLATE), then BC.W-DOCK-STACK-RAIL CLEAN-BROKE it to a macOS hover-fan stack (`DockStack`/`DockStackItem`, stack-rail.css; commit 0aa16913). The macOS metaphor is the WRONG language — it's a desktop hover-stack
  - [critical] **BE.W-DOCK-RAIL-REALIZE** — Re-mint <DockRail>/useDockRail as the iOS-27 floating tinted-glass facet carousel (the RESTING mode), reconciling the AZ.W-RAIL3 divider-seam silhouette + the DockStack hover-fan (re-skinned as member
  - [major] **BE.W-DOCK-RAIL-JUBILANCE** — The jubilant fan personality: per-facet --spring-bouncy overshoot stagger on fan-open, the goo-neck specular sweep (--specular-angle on detach via useSpecularPointer), the magnetic-snap settle (~+7% o
  - [critical] **BE.W-DOCK-RAIL-GATE** — proof:dock-rail (the reconcile lock superseding proof:rail3/proof:dock-stack-rail/the proof:dock-sections rail clauses): R1 the facets render OUT of the dock body, box INVIOLATE via the .glass-dock-fr
  - [minor] **BE.W-DOCK-RAIL-DOC-RECONCILE** — Rewrite the STALE CLAUDE.md rail canon: the §DockRail divider-carousel section (documents the RETIRED <DockRail items/entries/extent> + proof:rail3 as live), the §BB.W-DOCK-RAIL-SEAT-FINAL + W-DOCK-SE

## sf-lensing — the Safari-safe edge-LENSING substrate (BE.W-LENS-SAFARI)
- **summary:** Safari 26 does NOT support `backdrop-filter: url(#filter)` with feDisplacementMap (WebKit bug 245510, OPEN; confirmed cross-engine by MDN BCD #24110 + kube.io/ekino/LogRocket SOTA). glass-ui's `.glass-lens` is the Chromium-only displacement filter, hard-gated behind `@supports (backdrop-filter: url("#glass-refract"))` (glass-refract.css:106); on Safari it degrades to the bare `--glass-blur-resting` blur+tint base — which reads FLAT, no rim-refraction concentration. That is the SOTA web default ("Safari automaticall
  - [critical] **BE.W-LENS-SAFARI** — Mint .glass-lens as a two-tier register: the cross-engine FLOOR (directional rim + conic --specular-angle edge-glint + --glass-edge-dispersion chromatic fringe folded-in + a NEW Safari-native backdrop
  - [major] **BE.W-LENS-SAFARI-GUARD** — Harden the .glass-lens @supports so a false-positive 'backdrop-filter: url() supported' on a partial WebKit can never STRIP the working floor blur — keep the floor fully OUTSIDE the gate (the displace
  - [major] **BE.W-LENS-PRISM** — The bounded chromatic-aberration rim as a tunable axis — promote the already-shipped --glass-edge-dispersion warm/cool oklab fringe (glass-fx.css:223) from the opt-in .glass-chromatic into a first-cla

## sf-goo — the dock-fission goo budget + the Safari goo substrate decision
- **summary:** SHIP DECISION: the deterministic SVG-goo (`filter: url()` feGaussianBlur→feColorMatrix-threshold→feComposite-atop on the plate's OWN alpha) is the FLOOR for dock-fission — NOT a perf-gated preview behind a VT-fall like morph-showcase. The goo-split is Safari-safe BY CONSTRUCTION and budget-clearing where the V↔H morph was not, because it dodges BOTH cost sources that sank arm-a at AZ. The morph-showcase MISS (`p50 13.7-15.1ms`, never 0% over 16.7ms under 4× throttle) was a per-frame `feGaussianBlur` over a LARGE ~1
  - [critical] **BE.W-GOO-SPLIT-PERF (→ proof:dock-goo-split)** — the budget gate + π: device-free SOURCE (G1-G4: one-scalar / filter:url()-not-backdrop-filter:url() / compositor-reserved-footprint / clipped-filter-region) + the binding rAF frame-series π on the web
  - [critical] **BE.W-DOCK-FISSION (the goo substrate clause)** — SHIP the deterministic SVG-goo as the FLOOR (not a VT-fall, not a preview-toggle) — generalize morph-bridge.css from 2-plate-merge to N-piece-detach-toward-targets; per-piece --split-t off the ONE Spr
  - [major] **BE.W-METABALL-BRIDGE2 (the N-seam substrate)** — the general N-seam stretch-and-snap shares the SAME filter:url() goo + the clipped-region/contain:paint budget discipline; per-seam --neck-t + the useLiquidFlex snap-overshoot ride --stretch; the goo 
  - [major] **BE.W-VIZ-PARITY-METAL (the goo-split row — absorb BD)** — the dock-goo-split bridge JOINS the real-Metal-GPU π roster row beside goo-blob+aurora (the binding number is real-WebKit + real-Metal, NOT SwiftShader — the AZ Chromium-ANGLE-only measurement is insu

## vg-skeleton (VALIDATE + DEDUP the BE SEED skeleton vs the 131-wave pass-1 gap map)
- **summary:** The 10-band skeleton is STRUCTURALLY SOUND and captures every CRITICAL+MAJOR gap from the 131-wave map; the dock-fission dedup (~10 goo-split proposals → BE.W-DOCK-FISSION) and the namespace-collapse intent are correct. BUT the skeleton rests on FOUR stale premises that change the build, not just the doc: (1) `useContextualDockLayers` — the seam SIX gap-map lenses say to "extend/generalize" — does NOT EXIST (README-only, src/components/custom/dock/README.md; no real composable). The contextual-morph wave (BE.W-DOCK
  - [critical] **BE.W-DOCK-FISSION** — Band1 — dedups ~10 goo-split aliases (BD/BE×5/AUD/DH/RAIL prefixes) → ONE. useDockFission/<DockSplit> + detach-N-toward-targets metaball bridge generalizing morph-bridge.css (merge-only today, 159L), 
  - [critical] **BE.W-DOCK-CONTEXT-SILHOUETTE** — Band1 — CORRECTION: from-scratch MINT (useContextualDockLayers is README-only, does NOT exist). route/state→silhouette resolver (bar|bar+pill|split{pill,circles}) the ONE orchestrator reads + FLIP of 
  - [critical] **BE.W-DOCK-NOWPLAYING-PILL** — Band1 — net-new (zero now-playing/transport surfaces exist). art-chip + ScrollingText title (shipped) + live transport, tappable-while-collapsed; the split's center piece.
  - [critical] **BE.W-DOCK-RAIL-REALIZE** — Band1 — re-instate the AZ.W-RAIL3 floating-carousel (BUILT then REGRESSED per plan-rail-full). NAME the real DockStack.vue/stack-rail.css (CLAUDE.md says DockRail/rail-extend.css — STALE). Reconcile w
  - [major] **BE.W-METABALL-BRIDGE2** — Band1 — general N-seam stretch-and-snap (per-seam --neck-t, snap-back via useLiquidFlex). Folds with FISSION (shared substrate); keep distinct only if the N-seam math is its own deliverable.
  - [critical] **BE.W-DOCK-TINTED-CHIP / BE.W-TINTED-CHIP** — Band1+Band2 — net-new --glass-fill-tint/--glass-fill-strength plate-bg axis (zero today), DISTINCT from the shipped rim --glass-accent. Maps facet-chip face + bronze/gold metal quad (shipped). The doc
  - [critical] **BE.W-LENS-SAFARI** — Band2 — cross-engine edge-lensing floor (layered radial/conic + saturate/contrast rim, NO backdrop-filter:url()). Real gap (the lens is @supports-gated today). Pairs with the existing LENS-SAFARI-GUAR
  - [critical] **BE.W-SHEET-TRANSLUCENT** — Band2 — new --glass-opacity-sheet ~0.74 between dialog 0.68 (glass.css:181) and overlay 0.95. Drawer/Sheet onto backdrop-through + mask-feathered crown. Genuine.
  - [major] **BE.W-LENS-PRISM** — Band2 — DOWNGRADE: WIRING not minting (--glass-edge-dispersion EXISTS glass-fx.css:223, already used surfaces.css:398). Bounded chromatic-aberration rim onto the lens. Real but small.
  - [major] **BE.W-DEEP-CEILING** — Band2 — the long-booked glass-deep 18-20px successor (DUPE of BD.W-DEEP-PUSH). Behind a recorded throttle number. One wave.
  - [major] **BE.W-DOCK-TAB-BAR + BE.W-TAB-IOS-PLATE** — Band3 — FOLD: both are the iOS recessed-accent-capsule register (one on <DockTabBar>, one on SegmentedTabs). ONE wave, dock-vs-segmented arms, composing the shipped useTabIndicator+useLiquidFlex.
  - [critical] **BE.W-AUR-SATIN** — Band4 — dedups W-AUR-SATIN/AUR.W-SATIN-FOLD/AUR-W-SATIN-WGSL. medium:satin uMedium==8 WebGL2+WGSL (WGSL folds in, not a separate wave). Real gap (no satin medium today).
  - [critical] **BE.W-AUR-PRISM** — Band4 — dedups W-AUR-PRISM/AUR-W-PRISM-BURST/BD.W-AUR-BURST. burst mode, angular palette sampling around uFlowFocal. + BE.W-AUR-PRESETS (demo, presets-in-consumers) as a minor rider.
  - [critical] **BE.W-BLOOM-UP** — Band5 — dedups BD.W-BLOOM-UP/BD.W-CARD-BLOOM-FLIP/DH.W-DOCK-BLOOM-FULLSCREEN/BE.W-CARD-BLOOM-EXPAND. useBloomUp(sourceRef,destRef) shared-element FLIP composing the SHIPPED ElementMorph+springTimingFu
  - [critical] **BE.W-ICONCHIP-GLASS** — Band6 — REAL gap (icon-chip.css has NO backdrop-filter). glass register (frosted disc + tone tint, backdrop reads through) + filled opaque-tone-disc (auto-contrast glyph via value.js safeAccentColor).
  - [major] **BE.W-GLASS-CONTROL** — Band6 — <GlassControl shape=circle|pill> subpath /glass-control, the .dock-icon-button material lifted off the dock context. + BE.W-SEARCH-WELL (minor) rides it.
  - [major] **BE.W-DESHADCN-SWEEP** — Band9 — RE-SCOPE: real work is the custom/ band (49 dirs the existing ui/-only gate never walked) + closing the 4 BC born-RED residuals if their owning waves (BUTTON-GLASS-IOS/CONTROL-SMOOTH) left the
  - [major] **BE.W-DESHADCN-GATE** — Band9 — DOWNGRADE critical→major: proof:no-shadcn-default ALREADY EXISTS (BC.W-DESHADCN, package.json:959, born-RED, 404L, ui/-only). BE delta = widen walk to src/components/custom/** + the binding π 
  - [major] **BE.W-SAFARI-CAPTURE / BE.W-SAFARI-LIQUID-AUDIT** — Band7 — RE-SCOPE: the webkit Playwright project EXISTS (playwright.config.ts:117, safari-webgl.spec.ts enrolled). Delta = testMatch-WIDEN to the new liquid specs (fission/pill/bloom/rail) + born-RED p
  - [major] **BE.W-DOCK-JUBILANCE + Band8 standalone (CELEBRATE-BURST/HAPTIC-COUPLE/ANTICIPATE/ALIVE-IDLE)** — Band1+Band8 — 84 jubilance ideas correctly folded INTO owning band waves + a standalone-primitive band 8. Sound. Pass 2 selects+sites the per-band delight; celebrate-burst/haptic are the genuine stand
  - [major] **Band10 absorb (FOLD-LEDGER/VIZ-PARITY-METAL/GESTALT-ROSTER-BE/DISPOSITION-RESTAMP)** — Band10 — the no-silent-drop machine + BD absorb. Every band-10 row traces to a real BD ledger (docs/tranches/BD/FOLD-LEDGER.md confirmed present). No orphan. Sound.

## vg-gates
- **summary:** Designed the BE GATE SET — the BC anti-disease paint discipline applied to the iOS-27/dock-hallmark/de-shadcn tranche. Every headline wave gets a three-part gate: (a) device-free SOURCE clauses (born-RED on HEAD, GREEN at build, the proof-no-gray/proof-completion-seal house pattern — comment-strip + pure detector + N-bite self-test), (b) a binding π (paint-delta + gestalt verdict, both modes, Safari-captured where liquid — via the existing tests-visual webkit project + the reflect-capture-verify leaf), (c) the proo
  - [critical] **BE.W-DESHADCN-GATE → proof:de-shadcn** — INVENTORY-COMPLETE walk over all 92 packages (43 ui + 49 custom); reds on ANY default reka/shadcn FORM token (bg-popover/bg-accent/bg-muted/bg-secondary/bg-background/border-input/ring-ring) off a san
  - [critical] **BE.W-DOCK-FISSION → proof:dock-fission** — F1-F6 + π + roster row. useDockFission/DockSplit exists once; ONE --dock-split-t @property scalar; morph-bridge.css generalized merge-to-center→detach-N-toward-targets (Safari-safe filter:url); compos
  - [critical] **BE.W-DOCK-NOWPLAYING-PILL → proof:nowplaying-pill** — N1-N5 + π. media-pill collapsed register on the ONE morph scalar; composes ScrollingText+transport+useDockCtaReceive (no re-fork); tappable-while-collapsed; PRM-static idle. Born-RED: no media-pill re
  - [critical] **BE.W-DOCK-RAIL → proof:dock-rail-realize (extend proof:rail3)** — R1-R5 + π. box-INVIOLATE + divider-seam anchor restored + dual-overrun + contextual-switch on the ONE goo-bridge (reconciled with DockSplit, no second goo) + per-chip --glass-accent. Born-RED: rail re
  - [critical] **BE.W-DOCK-CONTEXT → proof:dock-context** — C1-C4 + π. declarative context→silhouette map; surviving controls FLIP to new slots; ONE registry no-shadow. Born-RED: no silhouette-resolve at HEAD
  - [critical] **BE.W-LENS-SAFARI → proof:lensing-safari + proof:safari-liquid (extend proof:lensing + the webkit testMatch)** — LS1-LS4 + π. harden glass-refract.css:106 @supports so Safari never loses the blur; cross-engine edge-lensing READ (no backdrop-filter:url); widen webkit testMatch to the 5 liquid specs. Born-RED: the
  - [critical] **BE.W-BLOOM-UP → proof:bloom-up** — B1-B5 + π. useBloomUp on /motion (off root barrel); composes kf ElementMorph forward + springTimingFunction; 3 coupled channels (scale/opacity/blur-decongest); Safari-safe+PRM-snap. Born-RED: primitiv
  - [critical] **BE.W-ICONCHIP-GLASS → proof:iconchip-glass (extend proof:icon-chip)** — IG1-IG4 + π. glass register (backdrop-filter disc + oklab tone-tint) + filled register (opaque tone + safeAccentColor auto-contrast); additive disjoint axes. Born-RED VERIFIED: icon-chip.css has NO ba
  - [critical] **BE.W-AUR-SATIN + BE.W-AUR-PRISM → proof:aur-satin + proof:aur-prism** — S1-S4/P1-P4 + π. opt-in uMedium==8 satin (fold-sheen) / ==9 prism (angular burst), default-byte-identical, GL-fence + WGSL-lockstep (aurora.wgsl untouched, degrades to smooth); the proof:aur-kuwahara 
  - [critical] **BE.W-GESTALT-ROSTER-BE → proof:ba-gestalt grow** — REQUIRED_SURFACES +9 rows (dock-fission/nowplaying-pill/dock-rail/dock-context/card-bloom/iconchip-glass/aurora-satin/aurora-prism/lens-safari); be-gestalt-roster.md born-FAIL anchored to HEAD ground;
  - [major] **BE.W-TINTED-CHIP / SHEET-TRANSLUCENT gates (proof:glass-fill-tint, proof:sheet-translucent)** — the --glass-fill-tint/--glass-fill-strength disjoint axis (distinct from --glass-accent rim) + --glass-opacity-sheet (~0.74) gates; born-RED VERIFIED (both tokens absent at HEAD); the proof:glass-acce
  - [major] **BE.W-SAFARI-CAPTURE gate (proof:safari-liquid binding π)** — the webkit Playwright project (tests-visual/playwright.config.ts:117, already exists) drives the 5 liquid routes; the cross-engine binding π; the support-matrix; degrade-gracefully assert per transiti

## vg-jubilance
- **summary:** The 84 jubilance ideas collapse to ~26 distinct delights across 5 named groups, each siteable onto an OWNING BE wave (the SEED's 35 waves carry them; the dock-band waves are the dense home). Every delight is compositor-only (transform/opacity/filter/--*-t custom props) AND PRM-safe by an existing house idiom — there is NO disco residue, all sparkle/✦/grain is retired+fenced (src/styles/utilities/metal.css:33, icon-chip.css:129). The FLOOR-vs-OPT-IN split is the load-bearing axis: ~6 are FLOORS (always-on sub-percep
  - [critical] **BE.W-DOCK-FISSION** — Owns the goo-split snap-recoil + neck-wobble + bud-off parent-squish delights (the hallmark); the N-piece fission topology off ONE --dock-split-t. ~8 jubilance ideas.
  - [major] **BE.W-METABALL-BRIDGE2** — Owns the neck specular sweep FLOOR + the N-seam stretch-and-snap --neck-t; the goo material composing glass-floating registers. ~3 ideas.
  - [major] **BE.W-DOCK-JUBILANCE** — The cross-cutting dock-delight wave: fission ripple, merge-splash gold-coalesce, magnetic tendril/seam-tension (perf-gate the speculative ones). ~6 ideas.
  - [major] **BE.W-DOCK-TINTED-CHIP** — Owns per-satellite/per-facet accent-hue FLOOR (binds --glass-accent per datum) + the bloom-its-hue-on-press OPT-IN. ~4 ideas.
  - [critical] **BE.W-DOCK-NOWPLAYING-PILL** — Owns the SF-symbol play↔pause morph + the album-thumb parallax FLOOR + the pill-collapse bounce. ~4 ideas.
  - [critical] **BE.W-BLOOM-UP** — Owns the album overshoot-settle FLOOR + the parallax-tilt FLOOR + the audacious-gravity big-move. ~6 ideas.
  - [major] **BE.W-BACKDROP-SETTLE** — Owns the per-channel color-bloom (desaturate→saturate coupled blur) + the glass-absorbs-the-room ambient. ~2 ideas.
  - [critical] **BE.W-DOCK-TAB-BAR** — Owns the icon-bloom-on-select FLOOR + the accent-suffuse-sweep OPT-IN (signature) + the capsule goo-pull. ~6 ideas.
  - [major] **BE.W-TAB-IOS-PLATE** — Owns the per-tab accent-recolor FLOOR + the recessed-glass-capsule register + the micro-personality one-shots. ~4 ideas.
  - [critical] **BE.W-AUR-SATIN** — Owns the satin sheen-on-play + pointer-as-key-light FLOOR + the flick-burst fold ripple. ~5 ideas.
  - [critical] **BE.W-AUR-PRISM** — Owns the prism-burst celebration + album-hue-seeded burst (the kaleidoscopic spoke-fan). ~3 ideas.
  - [major] **BE.W-AUR-PRESETS** — Owns the aurora-leans-to-active-control FLOOR (the DockStage consumer seam, presets-in-consumers). ~2 ideas.
  - [minor] **BE.W-ALIVE-IDLE** — Owns the breathing-pill idle FLOOR (±1.5% micro-pulse, slow clock, offscreen-paused). ~2 ideas.
  - [major] **BE.W-HAPTIC-COUPLE** — Owns the haptic detent tick OPT-IN (useHaptic, navigator.vibrate — net-new, verified absent). ~1 idea.
  - [major] **BE.W-CELEBRATE-BURST** — Owns the earned glass-shard/petal bloom OPT-IN (useCelebrationBurst — net-new, verified absent) + the chip-bloom-in cascade. ~3 ideas.
  - [minor] **BE.W-ANTICIPATE-FOLLOW** — Owns the anticipation dip + follow-through neighbor-lag + contextual-reflow personality. ~3 ideas.
  - [critical] **BE.W-LENS-SAFARI** — Absorbs the rest-rim FLOOR (always-on bright top-edge specular, distinct from the pointer disc). ~1 idea.
  - [major] **BE.W-DOCK-JUBILANCE-GATE** — PROPOSED NEW: proof:jubilance asserting every sited delight is compositor-only + PRM-safe (FLOOR-gated|OPT-IN-snapped) + disco-fenced. The D5 jubilance machine-lock.


---
# PASS-2 WAVE ROLL-UP

**37 critical · 38 major · 13 minor**

- [critical] BE.W-DESHADCN-GATE — Confirms the gate is an EXTENSION of the existing proof:no-shadcn-default (proof-no-shadcn-default.mjs), NOT a net-new g
- [critical] BE.W-DOCK-FISSION — useDockFission + <DockSplit>/<DockFissionPiece> + the N-seam goo bridge (fission-bridge.css generalizing morph-bridge.cs
- [critical] BE.W-DOCK-CONTEXT-SILHOUETTE — Mint `useDockContextSilhouette` (library, /dock) reading a declarative `DockSilhouetteDescriptor[]` map (constants.ts ty
- [critical] BE.W-DOCK-NOWPLAYING-PILL — `<DockNowPlaying>` (library, /dock subpath + barrel) — the media pill: a leading circular art-chip (#art slot, optional 
- [critical] BE.W-DOCK-RAIL-REALIZE — Re-mint <DockRail>/useDockRail as the iOS-27 floating tinted-glass facet carousel (the RESTING mode), reconciling the AZ
- [critical] BE.W-DOCK-RAIL-GATE — proof:dock-rail (the reconcile lock superseding proof:rail3/proof:dock-stack-rail/the proof:dock-sections rail clauses):
- [critical] BE.W-LENS-SAFARI — Mint .glass-lens as a two-tier register: the cross-engine FLOOR (directional rim + conic --specular-angle edge-glint + -
- [critical] BE.W-GOO-SPLIT-PERF (→ proof:dock-goo-split) — the budget gate + π: device-free SOURCE (G1-G4: one-scalar / filter:url()-not-backdrop-filter:url() / compositor-reserve
- [critical] BE.W-DOCK-FISSION (the goo substrate clause) — SHIP the deterministic SVG-goo as the FLOOR (not a VT-fall, not a preview-toggle) — generalize morph-bridge.css from 2-p
- [critical] BE.W-DOCK-FISSION — Band1 — dedups ~10 goo-split aliases (BD/BE×5/AUD/DH/RAIL prefixes) → ONE. useDockFission/<DockSplit> + detach-N-toward-
- [critical] BE.W-DOCK-CONTEXT-SILHOUETTE — Band1 — CORRECTION: from-scratch MINT (useContextualDockLayers is README-only, does NOT exist). route/state→silhouette r
- [critical] BE.W-DOCK-NOWPLAYING-PILL — Band1 — net-new (zero now-playing/transport surfaces exist). art-chip + ScrollingText title (shipped) + live transport, 
- [critical] BE.W-DOCK-RAIL-REALIZE — Band1 — re-instate the AZ.W-RAIL3 floating-carousel (BUILT then REGRESSED per plan-rail-full). NAME the real DockStack.v
- [critical] BE.W-DOCK-TINTED-CHIP / BE.W-TINTED-CHIP — Band1+Band2 — net-new --glass-fill-tint/--glass-fill-strength plate-bg axis (zero today), DISTINCT from the shipped rim 
- [critical] BE.W-LENS-SAFARI — Band2 — cross-engine edge-lensing floor (layered radial/conic + saturate/contrast rim, NO backdrop-filter:url()). Real g
- [critical] BE.W-SHEET-TRANSLUCENT — Band2 — new --glass-opacity-sheet ~0.74 between dialog 0.68 (glass.css:181) and overlay 0.95. Drawer/Sheet onto backdrop
- [critical] BE.W-AUR-SATIN — Band4 — dedups W-AUR-SATIN/AUR.W-SATIN-FOLD/AUR-W-SATIN-WGSL. medium:satin uMedium==8 WebGL2+WGSL (WGSL folds in, not a 
- [critical] BE.W-AUR-PRISM — Band4 — dedups W-AUR-PRISM/AUR-W-PRISM-BURST/BD.W-AUR-BURST. burst mode, angular palette sampling around uFlowFocal. + B
- [critical] BE.W-BLOOM-UP — Band5 — dedups BD.W-BLOOM-UP/BD.W-CARD-BLOOM-FLIP/DH.W-DOCK-BLOOM-FULLSCREEN/BE.W-CARD-BLOOM-EXPAND. useBloomUp(sourceRe
- [critical] BE.W-ICONCHIP-GLASS — Band6 — REAL gap (icon-chip.css has NO backdrop-filter). glass register (frosted disc + tone tint, backdrop reads throug
- [critical] BE.W-DESHADCN-GATE → proof:de-shadcn — INVENTORY-COMPLETE walk over all 92 packages (43 ui + 49 custom); reds on ANY default reka/shadcn FORM token (bg-popover
- [critical] BE.W-DOCK-FISSION → proof:dock-fission — F1-F6 + π + roster row. useDockFission/DockSplit exists once; ONE --dock-split-t @property scalar; morph-bridge.css gene
- [critical] BE.W-DOCK-NOWPLAYING-PILL → proof:nowplaying-pill — N1-N5 + π. media-pill collapsed register on the ONE morph scalar; composes ScrollingText+transport+useDockCtaReceive (no
- [critical] BE.W-DOCK-RAIL → proof:dock-rail-realize (extend proof:rail3) — R1-R5 + π. box-INVIOLATE + divider-seam anchor restored + dual-overrun + contextual-switch on the ONE goo-bridge (reconc
- [critical] BE.W-DOCK-CONTEXT → proof:dock-context — C1-C4 + π. declarative context→silhouette map; surviving controls FLIP to new slots; ONE registry no-shadow. Born-RED: n
- [critical] BE.W-LENS-SAFARI → proof:lensing-safari + proof:safari-liquid (extend proof:lensing + the webkit testMatch) — LS1-LS4 + π. harden glass-refract.css:106 @supports so Safari never loses the blur; cross-engine edge-lensing READ (no b
- [critical] BE.W-BLOOM-UP → proof:bloom-up — B1-B5 + π. useBloomUp on /motion (off root barrel); composes kf ElementMorph forward + springTimingFunction; 3 coupled c
- [critical] BE.W-ICONCHIP-GLASS → proof:iconchip-glass (extend proof:icon-chip) — IG1-IG4 + π. glass register (backdrop-filter disc + oklab tone-tint) + filled register (opaque tone + safeAccentColor au
- [critical] BE.W-AUR-SATIN + BE.W-AUR-PRISM → proof:aur-satin + proof:aur-prism — S1-S4/P1-P4 + π. opt-in uMedium==8 satin (fold-sheen) / ==9 prism (angular burst), default-byte-identical, GL-fence + WG
- [critical] BE.W-GESTALT-ROSTER-BE → proof:ba-gestalt grow — REQUIRED_SURFACES +9 rows (dock-fission/nowplaying-pill/dock-rail/dock-context/card-bloom/iconchip-glass/aurora-satin/au
- [critical] BE.W-DOCK-FISSION — Owns the goo-split snap-recoil + neck-wobble + bud-off parent-squish delights (the hallmark); the N-piece fission topolo
- [critical] BE.W-DOCK-NOWPLAYING-PILL — Owns the SF-symbol play↔pause morph + the album-thumb parallax FLOOR + the pill-collapse bounce. ~4 ideas.
- [critical] BE.W-BLOOM-UP — Owns the album overshoot-settle FLOOR + the parallax-tilt FLOOR + the audacious-gravity big-move. ~6 ideas.
- [critical] BE.W-DOCK-TAB-BAR — Owns the icon-bloom-on-select FLOOR + the accent-suffuse-sweep OPT-IN (signature) + the capsule goo-pull. ~6 ideas.
- [critical] BE.W-AUR-SATIN — Owns the satin sheen-on-play + pointer-as-key-light FLOOR + the flick-burst fold ripple. ~5 ideas.
- [critical] BE.W-AUR-PRISM — Owns the prism-burst celebration + album-hue-seeded burst (the kaleidoscopic spoke-fan). ~3 ideas.
- [critical] BE.W-LENS-SAFARI — Absorbs the rest-rim FLOOR (always-on bright top-edge specular, distinct from the pointer disc). ~1 idea.
- [major] BE.W-DESHADCN-SWEEP-OVERLAYS — ONE wave covers the whole 12-component group (NOT 12 per-component waves — the SEED's per-component framing over-scopes 
- [major] BE.W-DESHADCN-GATE-WIDEN — DO NOT mint a net-new proof:de-shadcn — proof:no-shadcn-default ALREADY EXISTS (BC.W-DESHADCN) and is fully green. INSTE
- [major] BE.W-DESHADCN-SWEEP — ONE wave covers the whole 92-package de-shadcn sweep (per SEED Band 9); for THIS group it must add the Toggle residue: r
- [major] BE.W-DESHADCN-GATE — Harden proof:no-shadcn-default beyond its 8-token fixed list: (a) add a STATE-ARM clause so `data-[state=on]:bg-accent`/
- [major] BE.W-DESHADCN-GATE (extend proof:no-shadcn-default) — The existing gate's FORBIDDEN list has a resolution gap below the token-palette axis: it catches rounded-md but NOT roun
- [major] BE.W-DESHADCN-SWEEP — Confirms ONE sweep covers this group — the per-component re-points are ≤5 real files: (1) ToastClose.vue:24 destructive 
- [major] BE.W-DESHADCN-GATE (this group's enrollment) — The regression-lock gate (proof:de-shadcn / extended proof:glass-cohesion) SHOULD enroll this group's class-emitter surf
- [major] BE.W-DESHADCN-GATE (proof:de-shadcn) coverage for this group — The regression-lock gate must flag, for this group: a dead shadcn-token fallback (var(--popover/--accent/--input,...)) i
- [major] BE.W-GLASS-CONTROL (CONSUME, not a ds-containers abrogation) — ExpandableContainer's two corner affordance buttons (line 15/67) are the canonical consumer for the SEED's band-6 floati
- [major] BE.W-DESHADCN-SWEEP (this group's share) — ONE sweep item covers the entire 7-component group — no per-component wave warranted. Concrete edits: (1) MAJOR — Scrubb
- [major] BE.W-METABALL-BRIDGE2 — The general N-seam stretch-and-snap as a reusable sub-primitive of the fission bridge — per-seam --neck-t (thins as the 
- [major] BE.W-DOCK-CONTEXT-GATE — Extend `proof:dock-contextual-layers` IN PLACE (no new key for the contextual seam) with the silhouette clauses C1-C7: p
- [major] BE.W-DOCK-RAIL-JUBILANCE — The jubilant fan personality: per-facet --spring-bouncy overshoot stagger on fan-open, the goo-neck specular sweep (--sp
- [major] BE.W-LENS-SAFARI-GUARD — Harden the .glass-lens @supports so a false-positive 'backdrop-filter: url() supported' on a partial WebKit can never ST
- [major] BE.W-LENS-PRISM — The bounded chromatic-aberration rim as a tunable axis — promote the already-shipped --glass-edge-dispersion warm/cool o
- [major] BE.W-METABALL-BRIDGE2 (the N-seam substrate) — the general N-seam stretch-and-snap shares the SAME filter:url() goo + the clipped-region/contain:paint budget disciplin
- [major] BE.W-VIZ-PARITY-METAL (the goo-split row — absorb BD) — the dock-goo-split bridge JOINS the real-Metal-GPU π roster row beside goo-blob+aurora (the binding number is real-WebKi
- [major] BE.W-METABALL-BRIDGE2 — Band1 — general N-seam stretch-and-snap (per-seam --neck-t, snap-back via useLiquidFlex). Folds with FISSION (shared sub
- [major] BE.W-LENS-PRISM — Band2 — DOWNGRADE: WIRING not minting (--glass-edge-dispersion EXISTS glass-fx.css:223, already used surfaces.css:398). 
- [major] BE.W-DEEP-CEILING — Band2 — the long-booked glass-deep 18-20px successor (DUPE of BD.W-DEEP-PUSH). Behind a recorded throttle number. One wa
- [major] BE.W-DOCK-TAB-BAR + BE.W-TAB-IOS-PLATE — Band3 — FOLD: both are the iOS recessed-accent-capsule register (one on <DockTabBar>, one on SegmentedTabs). ONE wave, d
- [major] BE.W-GLASS-CONTROL — Band6 — <GlassControl shape=circle|pill> subpath /glass-control, the .dock-icon-button material lifted off the dock cont
- [major] BE.W-DESHADCN-SWEEP — Band9 — RE-SCOPE: real work is the custom/ band (49 dirs the existing ui/-only gate never walked) + closing the 4 BC bor
- [major] BE.W-DESHADCN-GATE — Band9 — DOWNGRADE critical→major: proof:no-shadcn-default ALREADY EXISTS (BC.W-DESHADCN, package.json:959, born-RED, 404
- [major] BE.W-SAFARI-CAPTURE / BE.W-SAFARI-LIQUID-AUDIT — Band7 — RE-SCOPE: the webkit Playwright project EXISTS (playwright.config.ts:117, safari-webgl.spec.ts enrolled). Delta 
- [major] BE.W-DOCK-JUBILANCE + Band8 standalone (CELEBRATE-BURST/HAPTIC-COUPLE/ANTICIPATE/ALIVE-IDLE) — Band1+Band8 — 84 jubilance ideas correctly folded INTO owning band waves + a standalone-primitive band 8. Sound. Pass 2 
- [major] Band10 absorb (FOLD-LEDGER/VIZ-PARITY-METAL/GESTALT-ROSTER-BE/DISPOSITION-RESTAMP) — Band10 — the no-silent-drop machine + BD absorb. Every band-10 row traces to a real BD ledger (docs/tranches/BD/FOLD-LED
- [major] BE.W-TINTED-CHIP / SHEET-TRANSLUCENT gates (proof:glass-fill-tint, proof:sheet-translucent) — the --glass-fill-tint/--glass-fill-strength disjoint axis (distinct from --glass-accent rim) + --glass-opacity-sheet (~0
- [major] BE.W-SAFARI-CAPTURE gate (proof:safari-liquid binding π) — the webkit Playwright project (tests-visual/playwright.config.ts:117, already exists) drives the 5 liquid routes; the cr
- [major] BE.W-METABALL-BRIDGE2 — Owns the neck specular sweep FLOOR + the N-seam stretch-and-snap --neck-t; the goo material composing glass-floating reg
- [major] BE.W-DOCK-JUBILANCE — The cross-cutting dock-delight wave: fission ripple, merge-splash gold-coalesce, magnetic tendril/seam-tension (perf-gat
- [major] BE.W-DOCK-TINTED-CHIP — Owns per-satellite/per-facet accent-hue FLOOR (binds --glass-accent per datum) + the bloom-its-hue-on-press OPT-IN. ~4 i
- [major] BE.W-BACKDROP-SETTLE — Owns the per-channel color-bloom (desaturate→saturate coupled blur) + the glass-absorbs-the-room ambient. ~2 ideas.
- [major] BE.W-TAB-IOS-PLATE — Owns the per-tab accent-recolor FLOOR + the recessed-glass-capsule register + the micro-personality one-shots. ~4 ideas.
- [major] BE.W-AUR-PRESETS — Owns the aurora-leans-to-active-control FLOOR (the DockStage consumer seam, presets-in-consumers). ~2 ideas.
- [major] BE.W-HAPTIC-COUPLE — Owns the haptic detent tick OPT-IN (useHaptic, navigator.vibrate — net-new, verified absent). ~1 idea.
- [major] BE.W-CELEBRATE-BURST — Owns the earned glass-shard/petal bloom OPT-IN (useCelebrationBurst — net-new, verified absent) + the chip-bloom-in casc
- [major] BE.W-DOCK-JUBILANCE-GATE — PROPOSED NEW: proof:jubilance asserting every sited delight is compositor-only + PRM-safe (FLOOR-gated|OPT-IN-snapped) +
- [minor] BE.W-DESHADCN-SWEEP (nuance arm) — OPTIONAL strict-creed: re-point the slider spectrum FALLBACK defaults (Slider.vue:373 --background→--card thumb-border; 
- [minor] BE.W-DESHADCN-SWEEP (this group's slice) — Re-point the 2 GENUINE residual FORM items: (1) GlassCarouselPager.vue:116 counter → .glass-pager-ring (delete bg-card/b
- [minor] BE.W-DESHADCN-SWEEP (this group's slice) — CONFIRMED no-op for custom/{dock,controls,pager-dots,tabs,scrolling-text,search,infinite-scroll,sortable-list,spa-view}:
- [minor] BE-OBSERVE: <Badge variant=secondary> in FuzzySearch — Cross-band: the FuzzySearch type-label chip composes ui/badge's `secondary` variant (bg-secondary/text-secondary-foregro
- [minor] BE.W-DESHADCN-SWEEP (this group's slice) — ONE wave covers the entire ds-containers residue — no per-component waves. Items: (1) hover-popover.css — delete the dea
- [minor] BE.W-DESHADCN-SWEEP (group exemption) — The procedural-viz group needs NO abrogation wave. Confirm BE.W-DESHADCN-SWEEP's per-component pass SKIPS custom/{aurora
- [minor] BE.W-DESHADCN-GATE (named allowlist entry) — Enroll this 10-component group as a NAMED clean-by-construction exemption in proof:de-shadcn's allowlist (the proof:no-g
- [minor] BE.W-DESHADCN-SWEEP (optional watercolor focus normalize) — OPTIONAL, non-load-bearing: normalize button.watercolor-swatch:focus-visible (WatercolorDot.vue:364-370) onto the .focus
- [minor] BE.W-DESHADCN-GATE (this group's clause) — proof:de-shadcn must red on a re-introduced OPAQUE background:var(--popover)/var(--card) flat-plate caret/tooltip FORM (
- [minor] BE.W-DOCK-FISSION-WEBGL-TIER — BOOKED successor (NOT this cut): the goo-blob smin metaball field (metaball.frag.ts sceneDistG/sminG) as the high-fideli
- [minor] BE.W-DOCK-RAIL-DOC-RECONCILE — Rewrite the STALE CLAUDE.md rail canon: the §DockRail divider-carousel section (documents the RETIRED <DockRail items/en
- [minor] BE.W-ALIVE-IDLE — Owns the breathing-pill idle FLOOR (±1.5% micro-pulse, slow clock, offscreen-paused). ~2 ideas.
- [minor] BE.W-ANTICIPATE-FOLLOW — Owns the anticipation dip + follow-through neighbor-lag + contextual-reflow personality. ~3 ideas.

---
# OPEN QUESTIONS for pass 3 (48)

- DEDUP: the SEED's Band-9 BE.W-DESHADCN-SWEEP + BE.W-DESHADCN-GATE are BOTH largely covered by the shipped BC.W-DESHADCN / proof:no-shadcn-default — pass 3 must re-scope them to the
- The 3 close-X buttons have NO shared canonical recipe — pass 3 should decide whether to mint a real `.glass-dismiss`/`<GlassDismiss>` primitive (also serves Toast close, the BE.W-G
- The other-band lenses found the SAME STATE-arm residue OUTSIDE this group (toast/ToastAction.vue:26 hover:bg-secondary+group-[.destructive]:hover:bg-destructive; toggle/index.ts:40
- The W-DESHADCN-SWEEP (SEED Band 9) is scoped to ALL 92 packages (43 ui/ + 49 custom/) but the de-shadcn sweep ALREADY RAN at BC.W-DESHADCN with a GREEN gate — pass 3 must reconcile
- decide the Toggle selected-register target precisely: --glass-bg-floating (the SegmentedTabs pill tier) vs --control-checked-bg (the checkbox/radio warm glass-tint) vs a new --togg
- the BE creed is iOS-27-tab-bar — pass 3 should decide whether the bare Toggle's de-shadcn target is the calm glass-quiet selected plate (cohesion with ToggleGroup card) OR the iOS-
- Radius-vocab catch precision: a rounded-lg FORBIDDEN entry must NOT false-hit the sanctioned rounded-card/-panel/-pill etc (the gate's existing rounded-md re uses a clean word-boun
- Is the alert base radius rounded-panel or rounded-card? Alert is a feedback PANEL (overlay-band peers use rounded-panel = --radius-xl/12px); but it's an inline content alert, not a
- data-table card-projection (rounded-lg×3) is ALLOWLIST-sanctioned for OPACITY but the bare-radius is still off-house — is the bare-radius catch scoped to NON-allowlist only (then d
- GATE BLIND SPOT: proof:no-shadcn-default currently reads FULLY GREEN (its 4 ui/ born-RED witnesses are cleaned) yet ToastClose red-300/red-50, ToastAction's outline-button, and Sta
- SCOPE of the custom/ widen: the existing gate's rationale is 'custom/ is glass-ui-authored from birth, not a shadcn port' — pass 3 must reconcile that with the StatusDot/chip resid
- SOFTNESS of the bare text-sm axis: text-sm is used 30× library-wide — is text-sm→text-small/text-caption normalization in-scope for BE de-shadcn (a real house-ladder discipline) or
- Pass 3 dedup: BE.W-DESHADCN-SWEEP's pass-1 seed claimed '~42 residual refs across ~16 files' across all 92 packages — THIS lens's 9-component slice contributes ZERO of them, so the
- Should the de-shadcn GATE assert on the class-emitter SFCs (which carry no inline form — the residue would land in the CSS) or on the dock/dock-controls CSS source? The dock SFCs a
- The ui/badge `secondary` variant look (bg-secondary) is consumed by custom/search — does the BE creed's 'every default FORM abrogated' extend the secondary Badge register to a glas
- Does BE.W-DESHADCN-SWEEP own the hover-popover radius re-point, or does it belong to a separate overlay-radius-uniformity concern (the BC.W-OVERLAY-UNIFORM lineage)? The radius div
- Is the Configurator inactive preset chip (bg-card/40) a genuine residue or a sanctioned opaque-atom case (small chip, W54 legibility-allowlist-adjacent)? It is small and legible, b
- ExpandableContainer corner buttons: confirm with the band-6 owner (BE.W-GLASS-CONTROL / BE.W-FLOAT-CONTROL) that the published GlassControl will exist before BE.W-DESHADCN-SWEEP ru
- Library-level (OUT of this group's scope, flag to dedup): the --focus-ring-shadow token (src/styles/tokens/scale-paper.css:70) resolves color-mix(in srgb, var(--ring) 30%, transpar
- Does BE.W-DESHADCN-SWEEP scope FORM to (a) only visible default LOOKS (bg/border/ring) or (b) also shadcn token NAMES (--ring/--popover/--accent in the cascade)? Under (a) this gro
- Pass-3 confirm: should the watercolor focus-ring normalization be a real wave item or dropped? Recommend DROP unless a separate lens flags a library-wide focus-register unification
- Caret-onto-glass-reveal re-point: should ScrubberTimeline COMPOSE the published Tooltip/HoverPopover surface (function-share) or just read the glass-floating plate tokens directly 
- Is ScrubberTimeline (variant=scrubber) on the proof:ba-gestalt data-band roster? If so the caret re-point owes a paint-verified DELTA; if it's a low-traffic demo-only surface the g
- EasingPicker text-xs/text-sm: confirm the target √φ rungs (the readout code-literal wants the mono-caption/--type-caption rung; the playback button wants --type-small or text-subhe
- SLOT GEOMETRY SOURCE: should the N target slot rects be (a) measured off hidden declarative layout-slot DOM (a getBoundingClientRect FLIP measure, the useDockCtaReceive precedent —
- PIECE TRANSFORM CHANNEL: per-piece position via ElementMorph translate+scale (clean rect-delta, but the piece's INTRINSIC content lays out at its slot size and is scaled during tra
- BRIDGE↔PIECE Z-ORDER + OPACITY HANDOFF curve: the exact t-window where the decorative goo bridge fades (1→0) and the real pieces own the frame — morph-bridge.css crosses at t=0.5; 
- BOUNDARY with BE.W-DOCK-FISSION: my silhouette state machine CONSUMES the N-detach goo bridge that BE.W-DOCK-FISSION owns (generalizing morph-bridge.css from merge-only). Pass 3 mu
- BOUNDARY with BE.W-DOCK-CONTEXT-MORPH / BE.W-DOCK-RAIL-REALIZE: the pass-1 gap map has MANY near-duplicate context waves (BE.W-DOCK-CONTEXT-MORPH, AUD.W-DOCK-CONTEXT-SWITCH, DH.W-D
- Whether `useDockState` (collapsed/hover/pinned) and the new silhouette FORM axis are ONE state machine or two orthogonal axes. Proposal: orthogonal — collapse-state is WITHIN a for
- GOO-SPLIT SUBSTRATE for the rail-facet anchor: the morph-bridge.css SVG-goo (Safari-safe, deterministic f(--dock-morph-t), zero shader frames, the proven precedent) vs the real Web
- RAIL-vs-FISSION OWNERSHIP SEAM: does BE.W-DOCK-RAIL-REALIZE own the facet-rect TARGETS the fission satellites land at, while BE.W-DOCK-FISSION owns the bridge GENERALIZATION (2→N p
- THE THREE RAILS de-overload: the unified floating <DockRail> vs the in-DockLayerGroup switcher TabsIndicator rail (proof:dock-rail-hairline/cohesion, KEPT) vs the dock-band rail-NO
- The rim-concentration saturate/contrast leg needs a delivery mechanism: a SECOND backdrop-filter is not directly maskable on the host element (backdrop-filter applies whole-element
- Squircle coupling: Safari 26 does NOT support corner-shape: superellipse (squircle.css:39 gates Chrome-139-only). The lens floor should NOT depend on the squircle — the rim/glint m
- The press read on Safari: BB.W-LENSING RETIRED the :active lens-swell (the displacement scale animation, DDR-LENS-BAKE). On Safari with no displacement, the press is carried by the
- The EXACT measured p50 on real WebKit (Safari 26 / bundled webkit Playwright) under 4× throttle is the binding number pass-3 must produce — the AZ trace is Chromium-ANGLE-only; the
- Whether the filter region clips to the WHOLE split-band (~480×56px) or TIGHTER to the two neck-gap zones (~2× 60×56px) — the tighter clip is the bigger budget lever (WebKit cost sc
- The exact feColorMatrix alpha-threshold (`… 20 -9` at the showcase stdDeviation=7) needs re-tuning for the smaller satellite radius — a tighter neck wants a sharper threshold; pass
- The dock-fission MECHANISM is named but undetailed: how does the 2-plate merge bridge (morph-bridge.css) generalize to detach-N-toward-named-rects? Is the per-piece --split-t a sin
- The contextual STATE MACHINE (context→silhouette resolver) is a from-scratch build (useContextualDockLayers is README-only). Pass 3 must spec the resolver shape: declarative descri
- Should BE.W-DOCK-FISSION and BE.W-METABALL-BRIDGE2 be ONE wave or two? They share the SVG-goo substrate; the N-seam stretch-and-snap math may be the bridge's deliverable while fiss
- DEDUP: the gap map proposes goo-split ~10× across lenses (BD/BX/AUD/RAIL/DH/plan-* prefixes) — pass 3 must confirm the ONE canonical BE.W-DOCK-FISSION gate name + reconcile that pr
- GATE-TAG SPLIT: confirm each new gate's tags — the SOURCE arms are ci+release (proof:de-shadcn/proof:dock-fission source clauses, like proof:no-gray ci+release), the binding π spec
- proof:de-shadcn SCOPE BOUND: pass 3 must decide whether the ~58 text-muted-foreground refs are IN scope (they are the SANCTIONED --on-glass-fg register per BB.W-ON-GLASS-FG, so EXC
- The exact --split-t / --neck-t / --dock-split-t token names + the SVG-goo filter region/budget are pass-2 DOCK-MECHANISM-DEPTH (D1) deliverables — the jubilance siting depends on t
- The magnetic-tendril/pointer-seam-tension delight (ideas L365,407) is the most speculative + perf-risky (a live clip-path-inset bridge preview that re-rasterizes per pointer move);
- Whether BE.W-DOCK-JUBILANCE-GATE is a NET-NEW proof or an extend-in-place of proof:glass-cohesion/proof:no-layout-animation (the disco-fence + compositor arms already exist separat
