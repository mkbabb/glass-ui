#!/usr/bin/env node
// P-A · the census cells SPECS.md §3.1 asks of family A beyond E-1, read at runtime from a build of P-A's scene app.
//   drift            each rendered member's computed `--rung-class` equals its declared class (members[dir], or any
//                    class modes[dir] lists for a mode-split member); a child of a member reads `unclassed`
//   single           no element on the scene composes more than one `engage-*` class (a computed read cannot see
//                    a double composition: the later utility wins)
//   static-inert     a STATIC member's root is not focusable and carries no interactive role
// Each cell has a plant that must fail it, read on the same page: a separator recomposed as chosen (drift), a second
// class added to the switch (single), a separator given tabindex=0 (static-inert).
//   node census.mjs --build <dir> [--engine webkit]
import { Engine, serveTarget, openPage, acquireLock, load, parseArgs } from "../../harness/lib.mjs";

const a = parseArgs(); const engine = a.engine === "webkit" ? "webkit" : "chromium";
const waited = await acquireLock();
const T = await serveTarget({ build: a.build }); const E = new Engine(engine); await E.browser();
console.log(`# P-A census · ${a.build.split("/").pop()} · ${engine} ${E.version} · lock wait ${waited.toFixed(1)} s · load ${load()} at start`);
// scene, directory, the member's root selector, the class its rendered mode should stamp (for the print only)
const ROWS = [
  ["switch", "switch", '[role="switch"]'], ["checkbox", "checkbox", '[role="checkbox"]'], ["radio", "radio-group", '[role="radio"]'],
  ["chip", "chip", ".glass-chip"], ["chipaction", "chip", ".glass-chip"], ["button", "button", ".button"],
  ["accordion", "accordion", ".disclosure-trigger"], ["slider", "slider", ".glass-slider"],
  ["sortable", "sortable-list", ".sortable-item"], ["input", "input", 'input[data-slot="input"]'],
  ["passive", "separator", '[data-t="sep"]'], ["passive", "skeleton", '[data-t="skel"]'],
];
let fail = 0; const out = (ok, name, line) => { if (!ok) fail++; console.log(`  ${ok ? "PASS" : "FAIL"}       ${name} · ${line} · load ${load()}`); };
const plantOut = (failed, name, line) => { if (!failed) fail++; console.log(`  ${failed ? "PLANT-FAILS" : "PLANT-PASSES (witness blind)"} ${name} · ${line} · load ${load()}`); };
const read = (P, sel, dir) => P.page.evaluate(([sel, dir]) => {
  const e = document.querySelector(sel); const d = window.__e.decl;
  const allowed = d.modes?.[dir] ?? [d.members[dir]];
  const got = e ? getComputedStyle(e).getPropertyValue("--rung-class").trim() : "absent";
  const kids = e ? [...e.querySelectorAll("*")].map((k) => getComputedStyle(k).getPropertyValue("--rung-class").trim()).filter((v) => v && v !== "unclassed") : [];
  const multi = [...document.querySelectorAll('[class*="engage-"]')].map((n) => [...n.classList].filter((c) => c.startsWith("engage-"))).filter((l) => l.length > 1);
  const inert = e ? { tab: e.tabIndex, role: e.getAttribute("role"), focusable: e.tabIndex >= 0 } : null;
  return { got, allowed, kids, multi, inert, cls: d.members[dir] };
}, [sel, dir]);
for (const [scene, dir, sel] of ROWS) {
  const P = await openPage(E, T, scene, { theme: "light" });
  try {
    const r = await read(P, sel, dir);
    out(r.allowed.includes(r.got) && r.kids.length === 0, `drift ${scene}/${dir}`, `computed "${r.got}" · declared ${r.allowed.join("|")} · classed descendants [${r.kids.join(", ")}]`);
    out(r.multi.length === 0, `single ${scene}`, r.multi.length ? `elements with > 1 engage-* class: ${JSON.stringify(r.multi)}` : "every element composes at most one engage-* class");
    if (r.cls === "static") out(!r.inert.focusable && !/^(button|switch|checkbox|radio|slider|tab|link|menuitem|option)$/.test(r.inert.role ?? ""), `static-inert ${dir}`, `tabIndex ${r.inert.tab} role ${r.inert.role ?? "none"}`);
    if (scene === "passive" && dir === "separator") {
      const pd = await P.page.evaluate((sel) => { const e = document.querySelector(sel); e.classList.replace("engage-static", "engage-chosen"); return getComputedStyle(e).getPropertyValue("--rung-class").trim(); }, sel);
      plantOut(pd !== "static", "drift plant: separator recomposed engage-static → engage-chosen", `computed "${pd}" · declared static`);
      const pi = await P.page.evaluate((sel) => { const e = document.querySelector(sel); e.classList.replace("engage-chosen", "engage-static"); e.setAttribute("tabindex", "0"); return e.tabIndex; }, sel);
      plantOut(pi >= 0, "static-inert plant: separator given tabindex=0", `tabIndex ${pi}`);
    }
    if (scene === "switch") {
      const n = await P.page.evaluate((sel) => { document.querySelector(sel).classList.add("engage-pressed"); return [...document.querySelectorAll('[class*="engage-"]')].filter((x) => [...x.classList].filter((c) => c.startsWith("engage-")).length > 1).length; }, sel);
      plantOut(n > 0, "single plant: switch composes engage-chosen + engage-pressed", `${n} element(s) with > 1 engage-* class (computed stamp then reads "${await P.page.evaluate((sel) => getComputedStyle(document.querySelector(sel)).getPropertyValue("--rung-class").trim(), sel)}")`);
    }
  } finally { await P.close(); }
}
await E.close(); T.close();
console.log(`# P-A census ${engine} ${fail ? "FAIL" : "PASS"} · ${fail} failing cell(s) or blind plant(s) · load ${load()} at end`);
process.exit(fail ? 1 : 0);
