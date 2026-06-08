# R-squircle — Squircle / superellipse SOTA + CSS implementation (G3)

**Lane:** SOTA-RESEARCH. **Severity:** research. **Consumed by:** the NET-NEW squircle
design-language wave (G3). **Verdict:** net-new-wave (no existing wave owns the
library-wide squircle TOKEN system; W42 owns only the dock-morph continuous-`k` axis —
deconflicted below).

---

## 0. TL;DR for the wave author

1. The CSS feature is **shipped + spec-stable**: `corner-shape` + `superellipse()` landed
   **Chrome/Edge 139** (Aug 2025); ~**65% global** (May 2026). **Safari + Firefox: NOT
   supported** (no positive signal through 2026) — so it is a **progressive-enhancement
   tier only**, never the contract. glass-ui ALREADY ships it this way (AW.W23).
2. The CSS **`squircle` keyword == `superellipse(2)`**, which paints superellipse exponent
   **n = 4** (`x⁴+y⁴=1`). This is NOT the iOS shape — the real iOS corner is a **Bézier+arc
   construction** (Figma's `ξ` smoothing, **ξ≈0.6** ≈ iOS app-icon). A pure superellipse
   has a small systematic discrepancy at every `n`. **n=4 (`superellipse(2)`) is the
   accepted web-idiomatic squircle**; the often-cited "n=5" is a debunked early
   approximation. Recommendation: ship `superellipse(2)` as the default and expose the
   `k` as a token so a consumer can dial 1.7–2.2 to taste.
3. The headline gap glass-ui has TODAY: the squircle is hardcoded as the bare `squircle`
   keyword on three glass classes + the big-dock; there is **no `--squircle-k` token, no
   per-surface tunability, and no clip-path fallback** for the 35% on Safari/FF. G3's job
   is the **token system + the rounded-vs-squircle POLICY + the optional clip-path
   fallback tier** — NOT inventing the squircle (it exists).

---

## 1. The SOTA facts (cited)

### 1.1 CSS `corner-shape` + `superellipse()` — the spec

- **Property:** `corner-shape` takes 1–4 values (TL/TR/BR/BL like `border-radius`), each
  one of: `round` (default) · `scoop` · `bevel` · `notch` · `square` · `squircle` ·
  `superellipse(<number>)`. The **region** the corner shape applies to is still set by
  `border-radius` — `corner-shape` only changes the CURVE within that radius box.
  ([MDN corner-shape], [Chrome for Developers blog])
- **Formula (MDN):** `superellipse(K)` paints `|x|^(2K) + |y|^(2K) = 1`. So the curve
  exponent **n = 2K**. ([MDN superellipse])
- **Keyword equivalences (authoritative, MDN):**

  | keyword | `superellipse(K)` | exponent n=2K | curve |
  |---|---|---|---|
  | `notch` | `superellipse(-∞)` | — | extreme concave |
  | `scoop` | `superellipse(-1)` | n=0.5 | concave (inward scoop) |
  | `bevel` | `superellipse(0)` | n=1 | straight chamfer |
  | `round` | `superellipse(1)` | n=2 | ordinary circle/ellipse |
  | **`squircle`** | **`superellipse(2)`** | **n=4** | **the squircle** |
  | `square` | `superellipse(∞)` | — | sharp right angle (K≥10 ≈ square) |

  K>1 ⇒ more square-like; K<0 ⇒ concave. Negative `superellipse()` is convex's inverse.
  ([MDN superellipse], [MDN corner-shape-value], [Frontend Masters], [CSS-Tricks superellipse])

  > **Source discrepancy noted + resolved:** one secondary blog claimed `n=2^K` (so
  > squircle⇒n=4 by a different route). MDN's `x^(2K)+y^(2K)=1` is the authoritative spec
  > formula. BOTH land squircle at **n=4** — agreement on the value that matters; use the
  > MDN linear `n=2K` relation for any `k`-token math (so `--squircle-k: 2` ⇒ n=4).

- **Animatable.** `corner-shape` interpolates between keywords/`superellipse()` values
  (keywords resolve to their `superellipse()` equivalent, then the `K` lerps). This is
  exactly the axis **W42 §19.11** wants for the dock-morph silhouette (`--superellipse-k`
  `calc()`'d off `--morph-t`). ([MDN corner-shape], [Frontend Masters])
- **Borders/shadows/backdrop-filter follow the shape.** Non-uniform border widths get a
  per-edge "belly"-corrected sub-ellipse offset; box-shadow + outline + `backdrop-filter`
  clip to the superellipse silhouette (this is WHY glass-ui put `corner-shape` on the glass
  surfaces — the blur + edge-gleam + cartoon shadow all inherit the squircle outline).
  ([Chrome for Developers blog])
- **Performance:** Blink renders the superellipse via a **precomputed cubic-Bézier
  approximation** (coefficients per `K`) — it is a cheap path build, NOT a per-frame
  solve; animating `K` is affordable. No reported compositing penalty beyond a normal
  rounded clip. ([Chrome for Developers blog])

### 1.2 The iOS truth (why n=4 ≈ iOS, and why it's not exact)

- Apple's icon/superellipse-feeling corner is **NOT a pure superellipse** — it's a
  piecewise **cubic-Bézier + circular-arc** "arc-with-shoulders" (Mike Swanson / Manfred
  Schwind reverse-engineering; even has a tiny straight segment + asymmetry). ([Figma blog])
- The early **n=5** superellipse guess "looks really close" but has a systematic error at
  every `n` — **debunked**. ([Figma blog], [Squircle.js math])
- Figma/Sketch parametrize it as **corner-smoothing `ξ ∈ [0,1]`**; **ξ=0.6 ≈ iOS app
  icon**. `figma-squircle`'s `getSvgPath({cornerSmoothing: 0.6})` is the de-facto web port.
  ([Figma blog], [Squircle.js math], [figma-squircle])
- **Mapping for the wave:** the CSS `squircle`/`superellipse(2)` (n=4) is the accepted web
  squircle and reads as the iOS idiom at typical UI radii. If a future wave wants a closer
  iOS match on the clip-path tier it can emit a `figma-squircle` path at `ξ=0.6`; for the
  native `corner-shape` tier, **`superellipse(2)` is the right default**, with a token band
  of roughly **1.8–2.2** (n=3.6–4.4) for taste. Do NOT chase n=5 — it's wrong.

### 1.3 Browser support (the fallback mandate)

- **Chrome 139 / Edge 139** (Aug 2025). **Safari: not supported** v3.1–26.5. **Firefox:
  not supported** v2–154. **~65.04% global** (caniuse, May 2026).
  ([caniuse corner-shape:squircle])
- ⇒ **`corner-shape` is a PE tier, full stop.** The contract MUST be `border-radius`
  (round) on Safari/FF. glass-ui's `@supports (corner-shape: squircle)` gate is exactly
  right and stays.
- **The richer fallback** (where a surface MUST read squircle cross-engine): a JS-generated
  **`clip-path: path('<figma-squircle svg path>')`** at `cornerSmoothing: 0.6`
  ([figma-squircle], [corner-smoothing], [Squircle.js]). Caveats: `clip-path` **hard-clips
  the box** (it cuts the backdrop-filter blur halo + the cartoon offset-shadow that lives
  OUTSIDE the box — so a clip-pathed glass card loses its drop shadow + bleeds the blur
  edge), needs a ResizeObserver to regenerate on resize, and adds a runtime dep. **For
  glass-ui the clip-path tier is NOT recommended as the default** — the round
  `border-radius` fallback is visually honest and zero-cost; reserve clip-path as an
  opt-in escape hatch only if a specific hero surface demands cross-engine squircle. State
  this as an explicit DECISION in G3 (KISS / token-first over a JS path generator).

---

## 2. glass-ui current state (audited at HEAD)

glass-ui **already pivoted to squircle in AW.W23** — this is NOT greenfield:

- **`src/styles/glass.css:714–729`** — `@supports (corner-shape: squircle)` applies
  `corner-shape: squircle` to `.glass-card`, `.glass-btn`, `.btn-pill`. Gated PE over the
  un-gated `border-radius` round contract. Bare keyword, no token.
- **`src/styles/dock.css:533–541`** — same `@supports` gate applies `corner-shape:
  squircle` to the big-dock card shell `.glass-dock.variant-dock:not(.vertical).shape-card`.
  The radius itself lerps `--radius-pill → --dock-card-radius` off `--dock-expand-t`
  (single-scalar morph). Bare keyword.
- **`src/components/custom/dock/GlassDock.vue:57`** — comment documenting the dock squircle
  PE rationale ("reads better at the large card radius").
- **`src/styles/glass-refract.css:1–60`** — the `#glass-refract` displacement filter is
  **baked from the squircle surface profile** `y = ⁴√(1−(1−x)⁴)` (Apple's convex-lens
  corner curve, n=4). The squircle geometry is already the library's refraction substrate.
- **Radius token ladder** (`src/styles/theme.css:28–65`): a full `--radius-{xs..3xl,pill}`
  primitive scale + semantic aliases (`--radius-card`=2xl, `--radius-dock-card`=3xl,
  `--radius-panel`=xl, `--radius-pill`=9999px, `--radius-field`, `--radius-control`, …).
  **This is the half of the system that exists.** There is NO `--corner-shape-*` /
  `--squircle-k` companion axis.

### The GAPS G3 closes

1. **No squircle TOKEN.** The shape is a hardcoded `squircle` keyword in two CSS files. There
   is no `--squircle-k` (or `--corner-shape-card` / `--corner-shape-dock`) a consumer can
   override or a wave can `calc()`. Token-first axis is missing on the corner-SHAPE dimension
   (it exists on the corner-RADIUS dimension).
2. **No rounded-vs-squircle POLICY.** The user's G3 ask is precise: **rounded for cards,
   rounded for docks (the small/pill ones), but big-docks + the like → squircle.** Today
   the squircle is on `.glass-card` (i.e. ALL glass cards get squircle, contradicting
   "rounded for cards") AND on `.glass-btn`/`.btn-pill`. The policy is INVERTED/diffuse vs
   the user's intent. G3 must encode the deliberate map: which surfaces are round, which
   are squircle.
3. **No per-surface `k` tunability.** Big-docks may want a slightly softer/sharper squircle
   than buttons; one global keyword can't express it.
4. **Fallback decision unrecorded.** The round `border-radius` fallback is correct and in
   place, but there's no documented DECISION rejecting the clip-path tier (so a future agent
   might "fix" the 35% Safari gap by bolting on a JS path generator — which would break the
   blur halo + cartoon shadow). G3 records the rejection with rationale.

---

## 3. The implementable G3 recipe (token-first)

### 3.1 A `--corner-shape-*` token axis (parallel to `--radius-*`)

Mint a small superellipse-`k` token band in `theme.css` (plain `@theme`, alongside the
radius primitives) so the corner SHAPE is as overridable as the corner RADIUS:

```css
@theme {
    /* superellipse k (MDN: paints exponent n = 2k). squircle == superellipse(2) == n4. */
    --corner-k-squircle: 2;     /* the iOS-idiomatic web squircle (n=4)            */
    --corner-k-soft:     1.7;   /* gentler — between round and squircle (n≈3.4)    */
    --corner-k-sharp:    2.4;   /* crisper square-bias (n≈4.8) for large surfaces  */

    /* semantic per-surface SHAPE aliases — the rounded-vs-squircle POLICY lives here */
    --corner-shape-card:     round;                          /* user: cards stay ROUND     */
    --corner-shape-pill:     round;                          /* small docks/pills stay ROUND */
    --corner-shape-bigdock:  superellipse(var(--corner-k-squircle)); /* big-dock → squircle */
    --corner-shape-panel:    round;
}
```

Then the consuming CSS reads the semantic alias inside the existing `@supports` gate:

```css
@supports (corner-shape: squircle) {
    @layer components {
        .glass-dock.variant-dock:not(.vertical).shape-card {
            corner-shape: var(--corner-shape-bigdock);   /* was hardcoded `squircle` */
        }
        /* .glass-card / .glass-btn corner-shape REMOVED or set to var(--corner-shape-card)
           == round per the user's "rounded for cards" — see §3.2 policy decision */
    }
}
```

This keeps the PE gate (Safari/FF still get round `border-radius`), makes every shape
overridable from `:root`, and lets W42's dock-morph `calc()` the `k` token continuously.

### 3.2 The rounded-vs-squircle policy map (the design call — flag to user)

Per the user's G3 ask, the **default** map should be:

| surface | shape | rationale |
|---|---|---|
| Cards (`.glass-card`, Card.vue) | **round** | user: "rounded for cards" — REMOVE the AW.W23 squircle from `.glass-card` |
| Buttons / pills (`.glass-btn`, `.btn-pill`) | **round** | small/stadium; squircle is imperceptible at pill radius, drop it |
| Small docks / rails | **round** | user: "rounded for docks" |
| **Big-docks** (the card-shape expanded dock, the large card-radius shell) | **squircle** `superellipse(2)` | user: "big-docks + the like → squircles" — the squircle only reads at the LARGE radius (the AW.W23 + DK comment already says this) |
| Dialogs / large panels / hero overlays | **squircle (candidate)** | "and the like" — the large-radius family; **NEEDS-USER-DECISION** on exactly which |

> **needs-user-decision facet:** AW.W23 currently squircles `.glass-card` + `.glass-btn` +
> `.btn-pill`. The user's G3 ask REVERSES that ("rounded for cards"). G3 should pull the
> squircle OFF cards/buttons and concentrate it on big-docks + the large-radius family.
> The exact membership of "and the like" (dialogs? sheets? the configurator panel?) is a
> design call — surface the candidate list to the user. **This is a clean break, not
> backwards-compat — no alias, just re-home the keyword per the policy.**

### 3.3 Fallback DECISION (record, don't build)

- **Contract tier:** `border-radius` round (Safari/FF/old-Chrome). Honest, zero-cost. KEEP.
- **Enhancement tier:** native `corner-shape: superellipse(2)` under `@supports`. KEEP/extend.
- **REJECTED:** `clip-path: path()` figma-squircle fallback. Rationale: it hard-clips the
  box, severing the `backdrop-filter` blur halo + the cartoon offset-shadow (which live
  outside the border-box), needs ResizeObserver + a runtime dep, and the round fallback is
  already visually acceptable. Token-first + KISS beats a JS path generator. Record this in
  the wave so it isn't "fixed" later.

### 3.4 A device-free gate (`proof:squircle-policy`)

- Assert the `@supports (corner-shape: squircle)` gate is intact (no leak onto the un-gated
  base — a leak breaks the round fallback on partial-support engines; the AW.W23 comment
  already warns this).
- Assert the policy: big-dock site reads `var(--corner-shape-bigdock)` (a superellipse),
  card/button sites read round (no `corner-shape` or `=round`).
- π-arm (Chrome-139 live): `getComputedStyle(...).cornerShape` === `superellipse(2)` on the
  big-dock; `round`/unset on a card.

---

## 4. Dedup against the existing waves

- **W42 (liquid-morph-substrate) §19.11 — DECONFLICTED, NOT a dup.** W42 owns a
  **continuous, animatable `--superellipse-k` axis driven off `--morph-t`** for the DOCK
  silhouette's liquid reshape (the dock's corner-roundness relaxes as it expands). That is
  a MOTION/substrate axis on ONE surface. **G3 is the static, library-wide SHAPE TOKEN
  SYSTEM + the rounded-vs-squircle POLICY across all surfaces.** They compose: G3 mints the
  `--corner-k-squircle` / `--corner-shape-*` tokens; W42's dock-morph `calc()`s its
  animated `k` against them (so there is ONE `k` vocabulary, not two). **G3 must land the
  token band BEFORE/independent of W42 so W42 reads it.** Note the cross-reference in both.
- **AW.W23 (shipped) — G3 EXTENDS + RE-HOMES it.** The bare `corner-shape: squircle`
  keyword on `.glass-card`/`.glass-btn`/`.btn-pill`/big-dock is AW.W23's. G3 tokenizes it
  AND re-homes per the user's policy (squircle off cards/buttons, onto big-docks). This is
  the clean-break the user wants — no alias.
- **W52 (liquid-glass material) — no overlap.** W52 is the blur/specular/edge-gleam
  MATERIAL; it inherits whatever silhouette `corner-shape` paints. G3 is orthogonal.
- **W45 (dock region-model + mobile scale) — no overlap.** W45 owns dock LAYOUT/scale, not
  corner shape. The big-dock squircle stays a glass/dock-css concern.
- **G1 (glass-first-class), G2 (adaptive legibility), G4 (apple liquid) — sibling NET-NEW
  waves, distinct axes.** G3 is the corner-SHAPE pivot only.

**Verdict: net-new-wave (G3).** No existing wave owns the library-wide squircle token
system + the rounded-vs-squircle policy. W42 owns only the dock-morph continuous-`k`
animation and must READ G3's token band (cross-ref both). The shipped AW.W23 keyword is
extended + re-homed by G3, not duplicated.

---

## Sources

- [MDN corner-shape](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/corner-shape)
- [MDN superellipse()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/superellipse)
- [MDN <corner-shape-value>](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/corner-shape-value)
- [Chrome for Developers — implementing corner-shape in Blink](https://developer.chrome.com/blog/implementing-corner-shape)
- [Frontend Masters — Understanding CSS corner-shape and the Power of the Superellipse](https://frontendmasters.com/blog/understanding-css-corner-shape-and-the-power-of-the-superellipse/)
- [CSS-Tricks Almanac — superellipse()](https://css-tricks.com/almanac/functions/s/superellipse/)
- [caniuse — corner-shape: squircle](https://caniuse.com/mdn-css_properties_corner-shape_squircle)
- [Chrome Status — Corner shaping (corner-shape, superellipse, squircle)](https://chromestatus.com/feature/5357329815699456)
- [Figma blog — Desperately seeking squircles](https://www.figma.com/blog/desperately-seeking-squircles/)
- [Squircle.js — The Math Behind Squircles](https://squircle.js.org/blog/math-behind-squircles)
- [figma-squircle (getSvgPath, cornerSmoothing 0.6)](https://github.com/phamfoo/figma-squircle)
- [sanalabs/corner-smoothing](https://github.com/sanalabs/corner-smoothing)
