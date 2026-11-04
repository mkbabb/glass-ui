#!/usr/bin/env node
// H13-complete (D5 pass 13, c1): when is scroll anchoring applied as a MutationObserver callback reads it, LIBRARY-FREE. Not a witness.
// The clean fixture's WebKit hg13 `scroll · anchor * · insert above` cells glided (the anchoring scroll landed a frame after the callback:
// scrollY 894 -> 894 -> 934) while facts13 A / facts13c F3 / facts13e F3b (body.prepend) read it applied at the callback. Each variant
// below moves one step from the plain page toward the fixture's scene; each prints the target's painted top before, in the callback (rect
// first, as the fixture's glideFrom reads it), and two frames later, with scrollY.
//   node facts13f.mjs <chromium|webkit>
const GLASS = "/Users/mkbabb/Programming/glass-ui";
const pw = (await import(`${GLASS}/node_modules/playwright/index.mjs`)).default;
const os = await import("node:os");
const engine = process.argv[2] ?? "chromium";
const L = () => os.loadavg().map((x) => x.toFixed(2)).join("/");
console.log(`# facts13f ${engine} · ${new Date().toISOString()} · load ${L()}`);
const browser = await pw[engine].launch({ headless: true });
const VARIANTS = {
  "V1 body.prepend, plain target": { into: "body", tgt: "", act: "plain" },
  "V2 insert as <main>'s first child, a header above <main>": { into: "main", tgt: "", act: "plain" },
  "V3 V2 + probe writes on the target in the callback (the fixture's two translate probes, then restored)": { into: "main", tgt: "", act: "probe" },
  "V4 V2 + a composite:add translate animation started on the target in the callback (the glide)": { into: "main", tgt: "", act: "animate" },
  "V5 V2 + the target already carries a running WAAPI animation (an engaged control's own)": { into: "main", tgt: "running", act: "plain" },
  "V6 V2 + the insert made from a page.evaluate task (no rAF), as a harness act": { into: "main", tgt: "", act: "plain", task: true },
  "V7 V2 + target in a card with scale 0.8": { into: "main", tgt: "", act: "plain", card: "scale:0.8" },
  "V8 V2 + a popover shown in the top layer (the loupe)": { into: "main", tgt: "popover", act: "plain" },
  "V9 V2 + a rAF loop reading the target's rect every frame and an additive translate animation running on it": { into: "main", tgt: "loop", act: "plain" },
  "V10 V2 + the scroll made one frame before the insert": { into: "main", tgt: "", act: "plain", late: true },
  "V11 V2 + the target carries will-change: transform and translate: 0 0": { into: "main", tgt: "wc", act: "plain" },
};
const ONLY = process.argv[3] ? process.argv[3].split(",") : null;
try {
  console.log(`# browser ${browser.version()}`);
  for (const [name, v] of Object.entries(VARIANTS)) for (const rep of [1, 2]) { if (ONLY && !ONLY.includes(name.split(" ")[0])) continue;
    const ctx = await browser.newContext({ viewport: { width: 800, height: 600 } });
    try {
      const page = await ctx.newPage();
      await page.setContent(`<!doctype html><body style="margin:0"><header style="height:60px"></header><main><div style="height:800px"></div><div id="card" style="${v.card ?? ""};padding:20px"><div id="tgt" style="height:40px;width:200px;background:#36c"></div></div><div style="height:1600px"></div></main></body>`);
      const arm = `(() => { const sc = document.scrollingElement, tgt = document.getElementById("tgt"); window.__out = null;
        if (${JSON.stringify(v.tgt)} === "running") tgt.animate([{ opacity: 1 }, { opacity: 0.99 }], { duration: 100000 });
        if (${JSON.stringify(v.tgt)} === "popover") { const pop = document.createElement("div"); pop.popover = "manual"; pop.style.cssText = "width:80px;height:30px;margin:0;inset:auto;left:10px;top:10px"; tgt.after(pop); pop.showPopover(); }
        if (${JSON.stringify(v.tgt)} === "loop") { tgt.animate([{ translate: "0 0" }, { translate: "0 0" }], { duration: 100000, composite: "add" }); const lp = () => { tgt.getBoundingClientRect(); requestAnimationFrame(lp); }; requestAnimationFrame(lp); }
        if (${JSON.stringify(v.tgt)} === "wc") { tgt.style.willChange = "transform"; tgt.style.translate = "0 0"; }
        const top = () => +tgt.getBoundingClientRect().top.toFixed(2);
        const mo = new MutationObserver(() => { mo.disconnect(); const cb = top(), cbs = scrollY;
          if (${JSON.stringify(v.act)} === "probe") { const b = tgt.style.translate; tgt.style.translate = "40px 0"; top(); tgt.style.translate = "0 40px"; top(); tgt.style.translate = b; }
          if (${JSON.stringify(v.act)} === "animate") tgt.animate([{ translate: "0 40px" }, { translate: "0 0" }], { duration: 350, composite: "add" });
          requestAnimationFrame(() => requestAnimationFrame(() => { window.__out = { cb, cbs, after: top(), afs: scrollY }; })); });
        mo.observe(document.body, { childList: true, subtree: true });
        return { before: top(), bs: scrollY }; })()`;
      if (!v.late) { await page.evaluate(() => { document.scrollingElement.scrollTop = 830; }); await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))); }
      else await page.evaluate(() => new Promise((r) => { document.scrollingElement.scrollTop = 830; requestAnimationFrame(r); }));
      const ins = `(() => { const d = document.createElement("div"); d.style.height = "40px"; const p = ${JSON.stringify(v.into)} === "body" ? document.body : document.querySelector("main"); p.insertBefore(d, p.firstChild); })()`;
      let b;
      if (v.task) { b = await page.evaluate(arm); await page.evaluate(ins); }
      else b = await page.evaluate(`new Promise((ok) => requestAnimationFrame(() => { const b = ${arm}; ${ins}; ok(b); }))`);
      await page.waitForFunction(() => window.__out !== null, null, { timeout: 5000 });
      const o = await page.evaluate(() => window.__out);
      console.log(`F3c ${name} · run ${rep}: before top ${b.before} scrollY ${b.bs} · callback top ${o.cb} scrollY ${o.cbs} · two frames later top ${o.after} scrollY ${o.afs} · load ${L()}`);
    } catch (e) { console.log(`F3c ${name} · run ${rep} ERROR ${String(e).slice(0, 200)}`); }
    finally { await ctx.close(); }
  }
} finally { await browser.close(); console.log(`# end · load ${L()}`); }
