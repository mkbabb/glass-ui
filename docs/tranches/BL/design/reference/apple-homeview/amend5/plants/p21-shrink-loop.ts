// EXPECT FAIL: a loop that shrinks dt below a cap before the step (a bound without min/max or a ternary)
declare const lead: { tickDt(ms: number): number; settled: boolean };
const CAP = 350;
let last = 0;
function step(now: number): void {
    let d = now - last;
    last = now;
    while (d > CAP) d -= CAP;
    lead.tickDt(d);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
