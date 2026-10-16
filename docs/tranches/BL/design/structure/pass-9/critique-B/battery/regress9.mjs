// regress9.mjs · critique-B pass 9 · the pass-8 critic's 381 regression rows, from committed bytes. Written and hashed
// BEFORE reading pass-9/B-kit. Imports pass-8/critique-B/battery/regress.mjs by path (which carries pass 7's hashed
// plants, extras and regress set, and through them passes 4-6), and applies the one correction the pass-8 critic
// disclosed (tools/regress-fixed.mjs): each `contrast` reference takes its plant's own prefix. Expectations unchanged.
// Judged by compare.mjs against pass-8/critique-B/results/regress.json, row for row.
import { plants as p8r } from "../../../pass-8/critique-B/battery/regress.mjs";
export function plants(ctx) {
    return p8r(ctx).map((p) => {
        if (!p.contrast) return p;
        const pre = /^(P7x?r?-)/.exec(p.id)?.[1] ?? "";
        return { ...p, contrast: `${pre}${p.contrast}` };
    });
}
