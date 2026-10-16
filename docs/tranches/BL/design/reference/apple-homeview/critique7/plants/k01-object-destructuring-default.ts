// EXPECT FAIL: a 500 ms clamp carried by the default of an object destructuring ASSIGNMENT target (GAP M-08 E1: "assignments of any operator (destructuring targets included)"); v6 records the target but walks only the right side `{}`
declare const lead: { tickDt(ms: number): number; settled: boolean };
const CAP = 500;
let last = 0;
let dt = 0;
function step(now: number): void {
    ({ dt = Math.min(now - last, CAP) } = {} as { dt?: number });
    last = now;
    lead.tickDt(dt);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
