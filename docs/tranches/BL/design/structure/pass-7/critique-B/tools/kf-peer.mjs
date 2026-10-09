#!/usr/bin/env node
// kf-peer.mjs --root <tree> · critique-B pass 7 · written AFTER the battery hash. Applies each hashed KF-* plant
// (battery/plants.mjs, the same files) to the tree, runs the hashed battery/peer-closure.mjs on it, and undoes the
// plant byte for byte. The hashed runner only reads the gate; no gate clause reads the peer class (LAW §5 names the
// kit's probe as its owner), so this is the probe arm of the same plants. Prints `KFP <id> rc=<n> :: <PEER line>`.
import { readFileSync, writeFileSync, existsSync, rmSync, readdirSync } from "node:fs";
import { join, resolve, dirname, relative, basename } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
const root = resolve(process.argv[process.argv.indexOf("--root") + 1]);
const HERE = dirname(fileURLToPath(import.meta.url));
const { plants } = await import(pathToFileURL(join(HERE, "../battery/plants.mjs")));
const all = [];
(function walk(d) { for (const e of readdirSync(join(root, d || "."), { withFileTypes: true })) {
    if (["node_modules", ".git", "dist", "docs"].includes(e.name) || e.isSymbolicLink()) continue;
    const p = d ? `${d}/${e.name}` : e.name; if (e.isDirectory()) walk(p); else all.push(p);
} })("");
const find = (b) => { const h = all.filter((p) => basename(p) === b && !p.includes("__tests__")); const x = h.find((p) => p.startsWith("src/")) ?? h[0]; if (!x) throw new Error(b); return x; };
const ctx = { root, all, find, findAll: (f) => all.filter(f), read: (p) => readFileSync(join(root, p), "utf8"), exists: (p) => existsSync(join(root, p)),
    ls: () => [], dirs: () => [], rel: (a, b) => { const r = relative(dirname(a), b); return r.startsWith(".") ? r : `./${r}`; } };
const probe = () => { try { return { rc: 0, out: execFileSync("node", [join(HERE, "../battery/peer-closure.mjs"), "--root", root], { encoding: "utf8" }) }; } catch (e) { return { rc: e.status, out: String(e.stdout) }; } };
const b = probe(); console.log(`KFP BASE rc=${b.rc} :: ${b.out.split("\n")[0]}`);
for (const p of plants(ctx).filter((x) => x.id.startsWith("KF-") && !x.skip)) {
    const saved = Object.fromEntries(Object.keys(p.files).map((f) => [f, existsSync(join(root, f)) ? readFileSync(join(root, f)) : null]));
    for (const [f, t] of Object.entries(p.files)) writeFileSync(join(root, f), t);
    const r = probe();
    for (const [f, buf] of Object.entries(saved)) { if (buf === null) rmSync(join(root, f)); else writeFileSync(join(root, f), buf); }
    console.log(`KFP ${p.id} rc=${r.rc} :: ${r.out.split("\n")[0]}`);
}
const a = probe(); console.log(`KFP RESTORED rc=${a.rc} :: ${a.out.split("\n")[0]}`);
