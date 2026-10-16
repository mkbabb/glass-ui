// EXPECT PASS: a fixed-step accumulator that carries its remainder loses no time
declare const lead: { tickDt(ms: number): number; settled: boolean };
const FRAME_MS = 1000 / 60;
let last = 0;
const STEP = 4;
let acc = 0;
function step(now: number): void {
    acc += last ? now - last : FRAME_MS;
    last = now;
    while (acc >= STEP) {
        lead.tickDt(STEP);
        acc -= STEP;
    }
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
