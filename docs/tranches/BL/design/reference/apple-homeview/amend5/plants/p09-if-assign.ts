// EXPECT FAIL: if (dt > LIMIT) dt = LIMIT
declare const lead: { tickDt(ms: number): number; settled: boolean };
const FRAME_MS = 1000 / 60;
let last = 0;
const LIMIT = 300;
function step(now: number): void {
    let dt = now - last;
    if (dt > LIMIT) dt = LIMIT;
    last = now;
    lead.tickDt(dt);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
