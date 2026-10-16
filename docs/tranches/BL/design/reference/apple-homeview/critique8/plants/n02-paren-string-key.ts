// EXPECT RESIDUAL: note only; §0's v6 row says any other reference to tickDt (x["tickDt"]) fails the file; a parenthesized key is not read (:198)
declare const lead: { tickDt(dt: number): void };
let last = 0;
function frame(now: number) {
    const step = Math.min(now - last, 500);
    last = now;
    (lead[("tickDt")] as (dt: number) => void).call(lead, step);
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
