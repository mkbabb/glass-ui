// EXPECT FAIL: the clamp at the call site of a same-file helper
declare const lead: { tickDt(ms: number): number; settled: boolean };
const FRAME_MS = 1000 / 60;
let last = 0;
const CAP = 220;
function advance(dt: number): void {
    lead.tickDt(dt);
}
function frame(now: number): void {
    advance(Math.min(now - last, CAP));
    last = now;
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
