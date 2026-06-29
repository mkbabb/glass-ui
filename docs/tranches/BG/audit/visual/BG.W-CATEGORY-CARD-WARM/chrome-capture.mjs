// BG.W-CATEGORY-CARD-WARM Chrome leg — CDP connect, ?capture boot over BUILT :5200,
// badge + content/GL/warm probe + screenshot for /forms /display /data in both modes.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-CATEGORY-CARD-WARM";
const ROUTES = ["/forms", "/display", "/data"];
const MODES = ["light", "dark"];
const SIZE = { w: 1440, h: 900 };

const results = [];
const browser = await chromium.connectOverCDP("http://localhost:9456");

for (const route of ROUTES) {
    for (const mode of MODES) {
        const ctx = await browser.newContext({
            viewport: { width: SIZE.w, height: SIZE.h },
            deviceScaleFactor: 2,
            colorScheme: mode,
        });
        const page = await ctx.newPage();
        const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
        const slug = route.replace(/\//g, "") + "-" + mode;
        let glRenderer = null, probe = null, err = null;
        try {
            await page.goto(url, { waitUntil: "load", timeout: 30000 });
            await page.waitForFunction(
                () => document.documentElement.hasAttribute("data-capture-ready"),
                { timeout: 25000 },
            );
            glRenderer = await page.evaluate(() => {
                try {
                    const c = document.createElement("canvas");
                    const gl = c.getContext("webgl2") || c.getContext("webgl");
                    if (!gl) return "no-webgl";
                    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
                    return dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "no-debug-ext";
                } catch (e) { return "err:" + e.message; }
            });
            probe = await page.evaluate(() => {
                const r = document.documentElement;
                const txt = (document.body.innerText || "").replace(/\s+/g, " ").trim();
                // count REAL on-DOM canvases (engine badge is mounted as fixed top-left)
                const allCanvases = Array.from(document.querySelectorAll("canvas"));
                const liveGlCanvases = allCanvases.filter((c) => {
                    try {
                        const w = c.getBoundingClientRect();
                        // badge canvas is tiny; live-GL field would be large
                        return w.width > 200 && w.height > 200;
                    } catch { return false; }
                }).length;
                // sub-category preview cards (SectionPreviewCard → .glass-resting plate)
                const cards = Array.from(document.querySelectorAll("a[class*='section-preview'], .section-preview-card, [data-section-preview]"));
                let cardSel = ".section-preview-card";
                let cardEls = cards;
                if (cardEls.length === 0) {
                    // fall back to the glass-resting plates inside the bento
                    cardEls = Array.from(document.querySelectorAll(".section-bento .glass-resting, .section-bento a"));
                    cardSel = ".section-bento .glass-resting|a";
                }
                const bento = document.querySelector(".section-bento");
                let bentoFieldBg = null;
                if (bento) {
                    bentoFieldBg = getComputedStyle(bento, "::before").backgroundImage?.slice(0, 120) || null;
                }
                // sample card geometry + computed bg + a title contrast probe
                const cardInfo = cardEls.slice(0, 6).map((el) => {
                    const cs = getComputedStyle(el);
                    const rect = el.getBoundingClientRect();
                    const title = el.querySelector("h2, h3, .text-subheading, [class*='title']");
                    const tcs = title ? getComputedStyle(title) : null;
                    return {
                        rect: { x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height) },
                        bg: cs.backgroundColor,
                        titleColor: tcs ? tcs.color : null,
                        titleText: title ? (title.textContent || "").trim().slice(0, 30) : null,
                    };
                });
                return {
                    captureReady: r.hasAttribute("data-capture-ready"),
                    captureMode: r.getAttribute("data-capture-mode"),
                    isDark: r.classList.contains("dark"),
                    bodyTextLen: txt.length,
                    bodyTextHead: txt.slice(0, 100),
                    totalCanvases: allCanvases.length,
                    liveGlCanvases,
                    cardSel,
                    cardCount: cardEls.length,
                    bentoFieldBg,
                    cardInfo,
                };
            });
            const png = `${OUT}/chrome-${slug}.png`;
            await page.screenshot({ path: png, clip: { x: 0, y: 0, width: SIZE.w, height: SIZE.h } });
            results.push({ engine: "chrome", route, mode, w: SIZE.w, h: SIZE.h, glRenderer, png, probe });
            console.error(`chrome ${slug} OK gl=${(glRenderer || "").slice(0, 40)} cards=${probe.cardCount} liveGL=${probe.liveGlCanvases} textLen=${probe.bodyTextLen}`);
        } catch (e) {
            err = String(e).slice(0, 300);
            results.push({ engine: "chrome", route, mode, err });
            console.error(`chrome ${slug} FAIL ${err}`);
        }
        await ctx.close();
    }
}
await browser.close();
writeFileSync(`${OUT}/chrome-results.json`, JSON.stringify(results, null, 2));
console.error("DONE chrome:", results.length, "configs");
