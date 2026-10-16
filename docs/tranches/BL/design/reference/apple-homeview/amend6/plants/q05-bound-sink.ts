// EXPECT FAIL: the step bound to a local name, so no `.tickDt(` call carries the clamp
declare const lead: { tickDt(ms: number): number; settled: boolean };
const STEP_CAP_MS = 500;
let last = 0;
const advance = lead.tickDt.bind(lead);
function step(now: number): void {
    advance(Math.min(now - last, STEP_CAP_MS));
    last = now;
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
