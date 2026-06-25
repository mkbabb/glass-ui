# JUDGE-2 — viz mechanics re-spec (paper-grid · concentric · dot-matrix)

**Wave** `BD.W-VIZ-RESPEC` · **Judged** 2026-06-23 · **Iteration** 2 · **Server** `http://localhost:5173`
**Method** LIVE chrome-devtools-mcp — navigated all three target pages, cropped the in-flow GPU
canvases to device-pixel bounds, ran per-pixel motion diffs over frames ~1.6s apart, computed OKLab
hue/chroma of field + line ink in BOTH modes, cross-read the BUILD-REPORT-2 levers + JUDGE-1.

## VERDICT: meetsBar = TRUE (3 of 3 decisively meet the directive)

| viz | mechanic correct? | decisive on directive? | verdict |
|---|---|---|---|
| **paper-grid** | YES — cell-twist (lines break at cell boundaries, NOT line-bow) | YES — now visible + floored twist + traveling crest | **PASS** |
| **concentric** | YES — level-set topographic iso-contours over the wave-warp | YES | **PASS** (unchanged) |
| **dot-matrix** | YES — 2D-plane background register + cursor gravity | YES | **PASS** (iter-1, untouched) |

The sole iter-1 FAIL (paper-grid drama) is CLOSED. The other two were byte-untouched this iteration
(BUILD-REPORT-2 confirms; `waveFlow` untouched → concentric structurally unaffected; dot-matrix not in
iter-2 scope) and re-verified live as un-regressed.

---

## 1. PAPER-GRID — PASS (the drama fix landed)

LIVE evidence: `judge2-papergrid-light2.png` (default light), `.judge-tmp/pg_crop.png` /
`pg_zoom.png` (canvas crop + zoom), `pg_dark_crop.png` (dark).

**Mechanic — CELL-TWIST, not line-bow (decisive).** The zoom crop shows the unambiguous signature:
the major rules **kink, break, and fragment AT cell boundaries** (each cell rotates about its own
center) and the minor cells warp into rhomboid/sheared shapes in the crest band while staying square
elsewhere. This is a deformation-gradient cell-twist, NOT the smooth continuous domain-warp line-bow
the user rejected. Directive #1 met: "the CELLS in local boxes SHOULD [wave]... the grid should TWIST
and MORPH as if a wave was passing OVER and THROUGH it."

**Visibility — the twist is now SEEN.** Lines read clearly at the raised `minorAlpha 0.12` /
`majorAlpha 0.22` (vs the iter-1 0.04 whisper). Line ink measured warm-amber:
- Light: line ink ≈ (190,179,169), **R−B +20.9**, OKLab hue **64.9°**, chroma 0.019 — warm, not gray.
- The cream-page substrate is OKLab L 0.95 hue 71°; the canvas sits on the configurator
  `glass-floating` plate (OKLab L≈0.79, the W-GLASS-CAL default tier), so the field reads as a dim
  warm-taupe (hue 59.5°, chroma 0.012) — that dimming is the **demo's glass plate**, not the viz
  (canvas bg = `rgba(0,0,0,0)`, transparent, confirmed). Not a viz gray-cast.

**Motion — a traveling wave (present, modest).** 2× DPR canvas crop, per-pixel diff over two frames
~1.6s apart: **1.77% of sampled pixels moved >24 RGB-sum**, mean RGB diff 3.1. The twist band migrates
between frames (the front travels). This reads as motion at a glance but is the calmest of the three
(see refinement note below).

**Both modes warm (W-DARK-MATERIAL holds).** Dark: field (73,63,55) OKLab **L 0.375 hue 60.8°**
chroma 0.019 — a luminous warm-brown, NOT gray/black; line ink (91,78,67) **R−B +24.5** hue 60.7°.
Cell-twist clearly visible. 0 console errors either mode.

## 2. CONCENTRIC — PASS (unchanged, re-verified)

LIVE evidence: `.judge-tmp/concentric_crop.png` + two-frame diff.

- Renders as **flowing nested level-set iso-contours** — warm-amber/orange topographic contours, nested
  closed loops, density bunching on steep ground / opening in basins. Exactly the user redirect: "should
  function as essentially the PAPER GRID but with concentric LEVEL-SET lines... vector calculus, level
  set, gradient topology." Clearly warm (orange contours), not gray.
- **Motion decisive**: two-frame diff **17.5% of pixels moved**, mean diff 15.2 — the contour topology
  visibly flows/morphs as the wave crosses. 0 errors.

## 3. DOT-MATRIX — PASS (iter-1, untouched, re-verified)

LIVE evidence: `.judge-tmp/dm_base_crop.png`.

- **2D background register present + live**: a wide field of fine warm-cream/amber dots fills the card
  (the `.dot-matrix-canvas`), reading as a flat 2D dot space — exactly "function more in a 2D SPACE as a
  background effect." The 3D dot-sphere is kept as a preset (additive layout axis per JUDGE-1).
- **Cursor gravity**: JUDGE-1 verified the dense dot-knot gathering toward a sustained cursor live
  (`judge-dm-gravity.png`). Not in iter-2 scope; the leaf is byte-untouched, so the iter-1 PASS stands.
  (This judge's synthetic `dispatchEvent` pointer sweep did not reach the renderer's pointer model — a
  harness limitation, not a regression; the field rendered correctly and the iter-1 real-pointer
  capture is the binding evidence.)

---

## Fences / identity / Safari (spot-checked)

- Warm-cream identity held BOTH modes; no teal/navy; only alpha + twist-magnitude + wave-timing knobs
  moved (BUILD-REPORT-2). Line ink is the warm `--foreground` (R−B +20.9 light / +24.5 dark).
- Compositor-only GPU fragment pass; canvas transparent; PRM zeroes `env·amp → theta=0 → square grid`
  by construction. concentric/dot-matrix shaders byte-untouched.
- `tanh`/`directedTwist` floor rides both the WGSL primary + WebGL2 fallback (single-math-source).

## Refinement note (NON-blocking — does not sink the PASS)

paper-grid's traveling-wave motion (1.77% frame motion) is decisively present but the **calmest** of the
three viz vs concentric's 17.5%. The cell-twist + visibility + warmth all clear the bar, so this is a
polish lever, not a defect. IF a future pass wants the front to read even more dramatically:
- raise `waveOmega` a hair further (1.05 → ~1.3) and/or drop `waveSigma` (0.42 → ~0.34) for a sharper,
  faster-sweeping crest;
- consider lifting `minorAlpha` one more step (0.12 → ~0.15) so the twisting minor cells carry more of
  the motion read (the major rules already read; the minor-cell rhomboids are where the twist lives);
- the demo glass-floating plate behind the canvas (OKLab L 0.79) dims the light render — if the page
  wants the cell-twist over true luminous cream, host the paper-grid over a `tier="field"`
  ShowcaseFrame (transparent plate) rather than the configurator-stage glass plate. This is a
  demo-staging choice, not a viz change.

None of these are required: the SET DECISIVELY meets the user directive as built.
