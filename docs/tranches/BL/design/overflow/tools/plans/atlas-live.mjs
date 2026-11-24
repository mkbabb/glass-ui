// Atlas's live pages: which selector opens the Filters drawer. For each route and cell, the
// count of `[data-viz-dock-filter-toggle]` (all, visible) and of the old
// `[data-testid=dock-filter-pullout]`, then a tap or click on the first visible toggle and
// whether the drawer (`[data-testid=filter-panel]`) and its body (`.cp-drawer__body`) show.
// node atlas-live.mjs <out.json> <origin> <route>...
// One browser, a context per cell, closed in finally.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";

const require = createRequire(new URL("../../trees/v11.1.1/package.json", import.meta.url).pathname);
const { chromium } = require("playwright");
const [OUT, ORIGIN, ...ROUTES] = process.argv.slice(2);
const CELLS = [
    { name: "390t-dark", viewport: { width: 390, height: 844 }, touch: true },
    { name: "1440-dark", viewport: { width: 1440, height: 900 }, touch: false },
];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rows = [];
const browser = await chromium.launch({ headless: true });
const version = browser.version();
try {
    for (const cell of CELLS) {
        const context = await browser.newContext({ viewport: cell.viewport, hasTouch: cell.touch, isMobile: cell.touch, deviceScaleFactor: cell.touch ? 2 : 1, colorScheme: "dark" });
        try {
            for (const route of ROUTES) {
                const page = await context.newPage();
                const row = { route, cell: cell.name };
                try {
                    await page.goto(`${ORIGIN}${route}`, { waitUntil: "load", timeout: 45000 });
                    await sleep(4000);
                    const count = () => page.evaluate(() => {
                        const vis = (e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== "hidden"; };
                        const t = [...document.querySelectorAll("[data-viz-dock-filter-toggle]")];
                        const panel = document.querySelector("[data-testid=filter-panel]");
                        return {
                            toggles: t.length,
                            togglesVisible: t.filter(vis).length,
                            pullout: document.querySelectorAll("[data-testid=dock-filter-pullout]").length,
                            panelOpen: !!panel && vis(panel),
                            body: !!document.querySelector(".cp-drawer__body"),
                        };
                    });
                    row.before = await count();
                    const h = page.locator("[data-viz-dock-filter-toggle]").locator("visible=true").first();
                    if (row.before.togglesVisible) {
                        await h.scrollIntoViewIfNeeded();
                        if (cell.touch) await h.tap({ timeout: 5000 }); else await h.click({ timeout: 5000 });
                        await sleep(1500);
                        row.after = await count();
                        row.bodySize = await page.evaluate(() => { const b = document.querySelector(".cp-drawer__body"); return b ? { sw: b.scrollWidth, cw: b.clientWidth, ox: getComputedStyle(b).overflowX } : null; });
                    }
                } catch (e) {
                    row.error = String(e).slice(0, 200);
                } finally {
                    await page.close().catch(() => {});
                }
                rows.push(row);
                console.log(JSON.stringify(row));
            }
        } finally {
            await context.close().catch(() => {});
        }
    }
} finally {
    await browser.close();
}
writeFileSync(OUT, JSON.stringify({ engine: "chromium", version, origin: ORIGIN, rows }, null, 1));
