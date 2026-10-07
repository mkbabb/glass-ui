// pw-program.mjs --root <tree> · critique-B pass 5 · B-10 (B-S16, P4-F5): does every Playwright test file on the tree
// sit inside the Playwright program? Written and hashed BEFORE reading pass-5/B-kit or B-proto.md.
// A "test file" is any code file outside node_modules that imports @playwright/test (or a local fixture module that does)
// and calls test( / test.describe( at line start. The program is `playwright test --list --reporter=json` per config
// found on the tree. Prints `PWPROBE <in-program> <test-files> <missing>` and each missing file.
import { readFileSync, readdirSync, writeFileSync, mkdtempSync } from "node:fs";
import { join, resolve, dirname, relative } from "node:path";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";

const arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const root = resolve(arg("--root"));
const SKIPD = new Set(["node_modules", ".git", "dist", "dist-demo", "test-results", "playwright-report", "docs", ".cache"]);
const files = [];
(function walk(d) { for (const e of readdirSync(join(root, d || "."), { withFileTypes: true })) {
    if (SKIPD.has(e.name) || e.isSymbolicLink()) continue; const p = d ? `${d}/${e.name}` : e.name;
    if (e.isDirectory()) walk(p); else if (/\.(ts|mts|mjs|js)$/.test(p)) files.push(p);
} })("");
const configs = files.filter((f) => /(^|\/)playwright[^/]*\.config\.(ts|mts|mjs|js)$/.test(f));
const src = Object.fromEntries(files.map((f) => [f, readFileSync(join(root, f), "utf8")]));
const pwImporters = new Set(files.filter((f) => /from\s+["']@playwright\/test["']/.test(src[f])));
// one level of local fixture modules: a file importing a pw importer by relative path
const viaFixture = (f) => [...src[f].matchAll(/from\s+["'](\.[^"']+)["']/g)].some((m) => {
    const t = join(dirname(f), m[1]).replace(/\\/g, "/"); return [t, `${t}.ts`, `${t}.mjs`, `${t}/index.ts`].some((x) => pwImporters.has(x));
});
const tests = files.filter((f) => (pwImporters.has(f) || viaFixture(f)) && /^\s*test(\.describe|\.only|\.skip)?\s*\(/m.test(src[f]) && !configs.includes(f));
const inProgram = new Set();
for (const c of configs) {
    const d = mkdtempSync(join(process.env.CRIT_TMP ?? tmpdir(), "pwl-"));
    let txt = "";
    try {
        txt = execFileSync("npx", ["playwright", "test", "--list", "--reporter=json", "--config", join(root, c)], { /* amendment 1: absolute config path (cwd is the config's dir) */ cwd: dirname(join(root, c)), encoding: "utf8", maxBuffer: 1 << 28, stdio: ["ignore", "pipe", "pipe"], env: { ...process.env, CI: "1" } });
    } catch (e) { txt = e.stdout ?? ""; console.log(`PWLIST ${c} exit ${e.status}: ${String(e.stderr ?? "").split("\n").slice(0, 3).join(" | ")}`); }
    writeFileSync(join(d, "list.json"), txt);
    let j = null; try { j = JSON.parse(txt.slice(txt.indexOf("{"))); } catch { console.log(`PWLIST ${c} unparsable`); continue; }
    const rd = j.config?.rootDir ?? dirname(join(root, c));
    (function walk(s) { if (!s) return; if (s.file) inProgram.add(relative(root, resolve(rd, s.file))); for (const x of s.suites ?? []) walk(x); for (const x of s.specs ?? []) if (x.file) inProgram.add(relative(root, resolve(rd, x.file))); })({ suites: j.suites });
    console.log(`PWCONFIG ${c} files=${[...inProgram].length}`);
}
const missing = tests.filter((f) => !inProgram.has(f));
console.log(`PWPROBE in-program=${inProgram.size} test-files=${tests.length} missing=${missing.length}`);
for (const m of missing) console.log(`   MISSING ${m}`);
if (arg("--out")) writeFileSync(arg("--out"), JSON.stringify({ configs, inProgram: [...inProgram].sort(), tests, missing }, null, 1));
