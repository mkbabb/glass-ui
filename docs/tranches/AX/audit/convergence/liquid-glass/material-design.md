# Liquid-glass material identity — the gestalt replacement (D19 lane: material-design)

**Lane** liquid-glass-material-design · **Defect** D19 (blocker) · **Verdict** GESTALT REPLACEMENT of
the central-radial specular model with an EDGE-light liquid-glass material · **Surfaces**
`src/styles/glass.css` (`.glass-material::before` central radial), `src/styles/tokens.css`
(`§8 glassmorphism` + `§11b specular cohort` + `--glass-curvature-overlay`),
`src/styles/glass-specular-track.css` (a11y brackets), `src/components/ui/card/Card.vue`
(`specular="full"` local intensity override), `src/styles/glass.css` `.glass-btn`/`.btn-pill` hover,
`src/components/ui/button/index.ts` (button hover vocab) — cross-refs D11 (corner radials), D4 (blob).

---

## 0. Root cause — WHY the surface reads MUDDY, not glassy (source-grounded)

The user reports a "large diffuse central radial bloom that washes out the whole surface (speedtest card
reads MUDDY, not glassy)." Five compounding sources, every one located:

### (1) The central radial is GEOMETRICALLY huge — it covers ~the whole plate
`glass.css:118-133`. The `.glass-material::before` paints:

```
background: radial-gradient(circle at X Y,
    hsl(40 30% 96% / 0.22) 0%,    /* warm-cream core */
    hsl(40 30% 96% / 0.08) 22%,
    transparent 55%);             /* reaches 55% of the plate's HALF-DIAGONAL */
mask-image: radial-gradient(circle at X Y,
    black 0%, black 55%, transparent 75%);   /* mask out to 75% */
mix-blend-mode: screen;
opacity: var(--specular-intensity);          /* 0 rest / 0.22 hover / 0.32 active */
```

On a MetricCell (`glass-wash rounded-lg p-3`, the speedtest detail tile — `MetricCell.vue:94-98`) the
plate is ~80-110px. A radial reaching `55-75%` of the half-diagonal from centre is a bloom that fills
essentially the ENTIRE tile. This is not a catch-light (a small, off-centre, edge-anchored glint that
reads the surface curvature) — it is a centred wash. The geometry is the core defect: a real liquid-glass
specular is a THIN crisp gleam near the lit edge, ~10-20% of the surface, not a 55-75% central disc.

### (2) `mix-blend-mode: screen` over warm-cream LIFTS the whole tile toward white
`screen` blend never darkens, only lightens — at L=96% warm-cream it pushes the tile toward white and
desaturates whatever's behind. On a glass plate over a busy/colored backdrop this is exactly the "muddy,
washed-out" tell: the surface loses its translucency and reads as a flat brightened smear. The W09 tune
lowered the *opacity* (0.22/0.32) but kept the screen blend + the large geometry, so on hover/active the
bloom is still a whole-tile screen-lift.

### (3) The intensity wakes on HOVER and the speedtest tile is hover-reachable
At rest `--glass-specular-intensity-rest: 0` (W09 made it dormant — correct). BUT `MetricCell` is a
`.glass-wash` = `.glass-material` group member, so on `:hover` it lifts to `0.22` and the whole-tile bloom
appears. The "egregious specular HOVER" the user names IS this: hovering any glass surface paints the
55-75% central screen-bloom. The card-level `specular="full"` override (`Card.vue:91-99`) makes it WORSE
— rest `0.08`, hover `0.45`, active `0.6` — a near-opaque whole-tile white screen on a hero card.

### (4) `saturate(1.4)` / `saturate(1.5)` on floating/overlay reads as over-juiced, not clean glass
`tokens.css:669-670`: `--glass-blur-floating: blur(16px) saturate(1.4)`, `--glass-blur-overlay: blur(15px)
saturate(1.5)`. A 1.4-1.5× saturation boost on the BACKDROP (everything behind the glass) over-saturates
the bleed-through, which on a colored substrate reads as a garish smear rather than the gentle
light-concentration Apple's material does (Apple uses ~1.1-1.2× saturation + a luminosity-style tint, not
1.5×). Combined with the screen bloom this is the "muddy" compound.

### (5) FOUR independent fixed/moving radials all paint the same "soft inner glow" (D11 cross-ref)
Per D11.md: the moving `.glass-material::before` (here), the chassis `--glass-curvature-overlay`
(`tokens.css:789` pure-white `hsl(0 0% 100% / 0.06)`, dark arm byte-identical at `:1698`), and the two
`ellipse at 30% 30%` corner radials (`dock-controls.css:303,329` + `utilities.css:782`, all 18%-mix). Four
buried glow declarations, three at pure-white or saturated-at-a-fixed-corner. They co-add into the
over-described, corner-glowing, washed-out read.

**One sentence:** the specular model is a LARGE centred warm-cream disc painted with `screen` blend that
fills small tiles and lifts them toward white on hover — the OPPOSITE of a liquid-glass edge gleam — and it
is one of four uncoordinated radial-glow declarations, over an over-saturated (1.4-1.5×) backdrop.

---

## 1. The gestalt REPLACEMENT material — what liquid glass actually is

Modern (iOS-26 / WWDC25 §219 / SOTA web liquid-glass) recipe, in priority order:

1. **Backdrop blur + GENTLE saturation** — the translucency. `backdrop-filter: blur(R) saturate(~1.1-1.2)`.
   Light concentration, NOT a 1.4-1.5× color-juice.
2. **A crisp thin EDGE rim** — the full-perimeter `--glass-edge-light` hairline (0.75px inset ring). This
   is the silhouette catch-light. glass-ui ALREADY has it (`--glass-edge-light`, W22). KEEP it — it is the
   single most important "this is glass" cue and W09/D11 both ratify it as SOTA-correct.
3. **A thin specular EDGE gleam (not a central disc)** — a small, bright, OFF-CENTRE highlight that hugs
   the lit edge and reads the surface curvature. This is what REPLACES the central bloom: a narrow gleam
   anchored to the pointer/light direction, ~10-15% of the surface, never a 55-75% centred disc.
4. **An under-shadow floor** — the 0.5px dark bottom hairline reading glass thickness. glass-ui has it
   (`--glass-under-shadow-*`). KEEP.
5. **The warm-cream tint** — the house identity (`hsl(40 30% 96%)`, the in-srgb tint family). KEEP the hue;
   the problem was never the hue, it was the SIZE + BLEND + AMOUNT.
6. **Edge refraction (optional, Chromium PE)** — the `#glass-refract` feDisplacementMap. KEEP gated; it is
   the "more morphism" depth cue where supported, free fallback elsewhere.

The transposition: **DELETE the central disc; KEEP the rim + blur + under-shadow + warm tint; STRENGTHEN
the EDGE — the rim + a thin edge gleam + the refraction — so the surface reads MORE glassy, not less.**

---

## 2. The new glass ladder recipe (token-first, Safari-safe, performant)

### 2a. DELETE / REDUCE — the central radial → a thin edge gleam

Replace the `.glass-material::before` central `circle` radial with a SMALL pointer-anchored gleam. Two
gestalt options; **Option A is recommended** (simplest, most performant, Safari-clean):

**Option A — thin edge gleam (no screen blend).** Re-author the `::before` to a small, soft, plus-lighter
gleam anchored at the pointer, with a TIGHT falloff and NO screen blend:

```css
.glass-material::before, /* …group… */ {
    /* …position/inset/radius-inherit/pointer-events unchanged… */
    --specular-x: var(--mouse-x, 50%);
    --specular-y: var(--mouse-y, 50%);
    --specular-intensity: var(--glass-specular-intensity-rest, 0);
    background: radial-gradient(
        circle var(--glass-specular-size, 36%) at var(--specular-x) var(--specular-y),
        hsl(40 35% 92% / 0.5) 0%,      /* L<100% so warm hue survives; tighter core */
        hsl(40 35% 92% / 0.0) 70%,     /* falloff well INSIDE the plate */
        transparent 100%
    );
    opacity: var(--specular-intensity);
    /* NO mix-blend-mode: screen. plus-lighter is HDR-aware + does not over-white.
       If plus-lighter unsupported, the warm low-alpha gleam over the plate is
       already self-limiting — no blend needed. */
    mix-blend-mode: plus-lighter;
    /* mask narrowed to the gleam, not the whole plate */
    mask-image: radial-gradient(
        circle var(--glass-specular-size, 36%) at var(--specular-x) var(--specular-y),
        black 0%, black 60%, transparent 100%);
    transition: opacity var(--duration-normal) var(--ease-standard);
}
```

Key deltas vs HEAD: (i) `radial-gradient(circle <SIZE> at …)` with an EXPLICIT `--glass-specular-size`
(~36% radius, a token) instead of the implicit full-plate `circle at …` whose stops ran to 55%/75%;
(ii) drop `mix-blend-mode: screen` for `plus-lighter` (additive but HDR-clamped, does NOT lift the whole
tile toward white — Safari 16.4+ supports `plus-lighter`; the un-blended warm low-alpha gleam is the
fallback); (iii) the gleam is OFF the `--specular-x/y` pointer so it reads as a tracked glint, not a
centred disc; (iv) keep the `--specular-x/y` interpolation transition (W09's typed-property smoothing) but
DROP the per-axis `--specular-x`/`--specular-y` transitions if the pointer write already rAF-throttles (see
perf §4).

**Option B — pure box-shadow gleam (no `::before` radial at all, max-perf).** Replace the moving radial
entirely with a small inset top-edge specular `box-shadow` that brightens on hover (no pseudo-element, no
blend, no mask). This is the cheapest and most Safari-bulletproof, but loses the pointer-tracking. Use A if
pointer-tracking is wanted (hero/chrome); B is the better DEFAULT for content tiles (MetricCell etc.) which
do NOT need a tracked glint. **Recommendation: default surfaces get NO moving specular (rest 0, and demote
the hover floor — see 2c); the tracked gleam is opt-in `specular="subtle"` only.**

### 2b. KEEP — the rim, blur, under-shadow, warm tint, refraction

Unchanged: `--glass-edge-light` rim (the `::after` inset ring), `--glass-under-shadow-*`, the warm-cream
`hsl(40 …)` family, the grain `::after` (but see 2d), the `#glass-refract` PE garnish. These are the
load-bearing "glass" cues. The fix STRENGTHENS the rim's relative weight by removing the disc that drowned
it.

### 2c. REDUCE — the hover/active intensity + tame the saturate

`tokens.css §11b cohort` (`:1825-1834`) — demote the hover/active rungs so even the new thin gleam is a
whisper, and so the DEFAULT content tile (which now should NOT carry a tracked glint) reads clean:

| token | HEAD | new | rationale |
|---|---|---|---|
| `--glass-specular-intensity-rest` | 0 | 0 | keep dormant — correct |
| `--glass-specular-intensity-hover` | 0.22 | **0.10** | a whisper gleam, not a bloom |
| `--glass-specular-intensity-active` | 0.32 | **0.16** | press whisper |
| `.dark` hover | 0.18 | **0.08** | screen→plus-lighter still lifts on dark |
| `.dark` active | 0.26 | **0.12** | |

`tokens.css:669-670` — tame the over-juiced backdrop saturate:

| token | HEAD | new |
|---|---|---|
| `--glass-blur-floating` | `blur(16px) saturate(1.4)` | `blur(16px) saturate(1.18)` |
| `--glass-blur-overlay` | `blur(15px) saturate(1.5)` | `blur(15px) saturate(1.2)` |

(`wash/quiet/resting` already sit at `saturate(1.05)` — fine. Only floating/overlay over-juice.)

### 2d. The grain `::after` over-overlay (muddy contributor, light touch)

`glass.css:313-328` paints `--paper-clean-texture` at `opacity: var(--glass-grain-opacity)` with
`mix-blend-mode: overlay`. At `0.025` light / `0.045` dark this is fine on a resting plate, but `overlay`
blend over a busy backdrop can add to the muddy read. Leave the opacity, but verify live (LIVE-CHECK §5) —
if the tile still reads muddy after the bloom fix, the grain `overlay` is the next suspect (consider
`soft-light` in light mode too, mirroring the dark arm at `:352-358`).

### 2e. The new `--glass-material` size token

Add ONE token to `tokens.css §8`:

```css
--glass-specular-size: 36%;   /* the gleam radius as % of the plate — the
                                 ONE knob that bounds the specular geometry.
                                 NEVER the implicit full-plate 55-75% reach. */
```

This is the gestalt knob D19 + D11 share: a SINGLE overridable magnitude that bounds the gleam so it can
never again become a whole-surface disc. Override on `:root` to retune library-wide.

### 2f. `.glass-material` as the canonical mixin (already exists — confirm)

The five rungs + `.glass-card` + `.dock-icon-button` already compose the `.glass-material` group
(`glass.css:54-64`). No new class. The recipe above is one edit to the shared `::before` body. A Switch
thumb, a glass Button, a Dialog, a Sheet all inherit the new thin-gleam material from ONE source —
exactly the W22 unification intent, now corrected.

---

## 3. The hover smoothing (D19 — "specular hover egregious" + "button hover not smooth")

Two distinct hover problems:

### 3a. Specular hover (egregious) — FIXED by §2a+2c
Dropping the central disc → thin gleam + halving the hover intensity (0.22→0.10) removes the whole-tile
bloom-on-hover. ALSO smooth the WAKE: the `::before` already transitions `opacity` over
`--duration-normal` (240ms) — good. But verify the pointer-position transition isn't fighting it (the
`--specular-x/y` transitions at `glass.css:137-140` interpolate position; with a tighter gleam the position
lerp is cheaper and reads smoother).

### 3b. Button hover (not smooth) — the transition channel split
`.glass-btn` (`glass.css:415-420`) hover changes `background` + `border-color` + `color` over
`--duration-fast` but `scale` over `--duration-normal var(--spring-snappy)` (`:412`). The Button CVA
(`button/index.ts:22`) rides `.tap-squish` → `--spring-snappy` for scale. The hover feels abrupt because
the COLOR/bg transition is `--duration-fast` (~150ms) on `--ease-standard` while the scale springs over
240ms — the two halves desync. **Gestalt fix:** unify the hover-visual channels onto ONE register —
either lift the color/bg/border transitions to `--duration-normal` + a soft ease so they glide WITH the
scale spring, or (cleaner) move the hover-visual transitions onto the same `--spring-*` vocab the press
uses (W05 converged `--spring-*`). The hover should read as ONE coherent ease-in lift, not a fast color
snap + a slow scale spring. Token: ensure `.glass-btn`, `.btn-pill`, and the Button CVA hover all key off
ONE duration+ease pair (a `--glass-hover-duration` / `--glass-hover-ease` if a new knob is wanted, or reuse
`--duration-normal` + `--ease-out` consistently).

### 3c. Animation tuning (D19 — "animations need tuning")
Cross-refs W05 (`--spring-*` vocab converged) + D3 (BouncyTabs smoothing). The specular `opacity`
transition (240ms `--ease-standard`) is fine post-fix. The remaining tune is the hover-channel desync
(3b) and ensuring no per-frame repaint storm from pointer-tracking (perf §4).

---

## 4. Performance notes (backdrop-filter cost + repaint discipline)

- **Blur radius is the dominant cost** — already budgeted (`tokens.css:644-651`: clamped to 8-16px band,
  the 24px wash restored only on hi-dpi via `@media`). KEEP. Do NOT raise any radius for "more glass" —
  the morphism gains come from the EDGE (rim + gleam + refraction), not more blur.
- **The thin gleam is CHEAPER than the disc** — a 36% radial mask repaints a far smaller pseudo-element
  area than the 75% mask. The geometry shrink is a perf WIN, not just a visual one.
- **Pointer-tracking repaint** — the `--mouse-x/--mouse-y` write on `@pointermove` (Card.vue
  `useSpecularTracking`) drives the `::before` position. Confirm the seam rAF-throttles the write (one
  paint per frame, not per pointermove event). With the gleam opt-in `subtle` ONLY (default surfaces carry
  no tracked glint), most tiles attach ZERO pointermove repaint. This is the big perf gain: the MetricCell
  grid no longer repaints a whole-tile screen-blend on every hover.
- **Layer count** — each material surface has `::before` (gleam) + `::after` (rim+grain). Two pseudos per
  plate. Fine. Do NOT add a third pseudo for the refraction (it rides `backdrop-filter`, no pseudo).
- **`plus-lighter` vs `screen`** — both are GPU-composited blend modes, equivalent cost; `plus-lighter` is
  the correct one (additive, HDR-clamped, does not over-white). No perf delta, a visual+correctness win.

---

## 5. Safari compatibility (HARD constraint)

- **`-webkit-backdrop-filter`** — the ladder authors the UNPREFIXED `backdrop-filter` only and relies on
  the consumer's Lightning-CSS/autoprefixer to emit `-webkit-` per browserslist (`glass.css:195-202`
  documents WHY — hand-authoring both forms made Lightning dedup-and-keep-prefixed, which modern Chromium
  drops). KEEP this discipline. The build pipeline (`vite.library.ts` Lightning CSS) MUST target a
  browserslist that includes Safari so the `-webkit-` form ships in `dist/glass-ui.css`. VERIFY: grep the
  built CSS for `-webkit-backdrop-filter` (LIVE-CHECK §6). This is the single most important Safari check —
  without the prefix, EVERY glass surface paints flat (no blur) on Safari.
- **`mix-blend-mode: plus-lighter`** — Safari 16.4+ (2023). Supported. The un-blended warm low-alpha gleam
  is a graceful fallback on older engines (the gleam just composes normally). Do NOT use `screen` (it
  over-whites everywhere) or `overlay` (Safari has historical `overlay`-with-backdrop-filter quirks).
- **`mask-image`** — the gleam mask is `radial-gradient`; Safari needs NO `-webkit-mask-image` prefix as of
  16.4, BUT to be safe author the unprefixed form and let autoprefixer add `-webkit-mask-image` (it does
  for mask). The `inset:0 + border-radius:inherit` already bounds the gleam, so a mask-ignoring engine
  still paints the gleam clipped to the plate (`glass.css:125-127` documents this fallback — KEEP).
- **The Chromium `@property`-var-in-hsl-alpha trap** — `glass.css:115-117` documents it: a registered
  `@property` var nested in an `hsl()` alpha computes to 0 in Chromium. The new recipe MUST keep
  `--specular-intensity` driving `opacity` (layer-level), NOT a per-stop hsl alpha. The recipe in §2a does
  this correctly (intensity → `opacity`, the per-stop alphas are literals). DO NOT regress this — Safari
  and Chromium differ here and the `opacity` path is the cross-engine-safe one.
- **`corner-shape: squircle`** (`glass.css:674-682`) — Chrome-139-only, `@supports`-gated, `border-radius`
  fallback everywhere else. Safari paints the round fallback. Fine, no change.
- **`backdrop-filter: url(#glass-refract)`** — Chromium-only (WebKit bug 245510 open), already
  `@supports`-gated (`glass-refract.css`), Safari paints the blur base alone. Fine, no change.

---

## 6. The exact LIVE checks for the orchestrator (no browser here)

Run against `localhost:5173` via chrome-devtools-mcp:

1. **The bloom is gone at hover.** Navigate `/substrates/glass-material` (or the MetricCell story
   `/data/metric-cell`). Hover a `.glass-wash`/`.glass-card` tile. ASSERT: no large central white/cream
   disc fills the tile; the hover reads as a thin edge gleam (or nothing on a default content tile). Take a
   before/after screenshot at the tile bounding box.
2. **The surface reads glassy, not muddy.** On `/substrates/glass-material` (Aurora backdrop behind),
   ASSERT the rungs read as translucent glass with a crisp rim, the colored aurora visible through them —
   NOT a brightened/desaturated smear. `evaluate_script`: read `getComputedStyle(tile,'::before').opacity`
   at rest (must be `0`) and on `:hover` (must be `≤0.10` after the cohort demote).
3. **`specular="full"` card is no longer a white screen.** If any story mounts `<Card specular="full">`,
   hover it — ASSERT the hover gleam is contained, not a near-opaque whole-card white. (Consider whether
   `full`'s `0.45/0.6` local override in `Card.vue:91-99` should be re-derived down too.)
4. **Saturate is calm.** On `/substrates/glass-material`, inspect a `.glass-floating`/`.glass-overlay`
   tile over the aurora — ASSERT the backdrop color through it reads natural, not over-saturated/garish.
5. **Button hover is smooth.** Navigate `/primitives/buttons`. Hover the `glass` + `default` +
   `primary-audacious` buttons slowly. ASSERT the color/bg/scale transition reads as ONE coherent lift, no
   fast-color-snap-then-slow-scale desync. Record a GIF if possible.
6. **Safari prefix shipped (CRITICAL).** `evaluate_script` on any page:
   `getComputedStyle(document.querySelector('.glass-resting')).backdropFilter` returns a blur (not
   `"none"`), AND grep the built `dist/glass-ui.css` for `-webkit-backdrop-filter` (Bash, not browser) —
   it MUST be present for Safari. If absent, the browserslist target is wrong and EVERY Safari glass
   surface is flat.
7. **No repaint storm.** `performance_start_trace` while sweeping the pointer across a MetricCell grid;
   ASSERT no sustained layout/paint thrash (the gleam-on-subtle-only means default tiles attach zero
   pointermove repaint).

---

## 7. Coordination with sibling lanes (no duplicate prescription)

- **D11 (corner radials)** — the chassis `--glass-curvature-overlay` + the two `ellipse at 30% 30%` corner
  radials are the SAME radial-glow family. This lane fixes the MOVING `::before`; D11 fixes the three
  FIXED-anchor radials. Share the gestalt: ONE `--glass-specular-size` / intensity axis, warm-cream not
  pure-white, dark arm actually softer. D11 folds into W09's re-open; this lane is the material-identity
  half. They MUST land together (both edit `glass.css`/`tokens.css` specular region) — coordinate so the
  cohort token edits don't collide.
- **D4 (blob lighting)** — the WebGL blob's Blinn-Phong glint is a DIFFERENT subsystem (shader, not CSS
  box-shadow). D4 adopts the SAME principle (warm-cream whisper, rim-defines-silhouette, sub-unity peak)
  but no code overlap. Cross-ref only.
- **W09 (specular tune-to-subtle)** — this lane is the ESCALATION D19 mandates: W09 tuned the intensity but
  kept the central-disc geometry + screen blend. The gestalt replacement (disc→edge-gleam, screen→
  plus-lighter, +size token) is the next step W09's live audit (which surfaced D19) proves is needed. Fold
  as a W09 re-open / a dedicated material-overhaul wave (D19 is flagged NET-NEW blocker per the ledger), NOT
  a duplicate.
- **W42 (liquid-morph substrate)** — orthogonal (morph = reshape spring, not material). No overlap; the
  material gleam and the morph scalar are independent idioms.
- **W48 (glass-material demo reauthor)** — W48 BINDS the `useSpecularTracking` seam in the demo so the
  story actually shows the (now-corrected) material. Sequence: this lane fixes the material; W48 wires the
  demo to show it. The demo's `specular="subtle"` wiring should use the NEW thin gleam.

---

## 8. Summary of the token + recipe deltas (the implementer's checklist)

**`glass.css` `.glass-material::before` body:**
- DELETE the `circle at X Y, …0.22…0.08…transparent 55%` full-plate radial.
- ADD `radial-gradient(circle var(--glass-specular-size,36%) at X Y, hsl(40 35% 92%/0.5) 0%, …/0 70%)`.
- CHANGE `mix-blend-mode: screen` → `mix-blend-mode: plus-lighter`.
- NARROW the `mask-image` to the gleam size (60% inner, 100% outer).
- KEEP the `opacity: var(--specular-intensity)` driver (the Chromium-safe path).

**`tokens.css`:**
- ADD `--glass-specular-size: 36%` (§8).
- CHANGE `--glass-specular-intensity-hover: 0.22 → 0.10`, `-active: 0.32 → 0.16` (§11b `:root`).
- CHANGE `.dark` `-hover: 0.18 → 0.08`, `-active: 0.26 → 0.12`.
- CHANGE `--glass-blur-floating: …saturate(1.4) → saturate(1.18)`, `--glass-blur-overlay: …saturate(1.5)
  → saturate(1.2)`.
- (D11 leg, coordinate) re-derive `--glass-curvature-overlay` + `.dark` arm off warm-cream low-alpha.

**`Card.vue`:**
- Re-derive the `specular="full"` local override down (`0.08/0.45/0.6` → e.g. `0.04/0.18/0.26`) so even the
  brightest opt-in is a gleam, not a screen.
- Confirm `specular="off"` default surfaces (MetricCell-class) carry NO tracked glint (they don't —
  `glass-wash` group still has the `::before` but at rest 0 / hover now 0.10; consider whether default
  content tiles should drop the hover gleam entirely via a `--glass-specular-intensity-hover: 0` local on
  bare `.glass-wash` tiles — DECISION for the orchestrator's live pass).

**`.glass-btn` / `.btn-pill` / Button CVA hover:**
- Unify the hover-visual transition channel (color/bg/border) with the scale-spring register so the lift
  reads as ONE coherent ease, not a fast-snap + slow-spring desync (D19 button-hover-smoothing).

**Safari:**
- VERIFY `-webkit-backdrop-filter` ships in built CSS (browserslist includes Safari).
- KEEP the `opacity`-driven intensity (never `@property` var in hsl alpha).
- `plus-lighter` (Safari 16.4+) with the un-blended warm gleam as fallback.

Every magnitude is a `--glass-*` token; no buried literal; warm-cream `hsl(40 …)` in-srgb house family
preserved; the rim + blur + under-shadow KEPT; the central screen-disc DELETED and replaced by a thin,
bounded, pointer-tracked edge gleam — the surface reads MORE glassy with LESS paint.
