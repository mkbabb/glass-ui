# BUILD-REPORT-2 — BD.W-GOO-CAROUSEL-DECK (iteration 2)

**VERDICT: the JUDGE-1 blocking defect is FIXED.** The carousel and deck goo layers now host
**≥2 MASSES** inside the ONE static SVG goo filter, so the metaball filter actually wells a NECK
between two distinct warm-cream bodies, stretches across the gap, and pinches/merges — the
"morph blob and meatball from one to another" read JUDGE-1 demanded. Everything JUDGE-1 confirmed
landed (the de-dup, the Safari-static filter, the DPR cap, the warm tint, the PRM carve, the
blob `uMorphT`) is KEPT untouched; this iteration adds ONLY the second/third mass.

Live-verified on `http://localhost:5173` (Chromium, light + dark), real click gestures + a
pinned-peak capture, frame-series sampled. Typecheck clean, siblings intact, no-layout-animation +
no-gray gates green, zero new console errors.

---

## 1. THE ROOT FIX — render the static slide-plate silhouettes (the ≥2-mass merge)

JUDGE-1 §1: *"Render ≥2 masses inside the goo layer — this is THE fix."* The prior iteration's
goo layer held ONE traveling worm-plate with no neighbor body → nothing to goo-merge → a sliding
lens, not a metaball morph. The fix REUSES the proven W-PAGER-GOO-MORPH pattern literally: the
pager works because its goo layer hosts N static `goo-dot` masses + 1 traveling worm — the worm
necks INTO and OUT OF each dot.

**Carousel** (`CarouselContent.vue`): the goo layer now renders **N static `.carousel-goo-plate`
silhouettes** (one warm-cream plate parked at each slide center via `placePlates()`) PLUS the ONE
traveling `.carousel-goo-worm`. As the worm travels between plate centers, its blurred fringe wells
a warm-cream NECK bridging the outgoing plate → it stretches across the gap (peak span = both slot
centers) → the threshold merges it into the incoming plate + pinches off the outgoing.

- The worm's `len` peaks at `W + |B−A|` at p=0.5, so at the midpoint it physically spans both
  adjacent plate centers — its blurred ends overlap both static plates, the goo merges all three
  into ONE connected mass (the pager geometry, at plate scale).
- `placePlates()` parks each plate at its slide center (compositor `transform` translate — never a
  layout property), dims the ACTIVE plate to 0.42 (the worm sits over it), shows the ±1 neighbor at
  1.0, hides far plates (so the goo region stays tight + the relevant two masses read).
- Wired into `setWormGeometry()` (mount/resize), `onSelect` (the snap travel), and `onScroll` (the
  live drag — re-parks each frame so the neighbor the worm necks toward stays painted).

**Deck** (`demo/stories/motion/deck.vue`): the goo layer now hosts a **STATIC center plate
`.deck-goo-plate`** (the resting destination body, parked dead-center) + the traveling
`.deck-goo-worm`. On an index change the worm necks IN from the incoming-slide side (slot ±1) and
MERGES into the static center plate — a real two-mass metaball merge.

### The clip fix (JUDGE-1 §3)

Both goo layers dropped `contain: paint` → `contain: layout style` and removed `overflow: clip`.
`contain: paint`/`overflow: clip` clip the metaball neck at the layer box exactly where the neck
must form (near the slide edges). The SVG filter region (`-50%/-50%/200%/200%`) + the worm-peak
span are what bound the goo now, not a paint clip. The crisp embla viewport (z-index 1) stays the
legible content boundary.

---

## 2. FILES + LINES

| # | File | Change |
|---|---|---|
| 1 | `src/components/ui/carousel/CarouselContent.vue` | **+ N static `.carousel-goo-plate` masses + `placePlates()` + the template `v-for` + the plate CSS; `contain: paint`→`layout style`, dropped `overflow: clip`** |
| 2 | `demo/stories/motion/deck.vue` | **+ the static `.deck-goo-plate` center mass + its CSS; `contain: paint`→`layout style`, dropped `overflow: clip`** |

**Carousel script additions** (`CarouselContent.vue`):
- `plateEls` Map + `setPlate(i, el)` (the per-slide plate ref registry, ~lines 53-62).
- `plateIndices` computed (the template render list, ~lines 64-66).
- `placePlates()` (the static-plate placement + presence logic, ~lines 119-144).
- `setWormGeometry()` → calls `placePlates()`; `onScroll()` → calls `placePlates()` per drag frame.
- template: `<span v-for="i in plateIndices" class="carousel-goo-plate">` before the worm.
- CSS: `.carousel-goo-plate` rule (full-alpha warm-cream domed-droplet fill, sized `--plate-w`,
  transform-positioned, opacity written inline by `placePlates`).

**KEPT untouched (JUDGE-1-confirmed-real, this iteration touches NONE of them):**
- `src/composables/motion/useGooMorph.ts` — the ONE de-duped engine (`useWormMorph` DELETED).
- `src/components/custom/goo-filter/GlassGooFilter.vue` — the static `#glass-goo` filter.
- `src/components/custom/pager-dots/PagerDots.vue` — consumer #1 (the working worm).
- `src/components/custom/goo-blob/composables/{useMetaballRenderer,uploadBlobUniforms}.ts` — the
  `uMorphT` shading-morph + the `AV_DPR_MAX` (≤2×) backing-store cap.
- `src/styles/glass/surfaces.css` `.glass-pager-ring` — the element-level oklab tint (gray-hole fix).

---

## 3. BEFORE / AFTER (live computed values — `http://localhost:5173`)

### The mass count (THE fix — JUDGE-1's table)

| Surface | Masses inside goo layer (BEFORE) | Masses inside goo layer (AFTER) | Merge possible |
|---|---|---|---|
| **carousel** `.carousel-goo-layer` (#glass-goo) | 1 (`[carousel-goo-worm]`) | **6** (`5× carousel-goo-plate + worm`) | ✓ two-mass neck + pinch |
| **deck** `.deck-goo-layer` (#glass-goo) | 1 (`[deck-goo-worm]`) | **2** (`deck-goo-plate + worm`) | ✓ worm-into-plate merge |
| **pager** (working ref) `.pager-goo-layer` (#pager-goo) | 6 | 6 (untouched) | ✓ (the pattern reused) |

### The carousel transition frame-series (real Next click, sampled)

```
lenRatio: 1.41 → 1.88 → 2.13(peak @147ms, gooT 0.54) → 1.78 → 1.52 → … → 1.07 (settle)
```
- The worm `lenRatio` PEAKS at **2.13** at the midpoint (the FAT NECK welling across the gap),
  then contracts — the stretch-then-contract bulge, not a monotone box slide.
- Pinned-peak capture: worm spans **plate 0 (center 207px) → plate 1 (center 637px)**,
  centered at 422px, `lenRatio 2.22` — the worm IS the neck bridging the two static plates.
- Plate opacities mid-travel: `[1, 0.42, 1, 0, 0]` — the leaving plate (1.0) + the incoming plate
  (1.0) + the worm = THREE masses the filter merges; the off-screen plates hidden.

### The deck transition frame-series (real Next click)

```
lenRatio: 1.02 → 1.21 → 1.49 → 1.68 → 1.82(peak @510ms) → 1.74 → 1.63 (necking into center plate)
```

### Warm-cream identity (OKLab — NEVER gray; BA.W-NO-GRAY)

| Surface | Mode | Resolved goo-mass color | OKLab chroma | hue | Verdict |
|---|---|---|---|---|---|
| carousel plates + worm | light | `oklab(0.976 0.00523 0.01263)` | **0.0137** | 67.5° | warm ✓ (C ≥ 0.010, H∈[45,85]) |
| carousel plates + worm | dark | `oklab(0.351 0.0102 0.0171)` | **0.0199** | 59.2° | warm luminous-dark ✓ |
| deck plate + worm | light | `oklab(0.975 0.00534 0.01290)` | **0.0140** | 67.5° | warm ✓ |

The masses are warm MATERIAL at the warm-amber hue — the `color-mix(in oklab, var(--card), white
N%)` domed-droplet fill, never a gray/charcoal blob. The layer opacity (0.55 carousel / 0.5 deck)
supplies the glass translucency (the opaque-layer technique — full-alpha masses, translucent layer)
so the slide content reads through the bridge.

### Rest state (no gray slab at rest)

- carousel layer rest opacity **0** (the goo is INVISIBLE at rest — zero cost, no slab); fades to
  0.55 only `[data-traveling]`. Worm parked at active center (scale 1). Plates `[0.42,1,0,0,0]`.

---

## 4. SAFARI-SAFETY (the #1 user defect — re-audited, structurally intact)

`#glass-goo` filter live readback:
- `feGaussianBlur stdDeviation="7"` — **LITERAL, no `var()`** (the WebKit var-driven-blur broken
  class — bug 283156 — structurally absent).
- `feColorMatrix values="… 20 -9"` — **static literals, no `var()`**.
- region `x=-50% y=-50% width=200% height=200%` (the neck never clips).
- `color-interpolation-filters="sRGB"` (WebKit linearRGB-lighten bug 136418 avoided).
- the layer uses **regular `filter: url(#glass-goo)`**, `backdrop-filter: none` (WebKit bug 245510
  avoided).
- `@supports not (filter: url(#glass-goo))` drops the layer to the plain cross-fade floor.

The ONLY per-frame writes are `transform`/`scale`/`opacity`/the `--goo-t` custom — the consumer
animates transforms, never the filter. **The Safari-broken class cannot regress.**

### Performance (the "far too SLOW" defect)

Real Next transition, 143 frames over 1103ms: **avg 7.71 ms/frame** (≈130fps capacity), **max
frame gap 17.4ms** (no jank). Compositor-only transforms + the static filter cost nothing per
frame — the morph is smooth + fast. The blob's `AV_DPR_MAX` (≤2×) backing-store cap (JUDGE-1
confirmed: 1536²=2×-capped) is the WebGL Safari-perf fix and is untouched.

---

## 5. A11Y / PRM

- **PRM carved both ways.** The `@media (prefers-reduced-motion: reduce) { .carousel-goo-layer /
  .deck-goo-layer { display: none } }` rule is present (verified live in the stylesheet), AND
  `useGooMorph` early-returns under PRM (`if (PRM()) snap(to)` — the worm snaps, no rAF, no squish,
  `--stretch` stays 1). Only the crisp embla scroll / deck cross-fade survives. Legibility holds.
- **aria.** The goo silhouette layer is `aria-hidden="true"` + `pointer-events: none` (decorative);
  the crisp embla track (z-index 1) owns content + interaction + embla's `aria-roledescription`
  slide semantics; the deck keeps `useDeck`'s aria-live "Slide N of M" announcer. The goo-morph
  adds ZERO aria surface.
- **AA contrast.** The slide text rides the UNFILTERED crisp layer above the translucent goo bridge
  — text never passes the goo threshold, contrast unaffected. Verified legible through the bridge in
  both modes (the pinned-peak screenshots).

---

## 6. GATES + TYPECHECK

- `npx vue-tsc --noEmit -p tsconfig.json` → **0 errors** (no new TS errors).
- `node scripts/verify-siblings-intact.mjs --quiet` → **exit 0** (siblings OK; no `~/Programming`
  touch).
- `node scripts/proof-no-layout-animation.mjs` → **LOCKED** (0 layout-property animations; the new
  plate/worm CSS is transform/opacity/scale/filter only).
- `node scripts/proof-no-gray.mjs` → **green** (the warm-chroma floor holds; `.glass-pager-ring`
  element-level tint intact).
- Console: 0 errors on `/navigation/carousel` + `/motion/deck` during real transitions (only the
  two pre-existing unrelated warnings JUDGE-1 already noted: TooltipProvider `<Transition>` +
  useAurora deferred-init).

---

## 7. SCREENSHOTS

- `carousel-peak-neck-light-2.png` — **the carousel two-mass neck at peak** (light): two warm-cream
  glass plates + the connecting neck spanning the gap over the slides — the blob↔meatball merge.
- `carousel-peak-neck-dark.png` — the same merge in **dark mode** (warm luminous-dark transmissive
  glass, not a charcoal slab).
- `carousel-peak-neck-light.png` — an earlier viewport capture (top-scrolled) of the same merge.
- `deck-peak-neck-light.png` — **the deck worm necking into the static center plate** (the two-mass
  merge on the full-viewport deck), text legible through the bridge.
- `carousel-rest-light.png` — the carousel **at rest** (the goo invisible, no gray slab; the glass
  pager ring reads as warm glass).

---

## 8. WHAT REMAINS (out of this iteration's scope — already landed, JUDGE-1-confirmed)

- The blob `uMorphT` continuous shading-morph (blob↔meatball) + the DPR cap — landed prior, kept.
- The `useWormMorph`→`useGooMorph` de-dup — landed prior, kept (worm = consumer #1).
- The `.glass-pager-ring` element-level oklab tint (gray-hole) — landed prior, kept, gate green.

The single decisive change this iteration is the **≥2-mass merge** — the exact fix JUDGE-1 named as
"THE fix." The carousel now hosts 6 masses, the deck 2; both wells a real warm-cream metaball neck
that bridges two distinct bodies, stretches, and pinches/merges — verified live, both modes, the
filter Safari-static, the motion compositor-only + fast + PRM-carved.
