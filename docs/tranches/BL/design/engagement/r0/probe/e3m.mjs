// E-3 phone arm (L05a-16): a touch-held slider on a 390×844 coarse viewport. Chromium long-tap gesture, read at 350 ms.
// node e3m.mjs <dist> [--plant]
import os from "node:os"; import { serve, pw } from "./serve.mjs";
const PLANT = process.argv.includes("--plant"); const s = await serve(process.argv[2]); const b = await pw.chromium.launch(); let bad = 0;
for (const theme of ["light", "dark"]) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, hasTouch: true, isMobile: true }); const pg = await ctx.newPage();
  await pg.goto(`${s.url}?scene=slider&theme=${theme}`); await pg.waitForFunction(() => window.__ready);
  if (PLANT) await pg.addStyleTag({ content: ".glass-slider:where(:active,:has(:focus-visible)){scale:1.06}" }); await pg.waitForTimeout(300);
  const rd = () => pg.evaluate(() => { const el = document.querySelector(".glass-slider"), r = el.getBoundingClientRect(), l = document.querySelector(".glass-loupe"), lr = l?.getBoundingClientRect(); return { w: r.width, act: el.matches(":active"), eng: document.querySelectorAll("[data-engaged]").length, loupe: lr ? `${lr.width.toFixed(0)}×${lr.height.toFixed(0)} opacity ${getComputedStyle(l).opacity}` : "none" }; });
  const rest = await rd(); const tb = await pg.locator('[role="slider"]').first().boundingBox(); const cdp = await ctx.newCDPSession(pg);
  const g = cdp.send("Input.synthesizeTapGesture", { x: tb.x + tb.width / 2, y: tb.y + tb.height / 2, duration: 900, tapCount: 1, gestureSourceType: "touch" }); await pg.waitForTimeout(350); const held = await rd(); await g;
  const k = held.w / rest.w; const pass = k >= 1.03; if (!pass) bad++;
  console.log(`${pass ? "PASS" : "FAIL"} E-3m chromium ${theme} 390×844 coarse · rest ${rest.w.toFixed(1)} px · touch-held ×${k.toFixed(3)} (:active ${held.act}, [data-engaged] ${held.eng}, loupe ${held.loupe}) · bound ×1.03 · load ${os.loadavg().map((x) => x.toFixed(1)).join("/")}`);
  await ctx.close();
}
await b.close(); s.close(); console.log(`VERDICT e3m ${PLANT ? "PLANT" : "HEAD"}: ${bad} failing`); process.exit(bad ? 1 : 0);
