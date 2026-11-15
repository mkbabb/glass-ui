// O-268: LayoutCount sampled every 100 ms from 3.0 s to 7.5 s after mount, with the page
// scrolling every frame and without.
import { test } from "@playwright/test";
for (const scroll of [true, false]) {
test(`probe · layout series (scroll ${scroll})`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Performance.enable");
    const m = async () => {
        const all = (await cdp.send("Performance.getMetrics")).metrics;
        const g = (n: string) => all.find((x) => x.name === n)!.value;
        return { L: g("LayoutCount"), S: g("RecalcStyleCount") };
    };
    await page.goto("/tests-visual/release-11-0-2/fold-harness.html");
    await page.locator("body[data-ready='1'] .fold-dock").waitFor();
    const mount = Date.now();
    await page.waitForTimeout(3000);
    if (scroll) await page.evaluate(() => { const t = () => { scrollBy(0, 3); requestAnimationFrame(t); }; requestAnimationFrame(t); });
    let prev = await m();
    const rows: string[] = [];
    while (Date.now() - mount < 7500) {
        await page.waitForTimeout(100);
        const cur = await m();
        rows.push(`${Date.now() - mount}:${cur.L - prev.L}/${cur.S - prev.S}`);
        prev = cur;
    }
    console.log(`scroll=${scroll} ms:layouts/styles ` + rows.join(" "));
});
}
