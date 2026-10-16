// EXPECT FAIL: the clamp kept on a frame record, the dt destructured out of it
declare const lead: { tickDt(ms: number): number; settled: boolean };
const STEP_CAP_MS = 500;
let last = 0;
function step(now: number): void {
    const frame = { dt: Math.min(now - last, STEP_CAP_MS) };
    const { dt } = frame;
    last = now;
    lead.tickDt(dt);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
