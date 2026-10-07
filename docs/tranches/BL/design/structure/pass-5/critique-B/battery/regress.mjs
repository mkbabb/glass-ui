// regress.mjs · critique-B pass 5 · pass 4's plants re-run as regressions (REGISTRY §P4-8.4: "It re-runs pass 4's
// door plants as regressions"). Written and hashed BEFORE reading pass-5/B-kit or B-proto.md. It takes pass 4's committed,
// hashed battery (pass-4/critique-B/battery/plants.mjs, hash 08a0ec97… amendment 1) and pass 4's committed extra plants
// (pass-4/critique-B/tools/extra-plants.mjs) by import, so the regressions are pass 4's bytes, not a re-typing.
// Dropped: PH-foreign (pass 4 disclosed it collides with the real, reviewed slider/useDockHold.ts; X-FOREIGN replaces it).
// pass-4 sha256 at hash time are recorded in ITEMS.md; run-plants.mjs re-checks nothing about them, the hash file does.
import { plants as p4 } from "../../../pass-4/critique-B/battery/plants.mjs";
import { plants as p4x } from "../../../pass-4/critique-B/tools/extra-plants.mjs";

export function plants(ctx) {
    const a = p4(ctx).filter((p) => p.id !== "PH-foreign").map((p) => ({ ...p, id: `P4-${p.id}` }));
    const b = p4x(ctx).map((p) => ({ ...p, id: `P4x-${p.id}` }));
    // S-14 regressions should name B17 specifically (a catch in another clause is incidental, pass 4 §4)
    for (const p of [...a, ...b]) if (!p.skip && p.item === "S-14") p.expect = "B17";
    return [...a, ...b];
}
