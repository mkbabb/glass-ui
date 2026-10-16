// EXPECT FAIL: the clamp on a state object property
declare const lead: { tickDt(ms: number): number; settled: boolean };
const FRAME_MS = 1000 / 60;
let last = 0;
const state = { last: 0, dt: 0 };
function step(now: number): void {
    state.dt = Math.min(now - state.last, 180);
    state.last = now;
    lead.tickDt(state.dt);
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
