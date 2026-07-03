// BG.W-VIZ-RESIZE-ADOPT — NON-AUTHORING Chrome leg (CDP -> real Chrome.app / Metal GPU).
// C18 harness over BUILT :5200. Two passes per mode:
//   (A) FRESH-BOOT per route (?capture=<route>) — the proven deterministic-ready screenshot +
//       per-canvas backing==round(gBCR × effectiveDpr) uniform-crisp check (the mount path SPA-nav lands on).
//   (B) SPA-NAV sequence — one page, $router.push across all 9 leaf routes in order, re-checking the
//       backing store after each in-app navigation (the hard-adopt-survives-nav truth).
// The wave criterion: each viz canvas backing store == round(getBoundingClientRect × dpr), no stretch/blur.
// dpr here is the viz's EFFECTIVE dpr POLICY (V4 dprPolicy×9 — e.g. aurora caps sub-2×), NOT window.dpr.
// So the paint assertion is: uniform scale on both axes (d_w == d_h -> no stretch), d in [1, window.dpr]
// (crisp, respects cap), and backing == round(css × d) exactly (integer render target -> no fractional blur).
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-VIZ-RESIZE-ADOPT-paint";
const ROUTES = [
    "/substrates/aurora",
    "/substrates/blob",
    "/substrates/concentric",
    "/substrates/constellation",
    "/substrates/dot-flow-field",
    "/substrates/dot-matrix",
    "/substrates/fourier-field",
    "/substrates/goo-dot",
    "/substrates/paper-grid",
];
const MODES = ["light", "dark"];
const SIZE = { w: 1440, h: 900 };

// Per-canvas backing-store verdict. css = gBCR (CSS px). backing = canvas.width/height (device px).
function backingVerdict(c, winDpr) {
    const { w, h, cssW, cssH } = c;
    if (cssW < 4 || cssH < 4) return { skip: true, reason: "css<4px (non-substantive)" };
    if (w < 4 || h < 4) return { pass: false, reason: `zero-backing ${w}x${h}` };
    const dW = w / cssW;
    const dH = h / cssH;
    const uniform = Math.abs(dW - dH) < 0.02;           // no non-uniform stretch
    const d = dW;
    const inCap = d >= 0.98 && d <= winDpr + 0.02;      // crisp (>=1) and within policy cap (<= window dpr)
    const crispW = Math.abs(w - Math.round(cssW * d)) <= 0.5;
    const crispH = Math.abs(h - Math.round(cssH * d)) <= 0.5;
    const pass = uniform && inCap && crispW && crispH;
    return { pass, dW: +dW.toFixed(4), dH: +dH.toFixed(4), effDpr: +d.toFixed(3), uniform, inCap, crispW, crispH };
}

async function readCanvases(page) {
    return await page.evaluate(() => {
        const winDpr = window.devicePixelRatio;
        const canvases = Array.from(document.querySelectorAll("canvas")).map((c) => {
            const b = c.getBoundingClientRect();
            return {
                w: c.width,
                h: c.height,
                cssW: +b.width.toFixed(2),
                cssH: +b.height.toFixed(2),
                x: +b.x.toFixed(1),
                y: +b.y.toFixed(1),
                area: +(b.width * b.height).toFixed(0),
                cls: c.className.toString().slice(0, 64),
                parent: (c.parentElement?.className || "").slice(0, 48),
            };
        });
        return {
            winDpr,
            canvasCount: canvases.length,
            canvases,
            mainChildren: document.querySelector("main")?.children.length ?? null,
            route: document.querySelector("#app")?.__vue_app__?.config?.globalProperties?.$router?.currentRoute?.value?.fullPath ?? null,
        };
    });
}

const results = { fresh: [], spaNav: [] };
const browser = await chromium.connectOverCDP("http://localhost:9466");

// ---------- PASS A: fresh-boot per route (screenshots + GL probe + backing check) ----------
for (const route of ROUTES) {
    for (const mode of MODES) {
        const ctx = await browser.newContext({
            viewport: { width: SIZE.w, height: SIZE.h },
            deviceScaleFactor: 2,
            colorScheme: mode,
        });
        const page = await ctx.newPage();
        const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
        const tag = route.replace(/^\/substrates\//, "").replace(/\//g, "_");
        const slug = `vrz-${tag}-chrome-${mode}`;
        let glRenderer = null, cinfo = null, err = null;
        try {
            await page.goto(url, { waitUntil: "load", timeout: 30000 });
            await page.waitForFunction(
                () => document.documentElement.hasAttribute("data-capture-ready"),
                { timeout: 25000 },
            );
            await page.waitForTimeout(1600); // GL/compute settle
            glRenderer = await page.evaluate(() => {
                try {
                    const c = document.createElement("canvas");
                    const gl = c.getContext("webgl2") || c.getContext("webgl");
                    if (!gl) return "no-webgl";
                    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
                    return dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "no-debug-ext";
                } catch (e) { return "err:" + e.message; }
            });
            cinfo = await readCanvases(page);
            for (const c of cinfo.canvases) c.verdict = backingVerdict(c, cinfo.winDpr);
            await page.screenshot({ path: `${OUT}/${slug}.png`, clip: { x: 0, y: 0, width: SIZE.w, height: SIZE.h } });
        } catch (e) { err = e.message; }
        const substantive = (cinfo?.canvases || []).filter((c) => !c.verdict?.skip);
        const allPass = substantive.length > 0 && substantive.every((c) => c.verdict?.pass);
        results.fresh.push({ route, mode, slug, glRenderer, err, winDpr: cinfo?.winDpr, canvasCount: cinfo?.canvasCount, mainChildren: cinfo?.mainChildren, allPass, canvases: cinfo?.canvases });
        console.log(`[fresh] ${slug}: ${err ? "ERR " + err : (allPass ? "PASS" : "FAIL")} | GL=${(glRenderer||"").slice(0,42)} | canvases=${cinfo?.canvasCount} | ${substantive.map(c=>`${c.w}x${c.h}<-${c.cssW}x${c.cssH}(d${c.verdict.effDpr})`).join(" ")}`);
        await ctx.close();
    }
}

// ---------- PASS B: SPA-nav sequence (one page, $router.push across all routes) ----------
for (const mode of MODES) {
    const ctx = await browser.newContext({
        viewport: { width: SIZE.w, height: SIZE.h },
        deviceScaleFactor: 2,
        colorScheme: mode,
    });
    const page = await ctx.newPage();
    // Boot on the FIRST route via capture (deterministic ready), then SPA-nav the rest in-app.
    await page.goto(`http://localhost:5200/?capture=${encodeURIComponent(ROUTES[0])}&mode=${mode}`, { waitUntil: "load", timeout: 30000 });
    await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 25000 });
    await page.waitForTimeout(1200);
    for (let i = 0; i < ROUTES.length; i++) {
        const route = ROUTES[i];
        if (i > 0) {
            // real in-app SPA navigation via vue-router
            const pushed = await page.evaluate(async (r) => {
                const router = document.querySelector("#app")?.__vue_app__?.config?.globalProperties?.$router;
                if (!router) return "no-router";
                await router.push(r);
                return router.currentRoute.value.fullPath;
            }, route);
            // wait for a canvas to (re)appear + settle after the nav
            await page.waitForTimeout(1700);
            var navResult = pushed;
        } else { var navResult = "boot"; }
        const cinfo = await readCanvases(page);
        for (const c of cinfo.canvases) c.verdict = backingVerdict(c, cinfo.winDpr);
        const substantive = cinfo.canvases.filter((c) => !c.verdict?.skip);
        const allPass = substantive.length > 0 && substantive.every((c) => c.verdict?.pass);
        results.spaNav.push({ order: i, route, mode, navResult, currentRoute: cinfo.route, canvasCount: cinfo.canvasCount, mainChildren: cinfo.mainChildren, allPass, canvases: cinfo.canvases });
        console.log(`[spa ${mode} #${i}] push->${route} now=${cinfo.route}: ${allPass ? "PASS" : "FAIL"} | canvases=${cinfo.canvasCount} | ${substantive.map(c=>`${c.w}x${c.h}<-${c.cssW}x${c.cssH}(d${c.verdict.effDpr}${c.verdict.pass?"":"!"})`).join(" ")}`);
    }
    await ctx.close();
}

writeFileSync(`${OUT}/chrome-results-vrz.json`, JSON.stringify(results, null, 2));
const freshFail = results.fresh.filter((r) => !r.allPass || r.err).length;
const spaFail = results.spaNav.filter((r) => !r.allPass).length;
console.log(`\nWROTE chrome-results-vrz.json | fresh FAIL=${freshFail}/${results.fresh.length} | spaNav FAIL=${spaFail}/${results.spaNav.length}`);
await browser.close();
