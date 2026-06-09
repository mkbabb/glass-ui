# AX.W45-TUNE — dock-perfection close · live-capture DELTA

The TUNE+re-point perfection layer on the settled W45 structure (Q1/Q3/C1/C2/C4/C5/C7
+ the dock-glass W54-successor). Captured 2026-06-09 against
`localhost:5173/navigation/dock` on chromium. Full close detail + the Q3
rest-vs-hover readback table: [`W45-DELTA.md`](./W45-DELTA.md) (the shared dock
capture set — both the structural W45 wave and this perfection wave close on the
same dock surface).

## Captures (the dock surface — shared with W45)

| viewport | light | dark |
|----------|-------|------|
| desktop 1280 | `W45-dock-desktop-light.png` | `W45-dock-desktop-dark.png` |
| mobile 375 | `W45-dock-mobile-light.png` | `W45-dock-mobile-dark.png` |

## Verdict

**PASS.** The six CORE witnesses + C1 are live-verified (`proof:dock-perfection`
6/6 + C1=0 green): Q1 the collapsed pill is a tight proportioned squircle (not a
full-row stub); C1 the glyphs own `--dock-icon-glyph`; C2 the tile-pad scales with
`--dock-scale`; **Q3 the hover reads a 3-channel GLASS register** (bg →
`--glass-bg-resting` 0.65, scale → 1.1, specular 0 → 0.1 — the readback in
`W45-readback.json` / `W45-DELTA.md`); C4 the rest specular is 0 (the keyframes I.W6
19→0 tracks); C5 the selected/active control reads the `--glass-bg-floating` glass
register (the keyframes-dock model the user named); C7 the vertical body is
structural. The user's pass-3 Q1 + Q3 live contradictions are fixed and captured.
