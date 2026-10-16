// EXPECT FAIL: control for k01: the renamed object destructuring target `{ gap: dt = … }`; v6 reads it because `dt = …` inside a property assignment parses as an ordinary assignment (:159-165)
declare const lead: { tickDt(ms: number): number; settled: boolean };
let last = 0;
let dt = 0;
function step(now: number): void {
    ({ gap: dt = Math.min(now - last, 500) } = {} as { gap?: number });
    last = now;
    lead.tickDt(dt);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
