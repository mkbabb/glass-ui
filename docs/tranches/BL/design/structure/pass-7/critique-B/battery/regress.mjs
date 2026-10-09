// regress.mjs · critique-B pass 7 · passes 4, 5 and 6 re-run as regressions (REGISTRY §P6-8.4). Written and hashed
// BEFORE reading pass-7/B-kit. Imported by path, so the regressions are their committed bytes:
//   pass 6 hashed battery:  pass-6/critique-B/battery/plants.mjs  (X6 70 + 15 controls, PH6, PHT6, PW6: 106)
//   pass 6 extra plants:    pass-6/critique-B/tools/extra-plants.mjs (PW6x: 6)        -> the pass-6 critic's 112
//   pass 6 regress:         pass-6/critique-B/battery/regress.mjs (pass 5's battery, pass 5's regress = pass 4's
//                           battery and extra plants, pass 5's X5 extras: 259)
// Ids are prefixed P6-, P6x-, P6r-. S-14 plants keep pass 6's rule (B17). Pass 6's adjudications carry: VIS-in-L and
// PH6-CTL-test are harness-subject controls (P5-R5), the B0 computed-path controls are a battery-design class.
import { plants as p6 } from "../../../pass-6/critique-B/battery/plants.mjs";
import { plants as p6x } from "../../../pass-6/critique-B/tools/extra-plants.mjs";
import { plants as p6r } from "../../../pass-6/critique-B/battery/regress.mjs";

export function plants(ctx) {
    const a = p6(ctx).map((p) => ({ ...p, id: `P6-${p.id}` }));
    const b = p6x(ctx).map((p) => ({ ...p, id: `P6x-${p.id}` }));
    const c = p6r(ctx).map((p) => ({ ...p, id: `P6r-${p.id}` }));
    for (const p of [...a, ...b, ...c]) if (!p.skip && p.item === "S-14") p.expect = "B17";
    return [...a, ...b, ...c];
}
