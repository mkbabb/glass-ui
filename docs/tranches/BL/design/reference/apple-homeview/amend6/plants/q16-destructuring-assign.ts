// EXPECT FAIL: the clamp reaching dt through a destructuring assignment (no declaration carries it)
declare const lead: { tickDt(ms: number): number; settled: boolean };
const STEP_CAP_MS = 500;
let last = 0;
let dt = 0;
function step(now: number): void {
    [dt, last] = [Math.min(now - last, STEP_CAP_MS), now];
    lead.tickDt(dt);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
