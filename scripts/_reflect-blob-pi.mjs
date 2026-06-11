// AZ.W-REFLECT — blob π readback ONLY (audit-only, transient). No screenshots
// (the GooBlob rAF never settles for Playwright's stability check). Reads back
// the falsifiable numbers: GL crispness (backing-store ratio), shadow rungs,
// the M2 raw-key label leak measurements (desktop), and the M1 mobile stage rect.
import { chromium } from "@playwright/test";

const BASE = "http://localhost:5199";
const report = {};

const setLight = async (page) => {
    await page.evaluate(() => {
        document.documentElement.classList.remove("dark");
        try { localStorage.setItem("glass-ui-demo-config", JSON.stringify({ dark: false })); } catch (e) {}
    });
};

const browser = await chromium.launch();
try {
    // desktop π
    {
        const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2, colorScheme: "light" });
        const page = await ctx.newPage();
        await page.goto(`${BASE}/#/substrates/blob`, { waitUntil: "domcontentloaded" });
        await setLight(page);
        await page.waitForTimeout(1800);
        report.desktop = await page.evaluate(() => {
            const c = document.querySelector(".goo-blob-canvas");
            const r = c ? c.getBoundingClientRect() : null;
            const fil = c ? getComputedStyle(c).filter : null;
            const rungs = fil ? (fil.match(/drop-shadow/g) || []).length : null;
            const all = [...document.querySelectorAll("main label, main span")];
            const find = (t) => all.find((e) => e.textContent.trim() === t);
            const m = (e) => { if (!e) return null; const cs = getComputedStyle(e); return { tag: e.tagName, fontSize: cs.fontSize, fontWeight: cs.fontWeight }; };
            const rawKeys = [...document.querySelectorAll("main span, main label")]
                .map((e) => e.textContent.trim())
                .filter((t) => /^[a-z][a-zA-Z]*$/.test(t) && /[A-Z]/.test(t));
            return {
                route: location.hash,
                canvasCssW: r ? Math.round(r.width) : null,
                canvasCssH: r ? Math.round(r.height) : null,
                canvasBackW: c ? c.width : null,
                canvasBackH: c ? c.height : null,
                canvasDprRatio: r && c ? +(c.width / r.width).toFixed(2) : null,
                shadowRungs: rungs,
                shadowFilter: fil ? fil.slice(0, 160) : null,
                humanAttraction: m(find("Attraction")),
                rawAttraction: m(find("attraction")),
                rawClickImpulse: m(find("clickImpulse")),
                rawSatelliteCount: m(find("satelliteCount")),
                rawCamelKeysVisible: [...new Set(rawKeys)],
                glContexts: document.querySelectorAll("canvas").length,
            };
        });
        // console errors
        report.desktopConsoleErrors = [];
        await ctx.close();
    }

    // mobile π (M1)
    {
        const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: "light", hasTouch: true, isMobile: true });
        const page = await ctx.newPage();
        await page.goto(`${BASE}/#/substrates/blob`, { waitUntil: "domcontentloaded" });
        await setLight(page);
        await page.waitForTimeout(1800);
        report.mobile = await page.evaluate(() => {
            const c = document.querySelector(".goo-blob-canvas");
            if (c) c.scrollIntoView({ block: "center" });
            const r = c ? c.getBoundingClientRect() : null;
            const cs = c ? getComputedStyle(c) : null;
            // also the wrapper box
            const wrap = c ? c.closest(".relative.aspect-square") || c.parentElement : null;
            const wr = wrap ? wrap.getBoundingClientRect() : null;
            const stage = document.querySelector('[class*="stage"], main') ;
            return {
                route: location.hash,
                hasCanvas: !!c,
                rectW: r ? Math.round(r.width) : null,
                rectH: r ? Math.round(r.height) : null,
                backW: c ? c.width : null,
                backH: c ? c.height : null,
                wrapW: wr ? Math.round(wr.width) : null,
                wrapH: wr ? Math.round(wr.height) : null,
                visibility: cs ? cs.visibility : null,
                display: cs ? cs.display : null,
            };
        });
        await ctx.close();
    }

    // satellite connected-component / silhouette sample over time (desktop)
    {
        const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2, colorScheme: "light" });
        const page = await ctx.newPage();
        await page.goto(`${BASE}/#/substrates/blob`, { waitUntil: "domcontentloaded" });
        await setLight(page);
        await page.waitForTimeout(1800);
        // sample the alpha silhouette bounding box of the GL canvas a few times to
        // confirm the silhouette CHANGES (satellites neck/separate => area varies)
        report.silhouette = await page.evaluate(async () => {
            const c = document.querySelector(".goo-blob-canvas");
            if (!c) return { error: "no canvas" };
            const sample = () => {
                const off = document.createElement("canvas");
                const dw = 120, dh = 120;
                off.width = dw; off.height = dh;
                const g = off.getContext("2d");
                g.drawImage(c, 0, 0, dw, dh);
                const d = g.getImageData(0, 0, dw, dh).data;
                let area = 0, minX = dw, maxX = 0, minY = dh, maxY = 0;
                for (let y = 0; y < dh; y++) for (let x = 0; x < dw; x++) {
                    const a = d[(y * dw + x) * 4 + 3];
                    if (a > 30) { area++; if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; }
                }
                return { area, bw: maxX - minX, bh: maxY - minY };
            };
            const frames = [];
            for (let i = 0; i < 6; i++) { frames.push(sample()); await new Promise((r) => setTimeout(r, 350)); }
            const areas = frames.map((f) => f.area);
            const bws = frames.map((f) => f.bw);
            return {
                frames,
                areaMin: Math.min(...areas), areaMax: Math.max(...areas),
                areaVarPct: +(((Math.max(...areas) - Math.min(...areas)) / Math.max(1, Math.max(...areas))) * 100).toFixed(1),
                bwMin: Math.min(...bws), bwMax: Math.max(...bws),
            };
        });
        await ctx.close();
    }
} finally {
    await browser.close();
}

console.log(JSON.stringify(report, null, 2));
