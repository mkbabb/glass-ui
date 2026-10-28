// D4 pass 11 · RE-MEASURE · pair.mjs: pairs this seat's run JSONs and logs against pass 10's BUILD and critic.
//   node pair.mjs --runs mine=<dir>,b10=<dir>,c10=<dir> --logs mine=<dir>,b10=<dir>,c10=<dir> --dump <file>
// Run JSONs: every `*.json` under mine's root (film and build.json excluded) is paired by relative path. Per file: the
// top-level pass / tally / verdict / ran / passed / failed; per cell (by index, with a signature of its string fields
// other than `line`, so a re-ordered cell list shows as a signature mismatch, not a silent mis-pair): `pass` flips, and
// whether the cell's `line` is identical; where it is not, the largest absolute difference of the numbers in the line.
// Logs: every log name present in mine and in a reference: its verdict lines (`<ID> PASS|FAIL|UNMEASURED …`, `UNIT …`,
// `SHEET …`, the `  PASS|FAIL  <cell>` lines under them), with load, time, JSON path, build-dir and asset-hash noise
// stripped, compared as multisets. Engine-free; reads only. Prints one line per file and a summary; --dump writes
// every differing cell line and log line.
import fs from "node:fs";
import path from "node:path";

const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, all) => (v.startsWith("--") ? [...a, [v.slice(2), all[i + 1]]] : a), []));
const kv = (s) => Object.fromEntries((s ?? "").split(",").filter(Boolean).map((p) => p.split("=")));
const runs = kv(args.runs), logs = kv(args.logs);
const dump = [];

const walk = (d, base = d) => fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
  const p = path.join(d, e.name);
  if (e.isDirectory()) return ["film", "builds", "smoke"].includes(e.name) ? [] : walk(p, base);
  return e.name.endsWith(".json") ? [path.relative(base, p)] : [];
}) : [];
const load = (f) => { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch { return null; } };
const nums = (s) => (String(s).match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
const sig = (c) => Object.entries(c).filter(([k, v]) => k !== "line" && typeof v === "string").map(([k, v]) => `${k}=${v}`).join("|");
const top = (d) => d && ["pass", "tally", "verdict", "ran", "passed", "failed", "skipped"].filter((k) => k in d).map((k) => `${k}=${d[k]}`).join(" · ");

function pairRuns(name, refRoot) {
  const mine = runs.mine; const out = { files: 0, missing: 0, topDiff: 0, cells: 0, flips: 0, sigMismatch: 0, lineSame: 0, lineDiff: 0, maxDelta: 0, rows: [] };
  for (const rel of walk(mine)) {
    const a = load(path.join(mine, rel)); const b = load(path.join(refRoot, rel));
    if (!a || !(Array.isArray(a.cells) || "verdict" in a)) continue; // not a run JSON (build.json, route.json, fixture config)
    if (/^runs\/sheet\/SHEET-wt_/.test(rel)) { out.rows.push(`  ${name} SKIP ${rel}: one file name for every SHEET read of a route (last writer wins); SHEET pairs on its logs`); continue; }
    if (!b) { out.missing++; out.rows.push(`  ${name} MISSING ${rel}`); continue; }
    out.files++;
    const ta = top(a), tb = top(b);
    if (ta !== tb) { out.topDiff++; out.rows.push(`  ${name} TOP ${rel}: mine «${ta}» · ${name} «${tb}»`); }
    const ca = Array.isArray(a?.cells) ? a.cells : [], cb = Array.isArray(b?.cells) ? b.cells : [];
    if (ca.length !== cb.length) out.rows.push(`  ${name} CELLS ${rel}: mine ${ca.length} · ${name} ${cb.length}`);
    for (let i = 0; i < Math.min(ca.length, cb.length); i++) {
      out.cells++;
      const x = ca[i], y = cb[i];
      if (sig(x) !== sig(y)) { out.sigMismatch++; dump.push(`${name}\tSIG\t${rel}#${i}\t${sig(x)}\t${sig(y)}`); }
      if (x.pass !== y.pass) { out.flips++; out.rows.push(`  ${name} FLIP ${rel}#${i} (${x.gating === false ? "info" : "gating"}): mine ${x.pass} · ${name} ${y.pass} · mine «${x.line}» · ${name} «${y.line}»`); }
      if (x.line === y.line) out.lineSame++;
      else {
        out.lineDiff++;
        const na = nums(x.line), nb = nums(y.line);
        const d = na.length === nb.length ? Math.max(0, ...na.map((v, j) => Math.abs(v - nb[j]))) : Infinity;
        if (Number.isFinite(d)) out.maxDelta = Math.max(out.maxDelta, d);
        dump.push(`${name}\tLINE\t${rel}#${i}\tΔ${Number.isFinite(d) ? d.toFixed(2) : "shape"}\t${x.line}\t${y.line}`);
      }
    }
  }
  return out;
}

const NOISE = [
  [/ ?· ?load \{[^}]*\}/g, ""], [/ ?· ?load [\d.]+ \/ [\d.]+ \/ [\d.]+( → [\d.]+ \/ [\d.]+ \/ [\d.]+)?/g, ""], [/loads? [\d.]+(-[\d.]+)?/g, "load"],
  [/\d{4}-\d\d-\d\d \d\d:\d\d:\d\d/g, "T"], [/\/Users\/\S+/g, "PATH"], [/index-[\w-]{8}\.(css|js)/g, "index-H.$1"],
  [/ in [\d.]+ ?(s|ms|min)\b/g, ""], [/ ?· settle waits [\d/]+ ms/g, ""], [/\b\d+(\.\d+)? ?ms\b/g, "ms"], [/\(\d+(\.\d+)? ?s\)/g, ""],
];
const verdictLines = (f) => fs.readFileSync(f, "utf8").split("\n")
  .filter((l) => /^([A-Z][A-Z0-9-]*(?: [A-Z0-9-]+)?) (PASS|FAIL|UNMEASURED)\b|^UNIT |^SHEET |^\s+(PASS|FAIL|UNMEASURED)\s{2,}/.test(l))
  .map((l) => NOISE.reduce((s, [r, v]) => s.replace(r, v), l).trimEnd());

function pairLogs(name, refDir) {
  const out = { logs: 0, same: 0, diff: 0, rows: [] };
  if (!fs.existsSync(refDir)) return out;
  for (const f of fs.readdirSync(logs.mine).filter((n) => n.endsWith(".log"))) {
    const g = path.join(refDir, f); if (!fs.existsSync(g)) continue;
    const a = verdictLines(path.join(logs.mine, f)), b = verdictLines(g);
    if (!a.length && !b.length) continue;
    out.logs++;
    const cnt = (xs) => xs.reduce((m, x) => m.set(x, (m.get(x) ?? 0) + 1), new Map());
    const ma = cnt(a), mb = cnt(b);
    const onlyA = [...ma].flatMap(([k, n]) => Array(Math.max(0, n - (mb.get(k) ?? 0))).fill(k));
    const onlyB = [...mb].flatMap(([k, n]) => Array(Math.max(0, n - (ma.get(k) ?? 0))).fill(k));
    if (!onlyA.length && !onlyB.length) { out.same++; continue; }
    out.diff++;
    // pair the unmatched lines by skeleton (numbers and hex colours masked, verdict word removed): same skeleton with a
    // different verdict word is a FLIP; same skeleton and verdict is numeric drift (largest Δ); no skeleton match: UNPAIRED
    const VERD = /\b(PASS|FAIL|UNMEASURED)\b/;
    const skel = (l) => l.replace(/#[0-9a-f]{6}\b/gi, "#").replace(/-?\d+(?:\.\d+)?/g, "#").replace(VERD, "V");
    const pool = [...onlyB]; let flips = 0, drift = 0, unpaired = 0, maxD = 0;
    for (const l of onlyA) {
      const j = pool.findIndex((m) => skel(m) === skel(l));
      if (j < 0) { unpaired++; continue; }
      const m = pool.splice(j, 1)[0];
      if ((l.match(VERD) ?? [])[1] !== (m.match(VERD) ?? [])[1]) { flips++; out.rows.push(`  ${name} LOG-FLIP ${f}: mine «${l.trim()}» · ${name} «${m.trim()}»`); continue; }
      drift++; const na = nums(l.replace(/#[0-9a-f]{6}\b/gi, "")), nb = nums(m.replace(/#[0-9a-f]{6}\b/gi, ""));
      if (na.length === nb.length) maxD = Math.max(maxD, ...na.map((v, k) => Math.abs(v - nb[k])));
    }
    unpaired += pool.length; out.flips = (out.flips ?? 0) + flips; out.unpaired = (out.unpaired ?? 0) + unpaired;
    out.rows.push(`  ${name} LOG ${f}: ${onlyA.length} line(s) only in mine, ${onlyB.length} only in ${name} · ${flips} flip(s), ${drift} numeric drift (largest Δ ${maxD.toFixed(2)}), ${unpaired} unpaired`);
    for (const l of onlyA) dump.push(`${name}\tLOG-MINE\t${f}\t${l}`);
    for (const l of onlyB) dump.push(`${name}\tLOG-REF\t${f}\t${l}`);
  }
  return out;
}

for (const [name, root] of Object.entries(runs).filter(([n]) => n !== "mine")) {
  const r = pairRuns(name, root);
  console.log(`RUNS vs ${name}: ${r.files} file(s) paired, ${r.missing} missing in ${name}, ${r.topDiff} top-level difference(s); ${r.cells} cell(s): ${r.flips} pass flip(s), ${r.sigMismatch} signature mismatch(es), ${r.lineSame} line(s) identical, ${r.lineDiff} differing (largest numeric Δ ${r.maxDelta.toFixed(2)})`);
  for (const row of r.rows) console.log(row);
}
for (const [name, dir] of Object.entries(logs).filter(([n]) => n !== "mine")) {
  const r = pairLogs(name, dir);
  console.log(`LOGS vs ${name}: ${r.logs} log(s) paired on verdict lines, ${r.same} identical, ${r.diff} differing · ${r.flips ?? 0} verdict flip(s), ${r.unpaired ?? 0} unpaired line(s)`);
  for (const row of r.rows) console.log(row);
}
if (args.dump) fs.writeFileSync(args.dump, dump.join("\n") + "\n");
