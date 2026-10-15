// regress-fixed.mjs · critique-B pass 8 · written AFTER the hashed run (not part of the hash). The hashed
// battery/regress.mjs prefixes plant ids (P7-, P7x-, P7r-) but not the `contrast` field that names a control id, so
// pass 7's 6 DT and 3 XDT contrast plants read NO-CONTROL (the runner finds no control under the unprefixed id). This
// re-imports the hashed set unchanged and prefixes each contrast reference with its plant's own prefix. Nothing else
// changes: every expectation is the hashed one.
import { plants as hashed } from "../battery/regress.mjs";
export function plants(ctx) {
    return hashed(ctx).map((p) => {
        if (!p.contrast) return p;
        const pre = /^(P7x?r?-)/.exec(p.id)?.[1] ?? "";
        return { ...p, contrast: `${pre}${p.contrast}` };
    });
}
