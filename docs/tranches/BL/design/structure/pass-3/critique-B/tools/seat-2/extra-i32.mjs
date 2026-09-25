// critique-B seat 2 · POST-HASH supplement (disclosed in critique-B.md). The hashed battery's P-I32/b/c used a
// constant `n`, which F-1 folds into a resolved read (so B16 homed them). These three variants keep the three
// computed-read forms with an OPAQUE `n` (a function parameter), which is what pass-2 B-crit's I32/I32b/I32c
// planted. Expectation (frozen here, unchanged from the battery's): caught in B0.
//   node extra-i32.mjs --tree <slim tree> --work <scratch>
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync, symlinkSync, existsSync, readFileSync, realpathSync } from "node:fs";
import { join, dirname } from "node:path";
import { gate } from "./adapter.mjs";
const a = Object.fromEntries(process.argv.slice(2).reduce((o, v, i, all) => (v.startsWith("--") ? o.concat([[v.slice(2), all[i + 1]]]) : o), []));
const head = 'import { readFileSync } from "node:fs";\nimport { join, resolve } from "node:path";\n';
const plants = {
  "X-I32": head + 'export function r(n: string) { return readFileSync(join(process.cwd(), "src/components/" + n), "utf8"); }\n',
  "X-I32b": head + "export function r(n: string) { return readFileSync(`src/components/${n}/index.ts`, \"utf8\"); }\n",
  "X-I32c": head + 'export function r(n: string) { return readFileSync(resolve(import.meta.dirname, "../../src/components", n, "index.ts"), "utf8"); }\n',
};
function copy(name) {
  const d = join(a.work, name); rmSync(d, { recursive: true, force: true });
  execFileSync("rsync", ["-a", "--exclude", "node_modules", "--exclude", ".git", `${a.tree}/`, `${d}/`]);
  for (const nm of ["node_modules", "tests-visual/node_modules"]) if (existsSync(join(a.tree, nm))) symlinkSync(realpathSync(join(a.tree, nm)), join(d, nm));
  writeFileSync(join(d, ".git"), readFileSync(join(a.tree, ".git")));
  return d;
}
const key = (l) => `${l.clause}\0${l.text}`;
const bd = copy("x-base"); const base = await gate(bd); rmSync(bd, { recursive: true, force: true });
const bm = new Map(); for (const l of base.lines) bm.set(key(l), (bm.get(key(l)) ?? 0) + 1);
const res = [];
for (const [id, text] of Object.entries(plants)) {
  const d = copy(id); const f = `tests/unit/zz-${id.toLowerCase()}.test.ts`;
  mkdirSync(dirname(join(d, f)), { recursive: true }); writeFileSync(join(d, f), text);
  const g = await gate(d); const m = new Map(bm); const added = [];
  for (const l of g.lines) { const c = m.get(key(l)) ?? 0; if (c) m.set(key(l), c - 1); else added.push(l); }
  res.push({ id, verdict: added.some((l) => l.clause === "B0") ? "INTENDED" : added.length ? "OTHER" : "MISSED", added });
  rmSync(d, { recursive: true, force: true });
}
console.log(JSON.stringify(res, null, 1));
