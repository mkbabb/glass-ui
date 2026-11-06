// H14 probe (W-2): what a resize observation re-armed every frame reads across WebKit's re-snap after a snapped item grows (M24's scene,
// library-free): per frame, in the rAF callback and in the resize observation, the scroller's scrollTop and scrollHeight and a box's top
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright"); const eng = process.argv[2] ?? "webkit";
const b = await pw[eng].launch(); try { for (const al of ["center", "end"]) { const ctx = await b.newContext({ viewport: { width: 700, height: 500 } }); const p = await ctx.newPage();
  await p.setContent(`<div id=s style="position:relative;height:300px;overflow:auto;width:600px;scroll-snap-type:y mandatory"></div>`);
  const r = await p.evaluate((al) => new Promise((ok) => { const s = document.getElementById("s"); const items = [0, 1, 2, 3, 4].map(() => { const d = document.createElement("div"); d.style.cssText = "height:300px;scroll-snap-align:" + al; s.appendChild(d); return d; });
    const box = document.createElement("div"); box.style.cssText = "height:20px;width:20px;background:red"; items[2].appendChild(box); s.scrollTop = 600;
    const beat = document.createElement("span"); beat.style.cssText = "position:fixed;width:1px;height:1px"; document.body.appendChild(beat);
    const rows = []; let n = 0; const rd = (w) => rows.push([n, w, s.scrollTop, s.scrollHeight, Math.round(box.getBoundingClientRect().top * 100) / 100]);
    const ro = new ResizeObserver(() => rd("ro")); const tick = () => { n++; rd("raf"); if (n === 6) items[2].style.height = "400px"; ro.unobserve(beat); ro.observe(beat); if (n < 12) requestAnimationFrame(tick); else ok(rows); };
    setTimeout(() => requestAnimationFrame(tick), 300); }), al);
  console.log(eng, al, JSON.stringify(r)); await ctx.close(); } } finally { await b.close(); }
