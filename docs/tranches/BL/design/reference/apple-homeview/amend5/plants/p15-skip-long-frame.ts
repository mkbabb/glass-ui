// EXPECT FAIL: a long frame dropped by threshold (time lost without a min/max)
declare const lead: { tickDt(ms: number): number; settled: boolean };
const FRAME_MS = 1000 / 60;
let last = 0;
const LONG = 300;
function step(now: number): void {
    const dt = now - last;
    last = now;
    if (dt < LONG) lead.tickDt(dt);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
