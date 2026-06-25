# CARDS — lens-b (cross-engine / perf-first) greenfield

> The CARD system redesigned from first principles: `Card.vue` + the surface variants
> (`resting`/`cartoon`/`veil`/`opaque`/`deep`) + `CardHeader`/`ScrollCardHeader` (the
> 3-lane scroll-shrink) + the iOS-27 enhanced liquid-glass card (the reference card,
> generalized — NO hardcoded facility name). Lens: FLAWLESS in Chrome **and** Safari +
> performance — compositor-only, offscreen-pause, KISS. **A UNION with the shipped Card,
> `cards.css`, and the glass-material / page-background / cartoon-shadow / tabs goldens —
> no re-fork, no legacy.**

---

## 0 — THE LIVE READ (the §3 root cause, measured on `/display/card`, both modes, 2026-06-24)

I sampled the real painted surface live (chrome-devtools, `getComputedStyle` + OKLab decode):

| measured (`/display/card`) | live value | OKLCh | verdict |
|---|---|---|---|
| `--card` source token (light) | `hsl(30 85% 96%)` | L 0.94 · **C ~0.013 · H ~67 WARM** | **leg (a) landed — the plate IS warm** |
| the page region BEHIND the card (light) | `rgb(251,250,248)` | L 0.985 · **C 0.0029 · H 84.6** | **flat near-achromatic** — nothing to transmit |
| the card composited over that page (0.664α) | — | L 0.979 · **C 0.0103 · H 75.4** | **dragged BELOW the warm floor → reads GRAY** |
| the page BEHIND the card (dark) | `rgb(11,10,9)` | L 0.146 · **C 0.0028** | **charcoal void, not warm-luminous glow** |
| `.paper-field` count on the route | **0** (53 glass surfaces, 0 fields) | — | **NO colorful field behind ANY card** |
| card border (light) | `oklab L0.216 / 0.04` 1px | — | **4%-α ink — vanishes cream-on-cream** |
| card box-shadow (resting) | leading `rgba(0,0,0,0)` | — | **no defined cast — the plate dissolves into the page** |

**The diagnosis is identical to the glass-material / page-background goldens, now confirmed
on the card route specifically:** the card plate is already warm (leg a, landed and frozen).
It reads gray because (b) there is **no colorful field behind it** to transmit, and (c) its
**edge is undefined** (4%-α border, transparent cast). *A warm lens over a flat cool page
composites to gray.* The user's verbatim — "our glass cards are also far too gray" — is the
exact composite I measured: **C 0.0103 over a flat page.** The fix is NOT to re-tint the card
(re-opening leg a is the sin every golden forbids); it is to give the card a **field to look at**
and an **edge to read as a shape** — `glass is a RELATIONSHIP, not a color`.

---

## 1 — THE CORE IDEA (one sentence)

**A card is a warm-glass lens that becomes itself only in relationship — over a colorful
`paper-field` and behind a keyed cel-edge — so the CARD SYSTEM stops re-declaring its own
surface recipe and instead RESOLVES onto the ONE shared warm-glass register the tabs/buttons
goldens already mint (`.glass-capsule` floor + the W55 `--glass-bg-*-tinted` seam + the
`--glass-key` directional rim + warm cast), with the iOS-27 enhanced card expressed as a TIER
COMBINATION (`deep` + see-through + `--radius-concentric`), never a new component.**

The card stops being a surface that *paints gray* and becomes a surface that *transmits a warm
field through a defined cel-edge* — the same material truth tabs and buttons already speak.

### The single boldest move

**Make the field + edge a STRUCTURAL CONTRACT of the Card itself, not just the demo chassis:
a `<Card>` whose nearest field ancestor is missing MOUNTS A LOCAL `paper-field` underlayer
by default (the `field` slot), so a card can NEVER read gray-over-nothing — the field travels
WITH the card, not just with the page.** The glass-material golden mounts `.paper-field` on the
app chassis (page-level); but cards appear in grids, in dialogs, in drawers, in dock-expands —
contexts where the page field may be occluded or absent. A card carries its own warm field as a
fixed-cost `::before` underlayer (one gradient paint, compositor-cached, PRM-static, gamut-warm),
gated OFF when a `.paper-field` ancestor already supplies one (the `@container`/`:has()` no-double-paint
check). This is the card-local enforcement of the precept the page-background golden makes global:
**no glass without a field — now true for a card in ANY context, by construction.** It is the
cheapest possible mechanism (a single static radial-gradient underlayer, zero JS), and it is what
guarantees the user never sees a gray card again regardless of where the card is dropped.

---

## 2 — THE DRY RECONCILE: cards onto the ONE warm-glass register

The audit's #2 question — *does the card consume the SHARED glass register, or a stale gray
recipe?* — has a precise live answer: **the card consumes `glass-${tier}` (the ladder) but the
ladder's resting fill is `--glass-bg-resting`, while tabs/buttons consume the W55-tinted seam
`--glass-bg-floating-tinted` / `--glass-bg-resting-tinted` (`surfaces.css:283/302`).** The tinted
seam is the adaptive-warm fill that reads richer; the plain rung is the calmer one. They are NOT
two recipes — they are two RUNGS of one ladder. The reconcile is a re-point, not a re-fork:

| surface | HEAD fill | golden |
|---|---|---|
| `resting` card (default) | `--glass-bg-resting` (plain rung) | KEEP the plain rung — but it now sits OVER the field + carries the keyed edge, so it reads warm-transmissive (the field is the fix, not a louder fill) |
| the iOS-27 enhanced card | `tier="deep"` re-points floating→`--glass-bg-sheet` (per BD.W-MAPS-CARD) | KEEP — `deep` is the see-through register; it composes the field-read crown |
| the `.glass-capsule` warm-floor | tabs/buttons mint it (`.glass-capsule`, tranche-DEV) | **Card's `cartoon`/`selection` decorations + the hover-lift compose the SAME `.glass-capsule-hover` register** — the card's hover is the capsule hover, ONE source |

**The DRY win:** the card does NOT mint a card-local hover/lift/specular recipe. Today
`cartoon-surface` (`cards.css:178`) carries its own `translate`/`box-shadow` hover and the card
wires its own `glass-press`/`tap-squish`. The golden routes the card's interactive lift through
the SAME `.glass-capsule-hover` register tabs/buttons consume (the tabs golden's extraction goal:
"buttons/dock-buttons *compose* it"). Cards become the THIRD consumer of `.glass-capsule` — the
≥2-consumer bar that justifies the extraction is met, and the card's hover finally matches the
"glassy gold standard" hover the user named. No card-local lift fork survives.

The `--card`/`--glass-saturate-*` chroma tokens stay **byte-untouched** (leg a, frozen). The
card's tier→class map (`Card.vue:352` `glass-${tier}`) is unchanged. The reconcile is: (1) mount
the field, (2) wire the keyed edge, (3) route the hover through `.glass-capsule-hover`.

---

## 3 — THE MATERIAL: the card as a keyed CEL pane (the defined-edge floor)

The card's edge is the §3.c leg, live-measured DEAD (4%-α border, transparent cast). The card
adopts the glass-material golden's `--glass-key` device — ONE light vector driving a directional
conic rim AND a coherent warm cast — so the card lifts off the field as a *lit object*, not a
cream smudge dissolving into cream:

- **The keyed rim** — the card's `::before` (already the specular slot, `material.css:86`) carries
  the `conic-gradient` border keyed off `--glass-key` (brightest on the edge facing the key, fading
  to the warm under-shadow opposite), painted via `mask-composite: exclude` / `-webkit-mask-composite: xor`
  (Chrome + Safari native). The BB.W-GLASS-ACCENT accent still mixes onto the lit-edge ink at 0%
  strength → byte-identical no-op. This is the defined-edge floor AND the iOS-26 angle-varying
  specular in ONE device, on the EXISTING `::before` (zero new layer).
- **The coherent warm cast** — `--shadow-card` re-bases on `--glass-key` (offset opposite the key,
  warm-tinted via `color-mix(in oklab, var(--foreground) 22%, transparent)` — NEVER neutral-gray).
  The card's resting cast was live-measured transparent; the keyed warm cast gives it a real lift.
- **The LOUD register (`surface="cartoon"`)** opts into the bold layered-offset cel-stamp via the
  shipped `.shadow-cartoon-{sm,md,lg}` + the cartoon-shadow golden's caster (the inert
  `<span class="cartoon-cast" aria-hidden>` child per cartoon-shadow H2 — the `::before` is occupied
  by the keyed rim, so the moving cast rides its own child layer, NEVER an animated `box-shadow`).

**The concentric radii (§L6):** a chip/control/inner-card nested in a card resolves
`r_inner = calc(var(--radius-card) − var(--gap))` (`--radius-concentric`, BE.W-CONCENTRIC-RADIUS)
so corners stay parallel — the iOS-27 concentric-radius crown the reference card shows (§L6 / the
Maps-card cluster). This is a token-substitution on nested surfaces, not a new card recipe.

---

## 4 — THE iOS-27 ENHANCED CARD (the reference card, generalized — NO hardcoded name)

The reference exemplar (the see-through frosted card over a live field, vibrant accents, concentric
radii) is NOT a new component — it is a **tier + surface + field combination** the existing axes
already express, assembled into a demo-chassis composite. This reconciles cleanly with the three
union waves (§7):

- **The see-through crown** = `<Card tier="deep" surface="glass">` over a LIVE field
  (`<Aurora field>` for the hero rung, or the `paper-field` ground for the calm rung). `deep`
  re-points the floating rung to `--glass-bg-sheet` (BE.W-SHEET-TRANSLUCENT) so the field reads
  THROUGH — the "backdrop reads through" the audit names. Live-confirmed mechanism: `deep` maps to
  `glass-floating glass-deep` (`Card.vue:354`), and the field is what it transmits.
- **The vibrant accents** = the BB.W-GLASS-ACCENT `--glass-accent` rim + the transmissive ambient-hue
  lift (glass-material golden §5: `useGlassBackdropLuminance` grows a dominant-hue term feeding
  `--glass-ambient-hue` bounded ≤8%, so the card picks up the field's hue — the Maps-card "transmission
  becomes real, not latent"). The accents are CONSUMER hues (presets-in-consumers), never library tokens.
- **The concentric radii** = §3 above (`--radius-concentric`).
- **The content composite** = the demo-chassis assembly (`<GlassCardComposite>` per BD.W-CARD-SHEET-EXPAND:
  glass list-rows, gradient icon-chips, a search-pill, floating control discs, disclosure headers) —
  ALL composing shipped primitives, content as a generic PRESET, NO real-brand literal (the D7 fence).

**The generalization is the whole point:** a now-playing card, a document card, a places card, a
color-swatch card are ONE `<Card tier="deep">` + field + the content preset — the reference informs
the design but is NEVER a name (per the no-hardcoded-refs directive + the cartoon-shadow/Maps-card
D7 census). The "enhanced liquid-glass card" is a TIER COMBINATION, not a facility.

---

## 5 — THE SCROLL-CHOREOGRAPHY (CardHeader / ScrollCardHeader — the 3-lane shrink, audited)

The audit's #3 question — *is the 3-lane shrink liquid/weighty (the Band-0 motion law),
Safari-OK?* — has a precise source answer (I read `CardHeader.vue` + `ScrollCardHeader.vue` in full):

**It is already compositor-safe and Safari-correct, but LINEAR and un-weighted — the gap is the
liquid-weight law, not the mechanism.** The lanes (`CardHeader.vue:187`) are:
1. header compress — `translateY(0 → -0.5rem)` on `--card-scroll` named timeline
2. title shrink — `scale(1 → --card-title-shrink-ratio)`, `transform-origin: left top`
3. description retire — `opacity 1→0` + `scaleY(1→0)`, origin top
4. background lift — `::before` backplate `opacity 0→1` (the `--card-header-bg` tint fades in)

Each lane is `transform`/`opacity` only (BB.W-CARD-COMPOSITE killed the layout-property reflow; the
`proof:no-layout-animation` lock holds), gated under `@supports (animation-timeline: scroll())` inside
`prefers-reduced-motion: no-preference` (the PRM outer-gate is the complete contract). **This is
Safari-correct** — scroll-driven animations are Baseline 2024 (Safari 26 supports `animation-timeline:
scroll()`); the `:slotted()` re-target (`CardHeader.vue:182`) is the precise Vue idiom (no `:deep()`
leak). **Cross-engine: FIT.**

**The gaps (refine, not re-invent):**
- **(L) the lanes are `linear` both** — `animation: card-header-shrink linear both` (`:192`). The
  liquid-weight-universal law (the Band-0 motion-spring source) demands inertia/weight on ALL motion.
  A scroll-driven timeline CAN carry an eased keyframe (the `linear()` spring sampling the house
  `--spring-snappy`/`--ease-cartoon-punch` is a discrete keyframe stack, compositor-cheap). The shrink
  should EASE with weight (anticipation on the compress, follow-through settle on the title), not crawl
  linearly with scroll. **REFINE: re-express the 4 lane keyframes through the `linear()`-sampled
  spring curve (the scroll-driven.css idiom the house already speaks), so the header shrinks with the
  same weight a press/morph carries.** Zero new keyframe family — the curve is the shared one.
- **(E) the background-lift backplate reads `--card-header-bg` (a flat `--card` 60% mix,
  `shadow.css:58`)** — over the field, a stuck header should lift to a KEYED warm-glass plate (the
  same `.glass-capsule`/W55-tinted register), not a flat tint. **REFINE: `--card-header-bg` re-points
  to the tinted seam** so the stuck header is warm-transmissive, coherent with the card body.
- **The "LARGER header items" hero rung (`ScrollCardHeader`)** lifts the title to `--type-display-1`
  (φ², ~2.6rem) at rest — this is the audacious √φ display register, correct. KEEP. The shrink reads
  MORE dramatically because the start size is larger (the ratio is unchanged). Liquid-weight applies
  here too (the eased shrink).

**Net: the scroll-choreography is mechanically FIT + Safari-OK; the refine is the liquid-weight
easing on the 4 lanes + the keyed warm-glass backplate. No re-architecture.**

---

## 6 — CROSS-ENGINE (Chrome AND Safari — the §L7 hard gate) + PERFORMANCE

Every card leg is on the cross-engine base, by construction:

- **The field underlayer** — CSS `radial-gradient` + `oklch()` stops (Safari ≥15.4) + a static paint
  (no drift on the card-local field — the page field carries the drift; the card-local underlayer is
  static, one paint, compositor-cached). `@property` for `--field-h` (Safari ≥16.4). **NO
  `backdrop-filter:url`, NO SVG.**
- **The keyed rim** — `conic-gradient` border + `mask-composite: exclude` / `-webkit-mask-composite: xor`
  (Safari-native). **The §L7 / §L1 trap honored: a goo `filter:url()` is NEVER an ancestor of the
  card** (an ancestor filter isolates a buffer that KILLS `backdrop-filter` on the glass — the
  dock-hub goo-tear lesson, design.md §L7). The card's metaball/goo (if any, e.g. a fission-linked
  dock expand) rides a SIBLING layer, never wraps the card.
- **The warm cast** — `box-shadow` + `cos()`/`sin()` (CSS Values 4, both engines).
- **The transmissive read** — `backdrop-filter: blur(10px) saturate(1.4)` (live-measured on the card,
  WebKit since 9) + the bounded `color-mix(in oklab)` ambient lift (cross-engine).
- **The scroll-shrink** — `animation-timeline: scroll()` (Safari 26 Baseline), `transform`/`opacity`
  only, PRM outer-gate.
- **Performance:** the card-local field is a SINGLE static gradient underlayer (no per-frame repaint);
  the scroll lanes are compositor-only (zero reflow, the `proof:no-layout-animation` lock); the
  ambient-hue observer is rAF ≤4Hz IntersectionObserver-gated (the shipped budget). A card GRID does
  NOT mount N GL contexts — the field ground is CSS (the `<Aurora field>` hero rung is one-GL-per-route,
  opt-in). **Offscreen cards: the field underlayer is `content-visibility`-friendly (static paint
  skipped when offscreen); the ambient observer parks when the card leaves the viewport.**
- **Acceptance = paired-engine π** (Chromium AND WebKit) — the cardinal §L7 bar.

---

## 7 — A11Y / PRM / reduce-transparency CARVE

- **AA holds** — the field + keyed edge are additive layers BEHIND the glass + AROUND it, never under
  text directly. The plate L is unmoved (leg a frozen). Body text on the card re-ratifies 4.5:1 against
  the live field (the W55 adaptive-tint bucket darkens/lifts the plate so prose clears AA over a busy
  field — the `veil`/`deep` surfaces already speak this).
- **PRM** → the card-local field is STATIC (no drift to freeze); the page field's drift freezes (warm
  stays); the scroll-shrink lanes never bind (the outer `prefers-reduced-motion: no-preference` gate —
  the header renders in terminal rest state); the cartoon caster goes static. Warmth survives, motion stops.
- **`prefers-reduced-transparency`** → `--glass-level: 0` collapses the lens to solid warm `--card` over
  the (still warm, static) field; the keyed rim + warm cast keep the card a discrete shape. **Warm-cream,
  never gray, even with transparency off — the edge floor DOUBLES as the reduce-transparency anchor.**
- **`prefers-contrast: more`** → the rim/cast α floors UP (the inked edge is a legibility ASSET).

---

## 8 — DELTA-ASSAY → WAVE AMENDMENTS (reconcile the 3 card waves vs the 116-wave set, no dup)

The three named card waves reconcile cleanly — none re-forks, each consumes the field/edge/register:

| wave (named) | reconcile | dup-check |
|---|---|---|
| **BD.W-COLOR-CARD** (Pantone glass-card over live field) | KEEP AS-IS — it ALREADY composes `<Card surface="veil">` over `<AuroraProtagonist>` (a live field) + `<ColorSwatch>`. The golden's field contract makes its premise STRUCTURAL: a veil card over a live field is the canonical case. **No edit** — it is the first demo-chassis consumer of the field-card contract. | composes shipped facilities; no fork |
| **BD.W-CARD-SHEET-EXPAND** (compact card → full frosted sheet grow) | KEEP AS-IS — composes the union bloom spine (`useLiquidReveal`/`useElementBloom`) + `useDockLink.toSurface` + `<GlassCardComposite>` content-preset. The golden adds: the expanded sheet is a `tier="deep"` field-card (§4) + the √φ header reads the liquid-weight eased shrink (§5). **No edit to the wave's mechanism** — the field/edge/easing are the card-system substrate it sits on. | bloom-spine-composed; D7-generalized |
| **BD.W-MAPS-CARD** (rename → **W-FIELD-CARD-COMPOSITE**, the iOS-27 enhanced card composite) | The name is hardcoded-ref; rename to the generalized `W-FIELD-CARD-COMPOSITE`. The composite IS §4 (`<Card tier="deep">` + field + the content preset + concentric chips). The three sub-pieces (search-pill-avatar, disclosure-header, list-row) stay as specced (demo-chassis compositions). **Edit: the generalized name + the field/edge substrate is the card-system golden, not a Maps-local recipe.** | rename per no-hardcoded-ref; composes shipped |

**The NET-NEW card-system amendments (compose extant seams, zero new tier/recipe):**

| amendment | scope | gate |
|---|---|---|
| **W-CARD-FIELD-FLOOR** (the structural field contract) | Card mounts a local static `paper-field` underlayer when no `.paper-field` ancestor supplies one (the `:has()`/no-double-paint gate); composes the glass-material/page-background `paper-field` primitive + `--field-h` | the §3-field arm: card composited over its field resolves C ≥ 0.018 warm, born-RED on today's C 0.0103 |
| **W-CARD-KEY-EDGE** (the card's keyed cel-edge) | `--card`'s `::before` carries the `--glass-key` directional conic rim; `--shadow-card` re-bases on `--glass-key` warm cast; the loud register via `.shadow-cartoon-*` + the cartoon-cast child | the defined-edge arm: card rim is a directional conic (not flat), cast is non-`none` warm |
| **W-CARD-REGISTER-DRY** (the shared-register reconcile) | Card's hover/lift/selection decorations route through `.glass-capsule-hover` (tabs/buttons golden) + `--card-header-bg` re-points to the tinted seam; retire the card-local `cartoon-surface` lift fork onto the shared register | the DRY arm: no card-local hover recipe; `.glass-capsule` ≥3 consumers |
| **W-CARD-SHRINK-WEIGHT** (liquid-weight on the 3-lane shrink) | the 4 scroll lanes re-express through the `linear()`-sampled spring/cartoon-punch curve (the scroll-driven.css idiom); zero new keyframe family | the liquid-weight arm: the lanes ease with weight, not linear; PRM-static |

**HELD / FROZEN (the union law):** `--card` / `--glass-saturate-*` / dark-arm chroma tokens
(byte-untouched — leg a); the alpha/radius/tint ladders; the `glass-${tier}` map; the
`proof:no-layout-animation` lock; `--neutral-0` (decoupled KEEP-NEUTRAL floor); the spring/clock
motion tokens. **No legacy, no alias, no dual path** — the field + edge + register-DRY + shrink-weight
are additive on the existing card composite; the `paper-field`/`--glass-key`/`.glass-capsule` primitives
are DEPENDED (from the glass-material / page-background / tabs goldens), never re-minted.

---

## 9 — THE GATE (born-RED) + GESTALT BAR

**The gate samples REAL painted card pixels over a REAL field, both modes, both engines** (extend
`proof:no-gray` to the card route — no new gate; the card is the §3 disease's most-cited surface):

| # | assert | born-RED on HEAD (live-measured) | GREEN when |
|---|---|---|---|
| **K1 field-behind-card** | every `<Card>` demo has a `.paper-field` (or `<Aurora field>`) ancestor/underlayer at z below the card | **0 fields on `/display/card`** (53 glass, 0 field) | the field contract mounts |
| **K2 composite-warm** | the card composited over its REAL field resolves **C ≥ 0.018 warm** (H ∈ [45,85]) | **C 0.0103 over the flat page** | field + ambient lift land |
| **K3 defined-edge** | the card rim is a directional `--glass-key` conic (not a flat ring) + a non-`none` warm cast + border α ≥ 8% | **4%-α border, transparent cast** | the keyed edge wires |
| **K4 dark-luminous** | dark card over its field resolves C ≥ 0.018 warm, L in the glow band (not charcoal) | **behind-card L0.146 C0.0028 charcoal** | the warm-dark field |
| **K5 register-DRY** | no card-local hover/lift recipe; the lift composes `.glass-capsule-hover` (≥3 consumers) | `cartoon-surface` owns its own lift fork | the register reconcile |
| **K6 shrink-weight** | the scroll lanes ease with the spring/punch curve (not `linear`), PRM-static | `linear both` on all 4 lanes | the liquid-weight refine |
| **K7 anti-evasion** | FAILS on a flat-page card, a re-tinted `--card` (leg-a re-open), a goo `filter:url()` ancestor of a card, a `linear` shrink | — | self-test (≥4 bites) |

**Gestalt bar (live-judge AS A USER, `/display/card` + `/containers/hover-card` +
`/dock/overview`, both modes, both engines, fresh paint):** the cards read as **warm transmissive
glass over a colorful field, with a defined lit cel-edge, both modes — NEVER gray**; the iOS-27
enhanced card transmits the field through, vibrant accents at the rim, concentric nested radii; the
scroll-header shrinks with liquid weight; Safari-parity on field + edge + transmission + shrink.
Born-FAIL on HEAD (the live C 0.0103 gray composite over 0 fields). **The headline: a single gray
card is a FAIL regardless of the metric.**
