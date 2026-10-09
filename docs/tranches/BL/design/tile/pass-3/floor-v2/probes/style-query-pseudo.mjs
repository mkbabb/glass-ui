#!/usr/bin/env node
// floor-v2/probes/style-query-pseudo.mjs · which style-query forms each engine applies, on a registered
// custom-ident property set on an ancestor. Decides how the floor writes the perimeter switch.
//   node style-query-pseudo.mjs
// Cells (each reads a computed opacity that a matching rule sets to 1):
//   el-pos     @container style(--t: flush)          on an element
//   el-not     @container not style(--t: none)        on an element
//   el-or      @container style(--t: flush) or style(--t: plated)  on an element
//   ps-pos     the positive form on the element's ::before
//   ps-not     the negated form on ::before
//   ps-var     ::before reading a custom property the element got from a positive query on itself
// Each cell is read twice: STATIC (the ancestor's value set before load) and DYNAMIC (the ancestor starts at
// `none` and a rule injected after load sets `flush`, as a route's rule or a late `:has()` would).
import { chromium, webkit } from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs";
import os from "node:os";

const HTML = `<!doctype html><style>
@property --t { syntax: "none | flush | plated"; inherits: true; initial-value: none; }
.g { --t: flush; } .g.late { --t: none; } .g.late.flip { --t: flush; }
.x { opacity: 0; } .x::before { content: "a"; opacity: 0; }
@container style(--t: flush) { #el-pos { opacity: 1 } #ps-pos::before { opacity: 1 } #ps-var { --on: 1 } }
@container not style(--t: none) { #el-not { opacity: 1 } #ps-not::before { opacity: 1 } }
@container style(--t: flush) or style(--t: plated) { #el-or { opacity: 1 } }
#ps-var::before { opacity: var(--on, 0) }
</style><div class="g"><span class="x" id="el-pos"></span><span class="x" id="el-not"></span><span class="x" id="el-or"></span>
<span class="x" id="ps-pos"></span><span class="x" id="ps-not"></span><span class="x" id="ps-var"></span></div>`;

console.log(`style-query probe · load ${os.loadavg().map((v) => v.toFixed(2)).join(" / ")} at start`);
for (const [name, type] of [["Chromium", chromium], ["Playwright WebKit", webkit]]) {
  const b = await type.launch();
  const p = await b.newPage();
  const readAll = () => p.evaluate(() => Object.fromEntries(["el-pos", "el-not", "el-or", "ps-pos", "ps-not", "ps-var"].map((id) => {
    const e = document.getElementById(id);
    return [id, id.startsWith("ps") ? getComputedStyle(e, "::before").opacity : getComputedStyle(e).opacity];
  })));
  const fmt = (r) => Object.entries(r).map(([k, v]) => `${k} ${v === "1" ? "APPLIES" : "no (" + v + ")"}`).join(" · ");
  await p.setContent(HTML);
  console.log(`${name} ${b.version()} STATIC: ${fmt(await readAll())}`);
  await p.setContent(HTML.replace('<div class="g">', '<div class="g late">'));
  await p.evaluate(() => new Promise((res) => requestAnimationFrame(res)));
  await p.evaluate(() => document.querySelector(".g").classList.add("flip"));
  await p.evaluate(() => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res))));
  console.log(`${name} ${b.version()} DYNAMIC: ${fmt(await readAll())}`);
  await b.close();
}
console.log(`load ${os.loadavg().map((v) => v.toFixed(2)).join(" / ")} at end`);
