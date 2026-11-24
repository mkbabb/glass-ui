// rAF gaps after each dock action, with and without reduced motion (one browser, a context per cell)
const { chromium, webkit } = await import(process.env.PW_MODULE);
const eng = process.argv[2] ?? "webkit";
const w = +(process.argv[3] ?? 768);
const browser = await (eng === "webkit" ? webkit : chromium).launch();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const compact = w < 1180;
try {
  for (const rm of [false, true]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1, reducedMotion: rm ? "reduce" : "no-preference" });
    try {
      const page = await ctx.newPage();
      await page.goto("http://127.0.0.1:5437/team/nov23/", { waitUntil: "load" });
      await sleep(3500);
      const rec = async (label, act) => {
        await page.evaluate(() => { const gen = (window.__gen = (window.__gen ?? 0) + 1); const g = (window.__g = []); const t0 = performance.now(); window.__gt0 = t0; const loop = () => { if (window.__gen !== gen) return; g.push(performance.now() - t0); requestAnimationFrame(loop); }; requestAnimationFrame(loop); });
        await sleep(150);
        const tA = await page.evaluate(() => performance.now() - window.__gt0);
        await act();
        await sleep(2000);
        const g = await page.evaluate(() => { const g = window.__g; window.__gen++; return g; });
        let max = 0, at = 0; const big = [];
        for (let i = 1; i < g.length; i++) { const d = g[i] - g[i - 1]; if (d > max) { max = d; at = g[i] - tA; } if (d > 50) big.push([Math.round(g[i] - tA), Math.round(d)]); }
        console.log(`${eng} ${w} ${rm ? "rm " : "   "} ${label.padEnd(14)} frames ${g.length} longest ${Math.round(max)} ms (ends ${Math.round(at)} ms after the action) gaps>50: ${JSON.stringify(big)}`);
      };
      const tog = compact ? "[data-reka-popper-content-wrapper] .r-menu .dark-mode-toggle-button" : '.r-dock-seat [data-seat="theme"] .dark-mode-toggle-button';
      for (let k = 0; k < 2; k++) {
        await rec("find-open", () => page.locator('.r-dock-seat [data-seat="find"]').click());
        await rec("find-close", () => page.keyboard.press("Escape"));
        if (compact) await rec("menu-open", () => page.locator('.r-dock-seat [data-seat="sections"]').click());
        await rec("theme-toggle", () => page.locator(tog).first().click());
        await rec("theme-toggle", () => page.locator(tog).first().click());
        if (compact) await rec("menu-close", () => page.keyboard.press("Escape"));
        await rec("idle", async () => {});
      }
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
