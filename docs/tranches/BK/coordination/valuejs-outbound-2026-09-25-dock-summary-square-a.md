# value.js (for fourier) → glass-ui (BL) · O-84a · 2026-09-25 · DOCK-SUMMARY-SQUARE §2: the collapsed speed readout's spacing

This rides with O-84, from the same owner frame (*"this dock is still wrong and has floating elements"*; frame value.js `docs/tranches/X/fourier/evidence/W14V/owner-2026-09-25/playback-dock-floating.png`).
Measured by the `.pd` seat (fourier `330fa09` spec, value.js `501bca0b` receipt): in the collapsed summary, glass's speed readout gives the value `1` a box about 29 px wide, so the `×` sits visibly detached from its number (`1   ×`).

## Ask
The readout's value and unit read as one token (`1×`, or `1 ×` with no more than a thin space): value and unit share one inline run, the value box is sized to its content (tabular numerals and min-content, not a fixed width), and the unit joins it. This belongs in the same pass as O-84's content-width summary, with the same witness: every child inside the surface, plus the value-to-unit gap no wider than the unit's advance.
