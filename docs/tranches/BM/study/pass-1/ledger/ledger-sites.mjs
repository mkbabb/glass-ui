// BM pass 1: the two-sided ledger per site, from ledger.json (measured removals, gz) and census.json
// (which glass-ui entries each site loads). Additions are ESTIMATES from a measured analogue, marked so.
import { readFileSync } from "node:fs";
const HERE = new URL(".", import.meta.url).pathname;
const L = JSON.parse(readFileSync(HERE + "ledger.json", "utf8")).rows;
const C = JSON.parse(readFileSync(HERE + "../census/census.json", "utf8")).sites;
const W = JSON.parse(readFileSync(HERE + "walk.json", "utf8")); // the stack walk alone, measure-walk.mjs
const gz = (name) => { if (name === "stack walk") return W.gz; const r = L.find((x) => x.name.startsWith(name)); if (!r) throw new Error(name); return r.gz; };

// Every site loads the whole stylesheet (`@mkbabb/glass-ui/styles`), or, for Home Assistant, glass.css,
// glass-specular-track.css, slider/styles.css and animations.css one by one (frontend/src/core/sheet.css:23-61).
const CSS_OUT = ["specular catch-light", "grasp register", "focus veil", "slider loupe rules", "capsule's own blur"];
const rows = [];
for (const s of C) {
  const sub = Object.keys(s.subpaths);
  const has = (p) => sub.includes(p);
  const dock = has("/dock"), slider = has("/slider"), menu = has("/menu") || has("/select"), strips = has("/tabs");
  const out = [], add = [];
  for (const n of CSS_OUT) out.push([n, gz(n)]);
  if (dock) {
    out.push(["luminance stack walk", gz("stack walk")]);
    out.push(["run mark writer", gz("useDockRunMark")]);
  }
  if (slider) out.push(["useDragVelocity", gz("useDragVelocity")]);
  // additions, estimated
  const markWriter = 600; // ESTIMATE: one translate-only writer; analogue useSelectionIndicator, measured
  if (dock) add.push(["the one mark's writer (est.)", markWriter]);
  else if (strips) add.push(["the one mark's writer, net of useSelectionIndicator (est.)", markWriter - gz("useSelectionIndicator")]);
  if (menu) add.push(["the bud, net of the menu clip strip (est.)", 450 - gz("menu clip-path strip")]);
  const sum = (a) => a.reduce((t, [, v]) => t + v, 0);
  rows.push({ site: s.site, ref: `${s.ref}@${s.head}`, dock, slider, menu, strips,
    removed: sum(out), added: sum(add), net: sum(add) - sum(out),
    ifWholeClamp: dock ? gz("luminance clamp") - gz("stack walk") : 0, out, add });
}
console.log(JSON.stringify({ note: "removals: standalone gzip -9, an upper bound on the in-entry saving; additions: estimates", rows }, null, 1));
