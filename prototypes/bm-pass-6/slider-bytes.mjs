// BM pass 6 prototype probe: the Slider's bytes before and after the redesign (DESIGN §8.2), JS and CSS.
// JS: Slider.vue compiled by @vue/compiler-sfc (script setup, template inlined), bundled alone by rolldown with every
// import external, minified, gzip -9. CSS: the component sheet with comments and whitespace stripped, gzip -9.
// Every figure is a standalone gzip, an upper bound on the change inside a site's bundle.
// Run from this worktree: ~/.claude/guard/guarded --light --timeout 5 -- node prototypes/bm-pass-6/slider-bytes.mjs
import { readFileSync, writeFileSync, mkdtempSync, rmSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { gzipSync } from "node:zlib";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { parse, compileScript, registerTS } from "@vue/compiler-sfc";
registerTS(() => createRequire(import.meta.url)("typescript"));
const FS = { fileExists: existsSync, readFile: (f) => readFileSync(f, "utf8") };
import { rolldown } from "rolldown";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const ROOT = path.resolve(HERE, "../..");
const gz = (s) => gzipSync(Buffer.from(s), { level: 9 }).length;
const show = (rev, f) => execFileSync("git", ["-C", ROOT, "show", `${rev}:${f}`], { encoding: "utf8" });
async function js(file) {
  const { descriptor } = parse(readFileSync(file, "utf8"), { filename: file });
  const out = compileScript(descriptor, { id: "slider", inlineTemplate: true, fs: FS });
  const tmp = mkdtempSync(path.join(HERE, ".tmp-"));
  try {
    const f = path.join(tmp, "Slider.ts"); writeFileSync(f, out.content);
    const b = await rolldown({ input: f, external: (id) => id !== f, logLevel: "silent" });
    const { output } = await b.generate({ format: "esm", minify: true }); await b.close();
    return gz(output[0].code);
  } finally { rmSync(tmp, { recursive: true, force: true }); }
}
const cssMin = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}:;,>])\s*/g, "$1").trim();
// "before" is the main checkout's source (master; only docs differ there), so its types resolve beside it.
const MAIN = "/Users/mkbabb/Programming/glass-ui";
const before = { vue: path.join(MAIN, "src/components/slider/Slider.vue"), css: show("master", "src/components/slider/styles.css") };
const after = { vue: path.join(ROOT, "src/components/slider/Slider.vue"), css: readFileSync(path.join(ROOT, "src/components/slider/styles.css"), "utf8") };
const res = {
  at: new Date().toISOString(),
  master: execFileSync("git", ["-C", ROOT, "rev-parse", "--short", "master"], { encoding: "utf8" }).trim(),
  js_gz: { before: await js(before.vue), after: await js(after.vue) },
  css_gz: { before: gz(cssMin(before.css)), after: gz(cssMin(after.css)) },
  note: "after = the loupe, the focus veil mount, the grasp carriers and useDragVelocity removed from Slider.vue; the loupe rules and the weight-train removed from styles.css; the spectrum thumb's halo replaced by its plate. useDragVelocity's own module (809 B, pass 1) leaves every slider site's bundle with it; grasp.css and focus-veil.css stay W-R.1's.",
};
res.js_gz.delta = res.js_gz.after - res.js_gz.before; res.css_gz.delta = res.css_gz.after - res.css_gz.before;
writeFileSync(path.join(HERE, "slider-bytes.json"), JSON.stringify(res, null, 1));
console.log(JSON.stringify(res));
