# BE tranche — RECONCILED WAVE LIST (develop-ready, post pass-4)

_38 true-distinct shippable waves · 11 criticals · 10 bands. Convergence ~93%. The PASS-1/2/3/4 corrections are FOLDED INTO the bands here (no appendix); the per-wave SPEC development (goal · starting-state · born-RED→GREEN gate · binding π · jubilance manifest) is the final step._
_Recommended PARTITION (pass-4 dedup): **BE** = Band 1 (dock hallmark, the user's named centerpiece) ships first; **BF** = Bands 2–10 (glass/aurora/cards/safari/jubilance/de-shadcn/fold). One coherent loop, two cuts — decision deferred to develop-start._

## Band 1 — THE DOCK HALLMARK (→ tranche BE)
- **BE.W-GOO-SPLIT-PERF** (critical) — `fission-bridge.css` generalizes `morph-bridge.css` (159L, merge-2-plate→detach-N-toward-slots) + the **library** SVG-goo `<filter>` mount (today demo-resident in morph-showcase.vue) re-tuned for 56px satellites. The WebKit constraint: a piece is **goo OR glass per-frame** (the SVG-filter-clips-backdrop-filter stacking failure) — goo during the neck, glass at rest, swapped at a sub-perceptual --split-t threshold (no pop). Gate `proof:dock-goo-split`: device-free source (one-scalar · filter:url()-not-backdrop · clipped region · contain:paint) + a **MANUAL real-Safari-26-Metal** budget capture (the 4× throttle is CDP-only; framesOver==0 relaxed to a measured p50). BLOCKED-ON BE.W-VIZ-PARITY-METAL.
- **BE.W-DOCK-FISSION** (critical) — `useDockFission` + `<DockSplit>`/`<DockFissionPiece>`: ONE new orchestrator (clones the dockMorphContext one-spring loop for a 0→1 `--dock-split-t`) + per-piece DIRECTION-VECTOR + context PROFILE (registered like a MorphTarget). NOT "zero new engine" — one orchestrator + one bridge recipe over the existing physics. Owns the goo-split delights (snap-recoil, neck-wobble, bud-off squish). + the **per-context goo-SIGNATURE FLOOR** (search=radial, media=lateral peel, nav=inward merge — the per-context direction-vector) + the **pointer-reactive SEAM-TENSION FLOOR** (the neck resists the pull, f_021 — clip-path-inset reading usePointerVelocityField, capped, PRM-off, NO per-frame rerasterize). Gate `proof:dock-fission`.
- **BE.W-DOCK-CONTEXT-SILHOUETTE** (critical) — MINT `useDockContextSilhouette` (the descriptor map is net-new; NB demo `useContextualDockLayers` EXISTS — the README-only claim was about a hypothetical *library* composable). Declarative `DockSilhouetteDescriptor[]` (bar | bar+pill | split{pill,circles} | search); FLIP surviving controls (ElementMorph). **+ the pill↔tabbar FUSION morph** (f_055/f_065/f_047 — the now-playing pill DOCKS DOWN and merges INTO the 5-tab bar as ONE continuous glass plate, not a pill floating above). Gate `proof:dock-context`.
- **BE.W-DOCK-NOWPLAYING-PILL** (critical) — net-new `<DockNowPlaying>`: art-chip + `<ScrollingText>` + live transport (SF-symbol play↔pause morph), tappable-while-collapsed (the collapsed dock already renders interactive children — no new engine). The convergence point of 4 betters-waves: consumes `surface="clear"` (CLEAR-VARIANT) + **the PILL-PLATE-tints-to-album-dominant-hue FLOOR** (V2 f_001/f_018/f_022 repeated cue — wire `--glass-fill-tint` off the AMBIENT-HUE sample of the album art) + drives the aurora (AUR-REACTIVE DockStage seam). Gate `proof:nowplaying-pill`.
- **BE.W-METABALL-BRIDGE2** (major) — the N-seam stretch-and-snap (per-seam `--neck-t`, snap-back via useLiquidFlex); shares the FISSION goo substrate. Owns the neck specular-sweep FLOOR.
- **BE.W-DOCK-RAIL-REALIZE** (critical) — re-instate the AZ.W-RAIL3 floating tinted-glass facet carousel (regressed to the macOS hover-stack DockStack at BC). Reconcile DockStack + the carousel + the fission goo into ONE engine; box-INVIOLATE; per-facet `--glass-accent`. Gate `proof:dock-rail-realize` **EXTENDS proof:dock-stack-rail** (NOT the DELETED proof:rail3). + the CLAUDE.md doc-reconcile (MANDATORY move-1 bring-current of the STALE :113/:677/:690-698 DockRail prose → DockStack; move-2 re-instate the carousel).
- **BE.W-DOCK-TINTED-CHIP** (major) — the dock-control consumer of `--glass-fill-tint` (Maps facet-chip face + bronze/gold metal quad). Per-facet accent-hue FLOOR.
- **BE.W-DOCK-JUBILANCE** (major) — fission ripple · merge-splash gold-coalesce · the magnetic-tendril (the ONE perf-gated opt-in). Gate `proof:jubilance` (compositor-only + PRM-safe + disco-fenced).

## Band 2 — LIQUID GLASS MATERIAL, Safari-first (→ BF)
- **BE.W-LENS-SAFARI** (critical) — two-tier `.glass-lens`: the cross-engine FLOOR is the REAL Safari refraction path — `filter: url(#displace)` (the REGULAR filter, feDisplacementMap IS WebKit-supported) over a **captured/duplicated backdrop layer** (the architecture: a `background-clip`/`element()`-or-duplicated-DOM backdrop the filter displaces) + the directional rim + conic `--specular-angle` glint + `--glass-edge-dispersion` fringe; the `backdrop-filter:url()` feDisplacement stays the Chromium-only enhancement INSIDE the @supports gate (WebKit bug 245510). Gate `proof:lensing-safari`: a REAL pixel rim-vs-interior getImageData readback (not proof:lensing's property-only assert).
- **BE.W-SQUIRCLE-COVERAGE** (critical) — CORRECTED mechanism: `corner-shape:superellipse` is ITSELF Chromium-only (radius.css:75-78). The cross-engine Safari FLOOR is a **clip-path superellipse path** (verified absent) on card/chip/dock-control + grouped-cluster cards; `corner-shape` stays the Chromium PE enhancement. Gate π: a real Safari corner-pixel getImageData proving the superellipse silhouette paints. (f_073 Control-Center clusters read most broken without it.)
- **BE.W-AMBIENT-TINT** (critical) — extend `useGlassBackdropLuminance` (the highest-leverage betters-move): a 12-bucket chroma×alpha-weighted OKLCh hue histogram as a FREE rider over the EXISTING 32×32 getImageData loop (no 2nd canvas/pass; reuse the value.js cssToOklch leaf — proof:single-color-core fence) → `--glass-ambient-hue` + a sub-perceptual `--glass-tint-source` bias. Gray backdrop → null hue (correct).
- **BE.W-TINTED-CHIP** (critical) — `<GlassChip :tone>` the net-new `--glass-fill-tint`/`--glass-fill-strength` plate-bg axis (oklab; DISTINCT from rim `--glass-accent`). Gate `proof:glass-fill-tint`.
- **BE.W-SHEET-TRANSLUCENT** (critical) — `--glass-opacity-sheet` (~0.74); Drawer/Sheet backdrop-through + mask-feathered crown. Gate `proof:sheet-translucent`.
- **BE.W-CLEAR-VARIANT** (major) — `surface="clear"` surface-axis 4th member: `--glass-opacity-clear` (~0.55-0.62, below dialog 0.68) STRUCTURALLY coupled to a mandatory `::`-scrim (the Apple Clear legibility contract); the now-playing pill consumes it.
- **BE.W-CONCENTRIC-RADIUS** (major) — `--radius-concentric(parent, inset)` system register (Apple containerConcentric); the grouped-squircle-cluster cards-betters reads it.
- **BE.W-LENS-PRISM** (major) — WIRING (`--glass-edge-dispersion` EXISTS glass-fx.css:223) the chromatic-aberration rim onto the lens; READS the LENS-SAFARI floor (sequence after).
- **BE.W-DEEP-CEILING** (major) — the glass-deep 18-20px Apple ceiling (absorbs BD.W-DEEP-PUSH) behind a recorded throttle number.

## Band 3 — TABS (→ BF)
- **BE.W-TAB-IOS-CAPSULE** (major) — FOLD (DockTabBar + SegmentedTabs): ONE iOS recessed-accent glass-capsule register, dock + segmented arms, composing useTabIndicator+useLiquidFlex. Owns icon-bloom-on-select + accent-suffuse-sweep + capsule-goo-pull.

## Band 4 — AURORA album-art (→ BF)
- **BE.W-AUR-SATIN** (critical) — `medium:"satin"` (uMedium==8, WebGL2+WGSL-lockstep): silky light-bending fold (Heavy Rotation), fold-height from the domain-warp, directional sheen; default byte-identical, GL-fence. Owns satin sheen-on-play + pointer-as-key-light.
- **BE.W-AUR-PRISM** (critical) — `burst` (uMedium==9): angular palette around uFlowFocal → the prismatic station bursts. [+ AUR-PRESETS rider, demo].
- **BE.W-AUR-REACTIVE** (critical) — the BETTERS (the 2 mediums are the floor; this reacts): a consumer-side DockStage seam (presets-in-consumers, NOT a library edit) re-seeds aurora `nuclei[].color` toward the album hue + nudges `flow.focal*` toward the now-playing pill + the living-shimmer (fold-ridge migration + spoke slow-rotation, bounded shader term). Cross-band dep on NOWPLAYING-PILL (the active accent) — sequence after Band 1.

## Band 5 — BLOOM / FLIP (→ BF)
- **BE.W-BLOOM-UP** (critical) — `useBloomUp(sourceRef, destRef)` shared-element FLIP (ElementMorph+springTimingFunction); 3 compositor channels + the **4th color channel on the DESTINATION FIELD** (destRef, not the blooming surface — preserves the compositor-only floor): the field re-tints to the source's dominant album hue (f_009→f_010). Safari-safe + PRM-snap; /motion off-root. Gate `proof:bloom-up`.
- **BE.W-BACKDROP-SETTLE** (major) — opt-in backdrop-blur settle leg on .glass-reveal. Owns per-channel color-bloom.

## Band 6 — CARDS / BUTTONS / ICONS, the Maps card (→ BF)
- **BE.W-ICONCHIP-GLASS** (critical) — REAL gap (icon-chip.css NO backdrop-filter): `glass` register (frosted disc + oklab tone-tint) + `filled` register (opaque tone + value.js safeAccentColor auto-contrast). + the **grouped-squircle-cluster cards-betters** (the f_073 Control-Center idiom: N controls fused into ONE frosted squircle group with concentric nested radii + shared rim-lensing — composes SQUIRCLE + CONCENTRIC). Gate `proof:iconchip-glass`.
- **BE.W-GLASS-CONTROL** (major) — `<GlassControl shape=circle|pill>` (/glass-control): the floating circular glass button (Maps controls); ExpandableContainer's corner buttons consume it. [+ SEARCH-WELL rider].

## Band 7 — SAFARI floor (→ BF)
- **BE.W-SAFARI-CAPTURE** (major) — the webkit Playwright project EXISTS (playwright.config.ts:117, NO ANGLE/throttle by construction); testMatch-WIDEN to the 5 liquid specs (fission/pill/bloom/rail/lens) + `proof:safari-liquid` (the per-transition Safari-26 support matrix: @starting-style ✓26.0, animation-timeline ✓26.0, startViewTransition feature-detected; verify transition-behavior:allow-discrete) + degrade-gracefully-per-transition.

## Band 8 — JUBILANCE primitives + lock (→ BF)
- **BE.W-CELEBRATE-BURST** (major) — `useCelebrationBurst` (net-new): one-shot earned glass-petal radial bloom, PRM-static + chip-bloom-in cascade.
- **BE.W-HAPTIC-COUPLE** (major) — `useHaptic` (navigator.vibrate, net-new, feature-detected) wired to snap/detent/completion.
- **BE.W-ANTICIPATE-FOLLOW** (minor) + **BE.W-ALIVE-IDLE** (minor) — anticipation pre-dip + follow-through; the breathing-pill idle FLOOR (±1.5%, offscreen-paused).
- (BE.W-JUBILANCE-GATE folds into proof:jubilance under DOCK-JUBILANCE.)

## Band 9 — DE-SHADCN FORM (gate exists, residue narrow) (→ BF)
- **BE.W-DESHADCN-SWEEP** (major) — the CORRECTED custom/ exact-6 set: selectableChipVariants.ts:50-52 (rounded-sm/md/lg→named chip-radius), toggle-chip/index.ts:51 (rounded-sm border), MetricBadge.vue:108 (outline-2 cold ring→.focus-ring), ScrubberTimeline `.caret-value` (var(--popover) flat-popover slab→glass-reveal, in a `<style>` body), hover-popover.css dead var() fallbacks, StackedIconGroup +N chip (named-exemption). (The ui/ close-X/separator/Toggle/ToastClose residue is the existing gate's domain.)
- **BE.W-DESHADCN-GATE-WIDEN** (major) — WIDEN proof:no-shadcn-default (3 verified holes): outline-form vocabulary (outline-ring/-offset/-2-as-focus — ZERO entry today) + a `<style>`-body arm (tokenizes only class strings today) + the custom/** walk + the sanctioned-escape allowlist (the 10-dir viz clean-by-construction group; re-pointed var(--ring/--accent/--popover/--input) reads; the avatar-stack occlusion).

## Band 10 — FOLD / DISPOSITION (→ BF)
- **BE.W-FOLD-LEDGER** — absorb BD's HELD/FIRED tail + an EXPLICIT BUILD|DEFER|RETIRE verdict for every dropped betters-wave + the DECIDED-OUT record (scroll-reactive-dock-condense — useDockSearch.ts:8 "the dock NEVER auto-collapses on passive scroll").
- **BE.W-VIZ-PARITY-METAL** (absorb BD) — real-Metal + real-WebKit parity for goo-blob + aurora + the goo-split bridge (the GOO-SPLIT-PERF blocker).
- **BE.W-GESTALT-ROSTER-BE** — proof:ba-gestalt +9 roster rows.
- **BE.W-DISPOSITION-RESTAMP** — re-stamp book/archived reStampedAt:BE.

---
## Convergence ledger
- Pass 1 ~50% · Pass 2 ~78% · Pass 3 ~85% · **Pass 4 ~93%** (re-challenge confirmed the betters-corrections held; dock/glass/aurora/bloom clear "bettered"; 3 sharpenings folded (squircle clip-path floor, pill-album-tint FLOOR, pill↔tabbar fusion); the body RECONCILED — corrections folded into bands; 38 true-distinct waves / 11 criticals; mechanisms designed on verified substrate; the BE/BF split recommended).
- **Pass 5 (next, final):** one confirming challenge on THIS reconciled body (no new criticals → 100%) → then develop the per-wave SPECS (goal · starting-state · born-RED→GREEN gate · binding π · jubilance manifest · the BE/BF cut decision).

---
# PASS-5 FINAL DECISIONS (the convergence resolutions)

## DECISION 1 — ONE TRANCHE (BE), not the BE/BF split (REVERSES pass-4)
Ship all waves as ONE coherent loop. Rationale (pass-5 ch5-partition, verified): BC=96 waves / BB=63 / BD=43 all shipped as single tranches that converged 2-consecutive-clean; a ~44-wave BE is SMALLER than every recent cut. The split would pay the `gates.mjs --run full` siblings-absent close-battery + the irreversible-tag/publish/provenance path + the proof:ba-gestalt roster re-earn TWICE. The cross-band deps (NOWPLAYING-PILL→AUR-REACTIVE, LENS-SAFARI→LENS-PRISM, AMBIENT-HUE→pill-album-tint) become an EXECUTION-DAG ordering constraint, not a tranche boundary. CONDITIONAL carve-out: IF BE.W-VIZ-PARITY-METAL's manual real-Safari-26-Metal capture proves the goo-split budget a HARD un-relaxable miss at execution, the goo-as-FLOOR carves to a VT-fall (the morph-showcase precedent) — a wave-level decision, not a tranche split.

## DECISION 2 — BE ABSORBS the still-owed BD waves (BD was PLANNING-ONLY, never executed)
BD converged 2-consecutive-clean but was NEVER built (git-verified). Its still-owed discharge work must be absorbed into BE so nothing is lost (the no-silent-drop discipline):
- **BE.W-ARIA-ORIENTATION-GUARD** (critical, NEW Band-9-conformance) — absorb BD.W-ARIA-ORIENTATION-GUARD: the ONE genuine undischarged a11y DEFECT (SegmentedTabs.vue:406 unconditional aria-orientation on role="group") + proof:aria-orientation (the marker-presence fence, no content-hash). The BC cut shipped it unfixed.
- **BE.W-PRECEPT-CANON** (major, Band 10) — absorb BD's precept-canon (close-discipline · submodule-skip-policy · live-arm-CI-grace) — the BC cut lessons that live ONLY in commit bodies + the LESSONS-LEARNED backfill (AY→BE) + the CLAUDE.md count/doc resync.
- **BE.W-FOLD-LEDGER** (already listed) — ABSORBS BD's full ~50-item FOLD-LEDGER + the iOS-27 gap-map dispositions; every BD HELD/FIRED row carried with its disposition; the demo-modernization folds into the iOS-27 demo work where it overlaps.
- VIZ-PARITY-METAL + DISPOSITION-RESTAMP already in BE Band 10.

## DECISION 3 — the terminal cut
- **BE.W-CUT** (critical, Band 10, sequenced LAST) — the user-gated 4.x→(4.2/5.0) publish: a live-paint gestalt PASS (proof:ba-gestalt all-GREEN on fresh captures) + the CI-accurate `--run full` siblings-AND-submodule-absent close-battery + the irreversible tag + the provenance publish + (user-authorized) the slides redeploy. NO source-green close (the BC anti-disease law).

## DEVELOP-PREP (folded at per-wave-spec writing)
- Each band line gains its `proof:` gate INLINE (the full des-gate-final manifest in pass-4-findings.json is promoted into the per-wave specs).
- BE.W-FOLD-LEDGER carries the explicit BUILD|DEFER|RETIRE verdict per dropped/considered item (incl. the popover speech-bubble-tail minor: BUILD a thin reka-Arrow→.glass-reveal-tailed register, or DEFER-with-rationale).
- Dedup truth: 37 distinct iOS-27 IDs + ~3 absorbed-BD waves + BE.W-CUT ≈ **~44 waves, ONE tranche BE**.

## Convergence ledger FINAL
- Pass 1 ~50% · Pass 2 ~78% · Pass 3 ~85% · Pass 4 ~93% · **Pass 5 ~96%** (betters CLEAR ~96% every-domain-bettered; paint CLEAR ~96% all-mechanisms-buildable; develop-readiness design-sound; partition DECIDED one-tranche; BD-absorption DECIDED; the CUT wave added). The design is CONVERGED. The remaining 4% is the mechanical develop step: WRITE the per-wave specs (goal · starting-state · the inline gate · the binding π · the jubilance manifest) for the ~44 waves — no further design.
- **NEXT: develop the per-wave SPECS** (docs/tranches/BE/waves/*.md), the BD precedent. The convergence loop is complete.
