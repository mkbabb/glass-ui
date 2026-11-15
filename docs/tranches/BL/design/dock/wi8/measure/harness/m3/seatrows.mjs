import { readFileSync } from "node:fs"; import { gunzipSync } from "node:zlib";
const f = process.argv[2]; const mk = process.argv[3] || "twice"; const n = +(process.argv[4] || 30);
const d = JSON.parse(gunzipSync(readFileSync(f)).toString());
const m = d.marks.find((x) => x.name === mk); const a = m.row ?? m.i ?? m.frame;
console.log("marks", d.marks.map((x) => `${x.name}@${x.row ?? x.i ?? x.frame}:${Math.round(x.t)}`).join(" "));
const seats = Object.keys(d.rows[a].el).filter((k) => /^seat#/.test(k));
for (let q = a - 1; q < Math.min(d.rows.length, a + n); q++) { const r = d.rows[q]; console.log(q, r.t.toFixed(1), seats.map((s) => r.el[s] ? `${r.el[s].x.toFixed(2)}(${(r.el[s]["s:translate"]||"").replace(/px/g,"")})` : "-").join(" "), "plate", r.el.plate?.x.toFixed(2), r.el.plate?.w.toFixed(2), r.el.dock?.["a:data-morphing"] != null ? "M" : ""); }
