# RESEARCH ARM 3/3 — HOUSE-PRIMITIVE CENSUS (the eyeglass-tabs composition map)

> Read WITH `EYEGLASS-TABS-DIRECTIVE.md` (the constitution). This arm answers ONE
> question: **what already exists that the eyeglass register must COMPOSE (the
> no-fork law), where does each signature land, what is genuinely NEW (small), and
> which gates must stay green.** Read-only census; no `src/`/`demo/`/`scripts/` edit.

Verdict up front: the eyeglass tabs are **~90% already on disk** as composable
house primitives. The register is an **ADDITIVE mode on the ONE SegmentedTabs
engine** (compose `.glass-lens` + `.glass-capsule` + `--glass-accent` +
`--glass-ambient-hue` onto the pill indicator, retune the existing kinematic
tokens against the reference ladder) — NOT a new component, NOT a new engine, NOT a
new spring/clock. The genuinely NEW surface is: (a) the **proud-pill geometry**
(the indicator sits taller than its slot, static/compositor-only), (b) composing
`.glass-lens` onto the pill, (c) an optional per-instance **selected-ink accent**
opt-in, (d) an optional **ambient-hue observer** wire onto the strip. Everything
else is a token retune + a class compose.

---

## THE BINDING SAFARI CONSTRAINT (read first — it shapes every optic)

`backdrop-filter: url(#…)` is **Chromium-only** (WebKit bug 245510 open, Firefox
not shipping). **Safari 26 (July 2026) does NOT support it.** Therefore the seed's
signature #1 — "the backdrop content is MAGNIFIED/BENT through the pill" (real
refraction) — is a **Chromium-only enhancement**. `proof:lensing` L3 already
fences the whole `#glass-refract` graph behind `@supports (backdrop-filter:
url(#…))`; off that engine the surface paints the un-gated blur+tint base ALONE.

Per the **NO-MASKING-FALLBACK edict**: on Safari the pill degrades **HONESTLY** to
a lifted glass capsule (blur + tint + directional rim + specular glint + lift
shadow) with **no backdrop-displacement** — and the wave MUST NOT fake the
refraction with a gradient/overlay look-alike. The pill still reads unmistakably as
a proud liquid-glass loupe on both engines; only the backdrop-bending is
Chromium-exclusive. This is the load-bearing degrade posture the amendment must
state explicitly (the C18/π judge runs on Chromium for the refraction arm; the
Safari arm judges the honest blur+rim capsule).

Every OTHER signature (proud pill, rim, specular, accent hue, backdrop-hue steal,
kinematics/squish/blob/overshoot, drag-to-pull) is **real CSS on BOTH engines**.

---

## COMPOSITION MAP — per eyeglass signature

### 1 · The LENS (backdrop magnified/bent at the rim, thin interior)
| | |
|---|---|
| **Composes** | `.glass-lens` + `#glass-refract` SVG `feDisplacementMap` (squircle bevel `f(x)=⁴√(1−(1−x)⁴)`, Snell n₂=1.5, edge-concentrated crossed-gradient map) |
| **Exact site** | `src/styles/glass-refract.css` — `--glass-refract-filter` data-URI, `scale='28'` **BAKED**; `--glass-refract-bevel: 14%` knob; the whole decl inside `@supports (backdrop-filter: url("#glass-refract"))` |
| **NEW (small)** | Compose `.glass-lens` onto `.segmented-indicator` (the pill does NOT carry it today). Optional tab-scoped `--glass-refract-bevel` tune. **The `:active` press-swell is RETIRED (DDR-LENS-BAKE)** — `scale` is a baked literal, no `var()`-in-`url()` path exists; do NOT try to revive it (`proof:lensing` L1/L4 red it). |
| **Degrade** | Safari/Firefox → un-gated blur+tint base (honest; §Safari above) |
| **Gates green** | `proof:lensing` (L1 baked-data-URI, L2 squircle map, **L3 @supports floor**, L4 no lens-swell revival, L5 useSpecularPointer, **L6 GL-shader fence**) · `proof:no-masking-fallback` |

### 2 · The pill sits PROUD of the bar (crown/base overflow, taller than slot)
| | |
|---|---|
| **Composes** | `.segmented-indicator` position/inset + `--bouncy-track-trim` (`src/styles/segmented-tabs.css`). Today the indicator is INSET (`inset-block: var(--bouncy-track-trim)`) — a loupe RESTING ON the track is the inverse. |
| **Exact site** | `segmented-tabs.css` `.segmented-indicator` block; `--bouncy-track-trim` (0.1875rem→0.25rem@640) |
| **NEW (small)** | A proud-pill geometry: the indicator extends beyond the track block extent (a **static negative inset-block / a rest `scale`>1 on the block axis / an outset transform**). **Hard constraint:** `proof:no-layout-animation` carries the `size-morph-indicator-booked` allowlist entry for this exact indicator — a NEW **animated box dimension** off-list REDs. The proud crown must be a STATIC box reservation OR a compositor `scale`/`translate`, never an animated `height`/`inset`. |
| **Gates green** | `proof:no-layout-animation` (compositor-only; static reserve) · `proof:tabs-ios` T1 (the proud pill still reads `--radius-tab` stadium, no px-literal radius) |

### 3 · The RIM register (luminous refracted edge-light; hue-steals backdrop + accent)
| | |
|---|---|
| **Composes** | (a) `.glass-capsule` directional rim `box-shadow: var(--glass-rim-top), var(--glass-rim-bottom), var(--glass-shadow-floating)` (`src/styles/glass/glass-capsule.css`) — ALREADY composed by the pill; (b) the material `::before` specular hairline + angle-keyed edge-glint conic (`src/styles/glass/material.css`, `--glass-specular-core` / `--specular-angle` / `--glass-edge-glint-band`); (c) the per-instance chromatic-rim axis **`--glass-accent` / `--glass-accent-strength`** (`src/styles/tokens/property-regs.css` @property, mixed into `--glass-specular-core` in material.css); (d) the backdrop-hue steal **`--glass-ambient-hue` / `--glass-ambient-strength`** (`src/styles/tokens/glass.css` §BE.W-AMBIENT-TINT, written by `useGlassBackdropLuminance`) |
| **NEW (small)** | The rim is mostly already there (the pill composes `.glass-capsule`). To make the pill **steal backdrop hue** (seed #3, cyan-over-teal), wire `useGlassBackdropLuminance` onto the tab strip → this makes the tabs the **2nd binary consumer** of the observer (currently DEMO-PRIVATE, wired ON for the DOCK only), promoting it off demo-private (record the ≥2-consumer evidence). To make the rim read the **app accent**, set `--glass-accent`/`--glass-accent-strength` per-instance (a consumer PRESET — presets-in-consumers). Both are default-no-op at rest (`transparent`/`0%`). |
| **Gates green** | `proof:glass-accent` (W1 rim+catch-light oklab mix, W2 @property no-op floor, W3 ≥2 consumers + distinct-axis fence) · `proof:glass` (the dynamics/ambient arm) · `proof:register-ios` clause e (NO brand-red on interactive — the accent hue is a consumer preset, never `--viz-fourier`) |

### 4 · Selected INK tints to the app accent (cyan/teal); unselected stay white
| | |
|---|---|
| **Composes** | `.segmented-tab[aria-pressed="true"] { color: var(--foreground) }` (segmented-tabs.css — the selected label is warm-ink); the **`--tab-flood-t` accent-flood** already on the indicator `::after` (`--glass-accent` radial wash, `plus-lighter`, default `transparent` no-op) |
| **NEW (small)** | An OPT-IN per-instance selected-ink accent (a `--tab-selected-ink` reading `var(--glass-accent, --foreground)`) — **must preserve the AA floor**. |
| **Hard fence** | `proof:tabs-ios` **T5** requires the active label resolve `var(--foreground)` (the darkest ink, AA over the pill). `proof:register-ios` clause e forbids a saturated brand hue on an interactive selector. ⇒ the accent-ink is a **consumer preset** that must still clear AA; the LIBRARY default label ink stays `--foreground`. The teal read comes from the FLOOD + RIM (accent), NOT a library re-point of the label to a saturated hue. |
| **Gates green** | `proof:tabs-ios` T5 (label=`--foreground`) · `proof:register-ios` (no interactive brand-red) · `proof:no-gray` / `proof:menu-glass` |

### 5 · KINEMATICS (tap → travel+settle ~150–250ms; mid-flight squish/stretch; overshoot)
| | |
|---|---|
| **Composes** | `useTabIndicator.squishOnTravel` — the travel-squish `--stretch` (volume-preserving reciprocal) + the `--tab-blob` area-inflation (5-beat grow→overshoot→shrink), release-at-arrival (`src/components/custom/tabs/composables/useTabIndicator.ts`). Both channels ride the ONE clock **`--tab-indicator-duration` = `--spring-snappy-duration` (0.4s)**, the glide on `--spring-snappy` (overshoot to 1.031 @ ~18%), the blob on `--ease-cartoon-punch`. Tokens: `DEFAULT_INDICATOR_MAX_STRETCH 1.11` / `DEFAULT_INDICATOR_BLOB_MAX 1.045` / `INDICATOR_RELEASE_AT_ARRIVAL 0.82` (`constants.ts`); `--tab-indicator-max-stretch 1.11` / `--tab-indicator-blob-max 1.045` (`scale-paper.css`). PRM carve inside the composable. |
| **NEW (small)** | RETUNE the existing tokens (`--tab-indicator-max-stretch`, `--tab-indicator-blob-max`, and — if the reference is snappier — accept the clock stays `--spring-snappy-duration`) to MATCH the bar60/ reference kinematic table. **NO new spring/clock** (W-GLASS-CAL fence — the per-spring duration clock is generated, read-only). The reference table (per-frame x/width/height/overshoot from the 60fps `bar60/` crops) becomes the wave's binding criteria. |
| **Gates green** | `proof:tabs-std` (clock reads `--tab-indicator-duration`, release-at-arrival, volume-preserving `--stretch`, cap ≤1.2, PRM-gated, no `--duration-normal` on glide) · `proof:tabs-ios` **T4** (engine fence: cap constant==token in [1.0,1.2], `INDICATOR_RELEASE_AT_ARRIVAL=0.82` byte-frozen, clock=`--spring-snappy-duration`) · `proof:liquid-tab` (LT2 visible-blob cap, LT3 no-second-engine on the `snappy` row) · `proof:glass-cal` (spring fence) · `proof:no-layout-animation` (compositor-only) |

### 6 · Drag-to-pull (bonus — the pill is a grabbable lozenge)
| | |
|---|---|
| **Composes** | `useTabDragMorph` → `useDragMorph` (kf `Draggable` + `SpringProgress` + `useLiquidFlex`, fling-to-nearest), armed by the `motion` axis (`full`) on `SegmentedTabs`; `.glass-drag-grabbable`/`.glass-drag-lift` affordances (segmented-tabs.css) |
| **NEW** | Nothing — the drag is already shipped + gated. The eyeglass register inherits it for free (the loupe you can pull). |
| **Gates green** | `proof:liquid-tab` (LT1 pull-is-default, LT5 additive-a11y WCAG 2.1.1) · `proof:drag-morph` |

---

## THE π INSTRUMENT (the kinematic frame-series — already built, 17.7)

The directive's π = a **LIVE-GESTURE 60fps frame-series judged against the bar60/
reference ladder** (the IOS27-MOTION-TRUTH blind-spot rule: never a settled still).
The instrument is already on disk:

- **`scripts/lib/gesture-frame-recorder.mjs`** (BG.W-GESTURE-FRAME-RECORDER, 17.7 —
  a `proof:meta` clause, NOT a standalone gate). Pure device-free core: `frameSchedule`
  (deterministic clock) · `frameDeltas`/`travelSpan` · `motionVerdict` (a dead
  snap / settled-still-only series REDs) · `settledVerdict` (tail rests at endpoint) ·
  `overshootVerdict` (the iOS-27 bounce; monotone arrival ≠ false-fire) ·
  `gestureFrameVerdict` (composite `liquid`) · `recordFrameSeries` (composes the ONE
  `reflect-capture-verify.pngRegionStats` decoder — no 2nd PNG decoder).
- **C18 `?capture=<route>&mode=<light|dark>`** (`demo/main.ts`) captures ONE settled
  still — the settled-still blind spot the recorder closes. The eyeglass π needs a
  DRIVEN frame-series (pointer injection + a `renderAt` frame protocol) reduced by the
  recorder and judged (MOTION-present + SETTLED + OVERSHOOT) against the `bar60/`
  reference kinematics + optics, both engines, both modes.
- The tabs route already stages over a **live aurora** (`demo/stories/navigation/tabs.vue`;
  manifest `CATEGORY_DEFAULT_BG.navigation = "aurora"`), so refraction has a real
  backdrop to bend (the DockStage precedent — one GL context per route).

---

## GATE-CONTRADICTION MATRIX (what the amendment MUST NOT break)

| Gate | The lock the eyeglass wave must respect |
|---|---|
| `proof:tabs-std` | ONE engine, two materials; glide on `--tab-indicator-duration`; volume-preserving `--stretch`; cap ≤1.2; center-anchored; no `--duration-normal` on the glide; underline paints NO plate |
| `proof:tabs-ios` | T1 stadium `--radius-tab` (no px radius literal); T2 pill = tinted-floating via `.glass-capsule`; T3 no dark `--border` ring; **T4 engine byte-fence** (cap lockstep [1,1.2], `RELEASE_AT_ARRIVAL=0.82`, clock=`--spring-snappy-duration`); **T5 active label=`--foreground`** |
| `proof:lensing` | **L3 @supports floor** (refraction never outside the gate); L1/L4 no revived `var()`-spliced scale / lens-swell; **L6 GL-shader fence** (the lens is SVG `backdrop-filter: url()`, ZERO aurora.frag/metaball.frag/webgl edit) |
| `proof:liquid-tab` | LT1 pull-is-default; LT2 blob-visible cap (composed area ≤~1.14); LT3 no second engine (the `snappy` SPRING_PRESETS row); LT5 drag ADDITIVE to the a11y contract (WCAG 2.1.1, click/keyboard byte-unchanged) |
| `proof:no-layout-animation` | Compositor-only; the indicator's `size-morph-indicator-booked` allowlist entry stays — a NEW animated box dimension (proud-pill height/inset) off-list REDs. Proud geometry must be static-reserve or transform |
| `proof:glass-accent` | Rim/glint accent is the oklab per-instance axis; @property no-op floor at rest; ≥2 consumers; NEVER writes the `--glass-tint-*` plate cohort |
| `proof:register-ios` | Clause e — NO `--viz-fourier`/brand-red color/bg/fill/accent on ANY interactive-state selector. The eyeglass accent is a consumer PRESET hue, not a library interactive re-point |
| `proof:glass-cal` | The per-spring `--spring-<name>-duration` clocks are generated, read-only — no new spring/clock; consume the calibrated clock |
| `proof:no-masking-fallback` | Safari lens degrade is HONEST (blur+tint+rim, no faked refraction); primary works in paint or fails loud |
| `proof:motion-one-clock` / `proof:no-gray` / `proof:menu-glass` | one-clock discipline; warm-chroma floor; AA legibility over the tinted pill |

---

## KEY FILE / TOKEN / COMPOSABLE INDEX (verified on disk, HEAD)

- SFC: `src/components/custom/tabs/SegmentedTabs.vue` (composes `.glass-capsule` +
  `.glass-capsule-track` + `.glass-capsule-hover`; `motion` axis; `select()`→`squishOnTravel`)
- Engine: `src/components/custom/tabs/composables/useTabIndicator.ts` (squish + blob,
  release-at-arrival) · `useTabDragMorph.ts` (drag) · `useTabRovingFocus.ts` · `useTabResponsive.ts`
- Constants: `src/components/custom/tabs/constants.ts` (`DEFAULT_INDICATOR_MAX_STRETCH=1.11`,
  `DEFAULT_INDICATOR_BLOB_MAX=1.045`, `INDICATOR_RELEASE_AT_ARRIVAL=0.82`)
- CSS: `src/styles/segmented-tabs.css` (`.segmented-tabs` track, `.segmented-indicator`
  pill, `--bouncy-track-trim`/`--bouncy-slider-radius`, `--tab-flood-t` accent-flood,
  `.glass-drag-*`) · `src/styles/glass/glass-capsule.css` (the ≥3-consumer lifted-plate
  register) · `src/styles/glass-refract.css` (the lens) · `src/styles/glass/material.css`
  (specular core + edge-glint + `--glass-specular-core` accent/ambient mix)
- Tokens: `src/styles/tokens/scale-paper.css` (`--tab-indicator-*`) ·
  `src/styles/tokens/scheme-spring.css` (`--spring-snappy` + `--spring-snappy-duration=0.4s`) ·
  `src/styles/tokens/property-regs.css` (@property `--glass-accent`/`--glass-accent-strength`,
  `--specular-angle`) · `src/styles/tokens/glass.css` §BE (@property `--glass-ambient-hue`/`-strength`)
- Observer: `src/composables/glass/useGlassBackdropLuminance.ts` (writes `--glass-ambient-hue`;
  DEMO-PRIVATE, dock-only wired today — the 2nd-consumer promotion path for the hue-steal)
- Accent-rim leaf: `src/composables/glass/useSpecularPointer.ts` (wraps `createSpecularWriter`,
  writes `--specular-angle`; on the `/glass` barrel)
- Gates: `scripts/proof-tabs-std.mjs` · `scripts/proof-tabs-ios.mjs` ·
  `scripts/proof-lensing.mjs` · `scripts/proof-liquid-tab.mjs` ·
  `scripts/proof-no-layout-animation.mjs` (indicator allowlist ~L199) ·
  `scripts/proof-glass-accent.mjs` · `scripts/proof-register-ios.mjs`
- π instrument: `scripts/lib/gesture-frame-recorder.mjs` (proof:meta clause 17.7) ·
  C18 `demo/main.ts` `?capture=` · reference `bar60/t{1..4}-NN.png` (220 crops), `frames/` (389)

---

## WHAT IS GENUINELY NEW (the whole delta — deliberately small)

1. **An additive eyeglass mode/register on `SegmentedTabs`** (a variant value, a
   boolean axis, or a `data-` preset) that COMPOSES `.glass-lens` onto the pill +
   opts the pill into the proud geometry + the accent/ambient rim. Not a component,
   not an engine.
2. **The proud-pill geometry** — a STATIC (or compositor-transform) outset so the
   loupe rests ON the track taller than its slot (respecting the no-layout-animation
   allowlist).
3. **`.glass-lens` composed onto `.segmented-indicator`** (Chromium refraction;
   honest Safari degrade).
4. **Optional selected-ink accent + ambient-hue wire** (per-instance presets; the
   ambient wire promotes `useGlassBackdropLuminance` to its 2nd binary consumer).
5. **A recalibration of the kinematic tokens** to the bar60/ reference (no new
   spring/clock), + the reference kinematic table as binding criteria.
6. **The wave gate** (`proof:eyeglass-tabs`-class, device-free + self-test bites) +
   the π (a driven 60fps frame-series through `gesture-frame-recorder.mjs`, judged
   against bar60/ on Chromium refraction + Safari honest-capsule, both modes).
