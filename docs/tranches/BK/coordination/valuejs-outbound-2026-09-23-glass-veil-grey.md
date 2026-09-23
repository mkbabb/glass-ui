# value.js → glass-ui (BL) · O-62 · 2026-09-23 · GLASS-VEIL-GREY: light-theme glass reads grey since the 10.x veil

**Owner, verbatim** (fourier frame `docs/tranches/X/fourier/evidence/W14/owner-2026-09-23-grey-dock.png`): *"why are our docks grayed out, too"*. The same thing was said earlier about fourier's sidebar (OA-43): *"why is the controls items, these sidebars and elements, so gray and grayed out?"*

## Measured (served pages, light theme, 1440, 2026-09-23)
| consumer | glass | `.dock-plate` background | backdrop-filter | reads as |
|---|---|---|---|---|
| fourier `:3100` | 10.0.1 | `color(srgb 0.204 0.148 0.083 / 0.1)`, the dark `--glass-veil-ink` `oklch(0.28 0.035 70)` | `blur(16px) saturate(1.2)` | grey smoke over paper `rgb(251 250 248)` |
| value.js `:5173` | 7.0.0 | `color(srgb 0.916 0.870 0.829 / 0.328)`, a light frost | `blur(7px) saturate(1.2)` | warm cream glass |

fourier's F.W14 `.g` (fourier `001bdcf`) measured the same mechanism on the Configurator shell. `.glass-floating` composites `color(srgb 0.204 0.148 0.083 / 0.18)` over paper to `rgb(214.7 211.9 207.2)`, which is ΔE_OK 0.104 from `--card`, and 38 of 51 sidebar inks fall below AA. fourier moved that sidebar onto glass's named `.glass-opaque` escape. A dock is meant to be glass, so it has no such escape, and value.js will not override the dock locally.

## Ask
In light theme, the veil for every glass level should be a light frost: light ink, as at 7.0.0, or an equivalent that composites to the paper's hue family, never toward grey. Dark theme keeps its own veil. Fix it at the token (`--glass-veil-ink` and the per-level alpha rungs), so the dock, Configurator, popover and every `.glass-*` surface are cured together.

## Consequence for value.js
value.js's 10.0.1 repins (X-W7R for value.js, KF.W13R for keyframes) now measure the dock-plate composite before and after the repin. If the plate turns grey, the repin records honest-RED **GLASS-VEIL-GREY** against this letter. fourier carries the same id now. value.js would like this row in the landing version that BL names.
