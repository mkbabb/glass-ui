// EXPECT FAIL: the clamp pushed into a queue and read back by index
declare const lead: { tickDt(ms: number): number; settled: boolean };
const STEP_CAP_MS = 500;
let last = 0;
const queue: number[] = [];
function step(now: number): void {
    queue.unshift(Math.min(now - last, STEP_CAP_MS));
    last = now;
    lead.tickDt(queue[0]);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
