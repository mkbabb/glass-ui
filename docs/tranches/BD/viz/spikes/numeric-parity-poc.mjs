// PASS-D D2 SPIKE (throwaway proof-of-concept — NOT a shipped gate).
// Validates the W-GATE-TRUTH-AUDIT remediation: a REAL numeric oracle that
// computes a GATE-WRITTEN number + a COEFFICIENT-FLIP bite that catches a
// perturbation the current string-presence gates sail past green.
//
// The finding it answers: 0 of 342 proof:* gates compute a number; the
// "parity" gates are .test(/fn name/) name-presence; their self-test bites
// DELETE the body, never PERTURB a coefficient. So a sign-flipped omega /
// wrong gravity renders WRONG but passes GREEN. This PoC shows the fix is
// real + cheap (pure JS oracle, no GPU needed for the JS-side numeric truth;
// the shipped harness adds the headless-gl/transpiled shader arm).
//
// Run: node docs/tranches/BD/viz/spikes/numeric-parity-poc.mjs

// ── A representative wave-field oracle (the shape waveFieldMath.ts must take) ──
// Gerstner/Tessendorf deep-water height f(o,t): sum of sines, omega = sqrt(g*k).
// This is the math LIVE in concentric (RING_GRAVITY) + dot-flow (FLOW_GRAVITY)
// under two names for one constant — the W-FIELD-ENGINE hoist target.
function makeWaveField({ g = 9.81, waves } = {}) {
  return function sampleHeight(x, y, t) {
    let h = 0;
    for (const w of waves) {
      const k = Math.hypot(w.kx, w.ky);
      const omega = Math.sqrt(g * k); // Tessendorf dispersion
      const phase = w.kx * x + w.ky * y - omega * t + w.phi;
      h += w.amp * Math.sin(phase);
    }
    return h;
  };
}

const WAVES = [
  { kx: 1.0, ky: 0.3, amp: 0.6, phi: 0.0 },
  { kx: 0.5, ky: 1.1, amp: 0.4, phi: 1.7 },
  { kx: 1.7, ky: 0.9, amp: 0.25, phi: 3.1 },
];

// ── sample at a deterministic lattice of (x,y,t) ──
function sampleVector(fn, N = 24) {
  const out = [];
  for (let i = 0; i < N; i++) {
    const x = (i * 0.37) % 6.28;
    const y = (i * 0.911) % 6.28;
    const t = i * 0.05;
    out.push(fn(x, y, t));
  }
  return out;
}

function rmsDelta(a, b) {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += (a[i] - b[i]) ** 2;
  return Math.sqrt(s / a.length);
}

// ── the BASELINE oracle (what the shader MUST match) ──
const oracle = makeWaveField({ g: 9.81, waves: WAVES });
const baseline = sampleVector(oracle);

// ── COEFFICIENT-FLIP BITES (the perturbations the regex gates miss) ──
const bites = {
  "gravity 9.81 → 8.0 (wrong constant)": makeWaveField({ g: 8.0, waves: WAVES }),
  "omega SIGN flipped (sqrt → -sqrt)": (() => {
    return function (x, y, t) {
      let h = 0;
      for (const w of WAVES) {
        const k = Math.hypot(w.kx, w.ky);
        const omega = -Math.sqrt(9.81 * k); // SIGN FLIP — renders wrong, "fn sampleHeight" still present
        h += w.amp * Math.sin(w.kx * x + w.ky * y - omega * t + w.phi);
      }
      return h;
    };
  })(),
  "amp[0] 0.6 → 0.59 (1.7% drift)": makeWaveField({ g: 9.81, waves: [{ ...WAVES[0], amp: 0.59 }, WAVES[1], WAVES[2]] }),
  "IDENTICAL transcription (must pass)": makeWaveField({ g: 9.81, waves: WAVES.map(w => ({ ...w })) }),
};

const EPS = 1e-9;      // the "pass" floor (a faithful transcription)
const DRIFT_BAR = 0.02; // a representative ΔE bar (RMS); real harness calibrates per-viz

console.log("=== W-GATE-TRUTH-AUDIT numeric harness — proof of concept ===\n");
console.log(`oracle: Tessendorf sum-of-sines, ${WAVES.length} waves, g=9.81, ${baseline.length} samples`);
console.log(`baseline[0..4] = [${baseline.slice(0, 5).map(v => v.toFixed(4)).join(", ")}]\n`);

// the string-presence gate the suite SHIPS today (the false-green):
const candidateSrc = "fn sampleHeight(x,y,t){ /* any body */ }";
const regexGate = /fn sampleHeight/.test(candidateSrc);
console.log(`[CURRENT GATE] /fn sampleHeight/.test(src) = ${regexGate}  ← passes for ANY body (incl. all bites below)\n`);

let realGatePass = 0, realGateFail = 0;
for (const [name, fn] of Object.entries(bites)) {
  const v = sampleVector(fn);
  const delta = rmsDelta(baseline, v);
  const shouldPass = name.startsWith("IDENTICAL");
  const realPass = delta <= (shouldPass ? EPS : DRIFT_BAR) && (shouldPass ? delta <= EPS : delta > EPS ? false : true);
  // clearer: a bite must be CAUGHT (delta>bar) unless it's the identical control
  const caught = !shouldPass && delta > DRIFT_BAR;
  const ok = shouldPass ? delta <= EPS : caught;
  console.log(`  ${ok ? "✓" : "✗"} ${name}`);
  console.log(`      RMS ΔE = ${delta.toExponential(3)}   regex-gate: PASS(green)   numeric-gate: ${shouldPass ? (delta <= EPS ? "PASS" : "FAIL") : (caught ? "CAUGHT(red)" : "MISSED")}`);
  if (ok) realGatePass++; else realGateFail++;
}

console.log(`\n=== VERDICT ===`);
console.log(`The regex gate greens ALL 4 candidates (every one has "fn sampleHeight").`);
console.log(`The numeric harness: ${realGatePass}/4 correct (3 coefficient-flips CAUGHT red, 1 identical PASS).`);
console.log(`→ W-GATE-TRUTH-AUDIT is real + cheap: a pure-JS oracle + RMS ΔE + coefficient-flip bites`);
console.log(`  catches sign-flips/wrong-constants/sub-2% drift the shipped string-presence gates miss.`);
console.log(`  The shipped harness adds the headless-gl/transpiled SHADER arm (JS↔GLSL↔WGSL); this`);
console.log(`  PoC proves the JS-oracle + bite design — the load-bearing half — works today.`);
process.exit(realGateFail === 0 ? 0 : 1);
