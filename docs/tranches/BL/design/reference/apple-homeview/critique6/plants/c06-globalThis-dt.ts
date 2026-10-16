// EXPECT FAIL: c04 through globalThis, the clamped dt held on a shared global record another file writes
declare const lead: { tickDt(ms: number): number; settled: boolean };
function step(): void {
    lead.tickDt((globalThis as any).frameClock.dt);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
export {};
