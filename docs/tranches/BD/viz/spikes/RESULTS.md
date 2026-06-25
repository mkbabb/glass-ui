# Pass-D D2 — prototype spike results (aggressive prototyping, throwaway)

Real, run evidence — not doc-reasoning. These validate the riskiest Pass-D findings with code + measurement.

## Spike 1 — the numeric parity harness (`numeric-parity-poc.mjs`) — VALIDATES W-GATE-TRUTH-AUDIT
**Question:** is the #1 finding's remediation (a real numeric oracle + coefficient-flip bites, replacing the string-presence gates) actually buildable + cheap, and does it catch what the shipped gates miss?

**Run result (node, <1s, pure JS — no GPU needed for the JS-side truth):**
| Candidate | RMS ΔE vs oracle | shipped regex gate | numeric harness |
|---|---|---|---|
| `g 9.81 → 8.0` (wrong constant) | 1.283e-1 | **PASS (green)** | **CAUGHT (red)** ✓ |
| omega SIGN flipped (`sqrt → -sqrt`) | 7.514e-1 | **PASS (green)** | **CAUGHT (red)** ✓ |
| `amp[0] 0.6 → 0.59` (1.7% drift) | 7.268e-3 | **PASS (green)** | MISSED at a 0.02 bar |
| identical transcription | 0.0 | PASS | PASS ✓ |

**Proven:** the harness is real + cheap (a pure-JS oracle + RMS ΔE + perturbation bites, runs in <1s). It CATCHES the gross coefficient errors (sign-flip, wrong-constant) the shipped `/fn sampleHeight/.test(src)` gate greens. The CI keystone's authored `{mean:0,p99:0}` is replaceable with a GATE-WRITTEN number TODAY for the JS-oracle half.

**Calibration insight (the "miss" is the lesson):** a generic 0.02 RMS bar MISSES a 1.7% amplitude drift (RMS 0.0073). → the shipped W-GATE-TRUTH-AUDIT must calibrate the ΔE bar PER-VIZ tight enough to catch the smallest meaningful drift (≤ ~0.005 here), and every coefficient-flip bite must be sized to clear its OWN bar (the spec must require: each planted bite moves the number beyond the calibrated bar, proven in the self-test). This is the precise design requirement the proposal needed.

**The remaining half (the shipped harness owes):** the SHADER arm — eval the GLSL/WGSL (headless-gl or a transpile) at the SAME sample lattice + compare to the JS oracle (the true JS↔GLSL↔WGSL parity). The PoC proves the load-bearing JS-oracle + bite half; the shader arm is mechanical (a known headless-gl pattern), not research.

## Spike 0 — live frame-time floors (recorded in PASSD-FOLD §D2)
blob + aurora floors avg 10.21ms / 0 long frames — vsync-capped, GPU headroom → W-VIZ-PERF-BUDGET tests the WORST case, not the floor.

## Next spikes (queued)
- The metal BRDF reads-as-metal (re-plumb the discarded Sobel `N` + add the `N·H` crest term, capture it) — validates W-AUR-METAL.
- The blob M=6 worst-case frame-time (force 6 cores + shadow-on, measure) — sets the W-BLOB-MULTICORE cap from a real number.
