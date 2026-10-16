// EXPECT PASS: a two-lane stepper (the attractor's x/y, W-F.1 item 1) stepped by tickVector with the true dt
declare const field: { tickVector(ms: number): Float64Array; settled: boolean };
const FRAME_MS = 1000 / 60;
let last = 0;
function step(now: number): void {
    const dt = last ? now - last : FRAME_MS;
    last = now;
    field.tickVector(dt);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
