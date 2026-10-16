// EXPECT FAIL: the sink in a helper whose one call site is skipped on a long frame (control dependence across a same-file call)
declare const lead: { tickDt(ms: number): number; settled: boolean };
const LONG_MS = 500;
let last = 0;
function advance(dt: number): void {
    lead.tickDt(dt);
}
function step(now: number): void {
    const dt = now - last;
    last = now;
    if (dt < LONG_MS) advance(dt);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
