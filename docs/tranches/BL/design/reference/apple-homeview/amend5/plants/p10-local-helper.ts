// EXPECT FAIL: a bound inside a helper with an innocent name
declare const lead: { tickDt(ms: number): number; settled: boolean };
const FRAME_MS = 1000 / 60;
let last = 0;
const tame = (x: number) => (x > 250 ? 250 : x);
function step(now: number): void {
    const dt = now - last;
    last = now;
    lead.tickDt(tame(dt));
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
