// EXPECT FAIL: a kept 199.5 ms min clamp; runtime6 passes it (critique8/data/rt8-step0.1.json), v6 must carry it (S3 call)
declare const lead: { tickDt(dt: number): void };
let last: number | null = null;
function frame(now: number) {
    const dt = last === null ? 1000 / 60 : Math.min(now - last, 199.5);
    last = now;
    lead.tickDt(dt);
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
