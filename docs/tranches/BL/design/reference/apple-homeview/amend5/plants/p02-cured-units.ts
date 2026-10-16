// EXPECT PASS: the true dt through a unit change (s and back) and an alias
declare const lead: { tickDt(ms: number): number; settled: boolean };
const FRAME_MS = 1000 / 60;
let last = 0;
function step(now: number): void {
    const dtS = (now - (last || now - FRAME_MS)) / 1000;
    last = now;
    const ms = dtS * 1000;
    lead.tickDt(ms);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
