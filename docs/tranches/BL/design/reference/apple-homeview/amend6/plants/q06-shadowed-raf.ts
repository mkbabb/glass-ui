// EXPECT FAIL: a local requestAnimationFrame that hands the callback a clamped clock (the timestamp is not the browser's)
import { requestAnimationFrame } from "./clampedRaf";
declare const lead: { tickDt(ms: number): number; settled: boolean };
let last = 0;
function step(now: number): void {
    const dt = now - last;
    last = now;
    lead.tickDt(dt);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
