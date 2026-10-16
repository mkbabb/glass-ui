// EXPECT FAIL: M-08 S4 "a catch binding": the dt comes out of a catch clause
const lead = { tickDt(dt: number) { void dt; } };
let last = 0;
function frame(now: number) {
    try { throw now - last; } catch (e) { lead.tickDt(e as number); }
    last = now;
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
