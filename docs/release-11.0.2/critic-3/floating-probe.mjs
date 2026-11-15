// Does a host's --glass-border-floating colour the dock plate's edge? Read on the
// press harness: the edge at t = 0 (folded) and, on a static dock, at t = 1, with the
// token unset and then set to a literal on the dock's root. One browser, one context.
//   node floating-probe.mjs <base-url>
import { chromium } from "playwright";
const [base] = process.argv.slice(2);
const browser = await chromium.launch();
try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    try {
        const page = await context.newPage();
        await page.goto(`${base}/tests-visual/release-11-0-2/press-harness.html`);
        await page.locator(".press-dock .dock-plate").waitFor();
        await page.waitForTimeout(500);
        const r = await page.evaluate(() => {
            const host = document.querySelector(".press-dock");
            const plate = host.querySelector(".dock-plate");
            const at = (t) => {
                plate.style.setProperty("--dock-expand-t", String(t));
                return getComputedStyle(plate).borderTopColor;
            };
            const out = { unset: { folded: at(0), open: at(1) } };
            host.style.setProperty("--glass-border-floating", "rgb(200 0 0 / 0.5)");
            out.set = { folded: at(0), open: at(1) };
            host.setAttribute("data-backdrop-mode", "static");
            out.setStatic = { folded: at(0), open: at(1) };
            host.style.removeProperty("--glass-border-floating");
            out.unsetStatic = { folded: at(0), open: at(1) };
            return out;
        });
        console.log(JSON.stringify(r, null, 1));
    } finally {
        await context.close();
    }
} finally {
    await browser.close();
}
