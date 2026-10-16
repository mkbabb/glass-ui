// EXPECT FAIL: substeps of the frame, a long one skipped by `continue` (the guard sits in an earlier sibling inside the loop)
declare const lead: { tickDt(ms: number): number; settled: boolean };
const LONG_MS = 500;
let last = 0;
function step(now: number): void {
    const parts = [now - last];
    last = now;
    for (const part of parts) {
        if (part > LONG_MS) continue;
        lead.tickDt(part);
    }
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
