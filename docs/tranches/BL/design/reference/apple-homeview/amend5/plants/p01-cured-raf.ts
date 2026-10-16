// EXPECT PASS: the cure as W-F.1 item 2 states it, the frame dt from rAF, a null check on the first frame
declare const lead: { tickDt(ms: number): number; settled: boolean };
const FRAME_MS = 1000 / 60;
let last = 0;
function step(now: number): void {
    const dt = last ? now - last : FRAME_MS;
    last = now;
    lead.tickDt(dt);
    if (!lead.settled) requestAnimationFrame(step);
}
requestAnimationFrame(step);
