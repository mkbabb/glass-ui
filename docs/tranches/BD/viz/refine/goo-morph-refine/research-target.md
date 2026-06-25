# RESEARCH-2 — the goo-morph DESIGN TARGET (the slow, fat, weighty liquid worm)

The fix-mechanism's north star. The user judged the SHIPPED `W-PAGER-GOO-MORPH` worm
(`useWormMorph` + `PagerDots.vue`) on `/motion/deck` and rejected it on FOUR axes at once:

> "/motion/deck is AWFUL... the goo-morph dot animation is FAR TOO FAST, the dot is FAR
> TOO SMALL, and the goo + morphing are FAR TOO SUBTLE. It should STRETCH and FLOW much
> MORE SLOWLY — a weighty, dramatic, liquid worm that visibly stretches/necks/merges
> between dots, not a fast subtle flicker. SLOW it down dramatically, make the DOTS
> BIGGER, make the GOO MERGE far more pronounced/fatter, and give it real liquid WEIGHT
> + flow. Push every knob FAR toward slow+big+gooey+weighty."

The mechanism is RIGHT (the two-edge stretch→contract worm + the SVG-goo metaball layer
is the correct architecture — RESEARCH-1's `research-google-worm.md` is unchanged law).
This is a TUNING refine: every knob pushed FAR toward slow + big + fat-goo + weighty.
NO architectural rewrite, NO new spring family, NO second squish engine, NO second goo
filter — the W-PAGER-GOO-MORPH fences ALL hold.

---

## 1. The binding north star (what "liquid worm" MUST mean)

- **`feedback_liquid_weight_universal` (the user, "remember this always").** ALL motion
  carries INERTIA, WEIGHT, BOUNCE, liquid-glass deformation. The pager/deck dots
  GOO-MORPH from one to another like the goo-blob metaball — the active indicator MERGES
  + STRETCHES as it travels, NEVER a hard hop and NEVER a fast subtle flicker. A
  spring-with-overshoot + a volume-preserving squish reads ALIVE; a fast subtle shift
  reads CHEAP. The refine's whole job: make the WEIGHT + the LIQUID DEFORMATION
  unmistakable.
- **DESIGN.md §L1 Liquid Glass + §L2 Spring Physics.** Glass is a refractive material
  that BENDS + CONCENTRATES light (not a frost). The motion language is spring physics:
  `response` + `dampingFraction`, the `--spring-bouncy` (ζ≈0.55, overshoot ~+12.6%, the
  "playful arrival" register) is the canonical "blob morph / celebratory reveal" spring.
  The worm IS a blob morph — `--spring-bouncy` is the correct register; the refine keeps
  it and gives it a SLOWER own clock so the weight reads.
- **iOS 26 Liquid Glass (corroborated, RESEARCH-2 web).** The system's morph is governed
  by a **spacing/proximity parameter** — elements within a distance MERGE into ONE glass
  shape during a transition (the literal metaball model). "Glass materials FLOW from one
  shape to another, maintaining their material properties throughout" — a deliberate,
  WEIGHTY flow, not a flicker. The carousel-dots-morph-into-Search homescreen gesture is
  the same dot-morph family. The takeaway for the target: the merge distance (the goo
  bridge reach) must be GENEROUS (fat neck across the whole gap), and the flow must be
  SLOW enough that the eye reads the material flowing, not snapping.
- **BA.W-NO-GRAY warm-chroma floor (the COLOR fence — unchanged).** The worm + goo paint
  `--pager-dot-active: var(--foreground)` — the warm-amber ink (OKLab hue 62-75, never
  gray). The refine touches GEOMETRY + TIMING + GOO only; it NEVER re-tints toward gray
  and NEVER mints a new color token. The warm-cream identity holds.

---

## 2. Root-cause diagnosis — WHY the shipped worm reads fast/small/subtle

Measured off `PagerDots.vue` (HEAD) + `useWormMorph.ts`. The four defects are coupled —
the small dot is the ROOT that makes the goo + the stretch invisible:

| # | Knob (HEAD) | Value | Why it reads wrong |
|---|---|---|---|
| **A — TOO SMALL** | `--pager-dot-size` | `0.375rem` = **6px** | The worm rests at 6px in a 24px cell. Pitch (center-to-center) ≈ **30px** (24px cell + 6px gap). Dot:pitch ≈ **0.2** — a tiny pip islanded in a big gap. At 6px the stretch capsule is a HAIR, the goo blur has almost no opaque mass to bridge, and the whole morph is sub-visible. **This is the root cause** — fix the size and the goo/stretch become legible. |
| **B — TOO FAST** | `--pager-worm-duration` | `1.3s` (already bumped from 0.57s, "safe-blind" partial) | The travel clock was raised but the OTHER knobs were left tiny, so even at 1.3s a 6px worm flickering across a 30px gap with a 1.08 squish still reads fast-and-subtle. The clock alone cannot carry weight — the deformation has to be VISIBLE for the slowness to register. Also: at 6px the eye has nothing to track, so the motion feels like a flicker regardless of duration. |
| **C — GOO TOO SUBTLE** | `feGaussianBlur stdDeviation` = `4`; `feColorMatrix … 18 -7`; `--pager-goo-layer-opacity` = `0.52` | With 6px opaque shapes, a blur of 4 + a sharp threshold (18/-7 ≈ A:|B| ≈ 2.6:1, crisp) pinches the neck off almost immediately — the bridge barely forms before it snaps. The 52% layer opacity further dims the already-thin neck. The metaball "fat neck wells up + releases" read NEVER materializes. |
| **D — MORPH TOO SUBTLE** | `--pager-worm-max-stretch` = `1.08`; the sqrt cross-pinch | 1.08 is the SegmentedTabs gel cap (≈+8%) — correct for a tab underline, FAR too timid for a hero dot-morph. The worm should VISIBLY neck-thin as it stretches (volume-preserving), reading as liquid mass flowing, not a rigid capsule sliding. |

**The coupling (the mechanism builder MUST honor):** the dot size is the master scale.
Every other knob is RELATIVE to it. Bigger dots → the goo blur has mass to bridge → the
stretch capsule is visible → the slow clock has something to track. Tune the SIZE first,
then the goo/stretch/clock against the new size.

---

## 3. THE TARGET SPEC — every knob, pushed FAR (the values the fix lands)

These are the DESIGN TARGET anchor values (the fix-mechanism prototypes + judges
against them; the judge may walk ±20% but the DIRECTION + magnitude is binding). All are
`--pager-*` tokens (the consumer retint/retune seam — a consumer can dial back for a calm
deck; the LIBRARY DEFAULT is now the dramatic liquid worm, presets-in-consumers).

### A — DOTS BIGGER (the master scale — fix this first)

| Token | HEAD | **TARGET** | Rationale |
|---|---|---|---|
| `--pager-dot-size` | `0.375rem` (6px) | **`0.75rem` (12px)** | DOUBLE the pip. 12px in a (widened) cell reads as a real dot, not a speck. Dot:pitch climbs from 0.2 toward ~0.33+ — the dots are CLOSE enough that the goo bridge spans them with mass (the iOS "spacing" proximity model). The worm rests at 12px → its stretch capsule is a substantial liquid mass. |
| hit-cell + goo-dot cell | `24px` | **`28px`** (≥ the WCAG-2.5.5 floor stays; goo-dot cell tracks it) | Keep the 24px+ touch floor (a11y INVIOLATE). Widen the goo-dot cell a hair so the 12px pip has breathing room and the pitch stays proportionate (a 12px dot in a 24px cell is cramped). The pitch becomes ~28+gap; the dot:pitch ratio lands in the legible band. |
| `--pager-dot-elongated` | `1.5rem` (24px) | **`2.25rem` (36px)** | The worm's max-elongation reference scales with the bigger dot (1.5× the rest, matching the bigger pitch). Reserved footprint only — the elongation is `scale`, never an animated width (P5 holds). |

> **A11y note (binding):** the 24px transparent `<button>` hit-target is the WCAG-2.5.5
> floor and stays ≥ 24px (28px target keeps margin). The BIGGER PAINTED dot lives in the
> goo layer (the `.goo-dot::before` pip + the worm); the interaction layer is byte-kept.
> A bigger visual dot does NOT shrink the hit target — they are separate layers.

### B — SLOW IT DOWN DRAMATICALLY (real weight)

| Token | HEAD | **TARGET** | Rationale |
|---|---|---|---|
| `--pager-worm-duration` | `1.3s` | **`1.6s`–`1.8s`** (anchor **1.7s**) | The travel clock is the WEIGHT. 1.3s with tiny dots still flickered; with 12px dots + a fat neck + a deep squish, 1.7s lets the eye TRACK the worm stretching across the gap, the neck welling up at the midpoint, then contracting + overshooting onto the target. This is ~3× the shipped `--spring-bouncy-duration` (0.57s) — a deliberate, dramatic, weighty flow. (A consumer wanting a brisk pager re-points the token; the library default is the dramatic worm the user asked for.) |
| spring register | `--spring-bouncy` | **`--spring-bouncy` (KEEP)** | ζ≈0.55, overshoot ~+12.6% — the "playful arrival / blob morph" register (DESIGN.md §L2). KEEP it (no new spring family — the W-GLASS-CAL fence). The OVERSHOOT is the bounce; the SLOW own-clock (`--pager-worm-duration`, decoupled from `--spring-bouncy-duration`) is the weight. The `linear()` curve's overshoot at ~14% of the clock still fires; the worm lands with a visible spring rebound. |

> **The clock decoupling (already correct in the code):** `--pager-worm-duration` is its
> OWN token (NOT `var(--spring-bouncy-duration)`), so slowing the worm does NOT re-time
> every other `--spring-bouncy` consumer. The refine raises THIS token only. The
> per-spring-clock canon (motion-canon P4) is honored — the worm has its own settle clock.

### C — GOO MERGE FAR MORE PRONOUNCED / FATTER

| Token | HEAD | **TARGET** | Rationale |
|---|---|---|---|
| `feGaussianBlur stdDeviation` | `4` | **`7`–`9`** (anchor **8**) | The blur radius IS the bridge LENGTH + stickiness (RESEARCH-1 §4). With 12px dots, a blur of 8 makes the soft alpha falloff of two dots OVERLAP generously across the gap → a FAT, sticky liquid neck wells up well before the worm reaches the dot and releases late. The "Google-deck goo" / iOS metaball read. (RESEARCH-1 band is 4-10 for dot scale; 8 is the fat end for our now-bigger geometry.) |
| `feColorMatrix` last row | `… 18 -7` (A:\|B\| ≈ 2.57) | **`… 14 -5`** (A:\|B\| ≈ 2.8, SOFTER threshold) | Lower the alpha-contrast multiplier (18→14) so the merge threshold is GENTLER — the bridge forms across a WIDER gap + the neck stays FATTER longer before it pinches off (a crisper 18/-7 snaps the neck early). Keep the A:\|B\| ratio near ~2-3:1 (the clean-blob band, no ringing — RESEARCH-1 §4). The softer threshold = a fatter, longer-lived metaball neck = the "far more pronounced goo merge" the user wants. |
| `--pager-goo-layer-opacity` | `0.52` | **`0.62`–`0.70`** (anchor **0.65**) | LIFT the layer presence so the fat neck reads SOLID + WET, not a dim ghost. 0.52 dimmed an already-thin neck; with a bigger fatter neck, 0.65 makes it read as substantial liquid mass while staying translucent-glass (NOT opaque — the rail still reads as a glass pill). The warm-ink stays warm (NO gray). |
| `.goo-dot[data-active]::before` opacity | `0.35` | **`0.30`–`0.40` (KEEP ~0.35)** | The active dot's own pip stays dim (the worm sits ON it — the brightness hierarchy). KEEP; the bigger worm + fatter neck carry the active read. |

> **The opaque-layer technique is LOAD-BEARING (KEEP).** Every shape inside the filter
> stays full-alpha `currentColor`; the translucency lives ONCE at `--pager-goo-layer-opacity`.
> A translucent shape INSIDE the filter breaks the alpha threshold (the goo erases it).
> The refine LIFTS the layer opacity but NEVER pushes per-shape alpha into the filter.

### D — REAL LIQUID WEIGHT + FLOW (the squish deepens)

| Token | HEAD | **TARGET** | Rationale |
|---|---|---|---|
| `--pager-worm-max-stretch` | `1.08` | **`1.35`–`1.5`** (anchor **1.4**) | The biggest leap. 1.08 (the tab-underline gel) is FAR too timid for a hero dot-morph. 1.4 = a VISIBLE volume-preserving liquid swell: the worm stretches ~+40% along travel velocity, the cross-axis reciprocally PINCHES (the `useLiquidFlex` reciprocal, axis-derived `scale: stretch, 1/stretch`). This reads as liquid mass NECKING + flowing, not a rigid capsule sliding. The user's "real liquid WEIGHT + flow" + "stretches/necks". (Still capped — 1.4 is a fat gel, not infinite taffy; the cross-pinch keeps the volume.) |
| the `len/W` two-edge ratio | (geometric, peaks ~B−A/W) | **unchanged mechanism** | The worm's PRIMARY elongation is the two-edge geometry (head/tail), which peaks at ~`1 + (B−A)/W` at the midpoint — with bigger dots + bigger pitch this is still a dramatic span (the capsule bridges both dot centers). The `--max-stretch` swell is the EXTRA travel-velocity squish ON TOP (released at arrival). Both deepen together → the dramatic liquid worm. |

---

## 4. The single-knob summary (the fix-mechanism's dial table)

| Knob | HEAD | TARGET (anchor) | Direction |
|---|---|---|---|
| `--pager-dot-size` | 6px | **12px** | 2× bigger (MASTER) |
| goo-dot / hit cell | 24px | **28px** (a11y floor kept) | wider |
| `--pager-dot-elongated` | 24px | **36px** | 1.5× |
| `--pager-worm-duration` | 1.3s | **1.7s** | ~3× the 0.57s base → weighty |
| `--pager-worm-spring` | `--spring-bouncy` | **KEEP** | the overshoot IS the bounce |
| goo `stdDeviation` | 4 | **8** | 2× fatter neck |
| goo threshold `A \|B\|` | 18 / -7 | **14 / -5** | softer → fatter, longer-lived neck |
| `--pager-goo-layer-opacity` | 0.52 | **0.65** | solid wet neck (still glass) |
| `--pager-worm-max-stretch` | 1.08 | **1.4** | dramatic liquid swell |

---

## 5. The FENCES (what the refine MUST NOT break)

1. **NO architectural rewrite.** The two-edge worm + SVG-goo layer is RIGHT — this is a
   token retune of `PagerDots.vue` + (if the squish needs it) the `useWormMorph` defaults.
   The mechanism (RESEARCH-1's `research-google-worm.md`) is unchanged.
2. **NO new spring family.** `--spring-bouncy` is a shipped `SPRING_PRESETS` row (the
   W-GLASS-CAL fence). The refine raises `--pager-worm-duration` (the worm's OWN clock),
   NEVER mints a spring. `proof:pager-goo` P3 stays GREEN.
3. **NO second squish engine.** The squish stays `useLiquidFlex` (`--stretch` reciprocal,
   `maxStretch` live-read). Raising `--pager-worm-max-stretch` is a TOKEN bump, not a new
   `tanh`/reciprocal write. `proof:pager-goo` P2 stays GREEN.
4. **NO second goo filter.** The refine retunes the EXISTING `#pager-goo` filter's static
   `stdDeviation`/`feColorMatrix` VALUES (authored once, never ANIMATED — the WebKit
   #184601 trap). `proof:pager-goo` P4 stays GREEN (static filter, opaque shapes, sRGB,
   `@supports`-gated, plain-worm floor).
5. **COMPOSITOR-ONLY.** The elongation is `scale` over a reserved footprint (the bigger
   `--pager-dot-elongated`), NEVER an animated `width`. `proof:no-layout-animation` +
   `proof:pager-goo` P1 stay GREEN. The dot-size token bump is a one-time layout reserve
   (the rest footprint), not a per-frame layout animation.
6. **PRM-carved.** Under `prefers-reduced-motion: reduce`: the worm SNAPS to the target
   (no stretch frame), `--stretch` stays 1, the goo layer is `display:none`, the
   color/opacity fade survives (the pager still indicates). `proof:pager-goo` P5 GREEN.
7. **Safari-compatible.** `@property`/`feGaussianBlur`/`feColorMatrix` are all
   Safari-Baseline; the filter is STATIC; `will-change: transform` forces the re-raster
   (WebKit #184601); the goo layer is `@supports (filter: url(#x))`-gated with the plain
   transform worm as the everywhere floor. The bigger blur (8) is still cheap on a
   ~150px-wide dot row (the §4 perf caveat is for large fills, not a dot strip).
8. **WARM-CHROMA (no gray).** The worm + goo paint `var(--foreground)` (warm-amber, OKLab
   hue 62-75). The refine touches geometry/timing/goo ONLY — NO re-tint, NO new color
   token, NO gray. The `--pager-dot-*` token retint seam (`slides` → `--ncsu-red`) is
   byte-kept.
9. **a11y byte-kept.** The 24px+ transparent hit-target stays ≥ WCAG-2.5.5; the worm + goo
   layer are `aria-hidden` (no role); the `pattern` aria split + the `pagerWindow`
   windowing + the focus-survival are unchanged. The BIGGER dot is the PAINTED layer, not
   the hit target.
10. **Lands ONCE in PagerDots.** DeckPager + the carousel inherit the retuned worm for
    FREE (the one-home discipline; ≥2 consumers by construction). NO DeckPager fork.

---

## 6. THE ACCEPTANCE BAR (the gestalt verdict the fix is judged against)

A FRESH whole-page both-mode `:5199` `/motion/deck` FRAME-SERIES capture of a pager
selecting A→B (NEVER `reducedMotion` for the morph arm), surface-hash floor, BOTH
Chromium + WebKit, desktop + mobile. The verdict is PASS IFF ALL hold (each maps to a
rejected defect):

- **BIG (defect A killed).** The resting dots read as SUBSTANTIAL pips (≈12px painted, a
  real dot — not a 6px speck). A pixel-width scan of a resting dot reads ≥ ~10px. The dots
  are visually PROMINENT in the glass pager pill.
- **SLOW + WEIGHTY (defect B killed).** The travel is DELIBERATE — the eye TRACKS the worm
  stretching across the gap over ~1.7s, the neck welling up at the midpoint, the contract +
  overshoot landing. A frame-series across the clock shows MANY distinct in-flight frames
  (not a 2-3-frame flicker). The position curve is NON-MONOTONIC (the `--spring-bouncy`
  overshoot + rebound — the weight reads).
- **FAT GOO (defect C killed).** At the mid-flight frame the worm + the bridged dot read as
  ONE connected silhouette with a FAT, SOLID, WET neck (a pixel-connectivity scan across the
  gap finds a SUBSTANTIAL bridge above the goo threshold — not a thin pinched thread). The
  neck wells up EARLY (the worm hasn't reached the dot yet) and releases LATE — the
  pronounced metaball merge. The neck is visibly THICKER than the shipped thin bridge.
- **DRAMATIC MORPH (defect D killed).** The worm VISIBLY stretches + cross-pinches (the
  volume-preserving liquid swell, ~+40% along travel / reciprocal thin on the cross axis) —
  it reads as liquid MASS NECKING + FLOWING, not a rigid capsule sliding. The `lenRatio` at
  the midpoint is dramatically > 1 (spans both dot centers); the `--stretch` swell peaks
  mid-travel + releases at arrival.
- **LIQUID WORM gestalt (the binding judgement).** The dot indicator reads as a WEIGHTY,
  DRAMATIC, LIQUID WORM that visibly stretches/necks/merges between dots — the iOS-26
  Liquid Glass "material flowing from one shape to another" + the goo-blob metaball. It is
  FAR slower + bigger + gooier + heavier than the shipped flicker. **Born-FAIL on HEAD
  (the small/fast/subtle worm is the rejected read); GREEN at the refine's close.**
- **PRM-INSTANT (the carve survives).** Under `prefers-reduced-motion: reduce`: the active
  change is a SINGLE discrete snap (no stretch frame), the goo layer is gone (plain dots),
  the fade survives. The pager still indicates correctly.
- **BOTH ENGINES.** The fat goo renders on WebKit (the `will-change`-promoted re-raster
  clears #184601) OR the `@supports` gate floors to the plain stretching worm (still BIG +
  SLOW + deformed, just no neck) — EITHER is a PASS; a stale/blank filter frame FAILS.
- **The fences (§5) all GREEN.** `proof:pager-goo` P1-P6, `proof:no-layout-animation`, the
  warm-chroma floor, the a11y register — all hold. No new spring, no second engine, no
  gray.

The captured DELTA lands at
`docs/tranches/BD/audit/visual/W-PAGER-GOO-MORPH-REFINE-DELTA.md` — the rest→stretch→fat-
bridge→contract→overshoot→land frame-series (BIG dots, SLOW clock, FAT neck), the
before/after vs the shipped thin/fast worm, the PRM single-snap, both engines, both modes.

---

## Sources

- [Mastering iOS 26's Liquid Glass — morph/spacing/proximity merge model](https://medium.com/@jaikrishnavj/mastering-ios-26s-liquid-glass-a-comprehensive-developer-s-handbook-2bba9965b024)
- [Understanding GlassEffectContainer in iOS 26 — the spacing parameter merges elements within distance into one glass shape](https://dev.to/arshtechpro/understanding-glasseffectcontainer-in-ios-26-2n8p)
- [iOS 26 Liquid Glass Insights — material flows from one shape to another, maintaining material properties](https://medium.com/@bhupesh.pruthi/ios-26-liquid-glass-insights-7397ada6e2d6)
- RESEARCH-1 — `docs/tranches/BD/viz/goo-morph/research-google-worm.md` (the worm + goo mechanism, unchanged law)
- `feedback_liquid_weight_universal` (the binding animation law)
- `DESIGN.md` §L1 Liquid Glass + §L2 Spring Physics (`--spring-bouncy` = blob-morph register)
- CLAUDE.md §BA.W-NO-GRAY (warm-chroma floor) + §W-PAGER-GOO-MORPH (the shipped mechanism + fences)
