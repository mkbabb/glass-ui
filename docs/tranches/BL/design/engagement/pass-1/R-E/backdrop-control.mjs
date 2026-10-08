#!/usr/bin/env node
// R-E · control for platform-probe A: does each engine PAINT backdrop-filter on (1) a ::backdrop with no mask,
// (2) a ::backdrop with a literal mask, (3) a ::backdrop whose mask reads an inherited var, (4) a plain fixed div with
// the var mask (the shipped veil's construction). Stripe contrast at the mask core (x=280) and outside (x=600); 255 = untouched.
import os from "node:os";
const pw = (await import("/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs")).default;
const { PNG } = (await import("/Users/mkbabb/Programming/glass-ui/node_modules/pngjs/lib/png.js")).default;
const load = () => os.loadavg().map((x) => x.toFixed(1)).join("/");
const M = (v) => `linear-gradient(to right, transparent calc(${v} - 80px), black ${v}, transparent calc(${v} + 80px))`;
const CASES = {
  "backdrop no mask": `#p::backdrop { backdrop-filter: blur(6px); }`,
  "backdrop literal mask": `#p::backdrop { backdrop-filter: blur(6px); mask-image: ${M("40%")}; -webkit-mask-image: ${M("40%")}; }`,
  "backdrop var mask": `#p { --veil-x: 40%; } #p::backdrop { backdrop-filter: blur(6px); mask-image: ${M("var(--veil-x)")}; -webkit-mask-image: ${M("var(--veil-x)")}; }`,
  "fixed div var mask": `#d { position: fixed; inset: 0; --veil-x: 40%; backdrop-filter: blur(6px); mask-image: ${M("var(--veil-x)")}; -webkit-mask-image: ${M("var(--veil-x)")}; }`,
};
for (const name of ["chromium", "webkit"]) {
  const b = await pw[name].launch();
  for (const [k, css] of Object.entries(CASES)) {
    const p = await b.newPage({ viewport: { width: 700, height: 500 } });
    await p.setContent(`<!doctype html><style>body{margin:0;height:100vh;background:repeating-linear-gradient(90deg,#000 0 4px,#fff 4px 8px)} #p{inset:auto;left:10px;top:10px;margin:0;width:20px;height:20px;padding:0;border:0} ${css}</style><div id="p" popover="manual"></div>${k.startsWith("fixed") ? '<div id="d"></div>' : ""}<script>document.getElementById('p').showPopover()</script>`);
    await p.waitForTimeout(200);
    const png = PNG.sync.read(await p.screenshot());
    const c = (x0) => { let mn = 255, mx = 0; for (let x = x0; x < x0 + 16; x++) { const i = (300 * png.width + x) * 4; mn = Math.min(mn, png.data[i]); mx = Math.max(mx, png.data[i]); } return mx - mn; };
    console.log(`${name.padEnd(8)} ${k.padEnd(24)} contrast core ${String(c(272)).padStart(3)} · outside ${String(c(592)).padStart(3)} · load ${load()}`);
    await p.close();
  }
  await b.close();
}
