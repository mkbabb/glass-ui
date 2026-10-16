// EXPECT FAIL: a long frame skipped by a throw caught around the step
declare const lead: { tickDt(ms: number): number; settled: boolean };
const LONG_MS = 500;
let last = 0;
function step(now: number): void {
    const dt = now - last;
    last = now;
    try {
        if (dt > LONG_MS) throw new Error("long frame");
        lead.tickDt(dt);
    } catch {}
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
