// EXPECT FAIL: control for k03: the same stepper with `2 *` (v6 S1 reads it)
const w = 12, z = 0.9, target = 1;
let x = 0, v = 0, last = 0;
function step(now: number): void {
    const dt = Math.min(now - last, 500) / 1000;
    last = now;
    v += (-w * w * (x - target) - 2 * z * w * v) * dt;
    x += v * dt;
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
