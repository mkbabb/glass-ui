# AX.W52 — liquid-glass material overhaul (D19) · live-capture DELTA

The D19 material overhaul: kill the central screen-disc bloom → a bounded
`plus-lighter` edge gleam, default-OFF at rest, the calm `saturate(1.18/1.2)`, the
glass button real-blur + the gold hover. This DELTA is the OWN-SURFACE re-capture
— the prior version cited only the W54 card/button + W45 dock neighbour pixels; on
the W-CARDINAL-INFRA own-surface filename-match clause (armed by adding `W52` to
`VISUAL-ALLOWLIST.json`) a row must reference its OWN `^W52-` surface.

Captured 2026-06-10 against the running demo
(`localhost:5199/substrates/glass-material`) on chromium-148 via the π-lane
Playwright (`tests-visual/_wdelta0-capture.spec.ts`) — the glass-material surface
is the SUBJECT, not incidental to a card-tier sweep.

## Own-surface captures (≥2 viewports × {light,dark})

| viewport | light | dark |
|----------|-------|------|
| desktop 1280 | `W52-material-desktop-light.png` | `W52-material-desktop-dark.png` |
| mobile 390 | `W52-material-mobile-light.png` | `W52-material-mobile-dark.png` |

Corroborating neighbour context (the material renders on every glass surface — the
W52 D19 material is the DEFAULT): `W54-card-desktop-light.png`,
`W54-buttons-desktop-light.png`, `W45-dock-desktop-light.png` + `W45-readback.json`.

## Paired-π readback — the bounded-gleam, default-off discipline (`W52-readback.json`)

The D19 material's load-bearing claim is "no central bloom; the gleam is a bounded
edge catch-light that wakes on hover, off at rest." The glass-material surface
readback proves it on the own surface:

| state | `::before` specular opacity | verdict |
|-------|----------------------------|---------|
| rest | `0` | NO resting bloom (the gleam is dormant — the D19 default-off) ✓ |
| hover | `0.1` | a whisper edge gleam wakes on hover, not a full-plate disc ✓ |

`--glass-specular-size` resolves the BOUNDED circle: `36%` globally
(`tokens/glass.css:270`), narrowed to `22%` on the dock control
(`--dock-control-specular-size`, `dock-controls.css:51`) — a bounded
`circle var(--glass-specular-size)` gleam, NOT the unbounded full-plate disc. The
`plus-lighter` blend + the bounded circle are source-locked by
`proof:liquid-glass-material` (the bounded-circle assert).

## Verdict

**PASS.** The glass-material surface renders the calm D19 liquid glass — the
unified glass-material grammar (the wash→overlay rung ladder + the glass-card)
over the aurora-tinted backdrop, the tamed `saturate`, the warm-cream curvature,
no garish central bloom. The own-surface readback confirms the bounded edge gleam
is default-off at rest (opacity 0) / a whisper on hover (opacity 0.1) — the D19
overhaul. W09's specular tune (D11 radials) is ABSORBED here: the bounded gleam IS
the proof the D11 full-plate radials are gone (see PROGRESS W09 → this DELTA).
`proof:liquid-glass-material` green.
