// C5 focused dock probe — confirm the self-engage NON-fire on the dock plate.
// Reads, on each dock-bearing route, the dock root's resolved --glass-backdrop,
// --glass-tint-strength, --glass-tint-source, the dock's computed background,
// AND a true painted-pixel sample of the page directly behind the dock (via a
// device-pixel screenshot crop → average). Pure observation.

import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { PNG } from "pngjs";

const BASE = process.env.DEMO_URL ?? "http://localhost:5199";
const OUT = fileURLToPath(new URL(".", import.meta.url));
const ROUTES = ["/dock/overview", "/dock/layers", "/dock/rail", "/compositions/settings", "/foundations/colors", "/data/metric-cell"];

function avgPixels(png, x0, y0, x1, y1) {
    let r = 0, g = 0, b = 0, n = 0;
    for (let y = Math.max(0, y0); y < Math.min(png.height, y1); y++) {
        for (let x = Math.max(0, x0); x < Math.min(png.width, x1); x++) {
            const i = (png.width * y + x) << 2;
            r += png.data[i]; g += png.data[i + 1]; b += png.data[i + 2]; n++;
        }
    }
    return n ? [Math.round(r / n), Math.round(g / n), Math.round(b / n)] : null;
}
function lin(v) { const x = v / 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }
function lum([r, g, b]) { return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b); }

(async () => {
    const browser = await chromium.launch({ args: ["--headless=new", "--use-gl=angle", "--use-angle=metal", "--ignore-gpu-blocklist"] });
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, colorScheme: "light", deviceScaleFactor: 1 });
    const out = [];
    for (const route of ROUTES) {
        try {
            await page.goto(`${BASE}${route}`, { waitUntil: "networkidle", timeout: 30000 });
            await page.evaluate(() => { Object.defineProperty(document, "hidden", { value: true, configurable: true }); document.dispatchEvent(new Event("visibilitychange")); });
            await page.waitForTimeout(400);
            const dockInfo = await page.evaluate(() => {
                const dock = document.querySelector(".glass-dock");
                if (!dock) return null;
                const cs = getComputedStyle(dock);
                const r = dock.getBoundingClientRect();
                return {
                    glassBackdrop: cs.getPropertyValue("--glass-backdrop").trim(),
                    tintStrength: cs.getPropertyValue("--glass-tint-strength").trim(),
                    tintSource: cs.getPropertyValue("--glass-tint-source").trim(),
                    tintInk: cs.getPropertyValue("--glass-tint-ink").trim(),
                    tintAA: cs.getPropertyValue("--glass-tint-strength-aa").trim(),
                    dockFg: cs.getPropertyValue("--dock-fg-on-aurora").trim(),
                    bg: cs.backgroundColor,
                    rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
                };
            });
            if (!dockInfo) { out.push({ route, note: "no .glass-dock" }); console.log(`[${route}] no dock`); continue; }
            // screenshot the page (dock parked) and sample the band just ABOVE the dock (the page behind)
            const buf = await page.screenshot({ fullPage: false });
            const png = PNG.sync.read(buf);
            const { x, y, w, h } = dockInfo.rect;
            // page band above the dock (true paint behind where the dock floats)
            const above = avgPixels(png, x, Math.max(0, y - 40), x + w, y - 8);
            // the dock plate itself (center)
            const plate = avgPixels(png, x + w / 2 - 20, y + h / 2 - 8, x + w / 2 + 20, y + h / 2 + 8);
            out.push({ route, ...dockInfo, pageBehindPx: above, pageBehindLum: above ? +lum(above).toFixed(3) : null, dockPlatePx: plate, dockPlateLum: plate ? +lum(plate).toFixed(3) : null });
            console.log(`[${route}] glass-backdrop=${dockInfo.glassBackdrop} tint=${dockInfo.tintStrength} src=${dockInfo.tintSource} | pageBehind=[${above}] L=${above ? lum(above).toFixed(2) : "?"} | platePx=[${plate}] L=${plate ? lum(plate).toFixed(2) : "?"}`);
        } catch (e) { console.log(`[${route}] ERR ${e.message}`); out.push({ route, error: e.message }); }
    }
    const { writeFileSync } = await import("node:fs");
    writeFileSync(`${OUT}C5-dock-probe.json`, JSON.stringify(out, null, 2));
    await browser.close();
})();
