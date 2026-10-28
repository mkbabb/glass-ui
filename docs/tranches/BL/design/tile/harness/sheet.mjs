#!/usr/bin/env node
// SHEET · H7-1, H7-4 · two static readings of a worktree that no paint read can make (REGISTRY §P6-4 B-1, B-4; rows R-10,
// E-3). It opens no browser, so it runs once, engine-free, like XSCRIPT. Paint's half of H7-1 is FACT's
// `foreign-ancestor` cell (fact-split.mjs), read on the attack build in both engines.
//   writers  H7-1 (B-1; R-10), widened by H8 (L-1) and H9 (L-1a, L-1b) · every write of `--selection-tile` is the
//            route's one rule. A write is any value other than `none` or `inherit` (quotes and `!important` aside):
//            `var(--card-tile, flush)` and `on ? "flush" : "none"` write a tile as surely as the literal does (L-1).
//            H9 reads each language where it has one spelling:
//              CSS     THE BUILT STYLESHEET (L-1b), never the source. `--built <build dir>` names a build.mjs output of
//                      the same worktree; every `.css` file under its `dist/assets` is parsed with postcss, and each
//                      declaration whose property is `--selection-tile` (CSS escapes resolved) is read with its
//                      rule's selector. The consumer's pipeline compiles a CSS-escaped name (`--selection\-tile`) and
//                      a Tailwind `@apply [--selection-tile:flush]` to the plain declaration, so the pass-9 critic's
//                      two CSS spellings, which passed every source reader, are one spelling here; and a `.vue`
//                      `<style>` block is in it once its component is in the app. Rules under a `[data-arm…]` selector
//                      are the harness's own scene CSS (scenes.mjs, a route's `css`) and are not the library's. The
//                      route's rule is matched by its selector (attribute quotes and whitespace normalised): a built
//                      sheet carries no file. A build older than the newest file in the worktree's `src`, or of
//                      another worktree, stops the read loud (exit 2): a stale sheet is not read
//              script  `.vue` outside `<style>` and `.ts`, in the worktree's `src`, comments stripped (line numbers
//                      kept): (1) the property name in a writing position (followed by `:` or `,`: a style binding's
//                      key, a static `style="--selection-tile: plated"`, a `setProperty`'s first argument, a utility),
//                      its value read to the declaration's end (L-1); (2) the name as a quoted string literal anywhere
//                      but `getPropertyValue`'s argument or a writing position (L-1a): a name held in a constant is
//                      written later where no reader resolves it. A name built at run time (`"--selection-" + "tile"`)
//                      is no literal and no static reader resolves it; FACT's paint cells are its backstop wherever
//                      a composition reaches it (plants.mjs `concat`)
//            A read (`getPropertyValue("--selection-tile")`, `var(...)`, a `style(--selection-tile: …)` query) is not a
//            write. The route names its one rule in its `route.json` (`tileWriter: { file, selector }`); with no route
//            (HEAD, a floor alone) the want is no writer at all. Gating
//   wrap     H7-4 (B-4; E-3) · MIGRATION.md's `--selection-tile` bullet is one wrapped paragraph: every line fits the
//            repository's measure (`.prettierrc.json` printWidth, 88) and every break is where a fill would put it (the
//            next line's first word, a backtick code span counted whole, would not fit on the line). The bullet runs
//            from its `- \`--selection-tile\`` line to the next line that is not a two-space continuation. Gating;
//            a worktree whose MIGRATION.md has no such bullet reads UNMEASURED (HEAD)
//   node sheet.mjs --wt <worktree> --built <build dir> [--route <route dir>] [--out <dir>]
//   node sheet.mjs --fixture [--fault <name>] [--out <dir>]
//   node sheet.mjs --selftest [--out <dir>]
//   node sheet.mjs --fill --wt <worktree>     prints the worktree's bullet filled at the measure (not a witness)
// The fixture is a small tree the script writes under <out>/sheet-fixture/<fault>/: the floor's registration and reset
// (base.css), a lane sheet with one route rule, a component that reads the fact, a filled MIGRATION bullet, and its
// built stylesheet (`build/dist/assets/index.css`, the fixture's CSS as the pipeline emits it: minified, attribute
// quotes dropped, escapes and `@apply` resolved). Plants: `sh-foreign` the critic's foreign writer in base.css;
// `sh-markup` a style binding that writes `plated` in a `.vue` template; `sh-missing` the route names a rule the sheet
// does not have; `sh-ragged` the bullet with one line over the measure and one broken short (floor v5's seam). Control
// `sh-floor`: no route and no writer (a floor alone), PASS. H8 (L-1), the pass-7 critic's three spellings: `sh-var`
// `var(--card-tile, flush)` in base.css; `sh-static` a static `style="--selection-tile: plated"` in a `.vue` template;
// `sh-ternary` a `.ts` helper that writes `setProperty("--selection-tile", on ? "flush" : "none")`. Control `sh-reads`:
// reads (`getPropertyValue`, `var()`, a style query), `none`/`inherit` writes in code and a comment that names
// `--selection-tile: flush`, PASS. H9: `sh-const` (L-1a, `crit-const-name`) the name held in a constant and written
// through it; `sh-esc` (L-1b) a built sheet that still carries the escaped name `--selection\-tile: flush` (the reader
// resolves CSS escapes, so no pipeline's spelling of the ident hides it); control `sh-scene`: a write under a
// `[data-arm]` scene rule (the harness's CSS) is not the library's, PASS; `sh-stale`: the built sheet is older than
// `src`, HARNESS ERROR (exit 2).
// Exit 0 PASS, 1 FAIL, 2 on a harness error (no worktree, an unreadable route, no built sheet, a stale built sheet).
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { HARNESS, REPO, outRoot, parseArgs } from "./lib.mjs";

const requireNM = createRequire(path.join(process.env.TILE_HARNESS_NODE_MODULES ?? path.join(REPO, "node_modules"), "_.cjs"));
const postcss = requireNM("postcss");
const ws = (x) => x.replace(/\s+/g, " ").trim();
/** H8 (L-1): a value that writes no tile; anything else written to `--selection-tile` is a write */
const NOT_A_WRITE = /^["'`]?\s*(none|inherit)\s*["'`]?$/;
const isWrite = (v) => !NOT_A_WRITE.test(ws(v.replace(/!important/, "")));

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
}
/** CSS escapes resolved (`--selection\\-tile`, `--selection\\2d tile`): the ident the engine reads */
const unescape = (s) => s.replace(/\\([0-9a-fA-F]{1,6}\s?|[^\n0-9a-fA-F])/g, (_, e) => (/^[0-9a-fA-F]/.test(e) ? String.fromCodePoint(parseInt(e, 16)) : e));
/** a selector as a built sheet and a source both spell it: whitespace collapsed, attribute-value quotes dropped */
export const normSel = (s) => ws(s).replace(/\[([\w-]+)([~|^$*]?=)(["'])([^"']*)\3\]/g, "[$1$2$4]").replace(/\s*([>+~,])\s*/g, "$1");
/** H9 (L-1b) · every CSS write of a tile value in a build's built stylesheet: { file, selector, value, kind: "css" } */
export function builtWriters(buildDir, wt) {
  const metaFile = path.join(buildDir, "build.json"), assets = path.join(buildDir, "dist", "assets");
  if (!fs.existsSync(metaFile) || !fs.existsSync(assets)) return { error: `${buildDir} is no build.mjs output (no build.json or dist/assets)` };
  const meta = JSON.parse(fs.readFileSync(metaFile, "utf8"));
  if (wt && path.resolve(meta.worktree) !== path.resolve(wt)) return { error: `the built sheet ${buildDir} is of ${meta.worktree}, not of ${wt}` };
  const files = fs.readdirSync(assets).filter((f) => f.endsWith(".css"));
  if (!files.length) return { error: `${assets} holds no .css: no built sheet to read` };
  if (wt) {
    const newest = walk(path.join(wt, "src")).reduce((m, f) => Math.max(m, fs.statSync(f).mtimeMs), 0), built = Date.parse(meta.built);
    if (!(built >= newest)) return { error: `the built sheet ${buildDir} (built ${meta.built}) is older than the worktree's src (newest file ${new Date(newest).toISOString()}): rebuild before reading` };
  }
  const out = [];
  for (const f of files) {
    postcss.parse(fs.readFileSync(path.join(assets, f), "utf8")).walkDecls((d) => {
      if (unescape(d.prop) !== "--selection-tile") return;
      const v = ws(d.value.replace(/!important/, ""));
      if (!isWrite(v)) return;
      const chain = [];
      for (let p = d.parent; p && p.type !== "root"; p = p.parent) chain.push(p.type === "rule" ? p.selector : `@${p.name} ${p.params}`);
      if (chain.some((s) => /\[data-arm\b/.test(s))) return; // the harness's scene CSS, not the library's
      out.push({ file: `${path.basename(buildDir)}/dist/assets/${f}`, selector: d.parent?.type === "rule" ? normSel(d.parent.selector) : `@${d.parent?.name} ${d.parent?.params}`, value: v, kind: "css", prop: d.prop });
    });
  }
  return { writers: out, meta, files };
}
/** H9 (L-1, L-1a) · every script write, and every held name, in the worktree's src: { file, selector, value, kind } */
export function scriptWriters(wt) {
  const out = [];
  for (const f of walk(path.join(wt, "src"))) {
    const rel = path.relative(wt, f);
    if (!/\.(vue|ts)$/.test(f)) continue;
    const text = fs.readFileSync(f, "utf8");
    if (!text.includes("--selection-tile")) continue;
    // comments stripped (line numbers kept), outside a stylesheet
    const blank = (s) => s.replace(/[^\n]/g, " ");
    const code = (f.endsWith(".vue") ? text.replace(/<style\b[^>]*>[^]*?<\/style>/g, blank) : text)
      .replace(/<!--[^]*?-->|\/\*[^]*?\*\//g, blank).replace(/(^|[^:])(\/\/.*)$/gm, (_, a, c) => a + blank(c));
    const lineOf = (i) => code.slice(0, i).split("\n").length;
    // (1) the name in a writing position, its value to the declaration's end (L-1)
    for (const m of code.matchAll(/(?<!style\(\s*)--selection-tile["'`]?\s*[:,]\s*([^;"}\]\n]*(?:"[^"\n]*"[^;"}\]\n]*)*)/g)) {
      const v = m[1].replace(/\)\s*$/, "").trim();
      if (!isWrite(v)) continue;
      out.push({ file: rel, selector: `${rel}:${lineOf(m.index)} «${ws(m[0])}»`, value: v, kind: "markup" });
    }
    // (2) the name held: a quoted literal that is neither getPropertyValue's argument nor in a writing position (L-1a)
    for (const m of code.matchAll(/(getPropertyValue\(\s*)?(["'`])--selection-tile\2(\s*[:,])?/g)) {
      if (m[1] || m[3]) continue;
      out.push({ file: rel, selector: `${rel}:${lineOf(m.index)} «${ws(m[0])}»`, value: "(the name held: written where no reader resolves it)", kind: "literal" });
    }
  }
  return out;
}
/** MIGRATION.md's `--selection-tile` bullet, and every line a fill at `width` would break elsewhere */
export function bulletWrap(wt, width) {
  let md; try { md = fs.readFileSync(path.join(wt, "MIGRATION.md"), "utf8").split("\n"); } catch { return null; }
  const at = md.findIndex((l) => l.startsWith("- `--selection-tile`"));
  if (at < 0) return null;
  const lines = [md[at]];
  for (let i = at + 1; i < md.length && /^ {2}\S/.test(md[i]); i++) lines.push(md[i]);
  const firstWord = (l) => { const t = l.trim(); const m = t.match(/^`[^`]*`\S*|^\S+/); return m ? m[0] : ""; };
  const bad = [];
  lines.forEach((l, i) => {
    if (l.length > width && firstWord(l) !== l.trim()) bad.push(`line ${at + 1 + i} is ${l.length} columns (over ${width})`);
    if (i < lines.length - 1) { const w = firstWord(lines[i + 1]); if (l.length + 1 + w.length <= width) bad.push(`line ${at + 1 + i} breaks at ${l.length} columns while the next word «${w}» (${w.length}) fits`); }
  });
  return { from: at + 1, to: at + lines.length, lines: lines.length, bad };
}
function width(wt) { try { return JSON.parse(fs.readFileSync(path.join(wt, ".prettierrc.json"), "utf8")).printWidth ?? 88; } catch { return 88; } }

export function read(wt, route, built) {
  if (!fs.existsSync(path.join(wt, "src"))) return { error: `${wt} has no src` };
  if (!built) return { error: "pass --built <build dir>: SHEET reads CSS writes on the built stylesheet (H9, L-1b), never the source" };
  let rule = null, label = "no route (a floor alone: no writer is the want)";
  if (route) {
    const cfg = path.join(route, "route.json");
    if (!fs.existsSync(cfg)) return { error: `${route} has no route.json` };
    const j = JSON.parse(fs.readFileSync(cfg, "utf8"));
    if (!j.tileWriter?.file || !j.tileWriter?.selector) return { error: `${cfg} names no tileWriter { file, selector }: the route's one rule` };
    rule = { file: j.tileWriter.file, selector: normSel(j.tileWriter.selector) };
    label = `route ${j.label ?? path.basename(route)}: its one rule «${rule.selector.slice(0, 120)}» (${rule.file})`;
  }
  const b = builtWriters(built, wt);
  if (b.error) return { error: b.error };
  const cells = [];
  const ws_ = [...b.writers, ...scriptWriters(wt)];
  const isRule = (w) => rule && w.kind === "css" && w.selector === rule.selector;
  const foreign = ws_.filter((w) => !isRule(w)), mine = ws_.filter(isRule);
  const okW = foreign.length === 0 && (rule ? mine.length === 1 : true);
  cells.push({ gating: true, pass: okW, line: `writers · every --selection-tile write (any value but none | inherit; H8) is the route's one rule · CSS on the built sheet ${path.basename(built)} (${b.files.join(", ")}; H9 L-1b), script and held names in src (H9 L-1a) · ${label} · ${ws_.length} write(s) found${rule ? `, the route's rule ${mine.length}×${mine.length === 1 ? "" : " (WANT exactly 1)"}` : ""}${foreign.length ? ` · ${foreign.length} OTHER: ${foreign.map((w) => `${w.kind === "css" ? `${w.file} «${w.selector.slice(0, 80)}»${w.prop !== "--selection-tile" ? ` (written ${w.prop})` : ""}` : w.selector.slice(0, 120)} ${w.value} (${w.kind})`).join("; ")}` : " · no other writer"}` });
  const W = width(wt), bw = bulletWrap(wt, W);
  if (!bw) cells.push({ gating: true, pass: null, line: `wrap · MIGRATION.md's --selection-tile bullet · UNMEASURED: no such bullet (the floor has not written it)` });
  else cells.push({ gating: true, pass: bw.bad.length === 0, line: `wrap · MIGRATION.md:${bw.from}-${bw.to}, the --selection-tile bullet (${bw.lines} lines) is one paragraph filled at ${W} columns · ${bw.bad.length ? `RAGGED: ${bw.bad.join("; ")}` : "every line fits and every break is a fill's"}` });
  return { cells, label };
}

function report(cells, label, out) {
  const g = cells.filter((c) => c.gating && c.pass !== null), passed = g.filter((c) => c.pass).length, pass = g.length > 0 && passed === g.length;
  console.log(`SHEET · the tile fact has one writer, and MIGRATION's tile bullet is one wrapped paragraph (H7-1, H7-4, H9; R-10, E-3)`);
  console.log(`  target ${label} · engine-free (a static read of the built stylesheet, the worktree's script and MIGRATION.md) · harness ${HARNESS.rev} ${HARNESS.hash}`);
  for (const c of cells) console.log(`  ${(c.pass === null ? "UNMEASURED" : c.pass ? "PASS" : "FAIL").padEnd(10)} ${c.line}`);
  console.log(`SHEET ${pass ? "PASS" : "FAIL"} · ${passed}/${g.length} gating cells pass`);
  if (out) { fs.mkdirSync(path.join(out, "runs", "sheet"), { recursive: true }); fs.writeFileSync(path.join(out, "runs", "sheet", `SHEET-${label.replace(/[^\w.-]+/g, "_").slice(0, 80)}.json`), JSON.stringify({ id: "SHEET", harness: HARNESS, label, cells, pass }, null, 1)); }
  return pass ? 0 : 1;
}

// ── the fixture tree ───────────────────────────────────────────────────────────────────────────────────────────
/** fill a bullet's words at `width` (a backtick code span is one word), "- " first and two spaces after */
export function fill(text, width) {
  const words = text.match(/(?:`[^`]*`|[^\s`])+/g) ?? [], lines = [];
  let cur = "- ";
  for (const w of words) { if (cur.trim().length && cur.length + (/\s$/.test(cur) ? 0 : 1) + w.length > width && !/^(- | {2})$/.test(cur)) { lines.push(cur); cur = "  " + w; } else cur += (/\s$/.test(cur) ? "" : " ") + w; }
  lines.push(cur);
  return lines;
}
const BULLET = "`--selection-tile` (`none` | `flush` | `plated`, inherited) says whether a set of options are tiles. It is `none` on every `ToggleGroup`. A value takes effect on the group element, or on an element between the group and its options. An inline `--selection-tile: … !important` on an option outranks that, and it does not opt the option out: it splits it.";
const FILLED = fill(BULLET, 88);
// floor v5's seam: one line over the measure (a hunk's words appended), and the next broken short
const RAGGED = [FILLED[0], `${FILLED[1]} ${FILLED[2].trim()}`.slice(0, 104), "  short.", ...FILLED.slice(3)];
function fixtureTree(dir, fault) {
  fs.rmSync(dir, { recursive: true, force: true });
  const put = (rel, text) => { fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true }); fs.writeFileSync(path.join(dir, rel), text); };
  put(".prettierrc.json", JSON.stringify({ printWidth: 88 }));
  put("src/styles/utilities/base.css", `@property --selection-tile { syntax: "none | flush | plated"; inherits: true; initial-value: none; }\n@layer components {\n    .pill-row { display: inline-flex; }\n${fault === "sh-foreign" ? "    .card > .toggle-group { --selection-tile: flush; }\n" : ""}${fault === "sh-var" ? "    .card > .toggle-group { --selection-tile: var(--card-tile, flush); }\n" : ""}${fault === "sh-reads" ? "    /* a comment: `--selection-tile: flush` is the route's */\n    .segmented-tabs { --selection-tile: none; }\n    @container style(--selection-tile: flush) { .x { --y: var(--selection-tile); } }\n" : ""}}\n`);
  // H8 (L-1): the three spellings the H7 read missed, and a control of reads and non-writes in code
  if (fault === "sh-static") put("src/components/toggle-group/ToggleGroup.vue", `<template><div class="toggle-group" style="--selection-tile: plated"><slot /></div></template>\n`);
  if (fault === "sh-ternary") put("src/components/toggle-group/shape.ts", `/** a helper a later wave might add: write the tile fact from script */\nexport const writeTile = (el: HTMLElement, on: boolean) => el.style.setProperty("--selection-tile", on ? "flush" : "none");\n`);
  // H9 (L-1a): the name held in a constant and written through it (`crit-const-name`)
  if (fault === "sh-const") put("src/components/toggle-group/shape.ts", `/** the property name held once, as a later wave might spell it */\nexport const TILE_FACT = "--selection-tile";\nexport const writeTile = (el: HTMLElement) => el.style.setProperty(TILE_FACT, "flush");\n`);
  if (fault === "sh-reads") put("src/components/toggle-group/shape.ts", `// --selection-tile: flush is written by the lane sheet\n/* el.style.setProperty("--selection-tile", "flush") */\nexport const read = (el: HTMLElement) => getComputedStyle(el).getPropertyValue("--selection-tile").trim();\nexport const reset = (el: HTMLElement) => el.style.setProperty("--selection-tile", "none");\nexport const pin = { "--selection-tile": "inherit" };\n`);
  put("src/components/toggle-group/styles.css", `@layer components {\n    .toggle-group { --selection-tile: none; }\n${fault === "sh-floor" ? "" : '    .toggle-group[data-shape="cell"] {\n        --selection-tile: flush;\n    }\n'}    @scope (.toggle-group__item) to (.toggle-group, .segmented-tabs) { :scope, :scope * { --selection-tile: inherit !important; } }\n}\n`);
  put("src/components/toggle-group/ToggleGroupItem.vue", `<script setup lang="ts">\nconst tile = (b: HTMLElement) => getComputedStyle(b).getPropertyValue("--selection-tile").trim();\n</script>\n<template><button class="toggle-group__item"${fault === "sh-markup" ? ` :style="{ '--selection-tile': 'plated' }"` : ""}><slot /></button></template>\n<style>\n.toggle-group__item { --selection-tile: inherit; }\n</style>\n`);
  put("MIGRATION.md", ["# Migration", "", ...(fault === "sh-ragged" ? RAGGED : FILLED), "- The next bullet.", ""].join("\n"));
  // H9 (L-1b) · the built stylesheet, as the consumer's pipeline emits the fixture's CSS: every sheet and `.vue` `<style>`
  // block in src, comments and `@property` dropped, whitespace collapsed, attribute-value quotes dropped. `sh-esc`: a
  // built sheet that kept an escaped name; `sh-scene`: the harness's own scene rule under `[data-arm]`
  const css = walk(path.join(dir, "src")).flatMap((f) => (f.endsWith(".css") ? [fs.readFileSync(f, "utf8")] : f.endsWith(".vue") ? [...fs.readFileSync(f, "utf8").matchAll(/<style\b[^>]*>([^]*?)<\/style>/g)].map((m) => m[1]) : []))
    .join("\n").replace(/\/\*[^]*?\*\//g, "").replace(/@property[^{]*\{[^}]*\}/g, "").replace(/\[([\w-]+)="([^"]*)"\]/g, "[$1=$2]").replace(/\s+/g, " ")
    + (fault === "sh-esc" ? " @layer components{.card>.toggle-group{--selection\\-tile:flush}}" : "")
    + (fault === "sh-scene" ? ' [data-arm="migrated"].tx-matrix{.mx-st-consumer{--selection-tile:flush}}' : "");
  put("build/dist/assets/index-fixture.css", css);
  const newest = walk(path.join(dir, "src")).reduce((m, f) => Math.max(m, fs.statSync(f).mtimeMs), 0);
  put("build/build.json", JSON.stringify({ label: "sheet-fixture", worktree: dir, built: new Date(fault === "sh-stale" ? 946684800000 : Math.ceil(newest)).toISOString() }));
  const route = path.join(dir, "route");
  put("route/route.json", JSON.stringify({ label: "fixture", tileWriter: { file: "src/components/toggle-group/styles.css", selector: fault === "sh-missing" ? ".toggle-group[data-shape=\"tile\"]" : '.toggle-group[data-shape="cell"]' } }));
  return { wt: dir, route: fault === "sh-floor" ? null : route, built: path.join(dir, "build") };
}
export const SHEET_FAULTS = {
  "sh-foreign": { why: "H7-1 plant (`crit-foreign-writer`): `.card > .toggle-group { --selection-tile: flush }` in base.css, a second writer outside the lane sheet", cell: /^\s+FAIL\s+writers/ },
  "sh-markup": { why: "H7-1 plant: a `.vue` template's style binding writes `plated` on the item, a writer no sheet holds", cell: /^\s+FAIL\s+writers/ },
  "sh-missing": { why: "H7-1 plant: the route names a rule (`data-shape=\"tile\"`) the sheet does not have, so its one write is not the route's rule", cell: /^\s+FAIL\s+writers/ },
  "sh-ragged": { why: "H7-4 plant (B-4): the bullet has a line over 88 columns and a line broken short where two hunks meet", cell: /^\s+FAIL\s+wrap/ },
  "sh-floor": { why: "CONTROL, must PASS: a floor with no route writes no tile value, and the want is no writer", expect: "pass" },
  "sh-var": { why: "H8 plant (L-1, `crit-var-writer`): `.card > .toggle-group { --selection-tile: var(--card-tile, flush) }` in base.css, a writer H7 read as no write", cell: /^\s+FAIL\s+writers/ },
  "sh-static": { why: "H8 plant (L-1, `crit-static-style`): a static `style=\"--selection-tile: plated\"` in a `.vue` template", cell: /^\s+FAIL\s+writers/ },
  "sh-ternary": { why: "H8 plant (L-1, `crit-ts-ternary`): `setProperty(\"--selection-tile\", on ? \"flush\" : \"none\")` in a `.ts` helper", cell: /^\s+FAIL\s+writers/ },
  "sh-reads": { why: "H8 CONTROL, must PASS: reads (getPropertyValue, var(), a style query), none/inherit writes in code, and comments that name a tile value are no writer", expect: "pass" },
  "sh-const": { why: "H9 plant (L-1a, `crit-const-name`): the name held in a `.ts` constant and written through it, a write no value reader sees", cell: /^\s+FAIL\s+writers/ },
  "sh-esc": { why: "H9 plant (L-1b): a built sheet that kept the escaped name `--selection\\-tile: flush` on `.card > .toggle-group`; the reader resolves CSS escapes", cell: /^\s+FAIL\s+writers/ },
  "sh-scene": { why: "H9 CONTROL, must PASS: a write under a `[data-arm]` scene rule in the built sheet is the harness's CSS, not the library's", expect: "pass" },
  "sh-stale": { why: "H9 plant: the built sheet is older than src; the read stops loud (exit 2) instead of reading a stale sheet", expect: "error", cell: /stale|older than/ },
};

const a = parseArgs();
const out = outRoot(a);
try {
  if (a.selftest) {
    let broken = 0;
    const cases = [["clean", null], ...Object.keys(SHEET_FAULTS).map((f) => [f, SHEET_FAULTS[f]])];
    console.log(`sheet selftest · harness ${HARNESS.rev} ${HARNESS.hash} (${HARNESS.files} files)`);
    for (const [name, f] of cases) {
      const r = spawnSync(process.execPath, [new URL(import.meta.url).pathname, "--fixture", ...(f ? ["--fault", name] : []), "--out", out], { encoding: "utf8" });
      const o = (r.stdout ?? "") + (r.stderr ?? ""), last = o.trim().split("\n").reverse().find((l) => /^SHEET (PASS|FAIL)|HARNESS ERROR/.test(l)) ?? "(no verdict)";
      const want = !f || f.expect === "pass" ? 0 : f.expect === "error" ? 2 : 1;
      const fails = o.split("\n").filter((l) => (want === 2 ? /HARNESS ERROR/ : /^\s+FAIL\s/).test(l)), hit = !f?.cell || fails.some((l) => f.cell.test(l));
      const ok = r.status === want && (want === 0 || hit);
      if (!ok) broken++;
      console.log(`${ok ? "OK    " : "BROKEN"} SHEET ${name}${f ? ` (${f.why})` : ""} · exit ${r.status} (want ${want})${f && want && !hit ? ` · the planted cell ${f.cell} is not among the failing lines` : ""} · ${last}${fails[0] ? ` · first FAIL: ${fails[0].trim().slice(0, 200)}` : ""}`);
    }
    console.log(broken ? `sheet selftest: ${broken} BROKEN` : `sheet selftest: ${cases.length} runs; the check passes the fixture and the floor-alone and reads controls, and fails a foreign writer, a markup writer, a missing route rule, a ragged bullet and the three L-1 spellings (var, static style, ternary), the held name (L-1a) and an escaped name in the built sheet (L-1b) on the planted cell, passes a harness scene rule, and stops loud on a stale built sheet`);
    process.exit(broken ? 1 : 0);
  }
  if (a.fill && typeof a.wt === "string") { // print the worktree's bullet filled at the measure (for the floor's editor)
    const md = fs.readFileSync(path.join(a.wt, "MIGRATION.md"), "utf8").split("\n"), at = md.findIndex((l) => l.startsWith("- `--selection-tile`"));
    const lines = [md[at]]; for (let i = at + 1; i < md.length && /^ {2}\S/.test(md[i]); i++) lines.push(md[i]);
    console.log(fill(lines.map((l) => l.trim()).join(" ").replace(/^- /, ""), width(a.wt)).join("\n")); process.exit(0);
  }
  let wt, route, built, label;
  if (a.fixture) {
    const fault = typeof a.fault === "string" ? a.fault : "";
    ({ wt, route, built } = fixtureTree(path.join(out, "sheet-fixture", fault || "clean"), fault));
    label = `fixture${fault ? "+" + fault : ""}`;
  } else {
    if (typeof a.wt !== "string") throw new Error("pass --wt <worktree> --built <build dir> [--route <route dir>], --fixture or --selftest");
    wt = path.resolve(a.wt); route = typeof a.route === "string" ? path.resolve(a.route) : null; built = typeof a.built === "string" ? path.resolve(a.built) : null;
  }
  const j = read(wt, route, built);
  if (j.error) { console.error(`SHEET HARNESS ERROR ${j.error}`); process.exit(2); }
  process.exit(report(j.cells, label ?? `${path.basename(wt)} · ${j.label}`, out));
} catch (e) { console.error(`SHEET HARNESS ERROR ${e.stack ?? e}`); process.exit(2); }
