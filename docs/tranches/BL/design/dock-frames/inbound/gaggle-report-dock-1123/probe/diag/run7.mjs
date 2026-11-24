const { chromium, webkit } = await import(process.env.PW_MODULE);
const eng = process.argv[2] ?? "chromium";
const w = +(process.argv[3] ?? 390);
const browser = await (eng === "webkit" ? webkit : chromium).launch();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
try {
  const ctx = await browser.newContext({ viewport: { width: w, height: 844 }, deviceScaleFactor: 1 });
  try {
    const page = await ctx.newPage();
    await page.goto("http://127.0.0.1:5437/team/nov23/", { waitUntil: "load" });
    await sleep(3000);
    const read = (label) => page.evaluate((label) => {
      const dock = document.querySelector(".r-dock-seat .glass-dock");
      const run = dock.querySelector(".dock-run");
      const lay = dock.querySelector(".dock-layers");
      const b = (e) => { if (!e) return null; const r = e.getBoundingClientRect(); return [r.left, r.width].map((v) => +v.toFixed(2)); };
      const cs = getComputedStyle(run);
      return { label, sl: run.scrollLeft, dock: b(dock), run: b(run), layers: b(lay), runScroll: [run.scrollLeft, run.scrollWidth, run.clientWidth], layScroll: [lay.scrollLeft, lay.scrollWidth, lay.clientWidth], dockScroll: [dock.scrollLeft, dock.scrollWidth, dock.clientWidth], seatScroll: [document.querySelector(".r-dock-seat").scrollLeft], runPad: [cs.paddingInlineStart, cs.paddingInlineEnd, cs.overflowX, cs.scrollPaddingInline, cs.scrollSnapType], sections: b(dock.querySelector('[data-seat="sections"]')), find: b(dock.querySelector('[data-seat="find"]')), firstChild: b(run.firstElementChild), before: getComputedStyle(run, "::before").inlineSize + " " + getComputedStyle(run, "::before").width, after: getComputedStyle(run, "::after").width, active: document.activeElement?.className?.slice?.(0, 60), fits: run.dataset.runFits };
    }, label);
    console.log(JSON.stringify(await read("rest")));
    await page.locator('.r-dock-seat [data-seat="find"]').click(); await sleep(800);
    console.log(JSON.stringify(await read("find open")));
    await page.keyboard.press("Escape"); await sleep(800);
    console.log(JSON.stringify(await read("find closed")));
    await page.mouse.click(4, 300); await sleep(500);
    console.log(JSON.stringify(await read("outside click")));
    await page.locator('.r-dock-seat [data-seat="sections"]').click(); await sleep(800);
    console.log(JSON.stringify(await read("menu open")));
    await page.keyboard.press("Escape"); await sleep(800);
    console.log(JSON.stringify(await read("menu closed")));
    await page.keyboard.press("Tab"); await sleep(400);
    console.log(JSON.stringify(await read("tab")));
    await page.keyboard.press("Tab"); await sleep(400);
    console.log(JSON.stringify(await read("tab2")));
  } finally { await ctx.close(); }
} finally { await browser.close(); }
