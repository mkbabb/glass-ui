// lighting-census.mjs <root> — O-87's token-level census (static). Reads every `--shadow-*` custom property
// declared in a .css file under <root>/src and the five ladder blur radii. Prints one line per finding and
// exits 1 while any is open:
//   STACKED  a shadow token outside the cartoon stamp family with two or more layers
//   HALO     a shadow token with a zero-offset, blurred, non-inset layer (a glow)
//   BLUR     a ladder radius not below its 10.1.0 value, or a ladder that is no longer strictly ascending
import fs from "node:fs"; import path from "node:path";
const root = path.resolve(process.argv[2] ?? ".");
const BLUR_10_1 = { wash: 10, quiet: 14, resting: 16, floating: 20, overlay: 22 };
const files = []; (function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (p.endsWith(".css")) files.push(p); } })(path.join(root, "src"));
const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
const layers = (v) => { const out = []; let depth = 0, cur = ""; for (const ch of v) { if (ch === "(") depth++; if (ch === ")") depth--; if (ch === "," && depth === 0) { out.push(cur.trim()); cur = ""; } else cur += ch; } if (cur.trim()) out.push(cur.trim()); return out; };
const open = [];
for (const f of files.sort()) {
  const text = strip(fs.readFileSync(f, "utf8")); const rel = path.relative(root, f);
  for (const m of text.matchAll(/(--shadow-[a-z0-9-]+)\s*:\s*([^;{}]+);/g)) {
    const [, name, raw] = m; const line = text.slice(0, m.index).split("\n").length; const v = raw.replace(/\s+/g, " ").trim();
    if (/^var\(--shadow-[a-z0-9-]+\)$/.test(v) || !/\d/.test(v)) continue;            // an alias of another shadow token, or a colour
    const ls = layers(v);
    if (ls.length >= 2 && !name.startsWith("--shadow-cartoon")) open.push(`STACKED ${rel}:${line} ${name} layers=${ls.length}`);
    for (const l of ls) if (!/\binset\b/.test(l) && /^0(px)? 0(px)? [1-9][\d.]*px/.test(l)) open.push(`HALO ${rel}:${line} ${name} "${l.slice(0, 40)}"`);
  }
}
const glass = strip(fs.readFileSync(path.join(root, "src/styles/tokens/glass.css"), "utf8")); let prev = 0;
for (const [rung, was] of Object.entries(BLUR_10_1)) {
  const m = new RegExp(`--glass-blur-${rung}-radius:\\s*([\\d.]+)px`).exec(glass); const now = m ? +m[1] : NaN;
  if (!(now < was)) open.push(`BLUR --glass-blur-${rung}-radius ${now}px is not below 10.1.0's ${was}px`);
  if (!(now > prev)) open.push(`BLUR --glass-blur-${rung}-radius ${now}px breaks the ascending ladder`); prev = now;
}
for (const o of open) console.log(o);
const n = (k) => open.filter((o) => o.startsWith(k)).length;
console.log(`LIGHTING-CENSUS stacked=${n("STACKED")} halo=${n("HALO")} blur=${n("BLUR")} open=${open.length}`);
process.exit(open.length ? 1 : 0);
