#!/usr/bin/env node
// film.mjs · pass 1, R-H: two reads behind E-4's new surfaces (H-7), on a harness build.
//   sheet     the detented bottom sheet's computed `position`, with and without its surface class, and where it paints
//   sortable  the drag ghost and the landed row, per frame after a fling and after a still release: which element is
//             read (G the ghost, R the row) and its centre along y in the list's frame
// It takes the D5 harness lock. Playwright WebKit is not Safari.
//   node film.mjs <build dir> [chromium|webkit]
const H = new URL("../../harness/", import.meta.url).pathname;
const L = await import(`${H}lib.mjs`);
const [build, engine = "chromium"] = process.argv.slice(2);
await L.acquireLock();
const T = await L.serveTarget({ build }); const E = new L.Engine(engine); await E.browser();
console.log(`# film · ${engine} ${E.version} · ${L.browserCensus()} · load ${L.load()} at start`);
{
  const P = await L.openPage(E, T, "sheet", { vp: { width: 700, height: 500 } });
  console.log("sheet " + await P.page.evaluate(() => {
    const s = document.querySelector('[data-slot="sheet-content"]'); const h = document.querySelector('[data-slot="sheet-detent-handle"]');
    const withClass = getComputedStyle(s).position; const cls = [...s.classList].join(" ");
    s.classList.remove("glass-floating"); const without = getComputedStyle(s).position; const yFixed = s.getBoundingClientRect().y; s.classList.add("glass-floating");
    return JSON.stringify({ classes: cls, position: withClass, positionWithoutGlassFloating: without, detentT: s.style.getPropertyValue("--detent-t"), sheetTop: s.getBoundingClientRect().y, sheetTopIfFixed: yFixed, handleCentreY: h.getBoundingClientRect().y + h.getBoundingClientRect().height / 2, viewportHeight: innerHeight, documentHeight: document.documentElement.scrollHeight });
  }) + ` · load ${L.load()}`);
  await P.close();
}
for (const still of [false, true]) {
  const P = await L.openPage(E, T, "sortable", { vp: { width: 700, height: 500 } });
  const c = await L.center(P.page, '[data-e~="grip"]');
  await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(120);
  for (let k = 1; k <= 3; k++) { await P.page.mouse.move(c.x, c.y + 40 * k); await P.page.waitForTimeout(16); }
  if (still) await P.page.waitForTimeout(250);
  const pr = P.page.evaluate(() => new Promise((ok) => {
    const fr = []; const t0 = performance.now();
    const tick = () => {
      const g = document.querySelector('[data-e~="thumb"]'), l = document.querySelector('[data-e~="land"]'), r = document.querySelector('[data-e~="root"]').getBoundingClientRect();
      const b = (g ?? l)?.getBoundingClientRect();
      fr.push(`${Math.round(performance.now() - t0)}:${g ? "G" : "R"}${b ? Math.round(b.y + b.height / 2 - r.top) : "-"}`);
      if (performance.now() - t0 < 1200) requestAnimationFrame(tick); else ok(fr);
    };
    requestAnimationFrame(tick);
  }));
  await P.page.mouse.up(); const fr = await pr;
  const order = await P.page.evaluate(() => [...document.querySelectorAll("[data-sortable-id]")].map((e) => e.dataset.sortableId).join(""));
  console.log(`sortable ${still ? "still" : "fling"} (ms:element+y, every 5th frame of ${fr.length}): ${fr.filter((_, i) => i % 5 === 0).join(" ")} · order after ${order} · load ${L.load()}`);
  await P.close();
}
await E.close(); T.close(); process.exit(0);
