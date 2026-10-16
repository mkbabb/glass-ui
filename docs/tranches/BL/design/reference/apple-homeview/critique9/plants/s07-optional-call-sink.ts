// EXPECT FAIL: M-08 S3 on a direct sink called with `?.(`: the clamp is still a call in the slice
declare const lead: { tickDt?(dt: number): void };
let last = 0;
function frame(now: number) {
    lead.tickDt?.(Math.min(now - last, 500));
    last = now;
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
