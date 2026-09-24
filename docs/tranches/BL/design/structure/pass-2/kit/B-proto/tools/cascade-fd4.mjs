#!/usr/bin/env node
// cascade-fd4.mjs — the floor's F-4 verifier plus FD-4: Vue's scoped @keyframes suffix
// (<name>-<8hex>) renamed by first appearance, the same map applied to every use.
//   snapshot --root R --dist D --out DIR --sha S
//   verify   --root R --dist D --baseline DIR
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const root = resolve(opt("--root"));
const F = join(root, "docs/tranches/BL/design/structure/floor");
const { cssEntries, flatten, leafSequence, compare } = await import(pathToFileURL(join(F, "cascade.mjs")));
const postcss = createRequire(join(root, "package.json"))("postcss");
const dist = resolve(opt("--dist"));

function fd4(seq) {
    const names = new Map();
    for (const line of seq) for (const m of line.matchAll(/@keyframes ([A-Za-z0-9_-]+?)-([0-9a-f]{8})\b/g)) if (!names.has(m[0].slice(11))) names.set(m[0].slice(11), `${m[1]}-#${names.size + 1}`);
    if (!names.size) return seq;
    const re = new RegExp(`\\b(${[...names.keys()].map((n) => n.replace(/[-]/g, "\\-")).join("|")})\\b`, "g");
    return seq.map((l) => l.replace(re, (x) => names.get(x)));
}
function snap() {
    const out = {};
    for (const { key, file } of cssEntries(root)) {
        if (file.includes("*")) continue;
        const seq = fd4(leafSequence(postcss, flatten(postcss, join(dist, file))));
        out[key] = { file, rules: seq.length, sha256: createHash("sha256").update(seq.join("\n")).digest("hex"), seq };
    }
    return out;
}
const cmd = args[0];
if (cmd === "snapshot") {
    const dir = resolve(opt("--out"));
    mkdirSync(dir, { recursive: true });
    const s = snap();
    writeFileSync(join(dir, "fd4.json"), JSON.stringify({ sha: opt("--sha"), entries: s }));
    console.log(JSON.stringify(Object.fromEntries(Object.entries(s).map(([k, v]) => [k, v.rules]))));
} else if (cmd === "verify") {
    const base = JSON.parse(readFileSync(join(resolve(opt("--baseline")), "fd4.json"), "utf8"));
    const rows = compare(base.entries, snap());
    const ok = rows.every((r) => r.identical);
    console.log(JSON.stringify({ baseline: base.sha, verdict: ok ? "GREEN" : "RED", entries: rows.map(({ base: _b, now: _n, ...r }) => r) }));
    process.exit(ok ? 0 : 1);
}
