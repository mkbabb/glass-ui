// EXPECT FAIL: the clamp written onto the frame record by Object.assign
declare const lead: { tickDt(ms: number): number; settled: boolean };
const STEP_CAP_MS = 500;
let last = 0;
const frame = { dt: 0 };
function step(now: number): void {
    Object.assign(frame, { dt: Math.min(now - last, STEP_CAP_MS) });
    last = now;
    lead.tickDt(frame.dt);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
