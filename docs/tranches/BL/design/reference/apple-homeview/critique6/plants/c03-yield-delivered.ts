// EXPECT FAIL: a 500 ms clamp applied by the driver and delivered into the stepper through a generator's `yield`
declare const lead: { tickDt(ms: number): number; settled: boolean };
const STEP_CAP_MS = 500;
function* stepper(): Generator<void, void, number> {
    while (true) {
        const dt: number = yield;
        lead.tickDt(dt);
    }
}
const loop = stepper();
loop.next();
let last = 0;
function frame(now: number): void {
    loop.next(Math.min(now - last, STEP_CAP_MS));
    last = now;
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
