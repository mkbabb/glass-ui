// EXPECT FAIL: the clamp stored through an element write
declare const lead: { tickDt(ms: number): number; settled: boolean };
const STEP_CAP_MS = 500;
let last = 0;
const slot = [0];
function step(now: number): void {
    slot[0] = Math.min(now - last, STEP_CAP_MS);
    last = now;
    lead.tickDt(slot[0]);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
