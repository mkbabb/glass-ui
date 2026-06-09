# AX.W45 / W45-TUNE — dock-perfection close · live-capture DELTA

The binding cardinal-lesson close for the dock band (the flagship — its prior
`live-verified` mark had no captured DELTA, the C10 violation; the user's pass-3 Q1
+ Q3 were the live contradictions). Captured 2026-06-09 against
`localhost:5173/navigation/dock` on chromium (π-lane Playwright).

## Captures

| viewport | light | dark |
|----------|-------|------|
| desktop 1280 | `W45-dock-desktop-light.png` | `W45-dock-desktop-dark.png` |
| mobile 375 | `W45-dock-mobile-light.png` | `W45-dock-mobile-dark.png` |

## Q3 — the hover REGISTER readback (the load-bearing close; `W45-readback.json`)

The user's pass-3 Q3 ("the hover effect for the dock and buttons is not right or
noticeable, only on click is it"). A real `page.hover()` on a `.dock-icon-button`,
rest vs hover getComputedStyle — **all three channels move on hover**:

| channel | REST | HOVER | verdict |
|---------|------|-------|---------|
| `background` | `rgba(0,0,0,0)` (on the dock substrate) | `srgb 0.982 0.981 0.978 / 0.65` (= `--glass-bg-resting`, a glass tier) | a clear GLASS surface wakes ✓ |
| `scale` | `1` | `1.1` (`--scale-hover-dock`) | the lift reads ✓ |
| `::before` specular | `0` (C4 rest default-off) | `0.0999788` (≈`--glass-specular-intensity-hover`) | the gleam wakes ✓ |

So the dock hover now reads as the glass surface waking — three legs together ON
HOVER, before any click. The prior sub-perceptual ink tint (Q3 defect) is gone.
The REST specular `0` is the C4 close (the keyframes I.W6 19→0 bloom tracks).

## Visual verdict (the screenshots)

**PASS.** Q1 — the collapsed dock is a TIGHT proportioned pill (the home glyph +
symmetric padding, `--dock-collapsed-summary-min-size` ≈0.7× control + the symmetric
`min-block-size` floor), NOT the full-control-width stub of HEAD. C1 — the dock
glyphs own their size via `--dock-icon-glyph` (the explicit demo overrides dropped),
so the mobile 1.5× scale paints. The media-transport, select/dropdown, rail, and
bottom-nav docks all read as clean glass pills with no resting specular bloom.
`proof:dock-perfection` green (all 6 CORE witnesses + C1=0). C5 the selected/active
control reads the glass `--glass-bg-floating` register (the keyframes-dock model).

Verdict: **PASS — the dock band is perfected + live-verified.** Q1 + Q3 (the user's
live contradictions) are fixed and captured; the 19 resting specular tracks → 0.
