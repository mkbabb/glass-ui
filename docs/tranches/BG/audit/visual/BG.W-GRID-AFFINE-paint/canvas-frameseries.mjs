// Focused liquid-grid canvas frame-series (Chrome/Metal). Scrolls the viz into view to
// un-park content-visibility, then grabs element screenshots at stepped wall-clock times so
// the traveling-wave bow is captured mid-motion. Saves per-frame PNGs for pngjs geometry analysis.
import { chromium } from "playwright";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const ROUTE = "/substrates/liquid-grid";
const OUT = new URL(".", import.meta.url).pathname;

async function run(ctx, mode) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(
        `http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`,
        { waitUntil: "load", timeout: 30000 },
    );
    const t0 = Date.now();
    while (Date.now() - t0 < 15000) {
        if (
            await page.evaluate(() =>
                document.documentElement.hasAttribute("data-capture-ready"),
            )
        )
            break;
        await page.waitForTimeout(150);
    }
    // scroll the liquid-grid canvas into view to un-park content-visibility
    const handle = await page.$('[data-testid="liquid-grid-canvas"]');
    await handle.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800); // let it arm + animate a few frames
    const rect = await handle.boundingBox();
    // frame series — element screenshots at stepped times
    const times = [0, 350, 700, 1050, 1400];
    const frames = [];
    for (const t of times) {
        if (t > 0) await page.waitForTimeout(350);
        const p = `${OUT}frame-${mode}-${t}.png`;
        await handle.screenshot({ path: p });
        frames.push({ t, path: p });
    }
    console.log(JSON.stringify({ mode, rect, frames: frames.map((f) => f.path) }));
    await page.close();
}

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0];
await run(ctx, "light");
await run(ctx, "dark");
await browser.close();
