# BE tranche — SEED (iOS-27 liquid-glass alignment · the DOCK as hallmark · de-shadcn form)

**Status:** tranche-DEVELOPMENT (planning-only, convergence loop). Pass 4 complete. See `WAVE-LIST.md` for the finalized ~30-wave dedup.
**Convergence:** ~93% (pass 4 = re-challenge confirmed the betters-corrections held (dock/glass/aurora/bloom clear bettered; cards sharpened); the WAVE-LIST body RECONCILED — corrections folded into bands; 3 sharpenings added (squircle clip-path floor, pill-album-tint FLOOR, pill-tabbar fusion); 38 true-distinct waves / 11 criticals; mechanisms designed on verified substrate; BE/BF split recommended. Pass 5 final confirm → 100% → develop per-wave specs).
**Predecessor:** BD (converged 2-consecutive-clean; the post-cut discharge tranche). BE is the NEXT, larger tranche — the iOS-27 alignment + the dock hallmark + de-shadcn, a NEW-capability tranche (BD was discharge; this is build).
**Inputs:** the two iOS-27 reference videos (V1 Apple Music dock/glass, V2 aurora album-art) + the Maps liquid-glass-card screenshot + 21-lens pass-1 fleet (frame-dissection · web-research · suite-audit · plan-brainstorm). Raw findings: `audit/pass-1-findings.json`; gap map: `PASS-1-GAPMAP.md`.

---

## Headline thesis

**BE makes the DOCK a living organism and the whole suite iOS-27 liquid glass — Safari-first, jubilant, and free of every atom of default shadcn/reka form.** The reference is unambiguous: the dock is not a bar — it **goo-splits** into 2–3 free-floating glass pieces (music chip · now-playing pill · search circle) with a visible metaball bridge, **reconfigures form AND function per context**, and **blooms cards to fullscreen**. We own every substrate (one-scalar SpringProgress morph · the CSS-goo merge-bridge · a real GPU smin metaball in goo-blob · useLiquidReveal FLIP · the rail) but have never wired the **split**, the **contextual silhouette**, the **now-playing pill**, or the **card-bloom** — and our merge-bridge is merge-only. That is the centerpiece gap, proposed independently ~10× by the fleet.

Four creeds, in priority order:
1. **THE DOCK IS THE HALLMARK** — best every facility (split/fission · contextual morph · layering · the full rail) + new expressive niceties + suffuse jubilance into every morph.
2. **iOS-27 LIQUID GLASS, SAFARI-FIRST** — every liquid transition Safari-compatible (no backdrop-filter:url() reliance; the SVG-goo + layered-gradient lensing proxies). Match or better Apple's material.
3. **DE-SHADCN FORM** — reka/shadcn for FUNCTION only; every atom of their default FORM abrogated to our glass-ui design language (audited per-component, gate-locked).
4. **JUBILANCE** — fun/alive motion (the goo-neck specular sweep, snap-recoil, anticipation, the celebration burst, haptic detents) — tasteful, PRM-safe, never the retired disco.

---

## The bands (skeleton — pass 2 dedups + details + adds the de-shadcn sweep)

### Band 1 — THE DOCK HALLMARK (the centerpiece)
- **BE.W-DOCK-FISSION** (critical) — `useDockFission`/`<DockSplit>` + a SPLIT-direction metaball bridge: generalize `morph-bridge.css` from merge-to-one-center to detach-N-toward-targets, per-piece `--split-t` off the ONE SpringProgress, Safari-safe SVG-goo (feGaussianBlur+feColorMatrix threshold), real DOM glass pieces landing at named rects, bidirectional re-merge, PRM=instant. (dedups ~10 goo-split proposals)
- **BE.W-DOCK-CONTEXT-SILHOUETTE** (critical) — declarative `context→silhouette` map (bar | bar+pill | split{pill,circles}) the ONE orchestrator reads; the dock reconfigures form+function per route/state, FLIP-ing surviving controls to new slots.
- **BE.W-DOCK-NOWPLAYING-PILL** (critical) — the collapse-to-media-pill register (the split's center piece): art-chip + ScrollingText title + live transport, tappable while collapsed.
- **BE.W-METABALL-BRIDGE2** (major) — the general N-seam stretch-and-snap (per-seam `--neck-t`, snap-back overshoot via useLiquidFlex), the goo material composing the glass-floating registers.
- **BE.W-DOCK-RAIL-REALIZE** (critical) — fully ship the rail (our novel feature) as the iOS-27 contextual context-strip: the divider-seam floating facet carousel done right (fan/overrun/contextual-switch, box-inviolate), reconciled with DockStack + the goo-split (one engine).
- **BE.W-DOCK-TINTED-CHIP** (major) — circular tinted-glass dock-control (per-instance `--glass-accent` hue + the bronze/gold metal quad), the Maps facet-chip face.
- **BE.W-DOCK-JUBILANCE** (major) — the cross-cutting dock delight: goo-neck specular sweep, fission ripple, merge-splash, magnetic-snap settle, breathing-pill idle, the parallax album-thumb (84 ideas in the gap map; pass 2 selects + sites them).

### Band 2 — LIQUID GLASS MATERIAL (iOS-27, Safari-first)
- **BE.W-LENS-SAFARI** (critical) — a cross-engine edge-lensing floor (layered radial/conic gradients + saturate/contrast rim, NO backdrop-filter:url()); the lens-@supports hardened so Safari never loses the working blur.
- **BE.W-TINTED-CHIP** (critical) — `<GlassChip :tone>` colored-glass disc: a new disjoint `--glass-fill-tint`/`--glass-fill-strength` axis tinting the plate bg (oklab), distinct from the rim accent.
- **BE.W-SHEET-TRANSLUCENT** (critical) — `--glass-opacity-sheet` + Drawer/Sheet onto a translucent bottom-sheet reading the backdrop-through (the Maps frosted sheet) + the mask-feathered crown.
- **BE.W-DEEP-CEILING** (major) — lift the deep tier to the Apple saturate(1.8) blur(20px) ceiling behind a recorded throttle number.
- **BE.W-SQUIRCLE-COVERAGE** (major) — extend the superellipse corner-shape coupling to card/chip/dock controls.
- **BE.W-LENS-PRISM** (major) — the bounded chromatic-aberration rim (the `--glass-edge-dispersion` token onto the lens).

### Band 3 — TABS (iOS-27 tab-bar)
- **BE.W-DOCK-TAB-BAR** (critical) — a `<DockTabBar>` composing useTabIndicator+useLiquidFlex for ONE traveling dark-glass selection capsule; icon-over-label cell; accent-recolor coupled to the capsule arrival.
- **BE.W-TAB-IOS-PLATE** (major) — re-register the SegmentedTabs active indicator as a recessed accent-tinted glass capsule.

### Band 4 — AURORA (album-art generative)
- **BE.W-AUR-SATIN** (critical) — `medium:"satin"` (uMedium==8, WebGL2+WGSL): the silky light-bending fold (Heavy Rotation) — fold-height from the domain-warp, directional sheen, OKLCh.
- **BE.W-AUR-PRISM** (critical) — `burst` mode: angular palette-sampling (atan2 around uFlowFocal) → the prismatic radial station bursts.
- **BE.W-AUR-PRESETS** (major) — demo presets matched to the V2 album cards (presets-in-consumers).

### Band 5 — BLOOM / FLIP TRANSITIONS
- **BE.W-BLOOM-UP** (critical) — `useBloomUp(sourceRef, destRef)` shared-element FLIP (the album-card→fullscreen bloom): ElementMorph forward + coupled blur-decongest + crossfade, Safari-safe, PRM-snap.
- **BE.W-BACKDROP-SETTLE** (major) — an opt-in backdrop-blur settle leg on .glass-reveal.

### Band 6 — CARDS / BUTTONS / ICONS (the Maps card + controls)
- **BE.W-ICONCHIP-GLASS** (critical) — a `glass` register on IconChip (frosted disc + tone tint, backdrop reads through) + a `filled` opaque-tone-disc register (auto-contrast glyph).
- **BE.W-GLASS-CONTROL** (major) — `<GlassControl shape=circle|pill>` (subpath /glass-control): the floating circular glass button (Maps controls) lifted off the dock context.
- **BE.W-SEARCH-WELL** (minor) — `<GlassSearchPill>` recessed well (the Maps/Spotlight search).

### Band 7 — SAFARI (the MUST-be-Safari floor)
- **BE.W-SAFARI-CAPTURE** (major) — drive real Safari 26 Mac + iOS + the bundled webkit Playwright over the liquid routes; the binding cross-engine π.
- **BE.W-SAFARI-LIQUID-AUDIT** (major) — `proof:safari-liquid` asserting each new transition (goo-split/pill/bloom/rail) degrades gracefully; the support matrix.

### Band 8 — JUBILANCE (the creed, cross-cutting)
- **BE.W-CELEBRATE-BURST** (major) — `useCelebrationBurst` one-shot earned glass-petal radial bloom, PRM-static.
- **BE.W-HAPTIC-COUPLE** (major) — `useHaptic` (navigator.vibrate, feature-detected) wired to snap/detent/completion events.
- **BE.W-ANTICIPATE-FOLLOW** (minor) + **BE.W-ALIVE-IDLE** (minor) — anticipation pre-dip + follow-through; the sub-perceptual idle breath.
- (the goo-split/bloom/tab/aurora delight folds INTO their owning band waves; this band is the standalone primitives.)

### Band 9 — DE-SHADCN FORM ABROGATION (pass-2 per-component sweep)
- **BE.W-DESHADCN-SWEEP** (critical) — the per-component audit (all 92 packages: 43 ui/ + 49 custom/), every residual default reka/shadcn FORM token (bg-popover/bg-accent/border-input/default-ring/bare-radius/default-palette) re-pointed to our glass-ui register or sanctioned-escape allowlisted. Seeded: ~42 residual refs across ~16 files.
- **BE.W-DESHADCN-GATE** (critical) — `proof:de-shadcn` (extend `proof:glass-cohesion` or net-new) that reds on ANY default reka/shadcn form off the allowlist — the regression lock (the proof:no-gray precedent).
- (pass 2 runs the sweep + sizes the real residue vs sanctioned escapes.)

### Band 10 — FOLD / DISPOSITION (the no-silent-drop machine + BD absorb)
- **BE.W-FOLD-LEDGER** — absorb BD's HELD/FIRED long-tail + the iOS-27 gap map; every chronic re-dispositioned.
- **BE.W-VIZ-PARITY-METAL** (absorb BD) — the real-Metal-GPU parity for goo-blob + aurora + the new goo-split bridge.
- **BE.W-GESTALT-ROSTER-BE** — grow proof:ba-gestalt to the BE tree (dock-split/pill/rail/card-bloom/icon-chip-glass/aurora-artwork roster rows; the per-wave paint discipline).
- **BE.W-DISPOSITION-RESTAMP** — re-stamp the book/archived rows reStampedAt:BE.

---

## Convergence ledger
- **Pass 1 (~50%):** broad sweep — 21 lenses, 131 raw waves (32 crit/58 maj/41 min), 84 jubilance ideas; the dock-fission hallmark + the band structure established. GAPS REMAINING: dedup is provisional, the de-shadcn per-component sweep unrun, the dock-fission MECHANISM (metaball-split topology + the contextual state machine) undetailed, the Safari substrate decisions (lensing proxy, goo-split filter region/budget) open, the jubilance-idea siting open, the gate design open, the per-component de-shadcn residue unsized.
- **Pass 2 (next):** the per-component de-shadcn sweep + dedup/validate the skeleton + deepen the dock-fission mechanism + the Safari substrate decisions + the gate design → target ~75%.
