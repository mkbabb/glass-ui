// F1 SCALAR-SPINE probe — verified model: claude-fable-5
// Numeric check of the family's load-bearing unknowns against MARKS.md measured tables.
// Analytic second-order spring (same closed form as keyframes.js SpringProgress):
//   omega = 2*PI / response (the iOS response parametrization), zeta = dampingFraction.

function makeSpring(response, zeta, x0, v0, target) {
  const omega = (2 * Math.PI) / response;
  const A = x0 - target;
  if (zeta < 1) {
    const wd = omega * Math.sqrt(1 - zeta * zeta);
    const B = (v0 + zeta * omega * A) / wd;
    return (t) => {
      const e = Math.exp(-zeta * omega * t);
      const x = target + e * (A * Math.cos(wd * t) + B * Math.sin(wd * t));
      const v =
        e *
        (-zeta * omega * (A * Math.cos(wd * t) + B * Math.sin(wd * t)) +
          (-A * wd * Math.sin(wd * t) + B * wd * Math.cos(wd * t)));
      return [x, v];
    };
  }
  // critical
  const B = v0 + omega * A;
  return (t) => {
    const e = Math.exp(-omega * t);
    return [target + e * (A + B * t), e * (v0 - omega * B * t)];
  };
}

// First-order asymmetric follower: dy/dt = (target - y) / tau, tau depends on direction.
function stepFollower(y, target, dt, tauAttack, tauRelease) {
  const tau = target > y ? tauAttack : tauRelease;
  return y + ((target - y) * dt) / tau;
}

const DT = 0.001; // 1ms integration
const clamp01 = (x) => Math.max(0, Math.min(1, x));

console.log("=== A. Pure symmetric transfer g(t) on CLOSE — the order-inversion failure ===");
{
  // Close spine: flick dismiss, t 1 -> 0, decelerating, ~450ms to 95%.
  const s = makeSpring(0.5, 1.0, 1, -6, 0); // seeded with flick velocity (-6 /s)
  // fade transfer (open-authored): fade = clamp(t / 0.25) — completes by t=0.25.
  let fadeStart = null, fadeEnd = null, spineEnd = null;
  for (let t = 0; t < 1.2; t += DT) {
    const [x] = s(t);
    const fade = clamp01(x / 0.25);
    if (fadeStart === null && fade < 0.99) fadeStart = t;
    if (fadeEnd === null && fade < 0.05) fadeEnd = t;
    if (spineEnd === null && x < 0.05) spineEnd = t;
  }
  console.log(
    `spine 95%-done at ${(spineEnd * 1000).toFixed(0)}ms; ` +
      `fade STARTS at ${(fadeStart * 1000).toFixed(0)}ms, ends ${(fadeEnd * 1000).toFixed(0)}ms ` +
      `(measured close: fade DONE by ~170ms; blur relaxes 170->620ms). ` +
      `Symmetric transfer puts the fade ${fadeStart > 0.1 ? "LAST — WRONG ORDER" : "first"}`,
  );
}

console.log("\n=== B. Asymmetric-clock followers off one spine — open AND close ===");
// Followers read the spine's published state (value, velocity, TARGET). The content
// fade is TARGET-keyed (commit intent); the medium is POSITION-keyed (occupancy);
// the stretch IS the spine. One parameterization, both directions.
{
  // OPEN: spine t 0 -> 1, the stretch clock itself (~600-650ms decelerating).
  // MARKS open: medium cliff <=83ms; fade 150-250ms; stretch ~600-650ms; ratio ~1:4.
  const spine = makeSpring(0.95, 1.0, 0, 0, 1);
  let m = 0, f = 0;
  let m95 = null, f95 = null, s90 = null;
  for (let t = 0; t < 2; t += DT) {
    const [x] = spine(t);
    const mTarget = x > 0.02 ? 1 : 0; // occupancy step (position-keyed)
    const fTarget = 1; // target-keyed: intent is OPEN from t=0
    m = stepFollower(m, mTarget, DT, 0.025, 0.14);
    f = stepFollower(f, fTarget, DT, 0.065, 0.055);
    if (m95 === null && m > 0.95) m95 = t;
    if (f95 === null && f > 0.95) f95 = t;
    if (s90 === null && x > 0.9) s90 = t;
  }
  console.log(
    `OPEN  medium 95% @ ${(m95 * 1000).toFixed(0)}ms (target <=100) | ` +
      `fade 95% @ ${(f95 * 1000).toFixed(0)}ms (target 150-250) | ` +
      `stretch 90% @ ${(s90 * 1000).toFixed(0)}ms (target ~600) | fade:stretch = 1:${(s90 / f95).toFixed(1)}`,
  );

  // CLOSE: flick, spine 1 -> 0 seeded with flick velocity; fade target drops at commit.
  const close = makeSpring(0.5, 1.0, 1, -6, 0);
  m = 1; f = 1;
  let f05 = null, m50 = null, m05 = null, beatStart = null, beatEnd = null;
  for (let t = 0; t < 1.5; t += DT) {
    const [x] = close(t);
    const mTarget = x > 0.1 ? 1 : 0; // position-keyed, slow release
    const fTarget = 0; // target-keyed: intent flipped to CLOSED at commit
    m = stepFollower(m, mTarget, DT, 0.025, 0.14);
    f = stepFollower(f, fTarget, DT, 0.065, 0.055);
    if (f05 === null && f < 0.05) f05 = t;
    if (m50 === null && m < 0.5) m50 = t;
    if (m05 === null && m < 0.05) m05 = t;
    if (beatStart === null && f < 0.05 && m > 0.6) beatStart = t;
    if (beatStart !== null && beatEnd === null && m < 0.6) beatEnd = t;
  }
  console.log(
    `CLOSE fade out (5%) @ ${(f05 * 1000).toFixed(0)}ms (measured ~170) | ` +
      `medium 50% @ ${(m50 * 1000).toFixed(0)}ms, gone @ ${(m05 * 1000).toFixed(0)}ms (measured relax ends ~620) | ` +
      `empty-medium beat ${(beatStart * 1000).toFixed(0)}-${(beatEnd * 1000).toFixed(0)}ms ` +
      `(${((beatEnd - beatStart) * 1000).toFixed(0)}ms, measured 100-200ms)`,
  );
}

console.log("\n=== C. Interrupt catch — medium persistence across a caught dismissal ===");
{
  // Close begins; at 330ms the finger re-engages (spine retargets 1, velocity-continuous).
  const close = makeSpring(0.5, 1.0, 1, -6, 0);
  let m = 1, f = 1;
  let mMin = 1, fMin = 1;
  let reopen = null;
  let t = 0;
  let spine = close, tOfs = 0;
  for (; t < 1.6; t += DT) {
    const [x, v] = spine(t - tOfs);
    if (reopen === null && t >= 0.33) {
      reopen = t;
      spine = makeSpring(0.62, 0.95, x, v, 1); // re-seat C1 from (x, v)
      tOfs = t;
    }
    const xx = spine(t - tOfs)[0];
    const mTarget = xx > 0.1 ? 1 : 0;
    const fTarget = clamp01(xx / 0.35);
    m = stepFollower(m, mTarget, DT, 0.025, 0.14);
    f = stepFollower(f, fTarget, DT, 0.06, 0.055);
    mMin = Math.min(mMin, m);
    fMin = Math.min(fMin, f);
  }
  console.log(
    `medium minimum across the caught cycle: ${mMin.toFixed(2)} (never resolved — measured: blur held featureless, never cleared) | ` +
      `fade minimum: ${fMin.toFixed(2)} (content DID leave — measured: content out, then re-enters)`,
  );
}

console.log("\n=== D. Overpull springback — is zeta 0.5-0.65 consistent with 40-70px overshoot? ===");
{
  // Measured: return ~150px, overshoot 40-70px past rest, settle inside ~250-300ms, ~2-2.5Hz.
  // (a) release from a held deep pull, v0 = 0:
  for (const zeta of [0.3, 0.5, 0.6, 0.65, 0.82]) {
    const s = makeSpring(0.45, zeta, -150, 0, 0); // response 0.45 -> f = 2.2Hz
    let peak = 0, peakT = 0, settle = null;
    for (let t = 0; t < 1; t += DT) {
      const [x] = s(t);
      if (x > peak) { peak = x; peakT = t; }
      if (settle === null && t > peakT && Math.abs(x) < 3 && peak > 0) settle = t;
    }
    console.log(
      `  v0=0     zeta=${zeta}: overshoot ${peak.toFixed(0)}px @ ${(peakT * 1000).toFixed(0)}ms` +
        (settle ? `, |x|<3px @ ${(settle * 1000).toFixed(0)}ms` : ""),
    );
  }
  // (b) release WITH seeded velocity (the finger was still moving):
  for (const v0 of [500, 1000, 1500, 2000]) {
    const s = makeSpring(0.45, 0.6, -150, v0, 0);
    let peak = 0, peakT = 0, settle = null;
    for (let t = 0; t < 1; t += DT) {
      const [x] = s(t);
      if (x > peak) { peak = x; peakT = t; }
      if (settle === null && t > peakT && Math.abs(x) < 3 && peak > 0) settle = t;
    }
    console.log(
      `  zeta=0.6 v0=${v0}px/s: overshoot ${peak.toFixed(0)}px @ ${(peakT * 1000).toFixed(0)}ms` +
        (settle ? `, |x|<3px @ ${(settle * 1000).toFixed(0)}ms` : ""),
    );
  }
  // (c) the DOCK preset as-is (response 0.3, zeta 0.82), v0 = 0 and seeded:
  for (const v0 of [0, 1500]) {
    const s = makeSpring(0.3, 0.82, -150, v0, 0);
    let peak = 0, peakT = 0;
    for (let t = 0; t < 1; t += DT) {
      const [x] = s(t);
      if (x > peak) { peak = x; peakT = t; }
    }
    console.log(`  DOCK preset v0=${v0}: overshoot ${peak.toFixed(0)}px @ ${(peakT * 1000).toFixed(0)}ms`);
  }
}

console.log("\n=== E. Hallmark-1 snapback: 130px in <=83ms + ~170ms decelerating tail ===");
{
  // Pinned hold released: x0 = -130 (past detent), v0 = 0. Which preset does ~130px in 83ms?
  for (const [name, r, z] of [["dock", 0.3, 0.82], ["snappy", 0.48, 0.74], ["press", 0.2, 0.8], ["overpull?", 0.36, 0.6], ["fast-pin", 0.22, 0.65]]) {
    const s = makeSpring(r, z, -130, 0, 0);
    const [x83] = s(0.083);
    let settle = null;
    for (let t = 0; t < 1; t += DT) {
      const [x] = s(t);
      if (settle === null && Math.abs(x) < 2 && t > 0.05) settle = t;
    }
    console.log(
      `  ${name} (r=${r}, z=${z}): covered ${(130 + x83).toFixed(0)}px of 130 at 83ms; |x|<2px @ ${(settle * 1000).toFixed(0)}ms (measured: ~130px <=83ms, tail ~170ms)`,
    );
  }
}
