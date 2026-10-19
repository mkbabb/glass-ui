#!/usr/bin/env node
// XSCRIPT · H5-5, H6-2 · the routes' transcriptions differ only by the declaration, and nothing in them or in the
// shared transcription blocks sets a rest ink on content (REGISTRY §P4-6.2 H5-5, §P5-6.2 H6-2; rows X-2, T-7).
// A static reading, not a paint read: it opens no browser, so it runs once, engine-free. Paint's half is REPORT
// `name-ink`, read on each route's build in both engines.
//   site equal   for EVERY site either route migrates: both routes migrate it, and with each declaration removed it is
//                the same markup and the same CSS (whitespace collapsed). The declarations: ` shape="cell"` on the
//                ToggleGroup (D′), and a `<template #media>` / `#meta` wrapper around a row (F), unwrapped (a `v-if` on
//                the slot moves onto the row it wraps). Gating (H5-5's K2 law, applied to every site: M-17)
//   site paint   no route's CSS for a site paints the option or its content: no colour, background, border, outline,
//                shadow, opacity or corner, no `fill` / `stroke` other than `currentColor` or `none`, and no
//                `[data-state]` selector; and its markup sets no ink on content: no text-colour, `fill-` or `stroke-`
//                utility, no `fill` / `stroke` attribute other than `currentColor` / `none`, no inline colour, and no
//                class bound to the selection model (`model`, `isMulti`). Gating (T-7's class; FV5-1's rest colour)
//   shared ink   `scenes.mjs`'s shared transcription blocks (`SHARED_CSS`) set no ink on content outside
//                `[data-arm="verbatim"]`: no `color`, `-webkit-text-fill-color`, or `fill` / `stroke` other than
//                `currentColor` / `none` / `inherit`, and no state selector, on a rule whose selector names a class that
//                a site's markup puts inside an option. Content is read from the markup (every class on an element
//                inside a `data-item` element, in the library, unmigrated and migrated templates). Gating (H6-2: this
//                block carried K2's rest colour into the migrated arm unseen, `D′c5` §2, §4.2). Other paint on content
//                there (a background, a shadow, a corner: the consumer's own media, such as K2's ball) is printed as info
//   node transcribe.mjs --routes <routeDirA>,<routeDirB> [--out <dir>]
//   node transcribe.mjs --fixture [--fault xs-paint|xs-drift|xs-none|xs-shared|xs-ink|xs-utility] [--out <dir>]
//   node transcribe.mjs --selftest [--out <dir>]
// The fixture is the two routes built from sites.mjs (`MIGRATED("shape")`, `MIGRATED("anatomy")`) over this harness's
// own SHARED_CSS. Plants: `xs-paint` D′'s pass-4 `.tile-name { color: var(--selection-ink) }` on one route's K2;
// `xs-drift` a class on one route's K2 items; `xs-none` a route with no K2 site (exit 2); `xs-shared` the shared K2
// block's `.tile-name` rest colour outside verbatim (H5's block, H6-1's cure struck); `xs-ink` one route-only
// `var(--selection-ink)` line (D′'s pass-5 `strip` `.tile-label`); `xs-utility` `text-muted-foreground` on the preset
// readout in BOTH routes (no drift: only the markup scan sees it). Exit 0 PASS, 1 FAIL, 2 when a route lacks K2 or
// cannot be read.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { HARNESS, outRoot, parseArgs } from "./lib.mjs";
import { MIGRATED } from "./sites.mjs";
import { SHARED_CSS, SITE_TEMPLATES, tags } from "./scenes.mjs";

const PAINT = /^(color|background(-color|-image)?|border(-[a-z-]+)?|outline(-[a-z-]+)?|box-shadow|opacity|border-radius|fill|stroke)$/;
const INK = /^(color|-webkit-text-fill-color|fill|stroke)$/;
const STATE_SEL = /\[data-state|\[aria-(checked|pressed|selected)|:checked|\.active\b/;
const VERBATIM = /\[data-arm="verbatim"\]/;
/** a text-colour, fill or stroke utility (the colour words of the theme and the Tailwind palette, or an arbitrary value) */
const INK_UTILITY = /^(?:[\w-]+:)*(text|fill|stroke)-(foreground|muted-foreground|muted|primary|primary-foreground|secondary|secondary-foreground|accent|accent-foreground|destructive|card-foreground|popover-foreground|background|ring|border|white|black|current|inherit|transparent|\[[^\]]*\]|(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-\d+)(\/\d+)?$/;

/** the markup with its declaration removed, whitespace collapsed; a `v-if` on an F slot moves onto the row it wraps */
export const undeclare = (html) => html
  .replace(/\s+shape="cell"/g, "")
  .replace(/<template\s+(?:v-if="([^"]*)"\s+)?#(?:media|meta)\s*>\s*([\s\S]*?)\s*<\/template>/g, (_, vif, inner) => (vif ? inner.replace(/^<([\w-]+)/, `<$1 v-if="${vif}"`) : inner))
  .replace(/\s+/g, " ").replace(/>\s+</g, "><").trim();
const squash = (css) => (css ?? "").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{};:,])\s*/g, "$1").trim();
/** every rule of a sheet, at-rules descended: [{ sel, decls: [[prop, value]] }] */
export function rules(css) {
  const s = squash(css), out = [];
  let i = 0;
  const block = (end) => {
    while (i < end) {
      const open = s.indexOf("{", i);
      if (open < 0 || open >= end) return;
      const head = s.slice(i, open).trim();
      let depth = 1, j = open + 1;
      for (; j < s.length && depth; j++) { if (s[j] === "{") depth++; else if (s[j] === "}") depth--; }
      const bodyEnd = j - 1;
      if (head.startsWith("@")) { i = open + 1; block(bodyEnd); }
      else out.push({ sel: head, decls: s.slice(open + 1, bodyEnd).split(";").filter(Boolean).map((d) => { const [p, ...v] = d.split(":"); return [p.trim(), v.join(":").trim()]; }) });
      i = j;
    }
  };
  block(s.length);
  return out;
}
/** every paint declaration in a route's CSS, with its selector (H5-5's law) */
export function paintIn(css) {
  const out = [];
  for (const { sel, decls } of rules(css)) for (const [prop, val] of decls) {
    const paints = PAINT.test(prop) && !((prop === "fill" || prop === "stroke") && /^(currentColor|none)$/i.test(val));
    if (paints || /\[data-state/.test(sel)) out.push(`${sel} { ${prop}: ${val} }`);
  }
  return out;
}
/** ink set on content by a route's markup (FV5-1): utilities, attributes, inline colours, model-bound classes */
export function inkInMarkup(html) {
  const out = [];
  for (const t of tags(html)) {
    if (t.text.startsWith("</")) continue;
    const tag = t.text.match(/^<([\w-]+)/)?.[1] ?? "?";
    for (const m of t.text.matchAll(/\sclass="([^"]*)"/g)) for (const c of m[1].split(/\s+/)) if (INK_UTILITY.test(c)) out.push(`<${tag}> class ${c}`);
    for (const m of t.text.matchAll(/\s(fill|stroke)="([^"]*)"/g)) if (!/^(currentColor|none)$/i.test(m[2])) out.push(`<${tag}> ${m[1]}="${m[2]}"`);
    for (const m of t.text.matchAll(/\s:?style="([^"]*)"/g)) if (/(^|[\s{;,'"])(color|fill|stroke)\s*:/.test(m[1])) out.push(`<${tag}> style "${m[1]}"`);
    for (const m of t.text.matchAll(/\s:class="([^"]*)"/g)) if (/\b(model|isMulti)\b/.test(m[1])) out.push(`<${tag}> :class bound to the selection model "${m[1]}"`);
  }
  return out;
}
/** every static class on an element inside a `data-item` element, across templates */
export function contentClasses(templates) {
  const out = new Set();
  const VOID = /^<(input|br|img|hr|meta|link|source|path|circle|rect|line|polyline|polygon|use)\b/;
  for (const tpl of templates) {
    const stack = [];
    for (const t of tags(tpl)) {
      if (t.text.startsWith("</")) { stack.pop(); continue; }
      const inItem = stack.some((e) => e.item);
      if (inItem) for (const m of t.text.matchAll(/\sclass="([^"]*)"/g)) for (const c of m[1].split(/\s+/).filter(Boolean)) out.add(c);
      if (!t.text.endsWith("/>") && !VOID.test(t.text)) stack.push({ item: /\sdata-item(?=[\s>=/])/.test(t.text) });
    }
  }
  return out;
}
/** H6-2 · ink on content in the shared blocks, outside verbatim */
export function sharedInk(css, content) {
  const gate = [], info = [];
  for (const { sel, decls } of rules(css)) for (const part of sel.split(",")) {
    if (VERBATIM.test(part)) continue;
    const names = [...part.matchAll(/\.([\w-]+)/g)].map((m) => m[1]).filter((c) => content.has(c));
    if (!names.length) continue;
    for (const [prop, val] of decls) {
      const line = `${part} { ${prop}: ${val} } (content: .${names.join(", .")})`;
      if ((INK.test(prop) && !((prop === "fill" || prop === "stroke") && /^(currentColor|none|inherit)$/i.test(val))) || (STATE_SEL.test(part) && PAINT.test(prop))) gate.push(line);
      else if (PAINT.test(prop) && !/^(currentColor|none|inherit)$/i.test(val)) info.push(line);
    }
  }
  return { gate, info };
}
async function loadRoute(dir) {
  const cfg = JSON.parse(fs.readFileSync(path.join(dir, "route.json"), "utf8"));
  const mod = (await import(pathToFileURL(path.resolve(dir, cfg.migrated)).href)).default;
  return { label: cfg.label ?? path.basename(dir), dir, sites: mod };
}
export function judge(routes, shared = SHARED_CSS) {
  const cells = [];
  const missing = routes.filter((r) => !r.sites.specimen);
  if (missing.length) return { error: `no specimen (K2) site in ${missing.map((r) => r.label).join(", ")}` };
  const [a, b] = routes;
  const at = (x, y) => { let k = 0; while (k < x.length && x[k] === y[k]) k++; return k; };
  const siteIds = [...new Set([...Object.keys(a.sites), ...Object.keys(b.sites)])];
  for (const site of siteIds) {
    const sa = a.sites[site], sb = b.sites[site];
    if (!sa || !sb) { cells.push({ gating: true, pass: false, line: `site equal · ${site} · migrated by ${sa ? a.label : b.label} only` }); continue; }
    const ma = undeclare(sa.group), mb = undeclare(sb.group), ca = squash(sa.css), cb = squash(sb.css);
    const km = at(ma, mb), kc = at(ca, cb);
    cells.push({ gating: true, pass: ma === mb && ca === cb, line: `site equal · ${site} · ${a.label} and ${b.label}, each with its declaration removed · markup ${ma === mb ? "equal" : `DIFFERS at char ${km}: «…${ma.slice(Math.max(0, km - 40), km + 60)}» vs «…${mb.slice(Math.max(0, km - 40), km + 60)}»`} · css ${ca === cb ? "equal" : `DIFFERS at char ${kc}: «${ca.slice(Math.max(0, kc - 30), kc + 60)}» vs «${cb.slice(Math.max(0, kc - 30), kc + 60)}»`}` });
  }
  for (const r of routes) for (const [site, m] of Object.entries(r.sites)) {
    const p = paintIn(m.css), k = inkInMarkup(m.group);
    cells.push({ gating: true, pass: p.length + k.length === 0, line: `site paint · ${r.label} ${site} · ${p.length + k.length ? `CONSUMER PAINT: ${[...p, ...k].join("; ")}` : "no rule paints the option and no markup sets ink on its content"}` });
  }
  const content = contentClasses([...Object.values(SITE_TEMPLATES()).flat(), ...routes.flatMap((r) => Object.values(r.sites).map((m) => m.group))]);
  const s = sharedInk(shared, content);
  cells.push({ gating: true, pass: s.gate.length === 0, line: `shared ink · scenes.mjs SHARED_CSS outside [data-arm="verbatim"] · ${s.gate.length ? `INK ON CONTENT: ${s.gate.join("; ")}` : `no rule sets ink on content (${content.size} content classes read from the markup)`}` });
  for (const l of s.info) cells.push({ gating: false, pass: true, line: `shared paint on content (not ink) · ${l}` });
  return { cells };
}
function report(id, cells, label, out) {
  const g = cells.filter((c) => c.gating), passed = g.filter((c) => c.pass).length, pass = g.length > 0 && passed === g.length;
  console.log(`XSCRIPT · the routes' transcriptions differ only by the declaration, paint nothing, and the shared blocks set no ink on content (H5-5, H6-2; X-2, T-7)`);
  console.log(`  target ${label} · engine-free (a static read of each route's migrated.mjs and scenes.mjs SHARED_CSS) · harness ${HARNESS.rev} ${HARNESS.hash}`);
  for (const c of cells) console.log(`  ${(c.gating ? (c.pass ? "PASS" : "FAIL") : "info").padEnd(10)} ${c.line}`);
  console.log(`XSCRIPT ${pass ? "PASS" : "FAIL"} · ${passed}/${g.length} gating cells pass`);
  if (out) { const dir = path.join(out, "runs", label); fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(path.join(dir, `${id}.json`), JSON.stringify({ id, label, harness: HARNESS, pass, cells }, null, 1)); }
  return pass ? 0 : 1;
}
const fixture = (fault) => {
  const d = MIGRATED("shape"), f = MIGRATED("anatomy");
  let shared = SHARED_CSS;
  if (fault === "xs-paint") d.specimen = { ...d.specimen, css: d.specimen.css + "\n.tile-name { color: var(--selection-ink); }" };
  if (fault === "xs-drift") d.specimen = { ...d.specimen, group: d.specimen.group.replace('data-surface="opaque"', 'data-surface="opaque" class="specimen-tile"') };
  if (fault === "xs-shared") shared += "\n.tile-name { color: var(--muted-foreground); }";
  if (fault === "xs-ink") d.strip = { ...d.strip, css: d.strip.css + "\n.tile-label { color: var(--selection-ink); }" };
  if (fault === "xs-utility") for (const r of [d, f]) r.preset = { ...r.preset, group: r.preset.group.replace("text-mono-caption tabular-nums", "text-mono-caption text-muted-foreground tabular-nums") };
  return { routes: [{ label: "fixture-shape", sites: d }, { label: "fixture-anatomy", sites: f }], shared };
};

if (import.meta.url === `file://${process.argv[1]}`) {
  const a = parseArgs();
  const out = outRoot(a);
  if (a.selftest) {
    const self = process.argv[1];
    const cases = [
      ["clean", [], 0, null],
      ["xs-paint (D′'s pass-4 name ink, consumer paint)", ["--fault", "xs-paint"], 1, /site (equal|paint) · .*specimen/],
      ["xs-drift (a class on one route's K2 items)", ["--fault", "xs-drift"], 1, /site equal · specimen/],
      ["xs-none (a route with no K2 site)", ["--fault", "xs-none"], 2, null],
      ["xs-shared (the shared K2 block's rest colour outside verbatim)", ["--fault", "xs-shared"], 1, /shared ink .*tile-name/],
      ["xs-ink (one route-only var(--selection-ink) line)", ["--fault", "xs-ink"], 1, /site (equal|paint) · .*strip/],
      ["xs-utility (a rest-colour utility on content in both routes)", ["--fault", "xs-utility"], 1, /site paint · .*preset .*text-muted-foreground/],
    ];
    let broken = 0;
    for (const [what, args, want, cell] of cases) {
      const r = spawnSync(process.execPath, [self, "--fixture", ...args, "--out", out], { encoding: "utf8" });
      const last = (r.stdout + r.stderr).trim().split("\n").filter((l) => /XSCRIPT (PASS|FAIL)|HARNESS ERROR/.test(l)).pop() ?? "(no verdict)";
      const fails = (r.stdout ?? "").split("\n").filter((l) => /^\s+FAIL\s/.test(l));
      const hit = !cell || fails.some((l) => cell.test(l));
      const ok = r.status === want && hit;
      if (!ok) broken++;
      console.log(`${ok ? "OK    " : "BROKEN"} XSCRIPT ${what} · exit ${r.status} (want ${want})${cell && !hit ? ` · the planted cell ${cell} is not among the failing lines` : ""} · ${last}${fails[0] ? ` · first FAIL: ${(fails.find((l) => !cell || cell.test(l)) ?? fails[0]).trim().slice(0, 220)}` : ""}`);
    }
    console.log(broken ? `xscript selftest: ${broken} BROKEN` : `xscript selftest: ${cases.length} runs; the check passes every site under two declarations, fails consumer paint, a drift, a shared rest colour, a route-only ink line and a rest-colour utility on the planted cell, and stops on a missing K2`);
    process.exit(broken ? 1 : 0);
  }
  let routes, label, shared = SHARED_CSS;
  try {
    if (a.fixture) {
      const fault = typeof a.fault === "string" ? a.fault : "";
      ({ routes, shared } = fixture(fault));
      if (fault === "xs-none") delete routes[1].sites.specimen;
      label = `fixture-xscript${fault ? "+" + fault : ""}`;
    } else {
      if (typeof a.routes !== "string" || a.routes.split(",").length !== 2) throw new Error("pass --routes <routeDirA>,<routeDirB> or --fixture");
      routes = await Promise.all(a.routes.split(",").map((d) => loadRoute(path.resolve(d))));
      label = `xscript-${routes.map((r) => r.label).join("-")}`;
    }
    const j = judge(routes, shared);
    if (j.error) { console.error(`XSCRIPT HARNESS ERROR ${j.error}`); process.exit(2); }
    process.exit(report("XSCRIPT", j.cells, label, out));
  } catch (e) { console.error(`XSCRIPT HARNESS ERROR ${e.stack ?? e}`); process.exit(2); }
}
