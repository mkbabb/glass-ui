// EXPECT RESIDUAL: the clock base rewritten from another task (a timer), the same shape as the visibility cure p04
declare const lead: { tickDt(ms: number): number; settled: boolean };
const FRAME_MS = 1000 / 60;
let last = 0;
setInterval(() => {
    last = performance.now();
}, 100);
function step(now: number): void {
    const dt = last ? now - last : FRAME_MS;
    last = now;
    lead.tickDt(dt);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
