// regress.mjs · critique-B pass 8 · passes 4-7 re-run as regressions (REGISTRY §P7-6.4). Written and hashed BEFORE
// reading pass-8/B-kit. Imported by path, so the regressions are their committed bytes:
//   pass 7 hashed battery:  pass-7/critique-B/battery/plants.mjs (I7 7 + control, KF 4, DT 6: the "17")
//   pass 7 extra plants:    pass-7/critique-B/tools/extra-plants.mjs (XDT: the "+ 4")
//   pass 7 regress:         pass-7/critique-B/battery/regress.mjs (pass 6's 106 + 6 + 259 = the pass-6 critic's 371)
// Ids are prefixed P7-, P7x-, P7r-. Pass 7's KF-* were "*?" (RECORD) because no clause owned the class; P7-R1 (a)
// makes B18 the owner, so they are re-expected as B18 with anyLine (P7-KF-*). Every other expectation is as committed.
import { plants as p7 } from "../../../pass-7/critique-B/battery/plants.mjs";
import { plants as p7x } from "../../../pass-7/critique-B/tools/extra-plants.mjs";
import { plants as p7r } from "../../../pass-7/critique-B/battery/regress.mjs";

export function plants(ctx) {
    const a = p7(ctx).map((p) => ({ ...p, id: `P7-${p.id}` }));
    for (const p of a) if (!p.skip && /^P7-KF-/.test(p.id)) { p.expect = "B18"; p.anyLine = true; p.marks = [...(p.marks ?? [p.mark]), "motion-core", "keyframes.js", "keyframes"]; }
    const b = p7x(ctx).map((p) => ({ ...p, id: `P7x-${p.id}` }));
    const c = p7r(ctx).map((p) => ({ ...p, id: `P7r-${p.id}` }));
    return [...a, ...b, ...c];
}
