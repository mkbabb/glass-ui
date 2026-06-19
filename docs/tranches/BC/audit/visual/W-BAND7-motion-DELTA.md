# BC Band 7 (motion canon) — DELTA (the springs minted + paint-verified)

**Binding paint proof:** `motion-one-clock · spring-ease · affordance-map · tunable-anim · button-glass`
→ **99 passed, 5 skipped** (befitting WebKit/PRM arms) on BOTH projects (real-GPU + coarse-touch),
both modes, 2 stable runs. Split-chars + motion-presets logic: **14/14 vitest**.

## What landed
- **MOTION-ONE-CLOCK** — keyframes.js is the ONE source + clock, now a born-RED gate (M1 single
  SPRING_PRESETS table / M2 off-spine allowlist / M3 clock-fence whole-corpus sweep / M4 viz-inversion).
  NO source-spine edit (it PROVES the spine); the 8 BB-batch clock drifts NAMED in the CLOCK_FENCE_PENDING
  bridge with downstream owners.
- **SPRING-EASE** — all springs squishy/quick/coupled-fade: snappy retuned 0.42/0.78 (90%-travel 0.571,
  NOT the 0.16 front-load), bouncy in the Apple band, the **`press` register 0.15/0.86 MINTED + wired**
  (useSpringPress + the --spring-press/--glass-btn-press-t drive, regen synced); the `dock` row byte-frozen.
  This mint UNBLOCKED the booked button-press arm (R1 consume-after-mint — now GREEN).
- **AFFORDANCE-MAP** — interaction affordances baked into every interactive element (the registry), riding
  the eased springs; vSpecular affordance contract.
- **TUNABLE-ANIM** — the tunable-animation registry + the EasingPicker exposing the eased curves (SVG +
  value.js math, Safari-native); gained `aria-label="Jump term"` (a real a11y gap the live π caught).
- **SPLIT-CHARS** — useCharStagger + <SplitChars> (--char-index/--char-total + the MANDATORY accessible
  full-text label), engine-free in /motion-core; ships on the root barrel.
- **MOTION-PRESETS** — the convergence-reveal preset (partial-sum settle, gentle reuse) + the
  [data-scroll-reveal] `once` latch reusing the IntersectionObserver unobserve (continuous default untouched).

## The live-π caught (the orchestrator's paint duty)
1 real a11y gap (EasingPicker Jump-term had no aria-label — fixed source) + the rest were π-simulation
bugs the live run exposed: Playwright's synthetic mouse emits NO pointer events under isMobile+hasTouch
(so the press read 0 on coarse-touch) → the specs now `dispatchEvent('pointerdown')` to drive the real
handler on both projects; a strict-mode 2-picker match → `.first()`; the drag handle at guessed-vs-real
coords; 404 routes (/display/tabs) → the real routes (/navigation/tabs). The press ABSORB threshold was
calibrated to the actual fast 0.15/0.86 spring, tightened to a meaningful climb (+0.35–0.48), not loosened.

## Booked downstream (consume-after-mint, NOT deferral)
- `proof:lensing` (the BB .glass-lens --glass-refract press-swell) re-walks at **BC.W-VISUAL-RECONCILE
  (Band 4)** — the gate battery assigns it there.
- The 8 CLOCK_FENCE_PENDING --duration-* → --spring-<name>-duration swaps are owned by DOCK-ENGINE /
  CONTROL-SMOOTH / CONFIG-RIGHT / SELECTION-CARD per asks-and-consumes.md. KF-OSCILLATOR loop-clock booked
  (absent from kf 4.3.0 dist).
