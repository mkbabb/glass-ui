// EXPECT RESIDUAL: the stepper reads a dt from an exported object that another file (k05-provider.ts) writes with Math.min(now - last, 500); falsifies M-08's A5 sentence "so does a dt that enters from another file until its provider is in scope", which A7 narrows only for window/globalThis. In v6's complement (it does not read another file), so labelled RESIDUAL here; the defect is the sentence, not the gate
declare const lead: { tickDt(ms: number): number; settled: boolean };
export const frameClock = { dt: 1000 / 60 };
function step(): void {
    lead.tickDt(frameClock.dt);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
