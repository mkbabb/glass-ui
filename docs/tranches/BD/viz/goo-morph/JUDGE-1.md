# JUDGE-1 — the RUTHLESS verdict on the goo-morph WORM pager (iteration 1)

**VERDICT: PASS — it MEETS the far-more-liquid Google-deck WORM bar.** The indicator
visibly STRETCHES mid-travel into a real worm/span (not a subtle scale), the dots MERGE
gooily (real SVG metaball neck), and there is clear spring BOUNCE + WEIGHT. This is FAR
more liquid + squishy than the rejected subtle-traveling-pill read. I verified every claim
LIVE myself on `http://localhost:5173/motion/deck` (and the spring curve) — not from the
build report.

---

## Live evidence I captured myself (chrome-devtools-mcp)

### 1. The worm STRETCHES — real span, not a subtle scale (the binding bar)

Instrumented a per-rAF sampler reading the live `.goo-worm` transform across real travels:

- **Single-step (dot0→dot1, the COMMON case): peak `scaleX = 5.28`**, scaleY pinched to
  `0.435` (≈1/√5.28 — volume-preserving), then collapses to `scaleX = 1` on the target.
  A 24px pip stretched 5.3× ≈ 127px? No — measured span: the worm length at the span moment
  is dot0-center→dot1-center + pip-width = the full two-dot span. The sxCurve climbed
  `1 → 3.11 → 5.28 → 2.16 → 1` then a small landing ripple `1.07 → 1.15 → 1.14 → 1.08 → 1.03 → 1`.
- **Multi-step (live deck 0→5): peak `scaleX = 20.30`** at `--worm-t`≈1.06, scaleY `0.222`.
  Settles to `scaleX = 1` dead on target.
- A bare traveling pill holds scaleX≡1 forever. This worm's length peaks then collapses —
  the stretch-then-contract is gate-proven NON-constant, confirmed in the live transform
  stream, not the report.

### 2. The dots MERGE (goo) — real metaball neck

- Filter live-confirmed: `feGaussianBlur stdDeviation=4` → `feColorMatrix values "… 0 0 0 18 -7"`
  (the classic gooey alpha-threshold) → `color-interpolation-filters="sRGB"`, layer opacity
  `0.52`, `isolation: isolate`. The opaque-layer technique is real.
- **At 11× zoom (`judge1-neck-reach.png`, frozen at p≈0.35)** the worm necks into the
  trailing pip via a SOFT gooey bridge — organic soft-edged blobs, the metaball merge reading
  exactly as the Google-deck dot morph. The non-traveling idle dots (dot3, dot5) stay discrete
  and round — the threshold correctly does NOT merge resting dots.
- At the full-span midpoint (`judge1-midstretch-frozen.png`, 7× zoom) dot0+dot1 are FUSED into
  one elongated capsule while dots 2–5 stay separate.

### 3. Spring BOUNCE + WEIGHT — real overshoot

- The worm rides the genuine `--spring-bouncy` `linear()` curve (live-read identical to
  `--spring-bouncy`): **peak 1.12435 at 14.3% (a +12.4% overshoot)** then a settle UNDERSHOOT
  dip to 0.98426 at 30.6% before settling to 1.0 — a real spring, overshoot AND ripple.
- Live trajectory (0→5): `--worm-t` GLIDED `0 → 1.06 → 3.7 → 5.32 → 5.60 → 5.32 → 5.02 → 4.92
  → 4.94 → 4.99 → 5.01 → 5.0` — **overshot to 5.62 past the target, then settled back**. That
  is the WEIGHT + BOUNCE on the position axis.
- Clock `--pager-worm-duration: 0.57s` (= `--spring-bouncy-duration`). The settle reads
  weighted, not snappy.

### 4. Wiring confirmed live
- `/motion/deck`: goo layer present, 6 goo-dots, worm present, `filter: url("#pager-goo")`
  applied, `--worm-t` registered + transitioning, `--pager-worm-duration: 0.57s`,
  `--pager-worm-max-stretch: 1.08`.

---

## Harsh notes (refinements, NOT failures)

The bar is MET, but for completeness, the honest gaps against absolute Google-deck fidelity:

1. **The full-span MIDPOINT reads slightly more "clean capsule" than "dramatic gooey neck."**
   At the maximum-span instant the fused shape is a smooth elongated pill; the most-gooey neck
   reads at the PARTIAL-reach moments (p≈0.3 and p≈0.7), not dead-center. This is inherent to a
   long span (the neck thins as the worm lengthens). Acceptable — the merge still tracks the
   stretch — but a touch more `feGaussianBlur stdDeviation` (4 → ~5) OR a slightly lower
   threshold offset would keep the neck fatter/gooier across the WHOLE span if more drama is
   wanted.

2. **The travel carries position-spring weight but no VELOCITY-driven squish.** The build is
   Path A+ (CSS `linear()`-transition spring + rAF projection). The overshoot/weight reads on
   the `--worm-t` position curve, but the worm does not get an EXTRA mid-travel squish-bulge
   proportional to instantaneous velocity. The report itself names Path B
   (`SpringProgress` + `useLiquidFlex.drive` velocity squish) as the successor. NOT required to
   pass — the span-bulge already delivers the worm — but it is the one knob that would push
   "more liquid" further if a future iteration wants it.

Neither note drops it below the bar. The indicator stretches into a real worm, the dots merge
gooily, and the spring bounces with weight. PASS.

## Artefacts
`judge1-rest.png`, `judge1-midstretch-frozen.png` (full-span merge, 7×),
`judge1-neck-reach.png` (gooey neck, 11×).
