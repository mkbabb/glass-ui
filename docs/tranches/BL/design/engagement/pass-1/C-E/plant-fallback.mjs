// C-E plant: does the stage fail loud when its inputs are unreadable? (E-2, no masking fallback)
//   gutter   --space-section set to an invalid value on the slider root, then Tab in: the registered --stage-reach
//            computes to its initial 1; read the scale and the console
//   scale    --scale-engage removed (set to an invalid value) on the root, then Tab in: read the scale and the console
//   clock    --spring-dock-settle set invalid on the root, then E-4's fling drive: read the leading edge and the console
//   node plant-fallback.mjs --build <dir> [--engine webkit]
import { witness, INIT, center, f, tabKey, load } from "../../harness/lib.mjs";
await witness("C-E-plant", "masked-fallback plant on the stage", async ({ E, T, cell, guard, engine }) => {
  for (const [name, prop, val] of [["gutter", "--space-section", "nonsense"], ["scale", "--scale-engage", "nonsense"], ["clock", "--spring-dock-settle", "nonsense"]]) {
    const r = await guard(name, async () => {
      const b = await E.browser(); const ctx = await b.newContext({ viewport: { width: 700, height: 500 } }); const page = await ctx.newPage();
      const errs = []; page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(m.text().slice(0, 120)); });
      await page.addInitScript(INIT); await page.goto(`${T.url}?scene=slider&theme=light`);
      await page.waitForFunction(() => window.__e && window.__e.ready === true, null, { timeout: 60000 });
      await page.evaluate(([p, v]) => document.querySelector(".glass-slider").style.setProperty(p, v), [prop, val]);
      let out;
      if (name !== "clock") {
        await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(450);
        out = await page.evaluate(() => { const r = document.querySelector(".glass-slider"); return { stage: r.matches(":popover-open"), scale: getComputedStyle(r).scale, reach: getComputedStyle(r).getPropertyValue("--stage-reach"), w: r.getBoundingClientRect().width }; });
      } else {
        const c = await center(page, '[role="slider"]');
        await page.mouse.move(c.x, c.y); await page.mouse.down(); await page.waitForTimeout(120);
        for (let k = 1; k <= 3; k++) { await page.mouse.move(c.x + 40 * k, c.y); await page.waitForTimeout(16); }
        const pr = page.evaluate(() => new Promise((res) => { let m = 0; const t0 = performance.now(); const tick = () => { const r = document.querySelector(".glass-slider").getBoundingClientRect(); const fp = document.querySelector(".engage-footprint"); if (fp) m = Math.max(m, r.right - fp.getBoundingClientRect().right); if (performance.now() - t0 < 1200) requestAnimationFrame(tick); else res(m); }; requestAnimationFrame(tick); }));
        await page.mouse.up(); out = { leadMax: await pr };
      }
      await ctx.close(); return { out, errs };
    });
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    cell(`plant ${name}`, "REPORT", `${prop}: ${val} on the root · ${JSON.stringify(r.out)} · console errors/warnings ${r.errs.length}${r.errs.length ? ": " + r.errs.join(" | ") : ""} · load ${load()}`);
  }
});
