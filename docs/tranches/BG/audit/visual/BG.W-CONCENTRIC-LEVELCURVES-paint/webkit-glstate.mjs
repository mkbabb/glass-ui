// Focused WebKit GL-state probe: inspect the concentric canvas' own context — is it
// webgl2, is anything drawn (readPixels non-uniform?), any lingering gl error. Compare
// to aurora. Helps the fix agent past the "exp-clamp did not fix it" state.
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { webkit } = require("playwright");

const ROUTE = "/substrates/concentric";
const mode = process.argv[2] || "light";
const browser = await webkit.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: mode });
const page = await ctx.newPage();
await page.goto(`http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`, { waitUntil: "load", timeout: 30000 });
await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 25000 });
await page.waitForTimeout(2500);

const probe = await page.evaluate(() => {
    const out = {};
    for (const sel of ["canvas.aurora-canvas", "canvas.concentric-canvas"]) {
        const c = document.querySelector(sel);
        if (!c) { out[sel] = "no-canvas"; continue; }
        const key = sel.includes("aurora") ? "aurora" : "concentric";
        // The renderer holds the live context; asking getContext again returns the same
        // context type if already created (throws/returns null if a different type asked).
        let info = { backW: c.width, backH: c.height };
        const gl2 = c.getContext("webgl2");
        if (gl2) {
            info.type = "webgl2";
            info.glError = gl2.getError();
            info.contextLost = gl2.isContextLost();
            // try a readPixels of a small center block (may be blank if not preserveDrawingBuffer)
            try {
                const px = new Uint8Array(4 * 16);
                gl2.readPixels(Math.floor(c.width / 2) - 2, Math.floor(c.height / 2) - 2, 4, 4, gl2.RGBA, gl2.UNSIGNED_BYTE, px);
                info.readErr = gl2.getError();
                // uniformity check
                let mn = 255, mx = 0;
                for (let i = 0; i < px.length; i++) { mn = Math.min(mn, px[i]); mx = Math.max(mx, px[i]); }
                info.readMin = mn; info.readMax = mx; info.readSample = Array.from(px.slice(0, 8));
            } catch (e) { info.readThrow = String(e); }
        } else {
            info.type = "not-webgl2-or-cross-type";
            const gl1 = c.getContext("webgl");
            info.hasWebgl1 = !!gl1;
        }
        out[key] = info;
    }
    return out;
});

console.log(JSON.stringify({ mode, probe }, null, 2));
await browser.close();
