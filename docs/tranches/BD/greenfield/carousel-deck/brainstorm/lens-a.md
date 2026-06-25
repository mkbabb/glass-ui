# Carousel · Deck · Pager-dots — GREENFIELD lens-a (PURE iOS-27 FIDELITY / DE-DUP ARCHITECTURE)

> The SHELLS + the transitions + the dot indicator, designed from first principles through
> the **canonical iOS-27 Liquid-Glass** lens — then deftly UNIONED with the shipped
> `useGooMorph`, the goo-morph **BARBELL-NECK** amendment (`../../goo-morph/WAVE-AMENDMENT.md`),
> the `useDeck` headless core, and `<PagerDots>`. This lens does NOT re-fork the goo engine.
> Its job is the question the brief puts FIRST: **are carousel + deck genuinely ONE substrate
> or two?** — answered rigorously — plus the iOS-27 *feel* of the transition (glassy ·
> distortion · inertia) and the pager-dot worm. Sibling lenses cover perf (lens-b) and the
> cartoon-punch register (lens-c); this lens owns the ARCHITECTURE + the canonical-fidelity bar.
>
> North star: `design.md` (§L1 six-layer glass · §L2 spring · §L4 cartoon weight · §L7
> cross-engine) + `IOS27-REFERENCE.md` T5/T13 + the goo-morph `GOLDEN.md` barbell + the
> `feedback-liquid-weight-universal` edict. Live-verified on `/navigation/carousel` (real
> Next-click) + `/motion/deck`. KISS · DRY · NO LEGACY.

---

## 0. WHAT I LIVE-VERIFIED (real painted pixels — `localhost:5173`, real Next-click / page-advance)

A real `.click()` on the carousel Next + a real deck page change, each with a tight rAF
frame-series reading the LIVE computed transform off the painted worm — Chromium, light mode.
Reproduced, not asserted (artefact: `live-carousel-current.png`).

| probe | reading | verdict |
|---|---|---|
| **three consumers share ONE `useGooMorph`** | live DOM carries `.carousel-goo-layer` + `.deck-goo-layer` + `.pager-goo-layer` at once; each calls `useGooMorph` | the goo-ENGINE de-dup is **REAL and FIT** — keep it |
| carousel Next worm peak | **scaleX 1.205 @ 425 ms**, minScaleY **0.911** (uniform pinch) | a near-translate; NO waist — one convex slab, `hasLocalMinimum=false` |
| carousel `restSize()` | `slideStep·0.82` (≈ a full slide wide) | the worm rests AS WIDE AS A SLIDE → necking one gap barely moves `len/W` → the "warm tray" |
| carousel goo layer opacity | pinned FLAT `0.55` across the whole 1.4 s window (motion settles ~600 ms) | a DEAD-SLAB dwell (timer-driven `markTraveling`, not neck-driven) |
| carousel rest fill (dark) | `oklch(0.68 0.05 59°)` + `saturate(1.3) brightness(1.3)` | fix2 landed — warm-cream both modes, no gray halo at rest |
| **deck goo lives in the DEMO, not the library** | `.deck-goo-layer` + `.deck-goo-plate` + `.deck-goo-worm` are authored in `demo/stories/motion/deck.vue`, hand-wired | **the de-dup gap**: the deck has NO library transition primitive — it re-hand-rolls one |
| deck transition | slides cross-fade on `--spring-deck` (`= --spring-smooth`, 0.45 s) + a demo-local goo worm at a virtual-slot model | two surfaces stacked at `inset:0`, opacity-swapped + a neck |
| `--carousel-goo-flow` | **EMPTY** → falls through to `--pager-worm-flow` | the carousel never got its OWN flow token; runs the dot's 1.8 s curve clamped to 0.95 s |

**The load-bearing truth this lens names:** the goo *engine* (`useGooMorph`) is de-duped and fit,
but the **SHELLS are NOT** — the carousel ships a real library transition primitive
(`CarouselContent.vue`), while the deck **re-hand-rolls** the same goo wiring in a DEMO. The
de-dup the brief asks about is HALF DONE: the engine is shared, the *substrate composition* is not.

---

## 1. C2 — ARE CAROUSEL + DECK THE SAME THING? (the de-dup verdict, refined)

**The prior answer** (brief): "DISTINCT surfaces [embla drag-scroll vs keyboard-paged deck]
sharing the goo-morph substrate." **I CONFIRM the distinctness AND REFINE the de-dup boundary** —
there are THREE separable layers, and the current code de-dups only the deepest one:

```
┌─ LAYER 3 · INPUT/STATE  ── embla (drag-scroll, momentum, snap)  │ useDeck (index, keyboard, aria-live)
│                             ▲ GENUINELY DISTINCT — do NOT unify  │ ▲ a content scroller ≠ a presentation pager
├─ LAYER 2 · SHELL/TRANSITION ── CarouselContent.vue (lib)         │ deck.vue demo (hand-rolled) ◄── THE GAP
│                                ▼ the goo wiring is DUPLICATED, not shared
├─ LAYER 1 · SUBSTRATE ── useGooMorph (ONE engine) ✓ ── GlassGooFilter ✓ ── PagerDots ✓
```

**Verdict: they are NOT the same thing, and they should NOT become one component — but they
share TWO substrates, and today only one of those is actually de-duped.** A carousel is a
**content scroller** (you drag, neighbours peek, momentum carries — Layer 3 is embla, an
observer of the user's finger). A deck is a **presentation pager** (you page discretely by
key/click, one surface at a time, an aria-live step announcer — Layer 3 is `useDeck`, a driver
of route-like state). Forcing them into one component would either bolt embla onto the deck
(dead weight — a keynote does not drag-peek) or strip the deck's keyboard/aria register onto the
carousel (a content scroller is not a `role="group"` slideshow). **Distinct at Layer 3 — correct,
and the brief's "should a carousel use a DECK?" is a NO** (their input registers are mutually wrong
for each other).

**But Layer 2 (the SHELL/transition) is the genuine de-dup target the current code MISSED.** Both
the carousel slide-change and the deck page-change are *the same gesture*: a bounded index moves
`from`→`to`, and a glassy goo transition should bridge them. The carousel ships this as a library
component; the deck **re-implements the identical goo plumbing in a demo file**. That is the
duplication — not the engine (shared), but the *composition that drives the engine off an index
change*.

### THE BOLD MOVE — extract `useSlideTransition` (the ONE Layer-2 substrate both shells compose)

A single headless composable — `useSlideTransition` — that owns the **index→glassy-transition**
contract, consumed by BOTH the carousel (driven by embla `select`/`scroll`) and the deck (driven
by `useDeck.onChange`). It composes the existing `useGooMorph` (barbell) + the lens-refraction
distortion (§2b) + the inertial flow curve, and exposes ONE surface:

```ts
// src/composables/motion/useSlideTransition.ts — the Layer-2 de-dup.
// NOT a new engine — a COMPOSITION of useGooMorph (barbell) + the §2b lens + the flow token.
// ONE driver contract; two callers (carousel embla-driven, deck index-driven).
export function useSlideTransition(opts: {
  tokenPrefix: "carousel" | "deck";          // each reads its OWN flow/weight/refraction tokens
  vertical: Ref<boolean>;
  centerOf: (i: number) => number | null;    // the per-consumer geometry oracle (kept)
  restSize: () => number;                     // barbell bead = step/φ (the amendment value)
  refs: { bodyARef; bodyBRef; neckRef; lensRef };  // the barbell 3-ref + the §2b lens layer
}): {
  travel(from: number, to: number): void;     // discrete page/Next (deck + carousel arrow)
  drive(fractionalIndex: number): void;        // the live drag (carousel scroll only)
  snap(index: number): void;
};
```

The carousel binds `travel` to embla `select` + `drive` to `scroll`; the deck binds `travel` to
`useDeck.onChange` (it has no `drive` — no drag). **The deck demo stops hand-rolling the goo
layer**; it composes `useSlideTransition` exactly as the carousel does. Net: the Layer-2
duplication is deleted, the deck inherits the barbell + the distortion + the inertia FOR FREE, and
the *distinctness* lives exactly where it belongs (Layer 3). The de-dup done RIGHT: unify the shell
substrate, keep the input surfaces distinct. KISS, DRY, no third path.

> **Why this is the bold move and not a bolt-on:** the brief floats "should a carousel use a
> DECK?" — the honest answer is the inverse: neither should *contain* the other; both should
> compose ONE transition substrate they currently duplicate. The de-dup is at Layer 2, and it is
> a NET-NEGATIVE-LOC extraction (the deck's ~120 lines of hand-rolled goo plumbing collapse into
> `useSlideTransition(... "deck")`).

---

## 2. C3 — GLASSY · DISTORTION · INERTIA (the iOS-27 transition feel, from first principles)

The user's three words map to three precise mechanisms. The current transition fails all three
(a flat 1.2× slab fade); the canonical iOS-27 read demands them together.

### (a) GLASSY — warm transmissive, §3 field-aware (the two root causes)

The transition layer must be a **warm transmissive lens**, never a gray slab. Two root causes:
1. **The carousel is fit** (`oklch(0.68 0.05 59°)` warm-cream, fix2) — KEEP verbatim.
2. **The deck slide panel resolves near-GRAY** (`glass-floating` → a flat translucent taupe,
   chroma ≈ 0.013). When the deck adopts `useSlideTransition`, the goo bodies + the bed inherit
   the carousel's warm-cream + the `.dark` luminous arm. The §3 fix: the goo bodies are
   *transmissive* — the colorful field reads THROUGH the welling neck (the amendment's R5
   transmission probe), and the SLIDE itself sits over a warm `glass-floating` plate with a
   non-zero `--glass-accent` (the motion-violet band rim) so the §3 "colorful field behind glass
   + a defined edge" reads. **Transmitted, never a halo** — the goo is a sibling layer, never an
   ancestor of the glass (the §L7 ancestor-filter trap).

### (b) DISTORTION — the goo BENDS the content (the headline DEMAND, currently absent)

The current goo is a silhouette OVER the content — it merges two opaque masses but **does not
bend the slide pixels**. iOS-27's signature is *content refracting through a moving glass lens*.
The bold mechanism: a **lens-refraction layer** rides WITH the worm/neck — a Chromium
`backdrop-filter: url(#slide-refract)` displacement-map that bows the slide content at the neck
waist (the content visibly pinches through the throat), with a plain-blur WebKit fallback
(`@supports (backdrop-filter: url(#…))`-gated — the sanctioned `glass-refract` precedent, §L7).
The displacement amplitude is keyed to the neck `--goo-len-ratio`, so the distortion PEAKS at the
midpoint (where the throat is thinnest) and zeroes at rest. This is the "more DISTORTION" the
user names — not a stronger blur, but the content genuinely *bending* as the glass lens passes
over it. PRM → no displacement (instant). Safari → a calm blur-settle (the refraction is the
Chromium-only enhancement, the floor is honest).

### (c) INERTIA — the Band-0 liquid-weight (morph-MORE-on-move, the cartoon punch)

The current carousel runs the DOT's 1.8 s flow clamped to 0.95 s (`--carousel-goo-flow` is
EMPTY) — a wrong, draggy cadence. The fix is the amendment's per-consumer tokens PLUS the
liquid-weight law:
- **The carousel gets its OWN `--carousel-goo-flow`** — a `--spring-*`-derived `linear()` with a
  real dwell at the midpoint (the neck held open) and a `--ease-cartoon-punch` anticipation
  pre-dip on the worm bud (the §L4 anticipation principle).
- **`--goo-weight` per consumer** (the amendment's value): carousel **1.0** (the Next is a DRIVER —
  the user touched a pixel — so it earns the full cartoon weight), deck **0.4** (the vestibular
  floor — a full-viewport page-flip with overshoot is nauseating; T13's calm-overdamped law).
- **CRITICAL nuance vs the brief's "more on move":** the carousel's *drag* (`drive`) stays
  calm-overdamped on the CONTENT snap (T13 — an over-springy content carousel reads cheap), but
  the *Next-arrow* (`travel`) carries the full punch. **Driver-vs-observer**, the §L2/§L4 rule:
  the finger-drag is an observer-snap (calm), the explicit Next is a driver (punchy). This is the
  one place "liquid-weight universal" must be READ correctly — universal on DRIVERS, not on the
  content-snap of a drag.
- **Morph-more-on-move**: the worm swells MORE the faster the gap is crossed (`useLiquidFlex`
  velocity-coupled squish, already in the engine) — a multi-slide jump necks wider than a single
  step. The inertia is *in the curve*, not a longer duration.

---

## 3. THE PAGER-DOTS WORM (does the indicator goo-morph between states?)

**Live-verified: YES it does** — `.pager-goo-layer` carries N opaque `.goo-dot` pips + ONE
`.goo-worm` capsule under a static `#pager-goo` SVG filter; the worm `travel()`s on `--goo-t`, its
blurred fringe bridging each passed dot into a metaball neck. The Google-deck worm feel is PRESENT
at dot scale (the engine necks beautifully when the rest body is SMALL — a multi-dot travel necks
several × at 13 px rest). **This is the fit register the carousel/deck should emulate, not replace.**

**The refinement (rides the barbell amendment's pager migration):** the single worm → a true
two-bead BARBELL (head + lead pip pair necking) so the dot-morph reads as two bodies welling a
concave waist, byte-consistent with the carousel/deck barbell — ONE topology across all three
consumers. The worm's BIG/SLOW magnitude (1.8 s dwell, `--pager-worm-max-stretch 1.45`) is already
tuned; KEEP it. **Safari-safe**: the static `#pager-goo` filter is byte-unchanged
(`color-interpolation-filters="sRGB"`, no `backdrop-filter:url`, `@supports`/PRM floors present —
verified in source). The §L7 contract HOLDS.

**The one gestalt addition (canonical-fidelity):** on commit, a one-shot `--pager-accent-flood`
plus-lighter wash off the active dot's `--glass-accent` (the T4 accent-flood precedent) trailing
the worm settle — a momentary technicolor punctuation that clears (EFFECTS trails SPATIAL). PRM-static.

---

## 4. CROSS-ENGINE + A11Y (the §L7 + §L5 carve)

- **Goo (all three consumers)**: static inline-SVG `filter: url()` over a frozen layer whose
  children move on `transform` (the §L7 sanctioned mechanism); `color-interpolation-filters="sRGB"`;
  `@supports not (filter: url())` → plain cross-fade floor; PRM → instant snap, `display:none` goo.
- **Lens-refraction (§2b)**: the ONLY `backdrop-filter: url()` use, `@supports`-GATED Chromium-only,
  plain-blur WebKit fallback (the sanctioned `glass-refract` exception) — never un-gated, never a
  steady-state loop (one-shot per transition, the paint-cost fence).
- **A11y**: the goo/lens layers are `aria-hidden` + `pointer-events:none` (PRESENTATIONAL); the
  carousel's embla focus + the deck's `role="group"`/`aria-current` + `aria-live` "Slide N of M"
  + PagerDots' `role="tablist"`/`tab` interaction layer are BYTE-UNTOUCHED. PRM → fade-only, no
  squish, no displacement, no neck frames. `prefers-reduced-transparency` → the goo layer drops to
  the solid floor.
- **Perf (defer to lens-b, but named)**: the goo/lens layers `contain: layout paint` +
  `will-change: transform` + park-when-idle (no `data-traveling` → the layer is `opacity:0`, the
  filter region tight-boxed). The displacement map is computed once (static SVG), not per-frame.

---

## 5. DELTA-ASSAY — the wave amendment (reconciled vs the 116-wave set; no dup vs goo-morph)

| disposition | wave | action |
|---|---|---|
| **NEW** | `BD.W-SLIDE-TRANSITION-SUBSTRATE` | extract `useSlideTransition` (the Layer-2 de-dup) composing `useGooMorph` (barbell) + the §2b lens + the per-consumer flow/weight tokens; the carousel + deck BOTH compose it; the deck demo stops hand-rolling goo. NET-NEGATIVE LOC. |
| **NEW** | `BD.W-SLIDE-LENS-DISTORT` | the lens-refraction displacement layer (§2b) — Chromium `backdrop-filter:url(#slide-refract)` keyed to `--goo-len-ratio`, `@supports`-gated, WebKit blur-floor. The "more DISTORTION" ask. |
| **DEPEND** | `BD.W-GOO-BARBELL-NECK` | the barbell topology + the 3-ref `useGooMorph` projection + the concave throat — `useSlideTransition` composes it verbatim (no re-fork). |
| **DEPEND** | `BD.W-MOTION-WEIGHT` / `BD.W-CARTOON-PUNCH` | `--goo-weight` (carousel 1.0 / deck 0.4) + `--ease-cartoon-punch` anticipation; the driver-vs-observer carve (drag calm, Next punchy). |
| **DEPEND** | `BD.W-DECK-KEYNOTE` (Band 7) | the deck's §3 warm-glass cards + `--glass-accent` rim land there; `useSlideTransition` supplies the deck slide bridge that keynote wave references. |
| **SUPERSEDE** | `W-GOO-CAROUSEL-DECK` | the single-plate bed + the demo-hand-rolled deck goo → superseded by the substrate extraction + the barbell. |
| **INHERIT** | `W-GOO-CAROUSEL-DECK-FIX2` | the dark warm-ink arm + travel-gate — kept verbatim. |
| **REFINE** | `W-PAGER-GOO-MORPH` | the single worm → barbell migration (rides the amendment); the `--pager-accent-flood` commit punctuation added. KEEP the BIG/SLOW magnitude. |
| **UNTOUCHED** | dock-fission (`BD.W-DOCK-*`), the WebGL blob viz | separate scales/engines; the ONE optional DRY touch (the concave throat shared with the fission neck) stays flagged, not mandated. |
| **PRUNE** | none | clean breaks recorded in-build (no-legacy), not wave deletions. |

### The gate — `proof:slide-transition` (born-RED → GREEN; REAL rendered readback, never arithmetic)
- **C1 · de-dup**: the deck demo composes `useSlideTransition`, NOT a hand-rolled `deck-goo-layer`;
  ONE `useSlideTransition`, two callers (carousel + deck); NO second goo composition. RED on HEAD
  (the deck goo lives in `demo/stories/motion/deck.vue`).
- **C2 · barbell**: both shells render `bodyA`/`neck`/`bodyB` (no single worm-plate); `hasLocalMinimum
  = true` + `waistRatio ≤ 0.45` on a RENDERED cross-axis alpha readback at the neck peak, BOTH shells,
  BOTH modes (rasterize → `getImageData`, NEVER `neckGirth·const`). RED on HEAD (the 1.2× convex slab).
- **C3 · distortion**: the lens layer measurably bows the slide content at the waist (a displacement
  delta in the rendered slide pixels under the throat, Chromium) with a WebKit blur-floor; `@supports`
  + PRM carve present. RED on HEAD (no distortion exists).
- **C4 · inertia**: `--carousel-goo-flow` is NON-EMPTY (its own curve, not the dot fall-through); the
  Next `--goo-weight=1.0`, the drag stays calm (T13 — content-snap overshoot ≤ the smooth floor); the
  neck DWELLS ≥ 250 ms then pinches; the bridge is GONE ≤ 80 ms after settle (no dead-slab). RED on
  HEAD (empty flow, flat 0.55 dwell across the whole window).
- **C5 · §L7 + no-gray**: static `#glass-goo` (sRGB, no `var(` in the graph); the lens
  `backdrop-filter:url` is `@supports`-gated Chromium-only w/ WebKit fallback; warm-cream
  `C ≥ 0.010, H ∈ [45,85]` both modes both shells (the deck near-gray FIXED). PAIRED-engine π,
  `|webkit.waist − chromium.waist| ≤ 0.05`.

### The binding π — `tests-visual/slide-transition.spec.ts`
A PAIRED-engine rAF frame-series on a REAL Next-click `/navigation/carousel` AND a REAL page-advance
`/motion/deck`, BOTH modes, Chromium AND real Safari-26-on-Metal (`@webkit`), LIVE MOTION (never
`reducedMotion` for the morph arm). Rasterize the goo-layer output → walk the post-threshold
cross-axis alpha (the waist), the slide-pixel displacement under the throat (the distortion), the
neck-driven opacity gate (the dwell), the warm-cream chroma. Born-RED CAPTURED LIVE
(`live-carousel-current.png` + the rAF series in §0): the 1.2× convex slab, `hasLocalMinimum=false`,
flat 0.55 dwell, empty carousel flow, demo-hand-rolled deck goo.

### The gestalt row
**Union-roster surface: `slide-transition`** (carousel + deck). Verdict: two warm-cream bodies NECK
into a thin CONCAVE waist (≤ 0.45 rendered), the slide content visibly BENDS through the throat
(Chromium), the neck DWELLS ~250–400 ms then PINCHES + SNAPS, the colorful field glows through the
neck, warm-cream both modes both shells, the Next punchy + the drag calm (driver-vs-observer), the
pager dots goo-worm in sympathy. Born-FAIL on HEAD. GREEN at close; W-REFLECT re-confirms on fresh pixels.

---

## 6. FENCES
- The de-dup is at **Layer 2 (the shell transition substrate)**, NOT Layer 3 (input/state) — the
  carousel (embla, drag) and the deck (`useDeck`, keyboard/aria) stay DISTINCT components; they
  COMPOSE one `useSlideTransition`. Never merge the two into one component (the bolt-on trap).
- The goo ENGINE (`useGooMorph`) is already de-duped + fit — REUSE it (the barbell amendment), never
  re-fork. `useSlideTransition` is a COMPOSITION, not a second engine.
- The born-RED is a REAL rendered readback, NEVER arithmetic (the cardinal anti-pattern).
- The distortion `backdrop-filter:url` is the SANCTIONED gated Chromium-only exception with a WebKit
  blur-floor — never an un-gated declaration, never a steady-state loop (§L7).
- The driver-vs-observer carve is LOAD-BEARING: the carousel *drag* stays calm-overdamped (T13), the
  *Next-arrow* carries the cartoon punch (`--goo-weight=1.0`); the deck is calm (0.4, vestibular).
- NO LEGACY — the single-worm plate bed, the demo-hand-rolled deck goo, the empty carousel flow
  fall-through, and the deck near-gray slide are DELETED in the same amendment, not aliased.
</content>
