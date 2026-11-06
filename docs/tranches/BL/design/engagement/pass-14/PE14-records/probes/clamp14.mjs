#!/usr/bin/env node
// P-E14 part B diagnostic: a translate probe on a box at a scroller's scroll end, after a clamp (M14 scroller's act frame).
// Reports how far a paused add-composite translate of +4 px in y moves the box's painted centre, in the resize step and in rAF.
//   node clamp14.mjs [chromium|webkit] | --engine chromium|webkit
const pw = (await import("/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs")).default;
const ai = process.argv.indexOf("--engine"); const eng = ai > 0 ? process.argv[ai + 1] : process.argv[2] ?? "chromium";
const browser = await pw[eng].launch({ headless: true });
try {
  for (const anchor of ["auto", "none"]) for (const removeFirst of [false, true]) for (const spacer of [600, 300]) {
    const ctx = await browser.newContext({ viewport: { width: 800, height: 700 } });
    try {
      const page = await ctx.newPage();
      await page.setContent(`<div id=G style="overflow:auto;height:320px;width:400px;overflow-anchor:${anchor}"><div style="height:${spacer}px"></div><div id=C style="padding:0"><div id=H style="height:${spacer === 300 ? 320 : 20}px;background:red">h</div></div><div id=S style="height:20px"></div></div>`);
      const out = await page.evaluate((removeFirst) => new Promise((ok) => {
        const G = document.getElementById("G"), H = document.getElementById("H");
        G.scrollTop = G.scrollHeight;
        const cy = () => { const r = H.getBoundingClientRect(); return r.top + r.height / 2; };
        const probe = (t) => { const a = H.animate({ translate: [`0px ${t}px`, `0px ${t}px`] }, { duration: 1, fill: "both", composite: "add" }); a.pause(); try { const y = cy(); (res.st ??= []).push([t, G.scrollTop]); return y; } finally { a.cancel(); (res.st ??= []).push(["x", G.scrollTop]); } };
        const res = {};
        requestAnimationFrame(() => {
          if (removeFirst) document.getElementById("S").remove();
          const ro = new ResizeObserver(() => {
            ro.disconnect();
            const before = { st: G.scrollTop, sh: G.scrollHeight };
            const p0 = probe(0), p4 = probe(4), pm4 = probe(-4);
            res.ro = { before, p0, dy4: p4 - p0, dym4: pm4 - p0, after: { st: G.scrollTop, sh: G.scrollHeight } };
            requestAnimationFrame(() => { const q0 = probe(0), q4 = probe(4); res.raf = { dy4: q4 - q0, st: G.scrollTop }; ok(res); });
          });
          ro.observe(H);
        });
      }), removeFirst);
      console.log(`${eng} anchor=${anchor} remove-below=${removeFirst} spacer=${spacer}`, JSON.stringify(out));
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
