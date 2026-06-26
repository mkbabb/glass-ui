# BG-WS3 · Glass standardization — ONE coherent glass register (pass-3 spec)

> Workstream: BG-WS3-glass-standardization · **Pass 3 — BIND THE PAINT + RESOLVE THE TINT RE-OPEN**
> Base: `tranche/BG` @ `aaa254c8` (every fact below RE-VERIFIED LIVE on disk during this synthesis)
> Predecessor: `SPEC-pass2-converged.md` (architecture sound, mechanisms validated, **PAINT still ABSENT**).
> This pass does NOT restart — it advances the unconverged frontier:
> **(a)** the clip mechanism is a genuine CONTRADICTION, not just "capture missing" — settle it by build;
> **(b)** the blur mental model is INVERTED (the button is the heavy surface, not the dock) — reframe M4;
> **(c)** the Safari `var()`-in-`backdrop-filter` blur resolution is the live headless-green trap — settle it;
> **(d)** the ambient axis re-opens TINT-UNIFY as a behavior-preserving re-point with a SOURCE conflict
>   (not just a strength multiplex), on a DEAD `[data-paper-field]` attr scope — rebuild fresh on WS1's scope;
> **(e)** WS1 and WS3 edit the SAME function — one owner, one diff.
>
> **Cardinal bar (unchanged): real-paint-verified on real GPU, Chrome AND real macOS Safari, both modes.**
> The headless-green/visually-broken trap shipped the maroon + the rect-fringe THREE times. Methodology
> (SETTLED — do not re-litigate): **COLOR π = `getImageData` only** (Chrome 149 serializes the un-clipped
> `oklch()` back, color-blind to the painted `rgb(49,0,0)`); **BLUR-radius π = `getComputedStyle`** (serializes
> faithfully). Trust the painted pixel.

---

## 0 · WHAT THIS PASS CHANGES (the honest delta from pass-2)

Pass-2 converged the architecture and validated the mechanisms device-free, but left FIVE items unsettled.
Pass-3 settles or sharpens each:

| Frontier item | Pass-2 state | Pass-3 resolution |
|---|---|---|
| **Clip mechanism** | "`contain` clips the host fringe; `isolation` is a fallback" | **CONTRADICTED by the repo's OWN device-verified note** (surfaces.css:32 — `contain:paint` clips DESCENDANTS only, the host's own rim/shadow NOT clipped). The D3 card-corner fringe is the HOST's own backdrop raster → `contain` is the WRONG primitive for it. **Disentangle the TWO clip jobs** (host-own-backdrop-corner vs descendant-bleed) and let the 4-cell real-GPU matrix pick the primitive per job. The gate must NOT hard-code `contain`-present. |
| **Blur register** | "dock 9 / btn 13 / card 10 — converge to one" | **INVERTED:** the default `<Button>` composes `glass-wash btn-glass glass-deep …` → **16px, the HEAVIEST surface** (button/index.ts:69). The dock (9px) is already CALMER than the button. The user's *"dock blurry too long"* is the **morph-ramp window** (blur ramps + holds during collapse/expand — WS2's domain), DISTINCT from static radius. M4 demotes the BUTTON; the morph-ramp is flagged to WS2. |
| **Safari `var()`-in-backdrop-filter** | "add the `-webkit-` twin" | The twin is **already BUILD-INJECTED** (vite.style-assets.ts:497). The REAL open question: does `-webkit-backdrop-filter: var(--glass-blur-*)` actually BLUR in Safari 26, or does the documented CSS-var-in-backdrop-filter limitation force FLAT plates? **This is the live headless-green trap candidate** — settle by real-macOS-Safari capture BEFORE the unified register ships; if it does not resolve, the webkit arm ships a FIXED px. |
| **Ambient tint axis** | "behavior-preserving re-point + max() multiplex" | The `[data-paper-field]` ATTRIBUTE scope the AUGMENT-2 arm keys off is **DEAD** (PaperBackdrop sets the `.paper-field` CLASS, nothing sets the attr) — only `.liquid-stage` carries live ambient. So "relocate the clamp" relocates DEAD weight; **rebuild the clamp on WS1's live scope.** AND the multiplex is a SOURCE conflict (ink vs field-hue), not only a strength clobber — `max()` alone is insufficient. |
| **WS1 coupling** | "gated behind WS1's field" | Stronger: M5/M9 **EDIT the exact function WS1 retires** (`useGlassBackdropLuminance.ts:448`), and WS1 overturned its own field mechanism at 13%. **Designate ONE owner for that file** — a single coordinated WS1+WS3 diff — and treat the M5 re-point TARGET as unnameable until WS1's field is paint-stable on disk. |

**Phase-1 (M1 ink-gamut, M2 dock-cast-retire, M3 clip) is FIELD-INDEPENDENT — land + real-paint-verify NOW.**
Phase-2/3 (blur-peer paint, tint-unify, legibility-recal, dynamics) gate behind WS1's warm field on disk.

---

## 1 · GESTALT GOAL (the bar — unchanged)

Make the dock, buttons, cards, items, and menus read as ONE glass material — the iOS-26/27 "Liquid Glass"
single-material discipline. Reference anchor: `scratchpad/evidence/frames-2207/f006` (the iOS home frame) —
the bottom dock bar, the Search pill, and the widget cards ALL read as the SAME translucent material at the
SAME subtlety; the wallpaper reads THROUGH every plate equally; NO surface is a "heavier dock." The glass
read comes from (a) a bright top edge-light specular hairline + (b) a soft NEUTRAL contact shadow + (c) edge
LENSING, NOT a heavy Gaussian. Saturation is LOW (glass transmits, it does not amplify).

1. **ONE material at varying opacity** — dock pill, content Card, button, menu row all resolve the SAME
   `--glass-blur-resting` and the SAME plate tint. Not a heavier/special dock, not a heavier button.
2. **Subtle blur, structure survives** — calmer than 4.2.0's `8/10/13/13/9/16`. The glass read is carried by
   edge lensing + a NEUTRAL specular hairline (W-LENSING is built), not a heavy Gaussian.
3. **Perfect corner clip** — every `[data-slot=card]` corner is a clean rounded arc; the blurred backdrop
   raster clips to the radius. ONE clip discipline, the RIGHT primitive per job.
4. **Soft ambient elevation, ZERO chromatic cast** — a soft omni drop-shadow; never a hard colored offset
   sticker on glass chrome. The composited cast over white AND the warm field resolves a warm BROWN
   (R>G>B, B>0, never `rgb(N,0,0)`), both stamp lightnesses, both modes, both engines.
5. **ONE chromatic seam** — collapse the five (live: SEVEN) disjoint chromatic tint axes to exactly TWO
   `(hue,strength)` pairs: `{plate}` + `{rim}`. Zero inert read axes (computed-style proven, NOT grep — the
   methodology trap that called ambient "inert" when JS `setProperty` writes it).
6. **DRY** — the re-pasted idioms declared ONCE; zero dead tokens/`@property` in the glass cascade.

---

## 2 · VERIFIED GROUND TRUTH @ HEAD (re-checked LIVE this pass)

### The maroon (W-CARTOON-INK-GAMUT) — root + the in-gamut answer
- `--cartoon-ink: oklch(from var(--foreground) clamp(0.14, l, 0.18) max(c, 0.11) h)` (shadow.css HEAD);
  dark arm `clamp(0.20, calc(1 - l), 0.30) max(c, 0.11) h` (dark-arm.css:177). `--foreground` ≈ `oklch(0.216
  0.006 56)` light. The `max(c, 0.11)` floor lifts chroma ~18× AT a clamped-LOW L (≤0.18) → that
  `(L0.18, C0.11, H56)` point is OUT of sRGB gamut → per-channel clamp → **`rgb(49,0,0)` light / `rgb(51,1,0)`
  dark — the forbidden `rgb(N,0,0)` maroon.** Two fallback literals `#4a3320` / `#5a3f28` (warm brown, correct)
  ride only the `@supports not (color: oklch(from …))` arm — the fallback is RIGHT, the primary is the bug.
- **★ THE IN-GAMUT FIX REQUIRES RAISING L *AND* LOWERING CHROMA TOGETHER (the precision the seed-audit
  missed).** Lowering chroma alone at the floored `L0.18` STILL clips B→0 (`oklch(0.18, 0.045, 56) → rgb(32,11,0)`,
  B=0 — the seed-audit's `clamp(0.018,c,0.045)` proposal FAILS). The committed pin RAISES the L floor:
  `oklch(from var(--foreground) clamp(0.28, l, 0.34) clamp(0.030, c, 0.050) h)` → at `L≥0.28, H56, C0.03-0.05`
  the point is IN gamut → `rgb(52,37,26)` (warm brown, R>G>B>0, verified by the reference fleet's
  `verify-gamut.mjs`). **The L-raise is what makes the chroma affordable** — a fix that only touches `max(c,…)`
  re-maroons. **FINDING A (binding):** the OKLCh→sRGB clamp floors the PAINTED L LOWER than the nominal 0.28
  target (a darker-but-warm brown); **drop the exact-rgb/L pin** — the bar is STRUCTURAL warm-brown.

### The dock wedge + the dead flare (W-DOCK-CAST-RETIRE) — verified W3C-dead
- `GlassDock.vue:606` emits `<span class="cartoon-cast" aria-hidden>` UNCONDITIONALLY on every dock.
  `shape.css` `.glass-dock > .cartoon-cast { box-shadow: var(--shadow-cartoon-md) }` (the maroon offset, down-LEFT
  `translate: -travel +travel`) → the bottom-left **red wedge** (a descendant child painting into the corner gap
  of the `contain`-rect, where the 9999px pill radius leaves a notch). On `[data-punching]` → `--shadow-cartoon-lg`.
- **The kinetic cast-travel is W3C-DEAD (the `inherits:false` trap).** `@property --dock-punch-stretch { inherits:
  false; initial-value: 1 }` (shape.css:41). Set to `1.22` on `.glass-dock[data-punching]`, but the CHILD
  `.cartoon-cast` reads `var(--dock-punch-stretch, 1)` → an `inherits:false` registered property reads its
  **registered initial `1`** across the parent→child boundary (NOT the parent's 1.22, NOT the `var()` fallback,
  which fires only for an UNREGISTERED property). So `--cast-travel = clamp(0, (1−1)/0.22, 1) = 0` — **dead
  forever.** The box-shadow itself paints STATICALLY (the resting maroon wedge is real). So retiring the cast
  removes a DEAD travel mechanism + the static wedge — not a tuning.
- The surviving compositor press-SQUASH (`--dock-punch-stretch` on the `scale:` channel of
  `.glass-dock[data-punching]` ITSELF — read on the SAME element where set, so LIVE) is KEPT.
- **The dock PRM bug:** `.glass-dock` pins `--motion-weight: 1` UNCONDITIONALLY (shape.css:192), overriding the
  `:root` PRM-zero → the surviving squash still scales `1→1.22` under reduce. M2 ADDS a dock-scope
  `@media (prefers-reduced-motion: reduce) { --motion-weight: 0 }`.

### The clip dialects (W-GLASS-CLIP-DISCIPLINE) — the CONTRADICTION
- THREE dialects: `.glass-card` → `contain: layout style paint` (surfaces.css:34); `.glass-btn` → `contain:
  paint` (surfaces.css:79); `.glass-chip` → `isolation: isolate` (glass-chip.css:69). The five ladder rungs
  `.glass-{wash,quiet,resting,floating,overlay}` (ladder.css) + the `.glass-material` GROUP (material.css:36)
  carry **NO** clip/overflow/contain/isolation; pseudos carry `border-radius: inherit`.
- **The real `<Card>` composes `surfaceClass('glass','resting')` → `.glass-resting`, a LADDER RUNG — NEVER
  `.glass-card`** (grep `glass-card` in `components/ui/card/` = ZERO). So a bare `<Card>` clips NOTHING on the
  host box → the host's own `backdrop-filter` raster aliases to the rect at the rounded corner = the D3
  card-corner defect.
- **★ THE PRIMITIVE CONTRADICTION (the #1 pass-3 finding).** surfaces.css:32 carries a DEVICE-VERIFIED note:
  *"`contain: paint` clips DESCENDANTS only — the card's own rim/drop-shadow is NOT clipped."* The D3 card-corner
  fringe is the HOST's OWN backdrop raster (NOT a descendant). **So `contain` cannot be the host-fringe fix** —
  the standard cross-browser fix for the host's own rounded-`backdrop-filter` corner is **`isolation: isolate`**
  (forces a self-painting stacking context the backdrop clips within) or `overflow: hidden`+radius (FORBIDDEN —
  clips focus ring). The pass-2 "`contain` clips the host fringe" claim is falsified by the repo's own note. **The
  matrix decides — do not enshrine `contain` in the gate.**

### The seven tint axes (W-GLASS-TINT-UNIFY) — three identical plate mixes + the LIVE ambient
- The IDENTICAL `color-mix(in oklab, <rung>, <hue> <strength>)` plate op runs under THREE names:
  (1) `--glass-tint-source`/`-strength` (W55 legibility PLATE, glass-fx.css:157 + ladder.css ×5 — KEEP as plate);
  (2) `--glass-fill-tint`/`-strength` (@property glass.css:399, BE per-instance plate FILL — 6 consumers:
  Badge/SelectableChip/IconChip/glass-atom/glass-chip);
  (3) `--glass-ambient-hue`/`-strength` (@property glass.css:379, re-pointed INTO the plate pair at
  liquid-morph.css:34 `.liquid-stage` + :64 `[data-paper-field]`).
  The RIM axis (4) `--glass-accent`/`-strength` (@property property-regs.css:285 — KEEP as rim). Plus the
  consumer forks `--accent-fill/-band/-edge`, `--feedback-tone/-strength`, `--selection-accent-strength`.
  Target: ONE `(hue,strength)` × `{plate = --glass-tint-source/-strength, rim = --glass-accent/-strength}`.
- **★ AMBIENT IS LIVE, NOT INERT (the methodology trap — carried from pass-2, re-verified).** `useBloomUp.ts:340/343`
  writes BOTH ambient sub-tokens via `el.style.setProperty` (strength ramped 0→8%; `useBloomUp.test.ts` asserts
  `8.000%`); `useGlassBackdropLuminance.ts:448` writes the HUE only. A CSS-declaration grep is BLIND to JS
  `setProperty` writers — the fold is a behavior-preserving RE-POINT, never a delete.
- **★ BUT THE `[data-paper-field]` ATTRIBUTE SCOPE IS DEAD (new this pass).** PaperBackdrop (AppShell.vue:360)
  renders `class="paper-field"` — the CLASS. The AUGMENT-2 bias (liquid-morph.css:63) + the cards.css:120 fallback
  switch key off the `[data-paper-field]` ATTRIBUTE, which **nothing sets** (only doc-comments + StoryPage prose
  reference it). So the generalized ambient bias never matches at HEAD; the ONLY live ambient consumer is
  `.liquid-stage` (the dock + the `liquid-playground`/`DockExampleTile` demos). **Consequence:** the
  `--paper-field-warm` skip-guard + `min(…,8%)` clamp (liquid-morph.css:64-70) sit on a DEAD scope — "relocating"
  them relocates dead weight; the live `.liquid-stage` path has NO clamp. **The clamp must be REBUILT fresh on
  WS1's actual live field scope when WS1 lands** (whatever WS1 wires the field through).
- **★ THE SUBSTITUTION TRAP (the paint-not-write proof).** `.liquid-pill` reads `background: var(--glass-bg-floating)`
  RAW (liquid-morph.css:104) — the `:root` PRE-COMPOSED token — so a descendant `--glass-tint-*` write NEVER
  re-composes it (line 281 IS the `color-mix()` form; line 104 is not). An ambient/bloom re-point does NOT re-tint
  `.liquid-pill` — the bloom is silently lost on the bloom surface. **M5 must getImageData a real bloomed plate,
  not trust the token write.** The fix is "compose the rung CLASS (ladder element-level mix), never read raw
  `var(--glass-bg-*)`" on the bloom surface.

### The blur ladder (W-GLASS-BLUR-PEER) — INVERTED
- Radii (glass.css:75-92): wash 1 / quiet 8 / resting 10 / floating 13 / overlay 13 / **dock 9**; deep 16
  (glass-deep.css). `--glass-blur-btn` = floating-radius 13 (glass.css:176), AND the default `<Button>` composes
  `glass-wash btn-glass glass-deep glass-capsule` (button/index.ts:69) → `.glass-deep` re-points `--glass-blur-btn`
  to the **deep 16px** = the heaviest surface. So the live spread is **Button 16 ≫ Card-floating 13 ≫ Card-resting
  (default Card) 10 ≫ dock 9.** The dock is NOT heavier; the BUTTON is. The user's *"dock blurry too long"* is the
  morph-ramp window (WS2), not static radius.
- Content saturate (glass.css:113-124): wash/quiet/resting/dock 1.4, floating/overlay 1.6, deep 1.8. saturate
  1.4-1.6 over a warm field amplifies the transmitted backdrop → the "over-corrected to metallic" read. iOS glass
  is LOW-saturation transmissive. Dark arm is already calmer (1.22-1.35).
- `proof-glass-cal.mjs`: `BAND_LO = 8` (hard wall), `BAND_HI = 15`; `PRE_WAVE_RADII` are CEILING refs (`v >= pre`
  reds — in-band DOWN moves are FREE). B3 matches `--glass-saturate-${tier}: ${value}` with a VALUE regex (a
  saturate-default change REDS B3 unless rebaselined in-diff). Dock saturate witness floor `lightDockSat ≥ 1.2`
  (`proof-no-gray.mjs:617`) — holding dock at exactly 1.2 stays green.

### Dead tokens (W-GLASS-IDIOM-FACTOR) — confirmed
`--glass-saturate-deep-ceiling` (0 `var()` readers, now `== --glass-saturate-deep: 1.8`, stale "1.5 ≤ ceiling"
comments) — DELETE (KEEP `--glass-saturate-deep`, the glass-cal deep-fence reads it). `--glass-spine-blur`/
`-opacity` (0 readers) — DELETE; **KEEP `--glass-spine-vignette`/`-border`** (LIVE, instrument-chassis.css:157/159
— the kiss-fleet reconcile corrected the "spine retired" half-claim). `--cartoon-cast-dx`/`-dy` @property + dead
`cards.css` transition legs (no `useCartoonCast` driver exists) — DELETE. Re-pasted idioms: the plate color-mix
×15 (ladder is the canonical single home; **a11y-fallback.css:213-228 GUARD-2 background re-pastes are pure
REDUNDANT dup** — ladder paints those backgrounds unconditionally, the webkit guard's real job is the prefix);
`--glass-warm-zero` ×5; press-squash `scale:1.04 0.94` ×3; `.loud` `--motion-weight:1` ×N.

---

## 3 · MECHANISM (the idiomatic approach, concrete)

### 3.1 · The maroon ink — raise L, lower chroma, ONE expression (M1, field-independent)
Re-express `--cartoon-ink` so the live `oklch(from …)` resolves an IN-GAMUT warm brown at the stamp L:
```css
/* light + dark — ONE expression (DRY; clamp(0.28, l, 0.34) resolves to ~0.34 in BOTH modes
   because light --foreground L≈0.56 and dark L≈0.90 both exceed 0.34 → no dead L-flip branch) */
--cartoon-ink: oklch(from var(--foreground) clamp(0.28, l, 0.34) clamp(0.030, c, 0.050) h);
```
- Collapse the dark `clamp(0.20, 1-l, 0.30)` L-flip onto the SAME light expression (the L-clamp already
  pins both modes into the warm-brown band — verify both arms resolve equal in-gamut ON PAINT before reconciling).
- Reconcile the two fallback literals to ONE, re-derived from the PAINTED pixel (do NOT assume `#4a3320` — the
  painted L floors lower than nominal). Rewrite the false `max(c,0.11)`/`clamp` comments.
- PRT / `prefers-contrast: more` arms deepen the cast via ALPHA (32→42%), NEVER chroma (chroma is the disease).
- ZERO `--shadow-cartoon-*` reader edits — `proof:shadow-contract` stays green by construction (it locks the
  chain, not the ink).

### 3.2 · The dock cast — delete the dead mechanism + the wedge (M2, field-independent)
- Delete `shape.css` 208-249 wholesale (the `.cartoon-cast` block + the `[data-punching]` deepen + the W3C-dead
  kinetic-travel + the cast PRM block) AND `GlassDock.vue:606` `<span class="cartoon-cast">` — TOGETHER (atomic;
  no orphan `--dock-punch-stretch` reader survives except the KEPT squash scale-channel + its driver).
- ADD the dock-scope PRM carve: `.glass-dock { @media (prefers-reduced-motion: reduce) { --motion-weight: 0 } }`
  (the cards.css:390 / glass-atom.css pattern). **Post-build, `getComputedStyle`-confirm it computes `0` on
  `.glass-dock` under emulated reduce in the concatenated `@layer components` bundle** (a later dock partial
  re-declaring `--motion-weight` would silently clobber the carve).
- The dock elevation reads from `--shadow-dock` (the omni drop-shadow, painted from the dock box → escapes the
  radius correctly, in-gamut) + `--glass-key` (the cel rim) — both KEPT. The flare is DEFERRED to W-GLASS-DYNAMICS
  (DELETE-first, decided on paint).
- The bare global `.cartoon-cast` Card rule (cards.css:359 — the `<Card surface="cartoon">` paper consumer) KEEPS
  its cast (a Memphis-sticker card IS the cartoon register; a glass CHROME plate is not). M1 de-maroons it.

### 3.3 · The clip discipline — the RIGHT primitive PER JOB (M3, field-independent)
**The disentangling (the pass-3 sharpening): the clip has TWO distinct jobs.**
- **Job A — the host's OWN `backdrop-filter` corner raster** (the D3 card-corner fringe). Per the repo's
  device-verified note, `contain` does NOT touch this. The cross-engine fix is `isolation: isolate` (or the
  native Safari-18+ fix). **This is the primary clip the bare-`<Card>` ladder rungs LACK.**
- **Job B — a descendant painting past the rounded corner** (the dock wedge — already deleted by M2; a nested
  glass Button's backdrop sample escaping its card). `contain: paint` is the right primitive here (it is the
  AY.W-A11Y-PERF nested-backdrop-cost mitigation already on `.glass-card`/`.glass-btn`).
- **THE MATRIX DECIDES THE MECHANISM (do not pre-commit).** The 4-cell `{none, overflow:clip, contain:paint,
  isolation:isolate} × {Chrome, real Safari}` capture on a real `<Card glass-resting>` over a busy backdrop,
  `getImageData` on the HOST's OWN top corner, picks the Job-A primitive. **Re-ground on the element's OWN
  backdrop corner, NOT a descendant-overflow harness** (the harness proves Job B, the wrong job).
- **The idiomatic home:** mint the Job-A clip on the SHARED `.glass-material` group (material.css:36 — it ALREADY
  groups all rungs + `.glass-card` for the `::before`), so every composing surface inherits ONE discipline; retire
  the per-class `contain` from surfaces.css:34/79 and the `.glass-chip` `isolation` from glass-chip.css:69 (prove
  the inner `plus-lighter` bloom survives the group clip on real GPU — KEEP + scope-out only if it regresses).
- **`overflow: hidden` is FORBIDDEN** (clips the focus ring + specular bleed). The Job-A primitive (isolation, or
  whatever the matrix picks) must NOT clip the own rim / drop-shadow / focus-ring.
- **Confirm Safari 18+ did NOT already fix Job A natively** (WebKit blog 15443, bug 158483 RESOLVED) — if it did,
  the Job-A primitive is a harmless no-op on current WebKit, and the matrix records it. Never assume.
- **BLAST RADIUS (build-decidable):** the `.glass-material` group includes `.glass-floating`/`.glass-overlay`
  (reka Dialog/Sheet/Popover/Command/DropdownMenu/HoverCard) + the 4 dock controls. `contain: layout` makes the
  element a containing block for `position:fixed/absolute` descendants → a reka PopperArrow/submenu that does NOT
  portal-to-body would clip. **Prototype against the BUILT bundle FIRST; if any arrow/popper/Select-scroll/
  submenu/HoverCard/focus-ring clips → SCOPE the group clip to the card/content tiers + dock controls (EXCLUDE
  the floating/overlay rungs) with a recorded rationale.** Run `proof:dock-plate-clearance` (the M3 containment on
  dock controls must NOT re-arm the BA.W-DOCK-GEOMETRY freed cross-axis — the 1.1× hover plate + `--dock-control-
  safe-inset` must still clear) and `proof:nested-backdrop-budget`.
- **THE GATE (`proof:glass-clip`, NEW, device-free `ci`, born-RED):** asserts per surface that a `border-radius`
  (explicit OR inherited) is PRESENT **alongside** the chosen clip primitive (a clip without a radius clips to a
  SHARP RECT — the bug a primitive-only gate greens); Lightning-CSS-minified-form-aware (`layout style paint`
  minifies to `content`); a synthetic over-corner child clips to the radius; carved exemptions (the dock morph
  aperture `overflow-x:clip; overflow-y:visible`; the `<Card surface="cartoon">` Memphis layer). **The gate keys
  off the MATRIX-DECIDED primitive — it is built AFTER the matrix, not before.**

### 3.4 · The blur peer — demote the BUTTON, calm the whole ladder (M4, field-gated paint)
- Converge the INTERACTIVE chrome (dock · button · default-Card · menu-item) to resolve the SAME
  `--glass-blur-resting`: **demote the default `<Button>` off `glass-deep`** (button/index.ts:69 — the inversion
  fix), retire `--glass-blur-dock`/`-radius` + `--glass-saturate-dock` (→ `--glass-blur-resting`) and
  `--glass-blur-btn` (→ resting). Keep `wash` (1px) as the distinct content-pane near-no-blur tier.
- Target band `wash 1 / quiet 8 / resting 8 / floating 10 / overlay 10` — moves WITHOUT a BAND_LO edit
  (resting/quiet = 8 sit ON the floor; `8 >= 8` passes — prototype-proven). Drop below 8 (→6) ONLY if the M8
  read-carrier (lensing + neutral specular) paint-proves the read holds, with the BAND_LO move + an in-gate
  rationale note IN THE SAME DIFF.
- **Content saturate-revert `1.4-1.6 → ~1.2`** (the metallic over-correction root) — a SYSTEM-IDENTITY decision
  needing PAINT sign-off over WS1's warm field, not gate-green alone. Hold **dock saturate at exactly 1.2** (the
  no-gray witness-(a) floor — the unified plate tint becomes the PRIMARY anti-gray, saturate 1.2 the secondary).
  Preserve dark-dock read-weight (lift dark-resting saturate/brightness in lockstep BEFORE retiring
  `--glass-saturate-dock`). Lowering deep 1.8→1.6 is OPTIONAL (only if the revert paint shows deep reads metallic).
- **Rebaseline `proof:glass-cal` IN-DIFF** (the ~5 coupled saturate sites: B3 floating/overlay defaults :162-163,
  the :205 literal, dark-dock :42, the deep-ceiling fence :207-224, the S3 dock-shrink re-point off the retired
  `--glass-blur-dock-radius`).
- **NEW GATE TEETH (the BD-regression guard, tranche-history rec):** `proof:glass-cal` asserts dock == button ==
  default-Card == menu-item all resolve the **SAME `--glass-blur-resting` TOKEN** (not merely in-band) — so a
  future tranche cannot silently re-inflate one surface (BD silently re-pointed btn to floating/deep with no gate
  to catch it). The token-identity assert is the peer lock.
- **THE SAFARI `var()`-IN-BACKDROP-FILTER BLUR RESOLUTION (the live headless-green trap — settle BEFORE ship).**
  The `-webkit-backdrop-filter` twin is build-injected (vite.style-assets.ts:497). The OPEN question: does
  `-webkit-backdrop-filter: var(--glass-blur-resting)` actually BLUR in Safari 26, or does the documented
  CSS-var-in-backdrop-filter limitation paint a FLAT plate? Real-macOS-Safari `getImageData` (does the
  var-driven plate blur a high-contrast backdrop edge?) is the binding capture. **If it does NOT resolve, the
  unified register delivers the blur as a FIXED px on the webkit arm** (a `@supports`-or-build-emitted fixed-value
  companion) — caught only by real-Safari paint, never a device-free gate.

### 3.5 · The tint unify — TWO pairs, behavior-preserving re-point, SOURCE conflict resolved (M5, atomic, field-gated)
End state ≤ 2 chromatic pairs: PLATE `--glass-tint-source`/`-strength` + RIM `--glass-accent`/`-strength`.
**Lands as ONE atomic diff or not at all.**
1. **Re-point the writers to the PLATE pair directly.** `useBloomUp.ts:340/343` and `useGlassBackdropLuminance.ts:448`
   write `--glass-tint-source`/`-strength` (release via `removeProperty`, not set-0%). Drop the liquid-morph.css:34
   `.liquid-stage` alias re-point + the :64 `[data-paper-field]` intermediate. **`useGlassBackdropLuminance.ts:448`
   is the SAME function WS1 retires/rewires — ONE owner, ONE coordinated WS1+WS3 diff (see §7 R-WS1).**
2. **Fold `--glass-fill-tint`/`-strength`** (Badge/SelectableChip/IconChip/glass-atom/glass-chip) onto the plate
   pair. NOTE the asymmetry: glass-atom reads STRENGTH, glass-chip reads HUE — the Badge `data-hue` fold must
   preserve both. Requires the 3 design sign-offs (Badge data-hue activation, the rest-warmth delta from the
   deleted `--glass-atom-tinted` warm-amber-at-rest, SelectableChip dilution sub-perceptual).
3. **Resolve the multiplex — SOURCE *and* strength, not just strength.** Two writers target the plate toward
   DIFFERENT colors at DIFFERENT cascade scopes: the W55 bright-bucket legibility darken (source = warm INK,
   ladder.css:155, specificity 0,0,0) vs the bloom (source = field HUE, specificity higher). `max()` resolves only
   STRENGTH. **The SOURCE rule:** legibility is the non-negotiable AA floor — when the bright-bucket engages, the
   SOURCE is the warm ink (AA wins); the bloom HUE tints the SOURCE only when the plate is NOT in the earned-
   darken bright bucket (the calm-field bloom case). Strength = `max(earned-darken, bloom)` so neither clobbers.
   Concretely: `--glass-tint-source: <bright-bucket ? --glass-tint-ink : --glass-ambient-hue>` (the bucket gate
   already exists at ladder.css) and `--glass-tint-strength: max(<W55 aa strength>, <bloom strength>)`.
4. **Rebuild the clamp on WS1's LIVE scope (not relocate the dead one).** The `--paper-field-warm` skip-guard +
   `min(…,8%)` clamp live on the DEAD `[data-paper-field]` attr scope — relocating them relocates dead weight.
   When WS1 lands its field, build the combined-hue clamp FRESH on WS1's actual live scope (whatever WS1 wires the
   field through) and PROVE no over-rotation past WARM_HUE_HI across ALL section-accents (a violet/teal accent +
   warm ambient must not over-rotate).
5. **Close the substitution trap — PROVE THE PAINT.** The `.liquid-pill` reads pre-composed `--glass-bg-floating`
   raw → the re-point does NOT re-tint it. Make the bloom surface compose the rung CLASS (the ladder element-level
   `color-mix`), never read raw `var(--glass-bg-*)`; then `getImageData` a real bloomed `.liquid-pill` to prove the
   bloom paints (the computed-style of the var is NOT proof).
6. **Delete the `--glass-ambient-*` + `--glass-fill-*` @property regs LAST, behind a born-RED bite** (delete the
   reg without deleting the `,8%)` reader → 8%-at-rest reds).
7. **Re-point `proof:glass-foundation` A1** (currently MANDATES the observer write `--glass-ambient-hue`,
   glass-foundation.mjs:81) to require the PLATE write — IN the same atomic diff. The `useBloomUp.test.ts` `8.000%`
   asserts move to the plate token. **DROP `proof:adaptive-observer`/`proof:glass-accent`/`proof:glass-cohesion`-
   non-feedback from the worry list — they are PRESENT on disk with ZERO fill/ambient refs (not "absent").**

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
  `material.css`, the demo-only surfaces → `demo/`. The ambient→plate bias re-homes onto WS1's live field scope
  with the FRESH clamp (§3.5.4). Delete `liquid-enter.css` (verify 0 consumers) + `scripts/tmp-glass-rest.mjs`.
  COORDINATE WS2 (dock) + A-deadcode (the `useLiquidMorph.ts` TS half is itself 0-consumer dead). SEQUENCE LAST.

### 3.7 · Dynamics — lensing + NEUTRAL specular carry the read at lower blur (M8, field-gated)
- Strengthen W-LENSING squircle refraction + the NEUTRAL specular hairline — the read-carrier at the calmer blur.
  **The specular hairline (NOT the SVG displacement) carries the Safari glass read** (lensing rides `@supports
  (backdrop-filter: url(#…))`, dead on Safari per WebKit bug 245510). **REFERENCE FENCE:** keep the resting body
  specular NEUTRAL/achromatic (`~rgb(78,78,78)`, the Siri pill body register); reserve the PRISMATIC cool→white→
  warm edge dispersion for WS6's active/motion edge ONLY — chromatic-dispersing the resting hairline IS the
  metallic over-correction (do not conflate).
- Add the iOS-27 backdrop-HUE sample to `useGlassBackdropLuminance` (sample backdrop HUE, write the unified PLATE
  pair — the WS2-13 chroma-sample term, NOT a new axis). Keep it DEMO-PRIVATE (off the public glass barrel → never
  in the root-barrel value.js eager-graph); ride the EXISTING ≤4Hz rAF + IntersectionObserver throttle (no new
  rAF); wrap `createSpecularWriter` (never fork `--mouse-x/y`).
- **The flare: DELETE-first, decided ON PAINT.** Capture the no-flare baseline on real GPU both engines; prove the
  squash + `--shadow-dock` omni + `--glass-key` rim carry the depth-pop. ONLY if it under-reads, drive the flare
  PARENT-ATTR-DRIVEN (`.glass-dock[data-punching] > .dock-flare { opacity; transition }`) — NEVER the dead
  `inherits:false` var (it cannot read the parent), with a Safari z-order-above-`::after` verify.

---

## 4 · FILES TOUCHED

**Phase 1 (field-independent):**
- `src/styles/tokens/shadow.css` — `--cartoon-ink` re-express (M1); reconcile the one fallback literal.
- `src/styles/tokens/dark-arm.css` — collapse the dark L-flip onto the light expression (M1).
- `src/styles/dock/shape.css` — delete 208-249 (cast block + dead travel + cast PRM) (M2); add the dock-scope
  PRM `--motion-weight: 0` arm (M2).
- `src/components/custom/dock/GlassDock.vue` — delete the `<span class="cartoon-cast">` (M2, line 606).
- `src/styles/glass/material.css` — mint the matrix-decided Job-A clip on the `.glass-material` group (M3).
- `src/styles/glass/surfaces.css` — retire the per-class `contain` (M3, lines 34/79) once the group clip lands.
- `src/styles/glass/glass-chip.css` — retire the standalone `isolation` (M3, line 69) into the group clip.
- `scripts/proof-no-gray.mjs` — the `cartoon-ink-warm-in-gamut` witness (M1, born-RED).
- `scripts/proof-glass-clip.mjs` (NEW) — the clip gate, matrix-primitive-aware, Lightning-minified-form-aware (M3).
- `tests-visual/glass-standardization.spec.ts` (NEW) — the cast getImageData arm (M1); enroll in webkit testMatch.
- `tests-visual/glass-clip.spec.ts` (NEW) — the corner-arc + dock-no-wedge π (M3); enroll in webkit testMatch.
- `tests-visual/playwright.config.ts` — enroll the 2 new specs in the `webkit` testMatch allowlist.

**Phase 2 (field-gated):**
- `src/styles/tokens/glass.css` — the blur-peer band + the saturate-revert (M4); retire `--glass-blur-dock`/
  `-btn`/`--glass-saturate-dock`; delete the `--glass-ambient-*`/`--glass-fill-*` @property regs LAST (M5).
- `src/components/ui/button/index.ts` — demote the default Button off `glass-deep` (M4, line 69).
- `src/styles/dock/shell.css` — `--dock-surface-blur` → `--glass-blur-resting` (M4, line 17).
- `src/styles/tokens/dark-arm.css` — lift dark-resting saturate/brightness BEFORE retiring `--glass-saturate-dock` (M4).
- `scripts/proof-glass-cal.mjs` — rebaseline the ~5 coupled sites + the dock==button==Card SAME-token assert (M4).
- `src/composables/motion/useBloomUp.ts` — re-point the writers to the plate pair (M5, lines 340/343/349).
- `src/composables/glass/useGlassBackdropLuminance.ts` — re-point to the plate pair (M5, line 448) — **WS1 co-owner.**
- `src/styles/glass/liquid-morph.css` — drop the ambient alias re-point (M5, 34/64); split >500 (M9).
- `scripts/proof-glass-foundation.mjs` — re-point A1 to require the plate write (M5).
- `tests/composables/motion/useBloomUp.test.ts` — the `8.000%` asserts move to the plate token (M5).

**Phase 3:** the consumer folds (Badge/SelectableChip/IconChip/feedback-tone/accent-tone), the M8 dynamics JS,
the M9 rehome + dead-file deletes (`liquid-enter.css`, `scripts/tmp-glass-rest.mjs`).

---

## 5 · WAVE BREAKDOWN (10 waves, 3 phases)

### Phase 1 — the visible D3 fixes (field-INDEPENDENT, land + real-paint-verify NOW)

**BG.W-CARTOON-INK-GAMUT (M1).** Re-express `--cartoon-ink` (raise L floor `clamp(0.28,…)` AND lower chroma
`clamp(0.030,0.050)` — together; the L-raise makes the chroma in-gamut); collapse dark onto the light expression;
one re-derived fallback; ALPHA-deepen the contrast arms. **Gate:** `proof:no-gray` `cartoon-ink-warm-in-gamut`
witness, born-RED on HEAD's `rgb(49,0,0)`, computing the actual sRGB at the resulting L and asserting R>G>B>0 +
warm-hue 50-70° (NOT chroma≥floor — the chronic-breaker). **π:** the composited cast over white + warm field +
dark = R>G>B, B>0, NOT `rgb(N,0,0)`, warm-hue, in-gamut, all 3 αs, both modes, Chrome AND real macOS Safari
(`getImageData`; un-composited ink R−B≈40 + @32%-over-field BLOCKING, @18%-over-white ADVISORY). Sequence M1 ≤ M2.

**BG.W-DOCK-CAST-RETIRE (M2).** Delete shape.css 208-249 + GlassDock.vue:606 atomically; add the dock-scope PRM
`--motion-weight: 0`; post-build `getComputedStyle`-confirm 0 in the concatenated bundle. The flare → W-GLASS-
DYNAMICS (DELETE-first). **Gate:** `proof:dock-clip-reveal` + `proof:no-layout-animation` green on the BUILT tree.
**π:** the dock bottom-left `getImageData` matches the backdrop — no maroon wedge / no fringe, both docks, both
modes, Chrome AND real Safari (bundled-WebKit does NOT count). Maroon claim SCOPED to the dock PLATE (control/
button/chip casts stay maroon until M1 lands).

**BG.W-GLASS-CLIP-DISCIPLINE (M3).** Mint the MATRIX-DECIDED Job-A clip on the `.glass-material` group; retire the
per-class `contain`/`isolation`; prove the `.glass-chip` bloom survives. **Gate:** `proof:glass-clip` (NEW,
born-RED) — radius-present-ALONGSIDE the clip primitive PER SURFACE; Lightning-minified-form-aware; over-corner
child clips to the radius; built AFTER the matrix decides the primitive (do NOT hard-code `contain`). **π (the
trap-closer):** capture the corner on REAL GPU Chrome AND real macOS Safari, both modes, over a busy backdrop, on
the BUILT route with real `<Card>`/`<Dialog>`/`<Popover>`/`<Button>` — `getImageData` a top-corner pixel = clean
arc; dock bottom-left no wedge; **re-ground on the element's OWN backdrop corner, not a descendant harness.**
**Blast:** prototype against the BUILT bundle; scope to card/content + dock tiers (EXCLUDE floating/overlay) if any
arrow/popper/submenu/HoverCard/focus-ring clips; run `proof:dock-plate-clearance` + `proof:nested-backdrop-budget`.

### Phase 2 — the architectural collapse (high-blast; gated behind Phase 1 + WS1's field + the glass-cal rebaseline)

**BG.W-GLASS-BLUR-PEER (M4).** Demote the default Button off `glass-deep`; dock = button = default-Card = menu-item
all resolve `--glass-blur-resting`; band `wash 1 / quiet 8 / resting 8 / floating 10 / overlay 10` (no BAND_LO
edit); content saturate-revert 1.4-1.6 → 1.2 (PAINT sign-off, system-identity); dock saturate HELD at 1.2.
Rebaseline `proof:glass-cal` IN-DIFF + add the **dock==button==Card SAME-`--glass-blur-resting`-token assert** (the
BD-regression lock). **Settle the Safari `var()`-in-backdrop-filter blur resolution by real-Safari capture BEFORE
ship; fixed-px webkit arm if it does not resolve.** **π (gated behind WS1):** dock + Card + Button resolve the SAME
`backdrop-filter` blur (`getComputedStyle` parity), ladder calmer, field structure reads through, demoted surfaces
still read as glass (lensing+specular), both modes, both engines.

**BG.W-GLASS-TINT-UNIFY (M5, the LEAST-converged wave — ONE atomic diff).** §3.5: re-point both writers to the
plate pair; fold fill-tint; resolve SOURCE (legibility-ink wins the bright bucket) + strength (`max()`); rebuild
the clamp FRESH on WS1's live scope; close the substitution trap (compose the rung class on the bloom surface);
delete the @property regs LAST behind a born-RED bite; re-point `proof:glass-foundation` A1. **Sign-offs required
first:** Badge data-hue, rest-warmth delta, SelectableChip dilution. **π (gated behind WS1):** ≤2 pairs; every read
axis WRITTEN (computed-style proven); the bloom proven LIVE by `getImageData` on a real bloomed `.liquid-pill`
(the substitution trap closed); chips paint their data hue; both modes, both engines.

**BG.W-GLASS-IDIOM-FACTOR (M6).** §3.6 DRY + dead-token delete. **π:** each idiom once; zero dead tokens/@property;
press-squash carries the liquid-weight law (PRM-zeroed); `profile:budget` + `proof:css-critical` net-negative/flat.

### Phase 3 — consumer + recalibration + cleanup (depends on Phase 2 + WS1)

**BG.W-GLASS-CONSUMER-BAND (M5 consumer arm).** Fold IconChip/SelectableChip/Badge/DockExampleTile/Atlas onto the
unified plate/rim seam (handle the fill-tint strength/hue asymmetry). **π:** each consumer paints via the seam.

**BG.W-DOCK-LEGIBILITY-RECAL (M5+M8; co-lands the M4 saturate-revert).** Re-anchor the dock AA self-darken to the
unified plate tint (primary anti-gray, saturate 1.2 secondary); rewire `useGlassBackdropLuminance` onto WS1's
shell-aurora canvas (the FRESH clamp). **π:** dock reads warm-cream-transmissive over the live aurora, AA holds, no
gray, no metallic, both modes, both engines.

**BG.W-GLASS-DYNAMICS (M8; the re-grounded flare).** §3.7: strengthen lensing + neutral specular; add the
backdrop-HUE sample (writes the plate pair); the flare DELETE-first, parent-attr-driven ONLY if paint proves the
baseline under-reads (Safari z-order verify). **π:** the dock/card glass picks up the field hue sub-perceptually;
the dock punch reads without a sticker; the demoted-blur plate reads as glass via lensing+specular.

**BG.W-DEMO-STYLE-REHOME (M9; SEQUENCE LAST).** §3.6 M9. COORDINATE WS2 + A-deadcode. **π:** no `src/styles` file
imported solely by demo; no glass file >500; `profile:budget` + `proof:css-critical` net-negative/flat; no visual
regression on the BUILT route, both engines.

---

## 6 · ACCEPTANCE / REAL-PAINT-π BAR (the cardinal bar)

Device-free gates passing is NOT the bar. COLOR π = `getImageData`; BLUR-radius π = `getComputedStyle`. The 2 new
specs are ENROLLED in the `webkit` testMatch; **the BINDING Safari sign-off is a SEPARATE manual real-macOS-Safari
capture, OUT of CI** (bundled-WebKit is a PROXY — it gamut-maps oklch + Metal-AAs corners differently).

1. **Warm-brown cast** — composited cast over white + warm field + dark = R>G>B, B>0, NOT `rgb(N,0,0)`, warm-hue
   50-70°, in-gamut, both stamp Ls, both modes, both engines. `proof:no-gray` cartoon-ink witness green;
   `proof:shadow-contract` UNTOUCHED. **Field-independent — land NOW.**
2. **Clean clip** — every `[data-slot=card]` resolves the clip (radius + the matrix-decided primitive); top-corner
   `getImageData` over a busy backdrop = clean rounded arc; dock bottom-left no wedge; focus ring + paper cast +
   overlay arrows + submenus + HoverCard survive. `proof:glass-clip` green + the real-GPU/Safari corner π green (on
   the element's OWN backdrop corner). **Field-independent — land NOW.**
3. **Dock PRM** — `getComputedStyle` confirms `--motion-weight: 0` on `.glass-dock` under emulated reduce in the
   concatenated bundle. **Field-independent — land NOW.**
4. **ONE material** — one frame: dock + Card + Button as ONE glass material over the WS1 field; SAME
   `backdrop-filter` blur (`getComputedStyle` parity + the SAME-token gate assert), SAME plate tint (`getImageData`
   ΔE band), field structure reads through; demoted surfaces read as glass on Safari (the var-blur resolution
   settled). Both modes, both engines. **Gated behind WS1.**
5. **≤2 chromatic pairs** — exactly 2 `(hue,strength)` pairs; every read axis WRITTEN (computed-style proven, NOT
   grep); the bloom proven LIVE by `getImageData` on a real bloomed `.liquid-pill`; chips paint their data hue.
   **Gated behind WS1.**
6. **DRY + dead-free** — each idiom once; zero dead tokens/@property; `profile:budget` + `proof:css-critical`
   net-negative or flat.
7. **a11y/perf/cross-engine fences** — the 3 `--glass-level` brackets reach blur(0)/firm-up; PRM keeps-fade-drops-
   transform + the dock-scope `--motion-weight: 0`; compositor-only (`proof:no-layout-animation`); new JS off the
   dock.js chunk + the root-barrel value.js eager-graph fence; the build injects the `-webkit-` twin; Safari
   lensing degrades to specular-carries-the-read.

---

## 7 · FOLDED / DEFERRED ITEMS

- **WS1 shell-aurora field** — the live-paint precondition, NOT ON DISK at HEAD. The Phase-2/3 paint bars are
  IMPOSSIBLE without it — the residual gate.
- **`--glass-depth` lerp** — LEAVE (the settled BB.W-DEEP-GLASS fence; deep saturate stays 1.8 unless paint shows
  metallic). **`--surface-tint-*` stays `in srgb`** (AW.W26 brand fence). Do not re-litigate.
- **Radius/spring dead tokens** (`--corner-k-*`, `--corner-shape-*`, `--spring-timeline-*`), **`useLiquidMorph.ts`
  TS half** — A-deadcode's `BG.W-DEADCODE-CUT`/`BG.W-DEAD-TOKEN-SWEEP`; W3 owns the CSS half only.
- **The 3 net-new-behavior design sign-offs** required BEFORE W-GLASS-TINT-UNIFY lands: Badge data-hue, rest-
  warmth delta (`--glass-atom-tinted`), SelectableChip dilution.
- **The chronic-breaker gate** (a chroma-floored token's resolved hue + gamut AT its actual L — ~10 gates assert
  chroma≥floor, ZERO assert hue-at-L; produced BOTH the maroon AND the metallic saturate) — the `cartoon-ink-warm-
  in-gamut` witness is the FIRST instance; the general predicate is surfaced to WS7's probe-vocabulary widen.
- **The ~30 `proof-*glass*.mjs` gate sprawl** — a close-time consolidation, surfaced to WS7, NOT a WS3 wave.
- **The dock morph-blur ramp** (the user's "dock blurry too long" — the collapse/expand blur-hold window) — WS2's
  dock-morph domain, NOT the static-radius peer M4 owns. Flag to WS2.

---

## 8 · OPEN RISKS (the falsification frontier — pass-3 updated)

- **R-CLIP (HIGH, the #1 falsifier) — the clip primitive is CONTESTED by the repo's own device-verified note.**
  surfaces.css:32 says `contain` clips DESCENDANTS only; the D3 fringe is the HOST's own backdrop raster → the
  Job-A primitive is probably `isolation`, not `contain`. The 4-cell real-GPU matrix decides; the gate is built
  AFTER. If the matrix shows neither `contain` nor `isolation` clips the host corner on current Chrome/Safari
  (Safari 18+ may have fixed it natively), the "clip discipline" is a no-op on modern engines and the D3 card-
  corner artifact is a STALE-engine concern — capture decides whether the wave is a real fix or a documented no-op.
- **R-SAFARI-BLUR (HIGH) — does `var()` resolve in `-webkit-backdrop-filter` on Safari 26?** If not, the unified
  register paints FLAT plates on Safari (the opposite of "one register, Chrome AND Safari") and the webkit arm must
  ship a FIXED px. The headless-green trap candidate — only real-Safari paint catches it. Settle BEFORE M4 ships.
- **R-TINT-SOURCE (HIGH) — M5 must resolve the SOURCE conflict, not just the strength.** A bloomed-AND-over-bright
  plate has two competing source colors (legibility ink vs field hue); `max()` handles only strength. §3.5.3 gives
  the rule (legibility wins the bright bucket); the substitution trap (`.liquid-pill` reads raw `--glass-bg-floating`)
  means the bloom may not paint at all — getImageData a real bloomed plate or the wave is unproven.
- **R-WS1 (HIGH) — M5/M9 EDIT the function WS1 retires + the clamp scope is DEAD.** `useGlassBackdropLuminance.ts:448`
  is the same-function edit collision; WS1 overturned its own field mechanism at 13%. The `[data-paper-field]` attr
  scope is dead → the clamp must be REBUILT on WS1's live scope, unnameable until WS1 is paint-stable. **Designate
  ONE owner for that file; M5/M9 sequence strictly AFTER WS1 lands and is paint-stable.**
- **R-SAT-REVERT (HIGH) — the content saturate-revert reds ~5 coupled gate sites AND is a system-identity
  decision.** Rebaseline `proof:glass-cal` IN-DIFF; hold dock at 1.2; the 1.4-1.6 → 1.2 revert needs PAINT sign-off
  over the field, not gate-green.
- **R-BLAST (MEDIUM) — the M3 group clip double-contains the overlay band + the dock controls.** reka arrows/
  submenus may clip; the dock-control containment may re-arm the BA.W-DOCK-GEOMETRY freed cross-axis. Prototype
  against the BUILT bundle; scope to card/content + dock tiers if it regresses; run `proof:dock-plate-clearance`.
- **R-FINDING-A (MEDIUM) — the cast pixel prediction is WRONG.** Drop the exact-rgb/L pin; the painted L floors
  lower than nominal; the bar is structural warm-brown. @18%-over-white is ADVISORY (7-unit margin, GPU-AA-flippable).
- **R-RESIDUAL (the convergence gate) — the binding cross-engine PAINT is the 20%.** Phase-2/3 require WS1's field
  (not on disk); Phase-1 requires real-GPU Chrome + real macOS Safari captures the prototypes must run. Until both
  exist, the workstream is mechanism-validated but NOT paint-closed.
- **R-SEQUENCE — build the GATES first (born-RED):** `proof:no-gray` cartoon-ink witness, `proof:glass-clip` (after
  the matrix), the `proof:glass-cal` rebaseline. Phase 1 independent + low-blast (M1 ≤ M2). Phase 2 high-blast
  gated behind Phase 1 + WS1 + the rebaseline (saturate-revert CO-LANDS with tint-unify + legibility-recal). Phase
  3 couples WS1 (field) + WS2 (dock). **W-GLASS-TINT-UNIFY lands as ONE atomic diff or not at all.**
