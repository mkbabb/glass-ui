# BG-WS3 · Glass standardization — ONE coherent glass register (pass-4)

> Workstream: BG-WS3-glass-standardization · **Pass 4 — EXECUTE + BIND THE PAINT + UNBLOCK**
> Base: `tranche/BG` @ `aaa254c8` (every fact below RE-VERIFIED LIVE on disk during this synthesis)
> Predecessor: `SPEC-pass3-converged.md` (mechanism-converged, paint-uncaptured). **This pass does NOT restart it
> — it ADVANCES the unconverged frontier: the captures that bind the paint, the falsifiers the prototypes never
> ran, and the spec instructions that are stale against HEAD's CURRENT architecture.**
>
> **What pass 4 SETTLES (the frontier the prior pass left open):**
> 1. **★ SAFARI `var()`-IN-`-webkit-backdrop-filter` IS SETTLED — NOT "run the differential."** MDN
>    browser-compat-data #25914 (confirmed Safari 18.3, no 26 fix; corroborated tailwindcss#13844): Safari
>    silently drops `var()` inside `-webkit-backdrop-filter` — it accepts **fixed px only**. HEAD's build injects
>    exactly the broken form (`vite.style-assets.ts` prepends `-webkit-backdrop-filter: var(--glass-blur-*)`), so
>    on a Safari ≤17 engine the ENTIRE glass register can paint blur-less — **the live headless-green trap, shipped
>    at HEAD.** The fix is no longer "design + run a capture"; it is **author the `-webkit-` arm as a resolved
>    LITERAL, never `var()`** (M4a — field-INDEPENDENT, value-tracking). The real-Safari-26 capture now VERIFIES
>    the fix, it does not DECIDE the mechanism.
> 2. **★ THE M5 SOURCE RULE IS KEYED TO A RETIRED MECHANISM.** Pass-3 §3.5.3 gates the bias-hue on the binary
>    `@container style(--glass-backdrop:light)` bucket (ladder.css:154). **BC.W-ADAPTIVE-RECONCILE RETIRED that
>    bucket as the strength driver** (ladder.css:275–293 is now a CONTINUOUS `--glass-backdrop-luma` clamp; the
>    bucket "survives only as a no-`@property` degrade fallback" — verified verbatim on disk). There is no clean
>    boolean for the bias-hue to win against. **The SOURCE rule must be RE-DERIVED against the continuous-luma
>    architecture** (M5, §3.5.3) — a fresh formulation (mix the bias-hue into the ink source weighted by
>    inverse-luma), design-proven NOW, paint-proven post-WS1.
> 3. **★ THREE M6 DEAD-TOKEN CLAIMS ARE FALSIFIED ON DISK.** `--glass-saturate-deep-ceiling` is READ 6× by
>    `proof:glass-legibility` L4 (lines 312/339/341/375/431/434 — mandates its presence) → **KEEP**, not delete.
>    `--glass-warm-zero` does NOT exist at HEAD (grep empty) → **DROP** the phantom ×5-paste work item.
>    `--glass-spine-blur`/`-opacity` are pinned by `InstrumentChassis.spine-variant.test.ts` → **coordination
>    follow-up**, not a CSS-only delete. (§3.6 corrected.)
> 4. **★ THE M3 GROUP IS WIDER THAN PASS-3 LISTED + the overlay band is in it.** `material.css:36-47` enrolls
>    `.glass-specular-track` + the **4 dock controls** AND the `.glass-floating`/`.glass-overlay` reka tiers. Group
>    `contain:paint` lands net-new containment on the dock controls (R-BLAST) AND on every reka Dialog/Popover/
>    Sheet (the arrow/submenu clip). **Pass-4 narrows the clip selector to the CONTENT/dock tiers and EXCLUDES the
>    overlay band by default** — the Job-B matrix decides whether the overlay band can be re-included (§3.3).
> 5. **★ M4 IS A 4-FILE COLLAPSE WITH ALIAS INDIRECTION, not "demote off glass-deep."** `.btn-glass` HARDCODES
>    `backdrop-filter: var(--glass-blur-btn)` (surfaces.css:188); the dock reads `--dock-surface-blur:
>    var(--glass-blur-dock, var(--glass-blur-wash))` (shell.css:17, with a wash-1px fallback trap). The
>    SAME-token peer lock must FOLLOW the alias indirection or it false-greens. (§3.4 corrected.)
> 6. **★ THE LIGHTNINGCSS MINIFIED FORM IS `contain:paint`, NOT `content`.** lightningcss 1.32.0 drops `style`
>    (`layout style paint` → `layout paint`); it does NOT collapse to `content`. Mint `contain:paint` — it emits
>    clean; the device-free gate asserts the `contain:paint` substring on the BUILT dist (verified:
>    `dist/styles/glass.css` carries `contain: paint`). (§3.3 corrected.)
>
> **Cardinal bar (unchanged): real-paint-verified on real GPU, Chrome AND real macOS Safari, both modes.**
> Methodology (SETTLED — do not re-litigate): **COLOR π = `getImageData` only**; **BLUR-radius π =
> `getComputedStyle`**. The binding Safari sign-off is a SEPARATE manual real-macOS-Safari capture, OUT of CI.

---

## 0 · CONVERGENCE STATE (the honest gate — pass 4)

| Wave | Mechanism | Field? | Pass-4 status | Phase |
|---|---|---|---|---|
| **M1 W-CARTOON-INK-GAMUT** | in-gamut warm-brown pin + device-free witness (light+dark) | independent | **READY** — proven 90%; dark-arm default (A), sign-off captures both | **1 (NOW)** |
| **M2 W-DOCK-CAST-RETIRE** | delete dead `inherits:false` cast + wedge + dock-PRM carve | independent | **READY** — W3C-dead confirmed; atomic with the span delete | **1 (NOW)** |
| **M3 W-GLASS-CLIP-DISCIPLINE** | **Job-B** containment on a NARROWED content/dock selector | independent | **MATRIX OWED** — group-scope decided by the Job-B cell | **1 (NOW)** |
| **M4a W-SAFARI-BLUR-LITERAL** | `-webkit-` arm emits a resolved LITERAL, never `var()` | independent | **NEW + READY** — the headless-green-trap fix, value-tracking | **1 (NOW)** |
| **M5a `.liquid-pill` substitution close** | raw `var(--glass-bg-floating)` → element-level `color-mix` | independent | **READY** — demo-surface MECHANISM proof (not a user-facing fix) | **1 (NOW)** |
| **M4 W-GLASS-BLUR-PEER** | 4-file token-collapse + same-token peer lock + ~6-gate rebaseline | **token: independent** / saturate: WS1 | **SPLIT** — the collapse+gates land NOW; saturate-revert PAINT is WS1-gated | **2** |
| **M5 W-GLASS-TINT-UNIFY** | continuous-luma SOURCE rule + bias INPUT channel + DRY recipe | WS1-gated | **RE-DERIVED** — the SOURCE rule vs the continuous clamp | **2** |
| **M6 W-GLASS-IDIOM-FACTOR** | DRY factor + dead-token delete (3 claims corrected) | net-neutral | **CORRECTED** — KEEP deep-ceiling; drop warm-zero; spine = follow-up | **2** |
| **M5c W-GLASS-CONSUMER-BAND** | fold fill-tint consumers onto plate/rim | WS1-gated | carried | **3** |
| **M8 W-DOCK-LEGIBILITY-RECAL + W-GLASS-DYNAMICS** | re-anchor dock AA; lensing + NEUTRAL specular; backdrop-HUE sample | WS1-gated | carried + reference fence | **3** |
| **M9 W-DEMO-STYLE-REHOME** | rehome liquid-morph (WHOLE, not split); liquid-enter delete BLOCKED | net-neutral | **CORRECTED** — liquid-enter is `@import`-live | **3** |

**Phase 1 is now M1·M2·M3·M4a·M5a — all field-INDEPENDENT, all real-paint-verifiable NOW** (M4a is the pass-4
addition; it does not need WS1's field — it fixes Safari resolving the blur token AT ALL). Phase-2 splits: the M4
**token-collapse + peer lock + gate rebaseline** is field-independent (a `getComputedStyle` parity proof) and can
land with Phase 1; only the **saturate-revert paint sign-off** is WS1-gated. Phase 2/3 chromatic-paint bars remain
IMPOSSIBLE until WS1's warm-aurora field is paint-stable on disk (R-WS1 — verified NOT landed: AppShell still
mounts `PaperBackdrop`, `.paper-field` intact).

---

## 1 · GESTALT GOAL (the bar — unchanged from pass 3)

Make the dock, buttons, cards, items, and menus read as ONE glass material — the iOS-26/27 "Liquid Glass"
single-material discipline. Reference anchor: `frames-2207/f006` — the bottom dock bar, the Search pill, and the
widget cards ALL read as the SAME translucent material at the SAME subtlety; the wallpaper reads THROUGH every
plate equally; **NO surface is a "heavier dock."** The glass read = (a) a bright top edge-light specular hairline +
(b) a soft NEUTRAL contact shadow + (c) edge LENSING, NOT a heavy Gaussian. Saturation is LOW.

The reference adds a binding fence pass 4 elevates: **color is DATA, not material** (f036 control-center — the
ONLY chroma is on active toggles; the resting plate is neutral-frosted). This decides the ≤2-pairs interpretation
(§3.5) and the saturate-revert (§3.4): Apple's model has **no saturation-boost parameter** — the desaturated
frosted look is translucency + blur + specular, never `saturate()`. glass-ui's `saturate(1.4–1.8)` is the metallic
root.

1. **ONE material at varying opacity** — dock pill, content Card, button, menu row all resolve the SAME
   `--glass-blur-resting` and the SAME plate tint. The inversion (Button=16px is the heaviest, dock=9px the
   lightest) is the fix — **demote the BUTTON, do not lighten the dock.**
2. **Subtle blur, structure survives, AND it BLURS ON SAFARI** — calmer than 4.2.0's `8/10/13/13/9/16`; carried by
   lensing + a NEUTRAL specular hairline. **AND the `-webkit-` arm must deliver a real blur on Safari (M4a) — the
   var()-token form paints flat there.**
3. **Perfect corner clip** — Job A native on modern Chrome; **Job B (descendant bleed) is the fix**, on a NARROWED
   content/dock selector (the overlay band excluded by default).
4. **Soft ambient elevation, ZERO chromatic cast** — the composited cast over white AND the warm field resolves a
   warm BROWN (R>G>B, B>0, never `rgb(N,0,0)`), both stamp Ls, both modes, both engines. The dock keeps the NEUTRAL
   `--shadow-dock`; the warm-brown ink re-inks the Memphis `<Card surface="cartoon">` only.
5. **ONE chromatic seam** — TWO SURFACE pairs (`{plate}` neutral legibility-darken + `{rim}` data-hue) **+ ONE
   HEAVILY-CLAMPED INPUT bias** (the observer's write target; NOT a resting chromatic plate tint — the f006 plate
   does NOT take the wallpaper hue). Zero inert read axes (computed-style proven).
6. **DRY** — the re-pasted idioms declared ONCE; zero dead tokens/`@property` in the glass cascade.

---

## 2 · VERIFIED GROUND TRUTH @ HEAD (the pass-4 deltas; full ground truth in pass-3 §2)

Pass-3 §2 is re-verified intact. The pass-4 ADDITIONS / CORRECTIONS:

- **Safari blur (NEW, the headline).** `vite.style-assets.ts` injects `-webkit-backdrop-filter: <identical value>`
  for every `backdrop-filter: <v>;` decl (verified, idempotent, skips already-paired). The ladder authors
  `backdrop-filter: var(--glass-blur-resting)` (ladder.css) → the injected webkit twin is `var(--glass-blur-resting)`
  → **`var()` does not resolve in `-webkit-backdrop-filter` (MDN #25914).** On Safari ≤17 (which reads ONLY the
  `-webkit-` form) the plate paints flat. On Safari 18–26 the open question is whether the unprefixed
  `backdrop-filter: var()` carries the blur DESPITE the invalid webkit alias — engine-specific, settled only by the
  real-Safari-26 capture. **The no-regression fix is value-independent: emit the webkit arm as a resolved LITERAL.**
- **M4 file accounting (CORRECTED).** `.btn-glass { backdrop-filter: var(--glass-blur-btn) }` (surfaces.css:188);
  `.btn-glass.glass-deep { --glass-blur-btn: var(--glass-blur-deep) }` (surfaces.css:224 — the 16px re-point);
  default `<Button>` composes `glass-wash btn-glass glass-deep …` (button/index.ts:30). The dock reads
  `--dock-surface-blur: var(--glass-blur-dock, var(--glass-blur-wash))` (shell.css:17). Demoting Button off
  `glass-deep` alone leaves `.btn-glass` at `--glass-blur-btn` = **floating 13px, NOT resting 8px** — M4 must
  re-author surfaces.css:188 to read `--glass-blur-resting` directly AND collapse the dock alias (or make the
  peer-lock gate follow it) AND fix the dock fallback so retiring `--glass-blur-dock` does not drop the dock to wash
  1px. **4 files: glass.css, surfaces.css, button/index.ts, dock/shell.css** (+ dark-arm.css for the dock-saturate
  lockstep).
- **M5 SOURCE architecture (CORRECTED).** ladder.css:275–293 is the LIVE content-tier rule: `--glass-tint-source:
  var(--glass-tint-ink)` UNCONDITIONAL + a CONTINUOUS `--glass-tint-strength` clamp reading
  `--glass-backdrop-luma`. The binary `@container` bucket (ladder.css:154) is **retired as the strength driver**.
  So the pass-3 "source = bright-bucket ? ink : bias-hue" boolean has no live bucket to switch on — re-derive
  (§3.5.3).
- **M6 dead-token reality (CORRECTED, verified on disk):** `--glass-saturate-deep-ceiling` READ 6× by
  proof:glass-legibility → **KEEP**; `--glass-warm-zero` absent → **DROP**; `--glass-spine-blur`/`-opacity`
  test-pinned → **follow-up**. Confirmed-dead-and-deletable: `--cartoon-cast-dx`/`-dy` @property + `cards.css`
  transition legs (no driver), `scripts/tmp-glass-rest.mjs`, the a11y-fallback.css:213-227 **5 rung blocks ONLY**
  (KEEP line 228/229 `.glass-btn { background: var(--glass-bg-wash) }` — a real webkit override).
- **M9 reality (CORRECTED):** `liquid-morph.css` (850L) live rules `.liquid-pill`/`.liquid-stage` have ZERO src
  consumers (demo-only). `liquid-enter.css` IS `@import`-ed at glass.css:73 (the universal `.liquid-enter` mount
  recipe) → **the pass-3 "delete liquid-enter (verify 0 consumers)" is BLOCKED** unless `.liquid-enter` has zero
  element consumers; verify before claiming. M9 = WHOLE-rehome liquid-morph to `demo/` (KISS — collapses the >500
  split + the demo-in-src smell + the dead-ambient-CSS-reader into ONE move).

---

## 3 · MECHANISM (the idiomatic approach — pass-4 frontier resolutions)

### 3.1 · The maroon ink — in-gamut warm brown (M1, field-independent) — UNCHANGED + the dark-arm DEFAULT
The proven primary pin (cartoon-punch register, prototype-green):
```css
/* shadow.css :root */
--cartoon-ink: oklch(from var(--foreground) clamp(0.28, l, 0.34) clamp(0.030, c, 0.050) h);
```
- **★ Dark-arm DEFAULT = (A) DRY-collapse** (pass-4 decision, was 50/50 in pass-3). Delete the dark
  `--cartoon-ink:` re-declaration (dark-arm.css:177) so the `:root` pin cascades via the dark `--foreground` (→
  `oklch(0.34, 0.030, ~75) → rgb~(74,60,48)`, in-gamut warm brown). **Rationale:** (i) it IS the re-pasted-idiom
  kill this workstream's brief names; (ii) the risk margin favors it (contact-over-dark R−B ≈ 9–14, safe — vs form
  (B)'s darker sticker at R−B ≈ 5, the GPU-AA/quantization noise floor). **The dark cast lightens L 0.20→0.34 — a
  materially lighter sticker that owes a paint sign-off (§7).** The prototype CAPTURES BOTH (A) and (B) so the
  human signs off with evidence; if (A) reads too pale, fall back to **(B) per-mode lower-L** (`clamp(0.16, l, 0.20)
  clamp(0.018, c, 0.025) h`, the BD-golden-restoring form — a recorded per-mode pair, NOT a re-paste).
- Re-derive EACH `@supports not (color: oklch(from …))` fallback literal from its mode's PAINTED pixel (drop the
  `#4a3320`/`#5a3f28` assumption — the painted L floors below nominal, FINDING A). Rewrite the false
  `max(c,0.11)`/gamut-necessity comments (it is a chroma-vs-darkness DESIGN choice).
- PRT / `prefers-contrast: more` arms deepen via ALPHA (32→42%), NEVER chroma. **AND fold the byte-identical
  shadow.css:213-220 / 221-228 contrast arms into one comma-joined `@media (prefers-contrast: more),
  (prefers-reduced-transparency: reduce)`** (a DRY dup pass-3 missed; KISS-flagged).
- **Gate (`proof:no-gray`, NEW `cartoon-ink-warm-in-gamut` witness, born-RED, DEVICE-FREE):** reuse
  `oklchToRgb`/`relativeOklchFrom`/`rgbToOklab` + a NEW `clamp(L)`+`max-or-clamp(C)`-aware parser (the current
  `darkTintLiftL` only matches bare-numeric L). Born-RED on HEAD's `rgb(49,0,0)` light AND `rgb(51,1,0)` dark →
  GREEN on the pin, BOTH source-foregrounds; assert **R>G>B>0 + warm-hue 50-70°** (NOT chroma≥floor — the
  chronic-breaker that produced BOTH the maroon AND the metallic saturate).
- **π (REAL box-shadow render, not a canvas-fill model):** `getImageData` on an element painting
  `box-shadow: var(--shadow-cartoon-md/-lg)` over white AND dark (field-independent, NOW), real-GPU Chrome — R>G>B>0
  + warm-hue, all 3 rungs, both modes. Highest-alpha-over-highest-contrast (lead@32% over field, R−B≈28) is
  BLOCKING; contact@18%-over-white (R−B≈4) and over-dark (R−B≈5–14) are ADVISORY (GPU-AA-flippable). Manual
  real-macOS-Safari sign-off OUT of CI. Sequence M1 ≤ M2.

### 3.2 · The dock cast — delete the dead mechanism + the wedge (M2, field-independent) — UNCHANGED
- Delete `shape.css` 208-249 wholesale (the `.cartoon-cast` block + `[data-punching]` deepen + the W3C-dead kinetic
  travel + the cast PRM block) AND `GlassDock.vue:606` `<span class="cartoon-cast">` — atomically (no orphan
  `--dock-punch-stretch` reader survives except the KEPT press-squash scale-channel + its driver).
- ADD the dock-scope PRM carve `.glass-dock { @media (prefers-reduced-motion: reduce) { --motion-weight: 0 } }`;
  post-build `getComputedStyle`-confirm it computes `0` on `.glass-dock` under emulated reduce **in the concatenated
  `@layer components` bundle** (a later dock partial re-declaring `--motion-weight` clobbers it by cascade order).
- Dock elevation = `--shadow-dock` (neutral omni drop, in-gamut, escapes the radius) + `--glass-key` rim — both
  KEPT. **Do NOT add a "soft ambient replacement"** — `--shadow-dock` already IS it. The flare → W-GLASS-DYNAMICS
  (DELETE-first, decided on paint).
- The global `.cartoon-cast` Card rule (cards.css:359 — the `<Card surface="cartoon">` consumer) KEEPS its cast; M1
  de-maroons it. Maroon claim SCOPED to the dock PLATE (control/button/chip casts stay maroon until M1 lands).

### 3.3 · The clip discipline — Job B on a NARROWED selector (M3, field-independent) — PASS-4 SCOPE NARROWED
**The matrix settled Job A native on modern Chrome; the wave's REAL fix is Job B (descendant bleed).** Pass-4
narrows the clip selector against the verified group blast:

- **Job A** — the host's OWN `backdrop-filter` corner. Native-clips on modern Chrome (matrix-proven). No primitive
  needed on Chrome; owe the WebKit-bug-158483 version-grounding (by version, NOT UA) on real Safari.
- **★ Job B — mint `contain: paint` on a NARROWED content/dock selector, NOT the full `.glass-material` group.**
  The verified group (material.css:36-47) enrolls `.glass-floating`/`.glass-overlay` (reka Dialog/Popover/Sheet/
  Command/HoverCard — DialogContent/PopoverContent compose `.glass-floating`) AND the 4 dock controls +
  `.glass-specular-track`. A group `contain:paint` would clip a PopperArrow/submenu that paints outside the content
  border-box (near-certain per R-M3-BLAST-OVERLAY). **Default selector = the CONTENT/card tiers + `.glass-card`
  (`.glass-wash, .glass-quiet, .glass-resting, .glass-card` + the bare `.glass-material` atom) + the 4 dock
  controls** (which ALREADY run `contain:paint` on the shell via `--dock-control-safe-inset` clearance — so the
  control-element containment is the same primitive in use nearby). **EXCLUDE `.glass-floating`/`.glass-overlay`.**
  The overlay band's re-inclusion is DECIDED by the Job-B matrix cell (below) — re-included ONLY if the matrix
  proves a real Popper arrow survives `contain:paint` on both engines.
- **Retire the per-class dialects INTO the narrowed selector:** `.glass-card`'s `contain: layout style paint`
  (surfaces.css:34 — narrow to `contain: paint`, dropping the `layout` containing-block that would clip poppers
  nested in a card) and `.glass-chip`'s `isolation: isolate` (glass-chip.css:69). Prove the `.glass-chip`
  `plus-lighter` bloom survives the clip on real GPU (KEEP + scope-out only if it regresses).
- **THE MISSING MATRIX CELL (the #1 owed — build it):** a full-bleed/over-corner child (full-bleed image AND a
  nested glass `<Button>` with its OWN `backdrop-filter`) inside a radius `.glass-resting` Card, parent WITH vs
  WITHOUT `contain:paint`; AND a `.glass-floating` Dialog/Popover WITH a real PopperArrow, parent ±contain:paint —
  on real GPU **both engines**. Decides (a) does contain:paint clip the descendant to the radius? (b) does it clip
  the arrow? → the overlay-band include/exclude + the primitive choice. **ADD a concentric-radius cell** (reference
  f018: a nested inner row clips to ITS smaller radius inside the outer panel — the iOS idiom the containment must
  preserve).
- **`overflow: hidden` FORBIDDEN** (clips focus ring + specular bleed). `contain: paint` clips DESCENDANTS only —
  the host's own rim/drop-shadow/focus-ring paints from the box and escapes correctly.
- **Gate (`proof:glass-clip`, NEW, device-free `ci`, born-RED):** assert the narrowed selector carries
  `contain:paint` on the BUILT dist (**lightningcss-form-aware: assert the `contain:paint` substring** — verified
  it emits clean as `contain: paint`, NOT `content`; the spec's prior `content`-collapse assumption is wrong) AND
  the per-class `contain`/`isolation` are RETIRED. The radius+clean-corner assertion lives in the LIVE π (a
  stylesheet scan cannot see the composed `rounded-card` class list). Carved exemptions: the dock morph aperture
  (`overflow-x:clip; overflow-y:visible`); the `<Card surface="cartoon">` Memphis layer; the excluded overlay band.
  Run `proof:dock-plate-clearance` (the dock-control containment must not re-arm the BA.W-DOCK-GEOMETRY freed
  cross-axis — the 1.1× hover plate + `--dock-control-safe-inset` must still clear) + `proof:nested-backdrop-budget`
  against the BUILT bundle.
- **π (the trap-closer):** the corner on REAL GPU Chrome AND real macOS Safari, both modes, over a busy backdrop,
  on the BUILT route with real `<Card>`/`<Dialog>`/`<Popover>`/`<Button>` + a descendant-over-corner child +
  `::before`/`::after` pseudos present. `getImageData` top-corner = clean arc; descendant does NOT bleed; dock
  bottom-left no wedge. **Reconcile the verdict explicitly:** Job A clips clean on modern Chrome; the visible square
  edge IS Job B + the M2 wedge — NEVER let it read as "no card-corner defect exists."

### 3.4 · The blur peer — SPLIT: token-collapse NOW, saturate PAINT post-WS1 (M4) — PASS-4 SPLIT + M4a
**M4 splits into the field-independent collapse (lands with Phase 1) and the WS1-gated saturate-revert.**

**M4a — the Safari blur literal (NEW, field-INDEPENDENT, the headless-green-trap fix).**
- Author the `-webkit-backdrop-filter` arm as a **resolved LITERAL** (`blur(Npx) saturate(M)`), never `var()`. The
  unprefixed `backdrop-filter: var(--glass-blur-*)` STAYS for modern engines. Two implementation routes (prototype
  decides): (i) **build-injection** — `vite.style-assets.ts` resolves the `--glass-blur-*` token chain to the
  common-case literal (`--glass-level: 1` default) and emits THAT as the webkit arm (it already owns the webkit
  injection; the literal tracks whatever the ladder resolves to AT BUILD); (ii) **source-authored** fixed literals
  on the ladder rungs (web-sota's recommendation — decide at source over brittle build-time var-resolution). The
  `--glass-level: 0` a11y bracket + dark-arm saturate companions cannot be captured by a single literal on the
  webkit arm — that is an ACCEPTED degradation (Safari-with-reduced-transparency is a tiny intersection; the
  unprefixed arm carries the level path on Safari 18+ if it resolves var()).
- **This is value-tracking** — when M4 lands the unified `~8/10` band, the literal re-emits to the new values
  (build-injection makes this automatic). It is field-INDEPENDENT (about Safari resolving the blur token AT ALL,
  over any field) → lands in Phase 1.
- **Gate:** a device-free assert that the BUILT `dist/styles/*.css` `-webkit-backdrop-filter` arms carry a concrete
  `blur(<px>)` literal, NEVER a `var(`. **π:** real-macOS-Safari-26 `getComputedStyle` + a visual capture — the
  4-region self-calibrating differential (bare / literal-blur+tint / var-blur+tint / tint-only) proves the literal
  arm BLURS where the var arm paints flat. OUT of CI.

**M4 — the token collapse + peer lock (field-independent) + the saturate-revert (WS1-gated PAINT).**
- **The 4-file collapse (field-independent — `getComputedStyle` parity, lands with Phase 1):** demote the default
  `<Button>` off `glass-deep` (button/index.ts:30); re-author `.btn-glass` (surfaces.css:188) to read
  `--glass-blur-resting` directly; collapse the dock `--dock-surface-blur` alias onto `--glass-blur-resting` (fix
  the shell.css:17 fallback so retiring `--glass-blur-dock` does NOT drop the dock to wash 1px); retire
  `--glass-blur-dock`/`-radius` + `--glass-blur-btn` (→ resting). Keep `wash` (1px) as the distinct content-pane
  near-no-blur tier. `.btn-glass.glass-deep` STAYS as the `:liquid`/hero opt-in.
- Target band `wash 1 / quiet 8 / resting 8 / floating 10 / overlay 10` — passes `proof:glass-cal` with NO
  `BAND_LO` edit (`BAND_LO=8`; `8 >= 8`; in-band DOWN moves free — prototype-proven). Drop below 8 (→6) ONLY if the
  M8 read-carrier (lensing + neutral specular) paint-proves the read holds, with the `BAND_LO` move + a rationale
  note IN THE SAME DIFF.
- **NEW GATE TEETH (the BD-regression lock):** `proof:glass-cal` asserts dock == button == default-Card ==
  menu-item all resolve the **SAME `--glass-blur-resting` TOKEN** (not merely in-band). **The assert must FOLLOW
  the alias indirection** (`.btn-glass` → `--glass-blur-btn` → resting; dock → `--dock-surface-blur` → resting) or
  collapse the aliases so the token-identity is direct — else the gate false-greens. BD silently re-pointed btn to
  floating/deep with no gate to catch it; this is the lock.
- **The saturate-revert `1.4-1.6 → ~1.2` (WS1-gated PAINT, system-identity).** The metallic root: Apple's model
  has NO saturation parameter; the iridescent blue/purple sheen (top-bar.png) is `saturate()` amplifying a non-warm
  field. **The revert cannot be validated until WS1's warm field lands** (the iridescence is field × saturate). Hold
  **dock saturate at exactly 1.2** (the `proof:no-gray` `lightDockSat ≥ 1.2` floor); the unified plate tint becomes
  the PRIMARY anti-gray, saturate 1.2 secondary. Lift dark-resting saturate/brightness in lockstep BEFORE retiring
  `--glass-saturate-dock`. Lowering deep 1.8→1.6 is OPTIONAL (only if revert-paint shows deep metallic).
- **THE ~6-GATE REBASELINE IN-DIFF:** (1) `proof:glass-cal` B3 coupled saturate sites (floating/overlay defaults,
  the literal, dark-dock, the deep-ceiling fence) to the reverted VALUE regex; (2) `proof:glass-cal` S3 dock-shrink
  re-point off the RETIRED `--glass-blur-dock-radius`; (3) `proof:no-gray` 2 dock witnesses re-pointed (PASS at dock
  1.2); (4) the SAME-token peer assert; (5) `proof:glass-cohesion`/`proof:adaptive-glass` (the demoted Button + dock
  still route a glass tier — no opaque regression off the W54 allowlist); (6) the M4a webkit-literal gate.
- **π (saturate-revert gated behind WS1):** dock + Card + Button resolve the SAME `backdrop-filter` blur
  (`getComputedStyle` parity + the SAME-token gate), ladder calmer, field structure reads through, the iridescence
  (top-bar.png) resolves to neutral-frosted (f036), demoted surfaces still read as glass (lensing+specular), both
  modes, both engines.

### 3.5 · The tint unify — TWO surface pairs + ONE clamped input bias (M5, atomic, WS1-gated) — SOURCE RE-DERIVED
**End state: ≤2 chromatic SURFACE pairs** — PLATE `--glass-tint-source`/`-strength` (neutral legibility-darken) +
RIM `--glass-accent`/`-strength` (data-hue) — **+ ONE HEAVILY-CLAMPED INPUT bias** `--glass-tint-bias-hue`/
`-strength` (the renamed `--glass-ambient-*`; the observer's write target that FEEDS the plate, NOT a third surface
paint pair). **Lands as ONE atomic diff or not at all.** The reference fence binds: the resting plate is neutral;
the input bias is a sub-perceptual whisper, never a chromatic plate tint (f006 — the plate does not take the
wallpaper hue).

1. **The writers write the INPUT BIAS, not the plate source directly (the FALSIFICATION fix — UNCHANGED).** Every
   content-tier surface re-declares `--glass-tint-source: var(--glass-tint-ink)` on itself (ladder.css 154/213/275
   + a11y-fallback.css:36 + adaptive-legibility.css:47/76 — the falsification list WIDENED per codebase-deep), so
   an ancestor write is clobbered. `useBloomUp.ts:340/343` + `useGlassBackdropLuminance.ts:448` write
   `--glass-tint-bias-hue`/`-strength` (the renamed inherited `@property`). **Release via `removeProperty`, not
   set-`0%`** (the `@property` initial IS `0%` → a no-op set). `useGlassBackdropLuminance.ts:448` is the SAME
   function WS1 retires/rewires — **ONE owner, ONE coordinated WS1+WS3 diff, M5 strictly AFTER WS1** (§7 R-WS1).
2. **Fold `--glass-fill-tint`/`-strength`** (Badge/SelectableChip/IconChip/glass-atom/glass-chip) onto the plate
   pair, preserving the asymmetry (glass-atom reads STRENGTH, glass-chip reads HUE). Requires the 3 design sign-offs
   (§7): Badge data-hue activation, the rest-warmth delta (deleted `--glass-atom-tinted` warm-amber-at-rest),
   SelectableChip dilution sub-perceptual.
3. **★ THE SOURCE RULE — RE-DERIVED against the CONTINUOUS-luma architecture (the pass-4 correction).** Pass-3
   gated the bias-hue on the binary `@container` bucket; that bucket is RETIRED as the strength driver
   (ladder.css:275–293 is now a continuous `--glass-backdrop-luma` clamp). **The fresh formulation:** the
   content-tier `:where()` rule composes the bias INTO the ink source weighted by INVERSE luma — the bias hue tints
   the source only where the plate is NOT earning the AA darken (low luma = calm field = the bias whisper shows;
   high luma = bright backdrop = the source rotates to the warm ink, AA wins). Concretely, instead of a boolean:
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
   unchanged). At the `0%`/`transparent` rest the mix is byte-identical to today (`color-mix(…, X, transparent 0%)
   ≡ X`). **This needs a `getImageData` paint proof post-WS1** (the write-proven≠paint-proven gap that killed the
   ambient path); design-proven NOW (Prototype P5).
4. **THE DRY INNER/OUTER FACTOR — declare ONCE.** The 17 live `color-mix(in oklab, var(--glass-bg-…), …)` plate
   pastes must NOT bloat into 17 double-nested mixes. **Pull the pure `--glass-plate-tinted` recipe (the inner+outer
   compose with NO bias leg) into a FIELD-INDEPENDENT M6-adjacent landing FIRST** (KISS rec — factoring the 17
   pastes is field-independent; doing it first shrinks M5's atomic diff to ONLY adding the bias outer-leg in ONE
   place). The inner invariant is the FULL W55 CONTINUOUS luma-driven strength (NOT a flat 4% floor).
5. **Rebuild the clamp FRESH on WS1's LIVE scope.** The `--paper-field-warm` skip-guard + `min(…,8%)` clamp live on
   the DEAD `[data-paper-field]` attr scope (verified — nothing sets the attr). When WS1 lands its field, build the
   combined-hue clamp FRESH on WS1's actual live scope and PROVE no over-rotation past `WARM_HUE_HI` across ALL
   section-accents (a violet/teal accent + warm bias must not over-rotate).
6. **Close the substitution trap — M5a (Phase 1, the ONE bindable-NOW MECHANISM proof).** `.liquid-pill` reads
   pre-composed `--glass-bg-floating` raw (liquid-morph.css:104) → compose the rung CLASS (the ladder element-level
   `color-mix`, the `.liquid-sheet:281` form). **★ PASS-4 RECLASSIFICATION:** `.liquid-pill` is DEMO-ONLY
   (liquid-playground.vue) — the shipped `<Card>` composes `.glass-resting` which ALREADY does the element-level
   mix. So M5a is a **demo-surface MECHANISM proof + the bias-channel paint-validator, NOT a user-facing dock fix.**
   Keep it Phase 1 (the only paintable substitution evidence pre-WS1) but do NOT claim it fixes a visible defect.
   `getImageData` `[data-testid=liquid-pill]` at rest (byte-identical) AND mid-bloom (the warm hue paints).
7. **Delete the `--glass-ambient-*`/`--glass-fill-*` @property regs LAST**, behind a born-RED bite. The
   `--glass-ambient-*` → `--glass-tint-bias-*` rename carries the @property registration (kept INHERITED).
8. **Re-point `proof:glass-foundation` A1 — CONCRETE.** KEEP the bias-write assert + ADD a
   surface-composes-the-mix wiring assert (the content-tier `:where()` rule composes the bias into
   `--glass-tint-source`) + ADD a `getImageData` paint bite. The `useBloomUp.test.ts` `8.000%` asserts move to the
   bias token.
- **★ ≤2-PAIRS RATIFICATION (for the orchestrator):** **2 SURFACE pairs (plate, rim) + 1 named, HEAVILY-CLAMPED
  INPUT bias.** The luminance bucket (`--glass-backdrop`/`-luma`) is a darken TRIGGER, not a chromatic paint pair
  (excluded from the count). The fold is a union of existing axes (fill-tint→plate, ambient→bias-rename), NOT a new
  third paint pair — DRY-clean. The reference fence makes the input-bias a sub-perceptual whisper (color is DATA;
  the resting plate stays neutral). Confirm this satisfies the brief's "≤2 chromatic tint token-pairs" + "zero
  inert axes" (ambient is NOT inert — `useBloomUp` writes it via `setProperty`; CSS-grep is blind — so the unify is
  a behavior-preserving RE-POINT, never a delete).
- **π (gated behind WS1):** every read axis WRITTEN (computed-style proven, NOT grep); the bloom proven LIVE by
  `getImageData` on a real bloomed `.liquid-pill`; chips paint their data hue; both modes, both engines.

### 3.6 · DRY + dead-token delete (M6) and the demo rehome (M9) — PASS-4 CORRECTIONS
- **M6 (corrected):** `--glass-tint-floor` one home (the 12%/15% per-mode pair — note the live token is
  `--glass-tint-strength-floor`; reconcile the framing, do not conflate); `.glass-press-squash`/`--press-squash`
  (kills 3 pastes, PRM-zeroed via `--motion-weight: 0`); `.loud` composed; the shadow.css:213-220/221-228 contrast
  arms collapsed to one comma-`@media`. **DROP `--glass-warm-zero` (does not exist at HEAD).** **KEEP
  `--glass-saturate-deep-ceiling` (read 6× by proof:glass-legibility L4).** `--glass-spine-blur`/`-opacity` are a
  **coordination follow-up** (test-pinned), NOT a CSS-only delete. **DELETE the pure-redundant a11y-fallback.css:
  213-227 GUARD-2 — the 5 rung blocks ONLY (KEEP line 228/229 `.glass-btn`).** Delete `--cartoon-cast-dx`/`-dy`
  @property + the dead `cards.css` legs (no driver — delete reg+readers atomically). Inline-and-delete
  single-consumer `--glass-bg-clear`. KEEP `--glass-saturate-deep`, `--glass-spine-vignette`/`-border`,
  `--glass-bg-dock` (LIVE via comma-fallback). Boundary: A-deadcode owns the radius/spring dead tokens +
  `useLiquidMorph.ts` (the 0-consumer TS half — confirmed dead, but A-deadcode's `BG.W-DEADCODE-CUT` owns it).
- **M9 (corrected):** **WHOLE-rehome `glass/liquid-morph.css` (850L) to `demo/`** (KISS — its live rules
  `.liquid-pill`/`.liquid-stage` have ZERO src consumers; the rehome collapses the >500 split + the demo-in-src
  smell + the dead-ambient-CSS-reader into ONE move; after it, the `--glass-ambient-*`/`--glass-tint-bias-*` axis
  has NO library CSS reader — a pure JS-write → `:where()`-rule bias bridge). Any genuine library rule moves to
  `dock/morph.css`/`material.css`. **`liquid-enter.css` delete is BLOCKED** (it IS `@import`-ed at glass.css:73 —
  the universal `.liquid-enter` mount recipe; verify zero `.liquid-enter` ELEMENT consumers before any delete, else
  KEEP). Delete `scripts/tmp-glass-rest.mjs`. SEQUENCE LAST; M9 strictly AFTER WS1 (the same-function
  `useGlassBackdropLuminance.ts:448` collision); the bias→plate re-homes onto WS1's live field scope (§3.5.5).

### 3.7 · Dynamics — lensing + NEUTRAL specular carry the read at lower blur (M8, WS1-gated) — UNCHANGED + fence
- Strengthen W-LENSING squircle refraction + the NEUTRAL specular hairline — the read-carrier at the calmer blur.
  **The specular hairline (NOT the SVG displacement) carries the Safari glass read** (lensing rides `@supports
  (backdrop-filter: url(#…))`, dead on Safari per WebKit 245510). **REFERENCE FENCE:** keep the resting body
  specular NEUTRAL/achromatic (`~rgb(78,78,78)`, the Siri pill-body register); reserve the PRISMATIC cool→white→
  warm edge dispersion for WS6's active/motion edge ONLY — chromatic-dispersing the resting hairline IS the
  metallic over-correction. **M8's calmer-blur paint sign-off is READ-CARRIER-gated** — capture must prove the
  demoted dock/Button STILL read as glass via the rim+lensing (sequence M4's saturate paint AFTER/WITH M8's rim,
  not before — demoting blur without the rim risks a flat plate).
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
- `src/styles/tokens/shadow.css` — `--cartoon-ink` → the in-gamut pin; re-derive the fallback; collapse the
  contrast arms to one comma-`@media` (M1).
- `src/styles/tokens/dark-arm.css` — dark arm = **(A) delete the re-declaration** (default), or (B) per-mode
  lower-L per the §7 sign-off (M1).
- `src/styles/dock/shape.css` — delete 208-249 (cast + dead travel + cast PRM); add the dock-scope PRM
  `--motion-weight: 0` (M2).
- `src/components/custom/dock/GlassDock.vue` — delete `<span class="cartoon-cast">` (M2, line 606).
- `src/styles/glass/material.css` (or `surfaces.css`) — mint Job-B `contain: paint` on the **NARROWED content/dock
  selector** (M3) — NOT the full group; EXCLUDE the overlay band by default.
- `src/styles/glass/surfaces.css` — retire `.glass-card` `contain: layout style paint` → `contain: paint` into the
  narrowed selector (M3, line 34).
- `src/styles/glass/glass-chip.css` — retire the standalone `isolation` (M3, line 69).
- `vite.style-assets.ts` — emit the `-webkit-backdrop-filter` arm as a resolved LITERAL, never `var()` (M4a).
- `src/styles/glass/liquid-morph.css` — `.liquid-pill:104` raw → element-level `color-mix` (M5a).
- `scripts/proof-no-gray.mjs` — the `cartoon-ink-warm-in-gamut` witness, light+dark, clamp-aware parser (M1, born-RED).
- `scripts/proof-glass-clip.mjs` (NEW) — the Job-B narrowed-selector gate, lightningcss-`contain:paint`-aware (M3).
- A device-free assert that the BUILT webkit arms carry a `blur(<px>)` literal, never `var(` (M4a).
- `tests-visual/glass-standardization.spec.ts` (NEW) — the cast `getImageData` (M1) + the `.liquid-pill` rest/bloom
  arm (M5a); enroll in webkit testMatch.
- `tests-visual/glass-clip.spec.ts` (NEW) — the corner-arc + descendant-bleed + dock-no-wedge + Popper-arrow π (M3).
- `tests-visual/playwright.config.ts` — enroll the 2 new specs in the `webkit` testMatch allowlist.

**Phase 2 (token-collapse field-independent; saturate-revert WS1-gated):**
- `src/styles/tokens/glass.css` — the blur-peer band; retire `--glass-blur-dock`/`-btn`/`--glass-saturate-dock`;
  the saturate-revert (WS1-gated); rename `--glass-ambient-*` → `--glass-tint-bias-*` (kept @property), delete
  `--glass-fill-*` @property regs LAST (M4/M5).
- `src/components/ui/button/index.ts` — demote the default Button off `glass-deep` (M4, line 30).
- `src/styles/glass/surfaces.css` — re-author `.btn-glass` (line 188) to read `--glass-blur-resting` (M4).
- `src/styles/dock/shell.css` — `--dock-surface-blur` → `--glass-blur-resting`; fix the wash-1px fallback (M4, line 17).
- `src/styles/tokens/dark-arm.css` — lift dark-resting saturate/brightness BEFORE retiring `--glass-saturate-dock` (M4).
- `src/styles/glass/ladder.css` — the DRY `--glass-plate-tinted` recipe (field-independent, M5.4 — land FIRST); the
  content-tier `:where()` continuous-luma SOURCE rule composing the bias (M5.3, WS1-gated).
- `scripts/proof-glass-cal.mjs` — the ~6-gate rebaseline + the dock==button==Card SAME-token assert (alias-following) (M4).
- `src/composables/motion/useBloomUp.ts` — re-point writers to the bias channel; `removeProperty` release (M5, 340/343/349).
- `src/composables/glass/useGlassBackdropLuminance.ts` — re-point to the bias channel (M5, line 448) — **WS1 co-owner.**
- `scripts/proof-glass-foundation.mjs` — A1 = bias-write + composes-the-mix + a getImageData paint bite (M5).
- `tests/composables/motion/useBloomUp.test.ts` — the `8.000%` asserts move to the bias token (M5).

**Phase 3:** the consumer folds (Badge/SelectableChip/IconChip/feedback-tone/accent-tone); the M8 dynamics JS; the
M9 WHOLE-rehome of liquid-morph to `demo/` + the dead-file deletes (`scripts/tmp-glass-rest.mjs`; `liquid-enter.css`
ONLY if zero `.liquid-enter` element consumers).

---

## 5 · WAVE BREAKDOWN (pass-4 — Phase 1 grows M4a; M4 splits)

### Phase 1 — the visible D3 fixes + the Safari trap (field-INDEPENDENT, land + real-paint-verify NOW)
- **BG.W-CARTOON-INK-GAMUT (M1)** — the in-gamut pin; dark-arm (A) default with the sign-off captures; the
  device-free witness (light+dark) born-RED → GREEN; the real-box-shadow `getImageData` π. Sequence M1 ≤ M2.
- **BG.W-DOCK-CAST-RETIRE (M2)** — delete shape.css 208-249 + GlassDock.vue:606 atomically; the dock-scope PRM
  carve; the dock bottom-left no-wedge π.
- **BG.W-GLASS-CLIP-DISCIPLINE (M3, NARROWED to Job B + the overlay-band exclusion)** — mint `contain:paint` on the
  content/dock selector; retire the per-class dialects; **run the MISSING Job-B + Popper-arrow + concentric matrix
  cell** (decides the overlay-band include/exclude); `proof:glass-clip` born-RED; the corner-arc π.
- **BG.W-SAFARI-BLUR-LITERAL (M4a, NEW)** — emit the `-webkit-backdrop-filter` arm as a resolved LITERAL; the
  device-free no-`var(` assert; the real-Safari-26 4-region differential π (OUT of CI). The headless-green-trap fix.
- **BG.W-GLASS-TINT-UNIFY rider — M5a (the substitution MECHANISM proof, demo-surface, bindable NOW)** — the
  `.liquid-pill` element-level `color-mix`; `getImageData` rest/bloom. NOT a user-facing fix.

### Phase 2 — the architectural collapse (token-collapse with Phase 1; saturate + tint WS1-gated)
- **BG.W-GLASS-BLUR-PEER (M4)** — the 4-file token-collapse + the SAME-token peer lock (alias-following) + the
  ~6-gate rebaseline (field-independent, lands with Phase 1); the saturate-revert 1.4-1.6 → 1.2 (WS1-gated PAINT,
  system-identity sign-off); dock held at 1.2. The one-material `getComputedStyle`-parity π (saturate paint behind
  WS1).
- **BG.W-GLASS-IDIOM-FACTOR (M6, the field-independent DRY arm)** — the `--glass-plate-tinted` recipe (land FIRST,
  shrinks M5); the corrected dead-token deletes (KEEP deep-ceiling; drop warm-zero; spine = follow-up); the
  press-squash/`.loud`/contrast-arm DRY.
- **BG.W-GLASS-TINT-UNIFY (M5, ONE atomic diff, WS1-gated)** — the continuous-luma SOURCE rule (RE-DERIVED); the
  bias INPUT channel; fold fill-tint; the FRESH clamp on WS1's scope; the @property delete LAST; `proof:glass-
  foundation` A1 concrete. Sign-offs first (Badge data-hue, rest-warmth, SelectableChip dilution).

### Phase 3 — consumer + recalibration + cleanup (depends on Phase 2 + WS1)
- **BG.W-GLASS-CONSUMER-BAND (M5c)** · **BG.W-DOCK-LEGIBILITY-RECAL + W-GLASS-DYNAMICS (M8)** · **BG.W-DEMO-STYLE-
  REHOME (M9, WHOLE-rehome, SEQUENCE LAST)** — as pass-3 §5, with the M8 reference fence (neutral resting specular)
  and the M9 whole-rehome correction.

---

## 6 · ACCEPTANCE / REAL-PAINT-π BAR (the cardinal bar — pass-4)

Device-free gates passing is NOT the bar. COLOR π = `getImageData`; BLUR-radius π = `getComputedStyle`. The binding
Safari sign-off is a SEPARATE manual real-macOS-Safari capture, OUT of CI.

1. **Warm-brown cast** — composited cast (REAL `box-shadow`) over white + warm field + dark = R>G>B, B>0, NOT
   `rgb(N,0,0)`, warm-hue 50-70°, both modes, both engines. `proof:no-gray` cartoon-ink witness (device-free,
   light+dark) green. **Field-independent — NOW.**
2. **Clean clip (Job B)** — the narrowed content/dock selector resolves `contain:paint` (dist `contain:paint`
   substring); top-corner `getImageData` over a busy backdrop = clean arc; a descendant-over-corner child does NOT
   bleed; a nested inner glass clips to its concentric radius; dock bottom-left no wedge; **a real Popper arrow +
   focus ring + paper cast survive** (the overlay-band exclusion verified). `proof:glass-clip` green + the real-GPU/
   Safari π. **Field-independent — NOW.**
3. **Safari BLURS (M4a)** — the BUILT `-webkit-backdrop-filter` arms carry a `blur(<px>)` literal (no `var(`); on
   real macOS Safari 26 the literal-blur region BLURS where the var region paints flat (the 4-region differential).
   **Field-independent — NOW (the live headless-green-trap fix).**
4. **`.liquid-pill` substitution closed (M5a)** — `getImageData` byte-identical at rest, warm hue at mid-bloom;
   `buildPassed=true`. The MECHANISM proof (demo-surface, not a user-facing fix). **Field-independent — NOW.**
5. **Dock PRM** — `getComputedStyle` confirms `--motion-weight: 0` on `.glass-dock` under emulated reduce in the
   concatenated bundle. **Field-independent — NOW.**
6. **Token peer lock (M4, field-independent arm)** — dock == button == default-Card == menu-item resolve the SAME
   `--glass-blur-resting` (`getComputedStyle` parity + the alias-following SAME-token gate). **Field-independent —
   NOW** (the saturate-revert paint is item 7).
7. **ONE material (M4 saturate + M5)** — one frame: dock + Card + Button as ONE glass material over the WS1 field;
   SAME blur, SAME plate tint (`getImageData` ΔE band), field structure reads through; the iridescence resolves to
   neutral-frosted (f036); demoted surfaces read as glass on Safari. Both modes, both engines. **Gated behind WS1.**
8. **≤2 chromatic surface pairs + 1 clamped input bias** — exactly 2 `(hue,strength)` SURFACE pairs (plate, rim) +
   1 labeled, heavily-clamped INPUT bias; every read axis WRITTEN (computed-style proven, NOT grep); the bloom
   proven LIVE by `getImageData`; chips paint their data hue; the resting plate stays neutral (color is DATA).
   **Gated behind WS1.**
9. **DRY + dead-free** — each idiom once (the `--glass-plate-tinted` recipe ONE home); zero dead tokens/@property
   (KEEP deep-ceiling; warm-zero phantom dropped); `profile:budget` + `proof:css-critical` net-negative or flat.
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
  - **Dark-cast lightness (M1)** — (A) DRY-collapse (the pass-4 default) raises the dark cast L 0.20→0.34. The
    prototype captures BOTH (A) and (B); sign off the lighter (A) cast OR adopt (B) per-mode lower-L.
  - **Content saturate-revert 1.4-1.6 → 1.2 (M4)** — PAINT sign-off over WS1's warm field (the iridescence is
    field × saturate); not gate-green.
  - **The 3 net-new-behavior tint folds (M5)** — Badge `data-hue` activation, the rest-warmth delta, SelectableChip
    dilution sub-perceptual.
- **The binding real-macOS-Safari `getImageData` captures (×6)** — OUT of CI: the warm-brown cast (M1), Job-A/Job-B
  + Popper-arrow corners (M3), **the M4a webkit-literal-blur resolution (the headline — verifies the fix, no longer
  decides the mechanism)**, the one-material frame (M4/M5). Bundled WebKit is a PROXY, non-binding.
- **`--glass-depth` lerp / deep saturate 1.8 (BB.W-DEEP-GLASS fence) / `--surface-tint-*` in srgb (AW.W26) /
  getImageData-only color-π / the in-oklab glass-tint axis** — SETTLED fences, do NOT re-litigate.
- **Radius/spring dead tokens, `useLiquidMorph.ts` TS half (0-consumer)** — A-deadcode's `BG.W-DEADCODE-CUT`/
  `BG.W-DEAD-TOKEN-SWEEP`; WS3 owns the CSS half only.
- **The chronic-breaker gate** (a chroma-floored token's resolved hue + gamut AT its actual L — produced BOTH the
  maroon AND the metallic saturate) — the `cartoon-ink-warm-in-gamut` witness is the FIRST instance; the general
  predicate surfaces to WS7.
- **The dock morph-blur ramp** (the user's "dock blurry too long") — WS2's dock-morph domain, NOT the static-radius
  peer M4 owns. Flag to WS2.

---

## 8 · OPEN RISKS (the falsification frontier — pass-4)

- **R-CLIP-JOBB (HIGH, the #1 owed) — the Job-B + Popper-arrow + concentric matrix cell was NEVER run.** Decides
  the narrowed selector + the overlay-band include/exclude + whether `contain:paint` is the cross-engine primitive.
  If Safari cannot clip a nested `backdrop-filter` descendant to the ancestor radius (the standing WebKit bug
  class), Job B has NO cross-engine `contain` fix on Safari and needs a different mechanism (descendant self-clip,
  or documented Chrome-only). Build + run before close — do NOT close M3 on Chrome alone. (Prototype P1.)
- **R-SAFARI-BLUR (SETTLED in MECHANISM, OWED in VERIFICATION) — `var()` is broken in `-webkit-backdrop-filter`
  (MDN #25914); the fix is the literal arm (M4a).** The OPEN residual: does the unprefixed `backdrop-filter: var()`
  carry the blur on Safari 18-26 DESPITE the invalid webkit alias (engine-specific)? The literal arm is the
  no-regression fix regardless; the real-Safari-26 capture verifies it. The live headless-green trap at HEAD.
  (Prototype P4.)
- **R-M5-SOURCE-STALE (HIGH, pass-4 finding) — the SOURCE rule is keyed to a RETIRED binary bucket.**
  ladder.css:275 made the content-tier strength a continuous `--glass-backdrop-luma` clamp; there is no boolean for
  the bias-hue to win against. The re-derived inverse-luma-weighted mix (§3.5.3) must be design-proven against the
  live architecture AND paint-proven post-WS1 (the write-proven≠paint-proven gap that killed the ambient path).
  (Prototype P5.)
- **R-M4-FILES (MED, pass-4 correction) — M4 is a 4-file collapse with alias indirection, not a one-line demote.**
  `.btn-glass` reads `--glass-blur-btn` (→ floating 13, not resting 8 after demote); the dock reads
  `--dock-surface-blur` (→ wash 1px fallback trap). The SAME-token peer gate must FOLLOW the aliases or false-green.
  surfaces.css + shell.css are in M4's file set. (Prototype P3.)
- **R-WS1 (HIGH) — M5/M9 EDIT the function WS1 retires + the clamp scope is DEAD.** Designate ONE owner; M5/M9
  strictly AFTER WS1 lands paint-stable.
- **R-SAT-REVERT (HIGH) — the saturate-revert reds ~6 coupled gate sites AND is a system-identity decision.**
  Rebaseline IN-DIFF; hold dock at 1.2; the revert needs PAINT sign-off over the field (the metallic root is field
  × saturate — unvalidatable until WS1 lands).
- **R-DEAD-TOKEN-FALSE (MED, pass-4 correction) — 3 M6 delete-claims are wrong.** KEEP `--glass-saturate-deep-
  ceiling` (proof:glass-legibility L4 reads it 6×); DROP `--glass-warm-zero` (absent); `--glass-spine-blur` is a
  test-coordination follow-up. Re-run a reader census at landing for every delete candidate.
- **R-DARK-IDENTITY (MED) — the M1 dark-arm (A) DRY-collapse lightens the dark cast L 0.20→0.34.** The pass-4
  default; sign off or adopt (B). Both are in-gamut warm brown.
- **R-BLAST (MED→LOW after the pass-4 narrowing) — the M3 clip on the dock controls re-arms the BA.W-DOCK-GEOMETRY
  freed cross-axis?** The narrowing excludes the overlay band; the dock controls already run `contain:paint` on the
  shell. Run `proof:dock-plate-clearance` + the matrix against the BUILT bundle.
- **R-FINDING-A (LOW, prototype-PROVEN) — the cast pixel floors lower than nominal.** The bar is structural
  warm-brown; @18%-over-white is ADVISORY (margin GPU-AA-flippable).
- **R-RESIDUAL (the convergence gate) — the binding cross-engine PAINT is the unmet residual.** Phase-2/3 chromatic
  paint requires WS1's field (not on disk). Phase 1 (M1·M2·M3·M4a·M5a) + the M4 token-collapse are field-independent
  and real-GPU-Chrome-capturable NOW; the real-macOS-Safari sign-offs (×6) are human-gated, OUT of CI. **This loop
  can land + Chrome-verify Phase 1 + queue the human-Safari packet; it CANNOT produce the 6 binding Safari captures
  nor the one-material frame.** Surface honestly.
- **R-SEQUENCE — build the GATES first (born-RED):** `proof:no-gray` cartoon-ink witness (device-free, light+dark);
  `proof:glass-clip` (Job-B narrowed selector, after the matrix); the M4a webkit-literal assert; the `proof:glass-
  cal` ~6-gate rebaseline. Phase 1 + the M4 token-collapse are independent + low-blast (M1 ≤ M2). Phase 2 saturate +
  Phase 3 high-blast gated behind WS1 + the rebaseline. **W-GLASS-TINT-UNIFY lands as ONE atomic diff or not at all.**
