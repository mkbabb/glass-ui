# W-VIZ-CONCENTRIC — DELTA

The concentric viz now reads as **concentric ELLIPSOID LINES forming distinct WAVES** (the reference), NOT a smooth color blur / noise.

## The fix (render + generator, not a math rewrite)
- **RENDER:** the smooth-field→OKLCh-ramp blur is replaced by Inigo Quilez gradient-normalized distance-estimation isoline strokes — `de = |sin(phase)| / (|cos(phase)|·k·|∇r|)`, converted to a constant PIXEL width via `fwidth(phase)`, then `line = 1 - smoothstep(lineHalfW, lineHalfW+aa, dePx)`, brightest-wins `max` union over every family×ring crest. The gradient `|∇r|` is closed-form (the field is a sum of sinusoids) — verified analytic-vs-finite-difference to 1e-10. An analytic aliasing-fade (`smoothstep(π·0.6, π·1.2, fwidth(phase))`) keeps the field thin LINES where rings converge near a center.
- **GENERATOR:** the 5-octave Phillips turbulence ladder (the noise amplifier) is retired; the default is TWO clean low-frequency detuned rings over TWO tilted-ellipsoid families (`rotAlpha` per family, reusing the spare `centers[j].w` lane). The families BEAT into a low-frequency moiré envelope (the "distinct waves") — the crossing tilted ellipses + the radial Δλ detune.
- **DEFAULT:** warm-cream identity over transparent (the page reads through the troughs); the teal-on-navy is now a non-default named preset (`CONCENTRIC_PRESET_THEME`).
- **POINTER:** `usePointerVelocityField` is consumed (fed `tick(delta)` from the renderer frame via the `onFrame` setup hook — NO second rAF); `interactive: true` injects a transient cursor ring-family (position→center, velocity→tilt, burst→ripple weight).
- **CONFIGURATOR:** the binary theme `Switch` is replaced by a full `<Configurator>` (controls-on-the-right by default) driving families / base-wavelength / beat-detune / ellipsoid-tilt / render-mode / line-width / line-softness / contour-levels / speed / interactive / theme / paused.

## Captures
- `W-VIZ-CONCENTRIC-light.png` / `W-VIZ-CONCENTRIC-dark.png` — the painted lattice over a neutral ground (both modes): thin warm-amber/cream ellipsoid ring-lines from multiple sources crossing into a rich moiré interference lattice that reads as distinct sweeping waves. The warm-cream identity holds in both modes.

## Substrate note (orchestrator)
The headless SwiftShader substrate renders the canvas at the 300×150 default backing store (the `createGpuSubstrate` resize does not lift it headless — observed IDENTICALLY on `/substrates/aurora`, a substrate-wide Band-4 floor behavior, byte-fenced from this wave). The composited paint is correct (the π spec passes 6/6 on the composited layer; the magenta-isolated readback shows the full crisp lattice). The binding **real-Metal-GPU** capture at proper DPR is the orchestrator's paint-arm.

## Paint-arm (for the orchestrator)
- **Route:** `/substrates/concentric`
- **Canvas:** `[data-testid="concentric-canvas"]`
- **The eye should see:** thin bright ELLIPTICAL ring-lines spreading from 2-4 sources, crossing into a slow broad moiré envelope — concentric ellipsoid LINES forming distinct sweeping WAVES (cymatics ripples on a still pond, seen edge-on), warm-cream/amber identity, NOT a smooth color cloud and NOT teal-on-navy. Drag the cursor (interactive on) and a transient ripple-source follows it. Both modes.
