// EXPECT RESIDUAL: c04 through globalThis, the clamped dt held on a shared global record another file writes [complement of v6's catch list, GAP M-08 A7; CRITIQUE-6 plant, line 1 relabelled]
declare const lead: { tickDt(ms: number): number; settled: boolean };
function step(): void {
    lead.tickDt((globalThis as any).frameClock.dt);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
export {};
