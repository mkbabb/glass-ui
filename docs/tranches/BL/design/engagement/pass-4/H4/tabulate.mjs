// H4: the per-witness self-test table from logs/selftest-<engine>.log and json/selftest/*.json (1-minute load range
// from each run's loadStart/loadEnd).   node tabulate.mjs [chromium webkit]
import fs from "node:fs";
import path from "node:path";
const D = path.dirname(new URL(import.meta.url).pathname);
const engines = process.argv.slice(2).length ? process.argv.slice(2) : ["chromium", "webkit"];
const js = fs.existsSync(path.join(D, "json/selftest")) ? fs.readdirSync(path.join(D, "json/selftest")).filter((f) => f.endsWith(".json")).map((f) => JSON.parse(fs.readFileSync(path.join(D, "json/selftest", f), "utf8"))) : [];
const one = (s) => +String(s).split("/")[0];
console.log("| witness | engine | runs | OK | BROKEN/UNREAD | N/A | load 1-min |\n|---|---|---:|---:|---:|---:|---|");
for (const e of engines) {
  const f = path.join(D, `logs/selftest-${e}.log`); if (!fs.existsSync(f)) continue;
  const rows = fs.readFileSync(f, "utf8").split("\n").filter((l) => /^(OK|BROKEN|UNREAD|N\/A)\s/.test(l)).map((l) => { const [st, id] = l.trim().split(/\s+/); return { st, id }; });
  const ids = [...new Set(rows.map((r) => r.id))];
  let T = { n: 0, ok: 0, bad: 0, na: 0 };
  for (const id of ids) {
    const r = rows.filter((x) => x.id === id); const n = r.length, ok = r.filter((x) => x.st === "OK").length, bad = r.filter((x) => x.st === "BROKEN" || x.st === "UNREAD").length, na = r.filter((x) => x.st === "N/A").length;
    const L = js.filter((j) => j.id === id && j.engine === e).flatMap((j) => [one(j.loadStart), one(j.loadEnd)]);
    console.log(`| ${id} | ${e} | ${n} | ${ok} | ${bad} | ${na} | ${L.length ? `${Math.min(...L).toFixed(1)}-${Math.max(...L).toFixed(1)}` : "-"} |`);
    T = { n: T.n + n, ok: T.ok + ok, bad: T.bad + bad, na: T.na + na };
  }
  console.log(`| **all** | **${e}** | **${T.n}** | **${T.ok}** | **${T.bad}** | **${T.na}** | |`);
}
