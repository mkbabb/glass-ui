#!/usr/bin/env node
// H12 (D5 pass 12) · library-free engine facts the CK-20 frame family rests on (REPORT, not a witness): in which CSS px an offset is
// read under an ancestor CSS zoom, a positioned zoomed box, and an ancestor scale; and what getComputedStyle reads on a box while its
// `scale` animates. One browser, a fresh context per case, everything closed in finally. `node framefacts.mjs <chromium|webkit>`
const GLASS = "/Users/mkbabb/Programming/glass-ui";
const pw = (await import(`${GLASS}/node_modules/playwright/index.mjs`)).default;
import os from "node:os";
const engine = process.argv[2] ?? "chromium";
const load = () => os.loadavg().map((x) => x.toFixed(1)).join("/");
console.log(`# framefacts ${engine} · ${new Date().toISOString()} · load ${load()}`);
const CASES = {
  // T inside a non-positioned zoomed box Z inside a positioned P: T.offsetParent = P
  zoomBetween: `<div id=P style="position:relative;margin-top:30px"><div id=Z style="zoom:2"><div style="height:10px"></div><div id=T style="height:5px"></div></div></div>`,
  // T inside a positioned zoomed P (zoom on P itself), P inside body after a 30 px block
  zoomOnParent: `<div style="height:30px"></div><div id=P style="position:relative;zoom:2"><div style="height:10px"></div><div id=T style="height:5px"></div></div>`,
  // T inside a positioned P inside a positioned zoomed Q
  zoomOuter: `<div style="height:30px"></div><div id=Q style="position:relative;zoom:2"><div style="height:7px"></div><div id=P style="position:relative"><div style="height:10px"></div><div id=T style="height:5px"></div></div></div>`,
  // T inside a scaled (0.5, origin 0 0) box S, no positioned box
  scaleBox: `<div style="height:30px"></div><div id=S style="scale:0.5;transform-origin:0 0"><div style="height:10px"></div><div id=T style="height:5px"></div></div>`,
};
const b = await pw[engine].launch({ headless: true });
try {
  for (const [name, html] of Object.entries(CASES)) {
    const ctx = await b.newContext({ viewport: { width: 400, height: 300 }, deviceScaleFactor: 1 });
    try {
      const page = await ctx.newPage();
      await page.setContent(`<!doctype html><body style="margin:0">${html}</body>`);
      const r = await page.evaluate(() => { const chain = []; for (let e = document.getElementById("T"); e; e = e.offsetParent) chain.push({ id: e.id || e.tagName, offsetTop: e.offsetTop, zoom: e.currentCSSZoom, rectTop: e.getBoundingClientRect().top });
        return chain; });
      console.log(`${name}: ${r.map((x) => `${x.id} offsetTop ${x.offsetTop} zoom ${x.zoom} painted top ${x.rectTop}`).join(" → ")}`);
    } finally { await ctx.close(); }
  }
  // a running scale animation on an ancestor: what computed style reads mid-flight
  const ctx = await b.newContext({ viewport: { width: 400, height: 300 }, deviceScaleFactor: 1 });
  try {
    const page = await ctx.newPage();
    await page.setContent(`<!doctype html><body style="margin:0"><div style="height:30px"></div><div id=S style="transform-origin:0 0"><div id=T style="height:5px"></div></div></body>`);
    const r = await page.evaluate(() => new Promise((ok) => { const s = document.getElementById("S"); const a = s.animate({ scale: ["0.8", "1"] }, { duration: 400 }); const out = [];
      const tick = () => { out.push({ t: Math.round(a.currentTime), scale: getComputedStyle(s).scale, top: +document.getElementById("T").getBoundingClientRect().top.toFixed(2), off: document.getElementById("T").offsetTop }); if (out.length < 6) requestAnimationFrame(tick); else { a.cancel(); ok(out); } }; requestAnimationFrame(tick); }));
    console.log(`scaleAnim: ${r.map((x) => `t ${x.t} scale ${x.scale} T top ${x.top} offsetTop ${x.off}`).join(" | ")}`);
  } finally { await ctx.close(); }
} finally { await b.close(); }
console.log(`# end · load ${load()}`);
