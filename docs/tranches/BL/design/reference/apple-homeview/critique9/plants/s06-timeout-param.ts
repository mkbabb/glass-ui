// EXPECT FAIL: M-08 S4 "a parameter of a function … passed as a value anywhere except to the global requestAnimationFrame": stepped from setTimeout
const lead = { tickDt(dt: number) { void dt; } };
function step(dt: number) { lead.tickDt(dt); }
setTimeout(step, 16, 16);
