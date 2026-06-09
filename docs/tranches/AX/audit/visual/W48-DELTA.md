# AX.W48 — glass-material demo reauthor · live-capture DELTA

The glass-material demo narrated seams it never composed (a dead-plate story). W48
re-authored it to BIND the shipped seams. Captured 2026-06-09 against
`localhost:5173/substrates/glass-material` on chromium (π-lane Playwright).

## Captures

| viewport | light | dark |
|----------|-------|------|
| desktop 1280 | `W48-glass-material-desktop-light.png` | `W48-glass-material-desktop-dark.png` |

## Verdict

**PASS.** The story now BINDS the shipped material: one shared
`useSpecularTracking()` drives the live pointer-anchored catch-light across every
rung+card plate (hover writes `--mouse-x` → `::before` opacity lifts off the
dead-plate 0); the adaptive tint sets BOTH `--glass-tint-source` AND a non-zero
`--glass-tint-strength` (22%, ≤30% ceiling) so the `color-mix(in oklab,…)` bites;
the tint selector uses a real `<Button variant="glass">` (zero `glass-btn` token);
the squircle is shown on the dialog register (cards stay round); a rim on/off
device shows the deliberately-subtle `--glass-edge-light`. `proof:glass-material-demo`
green + the π moving-specular/biting-tint readback arm passed. Zero console errors.
