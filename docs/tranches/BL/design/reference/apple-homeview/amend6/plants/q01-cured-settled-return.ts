// EXPECT PASS: the cure through W-F.1's leaf, the loop stopping when the spring settles (an early return on stepper state, no dt test)
import { springStepper } from "../../../../../../../src/composables/motion/spring/springStepper";
const lead = springStepper("dock");
const FRAME_MS = 1000 / 60;
let last = 0;
function step(now: number): void {
    const dt = last ? now - last : FRAME_MS;
    last = now;
    if (lead.settled) return;
    lead.tickDt(dt);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
