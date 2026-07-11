// Probe — locate the eyeglass strip on navigation/tabs, decode GL provenance,
// inspect the indicator animation mechanism (getAnimations / WAAPI seekability).
import { chromium } from "playwright";

const CDP = process.env.CDP_URL || "http://localhost:9333";
const ORIGIN = process.env.ORIGIN || "http://localhost:5200";

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 1200 });
await page.goto(`${ORIGIN}/navigation/tabs`, { waitUntil: "load", timeout: 30000 });
await page.waitForTimeout(2500);

const glRenderer = await page.evaluate(() => {
    try {
        const c = document.createElement("canvas");
        const gl = c.getContext("webgl2") || c.getContext("webgl");
        if (!gl) return "no-webgl";
        const ext = gl.getExtension("WEBGL_debug_renderer_info");
        return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
    } catch (e) { return "err:" + e.message; }
});

const info = await page.evaluate(() => {
    const strips = Array.from(document.querySelectorAll(".segmented-tabs"));
    const eg = strips.map((s, i) => {
        const hasAttr = s.hasAttribute("data-eyeglass");
        const ind = s.querySelector(".segmented-indicator");
        const cs = ind ? getComputedStyle(ind) : null;
        const r = s.getBoundingClientRect();
        const ir = ind ? ind.getBoundingClientRect() : null;
        const tabs = Array.from(s.querySelectorAll(".segmented-tab")).map((t) => {
            const tr = t.getBoundingClientRect();
            return { label: (t.textContent||"").trim().slice(0,20), pressed: t.getAttribute("aria-pressed"), cx: Math.round(tr.left+tr.width/2), w: Math.round(tr.width) };
        });
        return {
            idx: i, hasEyeglass: hasAttr,
            stripRect: { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) },
            indClasses: ind ? ind.className : null,
            indRect: ir ? { x: Math.round(ir.left), y: Math.round(ir.top), w: Math.round(ir.width), h: Math.round(ir.height) } : null,
            indBackdrop: cs ? cs.backdropFilter : null,
            indScale: cs ? cs.scale : null,
            tabs,
        };
    });
    // supports check for the two runtime facts
    const supportsAnchor = CSS.supports("position-anchor", "--x");
    const supportsRefract = CSS.supports("backdrop-filter", 'url("#glass-refract")');
    return { stripCount: strips.length, eg, supportsAnchor, supportsRefract };
});

console.log("GL_RENDERER:", glRenderer);
console.log(JSON.stringify(info, null, 2));

// Now inspect getAnimations on the eyeglass indicator after triggering a select.
const egIdx = info.eg.findIndex((e) => e.hasEyeglass);
if (egIdx >= 0) {
    const animInfo = await page.evaluate((idx) => {
        const strips = Array.from(document.querySelectorAll(".segmented-tabs"));
        const s = strips[idx];
        const ind = s.querySelector(".segmented-indicator");
        const tabs = Array.from(s.querySelectorAll(".segmented-tab"));
        // click a different tab to start the glide
        const cur = tabs.findIndex((t) => t.getAttribute("aria-pressed") === "true");
        const target = cur === 0 ? tabs.length - 1 : 0;
        tabs[target].click();
        // immediately read getAnimations on the indicator
        const anims = ind.getAnimations().map((a) => ({
            type: a.constructor.name,
            transitionProperty: a.transitionProperty || null,
            playState: a.playState,
            currentTime: a.currentTime,
            duration: a.effect && a.effect.getTiming ? a.effect.getTiming().duration : null,
            easing: a.effect && a.effect.getTiming ? a.effect.getTiming().easing : null,
        }));
        return { clickedTargetIdx: target, fromIdx: cur, anims };
    }, egIdx);
    console.log("ANIM_INFO:", JSON.stringify(animInfo, null, 2));
}

await page.close();
await browser.close().catch(() => {});
