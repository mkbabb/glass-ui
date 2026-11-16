// A reading, not yet a witness: does WebKit raise a ResizeObserver loop error while the
// demo's dock loads and the page scrolls, at 1440 light?
import { expect, test } from "@playwright/test";

for (const path of ["/", "/dock/overview"]) {
    test(`ro · no ResizeObserver loop error as ${path} loads and scrolls`, async ({ page }, info) => {
        test.skip(info.project.name !== "webkit-desktop" && info.project.name !== "chromium-desktop", "read at 1440");
        const errors: string[] = [];
        page.on("pageerror", (e) => {
            if (/ResizeObserver/.test(e.message)) errors.push(e.message);
        });
        await page.addInitScript(() => {
            window.addEventListener("error", (e) => {
                if (/ResizeObserver/.test(e.message)) ((window as unknown as { __ro: number[] }).__ro ??= []).push(performance.now());
            });
        });
        await page.emulateMedia({ colorScheme: "light" });
        await page.goto(path, { waitUntil: "load" });
        await page.waitForTimeout(5000);
        const h = await page.evaluate(() => document.body.scrollHeight);
        for (let y = 0; y < h && y < 20000; y += 700) {
            await page.evaluate((v) => scrollTo(0, v), y);
            await page.waitForTimeout(250);
        }
        await page.waitForTimeout(800);
        const ro = await page.evaluate(() => (window as unknown as { __ro?: number[] }).__ro ?? []);
        await info.attach("ro", { body: JSON.stringify({ ro, errors }), contentType: "application/json" });
        expect(ro, "no loop error").toEqual([]);
    });
}
