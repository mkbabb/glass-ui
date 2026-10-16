// EXPECT FAIL: the clamp behind a getter on the clock record
declare const lead: { tickDt(ms: number): number; settled: boolean };
const STEP_CAP_MS = 500;
let raw = 0;
let last = 0;
class FrameClock {
    get dt(): number {
        return Math.min(raw, STEP_CAP_MS);
    }
}
const clock = new FrameClock();
function step(now: number): void {
    raw = now - last;
    last = now;
    lead.tickDt(clock.dt);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
