# BG.W-EYEGLASS-TABS — dual-engine PAINT DELTA (the iOS-27 eye-glass tabs)

> **VERDICT: PASS** (dual-engine, both modes). Non-authoring paint judge (F8.3 stand-in) against the wave-spec §5
> π bands + the `bar60/` reference ladder. Built at `b4c1998c` (device-free `proof:eyeglass-tabs` GREEN,
> `vue-tsc` clean). Judged 2026-07-11. Captures + `verdict.json` in `BG.W-EYEGLASS-TABS-paint/`.

## Provenance (decoded in-pixel, both arms)

- **Chromium:** `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)` — Chrome 150, **real Metal GPU** (CDP `:9333`
  → `demo:dist:serve :5200`).
- **Safari:** system `WebKit.framework` (Safari-26 engine), **Apple GPU**, `1440×900 @2×`, badge decoded in the
  snapshot (`ENGINE WEBKIT · GPU Apple GPU · 1440×900 @2x`).

## The instrument (the DRIVEN 60fps series — AC3, built by the judge)

The AC3 WAAPI-seek driving half was unbuilt on disk (only the 17.7 reducer shipped). Built here
(`drive-series.mjs` + `squish-poll.mjs` + the Safari `wkshot-eyeglass{,-busy}.m` harnesses): pointer-inject the
select → the glide is a real CSS `transition` on the anchor `top/bottom/left/right` inset longhands + `scale`,
**WAAPI-seekable** (`getAnimations().currentTime = i·16.667ms`, paused, forced repaint of the `backdrop-filter:url()`
raster) → `getBoundingClientRect` gives the **ground-truth centre-x per seeked frame** (more faithful than a
jitter-prone PNG centroid) → fed to `scripts/lib/gesture-frame-recorder.mjs`. **Caveat (recorded):** the
`--stretch` squish is JS-driven (rAF release-at-arrival), NOT a pure CSS transition, so WAAPI-seek freezes it —
the **squish** is measured by NATURAL-playback polling of computed `scale`/`--stretch`; the **glide** by seek.
144 driven frames committed (T2/T3/T4 × light/dark), 24 frames each.

---

## ARM A — CHROMIUM REFRACTION (both modes)

### Signature #1 — refraction (make-or-break): **PASS**
Over a busy diagonal-stripe backdrop the stripes are **DISPLACED / warped THROUGH the pill** (both modes;
`chrome__refract_busy_strip_{light,dark}.png`, `chrome__refract_busy_eyeglass_light.png`) while the rest of the
strip only BLURS them — the shipped `.glass-lens` `backdrop-filter: blur(13px) saturate(1.6) url(#glass-refract)`
(baked `scale=28` squircle bevel) **physically bends on real Metal** (the NF "primary works in paint" proof).
Over the CALM demo aurora (a 52%-opaque `glass-card` + a near-flat aurora) the read is the honest **calm arm** —
a proud glass loupe with a thin refractive outline + specular top-crown, little to bend (accepted by the wave;
§5.3 judges calm↔busy against the static bucket).

### Signature #3 — kinematics (glide + squish + overshoot): **PASS**
Ground-truth cx series through `gesture-frame-recorder.mjs`, identical light/dark:

| gesture | travel | overshoot% (fires) | tail dev | recovery | t90 | 2%-settle | liquid | transit |
|---|---|---|---|---|---|---|---|---|
| T2 (1-slot) | 101px | **2.75%** ✓ | 0px | 1 frame | 50ms | 100ms | ✓ | — |
| T3 (2-slot) | 202px | **2.76%** ✓ | 0px | 1 frame | 50ms | 100ms | ✓ | **body covers middle tab, no fade** ✓ |
| T4 (1-slot) | 101px | **2.76%** ✓ | 0px | 1 frame | 50ms | 100ms | ✓ | — |

- **overshoot** ∈ [2%,9%] ✓ (2.75-2.76% — snappy ζ=0.74's ~3.2% analytic, the ratified house identity; the
  reference's 8% is the accepted divergence).
- **continuous transit** ✓ — the ~113px pill BODY covers the List centre across frames 1-2 as the centre leaps
  83px/frame (snappy front-load); a single translating box, no fade-out/fade-in.
- **settle** to the exact endpoint (tail deviation 0px) ✓.
- **squish** (natural playback): T3 composed core-width peak **1.1015×** ∈ [1.10,1.15] ✓, **releases to rest
  (1.0×) at settle** ✓; T2/T4 1.073× (velocity-driven, proportionally less — correct); peak `--stretch` 1.054,
  honors the composed anti-taffy cap ≤1.14.

### Signature #2 — proud loupe (static): **PASS (with note)**
`indH 35.69px` vs the tab-slot band (31px content region) = **1.15×** ∈ [1.14±0.03] ✓; **1.48×** the
non-eyeglass pill; the reservation is **static** (block extent varies only 1.49px in flight = compositor `scale`,
never an animated box dimension — `no-layout-animation` holds). **Note:** the pill reads proud vs the *slot* but
sits WITHIN the 39px frosted strip capsule (crownSpill −1.66px vs the strip border-box; the strip carries 4px
padding) — it does not reproduce the reference's dramatic *bar*-overflow.

### Signature #6 — selected ink (contrast-split): **PASS**
Selected GLYPH tints cyan `oklch(0.86 0.15 205)` via `--tab-selected-ink` on the descendant `svg` (AC4); the
LABEL stays warm-ink `var(--foreground)` (`rgb(28,25,23)` light / `rgb(233,230,226)` dark) — the AA 4.5:1 / 3:1
split holds. **Note:** the cyan glyph swaps to the destination tab at click (frame 0), not arrival-trailed.

### PRM & perf
- **PRM:** `--stretch` → 1 (no squish), the glide still commits, static optics (proud + rim + tint) KEPT ✓.
- **Perf (4×-CPU, AC6):** 0 long-tasks >50ms, max frame 47ms (<50), median 26.9ms, **1 dropped frame (≤1 band)** ✓
  CPU-side. GPU-side mid-tier-mobile refraction cost is a desktop-emulation limitation; AC6 degrade-to-capsule
  booked. **Note:** the pill computes `contain: none` (relies on the backdrop-filter stacking context, not the
  explicit `contain: paint` recommended in §1.2 C8; not `contain: layout` → `no-layout-animation` safe).

---

## ARM B — SAFARI-26 HONEST DEGRADE (AC1 — the linchpin): **DECISIVE PASS**

The AC1 concern is REAL and empirically confirmed: **`CSS.supports('backdrop-filter','url("#glass-refract")')`
returns `TRUE` on Safari 26** (WebKit bug 245510) → the pill ENTERS the `.glass-lens` block. **The
belt-and-suspenders works:** the resolved backdrop-filter is **`blur(13px) saturate(1.6)`** (light) /
**`blur(13px) saturate(1.28) brightness(1.1)`** (dark) — the FLOATING frost rung — + a **no-op `url()`**.

The busy-backdrop test (`safari__refract_busy_{light,dark}.png`) is decisive:
- the strip + pill **FROST (blur) the stripes** (softened/muted inside vs crisp outside) → **`blur(13px)` PAINTS**;
  the invalid `url()` does NOT nuke the whole backdrop-filter (**not** "tried-and-painted-nothing");
- the stripes are **BLURRED, NOT displaced/warped** → the `url()` harmlessly no-ops → **NO faked bend**;
- **proud lands via the anchor path (C3):** `1.114×` the slot — Safari is a **proud** frosted capsule, NOT a flat
  one;
- cyan glyph + warm-ink label (contrast-split) hold on Safari, both modes.

This is a real, legitimately-lesser glass surface making NO loupe claim — exactly the reference's own calm-backdrop
state. **NO-MASKING-FALLBACK satisfied.**

---

## RECORDED DIVERGENCES (all bounded, all within the wave's accepted-divergence framework)

1. **TIMING** — house glide t90 ~50ms / 2%-settle ~100ms is **FASTER** than the §5.3 reference band
   ([110-200ms / 200-320ms]). The ratified frozen-clock "quick-but-weighty" snappy; the RECORDED residual per
   §0/§6/AC8 (clock frozen by T4), **not converged-on**, not a fail.
2. **DEMO STAGING** — the eyeglass is staged over a calm near-flat aurora inside a 52%-opaque `glass-card`, so the
   SHIPPED demo shows the subtle calm-arm read. The refraction mechanism is proven on a busy field; a busier demo
   stage would show off signature #1 (a demo-side choice, not a mechanism defect). *(Top recommendation for a
   demo polish pass, if the orchestrator wants the shipped demo to read the loupe more dramatically.)*
3. **PROUD vs STRIP** — proud vs the slot (1.15×) but contained within the 39px frosted strip capsule (the strip's
   4px padding); does not overflow the outer strip edges like the reference's bar.
4. **GLYPH-INK TIMING** — the cyan glyph swaps at click (frame 0), not arrival-trailed (§1.4).
5. **CONTAIN** — pill `contain: none` (not the explicit `contain: paint` §1.2 recommended; safe vs `no-layout-animation`).
6. **AMBIENT OBSERVER** — calm↔busy judged against the STATIC `--glass-backdrop` bucket (the live sample path is
   DEAD on disk per C1 — correctly BOOKED, not promoted).

None of (1)-(6) falsify the make-or-break signatures or the cross-engine promise.

## Cross-checks
- `proof:eyeglass-tabs` (device-free): **PASS** (E1-E6 + self-test bites).
- `vue-tsc`: **clean** (exit 0, 0 errors; the judge made ZERO `src/` edits).
- siblings-intact tripwire: GREEN before + after.

## Gate matrix (kept green, verified in paint)
`tabs-ios` T1 stadium radius (proud is a `rem` outset, not a px radius) · T3 top-edge LIGHT (no painted dark
inset; the Chromium dark rim is refraction only) · T5 active LABEL=`--foreground` · `lensing` L3 refraction
inside the `@supports` gate / L6 GL-shader fence (the SVG asset composed, no shader edit) · `no-layout-animation`
(static proud reservation, compositor-only glide/squish) · `no-masking-fallback` (Safari honest capsule) —
all consistent with the observed paint.

## PASS rationale
The whole-gesture gestalt reads as **ONE iOS-27 eye-glass loupe, not a colored pill**, on both engines and both
modes: Chromium refracts (proven on real Metal), Safari degrades honestly to the proud frosted capsule, the
snappy glide slides continuously through the intermediate tabs with an arrival-released squish + a ~2.75% overshoot,
the accent flows the cyan glyph while the label stays warm-ink, and the ~1.15× proud crown/base clears the slot.
The timing residual and the calm-demo-staging are recorded, bounded, and explicitly within the wave's
accepted-divergence framework.
