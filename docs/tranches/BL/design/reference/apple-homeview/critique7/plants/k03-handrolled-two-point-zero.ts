// EXPECT FAIL: a hand-rolled damped oscillator whose damping term writes the literal 2 as `2.0` (GAP M-08 S1: "a product X·X·(…) in a sum with another term holding a literal 2· and X"), dt clamped at 500 ms, no SpringProgress sink
const w = 12, z = 0.9, target = 1;
let x = 0, v = 0, last = 0;
function step(now: number): void {
    const dt = Math.min(now - last, 500) / 1000;
    last = now;
    v += (-w * w * (x - target) - 2.0 * z * w * v) * dt;
    x += v * dt;
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
