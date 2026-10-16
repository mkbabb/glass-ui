// EXPECT PASS: the true dt carried on a frame record and destructured out (a binding pattern with no bound)
declare const lead: { tickDt(ms: number): number; settled: boolean };
const FRAME_MS = 1000 / 60;
let last = 0;
function step(now: number): void {
    const frame = { dt: last ? now - last : FRAME_MS, at: now };
    const { dt } = frame;
    last = now;
    lead.tickDt(dt);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
