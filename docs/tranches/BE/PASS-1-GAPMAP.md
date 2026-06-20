# BE tranche — PASS 1 gap map (iOS-27 alignment · dock hallmark · de-shadcn)

_21 lens findings, synthesized 2026-06-20._

## ref-dock-morph — the iOS-27 Apple Music dock frame-by-frame (V1): 5-tab bar ↔ now-playing pill 
- **summary:** The iOS-27 hallmark in V1 is NOT a single morphing bar — it is a dock that GOO-SPLITS into 2-3 independent free-floating glass elements (a left music-chip circle + a center now-playing mini-player pill + a right context-action circle, e.g. the magenta search circle) and re-MERGES, with a true metaball bridge visible mid-transition (f_021 catches the pill+sea
  - [critical] BD.W-DOCK-GOO-SPLIT: a useDockSplit driver + a SPLIT-direction metaball bridge — generalize morph-bridge.css from merge-to-one-center to detach-N-toward-targets (per-piece --split-t off the ONE SpringProgress; a clip-pat
  - [critical] BD.W-NOWPLAYING-BLOOM: a <DockNowPlaying> pill (a dock-resident mini-player capsule, the split's center piece) + wire useLiquidReveal so tapping the pill (or any album card) blooms a fullscreen surface FROM the pill's so
  - [major] BD.W-DOCK-SUBDOCK-RAIL: drive the goo-split output as a route-contextual rail — the detached pieces (count + glyph + target-rect) are resolved off the active context (generalize useContextualDockLayers from a pane-swap t
  - [major] BD.W-DOCK-CONTEXT-SILHOUETTE: a declarative context→silhouette map (bar | bar+pill | split{pill,circles}) the ONE orchestrator reads, driving the split/merge transition between silhouettes on the single --dock-morph-t cl
  - [major] BD.W-METABALL-BRIDGE2: evolve the CSS-goo bridge to a general N-seam stretch-and-snap — each seam carries a --neck-t (thins as pieces separate, with a snap-back overshoot via useLiquidFlex stretch-on-derivative), the blu
  - [minor] BD.W-SPLIT-DELIGHT: wire the split moment's micro-delight — a specular glint races the metaball neck as it stretches (--specular-angle keyed to --neck-t), each piece lands with a sub-perceptual squish-overshoot (useLiqui

## ref-glass-trans
- **summary:** V1 carries FOUR distinct glass-transition mechanisms we must match: (1) the album-card BLOOM-UP — the mini-player thumbnail FLIPs up into the hero Now-Playing art with a coupled scale + blur-settle (f_001→f_009→f_010: art arrives small+blurred, settles big+sharp); (2) popover/control BLOOMS from trigger-rect (the Control-Center chips in f_073 coalesce from t
  - [critical] BD.W-BLOOM-UP: useBloomUp(sourceRef, destRef, {preset, blur, crossfade}) — a shared-element FLIP composing kf flipShared/ElementMorph forward play (source-rect → dest-rect on snappy spring) + a coupled Gaussian blur(12px
  - [critical] BD.W-LENS-SAFARI: ship a Safari-compatible edge-lensing path. Option A — an SVG `filter: url()` (NOT backdrop-filter) over a duplicated/captured backdrop layer (the morph-bridge.css goo precedent — `filter:url()` IS cros
  - [major] BD.W-BACKDROP-SETTLE: add an OPT-IN backdrop-blur settle leg to .glass-reveal/useLiquidReveal — a second registered @property --glass-reveal-backdrop that ramps backdrop-filter blur from a HIGH start (the plate's resting
  - [major] BD.W-DOCK-GOO-SPLIT: a goo-split sub-dock — a circular control buds OFF the dock pill via the morph-bridge metaball threshold (the SAME feColorMatrix-threshold goo, Safari-safe), the bud separating with the gooey neck st
  - [minor] BD.W-REST-RIM: a sub-perceptual ALWAYS-ON bright specular top-edge rim on the interactive-glass tier (a thin static --glass-edge-light gradient concentrated top-left, distinct from the pointer-tracked disc), so a glass c

## ref-tabs-core
- **summary:** iOS-27 Apple Music's tab bar is the hallmark: a 5-tab glass bar (Home/New/Radio/Library/Search) where a DARK translucent "selection capsule" GLIDES between tabs on tap (f_002→f_003→f_005→f_050), the active icon+label tint to red, and the whole bar is true liquid glass (album art reads through it, f_060). The now-playing surface is a clean plate-free SF-Symbo
  - [critical] BX.W-DOCK-TAB-INDICATOR: mint a <DockTabBar> register (or a v-model:active axis on GlassDock's tab group) that composes the EXISTING useTabIndicator+useLiquidFlex engine to drive ONE traveling dark-glass selection capsul
  - [major] BX.W-DOCK-TAB-CELL: a <DockTab> cell composing icon (line-glyph, --dock-icon-glyph sized) over label (--dock-label-ratio), the active-tint axis reading the same selected register the traveling capsule arrives at; folds t
  - [major] BX.W-NOW-PLAYING: a <NowPlayingPill> (collapsed: art-thumb + scrolling-title via ScrollingText + play + skip, a translucent glass capsule) + a <Transport> cluster (plate-free SF-Symbol-grade play/pause morph + double-che
  - [major] BX.W-DOCK-SEARCH-PILL: a <DockSearchPill> composing .input-pill + leading magnifier + trailing mic affordance + the W-LIQUID-REVEAL bloom-from-trigger so tapping the Search tab blooms the full-width search pill from the 
  - [minor] BX.W-TAB-TINT-COUPLE: couple the active icon+label tint to the capsule arrival via a shared --tab-select-t drive (W-MOTION-CANON P3 fade-coupled-to-transform); folds into W-DOCK-TAB-INDICATOR.
  - [minor] BX.W-GLASS-ACTION-CLUSTER: a grouped glass segmented action-capsule (2-3 circular/segment buttons in ONE translucent pill with hairline dividers) + the circular Avatar-on-glass header register; reconciles with IconChip's

## ref-aurora
- **summary:** The V2 Apple-Music generative artwork is TWO distinct registers, not one. (1) The FOLDS register (New Music pink, Heavy Rotation warm-orange, Chill violet/teal) is a smooth DOMAIN-WARPED MESH GRADIENT — a handful of color attractors displaced by an fBm UV warp, with a single bright specular light-concentration RIDGE where the sheet folds, an OKLCh-perceptual
  - [major] BD.W-AUR-BURST: add an OPT-IN composition primitive — a uConicSectors register (a sector index → paletteId conic mapping around uFlowFocal with a hard/soft sector-edge knob + a radial light-bloom toward the focal), gated
  - [minor] BD.W-AUR-FOLD-SPECULAR: add a bounded fold light-concentration term — a gradient-of-warp-magnitude → additive warm-specular highlight along the domain-warp ridge (the |dWarp| crest), default-low, on both shader arms; shi
  - [minor] BD.W-AUR-PRESETS-APPLE: author 3-4 demo presets in demo/stories/aurora/presets.ts (fold-warm, fold-chill, burst-prismatic, burst-warm) calibrated to V2 frames — consumer-side per presets-in-consumers, no library token ch

## ref-maps-card — the iOS-27 Maps liquid-glass card, the tinted-chip icon bar, the search pill + 
- **summary:** The iOS-27 Maps SHOT is a complete CARD + ICON-BAR + FLOATING-CONTROL reference glass-ui only half-supports. Three pinned recipes: (1) the bottom-sheet card is GENUINELY translucent warm-frost (sampled card body L≈0.48-0.50, C≈0.015, H≈120° — the map's dark forest modulates it from 84,87,77 to 99,102,93 across depth, so the map READS THROUGH), but glass-ui's
  - [critical] BE.W-SHEET-TRANSLUCENT: mint a --glass-opacity-sheet (~0.74, between dialog 0.68 and overlay 0.95) + bridge .glass-drawer/Sheet onto a translucent bottom-sheet register reading the backdrop-through; keep the W55 bright-b
  - [critical] BE.W-TINTED-CHIP: add a TinkedChip/IconDisc surface=solid|glass axis — solid: a tinted material disc (the named token: --bronze/--gold/--section-color-N plate, white/contrast-safe glyph via safeAccentColor) for known ent
  - [major] BE.W-FLOAT-CONTROL: publish a GlassControlButton (circular|rounded-rect, the .dock-icon-button material lifted off the dock context) + a GlassControlStack grouping (the Maps vertical control cluster) reading the adaptive
  - [minor] BE.W-SEARCH-WELL: a GlassSearchPill compound (recessed inset well off --input-on-glass with an inner-shadow groove, leading icon slot + trailing action slot + optional avatar chip) — the Maps/Spotlight search register; c
  - [minor] BE.W-SHEET-EDGE: a mask-feathered top edge on the translucent sheet (a vertical mask-image fade at the rounded crown so the backdrop blooms through the top ~12px) + the grab-handle as a translucent --foreground hairline 

## res-apple-hig — Apple official Liquid Glass guidance (the authoritative bar)
- **summary:** Apple's official spec (newsroom + HIG) defines Liquid Glass as a translucent material that "reflects and refracts its surroundings, while dynamically transforming to help bring greater focus to content," uses "real-time rendering and dynamically reacts to movement with specular highlights," and "combines the optical qualities of glass with a fluidity only Ap
  - [critical] BD.W-DOCK-CONTEXT-PILL: a context-driven dock-collapse-to-now-playing-pill register on the ONE --dock-morph-t/--dock-expand-t scalar (chrome morphs bg/radius/children continuously); leading round media-chip + track text 
  - [critical] BD.W-DOCK-GOO-SPLIT: a metaball goo-split sub-dock — a circular control buds OFF the dock pill via the SVG feGaussianBlur+feColorMatrix threshold bridge driven by a single --dock-split-t scalar (f(scalar), no wall-clock 
  - [major] BD.W-CARD-BLOOM-FLIP: a card-rect→fullscreen bloom-up FLIP primitive composing the kf ElementMorph(cardRect, fullscreenRect) on the snappy spring (the useLiquidReveal substrate, forward 0→1), coupled scale/opacity/filter
  - [major] BD.W-DEEP-CEILING: lift the deep tier to the full Apple saturate(1.8) blur(20px) ceiling behind a recorded per-frame throttle number (the booked successor glass-deep.css names), gated to the one-deep-register-per-route b
  - [minor] BD.W-CONCENTRIC-RADIUS: a --radius-concentric(parent-radius, inset) system register (the Apple containerConcentric idiom) the dock/card/sheet/chip families read, so a nested chip auto-resolves its concentric corner off i
  - [minor] BD.W-CLEAR-VARIANT: a 'clear' member on the surface-axis that pairs permanent translucency with a mandatory dimming-scrim layer (the Apple Clear contract) for media-rich surfaces (now-playing pill, album-art overlays), d

## res-awwwards — SOTA web liquid-glass + dock/morph implementations, Safari-first
- **summary:** The web's SOTA liquid-glass splits into two tiers with a hard Safari fault-line down the middle. Tier 1 (cross-engine, Safari-first) is the backdrop-filter blur+saturate+brightness frosted plate + a layered highlight/tint/shadow stack + compositor transform/opacity/filter morphs — exactly what glass-ui already ships well (.glass-reveal, the ::before specular
  - [critical] BE.W-DOCK-GOO-SPLIT: the metaball goo-split sub-dock — the dock fissions into a primary pill + a detached circular sub-dock on the Safari-safe goo substrate (CSS-SVG threshold over the real-WebGL2-goo upgrade tier), the 
  - [major] BE.W-DOCK-CONTEXT-MORPH: a declarative dockContext descriptor → configuration resolver that drives the goo-split + reconfiguration on the ONE --dock-morph-t/--dock-split-t scalars (composing the existing useDockState + D
  - [major] BE.W-BLOOM-UP: a shared-element source-rect FLIP primitive (useBloomUp / <BloomUp>) — a card blooms into a fullscreen surface via ElementMorph(cardRect, fullscreenRect) on the spring curve, the album-art FLIP, View-Trans
  - [major] BE.W-SAFARI-RIM-LENS: a cross-engine rim-refraction SUBSTITUTE — the edge-lensing READ achieved Safari-safe via a layered inset highlight + a per-edge gradient-displacement on the surface's OWN ::before/::after (filter o
  - [minor] BE.W-GOO-JUBILANCE: expressive niceties on the goo-split — a droplet-recoil overshoot on neck-pinch, a surface-tension --stretch wobble via useLiquidFlex, a one-shot specular glint sweep on the sub-dock landing (PRM-stat
  - [minor] BE.W-RAIL-CONTEXT-FUSE: fuse the DockStack rail with the contextual-morph story — the rail fans on a context switch, the goo-split's detached sub-dock anchors to a rail facet, one orchestrator drives both (no second engi

## res-dock-priorart — dock-morph + goo-split prior art & technique (Safari-safe)
- **summary:** The Apple Music iOS-27 reference (V1) shows a dock that does THREE morph moves we only partially have: (1) full 5-tab translucent-glass tab-bar that COLLAPSES into a now-playing PILL (f_001→f_035); (2) a GOO-SPLIT where the collapsed pill sheds SATELLITE glass buttons — a left music-chip + a right magenta search circle — that stay metaball-connected at the s
  - [critical] BE.W-DOCK-GOO-SPLIT: a `<DockGooSplit>` / `useDockGooSplit` primitive — the collapsed pill + N satellite controls share ONE Safari-safe `filter:url(#dock-goo)` goo container (feGaussianBlur→feColorMatrix-alpha→feComposit
  - [major] BE.W-DOCK-PILL-MEDIA: a `shape="media-pill"` collapsed register — album/icon thumbnail + ScrollingText marquee title + a play/action glyph + the shed satellite seat, composing the existing collapsed-morph scalar + Scroll
  - [major] BE.W-DOCK-CONTEXTUAL-SHAPE: extend useContextualDockLayers to resolve a dock SHAPE descriptor (full-tabs | media-pill | pill+satellites) per route, driving the goo-split satellite-set + the collapse scalar through ONE re
  - [major] BE.W-RAIL-GOO-FAN: an opt-in `:liquid` axis on DockStack/DockRail that routes the fan-out through the SAME `filter:url(#dock-goo)` seam so chips emerge as droplets PULLING OUT of the rail core (the seam stretches then ne
  - [major] BE.W-GOO-SPLIT-PERF: a gate (proof:dock-goo-split) + π that proves the goo seam clears the frame budget on real Safari/WebKit (the filter region is clipped to the pill+satellite bounding box; the threshold matrix is tune
  - [minor] BE.W-GOO-SPLIT-MATERIAL: the goo container plates compose the `--glass-bg-floating`/`--glass-blur-floating`/`--glass-edge-light` registers (the morph-bridge plate radial-gradient precedent) so the shed satellites read as

## res-aurora-sota
- **summary:** V2's hallmark aurora is the "Heavy Rotation" SILKY-SATIN LIGHT-BENDING FOLD (f_004/f_007): a smooth, glossy, anisotropic surface where warm light bends and concentrates along soft folds — like brushed liquid metal or folded satin catching a soft key light, NOT a painterly/grainy field and NOT a flat blurry blob. Our aurora has a deep, SOTA foundation (anisot
  - [critical] W-AUR-SATIN: a new smooth-glossy medium:'satin' (uMedium==8, single-pass WebGL2 + WGSL). Derive a height field h from the warped palette luminance + a directional gradient along the ETF/structure-tensor flow; compute a n
  - [major] W-AUR-PRISM: add an angular palette-sampling mode (flowPattern-adjacent: sample paletteId by atan2(p - uFlowFocal) folded over uStopCount with a uPrismTurns winding) producing a conic rainbow burst from uFlowFocal + a ra
  - [major] W-AUR-DOCK-TINT: a thin consumer-side seam (DockStage/DockBackground) that drives the aurora palette/focal off the dock's active context (rail facet / now-playing accent) — the dock morph writes --aurora-accent-hue + uFl
  - [minor] W-AUR-SHEEN-BREATHE: couple uBreathDepth/uPaletteDrift to a slow travelling sheen phase on the satin register (the specular key-light orbits ~one slow cycle / 8-12s); PRM freezes it to one static frame (the master tempo 
  - [minor] W-AUR-REF-PRESETS: author demo/stories/aurora/presets.ts presets matching the four V2 album cards (warm-satin / cool-mesh / teal-3-stop-chill / prism-station) — presets-in-consumers, never library tokens; each becomes a 
  - [major] W-AUR-SATIN-WGSL (folds into W-AUR-SATIN): the satin sheen + prism bodies port to aurora-mediums.wgsl.ts / a shared sheen.wgsl chunk so proof:gpu-substrate-single keeps the aurora row at ΔE mean<=2.0/p99<=5.0; the typed-

## res-jubilance — web-researched jubilance/delight motion for the dock + glass system
- **summary:** The reference's hallmark is JUBILANT-by-construction: the now-playing dock GOO-SPLITS into three independent metaball blobs (magenta music-chip left, center track-pill, search circle right — f_038/f_040/f_042), album cards BLOOM UP into Now-Playing (FLIP+fade), popovers bloom from their trigger, and the aurora album-art breathes (V2). We have a mature, calm,
  - [critical] BE.W-DOCK-GOO-SPLIT: a metaball goo-split sub-dock — one pill separates into N independent glass blobs via a clip-path/SVG-goo surface-tension morph on a SINGLE --goo-split-t scalar (compositor-only, the morph-bridge feC
  - [major] BE.W-CELEBRATE-BURST: a one-shot earned-celebration burst primitive (useCelebrationBurst + .celebrate-burst) — N compositor-only radial glass-ray/petal elements scaling+fading out on --spring-bouncy from an origin, PRM→s
  - [major] BE.W-HAPTIC-COUPLE: a useHaptic seam (navigator.vibrate feature-detected, no-op where absent) wired to the existing snap/detent/completion events (useDragMorph fling-to-nearest, DRAWER_SNAP detent, CompletionSeal play, d
  - [minor] BE.W-ANTICIPATE-FOLLOW: extend useLiquidFlex/the dock morph with an OPT-IN anticipation pre-dip (a small reverse-scale frame before launch, on the spring's own clock) + a follow-through neighbor-lag (the --i stagger alre
  - [minor] BE.W-ALIVE-IDLE: a sub-perceptual --idle-breath ambient on the now-playing dock pill (a ±1.5% compositor scale/opacity micro-pulse on a slow ~3-4s clock, OPT-IN via data-attr, PRM→static, paused offscreen via the existin

## aud-dock — the hallmark dock audit vs iOS-27 Apple Music + Maps
- **summary:** Our dock is the most-engineered surface in the library (32 gates, ~5k LOC) and OWNS three liquid facilities the reference shows: (1) the single-scalar collapse↔expand morph (compositor-bound, interruptible, PRM-safe, both orientations), (2) the V↔H orientation morph with a REAL SVG-goo metaball-teardrop bridge (morph-bridge.css), and (3) layer FLIP via DockL
  - [critical] AUD.W-DOCK-GOO-SPLIT: a <DockSplit> / useDockFission primitive — N detached glass pill bodies driven off ONE --dock-split-t scalar, the morph-bridge.css SVG-goo generalized from 2 plates to N (the neck-apart/re-fuse silh
  - [critical] AUD.W-DOCK-CONTEXT-SWITCH: promote contextual reconfiguration to a library primitive — a <DockContext :config> seam where named control-sets (config descriptors) swap with the dock morphing/goo-splitting between them on 
  - [major] AUD.W-DOCK-RAIL-REALIZE: evolve DockStack into the full contextual rail — detached tinted-glass facet circles (each reads --glass-accent per datum, the Maps per-chip-hue register), a persistent strip that survives collap
  - [major] AUD.W-DOCK-CHIP-TINT: a DockIconButton tinted-glass register — a dock control whose plate reads --glass-accent (the W-GLASS-ACCENT rim+core seam, already shipped) as a per-datum chromatic glass circle, so a dock of facet
  - [major] AUD.W-DOCK-TRANSMISSION: a binding π + the deep-glass tier wired ON for the dock over a content-rich backdrop (album-grid / aurora), proving content reads THROUGH the plate at the iOS-27 saturate(1.5-1.8) blur(14-20px) r
  - [minor] AUD.W-DOCK-NOWPLAYING-HANDOFF: wire the card→fullscreen bloom (useLiquidReveal, shipped) to leave a now-playing pill in the dock via the goo-split — the album thumbnail flies into the dock's split music-chip body as the 
  - [minor] AUD.W-DOCK-JUBILANCE: expressive niceties on the goo-split — a sub-perceptual satellite droplet that pinches off the neck and springs to its body (composing the goo-blob satellite envelope, BA.W-GOO-REDRESS, the worst-ca

## aud-glass — our glass MATERIAL vs iOS-27 liquid glass
- **summary:** Our 5-rung ladder + `--glass-level` (opacity/blur) + `--glass-tint-*` (adaptive darken) + `--glass-accent` (rim) + `.glass-deep` + `.glass-lens` is a genuinely deep token system — arguably MORE parameterized than iOS-27 on the legibility/dark axes. But it is calibrated for ONE archetype (a warm-cream rounded card/dock over a procedural backdrop), and against
  - [critical] BD.W-LENS-SAFARI: a cross-engine refraction floor — ship a WebKit-safe edge-lensing read using layered radial/conic backdrop gradients + a saturate/contrast rim-concentration (no backdrop-filter:url()), so a glass surfac
  - [major] BD.W-LENS-PRISM: the prismatic edge — a bounded chromatic-aberration rim (a warm/cool oklab fringe pair offset at the bevel band) composing the EXISTING --glass-edge-dispersion token (glass-fx.css:223) onto the lens rim,
  - [major] BD.W-TINTED-CHIP: <GlassChip :tone> — the per-instance colored-glass circle/squircle. A NEW disjoint axis (--glass-fill-tint + bounded --glass-fill-strength) that tints the PLATE bg via the same color-mix(in oklab, <rung
  - [major] BD.W-SQUIRCLE-COVERAGE: re-evaluate the AX.W56 round-by-policy verdict against the iOS-27 reference — extend the @supports (corner-shape: superellipse) coupling to the glass CARD + the new tinted chip + the dock controls
  - [minor] BD.W-AMBIENT-TINT: extend useGlassBackdropLuminance to also sample the dominant backdrop HUE → write --glass-ambient-hue, and add an opt-in page/chrome ambient-tint that biases --glass-tint-source toward it at a sub-perc
  - [minor] BD.W-DEEP-PUSH: run the profile:budget clearance and (if green) land the booked 18-20px deep radius on the existing --glass-depth LERP (no recipe edit — the successor the glass-deep.css L4 budget-call already wired), lif

## aud-tabs — SegmentedTabs indicator (glide+squish, elastic spring, drag-morph) vs the iOS-27 App
- **summary:** Our SegmentedTabs engine is architecturally strong — ONE axis-derived indicator (anchor-positioned `inset` glide + JS fallback), a volume-preserving travel-squish capped at 1.15, a calibrated `--spring-snappy` clock (~340ms, release-at-arrival 0.82), and a genuinely novel `:draggable` liquid-pull (`useDragMorph` fling-to-nearest). But it MISSES the iOS-27 ta
  - [critical] BD.W-TAB-IOS-PLATE: re-register the active `.segmented-indicator` as a recessed accent-tinted glass capsule — compose `--glass-accent: <option.accent>` + a recessed inner-shadow rim (invert the forward `--glass-shadow-fl
  - [major] BD.W-TAB-ICON-STACK: render `option.icon` over `option.label` in the default markup (an `iconPlacement: 'stack'|'inline'|'none'` axis, lucide functional-component form like the dock rail's `isComponent()` precedent), the
  - [major] BD.W-TAB-ACCENT-RECOLOR: thread a `--tab-accent` per-option token; the active `.segmented-tab` recolors icon+label to it on the SAME `--tab-indicator-duration` window the indicator glides (the §6 EFFECTS-on-bezier / SPAT
  - [minor] BD.W-TAB-SUFFUSE-SWEEP: an OPT-IN `suffuseOn` event seam — on selection (or a consumer-fired `flash(hue)`) the track background sweeps a bounded `--glass-accent` color-wash across the bar L→R on the spring clock then dec
  - [minor] BD.W-TAB-COLLAPSE-PILL: an OPT-IN `collapsible`/`peek` axis that morphs the strip into a single active-tab pill + a goo-bridge re-expand (compose the W-MORPH-SHOWCASE feGaussianBlur goo-bridge + `useLiquidFlex`, NOT a ne
  - [minor] BD.W-TAB-CLICK-SPRING: route the click-select glide through the SAME `SpringProgress`/`useDragMorph` re-seat the drag uses (velocity-continuous re-target on rapid re-click), so click and drag share ONE interruptible phys

## aud-aurora — our aurora engine vs the V2 Apple Music iOS-27 generative artwork reference
- **summary:** Our aurora is a SOTA painterly-FIELD engine (multi-nuclei softmax + Quilez double-warp + structure-tensor edge-tangent strokes + 7 first-class mediums + anisotropic-Kuwahara + Bridson curl-warp + WebGPU/WebGL2 dual-substrate). It MATCHES or BETTERS the reference's SOFT-VOLUMETRIC register (the Chill/New-Music/Your-Essentials blob fields, V2 f_008/f_024) — we
  - [critical] AUR.W-SATIN-FOLD: a new `medium:"satin"` (smooth-pole peer, uMedium==8) — derive a fold-height field from the domain-warp displacement (the warp ALREADY computes a vec2 displacement; take its divergence/curl magnitude as
  - [critical] AUR-W-PRISM-BURST: a new composition mode `burst` (or `flow.pattern` extension that ACTUALLY tints) — sample paletteId by ANGLE around uFlowFocal (atan2 → hue index) instead of (or blended with) the nuclei field, with a 
  - [major] AUR-W-IOS27-PRESETS (demo, presets-in-consumers): add HEAVY_ROTATION (satin medium, warm-orange OKLCh ramp h~25-75, fold focal), CHILL (soft volumetric teal/green, the matched register tuned to f_024), STATIONS_PRISM (bu
  - [major] AUR-W-WGPU-STROKES: discharge the booked WGSL stroke-cascade port (the bestOil/paintOver/StrokeProfile WGSL twin) so the van-Gogh + oil + oil-pastel heroes render at full fidelity on Safari/WebGPU, closing the dual-subst
  - [minor] AUR-W-LIVING-SHIMMER: a per-register slow-shimmer term — the satin fold-line and the prism spoke-fan each get a gentle drift coupling (fold ridge migration on K_WARP, spoke slow-rotation on a new K_BURST) so the arrestin
  - [minor] folded into AUR-W-SATIN-FOLD / AUR-W-PRISM-BURST acceptance: the π readback asserts no visible banding across the fold ridge + the radial falloff (the existing aurora-arresting statistics arm extended).

## aud-cards-btn-icon
- **summary:** Our Card/Button material is SOTA-close (deep-glass tier, golden sqrt-φ padding, oklab-tinted lit buttons, frosted bottom-sheet) but our ICON register is the headline gap: IconChip is a flat color-mix overlay with NO backdrop-filter (src/styles/icon-chip.css:74-80), so it cannot render either of the two circular registers the iOS-27 Maps frame actually uses —
  - [critical] BE.W-ICONCHIP-GLASS: add a `glass` register to IconChip — a circular --glass-bg-* + --glass-blur-* disc whose fill is the hue-tinted glass via color-mix(in oklab, <rung>, var(--chip-tone) N%), composing the .glass-materi
  - [major] BE.W-ICONCHIP-FILLED: add a `filled` axis to IconChip — an opaque full-chroma tone disc (background: var(--tone)) with an auto-contrast WHITE/ink glyph (value.js safeAccentColor, the accent-tone ink path reused) + a soft
  - [major] BE.W-GLASS-FAB: mint <GlassControl shape='circle'|'pill'> (subpath /glass-control) — a floating circular/pill glass button composing .glass-material (rim + moving specular) + the W55 adaptive tint + the useSpringPress re
  - [minor] BE.W-CHIP-ON-GLASS: canon + cohesion-gate clause for the chip-on-frosted-sheet pattern — saturated filled chips are ALLOWED on a glass plate (category identity), the glass affordance disc reads the SHEET tint, and the ch
  - [minor] BE.W-SHEET-CARD-POLISH: a Drawer/Card 'sheet' polish — verify the rounded top-edge backdrop-read, the grabber, and an embedded glass search-pill slot match the Maps frosted bottom-sheet; tune --glass-blur-overlay + the c

## aud-safari
- **summary:** glass-ui's liquid-glass stack is overwhelmingly Safari-SAFE by construction: the base 5-rung blur is build-time `-webkit-backdrop-filter`-paired (gated by proof:webkit-backdrop), every bleeding-edge primitive (`@starting-style`/overlay, scroll()/view()/timeline-scope, position-anchor, contrast-color(), light-dark()) sits behind an `@supports` query with a re
  - [critical] BE.W-LENS-SAFARI-GUARD: harden the .glass-lens @supports so Safari never overrides the working blur — add an AND-clause that Safari fails (e.g. @supports (backdrop-filter:url(#glass-refract)) and (not (animation-timeline
  - [major] BE.W-SAFARI-CAPTURE: drive a real Safari 26 Mac + iOS 26 iPhone (and the bundled webkit Playwright project) over the 7 enrolled routes; capture the V↔H morph frame-series, the popover/dialog bloom, the :liquid button (le
  - [major] BE.W-DOCK-GOO-SPLIT: build the pill→goo-split-sub-dock morph reusing the morph-bridge SVG-goo (regular filter:url() feGaussianBlur+feColorMatrix threshold, Safari-safe) OR the WebGL goo-blob metaball field; the circular 
  - [minor] BE.W-SCROLL-PIN-SAFARI: verify Safari 26 timeline-scope support; if gapped, confirm the static-read is acceptable on the one /motion/scroll-choreography showcase route (it is, per design) and record the support-matrix fa
  - [minor] BE.W-SAFARI-REFRACT-PARITY: brainstorm a Safari-renderable edge-lensing proxy (a CSS mask/conic edge-glint + box-shadow inset rim + the deep saturate, NO backdrop url()) so the hero CTA's rim reads refractive-ENOUGH in S

## plan-bd-coverage
- **summary:** BD's 43 waves are the POST-CUT discharge tranche (ARIA defect, viz parity, doc/precept resync, demo-pane modernization) — they DO NOT cover the new iOS-27 liquid-glass directive AT ALL. A targeted grep across BD's SEED/CANDIDATE-WAVES/FOLD-LEDGER for goo-split / now-playing-pill / album-bloom / contextual-control-reconfigure / aurora-album-art / Safari-liqui
  - [critical] BE.W-DOCK-GOO-SPLIT: the metaball goo-split sub-dock — extend the CSS-SVG-goo bridge to a SPLIT topology (one control detaches into a circular satellite sub-dock on the same --dock-morph-t scalar, deterministic, Safari-s
  - [critical] BE.W-DOCK-CONTEXT-MORPH: promote useContextualDockLayers' route→set seam into a library contextual-reconfigure primitive that morphs the control-SET (FLIP the entering/leaving controls on the iOS liquid clock, the box re
  - [critical] BE.W-DOCK-NOWPLAYING-PILL: the collapse-to-now-playing-pill register — the dock morphs to a compact media pill (art chip + transport + goo-dock-in of an external now-playing chip via useDockCtaReceive), the inverse of ex
  - [critical] BE.W-DOCK-RAIL-REALIZE: re-conceive + fully ship the rail as the iOS-27 contextual context-strip (the divider-seam floating facet carousel done right — fan, overrun, contextual switch, box-inviolate), reconciling with Do
  - [major] BE.W-CARD-BLOOM-EXPAND: wire useLiquidReveal (FLIP+fade source-rect bloom) to a Card/ExpandableContainer card→full-screen expansion register (the album-fade-up case), compositor-only + Safari-safe + PRM-snap.
  - [major] BE.W-ICON-CHIP-GLASS: a circular tinted-GLASS IconChip register (frosted backdrop-filter disc + tone tint reading the --glass-tint axis, the backdrop reads through) — the Maps map-control chip; composes the brand-metal (
  - [major] BE.W-AURORA-ARTWORK: new aurora artistic registers (radial-burst station + prismatic + the silky directional light-bend fold) as named MOTION_FIELDS/medium presets, warm-cream-identity-fenced; the album-art-grade generat
  - [major] BE.W-SHEET-FROSTED-READTHROUGH: tune the Drawer/Sheet glass register so the live backdrop reads through the rounded top edge (the Maps frosted bottom-sheet), wiring the adaptive-luminance observer + deep-glass tier; pain
  - [major] BE.W-SAFARI-LIQUID-AUDIT: widen the WebKit playwright project testMatch to the new liquid-morph specs (goo-split/now-playing-pill/card-bloom/rail) + a born-RED proof:safari-liquid asserting each new transition degrades g
  - [major] BE.W-JUBILANCE-PASS: a cross-cutting expressive-motion pass — the goo-split bud squish, the pill-collapse bounce, the rail fan personality, a tasteful one-shot delight on contextual switch (compositor-only, PRM-static, §
  - [minor] BE.W-IOS27-GLASS-ALIGN: a reference-anchored glass-alignment audit (capture our dock/sheet/chip vs the iOS-27 frames, measure the translucency/blur/tint deltas, re-pin the deep-glass + tint tokens to the measured target)
  - [minor] BE.W-GESTALT-ROSTER-BE: grow + re-point proof:ba-gestalt to the BE tree with the new dock-split/now-playing-pill/rail/card-bloom/icon-chip-glass/aurora-artwork ROSTER rows (the BD-roster-grow precedent), so every BE morp

## plan-prompt-recap — exhaustive recall of every user prompt/ask across the session + tranches, e
- **summary:** I recalled every standing/historical user ask from CLAUDE.md, the BC PROMPT-LEDGER (100 historical prompts H1-H100 + O1-O20 standing + USER-DEFECTS A-H), the BD SEED/CANDIDATE-WAVES (43 waves), and the memory corpus, then cross-checked each against shipped src + the BD plan. The overwhelming majority are ADDRESSED (BC shipped the iOS-27 glass band, the WebGP
  - [critical] BE.W-DOCK-GOO-SPLIT: a contextual sub-dock primitive — the collapsed pill goo-SPLITS (Safari-safe CSS SVG alpha-bleed+threshold bridge keyed to ONE --dock-split-t scalar, the morph-bridge mechanism generalized off V↔H-on
  - [major] BE.W-DOCK-NOWPLAYING-PILL: a collapsed-state content register — the pill embeds a persistent control cluster (leading chip slot + inline scrubber + trailing action group) that stays live + tappable while collapsed (the i
  - [major] BE.W-CARD-BLOOM-FLIP: a v-model:open card-to-fullscreen bloom register composing useLiquidReveal's ElementMorph (FLIP from the source thumbnail rect onto the settled hero rect, coupled backdrop fade-to-translucent, compo
  - [major] BE.W-DOCK-TINTED-CHIP: a circular tinted-glass dock-control variant (consumes --glass-accent for the per-instance hue + the brand-metal bronze/gold quad + a label-below slot), the Maps-idiom control face; the floating ci
  - [major] BE.W-DOCK-CONTEXTUAL-MORPH: extend the contextual seam so a context change drives a SILHOUETTE morph (control-count/shape change via the goo-split bridge), not only a pane crossfade — the dock visibly reconfigures its gl
  - [minor] BE.W-RAIL-IOS-FAN: a rail register where the fanned members are circular tinted chips flush against the connective hairline seam (the iOS macOS-fan hybrid), composing DOCK-TINTED-CHIP + the goo-split bridge so the rail i
  - [minor] BE.W-JUBILANT-MORPH: a brainstorm+build wave for net-new expressive niceties — a goo-droplet pinch-off trail on split (the metaball necking), a chip-magnetism snap on merge, a per-context accent color-bloom on reconfigur

## plan-dock-hallmark
- **summary:** The dock is already SOTA in its morph ENGINE (one interruptible SpringProgress, one inheriting `--dock-morph-t` scalar driving box+chrome+stagger; root-span ramp; PRM-synchronous seat; V↔H orientation morph with a CSS-goo teardrop bridge; contextual-layers resolver; DockStack hover-fan rail; dock-search; cockpit preset; CTA-receive seat). But it is missing t
  - [critical] DH.W-DOCK-FISSION: the goo-split sub-dock — `useDockFission(dockRef, {targets, corner})` + `<DockFissionButton>`: a named control NECKS off the dock plate (clip-path-inset metaball neck on the `--dock-morph-t` scalar, re
  - [critical] DH.W-DOCK-CONTEXT-PILL: the contextual-form register — extend the outer morph from binary full/summary to an N-state `contextForm` ('nav' | 'pill' | 'fission' | 'search' | custom), each a NAMED slot that the ONE orchestr
  - [major] DH.W-DOCK-BLOOM-FULLSCREEN: `useBloomToFullscreen(sourceRef, {sharedElement})` — a FLIP-driven card/pill→fullscreen expansion on the kf ElementMorph + springTimingFunction substrate useLiquidReveal already composes, with
  - [major] DH.W-RAIL-HALLMARK: fully realize the rail — (a) fan members spring open on `--spring-bouncy` with a jubilant per-member overshoot stagger (the GlassEffectContainer fan, not a linear translate); (b) `useDragMorph` wires 
  - [minor] DH.W-DOCK-TINT-CONTEXT: wire `--glass-accent` (per-instance chromatic rim+glint) + the bronze/silver/gold metal triad onto the dock-circle register so a fissioned sub-button / a contextual pill carries a per-context hue 
  - [minor] DH.W-DOCK-AURORA-BACKDROP: an opt-in `backdrop` slot/register so a dock can host a live `<Aurora>` (offscreen-paused) as its OWN backdrop the glass refracts (useGlassBackdropLuminance already wired) — the V2 aurora-art-b
  - [minor] DH.W-DOCK-POPOVER-BLOOM: wire DockDropdownTrigger/DockSelectTrigger popovers to bloom from the dock-button source-rect via useLiquidReveal (transform-origin at the trigger, the beak/tail pointing back), so a dock popover
  - [minor] DH.W-DOCK-JUBILANCE: the new-niceties wave — (a) FISSION RIPPLE: a sub-button pinching off sends a one-shot specular ripple across the parent dock plate (the surface-tension recoil); (b) MERGE-SPLASH: a returning circle 

## plan-rail-full
- **summary:** The RAIL — our novel hallmark feature — is HALF-BUILT AND REGRESSED. The full vision (a floating carousel of context-facet chips fanned against a visible connective hairline that crosses the dock and overruns both edges, anchored to a named DockSeparator divider seam) was actually BUILT at AZ.W-RAIL3 (DockRail/DockRailItem + the --dock-rail-seam-offset seam-
  - [critical] RAIL.W-GOO-SPLIT: a <DockSplit>/satellite sub-dock primitive — the collapsed dock pill goo-splits into N circular tinted-glass satellites via the morph-bridge SVG-goo (neck-then-snap on --dock-morph-t, one spring), each 
  - [critical] RAIL.W-CHIP-CAROUSEL: a <DockRailCarousel> resting-state floating carousel — N tinted-glass facet chips fanned along the connective hairline (re-instate the AZ.W-RAIL3 visible-hairline-overruns-both-edges silhouette over
  - [major] RAIL.W-CHIP-ACCENT: bind each DockStackItem/facet to a --glass-accent hue (the per-instance chromatic rim+glint seam already shipped, BB.W-GLASS-ACCENT) so a facet chip glows its OWN context hue at the rim + catch-light 
  - [major] RAIL.W-CONTEXT-MORPH: the per-context facet swap rides the goo-bridge — when the active facet set changes, the outgoing chips goo-merge back to the dock pill and the incoming chips goo-split out (the reconfigure-per-cont
  - [minor] RAIL.W-STACKED-LAYER: a stacked-rail presentation — a now-playing/context pill rides as a translucent layer ABOVE the dock (frame 055), reading the backdrop through, on the #persistent-beside-#rail axis; composes the exi
  - [major] RAIL.W-DOC-RECONCILE: reconcile CLAUDE.md to HEAD — either (preferred, given this lens's recommendation) re-introduce the divider-seam anchor + floating carousel as the RESTING mode of the unified rail family (making the
  - [major] RAIL.W-JUBILANCE: the expressive-nicety pass — (a) the goo-split NECK wobble (a sub-perceptual squish-overshoot as a satellite snaps free, useLiquidFlex tanh law); (b) a magnetic-snap settle when a chip docks (the iOS ov

## plan-chronic-defer
- **summary:** The entire chronic+deferred surface AT→BD is already exhaustively dispositioned: the 213-item BC FOLD-LEDGER (99 BUILD/65 HELD/46 MET/2 RETIRE/1 SUPERSEDED), the 31-row AX DISPOSITION-REGISTER (1 retired/2 archived/28 book, all reStampedAt:"BC"), and the converged BD tranche (43 waves, clean across 8 challenge rounds) that drains the FIRED-trigger long-tail.
  - [critical] BE.W-DOCK-GOO-SPLIT: the metaball goo-merge/split sub-dock — promote morph-bridge.css from decorative to a live host: a sub-dock circle SPLITS off the main dock on a metaball smin-merge (the goo-blob sceneDistG field spl
  - [critical] BE.W-DOCK-CONTEXT-MORPH: the per-context dock reconfiguration register — the dock RECONFIGURES its control set + silhouette per a `context` prop (nav→now-playing-pill→search-circle), morphing the box AND its children con
  - [major] BE.W-CARD-BLOOM-FLIP: the card-to-fullscreen bloom — wire useLiquidReveal's ElementMorph(settledRect, triggerRect) to a card→detail-view FLIP+fade route transition (the BC switcher-grid source-rect-bloom-over-card-set co
  - [major] BE.W-GOO-MERGE-PERF: re-decide T1 — re-run the perf number on the rebuilt BC WebGPU floor (the budget changes if WebGPU-everywhere landed); if it clears, the always-on goo-merge ships as the BE.W-DOCK-GOO-SPLIT default (
  - [major] BE.W-VIZ-PARITY-METAL (absorb from BD): run the real-Metal-GPU parity readback (mean ΔE≤2.0/p99≤5.0) for the goo-blob + aurora + the new goo-split bridge, per-wave paint-verified (the BC anti-disease G8 law). NOT deferre
  - [major] BE.W-FOLD-LEDGER (absorb BD's): carry every BD HELD/FIRED row into the BE FOLD-LEDGER with its disposition — the goo per-sat-shade + squircle dome-Z (FIRED, build), deep-glass-20px + chroma-rim (re-decide on the BE rebui
  - [minor] BE.W-AURORA-ALBUM-ART (absorb BD.W-AURORA-WGSL-STROKES): port the per-dab Starry-Night stroke cascade to the WGSL primary (GL-fence: .frag byte-untouched, WGSL matched in lockstep) so the generative-album-art register (V
  - [minor] BE.W-DISPOSITION-RESTAMP: re-stamp the 28 book + 2 archived rows reStampedAt:BE in-place (no-delete L-inv-8), re-run each grep against the BE-HEAD constellation, graduate any that crossed ≥2 (verify completion-seal-famil


---
# WAVE ROLL-UP

**32 critical · 58 major · 41 minor**

## CRITICAL
- BD.W-DOCK-GOO-SPLIT: a useDockSplit driver + a SPLIT-direction metaball bridge — generalize morph-bridge.css from merge-to-one-center to detach-N-toward-targets (per-piece --split-t off the ONE SpringProgress; a clip-pat
- BD.W-NOWPLAYING-BLOOM: a <DockNowPlaying> pill (a dock-resident mini-player capsule, the split's center piece) + wire useLiquidReveal so tapping the pill (or any album card) blooms a fullscreen surface FROM the pill's so
- BD.W-BLOOM-UP: useBloomUp(sourceRef, destRef, {preset, blur, crossfade}) — a shared-element FLIP composing kf flipShared/ElementMorph forward play (source-rect → dest-rect on snappy spring) + a coupled Gaussian blur(12px
- BD.W-LENS-SAFARI: ship a Safari-compatible edge-lensing path. Option A — an SVG `filter: url()` (NOT backdrop-filter) over a duplicated/captured backdrop layer (the morph-bridge.css goo precedent — `filter:url()` IS cros
- BX.W-DOCK-TAB-INDICATOR: mint a <DockTabBar> register (or a v-model:active axis on GlassDock's tab group) that composes the EXISTING useTabIndicator+useLiquidFlex engine to drive ONE traveling dark-glass selection capsul
- BE.W-SHEET-TRANSLUCENT: mint a --glass-opacity-sheet (~0.74, between dialog 0.68 and overlay 0.95) + bridge .glass-drawer/Sheet onto a translucent bottom-sheet register reading the backdrop-through; keep the W55 bright-b
- BE.W-TINTED-CHIP: add a TinkedChip/IconDisc surface=solid|glass axis — solid: a tinted material disc (the named token: --bronze/--gold/--section-color-N plate, white/contrast-safe glyph via safeAccentColor) for known ent
- BD.W-DOCK-CONTEXT-PILL: a context-driven dock-collapse-to-now-playing-pill register on the ONE --dock-morph-t/--dock-expand-t scalar (chrome morphs bg/radius/children continuously); leading round media-chip + track text 
- BD.W-DOCK-GOO-SPLIT: a metaball goo-split sub-dock — a circular control buds OFF the dock pill via the SVG feGaussianBlur+feColorMatrix threshold bridge driven by a single --dock-split-t scalar (f(scalar), no wall-clock 
- BE.W-DOCK-GOO-SPLIT: the metaball goo-split sub-dock — the dock fissions into a primary pill + a detached circular sub-dock on the Safari-safe goo substrate (CSS-SVG threshold over the real-WebGL2-goo upgrade tier), the 
- BE.W-DOCK-GOO-SPLIT: a `<DockGooSplit>` / `useDockGooSplit` primitive — the collapsed pill + N satellite controls share ONE Safari-safe `filter:url(#dock-goo)` goo container (feGaussianBlur→feColorMatrix-alpha→feComposit
- W-AUR-SATIN: a new smooth-glossy medium:'satin' (uMedium==8, single-pass WebGL2 + WGSL). Derive a height field h from the warped palette luminance + a directional gradient along the ETF/structure-tensor flow; compute a n
- BE.W-DOCK-GOO-SPLIT: a metaball goo-split sub-dock — one pill separates into N independent glass blobs via a clip-path/SVG-goo surface-tension morph on a SINGLE --goo-split-t scalar (compositor-only, the morph-bridge feC
- AUD.W-DOCK-GOO-SPLIT: a <DockSplit> / useDockFission primitive — N detached glass pill bodies driven off ONE --dock-split-t scalar, the morph-bridge.css SVG-goo generalized from 2 plates to N (the neck-apart/re-fuse silh
- AUD.W-DOCK-CONTEXT-SWITCH: promote contextual reconfiguration to a library primitive — a <DockContext :config> seam where named control-sets (config descriptors) swap with the dock morphing/goo-splitting between them on 
- BD.W-LENS-SAFARI: a cross-engine refraction floor — ship a WebKit-safe edge-lensing read using layered radial/conic backdrop gradients + a saturate/contrast rim-concentration (no backdrop-filter:url()), so a glass surfac
- BD.W-TAB-IOS-PLATE: re-register the active `.segmented-indicator` as a recessed accent-tinted glass capsule — compose `--glass-accent: <option.accent>` + a recessed inner-shadow rim (invert the forward `--glass-shadow-fl
- AUR.W-SATIN-FOLD: a new `medium:"satin"` (smooth-pole peer, uMedium==8) — derive a fold-height field from the domain-warp displacement (the warp ALREADY computes a vec2 displacement; take its divergence/curl magnitude as
- AUR-W-PRISM-BURST: a new composition mode `burst` (or `flow.pattern` extension that ACTUALLY tints) — sample paletteId by ANGLE around uFlowFocal (atan2 → hue index) instead of (or blended with) the nuclei field, with a 
- BE.W-ICONCHIP-GLASS: add a `glass` register to IconChip — a circular --glass-bg-* + --glass-blur-* disc whose fill is the hue-tinted glass via color-mix(in oklab, <rung>, var(--chip-tone) N%), composing the .glass-materi
- BE.W-LENS-SAFARI-GUARD: harden the .glass-lens @supports so Safari never overrides the working blur — add an AND-clause that Safari fails (e.g. @supports (backdrop-filter:url(#glass-refract)) and (not (animation-timeline
- BE.W-DOCK-GOO-SPLIT: the metaball goo-split sub-dock — extend the CSS-SVG-goo bridge to a SPLIT topology (one control detaches into a circular satellite sub-dock on the same --dock-morph-t scalar, deterministic, Safari-s
- BE.W-DOCK-CONTEXT-MORPH: promote useContextualDockLayers' route→set seam into a library contextual-reconfigure primitive that morphs the control-SET (FLIP the entering/leaving controls on the iOS liquid clock, the box re
- BE.W-DOCK-NOWPLAYING-PILL: the collapse-to-now-playing-pill register — the dock morphs to a compact media pill (art chip + transport + goo-dock-in of an external now-playing chip via useDockCtaReceive), the inverse of ex
- BE.W-DOCK-RAIL-REALIZE: re-conceive + fully ship the rail as the iOS-27 contextual context-strip (the divider-seam floating facet carousel done right — fan, overrun, contextual switch, box-inviolate), reconciling with Do
- BE.W-DOCK-GOO-SPLIT: a contextual sub-dock primitive — the collapsed pill goo-SPLITS (Safari-safe CSS SVG alpha-bleed+threshold bridge keyed to ONE --dock-split-t scalar, the morph-bridge mechanism generalized off V↔H-on
- DH.W-DOCK-FISSION: the goo-split sub-dock — `useDockFission(dockRef, {targets, corner})` + `<DockFissionButton>`: a named control NECKS off the dock plate (clip-path-inset metaball neck on the `--dock-morph-t` scalar, re
- DH.W-DOCK-CONTEXT-PILL: the contextual-form register — extend the outer morph from binary full/summary to an N-state `contextForm` ('nav' | 'pill' | 'fission' | 'search' | custom), each a NAMED slot that the ONE orchestr
- RAIL.W-GOO-SPLIT: a <DockSplit>/satellite sub-dock primitive — the collapsed dock pill goo-splits into N circular tinted-glass satellites via the morph-bridge SVG-goo (neck-then-snap on --dock-morph-t, one spring), each 
- RAIL.W-CHIP-CAROUSEL: a <DockRailCarousel> resting-state floating carousel — N tinted-glass facet chips fanned along the connective hairline (re-instate the AZ.W-RAIL3 visible-hairline-overruns-both-edges silhouette over
- BE.W-DOCK-GOO-SPLIT: the metaball goo-merge/split sub-dock — promote morph-bridge.css from decorative to a live host: a sub-dock circle SPLITS off the main dock on a metaball smin-merge (the goo-blob sceneDistG field spl
- BE.W-DOCK-CONTEXT-MORPH: the per-context dock reconfiguration register — the dock RECONFIGURES its control set + silhouette per a `context` prop (nav→now-playing-pill→search-circle), morphing the box AND its children con

## MAJOR
- BD.W-DOCK-SUBDOCK-RAIL: drive the goo-split output as a route-contextual rail — the detached pieces (count + glyph + target-rect) are resolved off the active context (generalize useContextualDockLayers from a pane-swap t
- BD.W-DOCK-CONTEXT-SILHOUETTE: a declarative context→silhouette map (bar | bar+pill | split{pill,circles}) the ONE orchestrator reads, driving the split/merge transition between silhouettes on the single --dock-morph-t cl
- BD.W-METABALL-BRIDGE2: evolve the CSS-goo bridge to a general N-seam stretch-and-snap — each seam carries a --neck-t (thins as pieces separate, with a snap-back overshoot via useLiquidFlex stretch-on-derivative), the blu
- BD.W-BACKDROP-SETTLE: add an OPT-IN backdrop-blur settle leg to .glass-reveal/useLiquidReveal — a second registered @property --glass-reveal-backdrop that ramps backdrop-filter blur from a HIGH start (the plate's resting
- BD.W-DOCK-GOO-SPLIT: a goo-split sub-dock — a circular control buds OFF the dock pill via the morph-bridge metaball threshold (the SAME feColorMatrix-threshold goo, Safari-safe), the bud separating with the gooey neck st
- BX.W-DOCK-TAB-CELL: a <DockTab> cell composing icon (line-glyph, --dock-icon-glyph sized) over label (--dock-label-ratio), the active-tint axis reading the same selected register the traveling capsule arrives at; folds t
- BX.W-NOW-PLAYING: a <NowPlayingPill> (collapsed: art-thumb + scrolling-title via ScrollingText + play + skip, a translucent glass capsule) + a <Transport> cluster (plate-free SF-Symbol-grade play/pause morph + double-che
- BX.W-DOCK-SEARCH-PILL: a <DockSearchPill> composing .input-pill + leading magnifier + trailing mic affordance + the W-LIQUID-REVEAL bloom-from-trigger so tapping the Search tab blooms the full-width search pill from the 
- BD.W-AUR-BURST: add an OPT-IN composition primitive — a uConicSectors register (a sector index → paletteId conic mapping around uFlowFocal with a hard/soft sector-edge knob + a radial light-bloom toward the focal), gated
- BE.W-FLOAT-CONTROL: publish a GlassControlButton (circular|rounded-rect, the .dock-icon-button material lifted off the dock context) + a GlassControlStack grouping (the Maps vertical control cluster) reading the adaptive
- BD.W-CARD-BLOOM-FLIP: a card-rect→fullscreen bloom-up FLIP primitive composing the kf ElementMorph(cardRect, fullscreenRect) on the snappy spring (the useLiquidReveal substrate, forward 0→1), coupled scale/opacity/filter
- BD.W-DEEP-CEILING: lift the deep tier to the full Apple saturate(1.8) blur(20px) ceiling behind a recorded per-frame throttle number (the booked successor glass-deep.css names), gated to the one-deep-register-per-route b
- BE.W-DOCK-CONTEXT-MORPH: a declarative dockContext descriptor → configuration resolver that drives the goo-split + reconfiguration on the ONE --dock-morph-t/--dock-split-t scalars (composing the existing useDockState + D
- BE.W-BLOOM-UP: a shared-element source-rect FLIP primitive (useBloomUp / <BloomUp>) — a card blooms into a fullscreen surface via ElementMorph(cardRect, fullscreenRect) on the spring curve, the album-art FLIP, View-Trans
- BE.W-SAFARI-RIM-LENS: a cross-engine rim-refraction SUBSTITUTE — the edge-lensing READ achieved Safari-safe via a layered inset highlight + a per-edge gradient-displacement on the surface's OWN ::before/::after (filter o
- BE.W-DOCK-PILL-MEDIA: a `shape="media-pill"` collapsed register — album/icon thumbnail + ScrollingText marquee title + a play/action glyph + the shed satellite seat, composing the existing collapsed-morph scalar + Scroll
- BE.W-DOCK-CONTEXTUAL-SHAPE: extend useContextualDockLayers to resolve a dock SHAPE descriptor (full-tabs | media-pill | pill+satellites) per route, driving the goo-split satellite-set + the collapse scalar through ONE re
- BE.W-RAIL-GOO-FAN: an opt-in `:liquid` axis on DockStack/DockRail that routes the fan-out through the SAME `filter:url(#dock-goo)` seam so chips emerge as droplets PULLING OUT of the rail core (the seam stretches then ne
- BE.W-GOO-SPLIT-PERF: a gate (proof:dock-goo-split) + π that proves the goo seam clears the frame budget on real Safari/WebKit (the filter region is clipped to the pill+satellite bounding box; the threshold matrix is tune
- W-AUR-PRISM: add an angular palette-sampling mode (flowPattern-adjacent: sample paletteId by atan2(p - uFlowFocal) folded over uStopCount with a uPrismTurns winding) producing a conic rainbow burst from uFlowFocal + a ra
- W-AUR-DOCK-TINT: a thin consumer-side seam (DockStage/DockBackground) that drives the aurora palette/focal off the dock's active context (rail facet / now-playing accent) — the dock morph writes --aurora-accent-hue + uFl
- W-AUR-SATIN-WGSL (folds into W-AUR-SATIN): the satin sheen + prism bodies port to aurora-mediums.wgsl.ts / a shared sheen.wgsl chunk so proof:gpu-substrate-single keeps the aurora row at ΔE mean<=2.0/p99<=5.0; the typed-
- BE.W-CELEBRATE-BURST: a one-shot earned-celebration burst primitive (useCelebrationBurst + .celebrate-burst) — N compositor-only radial glass-ray/petal elements scaling+fading out on --spring-bouncy from an origin, PRM→s
- BE.W-HAPTIC-COUPLE: a useHaptic seam (navigator.vibrate feature-detected, no-op where absent) wired to the existing snap/detent/completion events (useDragMorph fling-to-nearest, DRAWER_SNAP detent, CompletionSeal play, d
- AUD.W-DOCK-RAIL-REALIZE: evolve DockStack into the full contextual rail — detached tinted-glass facet circles (each reads --glass-accent per datum, the Maps per-chip-hue register), a persistent strip that survives collap
- AUD.W-DOCK-CHIP-TINT: a DockIconButton tinted-glass register — a dock control whose plate reads --glass-accent (the W-GLASS-ACCENT rim+core seam, already shipped) as a per-datum chromatic glass circle, so a dock of facet
- AUD.W-DOCK-TRANSMISSION: a binding π + the deep-glass tier wired ON for the dock over a content-rich backdrop (album-grid / aurora), proving content reads THROUGH the plate at the iOS-27 saturate(1.5-1.8) blur(14-20px) r
- BD.W-LENS-PRISM: the prismatic edge — a bounded chromatic-aberration rim (a warm/cool oklab fringe pair offset at the bevel band) composing the EXISTING --glass-edge-dispersion token (glass-fx.css:223) onto the lens rim,
- BD.W-TINTED-CHIP: <GlassChip :tone> — the per-instance colored-glass circle/squircle. A NEW disjoint axis (--glass-fill-tint + bounded --glass-fill-strength) that tints the PLATE bg via the same color-mix(in oklab, <rung
- BD.W-SQUIRCLE-COVERAGE: re-evaluate the AX.W56 round-by-policy verdict against the iOS-27 reference — extend the @supports (corner-shape: superellipse) coupling to the glass CARD + the new tinted chip + the dock controls
- BD.W-TAB-ICON-STACK: render `option.icon` over `option.label` in the default markup (an `iconPlacement: 'stack'|'inline'|'none'` axis, lucide functional-component form like the dock rail's `isComponent()` precedent), the
- BD.W-TAB-ACCENT-RECOLOR: thread a `--tab-accent` per-option token; the active `.segmented-tab` recolors icon+label to it on the SAME `--tab-indicator-duration` window the indicator glides (the §6 EFFECTS-on-bezier / SPAT
- AUR-W-IOS27-PRESETS (demo, presets-in-consumers): add HEAVY_ROTATION (satin medium, warm-orange OKLCh ramp h~25-75, fold focal), CHILL (soft volumetric teal/green, the matched register tuned to f_024), STATIONS_PRISM (bu
- AUR-W-WGPU-STROKES: discharge the booked WGSL stroke-cascade port (the bestOil/paintOver/StrokeProfile WGSL twin) so the van-Gogh + oil + oil-pastel heroes render at full fidelity on Safari/WebGPU, closing the dual-subst
- BE.W-ICONCHIP-FILLED: add a `filled` axis to IconChip — an opaque full-chroma tone disc (background: var(--tone)) with an auto-contrast WHITE/ink glyph (value.js safeAccentColor, the accent-tone ink path reused) + a soft
- BE.W-GLASS-FAB: mint <GlassControl shape='circle'|'pill'> (subpath /glass-control) — a floating circular/pill glass button composing .glass-material (rim + moving specular) + the W55 adaptive tint + the useSpringPress re
- BE.W-SAFARI-CAPTURE: drive a real Safari 26 Mac + iOS 26 iPhone (and the bundled webkit Playwright project) over the 7 enrolled routes; capture the V↔H morph frame-series, the popover/dialog bloom, the :liquid button (le
- BE.W-DOCK-GOO-SPLIT: build the pill→goo-split-sub-dock morph reusing the morph-bridge SVG-goo (regular filter:url() feGaussianBlur+feColorMatrix threshold, Safari-safe) OR the WebGL goo-blob metaball field; the circular 
- BE.W-CARD-BLOOM-EXPAND: wire useLiquidReveal (FLIP+fade source-rect bloom) to a Card/ExpandableContainer card→full-screen expansion register (the album-fade-up case), compositor-only + Safari-safe + PRM-snap.
- BE.W-ICON-CHIP-GLASS: a circular tinted-GLASS IconChip register (frosted backdrop-filter disc + tone tint reading the --glass-tint axis, the backdrop reads through) — the Maps map-control chip; composes the brand-metal (
- BE.W-AURORA-ARTWORK: new aurora artistic registers (radial-burst station + prismatic + the silky directional light-bend fold) as named MOTION_FIELDS/medium presets, warm-cream-identity-fenced; the album-art-grade generat
- BE.W-SHEET-FROSTED-READTHROUGH: tune the Drawer/Sheet glass register so the live backdrop reads through the rounded top edge (the Maps frosted bottom-sheet), wiring the adaptive-luminance observer + deep-glass tier; pain
- BE.W-SAFARI-LIQUID-AUDIT: widen the WebKit playwright project testMatch to the new liquid-morph specs (goo-split/now-playing-pill/card-bloom/rail) + a born-RED proof:safari-liquid asserting each new transition degrades g
- BE.W-JUBILANCE-PASS: a cross-cutting expressive-motion pass — the goo-split bud squish, the pill-collapse bounce, the rail fan personality, a tasteful one-shot delight on contextual switch (compositor-only, PRM-static, §
- BE.W-DOCK-NOWPLAYING-PILL: a collapsed-state content register — the pill embeds a persistent control cluster (leading chip slot + inline scrubber + trailing action group) that stays live + tappable while collapsed (the i
- BE.W-CARD-BLOOM-FLIP: a v-model:open card-to-fullscreen bloom register composing useLiquidReveal's ElementMorph (FLIP from the source thumbnail rect onto the settled hero rect, coupled backdrop fade-to-translucent, compo
- BE.W-DOCK-TINTED-CHIP: a circular tinted-glass dock-control variant (consumes --glass-accent for the per-instance hue + the brand-metal bronze/gold quad + a label-below slot), the Maps-idiom control face; the floating ci
- BE.W-DOCK-CONTEXTUAL-MORPH: extend the contextual seam so a context change drives a SILHOUETTE morph (control-count/shape change via the goo-split bridge), not only a pane crossfade — the dock visibly reconfigures its gl
- DH.W-DOCK-BLOOM-FULLSCREEN: `useBloomToFullscreen(sourceRef, {sharedElement})` — a FLIP-driven card/pill→fullscreen expansion on the kf ElementMorph + springTimingFunction substrate useLiquidReveal already composes, with
- DH.W-RAIL-HALLMARK: fully realize the rail — (a) fan members spring open on `--spring-bouncy` with a jubilant per-member overshoot stagger (the GlassEffectContainer fan, not a linear translate); (b) `useDragMorph` wires 
- RAIL.W-CHIP-ACCENT: bind each DockStackItem/facet to a --glass-accent hue (the per-instance chromatic rim+glint seam already shipped, BB.W-GLASS-ACCENT) so a facet chip glows its OWN context hue at the rim + catch-light 
- RAIL.W-CONTEXT-MORPH: the per-context facet swap rides the goo-bridge — when the active facet set changes, the outgoing chips goo-merge back to the dock pill and the incoming chips goo-split out (the reconfigure-per-cont
- RAIL.W-DOC-RECONCILE: reconcile CLAUDE.md to HEAD — either (preferred, given this lens's recommendation) re-introduce the divider-seam anchor + floating carousel as the RESTING mode of the unified rail family (making the
- RAIL.W-JUBILANCE: the expressive-nicety pass — (a) the goo-split NECK wobble (a sub-perceptual squish-overshoot as a satellite snaps free, useLiquidFlex tanh law); (b) a magnetic-snap settle when a chip docks (the iOS ov
- BE.W-CARD-BLOOM-FLIP: the card-to-fullscreen bloom — wire useLiquidReveal's ElementMorph(settledRect, triggerRect) to a card→detail-view FLIP+fade route transition (the BC switcher-grid source-rect-bloom-over-card-set co
- BE.W-GOO-MERGE-PERF: re-decide T1 — re-run the perf number on the rebuilt BC WebGPU floor (the budget changes if WebGPU-everywhere landed); if it clears, the always-on goo-merge ships as the BE.W-DOCK-GOO-SPLIT default (
- BE.W-VIZ-PARITY-METAL (absorb from BD): run the real-Metal-GPU parity readback (mean ΔE≤2.0/p99≤5.0) for the goo-blob + aurora + the new goo-split bridge, per-wave paint-verified (the BC anti-disease G8 law). NOT deferre
- BE.W-FOLD-LEDGER (absorb BD's): carry every BD HELD/FIRED row into the BE FOLD-LEDGER with its disposition — the goo per-sat-shade + squircle dome-Z (FIRED, build), deep-glass-20px + chroma-rim (re-decide on the BE rebui

## MINOR (41 total, first 30)
- BD.W-SPLIT-DELIGHT: wire the split moment's micro-delight — a specular glint races the metaball neck as it stretches (--specular-angle keyed to --neck-t), each piece lands with a sub-perceptual squish-overshoot (useLiqui
- BD.W-REST-RIM: a sub-perceptual ALWAYS-ON bright specular top-edge rim on the interactive-glass tier (a thin static --glass-edge-light gradient concentrated top-left, distinct from the pointer-tracked disc), so a glass c
- BX.W-TAB-TINT-COUPLE: couple the active icon+label tint to the capsule arrival via a shared --tab-select-t drive (W-MOTION-CANON P3 fade-coupled-to-transform); folds into W-DOCK-TAB-INDICATOR.
- BX.W-GLASS-ACTION-CLUSTER: a grouped glass segmented action-capsule (2-3 circular/segment buttons in ONE translucent pill with hairline dividers) + the circular Avatar-on-glass header register; reconciles with IconChip's
- BD.W-AUR-FOLD-SPECULAR: add a bounded fold light-concentration term — a gradient-of-warp-magnitude → additive warm-specular highlight along the domain-warp ridge (the |dWarp| crest), default-low, on both shader arms; shi
- BD.W-AUR-PRESETS-APPLE: author 3-4 demo presets in demo/stories/aurora/presets.ts (fold-warm, fold-chill, burst-prismatic, burst-warm) calibrated to V2 frames — consumer-side per presets-in-consumers, no library token ch
- BE.W-SEARCH-WELL: a GlassSearchPill compound (recessed inset well off --input-on-glass with an inner-shadow groove, leading icon slot + trailing action slot + optional avatar chip) — the Maps/Spotlight search register; c
- BE.W-SHEET-EDGE: a mask-feathered top edge on the translucent sheet (a vertical mask-image fade at the rounded crown so the backdrop blooms through the top ~12px) + the grab-handle as a translucent --foreground hairline 
- BD.W-CONCENTRIC-RADIUS: a --radius-concentric(parent-radius, inset) system register (the Apple containerConcentric idiom) the dock/card/sheet/chip families read, so a nested chip auto-resolves its concentric corner off i
- BD.W-CLEAR-VARIANT: a 'clear' member on the surface-axis that pairs permanent translucency with a mandatory dimming-scrim layer (the Apple Clear contract) for media-rich surfaces (now-playing pill, album-art overlays), d
- BE.W-GOO-JUBILANCE: expressive niceties on the goo-split — a droplet-recoil overshoot on neck-pinch, a surface-tension --stretch wobble via useLiquidFlex, a one-shot specular glint sweep on the sub-dock landing (PRM-stat
- BE.W-RAIL-CONTEXT-FUSE: fuse the DockStack rail with the contextual-morph story — the rail fans on a context switch, the goo-split's detached sub-dock anchors to a rail facet, one orchestrator drives both (no second engi
- BE.W-GOO-SPLIT-MATERIAL: the goo container plates compose the `--glass-bg-floating`/`--glass-blur-floating`/`--glass-edge-light` registers (the morph-bridge plate radial-gradient precedent) so the shed satellites read as
- W-AUR-SHEEN-BREATHE: couple uBreathDepth/uPaletteDrift to a slow travelling sheen phase on the satin register (the specular key-light orbits ~one slow cycle / 8-12s); PRM freezes it to one static frame (the master tempo 
- W-AUR-REF-PRESETS: author demo/stories/aurora/presets.ts presets matching the four V2 album cards (warm-satin / cool-mesh / teal-3-stop-chill / prism-station) — presets-in-consumers, never library tokens; each becomes a 
- BE.W-ANTICIPATE-FOLLOW: extend useLiquidFlex/the dock morph with an OPT-IN anticipation pre-dip (a small reverse-scale frame before launch, on the spring's own clock) + a follow-through neighbor-lag (the --i stagger alre
- BE.W-ALIVE-IDLE: a sub-perceptual --idle-breath ambient on the now-playing dock pill (a ±1.5% compositor scale/opacity micro-pulse on a slow ~3-4s clock, OPT-IN via data-attr, PRM→static, paused offscreen via the existin
- AUD.W-DOCK-NOWPLAYING-HANDOFF: wire the card→fullscreen bloom (useLiquidReveal, shipped) to leave a now-playing pill in the dock via the goo-split — the album thumbnail flies into the dock's split music-chip body as the 
- AUD.W-DOCK-JUBILANCE: expressive niceties on the goo-split — a sub-perceptual satellite droplet that pinches off the neck and springs to its body (composing the goo-blob satellite envelope, BA.W-GOO-REDRESS, the worst-ca
- BD.W-AMBIENT-TINT: extend useGlassBackdropLuminance to also sample the dominant backdrop HUE → write --glass-ambient-hue, and add an opt-in page/chrome ambient-tint that biases --glass-tint-source toward it at a sub-perc
- BD.W-DEEP-PUSH: run the profile:budget clearance and (if green) land the booked 18-20px deep radius on the existing --glass-depth LERP (no recipe edit — the successor the glass-deep.css L4 budget-call already wired), lif
- BD.W-TAB-SUFFUSE-SWEEP: an OPT-IN `suffuseOn` event seam — on selection (or a consumer-fired `flash(hue)`) the track background sweeps a bounded `--glass-accent` color-wash across the bar L→R on the spring clock then dec
- BD.W-TAB-COLLAPSE-PILL: an OPT-IN `collapsible`/`peek` axis that morphs the strip into a single active-tab pill + a goo-bridge re-expand (compose the W-MORPH-SHOWCASE feGaussianBlur goo-bridge + `useLiquidFlex`, NOT a ne
- BD.W-TAB-CLICK-SPRING: route the click-select glide through the SAME `SpringProgress`/`useDragMorph` re-seat the drag uses (velocity-continuous re-target on rapid re-click), so click and drag share ONE interruptible phys
- AUR-W-LIVING-SHIMMER: a per-register slow-shimmer term — the satin fold-line and the prism spoke-fan each get a gentle drift coupling (fold ridge migration on K_WARP, spoke slow-rotation on a new K_BURST) so the arrestin
- folded into AUR-W-SATIN-FOLD / AUR-W-PRISM-BURST acceptance: the π readback asserts no visible banding across the fold ridge + the radial falloff (the existing aurora-arresting statistics arm extended).
- BE.W-CHIP-ON-GLASS: canon + cohesion-gate clause for the chip-on-frosted-sheet pattern — saturated filled chips are ALLOWED on a glass plate (category identity), the glass affordance disc reads the SHEET tint, and the ch
- BE.W-SHEET-CARD-POLISH: a Drawer/Card 'sheet' polish — verify the rounded top-edge backdrop-read, the grabber, and an embedded glass search-pill slot match the Maps frosted bottom-sheet; tune --glass-blur-overlay + the c
- BE.W-SCROLL-PIN-SAFARI: verify Safari 26 timeline-scope support; if gapped, confirm the static-read is acceptable on the one /motion/scroll-choreography showcase route (it is, per design) and record the support-matrix fa
- BE.W-SAFARI-REFRACT-PARITY: brainstorm a Safari-renderable edge-lensing proxy (a CSS mask/conic edge-glint + box-shadow inset rim + the deep saturate, NO backdrop url()) so the hero CTA's rim reads refractive-ENOUGH in S

---
# JUBILANCE IDEAS (84)

- The metaball-NECK specular sweep: as the bar goo-splits, a warm-cream catch-light races ALONG the stretching neck (keyed to --neck-t via --specular-an
- Snap-recoil: when the metaball neck snaps, each detached piece does a tiny ζ<1 overshoot-and-settle (useLiquidFlex stretch-on-snap-derivative, capped 
- The now-playing pill as a LIVING piece: when it detaches, the album art inside does a micro-parallax (the artwork shifts a hair slower than the capsul
- Contextual goo-CHOREOGRAPHY: switching tab reconfigures the silhouette as a goo dance — on Library the search circle goo-buds OFF the bar's right edge
- The album bloom can OVERSHOOT-and-settle the art with a tiny squish — a volume-preserving useLiquidFlex pulse at the arrival peak so the hero art land
- Goo-split JUBILANCE: when the sub-dock circle buds off the pill, give the gooey neck a tiny elastic recoil + a one-shot specular glint sweep across th
- Contextual color-bleed: in f_008 the dock tints magenta/pink as the now-playing context bleeds through. Let the dock pill's --glass-accent (W-GLASS-AC
- The bloom-up's blur-settle can be PER-CHANNEL: desaturate→saturate coupled with blur→sharp so the art doesn't just sharpen, it COLOR-blooms (the V2 au
- The traveling capsule should GOO-PULL: as it glides between tabs it stretches along the travel axis (the useLiquidFlex squish we already own) AND leav
- On tap, the tapped tab's icon should do a quick 'press-bloom': a sub-perceptual scale-down on press then a snappy bloom to 1.0 as the capsule arrives 
- Active-tab icon micro-personality: the Radio waves-glyph could emit a single concentric pulse-ring on selection (one-shot, PRM-static), the Search mag
- The now-playing play→pause should be a true SF-Symbol MORPH (triangle melts to two bars via clip-path/path-morph on a snappy spring), not a glyph swap
- Per-context burst reconfiguration: when a card/dock context switches (the V1 dock GOO-SPLIT moment), let the aurora field morph from fold→burst by ani
- Album-hue seeded burst: derive the burst's per-sector hues from the now-playing album artwork's dominant colors (seed→whole-scene, the T7 ParamExplore
- Light-bending fold that tracks the pointer: our cursor-swirl (aurora.frag.ts:302) already warps the field — couple it to the fold-specular term so dra
- Prismatic glint on the glass-over-burst composite: where the floating dock-pill + circular search button sit over the burst (V1/V2 bottom), let the ri
- CHIP BLOOM-IN: the saved-place tinted discs cascade-reveal (the W-SUFFUSE3 icon-chip-reveal spring-clock entrance) when the card blooms up — each disc
- LIVE-FROST CONTROLS: the floating circular map controls track the backdrop luminance (the shipped useGlassBackdropLuminance observer) so as the user p
- TINTED-DISC SPECULAR: each solid material disc carries a per-hue catch-light via --glass-accent bound to its own tone (bronze disc halos bronze, gold 
- PRESS-SINK WELL: the search pill sinks (the --glass-btn-press-t coupled press) on tap and the leading magnifier does a tiny rotate-settle as the card 
- THE GOO-SPLIT IS THE FUN: a circular search/media button that physically BUDS off the dock pill with a metaball merge-and-separate (Safari-safe SVG-go
- Now-playing pill that LIVES: the leading album-chip slowly rotates/parallaxes (usePointerVelocityField), the play→pause glyph morphs with a draw-on, a
- BLOOM-UP with GRAVITY: the album card doesn't just scale to fullscreen — it arrives with the audacious-arrival --ease-out (no bounce on the big move) 
- The Maps tinted-glass icon-chips (Work=bronze/Home=blue/Walmart=gold) are EXACTLY our IconChip + glass-accent + the brand-metal triad — promote them t
- The goo-SPLIT itself is the jubilance — a dock that visibly NECKS and fissions into a droplet that springs away to the corner is pure delight; lean in
- On the detached sub-dock LANDING: a one-shot specular glint sweep across the new circular button (PRM-static), the W-METAL-GLOW catch-light idiom reus
- Album BLOOM-UP: the card art should over-bloom ~2% then settle (the iOS overshoot), and the now-playing aurora (V2 silky warm-orange folds) could seed
- The contextual reconfiguration as theater: when audio starts, the 5-tab dock could goo-MERGE its tabs toward center, pinch into the now-playing pill, 
- The shed itself is the fun: a search circle that DROPLETS OUT of the now-playing pill with a stretchy metaball neck that necks-and-snaps — the iOS 'li
- Re-MERGE on expand: the satellites fly back IN and the goo seam swallows them — the inverse droplet, the pill 'drinks' its controls. Bidirectional on 
- Per-satellite accent hue via W-GLASS-ACCENT: the search circle glows magenta (matching the reference), the music-chip warm-red — each shed droplet car
- Pointer-reactive seam tension: while a satellite is mid-shed, a hover pulls the neck toward the cursor (reuse usePointerVelocityField) — the goo seam 
- The aurora LEANS toward the active dock control — when the dock goo-splits a magenta search circle (V1), the field's focal + accent hue glide toward i
- A 'pour' entrance — when an album card BLOOMS UP into now-playing (V1 album-fade-up FLIP), the satin aurora behind it briefly INTENSIFIES its sheen + 
- Pointer-as-key-light made delicious on the satin register: the specular fold-highlights track the cursor (uLightDir already cursor-driven, AW.W8) so m
- A flick BURST ripples the satin folds (uCursorBurst already exists) — a fast flick sends a transient sheen wave travelling along the flow, like rippli
- GOO-SPLIT FANFARE — when the now-playing pill goo-splits into its three sub-blobs, each emergent blob over-shoots its slot on --spring-bouncy with a ~
- EARNED GLASS-SHARD BLOOM — a personal-best/completion fires a one-shot radial bloom of ≤8 translucent glass petals (the album bloom-up FLIP generalize
- HAPTIC DETENT TICK — every spring snap-to-slot (drag fling-to-nearest, drawer detent, tab fling, goo-split commit) pairs a crisp navigator.vibrate(8) 
- ANTICIPATION DIP — a dock control about to launch squashes ~2% opposite-direction for one frame first (the wind-up), so the launch reads as a delibera
- The goo-split NECK as a stage for expression: as the now-playing pill fissions from the bar, a tiny satellite droplet pinches off the necking band and
- A chromatic glint sweeps the neck at the moment of separation: bind --glass-accent (the per-datum hue) + the metal-shimmer-sweep keyframe to the neck 
- The Maps tinted-chip idiom as a JOYFUL dock: a facet rail where each chip is a different brand-metal/section-color glass circle (bronze/blue/gold/viol
- Re-fusion squish overshoot: when the split bodies goo-merge back into the 5-tab bar, the merged bar over-swells ~+8% then settles (the useLiquidFlex -
- GOO-SPLIT the lens: when the dock collapses into the now-playing pill and goo-splits the circular sub-dock (the V1 hallmark), couple the metaball merg
- Tinted-glass chips that SAMPLE the icon: a <GlassChip> whose --glass-fill-tint auto-derives from the dominant hue of its own slotted glyph/album-art (
- The press-illuminate refraction: on a glass CTA :active, swell BOTH the lens depth AND a warm chromatic-fringe pulse at the rim on the --glass-btn-pre
- Ambient 'glass absorbs the room' on the now-playing bloom: as an album card BLOOMS UP into the full Now-Playing screen (the V1 album-fade-up FLIP), ra
- Per-tab ACCENT chips: bind each option to its section hue (`--section-color-N`) so the active capsule glows that datum's color — Radio=red, Library=vi
- The color-SUFFUSION sweep (f_007): on selection a bounded accent-wash ripples across the whole track L→R then decays — the single most expressive 'thi
- Goo-MERGE re-expand: when a collapsed tab-pill re-expands, the sibling tabs goo-split OUT of the active pill via the feGaussianBlur bridge (the dock g
- Icon BLOOM on select: the active icon does a sub-perceptual scale(0.85)→1 snappy-overshoot bloom (the IconChip `:reveal` spring-clock entrance) couple
- The SATIN-FOLD register is a jubilant win for the DOCK + cards: a now-playing pill or album card whose glass backdrop is warm-orange silk with a specu
- PRISM-BURST as a CELEBRATION moment: fire a one-shot radial prism burst from the dock's goo-split button or a completion event — a kaleidoscopic spoke
- A 'shimmer-on-play' coupling: when audio/scroll/interaction starts, the aurora's breath depth + fold-migration speed lifts briefly then eases back — t
- Mood-keyed register auto-pick: a warm seed (h 25-75) → satin folds; a multi-hue seed → prism burst; an analogous cool seed → soft volumetric. One `see
- The TINTED-GLASS chip should BLOOM its hue on press — a brief radial hue-wash that pulses out from the glyph through the glass disc then settles (comp
- A row of glass chips should do a JELLY-SETTLE cascade on mount (the IconChip reveal spring exists, icon-chip.css:~140) — stagger them with a goo-merge
- The floating glass control should carry a live SPECULAR that tracks the device/pointer (the createSpecularWriter core already ships) so a floating map
- Long-press a tinted-glass chip → it MORPHS into a mini sub-menu disc cluster (the Maps goo-split sub-dock applied to a chip) — the single disc fission
- The goo-split sub-dock (V1 hallmark) can be Safari-JUBILANT for free: the morph-bridge already proves a deterministic SVG-goo metaball merge (feGaussi
- Every popover/dialog already blooms-from-anchor via .glass-reveal in Safari (allow-discrete + @starting-style shipped) — lean into it: make the dock s
- The Safari-safe edge-glint proxy (conic --specular-angle sweep masked to the rim band, useSpecularPointer) can be the CONSOLATION-PRIZE that's actuall
- Tinted-glass icon chips (the Maps SHOT: Work=bronze/Home=blue/Walmart=gold circular chips) are 100% Safari-native — they're --glass-accent rim+core co
- The goo-split bud-off: when the search circle buds off the dock, the parent dock plate SQUISHES inward (volume-preserving, useLiquidFlex) as if it pin
- The now-playing chip goo-DOCKS-IN: an external now-playing chip flies onto the dock and MERGES into the glass (useDockCtaReceive already does the morp
- Contextual reflow personality: when the dock reconfigures its control-set, the leaving controls don't just fade — they collapse toward the center with
- Album-card bloom-up: the card lifts off its grid slot with a micro-anticipation dip (the iOS pull-back-before-launch), then FLIPs to full-screen on th
- The goo-NECK pinch-off: when the now-playing pill splits into the sub-dock chips, render the metaball NECKING — the bridge thins to a droplet thread t
- Chip-MAGNETISM on merge: when the sub-dock chips re-coalesce into the pill, give each chip a brief velocity-continuous lunge TOWARD the merge point (t
- Per-context ACCENT-BLOOM: on a contextual reconfigure, fire a one-shot --glass-accent color-bloom that ripples the new context's hue across the chips'
- Album card BLOOM with a parallax tilt: as the card flips up to fullscreen (f_010), give the hero artwork a sub-perceptual pointer-parallax (the usePoi
- FISSION RIPPLE — when a sub-button pinches off, the parent dock plate ripples a one-shot specular recoil (surface-tension snap-back), reusing the crea
- MAGNETIC GOO-TENDRIL — drag a detached free-floating circle near the dock and a metaball tendril reaches out toward it (clip-path-inset bridge preview
- MERGE-SPLASH gold coalesce — a returning circle reunites with a soft gold-glint (compose W-AX-METAL-GLOW's `--metal-glow-*` + CompletionSeal's earned-
- BREATHING-PILL idle — the collapsed now-playing pill carries a sub-perceptual specular drift (a slow lit-glass shimmer keyed to the playback state), s
- The GOO-NECK wobble: as a satellite snaps free of the dock pill, the metaball neck stretches then recoils with a sub-perceptual tanh squish-overshoot 
- Per-facet ACCENT-HUE GLINT cascade: on a context-switch the incoming chips bloom in reading order, each firing its OWN --glass-accent catch-light swee
- MAGNETIC-DOCK settle: when a chip docks into its slot it overshoots ~+7% then settles on --spring-bouncy — the iOS magnetic snap; pull a chip and it s
- The now-playing satellite PARALLAXES its album-thumb on pointer (usePointerVelocityField, shipped) — the circular pill's artwork tilts subtly toward t
- GOO-SPLIT JUBILANCE: when the dock goo-splits the search circle off, let the split-point STRETCH a taffy thread (useLiquidFlex tanh squish, capped LOW
- NOW-PLAYING PILL EASTER-EGG: the now-playing pill could carry a 1px aurora-album-art sliver (the V2 generative register sampled into the pill's --glas
- ALBUM-BLOOM PHYSICS: the card-to-fullscreen bloom should over-shoot on the bouncy ~15% (ζ=0.70) and SETTLE with the album-art aurora 'breathing' regis
- CONTEXTUAL RECONFIGURE WIT: when the dock reconfigures nav→now-playing, the icons that survive the morph should TRAVEL (FLIP) to their new slots while
