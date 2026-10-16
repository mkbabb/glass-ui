// EXPECT FAIL: control for k04: the same with x["tickDt"] (v6 :198-199 reads it)
declare const lead: { tickDt(ms: number): number; settled: boolean };
let last = 0;
function step(now: number): void {
    lead["tickDt"](Math.min(now - last, 500));
    last = now;
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
