// EXPECT FAIL: a fixed-step accumulator whose total is capped (the step is a constant, the cap is on the loop)
declare const lead: { tickDt(ms: number): number; settled: boolean };
const FRAME_MS = 1000 / 60;
let last = 0;
const STEP = 4;
const MAX_BACKLOG = 250;
let acc = 0;
function step(now: number): void {
    acc = Math.min(acc + (now - last), MAX_BACKLOG);
    last = now;
    while (acc >= STEP) {
        lead.tickDt(STEP);
        acc -= STEP;
    }
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
