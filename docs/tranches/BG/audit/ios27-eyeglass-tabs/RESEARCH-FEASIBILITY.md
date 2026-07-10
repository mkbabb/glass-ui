# RESEARCH ARM 2/3 — CSS / MODERN-WEB FEASIBILITY (Chrome + Safari 26, July 2026)

The iOS-27 eye-glass tabs register, per-signature: is it real CSS/modern-web on **both** engines,
and how does it degrade **honestly** (NO-MASKING-FALLBACK — primary paints or fails loud, never a fake
of a working primary)?

## THE ONE BINDING FACT (governs everything below)

`backdrop-filter: url(#svg-filter)` is **Chromium/Edge ONLY**. Safari 26 does **NOT** support it (WebKit
bug **245510** still open as of July 2026); Firefox never shipped it. Regular `filter: url()` (which distorts
the ELEMENT's OWN pixels, not the backdrop) **does** work on Safari & Firefox. So:

- **Bending ARBITRARY live DOM/canvas behind a pill** = Chrome-only (the house `.glass-lens`/`#glass-refract`
  precedent, already `@supports (backdrop-filter: url("#glass-refract"))`-gated → honest blur-only degrade off it).
- **Magnifying a DUPLICABLE backdrop** (a CSS gradient/image the stage single-sources) = **cross-engine**, via a
  cloned child layer `scale()`d + optionally `filter: url()`-displaced (regular filter, Safari-OK). This is the
  recommended **cross-engine primary** for the eyeglass-tabs register — the stage owns/declares its backdrop.

Corrected precision (differs from a stale caniuse read): Safari 26 **does** ship **core CSS anchor positioning**
(`anchor-name`/`position-anchor`/`anchor()`) — Baseline 2026 (Chrome 125+, Firefox 132+, Safari 18.2+; Safari 26
adds `@position-try`). So the tab-GLIDE (anchor-interpolated `inset`) is cross-engine; the house
`@supports (position-anchor: --x)` glide is primary on Safari 26, the JS-measured `useTabIndicator` path is the
pre-18.2/legacy floor. `@property`, `mix-blend-mode: plus-lighter`, `color-mix(in oklab)`, `mask-image`,
`-webkit-backdrop-filter` blur/saturate all ship on Safari 26. `element()` (Firefox-only) and `-webkit-canvas()`
(dead) are **rejected** per directive.

---

## PER-SIGNATURE FEASIBILITY MATRIX

Legend: ✅ works · ⚠️ works with constraint · ❌ not on this engine.

### S1 — True backdrop MAGNIFICATION in the pill (the loupe / droplet optics)

| Tier | Mechanism | Chrome | Safari 26 | Honest-degrade | Perf | House primitive to compose |
|---|---|---|---|---|---|---|
| **T1 (cross-engine PRIMARY)** | **Cloned-backdrop `scale()` loupe** — duplicate the stage's CSS backdrop (gradient/image, single-sourced via a CSS var so it can't drift) as a pseudo/child inside the pill; position it `fixed`-aligned + `scale(>1)` about the pill center; `overflow: clip` + `border-radius: inherit` mask it to the pill; add `filter: url(#edge-displace)` on the clone for edge refraction (regular filter, Safari-OK) | ✅ | ✅ | Backdrop must be CSS-duplicable. A **live `<canvas>`/WebGL** field cannot be cloned in pure CSS → this tier degrades to T3 on Safari (Chrome keeps T2). Constraint recorded, not hidden. | Clone is a STATIC transformed layer → compositor-cheap; only cost is the clone's own paint, `contain`-bounded. Cheaper than T2 (no live backdrop re-sample). | New `.glass-lens-loupe` recipe composing `--glass-refract-bevel` (squircle band) + the existing `#glass-refract` map re-pointed to a **regular** `filter:` on the clone |
| **T2 (Chrome REFINEMENT, arbitrary backdrop)** | **`backdrop-filter: url(#glass-refract)` displacement** — bends whatever is behind (incl. live canvas), no clone needed; edge-concentrated squircle map + (kube.io) a 2nd stronger map for the interior zoom | ✅ | ❌ (WebKit 245510) | Off `backdrop-filter: url()` engines the whole decl sits behind `@supports` → paints the un-gated blur base ALONE (the house floor, already shipped). No broken `url()` ref, no fake magnify. | **Expensive per travel frame** — the displaced backdrop re-rasterizes as the box moves; `feDisplacementMap` `scale` is a BAKED literal (see Perf §) | `.glass-lens` / `glass-refract.css` (`#glass-refract` data-URI, `@supports`-gated) — compose verbatim, add the interior-zoom 2nd map |
| **T3 (honest FLOOR, no duplicable backdrop on Safari)** | **Frost + tint + rim + specular glass capsule, NO magnification** | ✅ | ✅ | This IS the honest degrade: a glass pill that makes **no loupe claim**. NF-compliant — it is not a fake of magnification, it is a legitimately-lesser surface (frost, not loupe). | Static; `-webkit-backdrop-filter` blur only | `.glass-capsule` (Safari-native by construction: no `url()`, no WebGL) |

**Recommended stack:** T1 as the register default (cross-engine real loupe over a CSS-expressible staged
backdrop) → T2 layered additively on Chrome for arbitrary/live backdrops → T3 as the Safari floor whenever the
backdrop is a live canvas that can't be duplicated. All three are honest: none paints a fake magnified image.

### S2 — The refracted RIM (edge-light, conic glint, hue-steal)

| Component | Mechanism | Chrome | Safari 26 | Honest-degrade | Perf | House primitive |
|---|---|---|---|---|---|---|
| Squircle-bevel edge displacement | the `f(x)=⁴√(1−(1−x)⁴)` crossed-gradient map (R=x-shift, G=y-shift, screen-composited), edge-concentrated / thin interior | ✅ (backdrop or clone) | ✅ **on the clone** (regular `filter:`) / ❌ on backdrop | rim displacement rides the T1 clone on Safari; on the pure-frost floor the rim is the box-shadow ring only (no bend) | baked map, static scale | `#glass-refract` map (`glass-refract.css`), `--glass-refract-bevel` (14%) |
| Directional lit rim (top catch-light + bottom under-shadow) | `--glass-material-rim` / `--glass-rim-top`/`-bottom` box-shadow stack, key-driven (`--glass-key-lit-x/-y`) | ✅ | ✅ | full paint both engines (pure box-shadow) | static | `rim.css` — compose, never fork |
| Angle-keyed conic EDGE GLINT | `::before` conic `from var(--specular-angle)` masked to `--glass-edge-glint-band` (22%), `plus-lighter` | ✅ | ✅ (plus-lighter 16.4+; mask-image 2023) | non-supporting engine drops the mask → still inset-bounded, no blowout | cheap (one pseudo) | `material.css` `::before` (`useSpecularPointer` writes `--specular-angle`) |
| Accent hue-steal on the rim | `color-mix(in oklab, <rim ink>, var(--glass-accent) var(--glass-accent-strength))` on ring + border + specular core | ✅ | ✅ | at 0%/transparent defaults = byte-identical no-op | static | `--glass-accent` axis (rim.css + material.css); W-GLASS-ACCENT |
| Backdrop-hue pickup | `--glass-ambient-hue`/`--glass-ambient-strength` (observer-written `oklch()` modal) | ✅ | ✅ | neutral by default (transparent/0%) until observer wired | ≤4Hz sampled | `useGlassBackdropLuminance` seam (material.css) |

The rim composes end-to-end **with zero fork** on both engines. The only Safari delta is the *displacement* leg,
which rides the T1 clone (regular `filter:`) instead of `backdrop-filter`.

### S3 — Proud-of-track overflow geometry (the pill rests taller than its slot, crown/base overflow the bar)

| Concern | Mechanism | Chrome | Safari 26 | Honest-degrade | Perf | House primitive |
|---|---|---|---|---|---|---|
| Pill exceeds the track's block extent | indicator block extent > track: negative/expanded `inset-block` on `.segmented-indicator` so crown/base spill past the track edges | ✅ | ✅ | n/a (pure layout) | free | `.segmented-indicator` inset tokens (`--bouncy-track-trim`) |
| Track must NOT clip the pill | the track has **no** `overflow`/`contain` clip — `.glass-material`'s `contain: paint` register **excludes** the tabs (only content tiers + `.glass-btn` clip). So a proud indicator already paints past the track edges. | ✅ | ✅ | n/a | free | verified: `.segmented-tabs`/`.segmented-indicator` are OUT of the `contain: paint` list (material.css) |
| The loupe/optics layer must also escape the clip | if the pill needs to paint optics beyond a containing chrome bar, use the **`.glass-dock-frame` non-clipping-escape precedent** — an absolutely-positioned optics layer anchored to a `display:contents`/`inline-flex` shell carrying NO `contain`/`backdrop-filter`/`overflow`, so it paints in the gutter box-INVIOLATE (`deltaW=deltaH=0`) | ✅ | ✅ | n/a | free | `stack-rail.css` `.glass-dock-frame[data-has-rail]` / `.dock-hairline-slot` pattern |

Fully cross-engine, pure layout — no engine risk. The proud geometry is the cheapest signature to land.

### S4 — Travel kinematics (fast travel leg + settle + mid-flight squish/stretch)

| Channel | Mechanism | Chrome | Safari 26 | Honest-degrade | Perf | House primitive |
|---|---|---|---|---|---|---|
| GLIDE (position) | anchor-interpolated `inset` on `--tab-indicator-duration` (= `--spring-snappy-duration` 0.4s) × `--spring-snappy` | ✅ | ✅ (anchor Baseline 2026) | `@supports not (position-anchor)` → JS-measured `transform`/`width` write (`useTabIndicator`, center-anchored) — the pre-18.2 floor | compositor `translate` = cheap | `useTabIndicator` + `segmented-tabs.css` anchor block |
| SQUISH (travel stretch) | reciprocal volume-preserving `--stretch` (`scale: X, 1/X`), cap `--tab-indicator-max-stretch` ~1.08, released at arrival | ✅ | ✅ | PRM → `--stretch` stays 1 (no deform); the glide still commits | compositor scale | `useLiquidFlex` (`squishLaw:"linear"`) → `--stretch` |
| BLOB (mid-flight inflation — the "wider-than-rest capsule" seed obs) | `--tab-blob` uniform inflation on `--ease-cartoon-punch` (anticipate → overshoot → settle) | ✅ | ✅ | PRM re-aliases cartoon-punch to no-overshoot | compositor scale | `.segmented-indicator` `scale: calc(--tab-blob × --stretch) …` |

**Mapping from measured spring (Arm 1 delivers the numbers) → house tokens:**

1. Arm 1 yields per-selection `(travel_ms, 2%-settle Ts, overshoot O%)` from the 60fps `bar60/` crops.
2. Derive `(response, ζ)`: `ζ ≈ −ln(O) / √(π² + ln²O)`; `response = 2π / ωₙ` where `Ts = −ln(0.02)/(ζ·ωₙ)`.
3. Match against `SPRING_PRESETS` (scheme-spring.css): **`snappy` (0.48s, ζ=0.74, ~+3.2%)** is the tab register.
   Candidates if the measure diverges: `press` (0.20s, ζ=0.80) for a very quick leg; `dock` (0.68s, ζ=0.64) for
   weighty. **Do NOT mint a new spring family** (the W-GLASS-CAL fence) — if the measure is within ~15% of `snappy`,
   ratify `snappy` and, if only the CLOCK differs, override `--tab-indicator-duration` (a duration retune is
   allowed; a new `linear()` family is not). If it diverges >15% from every row, the plan tunes the PRESETS table
   entry and re-runs `scripts/regen-spring-tokens.mjs` (the single source; never a hand `linear()`).
4. The mid-flight blob peak (video's wider capsule) sets `--tab-indicator-max-stretch` / `--tab-blob` peak (LOW cap
   — a loupe swells, never taffy-pulls).

### S5 — Accent tint swap timed to lens arrival (glyph/label → app accent as the lens settles)

| Channel | Mechanism | Chrome | Safari 26 | Honest-degrade | Perf | House primitive |
|---|---|---|---|---|---|---|
| Selected label/glyph ink → accent | `transition: color var(--duration-fast) ease` (bezier — motion-canon P1 EFFECTS), `aria-pressed`/`aria-selected` → `--foreground`/accent | ✅ | ✅ | color still swaps under PRM (not motion) | trivial | `.segmented-tab[aria-pressed]` color leg |
| Commit accent flood (EFFECTS-after-SPATIAL) | `--tab-flood-t` 0→1→0 radial `plus-lighter` wash, TRAILS the glide a beat then clears; `isolation:isolate` scopes it to the capsule | ✅ | ✅ | `--glass-accent: transparent` default → provable no-op | cheap (one `::after`) | `.segmented-indicator::after` flood (segmented-tabs.css) |
| Rim/glint accent | the S2 `--glass-accent` mix (rides the SAME arrival clock) | ✅ | ✅ | 0% no-op | static | W-GLASS-ACCENT |

Timing: the accent legs are the EFFECTS channel — they ride the fast bezier and are keyed to the SPATIAL glide's
settle (flood peak at ~arrival, color cross-fade over `--duration-fast`), so "the swap reads as part of the lens
arrival" (seed obs 4) is the existing `--tab-flood-t`-trails-the-glide seam. Compose, don't fork.

### S6 — Performance (the SOTA static-optics-during-flight question)

| Question | Answer |
|---|---|
| Cost of `backdrop-filter: url()` displacement per travel frame (Chrome, T2) | **Heavy** — the displaced backdrop re-rasterizes each frame as the box translates. Mitigate with `contain: layout paint` (or `contain: strict`) to BOUND the raster region (liquidGL's INP-preservation move). |
| Can we animate the displacement magnitude during flight? | **No.** `feDisplacementMap scale` is **not** CSS-`var()`-drivable (CSSWG issue **#542**); the house already learned this (DDR-LENS-BAKE — `scale='28'` baked, the var-spliced head/scale/tail never PARSED as a `backdrop-filter`). So **static optics during flight is FORCED, not a design choice** — the map + scale are baked, and the only per-frame cost is re-sampling the backdrop under the moving box. |
| Is "static optics during flight + full optics at rest" the SOTA move? | **Yes, and it is the only option.** Keep the baked optics constant, travel via compositor `translate` (cheap), `contain`-bound the raster, never re-bake the map per frame. Seed obs 5 (≤4 frames mid-flight) means travel is brief enough that even full-optics frames are ≤4 heavy frames — but `contain` keeps it safe. |
| Cross-engine T1 (clone loupe) cost | **Lower than T2** — the clone is a STATIC transformed layer; moving the pill's clip is compositor-cheap; `scale()` is baked; no live backdrop re-sample. `contain` bounds the clone paint. This is why T1 is the recommended cross-engine primary. |
| Do NOT | drop the filter to a cheaper look DURING fast travel and restore at rest — it risks a visible pop and is moot anyway (optics are baked). Keep them constant. |

---

## HONEST-DEGRADE SUMMARY (NF-EDICT COMPLIANCE)

Every degrade path is a **legitimately-lesser real surface**, never a fake of the working primary:

1. **T2 off `backdrop-filter: url()`** (Safari/Firefox) → `@supports` gate → the un-gated blur+tint base alone. No
   broken `url()` ref; no pre-baked "magnified" image; the pill is honest frost, not a fake loupe. (House floor,
   already shipped in `glass-refract.css`.)
2. **T1 clone loupe with a live-canvas backdrop** (Safari) → the backdrop isn't CSS-duplicable, so the loupe is
   ABSENT and the surface is the S1-T3 glass capsule. The constraint is RECORDED (the register degrades loud), not
   masked with a snapshot fake.
3. **PRM (both engines)** → squish/blob/glide-overshoot drop to no-overshoot; the color swap and the discrete
   selection still commit (the vestibular floor; fade-keeps/transform-drops, motion-canon P6).
4. **Pre-Safari-18.2 anchor absence** → JS-measured `useTabIndicator` glide (already the shipped fallback).

The one thing Safari 26 genuinely **cannot** do is refract an **arbitrary live-canvas** backdrop through the pill
(that is T2, Chrome-only). For the eyeglass-tabs register this is a non-issue when the stage backdrop is
CSS-expressible (gradient/image) — T1 gives Safari a real cross-engine loupe. The plan should therefore **stage the
register over a duplicable backdrop** so magnification is cross-engine, and reserve T2 as the Chrome-only
arbitrary-backdrop refinement.

## HOUSE PRIMITIVES TO COMPOSE (never fork)

- **Optics:** `.glass-lens` / `#glass-refract` map + `--glass-refract-bevel` (glass-refract.css) — re-point onto a
  **regular** `filter:` on a cloned-backdrop child for the cross-engine T1 loupe; keep the `backdrop-filter: url()`
  form `@supports`-gated for T2.
- **Plate/rim/specular:** `.glass-capsule` (+ `-track` + `-hover`, glass-capsule.css) · `rim.css` directional lit
  rim · `material.css` `::before` conic edge-glint + specular disc.
- **Chromatic:** `--glass-accent`/`--glass-accent-strength` (W-GLASS-ACCENT) · `--glass-ambient-hue` observer seam.
- **Travel:** `useTabIndicator` (center-anchored glide) · `useLiquidFlex` (`--stretch` squish) · `--tab-blob` /
  `--tab-flood-t` (segmented-tabs.css) · `--spring-snappy` + `--tab-indicator-duration` + `--ease-cartoon-punch`
  (scheme-spring.css).
- **Proud geometry / non-clip escape:** the `.glass-dock-frame[data-has-rail]` / `.dock-hairline-slot`
  box-inviolate escape (stack-rail.css) if the optics must paint beyond a chrome bar.
- **Perf fences:** `contain: layout paint` on the optics box · CSSWG #542 baked-scale (DDR-LENS-BAKE) ·
  `proof:no-layout-animation` (compositor-only travel).

## SOURCES

- WebKit bug 245510 — `backdrop-filter: url(#svg-filter)` not supported in Safari · https://bugs.webkit.org/show_bug.cgi?id=245510
- kube.io — Liquid Glass in the Browser (feImage/feDisplacementMap graph, two-map magnification, Chrome-only backdrop) · https://kube.io/blog/liquid-glass-css-svg/
- caniuse — CSS backdrop-filter · https://caniuse.com/css-backdrop-filter
- naughtyduk/liquidGL — cross-engine glass (Safari/Firefox frost but "can't bend the live page") · https://github.com/naughtyduk/liquidGL
- WebKit Features in Safari 26.0 (anchor positioning, plus-lighter, @property) · https://webkit.org/blog/17333/webkit-features-in-safari-26-0/
- CSS Anchor Positioning Baseline 2026 status · https://www.testmuai.com/learning-hub/css-anchor-positioning-browser-support/
- Repo: `src/styles/glass-refract.css` (DDR-LENS-BAKE / CSSWG #542), `src/styles/glass/{material,rim,glass-capsule}.css`, `src/styles/segmented-tabs.css`, `src/styles/dock/stack-rail.css`, `src/styles/tokens/scheme-spring.css`
