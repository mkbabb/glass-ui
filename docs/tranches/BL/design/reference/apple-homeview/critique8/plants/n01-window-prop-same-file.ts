// EXPECT RESIDUAL: note only; GAP says v6 does not read "a property read off an allow-listed global", but here the write is in-file
declare const lead: { tickDt(dt: number): void };
let last = 0;
function frame(now: number) {
    (window as any).__dt = Math.min(now - last, 500);
    last = now;
    lead.tickDt((window as any).__dt);
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
