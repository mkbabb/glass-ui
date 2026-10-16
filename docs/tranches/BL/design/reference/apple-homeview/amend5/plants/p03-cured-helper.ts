// EXPECT PASS: the true dt handed through a same-file helper (the call site is resolved)
declare const lead: { tickDt(ms: number): number; settled: boolean };
const FRAME_MS = 1000 / 60;
let last = 0;
function advance(dt: number): void {
    lead.tickDt(dt);
}
function frame(now: number): void {
    const dt = last ? now - last : FRAME_MS;
    last = now;
    advance(dt);
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
