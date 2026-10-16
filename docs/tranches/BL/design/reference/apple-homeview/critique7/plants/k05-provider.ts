// provider for k05 (not scored): writes a clamped dt into the stepper file's exported object
import { frameClock } from "./k05-exported-clock-object";
let last = 0;
function tick(now: number): void {
    frameClock.dt = Math.min(now - last, 500);
    last = now;
    requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
