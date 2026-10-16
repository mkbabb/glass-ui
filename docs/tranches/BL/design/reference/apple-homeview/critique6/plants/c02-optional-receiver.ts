// EXPECT FAIL: a long frame (> 500 ms) skipped by an optional call on a receiver the comparison nulls (control dependence through `?.`)
declare const lead: { tickDt(ms: number): number; settled: boolean };
const LONG_FRAME_MS = 500;
let last = 0;
function step(now: number): void {
    const dt = now - last;
    last = now;
    requestAnimationFrame(step);
    (dt > LONG_FRAME_MS ? undefined : lead)?.tickDt(dt);
}
requestAnimationFrame(step);
