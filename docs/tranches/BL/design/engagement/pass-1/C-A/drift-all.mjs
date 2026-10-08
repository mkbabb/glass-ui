#!/usr/bin/env node
// C-A · the critic's drift read over EVERY rendered scene, not P-A's 12 hand-picked rows (pass-1/P-A/census.mjs).
// For each scene that renders a declared member, read the member root's computed `--rung-class` against the
// declaration (members[dir], or modes[dir]), and list every element that composes an engage-* class AND a
// retired-or-legacy press recipe (tap-squish, interactive-item, glass-capsule-hover): the "single" cell only
// counts engage-* classes, so a co-composed legacy press recipe is invisible to it.
//   node drift-all.mjs --build <dir> [--engine webkit]
import { Engine, serveTarget, openPage, acquireLock, load, parseArgs } from "../../harness/lib.mjs";
const a = parseArgs(); const engine = a.engine === "webkit" ? "webkit" : "chromium";
const waited = await acquireLock();
const T = await serveTarget({ build: a.build }); const E = new Engine(engine); await E.browser();
console.log(`# C-A drift-all · ${engine} ${E.version} · lock wait ${waited.toFixed(1)} s · load ${load()} at start`);
const ROWS = [
  ["tabs", "tabs", '[role="tablist"], .segmented-tabs'], ["tabs", "tabs", ".segmented-tab:nth-of-type(2)"],
  ["toggle", "toggle-group", '[data-t="item-b"]'], ["toggle", "toggle-group", '[role="group"]'],
  ["modal", "dialog", '[role="dialog"]'], ["sheet", "sheet", '[role="dialog"]'],
  ["carousel", "carousel", '[data-slot="carousel-content"]'], ["carousel", "carousel", '[data-slot="carousel"]'],
  ["button", "button", ".button"], ["chip", "chip", ".glass-chip"], ["chipaction", "chip", ".glass-chip"],
  ["switch", "switch", '[role="switch"]'], ["accordion", "accordion", ".disclosure-trigger"],
];
let drift = 0, dbl = 0;
for (const [scene, dir, sel] of ROWS) {
  const P = await openPage(E, T, scene, { theme: "light" });
  try {
    const r = await P.page.evaluate(([sel, dir]) => {
      const d = window.__e.decl; const allowed = d.modes?.[dir] ?? [d.members[dir]];
      const e = document.querySelector(sel);
      const got = e ? getComputedStyle(e).getPropertyValue("--rung-class").trim() : "absent";
      const LEG = ["tap-squish", "interactive-item", "glass-capsule-hover"];
      const both = [...document.querySelectorAll("*")].filter((n) => n.classList && [...n.classList].some((c) => c.startsWith("engage-")) && [...n.classList].some((c) => LEG.includes(c)))
        .map((n) => [...n.classList].filter((c) => c.startsWith("engage-") || LEG.includes(c)).join("+"));
      const legacyAnywhere = [...document.querySelectorAll("*")].filter((n) => n.classList && [...n.classList].some((c) => ["tap-squish", "interactive-item"].includes(c))).map((n) => `${n.tagName.toLowerCase()}.${[...n.classList].join(".")}`.slice(0, 90));
      return { got, allowed, both, legacyAnywhere, present: !!e };
    }, [sel, dir]);
    const ok = r.present && r.allowed.includes(r.got);
    if (r.present && !ok) drift++;
    if (r.both.length) dbl++;
    console.log(`  ${!r.present ? "ABSENT" : ok ? "MATCH " : "DRIFT "} ${scene}/${dir} ${sel} · computed "${r.got}" · declared ${r.allowed.join("|")} · engage+legacy [${r.both.join(", ")}] · tap-squish/interactive-item on page [${r.legacyAnywhere.join(" ; ")}] · load ${load()}`);
  } finally { await P.close(); }
}
await E.close(); T.close();
console.log(`# C-A drift-all ${engine}: ${drift} drifted member root(s), ${dbl} scene(s) with an engage-* class co-composed with a legacy press recipe · load ${load()} at end`);
