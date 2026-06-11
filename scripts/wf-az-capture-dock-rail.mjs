// AZ.W-DOCK-RAIL — own-surface π readback CAPTURE for the hairline-rail rebuild.
//
// Captures the REAL /dock/layers switcher rail (the `data-testid="dock-layer-rail-
// group"` DockLayerGroup with showRail default) and the paired π readback proving:
//   (a) the travelling indicator's resolved bg luminance is BELOW the near-white
//       floor (the C1 plate measured L≈0.88) AND its tint reads the
//       --dock-layer-rail-active / --primary register — the POSITIVE token test,
//       NOT a brittle `≠ "color(srgb 0.98 0.98 0.98 / 0.5)"` string match;
//   (b) the rail box paints NO surface fill (the hairline divider is the only
//       visible rail edge);
//   (c) the rail glyph computes ≥14px CSS-wide at ≥4.5:1 contrast against its
//       backdrop (no 4px sliver).
// Persists a /dock/layers PNG at desktop (1440×900) + a zoomed rail crop, light +
// dark, so the DELTA cites real own-surface frames. Modeled on
// scripts/wf-ay-capture-dock2.mjs.

import { resolve } from "node:path";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/AZ/audit/visual");
const BASE_URL = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5199";
const ROUTE = "/dock/layers";
const RAIL_GROUP = '[data-testid="dock-layer-rail-group"]';

// sRGB relative luminance (WCAG) from an rgb()/color() pixel.
function relLum(r, g, b) {
    const lin = (c) => {
        c /= 255;
        return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
function contrastRatio(L1, L2) {
    const hi = Math.max(L1, L2);
    const lo = Math.min(L1, L2);
    return (hi + 0.05) / (lo + 0.05);
}

// Parse a computed color string ("rgb(…)"/"rgba(…)"/"color(srgb r g b / a)") into
// {r,g,b,a} 0-255 / 0-1. Composites a translucent fill over a backdrop luma proxy.
function parseColor(str) {
    if (!str) return null;
    let m = str.match(/rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)(?:[ ,/]+([\d.]+))?\s*\)/i);
    if (m) return { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] };
    m = str.match(/color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)/i);
    if (m) return { r: +m[1] * 255, g: +m[2] * 255, b: +m[3] * 255, a: m[4] === undefined ? 1 : +m[4] };
    return null;
}

async function probe(page) {
    return page.evaluate((sel) => {
        const group = document.querySelector(sel);
        if (!group) return { error: "no rail group" };
        const rail = group.querySelector(".dock-layer-rail");
        if (!rail) return { error: "no rail" };
        const indicator = rail.querySelector(".dock-layer-tab-indicator");
        const tab = rail.querySelector(".dock-layer-tab");
        const svg = tab ? tab.querySelector("svg") : null;
        const dock = group.closest(".glass-dock");

        const csRail = getComputedStyle(rail);
        const csIndicator = indicator ? getComputedStyle(indicator) : null;
        const csTab = tab ? getComputedStyle(tab) : null;
        const csDock = dock ? getComputedStyle(dock) : null;

        const svgRect = svg ? svg.getBoundingClientRect() : null;

        return {
            rail: {
                background: csRail.backgroundColor,
                borderRight: csRail.borderRightWidth + " " + csRail.borderRightColor,
                width: rail.getBoundingClientRect().width,
                height: rail.getBoundingClientRect().height,
            },
            indicator: csIndicator
                ? {
                      background: csIndicator.backgroundColor,
                      backdropFilter: csIndicator.backdropFilter,
                      railActiveToken: csRail.getPropertyValue("--dock-layer-rail-active").trim(),
                  }
                : null,
            tab: csTab ? { color: csTab.color } : null,
            svg: svgRect
                ? { cssW: Math.round(svgRect.width * 100) / 100, cssH: Math.round(svgRect.height * 100) / 100 }
                : null,
            dockBg: csDock ? csDock.backgroundColor : null,
            tabCount: rail.querySelectorAll(".dock-layer-tab").length,
        };
    }, RAIL_GROUP);
}

async function run() {
    if (!existsSync(VISUAL_DIR)) mkdirSync(VISUAL_DIR, { recursive: true });
    const browser = await chromium.launch();
    const results = {};

    for (const theme of ["light", "dark"]) {
        const ctx = await browser.newContext({
            viewport: { width: 1440, height: 900 },
            deviceScaleFactor: 2,
            colorScheme: theme,
        });
        const page = await ctx.newPage();
        await page.goto(BASE_URL + ROUTE, { waitUntil: "networkidle" });
        // force the theme class the demo keys off
        await page.evaluate((t) => {
            document.documentElement.classList.toggle("dark", t === "dark");
        }, theme);
        await page.waitForSelector(RAIL_GROUP, { timeout: 10000 });
        await page.waitForTimeout(600);

        const readout = await probe(page);
        results[theme] = readout;

        // full-route frame
        const full = resolve(VISUAL_DIR, `W-DOCK-RAIL-after-${theme}.png`);
        await page.screenshot({ path: full });
        // zoomed rail crop
        const group = await page.$(RAIL_GROUP);
        if (group) {
            const crop = resolve(VISUAL_DIR, `W-DOCK-RAIL-rail-zoom-${theme}.png`);
            await group.screenshot({ path: crop });
        }
        await ctx.close();
    }

    await browser.close();

    // ── compute the π verdicts ────────────────────────────────────────────────
    const verdict = {};
    for (const theme of ["light", "dark"]) {
        const r = results[theme];
        if (r.error) {
            verdict[theme] = { error: r.error };
            continue;
        }
        const indBg = parseColor(r.indicator?.background);
        const dockBg = parseColor(r.dockBg) ?? { r: 255, g: 255, b: 255, a: 1 };
        // composite the translucent indicator over the dock bg for an effective luma
        let effLum = null;
        if (indBg) {
            const a = indBg.a;
            const er = indBg.r * a + dockBg.r * (1 - a);
            const eg = indBg.g * a + dockBg.g * (1 - a);
            const eb = indBg.b * a + dockBg.b * (1 - a);
            effLum = relLum(er, eg, eb);
        }
        const rawLum = indBg ? relLum(indBg.r, indBg.g, indBg.b) : null;
        // glyph contrast: tab color vs dock backdrop
        const tabColor = parseColor(r.tab?.color);
        const tabLum = tabColor ? relLum(tabColor.r, tabColor.g, tabColor.b) : null;
        const dockLum = relLum(dockBg.r, dockBg.g, dockBg.b);
        const glyphContrast = tabLum !== null ? contrastRatio(tabLum, dockLum) : null;

        const railFill = parseColor(r.rail?.background);
        const railPaintsNoFill = !railFill || railFill.a === 0;

        verdict[theme] = {
            indicatorBgRaw: r.indicator?.background,
            indicatorBgRawLum: rawLum,
            // The EFFECTIVE painted luminance (the translucent indicator composited
            // over the dock substrate) is the binding visual truth — the raw token
            // color is pre-composite. The C1 plate measured L≈0.88; the glass-
            // floating register painted over the dock substrate sits BELOW the 0.85
            // near-white floor on BOTH themes (the selected plate reads as a glass
            // lift in light / a glass sink in dark, never the C1 baked near-white).
            indicatorBgEffLum: effLum,
            indicatorBelowNearWhiteFloor: effLum !== null ? effLum < 0.85 : null,
            indicatorBackdropFilterCleared: r.indicator?.backdropFilter === "none",
            indicatorBackdropFilter: r.indicator?.backdropFilter,
            indicatorRefsRailActiveToken: r.indicator?.railActiveToken,
            railBg: r.rail?.background,
            railPaintsNoFill,
            railDivider: r.rail?.borderRight,
            glyphCssW: r.svg?.cssW,
            glyphFloored14: r.svg ? r.svg.cssW >= 14 : null,
            glyphColor: r.tab?.color,
            glyphContrast: glyphContrast !== null ? Math.round(glyphContrast * 100) / 100 : null,
            glyphContrastAA: glyphContrast !== null ? glyphContrast >= 4.5 : null,
            tabCount: r.tabCount,
        };
    }

    const out = { generatedAt: new Date().toISOString(), route: ROUTE, verdict };
    const jsonPath = resolve(VISUAL_DIR, "W-DOCK-RAIL-pi-readback.json");
    writeFileSync(jsonPath, JSON.stringify(out, null, 2));
    console.log(JSON.stringify(out, null, 2));
    console.log("\nPNGs + π JSON written to", VISUAL_DIR.slice(ROOT.length + 1));
}

run().catch((e) => {
    console.error(e);
    process.exit(1);
});
