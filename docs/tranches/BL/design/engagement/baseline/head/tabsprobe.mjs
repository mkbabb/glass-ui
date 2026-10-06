// scratch: film the SegmentedTabs indicator through E-4's exact gesture, fling vs still, per frame
import { serveTarget, Engine, openPage, center } from "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness/lib.mjs";
const [build, engine = "chromium"] = process.argv.slice(2);
const T = await serveTarget({ build }); const E = new Engine(engine);
for (const still of [false, true]) {
  const P = await openPage(E, T, "tabsdrag");
  const info = await P.page.evaluate(() => { const r = document.querySelector('[data-e~="root"]'); const i = document.querySelector('[data-e~="thumb"]'); return { root: r?.className, rootL: r?.getBoundingClientRect().left, ind: i?.className, indBox: JSON.stringify(i?.getBoundingClientRect()), pe: getComputedStyle(i).pointerEvents, sel: document.querySelector('[aria-selected="true"]')?.textContent, motion: document.querySelector('[data-motion]')?.dataset.motion }; });
  const c = await center(P.page, '[data-e~="thumb"]');
  const hit = await P.page.evaluate(([x, y]) => { const e = document.elementFromPoint(x, y); return e?.className + " " + e?.tagName; }, [c.x, c.y]);
  await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(120);
  const xs = [];
  for (let k = 1; k <= 3; k++) { await P.page.mouse.move(c.x + 40 * k, c.y); await P.page.waitForTimeout(16); xs.push(await P.page.evaluate(() => window.__eff(document.querySelector('[data-e~="thumb"]')).x)); }
  if (still) await P.page.waitForTimeout(250);
  const pr = P.page.evaluate(() => window.__sample('[data-e~="thumb"]', '[data-e~="root"]', 900));
  await P.page.mouse.up(); const fr = await pr;
  const sel = await P.page.evaluate(() => document.querySelector('[aria-selected="true"]')?.textContent);
  const tr = fr.filter((_, k) => k % 4 === 0).map((x) => `${x.t.toFixed(0)}:${x.a.x.toFixed(1)}/w${x.a.w.toFixed(0)}/rootL${x.b.l.toFixed(0)}s${x.b.s.toFixed(3)}`).join(" ");
  console.log(`${engine} ${still ? "STILL" : "FLING"} start ${c.x.toFixed(1)} · hit ${hit} · info ${JSON.stringify(info)} · during drag ${xs.map((x) => x.toFixed(1)).join(",")} · selected after ${sel}\n  ${tr}`);
  await P.close();
}
await E.close(); T.close();
