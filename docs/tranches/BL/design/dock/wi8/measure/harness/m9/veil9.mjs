// veil9.mjs <port> <tag> [--engine chromium|webkit]: MEASURE-9 part H, item H7 (RU-69 as ruled in RU-105). One reading on
// the tip, recorded either way: w-pill as built, and w-pill with `--glass-veil-dock: 0.5` set on its root; at the folded
// rest and the open rest (a hover, 1.2 s), the computed `--glass-veil-tier`, `--dock-plate-collapsed-tier`,
// `--dock-plate-expanded-tier` and `--glass-veil-dock` on its `.dock-plate`, and the plate's background. Both schemes.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const [port, tag] = a;
const engine = a.includes("--engine") ? a[a.indexOf("--engine") + 1] : "chromium";
const out = { engine, cells: [] };
let browser;
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
    for (const scheme of ["light", "dark"]) for (const token of [null, "0.5"]) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
        try {
            const p = await ctx.newPage();
            await p.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=w-pill${scheme === "dark" ? "&scheme=dark" : ""}`);
            await p.waitForSelector("[data-testid=w-pill]");
            if (token) await p.evaluate((v) => document.querySelector("[data-testid=w-pill]").style.setProperty("--glass-veil-dock", v), token);
            await p.waitForTimeout(700);
            const read = () => p.evaluate(() => { const d = document.querySelector("[data-testid=w-pill]"); const pl = d.querySelector(".dock-plate"); const cs = getComputedStyle(pl); const g = (k) => cs.getPropertyValue(k).trim(); return { posture: d.classList.contains("expanded") ? "open" : "folded", veilTier: g("--glass-veil-tier"), collapsedTier: g("--dock-plate-collapsed-tier"), expandedTier: g("--dock-plate-expanded-tier"), veilDock: g("--glass-veil-dock"), background: cs.backgroundColor, backgroundImage: cs.backgroundImage.slice(0, 160) }; });
            const folded = await read();
            const b = await p.locator("[data-testid=w-pill]").boundingBox();
            await p.mouse.move(b.x - 20, b.y + b.height / 2); await p.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 3 }); await p.waitForTimeout(1200);
            const open = await read();
            out.cells.push({ scheme, token, folded, open });
            console.log(scheme, token, JSON.stringify({ folded, open }));
        } finally {
            await ctx.close();
        }
    }
} finally {
    if (browser) await browser.close();
    writeFileSync(new URL(`../../logs/m9-veil.${tag}.${engine}.json`, import.meta.url), JSON.stringify(out, null, 1));
}
