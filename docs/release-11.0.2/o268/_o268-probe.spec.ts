// O-268 reading: the layouts one idle fold of an untouched `collapse="open"` dock costs on
// a page that scrolls every frame. Chromium only (CDP Performance.getMetrics LayoutCount).
// Three windows of in-page scrolling: before the fold (open, idle), across the fold, and
// after it settles. Each reports layouts, frames, and the frames whose --dock-morph-t moved.
import { test } from "@playwright/test";

test("probe · layouts across one idle fold while scrolling", async ({ page }) => {
    test.skip(!page.context().browser()?.browserType().name().includes("chromium"), "CDP metrics");
    await page.setViewportSize({ width: 1440, height: 900 });
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Performance.enable");
    const layouts = async () =>
        (await cdp.send("Performance.getMetrics")).metrics.find((m) => m.name === "LayoutCount")!.value;
    await page.goto("/tests-visual/release-11-0-2/fold-harness.html");
    await page.locator("body[data-ready='1'] .fold-dock").waitFor();
    const mount = await page.evaluate(() => performance.now());
    const windowRead = async (label: string, startAt: number, ms: number) => {
        const now = await page.evaluate(() => performance.now());
        if (startAt - (now - mount) > 0) await page.waitForTimeout(startAt - (now - mount));
        const before = await layouts();
        const r = await page.evaluate(async (ms) => {
            const root = document.querySelector<HTMLElement>(".glass-dock")!;
            let frames = 0;
            let morphFrames = 0;
            let last = root.style.getPropertyValue("--dock-morph-t");
            const end = performance.now() + ms;
            await new Promise<void>((done) => {
                const tick = () => {
                    frames++;
                    scrollBy(0, 3);
                    const t = root.style.getPropertyValue("--dock-morph-t");
                    if (t !== last) morphFrames++;
                    last = t;
                    if (performance.now() < end) requestAnimationFrame(tick);
                    else done();
                };
                requestAnimationFrame(tick);
            });
            return { frames, morphFrames, state: root.getAttribute("data-state") ?? root.className };
        }, ms);
        const after = await layouts();
        console.log(JSON.stringify({ label, startAt, ms, layouts: after - before, ...r }));
    };
    await windowRead("before the fold (open, idle)", 600, 2000);
    await windowRead("across the fold", 3000, 2500);
    await windowRead("after it settles", 5800, 2000);
});
