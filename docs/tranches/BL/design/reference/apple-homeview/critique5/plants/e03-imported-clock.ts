// EXPECT FAIL: dt read from a shared clock module whose clamp lives in that module (an imported binding, not a parameter)
import { frameClock } from "./frameClock";
declare const lead: { tickDt(ms: number): number; settled: boolean };
function step(): void {
    lead.tickDt(frameClock.dt);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
