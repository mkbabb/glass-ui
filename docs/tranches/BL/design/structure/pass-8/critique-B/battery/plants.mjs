// plants.mjs · critique-B pass 8 · the REGISTRY §P7-6.4 peer-class plants THROUGH THE GATE (P7-R1 (a): B18 judges
// each entry's names and files arms against its declared class). Written and hashed BEFORE reading pass-8/B-kit or
// pass-8/B-proto.md. Contract (run-plants.mjs): plants(ctx) -> [{ id, item, expect, mark|marks, anyLine?, what, files }
// | { id, item, skip }]. Every target is discovered on the tree under judgement.
//
// ./motion-core's declared class (pass-7 kit, from src/index.ts's "Heavy-peer exclusions" table): keyframes-free AND
// vueuse-free. The motion-core door is the index.ts beside useRAFLoop.ts that re-exports it (pass-7 plants' rule).
//
//   KF-new       a new leaf importing @mkbabb/keyframes.js, published on the motion-core door          expect B18
//   KF-leaf      an existing motion-core leaf gains a value import of keyframes.js (no new name)     expect B18
//   KF-deep      a motion-core leaf imports a new sibling that imports keyframes.js (transitive)      expect B18
//   KF-existing  the motion-core door re-exports the keyframes-bearing useSpring                      expect B18
//   KF-side      a motion-core leaf gains a SIDE-EFFECT import "@mkbabb/keyframes.js"                  expect B18
//   KF-reexport  a motion-core leaf gains `export * from "@mkbabb/keyframes.js"`                       expect B18
//   VU-leaf      a motion-core leaf gains a value import of @vueuse/core (the class is vueuse-free too)  expect B18
//   KF-dyn       a motion-core leaf gains a literal dynamic import("@mkbabb/keyframes.js")            RECORD (*?): the
//                pass-7 kit's probe drops dynamic import() (it loads nothing at evaluation); recorded, not judged
//   CTL-free     control: a new keyframes-free leaf published on the motion-core door                 B18 silent
//   CTL-type     control: a motion-core leaf gains `import type` from keyframes.js (erased)          B18 silent
//   CTL-other    control: a keyframes import added to a leaf of an entry that MAY bear the peer (the useSpring
//                file itself, already bearing; a second named import)                                 B18 silent
import { dirname } from "node:path";

const noExt = (p) => p.replace(/\.(ts|mts|mjs|js|vue)$/, "");

export function plants(ctx) {
    const { find, exists, read, rel, all } = ctx;
    const P = [];
    const add = (o) => P.push(o);
    const skip = (id, item, why) => P.push({ id, item, skip: why });
    const spec = (from, to) => { let r = noExt(rel(from, to)); if (r.endsWith("/index")) r = r.slice(0, -6) || "."; return r; };
    const KF_IMPORT = /^\s*import\s+(?!type\b)[^;]*from\s*["']@mkbabb\/keyframes\.js["']/m;

    let MC = null, raf = null;
    try { raf = find("useRAFLoop.ts"); const d = `${dirname(raf)}/index.ts`; if (exists(d) && /useRAFLoop/.test(read(d))) MC = d; } catch { /* none */ }
    if (!MC) { skip("KF-*", "B-10/S-14 peer class", "no motion-core door found beside useRAFLoop.ts"); return P; }
    const MCD = dirname(MC);
    const item = "B-10 / S-14 (P7-R1 peer class)";
    const K = ["motion-core", "keyframes.js", "keyframes"];
    add({ id: "KF-new", item, expect: "B18", anyLine: true, marks: ["zq8KfLeak", ...K], what: `a new leaf importing @mkbabb/keyframes.js, exported on the motion-core door ${MC}`,
        files: { [`${MCD}/zq8KfLeak.ts`]: 'import * as zq8Kf from "@mkbabb/keyframes.js";\nexport const zq8KfLeak = (): unknown => zq8Kf;\n',
            [MC]: `${read(MC)}export * from "./zq8KfLeak";\n` } });
    add({ id: "KF-leaf", item, expect: "B18", anyLine: true, marks: ["useRAFLoop", ...K], what: `an existing motion-core leaf ${raf} gains a value import of @mkbabb/keyframes.js`,
        files: { [raf]: `import * as zq8KfLeaf from "@mkbabb/keyframes.js";\nvoid zq8KfLeaf;\n${read(raf)}` } });
    add({ id: "KF-deep", item, expect: "B18", anyLine: true, marks: ["zq8KfDeep", "useRAFLoop", ...K], what: "a motion-core leaf imports a new sibling that imports @mkbabb/keyframes.js",
        files: { [`${MCD}/zq8KfDeep.ts`]: 'import * as zq8KfD from "@mkbabb/keyframes.js";\nexport const zq8KfDeep = (): unknown => zq8KfD;\n',
            [raf]: `import { zq8KfDeep } from "./zq8KfDeep";\nvoid zq8KfDeep;\n${read(raf)}` } });
    const bearing = all.filter((p) => p.startsWith("src/") && /\/useSpring\.ts$/.test(p) && !p.includes("__tests__")).find((p) => KF_IMPORT.test(read(p)));
    if (bearing) add({ id: "KF-existing", item, expect: "B18", anyLine: true, marks: ["useSpring", ...K], what: `the motion-core door re-exports the keyframes-bearing useSpring (${bearing})`,
        files: { [MC]: `${read(MC)}export { useSpring } from "${spec(MC, bearing)}";\n` } });
    else skip("KF-existing", item, "no keyframes-bearing useSpring.ts found");
    add({ id: "KF-side", item, expect: "B18", anyLine: true, marks: ["useRAFLoop", ...K], what: `${raf} gains a side-effect import "@mkbabb/keyframes.js"`,
        files: { [raf]: `import "@mkbabb/keyframes.js";\n${read(raf)}` } });
    add({ id: "KF-reexport", item, expect: "B18", anyLine: true, marks: ["useRAFLoop", ...K], what: `${raf} gains export * from "@mkbabb/keyframes.js"`,
        files: { [raf]: `${read(raf)}\nexport * from "@mkbabb/keyframes.js";\n` } });
    add({ id: "VU-leaf", item, expect: "B18", anyLine: true, marks: ["useRAFLoop", "motion-core", "@vueuse/core", "vueuse"], what: `${raf} gains a value import of @vueuse/core (motion-core is declared vueuse-free)`,
        files: { [raf]: `import { useNow as zq8Now } from "@vueuse/core";\nvoid zq8Now;\n${read(raf)}` } });
    add({ id: "KF-dyn", item, expect: "*?", marks: ["useRAFLoop", ...K], what: `${raf} gains a literal dynamic import("@mkbabb/keyframes.js") (recorded)`,
        files: { [raf]: `${read(raf)}\nexport const zq8KfLazy = (): Promise<unknown> => import("@mkbabb/keyframes.js");\n` } });
    add({ id: "CTL-free", item: `${item} control`, expect: "-B18", mark: "zq8Free", what: "control: a new keyframes-free leaf published on the motion-core door",
        files: { [`${MCD}/zq8Free.ts`]: "export const zq8Free = (n: number): number => n + 1;\n", [MC]: `${read(MC)}export * from "./zq8Free";\n` } });
    add({ id: "CTL-type", item: `${item} control`, expect: "-B18", mark: "useRAFLoop", what: `control: ${raf} gains an erased import type from keyframes.js`,
        files: { [raf]: `import type * as zq8KfT from "@mkbabb/keyframes.js";\nexport type Zq8KfT = typeof zq8KfT;\n${read(raf)}` } });
    if (bearing) add({ id: "CTL-other", item: `${item} control`, expect: "-B18", mark: "useSpring", what: `control: a second keyframes value import in ${bearing} (an entry that may bear the peer)`,
        files: { [bearing]: `import * as zq8KfOk from "@mkbabb/keyframes.js";\nvoid zq8KfOk;\n${read(bearing)}` } });
    return P;
}
