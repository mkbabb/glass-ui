// BG.W-VIZ-DEMIGRATE — NON-AUTHORING Chrome leg (CDP -> real Chrome.app / Metal GPU).
// Boots ?capture over BUILT :5200, polls data-capture-ready, GL_RENDERER probe, screenshot,
// and probes the VIZ DE-MIGRATE structural cohort for fourier-field + constellation:
//  - the viz <canvas> mounts + paints (canvasCount, canvas dims)
//  - glContextCount (one-GL/compute-per-route budget)
//  - animationTimeline / running anims / main.children.length / bodyTextLen
//  - a center-crop pixel spread (the field/lattice is NOT a blank plate)
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-VIZ-DEMIGRATE-paint";
const ROUTES = ["/substrates/fourier-field", "/substrates/constellation"];
const MODES = ["light", "dark"];
const SIZE = { w: 1440, h: 900 };

const results = [];
const browser = await chromium.connectOverCDP("http://localhost:9466");

for (const route of ROUTES) {
    for (const mode of MODES) {
        const ctx = await browser.newContext({
            viewport: { width: SIZE.w, height: SIZE.h },
            deviceScaleFactor: 2,
            colorScheme: mode,
        });
        const page = await ctx.newPage();
        const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
        const tag = route.replace(/^\//, "").replace(/\//g, "_");
        const slug = `demigrate-${tag}-chrome-${mode}`;
        let glRenderer = null, probe = null, err = null;
        try {
            await page.goto(url, { waitUntil: "load", timeout: 30000 });
            await page.waitForFunction(
                () => document.documentElement.hasAttribute("data-capture-ready"),
                { timeout: 25000 },
            );
            // let the viz run a few animation frames so the field/lattice populates
            await page.waitForTimeout(1600);
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
                const main = document.querySelector("main");
                const canvases = Array.from(document.querySelectorAll("canvas"));
                // count LIVE gl/gpu contexts by probing each mounted canvas
                let glCtx = 0, gpuCtx = 0, twoDCtx = 0;
                const canvasInfo = canvases.map((cv) => {
                    const rect = cv.getBoundingClientRect();
                    let kind = "unknown";
                    // we cannot re-getContext a canvas already bound; infer from the data attr / class
                    const cls = cv.className || "";
                    const id = cv.id || "";
                    return { w: cv.width, h: cv.height, cssW: Math.round(rect.width), cssH: Math.round(rect.height), cls: String(cls).slice(0, 40), id: id.slice(0, 40), visible: rect.width > 4 && rect.height > 4 };
                });
                // pixel-spread readback from the largest visible canvas
                let pixelSpread = null;
                const target = canvases
                    .filter((cv) => { const rr = cv.getBoundingClientRect(); return rr.width > 40 && rr.height > 40; })
                    .sort((a, b) => (b.width * b.height) - (a.width * a.height))[0];
                if (target) {
                    try {
                        const off = document.createElement("canvas");
                        off.width = 64; off.height = 64;
                        const octx = off.getContext("2d");
                        octx.drawImage(target, 0, 0, 64, 64);
                        const d = octx.getImageData(0, 0, 64, 64).data;
                        let minL = 255, maxL = 0, sum = 0, n = 0, distinct = new Set();
                        for (let i = 0; i < d.length; i += 4) {
                            const a = d[i + 3];
                            const lum = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
                            if (a > 8) { minL = Math.min(minL, lum); maxL = Math.max(maxL, lum); sum += lum; n++; }
                            distinct.add((d[i] >> 4) + "," + (d[i + 1] >> 4) + "," + (d[i + 2] >> 4) + "," + (a > 8 ? 1 : 0));
                        }
                        pixelSpread = {
                            sampledCanvas: { w: target.width, h: target.height },
                            opaquePx: n, meanL: n ? +(sum / n).toFixed(1) : 0,
                            minL: n ? +minL.toFixed(1) : null, maxL: n ? +maxL.toFixed(1) : null,
                            lumRange: n ? +(maxL - minL).toFixed(1) : 0,
                            distinctBuckets: distinct.size,
                        };
                    } catch (e) { pixelSpread = { err: String(e).slice(0, 120) }; }
                }
                const anims = (document.getAnimations ? document.getAnimations() : []);
                return {
                    captureReady: r.hasAttribute("data-capture-ready"),
                    captureMode: r.getAttribute("data-capture-mode"),
                    isDark: r.classList.contains("dark"),
                    bodyTextLen: txt.length,
                    bodyTextHead: txt.slice(0, 100),
                    mainChildren: main ? main.children.length : null,
                    canvasCount: canvases.length,
                    canvasInfo,
                    supportsAnimTimeline: (typeof CSS !== "undefined" && CSS.supports && CSS.supports("animation-timeline: scroll()")),
                    runningAnims: anims.length,
                    pixelSpread,
                };
            });
            const png = `${OUT}/${slug}.png`;
            await page.screenshot({ path: png, clip: { x: 0, y: 0, width: SIZE.w, height: SIZE.h } });
            results.push({ engine: "chrome", route, mode, glRenderer, png, probe });
            const ps = probe.pixelSpread || {};
            console.error(`chrome ${slug} OK gl=${(glRenderer || "").slice(0, 44)} canvases=${probe.canvasCount} txt=${probe.bodyTextLen} lumRange=${ps.lumRange} buckets=${ps.distinctBuckets} meanL=${ps.meanL}`);
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
