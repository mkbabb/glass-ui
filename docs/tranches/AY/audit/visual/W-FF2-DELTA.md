# AY.W-FF2 — Fourier-field intensity model LANDED · phosphor-comet visibility DELTA

This wave LANDS the W43 SOTA fourier-field intensity model that crossed TWO tranches
(AX.W43 authored-but-stopped → AY.W-FF inherited) without landing — the chronic
visible-invisibility the hardening lane named at the root. The flat
`OUTLINE_PEAK_ALPHA = 0.24` ceiling + the `age*age` quadratic body decay are GONE,
replaced by the per-variant six-field intensity bundle, the 3-pass phosphor-comet
render (the dark `lighter` / light `source-over` blend fork), the amplitude-descending
draw sort, the zero-alloc color hoist, and the `intensity?: number` outer-envelope
prop. The dead `evalFourier` export is deleted and the pure math leaf is promoted to
the `/fourier-math` subpath.

## The binding pre-edit witness (the BEFORE)

Both AX captures show the `final` preset as a **tiny faint red comet stub in the
corner** — the curve is effectively invisible (the 0.24-quadratic defect):

- `../../../AX/audit/visual/W18-fourier-field-desktop-light.png`
- `../../../AX/audit/visual/W18-fourier-field-desktop-dark.png`

This is the captured pre-edit truth the post-land capture pairs against.

## The AFTER (captured — the device gate's binding)

The post-land own-surface DELTA was captured live on the demo storybook
(`/substrates/fourier-field`, the "Two presets — one engine" section showing BOTH
`hero` + `final` legibly distinct), at 2 viewports × {light, dark}. The `final`
preset NO LONGER paints a corner stub — its comet trail traverses the frame, and
under `.dark` the additive `lighter` phosphor bloom lifts the beam:

- `W-FF2-fourier-field-desktop-light.png`
- `W-FF2-fourier-field-desktop-dark.png`
- `W-FF2-fourier-field-mobile-light.png`
- `W-FF2-fourier-field-mobile-dark.png`

**Captured 2026-06-09** against HEAD (`at-dock-convergence`, 3.9.0 ancestor) on the
live demo (`npm run dev`) via the π gate `npm run proof:fourier-field-visibility-live`
(the fail-CLOSED readback driver) + `tests-visual/fourier-field-visibility.spec.ts`.
The device gate read back, BOTH modes: `final` spanW/spanH = 1.0 (full traverse, NOT
a corner stub), hero painted-px > final painted-px (a distinct family), and a
non-zero trail-body mean in both light (`source-over` on cream) and dark (additive
`lighter` on ink) — the blend fork is live.

**Re-capture command** (the device gate that reads the painted canvas back over BOTH
presets × BOTH modes — the runtime observation, not a grep):

```
npm run dev                                   # the demo dev server (the π webServer)
npm run proof:fourier-field-visibility-live   # the fail-CLOSED π readback gate
```

The π spec (`tests-visual/fourier-field-visibility.spec.ts`) mounts the real
`<FourierField>` over a white ground for both presets × both modes under `freeze`,
reads back the painted canvas, and asserts: (1) `final` is NOT a corner stub (bbox
spans ≥25% of each axis); (2) the trail body reads (mean painted-intensity floor);
(3) both modes; (4) `intensity=0.4` recesses below `intensity=1`; (5) `hero` paints
more structure than `final` (a distinct family).

## What changed (the source DELTA)

| Defect (AX→AY chronic) | Fix |
|---|---|
| D1 — flat `OUTLINE_PEAK_ALPHA = 0.24` every layer | the six-field per-variant bundle (`peakAlpha`/`headGlowAlpha`/`headGlowBlur`/`epicycleRatios`/`trailFadeExp`/`trailFloor`) |
| D2 — `age*age` quadratic kills the body (the corner stub) | SOFT `age^trailFadeExp` (1.4/1.5) floored at `peak·trailFloor` — the body survives |
| D3 — sub-perceptible scaffolding | `epicycleRatios` ÷ peak (hero `{0.18, 0.30}`) |
| D4 — head glow not the strongest layer | `headGlowAlpha > peakAlpha` (head-forward) |
| D5 — no loudness knob | `intensity?: number` (default 1, clamp `[0, 2]`) — the Aurora `opacityCeiling` shape |
| D7 — per-frame color resolve 60×/s | hoisted onto the color/dark watch; the render reads a cached `rgb()` triple |
| D8 — no amplitude sort | `[...spectrum].sort((a, b) => b.amplitude - a.amplitude)` for the draw pass |
| D9 — flat single-pass stroke | the 3-pass phosphor-comet + the dark `lighter` / light `source-over` fork |
| D10 — dead `evalFourier` export | deleted from `index.ts` + `math.ts` (clean break); `/fourier-math` leaf minted |
| D11 — no 3-substrate parity | `:intensity="opacityCeiling"` threaded from `StoryHero.vue` (fourier hero recesses at parity with aurora) |

## Status

`live-verified` — the source land + both static (`proof:fourier-field-intensity`) and
device (`proof:fourier-field-visibility-live`, 2/2 specs GREEN) gates are authored and
pass, and the own-surface DELTA (4 PNGs, 2 viewports × {light, dark}) is on disk above.
The chronic AX→AY visible-invisibility is CLOSED at the root: the `final` preset READS
as a full-frame phosphor comet, light AND dark, no longer a corner stub.

The PROGRESS wave-row flip to `live-verified` is the orchestrator's roll-up edit (the
PROGRESS ledger is the orchestrator-owned shared-write surface). This DELTA backs that
flip — `proof:live-verified-ledger` (AY) is GREEN against it (own-surface `^W-FF2-`
PNGs + the {light, dark} pair).
