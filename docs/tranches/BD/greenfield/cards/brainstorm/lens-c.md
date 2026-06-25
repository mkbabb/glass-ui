# CARDS — lens-c (AUDACIOUS CARTOON-TECHNICOLOR PUNCH)

> Greenfield redesign of the CARD system — `Card.vue` + the surface variants
> (resting/cartoon/veil) + `CardHeader`/`ScrollCardHeader` (the 3-lane scroll
> shrink) + the iOS-27 enhanced liquid-glass card (the see-through map-card
> exemplar, GENERALIZED — no hardcoded facility name).
> Lens: 1940s technicolor FLOW & PUNCH — bold cel shadowing, exaggerated
> squash/stretch/morph, anticipation + follow-through + overlapping action +
> arcs, real WEIGHT & INERTIA. The boldest, most-alive variant that is still
> idiomatic + cross-engine.
> **Tranche-DEV only. A UNION with the shipped Card + cards.css + the
> glass-material / page-background / cartoon-shadow findings. No re-fork, no
> legacy.**

---

## 0 — THE ONE TRUTH, MEASURED LIVE (`/display/card`, both modes, 2026-06-24)

I sampled the painted card surface with `getComputedStyle` + an inline OKLab
decode, both modes. The result is byte-identical to the glass-material GOLDEN's
§0 smoking-gun table — and it is the whole defect, stated once:

| measured surface (`/display/card`) | live value | OKLab | verdict |
|---|---|---|---|
| `<Card tier="resting">` composited fill | `0.664α` warm-cream | L 0.928 · **C 0.0166** · H 27.3 | the PLATE token is WARM — leg (a) landed |
| the page it composites OVER (`html`) light | `rgb(251,250,248)` | L 0.985 · **C 0.0029** · H 84.6 | **FLAT near-achromatic page** |
| the page it composites OVER (`html`) dark | `rgb(11,10,9)` | L 0.146 · **C 0.0028** · H 68.6 | **FLAT near-black page** |
| the card `box-shadow` (light, no `surface=cartoon`) | `rgba(0,0,0,0) 0 0 0 0` | — | **NO drop shadow at all** |
| the card `border` | `oklab(… / 0.04)` | — | **4%-α ink — vanishes cream-on-cream** |

**The diagnosis is the GOLDEN's, confirmed at the card:** a warm 0.664α lens
composited over a flat, near-achromatic page **reads gray** — there is nothing
chromatic behind it to transmit, and no edge to read it as a *shape*. The user's
verbatim "our glass cards are far too gray" is **not a plate-color bug** (the
plate is warm, C 0.0166); it is the §3 field-and-edge bug, at the card surface.
You cannot warm a lens. You warm what it looks at, and you give it an edge.

**The lens-c reading of that truth:** a 1940s cel-animation cell is *exactly*
this relationship — a lit, edged character (the card) painted OVER a colorful
background plate (the field), with a bold ink line (the edge) and a hard offset
shadow (the lift) that AGREE on one light source. The technicolor card is not a
new mechanism. It is the glass-material GOLDEN's `paper-field` + `--glass-key`
cel, **consumed at the card, dialed to PUNCH.**

---

## 1 — THE CORE IDEA (one sentence)

**The card is a CEL: a warm transmissive glass plate that floats over the
mandatory colorful `paper-field`, defined by ONE keyed edge (`--glass-key` rim +
agreeing warm cast) and lifted by a hard cartoon offset shadow — and it MORPHS
with squash-and-stretch on every state change, never gray, never flat, both
modes.** The card stops being a gray box on a white page and becomes a lit
object on a painted background — the literal definition of an animation cell.

The single boldest move: **§3 below — the keyed cartoon cel-lift. ONE light
vector (`--glass-key`) drives the rim, the catch-light, AND the hard offset
cartoon shadow in lockstep, so the warm `--shadow-cartoon-*` throw is no longer
a flat sticker offset — it is the cast of a real lit object, and on press/hover
the whole cel squashes toward the light and the shadow-gap closes (anticipation)
then springs back with overshoot (follow-through). A rim, a catch, and a cast
that all point at one sun is what separates a 1940s cel from an iOS-7 sticker.**

---

## 2 — LAYER 0: THE CARD FLOATS OVER THE FIELD (the de-gray keystone)

The card NEVER composites directly over the flat page again. It composites over
the glass-material GOLDEN's `.paper-field` — the warm-cel chroma plenum
(amber → terracotta → sand) that is the new layer-0 behind every glass demo.
This is **consumed, not minted** here — `BD.W-PAGE-FIELD` / `BD.W-GLASS-FIELD`
co-mint the ONE `@utility paper-field` (see page-background WAVE-AMENDMENT §0:
"one mint, two acceptance floors"). The card system's job is to **demand a field
behind it and be transmissive enough to read it.**

- **The field is a STRUCTURAL precondition, not an option.** A `<Card>` over a
  flat page is a defect the gate reds (the §3 floor: composited card chroma
  C ≥ 0.045 over the field, both modes). The card's own demo stages
  (`/display/card`) re-host onto `<ShowcaseFrame tier="field">` over
  `.paper-field` (the BG-2-black-plate-kill precedent) so EVERY card story on
  disk reads warm-transmissive, not gray-on-white. This is the
  page-background WAVE-AMENDMENT `tier="field"` re-point, applied to the card
  band.
- **Transmission is real, not latent.** Over the field, the existing
  `backdrop-filter: saturate(1.4)` finally has chroma to CONCENTRATE (it was
  inert over the flat page). The `useGlassBackdropLuminance` dominant-hue
  generalization (glass-material GOLDEN §1 "transmit" row) lifts the plate
  TOWARD the field hue via the bounded `--glass-ambient-hue`/`-strength` — so a
  card over the amber band reads amber-warm, a card over a terracotta band reads
  terracotta-warm. The Maps-card "backdrop bleeds the hue" SOTA (IOS27-REFERENCE
  T7) becomes the card's default, not a dock-only fold.
- **The `tier="field"` arm, made honest.** Dropping the plate to transparent now
  reveals the WARM field (not flat cream) — the page-background amendment's exact
  closure. `surface="veil"` (the COLOR-CARD betters delta) floats AS the color.

This is leg (b) of the GOLDEN three-leg fix, consumed at the card. **No card
without a field** — enforced by construction, gate-locked.

---

## 3 — THE KEYED CARTOON CEL-LIFT (the single boldest move)

The current card's edge is the GOLDEN's leg-(c) defect, confirmed live: a
`box-shadow: none` + a 4%-α border that vanishes cream-on-cream. The fix is the
GOLDEN's `--glass-key` cel keystone — **and lens-c is where it was born, so this
is where it goes to PUNCH.**

**ONE light vector, three agreeing layers.** A single `--glass-key` angle (a
default sun, e.g. top-left ~135°, a √φ-indexed token, NOT hand-picked) drives:

1. **The directional rim (layer 3 — REFINE).** The omnidirectional
   `--glass-rim-top: inset 0 1px 0 #fff/0.30` becomes a `conic-gradient` border
   keyed off `--glass-key`: bright on the lit edge, dim on the shadow edge — the
   iOS-26 angle-varying specular AND the defined-edge floor in ONE device. Pure
   CSS (`conic-gradient` border-image + `mask-composite`), Chrome AND Safari
   native, no `backdrop-filter:url`, no SVG (§L7 sanctioned).
2. **The inner catch-light (layer 4 — KEEP, re-aim).** The `::before` specular
   concentrates TOWARD `--glass-key` — the catch sits where the sun hits, one
   light source. The pointer-tracked `vSpecular` lens (already wired) rides on
   top for hero/chrome cards (`specular="subtle"`).
3. **The hard cartoon CAST (layer 5 — RE-BASE on `--glass-key`).** Here is the
   PUNCH. The shipped `--shadow-cartoon-md`/`-lg` offset-stamp throw is RE-BASED
   so its offset vector points OPPOSITE the key (a real lit object casts away
   from its sun), and its color is WARM-tinted (never neutral-gray — the no-gray
   floor one layer down; the cast inherits the field hue). A flat rim + an
   independent drop shadow is iOS-7. A rim and a cast that AGREE on one light is
   a 1940s cel — the brain reads a real lit object lifted off a painted field.

The card's default `--shadow-card` (the `4px 4px 0 rgba(0,0,0,0.50)` flat-offset
in design.md) is RE-EXPRESSED through this keyed throw: `surface="glass"` cards
get a SUBTLE keyed warm cast (the defined-edge floor — design.md said the trigger
paints `box-shadow:none`, the live-confirmed gap); `surface="cartoon"` cards get
the LOUD keyed throw (`--shadow-cartoon-*` at full Memphis-sticker register).
ONE keyed-shadow source, two amplitudes — the existing cartoon-surface utility's
two real deltas (2px border + offset stamp) are re-pointed onto the key, not
re-authored.

**Both modes.** The keyed rim + cast are plain per-mode arms (NEVER a
`light-dark()` wrapping an inset fragment — the live `feedback_lightdark_inset_shadow`
trap; the keyed conic rim has an inset highlight leg). Light: a warm-amber cast.
Dark: a deeper warm-umber cast, the rim lifts off the near-black field.

This is leg (c) of the GOLDEN three-leg fix, dialed to cartoon PUNCH.

---

## 4 — THE MOTION: SQUASH-STRETCH ON EVERY STATE (liquid-weight universal)

The current cartoon-surface hover is a flat `translate: var(--lift-sm)` + a
shadow swap (`cards.css` §cartoon). That is a sticker slide — it has no weight,
no anticipation, no arc. Lens-c re-expresses card motion as cel animation: every
state change is a coupled spring with the §L4 weight law (`--motion-weight 1/φ`),
morphing MORE on the move.

- **HOVER — the cel lifts toward the light (overlapping action + arc).** On
  hover, the card scales up sub-perceptually (~1.015, vol-preserving X·Y≈1) AND
  TRANSLATES along an ARC toward `--glass-key` (not a straight diagonal — a
  shallow Bézier arc, the cel rising toward its sun), AND the keyed cast GROWS
  (the `--shadow-cartoon-md → -lg` swap, now keyed) — the three channels on the
  `--spring-smooth` clock with overlapping timing (the shadow LAGS the lift by a
  frame, follow-through). The lift reads as the card peeling off the field, not
  sliding on it.
- **PRESS — anticipation + squash + the shadow-gap closes.** A `pressable` card
  composes the shipped `useLiquidPress` (consumer #2, already wired) — the
  reciprocal X/Y squish on `--card-press-t`. Lens-c COUPLES the keyed cast to the
  press drive: as the card squashes DOWN toward the field, the offset cast SHRINKS
  (the lit object settling onto its background — the shadow-gap closes, the
  textbook squash read), then on release the spring overshoots and the cast
  springs back open (follow-through). The card is a larger surface than a button
  so the shrink is shallower (0.02, per the shipped tune) — but the
  shadow-gap-closes coupling is the cel WEIGHT the bare scale lacks.
- **MORPH MORE ON MOVE.** Per the liquid-weight-universal law: the faster the
  pointer travels into the card, the more it squashes on arrival (a velocity term
  on the press drive) — the card greets a fast pointer with more deformation, a
  slow one with a gentle settle. Never tight, never springy-thin.

Compositor-only throughout: `scale`/`translate` (transform) + the keyed cast is a
`box-shadow` GATED to discrete state-flips (hover/press transitions), NEVER a
steady-state loop (the §L7 paint-cost fence — a `box-shadow` throw is paint-bound,
so it rides the one-shot transition, not a rAF). PRM → the squash/arc/shadow-grow
all drop to an instant state swap, the terminal rest cel (the §L5 carve).

---

## 5 — CardHeader / ScrollCardHeader: the 3-lane shrink, given WEIGHT

The shipped 3-lane shrink (`CardHeader.vue`) is already the RIGHT architecture —
compositor-safe (transform/opacity only, BB.W-CARD-COMPOSITE killed the CLS-1.03
reflow storm), `:slotted()`-targeted, PRM-gated, `animation-timeline: scroll()`
with a Safari floor. **This is FIT — keep it, refine it, do NOT re-invent.** The
lens-c delta is purely the MOTION FEEL, layered on the existing lanes:

- **The lanes get LIQUID EASING, not `linear`.** The shipped lanes run
  `animation: … linear both` — a mechanical 1:1 scrub. Lens-c swaps the
  `linear` timing for a `linear()` spring-sampled easing (the house spring
  baked to a `linear()` function — the shipped `--ease-spring-*` linearized
  form) so the title shrink (lane 2), the description retire (lane 3), and the
  header compress (lane 1) DECELERATE with weight as they settle — the header
  doesn't scrub mechanically with the scrollbar, it FLOWS toward its compressed
  rest with inertia. The 0..120 / 0..80 asymmetric cliff (description retires
  faster, title settles last) is KEPT — it is good overlapping-action timing
  already.
- **The ScrollCardHeader hero title MORPHS, not just scales.** The hero title
  rests at `--type-display-1` (φ²) and shrinks via the pinned
  `--card-title-shrink-ratio` scale — KEEP. Lens-c adds a sub-perceptual ARC to
  the lane-2 origin (the title shrinks toward its leading edge AND drifts a hair
  toward the header's `--glass-key` corner — overlapping action with the header
  compress), so the hero collapse reads as the title settling into the chrome,
  not a flat scale-down.
- **The lane-4 background lift IS the keyed edge appearing.** The shipped
  `::before` backplate fades `--card-header-bg` opacity 0→1 as the header sticks.
  Lens-c re-points `--card-header-bg` to read the SAME keyed warm tint as the
  card cel (§3) — so as the header sticks, the keyed rim/edge of the chrome
  RESOLVES (the stuck header gains its cel edge), not just a flat tint fade. One
  edge vocabulary, header and body.

Cross-engine: `animation-timeline: scroll()` is the shipped `@supports`-gated
arm with the PRM terminal-rest floor (the existing `scroll-driven.css`
discipline) — the `linear()` easing and the arc are pure timing/transform deltas
on the SAME gated lanes, zero new mechanism, Safari-floor inherited.

---

## 6 — THE iOS-27 ENHANCED CARD (the see-through map-card, GENERALIZED)

The exemplar is the iOS-27 see-through liquid-glass map card (NO hardcoded
facility name — per the no-hardcoded-refs directive, this is a `<GlassCardComposite>`
content-agnostic assembly fed a generic exemplar preset; the map/album/places
reading is the EXEMPLAR, never the NAME — BD.W-CARD-SHEET-EXPAND D7). The
lens-c read: match-or-better the four reference qualities, each through a SHIPPED
or sibling-minted primitive, ZERO re-fork:

1. **The backdrop reads THROUGH (the see-through crown).** `<Card tier="deep"
   surface="glass">` re-pointing `--glass-bg-floating → --glass-bg-sheet` (the
   BE.W-SHEET-TRANSLUCENT `--glass-opacity-sheet` self-re-point, verified on
   disk: `--glass-bg-sheet` ∈ tokens/glass.css) over a live `<Aurora>`/
   `.paper-field` — the field reads through the frosted card. This is the §3
   field-and-transmission keystone (§2) at its deepest rung.
2. **Vibrant accents (the gradient-filled chip cluster).** Four
   `<IconChip surface="filled">` (BE.W-ICONCHIP-GLASS) in `<IconChipCluster>`,
   each a per-instance `--icon-chip-fill-gradient` 2-stop directional sweep
   (presets-in-consumers — the hues live in the demo, NOT a library token; the
   axis is forward-booked by BE.W-ICONCHIP-GLASS, NOT yet on disk). The
   value.js `safeAccentColor` auto-contrast white glyph clears 4.5:1. The cel
   PUNCH: each chip carries the SAME keyed cast (§3) so the cluster reads as lit
   discs on the field, not flat stickers.
3. **Concentric radii (§L6).** The cluster's child-chip radius is concentric
   with the cluster group radius via `--radius-concentric` (`r_inner = r_outer −
   gap` — the iOS concentric law, design.md §L6; forward-booked by
   BE.W-CONCENTRIC-RADIUS, NOT yet on disk — a DEPEND, not a mint). The card's
   own √φ pad ladder (`--card-pad-*`, BB.W-CARD-PAD, verified) + its radius share
   the proportion so the card reads as ONE proportioned object (§L6 selection
   rule).
4. **The composite assembly = BD.W-MAPS-CARD.** The whole see-through composite
   (frosted card + chip cluster + search-pill-with-avatar + floating GlassControl
   discs + chevron-disclosure headers + two-line list-rows) is the EXISTING
   BD.W-MAPS-CARD wave's job — it ASSEMBLES the sibling-wave facilities, minting
   only the three genuinely-new sub-pieces (search-pill avatar delta, disclosure
   header, list-row). **lens-c does NOT re-spec the composite** — it contributes
   the cel READING: the card cluster + controls all share ONE `--glass-key` so
   the whole composite reads as a single lit scene over the field, not a pile of
   independent frosted slabs. That is the "better-than-reference" lever — the
   reference has flat omnidirectional rims; ours has a coherent keyed scene.

Cross-engine: every facility is `backdrop-filter: blur()` (own-pixel, WebKit-safe)
+ the cross-engine clip-path squircle floor (BE.W-SQUIRCLE-COVERAGE) + JS color
math (value.js). NO `backdrop-filter:url`, NO goo, NO `feDisplacementMap` — the
most Safari-safe card in the band (BD.W-MAPS-CARD's own §8 read, honored).

---

## 7 — THE MECHANISM (precise, deft, DRY — what changes, what is consumed)

**CONSUMED (no edit, verified on disk):**
- `.glass-resting`/`-floating`/`-deep` tier ladder, `--glass-bg-sheet`,
  `--glass-bg-quiet`, `--glass-tint-source`, `--glass-fill-tint`,
  `--glass-opacity-sheet`, `--shadow-cartoon-md`/`-lg`, `--card-header-bg`,
  `--card-pad-*` √φ ladder, `cartoon-surface`/`veil-surface` utilities,
  `useLiquidPress`, `vSpecular`, the `CardHeader` 3-lane shrink, `<IconChip>`,
  `<IconChipCluster>`, `<GlassControl>`, `.glass-menu-row`.

**CONSUMED from sibling GOLDENs (co-mint, NOT re-mint here):**
- `.paper-field` (page-background WAVE-AMENDMENT §0 — the ONE `@utility
  paper-field`, two floors; the card is its FIELD-floor consumer).
- `--glass-key` (glass-material GOLDEN §1 — the keyed cel edge; the card re-bases
  its rim + cast + catch on it).
- the `useGlassBackdropLuminance` dominant-hue term (glass-material GOLDEN
  "transmit" row — the card's hue-bleed).

**DEPENDS (forward-booked by sibling BE waves, NOT yet on disk — cited honestly):**
- `--radius-concentric` (BE.W-CONCENTRIC-RADIUS) — MISSING in src today.
- `--icon-chip-fill-gradient` (BE.W-ICONCHIP-GLASS) — MISSING in src today.
  > **SOURCE-VERIFY NOTE:** I grepped src/ — `--radius-concentric` and
  > `--icon-chip-fill-gradient` and `warmFieldHue` do NOT exist on disk today.
  > The prompt's "warmFieldHue primitive" is the `.paper-field` warm-cel ground
  > (the actual on-disk-bound name from the page-background GOLDEN), NOT a token
  > called `warmFieldHue`. lens-c cites the REAL names and marks the forward
  > deps as DEPENDS, never as if they ship. No invented levers.

**MINTED by the card band (thin, DRY):**
- The keyed-shadow re-base of `--shadow-card`/`--shadow-cartoon-*` onto
  `--glass-key` — a token re-point in `cards.css`/`shadow.css`, NOT a new shadow
  family. ONE keyed throw, two amplitudes (glass subtle / cartoon loud).
- The press↔cast coupling + the hover arc — wired through the EXISTING
  `useLiquidPress` drive (`--card-press-t`) + the `cartoon-surface` transition,
  re-pointed; no new composable.
- The `linear()` spring easing on the 3-lane shrink — a timing-token swap in
  `CardHeader.vue`'s scoped lanes, no new keyframe.

**The card surface resolution stays exactly as shipped** (the `tier`/`surface`/
`shadow`/`grain`/`grid`/`specular`/`pressable`/`variant` axes — all FIT). The
lens-c deltas are: (1) demand-a-field re-host of the card stages, (2) keyed
cel-lift re-base of the edge+cast, (3) squash-stretch coupling of the motion,
(4) liquid easing on the shrink. Every one is a re-point/re-host of a SHIPPED
mechanism — UNION, never bolt-on.

---

## 8 — CROSS-ENGINE (§L7) + A11Y (§L5) CARVE

- **Cross-engine.** The keyed rim is `conic-gradient` border + `mask-composite`
  (Chrome AND Safari native). The keyed cast is plain per-mode `box-shadow` arms
  (NO `light-dark()` over an inset fragment — the live trap). The squash/arc is
  `transform` (compositor, both engines). The field is `.paper-field` CSS
  (0-JS, one paint) with `<Aurora>` as the one-GL-per-route opt-in (WGSL field
  WebKit-26 supports, degrading through the CSS substrate). The 3-lane shrink is
  `animation-timeline: scroll()` `@supports`-gated with the rest-state floor.
  NO `backdrop-filter:url`, NO goo on the card (a card is a transmissive glass
  surface — a goo filter on an ancestor would KILL its `backdrop-filter`, the
  §L7 ancestor-filter trap; the card NEVER wraps in goo). Paired-engine π
  (Chromium + WebKit) is the acceptance proof.
- **A11y.** PRM → the squash/arc/shadow-grow/hover-lift all drop to an instant
  state swap (terminal rest cel); the 3-lane shrink renders in its terminal rest
  (the `@supports` block sits under `prefers-reduced-motion: no-preference`,
  shipped). `prefers-reduced-transparency: reduce` → the card drops the
  field-transmission to a solid warm `--card` plate + the keyed edge stays (an
  edge is geometry, not transparency) — the `@supports not (backdrop-filter)`
  solid arm. Proportion (§L6, the √φ pad + concentric radii) has NO a11y bracket
  — it holds identically across all states. Contrast: body text on the
  field-transmissive card clears 4.5:1 (the veil/W55 adaptive-tint floor, the
  composited-over-busy-field AA gate).

---

## 9 — THE DELTA-ASSAY → wave amendment (reconcile, NO dup)

The three named card waves reconcile cleanly against the 116-wave set — lens-c
adds NO new wave, it AMENDS the three to carry the cel reading:

- **BD.W-COLOR-CARD** (Pantone glass card, veil-over-live-field) — FIT, the
  betters-claim IS the field-transmission keystone (§2). lens-c amendment: the
  veil card reads the `--glass-key` edge so the Pantone card has a defined cel
  edge over the live field, not a borderless dissolve. The veil strips the BOX
  (border/rim) by design — lens-c keeps the veil's strip but adds the keyed CAST
  (the lift off the field), so the floating-as-the-color read gains weight.
- **BD.W-CARD-SHEET-EXPAND** (compact card → frosted sheet liquid grow) — FIT,
  composes the union bloom spine (`useLiquidReveal`/`useElementBloom`), NOT the
  deleted `useLiquidMorph`. lens-c amendment: the grow carries the squash-stretch
  WEIGHT (§4) — the sheet doesn't just scale from the source rect, it squashes
  toward the field on settle (the `dock` spring ~+4.6% overshoot is already the
  cel follow-through; lens-c names it as such + couples the keyed cast to grow
  with the sheet). The content-as-PRESET generalization (D7) is honored — no
  hardcoded facility.
- **BD.W-MAPS-CARD** (the see-through composite, GENERALIZED name) — FIT, the
  composite assembly. lens-c amendment: the ONE-`--glass-key`-scene reading (§6) —
  the card + cluster + controls share one light so the composite reads as a lit
  scene, the better-than-reference lever. NO re-spec of the composite's
  three sub-pieces; lens-c contributes the cel coherence only.

**No dup, no new wave.** The card band's whole lens-c value is: consume
`.paper-field` (leg b) + re-base on `--glass-key` (leg c) + couple the motion to
squash-stretch + liquid-ease the shrink — every delta a re-point of a shipped or
co-minted mechanism. The three card waves carry it; the glass-material +
page-background GOLDENs own the field+edge primitives the card consumes.

---

## 10 — THE GATE (the cel bar — real painted card pixels over a real field)

The gate MUST sample real painted card pixels over a real field, both modes
(the prior goldens faked gates + invented levers — this gate is born-RED on the
live truth §0):

- **C1 — NO GRAY (the §3 floor at the card).** A `<Card>` over the demo field
  composites to C ≥ 0.045 in OKLab, both modes (born-RED: the live C-collapse
  §0 measured today — warm plate over flat page reads C ≈ 0.009 composited). The
  gate samples the PAINTED pixel (getImageData), NOT the token (the token is
  warm; the composite is gray — the distinguishing measure).
- **C2 — THE FIELD EXISTS BEHIND THE CARD.** The card story re-hosts on
  `tier="field"` over `.paper-field` (a card over a flat `--neutral-0` page reds
  — the §2 demand-a-field fence).
- **C3 — THE DEFINED EDGE.** The card's composited edge reads a non-null keyed
  rim + cast (born-RED: the live `box-shadow: none` + 4%-α border §0). A
  cream-on-cream vanishing edge reds.
- **C4 — ONE KEY.** The rim, the catch-light, and the cast all derive from the
  SAME `--glass-key` (a source-structure assert + a painted-direction π: the
  cast offsets OPPOSITE the lit rim edge).
- **C5 — THE SQUASH WEIGHT.** A press frame-series shows the card squashing
  (scale ≠ 1, X·Y ≈ 1 vol-preserving) AND the cast shrinking (the shadow-gap
  closes) — born-RED on the flat `translate`-only sticker slide. PRM → one
  static frame.
- **C6 — SAFARI.** Paired-engine π (Chromium + WebKit); NO `backdrop-filter:url`/
  goo/`feDisplacementMap` in any touched file; the keyed conic rim + per-mode
  cast paint identically on both.
- **C7 — PRESETS-IN-CONSUMERS + NO INVENTED LEVER.** No library token absorbs a
  Pantone/chip hue; the forward deps (`--radius-concentric`,
  `--icon-chip-fill-gradient`) are cited as DEPENDS, never faked as shipped (the
  §7 source-verify note is the standing fence).

**The gestalt bar:** the card reads as a WARM TRANSMISSIVE GLASS CEL — lit,
edged, lifted off a colorful field, squashing with weight on every touch — both
modes, NEVER gray. A 1940s technicolor cell, not a gray box on a white page.
