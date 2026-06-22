# BF.W-AUR-SATIN — the album-art aurora satin medium (uMedium==8, the silky light-bending fold)

**Band 6 · Tier B-par · depends: W-GESTALT-WIRE, W-PI-AUTHOR**

## The defect / the ask

The BE WAVE-LIST sites `BE.W-AUR-SATIN` (critical): "`medium:"satin"` (uMedium==8, WebGL2+WGSL-lockstep): silky light-bending fold (Heavy Rotation), fold-height from the domain-warp, directional sheen; default byte-identical, GL-fence" — the V2 album-art reference (Apple Music aurora, the "Heavy Rotation" card whose surface reads as folded silk catching a directional key-light). The audit confirms it was **never built**: `grep -rn "satin\|MEDIUM_SATIN\|uMedium == 8" src/components/custom/aurora/` returns ZERO hits. The aurora medium ladder stops at `kuwahara` (uMedium==7); satin is part of the breadth the audit names as open (census **D23** — "the breadth bands — Aurora satin/prism (`uMedium==8/9`)").

The medium ladder is grounded in source:
- `MEDIUM_ID` (`src/components/custom/aurora/composables/uniformBridge.ts:42-55`) runs `smooth:0 … kuwahara:7`.
- The GLSL dispatch is the `main()` if-ladder (`src/components/custom/aurora/constants/shaders/aurora.frag.ts:400-406`): `uMedium == 1` … `== 7`, each calling a `medium*()` body from `mediums.glsl.ts`.
- The WGSL twin dispatch is `applyMedium` (`src/components/custom/aurora/constants/shaders/aurora-mediums.wgsl.ts:300-312`), the parallel `if (medium == N)` chain — the lockstep the GL-fence demands.
- The published `AuroraMedium` union (`src/components/custom/aurora/constants/presets.ts:61-75`) ends at `"kuwahara"`.

## The mechanism

A new OPT-IN medium body `mediumSatin()` (uMedium==8) — the silky light-bending fold — added to BOTH the GLSL `mediums.glsl.ts` AND the WGSL `aurora-mediums.wgsl.ts` in **LOCKSTEP** (the GL-fence discipline the kuwahara medium already established: a one-sided add reds the parity-ΔE). The CARDINAL CONSTRAINT — OPT-IN, default byte-identical: satin is reached ONLY by an explicit `medium: "satin"`; the default config (`medium: "smooth"`/uMedium==0) renders byte-identical on both backends, so every existing `proof:aurora-*` gate + the W-AURORA-WGPU parity surface stays GREEN by construction.

The satin operator (procedural-field, no FBO — the kuwahara precedent: aurora has no input texture, so the medium re-samples the existing field directly):

- **Fold-height from the domain-warp.** The silk "folds" are read off the EXISTING `domainWarp(p, t)` displacement magnitude — the warp field that already bends the nuclei UV is re-interpreted as a height-field `h(p)`. No new noise basis (the IQ domain-warp the field already runs); satin reads its GRADIENT (a central-difference `∂h/∂x, ∂h/∂y` over the warp magnitude) as the fold-surface normal `N`.
- **Directional sheen — the anisotropic light-bending highlight.** A directional key-light `L` (the EXISTING `uFlowAngle` directional seed, `aurora.frag.ts:101`, OR the pointer-as-key-light via `uFlowFocal` so a pointer move sweeps the sheen — the reactive seam W-AUR-REACTIVE later drives) produces a satin highlight `pow(max(dot(N, halfway), 0), sheenExp)` along the fold ridges — a SILK sheen (broad, directional, anisotropic along the fold tangent), NOT a metallic specular point. The sheen rides `uStrokeAmount` (the studio amount knob — `uStrokeAmount=0` passes the raw field through, default → full satin) and `uStrokeScale` (the fold scale, the same knob kuwahara's patch size tracks).
- **OKLCh sheen tint.** The highlight tints the field color in OKLCh (the perceptual lightness lift along the ridge, constant hue — a silk sheen LIGHTENS, never recolors), reusing the EXISTING `procedural-color.glsl.ts` / `procedural-color.wgsl.ts` shared OKLCh chunk (ONE color source across both backends — `proof:single-color-core` holds, no re-implemented matrix).

The dispatch wiring (lockstep, both backends):
- GLSL: `mediumSatin()` body in `mediums.glsl.ts` + `else if (uMedium == 8) col = mediumSatin(col, pN, t);` appended to the `main()` ladder in `aurora.frag.ts` AFTER the `== 7` kuwahara branch.
- WGSL: the WGSL twin `fn mediumSatin(...)` in `aurora-mediums.wgsl.ts` + `if (medium == 8) { return mediumSatin(col, p, t); }` in `applyMedium`. The WGSL gets the REAL satin body (NOT a smooth degrade — the BC.W-VIZ-AURORA "NO FALLBACKS on Safari" mandate: on Safari 26 a satin config paints the full painterly satin, never a silent smooth fall). The painterly scalars satin reads (sheenExp/foldScale) ride the EXISTING appended `scalars4`/`scalars5` struct lanes written in lockstep by `packAuroraWGPUUniforms` — no new uniform-struct lane unless a genuinely new scalar is needed, and if one is, it is added to BOTH the GLSL uniform + the WGSL struct + the JS pack in lockstep (the typed-struct discipline — a one-sided add reds parity).
- `MEDIUM_ID.satin = 8` (`uniformBridge.ts`); `AuroraMedium` union widens additively to include `"satin"` (`presets.ts` — no breaking change).
- The `dist/aurora.js` budget lifts for the satin GLSL growth (the kuwahara-lift precedent — `proof:budget` rebaseline).

## The gate — proof:aur-satin (born-RED → GREEN)

A SOURCE/STRUCTURE parse (device-free, `local`+`ci`), mirroring `proof:aur-kuwahara`'s shape; the binding painterly DELTA rides the π + the `proof:ba-gestalt` aurora verdict (W-REFLECT):

- **C1 — the satin body lands coherently in GLSL.** `mediumSatin()` body present in `mediums.glsl.ts`; the `uMedium == 8` dispatch present in `aurora.frag.ts`'s `main()` ladder AFTER the `== 7` branch; `MEDIUM_ID.satin === 8` in `uniformBridge.ts`; `"satin"` in the `AuroraMedium` union (`presets.ts`). Born-RED: all absent at HEAD.
- **C2 — the WGSL twin is in LOCKSTEP (the GL-fence).** `fn mediumSatin` present in `aurora-mediums.wgsl.ts`; the `medium == 8` branch present in `applyMedium`; the WGSL satin is a REAL body (NOT a fall-through to smooth/`return col` — the "no Safari fallback" mandate). Any uniform lane satin reads is added to BOTH the GLSL uniform AND the WGSL struct AND the JS `packAuroraWGPUUniforms` (the parity-lockstep — a one-sided add reds).
- **C3 — DEFAULT byte-identical (the opt-in fence).** `MEDIUM_ID.smooth === 0` and the satin branch is gated STRICTLY behind `uMedium == 8` — the default `medium: "smooth"` path carries NO `mediumSatin` call on either backend, so the parity capture stays byte-equivalent. The atom fan-out (`atoms.ts` `mediumFor`) NEVER auto-selects `"satin"` (it is reached only by an explicit config — the default-unchanged fence).
- **C4 — the satin operator is the FOLD-SHEEN, not a recolor.** The body reads the domain-warp gradient (the fold normal) + a directional `dot(N, …)` sheen + the OKLCh LIGHTNESS lift (constant-hue — a sheen lightens, never recolors); it routes its color math through the shared `procedural-color` chunk (no hand-rolled OKLCh matrix — `proof:single-color-core` fence).
- **C5 — the GL-shader fence on `aurora.frag` core.** The pre-existing nuclei-field/tonemap/OETF body is byte-untouched (satin is an APPENDED dispatch branch + a new body, not a re-tune of the smooth core).
- **Self-test bites (`--self-test`):** (a) a WGSL `applyMedium` that falls `medium == 8` through to `return col` (a smooth degrade) MUST red C2 (the no-Safari-fallback bite); (b) an `atoms.ts mediumFor` auto-selecting `"satin"` MUST red C3 (the default-byte-identical fence); (c) a hand-rolled `oklch`/`oklab` matrix inside `mediumSatin` MUST red C4 (the single-color-core fence); (d) a GLSL-only add (no WGSL twin) MUST red C2 (the lockstep bite).

WHAT REDS ON THE PRE-FIX TREE: C1 + C2 (the satin body + dispatch absent on both backends), the gate born-RED until the lockstep build lands.

## The binding π — tests-visual/aur-satin.spec.ts

The painted-truth readback over the satin render, BOTH modes + the **webkit project** (Safari-first — the satin medium MUST paint the real fold-sheen on Safari 26, not a smooth degrade):

- **The default is byte-identical.** The `medium: "smooth"` aurora capture matches the pre-wave baseline (the parity floor — the opt-in fence is painted-true, not just gated).
- **The satin sheen reads directionally.** Mount aurora with `medium: "satin"`; sample the painted field — the satin render carries a DIRECTIONAL highlight band (a luma readback along the `uFlowAngle` axis reads a brighter ridge than the cross-axis — the silk sheen is anisotropic, not a uniform brighten). The sheen tracks the directional key-light (rotating `uFlowAngle` moves the ridge).
- **The fold reads as silk, not a recolor.** The satin field's per-region HUE matches the smooth field's hue (the OKLCh lift is constant-hue — a luma lift, never a hue shift); only the LIGHTNESS varies along the folds.
- **The webkit twin paints the real satin.** The Safari project renders the satin body (NOT the smooth core) — the WGSL lockstep is painted-true on WebKit.

The measured assertions are getComputedStyle/canvas-readback luma + OKLab-hue scans (the live-π oklab paint-arm), captured both-mode + webkit, surface-hash fresh.

## The gestalt row

BF-roster surface (W-GESTALT-WIRE mints; this wave flips it at its own close on a FRESH whole-page both-mode `:5199` capture, NEVER reducedMotion):

- **`aurora-satin`** — the album-art aurora reads as folded silk catching a directional key-light (the V2 Heavy Rotation reference): the silky light-bending fold, the directional sheen along the ridges, the warm-cream/album palette, both modes; the default smooth register un-regressed beside it.

The verdict requirement: operative-PASS IFF the fresh capture reads as the silk-fold satin gestalt AND the per-surface surface-hash is fresh (the anti-evasion floor). The wave closes `complete_with_misses` if the satin render does NOT read as the reference silky fold (a gestalt judgement re-earned on a fresh capture).

## Fences

- **The GL-shader fence (ABSOLUTE).** `aurora.frag.ts`'s pre-existing nuclei-field/tonemap/OETF body is byte-untouched; satin is an APPENDED dispatch branch + a new `mediumSatin` body, never a re-tune of the smooth core. The WGSL `aurora.wgsl.ts` core is likewise untouched (only the `aurora-mediums.wgsl.ts` splice grows + the `applyMedium` branch).
- **The lockstep fence (the GL-fence, both backends).** WebGL2 + WGSL ship the satin body in LOCKSTEP — a GLSL-only add reds C2. The WGSL is a REAL body (the BC "no Safari fallback" mandate), not a smooth degrade. Any uniform lane is added to BOTH the GLSL uniform AND the WGSL struct AND the JS pack (the typed-struct parity discipline).
- **Default byte-identical (the opt-in fence).** `medium: "satin"` is reached ONLY by explicit config; `atoms.ts mediumFor` never auto-selects it; the default smooth path is byte-equivalent on both backends (the parity capture stays GREEN).
- **Presets-in-consumers.** The album palette / "Heavy Rotation" preset lives in the demo (`demo/stories/aurora/presets.ts` — the `BE.W-AUR-PRESETS` rider, matched to the V2 cards), NEVER a library token. The library ships the satin MEDIUM (its identity); the album hues are the consumer's.
- **The single-color-core fence.** `mediumSatin`'s OKLCh sheen routes through the shared `procedural-color` chunk; it hand-rolls no color matrix (`proof:single-color-core` holds).
- **The anti-pattern this must not become.** A satin that recolors the field (a hue shift — silk lightens, never recolors) OR a one-sided GLSL add that degrades to smooth on Safari (the no-fallback mandate). C2/C4 + the webkit π assert against both.

## Disposition links

Closes PART of **D23** (the breadth bands — Aurora satin medium, `uMedium==8`). The prism medium (`uMedium==9`) is the sibling `W-AUR-PRISM` (depends on this wave — it shares the medium-dispatch ladder + the lockstep discipline this wave establishes). The reactive DockStage seam (`W-AUR-REACTIVE`, presets-in-consumers) drives the satin's directional key-light off the now-playing pill — a later consumer of the sheen axis this wave mints.
