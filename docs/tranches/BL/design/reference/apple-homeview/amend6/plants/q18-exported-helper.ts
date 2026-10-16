// EXPECT FAIL: an exported stepping helper called once here with the true dt; its other callers are in other files
declare const lead: { tickDt(ms: number): number; settled: boolean };
const FRAME_MS = 1000 / 60;
export function advance(dt: number): void {
    lead.tickDt(dt);
}
advance(FRAME_MS);
