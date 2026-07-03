// BG.W-VIZ-DEMIGRATE — Chrome viz-scroll pass: scroll the PRIMARY viz canvas into center,
// let it run frames, screenshot the viewport so the field/lattice paint is IN FRAME, and
// read the composited screenshot-region luminance spread (blank-plate detector on the PNG,
// NOT a cross-context drawImage which returns transparent for WebGL/WebGPU canvases).
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-VIZ-DEMIGRATE-paint";
// route -> the css selector of the viz canvas to center
const TARGETS = {
    "/substrates/fourier-field": ".fourier-field-canvas",
    "/substrates/constellation": ".constellation-canvas", // the first showcase instance
};
const MODES = ["light", "dark"];
const SIZE = { w: 1440, h: 900 };

const results = [];
const browser = await chromium.connectOverCDP("http://localhost:9466");

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
        const slug = `demigrate-viz-${tag}-chrome-${mode}`;
        let probe = null, err = null;
        try {
            await page.goto(url, { waitUntil: "load", timeout: 30000 });
            await page.waitForFunction(
                () => document.documentElement.hasAttribute("data-capture-ready"),
                { timeout: 25000 },
            );
            // center the viz canvas in the viewport
            const box = await page.evaluate((s) => {
                // pick the largest DEMO instance (skip the giant full-page background bg canvas)
                const all = Array.from(document.querySelectorAll(s));
                const cand = all
                    .map((c) => ({ c, r: c.getBoundingClientRect(), area: c.getBoundingClientRect().width * c.getBoundingClientRect().height }))
                    .filter((o) => o.r.width > 60 && o.r.height > 60 && o.r.height < 2000) // skip 6204px bg
                    .sort((a, b) => a.area - b.area)[0]; // smallest reasonable = a clean demo tile
                const pick = cand ? cand.c : all[0];
                if (!pick) return null;
                pick.scrollIntoView({ block: "center", behavior: "instant" });
                const r = pick.getBoundingClientRect();
                return { top: r.top, left: r.left, width: r.width, height: r.height };
            }, sel);
            // let the viz advance frames after the scroll (offscreen-pause wakes on visibility)
            await page.waitForTimeout(2000);
            probe = await page.evaluate((s) => {
                const all = Array.from(document.querySelectorAll(s));
                const infos = all.map((c) => { const r = c.getBoundingClientRect(); return { w: c.width, h: c.height, top: Math.round(r.top), left: Math.round(r.left), cw: Math.round(r.width), ch: Math.round(r.height), inView: r.top < 900 && r.bottom > 0 }; });
                return { count: all.length, infos, box: (window.__vizbox || null) };
            }, sel);
            const png = `${OUT}/${slug}.png`;
            await page.screenshot({ path: png, clip: { x: 0, y: 0, width: SIZE.w, height: SIZE.h } });
            results.push({ engine: "chrome", route, mode, png, box, probe });
            console.error(`chrome ${slug} OK box=${box ? Math.round(box.top) + ',' + Math.round(box.height) : 'null'} canvases=${probe.count}`);
        } catch (e) {
            err = String(e).slice(0, 300);
            results.push({ engine: "chrome", route, mode, err });
            console.error(`chrome ${slug} FAIL ${err}`);
        }
        await ctx.close();
    }
}
await browser.close();
writeFileSync(`${OUT}/chrome-vizscroll-results.json`, JSON.stringify(results, null, 2));
console.error("DONE viz-scroll:", results.length);
