// EXPECT FAIL: the sink read by an element access keyed with a no-substitution template literal, x[`tickDt`] (GAP M-08 S2: "an x["tick*"] read"), argument clamped at 500 ms
declare const lead: { tickDt(ms: number): number; settled: boolean };
let last = 0;
function step(now: number): void {
    lead[`tickDt`](Math.min(now - last, 500));
    last = now;
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
