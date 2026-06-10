// C5 — confirm the SELF-ENGAGE ASYMMETRY: overlay band (.glass-floating/.glass-overlay)
// self-darkens by default (ladder.css:169 :where rule); the dock/.glass-card/.glass-resting
// do NOT (only the ancestor @container fires). Inject identical no-ancestor fixtures over
// synthetic white and read resolved tint-strength + bg. Also capture a dock-over-light PNG.

import { chromium } from "playwright";
import { fileURLToPath } from "node:url";

const BASE = process.env.DEMO_URL ?? "http://localhost:5199";
const OUT = fileURLToPath(new URL(".", import.meta.url));

(async () => {
    const browser = await chromium.launch({ args: ["--headless=new", "--use-gl=angle", "--use-angle=metal", "--ignore-gpu-blocklist"] });
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, colorScheme: "light" });
    await page.goto(`${BASE}/dock/overview`, { waitUntil: "networkidle", timeout: 30000 });
    await page.evaluate(() => { Object.defineProperty(document, "hidden", { value: true, configurable: true }); document.dispatchEvent(new Event("visibilitychange")); });
    await page.waitForTimeout(300);

    // No-ancestor-bucket fixtures over white — which surfaces self-darken?
    const asym = await page.evaluate(() => {
        const kinds = ["glass-card", "glass-resting", "glass-quiet", "glass-wash", "glass-floating", "glass-overlay", "glass-dock"];
        const out = [];
        for (const k of kinds) {
            const host = document.createElement("div");
            host.style.cssText = "position:fixed;left:-9999px;top:0;width:200px;height:100px;background:#fff;"; // NO --glass-backdrop
            const s = document.createElement("div"); s.className = k;
            host.appendChild(s); document.body.appendChild(host);
            void s.offsetHeight;
            const cs = getComputedStyle(s);
            out.push({ kind: k, tintStrength: cs.getPropertyValue("--glass-tint-strength").trim(), glassBackdrop: cs.getPropertyValue("--glass-backdrop").trim(), bg: cs.backgroundColor });
            host.remove();
        }
        return out;
    });
    console.log("=== self-engage over white, NO ancestor bucket (does the surface darken its OWN plate?) ===");
    for (const a of asym) console.log(`  ${a.kind.padEnd(16)} tint=${a.tintStrength.padEnd(5)} backdrop=${a.glassBackdrop.padEnd(6)} bg=${a.bg}`);

    // Capture dock-over-light visual.
    await page.screenshot({ path: `${OUT}C5-dock-over-light-overview.png`, fullPage: false });
    const { writeFileSync } = await import("node:fs");
    writeFileSync(`${OUT}C5-asymmetry.json`, JSON.stringify(asym, null, 2));
    await browser.close();
})();
