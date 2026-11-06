// H14 probe: what offsetTop and currentCSSZoom read under a zoomed positioned box (the E-10 chain · zoom cells), and what a translate paints
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright"); const eng = process.argv[2] ?? "chromium";
const b = await pw[eng].launch(); try { const ctx = await b.newContext(); const p = await ctx.newPage();
  await p.setContent(`<div id=G style="position:relative;margin-top:30px"><div id=C style="position:relative;zoom:2;padding-top:10px"><div id=root style="position:relative;height:20px;width:20px;background:red"></div></div></div>`);
  const r = await p.evaluate(() => { const G = document.getElementById("G"), C = document.getElementById("C"), root = document.getElementById("root");
    const read = () => ({ zr: root.currentCSSZoom, zc: C.currentCSSZoom, zg: G.currentCSSZoom, rot: root.offsetTop, cot: C.offsetTop, got: G.offsetTop, rop: root.offsetParent?.id, cop: C.offsetParent?.id, top: root.getBoundingClientRect().top });
    const a = read(); const blk = document.createElement("div"); blk.style.height = "40px"; document.body.insertBefore(blk, G); const b2 = read();
    root.style.translate = "0 -40px"; const c = root.getBoundingClientRect().top; return { a, b: b2, paintedByTranslateMinus40: c - b2.top }; });
  console.log(eng, JSON.stringify(r)); await ctx.close(); } finally { await b.close(); }
