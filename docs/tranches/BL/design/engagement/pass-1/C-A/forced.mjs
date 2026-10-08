#!/usr/bin/env node
// C-A · FL-3 read: under forced-colors: active (Chromium emulation), does each migrated member's press still change a
// paint property, and does the commit still move its scale? A rung with no forced-colors answer reads press [] here.
//   node forced.mjs --build <dir>
import { Engine, serveTarget, openPage, acquireLock, load, parseArgs, paintDiff, center, f } from "../../harness/lib.mjs";
const a = parseArgs(); const waited = await acquireLock();
const T = await serveTarget({ build: a.build }); const E = new Engine("chromium"); await E.browser();
console.log(`# C-A forced-colors · chromium ${E.version} · lock wait ${waited.toFixed(1)} s · load ${load()} at start`);
for (const sc of ["chip", "chipaction", "button", "accordion", "switch", "checkbox", "sortable"]) {
  for (const fc of ["none", "active"]) {
    const P = await openPage(E, T, sc, { theme: "light" });
    try {
      await P.page.emulateMedia({ forcedColors: fc });
      await P.page.waitForTimeout(200);
      const sel = sc === "sortable" ? '[data-sortable-id="a"]' : '[data-e~="target"]';
      const snap = () => P.page.evaluate((sel) => ({ p: window.__paint(sel), s: window.__eff(document.querySelector(sel)).s }), sel);
      const cc = await center(P.page, sel);
      await P.page.mouse.move(cc.x, cc.y); await P.page.waitForTimeout(300); const h = await snap();
      await P.page.mouse.down(); await P.page.waitForTimeout(250); const p = await snap(); await P.page.mouse.up();
      const d = paintDiff(h.p, p.p);
      console.log(`  ${d.length || Math.abs(p.s - h.s) >= 0.01 ? "ANSWERS" : "SILENT "} forced-colors ${fc.padEnd(6)} ${sc.padEnd(10)} press-only paint [${d.join(", ").slice(0, 120)}] Δscale ${f(p.s - h.s)} · load ${load()}`);
    } finally { await P.close(); }
  }
}
await E.close(); T.close(); console.log(`# end · load ${load()}`);
