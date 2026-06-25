# CARDS — DELTA-ASSAY: golden-vs-current + the UNION path

> The survival-of-the-fittest assay for the CARD system (`Card.vue` + the `glass`/`cartoon`/`veil`
> surfaces × the `resting`/`opaque`/`deep` tiers + `CardHeader`/`ScrollCardHeader` 3-lane shrink +
> `CardContent`/`Footer`/`Title`/`Action` + `cards.css`). Reference implementation: `./GOLDEN.md`
> (FOLDED with the three challenges' landed hardenings). Live-inspected on
> `http://localhost:5173/display/card` (both modes, `getComputedStyle` + the `card-pi.mjs` born-RED
> gate). The on-disk citations re-grepped on HEAD (the challenge R3 path-fence). UNION, not a fork:
> every delta is a re-point / re-host / consume of a SHIPPED or sibling-DEPENDed primitive.

---

## 0 — THE LIVE TRUTH (re-measured by THIS assay, `/display/card`, both modes)

Re-sampled the painted card composite (not the token) — the golden's §0 reproduces to the byte:

| measured (`/display/card`) | live value | verdict |
|---|---|---|
| `.paper-field` count on route | **0** (53 glass surfaces, 20 cards) | **no field behind any card — K1 RED** |
| card fill (light) | `oklab(0.928 0.0055 0.0132 / 0.664)` | warm token, **C≈0.014** → composites toward GRAY (K2 RED) |
| card border (light) | `oklab(0.216 … / 0.04)` 1px | **4%-α ink** — vanishes cream-on-cream (K3 RED) |
| card `box-shadow` (light, this route) | `… color(srgb 0.11 0.098 0.09 / 0.08) 0 4px 16px` | a faint `--shadow-card` IS present here (NOT fully `none`); but it is a flat down-cast, **not keyed**, and dissolves on the cream page (K3/K5 RED) |
| card fill (dark) | `oklab(0.395 0.0097 0.0166 / 0.7536)` | charcoal composite, low-C (K4 RED) |
| card border (dark) | `oklab(0.925 … / 0.04)` 1px | 4%-α (K3 RED) |
| card `box-shadow` (dark) | `… color(srgb 0.914 0.9 0.886 / 0.08) …` | **near-WHITE sticker-glow** — the `--shadow-color`/`--foreground` flip (the cartoon-shadow dark defect recurs on the card; K5 RED) |
| `--glass-key` / `--ease-cartoon-punch` / `--motion-weight` / `--radius-concentric` on `:root` | **all empty** | the DEPEND levers are not yet on disk (honest) |
| `--glass-tint-strength` | **`0%`** | the warm-admit seam is dormant — the material floor is not engaged (K2 RED) |
| `backdrop-filter:url()` count / goo `feDisplacementMap` in a card path | **0 / 0** | the K9 Safari fence HOLDS on this surface |
| `node golden/card-pi.mjs` | HEAD = RED (C 0.0097), GOLDEN spike = GREEN (C 0.0393) | **the born-RED gate bites the live disease** |

**The diagnosis is the §3 field-and-edge bug, live-confirmed, identical to the glass-material /
page-background goldens:** the plate is warm in isolation (leg a, FROZEN) but reads gray because there
is no colorful FIELD behind it to transmit, its EDGE is undefined (4%-α border), and its CAST is flat /
mode-inverted (a near-white glow in dark). A warm lens over a flat cool page composites to gray. The
cure is NOT to re-tint the plate (re-opening leg a is forbidden) — it is field + edge + material-floor.

### Citation correction (the challenge R3/R3 path-fence — re-grepped on HEAD, this assay)

The golden's §0 table cited stale paths. The corrected, re-verified coordinates (the levers ARE all
on disk — only the proof-of-existence drifted):

| lever | golden cited | TRUE on HEAD (re-grepped) |
|---|---|---|
| the tinted rungs | `surfaces.css:286,302` | `src/styles/glass/surfaces.css:283` (`-floating-tinted`), `:297` (`-quiet-tinted`), `:302` (`-resting-tinted`) — **and they live inside `:where(.btn-glass, .segmented-indicator)` + `.btn-glass`, NOT a card-enrolled scope** |
| `--glass-tint-strength: 0%` default | `surfaces.css:286` | `src/styles/glass/surface-axis.css:83` + `src/styles/glass/ladder.css:31` |
| `--shadow-cartoon-md` | `shadow.css:9` | `src/styles/tokens/shadow.css:95` |
| `--shadow-card` = `--shadow-md` | `shadow.css:49` | `src/styles/tokens/shadow.css:49` ✓ |
| `--card-header-bg` | `shadow.css:58` | `src/styles/tokens/shadow.css:58` ✓ (`--card` 60% mix in **srgb**, not oklab) |
| the bloom spine | `useElementBloom` "verified shipped" | **NOT on disk** — it is `src/composables/motion/useBloomUp.ts` + `useLiquidReveal.ts`. `useElementBloom` is a DEPEND name (the W-FLIP-SPINE runner), not a shipped file. |
| Card.vue line cites (`:354`/`:301`/`:227`/`:250`/`:342`) | `Card.vue:N` | the file is `src/components/ui/card/Card.vue`; the tokens are present but the line numbers drifted — KEEP token-name citations, drop the line numbers (the fence stays true as files move). |

---

## 1 — THE DELTA (KEEP · REFINE · RE-INVENT — survival of the fittest)

### KEEP (fit — byte-untouched)

- **The surface RESOLUTION axes** — `tier` (`wash`/`quiet`/`resting`/`floating`/`overlay`/`opaque`/
  `deep`) × `surface` (`glass`/`cartoon`/`veil`) × `shadow`/`grain`/`grid`/`specular`/`pressable`/
  `variant`. Orthogonal, token-first, every member earns its place. **No `surface="lens"` member is
  minted** — the enhanced iOS-27 card is the `tier="deep"` + field combination (the KISS reconcile all
  three challenges credit as the deft call).
- **The √φ card-pad ladder** (`Card.vue` template: `--card-pad-inline` anchor → block ×1.272 → footer
  ÷1.618 → title-gap ÷2.618). Aristotelian proportion, expressed in `calc()`, never a rebake. FROZEN.
- **`deep` → `glass-floating glass-deep`** (the self-re-point to `--glass-bg-sheet`, the see-through
  crown). The escape-hatch `opaque` → `glass-resting glass-opaque`. Both FIT.
- **The `useLiquidPress` press** (consumer #2 — interruptible coupled spring, X/Y squish on
  `--card-press-t`, `shrinkDepth: 0.02`, `maxStretch: 1.03`, PRM-instant). The press DRIVER is fit; its
  COUPLING to the cast is the refine (below).
- **`vSpecular` opt-in catch-light** (the `specularArmed` gate, `subtle`/`full` rung set, default
  `off` for content cards). FIT.
- **The CardHeader 3-lane shrink ARCHITECTURE** — compositor-safe (transform/opacity only,
  BB.W-CARD-COMPOSITE killed the CLS-1.03 reflow), `:slotted()`-targeted, `@supports`-gated under
  `prefers-reduced-motion: no-preference`, Safari-26 Baseline. The 0..120 / 0..80 asymmetric cliff is
  good overlapping-action timing. The ScrollCardHeader hero rung (`--type-display-1` φ², the audacious
  √φ register). **Mechanically FIT — the easing is the only refine.**
- **`variant="selection"`** rim-not-fill accent (the `--glass-accent` per-instance consumer, the
  distinct-axis fence). FIT — and it is the SAME `--glass-accent` axis the enhanced card's vibrant-rim
  leg reuses.
- **The Safari posture** — NO `backdrop-filter:url()`, NO goo, NO `feDisplacementMap` in any card path
  (live-confirmed 0/0). The card is the most Safari-safe surface in the band. FIT — KEEP and gate-lock.
- **`cards.css` `.paper-grid` host-`background-image` seam** — the proof that a later `background-image`
  longhand coexists with the glass tier's `background:` shorthand fill (under content, under both
  pseudos). This is the EXACT seam the card-local field floor rides. FIT — reuse it.

### REFINE (weak — re-point a shipped mechanism)

- **The edge.** Border-ink floors UP 4%→≥8% warm-ink; the rim becomes DIRECTIONAL off `--glass-key`
  (the keyed cel-edge) — but this is **mostly owned by the sibling `BD.W-GLASS-KEY-EDGE`** (it
  re-points the EXISTING two-stop rim — `rim.css:70-83`, already directional — onto `--glass-key`, and
  re-bases the SHIPPED `.shadow-cartoon-*` cast). The card's refine is its *consumption*: the card body
  reads the keyed rim and floors its own border-ink; the moving cast rides an inert `.cartoon-cast`
  child layer (NOT a transitioned `box-shadow` — the paint-cost + dead-code fix). **No card-local edge
  fork.**
- **The CAST direction + the dark-mode glow.** The live dark `box-shadow` is a near-WHITE sticker-glow
  (`--shadow-color`/`--foreground` flip) — REFINE to plain per-mode warm arms (light amber / dark
  umber), keyed opposite the sun. This is the cartoon-shadow golden's warm-ink fix consumed at the card.
- **The motion.** The `cartoon-surface` hover is a flat `translate: var(--lift-sm)` + a shadow swap (a
  sticker slide). REFINE to the squash-toward-key arc + the press↔cast shadow-gap coupling, wired
  through the EXISTING `useLiquidPress` drive + the `--ease-cartoon-punch`/`--motion-weight` DEPENDs.
- **The 4 scroll-shrink lanes** — `linear both` (live-confirmed `CardHeader.vue:193,205,215,224`).
  REFINE to a `linear()`-sampled spring/punch curve (the house `--ease-cartoon-punch` × `--motion-
  weight`, the `scroll-driven.css` `linear()` idiom). Zero new keyframe family — the curve is shared.
- **`--card-header-bg`** — a flat `--card` 60% **srgb** mix. REFINE: re-point to the tinted warm-admit
  seam so a stuck header lifts to a keyed warm-glass plate (one edge vocabulary, header + body).

### RE-INVENT (broken — but the smallest possible new surface)

Only TWO things are genuinely broken (gray-over-nothing + no-field), and BOTH are fixed by CONSUMING
sibling goldens, not by a card re-invention:

- **The field behind the card** is absent (0 fields, structural) — RE-INVENT as a CONSUME: the demo
  stages re-host onto `<ShowcaseFrame tier="field">` over `paper-field` (DEPEND — `BD.W-GLASS-FIELD` /
  `BD.W-PAGE-FIELD`), AND a card mounts a CHEAP STATIC local `paper-field` underlayer when no field
  ancestor supplies one (the card-local structural floor). This is the only genuinely-new card-band
  src/ surface beyond token re-points.
- **The material floor** is dormant (`--glass-tint-strength: 0%`, the tinted rungs are button-scoped) —
  RE-INVENT the *enrollment*: enroll the card's resting/quiet surface selectors onto the SAME shared
  `:where()` seam the buttons/tabs use, and set a CARD-LOCAL non-zero `--glass-tint-strength` (NOT the
  global default) so the card clears the warm-chroma floor even on a dead ground — without re-tinting
  any other consumer (the challenge R2 blast-radius fix).

---

## 2 — THE UNION PATH (deft, KISS, no dual-path — precisely how the current evolves toward the golden)

The card stops re-declaring its own surface recipe and RESOLVES onto the shared warm-glass register the
sibling goldens mint. Five reconciles, ONE identity — **the card is a lit cel over a painted field,
warm both modes, never gray** — every leg a re-point / re-host / consume:

| leg | current state | union move (the deft integration) | DEPEND / CONSUME |
|---|---|---|---|
| **field behind card** | 0 fields; gray-over-white composite | re-host demo stages on `<ShowcaseFrame tier="field">` over `paper-field`; a `<Card>` with no `.paper-field`-behind mounts a STATIC local `paper-field` underlayer on the host `background-image` stack BELOW `.paper-grid` (the proven coexistence seam), gated off when an ancestor supplies one. **Per the challenge R5: the common case is ONE field on the grid/scroll wrapper; the per-card underlayer is the ORPHAN fallback, not the default** (so a 50-card grid is ONE field paint, not 50). | DEPEND `BD.W-GLASS-FIELD`/`BD.W-PAGE-FIELD` (`@utility paper-field`); CONSUME the shipped `<ShowcaseFrame tier="field">` + the `cards.css` host-bg-image seam |
| **keyed edge** | 4%-α border, flat/inverted cast | the card CONSUMES `BD.W-GLASS-KEY-EDGE` (it re-points the EXISTING two-stop rim onto `--glass-key` + re-bases `.shadow-cartoon-*` universally). The CARD-side delta: floor the card's border-ink ≥8% warm + the moving cast rides the inert `.cartoon-cast` child (the cartoon-shadow golden's caster). **WebKit floor (challenge R1): the keyed conic rim is a `@supports (mask-composite: exclude)` ENHANCEMENT over the SHIPPED two-stop directional rim as the cross-engine floor — never a hard mask-composite dependency.** | DEPEND `BD.W-GLASS-KEY-EDGE` (the `--glass-key` re-point owns the rim+cast); CONSUME the shipped two-stop rim (`glass/rim.css:70-83`) + the `.cartoon-cast` child (cartoon-shadow golden) |
| **warm material floor** | `--glass-tint-strength: 0%`; tinted rungs button-scoped | ENROLL the card's resting/quiet surface onto the SHARED `:where(.btn-glass, .segmented-indicator, …card-selector)` seam (ONE rule, genuinely shared, DRY) + a CARD-LOCAL non-zero `--glass-tint-strength` scoped to the card surface (NOT the global default). Enumerate + assert the 6 seam-readers unchanged (drawer/menu/veil/jubilance/btn-glass/segmented). | re-point on the SHIPPED `--glass-tint-*` seam (`glass/surfaces.css:283-307` + `glass/ladder.css`) |
| **motion weight** | flat `translate` hover; press uncoupled | the hover arcs toward `--glass-key` (vol-preserving ~1.015) + the press↔cast shadow-gap coupling (squash closes the gap, release overshoots open) + morph-more-on-move (velocity term), wired through the EXISTING `useLiquidPress` `--card-press-t` drive + the `cartoon-surface` transition re-pointed. **Register `@property --cast-dist`/the cast props (challenge R1/R2 — the dead-no-op fix) + drive the shadow THROUGH the var, NOT a hardcoded literal.** | DEPEND `BD.W-MOTION-WEIGHT` (`--motion-weight`) + `BD.W-CARTOON-PUNCH` (`--ease-cartoon-punch`); CONSUME `useLiquidPress` + the `.cartoon-cast` caster |
| **scroll-shrink weight** | 4 lanes `linear both` | re-express the 4 lane keyframes through the `linear()`-sampled spring/punch curve; re-point `--card-header-bg` to the tinted warm-admit seam. KEEP the asymmetric cliff + the architecture. | DEPEND `BD.W-MOTION-WEIGHT`/`BD.W-CARTOON-PUNCH`; CONSUME the shipped `scroll-driven.css` `linear()` idiom |
| **iOS-27 enhanced card** | unassembled facilities | `tier="deep"` + `surface="glass"` over a live field + `--radius-concentric` children + vibrant `--glass-accent` rim — a TIER COMBINATION, never a new component. The `<Card tier="deep">` IS the card→sheet grow source/target. | DEPEND `BD.W-CONCENTRIC-RADIUS` + `BD.W-ICONCHIP-GLASS`; CONSUME `deep`/`--glass-bg-sheet`/`--glass-accent`/`useLiquidReveal`+`useBloomUp` (NOT `useElementBloom` — corrected name) |

### The five challenge hardenings FOLDED into the union path

1. **(C1·R1 / C2·R2 / C3·R6 — the dead motion mechanism)** the moving cast is NOT a transitioned
   `box-shadow` with an unregistered `--cast-dist` (a triple-dead no-op + a paint-storm on a grid). It
   rides the inert `.cartoon-cast` child layer (transform/opacity, compositor) with the cast props
   `@property`-registered, driven on a `linear()` spring with a real overshoot + a 1-frame follow-
   through lag. **K6 gains a frame-series readback** (press-down vs rest cast offset SHRANK + scaleX·
   scaleY≈1), so K6 is gated, not narrated.
2. **(C1·R2 — the material-floor blast radius)** NOT a global `--glass-tint-strength` re-point and NOT
   a card-local fork. ENROLL the card surface onto the shared `:where()` seam + scope the strength
   card-locally; enumerate the 6 seam-readers + assert each unchanged in a born-RED bite.
3. **(C1·R3 / C2·R1 / C3·R1 — the catch-light over text)** the `::after` `mix-blend-mode: screen`
   catch-light is named in the spec, clipped to NOT wash the text column (or moved below content), and
   gated OFF under `prefers-contrast: more`; **K-AA gains a text-over-catch-light contrast bite** over
   the dense §7 composite, both modes.
4. **(C2·R1 / C3·R1 — the WebKit capture)** the keyed conic rim is a `@supports` enhancement over the
   shipped two-stop rim floor; **K9 requires a CAPTURED WebKit paint artefact** (`_spike-*-webkit.png`
   from a real WebKit engine) for the conic miter + the `oklch` conic banding — not a reasoned claim.
5. **(C2·R5 — the per-card grid cost)** the field is ONE paint on the grid/scroll wrapper; the per-card
   underlayer is the orphan exception. **K9 gains a 50-card scroll trace** (the `backdrop-filter` blur-
   resample is the real cost) on both engines.

### What the UNION explicitly REFUSES (no-dup, no-fork — reconciled vs the 116-wave set)

- **No new card component.** The enhanced card is a tier combination.
- **No `surface="lens"` member** (all three challenges credit dropping it as the deft call).
- **No second field** — `paper-field` is DEPENDed from the page-background / glass-material siblings (ONE
  `@utility`, two floors — already merged in those amendments).
- **No second edge** — `BD.W-GLASS-KEY-EDGE` owns the `--glass-key` rim+cast re-point universally; the
  card consumes it. The card does NOT re-mint a keyed rim.
- **No second motion currency** — `--motion-weight` / `--ease-cartoon-punch` are BOOKED by
  `BD.W-MOTION-WEIGHT` / `BD.W-CARTOON-PUNCH`; the card DEPENDs, never duplicates.
- **No `useElementBloom` mint** — the bloom spine is `useLiquidReveal` + `useBloomUp` (corrected from
  the golden's mis-citation); the card→sheet expand composes them via `BD.W-CARD-SHEET-EXPAND`.
- **No goo `filter:url()` ancestor of a card** — any fission/metaball rides a SIBLING layer (the §L7/§L1
  isolation trap). Live-confirmed 0 on the route — gate-lock it.

---

## 3 — CONVERGENCE

**Union verdict: REFINE-dominant** (the architecture survives; the gray + the edge are the only broken
legs, both cured by CONSUMING sibling goldens). The current `Card.vue` + `cards.css` is a fit,
proportioned, Safari-safe, orthogonal-axis system — its disease is the §3 field-and-edge composite, NOT
its API. The two genuinely-new card-band src/ surfaces are (a) the card-local static field underlayer
(the orphan fallback) and (b) the card-surface enrollment on the shared tint seam; everything else is a
token re-point or a consume of `paper-field` / `--glass-key` / the motion currency / the cartoon-cast.

**Convergence: ~80%.** The golden + the three challenges + this assay converge on the mechanism, the
born-RED gate bites the live disease, and every lever is reconciled to a real on-disk or sibling-DEPEND
primitive. The remaining ~20% is build-time: (1) the captured WebKit rim artefact + the 50-card scroll
trace (the unmet §L7 capture bar); (2) the `@property`-registered cast + the frame-series K6; (3) the
card-surface tint-seam enrollment + the 6-reader blast-radius bites; (4) the catch-light-over-text AA
bite; (5) re-grounding the gate as a π/visual spec (`tests-visual/`), NOT the device-free `proof:no-gray`
source script (the challenge R7 gate-family split).
