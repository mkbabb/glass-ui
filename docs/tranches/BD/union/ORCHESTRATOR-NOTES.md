# BD union — orchestrator grounding notes (the binding spec deltas from the media + the user's edicts)

These are the load-bearing spec points the orchestrator extracted directly from the user's words + the reference media (frame-by-frame). Every union wave must honor them.

## The LIQUID-TAB indicator morph (user-verbatim, the SegmentedTabs headline)
On tab selection the active indicator runs a **5-phase liquid morph** (NOT a rigid slide):
1. **Grow** in a liquid fashion (the indicator inflates from the current tab).
2. **Blob OVERSHOOT** — it becomes *slightly BIGGER than needed* (a metaball over-inflation).
3. **Transition/travel** to the destination tab (the swollen blob glides).
4. **Settle in liquid** at the destination (a soft liquid settle, ζ<1).
5. **Shrink** slightly to the *appropriate* tab-selection size (de-inflate to fit).
Compose `useLiquidFlex` (volume-preserving squish) + the spring; this EXTENDS today's SegmentedTabs indicator (which squishes + releases-at-arrival) with the grow-overshoot-then-shrink-to-fit envelope. Compositor-only, Safari-safe, PRM-snap. → folds into the tabs/indicator wave (W-TABS-LIQUID / SegmentedTabs `useTabIndicator`).

## The DOCK = the now-playing pill (the goo-split source)
V1 frames: the **glass now-playing mini-dock** (album thumb + title + pause + search) floats over the album-art **aurora**; it is the element that **goo-splits off the core dock to form the abstract bottom sub-dock**. The dock's glass material reads translucent over the live aurora field. → the now-playing dock + goo-split-to-sub-dock is a first-class dock facility (compose useDockFission + the now-playing register).

## GLASS FACILITY FOR EVERY ELEMENT (user mandate)
The library must ship a **glass register for EVERY element** — not just cards/docks: buttons, icons, inputs, tabs, dropdowns, chips, controls, etc. The glass audit must enumerate every component and assert it has a glass facility (or a recorded reason it stays opaque — the AX.W54 allowlist). This is a coverage law for the union.

## SAFARI/WEBKIT IS ABSOLUTE
**ALL glass AND all goo/metaball MUST work in Safari.** Every liquid move (backdrop-filter glass, SVG goo threshold, displacement, the morph/fission/bloom) ships Safari-first with a recorded degrade fall; no Chromium-only path. The goo metaball (SVG filter url() + color-interpolation-filters=sRGB) is the WebKit-safe path; the lens displacement backdrop-filter:url() is the WebKit-GAP (bug 245510) — record the fall.

## REFERENCE SITES TO BEST (Safari-compatible)
- **birthdaycolor.com** — analyze the glass/goo/color technique; identify how our glass idioms BEST it; fold into the glass audit (every-element glass coverage). MUST work in Safari.
- V2 = Apple generative aurora (match/better). Maps screenshot = the liquid-glass card (frosted card + circular gradient icon-chips + glass search-pill + floating frosted controls).

## NEW DEFECTS folded 2026-06-22 (user screenshots, every-page)
- **CORNER ALIASING on EVERY glass card (systemic, not just the dock).** Every storybook card's rounded corner shows jagged stair-stepping at the border-radius — the `backdrop-filter`/saturate halo is NOT clipped to the `border-radius` (the lost `b538dec7` `clip-path: inset(0 round var(--radius))` fix). This is a LIBRARY-WIDE glass-quality defect on the `.glass-*` tiers, not a demo issue. → **W-CORNER-AA WIDENED**: clip the backdrop-filter layer to the corner radius across ALL glass tiers (the `.glass-material`/`.glass-card` rule), an `@supports`/`isolation`-safe fix, Safari-verified (the corner AA must hold on WebKit too). Binding π: a both-mode edge-AA getImageData scan of a glass card corner reads SMOOTH (no stair-step fringe), every tier, both engines. The headline glass-fidelity fix — it bites every surface.
- **Superfluous GIANT greyed-out placeholder icon on every storybook page (demo-chassis).** The storybook hero/preview empty-box (the dashed-border box on the section-landing/hero cards, e.g. Foundations) renders an OVERSIZED faint section-icon watermark — superfluous, on every page. DEMO-chassis defect (audit StoryHero/StoryPage/SectionPreviewCard/the empty-preview fallback). → **W-DEMO-ICON-PURGE [NEW]**: audit the storybook chassis + REMOVE the superfluous giant greyed-out placeholder icons (the empty-preview-box watermark) — the preview falls back to the blurb/a real mini-render, never a giant faint icon. Demo-only (zero src/ paint); folds into the demo-design/breadth band. Gate: a census asserting no oversized low-opacity placeholder icon in the enrolled chassis.

## THE CONGRUENCE BAR (gestalt-hardening pass)
Every wave must be CONGRUENT to: the design language, **KISS + DRY**, component/composable/sub-component encapsulation (feature-dir colocation), **default-shadcn abrogation** (de-shadcn FORM), no-legacy, paint-first/no-source-green-close, presets-in-consumers, compositor-only, Safari-first. The gestalt pass hunts inter-wave dissonance + development friction and refines/prunes/adds/re-writes to congruence.
