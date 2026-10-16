// EXPECT FAIL: CRITIQUE-4 §3, a clamp kept under a new name (STEP_CAP_MS = 500)
declare const lead: { tickDt(ms: number): number; settled: boolean };
const FRAME_MS = 1000 / 60;
let last = 0;
const STEP_CAP_MS = 500;
function step(now: number): void {
    lead.tickDt(Math.min(now - last, STEP_CAP_MS));
    last = now;
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
