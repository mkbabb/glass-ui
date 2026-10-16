// W-C.2 prototype: MIGRATION.md is one section per version, newest first. Every `## ` heading is a bare
// semver; headings strictly descend; each is a version the registry published or package.json's version.
// Usage: node migration-shape.mjs [MIGRATION.md] [published versions, comma-separated]. Exit 1 on any miss.
import fs from "node:fs";
const s = fs.readFileSync(process.argv[2] ?? "MIGRATION.md", "utf8");
const published = new Set((process.argv[3] ?? "").split(",").filter(Boolean));
const pkgv = JSON.parse(fs.readFileSync("package.json", "utf8")).version; published.add(pkgv);
const heads = [...s.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
const cmp = (a, b) => { const [x, y] = [a, b].map((v) => v.split(".").map(Number)); for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] - y[i]; return 0; };
const fails = []; let prev = null;
for (const h of heads) {
  if (!/^\d+\.\d+\.\d+$/.test(h)) { fails.push(`heading is not a bare version: "${h.slice(0, 70)}"`); continue; }
  if (published.size > 1 && !published.has(h)) fails.push(`heading ${h} is not a published version`);
  if (prev && cmp(prev, h) <= 0) fails.push(`heading ${h} does not descend from ${prev}`);
  prev = h;
}
console.log(`migration-shape: ${heads.length} headings · ${fails.length} misses`); if (process.argv.includes("--list")) console.log(fails.join("\n"));
process.exitCode = fails.length ? 1 : 0;
