# GOO-MORPH — the DELTA-ASSAY (golden-vs-current + the UNION path)

> The live-inspected delta between the SHIPPED goo-morph engine (`useGooMorph` + the three
> consumers) and `GOLDEN.md` (the barbell-with-a-clip-path-neck), folding the three challenge
> hardenings (`challenge/{1,2,3}.md`) into the verdict. KISS, DEFT, no legacy, no dual-path,
> reuse extant primitives. Verdict: **REFINE the engine + RE-INVENT the carousel/deck SILHOUETTE
> (the single-plate bed → barbell), KEEP the Safari graph + the fix2 dark-arm + the de-dup.**

---

## 0. LIVE SELF-VERIFICATION (orchestrator, Chrome :5173 `/navigation/carousel`, real Next-click)

The golden's §8 "de-risk" was a FAKE π (all three challenges land R1 — `measure()` is
`throat = D * neckGirth * 0.34; ratio = throat/D` ≡ `neckGirth·0.34`, no `getImageData`, no
canvas, no filter read — verified in `golden/barbell-neck.html:153-159`). So I ran the REAL
readback the spike skipped, on the SHIPPED build. The captured DELTA (`golden/delta-current-carousel-peak.png`):

| frame | t (ms) | scaleX (lenRatio) | scaleY (pinch) | rendered W×H | layer opacity |
|---|---|---|---|---|---|
| first | 9 | 1.068 | 0.968 | 467×150 | 0.55 |
| **peak** | **135** | **2.182** | **0.74** | **954×115** | **0.55** |
| mid | 556 | 1.006 | 0.997 | 440×154 | 0.55 |
| last | 1108 | 1.067 | 0.968 | 466×150 | 0.55 |

**The born-RED truth, captured (NOT faked):**
- **The silhouette is ONE full-height plate** (`block-size: 192px`, `inline-size: 352px`),
  stretched on `scaleX` to 2.18 and pinched UNIFORMLY on `scaleY` to the 0.74 girthFloor. At the
  peak the rendered box is a flat 954×115 band. **There is NO local cross-axis minimum** —
  `hasLocalMinimum(crossAxisProfile) = false` by construction (a single convex mass cannot dip
  between two peaks because there are not two peaks). This is the "warm TRAY with one scalloped
  edge" the golden §0 names — **confirmed live, the SHAPE diagnosis is CORRECT.**
- **Speed is FAST, not the defect** (golden §0 / challenge-2 survives): lenRatio peaks 2.182 @
  135ms (golden predicted ~2.2 @ ~140ms — accurate). The "slow" read is the **dead-slab dwell**:
  `layerOpacity` holds 0.55 across the WHOLE 1108ms window while scaleX has already settled to
  1.006 by t=556 (the `--goo-t` overshoot-tail creep — golden §2.1 / fix2 §0). The slab sits
  visible long after it stops moving.
- **12 static plates** (`block-size: 100%`) parked at slide centres — the N-plate bed.
- **The carousel ships `blur 10 / slope 24 / offset -11`** (the INLINE override at
  `CarouselContent.vue:278`, `<GlassGooFilter :blur="10" :threshold-slope="24" :threshold-offset="-11" />`).
  The LIBRARY DEFAULT in `GlassGooFilter.vue` is **7 / 20 / -9**. So the golden §0/§2.2 "current
  10/24/-11" was RIGHT for the carousel mount and WRONG as the "shipped filter default" — see §3.
- **Filter graph is Safari-airtight:** `stdDeviation` literal (no var), `feColorMatrix` static,
  `color-interpolation-filters="sRGB"`, region `-50%/200%`, regular `filter:url()` (not
  `backdrop-filter:url`). **KEEP byte-structural** (the user's "broken on Safari" is structurally
  already closed for the FILTER; the open Safari risk is the NEW polygon-under-filter — §4).
- **Dark fill is the fix2 warm-ink arm:** `oklab(0.976 0.005 0.013)` light (warm-cream),
  `oklch(from --card 0.68 0.05 h)` dark + `saturate(1.3) brightness(1.3)` companion. **KEEP.**

---

## 1. THE DELTA — what is FIT, WEAK, BROKEN (survival of the fittest)

### KEEP (fit — do NOT re-invent)
| artefact | why it survives |
|---|---|
| `GlassGooFilter` / `#glass-goo` graph | byte-structural Safari facts (sRGB, static literals, region, regular `filter:url`, 1×1 host). Only the per-consumer literal DEFAULTS retune (§3). |
| `useGooMorph` DRIVE | the `--goo-t` Houdini transition, the `linear()` flow curve, the rAF sampler, the `travel`/`snap`/`drive` public API, the `useLiquidFlex` squish, the PRM early-return. **The drive is fit; only the silhouette it PROJECTS is broken.** |
| fix2 dark-arm + travel-gate | the warm-ink `.dark` fill + `saturate/brightness` companion + the `previousScrollSnap()` gate. Both modes. **Inherited verbatim.** |
| the de-dup | ONE `useGooMorph` (353 L), three consumers, zero second fork. **Correct + kept.** |

### REFINE (weak — evolve in place)
| artefact | weakness | the evolution |
|---|---|---|
| the filter LITERALS | the carousel's inline 10/24/-11 is a mercury-hard slope (slope 24 = razor edge, no gooey shoulder); offset -11 paired to slope 24. | retune the GlassGooFilter prop DEFAULTS to a gooey-shoulder band re-solved against the REAL baseline + the rendered waist (§3) — NOT against the golden's phantom numbers. |
| the dwell timer | `markTraveling()` holds `[data-traveling]` for the full `duration + 120ms` regardless of motion → the dead-slab dwell. | the opacity gate FOLLOWS neckGirth (fade in as the neck wells, out as it returns ~0) → the bridge is visible EXACTLY while the goo deforms, gone ~80ms after settle (subsumes `W-GOO-SPLIT-PERF`'s dwell arm — NO, that is the DOCK split; this is the carousel clock, see §5). |
| the feel | no anticipation bud, no arc, no moving-cast, no √φ-overshoot land, no velocity-couple "morph more on move". | the cartoon-punch overlay gated on a NEW `--goo-weight` lever (§3) — NOT cited as a Band-0 reuse (challenge R3). |

### RE-INVENT (broken — clean break, no alias)
| artefact | why broken | the replacement |
|---|---|---|
| the carousel/deck SILHOUETTE GEOMETRY | a single constant-cross-section full-height plate, blurred+thresholded, can only fatten into a rounded rectangle. **No geometry in the system can produce a waist** (live-confirmed: no local minimum). | the BARBELL: TWO round warm-cream bodies (`D = restSize/φ`) + a SEPARATE neck whose `clip-path` carves a concave waist (a NET-NEW concave `path()`/polygon throat — honestly net-new, challenge R2) + the static filter welds the three. |
| the N-plate bed (`plateEls`/`plateIndices`/`placePlates`/the `v-for`) | the actual cause of the tray (a bed of full-height static slabs the worm slides under) — net-NEGATIVE LOC to delete. | DELETED. The barbell's two bodies ARE the masses; no bed. |
| `paint()`'s single-`morphRef` projection + the whole engine's single-element contract | the engine's SOLE output is ONE `morph.style.transform`; `placeStatic`/`snap`/`drive`/`tick` ALL assume one element (challenge R4/R7 — this is an engine rewrite, NOT a "values-only refine"). | `paint()` re-authored to write THREE coordinated transforms via an explicit `{bodyARef, bodyBRef, neckRef}` ref group; `placeStatic`/`snap`/`drive`/PRM ALL re-authored to coalesce to ONE resting body + hide the neck. Honest scope: a projection-AND-ref-contract rewrite. |

---

## 2. THE CHALLENGE HARDENINGS — FOLDED into this assay (no surviving refutation)

All three challenges agree the CORE IDEA (barbell + structural-waist + static filter) is sound and
the SHAPE diagnosis is right; what they refute is the golden's EVIDENCE and its INTEGRATION HONESTY.
Every landing refutation is folded:

1. **R1 (all three, TOP) — the §8 de-risk is a FAKE π.** `waistRatio = neckGirth·0.34`, an
   arithmetic echo; never a rendered pixel; the 13px blur over a ~15px throat is never measured.
   **FOLD:** §8 is DOWNGRADED to "Chrome-eyeballed, Safari + post-blur waist UNVERIFIED." The
   amendment's born-RED gate is a REAL canvas/screenshot readback of the post-threshold alpha
   profile (`hasLocalMinimum` on the MEASURED cross-axis), run on the CURRENT build first (the
   born-RED captured live above — `hasLocalMinimum=false`, lenRatio peak 2.18, uniform 0.74 pinch),
   then proven GREEN on the barbell, then PAIRED Chromium+Safari-Metal. The blur/slope/offset are
   tuned AGAINST the rendered minimum, never against `0.34·neckGirth`.
2. **R2 (all three) — "reuse the `--neck-filament` hourglass idiom, no fork" is FALSE-REUSE.** The
   shipped fission neck is `clip-path: inset(var(--neck-inset) 0 var(--neck-inset) 0 round 999px)`
   (`fission-bridge.css:462`) — a rectangular capsule-thinner, NOT a concave hourglass (zero
   `polygon`/`hourglass`/`concave` hits). The spike's waist is a NET-NEW concave throat. **FOLD:**
   the amendment states the concave throat is NET-NEW and DRYs it by making BOTH the carousel/deck
   neck AND (optionally) the dock fission neck share the ONE real concave-throat recipe (a token
   `--neck-waist` concave-`path()`) — true DRY, two consumers, not a name borrowed from an `inset()`.
   The `--neck-specular-angle` conic sweep + the moving-cast idiom ARE genuinely reusable
   (`fission-bridge.css:73,491` — they exist) and ARE lifted (the honest reuse).
3. **R3 (all three) — `--goo-weight`/`--motion-weight`/`--neck-gap` cited as extant Band-0
   idioms; none existed at golden-time.** **FOLD + RECONCILE:** since the golden was written,
   `--motion-weight` and `--ease-cartoon-punch` ARE now booked by the motion-spring-register sibling
   waves (`BD.W-MOTION-WEIGHT` ships `--motion-weight`; `BD.W-CARTOON-PUNCH` ships
   `--ease-cartoon-punch` — ledger §6 rows 0/motion + 0/cartoon). So the amendment DEPENDS on those
   (real lineage now), and `--goo-weight` is a NEW goo-scoped lever (`= --motion-weight` per
   consumer, honestly declared as a new token in the §3 file table, not "reuse"). `--neck-gap` is
   NEW — declared once, not "reuse in one section, add in another."
4. **R4/R7 (challenge-1/3) — the engine rewrite is deeper than "projection re-authored, drive
   verbatim."** **FOLD:** §1 RE-INVENT row + the amendment budget it as a projection-AND-ref-contract
   rewrite with a full three-consumer (pager + carousel + deck) regression gate; `placeStatic`/
   `snap`/`drive`/PRM named as ALSO re-authored.
5. **R5 (challenge-2/3) — the polygon-under-filter Safari risk is un-named.** A concave `clip-path`
   scaled non-uniformly (`scaleX(gap/D)` ≫1) distorts the throat fraction + may alias on Metal; the
   `inset()` precedent does NOT cover a polygon. **FOLD:** the §4 cross-engine plan + the gate
   capture the throat at the WIDEST gap (p≈0.2/0.8), measure throat-fraction-vs-gap, and carry an
   `inset()`-neck FALLBACK (the proven Metal idiom) if the polygon throat differs >0.05 on WebKit.
6. **R5/R6 (challenge-3 visible defect) — the spike's polygon throat is FACETED** (a 14-vertex
   polygon's straight segments survive slope-15). **FOLD:** the throat is a smooth concave
   `path()` (cubic Bézier sides), √φ-proportioned control points, NOT 14 hand-placed percentages;
   the gate asserts NO straight-segment luminance steps in the cross-axis profile.
7. **R3 (challenge-2/3 transmissive) — the spike's bodies are OPAQUE; the field reads only in the
   gaps, never THROUGH the body.** **FOLD:** the §3 read is narrowed honestly — the layer-opacity
   (~0.55) + the warm fill make the body a TRANSMISSIVE-ENOUGH lens at the welling NECK + edges (the
   fix2 dark companion already does this in dark); the gate measures the field reading through the
   neck region, NOT a claim that the solid body centre is fully transmissive. If WebKit cannot
   composite the backing field through the post-threshold alpha, the §3 "field through the body"
   claim is dropped to "field through the welling neck + edge" (the honest, achievable read).
8. **R2/R4 (filter baseline) — the golden's "current 10/24/-11" mismatches the LIBRARY default
   7/20/-9.** **FOLD (corrected by live inspection):** BOTH are real — the carousel MOUNT passes
   `10/24/-11` inline (live-verified), the lib DEFAULT is `7/20/-9`. The retune re-solves from the
   REAL per-consumer baselines against the rendered waist (§3), not a phantom.

---

## 3. THE UNION PATH — the deft integration (KISS, reuse extant primitives, no dual-path)

The evolution from the current single-worm to the golden barbell, reusing every fit primitive:

### 3.1 `useGooMorph.ts` — the projection + ref-contract RE-INVENT (honest scope)
- KEEP: the `--goo-t` drive, the `linear()` flow transition, the rAF sampler, the public
  `travel`/`snap`/`drive` names, the `useLiquidFlex` squish import, the PRM early-return, `clockMs`.
- RE-AUTHOR the ref contract: `morphRef: Ref<HTMLElement>` → `{ bodyARef, bodyBRef, neckRef }`
  (three explicit refs — NOT `morph.children[i]` index-reaching, which is the KISS-violating
  fragile path challenge-2 R4 warns against). The engine writes three transforms per frame.
- RE-AUTHOR `paint()` to the barbell projection (golden §2.1, `p` = normalized A→B progress):
  ```
  sep(p)       = 1 − bell(p,1)·(1 − NECK_GAP)          // 1 at slots → NECK_GAP at mid
  bell(p,k)    = sin(π·p)^k                              // 0 at ends, peak mid
  mid          = (A+B)/2 ;  half = (B−A)/2 · sep(p)
  cA = mid − half ; cB = mid + half                     // bodies travel apart-then-together
  neckGirth(p) = GIRTH_FLOOR + bell(p,1.5)·GIRTH_SWELL   // wells → pinches, ~0 at ends
  ```
  - bodyA/bodyB: `translate(cA|cB)` + `scale(D/W)` + the `useLiquidFlex` squish; `D = restSize()/φ`.
  - neck: `translate(mid)` + `scaleX(gap/D)` + `scaleY(neckGirth(p))`; `clip-path` = the NET-NEW
    smooth concave `path()` throat (`--neck-waist`), NOT the `inset()` idiom.
- RE-AUTHOR `placeStatic`/`snap`/`drive`/the PRM path to the 3-element model: `placeStatic`
  coalesces to ONE resting body at the target centre + zeroes the neck (no ghost throat); the PRM
  early-return hides bodyB+neck (`display:none` on the layer) + snaps one body.

### 3.2 `CarouselContent.vue` — DELETE the bed, render the barbell (net-NEGATIVE LOC)
- DELETE `plateEls`, `setPlate`, `plateIndices`, `placePlates`, the `v-for` plates, the
  `--plate-w` reserve — the bed is the tray's cause.
- KEEP the goo layer, `markTraveling` (re-pointed to the neckGirth gate), the embla `select`/
  `scroll` wiring, the `previousScrollSnap()` travel-gate (fix2), the `centerOf`/`slideStep`.
- `restSize()` returns the BEAD diameter `slideStep/φ`, NOT `step·0.82` (the slide-width plate).
- Render `bodyA` / `neck` / `bodyB` spans (the three refs). Add the `--ease-cartoon-punch`
  pre-dip + arc + the moving-cast `::after` + the trailing `--neck-specular-angle` sweep (lifted
  from `fission-bridge.css`), gated on `--goo-weight`.
- Inline filter props re-solved (§3.4).

### 3.3 `deck.vue` / `DeckPager.vue` / `PagerDots.vue`
- `deck.vue`: adopt the barbell at viewport scale; `--goo-weight ≈ 0.4` (vestibular floor, no
  arc-overshoot — T13). Same engine. DELETE the single `deck-goo-plate`.
- `PagerDots.vue`: convert the worm to a true two-bead barbell (the head+lead pip pair necking —
  the v4 dotflow read). **NOTE (challenge R5):** the pager is currently the SAME condemned
  single-worm — it is NOT "prior-art proof," it is a THIRD consumer that ALSO migrates. The
  amendment treats it as a real fidelity GAIN to re-verify, not an assertion of proof. (This wave
  SUPERSEDES the `W-GOO-MORPH-REFINE` girth-floor-on-the-single-worm approach — the girth floor
  is mooted by the barbell's two-real-bodies topology; see §5.)

### 3.4 `GlassGooFilter.vue` — retune the DEFAULTS (graph byte-unchanged)
Re-solved from the REAL baselines (lib default 7/20/-9; carousel mount 10/24/-11) against the
RENDERED waist, NOT the golden's phantom 10/24/-11-as-default:

| token | lib default | carousel mount (live) | GOLDEN target | why |
|---|---|---|---|---|
| `blur` | 7 | 10 | ~10–13 carousel / ~8–10 deck / ~7–8 pager | wider alpha skirt → bodies feel each other earlier → gooier neck, scaled to the bead size. **Re-measured against the throat width so the blur does not FILL a thin throat** (challenge-3 R1). |
| `thresholdSlope` | 20 | 24 | ~15 | slope 24 = mercury-hard razor (no gooey shoulder); ~15 = the SVG-metaball soft-shoulder sweet spot. |
| `thresholdOffset` | -9 | -11 | re-solved for slope ~15 against the RENDERED rest edge | crisp at rest, gooey shoulder in the fused region — solved against pixels, not asserted. |

STATIC literals (Safari-safe), per-consumer props (deck calmer than carousel).

### 3.5 tokens (`scheme-motion.css` / the consumer scope)
- `--{prefix}-neck-gap` (NEW — pager 0.7 / carousel 0.78 / deck 0.85).
- `--neck-waist` (NEW — the concave throat fraction; the smooth-`path()` throat depth).
- `--goo-weight` (NEW — pager 0.7 / carousel 1.0 / deck 0.4; `= --motion-weight` per consumer,
  DEPENDS on `BD.W-MOTION-WEIGHT`).
- bump `--carousel-goo-max-stretch` 1.24 → 1.32.

### 3.6 reuse map (the honest DEFT-UNION)
| reused primitive | from | how |
|---|---|---|
| `--neck-specular-angle` conic sweep | `fission-bridge.css:73,491` | imported as the trailing throat catch-light (genuine reuse — it exists). |
| the moving-cast `::after` idiom | `fission-bridge.css` ripple/cast cohort | the cartoon moving-shadow plane. |
| `--motion-weight` | `BD.W-MOTION-WEIGHT` (sibling) | `--goo-weight` per-consumer derivation (DEPEND). |
| `--ease-cartoon-punch` | `BD.W-CARTOON-PUNCH` (sibling) | the anticipation pre-dip (DEPEND). |
| `useLiquidFlex` | the ONE squish engine | the squash-&-stretch (unchanged). |
| the fix2 dark-arm | `W-GOO-CAROUSEL-DECK-FIX2` | inherited verbatim. |
| the concave `--neck-waist` throat | NET-NEW (honestly) | optionally DRYed into the dock fission neck (one recipe, two consumers — true DRY, R2). |

**NO LEGACY:** the single-worm projection, the N-plate bed, the `girthFloor`-uniform-pinch, the
slide-width `restSize` — all DELETED in the same amendment, not aliased. Clean break.

---

## 4. CROSS-ENGINE (Chrome + Safari) — the §L7 contract, hardened

1. Static `#glass-goo` (literals, sRGB, region, regular `filter:url`) — the only per-frame writes
   are transform/opacity on the three child elements. WebKit bugs 245510/283156/136418 structurally
   absent (live-verified the graph is unchanged).
2. **The concave `path()` throat is the engine-agnostic waist floor** — BUT it is a NET-NEW
   polygon-under-filter path (challenge R5): the gate captures the throat at the WIDEST gap
   (p≈0.2/0.8, where `scaleX` is largest + AA/threshold drift is worst), measures throat-fraction
   vs gap, and asserts WebKit throat ≈ Chromium throat ±0.05. If it differs, FALL BACK to an
   `inset()`-based neck (the proven-on-Metal fission idiom) — the polygon is NOT shipped "Safari-
   insured" on an `inset()` precedent.
3. Dark companion (`saturate/brightness`) + specular (`plus-lighter`) = plain CSS funcs,
   Safari-native, gated fallbacks (the fix2 + fission idioms).
4. `@supports not (filter: url(#x))` → plain cross-fade of the two bodies (no weld); PRM →
   layer `display:none`, one body snaps, zero neck frames, `--goo-weight → 0`.
5. **Acceptance = PAIRED-engine π** (Chromium AND real Safari-26-on-Metal) at the neck peak proving
   the waist — never a single-engine green, never the spike's arithmetic.

---

## 5. NO-DUP RECONCILIATION vs the extant 116-wave set

| existing wave | relationship | disposition |
|---|---|---|
| `W-GOO-CAROUSEL-DECK` | the landed single-plate-bed build | SUPERSEDED (the bed + single-worm projection deleted). |
| `W-GOO-CAROUSEL-DECK-FIX2` | the dark-arm + travel-gate | INHERITED verbatim (the new wave depends on it). |
| `W-GOO-MORPH-REFINE` | the girth-floor + 7 magnitude retunes on the pager's SINGLE worm | **SUPERSEDED for the carousel/deck topology** (the barbell makes the girth-floor moot — two real bodies, not one self-thinning worm). The pager arm of REFINE folds into the barbell pager migration. The girth-FLOOR law is DELETED, not retuned. |
| `BD.W-FISSION-FILAMENT` | the DOCK fission body-anchored spanning neck (`inset()` neck) | **ORTHOGONAL** — a separate goo at a separate scale (`#dock-fission-goo`). The ONLY touch-point is the OPTIONAL R2 DRY: if the concave `--neck-waist` throat is shared, the fission neck could adopt it too (a fidelity gain for the dock) — flagged, NOT mandated by this wave. |
| `BD.W-GOO-SPLIT-PERF` | the real-Safari-Metal p50 budget for the DOCK fission goo | **ORTHOGONAL** — it measures `#dock-fission-goo`, not `#glass-goo`. The carousel's dwell/clock arm is NOT subsumed by it (the golden §9 mis-claimed this). The carousel neck-following opacity gate is THIS wave's own timing arm. |
| `BD.W-DOCK-GOO-SPACING` / `BD.W-DOCK-SUBDOCK` | dock-fission scale knobs | ORTHOGONAL (dock). |
| `BD.W-BLOB-*` (`<GooBlob>` WebGL viz) | the procedural metaball viz | ORTHOGONAL (a shader viz, not the CSS goo-morph). |
| `BD.W-MOTION-WEIGHT` / `BD.W-CARTOON-PUNCH` | the motion-spring-register sibling tokens | **DEPENDED ON** (the honest `--motion-weight` / `--ease-cartoon-punch` lineage, R3). |

**The single amendment: `BD.W-GOO-BARBELL-NECK`** (band viz/refine; depends:
`W-GOO-CAROUSEL-DECK-FIX2`, `BD.W-MOTION-WEIGHT`, `BD.W-CARTOON-PUNCH`). It SUPERSEDES the
single-worm topology, DELETES the bed, RETUNES the filter, lifts the genuine specular/cast idioms,
adds the concave `--neck-waist` throat (net-new, optionally DRYed to the dock), wires `--goo-weight`
+ the cartoon-punch, inherits fix2. ONE engine, three consumers — a refinement-in-place of the
DRIVE + a re-invent of the SILHOUETTE. See `WAVE-AMENDMENT.md`.

---

## 6. CONVERGENCE

**REFINE (drive) + RE-INVENT (carousel/deck silhouette). ~80% converged.** Golden direction
SOUND + live-self-verified born-RED (no local minimum, lenRatio peak 2.18, uniform 0.74 pinch,
dead-slab dwell — `golden/delta-current-carousel-peak.png`). All 8 challenge hardenings folded
(fake-π → real readback, false-reuse → honest net-new, phantom tokens → real sibling deps + honest
new, under-scoped rewrite → honest engine rewrite, polygon-under-filter Safari risk + faceting +
opaque-body transmission + baseline-correction). Remaining ~20% = build-time: the REAL rendered
canvas readback re-tuning blur/slope/offset against the post-threshold throat (the spike never
measured it), the smooth-`path()` throat (not faceted polygon), the PAIRED Chromium+Safari-Metal
capture, the three-consumer regression, the R7-transmissive WebKit composite probe.
