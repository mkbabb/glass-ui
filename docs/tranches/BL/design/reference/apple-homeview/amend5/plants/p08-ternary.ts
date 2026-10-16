// EXPECT FAIL: a comparing ternary, no Math call and no clamp-like name
declare const lead: { tickDt(ms: number): number; settled: boolean };
const FRAME_MS = 1000 / 60;
let last = 0;
const CEILING = 200;
function step(now: number): void {
    const raw = now - last;
    const d = raw > CEILING ? CEILING : raw;
    last = now;
    lead.tickDt(d);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
