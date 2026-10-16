// xr9.mjs · critique-B pass 9 · written AFTER the battery hash: the hashed plants9.mjs XR family located the
// ./motion-core row by a `|` table cell, and src/README.md's table is whitespace-columned, so XR read SKIP. This is
// the same three plants with pass-8's committed locator (/@mkbabb\/glass-ui\/motion-core\s+\(none/), the hashed ids,
// and the hashed expectations (judged by battery/judge-rows.mjs, which reads plants9.mjs's EXPECT).
import { dirname } from "node:path";
export function plants(ctx) {
    const { read, exists, find } = ctx; const R = "src/README.md"; const item = "B-10 (P8-R3 (b))";
    if (!exists(R)) return [{ id: "XR-*", item, skip: "no src/README.md" }];
    const L = read(R).split("\n"); const i = L.findIndex((l) => /@mkbabb\/glass-ui\/motion-core\s+\(none/.test(l));
    if (i < 0) return [{ id: "XR-*", item, skip: "no motion-core row" }];
    const dropped = [...L.slice(0, i), ...L.slice(i + 1)].join("\n");
    const raf = find("useRAFLoop.ts"); const D = dirname(raf); const MC = `${D}/index.ts`;
    const marks = ["motion-core", "zq9xKfLeak", "keyframes.js", "keyframes", "useRAFLoop", "README.md"];
    return [
        { id: "XR-drop", item, expect: "*?", marks, what: "the ./motion-core row withdrawn from src/README.md", files: { [R]: dropped } },
        { id: "XR-drop-KF", item, expect: "B18", anyLine: true, marks, what: "row withdrawn + a keyframes.js leaf published on ./motion-core",
            files: { [R]: dropped, [`${D}/zq9xKf.ts`]: 'import * as zq9xKf from "@mkbabb/keyframes.js";\nexport const zq9xKfLeak = (): unknown => zq9xKf;\n', [MC]: `${read(MC)}export * from "./zq9xKf";\n` } },
        { id: "XR-drop-leaf", item, expect: "B18", anyLine: true, marks, what: "row withdrawn + an existing motion-core leaf gains a keyframes.js value import",
            files: { [R]: dropped, [raf]: `import * as zq9xL from "@mkbabb/keyframes.js";\nvoid zq9xL;\n${read(raf)}` } },
    ];
}
