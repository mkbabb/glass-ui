// EXPECT RESIDUAL: a hand-written closed form on its own clamped clock, painted without any SpringProgress step (no sink, no Euler term)
declare const el: { style: { translate: string } };
const STEP_CAP_MS = 500;
const W = 20.94, Z = 0.88, WD = W * Math.sqrt(1 - Z * Z);
let last = 0, t = 0;
function step(now: number): void {
    t += Math.min(now - last, STEP_CAP_MS) / 1000;
    last = now;
    const x = 1 - Math.exp(-Z * W * t) * (Math.cos(WD * t) + (Z * W / WD) * Math.sin(WD * t));
    el.style.translate = `${x * 120}px 0`;
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
