// EXPECT FAIL: a branchless clamp by the sign bit (no comparison, no call): CAP - (d & ~(d >> 31)), d = CAP - raw
declare const lead: { tickDt(ms: number): number; settled: boolean };
const STEP_CAP_MS = 500;
let last = 0;
function step(now: number): void {
    const raw = now - last;
    last = now;
    const d = STEP_CAP_MS - raw;
    lead.tickDt(STEP_CAP_MS - (d & ~(d >> 31)));
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
