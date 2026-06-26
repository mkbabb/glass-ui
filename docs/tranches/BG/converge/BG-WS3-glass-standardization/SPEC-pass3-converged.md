# BG-WS3 · Glass standardization — ONE coherent glass register (pass-3 CONVERGED)

> Workstream: BG-WS3-glass-standardization · **Pass 3 — CONVERGED** (the prototypes ran, the critiques folded)
> Base: `tranche/BG` @ `aaa254c8` (every fact below RE-VERIFIED LIVE on disk during this synthesis)
> Predecessor: `SPEC-pass3.md` (frontier-framed) → this is the hardened, paint-anchored convergence.
> Lineage: `SPEC-pass2-converged.md` (architecture sound) → `SPEC-pass3.md` (frontier) → HERE.
>
> **What changed at convergence:** the 5 prototypes settled the contested mechanics, and the 5 critiques
> caught FOUR spec instructions that DO NOT WORK as written. Each is folded below with its correction:
> 1. **M1 ink (72%):** the L-raise pin is PROVEN in-gamut (rgb(52,37,26)/(67,53,39)), but the "L-raise is a
>    GAMUT NECESSITY / `max(c)` alone re-maroons" rationale is **WRONG** (a `clamp()` arithmetic slip) — it is a
>    chroma-vs-darkness DESIGN choice, and the dark-arm collapse RAISES the dark cast L 0.20→0.34 (a lighter cast
>    owed a sign-off). DRY: do not re-paste the expression into dark-arm.css.
> 2. **M3 clip (45%):** the matrix PROVED Job A (the host's own backdrop corner) clips to radius NATIVELY on modern
>    Chrome — so the pass-2 "`contain` clips the host fringe" claim is dead AND the wave is NOT a primitive-needed
>    fix for Job A. **But the visible F3 defect is JOB B (descendant-over-corner bleed)**, and the rung ladder the
>    real `<Card>` composes (`.glass-resting`/`.glass-floating`) carries `contain:none` — Job B is UNFIXED. The
>    wave's real work is the Job-B descendant-containment on the `.glass-material` GROUP. The missing Job-B matrix
>    cell + the real-Safari capture are owed.
> 3. **M4 blur (58%):** the band move IS glass-cal-clean (resting=8 ON `BAND_LO`), but M4 is NOT a one-file
>    rebaseline — it is a cross-gate design reversal redding ~6 gates, fully enumerated here.
> 4. **M5 tint (53%):** "re-point the writers to write `--glass-tint-source` directly" is **FALSIFIED** — every
>    content-tier surface RE-DECLARES `--glass-tint-source: var(--glass-tint-ink)` ON ITSELF (`:where()` rule,
>    ladder.css:275), so an ancestor field write is clobbered by the descendant's OWN declaration (own-declaration
>    beats inheritance regardless of specificity). The fold flows through a SEPARATE inherited INPUT bias channel.
>    The one bindable-NOW piece (the `.liquid-pill` substitution-trap close) is pulled into Phase 1.
>
> **Cardinal bar (unchanged): real-paint-verified on real GPU, Chrome AND real macOS Safari, both modes.**
> Methodology (SETTLED — do not re-litigate): **COLOR π = `getImageData` only** (Chrome 149 serializes the
> un-clipped `oklch()` back, color-blind to the painted `rgb(49,0,0)`); **BLUR-radius π = `getComputedStyle`**.
> Trust the painted pixel. The 2 new specs enroll in `webkit` testMatch; **the binding Safari sign-off is a
> SEPARATE manual real-macOS-Safari capture, OUT of CI** (bundled-WebKit gamut-maps + Metal-AAs differently).

---

## 0 · CONVERGENCE STATE (the honest gate)

| Wave | Mechanism | Prototype | Critique | Paint-bound? | Phase |
|---|---|---|---|---|---|
| **M1 W-CARTOON-INK-GAMUT** | L-raise + chroma-lower pin (or per-mode lower-L), device-free witness | ✅ build, 90% | 72% refine | Chrome ✅ / Safari OWED | **1 (NOW)** |
| **M2 W-DOCK-CAST-RETIRE** | delete dead `inherits:false` cast + wedge + add dock-PRM carve | (with M1) | — | Chrome ✅ / Safari OWED | **1 (NOW)** |
| **M3 W-GLASS-CLIP-DISCIPLINE** | **Job-B** descendant-containment on `.glass-material` group | ✅ build (Job-A only), 86% | 45% refine | **Job-B cell OWED** / Safari OWED | **1 (NOW)** |
| **M5a `.liquid-pill` substitution close** | raw `var(--glass-bg-floating)` → element-level `color-mix` | (M5 falsified the rest) | 53% refine | **bindable NOW** | **1 (NOW)** |
| **M4 W-GLASS-BLUR-PEER** | demote Button off `glass-deep`; SAME-token peer lock; ~6-gate rebaseline | ✅ build, 63% | 58% refine | **WS1-gated** / Safari `var()` OWED | **2** |
| **M5 W-GLASS-TINT-UNIFY** | bias INPUT channel + SOURCE rule + DRY inner/outer | ✗ no-build, 71% | 53% refine | **WS1-gated** | **2** |
| **M6 W-GLASS-IDIOM-FACTOR** | DRY factor + dead-token delete | — | — | net-neutral | **2** |
| **M5c W-GLASS-CONSUMER-BAND** | fold fill-tint consumers onto plate/rim (hue/strength asymmetry) | — | — | **WS1-gated** | **3** |
| **M8 W-DOCK-LEGIBILITY-RECAL** | re-anchor dock AA to plate; FRESH clamp on WS1 scope | — | — | **WS1-gated** | **3** |
| **M8 W-GLASS-DYNAMICS** | lensing + NEUTRAL specular; backdrop-HUE sample; flare DELETE-first | — | — | **WS1-gated** | **3** |
| **M9 W-DEMO-STYLE-REHOME** | split >500 liquid-morph; FRESH clamp re-home | — | — | net-neutral | **3** |

**Phase 1 (M1·M2·M3·M5a) is FIELD-INDEPENDENT — land + real-paint-verify NOW.** Phase-2/3 paint bars are
IMPOSSIBLE until WS1's warm-aurora field is on disk — the hard residual gate (R-WS1, R-RESIDUAL).

---

## 1 · GESTALT GOAL (the bar — unchanged)

Make the dock, buttons, cards, items, and menus read as ONE glass material — the iOS-26/27 "Liquid Glass"
single-material discipline. Reference anchor: `scratchpad/evidence/frames-2207/f006` — the bottom dock bar, the
Search pill, and the widget cards ALL read as the SAME translucent material at the SAME subtlety; the wallpaper
reads THROUGH every plate equally; NO surface is a "heavier dock." The glass read = (a) a bright top edge-light
specular hairline + (b) a soft NEUTRAL contact shadow + (c) edge LENSING, NOT a heavy Gaussian. Saturation is LOW.

1. **ONE material at varying opacity** — dock pill, content Card, button, menu row all resolve the SAME
   `--glass-blur-resting` and the SAME plate tint. Not a heavier dock, not a heavier button.
2. **Subtle blur, structure survives** — calmer than 4.2.0's `8/10/13/13/9/16`. The glass read is carried by edge
   lensing + a NEUTRAL specular hairline (W-LENSING is built), not a heavy Gaussian.
3. **Perfect corner clip** — every `[data-slot=card]` corner is a clean rounded arc; descendants do NOT bleed past
   the radius. ONE clip discipline, the RIGHT primitive per job (Job A native on modern Chrome; **Job B is the fix**).
4. **Soft ambient elevation, ZERO chromatic cast** — a soft omni drop-shadow; never a hard colored offset sticker
   on glass chrome. The composited cast over white AND the warm field resolves a warm BROWN (R>G>B, B>0, never
   `rgb(N,0,0)`), both stamp lightnesses, both modes, both engines.
5. **ONE chromatic seam** — collapse the live SEVEN disjoint chromatic tint axes to **TWO SURFACE pairs**
   (`{plate}` + `{rim}`) **+ ONE labeled INPUT bias channel** (the observer's write target that FEEDS the plate;
   see §3.5 — it is NOT a third surface paint pair). Zero inert read axes (computed-style proven, NOT grep).
6. **DRY** — the re-pasted idioms declared ONCE; zero dead tokens/`@property` in the glass cascade.

---

## 2 · VERIFIED GROUND TRUTH @ HEAD (re-checked LIVE this pass)

### The maroon (W-CARTOON-INK-GAMUT) — root + the in-gamut answer + the CORRECTED rationale
- `--cartoon-ink: oklch(from var(--foreground) clamp(0.14, l, 0.18) max(c, 0.11) h)` (shadow.css:107); dark arm
  `clamp(0.20, calc(1 - l), 0.30) max(c, 0.11) h` (dark-arm.css:177). `--foreground` ≈ `oklch(0.216 0.006 56)`
  light. The `max(c, 0.11)` floor lifts chroma ~18× AT a clamped-LOW L (≤0.18) → `(L0.18, C0.11, H56)` is OUT of
  sRGB gamut → per-channel clamp → **`rgb(49,0,0)` light / `rgb(51,1,0)` dark — the forbidden maroon.**
- **★ THE IN-GAMUT FIX (prototype-PROVEN, est 90%, real Chromium `getImageData`).** PIN: `oklch(from
  var(--foreground) clamp(0.28, l, 0.34) clamp(0.030, c, 0.050) h)` → **un-composited ink light=`rgb(52,37,26)`
  hue 57.4° / dark=`rgb(67,53,39)` hue 66.5°, both in-gamut warm brown; ALL 18 composited cast pixels
  (lead/mid/contact × over-white/over-field/over-dark × both modes) pass R>G>B>0 + warm-hue.**
- **★ CORRECTION (critique-folded, was overstated in pass-3 §2):** the L-raise is NOT a gamut necessity, and
  `max(c,…)` alone does NOT necessarily re-maroon. The pass-3 "seed-audit `clamp(0.018,c,0.045)` FAILS" rested on a
  `clamp()` arithmetic slip (`clamp(0.018, c, 0.045)` with a tiny `c` resolves to `0.018`, not `0.045`). A
  **lower-L lower-chroma point is ALSO in-gamut warm brown** (`oklch(0.18, 0.018-0.025, 56) → rgb(24,16,10)`,
  R>G>B>0). So the choice is **cartoon-punch (L0.28-0.34, the proven pin) vs preserved dark-ink (L0.18, a darker
  warm-brown sticker)** — a DESIGN decision, paint-decided, NOT forced by gamut. **FINDING A holds:** the
  OKLCh→sRGB clamp floors the PAINTED L lower than the nominal target; **drop the exact-rgb/L pin — the bar is
  STRUCTURAL warm-brown** (R>G>B>0, warm-hue 50-70°, in-gamut).
- **★ THE DARK-ARM DRY + IDENTITY (critique-folded).** The unified light expression collapsed onto the dark arm
  RAISES the dark cast L ~0.20→0.34 — a **materially lighter dark sticker the dark-arm doc deliberately avoided**.
  Two viable forms, **decided by the dark-mode paint sign-off (§7):**
  - **(A) unify (DRY-max):** delete the dark `--cartoon-ink:` re-declaration (dark-arm.css:177) so the `:root`
    expression cascades and re-resolves via the dark `--foreground` — keep ONLY the mode-specific `-lead/-mid/
    -contact` opacity rungs in the dark block. Lighter dark cast → needs sign-off.
  - **(B) per-mode (dark-ink-preserved):** the dark block keeps a DELIBERATE per-mode expression at lower L
    (`clamp(0.16, …, 0.20) clamp(0.018, c, 0.025) h` → `~rgb(24,16,10)`) — NOT a re-paste of the identical light
    line (the re-pasted-idiom this workstream kills), a recorded per-mode pair with each fallback literal matching
    its own painted pixel.
  Either way: do NOT re-paste the identical light expression into dark-arm.css.
- Two fallback literals `#4a3320` / `#5a3f28` ride the `@supports not (color: oklch(from …))` arm. **★ RECONCILE
  (critique):** the existing dark fallback does NOT match its derivation — **re-derive EACH fallback literal from
  the PAINTED pixel of its mode's chosen expression** (one literal if (A); a per-mode pair if (B)).
- PRT / `prefers-contrast: more` arms (shadow.css:215-224, already 42% alpha) **stay ALPHA-only — no chroma
  deepen** (chroma is the disease); they inherit the warm-brown ink automatically. Recorded so a reviewer sees the
  contrast arms were considered.

### The dock wedge + the dead flare (W-DOCK-CAST-RETIRE) — verified W3C-dead
- `GlassDock.vue:606` emits `<span class="cartoon-cast" aria-hidden>` UNCONDITIONALLY. `shape.css`
  `.glass-dock > .cartoon-cast { box-shadow: var(--shadow-cartoon-md) }` (the maroon down-LEFT offset) → the
  bottom-left **red wedge** (the child paints into the corner gap of the `contain`-rect where the 9999px pill
  radius leaves a notch). On `[data-punching]` → `--shadow-cartoon-lg`.
- **The kinetic cast-travel is W3C-DEAD (the `inherits:false` trap).** `@property --dock-punch-stretch
  { inherits: false; initial-value: 1 }` (shape.css:41). Set to `1.22` on `.glass-dock[data-punching]`, but the
  CHILD `.cartoon-cast` reads `var(--dock-punch-stretch, 1)` → an `inherits:false` registered property reads its
  **registered initial `1`** across the parent→child boundary → `--cast-travel = clamp(0,(1−1)/0.22,1) = 0` —
  **dead forever.** The box-shadow paints STATICALLY (the resting maroon wedge is real). Retiring the cast removes
  a DEAD travel mechanism + the static wedge — not a tuning.
- The surviving compositor press-SQUASH (`--dock-punch-stretch` on the `scale:` channel of the SAME
  `.glass-dock[data-punching]` element — LIVE) is KEPT.
- **The dock PRM bug:** `.glass-dock` pins `--motion-weight: 1` UNCONDITIONALLY (shape.css:192), overriding the
  `:root` PRM-zero → the surviving squash still scales `1→1.22` under reduce. M2 ADDS a dock-scope
  `@media (prefers-reduced-motion: reduce) { --motion-weight: 0 }`.

### The clip dialects (W-GLASS-CLIP-DISCIPLINE) — RECONCILED with the matrix
- THREE dialects: `.glass-card` → `contain: layout style paint` (surfaces.css:34); `.glass-btn` → `contain: paint`
  (surfaces.css:79); `.glass-chip` → `isolation: isolate` (glass-chip.css:69). The five ladder rungs + the
  `.glass-material` GROUP (material.css:36-43 — the shared `.glass-material, .glass-wash, .glass-quiet,
  .glass-resting, .glass-floating, .glass-overlay, .glass-card` selector) carry **NO** clip/contain/isolation.
- **The real `<Card>` composes `surfaceClass('glass','resting')` → `.glass-resting`, a LADDER RUNG — NEVER
  `.glass-card`** (grep `glass-card` in `components/ui/card/` = ZERO). So a bare `<Card>` has `contain:none`.
- **★ THE MATRIX VERDICT (prototype-PROVEN, est 86%, real-GPU Chrome 149, border-radius:0 positive control):**
  - **Job A — the host's OWN `backdrop-filter` corner raster.** The matrix proved this **clips to `border-radius`
    NATIVELY on modern Chrome** (0% leak; the `border-radius:0` positive control correctly flagged 100%
    leak/square-fringe, proving the detector distinguishes "plate fills the rect corner" from "backdrop shows
    through the radius"). So the pass-2 "`contain` clips the host fringe" claim is **falsified**, AND **Job A needs
    NO primitive on modern Chrome.** This is consistent with the audit's own hedge (`D-aliasing-clip.md` F3:
    "subtle, individually radius-clipped").
  - **★ JOB B IS THE VISIBLE DEFECT — and it is UNFIXED (critique mustFix).** The F3 square-edge / nested-glass /
    full-bleed-image artifact is a **DESCENDANT painting past the rounded corner** (scroll-shrink header backplate,
    a nested glass Button's backdrop sample, a full-bleed image). The rung ladder the real `<Card>` composes
    (`.glass-resting`/`.glass-floating`) carries `contain:none` → **Job B is the actual fix this wave owes** — it
    was NEVER tested (the prototype ran Job A only). The Job-B matrix cell (over-corner child, parent WITH vs
    WITHOUT `contain:paint`, real GPU both engines) is owed before the wave closes.
  - **The M2 cartoon-cast wedge** is the OTHER half of the visible bottom-left artifact — deleted by M2.
  - **Owed:** the binding real-macOS-Safari `getImageData` (bundled WebKit is non-binding, its numeric arm read
    degenerate); version-ground **WebKit bug 158483** (host backdrop-radius clip) resolution status by version,
    NOT UA string. If Safari 18+ fixed Job A natively, the Job-A no-op is recorded; **Job B still needs the group
    `contain:paint`.**

### The seven tint axes (W-GLASS-TINT-UNIFY) — three identical plate mixes + the LIVE bias + the FALSIFIED re-point
- The IDENTICAL `color-mix(in oklab, <rung>, <hue> <strength>)` plate op runs under THREE names: (1)
  `--glass-tint-source`/`-strength` (W55 PLATE, glass-fx.css:157 + ladder.css ×5 — KEEP as plate); (2)
  `--glass-fill-tint`/`-strength` (@property glass.css:399, BE per-instance FILL — 6 consumers
  Badge/SelectableChip/IconChip/glass-atom/glass-chip); (3) `--glass-ambient-hue`/`-strength` (@property
  glass.css:379, re-pointed into the plate pair at liquid-morph.css:34 `.liquid-stage` + :64 `[data-paper-field]`).
  The RIM axis (4) `--glass-accent`/`-strength` (@property property-regs.css:285 — KEEP as rim). Plus consumer
  forks `--accent-fill/-band/-edge`, `--feedback-tone/-strength`, `--selection-accent-strength`.
- **★ AMBIENT IS LIVE, NOT INERT (re-verified).** `useBloomUp.ts:340/343` writes BOTH ambient sub-tokens via
  `el.style.setProperty` (strength ramped 0→8%; `useBloomUp.test.ts` asserts `8.000%`);
  `useGlassBackdropLuminance.ts:448` writes the HUE only. A CSS grep is BLIND to JS `setProperty` — the fold is a
  behavior-preserving RE-POINT, never a delete.
- **★ THE DIRECT-WRITE RE-POINT IS FALSIFIED (M5 prototype, the #1 tint finding).** Pass-3 §3.5.1 said "re-point
  the writers to write `--glass-tint-source`/`-strength` directly" on the field ancestor. **FALSIFIED on disk:**
  every content-tier surface RE-DECLARES `--glass-tint-source: var(--glass-tint-ink)` **ON ITSELF** —
  `:where(.glass-card, .glass-resting, .glass-quiet, .glass-wash)` (ladder.css:275), `:where(.glass-floating,
  .glass-overlay)` (213), and the bright-bucket `@container` (154). **An element's OWN custom-property declaration
  beats an inherited value from an ancestor regardless of specificity** (inheritance only fills in where the
  element declares nothing). So an ancestor field write of `--glass-tint-source` is CLOBBERED by the descendant's
  own `:where()` declaration → the bloom/field hue never reaches the plate. **The bias must flow through a
  SEPARATE inherited INPUT channel the descendant `:where()` rule READS** (§3.5).
- **★ THE `[data-paper-field]` ATTRIBUTE SCOPE IS DEAD.** PaperBackdrop (AppShell.vue:360) renders
  `class="paper-field"` — the CLASS; nothing sets the `[data-paper-field]` ATTR (only doc-comments + StoryPage
  prose). So the AUGMENT-2 bias (liquid-morph.css:63) + the `--paper-field-warm` skip-guard + `min(…,8%)` clamp
  (64-70) sit on a DEAD scope — relocating them relocates dead weight. The ONLY live ambient consumer is
  `.liquid-stage` (34, no clamp). **The clamp must be REBUILT FRESH on WS1's actual live field scope when WS1 lands.**
- **★ THE SUBSTITUTION TRAP (the paint-not-write proof) — the ONE bindable-NOW piece.** `.liquid-pill` reads
  `background: var(--glass-bg-floating)` RAW (liquid-morph.css:104) — the `:root` PRE-COMPOSED token — so a
  descendant `--glass-tint-*` write NEVER re-composes it (line 281 IS the `color-mix()` form; line 104 is not). An
  ambient/bloom re-point does NOT re-tint `.liquid-pill` — the bloom is silently lost on the bloom surface. **The
  fix is field-INDEPENDENT and bindable NOW** — compose the rung CLASS (the ladder element-level mix) on
  `.liquid-pill`, never read raw `var(--glass-bg-*)`; `getImageData` proves byte-identity at rest AND the warm hue
  at mid-bloom. Pulled into Phase 1 as **M5a**.

### The blur ladder (W-GLASS-BLUR-PEER) — INVERTED + the cross-gate accounting
- Radii (glass.css:75-92): wash 1 / quiet 8 / resting 10 / floating 13 / overlay 13 / **dock 9**; deep 16
  (glass-deep.css). `--glass-blur-btn` = floating-radius 13 (glass.css:176), AND the default `<Button>` composes
  `glass-wash btn-glass glass-deep glass-capsule …` (button/index.ts:69) → `.glass-deep` re-points
  `--glass-blur-btn` to the **deep 16px** = the heaviest surface. Live spread: **Button 16 ≫ Card-floating 13 ≫
  default-Card-resting 10 ≫ dock 9.** The dock is NOT heavier; the BUTTON is. The user's *"dock blurry too long"*
  is the morph-ramp window (WS2's domain), NOT static radius.
- Content saturate (glass.css:113-124): wash/quiet/resting/dock 1.4, floating/overlay 1.6, deep 1.8 — over a warm
  field this amplifies the transmitted backdrop → "over-corrected to metallic." Dark arm calmer (1.22-1.35).
- **★ THE CROSS-GATE ACCOUNTING (M4 prototype HEADLINE, critique-VERIFIED).** M4 is NOT a single-file glass-cal
  rebaseline — it is a cross-gate design reversal touching **~6 gates**. Prototype-PROVEN clears: the band move
  (`resting/quiet = 8`) passes `proof:glass-cal` with **NO `BAND_LO` edit** (`BAND_LO=8`; `v < BAND_LO` reds, `8`
  is not `< 8`; `v >= pre-wave 12` passes — in-band DOWN moves are FREE); `proof:no-gray` PASSES (its 2 dock
  witnesses re-pointed, dock saturate held at the `lightDockSat ≥ 1.2` floor); the SAME-token peer lock + its
  self-test are clean. The FULL coupled-site rebaseline + the other gates are enumerated in §3.4.
- `proof-glass-cal.mjs`: `BAND_LO=8` (hard wall), `BAND_HI=15`; `PRE_WAVE_RADII` are CEILING refs; B3 matches
  `--glass-saturate-${tier}: ${value}` with a VALUE regex (a saturate-default change REDS B3 unless rebaselined
  in-diff). Dock saturate witness floor `lightDockSat ≥ 1.2` (`proof-no-gray.mjs:617`).

### Dead tokens (W-GLASS-IDIOM-FACTOR) — confirmed
`--glass-saturate-deep-ceiling` (0 readers, `== --glass-saturate-deep: 1.8`, stale comments) — DELETE (KEEP
`--glass-saturate-deep`, the glass-cal deep-fence reads it). `--glass-spine-blur`/`-opacity` (0 readers) — DELETE;
**KEEP `--glass-spine-vignette`/`-border`** (LIVE, instrument-chassis.css:157/159). `--cartoon-cast-dx`/`-dy`
@property + dead `cards.css` transition legs (no `useCartoonCast` driver) — DELETE. Re-pasted idioms: the plate
color-mix ×15 (ladder is the canonical home; **a11y-fallback.css:213-228 GUARD-2 background re-pastes are pure
REDUNDANT dup** — ladder paints those unconditionally, the guard's real job is the prefix); `--glass-warm-zero`
×5; press-squash `scale:1.04 0.94` ×3; `.loud` `--motion-weight:1` ×N.

---

## 3 · MECHANISM (the idiomatic approach, concrete — prototype-validated, critique-hardened)

### 3.1 · The maroon ink — in-gamut warm brown, ONE expression per mode (M1, field-independent)
Re-express `--cartoon-ink` so the live `oklch(from …)` resolves an IN-GAMUT warm brown at the stamp L. The
**proven primary pin** (the cartoon-punch register, validated green by the prototype):
```css
/* shadow.css :root — the cartoon-punch register, prototype-PROVEN in-gamut warm brown */
--cartoon-ink: oklch(from var(--foreground) clamp(0.28, l, 0.34) clamp(0.030, c, 0.050) h);
```
- **Dark arm — DECIDED BY THE §7 PAINT SIGN-OFF (do not re-paste):**
  - **(A) DRY-collapse** — delete the dark `--cartoon-ink:` re-declaration so `:root` cascades via the dark
    `--foreground`; keep ONLY the `-lead/-mid/-contact` opacity rungs in `.dark`. Dark cast L 0.20→0.34 (lighter).
  - **(B) per-mode dark-ink-preserved** — a deliberate `.dark` expression at lower L
    (`clamp(0.16, l, 0.20) clamp(0.018, c, 0.025) h`) keeping the darker warm-brown sticker; a recorded per-mode
    pair, NOT a re-paste.
- Re-derive EACH fallback literal (`@supports not (color: oklch(from …))`) from the PAINTED pixel of its mode's
  chosen expression (do NOT assume `#4a3320`/`#5a3f28` — the painted L floors lower than nominal). Rewrite the
  false `max(c,0.11)`/`clamp` comments.
- PRT / `prefers-contrast: more` arms deepen via ALPHA (32→42%), NEVER chroma — recorded as considered, not
  left to chance.
- ZERO `--shadow-cartoon-*` reader edits — `proof:shadow-contract` stays green by construction (it locks the
  chain, not the ink).
- **Gate (`proof:no-gray`, the `cartoon-ink-warm-in-gamut` witness, born-RED) — DEVICE-FREE in node** (critique
  mustFix): reuse the existing `oklchToRgb`/`relativeOklchFrom`/`rgbToOklab` helpers + a **NEW
  `clamp(L)`+`max-or-clamp(C)`-aware parser** (the current `darkTintLiftL` only handles a bare numeric L + literal
  `c h`). Born-RED on HEAD (light `rgb(49,0,0)` hue 29° fails; dark `rgb(51,1,0)` fails) → GREEN on the pin, for
  **BOTH the light AND dark source-foreground**; assert **R>G>B>0 + warm-hue 50-70°** (NOT chroma≥floor — the
  chronic-breaker).
- **π (the binding capture — REAL box-shadow render, NOT a canvas-fill model, critique mustFix):** `getImageData`
  on an actual element painting `box-shadow: var(--shadow-cartoon-md/-lg)` over white AND over dark
  (field-INDEPENDENT, capturable NOW) on real-GPU Chrome — R>G>B>0 + warm-hue 50-70° for all 3 stamp rungs
  (lead/mid/contact), both modes; un-composited ink R−B≈40 @32%-over-field BLOCKING, @18%-over-white ADVISORY
  (7-unit margin, GPU-AA-flippable). **Record the manual real-macOS-Safari sign-off OUT of CI** (§7). Sequence M1 ≤ M2.

### 3.2 · The dock cast — delete the dead mechanism + the wedge (M2, field-independent)
- Delete `shape.css` 208-249 wholesale (the `.cartoon-cast` block + the `[data-punching]` deepen + the W3C-dead
  kinetic-travel + the cast PRM block) AND `GlassDock.vue:606` `<span class="cartoon-cast">` — TOGETHER (atomic;
  no orphan `--dock-punch-stretch` reader survives except the KEPT squash scale-channel + its driver).
- ADD the dock-scope PRM carve: `.glass-dock { @media (prefers-reduced-motion: reduce) { --motion-weight: 0 } }`.
  **Post-build, `getComputedStyle`-confirm it computes `0` on `.glass-dock` under emulated reduce in the
  concatenated `@layer components` bundle** (a later dock partial re-declaring `--motion-weight` would clobber it).
- The dock elevation reads from `--shadow-dock` (the omni drop-shadow, painted from the dock box → escapes the
  radius correctly, in-gamut) + `--glass-key` (the cel rim) — both KEPT. The flare is DEFERRED to W-GLASS-DYNAMICS
  (DELETE-first, decided on paint).
- The bare global `.cartoon-cast` Card rule (cards.css:359 — the `<Card surface="cartoon">` paper consumer) KEEPS
  its cast (a Memphis-sticker card IS the cartoon register). M1 de-maroons it.
- **Gate:** `proof:dock-clip-reveal` + `proof:no-layout-animation` green on the BUILT tree. **π:** the dock
  bottom-left `getImageData` matches the backdrop — no maroon wedge / no fringe, both docks, both modes, Chrome
  AND real Safari (bundled-WebKit does NOT count). Maroon claim SCOPED to the dock PLATE (control/button/chip casts
  stay maroon until M1 lands — M1 ≤ M2 sequence).

### 3.3 · The clip discipline — the RIGHT primitive PER JOB (M3, field-independent, RE-SCOPED to Job B)
**The matrix settled it: Job A is native on modern Chrome; the wave's REAL fix is Job B.**
- **Job A — the host's OWN `backdrop-filter` corner raster** (the rounded-corner fringe). The matrix proved this
  clips to `border-radius` natively on modern Chrome (0% leak). **No primitive needed on modern Chrome.** Owe the
  real-macOS-Safari capture + the WebKit-bug-158483 version-grounding; if Safari needs `isolation: isolate`, the
  matrix records it and the group clip (below) supplies it for free.
- **★ Job B — a DESCENDANT painting past the rounded corner** (the actual F3 defect: scroll-shrink header
  backplate, nested glass, full-bleed image). **THIS is the wave's work.** Mint `contain: paint` on the SHARED
  `.glass-material` group (material.css:36-43 — it ALREADY groups all rungs + `.glass-card`), so EVERY composing
  surface (incl. the real `<Card>`'s `.glass-resting`) inherits ONE descendant-containment discipline; then
  **retire** the per-class `contain` from surfaces.css:34/79 and the `.glass-chip` `isolation` from
  glass-chip.css:69 INTO the group (prove the inner `plus-lighter` bloom survives the group clip on real GPU —
  KEEP + scope-out only if it regresses). This is the §3.3 idiomatic-home intent — the rung ladder the real Card
  uses finally clips its children.
- **THE MISSING MATRIX CELL (critique mustFix — owed before close):** a full-bleed/over-corner child inside a
  radius box, parent WITH vs WITHOUT `contain: paint`, on real GPU **both engines**. This is the visible defect and
  was never tested.
- **`overflow: hidden` is FORBIDDEN** (clips the focus ring + specular bleed). The Job-B `contain: paint` must NOT
  clip the own rim / drop-shadow / focus-ring (`contain:paint` clips DESCENDANTS only — exactly the right scope;
  the host's own shadow paints from the box and escapes correctly).
- **BLAST RADIUS (build-decidable):** the `.glass-material` group includes `.glass-floating`/`.glass-overlay`
  (reka Dialog/Sheet/Popover/Command/DropdownMenu/HoverCard) + the 4 dock controls. `contain: layout` makes the
  element a containing block for `position:fixed/absolute` descendants → a reka PopperArrow/submenu that does NOT
  portal-to-body would clip. **Use `contain: paint` (NOT `layout style paint`) on the group if the BUILT-bundle
  prototype shows any arrow/popper/Select-scroll/submenu/HoverCard/focus-ring clip; scope the group clip to the
  card/content tiers + dock controls (EXCLUDE the floating/overlay rungs) with a recorded rationale if `paint`
  alone still regresses.** Run `proof:dock-plate-clearance` (the M3 containment on dock controls must NOT re-arm
  the BA.W-DOCK-GEOMETRY freed cross-axis — the 1.1× hover plate + `--dock-control-safe-inset` must still clear)
  and `proof:nested-backdrop-budget`.
- **THE GATE (`proof:glass-clip`, NEW, device-free `ci`, born-RED) — RE-SCOPED (critique mustFix):** the
  device-free gate asserts the **`.glass-material` GROUP carries the Job-B descendant-containment**
  (Lightning-CSS-minified-form-aware: `contain: layout style paint` minifies to `content`, `contain: content`
  ≡ both) AND the per-class `contain`/`isolation` are RETIRED into the group. The **radius+clean-corner assertion
  moves to the LIVE π** (computed-style over `[data-slot=card]`/glass surfaces on the BUILT route) — the sketched
  per-rule "radius alongside backdrop" regex is **non-implementable** (rung rules have backdrop but no radius;
  radius lives on the element via `rounded-card`; a stylesheet scan cannot see the composed class list). Carved
  exemptions: the dock morph aperture (`overflow-x:clip; overflow-y:visible`); the `<Card surface="cartoon">`
  Memphis layer.
- **π (the trap-closer, critique-hardened):** capture the corner on REAL GPU Chrome AND real macOS Safari, both
  modes, over a busy backdrop, **on the BUILT route with real `<Card>`/`<Dialog>`/`<Popover>`/`<Button>` — AND a
  descendant-over-corner child + the `::before`/`::after` pseudos present** (the CSS stand-in omitted all of these
  and so could not surface Job B). `getImageData` a top-corner pixel = clean arc; dock bottom-left no wedge;
  **re-ground on the element's OWN backdrop corner, not a descendant harness.**
- **Reconcile the verdict explicitly (critique mustFix):** Job A clips clean on modern Chrome (consistent with the
  audit's "subtle, individually radius-clipped" hedge); the visible square edge IS Job B (descendant bleed) + the
  M2 cartoon-cast wedge. **Never let the result read as "no card-corner defect exists."**

### 3.4 · The blur peer — demote the BUTTON, calm the whole ladder (M4, field-gated paint)
- Converge the INTERACTIVE chrome (dock · button · default-Card · menu-item) to resolve the SAME
  `--glass-blur-resting`: **demote the default `<Button>` off `glass-deep`** (button/index.ts:69 — the inversion
  fix), retire `--glass-blur-dock`/`-radius` + `--glass-saturate-dock` (→ `--glass-blur-resting`) and
  `--glass-blur-btn` (→ resting). Keep `wash` (1px) as the distinct content-pane near-no-blur tier.
- Target band `wash 1 / quiet 8 / resting 8 / floating 10 / overlay 10` — moves WITHOUT a `BAND_LO` edit
  (resting/quiet = 8 sit ON the floor; `8 >= 8` passes — prototype-proven). Drop below 8 (→6) ONLY if the M8
  read-carrier (lensing + neutral specular) paint-proves the read holds, with the `BAND_LO` move + an in-gate
  rationale note IN THE SAME DIFF.
- **Content saturate-revert `1.4-1.6 → ~1.2`** (the metallic over-correction root) — a **SYSTEM-IDENTITY decision
  needing PAINT sign-off over WS1's warm field, not gate-green alone** (§7). Hold **dock saturate at exactly 1.2**
  (the no-gray witness-(a) floor — the unified plate tint becomes the PRIMARY anti-gray, saturate 1.2 secondary).
  Preserve dark-dock read-weight (lift dark-resting saturate/brightness in lockstep BEFORE retiring
  `--glass-saturate-dock`). Lowering deep 1.8→1.6 is OPTIONAL (only if the revert paint shows deep reads metallic).
- **★ THE FULL CROSS-GATE REBASELINE (M4 prototype HEADLINE — the ~6 gates, IN-DIFF):**
  1. `proof:glass-cal` B3 — the coupled saturate sites (floating/overlay defaults :162-163, the :205 literal,
     dark-dock :42, the deep-ceiling fence :207-224) re-baselined to the reverted VALUE regex.
  2. `proof:glass-cal` S3 — the dock-shrink re-point off the RETIRED `--glass-blur-dock-radius` → `--glass-blur-resting-radius`.
  3. `proof:no-gray` — the 2 dock witnesses re-pointed (prototype-proven PASS at dock saturate 1.2).
  4. The SAME-token peer assert (new teeth, below).
  5. `proof:glass-cohesion` / `proof:adaptive-glass` — confirm the demoted Button + dock still route a glass tier
     (no opaque regression off the W54 allowlist).
  6. The webkit `var()`-blur companion (below) — if the fixed-px arm ships, the build-injection path is gated.
- **NEW GATE TEETH (the BD-regression guard):** `proof:glass-cal` asserts dock == button == default-Card ==
  menu-item all resolve the **SAME `--glass-blur-resting` TOKEN** (not merely in-band) — so a future tranche cannot
  silently re-inflate one surface (BD silently re-pointed btn to floating/deep with no gate to catch it). The
  token-identity assert is the peer lock (prototype-proven clean).
- **★ THE SAFARI `var()`-IN-BACKDROP-FILTER BLUR RESOLUTION (the live headless-green trap — settle BEFORE ship).**
  The `-webkit-backdrop-filter` twin is build-injected with the IDENTICAL value (vite.style-assets.ts:497-563,
  verified). The ladder rungs author a single `backdrop-filter: var(--glass-blur-resting)` (ladder.css:79); that
  token IS the nested `blur(calc(var(--glass-blur-resting-radius) * var(--glass-level)))`. **The OPEN question
  (prototype build=FALSE — never run on real Safari):** does `-webkit-backdrop-filter: var(--glass-blur-resting)`
  actually BLUR in Safari 26, or does the documented CSS-var-in-backdrop-filter limitation paint a FLAT plate? The
  prototype DESIGNED the binding capture (the 4-region self-calibrating differential: bare(A) / literal-blur+tint(B)
  / var-blur+tint(C) / tint-only(D), B/C/D sharing IDENTICAL tint so the ONLY variable isolating C is
  literal-vs-var blur; classify C by nearest control B vs D) but **did not run it.** **Run it on real macOS Safari
  26 BEFORE M4 ships.** If `var()` does NOT resolve, the unified register delivers the blur as a FIXED px on the
  webkit arm (a `@supports`-or-build-emitted fixed-value companion) — caught only by real-Safari paint.
- **π (gated behind WS1):** dock + Card + Button resolve the SAME `backdrop-filter` blur (`getComputedStyle`
  parity + the SAME-token gate assert), ladder calmer, field structure reads through, demoted surfaces still read
  as glass (lensing+specular), both modes, both engines.

### 3.5 · The tint unify — TWO SURFACE pairs + ONE INPUT bias, the FALSIFIED re-point CORRECTED (M5, atomic, field-gated)
**End state: ≤2 chromatic SURFACE pairs** — PLATE `--glass-tint-source`/`-strength` + RIM `--glass-accent`/
`-strength` — **+ ONE labeled INPUT bias channel** `--glass-tint-bias-hue`/`-strength` (the renamed
`--glass-ambient-*`; the observer's write target that FEEDS the plate, NOT a third surface paint pair). This is
the convergence resolution of the brief's "≤2 chromatic tint token-pairs" bar — surfaced explicitly for the
orchestrator (it is 2 surface pairs + 1 named input, NOT a punt). **Lands as ONE atomic diff or not at all.**

1. **★ The writers write the INPUT BIAS, not the plate source directly (the FALSIFICATION fix).** Re-pointing the
   writers to write `--glass-tint-source` on the field ancestor is FALSIFIED (every content-tier surface
   re-declares `--glass-tint-source: var(--glass-tint-ink)` on itself — ladder.css 154/213/275 — so an ancestor
   write is clobbered by the descendant's own declaration). Instead: `useBloomUp.ts:340/343` and
   `useGlassBackdropLuminance.ts:448` write `--glass-tint-bias-hue`/`-strength` (the renamed ambient channel; an
   INHERITED `@property`). The content-tier `:where()` rules COMPOSE the bias into their OWN
   `--glass-tint-source`/`-strength` via the SOURCE rule (§3.5.3). **Release via `removeProperty`, not set-`0%`**
   (`releaseField` setting `'0%'` while the `@property` initial IS `0%` is a no-op set — the clean break is
   `removeProperty`).
   **`useGlassBackdropLuminance.ts:448` is the SAME function WS1 retires/rewires — ONE owner, ONE coordinated
   WS1+WS3 diff (see §7 R-WS1).**
2. **Fold `--glass-fill-tint`/`-strength`** (Badge/SelectableChip/IconChip/glass-atom/glass-chip) onto the plate
   pair. NOTE the asymmetry: glass-atom reads STRENGTH, glass-chip reads HUE — the Badge `data-hue` fold must
   preserve BOTH. Requires the 3 design sign-offs (§7): Badge data-hue activation, the rest-warmth delta from the
   deleted `--glass-atom-tinted` warm-amber-at-rest, SelectableChip dilution sub-perceptual.
3. **Resolve the multiplex — SOURCE *and* strength.** Two writers target the plate toward DIFFERENT colors at
   DIFFERENT cascade scopes: the W55 bright-bucket legibility darken (source = warm INK, ladder.css:154,
   specificity 0,0,0 `@container`) vs the bloom/field (source = field HUE bias). `max()` resolves only STRENGTH.
   **The SOURCE rule (AA is the non-negotiable floor):** when the bright-bucket engages, the SOURCE is the warm ink
   (AA wins); the bias HUE tints the SOURCE only when the plate is NOT in the earned-darken bright bucket (the
   calm-field case). Concretely the content-tier `:where()` rule composes:
   `--glass-tint-source: <bright-bucket ? --glass-tint-ink : --glass-tint-bias-hue>` (the bucket gate already
   exists at ladder.css:154) and `--glass-tint-strength: max(<W55 continuous strength>, <bias strength>)`.
   **Confirm the bright-bucket `@container` (154, source=ink) STILL wins over the bias outer leg — AA
   non-negotiable** — and the overlay band (213) behaves.
4. **★ THE DRY INNER/OUTER FACTOR (critique mustFix — declare ONCE).** The 17 live `color-mix(in oklab,
   var(--glass-bg-…), …)` plate pastes must NOT bloat into 17 double-nested mixes. Declare the inner+outer compose
   **ONCE** — a shared recipe custom-property (`--glass-plate-tinted: color-mix(in oklab, <rung-bg>,
   var(--glass-tint-source) var(--glass-tint-strength))`) the rung rules read, so the bias outer leg is added in
   ONE place. **The inner invariant is the FULL W55 CONTINUOUS luma-driven strength track** (ladder.css ~290 — NOT
   a flat 4% floor); the nested mix must compose that continuous strength as the inner invariant and prove
   byte-identity at the bias-`0%`/`transparent` rest.
5. **Rebuild the clamp FRESH on WS1's LIVE scope (not relocate the dead one).** The `--paper-field-warm` skip-guard
   + `min(…,8%)` clamp live on the DEAD `[data-paper-field]` attr scope. When WS1 lands its field, build the
   combined-hue clamp FRESH on WS1's actual live scope (whatever WS1 wires the field through) and PROVE no
   over-rotation past `WARM_HUE_HI` across ALL section-accents (a violet/teal accent + warm bias must not
   over-rotate).
6. **★ Close the substitution trap — PROVE THE PAINT (the ONE bindable-NOW piece — pulled to Phase 1 as M5a).**
   The `.liquid-pill` reads pre-composed `--glass-bg-floating` raw (liquid-morph.css:104) → the re-point does NOT
   re-tint it. Make the bloom surface compose the rung CLASS (the ladder element-level `color-mix`, the
   `.liquid-sheet:281` form), never read raw `var(--glass-bg-*)`. **`buildPassed` must be true;** `getImageData`
   `[data-testid=liquid-pill]` inside `[data-testid=liquid-stage]` BOTH at rest (prove byte-identical to today)
   AND mid-bloom (prove the warm hue actually paints). Design-proof is not the bar; the painted pixel is.
7. **Delete the `--glass-ambient-*`/`--glass-fill-*` @property regs LAST, behind a born-RED bite** (delete the reg
   without re-pointing the `,8%)` reader → 8%-at-rest reds). The `--glass-ambient-*` rename to `--glass-tint-bias-*`
   carries the @property registration (kept as an INHERITED input channel).
8. **Re-point `proof:glass-foundation` A1 — a CONCRETE assertion (critique mustFix), not a "reframe to adopt".**
   Currently MANDATES the observer write `--glass-ambient-hue` (glass-foundation.mjs:81). The new A1: **KEEP the
   bias-write assert** (the observer writes `--glass-tint-bias-hue`) **+ ADD a surface-composes-the-mix wiring
   assert** (the content-tier `:where()` rule composes the bias into `--glass-tint-source`) **+ ADD a
   `getImageData` paint bite** (the bloom REACHES a plate — closing the write-proven≠paint-proven gap). The
   `useBloomUp.test.ts` `8.000%` asserts move to the bias token.
9. **DROP `proof:adaptive-observer`/`proof:glass-accent`/`proof:glass-cohesion`-non-feedback from the worry list**
   — they are PRESENT on disk with ZERO fill/ambient refs (not "absent").
- **★ CONVERGENCE HONESTY (critique mustFix):** the generalized ladder source-rule (steps 1,3,4,5) is NOT landable
  until WS1's field is on disk; **only the `.liquid-pill` substitution close (step 6, M5a) is bindable NOW.** The
  M5 ceiling this pass is the M5a paint + the WS1-gated design — a small fraction of M5. Do not report the bias-arm
  design alone as near-complete.
- **π (gated behind WS1):** ≤2 SURFACE pairs + 1 named input bias; every read axis WRITTEN (computed-style proven,
  NOT grep); the bloom proven LIVE by `getImageData` on a real bloomed `.liquid-pill` (the substitution trap
  closed); chips paint their data hue; both modes, both engines.

### 3.6 · DRY + dead-token delete (M6) and the demo rehome (M9)
- M6: `--glass-tint-floor` (one home — the 12%/15% per-mode pair); `.glass-press-squash`/`--press-squash` (kills 3
  pastes, PRM-zeroed via `--motion-weight: 0`); `--glass-warm-zero: oklch(0.9 0.05 75 / 0)` (kills 5 pastes — the
  Safari premultiply-hole fix, NEVER bare `transparent`); `.loud` composed; shared `[data-cast] .cartoon-cast`
  rule. **DELETE the pure-redundant a11y-fallback.css:213-228 GUARD-2 background re-pastes** (ladder paints those
  unconditionally; the guard's job is the prefix). Delete the GLASS dead tokens (`--glass-saturate-deep-ceiling` +
  4 stale comments; `--glass-spine-blur`/`-opacity`; `--cartoon-cast-dx`/`-dy` + legs). Inline-and-delete the
  single-consumer `--glass-bg-clear`. KEEP `--glass-saturate-deep`, `--glass-spine-vignette`/`-border`,
  `--glass-bg-dock` (LIVE via comma-fallback). Boundary: A-deadcode owns the radius/spring dead tokens.
- M9: split `glass/liquid-morph.css` (850L — over the 500 bound) into colocated `glass/liquid-morph/*.css`
  partials (bloom · fission · ambient) under a thin `@import` root; the library rules → `dock/morph.css`/
  `material.css`, the demo-only surfaces → `demo/`. The bias→plate re-homes onto WS1's live field scope with the
  FRESH clamp (§3.5.5). Delete `liquid-enter.css` (verify 0 consumers) + `scripts/tmp-glass-rest.mjs`. COORDINATE
  WS2 (dock) + A-deadcode (the `useLiquidMorph.ts` TS half is 0-consumer dead). SEQUENCE LAST.

### 3.7 · Dynamics — lensing + NEUTRAL specular carry the read at lower blur (M8, field-gated)
- Strengthen W-LENSING squircle refraction + the NEUTRAL specular hairline — the read-carrier at the calmer blur.
  **The specular hairline (NOT the SVG displacement) carries the Safari glass read** (lensing rides `@supports
  (backdrop-filter: url(#…))`, dead on Safari per WebKit bug 245510). **REFERENCE FENCE:** keep the resting body
  specular NEUTRAL/achromatic (`~rgb(78,78,78)`, the Siri pill body register); reserve the PRISMATIC cool→white→
  warm edge dispersion for WS6's active/motion edge ONLY — chromatic-dispersing the resting hairline IS the
  metallic over-correction (do not conflate).
- Add the iOS-27 backdrop-HUE sample to `useGlassBackdropLuminance` (sample backdrop HUE, write the unified INPUT
  BIAS channel `--glass-tint-bias-hue` — the WS2-13 chroma-sample term, NOT a new axis). Keep it DEMO-PRIVATE (off
  the public glass barrel → never in the root-barrel value.js eager-graph); ride the EXISTING ≤4Hz rAF +
  IntersectionObserver throttle (no new rAF); wrap `createSpecularWriter` (never fork `--mouse-x/y`).
- **The flare: DELETE-first, decided ON PAINT.** Capture the no-flare baseline on real GPU both engines; prove the
  squash + `--shadow-dock` omni + `--glass-key` rim carry the depth-pop. ONLY if it under-reads, drive the flare
  PARENT-ATTR-DRIVEN (`.glass-dock[data-punching] > .dock-flare { opacity; transition }`) — NEVER the dead
  `inherits:false` var (it cannot read the parent), with a Safari z-order-above-`::after` verify.

---

## 4 · FILES TOUCHED

**Phase 1 (field-independent — land + paint-verify NOW):**
- `src/styles/tokens/shadow.css` — `--cartoon-ink` re-express to the proven in-gamut pin (M1); re-derive the fallback.
- `src/styles/tokens/dark-arm.css` — dark arm = (A) delete the re-declaration OR (B) per-mode lower-L, per §7 sign-off (M1).
- `src/styles/dock/shape.css` — delete 208-249 (cast block + dead travel + cast PRM) (M2); add the dock-scope PRM
  `--motion-weight: 0` arm (M2).
- `src/components/custom/dock/GlassDock.vue` — delete the `<span class="cartoon-cast">` (M2, line 606).
- `src/styles/glass/material.css` — mint the Job-B `contain: paint` on the `.glass-material` group (M3, 36-43).
- `src/styles/glass/surfaces.css` — retire the per-class `contain` (M3, lines 34/79) into the group.
- `src/styles/glass/glass-chip.css` — retire the standalone `isolation` (M3, line 69) into the group.
- `src/styles/glass/liquid-morph.css` — `.liquid-pill:104` raw `var(--glass-bg-floating)` → the element-level
  `color-mix` (M5a, the substitution-trap close — bindable NOW).
- `scripts/proof-no-gray.mjs` — the device-free `cartoon-ink-warm-in-gamut` witness, light+dark source (M1, born-RED).
- `scripts/proof-glass-clip.mjs` (NEW) — the Job-B group-containment gate, Lightning-minified-form-aware (M3, born-RED).
- `tests-visual/glass-standardization.spec.ts` (NEW) — the cast getImageData arm (M1) + the `.liquid-pill`
  rest/bloom byte-identity arm (M5a); enroll in webkit testMatch.
- `tests-visual/glass-clip.spec.ts` (NEW) — the corner-arc + descendant-bleed + dock-no-wedge π (M3); enroll in webkit testMatch.
- `tests-visual/playwright.config.ts` — enroll the 2 new specs in the `webkit` testMatch allowlist.

**Phase 2 (field-gated):**
- `src/styles/tokens/glass.css` — the blur-peer band + the saturate-revert (M4); retire `--glass-blur-dock`/
  `-btn`/`--glass-saturate-dock`; rename `--glass-ambient-*` → `--glass-tint-bias-*` (kept @property), delete
  `--glass-fill-*` @property regs LAST (M5).
- `src/components/ui/button/index.ts` — demote the default Button off `glass-deep` (M4, line 69).
- `src/styles/dock/shell.css` — `--dock-surface-blur` → `--glass-blur-resting` (M4).
- `src/styles/tokens/dark-arm.css` — lift dark-resting saturate/brightness BEFORE retiring `--glass-saturate-dock` (M4).
- `src/styles/glass/ladder.css` — the shared `--glass-plate-tinted` recipe (DRY inner/outer, M5.4); the
  content-tier `:where()` SOURCE rule composing the bias (M5.3).
- `scripts/proof-glass-cal.mjs` — the ~6-gate rebaseline + the dock==button==Card SAME-token assert (M4).
- `src/composables/motion/useBloomUp.ts` — re-point the writers to the bias channel; `removeProperty` release (M5, 340/343/349).
- `src/composables/glass/useGlassBackdropLuminance.ts` — re-point to the bias channel (M5, line 448) — **WS1 co-owner.**
- `scripts/proof-glass-foundation.mjs` — A1 = bias-write + composes-the-mix wiring + a getImageData paint bite (M5).
- `tests/composables/motion/useBloomUp.test.ts` — the `8.000%` asserts move to the bias token (M5).

**Phase 3:** the consumer folds (Badge/SelectableChip/IconChip/feedback-tone/accent-tone), the M8 dynamics JS, the
M9 rehome + dead-file deletes (`liquid-enter.css`, `scripts/tmp-glass-rest.mjs`).

---

## 5 · WAVE BREAKDOWN (10 waves, 3 phases — each carrying its validated mechanism + paint-π bar)

### Phase 1 — the visible D3 fixes (field-INDEPENDENT, land + real-paint-verify NOW)

**BG.W-CARTOON-INK-GAMUT (M1).** Re-express `--cartoon-ink` to the prototype-PROVEN in-gamut pin (`clamp(0.28,l,
0.34) clamp(0.030,c,0.050)`); dark arm DRY-collapse OR per-mode lower-L per the §7 sign-off; re-derive each
fallback from its painted pixel; ALPHA-deepen the contrast arms (no chroma). **Gate:** `proof:no-gray`
`cartoon-ink-warm-in-gamut` witness, **device-free in node**, born-RED on HEAD's `rgb(49,0,0)` light AND dark,
computing the actual sRGB and asserting R>G>B>0 + warm-hue 50-70° (NOT chroma≥floor — the chronic-breaker). **π:**
`getImageData` on a REAL `box-shadow: var(--shadow-cartoon-md/-lg)` element over white + warm field + dark =
R>G>B, B>0, NOT `rgb(N,0,0)`, warm-hue, in-gamut, all 3 stamp rungs, both modes, Chrome NOW + **real macOS Safari
sign-off OUT of CI.** Sequence M1 ≤ M2.

**BG.W-DOCK-CAST-RETIRE (M2).** Delete shape.css 208-249 + GlassDock.vue:606 atomically; add the dock-scope PRM
`--motion-weight: 0`; post-build `getComputedStyle`-confirm 0 in the concatenated bundle. The flare → W-GLASS-
DYNAMICS (DELETE-first). **Gate:** `proof:dock-clip-reveal` + `proof:no-layout-animation` green on the BUILT tree.
**π:** the dock bottom-left `getImageData` matches the backdrop — no maroon wedge / no fringe, both docks, both
modes, Chrome AND real Safari. Maroon claim SCOPED to the dock PLATE (control/button/chip casts stay maroon until
M1 lands).

**BG.W-GLASS-CLIP-DISCIPLINE (M3 — RE-SCOPED to Job B).** Reconcile: Job A clips natively on modern Chrome (the
matrix proved it); the visible defect is **Job B** (descendant bleed) + the M2 wedge. Mint `contain: paint` on the
`.glass-material` group (material.css:36-43); retire the per-class `contain`/`isolation` into the group; prove the
`.glass-chip` bloom survives. **Build + run the MISSING Job-B matrix cell** (over-corner child, parent WITH vs
WITHOUT `contain:paint`, real GPU both engines). **Gate:** `proof:glass-clip` (NEW, born-RED) — the group carries
the Job-B containment, Lightning-minified-form-aware (`content` ≡ `layout style paint`); the per-class clip
retired; the radius+clean-corner assertion lives in the LIVE π (not the non-implementable stylesheet regex).
**π (the trap-closer):** capture the corner on REAL GPU Chrome AND real macOS Safari, both modes, over a busy
backdrop, on the BUILT route with real `<Card>`/`<Dialog>`/`<Popover>`/`<Button>` + a descendant-over-corner child
+ `::before`/`::after` — `getImageData` = clean arc; dock bottom-left no wedge; re-ground on the element's OWN
backdrop corner. **Blast:** prototype against the BUILT bundle; `contain:paint` (not `layout style paint`) on the
group; scope to card/content + dock tiers (EXCLUDE floating/overlay) if any arrow/popper/submenu/HoverCard/
focus-ring clips; run `proof:dock-plate-clearance` + `proof:nested-backdrop-budget`. **Owe:** WebKit-bug-158483
version-grounding; the binding real-macOS-Safari capture (×6).

**BG.W-GLASS-CLIP-DISCIPLINE rider — M5a (the substitution-trap close, field-INDEPENDENT, bindable NOW).** Land the
`.liquid-pill` fix (liquid-morph.css:104 raw `var(--glass-bg-floating)` → the element-level `color-mix`). **π:**
`buildPassed=true`; `getImageData` `[data-testid=liquid-pill]` at rest (byte-identical to today) AND mid-bloom (the
warm hue paints). *(Carried in Phase 1 alongside M3 in `glass-standardization.spec.ts`; the generalized M5 tint
collapse stays Phase 2, WS1-gated.)*

### Phase 2 — the architectural collapse (high-blast; gated behind Phase 1 + WS1's field + the glass-cal rebaseline)

**BG.W-GLASS-BLUR-PEER (M4).** Demote the default Button off `glass-deep`; dock = button = default-Card = menu-item
all resolve `--glass-blur-resting`; band `wash 1 / quiet 8 / resting 8 / floating 10 / overlay 10` (no `BAND_LO`
edit); content saturate-revert 1.4-1.6 → 1.2 (PAINT sign-off, system-identity); dock saturate HELD at 1.2.
**Rebaseline the ~6 coupled gates IN-DIFF** (§3.4) + add the **dock==button==Card SAME-`--glass-blur-resting`-token
assert** (the BD-regression lock). **Run the Safari `var()`-in-backdrop-filter blur capture on real macOS Safari 26
BEFORE ship; ship the fixed-px webkit arm if it does not resolve.** **π (gated behind WS1):** dock + Card + Button
resolve the SAME `backdrop-filter` blur (`getComputedStyle` parity + the SAME-token gate), ladder calmer, field
structure reads through, demoted surfaces still read as glass (lensing+specular), both modes, both engines.

**BG.W-GLASS-TINT-UNIFY (M5, the LEAST-converged wave — ONE atomic diff).** §3.5: writers write the INPUT BIAS
channel `--glass-tint-bias-*` (the FALSIFIED direct-source re-point CORRECTED); the content-tier `:where()` rules
compose the bias into `--glass-tint-source` via the SOURCE rule (legibility-ink wins the bright bucket) + strength
`max()`; the DRY `--glass-plate-tinted` recipe declared ONCE (inner = the FULL W55 continuous strength); fold
fill-tint; rebuild the clamp FRESH on WS1's live scope; the @property regs delete LAST behind a born-RED bite;
`proof:glass-foundation` A1 = bias-write + composes-the-mix + a getImageData paint bite. **Sign-offs required
first:** Badge data-hue, rest-warmth delta, SelectableChip dilution. **≤2-pairs:** 2 surface pairs + 1 named input
bias (surfaced explicitly). **π (gated behind WS1):** every read axis WRITTEN (computed-style); the bloom proven
LIVE by `getImageData`; chips paint their data hue; both modes, both engines.

**BG.W-GLASS-IDIOM-FACTOR (M6).** §3.6 DRY + dead-token delete. **π:** each idiom once; zero dead tokens/@property;
press-squash carries the liquid-weight law (PRM-zeroed); `profile:budget` + `proof:css-critical` net-negative/flat.

### Phase 3 — consumer + recalibration + cleanup (depends on Phase 2 + WS1)

**BG.W-GLASS-CONSUMER-BAND (M5 consumer arm).** Fold IconChip/SelectableChip/Badge/DockExampleTile/Atlas onto the
unified plate/rim seam (handle the fill-tint strength/hue asymmetry). **π:** each consumer paints via the seam.

**BG.W-DOCK-LEGIBILITY-RECAL (M5+M8; co-lands the M4 saturate-revert).** Re-anchor the dock AA self-darken to the
unified plate tint (primary anti-gray, saturate 1.2 secondary); rewire `useGlassBackdropLuminance` onto WS1's
shell-aurora canvas (the FRESH clamp). **π:** dock reads warm-cream-transmissive over the live aurora, AA holds, no
gray, no metallic, both modes, both engines.

**BG.W-GLASS-DYNAMICS (M8; the re-grounded flare).** §3.7: strengthen lensing + NEUTRAL specular; add the
backdrop-HUE sample (writes the bias channel); the flare DELETE-first, parent-attr-driven ONLY if paint proves the
baseline under-reads (Safari z-order verify). **π:** the dock/card glass picks up the field hue sub-perceptually;
the dock punch reads without a sticker; the demoted-blur plate reads as glass via lensing+specular.

**BG.W-DEMO-STYLE-REHOME (M9; SEQUENCE LAST).** §3.6 M9. COORDINATE WS2 + A-deadcode. **π:** no `src/styles` file
imported solely by demo; no glass file >500; `profile:budget` + `proof:css-critical` net-negative/flat; no visual
regression on the BUILT route, both engines.

---

## 6 · ACCEPTANCE / REAL-PAINT-π BAR (the cardinal bar)

Device-free gates passing is NOT the bar. COLOR π = `getImageData`; BLUR-radius π = `getComputedStyle`. The 2 new
specs are ENROLLED in the `webkit` testMatch; **the BINDING Safari sign-off is a SEPARATE manual real-macOS-Safari
capture, OUT of CI** (bundled-WebKit gamut-maps oklch + Metal-AAs corners differently).

1. **Warm-brown cast** — composited cast (REAL `box-shadow` render) over white + warm field + dark = R>G>B, B>0,
   NOT `rgb(N,0,0)`, warm-hue 50-70°, in-gamut, both stamp Ls, both modes, both engines. `proof:no-gray`
   cartoon-ink witness (device-free, light+dark) green; `proof:shadow-contract` UNTOUCHED. **Field-independent — land NOW.**
2. **Clean clip (Job B)** — every `[data-slot=card]`/glass surface resolves the group `contain` (radius + the
   descendant-containment); top-corner `getImageData` over a busy backdrop = clean rounded arc; a descendant-
   over-corner child does NOT bleed; dock bottom-left no wedge; focus ring + paper cast + overlay arrows + submenus
   + HoverCard survive. `proof:glass-clip` green + the real-GPU/Safari corner π green (element's OWN backdrop
   corner, BUILT route, real components). **Field-independent — land NOW.**
3. **`.liquid-pill` substitution closed (M5a)** — `getImageData` byte-identical at rest, warm hue at mid-bloom;
   `buildPassed=true`. **Field-independent — land NOW.**
4. **Dock PRM** — `getComputedStyle` confirms `--motion-weight: 0` on `.glass-dock` under emulated reduce in the
   concatenated bundle. **Field-independent — land NOW.**
5. **ONE material** — one frame: dock + Card + Button as ONE glass material over the WS1 field; SAME
   `backdrop-filter` blur (`getComputedStyle` parity + the SAME-token gate assert), SAME plate tint (`getImageData`
   ΔE band), field structure reads through; demoted surfaces read as glass on Safari (the var-blur resolution
   settled). Both modes, both engines. **Gated behind WS1.**
6. **≤2 chromatic surface pairs + 1 named input bias** — exactly 2 `(hue,strength)` SURFACE pairs (plate, rim) + 1
   labeled INPUT bias; every read axis WRITTEN (computed-style proven, NOT grep); the bloom proven LIVE by
   `getImageData` on a real bloomed `.liquid-pill`; chips paint their data hue. **Gated behind WS1.**
7. **DRY + dead-free** — each idiom once (the `--glass-plate-tinted` recipe ONE home); zero dead tokens/@property;
   `profile:budget` + `proof:css-critical` net-negative or flat.
8. **a11y/perf/cross-engine fences** — the 3 `--glass-level` brackets reach blur(0)/firm-up; PRM keeps-fade-drops-
   transform + the dock-scope `--motion-weight: 0`; compositor-only (`proof:no-layout-animation`); new JS off the
   dock.js chunk + the root-barrel value.js eager-graph fence; the build injects the `-webkit-` twin; Safari
   lensing degrades to specular-carries-the-read.

---

## 7 · FOLDED / DEFERRED ITEMS + SIGN-OFFS

- **WS1 shell-aurora field** — the live-paint precondition, NOT ON DISK at HEAD. The Phase-2/3 paint bars are
  IMPOSSIBLE without it — the residual gate. M5/M9 sequence strictly AFTER WS1 lands paint-stable.
- **The 4 PAINT/DESIGN SIGN-OFFS owed BEFORE their wave lands:**
  - **Dark-cast lightness (M1)** — the dark-arm DRY-collapse (A) raises the dark cast L 0.20→0.34 (a materially
    lighter sticker). Sign off the lighter cast OR adopt the per-mode lower-L form (B). *(System-identity decision.)*
  - **Content saturate-revert 1.4-1.6 → 1.2 (M4)** — needs PAINT sign-off over WS1's warm field, not gate-green.
  - **The 3 net-new-behavior tint folds (M5)** — Badge `data-hue` activation, the rest-warmth delta from the
    deleted `--glass-atom-tinted` warm-amber-at-rest, SelectableChip dilution sub-perceptual.
- **The binding real-macOS-Safari `getImageData` captures (×6)** — owed, OUT of CI: the warm-brown cast (M1), the
  Job-A/Job-B corners (M3), the `var()`-in-`-webkit-backdrop-filter` blur resolution (M4), the one-material frame
  (M4/M5). Bundled WebKit is a PROXY, non-binding.
- **`--glass-depth` lerp** — LEAVE (the BB.W-DEEP-GLASS fence; deep saturate stays 1.8 unless paint shows
  metallic). **`--surface-tint-*` stays `in srgb`** (AW.W26 brand fence). Do not re-litigate.
- **Radius/spring dead tokens** (`--corner-k-*`, `--corner-shape-*`, `--spring-timeline-*`), **`useLiquidMorph.ts`
  TS half** — A-deadcode's `BG.W-DEADCODE-CUT`/`BG.W-DEAD-TOKEN-SWEEP`; W3 owns the CSS half only.
- **The chronic-breaker gate** (a chroma-floored token's resolved hue + gamut AT its actual L — ~10 gates assert
  chroma≥floor, ZERO assert hue-at-L; produced BOTH the maroon AND the metallic saturate) — the
  `cartoon-ink-warm-in-gamut` witness is the FIRST instance; the general predicate is surfaced to WS7's
  probe-vocabulary widen.
- **The ~30 `proof-*glass*.mjs` gate sprawl** — a close-time consolidation, surfaced to WS7, NOT a WS3 wave.
- **The dock morph-blur ramp** (the user's "dock blurry too long" — the collapse/expand blur-hold window) — WS2's
  dock-morph domain, NOT the static-radius peer M4 owns. Flag to WS2.

---

## 8 · OPEN RISKS (the falsification frontier — pass-3 converged)

- **R-CLIP-JOBB (HIGH, the #1 owed) — the visible defect is Job B, and the Job-B matrix cell was NEVER run.** The
  matrix proved Job A native; the wave's real fix (group `contain:paint`) and its over-corner-child capture are
  owed. If the Job-B cell shows the group `contain:paint` does NOT clip the descendant on a target engine, the
  primitive choice re-opens. Build + run it before close.
- **R-SAFARI-BLUR (HIGH, prototype build=FALSE) — does `var()` resolve in `-webkit-backdrop-filter` on Safari 26?**
  If not, the unified register paints FLAT plates on Safari and the webkit arm must ship a FIXED px. The
  headless-green trap candidate — the prototype DESIGNED the 4-region differential but never ran it. Settle on real
  macOS Safari BEFORE M4 ships.
- **R-TINT-FALSIFIED (HIGH, prototype-VERIFIED) — the direct-source re-point is dead; the bias channel is the
  resolution.** Every content-tier surface re-declares `--glass-tint-source: ink` on itself → an ancestor write is
  clobbered. The fold flows through `--glass-tint-bias-*` (an inherited input the `:where()` rule composes). AND
  the substitution trap (`.liquid-pill` reads raw `--glass-bg-floating`) means the bloom may not paint at all —
  M5a getImageData proves it or the wave is unproven.
- **R-WS1 (HIGH) — M5/M9 EDIT the function WS1 retires + the clamp scope is DEAD.**
  `useGlassBackdropLuminance.ts:448` is the same-function edit collision; WS1 overturned its own field mechanism at
  13%. The `[data-paper-field]` attr scope is dead → the clamp rebuilds on WS1's live scope, unnameable until WS1
  is paint-stable. **Designate ONE owner for that file; M5/M9 sequence strictly AFTER WS1.**
- **R-SAT-REVERT (HIGH) — the content saturate-revert reds ~6 coupled gate sites AND is a system-identity
  decision.** Rebaseline IN-DIFF; hold dock at 1.2; the 1.4-1.6 → 1.2 revert needs PAINT sign-off over the field.
- **R-DARK-IDENTITY (MEDIUM) — the M1 dark-arm DRY-collapse lightens the dark cast.** Sign off the lighter cast or
  adopt the per-mode lower-L form. Either is in-gamut warm brown; it is a DESIGN choice, not a gamut necessity (the
  pass-3 "gamut necessity" rationale is corrected).
- **R-BLAST (MEDIUM) — the M3 group `contain` double-contains the overlay band + the dock controls.** reka arrows/
  submenus may clip; the dock-control containment may re-arm the BA.W-DOCK-GEOMETRY freed cross-axis. Use
  `contain:paint` (not `layout style paint`); prototype against the BUILT bundle; scope to card/content + dock
  tiers if it regresses; run `proof:dock-plate-clearance`.
- **R-FINDING-A (LOW, prototype-PROVEN) — the cast pixel prediction floors lower than nominal.** Drop the exact-rgb/
  L pin; the bar is structural warm-brown. @18%-over-white is ADVISORY (7-unit margin, GPU-AA-flippable).
- **R-RESIDUAL (the convergence gate) — the binding cross-engine PAINT is the unmet ~35%.** Phase-2/3 require WS1's
  field (not on disk); Phase-1 requires the real-GPU Chrome captures (M1 proven; M3 Job-B owed; M5a bindable) +
  the real-macOS-Safari sign-offs (all owed). Until both exist, the workstream is mechanism-validated but NOT
  paint-closed.
- **R-SEQUENCE — build the GATES first (born-RED):** `proof:no-gray` cartoon-ink witness (device-free, light+dark),
  `proof:glass-clip` (Job-B group-containment, after the matrix), the `proof:glass-cal` ~6-gate rebaseline. Phase 1
  (M1·M2·M3·M5a) independent + low-blast (M1 ≤ M2). Phase 2 high-blast gated behind Phase 1 + WS1 + the rebaseline.
  Phase 3 couples WS1 (field) + WS2 (dock). **W-GLASS-TINT-UNIFY lands as ONE atomic diff or not at all.**
