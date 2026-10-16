// EXPECT FAIL: GAP §0 v6 row (A9) "Some other references to those names (`.bind`, …) fail the file": a bound tickDt fed a 500 ms clamp
declare const lead: { tickDt(dt: number): void };
let last = 0;
function frame(now: number) {
    const step = lead.tickDt.bind(lead);
    step(Math.min(now - last, 500));
    last = now;
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
