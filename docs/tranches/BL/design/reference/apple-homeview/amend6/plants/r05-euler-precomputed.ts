// EXPECT RESIDUAL: a hand-rolled Euler whose stiffness and damping are precomputed constants (no X·X term), its dt clamped at 500 ms
declare const el: { style: { translate: string } };
const STEP_CAP_MS = 500;
const K = 438.6, C = 36.9;
let x = 0, v = 0, last = 0;
const target = 120;
function step(now: number): void {
    const h = Math.min(now - last, STEP_CAP_MS) / 1000;
    last = now;
    v += (-K * (x - target) - C * v) * h;
    x += v * h;
    el.style.translate = `${x}px 0`;
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
