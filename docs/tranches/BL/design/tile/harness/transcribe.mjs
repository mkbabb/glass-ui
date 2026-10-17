#!/usr/bin/env node
// XSCRIPT · H5-5 · the routes' K2 transcriptions differ only by the declaration (REGISTRY §P4-6.2 H5-5; rows X-2, T-7).
// A static reading of the routes' `migrated.mjs`, not a paint read: it opens no browser, so it runs once, engine-free.
// Paint's half is REPORT `name-ink` (whether the selected name takes the selection ink), read on each route's build
// in both engines.
//   K2 equal    each route's `specimen` site, with its declaration removed, is the same markup and the same CSS as the
//               other's (whitespace collapsed). The declarations: ` shape="cell"` on the ToggleGroup (D′), and a
//               `<template #media>` / `#meta` wrapper around a row (F), unwrapped. Gating
//   K2 paint    no route's K2 CSS paints the tile or its content: no colour, background, border, outline, shadow,
//               opacity or corner, no `fill` / `stroke` other than `currentColor` or `none`, and no `[data-state]`
//               selector. Gating (T-7's class, consumer paint on a tile)
//   other sites the same paint scan on every other site a route transcribes, printed as info for the critics
//   node transcribe.mjs --routes <routeDirA>,<routeDirB> [--out <dir>]
//   node transcribe.mjs --fixture [--fault xs-paint|xs-drift] [--out <dir>]
//   node transcribe.mjs --selftest [--out <dir>]
// The fixture is two routes built from k2.mjs (`K2_SPECIMEN("shape")`, `K2_SPECIMEN("anatomy")`); `xs-paint` adds D′'s
// pass-4 `.tile-name { color: var(--selection-ink) }` to one, `xs-drift` gives one route's items a class the other's
// lack. Exit 0 PASS, 1 FAIL, 2 when a route has no `specimen` site or cannot be read.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { HARNESS, outRoot, parseArgs } from "./lib.mjs";
import { K2_SPECIMEN } from "./k2.mjs";

const PAINT = /^(color|background(-color|-image)?|border(-[a-z-]+)?|outline(-[a-z-]+)?|box-shadow|opacity|border-radius|fill|stroke)$/;
/** the markup with its declaration removed, whitespace collapsed */
export const undeclare = (html) => html
  .replace(/\s+shape="cell"/g, "")
  .replace(/<template\s+(?:v-if="[^"]*"\s+)?#(?:media|meta)\s*>([\s\S]*?)<\/template>/g, "$1")
  .replace(/\s+/g, " ").replace(/>\s+</g, "><").trim();
const squash = (css) => (css ?? "").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{};:,])\s*/g, "$1").trim();
/** every declaration in a flat or one-level-nested sheet, with its selector */
export function paintIn(css) {
  const out = [];
  for (const m of squash(css).matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const sel = m[1].trim();
    for (const d of m[2].split(";").filter(Boolean)) {
      const [p, ...v] = d.split(":"); const prop = p.trim(), val = v.join(":").trim();
      const paints = PAINT.test(prop) && !((prop === "fill" || prop === "stroke") && /^(currentColor|none)$/i.test(val));
      if (paints || /\[data-state/.test(sel)) out.push(`${sel} { ${prop}: ${val} }`);
    }
  }
  return out;
}
async function loadRoute(dir) {
  const cfg = JSON.parse(fs.readFileSync(path.join(dir, "route.json"), "utf8"));
  const mod = (await import(pathToFileURL(path.resolve(dir, cfg.migrated)).href)).default;
  return { label: cfg.label ?? path.basename(dir), dir, sites: mod };
}
export function judge(routes) {
  const cells = [];
  const missing = routes.filter((r) => !r.sites.specimen);
  if (missing.length) return { error: `no specimen (K2) site in ${missing.map((r) => r.label).join(", ")}` };
  const [a, b] = routes;
  const ma = undeclare(a.sites.specimen.group), mb = undeclare(b.sites.specimen.group);
  const ca = squash(a.sites.specimen.css), cb = squash(b.sites.specimen.css);
  const at = (x, y) => { let k = 0; while (k < x.length && x[k] === y[k]) k++; return k; };
  const km = at(ma, mb), kc = at(ca, cb);
  cells.push({ gating: true, pass: ma === mb && ca === cb, line: `K2 equal · ${a.label} and ${b.label}, each with its declaration removed · markup ${ma === mb ? "equal" : `DIFFERS at char ${km}: «…${ma.slice(Math.max(0, km - 40), km + 60)}» vs «…${mb.slice(Math.max(0, km - 40), km + 60)}»`} · css ${ca === cb ? "equal" : `DIFFERS at char ${kc}: «${ca.slice(Math.max(0, kc - 30), kc + 60)}» vs «${cb.slice(Math.max(0, kc - 30), kc + 60)}»`}` });
  for (const r of routes) {
    const p = paintIn(r.sites.specimen.css);
    cells.push({ gating: true, pass: p.length === 0, line: `K2 paint · ${r.label} · ${p.length ? `CONSUMER PAINT on the tile: ${p.join("; ")}` : "no rule paints the tile or its content"}` });
    for (const [site, m] of Object.entries(r.sites)) if (site !== "specimen" && m.css) {
      const q = paintIn(m.css);
      if (q.length) cells.push({ gating: false, pass: false, line: `other site · ${r.label} ${site} · paint: ${q.join("; ")}` });
    }
  }
  return { cells };
}
function report(id, cells, label, out) {
  const g = cells.filter((c) => c.gating), passed = g.filter((c) => c.pass).length, pass = g.length > 0 && passed === g.length;
  console.log(`XSCRIPT · the routes' K2 transcriptions differ only by the declaration, and paint nothing (H5-5; X-2, T-7)`);
  console.log(`  target ${label} · engine-free (a static read of each route's migrated.mjs) · harness ${HARNESS.rev} ${HARNESS.hash}`);
  for (const c of cells) console.log(`  ${(c.gating ? (c.pass ? "PASS" : "FAIL") : "info").padEnd(10)} ${c.line}`);
  console.log(`XSCRIPT ${pass ? "PASS" : "FAIL"} · ${passed}/${g.length} gating cells pass`);
  if (out) { const dir = path.join(out, "runs", label); fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(path.join(dir, `${id}.json`), JSON.stringify({ id, label, harness: HARNESS, pass, cells }, null, 1)); }
  return pass ? 0 : 1;
}
const fixtureRoutes = (fault) => {
  const d = K2_SPECIMEN("shape"), f = K2_SPECIMEN("anatomy");
  if (fault === "xs-paint") d.css += "\n.tile-name { color: var(--selection-ink); }";
  if (fault === "xs-drift") d.group = d.group.replace('data-surface="opaque"', 'data-surface="opaque" class="specimen-tile"');
  return [{ label: "fixture-shape", sites: { specimen: d } }, { label: "fixture-anatomy", sites: { specimen: f } }];
};

if (import.meta.url === `file://${process.argv[1]}`) {
  const a = parseArgs();
  const out = outRoot(a);
  if (a.selftest) {
    const self = process.argv[1];
    const cases = [["clean", [], 0], ["xs-paint (D′'s pass-4 name ink, consumer paint)", ["--fault", "xs-paint"], 1], ["xs-drift (a class on one route's items)", ["--fault", "xs-drift"], 1], ["xs-none (a route with no K2 site)", ["--fault", "xs-none"], 2]];
    let broken = 0;
    for (const [what, args, want] of cases) {
      const r = spawnSync(process.execPath, [self, "--fixture", ...args, "--out", out], { encoding: "utf8" });
      const last = (r.stdout + r.stderr).trim().split("\n").filter((l) => /XSCRIPT (PASS|FAIL)|HARNESS ERROR/.test(l)).pop() ?? "(no verdict)";
      const fails = (r.stdout ?? "").split("\n").filter((l) => /^\s+FAIL\s/.test(l));
      const ok = r.status === want;
      if (!ok) broken++;
      console.log(`${ok ? "OK    " : "BROKEN"} XSCRIPT ${what} · exit ${r.status} (want ${want}) · ${last}${fails[0] ? ` · first FAIL: ${fails[0].trim().slice(0, 200)}` : ""}`);
    }
    console.log(broken ? `xscript selftest: ${broken} BROKEN` : `xscript selftest: ${cases.length} runs; the check passes one K2 under two declarations, fails consumer paint and a drift, and stops on a missing site`);
    process.exit(broken ? 1 : 0);
  }
  let routes, label;
  try {
    if (a.fixture) {
      const fault = typeof a.fault === "string" ? a.fault : "";
      routes = fixtureRoutes(fault);
      if (fault === "xs-none") delete routes[1].sites.specimen;
      label = `fixture-xscript${fault ? "+" + fault : ""}`;
    } else {
      if (typeof a.routes !== "string" || a.routes.split(",").length !== 2) throw new Error("pass --routes <routeDirA>,<routeDirB> or --fixture");
      routes = await Promise.all(a.routes.split(",").map((d) => loadRoute(path.resolve(d))));
      label = `xscript-${routes.map((r) => r.label).join("-")}`;
    }
    const j = judge(routes);
    if (j.error) { console.error(`XSCRIPT HARNESS ERROR ${j.error}`); process.exit(2); }
    process.exit(report("XSCRIPT", j.cells, label, out));
  } catch (e) { console.error(`XSCRIPT HARNESS ERROR ${e.stack ?? e}`); process.exit(2); }
}
