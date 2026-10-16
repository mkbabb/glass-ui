// EXPECT FAIL: min(raw, CAP) as (raw + CAP - |raw - CAP|) / 2 with |x| written as (x*x) ** 0.5
declare const lead: { tickDt(ms: number): number; settled: boolean };
const STEP_CAP_MS = 500;
let last = 0;
function step(now: number): void {
    const raw = now - last;
    last = now;
    const e = raw - STEP_CAP_MS;
    lead.tickDt((raw + STEP_CAP_MS - (e * e) ** 0.5) / 2);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
