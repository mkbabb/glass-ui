// O-211: what a DockLayerGroup with no switcher costs (rolldown minified, gzip -9,
// vue, reka-ui, @vueuse, lucide and keyframes external), against the given dist.
import { rolldown } from "rolldown";
import { gzipSync } from "node:zlib";
import { mkdtempSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const dist = process.argv[2];
const tmp = mkdtempSync(join(process.argv[3], "m-"));
const external = (id) => /^(vue|reka-ui|@vueuse\/|lucide|@lucide\/|@mkbabb\/keyframes)/.test(id) || id.endsWith(".css");
async function size(name, code) {
  const f = join(tmp, name + ".js"); writeFileSync(f, code);
  const b = await rolldown({ input: f, external, treeshake: true, logLevel: "silent" });
  const { output } = await b.generate({ format: "esm", minify: true, inlineDynamicImports: true });
  return gzipSync(Buffer.from(output.map((o) => o.code ?? "").join("\n")), { level: 9 }).length;
}
const base = await size("base", `import { GlassDock, DockControl } from "${dist}/dock.js"; console.log(GlassDock, DockControl);`);
const group = await size("group", `import { GlassDock, DockControl, DockLayerGroup, DockLayer } from "${dist}/dock.js"; console.log(GlassDock, DockControl, DockLayerGroup, DockLayer);`);
console.log(JSON.stringify({ dist: dist.replace(/.*worktrees\//, ""), base, group, delta: group - base, gateMax: base + 1024, pass: group <= base + 1024 }));
