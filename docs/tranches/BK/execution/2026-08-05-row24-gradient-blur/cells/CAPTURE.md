# RT-24A · the F50 paired capture — driver browser seat, 2026-08-05

Live Chromium (CDP) against the dev server at `:5400`, the cured row-24 tree (post-CURE-1..5,
uncommitted at capture time). Viewport 1440×979. Nine cells, all dpr-native screenshots.

## The engaged Slider — `/forms/slider`, before/after × light/dark

Grasp held via pointerdown on the thumb (released only after each capture). Measured during the
light grasp: the veil is a **BODY child** (the CURE-1 portal), rect `0,0 → 1440×979`,
`z-index: 49` = `calc(var(--z-overlay) − 1)` one rung under the host's engaged `50`,
`backdrop-filter: blur(20px) saturate(1.5)`, opacity `1`. Dark grasp: `--glass-veil-dim` computes
the dark-arm value `oklab(0.17 0.0103 0.0282 / 0.104)` — the mode assertion (X-E) both arms.

Cells: `f50-slider-{light,dark}-{before,after}.jpeg`.

## The graded Dialog — `/containers/dialog`, before/after × light/dark

Story toggle flipped `scrim → graded`, "Open graded dialog". Measured open: the
`data-slot="glass-graded-halo"` plate at full viewport `1440×979`,
`backdrop-filter: blur(20px) saturate(1.5)`, **`mask-composite: intersect, intersect`** (the §5
double-ramp), opacity `1`; dark arm computes the same `oklab(0.17 …/0.104)` dim. The scrim-mode
overlay (flat `blur(14px)`, no mask) is the distinct non-graded path, not captured as F50.

Cells: `f50-dialog-{light,dark}-{before,after}.jpeg`.

## The falsifier — `/substrates/aurora`, slider grasped inside `.configurator-aside`

The aside carries its own `backdrop-filter: blur(20px) saturate(1.5)` (79 sliders inside) — the
exact ancestor class that collapsed the pre-cure fixed plate to 13.5% coverage, inverted. Post-cure:
veil parent **BODY**, rect `0,0 → 1440×979`, **coverage 1.000**, `z-index: 49`. The collapsed
placement is the capture's own falsifier and it passes.

Cell: `f50-falsifier-configurator-nested.jpeg`.

## Verdict recorded

The capture meets its own gate (paired before/after · light AND dark · both named consumers · the
nested-in-configurator falsifier carried). Per `ASK.md` g2 / RATIFICATION §2 R-6, the ratified
default is recorded: **KEEP** — owner-reversible in one word.
