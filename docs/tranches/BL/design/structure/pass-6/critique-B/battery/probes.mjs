// probes.mjs --root <tree> [--out <json>] · critique-B pass 6 · gate-independent census. Written and hashed BEFORE
// reading pass-6/B-kit or B-proto.md. Pass 5's census (pass-5/critique-B/battery/probes.mjs) is re-run first as a
// regression, then this pass's widenings:
//  PH6-NAMES (B-07): every stem in the five zones, TEST STEMS INCLUDED, against the provenance forms §P5-8.3 names:
//            -N, part-N, wave ids (w12, bs11, s39, p5), an eponym plus a digit, Part/Split suffixes.
//  MASK6 (S-14): the X5 shapes: a named loader called with an argument and caught; a read through a reader object
//            (`<x>.read(`) inside a try whose catch returns or is empty; `readFile(...).catch(` with a non-throwing
//            handler; plus root vite.*.ts.
//  PW-STEMS (B-10): every *.spec.ts / *.visual.ts in the five zones (the program's membership is pw-program.mjs's).
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve, basename } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const root = resolve(arg("--root"));
const HERE = fileURLToPath(new URL(".", import.meta.url));
try {
    process.stdout.write(execFileSync("node", [join(HERE, "../../../pass-5/critique-B/battery/probes.mjs"), "--root", root], { encoding: "utf8", maxBuffer: 1 << 26 }).replace(/^PROBE /gm, "PROBE P5:"));
} catch (e) { console.log(`PROBE P5:ERROR ${String(e.message).split("\n")[0]}`); }

const ZONES = ["src", "demo", "scripts", "tests", "tests-visual"];
const SKIPD = new Set(["node_modules", ".git", "dist", "dist-demo", "test-results", "playwright-report", ".cache"]);
const files = [], dirsAll = [];
for (const z of ZONES) (function walk(d) {
    let ents; try { ents = readdirSync(join(root, d), { withFileTypes: true }); } catch { return; }
    dirsAll.push(d);
    for (const e of ents) { if (SKIPD.has(e.name) || e.isSymbolicLink()) continue; const p = `${d}/${e.name}`; if (e.isDirectory()) walk(p); else files.push(p); }
})(z);
for (const f of readdirSync(root)) if (/^vite\..*\.ts$/.test(f) || /^vite\..*$/.test(f) && f.endsWith(".ts")) files.push(f);
const out = {};
const say = (id, item, hits, detail = "") => { out[id] = hits; console.log(`PROBE ${id} ${item} ${hits.length} ${detail}`); for (const h of hits.slice(0, 400)) console.log(`   ${h}`); };
const CODE = /\.(ts|mts|mjs|js|cjs|vue|tsx)$/;
const read = (f) => readFileSync(join(root, f), "utf8");

const stem = (p) => basename(p).replace(/\.(d\.ts|ts|mts|mjs|js|vue|css|tsx|json|html)$/, "").replace(/\.(visual|test|spec|stories|story|vis)$/, "");
const PH = /^part-?\d+$|-\d+$|[A-Za-z]\d+$|[Pp]art\d*$|Split$|^(w|bs|b-s|s|p|wave)\d+$|^(utils?|helpers?|misc|common|stuff|tmp|temp|new|old)\d*$/;
say("PH6-NAMES", "B-07", [...new Set([...files, ...dirsAll].filter((p) => !/\.(png|jpe?g|svg|woff2?|json|html|md|snap)$/.test(p)).filter((p) => PH.test(stem(p))))],
    "(review list: a digit in a real concept name such as vec3 or h1 is legitimate)");

const mask = [];
for (const f of files.filter((f) => CODE.test(f))) {
    const t = read(f); const L = t.split("\n");
    L.forEach((l, i) => {
        if (/\.catch\s*\(\s*(?:\(\s*\w*\s*\)|\w+)\s*=>\s*(?!\{?\s*throw)/.test(l) && /(readFile|load\w*\(|loader|import\()/.test(l)) mask.push(`${f}:${i + 1} promise/loader-catch :: ${l.trim().slice(0, 140)}`);
    });
    // a try whose body reads through `<x>.read(` and whose catch does not throw
    for (const m of t.matchAll(/try\s*\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}\s*catch\s*(?:\([^)]*\))?\s*\{([^{}]*)\}/g)) {
        if (/\b\w+\.read\s*\(|readFileSync|readFile\(/.test(m[1]) && !/\bthrow\b/.test(m[2])) {
            const line = t.slice(0, m.index).split("\n").length;
            mask.push(`${f}:${line} try-read-swallow :: ${m[0].replace(/\s+/g, " ").slice(0, 140)}`);
        }
    }
}
say("MASK6", "S-14", mask, "(candidate sites; each is judged by reading it)");
say("PW-STEMS", "B-10", files.filter((f) => /\.(spec|visual)\.ts$/.test(f)).map((f) => f).slice(0, 0).concat([`${files.filter((f) => /\.(spec|visual)\.ts$/.test(f)).length} spec/visual files; tests-visual ${files.filter((f) => f.startsWith("tests-visual/") && /\.(spec|visual)\.ts$/.test(f)).length}, src ${files.filter((f) => f.startsWith("src/") && /\.(spec|visual)\.ts$/.test(f)).length}`]));
if (arg("--out")) writeFileSync(arg("--out"), JSON.stringify(out, null, 1));
