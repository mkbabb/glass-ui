# BE tranche — FINALIZED WAVE LIST (post pass-2 dedup + corrections)

_~30 distinct waves, deduplicated from 131 (pass 1) + 75 (pass 2) raw proposals. Convergence ~78%._
_Pass-2 corrections folded: 4 stale SEED premises fixed (context-silhouette = MINT not extend; rail = re-instate-after-regression, name DockStack; now-playing = net-new; lens-prism = wiring). De-shadcn re-scoped (gate exists, residue narrow). Safari decided (SVG-goo floor). Mechanisms designed on existing substrate, zero new engine._

## Band 1 — THE DOCK HALLMARK
- **BE.W-DOCK-FISSION** (critical) — `useDockFission` + `<DockSplit>`/`<DockFissionPiece>`; `fission-bridge.css` generalizes `morph-bridge.css` (merge-to-one → detach-N-toward-slots); per-piece `--split-t` off the ONE SpringProgress (no new engine); the deterministic SVG-goo (`filter:url()` feGaussianBlur+feColorMatrix threshold) is the Safari-safe FLOOR (clipped filter region + contain:paint → budget-clearing, NOT a VT-fall); bidirectional re-merge; PRM=instant. Gates: `proof:dock-fission` + `proof:dock-goo-split` (perf π on real WebKit). Owns ~8 goo-split delights (snap-recoil, neck-wobble, bud-off squish).
- **BE.W-DOCK-CONTEXT-SILHOUETTE** (critical) — **MINT** `useDockContextSilhouette` (CORRECTION: `useContextualDockLayers` is README-only, does NOT exist). Declarative `DockSilhouetteDescriptor[]` map (bar | bar+pill | split{pill,circles} | search) the ONE orchestrator reads; FLIP surviving controls to new slots (ElementMorph+springTimingFunction). Gate: `proof:dock-context`.
- **BE.W-DOCK-NOWPLAYING-PILL** (critical) — net-new `<DockNowPlaying>` (/dock + barrel): leading circular art-chip + `<ScrollingText>` title (byte-reuse) + live transport (SF-symbol play↔pause morph), tappable-while-collapsed; the split's center piece. Gate: `proof:nowplaying-pill`.
- **BE.W-METABALL-BRIDGE2** (major) — the general N-seam stretch-and-snap (per-seam `--neck-t`, snap-back via useLiquidFlex `--stretch`); shares the FISSION goo substrate. Owns the neck specular-sweep FLOOR.
- **BE.W-DOCK-RAIL-REALIZE** (critical) — **re-instate the AZ.W-RAIL3 floating tinted-glass facet carousel** (CORRECTION: BUILT at AZ then CLEAN-BROKEN to the macOS hover-fan `DockStack`/`stack-rail.css` at BC.W-DOCK-STACK-RAIL — the user's named regression). Reconcile DockStack(hover-fan) + DockRail(divider-seam carousel) + the fission goo (the detached sub-dock anchors to a rail facet) into ONE engine; box-INVIOLATE; per-facet `--glass-accent`. Gate: `proof:dock-rail-realize` (extend proof:rail3). + the CLAUDE.md rail-canon doc-reconcile (STALE — documents the retired DockRail).
- **BE.W-DOCK-TINTED-CHIP** (major) — the dock-control consumer of the `--glass-fill-tint` axis (the Maps facet-chip face + bronze/gold metal quad). Owns the per-facet accent-hue FLOOR.
- **BE.W-DOCK-JUBILANCE** (major) — the cross-cutting dock delight (fission ripple, merge-splash gold-coalesce, magnetic tendril/seam-tension — perf-gate the speculative ones).

## Band 2 — LIQUID GLASS MATERIAL (Safari-first)
- **BE.W-LENS-SAFARI** (critical) — two-tier `.glass-lens` (CORRECTION: Safari 26 has NO backdrop-filter:url() — WebKit bug 245510 OPEN): the cross-engine FLOOR (directional rim + conic `--specular-angle` edge-glint + `--glass-edge-dispersion` fringe + a Safari-native layered backdrop) OUTSIDE the @supports gate; the feDisplacement filter is the Chromium-only enhancement INSIDE it. + the @supports-guard so Safari never loses the floor blur. Gate: `proof:lensing-safari`.
- **BE.W-TINTED-CHIP** (critical) — `<GlassChip :tone>` the net-new `--glass-fill-tint`/`--glass-fill-strength` plate-bg axis (oklab; DISTINCT from the shipped rim `--glass-accent`). Gate: `proof:glass-fill-tint`.
- **BE.W-SHEET-TRANSLUCENT** (critical) — `--glass-opacity-sheet` (~0.74, between dialog 0.68 and overlay 0.95); Drawer/Sheet onto backdrop-through + mask-feathered crown (the Maps frosted sheet). Gate: `proof:sheet-translucent`.
- **BE.W-LENS-PRISM** (major) — **WIRING** (CORRECTION: `--glass-edge-dispersion` EXISTS, glass-fx.css:223): promote the chromatic-aberration rim onto the lens as a first-class tunable.
- **BE.W-DEEP-CEILING** (major) — the glass-deep 18-20px Apple ceiling (absorbs BD.W-DEEP-PUSH) behind a recorded throttle number.

## Band 3 — TABS
- **BE.W-TAB-IOS-CAPSULE** (major) — FOLD (DockTabBar + SegmentedTabs): ONE iOS recessed-accent glass-capsule register, dock + segmented arms, composing the shipped useTabIndicator+useLiquidFlex. Owns icon-bloom-on-select + accent-suffuse-sweep + capsule-goo-pull.

## Band 4 — AURORA (album-art generative)
- **BE.W-AUR-SATIN** (critical) — `medium:"satin"` (uMedium==8, WebGL2+WGSL-lockstep): the silky light-bending fold (Heavy Rotation) — fold-height from the domain-warp, directional sheen, OKLCh; default byte-identical, GL-fence. Owns satin sheen-on-play + pointer-as-key-light.
- **BE.W-AUR-PRISM** (critical) — `burst` mode (uMedium==9): angular palette-sampling around uFlowFocal → the prismatic station bursts. + **BE.W-AUR-PRESETS** (minor, demo, presets-in-consumers).

## Band 5 — BLOOM / FLIP
- **BE.W-BLOOM-UP** (critical) — `useBloomUp(sourceRef, destRef)` shared-element FLIP (the album-card→fullscreen bloom) composing the SHIPPED ElementMorph+springTimingFunction; 3 coupled channels (scale/opacity/blur-decongest); Safari-safe + PRM-snap; off-root-barrel (/motion). Gate: `proof:bloom-up`. Owns overshoot-settle + parallax-tilt.
- **BE.W-BACKDROP-SETTLE** (major) — an opt-in backdrop-blur settle leg on .glass-reveal. Owns per-channel color-bloom.

## Band 6 — CARDS / BUTTONS / ICONS (the Maps card)
- **BE.W-ICONCHIP-GLASS** (critical) — REAL gap (icon-chip.css has NO backdrop-filter): a `glass` register (frosted disc + oklab tone-tint, backdrop reads through) + a `filled` register (opaque tone + value.js safeAccentColor auto-contrast glyph). Gate: `proof:iconchip-glass` (extend proof:icon-chip).
- **BE.W-GLASS-CONTROL** (major) — `<GlassControl shape=circle|pill>` (subpath /glass-control): the floating circular glass button (Maps controls) lifted off the dock context; ExpandableContainer's corner buttons are the consumer. + **BE.W-SEARCH-WELL** (minor).

## Band 7 — SAFARI (the MUST-be-Safari floor)
- **BE.W-SAFARI-CAPTURE** (major) — RE-SCOPE: the webkit Playwright project EXISTS (playwright.config.ts:117); testMatch-WIDEN to the 5 new liquid specs (fission/pill/bloom/rail/lens) + `proof:safari-liquid` (the binding cross-engine π + support-matrix + degrade-gracefully-per-transition).

## Band 8 — JUBILANCE (standalone primitives + the lock)
- **BE.W-CELEBRATE-BURST** (major) — `useCelebrationBurst` (net-new, verified absent): a one-shot earned glass-shard/petal radial bloom, PRM-static + the chip-bloom-in cascade.
- **BE.W-HAPTIC-COUPLE** (major) — `useHaptic` (navigator.vibrate, net-new, feature-detected) wired to snap/detent/completion events.
- **BE.W-ANTICIPATE-FOLLOW** (minor) + **BE.W-ALIVE-IDLE** (minor) — anticipation pre-dip + follow-through; the breathing-pill idle FLOOR (±1.5%, offscreen-paused).
- **BE.W-JUBILANCE-GATE** (major) — `proof:jubilance`: every sited delight is compositor-only + PRM-safe (FLOOR-gated | OPT-IN-snapped) + disco-fenced.

## Band 9 — DE-SHADCN FORM ABROGATION (re-scoped — gate exists, residue narrow)
- **BE.W-DESHADCN-SWEEP** (major, RE-SCOPED — NOT 92 component waves): the custom/ band (the 49 dirs the ui/-only gate never walked — mostly clean) + the narrow STATE-arm residue: 3 inconsistent close-X buttons (Dialog/Sheet/DialogScrollContent → ONE canonical `.glass-dismiss` register), 4 orphan separators (DropdownMenu/ContextMenu/Command/Combobox → SelectSeparator's warm-ink hairline), MultiSelect remove-X → destructive-glass, Toggle `data-[state=on]:bg-accent`, ToastClose, ScrubberTimeline caret-tooltip, GlassCarouselPager counter, hover-popover.css dead fallbacks. ~10-12 file edits.
- **BE.W-DESHADCN-GATE-WIDEN** (major, DOWNGRADED from critical): WIDEN the existing `proof:no-shadcn-default` (BC.W-DESHADCN, green, ui/-only) — walk custom/** + a STATE-arm clause (data-[state]:bg-accent/hover:bg-secondary on non-glass chrome reds) + bare-radius lg/sm + raw-palette + separator-warm-hairline; the 10-component viz group as a named clean-by-construction exemption.

## Band 10 — FOLD / DISPOSITION (the no-silent-drop machine)
- **BE.W-FOLD-LEDGER** — absorb BD's HELD/FIRED long-tail + the iOS-27 gap-map dispositions.
- **BE.W-VIZ-PARITY-METAL** (absorb BD) — the real-Metal-GPU + real-WebKit parity for goo-blob + aurora + the new goo-split bridge.
- **BE.W-GESTALT-ROSTER-BE** — `proof:ba-gestalt` +9 roster rows (dock-fission/nowplaying-pill/dock-rail/dock-context/card-bloom/iconchip-glass/aurora-satin/aurora-prism/lens-safari).
- **BE.W-DISPOSITION-RESTAMP** — re-stamp the book/archived rows reStampedAt:BE.

---
## Convergence ledger
- **Pass 1 (~50%):** broad sweep, 131 raw waves, the dock-fission hallmark + 10-band skeleton.
- **Pass 2 (~78%):** de-shadcn re-scoped (gate exists, residue narrow), dock-fission mechanism designed (zero new engine, SVG-goo floor), 4 stale SEED premises corrected, Safari substrate decided (lens two-tier, goo floor), the full gate set designed, 84 jubilance → ~26 delights sited. ~30 distinct waves.
- **Pass 3 (next):** the custom/ de-shadcn FULL residue inventory + the CLAUDE.md rail-canon reconcile detail + an ADVERSARIAL challenge (paint-realizability · Safari-fidelity · dedup-soundness · the "betters-not-matches" bar) → target ~92%.
- **Pass 4:** final challenge → ~100% → develop the per-wave specs (goal/starting-state/gate/π).

---
# PASS-3 CORRECTIONS (folded from the adversarial challenge)

## RE-INSTATED "betters" waves (the silent-drop was the no-silent-drop violation; these EXCEED iOS-27, not match)
- **BE.W-SQUIRCLE-COVERAGE** (critical, Band 2) — cross-engine `corner-shape: superellipse` coupling on card/chip/dock-control behind an @supports floor, so the iOS-27 superellipse silhouette reads on SAFARI (today it's encoded ONLY inside the Chromium-only displacement filter — Safari stays plain-rounded). The single most-visible iOS-27 shape cue.
- **BE.W-AMBIENT-TINT** (critical, Band 2) — extend useGlassBackdropLuminance to sample the backdrop DOMINANT HUE → `--glass-ambient-hue` + an opt-in sub-perceptual bias of `--glass-tint-source` toward it. Verified absent in src. Highest-leverage single betters-move (glass that absorbs the room's color).
- **BE.W-AUR-REACTIVE** (critical, Band 4) — aurora palette/focal/key-light DRIVEN off the dock's active now-playing accent (album-hue-seeded burst) + the slow living-shimmer (fold-ridge migration + spoke slow-rotation). Re-absorbs the dropped W-AUR-DOCK-TINT + AUR-W-LIVING-SHIMMER. The aurora REACTS to music/dock/pointer instead of static-with-2-new-looks — our SOTA engine BETTERS V2.
- **BE.W-CONCENTRIC-RADIUS** (major, Band 2) — a `--radius-concentric(parent, inset)` system register (the Apple containerConcentric idiom) the dock/card/sheet/chip families read, so a nested chip auto-resolves its corner off its parent. Verified NOT shipped.
- **BE.W-CLEAR-VARIANT** (major, folds into NOWPLAYING-PILL + surface-axis) — the permanent-translucent-over-media register WITH a mandatory dimming-scrim (the Apple Clear contract); the now-playing pill is genuinely translucent over the live album grid (f_035/f_055/V2). Without it our pill risks reading opaque.

## HONESTY + MECHANISM corrections
- **BE.W-DOCK-FISSION** — DROP "zero new engine" (overstated): it adds ONE new orchestrator + ONE new bridge recipe over the existing physics (morph-bridge is merge-only 2→1; fission is 1→N divergence — a new topology, not a parameterization). SPLIT into two shippable waves: **BE.W-GOO-SPLIT-PERF** (critical, born-RED budget π) — fission-bridge.css + the SVG-goo + proof:dock-goo-split with a BINDING measured real-WebKit number; and **BE.W-DOCK-FISSION** (the driver + delights). The now-playing-pill claim-c is REFUTED IN THE WAVE'S FAVOR — the collapsed dock already renders interactive children, so tappable-while-collapsed needs no new engine.
- **Goo-as-FLOOR → FLOOR-PENDING-REAL-WEBKIT + VT-fall** — the 4× throttle is CDP/Chromium-ONLY (the webkit Playwright project has none; AZ's arm-c missed the strict bar). proof:dock-goo-split re-spec'd: a MANUAL real-Safari-26 Metal capture, framesOver==0 relaxed to a measured p50; the goo filter promoted from demo-resident to a LIBRARY SVG mount, re-tuned for 56px satellites. CONSTRAINT: the SVG-goo (filter:url() ancestor) CANNOT also be glass (backdrop-filter descendant) in WebKit (the SVG-filter-clips-backdrop-filter stacking failure) — the fission pieces are goo OR glass, resolved per-frame (goo during the neck, glass at rest). goo-as-FLOOR is BLOCKED-ON BE.W-VIZ-PARITY-METAL.
- **BE.W-BLOOM-UP** — add a 4th coupled channel: the destination ambient-field re-tint to the source's dominant album hue (f_009→f_010 — the bloom RE-TINTS the field, not just FLIPs geometry). useLiquidReveal.ts touches no color channel today.
- **BE.W-AUR-SATIN / BE.W-AUR-PRISM** — re-scope: the 2 mediums are the FLOOR; BE.W-AUR-REACTIVE is the betters (driven by playback/album state).
- **Promote to FLOORS** (not speculative): pointer-reactive SEAM TENSION (iOS goo necks visibly resist the pull, f_021) + PER-CONTEXT goo-SIGNATURE (search splits radially, media laterally, nav merges-inward) — each context splits with its own choreography. (The magnetic-tendril live-rerasterize stays the one perf-gated opt-in.)

## LENS-SAFARI (the most iOS-defining cue is the one Safari loses)
- **BE.W-LENS-SAFARI** — add the REAL Safari-native refraction path the plan ignored: `filter: url(#displace)` (the REGULAR filter property — feDisplacementMap IS supported in WebKit, unlike backdrop-filter:url) over a duplicated/captured backdrop layer. This is the actual cross-engine squircle edge-lensing, not just a flat-blur consolation. The floor π must do a REAL pixel rim-vs-interior getImageData readback (not inherit proof:lensing's property-only assert).
- **BE.W-SAFARI-LIQUID-AUDIT** — build the per-transition Safari-26 support matrix BEFORE the gate (@starting-style ✓26.0, animation-timeline ✓26.0, startViewTransition feature-detected ✓; verify transition-behavior:allow-discrete on .glass-reveal).

## DE-SHADCN corrected scope (the gate is ui/-only; custom/ residue is exactly 6 files)
- **BE.W-DESHADCN-SWEEP** — CORRECTED custom/ target set (6 files): selectable-chip/selectableChipVariants.ts (bare rounded-sm/md/lg vocabulary→named chip-radius), toggle-chip/index.ts (rounded-sm border), metric-badge/MetricBadge.vue:108 (outline-2 cold focus ring→.focus-ring), ScrubberTimeline .caret-value (var(--popover) flat-popover slab→glass-reveal, in a `<style>` body), hover-popover.css dead var() fallbacks, + the StackedIconGroup +N chip (named-exemption, the avatar-stack occlusion idiom). The pass-2 list conflated ui/ items (ToastClose/Toggle/GlassCarouselPager are ui/, already gate-owned).
- **BE.W-DESHADCN-GATE-WIDEN** — three real holes: (1) ADD outline-ring/outline-offset/outline-2-as-focus to the FORBIDDEN vocabulary (the gate has ZERO outline-form entry); (2) ADD a `<style>`-body arm (the gate only tokenizes class STRING attrs — the ScrubberTimeline caret residue is invisible to it); (3) RECORD the sanctioned-escape allowlist (the 10-dir viz clean-by-construction group; every re-pointed var(--ring/--accent/--popover/--input) CSS token read; the avatar-stack occlusion). + walk custom/**.

## CLAUDE.md rail-canon reconcile (the gate extends the LIVE successor, not the deleted one)
- **BE.W-DOCK-RAIL-REALIZE** — proof:rail3 IS DELETED (removed at BC 0aa16913); the gate extends **proof:dock-stack-rail** (the live successor). The doc-reconcile is TWO moves: MOVE 1 (bring-current, MANDATORY) rewrite the STALE CLAUDE.md:690-698 (§DockRail documents the retired component as live) + :677/:686-688/:113 to describe the SHIPPED DockStack; MOVE 2 re-instate the carousel as the resting mode. CORRECTION: demo/composables/useContextualDockLayers.ts EXISTS (the README-only claim was about a hypothetical LIBRARY composable) — the useDockContextSilhouette MINT is still warranted (the silhouette descriptor map is net-new) but the premise is corrected.

## Convergence ledger UPDATE
- **Pass 3 (~85%):** the adversarial challenge corrected the betters-bar systematic gap (5 betters-waves re-instated), the no-new-engine honesty, the goo budget (FLOOR-PENDING + VT-fall + library mount + the WebKit stacking constraint), the LENS-SAFARI real-displace path, the de-shadcn custom/ exact-6 set + 3 gate holes, the CLAUDE.md reconcile (proof:dock-stack-rail not the deleted proof:rail3). Now ~35 distinct waves (33 + 2 from the FISSION split + the 5 re-instated − folds). 11 true-distinct criticals.
- **Pass 4 (next):** re-challenge the CORRECTED plan (does it now clear the betters-bar + paint-realizability + dedup?) + deepen the betters-waves design (the per-context goo-signature, the ambient-hue mechanism, the aurora reactivity seam) → target ~95% → then develop the per-wave specs.
