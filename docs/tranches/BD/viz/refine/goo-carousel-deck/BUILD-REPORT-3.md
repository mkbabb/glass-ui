# BUILD-REPORT-3 — BD.W-GOO-CAROUSEL-DECK (iteration 3)

**VERDICT: the two JUDGE-2 BLOCKING deck fails are FIXED + the carousel merge refine is landed.**
JUDGE-2 verdicted FAIL on three concrete items: (§1) the DECK gray slab at rest — the goo layer
was `opacity: 0.5` PERMANENT with no `[data-traveling]` gate, painting a flat dead gray/taupe slab
behind every slide at rest; (§2) the DECK morph reading as a flat GRAY BOX, not a gooey warm-glass
merge — the plate/worm used flat `background: currentColor` and the goo was doing double-duty as the
slide backing; (§3) the CAROUSEL merge reading SUBTLE — a warm tray with scalloped edges, not a
decisive two-blob neck+pinch. All three are addressed. Everything JUDGE-2 confirmed-real (the de-dup,
the Safari-static filter, the DPR cap, the warm tint, the PRM carve, the blob `uMorphT`) is KEPT.

Live-verified on `http://localhost:5173` (Chromium, light + dark), real click gestures + faithful
engine-peak pins + frame-series sampling. Typecheck clean (0 new errors), siblings intact, gates
green, only the pre-existing unrelated TooltipProvider warning on console.

---

## 1. THE FIXES

### Fix #1 (BLOCKING — JUDGE-2 §1): the DECK gray slab at rest is KILLED

The deck goo layer was `opacity: 0.5` UNCONDITIONALLY. Now it mirrors the carousel exactly — a
TRANSIENT travel-only bridge gated on `[data-traveling]`, invisible at rest:

- `demo/stories/motion/deck.vue` `<style>`: `.deck-goo-layer { opacity: 0; transition: opacity
  var(--duration-fast) var(--ease-out); }` + `.deck-demo-stage[data-traveling] .deck-goo-layer {
  opacity: var(--deck-goo-layer-opacity, 0.62); }`. The gate keys off the STAGE host (where
  `markDeckTraveling()` writes the attr — the layer is a descendant), not the layer itself (the
  prior author bug that would have left it inert).
- `demo/stories/motion/deck.vue` `<script>`: added `markDeckTraveling()` (the carousel's exact timer
  pattern — set `data-traveling`, clear it `--deck-goo-duration + 120ms` after the morph fires) +
  wired it into the `deck.index` watch, with `onBeforeUnmount` clearing the timer.

**The resting backing** is the slide's OWN warm plate now (JUDGE-2 §2(a)): `.deck-demo-slide` gained
`glass-floating rounded-card` — a real warm transmissive glass card is the legible resting surface,
and the goo is ONLY a transient travel bridge above it. At rest the goo shows ZERO slab.

### Fix #2 (BLOCKING — JUDGE-2 §2): the DECK morph reads as WARM LIQUID GLASS, not a gray box

- The deck plate + worm switched off the flat `background: currentColor` onto the SAME domed-droplet
  `radial-gradient(120% 90% at 50% 18%, color-mix(in oklab, currentColor, white 20%), currentColor
  70%)` the carousel worm uses (JUDGE-2 §2(b)) — the inner catch-light reads as a domed liquid-glass
  droplet, not a flat slab.
- The goo layer rides z-index 2 ABOVE the crisp slides during travel (mirroring the carousel), so the
  warm-cream metaball neck flows OVER the outgoing→incoming slides as a bridge, never doubling as the
  backing (the slide's own `glass-floating` plate is the backing).

### Fix #3 (REFINE — JUDGE-2 §3): the CAROUSEL merge is now DECISIVELY two-mass

- `CarouselContent.vue`: the `<GlassGooFilter>` mount tuned `:blur="10" :threshold-slope="24"
  :threshold-offset="-11"` (was 7 / 20 / -9) — a FATTER blur melds the two plate fringes into a
  bigger neck, the STEEPER threshold PINCHES it off crisply (a clearer "two blobs merging into one"
  edge). STATIC literals — Safari-safe.
- `CarouselContent.vue`: `useGooMorph` `girthFloor: 0.85 → 0.74` — the neck PINCHES thinner cross-axis
  mid-stretch (a clear constriction, not a wide tray).
- `scheme-motion.css`: `--carousel-goo-max-stretch: 1.16 → 1.24` — a more decisive welling swell.

---

## 2. FILES + LINES

| # | File | Change |
|---|---|---|
| 1 | `demo/stories/motion/deck.vue` (script) | + `markDeckTraveling()` (the travel-gate timer off `--deck-goo-duration`) + `onBeforeUnmount` clear + wired into the `deck.index` watch; + `onBeforeUnmount` import |
| 2 | `demo/stories/motion/deck.vue` (template) | `.deck-demo-slide` gains `glass-floating rounded-card` (the warm resting backing) |
| 3 | `demo/stories/motion/deck.vue` (style) | `.deck-goo-layer` opacity `0.5` → `0` + `transition` + the `.deck-demo-stage[data-traveling]` gate; z-index `0` → `2`; plate + worm flat `currentColor` → the domed-droplet `radial-gradient` catch-light |
| 4 | `src/components/ui/carousel/CarouselContent.vue` | `<GlassGooFilter :blur="10" :threshold-slope="24" :threshold-offset="-11">`; `useGooMorph` `girthFloor` `0.85` → `0.74` |
| 5 | `src/styles/tokens/scheme-motion.css` | `--carousel-goo-max-stretch` `1.16` → `1.24` |

**KEPT untouched (JUDGE-2-confirmed-real):** `src/composables/motion/useGooMorph.ts` (the ONE de-duped
engine); `src/components/custom/goo-filter/GlassGooFilter.vue` (the static `#glass-goo` graph — only
the carousel's mount props change, the graph is unchanged); `PagerDots.vue` (worm consumer #1); the
goo-blob `uMorphT` + DPR cap; `.glass-pager-ring` element-level oklab tint.

---

## 3. BEFORE / AFTER (live computed values — `http://localhost:5173`)

### The DECK rest state (THE #1 blocking fail — JUDGE-2 §1)

| | BEFORE (JUDGE-2) | AFTER |
|---|---|---|
| `.deck-goo-layer` opacity at rest | **0.5 (PERMANENT)** — a flat gray slab | **0** (invisible — ZERO slab) |
| gate | none (`opacity: 0.5` unconditional) | `.deck-demo-stage[data-traveling] .deck-goo-layer` → 0.62 |
| resting backing | the goo plate did double-duty (flattened to gray) | the slide's OWN `glass-floating` plate `oklab(0.793 0.0052 0.0117 / 0.84)` blur(13px) saturate(1.6) — warm transmissive glass |

Live readback at rest (slide 1, NOT traveling): `layerTraveling: false`, `layerOpacity: "0"` (light)
/ `"0"` (dark after fade-out settle). The gray slab the user forbids is structurally gone.

### The DECK morph fill (THE #2 blocking fail — JUDGE-2 §2)

| | BEFORE | AFTER |
|---|---|---|
| plate/worm fill | flat `background: currentColor` → flat gray box | domed-droplet `radial-gradient(…, white 20% catch-light, currentColor 70%)` |
| goo mass color (light) | nominally warm but read flat-gray composited | `oklab(0.976 0.00523 0.01263)` — **chroma 0.0137, hue 67.5°** (warm amber) |
| goo mass color (dark) | — | `oklab(0.351 0.0102 0.0171)` — **chroma 0.0199, hue 59.2°** (warm luminous-dark) |
| z-index | 0 (behind, doubling as backing) | 2 (ABOVE, a transient bridge) |

### The DECK live transition (real Next click, frame-series sampled)

```
travelingFrames: 164 / 189   maxOpacity: 0.62   peakLenRatio: 1.831 @ 523ms   index advanced 2→3
```

The goo bridge fades IN (0.62) during travel, the worm necks/swells to 1.83× at the midpoint then
contracts, the layer fades OUT after settle (back to opacity 0). At rest: zero slab.

### The CAROUSEL merge (THE refine — JUDGE-2 §3)

| | BEFORE | AFTER |
|---|---|---|
| goo filter blur | `stdDeviation=7` | `stdDeviation=10` (fatter meld) — `hasVar: false` (Safari-static) |
| goo threshold | `…20 -9` | `…24 -11` (crisper pinch) |
| `girthFloor` | 0.85 | **0.74** (thinner neck) |
| `--carousel-goo-max-stretch` | 1.16 | **1.24** (more decisive swell) |
| pinned-peak | lenRatio 1.47, pinch 0.85 (subtle tray) | **lenRatio 2.22, pinch 0.74** (decisive neck) |

### CAROUSEL live transition + warm identity

```
live Next click: travelingFrames 160/160   maxOpacity 0.55   peakLenRatio 2.201 @ 145ms (FAST)
warm: light oklab(0.976 0.00523 0.01263) C 0.0137 H 67.5°  ·  dark oklab(0.351 0.0102 0.0171) C 0.0199 H 59.2°
```

Both clear BA.W-NO-GRAY (C ≥ 0.010 at warm H ∈ [45,85]) in BOTH modes — warm MATERIAL, never gray.

---

## 4. SAFARI-SAFETY (the #1 user defect — re-audited, structurally intact)

`#glass-goo` live readback (carousel mount, now blur 10):
- `feGaussianBlur stdDeviation="10"` — **LITERAL, `hasVar: false`** (the WebKit var-driven-blur broken
  class — bug 283156 — structurally absent).
- `feColorMatrix values="… 24 -11"` — **static literals, no `var()`**.
- `color-interpolation-filters="sRGB"` (WebKit linearRGB-lighten bug 136418 avoided).
- region `-50% -50% 200% 200%` (the neck never clips).
- the layer uses regular `filter: url(#glass-goo)`, NOT `backdrop-filter: url()` (WebKit 245510 avoided).
- `@supports not (filter: url(#glass-goo))` drops both deck + carousel goo layers (verified live in the
  stylesheet — the plain cross-fade floor on a gap engine).
- the ONLY per-frame writes are `transform`/`scale`/`opacity`/`--goo-t` — the consumer animates
  transforms, NEVER the filter. The blur bump is a STATIC prop, not a per-frame re-blur.

The blob DPR cap (`AV_DPR_MAX` ≤2×, JUDGE-confirmed) is untouched — the WebGL Safari-perf fix.

---

## 5. A11Y / PRM (verified live in the stylesheet)

- **DECK PRM carve:** `@media (prefers-reduced-motion: reduce) { .deck-goo-layer { display: none } }`
  PRESENT (verified live) + `useGooMorph` snaps under PRM (no rAF, no squish). `prmDeck: true`.
- **DECK @supports floor:** `@supports not (filter: url(#glass-goo)) { .deck-goo-layer { display:none } }`
  PRESENT. `supportsDeck: true`.
- **DECK travel gate:** `.deck-demo-stage[data-traveling] .deck-goo-layer` PRESENT. `travelGate: true`.
- **CAROUSEL** keeps its existing PRM + @supports + travel gates (untouched).
- **aria:** both goo layers `aria-hidden="true"` + `pointer-events: none` (decorative); the crisp
  content (deck slides z-1 / embla track z-1) owns content + the aria-live "Slide N of M" announcer /
  embla `aria-roledescription`. The goo-morph adds ZERO aria surface.
- **AA contrast:** the slide text rides the un-filtered crisp slide above the translucent bridge; text
  never passes the goo threshold. The deck slide's own `glass-floating` warm plate is the legible
  backing (verified `oklab(0.793 …/ 0.84)` light + the violet title + body legible in both modes).
- inactive deck slides are `opacity: 0` (only the active slide shows its plate — verified live).

---

## 6. GATES + TYPECHECK

- `npx vue-tsc --noEmit -p tsconfig.json` → **0 errors** (no new TS errors).
- `node scripts/verify-siblings-intact.mjs --quiet` → **exit 0** (siblings OK; no `~/Programming` touch).
- `node scripts/proof-no-layout-animation.mjs` → **LOCKED** (0 layout-property animations; the deck
  plate/worm + carousel changes are transform/opacity/scale/filter only).
- `node scripts/proof-no-gray.mjs` → **green** (the warm-chroma floor holds).
- `node scripts/proof-carousel-glass-atoms.mjs` → **PASS**.
- `node scripts/proof-deck.mjs` → **PASS**.
- `node scripts/proof-pager-ring.mjs` → **PASS**.
- Console: only the pre-existing unrelated TooltipProvider `<Transition>` non-element-root warning
  (JUDGE-2 §6 already noted it); 0 goo-related errors during any real transition.

---

## 7. SCREENSHOTS (`docs/tranches/BD/viz/refine/goo-carousel-deck/`)

- `v3-deck-rest-light.png` / `v3-deck-rest-light-centered.png` — the DECK at REST, light: the warm
  `glass-floating` slide plate, **NO gray slab** (the goo invisible at opacity 0).
- `v3-deck-rest-dark.png` — the DECK at REST, dark: warm luminous-dark glass plate, no charcoal slab.
- `v3-deck-peak-light.png` / `v3-deck-peak-dark.png` — the DECK morph at peak: the warm-cream (light)
  / warm luminous-dark (dark) domed-droplet metaball bridge welling a neck — warm liquid glass, not a
  gray box.
- `v3-deck-live-transition.png` — a real Next click (the fast settle).
- `v3-carousel-peak-light.png` / `v3-carousel-peak-light-final.png` / `v3-carousel-peak-dark.png` —
  the CAROUSEL two-mass merge at peak (lenRatio 2.22, pinch 0.74): two distinct warm-cream glass
  bodies welling a decisively-pinched NECK across the gap, lensing the colorful slides behind — the
  Gemini blob↔meatball read, both modes.

---

## 8. THE BAR

| JUDGE-2 ask | status |
|---|---|
| §1 DECK gray slab at rest KILLED (gate the goo layer on travel) | **FIXED** — rest opacity 0, the slide's own warm glass plate is the backing |
| §2 DECK morph reads as WARM LIQUID GLASS not a gray box | **FIXED** — domed-droplet catch-light fill, warm OKLab C 0.0137/0.0199, transient bridge above the slide |
| §3 CAROUSEL merge MORE DRAMATIC | **FIXED** — blur 10 / threshold 24/-11, girthFloor 0.74, max-stretch 1.24 → lenRatio 2.22, pinch 0.74 |
| §4 re-capture deck at rest (no slab) + peak (warm gooey) in light + dark | **DONE** — all four binding captures above |
| Safari-static filter | **intact** — all literals, sRGB, regular `filter:`, @supports floor |
| warm not gray (BA.W-NO-GRAY) | **holds** — both surfaces, both modes, C ≥ 0.010 at warm H |
| compositor-only / PRM-carved / a11y | **holds** — no-layout-animation LOCKED, PRM display:none, aria-hidden decorative |
