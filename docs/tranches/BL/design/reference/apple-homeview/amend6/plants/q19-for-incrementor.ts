// EXPECT FAIL: the bound written in a for-loop incrementor, `for (; d > CAP; d = CAP);` (the condition guards the incrementor)
declare const lead: { tickDt(ms: number): number; settled: boolean };
const STEP_CAP_MS = 500;
let last = 0;
function step(now: number): void {
    let d = now - last;
    last = now;
    for (; d > STEP_CAP_MS; d = STEP_CAP_MS);
    lead.tickDt(d);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
