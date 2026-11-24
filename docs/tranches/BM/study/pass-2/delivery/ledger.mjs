// BM pass 2: the delivery's bytes, both sides, gzip -9 standalone (an upper bound inside a larger stream).
// CSS removals are cut from the 11.1.0 dist the sites load (Home Assistant's installed copy, as pass 1);
// the run's caps from bl/dock/wi8 (11.2.0, not yet shipped). JS is bundled alone with rolldown, minified,
// every import outside the file external. Additions are the sketches in ./sketch, measured the same way.
// Run: guarded --light -- node docs/tranches/BM/study/pass-2/delivery/ledger.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { gzipSync } from "node:zlib";
import path from "node:path";
import { rolldown } from "rolldown";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const ROOT = path.resolve(HERE, "../../../../../..");
const DIST = "/Users/mkbabb/Programming/hassio-config/frontend/node_modules/@mkbabb/glass-ui/dist";
const gz = (s) => gzipSync(Buffer.from(s), { level: 9 }).length;
const min = (css) => css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{};:,>])\s*/g, "$1").trim();
const read = (f) => readFileSync(f, "utf8");
function blocks(css) {
  const out = []; let i = 0;
  while (i < css.length) {
    const open = css.indexOf("{", i); if (open < 0) break;
    const prelude = css.slice(i, open).trim(); let depth = 1, j = open + 1;
    while (j < css.length && depth) { if (css[j] === "{") depth++; else if (css[j] === "}") depth--; j++; }
    out.push({ prelude, body: css.slice(open + 1, j - 1), children: /^@(layer|media|supports|container)/.test(prelude) ? blocks(css.slice(open + 1, j - 1)) : null });
    i = j;
  }
  return out;
}
function pick(css, test) {
  const walk = (bs) => bs.map((b) => {
    if (b.children) { const inner = walk(b.children); return inner ? `${b.prelude}{${inner}}` : ""; }
    return test(b.prelude, b.body) ? `${b.prelude}{${b.body}}` : "";
  }).join("");
  return walk(blocks(css));
}
async function bundle(file) {
  // every import outside the file itself is external, as pass 1 measured (a shared helper is not freed by one removal)
  const b = await rolldown({ input: file, external: (id, importer) => importer !== undefined && path.resolve(path.dirname(importer), id) !== file, logLevel: "silent" });
  const { output } = await b.generate({ format: "esm", minify: true });
  await b.close();
  return output[0].code;
}
const find = (re) => execFileSync("grep", ["-rlE", "-e", re, DIST + "/styles", DIST + "/components"], { encoding: "utf8" }).split("\n").filter(Boolean);

const rows = [];
const add = (side, release, what, bytes, note = "") => rows.push({ side, release, what, gz: bytes, note });

// 1. The spring tokens: six linear() curves against six single curves (the generated pass-2 fits).
const tokFile = find("--spring-dock:linear\\(|--spring-dock: linear\\(")[0];
const tokCss = read(tokFile);
const linear = [...tokCss.matchAll(/--spring-(press|present|dock|panel|bloom|world):\s*linear\([^;}]*\)/g)].map((m) => m[0]).join(";");
const curves = JSON.parse(read(path.join(HERE, "curves.json"))).tokenReplacement;
const bez = Object.entries(curves).map(([k, v]) => `--spring-${k}:cubic-bezier(${v.bezier.join(",")})`).join(";");
add("removed", "11.3.0", "six linear() spring tokens (a change of value, not of API)", gz(linear), path.relative(DIST, tokFile));
add("added", "11.3.0", "six cubic-bezier() spring tokens", gz(bez));

// 2. FadingScroll: the scrubbed ramps (registered customs, keyframes, the timeline rules) and the script fallback.
const fsFile = find("gl-fade-start-in")[0];
const fsCss = read(fsFile);
const fsToday = pick(fsCss, (p, b) => /fading-scroll|gl-fade-(start|end)|--fade-(start|end)/.test(p + b));
const propFile = find("@property --fade-start")[0];
const fsProps = pick(read(propFile), (p) => /--fade-(start|end)/.test(p));
add("removed", "12.0.0", "FadingScroll's scrubbed ramps: rules, keyframes, two registered properties", gz(fsToday + fsProps), path.relative(DIST, fsFile));
add("removed", "12.0.0", "useFadingScroll, the script fallback", gz(await bundle(path.join(ROOT, "src/components/fading-scroll/composables/useFadingScroll.ts"))));
add("added", "12.0.0", "FadingScroll's fixed ramps with the bleed (sketch)", gz(min(read(path.join(HERE, "sketch/fading-scroll.next.css")))));

// 3. scroll-chrome: the per-frame ramp and its machine, against a state and a transition.
add("removed", "12.0.0", "scroll-chrome.css (the ramp read from a registered property)", gz(read(path.join(DIST, "styles/scroll-chrome.css"))));
add("removed", "12.0.0", "useScrollChrome (the per-frame ramp machine)", gz(await bundle(path.join(ROOT, "src/composables/motion/scroll/useScrollChrome.ts"))));
add("added", "12.0.0", "scroll-chrome.css, a state played on scale, translate and opacity (sketch)", gz(min(read(path.join(HERE, "sketch/scroll-chrome.next.css")))));
add("added", "12.0.0", "useScrollChrome, a direction read that sets one attribute (sketch)", gz(await bundle(path.join(HERE, "sketch/useScrollChrome.next.ts"))));

// 4. ScrollProgressRim's border edge: the clip-path legs against the sliding window.
const rimCss = read(path.join(DIST, "components/scroll-progress-rim/styles.css"));
add("removed", "11.3.0", "ScrollProgressRim's border clip-path legs", gz(pick(rimCss, (p, b) => /__stroke|data-edge="border"/.test(p) && /clip-path|transition/.test(b))));
add("added", "11.3.0", "ScrollProgressRim's border as a sliding window (sketch)", gz(min(read(path.join(HERE, "sketch/scroll-progress-rim.next.css")))));

// 5. The run's caps on 11.2.0 (bl/dock/wi8): the scroll timeline and its four corner keyframes.
const wi8 = execFileSync("git", ["-C", ROOT, "show", "bl/dock/wi8:src/components/dock/styles/run.css"], { encoding: "utf8" });
const caps = pick(min(wi8), (p, b) => /gl-dock-clip|timeline-scope|scroll-timeline|animation-timeline/.test(p + b));
add("removed", "12.0.0 (after 11.2.0 ships)", "the run's scroll-driven corner: timeline, four keyframes, reduced-motion arm", gz(caps), "bl/dock/wi8 run.css, minified here");

// 6. The settle's player (candidate C), and what it replaces.
add("added", "11.3.0", "playSpring, the settle as compositor keyframes (sketch)", gz(await bundle(path.join(HERE, "sketch/playSpring.ts"))));
add("removed", "12.0.0", "useSpringMount (Dialog's and Sheet's per-frame Vue writes)", gz(await bundle(path.join(ROOT, "src/composables/motion/spring/useSpringMount.ts"))), "replaced by the player where Q6 holds");

const sum = (side, rel) => rows.filter((r) => r.side === side && (!rel || r.release.startsWith(rel))).reduce((a, r) => a + r.gz, 0);
const totals = {
  "11.3.0": { added: sum("added", "11.3.0"), removed: sum("removed", "11.3.0") },
  "12.0.0": { added: sum("added", "12.0.0"), removed: sum("removed", "12.0.0") },
};
writeFileSync(path.join(HERE, "ledger.json"), JSON.stringify({ at: new Date().toISOString(), rows, totals }, null, 1));
for (const r of rows) console.log(`${r.side.padEnd(8)} ${r.release.padEnd(28)} ${String(r.gz).padStart(6)}  ${r.what}`);
console.log(JSON.stringify(totals));
