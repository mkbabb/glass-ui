// EXPECT FAIL: the stepping helper is called once directly and also handed to a scheduler (its other callers are unseen)
declare const lead: { tickDt(ms: number): number; settled: boolean };
declare function every(ms: number, fn: (dt: number) => void): void;
const FRAME_MS = 1000 / 60;
function advance(dt: number): void {
    lead.tickDt(dt);
}
advance(FRAME_MS);
every(16, advance);
