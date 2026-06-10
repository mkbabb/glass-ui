/* FDR2 pass 2 — full-page captures. The AppShell scrolls in <main>, so pass 1's
 * scrollHeight check never fired. Here we unlock the shell (height:auto,
 * overflow:visible) and captureBeyondViewport. Read-only audit — DOM tweaks are
 * per-session only. */
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const BASE = "http://localhost:5199";
const OUT = __dirname;

const PAGES = require("./_pages.json");

(async () => {
    const browser = await chromium.launch({ channel: "chromium" });
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 1.5,
    });
    const page = await ctx.newPage();
    const cdp = await ctx.newCDPSession(page);
    const only = process.argv[2];
    for (const [route, settle] of PAGES) {
        if (only && !route.includes(only)) continue;
        const slug = route.replace(/\//g, "--");
        try {
            await page.goto(`${BASE}/${route}`, { waitUntil: "load", timeout: 20000 });
        } catch (e) {
            console.log(`FAIL nav ${route}`);
            continue;
        }
        await page.waitForTimeout(settle);
        const h = await page.evaluate(() => {
            const main = document.querySelector("main");
            if (!main) return 0;
            const sh = main.scrollHeight;
            if (sh <= 1000) return sh;
            // unlock the fixed-viewport shell so the document itself grows
            for (const el of document.querySelectorAll(".h-screen")) {
                el.style.height = "auto";
                el.style.overflow = "visible";
            }
            main.style.overflow = "visible";
            document.documentElement.style.overflow = "visible";
            return sh;
        });
        if (h <= 1000) { console.log(`SKIP ${route} (h=${h})`); continue; }
        await page.waitForTimeout(300);
        try {
            const { data } = await cdp.send("Page.captureScreenshot", {
                format: "png",
                captureBeyondViewport: true,
            });
            fs.writeFileSync(path.join(OUT, `${slug}--full.png`), Buffer.from(data, "base64"));
            console.log(`OK ${route} h=${h}`);
        } catch (e) {
            console.log(`FAIL shot ${route}: ${e.message.split("\n")[0]}`);
        }
    }
    await browser.close();
})();
