// BM pass 10 (DESIGN §9): the toggle glyph's bytes, master's against the sketch's. Today: the svg in
// `src/components/dark-mode-toggle/DarkModeToggle.vue` and the glyph rules of `dark-mode-toggle.css` (from
// `.toggle-sun,` to the end). Proposed: the sketch's svg and `dark-mode-toggle.next.css`. Standalone gzip -9,
// comments stripped, markup and rules each way. The button's own hover, focus and press rules are W-B.17's plate
// in the same 11.2.0 and are priced there, not here.
// Run: ~/.claude/guard/guarded --light --timeout 5 -- node docs/tranches/BM/study/pass-10/toggle/toggle-bytes.mjs
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname), REPO = path.resolve(HERE, "../../../../../..");
const gz = (s) => gzipSync(Buffer.from(s), { level: 9 }).length;
const css = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").trim();
const svg = (s) => { const a = s.indexOf("<svg"), b = s.indexOf("</svg>"); if (a < 0 || b < 0) throw new Error("no svg"); return s.slice(a, b + 6).replace(/\s+/g, " "); };
const show = (f) => execFileSync("git", ["-C", REPO, "show", "master:" + f], { encoding: "utf8" });
const vue0 = show("src/components/dark-mode-toggle/DarkModeToggle.vue"), css0 = show("src/components/dark-mode-toggle/dark-mode-toggle.css");
const g0 = css0.slice(css0.indexOf(".toggle-sun,"));
const vue1 = readFileSync(path.join(HERE, "sketch/DarkModeToggle.next.vue"), "utf8"), css1 = readFileSync(path.join(HERE, "sketch/dark-mode-toggle.next.css"), "utf8");
const out = {
  method: "standalone gzip -9; svg markup whitespace-collapsed; CSS comment-stripped",
  today: { svg: gz(svg(vue0)), css: gz(css(g0)) }, proposed: { svg: gz(svg(vue1)), css: gz(css(css1)) },
};
out.delta = { svg: out.proposed.svg - out.today.svg, css: out.proposed.css - out.today.css };
out.delta.total = out.delta.svg + out.delta.css;
out.script = "useLiquidPress leaves the component (the plate's press is W-B.17's installPress); its bytes are not counted here";
writeFileSync(path.join(HERE, "toggle.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out));
