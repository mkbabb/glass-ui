// EXPECT FAIL: e01 with the skip threshold raised to 500 ms, above every block the A4 runtime arm runs (45 / 150 / 400 ms)
declare const lead: { tickDt(ms: number): number; settled: boolean };
const FRAME_MS = 1000 / 60;
const LONG_FRAME_MS = 500;
let last = 0;
function step(now: number): void {
    const dt = last ? now - last : FRAME_MS;
    last = now;
    requestAnimationFrame(step);
    if (dt > LONG_FRAME_MS) return;
    lead.tickDt(dt);
}
requestAnimationFrame(step);
