// BM pass 8: the host census again (fold of pass 7's B7-12), with pass 8's presentations added.
// Pass 7's census matched `h(Name` on one line; Home Assistant writes `h(` and the component on the next line
// (presets.ts:270-271, climate.ts:178-179, GlassTabs.ts:366-367 at 0f6deae4). Here a render mount is `h(` followed by
// any whitespace, newlines included, then the name, matched over the whole file; a template mount is `<Name`.
// Pass 8 adds the overlays a presentation touches (menus, popovers, dialogs, sheets, the command palette, hints) and
// two props: a Sheet's `detents` and a Dialog's or Sheet's `veil`/`backdrop`.
// Reads git objects only (`git grep`, `git show`), checks out nothing.
// Run: ~/.claude/guard/guarded --light --timeout 5 -- node docs/tranches/BM/study/pass-8/fold/hosts.mjs
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
const HOSTS = ["Slider", "Switch", "Progress", "ToggleGroup", "PagerDots", "SegmentedTabs", "DockLayerGroup", "GlassDock", "ControlsDock"];
const OVERLAYS = ["DropdownMenu", "DropdownMenuContent", "ContextMenu", "ContextMenuContent", "Popover", "PopoverContent", "HoverCard", "Tooltip", "Select", "SelectContent", "Combobox", "Dialog", "DialogContent", "Sheet", "SheetContent", "CommandDialog", "Toaster"];
const NAMES = [...HOSTS, ...OVERLAYS];
const EXCL = [":!*.md", ":!**/dist/**", ":!**/*.d.ts", ":!**/node_modules/**", ":!bench/paired/sheets/**", ":!**/*.test.*", ":!**/*.spec.*", ":!tests/**", ":!**/__tests__/**"];
const git = (repo, args) => { try { return execFileSync("git", ["-C", repo, ...args], { encoding: "utf8", maxBuffer: 1 << 26 }); } catch { return ""; } };
const lineOf = (src, i) => src.slice(0, i).split("\n").length;
const isComment = (src, i) => /^\s*(\/\/|\*|\/\*)/.test(src.slice(src.lastIndexOf("\n", i) + 1, i + 1));
const out = { at: new Date().toISOString(), method: "imports from @mkbabb/glass-ui parsed per file; a mount is `<Name` in a template or `h(` then any whitespace (newlines included) then `Name` in a render function, matched over the whole file; comments skipped", sites: [] };
for (const s of SITES) {
  const head = git(s.repo, ["rev-parse", "--short", s.ref]).trim() || "missing";
  const files = git(s.repo, ["grep", "-l", "-E", "-e", "@mkbabb/glass-ui", s.ref, "--", `${s.path}/**/*.vue`, `${s.path}/**/*.ts`, `${s.path}/*.vue`, ...EXCL])
    .split("\n").filter(Boolean).map((l) => l.replace(`${s.ref}:`, ""));
  const row = { site: s.site, ref: `${s.ref}@${head}`, mounts: {}, toggleGroupSingle: [], sheetDetents: [], dialogVeilOff: [] };
  for (const f of files) {
    const src = git(s.repo, ["show", `${s.ref}:${f}`]);
    const imports = [...src.matchAll(/import\s*(?:type\s*)?\{([^}]*)\}\s*from\s*["']@mkbabb\/glass-ui[^"']*["']/g)].flatMap((m) => m[1].split(",").map((x) => x.trim().split(/\s+as\s+/)[0]));
    for (const n of NAMES) {
      if (!imports.includes(n)) continue;
      const re = new RegExp(`<${n}(?=[\\s/>])|\\bh\\(\\s*${n}\\b`, "g");
      for (const m of src.matchAll(re)) if (!isComment(src, m.index)) (row.mounts[n] ||= []).push(`${f}:${lineOf(src, m.index)}`);
    }
    if (imports.includes("ToggleGroup")) {
      const m = [...src.matchAll(/type(?:=|:\s*)["']single["']/g)];
      if (m.length) row.toggleGroupSingle.push(`${f} (${m.length})`);
    }
    if (imports.some((n) => n === "Sheet" || n === "SheetContent") && /(:detents=|\bdetents[,\s:=])/.test(src)) row.sheetDetents.push(f);
    if (imports.some((n) => n === "Dialog" || n === "DialogContent") && /(:veil=\s*["']false|veil:\s*false|:backdrop=)/.test(src)) row.dialogVeilOff.push(f);
  }
  out.sites.push(row);
}
writeFileSync(path.join(HERE, "hosts.json"), JSON.stringify(out, null, 1));
for (const r of out.sites) console.log(r.site.padEnd(24), r.ref.padEnd(28), Object.entries(r.mounts).map(([k, v]) => `${k} ${v.length}`).join(" · "), "| single TG files:", r.toggleGroupSingle.length, "| detented sheets:", r.sheetDetents.length, "| veil/backdrop set:", r.dialogVeilOff.length);
