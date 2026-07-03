// BG.W-AUR-IMAGE-SOURCE NON-AUTHORING paint verify — Chrome CDP leg.
// /substrates/aurora, both modes: (a) default palette capture + DOM probes
// (glContextCount live=1, getAnimations, animationTimeline, main.children,
// GL_RENDERER, hero rect, aurora pixel sampling) then (b) drive source=image
// via the CompositionLayer file input + setInputFiles(generated PNG) and capture
// the photo-dissolve.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT =
    "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-AUR-IMAGE-SOURCE-paint";
const ROUTE = "/substrates/aurora";
const MODES = ["light", "dark"];
const SIZE = { w: 1440, h: 900 };

const INIT = `
(() => {
  if (window.__glReg) return;
  window.__glReg = [];
  const orig = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (type, ...rest) {
    const ctx = orig.call(this, type, ...rest);
    if (ctx && /webgl|webgl2|webgpu/.test(type)) {
      const exist = window.__glReg.find((e) => e.canvas === this);
      if (!exist) window.__glReg.push({ canvas: this, type });
    }
    return ctx;
  };
  window.__glContextCount = () => {
    const live = window.__glReg.filter((e) => e.canvas && e.canvas.isConnected);
    return { live: live.length, types: live.map((e) => e.type), total: window.__glReg.length };
  };
})();
`;

function probeJs() {
    return (() => {
        const r = document.documentElement;
        const main = document.querySelector("main");
        const glc = (window.__glContextCount && window.__glContextCount()) || {
            live: -1,
            types: [],
            total: -1,
        };
        const mainKids = main ? Array.from(main.children) : [];
        const grab = (sel) => {
            const el = document.querySelector(sel);
            if (!el) return null;
            const cs = getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            return {
                sel,
                text: (el.innerText || "").slice(0, 60),
                color: cs.color,
                fontSize: cs.fontSize,
                rect: {
                    x: Math.round(rect.x),
                    y: Math.round(rect.y),
                    w: Math.round(rect.width),
                    h: Math.round(rect.height),
                },
            };
        };
        const canvases = Array.from(document.querySelectorAll("canvas")).map((c) => {
            const rect = c.getBoundingClientRect();
            return {
                connected: c.isConnected,
                w: Math.round(rect.width),
                h: Math.round(rect.height),
                fieldCanvas: c.getAttribute("data-glass-field-canvas"),
                parentClass:
                    (c.parentElement &&
                        c.parentElement.className &&
                        c.parentElement.className.toString().slice(0, 60)) ||
                    "",
            };
        });
        let routeAnims = -1,
            routeRootClass = "",
            routeTimeline = "n/a";
        if (main && main.children[0]) {
            const root0 = main.children[0];
            routeRootClass = (root0.className && root0.className.toString().slice(0, 80)) || "";
            try {
                routeAnims = root0.getAnimations({ subtree: true }).length;
            } catch (e) {
                routeAnims = -2;
            }
        }
        const docAnims = document.getAnimations ? document.getAnimations().length : -1;
        const heroH1 = grab("main h1") || grab("h1");
        const masthead =
            grab(".text-display-3") || grab("[class*=display]") || grab("header span");
        const eyebrow = grab(".section-label");
        return {
            captureReady: r.hasAttribute("data-capture-ready"),
            captureMode: r.getAttribute("data-capture-mode"),
            isDark: r.classList.contains("dark"),
            glLive: glc.live,
            glTypes: glc.types,
            glTotal: glc.total,
            mainChildren: mainKids.length,
            routeRootClass,
            routeAnims,
            docAnims,
            canvases,
            heroH1,
            masthead,
            eyebrow,
            bodyTextLen: (document.body.innerText || "").replace(/\s+/g, " ").trim().length,
        };
    })();
}

// Sample the aurora canvas pixels for a recessiveness / no-conic / calm readback.
function auroraPixelJs() {
    return (() => {
        const c = document.querySelector("canvas[data-glass-field-canvas], canvas");
        if (!c) return { err: "no-canvas" };
        // grab via a 2D readback: draw the canvas into a downsample tmp canvas
        const N = 24;
        const tmp = document.createElement("canvas");
        tmp.width = N;
        tmp.height = N;
        const ctx = tmp.getContext("2d");
        try {
            ctx.drawImage(c, 0, 0, N, N);
        } catch (e) {
            return { err: "draw:" + e.message };
        }
        let data;
        try {
            data = ctx.getImageData(0, 0, N, N).data;
        } catch (e) {
            return { err: "getImageData:" + e.message };
        }
        // compute per-pixel HSV-ish stats: mean RGB, max chroma, saturation histogram
        let sumR = 0,
            sumG = 0,
            sumB = 0,
            maxSat = 0,
            sumSat = 0,
            n = 0,
            minL = 1,
            maxL = 0,
            oversat = 0;
        for (let i = 0; i < data.length; i += 4) {
            const R = data[i] / 255,
                G = data[i + 1] / 255,
                B = data[i + 2] / 255;
            sumR += R;
            sumG += G;
            sumB += B;
            const mx = Math.max(R, G, B),
                mn = Math.min(R, G, B);
            const L = (mx + mn) / 2;
            const sat = mx === 0 ? 0 : (mx - mn) / mx;
            maxSat = Math.max(maxSat, sat);
            sumSat += sat;
            if (sat > 0.85 && mx > 0.9) oversat++;
            minL = Math.min(minL, L);
            maxL = Math.max(maxL, L);
            n++;
        }
        return {
            meanR: +(sumR / n).toFixed(3),
            meanG: +(sumG / n).toFixed(3),
            meanB: +(sumB / n).toFixed(3),
            meanSat: +(sumSat / n).toFixed(3),
            maxSat: +maxSat.toFixed(3),
            oversatFrac: +(oversat / n).toFixed(3),
            minL: +minL.toFixed(3),
            maxL: +maxL.toFixed(3),
            lRange: +(maxL - minL).toFixed(3),
            samples: n,
        };
    })();
}

const results = [];
const browser = await chromium.connectOverCDP("http://localhost:9466");

for (const mode of MODES) {
    const ctx = await browser.newContext({
        viewport: { width: SIZE.w, height: SIZE.h },
        deviceScaleFactor: 2,
        colorScheme: mode,
    });
    await ctx.addInitScript(INIT);
    const page = await ctx.newPage();
    const url = `http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`;
    let glRenderer = null,
        probe = null,
        pxDefault = null,
        pxImage = null,
        imageDrive = null,
        err = null;
    try {
        await page.goto(url, { waitUntil: "load", timeout: 30000 });
        await page.waitForFunction(
            () => document.documentElement.hasAttribute("data-capture-ready"),
            { timeout: 25000 },
        );
        await page.waitForTimeout(900);
        glRenderer = await page.evaluate(() => {
            try {
                const c = document.createElement("canvas");
                const gl = c.getContext("webgl2") || c.getContext("webgl");
                if (!gl) return "no-webgl";
                const dbg = gl.getExtension("WEBGL_debug_renderer_info");
                return dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "no-debug-ext";
            } catch (e) {
                return "err:" + e.message;
            }
        });
        probe = await page.evaluate(probeJs);
        pxDefault = await page.evaluate(auroraPixelJs);
        const png = `${OUT}/chrome-aurora-${mode}.png`;
        await page.screenshot({ path: png, clip: { x: 0, y: 0, width: SIZE.w, height: SIZE.h } });
        results.push({ engine: "chrome", route: ROUTE, mode, phase: "palette-default", glRenderer, png, probe, pxDefault });
        console.error(
            `chrome ${mode} DEFAULT OK glLive=${probe.glLive}[${probe.glTypes}] mainKids=${probe.mainChildren} anims=${probe.routeAnims} hero=${probe.heroH1 ? probe.heroH1.rect.w + "x" + probe.heroH1.rect.h : "none"} px=${JSON.stringify(pxDefault)}`,
        );

        // ---- (b) drive source=image ----
        // Generate a colorful photo-like PNG in-page, hand the bytes to setInputFiles.
        const imgBytes = await page.evaluate(async () => {
            const w = 320,
                h = 200;
            const cv = document.createElement("canvas");
            cv.width = w;
            cv.height = h;
            const g = cv.getContext("2d");
            // vivid multi-stop diagonal gradient + blobs → a "photo" with strong regions
            const grad = g.createLinearGradient(0, 0, w, h);
            grad.addColorStop(0.0, "#ff2d55");
            grad.addColorStop(0.3, "#ff9500");
            grad.addColorStop(0.55, "#34c759");
            grad.addColorStop(0.8, "#007aff");
            grad.addColorStop(1.0, "#af52de");
            g.fillStyle = grad;
            g.fillRect(0, 0, w, h);
            for (let i = 0; i < 8; i++) {
                g.beginPath();
                g.fillStyle = `hsla(${i * 45},90%,55%,0.55)`;
                g.arc((i * 47) % w, (i * 71) % h, 30 + (i % 3) * 15, 0, Math.PI * 2);
                g.fill();
            }
            const blob = await new Promise((res) => cv.toBlob(res, "image/png"));
            const buf = await blob.arrayBuffer();
            return Array.from(new Uint8Array(buf));
        });
        // Find & click the Source "Image" tab. The configurator is on the right; the
        // Composition layer hosts the Source SegmentedTabs. Try clicking any tab/button
        // reading "Composition", then the "Image" option.
        const driveLog = [];
        try {
            // Switch configurator to the Composition layer if a switcher exists.
            const compTab = page
                .locator("button, [role=tab], [role=button]")
                .filter({ hasText: /^Composition$/ });
            if ((await compTab.count()) > 0) {
                await compTab.first().click({ timeout: 3000 }).catch((e) => driveLog.push("compTab:" + e.message));
                await page.waitForTimeout(300);
                driveLog.push("clicked-composition");
            } else {
                driveLog.push("no-composition-tab");
            }
            // Click the "Image" source option (a SegmentedTabs pill).
            const imgOpt = page
                .locator("button, [role=tab], [role=button], [aria-pressed]")
                .filter({ hasText: /^Image$/ });
            const imgCount = await imgOpt.count();
            driveLog.push("image-opt-count:" + imgCount);
            if (imgCount > 0) {
                await imgOpt.first().click({ timeout: 3000 }).catch((e) => driveLog.push("imgOpt:" + e.message));
                await page.waitForTimeout(400);
            }
            // The file input should now be present.
            const fileInput = page.locator('input[type=file][accept="image/*"]');
            const fiCount = await fileInput.count();
            driveLog.push("file-input-count:" + fiCount);
            if (fiCount > 0) {
                await fileInput.first().setInputFiles({
                    name: "photo.png",
                    mimeType: "image/png",
                    buffer: Buffer.from(imgBytes),
                });
                driveLog.push("uploaded");
                // Let decode + upload + a few drift frames run.
                await page.waitForTimeout(1600);
                pxImage = await page.evaluate(auroraPixelJs);
                const imgPng = `${OUT}/chrome-aurora-image-${mode}.png`;
                await page.screenshot({
                    path: imgPng,
                    clip: { x: 0, y: 0, width: SIZE.w, height: SIZE.h },
                });
                imageDrive = { png: imgPng, driveLog, pxImage };
                results.push({ engine: "chrome", route: ROUTE, mode, phase: "image-source", png: imgPng, driveLog, pxImage });
                console.error(`chrome ${mode} IMAGE-DRIVE OK log=${JSON.stringify(driveLog)} px=${JSON.stringify(pxImage)}`);
            } else {
                imageDrive = { err: "no-file-input", driveLog };
                results.push({ engine: "chrome", route: ROUTE, mode, phase: "image-source", err: "no-file-input", driveLog });
                console.error(`chrome ${mode} IMAGE-DRIVE FAIL no-file-input log=${JSON.stringify(driveLog)}`);
            }
        } catch (e2) {
            imageDrive = { err: String(e2).slice(0, 300), driveLog };
            results.push({ engine: "chrome", route: ROUTE, mode, phase: "image-source", err: String(e2).slice(0, 200), driveLog });
            console.error(`chrome ${mode} IMAGE-DRIVE ERR ${String(e2).slice(0, 200)} log=${JSON.stringify(driveLog)}`);
        }
    } catch (e) {
        err = String(e).slice(0, 300);
        results.push({ engine: "chrome", route: ROUTE, mode, err });
        console.error(`chrome ${mode} FAIL ${err}`);
    }
    await ctx.close();
}

writeFileSync(`${OUT}/chrome-results.json`, JSON.stringify({ results }, null, 2));
await browser.close();
console.error("DONE chrome:", results.length, "records");
