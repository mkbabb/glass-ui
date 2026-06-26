# BG-WS3 · Glass standardization — ONE coherent glass register (pass-1 CONVERGED spec)

> Workstream: BG-WS3-glass-standardization
> Base: `tranche/BG` @ `aaa254c8` (advanced past the audited 4.2.0 `998136bb`; every WS3 defect re-verified LIVE at HEAD during this convergence — the blur ladder is ALREADY `quiet 8 / resting 10 / floating 13 / dock 9`, saturate ALREADY bumped to `1.4/1.4/1.6`, the maroon ALREADY ships)
> Owns: the unified blur register WS2's dock consumes · the cast/clip/tint architecture
> Couples: WS1 (shell-aurora field — the live-paint precondition + the canvas the dock observer rewires onto) lands FIRST; WS2 (dock) CONSUMES this register
> Cardinal bar: **real-paint-verified on real GPU, Chrome AND Safari, both modes.** The headless-green/visually-broken trap shipped the maroon + the rect-fringe THREE times because no gate read the COMPOSITED PAINTED PIXEL. `getComputedStyle` is **color-blind to the maroon** (Chrome 149 serializes the un-clipped `oklch()` back, NOT the painted `rgb(49,0,0)`) — so every cast/clip π must read `getImageData`/screenshot-sample, NEVER `getComputedStyle` for the cast color. Trust the painted pixel.

> **Convergence status: 71% (refine).** Six of seven prototypes returned `build:true`; the seventh (dock-cast retire / cartoon-punch reconciliation, `build:false`) carries a falsified flare mechanism that must be re-grounded. Every critique returned `refine` (no `reject`), so the architecture is SOUND and the gate is the fold-of-mustFix + the binding real-GPU/Safari π that does not yet exist on disk (WS1's warm field is the precondition). This converged spec hardens each wave with its validated mechanism, the folded mustFix, and a real-paint-π bar; the residual frontier is the live cross-engine capture, which gates Phase 2/3 behind WS1.

---

## GESTALT GOAL (unchanged from pass-1 — the bar is verbatim)

Make the dock, buttons, cards, items, and menus read as ONE glass material — the iOS-26/27 "Liquid Glass" single-material discipline, calmer than 4.2.0 so the warm field reads THROUGH every plate. The iOS reference gestalt is the Siri/home frames at `scratchpad/evidence/frames-2144` & `frames-2207`:

1. **ONE material at varying opacity** — dock pill, content Card, button, menu row all sample the SAME blur and the SAME tint. Not a heavier/special dock; not a 9/13/16px spread; not a per-family tint axis.
2. **Subtle blur, structure survives** — the wallpaper/content behind each plate reads clearly. Calmer than the current `8/10/13/13` ladder. The "glass" read comes from edge LENSING + a neutral specular hairline (W-LENSING is already built — lean on it), NOT a heavy Gaussian. Apple itself walked the glass calmer (iOS 26.1 Tinted).
3. **Perfect corner clip** — every `[data-slot=card]` corner is a clean rounded arc; the blurred backdrop raster + all inset pseudos clip to the radius. Zero rectangular fringe. ONE clip dialect on the material, not three.
4. **Soft ambient elevation, ZERO chromatic cast** — a soft omni drop-shadow under each surface; never a hard colored offset "sticker" stamp on glass chrome. No maroon halo, no oxblood wedge at the dock bottom-left. The composited cast over the warm field AND over white resolves a warm BROWN (R>G>B, B>0, never `rgb(N,0,0)`) at both stamp lightnesses, both modes.
5. **ONE chromatic seam** — collapse the five (live: seven) disjoint chromatic tint axes to exactly TWO `(hue,strength)` pairs: `{plate}` (whole-plate legibility/data-hue/ambient) + `{rim}` (per-instance accent glint). Zero inert read axes — every read axis is written.
6. **DRY** — the re-pasted idioms (`color-mix` plate tint ×14, press-squash ×3, warm-zero stop ×5, tint-floor ×2, cartoon-cast rule ×4) declared ONCE. Zero dead tokens/`@property` in the glass cascade.

This satisfies the brief's convergence bar verbatim.

---

## VERIFIED GROUND TRUTH (re-checked at HEAD during convergence — corrects pass-1 stale line refs)

The pass-1 spec carried several stale facts the critiques caught. The converged spec is anchored on these RE-VERIFIED facts:

- **`--cartoon-ink` (shadow.css:107)**: `oklch(from var(--foreground) clamp(0.14, l, 0.18) max(c, 0.11) h)`. Dark arm (`dark-arm.css:177`): `oklch(from var(--foreground) clamp(0.20, calc(1 - l), 0.30) max(c, 0.11) h)`. **TWO fallback literals** — `#4a3320` (shadow.css:113) light, `#5a3f28` (dark-arm.css:181) dark. The composited contact rung is light `18%` / dark `26%` (`*-contact`), lead `32/46%`, mid `26/38%`. **VERIFIED live raster: light → `rgb(49,0,0)`, dark → `rgb(51,1,0)`** (both `G/B≈0`, the forbidden `rgb(N,0,0)`).
- **`.glass-card` uses EXPLICIT `border-radius: var(--radius-card)`** (surfaces.css:27), NOT `inherit`. The pass-1 SPEC premise "the proven `.glass-card` dialect = `border-radius: inherit`" is **FALSE** and must be discarded. `.glass-card` carries `contain: layout style paint` (surfaces.css:34); `.glass-btn` carries `contain: paint` (surfaces.css:79); `.glass-chip` carries `isolation: isolate` (glass-chip.css:69) — **THREE clip dialects**, not two.
- **The `.glass-material` GROUP selector (material.css:36)** carries ONLY `position: relative` — NO clip, NO `border-radius` on the host. The `::before`/`::after` pseudos DO carry `border-radius: inherit` (material.css:95). So the rungs the real `<Card>` composes (`.glass-resting`/`.glass-floating`) clip NOTHING on the host box — the corner-fringe root.
- **Blur ladder (glass.css:76-92)**: `quiet 8 / resting 10 / floating 13 / dock 9`px radii. **Saturate (glass.css:115-124)**: `resting 1.4 / floating 1.6 / dock 1.4` — the metallic over-correction. `--glass-blur-btn` (glass.css:176) reads `--glass-blur-floating-radius` + `--glass-saturate-floating` (NOT deep). `--dock-surface-blur` (shell.css:17) reads `--glass-blur-dock`.
- **Ambient writers**: ONLY `useGlassBackdropLuminance.ts:448` writes `--glass-ambient-hue`. **`useBloomUp.ts` does NOT write `--glass-ambient-*`** (the pass-1 `useBloomUp.ts:340,343` claim is stale). The gate surface for the ambient/fill re-point is **`proof:glass-foundation` + `proof:bloom-up`** (both confirmed to reference `glass-ambient`/`glass-fill-tint`); `proof:glass-cohesion`/`proof:glass-accent`/`proof:adaptive-observer` carry **ZERO** fill/ambient refs (drop them from the re-point list).
- **The dock punch**: `.glass-dock` pins `--motion-weight: 1` UNCONDITIONALLY (shape.css:192), which **overrides the `:root` PRM-zero** (scheme-motion.css). `--dock-punch-stretch` is `@property inherits: false` (shape.css:43). The `.cartoon-cast` child is driven by `--dock-punch-stretch` (shape.css:229). The squash (`scale:` on shape.css:155-167) is compositor-only and is the LOAD-BEARING surviving cartoon channel. The Card cast is a BARE GLOBAL `.cartoon-cast` rule (cards.css:359) + a `.cartoon-surface .cartoon-cast` hover (cards.css:329), NOT a disjoint descendant selector.
- **`proof:glass-cal` pins exact radii AND saturate** (proof-glass-cal.mjs:159-217 — `FROZEN_BASE_RADII` + the `satDefault: "1.4"`/`1.6` constants + the line-205 `--glass-saturate-floating: 1.6` literal regex). ANY radius OR saturate change reds it — rebaseline ALL of {radii, saturate} in lockstep IN-DIFF.

---

## MECHANISM (idiomatic, concrete — hardened per critique)

### M1 — The maroon root is a gamut-clip, not a hue choice (VALIDATED, est 90%; critique 63% refine)

`--cartoon-ink` extracts the warm `--foreground` hue via `oklch(from … h)` (CORRECT — keep it) but the `max(c, 0.11)` chroma FLOOR is an ~18× over-lift; at the clamped L 0.14-0.18 a warm hue (~56°) **cannot hold C0.11 in sRGB** → the engine clips toward pure red → `rgb(49,0,0)`. **Independently verified both ways**: (1) the Ottosson+naive-clip Node resolver reproduces the painted `rgb(49,0,0)`/`rgb(51,1,0)` to the BYTE (Chrome currently naive-clips OOG `oklch()` rather than CSS-gamut-mapping — this is the crux de-risk that makes the device-free gate possible); (2) the in-gamut fix has NO gamut mapping at all, so the resolver and the painted pixel agree.

**THE FIX (committed pin, not a range)**: replace `max(c, 0.11)` with a verified in-gamut warm-brown derivation. The committed design pin (per critique mustFix "commit a single L/C within the verified window"):
```
--cartoon-ink: oklch(from var(--foreground) clamp(0.28, l, 0.34) clamp(0.030, c, 0.050) h);
```
The richer end of the window (`L≈0.30, C≈0.045`) for cartoon-technicolor PUNCH — verified `oklch(0.30 0.045 56°)` → linear sRGB `(0.0498, 0.0209, 0.0084)` → `rgb(63,40,23)`, R>G>B>0; over white @32% → `rgb(194,186,181)`; at the low-alpha contact rung (@18% light / @26% dark) it reads unambiguously WARM-brown (not warm-gray) in raster. This clears `proof:no-gray` STRONG_FLOOR (0.020) with margin — the `max(c,0.11)` was GRATUITOUS over-chroming (the no-gray cure mis-applied: 0.11 is brown at L0.5, maroon at L0.16).

**The dark arm**: the `clamp(0.20, calc(1-l), 0.30)` L-flip is **inert at the default dark `--foreground`** (both arms resolve L≈0.30 under the clamp floor). Per critique mustFix, resolve it CLEANLY: collapse the dark primary onto the SAME expression as light (DRY, clean break — one in-gamut expression, both modes), since the warm-brown ink does not need the L-flip (the contact alphas already deepen via the dark `26/38/46%` rungs). **Do NOT preserve the dead L-flip branch "conservatively."**

**The fallback literals**: collapse the two (`#4a3320` light / `#5a3f28` dark) to ONE per spec M1 — but ONLY after verifying both mode arms now resolve the SAME L0.30 in-gamut ink (per critique: confirm the merged `#4a3320` fallback path itself resolves R>G>B>0 on the `@supports not (oklch from)` arm). If the dark contact-alpha register genuinely needs a distinct fallback lightness, KEEP two with an explicit recorded note; default to the single `#4a3320` if both verify equal.

**The prefers-contrast/PRT arms deepen via ALPHA** (32/26/18 → 42/34/24% light, 46/38/26% dark), never chroma — UNCHANGED.

**No `--shadow-cartoon-*` reader edits** — every consumer re-resolves through the token.

**Rewrite the now-false comments** (per critique mustFix): shadow.css:99-106 (`'FLOORING chroma max(c,0.11) — TECHNICOLOR'` / `'DEEPENING L clamp(0.14,0.18)'`) and dark-arm.css:172-176 (`'chroma floored max(c,0.11) for TECHNICOLOR'`, `'clamp(0.20,1-l,0.30)'`) — describe the in-gamut warm-brown window and WHY the 0.11 floor was the maroon root.

**Real-paint-π bar**: see M7 — the `proof:shadow-contract` IN-GAMUT-WARM-BROWN arm (composited over warm field AND white, both stamp L, both modes, the synthetic red-cast self-test bite) + the BINDING Safari `getImageData` capture (do NOT certify cross-engine by the in-gamut argument alone — the stack rides `oklch(from …)` which has Safari-specific history).

### M2 — The dock cast is a paper sticker bolted on glass chrome; retire it from glass, keep it on paper (VALIDATED design proof, est 77%, `build:false`; critique 46% refine — the FLARE mechanism falsified)

**The diagnosis is SOUND and verified**: `.glass-dock` carries `contain: layout style paint` (shell.css:113) + a 9999px pill, so the offset `box-shadow` cast (whose whole purpose is to paint OUTSIDE the box) is clipped to the rect border-box → fills only the rect-minus-pill corner gap → the hard red wedge bottom-left. **Structurally self-defeating** — even an in-gamut warm-brown cast would wedge there. The Memphis offset-cast is a PAPER idiom (`<Card surface="cartoon">` has no `contain:paint`); glass chrome is the iOS-27 navigation layer — it reads as glass, never a sticker.

**THE RETIRE (clean break)**:
- Delete the dock `.cartoon-cast` span (GlassDock.vue:606).
- Delete the `dock/shape.css` cast block (217-249), incl. the `[data-punching] > .cartoon-cast` deepen and the cast PRM arm.
- **Correct the cascade model** (per critique): the Card cast is the BARE GLOBAL `.cartoon-cast` rule (cards.css:359) + the `.cartoon-surface .cartoon-cast` hover (cards.css:329) — deleting the dock span + the `shape.css .glass-dock > .cartoon-cast` block leaves NO orphaned reference and the bare rule keeps its `<Card surface="cartoon">` consumer (paper register UNTOUCHED).
- The dock elevation already reads `--shadow-dock` (shadow.css:71 — a soft `0 0 20px 14%` omni glow on its OWN box, paints correctly past the pill) + the directional `--glass-key` cel rim (glass-fx.css:110, in-gamut). KEEP both.

**THE CARTOON-PUNCH LAW RECONCILIATION (R1 dissolved + the flare re-grounded)**: the binding cartoon-technicolor-punch law is honored, NOT falsified — the punch is TWO channels and the **load-bearing half SURVIVES**: the compositor-only press-SQUASH (`--dock-punch-stretch` on the `scale:` channel, shape.css:155-167) is KEPT. The cast (a maroon sticker) was the OTHER channel — its retirement removes a redundant 2nd shadow language, leaving ONE coherent lighting model (rim + omni ambient + the surviving squash).

**THE FLARE — re-grounded (the critique falsified the pass-1 mechanism, MUSTFIX)**: the pass-1 "specular flare reading `var(--dock-punch-stretch)` on a child" is DEAD — `--dock-punch-stretch` is `@property inherits: false` (shape.css:43), so a child reading `var(--dock-punch-stretch, 1)` gets the initial `1` → opacity 0 forever (the exact headless-green/visually-broken trap this bar rejects). **The flare is RE-DESIGNED OR DELETED**, decided on PAINT in W-GLASS-DYNAMICS (deferred to Phase 3, NOT bundled into the cast-retire):
- **First-principles preferred (KISS)**: prove on real paint that the surviving SQUASH + the existing `--shadow-dock` omni + `--glass-key` rim CARRY the depth-pop. If they do, **DELETE the flare entirely** — no net-new DOM child, no screen-blend, no z-index/Safari risk. A net-new blend child is only justified if it measurably out-reads the no-flare baseline on a real-GPU capture.
- **IF a flare is genuinely needed**: drive it via the PARENT attr, NOT the non-inheriting var — `.glass-dock[data-punching] > .dock-flare { opacity: <peak>; transition: opacity … }` (accept the flare's own opacity transition — the "one-clock derived-read" elegance does NOT hold across an `inherits:false` boundary). Place it deterministically at a defined inset layer ABOVE the plate/grain but BELOW content (a screen-blend at z0 under flow content only shows in the gaps between controls). Real-GPU verify it lights AND reads as punch-equal-or-better than the retired cast, Chrome AND Safari, both modes, over the WS1 field, inside the `contain:paint` isolation.

**THE DOCK SQUASH PRM BUG (MUSTFIX, in-scope for cast-retire — the surviving squash's PRM correctness)**: `.glass-dock` pins `--motion-weight: 1` unconditionally (shape.css:192), overriding the `:root` PRM-zero, so the surviving squash still scales `1→1.22` under `prefers-reduced-motion`. ADD a dock-scope PRM arm zeroing `--motion-weight: 0` on the dock (the `cards.css:390` / `glass-atom.css:133` pattern). The squash is the load-bearing surviving cartoon channel; its PRM correctness is binding.

**Real-paint-π bar**: bottom-left corner pixel-sample (`getImageData`) matches the surrounding backdrop — no saturated hue, no hard fringe — both docks both modes both engines; the dock still reads as a lifted plate; `proof:dock-clip-reveal` stays green.

### M3 — ONE clip dialect on the material atom (VALIDATED, est 88%; critique 58% refine — blast radius understated, premise corrected)

**The structural move is idiomatic** and the prototype caught a real spec error (corrected in ground-truth above). The validated prototype proved on real-rendered paint (Playwright + `getComputedStyle` differential over a busy diagonal-stripe backdrop using BUILT dist CSS) that `.glass-card` resolves `contain: content` (Chrome normalizes `layout style paint` → `content` — they ARE equivalent) and the corner clips clean.

**THE DISCIPLINE (corrected — `border-radius: inherit` is WRONG for `.glass-card`)**: mint ONE clip on the `.glass-material` GROUP host selector (material.css:36 — add the clip to the `position: relative` block the group already shares; one comma-list, not a new class). The clip pair:
```
contain: layout style paint;          /* clips inset pseudos + backdrop raster to the box; establishes the stacking context backdrop-filter needs; does NOT clip the element's own rim/drop-shadow/focus-ring */
/* border-radius: NOT set on the group — each rung/surface keeps its OWN explicit radius
   (.glass-card → --radius-card, etc.). The pseudos already inherit it (material.css:95). */
```
**CRITICAL (MUSTFIX — the paint-only gate greens a broken fix)**: `contain: paint` WITHOUT a border-radius clips to a SHARP RECT, re-creating the corner-aliasing bug. The group does NOT carry one radius (the surfaces have different radii). So the gate (`proof:glass-clip`) MUST assert, per surface, that a border-radius (explicit OR inherited) is PRESENT alongside `contain: paint` — and the binding π reads the PAINTED corner arc, not the token chain. `overflow: hidden` is FORBIDDEN (clips the focus ring + specular bleed); `isolation: isolate` is the free belt-and-suspenders fallback IF a residual backdrop-AA fringe survives `contain` on either engine (it is a strict subset of `contain:paint`'s effect — no conflict).

**RETIRE the now-redundant per-class `contain`** on `.glass-card` (surfaces.css:34) / `.glass-btn` (surfaces.css:79) — ONE dialect.

**THE THIRD DIALECT — `.glass-chip isolation: isolate` (glass-chip.css:69, MUSTFIX — "ONE clip dialect" is not met with two remaining)**: the chip's `isolation: isolate` exists to wall its INNER `plus-lighter` bloom (glass-chip.css:158-169), a distinct purpose from corner-clip. RESOLUTION: the group clip's `contain: layout style paint` ALREADY establishes the isolation `isolate` provides (a strict superset) — so FOLD `.glass-chip` into the group clip and DELETE the standalone `isolation: isolate` (verify the inner bloom still composes correctly under `contain` on both engines). If the bloom regresses, KEEP `isolation` with a recorded one-line rationale scoping it OUT of the corner-clip claim. Default to the fold.

**THE BLAST RADIUS (MUSTFIX — understated in pass-1)**: the group clip newly reaches `.glass-floating`/`.glass-overlay` (reka Dialog/Sheet/Popover/Command/DropdownMenu), the real `.glass-wash` Button, and the 4 dock controls. VERIFY on real GPU (Chrome AND Safari) that NO non-portaled descendant is clipped — Popover/Tooltip arrows, the anchored Select scroll panel, nested poppers, overflow decoration, focus rings — and NO layout-containment intrinsic-size regression. IF the overlay band clips an arrow, SCOPE the clip to the card/content tiers + dock controls (the surfaces that actually corner-alias) instead of the whole material group, with a recorded rationale. Run `proof:dock-plate-clearance` on the real demo (the dock controls gain containment; BA.W-DOCK-GEOMETRY-sensitive) and confirm the 1.1× hover plate + safe-inset still clear, both modes.

**THE CARTOON PAINT-CLIP LEAK (MUSTFIX)**: cartoon cards keep their `glass-resting` `backdrop-filter`; if the group clip drops `paint` for them, the D3 corner fringe re-admits and acceptance bar #3 ("every card resolves the clip") is contradicted. RESOLUTION: cartoon cards GET the same `contain: layout style paint` group clip (the cartoon CAST is on a global `.cartoon-cast` sibling/child, NOT on the contained box — re-home so cartoon's cast paints outside while the card box still clips its corners). Reconcile `proof:glass-clip`'s "every `[data-slot=card]` resolves the material clip" assertion with the cartoon case: the cartoon card box clips; the cartoon cast layer is exempt-by-construction (it is not `[data-slot=card]`).

**Named exemption — the dock morph aperture** (shell.css:179-208, single-axis `overflow-x: clip; overflow-y: visible` per BA.W-DOCK-GEOMETRY — the cross-axis must stay visible for hover-plate clearance; the dock root already carries `contain: paint` and manages its own aperture, so the group clip coexists; carve it explicitly in the gate).

**Real-paint-π bar (BINDING, the actual trap-closer — absent in the prototype)**: capture the corner-clip on REAL GPU Chrome AND Safari, both modes, over a busy backdrop on the actual demo route (BUILT `/styles`, real `<Card>`/`<Button>`/`<Dialog>`) — `getImageData` a top-corner pixel for a clean rounded arc; the dock bottom-left shows no wedge/fringe. **SwiftShader/Playwright-Chromium does NOT count** (it may not reproduce the GPU AA fringe — the 3×-shipped trap). The device-free `proof:glass-clip` is a structural-presence gate (border-radius-present + contain-present, the synthetic over-corner child) — it CANNOT close the trap alone; the binding truth is the real-GPU/Safari π. **Re-run all verification against the BUILT `/styles` bundle (Tailwind compiled), not raw per-partial dist CSS** — the `@apply`/`@utility`/utility-class composition the real surfaces depend on must be exercised.

### M4 — ONE calm interactive blur register; the dock is a peer (VALIDATED mechanism, est 72%; critique 50% refine — the saturate-revert nulls the anti-gray device, must CO-LAND)

**The mechanism is correct, idiomatic, KISS**: collapsing dock+button onto `--glass-blur-resting` is a 2-token re-point, no new recipe, no parallel path (vue-tsc exit 0; full build green; the dist cascade structurally proves the gestalt). But the prototype HONESTLY self-reported six gate collisions that pin the literal inverse — the converged spec resolves each.

The elevation ladder STAYS a ladder (monotonic `wash < quiet < resting < floating < overlay`) but dials calmer. The INTERACTIVE surfaces all resolve the SAME tier — the content-glass `resting` register IS the interactive register:
- `<Card>` default tier = resting (unchanged).
- Dock plate: clean-break retire `--glass-blur-dock` / `--glass-blur-dock-radius` / `--glass-saturate-dock`; `--dock-surface-blur` (shell.css:17) → `--glass-blur-resting`.
- Button: `--glass-blur-btn` (glass.css:176) → `--glass-blur-resting` (off the floating radius+saturate it currently reads); DEMOTE the default `<Button>` off `glass-deep` (button/index.ts:68-69) onto resting. The `deep`/16px tier is the OPT-IN hero register (settled fence, untouched).
- Menu rows / items → resting.

So **dock = button = default-Card = menu-item = `resting`, peers by construction.**

**RE-TUNE the `--glass-blur-*-radius` primitives calmer than the current `8/10/13/13`** (eye-tuned over the WS1 warm field in Phase 3; target band ~`wash 1 / quiet 6 / resting 8 / floating 10 / overlay 10 / deep 16-untouched` — every rung ≤ its current value, structure reads through). **MUSTFIX — stay ABOVE the AV.W7-F2 8px richness floor is NOT possible if resting→8/quiet→6**: lowering quiet→6/resting→8 strips Gaussian richness; the read is carried by W-GLASS-DYNAMICS' strengthened lensing+specular (M8). SEQUENCE the blur-drop WITH the lensing/specular strengthening (do NOT land the demoted blur before the read-carrier) and LIVE-VERIFY the demoted button + dock still read as glass (R4), not flat.

**REVERT the metallic saturate over-correction (MUSTFIX — must CO-LAND with the anti-gray replacement)**: `--glass-saturate-*` at `1.4/1.4/1.6` + deep `1.8` contradict the file's own doctrine (real liquid glass concentrates light ~1.1-1.2×) — the C-GRAY "over-corrected to metallic" defect. Revert to the ~1.1-1.25 band. **BUT the dock-saturate revert + the `--glass-saturate-dock` retire NULLS the dock's ONLY anti-gray device** (the no-gray witnesses `lightDockBlur`/`lightDockSat` → null) — re-introducing C-GRAY. So this saturate-revert MUST CO-LAND with W-GLASS-TINT-UNIFY's plate-tint anti-gray replacement + W-DOCK-LEGIBILITY-RECAL (the unified plate tint becomes the dock's anti-gray device, NOT saturate). Do NOT land the saturate-revert standalone.

**FINISH glass-depth (MUSTFIX)**: reverting floating saturate to ~1.2 reds D3's composite arm — the line-205 literal regex `--glass-saturate-floating: 1.6` AND the `CALM_FLOATING_SATURATE`/`DEEP_SATURATE_FLOOR=1.6` constants (proof-glass-cal.mjs:59/64) are UNTOUCHED by `FROZEN_BASE_RADII`. Rebaseline ALL THREE in lockstep (deep 1.8 → a value still clearing the lowered floor).

**REWRITE dock-shrink-blur S3 (MUSTFIX — re-point, not re-pin)**: retiring `--glass-blur-dock-radius` makes the `proof:glass-cal` S3 regex return null → 'absent' RED. Re-point S3 to follow `--dock-surface-blur` → `--glass-blur-resting`, and re-verify the S1/S2/S4 `[data-morphing]` self-blur decongest still functions with no dock-own blur token.

**PRESERVE dark-dock read-weight (MUSTFIX)**: dark `--glass-blur-dock` carries `saturate(1.30) brightness(1.12)` (dark-arm.css:284-285), tuned above dark resting for dark legibility. Collapsing onto dark resting drops it — VERIFY dark resting carries equivalent luminosity (or lift the dark resting saturate/brightness companion in lockstep) so dark mode does not regress to dim/gray.

**COMPLETE the remaining gate flips as DELIBERATE inversions (MUSTFIX)**: button-glass BG-IOS-1/2 (default off glass-deep, btn→resting) + glass-legibility L3 (resting floor) are the literal inverse of recently-landed "more-glass button" decisions — flip them with an IN-GATE rationale note so a future agent does not re-flip them back.

**FIX the stale comments** (glass.css:104-106 still claims `1.05/1.18/1.2` "byte-identical" — a lie now; surfaces.css:180 "quiet 10px" vs the real 13px floating). The `--blur-dock` Tailwind bridge retire is verifiably clean (zero `backdrop-blur-dock` consumer in src/demo). The build injects the `-webkit-backdrop-filter` twin — do NOT hand-author it (Lightning-CSS dedups it post-Chrome-113).

**REBASELINE `proof:glass-cal` IN-DIFF** (it pins exact radii AND saturate — the rebaseline IS the wave's intent, not a cheat).

**THE CARDINAL PAINT BAR (MUSTFIX — currently impossible, gates the wave)**: WS1's warm-aurora field is NOT on disk, so the "dock + Card as ONE glass over the warm field" live-capture (Chrome AND Safari, both modes, `getComputedStyle` blur-parity) is impossible today. **Blur-peer MUST gate behind WS1's field + a real-GPU capture; green gates alone do NOT close it (the trap shipped 3×).**

### M5 — Five/seven chromatic axes → TWO (hue,strength) pairs (VALIDATED FILL+AMBIENT slice, est 78%; critique 58% refine — scope honesty + falsified no-op floor)

Keep the two MOST-WIRED pairs at their proven names (minimal re-point blast; the a11y prefers-contrast bracket + `proof:button-glass` B1 already write/read them by name):
- **PLATE** = `--glass-tint-source` / `--glass-tint-strength` (in oklab; the W55 whole-plate legibility seam AND the per-instance JS-writable input).
- **RIM** = `--glass-accent` / `--glass-accent-strength` (in oklab; per-instance rim+glint).

Retire onto them (clean break, no alias):
- `--glass-fill-tint`/`-strength` → readers (Badge `glass-atom.css:223`, IconChip, SelectableChip, chip) write the PLATE pair. **VALIDATED**: Option-B is FORCED not chosen — the `:where(.glass-capsule)` body already reads the plate pair via `--glass-bg-floating-tinted: color-mix(in oklab, --glass-bg-floating, --glass-tint-source --glass-tint-strength)` (surfaces.css:283), so a chip writing the plate pair tints through the W55 seam. Net `-62` lines (2 overlay layers + 4 @property regs + 2 indirection rules deleted), build green both arms.
- `--glass-ambient-hue`/`-strength`/`-strength-field` → **NOT silently deleted** (it IS the JS-writable plate-hue seam — `useGlassBackdropLuminance.ts:448` writes hue). Re-point the composable to write the PLATE pair directly (the load-bearing re-point lands IN this wave — no dangling write, the dock dynamic-darkening + bloom survive). `liquid-morph.css:34-35` (feeds ambient→tint-source, proving the collapse) + `liquid-morph.css:64-69` (the `--glass-ambient-strength-field` damping) + `DockExampleTile.vue` re-point IN THIS FOLD so no `--glass-ambient-*` read dangles. Confirm bloom's effective strength (was `8% * (1 - --paper-field-warm)`) is NOT silently dropped when removing the indirection.
- `--accent-fill`/`-band`/`-edge` + strengths (`accent-tone.css`) → fill/band = plate, edge = rim.
- `--feedback-tone`/`-strength` (`feedback-tone.css`) → plate (the tone IS a plate tint; the full-chroma glyph color stays a text color, untouched).
- `--selection-accent-strength`/`-selected`, `--dock-facet-accent-strength` → rim-strength.

KEEP `--glass-backdrop`/`--glass-backdrop-luma` (the NON-chromatic luminance TRIGGER, not a tint) + `--surface-tint-*` (the in-srgb brand-overlay fence, AW.W26 — NEVER folded into the oklab glass family). The two surviving pairs stay typed `<color>`/`<percentage>`, `inherits:true`, initial `transparent`/`0%`.

**THE FALSIFIED NO-OP FLOOR (MUSTFIX — retract the "byte-identical by construction" headline)**: the deleted `--glass-atom-tinted` overlay painted warm-amber AT REST (12% plain atom, 28% badge via fill-strength 16%) — it is NOT a no-op. Re-baseline the capsule warm-floor so a plain glass atom/badge is byte-equivalent at rest, OR explicitly accept + both-mode π-verify the warmth change. **Badge `data-hue` is a dead-write activation today** (`--glass-atom-tinted` reads `--glass-capsule-warm`, never `--glass-fill-tint`) — the fold turns every glass badge from uniform amber into its data hue: a NET-NEW visual behavior across all variants, requiring explicit design sign-off + both-mode π, NOT a self-judgment.

**SATURATED-HUE DILUTION (MUSTFIX)**: SelectableChip's hue moves from an undiluted sRGB overlay-on-top to a body `color-mix(in oklab)` THEN under the 16% `--glass-capsule-warm` floor, pulling `--success`/`--destructive`/`--info` toward amber. Prove sub-perceptual in real raster both modes; if not, restore the data-hue ABOVE the warm floor (compose order).

**BUCKET-GATE DOCK IDENTITY DRIFT (MUSTFIX — the WS2 dynamic-darkening dependency)**: over a calm/cool field the inline `--glass-tint-source` write clobbers the stylesheet `--glass-tint-ink-dock` (warm dock material) even at floor strength, so the dock follows the field hue. VERIFY the dock still reads warm over a cool aurora; if warm-ink must hold, gate the hue write off dock targets OR compose hue+ink rather than replace. Exercise this LIVE (it is the W-DOCK-LEGIBILITY-RECAL / WS2 coupling).

**SCOPE HONESTY (MUSTFIX)**: the validated prototype is the FILL+AMBIENT slice only. The full 5→2 collapse still owes `--accent-fill`/`-band`/`-edge`, `--feedback-tone`, `--selection-accent-strength`, `--dock-facet-accent-strength` — each with its own recipe CSS + readers. W-GLASS-TINT-UNIFY carries ALL of them; the JS-seam slice does NOT represent the whole wave.

**THE CORRECTED GATE RE-POINT SURFACE (MUSTFIX — pass-1 over-listed)**: `proof:adaptive-observer`, `proof:glass-accent`, `proof:glass-cohesion` have ZERO refs to fill/ambient (VERIFIED) — DROP them from the re-point list. The REAL surface is **`proof:glass-foundation`** (A1 REQUIRES `setProperty('--glass-ambient-hue')`; A2 REQUIRES the @property regs — both re-pointed/removed) + **`proof:bloom-up`** (33 ref-lines + self-test fixtures) + **`useBloomUp.test.ts`** (16) + `gates.mjs` notes. The `proof:glass-cohesion` feedback arm IS re-pointed (it reads `--feedback-tone`) — keep that one.

**PROVE readers by COMPUTED-STYLE probe** (not grep — `color-mix(…var(--x)…)` embedding hides reads), both modes, per folded/deleted axis (the deadness-by-computed-style discipline, R6).

**Real-paint-π bar (BINDING, OWED)**: both-mode Chrome+Safari `getComputedStyle` + `getImageData`: plain glass byte-identical (or the accepted+signed-off warmth delta); chip/badge data hues; dock dynamic-darken live over the WS1 field; bloom live. Build-green is NOT the bar.

### M6 — DRY the re-pasted idioms; delete the GLASS dead tokens (unchanged intent, scoped)

- `--glass-tint-floor` (the 12%/15% per-mode pair, ONE home — the home already exists at `glass-fx.css:171` `--glass-capsule-warm`/`-floor` on the shared `.glass-capsule` both atom/chip compose); kills `--chip-tint-floor` + `--atom-tint-floor`.
- `.glass-press-squash` / `--press-squash` (the volume-preserving `scale: 1.04 0.94`, composed) — kills 3 pastes (`cards.css:339`, `glass-atom.css:86,182`) + the `1.015 0.985` hover-squish family; **satisfies the liquid-weight universal law (squash & stretch on the ONE recipe)**. PRM-zeroed via the shared `--motion-weight: 0` arm.
- `--glass-warm-zero: oklch(0.9 0.05 75 / 0)` (the WebKit-safe explicit-0-alpha stop — NEVER bare `transparent`, the Safari premultiply hole) — kills 5 pastes + centralizes the note.
- `.loud` (`--motion-weight: 1`) composed — kills 5 re-declares.
- ONE shared `[data-cast] .cartoon-cast` rule — kills the 4-paste in `glass-atom.css` (the GLOBAL `.cartoon-cast` Card rule + this shared atom rule, the dock cast deleted entirely per M2).
- DELETE the GLASS dead tokens (no-driver-no-mechanism, no-legacy): `--glass-saturate-deep-ceiling` (0 readers, glass-deep.css:64); `--glass-spine-blur`/`-opacity` (0 readers — SCOPE the delete: KEEP `--glass-spine-border`/`-vignette`, live in `instrument-chassis.css`); `--cartoon-cast-dx`/`-dy` @property + the dead `cards.css` transition legs (the `useCartoonCast` writer was never built); the ambient @property (retired by M5). Boundary: the RADIUS/SPRING dead tokens (`--corner-k-soft/sharp`, `--corner-shape-card/pill`, `--spring-timeline-*` + the gate that PINS them alive) are the sibling A-deadcode lane (`BG.W-DEAD-TOKEN-SWEEP`) — do NOT overlap.

### M7 — The new gates that close the headless-green trap (VALIDATED, est 84%; critique 64% refine — the gate is device-free; the binding π is the real-GPU/Safari capture)

**The CRUX is genuinely de-risked** (independently confirmed on LIVE Chrome 149, not just the prototype model): the device-free Ottosson+naive-clip resolver reproduces the painted pixel to the byte — bug light `rgb(49,0,0)`, dark `rgb(51,1,0)`; fix light `rgb(52,37,26)`, dark `rgb(51,38,25)`; fallback `rgb(74,51,32)`. Every M1/M2 structural claim checks at the cited lines.

- **`proof:shadow-contract` gains an IN-GAMUT-WARM-BROWN arm (folded IN, NOT standalone)**: paint-probe the resolved `--cartoon-ink` AND the COMPOSITED cast (the `color-mix` rungs) over a real warm field AND over white; assert R>G>B>0 (never `rgb(N,0,0)`) + warm-hue + in-gamut, at both stamp lightnesses (light + dark arms), both modes. Synthetic red-cast (`max(c,0.11)`) self-test bite that MUST red. Encode the `@supports`-fallback skip (pick the `oklch(from` PRIMARY block, not the last-wins fallback re-declare) with a reordered-block self-test bite. **The π reads PAINTED pixels via `getImageData`/canvas-paint/screenshot-sample, NEVER `getComputedStyle`** (Chrome 149 serializes the un-clipped `oklch()` from `getComputedStyle` for OOG tokens — a `getComputedStyle` π is color-blind to the maroon, the trap itself; NON-NEGOTIABLE).
- **RECONCILE the pass-condition with the fix's actual paint (MUSTFIX)**: option-(a) paints `L≈0.28-0.30` (`rgb 52,37,26`/`rgb 63,40,23`) but `#4a3320` is lighter (`rgb 74,51,32`) — NOT ΔE-small. DROP the tight-ΔE assertion; assert **R>G>B>0 + warm-hue (50-70°) + in-gamut** ONLY (make gate+spec+fix consistent). The "ΔE small from #4a3320" pass-1 line is RETIRED.
- **`proof:glass-clip` (NEW, device-free, `ci`)**: every `[data-slot=card]` resolves the material clip; the gate asserts a border-radius (explicit OR inherited) is PRESENT alongside `contain: paint` (MUSTFIX — paint-containment without radius clips to a sharp rect, which the paint-only gate would green); a synthetic over-corner child clips to the radius; carve the cartoon-cast exemption + the dock morph-aperture exemption explicitly. It is a structural-presence "token-chain gate" — local-tagged, NOT the trap-closer alone.
- **REBASELINE `proof:glass-cal` (M4, in-diff)** — radii AND saturate (proof-glass-cal.mjs:59/64/205 + `FROZEN_BASE_RADII` + the S3 dock-shrink re-point).
- **Register both new arms in `gates.mjs`** with correct tags.

**THE BINDING REAL-GPU/Safari π (the actual trap-closer — absent in every prototype, the residual frontier)**: `tests-visual/glass-standardization.spec.ts` + `tests-visual/glass-clip.spec.ts` — the composited cast over warm field + white (`getImageData` warm-brown, both stamp L, both modes), the corner-clip arc + dock bottom-left no-wedge, on REAL GPU Chrome AND Safari (WebKit gamut-maps `oklch` differently; corner-AA differs — at minimum confirm Safari paints the fix warm-brown with no residual maroon and a clean corner). The device-free gates prove STRUCTURE; the real-GPU/Safari π proves PAINT. The cardinal bar condemns the structural-presence gate as the sole close.

### M8 — Glass dynamics carry the read at lower diffusion (lean on lensing+specular)

With the calmer blur, strengthen the EXISTING W-LENSING squircle edge refraction + the neutral specular catch-light hairline so the plate still reads unmistakably as glass (Apple: lensing concentrates light, blur only scatters; the LogRocket recipe is 4px blur + displacement + a thin specular Gaussian). Add the iOS-27 HUE-BLEED sample to `useGlassBackdropLuminance` (sample backdrop HUE, write the unified PLATE pair — NOT a new axis) so glass shifts COLOR over a hued field (this is WS2-13's chroma-sample term). Re-express the retired dock punch as a compositor-only press-squash + (IF needed, paint-proven) specular flare per M2. ALL compositor-only (`filter`/`opacity`/`transform`/typed `--*-press-t` @property — NEVER per-frame `backdrop-filter` radius animation, the W-MORPH-SHOWCASE 16.7ms budget-fall), PRM single-mount-sample + offscreen-park, NEW JS OFF the `dock.js` chunk (814-byte headroom). The lensing rides `@supports (backdrop-filter: url(#…))` (WebKit-broken bug 245510 — off-Chromium paints the gated blur+tint base alone; this is the binding cross-engine constraint — the lensing read-carrier must degrade gracefully on Safari, which means the SPECULAR hairline (not the SVG displacement) carries the Safari glass read).

### M9 — Rehome the demo-only CSS out of the library tree

`liquid-morph.css` (850L, >500 bound) lives in `src/styles/glass/` but is `@import`-ed ONLY by `demo/demo.css:125` — yet consumed by library `useLiquidMorph.ts` + `dock/morph-bridge.css`. Split the library-load-bearing rules into `dock/morph.css`/`material.css` (shipped), move the demo-showcase surfaces (dynamic-island / music-player / places-sheet) into `demo/` under the 500 bound. DELETE `liquid-enter.css` (252L — `.liquid-enter`/`.is-cel` have 0 .vue/.ts consumers, verify-then-delete) + its cascade `@import`. Colocate the flat top-level `glass-refract.css` + `glass-specular-track.css` into `glass/`; rename the lagging `--glass-refract` @property to match the shipped `.glass-lens` class. COORDINATE with WS2 (the dock-morph-as-modal redesign may retire much of `liquid-morph`) + A-deadcode's `BG.W-DEADCODE-CUT` (owns the `useLiquidMorph.ts` TS half). SEQUENCE LATE.

---

## WAVE BREAKDOWN (10 waves, 3 phases by blast-radius + dependency)

Each wave carries: its VALIDATED mechanism (M-ref), the FOLDED mustFix, and a real-paint-π acceptance bar.

### Phase 1 — the visible D3 fixes (low blast, independent, land first/parallel)

**BG.W-CARTOON-INK-GAMUT** (M1; prototype est 90%, critique 63%→refine)
Replace `max(c,0.11)` (shadow.css:107 + dark-arm.css:177) with the committed in-gamut pin `oklch(from var(--foreground) clamp(0.28, l, 0.34) clamp(0.030, c, 0.050) h)` (target `L≈0.30, C≈0.045`). Collapse the dark L-flip onto the same expression (DRY, no dead branch). Reconcile the two fallback literals to one `#4a3320` after verifying both arms resolve equal in-gamut ink. Rewrite the false `max(c,0.11)`/`clamp` comments. Plain per-mode pair (no light-dark). Extend `proof:shadow-contract` IN PLACE with the IN-GAMUT-WARM-BROWN composited paint-probe arm (R>G>B>0, warm-hue, in-gamut; drop tight-ΔE) + the synthetic red-cast self-test bite + the `@supports`-primary-block selection + reordered-block bite.
**π**: composited cast over warm field AND white resolves R>G>B,B>0 (NOT `rgb(N,0,0)`) + warm-hue at all three stamp αs, both modes, Chrome AND Safari (`getImageData`, NOT `getComputedStyle`). Real Safari capture is BINDING.

**BG.W-DOCK-CAST-RETIRE** (M2; design proof est 77%, `build:false`, critique 46%→refine)
Delete the dock `.cartoon-cast` span (GlassDock.vue:606) + the `shape.css` cast block 217-249 (incl. `[data-punching]` deepen + cast PRM arm). Confirm the bare global `.cartoon-cast` Card rule (cards.css:359) keeps its `<Card surface="cartoon">` consumer with no orphan. ADD the dock-scope PRM arm zeroing `--motion-weight: 0` (the surviving squash's PRM correctness, MUSTFIX). The dock elevation reads `--shadow-dock` omni + `--glass-key` rim. The flare is DEFERRED to W-GLASS-DYNAMICS (re-grounded off the dead non-inheriting var; DELETE-first unless paint proves it out-reads no-flare).
**π**: bottom-left corner `getImageData` matches the surrounding backdrop (no saturated hue, no hard fringe), both docks both modes both engines; dock still reads as a lifted plate; `proof:dock-clip-reveal` green.

**BG.W-GLASS-CLIP-DISCIPLINE** (M3; prototype est 88%, critique 58%→refine)
Mint ONE clip on the `.glass-material` group host (material.css:36, `contain: layout style paint`; NO `border-radius` on the group — each surface keeps its explicit radius; pseudos already inherit). Retire the redundant per-class `contain` on `.glass-card`/`.glass-btn`. Fold `.glass-chip isolation: isolate` into the group clip (verify the inner bloom; keep+scope-out only if it regresses). Ensure cartoon cards get the clip with the cast re-homed off the contained box. Named exemption: the dock morph aperture. New `proof:glass-clip` (border-radius-present + contain-present + over-corner child + carved exemptions). VERIFY the full blast radius (overlay band arrows/poppers/Select scroll, focus rings, intrinsic-size) on real GPU; scope to card/content+dock tiers if the overlay band clips an arrow. Run `proof:dock-plate-clearance` on the real demo. Re-run against the BUILT `/styles`, not raw partials.
**π**: every `[data-slot=card]` resolves the clip; a top-corner `getImageData` over a busy backdrop = clean arc; the focus ring + paper-card cast + dock aperture + overlay-band arrows survive; Chrome AND Safari, both modes, real GPU.

### Phase 2 — the architectural collapse (high blast; gated behind Phase 1 + WS1's field + a glass-cal rebaseline)

**BG.W-GLASS-BLUR-PEER** (M4; prototype est 72%, critique 50%→refine)
Retire `--glass-blur-dock`/`-radius`/`--glass-saturate-dock`; point `--dock-surface-blur` + `--glass-blur-btn` at `--glass-blur-resting`; demote default `<Button>` off `glass-deep`. Dial the `--glass-blur-*-radius` ladder calmer than `8/10/13/13` (monotonic, eye-tuned over the WS1 field), SEQUENCED WITH M8's lensing/specular read-carrier. Revert the saturate bump (1.4-1.8 → ~1.1-1.25) — **CO-LANDS with W-GLASS-TINT-UNIFY + W-DOCK-LEGIBILITY-RECAL** (the unified plate tint replaces saturate as the dock anti-gray device; do NOT land the saturate-revert standalone). Rebaseline `proof:glass-cal` IN-DIFF (radii AND saturate AND the S3 dock-shrink re-point AND the line-205/59/64 saturate constants). Preserve dark-dock read-weight (lift dark resting luminosity in lockstep). Flip button-glass BG-IOS-1/2 + glass-legibility L3 with in-gate rationale notes. Fix the stale comments. Keep the deep tier untouched (fence).
**π**: dock + content Card + Button resolve the SAME `backdrop-filter` blur (`getComputedStyle` parity); ladder calmer than current, structure reads through; the demoted button + dock still read as glass (not flat), both modes, Chrome AND Safari over the WS1 warm field. GATES behind WS1's field.

**BG.W-GLASS-TINT-UNIFY** (M5; prototype est 78% FILL+AMBIENT slice, critique 58%→refine)
Collapse all 5/7 chromatic axes → 2 pairs (plate `--glass-tint-source`/`-strength` + rim `--glass-accent`/`-strength`) — the FULL collapse (fill, ambient, accent-fill/band/edge, feedback-tone, selection/facet strengths), not just the JS slice. Re-point `useGlassBackdropLuminance` to write the plate pair (IN-DIFF — no dangling write); re-point `liquid-morph.css:34-35,64-69` + `DockExampleTile.vue`. Re-point `feedback-tone.css`/`accent-tone.css` recipes. Re-baseline the capsule warm-floor for the falsified no-op (or accept + π-verify the rest-warmth change). Get explicit sign-off on the Badge data-hue activation. Prove SelectableChip hue dilution sub-perceptual (or restore above the floor). Bucket-gate the dock hue-identity drift over a cool field. Re-point ONLY `proof:glass-foundation` + `proof:bloom-up` + `useBloomUp.test.ts` + the `proof:glass-cohesion` feedback arm + `gates.mjs` (DROP adaptive-observer/glass-accent/glass-cohesion-non-feedback). Keep `--glass-backdrop`/`-luma` + `--surface-tint-*`. Prove every read axis written + every folded axis inert by computed-style probe both modes.
**π**: ≤2 chromatic pairs; every read axis written (zero inert); colored chips paint the data hue (byte-equivalent or signed-off); dock dynamic-darken + bloom still live over the WS1 field; the rest-warmth either byte-identical or accepted, both modes, Chrome AND Safari.

**BG.W-GLASS-IDIOM-FACTOR** (M6; folded into the tint-unify net `-62` lines proof)
Mint `--glass-tint-floor`, `.glass-press-squash`/`--press-squash`, `--glass-warm-zero`, `.loud`, the shared `[data-cast] .cartoon-cast` rule (each declared ONCE). Delete the GLASS dead tokens (`--glass-saturate-deep-ceiling`; `--glass-spine-blur`/`-opacity` [keep -border/-vignette]; `--cartoon-cast-dx`/`-dy` @property + legs; the ambient regs). Boundary: A-deadcode owns the radius/spring dead tokens.
**π**: each idiom declared once (grep + computed-style); zero dead tokens/@property in the glass cascade; the press-squash carries the liquid-weight law on every consumer; PRM-zeroes via the shared `--motion-weight: 0` arm.

### Phase 3 — consumer + recalibration + cleanup (depends on Phase 2 + WS1)

**BG.W-GLASS-CONSUMER-BAND** (M5 consumer arm)
Fold the hand-rolled accent/fill threading in IconChip.vue, SelectableChip.vue, Badge variants, DockExampleTile.vue, the Atlas onto the unified plate/rim seam (the W-CONSUMER-MODERNIZE by-name fold; additive, no public-surface retirement).
**π**: each consumer paints via the unified seam (byte-equivalent at its current hue, or the signed-off delta), both modes, Chrome AND Safari.

**BG.W-DOCK-LEGIBILITY-RECAL** (M5 + M8 coupling; CO-LANDS the M4 saturate-revert)
Re-anchor the dock's unconditional AA self-darken (adaptive-legibility.css:40-68) to the unified plate tint (the new anti-gray device replacing saturate); keep the W55 bright-bucket + on-glass-fg lift but verify the recalibrated 4% calm content floor holds (the old unconditional 20% darken WAS the gray origin). Rewire `useGlassBackdropLuminance`'s sample onto the WS1 shell-aurora canvas (not the dead `auroraFallbackGround` raster — zero new cost). COUPLES WS1.
**π**: dock reads warm-cream-transmissive over the live aurora, AA text holds, no gray slab, no metallic over-correction, both modes, Chrome AND Safari.

**BG.W-GLASS-DYNAMICS** (M8; the re-grounded flare lives here)
Strengthen the W-LENSING squircle refraction + neutral specular hairline so the plate reads as glass at the lower blur (the M4 read-carrier — SEQUENCE WITH the blur-drop). The specular hairline (not the SVG displacement) carries the Safari glass read (lensing is `@supports`-gated, WebKit bug 245510). Add the iOS-27 backdrop-HUE sample (writes the unified plate pair, not a new axis — WS2-13). Re-express the dock punch: DELETE the flare unless paint proves it out-reads the no-flare squash+omni+rim baseline; IF kept, drive via the parent `[data-punching]` attr (NOT the dead non-inheriting var), at a defined inset layer above plate/grain below content, real-GPU + Safari verified inside the `contain:paint` isolation. Compositor-only, PRM single-mount-sample + offscreen-park, NEW JS off the `dock.js` chunk.
**π**: dock/card glass picks up the field's dominant hue at a bounded sub-perceptual strength; the dock punch reads without a sticker; the demoted-blur plate reads as glass via lensing+specular; both modes, live over the aurora, Chrome AND Safari.

**BG.W-DEMO-STYLE-REHOME** (M9; SEQUENCE LAST)
Split/move `liquid-morph.css` (library rules → shipped `dock/morph.css`/`material.css`, demo surfaces → `demo/` under 500 bound). Delete `liquid-enter.css` (verify 0 consumers). Colocate `glass-refract.css`/`glass-specular-track.css` into `glass/`; rename the lagging `--glass-refract` @property to match `.glass-lens`. COORDINATE WS2 + A-deadcode.
**π**: no `src/styles` file imported solely by `demo/`; no glass file >500 lines; `profile:budget` + `proof:css-critical` net-negative or flat.

---

## ACCEPTANCE / REAL-PAINT-π BAR (the cardinal bar — real GPU, Chrome AND Safari, both modes)

The headless-green/visually-broken trap shipped 3×. Device-free gates passing is NOT the bar. Every wave binds to a LIVE real-GPU capture + `getImageData`/`getComputedStyle` readback. **For the cast color the π MUST read `getImageData`** — `getComputedStyle` is color-blind to the maroon (Chrome 149 serializes the un-clipped `oklch()`).

1. **ONE material capture** — a single frame shows the dock + a content Card (+ a Button) reading as ONE glass material over the WS1 warm aurora field: SAME `backdrop-filter` blur (`getComputedStyle` parity), SAME plate tint, the whole ladder calmer than current so the field structure reads through every plate. Both modes, both engines.
2. **Warm-brown cast** — the composited cast over the warm field AND white resolves R>G>B, B>0, NOT `rgb(N,0,0)`, warm-hue, at both stamp lightnesses (light + dark arms), both modes, both engines (`getImageData`). `proof:shadow-contract` IN-GAMUT-WARM-BROWN arm green; `proof:no-gray` STRONG_FLOOR still met.
3. **Clean clip** — every `[data-slot=card]` resolves the material clip (border-radius-present + contain-present); a top-corner `getImageData` over a busy backdrop reads a clean rounded arc; the dock bottom-left shows NO red wedge / NO hard fringe; the focus ring + paper-card cast + overlay-band arrows survive. `proof:glass-clip` green + the real-GPU/Safari corner π green, both engines.
4. **≤2 chromatic tint pairs** — exactly 2 `(hue,strength)` pairs exist; every read axis is written (zero inert, computed-style proven); colored chips paint their data hue (byte-equivalent or signed-off delta); the dock dynamic-darken + bloom still live over the field.
5. **DRY + dead-free** — each re-pasted idiom declared once; zero dead tokens/@property in the glass cascade; `profile:budget` + `proof:css-critical` net-negative or flat (the 5→2 collapse + dead-token deletion FREES critical-CSS headroom).
6. **a11y/perf fences hold** — the 3 a11y brackets reach blur(0)/firm-up via `--glass-level`; PRM keeps-fade-drops-transform on cast/blur/tint/dynamics + the dock-scope `--motion-weight: 0` arm zeroes the squash; compositor-only (no per-frame backdrop-filter animation); new JS off the 814-byte `dock.js` headroom; the build injects the `-webkit-` twin (not hand-authored). The Safari lensing degrades to specular-carries-the-read (`@supports` gate, WebKit bug 245510).

---

## FILES TOUCHED (primary — corrected line refs)

| File | Wave | Change |
|---|---|---|
| `src/styles/tokens/shadow.css` (99-113) | INK-GAMUT | in-gamut warm-brown `--cartoon-ink` (committed pin); rewrite the false comments; reconcile→one fallback |
| `src/styles/tokens/dark-arm.css` (172-181) | INK-GAMUT | dark-arm in-gamut twin (collapse the dead L-flip onto the light expression; plain per-mode) |
| `src/components/custom/dock/GlassDock.vue` (606) | CAST-RETIRE | delete the `.cartoon-cast` span |
| `src/styles/dock/shape.css` (155-249) | CAST-RETIRE | delete cast block 217-249 + `[data-punching]` deepen + cast PRM arm; ADD dock-scope `--motion-weight:0` PRM arm (keep the squash 155-167) |
| `src/styles/glass/material.css` (36) | CLIP-DISCIPLINE | one clip on the material group host (`contain: layout style paint`; no group radius) |
| `src/styles/glass/surfaces.css` (34, 79, 180) | CLIP/BLUR | retire redundant per-class `contain`; fix the stale "10px" comment |
| `src/styles/glass/glass-chip.css` (69) | CLIP-DISCIPLINE | fold `isolation: isolate` into the group clip (or scope-out with rationale) |
| `src/components/ui/card/Card.vue` | CLIP-DISCIPLINE | ensure `[data-slot=card]` carries/inherits the clip; cartoon cast re-homed off the contained box |
| `src/styles/tokens/glass.css` (76-176, 104-115) | BLUR-PEER | dial radii calmer; revert saturate; retire `--glass-blur-dock*`/`--glass-saturate-dock`; point dock/btn at resting; fix stale comments |
| `src/styles/dock/shell.css` (17) | BLUR-PEER | `--dock-surface-blur` → `--glass-blur-resting` |
| `src/components/ui/button/index.ts` (68-69) | BLUR-PEER | demote default Button off `glass-deep` → resting |
| `src/styles/glass-fx.css` (157-158, 171, 399-411) | TINT-UNIFY/IDIOM | the 2-pair canon; `--glass-tint-floor`; delete dead spine-blur/opacity |
| `src/styles/tokens/property-regs.css` | TINT/IDIOM | survivor @property pairs; delete cartoon-cast-dx/dy + ambient regs |
| `src/styles/feedback-tone.css`, `src/styles/glass/accent-tone.css` | TINT-UNIFY | re-point tone/accent recipes onto plate+rim |
| `src/composables/glass/useGlassBackdropLuminance.ts` (448) | TINT-UNIFY/DYNAMICS | write the PLATE pair directly (no dangling ambient write) + add hue-bleed sample |
| `src/styles/glass/liquid-morph.css` (34-35, 64-69) | TINT-UNIFY | re-point ambient reads → plate; confirm bloom strength preserved |
| `src/components/custom/{icon-chip/IconChip,selectable-chip/SelectableChip}.vue`, Badge variants, DockExampleTile.vue | CONSUMER-BAND | re-point writers onto the plate/rim seam |
| `src/styles/glass/{glass-atom,glass-chip}.css` | IDIOM-FACTOR | `.glass-press-squash`, `--glass-warm-zero`, `--glass-tint-floor`, shared cast rule |
| `src/styles/tokens/glass-deep.css` (64) | IDIOM-FACTOR | delete `--glass-saturate-deep-ceiling` |
| `src/styles/dock/adaptive-legibility.css` (40-68) | DOCK-LEGIBILITY-RECAL | re-anchor the AA darken to the unified plate (the saturate-replacement anti-gray device) |
| `src/styles/glass/liquid-morph.css` (850L), `liquid-enter.css` (252L), `glass-refract.css`, `glass-specular-track.css` | DEMO-REHOME | split/move/delete/colocate |
| `scripts/proof-shadow-contract.mjs` | gates | the IN-GAMUT-WARM-BROWN composited-paint arm (getImageData) + synthetic red-cast bite + @supports-primary selection |
| `scripts/proof-glass-clip.mjs` (new), `gates.mjs` | gates | border-radius-present + contain-present + over-corner child + carved exemptions |
| `scripts/proof-glass-cal.mjs` (59, 64, 159-217) | gates | rebaseline radii AND saturate AND the S3 dock-shrink re-point IN-DIFF |
| `scripts/proof-glass-foundation.mjs`, `scripts/proof-bloom-up.mjs`, `tests/.../useBloomUp.test.ts` | gates | re-point ambient→plate (the CORRECTED surface) |
| `tests-visual/{glass-standardization,glass-clip}.spec.ts` (new) | π | the binding real-GPU/Safari captures (getImageData for cast/clip) |

---

## FOLDED / DEFERRED ITEMS

- **`--glass-depth` lerp** (deep-tier scalar, 2 static consumers, no animator) — LEAVE. It is the documented BB.W-DEEP-GLASS fence; the "no animator" is a future-driver question, not dead-by-no-legacy. Mark open, do not fold in WS3.
- **The radius/spring dead tokens** (`--corner-k-soft/sharp`, `--corner-shape-card/pill`, `--spring-timeline-*` + the gate that pins them alive) — the sibling A-deadcode lane (`BG.W-DEAD-TOKEN-SWEEP`); do NOT overlap.
- **`useLiquidMorph.ts` (462L) / `useMorphField()` TS-half deletions** — A-deadcode's `BG.W-DEADCODE-CUT`; W3's W-DEMO-REHOME coordinates the CSS half only.
- **Per-satellite blob derived-shade color** (BA-VJS-5) — booked to a 4.x point release elsewhere; not WS3.
- **WS1 shell-aurora field** — the live-paint precondition + the canvas the dock observer rewires onto; lands FIRST (dependency, not WS3 scope). **The Phase 2/3 real-paint-π bars are IMPOSSIBLE without it — this is the residual gate.**
- **WS2 dock V↔H morph redesign** — consumes this register; coordinates the `liquid-morph.css` rehome + exercises the dock hue-identity bucket-gate live.
- **The dock flare** — re-grounded off the dead non-inheriting var; DELETE-first, paint-prove if kept (W-GLASS-DYNAMICS).
- **Badge data-hue activation** — the fold turns uniform-amber badges into data-hue badges (net-new behavior) — requires explicit design sign-off before W-GLASS-TINT-UNIFY lands.

---

## OPEN RISKS

- **R1 — cartoon-punch law vs dock-cast retire (DISSOLVED).** The punch is TWO channels; the load-bearing SQUASH survives (compositor-only, PRM-corrected), the maroon sticker retires. The law is honored. The pass-1 flare mechanism was FALSIFIED (dead non-inheriting var) — re-grounded as DELETE-first/paint-proven in W-GLASS-DYNAMICS. Fallback if the punch reads weak on paint: an in-gamut warm-brown cast on a NON-contained sibling layer (not the `contain:paint` child).
- **R2 — the in-gamut window (RESOLVED to a committed pin).** `oklch(0.30 0.045 56°)` independently verified in-gamut both engines by argument + the byte-exact Chrome resolver; the BINDING Safari `getImageData` capture is still owed (the stack rides `oklch(from)` with Safari history).
- **R3 — the clip collision (P2, highest build risk).** `contain: layout style paint` WITHOUT a per-surface border-radius clips to a sharp rect (the paint-only gate greens it) — the gate MUST assert radius-present. The blast radius (overlay band arrows/poppers, focus rings, intrinsic-size) is real and must be verified on real-GPU both engines; scope to card/content+dock tiers if the overlay band clips. `isolation:isolate` is the free fallback; `overflow:hidden` forbidden.
- **R4 — blur over-flatten (P3).** The ladder stays monotonic but calmer; the demoted resting blur (≤8px) drops Gaussian richness — the read is carried by M8's strengthened lensing+specular, which MUST land WITH the blur-drop. Verify the demoted button + dock still read as glass. ANY radius/saturate change reds `proof:glass-cal` — rebaseline IN-DIFF.
- **R5 — ambient re-wire (RESOLVED).** `--glass-ambient-*` is the JS-writable plate-hue seam (the WS2 dynamic-darkening dependency + bloom) — re-pointed to write the plate pair IN-DIFF, no dangling write. The CORRECTED gate surface is `proof:glass-foundation` + `proof:bloom-up` + `useBloomUp.test.ts` (NOT cohesion/accent/observer). Exercise both composables live after the fold.
- **R6 — deadness by computed-style, not grep.** `color-mix(…var(--x)…)` embedding hides reads; prove each folded/deleted axis inert by live computed-style probe per-axis both modes.
- **R7 — Safari, BINDING.** The whole stack rides `oklch(from)`, `color-mix(in oklab)`, `@container style()`, `backdrop-filter`+clip corner-AA, `backdrop-filter:url()` (WebKit bug 245510 — lensing stays `@supports`-gated, the SPECULAR hairline carries the Safari glass read), `contrast-color()` (PE-gated). EVERY π capture is Chrome AND Safari; the cast/clip π read `getImageData`, not `getComputedStyle`.
- **R8 — sequencing.** Phase 1 (ink/cast/clip) is independent + low-blast — land first/parallel. Phase 2 (blur/tint/idiom) is high-blast — gate behind Phase 1 + WS1's field + the glass-cal rebaseline; the saturate-revert CO-LANDS with tint-unify + legibility-recal (do NOT strip the dock anti-gray device standalone). Do NOT bundle the cosmetic D3 fixes with the architectural collapse. Phase 3 couples WS1 (the field) and WS2 (the dock consumer).
- **R9 — the residual frontier (the convergence gate).** The Phase 2/3 real-paint-π bars require WS1's warm-aurora field, which is NOT on disk. Until it lands + a real-GPU/Safari capture exists, blur-peer/tint-unify/legibility-recal/dynamics CANNOT be paint-verified — they are spec-complete + mechanism-validated but not paint-closed. This is the honest gap below 100%.
