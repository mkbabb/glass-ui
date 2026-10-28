#!/usr/bin/env node
// D4 pass 10 · CRITIC diagnostic for CRIT10-GEOM's four Playwright WebKit cells on `specimen-migrated` (K2): option 6
// («ease-in-back») read 205×114 at rest and 205×84.42 after a click selected it (390 and 1440), by click only; the keys
// path, which reads its rest after the click walk, passed. Is the move SELECTION's, or the first layout of content the
// click scrolled into view? Per viewport (390, 1440), light, two runs: every option's height (scroll-free offset chain
// and border box), its descendant 8's tag, class and inset, the option's computed content-visibility/contain, at:
//   t0 load (rest), t1 one second later (rest), s scrolled option 6 into view WITHOUT selecting (rest), top scrolled back
//   (rest), c clicked option 6 (selected), n model cleared (rest again), c2 clicked option 6 again (selected).
// Info only: the reading is the sequence. A move at `s` with nothing selected is not selection's.
//   node crit10-k2-diag.mjs --build <route build> [--engine webkit] [--out <dir>]
import { cli, openPage, engineVersion, engineOf, f2 } from "../../../harness/lib.mjs";

const NEUTRAL = "[data-scene], [data-scene] *, [data-scene] *::before, [data-scene] *::after { transform: none !important; scale: none !important; translate: none !important; rotate: none !important; transition: none !important; animation: none !important; }";
const READ = (neutral) => {
  const st = document.createElement("style"); st.textContent = neutral; document.head.append(st);
  const items = [...document.querySelectorAll("[data-scene] [data-item]")];
  const o6 = items[6], d8 = [...o6.querySelectorAll("*")][7], c = getComputedStyle(o6), b = o6.getBoundingClientRect();
  const out = { h: items.map((el) => el.getBoundingClientRect().height), oh: items.map((el) => el.offsetHeight), on: items.findIndex((el) => el.dataset.state === "on"), top: b.top, inner: innerHeight, scrollY, cv: c.contentVisibility, contain: c.contain, d8: d8 ? `${d8.tagName.toLowerCase()}.${String(d8.className?.baseVal ?? d8.className).trim().replace(/\s+/g, ".").slice(0, 60)} inset ${getComputedStyle(d8).inset}` : "none" };
  st.remove(); return out;
};
const settle = async (page) => { await page.waitForTimeout(150); for (let t = 0; t < 80; t++) { if (!(await page.evaluate(() => document.getAnimations().some((a) => a.playState === "running")))) break; await page.waitForTimeout(50); } };

await cli("CRIT10-K2-DIAG", async (args, target) => {
  const engine = engineOf(args), cells = [];
  for (const w of [390, 1440]) for (const run of [1, 2]) {
    const P = await openPage(target, engine, "specimen-migrated", { mode: "light", query: { sel: "none" } });
    const seq = [];
    try {
      const { page } = P, loc = page.locator("[data-scene] [data-item]");
      await page.setViewportSize({ width: w, height: 900 }); await page.mouse.move(2, 2);
      await page.evaluate(() => window.__tile?.select?.(null)); await settle(page);
      const rd = async (what) => seq.push({ what, ...(await page.evaluate(READ, NEUTRAL)) });
      await rd("t0 rest"); await page.waitForTimeout(1000); await rd("t1 rest +1 s");
      await loc.nth(6).scrollIntoViewIfNeeded(); await settle(page); await page.waitForTimeout(300); await rd("s rest, option 6 scrolled into view");
      await page.evaluate(() => scrollTo(0, 0)); await settle(page); await rd("top rest, scrolled back");
      await loc.nth(6).click(); await page.mouse.move(2, 2); await settle(page); await rd("c option 6 clicked");
      await page.evaluate(() => window.__tile?.select?.(null)); await settle(page); await rd("n cleared");
      await loc.nth(6).click(); await page.mouse.move(2, 2); await settle(page); await rd("c2 option 6 clicked again");
    } finally { await P.close(); }
    cells.push({ gating: false, pass: true, line: `specimen-migrated ${w}×900 light run ${run} · option 6 height (rect / offset) per step: ${seq.map((s) => `${s.what}: ${f2(s.h[6])}/${s.oh[6]} on=${s.on} top ${f2(s.top)} of ${s.inner} scrollY ${f2(s.scrollY)}`).join(" | ")} · cv ${seq[0].cv} contain ${seq[0].contain} · desc 8 ${seq[0].d8} → ${seq.at(-1).d8} · every option at t0 ${seq[0].h.map(f2).join(",")} · at s ${seq[2].h.map(f2).join(",")}` });
  }
  return { id: "CRIT10-K2-DIAG", title: "K2 option 6: selection or first layout? (pass-10 critic diagnostic, info)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
});
