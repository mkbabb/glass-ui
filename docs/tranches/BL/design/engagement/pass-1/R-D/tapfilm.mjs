#!/usr/bin/env node
// tapfilm.mjs · R-D: a coarse tap on a scene's target, filmed per frame: the host's effective scale (rect ratio),
// its computed `scale`, `--commit-t`, `:active`, and the state attribute. Explains E-2's tap(coarse) cell.
//   node tapfilm.mjs <build dir> [chromium|webkit] [scene]
const H = new URL("../../harness/", import.meta.url).pathname;
const L = await import(`${H}lib.mjs`);
const [build, engine = "chromium", scene = "switch"] = process.argv.slice(2);
await L.acquireLock();
const T = await L.serveTarget({ build }); const E = new L.Engine(engine); await E.browser();
console.log(`# tapfilm · ${engine} ${E.version} · scene ${scene} · ${L.browserCensus()} · load ${L.load()} at start`);
const P = await L.openPage(E, T, scene, { coarse: true });
const c = await L.center(P.page, '[data-e~="target"]');
const pr = P.page.evaluate(() => new Promise((ok) => {
  const el = document.querySelector('[data-e~="target"]'); const fr = []; const t0 = performance.now();
  const tick = () => { const cs = getComputedStyle(el); fr.push([Math.round(performance.now() - t0), window.__eff(el).s.toFixed(3), cs.scale, (+cs.getPropertyValue("--commit-t")).toFixed(3), el.matches(":active") ? "A" : "-", el.getAttribute("data-state")]);
    if (performance.now() - t0 < 700) requestAnimationFrame(tick); else ok(fr); };
  requestAnimationFrame(tick);
}));
await P.page.touchscreen.tap(c.x, c.y);
for (const r of (await pr).filter((_, k) => k % 3 === 0)) console.log(r.join("\t"));
console.log(`# load ${L.load()} at end`);
await P.close(); await E.close(); process.exit(0);
