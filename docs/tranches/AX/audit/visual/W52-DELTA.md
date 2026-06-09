# AX.W52 — liquid-glass material overhaul (D19) · live-capture DELTA

The D19 material overhaul: kill the central screen-disc bloom → a bounded
`plus-lighter` edge gleam, default-OFF at rest, the calm `saturate(1.18/1.2)`, the
glass button real-blur + the gold hover. Owed-DELTA backfill — the material is
captured across the W54 (card/button tiers) + W45 (dock controls) sweeps, which
render the W52 material as the default.

## Captures (shared — the material renders on every glass surface)

| surface | capture |
|---------|---------|
| Card tier ladder (wash→overlay) | `W54-card-desktop-light.png`, `W54-card-desktop-dark.png` |
| glass Button family | `W54-buttons-desktop-light.png` |
| dock-control material (rest vs hover specular) | `W45-readback.json` + `W45-dock-desktop-light.png` |

## Paired-π — the bounded-gleam, default-off discipline (`W45-readback.json`)

The D19 material's load-bearing claim is "no central bloom; the gleam is a bounded
edge catch-light that wakes on hover, off at rest." The dock-control readback proves
it on a real glass-material surface:

| state | `::before` specular opacity | verdict |
|-------|----------------------------|---------|
| rest | `0` | NO resting bloom (the gleam is dormant — the D19 default-off) ✓ |
| hover | `0.0999788` (≈0.1) | a whisper edge gleam wakes on hover, not a full-plate disc ✓ |

The `--glass-specular-size: 22%` (the bounded circle, not the unbounded plate) +
the `plus-lighter` blend are source-locked by `proof:liquid-glass-material`.

## Verdict

**PASS.** The Card tier ladder + glass buttons render as calm liquid glass (the
tamed `saturate`, the warm-cream curvature, no garish bloom), and the dock-control
readback confirms the bounded edge gleam is default-off at rest / a whisper on
hover — the D19 overhaul. `proof:liquid-glass-material` green.
