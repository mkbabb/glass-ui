// EXPECT FAIL: the renamed 500 ms clamp on tickVector (v5's sinks were tickDt / tickToTime only)
declare const field: { tickVector(ms: number): Float64Array; settled: boolean };
const STEP_CAP_MS = 500;
let last = 0;
function step(now: number): void {
    field.tickVector(Math.min(now - last, STEP_CAP_MS));
    last = now;
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
