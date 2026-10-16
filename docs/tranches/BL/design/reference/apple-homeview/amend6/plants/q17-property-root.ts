// EXPECT FAIL: the clamp written as a property, the whole record destructured (v5 recorded `.dt`, not the root)
declare const lead: { tickDt(ms: number): number; settled: boolean };
const STEP_CAP_MS = 500;
let last = 0;
function step(now: number): void {
    const rec: { dt?: number } = {};
    rec.dt = Math.min(now - last, STEP_CAP_MS);
    const { dt: d = 0 } = rec;
    last = now;
    lead.tickDt(d);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
