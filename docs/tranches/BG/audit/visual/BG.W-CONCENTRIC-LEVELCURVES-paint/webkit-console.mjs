// Diagnose the concentric WebKit render failure via playwright-webkit console + WebGPU probe.
// (A proxy for system Safari's WebKit engine — surfaces shader/WebGPU errors the wkshot snapshot
//  cannot report.)
import { webkit } from "playwright";

const browser = await webkit.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const logs = [];
page.on("console", (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on("pageerror", (e) => logs.push(`[pageerror] ${e.message}`));
await page.goto("http://localhost:5200/?capture=%2Fsubstrates%2Fconcentric&mode=light", { waitUntil: "load", timeout: 30000 });
const t0 = Date.now();
while (Date.now() - t0 < 15000) {
    if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"))) break;
    await page.waitForTimeout(150);
}
await page.waitForTimeout(1500);

const probe = await page.evaluate(async () => {
    const out = {};
    out.hasGPU = typeof navigator.gpu !== "undefined";
    if (out.hasGPU) {
        try { const a = await navigator.gpu.requestAdapter(); out.adapter = !!a; }
        catch (e) { out.adapterErr = e.message; }
    }
    // WebGL2 availability
    const c = document.createElement("canvas");
    out.webgl2 = !!c.getContext("webgl2");
    // concentric canvas backing + a sampled pixel via readPixels if it's a GL context
    const conc = document.querySelector(".concentric-canvas");
    if (conc) {
        out.cw = conc.width; out.ch = conc.height;
        // try to grab its context type indirectly: read a center pixel via a 2D drawImage
        try {
            const s = document.createElement("canvas"); s.width = 8; s.height = 8;
            const ctx = s.getContext("2d");
            ctx.drawImage(conc, 0, 0, 8, 8);
            out.centerPixel = Array.from(ctx.getImageData(4, 4, 1, 1).data);
        } catch (e) { out.drawErr = e.message; }
    }
    return out;
});
console.log("PROBE " + JSON.stringify(probe));
console.log("LOGS:");
for (const l of logs) console.log("  " + l);
await browser.close();
