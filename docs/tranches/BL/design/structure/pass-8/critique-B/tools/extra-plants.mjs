// extra-plants.mjs · critique-B pass 8 · written AFTER the battery hash, after reading pass-8/B-kit/gate/peer.mjs and
// clauses.mjs B18; not part of the hash. Same contract as battery/plants.mjs.
// peer.mjs derives the declared-free set from src/README.md's "Heavy-peer exclusions" rows on every run; the pin holds
// only the BREAKS (peerHolds), not the declared set. These plants ask whether a declared class can be withdrawn
// silently, and whether a peer can then be added to ./motion-core with every clause GREEN.
//   XR-drop        the ./motion-core row's line removed from the table                          RECORD (*?)
//   XR-drop-KF     the row removed AND a keyframes.js leaf published on ./motion-core          RECORD (*?)
//   XR-edit-KF     the row's Peer column rewritten to @mkbabb/keyframes.js AND the same leaf   RECORD (*?)
import { dirname } from "node:path";
export function plants(ctx) {
    const { find, exists, read } = ctx;
    const T = "src/README.md";
    if (!exists(T)) return [{ id: "XR-*", item: "peer class", skip: "no src/README.md" }];
    const t = read(T);
    const L = t.split("\n");
    const i = L.findIndex((l) => /@mkbabb\/glass-ui\/motion-core\s+\(none/.test(l));
    if (i < 0) return [{ id: "XR-*", item: "peer class", skip: "no motion-core row" }];
    const dropped = [...L.slice(0, i), ...L.slice(i + 1)].join("\n");
    const edited = [...L.slice(0, i), L[i].replace(/\(none.*$/, "@mkbabb/keyframes.js"), ...L.slice(i + 1)].join("\n");
    const raf = find("useRAFLoop.ts"); const MC = `${dirname(raf)}/index.ts`; const D = dirname(raf);
    const kf = { [`${D}/zq8xKf.ts`]: 'import * as zq8xKf from "@mkbabb/keyframes.js";\nexport const zq8xKfLeak = (): unknown => zq8xKf;\n', [MC]: `${read(MC)}export * from "./zq8xKf";\n` };
    const marks = ["motion-core", "zq8xKfLeak", "keyframes.js", "README.md"];
    return [
        { id: "XR-drop", item: "peer class (declared set)", expect: "*?", marks, what: "the ./motion-core row removed from src/README.md's table", files: { [T]: dropped } },
        { id: "XR-drop-KF", item: "peer class (declared set)", expect: "*?", marks, what: "row removed + a keyframes.js leaf published on ./motion-core", files: { [T]: dropped, ...kf } },
        { id: "XR-drop-leaf", item: "peer class (declared set)", expect: "*?", marks: [...marks, "useRAFLoop"], what: "row removed + an existing motion-core leaf gains a keyframes.js value import (no new name, so the pin cannot see it)", files: { [T]: dropped, [raf]: `import * as zq8xL from "@mkbabb/keyframes.js";\nvoid zq8xL;\n${read(raf)}` } },
        { id: "XR-edit-leaf", item: "peer class (declared set)", expect: "*?", marks: [...marks, "useRAFLoop"], what: "row's Peer column rewritten + the same existing-leaf import", files: { [T]: edited, [raf]: `import * as zq8xL from "@mkbabb/keyframes.js";\nvoid zq8xL;\n${read(raf)}` } },
        { id: "XR-edit-KF", item: "peer class (declared set)", expect: "*?", marks, what: "row's Peer column rewritten to @mkbabb/keyframes.js + the same leaf", files: { [T]: edited, ...kf } },
    ];
}
