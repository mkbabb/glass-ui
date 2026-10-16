// EXPECT RESIDUAL: a long frame (> 500 ms) skipped by suspending on a promise that never settles before the step (an earlier sibling with no return/throw) [complement of v6's catch list, GAP M-08 A7; CRITIQUE-6 plant, line 1 relabelled]
declare const lead: { tickDt(ms: number): number; settled: boolean };
declare const stall: Promise<void>;
const LONG_FRAME_MS = 500;
let last = 0;
async function step(now: number): Promise<void> {
    const dt = now - last;
    last = now;
    requestAnimationFrame(step);
    if (dt > LONG_FRAME_MS) await stall;
    lead.tickDt(dt);
}
requestAnimationFrame(step);
