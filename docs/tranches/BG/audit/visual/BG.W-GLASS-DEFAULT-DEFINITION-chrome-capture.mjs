// BG.W-GLASS-DEFAULT-DEFINITION — NON-AUTHORING Chrome leg (CDP → real Chrome.app / Metal GPU).
// Boots ?capture over BUILT :5200, polls data-capture-ready, GL_RENDERER probe, screenshot,
// and probes the DEFINED-CONTROL cohort: --glass-definition scalar + the RE-DECLARED
// --glass-floor-fill / --glass-border-defined tokens must RESOLVE non-transparent on the
// cohort (the dead-knob-fix reaches paint), while the content glass tiers on
// /substrates/glass-material stay --glass-definition:0 (transmissive negative arm).
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-GLASS-DEFAULT-DEFINITION-paint";
const ROUTES = ["/display/buttons", "/substrates/glass-material"];
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
        const slug = `gdd-${tag}-chrome-${mode}`;
        let glRenderer = null, probe = null, err = null;
        try {
            await page.goto(url, { waitUntil: "load", timeout: 30000 });
            await page.waitForFunction(
                () => document.documentElement.hasAttribute("data-capture-ready"),
                { timeout: 25000 },
            );
            // let GL fields settle a couple frames
            await page.waitForTimeout(1200);
            glRenderer = await page.evaluate(() => {
                try {
                    const c = document.createElement("canvas");
                    const gl = c.getContext("webgl2") || c.getContext("webgl");
                    if (!gl) return "no-webgl";
                    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
                    return dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "no-debug-ext";
                } catch (e) { return "err:" + e.message; }
            });
            probe = await page.evaluate((routeArg) => {
                const r = document.documentElement;
                const isButtons = routeArg === "/display/buttons";
                // Cohort selector per route:
                //  buttons  -> the glass-variant buttons (.btn-glass)
                //  material -> the content glass tiers (.glass-card / .glass-wash..overlay) — negative arm
                const cohortSel = isButtons
                    ? ".btn-glass"
                    : ".glass-card, .glass-wash, .glass-quiet, .glass-resting, .glass-floating, .glass-overlay";
                const els = Array.from(document.querySelectorAll(cohortSel));

                function alphaOf(colorStr) {
                    // parse rgb/rgba/color(srgb …/ oklab(… / N)
                    if (!colorStr) return null;
                    let m = colorStr.match(/\/\s*([0-9.]+)\s*\)/); // "… / 0.14)"
                    if (m) return parseFloat(m[1]);
                    m = colorStr.match(/rgba?\([^)]*,\s*([0-9.]+)\s*\)/);
                    if (m) return parseFloat(m[1]);
                    if (/transparent/.test(colorStr)) return 0;
                    // opaque forms with no alpha channel
                    if (/^rgb\(|^color\(srgb [0-9.]+ [0-9.]+ [0-9.]+\)$|^oklab\(/.test(colorStr)) return 1;
                    return null;
                }

                const sample = els.slice(0, 6).map((el) => {
                    const st = getComputedStyle(el);
                    const b = el.getBoundingClientRect();
                    const def = st.getPropertyValue("--glass-definition").trim();
                    const floorFill = st.getPropertyValue("--glass-floor-fill").trim();
                    const borderDefined = st.getPropertyValue("--glass-border-defined").trim();
                    const bc = st.borderColor;
                    const bi = st.backgroundImage;
                    return {
                        cls: el.className.toString().slice(0, 80),
                        text: (el.textContent || "").trim().slice(0, 24),
                        rect: { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) },
                        glassDefinition: def,
                        floorFillToken: floorFill.slice(0, 120),
                        borderDefinedToken: borderDefined.slice(0, 120),
                        borderColor: bc,
                        borderWidth: st.borderTopWidth,
                        borderAlpha: alphaOf(bc),
                        backgroundImage: bi.slice(0, 260),
                        backgroundColor: st.backgroundColor,
                        // does the token still carry calc(0 * …) — the dead-knob signature?
                        floorScalarIsZero: /calc\(\s*0\s*\*/.test(floorFill) || /calc\(0 \*/.test(floorFill),
                    };
                });

                const cs = getComputedStyle(r);
                return {
                    captureReady: r.hasAttribute("data-capture-ready"),
                    captureMode: r.getAttribute("data-capture-mode"),
                    isDark: r.classList.contains("dark"),
                    route: routeArg,
                    cohortSel,
                    cohortCount: els.length,
                    tokens: {
                        card: cs.getPropertyValue("--card").trim(),
                        foreground: cs.getPropertyValue("--foreground").trim(),
                        glassFloorFillMax: cs.getPropertyValue("--glass-floor-fill-max").trim(),
                    },
                    mainChildren: document.querySelector("main")?.children.length ?? null,
                    canvasCount: document.querySelectorAll("canvas").length,
                    sample,
                };
            }, route);

            await page.screenshot({ path: `${OUT}/${slug}.png`, clip: { x: 0, y: 0, width: SIZE.w, height: SIZE.h } });
        } catch (e) {
            err = e.message;
        }
        results.push({ route, mode, slug, glRenderer, err, probe });
        console.log(`${slug}: ${err ? "ERR " + err : "ok"} | GL=${glRenderer} | cohort=${probe?.cohortCount} def=${probe?.sample?.[0]?.glassDefinition} floorZero=${probe?.sample?.[0]?.floorScalarIsZero} borderAlpha=${probe?.sample?.[0]?.borderAlpha}`);
        await ctx.close();
    }
}

writeFileSync(`${OUT}/chrome-results-gdd.json`, JSON.stringify(results, null, 2));
console.log("\nWROTE chrome-results-gdd.json");
await browser.close();
