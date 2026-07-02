# DOCK — SOTA research (KS-B · lane DOCK researcher)

**Date** 2026-07-01 · **HEAD** `29f280c8` (tranche/BG) · **Scope** research-only; feeds `KS-DOCK.md`
(the F3-band keystone). Cites corpus `file:line`; names/links SOTA. Fences: 4.10 W-DOCK-INPLACE-MORPH
VERBATIM-protected; DOCK_SPRING `{0.32,0.7}` byte-frozen (R6); write only this file.

Lane waves this grounds: **4.1** W-DOCK-ENGINE-UNIFY · **4.3** W-DOCK-CUT (verify) · **4.4** W-DOCK-DECOMPOSE ·
**4.5** W-DOCK-FISSION-WIRE · **4.6** W-DOCK-PERSISTENT-CUT · **4.7** W-DOCK-CAP-SCROLL-FADE ·
**4.9** W-SHELL-DOCK-DRY · **4.10** W-DOCK-INPLACE-MORPH (VERBATIM) · **8.x** W-SIRI-DOCK-CAPABILITY ·
**4.11** W-DOCK-STORY-MODULARIZE.

---

## 1. The hallmark delineated — what the dock IS

The dock is glass-ui's **protagonist**: ONE glass mass that re-flows shape between contexts and never
re-mounts. The bar a stranger recognizes the library by is **liquid CONTINUITY** — a control cluster that
collapses to a warm-cream circle, blooms open center-out, splits transport off its core through a goo neck,
re-seats as a standing accessory, and (BG) blooms a live Siri island — all on ONE orchestrator, ONE FLIP
spine, ONE spring family, every frame compositor-only over a reserved footprint (CLS=0). Not N
independently-correct facilities: ONE living organism. The reference read is Apple Music iOS-27
(`docs/tranches/BD/viz/fleet2/dock-sequence-hallmark.md:11-24`): `nav → media → split → subdock →
minimize → search`, the glass drinking whatever album is behind it RIGHT NOW.

The corpus already proves this steady-state per node; the disease the RESPEC audit named is the
**over-articulated skeleton** — 5 SpringProgress engines, a 711-line `GlassDock.vue`, an unbounded per-swap
FLIP measure that seizes on width (`dock-core/GOLDEN.md:33-62`). KS-DOCK's job: COLLAPSE to one engine,
one decomposed god-module, one bounded morph, plus the ONE endorsed ADD (Siri) — without touching the
identity (DOCK_SPRING, 4.10).

---

## 2. SOTA research — findings, ADOPT / REJECT, links

### 2.1 Apple's dock lineage — the descend/morph choreography

- **macOS magnification field + genie.** Dock magnification is a continuous interpolation *field* over pointer
  distance (a bell curve, not per-icon toggles); genie is a row-wise linear interpolation between window edges
  with bezier x-matching ([Harshil Shah, "Recreating the macOS Genie Effect"](https://harshil.net/blog/recreating-the-mac-genie-effect/);
  [ui-layouts Mac Genie](https://www.ui-layouts.com/components/mac-genie)). **ADOPT the principle, REJECT the
  literal effect:** the *field-over-a-continuous-parameter* idea is exactly our `--dock-t` scalar driving the
  whole geometry cascade (box·pad·gap·tab·glyph) — one parameter, N derived channels. The genie's per-row
  mesh warp is REJECTED (not compositor-safe; a topology warp the platform can't interpolate — our V↔H
  occlusion is the honest transposition, `dock-sequence-hallmark.md` / `dock-core/GOLDEN.md`).
- **iOS 26 → 27 tab-bar/dock.** Tab bars SHRINK on scroll-down to focus content, fluidly EXPAND on scroll-up;
  the Dock/icons/widgets are multi-layer Liquid Glass; iOS 27 REDUCED default transparency + re-integrated
  Search back into the tab row ([Apple Newsroom 2025-06-09](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/);
  [Wikipedia · Liquid Glass](https://en.wikipedia.org/wiki/Liquid_Glass); [Macworld](https://www.macworld.com/article/3145504/ios-26-gave-us-liquid-glass-now-ios-27-will-make-it-fluid.html)).
  **ADOPT:** scroll-directional collapse/expand is our `useScrollChrome`→fission + collapse verbs; the search
  re-integration validates 4.5/search-terminus staying IN the cluster (not a corner satellite). The reduced
  default transparency is a KS-GLASS concern, not dock.
- **Siri in the Dynamic Island (iOS 27).** The island is the live-activity surface; iOS 27 activates Siri by
  swipe-down-from-top-center, and the island is Apple's canonical *live audio-reactive glass ornament*
  ([Bee Bulletin · iOS 27](https://beebulletin.com/ios-27-wwdc-2026-new-features-siri-gemini-liquid-glass/);
  Macworld above). **ADOPT as the Siri-island north-star (8.x):** an island that BLOOMS a waveform surface
  from the dock frame, audio-reactive, warm-not-teal. **REJECT** any dependence on Apple's proprietary
  descend/retract timing (undocumented) — we drive it on `useDockSpring` + the ONE FLIP spine, our own clock.

### 2.2 Container-morph engineering — FLIP at scale, interruptible, topology

- **Motion (motion.dev) layout animations** are the SOTA reference for interruptible FLIP: real elements
  animated on transforms, interruptible mid-flight, non-blocking pointer, `layoutId` shared-element morph
  (one element's exit feeds the next element's enter). Critically, Motion documents that **View Transitions
  can't be interrupted, block interaction, and scale poorly with many elements** — so it queues incoming VTs
  behind the running one ([Motion · Layout Animations](https://motion.dev/docs/react-layout-animations);
  [Motion · animate-view](https://motion.dev/docs/animate-view)). **ADOPT (huge):** this is direct evidence
  for 4.10's real-V↔H-morph replacing the VT-crossfade — VT is the wrong tool for the interruptible dock
  morph; a transform-FLIP is interruptible and cheap. It also validates 4.1's velocity-continuous re-seat
  (re-press mid-collapse reverses on the LIVE (pos,vel), the iOS interruptible contract).
- **GSAP Flip** and **Material ContainerTransform** confirm the pattern industry-wide (measure→invert→play,
  shared-container morph) ([GSAP Flip](https://gsap.com/docs/v3/Plugins/Flip/);
  [MaterialContainerTransform](https://developer.android.com/reference/com/google/android/material/transition/MaterialContainerTransform)).
  **ADOPT the discipline, REJECT the unbounded ratio:** our seizure root cause is a per-swap `from/to` ratio
  with a floor-but-no-ceiling that races content layout (`dock-core/GOLDEN.md:52-62`). The GOLDEN cure — a
  **ratio-FREE convex blend of two POSITIVE measured endpoints, size clamped `clamp(0,t,1)`, overshoot routed
  to an orthogonal volume-preserving squish** (`GOLDEN.md:81-146`) — is the mathematically-bounded FLIP. This
  is the single most important adopt for 4.1/4.10.
- **The topology-change problem (V↔H).** No platform continuously interpolates a mismatched-topology
  silhouette (flex column→row + two-axis size). **ADOPT the occlusion strategy:** hide the reflow inside a
  crossfade/goo-merge at the occluded midpoint (`dock-sequence-hallmark.md`; `dock-core/GOLDEN.md`) — but 4.10
  (VERBATIM) upgrades the DEFAULT from VT-crossfade to a real transform-morph where topology allows, occluding
  only the genuine mismatch. REJECT fighting the limit with a clip-path morph (AX.W42 binding limit).

### 2.3 Fission / fusion — one control splitting into many (metaball/goo)

- **SVG metaball goo** is a two-step static filter: `feGaussianBlur stdDeviation≈9` smudges overlapping alpha
  into one mass, `feColorMatrix ×~18 −~7` snaps it back to a hard edge at the threshold; animate only
  `transform` on the circles, keep the filter static ([Animation Patterns · Metaball](https://animationpatterns.art/animations/gooey-blob-metaball-filter/);
  [CSS-Tricks · Gooey](https://css-tricks.com/gooey-effect/); [Kyle Howells · iOS Shape Morphing](https://ikyle.me/blog/2022/creating-cool-ui-shape-morphing)).
  **ADOPT — already shipped correctly:** `useDockFission.ts` + `fission-bridge.css` (552L) +
  `GooFilter` mount ONE `filter: url()` on a static sRGB graph — the Safari-safe path (regular `filter`,
  NOT `backdrop-filter: url()`, WebKit bug 245510). 4.5 W-DOCK-FISSION-WIRE re-points onto the unified engine;
  the filter graph is byte-untouched. **REJECT** any `backdrop-filter: url()` fission (WebKit-breaker) and any
  per-frame `stdDeviation` animation (repaint storm; the M5-deterministic choice — aspect is `f(t)` only).
- **GlassEffectContainer merge model.** Apple: near glass elements MERGE and a cluster samples ONE backdrop
  coherently, never glass-on-glass stacking (`apple-awwwards-sota.md:75,174`). **ADOPT:** the dock cluster
  (core + carved transport + island) shares ONE backdrop sample and merges at the seams — the fission goo IS
  this merge run in reverse. Reinforces 4.6 (persistent cut — the carved piece re-seats as ONE mass member).

### 2.4 Award-site navigation docks — pill navs, magnetic hovers, context docks

- Awwwards' dock/pill/magnetic corpus ([Dock Navigation](https://www.awwwards.com/inspiration/dock-navigation-bram-naus-portfolio-website);
  [Magnetic hover](https://www.awwwards.com/inspiration/magnetic-hover-inette); [ReactBits Pill Nav](https://reactbits.dev/components/pill-nav);
  [Best of Navigation](https://www.awwwards.com/awwwards/collections/the-best-of-navigation/)) reads as: a
  floating pill, a magnetic/elastic active indicator that GLIDES + squishes between items, hover magnetism
  toward the pointer. **ADOPT the elastic-indicator + magnetism vocabulary** (we already own it —
  `useTabIndicator` glide+squish on `--spring-snappy`; the dock's `--dock-control-active` lift). The award
  bar is CHOREOGRAPHED not decorative. **REJECT pointer-magnetism on the dock CONTROLS** as a default — it
  fights the roving-tabindex hit model and the WCAG target floor; keep it a demo-only garnish if at all
  (proportion fence). The award-craft lesson for the demo (4.11) is: the dock story reads as ONE staged
  organism, not a parts bin.
- **Context-aware docks** (the dock changes facets by route) — this is our `useContextualDockLayers` /
  `railContext` / `<DockStack mode="facets">` (BE.W-DOCK-RAIL-REALIZE, per-facet `--glass-accent` chromatic
  rim). **ADOPT — shipped**; KS-DOCK confirms the facet rim reads the CONTEXT hue (presets-in-consumers).

### 2.5 Dock a11y — roving tabindex, expand announcements, touch floors

- WAI-ARIA toolbar pattern: ONE tab stop (`tabindex="0"` on the active, `-1` on the rest), arrow keys move +
  activate the adjacent enabled item, Home/End jump, disabled-skip, wrapping ([W3C APG Toolbar](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/);
  [MDN toolbar role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/toolbar_role);
  [Adobe Spectrum roving-tabindex](https://opensource.adobe.com/spectrum-web-components/tools/roving-tab-index/)).
  WCAG 2.5.8 target size 24px min / 44px recommended ([UXPin keyboard patterns 2026](https://www.uxpin.com/studio/blog/keyboard-navigation-patterns-complex-widgets/)).
  **ADOPT — mostly shipped, but a CENSUS is owed:** the GlassDock root is presentational (no role;
  `aria-expanded` on the TRIGGER child, per CLAUDE.md dock-aria contract); the switcher rail carries roving
  tabindex + axis-derived arrows; controls floor at `max(…, --dock-control-floor)` (WCAG 2.5.5). The a11y
  fact KS-DOCK should HARDEN: (a) the collapse/expand announcement seam survives the engine-unify (4.1) —
  `aria-expanded` still binds the exposed `expanded` state after 5→1 SpringProgress collapse; (b) the Siri
  island (8.x) announces via `role="status"` / `aria-live` (the island IS a live-activity surface); (c) the
  fission-carved transport keeps ONE tab-stop group, not two competing rovers. **REJECT** putting `aria-expanded`
  on the presentational root (axe `aria-allowed-attr`) — the corpus already avoids this; keep it.

### 2.6 Spring-driven chrome — alive without stealing attention

- Spring params = stiffness (snap) / damping (bounce suppression) / mass (weight+overshoot); get them right
  and it "feels alive, not robotic"; but "use in moderation — overuse leads to distraction and bloat"
  ([Maxime Heckel · spring physics](https://blog.maximeheckel.com/posts/the-physics-behind-spring-animations/);
  [Josh Comeau · spring physics](https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/)).
  **ADOPT — this IS our doctrine:** the driver-vs-observer carve (`dock-core/GOLDEN.md:190-195`) — the DRIVER
  motions (collapse/expand, V↔H, fission split) carry cartoon punch/anticipation; content-carousel/observer
  SNAPS stay on the calm `dock` spring, NEVER bounce. This is "alive without stealing attention" made
  mechanical. The per-spring `--spring-<name>-duration` clock (each spring's own 2%-settle) is the
  never-truncate discipline. **REJECT** minting a new spring for the dock — DOCK_SPRING `{0.32,0.7}` is
  FROZEN (R6); the cartoon PUNCH rides a SEPARATE one-shot `--ease-cartoon-punch` `linear()` (a bezier-tier
  token, NOT a SPRING_PRESETS row — the ≤10% spring invariant + the monotone-spring-can't-anticipate fact,
  `dock-core/GOLDEN.md:170-201`). Anticipation needs a sub-origin dip a damped spring cannot give; that is the
  one place the dock steps OFF the spring, and it does so on a volume-preserving squish channel that cannot
  change the footprint.

---

## 3. Corpus grounding (build on; never re-derive) — the disk reality

| Fact | Location | KS-DOCK implication |
|---|---|---|
| 5 SpringProgress engines to unify → `useDockSpring` | 4.1 row; `composables/` has `dockMorphContext`, `useDockOrientationMorph`, `useDockFission`, `useLayerTransition`, `useDockState` | ONE orchestrator; DOCK_SPRING frozen |
| `GlassDock.vue` = **711 lines** (god-module) | `GlassDock.vue:711` (ratchet #`GlassDock.vue:711`) | 4.4 decompose <500; F6.5 structural |
| `ladder.css` 527→470, `shell.css` **510** | `src/styles/dock/shell.css` (510L) | 0.7 carve + F6.5 CSS carves |
| unbounded per-swap FLIP ratio seizes width | `dock-core/GOLDEN.md:33-62`; `layers.css` (427L), `dockMorphMeasure.ts` | ratio-free convex blend (§2.2) |
| goo-fission shipped Safari-safe | `useDockFission.ts`, `fission-bridge.css` (552L), `morph-bridge.css` (172L) | 4.5 re-point onto unified engine, filter byte-untouched |
| `useDockContextSilhouette` = SOLE `setSilhouette` writer; drained at 4.3 CUT | 4.3 row; `useDockContextSilhouette.ts` | DELETE after Siri (8.x); no silhouette reader survives |
| ℱ brand + Fourier-egg persistent controls to cut | 4.6 row | source-absent verify |
| two shell docks (Bottom/Sidebar) → `useShellNavDock` | 4.9 row; `useDockShellProps.ts` | DRY, landing-semantics build-proof; #9 in 4.10 precond chain (PROTECT) |
| `useDockItemDrag`, `useDockHold`, `useDockMorphWindow`, `railProjection` (pure) | `composables/` | KEEP (fit, live-verified — `GOLDEN.md:71-78,148-166`) |
| Siri reached via `.glass-dock-frame`/`#rail`, NO new subpath | 8.x row; SYNTHESIS §2.4 | `SiriWaveform` demo-private (luma-sampler precedent) |
| DOCK_SPRING `{0.32,0.7}` frozen; 4.10 verbatim | protected set §4; SEED §protected | no retune, no scope alter |

---

## 4. First-principles hooks per assigned wave (what the SOTA SHARPENS)

- **4.1 ENGINE-UNIFY.** GOLDEN: 5→1 is genuinely a UNION not a fork — KEEP `morph.css` plate/pad interp on
  `--dock-expand-t`, the 3-state hit contract, `SpringProgress`, fission/hold/drag; RE-INVENT only the broken
  measure pipeline (`GOLDEN.md:148-166`). SOTA adds: the unified `useDockSpring` must be **velocity-continuous
  interruptible** (Motion §2.2) — a re-press mid-collapse reverses on live (pos,vel). E4 collapse-balloon
  protector PRESERVE (reds-on-revert). DOCK_SPRING frozen.
- **4.3 DOCK-CUT (verify).** Sequenced AFTER Siri (8.x) so no silhouette reader survives; SOLE-owner delete
  (10.5 must not double-own). Pure verify — SOTA is the a11y census (§2.5): confirm no rover orphaned by the cut.
- **4.4 DECOMPOSE.** god-module carve to <500 + colocation; SOTA (Motion/FLIP) says the single-writer of the
  morph scalar is the load-bearing contract — decompose along ENGINE seams (measure/spring/hit/reserve), one
  writer each, not arbitrary line-count splits.
- **4.5 FISSION-WIRE.** Re-point onto `useDockSpring`; goo graph byte-untouched (§2.3). The fission IS the
  GlassEffectContainer merge run backward — the carved piece stays ONE mass member.
- **4.6 PERSISTENT-CUT.** Source-absent (ℱ + Fourier egg). Clean break, no alias.
- **4.7 CAP-SCROLL-FADE.** plate-clearance geometric guard + `useFadingScroll` soft edge (dual-path native
  `scroll()` + JS fallback, single-writer). iOS-27 scroll-directional collapse (§2.1) is the reference read.
- **4.9 SHELL-DOCK-DRY.** two shell docks → `useShellNavDock`, landing-semantics build-proof; PROTECT the
  4.10 precond chain. GlassEffectContainer: both shells sample ONE backdrop model.
- **4.10 INPLACE-MORPH (VERBATIM — do not alter scope/mechanism/preconds).** A keystone may only ELABORATE
  execution: SOTA CONFIRMS the direction — real transform-FLIP V↔H replaces the VT-crossfade + goo-filter +
  synthetic-dual-DOM (Motion: VT is non-interruptible/blocking/poor-at-scale, §2.2), occluding ONLY the
  genuine topology mismatch. M2/M4 in-situ shell morph. Precond `4.1 + 4.9` protected.
- **8.x SIRI-DOCK-CAPABILITY.** ONE endorsed ADD as a DOCK CAPABILITY via `.glass-dock-frame`/`#rail` — NO new
  subpath, NO `/api` entry (SYNTHESIS §2.4). ONE `proof:siri`, 4 arms (blur-engage · island bloom ·
  waveform+teal-navy-PURGE(warm) · dock-integration). Island = live-activity surface → `role="status"`/live
  (§2.5); blooms from the dock frame on `useDockSpring` + the ONE FLIP spine, our clock (NOT Apple's timing,
  §2.1). `SiriWaveform` demo-private until a real 2nd consumer.
- **4.11 STORY-MODULARIZE (F7).** demo split; `liquid-playground.vue` protection assert PASSES;
  `dock-gallery.vue` content-label cleanup. Award-craft (§2.4): the dock story stages ONE organism.

---

## 5. Gestalt bar (the acceptance language KS-DOCK inherits)

- **√φ proportion** — collapsed circle is a true 1:1 (never oval); `--dock-pad-block` φ-rung; expand grows
  center-out from the summary control.
- **Animation laws** — DRIVER motions carry anticipation (sub-origin dip) + overshoot on `--ease-cartoon-punch`
  + volume-preserving squish; OBSERVER snaps stay calm on DOCK_SPRING (never bounce). Per-spring settle clock,
  never truncated. Compositor-only on a reserved footprint (CLS=0). PRM → `--motion-weight: 0` zeroes squish/
  overshoot/anticipation/stagger; the morph still CONFIRMS.
- **Technicolor cartoon-punch** — the warm-cream plate (R>G>B, never gray) over a live colorful field; the
  cartoon offset cast slides OPPOSITE the morph (paper-morphism made kinetic).
- **Continuity (the dock's own bar)** — ONE glass mass, ONE orchestrator, ONE FLIP, ONE spring family; every
  transition is a survivor-FLIP + detach + bloom, never a `v-if` / `<component :is>` re-mount / `transition: all`.
- **Safari-first absolute** — goo = `filter: url()` sRGB; morphs = compositor `transform`/`opacity`/`filter`/
  `clip-path`, NEVER `backdrop-filter: url()`.

---

## 6. Fences honored

4.10 VERBATIM (this report only elaborates execution rationale, alters no scope/mechanism/precond) ·
DOCK_SPRING `{0.32,0.7}` frozen, no retune · Siri as dock capability, no new subpath/api entry · goo filter
graph byte-untouched · foreign-tree fence (siblings read-only) · wrote ONLY this file.

### Sources
- [Apple Newsroom · Liquid Glass (2025-06-09)](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/)
- [Wikipedia · Liquid Glass](https://en.wikipedia.org/wiki/Liquid_Glass) · [Macworld · iOS 27 fluid](https://www.macworld.com/article/3145504/ios-26-gave-us-liquid-glass-now-ios-27-will-make-it-fluid.html) · [Bee Bulletin · iOS 27/Siri island](https://beebulletin.com/ios-27-wwdc-2026-new-features-siri-gemini-liquid-glass/)
- [Motion · Layout Animations (interruptible FLIP)](https://motion.dev/docs/react-layout-animations) · [Motion · animate-view (VT limits)](https://motion.dev/docs/animate-view) · [GSAP Flip](https://gsap.com/docs/v3/Plugins/Flip/) · [Material ContainerTransform](https://developer.android.com/reference/com/google/android/material/transition/MaterialContainerTransform)
- [Animation Patterns · Metaball goo](https://animationpatterns.art/animations/gooey-blob-metaball-filter/) · [CSS-Tricks · Gooey](https://css-tricks.com/gooey-effect/) · [Kyle Howells · iOS shape morphing](https://ikyle.me/blog/2022/creating-cool-ui-shape-morphing)
- [Harshil Shah · macOS Genie](https://harshil.net/blog/recreating-the-mac-genie-effect/) · [ui-layouts · Mac Genie](https://www.ui-layouts.com/components/mac-genie)
- [Awwwards · Dock Navigation](https://www.awwwards.com/inspiration/dock-navigation-bram-naus-portfolio-website) · [Awwwards · Magnetic hover](https://www.awwwards.com/inspiration/magnetic-hover-inette) · [ReactBits · Pill Nav](https://reactbits.dev/components/pill-nav) · [Awwwards · Best of Navigation](https://www.awwwards.com/awwwards/collections/the-best-of-navigation/)
- [W3C APG · Toolbar (roving tabindex)](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/) · [MDN · toolbar role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/toolbar_role) · [Adobe Spectrum · roving-tabindex](https://opensource.adobe.com/spectrum-web-components/tools/roving-tab-index/) · [UXPin · keyboard patterns 2026](https://www.uxpin.com/studio/blog/keyboard-navigation-patterns-complex-widgets/)
- [Maxime Heckel · spring physics](https://blog.maximeheckel.com/posts/the-physics-behind-spring-animations/) · [Josh Comeau · spring physics](https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/)
