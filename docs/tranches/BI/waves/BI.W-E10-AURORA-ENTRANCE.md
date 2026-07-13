# BI.W-E10-AURORA-ENTRANCE — the palette-derived aurora entrance (no repulsive-gray fade)

Band B5 (substrates) + D-MOTION coordination. The page-load entrance stops fading in from a repulsive
gray; first paint is the palette-derived nuclei-composite ground and the field warms INTO it, content
entering OVER the already-colored field.

## §Mandate

Discharges (registry rows this wave OWNS):
- **UF-E10** — "the loading screen and animation for pages, that the fade in from a repulsive gray color,
  like on /foundations/intro is totally wrong. The aurora start animation should be based on the colors
  thereof and be properly, beautifully defined." (/foundations/intro flagship).

## §Design

Decided mechanism — the UF-E10 orchestrator diagnosis (three stacked tone shifts, all named) + D-VIZ (the
ground) + D-MOTION (the route-enter register split: field vs content). NO re-litigating the diagnosis (live
repro owed at build; the three mechanisms are file:line-named).

- **The three HEAD defects (the diagnosis, not relitigated):** (a) the capable-path aurora placeholder is
  the CHEAP flat `linear-gradient(135deg, …)` band (`Aurora.vue:143-144` admits it; the luminance-faithful
  `auroraFallbackGround` raster EXISTS but serves ONLY the software-raster path); (b) `gl-route-enter` fades
  the WHOLE route root atomically from `opacity:0` (`transitions.css:311`) over a hero page whose shell field
  is SUPPRESSED (`focal.ts`), so first frames composite against the bare page bg, not the field's colors;
  (c) the GL canvas cross-fade lands AFTER arm, stacking a third tone shift.
- **The AURORA ENTRANCE REGISTER (the fix):**
  1. **First paint = the palette-derived ground, never the flat band.** Promote `auroraFallbackGround`
     (`sampleAuroraField` — the shader's static nuclei-composite via the value.js `oklchToLinear` core, ONE
     color source) to the CAPABLE path's FIRST frame (or a palette radial composition). The flat
     `linear-gradient(135deg)` placeholder RETIRES from the capable path (clean break — the cheap band was
     the "repulsive gray/neutral" the user named).
  2. **The entrance is a DEFINED bloom choreography, not an atomic neutral fade.** The palette ground is
     visible from frame 0; the live GL canvas WARMS INTO it (a cross-fade FROM the palette ground TO the live
     field, same palette — no tone jump); the page CONTENT enters OVER the already-colored field.
  3. **The route-enter register SPLITS field vs content** (D-MOTION coordination): `gl-route-enter`
     (`transitions.css:311`) stops atomically fading the whole root from `opacity:0` — the FIELD is present
     (palette ground) from frame 0 and the CONTENT enters over it (the content gets the fade/rise, the field
     does not fade from neutral). On a hero page whose shell field is suppressed (`focal.ts`), the palette
     ground still paints (the suppression is of the LIVE field, not the palette ground).
- Compositor-only (the content enter rides the D-MOTION `cascade`/`enter` register; the field cross-fade is
  opacity-only over the palette ground); PRM keeps the fade, drops the transform (P6) — the palette ground is
  the static rest frame under reduce.

## §Work

- `src/components/custom/aurora/Aurora.vue:143-144` — promote `auroraFallbackGround` (or a palette radial
  composition) to the capable-path FIRST frame; retire the flat `linear-gradient(135deg)` placeholder from
  the capable path (keep it only as the SSR/no-canvas floor if a layered radial-gradient stack is not
  cheaper).
- `src/components/custom/aurora/…` (`sampleAuroraField` / `auroraFallbackGround`) — reuse the value.js
  `oklchToLinear` core (ONE color source; no re-implemented OKLCh math); the ground's mean + per-quadrant
  luminance match the live composite within the certify band.
- `demo/.../transitions.css:311` (`gl-route-enter`) — the field/content split: the field (palette ground) is
  present from frame 0; the content enters over it (the fade/rise moves to the content, not the root).
- `demo/.../focal.ts` — the hero-page field suppression suppresses the LIVE field, not the palette ground
  (the entrance colors from frame 0).
- Coordinate the content-enter register with the D-MOTION `cascade`/`enter-overlay` register (B7) — this wave
  owns the FIELD half; D-MOTION owns the content-enter register table.

## §Acceptance

Gate: **`proof:aurora-entrance`** (NEW).
Born-RED at HEAD: the capable-path first frame is the flat `linear-gradient(135deg)` band; `gl-route-enter`
fades the whole root atomically from `opacity:0`. GREEN here.
- AE1 — the capable-path aurora first frame is the palette-derived ground (`auroraFallbackGround` / a palette
  composition), NOT the flat `linear-gradient(135deg)` band (a flat-band first frame REDs).
- AE2 — the ground reuses the value.js `oklchToLinear` core (ONE color source — no re-implemented OKLCh
  math); mean + per-quadrant luminance within the certify band of the live composite.
- AE3 — `gl-route-enter` splits field vs content: the field is present from frame 0; the content (not the
  root) carries the enter (an atomic whole-root `opacity:0` fade REDs).
- AE4 — PRM: the palette ground is the static rest frame; the fade survives, the transform drops.
- Self-test bite: a planted flat-band capable-path first frame REDs; a planted atomic-root-fade `gl-route-enter`
  REDs; a planted re-implemented OKLCh math (not the value.js core) REDs.

## §π/DELTA

`tests-visual/aurora-entrance.spec.ts` (NEW; LOCAL real-GPU) + `W-E10-AURORA-ENTRANCE-DELTA.md`:
- **The /foundations/intro flagship entrance frame-series:** frame 0 is the palette-derived ground (NO gray
  neutral); the live field warms INTO it (no tone jump — the cross-fade is same-palette); the content enters
  OVER the already-colored field. The three HEAD tone shifts (flat-band → gray-composite → canvas-crossfade)
  are GONE — a single defined bloom. Both modes, Chrome + real WebKit.
- The PRM run: the palette ground paints as the static rest frame; the content fade survives.
- The setting-sun preset (W-AURORA-VIBRANCY candidate A) as the entrance surface — the palette ground reads
  warm-sun-with-pink from frame 0.
- Rides the W-PI-IN-CLOSE battery + the W-GESTALT-LEDGER-FILE motion/cross-page verdict (the "beautifully
  defined" entrance is a gestalt judgment re-earned on a fresh capture).

## §Obligations

- **Device run (SAF-1):** the entrance frame-series on real WebKit (the first-paint composite + the
  cross-fade timing on the Metal compositor). `dis:safari-metal-verify` seam.
- **Live repro owed at build** (the UF-E10 diagnosis names it) — reproduce the three stacked tone shifts on
  `/foundations/intro` before the fix, capture the single-bloom after.
- **D-MOTION coordination (B7):** the content-enter register split shares the route-enter register table —
  this wave owns the FIELD half (the palette ground + the field cross-fade); D-MOTION owns the content-enter
  register. No duplicate register; the two coordinate.
- No cross-repo ask (aurora + demo entrance; the `oklchToLinear` core is the existing value.js consume, no
  new ask).

## §Dispositions

- **The `auroraFallbackGround` software-raster-only scope** is WIDENED to the capable path (its luminance-
  faithful ground was built but served only the software-raster fall — this promotes it to the entrance
  first frame). The flat-band placeholder retires from the capable path. Terminal.
- The setting-sun preset (W-AURORA-VIBRANCY) is the reference entrance palette — coordinate, do not re-mint.

## §Inbound acceptance constraints (the 2026-07-12 marking pass — value.js T-60, JOINS UF-E10)

The value.js T-60 forensic (VALUEJS-T-COMMUNIQUE §1.1; measured 4-leg: the bloom stamps at
t≈224–316ms while the canvas sits at consumer opacity:0, so the visible arrival ALWAYS opens inside
the dim floor, brightness 0.54–0.83 at the flip) is the SAME defect as UF-E10 — one gray-entrance
register, not two. This wave therefore ALSO owns the PRODUCER half:
- **The reveal-bloom consumer door**: `revealBloom` is HARDWIRED true at `aurora/composables/runtime.ts:261`
  + `goo-blob/composables/useMetaballRenderer.ts:338` — the redesigned entrance must expose the
  door (opt-out AND/OR arrival-sync) on `AuroraRuntimeOptions` + the blob renderer options.
- **The palette-honest entrance floor**: the entrance NEVER transits a `saturate<1`/`brightness<1`
  veil over a chromatic field (`@keyframes substrate-reveal-bloom` from `brightness(0.4) saturate(0.7)`,
  `src/styles/viz-reveal.css:29-40`, is the condemned form) — first paint is palette-DERIVED
  (value.js co-signs this as our own UF-E10 law).
- **Oracle**: the value.js `t60-probe.mjs` 4-leg class (cold+returning × light+dark) — no
  achromatic/dim stage inside the visible window; runs on OUR π as well as theirs.
- Cross-link: the blob arms the SAME bloom — the door lands on BOTH runtimes (the wake-order arm,
  T-communiqué §2.4, is watched by BI.W-BLOB-SEAMS).
