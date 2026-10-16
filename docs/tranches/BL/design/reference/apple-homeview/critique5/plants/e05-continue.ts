// EXPECT FAIL: a substep loop that stops at a fixed count and drops the remainder (a cap with no comparison on dt)
declare const lead: { tickDt(ms: number): number; settled: boolean };
const SUB_MS = 4;
const MAX_SUBSTEPS = 50;
let last = 0;
let acc = 0;
function step(now: number): void {
    acc += now - last;
    last = now;
    for (let i = 0; i < MAX_SUBSTEPS && acc >= SUB_MS; i++) {
        lead.tickDt(SUB_MS);
        acc -= SUB_MS;
    }
    acc = 0;
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
