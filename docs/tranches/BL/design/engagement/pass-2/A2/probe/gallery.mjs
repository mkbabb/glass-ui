// P-A2 probe: what the gallery's census sees per directory (CK-01 latch reading), Chromium; closes what it opens.
import { serveTarget, load, Engine, openPage } from "../../../harness/lib.mjs";
const T = await serveTarget({ build: process.argv[2] });
const E = new Engine("chromium");
try {
  const Q = await openPage(E, T, process.argv[3] ?? "gallery");
  try {
    await Q.page.waitForTimeout(400);
    const c = await Q.page.evaluate(() => window.__census());
    for (const g of c.groups) console.log(g.dir, g.root, JSON.stringify(g.classes));
    console.log("unrendered:", await Q.page.evaluate(() => [...document.querySelectorAll('[data-t="unrendered"]')].map((e) => e.title)));
    console.log("errors:", Q.errors.slice(0, 6));
  } finally { await Q.close(); }
  console.log(`load ${load()}`);
} catch (e) { console.log("ERR", e.message); } finally { await E.close(); T.close?.(); process.exit(0); }
