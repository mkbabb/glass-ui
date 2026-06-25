# RESEARCH-TARGET (fix2) — the DARK-MODE goo bridge: warm luminous transmissive glass, not a gray-brown halo

The CORRECT design target the fix2 dark-mode pass must hit. This EXTENDS the confirmed
root-cause (do NOT re-derive it) — it does not re-open the four headline defects (Safari /
slow / does-not-morph / AWFUL), which JUDGE-3 verified RESOLVED. The ONE blocker is the
**dark-mode gestalt**: the goo masses + neck composite to a dim warm-gray / gray-brown HALO
around the slide (effective L ≈ 0.31 over the dark aurora) instead of the luminous warm
transmissive glass the W-DARK-MATERIAL register demands.

North star (binding): `design.md §L1` (the six-layer optical composite, the 7 glass tiers,
warm-cream identity) + `CLAUDE.md` §"The warm-chroma floor" (BA.W-NO-GRAY) + §"The dark
register as a luminous transmissive material" (BA.W-DARK-MATERIAL) + the `--glass-tint-*`
adaptive seam + `[[feedback-liquid-weight-universal]]` (inertia/weight/bounce/squish on ALL
motion). NO legacy, idiomatic, gestalt, compositor-only, PRM-carved, **Safari-safe**.

---

## 0. THE CONFIRMED ROOT CAUSE (extend, do not re-derive)

In `.carousel-goo-layer` (and `.deck-goo-layer`) the goo medium is set ONCE on the layer:

```css
color: color-mix(in oklab, var(--card), white 8%);   /* the `currentColor` the plates/worm read */
```

The plate + worm `radial-gradient` read that `currentColor`:

```css
background: radial-gradient(120% 90% at 50% 18%,
    color-mix(in oklab, currentColor, white 18%),   /* the domed catch-light */
    currentColor 70%);
```

- **Light mode** — `--card` = `hsl(30 85% 96%)` → OKLab L ≈ 0.976, warm-cream. The fill
  resolves L ≈ 0.98, warm; composited it reads as a warm-cream luminous bridge. **FINE.
  DO NOT REGRESS IT** (950ms morph, clears to opacity 0 at rest).
- **Dark mode** — `--card` = `hsl(26 22% 17%)` → OKLab L ≈ 0.16. The `white 8%` mix lifts it
  only to L ≈ 0.35; the worm catch-light (`white 18%` over that) tops out ~L 0.47. Composited
  at the `0.55` layer-opacity over the dark aurora (page L ≈ 0.12) the masses land at
  **effective L ≈ 0.31** — a **dim TAUPE / GRAY-BROWN HALO/FRAME** around the slide.

The chroma metric clears the BA.W-NO-GRAY floor (live readback: C 0.0163, H 59°) — but **the
gestalt is the bar, not the metric.** At L 0.31 over a dark backdrop the perceptual read is
muddy, and it carries NO luminosity-lift / transmissive companion (the dark register is a flat
dark fill, not lit glass). This is exactly the "gray" the user flags relentlessly.

THE DEEPER CAUSE: `white N%` is the WRONG lift vector in dark mode. Mixing toward `white`
moves the OKLab point toward NEUTRAL (it desaturates as it lightens — it bleeds chroma toward
gray). To stay warm WHILE lifting luminance you must mix toward the **warm dark-ink**
(`--foreground` / the `--glass-tint-ink` register), not toward `white`. The `white N%` light-mode
mix happens to read warm only because `--card` is ALREADY near-white-and-warm there; in dark
mode the same operator produces a desaturated taupe. (The BA.W-DARK-MATERIAL dark `--card`
itself warms in lockstep — but the goo's `white 8%` mix neutralizes that warmth on the way up.)

---

## 1. THE BINDING REGISTER — BA.W-DARK-MATERIAL "luminous transmissive dark glass"

The library already promulgates the EXACT register the dark goo must join. From CLAUDE.md
§"The dark register as a luminous transmissive material" — the dark glass system is a
**luminous-dark transmissive material**, the mirror of the light register's richness, NOT a
charcoal slab on a dead void. Three of its six dark-arm mechanisms are the goo's north star:

1. **The dark tint-seam arm (scope 3).** In dark, `--glass-tint-ink` resolves the light-cream
   `--foreground` (`hsl(30 14% 90%)`, OKLab L ≈ 0.90, warm). The W55 self-engage re-point
   becomes a gentle **LIFT toward a luminous translucent dark** (the mirror of the light
   darken) at a bounded `--glass-tint-strength-aa: 12%`. → **The dark goo fill must lift toward
   THIS warm-cream ink, not toward neutral white.**
2. **Transmissive dark glass (scope 2).** The dark `--glass-blur-*` arm carries a
   **`saturate(1.22–1.35) brightness(1.06–1.18)`** luminosity-lift COMPANION (the iOS-dark
   "dark glass glows where light passes" model) so a backdrop GLOWS through. → **The dark goo
   layer must carry the transmissive `saturate()/brightness()` companion so its warm chroma
   reads as LIT glass, not a flat fill.**
3. **The dark edge as the primary silhouette device (scope 2).** `--glass-edge-light-dark` α
   lifts 0.10 → 0.22 — the dark register carries the plate on its EDGE + TRANSMISSION, where
   the light register carries it on FILL + SHADOW. → the goo bridge is read by its glowing warm
   membrane + the aurora transmitting through, not by an opaque taupe plate.

The dark `--glass-tint-ink-dock` token already encodes the precise warm-ink lift:
`oklch(from var(--foreground) 0.90 0.045 h)` — L 0.90, chroma 0.045, the `--foreground` warm
hue. That is the elevation register the dark goo masses must read AT THE COMPOSITED level.

---

## 2. THE TARGET — what the dark goo bridge SHOULD look like

### 2a. The luminosity target (the headline number)

The dark goo masses, **composited at the `0.55` (carousel) / `0.62` (deck) layer-opacity over
the dark aurora**, must read **ABOVE L ≈ 0.5** — a GLOWING warm membrane, the dark aurora
visibly glowing THROUGH it. Not the current effective L ≈ 0.31.

Working back through the compositing math (a warm fill at opacity α over a backdrop at
L_bg ≈ 0.12, source-over): to land the composite ABOVE L 0.5 the **raw goo fill luminance must
sit at ~L 0.62–0.70** before the layer opacity. That is the W-DARK-MATERIAL elevation register
— the same L 0.90 `--foreground`-cream pulled down a register for the membrane, NOT the L 0.35
the `white 8%` mix currently produces.

| | current dark fill | target dark fill |
|---|---|---|
| OKLab L (raw, before layer opacity) | ≈ 0.35 (worm catch-light ≈ 0.47) | **≈ 0.62–0.70** |
| OKLab L (composited @ 0.55 over L 0.12 aurora) | ≈ 0.31 (muddy taupe) | **≥ 0.5** (glowing warm membrane) |
| OKLab hue H | 59° (warm — OK) | **55–70°** (the `--foreground`/`--primary` warm-ink family) |
| OKLab chroma C | 0.0163 (clears floor, but flat) | **well above the BA.W-NO-GRAY STRONG floor 0.020** at this mid-L; lit by the transmissive companion |
| transmissive companion | NONE (flat dark fill) | **`saturate(1.22–1.35) brightness(1.06–1.18)`** on the dark goo filter — the dark-glass-glows-where-light-passes register |

### 2b. The tint VECTOR (the no-gray discipline — the load-bearing correction)

The dark fill lift MUST be toward the **warm dark-ink** (`--foreground` / the
`--glass-tint-ink` warm-cream register at OKLab hue 55–70°), NOT a gray `white N%` mix. A
`white N%` mix only DESATURATES toward neutral as it lightens — it is the gray-maker. The
`.dark` arm on the goo `color` re-points the fill to mix `var(--card)` toward
`var(--glass-tint-ink)` (= the warm light-cream `--foreground` in dark), so the masses lift
luminance WHILE GAINING warm chroma. Keep the OKLab hue 55–70 and chroma comfortably above the
BA.W-NO-GRAY STRONG floor (0.020) — the masses read warm-amber MATERIAL, never taupe.

> This mirrors the W-DARK-MATERIAL tint-seam exactly: where the dark glass plate lifts toward
> `--glass-tint-ink` (the warm cream) at a bounded strength, the dark goo membrane lifts toward
> the SAME ink — the goo joins the established dark register, it does not invent one.

### 2c. The transmissive companion (the "lit glass not flat fill" register)

A flat warm fill at L 0.65 is still a FLAT PLATE — it does not yet read as GLASS. The
W-DARK-MATERIAL transmissive arm is the missing layer: a `.dark` arm on the goo layer's
`filter` adds a **`saturate(1.22–1.35) brightness(1.06–1.18)`** lift (the EXACT dark-arm
companion band CLAUDE.md scope 2 promulgates) so the warm chroma reads as LIT glass with the
colorful aurora glowing through. CONSTRAINTS:

- The `saturate()/brightness()` rides the goo layer's `filter` (or the worm/plate fill),
  COMPOSED WITH the existing static `url(#glass-goo)` — `filter: saturate(1.3) brightness(1.12)
  url(#glass-goo)` (the metaball merge graph is preserved; the literal `stdDeviation` /
  `feColorMatrix` are UNTOUCHED — no var-driven blur, sRGB interp, region -50%/200% all stand).
- **NEVER `backdrop-filter: url()`** (WebKit bug 245510) and NEVER a var-driven `stdDeviation`
  (the WebKit-broken/slow class). The transmissive lift is a plain `saturate()/brightness()`
  CSS-filter function on the OPAQUE goo layer, Safari-native.
- Light mode is UNTOUCHED — the companion is a `.dark`-only arm; the light goo stays the bare
  `url(#glass-goo)`.

### 2d. The gestalt bar (the human/π verdict — the bar, not the metric)

In BOTH light AND dark mode the two masses + the neck must read as a **DECISIVE
blob↔meatball merge welling WARM GLASS across the gap** (the Google Gemini carousel reference) —
glassy / transmissive, with the colorful aurora glowing THROUGH the membrane. NEVER a
charcoal / taupe halo, NEVER a flat plate. The JUDGE reproduces a REAL `Next.click()` in DARK
mode, screenshots a mid-morph frame, and judges it AS A USER: a dim / muddy / gray dark halo is
an automatic FAIL no matter what the C ≥ 0.010 metric says.

---

## 3. THE TRAVEL-GATE HARDEN (the from===to desync — keep the morph from dropping)

JUDGE-3 §1c CAVEAT: `markTraveling` is gated on the locally-tracked `activeIndex` via a
`from === to` early-return. A fast double-advance (or any path that pre-updates `activeIndex`
before `select` fires) silently drops the goo — the morph never engages. The target: key the
travel gate off **embla's own truth** —
`api.selectedScrollSnap() !== api.previousScrollSnap()` — rather than the locally-tracked
`activeIndex`, so rapid real swipes never drop the morph. (Structural correctness, not a
gestalt knob, but it is part of the fix2 scope: a goo that silently doesn't fire reads as
"broken" to the user.)

---

## 4. THE PRECISE CHANGE SURFACE (compositor-only, both files)

Both `CarouselContent.vue` (`.carousel-goo-layer` + plate/worm) AND `deck.vue`
(`.deck-goo-layer` + plate/worm) carry the identical defect and take the identical `.dark` arm.

| # | Surface | Change | Class |
|---|---|---|---|
| 1 | `.dark .carousel-goo-layer` / `.dark .deck-goo-layer` `color` | lift the dark goo fill to the W-DARK-MATERIAL warm-ink elevation register — `color-mix(in oklab, var(--card), var(--glass-tint-ink) N%)` tuned so the raw fill lands OKLab **L ≈ 0.62–0.70, hue 55–70, C > 0.020** (NOT a `white N%` neutral mix) | `.dark` color arm, compositor-only (paint) |
| 2 | `.dark .carousel-goo-layer` / `.dark .deck-goo-layer` `filter` | add the transmissive companion — `filter: saturate(1.3) brightness(1.12) var(--…-goo-filter, url(#glass-goo))` (the W-DARK-MATERIAL dark-glass-glows companion; the static `url(#glass-goo)` graph preserved; never backdrop-filter:url, never var-driven stdDeviation) | `.dark` filter arm, Safari-native |
| 3 | carousel travel gate | key `markTraveling` off `api.selectedScrollSnap() !== api.previousScrollSnap()`, not the locally-tracked `activeIndex` | structural (the from===to desync) |

**Fences (binding):**
- Light mode BYTE-UNCHANGED — every arm above is `.dark`-scoped; the light goo (L ≈ 0.98 warm
  cream, 950ms morph, opacity 0 at rest) is the un-regressed ground.
- The static `#glass-goo` filter is UNTOUCHED (sRGB interp, literal `stdDeviation` /
  `feColorMatrix`, region -50%/200%, no var-driven blur). The transmissive companion COMPOSES
  with it on the `filter:` shorthand — it does NOT replace it.
- NEVER `backdrop-filter: url()` (WebKit 245510); NEVER a var-driven `feGaussianBlur
  stdDeviation` (the WebKit-broken/slow class).
- NO new spring / clock / color token; the warm-ink register reads the SHIPPED
  `--glass-tint-ink` / `--foreground`. The morph timing (950ms light, the spring flow curve,
  the squish) is untouched — this is a COLOR + TRANSMISSION fix, not a motion re-tune.
- PRM-carved stays — the goo layer is `display:none` under `prefers-reduced-motion: reduce`
  (the worm snaps), so the dark arm never paints under reduce; the embla/deck cross-fade floor
  survives.
- The `@supports not (filter: url(#glass-goo))` floor stands; the transmissive companion is
  pure `saturate()/brightness()` (no `url()`), so even on a gap engine the warm fill reads.

---

## 5. ACCEPTANCE BAR (the binding gestalt + machine checks)

A fix2 PASSES iff ALL hold (verified on Chromium AND WebKit/Safari; the DARK arm is the
headline — a REAL `Next.click()` in dark mode, a mid-morph frame, judged AS A USER):

### Gestalt (the human / π verdict — THE BAR)
- [ ] **G1 — dark goo reads as luminous warm glass.** On a real click in DARK mode, a mid-morph
  frame shows the two masses + neck as a GLOWING WARM membrane welling across the gap, the dark
  aurora visibly glowing THROUGH them. NOT a dim / muddy / gray-brown / taupe halo or frame.
  **A charcoal / taupe halo is an AUTOMATIC FAIL no matter the metric.**
- [ ] **G2 — the decisive blob↔meatball merge holds (both modes).** The neck wells up, bridges
  the outgoing→incoming plate, then pinches off — the Gemini "morph blob and meatball" read, in
  BOTH light and dark. Not a hard cut, not a flat plate, not two unrelated masses.
- [ ] **G3 — light mode un-regressed.** Light goo still reads warm-cream luminous (L ≈ 0.98),
  the 950ms morph, opacity 0 at rest. Byte-identical to the JUDGE-3-passing ground.
- [ ] **G4 — warm identity holds (both modes).** The masses are warm MATERIAL at OKLab hue
  55–70, NEVER gray / charcoal / taupe. (BA.W-NO-GRAY floor; in dark the lift is toward the
  warm `--glass-tint-ink`, not toward neutral white.)

### Machine / structural (the gate)
- [ ] **M1 — dark composited luminance ≥ 0.5.** The dark goo masses, composited at the layer
  opacity over the dark aurora (L_bg ≈ 0.12), readback OKLab **L ≥ 0.5** (raw fill L ≈
  0.62–0.70). Born-RED on HEAD (effective L ≈ 0.31).
- [ ] **M2 — warm-ink VECTOR, not white-neutral.** The `.dark` goo `color` mixes toward
  `--glass-tint-ink` / `--foreground` (warm), NOT `white N%`. Composited OKLab hue ∈ [55,70],
  C > 0.020. (A `white N%` dark mix REDS — it desaturates toward gray.)
- [ ] **M3 — the transmissive companion present.** The `.dark` goo `filter` carries
  `saturate(1.22–1.35) brightness(1.06–1.18)` COMPOSED WITH the static `url(#glass-goo)`. A
  flat dark fill with no luminosity-lift REDS.
- [ ] **M4 — STATIC filter, Safari-safe.** The `#glass-goo` `stdDeviation` + `feColorMatrix`
  stay LITERAL (no var-driven blur); `color-interpolation-filters="sRGB"`; region -50%/200%;
  the goo is a regular `filter:`, NEVER `backdrop-filter: url()`. The `@supports not` floor +
  PRM `display:none` stand.
- [ ] **M5 — light mode byte-unchanged.** Every dark arm is `.dark`-scoped; the light goo
  declarations are untouched.
- [ ] **M6 — both surfaces fixed.** BOTH `.carousel-goo-layer` (CarouselContent.vue) AND
  `.deck-goo-layer` (deck.vue / DeckPager.vue) carry the identical `.dark` color + filter arm.
- [ ] **M7 — travel-gate hardened.** `markTraveling` keys off embla's
  `selectedScrollSnap() !== previousScrollSnap()`, not the locally-tracked `activeIndex`; a
  rapid real double-advance never silently drops the goo.

### The binding visual π
- [ ] **π** — a LOCAL real-GPU capture (Chromium + the WebKit arm): a DARK-mode real
  `Next.click()` mid-morph frame, the composited goo-mass OKLab readback (L ≥ 0.5, hue ∈
  [55,70], C > 0.020), the light-mode un-regression frame, and the `proof:ba-gestalt`
  navigation/motion verdict on a FRESH capture (the gestalt OR — a dim/muddy dark halo is the
  close-blocking FAIL).

---

## 6. NON-GOALS / fences (NO over-build)

- Do NOT re-open the four headline defects (Safari / slow / does-not-morph / AWFUL) — JUDGE-3
  verified them RESOLVED; fix2 is the dark-mode gestalt + the travel-gate harden ONLY.
- Do NOT regress light mode (L ≈ 0.98 warm-cream, 950ms, opacity 0 at rest).
- Do NOT touch the `#glass-goo` static filter graph (literal stdDeviation/feColorMatrix, sRGB,
  region) — the transmissive companion COMPOSES with it on the `filter:` shorthand.
- Do NOT mint a new spring / clock / color token — read the SHIPPED `--glass-tint-ink` /
  `--foreground`; this is a color + transmission fix, not a motion re-tune.
- Do NOT use a `white N%` mix in dark mode (the gray-maker); the dark lift is toward the warm
  `--glass-tint-ink` only.
- Do NOT introduce `backdrop-filter: url()` or a var-driven `feGaussianBlur stdDeviation`
  (WebKit-broken/slow classes).
- Clean break — no light/dark conditional shim beyond the plain `.dark` ancestor arm (NOT a
  `:global(.dark)` in a scoped block — the Vue scoped `:global()` drop trap; plain `.dark .x`
  ancestor selector only).

---

## Sources

- Internal authoritative: `docs/tranches/BD/viz/refine/goo-carousel-deck/JUDGE-3.md` §6-§8 (the
  dark-mode blocker + the concrete refinement spec), `research-target.md` / `research-root-cause.md`
  / `research-mechanism.md` (the four-defect resolution + the de-dup + the worm mechanism).
- `design.md §L1` (the six-layer optical composite, the 7 glass tiers, warm-cream identity).
- `CLAUDE.md` §"The warm-chroma floor" (BA.W-NO-GRAY — OKLab hue 62–75 warm MATERIAL, the
  STRONG floor C ≥ 0.020, the `white N%` = neutral-maker reasoning) + §"The dark register as a
  luminous transmissive material" (BA.W-DARK-MATERIAL — scope 2 the `saturate(1.22–1.35)
  brightness(1.06–1.18)` transmissive companion + the 0.10→0.22 edge; scope 3 the dark
  `--glass-tint-ink` = the light-cream `--foreground` lift at bounded 12%).
- Source: `src/styles/tokens/{light-dark.css,dark-arm.css}` — dark `--card` `hsl(26 22% 17%)`
  (L 0.16), dark `--foreground` `hsl(30 14% 90%)` (L 0.90), `--glass-tint-ink-dock`
  `oklch(from var(--foreground) 0.90 0.045 h)`; `src/components/ui/carousel/CarouselContent.vue`
  + `demo/stories/motion/deck.vue` — the `.{carousel,deck}-goo-layer` `color: color-mix(in
  oklab, var(--card), white 8%)` defect + the worm/plate `radial-gradient` reading currentColor.
- WebKit Bugzilla 245510 (`backdrop-filter: url()` broken), 283156 (per-frame re-blur cost),
  136418 (feGaussianBlur linearRGB lighten — use sRGB).
- `[[feedback-liquid-weight-universal]]` — inertia/weight/bounce/squish on ALL motion (the
  morph timing is preserved; this is a material fix, the weight is already met).
