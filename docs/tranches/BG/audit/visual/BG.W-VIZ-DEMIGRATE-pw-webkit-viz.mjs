// BG.W-VIZ-DEMIGRATE — WebKit-engine viz-animation cross-check via Playwright headless WebKit
// (which DRIVES rAF, unlike the off-screen WKWebView whose no-display-link parks pure-rAF viz).
// Confirms the fourier-field + constellation viz ANIMATE correctly on a WebKit engine.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { webkit } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-VIZ-DEMIGRATE-paint";
const TARGETS = {
    "/substrates/fourier-field": ".fourier-field-canvas",
    "/substrates/constellation": ".constellation-canvas",
};
const MODES = ["light", "dark"];
const SIZE = { w: 1440, h: 900 };
const results = [];
const browser = await webkit.launch({ headless: true });

for (const [route, sel] of Object.entries(TARGETS)) {
    for (const mode of MODES) {
        const ctx = await browser.newContext({
            viewport: { width: SIZE.w, height: SIZE.h },
            deviceScaleFactor: 2,
            colorScheme: mode,
        });
        const page = await ctx.newPage();
        const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
        const tag = route.replace(/^\//, "").replace(/\//g, "_");
        const slug = `demigrate-viz-${tag}-pwwebkit-${mode}`;
        let probe = null, err = null;
        try {
            await page.goto(url, { waitUntil: "load", timeout: 30000 });
            await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 25000 });
            await page.evaluate((s) => {
                const all = Array.from(document.querySelectorAll(s));
                const cand = all.map((c) => ({ c, r: c.getBoundingClientRect() }))
                    .filter((o) => o.r.height > 60 && o.r.height < 2000)
                    .sort((a, b) => a.r.width * a.r.height - b.r.width * b.r.height)[0];
                (cand ? cand.c : all[0])?.scrollIntoView({ block: "center" });
            }, sel);
            await page.waitForTimeout(3000); // let rAF advance the viz
            probe = await page.evaluate(() => ({ hidden: document.hidden, vis: document.visibilityState, canvasN: document.querySelectorAll("canvas").length }));
            const png = `${OUT}/${slug}.png`;
            await page.screenshot({ path: png, clip: { x: 0, y: 0, width: SIZE.w, height: SIZE.h } });
            results.push({ engine: "pw-webkit", route, mode, png, probe });
            console.error(`pw-webkit ${slug} OK hidden=${probe.hidden} vis=${probe.vis} canvases=${probe.canvasN}`);
        } catch (e) {
            err = String(e).slice(0, 300);
            results.push({ engine: "pw-webkit", route, mode, err });
            console.error(`pw-webkit ${slug} FAIL ${err}`);
        }
        await ctx.close();
    }
}
await browser.close();
writeFileSync(`${OUT}/pw-webkit-results.json`, JSON.stringify(results, null, 2));
console.error("DONE pw-webkit:", results.length);
