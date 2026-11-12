import { test } from "@playwright/test";
for (const [from, to] of [[390, 1440], [1440, 390]]) {
test(`probe mid-expand ${from}->${to}`, async ({ page }) => {
    await page.setViewportSize({ width: from, height: 844 });
    await page.goto(`/tests-visual/release-10-1-2/harness.html?scene=stale-endpoint&pin=&axis=horizontal`);
    await page.waitForFunction(() => (window as any).__ready);
    await page.waitForTimeout(500);
    await page.evaluate(() => {
        const w = window as any;
        w.__f = [];
        const ch = new MessageChannel();
        ch.port1.onmessage = () => {
            const el = document.querySelector<HTMLElement>(".glass-dock")!;
            w.__f.push({ at: "post", iw: innerWidth, r: el.style.getPropertyValue("--dock-expanded-px"), w: el.offsetWidth, m: el.hasAttribute("data-morphing"), vis: Math.round(el.getBoundingClientRect().width) });
        };
        const tick = () => {
            const el = document.querySelector<HTMLElement>(".glass-dock")!;
            w.__f.push({ at: "raf", iw: innerWidth, r: el.style.getPropertyValue("--dock-expanded-px"), m: el.hasAttribute("data-morphing") });
            ch.port2.postMessage(0);
            if (w.__f.length < 200) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    });
    await page.evaluate(() => (window as any).__expand());
    await page.waitForTimeout(60);
    await page.setViewportSize({ width: to, height: 844 });
    await page.waitForTimeout(800);
    const f = await page.evaluate(() => (window as any).__f);
    const i = f.findIndex((x: any) => x.iw === to);
    console.log(JSON.stringify(f.slice(Math.max(0, i - 4), i + 8)));
});
}
