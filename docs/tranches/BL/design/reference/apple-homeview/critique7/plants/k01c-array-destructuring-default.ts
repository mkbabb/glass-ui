// EXPECT FAIL: control for k01/k02: the same clamp as an ARRAY destructuring assignment default (v6 :166-167 reads it)
declare const lead: { tickDt(ms: number): number; settled: boolean };
let last = 0;
let dt = 0;
function step(now: number): void {
    [dt = Math.min(now - last, 500)] = [] as number[];
    last = now;
    lead.tickDt(dt);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
