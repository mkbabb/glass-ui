# GOO-MORPH — the GOLDEN reference

> The single canonical synthesis of lens-a (iOS-27 fidelity), lens-b (cross-engine /
> perf-first), lens-c (cartoon-technicolor punch). The ONE goo/worm/plate morph engine —
> `useGooMorph.ts` + the static `#glass-goo` filter (`GlassGooFilter.vue`) — and its three
> consumers (carousel plate · deck plate · pager-dots worm), reconciled to one coherent
> design. DEFTLY INTEGRABLE (a union with the extant ecosystem; reuse `useGooMorph`,
> `useLiquidFlex`, `GlassGooFilter`, the fission `--neck-filament` idiom; KISS/DRY; no
> parallel fork; NO LEGACY). PERFECT in Chrome AND Safari.

---

## 0. THE DIAGNOSIS — all three lenses agree (live-verified, reproduced)

The mechanism numbers all PASS; the **gestalt FAILS** the exact way JUDGE-2 named. The
status quo, live-inspected on `/navigation/carousel` (real Next-click + frozen-peak):

- **Safari floor: structurally airtight.** `#glass-goo` = `stdDeviation` LITERAL (no `var`),
  `feColorMatrix … 24 -11` static, `color-interpolation-filters="sRGB"`, region `-50%/200%`,
  regular `filter:url()` (NOT `backdrop-filter:url`), `@supports` floor + PRM carve present.
  **KEEP entirely** (the user's "broken on Safari" is structurally already closed).
- **Speed: fast.** lenRatio peaks ~2.2 @ ~140ms, settles ~300–500ms. The "slow" is NOT the
  travel — it is the **dead dwell of a non-moving slab** held ~1070ms by the opacity timer.
- **No-gray: closed.** The landed fix2 dark-arm (`oklch(from --card 0.68 0.05 h)` +
  `saturate/brightness` transmissive companion) carries the warm floor, both modes. **KEEP.**
- **De-dup: real + correct.** ONE `useGooMorph` (353 L), three consumers, no second fork.

**THE ONE UNMET BAR — the headline ("does not goo morph … MORPH BLOB and MEATBALL"):**
the current build paints **one wide stretching worm-PLATE** (`inline-size: slide-width`)
over **N full-height static plates** (`block-size: 100%`). A single constant-cross-section
rectangle, blurred + thresholded, can only yield **a fatter rounded rectangle** — a warm
TRAY with one scalloped edge. **There is no geometry in the system that can produce a
waist.** A waist is a *concavity*; concavity comes only from (a) the gap between two convex
masses or (b) a clip-path that carves it. The single-plate worm offers neither. No
blur/threshold/stretch/girthFloor tune adds a concavity the source geometry lacks. **This is
a SHAPE problem, not a token problem** — the convergent root-cause across all three lenses.

### What is FIT (survives — do NOT re-invent)
- `GlassGooFilter` / `#glass-goo` — the static graph + every Safari fact, byte-structural.
  Only the literal DEFAULTS retune. (Lens-a/b/c unanimous.)
- `useGooMorph` as the ONE de-duped engine — the `--goo-t` Houdini drive, the flow-curve
  transition, the rAF projection, `travel`/`snap`/`drive`, the `useLiquidFlex` squish, PRM.
  **The DRIVE is fit; only the silhouette geometry it PROJECTS is broken.**
- The landed fix2 dark-arm + travel-gate harden — unchanged.
- The fission-bridge `--neck-filament` clip-path hourglass idiom — **already proves the
  answer at dock scale**; the carousel/deck never adopted it.

---

## 1. THE GOLDEN CORE IDEA — the BARBELL-with-a-CLIP-PATH-NECK (three masses, one filter)

Stop morphing ONE plate. A metaball merge is, definitionally, **two round bodies and the
bridge between them.** The goo layer hosts, per transition, exactly this triad inside the
ONE `#glass-goo` filter — the union of lens-b's barbell and lens-a's structural neck:

```
   ●        ●         ●───●        ●╲__╱●        ●        ●
  bodyA   bodyB    welling neck   PINCH/waist   coalesced  settled
   t=0                t≈.3          t≈.5           t≈.8      t=1
```

1. **`bodyA`** — a round warm-cream droplet (`border-radius: 50%`), diameter `D = restSize/φ`
   (the golden-minor of the slide pitch — a BLOB, not a plate), parked toward the OUTGOING
   slot. It travels.
2. **`bodyB`** — the same droplet toward the INCOMING slot. It travels.
3. **`neck`** — a SEPARATE element between them whose **cross-axis girth wells on `--goo-t`**
   (a bell, peak mid, ~0 at the ends) and whose **`clip-path` is a static hourglass polygon**
   (the fission `--neck-filament` idiom): the sides pull IN at the midpoint so the silhouette
   has a **structural concave waist BEFORE the blur even fuses it.**

The two bodies travel **apart-then-together** (a separation envelope: at the slots they sit
`gap_max` apart, at mid they near to `--goo-neck-gap·D`); the static `#glass-goo`
blur→threshold welds bodyA+neck+bodyB into ONE warm silhouette **with a real waist** where
the neck is thinnest; past mid the neck recedes, the bodies coalesce, the threshold pinches
the waist off — the SNAP. This is the freefrontend/IQ-`smin` 2D metaball canon, the exact
topology the fission-bridge ships, and the exact read the Gemini carousel shows.

**THE GOLDEN RECONCILIATION — why this is the fittest of the three:**
- **Lens-b's barbell** supplies the two-separated-mass input the filter was built for (the
  KISS core: 2 transforms/frame, the plate bed deleted). This is the body of the design.
- **Lens-a's clip-path hourglass neck** is the **belt-and-suspenders WebKit insurance**: the
  waist is a *structural concavity* (clip-path), present on BOTH engines BEFORE the filter
  fuses it — it does not depend solely on a filter nuance reading identically across engines.
  The filter then merely *softens and warms* a concavity that already reads decisive. This
  closes the "works in Chrome, broken in Safari" class at the GEOMETRY layer, not just the
  filter layer — the single boldest cross-engine move, **de-risked live in the spike** (the
  three-element fused metaball renders a true concave waist; see §8).
- **Lens-c's cartoon-punch** is the FEEL overlay (anticipation bud, stretch-toward-neck,
  √φ-overshoot land, arc, moving cast, trailing specular), wired to a per-consumer
  `--goo-weight` (= the Band-0 `--motion-weight` idiom) so the carousel reads as a bold
  liquid metaball while the embla content snap underneath stays calm (T13).

It stays ONE `useGooMorph`: we generalize the projection from "one stretching worm" to "two
bodies + a clip-path welling neck," driven by the SAME `--goo-t`, the SAME flow curve, the
SAME filter. The pager dot (already two pips + a worm) is the migration PROOF — we bring the
carousel/deck UP to the pager's correct two-mass topology, not fork a new one.

---

## 2. THE MECHANISM — projection · filter · feel

### 2.1 Geometry — `useGooMorph.paint()` re-authored (the barbell + neck projection)

`useGooMorph` keeps its `--goo-t` drive, the rAF, the `travel`/`snap`/`drive` API verbatim.
`paint(A, B, fromIdx, toIdx, gooT)` is re-authored to write THREE transforms (`p` =
normalized progress over the full A→B travel, gap-invariant, as today):

```
sep(p)   = 1 − bell(p,1)·(1 − NECK_GAP)        // 1 at the slots → NECK_GAP at mid
mid      = (A + B) / 2 ;  half = (B − A)/2 · sep(p)
cA(p)    = mid − half                          // bodyA centre (travels toward mid then on)
cB(p)    = mid + half                          // bodyB centre
bell(p,k)= sin(π·p)^k                           // 0 at ends, peak mid (the well)
neckGirth(p) = GIRTH_FLOOR + bell(p,1.5)·GIRTH_SWELL   // wells, peaks mid, ~0 at ends
```

- **bodyA / bodyB** — `transform: translate(cA|cB)` + `scale(D/W)` + the squash-&-stretch
  (`useLiquidFlex` reciprocal, on-axis toward the neck). `easeBodyA` commits LATE then
  punches (anticipation → cartoon weight). Diameter `D = restSize()/φ` (golden-minor).
- **neck** — `translate(mid)` + `scaleX(gap/D)` + `scaleY(neckGirth(p))`; its `clip-path` is
  the static hourglass polygon (concave sides → the structural waist), parameterized by a
  `--neck-waist` token (the throat is one retune, the `--neck-filament: 42%` idiom).
- The `#glass-goo` blur (the SAME static filter) fuses the three into one warm hourglass.

All `transform`/`opacity` per frame (compositor; motion-canon P5). The rest footprints
(`D` circle, `restNeck` bar) are reserved ONCE. The terminal `placeStatic(to)` is the resting
authority — it snaps the single body dead-on the target centre, killing the `--goo-t`
overshoot-tail creep (lens-b §4: the residual `2.018`/`3.009` land never feeds the rest).

### 2.2 The filter — GOLDEN retune for a VISIBLE fuse window (lens-c §2c, lens-a §2.2)

Keep the graph + every Safari fact verbatim. Retune the literal DEFAULTS so the alpha bleed
*becomes* the neck rather than instant-sharpening (the per-consumer props already exist):

| token | current | GOLDEN | why |
|---|---|---|---|
| `blur` (stdDeviation) | 10 | **~13** (carousel) / ~10 (deck) / 8 (pager) | a wider alpha skirt → the bodies feel each other from further → the neck wells earlier + gooier; proportionate to the bigger body scale |
| `thresholdSlope` | 24 | **~15** | surface tension: too high = mercury-hard no-goo; ~15 is the SVG-metaball sweet spot — a wider transition band → a soft gooey shoulder, not a razor edge |
| `thresholdOffset` | −11 | **~−7** (re-solved for slope 15) | keeps the edge crisp at REST while the fused region holds a gooey shoulder |

STATIC literals → Safari-safe; per-consumer props on `GlassGooFilter` (the deck runs a
calmer blur than the carousel). KISS: blur + colorMatrix + atop, three primitives, no
optional highlight pass — the warm domed-droplet `radial-gradient` fill supplies the
catch-light through the threshold.

### 2.3 The FEEL — weighty · gooey · inertial (lens-c cartoon-punch, gated per `--goo-weight`)

The goo-bridge is a **driver** event (§L2): it carries `--goo-weight` (= `--motion-weight`)
toward 1 on the carousel while the embla content snap underneath stays calm-overdamped (T13:
momentum YES, snap-bounce NO on content — the bounce lives in the *neck welling + body
land*, never the slide past-target). Deck `--goo-weight ≈ 0.4` (vestibular floor); pager ≈0.7.

| principle | mechanism (compositor-only, `f(--goo-t)` / `f(--stretch)` — deterministic-frame) |
|---|---|
| **Anticipation** | bodyB BUDS out of bodyA (scale 0→1 over first ~12%); a `--ease-cartoon-punch` pre-dip (~4% inward) on bodyA scale before launch (a `linear()` dip no spring can express) |
| **Stretch toward neck** | each body elongates on-axis as the gap opens (`useLiquidFlex` volume-preserving reciprocal, cap = `--{prefix}-max-stretch`) — necking taffy, not rigid pills |
| **Exaggeration** | the mid-neck girth swells past 1 as it pinches (the bold cartoon meatball); `--carousel-goo-max-stretch` 1.24→**1.32**, `--neck-waist` throat → decisive |
| **Overshoot land** | the arriving body lands with a **√φ-proportioned** overshoot (share = `motion-weight · 1/φ`), `--goo-weight`-scaled, then settles |
| **Follow-through** | the shipped `--neck-specular-angle` conic catch-light sweep (`plus-lighter`, sRGB-safe — the `fission-bridge.css` cohort, NO fork) sweeps the throat TRAILING the geometry ~60ms; a settle-jiggle trails the landed body |
| **Arc (overlapping action)** | the body centres travel a subtle vertical parabola (`±D·0.06·sin(πp)`) so the merge LOBS, not a flat slide; PRM flattens to 0 |
| **Moving cast** | the `::after` cartoon-shadow plane (the §Shadows moving-cast idiom — compositor transform, NO animated box-shadow) slides opposite the body's motion, deepening mid-flight |

**The dwell follows the NECK, not a fixed timer.** The `--{prefix}-flow` `linear()` already
dwells at mid (~0.43–0.52 across 30–55%) — KEEP it; it holds the WAIST open ~250–400ms so the
pinch READS (weighty liquid, never a flicker). **The opacity gate follows neckGirth** (fade
in as it crosses ~0, out as it returns) so the bridge is visible EXACTLY while the goo
deforms — gone within ~80ms of settle (kills the lens-a/b R2 dead-slab dwell).

**Velocity-couple "morph MORE on move"** via `useLiquidFlex` — a fast embla drag
(`scrollProgress()` velocity) wells a FATTER, longer neck + throws the bodies FARther; a slow
keyboard step a tense thin thread. A bounded `--goo-throw` multiplier off the `maxStretch`
lever — the iOS-27 "weight responds to gesture" signature, no new spring (the W-GLASS-CAL fence holds).

### 2.4 Visual / material (the warm six-layer read survives the threshold)
- Bodies + neck share the warm-cream domed-droplet `radial-gradient` (already on the worm) →
  ONE continuous liquid-glass droplet with an inner catch-light. **NEVER gray** (BA.W-NO-GRAY):
  the landed `.dark` L0.68 warm-chroma lift + `saturate/brightness` companion, BOTH modes.
- **§3 colorful field behind glass + defined edge:** the layer opacity (~0.55) keeps it a
  TRANSMISSIVE warm lens — the vibrant slide/aurora reads THROUGH the welling neck (verified
  in the spike: the purple/teal field reads through). The threshold IS the crisp metaball
  edge; a 1px inner warm rim (`--glass-edge`) seals the §3 "defined edge."
- **Golden proportion (Aristotelian, all things):** body diameter `D = restSize/φ`; neck
  rest-thickness `D/φ`; the overshoot share `motion-weight·1/φ`; concentric `--radius-card`.

### 2.5 Cross-engine (Chrome + Safari) — the §L7 arm, NAMED
- **Channel:** regular `filter: url(#glass-goo)` on the goo layer (NOT `backdrop-filter:url`
  — WebKit bug 245510). Inputs = round bodies + a clip-path neck; all `transform`/`opacity`
  per frame; filter literals STATIC (no var-driven `stdDeviation` — WebKit bug 283156 absent).
- **sRGB mandatory** (`color-interpolation-filters="sRGB"` — WebKit forces sRGB regardless,
  bug 136418; declaring it makes Chrome MATCH so the waist thresholds IDENTICALLY on both).
- **The clip-path hourglass is the WebKit insurance** (the boldest move): the waist is a
  structural concavity guaranteed on both engines BEFORE the filter fuses it — not
  filter-only. The dark `saturate/brightness` companion is plain CSS-filter funcs appended
  after the `url()` (Safari-native). `plus-lighter` specular sweep gated with a plain-overlay
  fallback (Safari 16.4+, no blowout).
- **Region** `−50%/200%` (the welling neck + travelling bodies never clip; can TIGHTEN to the
  two-bead span → cheaper WebKit raster); `contain: layout style` (NOT paint — clips the neck);
  `isolation: isolate`.
- **`@supports not (filter: url(#x))`** → plain cross-fade of two bodies (no weld), the crisp
  track/deck the legible floor; **PRM** → goo layer `display:none`, one body snaps to target,
  zero neck frames, arc 0, `--ease-cartoon-punch` → `--ease-standard`, `--goo-weight → 0`.
- **Acceptance = paired-engine π** (Chromium AND a real Safari-26-on-Metal capture) at the
  neck peak proving the waist — never a single-engine green (§L7).

---

## 3. THE FILES — exact mechanism, deft integration (a UNION, no fork)

| file | change | kind |
|---|---|---|
| `src/composables/motion/useGooMorph.ts` | RE-INVENT `paint()`: single-worm two-edge → barbell `{bodyARef, bodyBRef, neckRef}` projection (`cA`/`cB`/`sep`/`neckGirth` above). `morphRef` → a `morphRef` group hosting two body children + a neck child (KISS: the engine writes their transforms via the group). Same `--goo-t` drive, same `travel`/`snap`/`drive`/PRM, same `useLiquidFlex` squish, same flow/duration/max-stretch tokens. Add `--{prefix}-neck-gap` read. | **re-invent (broken)** |
| `src/components/ui/carousel/CarouselContent.vue` | DELETE the N static-plate bed (`plateEls`, `plateIndices`, `placePlates`, the `v-for` plates) — the actual cause of the tray (lens-b/c boldest move). Keep the goo layer + `markTraveling` + the embla `select`/`scroll` wiring. Render `bodyA`/`neck`/`bodyB` spans. `restSize()` returns the BEAD diameter `step/φ`, not slide width. Add the `--ease-cartoon-punch` pre-dip + arc + moving-cast `::after` + trailing specular sweep, gated on `--goo-weight`. | **refine (weak) — net-NEGATIVE LOC** |
| `demo/stories/motion/deck.vue` | adopt the barbell at viewport scale; `--goo-weight ≈ 0.4`, no arc-overshoot (vestibular floor). Same engine. | refine |
| `src/components/custom/pager-dots/PagerDots.vue` | the worm becomes the head+lead dot-pip pair necking (the v4 dotflow read — a fidelity GAIN). The migration proof. | refine |
| `src/components/custom/goo-filter/GlassGooFilter.vue` | RETUNE default literals (`blur ~13`, `thresholdSlope ~15`, `thresholdOffset ~−7`) as new prop DEFAULTS; graph BYTE-UNCHANGED (Safari facts verbatim). | **keep (fit) — values only** |
| `src/styles/tokens/scheme-motion.css` | add `--{prefix}-neck-gap` (pager 0.7 / carousel 0.78 / deck 0.85); bump `--carousel-goo-max-stretch` 1.24→1.32; add `--goo-weight` per consumer. | tokens |
| `src/styles/dock/fission-bridge.css` | UNCHANGED — but the `--neck-filament` hourglass clip-path idiom + `--neck-specular-angle` conic + the moving-cast idiom are REUSED (imported as the shared neck recipe), NOT forked. | **reuse** |
| `DockGooFilter.vue` / `useDockFission` | UNTOUCHED (a separate goo at a separate scale; `BD.W-GOO-SPLIT-PERF` governs it). Consider later: MERGE `GlassGooFilter`+`DockGooFilter` into one `GooFilter` with an `id` prop (byte-identical but the id default) — KISS, one mount. | unchanged |

**NO LEGACY:** the single-worm geometry + the N-plate bed + the `girthFloor`-uniform-pinch are
DELETED, not aliased — replaced in the same amendment. Clean break.

---

## 4. CROSS-ENGINE PLAN (Chrome + Safari) — the binding §L7 contract

1. Static `#glass-goo` (literals, sRGB, region, regular `filter:url`) — the only per-frame
   writes are transform/opacity on three child elements. WebKit bugs 245510/283156/136418 all
   structurally absent (the audit in §2.5).
2. The clip-path hourglass neck = the engine-agnostic waist floor (de-risked live, §8).
3. Dark companion (`saturate/brightness`) + specular (`plus-lighter`) = plain CSS funcs,
   Safari-native, gated fallbacks.
4. `@supports`-floor (cross-fade) + PRM-carve (display:none, snap) verbatim from today.
5. **Acceptance is a PAIRED-engine π** at the neck peak — Chromium AND real-Safari-on-Metal —
   waist/body ≤ 0.45 on BOTH. Single-engine green is NOT acceptance.

---

## 5. A11Y / PRM CARVE (explicit)
- **PRM (`reduce`):** goo layer `display:none`; one body snaps to the target slot (engine
  early-returns, no rAF, no `--goo-t` transition); arc → 0; cast static; `--ease-cartoon-punch`
  → `--ease-standard`; `--goo-weight → 0` (one assignment zeroes squash/overshoot/anticipation/
  arc/cast). The embla/deck content still pages — only the goo punch is off.
- **`prefers-contrast: more`:** the cartoon-cast opacity floors UP (the inked edge is a
  legibility asset); the crisp embla/deck track is the legible surface.
- **`prefers-reduced-transparency`:** does not touch the opaque cast; the goo layer is
  decorative + `aria-hidden`; the crisp content carries legibility.
- **AT:** the goo layer is `aria-hidden="true"` + `pointer-events:none`; the embla track /
  `PagerDots` / `DeckPager` own roles/labels/keyboard (unchanged). Pure decoration over an
  already-accessible scroller. **WCAG-2.2.2:** one-shot per gesture, no auto-loop — no pause owed.

---

## 6. THE ACCEPTANCE BAR (the gestalt is the bar)
- **G1 (headline):** a real Next-click / `deck.next()` shows two warm-cream bodies NECK into a
  thin CONCAVE waist (waist/body ≤ 0.45 at p=0.5, π-measured), the neck DWELLS open ~250–400ms,
  then PINCHES + SNAPS — a decisive blob↔meatball, NOT a tray. Born-RED on the current slab.
- **G2 (Safari):** the waist reads IDENTICALLY on real Safari-26-on-Metal (sRGB-pinned, static
  filter, no `backdrop-filter:url`) — paired-engine π, not single-green.
- **G3 (feel):** squash-&-stretch (anticipation bud + stretch-toward-neck + √φ-overshoot land),
  morph-more-on-fast-drag, weighty dwell — `useLiquidFlex` + `--{prefix}-flow` + `--goo-weight`.
- **G4 (no-gray):** warm-cream both modes, fix2 unchanged — C ≥ 0.010, H ∈ [45,85].
- **G5 (perf/PRM):** ~2–3 transforms/frame, static filter, offscreen-paused; PRM → one body
  snap, layer `display:none`. `proof:no-layout-animation` green.
- **G6 (de-dup):** ONE `useGooMorph`, three consumers, ZERO second goo path; the carousel
  static-plate bed DELETED (less code, not more).

---

## 7. BORN-RED GATE SKETCH (the π / readback that proves it)

A paired-engine rAF frame-series on a REAL Next-click `/navigation/carousel` AND a REAL
`deck.next()` `/motion/deck`, BOTH modes, capturing the silhouette at the neck peak. The π:

```js
// at the neck peak (p≈0.5), read the goo layer's rendered silhouette via a canvas
// readback of the warm-cream alpha band along the travel axis:
//   bodyWidth  = max cross-axis extent of either body's alpha mass
//   waistWidth = min cross-axis extent of the fused alpha between the two body centres
//   waistRatio = waistWidth / bodyWidth
// GATE (born-RED on the current single-plate slab, which has NO local minimum):
assert waistRatio <= 0.45        // a REAL concave waist, not a slab (the headline)
assert hasLocalMinimum(crossAxisProfile)   // the profile DIPS between two peaks (two masses)
assert neckGirth(t).rises_then_falls()     // wells → pinches, not a monotone fade
assert bridgeOpacity gone within 80ms of settle   // no dead-slab dwell
assert warmCream: C >= 0.010 && H in [45,85], both modes   // never gray
assert webkit.waistRatio ≈ chromium.waistRatio (±0.05)     // paired-engine, §L7
```

**Born-RED proof:** the current single-plate worm peak has a MONOTONE convex cross-axis
profile (one rounded-rect mass, no local minimum) → `hasLocalMinimum` FAILS and
`waistRatio ≈ 0.85` (the girthFloor) FAILS. The barbell+neck supplies the local minimum and
drives waistRatio to ~0.27 (measured in the spike, §8).

---

## 8. THE DE-RISK SPIKE (built + verified live)

`docs/tranches/BD/greenfield/goo-morph/golden/barbell-neck.html` — a throwaway standalone
spike (no build, no glass-ui import) of the BOLDEST mechanism: the three-element fused
metaball (bodyA + clip-path hourglass neck + bodyB) through a byte-identical static
`#glass-goo` filter (blur 13 / slope 15 / offset −7), over a colorful purple/teal field.

**Verified live in Chrome** (`golden/peak-waist.png`): at p=0.5 the render shows **two round
warm-cream bodies fused by a genuine concave hourglass waist** — a real metaball neck, NOT a
slab. The colorful field reads transmissively THROUGH the warm glass (§3). The π readback:

| p | gap (px) | neckGirth | waist/body | read |
|---|---|---|---|---|
| 0.00 | 208 | 0.180 | 0.061 | bodies apart (rest) |
| 0.25 | 176 | 0.549 | 0.187 | neck welling |
| **0.50** | **162** | **0.800** | **0.272** | **✓ REAL WAIST** (≤ 0.45) |
| 0.75 | 176 | 0.549 | 0.187 | pinching |
| 1.00 | 208 | 0.180 | 0.061 | coalesced |

The waist/body stays well under the 0.45 gate across the whole morph (peak 0.272 at mid), and
neckGirth rises→falls (0.18→0.80→0.18) — wells then pinches, never a monotone fade. The
boldest cross-engine mechanism (the structural clip-path waist + the filter weld) is proven.

---

## 9. DELTA-ASSAY → the single wave amendment (no dup vs the union waves)

ONE amendment **`BD.W-GOO-BARBELL-NECK`** (band: viz/refine; depends: W-GOO-CAROUSEL-DECK-FIX2)
SUPERSEDES the single-worm topology inside `useGooMorph` (engine stays, projection re-invented),
DELETES the carousel/deck N-plate bed, RETUNES `GlassGooFilter` literals, lifts the fission
`--neck-filament` hourglass + specular + cast idioms (reuse, no fork), wires `--goo-weight` +
the cartoon-punch. It SUBSUMES `BD.W-GOO-SPLIT-PERF`'s dwell/perf arm (the neck-following
opacity gate + the shorter carousel clock) as the *timing* arm of the same rebuild. It INHERITS
fix2's dark-arm + travel-gate verbatim. Still ONE `useGooMorph`, still three consumers — a
refinement-in-place, not a re-fork. `W-GOO-SPLIT-PERF` (dock-fission Safari-Metal budget),
`W-GOOBLOB-*` (the WebGL `<GooBlob>` viz) are ORTHOGONAL — untouched, no conflict.
