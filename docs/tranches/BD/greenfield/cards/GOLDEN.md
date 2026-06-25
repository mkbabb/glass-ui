# CARDS — GOLDEN: the card is a lit CEL — a warm-glass window over a colorful field

> The canonical greenfield spec for the CARD system: `Card.vue` + the surface variants
> (`resting`/`cartoon`/`veil`/`opaque`/`deep`) + `CardHeader`/`ScrollCardHeader` (the 3-lane
> scroll-shrink) + the iOS-27 enhanced liquid-glass card (the reference exemplar, GENERALIZED — no
> hardcoded facility name). Synthesized from lens-a (the window read), lens-b (cross-engine /
> field-as-structural-contract), lens-c (cartoon-technicolor PUNCH). A UNION onto the shipped Card +
> `cards.css` + the glass-material / page-background / tabs / cartoon-shadow goldens — never a re-fork,
> no legacy. Tranche-DEV spec; build is user-gated.
>
> Binding law: design.md + GREENFIELD-HARDENING-PLAN §1 + IOS27-REFERENCE (T5/T6/T7/T15). The
> iOS-27 demos are the guiding light: perfected warm-cream glass (NEVER gray, both modes, the
> BA.W-NO-GRAY floor; §3 = a colorful FIELD behind glass + a defined EDGE), paper morphism visible,
> audacious √φ type, 1940s cartoon flow & punch, liquid-weight universal, Aristotelian proportion,
> meatballing perfect in Chrome AND Safari, KISS/DRY/no-legacy.

---

## 0 — THE ONE TRUTH, MEASURED LIVE (all three lenses converged; `/display/card`, both modes)

The three lenses independently sampled the painted card surface (`getComputedStyle` + OKLab decode)
and returned the SAME smoking gun — the disease is not a plate-color bug, it is the §3 field-and-edge
bug at the card surface:

| measured (`/display/card`) | live value | OKLab/OKLCh | verdict |
|---|---|---|---|
| `<Card>` plate token (`--card`, light) | `hsl(30 85% 96%)` | L0.94 · **C~0.013 · H~67 WARM** | **leg (a) landed — the plate IS warm. FROZEN.** |
| the page region BEHIND the card (light) | `rgb(251,250,248)` | L0.985 · **C0.0029 · H84.6** | **flat near-achromatic — nothing to transmit** |
| the card composited over that page (~0.66α) | — | L0.979 · **C~0.010 · H75** | **dragged BELOW the warm floor → reads GRAY** |
| the page behind (dark) | `rgb(11,10,9)` | L0.146 · **C0.0028** | **charcoal void, not warm-luminous glow** |
| `.paper-field` count on the route | **0** (53 glass surfaces, 0 fields) | — | **NO colorful field behind ANY card** |
| card border (light) | `oklab L0.216 / 0.04` 1px | — | **4%-α ink — vanishes cream-on-cream** |
| card `box-shadow` (resting, in-list) | `none` | — | **no defined cast — the plate dissolves into the page** |

**The diagnosis (identical across lens-a/b/c, identical to the glass-material / page-background
goldens):** the plate is already warm (leg a, FROZEN, byte-untouched). It reads gray because (b)
there is **no colorful field behind it** to transmit, and (c) its **edge is undefined** (4%-α
border, transparent cast). *A warm lens over a flat cool page composites to gray.* The user's
verbatim — "our glass cards are also far too gray" — is the exact composite measured: **C ~0.010
over a flat page.** The fix is NOT to re-tint the plate (re-opening leg a is the sin every golden
forbids). It is to give the card **a field to look at, an edge to read as a shape, and a material
floor so it stays warm even when the field is absent.** Glass is a RELATIONSHIP, not a color.

### The on-disk reality check (the no-invented-lever fence — verified by grep on HEAD)

The three lenses cite a set of "depended" primitives. I grepped `src/styles` on HEAD; the honest
status MUST be recorded so this golden never lies about a lever that ships:

| primitive | on disk TODAY? | source / status |
|---|---|---|
| `--glass-bg-sheet` (+ `--glass-opacity-sheet` 0.74, the self-re-point recipe) | **YES** | `tokens/glass.css:290` |
| `--shadow-cartoon` / `-hover` (offset-stamp, warm `--foreground` mix) | **YES** | `tokens/shadow.css:9` |
| `--shadow-card` = `--shadow-md` | **YES** | `tokens/shadow.css:49` |
| `--card-header-bg` = `--card` 60% mix | **YES** | `tokens/shadow.css:58` |
| the `--glass-tint-source` / `--glass-tint-strength` warm-admit seam (the `color-mix(in oklab)` rung) | **YES** | `surfaces.css:286`, `glass/ladder` family, `cards.css:229` |
| the two-stop rim with `--glass-accent` mix (`--glass-rim-top`/`-bottom`/`-ink`) | **YES** | `glass/rim.css:71-83` |
| `.glass-deep` / `tier="deep"` (`glass-floating glass-deep`) | **YES** | `Card.vue:354` |
| `--glass-bg-resting-tinted` / `--glass-bg-floating-tinted` (W55 tinted seam) | **YES** | `surfaces.css:302` |
| **`paper-field`** (the `@utility` warm-cel field ground) | **MISSING** | DEPEND — page-background / glass-material golden |
| **`--glass-key`** (the directional light keystone) | **MISSING** | DEPEND — glass-material golden |
| **`.glass-capsule`** warm-admit register | **MISSING** | DEPEND — tabs golden (named, not yet on disk) |
| **`--radius-concentric`** | **MISSING** | DEPEND — BE.W-CONCENTRIC-RADIUS |
| **`--ease-cartoon-punch`** / **`--motion-weight`** | **MISSING** | DEPEND — BD.W-CARTOON-PUNCH / BD.W-MOTION-WEIGHT |
| **`--field-h`** / **`warmFieldHue`** | **MISSING** (the on-disk name is the `paper-field` warm-cel ground) | DEPEND — page-background golden |

**This is load-bearing:** the card golden DEPENDS on the sibling goldens for the field, the key, the
concentric radii, and the motion-weight tokens. It MINTS only a thin, card-local set (§7). Lens-a's
`.glass-capsule`-lift-to-the-ladder claim is softened to "consume the EXISTING `--glass-tint-*`
warm-admit seam" because `.glass-capsule` is not yet on disk and the `--glass-tint-*` seam IS — the
card reaches the warm floor through the shipped seam (the W55 tinted rungs), so the floor lands even
if `.glass-capsule` is named differently when the tabs golden executes.

---

## 1 — THE CORE IDEA (one paragraph — the reconciled synthesis)

**A card is a lit CEL: a warm transmissive glass window that becomes itself only in RELATIONSHIP —
over a colorful field, behind ONE keyed cel-edge (rim + agreeing warm cast) that all point at one
sun — and it carries its own warm material floor so it can NEVER read gray, even on a dead ground.**
The card stops re-declaring its own surface recipe and RESOLVES onto the shared warm-glass register
the page/glass/tabs goldens mint: it (1) composites over a `paper-field` — and if no field ancestor
supplies one, mounts a cheap STATIC local field underlayer so a card is never gray-over-nothing
*wherever it is dropped* (lens-b's structural contract); (2) lifts off that field with ONE
`--glass-key` driving the directional rim, the inner catch-light, and the hard cartoon cast in
lockstep (lens-c's cel-lift — a 1940s lit object, not an iOS-7 sticker); (3) reaches a warm
material floor through the shipped `--glass-tint-*` seam so the plate clears the warm-chroma floor in
the material itself, not borrowed from a backdrop it may not have (lens-a's window keystone); (4)
morphs with squash-stretch weight on every state change and eases the 3-lane scroll-shrink with the
house spring instead of `linear` (lens-c's motion + lens-b's weight refine); and (5) generalizes the
iOS-27 enhanced card as a TIER COMBINATION — `deep` + see-through field + `--radius-concentric`
children + vibrant rim accents — never a new component, never a hardcoded facility name. Five
reconciles, ONE identity: **the card is a lit cel over a painted field, warm both modes, never gray.**

### The single boldest move (synthesized from all three lenses)

**The keyed cartoon cel-lift, anchored by a structural field floor: ONE `--glass-key` light vector
drives the directional rim, the inner catch-light, AND the hard offset cast in lockstep, over a field
the card guarantees behind itself — so the card reads as a real lit object casting onto a painted
background (not a flat sticker on white), and on press/hover the whole cel squashes toward the light
and the shadow-gap closes (anticipation) then springs back with overshoot (follow-through).** This is
the union of lens-c's "one sun, three agreeing layers" (the cel keystone) with lens-b's "the field
travels WITH the card" (the structural floor that makes the keystone unconditional) and lens-a's "the
warmth is a property of the glass MATERIAL" (so even with field + transparency stripped, the cel
stays warm-cream). A rim, a catch, and a cast that all point at one sun, over a field that is always
there — that is what separates a 1940s technicolor cell from a gray box on a white page.

---

## 2 — LEG (b): THE FIELD BEHIND THE CARD — a STRUCTURAL CONTRACT (lens-b headline)

The card NEVER composites over a flat page again. It composites over the `paper-field` — the
warm-cel chroma plenum (amber → terracotta → sand) the page-background / glass-material goldens mint
as layer-0. The card system's job is to **demand a field behind it and be transmissive enough to read
it.** Two enforcement tiers, belt-and-suspenders:

1. **The page field (the common case, DEPEND).** The card's demo stages re-host onto
   `<ShowcaseFrame tier="field">` over `.paper-field` (the field tier ships — `ShowcaseFrame.vue`)
   so every card story on disk reads warm-transmissive, not gray-on-white. Over the field, the
   shipped `backdrop-filter: blur(10px) saturate(1.4)` finally has chroma to CONCENTRATE (it was
   inert over the flat page). The `useGlassBackdropLuminance` dominant-hue extension (glass-material
   golden) lifts the plate TOWARD the field hue via the bounded `--glass-ambient-hue`/`-strength`
   (≤8%) — a card over the amber band reads amber-warm, over terracotta reads terracotta-warm (the
   IOS27-REFERENCE T7 hue-bleed becomes the card's default, not a dock-only fold).

2. **The card-local field floor (the structural contract — lens-b's boldest move).** Cards appear in
   grids, dialogs, drawers, dock-expands — contexts where the page field may be occluded or absent.
   A `<Card>` whose nearest `.paper-field` ancestor is missing MOUNTS A LOCAL static `paper-field`
   underlayer by default, gated OFF when an ancestor already supplies one (the `:has()` /
   no-double-paint check). The field travels WITH the card, so a card can NEVER read gray-over-nothing
   regardless of where it is dropped. **Mechanism: a single static `radial-gradient` underlayer on
   the host (one paint, compositor-cached, zero JS, `content-visibility`-friendly, PRM-static,
   gamut-warm).** This is the card-local enforcement of the precept the page-background golden makes
   global: no glass without a field — now true for a card in ANY context, by construction.

   > **Where the underlayer lives (the pseudo-budget seam, recorded):** a glass tier already claims
   > BOTH pseudos — `::before` is the moving-specular catch-light, `::after` is the grain overlay
   > (and `.paper-grid` rides the host `background-image`). The card-local field therefore rides the
   > host element's `background-image` longhand BELOW the grid (the `cards.css` `.paper-grid` seam
   > proves a later `background-image` longhand COEXISTS with the glass tier's `background:`
   > shorthand fill, painting OVER the color, UNDER content + UNDER both pseudos). The field is one
   > more static gradient layer in that same `background-image` stack — no new pseudo, no contention.

This is leg (b) of the three-leg fix, consumed at the card and made unconditional. **No card without a
field — gate-locked (K1).**

---

## 3 — LEG (c): THE KEYED CARTOON CEL-LIFT (the single boldest move; lens-c born here, lens-a + lens-b reconciled)

The card's edge is the §3.c defect, confirmed live: `box-shadow: none` + a 4%-α border that vanishes
cream-on-cream. The fix is the glass-material golden's `--glass-key` keystone, dialed to PUNCH:
**ONE light vector, three agreeing layers.** A single `--glass-key` angle (a √φ-indexed default sun,
e.g. top-left ~135°, NOT hand-picked) drives:

1. **The directional rim (layer 3 — REFINE the shipped two-stop rim).** The shipped omnidirectional
   `--glass-rim-top` / `--glass-rim-bottom` two-stop (verified `rim.css:71-83`, already mixing the
   `--glass-accent` per-instance hue at the rim) is RE-EXPRESSED as keyed off `--glass-key`: brightest
   on the lit edge facing the key, fading to the warm under-shadow opposite. This is the iOS-26
   angle-varying specular AND the defined-edge floor in ONE device — a `conic-gradient` border via
   `mask-composite: exclude` / `-webkit-mask-composite: xor` (Chrome AND Safari native). The
   border-ink α floors UP from 4% to **≥8% warm-ink** (the defined-edge floor). The BB.W-GLASS-ACCENT
   `--glass-accent` consumer hue still mixes onto the lit-edge ink (the selection-card precedent) at
   its `0%` default → byte-identical no-op. **No new layer — the shipped rim re-pointed onto the key.**

2. **The inner catch-light (layer 4 — KEEP, re-aim toward the key).** The `::before` specular
   (`material.css`) concentrates TOWARD `--glass-key` — the catch sits where the sun hits, one light
   source. The pointer-tracked `vSpecular` lens (already wired, `Card.vue:301`, `specular="subtle"`)
   rides on top for hero/chrome cards.

3. **The hard cartoon CAST (layer 5 — RE-BASE the shipped `--shadow-cartoon-*` / `--shadow-card` on
   the key — the PUNCH).** The shipped `--shadow-cartoon-md`/`-lg` offset-stamp (verified
   `shadow.css:9`, already a warm `--foreground` mix, NEVER neutral-gray) is RE-BASED so its offset
   vector points OPPOSITE the key (a real lit object casts away from its sun), color WARM-tinted
   (inheriting the field hue). ONE keyed-shadow source, TWO amplitudes:
   - `surface="glass"` (default) → a SUBTLE keyed warm cast via `--shadow-card` (closes the live
     `box-shadow: none` defined-edge gap on a top-level card; nested cards stay rim-only, the §L1
     don't-double-cast rule).
   - `surface="cartoon"` → the LOUD keyed throw at the full Memphis-sticker register
     (`--shadow-cartoon-*`), keyed so the offset agrees with the rim.

   **The moving cast rides its own layer, NEVER an animated `box-shadow` per frame** (the
   cartoon-shadow golden's inert `<span class="cartoon-cast" aria-hidden>` child caster — the
   `::before`/`::after` are occupied by specular/grain, so a state-driven cast rides a sibling/child
   layer, gated to discrete hover/press transitions, never a rAF loop — the §L7 paint-cost fence).

**Both modes — plain per-mode arms (the live `light-dark()` inset-shadow trap, recorded).** The keyed
rim has an inset highlight leg, so the cast/rim are NEVER a `light-dark()` wrapping an inset fragment
(which computes the WHOLE box-shadow to `none`). Light: a warm-amber cast. Dark: a deeper warm-umber
cast, the rim lifting off the near-black field. **A flat rim + an independent drop shadow is iOS-7. A
rim and a cast that AGREE on one light is a 1940s cel.** This is leg (c), dialed to cartoon PUNCH.

---

## 4 — LEG (a): THE WARM MATERIAL FLOOR (lens-a's window keystone, reconciled to the shipped seam)

The plate is already warm in isolation (leg a, FROZEN). But over a DEAD ground (a flat page, a print
export, a `reduced-transparency` user) the warmth borrowed from the backdrop is gone. Lens-a's
keystone: make the warmth a property of the GLASS MATERIAL, so the card carries its own field.

**Reconciled to the on-disk reality:** the card reaches the warm floor through the SHIPPED
`--glass-tint-source` / `--glass-tint-strength` seam (the `color-mix(in oklab, <rung>, --glass-tint-
source <strength>)` form on the W55-tinted rungs, verified `surfaces.css:286,302`). The card's
resting/quiet rungs compose the tinted rung at a small non-zero warm-floor strength (re-pointed off
the no-op `0%` default to the small warm floor on the enrolled glass ladder — a SHARED re-point, not a
card-local fork). The card's fill clears the warm-chroma floor (C ≥ 0.02 warm) in BOTH modes by
construction, **before the field even lands.**

> **Honesty:** lens-a framed this as lifting `.glass-capsule` to the ladder; `.glass-capsule` is not on
> disk. The card reaches the IDENTICAL warm floor through the shipped `--glass-tint-*` seam the W55
> tinted rungs already speak. When the tabs golden executes and names the register (`.glass-capsule`
> or otherwise), the card's tinted-rung consumption is the SAME seam — no re-fork, the floor lands
> either way. This is the load-bearing fix: it makes the card warm even on a dead ground, so the
> "far too gray" verdict closes at the material layer, not deferred to a backdrop the card may lack.

A `<Card surface="opaque">` (the `--glass-level:0` escape) keeps the solid `--card` plate — already
warm-cream — so the escape hatch is unaffected. **Belt and suspenders:** the material floor (leg a)
guarantees warm even on a dead ground; the field (leg b) makes it vibrant on a live one; the keyed
edge (leg c) makes it a defined shape.

---

## 5 — THE MOTION: SQUASH-STRETCH ON EVERY STATE + LIQUID-WEIGHT (lens-c + lens-b, reconciled)

The shipped `cartoon-surface` hover is a flat `translate: var(--lift-sm)` + a shadow swap
(`cards.css:189`) — a sticker slide, no weight, no arc. The press is the shipped `useLiquidPress`
(`Card.vue:227`, the interruptible coupled spring, X/Y squish + `--card-press-t`). The motion golden
re-expresses card state-change as cel animation under the §L4 weight law, COUPLED to the keyed cast:

- **HOVER — the cel lifts toward the light (overlapping action + arc).** On hover, the card scales up
  sub-perceptually (~1.015, vol-preserving X·Y≈1) AND translates along a shallow Bézier ARC toward
  `--glass-key` (not a straight diagonal — the cel rising toward its sun), AND the keyed cast GROWS
  (`--shadow-cartoon-md → -lg`, now keyed). The shadow LAGS the lift by a frame (follow-through). The
  lift reads as the card peeling off the field, not sliding on it. On the `--spring-smooth` clock.

- **PRESS — anticipation + squash + the shadow-gap closes.** The shipped `useLiquidPress` squish
  (consumer #2, wired) is COUPLED to the keyed cast: as the card squashes DOWN toward the field, the
  offset cast SHRINKS (the lit object settling onto its background — the textbook squash read), then
  on release the spring overshoots and the cast springs back open (follow-through). The card is a
  larger surface than a button so the shrink is shallower (0.02, the shipped tune) — but the
  shadow-gap-closes coupling is the cel WEIGHT the bare scale lacks.

- **MORPH MORE ON MOVE (liquid-weight universal).** The faster the pointer travels into the card, the
  more it squashes on arrival (a velocity term on the press drive) — the card greets a fast pointer
  with more deformation, a slow one with a gentle settle. Never tight, never springy-thin.

Compositor-only throughout: `scale`/`translate` (transform); the keyed cast is a `box-shadow` (or the
cartoon-cast child layer) GATED to discrete state-flips (hover/press transitions), NEVER a
steady-state loop (the §L7 paint-cost fence). PRM → the squash/arc/shadow-grow all drop to an instant
state swap (the terminal rest cel, §L5).

---

## 6 — CardHeader / ScrollCardHeader: the 3-lane shrink, given WEIGHT (lens-b + lens-c, reconciled)

The shipped 3-lane shrink (`CardHeader.vue`, read in full) is the RIGHT architecture — compositor-safe
(transform/opacity only, BB.W-CARD-COMPOSITE killed the CLS-1.03 reflow storm, the
`proof:no-layout-animation` lock holds), `:slotted()`-targeted (the precise Vue idiom, not `:deep()`),
PRM-gated (the `@supports (animation-timeline: scroll())` block under `prefers-reduced-motion:
no-preference` — the complete contract), Safari-correct (scroll-driven animations are Baseline 2024,
Safari 26). **FIT — keep it, refine it, do NOT re-invent.** The four lanes:
1. header compress — `translateY(0 → -0.5rem)` on the `--card-scroll` named timeline
2. title shrink — `scale(1 → --card-title-shrink-ratio 0.695)`, origin `left top`
3. description retire — `opacity 1→0` + `scaleY(1→0)`, origin top (the 0..80 faster cliff)
4. background lift — the `::before` backplate `opacity 0→1` (the `--card-header-bg` tint fades in)

**The gaps (REFINE, not re-invent):**

- **(L) the lanes are `linear` both** (`CardHeader.vue:193,205,217,224`). The liquid-weight-universal
  law demands inertia/weight on ALL motion — a scroll-DRIVEN choreography is a DRIVER, not an
  observer; it earns weight. **REFINE:** re-express the 4 lane keyframes through a `linear()`-sampled
  spring/cartoon-punch curve (the house `--ease-cartoon-punch` × `--motion-weight`, DEPEND; the
  `scroll-driven.css` `linear()` idiom the house already speaks — a discrete keyframe stack,
  compositor-cheap) so the title "sets down" with weight (anticipation on the compress, follow-through
  settle on the title) rather than scrubbing mechanically with the scrollbar. The 0..120 / 0..80
  asymmetric cliff is KEPT (good overlapping-action timing). **Zero new keyframe family — the curve is
  the shared one.**

- **(E) the background-lift backplate reads a flat `--card-header-bg`** (`--card` 60% mix,
  `shadow.css:58`). Over the field, a stuck header should lift to a KEYED warm-glass plate, not a flat
  tint. **REFINE:** `--card-header-bg` re-points to the tinted seam (the same warm-admit rung the
  body uses) so the stuck header is warm-transmissive AND its keyed cel-edge (§3) RESOLVES as it
  sticks — one edge vocabulary, header and body.

- **The ScrollCardHeader hero rung** lifts the title to `--type-display-1` (φ², ~2.6rem) at rest —
  the audacious √φ display register (IOS27-REFERENCE T15). KEEP. The shrink reads MORE dramatically
  because the start size is larger (the ratio is unchanged). Lens-c's sub-perceptual arc on the
  lane-2 origin (the title drifting a hair toward the header's key corner — overlapping action with
  the compress) is the cel polish on top of the eased shrink.

Cross-engine: `animation-timeline: scroll()` is the shipped `@supports`-gated arm with the PRM
terminal-rest floor; the `linear()` easing + the arc are pure timing/transform deltas on the SAME
gated lanes — zero new mechanism, Safari-floor inherited. **Net: mechanically FIT + Safari-OK; the
refine is the liquid-weight easing on the 4 lanes + the keyed warm-glass backplate. No re-architecture.**

---

## 7 — THE iOS-27 ENHANCED CARD (the reference exemplar, GENERALIZED — no hardcoded name)

The reference exemplar (the see-through frosted card over a live field, vibrant accents, concentric
radii) is NOT a new component — it is a **TIER + SURFACE + FIELD combination** the existing axes
already express. All three lenses agree: a now-playing card, a document card, a places card, a
color-swatch card are ONE assembly with different slotted content + consumer hue. **The exemplar
informs the design; it is NEVER a name** (D7 / W-NO-HARDCODED-REF). The four reference qualities, each
through a shipped or DEPENDed primitive, zero re-fork:

1. **The see-through crown** — `<Card tier="deep" surface="glass">` (verified `deep` →
   `glass-floating glass-deep`, `Card.vue:354`) over a LIVE field. `deep` re-points the floating rung
   to `--glass-bg-sheet` (verified `glass.css:290`, the self-re-point recipe, BE.W-SHEET-TRANSLUCENT)
   so the composited fill α reads sub-0.95 and the field's luminance + hue read THROUGH — the
   "backdrop reads through" the audit names (IOS27-REFERENCE T7). Opt-in; the calm content default
   stays the resting rung.

2. **The vibrant rim accents** — the BB.W-GLASS-ACCENT `--glass-accent` per-instance chromatic-rim
   (the SAME axis the `variant="selection"` card uses, `cards.css:144`, `Card.vue:250`) so the lens
   card's rim + catch-light glint tint toward a CONSUMER data hue (presets-in-consumers; the field's
   warm hue or a consumer accent). The distinct-axis fence holds: the accent NEVER tints the plate
   fill — rim + glint only. For the gradient chip cluster the lens shows, `<IconChip surface="filled">`
   with a per-instance `--icon-chip-fill-gradient` (DEPEND — BE.W-ICONCHIP-GLASS, not yet on disk;
   cited honestly).

3. **Concentric child radii (§L6)** — a chip/control/inner-card nested in the lens card resolves
   `r_inner = calc(var(--radius-card) − var(--gap))` via `--radius-concentric` (DEPEND —
   BE.W-CONCENTRIC-RADIUS, MISSING on disk; cited honestly) so corners stay parallel (the iOS
   concentric law). The card's own √φ pad ladder (`--card-pad-*`, verified `Card.vue:342`) + its
   radius share the proportion so the card reads as ONE proportioned object.

4. **The composite assembly** — the whole see-through composite (frosted card + chip cluster +
   search-pill-with-avatar + floating control discs + chevron-disclosure headers + two-line list-rows)
   is the EXISTING `BD.W-MAPS-CARD` wave (rename → `W-FIELD-CARD-COMPOSITE`, the hardcoded-ref
   stripped). It ASSEMBLES the sibling facilities, minting only the three genuinely-new sub-pieces
   (search-pill avatar, disclosure header, list-row), composing `<Card tier="deep">` instead of
   hand-wiring deep + sheet + accent per consumer. **The better-than-reference lever (lens-c):** the
   card + cluster + controls all share ONE `--glass-key`, so the whole composite reads as a single lit
   SCENE over the field — the reference has flat omnidirectional rims; ours has a coherent keyed scene.

**The card→sheet GROW (IOS27-REFERENCE T5):** a `pressable` `<Card>` is the compact card; `<Card
tier="deep">` is the grown sheet. The card OWNS no bloom engine — it is the SOURCE and TARGET of the
ONE bloom spine (`useLiquidReveal`/`useElementBloom`, verified shipped; BD.W-CARD-SHEET-EXPAND). The
grow carries the squash-stretch WEIGHT (§5) — the sheet squashes toward the field on settle (the
`dock` spring ~+4.6% overshoot IS the cel follow-through).

Cross-engine: every facility is `backdrop-filter: blur()` (own-pixel, WebKit-safe). **NO
`backdrop-filter:url`, NO goo, NO `feDisplacementMap` in any card path** — the card is the most
Safari-safe surface in the band.

---

## 8 — THE MECHANISM (precise, deft, DRY — what changes, what is consumed, what is DEPENDed)

**CONSUMED (no edit — verified on disk):** `.glass-resting`/`-floating`/`-deep` tier ladder,
`--glass-bg-sheet` + `--glass-opacity-sheet`, the W55 tinted rungs (`--glass-bg-resting-tinted`/
`-floating-tinted`), `--glass-tint-source`/`-strength` seam, the two-stop rim
(`--glass-rim-top`/`-bottom`/`-ink` + the `--glass-accent` mix), `--shadow-card` (=`--shadow-md`),
`--shadow-cartoon-*`, `--card-header-bg`, `--card-pad-*` √φ ladder, `cartoon-surface`/`veil-surface`/
`paper-grid` utilities, `useLiquidPress`, `vSpecular`, `useLiquidReveal`, the `CardHeader` 3-lane
shrink, the `variant="selection"` `--glass-accent` consumer.

**DEPEND (from sibling goldens — NOT on disk today, cited honestly, never faked as shipped):**
`paper-field` (page-background / glass-material golden — the field ground); `--glass-key` (glass-material
golden — the keyed cel edge); `useGlassBackdropLuminance` dominant-hue / `--glass-ambient-hue`
(glass-material golden — the hue-bleed); `--radius-concentric` (BE.W-CONCENTRIC-RADIUS);
`--icon-chip-fill-gradient` (BE.W-ICONCHIP-GLASS); `--ease-cartoon-punch` / `--motion-weight`
(BD.W-CARTOON-PUNCH / BD.W-MOTION-WEIGHT). The card consumes them at their no-op/identity defaults
until the sibling lands — so the card golden is buildable incrementally and degrades gracefully.

**MINTED by the card band (thin, DRY — the net-new src/ surface):**

| amendment | scope | mechanism |
|---|---|---|
| **W-CARD-FIELD-FLOOR** | Card mounts a local static `paper-field` underlayer when no `.paper-field` ancestor supplies one (the `:has()` no-double-paint gate); rides the host `background-image` stack below `.paper-grid` | one static radial-gradient layer; zero JS; composes the `paper-field` primitive (DEPEND) + a local fallback gradient |
| **W-CARD-KEY-EDGE** | the card's rim re-expresses keyed off `--glass-key` (conic via `mask-composite`), border-ink 4%→≥8%; `--shadow-card`/`--shadow-cartoon-*` re-base on `--glass-key` (offset opposite, warm-tinted); two amplitudes (glass subtle / cartoon loud) | a token re-point + a `mask-composite` rim on the EXISTING `::before`; the cast is the cartoon-cast child layer for the moving case |
| **W-CARD-MATERIAL-FLOOR** | the card's resting/quiet rungs compose the W55-tinted rung at a small non-zero warm-floor `--glass-tint-strength` (a SHARED ladder re-point off the `0%` no-op default) | re-point on the shipped `--glass-tint-*` seam; clears C ≥ 0.02 warm in the material |
| **W-CARD-SHRINK-WEIGHT** | the 4 scroll lanes re-express through the `linear()`-sampled spring/cartoon-punch curve; `--card-header-bg` re-points to the tinted seam | a timing-token swap in `CardHeader.vue`'s scoped lanes; no new keyframe family |
| **W-CARD-MOTION-WEIGHT** | the hover arc-toward-key + the press↔cast squash coupling (shadow-gap closes) + morph-more-on-move | wired through the EXISTING `useLiquidPress` drive (`--card-press-t`) + the `cartoon-surface` transition re-pointed; no new composable |

The card's surface RESOLUTION stays exactly as shipped (`tier`/`surface`/`shadow`/`grain`/`grid`/
`specular`/`pressable`/`variant` — all FIT). The `surface="lens"` member lens-a proposed is
NOT minted — the enhanced card is the `tier="deep"` + field combination (§7), so there is NO new
surface member to maintain (the simpler reconcile; lens-b/c agree the tier combination is enough).
Every delta is a re-point/re-host of a SHIPPED mechanism — UNION, never bolt-on.

**DELTA-ASSAY → wave amendments (reconcile the 3 named card waves vs the 116-wave set; no dup):**
- **BD.W-COLOR-CARD** (Pantone glass card, veil-over-live-field) — KEEP AS-IS; the field contract
  makes its premise structural (a veil card over a live field is the canonical case). Amendment: the
  veil card reads the `--glass-key` keyed CAST (the lift off the field) so the floating-as-the-color
  read gains weight, even though the veil strips the box border by design.
- **BD.W-CARD-SHEET-EXPAND** (compact→sheet grow) — KEEP AS-IS; the card is the bloom source/target.
  Amendment: the grow carries the squash-stretch weight (§5) + the grown sheet is the `tier="deep"`
  field-card (§7) + the √φ header reads the liquid-weight eased shrink (§6).
- **BD.W-MAPS-CARD** → **RENAME `W-FIELD-CARD-COMPOSITE`** (the hardcoded-ref stripped). The composite
  IS §7. Amendment: the ONE-`--glass-key`-scene reading (the better-than-reference lever); composes
  `<Card tier="deep">`, mints only the 3 sub-pieces.
- **No dup, no new card component, no second field (DEPEND), no second edge (re-point the shipped
  rim), no second scroll engine (the existing lanes), no `surface="lens"` member.**

---

## 9 — CROSS-ENGINE (Chrome AND Safari — the §L7 hard gate) + PERFORMANCE

Every card leg is on the cross-engine base, by construction:
- **The field underlayer** — CSS `radial-gradient` + `oklch()` stops (Safari ≥15.4), static paint (the
  card-local underlayer never drifts — the page field carries the drift). `@property` for `--field-h`
  (Safari ≥16.4). NO `backdrop-filter:url`, NO SVG.
- **The keyed rim** — `conic-gradient` border + `mask-composite: exclude` / `-webkit-mask-composite:
  xor` (Safari-native). **The §L7/§L1 trap honored: a goo `filter:url()` is NEVER an ancestor of a
  card** (an ancestor filter isolates a buffer that KILLS `backdrop-filter` on the glass — the
  dock-hub goo-tear lesson). Any metaball/goo (e.g. a fission-linked dock expand) rides a SIBLING
  layer, never wraps the card.
- **The keyed cast** — plain per-mode `box-shadow` arms (NO `light-dark()` over an inset fragment —
  the live trap) + `cos()`/`sin()` for the offset vector (CSS Values 4, both engines).
- **The transmissive read** — `backdrop-filter: blur(10px) saturate(1.4)` (WebKit since 9) + the
  bounded `color-mix(in oklab)` ambient lift (cross-engine).
- **The scroll-shrink** — `animation-timeline: scroll()` (Safari 26 Baseline), transform/opacity only,
  the `linear()` eased keyframes (cross-engine), PRM outer-gate.
- **The motion** — `scale`/`translate` (compositor, both engines); the cast gated to discrete flips.
- **Performance:** the card-local field is a SINGLE static gradient (no per-frame repaint,
  `content-visibility`-friendly when offscreen); the scroll lanes are compositor-only (the
  `proof:no-layout-animation` lock); the ambient-hue observer is rAF ≤4Hz IntersectionObserver-gated +
  parks when the card leaves the viewport (the shipped budget). A card GRID does NOT mount N GL
  contexts — the field ground is CSS (the `<Aurora field>` hero rung is one-GL-per-route, opt-in).
- **Acceptance = paired-engine π** (Chromium AND WebKit) — the cardinal §L7 bar.

---

## 10 — A11Y / PRM / reduce-transparency CARVE (§L5)

- **AA holds** — the field + keyed edge are additive layers BEHIND the glass + AROUND it, never under
  text directly. The plate L is unmoved (leg a frozen). Body text on the card re-ratifies ≥4.5:1
  against the live field (the W55 adaptive-tint bucket darkens/lifts the plate so prose clears AA over
  a busy field — the `veil`/`deep` surfaces already speak this), both modes.
- **`prefers-reduced-motion`** → the scroll-shrink lanes never bind (the `@supports` block is under
  `no-preference` — the header renders in terminal rest); the card-local field is STATIC (nothing to
  freeze); the page field's drift freezes (warm stays); the squash/arc/shadow-grow drop to an instant
  state swap; `--motion-weight` → 0 zeroes the header-lane inertia. Static, warm, legible.
- **`prefers-reduced-transparency`** → `--glass-level: 0` collapses the lens to a solid warm `--card`
  plate over the (still warm, static) field; the keyed rim + warm cast keep the card a discrete shape
  (an edge is geometry, not transparency). **The boldest-move payoff: the warmth is structural (leg a
  material floor), so a11y states can NEVER gray it — warm-cream, never gray, even with transparency
  off; the edge floor DOUBLES as the reduce-transparency anchor.** The `tier="deep"` blur drops to the
  opaque escape.
- **`prefers-contrast: more`** → the keyed rim/cast α floors UP (the inked edge is a legibility ASSET,
  the §L4 cartoon-cast rule); body-on-card text re-ratifies ≥4.5:1.
- **Proportion has NO a11y bracket** (§L6) — the √φ card-pad + concentric radii hold identically across
  all states.

---

## 11 — THE GATE (born-RED → GREEN) — real painted card pixels over a real field, both modes, both engines

The gate samples the PAINTED composited card pixel (`getImageData`) over a REAL field, NOT
`getComputedStyle().backgroundColor` of the token (the token is warm; the composite is gray — the
distinguishing measure). Born-RED on the live truth (§0). Extend `proof:no-gray` to the card route —
no new gate family; the card is the §3 disease's most-cited surface. A born-RED sketch is prototyped at
`golden/card-pi.mjs` (§12).

| # | assert | born-RED on HEAD (live-measured) | GREEN when |
|---|---|---|---|
| **K1 field-behind-card** | every `<Card>` demo has a `.paper-field`/`<Aurora field>` ancestor OR mounts the local field underlayer at z below the card | **0 fields on `/display/card`** (53 glass, 0 field) | the field contract mounts |
| **K2 composite-warm** | the card composited over its REAL field resolves **C ≥ 0.02 warm** (H ∈ [45,88]) at the material floor AND ≥ the honest COMPOSITE_FLOOR (~0.012) over the field, BOTH modes | **C ~0.010 over the flat page** | material floor + field + ambient lift land |
| **K3 defined-edge** | the card rim is a directional `--glass-key` conic (not a flat ring), border-ink α ≥ 8%, a non-`none` warm cast; the lit-edge-vs-host ΔL ≥ 3:1 (WCAG 1.4.11 non-text) | **4%-α border, `box-shadow: none`** | the keyed edge wires |
| **K4 dark-luminous** | dark card over its field resolves C ≥ 0.02 warm, L in the glow band (not charcoal) | **behind-card L0.146 C0.0028 charcoal** | the warm-dark field |
| **K5 one-key** | the rim, the catch-light, and the cast all derive from the SAME `--glass-key` (source assert + a painted-direction π: the cast offsets OPPOSITE the lit rim edge) | the rim is omnidirectional, the cast is `none` | the keyed cel-lift |
| **K6 squash-weight** | a press frame-series shows the card squashing (scale ≠ 1, X·Y ≈ 1 vol-preserving) AND the cast shrinking (shadow-gap closes); PRM → one static frame | flat `translate`-only sticker slide | the squash↔cast coupling |
| **K7 shrink-weight** | the 4 scroll lanes ease with the spring/punch curve (not `linear`); PRM-static | `linear both` on all 4 lanes (`CardHeader.vue`) | the liquid-weight refine |
| **K8 lens-see-through** | `tier="deep"` reads see-through (composited α < 0.95, field luminance + hue through) with concentric child radii | the deep card occludes the field | the field-card composite |
| **K9 safari-parity** | paired-engine π (Chromium + WebKit); NO `backdrop-filter:url`/goo/`feDisplacementMap` in any touched file; the keyed conic rim + per-mode cast paint identically on both | — | both engines GREEN |
| **K10 anti-evasion** | FAILS on a flat-page card, a re-tinted `--card` (leg-a re-open), a goo `filter:url()` ancestor of a card, a `linear` shrink, a `surface="lens"` parallel fork (≥5 bites) | — | self-test |

**The gestalt bar (live-judge AS A USER, `/display/card` + `/containers/hover-card` + `/dock/overview`,
both modes, both engines, fresh paint):** the cards read as **warm transmissive glass CELS — lit,
edged, lifted off a colorful field by a keyed rim + agreeing warm cast, squashing with weight on every
touch, the field bleeding warm through the frost, both modes, NEVER gray.** The resting card is warm
even on a dead ground (the material floor), vibrant on a live one (the field). The `tier="deep"`
enhanced card matches-or-betters the iOS-27 exemplar (see-through deep blur, vibrant rim, concentric
radii — generalized, no hardcoded name). The scroll-header sets down with liquid weight. **A single
gray card is a FAIL regardless of the metric.** A 1940s technicolor cell, not a gray box on a white
page. Born-FAIL on HEAD (the live C ~0.010 gray composite over 0 fields).

---

## 12 — THE SPIKE (de-risks the boldest mechanism: the keyed cel-lift over a field)

Built under `golden/` (throwaway greenfield prototype; glass-ui src/ untouched):
- **`golden/keyed-cel.html`** — the standalone de-risk: ONE `--glass-key` driving the directional
  rim (conic + `mask-composite`), the inner catch-light, and the hard warm cast in lockstep, over a
  warm `paper-field`, BOTH modes, with a hover/press squash↔cast-gap coupling. Proves: (1) the cel
  reads warm + lifted over the field (not gray); (2) the rim/catch/cast agree on one sun; (3) the
  squash closes the shadow-gap; (4) it paints on both engines (no `backdrop-filter:url`, no goo, plain
  per-mode arms, `-webkit-mask-composite` arm present).
- **`golden/card-pi.mjs`** — the born-RED gate sketch: an OKLab composite-readback that asserts K2
  (composite-warm C ≥ 0.02) + K3 (border-ink α ≥ 8%, cast ≠ none) + K5 (cast offsets opposite the lit
  rim) on a sampled pixel. Born-RED against the HEAD values (C ~0.010, 4%-α, cast none); GREEN against
  the spike's composited pixel. Demonstrates the distinguishing measure (painted composite, not token).
