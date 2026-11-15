// g12.mjs [built-dir]: W-I.8 G-12, static, over src and (when given) a built library folder.
// Comments are stripped before CSS is read, so prose that names a struck thing does not count.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
const W = "/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8";
const built = process.argv[2];
const walk = (d, ext) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p, ext) : ext.some((e) => p.endsWith(e)) ? [p] : []; });
const decomment = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
const dockCss = walk(`${W}/src/components/dock`, [".css"]).map((f) => [f, decomment(readFileSync(f, "utf8"))]);
const dockTs = walk(`${W}/src/components/dock`, [".ts", ".vue"]).map((f) => [f, readFileSync(f, "utf8")]);
const allCss = [...dockCss, ...[`${W}/src/styles/index.css`, `${W}/src/styles/tokens/shadow.css`].map((f) => [f, decomment(readFileSync(f, "utf8"))])];
const res = [];
const check = (name, hits) => res.push({ clause: name, pass: hits.length === 0, hits: hits.slice(0, 4) });
const grepRules = (files, selRe, propRe) => files.flatMap(([f, css]) => [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].filter((m) => selRe.test(m[1]) && propRe.test(m[2])).map((m) => `${f.replace(W + "/", "")}: ${m[1].trim().slice(0, 80)}`));
check("no scale on .glass-dock or its regions", grepRules(dockCss, /\.glass-dock(\s|$|[.:\[])|\.dock-(layers|persistent)/, /(^|;)\s*scale\s*:/));
check("no clip-path on a plate at rest", grepRules(dockCss, /\.dock-plate/, /clip-path\s*:(?!\s*none)/));
check("no box-shadow on .glass-dock", grepRules(dockCss, /^\s*\.glass-dock(\.[\w-]+)*\s*$/, /box-shadow\s*:/));
{
    const plateShadows = grepRules(dockCss, /\.dock-plate\s*$/, /box-shadow\s*:/);
    const reads = readFileSync(`${W}/src/styles/tokens/shadow.css`, "utf8").includes("var(--dock-shadow-color)") && !readFileSync(`${W}/src/styles/tokens/shadow.css`, "utf8").includes("--dock-halo");
    res.push({ clause: "one box-shadow value for the plate across both postures, reading --dock-shadow-color (and no --dock-halo)", pass: plateShadows.length === 1 && reads, hits: plateShadows });
}
check("no filter: url(, <filter or feGaussianBlur under dock", [...dockCss, ...dockTs.map(([f, t]) => [f, decomment(t)])].filter(([, s]) => /filter:\s*url\(|<filter|feGaussianBlur/.test(s)).map(([f]) => f.replace(W + "/", "")));
check("no size, margin or padding in a dock transition, @keyframes or .animate(", [
    ...dockCss.flatMap(([f, css]) => [...css.matchAll(/transition\s*:([^;]+);/g)].filter((m) => /(^|[\s,])(inline-size|block-size|width|height|min-[\w-]+|max-[\w-]+|margin[\w-]*|padding[\w-]*)\s/.test(m[1])).map((m) => `${f.replace(W + "/", "")}: ${m[1].trim().slice(0, 60)}`)),
    ...dockCss.flatMap(([f, css]) => [...css.matchAll(/@keyframes\s+([\w-]+)\s*\{([\s\S]*?)\n\}/g)].filter((m) => /(^|[\s{;])(inline-size|block-size|width|height|margin[\w-]*|padding[\w-]*)\s*:/.test(m[2])).map((m) => `${f.replace(W + "/", "")}: @keyframes ${m[1]}`)),
    ...dockTs.filter(([, s]) => /\.animate\([^)]*(width|height|margin|padding)/.test(s)).map(([f]) => f.replace(W + "/", "")),
]);
check("no var(--dock-expand-t) or var(--dock-morph-t) in a size, padding, inset, radius or margin", dockCss.flatMap(([f, css]) => [...css.matchAll(/([\w-]+)\s*:\s*([^;{}]*var\(--dock-(expand|morph)-t\)[^;{}]*);/g)].filter((m) => /^(inline-size|block-size|width|height|min-|max-|padding|inset|top|left|right|bottom|border-[\w-]*radius|border-radius|margin)/.test(m[1])).map((m) => `${f.replace(W + "/", "")}: ${m[1]}`)));
check("no border-radius on the plate in a scroll-timeline animation", grepRules(dockCss, /\.dock-plate/, /animation-timeline/));
check("--dock-morph-origin, --dock-size-scale, --dock-pane-shift, --dock-rest-t absent", allCss.flatMap(([f, css]) => ["--dock-morph-origin", "--dock-size-scale", "--dock-pane-shift", "--dock-rest-t"].filter((t) => css.includes(t)).map((t) => `${f.replace(W + "/", "")}: ${t}`)));
check("no [data-glyph selector under dock", dockCss.filter(([, s]) => s.includes("[data-glyph")).map(([f]) => f.replace(W + "/", "")));
check("no millisecond literal for the intent or the linger in useDockState.ts", (() => { const s = readFileSync(`${W}/src/components/dock/composables/useDockState.ts`, "utf8"); const code = s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, ""); return [...code.matchAll(/(tokenMs\([^)]*\)|setTimeout\([^;]*?,\s*(\d+)\))/g)].filter((m) => m[2] && !m[0].includes("lapse") && m[2] !== "0").map((m) => m[0]); })());
{
    const all = [...dockCss.map(([, s]) => s), ...dockTs.map(([, s]) => s)].join("\n");
    res.push({ clause: "[data-morphing], --dock-morph-t and --dock-expand-t present", pass: ["data-morphing", "--dock-morph-t", "--dock-expand-t"].every((t) => all.includes(t)), hits: [] });
}
if (built && existsSync(built)) {
    const files = walk(built, [".js", ".mjs", ".css"]);
    check("__dockHold absent from the built bundle", files.filter((f) => readFileSync(f, "utf8").includes("__dockHold")).map((f) => f.replace(built + "/", "")));
} else res.push({ clause: "__dockHold absent from the built bundle", pass: null, hits: ["no library build given"] });
for (const r of res) console.log(`${r.pass === null ? "UNREAD" : r.pass ? "pass" : "FAIL"} · ${r.clause}${r.hits.length ? " · " + r.hits.join("; ") : ""}`);
