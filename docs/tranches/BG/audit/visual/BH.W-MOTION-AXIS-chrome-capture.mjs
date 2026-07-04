import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const OUT = process.argv[2];
const BASE = "http://localhost:5200";
const ROUTES = [
    { route: "/display/card", slug: "card" },
    { route: "/navigation/tabs", slug: "tabs" },
    { route: "/forms/slider", slug: "slider" },
    { route: "/containers/dialog", slug: "dialog" },
];
const MODES = ["light", "dark"];

const browser = await chromium.connectOverCDP("http://localhost:9477");
const results = [];

for (const mode of MODES) {
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 2,
        colorScheme: mode,
    });
    for (const { route, slug } of ROUTES) {
        const page = await ctx.newPage();
        const url = `${BASE}/?capture=${encodeURIComponent(route)}&mode=${mode}`;
        await page.goto(url, { waitUntil: "load", timeout: 30000 });
        await page.waitForFunction(
            () => document.documentElement.hasAttribute("data-capture-ready"),
            null,
            { timeout: 20000 },
        );

        const glRenderer = await page.evaluate(() => {
            try {
                const c = document.createElement("canvas");
                const gl = c.getContext("webgl2") || c.getContext("webgl");
                if (!gl) return "NO_GL";
                const ext = gl.getExtension("WEBGL_debug_renderer_info");
                return ext
                    ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)
                    : gl.getParameter(gl.RENDERER);
            } catch (e) {
                return "GL_ERR:" + e.message;
            }
        });

        const dom = await page.evaluate(() => {
            const out = {};
            const main = document.querySelector("main");
            out.mainChildren = main ? main.children.length : null;
            out.htmlClass = document.documentElement.className;
            out.prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;
            out.canvasCount = document.querySelectorAll("canvas").length;
            const dm = Array.from(
                document.querySelectorAll("[data-motion]"),
            ).map((el) => ({
                tag: el.tagName.toLowerCase(),
                motion: el.getAttribute("data-motion"),
            }));
            out.dataMotionCount = dm.length;
            out.dataMotionSample = dm.slice(0, 8);
            try {
                out.docAnimations =
                    typeof document.getAnimations === "function"
                        ? document.getAnimations().length
                        : "no-api";
            } catch (e) {
                out.docAnimations = "err:" + e.message;
            }
            const probe =
                document.querySelector("[data-motion]") ||
                document.documentElement;
            const cs = getComputedStyle(probe);
            out.motionWeight = cs.getPropertyValue("--motion-weight").trim();
            out.bodyBg = getComputedStyle(document.body).backgroundColor;
            const de = document.documentElement;
            out.horizOverflow = de.scrollWidth - de.clientWidth;
            return out;
        });

        const pngPath = `${OUT}/chrome-${slug}-${mode}.png`;
        await page.screenshot({ path: pngPath, fullPage: false });
        results.push({ mode, route, slug, glRenderer, dom, png: pngPath });
        console.log(
            `[chrome] ${slug} ${mode} GL=${glRenderer.slice(0, 60)} mainKids=${dom.mainChildren} dataMotion=${dom.dataMotionCount} motionWeight=${dom.motionWeight} canvas=${dom.canvasCount} overflow=${dom.horizOverflow} anims=${dom.docAnimations}`,
        );
        await page.close();
    }
    await ctx.close();
}

await browser.close();
writeFileSync(`${OUT}/chrome-results.json`, JSON.stringify(results, null, 2));
console.log("DONE chrome");
