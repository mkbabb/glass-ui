// EXPECT PASS: hidden time is not elapsed time (W-F.1 item 2), by visibility, not by a dt threshold
declare const lead: { tickDt(ms: number): number; settled: boolean };
const FRAME_MS = 1000 / 60;
let last = 0;
document.addEventListener("visibilitychange", () => {
    last = 0;
});
function step(now: number): void {
    const dt = last ? now - last : FRAME_MS;
    last = now;
    lead.tickDt(dt);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
