// EXPECT FAIL: a long frame dropped by an early return before the sink (time lost; the guard is a sibling, not an ancestor)
declare const lead: { tickDt(ms: number): number; settled: boolean };
const FRAME_MS = 1000 / 60;
const LONG_FRAME_MS = 200;
let last = 0;
function step(now: number): void {
    const dt = last ? now - last : FRAME_MS;
    last = now;
    requestAnimationFrame(step);
    if (dt > LONG_FRAME_MS) return;
    lead.tickDt(dt);
}
requestAnimationFrame(step);
