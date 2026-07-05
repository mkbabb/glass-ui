import { chromium } from "playwright";

const OUT = "docs/tranches/BG/audit/visual/BG.W-SECTION-TYPEWRITER-FADEUP-paint";
const routes = [
    ["/display/section", "section"],
    ["/motion/typewriter", "typewriter"],
];
const modes = ["light", "dark"];

const browser = await chromium.connectOverCDP("http://localhost:9478");
const ctx = browser.contexts()[0] ?? (await browser.newContext());

for (const [route, tag] of routes) {
    for (const mode of modes) {
        const page = await ctx.newPage();
        await page.setViewportSize({ width: 1440, height: 900 });
        const url = `http://localhost:5200/?capture=${route}&mode=${mode}`;
        await page.goto(url, { waitUntil: "domcontentloaded" });
        // record GL_RENDERER off a throwaway webgl2 ctx (provenance)
        const glRenderer = await page.evaluate(() => {
            try {
                const c = document.createElement("canvas");
                const gl = c.getContext("webgl2");
                const ext = gl && gl.getExtension("WEBGL_debug_renderer_info");
                return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : "n/a";
            } catch (e) {
                return "err:" + e.message;
            }
        });
        await page.waitForFunction(
            () => document.documentElement.hasAttribute("data-capture-ready"),
            { timeout: 30000 },
        );
        const file = `${OUT}/${tag}-chrome-${mode}-desktop-full.png`;
        await page.screenshot({ path: file, fullPage: false });
        console.log(`OK ${tag} ${mode} :: GL_RENDERER=${glRenderer} -> ${file}`);
        await page.close();
    }
}
await browser.close();
console.log("DONE chrome captures");
