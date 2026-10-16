// EXPECT FAIL: a dt threshold that forgets the gap (hidden time judged by size, not by visibility)
declare const lead: { tickDt(ms: number): number; settled: boolean };
const FRAME_MS = 1000 / 60;
let last = 0;
const GAP = 1000;
function step(now: number): void {
    if (now - last > GAP) last = now - FRAME_MS;
    const dt = now - last;
    last = now;
    lead.tickDt(dt);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
