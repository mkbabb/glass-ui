# BUILD-REPORT-1 — W-GOO-CAROUSEL-DECK-FIX2: dark-mode luminous transmissive goo

The dark-mode goo bridge composited to a dim warm-gray / gray-brown HALO around the slide
(effective OKLab L ≈ 0.31 over the dark aurora) instead of luminous warm transmissive glass.
This build EXTENDS the confirmed root cause per BUILD-SPEC.md — it was not re-derived. Light
mode is byte-unchanged. All work is compositor-only, Safari-safe, a11y-preserved.

Built + live-verified on `http://localhost:5173` (Chromium, dark + light), real getComputedStyle
readback + pinned mid-morph screenshots. Status: **DONE — every acceptance criterion met.**

---

## 1. What was built (3 edits, 2 files — exactly the spec manifest)

### Edit 1 — `src/components/ui/carousel/CarouselContent.vue` — `.dark` arm (after L369)

New `.dark .carousel-goo-layer` arm (now L383–387):

```css
.dark .carousel-goo-layer {
    color: oklch(from var(--card) 0.68 0.05 h);
    filter: var(--carousel-goo-filter, url(#glass-goo)) saturate(1.3)
        brightness(1.3);
}
```

- `color: oklch(from var(--card) 0.68 0.05 h)` — keeps `--card`'s warm hue (live H 59.18°),
  pins L→0.68 (the W-DARK-MATERIAL warm-ink elevation), RE-SATURATES C→0.05 (~2.5× the
  BA.W-NO-GRAY STRONG floor 0.020). The worm/plate radial-gradient reads this as `currentColor`.
- `filter: … saturate(1.3) brightness(1.3)` — the transmissive companion appended AFTER
  `url(#glass-goo)` on the CSS shorthand (NOT inside the SVG graph → Safari-native). `saturate`
  reads the warm chroma as LIT glass; `brightness` multiplies the fill before composite so the
  mass clears L 0.5.

### Edit 2 — `src/components/ui/carousel/CarouselContent.vue` — travel-gate harden (`onSelect`, L189–204)

Re-keyed the morph gate off embla's OWN authoritative snap deltas instead of the locally-tracked
`activeIndex` (which a rapid double-advance pre-updates so `from === to`, silently dropping the
morph — the JUDGE-3 §1c caveat):

```js
const to = api.selectedScrollSnap();
const prev = api.previousScrollSnap();   // embla's authoritative pre-select snap
activeIndex = to;
setWormGeometry();
if (prev === to) { goo.snap(to); }
else { markTraveling(); goo.travel(prev, to); }
```

`useGooMorph.travel()` already `snap()`s internally when `from === to`, so passing `(prev, to)`
is correct and safe. The deck watch keys off real `(to, from)` watch args and was NOT touched.

### Edit 3 — `demo/stories/motion/deck.vue` — `.dark` arm (after L220)

New `.dark .deck-goo-layer` arm (now L228–231), mirroring the carousel:

```css
.dark .deck-goo-layer {
    color: oklch(from var(--card) 0.68 0.05 h);
    filter: url(#glass-goo) saturate(1.3) brightness(1.3);
}
```

**Selector discipline:** plain `.dark .x` ANCESTOR selectors (NOT scoped `:global(.dark)` — the
Vue-scoped-`:global()`-drop trap; NOT `light-dark()`). The `.dark` ancestor survives Vue scoping
because `.carousel-goo-layer` / `.deck-goo-layer` already carry the scope attribute.

**Byte-untouched:** the light goo `color: color-mix(in oklab, var(--card), white 8%)`
(CarouselContent.vue:358, deck.vue:208), the worm/plate domes, the `#glass-goo` static `<filter>`
graph (`GlassGooFilter.vue`), and ALL motion tokens/clocks. No new spring/clock/color token minted.

---

## 2. Live-verified computed values (before → after)

### Carousel — `.dark .carousel-goo-layer` (dark mode)

| property | HEAD (defect) | FIXED (live readback) |
|---|---|---|
| `color` | `color-mix(--card, white 8%)` → oklab L 0.351, C ~0.020 | `oklch(0.68 0.05 59.18)` — **L 0.68, C 0.05, H 59.18°** |
| `filter` | `url(#glass-goo)` | `url("#glass-goo") saturate(1.3) brightness(1.3)` |
| composited L (fill·1.3·0.55 + pageL 0.146·0.45) | ≈ 0.259 (muddy halo) | **0.552 — clears L ≥ 0.5** |

`pageL` read live behind the carousel = **0.146** (matches the spec's worked value exactly).

### Deck — `.dark .deck-goo-layer` (dark mode)

| property | FIXED (live readback) |
|---|---|
| rest opacity | `0` (no slab regression — JUDGE-2 §1 stays fixed) |
| `color` | `oklch(0.68 0.05 59.18)` — L 0.68, C 0.05, H 59.18° |
| `filter` | `url("#glass-goo") saturate(1.3) brightness(1.3)` |
| composited L (fill·1.3·0.62 + pageL·0.38) | **0.604 — clears L ≥ 0.5** |

### Light mode — UN-REGRESSED (live readback, `.dark` removed)

| property | value |
|---|---|
| `.deck-goo-layer` `color` | `oklab(0.976 0.0052 0.0126)` — warm-cream L 0.976 (the original `color-mix`) |
| `.deck-goo-layer` `filter` | `url("#glass-goo")` — NO `saturate/brightness` companion |

The `.dark` arm does NOT leak into light mode.

---

## 3. Gestalt screenshots (the BAR — judged as a user)

- `after-carousel-dark-midmorph.png` — pinned mid-morph (opacity 0.55, worm stretched
  scaleX 2.6). The two masses + warm neck read as a **luminous warm-cream/peach glass membrane**
  welling across the gap, with the colorful aurora (purple/blue/pink) glowing THROUGH the
  translucent glass. NOT a gray-brown halo. **G1/G2/G4 met.**
- `after-deck-dark-midmorph.png` — pinned mid-morph (opacity 0.62). A luminous warm-cream glass
  membrane stretched across the slide over the deep dark deck stage; the "Welcome" headline reads
  THROUGH it (transmissive). Decisive warm glass, not a charcoal slab. **G1/G2/G4 met.**

---

## 4. Acceptance criteria — all PASS

| # | criterion | result |
|---|---|---|
| G1 | dark goo = luminous warm glass, aurora glowing through | PASS (both screenshots) |
| G2 | decisive blob↔meatball merge both modes | PASS (neck wells across gap, masses bridge) |
| G3 | light mode un-regressed (L 0.976 warm-cream, op 0 at rest) | PASS (live readback) |
| G4 | warm identity both modes (H 55–70, never gray) | PASS (H 59.18° both modes) |
| M1 | dark composited L ≥ 0.5 | PASS (carousel 0.552, deck 0.604; HEAD ≈ 0.26) |
| M2 | warm-ink VECTOR `oklch(from var(--card) … 0.05 h)`, no `white N%` in dark | PASS (C 0.05 ≥ 0.020, H 59.18°) |
| M3 | transmissive companion `saturate(1.3) brightness(1.3)` + `url(#glass-goo)` | PASS (both surfaces) |
| M4 | static filter, Safari-safe (literal stdDeviation, sRGB, no `backdrop-filter:url`) | PASS (`grep -c backdrop-filter:url` = 0; `#glass-goo` graph byte-untouched; `:blur="10"` literal) |
| M5 | light mode byte-unchanged | PASS (light `color-mix` lines intact, light filter plain) |
| M6 | BOTH surfaces fixed | PASS (CarouselContent.vue AND deck.vue) |
| M7 | gate keys off `previousScrollSnap()`, not `activeIndex` | PASS (`previousScrollSnap()` present; `const from = activeIndex` removed) |

---

## 5. Gates

- **Typecheck:** `npx vue-tsc --noEmit -p tsconfig.json` — **0 errors** (no new TS errors).
- **Siblings:** `node scripts/verify-siblings-intact.mjs --quiet` — **exit 0** (siblings OK).
- **Source asserts:** `previousScrollSnap()` present + `const from = activeIndex` gone (M7);
  light `color-mix(in oklab, var(--card), white 8%)` byte-intact on both surfaces (M5);
  `oklch(from var(--card) 0.68 0.05 h)` + `saturate(1.3)` present on both surfaces (M2/M3);
  `backdrop-filter:\s*url(` count = 0 on both surfaces (M4).

---

## 6. a11y / PRM / Safari

- **PRM** — the goo layer is `display:none` under `prefers-reduced-motion: reduce` (unchanged);
  the `.dark` arm never paints under reduce, no new media-query interaction.
- **`@supports not (filter: url(#glass-goo))`** — floor stands; the `.dark` companion is pure
  CSS-filter functions (no `url()`), so the warm fill reads even on a gap engine.
- **aria** — goo layers stay `aria-hidden="true"`, `pointer-events:none`; AA text contrast is on
  the crisp content layer (z-index 1), untouched by the goo overlay (z-index 2).
- **Safari** — NO `backdrop-filter: url()` (WebKit 245510); `#glass-goo` `stdDeviation` is a
  literal `10` via `:blur="10"` (no var-driven re-blur); the `saturate()/brightness()` companion
  is appended to the CSS `filter:` shorthand OUTSIDE the SVG graph → Safari-native.

---

## 7. Files + line manifest

| file | lines | change |
|---|---|---|
| `src/components/ui/carousel/CarouselContent.vue` | 189–204 | travel-gate harden (`previousScrollSnap()`) |
| `src/components/ui/carousel/CarouselContent.vue` | 371–387 | `.dark .carousel-goo-layer` arm (color + companion) |
| `demo/stories/motion/deck.vue` | 221–231 | `.dark .deck-goo-layer` arm (color + companion) |

Screenshots: `docs/tranches/BD/viz/refine/goo-carousel-deck-fix2/after-carousel-dark-midmorph.png`,
`…/after-deck-dark-midmorph.png`.
