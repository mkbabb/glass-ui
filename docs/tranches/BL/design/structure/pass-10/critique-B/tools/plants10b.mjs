// plants10b.mjs · critique-B pass 10 · written AFTER the battery hash, disclosed in critique-B.md §7. Corrects the hashed
// plants10.mjs PC-type/PCX-type rows, whose parent-level file both read the child and was read by it, so the reverse
// type edge closed a SIBLING cycle (file ↔ child module at the parent's level), which LAW §8 counts "value and type"
// since pass 4. Expectations are unchanged: §P9-6.4 "a parent↔child value cycle in another unit read B4 RED, a
// type-only reverse edge read clean". Here the cycle runs through the parent's DOOR, as the ruling states it: P/index.ts
// already value-reads child C (an existing `from "./C"`), and a new C file reads a NEW parent-level file that reads
// nothing. Value: B4's module arm names the SCC. Type-only: B4 gains no line.
import { dirname, basename } from "node:path";
const SLOT = new Set(["composables", "__tests__", "styles"]);
export const EXPECT = { "PD-val-*": ["CAUGHT"], "PD-type-*": ["CLEAN"] };
export function plants({ all, read }) {
    const P = []; const item = "S-03 (P9-R1 (a)), corrected: the reverse edge through the parent's door";
    const doors = [...new Set(all.filter((p) => /^src\/.*\/index\.ts$/.test(p)).map(dirname))].sort();
    const used = new Set();
    for (const d of doors) {
        if (/fourier/i.test(d) || SLOT.has(basename(d))) continue;
        const top = d.split("/").slice(0, 3).join("/"); if (used.has(top)) continue;
        const kids = new Set(doors.filter((c) => dirname(c) === d && !SLOT.has(basename(c))).map((c) => basename(c)));
        const m = [...read(`${d}/index.ts`).matchAll(/^\s*(?:import|export)\s+(?!type\b)[^;]*?from\s*["']\.\/([\w-]+)["']/gm)].find((x) => kids.has(x[1]));
        if (!m) continue;
        used.add(top); const c = `${d}/${m[1]}`; const n = used.size;
        const X = `${d}/zq10b.ts`; const base = "export type zq10BT = number;\nexport const zq10B = 1;\n";
        const marks = [d, c, X, "zq10b", "zq10k"];
        P.push({ id: `PD-val-${n}`, item, expect: "B4", anyLine: true, marks, what: `${d}/index.ts → ./${m[1]} (existing); new ${c}/zq10k.ts → ${X} (value)`,
            files: { [X]: base, [`${c}/zq10k.ts`]: 'import { zq10B } from "../zq10b";\nexport const zq10K = (): number => zq10B;\n' } });
        P.push({ id: `PD-type-${n}`, item: `${item} (type-only)`, expect: "-B4", marks, what: `${d}/index.ts → ./${m[1]} (existing); new ${c}/zq10k.ts → ${X} (import type)`,
            files: { [X]: base, [`${c}/zq10k.ts`]: 'import type { zq10BT } from "../zq10b";\nexport const zq10K = (x: zq10BT): zq10BT => x;\n' } });
        if (n === 3) break;
    }
    if (!P.length) P.push({ id: "PD-*", item, skip: "no parent door value-reading a child door" });
    return P;
}
