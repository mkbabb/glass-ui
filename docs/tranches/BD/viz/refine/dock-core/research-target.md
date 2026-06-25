# Dock-Core liquid-dock — RESEARCH TARGET (the SOTA / design-target north star)

RESEARCH-2. The CORE liquid dock animation must be FIXED + GENERALIZED to the iOS-26/27
Liquid Glass language. This document defines PRECISELY what the surface + the motion SHOULD
be, and the acceptance bar each fix must clear. It is the binding north star for the
dock-core refine; no fix lands that this document does not endorse.

The binding sources, read in full:
- `design.md` §L1–L5 (the six-layer composite, the seven glass tiers, the three canonical
  springs + the SwiftUI `response`/`dampingFraction` API, the §L3 tap choreography, the §L5
  a11y brackets), §Dock (geometry, orientation, layer transitions).
- `CLAUDE.md` — BA.W-NO-GRAY warm-chroma floor (the neutral ladder + `--card` are warm
  MATERIAL at OKLab hue 62–75°, NEVER gray), W-DARK-MATERIAL luminous-dark transmissive
  register, the `--glass-tint-*` adaptive seam, the dock morph family (the ONE `--dock-morph-t`
  scalar, compositor-transform-over-reserved-footprint), the SHIPPED fission engine.
- `[[feedback-liquid-weight-universal]]` — the standing animation law: INERTIA · WEIGHT ·
  BOUNCE · LIQUID-GLASS on ALL motion; nothing snaps, everything settles with mass + squish.
- iOS 26 Liquid Glass material (Apple Newsroom + the LiquidGlassReference): lensing (bends +
  CONCENTRATES light, not Gaussian frost), specular highlights that respond to MOTION,
  scroll-shrink/expand as ONE fluid motion, tinted-glass + all-clear looks, the frosted
  fallback on lower-end silicon.

THE SHIPPED FISSION ENGINE (the A13 substrate — engine 100%, assembly 0%):
- `src/components/custom/dock/composables/useDockFission.ts` — the n-ary detach orchestrator
  (ONE `SpringProgress` on `DOCK_SPRING`, interruptible velocity re-base, bidirectional
  split↔merge, `useLiquidFlex` squish recoil, `usePointerVelocityField` seam-tension fed from
  INSIDE the one loop, PRM sync-seat, per-context `DockSplitSignature` data — search/media/nav).
- `src/components/custom/dock/DockGooFilter.vue` — the library goo `<filter>` mount
  (visually-hidden NON-zero host, `color-interpolation-filters="sRGB"` the WebKit-correct path,
  generous `-50%/200%` region, REGULAR `filter: url()` not backdrop-filter → Safari-painting).
- `src/styles/dock/fission-bridge.css` — the 1→N goo bridge (per-piece `--neck-t` filament
  that stretches/thins/snaps, the fission ripple + merge-splash, neck specular-sweep,
  compositor-only, PRM-removed).
The engine is correct. The fix WIRES it (assembles the pieces + signatures into the shell
docks + the gallery), it does NOT re-mint a second engine.

---

## 1. THE SURFACE TARGET — the warm-cream luminous liquid glass

The dock plate is the `.glass-dock` tier (`design.md` §L1 seven-tier ladder): a translucent
plate over backdrop motion. It is NOT gray, NOT a charcoal slab, NOT a heavy frosted slab.

### 1.1 Material identity (BA.W-NO-GRAY warm-chroma floor — BINDING)

- The plate base is the warm-cream `--card` register: `hsl(36 48% 97%)` light, the W-DARK-
  MATERIAL luminous-dark `hsl(24 8% 16%)` dark — OKLab hue **62–75°** (the warm-amber
  `--foreground`/`--card` family), saturation lifted to clear the perceptual gray floor
  (mid/low-L rungs C ≥ 0.020; the near-white plate clears a materially-warm PLATE floor ~2× HEAD).
- A dock plate that resolves at OKLab hue ~95° (yellow-green) OR at chroma < the floor reads
  GRAY → FAIL. The library `paint-arm.mjs` getComputedStyle→OKLab readback is the binding
  truth (grey separates by L not chroma — read the hue).
- Dark register is a **luminous transmissive material**, not a dead charcoal void: the dark
  glass GLOWS where light passes through (the `saturate(1.22–1.35) brightness(1.06–1.18)`
  companion on the dark blur arm), the edge α lifts to 0.22 as the primary silhouette device.

### 1.2 The six-layer optical composite (design.md §L1 — all six, or the §L5 degraded fallback)

Every dock surface (the body plate, every detached fission piece, the goo neck filament)
composes ALL SIX layers — a piece that omits one reads iOS-7-flat:

1. **Backdrop blur + saturate** — the refraction proxy. The dock tier's backdrop blur is the
   FEATHER register (`--glass-blur-dock`); see §2.3 for the exact dial-back. The `saturate()`
   channel carries the "concentrated light" read as much as the radius.
2. **Surface tint** — the warm-cream `--glass-bg-dock` admit-through (the `--glass-tint-*`
   adaptive seam: self-darkens over a VERY-LIGHT backdrop toward the warm ink at the bounded
   AA strength 20% light / 12% dark — iOS-27 dynamic darkening, A-grade legibility floor).
3. **Edge rim** — the warm hairline `--glass-border-dock` that holds the silhouette against
   the backdrop. The carve, not a heavy frame.
4. **Inner catch-light** — the upper-edge specular streak (`--glass-highlight` / the
   `--glass-specular-core` warm-cream core), the pointer-following gleam (`vSpecular` tier-root
   auto-arm) that MOVES with the pointer — the "responds to motion" read.
5. **Drop shadow** — `--shadow-dock` / `--shadow-dock-collapsed` adaptive depth.
6. **Grain** — the micro-texture that prevents flat-plastic read (3.5% light / 6% dark,
   `overlay`→`soft-light`; the always-present `--paper-clean-texture`, opacity-cross-faded,
   never an image-swap pop).

### 1.3 The pills (A11 — the vertical pill is ugly, padding too tight)

- The collapsed dock is a PERFECT CIRCLE (1:1 aspect, the `.dock-layer--summary` square lift),
  NOT an oval. The vertical pill is a clean rounded capsule on the warm-cream plate, NOT a
  thin gray sliver.
- The liquid pills (every control plate, every fission piece) carry BIGGER inset padding — the
  iOS-26 register is an 80%-of-cell painted plate (`--dock-control-safe-inset`, 10%/side) so
  the round hover plate clears the track-cell clip and never reads as a flat-topped lozenge.
  A11's "bigger padding" lifts the inset toward a generous breath: the painted plate sits
  comfortably inside the cell, the glyph sits comfortably inside the plate (the
  `--icon-chip-glyph-ratio` floor analogue). Target: the control plate reads as a soft rounded
  glass capsule with visible warm-cream breath around the glyph, never a cramped slab.

### 1.4 Acceptance — surface

- [ ] S1. The dock plate getComputedStyle→OKLab readback resolves hue 62–75°, chroma ≥ floor,
      in BOTH modes. NEVER gray (hue ~95 or chroma < floor = FAIL). `paint-arm.mjs`.
- [ ] S2. All six §L1 layers present on the body plate AND on a detached fission piece AND on
      the goo neck (a flat-plastic piece = FAIL).
- [ ] S3. Collapsed dock is a 1:1 circle (both orientations); the vertical pill is a clean
      warm capsule, not a sliver. Painted-plate inset clears the cell clip (≥1px slack).
- [ ] S4. Pills carry generous warm-cream breath (the A11 bigger-padding read) — the glyph is
      not cramped against the plate edge.
- [ ] S5. The dynamic-darkening seam engages over a synthetic-white worst-case backdrop (the
      plate darkens toward warm ink, text clears AA) — NOT a gray cast.

---

## 2. THE MOTION TARGET — slow, weighty, gooey, inertial, audacious (NOT tight/springy)

This is the headline correction. The dock currently runs `DOCK_SPRING = {response: 0.32,
dampingFraction: 0.7}` — a TIGHT, SNAPPY, near-critically-damped register. The user's verbatim
mandate (A6, A10, A13) + `[[feedback-liquid-weight-universal]]` demand the OPPOSITE: **all
animations smooth / gooey / inertial / audacious, NOT tight/springy, iOS-27-tuned,
morph-MORE-on-move.**

### 2.1 The dock motion register — re-tune toward WEIGHT (the binding spring decision)

The §L2 / design.md `response`/`dampingFraction` API is the lingua franca. The dock-core
target register is a WEIGHTIER, MORE-OVERSHOOT spring than the current tight 0.32/0.7:

- **Slower response** — the morph/split/merge runs a LONGER, more deliberate settle. Target
  `response ≈ 0.5–0.62s` (the §L2 "sheet entrance" / "sidebar slide" weight band, NOT the
  0.35s tap band). The motion has MASS; it does not dart.
- **Looser damping → real overshoot** — target `dampingFraction ≈ 0.55–0.62` (between §L2
  `--spring-bouncy` 0.45 and `--spring-snappy` 0.65). The arrival OVERSHOOTS visibly (the
  "audacious bounce"), then settles — a confident liquid arrival, never a dead stop.
- This is a re-tune of the dock's OWN register (the dock-core motion identity evolving in
  `src/styles/` per presets-in-consumers), NOT a new spring family minted ad-hoc. It rides the
  EXISTING `--spring-*` token-generation machinery (`regen-spring-tokens.mjs` from the
  `(response, ζ)` table) so the per-spring `--spring-dock-duration` settle clock regenerates in
  lockstep. The fission/morph/V↔H all share this ONE re-tuned register (ONE clock, the spring
  fence: no second clock re-introduced).
- NON-NEGOTIABLE: the `linear()` curve stays NORMALIZED 0..1 and the `--spring-dock-duration`
  is the analytic 2%-band settle — do NOT truncate the clock (re-introduces the jank). The
  weight comes from the response/ζ, not a clipped clock.

### 2.2 Grow/shrink FROM THE CENTRE (A3 — the grow-from-right defect)

The current morph anchors `transform-origin: left center` (horizontal) / `center top`
(vertical) in `layers.css` — so the box grows from the right / down (A3 verbatim: "docks GROW
FROM THE RIGHT — they MUST grow from the CENTRE and shrink thereto").

- **TARGET: `transform-origin: center`** on BOTH axes. The collapse↔expand `scaleX`/`scaleY`
  pins the CENTROID; the box grows symmetrically center-out and shrinks back to its centroid
  (the iOS scroll-shrink/expand fluid motion). The empty-`#collapsed` center-out morph (the
  AY.W-DOCK-NAV B15 "expands from the right" fix) is the precedent — generalize it to the full
  morph: the centre is the pin, never an edge.
- The reserved-footprint discipline holds (the morph-axis box reserves its `to` footprint, the
  live scalar drives `transform: scale` over it — CDP Layout track stays FLAT). Only the
  ORIGIN changes: edge → centre.

### 2.3 The blur dial-back (A4 — far too extreme / blurry for far too long)

Two blur sources stack and read as "extreme + too long":
- The dock's OWN self-blur (`--dock-reveal-blur`, the BB.W-LIQUID-REVEAL decongest bloom). HEAD
  already gated it to `[data-morphing]` (3px transient, mid-morph only, crisp at rest). The
  user STILL reads it as too much → **dial the transient peak DOWN (target ≤ 2px) AND shorten
  its window** (the bloom settles to 0 EARLY in the morph, e.g. by `--dock-expand-t ≈ 0.5`, not
  lingering to the endpoint). It is a brief decongest flash, not a sustained frost.
- The backdrop blur (`--glass-blur-dock`). The dock tier is the FEATHER register (design.md:
  the dock reads as a feather-light overlay, the backdrop's own blur reading through). The
  current calm-band radius (BA.W-GLASS-CAL dialed it to ~9px) is the resting plate; if the live
  read over a busy aurora is still too diffuse, the dock backdrop blur dials toward the lighter
  end of the feather band (the dock is translucent admit-through, NOT a heavy slab). Target: the
  backdrop STRUCTURE reads through the plate; the glass still reads unmistakably as glass.
- BINDING: the blur is `filter` (the surface's own pixels) for the transient and
  `backdrop-filter` for the material — NEVER let the transient `filter` clobber the resting
  plate blur. PRM zeroes the transient.

### 2.4 Icon alignment + synced inertia FROM THE CENTRE (A5, A6)

- **A5 shrunken-state icons misaligned**: in the collapsed/shrunken state every icon/glyph is
  CENTER-aligned in its cell, on a consistent baseline. The summary circle centers its single
  glyph; a multi-control collapsed strip centers each. No off-center sliver, no un-floored
  glyph (the `.dock-layer-rail svg` 16px floor precedent — the glyph never collapses to a 4px
  sliver inside an inline-flex column).
- **A6 icon bounces OUT OF SYNC + right-to-left**: the icon/content entrance must be SYNCED to
  the dock's own morph clock (the ONE `--dock-morph-t` / re-tuned `--spring-dock` register, NOT
  a second CSS-transition clock) and the inertia originates FROM THE CENTRE (the child stagger
  radiates center-out in lockstep with the center-out box morph, never right-to-left). The
  child-stagger directional scalar reads the SAME morph scalar; the squish (volume-preserving,
  `useLiquidFlex`) couples to it. The icon settles WITH the dock, overshooting together.

### 2.5 The shrunken state + longer hover window (A2)

- Both shell docks have a proper SHRUNKEN (collapsed) state — a clean warm circle/capsule, not
  a broken half-collapsed sliver.
- The interaction window before idle-collapse is LONGER (A2). Target: lift `--dock-collapse-delay`
  (default 2000ms) toward a more patient dwell (≈ 2800–3500ms) AND keep the AZ.W-DOCK-FLICKER
  hover hysteresis (the 60ms intent-dwell on enter + the morphing-edge-sweep recheck on leave)
  so the dock does not thrash-collapse while the pointer is still working near a moving edge.

### 2.6 Acceptance — motion

- [ ] M1. The dock spring register reads as WEIGHTY + slightly OVERSHOOTING (response ≈
      0.5–0.62, ζ ≈ 0.55–0.62) — a frame-series capture shows the box arrive PAST its target
      then settle, over a longer clock than the prior tight 0.32/0.7. NOT a dead snap.
- [ ] M2. `transform-origin: center` on both axes — the morph frame-series shows the box grow
      SYMMETRICALLY center-out and shrink to centroid. NO left/top edge-anchored growth.
- [ ] M3. The self-blur transient peaks ≤ 2px and clears EARLY in the morph (not lingering to
      the endpoint); at REST the dock is CRISP (0px self-blur). The backdrop structure reads
      through the plate. PRM → 0.
- [ ] M4. Collapsed-state icons CENTER-aligned, no sliver. The icon/content entrance is SYNCED
      to the dock morph clock and radiates center-out (a frame-series shows icon + dock arrive
      together; NO right-to-left desync).
- [ ] M5. The collapse-delay dwell is longer; the hover hysteresis holds (no thrash-collapse at
      a moving edge).
- [ ] M6. Every motion is compositor-only (`proof:no-layout-animation` GREEN — transform /
      scale / opacity / filter / `--*` only) and PRM-carved (the gesture confirms, the physics
      off, the fade survives).

---

## 3. THE FISSION / SPLIT TARGET (A13 — THE BIG ONE — wire the shipped engine)

GENERALIZE the dock to morph VERTICAL or HORIZONTAL and make it SPLITTABLE into ARBITRARY
parts: one icon/element splits OFF, MORPHS + GOOS, into another dock that sits BESIDE / ABOVE /
BELOW it (the iOS Dynamic-Island-call / control-center split demos).

### 3.1 The behavior

- **Rest** = ONE glass pill, goo OFF (crisp glass). The split CARVES it (the
  `useDockFission.ts` header: never two abutting blobs with a concave waist — ONE pill that
  carves).
- **Split** = the surviving control(s) DETACH along a context vector, each bridged to the body
  by a STRETCHING goo neck that visibly RESISTS the pointer pull, THINS to a tense filament,
  then SNAPS BACK with a `useLiquidFlex` recoil as the neck breaks. The detached piece lands as
  its OWN dock that sits BESIDE / ABOVE / BELOW the body.
- **Merge** = the reverse (1→0 on the SAME spring loop, the merge-splash gold-coalesce flash at
  the convergence point — a completion event, earned-gold).
- **Arbitrary N** — not just 1→2. The orchestrator is n-ary (`registerPiece` × N, the
  `Set<FissionPiece>` pattern); N pieces detach in a staggered SEQUENCE (the per-context
  `staggerRank`), never simultaneously.
- **Per-context signature** (DATA, not code paths): search = radial bloom (innermost-first,
  late neck-break), media = lateral peel (outside-in, long tapering neck), nav = inward-merge
  (the negative radial, stretch peaks at coalescence).

### 3.2 The wiring (engine 100%, assembly 0% — the fix's core)

- Mount `<DockGooFilter>` ONCE near the app/shell root (the gallery already does — the shell
  docks need it too).
- Wire `useDockFission` into the shell docks (`BottomDock`/`SidebarDock`) + the gallery split
  demo: `registerPiece` each detachable control with its vector + rank, bind `split`/`merge`/
  `toggle` + `onPointerMove` (the seam-tension feed).
- The detached piece becomes a real second `<GlassDock>` BESIDE/ABOVE/BELOW (the placement
  reads the split vector — radial → beside, the V-axis vectors → above/below). The box-INVIOLATE
  fence holds: fission is a CONSUMING seam beside the morph engine; it does NOT edit
  `dockMorphContext`/`dockMorphMeasure`/`DOCK_SPRING`.
- The split spring shares the §2.1 re-tuned WEIGHTY register (the gooey/inertial/audacious feel
  applies to the split, not just the collapse).

### 3.3 Safari (MUST work on Safari — verbatim)

- The goo is the REGULAR `filter: url(#…)` graph (feGaussianBlur + feColorMatrix threshold +
  feComposite — all WebKit-supported), NEVER `backdrop-filter: url()` (WebKit bug 245510).
- `color-interpolation-filters="sRGB"` (the WebKit-correct threshold path — NOT linearRGB which
  reads a wrong waist on Safari).
- A NON-zero-size visually-hidden filter host (a zero-sized host is a WebKit no-op).
- A generous explicit filter region (`-50% / 200%`) so the necks + flying pieces never clip.
- `plus-lighter` blend (Safari 16.4+) for the ripple/splash/specular, degrading to a plain warm
  overlay off-engine (no blowout).
- ALL fission motion verified painting on Safari 26 (the live capture is the binding truth).

### 3.4 Draggable (A12 — the dock items are not draggable)

- The dock items ARE draggable (`useDragMorph` precedent + the fission seam-tension): grab a
  control, PULL it, the goo neck stretches and resists, release flings velocity-continuously to
  the nearest slot (or, for a split-eligible control, the pull past a threshold COMMITS the
  fission — the drag IS the split gesture). The "morph-more-on-move" read: a faster pull
  stretches the neck more (the `usePointerVelocityField` seam-tension, capped LOW so it swells,
  never taffy-pulls).
- The roving-tabindex keyboard contract holds (a draggable strip that is keyboard-dead is the
  worse failure).

### 3.5 Acceptance — fission

- [ ] F1. The shipped engine is WIRED (not re-minted): `<DockGooFilter>` mounted once, the
      shell docks + gallery call `useDockFission` with registered pieces + bound split/merge.
      A second fission engine = FAIL.
- [ ] F2. Rest = ONE crisp glass pill, goo OFF. Split CARVES it (no abutting-blob waist).
- [ ] F3. A control DETACHES along its vector, the goo neck STRETCHES/THINS/SNAPS, and lands as
      its OWN dock BESIDE/ABOVE/BELOW the body. Arbitrary N pieces detach in staggered sequence.
- [ ] F4. Merge reverses on the SAME loop; the merge-splash gold flash fires at convergence
      (earned-gold, one-shot, merge-direction-gated).
- [ ] F5. SAFARI: the goo neck PAINTS on Safari 26 (regular filter + sRGB + non-zero host +
      generous region + plus-lighter degrade) — the live Safari capture is the binding truth.
- [ ] F6. The items are DRAGGABLE — a pull stretches the neck (morph-more-on-move), resists,
      and flings/commits on release. Keyboard roving-tabindex intact.
- [ ] F7. Compositor-only + PRM sync-seat (the gesture confirms, no neck/ripple/splash frames
      under reduce).

---

## 4. THE GALLERY TARGET (A10 — /dock/dock-gallery)

Verbatim: "none smooth, no inertia, no proper grow/shrink, the docks DO NOT SPLIT, and the
tab-bar has TWO docks in one — make it ONE dock with our TABS facility, NO real names."

- **Smoothness/inertia/grow-shrink** — every gallery dock rides the §2 re-tuned WEIGHTY register
  (the gooey/inertial feel), center-out grow/shrink, the dialed-back blur. The A10 "none smooth,
  no inertia" is the §2 fix applied to the gallery surfaces.
- **The docks SPLIT** — the gallery demonstrates the §3 fission (the Dynamic-Island-call split
  tile is the reference; it must be a REAL split, not a downward grow).
- **The tab-bar is ONE dock with the TABS facility** — the "two docks in one" tab-bar collapses
  to a SINGLE `<GlassDock>` hosting `<SegmentedTabs>` (or the `DockLayerGroup`/`DockSection`
  tabs facility), NOT two abutting dock plates. NO real names — generic placeholder labels
  (Tab 1 / Tab 2 / a glyph set), never product/route names.
- ONE GL context per route (the dock-stage aurora budget); the demos compose the SHIPPED
  primitives, never a demo-local re-fork.

### 4.1 Acceptance — gallery

- [ ] G1. Every gallery dock reads smooth + inertial + center-out (the §2 register), the blur
      dialed back. NOT tight/snappy.
- [ ] G2. The gallery DEMONSTRATES a real split (§3) — a control detaches + goos into a second
      dock. Not a downward grow.
- [ ] G3. The tab-bar is ONE `<GlassDock>` + the tabs facility, NOT two docks. Generic labels,
      no real names.

---

## 5. THE BROKEN-RAIL / DROPDOWN / POPOVER FIXES (A1, A7, A8)

- **A1 broken rail in both shell docks**: both `BottomDock`/`SidebarDock` host the AZ.W-RAIL3
  `<DockStack>` floating carousel rail, which reads as a BROKEN element. TARGET: remove the
  broken rail element. The nav-facet context the rail carried re-homes onto the shipped tabs
  facility (`DockSection`/`DockLayerGroup`) or the fission split — there is no orphaned,
  half-painted carousel strip beside the dock. If a context-switcher is wanted, it is a CLEAN
  shipped primitive, never the broken AZ.W-RAIL3 capsule.
- **A7 dropdown changes the color of the ENTIRE dock**: a `<DropdownMenu>` open inside the dock
  bleeds its open-state tint onto the whole `.glass-dock` plate (a cascade/`--glass-accent` or
  `data-[state=open]` selector reaching the dock root). TARGET: the open-state tint is scoped to
  the TRIGGER control only — the dock plate color is INVARIANT to a descendant dropdown's open
  state. (Likely a too-broad `:has([data-state=open])` or a `--glass-accent`/active-bg write on
  the dock root; scope it to the trigger.)
- **A8 popover trigger misaligned + differs from the dropdown**: the `DockDropdownTrigger` and
  the popover trigger render differently (alignment + style). TARGET: UNIFY them — one shared
  trigger register (the `DockDropdownTrigger`/`DockSelectTrigger` family) so the popover trigger
  and the dropdown trigger are byte-identical in geometry + style (same padding, same chevron,
  same hover register, same baseline alignment). A popover trigger inside a dock IS a dock
  trigger.

### 5.1 Acceptance — A1/A7/A8

- [ ] R1. No broken rail element in either shell dock. The nav-facet context re-homes onto a
      clean shipped primitive (tabs facility / fission) or is removed; no orphaned carousel.
- [ ] R2. A dropdown open inside the dock does NOT change the dock plate color — the plate is
      INVARIANT to a descendant overlay's open state (the tint is trigger-scoped).
- [ ] R3. The popover trigger and the dropdown trigger are UNIFIED — identical geometry + style
      + alignment, both reading the one dock-trigger register.

---

## 6. THE HOLISTIC ACCEPTANCE BAR (the gestalt judgement)

The fix closes ONLY when, on a FRESH live capture over the real warm-cream + aurora backdrop,
in BOTH modes, on Chromium AND Safari 26:

1. The dock reads as warm-cream LUMINOUS LIQUID GLASS (never gray, never a charcoal slab,
   never a heavy frost) — the §L1 six-layer composite, the BA.W-NO-GRAY warm-chroma floor.
2. Every motion carries INERTIA · WEIGHT · BOUNCE · LIQUID-GLASS — slow, gooey, inertial,
   audacious, overshooting, center-out — NOT tight/springy/snappy/right-to-left
   (`[[feedback-liquid-weight-universal]]`).
3. The dock SPLITS — a control detaches, goos through a stretching neck, and lands as its own
   dock beside/above/below; the merge reverses with the gold coalesce. Arbitrary N. Draggable.
4. All eleven verbatim defects (A1–A13) are resolved, each against its acceptance line above.
5. The whole reads as ONE coherent iOS-27 liquid dock system — generalized (V↔H, splittable),
   not a per-demo patch. NO legacy, idiomatic, gestalt, compositor-only, PRM-carved, Safari-
   compatible.

A surface that SNAPS, HOPS, linear-moves, grows-from-an-edge, reads-gray, or paints a broken
rail FAILS the bar. The binding truth is the captured DELTA (screenshot frame-series + paired
getComputedStyle→OKLab readback), never a commit-message claim.

---

## Sources

- [Apple Newsroom — Liquid Glass](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/)
- [LiquidGlassReference (conorluddy)](https://github.com/conorluddy/LiquidGlassReference)
- `design.md` §L1–L5 + §Dock (in-repo, binding)
- `CLAUDE.md` BA.W-NO-GRAY / W-DARK-MATERIAL / dock-morph-family / fission engine (in-repo)
- `[[feedback-liquid-weight-universal]]` (auto-memory, binding animation law)
