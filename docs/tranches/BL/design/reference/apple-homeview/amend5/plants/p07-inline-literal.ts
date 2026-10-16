// EXPECT FAIL: CRITIQUE-4 §3, tickDt(Math.min(dt, 0.5)) in seconds-then-ms form
declare const lead: { tickDt(ms: number): number; settled: boolean };
const FRAME_MS = 1000 / 60;
let last = 0;
function step(now: number): void {
    const dt = (now - last) / 1000;
    last = now;
    lead.tickDt(Math.min(dt, 0.5) * 1000);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
