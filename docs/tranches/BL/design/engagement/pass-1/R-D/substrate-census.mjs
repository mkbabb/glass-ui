#!/usr/bin/env node
// R-D · PORTFOLIO §6 D5-D item 1: the substrate map. Research read (not a witness): for each component directory,
// which shared surface recipes its files reference (comments stripped). Usage: node substrate-census.mjs <worktree>
import fs from "node:fs"; import path from "node:path";
const wt = path.resolve(process.argv[2] ?? "."); const C = path.join(wt, "src/components");
const SIG = {
  "control-bit": /\bcontrol-bit\b/, "capsule": /\bglass-capsule(-hover)?\b|\bglass-chip\b/, "control-surface": /\bcontrol-surface\b|--control-surface-bg/,
  "plate": /\bglass-(card|floating|overlay|overlay-plate|wash|resting|quiet|plate|opaque|well|atom)\b/, "disclosure": /\bdisclosure-trigger\b/,
  "field-control": /\bfield-control\b|glass-control-edge/, "track-well": /\btrack-well\b/, "overlay": /_shared\/overlay\b|_shared\/surface\/resolve/,
  "menu-row": /\bglass-menu-row\b|\bmenu-item\b/, "tap-squish": /\btap-squish\b/, "interactive-item": /\binteractive-item\b/,
  "useLiquidPress": /\buseLiquidPress\b/, "grasp": /\bglass-grasp-carrier\b|\buseDockHold\b/, "specular-track": /\bglass-specular-track\b/,
};
const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/<!--[\s\S]*?-->/g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : /\.(vue|ts|css)$/.test(e.name) ? [path.join(d, e.name)] : []);
const dirs = fs.readdirSync(C).filter((e) => e !== "_shared" && fs.statSync(path.join(C, e)).isDirectory()).sort();
const rows = []; const per = Object.fromEntries(Object.keys(SIG).map((k) => [k, []]));
for (const d of dirs) {
  const txt = walk(path.join(C, d)).map((f) => strip(fs.readFileSync(f, "utf8"))).join("\n");
  const hits = Object.entries(SIG).filter(([, re]) => re.test(txt)).map(([k]) => k);
  hits.forEach((k) => per[k].push(d)); rows.push([d, hits]);
}
for (const [d, h] of rows) console.log(`${d.padEnd(24)} ${h.join(" ") || "—"}`);
console.log(`\n${dirs.length} directories`);
for (const [k, v] of Object.entries(per)) console.log(`${k.padEnd(16)} ${String(v.length).padStart(2)}  ${v.join(" ")}`);
const none = rows.filter(([, h]) => !h.length).map(([d]) => d); console.log(`no shared recipe ${none.length}: ${none.join(" ")}`);
const multi = rows.filter(([, h]) => h.length > 1).length; console.log(`more than one recipe: ${multi}`);
