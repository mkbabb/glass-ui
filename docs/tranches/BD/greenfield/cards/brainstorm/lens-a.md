# Cards greenfield — LENS A: "the card is a WINDOW, not a slab"

> Greenfield first-principles redesign of the CARD system (Card.vue · resting/cartoon surface
> variants · CardHeader/ScrollCardHeader 3-lane scroll-shrink · the iOS-27 enhanced-glass
> "exemplar card", generalized). Lens: the most faithful, audacious iOS-27 Liquid-Glass read.
> Binding law: design.md §L1/§L6/§L7 + GREENFIELD-HARDENING-PLAN §1 + IOS27-REFERENCE T5/T6/T7.
> A UNION onto the shipped Card + the glass-material/page-background/tabs greenfield findings —
> never a re-fork. Tranche-DEV spec only; build is user-gated.

---

## 0. The core idea (one paragraph)

**A glass card is not a colored rectangle — it is a WINDOW cut into a warm light-field, with a
machined metal edge.** Today our cards fail the user's "far too gray" verdict for ONE structural
reason, now live-proven: the plate is genuinely warm in isolation (`--card` = `hsl(30 85% 96%)`,
the warm-cream identity) but it composites over a **flat** ground, so the eye reads a desaturated
beige slab — the §3 root cause exactly. The fix is NOT to make the card MORE colored (that fights
the BA.W-NO-GRAY discipline and saturates the plate into a loud tile). The fix is to give the
card something WARM to transmit and a defined edge to hold against it: the card reconciles onto
the **same warm-glass register tabs/buttons now use** (the renamed `.glass-capsule` warm-admit
floor + the `--glass-key` directional edge + the field-through-blur), so its OWN identity becomes
"a transmissive aperture over the colorful field," self-evidently warm in both modes, never gray.
The card system then earns its iOS-27 crown by promoting the existing surface axis into a
**single "lens" decoration tier** (`surface="lens"`) that generalizes the exemplar enhanced-glass
card (the Maps read — see-through deep blur + vibrant rim + concentric child radii) WITHOUT any
hardcoded facility name; the scroll-choreography header gains real LIQUID WEIGHT on the same
compositor lanes it already runs; and the compact-card→full-sheet GROW rides the ONE shipped
bloom spine. Three reconciles, one identity: the card is a window.

**The single boldest move:** retire the card's private gray recipe and re-found the resting card
on a **`--card-as-field` self-compositing floor** — the card admits a faint warm transmissive
wash keyed to the page field's `warmFieldHue` *through its own backdrop*, so that even over a
DEAD ground (a flat page, a print export, a `reduced-transparency` user) the resting card never
drops below the warm-chroma floor, because the warmth is now a property of the GLASS MATERIAL
itself (the `.glass-capsule` warm-admit floor), not a gift from the backdrop it may or may not
have. The card carries its own field. Gray becomes structurally unreachable.

---

## 1. The live interrogation (painted-pixel, both modes, `/display/card`)

Chrome-devtools-mcp, `localhost:5173/display/card`, `getComputedStyle` + composite-α readback,
both modes (dark toggled live). The verdict is unambiguous and matches the user's complaint:

| read | light | dark | verdict |
|---|---|---|---|
| resting card fill (OKLab) | `oklab(0.928 0.0055 0.0132)` | `oklab(0.395 0.0097 0.0165)` | **C ≈ 0.0143 light / 0.019 dark — BELOW the 0.02 warm floor the tabs greenfield set. Near-gray.** |
| card border | `oklab(0.216 … / 0.04)` | `oklab(0.925 … / 0.04)` | **4% α — the cream-on-cream melt the KEY-EDGE wave condemns; no defined edge.** |
| card box-shadow (in-list) | `none` | `none` | **shadow off on nested cards → zero cast, the card has no float, no edge cue.** |
| backdrop-filter | `blur(10px) saturate(1.4)` | `blur(10px) saturate(1.3) brightness(1.14)` | the blur is real — but it has **nothing warm to transmit**. |
| `--glass-tint-strength` | `0%` | — | the W55 adaptive-tint seam is at the no-op default on the card. |
| `--glass-ambient-strength` | `0%` | — | the AMBIENT-TINT bias is dock-only; the card gets no hue lift. |
| the "field" behind | `.paper-underpaint fixed inset-0 -z-10 bg-background` = **flat `rgb(251,250,248)`** + a turbulence-noise SVG | — | **NOT a warm chroma field. The glass-material §3 finding, confirmed live: the mounted backdrop is a flat neutral wash. 1 "field", 20 glass cards, no chroma behind any of them.** |

The screenshot (`./_inspect-card-light.png`) shows it plainly: the real `<Card>` surfaces (the
big "tiers" container, the code block) read as **flat beige-gray plates**, indistinguishable from
a `bg-muted` div. The only warm thing on the page is the bottom tier-swatch row, which paints its
OWN terracotta gradient as a demo decoration — proving the card CAN read warm when there is warmth
to read, and reads gray when there isn't. **The card is gray because the world behind it is flat
AND its own material carries no warm floor AND its edge is a whisper.** Three deficits, one gestalt.

---

## 2. The greenfield design — the card is a window

### 2.1 — The identity reconcile (the headline: DRY the card onto the warm-glass register)

The card today maps `tier` → `.glass-{tier}` directly (Card.vue:352-356) and stops there. The
tabs/buttons greenfield extracted the **`.glass-capsule`** register (tabs WAVE-AMENDMENT A.1/A.2)
— the warm-admit FLOOR that composes a small bias toward `--glass-tint-source` so the surface's
meanChroma clears 0.02 **in the material itself**, not borrowed from the backdrop. Buttons consume
it (tabs E.RESOLVE). The card is the THIRD consumer the ≥3-consumer register names — and it is the
one that needs it most, because a card is the largest glass surface and the most exposed to a flat
ground.

**The build (DRY, no new recipe):** the resting/quiet/wash glass rungs the card composes inherit
the `.glass-capsule` warm-admit floor — the same `color-mix(in oklab, <rung>, --glass-tint-source
<warm-floor-strength>)` the capsule applies, lifted to the shared glass ladder (`glass/ladder.css`
already speaks this exact `color-mix` form on `--glass-bg-resting`/`-floating` at `:78`/`:105` —
the floor is a non-zero default for `--glass-tint-strength` on enrolled glass, NOT a card-local
fork). The card's fill goes from C 0.0143 → ≥ 0.02 warm in BOTH modes by construction, because the
warmth is now in the glass material. **This is the load-bearing fix** — it makes the card warm even
before the field lands, so the "far too gray" verdict is closed at the material layer, not deferred
to a backdrop the card may not have.

The card writes NO new token: it reaches the warm floor through the SAME `--glass-tint-*` seam the
W55 adaptive-legibility tint already inherits, re-pointed off the no-op `0%` default to the small
warm floor on the enrolled glass ladder. A `<Card surface="opaque">` (the `--glass-level:0` escape)
keeps the solid `--card` plate — which is ALREADY warm-cream — so the escape hatch is unaffected.

### 2.2 — The field behind (the §3 colorful-field dependency, folded — not re-minted)

The card does not mint a field. It DEPENDS on the booked `BD.W-PAGE-FIELD` / `BD.W-GLASS-FIELD`
merge (the `@utility paper-field` warm-cel ground + `--field-h` per-route from `warmFieldHue`) +
the `BD.W-AMBIENT-TINT` widen (the ≤8% hue bias generalized off the dock onto every glass tier
over the field). The card's contribution is to be a **first-class consumer** of that field through
the existing `ShowcaseFrame tier="field"` host (verified shipped, `ShowcaseFrame.vue:47`): the
demo-chassis mounts the card over `<PaperBackdrop field>` / `<Aurora field>` so the deep backdrop
blur finally has warm chroma + luminance variance to transmit. Then the card reads as a TRUE
window — the field's warmth bleeds through the frosted plate (the iOS-27 see-through crown), the
ambient bias lifts the plate's hue toward the field's, and the composite-over-field clears the
F2 honest COMPOSITE_FLOOR (~0.012, the glass-material amendment's paint-derived bar) on top of the
≥0.02 material floor from §2.1. **Belt and suspenders: the material floor guarantees warm even on a
dead ground; the field makes it vibrant on a live one.**

### 2.3 — The defined edge (the §L1 layer-3 rim + the keyed cel edge)

The 4%-α melt is the second deficit. The card consumes `BD.W-GLASS-KEY-EDGE` (booked): the ONE
`--glass-key` directional keystone re-pointing the EXISTING two-stop rim (`--glass-rim-top` bright
catch + `--glass-rim-bottom` warm under-shadow — verified shipped, `segmented-tabs.css:69`,
`rim.css:71`) so the card's lit edge reads the upper-right key matching the shipped down-left
`.shadow-cartoon-*` cast convention. The rim's lit-edge-vs-host ΔL clears WCAG 1.4.11 (≥3:1
non-text) — a NUMBER, proven, not a 0.6α whisper (the F3 defined-edge arm). The border α floors UP
from 4% to ≥8% warm-ink. **No new layer**: it re-points the shipped rim stops; the moving-specular
`::before` and the grain `::after` are untouched (both occupied). The resting card regains its
defined edge as a property of the warm-glass register, in lockstep with tabs/buttons.

The drop-shadow deficit (`box-shadow: none` on nested cards) is correct for cards-in-cards (the
§L1 "don't double-cast" rule) — but a TOP-LEVEL resting card must carry `--shadow-card` (verified
`= --shadow-md`, shipped). The edge cue for nested cards is then the rim alone (now ≥8% + keyed),
which is sufficient; the cast is reserved for surfaces that float.

### 2.4 — The `surface="lens"` tier (the iOS-27 enhanced-glass exemplar, GENERALIZED)

The exemplar enhanced-liquid-glass card (the Maps read) is the canonical iOS-27 card: a see-through
DEEP-blur sheet, vibrant accents at the rim, concentric nested child radii (§L6), the backdrop
reading fully through. The current `CardSurface` axis is `glass | cartoon | veil`. **The greenfield
ADDS one orthogonal member: `lens`** — the enhanced-glass decoration, generalized, NO hardcoded
facility name (honoring D7 `W-NO-HARDCODED-REF` + the BD.W-MAPS-CARD generalization).

`surface="lens"` is a thin DECORATION (the `cartoon`/`veil` precedent — NOT a new tier, NOT a new
compositing seam), composing four SHIPPED registers:
1. **The deep refractive crown** — re-points the base rung to `.glass-deep` (BB.W-DEEP-GLASS, the
   Apple saturate-1.5/blur-16-20px band — verified the `deep` tier exists, Card.vue:354) so the
   field reads MORE through (the see-through depth the exemplar shows). Opt-in; the calm content
   default stays the resting rung.
2. **The vibrant rim accent** — consumes the BB.W-GLASS-ACCENT `--glass-accent` per-instance
   chromatic-rim axis (the SAME the selection variant uses, cards.css:144) so the lens card's rim
   + catch-light glint tint toward a CONSUMER data hue (presets-in-consumers; the field's
   `warmFieldHue` or a consumer accent), the distinct-axis fence holding (the accent NEVER tints
   the plate fill — rim+glint only).
3. **Concentric child radii (§L6)** — the lens card declares `--radius-concentric` for its slotted
   chips/controls (`r_inner = r_outer − gap`) so a chip inside the lens card stays corner-parallel
   (the iOS concentric law, BE.W-CONCENTRIC-RADIUS). The card is the natural host for the
   concentric register — its children inherit the subtract-the-gap rung.
4. **The see-through floor** — `--glass-bg-sheet`/the SHEET-TRANSLUCENT rung (BE.W-SHEET-TRANSLUCENT)
   self-re-point so the composited fill α reads sub-0.95 (the field's luminance reads THROUGH).

`surface="lens"` is the ONE generalized home for "the enhanced-glass card the exemplar shows." The
BD.W-MAPS-CARD composite story then COMPOSES `<Card surface="lens">` (instead of hand-wiring deep
+ sheet + accent per consumer) — the lens tier IS the generalization the no-hardcoded-ref directive
demands. A music now-playing card, a document card, a places card are all `<Card surface="lens">`
with different slotted content + consumer hue. The exemplar is the EXEMPLAR, never the name.

### 2.5 — The scroll-choreography header (LIQUID WEIGHT on the 3 lanes)

The CardHeader/ScrollCardHeader 3-lane shrink (live-read: compositor-safe transform/opacity lanes,
`card-header-shrink`/`card-title-shrink`/`card-desc-shrink`, `animation-timeline: --card-scroll`,
PRM-gated, `:slotted()`-targeted — this is GOOD architecture, fit, KEEP). The greenfield's only
delta is the Band-0 motion law: the lanes are `linear` today (CardHeader.vue:194). Under the
LIQUID-WEIGHT-UNIVERSAL edict, a scroll-DRIVEN choreography is a DRIVER, not an observer — it earns
weight. **REFINE (not re-invent):** the title-shrink + header-compress lanes read
`--ease-cartoon-punch`-adjacent easing scaled by `--motion-weight` (booked BD.W-MOTION-WEIGHT /
BD.W-CARTOON-PUNCH tokens) so the shrink carries a hair of inertia/settle as it pins — the title
"sets down" with weight rather than a linear scrub. The lane-4 background lift gains the same
weighted ease. This is a token re-point on the EXISTING lanes (no new keyframe, no new lane), and
it is PRM-carved by construction (the whole `@supports (animation-timeline)` block is already under
`prefers-reduced-motion: no-preference`, CardHeader.vue:187). Safari-OK: scroll-driven animations
degrade to the terminal rest state on a non-supporting engine (the `@supports` floor), and the
ease is a plain CSS `linear()` token (compositor transform only) — no `backdrop-filter:url`, no goo.

### 2.6 — The compact-card → full-sheet GROW (the bloom spine, folded)

The exemplar's compact-card→full-sheet expand (IOS27 T5) is the BD.W-CARD-SHEET-EXPAND wave,
already reconciled onto the ONE bloom spine (`useLiquidReveal`/`useElementBloom` — `useLiquidReveal`
verified shipped) + `useDockLink.toSurface` + `useDrawerSnap` detents + `.scroll-cascade` content
stagger. The card system's contribution is to be the SOURCE and TARGET of that bloom — a
`pressable` `<Card>` (the existing press axis, Card.vue:143) is the compact card; `<Card
surface="lens">` is the grown sheet. The card OWNS no bloom engine; it is the surface the spine
glows from. The √φ card-pad ladder (BB.W-CARD-PAD, the golden padding, Card.vue:342) is the sheet's
internal proportion (D8/§L6). No new work here — the card reconciles onto the booked wave.

---

## 3. The mechanism (tokens / recipes / composition — KISS, DRY, no re-fork)

| concern | mechanism | source (verified shipped / booked) |
|---|---|---|
| warm-not-gray FLOOR | the `.glass-capsule` warm-admit floor lifted to the shared glass ladder rungs the card composes (non-zero `--glass-tint-strength` default on enrolled glass, `color-mix(in oklab)`) | tabs WAVE-AMENDMENT A.1/A.2 (`.glass-capsule`); `glass/ladder.css:78,105` (the exact form ships) |
| colorful field behind | DEPEND `BD.W-PAGE-FIELD`/`BD.W-GLASS-FIELD` (`@utility paper-field` + `--field-h`); mount via `ShowcaseFrame tier="field"` | page-background + glass-material amendments; `ShowcaseFrame.vue:47` (field tier ships) |
| hue lift on the plate | DEPEND `BD.W-AMBIENT-TINT` widen (≤8% bias off the dock onto field-over glass) | ambient-tint amendment |
| defined edge | DEPEND `BD.W-GLASS-KEY-EDGE` (`--glass-key` re-points the shipped two-stop rim; border α 4%→≥8%) | glass-material amendment; `--glass-rim-top/bottom` ship (`segmented-tabs.css:69`, `rim.css:71`) |
| top-level cast | `--shadow-card` on shadow-prop cards (nested stay rim-only) | `shadow.css:49` (`--shadow-card = --shadow-md`, ships) |
| `surface="lens"` tier | NEW `CardSurface` member + `@utility lens-surface` composing `.glass-deep` + `--glass-accent` rim + `--radius-concentric` + `--glass-bg-sheet` | BB.W-DEEP-GLASS, BB.W-GLASS-ACCENT, BE.W-CONCENTRIC-RADIUS, BE.W-SHEET-TRANSLUCENT (booked) |
| scroll-header weight | re-point the 3 existing lanes' ease to `--ease-cartoon-punch` × `--motion-weight` | BD.W-CARTOON-PUNCH / BD.W-MOTION-WEIGHT (booked); lanes ship (CardHeader.vue) |
| card→sheet grow | the card is the bloom source/target; the spine is `useLiquidReveal` | BD.W-CARD-SHEET-EXPAND (booked); `useLiquidReveal.ts` ships |

**Net new src/ surface:** ONE `CardSurface` member (`lens`) + ONE `@utility lens-surface` (the thin
decoration) + the warm-floor re-point on the glass ladder (shared, not card-local). Everything else
is a DEPEND on a booked sibling or a CONSUME of a shipped register. No new compositing seam, no new
color core, no new spring, no new card component.

---

## 4. Cross-engine (Chrome + Safari) — §L7

Every channel is Safari-safe by construction:
- The warm-admit floor + ambient bias are `color-mix(in oklab)` + `oklch()` (Baseline, both engines).
- The blur is `backdrop-filter: blur() saturate()` on OWN pixels + backdrop — the WebKit-safe path
  (the build `-webkit-` prefix pass). NO `backdrop-filter: url()`, NO goo, NO `feDisplacementMap` in
  any card path — the card is the most Safari-safe surface in the band.
- The keyed rim is the shipped box-shadow stops (no trig, no conic-from-calc, no `mask-composite`).
- The scroll-shrink lanes are `animation-timeline: scroll()` (Chromium) with the `@supports` floor
  dropping to the terminal rest state on WebKit (no broken scrub) — the CardHeader pattern already
  ships this.
- The `surface="lens"` deep blur is the 16-20px `.glass-deep` band — verified compositor-only.
- The field is CSS `radial-gradient` + `transform` drift (Chrome+Safari native); `<Aurora>` is the
  WebGL2/WGSL opt-in degrading through its CSS-substrate ground.

The binding proof is a **paired-engine π** (Chromium + WebKit), both modes, sampling the COMPOSITED
card pixel over a REAL field (the §1 method, never `getComputedStyle().backgroundColor` of the flat
base) — the gate that the live interrogation here is the born-RED baseline for.

## 5. A11y / PRM carve — §L5

- **`prefers-reduced-motion`** → the scroll-shrink lanes don't bind (the `@supports` block is under
  `no-preference`); the field drift freezes (warm stays); the card→sheet grow seats at the settled
  rect; `--motion-weight` → 0 zeroes the header-lane inertia. Static, warm, legible.
- **`prefers-reduced-transparency`** → the field drops to flat `--neutral-0` BUT the card's warm
  floor is in the OPAQUE material tint (not the transmissive layer), so the card stays warm-cream,
  never gray. The `surface="lens"` deep blur drops to the opaque escape; the keyed rim survives
  (opaque ink). This is the boldest-move payoff: warmth is structural, so a11y states can't gray it.
- **`prefers-contrast: more`** → the keyed rim α floors UP (the §L4 cartoon-cast legibility rule);
  body-on-card text re-ratifies ≥4.5:1 over the live field (the AA floor, both modes).
- **Proportion has NO a11y bracket** (§L6) — the √φ card-pad + concentric radii hold identically.

---

## 6. The DELTA-ASSAY → wave-amendment (reconcile vs the 116-wave set; no dup)

- **`BD.W-COLOR-CARD`** (the Pantone glass color-card over a live field) — UNCHANGED; the lens
  reconcile + warm floor make it land harder (the veil-over-live-field betters-claim now sits on a
  card that is warm even before the field). Cross-link: COLOR-CARD's veil card consumes the same
  warm floor.
- **`BD.W-CARD-SHEET-EXPAND`** (compact→sheet grow) — UNCHANGED; the card is its bloom source/target.
  Cross-link: the grown sheet is `<Card surface="lens">` (the generalized enhanced-glass card).
- **`BD.W-MAPS-CARD`** (the exemplar composite) — AMENDED: the frosted CARD leg (currently a
  hand-wired `<Card tier="deep" surface="glass">` re-pointing `--glass-bg-floating`) RECONCILES onto
  the ONE `surface="lens"` tier — the generalization the no-hardcoded-ref directive wants lives in
  the card axis, not the composite story. The composite then COMPOSES `<Card surface="lens">`; one
  generalized home, no per-consumer deep+sheet+accent wiring.
- **NEW (card-local, small): `BD.W-CARD-WARM-WINDOW`** — (a) the warm-admit floor on the card's glass
  rungs (DRY onto `.glass-capsule`); (b) the `surface="lens"` tier + `@utility lens-surface`; (c) the
  scroll-header weight re-point; (d) the top-level `--shadow-card` reconcile. Born-RED: live card
  chroma 0.0143 < 0.02, border 4% < 8%, no `lens` member, lanes `linear`. DEPENDs PAGE-FIELD /
  GLASS-KEY-EDGE / AMBIENT-TINT / DEEP-GLASS / CONCENTRIC-RADIUS / MOTION-WEIGHT / CARTOON-PUNCH.
- **DEPEND (no edit):** the tabs `.glass-capsule` register (the card is its 3rd consumer); the
  glass-material field+edge; the page-background field; the booked motion tokens.
- **No dup:** no second warm floor (DRY onto the capsule), no second field (DEPEND), no second edge
  (re-point the shipped rim), no second card component (`surface="lens"` is a decoration on the ONE
  Card), no second scroll engine (the existing lanes).

**The gate (born-RED → GREEN):** the painted-pixel π of §1 — sample the COMPOSITED resting card over
a REAL warm field, both modes, both engines: card meanChroma ≥ 0.02 warm (H ∈ [45,88]) at the
material floor AND ≥ COMPOSITE_FLOOR over the field; the keyed rim ΔL ≥ 3:1; body-on-card ≥ 4.5:1;
`surface="lens"` reads see-through (composited α < 0.95, field luminance through) with concentric
child radii. Self-test bites: a card with no warm floor → gray RED; a 4%-α border → edge RED; a
`lens` card that occludes the field → see-through RED. Born-RED on HEAD (live-proven gray + 4% +
no lens). GREEN when the window lands.

---

## 7. The gestalt bar

The cards read as **warm transmissive glass WINDOWS over a colorful field — a defined keyed edge,
concentric children, the field bleeding warm through the frost, both modes, NEVER gray**. The
resting card is warm even on a dead ground (the material floor); vibrant on a live one (the field).
The `surface="lens"` card matches-or-betters the iOS-27 exemplar (see-through deep blur, vibrant
rim, concentric radii — generalized, no hardcoded name). The scroll-header sets down with liquid
weight. The whole system is a UNION onto the shipped Card + the tabs/glass-material/page-background
findings — one identity, the card is a window.
