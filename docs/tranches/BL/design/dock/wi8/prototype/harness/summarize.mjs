// summarize.mjs [--engine chromium] [--prefix fold-]: prototype against RED, one markdown
// row per motion segment that moves the plate by more than 2 px, from judge.mjs.
import { readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
const a = process.argv.slice(2);
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const engine = val("--engine", "chromium");
const prefix = val("--prefix", "");
const ROWS = new URL("../rows/", import.meta.url).pathname;
const list = (w) => readdirSync(ROWS + w).filter((f) => f.endsWith(".rows.json") && f.includes(`.${engine}.`) && f.startsWith(prefix));
const judge = (files) => (files.length ? JSON.parse(execFileSync("node", [new URL("./judge.mjs", import.meta.url).pathname, "--json", ...files], { maxBuffer: 1 << 28 }).toString()) : []);
const P = judge(list("proto").map((f) => ROWS + "proto/" + f));
const R = judge(list("red").map((f) => ROWS + "red/" + f));
const key = (r) => `${r.meta.scenario}|${r.meta.cell.tag}`;
const red = new Map(R.map((r) => [key(r), r]));
const main = (s) => {
    const e = s.edges.R || s.edges.L || s.edges.B || s.edges.T;
    if (!e) return "–";
    const cross = s.edges.B && (s.edges.R || s.edges.L) ? ` · cross ${s.edges.B.first}/${s.edges.B.max}%` : "";
    return `${e.travel} px, ${e.first} / ${e.max} % / ${e.last} px${cross}`;
};
const short = (s) => (s.viol.length ? s.viol.map((v) => v.replace(/\(f\d+.*?\)/g, "").replace(/ \(\+\d+\)/, "")).filter((v, i, xs) => xs.indexOf(v) === i).slice(0, 4).join("; ") : "pass");
const segs = (r) => (r ? r.segs.filter((s) => Object.values(s.edges).some((e) => e.travel > 2)) : []);
console.log("| scenario | cell | seg | prototype: travel, first / max % / last | op60 | out | prototype verdict | RED: travel, first / max % / last | RED op60 | RED verdict |");
console.log("|---|---|---|---|---|---|---|---|---|---|");
for (const p of P) {
    const r = red.get(key(p));
    const ps = segs(p), rs = segs(r);
    const n = Math.max(ps.length, rs.length);
    for (let i = 0; i < n; i++) {
        const x = ps[i], y = rs[i];
        console.log(`| ${p.meta.scenario} | ${p.meta.cell.tag} | ${i + 1} | ${x ? main(x) : "–"} | ${x ? x.opMax + (x.blankRows != null ? ` · blank ${x.blankRows}@${x.blankAtProgress}` : "") : "–"} | ${x ? x.outside : "–"} | ${x ? short(x) : "–"} | ${y ? main(y) : r ? "–" : "not run"} | ${y ? y.opMax : "–"} | ${y ? short(y) : "–"} |`);
    }
}
