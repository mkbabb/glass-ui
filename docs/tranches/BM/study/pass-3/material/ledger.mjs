// BM pass 3: the material's bytes, both sides (Q17), and the sites that touch the material tokens.
// CSS is cut from the 11.1.0 dist the sites load (Home Assistant's installed copy of the published package), as in
// pass 1 (`pass-1/ledger/measure.mjs`); each figure is a standalone gzip -9, an upper bound inside a site's sheet.
// The census reads git objects only at each site's ref (as `pass-1/census/census.mjs`), and checks nothing out.
// Run from the glass-ui checkout: ~/.claude/guard/guarded --light --timeout 5 -- node docs/tranches/BM/study/pass-3/material/ledger.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const DIST = "/Users/mkbabb/Programming/hassio-config/frontend/node_modules/@mkbabb/glass-ui/dist";
const gz = (s) => gzipSync(Buffer.from(s), { level: 9 }).length;
const css = (f) => readFileSync(path.join(DIST, f), "utf8");
// every declaration of a custom property whose name matches `re`, with its value, from a file
const decls = (file, re) => [...css(file).matchAll(/(--[\w-]+)\s*:\s*([^;{}]+);/g)].filter(([, n]) => re.test(n)).map(([d]) => d).join("");
const ruleBlocks = (file, re) => { const s = css(file), out = []; let i = 0;
  while (i < s.length) { const o = s.indexOf("{", i); if (o < 0) break; let d = 1, j = o + 1; while (j < s.length && d) { if (s[j] === "{") d++; else if (s[j] === "}") d--; j++; }
    const pre = s.slice(i, o).trim(), body = s.slice(o + 1, j - 1); if (re.test(pre + "{" + body)) out.push(`${pre}{${body}}`); i = j; }
  return out.join(""); };
const file = (f) => { try { return css(f); } catch { return ""; } };

const removed = {
  // one blur: four of five radius tokens and four of five composed recipes go (one of each stays)
  "four of the five blur radii and their composed recipes": (() => {
    const all = decls("styles/tokens/glass.css", /^--glass-blur-(wash|quiet|resting|floating|overlay)(-radius)?$/);
    const keep = decls("styles/tokens/glass.css", /^--glass-blur-resting(-radius)?$/);
    return { gz: gz(all) - gz(keep), note: "styles/tokens/glass.css" };
  })(),
  "the deep tier (a second blur continuum)": { gz: gz(file("styles/tokens/glass-deep.css") + file("styles/glass/deep.css")), note: "styles/tokens/glass-deep.css + styles/glass/deep.css" },
  "the rim's inset legs (catch-light and under-shade)": { gz: gz(decls("styles/tokens/glass-fx.css", /^--glass-(rim-top|rim-bottom|key-lit-y|key-shade-x|key-shade-y)$/) + decls("styles/tokens/dark-arm.css", /^--glass-rim-(top|bottom)$/) + decls("styles/glass/rim.css", /^--glass-material-rim$/)), note: "tokens/glass-fx.css, tokens/dark-arm.css, glass/rim.css; each use of the rim also loses a layer from its box-shadow list, not counted" },
  "the veil clamp (CSS half of the luminance clamp)": { gz: gz(decls("styles/tokens/glass-fx.css", /^--glass-backdrop-luma-knee$/) + ruleBlocks("styles/tokens/property-regs.css", /--glass-backdrop-luma\b/) + "clamp(var(--glass-veil-tier,var(--glass-veil-resting)),calc(var(--glass-veil-tier,var(--glass-veil-resting)) + 2*var(--glass-veil-step)*max(0,(var(--glass-backdrop-luma,0) - var(--glass-backdrop-luma-knee))/(1 - var(--glass-backdrop-luma-knee)))),calc(var(--glass-veil-tier,var(--glass-veil-resting)) + 2*var(--glass-veil-step)))"), note: "the knee token, the @property registration, the clamp expression in @utility glass-plate (veil.css:56-71, re-spelled minified)" },
};
// The sketch (sketch/material.next.css), minified by stripping comments and whitespace: the whole of it is charged
// as an addition, though its one radius, its plate rule and its two brackets replace rules that exist today.
const sketch = readFileSync(path.join(HERE, "sketch/material.next.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{};:,()])\s*/g, "$1").trim();
const added = {
  "the sketch, whole (one radius, the chrome mix, the edge, the plate, the two brackets)": { gz: gz(sketch), note: "sketch/material.next.css minified; an upper bound, since most of it replaces rules already shipped" },
};
const luminanceJs = 2860; // pass 1, `pass-1/ledger/ledger.json`: composable, sampler and math, bundled alone

// census
const P = "/Users/mkbabb/Programming";
const SITES = [
  ["atlas (library)", `${P}/atlas`, "u/build-atlas-rc", "src"], ["atlas (sci dashboards)", `${P}/sci-report`, "u/v19-sci", "dashboards"],
  ["value.js", `${P}/value.js`, "c45", "."], ["daraksha", `${P}/daraksha`, "b11-occasion", "."], ["fourier", `${P}/fourier-analysis`, "f45", "web"],
  ["keyframes", `${P}/keyframes.js`, "kf45", "."], ["gaggle", `${P}/gaggle-site`, "site-redesign", "dashboard"], ["Home Assistant", `${P}/hassio-config`, "master", "frontend"],
];
const TERMS = [
  ["a blur radius or recipe token", "--glass-blur-[a-z]+(-radius)?"],
  ["the deep tier", "glass-deep|--glass-depth|--glass-blur-deep"],
  ["the rim legs", "--glass-rim-(top|bottom)|--glass-material-rim"],
  ["the luminance clamp's CSS", "--glass-backdrop-luma|--glass-backdrop:"],
  ["the veil ink or rung tokens", "--glass-veil-(ink|base|step|tier|wash|quiet|resting|floating|overlay|dock|dialog|sheet)"],
  ["the saturate token", "--glass-saturate"],
  ["a backdrop-filter of its own", "backdrop-filter\\s*:"],
];
const SRC = [":(glob)**/*.vue", ":(glob)**/*.ts", ":(glob)**/*.css", ":(glob)**/*.js"];
const EXCL = [":(exclude,glob)**/docs/**", ":(exclude,glob)**/node_modules/**", ":(exclude,glob)**/dist/**", ":(exclude,glob)**/*.d.ts", ":(exclude,glob)**/bench/**"];
const git = (repo, args) => { try { return execFileSync("git", ["-C", repo, ...args], { encoding: "utf8", maxBuffer: 64 << 20 }); } catch (e) { return e.stdout || ""; } };
const census = {};
for (const [site, repo, ref, sub] of SITES) {
  const scope = sub === "." ? SRC : SRC.map((g) => g.replace(":(glob)", `:(glob)${sub}/`));
  census[site] = { ref: `${ref}@${git(repo, ["rev-parse", "--short", ref]).trim()}` };
  for (const [name, re] of TERMS) {
    const hits = git(repo, ["grep", "-n", "-E", "-e", re, ref, "--", ...scope, ...EXCL]).split("\n").filter(Boolean)
      .map((l) => l.slice(ref.length + 1)).filter((l) => !/(^|\/)(tests?|e2e|__tests__|tests-visual)\//.test(l) && !/\.(test|spec)\./.test(l));
    census[site][name] = { count: hits.length, first: hits.slice(0, 4).map((h) => h.slice(0, 160)) };
  }
}

const out = { at: new Date().toISOString(), dist: "glass-ui 11.1.0 (hassio-config's installed copy)", removed, added, luminance_clamp_js_gz: luminanceJs, census };
writeFileSync(path.join(HERE, "ledger.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify({ removed, added }, null, 1));
for (const [s, r] of Object.entries(census)) console.log(s.padEnd(24), r.ref.padEnd(26), TERMS.map(([n]) => `${n.split(" ").slice(-2).join(" ")}:${r[n].count}`).join("  "));
