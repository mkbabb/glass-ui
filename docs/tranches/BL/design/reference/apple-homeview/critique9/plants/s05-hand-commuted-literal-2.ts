// EXPECT FAIL: M-08 S1 / §0 Hand (A9, literal 2): a hand Euler, damping written `v * 2 * z * w`, stepped with a 500 ms clamp, no sink
let x = 0, v = 0, last = 0;
const w = 12, z = 0.88, target = 100;
function frame(now: number) {
    const dt = Math.min(now - last, 500) / 1000;
    v += (-w * w * (x - target) - v * 2 * z * w) * dt;
    x += v * dt;
    last = now;
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
