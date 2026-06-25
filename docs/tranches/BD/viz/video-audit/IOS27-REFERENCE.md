# IOS27-REFERENCE — the consolidated target glass-ui must MATCH or BETTER

Synthesizer + ruthless challenger pass over the four BD video audits
(`v1-tabs-glass`, `v2-dock-a`, `v3-dock-b`, `v4-dotflow`) + the sibling
`liquid-video` Control-Center audit. North star: the **iOS-27 Liquid Glass**
language — transmissive glass · vibrant accents · rounded · liquid spring with
inertia/weight/bounce/squish · audacious type. The user's bar is absolute:
glass-ui must be **fully aligned or BETTERED** than every reference here.

The brief named six closing waves by a broader-BD vocabulary (`W-DOCK-HUB-API`,
`W-DOCK-MORPH-FAMILY`, `W-IOS27-SUFFUSE`, `W-LIQUID-ENTRANCE-GENERAL`,
`W-AURORA-METALLIC`, `W-DOTFLOW-REBUILD`). Those are the BD reference-set names;
the on-disk BD wave folder carries the executed/canon waves. This doc bridges:
each **TARGET** → the **glass-ui CURRENT** → the **GAP** → the **WAVE** (named to
the brief vocabulary, cross-pointed to the on-disk engine) → the **hardened
ios27 fidelity bar** the wave must clear.

---

## 1. The IOS27-REFERENCE TARGET (the consolidated behaviour set)

The union of binding behaviours across all five clips, de-duplicated:

| # | Behaviour | Clip(s) | The ios27 signature |
|---|-----------|---------|---------------------|
| T1 | **Dock bi-directional morph** (unify ↔ collapse ↔ shrink) | v3 | One spring, weight, squish, no-overshoot exit; topology-aware |
| T2 | **Sub-dock goo-SPLIT (fission)** — 5-tab bar → `[Library●][◀player▶][●Search]` triad on scroll, re-merge on scroll-up | v3 (HEADLINE) | metaball necks thin + snap; transport-center, nav-buds-flank (the **media** signature) |
| T3 | **Contextual form/function change** — drill-in buds a back-capsule; route changes the dock silhouette | v3 | the dock recomposes per context, not a fixed strip |
| T4 | **Tab liquid indicator** — glide + squish between slots + per-glyph scale-pop + label cross-fade + one-shot accent-flood | v3 | ~1.15× icon overshoot; crimson plate-flood on commit then clears (EFFECTS trails SPATIAL) |
| T5 | **Album / sheet bloom-up + live-behind fade-out** — pill → full sheet FLIP, page reads through a transmissive scrim, co-existing surfaces on collapse | v3, v1 | scale+fade FROM the source rect; the page is LIVE behind, not a card swap |
| T6 | **Detented drawer: glass goes OPAQUE at full** — translucent at peek/half → near-solid at full; scrim + page-scale coupled to snap fraction | v1 (HEADLINE) | opacity/blur tracks the snap-t; full sheet IS the content surface |
| T7 | **Transmissive glass that BLEEDS the backdrop HUE** — dock/capsule picks up purple/teal as vibrant cards pass behind it | v2 (HEADLINE) | deep blur (Apple ~20px) + dynamic hue-tracking tint, not luminance-only |
| T8 | **Nested glass-on-glass** — control pucks on the capsule plate, element-level tinted | v2, v3 | a control tier forward of the plate over a vibrant backdrop |
| T9 | **Backdrop-blur ENGAGE** — an overlay (Control Center) pulls over the live app, ramping backdrop blur 0→deep, app reads through | v3, liquid-video | the blur radius animates with the sheet translate |
| T10 | **Liquid ENTRANCE general** — modules squish-grow (≈0.88 vol-preserving) + fade + spring overshoot + backdrop-engage, with a subtle stagger; SQUISH/FADE-OUT inverse on dismiss | liquid-video (HEADLINE) | the squish is the GRACE; applied to EVERY surface, not just overlays; Safari-safe |
| T11 | **Living vibrant backdrop** — each card a breathing animated mesh-gradient; generative aurora quality | v2 | drifting/breathing color field, not a JPEG |
| T12 | **Marquee now-playing title** — constant-velocity ticker | v2 | the ONE sanctioned non-spring (EFFECTS steady-state) |
| T13 | **Momentum carousel** — fling + calm overdamped snap (NO bounce on content snap) + peek margins | v2 | momentum YES, snap-bounce NO; ±neighbour peek always visible |
| T14 | **Notification capsule entrance/exit** — transmissive bloom-in, fast fade-slide-out no-overshoot | v2 | `.glass-reveal` materialize |
| T15 | **Audacious display type** — ~70px tight ~1.05 leading, -1.5% Apple tracking | v2, v3 | the sqrt-φ ladder |
| T16 | **Persistent floating media-dock** — detached island, pinned bottom-center, transmissive, never scrolls | v2 | margins all round; album-art + marquee + transport |
| T17 | **dot-flow surpass-target** — a density-gradient halftone dot-field (dense edges → clear center behind content) that subtly breathes/shifts | v4 | the Cowork/Anthropic backdrop glass-ui must approach-but-FAR-SURPASS |

---

## 2. WAVE DELTAS — per target: gap + closing wave + hardened ios27 bar

### T1 — Dock bi-directional morph → **W-DOCK-MORPH-FAMILY** (on-disk: shipped)
- **CURRENT:** `dockMorphContext.ts` + `useLayerTransition` drive the collapse/expand+V↔H morph on the ONE `--dock-morph-t` scalar over a compositor-transform with a RESERVED footprint (CDP Layout-flat), PRM sync-seat, vertical chrome morphs on the same `--dock-expand-t`. `DOCK_SPRING {response:0.32, ζ:0.7}`.
- **GAP:** none structural — the engine matches the reference morph feel.
- **HARDENED ios27 BAR:** the morph SPATIAL legs must read the **weight + low-overshoot settle** of v3's dock (ζ≈0.7 → a hair of give, not a bouncy snap); the exit/collapse leg must NOT overshoot past gone (P2). Verify the squish is present (a collapsing dock compresses, not a flat scale). **CONVERGENCE: ~95%** (calibration-only; the gate is the `proof:ba-gestalt` dock verdict on a fresh BD capture).

### T2 — Sub-dock goo-SPLIT (fission) → **W-DOCK-MORPH-FAMILY / the scroll-fission assembly** (on-disk: `useDockFission` shipped, NOT shell-wired)
- **CURRENT:** glass-ui ships the **entire engine** — `useDockFission` (n-ary detach, ONE `SpringProgress`/`DOCK_SPRING`, `--split-dx/dy`/`--neck-t`, `useLiquidFlex` tanh recoil capped LOW, `usePointerVelocityField` seam-tension, PRM sync-seat, bidirectional) + `DockGooFilter.vue` (Safari-safe sRGB `filter:url()` metaball) + `fission-bridge.css` (necks + specular-sweep + ripple + merge-splash) + `DOCK_SPLIT_SIGNATURES` (search=radial / **media=lateral** / nav=inward) — the **media** signature is EXACTLY the v3 f037–f040 lateral transport-anchored peel.
- **GAP (integration, THE single largest gap):** `useDockFission` is consumed **only in demo stories** (`liquid-playground`, `DynamicIslandCall`, `AppleMusic`) — **NOT wired to the live nav-dock** and **NOT scroll-driven**. `useScrollChrome` (collapse-state) and `useDockFission` (split) exist as separate primitives never **composed**. The reference's defining move (scroll → 5-tab dock goo-splits to the triad → scroll-up re-merge) is **unassembled**.
- **WAVE → `BD.W-DOCK-SCROLL-FISSION`** (highest value in the set): compose `useScrollChrome` → `useDockFission` on the real shell `GlassDock`, opt-in `:fissionOnScroll`, the **media** signature, persistent center transport + flanking nav buds. ONE engine, no fork.
- **HARDENED ios27 BAR:** (a) the necks must **stretch + thin to a metaball waist then snap** (not a fade-disconnect) — the goo filter mount must read at the split midpoint; (b) the three resting capsules each carry their OWN margin + transmissive glass (box-INVIOLATE); (c) bidirectional + interruptible (a mid-split scroll-reverse re-seats velocity-continuous); (d) PRM → instant topology swap, zero neck frames. Gate: a π frame-series proving the waist + the three-capsule rest + the re-merge, BOTH modes. **CONVERGENCE: ~80% (engine 100%, assembly 0%).**

### T3 — Contextual form/function change → rides **W-DOCK-SCROLL-FISSION** + `useDockContextSilhouette`
- **CURRENT:** `useDockContextSilhouette` (route→facet detach/merge resolver) models which controls bud/merge per context, feeds `useDockFission`. Primitive-complete.
- **GAP:** same integration gap — demoed, not shell-wired.
- **HARDENED ios27 BAR:** drill-in (Albums) must bud a **circular back-capsule** top-left while the dock re-expands un-fissioned; route change recomposes the silhouette LIVE. **CONVERGENCE: ~80%** (rides T2's assembly).

### T4 — Tab liquid indicator → **the tabs waves / `BD.W-DOCK-TAB-INDICATOR`** (propose)
- **CURRENT:** `useTabIndicator` (SegmentedTabs) is the glide+squish liquid indicator on `--spring-snappy` at `--tab-indicator-duration`, volume-preserving (cap ≤1.08), center-anchored, axis-derived — **aligned** for the tab-strip. IconChip has a spring-clock scale(0.85→1) reveal.
- **GAP:** the **nav-dock tab row** (`DockTabButton`) does NOT carry the indicator (grep: 0 `useTabIndicator` refs) — dock tabs are individual `--dock-control-active-bg` plate swaps. There is **no gliding indicator that travels between dock tabs**, **no per-glyph scale-pop on activation**, **no momentary accent-flood** on commit (v3 f006 crimson flood).
- **WAVE → `BD.W-DOCK-TAB-INDICATOR`:** bring the SAME `useTabIndicator` glide+squish into the nav-dock tab row + per-glyph activation scale-pop (compose IconChip reveal on `data-active` flip) + an OPT-IN one-shot commit accent-flood (`--dock-accent-flood-t` plus-lighter wash off the selected `--glass-accent`, PRM-static, the fission-ripple precedent). ONE engine, no fork.
- **HARDENED ios27 BAR:** the icon overshoots ~1.15× then settles; the label cross-fades (not hard-cut); the accent-flood is a momentary full-plate wash that **trails the SPATIAL leg** (EFFECTS after SPATIAL, v3 f006→f007) then clears; the active accent is a **consumer accent** (presets-in-consumers — the de-RED'd neutral lift is the default identity, the consumer sets `--glass-accent` + the selected glyph color). **CONVERGENCE: ~60%** (the SegmentedTabs indicator is 100%; the dock-tab port + scale-pop + flood is the gap).

### T5 — Album/sheet bloom-up + live-behind fade-out → **W-LIQUID-ENTRANCE-GENERAL** + the now-playing reconcile
- **CURRENT:** `useBloomUp` (pill→player FLIP, SAME-element album-art FLIP, field-hue warm) is wired in `AppleMusic.vue`. `Drawer mode="live-behind"` (peek/half/full snap, house `useDrawerSnap` `SpringProgress`) covers the live-behind read. `.glass-reveal` is the materialize recipe.
- **GAP (minor):** the collapse wants the page **sliding up THROUGH a transmissive scrim** (v3 f012 — two surfaces co-existing). `useBloomUp` reset is a FLIP-back; the co-existing-page read wants the `Drawer live-behind` snap path. The two should reconcile to ONE now-playing register (bloom-up open + live-behind snap-down).
- **WAVE → `BD.W-NOWPLAYING-RECONCILE`** (demo-composition, Pass-E) — fold `useBloomUp` + `Drawer live-behind` into one demo register; no new library engine.
- **HARDENED ios27 BAR:** the album art is the **FLIP element** (same DOM node scales between pill-rect and sheet-rect — not a cross-fade of two arts); the scrim is **brown-tinted transmissive** (page reads through), NOT flat black; on collapse the underlying page is **already painting above** as the sheet descends. **CONVERGENCE: ~85%** (engines ship; reconcile is composition).

### T6 — Detented drawer glass goes OPAQUE at full → **W-DRAWER-DETENT-GLASS** (propose)
- **CURRENT:** `--glass-drawer-t` drives ONLY `translateY` (`DrawerContent.vue`). `drawer.css` paints a FIXED `--glass-bg-overlay`/`--glass-blur-overlay` for ALL detents — the glass tier is **constant** across peek/half/full. `shouldScaleBackground` is a DEAD documented prop (declared + doc'd, nothing reads it — zero `scale(`/scrim-coupling).
- **GAP (HEADLINE for v1):** no `--glass-drawer-t → --glass-level` (opacity) coupling, no scrim coupling, no page-scale. A glass-ui full sheet still bleeds the backdrop through the list — the OPPOSITE of iOS.
- **WAVE → `BD.W-DRAWER-DETENT-GLASS`** (fold in `W-DRAWER-SCALE-SCRIM`): couple `--glass-drawer-t` into `--glass-level` (+ `--drawer-scrim` opacity + page-behind `scale(lerp(1,0.95,t))`) on the EXISTING `--glass-level` machinery — peek/half stay translucent `glass-overlay`, fraction→1 lerps toward the opaque escape (solid `--card`+blur(0), the W54 `.glass-opaque` endpoint via the ONE level path). Compositor-safe, PRM-carved.
- **HARDENED ios27 BAR:** π that the composited sheet `background-color` α is **translucent at peek/half AND near-opaque (α→~1) at full**, BOTH modes, born-RED on the current fixed-tier sheet; a born-RED bite that `shouldScaleBackground` currently animates ZERO pixels. **CONVERGENCE: ~50%** (the snap engine + detent ladder + spring ship; the fraction→glass/scrim/scale coupling is absent — and `shouldScaleBackground` is a live dead-knob lie).

### T7 — Hue-bleeding transmissive glass → **W-DOCK-DEEP-TRANSMIT** (propose) + **W-AURORA-METALLIC** sibling
- **CURRENT:** strong machinery — `--glass-blur-dock` (9px calm) + saturate companions + W-DARK-MATERIAL luminosity-lift + `useGlassBackdropLuminance` (sampled observer writing `--glass-backdrop`/`-luma`, wired ON for the dock). `.glass-deep` (16px/sat 1.5) exists. `--glass-accent` per-instance chromatic-rim axis (BB.W-GLASS-ACCENT) exists.
- **GAP (HEADLINE for v2):** (a) the dock blur is calm-9px; a media dock over vibrant art is the **deep** case (Apple ~20px) — the dock **does not opt into** `.glass-deep`; (b) the observer reads **luminance ONLY, not chroma/hue** — so the dock darkens over a bright card but does NOT pick up the card's HUE (purple/teal bleed). The hue-tracking transmission is a chroma sample the observer omits.
- **WAVE → `BD.W-DOCK-DEEP-TRANSMIT`:** (i) the floating media-dock opts into `.glass-deep` (or `--glass-blur-dock` into the 14-20px band for the media variant); (ii) extend `useGlassBackdropLuminance` to sample a **dominant-hue** term feeding the bounded `--glass-accent`/`--glass-accent-strength` (wire the SAMPLED hue into the rim+core). Reuses W-GLASS-ACCENT + the observer; no new compositing seam. G2 (nested glass-on-glass control pucks reading element-level tint) folds in.
- **HARDENED ios27 BAR:** π that the dock plate, over a purple card, resolves a **measurably purple-shifted rim/core hue** (chroma sample non-zero), and re-neutralizes as the card leaves; the blur is in the 14-20px band over the media backdrop; the control pucks compose the element-level oklab tint (`--glass-bg-floating-tinted`), not the pre-baked `--glass-bg-dock`. **CONVERGENCE: ~70%** (every piece ships — `.glass-deep`, the luminance observer, `--glass-accent` — but NOT wired together; the chroma-sample term is genuinely missing).

### T8 — Nested glass-on-glass → folds into **W-DOCK-DEEP-TRANSMIT**
- **CURRENT:** the tier ladder supports it (`--glass-bg-floating` puck on `--glass-bg-dock` plate); `DockIconButton` carries the control register + `vSpecular`.
- **GAP:** small — verify the media-dock control pucks compose the element-level oklab tint so the puck reads forward over a vibrant backdrop. **CONVERGENCE: ~90%.**

### T9 — Backdrop-blur ENGAGE → **W-BACKDROP-BLUR-ENGAGE** (propose, small)
- **CURRENT:** glass blur is static per tier; `.glass-deep` `--glass-depth` lerps blur+saturate between calm and deep endpoints. W-LIQUIDHOVER grain-engage cross-fades OPACITY, not backdrop-blur radius.
- **GAP:** no **`backdrop-filter` blur-ENGAGE transition** primitive — a surface ramping its backdrop blur 0→deep as an overlay pulls over the live app (v3 f068/f069, liquid-video backdrop-engage channel).
- **WAVE → `BD.W-BACKDROP-BLUR-ENGAGE`:** a compositor-safe blur-engage ramp (`--glass-blur-engage-t` driving the `backdrop-filter` radius over a deep endpoint, the `--glass-depth` lerp generalized to a transition scalar), PRM-instant. The Safari fence: a per-frame `backdrop-filter` re-blur is the §7-watched cost — gate the engage to the overlay-pull window only, never a steady-state loop.
- **HARDENED ios27 BAR:** the app reads THROUGH the blur (transmissive) as it deepens, coupled to the sheet translate; the ramp is one-shot per pull (not a continuous re-blur). **CONVERGENCE: ~75%** (the deep endpoint + the lerp scalar exist; the transition-engage wiring + the Safari-cost fence is the gap).

### T10 — Liquid ENTRANCE general → **W-LIQUID-ENTRANCE-GENERAL** (the liquid-video HEADLINE)
- **CURRENT:** the grammar SHIPS — `.glass-reveal` (scale/translate on `--spring-snappy` + fade + `filter` blur-settle, transform-origin at anchor) + `useLiquidReveal` (source-rect FLIP bloom) + `useLiquidFlex` (vol-preserving X/Y squish) + `useLiquidPress`/`useDragMorph`/`useSpringPress` + the `--spring-bouncy`/`-snappy` presets with per-spring duration clocks.
- **GAP:** (1) **GENERALIZATION** — only top-layer reka overlays bloom; CARDS, CONTROLS, list-items, dock-modules, demo sub-sections do NOT get the control-center-grade entrance. (2) **GRACE** — the default `.glass-reveal` scale is subtle (≈0.95-1.0); the reference squishes more (≈0.88, clear vol-preserving deformation + overshoot). (3) **SAFARI** — the `filter` blur-settle + `linear()` spring + compositor transform/opacity must be WebKit-verified (the `backdrop-filter` per-frame re-blur is the fragile leg; the surface's OWN `filter` is safe).
- **WAVE → `W-LIQUID-ENTRANCE-GENERAL`:** a `v-liquid-enter` directive + `.liquid-enter` recipe (composing `.glass-reveal` + `useLiquidFlex` squish) that EVERY surface-class entrance opts into, with the CALIBRATED graceful squish (≈0.88 vol-preserving + snappy-bouncy overshoot, fade-coupled), PRM-carved, compositor-only, SAFARI-verified. AUGMENTS W-LIQUID-REVEAL (no re-fork); binds the drawer-content-rows entrance (v1 GAP 4) + the glassy sub-card entrance.
- **HARDENED ios27 BAR:** a π FRAME-SERIES — the entrance squishes (scale ≠ 1 mid-flight + X·Y≈1 volume-preserving) + fades (opacity coupled) + settles (spring overshoot then 1.0) on the enrolled surfaces, **BOTH engines (chromium + webkit)**; born-RED on a flat/instant/fade-only entrance; the round-control squish is the most legible (small→full); the dismiss is the SQUISH+FADE inverse with NO overshoot-past-gone. **CONVERGENCE: ~65%** (the grammar is 100% present; generalization + grace-calibration + Safari-verification is the gap — and this is the user's literal "replicate generally, Safari compatible" ask).

### T11 — Living vibrant backdrop → **W-AURORA-METALLIC** + **W-LIVING-ARTWORK** (propose, low)
- **CURRENT:** `<Aurora>` is the living-gradient engine (real fluid mesh + the `breathing` register made perceptible at BA-VJS-2 + the anisotropic-Kuwahara painterly medium at BB.W-AUR-KUWAHARA) — **arguably BETTER** than the reference per-card mesh. On-disk BD: `BD.W-AURORA-WGSL-CURL`, `BD.W-AURORA-WGSL-STROKES`, `BD.W-AURORA-KUWAHARA-MULTIPASS` push the generative quality further (the WGSL curl warp + painterly strokes + multi-pass Kuwahara).
- **GAP:** no calm per-card "living artwork" preset (one-GL-per-route budget means N live cards isn't free; the reference uses a cheap CSS/static-mesh living gradient per card).
- **WAVE → `BD.W-LIVING-ARTWORK` (LOW):** a compositor-only CSS-conic/mesh "living artwork" card backdrop (the `auroraFallbackGround` static mesh generalized to a slow PRM-static drift) so a card grid reads living without N GL contexts. Content-surface affordance.
- **HARDENED ios27 BAR (metallic/generative):** the aurora generative quality must clear the reference's drifting/breathing mesh — the curl-warp + painterly-stroke + Kuwahara waves give a richer, more painterly field than the reference's smooth mesh; W-AURORA-METALLIC (the metal-shimmer + the W-AX-METAL-GLOW catch-light over the generative field) is the **BETTER-than** lever (the reference has no metallic register). **CONVERGENCE: ~90%** on the single-surface generative (Aurora superior); ~40% on the cheap per-card living-artwork preset (a real gap, but LOW priority — content affordance, not dock).

### T12 — Marquee → ALIGNED (`<ScrollingText>`)
- **CURRENT:** `<ScrollingText>` IS the overflow-marquee, constant-velocity. **GAP: NONE.** Wire it in the media-dock. Do NOT spring-ease a ticker (the one sanctioned non-spring EFFECTS motion). **CONVERGENCE: 100%.**

### T13 — Momentum carousel → **W-CAROUSEL-CADENCE** (audit, likely no-op)
- **CURRENT:** `/carousel` (embla) momentum + snap; `PagerDots`.
- **GAP:** verify the content-carousel snap is **calm-overdamped, NOT bouncy** (Apple reserves the bouncy spring for open/morph, not carousel snap — an over-springy carousel reads cheap; the "liquid-weight universal" note must NOT push bounce onto the CONTENT-carousel snap) + peek margins set so neighbours show.
- **HARDENED ios27 BAR:** momentum YES, snap-bounce NO on the content carousel; ±neighbour peek always ~10-15% visible. RED→GREEN only if the demo over-springs. **CONVERGENCE: ~90%** (likely already calm; the audit is the gate).

### T14 — Notification capsule → ALIGNED (`.glass-reveal` + `Toast`/`Notification` + W-FEEDBACK-TONE)
- **GAP:** verify the toast default composes `surface="glass"` (transmissive) over a vibrant backdrop, not opaque. **CONVERGENCE: ~95%** (entrance/exit grammar at parity; confirm the surface axis in `proof:ba-gestalt` feedback verdict).

### T15 — Audacious type → ALIGNED or BETTERED (sqrt-φ ladder + BB.W-DISPLAY-TRACKING)
- **CURRENT:** the display ladder + the -1.5% Apple tracking + 1.05 leading. **GAP: NONE.** **CONVERGENCE: 100%+** (the mega/hero/audacious tiers exceed the reference's ~70px).

### T16 — Persistent floating media-dock → **W-MEDIA-DOCK** (propose, demo)
- **CURRENT:** `GlassDock`/`BottomDock` + `alwaysExpanded`. The floating-media-capsule SHAPE (album-art + marquee title + transport — a MEDIA dock, not a NAV dock) is NOT a first-class register; it'd be hand-composed.
- **WAVE → `BD.W-MEDIA-DOCK`** (demo, not a new component): a `demo/stories` composition (`GlassDock` + `ScrollingText` + `DockIconButton` + album-art slot) demonstrating the persistent transmissive media capsule; feeds the `proof:ba-gestalt` dock verdict.
- **HARDENED ios27 BAR:** detached island (margins all round), pinned bottom-center, persistent through scroll, transmissive over the vibrant field, with peek margins; the two-stacked-capsule (mini-player + tab-bar) is a shell composition. **CONVERGENCE: ~80%** (composition, not engine).

---

## 3. The dot-flow surpass-target → **W-DOTFLOW-REBUILD**

**The reference (v4, `f001`–`f029`):** the Cowork/Anthropic dark app surface. The
background is a **halftone DOT-FIELD** with a **radial density gradient** — dots
are **DENSE at the screen edges and corners**, thinning toward a **clear center
region behind the content** (the "What can I take off your plate?" card column
sits over a clear void). The dots are small, low-contrast, warm-grey over
near-black. Frame-to-frame the field **subtly shifts/breathes** (compare the
right-edge dot pattern across f001/f008/f022/f029 — the lattice is NOT frozen; it
has a slow, almost-imperceptible drift/twinkle). It reads as **calm, vignetted,
content-deferential** — the field FRAMES the content by receding behind it.

**glass-ui CURRENT (`DotFlowField`):** a **wave-advected STREAMLINE flow field** —
particles advected along the curl (∇⊥ψ) of a Tessendorf/Gerstner water-wave
potential (`flowField.ts` + the WGSL compute kernel). It was retopologized to a
**lattice** (gridPitch ~26px), but it remains a FLOW field — the dots RIDE the
streamlines (crests + troughs), a braided water motion. The constants carry a
warm-cream lattice + a slow large wave.

**THE GAP (genuine REBUILD, not a tune):** the reference is NOT a flow field. It is
a **density-gradient halftone lattice** with three properties glass-ui's current
viz does not express:
1. **Radial density gradient (the vignette)** — density is a function of
   distance-from-center (or distance-from-a-content-mask): dense at edges/corners,
   CLEAR behind the content column. The current viz has a uniform-pitch lattice;
   the reference's signature is the **content-deferential vignette** (the field
   RECEDES behind the content). This is the single defining miss.
2. **Calm twinkle/drift, NOT advection** — the reference dots barely move; they
   **breathe in place** (a slow per-dot opacity/size shimmer + a sub-pixel
   positional drift), not a streamline flow. The current water-wave advection is
   too kinetic for this backdrop register.
3. **Content-deferential masking** — the clear-center is keyed to where the
   content sits (a soft radial or rect mask punched out of the field), so the
   field never competes with the foreground.

**WAVE → `W-DOTFLOW-REBUILD`** (a clean break — the no-legacy law): a
**density-gradient halftone field** register on the SAME `useGpuSubstrate` leaf,
sharing the lattice topology but replacing the advection with:
- a **radial/mask density function** `d(p) = edge-falloff × (1 − content-mask(p))`
  driving per-dot presence (a dot below its density threshold is absent/faded);
- a **calm twinkle** — a per-dot phase-offset opacity+size shimmer on a slow clock
  (the `breathing` register, sub-perceptible) + an optional sub-pixel positional
  drift (NOT a flow advection);
- a **content-mask seam** — a consumer-declared clear region (radial center or a
  rect over the content column) the field vignettes around.
The water-wave streamline mode is KEPT as a SEPARATE `mode="flow"` register (it is
a real, distinct viz — the prior W-FLOWFIELD); the rebuild ADDS `mode="field"`
(the halftone vignette) as the default for the backdrop case. ONE component, two
modes (the dock-orientation `dim`-idiom discipline), no fork.

**HARDENED surpass-BAR (approach-but-FAR-SURPASS):** glass-ui must MATCH the
reference's calm vignetted backdrop AND surpass it via the levers the reference
lacks:
- **Match:** the radial density gradient (dense edges → clear center), the calm
  in-place twinkle (NOT advection), the content-deferential mask, the warm-grey
  over-near-black low-contrast palette, the WCAG-2.2.2 pause + PRM-freeze + the
  offscreen-park (the reference is a static-looping video; glass-ui's must be a
  parked-when-hidden compositor-cheap field).
- **SURPASS:** (a) the field **reacts to the pointer** (`usePointerVelocityField` —
  a local density-bloom/twinkle-burst about the cursor the reference cannot do);
  (b) the density mask can FOLLOW the live content box (a real `--content-mask`
  seam, dynamic — the reference's clear-center is baked); (c) the dots can carry
  the **brand section-color suffusion** at the edges (a faint warm-amber → the
  identity palette gradient, not flat grey); (d) WebGPU-first compute density (the
  on-disk `BD.W-VIZ-COMPUTE-DENSITY` lever) so a high-density edge lattice stays
  60fps where a video cannot interact at all.
- **Gate:** a π that the field's edge-density measurably exceeds its center-density
  (the vignette is real, born-RED on a uniform lattice), the twinkle is in-place
  (no net advection drift over N frames), the pointer-bloom reads, the content-mask
  clears, BOTH modes; the parked-when-hidden + PRM-freeze inherited from the suite.

**CONVERGENCE: ~35%** — the substrate (`useGpuSubstrate`), the lattice topology,
the pointer field, the suite discipline (pause/PRM/park) all ship; but the
DEFINING behaviour (radial density-gradient vignette + in-place twinkle +
content-mask) is ABSENT — the current viz is a kinetic water-flow, the reference is
a calm vignetted halftone. This is the largest single-viz rebuild in the set.

---

## 4. The CONVERGENCE % — overall

| Target | Convergence | Gap class |
|--------|-------------|-----------|
| T1 Dock morph | ~95% | calibration |
| T2 Dock fission | ~80% | **assembly (engine 100%, shell-wire 0%)** |
| T3 Contextual silhouette | ~80% | assembly (rides T2) |
| T4 Tab indicator | ~60% | port + scale-pop + flood |
| T5 Bloom-up + live-behind | ~85% | composition reconcile |
| T6 Drawer opaque-at-full | ~50% | **coupling absent + dead-knob lie** |
| T7 Hue-bleeding glass | ~70% | **chroma-sample term missing + deep-not-opted** |
| T8 Nested glass | ~90% | verify element-level tint |
| T9 Backdrop-blur engage | ~75% | transition wiring + Safari fence |
| T10 Liquid entrance general | ~65% | **generalization + grace + Safari (user's literal ask)** |
| T11 Living backdrop | ~90% single-GL / ~40% per-card | aurora superior; living-artwork LOW gap |
| T12 Marquee | 100% | none |
| T13 Carousel cadence | ~90% | audit |
| T14 Notification | ~95% | verify surface axis |
| T15 Audacious type | 100%+ | bettered |
| T16 Media-dock | ~80% | demo composition |
| T17 dot-flow surpass | **~35%** | **genuine REBUILD** |

**Weighted overall convergence: ~72%.** glass-ui is **assembly- and
calibration-bound, NOT primitive-bound** on the DOCK + GLASS + MOTION axes — it
ships nearly every engine the references show (fission, bloom-up, live-behind,
tab-indicator, glass tiers, the liquid-entrance grammar, the luminance observer,
the aurora generative field), and the dominant gaps are **WIRING** (T2/T3 fission
into the shell), **COUPLING** (T6 drawer fraction→glass/scrim/scale, T7 the
chroma-sample term), and **GENERALIZATION + Safari** (T10 the liquid entrance).

**The exceptions — real BUILD work, not wiring:**
1. **T17 dot-flow (`W-DOTFLOW-REBUILD`, ~35%)** — the density-gradient halftone
   vignette is a new register; the current viz is the wrong gestalt (kinetic flow
   vs calm vignette).
2. **T6 drawer opaque-at-full coupling (`W-DRAWER-DETENT-GLASS`, ~50%)** — the
   fraction→glass/scrim/scale coupling is genuinely absent, and
   `shouldScaleBackground` is a live dead-knob LIE that must be wired or removed.
3. **T7 the chroma/hue observer term (`W-DOCK-DEEP-TRANSMIT`, ~70%)** — the
   observer samples luminance only; the hue-bleed needs a dominant-hue sample
   feeding `--glass-accent`.

**The single highest-value wave: `BD.W-DOCK-SCROLL-FISSION`** (T2) — the iOS-27
dock signature (scroll → goo-split triad → re-merge) is the reference's defining
move and glass-ui is ONE composition away (the entire engine ships, only the
`useScrollChrome`→`useDockFission` assembly + the scroll-trigger on the shell dock
is missing). The single highest-EFFORT wave: **`W-DOTFLOW-REBUILD`** (T17) — the
only genuine from-scratch gestalt rebuild.

**The user's bar — fully aligned or BETTERED:** glass-ui clears or exceeds the
reference on type (T15, bettered), generative backdrop (T11, Aurora superior),
marquee (T12), the morph engine (T1), and the glass material; it must BUILD the
fission assembly (T2/T3), the drawer coupling (T6), the hue observer (T7), the
general liquid entrance (T10), and rebuild the dot-flow (T17) to be fully aligned;
and it SURPASSES via the levers the references cannot touch — pointer-reactive
fields, dynamic content-masks, the metallic register, real-mesh Aurora, and the
WebGPU compute density.
