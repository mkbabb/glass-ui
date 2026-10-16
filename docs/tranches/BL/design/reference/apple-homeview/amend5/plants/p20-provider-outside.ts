// EXPECT FAIL: dt arrives from a frame-loop provider in another file (UNRESOLVED until the provider is in scope)
declare const lead: { tickDt(ms: number): number; settled: boolean };
const FRAME_MS = 1000 / 60;
let last = 0;
import { onFrame } from "./frameLoop";
onFrame((dtMs: number) => {
    lead.tickDt(dtMs);
});
