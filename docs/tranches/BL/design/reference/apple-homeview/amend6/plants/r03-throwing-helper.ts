// EXPECT RESIDUAL: a long frame dropped by an exception thrown inside a called helper (no throw or test in the stepping function)
import { assertFrame } from "./frameGuard";
declare const lead: { tickDt(ms: number): number; settled: boolean };
let last = 0;
function step(now: number): void {
    const dt = now - last;
    last = now;
    requestAnimationFrame(step);
    assertFrame(dt);
    lead.tickDt(dt);
}
requestAnimationFrame(step);
