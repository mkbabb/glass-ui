# BG-WS3 · Glass standardization — ONE coherent glass register (pass 1 spec)

> Workstream: BG-WS3-glass-standardization
> Base: `tranche/BG` @ `aaa254c8` (advanced past the audited 4.2.0 `998136bb`; every WS3 defect verified LIVE at HEAD)
> Owns: the unified blur register WS2's dock consumes · the cast/clip/tint architecture
> Couples: WS1 (shell-aurora field — the live-paint precondition + the canvas the dock observer rewires onto) lands FIRST; WS2 (dock) CONSUMES this register
> Cardinal bar: real-paint-verified on real GPU, Chrome AND Safari, both modes. The headless-green/visually-broken trap shipped the maroon + the rect-fringe THREE times because no gate read the composited pixel. Trust the painted pixel, not the token-chain gate.

---

## GESTALT GOAL

Make the dock, buttons, cards, items, and menus read as ONE glass material — the iOS-26/27 "Liquid Glass" single-material discipline, calmer than 4.2.0 so the warm field reads THROUGH every plate. Concretely, hit the iOS reference gestalt (the Siri/home frames at `scratchpad/evidence/frames-2144` & `frames-2207`):

1. **ONE material at varying opacity** — dock pill, content Card, button, menu row all sample the SAME blur and the SAME tint. Not a heavier/special dock; not a 9/13/16px spread; not a per-family tint axis.
2. **Subtle blur, structure survives** — the wallpaper/content behind each plate reads clearly. Calmer than 4.2.0's 8/10/13/13 ladder. The "glass" read comes from edge LENSING + a neutral specular hairline (W-LENSING is already built — lean on it), NOT a heavy Gaussian. Apple itself walked the glass calmer (iOS 26.1 Tinted).
3. **Perfect corner clip** — every `[data-slot=card]` corner is a clean rounded arc; the blurred backdrop raster + all inset pseudos clip to the radius. Zero rectangular fringe. ONE clip dialect on the material, not two.
4. **Soft ambient elevation, ZERO chromatic cast** — a soft omni drop-shadow under each surface; never a hard colored offset "sticker" stamp. No maroon halo, no oxblood wedge at the dock bottom-left. The composited cast over the warm field AND over white resolves a warm BROWN (R>G>B, B>0, never `rgb(N,0,0)`) at both stamp lightnesses, both modes.
5. **ONE chromatic seam** — collapse the five (live: seven) disjoint chromatic tint axes to exactly TWO `(hue,strength)` pairs: `{plate}` (whole-plate legibility/data-hue/ambient) + `{rim}` (per-instance accent glint). Zero inert read axes — every read axis is written.
6. **DRY** — the re-pasted idioms (`color-mix` plate tint ×14, press-squash ×3, warm-zero stop ×5, tint-floor ×2, cartoon-cast rule ×4) declared ONCE. Zero dead tokens/`@property` in the glass cascade.

This satisfies the brief's convergence bar verbatim: a single calm blur scale (dock+card+button peers), ≤2 chromatic tint pairs (zero inert), warm-brown cast both stamp lightnesses both modes, every card resolves the paint-box clip, the re-pasted idioms declared once, zero dead tokens.

---

## MECHANISM (idiomatic, concrete)

### M1 — The maroon root is a gamut-clip, not a hue choice
`src/styles/tokens/shadow.css:107`
`--cartoon-ink: oklch(from var(--foreground) clamp(0.14, l, 0.18) max(c, 0.11) h)`. `--foreground`≈`oklch(0.20 0.0062 56°)`; the `max(c, 0.11)` chroma FLOOR is an ~18× lift; at the clamped L 0.14–0.18 a warm hue (~56°) **cannot hold C0.11 in sRGB** → the engine gamut-maps toward pure red → live raster `rgba(49,0,0)` (G=0,B=0 — the forbidden `rgb(N,0,0)`). Dark arm (`dark-arm.css:177`, `clamp(0.20,1-l,0.30) max(c,0.11)`) → `rgb(51,1,0)`. The `@supports not (oklch from)` FALLBACK `#4a3320` (rgb 74,51,32) is ALREADY the correct in-gamut warm brown — **the primary path is the bug, the fallback is the target.**

The fix is gamut-honest, not a hue change (the warm-hue extraction `oklch(from --foreground … h)` is CORRECT — keep it): replace `max(c, 0.11)` with an L-aware in-gamut chroma — the verified window is `C∈[0.030,0.060]` at `L∈[0.28,0.34]` (the `#4a3320` family ≈ `oklch(0.30 0.045 60)`). Two candidate expressions, both keep the plain per-mode pair (NEVER `light-dark()` — the inset-shadow trap):
- (a) raise the L floor + cap chroma: `oklch(from var(--foreground) clamp(0.28, l, 0.34) clamp(0.030, c, 0.050) h)`, OR
- (b) collapse primary onto the fallback: mix `--foreground` toward `#4a3320` at a fixed strength.
Either lands R>G>B,B>0. This still clears `proof:no-gray` STRONG_FLOOR (0.020) — the `max(c,0.11)` was GRATUITOUS over-chroming (the no-gray cure mis-applied: a 0.11 floor is brown at L0.5, maroon at L0.16). The prefers-contrast/PRT arms deepen the SAME brown via ALPHA (32/26/18 → 42/34/24%), never chroma. **No `--shadow-cartoon-*` reader edits** — every consumer re-resolves. P1 must compute-verify the window in real raster (narrow; eyeballing fails).

### M2 — The dock cast is a paper sticker bolted on glass chrome; retire it from glass, keep it on paper
`GlassDock.vue:606` always renders `<span class="cartoon-cast">`; `dock/shape.css:217` styles it `inset:0; z-index:-1; box-shadow: var(--shadow-cartoon-md)` (a down-LEFT offset stamp sliding further on `[data-punching]`). The dock root carries `contain: layout style paint` (`shell.css:113`, the AY/BB perf restyle-scope) → an offset box-shadow whose whole purpose is to paint OUTSIDE the box is clipped to the rectangular border-box; the dock radius is a 9999px pill → the stamp can only fill the rect-minus-pill corner gap → the hard red wedge bottom-left. **Structurally self-defeating** — even an in-gamut warm-brown cast would wedge there.

The Memphis offset-cast is a PAPER idiom (`<Card surface="cartoon">` has no `contain:paint`, the stamp paints correctly outside). Glass chrome is the iOS-27 NAVIGATION layer — it reads as glass, never a sticker. RETIRE the cast child FROM the glass dock (delete the span + the `dock/shape.css` block incl. the `[data-punching]` deepen + the PRM arm). The dock elevation already reads `--shadow-dock` (`shadow.css:71`, a soft `0 0 20px 14%` omni glow on its OWN box, paints correctly past the pill) + the directional `--glass-key` cel rim (`glass-fx.css:110`, in-gamut). KEEP the cartoon cast on `<Card surface="cartoon">` (the paper register). **Cartoon-technicolor-punch survives on PAPER; the dock's punch re-expresses as a glass light-event** (compositor-only press-squash + specular flare — W-GLASS-DYNAMICS), not a maroon sticker. Retiring the redundant 2nd shadow language leaves ONE coherent lighting model (rim + omni ambient).

### M3 — ONE clip dialect on the material atom
The real `<Card>` composes `glass-${tier}` LADDER rungs (`Card.vue` `surfaceClass` → `.glass-resting`/`.glass-floating`…), and the rungs (`ladder.css:41-121`) + the `.glass-material` group (`material.css:36-47`) carry NO overflow/contain/isolation. Only the convenience `.glass-card` (`surfaces.css:34`, `contain: layout style paint`), `.glass-btn` (`surfaces.css:79`, `contain: paint`), `.glass-chip` (`isolation: isolate`) clip. So the surface users see most aliases its corners, and the inset `.glass-material::before` specular + `::after` grain pseudos bleed past the arc. TWO dialects.

Mint ONE clip on the `.glass-material` group's selector list (`material.css:36`) — the single source every rung + `.glass-card` + `.glass-btn` + the dock controls already join (add one comma-entry, not a new class). The discipline: `contain: layout style paint` + `border-radius: inherit` (the PROVEN `.glass-card` dialect, constraint-A5-mandated — it clips DESCENDANTS/inset-pseudos to the box AND establishes the stacking context the backdrop-filter sampling needs, while NOT clipping the element's own rim/drop-shadow/focus-ring; `overflow:hidden` is FORBIDDEN — it clips the focus ring + specular bleed). Then RETIRE the now-redundant per-class `contain` on `.glass-card`/`.glass-btn` (one dialect). **Named exemption: the dock morph aperture** (`shell.css:179-208`, single-axis `overflow-x:clip; overflow-y:visible` per BA.W-DOCK-GEOMETRY — the cross-axis must stay visible for the hover-plate clearance; the dock root already carries `contain:paint` and manages its own aperture, so the group clip coexists). P2 must build-prove the chosen discipline on real GPU (Chrome+Safari corner-AA differs; if a residual backdrop-AA fringe survives `contain`, `isolation: isolate` is the free belt-and-suspenders — it is a strict subset of `contain:paint`'s effect, so no conflict).

### M4 — ONE calm interactive blur register; the dock is a peer, not a heavier/lighter outlier
The elevation ladder STAYS a ladder (monotonic wash<quiet<resting<floating<overlay) but dials calmer than 4.2.0. The INTERACTIVE surfaces all resolve the SAME tier — the content-glass `resting` register IS the interactive register:
- `<Card>` default tier = resting (unchanged).
- Dock plate: clean-break retire `--glass-blur-dock` / `--glass-blur-dock-radius` / `--glass-saturate-dock`; `--dock-surface-blur` (`shell.css:17`) → `--glass-blur-resting`. No special dock blur token.
- Button default: DEMOTE off `glass-deep` (`button/index.ts:68-69`) onto the resting register; `--glass-blur-btn` (`glass.css:160+`) → `--glass-blur-resting` (off the lifted floating/deep tier — deep/16px is the OPT-IN hero register, the settled fence, untouched).
- Menu rows / items → resting (the menu glass register).

So dock = button = default-Card = menu-item = `resting`, peers by construction. RE-TUNE the `--glass-blur-*-radius` primitives calmer (target band, eye-tuned over the WS1 warm field in P3: ~wash 1 / quiet 6 / resting 8 / floating 10 / overlay 10 / deep 16-untouched — every rung ≤ its 4.2.0 value, structure reads through). REVERT the metallic saturate over-correction: the `--glass-saturate-*` values bumped TODAY (commit `b8aa7033`) to 1.4/1.4/1.4/1.6/1.6 + deep 1.8 contradict the file's OWN doctrine (real liquid glass concentrates light ~1.1–1.2×) — revert to the ~1.1–1.25 band (the C-GRAY "over-corrected to metallic" defect). FIX the stale comments (`glass.css:104-106` still claims 1.05/1.18/1.2 "byte-identical" — a lie; `surfaces.css:180` "quiet 10px" vs floating 13px). The `--glass-level` recipe is threaded (the 3 a11y brackets reach blur(0)/firm-up for free); keep the PRM `--glass-blur-dock:none`→ now `--glass-blur-resting` bracket. REBASELINE `proof:glass-cal` IN-DIFF (it pins exact radii — a blur change reds it unless rebaselined; the rebaseline is the wave's intent, not a cheat). The build injects the `-webkit-backdrop-filter` twin — do NOT hand-author it (Lightning-CSS dedup drops it post-Chrome-113).

### M5 — Five/seven chromatic axes → TWO (hue,strength) pairs, survivor-named, zero dangling write
Keep the two MOST-WIRED pairs at their proven names (minimal re-point blast; the a11y prefers-contrast bracket + `proof:button-glass` B1 already write/read them by name — keeping the names greens them by construction):
- **PLATE** = `--glass-tint-source` / `--glass-tint-strength` (in oklab; the W55 whole-plate legibility seam AND the per-instance JS-writable input).
- **RIM** = `--glass-accent` / `--glass-accent-strength` (in oklab; per-instance rim+glint).

Retire onto them (clean break, no alias):
- `--glass-fill-tint`/`-strength` (identical `color-mix(in oklab, plate, hue strength)` plate op) → readers (Badge `glass-atom.css:223`, IconChip, SelectableChip, chip) write the plate pair.
- `--glass-ambient-hue`/`-strength`/`-strength-field` → **NOT silently deleted** (the falsifier: it IS the JS-writable plate-hue seam — `useBloomUp.ts:340,343` writes both, `useGlassBackdropLuminance.ts:448` writes hue). Re-point both composables to write the PLATE pair directly (the load-bearing re-point lands IN this wave — no dangling write, the dock dynamic-darkening + bloom survive). `liquid-morph.css:34-35` (feeds ambient→tint-source, proving the collapse) + `DockExampleTile.vue` re-point.
- `--accent-fill`/`-band`/`-edge` + strengths (`accent-tone.css`) → fill/band = plate, edge = rim.
- `--feedback-tone`/`-strength` (`feedback-tone.css`) → plate (the tone IS a plate tint; the full-chroma glyph color stays a text color, untouched).
- `--selection-accent-strength`/`-selected`, `--dock-facet-accent-strength` → rim-strength.

KEEP `--glass-backdrop`/`--glass-backdrop-luma` (the NON-chromatic luminance TRIGGER, not a tint) + `--surface-tint-*` (the in-srgb brand-overlay fence, AW.W26 — NEVER folded into the oklab glass family). The two surviving pairs stay typed `<color>`/`<percentage>`, `inherits:true`, initial `transparent`/`0%` so the no-op floor `color-mix(in oklab, X, transparent 0%) ≡ X` holds byte-identical at default. Legibility-darken / data-hue / ambient become STRENGTH PRESETS of the one plate axis, NOT axes. Re-point every gate literal in lockstep (`proof:glass-cohesion` feedback arm, `proof:glass-material-demo`, `proof:adaptive-glass`/`proof:dark-material`, `proof:glass-accent`). Prove each folded axis's readers by COMPUTED-STYLE probe (not grep — `color-mix(…var(--x)…)` embedding hides reads), both modes.

### M6 — DRY the re-pasted idioms; delete the GLASS dead tokens
- `--glass-tint-floor` (the 12%/15% per-mode pair, ONE home — the home already exists at `glass-fx.css:171` `--glass-capsule-warm`/`-floor` on the shared `.glass-capsule` both atom/chip compose); kills `--chip-tint-floor` + `--atom-tint-floor`.
- `.glass-press-squash` / `--press-squash` (the volume-preserving `scale: 1.04 0.94`, composed) — kills 3 pastes (`cards.css:339`, `glass-atom.css:86,182`) + the `1.015 0.985` hover-squish family; **satisfies the liquid-weight universal law (squash & stretch on the ONE recipe)**.
- `--glass-warm-zero: oklch(0.9 0.05 75 / 0)` (the WebKit-safe explicit-0-alpha stop — NEVER bare `transparent`, the Safari premultiply hole) — kills 5 pastes + centralizes the note.
- `.loud` (`--motion-weight: 1`) composed — kills 5 re-declares.
- ONE shared `[data-cast] .cartoon-cast` rule — kills the 4-paste in `glass-atom.css`.
- DELETE the GLASS dead tokens (no-driver-no-mechanism, no-legacy): `--glass-saturate-deep-ceiling` (0 readers); `--glass-spine-blur`/`-opacity` (0 readers — SCOPE the delete: KEEP `--glass-spine-border`/`-vignette`, live in `instrument-chassis.css`); `--cartoon-cast-dx`/`-dy` @property + the dead `cards.css` transition legs (the `useCartoonCast` writer was never built); the ambient @property (retired by M5). Boundary: the RADIUS/SPRING dead tokens (`--corner-k-soft/sharp`, `--corner-shape-card/pill`, `--spring-timeline-*` + the gate that PINS them alive) are the sibling A-deadcode lane — do NOT overlap.

### M7 — The new gates that close the headless-green trap
- `proof:shadow-contract` gains an **IN-GAMUT-WARM-BROWN arm**: paint-probe the resolved `--cartoon-ink` AND the COMPOSITED cast over a real warm field + over white; assert R>G>B>0 (never `rgb(N,0,0)`), ΔE small from `#4a3320`, at both stamp lightnesses (light clamp 0.14-0.18 + dark clamp 0.20-0.30), both modes. Synthetic red-cast self-test bite. (Today's chain-only gate is structurally color-blind — the maroon shipped GREEN.)
- `proof:glass-clip` (NEW): every `[data-slot=card]` resolves the material clip; a top-corner sample over a busy backdrop reads a clean rounded edge; a synthetic over-corner child clips to the radius. Local-tagged (the binding truth is the real-GPU π).
- REBASELINE `proof:glass-cal` (M4, in-diff).

### M8 — Glass dynamics carry the read at lower diffusion (lean on lensing+specular)
With the calmer blur, strengthen the EXISTING W-LENSING squircle edge refraction + the neutral specular catch-light hairline so the plate still reads unmistakably as glass (Apple: lensing concentrates light, blur only scatters; the LogRocket recipe is 4px blur + displacement + a thin specular Gaussian). Add the iOS-27 HUE-BLEED sample to `useGlassBackdropLuminance` (sample backdrop HUE, write the unified PLATE pair — NOT a new axis) so glass shifts COLOR over a hued field. Re-express the retired dock punch as a compositor-only press-squash + specular flare. ALL compositor-only (`filter`/`opacity`/`transform`/typed `--*-press-t` @property — NEVER per-frame `backdrop-filter` radius animation, the W-MORPH-SHOWCASE 16.7ms budget-fall), PRM single-mount-sample + offscreen-park, NEW JS OFF the `dock.js` chunk (814-byte headroom).

### M9 — Rehome the demo-only CSS out of the library tree
`liquid-morph.css` (850L, >500 bound) lives in `src/styles/glass/` but is `@import`-ed ONLY by `demo/demo.css:125` — yet consumed by library `useLiquidMorph.ts` + `dock/morph-bridge.css`. Split the library-load-bearing rules into `dock/morph.css`/`material.css` (shipped), move the demo-showcase surfaces (dynamic-island / music-player / places-sheet) into `demo/` under the 500 bound. DELETE `liquid-enter.css` (252L — `.liquid-enter`/`.is-cel` have 0 .vue/.ts consumers, verify-then-delete) + its cascade `@import`. Colocate the flat top-level `glass-refract.css` + `glass-specular-track.css` into `glass/`; rename the lagging `--glass-refract` @property to match the shipped `.glass-lens` class. COORDINATE with WS2 (the dock-morph-as-modal redesign may retire much of liquid-morph) + A-deadcode's `BG.W-DEADCODE-CUT` (owns the `useLiquidMorph.ts` TS half). SEQUENCE LATE.

---

## FILES TOUCHED (primary)

| File | Wave | Change |
|---|---|---|
| `src/styles/tokens/shadow.css` (107-110) | INK-GAMUT | in-gamut warm-brown `--cartoon-ink`; collapse the two fallback literals to one |
| `src/styles/tokens/dark-arm.css` (177) | INK-GAMUT | dark-arm in-gamut twin (plain per-mode, no light-dark) |
| `src/components/custom/dock/GlassDock.vue` (606) | CAST-RETIRE | delete the `.cartoon-cast` span |
| `src/styles/dock/shape.css` (217-249) | CAST-RETIRE | delete the cast block + `[data-punching]` deepen + PRM arm |
| `src/styles/glass/material.css` (36-47) | CLIP-DISCIPLINE | one clip on the material group (`contain: layout style paint` + `border-radius: inherit`) |
| `src/styles/glass/surfaces.css` (34, 79, 180) | CLIP/BLUR | retire redundant per-class `contain`; fix the stale "10px" comment |
| `src/components/ui/card/Card.vue` | CLIP-DISCIPLINE | ensure `[data-slot=card]` carries/inherits the clip |
| `src/styles/tokens/glass.css` (75-160, 104-106) | BLUR-PEER | dial radii calmer; revert saturate; retire `--glass-blur-dock*`/`--glass-saturate-dock`; point dock/btn at resting; fix the stale comment |
| `src/styles/dock/shell.css` (17) | BLUR-PEER | `--dock-surface-blur` → `--glass-blur-resting` |
| `src/components/ui/button/index.ts` (68-69) | BLUR-PEER | demote default Button off `glass-deep` → resting |
| `src/styles/glass-fx.css` (157-158, 171, 399-411, 403-404) | TINT-UNIFY/IDIOM | the 2-pair canon; `--glass-tint-floor`; delete dead spine-blur/opacity |
| `src/styles/tokens/property-regs.css` (187, 209-215, 285-291) | TINT/IDIOM | survivor @property pairs; delete cartoon-cast-dx/dy + ambient regs |
| `src/styles/feedback-tone.css`, `src/styles/glass/accent-tone.css` | TINT-UNIFY | re-point tone/accent recipes onto plate+rim |
| `src/composables/glass/useBloomUp.ts` (340-349), `useGlassBackdropLuminance.ts` (448) | TINT-UNIFY/DYNAMICS | write the PLATE pair directly (no dangling ambient write) + add hue-bleed sample |
| `src/components/custom/{icon-chip/IconChip,selectable-chip/SelectableChip}.vue`, Badge variants | CONSUMER-BAND | re-point writers onto the plate/rim seam |
| `src/styles/glass/{glass-atom,glass-chip}.css` | IDIOM-FACTOR | `.glass-press-squash`, `--glass-warm-zero`, `--glass-tint-floor`, shared cast rule |
| `src/styles/tokens/glass-deep.css` (64) | IDIOM-FACTOR | delete `--glass-saturate-deep-ceiling` |
| `src/styles/dock/adaptive-legibility.css` (40-68) | DOCK-LEGIBILITY-RECAL | re-anchor the AA darken to the unified plate |
| `src/styles/glass/liquid-morph.css` (850L), `liquid-enter.css` (252L), `glass-refract.css`, `glass-specular-track.css` | DEMO-REHOME | split/move/delete/colocate |
| `scripts/proof-shadow-contract.mjs`, `scripts/proof-glass-clip.mjs` (new), `gates.mjs` | gates | the gamut arm + the clip gate + glass-cal rebaseline |
| `tests-visual/{glass-standardization,glass-clip}.spec.ts` (new) | π | the binding real-GPU captures |

---

## WAVE BREAKDOWN (10 waves, 3 phases by blast-radius + dependency)

### Phase 1 — the visible D3 fixes (low blast, independent, land first/parallel)

**BG.W-CARTOON-INK-GAMUT** — Replace the `max(c,0.11)` out-of-gamut chroma floor (shadow.css:107 + dark-arm.css:177) with an in-gamut warm-brown derivation (L-aware chroma cap `C∈[0.030,0.060]` at `L∈[0.28,0.34]`, OR mix toward `#4a3320`). Collapse the two fallback literals to one. Plain per-mode pair (no light-dark). Extend `proof:shadow-contract` with the IN-GAMUT-WARM-BROWN composited paint-probe arm + a synthetic red-cast self-test bite. π: composited cast over warm field AND white resolves R>G>B,B>0 (NOT rgb(N,0,0)) at both stamp L, both modes, Chrome+Safari.

**BG.W-DOCK-CAST-RETIRE** — Delete the dock `.cartoon-cast` child (GlassDock.vue:606 + shape.css:217-249, incl. `[data-punching]` + PRM arm). The dock elevation reads `--shadow-dock` omni-glow + `--glass-key` rim. KEEP the cartoon cast on `<Card surface="cartoon">` (paper). The dock punch re-expresses as a glass light-event (W-GLASS-DYNAMICS). π: bottom-left corner pixel-sample matches the surrounding backdrop (no saturated hue, no hard fringe), both docks both modes; dock still reads as a lifted plate; `proof:dock-clip-reveal` stays green.

**BG.W-GLASS-CLIP-DISCIPLINE** — Mint ONE clip on the `.glass-material` group (material.css:36, `contain: layout style paint` + `border-radius: inherit`); retire the redundant per-class `contain` on `.glass-card`/`.glass-btn`; ensure `[data-slot=card]` carries it. Named exemption: the dock morph aperture. New `proof:glass-clip`. π: every `[data-slot=card]` resolves the clip; a top-corner sample over a busy backdrop = clean arc; the focus ring + the paper-card cast + the dock aperture survive; Chrome+Safari.

### Phase 2 — the architectural collapse (high blast; gated behind Phase 1 + the prototypes + a glass-cal rebaseline)

**BG.W-GLASS-BLUR-PEER** — Retire `--glass-blur-dock`/`-radius`/`--glass-saturate-dock`; point `--dock-surface-blur` + `--glass-blur-btn` at `--glass-blur-resting`; demote default `<Button>` off `glass-deep`. Dial the `--glass-blur-*-radius` ladder calmer than 4.2.0 (monotonic, eye-tuned over the WS1 field). Revert the `b8aa7033` saturate bump (1.4-1.8 → ~1.1-1.25). Fix the stale comments. Rebaseline `proof:glass-cal` IN-DIFF. Keep the deep tier untouched (fence). π: dock + content Card + Button resolve the SAME backdrop-filter blur (getComputedStyle parity); ladder calmer than 4.2.0, structure reads through.

**BG.W-GLASS-TINT-UNIFY** — Collapse 5/7 chromatic axes → 2 pairs (plate `--glass-tint-source`/`-strength` + rim `--glass-accent`/`-strength`). Retire `--glass-fill-tint`, `--glass-ambient-*`, `--accent-fill/band/edge`, `--feedback-tone*`, the selection/facet strength wrappers onto them. Re-point `useBloomUp` + `useGlassBackdropLuminance` to write the plate pair (IN-DIFF — no dangling write). Re-point the recipe CSS (`feedback-tone.css`, `accent-tone.css`) + every gate literal in lockstep. Keep `--glass-backdrop`/`-luma` (trigger) + `--surface-tint-*` (fence). Prove readers by computed-style probe. π: ≤2 chromatic pairs; every read axis written (zero inert); colored chips paint the data hue byte-equivalent; dock dynamic-darken + bloom still live; no-op floor byte-identical at default.

**BG.W-GLASS-IDIOM-FACTOR** — Mint `--glass-tint-floor`, `.glass-press-squash`/`--press-squash`, `--glass-warm-zero`, `.loud`, the shared `[data-cast] .cartoon-cast` rule (each declared ONCE). Delete the GLASS dead tokens (`--glass-saturate-deep-ceiling`, `--glass-spine-blur`/`-opacity` [keep -border/-vignette], `--cartoon-cast-dx`/`-dy` @property + legs, the ambient regs). Boundary: A-deadcode owns the radius/spring dead tokens. π: each idiom declared once; zero dead tokens/@property in the glass cascade; the press-squash carries the liquid-weight law.

### Phase 3 — consumer + recalibration + cleanup (depends on Phase 2 + WS1)

**BG.W-GLASS-CONSUMER-BAND** — Fold the hand-rolled accent/fill threading in IconChip.vue, SelectableChip.vue, Badge variants, DockExampleTile.vue, the Atlas onto the unified plate/rim seam (the W-CONSUMER-MODERNIZE by-name fold; additive, no public-surface retirement). π: each consumer paints via the unified seam byte-equivalent at its current hue.

**BG.W-DOCK-LEGIBILITY-RECAL** — Re-anchor the dock's unconditional AA self-darken (adaptive-legibility.css:40-68) to the unified plate tint; keep the W55 bright-bucket + on-glass-fg lift but verify the recalibrated 4% calm content floor holds (the full AA darken only under the measured bright bucket — the old unconditional 20% darken WAS the gray origin). Rewire `useGlassBackdropLuminance`'s sample onto the WS1 shell-aurora canvas (not the dead `auroraFallbackGround` raster — zero new cost). COUPLES WS1. π: dock reads warm-cream-transmissive over the live aurora, AA text holds, no gray slab, no metallic over-correction, both modes.

**BG.W-GLASS-DYNAMICS** — Strengthen the W-LENSING squircle refraction + neutral specular hairline so the plate reads as glass at the lower blur. Add the iOS-27 backdrop-HUE sample (writes the unified plate pair, not a new axis). Re-express the dock punch as a compositor-only press-squash + specular flare. Compositor-only, PRM single-mount-sample + offscreen-park, NEW JS off the `dock.js` chunk. π: dock/card glass picks up the field's dominant hue at a bounded sub-perceptual strength; the dock punch reads without a sticker; both modes, live over the aurora.

**BG.W-DEMO-STYLE-REHOME** — Split/move `liquid-morph.css` (library rules → shipped `dock/morph.css`/`material.css`, demo surfaces → `demo/` under 500 bound). Delete `liquid-enter.css` (verify 0 consumers). Colocate `glass-refract.css`/`glass-specular-track.css` into `glass/`; rename the lagging `--glass-refract` @property. COORDINATE WS2 + A-deadcode. SEQUENCE LAST. π: no `src/styles` file imported solely by `demo/`; no glass file >500 lines; `profile:budget` + `proof:css-critical` net-negative or flat.

---

## ACCEPTANCE / REAL-PAINT-π BAR (the cardinal bar — real GPU, Chrome AND Safari, both modes)

The headless-green/visually-broken trap shipped 3×. Device-free gates passing is NOT the bar. Every wave binds to a LIVE real-GPU capture + getComputedStyle/getImageData readback (the method that produced `rgba(49,0,0)` in the audit):

1. **ONE material capture** — a single frame shows the dock + a content Card (+ a Button) reading as ONE glass material over the WS1 warm aurora field: SAME `backdrop-filter` blur (getComputedStyle parity), SAME plate tint, the whole ladder calmer than 4.2.0 so the field structure reads through every plate. Both modes, both engines.
2. **Warm-brown cast** — the composited cast over the warm field AND over white resolves R>G>B, B>0, NOT `rgb(N,0,0)`, at both stamp lightnesses (light + dark arms), both modes, both engines. `proof:shadow-contract` IN-GAMUT-WARM-BROWN arm green; `proof:no-gray` STRONG_FLOOR still met.
3. **Clean clip** — every `[data-slot=card]` resolves the material clip; a top-corner pixel sample over a busy backdrop reads a clean rounded arc; the dock bottom-left shows NO red wedge / NO hard fringe; the focus ring + the paper-card cast survive. `proof:glass-clip` green, both engines.
4. **≤2 chromatic tint pairs** — exactly 2 `(hue,strength)` pairs exist; every read axis is written (zero inert); colored chips paint their data hue byte-equivalent via the plate pair; the dock dynamic-darken + bloom still live.
5. **DRY + dead-free** — each re-pasted idiom declared once; zero dead tokens/@property in the glass cascade; `profile:budget` + `proof:css-critical` net-negative or flat (the 5→2 collapse + dead-token deletion FREES critical-CSS headroom).
6. **a11y/perf fences hold** — the 3 a11y brackets reach blur(0)/firm-up via `--glass-level`; PRM keeps-fade-drops-transform on cast/blur/tint/dynamics; compositor-only (no per-frame backdrop-filter animation); new JS off the 814-byte `dock.js` headroom; the build injects the `-webkit-` twin (not hand-authored).

---

## FOLDED / DEFERRED ITEMS

- **`--glass-depth` lerp** (deep-tier scalar, 2 static consumers, no animator) — LEAVE. It is the documented BB.W-DEEP-GLASS fence; the "no animator" is a future-driver question, not dead-by-no-legacy. Mark open, do not fold in WS3.
- **The radius/spring dead tokens** (`--corner-k-soft/sharp`, `--corner-shape-card/pill`, `--spring-timeline-*` + the gate that pins them alive) — the sibling A-deadcode lane (`BG.W-DEAD-TOKEN-SWEEP`); do NOT overlap.
- **`useLiquidMorph.ts` (462L) / `useMorphField()` TS-half deletions** — A-deadcode's `BG.W-DEADCODE-CUT`; W3's W-DEMO-REHOME coordinates the CSS half only.
- **Per-satellite blob derived-shade color** (BA-VJS-5) — booked to a 4.x point release elsewhere; not WS3.
- **WS1 shell-aurora field** — the live-paint precondition + the canvas the dock observer rewires onto; lands FIRST (dependency, not WS3 scope).
- **WS2 dock V↔H morph redesign** — consumes this register; coordinates the `liquid-morph.css` rehome.

---

## OPEN RISKS

- **R1 — cartoon-punch law vs dock-cast retire (falsifier).** The dock `.cartoon-cast` is a deliberate BD.W-CARTOON-CASTER feature and cartoon-technicolor-punch is a binding user law. RESOLUTION (P6): retire the cast FROM glass chrome (a paper sticker on the iOS-27 navigation layer is the category error), KEEP it on `<Card surface="cartoon">` (paper), re-express the dock punch as a compositor glass light-event. If the design proof shows the punch reads weaker, the fallback is an in-gamut warm-brown cast on a NON-contained sibling layer (not the contain:paint child) — but the clean retire is first-principles preferred. Verify the law is honored, not falsified.
- **R2 — the in-gamut window is narrow (P1).** `C∈[0.030,0.060]×L[0.28,0.34]` must be computed-verified in real raster at all three stamp αs both modes both engines (Safari oklch-from gamut-maps differently than Chrome — the in-gamut retune mitigates, the literal/pre-clamped path is cross-engine-safe). Eyeballing fails.
- **R3 — the clip collision (P2, highest build risk).** One clip on the material MUST NOT clip the own box-shadow/focus ring, break the dock morph aperture, or clip the paper-card cast. `contain:layout style paint` is the constraint-mandated default; `isolation:isolate` is the free fallback; `overflow:hidden` is forbidden. Real-GPU Chrome+Safari corner-AA differs — build-prove.
- **R4 — blur over-flatten (P3).** Don't flatten ALL five elevation tiers to one radius (destroys the ladder). The interactive PEER = the resting register; the ladder stays monotonic but calmer. Buttons are small — verify the demoted button still reads as glass (not flat). ANY radius change reds `proof:glass-cal` — rebaseline IN-DIFF.
- **R5 — ambient re-wire (P4).** Do NOT delete `--glass-ambient-*` as "inert" — it is the JS-writable plate-hue seam for the dock dynamic-darkening (a WS2 dependency) + bloom. The collapse keeps a JS-writable plate input; exercise BOTH composables live after the fold.
- **R6 — deadness by computed-style, not grep (P4).** `color-mix(…var(--x)…)` embedding hides reads; prove each folded/deleted axis inert by live computed-style probe per-axis both modes.
- **R7 — Safari, binding.** The whole stack rides `oklch(from)`, `color-mix(in oklab)`, `@container style()`, `backdrop-filter`+clip corner-AA, `backdrop-filter:url()` (WebKit-broken bug 245510 — lensing stays `@supports`-gated), `contrast-color()` (PE-gated). Every π capture is Chrome AND Safari.
- **R8 — sequencing.** Phase 1 (ink/cast/clip) is independent + low-blast — land first/parallel. Phase 2 (blur/tint/idiom) is high-blast — gate behind Phase 1 + the prototypes + the glass-cal rebaseline. Do NOT bundle the cosmetic D3 fixes with the architectural collapse in one wave. Phase 3 couples WS1 (the field) and WS2 (the dock consumer).
