# JUDGE-1 — viz mechanics re-spec (paper-grid · concentric · dot-matrix)

**Wave** `BD.W-VIZ-RESPEC` · **Judged** 2026-06-23 · **Iteration** 1 · **Server** `http://localhost:5173`
**Method** LIVE chrome-devtools-mcp — navigated all three target pages, captured the in-flow GPU
canvases, motion sequences (frames ~1.5s apart), cursor-gravity dispatch, BOTH modes; cross-checked
the source mechanic (`waveField.ts` `cellTwist`) + the default constants.

## VERDICT: meetsBar = FALSE (2 of 3 decisively PASS; paper-grid's drama is insufficient)

| viz | mechanic correct? | decisive on directive? | verdict |
|---|---|---|---|
| **concentric** | YES — level-set topographic contours over the shared wave-warp | YES | **PASS** |
| **dot-matrix** | YES — 2D-plane register + strong cursor gravity well | YES | **PASS** |
| **paper-grid** | YES (cell-twist in source) | **NO — faint + subtle in the default light view** | **FAIL** |

The SET does not yet pass because the headline viz (paper-grid, the one the cell-warp leaf was minted
for) does NOT decisively read as "the grid TWISTS and MORPHS as a wave passes OVER and THROUGH it" in
its default light render. The mechanic is engineered correctly; it is just not VISIBLE/DRAMATIC enough.

---

## 1. CONCENTRIC — PASS (decisive)

LIVE evidence: `judge-concentric-1.png` / `judge-concentric-2.png` (light, two frames ~1.6s apart) +
`judge-concentric-dark.png`.

- Renders as **flowing nested level-set iso-contours** — a topographic map, NOT rigid concentric
  rings. Density bunches on steep ground, opens in basins (`1/|∇H|`). This is exactly the user's
  redirect ("level set, gradient topology, take inspiration from the paper grid + vector calculus").
- **Motion is decisive**: the contour topology visibly shifts/morphs between the two frames — the
  contours flow as the wave crosses (the "paper-grid kin" wave controls are wired: Twist max / Swell
  depth / Speed).
- **Warm identity holds in BOTH modes**: warm-amber over cream (light); warm-copper contours over a
  deep warm-brown — NOT gray/black — (dark). No teal/navy. 0 console errors.

## 2. DOT-MATRIX — PASS (decisive)

LIVE evidence: `judge-dm-1.png` (2D-plane default) + `judge-dm-gravity.png` (sustained pointermove
dispatched at 40%×45%).

- **2D-plane background register present** — a wide field of fine warm-cream dots fills the card; the
  "3D dot-sphere register (off = 2D-plane background default)" toggle confirms the additive `layout`
  axis (sphere KEPT as a preset). Matches "function more in a 2D SPACE as a background effect."
- **Cursor gravity decisive** — a bright dense knot of dots VISIBLY GATHERS toward the held cursor,
  with a sparser field around it. Clearly "MORE gravity," not the weak 0.08 parallax. 0 console errors.

## 3. PAPER-GRID — FAIL (the mechanic is right, the drama is not)

LIVE evidence: `judge-pg-default-full.png` (default light), `judge-pg-seq-1/2.png` (motion, ~1.5s
apart), `judge-pg-bold-A.png` (Bold-liquid preset), `judge-pg-dark.png` (dark) + the builder's own
`after-paper-grid-celltwist2.png`.

**What is RIGHT (confirmed):**
- The source mechanic is genuine cell-twist, NOT line-bow. `cellTwist` (`src/composables/glass/wave/
  waveField.ts`) computes the cell center `cc = (floor(g/cs)+0.5)·cs` and rotates the local coord
  `(g−cc)` by `theta` about it (+ a shear skew). This is the correct deformation-gradient model.
- The render DOES show localized non-uniform deformation: the lower-left/center cells warp into
  rhomboid shapes while the upper-right stays square (the traveling-band signature). Reads BEST in
  dark mode (`judge-pg-dark.png`) where the cell-twist is visible.

**Why it FAILS the bar:**
- In the **default LIGHT view it is barely visible**. The visibility ceiling is `minorAlpha: 0.04`
  (3% line opacity) / `majorAlpha: 0.11` — a 31° cell-twist at 4% opacity over cream is geometrically
  present but perceptually a whisper. The builder's own "after" screenshot does NOT show "cells
  visibly twist into diamond/rhombus shapes"; it shows a faint sheet with a hint of curvature.
- **The motion is too subtle/slow to read** — `judge-pg-seq-1.png` vs `seq-2.png` (1.5s apart) are
  near-identical; the traveling crest does not visibly sweep at a glance. Against the explicit
  "slower/BIGGER/more-dramatic" + [[feedback-liquid-weight-universal]] bar (the user already rejected
  subtle/half fixes), a whisper-faint, near-static-looking grid is a FAIL.
- The effective twist is further damped: `theta = twistMax · env · curlScalar`, and `curlScalar` is
  `clamp(curl.x, −1, 1)` which in practice sits ~|0.3–0.5|, so the average twist is ~10–15°, not the
  31° the constant header claims.

---

## CONCRETE REFINEMENTS (paper-grid only — concentric/dot-matrix pass)

The mechanic is correct; raise the DRAMA + VISIBILITY of the default light render. In
`src/components/custom/paper-grid/constants.ts`:

1. **Raise the line opacity so the twist is SEEN (the single biggest lever).** `minorAlpha 0.04 → 0.10–0.12`
   and `majorAlpha 0.11 → 0.18–0.22`. At 4% the geometry is invisible in light mode; the cell-twist
   only reads once the lines carry real ink. (This is the brand warm-amber ink, not gray — identity
   safe.) Re-verify it still reads as "graph paper," not a heavy grid.
2. **Lift the effective twist floor.** Either raise `twistMax 0.55 → 0.7–0.8` OR add a minimum-twist
   bias so cells in the crest band rotate visibly even where `curlScalar` is small (e.g. drive `theta`
   off `sign(curl)·max(0.4, |curl|)`, or add a constant rotational term gated by `env` so the crest
   ALWAYS produces ≥~20° regardless of the flow scalar). Today the curl scalar damps the twist to a
   whisper.
3. **Make the traveling wave READ as motion.** Narrow the band so the crest is a distinct moving
   front (`waveSigma 0.85 → ~0.45`) AND/OR raise `waveOmega 0.7 → ~1.0` so a glance catches the sweep.
   Right now the broad slow band makes consecutive frames look static. Keep the inertia/weight, but the
   front must visibly travel.
4. **Verify the spring-eased `amp` overshoot actually fires on mount** — the report claims a 0→1.06
   spring entrance; it was not perceptible live. Confirm the entrance bounce reads (liquid-weight).
5. **Re-judge live in BOTH modes at the new defaults** — the bar is the DEFAULT render decisively
   showing cells twisting/morphing as a wave passes over and through, not a config the user must crank.

## NON-BLOCKING (doc reconcile — already booked out-of-scope, but worth flagging)

- The paper-grid hero subtitle + story blurb (`demo/stories/substrates/paper-grid.vue`) still describe
  the RETIRED line-bow mechanic ("the whole sheet bows together", "Adjacent lines bow and flow
  TOGETHER", "the IQ domain warp"). The footnote caption correctly describes cell-twist. Reconcile the
  blurb to the new mechanic so the page does not contradict itself.
- README docstrings in the three viz dirs + the `*.spec.ts` π readbacks (referencing `sampleRingField`
  etc.) are stale — the build report books these; they remain the wave's gate/test/doc job.

## Identity / safety checks (all GREEN)

- 0 console errors on all three live pages (only a benign Vue `<Transition>` root-node warn).
- Warm-cream identity held on all three, both modes — no gray cast, no teal/navy.
- Compositor-only GPU fragment/vertex passes; `fwidth`/`dpdx`/`dpdy` only (Safari-safe per report).
