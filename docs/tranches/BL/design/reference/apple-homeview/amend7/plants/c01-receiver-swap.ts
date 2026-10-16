// EXPECT RESIDUAL: a long frame (> 500 ms) dropped by stepping a throwaway spring instead of the lead; the comparison picks the sink's receiver [complement of v6's catch list, GAP M-08 A7; CRITIQUE-6 plant, line 1 relabelled]
declare const lead: { tickDt(ms: number): number; settled: boolean };
declare const idle: { tickDt(ms: number): number };
const LONG_FRAME_MS = 500;
let last = 0;
function step(now: number): void {
    const dt = now - last;
    last = now;
    requestAnimationFrame(step);
    const target = dt > LONG_FRAME_MS ? idle : lead;
    target.tickDt(dt);
}
requestAnimationFrame(step);
