// provider for c04 (not scored): publishes a clamped dt on window
const STEP_CAP_MS = 500;
let last = 0;
function tick(now: number): void {
    (window as unknown as { __frameDt: number }).__frameDt = Math.min(now - last, STEP_CAP_MS);
    last = now;
    requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
export {};
