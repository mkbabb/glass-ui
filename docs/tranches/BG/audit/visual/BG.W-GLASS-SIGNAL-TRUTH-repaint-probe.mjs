import { chromium } from "playwright";
const CDP = "http://localhost:9477";
const BASE = "http://localhost:5200";
const browser = await chromium.connectOverCDP(CDP);

async function snap(page, label) {
  return await page.evaluate((label) => {
    const docks = Array.from(document.querySelectorAll(".glass-dock"));
    const sampledEls = document.querySelectorAll("[data-backdrop-sampled]").length;
    const prm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const per = docks.map((d, i) => {
      const cs = getComputedStyle(d); const r = d.getBoundingClientRect();
      return {
        i, top: Math.round(r.top),
        onscreen: r.top < innerHeight && r.bottom > 0,
        witnessAttr: d.hasAttribute("data-backdrop-sampled"),
        luma: cs.getPropertyValue("--glass-backdrop-luma").trim(),
        hue: cs.getPropertyValue("--glass-ambient-hue").trim(),
        strength: cs.getPropertyValue("--glass-ambient-strength").trim(),
        bucket: cs.getPropertyValue("--glass-backdrop").trim(),
        inlineLuma: d.style.getPropertyValue("--glass-backdrop-luma") || "(none)",
      };
    });
    const fired = per.filter(p => p.witnessAttr).length;
    const onscreen = per.filter(p => p.onscreen).length;
    const firedOnscreen = per.filter(p => p.onscreen && p.witnessAttr).length;
    const nonDegen = per.filter(p => {
      const l = parseFloat(p.luma);
      return p.witnessAttr && !isNaN(l) && l > 0 && l < 0.999;
    }).length;
    return { label, dockCount: docks.length, sampledEls, prm, fired, onscreen, firedOnscreen, nonDegen, per };
  }, label);
}

for (const mode of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:2, colorScheme: mode });
  const page = await ctx.newPage();
  const url = `${BASE}/?capture=${encodeURIComponent("/dock/overview")}&mode=${mode}`;
  await page.goto(url, { waitUntil:"load", timeout:30000 });
  await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout:30000 });
  const r0 = await snap(page, `${mode}:at-ready`);
  await page.waitForTimeout(6000);
  const r1 = await snap(page, `${mode}:+6s`);
  await page.setViewportSize({ width: 1280, height: 820 });
  await page.waitForTimeout(1200);
  const r2 = await snap(page, `${mode}:after-resize`);
  console.log(`\n===== MODE ${mode.toUpperCase()} =====`);
  for (const r of [r0, r1, r2]) {
    console.log(`[${r.label}] docks=${r.dockCount} onscreen=${r.onscreen} fired=${r.fired} firedOnscreen=${r.firedOnscreen} nonDegen=${r.nonDegen} sampledEls=${r.sampledEls} prm=${r.prm}`);
  }
  // dump per-dock detail for +6s
  console.log("  per-dock (+6s):");
  for (const p of r1.per) {
    console.log(`   dock[${p.i}] top=${p.top} onscr=${p.onscreen} witness=${p.witnessAttr} luma=${p.luma||'(0)'} hue=${p.hue||'(none)'} str=${p.strength||'(0)'} bucket=${p.bucket}`);
  }
  await ctx.close();
}
await browser.close();
