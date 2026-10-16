// plants9.mjs · critique-B pass 9 · run by pass-8's hashed runner (pass-8/critique-B/battery/run-plants.mjs) through
// pass-8's adapter. Written and hashed BEFORE reading pass-9/B-kit or pass-9/B-proto.md. Expectations are fixed here
// and judged by judge-rows.mjs (EXPECT below). Every target is discovered on the tree under judgement.
//
// P8-R1 (a): "one instrument reads a moved capture spec's imports (B16 or the floor graph resolving every tests-visual/
// import)". A capture spec is tests-visual/**/_*.spec.ts.
//   CAP-new-<n>   EVERY capture spec on the tree gains `import { zq9Gone } from "./zq9-no-such-module";`  read RED (*)
//   CAP-stale     a capture spec's first relative import is pushed one directory up (the stale-move form)    read RED (*)
//   CAP-ctl       control: a capture spec gains a bare-package import of @playwright/test (resolves)         CLEAN
//   NC-new        contrast: a NON-capture tests-visual spec gains the same broken import                     read RED (*)
// P8-R3 (b): "src/README.md's table stays the one record of declared classes; withdrawing a class is a reviewed
// source edit". The declared-row withdrawal and its two leak variants (pass-8 critic's XR family, re-expected):
//   XR-drop       the ./motion-core row removed                                     any verdict but THROWS (P8-R3 rules it)
//   XR-drop-KF    row removed + a keyframes.js leaf published on ./motion-core      B18 (through the root's class)
//   XR-drop-leaf  row removed + an existing motion-core leaf gains a keyframes.js import    B18 (through the root's class)
import { dirname, basename } from "node:path";

export const EXPECT = {
    "CAP-new-*": ["CAUGHT"], "CAP-stale": ["CAUGHT"], "CAP-ctl": ["CLEAN"], "NC-new": ["CAUGHT"],
    "XR-drop": ["CLEAN", "RECORDED", "MISSED-RECORD"], "XR-drop-KF": ["CAUGHT"], "XR-drop-leaf": ["CAUGHT"],
};

export function plants(ctx) {
    const { all, read, exists, find } = ctx;
    const P = [];
    const caps = all.filter((p) => /^tests-visual\/.*\/_[^/]*\.spec\.ts$/.test(p)).sort();
    const BROKEN = 'import { zq9Gone } from "./zq9-no-such-module";\nvoid zq9Gone;\n';
    const item = "S-12 (P8-R1 (a): a moved capture spec's imports read)";
    if (!caps.length) P.push({ id: "CAP-*", item, skip: "no tests-visual/**/_*.spec.ts on the tree" });
    caps.forEach((c, i) => P.push({ id: `CAP-new-${String(i + 1).padStart(2, "0")}`, item, expect: "*",
        marks: [c, basename(c), basename(c, ".ts"), "zq9-no-such-module", "./zq9-no-such-module"],
        what: `${c} gains a broken relative import`, files: { [c]: `${BROKEN}${read(c)}` } }));
    const REL = /^(\s*import\s[^;]*?from\s*["'])(\.{1,2}\/[^"']+)(["'])/m;
    const staleT = caps.find((c) => REL.test(read(c)));
    if (staleT) {
        const t = read(staleT); const m = REL.exec(t);
        P.push({ id: "CAP-stale", item, expect: "*", marks: [staleT, basename(staleT), basename(staleT, ".ts"), `../${m[2]}`, m[2]],
            what: `${staleT}: ${m[2]} -> ../${m[2]} (an import left stale by a move)`, files: { [staleT]: t.replace(REL, `$1../$2$3`) } });
    } else P.push({ id: "CAP-stale", item, skip: "no capture spec with a relative import" });
    if (caps.length) P.push({ id: "CAP-ctl", item: `${item} control`, expect: null, marks: ["zq9Pw"],
        what: `${caps[0]} gains a resolvable bare import`, files: { [caps[0]]: `import { test as zq9Pw } from "@playwright/test";\nvoid zq9Pw;\n${read(caps[0])}` } });
    const nc = all.filter((p) => /^tests-visual\/.*\/[^_/][^/]*\.spec\.ts$/.test(p)).sort()[0];
    if (nc) P.push({ id: "NC-new", item: `${item} contrast`, expect: "*", marks: [nc, basename(nc), basename(nc, ".ts"), "zq9-no-such-module", "./zq9-no-such-module"],
        what: `${nc} (not a capture spec) gains a broken relative import`, files: { [nc]: `${BROKEN}${read(nc)}` } });

    const R = "src/README.md"; const ritem = "B-10 (P8-R3 (b): the declared set's one record)";
    if (!exists(R)) { P.push({ id: "XR-*", item: ritem, skip: "no src/README.md" }); return P; }
    const L = read(R).split("\n");
    const i = L.findIndex((l) => /@mkbabb\/glass-ui\/motion-core\b/.test(l) && /\|/.test(l) && /none/i.test(l));
    if (i < 0) { P.push({ id: "XR-*", item: ritem, skip: "no ./motion-core row naming 'none' in src/README.md" }); return P; }
    const dropped = [...L.slice(0, i), ...L.slice(i + 1)].join("\n");
    const raf = find("useRAFLoop.ts"); const D = dirname(raf); const MC = `${D}/index.ts`;
    const marks = ["motion-core", "zq9xKfLeak", "keyframes.js", "keyframes", "useRAFLoop", "README.md"];
    P.push({ id: "XR-drop", item: ritem, expect: "*?", marks, what: "the ./motion-core row withdrawn from src/README.md", files: { [R]: dropped } });
    P.push({ id: "XR-drop-KF", item: ritem, expect: "B18", anyLine: true, marks, what: "row withdrawn + a keyframes.js leaf published on ./motion-core",
        files: { [R]: dropped, [`${D}/zq9xKf.ts`]: 'import * as zq9xKf from "@mkbabb/keyframes.js";\nexport const zq9xKfLeak = (): unknown => zq9xKf;\n', [MC]: `${read(MC)}export * from "./zq9xKf";\n` } });
    P.push({ id: "XR-drop-leaf", item: ritem, expect: "B18", anyLine: true, marks, what: "row withdrawn + an existing motion-core leaf gains a keyframes.js value import",
        files: { [R]: dropped, [raf]: `import * as zq9xL from "@mkbabb/keyframes.js";\nvoid zq9xL;\n${read(raf)}` } });
    return P;
}
