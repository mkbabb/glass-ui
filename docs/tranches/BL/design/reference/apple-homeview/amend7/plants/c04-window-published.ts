// EXPECT RESIDUAL: the stepper reads a dt another file publishes on `window` (frameClockGlobal.ts clamps it at 500 ms); an outside value read through an allow-listed global [complement of v6's catch list, GAP M-08 A7; CRITIQUE-6 plant, line 1 relabelled]
declare const lead: { tickDt(ms: number): number; settled: boolean };
declare global { interface Window { __frameDt: number } }
function step(): void {
    lead.tickDt(window.__frameDt);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
export {};
