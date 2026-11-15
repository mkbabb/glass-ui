// k2log.mjs <port> <engine>: RU-30's first reading. Opens 10.1.5 k2's page (a vertical house run
// capped at stageH=360), focuses and hovers S1 as k2 does, and reads, for 2 s at rest, every
// sync() by reason and every fitCurve() reading (short, pad, want, the inset now), from a
// temporary instrument in useDockBody.ts that writes to window.__k2log (never committed).
import { chromium, webkit } from "playwright";
const [port, eng] = [process.argv[2], process.argv[3] || "webkit"];
const B = eng === "webkit" ? webkit : chromium;
const browser = await B.launch({ headless: true, ...(eng === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
try {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();
    const q = ["tab:Home", ...Array.from({ length: 10 }, () => "icon"), "tab:Settings"].join(",");
    await page.goto(`http://localhost:${port}/tests-visual/release-10-1-5/harness.html?scene=seats&kinds=${q}&orientation=vertical&stageH=360`);
    await page.waitForFunction(() => window.__ready);
    await page.mouse.move(1, 1);
    await page.waitForTimeout(700);
    await page.keyboard.press("Shift");
    await page.locator('[data-witness="S1"]').focus();
    const box = await page.locator('[data-witness="S1"]').boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(600);
    await page.evaluate(() => { window.__k2log = []; window.__k2n = 0; const raf = window.requestAnimationFrame; window.requestAnimationFrame = (cb) => { window.__k2n++; return raf(cb); }; });
    const s0 = await page.locator('[data-witness="S1"]').boundingBox();
    await page.waitForTimeout(2000);
    const out = await page.evaluate(() => window.__k2log); const rafs = await page.evaluate(() => window.__k2n);
    const s1 = await page.locator('[data-witness="S1"]').boundingBox();
    const syncs = {}; for (const e of out) if (e.sync) syncs[e.sync] = (syncs[e.sync] || 0) + 1;
    console.log(JSON.stringify({ eng, s0, s1, rafs, inset: await page.evaluate(() => document.querySelector(".glass-dock").style.getPropertyValue("--dock-curve-inset")), syncs, curve: out.filter((e) => !e.sync).slice(0, 20), n: out.length }));
    await ctx.close();
} finally {
    await browser.close();
}
