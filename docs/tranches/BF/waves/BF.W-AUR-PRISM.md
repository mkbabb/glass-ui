# BF.W-AUR-PRISM — the album-art aurora prism burst medium (uMedium==9, the prismatic radial station bursts)

**Band 6 · Tier B-par · depends: W-AUR-SATIN, W-GESTALT-WIRE, W-PI-AUTHOR**

## The defect / the ask

The BE WAVE-LIST sites `BE.W-AUR-PRISM` (critical): "`burst` (uMedium==9): angular palette around uFlowFocal → the prismatic station bursts" — the V2 album-art reference (the prismatic radial bursts radiating from a focal point, like light split through a prism around a station). The audit confirms it was **never built**: `grep -rn "prism\|burst\|MEDIUM_PRISM\|uMedium == 9" src/components/custom/aurora/` returns ZERO hits. It is part of the open breadth (census **D23** — "Aurora satin/prism (`uMedium==8/9`)").

The same medium-ladder source `W-AUR-SATIN` is grounded in applies: `MEDIUM_ID` (`uniformBridge.ts:42-55`, ending at `kuwahara:7` pre-BF, `satin:8` after the sibling wave), the GLSL `main()` dispatch (`aurora.frag.ts:400-406`), the WGSL `applyMedium` (`aurora-mediums.wgsl.ts:300-312`), the `AuroraMedium` union (`presets.ts:61-75`). The KEY substrate the prism reads — the focal point + flow seed — already exists: `uniform vec2 uFlowFocal` (`aurora.frag.ts:100`) is the radial-burst center; `uniform float uFlowAngle` (`aurora.frag.ts:101`) the seed angle.

This wave DEPENDS on `W-AUR-SATIN` because it shares the medium-dispatch ladder (satin lands `uMedium==8`, prism extends to `uMedium==9` — the ladder must extend monotonically, and the lockstep + opt-in discipline satin establishes is the same machinery prism rides). Sequencing satin first keeps the ladder extension serial + the parity-rebaseline coherent.

## The mechanism

A new OPT-IN medium body `mediumPrism()` (uMedium==9) — the prismatic radial burst — added to BOTH the GLSL `mediums.glsl.ts` AND the WGSL `aurora-mediums.wgsl.ts` in **LOCKSTEP** (the GL-fence the satin wave + kuwahara established). Default byte-identical: prism is reached ONLY by an explicit `medium: "prism"`; the default smooth path (uMedium==0) is byte-equivalent on both backends.

The prism operator (procedural-field, no FBO):

- **Angular palette-sampling around the focal.** The radial-burst signature: the field samples the palette by the ANGLE around `uFlowFocal` (`atan2(p.y - uFlowFocal.y, p.x - uFlowFocal.x)`), so the palette ramp wraps AZIMUTHALLY into spokes radiating from the focal — light split through a prism. The angular palette index `paletteId = fract((angle / TAU) * spokeCount + spokeRotation)` is fed to the EXISTING `samplePalette()` (the same palette LUT the smooth field reads — ONE palette source, no recolor; the prism re-MAPS the existing palette into angular spokes, it does not mint new colors).
- **Radial falloff (the burst).** The angular spokes are gated by a radial-distance falloff from the focal (a `smoothstep` window keyed off `length(p - uFlowFocal)` and `uStrokeScale` — the burst RADIUS), so the prism is a STATION burst (concentrated near the focal, fading to the base field at the rim), not a full-frame kaleidoscope. The burst rides `uStrokeAmount` (the studio amount knob — `uStrokeAmount=0` passes the raw field through; default → full burst) so the prism blends INTO the underlying field, never replacing it.
- **The spoke rotation (the living shimmer).** A slow `t`-driven `spokeRotation` term (bounded — the §6 calm register, NOT a strobing disco) rotates the spokes so the prism breathes; the rotation is the same `t` clock the breath wobble reads (no second clock). The reactive seam `W-AUR-REACTIVE` later nudges `uFlowFocal` toward the now-playing pill so the burst centers on the active accent — this wave mints the burst axis; the reactive consumer drives it.

The dispatch wiring (lockstep, both backends, the satin-wave pattern):
- GLSL: `mediumPrism()` body in `mediums.glsl.ts` + `else if (uMedium == 9) col = mediumPrism(col, pN, t);` appended to `main()` in `aurora.frag.ts` AFTER the `== 8` satin branch.
- WGSL: `fn mediumPrism(...)` in `aurora-mediums.wgsl.ts` + `if (medium == 9) { return mediumPrism(col, p, t); }` in `applyMedium`. The WGSL gets the REAL prism body (NOT a smooth degrade — the "NO FALLBACKS on Safari" mandate). The focal/burst-radius/spoke-count scalars ride the EXISTING `uFlowFocal` uniform + the appended `scalars4`/`scalars5` struct lanes (any genuinely new scalar added to BOTH the GLSL uniform + the WGSL struct + the JS pack in lockstep — the typed-struct parity discipline).
- `MEDIUM_ID.prism = 9` (`uniformBridge.ts`); `AuroraMedium` union widens additively to include `"prism"` (`presets.ts` — no breaking change).
- The `dist/aurora.js` budget lifts for the prism GLSL growth (the kuwahara/satin-lift precedent — `proof:budget` rebaseline).

## The gate — proof:aur-prism (born-RED → GREEN)

A SOURCE/STRUCTURE parse (device-free, `local`+`ci`), mirroring `proof:aur-satin`/`proof:aur-kuwahara`; the binding painterly DELTA rides the π + the `proof:ba-gestalt` aurora verdict (W-REFLECT):

- **C1 — the prism body lands coherently in GLSL.** `mediumPrism()` body present in `mediums.glsl.ts`; the `uMedium == 9` dispatch present in `aurora.frag.ts`'s `main()` ladder AFTER the `== 8` satin branch (the monotonic ladder — satin MUST already be present, the dep); `MEDIUM_ID.prism === 9`; `"prism"` in the `AuroraMedium` union. Born-RED: all absent at HEAD.
- **C2 — the WGSL twin is in LOCKSTEP (the GL-fence).** `fn mediumPrism` present in `aurora-mediums.wgsl.ts`; the `medium == 9` branch present in `applyMedium`; the WGSL prism is a REAL body (NOT a fall-through to smooth — the no-Safari-fallback mandate). Any uniform lane is added to BOTH backends + the JS pack (parity-lockstep).
- **C3 — DEFAULT byte-identical (the opt-in fence).** The prism branch is gated STRICTLY behind `uMedium == 9`; the default `medium: "smooth"` path carries NO `mediumPrism` call on either backend; `atoms.ts mediumFor` NEVER auto-selects `"prism"`.
- **C4 — the prism operator re-MAPS the palette, it does not recolor.** The body reads the ANGLE around `uFlowFocal` (the `atan2` radial-burst signature) + the existing `samplePalette()` LUT (no hand-rolled palette, no new colors — the angular re-map of the ONE palette source) + the radial-falloff burst window (concentrated near the focal, not a full-frame kaleidoscope). The angular sampling routes through the shared palette/color chunk (no hand-rolled OKLCh matrix — `proof:single-color-core` fence).
- **C5 — the GL-shader fence on `aurora.frag` core.** The pre-existing nuclei-field/tonemap/OETF body byte-untouched (prism is an APPENDED branch + a new body).
- **Self-test bites (`--self-test`):** (a) a WGSL `applyMedium` falling `medium == 9` through to `return col` MUST red C2 (the no-Safari-fallback bite); (b) an `atoms.ts mediumFor` auto-selecting `"prism"` MUST red C3 (the default-byte-identical fence); (c) a `mediumPrism` that mints colors off a hand-rolled ramp instead of `samplePalette` MUST red C4 (the one-palette-source fence); (d) a GLSL-only add (no WGSL twin) MUST red C2 (the lockstep bite); (e) a prism `uMedium == 9` branch placed BEFORE the `== 8` satin branch (a non-monotonic ladder, the dep broken) MUST red C1.

WHAT REDS ON THE PRE-FIX TREE: C1 + C2 (the prism body + dispatch absent on both backends); the gate born-RED until the lockstep build lands atop the satin ladder.

## The binding π — tests-visual/aur-prism.spec.ts

The painted-truth readback over the prism render, BOTH modes + the **webkit project** (Safari-first — the prism MUST paint the real angular burst on Safari 26):

- **The default is byte-identical.** The `medium: "smooth"` aurora capture matches the pre-wave baseline (the opt-in parity floor).
- **The burst reads as radial spokes around the focal.** Mount aurora with `medium: "prism"` + a known `uFlowFocal`; the painted field carries ANGULAR palette spokes radiating from the focal (an angular hue scan around the focal reads a periodic palette wrap — the spoke count; a radial scan reads the falloff window — concentrated near the focal, fading at the rim). Moving `uFlowFocal` re-centers the burst.
- **The prism re-maps the palette, not recolors.** The prism field's palette colors are a subset/re-arrangement of the smooth field's palette (the angular re-map of the ONE LUT — no out-of-palette hue appears).
- **The webkit twin paints the real prism.** The Safari project renders the prism body (NOT the smooth core) — the WGSL lockstep is painted-true on WebKit.

The measured assertions are angular/radial getComputedStyle/canvas hue+luma scans (the live-π oklab paint-arm — assert the angular periodicity + the radial falloff), captured both-mode + webkit, surface-hash fresh.

## The gestalt row

BF-roster surface (W-GESTALT-WIRE mints; this wave flips it at its own close on a FRESH whole-page both-mode `:5199` capture, NEVER reducedMotion):

- **`aurora-prism`** — the album-art aurora reads as prismatic radial station bursts (the V2 reference): light split into angular spokes radiating from a focal, concentrated near the station, breathing slowly, the album palette wrapped azimuthally, both modes; the default smooth register un-regressed beside it.

The verdict requirement: operative-PASS IFF the fresh capture reads as the prism-burst gestalt AND the per-surface surface-hash is fresh. The wave closes `complete_with_misses` if the prism does NOT read as the reference radial burst (a gestalt judgement re-earned on a fresh capture).

## Fences

- **The GL-shader fence (ABSOLUTE).** `aurora.frag.ts`'s nuclei-field/tonemap/OETF core byte-untouched; prism is an APPENDED dispatch branch + a new `mediumPrism` body. The WGSL `aurora.wgsl.ts` core untouched (only the `aurora-mediums.wgsl.ts` splice + the `applyMedium` branch grow).
- **The lockstep fence (both backends).** WebGL2 + WGSL ship the prism body in LOCKSTEP — a GLSL-only add reds C2; the WGSL is a REAL body (the no-Safari-fallback mandate); any uniform lane is added to BOTH backends + the JS pack.
- **Default byte-identical (the opt-in fence).** `medium: "prism"` is reached ONLY by explicit config; `atoms.ts mediumFor` never auto-selects it; the default smooth path is byte-equivalent on both backends.
- **The monotonic-ladder fence (the dep).** Prism extends the ladder AFTER satin's `uMedium==8` — the dispatch order is `… == 7 (kuwahara) … == 8 (satin) … == 9 (prism)`; C1 asserts the satin branch precedes prism (the dep is structural, not just a sequencing note).
- **The one-palette-source fence.** The prism re-MAPS the existing `samplePalette()` LUT azimuthally; it mints NO new colors and hand-rolls no palette (`proof:single-color-core` holds).
- **The calm-register fence (§6).** The spoke rotation is a slow bounded `t`-driven breath, NOT a strobing disco kaleidoscope — the dignified §6 register, no second clock.
- **Presets-in-consumers.** The album palette / prism-burst preset lives in the demo (`demo/stories/aurora/presets.ts`), never a library token. The library ships the prism MEDIUM; the album hues + the focal placement are the consumer's (the reactive seam `W-AUR-REACTIVE` drives the focal off the now-playing pill — presets-in-consumers, not a library edit).
- **The anti-pattern this must not become.** A prism that mints out-of-palette colors (a hand-rolled rainbow ramp — it must re-map the ONE palette source) OR a full-frame kaleidoscope (it must be a focal-concentrated burst, the radial falloff) OR a one-sided GLSL add degrading to smooth on Safari. C4/C2 + the webkit π assert against all three.

## Disposition links

Closes PART of **D23** (the breadth bands — Aurora prism medium, `uMedium==9`), completing the satin/prism aurora pair `W-AUR-SATIN` opened. The reactive DockStage seam (`W-AUR-REACTIVE`, presets-in-consumers) drives the prism's `uFlowFocal` toward the now-playing pill — a later consumer of the burst axis this wave mints. The album-derived palette re-seed stays a CONSUMER-side seam (D26's GL color-seam fence — the library ships the burst MECHANISM, the album hues live in the consumer).
