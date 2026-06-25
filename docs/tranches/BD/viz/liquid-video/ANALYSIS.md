# Liquid-animation video — frame-by-frame analysis (the iOS-27 Control Center reveal)

Source: `ScreenRecording_06-22-2026 23-59-33_1.MP4` (1206×2622, 120fps, 12.2s — iPhone, iOS 26/27). 61 frames @5fps in `frames/`, sheets `sheet-0[0-6].jpg`. The reference the user wants replicated GENERALLY in the liquid animation suite, Safari-compatible: "the animation elements SQUISH and MORPH, gracefully so, and FADE IN/OUT."

## What the recording shows
The **Control Center open → settle → dismiss → re-open** cycle (twice). The canonical iOS Liquid Glass entrance.

## Frame-by-frame (the cycle)
- **~0.0-0.8s (f1-4):** home screen, static (app grid, the green/olive wallpaper).
- **~0.8s (f5):** swipe-down begins — the Control Center modules START to MATERIALIZE from the top edge: transparent + SQUISHED (scaled-down, the round controls noticeably small), the home screen begins to BLUR behind.
- **~0.8-2.0s (f5-10):** the modules **SCALE UP from squished → full + FADE IN (opacity 0→1) + SETTLE with a spring overshoot** (a graceful slight-overshoot-then-settle); the round toggle buttons visibly GROW small→full (the volume-preserving squish-scale); the backdrop blur deepens (the glass refraction engages). Each module (connectivity quad · music player · brightness/volume sliders · the round toggles) animates in near-together with a subtle stagger.
- **settled (~2.0s):** Control Center fully open — crisp glass modules over the blurred home, the six-layer composite reading (rim, catch-light, grain, the backdrop concentrate).
- **dismiss:** the modules **SQUISH + FADE OUT** (scale-down + opacity→0), the home screen UN-BLURS back to sharp — the exact inverse, no overshoot-past-gone (a closing surface must not overshoot).
- **re-open:** the cycle repeats (the squish-grow on the round controls is the most legible deformation).

## The decomposition — THREE coupled channels (the liquid-entrance grammar)
1. **TRANSFORM (squish/morph):** scale FROM a squished state (≈0.88-0.92, volume-preserving — a slight `scaleY`-compress with the reciprocal `scaleX` so volume holds) → 1.0 with a spring OVERSHOOT (the graceful settle). The bloom emerges from the SOURCE edge (transform-origin at the top, where the gesture pulls from). The round controls show the squish most (small→full).
2. **OPACITY (fade):** coupled 0→1 on enter, 1→0 on exit — locked to the transform clock (never a separate fade).
3. **BACKDROP (the glass engage):** the backdrop `blur`/`saturate` deepens as the overlay arrives (the refraction concentrate) — on the surface's OWN entrance, coupled to the same spring.

The FEEL: snappy-bouncy enter (overshoot), no-overshoot exit (§6 / W-MOTION-CANON P2), fade-coupled-to-transform (P3), compositor-only (P5), the volume-preserving squish is the GRACE (not a flat scale — the deformation is what reads as liquid).

## Library mapping — the primitives EXIST; the gap is GENERALIZATION + grace + Safari
The suite already ships the exact grammar:
- **`.glass-reveal`** (W-LIQUID-REVEAL, `glass/reveal.css`) — the zero-JS top-layer recipe: scale/translate on `--spring-snappy` + fade + `filter` blur-settle, transform-origin at the anchor. **The Control-Center recipe, present — but applied ONLY to the reka top-layer overlays.**
- **`useLiquidReveal`** — the source-rect bloom JS refinement (ElementMorph FLIP from the trigger). ✓
- **`useLiquidFlex`** — the volume-preserving X/Y reciprocal squish. ✓ (the squish channel)
- **`useDragMorph`/`useLiquidPress`/`useSpringPress`** — the press/drag squish. ✓
- the `--spring-bouncy`/`--spring-snappy` presets + their per-spring duration clocks — the overshoot. ✓

**THE GAP (the wave):**
1. **GENERALIZATION** — the squish/morph/fade entrance is NOT applied across the suite. Only top-layer overlays bloom; CARDS, CONTROLS, list items, the dock modules, the demo sub-sections do NOT get the control-center-grade entrance. The user wants it GENERAL.
2. **GRACE (the squish pronounced)** — the default `.glass-reveal` scale is subtle (≈0.95-1.0); the iOS-27 reference squishes more (≈0.88) with a clear volume-preserving deformation + the overshoot. The squish must be the calibrated GRACE, not a near-invisible scale.
3. **SAFARI** — the `filter` blur-settle + the `linear()` spring + the compositor-only transform/opacity must be verified on WebKit (the `backdrop-filter` animation is the Safari-fragile leg — the surface's OWN `filter` blur is safe; a `backdrop-filter` re-blur per-frame is the cost the §7 fence watches).

## The wave (proposed — Band-17 / motion-band augment)
**`W-LIQUID-ENTRANCE-GENERAL`** — generalize the iOS-27 squish/morph/fade liquid entrance across the suite: a `v-liquid-enter` directive + a `.liquid-enter` recipe (composing `.glass-reveal` + `useLiquidFlex` squish) that EVERY surface-class entrance (card, control, list-item, dock-module, demo sub-section, the Band-16 glassy sub-cards) opts into, with the CALIBRATED graceful squish (≈0.88 volume-preserving + the snappy-bouncy overshoot, fade-coupled), PRM-carved, compositor-only, SAFARI-verified (the `filter` blur-settle on WebKit). Real gate: a π FRAME-SERIES readback — the entrance squishes (scale ≠ 1 mid-flight + volume-preserving X·Y≈1) + fades (opacity coupled) + settles (spring overshoot then 1.0) on the enrolled surfaces, BOTH engines (chromium + webkit); born-RED on a flat/instant/fade-only entrance. This is the user's "replicate generally in our liquid animation suite, Safari compatible." It AUGMENTS W-LIQUID-REVEAL (not a re-fork) + binds the Band-16 glassy-sub-card entrance.
