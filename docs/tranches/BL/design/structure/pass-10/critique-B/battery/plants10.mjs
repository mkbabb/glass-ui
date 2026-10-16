// plants10.mjs · critique-B pass 10 · run by pass-8's hashed runner (pass-8/critique-B/battery/run-plants.mjs) through
// pass-8's adapter (the tree's own seal; exit 2 → THROWS). Written and hashed BEFORE reading pass-10/B-kit or
// pass-10/B-proto.md. Expectations are fixed here (EXPECT) and judged by judge-rows10.mjs. Every target is discovered on
// the tree under judgement.
//
// §P9-6.4, P8-R3 as cured by P9-G2 ("B18 throws on a peer-less row"), LAW §5 ("a row with no peer … is a throw"):
//   PR-free-nopeer      the ./motion-core row with its Peer cell removed (subpath last on the line)         THROWS
//   PR-free-ws          the ./motion-core row with its Peer cell replaced by spaces (whitespace-only cell)   THROWS
//   PR-heavy-nopeer     the first heavy row (a package peer) with its Peer cell removed                     THROWS
//   PR-heavy-ws         the same row, Peer cell whitespace only                                             THROWS
//   PR-free-nosub       the ./motion-core row with its subpath blanked (symbols and "(none …)" kept)        THROWS
//   PR-heavy-nosub      the first heavy row with its subpath blanked (symbols and peer kept)                THROWS
//   PR-ctl              control: the ./motion-core row's symbol column re-spaced (same tokens)              CLEAN
// §P9-6.4 under P9-R1 (a) ("B4 widens from siblings to every module-grain value SCC, parent↔child included"; "a
// parent↔child value cycle in another unit read B4 RED, a type-only reverse edge read clean"). A parent P and child C
// are directories under src/ that each hold an index.ts (their doors), C a direct non-slot subdirectory of P; pairs
// under any `fourier` path are excluded (that is the chain's own cured cycle). Up to three pairs, in sorted order, from
// distinct top-level component dirs.
//   PC-val-<n>          P/zq10p.ts value-imports C through C's door; C/zq10c.ts value-imports ../zq10p      B4 (any line)
//   PC-type-<n>         the same, but C's reverse import is `import type`                                    B4 gains nothing
//   PCG-val             grandparent↔grandchild: G/zq10g.ts → C's door; C/<gc>/zq10gc.ts → ../../zq10g        B4 (any line)
//   PCX-val-<n>         an EXISTING parent→child value edge (a P-level file value-importing ./C…) closed by
//                       one new C file value-importing that P-level file                                     B4 (any line)
//   PCX-type-<n>        the same new C file with `import type`                                               B4 gains nothing
//   SIB-val             sibling contrast (regression of the pre-widening clause): C1 ↔ C2 value cycle via doors   B4
import { dirname, basename } from "node:path";

export const EXPECT = {
    "PR-free-nopeer": ["THROWS"], "PR-free-ws": ["THROWS"], "PR-heavy-nopeer": ["THROWS"], "PR-heavy-ws": ["THROWS"],
    "PR-free-nosub": ["THROWS"], "PR-heavy-nosub": ["THROWS"], "PR-ctl": ["CLEAN"],
    "PC-val-*": ["CAUGHT"], "PC-type-*": ["CLEAN"], "PCG-val": ["CAUGHT"], "PCX-val-*": ["CAUGHT"], "PCX-type-*": ["CLEAN"],
    "SIB-val": ["CAUGHT"],
};

const SLOT = new Set(["composables", "__tests__", "styles"]);

export function plants(ctx) {
    const { all, read, exists } = ctx;
    const P = [];
    // ---- B18 rows
    const R = "src/README.md"; const ritem = "B-10 / S-14 (P8-R3, P9-G2: a peer-less row throws)";
    if (!exists(R)) P.push({ id: "PR-*", item: ritem, skip: "no src/README.md" });
    else {
        const text = read(R); const L = text.split("\n");
        const at = L.findIndex((l) => l.includes("Heavy-peer exclusions"));
        const end = L.findIndex((l, i) => i > at && l.includes("Mechanism:"));
        const ROW = /^(.*?)(@mkbabb\/glass-ui\/[\w-]+)(\s+)(\S.*?)\s*$/;
        const rows = [];
        for (let i = at + 1; at >= 0 && i < end; i++) { const m = ROW.exec(L[i]); if (m) rows.push({ i, m }); }
        const free = rows.find((r) => /\/motion-core$/.test(r.m[2]) && r.m[4].startsWith("(none"));
        const heavy = rows.find((r) => /^@[\w.-]+\/[\w.-]+$|^[\w.-]+$/.test(r.m[4]));
        const edit = (i, line) => { const c = [...L]; c[i] = line; return c.join("\n"); };
        const marks = ["README.md", "peer", "motion-core"];
        const add = (id, r, line, what) => P.push({ id, item: ritem, expect: "*", marks, what: `${what}: "${line.trim().slice(0, 120)}"`, files: { [R]: edit(r.i, line) } });
        if (!free) P.push({ id: "PR-free-*", item: ritem, skip: "no ./motion-core (none …) row in the table block" });
        else {
            const [, pre, sub] = free.m;
            add("PR-free-nopeer", free, `${pre}${sub}`, "the ./motion-core row, Peer cell removed");
            add("PR-free-ws", free, `${pre}${sub}${" ".repeat(24)}`, "the ./motion-core row, Peer cell whitespace only");
            add("PR-free-nosub", free, `${pre}${" ".repeat(sub.length)}${free.m[3]}${free.m[4]}`, "the ./motion-core row, subpath blanked");
            const respaced = `${pre.replace(/,\s+/g, ",  ")}${sub}${free.m[3]}${free.m[4]}`;
            P.push({ id: "PR-ctl", item: `${ritem} control`, expect: null, marks: ["zq10-none"], what: "the ./motion-core row re-spaced, same tokens", files: { [R]: edit(free.i, respaced) } });
        }
        if (!heavy) P.push({ id: "PR-heavy-*", item: ritem, skip: "no heavy row in the table block" });
        else {
            const [, pre, sub] = heavy.m;
            add("PR-heavy-nopeer", heavy, `${pre}${sub}`, `the ${sub} row, Peer cell removed`);
            add("PR-heavy-ws", heavy, `${pre}${sub}${" ".repeat(24)}`, `the ${sub} row, Peer cell whitespace only`);
            add("PR-heavy-nosub", heavy, `${pre}${" ".repeat(sub.length)}${heavy.m[3]}${heavy.m[4]}`, `the ${sub} row, subpath blanked`);
        }
    }
    // ---- B4: parent↔child value SCCs
    const bitem = "S-03 / B-01 (P9-R1 (a): B4 judges every module-grain value SCC, parent↔child included)";
    const doors = new Set(all.filter((p) => /^src\/.*\/index\.ts$/.test(p)).map((p) => dirname(p)));
    const kids = (d) => [...doors].filter((c) => dirname(c) === d && !SLOT.has(basename(c))).sort();
    const pairs = [];
    const usedTop = new Set();
    for (const d of [...doors].sort()) {
        if (/fourier/i.test(d) || SLOT.has(basename(d))) continue;
        const top = d.split("/").slice(0, 3).join("/");
        if (usedTop.has(top)) continue;
        const c = kids(d).find((k) => !/fourier/i.test(k));
        if (!c) continue;
        pairs.push([d, c]); usedTop.add(top);
        if (pairs.length === 3) break;
    }
    if (!pairs.length) P.push({ id: "PC-*", item: bitem, skip: "no parent/child door pair under src" });
    const door = (c) => `${c}/index.ts`;
    pairs.forEach(([p, c], k) => {
        const n = k + 1; const cn = basename(c);
        const marks = [p, c, `${p}/zq10p.ts`, `${c}/zq10c.ts`, "zq10p", "zq10c", basename(p), cn];
        const parent = `import { zq10C } from "./${cn}";\nexport type zq10T = number;\nexport const zq10P = 1;\nexport const zq10Q = (): number => zq10C();\n`;
        const doorAdd = `${read(door(c))}export { zq10C } from "./zq10c";\n`;
        P.push({ id: `PC-val-${n}`, item: bitem, expect: "B4", anyLine: true, marks, what: `${p} ↔ ${c}: parent → child door, child → parent-level file (value)`,
            files: { [`${p}/zq10p.ts`]: parent, [`${c}/zq10c.ts`]: `import { zq10P } from "../zq10p";\nexport const zq10C = (): number => zq10P + 1;\n`, [door(c)]: doorAdd } });
        P.push({ id: `PC-type-${n}`, item: `${bitem} (type-only reverse)`, expect: "-B4", marks, what: `${p} ↔ ${c}: the reverse edge type-only`,
            files: { [`${p}/zq10p.ts`]: parent, [`${c}/zq10c.ts`]: `import type { zq10T } from "../zq10p";\nexport const zq10C = (): zq10T => 1;\n`, [door(c)]: doorAdd } });
    });
    // grandparent ↔ grandchild
    const tri = [...doors].sort().map((g) => { if (/fourier/i.test(g) || SLOT.has(basename(g))) return null; for (const c of kids(g)) { if (/fourier/i.test(c)) continue; const gc = kids(c).find((x) => !/fourier/i.test(x)); if (gc) return [g, c, gc]; } return null; }).find(Boolean);
    if (!tri) P.push({ id: "PCG-val", item: bitem, skip: "no grandparent/child/grandchild door chain" });
    else {
        const [g, c, gc] = tri;
        P.push({ id: "PCG-val", item: bitem, expect: "B4", anyLine: true, marks: [g, c, gc, "zq10g", "zq10gc"], what: `${g} → ${c} (door) … ${gc} → ${g}/zq10g.ts (value)`,
            files: { [`${g}/zq10g.ts`]: `import { zq10GC } from "./${basename(c)}";\nexport const zq10G = 1;\nexport const zq10H = (): number => zq10GC();\n`,
                [door(c)]: `${read(door(c))}export { zq10GC } from "./${basename(gc)}";\n`,
                [door(gc)]: `${read(door(gc))}export { zq10GC } from "./zq10gc";\n`,
                [`${gc}/zq10gc.ts`]: `import { zq10G } from "../../zq10g";\nexport const zq10GC = (): number => zq10G + 1;\n` } });
    }
    // an existing parent → child value edge, closed by one new child file
    const VAL = /^\s*(?:import|export)\s+(?!type\b)[^;]*?from\s*["'](\.\/([\w-]+))(?:\/[^"']*)?["']/gm;
    const ex = [];
    for (const d of [...doors].sort()) {
        if (/fourier/i.test(d) || SLOT.has(basename(d))) continue;
        const ks = new Set(kids(d).map((k) => basename(k)));
        const files = all.filter((f) => dirname(f) === d && /\.(ts|vue)$/.test(f) && !/\.(test|spec|visual)\.ts$/.test(f) && f !== `${d}/index.ts`).sort();
        for (const f of files) {
            const m = [...read(f).matchAll(VAL)].find((x) => ks.has(x[2]));
            if (m && /\.ts$/.test(f)) { ex.push([d, `${d}/${m[2]}`, f]); break; }
        }
        if (ex.length === 2) break;
    }
    if (!ex.length) P.push({ id: "PCX-*", item: bitem, skip: "no existing parent-level .ts file value-importing a child (non-door parent file)" });
    ex.forEach(([p, c, f], k) => {
        const n = k + 1; const rel = `../${basename(f).replace(/\.ts$/, "")}`;
        const marks = [p, c, f, "zq10x", basename(p), basename(c)];
        P.push({ id: `PCX-val-${n}`, item: bitem, expect: "B4", anyLine: true, marks, what: `existing ${f} → ${c}; new ${c}/zq10x.ts → ${f} (value, namespace)`,
            files: { [`${c}/zq10x.ts`]: `import * as zq10X from "${rel}";\nexport const zq10x = (): unknown => zq10X;\n` } });
        P.push({ id: `PCX-type-${n}`, item: `${bitem} (type-only reverse)`, expect: "-B4", marks, what: `existing ${f} → ${c}; new ${c}/zq10x.ts → ${f} (import type)`,
            files: { [`${c}/zq10x.ts`]: `import type * as zq10X from "${rel}";\nexport const zq10x = (x: typeof zq10X | null): unknown => x;\n` } });
    });
    // sibling contrast
    const sp = [...doors].sort().map((d) => (/fourier/i.test(d) || SLOT.has(basename(d))) ? null : kids(d).filter((k) => !/fourier/i.test(k))).find((l) => l && l.length >= 2);
    if (!sp) P.push({ id: "SIB-val", item: bitem, skip: "no sibling door pair" });
    else {
        const [a, b] = sp;
        P.push({ id: "SIB-val", item: `${bitem} (sibling regression)`, expect: "B4", anyLine: true, marks: [a, b, "zq10s"], what: `${a} ↔ ${b} value cycle through both doors`,
            files: { [`${a}/zq10sa.ts`]: `import { zq10SB } from "../${basename(b)}";\nexport const zq10SA = (): number => zq10SB();\n`, [`${b}/zq10sb.ts`]: `import { zq10SA } from "../${basename(a)}";\nexport const zq10SB = (): number => 1 + (zq10SA as unknown as number);\n`,
                [door(a)]: `${read(door(a))}export { zq10SA } from "./zq10sa";\n`, [door(b)]: `${read(door(b))}export { zq10SB } from "./zq10sb";\n` } });
    }
    return P;
}
