# BG-WS3 · Glass standardization — ONE coherent glass register (pass-4 CONVERGED)

> Workstream: BG-WS3-glass-standardization · **Pass 4 — CONVERGED (mechanism-validated · falsifiers-folded · paint-binding owed)**
> Base: `tranche/BG` @ `aaa254c8` (every fact RE-VERIFIED LIVE on disk during this synthesis)
> Predecessor: `SPEC-pass4.md` (frontier brief) + the pass-4 prototype + critique fleet.
> **This document is the CONVERGED spec — each BG.W-* wave now carries its VALIDATED mechanism, its
> real-paint-π acceptance bar, and every folded critique mustFix. It is ready to develop out.**
>
> **What this pass SETTLES (folding the prototype + critique fleet):**
> 1. **★ M1 witness band is `[45, 85]`, NOT `50-70°` (BLOCKING CORRECTION).** The gate's own constants are
>    `WARM_HUE_LO=45 / WARM_HUE_HI=85` (`proof-no-gray.mjs:223-224`, REUSE — do not fork). The proven pin's dark
>    arm resolves **H76.7°** — which is OUT of `[50,70]` and would make the dark (A) witness un-greenable forever.
>    The light arm resolves **H57.4°** ∈ `[45,85]`. Born-RED on HEAD: light `rgb(49,0,0)` (B=0), dark `rgb(48,5,0)`
>    (B=0) — both machine-computed with the gate's own `oklchToRgb` helpers (the spec's `rgb(51,1,0)` was an
>    uncomputed estimate). The M1 prototype delivered NOTHING (empty structured return) — the born-RED witness +
>    box-shadow π **DO NOT EXIST** and are owed at develop-out.
> 2. **★ M4a Safari is SETTLED in mechanism, build-PROVEN (88%), but the GATE AS SPECIFIED recurs the trap.** The
>    `-webkit-backdrop-filter` literal-arm injection works (9 webkit arms → clean literals, 0 bare
>    `var(--glass-blur*)` webkit arms remain, the 5 unprefixed arms untouched, vite + vue-tsc both EXIT 0). BUT the
>    proposed gate "no `var(--glass-blur` in webkit arms" asserts only ABSENCE-of-var — a `blur(0px)` literal would
>    pass it and ship flat. **The gate is HARDENED: assert (a) every webkit arm carries a concrete `blur(<px>)`
>    literal AND (b) the literal blur-px MATCHES the build-resolved unprefixed value (value-correctness, not just
>    presence)** — plus the real-Safari-26 4-region differential as the binding bar.
> 3. **★ M3 contain:paint is the PROVEN cross-engine Job-B primitive** (real-GPU headed Chromium + bundled WebKit,
>    identical pixel verdicts: `a4` contain:paint+glass-child reads SHARP-backdrop G=29 vs `a3` no-clip G=123;
>    `a2` solid-clip G=29 proves ROUNDED not rectangular; `pop2` EATS the Popper arrow → **the overlay band MUST be
>    excluded**). BUT the prototype `build=false` — it decided the mechanism and **closed nothing**. Folded
>    mustFixes: **DROP the 4 dock controls from the clip selector** (net-new containment, no nested-glass
>    descendant, zero clip gain, only arms R-BLAST); **retire `.glass-btn`'s standalone contain:paint INTO the
>    group** (else two dialects survive — DRY unmet); **give `.glass-specular-track` an explicit disposition**;
>    **re-probe the concentric INNER-CORNER arc region** (the 3px-inside sample never tested for an inner fringe);
>    **verify the `.glass-chip` `plus-lighter` `::after` bloom survives** on real GPU; **LAND atomically**
>    (`proof:glass-clip` born-RED→GREEN, flip `buildPassed=true`). The binding real-macOS-Safari-26 sign-off is the
>    **M3 convergence CEILING** (bundled WebKit is non-binding; Metal can diverge).
> 4. **★ M4 menu contradiction RESOLVED → resolved-blur-RADIUS-leg parity, NOT token-name identity.**
>    `.glass-menu-row` paints its hover plate off `--glass-bg-quiet`; `--glass-blur-quiet` carries `brightness(1.02)`
>    (AV.W15) while `--glass-blur-resting` does not. After the collapse BOTH resolve **8px radius**, so a string/
>    token-name peer assert FALSE-FAILS. The peer-lock asserts the **`blur(<px>)` RADIUS LEG is identical (8px)**
>    across dock · `.btn-glass` · default `.glass-card`/`.glass-resting` · the `.glass-quiet` menu-row register —
>    the per-tier `brightness()`/`saturate()` light-lift companions are deliberately preserved and NOT part of the
>    blur-peer assert. Menus stay IN (the brief names `items·menus`); overlay PANELS (`.glass-floating`, 10px) are
>    the intended one-tier-up register, not a peer violation. Acceptance item 6 wording corrected.
> 5. **★ M4 is a 4-FILE collapse with alias indirection + a paint delta (not byte-identical).** `--glass-blur-btn`
>    resolves `blur(13px) saturate(1.6) brightness(1.02)` (glass.css:176 = the FLOATING family, not quiet);
>    re-pointing `.btn-glass` → `--glass-blur-resting` DROPS `brightness(1.02)` and lowers saturate `1.6→1.4` on
>    every glass button — capture the before/after `getImageData`, never claim byte-identity. The rebaseline is
>    **~7 in-diff gate sites** (B1 `PRE_WAVE_RADII` must REMOVE `glass-blur-dock-radius:11` or it reds "not found";
>    + B3 dark-dock; + S3 dock-shrink; + the others). The hero `glass-deep` button (16px) inversion is a RECORDED
>    refraction-depth opt-in with an owed design sign-off (the peer-lock targets the RESTING register only).
> 6. **★ M5 SOURCE rule re-derived against the CONTINUOUS-luma architecture — mechanism PROVEN (78%).** The bias
>    entering through the EXISTING `--glass-tint-source`/`-strength` tokens is byte-identical at rest
>    (`color-mix(…, transparent 0%) ≡ X`), AA-preserving, ZERO plate-recipe edit. The writer census is WIDER than
>    pass-3 listed: **+ `glass-fx.css:157`** (the BASE default `--glass-tint-source: var(--card)`) **+
>    `liquid-morph.css:34/65`** (the demo-only bias readers M9 rehomes). M5 prototype `build=false` — design-proven,
>    paint-owed post-WS1.
>
> **Cardinal bar (binding): real-paint-verified on real GPU, Chrome AND real macOS Safari, both modes.**
> COLOR π = `getImageData`; BLUR-radius π = `getComputedStyle`. The binding Safari sign-off is a SEPARATE manual
> real-macOS-Safari-26 capture, OUT of CI.
>
> **THE HONEST CONVERGENCE STATE:** the SPEC is converged (mechanisms validated, the 4 falsified instructions
> corrected, all mustFixes folded, contradictions resolved). The binding CROSS-ENGINE PAINT is NOT bound — every
> prototype is a `refine` verdict, the M1+M4 prototypes delivered nothing, the M3 matrix never built, WS1's
> warm-aurora field is NOT on disk (AppShell still mounts `PaperBackdrop`, `.paper-field` intact), and the ×6 Safari
> + ×4 design sign-offs are human-gated and unobtained. **This is a VERIFICATION + INTEGRATION frontier: the
> architecture will not move further until the captures exist and WS1 lands.**

---

## 0 · CONVERGENCE STATE (the honest gate — pass 4 converged)

| Wave | Mechanism | Field? | Status | Phase |
|---|---|---|---|---|
| **M1 W-CARTOON-INK-GAMUT** | in-gamut warm-brown pin + device-free witness (light+dark, band `[45,85]`) | independent | **SPEC-READY** — pin proven; witness+π OWED (prototype empty) | **1 (NOW)** |
| **M2 W-DOCK-CAST-RETIRE** | delete dead `inherits:false` cast + wedge + dock-PRM carve | independent | **SPEC-READY** — W3C-dead confirmed; atomic with the span delete | **1 (NOW)** |
| **M3 W-GLASS-CLIP-DISCIPLINE** | **Job-B** `contain:paint` on a NARROWED content+`.glass-card` selector (NO dock controls, NO overlay band) | independent | **MECHANISM-PROVEN, LAND OWED** — matrix decided the primitive; atomic land + concentric inner-arc + chip-bloom probes owed | **1 (NOW)** |
| **M4a W-SAFARI-BLUR-LITERAL** | `-webkit-` arm emits a resolved LITERAL; gate asserts presence+value-correctness | independent | **BUILD-PROVEN (88%)** — gate HARDENED; Safari-26 differential OWED | **1 (NOW)** |
| **M5a `.liquid-pill` substitution close** | raw `var(--glass-bg-floating)` → element-level `color-mix` | independent | **SPEC-READY** — demo-surface MECHANISM proof (NOT a user-facing fix) | **1 (NOW)** |
| **M4 W-GLASS-BLUR-PEER** | 4-file token-collapse + resolved-radius peer lock + ~7-gate rebaseline | **token: independent** / saturate: WS1 | **SPLIT** — collapse+gates+radius-peer land NOW; saturate-revert PAINT WS1-gated | **2** |
| **M5 W-GLASS-TINT-UNIFY** | continuous-luma SOURCE rule (RE-DERIVED, PROVEN) + bias INPUT channel + DRY recipe | WS1-gated | **DESIGN-PROVEN (78%)** — paint owed post-WS1 | **2** |
| **M6 W-GLASS-IDIOM-FACTOR** | DRY factor (`--glass-plate-tinted` once) + dead-token delete (3 claims corrected) | net-neutral | **CORRECTED** — KEEP deep-ceiling; DROP warm-zero (absent); spine = follow-up | **2** |
| **M5c W-GLASS-CONSUMER-BAND** | fold fill-tint consumers onto plate/rim | WS1-gated | carried | **3** |
| **M8 W-DOCK-LEGIBILITY-RECAL + W-GLASS-DYNAMICS** | re-anchor dock AA; lensing + NEUTRAL specular; backdrop-HUE sample | WS1-gated | carried + reference fence | **3** |
| **M9 W-DEMO-STYLE-REHOME** | WHOLE-rehome liquid-morph; liquid-enter delete BLOCKED (`@import`-live) | net-neutral | **CORRECTED** | **3** |

**Phase 1 = M1 · M2 · M3 · M4a · M5a — all field-INDEPENDENT, all real-paint-verifiable NOW.** The M4
**token-collapse + resolved-radius peer lock + ~7-gate rebaseline** is field-independent (a `getComputedStyle`
parity proof) and lands WITH Phase 1; only the **saturate-revert paint sign-off** is WS1-gated. Phase-2/3 chromatic
paint bars remain IMPOSSIBLE until WS1's warm-aurora field is paint-stable on disk (R-WS1, verified NOT landed).

---

## 1 · GESTALT GOAL (the bar — unchanged)

Make the dock, buttons, cards, items, and menus read as ONE glass material — the iOS-26/27 "Liquid Glass"
single-material discipline. Reference anchor `frames-2207/f006`: the bottom dock bar, the Search pill, and the
widget cards ALL read as the SAME translucent material at the SAME subtlety; the wallpaper reads THROUGH every plate
equally; **NO surface is a "heavier dock."** The glass read = (a) a bright top edge-light specular hairline + (b) a
soft NEUTRAL contact shadow + (c) edge LENSING, NOT a heavy Gaussian. Saturation is LOW.

The reference binds the fence pass 4 elevates: **color is DATA, not material** (f036 control-center — the ONLY
chroma is on active toggles; the resting plate is neutral-frosted). This decides the ≤2-pairs interpretation (§3.5)
and the saturate-revert (§3.4): Apple's model has **no saturation-boost parameter** — the desaturated frosted look
is translucency + blur + specular, never `saturate()`. glass-ui's `saturate(1.4–1.8)` is the metallic root.

1. **ONE material at varying opacity** — dock pill, content Card, button, menu row all resolve the SAME 8px blur
   radius and the SAME plate tint. The inversion (Button `.btn-glass`=13px floating + glass-deep=16px; dock=9px) is
   the fix — **demote the BUTTON's resting register, do not lighten the dock.**
2. **Subtle blur, structure survives, AND it BLURS ON SAFARI** — calmer than 4.2.0's `8/10/13/13/9/16`; carried by
   lensing + a NEUTRAL specular hairline. **AND the `-webkit-` arm must deliver a real blur on Safari (M4a) — the
   `var()`-token form paints flat there (MDN #25914).**
3. **Perfect corner clip** — Job A native on modern Chrome; **Job B (descendant bleed) is the fix**, on a NARROWED
   content+`.glass-card` selector (the overlay band AND the dock controls excluded).
4. **Soft ambient elevation, ZERO chromatic cast** — the composited cast over white AND the warm field resolves a
   warm BROWN (R>G>B, B>0, never `rgb(N,0,0)`, warm-hue ∈ `[45,85]`), both stamp Ls, both modes, both engines. The
   dock keeps the NEUTRAL `--shadow-dock`; the warm-brown ink re-inks the Memphis `<Card surface="cartoon">` only.
5. **ONE chromatic seam** — TWO SURFACE pairs (`{plate}` neutral legibility-darken + `{rim}` data-hue) **+ ONE
   HEAVILY-CLAMPED INPUT bias** (the observer's write target; NOT a resting chromatic plate tint — f006's plate
   does NOT take the wallpaper hue). Zero inert read axes (computed-style proven).
6. **DRY** — the re-pasted idioms declared ONCE; zero dead tokens/`@property` in the glass cascade.

---

## 2 · VERIFIED GROUND TRUTH @ HEAD (the pass-4 deltas, RE-VERIFIED on disk this synthesis)

- **M1 cartoon-ink (RE-VERIFIED).** `shadow.css:107` = `--cartoon-ink: oklch(from var(--foreground) clamp(0.14,l,0.18)
  max(c,0.11) h)` — the maroon (the `max(c,0.11)` chroma-floor is out-of-gamut at low L → clamps to `rgb(N,0,0)`).
  Rungs at 32/26/18% (lead/mid/contact, shadow.css:108-110). `--cartoon-ink-fallback: #4a3320` (line 113).
  Contrast arms `prefers-contrast: more` (213-219) AND `prefers-reduced-transparency: reduce` (220-224) are
  **byte-identical** (42/34/24%) → the DRY collapse to one comma-`@media` is valid. **Dark arm** (`dark-arm.css:177`)
  = `oklch(from var(--foreground) clamp(0.20, calc(1 - l), 0.30) max(c,0.11) h)` at alphas **46/38/26%**
  (lines 178-180), fallback `#5a3f28` (line 181). The dark mode composites at **46/38/26%** over the
  `calc(1-l)`-inverted ink — capture THAT, not light's 32/26/18%.
- **Safari blur (the headline, RE-VERIFIED).** `vite.style-assets.ts:534` matches `backdrop-filter: <value>;` and
  `:559` emits `-webkit-backdrop-filter: ${value}; backdrop-filter: ${value};` — injecting the IDENTICAL `var()`
  value as the webkit arm. The ladder authors `backdrop-filter: var(--glass-blur-*)` → the injected webkit twin is
  `var(--glass-blur-*)` → **`var()` does not resolve in `-webkit-backdrop-filter` (MDN #25914, no Safari-26 fix,
  corroborated tailwindcss#13844).** On Safari ≤17 (reads ONLY the webkit form) the plate paints flat.
- **M3 group (RE-VERIFIED).** `material.css:36-47` `position: relative` group = `.glass-material, .glass-wash,
  .glass-quiet, .glass-resting, .glass-floating, .glass-overlay, .glass-card, .glass-specular-track,
  .dock-icon-button, .dock-tab-button, .dock-select-trigger, .dock-dropdown-trigger`. `.glass-card` runs
  `contain: layout style paint` (surfaces.css:34); `.glass-btn` runs standalone `contain: paint` (surfaces.css:79);
  `.glass-chip` runs `isolation: isolate` (glass-chip.css:69) with a `plus-lighter` `::after` bloom (165-176). The
  reka overlay tiers `.glass-floating`/`.glass-overlay` ARE in the group → a group `contain:paint` would clip a
  Popper arrow (`pop2` ate it, confirmed).
- **M4 file accounting (RE-VERIFIED).** `--glass-blur-btn: blur(floating-radius * level) saturate(floating)
  brightness(1.02)` (glass.css:176 = the **FLOATING** family: 13px + sat 1.6 + brightness 1.02). `.btn-glass {
  backdrop-filter: var(--glass-blur-btn) }` (surfaces.css:188); `.btn-glass.glass-deep { --glass-blur-btn:
  var(--glass-blur-deep) }` (surfaces.css:225 — the 16px re-point). Default `<Button>` composes `glass-wash btn-glass
  glass-deep glass-capsule glass-capsule-hover text-foreground` (button/index.ts:69); `primary-audacious` keeps
  `glass-deep` (line 92). The dock reads `--dock-surface-blur: var(--glass-blur-dock, var(--glass-blur-wash))`
  (shell.css:17, the wash-1px fallback trap) → `backdrop-filter: var(--dock-surface-blur)` (shell.css:147). Blur
  primitives: `--glass-blur-quiet-radius:8 / resting:10 / floating:13 / dock:9` (glass.css:76-92). Saturate:
  `wash/quiet/resting:1.4 / floating/overlay:1.6 / dock:1.4` (glass.css:113-124); deep ceiling 1.8.
- **M4 menu register (RE-VERIFIED).** `.glass-menu-row` (menu.css:34) paints `--menu-row-bg: color-mix(in oklab,
  var(--glass-bg-quiet), var(--glass-tint-source) var(--glass-tint-strength))` as a hover BACKGROUND (not a
  backdrop-filter); its quiet-tier blur carries `brightness(1.02)`. After the collapse quiet(8px) == resting(8px)
  radius — the peer-lock asserts the radius LEG, not the companion.
- **M5 SOURCE architecture (RE-VERIFIED).** `ladder.css:275-293` is the LIVE content-tier rule: `--glass-tint-source:
  var(--glass-tint-ink)` UNCONDITIONAL + a CONTINUOUS `--glass-tint-strength` clamp reading `--glass-backdrop-luma`
  (knee 0.6, floor→AA ramp). The binary `@container` bucket (ladder.css:154) "survives only as a no-`@property`
  degrade fallback" — RETIRED as the strength driver. **The pass-3 "source = bright-bucket ? ink : bias-hue"
  boolean has no live bucket to switch on** — re-derived (§3.5.3). **The `--glass-tint-source:` writer census
  (WIDENED, RE-VERIFIED):** ladder.css 154/213/275 (content-tier ink) + a11y-fallback.css:36 + dock/adaptive-
  legibility.css 47/76 + **glass-fx.css:157 (`var(--card)` BASE default)** + **liquid-morph.css 34/65
  (`var(--glass-ambient-hue, transparent)`, the demo-only bias readers M9 rehomes)** — 9 writers total.
- **`proof:glass-cal` reality (RE-VERIFIED).** `PRE_WAVE_RADII` (line 58) includes `glass-blur-dock-radius: 11`
  (line 64); `BAND_LO=8 / BAND_HI=15` (66-67). B1 iterates `PRE_WAVE_RADII` and reds "not found" if a token is
  retired (line 107) → retiring `--glass-blur-dock-radius` MUST remove that entry. B3 reds on the saturate-revert
  (the named-knob regex, ~166-172). S3 reads `--glass-blur-dock-radius` for the dock-shrink.
- **M6 dead-token reality (RE-VERIFIED, 3 corrections):** `--glass-saturate-deep-ceiling` READ 6× by
  `proof:glass-legibility` L4 → **KEEP**; `--glass-warm-zero` ABSENT (grep empty) → **DROP the phantom work item**;
  `--glass-spine-blur`/`-opacity` test-pinned (`InstrumentChassis.spine-variant.test.ts`) → **coordination
  follow-up**. Confirmed-dead-and-deletable: `--cartoon-cast-dx`/`-dy` @property + `cards.css` transition legs (no
  driver), `scripts/tmp-glass-rest.mjs`, the a11y-fallback.css 213-227 **5 rung blocks ONLY** (KEEP line 228/229
  `.glass-btn { background: var(--glass-bg-wash) }` — a real webkit override).
- **M9 reality (RE-VERIFIED):** `liquid-morph.css` (850L) live rules `.liquid-pill`/`.liquid-stage` have ZERO src
  consumers (demo-only). `liquid-enter.css` IS `@import`-ed at glass.css:73 (the universal `.liquid-enter` mount
  recipe) → **the "delete liquid-enter" item is BLOCKED** unless `.liquid-enter` has zero ELEMENT consumers.

---

## 3 · MECHANISM (the idiomatic approach — the converged resolutions)

### 3.1 · The maroon ink — in-gamut warm brown (M1, field-independent)
The proven primary pin (cartoon-punch register, machine-verified in-gamut):
```css
/* shadow.css :root */
--cartoon-ink: oklch(from var(--foreground) clamp(0.28, l, 0.34) clamp(0.030, c, 0.050) h);
```
- **Dark-arm DEFAULT = (A) DRY-collapse.** Delete the dark `--cartoon-ink:` re-declaration (dark-arm.css:177) so the
  `:root` pin cascades via the dark `--foreground`. **Machine-verified result:** light pin → `rgb~(74,60,48)` at
  OKLab **H57.4°**; dark pin (the `:root` clamp reading the dark `--foreground`'s high L) → L0.34 at OKLab **H76.7°**
  — BOTH in `[45,85]`, both warm brown (R>G>B>0). **Rationale:** (i) it IS the re-pasted-idiom kill the brief names;
  (ii) the risk margin favors it (contact-over-dark R−B ≈ 9–14, safe — vs form (B)'s darker sticker at R−B ≈ 5, the
  GPU-AA noise floor). **The dark cast lightens L 0.20→0.34 — a materially lighter sticker owing a paint sign-off
  (§7).** The π CAPTURES BOTH (A) and (B) so the human signs off with evidence; if (A) reads too pale, fall back to
  **(B) per-mode lower-L** (`clamp(0.16,l,0.20) clamp(0.018,c,0.025) h`, the BD-golden-restoring form — a recorded
  per-mode pair, NOT a re-paste).
- Re-derive EACH `@supports not (color: oklch(from …))` fallback literal from its mode's PAINTED pixel (DROP the
  `#4a3320` light / `#5a3f28` dark assumptions — the painted L floors below nominal, FINDING A). Rewrite the false
  `max(c,0.11)`/"gamut-necessity" comments (it is a chroma-vs-darkness DESIGN choice, not a gamut law).
- PRT / `prefers-contrast: more` arms deepen via ALPHA (32→42%), NEVER chroma. **Fold the byte-identical
  shadow.css 213-219 / 220-224 contrast arms into ONE comma-joined `@media (prefers-contrast: more),
  (prefers-reduced-transparency: reduce)`** (the DRY dup pass-3 missed).
- **Gate (`proof:no-gray`, NEW `cartoon-ink-warm-in-gamut` witness, born-RED, DEVICE-FREE):** reuse
  `oklchToRgb`/`relativeOklchFrom`/`rgbToOklab` + the gate's `WARM_HUE_LO=45`/`WARM_HUE_HI=85` constants (REUSE,
  no fork). Build a NEW clamp-aware resolver: parse `clamp(lo,l,hi)` + eval against fgL, parse
  `clamp(lo,c,hi)`/`max(c,N)` + eval against fgC, use fg H (the current `darkTintLiftL` only matches bare-numeric L).
  Assert **R>G>B>0 AND H ∈ `[45,85]` for BOTH source-foregrounds** (light + dark). Born-RED on HEAD's light
  `rgb(49,0,0)` (B=0) AND dark `rgb(48,5,0)` (B=0) → GREEN on the pin. **NOT chroma≥floor** — that predicate
  produced BOTH the maroon AND the metallic saturate (the chronic-breaker).
- **π (REAL `box-shadow` render):** `getImageData` on an element painting `box-shadow: var(--shadow-cartoon-md/-lg)`
  over white AND dark (field-independent, NOW), real-GPU Chrome — R>G>B>0 + warm-hue, all 3 rungs, both modes. Use
  **mode-correct cast alphas**: dark composites at **46/38/26%** over the L0.34 ink (NOT light's 32/26/18%). Sample
  the STACKED near-corner (binding, R−B≈15–28 over white / over field); the contact tail (R−B≈4 over white, 5–14
  over dark) is ADVISORY (GPU-AA-flippable). Capture BOTH (A) and (B) side-by-side for the sign-off. Manual
  real-macOS-Safari sign-off OUT of CI. **Sequence M1 ≤ M2.** **The M1 prototype delivered NOTHING — the witness +
  the box-shadow π must be BUILT at develop-out (the empty structured return is itself a headless-green-trap
  failure-mode to surface, not silently score).**

### 3.2 · The dock cast — delete the dead mechanism + the wedge (M2, field-independent)
- Delete `shape.css` 208-249 wholesale (the `.cartoon-cast` block + `[data-punching]` deepen + the W3C-dead kinetic
  travel + the cast PRM block) AND `GlassDock.vue:606` `<span class="cartoon-cast">` — atomically (no orphan
  `--dock-punch-stretch` reader survives except the KEPT press-squash scale-channel + its driver).
- ADD the dock-scope PRM carve `.glass-dock { @media (prefers-reduced-motion: reduce) { --motion-weight: 0 } }`;
  post-build `getComputedStyle`-confirm it computes `0` on `.glass-dock` under emulated reduce **in the concatenated
  `@layer components` bundle** (a later dock partial re-declaring `--motion-weight` would clobber it by cascade
  order — verify in the real bundle, not the source partial).
- Dock elevation = `--shadow-dock` (neutral omni drop, in-gamut, escapes the radius) + `--glass-key` rim — both
  KEPT. **Do NOT add a "soft ambient replacement"** — `--shadow-dock` already IS it. The flare → W-GLASS-DYNAMICS
  (DELETE-first, decided on paint, §3.7).
- The global `.cartoon-cast` Card rule (cards.css:359 — the `<Card surface="cartoon">` consumer) KEEPS its cast; M1
  de-maroons it. Maroon claim SCOPED to the dock PLATE (control/button/chip casts stay maroon until M1 lands).

### 3.3 · The clip discipline — Job B on a NARROWED selector (M3, field-independent, MECHANISM-PROVEN)
**The matrix PROVED `contain:paint` is the cross-engine Job-B primitive** (real-GPU headed Chromium + bundled
WebKit, identical pixel verdicts). It clips a descendant's `backdrop-filter` OUTPUT — not just its background — to
the ancestor's rounded border-box. **But the prototype `build=false`; it decided the mechanism and closed nothing.**
The converged, narrowed, atomic scope (every critique mustFix folded):

- **Job A** — the host's OWN `backdrop-filter` corner. Native-clips on modern Chrome (matrix-proven). No primitive
  needed on Chrome; owe the WebKit-bug-158483 version-grounding (BY VERSION, not UA) on real Safari.
- **★ Job B — mint `contain: paint` on a NARROWED content + `.glass-card` selector.** The DEFAULT clip selector =
  **the bare `.glass-material` atom + the content tiers `.glass-wash, .glass-quiet, .glass-resting` + `.glass-card`**.
  **EXCLUDE `.glass-floating`/`.glass-overlay`** (the reka Dialog/Popover/Sheet/Command/HoverCard overlay band — a
  group clip ATE the Popper arrow, `pop2` confirmed). **★ DROP the 4 dock controls** (`.dock-icon-button`,
  `.dock-tab-button`, `.dock-select-trigger`, `.dock-dropdown-trigger`) from the clip selector: they are net-new
  containment at HEAD, have NO nested-glass descendant (Job-B n/a), get NO Job-A help, and keeping them only arms
  R-BLAST on the 1.1× hover plate for ZERO clip gain. (If a future need re-adds them, the matrix MUST add a
  dock-control cell — the 1.1× hover plate over the contained border-box — AND re-run `proof:dock-plate-clearance`
  against the BUILT bundle.)
- **★ Retire the per-class dialects INTO the narrowed selector (DRY — "declared ONCE"):**
  - `.glass-card`'s `contain: layout style paint` (surfaces.css:34) → **narrow to `contain: paint`** (drop the
    `layout` containing-block that would clip poppers nested in a card) — folded into the group selector.
  - `.glass-btn`'s standalone `contain: paint` (surfaces.css:79) → **retire INTO the group selector** (else two
    dialects survive and the brief's "declared ONCE" DRY is unmet — the prototype only retired `.glass-card`).
  - `.glass-chip`'s `isolation: isolate` (glass-chip.css:69) → swap to the group's `contain: paint` ONLY IF the
    `plus-lighter` `::after` bloom survives the swap on real GPU (`contain:paint` also opens a stacking context, so
    the bloom SHOULD stay scoped — but PROVE it: `getImageData` the bloom region before/after; KEEP `isolation` +
    scope-out only if it regresses).
  - `.glass-specular-track` (the group member) — **explicit disposition = EXCLUDE.** It is a decorative specular
    overlay whose gleam intentionally bleeds along the rim band; containing it would clip the gleam. Record the
    exclusion as a gate fact (the census is otherwise incomplete).
- **THE MISSING MATRIX CELL (the #1 owed — BUILD it on real GPU, BOTH engines):**
  - (a) a full-bleed/over-corner child (full-bleed image AND a nested glass `<Button>` with its OWN
    `backdrop-filter`) inside a radius `.glass-resting` Card, parent WITH vs WITHOUT `contain:paint` — does it clip
    the descendant to the radius?
  - (b) a `.glass-floating` Dialog/Popover WITH a real PopperArrow, parent ±`contain:paint` — does it clip the
    arrow? (decides the overlay-band include/exclude — DEFAULT exclude, re-include ONLY if the arrow survives on
    BOTH engines).
  - (c) **★ the concentric-radius cell, re-probed at the INNER-CORNER ARC region** (reference f018: a nested inner
    row clips to ITS smaller radius inside the outer panel). The pass-3 3px-inside sample read the inner glass and
    NEVER tested the triangle between the inner radius and its rectangular corner — sample THAT region for an
    inner-corner fringe; the "no aliasing fringe" claim is otherwise unproven.
- **`overflow: hidden` FORBIDDEN** (clips focus ring + specular bleed). `contain: paint` clips DESCENDANTS only —
  the host's own rim/drop-shadow/focus-ring paints from the box and escapes correctly.
- **Gate (`proof:glass-clip`, NEW, device-free `ci`, born-RED):** assert the narrowed selector carries
  `contain:paint` on the BUILT dist (**lightningcss-form-aware: assert the `contain:paint` substring** — verified
  it emits clean as `contain: paint`, NOT `content`; lightningcss 1.32 drops `style` from `layout style paint` →
  `layout paint`, it does NOT collapse to `content`) AND the per-class `contain`/`isolation` dialects are RETIRED.
  The radius+clean-corner assertion lives in the LIVE π (a stylesheet scan cannot see the composed `rounded-card`
  class list). Carved exemptions, recorded as gate facts: the dock morph aperture (`overflow-x:clip;
  overflow-y:visible`); the `<Card surface="cartoon">` Memphis layer; the EXCLUDED overlay band; `.glass-specular-
  track`; the dropped dock controls. Run `proof:dock-plate-clearance` + `proof:nested-backdrop-budget` against the
  BUILT bundle.
- **π (the trap-closer):** the corner on REAL GPU Chrome AND real macOS Safari, both modes, over a busy backdrop,
  on the BUILT route with real `<Card>`/`<Dialog>`/`<Popover>`/`<Button>` + the real `--glass-bg-*` oklab tint + the
  rim `::after` ring + grain `::after` + specular `::before` present + a descendant-over-corner child. `getImageData`
  top-corner = clean arc; descendant does NOT bleed; a nested inner glass clips to its concentric radius; dock
  bottom-left no wedge; **a real Popper arrow + focus ring + paper cast survive** (the overlay-band exclusion
  verified). Drop the "BUILT-route-faithful" framing on the STANDALONE analog — the standalone is a mechanism proxy;
  the BUILT-route π is the binding capture. **Reconcile the verdict explicitly:** Job A clips clean on modern
  Chrome; the visible square edge IS Job B + the M2 wedge — NEVER let it read as "no card-corner defect exists."
- **★ LAND M3 ATOMICALLY** (mint the narrowed `contain:paint`, retire the per-class dialects), build
  `proof:glass-clip` born-RED→GREEN, flip `buildPassed=true`. **The binding real-macOS-Safari-26 `getImageData`
  sign-off for Job-B descendant-backdrop-filter clipping is the M3 CONVERGENCE CEILING (BLOCKING, not a footnote)**
  — bundled WebKit is a non-binding proxy; Metal can diverge from the standing WebKit nested-backdrop bug class. If
  Safari cannot clip a nested `backdrop-filter` descendant to the ancestor radius, Job B has no cross-engine
  `contain` fix on Safari and needs a different mechanism (descendant self-clip, or documented Chrome-only) — decide
  on the capture, do NOT close M3 on Chrome alone.

### 3.4 · The blur peer — SPLIT: token-collapse NOW, saturate PAINT post-WS1 (M4) + M4a
**M4 splits into the field-independent collapse (lands with Phase 1) and the WS1-gated saturate-revert.**

**M4a — the Safari blur literal (field-INDEPENDENT, build-PROVEN 88%, the headless-green-trap fix).**
- Author the `-webkit-backdrop-filter` arm as a **resolved LITERAL** (`blur(Npx) saturate(M)`), never `var()`. The
  unprefixed `backdrop-filter: var(--glass-blur-*)` STAYS for modern engines. **Route (prototype-PROVEN, build-green):
  build-injection** — `vite.style-assets.ts:559` resolves the `--glass-blur-*` token chain to the common-case literal
  (`--glass-level: 1` default) and emits THAT as the webkit arm (it already owns the webkit injection; the literal
  tracks whatever the ladder resolves to AT BUILD). The source-authored alternative was NOT needed — build-injection
  is value-tracking and proven (9 webkit arms → clean literals, 0 bare `var(--glass-blur*)` webkit arms remain, the
  5 unprefixed arms untouched, vite + vue-tsc EXIT 0).
- The `--glass-level: 0` a11y bracket + dark-arm saturate companions cannot be captured by a single literal on the
  webkit arm — that is an ACCEPTED degradation (Safari-with-reduced-transparency is a tiny intersection; the
  unprefixed arm carries the level path on Safari 18+ IF it resolves `var()`).
- **This is value-tracking** — when M4 lands the unified `~8/10` band, the literal re-emits to the new values
  automatically. It is field-INDEPENDENT (about Safari resolving the blur token AT ALL, over any field) → Phase 1.
- **★ Gate (HARDENED — the critique's #1 mustFix; the as-specified gate recurred the trap):** assert NOT just
  ABSENCE-of-`var(` but (a) every BUILT `-webkit-backdrop-filter` arm carries a concrete `blur(<px>)` literal AND
  (b) the literal blur-px MATCHES the build-resolved value of its paired unprefixed `backdrop-filter` arm
  (value-correctness — a `blur(0px)` literal must RED, not green). **π:** real-macOS-Safari-26 `getComputedStyle` +
  a visual capture — the 4-region self-calibrating differential (bare / literal-blur+tint / var-blur+tint /
  tint-only) proves the literal arm BLURS where the var arm paints flat. OUT of CI, BINDING.

**M4 — the token collapse + resolved-radius peer lock (field-independent) + the saturate-revert (WS1-gated PAINT).**
- **The 4-file collapse (field-independent — `getComputedStyle` parity, lands with Phase 1):** demote the default
  `<Button>` off `glass-deep` (button/index.ts:69 — remove the `glass-deep` token from the default variant string);
  re-author `.btn-glass` (surfaces.css:188) to read `--glass-blur-resting` directly; collapse the dock
  `--dock-surface-blur` alias onto `--glass-blur-resting` (**fix the shell.css:17 fallback so retiring
  `--glass-blur-dock` does NOT drop the dock to wash 1px — re-point `--dock-surface-blur: var(--glass-blur-resting)`
  DIRECTLY, no comma-fallback**); retire `--glass-blur-dock`/`-radius` + `--glass-blur-btn` (→ resting). Keep `wash`
  (1px) as the distinct content-pane near-no-blur tier. `.btn-glass.glass-deep` STAYS as the `:liquid`/hero opt-in
  (see the hero decision below).
- **★ The `.btn-glass` re-author is NOT byte-identical — capture the paint delta.** `--glass-blur-btn` resolves
  `blur(13px) saturate(1.6) brightness(1.02)` (the FLOATING family); re-pointing to `--glass-blur-resting` drops to
  `blur(8px) saturate(1.4)` — DROPPING `brightness(1.02)` and lowering saturate `1.6→1.4` on every glass button.
  `getImageData`/visual before-after, never assert "byte-identical."
- **★ The hero-blur identity decision (RECORDED).** `primary-audacious` + `.btn-glass.glass-deep` stay at deep 16px
  vs dock 8px — a button-heavier-than-dock inversion on the HERO variant. **DECISION: the peer-lock targets the
  RESTING register only** (default Button == dock == default Card == menu-row = 8px). `glass-deep` is the documented
  refraction-DEPTH opt-in (BB.W-DEEP-GLASS, the `:liquid`/hero "more glass" register) — a deliberate exclusion from
  the blur-peer, recorded as a **refraction-depth-not-blur-peer** rationale with an OWED design sign-off (§7). It is
  NOT an unguarded inversion; the gestalt-#1 "ONE material at varying opacity" binds the resting register, and the
  hero opts in by NAME. (The alternative — demote the hero too — is held in reserve if the sign-off rejects.)
- Target band `wash 1 / quiet 8 / resting 8 / floating 10 / overlay 10` — passes `proof:glass-cal` with NO
  `BAND_LO` edit (`BAND_LO=8`; `8 >= 8`; in-band DOWN moves free — verified). Drop below 8 (→6) ONLY if the M8
  read-carrier (lensing + neutral specular) paint-proves the read holds, with the `BAND_LO` move + a rationale note
  IN THE SAME DIFF.
- **★ THE RESOLVED-RADIUS PEER LOCK (the BD-regression lock — menu contradiction RESOLVED).** `proof:glass-cal`
  asserts dock == button == default-Card == menu-row all resolve the **SAME `blur(<px>)` RADIUS LEG (8px)** — NOT
  token-name/string identity. `.glass-menu-row`'s quiet tier carries `brightness(1.02)` and `.btn-glass`'s pre-fix
  floating tier carried `saturate(1.6)`; a string assert FALSE-FAILS on the companion. **The assert extracts the
  `blur(Npx)` radius leg and compares THAT** (following the alias indirection: `.btn-glass` → `--glass-blur-btn` →
  resting; dock → `--dock-surface-blur` → resting — or collapse the aliases so the token-identity is direct). The
  per-tier `brightness()`/`saturate()` light-lift companions are deliberately preserved and excluded from the
  blur-peer. Overlay PANELS (`.glass-floating`, 10px) are the intended one-tier-up overlay register, NOT a peer
  violation. BD silently re-pointed btn to floating/deep with no gate to catch it; this is the lock. **Acceptance
  item 6 wording corrected from "== `--glass-blur-resting` TOKEN" to "resolve the SAME `blur(8px)` radius leg."**
- **The saturate-revert `1.4-1.6 → ~1.2` (WS1-gated PAINT, system-identity).** The metallic root: Apple's model has
  NO saturation parameter; the iridescent blue/purple sheen (top-bar.png) is `saturate()` amplifying a non-warm
  field. **The revert cannot be validated until WS1's warm field lands** (the iridescence is field × saturate).
  Hold **dock saturate at exactly 1.2** (the `proof:no-gray` `lightDockSat ≥ 1.2` floor); the unified plate tint
  becomes the PRIMARY anti-gray, saturate 1.2 secondary. Lift dark-resting saturate/brightness in lockstep BEFORE
  retiring `--glass-saturate-dock`. Lowering deep 1.8→1.6 is OPTIONAL (only if revert-paint shows deep metallic).
- **★ THE ~7-GATE REBASELINE IN-DIFF (corrected count):**
  1. **`proof:glass-cal` B1** — REMOVE the `glass-blur-dock-radius: 11` entry from `PRE_WAVE_RADII` (else B1 reds
     "not found in tokens/glass.css" the moment the token retires) + confirm the remaining radii stay in-band.
  2. **`proof:glass-cal` B3** — re-point the coupled saturate sites (floating/overlay defaults, the named-knob
     regex, the dark-dock arm, the deep-ceiling fence) to the reverted VALUE regex (the saturate-revert arm).
  3. **`proof:glass-cal` S3** — dock-shrink re-point off the RETIRED `--glass-blur-dock-radius`.
  4. **`proof:no-gray`** — the 2 dock witnesses re-pointed (PASS at dock saturate 1.2).
  5. **The resolved-radius SAME-blur peer assert** (the alias-following 8px leg).
  6. **`proof:glass-cohesion`/`proof:adaptive-glass`** — the demoted Button + dock still route a glass tier (no
     opaque regression off the W54 allowlist).
  7. **The M4a webkit-literal gate** (presence + value-correctness).
- **π (saturate-revert gated behind WS1):** dock + Card + Button resolve the SAME `backdrop-filter` blur-radius
  (`getComputedStyle` parity + the SAME-radius gate), ladder calmer, field structure reads through, the iridescence
  (top-bar.png) resolves to neutral-frosted (f036), demoted surfaces still read as glass (lensing+specular), both
  modes, both engines. **Scope the convergence claim honestly: the one-material-over-field frame + the saturate-
  revert are UNVERIFIABLE this pass (WS1 not on disk). The converge-able M4 arm NOW is the field-independent
  token-collapse + resolved-radius parity + the ~7-gate rebaseline, Chrome-captured.**

### 3.5 · The tint unify — TWO surface pairs + ONE clamped input bias (M5, atomic, WS1-gated) — SOURCE PROVEN (78%)
**End state: ≤2 chromatic SURFACE pairs** — PLATE `--glass-tint-source`/`-strength` (neutral legibility-darken) +
RIM `--glass-accent`/`-strength` (data-hue) — **+ ONE HEAVILY-CLAMPED INPUT bias** `--glass-tint-bias-hue`/
`-strength` (the renamed `--glass-ambient-*`; the observer's write target that FEEDS the plate, NOT a third surface
paint pair). **Lands as ONE atomic diff or not at all.** The reference fence binds: the resting plate is neutral;
the input bias is a sub-perceptual whisper, never a chromatic plate tint (f006 — the plate does not take the
wallpaper hue).

1. **The writers write the INPUT BIAS, not the plate source directly (the FALSIFICATION fix).** The
   `--glass-tint-source:` writer census (WIDENED, RE-VERIFIED this synthesis — pass-3's §3.5.1 list was incomplete):
   - **content-tier ink (clobbers an ancestor write):** ladder.css 154/213/275 + a11y-fallback.css:36 +
     dock/adaptive-legibility.css 47/76.
   - **BASE default:** glass-fx.css:157 (`--glass-tint-source: var(--card)` — the origin the content-tier rules
     override; NOT a content-tier ink re-declaration).
   - **demo-only bias readers:** liquid-morph.css 34/65 (`var(--glass-ambient-hue, transparent)` — the
     `.liquid-pill`/`.liquid-stage` readers M9 rehomes to `demo/`).
   Because every content-tier surface re-declares `--glass-tint-source` ON ITSELF, an ancestor write is clobbered —
   so `useBloomUp.ts:340/343` + `useGlassBackdropLuminance.ts:448` write `--glass-tint-bias-hue`/`-strength` (the
   renamed inherited `@property`), and the content-tier `:where()` rule COMPOSES the bias into the source (3 below).
   **Release via `removeProperty`, not set-`0%`** (the `@property` initial IS `0%` → a no-op set).
   `useGlassBackdropLuminance.ts:448` is the SAME function WS1 retires/rewires — **ONE owner, ONE coordinated
   WS1+WS3 diff, M5 strictly AFTER WS1** (§7 R-WS1).
2. **Fold `--glass-fill-tint`/`-strength`** (Badge/SelectableChip/IconChip/glass-atom/glass-chip) onto the plate
   pair, preserving the asymmetry (glass-atom reads STRENGTH, glass-chip reads HUE). Requires the 3 design sign-offs
   (§7): Badge data-hue activation, the rest-warmth delta (deleted `--glass-atom-tinted` warm-amber-at-rest),
   SelectableChip dilution sub-perceptual.
3. **★ THE SOURCE RULE — RE-DERIVED against the CONTINUOUS-luma architecture (PROVEN, 78%).** Pass-3 gated the
   bias-hue on the binary `@container` bucket; that bucket is RETIRED as the strength driver (ladder.css:275-293 is
   now a continuous `--glass-backdrop-luma` clamp). **The fresh formulation (algebraically clean, byte-identical at
   rest, AA-preserving — prototype P5):** the content-tier `:where()` rule composes the bias INTO the ink source
   weighted by INVERSE luma — the bias hue tints the source only where the plate is NOT earning the AA darken (low
   luma = calm field = the bias whisper shows; high luma = bright backdrop = the source rotates to the warm ink, AA
   wins):
   ```css
   /* the content-tier :where() rule (ladder.css ~275), continuous-luma-aware */
   --glass-tint-source: color-mix(in oklab,
       var(--glass-tint-ink),                 /* AA ink — wins as luma → 1 */
       var(--glass-tint-bias-hue, transparent)
         calc(var(--glass-tint-bias-strength, 0%) *
              (1 - clamp(0, var(--glass-backdrop-luma, 0), 1))));  /* bias whisper — fades out as luma rises */
   --glass-tint-strength: max(<the existing continuous W55 clamp>, var(--glass-tint-bias-strength, 0%));
   ```
   **The AA floor is non-negotiable:** as `--glass-backdrop-luma → 1` (bright backdrop) the bias weight → 0 and the
   source is pure `--glass-tint-ink` (the W55 bright-bucket lift to `--foreground` still wins — ladder.css 154/162
   unchanged). At the `0%`/`transparent` rest the mix is byte-identical to today (`color-mix(…, X, transparent 0%) ≡
   X`). **This needs a `getImageData` paint proof post-WS1** (the write-proven≠paint-proven gap that killed the
   ambient path); design-proven NOW.
4. **THE DRY INNER/OUTER FACTOR — declare ONCE.** The 17 live `color-mix(in oklab, var(--glass-bg-…), …)` plate
   pastes must NOT bloat into 17 double-nested mixes. **Pull the pure `--glass-plate-tinted` recipe (the inner+outer
   compose with NO bias leg) into a FIELD-INDEPENDENT M6-adjacent landing FIRST** (factoring the 17 pastes is
   field-independent; doing it first shrinks M5's atomic diff to ONLY adding the bias outer-leg in ONE place). The
   inner invariant is the FULL W55 CONTINUOUS luma-driven strength (NOT a flat 4% floor).
5. **Rebuild the clamp FRESH on WS1's LIVE scope.** The `--paper-field-warm` skip-guard + `min(…,8%)` clamp live on
   the DEAD `[data-paper-field]` attr scope (verified — nothing sets the attr). When WS1 lands its field, build the
   combined-hue clamp FRESH on WS1's actual live scope and PROVE no over-rotation past `WARM_HUE_HI=85` across ALL
   section-accents (a violet/teal accent + warm bias must not over-rotate).
6. **Close the substitution trap — M5a (Phase 1, the ONE bindable-NOW MECHANISM proof).** `.liquid-pill` reads
   pre-composed `--glass-bg-floating` raw (liquid-morph.css:104) → compose the rung CLASS (the ladder element-level
   `color-mix`, the `.liquid-sheet:281` form). **★ RECLASSIFICATION:** `.liquid-pill` is DEMO-ONLY
   (liquid-playground.vue) — the shipped `<Card>` composes `.glass-resting` which ALREADY does the element-level
   mix. So M5a is a **demo-surface MECHANISM proof + the bias-channel paint-validator, NOT a user-facing dock fix.**
   Keep it Phase 1 (the only paintable substitution evidence pre-WS1) but do NOT claim it fixes a visible defect.
   `getImageData` `[data-testid=liquid-pill]` at rest (byte-identical) AND mid-bloom (the warm hue paints).
7. **Delete the `--glass-ambient-*`/`--glass-fill-*` @property regs LAST**, behind a born-RED bite. The
   `--glass-ambient-*` → `--glass-tint-bias-*` rename carries the @property registration (kept INHERITED).
8. **Re-point `proof:glass-foundation` A1 — CONCRETE.** KEEP the bias-write assert + ADD a surface-composes-the-mix
   wiring assert (the content-tier `:where()` rule composes the bias into `--glass-tint-source`) + ADD a
   `getImageData` paint bite. The `useBloomUp.test.ts` `8.000%` asserts move to the bias token.
- **★ ≤2-PAIRS RATIFICATION (for the orchestrator):** **2 SURFACE pairs (plate, rim) + 1 named, HEAVILY-CLAMPED
  INPUT bias.** The luminance bucket (`--glass-backdrop`/`-luma`) is a darken TRIGGER, not a chromatic paint pair
  (excluded from the count). The fold is a UNION of existing axes (fill-tint→plate, ambient→bias-rename), NOT a new
  third paint pair — DRY-clean. The reference fence makes the input-bias a sub-perceptual whisper (color is DATA;
  the resting plate stays neutral). Confirm this satisfies the brief's "≤2 chromatic tint token-pairs" + "zero inert
  axes" (ambient is NOT inert — `useBloomUp` writes it via `setProperty`; CSS-grep is blind — so the unify is a
  behavior-preserving RE-POINT, never a delete). **This ≤2-pairs interpretation is the one OPEN orchestrator
  ratification item.**
- **π (gated behind WS1):** every read axis WRITTEN (computed-style proven, NOT grep); the bloom proven LIVE by
  `getImageData` on a real bloomed `.liquid-pill`; chips paint their data hue; both modes, both engines.

### 3.6 · DRY + dead-token delete (M6) and the demo rehome (M9) — CORRECTED
- **M6 (corrected):** `--glass-tint-strength-floor` one home (the 12%/15% per-mode pair — note the live token is
  `--glass-tint-strength-floor`; reconcile the framing, do not conflate with a phantom `--glass-tint-floor`);
  `.glass-press-squash`/`--press-squash` (kills 3 pastes, PRM-zeroed via `--motion-weight: 0`); `.loud` composed;
  the shadow.css 213-219/220-224 contrast arms collapsed to one comma-`@media`. **DROP `--glass-warm-zero` (does
  not exist at HEAD — phantom work item).** **KEEP `--glass-saturate-deep-ceiling` (read 6× by
  proof:glass-legibility L4).** `--glass-spine-blur`/`-opacity` are a **coordination follow-up** (test-pinned by
  `InstrumentChassis.spine-variant.test.ts`), NOT a CSS-only delete. **DELETE the pure-redundant a11y-fallback.css
  213-227 GUARD-2 — the 5 rung blocks ONLY (KEEP line 228/229 `.glass-btn`).** Delete `--cartoon-cast-dx`/`-dy`
  @property + the dead `cards.css` legs (no driver — delete reg+readers atomically). Inline-and-delete
  single-consumer `--glass-bg-clear`. KEEP `--glass-saturate-deep`, `--glass-spine-vignette`/`-border`,
  `--glass-bg-dock` (LIVE via comma-fallback). **Re-run a reader census at landing for EVERY delete candidate**
  (the 3 false claims are the lesson). Boundary: A-deadcode owns the radius/spring dead tokens + `useLiquidMorph.ts`
  (the 0-consumer TS half — confirmed dead, but A-deadcode's `BG.W-DEADCODE-CUT` owns it).
- **M9 (corrected):** **WHOLE-rehome `glass/liquid-morph.css` (850L) to `demo/`** (KISS — its live rules
  `.liquid-pill`/`.liquid-stage` have ZERO src consumers; the rehome collapses the >500 split + the demo-in-src
  smell + the dead-ambient-CSS-reader into ONE move; after it, the `--glass-ambient-*`/`--glass-tint-bias-*` axis has
  NO library CSS reader — a pure JS-write → `:where()`-rule bias bridge). Any genuine library rule moves to
  `dock/morph.css`/`material.css`. **`liquid-enter.css` delete is BLOCKED** (it IS `@import`-ed at glass.css:73 —
  the universal `.liquid-enter` mount recipe; verify zero `.liquid-enter` ELEMENT consumers before any delete, else
  KEEP). Delete `scripts/tmp-glass-rest.mjs`. SEQUENCE LAST; M9 strictly AFTER WS1 (the same-function
  `useGlassBackdropLuminance.ts:448` collision); the bias→plate re-homes onto WS1's live field scope (§3.5.5).

### 3.7 · Dynamics — lensing + NEUTRAL specular carry the read at lower blur (M8, WS1-gated) — REFERENCE FENCE
- Strengthen W-LENSING squircle refraction + the NEUTRAL specular hairline — the read-carrier at the calmer blur.
  **The specular hairline (NOT the SVG displacement) carries the Safari glass read** (lensing rides `@supports
  (backdrop-filter: url(#…))`, dead on Safari per WebKit 245510). **REFERENCE FENCE:** keep the resting body
  specular NEUTRAL/achromatic (`~rgb(78,78,78)`, the Siri pill-body register); reserve the PRISMATIC cool→white→
  warm edge dispersion for WS6's active/motion edge ONLY — chromatic-dispersing the resting hairline IS the metallic
  over-correction. **M8's calmer-blur paint sign-off is READ-CARRIER-gated** — the capture must prove the demoted
  dock/Button STILL read as glass via the rim+lensing (sequence M4's saturate paint AFTER/WITH M8's rim, not before
  — demoting blur without the rim risks a flat plate).
- Add the iOS-27 backdrop-HUE sample to `useGlassBackdropLuminance` (write the unified INPUT BIAS channel
  `--glass-tint-bias-hue`). Keep it DEMO-PRIVATE (off the public glass barrel → never in the root-barrel value.js
  eager-graph — else `profile:budget` critical-path reds); ride the EXISTING ≤4Hz rAF + IntersectionObserver
  throttle (no new rAF); wrap `createSpecularWriter` (never fork `--mouse-x/y`).
- **The flare: DELETE-first, decided ON PAINT.** Capture the no-flare baseline; prove the squash + `--shadow-dock`
  omni + `--glass-key` rim carry the depth-pop. ONLY if it under-reads, drive the flare PARENT-ATTR-DRIVEN
  (`.glass-dock[data-punching] > .dock-flare`) — NEVER the dead `inherits:false` var, with a Safari z-order verify.

---

## 4 · FILES TOUCHED

**Phase 1 (field-INDEPENDENT — land + paint-verify NOW):**
- `src/styles/tokens/shadow.css` — `--cartoon-ink` → the in-gamut pin; re-derive the fallback from the painted
  pixel; collapse the contrast arms to one comma-`@media` (M1).
- `src/styles/tokens/dark-arm.css` — dark arm = **(A) delete the re-declaration (line 177)** (default), or (B)
  per-mode lower-L per the §7 sign-off (M1).
- `src/styles/dock/shape.css` — delete 208-249 (cast + dead travel + cast PRM); add the dock-scope PRM
  `--motion-weight: 0` (M2).
- `src/components/custom/dock/GlassDock.vue` — delete `<span class="cartoon-cast">` (M2, line 606).
- `src/styles/glass/material.css` — mint Job-B `contain: paint` on the **NARROWED content + `.glass-card` selector**
  (M3) — NO overlay band, NO dock controls; `.glass-specular-track` EXCLUDED.
- `src/styles/glass/surfaces.css` — retire `.glass-card` `contain: layout style paint` → narrowed `contain: paint`
  (line 34) AND retire `.glass-btn`'s standalone `contain: paint` (line 79) INTO the group (M3).
- `src/styles/glass/glass-chip.css` — swap `isolation: isolate` → group `contain: paint` ONLY IF the `plus-lighter`
  `::after` bloom survives on real GPU; else KEEP (M3, line 69).
- `vite.style-assets.ts` — emit the `-webkit-backdrop-filter` arm as a resolved LITERAL, never `var()` (M4a, line
  559).
- `src/styles/glass/liquid-morph.css` — `.liquid-pill:104` raw → element-level `color-mix` (M5a).
- `scripts/proof-no-gray.mjs` — the `cartoon-ink-warm-in-gamut` witness, light+dark, clamp-aware parser, band
  `[45,85]` (M1, born-RED).
- `scripts/proof-glass-clip.mjs` (NEW) — the Job-B narrowed-selector gate, lightningcss-`contain:paint`-aware (M3).
- `scripts/proof-safari-blur-literal.mjs` (NEW) or an arm in an existing build gate — the BUILT webkit arms carry a
  `blur(<px>)` literal (presence) MATCHING the resolved unprefixed value (correctness), never `var(` (M4a).
- `tests-visual/glass-standardization.spec.ts` (NEW) — the cast `getImageData` (M1, (A)+(B), mode-correct alphas) +
  the `.liquid-pill` rest/bloom arm (M5a); enroll in webkit testMatch.
- `tests-visual/glass-clip.spec.ts` (NEW) — the corner-arc + descendant-bleed + concentric-inner-arc + dock-no-wedge
  + Popper-arrow π (M3).
- `tests-visual/playwright.config.ts` — enroll the 2 new specs in the `webkit` testMatch allowlist.

**Phase 2 (token-collapse field-independent; saturate-revert WS1-gated):**
- `src/styles/tokens/glass.css` — the blur-peer band; retire `--glass-blur-dock`/`-radius`/`-btn` (→ resting) +
  `--glass-saturate-dock`; the saturate-revert (WS1-gated); rename `--glass-ambient-*` → `--glass-tint-bias-*` (kept
  @property), delete `--glass-fill-*` @property regs LAST (M4/M5).
- `src/components/ui/button/index.ts` — demote the default Button off `glass-deep` (M4, line 69).
- `src/styles/glass/surfaces.css` — re-author `.btn-glass` (line 188) to read `--glass-blur-resting` (M4).
- `src/styles/dock/shell.css` — `--dock-surface-blur` → `var(--glass-blur-resting)` DIRECTLY (no comma-fallback)
  (M4, line 17).
- `src/styles/tokens/dark-arm.css` — lift dark-resting saturate/brightness BEFORE retiring `--glass-saturate-dock`
  (M4).
- `src/styles/glass/ladder.css` — the DRY `--glass-plate-tinted` recipe (field-independent, M5.4 — land FIRST); the
  content-tier `:where()` continuous-luma SOURCE rule composing the bias (M5.3, WS1-gated).
- `scripts/proof-glass-cal.mjs` — the ~7-gate rebaseline (REMOVE `glass-blur-dock-radius:11` from `PRE_WAVE_RADII`;
  B3 saturate; S3 dock-shrink) + the dock==button==Card==menu-row resolved-RADIUS-leg peer assert (alias-following)
  (M4).
- `src/composables/motion/useBloomUp.ts` — re-point writers to the bias channel; `removeProperty` release (M5,
  340/343/349).
- `src/composables/glass/useGlassBackdropLuminance.ts` — re-point to the bias channel (M5, line 448) — **WS1
  co-owner.**
- `scripts/proof-glass-foundation.mjs` — A1 = bias-write + composes-the-mix + a getImageData paint bite (M5).
- `tests/composables/motion/useBloomUp.test.ts` — the `8.000%` asserts move to the bias token (M5).

**Phase 3:** the consumer folds (Badge/SelectableChip/IconChip/feedback-tone/accent-tone); the M8 dynamics JS; the
M9 WHOLE-rehome of liquid-morph to `demo/` + the dead-file deletes (`scripts/tmp-glass-rest.mjs`; `liquid-enter.css`
ONLY if zero `.liquid-enter` element consumers).

---

## 5 · WAVE BREAKDOWN

### Phase 1 — the visible D3 fixes + the Safari trap (field-INDEPENDENT, land + real-paint-verify NOW)
- **BG.W-CARTOON-INK-GAMUT (M1)** — the in-gamut pin; dark-arm (A) default with the (A)+(B) sign-off captures; the
  device-free witness (light+dark, band `[45,85]`, clamp-aware) born-RED → GREEN; the real-box-shadow `getImageData`
  π (mode-correct alphas). **BUILD the witness + the π — the prototype delivered nothing.** Sequence M1 ≤ M2.
- **BG.W-DOCK-CAST-RETIRE (M2)** — delete shape.css 208-249 + GlassDock.vue:606 atomically; the dock-scope PRM
  carve (verified in the concatenated bundle); the dock bottom-left no-wedge π.
- **BG.W-GLASS-CLIP-DISCIPLINE (M3, NARROWED to Job B; overlay band + dock controls EXCLUDED)** — mint
  `contain:paint` on the content + `.glass-card` selector; retire the per-class dialects (`.glass-card`,
  `.glass-btn`) INTO it; `.glass-specular-track` EXCLUDED; **BUILD the MISSING Job-B + Popper-arrow + concentric-
  inner-arc matrix cell** (decides the overlay-band include/exclude); verify the chip bloom survives;
  `proof:glass-clip` born-RED→GREEN; **LAND atomically, `buildPassed=true`**; the corner-arc π; the binding
  real-macOS-Safari-26 sign-off is the convergence CEILING.
- **BG.W-SAFARI-BLUR-LITERAL (M4a, build-PROVEN)** — emit the `-webkit-backdrop-filter` arm as a resolved LITERAL
  via `vite.style-assets.ts`; the HARDENED gate (presence + value-correctness, not just absence-of-var); the
  real-Safari-26 4-region differential π (OUT of CI). The headless-green-trap fix.
- **BG.W-GLASS-TINT-UNIFY rider — M5a (the substitution MECHANISM proof, demo-surface, bindable NOW)** — the
  `.liquid-pill` element-level `color-mix`; `getImageData` rest/bloom. NOT a user-facing fix.

### Phase 2 — the architectural collapse (token-collapse with Phase 1; saturate + tint WS1-gated)
- **BG.W-GLASS-BLUR-PEER (M4)** — the 4-file token-collapse + the resolved-RADIUS-leg peer lock (alias-following,
  menus IN) + the ~7-gate rebaseline (field-independent, lands with Phase 1); the `.btn-glass` paint delta captured
  honestly; the hero `glass-deep` exclusion recorded (refraction-depth, owed sign-off); the saturate-revert
  1.4-1.6 → 1.2 (WS1-gated PAINT, system-identity sign-off); dock held at 1.2. The one-material `getComputedStyle`-
  parity π (saturate paint behind WS1).
- **BG.W-GLASS-IDIOM-FACTOR (M6, the field-independent DRY arm)** — the `--glass-plate-tinted` recipe (land FIRST,
  shrinks M5); the corrected dead-token deletes (KEEP deep-ceiling; DROP warm-zero phantom; spine = follow-up; the
  reader-census-per-candidate discipline); the press-squash/`.loud`/contrast-arm DRY.
- **BG.W-GLASS-TINT-UNIFY (M5, ONE atomic diff, WS1-gated)** — the continuous-luma SOURCE rule (RE-DERIVED, PROVEN);
  the bias INPUT channel; fold fill-tint; the FRESH clamp on WS1's scope; the @property delete LAST; `proof:glass-
  foundation` A1 concrete. Sign-offs first (Badge data-hue, rest-warmth, SelectableChip dilution).

### Phase 3 — consumer + recalibration + cleanup (depends on Phase 2 + WS1)
- **BG.W-GLASS-CONSUMER-BAND (M5c)** · **BG.W-DOCK-LEGIBILITY-RECAL + W-GLASS-DYNAMICS (M8)** · **BG.W-DEMO-STYLE-
  REHOME (M9, WHOLE-rehome, SEQUENCE LAST)** — with the M8 reference fence (neutral resting specular) and the M9
  whole-rehome + `liquid-enter`-delete-BLOCKED corrections.

---

## 6 · ACCEPTANCE / REAL-PAINT-π BAR (the cardinal bar)

Device-free gates passing is NOT the bar. COLOR π = `getImageData`; BLUR-radius π = `getComputedStyle`. The binding
Safari sign-off is a SEPARATE manual real-macOS-Safari-26 capture, OUT of CI.

1. **Warm-brown cast** — composited cast (REAL `box-shadow`) over white + warm field + dark = R>G>B, B>0, NOT
   `rgb(N,0,0)`, warm-hue ∈ `[45,85]`, both modes (mode-correct alphas: dark 46/38/26%), both engines.
   `proof:no-gray` `cartoon-ink-warm-in-gamut` witness (device-free, light+dark) green. **Field-independent — NOW.**
2. **Clean clip (Job B)** — the narrowed content + `.glass-card` selector resolves `contain:paint` (dist
   `contain:paint` substring); top-corner `getImageData` over a busy backdrop = clean arc; a descendant-over-corner
   child does NOT bleed; a nested inner glass clips to its concentric radius (INNER-ARC region clean); dock
   bottom-left no wedge; **a real Popper arrow + focus ring + paper cast survive** (overlay-band + dock-control +
   `.glass-specular-track` exclusion verified). `proof:glass-clip` green + the real-GPU/Safari π (the Safari sign-off
   is the convergence ceiling). **Field-independent — NOW.**
3. **Safari BLURS (M4a)** — the BUILT `-webkit-backdrop-filter` arms carry a `blur(<px>)` literal MATCHING the
   resolved unprefixed value (no `var(`, no `blur(0px)`); on real macOS Safari 26 the literal-blur region BLURS
   where the var region paints flat (the 4-region differential). **Field-independent — NOW (the live headless-green-
   trap fix).**
4. **`.liquid-pill` substitution closed (M5a)** — `getImageData` byte-identical at rest, warm hue at mid-bloom;
   `buildPassed=true`. The MECHANISM proof (demo-surface, not a user-facing fix). **Field-independent — NOW.**
5. **Dock PRM** — `getComputedStyle` confirms `--motion-weight: 0` on `.glass-dock` under emulated reduce in the
   concatenated bundle. **Field-independent — NOW.**
6. **Token peer lock (M4, field-independent arm)** — dock == button == default-Card == menu-row resolve the SAME
   `blur(8px)` RADIUS LEG (`getComputedStyle` parity + the alias-following resolved-radius gate; the per-tier
   brightness/saturate companions excluded). **Field-independent — NOW** (the saturate-revert paint is item 7).
7. **ONE material (M4 saturate + M5)** — one frame: dock + Card + Button as ONE glass material over the WS1 field;
   SAME blur radius, SAME plate tint (`getImageData` ΔE band), field structure reads through; the iridescence
   resolves to neutral-frosted (f036); demoted surfaces read as glass on Safari. Both modes, both engines. **Gated
   behind WS1.**
8. **≤2 chromatic surface pairs + 1 clamped input bias** — exactly 2 `(hue,strength)` SURFACE pairs (plate, rim) +
   1 labeled, heavily-clamped INPUT bias; every read axis WRITTEN (computed-style proven, NOT grep); the bloom
   proven LIVE by `getImageData`; chips paint their data hue; the resting plate stays neutral (color is DATA).
   **Gated behind WS1 + the orchestrator ≤2-pairs ratification.**
9. **DRY + dead-free** — each idiom once (the `--glass-plate-tinted` recipe ONE home); zero dead tokens/@property
   (KEEP deep-ceiling; warm-zero phantom dropped; spine follow-up); `profile:budget` + `proof:css-critical`
   net-negative or flat.
10. **a11y/perf/cross-engine fences** — the 3 `--glass-level` brackets reach blur(0)/firm-up; PRM keeps-fade-drops-
    transform + the dock-scope `--motion-weight: 0`; compositor-only; new JS off the dock.js chunk + the root-barrel
    value.js eager-graph fence; the build injects the `-webkit-` LITERAL twin; Safari lensing degrades to
    specular-carries-the-read.

---

## 7 · FOLDED / DEFERRED ITEMS + SIGN-OFFS

- **WS1 shell-aurora field** — the live-paint precondition, NOT ON DISK at HEAD (AppShell still mounts
  `PaperBackdrop`, `.paper-field` intact). Phase-2/3 chromatic-paint bars are IMPOSSIBLE without it. M5/M9 sequence
  strictly AFTER WS1; `useGlassBackdropLuminance.ts:448` is the WS1↔WS3 same-function collision — ONE owner, ONE
  coordinated diff.
- **The 4 PAINT/DESIGN SIGN-OFFS owed BEFORE their wave lands:**
  - **Dark-cast lightness (M1)** — (A) DRY-collapse (the default) raises the dark cast L 0.20→0.34. The π captures
    BOTH (A) and (B); sign off the lighter (A) cast OR adopt (B) per-mode lower-L.
  - **Content saturate-revert 1.4-1.6 → 1.2 (M4)** — PAINT sign-off over WS1's warm field (the iridescence is field
    × saturate); not gate-green.
  - **The hero `glass-deep` blur exclusion (M4)** — the refraction-depth-not-blur-peer rationale (the hero stays
    16px vs dock 8px) owes a design sign-off, OR demote the hero too.
  - **The 3 net-new-behavior tint folds (M5)** — Badge `data-hue` activation, the rest-warmth delta, SelectableChip
    dilution sub-perceptual.
- **The binding real-macOS-Safari `getImageData` captures (×6)** — OUT of CI: the warm-brown cast (M1), Job-A/Job-B
  + Popper-arrow corners (M3, the convergence ceiling), **the M4a webkit-literal-blur resolution (the headline —
  verifies the fix, no longer decides the mechanism)**, the one-material frame (M4/M5). Bundled WebKit is a PROXY,
  non-binding.
- **The orchestrator ≤2-pairs ratification** — 2 surface pairs (plate, rim) + 1 clamped INPUT bias. Confirm this
  reading of "≤2 chromatic tint token-pairs" with the orchestrator (§3.5).
- **`--glass-depth` lerp / deep saturate 1.8 (BB.W-DEEP-GLASS fence) / `--surface-tint-*` in srgb (AW.W26) /
  getImageData-only color-π / the in-oklab glass-tint axis** — SETTLED fences, do NOT re-litigate.
- **Radius/spring dead tokens, `useLiquidMorph.ts` TS half (0-consumer)** — A-deadcode's `BG.W-DEADCODE-CUT`/
  `BG.W-DEAD-TOKEN-SWEEP`; WS3 owns the CSS half only.
- **The chronic-breaker gate** (a chroma-floored token's resolved hue + gamut AT its actual L — produced BOTH the
  maroon AND the metallic saturate) — the `cartoon-ink-warm-in-gamut` witness is the FIRST instance; the general
  predicate surfaces to WS7.
- **The dock morph-blur ramp** (the user's "dock blurry too long") — WS2's dock-morph domain, NOT the static-radius
  peer M4 owns. Flag to WS2 (this workstream OWNS the unified static blur register WS2's dock-morph CONSUMES).

---

## 8 · OPEN RISKS (the falsification frontier — the residual gate)

- **R-CLIP-JOBB (MECHANISM-PROVEN, LAND OWED) — `contain:paint` is the cross-engine primitive** (real-GPU Chromium
  + bundled WebKit, identical verdicts) but the prototype `build=false` — the atomic land + the concentric-inner-arc
  + the chip-bloom + the BUILT-route π are owed at develop-out. **The binding real-macOS-Safari-26 sign-off is the
  convergence CEILING** — Metal can diverge; do NOT close M3 on Chrome/bundled-WebKit alone. (Prototype P1, 88%
  est / 68% critique.)
- **R-SAFARI-BLUR (SETTLED in MECHANISM, build-PROVEN, GATE HARDENED) — `var()` broken in
  `-webkit-backdrop-filter` (MDN #25914); the literal arm is the fix (M4a).** The as-specified gate (absence-of-var)
  recurred the trap; HARDENED to presence + value-correctness. The OPEN residual: does the unprefixed
  `backdrop-filter: var()` carry the blur on Safari 18-26 DESPITE the invalid webkit alias (engine-specific)? The
  literal arm is the no-regression fix regardless; the real-Safari-26 capture verifies it. (Prototype P4, 88% est /
  52% critique.)
- **R-M5-SOURCE-STALE (RE-DERIVED, DESIGN-PROVEN) — the SOURCE rule was keyed to a RETIRED binary bucket.** The
  re-derived inverse-luma-weighted mix (§3.5.3) is algebraically clean + byte-identical at rest + AA-preserving
  (prototype P5, 78%); paint-proof owed post-WS1 (the write-proven≠paint-proven gap that killed the ambient path).
- **R-M4-FILES (CORRECTED) — M4 is a 4-file collapse with alias indirection + a paint delta.** `.btn-glass` reads
  `--glass-blur-btn` (→ floating 13 + brightness 1.02 + saturate 1.6, not resting 8 — a real paint delta on demote);
  the dock reads `--dock-surface-blur` (→ wash 1px fallback trap, fixed by direct re-point). The peer gate FOLLOWS
  the aliases (resolved-radius leg) or false-greens; the menu contradiction is resolved by the radius-leg assert.
- **R-WS1 (HIGH) — M5/M9 EDIT the function WS1 retires + the clamp scope is DEAD.** Designate ONE owner; M5/M9
  strictly AFTER WS1 lands paint-stable.
- **R-SAT-REVERT (HIGH) — the saturate-revert reds ~7 coupled gate sites AND is a system-identity decision.**
  Rebaseline IN-DIFF (incl. the B1 `PRE_WAVE_RADII` removal); hold dock at 1.2; the revert needs PAINT sign-off over
  the field (the metallic root is field × saturate — unvalidatable until WS1 lands).
- **R-DEAD-TOKEN-FALSE (CORRECTED) — 3 M6 delete-claims were wrong.** KEEP `--glass-saturate-deep-ceiling`
  (proof:glass-legibility L4 reads it 6×); DROP `--glass-warm-zero` (absent); `--glass-spine-blur` is a
  test-coordination follow-up. Re-run a reader census at landing for EVERY delete candidate.
- **R-DARK-IDENTITY (MED) — the M1 dark-arm (A) DRY-collapse lightens the dark cast L 0.20→0.34.** The default;
  sign off or adopt (B). Both in-gamut warm brown.
- **R-BLAST (LOW after the pass-4 narrowing) — the M3 clip on the dock controls re-arms the BA.W-DOCK-GEOMETRY freed
  cross-axis?** RESOLVED by DROPPING the dock controls from the clip selector (zero clip gain there). Run
  `proof:dock-plate-clearance` against the BUILT bundle regardless.
- **R-FINDING-A (LOW, prototype-PROVEN) — the cast pixel floors lower than nominal.** The bar is structural
  warm-brown; @18%-over-white is ADVISORY (margin GPU-AA-flippable). Re-derive the @supports fallback from the
  painted pixel.
- **R-RESIDUAL (the convergence gate) — the binding cross-engine PAINT is the unmet residual.** Every prototype is a
  `refine` verdict; the M1 + M4 prototypes delivered nothing; the M3 matrix never built; WS1's field is not on disk;
  the ×6 Safari + ×4 design sign-offs are human-gated and unobtained. Phase 1 (M1·M2·M3·M4a·M5a) + the M4
  token-collapse are field-independent and real-GPU-Chrome-capturable NOW; the real-macOS-Safari sign-offs are
  human-gated, OUT of CI. **The develop-out loop can land + Chrome-verify Phase 1 + queue the human-Safari packet;
  it CANNOT produce the 6 binding Safari captures nor the one-material frame without WS1. Surface honestly.**
- **R-SEQUENCE — build the GATES first (born-RED):** `proof:no-gray` cartoon-ink witness (device-free, light+dark,
  band `[45,85]`); `proof:glass-clip` (Job-B narrowed selector, after the matrix); the M4a webkit-literal assert
  (presence+correctness); the `proof:glass-cal` ~7-gate rebaseline. Phase 1 + the M4 token-collapse are independent
  + low-blast (M1 ≤ M2). Phase 2 saturate + Phase 3 high-blast gated behind WS1 + the rebaseline. **W-GLASS-TINT-
  UNIFY lands as ONE atomic diff or not at all.**
