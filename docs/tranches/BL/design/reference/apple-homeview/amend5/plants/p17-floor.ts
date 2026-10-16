// EXPECT FAIL: Math.max(0, dt), the HEAD aurora frameLoop form (W-F.1 §4: the loop passes dt unchanged)
declare const lead: { tickDt(ms: number): number; settled: boolean };
const FRAME_MS = 1000 / 60;
let last = 0;
function step(now: number): void {
    lead.tickDt(Math.max(0, now - last));
    last = now;
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
