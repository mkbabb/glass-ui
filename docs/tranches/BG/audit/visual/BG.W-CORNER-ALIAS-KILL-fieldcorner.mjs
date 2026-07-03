// Targeted corner close-ups on the SATURATED FIELD showcase cards (the ones with a
// vivid backdrop — orange/blue) whose rounded corners are the exact defect surface.
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const pw = require("playwright-core");
const { chromium } = pw;
import fs from "node:fs";
import path from "node:path";

const OUT = "docs/tranches/BG/audit/visual/BG.W-CORNER-ALIAS-KILL-paint";
const ROUTES = [
    { route: "/display/buttons", slug: "buttons" },
    { route: "/display/card", slug: "card" },
    { route: "/substrates/glass-material", slug: "glass-material" },
];
const MODES = ["light", "dark"];

const browser = await chromium.connectOverCDP("http://localhost:9456");
const ctx = browser.contexts()[0] || (await browser.newContext());
const audit = [];

for (const { route, slug } of ROUTES) {
    for (const mode of MODES) {
        const page = await ctx.newPage();
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto(`http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`, { waitUntil: "domcontentloaded", timeout: 30000 });
        await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 20000 });
        await page.waitForTimeout(1400);

        // Find the most-saturated rounded field card in the top ~800px: scan all rounded
        // elements, score by backgroundColor chroma / gradient presence.
        const fld = await page.evaluate(() => {
            function chroma(rgb) {
                const m = rgb.match(/(\d+\.?\d*)/g);
                if (!m || m.length < 3) return 0;
                const [r, g, b] = m.map(Number);
                return (Math.max(r, g, b) - Math.min(r, g, b)) / 255;
            }
            const all = Array.from(document.querySelectorAll("div, section, article, [class*='showcase'], [class*='field'], [class*='frame']"));
            let best = null, bestScore = -1;
            for (const el of all) {
                const cs = getComputedStyle(el);
                const br = parseFloat(cs.borderRadius) || 0;
                if (br < 8) continue;
                const r = el.getBoundingClientRect();
                if (r.width < 260 || r.height < 90) continue;
                if (r.top < 40 || r.top > 780) continue;
                const bg = cs.backgroundColor;
                const grad = cs.backgroundImage && cs.backgroundImage !== "none";
                const score = chroma(bg) + (grad ? 0.4 : 0) + Math.min(r.width, 1200) / 4000;
                if (score > bestScore) { bestScore = score; best = { x: r.x, y: r.y, width: r.width, height: r.height, top: r.top, br, bg, grad, cls: el.className?.toString().slice(0,50) }; }
            }
            return best;
        });

        if (fld) {
            const cy = Math.max(0, Math.floor(fld.y));
            const tlx = Math.max(0, Math.floor(fld.x));
            const trx = Math.max(0, Math.floor(fld.x + fld.width - 110));
            const h = Math.min(110, Math.floor(fld.height));
            await page.screenshot({ path: path.join(OUT, `${slug}-field-chrome-${mode}-cornerTL.png`), clip: { x: tlx, y: cy, width: 110, height: h } });
            await page.screenshot({ path: path.join(OUT, `${slug}-field-chrome-${mode}-cornerTR.png`), clip: { x: trx, y: cy, width: 110, height: h } });
            audit.push({ route, mode, fld });
            console.error(`[field] ${slug} ${mode}  ${Math.round(fld.width)}x${Math.round(fld.height)}@${Math.round(fld.top)} br=${fld.br} bg=${fld.bg} grad=${fld.grad} cls=${fld.cls}`);
        } else {
            console.error(`[field] ${slug} ${mode}  NO SATURATED FIELD CARD FOUND`);
            audit.push({ route, mode, fld: null });
        }
        await page.close();
    }
}
await browser.close();
fs.writeFileSync(path.join(OUT, "chrome-field-audit.json"), JSON.stringify(audit, null, 2));
console.log("DONE field corner capture");
