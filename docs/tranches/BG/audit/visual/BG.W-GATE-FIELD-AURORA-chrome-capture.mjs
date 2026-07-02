// BG.W-GATE-FIELD-AURORA — NON-AUTHORING Chrome leg (CDP → real Chrome.app / Metal GPU).
// Boots ?capture over BUILT :5200, polls data-capture-ready, GL_RENDERER probe, screenshot,
// and — the wave's binding subject — probes the LIGHT-arm eyebrow AA lift: every
// `.section-label:not(.section-label--tinted)` computed ink + rects + the token cascade,
// so the pixel-analysis step can compute WCAG contrast(ink, composited field) per engine.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-GATE-FIELD-AURORA-paint";
const ROUTES = ["/foundations/intro", "/foundations/colors", "/foundations/typography"];
const MODES = ["light", "dark"];
const SIZE = { w: 1440, h: 900 };

const results = [];
const browser = await chromium.connectOverCDP("http://localhost:9456");

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
        const slug = `chrome-${tag}-${mode}`;
        let glRenderer = null, probe = null, err = null;
        try {
            await page.goto(url, { waitUntil: "load", timeout: 30000 });
            await page.waitForFunction(
                () => document.documentElement.hasAttribute("data-capture-ready"),
                { timeout: 25000 },
            );
            glRenderer = await page.evaluate(() => {
                try {
                    const c = document.createElement("canvas");
                    const gl = c.getContext("webgl2") || c.getContext("webgl");
                    if (!gl) return "no-webgl";
                    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
                    return dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "no-debug-ext";
                } catch (e) { return "err:" + e.message; }
            });
            probe = await page.evaluate(() => {
                const r = document.documentElement;
                const cs = getComputedStyle(r);
                const readVar = (v) => cs.getPropertyValue(v).trim();
                const txt = (document.body.innerText || "").replace(/\s+/g, " ").trim();
                const canvases = Array.from(document.querySelectorAll("canvas"));
                const badge = document.querySelector("[data-capture-badge], [id*='capture-badge']");
                const hasField = !!document.querySelector("[data-paper-field]");

                // Eyebrow AA subject — all mono-caption eyebrows that are NOT the --tinted accent.
                const eyebrows = Array.from(
                    document.querySelectorAll(".section-label:not(.section-label--tinted)"),
                ).map((el) => {
                    const b = el.getBoundingClientRect();
                    const st = getComputedStyle(el);
                    return {
                        text: (el.textContent || "").trim().slice(0, 40),
                        color: st.color,
                        fontSize: st.fontSize,
                        // CSS coords (viewport). y clamped to the 900 viewport for the shot.
                        rect: { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) },
                        // is this eyebrow inside a [data-paper-field] ancestor (rule scope)?
                        underField: !!el.closest("[data-paper-field]"),
                    };
                }).filter((e) => e.rect.y >= 0 && e.rect.y <= 880 && e.rect.w > 0);

                return {
                    captureReady: r.hasAttribute("data-capture-ready"),
                    captureMode: r.getAttribute("data-capture-mode"),
                    isDark: r.classList.contains("dark"),
                    hasField,
                    tokens: {
                        neutral5: readVar("--neutral-5"),
                        mutedFg: readVar("--muted-foreground"),
                        foreground: readVar("--foreground"),
                    },
                    bodyTextLen: txt.length,
                    bodyTextHead: txt.slice(0, 90),
                    canvasCount: canvases.length,
                    canvasDims: canvases.map((c) => `${c.width}x${c.height}`).slice(0, 4),
                    hasBadgeNode: !!badge,
                    eyebrowCount: eyebrows.length,
                    eyebrows,
                };
            });
            const png = `${OUT}/${slug}.png`;
            await page.screenshot({ path: png, clip: { x: 0, y: 0, width: SIZE.w, height: SIZE.h } });
            results.push({ engine: "chrome", route, mode, w: SIZE.w, h: SIZE.h, dpr: 2, glRenderer, png, probe });
            console.error(`chrome ${slug} OK gl=${(glRenderer || "").slice(0, 60)} eyebrows=${probe.eyebrowCount} field=${probe.hasField} text=${probe.bodyTextLen}`);
        } catch (e) {
            err = String(e).slice(0, 300);
            results.push({ engine: "chrome", route, mode, err });
            console.error(`chrome ${slug} FAIL ${err}`);
        }
        await ctx.close();
    }
}
await browser.close();
writeFileSync(`${OUT}/chrome-results.json`, JSON.stringify({ results }, null, 2));
console.error("DONE chrome:", results.length, "configs");
