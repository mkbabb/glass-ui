# GOO-MORPH greenfield — LENS C (audacious cartoon-technicolor punch)

**Lens:** maximum 1940s-technicolor FLOW & PUNCH — anticipation, exaggeration, follow-through, overlapping action, arcs, squash & stretch with real weight; the boldest variant that stays cross-engine + idiomatic + a UNION (no re-fork).

**The bar (verbatim user):** *"the goo effect is AWFUL … does NOT work on SAFARI, is far too SLOW, and does not goo morph … How does the Google Gemini carousel work? It should MORPH BLOB and MEATBALL from one to another"* and *"we must NAIL this goo morphing and not have naive ellipsoids."*

---

## 0. What I verified live (the honest status quo — not anchored, just grounded)

Live on `:5173/navigation/carousel`, real `Next.click()`, tight rAF frame-series + `getComputedStyle`, both modes:

- **Safari floor: structurally airtight.** `#glass-goo` = `stdDeviation="10"` (literal, no `var`), `feColorMatrix … 24 -11` (static), `color-interpolation-filters="sRGB"`, region `-50% -50% 200% 200%`, regular `filter: url(#glass-goo)` (NOT `backdrop-filter:url`), `@supports`-floor + PRM carve present. **Keep this entirely.**
- **Speed: fast.** Worm swells 486→963px (lenRatio ~2.2) peaking at **~140ms**, settles ~300ms, overshoot 1.0147. The "slow" defect does not reproduce. **Keep the clocks.**
- **Engages: yes.** `data-traveling` toggles, layer opacity 0→0.55, two-edge transform `scaleX(2.2) scaleY(0.74)`. **The mechanism is correct.**
- **Dark-fix (fix2) landed:** dark goo fill `oklch(0.68 0.05 59°)` + `saturate(1.3) brightness(1.3)` transmissive companion. Composites luminous-warm, not gray-brown. **Keep it.**
- **The de-dup is real + correct:** `useGooMorph.ts` exists ONCE (353 L), consumed by the pager worm + carousel plate + deck plate. No second goo fork. Carousel(embla) and deck(useDeck) stay distinct substrates; the goo-TRANSITION is the shared layer. **No re-fork owed.**

**The ONE residual gap (the pinned-peak screenshot, `lens-c-carousel-peak-light.png`):** at peak the bridge reads as **a soft warm-cream rounded TRAY with scalloped edges** — JUDGE-2 §3's verdict exactly: *"a warm tray with gooey edges, NOT the decisive two distinct blobs welling a neck and pinching the Gemini reference implies."* The merge is **under-dramatic**. This is the whole greenfield: the four headline defects + dark are resolved; the **GESTALT of the meatball waist** is the unfinished half. Lens C's job is to make the merge read as a *decisive liquid metaball* with cartoon weight — without re-forking, without breaking Safari.

---

## 1. ROOT-CAUSE of the under-dramatic merge (why a tray, not a meatball)

A real metaball merge (Gemini carousel; Apple's dock magnification; the canonical `feGaussianBlur+feColorMatrix` goo) reads as two bodies **when the goo filter sees TWO separated alpha masses with a THIN low-alpha bridge between them** — the threshold then *gradient-fills the gap* into a pinched waist that narrows as the masses part and bulges as they near. The current build defeats this in three structural ways:

1. **The masses are full-height plates at constant cross-axis girth.** The worm + the static plates are all `block-size: 100%` rectangles; the cross-axis pinch floors at `0.72–0.74`. So the goo filter never sees two *rounded* bodies with a *narrow* throat — it sees one long capsule the width of two slides. The threshold yields ONE solid rounded rect. **A waist needs the cross-axis to neck to a genuine pinch (≈0.3–0.45), not a 0.72 floor — and the bodies must read as ROUNDED, not as the corners of a long bar.**
2. **The worm OVERLAPS the plates the whole travel.** The two-edge geometry keeps `len ≥ W` and centered, so the worm *contains* both plate centers at peak — there is no GAP for a neck to span. A metaball neck needs a moment where the two bodies are **distinct with a low-alpha valley between them**; the current single-worm-spanning-both leaves no valley.
3. **The blur radius is tuned for "bleed two fringes," not "fuse two rounded masses across a real gap."** `stdDeviation=10` over a 350px plate is a *small* fringe relative to the mass — it rounds corners, it does not weld two separated droplets. The Gemini read wants the blur ≈ the *gap* between bodies so the alpha valley fills into a waist.

**The fix is geometric, not a new engine:** give the goo filter **two rounded droplet bodies that genuinely separate and re-approach with a measurable alpha valley**, and let the existing static threshold do what it already does well — weld + pinch the waist. This is a `useGooMorph` *projection-geometry* refinement + a fill-shape change + a token retune. Zero new composable, zero new filter, zero Safari risk.

---

## 2. THE CORE IDEA — the "two-droplet neck-and-pinch" projection + the cartoon-punch overlay

**Reframe the silhouette from ONE spanning worm to TWO droplet bodies bridged by a goo valley.** The current `useGooMorph` already paints a single two-edge capsule; Lens C adds a **second projection mode** (`merge: "two-body"`) on the SAME engine that paints the leaving body and the arriving body as **two distinct rounded droplets** whose centers travel apart-then-together, with the cross-axis **necking to a true waist at the midpoint**. The static `#glass-goo` threshold welds them into one metaball with a pinched throat that **stretches → thins → SNAPS** — the Gemini blob↔meatball read. The travelling worm stays for the pager (dot scale, where one body is right); the carousel/deck plate opts into two-body.

Then, over that correct metaball geometry, Lens C layers the **CARTOON PUNCH**: anticipation (a pre-dip recoil before the bodies launch), exaggeration (a bolder mid-neck bulge + a √φ-proportioned overshoot land), follow-through (the catch-light specular sweep + a settle-jiggle trailing the body), and a moving cartoon-shadow cast under the bridge. All wired to the **Band-0 `--ease-cartoon-punch` + `--motion-weight`** the prompt names — the goo morph becomes a *driver* event (per §L2 driver-vs-observer, a carousel CONTENT snap is normally calm, but the user has explicitly demanded the punch here, so the goo-bridge layer carries `--motion-weight` toward 1 while the embla content snap stays calm-overdamped underneath — the two-register split is preserved).

### 2a. The two-body projection (the mechanism — in `useGooMorph.paint`)

The engine already computes `A`, `B` (slot centers), `p` (0→1 progress), `W` (rest size). Replace the single-capsule `head/tail` projection with a **two-droplet model** keyed off the SAME `--goo-t` flow scalar:

```
p = progress 0→1 ;  span = B − A ;  gap(p) = |span| · sep(p)
sep(p)  = the body SEPARATION envelope: 1 at p=0/1 (bodies fully apart at their slots),
          dipping toward ~0.18 at p=0.5 (the bodies NEAR but a narrow valley remains) —
          a smooth ∪ so the goo valley never fully closes (a closed valley = the tray bug).
leaving body  center = lerp(A, mid, ease(p))    radius = W/2 · vol(p)   alpha = 1 − fadeOut(p)
arriving body center = lerp(mid, B, ease(p))    radius = W/2 · vol(p)   alpha = fadeIn(p)
waist(p) = the CROSS-AXIS pinch of BOTH bodies at the throat: floors LOW (~0.34 plate, ~0.5 dot)
          at p=0.5 (the true meatball waist), 1 at the slots. (NOT the 0.72 girthFloor — that
          floor is for the SINGLE-worm mode; two-body necks REAL because the valley supplies
          the separation the filter welds.)
```

Two `<span>` droplet elements (`.goo-body-lead` + `.goo-body-trail`) carry `transform: translate(center) scale(radius/W) scaleCROSS(waist)` + `opacity`. The goo filter sees two rounded masses + a shrinking gap → it **fills the valley into a waist that thins as they part and bulges as they near** — the merge the threshold was built for. The blur is retuned so `stdDeviation ≈ gap·k` reads (see §2c). The single-worm path is kept for the pager (`merge: "worm"` default).

**Why two `<span>`s, not the worm + N static plates:** the current build needs N static plates parked at every slide center to give the worm "something to merge with." That's the source of the tray (a worm spanning into a full-height plate). Two droplets that travel + separate + re-merge is the *minimal* two-mass model — fewer elements, a clearer valley, and a real waist. The N-plate scaffolding is RETIRED in favour of the two-body projection (a clean break — no-legacy law; the de-dup engine GAINS the mode, it does not fork).

### 2b. The body SHAPE — rounded technicolor droplets, not bars

Each body is a **near-circular warm-cream droplet** at rest (`border-radius: 50%` reserved footprint, `block-size` = the slide minor extent so a horizontal carousel reads a fat lozenge, a vertical one a tall one) with the **six-layer optical read baked into the fill**: the warm-cream `radial-gradient` catch-light (already shipped) + a **bold inner specular dome** + the **cartoon-shadow cast** as a `::after` offset plane (the §Shadows moving cast — it slides opposite the body's motion, scaled by `--motion-weight`). At the waist, both bodies pinch cross-axis to ~0.34 → the goo welds a genuine **hourglass throat**. In dark mode the fill rides the landed `oklch(0.68 0.05 h)` warm-ink + `saturate/brightness` companion (untouched). This is the technicolor punch: the bodies are **bold, rounded, domed, shadowed** — cartoon mercury beads, not flat plates.

### 2c. The blur retune for a REAL weld (Safari-static)

The `#glass-goo` filter stays byte-static (literals, sRGB, region, no var) — but the **plate-scale instance retunes its literals** so the weld reads at body-scale: blur the gap, not just the fringe. Two-body merge wants `stdDeviation` ≈ the *valley width* at mid-neck. Since the valley is `|span|·0.18`, a wider static blur (≈14–18 at carousel scale) + a steeper threshold (`slope ≈ 26`, `offset ≈ −13`) yields: bodies fully crisp at the slots (gap large → blur can't bridge → two separate droplets), and a **decisive welded waist** at mid-neck (gap small → blur bridges → threshold pinches). The literals are props on `GlassGooFilter` (already tokenized: `blur`, `thresholdSlope`, `thresholdOffset`) — the carousel passes `:blur="16" :threshold-slope="26" :threshold-offset="-13"`; the deck passes a gentler set; the pager keeps `#pager-goo`'s `blur=8`. **One filter component, per-consumer literal props — no fork, no var-driven stdDeviation, Safari-safe.** (Verified the props already exist on `GlassGooFilter.vue`; this is a value change at the consumer call site.)

### 2d. The cartoon-punch motion overlay (the FLOW & PUNCH)

Wire the goo-bridge transition to the Band-0 cartoon register, opt-in via a `--goo-weight` consumer scalar (carousel pushes toward 1, deck stays ~0.4 for the vestibular floor, pager ~0.7):

| Principle | Mechanism (compositor-only) |
|---|---|
| **Anticipation** | the `--{prefix}-flow` curve already front-loads; ADD a `--ease-cartoon-punch`-derived **pre-dip** on the body SCALE only (the bodies recoil-squish ~4% inward *before* launching) — a tiny `scale` dip on the leaving body keyed off the flow's first 8%, scaled by `--goo-weight`. (Bodies dip, then punch — no spring can express the dip; the `linear()` cartoon curve can.) |
| **Exaggeration** | the mid-neck `vol(p)` bulges past 1 (≈1.12 at the throat for the carousel) so the welding mass *swells* as it pinches — the bold cartoon meatball; `--carousel-goo-max-stretch` rises 1.24→**1.32**, the `waist` floor drops to **0.34** for a decisive throat. |
| **Overshoot land** | the arriving body lands with the existing +1.5% terminal overshoot, raised to **+6%** (`--goo-weight`-scaled) for the cartoon PUNCH on arrival, then settles — a √φ-proportioned overshoot (the overshoot share = `motion-weight × 1/φ`). |
| **Follow-through / overlap** | the **specular catch-light sweep** (the shipped `--neck-specular-angle` conic from `fission-bridge.css`, plus-lighter, sRGB-safe) sweeps the throat *trailing* the geometry by ~60ms; a settle-jiggle on the landed body trails the body center. |
| **Arc** | the body centers travel a subtle vertical arc (a `translateY` parabola peaking at mid-travel, ≈`W·0.06·sin(πp)`) so the merge isn't a flat slide — the bodies *lob* into each other (overlapping action). PRM flattens the arc to 0. |
| **Moving cast** | the `::after` cartoon-shadow plane under each body slides opposite the body's motion (the §Shadows moving cast), deepening at mid-flight (the bodies lift off the page as they merge), snapping back on land. |

All of these are `transform`/`scale`/`opacity`/`filter`/conic-`background` on `plus-lighter` — **zero layout animation, zero new clock** (every axis is `f(--goo-t)` or `f(--stretch)`, the deterministic-frame law). The cartoon curve is the EXISTING `--ease-cartoon-punch` token; `--goo-weight` is the EXISTING `--motion-weight` idiom scoped per consumer.

---

## 3. CROSS-ENGINE (Chrome + Safari) — the §L7 arm, reasoned

The user keeps flagging Safari. Lens C is Safari-safe by construction because **it adds NO new mechanism to the filter graph** — every change is geometry (transforms on the bodies), fill (gradients), literal-value props on the static filter, and CSS-filter functions on the surface's own layer:

- **The `#glass-goo` filter stays STATIC** — `stdDeviation` is a literal prop value (16, not `var()`); `feColorMatrix` literals; `color-interpolation-filters="sRGB"` (WebKit forces sRGB regardless — declaring it makes Chrome MATCH WebKit's threshold so the waist reads identically on both); region `-50%/200%` (the neck never clips); regular `filter: url()`, NEVER `backdrop-filter:url` (WebKit bug 245510). The per-frame writes are `transform`/`opacity` on the two body `<span>`s — never the filter. This is the proven Safari-correct path from `DockGooFilter`/`fission-bridge.css`.
- **The cartoon-punch overlays are plain CSS** — `transform`, `scale`, `opacity`, `radial/conic-gradient`, `mix-blend-mode: plus-lighter` (Safari 16.4+, with a plain-overlay degrade), `drop-shadow` for the cast. No `backdrop-filter:url`, no var-driven `stdDeviation`. The dark transmissive companion (`saturate/brightness`) is a CSS-filter function appended to the shorthand — Safari-native.
- **`@supports not (filter: url(#glass-goo))` floor** — the two bodies cross-fade (no weld) as the degraded arm; the crisp embla/deck content is the legible floor.
- **PRM carve** — the goo layer `display:none`, the bodies snap to the target slot, no neck frames, no arc, no cast travel, no punch (the `--ease-cartoon-punch` collapses to `--ease-standard`, `--goo-weight → 0`).
- **The acceptance proof is a PAIRED-ENGINE π** (Chromium AND WebKit) per §L7 — a real `Next.click()` mid-morph frame on both engines must show the welded waist + the two distinct bodies + the warm glass, both modes. Not a single-engine green.

**Reasoning about WebKit fidelity specifically:** the failure modes the user hit are (a) `backdrop-filter:url` (absent — we use regular `filter`), (b) var-driven `stdDeviation` per-frame re-blur (absent — static literal, only transforms animate), (c) linearRGB threshold mismatch (handled — `sRGB` declared, so Chrome's threshold matches WebKit's forced-sRGB so the SAME waist alpha reads on both), (d) zero-sized filter host no-op (absent — the 1×1 non-zero host). All four WebKit traps are structurally closed; the two-body geometry rides the SAME proven graph. The only WebKit-specific watch is `plus-lighter` on the specular sweep — gated with a plain-overlay fallback (no blowout).

---

## 4. COMPOSITION — how it reuses the extant ecosystem (DEFT, KISS, DRY, no fork)

| Need | Existing primitive REUSED | Lens-C delta |
|---|---|---|
| The morph engine | `useGooMorph.ts` (the ONE de-duped engine) | ADD a `merge: "worm" \| "two-body"` param; the `paint()` gets the two-droplet projection branch. Pager keeps `"worm"`; carousel/deck pass `"two-body"`. **One engine, one new mode — NOT a fork.** |
| The squish | `useLiquidFlex` (already consumed) | unchanged — drives `--stretch`; the cartoon overshoot share scales by `--goo-weight`. |
| The filter | `GlassGooFilter.vue` (static, Safari-safe, props already exist) | retune the LITERAL prop values per consumer (`:blur`, `:threshold-slope`, `:threshold-offset`). Zero graph change. |
| The flow curves | `--carousel-goo-flow` / `--deck-goo-flow` / `--pager-worm-flow` (shipped `linear()` dwell shapes) | bump `--carousel-goo-max-stretch` 1.24→1.32; ADD a `--ease-cartoon-punch`-derived pre-dip on the body scale; lower the waist floor. No new spring (the W-GLASS-CAL fence holds). |
| The cartoon register | `--ease-cartoon-punch` + `--motion-weight` (Band-0) | scope as `--goo-weight` per consumer; the goo-bridge is a *driver* event carrying the punch. |
| The specular sweep | `fission-bridge.css` `--neck-specular-angle` conic + `--glass-specular-core` + `plus-lighter` | reuse the conic-sweep idiom on the throat (follow-through) — NO second specular fork. |
| The moving cast | the §Shadows cartoon-shadow `::after` moving-cast idiom | reuse on the body — NO animated box-shadow (compositor transform on the cast plane). |
| The dark register | the landed fix2 (`oklch(0.68 0.05 h)` + `saturate/brightness`) | untouched — the two bodies inherit it via `currentColor`. |

**The N-static-plate scaffolding is RETIRED** (carousel `.carousel-goo-plate` v-for + `placePlates()`; deck `.deck-goo-plate`) — replaced by the two-body projection (clean break, no-legacy). This SIMPLIFIES the consumers (no per-slide plate map, no `placePlates` re-park each drag frame) while making the merge correct. KISS net-negative LOC at the consumer.

---

## 5. THE BOLDEST MOVE

**Retire the single-spanning-worm-over-N-static-plates model and replace it with a TWO-DROPLET neck-and-pinch projection on the same `useGooMorph` engine — two rounded warm-cream cartoon-mercury beads that LOB into each other on an arc, separating with a real alpha valley the static `#glass-goo` threshold welds into a pinched hourglass waist that thins-and-SNAPS, then the arriving bead PUNCHES its landing with a √φ-proportioned `--ease-cartoon-punch` overshoot.** The whole "two shapes sliding tray" bug dies because the geometry finally gives the metaball filter what it was built for: two separated masses with a narrow welded throat. It is the *minimal* change that makes the gestalt decisive — one new engine MODE (not a fork), two `<span>`s instead of N plates (net-simpler), retuned static-filter literals (Safari-safe), and the Band-0 cartoon-punch curve wired to a per-consumer `--goo-weight` so the carousel finally reads as a bold liquid metaball with weight, while the embla content snap underneath stays calm. The user's Gemini-carousel "MORPH BLOB and MEATBALL from one to another" becomes literal: two beads, one welded waist, a decisive pinch-and-snap, in both engines and both modes.

---

## 6. DELTA-ASSAY vs the 116 union waves (no dup)

- **`BD.W-GOO-SPLIT-PERF`** — about splitting/perf-gating the goo layer; orthogonal. Lens C does not touch perf-split; it changes the morph GEOMETRY + the cartoon overlay. No overlap.
- **`W-GOO-CAROUSEL-DECK` + `W-GOO-CAROUSEL-DECK-FIX2`** — the landed ground (4 headline defects + dark + travel-gate). Lens C is the GESTALT amendment ON that ground (the JUDGE-2 §3 under-dramatic-merge residual JUDGE-3 deferred). **Union, not a new fork.**
- **`fission-bridge.css` / `useDockFission`** — the dock's N-ary metaball; Lens C reuses its specular-sweep + cast idioms but does NOT touch the dock (the carousel/deck plate-scale twin). No dup.

**The wave-amendment this assay produces:** `BD.W-GOO-TWO-BODY-MEATBALL` (band: viz/refine; depends: W-GOO-CAROUSEL-DECK-FIX2) — ADD `merge: "two-body"` to `useGooMorph`; retire the N-plate scaffolding in the carousel + deck consumers for the two-droplet projection; retune `GlassGooFilter` literals per consumer (blur 16 / slope 26 / offset −13 carousel); bump `--carousel-goo-max-stretch`→1.32 + waist floor 0.34; wire `--goo-weight` (=`--motion-weight`) + the `--ease-cartoon-punch` pre-dip/overshoot + the arc + the moving cast + the trailing specular sweep. **Gate:** a paired-engine (Chromium + WebKit) π of a real `Next.click()` / `deck.next()` mid-morph frame showing TWO distinct welded bodies + a measurably pinched waist (the valley alpha non-zero mid-flight, the waist cross-axis ≤0.45) + warm glass (C ≥ 0.020, composited L ≥ 0.5 dark), born-RED on the current single-tray peak; both modes; PRM instant-snap; `@supports` floor.

---

## 7. THE A11Y / PRM CARVE (explicit)

- **PRM (`prefers-reduced-motion: reduce`):** the goo layer `display:none`; the two bodies snap to the target slot (the engine early-returns, no rAF, no `--goo-t` transition); the arc flattens to 0; the cartoon cast is static; `--ease-cartoon-punch` → `--ease-standard`; `--goo-weight → 0` (the §L5 cascade zeroes squash/overshoot/anticipation/arc/cast in one assignment). The embla/deck content still pages (the gesture confirms) — only the goo punch is off.
- **`prefers-contrast: more`:** the cartoon cast opacity floors UP (the inked edge is a legibility asset, per §Shadows); the bodies' warm fill is unaffected (it's transmissive content, not the legible surface — the crisp embla/deck track is).
- **`prefers-reduced-transparency`:** does NOT touch the cartoon cast (opaque ink); the goo layer is decorative + `aria-hidden` — the crisp content carries legibility regardless.
- **AT:** the goo layer is `aria-hidden="true"` + `pointer-events:none`; the embla track + `PagerDots`/`DeckPager` own the roles, labels, and keyboard (unchanged). The morph is pure decoration over an already-accessible scroller.
- **WCAG-2.2.2:** the morph is a one-shot per gesture (no auto-loop, no steady-state) — no pause control owed.
