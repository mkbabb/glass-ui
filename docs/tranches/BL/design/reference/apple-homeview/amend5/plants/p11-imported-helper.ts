// EXPECT FAIL: a bound imported from another module (any call but performance.now is refused)
declare const lead: { tickDt(ms: number): number; settled: boolean };
const FRAME_MS = 1000 / 60;
let last = 0;
import { settleDt } from "./elsewhere";
function step(now: number): void {
    const dt = now - last;
    last = now;
    lead.tickDt(settleDt(dt));
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
