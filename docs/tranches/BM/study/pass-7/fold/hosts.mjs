// BM pass 7, fold of pass 6's critiques (B6-1): the host census again, by import as pass 1's census did, with the
// mounts counted in templates (`<Name`) and in render functions (`h(Name`), and a single ToggleGroup found across
// lines. Pass 6's census grepped templates only and missed every Home Assistant mount (Home Assistant mounts glass-ui
// through render functions). Reads git objects only (`git grep`, `git show`), checks out nothing.
// Run: ~/.claude/guard/guarded --light --timeout 5 -- node docs/tranches/BM/study/pass-7/fold/hosts.mjs
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
  { site: "Home Assistant", repo: `${P}/hassio-config`, ref: "0f6deae4", path: "frontend" },
];
const NAMES = ["Slider", "Switch", "Progress", "ToggleGroup", "PagerDots", "Carousel", "SegmentedTabs", "DockLayerGroup", "GlassDock", "ControlsDock"];
const EXCL = [":!*.md", ":!**/dist/**", ":!**/*.d.ts", ":!**/node_modules/**", ":!bench/paired/sheets/**", ":!**/*.test.*", ":!**/*.spec.*", ":!tests/**", ":!**/__tests__/**"];
const git = (repo, args) => { try { return execFileSync("git", ["-C", repo, ...args], { encoding: "utf8", maxBuffer: 1 << 26 }); } catch (e) { return e.status === 1 ? "" : ""; } };
const out = { at: new Date().toISOString(), method: "imports from @mkbabb/glass-ui parsed per file; mounts as `<Name` or `h(Name`; a single ToggleGroup by `type=\"single\"` or `type: \"single\"` in a file that imports ToggleGroup", sites: [] };
for (const s of SITES) {
  const head = git(s.repo, ["rev-parse", "--short", s.ref]).trim() || "missing";
  const files = git(s.repo, ["grep", "-l", "-E", "-e", "@mkbabb/glass-ui", s.ref, "--", `${s.path}/**/*.vue`, `${s.path}/**/*.ts`, `${s.path}/*.vue`, ...EXCL])
    .split("\n").filter(Boolean).map((l) => l.replace(`${s.ref}:`, ""));
  const row = { site: s.site, ref: `${s.ref}@${head}`, importers: {}, mounts: {}, toggleGroupSingle: [], sliderMarks: [], sliderStep: [] };
  for (const f of files) {
    const src = git(s.repo, ["show", `${s.ref}:${f}`]);
    const imports = [...src.matchAll(/import\s*(?:type\s*)?\{([^}]*)\}\s*from\s*["']@mkbabb\/glass-ui[^"']*["']/g)].flatMap((m) => m[1].split(",").map((x) => x.trim().split(/\s+as\s+/)[0]));
    for (const n of NAMES) {
      if (!imports.includes(n)) continue;
      (row.importers[n] ||= []).push(f);
      const lines = src.split("\n");
      lines.forEach((l, i) => { if (new RegExp(`(<${n}([\\s/>]|$)|\\bh\\(\\s*${n}\\b)`).test(l) && !/^\s*(\/\/|\*|\/\*)/.test(l)) (row.mounts[n] ||= []).push(`${f}:${i + 1}`); });
    }
    if (imports.includes("ToggleGroup")) {
      const m = [...src.matchAll(/type(?:=|:\s*)["']single["']/g)];
      if (m.length) row.toggleGroupSingle.push(`${f} (${m.length})`);
    }
    if (imports.includes("Slider")) {
      if (/(:marks=|\bmarks[,\s]|\bmarks:)/.test(src)) row.sliderMarks.push(f);
      if (/(:step=|\bstep[,\s]|\bstep:)/.test(src)) row.sliderStep.push(f);
    }
  }
  out.sites.push(row);
}
writeFileSync(path.join(HERE, "hosts.json"), JSON.stringify(out, null, 1));
for (const r of out.sites) console.log(r.site.padEnd(24), r.ref.padEnd(28), Object.entries(r.mounts).map(([k, v]) => `${k} ${v.length}`).join(" · "), "| single ToggleGroup:", r.toggleGroupSingle.length, "| Slider marks:", r.sliderMarks.length);
