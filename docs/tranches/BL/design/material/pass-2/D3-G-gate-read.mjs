#!/usr/bin/env node
// D3-G-gate-read.mjs · reads the D3-G-gate-probe.mjs records and prints the tables D3-G-gate.md cites.
//   node D3-G-gate-read.mjs <records dir> census|lib|tiles|extra|q2
// No browser. Every number printed is a mean over a sampled rect of a screenshot the probe took.
import fs from "node:fs";
import path from "node:path";

const [dir, what] = process.argv.slice(2);
const J = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
const f3 = (x) => (x == null ? "—" : (+x).toFixed(3));
const f1 = (x) => (x == null ? "—" : (+x).toFixed(1));
const q = (arr, p) => { const s = [...arr].sort((a, b) => a - b); return s.length ? s[Math.min(s.length - 1, Math.floor(p * (s.length - 1) + 0.5))] : NaN; };
const span = (arr) => (arr.length ? `${f3(Math.min(...arr))}-${f3(Math.max(...arr))}` : "—");
const med = (arr) => f3(q(arr, 0.5));

if (what === "census") {
  // one row per glass element per engine/theme/scene: its own causes and the isolated groups between it and the field
  for (const r of J("census.json")) {
    if (r.crashed) { console.log(`| ${r.engine} | ${r.theme} | ${r.scene} | CRASH | ${r.crashed} |`); continue; }
    for (const x of r.rows) console.log(`| ${r.engine} | ${r.theme} | ${r.scene} | \`${x.el}\` | ${x.portal ? "portal" : "app"} | ${x.own.join(", ") || "—"} | ${x.between.join("; ") || "none"} | ${r.load} |`);
  }
}

if (what === "lib") {
  for (const r of J("lib.json")) for (const x of r.rows) {
    const c = (k) => `${f3(x[k].L)} / ${f3(x[k].C)} / ${f1(x[k].h)}`;
    console.log(`| ${r.engine} | ${r.theme} | ${r.ground} | ${x.id} | ${c("raw")} | ${c("A")} | ${c("G")} | ${f1(x.G.dh)} | ${c("Pnoblur")} | ${c("Pnormal")} | ${x.rawDrift} | ${r.load} |`);
  }
}

// per variant, over the tiles whose raw ground carries hue (raw C > 0.02): composite C span and median, |Δh| p95, and C / Cmax median
const summ = (rows, key) => {
  const t = rows.filter((x) => x.raw.C > 0.02 && x[key]);
  const C = t.map((x) => x[key].C), L = t.map((x) => x[key].L), dh = t.map((x) => x[key].dh).filter((v) => v != null);
  const fr = t.map((x) => x[key].C / Math.max(1e-6, x[key].Cmax));
  return { n: t.length, L: span(L), C: span(C), Cmed: med(C), dh95: dh.length ? f1(q(dh, 0.95)) : "—", fr: med(fr) };
};

if (what === "tiles") {
  for (const r of J("tiles.json")) {
    const keys = Object.keys(r.rows[0]).filter((k) => !["k", "rect", "rawDrift", "raw"].includes(k));
    const raw = summ(r.rows.map((x) => ({ ...x, rawv: x.raw })), "raw");
    console.log(`\n${r.engine} ${r.theme} ${r.ground} · load ${r.load} · blur ${r.bf} · rawDrift max ${Math.max(...r.rows.map((x) => x.rawDrift)).toFixed(4)} · raw L ${raw.L} C ${raw.C}`);
    for (const k of keys) { const s = summ(r.rows, k); console.log(`| ${k} | ${s.n} | ${s.L} | ${s.C} | ${s.Cmed} | ${s.dh95} | ${s.fr} |`); }
  }
}

if (what === "extra") {
  for (const r of J("extra.json")) {
    if (r.row) { const c = (k) => `${f3(r.row[k].L)} / ${f3(r.row[k].C)} / ${f1(r.row[k].h)}`; console.log(`| ${r.engine} | ${r.theme} | ${r.ground} | popover | ${c("raw")} | ${c("A")} | ${c("sib")} | ${c("sib-nb")} | ${r.load} |`); continue; }
    for (const k of ["G-doors", "G-doors-nb", "G-anc", "G-anc-nb"]) { const s = summ(r.rows, k); console.log(`| ${r.engine} | ${r.theme} | ${r.ground} | ${k} | ${s.n} | ${s.L} | ${s.C} | ${s.Cmed} | ${s.dh95} | ${s.fr} | ${r.load} |`); }
  }
}

// Q2: light arm, per pole, G-open against A′ (wash = the thinnest rung, resting = the thickest content rung) on the same tile.
// ΔC = C(G) − C(A′); hue bins of the raw ground's OKLCh hue, 30° wide.
if (what === "q2") {
  for (const r of J("tiles.json").filter((x) => x.theme === "light")) {
    const poles = Object.keys(r.poles);
    console.log(`\n${r.engine} light ${r.ground} · load ${r.load}`);
    for (const p of poles) for (const A of ["A-wash", "A-resting"]) {
      const t = r.rows.filter((x) => x[`${p}:G-open`]);
      const d = t.map((x) => x[`${p}:G-open`].C - x[A].C);
      const hued = t.filter((x) => x.raw.C > 0.02), dh = hued.map((x) => x[`${p}:G-open`].C - x[A].C);
      console.log(`| ${p} vs ${A} | ${t.length} | G L ${span(t.map((x) => x[`${p}:G-open`].L))} | G C ${span(t.map((x) => x[`${p}:G-open`].C))} | A′ L ${span(t.map((x) => x[A].L))} | A′ C ${span(t.map((x) => x[A].C))} | ΔC all ${span(d)} max ${f3(Math.max(...d))} | ΔC hued(${hued.length}) max ${dh.length ? f3(Math.max(...dh)) : "—"} | tiles ΔC>0.01: ${d.filter((v) => v > 0.01).length} |`);
    }
    // per hue bin for the card pole against A-wash
    const bins = {};
    for (const x of r.rows) { if (x.raw.C <= 0.02) continue; const b = Math.floor(x.raw.h / 30) * 30; (bins[b] ||= []).push(x); }
    for (const p of poles) for (const [b, xs] of Object.entries(bins).sort((a, c) => a[0] - c[0]))
      console.log(`  bin ${p} h ${b}-${+b + 30} n ${xs.length}: G C ${span(xs.map((x) => x[`${p}:G-open`].C))} (Cmax ${span(xs.map((x) => x[`${p}:G-open`].Cmax))}) · A′wash C ${span(xs.map((x) => x["A-wash"].C))} · ΔC max ${f3(Math.max(...xs.map((x) => x[`${p}:G-open`].C - x["A-wash"].C)))} · G L ${span(xs.map((x) => x[`${p}:G-open`].L))}`);
  }
}
