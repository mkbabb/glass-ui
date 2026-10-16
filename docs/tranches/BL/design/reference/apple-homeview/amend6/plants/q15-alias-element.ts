// EXPECT FAIL: the element write made through an alias of the slot the sink reads
declare const lead: { tickDt(ms: number): number; settled: boolean };
const STEP_CAP_MS = 500;
let last = 0;
const slot = [0];
const view = slot;
function step(now: number): void {
    view[0] = Math.min(now - last, STEP_CAP_MS);
    last = now;
    lead.tickDt(slot[0]);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
