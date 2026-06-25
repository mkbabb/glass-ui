# BUILD-SPEC — W-GOO-CAROUSEL-DECK-FIX2: dark-mode luminous transmissive goo

The dark-mode goo bridge composites to a dim warm-gray / gray-brown HALO around the slide
(effective OKLab L ≈ 0.31 over the dark aurora) instead of luminous warm transmissive glass.
This spec is the EXACT, compositor-only, Safari-safe fix. It EXTENDS the CONFIRMED root cause
(`research-root-cause.md` §1–5 + JUDGE-3 §6–§7) — the cause is not re-derived. Light mode is
FINE and stays BYTE-UNCHANGED.

BINDING north star: `design.md` §L1 (the six-layer optical composite, the warm-cream identity)
+ CLAUDE.md §"The dark register as a luminous transmissive material" (BA.W-DARK-MATERIAL: the
`saturate()/brightness()` transmissive companion + the `--glass-tint-ink` warm-cream lift) +
§"The warm-chroma floor" (BA.W-NO-GRAY: warm MATERIAL, never gray; the STRONG floor C ≥ 0.020)
+ `[[feedback-liquid-weight-universal]]` (the morph timing is preserved — this is a COLOR +
TRANSMISSION fix, not a motion re-tune).

---

## 0. The confirmed cause (one line each — do NOT re-derive)

1. **Fill poisoned by the dark `--card`.** Both `.carousel-goo-layer` (CarouselContent.vue:355)
   and `.deck-goo-layer` (deck.vue:208) set `color: color-mix(in oklab, var(--card), white 8%)`.
   In dark `--card` = `hsl(26 22% 17%)` (live OKLab **L 0.295**, the source `--card` itself);
   `white 8%` lifts it only to live **L ≈ 0.351** and *desaturates* toward neutral on the way up
   (the `white N%` = gray-maker trap). The worm/plate radial-gradient reads this as `currentColor`.
2. **The composite is muddy.** At layer opacity 0.55 (carousel) / 0.62 (deck) over the L≈0.146
   page, the masses composite to effective **L ≈ 0.25–0.34** — a dim warm-gray / taupe halo.
3. **No transmissive companion in dark.** `filter: url(#glass-goo)` carries no `saturate()/
   brightness()` lift — the dark glass does not glow where light passes (W-DARK-MATERIAL scope 2
   is absent on the goo layer). Fill-lift ALONE cannot clear L 0.5 (the §3 math); the companion
   is mathematically load-bearing, not polish.
4. **Travel-gate desync.** `CarouselContent.onSelect()` keys `from === to` off the locally-tracked
   `activeIndex` (line 193) — a rapid double-advance pre-updates it so `from === to`, silently
   dropping the morph (`goo.snap` instead of `goo.travel`). The deck watch keys off real `(to,from)`
   watch args and is NOT affected.

---

## 1. The fix vector — lift toward the WARM DARK-INK, not toward white

The dark fill must lift luminance WHILE GAINING warm chroma — the W-DARK-MATERIAL elevation
register, NOT a `white N%` neutral mix. The house already has the exact relative-color idiom:
`--glass-tint-ink-dock: oklch(from var(--foreground) 0.90 0.045 h)` (dark-arm.css:303) and
`oklch(from var(--card) 0.42 0.05 h)` (glass-fx.css:176). The goo fill joins that family.

**The recipe — a `.dark` arm on the goo-layer `color`, BOTH surfaces:**

```css
/* .dark .carousel-goo-layer  AND  .dark .deck-goo-layer */
color: oklch(from var(--card) 0.68 0.05 h);
```

`oklch(from var(--card) 0.68 0.05 h)` keeps `--card`'s warm hue (live H ≈ 59°, the worm already
reads there) and PINS:
- **L → 0.68** (the W-DARK-MATERIAL warm-ink elevation register — JUDGE-3 §7 item 1's 0.62–0.70),
- **C → 0.05** (~2.5× the current 0.020, well above the BA.W-NO-GRAY STRONG floor; the lift
  RE-SATURATES, it does not wash to gray).

This is the SAME `oklch(from …)` mechanism already live in `--glass-tint-ink-dock` and the dark
`--surface-tint-*` arm — no new mechanism, no new token, no `white N%`.

---

## 2. The transmissive companion — the dark-glass-glows register (load-bearing)

A flat warm fill at L 0.68 is still a flat plate. The W-DARK-MATERIAL scope-2 transmissive arm is
the missing layer AND it is the math that clears L 0.5. A `.dark` arm on the goo-layer `filter`
adds a `saturate()/brightness()` lift AFTER `url(#glass-goo)`:

```css
/* .dark .carousel-goo-layer */
filter: var(--carousel-goo-filter, url(#glass-goo)) saturate(1.3) brightness(1.3);
/* .dark .deck-goo-layer */
filter: url(#glass-goo) saturate(1.3) brightness(1.3);
```

- `saturate(1.3)` — the warm chroma reads as LIT glass, in the W-DARK-MATERIAL `saturate(1.22–1.35)`
  band.
- `brightness(1.3)` — multiplies the warm fill BEFORE composite (`composited = fillL·b·op + pageL·
  (1−op)`), pushing the composited mass over L 0.5 (the §3 math). Slightly above the scope-2
  `brightness(1.06–1.18)` plate band because the goo masses composite at 0.55/0.62 over the
  *deepened* L 0.146 page (not a glass plate over a brighter surface) — the larger lift is
  warranted and bounded by the §3 worked targets.

**Safari fences (binding):**
- NEVER `backdrop-filter: url(...)` (WebKit bug 245510) — the goo is a regular `filter:`.
- The `#glass-goo` `<filter>` stays STATIC (sRGB, literal `stdDeviation="10"`,
  `feColorMatrix … 24 -11`, region -50%/200%, no var-driven blur). The `saturate()/brightness()`
  are plain CSS filter functions appended AFTER `url(#glass-goo)` on the shorthand — they are NOT
  inside the SVG graph, so Safari-native.

---

## 3. The compositing math (why fill-lift AND brightness are BOTH required)

`composited = fillL · brightness · opacity + pageL · (1 − opacity)`, pageL = 0.146 (live).

| surface | fill L | brightness | opacity | composited L | clears 0.5? |
|---|---|---|---|---|---|
| carousel HEAD (defect) | 0.351 | 1.0 | 0.55 | **0.259** | NO (muddy) |
| carousel — fill 0.68, NO bright | 0.68 | 1.0 | 0.55 | 0.440 | NO (still a frame) |
| **carousel — fill 0.68, bright 1.3** | 0.68 | 1.3 | 0.55 | **0.552** | **YES** |
| deck HEAD (defect) | 0.351 | 1.0 | 0.62 | **0.273** | NO (muddy) |
| **deck — fill 0.68, bright 1.3** | 0.68 | 1.3 | 0.62 | **0.604** | **YES** |

Fill-lift to 0.68 alone composites to only L 0.44 (carousel) — still a dim frame. The
`brightness(1.3)` companion is mathematically load-bearing to clear the JUDGE's L ≥ 0.5 gestalt
bar. Both arms land the COMPOSITED mass ABOVE 0.5 — a glowing warm membrane, the dark aurora
visibly glowing through.

---

## 4. The travel-gate harden — key off embla's own truth

`CarouselContent.onSelect()` (lines 189–202) currently:

```js
const to = api.selectedScrollSnap();
const from = activeIndex;          // ← LOCALLY-tracked — a rapid double-advance desyncs it
activeIndex = to;
setWormGeometry();
if (from === to) { goo.snap(to); }              // ← silently drops the morph
else { markTraveling(); goo.travel(from, to); }
```

Re-key the gate off embla's authoritative snap deltas so a rapid real swipe never drops the goo:

```js
function onSelect(): void {
    const api = carouselApi.value;
    if (!api) return;
    const to = api.selectedScrollSnap();
    const prev = api.previousScrollSnap();   // embla's OWN pre-select snap index
    activeIndex = to;
    setWormGeometry();
    if (prev === to) {
        goo.snap(to);
    } else {
        markTraveling();
        goo.travel(prev, to);
    }
}
```

`selectedScrollSnap()` and `previousScrollSnap()` are both standard embla-carousel `EmblaApi`
methods on the bound api. The morph now keys off embla's authoritative travel state, not the
fragile locally-tracked `activeIndex`. `useGooMorph.travel()` already `snap()`s internally when
`from === to`, so passing `(prev, to)` is correct and safe. The deck watch (deck.vue:105–114)
keys off the real `(to, from)` watch args and is NOT affected — leave it untouched.

---

## 5. The exact change manifest (files + lines + before/after)

| # | File | Line(s) | Before | After |
|---|---|---|---|---|
| 1 | `src/components/ui/carousel/CarouselContent.vue` | new `.dark` arm after L369 (`.carousel-goo-layer[data-traveling]`) | — | `.dark .carousel-goo-layer { color: oklch(from var(--card) 0.68 0.05 h); filter: var(--carousel-goo-filter, url(#glass-goo)) saturate(1.3) brightness(1.3); }` |
| 2 | `src/components/ui/carousel/CarouselContent.vue` | `onSelect()` L192–201 | `const from = activeIndex; … if (from === to)` | `const prev = api.previousScrollSnap(); … if (prev === to) … goo.travel(prev, to)` (see §4) |
| 3 | `demo/stories/motion/deck.vue` | new `.dark` arm after L220 (`.deck-demo-stage[data-traveling] .deck-goo-layer`) | — | `.dark .deck-goo-layer { color: oklch(from var(--card) 0.68 0.05 h); filter: url(#glass-goo) saturate(1.3) brightness(1.3); }` |

**Selector discipline (binding):** plain `.dark .carousel-goo-layer` / `.dark .deck-goo-layer`
ANCESTOR selectors — NOT a scoped `:global(.dark)` (the Vue scoped `:global()` drop trap, MEMORY,
3rd recurrence) and NOT a `light-dark()` arm (the goo is not inside a shadow; the per-mode plain
pair is the house idiom). The `.dark` class survives Vue scoping because `.carousel-goo-layer` /
`.deck-goo-layer` already carry the scope attribute; the `.dark` ancestor is a plain descendant.

**What is NOT touched:**
- The light goo `color: color-mix(in oklab, var(--card), white 8%)` (L355 / L208) and the
  worm/plate domes (`white 18%` / `white 20%`) — BYTE-UNCHANGED. Every fix arm is `.dark`-scoped.
- The `#glass-goo` static `<filter>` graph (GlassGooFilter.vue): literal `stdDeviation`,
  `feColorMatrix`, sRGB, region — UNTOUCHED. The companion composes on the `filter:` shorthand.
- All motion: `--carousel-goo-flow/-duration/-max-stretch`, `--deck-goo-*`, `girthFloor`,
  `RELEASE_AT_ARRIVAL`, `useGooMorph` — UNTOUCHED. This is COLOR + TRANSMISSION + the gate harden.
- No new spring / clock / color token is minted; the recipe reads the SHIPPED `--card`.

---

## 6. Acceptance criteria

### Gestalt (the human / π verdict — THE BAR; a charcoal/taupe halo is an automatic FAIL)
- **G1** — dark goo reads as LUMINOUS WARM GLASS. On a REAL `Next.click()` in DARK mode, a
  mid-morph frame shows the two masses + neck as a GLOWING warm membrane welling across the gap,
  the dark aurora visibly glowing THROUGH them. NOT a dim / muddy / gray-brown / taupe halo.
- **G2** — the decisive blob↔meatball merge holds in BOTH modes (the Gemini reference): the neck
  wells, bridges outgoing→incoming, then pinches off. Not a hard cut, not a flat plate.
- **G3** — light mode UN-REGRESSED (L ≈ 0.97 warm-cream, the morph clock, opacity 0 at rest).
- **G4** — warm identity holds both modes (OKLab hue 55–70, NEVER gray/taupe).

### Machine / structural (the gate — see the wave's π sketch for the readback)
- **M1** — dark composited L ≥ 0.5 (carousel raw fill L 0.68 × brightness 1.3 × op 0.55 over
  page L 0.146 → 0.552; deck → 0.604). Born-RED on HEAD (≈ 0.26).
- **M2** — warm-ink VECTOR not white-neutral: the `.dark` goo `color` is `oklch(from var(--card)
  … 0.05 h)` (C 0.05 ≥ STRONG floor 0.020, H ∈ [55,70]); NO surviving `white N%` in a `.dark`
  goo-layer `color`.
- **M3** — the transmissive companion present: the `.dark` goo `filter` carries
  `saturate(1.3) brightness(1.3)` (in the W-DARK-MATERIAL band) COMPOSED WITH `url(#glass-goo)`.
- **M4** — STATIC filter, Safari-safe: `#glass-goo` `stdDeviation`/`feColorMatrix` LITERAL, sRGB,
  region -50%/200%, regular `filter:` never `backdrop-filter: url()`. `@supports not` + PRM stand.
- **M5** — light mode byte-unchanged (every fix arm `.dark`-scoped).
- **M6** — BOTH surfaces fixed (CarouselContent.vue AND deck.vue).
- **M7** — travel-gate keys off `selectedScrollSnap() !== previousScrollSnap()`, not `activeIndex`.

---

## 7. Gate impact (extend, never weaken)

`scripts/proof-no-gray.mjs` (46/46 GREEN) measures `--card`-composited PLATES; it never measured
the dark goo overlay ink — so the gray slipped through (source-green / painted-gray). EXTEND it
with a GOO-MEDIUM dark-arm witness band (born-RED on HEAD), reusing the EXISTING plumbing:
`darkClassValue(src, token)` to read the `.dark` goo `color`, `oklchOf()`/`oklabOf()` to resolve
it, `composite()` for the layer-over-page math, and `STRONG_FLOOR` / `WARM_HUE_LO/HI`. No floor is
weakened; every existing assert is unchanged. The exact asserts:

- **`goo-dark-fill-warm-ink`** — the `.dark .carousel-goo-layer` + `.dark .deck-goo-layer` `color`
  matches `/oklch\(\s*from\s+var\(--card\)/` (a `white N%` literal reds it); resolved OKLab
  C ≥ STRONG_FLOOR (0.020) at H ∈ [WARM_HUE_LO, WARM_HUE_HI], L ∈ [0.62, 0.72].
- **`goo-dark-composited-luminous`** — `composite(fillRgb, opacity, pageRgb)` after the
  `brightness` multiply readback OKLab **L ≥ 0.5**, both surfaces (carousel op 0.55, deck op 0.62,
  page = dark `--neutral-0`). Born-RED on HEAD (≈ 0.26).
- **`goo-dark-transmissive-companion`** — the `.dark` goo `filter` matches
  `/saturate\(1\.[2-3]\d?\)/` AND `/brightness\(1\.[0-3]\d?\)/` AND `/url\(#glass-goo\)/`, both
  surfaces. A flat dark fill (no companion) reds.
- **`goo-static-filter-safari`** — NO `backdrop-filter:\s*url\(` anywhere in either SFC; the
  `#glass-goo` `stdDeviation` is a literal (no `var(`).
- **`goo-light-unregressed`** — the light goo `color` lines (CarouselContent.vue:355,
  deck.vue:208) STILL read `color-mix(in oklab, var(--card), white 8%)` (byte-assert the light
  ground is untouched).
- **`goo-travel-gate-hardened`** — CarouselContent.vue `onSelect` matches
  `/previousScrollSnap\(\)/` and does NOT match `/const from = activeIndex/`.

The π arm (`tests-visual/no-gray.spec.ts`) gains the BINDING paint truth: a DARK-mode real
`Next.click()`, pin `[data-traveling]`, read the live goo worm `getComputedStyle()` mid-travel,
assert composited OKLab L ≥ 0.5 + C ≥ 0.020 + H ∈ [55,70]. The source-green / painted-gray gap
closed end-to-end.

---

## 8. a11y / PRM / Safari rules (binding)

- **PRM** — the goo layer is `display:none` under `prefers-reduced-motion: reduce` (the worm
  snaps). The `.dark` arm never paints under reduce — no new media-query interaction.
- **`@supports not (filter: url(#glass-goo))`** — the floor stands; the `.dark` arm's
  `saturate()/brightness()` are pure CSS-filter functions (no `url()`), so even on a gap engine
  the warm fill reads (the companion does not depend on the SVG graph).
- **aria** — the goo layers are `aria-hidden="true"`, `pointer-events:none`; unchanged.
- **Safari** — NEVER `backdrop-filter: url()` (WebKit 245510); NEVER var-driven `stdDeviation`
  (WebKit-broken/slow). The companion is a plain `saturate()/brightness()` appended to the
  `filter:` shorthand, Safari-native. The `#glass-goo` graph is byte-untouched.

---

## 9. Non-goals / fences (NO over-build)

- Do NOT re-open the four headline defects (Safari / slow / does-not-morph / AWFUL) — JUDGE-3
  verified RESOLVED. Fix2 is the dark-mode gestalt + the travel-gate harden ONLY.
- Do NOT regress light mode. Do NOT touch the `#glass-goo` static filter graph.
- Do NOT mint a new spring / clock / color token. Do NOT use a `white N%` mix in dark.
- Do NOT introduce `backdrop-filter: url()` or a var-driven `feGaussianBlur stdDeviation`.
- Clean break — plain `.dark .x` ancestor arm only; no `:global(.dark)` in a scoped block.

---

## Sources

- `research-root-cause.md` §1–5, `research-target.md` §0–§6, `research-mechanism.md` §0–§2,
  `JUDGE-3.md` §6–§8 (the authoritative dark-mode blocker + the concrete refinement spec).
- `design.md` §L1; CLAUDE.md §"warm-chroma floor" (BA.W-NO-GRAY) + §"luminous transmissive dark
  material" (BA.W-DARK-MATERIAL: scope-2 `saturate(1.22–1.35) brightness(1.06–1.18)`, scope-3 the
  `--glass-tint-ink` warm-cream lift).
- `src/styles/tokens/dark-arm.css:70,74,303` (dark `--foreground` L0.93 / `--card` L0.295 /
  `--glass-tint-ink-dock`); `glass-fx.css:162,176`; `src/components/ui/carousel/CarouselContent.vue`
  L355,189–202; `demo/stories/motion/deck.vue` L208,105–114; `scripts/proof-no-gray.mjs` (the
  `darkClassValue`/`oklchOf`/`composite`/`STRONG_FLOOR` plumbing).
- WebKit Bugzilla 245510 (`backdrop-filter: url()`), 283156 (per-frame re-blur), 136418
  (feGaussianBlur linearRGB lighten — use sRGB).
