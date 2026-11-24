// BM pass 6: census of the mark's hosts at each site (the hosts pass 6 designs: sliders and their props, the
// thumb's paint, switches, the pager, stepped and progress fills, scrolling dock runs). Reads git objects only
// (git grep on each site's ref, as pass 1's census.mjs), checks out nothing.
// Run: ~/.claude/guard/guarded --light --timeout 5 -- node docs/tranches/BM/study/pass-6/census/hosts.mjs
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const P = "/Users/mkbabb/Programming";
const SITES = [
  { site: "atlas (library)", repo: `${P}/atlas`, ref: "u/build-atlas-rc", path: "src" },
  { site: "atlas (sci dashboards)", repo: `${P}/sci-report`, ref: "u/v19-sci", path: "dashboards" },
  { site: "value.js", repo: `${P}/value.js`, ref: "c45", path: "." },
  { site: "daraksha", repo: `${P}/daraksha`, ref: "b11-occasion", path: "." },
  { site: "fourier", repo: `${P}/fourier-analysis`, ref: "f45", path: "web" },
  { site: "keyframes", repo: `${P}/keyframes.js`, ref: "kf45", path: "." },
  { site: "gaggle", repo: `${P}/gaggle-site`, ref: "site-redesign", path: "dashboard" },
  { site: "Home Assistant", repo: `${P}/hassio-config`, ref: "master", path: "frontend" },
];
const Q = [
  ["Slider mounts", "<Slider([ >]|$)"],
  ["Slider variant=spectrum", "variant=\"spectrum\""],
  ["Slider marks", ":marks="],
  ["Slider step", "(:step=|[^-]step=\")"],
  ["Slider loupe", "[^a-zA-Z-]loupe([^a-zA-Z-]|$)"],
  ["thumb paint token", "--slider-thumb-bg|--slider-range-bg"],
  ["Switch mounts", "<Switch([ />]|$)"],
  ["PagerDots or Carousel mounts", "<(PagerDots|Carousel)([ >]|$)"],
  ["Progress mounts", "<Progress([ />]|$)"],
  ["ScrollProgressRim inset", "edge=\"inset\""],
  ["DockLayerGroup mounts", "<DockLayerGroup"],
  ["draggable (any component: SegmentedTabs' prop among them)", ":draggable|draggable=\"true\""],
  ["ToggleGroup mounts", "<ToggleGroup([ >]|$)"],
  ["ToggleGroup single", "<ToggleGroup[^>]*type=\"single\""],
];
const EXCL = [":!*.md", ":!**/dist/**", ":!**/*.d.ts", ":!**/node_modules/**", ":!bench/paired/sheets/**", ":!**/*.test.*", ":!**/*.spec.*", ":!tests/**", ":!**/__tests__/**"];
const out = { at: new Date().toISOString(), sites: [] };
for (const s of SITES) {
  let head = ""; try { head = execFileSync("git", ["-C", s.repo, "rev-parse", "--short", s.ref], { encoding: "utf8" }).trim(); } catch { head = "missing"; }
  const row = { site: s.site, ref: `${s.ref}@${head}`, hits: {} };
  for (const [name, re] of Q) {
    let txt = "";
    try { txt = execFileSync("git", ["-C", s.repo, "grep", "-n", "-E", "-e", re, s.ref, "--", `${s.path}/**/*.vue`, `${s.path}/**/*.ts`, `${s.path}/**/*.css`, `${s.path}/*.vue`, ...EXCL], { encoding: "utf8", maxBuffer: 1 << 24 }); } catch (e) { txt = e.status === 1 ? "" : (console.error(s.site, name, String(e.stderr).slice(0, 200)), ""); }
    const lines = txt.split("\n").filter(Boolean).map((l) => l.replace(`${s.ref}:`, "").slice(0, 220));
    // drop comments and glass-ui's own copied styles
    const keep = lines.filter((l) => !/^\S+:\d+:\s*(\/\/|\*|\/\*)/.test(l));
    if (keep.length) row.hits[name] = keep;
  }
  out.sites.push(row);
}
writeFileSync(path.join(HERE, "hosts.json"), JSON.stringify(out, null, 1));
for (const r of out.sites) console.log(r.site.padEnd(24), r.ref.padEnd(28), Object.entries(r.hits).map(([k, v]) => `${k}: ${v.length}`).join(" · "));
