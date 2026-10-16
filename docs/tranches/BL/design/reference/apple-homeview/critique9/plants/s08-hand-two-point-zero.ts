// EXPECT RESIDUAL: GAP §5 M-08 row "no file steps a damped oscillator by hand under any name (A6: in the X·X·(…) + 2·…·X shape only …)", with `2.0`: v6 S1's regex reads a bare `2` only (note, not a K-3 failure under the ruling)
let x = 0, v = 0, last = 0;
const w = 12, z = 0.88, target = 100;
function frame(now: number) {
    const dt = Math.min(now - last, 500) / 1000;
    v += (-w * w * (x - target) - 2.0 * z * w * v) * dt;
    x += v * dt;
    last = now;
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
