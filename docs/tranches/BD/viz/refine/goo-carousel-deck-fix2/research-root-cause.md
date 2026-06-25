# RESEARCH-1 (fix2) — CONFIRMED LIVE ROOT-CAUSE: dark-mode goo gray-brown halo

Live-inspected on `http://localhost:5173` (Chromium via chrome-devtools-mcp), `.dark` forced,
goo layer pinned `[data-traveling]`. Every value below is a **resolved `getComputedStyle`
value off the live DOM**, not a source read. This EXTENDS JUDGE-3 §6/§7 (the authoritative
spec) — the root cause is CONFIRMED, not re-derived, and the composite math is carried
forward with the load-bearing correction that the `brightness()` companion is NOT optional.

Screenshots (dark, pinned):
- `dark-carousel-pinned.png` — the carousel goo plates read as dim taupe/gray-brown rounded
  slabs flanking the slide. Muddy, NOT luminous warm glass.
- `dark-deck-pinned.png` — same defect on the deck stage worm/plate.

---

## 1. THE CONFIRMED MECHANISM (the exact tokens + the cascade path)

### The single fill source (BOTH surfaces, identical)
Both `.carousel-goo-layer` (CarouselContent.vue:355) and `.deck-goo-layer` (deck.vue:208)
set the fill via:

```css
color: color-mix(in oklab, var(--card), white 8%);
```

The worm + plate radial-gradients then read this as `currentColor`:
```css
background: radial-gradient(120% 90% at 50% 18%,
    color-mix(in oklab, currentColor, white 18%),  /* the catch-light dome */
    currentColor 70%);                              /* the body */
```

### The dark-arm cascade that poisons it
`src/styles/tokens/dark-arm.css:74` — `.dark { --card: hsl(26 22% 17%); }` (the
W-DARK-MATERIAL L10→L16 lift). That dark `--card` is **L≈0.17**. `color-mix(in oklab,
var(--card), white 8%)` only nudges it ~8% toward white → a dim warm-dark ink.

### LIVE resolved values (dark, pinned)

| element | resolved `color` / gradient stop | OKLab L | OKLab C | OKLab H |
|---|---|---|---|---|
| `.carousel-goo-layer` color (= body) | `oklab(0.351279 0.0102006 0.0170949)` | **0.351** | ~0.020 | ~59° |
| carousel worm catch-light stop | `oklab(0.468047 0.0083727 0.0140214)` | 0.468 | ~0.016 | ~59° |
| `.deck-goo-layer` color (= body) | `oklab(0.351279 0.0102006 0.0170949)` | **0.351** | ~0.020 | ~59° |
| deck worm catch-light stop | `oklab(0.481022 0.0081696 0.0136799)` | 0.481 | ~0.014 | ~59° |

The hue (H≈59°, warm amber) and chroma (C≈0.014–0.020) DO clear the BA.W-NO-GRAY floor on
the NUMBER — exactly as JUDGE-3 noted. **The defect is LUMINANCE, not hue.** At a body
L≈0.35 fill the mass is a dim warm-dark ink before the layer opacity even composites it.

### The layer composite (the perceptual read)
- carousel: `--carousel-goo-layer-opacity` → `0.55` (CarouselContent.vue:368, default arm)
- deck: `--deck-goo-layer-opacity` → `0.62` (deck.vue:219, default arm)
- page backdrop behind both: `--background` = `--neutral-0` = `hsl(24 9% 4%)` → **L≈0.12**
  (the W-DARK-MATERIAL deepened page floor, dark-arm.css:42).
- `filter: url(#glass-goo)` is the static metaball merge (Safari-safe — JUDGE-3 §1a) and
  carries **no luminosity companion** in dark (no `brightness()`/`saturate()` lift).

Composited effective L = `fillL · opacity + pageL · (1 − opacity)` (live-computed):

| surface | body composited L | catch-light composited L |
|---|---|---|
| carousel (op 0.55) | **0.247** | 0.311 |
| deck (op 0.62) | **0.263** | 0.344 |

A mass at effective L 0.25–0.34 over an L 0.12 page is a **dim warm-gray / taupe halo** —
the exact "gray" the user flags. Light mode is FINE (the light `--card` is L≈0.98, the fill
composites warm-cream); the defect is dark-arm-ONLY. Do not touch the light fill.

---

## 2. THE LOAD-BEARING CORRECTION (the fix CANNOT be fill-lift alone)

JUDGE-3 §7 item 1 says lift the dark fill to **~L 0.62–0.70**. Live composite math
(carried forward) shows that ALONE does not clear the JUDGE's own "composited ABOVE L 0.5"
gestalt bar at the shipped layer opacities:

To land the COMPOSITED mass at a given effective L, the FILL L must be
`(targetL − pageL·(1−op)) / op`:

| target composited L | fill L needed (carousel op 0.55) | fill L needed (deck op 0.62) |
|---|---|---|
| 0.50 | **0.811** | **0.733** |
| 0.55 | 0.902 | 0.814 |
| 0.60 | 0.993 | — |

So a fill of L 0.66–0.70 composites only to **L ≈ 0.41–0.44** (carousel) / **L ≈ 0.45**
(deck) — still a dim frame, still below 0.5. **The fill-lift and the transmissive
`brightness()` companion (JUDGE-3 §7 item 2) are BOTH required, and item 2 is not optional
polish — it is mathematically load-bearing to clear L 0.5.** A `brightness(b)` on the layer
filter multiplies the fill BEFORE composite: `composited = fillL·b·op + pageL·(1−op)`.

Worked targets that clear the gestalt bar (live-computed):
- carousel: fill L 0.66 + `brightness(1.30)` → composited **L ≈ 0.526**
- carousel: fill L 0.70 + `brightness(1.40)` → composited **L ≈ 0.593**
- deck (op 0.62, slightly hotter): a touch less brightness for the same read.

The fix-coder should land the fill in the W-DARK-MATERIAL warm-ink register (L ~0.66–0.72)
AND add the `brightness()`/`saturate()` companion so the COMPOSITED mass reads above L 0.5
— a glowing warm membrane with the aurora visible THROUGH it.

---

## 3. THE FIX SURFACE (precise, compositor-only, Safari-safe)

### (a) The warm dark-ink fill arm — NOT a `white N%` mix
A `.dark` arm on the goo-layer `color`, in BOTH CarouselContent.vue (`.carousel-goo-layer`)
and deck.vue (`.deck-goo-layer`). It must be a WARM tint toward the dark warm-ink register,
NOT a gray `white N%` mix (white desaturates toward neutral — the BA.W-NO-GRAY trap).

The house already has the exact warm-ink token: `--glass-tint-ink-dock` resolves live to
`oklch(from hsl(30 14% 90%) 0.90 0.045 h)` — the dark `--foreground` (H75.4° warm amber)
lifted to L 0.90, C 0.045 (off the gray floor). The fill should be derived in that family,
e.g. an `oklch(from var(--foreground) 0.68 0.05 h)`-style warm-ink at the elevation L, so:
- OKLab hue stays in the 55–70° warm-amber band (the worm already reads H≈59° — keep it),
- chroma stays well above the BA.W-NO-GRAY floor (≥ ~0.04, NOT the 0.016–0.020 it sits at
  now — the lift should also re-saturate, not just brighten toward gray),
- L lands ~0.66–0.72 so that WITH the brightness companion the composite clears 0.5.

Use a plain `.dark .carousel-goo-layer { color: … }` ancestor selector (NOT a scoped
`:global(.dark)` — MEMORY: the Vue scoped `:global()` drop; and NOT a `light-dark()` arm —
the fill is not inside a shadow, but the per-mode plain pair is the house idiom here).

### (b) The transmissive `brightness()`/`saturate()` companion (load-bearing per §2)
A `.dark` arm on the goo-layer `filter` adding a `saturate()/brightness()` lift AFTER the
`url(#glass-goo)` merge — the W-DARK-MATERIAL scope-2 "dark glass glows where light passes"
register (the same model as `--glass-blur-*` dark arms: `saturate(1.28–1.35) brightness(...)`).
- carousel layer today: `filter: var(--carousel-goo-filter, url(#glass-goo))`.
- deck layer today: `filter: url(#glass-goo)`.

The dark arm should be e.g. `filter: url(#glass-goo) saturate(1.3) brightness(1.35)`.
CRITICAL: NEVER `backdrop-filter: url(...)` (Safari bug 245510 — JUDGE-3 §1a). Keep the
`#glass-goo` `<filter>` STATIC (sRGB, no var-driven `stdDeviation`) — the `brightness()`/
`saturate()` are plain CSS filter functions appended AFTER `url(#glass-goo)`, which is
Safari-safe (they are not inside the SVG graph). The brightness multiplies the warm fill so
the chroma reads as LIT glass, not a flat fill, and pushes the composited L over 0.5.

### (c) HARDEN the carousel travel gate against the `from === to` desync
The desync is NOT in `useGooMorph` (its `travel()` correctly `snap()`s when `from === to`).
It is in **CarouselContent.vue `onSelect()` (lines 189–202)**:

```js
function onSelect(): void {
    const api = carouselApi.value;
    if (!api) return;
    const to = api.selectedScrollSnap();
    const from = activeIndex;          // ← LOCALLY-tracked; a rapid double-advance
    activeIndex = to;                  //    can pre-update this so from === to
    setWormGeometry();
    if (from === to) {
        goo.snap(to);                  // ← silently drops the morph (JUDGE-3 §1c CAVEAT)
    } else {
        markTraveling();
        goo.travel(from, to);
    }
}
```

Re-key the gate off embla's OWN snap deltas so a rapid real swipe never drops the goo:
`api.selectedScrollSnap() !== api.previousScrollSnap()` (both are standard embla-carousel
API methods on the bound `EmblaApi`; `previousScrollSnap()` returns the snap index BEFORE
the current `select`). When they differ → `markTraveling()` + `goo.travel(prev, to)`;
when equal → `goo.snap(to)`. This keys the morph off embla's authoritative travel state,
not the fragile locally-tracked `activeIndex`. The deck (deck.vue watch on `deck.index`,
lines 105–114) keys off the real `(to, from)` watch args and is NOT affected — leave it.

---

## 4. THE GESTALT BAR (what the judge must reproduce)

In BOTH light AND dark the two masses + the neck must read as a DECISIVE blob↔meatball
merge welling warm GLASS across the gap (the Google Gemini carousel reference), glassy/
transmissive with the colorful aurora glowing THROUGH — NEVER a charcoal/taupe halo, NEVER
a flat plate. The JUDGE must reproduce a REAL Next `.click()` in DARK mode, screenshot a
mid-morph frame, and judge it AS A USER: a dim/muddy/gray dark halo is an automatic FAIL no
matter what the C≥0.010 metric says. Target: the composited dark mass reads ABOVE L 0.5
(per the §2 math — fill-lift AND brightness companion together), warm (H 55–70°, C ≥ ~0.04),
with the dark aurora visibly glowing through. Light mode must NOT regress (fill L≈0.98
warm-cream, clears to opacity 0 at rest).

---

## 5. CONFIRMED ROOT-CAUSE SUMMARY

1. **The fill is dark-arm poisoned.** `.dark { --card: hsl(26 22% 17%) }` (L≈0.17) feeds
   `color: color-mix(in oklab, var(--card), white 8%)` → live fill body **oklab L 0.351**
   (carousel + deck identical). Hue/chroma clear the floor; LUMINANCE is the defect.
2. **The composite is muddy.** At layer opacity 0.55 (carousel) / 0.62 (deck) over the
   L≈0.12 page, the masses composite to effective **L 0.25–0.34** — a dim warm-gray/taupe
   halo (the user's "gray"). Verified in `dark-carousel-pinned.png` + `dark-deck-pinned.png`.
3. **There is NO transmissive companion in dark.** `filter: url(#glass-goo)` carries no
   `brightness()`/`saturate()` lift — the dark glass does not glow where light passes
   (the W-DARK-MATERIAL scope-2 register is absent on the goo layer).
4. **Fill-lift ALONE cannot clear the bar.** Live math: to composite ABOVE L 0.5 the fill
   must reach L 0.73–0.81 — above the JUDGE's 0.62–0.70 register. The `brightness()`
   companion is therefore mathematically load-bearing, not optional polish.
5. **The travel-gate desync lives in CarouselContent.onSelect**, keyed off locally-tracked
   `activeIndex`; re-key off `selectedScrollSnap() !== previousScrollSnap()`. (useGooMorph
   and the deck watch are correct — do not touch.)

The fix is dark-arm-ONLY, compositor-only (a `.dark` `color` arm + a `.dark` `filter`
brightness/saturate companion on each goo layer), plus the gate re-key. NO light-mode
regression, NO `backdrop-filter:url`, NO var-driven `feGaussianBlur`, the `#glass-goo`
`<filter>` stays static sRGB.
