// Non-authoring paint judge — BG.W-DISCLOSURE-ROTATE Chrome leg.
// 1) capture-mode fullPage screenshots (pixel + in-pixel engine badge) per route×mode
// 2) LIVE (non-capture) computed-DOM probe: chevron transition register + getAnimations()
//    on toggle + main.children.length + canvasCount + gestalt.
import { chromium } from "playwright";

const CDP = process.env.CDP_URL || "http://localhost:9333";
const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/disclosure-rotate/";
const ROUTES = [
    { key: "accordion", route: "/containers/accordion" },
    { key: "select", route: "/forms/select" },
    { key: "configurator", route: "/compositions/configurator" },
];
const MODES = ["light", "dark"];

async function pollReady(page, ms = 15000) {
    const t0 = Date.now();
    while (Date.now() - t0 < ms) {
        const r = await page.evaluate(() =>
            document.documentElement.hasAttribute("data-capture-ready")
        );
        if (r) return Date.now() - t0;
        await page.waitForTimeout(150);
    }
    return -1;
}

async function captureShot(ctx, key, route, mode) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    const elapsed = await pollReady(page);
    const glRenderer = await page.evaluate(() => {
        try {
            const c = document.createElement("canvas");
            const gl = c.getContext("webgl2") || c.getContext("webgl");
            if (!gl) return "no-webgl";
            const ext = gl.getExtension("WEBGL_debug_renderer_info");
            return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
        } catch (e) { return "err:" + e.message; }
    });
    const outPath = `${OUT}disclosure-chrome-${key}-${mode}-desktop-full.png`;
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(JSON.stringify({ leg: "shot", key, mode, elapsedMs: elapsed, glRenderer, outPath }));
    await page.close();
}

async function probe(ctx, key, route, mode) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("http://localhost:5200/", { waitUntil: "load", timeout: 30000 });
    await page.evaluate((m) => {
        try {
            if (m === "dark") document.documentElement.classList.add("dark");
            else document.documentElement.classList.remove("dark");
        } catch (e) {}
    }, mode);
    await page.goto(`http://localhost:5200/${route.replace(/^\//, "")}`, { waitUntil: "load", timeout: 30000 });
    await page.waitForTimeout(1400);

    const result = await page.evaluate(() => {
        const out = {};
        const main = document.querySelector("main");
        out.mainChildren = main ? main.children.length : null;
        out.canvasCount = document.querySelectorAll("canvas").length;
        const carets = Array.from(document.querySelectorAll(".transition-disclosure"));
        out.caretCount = carets.length;
        const reg = [];
        for (const el of carets.slice(0, 8)) {
            const cs = getComputedStyle(el);
            reg.push({
                tp: cs.transitionProperty,
                td: cs.transitionDuration,
                ttf: cs.transitionTimingFunction.slice(0, 50),
                rotate: cs.rotate,
            });
        }
        out.registers = reg;
        return out;
    });

    let anim = { attempted: false };
    try {
        if (key === "accordion") {
            anim = await page.evaluate(async () => {
                const triggers = Array.from(document.querySelectorAll('[data-slot="accordion-trigger"]'));
                const closed = triggers.find((t) => t.getAttribute("data-state") !== "open") || triggers[0];
                if (!closed) return { attempted: false };
                const svg = closed.querySelector(".transition-disclosure") || closed.querySelector("svg");
                const rotBefore = svg ? getComputedStyle(svg).rotate : null;
                closed.click();
                await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
                const anims = svg ? svg.getAnimations() : [];
                const info = anims.map((a) => ({ type: a.constructor.name, prop: a.transitionProperty ?? null, dur: a.effect ? a.effect.getTiming().duration : null }));
                return { attempted: true, rotBefore, anims: info, rotateAfter: svg ? getComputedStyle(svg).rotate : null, stateAfter: closed.getAttribute("data-state") };
            });
        } else if (key === "select") {
            anim = await page.evaluate(async () => {
                const trg = document.querySelector('[data-slot="select-trigger"]') || document.querySelector('button[role="combobox"]');
                if (!trg) return { attempted: false };
                const svg = trg.querySelector(".transition-disclosure") || trg.querySelector("svg");
                const rotBefore = svg ? getComputedStyle(svg).rotate : null;
                const stBefore = (trg.closest("[data-state]") || trg).getAttribute("data-state");
                trg.click();
                await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
                const anims = svg ? svg.getAnimations() : [];
                const info = anims.map((a) => ({ type: a.constructor.name, prop: a.transitionProperty ?? null, dur: a.effect ? a.effect.getTiming().duration : null }));
                const st = (trg.closest("[data-state]") || trg).getAttribute("data-state");
                return { attempted: true, rotBefore, stBefore, anims: info, rotateAfter: svg ? getComputedStyle(svg).rotate : null, stateAfter: st };
            });
        } else if (key === "configurator") {
            anim = await page.evaluate(async () => {
                const hdr = document.querySelector(".transition-disclosure");
                if (!hdr) return { attempted: false };
                const btn = hdr.closest("[data-state]") || hdr.closest("button") || hdr.parentElement;
                const stBefore = btn ? btn.getAttribute("data-state") : null;
                const rotBefore = getComputedStyle(hdr).rotate;
                const click = hdr.closest("button") || hdr.closest('[role="button"]') || hdr.parentElement;
                if (click) click.click();
                await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
                const anims = hdr.getAnimations();
                const info = anims.map((a) => ({ type: a.constructor.name, prop: a.transitionProperty ?? null, dur: a.effect ? a.effect.getTiming().duration : null }));
                return { attempted: true, stBefore, rotBefore, anims: info, rotateAfter: getComputedStyle(hdr).rotate, stateAfter: btn ? btn.getAttribute("data-state") : null };
            });
        }
    } catch (e) {
        anim = { attempted: true, error: String(e).slice(0, 160) };
    }
    result.toggle = anim;
    console.log(JSON.stringify({ leg: "probe", key, mode, result }));
    await page.close();
}

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
for (const { key, route } of ROUTES) for (const mode of MODES) await captureShot(ctx, key, route, mode);
for (const { key, route } of ROUTES) for (const mode of MODES) await probe(ctx, key, route, mode);
await browser.close();
console.log("DONE");
