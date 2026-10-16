// EXPECT FAIL: a hand-rolled Euler whose stiffness is not called omega (F1-G1 passes it), with no clamp at all
declare const lead: { tickDt(ms: number): number; settled: boolean };
const FRAME_MS = 1000 / 60;
let last = 0;
let x = 0, v = 0, target = 100;
const w0 = 20.9, z = 0.88;
function step(now: number): void {
    const h = (now - last) / 1000;
    last = now;
    const a = -w0 * w0 * (x - target) - 2 * z * w0 * v;
    v += a * h;
    x += v * h;
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
