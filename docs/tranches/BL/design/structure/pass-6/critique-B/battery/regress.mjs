// regress.mjs · critique-B pass 6 · pass 4's and pass 5's batteries re-run as regressions (REGISTRY §P5-8.4).
// Written and hashed BEFORE reading pass-6/B-kit or B-proto.md. Imported by path, so the regressions are their bytes:
//   pass 5 hashed battery: pass-5/critique-B/battery/plants.mjs (PH5, VIS, DIR13, SLOT13, S14 140 + 15 controls, B2)
//   pass 5 regress:        pass-5/critique-B/battery/regress.mjs (pass 4's battery + pass 4's extra plants)
//   pass 5 extra plants:   pass-5/critique-B/tools/extra-plants.mjs (the seven X5 plants, cB5-R §4.3)
// Ids are prefixed P5-, P5r- (pass 4 via pass 5), P5x-. S-14 plants must name B17 (pass 5's rule). Pass 5's VIS-in-L
// read FALSE+ through B16 (the subject-reading gap P5-R5 rules); it is kept as a legal control, now expected clean.
import { plants as p5 } from "../../../pass-5/critique-B/battery/plants.mjs";
import { plants as p5r } from "../../../pass-5/critique-B/battery/regress.mjs";
import { plants as p5x } from "../../../pass-5/critique-B/tools/extra-plants.mjs";

export function plants(ctx) {
    const a = p5(ctx).map((p) => ({ ...p, id: `P5-${p.id}` }));
    const b = p5r(ctx).map((p) => ({ ...p, id: `P5r-${p.id}` }));
    const c = p5x(ctx).map((p) => ({ ...p, id: `P5x-${p.id}` }));
    for (const p of [...a, ...b, ...c]) if (!p.skip && p.item === "S-14") p.expect = "B17";
    return [...a, ...b, ...c];
}
