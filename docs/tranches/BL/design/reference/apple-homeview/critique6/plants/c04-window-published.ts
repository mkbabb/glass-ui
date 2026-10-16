// EXPECT FAIL: the stepper reads a dt another file publishes on `window` (frameClockGlobal.ts clamps it at 500 ms); an outside value read through an allow-listed global
declare const lead: { tickDt(ms: number): number; settled: boolean };
declare global { interface Window { __frameDt: number } }
function step(): void {
    lead.tickDt(window.__frameDt);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
export {};
