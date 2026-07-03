// BG.W-VIZ-PREVIEW-LIVE — Chrome recapture: robust per-card RENDERED-pixel hash via
// element-level screenshots (auto-scroll into view => below-fold cards captured), the
// canvas-identity probe (what is the 1 landing canvas?), and the badge crop.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-VIZ-PREVIEW-LIVE-paint";
const ROUTE = "/substrates";
const MODES = ["light", "dark"];
const SIZE = { w: 1440, h: 900 };

const browser = await chromium.connectOverCDP("http://localhost:9466");
const results = [];

for (const mode of MODES) {
    const ctx = await browser.newContext({
        viewport: { width: SIZE.w, height: SIZE.h },
        deviceScaleFactor: 2,
        colorScheme: mode,
    });
    const page = await ctx.newPage();
    const url = `http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`;
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 25000 });
    await page.waitForTimeout(1400);

    // canvas identity probe — what is the (allowed ≤1) live GL context on the landing?
    const canvasProbe = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("canvas")).map((c) => {
            let ctxKind = "none/2d";
            try { if (c.getContext("webgl2")) ctxKind = "webgl2"; else if (c.getContext("webgl")) ctxKind = "webgl"; else if (c.getContext("webgpu")) ctxKind = "webgpu"; } catch {}
            const b = c.getBoundingClientRect();
            // walk ancestry to identify the owner
            let owner = [];
            let el = c;
            for (let d = 0; d < 5 && el; d++) { owner.push((el.className || el.tagName || "").toString().slice(0, 40)); el = el.parentElement; }
            return { ctxKind, cls: (c.className || "").toString().slice(0, 60), w: c.width, h: c.height, cssW: +b.width.toFixed(0), cssH: +b.height.toFixed(0), ownerChain: owner };
        });
    });

    // element-level per-still pixel hash (playwright scrolls the element into view).
    const stillHandles = await page.locator("img.section-preview-card-viz-still").all();
    const perCard = [];
    for (let i = 0; i < stillHandles.length; i++) {
        try {
            const buf = await stillHandles[i].screenshot();
            const src = await stillHandles[i].getAttribute("src");
            perCard.push({
                i,
                pixHash: createHash("sha1").update(buf).digest("hex").slice(0, 16),
                pixBytes: buf.length,
                srcHash: createHash("sha1").update(src || "").digest("hex").slice(0, 16),
                srcLen: (src || "").length,
            });
        } catch (e) {
            perCard.push({ i, pixHash: null, reason: e.message });
        }
    }

    // scroll back to top, capture the badge crop for provenance decode
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
    await page.screenshot({ path: `${OUT}/vpl-substrates-chrome-${mode}-badge.png`, clip: { x: 0, y: 0, width: 620, height: 120 } });

    const distinctPix = new Set(perCard.map((p) => p.pixHash).filter(Boolean)).size;
    const distinctSrc = new Set(perCard.map((p) => p.srcHash).filter(Boolean)).size;
    results.push({ mode, canvasProbe, perCard, distinctPix, distinctSrc, stillCount: stillHandles.length });
    console.log(`[${mode}] stills=${stillHandles.length} distinctPix=${distinctPix} distinctSrc=${distinctSrc} | canvases=${JSON.stringify(canvasProbe)}`);
    await ctx.close();
}

writeFileSync(`${OUT}/chrome-recapture.json`, JSON.stringify(results, null, 2));
console.log("\nWROTE", `${OUT}/chrome-recapture.json`);
await browser.close();
