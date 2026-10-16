// PROVIDER for e03 (not a plant): the renamed 500 ms clamp lives here; the file has no sink, so the gate never reads it
const STEP_CAP_MS = 500;
export const frameClock = { dt: 0, last: 0 };
export function advance(now: number): void {
    frameClock.dt = Math.min(now - frameClock.last, STEP_CAP_MS);
    frameClock.last = now;
}
