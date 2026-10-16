// EXPECT FAIL: the clamp moved into the clock (last pulled forward so now - last never exceeds the cap)
declare const lead: { tickDt(ms: number): number; settled: boolean };
const FRAME_MS = 1000 / 60;
let last = 0;
const CAP = 400;
function step(now: number): void {
    last = Math.max(last, now - CAP);
    const dt = now - last;
    last = now;
    lead.tickDt(dt);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
