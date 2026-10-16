// EXPECT FAIL: the frame function advances the clock and schedules the stepping function only on a short frame
declare const lead: { tickDt(ms: number): number; settled: boolean };
const LONG_MS = 500;
let last = 0;
let dt = 0;
function stepLead(): void {
    lead.tickDt(dt);
}
function frame(now: number): void {
    dt = now - last;
    last = now;
    if (dt < LONG_MS) requestAnimationFrame(stepLead);
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
