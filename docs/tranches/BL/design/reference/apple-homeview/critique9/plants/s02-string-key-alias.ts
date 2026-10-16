// EXPECT FAIL: GAP §0 v6 row (A9) "a plain string key x["tickDt"] … fails the file": the method read off a string key and called through an alias
declare const lead: { tickVector(dt: number): void };
let last = 0;
function frame(now: number) {
    const f = lead["tickVector"];
    f.call(lead, Math.min(now - last, 500));
    last = now;
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
