// AZ.W-REFLECT — blob reflection capture (audit-only, transient).
// Drives the ROOT-hoisted Playwright against the live :5199 demo, captures the
// /substrates/blob page (hero IA + studio stage + configurator) at 2 viewports ×
// both modes, captures timed satellite frames (orbit/neck/separate), and reads
// back the π values (canvas backing-store crispness, shadow rungs, the M1 mobile
// stage rect, the M2 raw-key label leak measurements).
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const OUT = "docs/tranches/AZ/audit/reflect";
const BASE = "http://localhost:5199";
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
    { name: "desktop", width: 1280, height: 800 },
    { name: "mobile", width: 390, height: 844 },
];
const MODES = ["light", "dark"];

const report = { captures: [], pi: {} };

const setMode = async (page, mode) => {
    await page.evaluate((m) => {
        document.documentElement.classList.toggle("dark", m === "dark");
        try {
            localStorage.setItem("glass-ui-demo-config", JSON.stringify({ dark: m === "dark" }));
        } catch (e) {}
    }, mode);
};

const browser = await chromium.launch();
try {
    for (const vp of VIEWPORTS) {
        for (const mode of MODES) {
            const ctx = await browser.newContext({
                viewport: { width: vp.width, height: vp.height },
                deviceScaleFactor: 2,
                colorScheme: mode,
            });
            const page = await ctx.newPage();
            await page.goto(`${BASE}/#/substrates/blob`, { waitUntil: "networkidle" });
            await setMode(page, mode);
            await page.waitForTimeout(1600);

            // full page (scroll the main content region into a tall screenshot)
            const top = `${OUT}/blob-r2-${vp.name}-${mode}-top.png`;
            await page.screenshot({ path: top, fullPage: false });
            report.captures.push(top);

            // scroll main to frame the studio stage + configurator
            await page.evaluate(() => {
                const main = document.querySelector("main");
                if (main) main.scrollTop = vp_scroll;
            }).catch(() => {});
            await page.evaluate((s) => {
                const main = document.querySelector("main");
                if (main) main.scrollTop = s;
            }, vp.name === "mobile" ? 520 : 360);
            await page.waitForTimeout(800);
            const studio = `${OUT}/blob-r2-${vp.name}-${mode}-studio.png`;
            await page.screenshot({ path: studio, fullPage: false });
            report.captures.push(studio);

            await ctx.close();
        }
    }

    // ── SATELLITE FRAMES: timed capture of the studio bead (desktop light) ──
    {
        const ctx = await browser.newContext({
            viewport: { width: 1280, height: 800 },
            deviceScaleFactor: 2,
            colorScheme: "light",
        });
        const page = await ctx.newPage();
        await page.goto(`${BASE}/#/substrates/blob`, { waitUntil: "networkidle" });
        await setMode(page, "light");
        await page.waitForTimeout(1600);
        await page.evaluate(() => {
            const main = document.querySelector("main");
            if (main) main.scrollTop = 360;
        });
        await page.waitForTimeout(600);
        const canvas = await page.$(".goo-blob-canvas");
        for (let i = 0; i < 4; i++) {
            await page.waitForTimeout(700);
            const f = `${OUT}/blob-r2-satellite-frame-${i}.png`;
            if (canvas) await canvas.screenshot({ path: f });
            else await page.screenshot({ path: f });
            report.captures.push(f);
        }
        await ctx.close();
    }

    // ── π READBACK: crispness + shadow rungs + M2 label leak (desktop) ──
    {
        const ctx = await browser.newContext({
            viewport: { width: 1280, height: 800 },
            deviceScaleFactor: 2,
            colorScheme: "light",
        });
        const page = await ctx.newPage();
        await page.goto(`${BASE}/#/substrates/blob`, { waitUntil: "networkidle" });
        await setMode(page, "light");
        await page.waitForTimeout(1500);

        const desk = await page.evaluate(() => {
            const c = document.querySelector(".goo-blob-canvas");
            const r = c ? c.getBoundingClientRect() : null;
            const fil = c ? getComputedStyle(c).filter : null;
            const rungs = fil ? (fil.match(/drop-shadow/g) || []).length : null;
            // M2: measure the duplicate label rows
            const all = [...document.querySelectorAll("main label, main span")];
            const find = (t) => all.find((e) => e.textContent.trim() === t);
            const m = (e) => {
                if (!e) return null;
                const cs = getComputedStyle(e);
                return { tag: e.tagName, fontSize: cs.fontSize, fontWeight: cs.fontWeight };
            };
            // collect every visible raw camelCase key in the configurator
            const rawKeys = [...document.querySelectorAll("main span, main label")]
                .map((e) => e.textContent.trim())
                .filter((t) => /^[a-z][a-zA-Z]*$/.test(t) && /[A-Z]/.test(t));
            return {
                route: location.pathname + location.hash,
                canvasCssW: r ? Math.round(r.width) : null,
                canvasCssH: r ? Math.round(r.height) : null,
                canvasBackW: c ? c.width : null,
                canvasBackH: c ? c.height : null,
                canvasDprRatio: r && c ? +(c.width / r.width).toFixed(2) : null,
                shadowRungs: rungs,
                humanAttraction: m(find("Attraction")),
                rawAttraction: m(find("attraction")),
                rawClickImpulse: m(find("clickImpulse")),
                rawSatelliteCount: m(find("satelliteCount")),
                rawCamelKeysVisible: [...new Set(rawKeys)],
                glContexts: document.querySelectorAll("canvas").length,
            };
        });
        report.pi.desktop = desk;
        await ctx.close();
    }

    // ── π READBACK: M1 mobile stage rect (390px coarse) ──
    {
        const ctx = await browser.newContext({
            viewport: { width: 390, height: 844 },
            deviceScaleFactor: 2,
            colorScheme: "light",
            hasTouch: true,
            isMobile: true,
        });
        const page = await ctx.newPage();
        await page.goto(`${BASE}/#/substrates/blob`, { waitUntil: "networkidle" });
        await setMode(page, "light");
        await page.waitForTimeout(1600);
        const mob = await page.evaluate(() => {
            const c = document.querySelector(".goo-blob-canvas");
            if (c) c.scrollIntoView({ block: "center" });
            const r = c ? c.getBoundingClientRect() : null;
            const cs = c ? getComputedStyle(c) : null;
            return {
                route: location.pathname + location.hash,
                hasCanvas: !!c,
                rectW: r ? Math.round(r.width) : null,
                rectH: r ? Math.round(r.height) : null,
                backW: c ? c.width : null,
                backH: c ? c.height : null,
                visibility: cs ? cs.visibility : null,
                display: cs ? cs.display : null,
            };
        });
        report.pi.mobile = mob;
        // capture the mobile studio region
        await page.evaluate(() => {
            const main = document.querySelector("main");
            if (main) main.scrollTop = 480;
        });
        await page.waitForTimeout(600);
        const mstage = `${OUT}/blob-r2-mobile-stage-light.png`;
        await page.screenshot({ path: mstage });
        report.captures.push(mstage);
        await ctx.close();
    }
} finally {
    await browser.close();
}

console.log(JSON.stringify(report, null, 2));
