// EXPECT RESIDUAL: a soft bound with arithmetic only, CAP·raw / (CAP + raw); no comparison, call, %, bitwise or power
declare const lead: { tickDt(ms: number): number; settled: boolean };
const SOFT_MS = 2000;
let last = 0;
function step(now: number): void {
    const raw = now - last;
    last = now;
    lead.tickDt((SOFT_MS * raw) / (SOFT_MS + raw));
    requestAnimationFrame(step);
}
requestAnimationFrame(step);
