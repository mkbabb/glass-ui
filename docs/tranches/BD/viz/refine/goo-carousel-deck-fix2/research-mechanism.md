# RESEARCH-3 — the FIX MECHANISM (glass-ui internals, no re-fork, no-dual-path)

The EXACT tokens/recipes to retune so the goo-carousel/deck reads warm-cream luminous
liquid glass (not gray) AND carries inertia/weight/bounce — composing existing
primitives only, extending (never breaking) `proof:no-gray`.

BINDING north star: the iOS-27 six-layer optical composite + glass+PAPER morphism +
the BA.W-NO-GRAY warm-chroma floor + the [[feedback-liquid-weight-universal]] law.

---

## 0. The two defect families, root-caused

### GRAY-GLASS — the goo silhouette paints near-gray, both consumers

The carousel worm/plate (`CarouselContent.vue`) AND the deck worm/plate (`deck.vue`)
both ink the goo masses off ONE recipe:

```css
/* .carousel-goo-layer / .deck-goo-layer */
color: color-mix(in oklab, var(--card), white 8%);
```

and each mass body fills with a radial inner catch-light that lifts that ink AGAIN
toward white:

```css
/* .carousel-goo-plate / -worm / .deck-goo-plate / -worm */
background: radial-gradient(120% 90% at 50% 18%,
    color-mix(in oklab, currentColor, white 18%),   /* +18% white at the dome */
    currentColor 70%);
```

**Measured (the gate's own OKLab plumbing, `/tmp/chroma-probe.mjs`):**

| Surface | OKLab | Read |
|---|---|---|
| `--card` light `hsl(30 85% 96%)` | L 0.974 · **C 0.0147** · H 70.9° | warm, gamut-thin at L97 |
| goo ink `mix(--card, white 8%)` | L 0.976 · **C 0.0135** · H 70.9° | white-lift DILUTES C |
| worm dome `+white 18%` | L 0.980 · **C 0.0111** · H 70.9° | at L98 reads near-gray |
| dark goo ink `mix(--card, white 8%)` | L 0.351 · C 0.0198 · H 57.8° | (dark arm OK-ish) |

The light goo masses sit at **L 0.976–0.980 with C 0.011–0.0135** — that is BELOW the
WARM_PLATE_FLOOR (0.01) only at the dome but, critically, the chroma is decaying in the
WRONG direction: `white 8%` is a LIGHTENER, and a lightener over an already near-white
warm-cream plate is the exact W52-fixed "wrong direction" (a warm material concentrates
light by SATURATING, not by washing to white — apple-glass §4). At L 0.98 with C 0.011
the eye reads a pale GRAY droplet, not a warm-cream one. This is the user's gray-glass.

The gray is NOT in `--card` (the gate's `card-carries-warm-bias`/`floating-plate-warm`
asserts already hold at C 0.0124–0.0147). The gray is minted by the consumer-side
`white 8%`/`white 18%` lifts in the goo recipes — a per-surface dilution the no-gray
gate never measured (it measures `--card` plates over the page, never the goo overlay
ink). So the gate is GREEN while the goo paints gray: the exact source-green /
visually-broken close-class BA exists to fix.

### MOTION — the weight is already specced; the gaps are the SETTLE-clock + the rest-floor

The goo-morph engine (`useGooMorph.ts`) + its flow curves
(`--carousel-goo-flow`/`--deck-goo-flow`, scheme-motion.css) ALREADY carry the dwell +
the terminal overshoot (the bounce) + the squish (the swell). The motion mechanism is
sound. The two remaining weight gaps:

1. The **release-at-arrival** is a flat `RELEASE_AT_ARRIVAL = 0.82` constant in JS, NOT
   a token — the squish-release timing cannot be retuned per-consumer (a deck slide
   wants a LATER release than a card plate).
2. The carousel `girthFloor` is **0.74** in the SFC (a thin pinch) while the engine
   default is 0.72 and the deck is 0.85 — the carousel necks THINNER than the comment
   claims ("two distinct blobs welling a neck"), reading as taffy at plate scale.

These are tuning, not architecture. The values below.

---

## 1. GRAY-GLASS FIX — the token + recipe changes (compose, never re-fork)

### The mechanism: a NAMED warm-cream goo-ink token, saturate-not-lighten

Mint ONE library token (the goo medium's warm-cream ink) so both consumers read it and
a future retune reaches both from one edit. Place it beside the §8 glass-fx tint seam
(`tokens/glass-fx.css`, the `--glass-tint-*` neighborhood — same cascade context):

```css
/* tokens/glass-fx.css :root — the GOO MEDIUM ink (BD.W-GOO-…-FIX2).
   The warm-cream liquid-glass goo body. NOT a white-lift off --card (a lightener over
   a near-white plate washes the warm chroma to gray — the W52 wrong-direction); it
   SATURATES --card's own warm hue/chroma via oklch(from …) (the BB.W-DARK-INK-WARM
   idiom — the in-house relative-color recipe), lifting C off the gamut-thin floor while
   holding L so the goo reads warm-cream LUMINOUS, never pale-gray. */
--glass-goo-ink: oklch(from var(--card) l 0.05 h);
```

`oklch(from var(--card) l 0.05 h)` keeps `--card`'s L (≈0.974) and warm H (≈70.9°) and
PINS the chroma to 0.05 — ~3.4× the current 0.0147, well clear of the WARM_PLATE_FLOOR,
in the warm register. This is the SAME `oklch(from …)` mechanism already live in the
dark `--surface-tint-*` arm and the `--glass-tint-ink-dock` keystone (no new mechanism).

Dark arm (`tokens/dark-arm.css .dark`) — the §2c per-mode pair, a luminous lift:

```css
/* dark goo ink — the luminous-dark mirror: lift L for the glow, hold the warm chroma. */
--glass-goo-ink: oklch(from var(--card) 0.42 0.06 h);
```

### The consumer recipe re-points (carousel + deck, file-line-disjoint)

Both layers replace the white-lift ink with the token. **GRAY-GLASS root-cut #1:**

```css
/* .carousel-goo-layer  AND  .deck-goo-layer */
- color: color-mix(in oklab, var(--card), white 8%);
+ color: var(--glass-goo-ink);
```

The dome inner catch-light keeps a catch-light (the iOS-27 inner-catch-light layer is
load-bearing — JUDGE-2 §2(b)) but lifts a SMALLER, BOUNDED amount so the dome stays
warm. **GRAY-GLASS root-cut #2** — drop the dome lift 18% → 10% and tag it as a
catch-light, not a wash:

```css
/* .carousel-goo-plate / -worm / .deck-goo-plate / -worm */
background: radial-gradient(120% 90% at 50% 18%,
-   color-mix(in oklab, currentColor, white 18%),
+   color-mix(in oklab, currentColor, white 10%),   /* a catch-light, not a wash */
    currentColor 70%);
```

At `--glass-goo-ink` C 0.05, even +10% white lands the dome at C ≈ 0.040 (warm-cream
luminous, not gray) — the inner catch-light reads as a domed droplet AND the body stays
warm material end-to-end.

### Why this is the SIX-LAYER composite, not a flat fill

The goo mass now carries: (1) the warm-cream body (`--glass-goo-ink`, saturated), (2)
the inner catch-light (the bounded dome lift), (3) the layer-opacity translucency
(`--carousel-goo-layer-opacity` 0.55 / `--deck-goo-layer-opacity` 0.62 — the backdrop
reads through), (4) the SVG goo filter's blur→threshold edge (the metaball rim), (5) the
drop the layer composites over the crisp slides, (6) the glass grain inherited on the
page beneath. The white-lift fix touches ONLY layer (1)+(2)'s chroma — the other four
are untouched.

---

## 2. The GATE IMPACT — extend `proof:no-gray`, never weaken it

The current gate (46/46 GREEN) measures `--card`-composited PLATES over the page; it
does NOT measure the goo overlay ink. So the gray slipped through. **Extend the gate
with a new witness band** (the goo-ink arm) — born-RED on HEAD (the white-lift ink),
GREEN after the fix:

```js
// scripts/proof-no-gray.mjs — BD.W-…-FIX2: the GOO-MEDIUM warm-ink arm.
// The goo silhouette (carousel + deck worm/plate) inks off --glass-goo-ink, NOT a
// white-lift off --card. Assert: (a) --glass-goo-ink is the oklch(from var(--card) …)
// relative-color form (a renamed white-lift literal cannot evade), (b) its resolved
// OKLab C ≥ WARM_PLATE_FLOOR at the warm hue, both modes, (c) the consumer recipes
// read the token (no surviving `color-mix(in oklab, var(--card), white …)` goo ink),
// (d) the dome lift ≤ 10% (a bounded catch-light, never a >15% wash).
```

Concretely, add to the gate:

- `goo-ink-is-relative-color` — `/--glass-goo-ink:\s*oklch\(\s*from\s+var\(--card\)/`
  matches in BOTH `glass-fx.css` (light) and `dark-arm.css` (dark). A white-lift
  `color-mix` form reds it.
- `goo-ink-warm-light` / `goo-ink-warm-dark` — model the recipe with the gate's existing
  `relativeOklchFrom()` helper (it already parses `oklch(from var(--foreground) <L> c h)`;
  generalize the source token to `--card`): resolved C ≥ `WARM_PLATE_FLOOR` (0.01) at
  H ∈ [45,85]°.
- `goo-consumers-read-token` — grep `CarouselContent.vue` + `deck.vue`: NO surviving
  `color-mix(in oklab, var(--card), white` in a `.…goo-layer { color: … }`, AND each
  reads `color: var(--glass-goo-ink)`.
- `goo-dome-lift-bounded` — the dome `color-mix(…, white N%)` N ≤ 10 in both SFCs.

This is a STRICT extension: every existing assert (the 46 checks + the floors
STRONG/CHIP/PLATE/WARM_PLATE_FLOOR + WARM_HUE_LO/HI) is UNCHANGED — the new arm reuses
the SAME floors + the SAME OKLab plumbing + the SAME `relativeOklchFrom` model. No floor
is weakened. The π arm (`tests-visual/no-gray.spec.ts`) gains the binding paint truth: a
new fixture reads the live goo plate `getComputedStyle().backgroundColor` (mid-travel,
`[data-traveling]`) and asserts C ≥ floor — the source-green/painted-gray gap closed.

---

## 3. MOTION FIX — the spring/clock/scale tokens (compose existing primitives)

The flow curves + dwell + overshoot are CORRECT and stay byte-identical. Two retunes:

### 3a. The release-at-arrival becomes a per-consumer token

`useGooMorph.travel()` hardcodes `RELEASE_AT_ARRIVAL = 0.82`. Promote it to a token read
off the same `tokenPrefix` seam the engine already uses (`--{prefix}-flow`/`-duration`/
`-max-stretch`):

```ts
// useGooMorph.ts — read --{prefix}-release (fraction of clock) off the host, default 0.82.
const releaseAt = Number(getComputedStyle(host).getPropertyValue(
    `--${tokenPrefix}-release`).trim()) || 0.82;
...
releaseTimer = setTimeout(() => { ... }, durMs * releaseAt);
```

```css
/* scheme-motion.css — the per-consumer release fraction (the squish-shrink punctuates
   the LAND; a full-viewport deck slide releases LATER than a card plate so the swell
   holds across the bigger travel). */
--carousel-goo-release: 0.82;   /* the card-plate land */
--deck-goo-release: 0.9;        /* the deck holds the swell longer — the heavier slide */
```

This is the [[feedback-liquid-weight-universal]] "weight on ALL motion" applied: the
release clock now tracks the consumer's mass. Default 0.82 = byte-identical to today (no
regression); the token only lets the deck hold longer.

### 3b. The carousel girth floor lands at the engine register, not a thinner one-off

`CarouselContent.vue` passes `girthFloor: 0.74` (the comment says "two distinct blobs
welling a neck and pinching" but 0.74 necks THINNER than the engine default 0.72 deck-vs
0.85). Raise to **0.80** — the plate necks to a SUBSTANTIAL mass (a wide card-plate at
0.74 reads as a hairline thread the goo filter must over-bridge; 0.80 keeps liquid mass
mid-stretch). The deck stays 0.85 (the biggest mass, the gentlest neck). No engine
change — it is the existing `girthFloor` param.

### 3c. (verify-only, no change) the flow/duration/max-stretch already carry the weight

- `--carousel-goo-flow`: dwells to ~0.52 by 50%, terminal +1.5% overshoot (the snappy
  LAND) — the bounce. `--carousel-goo-duration: 0.95s`, `--carousel-goo-max-stretch:
  1.24` (the welling neck). KEEP.
- `--deck-goo-flow`: same dwell, NO overshoot (the vestibular floor — a full-viewport
  slide must not bounce). `--deck-goo-duration: 1.1s`, `--deck-goo-max-stretch: 1.1`
  (the gentlest swell). KEEP.
- The squish rides `useLiquidFlex` ("linear" law, cap off `--{prefix}-max-stretch`) — the
  SegmentedTabs indicator register, ONE shared engine. KEEP.

No new spring preset (the no-new-spring fence: all curves resolve `--spring-*`-derived
`linear()` dwell shapes). No SpringProgress/keyframes import. PRM-carved (the engine
early-returns to `snap()`; the goo layer is `display:none` under reduce). Safari-safe
(the goo filter is the regular `filter: url(#glass-goo)` graph; `@supports not (filter:
url(#x))` drops to cross-fade).

---

## 4. Exact change manifest (the compose-only fix surface)

| # | File | Change | Defect |
|---|---|---|---|
| 1 | `src/styles/tokens/glass-fx.css` | mint `--glass-goo-ink: oklch(from var(--card) l 0.05 h)` (beside the tint seam) | GRAY |
| 2 | `src/styles/tokens/dark-arm.css` | dark `--glass-goo-ink: oklch(from var(--card) 0.42 0.06 h)` (§2c pair) | GRAY |
| 3 | `CarouselContent.vue` | `.carousel-goo-layer` color → `var(--glass-goo-ink)`; dome `white 18%`→`10%`; `girthFloor` 0.74→0.80 | GRAY+MOTION |
| 4 | `demo/stories/motion/deck.vue` | `.deck-goo-layer` color → `var(--glass-goo-ink)`; dome `white 20%`→`10%` | GRAY |
| 5 | `src/composables/motion/useGooMorph.ts` | read `--{prefix}-release` (default 0.82) for the release timer | MOTION |
| 6 | `src/styles/tokens/scheme-motion.css` | `--carousel-goo-release: 0.82` / `--deck-goo-release: 0.9` | MOTION |
| 7 | `scripts/proof-no-gray.mjs` | the GOO-MEDIUM warm-ink witness band (§2) — extend, never weaken | GATE |
| 8 | `tests-visual/no-gray.spec.ts` | the live goo-plate π readback fixture (the binding truth) | GATE |

Note: the deck dome is `white 20%` (deck.vue lines 237, 254) vs carousel's `white 18%` —
both drop to `white 10%`.

### What is NOT touched (the no-dual-path / no-overfit fence)

- The §8 glass ladder (`--glass-opacity-*`/`--glass-blur-*`/`--glass-saturate-*`/
  `--glass-bg-*`) — UNTOUCHED. The goo is a SEPARATE overlay medium, not a glass rung.
- The `--glass-tint-*` adaptive seam (W55) + the `--glass-level` recipe (W54) — UNTOUCHED.
- The `--glass-tint-ink-dock` keystone (BD.W-DOCK-CORE) — UNTOUCHED (disjoint surface).
- The KEEP-NEUTRAL registers (`--warning-foreground`, `--overlay-scrim-ink`) — UNTOUCHED.
- The `--surface-tint-*` in-srgb fence (AW.W26) — UNTOUCHED; `--glass-goo-ink`'s
  `oklch(from …)` is an INK SOURCE (a complete color), NOT a mix-space switch.
- Every spring `linear()` curve + per-spring duration clock — UNTOUCHED.

---

## 5. Why this is gestalt, not a patch

The single systemic cause across BOTH gray-glass consumers is ONE wrong recipe (white-lift
off a near-white plate). The fix is ONE named token + a relative-color saturate (the
in-house idiom), retiring the white-lift at both sites — a single-family fix mirroring
exactly how BA.W-NO-GRAY re-saturated the `--neutral-*` ladder (token-first, zero
per-site hardcode). The gate extends along its own grain (the same floors, plumbing,
`relativeOklchFrom` model). The motion fix promotes two hardcoded constants into the
engine's EXISTING per-consumer token seam — no new machinery. Compose-only,
compositor-only, PRM-carved, Safari-compatible, no legacy.
